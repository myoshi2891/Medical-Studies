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

/** 本番ビルドで拒否するローカル専用ホスト名（開発既定値の本番混入を防ぐ）。 */
const LOCAL_HOSTNAMES = new Set(["localhost", "127.0.0.1", "[::1]", "0.0.0.0"]);

/**
 * Resolves the configured site URL into a normalized base URL for absolute sitemap links.
 *
 * @returns The origin and pathname without trailing slashes.
 * @throws Error if `NEXT_PUBLIC_SITE_URL` is missing, invalid, uses a protocol other than HTTP(S), contains a query or fragment, or violates production URL requirements.
 */
function resolveBaseUrl(): string {
  const configured = process.env.NEXT_PUBLIC_SITE_URL ?? "";
  if (configured.length === 0) {
    throw new Error("NEXT_PUBLIC_SITE_URL is not set: サイトマップの絶対 URL を生成できません。");
  }

  let parsed: URL;
  try {
    parsed = new URL(configured);
  } catch {
    throw new Error(`NEXT_PUBLIC_SITE_URL is not a valid URL: ${configured}`);
  }
  if (parsed.protocol !== "http:" && parsed.protocol !== "https:") {
    throw new Error(`NEXT_PUBLIC_SITE_URL must use http or https: ${configured}`);
  }
  if (parsed.search.length > 0 || parsed.hash.length > 0) {
    throw new Error(`NEXT_PUBLIC_SITE_URL must not contain a query or fragment: ${configured}`);
  }
  // 開発既定値のまま本番ビルドすると、検索エンジンへ到達不能な URL を宣言し続ける。
  // 本番ビルドでのみ localhost / 平文 http を設定漏れとして失敗させる（fail-closed）。
  if (process.env.NODE_ENV === "production") {
    if (parsed.protocol !== "https:") {
      throw new Error(`NEXT_PUBLIC_SITE_URL must use https in production: ${configured}`);
    }
    if (LOCAL_HOSTNAMES.has(parsed.hostname)) {
      throw new Error(`NEXT_PUBLIC_SITE_URL must not be a local host in production: ${configured}`);
    }
  }

  return `${parsed.origin}${parsed.pathname}`.replace(/\/+$/, "");
}

/**
 * Generates a sitemap from the content registry and static routes.
 *
 * @returns Sitemap entries for Next.js metadata routes
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
