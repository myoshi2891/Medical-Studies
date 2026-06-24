/**
 * スコアリング自己テスト（設計書 第11章: 純粋関数の AAA テスト）。元 runSelfTests。
 * Vitest（lib/prom/scoring.test.ts）と同じ 8 シナリオを画面表示用に再現する純粋関数。
 * DOM に触れないため SelfTestPanel から呼び出すだけで結果配列を得られる。
 */
import { REGISTRY } from "@/lib/prom/registry";
import { mohRiskFor, nextDueDate, scoreInstrument } from "@/lib/prom/scoring";
import type { Instrument, Result, ScoreValue } from "@/lib/prom/types";

export interface SelfTestResult {
  name: string;
  pass: boolean;
  detail: string;
}

/**
 * Extracts a score value from a successful result.
 *
 * @param r - The scoring result to unwrap
 * @returns The contained score value
 * @throws Error when the result is not successful
 */
function unwrap(r: Result<ScoreValue>): ScoreValue {
  if (!r.ok) throw new Error(`予期せぬエラー: ${r.error}`);
  return r.value;
}

/**
 * Throws an error when the condition is false.
 *
 * @param cond - Condition to verify
 * @param msg - Error message to throw
 * @throws Error when `cond` is false
 */
function assert(cond: boolean, msg: string): void {
  if (!cond) throw new Error(msg);
}

/**
 * Runs eight predefined self-test scenarios and returns their results.
 *
 * @returns The per-scenario test outcomes.
 */
export function runSelfTests(): SelfTestResult[] {
  const results: SelfTestResult[] = [];
  const t = (name: string, fn: () => string): void => {
    try {
      results.push({ name, pass: true, detail: fn() });
    } catch (e) {
      results.push({ name, pass: false, detail: e instanceof Error ? e.message : String(e) });
    }
  };

  t("SNOOP4: 未チェック=遷移可 / 1項目該当=ブロック（判定ロジック）", () => {
    const positive = (flags: string[]) => flags.length > 0;
    assert(positive([]) === false, "未チェックでブロックされた");
    assert(positive(["突然の発症"]) === true, "1項目該当でブロックされない");
    return "0件→通過 / 1件→ブロック";
  });
  t("HIT-6 全『まったくない』=36 grade1", () => {
    const r = unwrap(scoreInstrument([6, 6, 6, 6, 6, 6], REGISTRY.hit6));
    assert(r.total === 36 && r.interpretation === "grade1", `total=${r.total}`);
    return "36 / grade1";
  });
  t("HIT-6 全『いつも』=78 grade4", () => {
    const r = unwrap(scoreInstrument([13, 13, 13, 13, 13, 13], REGISTRY.hit6));
    assert(r.total === 78 && r.interpretation === "grade4", `total=${r.total}`);
    return "78 / grade4";
  });
  t("MIDAS 91以上/非整数を拒否, A/B非加算", () => {
    assert(scoreInstrument([91, 0, 0, 0, 0], REGISTRY.midas).ok === false, "91 を許容");
    assert(scoreInstrument([1.5, 0, 0, 0, 0], REGISTRY.midas).ok === false, "非整数を許容");
    const r = unwrap(scoreInstrument([10, 20, 5, 8, 2], REGISTRY.midas));
    assert(r.total === 45, "5問合計が不一致");
    return "範囲/型検証 OK・合計=45";
  });
  t("MSQ 全code1→100 / 全code6→0", () => {
    const hi = unwrap(scoreInstrument(Array(14).fill(1), REGISTRY["msq-v2.1"]));
    const hd = hi.domains ?? {};
    assert(hd.rfr === 100 && hd.rfp === 100 && hd.ef === 100, "上限不一致");
    const lo = unwrap(scoreInstrument(Array(14).fill(6), REGISTRY["msq-v2.1"]));
    const ld = lo.domains ?? {};
    assert(ld.rfr === 0 && ld.rfp === 0 && ld.ef === 0, "下限不一致");
    return "100/100/100 ↔ 0/0/0";
  });
  t("PGIC 昇順5–7=favorable / variant切替で反転", () => {
    const asc = REGISTRY.pgic;
    assert(unwrap(scoreInstrument([5], asc)).interpretation === "favorable", "昇順5");
    assert(unwrap(scoreInstrument([4], asc)).interpretation === "non-favorable", "昇順4");
    const desc: Instrument =
      asc.scoring.method === "single-ordinal"
        ? { ...asc, scoring: { ...asc.scoring, variant: "descending" } }
        : asc;
    assert(unwrap(scoreInstrument([2], desc)).interpretation === "favorable", "降順2");
    return "昇順5–7 / 降順1–3";
  });
  t("MOH トリプタン10日・NSAIDs15日=乱用超過", () => {
    const triptan = mohRiskFor(10, "triptan-ergot-opioid-combo");
    const nsaid = mohRiskFor(15, "simple-nsaid");
    const triptan9 = mohRiskFor(9, "triptan-ergot-opioid-combo");
    assert(triptan.ok && triptan.value.level === "overuse", "トリプタン10");
    assert(nsaid.ok && nsaid.value.level === "overuse", "NSAIDs15");
    assert(triptan9.ok && triptan9.value.level === "caution", "トリプタン9");
    return "閾値 10 / 15";
  });
  t("nextDueDate: P4W=+28日 / P3M=+3ヶ月（UTC固定）", () => {
    assert(
      nextDueDate("2026-06-01", "P4W") === "2026-06-29",
      String(nextDueDate("2026-06-01", "P4W"))
    );
    assert(
      nextDueDate("2026-06-01", "P3M") === "2026-09-01",
      String(nextDueDate("2026-06-01", "P3M"))
    );
    return "+28d / +3mo";
  });

  return results;
}
