import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { getRelated } from "@/lib/content/registry";
import Page from "./page";

// Mock MermaidDiagram component to avoid loading issues in jsdom environment
vi.mock("@/components/MermaidDiagram", () => ({
  default: ({ chart }: { chart: string }) => <div className="mermaid" data-chart={chart} />,
}));

// Mock LifestyleSeedsSidebar component to avoid testing scroll-spy complex browser integrations
vi.mock("@/components/treatment/LifestyleSeedsSidebar", () => ({
  LifestyleSeedsSidebar: () => <nav data-testid="sidebar">Sidebar</nav>,
}));

describe("HeadacheLifestyleSeedsGuidePage Contract Tests", () => {
  it("should render page header title correctly", () => {
    render(<Page />);
    const mainTitle = screen.getByRole("heading", {
      level: 1,
      name: /頭痛療養の基本：生活習慣管理とSEEDSフレームワーク/,
    });
    expect(mainTitle).toBeDefined();
  });

  it("should render correct number of sections and correct IDs", () => {
    const { container } = render(<Page />);
    const sections = container.querySelectorAll("section.sec");
    expect(sections.length).toBe(10);

    const expectedIds = ["s1", "s2", "s3", "s4", "s5", "s6", "s7", "s8", "s9", "s10"];
    const ids = Array.from(sections).map((sec) => sec.id);
    expect(ids).toEqual(expectedIds);
  });

  it("should render correct count of headings", () => {
    const { container } = render(<Page />);

    // Total h1 elements (1 page title h1)
    const h1s = container.querySelectorAll("h1");
    expect(h1s.length).toBe(1);

    // Section subtitles (h2)
    // RelatedLinks（plans/002 Step 3 のサイト共通導線）の h2 は転記物ではないため除外する。
    const h2s = Array.from(container.querySelectorAll("h2")).filter(
      (h) => h.closest(".related-links") === null
    );
    expect(h2s.length).toBe(10);

    // Verify h3s count is 13
    const h3s = container.querySelectorAll("h3");
    expect(h3s.length).toBe(13);
    const h4s = container.querySelectorAll("h4");
    expect(h4s.length).toBe(0);
  });

  it("should render correct number of Mermaid diagrams", () => {
    const { container } = render(<Page />);
    const diagrams = container.querySelectorAll(".mermaid");
    expect(diagrams.length).toBe(2);
  });

  it("should render correct number of tables", () => {
    const { container } = render(<Page />);
    const tables = container.querySelectorAll("table");
    expect(tables.length).toBe(6);
  });

  it("should enforce all external links are safe and well-formatted", () => {
    const { container } = render(<Page />);
    // External links (anchors that go to http or https)
    const anchors = Array.from(container.querySelectorAll("a"));
    const extAnchors = anchors.filter((a) => {
      const href = a.getAttribute("href") || "";
      return href.startsWith("http://") || href.startsWith("https://");
    });

    expect(extAnchors.length).toBe(16);

    for (const link of extAnchors) {
      expect(link.getAttribute("target")).toBe("_blank");
      expect(link.getAttribute("rel")).toBe("noopener noreferrer");
    }
  });

  it("should verify no internal links contain .html extensions", () => {
    const { container } = render(<Page />);
    const anchors = Array.from(container.querySelectorAll("a"));
    const intAnchors = anchors.filter((a) => {
      const href = a.getAttribute("href") || "";
      return !href.startsWith("http://") && !href.startsWith("https://");
    });

    for (const link of intAnchors) {
      const href = link.getAttribute("href") || "";
      expect(href.endsWith(".html")).toBe(false);
    }
  });
});

/**
 * 関連ページ導線の契約（plans/002 Step 3 / plans/004 残作業）。
 * リンク関係は本文ではなく lib/content/registry.ts が持つため、
 * ここではレジストリとの結線のみを固定する。
 */
describe("Page: 関連ページ導線", () => {
  const HREF = "/treatment/headache-lifestyle-seeds-guide";

  it("レジストリの関連ページをすべてリンクとして描画する", () => {
    const { container } = render(<Page />);
    const hrefs = Array.from(container.querySelectorAll(".related-links a")).map((a) =>
      a.getAttribute("href")
    );
    expect(hrefs).toEqual(getRelated(HREF).map((e) => e.href));
  });

  it("内部リンクを最低 2 本持つ（plans/002 Step 3）", () => {
    const { container } = render(<Page />);
    const links = container.querySelectorAll(".related-links a");
    expect(links.length).toBeGreaterThanOrEqual(2);
    for (const link of links) {
      expect(link.getAttribute("href")?.startsWith("/")).toBe(true);
    }
  });
});
