import { render } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import TriggerPointsAndHeadachePage from "./page";

// Mock MermaidDiagram component to avoid loading mermaid inside the test environment
vi.mock("@/components/MermaidDiagram", () => ({
  default: ({ chart }: { chart: string }) => <div className="mermaid" data-chart={chart} />,
}));

/** Contract values measured from the source HTML */
const SECTION_IDS = Array.from({ length: 9 }, (_, i) => `s${i + 1}`);
const H2_COUNT = 5;
const H3_COUNT = 0;
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

  it("section.sec id list matches s1..s9", () => {
    const { container } = render(<TriggerPointsAndHeadachePage />);
    const ids = Array.from(container.querySelectorAll("section.sec")).map((s) => s.id);
    expect(ids).toEqual(SECTION_IDS);
  });

  it("<h2> count matches corrected section headings count", () => {
    const { container } = render(<TriggerPointsAndHeadachePage />);
    expect(container.querySelectorAll("h2")).toHaveLength(H2_COUNT);
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
