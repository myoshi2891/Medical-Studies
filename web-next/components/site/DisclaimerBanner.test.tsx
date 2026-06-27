/**
 * 共通ディスクレーマーバナー DisclaimerBanner の契約テスト。
 *
 * 参考元 (AI/LLM-Studies) の構造契約を踏襲しつつ、文面は本リポジトリの
 * 医療免責に差し替えて検証する。
 *
 * 固定する契約:
 * - ルート `<div class="ch-disclaimer" lang="ja">`。
 * - 2 行の `<span class="ch-disclaimer-line">`。
 * - line1 / line2 の文言完全一致（医療免責）。
 * - マウント時に ResizeObserver が observe し、<html> に --ch-disclaimer-height が設定される。
 * - 静的検査: `"use client"` 宣言。
 */

import { readFileSync } from "node:fs";
import { join } from "node:path";
import { render } from "@testing-library/react";
import type { ReactElement } from "react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { DisclaimerBanner as RawBanner } from "@/components/site/DisclaimerBanner";

const DisclaimerBanner = RawBanner as unknown as () => ReactElement;

// jsdom は ResizeObserver を実装しないため、テスト用の最小モックを注入する。
class MockResizeObserver {
  private cb: ResizeObserverCallback;
  constructor(cb: ResizeObserverCallback) {
    this.cb = cb;
  }
  observe(target: Element) {
    this.cb([{ target, contentRect: { height: 72 } } as unknown as ResizeObserverEntry], this);
  }
  unobserve() {
    /* no-op mock */
  }
  disconnect() {
    /* no-op mock */
  }
}

beforeEach(() => {
  document.documentElement.style.removeProperty("--ch-disclaimer-height");
  vi.stubGlobal("ResizeObserver", MockResizeObserver);
});

describe("DisclaimerBanner - ルート構造", () => {
  it("renders a .ch-disclaimer root with lang=ja", () => {
    const { container } = render(<DisclaimerBanner />);
    const root = container.querySelector(".ch-disclaimer");
    expect(root).not.toBeNull();
    expect(root?.getAttribute("lang")).toBe("ja");
  });

  it("renders exactly 2 .ch-disclaimer-line spans", () => {
    const { container } = render(<DisclaimerBanner />);
    const lines = container.querySelectorAll(".ch-disclaimer-line");
    expect(lines.length).toBe(2);
  });
});

describe("DisclaimerBanner - 文言契約（医療免責）", () => {
  it("line 1 は医療教育目的の免責文と完全一致する", () => {
    const { container } = render(<DisclaimerBanner />);
    const lines = container.querySelectorAll(".ch-disclaimer-line");
    expect(lines[0]?.textContent).toBe(
      "⚠ 本サイトは医療教育目的のコンテンツです。医師による診断・治療の代替にはなりません。"
    );
  });

  it("line 2 は AI 生成・受診勧奨の免責文と完全一致する", () => {
    const { container } = render(<DisclaimerBanner />);
    const lines = container.querySelectorAll(".ch-disclaimer-line");
    expect(lines[1]?.textContent).toBe(
      "一部に AI 生成による解析結果を含み、情報の正確性は保証しません。症状がある場合は必ず医療機関を受診してください。"
    );
  });
});

describe("DisclaimerBanner - ResizeObserver 連携", () => {
  it("sets --ch-disclaimer-height on <html> after mount", () => {
    render(<DisclaimerBanner />);
    const val = document.documentElement.style.getPropertyValue("--ch-disclaimer-height");
    expect(val).not.toBe("");
    expect(val).toMatch(/px$/);
  });
});

describe("DisclaimerBanner - 静的ソース", () => {
  it("declares 'use client' on the first effective line", () => {
    const source = readFileSync(join(__dirname, "DisclaimerBanner.tsx"), "utf8");
    const firstStmt = source.replace(/^\s*(\/\/[^\n]*\n|\/\*[\s\S]*?\*\/\s*\n?)*/g, "");
    expect(firstStmt).toMatch(/^["']use client["']/);
  });
});
