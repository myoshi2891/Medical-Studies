"use client";

import { useRef } from "react";
import { SCHEMA_VERSION } from "@/lib/prom/storage";
import type { Settings } from "@/lib/prom/types";
import { usePromContext } from "../PromContext";
import { todayISO } from "../state";
import { BackButton } from "./BackButton";

/** ビュー: データ管理（JSON エクスポート/インポート・設定・全削除）。元 renderData。 */
export function DataManager() {
  const { data, commit, navigate, toast, store, reload } = usePromContext();
  const fileRef = useRef<HTMLInputElement>(null);
  const variantRef = useRef<HTMLSelectElement>(null);
  const startRef = useRef<HTMLInputElement>(null);

  function onExport() {
    store
      .exportAll()
      .then((json) => {
        const blob = new Blob([json], { type: "application/json" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `headache-prom-export-${todayISO()}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        toast("エクスポートしました");
      })
      .catch((e) => toast(e.message));
  }

  function onImport() {
    const file = fileRef.current?.files?.[0];
    if (!file) {
      toast("ファイルを選択してください");
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      const text = typeof reader.result === "string" ? reader.result : "";
      store
        .importAll(text)
        .then(() => reload())
        .then(() => {
          toast("インポートしました");
          navigate("#/dashboard");
        })
        .catch((e) => toast(e.message));
    };
    reader.onerror = () => toast("ファイルの読み込みに失敗しました");
    reader.readAsText(file);
  }

  function onSaveSettings() {
    const variant = (
      variantRef.current?.value === "descending" ? "descending" : "ascending"
    ) as Settings["pgicVariant"];
    const treatmentStartDate = startRef.current?.value ?? "";
    commit({ ...data, settings: { ...data.settings, pgicVariant: variant, treatmentStartDate } })
      .then(() => toast("設定を保存しました"))
      .catch((e) => toast(e.message));
  }

  function onWipe() {
    if (!window.confirm("すべてのローカルデータを削除します。元に戻せません。よろしいですか？")) {
      return;
    }
    store
      .clearAll()
      .then(() => reload())
      .then(() => {
        toast("削除しました");
        navigate("#/snoop");
      })
      .catch((e) => toast(e.message));
  }

  return (
    <>
      <BackButton />
      <div className="c-viewhead">
        <div className="c-eyebrow">データ管理</div>
        <h1>エクスポート / インポート</h1>
        <p>
          機種変更やキャッシュ消去に備え、すべてのデータを JSON
          ファイルとして保存・復元できます。データは外部に送信されません。
        </p>
      </div>
      <div className="c-card">
        <h2>エクスポート</h2>
        <p className="c-small c-muted">
          設定・SNOOP 履歴・頭痛日誌・PROM スコアを <code>schemaVersion {SCHEMA_VERSION}</code>{" "}
          付きで書き出します。
        </p>
        <div className="c-btnrow">
          <button type="button" className="c-btn" onClick={onExport}>
            ⬇️ JSON をダウンロード
          </button>
        </div>
      </div>
      <div className="c-card">
        <h2>インポート</h2>
        <p className="c-small c-muted">
          既存データは置き換えられます。<code>schemaVersion</code>{" "}
          不一致時はマイグレーションを適用します。
        </p>
        <div className="c-field">
          <label className="c-flabel" htmlFor="importFile">
            インポートファイルを選択
          </label>
          <input
            className="c-input"
            type="file"
            id="importFile"
            ref={fileRef}
            accept="application/json,.json"
          />
        </div>
        <div className="c-btnrow">
          <button type="button" className="c-btn c-btn--ghost" onClick={onImport}>
            ⬆️ 選択したファイルを読み込む
          </button>
        </div>
      </div>
      <div className="c-card">
        <h2>設定</h2>
        <div className="c-field">
          <label className="c-flabel" htmlFor="setVariant">
            PGIC バージョン
          </label>
          <select
            className="c-select"
            id="setVariant"
            ref={variantRef}
            defaultValue={data.settings.pgicVariant}
          >
            <option value="ascending">昇順版A（高スコア＝改善大・既定）</option>
            <option value="descending">降順版（低スコア＝改善大）</option>
          </select>
        </div>
        <div className="c-field">
          <label className="c-flabel" htmlFor="setStart">
            治療開始日（PGIC の基準）
          </label>
          <input
            className="c-input"
            type="date"
            id="setStart"
            ref={startRef}
            defaultValue={data.settings.treatmentStartDate || ""}
          />
        </div>
        <div className="c-btnrow">
          <button type="button" className="c-btn" onClick={onSaveSettings}>
            設定を保存
          </button>{" "}
          <button type="button" className="c-btn c-btn--danger" onClick={onWipe}>
            すべてのデータを削除
          </button>
        </div>
      </div>
    </>
  );
}
