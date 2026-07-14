/**
 * シェル（描画レイヤ）が扱うアプリ状態の型・既定値・純粋ヘルパー。
 * 元 prom-checker/index.html の state / defaultSettings / DOM ヘルパー群のうち
 * 環境非依存な部分を切り出したもの（DOM/Storage には触れない）。
 */
import { DEFAULT_MEDS, DRUG_CLASS } from "@/lib/prom/registry";
import { SCHEMA_VERSION } from "@/lib/prom/storage";
import type { DiaryEntry, Settings } from "@/lib/prom/types";

// AppData の定義はコア層（lib/prom/types）にあり、既存の参照互換のためここから再エクスポートする。
export type { AppData } from "@/lib/prom/types";

/**
 * Creates the initial application settings.
 *
 * @returns The default `Settings` object for a fresh install.
 */
export function defaultSettings(): Settings {
  return {
    schemaVersion: SCHEMA_VERSION,
    hasCompletedSnoop: false,
    pgicVariant: "ascending",
    scaleChoice: "nrs",
    medicationList: DEFAULT_MEDS.slice(),
    treatmentStartDate: "",
    reminders: { enabled: false },
    theme: "auto",
  };
}

/**
 * Gets today's local date in `YYYY-MM-DD` format.
 *
 * @returns Today's date as a `YYYY-MM-DD` string.
 */
export function todayISO(): string {
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

/**
 * Formats a number for display.
 *
 * @param v - The value to format
 * @returns `"—"` if `v` is `null` or `undefined`, otherwise the string form of `v`
 */
export function num(v: number | null | undefined): string {
  return v === null || v === undefined ? "—" : String(v);
}

/** 日常生活影響度の選択肢（MIDAS 算出の基礎・日誌で共有, 元 DIARY_OPTS）。 */
export const DIARY_OPTS = {
  sides: ["片側", "両側"],
  locations: ["前頭", "側頭", "後頭", "目の周り"],
  quality: ["拍動性（ズキズキ）", "非拍動性（締め付け・重い）", "刺すような"],
  symptoms: ["吐き気・嘔吐", "光過敏", "音過敏", "匂い過敏"],
  aura: [
    "閃輝暗点（キラキラ/ギザギザ）",
    "手足のしびれ",
    "言葉の出にくさ",
    "運動麻痺",
    "脳幹性前兆",
  ],
  prodrome: ["あくび", "首のこわばり", "異常な疲労感", "気分の変化"],
  triggers: [
    "睡眠不足/寝すぎ",
    "ストレス/ストレス解放",
    "月経（Day1）",
    "特定の食べ物",
    "天候/気圧変化",
    "欠食・脱水",
    "カフェイン離脱",
  ],
  impact: [
    "0: 影響なし",
    "1: 軽度（仕事/家事は可能）",
    "2: 中等度（効率低下）",
    "3: 重度（寝込む）",
  ],
} as const;

/**
 * Converts an impact value to its display label.
 *
 * @param v - The impact value to format
 * @returns The matching label, or `—` when `v` is `null` or `undefined`
 */
export function impactLabel(v: number | null | undefined): string {
  if (v === null || v === undefined) return "—";
  return DIARY_OPTS.impact[v] ?? String(v);
}

/**
 * Calculates the minute difference between two times in `HH:MM` format.
 *
 * @param start - The start time string
 * @param end - The end time string
 * @returns The number of minutes from `start` to `end`, or `null` if either time is invalid
 */
export function timeDiffMins(start: string, end: string): number | null {
  const ps = /^(\d{2}):(\d{2})$/.exec(start);
  const pe = /^(\d{2}):(\d{2})$/.exec(end);
  if (!ps || !pe) return null;
  const sh = Number(ps[1]);
  const sm = Number(ps[2]);
  const eh = Number(pe[1]);
  const em = Number(pe[2]);
  if (sh < 0 || sh > 23 || sm < 0 || sm > 59) return null;
  if (eh < 0 || eh > 23 || em < 0 || em > 59) return null;
  const s = sh * 60 + sm;
  const e = eh * 60 + em;
  return e - s;
}

/**
 * Counts unique medication days per drug class for a given month.
 *
 * @param entries - Diary entries to aggregate
 * @param ym - Target month in `YYYY-MM` format
 * @returns A map from each drug class to the number of distinct days it appears in that month
 */
export function monthlyDrugDayCounts(entries: DiaryEntry[], ym: string): Record<string, number> {
  const byClass: Record<string, Set<string>> = {};
  for (const cls of Object.keys(DRUG_CLASS)) byClass[cls] = new Set();
  for (const en of entries) {
    if (typeof en.date !== "string" || en.date.slice(0, 7) !== ym) continue;
    for (const d of en.drugs ?? []) {
      if (byClass[d.class]) byClass[d.class].add(en.date);
    }
  }
  const out: Record<string, number> = {};
  for (const cls of Object.keys(byClass)) out[cls] = byClass[cls].size;
  return out;
}
