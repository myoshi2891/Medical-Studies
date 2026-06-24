"use client";

import { type FormEvent, useState } from "react";
import { COMMON_DISCLAIMER, PAIN_SCALES } from "@/lib/prom/registry";
import type { ScoreRecord } from "@/lib/prom/types";
import { usePromContext } from "../PromContext";
import { todayISO } from "../state";
import { BackButton } from "./BackButton";

const NRS_VALUES = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10] as const;

/**
 * Renders the pain intensity recording view.
 *
 * Lets the user choose between NRS and VAS, saves the selected scale as a setting, and records pain scores.
 */
export function PainTracker() {
  const { data, commit, toast } = usePromContext();
  const [scale, setScale] = useState<"nrs" | "vas">(
    data.settings.scaleChoice === "vas" ? "vas" : "nrs"
  );

  /**
   * Updates the selected pain scale and saves the preference.
   *
   * @param next - The pain scale to select
   */
  function changeScale(next: "nrs" | "vas") {
    setScale(next);
    commit((prev) => ({
      ...prev,
      settings: { ...prev.settings, scaleChoice: next },
    })).catch((err) => toast(err.message));
  }

  /**
   * Saves a pain score record and shows a confirmation or error message.
   *
   * @param scaleId - The pain scale to record.
   * @param value - The recorded pain score.
   */
  function savePain(scaleId: "nrs" | "vas", value: number) {
    const record: ScoreRecord = {
      date: todayISO(),
      createdAt: new Date().toISOString(),
      instrumentId: scaleId,
      instrumentVersion: "1.0",
      value,
    };
    commit((prev) => ({
      ...prev,
      scores: { ...prev.scores, records: [...prev.scores.records, record] },
    }))
      .then(() =>
        toast(
          `${scaleId.toUpperCase()} を記録しました（${value}${scaleId === "vas" ? " mm" : ""}）`
        )
      )
      .catch((err) => toast(err.message));
  }

  return (
    <>
      <BackButton />
      <div className="c-viewhead">
        <div className="c-eyebrow">疼痛強度の記録</div>
        <h1>いまの痛みの強さ</h1>
        <p>
          NRS と VAS は<strong>相互に直接変換しません</strong>
          。混乱を避けるため、患者ごとに 1 つの尺度を一貫して使用してください（設計書 第3.3③）。
        </p>
      </div>
      <div className="c-card no-print">
        <h2>使用する尺度</h2>
        <div className="c-chips">
          <label className="c-chip">
            <input
              type="radio"
              name="scale"
              value="nrs"
              checked={scale === "nrs"}
              onChange={() => changeScale("nrs")}
            />
            <span>NRS（0〜10 整数）</span>
          </label>
          <label className="c-chip">
            <input
              type="radio"
              name="scale"
              value="vas"
              checked={scale === "vas"}
              onChange={() => changeScale("vas")}
            />
            <span>VAS（連続スライダー）</span>
          </label>
        </div>
        <p className="c-small c-muted" style={{ marginTop: "8px" }}>
          この選択は設定として保存され、一貫性のため既定の尺度になります。
        </p>
      </div>
      <div>{scale === "vas" ? <VasArea onSave={savePain} /> : <NrsArea onSave={savePain} />}</div>
    </>
  );
}

/**
 * Renders the VAS pain entry form.
 *
 * @param onSave - Called with the selected VAS scale identifier and value when the form is submitted.
 */
function VasArea({ onSave }: { onSave: (scale: "vas", value: number) => void }) {
  const s = PAIN_SCALES.vas;
  const { toast } = usePromContext();
  const [touched, setTouched] = useState(false);
  const [value, setValue] = useState(50);

  /**
   * Submits the VAS value when the slider has been interacted with.
   *
   * @param e - The form submission event.
   */
  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!touched) {
      toast("スライダーを操作して強さを示してください");
      return;
    }
    onSave("vas", value);
  }

  return (
    <>
      <form className="c-card" onSubmit={onSubmit}>
        <h2>VAS — {s.fullName}</h2>
        <p className="c-small c-muted">
          目盛りや数値は表示しません。線上の位置をタップ／ドラッグして痛みの強さを示してください（つまみは触れて初めて現れます）。
        </p>
        <div className={`c-vas${touched ? " is-touched" : ""}`}>
          <div className="c-vas-anchors">
            <span>痛みなし</span>
            <span>想像しうる最悪の痛み</span>
          </div>
          <div className="c-vas-track">
            <input
              type="range"
              min={0}
              max={100}
              step={1}
              value={value}
              aria-label="痛みの強さ（VAS、痛みなし〜想像しうる最悪の痛み）"
              onPointerDown={() => setTouched(true)}
              onKeyDown={() => setTouched(true)}
              onChange={(e) => {
                setTouched(true);
                setValue(Number(e.currentTarget.value));
              }}
            />
          </div>
          <div className="c-vas-readout">
            {touched ? (
              <>
                記録される値: <strong>{value} mm</strong> / 100（参考値・通常は患者に提示しません）
              </>
            ) : (
              "まだ記録されていません"
            )}
          </div>
        </div>
        <div className="c-btnrow">
          <button type="submit" className="c-btn" disabled={!touched}>
            この強さで記録する
          </button>
        </div>
      </form>
      <div className="c-card">
        <div className="c-license">
          <b>出典:</b> {s.license.holder}
          <br />
          <b>MCID:</b> {s.mcid}
          <br />
          <b>免責:</b> {COMMON_DISCLAIMER}
        </div>
      </div>
    </>
  );
}

/**
 * Captures an NRS pain score and submits the selected value.
 *
 * @param onSave - Called with the NRS scale key and selected score.
 */
function NrsArea({ onSave }: { onSave: (scale: "nrs", value: number) => void }) {
  const s = PAIN_SCALES.nrs;
  const { toast } = usePromContext();

  /**
   * Submits the selected NRS pain score.
   *
   * Prevents the default form submission, reads the chosen value from the form, and saves it.
   * Shows a prompt if no score has been selected.
   *
   * @param e - The form submission event.
   */
  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const raw = new FormData(e.currentTarget).get("nrs");
    if (raw === null) {
      toast("0〜10 のいずれかを選んでください");
      return;
    }
    onSave("nrs", Number(raw));
  }

  return (
    <>
      <form className="c-card" onSubmit={onSubmit}>
        <h2>NRS — {s.fullName}</h2>
        <p className="c-small c-muted">
          0（痛みなし）〜10（想像しうる最悪の痛み）の整数で選びます。NRS ≥ 4
          は急性期薬投与の標準的な目安です。
        </p>
        <div className="c-nrs" role="radiogroup" aria-label="痛みの強さ（NRS 0〜10）">
          {NRS_VALUES.map((n) => (
            <label className="c-chip" key={n}>
              <input type="radio" name="nrs" value={n} />
              <span>{n}</span>
            </label>
          ))}
        </div>
        <div className="c-nrs-anchors">
          <span>0: 痛みなし</span>
          <span>10: 最悪の痛み</span>
        </div>
        <div className="c-btnrow">
          <button type="submit" className="c-btn">
            この強さで記録する
          </button>
        </div>
      </form>
      <div className="c-card">
        <div className="c-license">
          <b>出典:</b> {s.license.holder}
          <br />
          <b>MCID:</b> {s.mcid}
          <br />
          <b>免責:</b> {COMMON_DISCLAIMER}
        </div>
      </div>
    </>
  );
}
