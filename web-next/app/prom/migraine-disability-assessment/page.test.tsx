import { render } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import MigraineDisabilityAssessmentPage from "./page";

// Mermaid のモック化（描画コストの排除）
vi.mock("@/components/MermaidDiagram", () => ({
  default: ({ chart }: { chart: string }) => <div className="mermaid" data-chart={chart} />,
}));

// 移行先ガイドの構造契約値（ソース HTML より実測）
const SECTION_IDS = [
  "s1",
  "s2",
  "s3",
  "s4",
  "s5",
  "s6",
  "s7",
  "s8",
  "s9",
  "s10",
  "s11",
  "s12",
  "s13",
  "s14",
  "s15",
  "appendix",
];
const H2_COUNT = 16; // セクションタイトル (元の span.sec-title) — s1〜s15 + appendix
const H3_COUNT = 43; // 中見出し (元の h2: 43個)
const H4_COUNT = 2; // 小見出し (元の h3)
const MERMAID_COUNT = 3; // Mermaid 図
const TABLE_COUNT = 31; // テーブル数
const NAV_A_COUNT = 15; // サイドバー目次リンク数 (s1〜s15; appendix は nav-a に含まれない)
const EXTERNAL_LINK_COUNT = 25; // http/https 始まりの外部リンク数

describe("MigraineDisabilityAssessmentPage: 契約（忠実転記）", () => {
  it("hero の <h1> がソースのページタイトルと一致する", () => {
    const { container } = render(<MigraineDisabilityAssessmentPage />);
    const h1 = container.querySelector("h1");
    expect(h1).not.toBeNull();
    expect(h1?.textContent?.trim()).toBe(
      "MIDAS（片頭痛障害評価スコア）完全リファレンスガイド"
    );
  });

  it("section.sec の id 配列が s1..s15 + appendix と一致する", () => {
    const { container } = render(<MigraineDisabilityAssessmentPage />);
    const sections = Array.from(container.querySelectorAll("section.sec"));
    const ids = sections.map((s) => s.getAttribute("id"));
    expect(ids).toEqual(SECTION_IDS);
  });

  it("<h2> の個数がソースと一致する (セクションタイトル)", () => {
    const { container } = render(<MigraineDisabilityAssessmentPage />);
    expect(container.querySelectorAll("h2.sec-title")).toHaveLength(H2_COUNT);
  });

  it("<h3> の個数がソースと一致する (元 h2)", () => {
    const { container } = render(<MigraineDisabilityAssessmentPage />);
    expect(container.querySelectorAll("h3")).toHaveLength(H3_COUNT);
  });

  it("<h4> の個数がソースと一致する (元 h3)", () => {
    const { container } = render(<MigraineDisabilityAssessmentPage />);
    expect(container.querySelectorAll("h4")).toHaveLength(H4_COUNT);
  });

  it("Mermaid 図の個数がソースと一致する", () => {
    const { container } = render(<MigraineDisabilityAssessmentPage />);
    expect(container.querySelectorAll(".mmd")).toHaveLength(MERMAID_COUNT);
  });

  it("<table> の個数がソースと一致する", () => {
    const { container } = render(<MigraineDisabilityAssessmentPage />);
    expect(container.querySelectorAll("table")).toHaveLength(TABLE_COUNT);
  });

  it("サイドバー nav-a の個数がソースと一致する", () => {
    const { container } = render(<MigraineDisabilityAssessmentPage />);
    expect(container.querySelectorAll(".nav-a")).toHaveLength(NAV_A_COUNT);
  });

  it("外部リンク（http 始まり）はすべて target=_blank と rel=noopener noreferrer を持つ", () => {
    const { container } = render(<MigraineDisabilityAssessmentPage />);
    const anchors = Array.from(container.querySelectorAll("a"));
    const extAnchors = anchors.filter((a) => {
      const href = a.getAttribute("href") || "";
      return href.startsWith("http://") || href.startsWith("https://");
    });
    expect(extAnchors.length).toBe(EXTERNAL_LINK_COUNT);
    for (const a of extAnchors) {
      expect(a.getAttribute("target")).toBe("_blank");
      expect(a.getAttribute("rel")).toBe("noopener noreferrer");
    }
  });

  it("内部リンク（# 始まり）に .html を含まない", () => {
    const { container } = render(<MigraineDisabilityAssessmentPage />);
    const anchors = Array.from(container.querySelectorAll("a"));
    const intAnchors = anchors.filter((a) => {
      const href = a.getAttribute("href") || "";
      return href.startsWith("#");
    });
    for (const a of intAnchors) {
      const href = a.getAttribute("href") || "";
      expect(href).not.toContain(".html");
    }
  });
});
