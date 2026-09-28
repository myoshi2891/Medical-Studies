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
    expect(screen.getByRole("link", { name: "ホームへ戻る" })).toHaveAttribute(
      "href",
      "/prom-checker"
    );
    fireEvent.click(screen.getByRole("button", { name: "もう一度試す" }));
    expect(reset).toHaveBeenCalledOnce();
  });
});
