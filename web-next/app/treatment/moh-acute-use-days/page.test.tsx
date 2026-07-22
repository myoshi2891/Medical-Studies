import { render } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import MohActuseUseDaysPage from "./page";

// Mermaid は描画コストと CDN 依存を排除するため軽量モックに差し替える。
vi.mock("@/components/MermaidDiagram", () => ({
  default: ({ chart }: { chart: string }) => <div className="mermaid" data-chart={chart} />,
}));

/**
 * ソース HTML（Moh-acute-use-days.html）から実測した忠実転記の契約値。
 * - section.sec ids: s1〜s9 (9個)
 * - h2: 14個
 * - h3: 3個（Q&Aカード内の小見出し）
 * - Mermaid: 4個
 * - table: 6個
 * - nav-a: 9個
 * - 外部リンク: 0個（参照文献URLはプレーンテキスト）
 * - 内部リンク（#始まり）: 9個（サイドバー nav-a）
 */
const SECTION_IDS = ["s1", "s2", "s3", "s4", "s5", "s6", "s7", "s8", "s9"];
// 見出し階層の是正（スキル規約に従い段飛ばし禁止）:
// 元ソース: <h1 class="sec-title"> 9個、<h2> 14個（サブ見出し）、<h3> 3個
// 移行後: sec-title → h2（9個）、元h2 → h3（14個）、元h3 → h4（3個）
const H2_COUNT = 9; // sec-title 9個がh2として昇格
const H3_COUNT = 14;
const H4_COUNT = 3;
const MERMAID_COUNT = 4;
const TABLE_COUNT = 6;
const NAV_COUNT = 9;
const HERO_H1 = "頭痛急性期治療薬の「適正使用日数」とMOH予防";

describe("MohAcuteUseDaysPage: 契約（忠実転記）", () => {
  it("hero の <h1> がソースのページタイトルと一致する", () => {
    const { container } = render(<MohActuseUseDaysPage />);
    const hero = container.querySelector(".hero h1");
    expect(hero?.textContent).toBe(HERO_H1);
  });

  it("section.sec の id 配列が [s1..s9] と一致する", () => {
    const { container } = render(<MohActuseUseDaysPage />);
    const ids = Array.from(container.querySelectorAll("section.sec")).map((s) => s.id);
    expect(ids).toEqual(SECTION_IDS);
  });

  it("<h2> の個数がソースと一致する（sec-title 昇格後）", () => {
    const { container } = render(<MohActuseUseDaysPage />);
    expect(container.querySelectorAll("h2")).toHaveLength(H2_COUNT);
  });

  it("<h3> の個数がソースと一致する（元 h2 を h3 へ昇格）", () => {
    const { container } = render(<MohActuseUseDaysPage />);
    expect(container.querySelectorAll("h3")).toHaveLength(H3_COUNT);
  });

  it("<h4> の個数がソースと一致する（元 h3 を h4 へ）", () => {
    const { container } = render(<MohActuseUseDaysPage />);
    expect(container.querySelectorAll("h4")).toHaveLength(H4_COUNT);
  });

  it("Mermaid 図の個数がソースと一致する", () => {
    const { container } = render(<MohActuseUseDaysPage />);
    expect(container.querySelectorAll(".mermaid")).toHaveLength(MERMAID_COUNT);
  });

  it("<table> の個数がソースと一致する", () => {
    const { container } = render(<MohActuseUseDaysPage />);
    expect(container.querySelectorAll("table")).toHaveLength(TABLE_COUNT);
  });

  it("サイドバー nav-a の個数がソースと一致する", () => {
    const { container } = render(<MohActuseUseDaysPage />);
    expect(container.querySelectorAll(".nav-a")).toHaveLength(NAV_COUNT);
  });

  it("内部リンク（# 始まり）に .html を含まない", () => {
    const { container } = render(<MohActuseUseDaysPage />);
    const internals = Array.from(container.querySelectorAll("a")).filter((a) =>
      (a.getAttribute("href") ?? "").startsWith("#")
    );
    expect(internals.length).toBeGreaterThan(0);
    for (const a of internals) {
      expect(a.getAttribute("href")).not.toContain(".html");
    }
  });
});
