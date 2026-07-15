/**
 * 日時整形（純粋関数）。記録時刻（ISO UTC）を日本時間の人間可読表記へ変換する。
 * ICU / ロケール非依存にするため、固定 +9h オフセット後に getUTC* で組み立てる（決定論的）。
 */

const JST_OFFSET_MS = 9 * 60 * 60 * 1000;

const pad2 = (n: number): string => String(n).padStart(2, "0");

/**
 * ISO 日時文字列を日本時間の `yyyy/MM/dd HH:mm` へ整形する。
 *
 * @param iso - `new Date().toISOString()` などの ISO 8601 文字列。
 * @returns JST 表記の文字列。解析不能な入力はそのまま返す（情報を握りつぶさない）。
 */
export function formatCreatedAtJst(iso: string): string {
  const t = Date.parse(iso);
  if (Number.isNaN(t)) return iso;
  const jst = new Date(t + JST_OFFSET_MS);
  const y = jst.getUTCFullYear();
  const mo = pad2(jst.getUTCMonth() + 1);
  const d = pad2(jst.getUTCDate());
  const h = pad2(jst.getUTCHours());
  const mi = pad2(jst.getUTCMinutes());
  return `${y}/${mo}/${d} ${h}:${mi}`;
}
