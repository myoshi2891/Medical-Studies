import { render } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { getRelated } from "@/lib/content/registry";
import AcuteTreatmentOfHeadachePage from "./page";

// Mermaid は描画コストと CDN 依存を排除するため軽量モックに差し替える。
vi.mock("@/components/MermaidDiagram", () => ({
  default: ({ chart }: { chart: string }) => <div className="mermaid" data-chart={chart} />,
}));

/** ソース HTML から実測した忠実転記の契約値。 */
const SECTION_IDS = Array.from({ length: 7 }, (_, i) => `s${i + 1}`);
const H2_COUNT = 7; // セクションタイトル (元の h1.sec-title から降格)
const H3_COUNT = 16; // 元の h2 から降格
const H4_COUNT = 6; // 元の h3 から降格
const MERMAID_COUNT = 4;
const TABLE_COUNT = 6;
const HERO_H1 = "頭痛の急性期治療の考え方";
const EXTERNAL_LINKS_COUNT = 48;

describe("AcuteTreatmentOfHeadachePage: 契約（忠実転記）", () => {
  it("hero の <h1> がソース of ページタイトルと一致する", () => {
    const { container } = render(<AcuteTreatmentOfHeadachePage />);
    const hero = container.querySelector(".hero h1");
    expect(hero?.textContent).toBe(HERO_H1);
  });

  it("section.sec の id 配列が s1..s7 と一致する", () => {
    const { container } = render(<AcuteTreatmentOfHeadachePage />);
    const ids = Array.from(container.querySelectorAll("section.sec")).map((s) => s.id);
    expect(ids).toEqual(SECTION_IDS);
  });

  it("<h2> の個数が section タイトル数と一致する", () => {
    const { container } = render(<AcuteTreatmentOfHeadachePage />);
    // 転記契約は元 HTML 由来の見出しのみを数える。RelatedLinks（plans/002 Step 3 の
    // サイト共通導線）が足す h2 は転記物ではないため除外する。
    const h2s = Array.from(container.querySelectorAll("h2")).filter(
      (h) => h.closest(".related-links") === null
    );
    expect(h2s).toHaveLength(H2_COUNT);
  });

  it("<h3> の個数が降格後の大見出し数と一致する", () => {
    const { container } = render(<AcuteTreatmentOfHeadachePage />);
    expect(container.querySelectorAll("h3")).toHaveLength(H3_COUNT);
  });

  it("<h4> の個数が降格後の小見出し数と一致する", () => {
    const { container } = render(<AcuteTreatmentOfHeadachePage />);
    expect(container.querySelectorAll("h4")).toHaveLength(H4_COUNT);
  });

  it("Mermaid 図の個数がソースと一致する", () => {
    const { container } = render(<AcuteTreatmentOfHeadachePage />);
    expect(container.querySelectorAll(".mermaid")).toHaveLength(MERMAID_COUNT);
  });

  it("<table> の個数がソースと一致する", () => {
    const { container } = render(<AcuteTreatmentOfHeadachePage />);
    expect(container.querySelectorAll("table")).toHaveLength(TABLE_COUNT);
  });

  it("外部リンク（http 始まり）はすべて target=_blank と rel=noopener noreferrer を持ち、個数が一致する", () => {
    const { container } = render(<AcuteTreatmentOfHeadachePage />);
    const externals = Array.from(container.querySelectorAll("a")).filter((a) =>
      /^https?:\/\//.test(a.getAttribute("href") ?? "")
    );
    expect(externals).toHaveLength(EXTERNAL_LINKS_COUNT);
    for (const a of externals) {
      expect(a.getAttribute("target")).toBe("_blank");
      expect(a.getAttribute("rel")).toBe("noopener noreferrer");
    }
  });

  it("内部リンク（# 始まり）に .html を含まない", () => {
    const { container } = render(<AcuteTreatmentOfHeadachePage />);
    const internals = Array.from(container.querySelectorAll("a")).filter((a) =>
      (a.getAttribute("href") ?? "").startsWith("#")
    );
    expect(internals.length).toBeGreaterThan(0);
    for (const a of internals) {
      expect(a.getAttribute("href")).not.toContain(".html");
    }
  });
});

/**
 * 関連ページ導線の契約（plans/002 Step 3 / plans/004 残作業）。
 * リンク関係は本文ではなく lib/content/registry.ts が持つため、
 * ここではレジストリとの結線のみを固定する。
 */
describe("AcuteTreatmentOfHeadachePage: 関連ページ導線", () => {
  const HREF = "/treatment/acute-treatment-of-headache";

  it("レジストリの関連ページをすべてリンクとして描画する", () => {
    const { container } = render(<AcuteTreatmentOfHeadachePage />);
    const hrefs = Array.from(container.querySelectorAll(".related-links a")).map((a) =>
      a.getAttribute("href")
    );
    expect(hrefs).toEqual(getRelated(HREF).map((e) => e.href));
  });

  it("内部リンクを最低 2 本持つ（plans/002 Step 3）", () => {
    const { container } = render(<AcuteTreatmentOfHeadachePage />);
    const links = container.querySelectorAll(".related-links a");
    expect(links.length).toBeGreaterThanOrEqual(2);
    for (const link of links) {
      expect(link.getAttribute("href")?.startsWith("/")).toBe(true);
    }
  });

  it("/headaches/medication-overuse-headache へ相互リンクする", () => {
    const { container } = render(<AcuteTreatmentOfHeadachePage />);
    expect(
      container.querySelector('.related-links a[href="/headaches/medication-overuse-headache"]')
    ).not.toBeNull();
  });
});
