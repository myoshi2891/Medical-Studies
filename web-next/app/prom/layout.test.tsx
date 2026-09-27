import { readFileSync } from "node:fs";
import { join } from "node:path";
import { fireEvent, render } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import Page0 from "./headache-impact-test/page";
import Page1 from "./migraine-disability-assessment/page";
import Page2 from "./migraine-specific-quality-of-life/page";
import Page3 from "./numerical-rating-scale-visual-analogue-scale/page";
import Page4 from "./patient-global-impression-of-change/page";

vi.mock("@/components/MermaidDiagram", () => ({
  default: () => <div className="mermaid" />,
}));

const pages = [
  [
    "headache-impact-test",
    Page0,
    "⚠️AcademicDisclaimer（学術免責事項）本資料は学術・教育・研究目的のみを対象としています。すべての内容は資格を持つ医療専門家による臨床適用前のレビューが必要です。個人的な医療アドバイス・診断・処方を提供するものではありません。",
  ],
  [
    "migraine-disability-assessment",
    Page1,
    "⚠️AcademicDisclaimer（学術免責事項）本資料は学術・教育・研究目的のみを対象としています。すべての内容は資格を持つ医療専門家による臨床適用前のレビューが必要です。個人的な医療アドバイス・診断・処方を提供するものではありません。",
  ],
  [
    "migraine-specific-quality-of-life",
    Page2,
    "⚠️AcademicDisclaimer（学術免責事項）本資料は学術・教育・研究目的のみを対象としています。すべての内容は資格を持つ医療専門家による臨床適用前のレビューが必要です。個人的な医療アドバイス・診断・処方を提供するものではありません。",
  ],
  [
    "numerical-rating-scale-visual-analogue-scale",
    Page3,
    "⚠️AcademicDisclaimer（学術免責事項）本資料は学術・教育・研究目的のみを対象としています。すべての内容は資格を持つ医療専門家による臨床適用前のレビューが必要です。個人的な医療アドバイス・診断・処方を提供するものではありません。",
  ],
  [
    "patient-global-impression-of-change",
    Page4,
    "⚠️AcademicDisclaimer（学術免責事項）本資料は学術・教育・研究目的のみを対象としています。すべての内容は資格を持つ医療専門家による臨床適用前のレビューが必要です。個人的な医療アドバイス・診断・処方を提供するものではありません。",
  ],
] as const;

describe.each(pages)("%s の画面移行", (slug, Page, disclaimerText) => {
  it("モバイル目次を開閉でき、Escapeで開閉ボタンにフォーカスが戻る", () => {
    const { container } = render(<Page />);
    const toggle = container.querySelector<HTMLButtonElement>(".menu-toggle");
    const nav = container.querySelector(".sidebar");
    const link = nav?.querySelector<HTMLAnchorElement>("a");
    const backdrop = container.querySelector(".nav-backdrop");
    if (!toggle || !link || !backdrop) throw new Error("モバイル目次の操作要素が必要です");
    fireEvent.click(toggle);
    expect(toggle).toHaveAttribute("aria-expanded", "true");
    expect(nav).toHaveClass("open");
    link.focus();
    fireEvent.keyDown(document, { key: "Escape" });
    expect(toggle).toHaveAttribute("aria-expanded", "false");
    expect(toggle).toHaveFocus();
    fireEvent.click(toggle);
    fireEvent.click(backdrop);
    expect(nav).not.toHaveClass("open");
    fireEvent.click(toggle);
    link.scrollIntoView = vi.fn();
    const target = container.querySelector(link.getAttribute("href") ?? "#missing");
    if (target) target.scrollIntoView = vi.fn();
    fireEvent.click(link);
    expect(nav).not.toHaveClass("open");
  });

  it("ヒーローにPROM分類・本文への導線・実際の節数と図数を示す", () => {
    const { container } = render(<Page />);
    const hero = container.querySelector("header.hero");
    expect(hero?.querySelector(".diary-breadcrumb")).toHaveTextContent("記録・評価 / PROM");
    const firstSection = container.querySelector("main section.sec");
    expect(hero?.querySelector(".diary-start")).toHaveAttribute("href", `#${firstSection?.id}`);
    expect(
      Array.from(container.querySelectorAll(".diary-hero-stats dd"), (el) => Number(el.textContent))
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
    expect(details?.querySelector(".diary-disclaimer-body")?.textContent?.replace(/\s+/g, "")).toBe(
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

  it("生成されたMermaidのSVGを中央に配置し、大きな図の横スクロールを維持する", () => {
    const css = readFileSync(join(__dirname, slug, `${slug}.css`), "utf8");
    const svg = css.match(/\.[\w-]+ \.mmd pre\.mermaid > svg\s*\{([^}]+)\}/)?.[1];
    expect(svg).toMatch(/display:\s*block/);
    expect(svg).toMatch(/margin-inline:\s*auto/);
    const container = css.match(/\.[\w-]+ \.mmd\s*\{([^}]+)\}/)?.[1];
    expect(container).toMatch(/overflow-x:\s*auto/);
  });
});
