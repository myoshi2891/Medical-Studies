import { describe, expect, it } from "vitest";
import { REGISTRY } from "./registry";
import { bandFor, mohRiskFor, nextDueDate, scoreInstrument } from "./scoring";
import type { Instrument, OrdinalScoring, Result, ScoreValue } from "./types";

/**
 * 元 prom-checker/index.html の runSelfTests()（設計書 第11章 §11.2 のシナリオ）を
 * Vitest 単体テストへ移植。純粋関数のため AAA パターンで正常系・異常系を網羅する。
 */

// Result<T> を剥がして value を取り出す（失敗時は例外で落とす）テストヘルパ。
function unwrap<T>(r: Result<T>): T {
  if (!r.ok) throw new Error(`予期せぬエラー: ${r.error}`);
  return r.value;
}

describe("scoreInstrument: sum 方式 (HIT-6)", () => {
  it("全『まったくない』(6×6) = 36 / grade1", () => {
    const r = unwrap(scoreInstrument([6, 6, 6, 6, 6, 6], REGISTRY.hit6));
    expect(r.total).toBe(36);
    expect(r.interpretation).toBe("grade1");
  });

  it("全『いつも』(13×6) = 78 / grade4", () => {
    const r = unwrap(scoreInstrument([13, 13, 13, 13, 13, 13], REGISTRY.hit6));
    expect(r.total).toBe(78);
    expect(r.interpretation).toBe("grade4");
  });

  it("回答数が不正なら ok:false", () => {
    expect(scoreInstrument([6, 6, 6], REGISTRY.hit6).ok).toBe(false);
  });

  it("選択肢にない値は ok:false", () => {
    expect(scoreInstrument([6, 6, 6, 6, 6, 7], REGISTRY.hit6).ok).toBe(false);
  });
});

describe("scoreInstrument: sum + days 方式 (MIDAS)", () => {
  it("91以上・非整数を拒否し、A/B はスコアに加算しない", () => {
    expect(scoreInstrument([91, 0, 0, 0, 0], REGISTRY.midas).ok).toBe(false);
    expect(scoreInstrument([1.5, 0, 0, 0, 0], REGISTRY.midas).ok).toBe(false);
    const r = unwrap(scoreInstrument([10, 20, 5, 8, 2], REGISTRY.midas));
    expect(r.total).toBe(45);
  });
});

describe("scoreInstrument: domain-rescale 方式 (MSQ v2.1)", () => {
  it("全 code1 → 100 / 全 code6 → 0（逆転後 0〜100 換算）", () => {
    const hi = unwrap(scoreInstrument(Array(14).fill(1), REGISTRY["msq-v2.1"]));
    expect(hi.domains).toEqual({ rfr: 100, rfp: 100, ef: 100 });
    const lo = unwrap(scoreInstrument(Array(14).fill(6), REGISTRY["msq-v2.1"]));
    expect(lo.domains).toEqual({ rfr: 0, rfp: 0, ef: 0 });
  });
});

describe("scoreInstrument: single-ordinal 方式 (PGIC)", () => {
  it("昇順版は 5〜7 で favorable、4 以下で non-favorable", () => {
    expect(unwrap(scoreInstrument([5], REGISTRY.pgic)).interpretation).toBe("favorable");
    expect(unwrap(scoreInstrument([4], REGISTRY.pgic)).interpretation).toBe("non-favorable");
  });

  it("variant=descending では 1〜3 が favorable に反転する", () => {
    const desc: Instrument = {
      ...REGISTRY.pgic,
      scoring: { ...(REGISTRY.pgic.scoring as OrdinalScoring), variant: "descending" },
    };
    expect(unwrap(scoreInstrument([2], desc)).interpretation).toBe("favorable");
    expect(unwrap(scoreInstrument([5], desc)).interpretation).toBe("non-favorable");
  });

  it("1〜7 の範囲外は ok:false", () => {
    expect(scoreInstrument([0], REGISTRY.pgic).ok).toBe(false);
    expect(scoreInstrument([8], REGISTRY.pgic).ok).toBe(false);
  });
});

describe("bandFor", () => {
  it("値が属するバンドを返し、範囲外なら null", () => {
    const bands = REGISTRY.hit6.interpretationBands;
    if (!bands) throw new Error("hit6 bands missing");
    expect(bandFor(36, bands)?.grade).toBe("grade1");
    expect(bandFor(60, bands)?.grade).toBe("grade4");
    expect(bandFor(35, bands)).toBeNull();
  });
});

describe("mohRiskFor", () => {
  it("トリプタン10日 / NSAIDs15日 = overuse、トリプタン9日 = caution", () => {
    expect(unwrap(mohRiskFor(10, "triptan-ergot-opioid-combo")).level).toBe("overuse");
    expect(unwrap(mohRiskFor(15, "simple-nsaid")).level).toBe("overuse");
    expect(unwrap(mohRiskFor(9, "triptan-ergot-opioid-combo")).level).toBe("caution");
    expect(unwrap(mohRiskFor(0, "simple-nsaid")).level).toBe("safe");
  });

  it("負数・非整数は ok:false", () => {
    expect(mohRiskFor(-1, "simple-nsaid").ok).toBe(false);
    expect(mohRiskFor(2.5, "simple-nsaid").ok).toBe(false);
  });

  it("未知の薬剤分類は ok:false", () => {
    expect(mohRiskFor(10, "unknown-class").ok).toBe(false);
  });
});

describe("nextDueDate (UTC 固定・純粋)", () => {
  it("P4W = +28日 / P3M = +3ヶ月", () => {
    expect(nextDueDate("2026-06-01", "P4W")).toBe("2026-06-29");
    expect(nextDueDate("2026-06-01", "P3M")).toBe("2026-09-01");
  });

  it("不正な日付・期間は null", () => {
    expect(nextDueDate("2026/06/01", "P4W")).toBeNull();
    expect(nextDueDate("2026-06-01", "XYZ")).toBeNull();
    expect(nextDueDate("2026-02-31", "P4W")).toBeNull();
    expect(nextDueDate("2026-06-01", "P")).toBeNull();
  });
});

describe("型の健全性（未知メソッドは error）", () => {
  it("未知のスコアリング方式は ok:false", () => {
    const bogus = {
      ...REGISTRY.hit6,
      scoring: { method: "bogus" },
    } as unknown as Instrument;
    const r: Result<ScoreValue> = scoreInstrument([1], bogus);
    expect(r.ok).toBe(false);
  });
});
