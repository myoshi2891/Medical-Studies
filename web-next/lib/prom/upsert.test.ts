import { describe, expect, it } from "vitest";
import type { DiaryEntry, ScoreRecord } from "./types";
import {
  hasDiaryForDate,
  hasScoreForDateInstrument,
  upsertDiaryByDate,
  upsertScoreByDateInstrument,
} from "./upsert";

/**
 * 1日1データ upsert の契約テスト。追加/置換/共存/非破壊/存在判定を検証する。AAA パターン。
 */

function diary(date: string, id: string): DiaryEntry {
  return {
    id,
    createdAt: `${date}T00:00:00.000Z`,
    date,
    startTime: "",
    endTime: "",
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

function score(date: string, instrumentId: string, value: number): ScoreRecord {
  return {
    date,
    createdAt: `${date}T00:00:00.000Z`,
    instrumentId,
    instrumentVersion: "1.0",
    value,
  };
}

describe("upsertDiaryByDate", () => {
  it("新規日付は末尾に追加する", () => {
    const entries = [diary("2026-07-01", "a")];
    const next = upsertDiaryByDate(entries, diary("2026-07-02", "b"));
    expect(next).toHaveLength(2);
    expect(next[1].id).toBe("b");
  });

  it("同一日付は位置を保って置換し件数を増やさない", () => {
    const entries = [diary("2026-07-01", "a"), diary("2026-07-02", "b")];
    const next = upsertDiaryByDate(entries, diary("2026-07-01", "a2"));
    expect(next).toHaveLength(2);
    expect(next[0].id).toBe("a2");
    expect(next[1].id).toBe("b");
  });

  it("入力配列を破壊しない", () => {
    const entries = [diary("2026-07-01", "a")];
    upsertDiaryByDate(entries, diary("2026-07-01", "a2"));
    expect(entries[0].id).toBe("a");
  });
});

describe("hasDiaryForDate", () => {
  it("存在すれば true、無ければ false", () => {
    const entries = [diary("2026-07-01", "a")];
    expect(hasDiaryForDate(entries, "2026-07-01")).toBe(true);
    expect(hasDiaryForDate(entries, "2026-07-02")).toBe(false);
  });
});

describe("upsertScoreByDateInstrument", () => {
  it("新規 (日付,指標) は追加する", () => {
    const records = [score("2026-07-01", "hit6", 60)];
    const next = upsertScoreByDateInstrument(records, score("2026-07-01", "nrs", 7));
    expect(next).toHaveLength(2);
  });

  it("同一 (日付,指標) は置換し件数不変・値更新", () => {
    const records = [score("2026-07-01", "hit6", 60)];
    const next = upsertScoreByDateInstrument(records, score("2026-07-01", "hit6", 48));
    expect(next).toHaveLength(1);
    expect(next[0].value).toBe(48);
  });

  it("別指標は同日でも共存する", () => {
    const records = [score("2026-07-01", "hit6", 60), score("2026-07-01", "nrs", 7)];
    const next = upsertScoreByDateInstrument(records, score("2026-07-01", "hit6", 48));
    expect(next).toHaveLength(2);
    expect(next.find((r) => r.instrumentId === "nrs")?.value).toBe(7);
  });
});

describe("hasScoreForDateInstrument", () => {
  it("同一 (日付,指標) の有無を判定する", () => {
    const records = [score("2026-07-01", "hit6", 60)];
    expect(hasScoreForDateInstrument(records, "2026-07-01", "hit6")).toBe(true);
    expect(hasScoreForDateInstrument(records, "2026-07-01", "nrs")).toBe(false);
    expect(hasScoreForDateInstrument(records, "2026-07-02", "hit6")).toBe(false);
  });
});
