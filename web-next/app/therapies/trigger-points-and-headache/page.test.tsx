import { render } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { getRelated } from "@/lib/content/registry";
import TriggerPointsAndHeadachePage from "./page";

// Mock MermaidDiagram component to avoid loading mermaid inside the test environment
vi.mock("@/components/MermaidDiagram", () => ({
  default: ({ chart }: { chart: string }) => <div className="mermaid" data-chart={chart} />,
}));

/** Contract values measured from the source HTML */
const SECTION_IDS = Array.from({ length: 9 }, (_, i) => `s${i + 1}`);
// 見出し階層は page h1 → section h2 → subsection h3 に統一する
// （元 HTML は 9 セクション見出しを h1.sec-title、小見出しを h2 にしていた）。
const H2_COUNT = 9;
const H3_COUNT = 5;
const MERMAID_COUNT = 3;
const TABLE_COUNT = 5;
const NAV_COUNT = 9;
const HERO_H1 = "頭痛のトリガーポイント入門";

describe("TriggerPointsAndHeadachePage: Contract Tests", () => {
  it("hero <h1> text matches the source page title", () => {
    const { container } = render(<TriggerPointsAndHeadachePage />);
    const hero = container.querySelector(".hero h1");
    expect(hero?.textContent).toBe(HERO_H1);
  });

  it("<h1> はページ見出しの 1 本のみ（section 見出しは h2）", () => {
    const { container } = render(<TriggerPointsAndHeadachePage />);
    const h1s = container.querySelectorAll("h1");
    expect(h1s).toHaveLength(1);
    expect(container.querySelectorAll("section.sec h1")).toHaveLength(0);
  });

  it("section.sec id list matches s1..s9", () => {
    const { container } = render(<TriggerPointsAndHeadachePage />);
    const ids = Array.from(container.querySelectorAll("section.sec")).map((s) => s.id);
    expect(ids).toEqual(SECTION_IDS);
  });

  it("<h2> count matches corrected section headings count", () => {
    const { container } = render(<TriggerPointsAndHeadachePage />);
    // RelatedLinks（plans/002 Step 3 のサイト共通導線）が足す h2 は
    // 元 HTML の転記物ではないため除外する。
    const h2s = Array.from(container.querySelectorAll("h2")).filter(
      (h) => h.closest(".related-links") === null
    );
    expect(h2s).toHaveLength(H2_COUNT);
  });

  it("<h3> count matches corrected subsections count", () => {
    const { container } = render(<TriggerPointsAndHeadachePage />);
    expect(container.querySelectorAll("h3")).toHaveLength(H3_COUNT);
  });

  it("Mermaid chart elements count matches source", () => {
    const { container } = render(<TriggerPointsAndHeadachePage />);
    expect(container.querySelectorAll(".mermaid")).toHaveLength(MERMAID_COUNT);
  });

  it("<table> count matches source", () => {
    const { container } = render(<TriggerPointsAndHeadachePage />);
    expect(container.querySelectorAll("table")).toHaveLength(TABLE_COUNT);
  });

  it("sidebar .nav-a count matches source", () => {
    const { container } = render(<TriggerPointsAndHeadachePage />);
    expect(container.querySelectorAll(".nav-a")).toHaveLength(NAV_COUNT);
  });

  it("all external links have target=_blank and rel='noopener noreferrer'", () => {
    const { container } = render(<TriggerPointsAndHeadachePage />);
    const externals = Array.from(container.querySelectorAll("a")).filter((a) =>
      /^https?:\/\//.test(a.getAttribute("href") ?? "")
    );
    expect(externals.length).toBeGreaterThan(0);
    for (const a of externals) {
      expect(a.getAttribute("target")).toBe("_blank");
      expect(a.getAttribute("rel")).toBe("noopener noreferrer");
    }
  });

  it("internal links start with '#' and do not contain '.html'", () => {
    const { container } = render(<TriggerPointsAndHeadachePage />);
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
describe("TriggerPointsAndHeadachePage: 関連ページ導線", () => {
  const HREF = "/therapies/trigger-points-and-headache";

  it("レジストリの関連ページをすべてリンクとして描画する", () => {
    const { container } = render(<TriggerPointsAndHeadachePage />);
    const hrefs = Array.from(container.querySelectorAll(".related-links a")).map((a) =>
      a.getAttribute("href")
    );
    expect(hrefs).toEqual(getRelated(HREF).map((e) => e.href));
  });

  it("内部リンクを最低 2 本持つ（plans/002 Step 3）", () => {
    const { container } = render(<TriggerPointsAndHeadachePage />);
    const links = container.querySelectorAll(".related-links a");
    expect(links.length).toBeGreaterThanOrEqual(2);
    for (const link of links) {
      expect(link.getAttribute("href")?.startsWith("/")).toBe(true);
    }
  });
});
