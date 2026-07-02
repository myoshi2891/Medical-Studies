import { describe, expect, it, vi } from "vitest";
import { SheetsClient } from "./sheetsClient";

/**
 * Google Sheets REST クライアントの契約テスト（設計書 第 6.4 章）。
 * fetch を注入し、2xx 成功・非 2xx の Result エラー化・型ガードを検証する。
 * ライブ API は叩かない。AAA パターン。
 */

function jsonResponse(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json" },
  });
}

function client(fetchImpl: typeof fetch): SheetsClient {
  return new SheetsClient({ accessToken: "tok", fetchImpl });
}

describe("SheetsClient.createSpreadsheet", () => {
  it("2xx で spreadsheetId を返し Bearer トークンを付与する", async () => {
    // Arrange
    const fetchImpl = vi.fn(async () => jsonResponse({ spreadsheetId: "abc123" }));
    // Act
    const res = await client(fetchImpl as unknown as typeof fetch).createSpreadsheet("T", ["日誌"]);
    // Assert
    expect(res.ok).toBe(true);
    if (res.ok) expect(res.value.spreadsheetId).toBe("abc123");
    const init = fetchImpl.mock.calls[0][1] as RequestInit;
    expect(init.method).toBe("POST");
    expect((init.headers as Record<string, string>).Authorization).toBe("Bearer tok");
  });

  it("spreadsheetId 欠落レスポンスは型ガードで Result エラー化する", async () => {
    const fetchImpl = vi.fn(async () => jsonResponse({ notId: 1 }));
    const res = await client(fetchImpl as unknown as typeof fetch).createSpreadsheet("T", ["日誌"]);
    expect(res.ok).toBe(false);
  });

  it("非 2xx は Result エラーへ変換する", async () => {
    const fetchImpl = vi.fn(async () => jsonResponse({ error: "denied" }, 403));
    const res = await client(fetchImpl as unknown as typeof fetch).createSpreadsheet("T", ["日誌"]);
    expect(res.ok).toBe(false);
  });
});

describe("SheetsClient.getValues", () => {
  it("2xx で values を返す", async () => {
    const fetchImpl = vi.fn(async () =>
      jsonResponse({ range: "A2:A", values: [["diary_1"], ["diary_2"]] })
    );
    const res = await client(fetchImpl as unknown as typeof fetch).getValues("id", "'日誌'!A2:A");
    expect(res.ok).toBe(true);
    if (res.ok) expect(res.value).toEqual([["diary_1"], ["diary_2"]]);
  });

  it("values 欠落（空タブ）は空配列を返す", async () => {
    const fetchImpl = vi.fn(async () => jsonResponse({ range: "A2:A" }));
    const res = await client(fetchImpl as unknown as typeof fetch).getValues("id", "'日誌'!A2:A");
    expect(res.ok).toBe(true);
    if (res.ok) expect(res.value).toEqual([]);
  });

  it("非 2xx は Result エラーへ変換する", async () => {
    const fetchImpl = vi.fn(async () => jsonResponse({ error: "boom" }, 500));
    const res = await client(fetchImpl as unknown as typeof fetch).getValues("id", "'日誌'!A2:A");
    expect(res.ok).toBe(false);
  });
});

describe("SheetsClient.batchUpdateValues / appendValues", () => {
  it("batchUpdateValues は 2xx で ok を返す", async () => {
    const fetchImpl = vi.fn(async () => jsonResponse({ totalUpdatedCells: 3 }));
    const res = await client(fetchImpl as unknown as typeof fetch).batchUpdateValues("id", [
      { range: "'日誌'!A2:V2", values: [["diary_1"]] },
    ]);
    expect(res.ok).toBe(true);
  });

  it("appendValues は 2xx で ok を返す", async () => {
    const fetchImpl = vi.fn(async () => jsonResponse({ updates: { updatedRows: 1 } }));
    const res = await client(fetchImpl as unknown as typeof fetch).appendValues(
      "id",
      "'日誌'!A:A",
      [["diary_9"]]
    );
    expect(res.ok).toBe(true);
  });

  it("appendValues の非 2xx は Result エラー", async () => {
    const fetchImpl = vi.fn(async () => jsonResponse({ error: "no" }, 401));
    const res = await client(fetchImpl as unknown as typeof fetch).appendValues(
      "id",
      "'日誌'!A:A",
      [["x"]]
    );
    expect(res.ok).toBe(false);
  });
});
