/**
 * RelatedLinks の契約テスト（plans/002 Step 3 / plans/004 残作業）。
 *
 * 関連ページのリンク関係は各 page.tsx ではなく `lib/content/registry.ts` が持つ。
 * 本コンポーネントはレジストリを引くだけの薄い層であることを固定する。
 */
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { RelatedLinks } from "@/components/content/RelatedLinks";
import { getRelated } from "@/lib/content/registry";

const MOH_USE_DAYS = "/treatment/moh-acute-use-days";

describe("RelatedLinks", () => {
  it("レジストリの related をリンクとして描画する", () => {
    // Arrange & Act
    render(<RelatedLinks href={MOH_USE_DAYS} />);
    // Assert
    for (const entry of getRelated(MOH_USE_DAYS)) {
      expect(screen.getByRole("link", { name: entry.title })).toHaveAttribute("href", entry.href);
    }
  });

  it("レジストリの宣言順を保って描画する", () => {
    // Arrange & Act
    render(<RelatedLinks href={MOH_USE_DAYS} />);
    // Assert
    const rendered = screen.getAllByRole("link").map((a) => a.getAttribute("href"));
    expect(rendered).toEqual(getRelated(MOH_USE_DAYS).map((e) => e.href));
  });

  it("関連ページのランドマークを持つ（a11y）", () => {
    // Arrange & Act
    render(<RelatedLinks href={MOH_USE_DAYS} />);
    // Assert
    expect(screen.getByRole("navigation", { name: "関連ページ" })).toBeInTheDocument();
  });

  it("見出しを持ち、リストとして構造化されている", () => {
    // Arrange & Act
    render(<RelatedLinks href={MOH_USE_DAYS} />);
    // Assert
    expect(screen.getByRole("heading", { name: "関連ページ" })).toBeInTheDocument();
    expect(screen.getAllByRole("listitem")).toHaveLength(getRelated(MOH_USE_DAYS).length);
  });

  it("未登録 href では何も描画しない", () => {
    // Arrange & Act
    const { container } = render(<RelatedLinks href="/does-not-exist" />);
    // Assert
    expect(container).toBeEmptyDOMElement();
  });

  it("外部遷移になり得る href を描画しない（内部リンクのみ）", () => {
    // Arrange & Act
    render(<RelatedLinks href={MOH_USE_DAYS} />);
    // Assert
    for (const anchor of screen.getAllByRole("link")) {
      expect(anchor.getAttribute("href")?.startsWith("/")).toBe(true);
    }
  });
});
