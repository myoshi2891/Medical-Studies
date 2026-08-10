/**
 * サイトマップ（plans/007 拡張項目 D）。
 *
 * URL の一覧は `lib/content/registry.ts` から機械生成する。手書きの列挙を持たないため、
 * 「レジストリに登録すれば載る／登録し忘れれば載らない」という単一の因果に閉じる
 * （登録漏れ自体は `lib/content/registry.test.ts` が実ルート走査で検知する）。
 */

import type { MetadataRoute } from "next";
import { CONTENT_REGISTRY } from "@/lib/content/registry";

/**
 * レジストリ管理外だがサイトマップには載せるルート。
 * コンテンツページではないため `lastReviewed`（鮮度メタ）を持たない。
 */
export const STATIC_ROUTES: readonly string[] = ["/", "/prom-checker", "/privacy", "/terms"];

/** ベース URL 未設定時のフォールバック（本番は NEXT_PUBLIC_SITE_URL で上書きする）。 */
const FALLBACK_BASE_URL = "https://example.com";

/** 末尾スラッシュを除いたベース URL を返す（`${base}${href}` で二重スラッシュを避ける）。 */
function resolveBaseUrl(): string {
  const configured = process.env.NEXT_PUBLIC_SITE_URL ?? "";
  const base = configured.length > 0 ? configured : FALLBACK_BASE_URL;
  return base.replace(/\/+$/, "");
}

/**
 * コンテンツレジストリと静的ルートからサイトマップを生成する。
 *
 * @returns Next.js メタデータルート用のサイトマップエントリ。
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const base = resolveBaseUrl();

  const contentEntries: MetadataRoute.Sitemap = CONTENT_REGISTRY.map((entry) => ({
    url: `${base}${entry.href}`,
    lastModified: new Date(entry.lastReviewed),
  }));

  // 静的ルートは鮮度メタを持たないため lastModified を付けない。
  // "/" は `${base}/` になると重複 URL を生むため base 単体にする。
  const staticEntries: MetadataRoute.Sitemap = STATIC_ROUTES.map((route) => ({
    url: route === "/" ? base : `${base}${route}`,
  }));

  return [...staticEntries, ...contentEntries];
}
