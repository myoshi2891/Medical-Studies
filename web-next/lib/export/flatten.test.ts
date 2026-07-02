import { describe, expect, it } from "vitest";
import type { DiaryEntry, ScoreRecord } from "@/lib/prom/types";
import { diaryColumns, diaryRow, formatDrugs, joinChips, scoreColumns, scoreRow } from "./flatten";

/**
 * 平坦化（純粋関数）の契約テスト（設計書 第 5 章のマッピング表・第 11 章のケース）。
 * ネスト平坦化・空値・チップ結合・服薬整形・band 導出を検証する。AAA パターン。
 */

function baseDiary(): DiaryEntry {
  return {
    id: "diary_100",
    createdAt: "2026-07-01T08:00:00.000Z",
    date: "2026-07-01",
    startTime: "08:00",
    endTime: "10:30",
    sides: ["片側"],
    locations: ["前頭", "側頭"],
    quality: ["拍動性（ズキズキ）"],
    nrs: { onset: 3, peak: 8, post2h: 4 },
    symptoms: ["吐き気・嘔吐", "光過敏"],
    aura: [],
    prodrome: ["あくび"],
    drugs: [
      {
        name: "ロキソプロフェン",
        class: "simple-nsaid",
        dose: "60mg",
        time: "08:30",
        effectNrs2h: 4,
      },
    ],
    triggers: ["睡眠不足/寝すぎ"],
    sleep: { bedtime: "23:30", waketime: "07:00", quality: 3, stress: 2 },
    impact: 2,
  };
}

describe("joinChips", () => {
  it("複数チップを『・』で結合する", () => {
    expect(joinChips(["前頭", "側頭"])).toBe("前頭・側頭");
  });

  it("空配列は空文字を返す", () => {
    expect(joinChips([])).toBe("");
  });
});

describe("formatDrugs", () => {
  it("薬剤を name(class)/dose/time/効果N 形式に整形し ; で結合する", () => {
    // Arrange
    const drugs = [
      {
        name: "ロキソプロフェン",
        class: "simple-nsaid",
        dose: "60mg",
        time: "08:30",
        effectNrs2h: 4,
      },
      { name: "スマトリプタン", class: "triptan", dose: "50mg", time: "09:00", effectNrs2h: 2 },
    ];
    // Act / Assert
    expect(formatDrugs(drugs)).toBe(
      "ロキソプロフェン(simple-nsaid)/60mg/08:30/効果4; スマトリプタン(triptan)/50mg/09:00/効果2"
    );
  });

  it("effectNrs2h が null のときは効果- を出力する", () => {
    const drugs = [
      { name: "A", class: "simple-nsaid", dose: "1", time: "00:00", effectNrs2h: null },
    ];
    expect(formatDrugs(drugs)).toBe("A(simple-nsaid)/1/00:00/効果-");
  });

  it("空配列は空文字を返す", () => {
    expect(formatDrugs([])).toBe("");
  });
});

describe("diaryColumns", () => {
  it("22 列でキー列 id を末尾に持つ", () => {
    expect(diaryColumns).toHaveLength(22);
    expect(diaryColumns[0].key).toBe("date");
    expect(diaryColumns[diaryColumns.length - 1].key).toBe("id");
  });
});

describe("diaryRow", () => {
  it("完全な日誌を第 5.1 章の列順で平坦化する", () => {
    // Arrange
    const entry = baseDiary();
    // Act
    const row = diaryRow(entry);
    // Assert
    expect(row).toEqual([
      "2026-07-01",
      "08:00",
      "10:30",
      150,
      "片側",
      "前頭・側頭",
      "拍動性（ズキズキ）",
      3,
      8,
      4,
      "吐き気・嘔吐・光過敏",
      "",
      "あくび",
      "ロキソプロフェン(simple-nsaid)/60mg/08:30/効果4",
      "睡眠不足/寝すぎ",
      "23:30",
      "07:00",
      3,
      2,
      "2: 中等度（効率低下）",
      "2026/07/01 17:00",
      "diary_100",
    ]);
  });

  it("NRS・睡眠・影響の欠損は null / 影響ラベルの — で表す", () => {
    // Arrange
    const entry = baseDiary();
    entry.nrs = { onset: null, peak: null, post2h: null };
    entry.sleep = { bedtime: "", waketime: "", quality: null, stress: null };
    entry.impact = null;
    // Act
    const row = diaryRow(entry);
    // Assert（NRS 3 列 = index 7..9, 睡眠質/ストレス = 17..18, 影響 = 19）
    expect(row[7]).toBeNull();
    expect(row[8]).toBeNull();
    expect(row[9]).toBeNull();
    expect(row[17]).toBeNull();
    expect(row[18]).toBeNull();
    expect(row[19]).toBe("—");
  });
});

describe("scoreColumns", () => {
  it("14 列でキー列 recordKey を末尾に持つ", () => {
    expect(scoreColumns).toHaveLength(14);
    expect(scoreColumns[0].key).toBe("date");
    expect(scoreColumns[scoreColumns.length - 1].key).toBe("recordKey");
  });
});

describe("scoreRow", () => {
  it("sum 指標（hit6）は band ラベルを導出し recordKey を合成する", () => {
    // Arrange
    const rec: ScoreRecord = {
      date: "2026-07-01",
      createdAt: "2026-07-01T09:00:00.000Z",
      instrumentId: "hit6",
      instrumentVersion: "1.0",
      total: 60,
      interpretation: "grade4",
    };
    // Act
    const row = scoreRow(rec);
    // Assert
    expect(row).toEqual([
      "2026-07-01",
      "hit6",
      "1.0",
      60,
      "グレード4：重度の影響あり（積極的な専門的治療を推奨）",
      null,
      null,
      null,
      null,
      null,
      null,
      "grade4",
      "2026/07/01 18:00",
      "hit6_2026-07-01T09:00:00.000Z",
    ]);
  });

  it("midas は band とコンテキスト（小文字 a/b）を出力する", () => {
    const rec: ScoreRecord = {
      date: "2026-07-03",
      createdAt: "2026-07-03T09:00:00.000Z",
      instrumentId: "midas",
      instrumentVersion: "1.0",
      total: 8,
      context: { a: 12, b: 6 },
      interpretation: "II",
    };
    const row = scoreRow(rec);
    expect(row[3]).toBe(8);
    expect(row[4]).toBe("グレードII：軽度の支障");
    expect(row[8]).toBe(12); // contextA
    expect(row[9]).toBe(6); // contextB
  });

  it("msq はドメイン得点を出力し band は null（sum ではない）", () => {
    const rec: ScoreRecord = {
      date: "2026-07-02",
      createdAt: "2026-07-02T09:00:00.000Z",
      instrumentId: "msq-v2.1",
      instrumentVersion: "2.1",
      domains: { rfr: 75, rfp: 80.5, ef: 66.67 },
      interpretation: "domain",
    };
    const row = scoreRow(rec);
    expect(row[4]).toBeNull(); // band
    expect(row[5]).toBe(75); // domainRfr
    expect(row[6]).toBe(80.5); // domainRfp
    expect(row[7]).toBe(66.67); // domainEf
  });

  it("nrs は疼痛値のみを出力し band・total は null", () => {
    const rec: ScoreRecord = {
      date: "2026-07-04",
      createdAt: "2026-07-04T09:00:00.000Z",
      instrumentId: "nrs",
      instrumentVersion: "1.0",
      value: 7,
    };
    const row = scoreRow(rec);
    expect(row[3]).toBeNull(); // total
    expect(row[4]).toBeNull(); // band
    expect(row[10]).toBe(7); // value
  });
});
