import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import PrivacyPolicyPage from "./page";

describe("プライバシーポリシー: 表示と章内移動", () => {
  it("導入、更新日、6 つの条項を読みやすい構造で表示する", () => {
    render(<PrivacyPolicyPage />);

    expect(
      screen.getByRole("heading", { level: 1, name: "プライバシーポリシー" })
    ).toBeInTheDocument();
    expect(screen.getByText("最終更新日: 2026-07-23")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "ホームへ戻る" })).toHaveAttribute(
      "href",
      "/prom-checker"
    );

    const nav = screen.getByRole("navigation", { name: "このページの目次" });
    const headings = screen.getAllByRole("heading", { level: 2 });
    expect(headings).toHaveLength(6);
    for (const heading of headings) {
      const link = within(nav).getByRole("link", { name: heading.textContent ?? "" });
      const id = link.getAttribute("href")?.slice(1);
      expect(id).toBeTruthy();
      expect(document.getElementById(id ?? "")?.contains(heading)).toBe(true);
    }
  });

  it("保存場所、任意の Google 連携、暫定版の注意を保持する", () => {
    const { container } = render(<PrivacyPolicyPage />);
    expect(container.textContent).toContain("運営者はこれらのデータに一切アクセスできません");
    expect(container.textContent).toContain("利用者が明示的に接続・同意した場合にのみ");
    expect(container.textContent).toContain("本文書は暫定版");
  });
});
