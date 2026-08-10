/**
 * サイトマップの契約テスト（plans/007 拡張項目 D）。
 *
 * サイトマップはコンテンツレジストリから機械生成する。レジストリに登録すれば
 * 自動で載る／登録し忘れれば載らない、という単一の因果に閉じることを検証する。
 */

import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { CONTENT_REGISTRY } from "@/lib/content/registry";
import sitemap, { STATIC_ROUTES } from "./sitemap";

const ORIGINAL_BASE_URL = process.env.NEXT_PUBLIC_SITE_URL;

beforeEach(() => {
  process.env.NEXT_PUBLIC_SITE_URL = "https://example.test";
});

afterEach(() => {
  if (ORIGINAL_BASE_URL === undefined) {
    delete process.env.NEXT_PUBLIC_SITE_URL;
    return;
  }
  process.env.NEXT_PUBLIC_SITE_URL = ORIGINAL_BASE_URL;
});

describe("sitemap", () => {
  it("レジストリ件数 + 静的ルート件数と一致する", () => {
    expect(sitemap()).toHaveLength(CONTENT_REGISTRY.length + STATIC_ROUTES.length);
  });

  it("全コンテンツルートを含む", () => {
    const urls = new Set(sitemap().map((e) => e.url));
    for (const entry of CONTENT_REGISTRY) {
      expect(urls.has(`https://example.test${entry.href}`), `missing: ${entry.href}`).toBe(true);
    }
  });

  it("静的ルート（トップ・法務・PROM チェッカー）を含む", () => {
    const urls = new Set(sitemap().map((e) => e.url));
    for (const route of STATIC_ROUTES) {
      const expected = route === "/" ? "https://example.test" : `https://example.test${route}`;
      expect(urls.has(expected), `missing: ${route}`).toBe(true);
    }
  });

  it("コンテンツルートの lastModified が lastReviewed に対応する", () => {
    const byUrl = new Map(sitemap().map((e) => [e.url, e]));
    for (const entry of CONTENT_REGISTRY) {
      const found = byUrl.get(`https://example.test${entry.href}`);
      expect(found?.lastModified).toEqual(new Date(entry.lastReviewed));
    }
  });

  it("URL が一意である", () => {
    const entries = sitemap();
    expect(new Set(entries.map((e) => e.url)).size).toBe(entries.length);
  });

  it("全 URL が絶対 URL である（相対パスの混入なし）", () => {
    for (const entry of sitemap()) {
      expect(() => new URL(entry.url)).not.toThrow();
      expect(entry.url.startsWith("https://example.test")).toBe(true);
    }
  });

  it("末尾スラッシュ付きのベース URL でも URL が重複しない", () => {
    process.env.NEXT_PUBLIC_SITE_URL = "https://example.test/";
    for (const entry of sitemap()) {
      expect(entry.url).not.toContain("//prom");
      expect(entry.url.endsWith("/")).toBe(false);
    }
  });

  it("ベース URL 未設定は設定エラーとして失敗する（誤オリジンへのフォールバックなし）", () => {
    delete process.env.NEXT_PUBLIC_SITE_URL;
    expect(() => sitemap()).toThrow(/NEXT_PUBLIC_SITE_URL is not set/);
  });

  it("URL として不正なベース URL を拒否する", () => {
    process.env.NEXT_PUBLIC_SITE_URL = "example.test";
    expect(() => sitemap()).toThrow(/not a valid URL/);
  });

  it("http / https 以外のスキームを拒否する", () => {
    process.env.NEXT_PUBLIC_SITE_URL = "ftp://example.test";
    expect(() => sitemap()).toThrow(/must use http or https/);
  });
});
