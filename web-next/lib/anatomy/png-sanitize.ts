/**
 * PNG 匿名化ユーティリティ（公開 MRI アセット化の前提・設計書 §5.3）。
 *
 * 既存 MRI PNG を `web-next/public/mri/` へ curate する際、PHI を運びうる
 * ancillary チャンク（tEXt / iTXt / zTXt / tIME / eXIf 等）を機械的に除去する。
 * 画像の見た目を保つため、構造に必須のクリティカルチャンクと透過情報のみ残す。
 *
 * 純粋関数として実装し（副作用なし・入出力は Uint8Array）、先行テストで
 * 「何を残し何を捨てたか」を監査可能にする。`any` は使わない。
 */

/** PNG シグネチャ（8 バイト固定）。 */
const PNG_SIGNATURE = Uint8Array.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);

/**
 * 保持を許可するチャンク種別。
 * 構造に必須なクリティカルチャンク（IHDR/PLTE/IDAT/IEND）＋透過（tRNS）のみ。
 * これ以外（テキスト・時刻・色管理・物理寸法など）はすべて除去する。
 */
const ALLOWED_CHUNKS: ReadonlySet<string> = new Set(["IHDR", "PLTE", "tRNS", "IDAT", "IEND"]);

/** 1 つの PNG チャンク。 */
interface PngChunk {
  type: string;
  /** length(4) + type(4) + data(len) + crc(4) を含むチャンク全体のバイト列。 */
  raw: Uint8Array;
}

function hasPngSignature(input: Uint8Array): boolean {
  if (input.length < PNG_SIGNATURE.length) return false;
  for (let i = 0; i < PNG_SIGNATURE.length; i++) {
    if (input[i] !== PNG_SIGNATURE[i]) return false;
  }
  return true;
}

/**
 * PNG バイト列をチャンク列へ分解する。CRC は検証せず、構造のみを確認する。
 *
 * @param input - PNG 全体のバイト列。
 * @returns 先頭から末尾までのチャンク列。
 * @throws 不正なシグネチャ・切り詰められたチャンク・IHDR 不在で Error。
 */
function readChunks(input: Uint8Array): PngChunk[] {
  if (!hasPngSignature(input)) {
    throw new Error("PNG シグネチャが不正です");
  }
  const view = new DataView(input.buffer, input.byteOffset, input.byteLength);
  const chunks: PngChunk[] = [];
  let offset = PNG_SIGNATURE.length;

  while (offset < input.length) {
    if (offset + 8 > input.length) {
      throw new Error(`チャンクヘッダが切り詰められています (offset=${offset})`);
    }
    const dataLength = view.getUint32(offset);
    const typeStart = offset + 4;
    const type = String.fromCharCode(
      input[typeStart],
      input[typeStart + 1],
      input[typeStart + 2],
      input[typeStart + 3]
    );
    const chunkEnd = offset + 12 + dataLength; // length(4)+type(4)+data+crc(4)
    if (chunkEnd > input.length) {
      throw new Error(`チャンク '${type}' のデータ長が範囲外です (offset=${offset})`);
    }
    chunks.push({ type, raw: input.subarray(offset, chunkEnd) });
    offset = chunkEnd;
    if (type === "IEND") break;
  }

  if (chunks.length === 0 || chunks[0].type !== "IHDR") {
    throw new Error("先頭チャンクが IHDR ではありません");
  }
  return chunks;
}

/**
 * PNG から PHI を運びうる ancillary チャンクを除去し、再構成して返す。
 * チャンクのデータ・CRC は改変しないため、保持チャンクの描画結果は不変。
 *
 * @param input - 入力 PNG のバイト列（信頼できない外部データ）。
 * @returns ancillary 除去済みの PNG バイト列。
 * @throws PNG として不正な場合は理由付き Error（握りつぶさない）。
 */
export function sanitizePng(input: Uint8Array): Uint8Array {
  const chunks = readChunks(input);
  if (chunks.length === 0 || chunks[chunks.length - 1].type !== "IEND") {
    throw new Error("終端チャンクが IEND ではありません");
  }
  const kept = chunks.filter((c) => ALLOWED_CHUNKS.has(c.type));

  const total = PNG_SIGNATURE.length + kept.reduce((sum, c) => sum + c.raw.length, 0);
  const out = new Uint8Array(total);
  out.set(PNG_SIGNATURE, 0);
  let pos = PNG_SIGNATURE.length;
  for (const c of kept) {
    out.set(c.raw, pos);
    pos += c.raw.length;
  }
  return out;
}

/**
 * PNG に ancillary（非許可）チャンクが残っていないかを検査する（投入後の検証用）。
 *
 * @param input - 検査対象の PNG バイト列。
 * @returns 検出された非許可チャンク種別の配列（空なら匿名化済み）。
 */
export function findDisallowedChunks(input: Uint8Array): string[] {
  return readChunks(input)
    .filter((c) => !ALLOWED_CHUNKS.has(c.type))
    .map((c) => c.type);
}
