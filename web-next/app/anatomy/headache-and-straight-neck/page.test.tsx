import { render } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { getRelated } from "@/lib/content/registry";
import HeadacheAndStraightNeckPage from "./page";

// Mermaid は描画コストと CDN 依存を排除するため軽量モックに差し替える。
vi.mock("@/components/MermaidDiagram", () => ({
  default: ({ chart }: { chart: string }) => <div className="mermaid" data-chart={chart} />,
}));

/** ソース HTML（Headache-and-straight-neck.html）から実測した忠実転記の契約値。 */
const SECTION_IDS = Array.from({ length: 9 }, (_, i) => `s${i + 1}`);

// section タイトル（.sec-title）は h2。hero の h1 が唯一の h1 で、見出し階層を飛ばさない。
const EXPECTED_H2_TITLES = [
  "頭痛の全体像を知る",
  "「ストレートネック」とは何か",
  "なぜ姿勢が頭痛を引き起こしうるのか（メカニズム）",
  "科学的エビデンスは何を示しているか",
  "セルフチェックの方法",
  "危険な頭痛のサイン（レッドフラッグ）",
  "エビデンスに基づく対処法",
  "まとめ",
  "参考文献・情報源",
];

// 各 section 内の小見出しは h3（旧 h2 を 1 段下げたもの）。
const EXPECTED_H3_TITLES = [
  "頭痛の国際的分類（ICHD-3）",
  "主要な頭痛タイプの比較",
  "頸椎の基本構造",
  "なぜ首がまっすぐになってしまうのか",
  "頭部前方位を測る指標：頭蓋脊椎角（CVA）",
  "力学的負荷：頭を傾けるほど首への負担は跳ね上がる",
  "筋の持続的緊張と緊張型頭痛",
  "神経学的メカニズム：三叉神経頸髄核における「収束」",
  "頸原性頭痛の国際診断基準（ICHD-3 第11.2.1項）",
  "運動療法：頸部エクササイズの効果",
  "推奨される日常的なセルフケア",
];

const MERMAID_COUNT = 3;
const TABLE_COUNT = 3;
const NAV_COUNT = 9;
const ALERT_COUNT = 13;
const EXTERNAL_LINK_COUNT = 18;
const HERO_H1 = "頭痛とストレートネック";

describe("HeadacheAndStraightNeckPage: 契約（忠実転記 & 厳格検証）", () => {
  it("hero の <h1> がソースのページタイトルと一致する", () => {
    const { container } = render(<HeadacheAndStraightNeckPage />);
    const hero = container.querySelector(".hero h1");
    expect(hero?.textContent).toBe(HERO_H1);
  });

  it("section.sec の id 配列が s1..s9 と完全一致する", () => {
    const { container } = render(<HeadacheAndStraightNeckPage />);
    const ids = Array.from(container.querySelectorAll("section.sec")).map((s) => s.id);
    expect(ids).toEqual(SECTION_IDS);
  });

  it("<h2> の個数とテキストが section タイトル 9 個と完全一致する", () => {
    const { container } = render(<HeadacheAndStraightNeckPage />);
    const h2s = Array.from(container.querySelectorAll("h2")).filter(
      (h) => h.closest(".related-links") === null
    );
    expect(h2s).toHaveLength(EXPECTED_H2_TITLES.length);
    const titles = h2s.map((h) => h.textContent?.trim());
    expect(titles).toEqual(EXPECTED_H2_TITLES);
  });

  it("<h3> の個数とテキストが小見出し 11 個と完全一致する", () => {
    const { container } = render(<HeadacheAndStraightNeckPage />);
    const h3s = Array.from(container.querySelectorAll("h3")).filter(
      (h) => h.closest(".related-links") === null
    );
    expect(h3s).toHaveLength(EXPECTED_H3_TITLES.length);
    const titles = h3s.map((h) => h.textContent?.trim());
    expect(titles).toEqual(EXPECTED_H3_TITLES);
  });

  it("h1 は hero の 1 個だけで、見出し階層を飛ばさない", () => {
    const { container } = render(<HeadacheAndStraightNeckPage />);
    expect(container.querySelectorAll("h1")).toHaveLength(1);
    expect(container.querySelector("h1")?.closest(".hero")).not.toBeNull();
  });

  it("Mermaid 図 3 個が存在し、主要キーワードを保持している", () => {
    const { container } = render(<HeadacheAndStraightNeckPage />);
    const mermaids = container.querySelectorAll(".mermaid");
    expect(mermaids).toHaveLength(MERMAID_COUNT);
    const charts = Array.from(mermaids).map((m) => m.getAttribute("data-chart") ?? "");
    expect(charts[0]).toContain("一次性頭痛");
    expect(charts[1]).toContain("三叉神経頸髄核");
    expect(charts[2]).toContain("くも膜下出血");
  });

  it("<table> の個数が 3 個で描画されている", () => {
    const { container } = render(<HeadacheAndStraightNeckPage />);
    const tables = container.querySelectorAll("table");
    expect(tables).toHaveLength(TABLE_COUNT);
    expect(container.querySelectorAll("table.th-teal")).toHaveLength(1);
    expect(container.querySelectorAll("table.th-purple")).toHaveLength(1);
  });

  it("サイドバー nav-a の個数 9 個と href (#s1..#s9) が一致する", () => {
    const { container } = render(<HeadacheAndStraightNeckPage />);
    const navs = container.querySelectorAll(".nav-a");
    expect(navs).toHaveLength(NAV_COUNT);
    const hrefs = Array.from(navs).map((a) => a.getAttribute("href"));
    expect(hrefs).toEqual(SECTION_IDS.map((id) => `#${id}`));
  });

  it("全 13 個のアラート (.alert) が正確に描画されている", () => {
    const { container } = render(<HeadacheAndStraightNeckPage />);
    const alerts = container.querySelectorAll(".alert");
    expect(alerts).toHaveLength(ALERT_COUNT);
    expect(container.querySelectorAll(".alert.a-info")).toHaveLength(3);
    expect(container.querySelectorAll(".alert.a-purple")).toHaveLength(1);
    expect(container.querySelectorAll(".alert.a-warn")).toHaveLength(3);
    expect(container.querySelectorAll(".alert.a-danger")).toHaveLength(2);
    expect(container.querySelectorAll(".alert.a-ok")).toHaveLength(4);
  });

  it("免責事項 (.disclaimer) と フッター (.footer) の文言が漏れなく含まれる", () => {
    const { container } = render(<HeadacheAndStraightNeckPage />);
    const disclaimer = container.querySelector(".disclaimer");
    expect(disclaimer?.textContent).toContain("学術・教育・研究目的のみ");
    const footer = container.querySelector(".footer");
    expect(footer?.textContent).toContain("頭痛とストレートネック");
  });

  it(`外部リンク (${EXTERNAL_LINK_COUNT} 個) はすべて target=_blank と rel=noopener noreferrer を持つ`, () => {
    const { container } = render(<HeadacheAndStraightNeckPage />);
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
    const { container } = render(<HeadacheAndStraightNeckPage />);
    const internals = Array.from(container.querySelectorAll("a")).filter((a) =>
      (a.getAttribute("href") ?? "").startsWith("#")
    );
    expect(internals.length).toBeGreaterThan(0);
    for (const a of internals) {
      expect(a.getAttribute("href")).not.toContain(".html");
    }
  });
});

describe("HeadacheAndStraightNeckPage: 関連ページ導線", () => {
  const HREF = "/anatomy/headache-and-straight-neck";

  it("レジストリの関連ページをすべてリンクとして描画する", () => {
    const { container } = render(<HeadacheAndStraightNeckPage />);
    const hrefs = Array.from(container.querySelectorAll(".related-links a")).map((a) =>
      a.getAttribute("href")
    );
    expect(hrefs).toEqual(getRelated(HREF).map((e) => e.href));
  });

  it("内部リンクを最低 2 本持つ（plans/002 Step 3）", () => {
    const { container } = render(<HeadacheAndStraightNeckPage />);
    const links = container.querySelectorAll(".related-links a");
    expect(links.length).toBeGreaterThanOrEqual(2);
    for (const link of links) {
      expect(link.getAttribute("href")?.startsWith("/")).toBe(true);
    }
  });
});
