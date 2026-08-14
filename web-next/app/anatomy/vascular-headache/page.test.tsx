import { render } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { getRelated } from "@/lib/content/registry";
import VascularHeadachePage from "./page";

// Mermaid は描画コストと CDN 依存を排除するため軽量モックに差し替える。
vi.mock("@/components/MermaidDiagram", () => ({
  default: ({ chart }: { chart: string }) => <div className="mermaid" data-chart={chart} />,
}));

/** ソース HTML（Vascular-headache.html）から実測した忠実転記の契約値。 */
const SECTION_IDS = Array.from({ length: 12 }, (_, i) => `s${i + 1}`);

const EXPECTED_H2_TITLES = [
  "なぜ頭痛と血管が関係するのか",
  "頭蓋内血管の基礎知識",
  "三叉神経血管系",
  "血管説から神経血管説へ",
  "片頭痛とCGRP",
  "前兆と皮質拡延性抑制(CSD)",
  "血管が関わる主な頭痛疾患",
  "疾患比較表",
  "危険信号と初期対応",
  "ICHD-3における位置づけ",
  "まとめ",
  "参考文献・情報源",
];

const EXPECTED_H3_TITLES = [
  "代表的な抗CGRP治療薬(予防療法)",
  "7.1 片頭痛 (Migraine)",
  "7.2 群発頭痛 (Cluster Headache)",
  "7.3 巨細胞性動脈炎 (Giant Cell Arteritis, 側頭動脈炎)",
  "7.4 くも膜下出血 (Subarachnoid Hemorrhage, SAH)",
  "7.5 可逆性脳血管攣縮症候群 (RCVS)",
  "7.6 頸動脈・椎骨動脈解離 (Cervical Artery Dissection)",
];

const MERMAID_COUNT = 5;
const TABLE_COUNT = 2;
const NAV_COUNT = 12;
const ALERT_COUNT = 3;
const EXTERNAL_LINK_COUNT = 28;
const HERO_H1 = "頭痛と血管 ― Vascular Basis of Headache";

describe("VascularHeadachePage: 契約（忠実転記 & 厳格検証）", () => {
  it("hero の <h1> がソースのページタイトルと一致する", () => {
    const { container } = render(<VascularHeadachePage />);
    const hero = container.querySelector(".hero h1");
    expect(hero?.textContent).toBe(HERO_H1);
  });

  it("section.sec の id 配列が s1..s12 と完全一致する", () => {
    const { container } = render(<VascularHeadachePage />);
    const ids = Array.from(container.querySelectorAll("section.sec")).map((s) => s.id);
    expect(ids).toEqual(SECTION_IDS);
  });

  it("<h2> の個数とテキストが section タイトル 12 個と完全一致する", () => {
    const { container } = render(<VascularHeadachePage />);
    const h2s = Array.from(container.querySelectorAll("h2")).filter(
      (h) => h.closest(".related-links") === null
    );
    expect(h2s).toHaveLength(EXPECTED_H2_TITLES.length);
    const titles = h2s.map((h) => h.textContent?.trim());
    expect(titles).toEqual(EXPECTED_H2_TITLES);
  });

  it("<h3> の個数とテキストが 7 個と完全一致する", () => {
    const { container } = render(<VascularHeadachePage />);
    const h3s = Array.from(container.querySelectorAll("h3"));
    expect(h3s).toHaveLength(EXPECTED_H3_TITLES.length);
    const titles = h3s.map((h) => h.textContent?.trim());
    expect(titles).toEqual(EXPECTED_H3_TITLES);
  });

  it("Mermaid 図 5 個が存在し、主要キーワードを保持している", () => {
    const { container } = render(<VascularHeadachePage />);
    const mermaids = container.querySelectorAll(".mermaid");
    expect(mermaids).toHaveLength(MERMAID_COUNT);
    const charts = Array.from(mermaids).map((m) => m.getAttribute("data-chart") ?? "");
    expect(charts[0]).toContain("内頸動脈");
    expect(charts[1]).toContain("三叉神経節");
    expect(charts[2]).toContain("血管説");
    expect(charts[3]).toContain("CGRP");
    expect(charts[4]).toContain("サンダークラップ");
  });

  it("<table> の個数が 2 個で構造・セルデータが保持されている", () => {
    const { container } = render(<VascularHeadachePage />);
    const tables = container.querySelectorAll("table");
    expect(tables).toHaveLength(TABLE_COUNT);

    // 表 1: 疾患比較表 — ヘッダ行と代表的なデータ行のセルを検証する
    const diseaseTable = tables[0];
    const diseaseHeaders = Array.from(diseaseTable.querySelectorAll("thead th")).map((th) =>
      th.textContent?.trim()
    );
    expect(diseaseHeaders).toEqual([
      "疾患名",
      "主に関わる血管・機序",
      "頭痛の特徴",
      "代表的な随伴症状",
      "緊急度",
    ]);

    const diseaseRows = diseaseTable.querySelectorAll("tbody tr");
    expect(diseaseRows).toHaveLength(6);
    const firstRowCells = Array.from(diseaseRows[0].querySelectorAll("td")).map((td) =>
      td.textContent?.trim()
    );
    expect(firstRowCells[1]).toBe("硬膜血管・三叉神経血管系・CGRP");
    expect(firstRowCells[2]).toBe("片側性・拍動性、中等度〜重度、4〜72時間持続");

    // 表 2: ICHD-3 区分表
    const ichdTable = tables[1];
    const ichdHeaders = Array.from(ichdTable.querySelectorAll("thead th")).map((th) =>
      th.textContent?.trim()
    );
    expect(ichdHeaders).toEqual(["区分", "内容", "血管に関連する代表例"]);
    expect(ichdTable.textContent).toContain("基礎疾患のない、神経・血管系機能の変化による頭痛");
  });

  it("サイドバー nav-a の個数 12 個と href (#s1..#s12) が一致する", () => {
    const { container } = render(<VascularHeadachePage />);
    const navs = container.querySelectorAll(".nav-a");
    expect(navs).toHaveLength(NAV_COUNT);
    const hrefs = Array.from(navs).map((a) => a.getAttribute("href"));
    expect(hrefs).toEqual(SECTION_IDS.map((id) => `#${id}`));
  });

  it("全 3 個のアラート (.alert) が正確に描画されている", () => {
    const { container } = render(<VascularHeadachePage />);
    const alerts = container.querySelectorAll(".alert");
    expect(alerts).toHaveLength(ALERT_COUNT);
    expect(container.querySelectorAll(".alert.a-info")).toHaveLength(1);
    expect(container.querySelectorAll(".alert.a-warn")).toHaveLength(1);
    expect(container.querySelectorAll(".alert.a-danger")).toHaveLength(1);
  });

  it("免責事項 (.disclaimer) と フッター (.footer) の文言が漏れなく含まれる", () => {
    const { container } = render(<VascularHeadachePage />);
    const disclaimer = container.querySelector(".disclaimer");
    expect(disclaimer?.textContent).toContain("学術・教育・研究目的のみ");
    const footer = container.querySelector(".footer");
    expect(footer?.textContent).toContain("頭痛と血管 ― Vascular Basis of Headache");
  });

  it(`外部リンク (${EXTERNAL_LINK_COUNT} 個) はすべて target=_blank と rel=noopener noreferrer を持つ`, () => {
    const { container } = render(<VascularHeadachePage />);
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
    const { container } = render(<VascularHeadachePage />);
    const internals = Array.from(container.querySelectorAll("a")).filter((a) =>
      (a.getAttribute("href") ?? "").startsWith("#")
    );
    expect(internals.length).toBeGreaterThan(0);
    for (const a of internals) {
      expect(a.getAttribute("href")).not.toContain(".html");
    }
  });
});

describe("VascularHeadachePage: 関連ページ導線", () => {
  const HREF = "/anatomy/vascular-headache";

  it("レジストリの関連ページをすべてリンクとして描画する", () => {
    const { container } = render(<VascularHeadachePage />);
    const hrefs = Array.from(container.querySelectorAll(".related-links a")).map((a) =>
      a.getAttribute("href")
    );
    expect(hrefs).toEqual(getRelated(HREF).map((e) => e.href));
  });

  it("内部リンクを最低 2 本持つ（plans/002 Step 3）", () => {
    const { container } = render(<VascularHeadachePage />);
    const links = container.querySelectorAll(".related-links a");
    expect(links.length).toBeGreaterThanOrEqual(2);
    for (const link of links) {
      expect(link.getAttribute("href")?.startsWith("/")).toBe(true);
    }
  });
});

describe("VascularHeadachePage: 用語ツールチップ（AutoGlossary）", () => {
  /** 本文中でツールチップ化される用語の下限（用語集の収録語数に応じて増える）。 */
  const MIN_TERM_TRIGGERS = 25;

  it("本文の専門用語がツールチップ化されている", () => {
    const { container } = render(<VascularHeadachePage />);
    const triggers = container.querySelectorAll("main button.term");
    expect(triggers.length).toBeGreaterThanOrEqual(MIN_TERM_TRIGGERS);
  });

  it("血管ドメインの代表的な用語がツールチップ化されている", () => {
    const { container } = render(<VascularHeadachePage />);
    const labels = Array.from(container.querySelectorAll("main button.term")).map(
      (b) => b.textContent
    );
    expect(labels).toContain("硬膜");
    expect(labels).toContain("くも膜下出血");
    expect(labels).toContain("三叉神経");
  });

  it("リンクの内側にツールチップを差し込まない（入れ子の対話要素を作らない）", () => {
    const { container } = render(<VascularHeadachePage />);
    expect(container.querySelectorAll("a button.term")).toHaveLength(0);
  });
});
