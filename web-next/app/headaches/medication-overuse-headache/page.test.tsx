import { render } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { getRelated } from "@/lib/content/registry";
import MedicationOveruseHeadachePage from "./page";

// Mermaid は描画コストと CDN 依存を排除するため軽量モックに差し替える。
vi.mock("@/components/MermaidDiagram", () => ({
  default: ({ chart }: { chart: string }) => <div className="mermaid" data-chart={chart} />,
}));

/** ソース HTML から実測した忠実転記の契約値。 */
const SECTION_IDS = Array.from({ length: 18 }, (_, i) => `s${i + 1}`);
// h2 = 18 section タイトルのみ（見出し階層維持のため h1→h2 化）。
const H2_COUNT = 18;
// h3 = 38 （元の h2 → h3 化 32 件 ＋ §3 Step 1–6 を h4 から h3 に是正した 6 件）
const H3_COUNT = 38;
// h4 = 2 （元の h3 → h4 化 8 件のうち §3 Step 1–6 を h3 へ昇格した残り 2 件）
const H4_COUNT = 2;
const MERMAID_COUNT = 5;
const TABLE_COUNT = 24;
const NAV_COUNT = 18;
const HERO_H1 = "薬剤過用頭痛（MOH）完全ガイド";

describe("MedicationOveruseHeadachePage: 契約（忠実転記）", () => {
  it("hero の <h1> がソースのページタイトルと一致する", () => {
    const { container } = render(<MedicationOveruseHeadachePage />);
    const hero = container.querySelector(".hero h1");
    expect(hero?.textContent).toBe(HERO_H1);
  });

  it("section.sec の id 配列が s1..s18 と一致する", () => {
    const { container } = render(<MedicationOveruseHeadachePage />);
    const ids = Array.from(container.querySelectorAll("section.sec")).map((s) => s.id);
    expect(ids).toEqual(SECTION_IDS);
  });

  it("<h2> の個数が section タイトル数と一致する", () => {
    const { container } = render(<MedicationOveruseHeadachePage />);
    // 転記契約は元 HTML 由来の見出しのみを数える。RelatedLinks（plans/002 Step 3 の
    // サイト共通導線）が足す h2 は転記物ではないため除外する。
    const h2s = Array.from(container.querySelectorAll("h2")).filter(
      (h) => h.closest(".related-links") === null
    );
    expect(h2s).toHaveLength(H2_COUNT);
  });

  it("<h3> の個数が降格後の大見出し数と一致する", () => {
    const { container } = render(<MedicationOveruseHeadachePage />);
    expect(container.querySelectorAll("h3")).toHaveLength(H3_COUNT);
  });

  it("<h4> の個数が降格後の小見出し数と一致する", () => {
    const { container } = render(<MedicationOveruseHeadachePage />);
    expect(container.querySelectorAll("h4")).toHaveLength(H4_COUNT);
  });

  it("Mermaid 図の個数がソースと一致する", () => {
    const { container } = render(<MedicationOveruseHeadachePage />);
    expect(container.querySelectorAll(".mermaid")).toHaveLength(MERMAID_COUNT);
  });

  it("<table> の個数がソースと一致する", () => {
    const { container } = render(<MedicationOveruseHeadachePage />);
    expect(container.querySelectorAll("table")).toHaveLength(TABLE_COUNT);
  });

  it("サイドバー nav-a の個数がソースと一致する", () => {
    const { container } = render(<MedicationOveruseHeadachePage />);
    expect(container.querySelectorAll(".nav-a")).toHaveLength(NAV_COUNT);
  });

  it("外部リンク（http 始まり）はすべて target=_blank と rel=noopener noreferrer を持つ", () => {
    const { container } = render(<MedicationOveruseHeadachePage />);
    const externals = Array.from(container.querySelectorAll("a")).filter((a) =>
      /^https?:\/\//.test(a.getAttribute("href") ?? "")
    );
    expect(externals.length).toBeGreaterThan(0);
    for (const a of externals) {
      expect(a.getAttribute("target")).toBe("_blank");
      expect(a.getAttribute("rel")).toBe("noopener noreferrer");
    }
  });

  it("内部リンク（# 始まり）に .html を含まない", () => {
    const { container } = render(<MedicationOveruseHeadachePage />);
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
describe("MedicationOveruseHeadachePage: 関連ページ導線", () => {
  const HREF = "/headaches/medication-overuse-headache";

  it("レジストリの関連ページをすべてリンクとして描画する", () => {
    const { container } = render(<MedicationOveruseHeadachePage />);
    const hrefs = Array.from(container.querySelectorAll(".related-links a")).map((a) =>
      a.getAttribute("href")
    );
    expect(hrefs).toEqual(getRelated(HREF).map((e) => e.href));
  });

  it("内部リンクを最低 2 本持つ（plans/002 Step 3）", () => {
    const { container } = render(<MedicationOveruseHeadachePage />);
    const links = container.querySelectorAll(".related-links a");
    expect(links.length).toBeGreaterThanOrEqual(2);
    for (const link of links) {
      expect(link.getAttribute("href")?.startsWith("/")).toBe(true);
    }
  });

  it("/treatment/moh-acute-use-days へ相互リンクする", () => {
    const { container } = render(<MedicationOveruseHeadachePage />);
    expect(
      container.querySelector('.related-links a[href="/treatment/moh-acute-use-days"]')
    ).not.toBeNull();
  });
});
