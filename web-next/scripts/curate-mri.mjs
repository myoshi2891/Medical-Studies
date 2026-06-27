/**
 * MRI 実画像の匿名化 curate スクリプト（設計書 §5.3 / Phase 1）。
 *
 * repo ルートの既存 MRI PNG から代表スライスを等間隔に選び、PHI を運びうる
 * ancillary チャンクを sanitizePng で除去したうえで、患者識別子を含まない中立な
 * 連番（01.png…）として web-next/public/mri/<series>/ へ書き出す。
 *
 * 実行: web-next ディレクトリで `bun scripts/curate-mri.mjs`
 * （TypeScript の sanitizePng を import するため bun で実行する）
 *
 * 注意: 全量同梱は禁止（設計書 §5.3）。各シリーズ COUNT 枚に限定する。
 */
import { existsSync, mkdirSync, readdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { findDisallowedChunks, sanitizePng } from "../lib/anatomy/png-sanitize.ts";

const SCRIPT_DIR = dirname(fileURLToPath(import.meta.url));
const WEB_NEXT = join(SCRIPT_DIR, "..");
const REPO_ROOT = join(WEB_NEXT, "..");
const OUT_ROOT = join(WEB_NEXT, "public", "mri");

/** 1 シリーズあたりの採用枚数（少数枚 curate）。 */
const COUNT = 8;

/**
 * 教育目的で病変を示唆しないため除外する脳スライス（CLAUDE.md 異常所見リスト）。
 */
const BRAIN_EXCLUDE = new Set([
  "MR000077.png",
  "MR000112.png",
  "MR000114.png",
  "MR000119.png",
  "MR000127.png",
  "MR000184.png",
]);

/** curate 対象シリーズの宣言（ソースは repo 相対のみ）。 */
const SERIES = [
  {
    id: "brain",
    srcDir: join(REPO_ROOT, "images", "brain", "MR000059"),
    exclude: BRAIN_EXCLUDE,
  },
  {
    id: "cervical",
    srcDir: join(REPO_ROOT, "images", "cervucal_vertebrae", "images"),
    exclude: new Set(),
  },
];

/** 配列から count 枚を等間隔に選ぶ（端を含む）。 */
function pickEvenly(items, count) {
  if (items.length <= count) return items;
  const last = items.length - 1;
  const picked = [];
  for (let i = 0; i < count; i++) {
    picked.push(items[Math.round((i * last) / (count - 1))]);
  }
  return picked;
}

let totalWritten = 0;
for (const series of SERIES) {
  const all = readdirSync(series.srcDir)
    .filter((f) => f.toLowerCase().endsWith(".png") && !series.exclude.has(f))
    .sort();
  const selected = pickEvenly(all, COUNT);

  const outDir = join(OUT_ROOT, series.id);
  if (existsSync(outDir)) rmSync(outDir, { recursive: true });
  mkdirSync(outDir, { recursive: true });

  selected.forEach((name, i) => {
    const sanitized = sanitizePng(readFileSync(join(series.srcDir, name)));
    const leftover = findDisallowedChunks(sanitized);
    if (leftover.length > 0) {
      throw new Error(`${series.id}/${name}: ancillary チャンクが残存: ${leftover.join(",")}`);
    }
    const outName = `${String(i + 1).padStart(2, "0")}.png`;
    writeFileSync(join(outDir, outName), sanitized);
    totalWritten++;
    console.log(`  ${series.id}/${outName}  ← ${name}`);
  });
  console.log(`✓ ${series.id}: ${selected.length} 枚を curate（候補 ${all.length} 枚）`);
}
console.log(`完了: 計 ${totalWritten} 枚を ${OUT_ROOT} へ出力`);
