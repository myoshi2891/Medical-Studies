"use client";

import type { FormEvent } from "react";
import { COMMON_DISCLAIMER, SNOOP4 } from "@/lib/prom/registry";
import { usePromContext } from "../PromContext";
import { todayISO } from "../state";

/**
 * SNOOP4 の安全確認ゲート画面を表示します。
 *
 * レッドフラッグに該当する項目をチェックしてから、頭痛記録を開始します。
 */
export function SnoopGate() {
  const { commit, navigate, toast, openUrgent } = usePromContext();

  /**
   * Handles submission of the SNOOP4 gate form.
   *
   * @param e - The form submission event.
   */
  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    const flags = SNOOP4.groups
      .map((g, i) => (fd.get(`snoop_${i}`) !== null ? g.name : null))
      .filter((n): n is string => n !== null);
    const result = flags.length > 0;

    if (result) {
      commit((prev) => ({
        ...prev,
        snoop: {
          ...prev.snoop,
          history: [...prev.snoop.history, { date: todayISO(), result, flags }],
        },
        settings: { ...prev.settings, hasCompletedSnoop: false },
      })).catch((err) => toast(err.message));
      openUrgent(flags);
      return;
    }
    commit((prev) => ({
      ...prev,
      snoop: {
        ...prev.snoop,
        history: [...prev.snoop.history, { date: todayISO(), result, flags }],
      },
      settings: { ...prev.settings, hasCompletedSnoop: true },
    }))
      .then(() => {
        toast("安全確認が完了しました");
        navigate("#/dashboard");
      })
      .catch((err) => toast(err.message));
  }

  return (
    <section className="c-gate">
      <div className="c-gate-hero">
        <div className="c-shield" aria-hidden="true">
          🛡️
        </div>
        <div className="c-eyebrow">安全が先、測定は次</div>
        <h1>はじめに安全確認を</h1>
        <p className="c-muted">
          頭痛の記録を始める前に、緊急の対応が必要な「危険なサイン（レッドフラッグ）」がないかを確認します。当てはまるものがあればチェックしてください。
          <strong>1つでも該当する場合は、受診を最優先に案内します。</strong>
        </p>
      </div>
      <form className="c-card" onSubmit={onSubmit}>
        {SNOOP4.groups.map((g, i) => (
          <div className="c-snoop-item" key={`${g.code}-${g.name}`}>
            <div className="c-snoop-code" aria-hidden="true">
              {g.code}
            </div>
            <div className="c-snoop-body">
              <div className="c-snoop-name">{g.name}</div>
              <div className="c-snoop-check">{g.check}</div>
              <div className="c-toggle">
                <label className="c-chip">
                  <input type="checkbox" name={`snoop_${i}`} />
                  <span>当てはまる</span>
                </label>
              </div>
            </div>
          </div>
        ))}
        <div className="c-alert c-alert--info" style={{ marginTop: "16px" }}>
          該当がない場合のみ、ダッシュボードへ進めます。SNOOP4 はスコア化せず
          <strong>関門（ゲート）</strong>として機能します。
        </div>
        <div className="c-btnrow">
          <button type="submit" className="c-btn">
            確認して次へ進む
          </button>
        </div>
      </form>
      <p className="c-license">出典: SNOOP4（二次性頭痛のレッドフラッグ）。{COMMON_DISCLAIMER}</p>
    </section>
  );
}
