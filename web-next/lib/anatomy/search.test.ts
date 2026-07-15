import { describe, expect, it } from "vitest";
import { searchAnatomy } from "./search";

/**
 * 検索コア `searchAnatomy` の契約テスト。
 * manifest（`ANATOMY_MANIFEST`）を索引源とし、日本語・英語・略称・大文字小文字を
 * 横断照合する純粋関数であることを保証する（設計書 §5 / promp.md ②）。
 */
describe("searchAnatomy", () => {
  it("空・空白のみのクエリは空配列を返す", () => {
    expect(searchAnatomy("")).toEqual([]);
    expect(searchAnatomy("   ")).toEqual([]);
  });

  it("略称 V1 で神経のホットスポットにヒットする", () => {
    const hits = searchAnatomy("V1");
    const hit = hits.find((h) => h.kind === "hotspot" && h.structureId === "nerves");
    expect(hit).toBeDefined();
    // ホットスポット・構造ヒットのアンカーは #<id> 形式。
    expect(hit?.href).toBe("#nerves");
  });

  it("日本語 椎骨動脈 で血管のホットスポットにヒットする", () => {
    const hits = searchAnatomy("椎骨動脈");
    const hit = hits.find((h) => h.structureId === "vessels" && h.kind === "hotspot");
    expect(hit?.label).toContain("椎骨動脈");
    expect(hit?.href).toBe("#vessels");
  });

  it("略称 TCC で脳・脳幹のホットスポットにヒットする", () => {
    const hits = searchAnatomy("TCC");
    expect(hits.some((h) => h.structureId === "brain" && h.kind === "hotspot")).toBe(true);
  });

  it("summary 内の語 Willis で血管の構造ヒットを返す", () => {
    const hits = searchAnatomy("Willis");
    const hit = hits.find((h) => h.structureId === "vessels" && h.kind === "structure");
    expect(hit).toBeDefined();
    expect(hit?.href).toBe("#vessels");
  });

  it("リンク名 ONB は link ヒットとして遷移先ルートを href に持つ", () => {
    const hits = searchAnatomy("ONB");
    const hit = hits.find((h) => h.kind === "link" && h.label.includes("ONB"));
    expect(hit?.href).toBe("/blocks/occipital-nerve-block");
  });

  it("大文字小文字を区別しない（migraine == Migraine）", () => {
    const lower = searchAnatomy("migraine").map((h) => `${h.kind}:${h.href}`);
    const proper = searchAnatomy("Migraine").map((h) => `${h.kind}:${h.href}`);
    expect(lower).toEqual(proper);
    expect(lower.length).toBeGreaterThan(0);
  });

  it("manifest に無い語（ICA）は空配列", () => {
    expect(searchAnatomy("ICA")).toEqual([]);
  });

  it("全ヒットの href は # か / で始まる（安全な内部遷移のみ）", () => {
    for (const h of searchAnatomy("神経")) {
      expect(h.href.startsWith("#") || h.href.startsWith("/")).toBe(true);
    }
  });
});
