"use client";

import { SCHEDULE } from "@/lib/prom/registry";
import { nextDueDate } from "@/lib/prom/scoring";
import { usePromContext } from "../PromContext";
import { StorageNotice } from "../StorageNotice";

const TILES = [
  { go: "#/diary", ic: "📓", t: "頭痛日誌", d: "日々の前向き記録・MOH 判定" },
  { go: "#/prom/hit6", ic: "🧭", t: "PROM 評価", d: "HIT-6 / MIDAS / MSQ / PGIC" },
  { go: "#/pain", ic: "🎚️", t: "疼痛強度", d: "NRS / VAS の記録" },
  { go: "#/report", ic: "🖨️", t: "レポート出力", d: "医師共有用 A4（印刷/PDF）" },
  { go: "#/data", ic: "🔒", t: "データ管理", d: "JSON エクスポート/インポート" },
  { go: "#/about", ic: "ℹ️", t: "このアプリについて", d: "設計・出典・免責" },
] as const;

/**
 * Renders the integrated dashboard view.
 *
 * Shows the latest SNOOP4 status, navigation tiles to core sections, and a
 * re-evaluation schedule table with the most recent recorded dates and next due
 * estimates.
 */
export function Dashboard() {
  const { data, navigate } = usePromContext();
  const { snoop, scores, diary } = data;
  const lastSnoop = snoop.history.length ? snoop.history[snoop.history.length - 1] : null;

  const lastRecordDate = (instrumentId: string): string | null => {
    let latest: string | null = null;
    for (const r of scores.records) {
      if (r.instrumentId === instrumentId && (latest === null || r.date > latest)) latest = r.date;
    }
    return latest;
  };

  return (
    <>
      <div className="c-viewhead">
        <div className="c-eyebrow">PROM / PERSONAL WORKSPACE</div>
        <h1>こんにちは。今日の記録を始めましょう</h1>
        <p>
          各機能はここから。入力は通常この端末のブラウザに保存されます。Google Sheets
          への同期を実行した場合は、端末に保存されているすべての頭痛日誌と PROM 評価の記録が Google
          に送信されます。
        </p>
        <div className="c-viewhead-tags">
          <span>頭痛日誌</span>
          <span>PROM 評価</span>
          <span>疼痛強度</span>
        </div>
      </div>
      <StorageNotice />
      <div className="c-card c-safety-card">
        <span className="c-safety-icon" aria-hidden="true">
          ✳
        </span>
        <div className="c-safety-details">
          <div>
            <div className="c-card-kicker">SAFETY CHECK</div>
            <strong>安全確認（SNOOP4）</strong>
            <div className="c-small c-muted">
              {lastSnoop
                ? `最終確認: ${lastSnoop.date}${lastSnoop.result ? "（要注意の該当あり）" : "（該当なし）"}`
                : "未実施"}
            </div>
          </div>
        </div>
        <button type="button" className="c-btn c-btn--ghost" onClick={() => navigate("#/snoop")}>
          再スクリーニング
        </button>
      </div>
      <div className="c-section-heading">
        <div>
          <span className="c-card-kicker">01 / DAILY TOOLS</span>
          <h2>記録・評価を始める</h2>
        </div>
        <p>目的に合わせて入力画面を選んでください。</p>
      </div>
      <div className="c-tiles c-tiles--primary">
        {TILES.slice(0, 3).map((x) => (
          <button type="button" className="c-tile" key={x.go} onClick={() => navigate(x.go)}>
            <span className="c-tile-ic" aria-hidden="true">
              {x.ic}
            </span>
            <span className="c-tile-t">{x.t}</span>
            <span className="c-tile-d">{x.d}</span>
            <span className="c-tile-arrow" aria-hidden="true">
              ↗
            </span>
          </button>
        ))}
      </div>
      <div className="c-section-heading">
        <div>
          <span className="c-card-kicker">02 / REVIEW & SHARE</span>
          <h2>振り返り・データ管理</h2>
        </div>
      </div>
      <div className="c-tiles c-tiles--secondary">
        {TILES.slice(3).map((x) => (
          <button type="button" className="c-tile" key={x.go} onClick={() => navigate(x.go)}>
            <span className="c-tile-ic" aria-hidden="true">
              {x.ic}
            </span>
            <span className="c-tile-t">{x.t}</span>
            <span className="c-tile-d">{x.d}</span>
            <span className="c-tile-arrow" aria-hidden="true">
              ↗
            </span>
          </button>
        ))}
      </div>
      <div className="c-card">
        <div className="c-card-kicker">FOLLOW UP</div>
        <h2>再評価スケジュール</h2>
        <p className="c-small c-muted">
          尺度ごとにリコール期間（想起対象期間）と推奨再評価周期が異なります（設計書
          第5章）。通知機能は将来拡張点です。
        </p>
        <div className="c-table-scroll">
          <table className="c-tbl">
            <thead>
              <tr>
                <th>尺度</th>
                <th>リコール期間</th>
                <th>推奨周期</th>
                <th>次回の目安</th>
              </tr>
            </thead>
            <tbody>
              {SCHEDULE.map((s) => {
                let due = "未評価";
                if (s.id === "diary") {
                  const last = diary.entries.length
                    ? diary.entries[diary.entries.length - 1].date
                    : null;
                  due = last ? `前回 ${last}（毎日）` : "記録なし（毎日）";
                } else {
                  const last = lastRecordDate(s.id);
                  if (last) {
                    const next = nextDueDate(last, s.period);
                    due = `次回 ${next || "—"}（前回 ${last}）`;
                  }
                }
                return (
                  <tr key={s.id}>
                    <td>{s.title}</td>
                    <td>{s.recall}</td>
                    <td>{s.every}</td>
                    <td className="c-due">{due}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
