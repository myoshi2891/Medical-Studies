import { render } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import OccipitalNerveBlockPage from "./page";

// Mermaid は描画コストと CDN 依存を排除するため軽量モックに差し替える。
vi.mock("@/components/MermaidDiagram", () => ({
  default: ({ chart }: { chart: string }) => <div className="mermaid" data-chart={chart} />,
}));

/** ソース HTML（Occipital-Nerve-Block.html）から実測した忠実転記の契約値。 */
const SECTION_IDS = Array.from({ length: 17 }, (_, i) => `s${i + 1}`);
// h2 = 17 section タイトルのみ（見出し階層維持のため h1→h2 化）。
// 小見出しは階層を正しく保つため h3 に降格（下の H3_COUNT で検証）。
const H2_COUNT = 17;
// 42 = 降格した小見出し（絶対/相対禁忌は親「禁忌一覧」の下位として h4 に是正）。
const H3_COUNT = 42;
// 2 = 「禁忌一覧」配下の絶対禁忌 / 相対禁忌（階層を 1 段深くした小見出し）。
const H4_COUNT = 2;
const MERMAID_COUNT = 10;
const TABLE_COUNT = 24;
const NAV_COUNT = 17;
const HERO_H1 = "後頭神経ブロック（Occipital Nerve Block: ONB）完全ガイド";

describe("OccipitalNerveBlockPage: 契約（忠実転記）", () => {
  it("hero の <h1> がソースのページタイトルと一致する", () => {
    const { container } = render(<OccipitalNerveBlockPage />);
    const hero = container.querySelector(".hero h1");
    expect(hero?.textContent).toBe(HERO_H1);
  });

  it("section.sec の id 配列が s1..s17 と一致する", () => {
    const { container } = render(<OccipitalNerveBlockPage />);
    const ids = Array.from(container.querySelectorAll("section.sec")).map((s) => s.id);
    expect(ids).toEqual(SECTION_IDS);
  });

  it("<h2> の個数が section タイトル数と一致する", () => {
    const { container } = render(<OccipitalNerveBlockPage />);
    expect(container.querySelectorAll("h2")).toHaveLength(H2_COUNT);
  });

  it("<h3> の個数が降格後の小見出し数と一致する", () => {
    const { container } = render(<OccipitalNerveBlockPage />);
    expect(container.querySelectorAll("h3")).toHaveLength(H3_COUNT);
  });

  it("<h4> の個数が禁忌一覧配下の小見出し数と一致する", () => {
    const { container } = render(<OccipitalNerveBlockPage />);
    expect(container.querySelectorAll("h4")).toHaveLength(H4_COUNT);
  });

  it("Mermaid 図の個数がソースと一致する", () => {
    const { container } = render(<OccipitalNerveBlockPage />);
    expect(container.querySelectorAll(".mermaid")).toHaveLength(MERMAID_COUNT);
  });

  it("<table> の個数がソースと一致する", () => {
    const { container } = render(<OccipitalNerveBlockPage />);
    expect(container.querySelectorAll("table")).toHaveLength(TABLE_COUNT);
  });

  it("サイドバー nav-a の個数がソースと一致する", () => {
    const { container } = render(<OccipitalNerveBlockPage />);
    expect(container.querySelectorAll(".nav-a")).toHaveLength(NAV_COUNT);
  });

  it("外部リンク（http 始まり）はすべて target=_blank と rel=noopener noreferrer を持つ", () => {
    const { container } = render(<OccipitalNerveBlockPage />);
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
    const { container } = render(<OccipitalNerveBlockPage />);
    const internals = Array.from(container.querySelectorAll("a")).filter((a) =>
      (a.getAttribute("href") ?? "").startsWith("#")
    );
    expect(internals.length).toBeGreaterThan(0);
    for (const a of internals) {
      expect(a.getAttribute("href")).not.toContain(".html");
    }
  });
});
