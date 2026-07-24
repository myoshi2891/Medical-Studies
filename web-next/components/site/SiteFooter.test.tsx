/**
 * SiteFooter の契約テスト（監査所見 F5 / plans/013）。
 * 全ページ共通フッターから法務ページ（/privacy・/terms）へ到達できることを固定する。
 */
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { SiteFooter } from "@/components/site/SiteFooter";

describe("SiteFooter: 法務ページへの導線", () => {
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
