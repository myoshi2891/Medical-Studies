import { readFileSync } from "node:fs";
import { join } from "node:path";
import { fireEvent, render } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import Page0 from "./aerobic-exercise-headache-prevention/page";
import Page1 from "./headache-acupoints-trigger-points/page";
import Page2 from "./nutrition-and-supplements/page";
import Page3 from "./psychological-behavioral-therapy/page";
import Page4 from "./sleep-and-headache-guide/page";
import Page5 from "./trigger-points-and-headache/page";

vi.mock("@/components/MermaidDiagram", () => ({
  default: () => <div className="mermaid" />,
}));

const pages = [
  [
    "aerobic-exercise-headache-prevention",
    Page0,
    "⚠️AcademicDisclaimer（学術免責事項）本資料は学術・教育・研究目的のみを対象としています。すべての内容は資格を持つ医療専門家による臨床適用前のレビューが必要です。個人的な医療アドバイス・診断・処方を提供するものではありません。",
  ],
  [
    "headache-acupoints-trigger-points",
    Page1,
    "⚠️DisclaimerBanner／学術・教育目的に関する重要事項本ページは教育・情報提供のみを目的として作成されたものであり、個別の患者に対する診断・治療の推奨ではありません。すべての内容は資格を持つ医療専門家による臨床適用前のレビューが必要です。症状がある場合は自己判断による鍼の自己施術や強い自己圧迫を行わず、医師・有資格の鍼灸師（はり師・きゅう師）にご相談ください。",
  ],
  [
    "nutrition-and-supplements",
    Page2,
    "⚠️AcademicDisclaimer（学術免責事項）本資料は学術・教育・研究目的のみを対象としています。すべての内容は国際的に認定された文献・ガイドラインに基づいていますが、個人の医療診断・処方・治療の代替とはなりません。臨床応用の前に必ず資格を持つ医療専門家（神経内科・頭痛専門医）にご相談ください。参照基準:ICHD-3|AAN|EHF|IHS2024|NICECG150|CochraneLibrary|WHO|PubMed",
  ],
  [
    "psychological-behavioral-therapy",
    Page3,
    "⚠️AcademicDisclaimer（学術免責事項）本資料は学術・教育・研究目的のみを対象としています。内容はICHD-3/AAN/EHF/IHS2024/NICECG150/Cochrane/WHO/PubMedに基づく国際的に認定された文献に準拠していますが、個人の医療診断・処方・治療の代替にはなりません。臨床への適用前に、必ず資格を有する医療専門家（神経内科・頭痛専門医・臨床心理士）にご相談ください。",
  ],
  [
    "sleep-and-headache-guide",
    Page4,
    "⚠️AcademicDisclaimer（学術免責事項）本ページは学術・教育・情報提供のみを目的としており、個別の患者に対する診断・治療の推奨ではありません。記載内容は国際的に認知されているガイドライン・システマティックレビュー等の一次情報に基づく一般的な解説です。ご自身の症状・治療方針については、必ず医師・薬剤師にご相談ください。緊急性の高い症状（Step8「レッドフラッグ」参照）がある場合は速やかに医療機関を受診してください。",
  ],
  [
    "trigger-points-and-headache",
    Page5,
    "⚠️DisclaimerBanner／学術・教育目的に関する重要事項本ページは教育・情報提供のみを目的として作成されたものであり、個別の患者に対する診断・治療の推奨ではありません。すべての内容は資格を持つ医療専門家による臨床適用前のレビューが必要です。症状がある場合は自己判断せず、医師・理学療法士・鍼灸師等の有資格の医療専門家にご相談ください。",
  ],
] as const;

describe.each(pages)("%s の画面移行", (slug, Page, disclaimerText) => {
  it("ヒーローにセラピー分類・本文への導線・実際の節数と図数を示す", () => {
    const { container } = render(<Page />);
    const hero = container.querySelector("header.hero");
    expect(hero?.querySelector(".pt-breadcrumb")).toHaveTextContent("セラピー / THERAPIES");
    const firstSection = container.querySelector("main section.sec");
    expect(hero?.querySelector(".pt-start")).toHaveAttribute("href", `#${firstSection?.id}`);
    expect(
      Array.from(container.querySelectorAll(".pt-hero-stats dd"), (el) => Number(el.textContent))
    ).toEqual([
      container.querySelectorAll("main section.sec").length,
      container.querySelectorAll(".mermaid").length,
    ]);
  });

  it("免責全文を保持し、閉じた状態でも用途を伝えて開閉できる", () => {
    const { container } = render(<Page />);
    const details = container.querySelector("details.disclaimer");
    const summary = details?.querySelector("summary");
    expect(summary).toHaveTextContent("学術・教育・研究目的");
    expect(details).not.toHaveAttribute("open");
    expect(details?.querySelector(".pt-disclaimer-body")?.textContent?.replace(/\s+/g, "")).toBe(
      disclaimerText
    );
    if (!summary) throw new Error("免責表示の開閉ボタンがありません");
    fireEvent.click(summary);
    expect(details).toHaveAttribute("open");
    fireEvent.click(summary);
    expect(details).not.toHaveAttribute("open");
  });

  it("目次に件数・2桁の装飾番号・現在位置を示し、実在する節へリンクする", () => {
    const { container } = render(<Page />);
    const nav = container.querySelector("nav.sidebar");
    const links = Array.from(container.querySelectorAll(".sidebar .nav-a"));
    expect(nav).toHaveAttribute("aria-label");
    expect(nav?.querySelector(".s-hdr")).toHaveTextContent(`${links.length}項目`);
    expect(nav?.querySelectorAll('[aria-current="location"]')).toHaveLength(1);
    for (const link of links) {
      const number = link.querySelector(".n-num");
      expect(number).toHaveAttribute("aria-hidden", "true");
      expect(number?.textContent).toMatch(/^\d{2}$/);
      expect(container.querySelector(link.getAttribute("href") ?? "#missing")).not.toBeNull();
    }
  });

  it("本文の最大幅制限を解除し、目次とアンカーを共通ヘッダーの下に配置する", () => {
    const css = readFileSync(join(__dirname, slug, `${slug}.css`), "utf8");
    const scope = css.match(/^\.[\w-]+/m)?.[0];
    const rule = (selector: string) => {
      return Array.from(css.matchAll(/([^{}]+)\{([^{}]*)\}/g))
        .filter((match) =>
          match[1]
            .replace(/\/\*[\s\S]*?\*\//g, "")
            .split(",")
            .some((value) => value.trim() === `${scope} ${selector}`)
        )
        .map((match) => match[2])
        .join("\n");
    };
    expect(rule(".layout")).toMatch(/max-width:\s*none/);
    expect(rule(".layout")).toMatch(/width:\s*100%/);
    expect(rule(".main")).toMatch(/max-width:\s*none/);
    expect(rule(".main")).toMatch(/min-width:\s*0/);
    expect(rule(".hero")).toMatch(/text-align:\s*left/);
    expect(rule(".hero")).toContain("grid-template-columns");
    expect(rule(".sidebar")).toContain("var(--ch-height");
    expect(rule(".sec")).toContain("var(--ch-disclaimer-height");
    expect(rule(".nav-a")).toMatch(/box-sizing:\s*border-box/);
    expect(rule(".nav-a")).toMatch(/min-height:\s*44px/);
  });
});
