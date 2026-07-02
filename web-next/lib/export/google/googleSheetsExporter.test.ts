import { describe, expect, it, vi } from "vitest";
import type { Cell, ExportContext, ExportWorkbook } from "../types";
import { computeUpsert, GoogleSheetsExporter } from "./googleSheetsExporter";

/**
 * upsert 差分計算（純粋）と GoogleSheetsExporter.export の契約テスト（設計書 第 6.5 章）。
 * fetch を注入し、追加のみ・更新のみ・混在・作成分岐（onSpreadsheetCreated）を検証する。
 */

/** キー列を末尾（index 1）に持つ 2 列 1 タブのワークブックを作る。 */
function singleTabWorkbook(rows: Cell[][]): ExportWorkbook {
  return {
    meta: { schemaVersion: "1.0", builtAt: "2026-07-02T00:00:00.000Z" },
    tables: [
      {
        name: "頭痛日誌",
        columns: [
          { key: "date", header: "日付" },
          { key: "id", header: "記録ID（キー）" },
        ],
        rows,
        keyColumnKey: "id",
      },
    ],
  };
}

function jsonResponse(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json" },
  });
}

/** メソッド + URL の特徴で応答を振り分ける fetch モック。 */
function routeFetch(opts: { createId?: string; existing?: string[][] }): typeof fetch {
  return vi.fn(async (input: RequestInfo | URL, init?: RequestInit) => {
    const url = String(input);
    const method = init?.method ?? "GET";
    if (method === "POST" && /\/v4\/spreadsheets$/.test(url)) {
      return jsonResponse({ spreadsheetId: opts.createId ?? "newid" });
    }
    if (method === "GET" && url.includes("/values/")) {
      return jsonResponse({ values: opts.existing ?? [] });
    }
    if (method === "POST" && url.includes(":batchUpdate")) {
      return jsonResponse({ totalUpdatedCells: 1 });
    }
    if (method === "POST" && url.includes(":append")) {
      return jsonResponse({ updates: { updatedRows: 1 } });
    }
    return jsonResponse({ error: "unrouted" }, 404);
  }) as unknown as typeof fetch;
}

describe("computeUpsert", () => {
  it("既存キーが無ければすべて append", () => {
    const plan = computeUpsert([], [["2026-07-01", "diary_1"]], 1);
    expect(plan.updates).toHaveLength(0);
    expect(plan.appends).toEqual([["2026-07-01", "diary_1"]]);
  });

  it("既存キーに一致すれば update（0-based の dataRowIndex）", () => {
    const plan = computeUpsert(["diary_1", "diary_2"], [["x", "diary_2"]], 1);
    expect(plan.appends).toHaveLength(0);
    expect(plan.updates).toEqual([{ dataRowIndex: 1, values: ["x", "diary_2"] }]);
  });

  it("更新と追加が混在する", () => {
    const plan = computeUpsert(
      ["diary_1"],
      [
        ["a", "diary_1"],
        ["b", "diary_9"],
      ],
      1
    );
    expect(plan.updates).toEqual([{ dataRowIndex: 0, values: ["a", "diary_1"] }]);
    expect(plan.appends).toEqual([["b", "diary_9"]]);
  });
});

describe("GoogleSheetsExporter.export", () => {
  it("アクセストークンが無ければ Result エラー", async () => {
    const ctx: ExportContext = { now: () => new Date("2026-07-02T00:00:00.000Z") };
    const res = await new GoogleSheetsExporter().export(singleTabWorkbook([]), ctx);
    expect(res.ok).toBe(false);
  });

  it("作成分岐: spreadsheetId 未保持なら作成し onSpreadsheetCreated を呼ぶ", async () => {
    // Arrange
    const onCreated = vi.fn(async (): Promise<void> => undefined);
    const ctx: ExportContext = {
      now: () => new Date("2026-07-02T00:00:00.000Z"),
      fetchImpl: routeFetch({ createId: "created-1", existing: [] }),
      google: { accessToken: "tok", onSpreadsheetCreated: onCreated },
    };
    // Act
    const res = await new GoogleSheetsExporter().export(
      singleTabWorkbook([["2026-07-01", "diary_1"]]),
      ctx
    );
    // Assert
    expect(res.ok).toBe(true);
    expect(onCreated).toHaveBeenCalledWith("created-1");
    if (res.ok) {
      expect(res.value.resourceUrl).toContain("created-1");
      expect(res.value.rowCounts.頭痛日誌).toBe(1);
    }
  });

  it("既存シート分岐: 既存キーに一致する行は更新される", async () => {
    const onCreated = vi.fn(async (): Promise<void> => undefined);
    const ctx: ExportContext = {
      now: () => new Date("2026-07-02T00:00:00.000Z"),
      fetchImpl: routeFetch({ existing: [["diary_1"]] }),
      google: { accessToken: "tok", spreadsheetId: "existing", onSpreadsheetCreated: onCreated },
    };
    const res = await new GoogleSheetsExporter().export(
      singleTabWorkbook([["updated", "diary_1"]]),
      ctx
    );
    expect(res.ok).toBe(true);
    expect(onCreated).not.toHaveBeenCalled();
  });
});
