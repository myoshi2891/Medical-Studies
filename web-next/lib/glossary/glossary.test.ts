import { describe, expect, it } from "vitest";
import { GLOSSARY, getTerm } from "./glossary";
import { type GlossaryTerm, validateGlossary } from "./types";

const valid: GlossaryTerm = {
  id: "sample",
  term: "見本用語",
  reading: "みほんようご",
  plain: "テスト用のやさしい解説。",
};

describe("validateGlossary: 正常系", () => {
  it("正しい配列を検証して返す", () => {
    const result = validateGlossary([valid]);
    expect(result).toEqual([valid]);
  });
});

describe("validateGlossary: 異常系（握りつぶさず例外）", () => {
  it("配列でなければ例外", () => {
    expect(() => validateGlossary({})).toThrow(/配列/);
  });

  it("空配列なら例外", () => {
    expect(() => validateGlossary([])).toThrow(/最低1語/);
  });

  it("必須フィールドが空文字なら例外", () => {
    expect(() => validateGlossary([{ ...valid, reading: "" }])).toThrow(/reading/);
  });

  it("id が重複していれば例外", () => {
    expect(() => validateGlossary([valid, { ...valid, term: "別表記" }])).toThrow(/重複/);
  });
});

describe("getTerm", () => {
  it("既知 id を解決する", () => {
    const t = getTerm("cgrp");
    expect(t).toBeDefined();
    expect(t?.id).toBe("cgrp");
    expect(t?.reading.length).toBeGreaterThan(0);
    expect(t?.plain.length).toBeGreaterThan(0);
  });

  it("未知 id は undefined", () => {
    expect(getTerm("__unknown__")).toBeUndefined();
  });
});

describe("GLOSSARY: レジストリ整合", () => {
  it("起動時検証を通過し最低1語を持つ", () => {
    expect(GLOSSARY.length).toBeGreaterThan(0);
  });

  it("id は全て一意", () => {
    const ids = GLOSSARY.map((t) => t.id);
    expect(new Set(ids).size).toBe(ids.length);
  });
});

/**
 * 解剖・血管・骨格筋・病態ドメインの収録語。
 * /anatomy 配下の 3 ページ（骨・筋・血管）と病態解説ページで高頻度に出現する。
 */
const ANATOMY_PATHOPHYSIOLOGY_IDS = [
  // 血管・脈管
  "dura-mater",
  "venous-sinus",
  "internal-carotid-artery",
  "basilar-artery",
  "sah",
  "arterial-dissection",
  "vasospasm",
  "giant-cell-arteritis",
  "rcvs",
  // 病態・神経生理
  "nociceptor",
  "neurogenic-inflammation",
  "autonomic-nervous-system",
  "sympathetic-nerve",
  "parasympathetic-nerve",
  "hypothalamus",
  "brainstem",
  "cerebral-cortex",
  "trigeminal-ganglion",
  "occipital-neuralgia",
  // 骨・関節
  "craniocervical-junction",
  "atlanto-occipital-joint",
  "paranasal-sinus",
  "tmj",
  "temporal-bone",
  "sphenoid-bone",
  // 筋
  "temporalis",
  "masseter",
  "frontalis",
  "splenius",
  "levator-scapulae",
  "scalene",
  // 臨床所見
  "tenderness",
  "range-of-motion",
] as const;

describe("GLOSSARY: 解剖・病態ドメインの収録", () => {
  it.each(ANATOMY_PATHOPHYSIOLOGY_IDS)("%s が解決でき、読み仮名と解説を持つ", (id) => {
    const t = getTerm(id);
    expect(t).toBeDefined();
    expect(t?.reading.length).toBeGreaterThan(0);
    expect(t?.plain.length).toBeGreaterThan(0);
  });
});

describe("GLOSSARY: 品質不変条件", () => {
  it("term 表記が重複しない", () => {
    // 重複すると AutoGlossary の最長一致で先勝ちになり、後発エントリが恒久的に未マッチになる。
    const terms = GLOSSARY.map((t) => t.term);
    expect(new Set(terms).size).toBe(terms.length);
  });

  it("reading に漢字を含まない（読み仮名はかな表記）", () => {
    const withKanji = GLOSSARY.filter((t) => /[一-鿿]/.test(t.reading));
    expect(withKanji.map((t) => t.id)).toEqual([]);
  });

  it("plain は 1〜2 文相当に収まる（120 文字以内）", () => {
    const tooLong = GLOSSARY.filter((t) => t.plain.length > 120);
    expect(tooLong.map((t) => t.id)).toEqual([]);
  });
});
