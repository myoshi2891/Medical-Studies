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
