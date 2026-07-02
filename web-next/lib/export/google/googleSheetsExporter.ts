/**
 * Google Sheets 同期エクスポータ（設計書 第 6.5 章）。
 * 差分計算 computeUpsert は純粋関数として分離し単体テストする。
 * export はキー列の実位置を A1 列文字へ換算して読み取り、更新＋追加の upsert を行う。
 */
import { err, ok, type Result } from "@/lib/prom/types";
import type {
  Cell,
  ExportContext,
  ExportOutcome,
  ExportWorkbook,
  ReportExporter,
  SheetTable,
} from "../types";
import { SheetsClient } from "./sheetsClient";

export interface UpsertPlan {
  /** 0-based（ヘッダ除く）データ行の更新。 */
  updates: { dataRowIndex: number; values: Cell[] }[];
  /** 末尾へ追加する行。 */
  appends: Cell[][];
}

/**
 * Computes the upsert plan for a set of rows against the keys already present in a sheet.
 *
 * @param existingKeys - Current key-column values (header excluded, top→bottom).
 * @param rows - New rows to upsert.
 * @param keyColIndex - Position of the key column within each row.
 * @returns Updates (matched by key) and appends (new keys).
 */
export function computeUpsert(
  existingKeys: string[],
  rows: Cell[][],
  keyColIndex: number
): UpsertPlan {
  const indexByKey = new Map<string, number>();
  existingKeys.forEach((k, i) => {
    indexByKey.set(k, i);
  });
  const updates: UpsertPlan["updates"] = [];
  const appends: Cell[][] = [];
  for (const row of rows) {
    const key = String(row[keyColIndex]);
    const found = indexByKey.get(key);
    if (found === undefined) {
      appends.push(row); // 早期継続でネスト削減
      continue;
    }
    updates.push({ dataRowIndex: found, values: row });
  }
  return { updates, appends };
}

/**
 * Converts a 0-based column index to an A1 column letter (0→A, 25→Z, 26→AA).
 *
 * @param index - The 0-based column index.
 * @returns The A1-notation column letters.
 */
export function colLetter(index: number): string {
  let n = index;
  let s = "";
  do {
    s = String.fromCharCode(65 + (n % 26)) + s;
    n = Math.floor(n / 26) - 1;
  } while (n >= 0);
  return s;
}

const DRIVE_URL = "https://docs.google.com/spreadsheets/d/";
const SPREADSHEET_TITLE = "頭痛記録（PROM / 頭痛日誌）";

/** アプリが作成した 1 枚のスプレッドシートへ手動・一方向 upsert するエクスポータ。 */
export class GoogleSheetsExporter implements ReportExporter {
  readonly id = "google-sheets" as const;
  readonly label = "Google スプレッドシートへ同期";
  readonly available: boolean = typeof window !== "undefined";

  async export(workbook: ExportWorkbook, ctx: ExportContext): Promise<Result<ExportOutcome>> {
    const g = ctx.google;
    if (!g?.accessToken) return err("Google に接続してください（アクセストークンがありません）");
    const client = new SheetsClient({
      accessToken: g.accessToken,
      // ネイティブ fetch は this===globalThis を要求するため bind する。
      // 裸の参照のまま SheetsClient のメソッドとして呼ぶと Illegal invocation になる。
      fetchImpl: ctx.fetchImpl ?? fetch.bind(globalThis),
    });

    let spreadsheetId = g.spreadsheetId;
    if (!spreadsheetId) {
      const created = await this.createWithHeaders(client, workbook);
      if (!created.ok) return created;
      spreadsheetId = created.value;
      if (g.onSpreadsheetCreated) await g.onSpreadsheetCreated(spreadsheetId);
    }

    const rowCounts: Record<string, number> = {};
    for (const table of workbook.tables) {
      const synced = await syncTable(client, spreadsheetId, table);
      if (!synced.ok) return synced;
      rowCounts[table.name] = table.rows.length;
    }

    return ok({
      target: this.id,
      detail: `${workbook.tables.length} タブを同期しました`,
      resourceUrl: `${DRIVE_URL}${spreadsheetId}`,
      syncedAt: ctx.now().toISOString(),
      rowCounts,
    });
  }

  /** 新規スプレッドシートを作成し、各タブへヘッダ行を書き込んで spreadsheetId を返す。 */
  private async createWithHeaders(
    client: SheetsClient,
    workbook: ExportWorkbook
  ): Promise<Result<string>> {
    const created = await client.createSpreadsheet(
      SPREADSHEET_TITLE,
      workbook.tables.map((t) => t.name)
    );
    if (!created.ok) return created;
    const id = created.value.spreadsheetId;
    for (const table of workbook.tables) {
      const headers: Cell[] = table.columns.map((c) => c.header);
      const res = await client.appendValues(id, `'${table.name}'!A1`, [headers]);
      if (!res.ok) return res;
    }
    return ok(id);
  }
}

/** 1 タブ分を getValues → computeUpsert → batchUpdate/append で同期する。 */
async function syncTable(
  client: SheetsClient,
  id: string,
  table: SheetTable
): Promise<Result<void>> {
  const keyColIndex = table.columns.findIndex((c) => c.key === table.keyColumnKey);
  if (keyColIndex < 0) return err(`キー列が見つかりません: ${table.keyColumnKey}`);
  const keyCol = colLetter(keyColIndex);
  const lastCol = colLetter(table.columns.length - 1);

  const existing = await client.getValues(id, `'${table.name}'!${keyCol}2:${keyCol}`);
  if (!existing.ok) return existing;
  const existingKeys = existing.value.map((r) => r[0] ?? "");

  const plan = computeUpsert(existingKeys, table.rows, keyColIndex);

  if (plan.updates.length > 0) {
    const data = plan.updates.map((u) => ({
      range: `'${table.name}'!A${u.dataRowIndex + 2}:${lastCol}${u.dataRowIndex + 2}`,
      values: [u.values],
    }));
    const res = await client.batchUpdateValues(id, data);
    if (!res.ok) return res;
  }
  if (plan.appends.length > 0) {
    const res = await client.appendValues(id, `'${table.name}'!A:A`, plan.appends);
    if (!res.ok) return res;
  }
  return ok(undefined);
}
