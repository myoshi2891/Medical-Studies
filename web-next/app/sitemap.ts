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
 * 末尾スラッシュを除いたベース URL を返す（`${base}${href}` で二重スラッシュを避ける）。
 *
 * サイトマップは検索エンジンに正規 URL を宣言する成果物であり、既定値へ黙って落とすと
 * 誤ったオリジンを配信し続ける。未設定・不正・http(s) 以外は設定エラーとして失敗させる。
 *
 * クエリ・フラグメントはサイトマップの正規 URL に意味を持たず、`${base}${href}` へ連結すると
 * `https://example.test?x=1/privacy` のような壊れた URL を生む。設定ミスとして失敗させる。
 *
 * 戻り値は `origin + pathname`（末尾スラッシュ除去）に正規化する。設定値を素通しすると
 * 大文字ホスト名や既定ポート（`https://Example.test:443`）の表記揺れがそのまま出力に漏れる。
 *
 * @throws {Error} NEXT_PUBLIC_SITE_URL が未設定、URL として不正、http/https 以外、
 *   またはクエリ・フラグメントを含む場合。
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
