/**
 * Google Sheets REST クライアント（設計書 第 6.4 章）。
 * fetch を注入可能にし、レスポンスは型ガードで検証する（外部入力バリデーション）。
 * 全メソッドは Result を返し、HTTP 非 2xx・ネットワーク不通はエラーへ変換する（握りつぶさない）。
 */
import { err, ok, type Result } from "@/lib/prom/types";
import type { Cell } from "../types";

const BASE = "https://sheets.googleapis.com/v4/spreadsheets";

const isObject = (v: unknown): v is Record<string, unknown> => typeof v === "object" && v !== null;
const isStringValue = (v: unknown): v is string => typeof v === "string";
const isStringMatrix = (v: unknown): v is string[][] =>
  Array.isArray(v) && v.every((row) => Array.isArray(row) && row.every(isStringValue));
const messageOf = (e: unknown): string => (e instanceof Error ? e.message : String(e));

async function safeText(res: Response): Promise<string> {
  try {
    return await res.text();
  } catch {
    return "";
  }
}

export interface SheetsClientDeps {
  accessToken: string;
  fetchImpl: typeof fetch;
}

/** batchUpdate 用の 1 レンジ分の更新データ。 */
export interface BatchUpdateData {
  range: string;
  values: Cell[][];
}

/** Sheets v4 の最小クライアント（createSpreadsheet / getValues / batchUpdate / append）。 */
export class SheetsClient {
  private readonly token: string;
  private readonly fetchImpl: typeof fetch;

  constructor(deps: SheetsClientDeps) {
    this.token = deps.accessToken;
    this.fetchImpl = deps.fetchImpl;
  }

  async createSpreadsheet(
    title: string,
    tabTitles: string[]
  ): Promise<Result<{ spreadsheetId: string }>> {
    const body = {
      properties: { title },
      sheets: tabTitles.map((t) => ({ properties: { title: t } })),
    };
    const res = await this.request("POST", BASE, body);
    if (!res.ok) return res;
    const json = res.value;
    if (!isObject(json) || !isStringValue(json.spreadsheetId)) {
      return err("スプレッドシート作成の応答が不正です");
    }
    return ok({ spreadsheetId: json.spreadsheetId });
  }

  async getValues(id: string, range: string): Promise<Result<string[][]>> {
    const url = `${BASE}/${encodeURIComponent(id)}/values/${encodeURIComponent(range)}`;
    const res = await this.request("GET", url);
    if (!res.ok) return res;
    const json = res.value;
    if (!isObject(json)) return err("値取得の応答が不正です");
    if (json.values === undefined) return ok([]);
    if (!isStringMatrix(json.values)) return err("値の形式が不正です");
    return ok(json.values);
  }

  async batchUpdateValues(id: string, data: BatchUpdateData[]): Promise<Result<void>> {
    const url = `${BASE}/${encodeURIComponent(id)}/values:batchUpdate`;
    const res = await this.request("POST", url, { valueInputOption: "RAW", data });
    if (!res.ok) return res;
    return ok(undefined);
  }

  async appendValues(id: string, range: string, values: Cell[][]): Promise<Result<void>> {
    const url = `${BASE}/${encodeURIComponent(id)}/values/${encodeURIComponent(
      range
    )}:append?valueInputOption=RAW`;
    const res = await this.request("POST", url, { values });
    if (!res.ok) return res;
    return ok(undefined);
  }

  private async request(method: string, url: string, body?: unknown): Promise<Result<unknown>> {
    try {
      const res = await this.fetchImpl(url, {
        method,
        headers: {
          Authorization: `Bearer ${this.token}`,
          "Content-Type": "application/json",
        },
        body: body === undefined ? undefined : JSON.stringify(body),
      });
      if (!res.ok) {
        return err(`Google API エラー（HTTP ${res.status}）: ${await safeText(res)}`);
      }
      const json: unknown = await res.json();
      return ok(json);
    } catch (e) {
      return err(`ネットワークエラー: ${messageOf(e)}`);
    }
  }
}
