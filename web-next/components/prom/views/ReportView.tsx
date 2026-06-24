"use client";

import { COMMON_DISCLAIMER, DRUG_CLASS, REGISTRY } from "@/lib/prom/registry";
import { bandFor, mohRiskFor, nextDueDate } from "@/lib/prom/scoring";
import type { DiaryEntry, ScoreRecord } from "@/lib/prom/types";
import { usePromContext } from "../PromContext";
import { monthlyDrugDayCounts, num, todayISO } from "../state";
import { BackButton } from "./BackButton";

const fmt = (v: number | undefined): string => (typeof v === "number" ? v.toFixed(1) : "—");

/**
 * Finds the most recent score record for an instrument.
 *
 * @param records - The score records to search
 * @param instrumentId - The instrument identifier to match
 * @returns The newest matching score record, or `null` if none exists
 */
function latestRecord(records: ScoreRecord[], instrumentId: string): ScoreRecord | null {
  let latest: ScoreRecord | null = null;
  for (const r of records) {
    if (r.instrumentId === instrumentId && (latest === null || r.createdAt > latest.createdAt)) {
      latest = r;
    }
  }
  return latest;
}

/**
 * Gets the most recent score records for a specific instrument.
 *
 * @param records - The score records to search
 * @param instrumentId - The instrument identifier to match
 * @param n - The maximum number of records to return
 * @returns The latest matching records ordered from oldest to newest
 */
function lastN(records: ScoreRecord[], instrumentId: string, n: number): ScoreRecord[] {
  return records
    .filter((r) => r.instrumentId === instrumentId)
    .sort((a, b) => (a.createdAt < b.createdAt ? -1 : 1))
    .slice(-n);
}

/**
 * Determines whether a date falls within the last given number of days.
 *
 * @param dateISO - An ISO date string to test
 * @param days - The number of days in the lookback window
 * @returns `true` if `dateISO` is a string and the date is within the last `days` days, `false` otherwise.
 */
function withinDays(dateISO: string, days: number): boolean {
  if (typeof dateISO !== "string") return false;
  const target = nextDueDate(dateISO, `P${days}D`);
  return target !== null && target >= todayISO();
}

/**
 * Summarizes the 2-hour post-dose NRS effect for drugs recorded in a diary entry.
 *
 * @param en - The diary entry to summarize
 * @returns A joined effect summary for drugs with a numeric 2-hour NRS value, or `—` when none are available
 */
function drugEffectText(en: DiaryEntry): string {
  const ds = (en.drugs ?? []).filter((d) => typeof d.effectNrs2h === "number");
  if (!ds.length) return "—";
  const peak = typeof en.nrs?.peak === "number" ? en.nrs.peak : null;
  return ds
    .map((d) =>
      peak !== null ? `ピーク${peak}→2h後${d.effectNrs2h}` : `2h後 NRS ${d.effectNrs2h}`
    )
    .join("、");
}

/**
 * Renders a HIT-6 trend chart as vertical bars.
 *
 * @param series - Chart points with a label and value
 * @param maxV - Maximum value used to scale the bar heights
 */
function Trend({ series, maxV }: { series: { x: string; v: number }[]; maxV: number }) {
  return (
    <div className="c-trend">
      {series.map((p) => {
        const pct = Math.max(4, Math.round((p.v / maxV) * 100));
        return (
          <div className="c-bar" key={`${p.x}-${p.v}`}>
            <div className="c-barv">{p.v}</div>
            <div className="c-barfill" style={{ height: `${pct}%` }} />
            <div className="c-barx">{p.x}</div>
          </div>
        );
      })}
    </div>
  );
}

/**
 * Renders a printable physician-facing headache evaluation report.
 *
 * The report summarizes the current month’s headache and acute medication days, MOH risk by drug class,
 * the latest PROM scores, recent HIT-6 trend and MCID change, and a two-week headache diary summary.
 */
export function ReportView() {
  const { data } = usePromContext();
  const ym = todayISO().slice(0, 7);
  const records = data.scores.records;

  const monthEntries = data.diary.entries.filter(
    (e) => typeof e.date === "string" && e.date.slice(0, 7) === ym
  );
  const headacheDays = new Set(monthEntries.map((e) => e.date)).size;
  const medDaysSet = new Set<string>();
  for (const e of monthEntries) {
    if ((e.drugs ?? []).length) medDaysSet.add(e.date);
  }
  const counts = monthlyDrugDayCounts(data.diary.entries, ym);

  const hit6Series = lastN(records, "hit6", 3);
  let mcidNote: { meaningful: boolean; delta: number } | null = null;
  if (hit6Series.length >= 2) {
    const a = hit6Series[hit6Series.length - 1].total ?? 0;
    const b = hit6Series[hit6Series.length - 2].total ?? 0;
    const delta = a - b;
    mcidNote = { meaningful: delta <= -6, delta };
  }

  const recent = data.diary.entries
    .filter((e) => withinDays(e.date, 14))
    .slice()
    .reverse();

  return (
    <>
      <BackButton noPrint />
      <div className="c-btnrow no-print" style={{ marginBottom: "8px" }}>
        <button type="button" className="c-btn" onClick={() => window.print()}>
          🖨️ 印刷 / PDF 保存
        </button>
      </div>
      <div className="print-container">
        <div className="c-card">
          <div className="c-eyebrow">医師共有用レポート</div>
          <h1 style={{ margin: "6px 0" }}>頭痛評価レポート</h1>
          <p className="c-small c-muted">
            出力日: {todayISO()} ／ 評価対象期間: {ym}（当月）・日誌は直近2週間
          </p>
        </div>

        <div className="c-card">
          <h2>基本サマリー</h2>
          <table className="c-tbl">
            <tbody>
              <tr>
                <th>当月の総頭痛日数</th>
                <td>{headacheDays} 日</td>
              </tr>
              <tr>
                <th>当月の急性期薬 服用日数</th>
                <td>{medDaysSet.size} 日</td>
              </tr>
            </tbody>
          </table>
          <h3>MOH リスク判定（ICHD-3 8.2）</h3>
          <table className="c-tbl">
            <thead>
              <tr>
                <th>薬剤分類</th>
                <th>服用日数</th>
                <th>閾値</th>
                <th>判定</th>
              </tr>
            </thead>
            <tbody>
              {Object.keys(DRUG_CLASS).map((cls) => {
                const days = counts[cls] || 0;
                const r = mohRiskFor(days, cls);
                const level = r.ok ? r.value.level : "safe";
                const txt =
                  level === "overuse" ? "乱用超過" : level === "caution" ? "注意" : "安全域";
                return (
                  <tr key={cls}>
                    <td>{DRUG_CLASS[cls].label}</td>
                    <td>{days} 日</td>
                    <td>{DRUG_CLASS[cls].threshold} 日</td>
                    <td>{txt}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="c-card">
          <h2>最新 PROM スコア</h2>
          <table className="c-tbl">
            <thead>
              <tr>
                <th>尺度</th>
                <th>スコア</th>
                <th>臨床判定</th>
              </tr>
            </thead>
            <tbody>
              {["hit6", "midas", "msq-v2.1", "pgic"].map((id) => {
                const def = REGISTRY[id];
                const rec = latestRecord(records, id);
                if (!rec) {
                  return (
                    <tr key={id}>
                      <td>{def.title}</td>
                      <td>未評価</td>
                      <td>—</td>
                    </tr>
                  );
                }
                let scoreText = "";
                let interp = "";
                if (rec.domains) {
                  scoreText = `RFR ${fmt(rec.domains.rfr)} / RFP ${fmt(rec.domains.rfp)} / EF ${fmt(rec.domains.ef)}`;
                  interp = "（高いほど良好）";
                } else if (typeof rec.total === "number") {
                  const unit =
                    id === "hit6" ? " 点" : id === "midas" ? " 日" : id === "pgic" ? " / 7" : "";
                  scoreText = `${rec.total}${unit}`;
                  const band = bandFor(rec.total, def.interpretationBands ?? []);
                  interp =
                    id === "pgic"
                      ? rec.interpretation === "favorable"
                        ? "改善あり"
                        : "明確な改善なし"
                      : band
                        ? band.label
                        : "";
                }
                return (
                  <tr key={id}>
                    <td>
                      {def.title}
                      <div className="c-small c-muted">{rec.date}</div>
                    </td>
                    <td>{scoreText}</td>
                    <td>{interp}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="c-card">
          <h2>推移と臨床的変化（HIT-6 直近3回）</h2>
          {hit6Series.length ? (
            <Trend series={hit6Series.map((r) => ({ x: r.date, v: r.total ?? 0 }))} maxV={78} />
          ) : (
            <p className="c-muted">HIT-6 の記録が不足しています（推移には2回以上が必要）。</p>
          )}
          {mcidNote ? (
            <div className={`c-alert ${mcidNote.meaningful ? "c-alert--info" : "c-alert--warn"}`}>
              前回比 {mcidNote.delta > 0 ? "+" : ""}
              {mcidNote.delta} 点 —{" "}
              {mcidNote.meaningful
                ? "慢性片頭痛の MCID（≥6点改善）を満たす臨床的に意味のある改善。"
                : "MCID（≥6点改善）には未到達。"}
            </div>
          ) : null}
        </div>

        <div className="c-card page-break">
          <h2>頭痛日誌サマリー（直近2週間）</h2>
          <table className="c-tbl">
            <thead>
              <tr>
                <th>日付</th>
                <th>時間</th>
                <th>
                  NRS
                  <br />
                  発症/ピーク/2h後
                </th>
                <th>薬剤（時刻）</th>
                <th>服薬2h後の変化</th>
              </tr>
            </thead>
            <tbody>
              {recent.length ? (
                recent.map((en) => (
                  <tr key={en.id}>
                    <td>{en.date}</td>
                    <td>{`${en.startTime || "—"}〜${en.endTime || "—"}`}</td>
                    <td>{`${num(en.nrs?.onset)}/${num(en.nrs?.peak)}/${num(en.nrs?.post2h)}`}</td>
                    <td>
                      {(en.drugs ?? [])
                        .map((d) => d.name + (d.time ? `(${d.time})` : ""))
                        .join("、") || "—"}
                    </td>
                    <td>{drugEffectText(en)}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="c-muted">
                    直近2週間の記録がありません。
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="c-card">
          <h3>免責・出典</h3>
          <p className="c-small">
            {COMMON_DISCLAIMER} HIT-6/MIDAS/MSQ などの質問票は前向き頭痛日誌を代替しません（REFORM
            2026）。
          </p>
          <p className="c-small c-muted">
            出典: HIT-6 © QualityMetric（学術可・商用要許諾, Sakai 2004）／ MSQ v2.1 Mapi Research
            Trust（要許諾, Speck 2019/2021）／ MIDAS（Iigaya 2003）／ PGIC パブリックドメイン（Guy
            1976）／ NRS・VAS（IHS / FDA）。
          </p>
        </div>
      </div>
    </>
  );
}
