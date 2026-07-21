import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import Page from "./page";

// Mock MermaidDiagram component to avoid loading issues in jsdom environment
vi.mock("@/components/MermaidDiagram", () => ({
  default: ({ chart }: { chart: string }) => <div className="mermaid" data-chart={chart} />,
}));

// Mock HeadacheTriggerIdentificationSidebar component to avoid testing scroll-spy complex browser integrations
vi.mock("@/components/treatment/HeadacheTriggerIdentificationSidebar", () => ({
  HeadacheTriggerIdentificationSidebar: () => <nav data-testid="sidebar">Sidebar</nav>,
}));

describe("HeadacheTriggerIdentificationGuidePage Contract Tests", () => {
  it("should render page header title correctly", () => {
    render(<Page />);
    const mainTitle = screen.getByRole("heading", {
      level: 1,
      name: /頭痛トリガーの特定と管理/,
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

  it("should render correct count of headings based on normalized logical hierarchy", () => {
    const { container } = render(<Page />);

    // Total h1 elements (1 page title h1)
    const h1s = container.querySelectorAll("h1");
    expect(h1s.length).toBe(1);

    // Section titles (h2) - 10 sections
    const h2s = container.querySelectorAll("h2");
    expect(h2s.length).toBe(10);

    // Section subtitles (h3) - 5 subtitles
    // 1. エビデンス表記の凡例 (s3)
    // 2. なぜ「記憶」ではなく「記録」なのか (s4)
    // 3. ガイドラインにおける頭痛ダイアリーの位置づけ (s4)
    // 4. 紙の日記と電子日記（アプリ）の違い (s4)
    // 5. 振り返り時に注意すべきこと (s6)
    const h3s = container.querySelectorAll("h3");
    expect(h3s.length).toBe(5);

    const h4s = container.querySelectorAll("h4");
    expect(h4s.length).toBe(0);
  });

  it("should render correct number of Mermaid diagrams", () => {
    const { container } = render(<Page />);
    const diagrams = container.querySelectorAll(".mermaid");
    expect(diagrams.length).toBe(3);
  });

  it("should render correct number of tables", () => {
    const { container } = render(<Page />);
    const tables = container.querySelectorAll("table");
    expect(tables.length).toBe(3);
  });

  it("should enforce all external links are safe and well-formatted", () => {
    const { container } = render(<Page />);
    const anchors = Array.from(container.querySelectorAll("a"));
    const extAnchors = anchors.filter((a) => {
      const href = a.getAttribute("href") || "";
      return href.startsWith("http://") || href.startsWith("https://");
    });

    // 13 references
    expect(extAnchors.length).toBe(13);

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
