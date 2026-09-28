import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import ErrorPage from "./error";

describe("500 エラーページ", () => {
  it("安全な案内と復旧操作を表示し、再試行で境界をリセットする", () => {
    const reset = vi.fn();
    const error = Object.assign(new Error("private server details"), { digest: "abc123" });
    render(<ErrorPage error={error} reset={reset} />);

    expect(screen.getByRole("main")).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { level: 1, name: "ページを表示できませんでした" })
    ).toBeInTheDocument();
    expect(screen.getByText(/一時的な問題/)).toBeInTheDocument();
    expect(screen.queryByText(/private server details/)).not.toBeInTheDocument();
    // 障害中の可能性がある /prom-checker（および "/" のリダイレクト先）を避け、静的ページへ案内する。
    expect(screen.getByRole("link", { name: "頭痛について学ぶ" })).toHaveAttribute(
      "href",
      "/headaches/migraine"
    );
    fireEvent.click(screen.getByRole("button", { name: "もう一度試す" }));
    expect(reset).toHaveBeenCalledOnce();
  });
});
