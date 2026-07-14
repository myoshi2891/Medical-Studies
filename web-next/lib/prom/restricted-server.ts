/**
 * ローカル専用オーバーレイの読み込み（サーバ側 I/O）。
 *
 * Server Component（静的教育ページ）から使う。ブラウザ側の fetch 版は restricted-loader.ts。
 * 二重ゲートは共通:
 *   1. オーバーレイ JSON が存在しない → 公開リポジトリ・CI では常に不在（.gitignore 済み）
 *   2. 本番モード（NODE_ENV=production）→ 読み込み処理そのものを実行しない
 */
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { parseRestrictedOverlay, type RestrictedOverlay } from "./restricted";
import { isOverlayEnabled } from "./restricted-loader";

/** オーバーレイの実ファイル位置（web-next/public 配下）。 */
export const OVERLAY_FILE = join(process.cwd(), "public", "prom-restricted.local.json");

/**
 * オーバーレイをファイルから読む。不在・パース失敗・本番モードはすべて null。
 * null のとき呼び出し側は「非掲載」表示へフォールバックする。
 */
export function readRestrictedOverlay(): RestrictedOverlay | null {
  if (!isOverlayEnabled()) return null;

  try {
    const parsed = parseRestrictedOverlay(JSON.parse(readFileSync(OVERLAY_FILE, "utf8")));
    return parsed.ok ? parsed.value : null;
  } catch {
    return null; // 未配置（ENOENT）が既定の正常系
  }
}
