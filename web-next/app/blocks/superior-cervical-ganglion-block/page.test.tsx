import { render } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { getRelated } from "@/lib/content/registry";
import SuperiorCervicalGanglionBlockPage from "./page";

// Mermaid は描画コストと CDN 依存を排除するため軽量モックに差し替える。
vi.mock("@/components/MermaidDiagram", () => ({
  default: ({ chart }: { chart: string }) => <div className="mermaid" data-chart={chart} />,
}));

/** ソース HTML（Superior-Cervical-Ganglion-Block.html）から実測した忠実転記の契約値。 */
const SECTION_IDS = Array.from({ length: 13 }, (_, i) => `s${i + 1}`);
const H2_COUNT = 13;
const SECTION_COUNT = 13;
const MERMAID_COUNT = 4;
const TABLE_COUNT = 7;
const NAV_COUNT = 13;
const HERO_H1 = "上頸神経節ブロック（Superior Cervical Ganglion Block）";

describe("SuperiorCervicalGanglionBlockPage: 契約（忠実転記）", () => {
  it("hero の <h1> がソースのページタイトルと一致する", () => {
    const { container } = render(<SuperiorCervicalGanglionBlockPage />);
    const hero = container.querySelector(".hero h1");
    expect(hero?.textContent).toBe(HERO_H1);
  });

  it("section.sec の id 配列が s1..s13 と一致する", () => {
    const { container } = render(<SuperiorCervicalGanglionBlockPage />);
    const ids = Array.from(container.querySelectorAll("section.sec")).map((s) => s.id);
    expect(ids).toEqual(SECTION_IDS);
  });

  it("<h2> の個数がソースと一致する", () => {
    const { container } = render(<SuperiorCervicalGanglionBlockPage />);
    // RelatedLinks（plans/002 Step 3 のサイト共通導線）が足す h2 は
    // 元 HTML の転記物ではないため除外する。
    const h2s = Array.from(container.querySelectorAll("h2")).filter(
      (h) => h.closest(".related-links") === null
    );
    expect(h2s).toHaveLength(H2_COUNT);
  });

  it("section.sec のセクションタイトル（.sec-title）はすべて h2 で、hero の h1 と階層が衝突しない", () => {
    const { container } = render(<SuperiorCervicalGanglionBlockPage />);
    const titles = Array.from(container.querySelectorAll("section.sec .sec-title"));
    expect(titles).toHaveLength(SECTION_COUNT);
    for (const t of titles) {
      expect(t.tagName).toBe("H2");
    }
    // hero h1 は 1 つだけ（セクションタイトルが h1 に降格していないことの裏取り）。
    expect(container.querySelectorAll("h1")).toHaveLength(1);
  });

  it("Mermaid 図の個数がソースと一致する", () => {
    const { container } = render(<SuperiorCervicalGanglionBlockPage />);
    expect(container.querySelectorAll(".mermaid")).toHaveLength(MERMAID_COUNT);
  });

  it("<table> の個数がソースと一致する", () => {
    const { container } = render(<SuperiorCervicalGanglionBlockPage />);
    expect(container.querySelectorAll("table")).toHaveLength(TABLE_COUNT);
  });

  it("サイドバー nav-a の個数がソースと一致する", () => {
    const { container } = render(<SuperiorCervicalGanglionBlockPage />);
    expect(container.querySelectorAll(".nav-a")).toHaveLength(NAV_COUNT);
  });

  it("外部リンク（http 始まり）はすべて target=_blank と rel=noopener noreferrer を持つ", () => {
    const { container } = render(<SuperiorCervicalGanglionBlockPage />);
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
    const { container } = render(<SuperiorCervicalGanglionBlockPage />);
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
describe("SuperiorCervicalGanglionBlockPage: 関連ページ導線", () => {
  const HREF = "/blocks/superior-cervical-ganglion-block";

  it("レジストリの関連ページをすべてリンクとして描画する", () => {
    const { container } = render(<SuperiorCervicalGanglionBlockPage />);
    const hrefs = Array.from(container.querySelectorAll(".related-links a")).map((a) =>
      a.getAttribute("href")
    );
    expect(hrefs).toEqual(getRelated(HREF).map((e) => e.href));
  });

  it("内部リンクを最低 2 本持つ（plans/002 Step 3）", () => {
    const { container } = render(<SuperiorCervicalGanglionBlockPage />);
    const links = container.querySelectorAll(".related-links a");
    expect(links.length).toBeGreaterThanOrEqual(2);
    for (const link of links) {
      expect(link.getAttribute("href")?.startsWith("/")).toBe(true);
    }
  });
});
