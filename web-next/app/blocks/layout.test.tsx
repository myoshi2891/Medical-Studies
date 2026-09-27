import { readFileSync } from "node:fs";
import { join } from "node:path";
import { fireEvent, render } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import CpbPage from "./cervical-plexus-block/page";
import SgbPage from "./stellate-ganglion-block/page";
import ScgbPage from "./superior-cervical-ganglion-block/page";

vi.mock("@/components/MermaidDiagram", () => ({
  default: () => <div className="mermaid" />,
}));

const pages = [
  ["cervical-plexus-block", CpbPage],
  ["stellate-ganglion-block", SgbPage],
  ["superior-cervical-ganglion-block", ScgbPage],
] as const;

describe.each(pages)("%s の画面移行", (slug, Page) => {
  it("ヒーローに神経ブロック分類・本文への導線・実際の節数と図数を示す", () => {
    const { container } = render(<Page />);
    const hero = container.querySelector("header.hero");
    expect(hero?.querySelector(".onb-breadcrumb")).toHaveTextContent("神経ブロック / NERVE BLOCKS");
    const firstSection = container.querySelector("main section.sec");
    expect(hero?.querySelector(".onb-start")).toHaveAttribute("href", `#${firstSection?.id}`);
    expect(
      Array.from(container.querySelectorAll(".onb-hero-stats dd"), (el) => Number(el.textContent))
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
    expect(details?.querySelector(".onb-disclaimer-body")).toHaveTextContent(
      "提供するものではありません"
    );
    if (slug !== "superior-cervical-ganglion-block") {
      expect(summary).toHaveTextContent("侵襲的手技");
      expect(summary).toHaveTextContent(
        slug === "stellate-ganglion-block" ? "医師のみ" : "医療専門家のみ"
      );
      expect(details).toHaveTextContent("適切なトレーニング・設備・緊急対応体制");
    }
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
