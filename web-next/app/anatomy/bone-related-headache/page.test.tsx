import { render } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { getRelated } from "@/lib/content/registry";
import BoneRelatedHeadachePage from "./page";

// Mermaid は描画コストと CDN 依存を排除するため軽量モックに差し替える。
vi.mock("@/components/MermaidDiagram", () => ({
  default: ({ chart }: { chart: string }) => <div className="mermaid" data-chart={chart} />,
}));

/** ソース HTML（Bone-related-headache.html）から実測した忠実転記の契約値。 */
const SECTION_IDS = Array.from({ length: 11 }, (_, i) => `s${i + 1}`);

const EXPECTED_H2_TITLES = [
  "そもそも頭痛はどう分類されるのか(ICHD-3の全体像)",
  "頭部の骨の基礎解剖",
  "頭蓋骨そのものの病気による頭痛(ICHD-3 11.1)",
  "頭蓋骨と頸椎の「継ぎ目」で起こる異常(頭蓋頸椎移行部)",
  "頸原性頭痛 ― 首の骨・関節が引き起こす頭痛(ICHD-3 11.2.1)",
  "副鼻腔(骨に囲まれた空洞)による頭痛(ICHD-3 11.5)",
  "顎関節(側頭骨)による頭痛 ― TMD(ICHD-3 11.7)",
  "後頭部の骨と神経 ― 後頭神経痛",
  "側頭骨の突起による頭痛 ― Eagle症候群(ICHD-3 11.8)",
  "全体まとめ ― なぜ「骨」の異常が頭痛になるのか",
  "参考文献(ソース一覧)",
];

const EXPECTED_H3_TITLES = [
  "エビデンスバッジの見方",
  "診断の考え方(ICHD-3基準の要点)",
  "なぜ「首の骨・関節」の問題が「頭」の痛みとして感じられるのか",
  "診断の考え方(ICHD-3 11.2.1の要点)",
  "国際頭痛分類 第3版(ICHD-3)/ 国際頭痛学会",
  "米国国立衛生研究所(NIH)関連",
  "その他の国際的専門機関・学会",
];

const MERMAID_COUNT = 5;
const TABLE_COUNT = 5;
const NAV_COUNT = 11;
const ALERT_COUNT = 7;
const EXTERNAL_LINK_COUNT = 30;
const HERO_H1 = "頭痛に関連する骨";

describe("BoneRelatedHeadachePage: 契約（忠実転記 & 厳格検証）", () => {
  it("hero の <h1> がソースのページタイトルと一致する", () => {
    const { container } = render(<BoneRelatedHeadachePage />);
    const hero = container.querySelector(".hero h1");
    expect(hero?.textContent).toBe(HERO_H1);
  });

  it("section.sec の id 配列が s1..s11 と完全一致する", () => {
    const { container } = render(<BoneRelatedHeadachePage />);
    const ids = Array.from(container.querySelectorAll("section.sec")).map((s) => s.id);
    expect(ids).toEqual(SECTION_IDS);
  });

  it("<h2> の個数とテキストが section タイトル 11 個と完全一致する", () => {
    const { container } = render(<BoneRelatedHeadachePage />);
    const h2s = Array.from(container.querySelectorAll("h2")).filter(
      (h) => h.closest(".related-links") === null
    );
    expect(h2s).toHaveLength(EXPECTED_H2_TITLES.length);
    const titles = h2s.map((h) => h.textContent?.trim());
    expect(titles).toEqual(EXPECTED_H2_TITLES);
  });

  it("<h3> の個数とテキストが 7 個と完全一致する", () => {
    const { container } = render(<BoneRelatedHeadachePage />);
    const h3s = Array.from(container.querySelectorAll("h3"));
    expect(h3s).toHaveLength(EXPECTED_H3_TITLES.length);
    const titles = h3s.map((h) => h.textContent?.trim());
    expect(titles).toEqual(EXPECTED_H3_TITLES);
  });

  it("Mermaid 図 5 個が存在し、主要キーワードを保持している", () => {
    const { container } = render(<BoneRelatedHeadachePage />);
    const mermaids = container.querySelectorAll(".mermaid");
    expect(mermaids).toHaveLength(MERMAID_COUNT);
    const charts = Array.from(mermaids).map((m) => m.getAttribute("data-chart") ?? "");
    expect(charts[0]).toContain("一次性頭痛");
    expect(charts[1]).toContain("前頭骨");
    expect(charts[2]).toContain("大後頭孔");
    expect(charts[3]).toContain("収束");
    expect(charts[4]).toContain("骨・関節に関連する異常");
  });

  it("<table> の個数が 5 個で構造・セルデータが保持されている", () => {
    const { container } = render(<BoneRelatedHeadachePage />);
    const tables = container.querySelectorAll("table");
    expect(tables).toHaveLength(TABLE_COUNT);
    expect(container.querySelectorAll("table.th-teal")).toHaveLength(2);
    expect(container.querySelectorAll("table.th-orange")).toHaveLength(1);
  });

  it("サイドバー nav-a の個数 11 個と href (#s1..#s11) が一致する", () => {
    const { container } = render(<BoneRelatedHeadachePage />);
    const navs = container.querySelectorAll(".nav-a");
    expect(navs).toHaveLength(NAV_COUNT);
    const hrefs = Array.from(navs).map((a) => a.getAttribute("href"));
    expect(hrefs).toEqual(SECTION_IDS.map((id) => `#${id}`));
  });

  it("全 7 個のアラート (.alert) が正確に描画されている", () => {
    const { container } = render(<BoneRelatedHeadachePage />);
    const alerts = container.querySelectorAll(".alert");
    expect(alerts).toHaveLength(ALERT_COUNT);
    expect(container.querySelectorAll(".alert.a-info")).toHaveLength(3);
    expect(container.querySelectorAll(".alert.a-warn")).toHaveLength(2);
    expect(container.querySelectorAll(".alert.a-purple")).toHaveLength(1);
    expect(container.querySelectorAll(".alert.a-ok")).toHaveLength(1);
  });

  it("免責事項 (.disclaimer) と フッター (.footer) の文言が漏れなく含まれる", () => {
    const { container } = render(<BoneRelatedHeadachePage />);
    const disclaimer = container.querySelector(".disclaimer");
    expect(disclaimer?.textContent).toContain("学術・教育・研究目的のみ");
    const footer = container.querySelector(".footer");
    expect(footer?.textContent).toContain("頭痛に関連する骨");
  });

  it(`外部リンク (${EXTERNAL_LINK_COUNT} 個) はすべて target=_blank と rel=noopener noreferrer を持つ`, () => {
    const { container } = render(<BoneRelatedHeadachePage />);
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
    const { container } = render(<BoneRelatedHeadachePage />);
    const internals = Array.from(container.querySelectorAll("a")).filter((a) =>
      (a.getAttribute("href") ?? "").startsWith("#")
    );
    expect(internals.length).toBeGreaterThan(0);
    for (const a of internals) {
      expect(a.getAttribute("href")).not.toContain(".html");
    }
  });
});

describe("BoneRelatedHeadachePage: 関連ページ導線", () => {
  const HREF = "/anatomy/bone-related-headache";

  it("レジストリの関連ページをすべてリンクとして描画する", () => {
    const { container } = render(<BoneRelatedHeadachePage />);
    const hrefs = Array.from(container.querySelectorAll(".related-links a")).map((a) =>
      a.getAttribute("href")
    );
    expect(hrefs).toEqual(getRelated(HREF).map((e) => e.href));
  });

  it("内部リンクを最低 2 本持つ（plans/002 Step 3）", () => {
    const { container } = render(<BoneRelatedHeadachePage />);
    const links = container.querySelectorAll(".related-links a");
    expect(links.length).toBeGreaterThanOrEqual(2);
    for (const link of links) {
      expect(link.getAttribute("href")?.startsWith("/")).toBe(true);
    }
  });
});
