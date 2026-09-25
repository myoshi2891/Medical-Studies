/**
 * 元OBJの共通座標から頭頸部アトラスを生成する（bun scripts/build-head-neck-atlas.mjs）。
 * 個別原点へ移動しない。is_a の同一IDは1度だけ採用し、部位別マテリアルを維持する。
 * 全体・7系統・各部位を書き出すことで、個別拡大も元の形状と縮尺を維持する。
 */
import { mkdirSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { Document, getBounds, NodeIO } from "@gltf-transform/core";
import { KHRDracoMeshCompression } from "@gltf-transform/extensions";
import {
  dedup,
  draco,
  join,
  mergeDocuments,
  prune,
  unpartition,
  weld,
} from "@gltf-transform/functions";
import draco3d from "draco3dgltf";
import obj2gltf from "obj2gltf";
import { ATLAS_LAYERS, ATLAS_PARTS } from "../lib/anatomy/atlas.ts";

const source = resolve(import.meta.dirname, "../../BodyParts3D/isa_BP3D_4.0_obj_99");
const output = resolve(import.meta.dirname, "../public/models/atlas");
const io = new NodeIO().registerExtensions([KHRDracoMeshCompression]).registerDependencies({
  "draco3d.encoder": await draco3d.createEncoderModule(),
  "draco3d.decoder": await draco3d.createDecoderModule(),
});
const inventory = readdirSync(source)
  .filter((name) => name.endsWith(".obj"))
  .sort()
  .map((file) => {
    const head = readFileSync(resolve(source, file), "utf8").slice(0, 4096);
    return { file, name: head.match(/# English name\s*:\s*(.+)/)?.[1]?.trim() ?? "" };
  });
const partDocuments = new Map();
const used = new Set();
const parts = {};
mkdirSync(output, { recursive: true });

function consolidate(doc) {
  const scenes = doc.getRoot().listScenes();
  const scene = scenes[0] ?? doc.createScene("atlas");
  for (const other of scenes.slice(1)) {
    for (const node of other.listChildren()) scene.addChild(node);
    other.dispose();
  }
  doc.getRoot().setDefaultScene(scene);
  return scene;
}

for (const part of ATLAS_PARTS) {
  const pattern = new RegExp(part.pattern, "i");
  const selected = inventory.filter((entry) => pattern.test(entry.name));
  if (!selected.length) throw new Error(`${part.id}: 元OBJがありません`);
  const doc = new Document();
  for (const entry of selected) {
    if (used.has(entry.file)) throw new Error(`${entry.file}: 部位間で重複しています`);
    used.add(entry.file);
    const glb = await obj2gltf(resolve(source, entry.file), { binary: true });
    mergeDocuments(doc, await io.readBinary(new Uint8Array(glb)));
  }
  const layer = ATLAS_LAYERS.find((entry) => entry.id === part.layer);
  if (!layer) throw new Error(`${part.id}: レイヤーがありません`);
  const hex = part.id === "jugular" ? "#518ee8" : layer.color;
  const rgb = [1, 3, 5].map((offset) => {
    const c = Number.parseInt(hex.slice(offset, offset + 2), 16) / 255;
    return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  });
  const material = doc
    .createMaterial(part.id)
    .setBaseColorFactor([rgb[0], rgb[1], rgb[2], 1])
    .setRoughnessFactor(0.7)
    .setMetallicFactor(0)
    .setDoubleSided(true);
  for (const mesh of doc.getRoot().listMeshes()) {
    for (const primitive of mesh.listPrimitives()) primitive.setMaterial(material);
  }
  const bounds = getBounds(consolidate(doc));
  parts[part.id] = {
    sourceIds: selected.map((p) => p.file.replace(".obj", "")),
    center: bounds.min.map((v, i) => (v + bounds.max[i]) / 2),
  };
  await doc.transform(join(), weld(), dedup({ keepUniqueNames: true }), prune());
  partDocuments.set(part.id, doc);
  console.log(`${part.id}: ${selected.length} OBJ`);
}
const full = new Document();
for (const doc of partDocuments.values()) mergeDocuments(full, doc);
const bounds = getBounds(consolidate(full));
const center = bounds.min.map((v, i) => (v + bounds.max[i]) / 2);
const convert = ([x, y, z]) => [
  (x - center[0]) / 1000,
  (z - center[2]) / 1000,
  -(y - center[1]) / 1000,
];

async function writeModel(id, ids) {
  const doc = new Document();
  for (const partId of ids) {
    const partDoc = partDocuments.get(partId);
    if (!partDoc) throw new Error(`${partId}: 文書がありません`);
    mergeDocuments(doc, partDoc);
  }
  const scene = consolidate(doc);
  const wrapper = doc.createNode("atlas-root");
  for (const node of scene.listChildren()) wrapper.addChild(node);
  scene.addChild(wrapper);
  wrapper.setScale([0.001, 0.001, 0.001]);
  wrapper.setRotation([-Math.SQRT1_2, 0, 0, Math.SQRT1_2]);
  wrapper.setTranslation(convert([0, 0, 0]));
  await doc.transform(dedup({ keepUniqueNames: true }), prune(), unpartition(), draco());
  await io.write(resolve(output, `${id}.glb`), doc);
}
await writeModel(
  "overview",
  ATLAS_PARTS.map((p) => p.id)
);
for (const layer of ATLAS_LAYERS)
  await writeModel(
    layer.id,
    ATLAS_PARTS.filter((p) => p.layer === layer.id).map((p) => p.id)
  );
for (const part of ATLAS_PARTS) {
  await writeModel(part.id, [part.id]);
  parts[part.id].center = convert(parts[part.id].center).map((v) => Number(v.toFixed(5)));
}
writeFileSync(
  resolve(import.meta.dirname, "../lib/anatomy/atlas-models.json"),
  `${JSON.stringify({ parts }, null, 2)}\n`
);
console.log(`生成完了: ${used.size} OBJ / ${ATLAS_PARTS.length} 部位`);
