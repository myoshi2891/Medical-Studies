import { render } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { getRelated } from "@/lib/content/registry";
import HeadacheRelatedNervesPage from "./page";

// Mermaid は描画コストと CDN 依存を排除するため軽量モックに差し替える。
vi.mock("@/components/MermaidDiagram", () => ({
  default: ({ chart }: { chart: string }) => <div className="mermaid" data-chart={chart} />,
}));

/** ソース HTML（Headache-related-nerves.html）から実測した忠実転記の契約値。 */
const SECTION_IDS = Array.from({ length: 10 }, (_, i) => `s${i + 1}`);

const EXPECTED_H2_TITLES = [
  "なぜ「頭」が痛むのか ― 脳そのものは痛みを感じない",
  "頭痛に関わる神経ネットワークの全体像",
  "主役① 三叉神経(血管)系(Trigeminovascular System)",
  "主役② 上位頸神経と後頭神経",
  "統合ハブ「三叉神経頸髄複合体(TCC)」",
  "自律神経系の関与 ― 群発頭痛はなぜ涙や鼻づまりを伴うのか",
  "中枢性感作 ― 頭痛が「慢性化」する神経メカニズム",
  "代表的な頭痛タイプと神経メカニズムのまとめ表",
  "全体フローチャートのおさらい",
  "参考文献・出典",
];

const EXPECTED_H3_TITLES = [
  "3-1. 三叉神経とは",
  "3-2.「三叉神経血管系」という考え方",
  "3-3. 片頭痛における「前兆」との関係",
  "まとめ",
  "国際的な分類・学会(第一級の情報源)",
  "米国政府系の医学研究機関(NIH)",
  "主要な査読付き総説・原著論文",
];

const MERMAID_COUNT = 7;
const TABLE_COUNT = 3;
const NAV_COUNT = 10;
const ALERT_COUNT = 2;
const EXTERNAL_LINK_COUNT = 17;
const HERO_H1 = "頭痛と神経系";

describe("HeadacheRelatedNervesPage: 契約（忠実転記 & 厳格検証）", () => {
  it("hero の <h1> がソースのページタイトルと一致する", () => {
    const { container } = render(<HeadacheRelatedNervesPage />);
    const hero = container.querySelector(".hero h1");
    expect(hero?.textContent).toBe(HERO_H1);
  });

  it("section.sec の id 配列が s1..s10 と完全一致する", () => {
    const { container } = render(<HeadacheRelatedNervesPage />);
    const ids = Array.from(container.querySelectorAll("section.sec")).map((s) => s.id);
    expect(ids).toEqual(SECTION_IDS);
  });

  it("<h2> の個数とテキストが section タイトル 10 個と完全一致する", () => {
    const { container } = render(<HeadacheRelatedNervesPage />);
    const h2s = Array.from(container.querySelectorAll("h2")).filter(
      (h) => h.closest(".related-links") === null
    );
    expect(h2s).toHaveLength(EXPECTED_H2_TITLES.length);
    const titles = h2s.map((h) => h.textContent?.trim());
    expect(titles).toEqual(EXPECTED_H2_TITLES);
  });

  it("<h3> の個数とテキストが 7 個と完全一致する", () => {
    const { container } = render(<HeadacheRelatedNervesPage />);
    const h3s = Array.from(container.querySelectorAll("h3"));
    expect(h3s).toHaveLength(EXPECTED_H3_TITLES.length);
    const titles = h3s.map((h) => h.textContent?.trim());
    expect(titles).toEqual(EXPECTED_H3_TITLES);
  });

  it("Mermaid 図 7 個が存在し、主要キーワードを保持している", () => {
    const { container } = render(<HeadacheRelatedNervesPage />);
    const mermaids = container.querySelectorAll(".mermaid");
    expect(mermaids).toHaveLength(MERMAID_COUNT);
    const charts = Array.from(mermaids).map((m) => m.getAttribute("data-chart") ?? "");
    expect(charts[0]).toContain("三叉神経頸髄複合体");
    expect(charts[1]).toContain("三叉神経節");
    expect(charts[2]).toContain("皮質拡延性抑制");
    expect(charts[3]).toContain("大後頭神経");
    expect(charts[4]).toContain("上唾液核");
    expect(charts[5]).toContain("中枢性感作");
    expect(charts[6]).toContain("大脳皮質");
  });

  it("<table> の個数が 3 個で構造・セルデータが保持されている", () => {
    const { container } = render(<HeadacheRelatedNervesPage />);
    const tables = container.querySelectorAll("table");
    expect(tables).toHaveLength(TABLE_COUNT);
    expect(container.querySelectorAll(".tbl.th-teal")).toHaveLength(1);
    expect(container.querySelectorAll(".tbl.th-orange")).toHaveLength(1);
  });

  it("サイドバー nav-a の個数 10 個と href (#s1..#s10) が一致する", () => {
    const { container } = render(<HeadacheRelatedNervesPage />);
    const navs = container.querySelectorAll(".nav-a");
    expect(navs).toHaveLength(NAV_COUNT);
    const hrefs = Array.from(navs).map((a) => a.getAttribute("href"));
    expect(hrefs).toEqual(SECTION_IDS.map((id) => `#${id}`));
  });

  it("全 2 個のアラート (.alert) が正確に描画されている", () => {
    const { container } = render(<HeadacheRelatedNervesPage />);
    const alerts = container.querySelectorAll(".alert");
    expect(alerts).toHaveLength(ALERT_COUNT);
    expect(container.querySelectorAll(".alert.a-info")).toHaveLength(1);
    expect(container.querySelectorAll(".alert.a-warn")).toHaveLength(1);
  });

  it("免責事項 (.disclaimer) と フッター (.footer) の文言が漏れなく含まれる", () => {
    const { container } = render(<HeadacheRelatedNervesPage />);
    const disclaimer = container.querySelector(".disclaimer");
    expect(disclaimer?.textContent).toContain("学術・教育目的のみ");
    const footer = container.querySelector(".footer");
    expect(footer?.textContent).toContain("頭痛と神経系");
  });

  it(`外部リンク (${EXTERNAL_LINK_COUNT} 個) はすべて target=_blank と rel=noopener noreferrer を持つ`, () => {
    const { container } = render(<HeadacheRelatedNervesPage />);
    const externals = Array.from(container.querySelectorAll("a")).filter((a) =>
      /^https?:\/\//.test(a.getAttribute("href") ?? "")
    );
    expect(externals.length).toBe(EXTERNAL_LINK_COUNT);
    for (const a of externals) {
      expect(a.getAttribute("target")).toBe("_blank");
      expect(a.getAttribute("rel")).toBe("noopener noreferrer");
    }
  });

  it("内部リンク（# 始まり）に .html を含まない", () => {
    const { container } = render(<HeadacheRelatedNervesPage />);
    const internals = Array.from(container.querySelectorAll("a")).filter((a) =>
      (a.getAttribute("href") ?? "").startsWith("#")
    );
    expect(internals.length).toBeGreaterThan(0);
    for (const a of internals) {
      expect(a.getAttribute("href")).not.toContain(".html");
    }
  });
});

describe("HeadacheRelatedNervesPage: 関連ページ導線", () => {
  const HREF = "/anatomy/headache-related-nerves";

  it("レジストリの関連ページをすべてリンクとして描画する", () => {
    const { container } = render(<HeadacheRelatedNervesPage />);
    const hrefs = Array.from(container.querySelectorAll(".related-links a")).map((a) =>
      a.getAttribute("href")
    );
    expect(hrefs).toEqual(getRelated(HREF).map((e) => e.href));
  });

  it("内部リンクを最低 2 本持つ（plans/002 Step 3）", () => {
    const { container } = render(<HeadacheRelatedNervesPage />);
    const links = container.querySelectorAll(".related-links a");
    expect(links.length).toBeGreaterThanOrEqual(2);
    for (const link of links) {
      expect(link.getAttribute("href")?.startsWith("/")).toBe(true);
    }
  });
});
