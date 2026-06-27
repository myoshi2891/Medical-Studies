import { render } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import TensionTypeHeadachePage from "./page";

// Mermaid は描画コストと CDN 依存を排除するため軽量モックに差し替える。
vi.mock("@/components/MermaidDiagram", () => ({
  default: ({ chart }: { chart: string }) => <div className="mermaid" data-chart={chart} />,
}));

/** ソース HTML から実測した忠実転記の契約値。 */
const SECTION_IDS = Array.from({ length: 15 }, (_, i) => `s${i + 1}`);
// h2 = 15 section タイトル（元の h1 から降格）。
const H2_COUNT = 15;
// h3 = 34 （元の h2 から降格）
const H3_COUNT = 34;
// h4 = 8 （元の h3 から降格）
const H4_COUNT = 8;
// 翻訳・誤変換による見出し文言のすり替えを検知するため、主要見出しを順序付きで固定する。
// （個数のみの検証では文言変更が素通りするため）
const H3_TEXTS = [
  "特徴的な臨床像",
  "世界的有病率",
  "人口統計学的特徴",
  "病態生理学の統合モデル",
  "① 末梢感作（Peripheral Sensitization）— 主に 2.1 / 2.2 型",
  "② 中枢感作（Central Sensitization）— 主に 2.3 型（慢性型）",
  "③ 心理社会的因子（Psychosocial Factors）",
  "4型の直感的理解",
  "ICHD-3 分類ツリー",
  "各型の臨床的意義",
  "エピソード型 TTH（2.1 / 2.2）の診断フロー",
  "慢性緊張型頭痛（2.3）の診断基準",
  "頭蓋周囲圧痛の評価方法",
  "SNOOP4 スクリーニングフロー",
  "SNOOP4 各項目の詳細解説",
  "緊急度と想定診断",
  "主要頭痛疾患との包括的比較",
  "バリデーション済み評価ツール一覧",
  "頭痛日誌の活用",
  "9.1 急性期治療",
  "9.2 予防療法",
  "9.3 非薬物療法（ノンファーマコロジカル治療）",
  "重要な薬物・サプリメント相互作用",
  "MOH 診断フロー（ICHD-3 8.2 準拠）",
  "MOH 閾値の早見表",
  "MOHの病態メカニズム（簡易解説）",
  "集団別の TTH 管理指針",
  "TTH 管理における推奨グレード早見表",
  "エビデンス階層の定義",
  "診断基準（最重要一次資料）",
  "臨床ガイドライン",
  "Cochrane エビデンスレビュー",
  "主要引用文献（アルファベット順）",
  "学術誌・継続的情報源",
];
const H4_TEXTS = [
  "急性期薬剤エビデンスサマリー",
  "予防薬剤エビデンステーブル",
  "非薬物療法エビデンステーブル",
  "急性期治療（Step-down 戦略）",
  "予防療法 Grade A",
  "理学療法 Grade B",
  "心理・行動療法 Grade B",
  "栄養プロトコル Grade B",
];
const MERMAID_COUNT = 8;
const TABLE_COUNT = 29;
const HERO_H1 = "緊張型頭痛（Tension-Type Headache）完全ガイド";

describe("TensionTypeHeadachePage: 契約（忠実転記）", () => {
  it("hero の <h1> がソースのページタイトルと一致する", () => {
    const { container } = render(<TensionTypeHeadachePage />);
    const hero = container.querySelector(".hero h1");
    expect(hero?.textContent).toBe(HERO_H1);
  });

  it("section.sec の id 配列が s1..s15 と一致する", () => {
    const { container } = render(<TensionTypeHeadachePage />);
    const ids = Array.from(container.querySelectorAll("section.sec")).map((s) => s.id);
    expect(ids).toEqual(SECTION_IDS);
  });

  it("<h2> の個数が section タイトル数と一致する", () => {
    const { container } = render(<TensionTypeHeadachePage />);
    expect(container.querySelectorAll("h2")).toHaveLength(H2_COUNT);
  });

  it("<h3> が個数・文言ともにソースと一致する（順序付き）", () => {
    const { container } = render(<TensionTypeHeadachePage />);
    const h3s = Array.from(container.querySelectorAll("h3"));
    expect(h3s).toHaveLength(H3_COUNT);
    const texts = h3s.map((h) => (h.textContent ?? "").replace(/\s+/g, " ").trim());
    expect(texts).toEqual(H3_TEXTS);
  });

  it("<h4> が個数・文言ともにソースと一致する（順序付き）", () => {
    const { container } = render(<TensionTypeHeadachePage />);
    const h4s = Array.from(container.querySelectorAll("h4"));
    expect(h4s).toHaveLength(H4_COUNT);
    const texts = h4s.map((h) => (h.textContent ?? "").replace(/\s+/g, " ").trim());
    expect(texts).toEqual(H4_TEXTS);
  });

  it("Mermaid 図の個数がソースと一致する", () => {
    const { container } = render(<TensionTypeHeadachePage />);
    expect(container.querySelectorAll(".mermaid")).toHaveLength(MERMAID_COUNT);
  });

  it("<table> の個数がソースと一致する", () => {
    const { container } = render(<TensionTypeHeadachePage />);
    expect(container.querySelectorAll("table")).toHaveLength(TABLE_COUNT);
  });

  it("外部リンク（http 始まり）はすべて target=_blank と rel=noopener noreferrer を持つ", () => {
    const { container } = render(<TensionTypeHeadachePage />);
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
    const { container } = render(<TensionTypeHeadachePage />);
    const internals = Array.from(container.querySelectorAll("a")).filter((a) =>
      (a.getAttribute("href") ?? "").startsWith("#")
    );
    expect(internals.length).toBeGreaterThan(0);
    for (const a of internals) {
      expect(a.getAttribute("href")).not.toContain(".html");
    }
  });
});
