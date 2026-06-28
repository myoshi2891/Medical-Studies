import { render } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import PhysicalTherapyForHeadachePage from "./page";

// Mermaid は描画コストと CDN 依存を排除するため軽量モックに差し替える。
vi.mock("@/components/MermaidDiagram", () => ({
  default: ({ chart }: { chart: string }) => <div className="mermaid" data-chart={chart} />,
}));

/** ソース HTML から実測した忠実転記の契約値。 */
const SECTION_IDS = Array.from({ length: 15 }, (_, i) => `s${i + 1}`);
const H2_COUNT = 15; // sec-title が 15個 (h1 class="sec-title" -> h2)
const H3_COUNT = 34; // 元 h2 が 33個 + s11 の「統合アプローチのエビデンス」(元 h3) を段飛ばし解消のために h3 に引き上げ = 34個
const H4_COUNT = 10; // 元 h3 が 11個のうち、s11 の 1個を除いた 10個 (h3 -> h4)
const MERMAID_COUNT = 9;
const TABLE_COUNT = 33;
const NAV_COUNT = 15;
const HERO_H1 = "頭痛に対する理学療法 完全ガイド";

describe("PhysicalTherapyForHeadachePage: 契約（忠実転記）", () => {
  it("hero の <h1> がソースのページタイトルと一致する", () => {
    const { container } = render(<PhysicalTherapyForHeadachePage />);
    const hero = container.querySelector(".hero h1");
    expect(hero?.textContent).toBe(HERO_H1);
  });

  it("section.sec の id 配列が s1..s15 と一致する", () => {
    const { container } = render(<PhysicalTherapyForHeadachePage />);
    const ids = Array.from(container.querySelectorAll("section.sec")).map((s) => s.id);
    expect(ids).toEqual(SECTION_IDS);
  });

  it("<h2> の個数がソースと一致する (セクションタイトル)", () => {
    const { container } = render(<PhysicalTherapyForHeadachePage />);
    expect(container.querySelectorAll("h2")).toHaveLength(H2_COUNT);
  });

  it("<h3> の個数がソースと一致する (元 h2 + 段飛ばし補正分)", () => {
    const { container } = render(<PhysicalTherapyForHeadachePage />);
    expect(container.querySelectorAll("h3")).toHaveLength(H3_COUNT);
  });

  it("<h4> の個数がソースと一致する (元 h3 のうち h4 へ降格分)", () => {
    const { container } = render(<PhysicalTherapyForHeadachePage />);
    expect(container.querySelectorAll("h4")).toHaveLength(H4_COUNT);
  });

  it("Mermaid 図の個数がソースと一致する", () => {
    const { container } = render(<PhysicalTherapyForHeadachePage />);
    expect(container.querySelectorAll(".mermaid")).toHaveLength(MERMAID_COUNT);
  });

  it("<table> の個数がソースと一致する", () => {
    const { container } = render(<PhysicalTherapyForHeadachePage />);
    expect(container.querySelectorAll("table")).toHaveLength(TABLE_COUNT);
  });

  it("サイドバー nav-a の個数がソースと一致する", () => {
    const { container } = render(<PhysicalTherapyForHeadachePage />);
    expect(container.querySelectorAll(".nav-a")).toHaveLength(NAV_COUNT);
  });

  it("外部リンク（http 始まり）はすべて target=_blank と rel=noopener noreferrer を持つ", () => {
    const { container } = render(<PhysicalTherapyForHeadachePage />);
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
    const { container } = render(<PhysicalTherapyForHeadachePage />);
    const internals = Array.from(container.querySelectorAll("a")).filter((a) =>
      (a.getAttribute("href") ?? "").startsWith("#")
    );
    expect(internals.length).toBeGreaterThan(0);
    for (const a of internals) {
      expect(a.getAttribute("href")).not.toContain(".html");
    }
  });
});
