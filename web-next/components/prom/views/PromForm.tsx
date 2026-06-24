"use client";

import { type FormEvent, useState } from "react";
import { COMMON_DISCLAIMER, PROM_IDS, REGISTRY } from "@/lib/prom/registry";
import { bandFor, scoreInstrument } from "@/lib/prom/scoring";
import type { Instrument, ScoreRecord, ScoreValue } from "@/lib/prom/types";
import { usePromContext } from "../PromContext";
import { todayISO } from "../state";
import { BackButton } from "./BackButton";

type SubmitState =
  | { kind: "result"; val: ScoreValue; context: Record<string, number>; def: Instrument }
  | { kind: "error"; message: string }
  | null;

/** ビュー: 定期 PROM 評価（元 renderProm / renderInstrumentBody / submitInstrument）。 */
export function PromForm({ instrumentId }: { instrumentId: string }) {
  const { data, commit, navigate, toast } = usePromContext();
  const [submitState, setSubmitState] = useState<SubmitState>(null);

  const id = (PROM_IDS as readonly string[]).includes(instrumentId) ? instrumentId : "hit6";
  // PGIC は設定の variant を採点へ反映（REGISTRY は mutate せず派生 def を渡す）。
  const base = REGISTRY[id];
  const def: Instrument =
    id === "pgic" && base.scoring.method === "single-ordinal"
      ? { ...base, scoring: { ...base.scoring, variant: data.settings.pgicVariant } }
      : base;

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const answers: number[] = [];
    for (let i = 0; i < def.items.length; i++) {
      const raw = fd.get(`${def.id}_q${i + 1}`);
      answers.push(raw === null || raw === "" ? Number.NaN : Number(raw));
    }

    const result = scoreInstrument(answers, def);
    if (!result.ok) {
      setSubmitState({ kind: "error", message: result.error });
      return;
    }

    const context: Record<string, number> = {};
    if (def.contextItems) {
      for (const c of def.contextItems) {
        const raw = fd.get(`ctx_${c.id}`);
        if (raw !== null && raw !== "") context[c.id] = Number(raw);
      }
    }

    const val = result.value;
    const record: ScoreRecord = {
      date: todayISO(),
      createdAt: new Date().toISOString(),
      instrumentId: def.id,
      instrumentVersion: def.version,
      raw: answers,
    };
    if (typeof val.total === "number") record.total = val.total;
    if (val.domains) record.domains = val.domains;
    record.interpretation = val.interpretation;
    if (Object.keys(context).length) record.context = context;

    commit((prev) => ({
      ...prev,
      scores: { ...prev.scores, records: [...prev.scores.records, record] },
    }))
      .then(() => {
        toast(`${def.title} を記録しました`);
        setSubmitState({ kind: "result", val, context, def });
      })
      .catch((err) => toast(err.message));
  }

  return (
    <>
      <BackButton />
      <div className="c-viewhead">
        <div className="c-eyebrow">定期 PROM 評価</div>
        <h1>
          {def.title}
          <span className="c-muted" style={{ fontSize: "1rem", fontWeight: 400 }}>
            {" "}
            — {def.fullName}
          </span>
        </h1>
        <p>{def.summary}</p>
      </div>
      <div className="c-chips no-print" style={{ marginBottom: "16px" }} role="tablist">
        {PROM_IDS.map((pid) => (
          <label className="c-chip" key={pid}>
            <input
              type="radio"
              name="promtab"
              value={pid}
              checked={pid === id}
              onChange={() => navigate(`#/prom/${pid}`)}
            />
            <span>{REGISTRY[pid].title}</span>
          </label>
        ))}
      </div>
      <form className="c-card" onSubmit={onSubmit}>
        <InstrumentBody def={def} />
      </form>
      <div>
        {submitState?.kind === "error" ? (
          <div className="c-card">
            <div className="c-result is-danger">
              <strong>入力を確認してください</strong>
              <div className="c-small">{submitState.message}</div>
            </div>
          </div>
        ) : null}
        {submitState?.kind === "result" ? (
          <InstrumentResult
            def={submitState.def}
            val={submitState.val}
            context={submitState.context}
          />
        ) : null}
      </div>
      <LicenseBlock def={def} />
    </>
  );
}

/** レジストリ駆動: 1 つの関数で 4 質問票のフォーム本体を描画。 */
function InstrumentBody({ def }: { def: Instrument }) {
  if (def.scoring.method === "single-ordinal") {
    return (
      <>
        <div className="c-item">
          <div className="c-qn">{def.items[0].label}</div>
          <div className="c-opts">
            {(def.responseOptions ?? []).map((o) => (
              <label className="c-opt" key={o.value}>
                <input type="radio" name={`${def.id}_q1`} value={o.value} required />
                <span>
                  <strong style={{ fontFamily: "var(--font-outfit, sans-serif)" }}>
                    {o.value}
                  </strong>{" "}
                  {o.label}
                  {o.value >= 5 ? " ★" : ""}
                </span>
              </label>
            ))}
          </div>
        </div>
        <div className="c-alert c-alert--info">
          本アプリの既定は<strong>昇順版A</strong>（高スコア＝改善大、5〜7
          を「臨床的に有意な改善あり」と判定）です。設定の <code>pgicVariant</code>{" "}
          で降順版へ切替可能です。
        </div>
        <div className="c-btnrow">
          <button type="submit" className="c-btn">
            回答を記録する
          </button>
        </div>
      </>
    );
  }

  if (def.inputType === "days" && def.scoring.method === "sum") {
    const inputMax = def.scoring.inputMax ?? 0;
    return (
      <>
        {def.items.map((it, i) => (
          <div className="c-item" key={it.id}>
            <label className="c-qn" htmlFor={`${def.id}_q${i + 1}`}>
              <span className="c-qi">Q{i + 1}</span>
              {it.label}
            </label>
            <input
              className="c-input"
              type="number"
              inputMode="numeric"
              min={0}
              max={inputMax}
              step={1}
              id={`${def.id}_q${i + 1}`}
              name={`${def.id}_q${i + 1}`}
              placeholder={`0〜${inputMax} 日`}
              required
            />
          </div>
        ))}
        <fieldset className="c-fs">
          <legend>補足質問（スコアには加算しません）</legend>
          <p className="c-small c-muted">補足A・Bは臨床的文脈として保存・表示のみ行います。</p>
          {(def.contextItems ?? []).map((c) => (
            <div className="c-field" key={c.id}>
              <label className="c-flabel" htmlFor={`${def.id}_${c.id}`}>
                {c.label}
              </label>
              <input
                className="c-input"
                type="number"
                inputMode="numeric"
                min={c.min}
                max={c.max}
                step={1}
                id={`${def.id}_${c.id}`}
                name={`ctx_${c.id}`}
                placeholder="任意"
              />
            </div>
          ))}
        </fieldset>
        <div className="c-btnrow">
          <button type="submit" className="c-btn">
            合計して記録する
          </button>
        </div>
      </>
    );
  }

  // sum + responseOptions（HIT-6） / domain-rescale（MSQ）: チップで回答
  const submitLabel =
    def.scoring.method === "domain-rescale" ? "換算して記録する" : "合計して記録する";
  return (
    <>
      {def.items.map((it, i) => (
        <div className="c-item" key={it.id}>
          <div className="c-qn">
            <span className="c-qi">Q{i + 1}</span>
            {it.label}
          </div>
          <div className="c-chips">
            {(def.responseOptions ?? []).map((o) => (
              <label className="c-chip" key={o.value}>
                <input type="radio" name={`${def.id}_q${i + 1}`} value={o.value} required />
                <span>{o.label}</span>
              </label>
            ))}
          </div>
        </div>
      ))}
      <div className="c-btnrow">
        <button type="submit" className="c-btn">
          {submitLabel}
        </button>
      </div>
    </>
  );
}

/** 採点結果カード（元 renderInstrumentResult）。 */
function InstrumentResult({
  def,
  val,
  context,
}: {
  def: Instrument;
  val: ScoreValue;
  context: Record<string, number>;
}) {
  const bands = def.interpretationBands ?? [];

  if (def.scoring.method === "domain-rescale") {
    const domains = val.domains ?? {};
    return (
      <div className="c-card">
        <h2>換算結果（高いほど QOL 良好）</h2>
        <table className="c-tbl">
          <thead>
            <tr>
              <th>ドメイン</th>
              <th>スコア</th>
              <th>解釈</th>
              <th>意味のある変化</th>
            </tr>
          </thead>
          <tbody>
            {def.scoring.domains.map((d) => {
              const score = domains[d.id] ?? 0;
              const band = bandFor(score, bands);
              return (
                <tr key={d.id}>
                  <td>{d.label}</td>
                  <td className="c-due">{score.toFixed(1)} / 100</td>
                  <td>{band ? band.label : "—"}</td>
                  <td>MWPC ≥ {d.mwpc}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <div className="c-alert c-alert--info">
          {def.mcid?.note} 絶対値は病型・背景で変動するため、<strong>ベースラインからの変化</strong>
          を主指標としてください。
        </div>
      </div>
    );
  }

  if (def.scoring.method === "single-ordinal") {
    const favorable = val.interpretation === "favorable";
    const opt = (def.responseOptions ?? []).find((o) => o.value === val.total);
    return (
      <div className="c-card">
        <div className={`c-result ${favorable ? "is-success" : ""}`}>
          <div className="c-num">{val.total} / 7</div>
          <div style={{ marginTop: "6px" }}>
            <strong>
              {favorable ? "臨床的に有意な改善あり（favorable）" : "明確な改善とは言えない"}
            </strong>
          </div>
          <div className="c-small c-muted">選択: {opt ? opt.label : ""}</div>
        </div>
        <p className="c-small c-muted" style={{ marginTop: "10px" }}>
          PGIC は他尺度（NRS / HIT-6 / MIDAS）の MCID を導くアンカー指標としても用いられます。
        </p>
      </div>
    );
  }

  // sum
  const total = val.total ?? 0;
  const band = val.band ?? bandFor(total, bands);
  const level = band ? band.level : "info";
  const cls =
    level === "success"
      ? "is-success"
      : level === "warn"
        ? "is-warn"
        : level === "danger"
          ? "is-danger"
          : "";
  const ctxItems =
    def.contextItems && Object.keys(context).length
      ? def.contextItems.filter((c) => context[c.id] !== undefined)
      : [];
  return (
    <div className="c-card">
      <div className={`c-result ${cls}`}>
        <div className="c-num">
          {total}
          {def.id === "hit6" ? " 点" : ""}
        </div>
        <div style={{ marginTop: "6px" }}>
          <strong>{band ? band.label : "判定不能"}</strong>
        </div>
        {def.id === "hit6" ? (
          <div className="c-small c-muted">範囲 36〜78 点</div>
        ) : (
          <div className="c-small c-muted">合計（Q1〜Q5、範囲 0〜270 日）</div>
        )}
        {ctxItems.length ? (
          <div className="c-small c-muted" style={{ marginTop: "8px" }}>
            補足（非加算）:{" "}
            {ctxItems.map((c) => `${c.label.split("：")[0]} = ${context[c.id]}`).join(" / ")}
          </div>
        ) : null}
      </div>
      {def.mcid?.note ? <div className="c-alert c-alert--info">{def.mcid.note}</div> : null}
    </div>
  );
}

/** 出典・著作権・免責ブロック（元 licenseBlock）。 */
function LicenseBlock({ def }: { def: Instrument }) {
  const l = def.license;
  return (
    <div className="c-card">
      <div className="c-license">
        <b>出典・著作権:</b> {l.holder}
        <br />
        <b>利用条件:</b> {l.note}
        <br />
        <b>免責:</b> {COMMON_DISCLAIMER} 質問票は権利者（{l.source}
        ）に帰属します。本実装は教育/個人利用の範囲で提供します。
      </div>
    </div>
  );
}
