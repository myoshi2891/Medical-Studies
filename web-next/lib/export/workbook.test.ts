import { describe, expect, it } from "vitest";
import { SCHEMA_VERSION } from "@/lib/prom/storage";
import type { DiaryEntry, ExportPayload, ScoreRecord } from "@/lib/prom/types";
import { diaryColumns, scoreColumns } from "./flatten";
import { buildWorkbook } from "./workbook";

/**
 * 純粋ビルダー buildWorkbook の契約テスト（設計書 第 4.4 章）。
 * タブ数・列順・行数・keyColumnKey・meta を検証する。時刻は注入する。
 */

function diaryFixture(): DiaryEntry {
  return {
    id: "diary_1",
    createdAt: "2026-07-01T00:00:00.000Z",
    date: "2026-07-01",
    startTime: "08:00",
    endTime: "09:00",
    sides: [],
    locations: [],
    quality: [],
    nrs: { onset: null, peak: null, post2h: null },
    symptoms: [],
    aura: [],
    prodrome: [],
    drugs: [],
    triggers: [],
    sleep: { bedtime: "", waketime: "", quality: null, stress: null },
    impact: null,
  };
}

function scoreFixture(): ScoreRecord {
  return {
    date: "2026-07-01",
    createdAt: "2026-07-01T09:00:00.000Z",
    instrumentId: "hit6",
    instrumentVersion: "1.0",
    total: 42,
    interpretation: "grade1",
  };
}

function payloadFixture(): ExportPayload {
  return {
    schemaVersion: SCHEMA_VERSION,
    exportDate: "2026-07-01T00:00:00.000Z",
    settings: {},
    snoopHistory: [],
    diary: [diaryFixture(), diaryFixture()],
    promScores: [scoreFixture()],
  };
}

describe("buildWorkbook", () => {
  it("頭痛日誌 / PROMスコア の 2 タブを構成する", () => {
    // Arrange
    const payload = payloadFixture();
    // Act
    const wb = buildWorkbook(payload, { now: () => new Date("2026-07-02T00:00:00.000Z") });
    // Assert
    expect(wb.tables).toHaveLength(2);
    expect(wb.tables[0].name).toBe("頭痛日誌");
    expect(wb.tables[1].name).toBe("PROMスコア");
  });

  it("各タブの列定義とキー列・行数を保つ", () => {
    const payload = payloadFixture();
    const wb = buildWorkbook(payload, { now: () => new Date("2026-07-02T00:00:00.000Z") });
    expect(wb.tables[0].columns).toEqual(diaryColumns);
    expect(wb.tables[0].keyColumnKey).toBe("date");
    expect(wb.tables[0].rows).toHaveLength(2);
    expect(wb.tables[1].columns).toEqual(scoreColumns);
    expect(wb.tables[1].keyColumnKey).toBe("recordKey");
    expect(wb.tables[1].rows).toHaveLength(1);
  });

  it("meta に schemaVersion と注入時刻の builtAt を持つ", () => {
    const payload = payloadFixture();
    const wb = buildWorkbook(payload, { now: () => new Date("2026-07-02T00:00:00.000Z") });
    expect(wb.meta.schemaVersion).toBe(SCHEMA_VERSION);
    expect(wb.meta.builtAt).toBe("2026-07-02T00:00:00.000Z");
  });

  it("空ペイロードは空行のタブを返す", () => {
    const payload: ExportPayload = { ...payloadFixture(), diary: [], promScores: [] };
    const wb = buildWorkbook(payload);
    expect(wb.tables[0].rows).toHaveLength(0);
    expect(wb.tables[1].rows).toHaveLength(0);
  });
});
