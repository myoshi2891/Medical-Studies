/**
 * シェル（描画レイヤ）が扱うアプリ状態の型・既定値・純粋ヘルパー。
 * 元 prom-checker/index.html の state / defaultSettings / DOM ヘルパー群のうち
 * 環境非依存な部分を切り出したもの（DOM/Storage には触れない）。
 */
import { DEFAULT_MEDS, DRUG_CLASS } from "@/lib/prom/registry";
import { SCHEMA_VERSION } from "@/lib/prom/storage";
import type { DiaryEntry, DiaryState, ScoresState, Settings, SnoopState } from "@/lib/prom/types";

/** 4 つの永続化キーをまとめたアプリ状態。 */
export interface AppData {
  settings: Settings;
  snoop: SnoopState;
  diary: DiaryState;
  scores: ScoresState;
}

/** 初回起動時の既定設定（元 defaultSettings）。 */
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

/** 当日（ローカル）の YYYY-MM-DD（元 todayISO）。 */
export function todayISO(): string {
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

/** null/undefined を「—」に変換（表示用, 元 num）。 */
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

/** impact の数値→ラベル（元 impactLabel）。 */
export function impactLabel(v: number | null | undefined): string {
  if (v === null || v === undefined) return "—";
  return DIARY_OPTS.impact[v] ?? String(v);
}

/** "HH:MM" 形式の開始・終了から経過分を返す（元 timeDiffMins 相当・日跨ぎ補正なし）。 */
export function timeDiffMins(start: string, end: string): number | null {
  const ps = /^(\d{2}):(\d{2})$/.exec(start);
  const pe = /^(\d{2}):(\d{2})$/.exec(end);
  if (!ps || !pe) return null;
  const s = Number(ps[1]) * 60 + Number(ps[2]);
  const e = Number(pe[1]) * 60 + Number(pe[2]);
  return e - s;
}

/**
 * 当月（YYYY-MM）の薬剤分類別「服用日数」を集計（元 monthlyDrugDayCounts）。
 * 1 日に同一分類を複数回使っても 1 日として数える（Set で日付を一意化）。MOH 判定の基礎。
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
