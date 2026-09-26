/**
 * ファビコン／アプリアイコン一式を生成するビルドスクリプト。
 *
 * デザイン: サイトヘッダーの配色（背景 #0d1117 / アクセント #58a6ff）に合わせ、
 * 医療十字の上に心電図パルスを重ねたモチーフ。SVG をこのファイル内で組み立てる（SSoT）。
 *
 * 出力（Next.js App Router のファイル規約により <link> は自動付与される）:
 *  - app/icon.svg              … モダンブラウザ用（スケーラブル）
 *  - app/favicon.ico           … レガシーブラウザ／Windows 用（16・32・48px の PNG 埋め込み ICO）
 *  - app/apple-icon.png        … iOS ホーム画面用 180px（OS が角丸を付けるため full-bleed）
 *  - public/icons/icon-192.png / icon-512.png   … Android / PWA 用（purpose: any）
 *  - public/icons/icon-maskable-512.png         … Android アダプティブアイコン用（purpose: maskable）
 *
 * 実行: web-next ディレクトリで `bun scripts/generate-icons.mjs`
 */
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

import sharp from "sharp";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

const BG = "#0d1117";
const BORDER = "#30363d";
const ACCENT = "#58a6ff";
const PULSE = "#ffffff";

/**
 * 512×512 viewBox のアイコン SVG を組み立てる。
 *
 * @param {{ rounded: boolean, pulseWidth?: number }} opts
 *   rounded: true で角丸＋枠線（ブラウザタブ用）、false で四隅まで塗る（OS がマスクする用途）。
 *   pulseWidth: 小サイズでパルス線が潰れないよう太さを調整する。0 でパルスを描かない。
 * @returns {string}
 */
function buildSvg({ rounded, pulseWidth = 28 }) {
  const background = rounded
    ? `<rect x="8" y="8" width="496" height="496" rx="112" fill="${BG}" stroke="${BORDER}" stroke-width="16"/>`
    : `<rect width="512" height="512" fill="${BG}"/>`;
  // 十字・パルスとも中心から半径 ~194 以内に収め、maskable の安全領域（半径 204.8）を満たす
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
  ${background}
  <g fill="${ACCENT}">
    <rect x="176" y="80" width="160" height="352" rx="32"/>
    <rect x="80" y="176" width="352" height="160" rx="32"/>
  </g>
  ${pulseWidth > 0 ? `<polyline points="64,256 172,256 208,188 256,340 300,212 332,256 448,256" fill="none" stroke="${PULSE}" stroke-width="${pulseWidth}" stroke-linecap="round" stroke-linejoin="round"/>` : ""}
</svg>
`;
}

/**
 * SVG を指定サイズの PNG バッファへラスタライズする。
 *
 * @param {string} svg
 * @param {number} size
 * @returns {Promise<Buffer>}
 */
function toPng(svg, size) {
  return sharp(Buffer.from(svg), { density: 384 }).resize(size, size).png().toBuffer();
}

/**
 * PNG 埋め込み形式の ICO を組み立てる（Vista 以降の全ブラウザが対応）。
 *
 * @param {{ size: number, png: Buffer }[]} images
 * @returns {Buffer}
 */
function buildIco(images) {
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0); // reserved
  header.writeUInt16LE(1, 2); // type: icon
  header.writeUInt16LE(images.length, 4);

  const entries = [];
  let offset = 6 + 16 * images.length;
  for (const { size, png } of images) {
    const entry = Buffer.alloc(16);
    entry.writeUInt8(size >= 256 ? 0 : size, 0); // 幅（256 は 0 で表す）
    entry.writeUInt8(size >= 256 ? 0 : size, 1); // 高さ
    entry.writeUInt8(0, 2); // パレット数
    entry.writeUInt8(0, 3); // reserved
    entry.writeUInt16LE(1, 4); // color planes
    entry.writeUInt16LE(32, 6); // bits per pixel
    entry.writeUInt32LE(png.length, 8);
    entry.writeUInt32LE(offset, 12);
    entries.push(entry);
    offset += png.length;
  }
  return Buffer.concat([header, ...entries, ...images.map((i) => i.png)]);
}

/**
 * @param {string} relPath
 * @param {string | Buffer} data
 */
function write(relPath, data) {
  const abs = join(root, relPath);
  mkdirSync(dirname(abs), { recursive: true });
  writeFileSync(abs, data);
  console.log(`wrote ${relPath}`);
}

const rounded = buildSvg({ rounded: true });
const fullBleed = buildSvg({ rounded: false });
// 32・48px はパルス線を太くし、16px は線が潰れて十字と混ざるため十字のみにする
const roundedSmall = buildSvg({ rounded: true, pulseWidth: 44 });
const roundedTiny = buildSvg({ rounded: true, pulseWidth: 0 });

write("app/icon.svg", rounded);

const icoImages = await Promise.all(
  [16, 32, 48].map(async (size) => ({
    size,
    png: await toPng(size === 16 ? roundedTiny : roundedSmall, size),
  }))
);
write("app/favicon.ico", buildIco(icoImages));

write("app/apple-icon.png", await toPng(fullBleed, 180));
write("public/icons/icon-192.png", await toPng(rounded, 192));
write("public/icons/icon-512.png", await toPng(rounded, 512));
write("public/icons/icon-maskable-512.png", await toPng(fullBleed, 512));
