/**
 * 純粋ビルダー。ExportPayload を出力先非依存の ExportWorkbook（中間表現）へ変換する（設計書 第 4.4 章）。
 * 平坦化は flatten.ts の *Columns / *Row を対で用い、列順を決定論的に保つ。
 * 時刻は注入可能（テスト容易性）。
 */
import { SCHEMA_VERSION } from "@/lib/prom/storage";
import type { ExportPayload } from "@/lib/prom/types";
import { diaryColumns, diaryRow, scoreColumns, scoreRow } from "./flatten";
import type { ExportWorkbook } from "./types";

/**
 * Builds the export workbook (intermediate representation) from an export payload.
 *
 * @param payload - The persisted diary/score payload from `store.exportAll()`.
 * @param opts - Optional injected clock for deterministic `meta.builtAt`.
 * @returns A workbook with a 頭痛日誌 tab and a PROMスコア tab.
 */
export function buildWorkbook(payload: ExportPayload, opts?: { now?: () => Date }): ExportWorkbook {
  const now = opts?.now ?? (() => new Date());
  return {
    meta: { schemaVersion: SCHEMA_VERSION, builtAt: now().toISOString() },
    tables: [
      {
        name: "頭痛日誌",
        columns: diaryColumns,
        rows: payload.diary.map(diaryRow),
        // 1日1データのため日付をキーに。再同期で同日行が増えず更新される。
        keyColumnKey: "date",
      },
      {
        name: "PROMスコア",
        columns: scoreColumns,
        rows: payload.promScores.map(scoreRow),
        keyColumnKey: "recordKey",
      },
    ],
  };
}
