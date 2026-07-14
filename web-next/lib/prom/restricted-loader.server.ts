/**
 * ローカル専用オーバーレイのサーバ側読み込み（Server Component / 静的教育ページ用）。
 *
 * ブラウザ側の restricted-loader.ts と同じ二重ゲートを適用する:
 *   1. オーバーレイ JSON が存在しない（.gitignore 済み → 公開デプロイには同梱されない）
 *   2. 本番モード（NODE_ENV=production）では読み込まない
 */
import { readFile } from "node:fs/promises";
import path from "node:path";
import { parseRestrictedOverlay, type RestrictedOverlay } from "./restricted";
import { isOverlayEnabled } from "./restricted-loader";

/**
 * public/prom-restricted.local.json をファイルシステムから読む。
 * 不在・パース失敗はすべて null（＝プレースホルダ表示へフォールバック）。
 */
export async function loadRestrictedOverlay(): Promise<RestrictedOverlay | null> {
  if (!isOverlayEnabled()) return null;

  try {
    const file = path.join(process.cwd(), "public", "prom-restricted.local.json");
    const parsed = parseRestrictedOverlay(JSON.parse(await readFile(file, "utf8")));
    if (!parsed.ok) {
      console.warn(`[prom] オーバーレイを無視しました: ${parsed.error}`);
      return null;
    }
    return parsed.value;
  } catch {
    return null; // 未配置が既定の正常系
  }
}
