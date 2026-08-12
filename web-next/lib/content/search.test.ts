/**
 * サイト横断検索コア `searchContent` の契約テスト（plans/007 Step 2）。
 *
 * `lib/anatomy/search.test.ts` を手本に、レジストリ（`CONTENT_REGISTRY`）を索引源として
 * 日本語・英語・略称・大文字小文字を横断照合する純粋関数であることを保証する。
 * DOM に依存しないため、UI を介さずここで検索仕様を固定できる。
 */

import { describe, expect, it } from "vitest";
import { isSafeHref } from "@/components/site/nav-links";
import { CONTENT_REGISTRY } from "./registry";
import { CATEGORY_LABELS, searchContent } from "./search";

describe("searchContent", () => {
  it("空・空白のみのクエリは空配列を返す", () => {
    expect(searchContent("")).toEqual([]);
    expect(searchContent("   ")).toEqual([]);
  });

  it("title の語（片頭痛）でヒットする", () => {
    const hits = searchContent("片頭痛");
    expect(hits.map((h) => h.href)).toContain("/headaches/migraine");
  });

  it("keywords のみに存在する略称（CGRP）でヒットする", () => {
    const hits = searchContent("CGRP");
    expect(hits.map((h) => h.href)).toContain("/treatment/cgrp-pathway-headache-treatments");
  });

  it("keywords のみに存在する日本語（不眠）でヒットする", () => {
    const hits = searchContent("不眠");
    expect(hits.map((h) => h.href)).toContain("/therapies/sleep-and-headache-guide");
  });

  it("略称 MOH は疾患ページと治療ページの双方にヒットする", () => {
    const hrefs = searchContent("MOH").map((h) => h.href);
    expect(hrefs).toContain("/headaches/medication-overuse-headache");
    expect(hrefs).toContain("/treatment/moh-acute-use-days");
  });

  it("大文字小文字を区別しない（hit-6 == HIT-6）", () => {
    const lower = searchContent("hit-6").map((h) => h.href);
    const upper = searchContent("HIT-6").map((h) => h.href);
    expect(lower).toEqual(upper);
    expect(lower).toContain("/prom/headache-impact-test");
  });

  it("部分一致で引ける（トリガー → トリガーポイント関連を含む）", () => {
    const hrefs = searchContent("トリガー").map((h) => h.href);
    expect(hrefs).toContain("/treatment/headache-trigger-identification-guide");
    expect(hrefs).toContain("/therapies/trigger-points-and-headache");
  });

  it("カテゴリ表示名（神経ブロック）でそのカテゴリのページを列挙できる", () => {
    const hits = searchContent(CATEGORY_LABELS.blocks);
    expect(hits.length).toBe(CONTENT_REGISTRY.filter((e) => e.category === "blocks").length);
    for (const hit of hits) {
      expect(hit.category).toBe("blocks");
    }
  });

  it("レジストリに無い語（ICA）は空配列", () => {
    expect(searchContent("ICA")).toEqual([]);
  });

  it("同一 href を重複して返さない", () => {
    const hrefs = searchContent("頭痛").map((h) => h.href);
    expect(new Set(hrefs).size).toBe(hrefs.length);
  });

  it("ヒットはレジストリ宣言順を保つ", () => {
    const order = CONTENT_REGISTRY.map((e) => e.href);
    const hits = searchContent("頭痛").map((h) => h.href);
    const expected = order.filter((href) => hits.includes(href));
    expect(hits).toEqual(expected);
  });

  it("全ヒットの href が安全な内部パス（isSafeHref）である", () => {
    for (const hit of searchContent("頭痛")) {
      expect(isSafeHref(hit.href), `unsafe href: ${hit.href}`).toBe(true);
    }
  });

  it("ヒットは表示用のタイトルとカテゴリ表示名を持つ", () => {
    const hit = searchContent("MIDAS")[0];
    expect(hit?.href).toBe("/prom/migraine-disability-assessment");
    expect(hit?.title.length).toBeGreaterThan(0);
    expect(hit?.context).toBe(CATEGORY_LABELS.prom);
  });

  it("前後の空白は無視される", () => {
    expect(searchContent("  MIDAS  ").map((h) => h.href)).toEqual(
      searchContent("MIDAS").map((h) => h.href)
    );
  });
});
