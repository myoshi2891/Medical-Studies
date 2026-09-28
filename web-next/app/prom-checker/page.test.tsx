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

describe("PromCheckerPage: 画面間ナビゲーション", () => {
  it("共通免責を中央の専用領域に表示する", async () => {
    const { container } = render(<PromCheckerPage />);
    fireEvent.click(await screen.findByRole("button", { name: "確認して次へ進む" }));
    const footer = container.querySelector(".app-footer .app-footer-inner");
    expect(footer).not.toBeNull();
    expect(footer?.textContent).toContain("共通免責");
    expect(footer?.textContent).toContain("医師の診断ではありません");
  });

  it("アプリのタイトル左に医療アイコンを表示する", async () => {
    const { container } = render(<PromCheckerPage />);
    fireEvent.click(await screen.findByRole("button", { name: "確認して次へ進む" }));
    const brand = container.querySelector(".app-header .c-brand");
    expect(brand?.textContent).toContain("HEADACHE CARE TOOLS");
    expect(brand?.querySelector("img")?.getAttribute("src")).toBe("/icon.svg");
    expect(brand?.querySelector("img")?.getAttribute("alt")).toBe("");
  });

  it("安全確認後は主要画面を一覧でき、現在の画面を示す", async () => {
    render(<PromCheckerPage />);
    fireEvent.click(await screen.findByRole("button", { name: "確認して次へ進む" }));

    const navigation = await screen.findByRole("navigation", { name: "PROM チェッカーの画面" });
    expect(navigation).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "ダッシュボード" })).toHaveAttribute(
      "aria-current",
      "page"
    );

    fireEvent.click(screen.getByRole("button", { name: "頭痛日誌" }));
    expect(await screen.findByRole("heading", { name: "今日の頭痛を記録" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "頭痛日誌" })).toHaveAttribute(
      "aria-current",
      "page"
    );
  });
});
