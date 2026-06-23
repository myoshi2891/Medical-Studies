/**
 * ② スコアリングエンジン（純粋関数・副作用なし）。
 * 元 prom-checker/index.html の SCORING IIFE を TypeScript へ移植（設計書 第8.2章）。
 * 入力は回答配列＋定義、出力は Result<ScoreValue>。DOM / Storage / 時刻に触れない。
 */

import type { MohResult } from "./types";
import {
  err,
  type Instrument,
  type InterpretationBand,
  ok,
  type Result,
  type ScoreValue,
} from "./types";

const isFiniteNumber = (v: number): boolean => Number.isFinite(v);
const isInteger = (v: number): boolean => Number.isInteger(v);

/** 値が属する解釈バンドを返す（見つからなければ null）。 */
export function bandFor(value: number, bands: InterpretationBand[]): InterpretationBand | null {
  for (const b of bands) {
    if (value >= b.min && value <= b.max) return b;
  }
  return null;
}

/** 合計方式（HIT-6 / MIDAS）。 */
function scoreSum(answers: number[], def: Instrument): Result<ScoreValue> {
  if (def.scoring.method !== "sum") return err("スコアリング方式が sum ではありません");
  const scoring = def.scoring;
  const expected = def.items.length;
  if (!Array.isArray(answers) || answers.length !== expected) {
    return err(`回答数が不正です（期待 ${expected}）`);
  }
  const allowed = def.responseOptions ? new Set(def.responseOptions.map((o) => o.value)) : null;
  const inputMax = scoring.inputMax;
  let total = 0;
  for (let i = 0; i < answers.length; i++) {
    const a = answers[i];
    if (!isFiniteNumber(a)) return err(`設問 ${i + 1} の回答が数値ではありません`);
    if (allowed && !allowed.has(a)) return err(`設問 ${i + 1} の回答 ${a} は選択肢にありません`);
    if (typeof inputMax === "number" && (!isInteger(a) || a < 0 || a > inputMax)) {
      return err(`設問 ${i + 1} は 0〜${inputMax} の整数で入力してください`);
    }
    total += a;
  }
  const bands = def.interpretationBands ?? [];
  const band = bandFor(total, bands);
  return ok({ total, interpretation: band ? band.grade : "unknown", band });
}

/** ドメイン換算方式（MSQ v2.1）。逆転後 0〜100 へ換算。 */
function scoreMsqDomains(answers: number[], def: Instrument): Result<ScoreValue> {
  if (def.scoring.method !== "domain-rescale")
    return err("スコアリング方式が domain-rescale ではありません");
  const scoring = def.scoring;
  const expected = def.items.length;
  if (!Array.isArray(answers) || answers.length !== expected) {
    return err(`回答数が不正です（期待 ${expected}）`);
  }
  const allowed = new Set((def.responseOptions ?? []).map((o) => o.value));
  const finals: number[] = [];
  for (let i = 0; i < answers.length; i++) {
    const a = answers[i];
    if (!isInteger(a) || !allowed.has(a)) return err(`設問 ${i + 1} の回答が不正です`);
    finals.push(scoring.reverseCoding ? 7 - a : a);
  }
  const domains: Record<string, number> = {};
  const domainInterp: Record<string, string> = {};
  const bands = def.interpretationBands ?? [];
  for (const d of scoring.domains) {
    let sum = 0;
    for (const idx of d.items) sum += finals[idx];
    const score = ((sum - d.offset) * 100) / d.divisor;
    domains[d.id] = Math.round(score * 100) / 100;
    const band = bandFor(domains[d.id], bands);
    domainInterp[d.id] = band ? band.grade : "unknown";
  }
  return ok({ domains, domainInterp, interpretation: "domain" });
}

/** 単一順序尺度方式（PGIC）。variant により favorable の向きが反転。 */
function scorePgic(answers: number[], def: Instrument): Result<ScoreValue> {
  if (def.scoring.method !== "single-ordinal")
    return err("スコアリング方式が single-ordinal ではありません");
  if (!Array.isArray(answers) || answers.length !== 1) return err("PGIC は 1 問です");
  const a = answers[0];
  if (!isInteger(a) || a < 1 || a > 7) return err("PGIC は 1〜7 の整数です");
  const variant = def.scoring.variant;
  const favorable = variant === "ascending" ? a >= 5 : a <= 3;
  return ok({ total: a, interpretation: favorable ? "favorable" : "non-favorable" });
}

/** スコアリング方式に応じて適切な純粋関数へディスパッチする。 */
export function scoreInstrument(answers: number[], def: Instrument): Result<ScoreValue> {
  const method = def.scoring.method;
  if (method === "sum") return scoreSum(answers, def);
  if (method === "domain-rescale") return scoreMsqDomains(answers, def);
  if (method === "single-ordinal") return scorePgic(answers, def);
  return err(`未知のスコアリング方式: ${method}`);
}

/** 当月の薬剤分類別 服用日数から MOH（薬剤の使用過多による頭痛）リスクを判定。 */
export function mohRiskFor(monthlyDays: number, drugClass: string): Result<MohResult> {
  if (!isInteger(monthlyDays) || monthlyDays < 0) {
    return err("服用日数は 0 以上の整数で指定してください");
  }
  if (drugClass !== "simple-nsaid" && drugClass !== "triptan-ergot-opioid-combo") {
    return err(`未定義の薬剤分類です: ${drugClass}`);
  }
  const threshold = drugClass === "simple-nsaid" ? 15 : 10;
  let level: MohResult["level"];
  if (monthlyDays >= threshold) level = "overuse";
  else if (monthlyDays >= threshold - 2) level = "caution";
  else level = "safe";
  return ok({ level, threshold });
}

/** ISO 8601 期間を加算（UTC 固定で純粋・タイムゾーン非依存。Date.now は使わない）。 */
export function nextDueDate(lastDateISO: string, isoPeriod: string): string | null {
  if (typeof lastDateISO !== "string") return null;
  const dm = /^(\d{4})-(\d{2})-(\d{2})$/.exec(lastDateISO);
  if (!dm) return null;
  const year = Number(dm[1]);
  const month = Number(dm[2]);
  const day = Number(dm[3]);
  const r = new Date(Date.UTC(year, month - 1, day));
  if (r.getUTCFullYear() !== year || r.getUTCMonth() !== month - 1 || r.getUTCDate() !== day) {
    return null;
  }
  const m = /^P(?:(\d+)Y)?(?:(\d+)M)?(?:(\d+)W)?(?:(\d+)D)?$/.exec(isoPeriod);
  if (!m) return null;
  if (!m[1] && !m[2] && !m[3] && !m[4]) {
    return null;
  }
  if (m[1]) r.setUTCFullYear(r.getUTCFullYear() + Number(m[1]));
  if (m[2]) r.setUTCMonth(r.getUTCMonth() + Number(m[2]));
  if (m[3]) r.setUTCDate(r.getUTCDate() + Number(m[3]) * 7);
  if (m[4]) r.setUTCDate(r.getUTCDate() + Number(m[4]));
  return r.toISOString().slice(0, 10);
}
