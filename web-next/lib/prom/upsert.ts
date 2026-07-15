/**
 * 1日1データ化のための純粋 upsert ヘルパー（DOM/Storage 非依存）。
 * 日誌は日付単位、PROM スコアは (日付, 指標) 単位で「同キーは置換・無ければ追加」する。
 * 存在判定は保存前の確認ダイアログで再利用する（ロジックの二重化を避ける）。
 */
import type { DiaryEntry, ScoreRecord } from "./types";

/** 同一日付の日誌が既に存在するか。 */
export function hasDiaryForDate(entries: DiaryEntry[], date: string): boolean {
  return entries.some((e) => e.date === date);
}

/**
 * 日誌を日付単位で upsert する。同一 `date` があれば位置を保って置換、無ければ末尾追加。
 *
 * @returns 新しい配列（入力は破壊しない）。
 */
export function upsertDiaryByDate(entries: DiaryEntry[], entry: DiaryEntry): DiaryEntry[] {
  const idx = entries.findIndex((e) => e.date === entry.date);
  if (idx < 0) return [...entries, entry];
  const next = entries.slice();
  next[idx] = entry;
  return next;
}

/** 同一 (日付, 指標) のスコアが既に存在するか。 */
export function hasScoreForDateInstrument(
  records: ScoreRecord[],
  date: string,
  instrumentId: string
): boolean {
  return records.some((r) => r.date === date && r.instrumentId === instrumentId);
}

/**
 * スコアを (日付, 指標) 単位で upsert する。同キーがあれば置換、無ければ末尾追加。
 * 別指標は同日でも共存する。
 *
 * @returns 新しい配列（入力は破壊しない）。
 */
export function upsertScoreByDateInstrument(
  records: ScoreRecord[],
  record: ScoreRecord
): ScoreRecord[] {
  const idx = records.findIndex(
    (r) => r.date === record.date && r.instrumentId === record.instrumentId
  );
  if (idx < 0) return [...records, record];
  const next = records.slice();
  next[idx] = record;
  return next;
}
