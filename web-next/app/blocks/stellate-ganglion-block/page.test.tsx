import { render } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { getRelated } from "@/lib/content/registry";
import StellateGanglionBlockPage from "./page";

// Mermaid は描画コストと CDN 依存を排除するため軽量モックに差し替える。
vi.mock("@/components/MermaidDiagram", () => ({
  default: ({ chart }: { chart: string }) => <div className="mermaid" data-chart={chart} />,
}));

/** ソース HTML（Stellate-Ganglion-Block.html）から実測した忠実転記の契約値。 */
const SECTION_IDS = Array.from({ length: 11 }, (_, i) => `s${i + 1}`);
// 見出し階層は h2（section タイトル）→ h3（本文小見出し）→ h4（手順ステップ）と段飛ばししない。
// h2 = 11 section タイトル（.sec-title）のみ。本文小見出し 40 は h3、施術ステップ 3 は h4 に降格。
const H2_COUNT = 11;
const H3_COUNT = 40;
const H4_COUNT = 3;
const SECTION_COUNT = 11;
const MERMAID_COUNT = 11;
const TABLE_COUNT = 22;
const NAV_COUNT = 11;
const HERO_H1 = "星状神経節ブロック（Stellate Ganglion Block: SGB）完全ガイド";

describe("StellateGanglionBlockPage: 契約（忠実転記）", () => {
  it("hero の <h1> がソースのページタイトルと一致する", () => {
    const { container } = render(<StellateGanglionBlockPage />);
    const hero = container.querySelector(".hero h1");
    expect(hero?.textContent).toBe(HERO_H1);
  });

  it("section.sec の id 配列が s1..s11 と一致する", () => {
    const { container } = render(<StellateGanglionBlockPage />);
    const ids = Array.from(container.querySelectorAll("section.sec")).map((s) => s.id);
    expect(ids).toEqual(SECTION_IDS);
  });

  it("<h2> の個数がソースと一致する", () => {
    const { container } = render(<StellateGanglionBlockPage />);
    // RelatedLinks（plans/002 Step 3 のサイト共通導線）が足す h2 は
    // 元 HTML の転記物ではないため除外する。
    const h2s = Array.from(container.querySelectorAll("h2")).filter(
      (h) => h.closest(".related-links") === null
    );
    expect(h2s).toHaveLength(H2_COUNT);
  });

  it("section.sec のセクションタイトル（.sec-title）はすべて h2 で、hero の h1 と階層が衝突しない", () => {
    const { container } = render(<StellateGanglionBlockPage />);
    const titles = Array.from(container.querySelectorAll("section.sec .sec-title"));
    expect(titles).toHaveLength(SECTION_COUNT);
    for (const t of titles) {
      expect(t.tagName).toBe("H2");
    }
    // hero h1 は 1 つだけ（セクションタイトルが h1 に降格していないことの裏取り）。
    expect(container.querySelectorAll("h1")).toHaveLength(1);
  });

  it("本文小見出しは h3、手順ステップは h4 と段飛ばししない階層になっている", () => {
    const { container } = render(<StellateGanglionBlockPage />);
    expect(container.querySelectorAll("h3")).toHaveLength(H3_COUNT);
    expect(container.querySelectorAll("h4")).toHaveLength(H4_COUNT);
  });

  it("Mermaid 図の個数がソースと一致する", () => {
    const { container } = render(<StellateGanglionBlockPage />);
    expect(container.querySelectorAll(".mermaid")).toHaveLength(MERMAID_COUNT);
  });

  it("<table> の個数がソースと一致する", () => {
    const { container } = render(<StellateGanglionBlockPage />);
    expect(container.querySelectorAll("table")).toHaveLength(TABLE_COUNT);
  });

  it("サイドバー nav-a の個数がソースと一致する", () => {
    const { container } = render(<StellateGanglionBlockPage />);
    expect(container.querySelectorAll(".nav-a")).toHaveLength(NAV_COUNT);
  });

  it("外部リンク（http 始まり）はすべて target=_blank と rel=noopener noreferrer を持つ", () => {
    const { container } = render(<StellateGanglionBlockPage />);
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
    const { container } = render(<StellateGanglionBlockPage />);
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
 * 関連ページ導線の契約（plans/002 Step 3）。
 * リンク関係は本文ではなく lib/content/registry.ts が持つため、
 * ここではレジストリとの結線のみを固定する。
 */
describe("StellateGanglionBlockPage: 関連ページ導線", () => {
  const HREF = "/blocks/stellate-ganglion-block";

  it("レジストリの関連ページをすべてリンクとして描画する", () => {
    const { container } = render(<StellateGanglionBlockPage />);
    const hrefs = Array.from(container.querySelectorAll(".related-links a")).map((a) =>
      a.getAttribute("href")
    );
    expect(hrefs).toEqual(getRelated(HREF).map((e) => e.href));
  });

  it("内部リンクを最低 2 本持つ（plans/002 Step 3）", () => {
    const { container } = render(<StellateGanglionBlockPage />);
    const links = container.querySelectorAll(".related-links a");
    expect(links.length).toBeGreaterThanOrEqual(2);
    for (const link of links) {
      expect(link.getAttribute("href")?.startsWith("/")).toBe(true);
    }
  });
});
