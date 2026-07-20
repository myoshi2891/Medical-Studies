"use client";

import { useRef, useState } from "react";
import { requestAccessToken } from "@/lib/export/google/gis";
import type { ExportContext } from "@/lib/export/types";
import { buildWorkbook } from "@/lib/export/workbook";
import { SCHEMA_VERSION } from "@/lib/prom/storage";
import type { ExportPayload, Settings } from "@/lib/prom/types";
import { usePromContext } from "../PromContext";
import { todayISO } from "../state";
import { useExporters } from "../useExporters";
import { BackButton } from "./BackButton";

/**
 * Renders the data management view for exporting, importing, saving settings, and clearing local data.
 */
export function DataManager() {
  const { data, commit, navigate, toast, store, reload } = usePromContext();
  const fileRef = useRef<HTMLInputElement>(null);
  const variantRef = useRef<HTMLSelectElement>(null);
  const startRef = useRef<HTMLInputElement>(null);

  // 外部連携・同期（設計書 第8章）。エクスポータは宣言的レジストリから供給。
  const exporters = useExporters();
  const csvExporter = exporters.find((e) => e.id === "csv");
  const googleExporter = exporters.find((e) => e.id === "google-sheets");
  const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID ?? "";
  // アクセストークンはメモリ（この state）にのみ保持し、永続化しない（第9章）。
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [consentOpen, setConsentOpen] = useState(false);
  const [syncing, setSyncing] = useState(false);
  const googleSheets = data.settings.syncTargets?.googleSheets;

  /** store.exportAll → ExportPayload → 中間表現へ。 */
  async function buildCurrentWorkbook() {
    const json = await store.exportAll();
    const payload = JSON.parse(json) as ExportPayload;
    return buildWorkbook(payload);
  }

  const errorMessage = (e: unknown): string => (e instanceof Error ? e.message : String(e));

  /** 全タブを CSV でダウンロードする。 */
  function onDownloadCsv() {
    if (!csvExporter) return;
    buildCurrentWorkbook()
      .then((wb) => csvExporter.export(wb, { now: () => new Date() }))
      .then((res) => toast(res.ok ? res.value.detail : res.error))
      .catch((e) => toast(errorMessage(e)));
  }

  /** GIS でアクセストークンを取得（メモリ保持のみ）。 */
  function onConnect() {
    requestAccessToken(clientId)
      .then((res) => {
        if (!res.ok) {
          toast(res.error);
          return;
        }
        setAccessToken(res.value.accessToken);
        toast("Google と接続しました");
      })
      .catch((e) => toast(errorMessage(e)));
  }

  /** 同期ボタン: 未接続なら促し、接続済みなら同意ダイアログを開く。 */
  function onSyncClick() {
    if (!accessToken) {
      toast("先に Google と接続してください");
      return;
    }
    setConsentOpen(true);
  }

  /** 同意後に Google スプレッドシートへ upsert 同期する。 */
  function doSync() {
    setConsentOpen(false);
    if (!googleExporter || !accessToken) return;
    setSyncing(true);
    const ctx: ExportContext = {
      now: () => new Date(),
      google: {
        accessToken,
        spreadsheetId: googleSheets?.spreadsheetId,
        onSpreadsheetCreated: async (id) => {
          await commit((prev) => ({
            ...prev,
            settings: {
              ...prev.settings,
              syncTargets: {
                googleSheets: {
                  spreadsheetId: id,
                  lastSyncedAt: prev.settings.syncTargets?.googleSheets?.lastSyncedAt ?? "",
                },
              },
            },
          }));
        },
      },
    };
    buildCurrentWorkbook()
      .then((wb) => googleExporter.export(wb, ctx))
      .then(async (res) => {
        if (!res.ok) {
          toast(res.error);
          return;
        }
        await commit((prev) => ({
          ...prev,
          settings: {
            ...prev.settings,
            syncTargets: {
              googleSheets: {
                spreadsheetId: prev.settings.syncTargets?.googleSheets?.spreadsheetId ?? "",
                lastSyncedAt: res.value.syncedAt,
              },
            },
          },
        }));
        toast("スプレッドシートへ同期しました");
      })
      .catch((e) => toast(errorMessage(e)))
      .finally(() => setSyncing(false));
  }

  /**
   * Exports all local data as a JSON file.
   */
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

  /**
   * Imports application data from the selected JSON file.
   *
   * Shows a message if no file is selected or the file cannot be read.
   */
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

  /**
   * Saves the selected PGIC variant and treatment start date.
   */
  function onSaveSettings() {
    const variant = (
      variantRef.current?.value === "descending" ? "descending" : "ascending"
    ) as Settings["pgicVariant"];
    const treatmentStartDate = startRef.current?.value ?? "";
    commit((prev) => ({
      ...prev,
      settings: { ...prev.settings, pgicVariant: variant, treatmentStartDate },
    }))
      .then(() => toast("設定を保存しました"))
      .catch((e) => toast(e.message));
  }

  /**
   * Clears all stored local data after user confirmation.
   */
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
          ファイルとして保存・復元できます。記録は通常、この端末のブラウザにのみ保存されます（Google 連携を有効にして同期を実行した場合は、選択したデータが Google に送信されます）。
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
        <h2>外部連携・同期</h2>
        <p className="c-small c-muted">
          記録値を Google スプレッドシートへ手動同期、または CSV でダウンロードします。送信は自分の
          Google Drive にのみ行われ、アクセストークンは保存されません。
        </p>
        <div className="c-btnrow">
          <button
            type="button"
            className="c-btn"
            onClick={onDownloadCsv}
            disabled={!csvExporter?.available}
          >
            CSV をダウンロード
          </button>
        </div>
        <div className="c-field">
          <div className="c-btnrow">
            <button
              type="button"
              className="c-btn c-btn--ghost"
              onClick={onConnect}
              disabled={!googleExporter?.available || !clientId}
            >
              Google と接続
            </button>{" "}
            <button
              type="button"
              className="c-btn"
              onClick={onSyncClick}
              disabled={!googleExporter?.available || syncing}
            >
              スプレッドシートへ同期
            </button>
          </div>
          {accessToken ? <p className="c-small">接続済み（このセッションのみ）</p> : null}
          {googleSheets?.lastSyncedAt ? (
            <p className="c-small c-muted">最終同期: {googleSheets.lastSyncedAt}</p>
          ) : null}
          {googleSheets?.spreadsheetId ? (
            <p className="c-small">
              <a
                href={`https://docs.google.com/spreadsheets/d/${googleSheets.spreadsheetId}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                スプレッドシートを開く
              </a>
            </p>
          ) : null}
        </div>
        {consentOpen ? (
          <div className="c-alert" role="dialog" aria-label="送信内容の確認">
            <p>以下を自分の Google Drive 上のスプレッドシートへ送信します。</p>
            <ul>
              <li>頭痛日誌（日付・NRS・服薬・誘因など）</li>
              <li>PROM スコア（HIT-6 / MIDAS / MSQ / PGIC・疼痛値）</li>
            </ul>
            <p className="c-small c-muted">
              氏名・生年月日などの識別情報はアプリが保持せず、送信もされません。
            </p>
            <div className="c-btnrow">
              <button type="button" className="c-btn" onClick={doSync}>
                同意して同期
              </button>{" "}
              <button
                type="button"
                className="c-btn c-btn--ghost"
                onClick={() => setConsentOpen(false)}
              >
                キャンセル
              </button>
            </div>
          </div>
        ) : null}
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
