import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it } from "vitest";
import PromCheckerPage from "./page";

/**
 * シェル契約テスト（設計書 第8章のゲート不変条件）。
 * Core は別途 lib/prom/*.test.ts で検証済み。ここでは描画シェルの振る舞いを固定する:
 *   1. 保存データが無ければ必ず SNOOP4 ゲートが表示される。
 *   2. レッドフラッグ非該当で送信 → ダッシュボードへ遷移できる。
 *   3. レッドフラッグ該当で送信 → 緊急ダイアログでブロックされる（遷移不可）。
 */

beforeEach(() => {
  window.localStorage.clear();
  window.location.hash = "";
});

describe("PromCheckerPage: SNOOP4 ゲート", () => {
  it("保存データが無いとき SNOOP4 ゲートを表示する", async () => {
    render(<PromCheckerPage />);
    expect(await screen.findByRole("heading", { name: "はじめに安全確認を" })).toBeInTheDocument();
  });

  it("レッドフラッグ非該当で送信するとダッシュボードへ進む", async () => {
    render(<PromCheckerPage />);
    const submit = await screen.findByRole("button", { name: "確認して次へ進む" });
    fireEvent.click(submit);
    expect(
      await screen.findByRole("heading", { name: "こんにちは。今日の記録を始めましょう" })
    ).toBeInTheDocument();
  });

  it("レッドフラッグ該当で送信すると緊急ダイアログでブロックする", async () => {
    render(<PromCheckerPage />);
    await screen.findByRole("button", { name: "確認して次へ進む" });
    const checks = screen.getAllByRole("checkbox");
    fireEvent.click(checks[0]);
    fireEvent.click(screen.getByRole("button", { name: "確認して次へ進む" }));
    await waitFor(() => {
      expect(screen.getByRole("alertdialog")).toHaveAttribute("aria-hidden", "false");
    });
    expect(
      screen.queryByRole("heading", { name: "こんにちは。今日の記録を始めましょう" })
    ).not.toBeInTheDocument();
  });
});
