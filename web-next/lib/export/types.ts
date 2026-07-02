/**
 * 外部エクスポート抽象の型定義（設計書 第 4.2 章）。
 * 永続化（StorageAdapter）とは別レイヤとして、出力先非依存の中間表現と
 * エクスポータ契約を宣言する。純粋コア（workbook/flatten）はこの型のみに依存する。
 */
import type { Result } from "@/lib/prom/types";

/** セル値。医療値は数値・文字列・真偽・空のみ（オブジェクトは平坦化済み前提）。 */
export type Cell = string | number | boolean | null;

/** 列定義。key は安定した機械キー、header は日本語表示見出し。 */
export interface ColumnDef {
  key: string;
  header: string;
}

/** 1 タブ分の表。rows は columns と同順。keyColumnKey が upsert のキー列。 */
export interface SheetTable {
  name: string;
  columns: ColumnDef[];
  rows: Cell[][];
  keyColumnKey: string;
}

/** 出力先非依存のワークブック（中間表現）。 */
export interface ExportWorkbook {
  meta: { schemaVersion: string; builtAt: string };
  tables: SheetTable[];
}

export type ExporterId = "google-sheets" | "csv" | "xlsx" | "fhir";

/** エクスポート結果（人間可読メッセージと成果物 URL・行数）。 */
export interface ExportOutcome {
  target: ExporterId;
  detail: string;
  resourceUrl?: string;
  syncedAt: string;
  rowCounts: Record<string, number>;
}

/** I/O を注入する実行コンテキスト（テスト容易性と純粋境界の確保）。 */
export interface ExportContext {
  now: () => Date;
  fetchImpl?: typeof fetch;
  google?: {
    accessToken: string;
    spreadsheetId?: string;
    /** 新規作成した spreadsheetId を設定へ保存するコールバック。 */
    onSpreadsheetCreated?: (id: string) => Promise<void>;
  };
}

/** すべての出力先が満たす契約。 */
export interface ReportExporter {
  readonly id: ExporterId;
  readonly label: string;
  /** 実行環境で利用可能か（例: window/GIS の有無）。false ならボタンを無効化。 */
  readonly available: boolean;
  export(workbook: ExportWorkbook, ctx: ExportContext): Promise<Result<ExportOutcome>>;
}
