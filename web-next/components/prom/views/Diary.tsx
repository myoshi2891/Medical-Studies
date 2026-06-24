"use client";

import { type FormEvent, useState } from "react";
import { DRUG_CLASS } from "@/lib/prom/registry";
import { mohRiskFor } from "@/lib/prom/scoring";
import type { DiaryDrug, DiaryEntry } from "@/lib/prom/types";
import { usePromContext } from "../PromContext";
import {
  DIARY_OPTS,
  impactLabel,
  monthlyDrugDayCounts,
  num,
  timeDiffMins,
  todayISO,
} from "../state";
import { BackButton } from "./BackButton";

interface DrugRow {
  id: number;
  name: string;
  free: string;
  cls: string;
  dose: string;
  time: string;
  eff: string;
}

function newDrugRow(id: number): DrugRow {
  return { id, name: "", free: "", cls: "simple-nsaid", dose: "", time: "", eff: "" };
}

/** チップ群（チェックボックス/ラジオ）を描画。元 chipset。 */
function ChipSet({
  name,
  opts,
  type,
}: {
  name: string;
  opts: readonly string[];
  type: "checkbox" | "radio";
}) {
  return (
    <div className="c-chips">
      {opts.map((o) => (
        <label className="c-chip" key={o}>
          <input type={type} name={name} value={o} />
          <span>{o}</span>
        </label>
      ))}
    </div>
  );
}

/** ビュー: 頭痛日誌（前向き記録）。元 renderDiary / saveDiary / renderMohPanel。 */
export function Diary() {
  const { data, commit, toast } = usePromContext();
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [rowSeq, setRowSeq] = useState(0);
  const [drugRows, setDrugRows] = useState<DrugRow[]>([]);

  const recent = data.diary.entries.slice().reverse().slice(0, 8);

  function addDrugRow() {
    setDrugRows((prev) => [...prev, newDrugRow(rowSeq)]);
    setRowSeq((n) => n + 1);
  }
  function updateRow(id: number, patch: Partial<DrugRow>) {
    setDrugRows((prev) => prev.map((r) => (r.id === id ? { ...r, ...patch } : r)));
  }

  function durationHint(): string {
    if (!start || !end) return "";
    const mins = timeDiffMins(start, end);
    if (mins === null || mins < 0) return "";
    const h = Math.floor(mins / 60);
    const m = mins % 60;
    let note = "";
    if (mins >= 240 && mins <= 4320) note = "（片頭痛の診断基準 4〜72 時間に合致）";
    else if (mins >= 30 && mins <= 10080) note = "（緊張型頭痛の範囲 30分〜7日に合致）";
    return `持続時間: ${h}時間${m}分 ${note}`;
  }

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    const getChecked = (name: string): string[] => fd.getAll(name).map(String);
    const numOrNull = (name: string): number | null => {
      const v = fd.get(name);
      if (v === null || v === "") return null;
      const n = Number(v);
      return Number.isFinite(n) ? n : null;
    };

    const drugs: DiaryDrug[] = drugRows
      .map((r): DiaryDrug | null => {
        const name = r.name || r.free.trim();
        if (!name) return null;
        return {
          name,
          class: r.cls,
          dose: r.dose.trim(),
          time: r.time,
          effectNrs2h: r.eff === "" ? null : Number(r.eff),
        };
      })
      .filter((d): d is DiaryDrug => d !== null);

    const impactRaw = fd.get("d_impact");
    const entry: DiaryEntry = {
      id: `diary_${Date.now()}`,
      createdAt: new Date().toISOString(),
      date: todayISO(),
      startTime: start,
      endTime: end,
      sides: getChecked("d_sides"),
      locations: getChecked("d_loc"),
      quality: getChecked("d_quality"),
      nrs: {
        onset: numOrNull("d_nrs_onset"),
        peak: numOrNull("d_nrs_peak"),
        post2h: numOrNull("d_nrs_post"),
      },
      symptoms: getChecked("d_sym"),
      aura: getChecked("d_aura"),
      prodrome: getChecked("d_prod"),
      drugs,
      triggers: getChecked("d_trig"),
      sleep: {
        bedtime: String(fd.get("d_bed") ?? ""),
        waketime: String(fd.get("d_wake") ?? ""),
        quality: numOrNull("d_sleepq"),
        stress: numOrNull("d_stress"),
      },
      impact: impactRaw === null ? null : Number(String(impactRaw).charAt(0)),
    };

    commit({ ...data, diary: { ...data.diary, entries: [...data.diary.entries, entry] } })
      .then(() => {
        toast("日誌を保存しました");
        setStart("");
        setEnd("");
        setDrugRows([]);
        form.reset();
      })
      .catch((err) => toast(err.message));
  }

  return (
    <>
      <BackButton />
      <div className="c-viewhead">
        <div className="c-eyebrow">頭痛日誌（前向き記録）</div>
        <h1>今日の頭痛を記録</h1>
        <p>
          記録には自動でタイムスタンプが付き、
          <strong>過去日付での入力（バックデート）はできません</strong>
          （記録の遡及改変を防ぐデータ完全性の不変条件）。
        </p>
      </div>

      <MohPanel />

      <form className="c-card" onSubmit={onSubmit}>
        <div className="c-row">
          <div className="c-field">
            <label className="c-flabel" htmlFor="d_date">
              日付（本日固定）
            </label>
            <input
              className="c-input"
              type="date"
              id="d_date"
              defaultValue={todayISO()}
              min={todayISO()}
              max={todayISO()}
              readOnly
            />
          </div>
          <div className="c-field">
            <label className="c-flabel" htmlFor="d_start">
              開始時刻
            </label>
            <input
              className="c-input"
              type="time"
              id="d_start"
              value={start}
              onChange={(e) => setStart(e.currentTarget.value)}
            />
          </div>
          <div className="c-field">
            <label className="c-flabel" htmlFor="d_end">
              終了時刻
            </label>
            <input
              className="c-input"
              type="time"
              id="d_end"
              value={end}
              onChange={(e) => setEnd(e.currentTarget.value)}
            />
          </div>
        </div>
        <div className="c-small c-muted">{durationHint()}</div>

        <fieldset className="c-fs">
          <legend>痛みの部位</legend>
          <div className="c-field">
            <span className="c-flabel">左右</span>
            <ChipSet name="d_sides" opts={DIARY_OPTS.sides} type="checkbox" />
          </div>
          <div className="c-field">
            <span className="c-flabel">場所（複数可）</span>
            <ChipSet name="d_loc" opts={DIARY_OPTS.locations} type="checkbox" />
          </div>
          <div className="c-field">
            <span className="c-flabel">性質</span>
            <ChipSet name="d_quality" opts={DIARY_OPTS.quality} type="checkbox" />
          </div>
        </fieldset>

        <fieldset className="c-fs">
          <legend>痛みの強度（NRS 0〜10・3時点, IHS標準）</legend>
          <div className="c-row">
            <div className="c-field">
              <label className="c-flabel" htmlFor="d_nrs_onset">
                発症時
              </label>
              <input
                className="c-input"
                type="number"
                min={0}
                max={10}
                step={1}
                id="d_nrs_onset"
                name="d_nrs_onset"
              />
            </div>
            <div className="c-field">
              <label className="c-flabel" htmlFor="d_nrs_peak">
                ピーク時
              </label>
              <input
                className="c-input"
                type="number"
                min={0}
                max={10}
                step={1}
                id="d_nrs_peak"
                name="d_nrs_peak"
              />
            </div>
            <div className="c-field">
              <label className="c-flabel" htmlFor="d_nrs_post">
                服薬2時間後
              </label>
              <input
                className="c-input"
                type="number"
                min={0}
                max={10}
                step={1}
                id="d_nrs_post"
                name="d_nrs_post"
              />
            </div>
          </div>
          <p className="c-small c-muted">NRS ≥ 4 は急性期薬投与の標準的な目安です。</p>
        </fieldset>

        <fieldset className="c-fs">
          <legend>随伴症状・前兆・予兆/後兆</legend>
          <div className="c-field">
            <span className="c-flabel">随伴症状（複数可）</span>
            <ChipSet name="d_sym" opts={DIARY_OPTS.symptoms} type="checkbox" />
          </div>
          <div className="c-field">
            <span className="c-flabel">前兆（複数可）</span>
            <ChipSet name="d_aura" opts={DIARY_OPTS.aura} type="checkbox" />
            <div className="c-alert c-alert--warn" style={{ marginTop: "8px" }}>
              運動麻痺・脳幹性前兆がある場合は神経内科への相談が必要で、トリプタン禁忌の可能性があります。
            </div>
          </div>
          <div className="c-field">
            <span className="c-flabel">予兆・後兆（複数可）</span>
            <ChipSet name="d_prod" opts={DIARY_OPTS.prodrome} type="checkbox" />
          </div>
        </fieldset>

        <fieldset className="c-fs">
          <legend>使用した薬剤（MOH 検出の基礎データ）</legend>
          <div>
            {drugRows.map((row) => (
              <div className="c-row" style={{ marginBottom: "8px" }} key={row.id}>
                <div className="c-field">
                  <span className="c-flabel">薬剤名</span>
                  <select
                    className="c-select"
                    value={row.name}
                    onChange={(e) => {
                      const selName = e.currentTarget.value;
                      const med = data.settings.medicationList.find((m) => m.name === selName);
                      updateRow(row.id, { name: selName, ...(med ? { cls: med.class } : {}) });
                    }}
                  >
                    <option value="">選択または自由記入</option>
                    {data.settings.medicationList.map((m) => (
                      <option value={m.name} key={m.name}>
                        {m.name}
                      </option>
                    ))}
                  </select>
                  <input
                    className="c-input"
                    type="text"
                    placeholder="自由記入（任意）"
                    style={{ marginTop: "6px" }}
                    value={row.free}
                    onChange={(e) => updateRow(row.id, { free: e.currentTarget.value })}
                  />
                </div>
                <div className="c-field">
                  <span className="c-flabel">分類（MOH判定）</span>
                  <select
                    className="c-select"
                    value={row.cls}
                    onChange={(e) => updateRow(row.id, { cls: e.currentTarget.value })}
                  >
                    <option value="simple-nsaid">単純鎮痛薬/NSAIDs（月15日）</option>
                    <option value="triptan-ergot-opioid-combo">トリプタン等/複合（月10日）</option>
                  </select>
                </div>
                <div className="c-field">
                  <span className="c-flabel">用量</span>
                  <input
                    className="c-input"
                    type="text"
                    placeholder="例: 50mg"
                    value={row.dose}
                    onChange={(e) => updateRow(row.id, { dose: e.currentTarget.value })}
                  />
                </div>
                <div className="c-field">
                  <span className="c-flabel">服用時刻</span>
                  <input
                    className="c-input"
                    type="time"
                    value={row.time}
                    onChange={(e) => updateRow(row.id, { time: e.currentTarget.value })}
                  />
                </div>
                <div className="c-field">
                  <span className="c-flabel">2時間後の効果 NRS</span>
                  <input
                    className="c-input"
                    type="number"
                    min={0}
                    max={10}
                    step={1}
                    value={row.eff}
                    onChange={(e) => updateRow(row.id, { eff: e.currentTarget.value })}
                  />
                </div>
              </div>
            ))}
          </div>
          <div className="c-btnrow">
            <button type="button" className="c-btn c-btn--ghost" onClick={addDrugRow}>
              ＋ 薬剤を追加
            </button>
          </div>
        </fieldset>

        <fieldset className="c-fs">
          <legend>誘発因子（トリガー・複数可）</legend>
          <ChipSet name="d_trig" opts={DIARY_OPTS.triggers} type="checkbox" />
        </fieldset>

        <fieldset className="c-fs">
          <legend>睡眠・生活</legend>
          <div className="c-row">
            <div className="c-field">
              <label className="c-flabel" htmlFor="d_bed">
                就寝時刻
              </label>
              <input className="c-input" type="time" id="d_bed" name="d_bed" />
            </div>
            <div className="c-field">
              <label className="c-flabel" htmlFor="d_wake">
                起床時刻
              </label>
              <input className="c-input" type="time" id="d_wake" name="d_wake" />
            </div>
            <div className="c-field">
              <label className="c-flabel" htmlFor="d_sleepq">
                睡眠の質 NRS(0〜10)
              </label>
              <input
                className="c-input"
                type="number"
                min={0}
                max={10}
                step={1}
                id="d_sleepq"
                name="d_sleepq"
              />
            </div>
            <div className="c-field">
              <label className="c-flabel" htmlFor="d_stress">
                ストレス NRS(0〜10)
              </label>
              <input
                className="c-input"
                type="number"
                min={0}
                max={10}
                step={1}
                id="d_stress"
                name="d_stress"
              />
            </div>
          </div>
        </fieldset>

        <fieldset className="c-fs">
          <legend>日常生活への影響（MIDAS 算出の基礎）</legend>
          <ChipSet name="d_impact" opts={DIARY_OPTS.impact} type="radio" />
        </fieldset>

        <div className="c-btnrow">
          <button type="submit" className="c-btn">
            日誌を保存する
          </button>
        </div>
      </form>

      <div className="c-card">
        <h2>最近の記録</h2>
        <table className="c-tbl">
          <thead>
            <tr>
              <th>日付</th>
              <th>時間</th>
              <th>NRS（発症/ピーク/2h後）</th>
              <th>薬剤</th>
              <th>影響</th>
            </tr>
          </thead>
          <tbody>
            {recent.length ? (
              recent.map((en) => (
                <tr key={en.id}>
                  <td>{en.date}</td>
                  <td>{`${en.startTime || "—"}〜${en.endTime || "—"}`}</td>
                  <td>
                    発症{num(en.nrs?.onset)} / ピーク{num(en.nrs?.peak)} / 2h後{num(en.nrs?.post2h)}
                  </td>
                  <td>{(en.drugs ?? []).map((d) => d.name).join("、") || "—"}</td>
                  <td>{impactLabel(en.impact)}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="c-muted">
                  まだ記録がありません。
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}

/** MOH リスクパネル（当月の薬剤分類別 服用日数 → 純粋関数 mohRiskFor で判定）。 */
function MohPanel() {
  const { data } = usePromContext();
  const ym = todayISO().slice(0, 7);
  const counts = monthlyDrugDayCounts(data.diary.entries, ym);

  return (
    <div className="c-card">
      <h2>MOH リスク（{ym} の当月集計）</h2>
      <p className="c-small c-muted">
        薬剤の使用過多による頭痛（ICHD-3 8.2）の自動判定。確定診断には「3ヶ月継続」が必要です。
      </p>
      <table className="c-tbl">
        <thead>
          <tr>
            <th>薬剤分類</th>
            <th>当月の服用日数</th>
            <th>基準</th>
            <th>判定</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(DRUG_CLASS).map((cls) => {
            const days = counts[cls] || 0;
            const r = mohRiskFor(days, cls);
            const level = r.ok ? r.value.level : "safe";
            return (
              <tr key={cls}>
                <td>{DRUG_CLASS[cls].label}</td>
                <td className="c-due">{days} 日 / 月</td>
                <td>閾値 {DRUG_CLASS[cls].threshold} 日</td>
                <td>
                  {level === "overuse" ? (
                    <span className="c-badge c-badge--over">乱用超過</span>
                  ) : level === "caution" ? (
                    <span className="c-badge c-badge--caution">注意</span>
                  ) : (
                    <span className="c-badge c-badge--safe">安全域</span>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
