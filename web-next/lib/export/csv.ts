/**
 * CSV エクスポータ（設計書 第 7 章）。
 * toCsv は RFC 4180 準拠の純粋シリアライザ。CsvExporter は各タブをブラウザで
 * 個別 CSV としてダウンロードする（生成は純粋 / ダウンロードのみ I/O）。
 */
import { todayISO } from "@/components/prom/state";
import { err, ok, type Result } from "@/lib/prom/types";
import type {
  Cell,
  ExportContext,
  ExportOutcome,
  ExportWorkbook,
  ReportExporter,
  SheetTable,
} from "./types";

/** Excel の文字化け回避のため先頭付与する UTF-8 BOM（U+FEFF）。 */
export const CSV_BOM = "﻿";

const NEEDS_QUOTE = /[",\r\n]/;

/** 1 セルを RFC 4180 に従い文字列化・エスケープする。 */
function escapeCell(value: Cell): string {
  if (value === null) return "";
  if (typeof value !== "string") return String(value);
  if (!NEEDS_QUOTE.test(value)) return value;
  return `"${value.replace(/"/g, '""')}"`;
}

/**
 * Serializes a sheet table to an RFC 4180 CSV string (header row + data rows, CRLF-separated).
 *
 * @param table - The table whose columns and rows are serialized.
 * @returns The CSV text without a BOM.
 */
export function toCsv(table: SheetTable): string {
  const header = table.columns.map((c) => escapeCell(c.header)).join(",");
  const body = table.rows.map((row) => row.map(escapeCell).join(","));
  return [header, ...body].join("\r\n");
}

const messageOf = (e: unknown): string => (e instanceof Error ? e.message : String(e));

/** 各タブを個別 CSV ファイルとしてダウンロードするエクスポータ。 */
export class CsvExporter implements ReportExporter {
  readonly id = "csv" as const;
  readonly label = "CSV ダウンロード";
  readonly available: boolean = typeof window !== "undefined";

  export(workbook: ExportWorkbook, ctx: ExportContext): Promise<Result<ExportOutcome>> {
    if (!this.available) {
      return Promise.resolve(err("CSV ダウンロードはブラウザでのみ利用できます"));
    }
    try {
      const rowCounts: Record<string, number> = {};
      for (const table of workbook.tables) {
        downloadCsv(`headache-${table.name}-${todayISO()}.csv`, CSV_BOM + toCsv(table));
        rowCounts[table.name] = table.rows.length;
      }
      return Promise.resolve(
        ok({
          target: this.id,
          detail: `${workbook.tables.length} タブを CSV でダウンロードしました`,
          syncedAt: ctx.now().toISOString(),
          rowCounts,
        })
      );
    } catch (e) {
      return Promise.resolve(err(`CSV の書き出しに失敗しました: ${messageOf(e)}`));
    }
  }
}

/** Blob をアンカー経由でダウンロードする（DataManager.onExport のパターンを流用）。 */
function downloadCsv(filename: string, content: string): void {
  const blob = new Blob([content], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
