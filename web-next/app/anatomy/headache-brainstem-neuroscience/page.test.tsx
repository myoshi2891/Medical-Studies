import { render } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { getRelated } from "@/lib/content/registry";
import HeadacheBrainstemNeurosciencePage from "./page";

// Mermaid は描画コストと CDN 依存を排除するため軽量モックに差し替える。
vi.mock("@/components/MermaidDiagram", () => ({
  default: ({ chart }: { chart: string }) => <div className="mermaid" data-chart={chart} />,
}));

/** ソース HTML (Headache-brainstem-neuroscience.html) から実測した忠実転記の契約値。 */
const SECTION_IDS = Array.from({ length: 13 }, (_, i) => `s${i + 1}`);

const EXPECTED_H2_TITLES = [
  "この記事の位置づけ",
  "頭痛とは何か ― 国際的な分類の枠組み",
  "「痛みを感じる脳」というよくある誤解",
  "三叉神経血管系 ― 頭痛が生まれる入口",
  "脳幹 ― 頭痛の中継点であり調整役",
  "三叉神経頸椎複合体 ― 首と頭痛がつながる理由",
  "視床下部 ― 予兆症状と発作の周期性",
  "大脳皮質と皮質拡延性抑制（CSD）― 前兆のメカニズム",
  "片頭痛発作の全体像（統合フローチャート）",
  "群発頭痛と三叉神経自律神経反射",
  "まとめ表 ― 脳・脳幹の主要構造と頭痛への関与",
  "治療標的との接点",
  "参考文献・情報源",
];

const EXPECTED_H3_TITLES = [
  "ICHD-3の3大部門",
  "5-1. 三叉神経脊髄路核 尾側亜核（Trigeminal Nucleus Caudalis, TNC）",
  "5-2. 中脳水道周囲灰白質（Periaqueductal Gray, PAG）",
  "5-3. 延髄吻側腹内側部（Rostral Ventromedial Medulla, RVM）",
  "5-4. 青斑核（Locus Coeruleus, LC）・縫線核（Raphe Nuclei）",
  "5-5. 「片頭痛発生装置（migraine generator）」論争",
];

const HERO_TAGS = [
  "三叉神経血管系",
  "脳幹",
  "三叉神経頸椎複合体",
  "視床下部",
  "ICHD-3",
  "CGRP",
  "群発頭痛",
];

const MERMAID_COUNT = 4;
const TABLE_COUNT = 3;
const NAV_COUNT = 13;
const ALERT_COUNT = 12;
const EXTERNAL_LINK_COUNT = 34;
const HERO_H1 = "頭痛と脳・脳幹 ― 国際文献に基づく神経科学的解説";

describe("HeadacheBrainstemNeurosciencePage: 契約（忠実転記 & 厳格検証）", () => {
  it("hero の <h1> とタグ一覧がソースのページタイトルと一致する", () => {
    const { container } = render(<HeadacheBrainstemNeurosciencePage />);
    const heroH1 = container.querySelector(".hero h1");
    expect(heroH1?.textContent).toBe(HERO_H1);

    const tags = Array.from(container.querySelectorAll(".hero-tag")).map((t) =>
      t.textContent?.trim()
    );
    expect(tags).toEqual(HERO_TAGS);
  });

  it("section.sec の id 配列が s1..s13 と完全一致する", () => {
    const { container } = render(<HeadacheBrainstemNeurosciencePage />);
    const ids = Array.from(container.querySelectorAll("section.sec")).map((s) => s.id);
    expect(ids).toEqual(SECTION_IDS);
  });

  it("<h2> の個数とテキストが section タイトル 13 個と完全一致する", () => {
    const { container } = render(<HeadacheBrainstemNeurosciencePage />);
    const h2s = Array.from(container.querySelectorAll("h2")).filter(
      (h) => h.closest(".related-links") === null
    );
    expect(h2s).toHaveLength(EXPECTED_H2_TITLES.length);
    const titles = h2s.map((h) => h.textContent?.trim());
    expect(titles).toEqual(EXPECTED_H2_TITLES);
  });

  it("<h3> の個数とテキストが 6 個と完全一致する", () => {
    const { container } = render(<HeadacheBrainstemNeurosciencePage />);
    const h3s = Array.from(container.querySelectorAll("h3"));
    expect(h3s).toHaveLength(EXPECTED_H3_TITLES.length);
    const titles = h3s.map((h) => h.textContent?.trim());
    expect(titles).toEqual(EXPECTED_H3_TITLES);
  });

  it("Mermaid 図 4 個が存在し、主要キーワードを保持している", () => {
    const { container } = render(<HeadacheBrainstemNeurosciencePage />);
    const mermaids = container.querySelectorAll(".mermaid");
    expect(mermaids).toHaveLength(MERMAID_COUNT);
    const charts = Array.from(mermaids).map((m) => m.getAttribute("data-chart") ?? "");
    expect(charts[0]).toContain("三叉神経節");
    expect(charts[1]).toContain("Trigeminocervical Complex");
    expect(charts[2]).toContain("皮質拡延性抑制");
    expect(charts[3]).toContain("上唾液核");
  });

  it("<table> の個数が 3 個で構造・セルデータが保持されている", () => {
    const { container } = render(<HeadacheBrainstemNeurosciencePage />);
    const tables = container.querySelectorAll("table");
    expect(tables).toHaveLength(TABLE_COUNT);
    expect(container.querySelectorAll("table.th-purple")).toHaveLength(1);
  });

  it("サイドバー nav-a の個数 13 個と href (#s1..#s13) が一致する", () => {
    const { container } = render(<HeadacheBrainstemNeurosciencePage />);
    const navs = container.querySelectorAll(".nav-a");
    expect(navs).toHaveLength(NAV_COUNT);
    const hrefs = Array.from(navs).map((a) => a.getAttribute("href"));
    expect(hrefs).toEqual(SECTION_IDS.map((id) => `#${id}`));
  });

  it("全 12 個のアラート (.alert) が正確に描画されている", () => {
    const { container } = render(<HeadacheBrainstemNeurosciencePage />);
    const alerts = container.querySelectorAll(".alert");
    expect(alerts).toHaveLength(ALERT_COUNT);
    expect(container.querySelectorAll(".alert.a-info")).toHaveLength(5);
    expect(container.querySelectorAll(".alert.a-ok")).toHaveLength(3);
    expect(container.querySelectorAll(".alert.a-warn")).toHaveLength(2);
    expect(container.querySelectorAll(".alert.a-purple")).toHaveLength(2);
  });

  it("免責事項 (.disclaimer) と フッター (.footer) の文言が漏れなく含まれる", () => {
    const { container } = render(<HeadacheBrainstemNeurosciencePage />);
    const disclaimer = container.querySelector(".disclaimer");
    expect(disclaimer?.textContent).toContain("学術・教育・研究目的のみ");
    const footer = container.querySelector(".footer");
    expect(footer?.textContent).toContain("頭痛と脳・脳幹");
  });

  it(`外部リンク (${EXTERNAL_LINK_COUNT} 個) はすべて target=_blank と rel=noopener noreferrer を持つ`, () => {
    const { container } = render(<HeadacheBrainstemNeurosciencePage />);
    const externals = Array.from(container.querySelectorAll("a")).filter((a) =>
      /^https?:\/\//.test(a.getAttribute("href") ?? "")
    );
    expect(externals.length).toBe(EXTERNAL_LINK_COUNT);
    for (const a of externals) {
      expect(a.getAttribute("target")).toBe("_blank");
      expect(a.getAttribute("rel")).toBe("noopener noreferrer");
    }
  });

  it("内部リンク（# 始まり）に .html を含まない", () => {
    const { container } = render(<HeadacheBrainstemNeurosciencePage />);
    const internals = Array.from(container.querySelectorAll("a")).filter((a) =>
      (a.getAttribute("href") ?? "").startsWith("#")
    );
    expect(internals.length).toBeGreaterThan(0);
    for (const a of internals) {
      expect(a.getAttribute("href")).not.toContain(".html");
    }
  });
});

describe("HeadacheBrainstemNeurosciencePage: 関連ページ導線", () => {
  const HREF = "/anatomy/headache-brainstem-neuroscience";

  it("レジストリの関連ページをすべてリンクとして描画する", () => {
    const { container } = render(<HeadacheBrainstemNeurosciencePage />);
    const hrefs = Array.from(container.querySelectorAll(".related-links a")).map((a) =>
      a.getAttribute("href")
    );
    expect(hrefs).toEqual(getRelated(HREF).map((e) => e.href));
  });

  it("内部リンクを最低 2 本持つ（plans/002 Step 3）", () => {
    const { container } = render(<HeadacheBrainstemNeurosciencePage />);
    const links = container.querySelectorAll(".related-links a");
    expect(links.length).toBeGreaterThanOrEqual(2);
    for (const link of links) {
      expect(link.getAttribute("href")?.startsWith("/")).toBe(true);
    }
  });
});

describe("HeadacheBrainstemNeurosciencePage: 用語ツールチップ（AutoGlossary）", () => {
  const MIN_TERM_TRIGGERS = 15;

  it("本文の専門用語がツールチップ化されている", () => {
    const { container } = render(<HeadacheBrainstemNeurosciencePage />);
    const triggers = container.querySelectorAll("main button.term");
    expect(triggers.length).toBeGreaterThanOrEqual(MIN_TERM_TRIGGERS);
  });

  it("脳幹・解剖ドメインの代表的な用語がツールチップ化されている", () => {
    const { container } = render(<HeadacheBrainstemNeurosciencePage />);
    const labels = Array.from(container.querySelectorAll("main button.term")).map(
      (b) => b.textContent
    );
    expect(labels).toContain("脳幹");
    expect(labels).toContain("三叉神経");
  });

  it("リンクの内側にツールチップを差し込まない（入れ子の対話要素を作らない）", () => {
    const { container } = render(<HeadacheBrainstemNeurosciencePage />);
    expect(container.querySelectorAll("a button.term")).toHaveLength(0);
  });
});
