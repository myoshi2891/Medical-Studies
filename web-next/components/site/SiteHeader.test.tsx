/**
 * 共通ナビゲーション SiteHeader の契約テスト。
 *
 * 参考元 (AI/LLM-Studies/web-next/components/site/SiteHeader.test.tsx) を
 * 本リポジトリのナビ構成（ブランド: Medical Studies / Blocks ドロップダウン /
 * GitHub 外部リンクなし）に合わせて移植。
 *
 * 固定する契約:
 * - ルート `<nav id="common-header" aria-label="Main Navigation" class="ch-nav">`。
 * - `<a class="ch-brand" href="/">Medical Studies</a>`。
 * - `<ul class="ch-links">` 配下に navLinks 由来の `<li>`。
 * - Blocks ドロップダウンは `<li class="ch-dropdown">` > toggle + submenu 構造。
 * - pathname="/anatomy" で該当 `<a>` に ch-active + aria-current="page"。
 * - pathname がドロップダウンの子の場合、親トグルにも ch-active が波及。
 * - 静的検査: 生 HTML 注入 API を使わない / `"use client"` 宣言。
 */

import { readFileSync } from "node:fs";
import { join } from "node:path";
import { render } from "@testing-library/react";
import type { ReactElement } from "react";
import { describe, expect, it } from "vitest";
import { SiteHeader as RawSiteHeader } from "@/components/site/SiteHeader";

const SiteHeader = RawSiteHeader as unknown as (props: { pathname: string }) => ReactElement;

describe("SiteHeader - ルート構造", () => {
  it("renders <nav id=common-header aria-label='Main Navigation'>", () => {
    const { container } = render(<SiteHeader pathname="/" />);
    const nav = container.querySelector("nav#common-header");
    expect(nav).not.toBeNull();
    expect(nav?.getAttribute("aria-label")).toBe("Main Navigation");
    expect(nav?.className).toContain("ch-nav");
  });

  it("renders .ch-brand anchor pointing to / with text 'Medical Studies'", () => {
    const { container } = render(<SiteHeader pathname="/" />);
    const brand = container.querySelector("a.ch-brand");
    expect(brand?.getAttribute("href")).toBe("/");
    expect(brand?.textContent).toBe("Medical Studies");
  });

  it("renders a .ch-links list", () => {
    const { container } = render(<SiteHeader pathname="/" />);
    expect(container.querySelector("ul.ch-links")).not.toBeNull();
  });
});

describe("SiteHeader - ドロップダウン描画", () => {
  it("renders 4 dropdowns (Headaches/Blocks/Therapies/PROM) as .ch-dropdown <li>", () => {
    const { container } = render(<SiteHeader pathname="/" />);
    const dropdowns = container.querySelectorAll("li.ch-dropdown");
    expect(dropdowns.length).toBe(4);
  });

  it("each dropdown toggle has aria-haspopup=true", () => {
    const { container } = render(<SiteHeader pathname="/" />);
    const toggles = container.querySelectorAll("li.ch-dropdown .ch-dropdown-toggle");
    expect(toggles.length).toBe(4);
    toggles.forEach((btn) => {
      expect(btn.getAttribute("aria-haspopup")).toBe("true");
    });
  });

  it("the Blocks dropdown has a .ch-submenu <ul> with 3 children", () => {
    const { container } = render(<SiteHeader pathname="/" />);
    const blocksToggle = Array.from(
      container.querySelectorAll<HTMLElement>("li.ch-dropdown .ch-dropdown-toggle")
    ).find((t) => t.textContent?.includes("Blocks"));
    const submenu = blocksToggle?.closest("li.ch-dropdown")?.querySelector("ul.ch-submenu");
    expect(submenu?.querySelectorAll("li").length).toBe(3);
  });
});

describe("SiteHeader - 未実装ルート（準備中）", () => {
  it("disabled なリンクは <a> ではなく aria-disabled の span で描画される", () => {
    const { container } = render(<SiteHeader pathname="/" />);
    const disabled = container.querySelectorAll("span.ch-disabled[aria-disabled='true']");
    // Headaches1 + Blocks(SGB)1 + Therapies3 + PROM6 = 11 件
    expect(disabled.length).toBe(11);
  });

  it("準備中項目はクリック可能なリンク（href）を持たない", () => {
    const { container } = render(<SiteHeader pathname="/" />);
    const disabledSpans = container.querySelectorAll("span.ch-disabled");
    disabledSpans.forEach((span) => {
      expect(span.querySelector("a")).toBeNull();
      expect(span.textContent).toContain("（準備中）");
    });
  });

  it("実装済みルート（Migraine/CEH/ONB/CPB/anatomy/prom-checker）は通常リンクで描画される", () => {
    const { container } = render(<SiteHeader pathname="/" />);
    const hrefs = Array.from(container.querySelectorAll<HTMLAnchorElement>("a[href]")).map((a) =>
      a.getAttribute("href")
    );
    expect(hrefs).toContain("/headaches/migraine");
    expect(hrefs).toContain("/headaches/cervicogenic-headache");
    expect(hrefs).toContain("/blocks/occipital-nerve-block");
    expect(hrefs).toContain("/blocks/cervical-plexus-block");
    expect(hrefs).toContain("/anatomy");
    expect(hrefs).toContain("/prom-checker");
  });
});

describe("SiteHeader - active 判定", () => {
  it("marks the matching leaf link with ch-active and aria-current=page", () => {
    const { container } = render(<SiteHeader pathname="/anatomy" />);
    const active = container.querySelector("a.ch-active");
    expect(active).not.toBeNull();
    expect(active?.getAttribute("href")).toBe("/anatomy");
    expect(active?.getAttribute("aria-current")).toBe("page");
  });

  it("propagates ch-active to the parent dropdown toggle when a child is active", () => {
    const { container } = render(<SiteHeader pathname="/blocks/occipital-nerve-block" />);
    const toggles = container.querySelectorAll("li.ch-dropdown .ch-dropdown-toggle");
    const activeToggles = Array.from(toggles).filter((t) => t.className.includes("ch-active"));
    expect(activeToggles.length).toBe(1);
    expect(activeToggles[0]?.textContent).toContain("Blocks");
  });

  it("does not add ch-active to any link when pathname is unrecognized", () => {
    const { container } = render(<SiteHeader pathname="/not-a-real-page" />);
    expect(container.querySelector("a.ch-active")).toBeNull();
  });
});

describe("SiteHeader - 静的ソース安全性", () => {
  it("source file does not use React unsafe HTML injection API", () => {
    const source = readFileSync(join(__dirname, "SiteHeader.tsx"), "utf8");
    const unsafeApiName = ["danger", "ously", "Set", "Inner", "HTML"].join("");
    expect(source).not.toContain(unsafeApiName);
  });

  it("declares 'use client' on the first effective line (usePathname requires Client)", () => {
    const source = readFileSync(join(__dirname, "SiteHeader.tsx"), "utf8");
    const firstStmt = source.replace(/^\s*(\/\/[^\n]*\n|\/\*[\s\S]*?\*\/\s*\n?)*/g, "");
    expect(firstStmt).toMatch(/^["']use client["']/);
  });
});
