/**
 * ローカル専用オーバーレイの読み込み（I/O 層）。
 *
 * 二重ゲート:
 *   1. オーバーレイ JSON が存在しない → 公開リポジトリ・CI デプロイでは常に不在（.gitignore 済み）
 *   2. 本番モード（NODE_ENV=production）→ 読み込み処理そのものを実行しない
 * どちらか一方でも成立すれば、権利者所有の質問文はレンダリングされない。
 *
 * 純粋関数（パース・マージ）は restricted.ts 側にある。
 */
import { parseRestrictedOverlay, type RestrictedOverlay } from "./restricted";

/** オーバーレイの公開パス（存在しないのが既定＝正常系）。 */
export const OVERLAY_PATH = "/prom-restricted.local.json";

/** ローカル開発時のみオーバーレイを読み込む。 */
export const isOverlayEnabled = (): boolean => process.env.NODE_ENV !== "production";

/**
 * ブラウザからオーバーレイを取得する。
 * 不在（404）・パース失敗・ネットワークエラーはすべて null を返し、
 * 呼び出し側はレジストリのプレースホルダ表示へフォールバックする。
 */
export async function fetchRestrictedOverlay(): Promise<RestrictedOverlay | null> {
  if (!isOverlayEnabled()) return null;

  try {
    const res = await fetch(OVERLAY_PATH, { cache: "no-store" });
    if (!res.ok) return null; // 未配置（404）が既定の正常系
    const parsed = parseRestrictedOverlay(await res.json());
    if (!parsed.ok) {
      // 壊れたオーバーレイは黙殺せず開発者へ知らせる（ローカル環境限定の警告）。
      console.warn(`[prom] オーバーレイを無視しました: ${parsed.error}`);
      return null;
    }
    return parsed.value;
  } catch {
    return null;
  }
}
