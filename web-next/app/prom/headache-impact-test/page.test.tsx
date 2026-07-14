import { render } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import HeadacheImpactTestPage from "./page";

// Mermaidのモック化（描画コストの排除）
vi.mock("@/components/MermaidDiagram", () => ({
  default: ({ chart }: { chart: string }) => <div className="mermaid" data-chart={chart} />,
}));

// ローカル専用オーバーレイ不在（＝公開デプロイと同じ状態）を固定する。
// 開発者のローカルに prom-restricted.local.json があってもテスト結果を変えないため。
vi.mock("@/lib/prom/restricted-server", () => ({ readRestrictedOverlay: () => null }));

// 移行先ガイドの構造契約値
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
];
const H2_COUNT = 14; // セクションタイトル (元の span.sec-title)
const H3_COUNT = 37; // 中見出し (元の h2)
const H4_COUNT = 0; // 小見出しなし
const MERMAID_COUNT = 3; // Mermaid図
const TABLE_COUNT = 24; // テーブル数
const NAV_A_COUNT = 14; // サイドバーの目次リンク数
const EXTERNAL_LINK_COUNT = 38; // http/https 始まりの外部リンク数（§3.1 の公式取得先リンクを含む）

describe("HeadacheImpactTestPage: 契約（忠実転記）", () => {
  it("hero の <h1> がソースのページタイトルと一致する", () => {
    const { container } = render(<HeadacheImpactTestPage />);
    const h1 = container.querySelector("h1");
    expect(h1).not.toBeNull();
    expect(h1?.textContent?.trim()).toBe("HIT-6（Headache Impact Test）完全リファレンスガイド");
  });

  it("section.sec の id 配列が s1..s14 と一致する", () => {
    const { container } = render(<HeadacheImpactTestPage />);
    const sections = Array.from(container.querySelectorAll("section.sec"));
    const ids = sections.map((s) => s.getAttribute("id"));
    expect(ids).toEqual(SECTION_IDS);
  });

  it("<h2> の個数がソースと一致する (セクションタイトル)", () => {
    const { container } = render(<HeadacheImpactTestPage />);
    expect(container.querySelectorAll("h2.sec-title")).toHaveLength(H2_COUNT);
  });

  it("<h3> の個数がソースと一致する (元 h2)", () => {
    const { container } = render(<HeadacheImpactTestPage />);
    expect(container.querySelectorAll("h3")).toHaveLength(H3_COUNT);
  });

  it("<h4> の個数がソースと一致する (元 h3)", () => {
    const { container } = render(<HeadacheImpactTestPage />);
    expect(container.querySelectorAll("h4")).toHaveLength(H4_COUNT);
  });

  it("Mermaid 図の個数がソースと一致する", () => {
    const { container } = render(<HeadacheImpactTestPage />);
    expect(container.querySelectorAll(".mmd")).toHaveLength(MERMAID_COUNT);
  });

  it("<table> の個数がソースと一致する", () => {
    const { container } = render(<HeadacheImpactTestPage />);
    expect(container.querySelectorAll("table")).toHaveLength(TABLE_COUNT);
  });

  it("サイドバー nav-a の個数がソースと一致する", () => {
    const { container } = render(<HeadacheImpactTestPage />);
    expect(container.querySelectorAll(".nav-a")).toHaveLength(NAV_A_COUNT);
  });

  it("外部リンク（http 始まり）はすべて target=_blank と rel=noopener noreferrer を持つ", () => {
    const { container } = render(<HeadacheImpactTestPage />);
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

  it("権利ゲート: オーバーレイ不在時は 6 項目すべてが非掲載表示になる", () => {
    const { container } = render(<HeadacheImpactTestPage />);
    const cells = Array.from(container.querySelectorAll('[data-restricted-item="hit6"]'));

    // 設問文セルは 6 つとも「非掲載」で、質問文（英語原文・和訳）は一切描画されない。
    // 逐語引用を検証コードにも残さないため、期待値は非掲載表示そのものを突き合わせる。
    expect(cells).toHaveLength(6);
    for (const cell of cells) {
      expect(cell.textContent).toBe("非掲載（公式配布元を参照）");
    }
  });

  it("内部リンク（# 始まり）に .html を含まない", () => {
    const { container } = render(<HeadacheImpactTestPage />);
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
