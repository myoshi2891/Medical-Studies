import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import TermsOfServicePage from "./page";

describe("利用規約: 表示と章内移動", () => {
  it("導入、更新日、7 つの条項を読みやすい構造で表示する", () => {
    render(<TermsOfServicePage />);

    expect(screen.getByRole("heading", { level: 1, name: "利用規約" })).toBeInTheDocument();
    expect(screen.getByText("最終更新日: 2026-07-23")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "ホームへ戻る" })).toHaveAttribute(
      "href",
      "/prom-checker"
    );

    const nav = screen.getByRole("navigation", { name: "このページの目次" });
    const headings = screen.getAllByRole("heading", { level: 2 });
    expect(headings).toHaveLength(7);
    for (const heading of headings) {
      const link = within(nav).getByRole("link", { name: heading.textContent ?? "" });
      const id = link.getAttribute("href")?.slice(1);
      expect(id).toBeTruthy();
      expect(document.getElementById(id ?? "")?.contains(heading)).toBe(true);
    }
  });

  it("医療上の免責、第三者の権利、暫定版の注意を保持する", () => {
    const { container } = render(<TermsOfServicePage />);
    expect(container.textContent).toContain("医師による診断・治療の代替にはなりません");
    expect(container.textContent).toContain("権利者の許諾条件が適用されます");
    expect(container.textContent).toContain("本文書は暫定版");
  });
});
