import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import NotFound from "./not-found";

describe("404 ページ", () => {
  it("迷った人がホームと主要コンテンツに戻れる", () => {
    render(<NotFound />);

    expect(screen.getByRole("main")).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { level: 1, name: "ページが見つかりません" })
    ).toBeInTheDocument();
    expect(screen.getByText(/URL が変更されたか/)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "ホームへ戻る" })).toHaveAttribute(
      "href",
      "/prom-checker"
    );
    expect(screen.getByRole("link", { name: "頭痛について学ぶ" })).toHaveAttribute(
      "href",
      "/headaches/migraine"
    );
  });
});
