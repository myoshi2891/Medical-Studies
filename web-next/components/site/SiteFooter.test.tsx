/**
 * SiteFooter の契約テスト（監査所見 F5 / plans/013）。
 * 全ページ共通フッターから法務ページ（/privacy・/terms）へ到達できることを固定する。
 */
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { SiteFooter } from "@/components/site/SiteFooter";

describe("SiteFooter: 法務ページへの導線", () => {
  it("ブランドと医療教育上の注意を共通フッターに表示する", () => {
    const { container } = render(<SiteFooter />);
    const brand = screen.getByRole("link", { name: "頭痛ケア・スタディ" });
    expect(brand).toHaveAttribute("href", "/prom-checker");
    expect(brand.querySelector("img")?.getAttribute("src")).toBe("/icon.svg");
    expect(container.querySelector(".site-footer-bottom")?.textContent).toContain(
      "診断・治療の代替にはなりません"
    );
  });

  it("「プライバシーポリシー」リンクが /privacy を指す", () => {
    // Arrange & Act
    render(<SiteFooter />);
    // Assert
    expect(screen.getByRole("link", { name: "プライバシーポリシー" })).toHaveAttribute(
      "href",
      "/privacy"
    );
  });

  it("「利用規約」リンクが /terms を指す", () => {
    // Arrange & Act
    render(<SiteFooter />);
    // Assert
    expect(screen.getByRole("link", { name: "利用規約" })).toHaveAttribute("href", "/terms");
  });
});

describe("SiteFooter: 全画面共通の余白", () => {
  it("ページ本文と共通フッターの間に外側の余白を作らない", () => {
    const css = readFileSync(join(__dirname, "../../app/globals.css"), "utf8");
    const footerRule = css.match(/\.site-footer\s*\{([^}]*)\}/)?.[1];
    expect(footerRule).toMatch(/margin-top:\s*0;/);
    expect(footerRule).toMatch(/background:/);
  });
});
