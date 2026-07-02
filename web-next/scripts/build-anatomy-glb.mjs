/**
 * BodyParts3D の抽出 OBJ を構造ごとに 1 つの GLB へ統合・最適化するビルドスクリプト。
 *
 * 入力: リポジトリ直下 `scripts/bodyparts3d/output/extract_list.csv`
 *        （列: OBJ File / Collection / Source Set。build_master.py が生成）
 * 出力: `web-next/public/models/<id>.glb`（設計書 docs/architecture.md §5.2 / §7）
 *        ＋ `scripts/bodyparts3d/output/glb_report.json`（bbox・変換・部位座標のレポート）
 *
 * 処理:
 *  1. obj2gltf で各 OBJ を glb 化し、gltf-transform で 1 Document へ mergeDocuments。
 *  2. シーンを 1 つへ統合し、全メッシュを Collection 色の単一マテリアルに差し替える。
 *  3. wrapper ノードに座標変換を与える:
 *       - BodyParts3D は Z-up・mm・原点足元。glTF/model-viewer は Y-up・メートル・原点中心。
 *       - スケール ×0.001（mm→m）、Z-up→Y-up（X 軸 -90°回転: (x,y,z)→(x,z,-y)）、
 *         統合 bbox 中心を原点へ移動。結果は「顔が +Z / 上が +Y / 解剖学的右が -X」。
 *  4. join / weld / dedup / prune / Draco 圧縮して書き出す。
 *
 * 実行: web-next ディレクトリで `bun scripts/build-anatomy-glb.mjs`
 *        （特定構造のみ: `bun scripts/build-anatomy-glb.mjs bones vessels`）
 */
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join as joinPath } from "node:path";
import { fileURLToPath } from "node:url";

import { Document, getBounds, NodeIO } from "@gltf-transform/core";
import { KHRDracoMeshCompression } from "@gltf-transform/extensions";
import { dedup, draco, join, mergeDocuments, prune, weld } from "@gltf-transform/functions";
import draco3d from "draco3dgltf";
import obj2gltf from "obj2gltf";

const SCRIPT_DIR = dirname(fileURLToPath(import.meta.url));
const WEB_NEXT = joinPath(SCRIPT_DIR, "..");
const REPO_ROOT = joinPath(WEB_NEXT, "..");
const SRC_ROOT = joinPath(REPO_ROOT, "BodyParts3D");
const EXTRACT_LIST = joinPath(REPO_ROOT, "scripts", "bodyparts3d", "output", "extract_list.csv");
const OUT_DIR = joinPath(WEB_NEXT, "public", "models");
const REPORT_PATH = joinPath(REPO_ROOT, "scripts", "bodyparts3d", "output", "glb_report.json");

/** Collection → manifest 構造 id と baseColor（sRGB 表示値。書き出し時に linear へ変換）。 */
const STRUCTURES = [
  { id: "bones", collection: "Bones", srgb: [0.9, 0.9, 0.88] },
  { id: "muscles", collection: "Muscles", srgb: [0.72, 0.13, 0.13] },
  { id: "nerves", collection: "Nerves", srgb: [0.95, 0.82, 0.15] },
  { id: "vessels", collection: "BloodVessels", srgb: [0.15, 0.35, 0.8] },
  { id: "brain", collection: "Brain", srgb: [0.98, 0.8, 0.83] },
];

const MM_TO_M = 0.001;
// X 軸まわり -90°（Z-up → Y-up）のクォータニオン [x, y, z, w]。
const ROT_X_NEG90 = [-Math.SQRT1_2, 0, 0, Math.SQRT1_2];

/** sRGB 表示値 → linear（glTF baseColorFactor は linear 空間）。 */
function srgbToLinear(c) {
  return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
}

/** 原点座標 (mm, Z-up) にスケール・回転・平行移動を適用してメートル・Y-up 座標へ。 */
function toModelSpace([x, y, z], centerMm) {
  // スケール → 回転 (x,y,z)->(x,z,-y) → 平行移動(-回転後の中心)。
  const s = [x * MM_TO_M, y * MM_TO_M, z * MM_TO_M];
  const c = centerMm.map((v) => v * MM_TO_M);
  const rot = ([a, b, cc]) => [a, cc, -b];
  const [rx, ry, rz] = rot(s);
  const [tcx, tcy, tcz] = rot(c);
  return [rx - tcx, ry - tcy, rz - tcz];
}

/** extract_list.csv を構造(Collection)ごとの行配列へ。 */
function readExtractList() {
  if (!existsSync(EXTRACT_LIST)) {
    throw new Error(
      `extract_list.csv がありません: ${EXTRACT_LIST}\n先に build_master.py を実行してください。`
    );
  }
  // Python csv は CRLF で書き出すため \r を除去する。
  const [header, ...lines] = readFileSync(EXTRACT_LIST, "utf8").trim().split(/\r?\n/);
  const cols = header.split(",");
  const idx = {
    file: cols.indexOf("OBJ File"),
    collection: cols.indexOf("Collection"),
    src: cols.indexOf("Source Set"),
  };
  const byCollection = new Map();
  for (const line of lines) {
    const parts = line.split(",");
    const collection = parts[idx.collection];
    if (!byCollection.has(collection)) byCollection.set(collection, []);
    byCollection.get(collection).push({ file: parts[idx.file], src: parts[idx.src] });
  }
  return byCollection;
}

/** OBJ 先頭コメントから English name と Bounds 中心(mm) を取り出す。 */
function readObjMeta(objPath) {
  const head = readFileSync(objPath, "utf8").slice(0, 4096).split("\n");
  let name = "";
  let center = null;
  for (const line of head) {
    if (!line.startsWith("#")) break;
    if (line.startsWith("# English name")) name = line.split(":")[1]?.trim() ?? "";
    else if (line.startsWith("# Bounds")) {
      const m = line.match(/\(([^)]+)\)\s*-\s*\(([^)]+)\)/);
      if (m) {
        const lo = m[1].split(",").map(Number);
        const hi = m[2].split(",").map(Number);
        center = lo.map((v, i) => (v + hi[i]) / 2);
      }
    }
  }
  return { name, center };
}

/** merge 後に複数生成されるシーンを 1 つへ統合する。 */
function consolidateScenes(doc) {
  const root = doc.getRoot();
  const scenes = root.listScenes();
  const main = scenes[0] ?? doc.createScene("anatomy");
  for (const scene of scenes) {
    if (scene === main) continue;
    for (const node of scene.listChildren()) {
      scene.removeChild(node);
      main.addChild(node);
    }
    scene.dispose();
  }
  root.setDefaultScene(main);
  return main;
}

/** 全メッシュ・プリミティブを 1 つの Collection 色マテリアルへ差し替える。 */
function assignSingleMaterial(doc, id, srgb) {
  const [r, g, b] = srgb.map(srgbToLinear);
  const material = doc
    .createMaterial(`${id}-material`)
    .setBaseColorFactor([r, g, b, 1])
    .setRoughnessFactor(0.7)
    .setMetallicFactor(0.0)
    .setDoubleSided(true); // 法線の向き不整合による黒つぶれを回避。
  for (const mesh of doc.getRoot().listMeshes()) {
    for (const prim of mesh.listPrimitives()) prim.setMaterial(material);
  }
}

async function buildStructure(io, structure, entries) {
  const doc = new Document();
  const parts = [];
  for (const entry of entries) {
    const objPath = joinPath(SRC_ROOT, entry.src, entry.file);
    if (!existsSync(objPath)) {
      console.warn(`  [欠落] ${entry.src}/${entry.file}`);
      continue;
    }
    const glb = await obj2gltf(objPath, { binary: true });
    const src = await io.readBinary(new Uint8Array(glb));
    mergeDocuments(doc, src);
    const meta = readObjMeta(objPath);
    if (meta.center) parts.push({ file: entry.file, name: meta.name, center: meta.center });
  }

  const scene = consolidateScenes(doc);

  // 変換前の統合 bbox（原座標 mm, Z-up）から中心を求める。
  const raw = getBounds(scene);
  const centerMm = raw.min.map((v, i) => (v + raw.max[i]) / 2);

  // wrapper ノードに変換を集約（子はすべて identity）。
  const wrapper = doc.createNode(`${structure.id}-root`);
  for (const node of scene.listChildren()) {
    scene.removeChild(node);
    wrapper.addChild(node);
  }
  scene.addChild(wrapper);
  const translation = toModelSpace([0, 0, 0], centerMm); // 中心→原点の平行移動成分。
  wrapper.setScale([MM_TO_M, MM_TO_M, MM_TO_M]);
  wrapper.setRotation(ROT_X_NEG90);
  wrapper.setTranslation(translation);

  assignSingleMaterial(doc, structure.id, structure.srgb);

  await doc.transform(join(), weld(), dedup(), prune(), draco());

  const outPath = joinPath(OUT_DIR, `${structure.id}.glb`);
  await io.write(outPath, doc);

  const finalBounds = getBounds(scene);
  const size = finalBounds.max.map((v, i) => +(v - finalBounds.min[i]).toFixed(4));
  return {
    id: structure.id,
    collection: structure.collection,
    fileCount: parts.length,
    finalBBoxMeters: { min: finalBounds.min, max: finalBounds.max, size },
    parts: parts.map((p) => ({
      name: p.name,
      centerMeters: toModelSpace(p.center, centerMm).map((v) => +v.toFixed(4)),
    })),
  };
}

async function main() {
  const only = process.argv.slice(2);
  const targets = only.length ? STRUCTURES.filter((s) => only.includes(s.id)) : STRUCTURES;
  if (!targets.length) {
    console.error(`対象構造がありません。指定可能: ${STRUCTURES.map((s) => s.id).join(", ")}`);
    process.exit(1);
  }

  const io = new NodeIO().registerExtensions([KHRDracoMeshCompression]).registerDependencies({
    "draco3d.encoder": await draco3d.createEncoderModule(),
    "draco3d.decoder": await draco3d.createDecoderModule(),
  });

  const byCollection = readExtractList();
  if (!existsSync(OUT_DIR)) mkdirSync(OUT_DIR, { recursive: true });

  const report = [];
  for (const structure of targets) {
    const entries = byCollection.get(structure.collection) ?? [];
    if (!entries.length) {
      console.warn(`⚠ ${structure.id}: ${structure.collection} の抽出が 0 件。スキップ。`);
      continue;
    }
    console.log(`▶ ${structure.id} (${structure.collection}): ${entries.length} OBJ を統合中…`);
    const result = await buildStructure(io, structure, entries);
    const s = result.finalBBoxMeters.size;
    console.log(`✓ ${structure.id}.glb  files=${result.fileCount}  size(m)=${s.join(" × ")}`);
    report.push(result);
  }

  writeFileSync(REPORT_PATH, `${JSON.stringify(report, null, 2)}\n`, "utf8");
  console.log(`\nレポート: ${REPORT_PATH}`);
  console.log(`GLB 出力先: ${OUT_DIR}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
