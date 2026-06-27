import { describe, expect, it } from "vitest";
import { findDisallowedChunks, sanitizePng } from "./png-sanitize";

const SIGNATURE = [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a];

/** type(4 文字)とデータから length+type+data+crc のチャンクを組む（CRC はテスト用ダミー）。 */
function makeChunk(type: string, data: number[] = []): number[] {
  const len = data.length;
  const lengthBytes = [(len >>> 24) & 0xff, (len >>> 16) & 0xff, (len >>> 8) & 0xff, len & 0xff];
  const typeBytes = [...type].map((ch) => ch.charCodeAt(0));
  const crc = [0, 0, 0, 0];
  return [...lengthBytes, ...typeBytes, ...data, ...crc];
}

/** チャンク列から PNG バイト列（シグネチャ付き）を組む。 */
function makePng(chunks: number[][]): Uint8Array {
  return Uint8Array.from([...SIGNATURE, ...chunks.flat()]);
}

/** バイト列に含まれるチャンク種別を順に抽出（検証用の素朴なスキャナ）。 */
function chunkTypes(png: Uint8Array): string[] {
  const view = new DataView(png.buffer, png.byteOffset, png.byteLength);
  const types: string[] = [];
  let offset = SIGNATURE.length;
  while (offset + 8 <= png.length) {
    const len = view.getUint32(offset);
    const type = String.fromCharCode(
      png[offset + 4],
      png[offset + 5],
      png[offset + 6],
      png[offset + 7]
    );
    types.push(type);
    offset += 12 + len;
    if (type === "IEND") break;
  }
  return types;
}

describe("sanitizePng: 正常系", () => {
  it("クリティカルチャンクと tRNS を順序維持で保持する", () => {
    const png = makePng([
      makeChunk("IHDR", [0, 0, 0, 1, 0, 0, 0, 1, 8, 0, 0, 0, 0]),
      makeChunk("tRNS", [255]),
      makeChunk("IDAT", [1, 2, 3]),
      makeChunk("IEND"),
    ]);
    const out = sanitizePng(png);
    expect(chunkTypes(out)).toEqual(["IHDR", "tRNS", "IDAT", "IEND"]);
  });

  it("tEXt / iTXt / zTXt / tIME / eXIf を除去する", () => {
    const png = makePng([
      makeChunk("IHDR", [0, 0, 0, 1, 0, 0, 0, 1, 8, 0, 0, 0, 0]),
      makeChunk("tEXt", [65, 66]),
      makeChunk("tIME", [7, 0xe0, 1, 1, 0, 0, 0]),
      makeChunk("iTXt", [1, 2]),
      makeChunk("zTXt", [3, 4]),
      makeChunk("eXIf", [5, 6]),
      makeChunk("IDAT", [9]),
      makeChunk("IEND"),
    ]);
    const out = sanitizePng(png);
    expect(chunkTypes(out)).toEqual(["IHDR", "IDAT", "IEND"]);
    expect(findDisallowedChunks(out)).toEqual([]);
  });

  it("保持チャンクのデータを改変しない（IDAT データが一致）", () => {
    const png = makePng([
      makeChunk("IHDR", [0, 0, 0, 2, 0, 0, 0, 2, 8, 2, 0, 0, 0]),
      makeChunk("tEXt", [80, 72, 73]),
      makeChunk("IDAT", [10, 20, 30, 40]),
      makeChunk("IEND"),
    ]);
    const out = sanitizePng(png);
    // 出力中の IDAT データ部（length=4 の直後 type 4 バイトを飛ばした 4 バイト）
    expect(Array.from(out.subarray(out.indexOf(40) - 3, out.indexOf(40) + 1))).toEqual([
      10, 20, 30, 40,
    ]);
  });
});

describe("sanitizePng: 異常系", () => {
  it("非 PNG（シグネチャ不正）で例外", () => {
    expect(() => sanitizePng(Uint8Array.from([0, 1, 2, 3, 4, 5, 6, 7]))).toThrow(/シグネチャ/);
  });

  it("先頭が IHDR でないと例外", () => {
    const png = makePng([makeChunk("IDAT", [1]), makeChunk("IEND")]);
    expect(() => sanitizePng(png)).toThrow(/IHDR/);
  });

  it("チャンク長が範囲外なら例外", () => {
    // length=255 と宣言しつつデータが足りないチャンク
    const broken = Uint8Array.from([
      ...SIGNATURE,
      0,
      0,
      0,
      255,
      0x49,
      0x48,
      0x44,
      0x52, // "IHDR"
      1,
      2,
      3,
    ]);
    expect(() => sanitizePng(broken)).toThrow(/範囲外|切り詰め/);
  });
});
