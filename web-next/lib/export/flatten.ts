/**
 * 平坦化（純粋関数群）。DiaryEntry / ScoreRecord を行指向セルへ写像する（設計書 第 5 章）。
 * 列定義（ColumnDef[]）と行生成（Cell[]）を対で持ち、順序を決定論的にする。
 * DOM / Storage / 時刻に依存しない（band 導出は REGISTRY の宣言データのみ参照）。
 */
import { impactLabel, timeDiffMins } from "@/components/prom/state";
import { formatCreatedAtJst } from "@/lib/prom/datetime";
import { REGISTRY } from "@/lib/prom/registry";
import { bandFor } from "@/lib/prom/scoring";
import type { DiaryDrug, DiaryEntry, ScoreRecord } from "@/lib/prom/types";
import type { Cell, ColumnDef } from "./types";

/** number | null | undefined を空許容のセルへ正規化する。 */
const numCell = (v: number | null | undefined): Cell => v ?? null;

/** チップ配列を『・』で連結する（空配列は空文字）。 */
export function joinChips(chips: string[]): string {
  return chips.join("・");
}

/** 服薬配列を 1 セルへ整形する（設計書 第 5.1 章）。効果欠損は「-」。 */
export function formatDrugs(drugs: DiaryDrug[]): string {
  return drugs
    .map((d) => `${d.name}(${d.class})/${d.dose}/${d.time}/効果${d.effectNrs2h ?? "-"}`)
    .join("; ");
}

/** 頭痛日誌タブの列定義（第 5.1 章。末尾 id が upsert キー列）。 */
export const diaryColumns: ColumnDef[] = [
  { key: "date", header: "日付" },
  { key: "startTime", header: "開始" },
  { key: "endTime", header: "終了" },
  { key: "durationMin", header: "継続（分）" },
  { key: "sides", header: "部位（左右）" },
  { key: "locations", header: "部位" },
  { key: "quality", header: "性状" },
  { key: "nrsOnset", header: "NRS発症" },
  { key: "nrsPeak", header: "NRSピーク" },
  { key: "nrsPost2h", header: "NRS2h後" },
  { key: "symptoms", header: "随伴症状" },
  { key: "aura", header: "前兆" },
  { key: "prodrome", header: "予兆" },
  { key: "drugs", header: "服薬" },
  { key: "triggers", header: "誘因" },
  { key: "bedtime", header: "就床" },
  { key: "waketime", header: "起床" },
  { key: "sleepQuality", header: "睡眠質" },
  { key: "stress", header: "ストレス" },
  { key: "impact", header: "生活影響" },
  { key: "createdAt", header: "記録時刻" },
  { key: "id", header: "記録ID（キー）" },
];

/** 1 件の日誌を diaryColumns と同順のセル配列へ平坦化する。 */
export function diaryRow(e: DiaryEntry): Cell[] {
  return [
    e.date,
    e.startTime,
    e.endTime,
    numCell(timeDiffMins(e.startTime, e.endTime)),
    joinChips(e.sides),
    joinChips(e.locations),
    joinChips(e.quality),
    numCell(e.nrs.onset),
    numCell(e.nrs.peak),
    numCell(e.nrs.post2h),
    joinChips(e.symptoms),
    joinChips(e.aura),
    joinChips(e.prodrome),
    formatDrugs(e.drugs),
    joinChips(e.triggers),
    e.sleep.bedtime,
    e.sleep.waketime,
    numCell(e.sleep.quality),
    numCell(e.sleep.stress),
    impactLabel(e.impact),
    formatCreatedAtJst(e.createdAt),
    e.id,
  ];
}

/** PROM スコアタブの列定義（第 5.2 章。末尾 recordKey が upsert キー列）。 */
export const scoreColumns: ColumnDef[] = [
  { key: "date", header: "記録日" },
  { key: "instrumentId", header: "指標" },
  { key: "instrumentVersion", header: "版" },
  { key: "total", header: "合計" },
  { key: "band", header: "バンド" },
  { key: "domainRfr", header: "MSQ_RFR" },
  { key: "domainRfp", header: "MSQ_RFP" },
  { key: "domainEf", header: "MSQ_EF" },
  { key: "contextA", header: "MIDAS_総頭痛日数" },
  { key: "contextB", header: "MIDAS_平均NRS" },
  { key: "value", header: "疼痛値" },
  { key: "interpretation", header: "解釈" },
  { key: "createdAt", header: "記録時刻" },
  { key: "recordKey", header: "レコードID（キー）" },
];

/**
 * band ラベルを導出する。sum 指標（REGISTRY にあり method=sum）かつ total 数値のときのみ。
 * nrs / vas / msq / pgic は null。
 */
function deriveBandLabel(rec: ScoreRecord): Cell {
  if (typeof rec.total !== "number") return null;
  const inst = REGISTRY[rec.instrumentId];
  if (inst?.scoring.method !== "sum") return null;
  const band = bandFor(rec.total, inst.interpretationBands ?? []);
  return band ? band.label : null;
}

/** 1 件のスコアを scoreColumns と同順のセル配列へ平坦化する。 */
export function scoreRow(rec: ScoreRecord): Cell[] {
  return [
    rec.date,
    rec.instrumentId,
    rec.instrumentVersion,
    numCell(rec.total),
    deriveBandLabel(rec),
    numCell(rec.domains?.rfr),
    numCell(rec.domains?.rfp),
    numCell(rec.domains?.ef),
    numCell(rec.context?.a),
    numCell(rec.context?.b),
    numCell(rec.value),
    rec.interpretation ?? null,
    formatCreatedAtJst(rec.createdAt),
    // (指標, 日付) を upsert キーに。同日同指標は再同期で更新される。
    `${rec.instrumentId}_${rec.date}`,
  ];
}
