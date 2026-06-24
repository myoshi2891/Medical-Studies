"use client";

import "@/app/prom-checker/prom-checker.css";
import { useCallback, useEffect, useRef, useState } from "react";
import { DEFAULT_MEDS } from "@/lib/prom/registry";
import { KEYS, LocalStorageAdapter, SCHEMA_VERSION } from "@/lib/prom/storage";
import type {
  DiaryState,
  ScoresState,
  Settings,
  SnoopState,
  StorageAdapter,
} from "@/lib/prom/types";
import { Header } from "./Header";
import { PromProvider } from "./PromContext";
import { type AppData, defaultSettings } from "./state";
import { Toast } from "./Toast";
import { UrgentDialog } from "./UrgentDialog";
import { About } from "./views/About";
import { Dashboard } from "./views/Dashboard";
import { DataManager } from "./views/DataManager";
import { Diary } from "./views/Diary";
import { PainTracker } from "./views/PainTracker";
import { PromForm } from "./views/PromForm";
import { ReportView } from "./views/ReportView";
import { SelfTestPanel } from "./views/SelfTestPanel";
import { SnoopGate } from "./views/SnoopGate";

const isObject = (v: unknown): v is Record<string, unknown> => typeof v === "object" && v !== null;

/** ストアから 4 キーを読み込み、配列構造を健全化する（元 boot のロード/サニタイズ）。 */
async function loadData(store: StorageAdapter): Promise<AppData> {
  const rawSettings = await store.load(KEYS.settings);
  const settings: Settings = isObject(rawSettings)
    ? (rawSettings as unknown as Settings)
    : defaultSettings();
  if (!Array.isArray(settings.medicationList)) settings.medicationList = DEFAULT_MEDS.slice();

  const rawSnoop = await store.load(KEYS.snoop);
  const snoop: SnoopState = isObject(rawSnoop)
    ? (rawSnoop as unknown as SnoopState)
    : { schemaVersion: SCHEMA_VERSION, history: [] };
  if (!Array.isArray(snoop.history)) snoop.history = [];

  const rawDiary = await store.load(KEYS.diary);
  const diary: DiaryState = isObject(rawDiary)
    ? (rawDiary as unknown as DiaryState)
    : { schemaVersion: SCHEMA_VERSION, entries: [] };
  if (!Array.isArray(diary.entries)) diary.entries = [];

  const rawScores = await store.load(KEYS.scores);
  const scores: ScoresState = isObject(rawScores)
    ? (rawScores as unknown as ScoresState)
    : { schemaVersion: SCHEMA_VERSION, records: [] };
  if (!Array.isArray(scores.records)) scores.records = [];

  return { settings, snoop, diary, scores };
}

/**
 * 描画レイヤのルート（元 index.html の Shell 全体）。
 * 単一クライアントページ + ハッシュ内部ルーターでビューを切り替える（忠実移植）。
 * 状態は useState、永続化は StorageAdapter 経由。テーマは .prom-app の data-theme に宣言的付与。
 */
export function PromApp() {
  const storeRef = useRef<StorageAdapter | null>(null);
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [ready, setReady] = useState(false);
  const [data, setData] = useState<AppData | null>(null);
  const [currentHash, setCurrentHash] = useState("#/dashboard");
  const [toastState, setToastState] = useState({ message: "", show: false });
  const [urgent, setUrgent] = useState<{ open: boolean; flags: string[] }>({
    open: false,
    flags: [],
  });
  const [systemDark, setSystemDark] = useState(false);
  const [routeNonce, setRouteNonce] = useState(0);

  const dataRef = useRef<AppData | null>(null);
  useEffect(() => {
    dataRef.current = data;
  }, [data]);

  // 起動: ストア生成 → ロード → ?selftest=1 / 現在のハッシュで初期ビュー決定。
  useEffect(() => {
    const store = new LocalStorageAdapter(window.localStorage);
    storeRef.current = store;
    let cancelled = false;
    loadData(store)
      .then(async (loaded) => {
        if (cancelled) return;
        // 初回（settings 未保存）なら作成して保存。
        if ((await store.load(KEYS.settings)) === null) {
          await store.save(KEYS.settings, loaded.settings);
          await store.save(KEYS.snoop, loaded.snoop);
          await store.save(KEYS.diary, loaded.diary);
          await store.save(KEYS.scores, loaded.scores);
        }
        if (cancelled) return;
        setData(loaded);
        if (/[?&]selftest=1/.test(window.location.search)) {
          setCurrentHash("#/selftest");
        } else {
          setCurrentHash(window.location.hash || "#/dashboard");
        }
        setReady(true);
      })
      .catch(() => {
        if (cancelled) return;
        setData({
          settings: defaultSettings(),
          snoop: { schemaVersion: SCHEMA_VERSION, history: [] },
          diary: { schemaVersion: SCHEMA_VERSION, entries: [] },
          scores: { schemaVersion: SCHEMA_VERSION, records: [] },
        });
        setReady(true);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  // ハッシュ変更に追従。
  useEffect(() => {
    const onHash = () => setCurrentHash(window.location.hash || "#/dashboard");
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  // OS テーマ追従（auto 時の Mermaid 再描画などに使用）。
  useEffect(() => {
    if (typeof window.matchMedia !== "function") return;
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    setSystemDark(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setSystemDark(e.matches);
    mq.addEventListener?.("change", onChange);
    return () => mq.removeEventListener?.("change", onChange);
  }, []);

  // ハッシュが変わったら緊急オーバーレイを閉じる（元 route 冒頭の closeUrgent）。
  // biome-ignore lint/correctness/useExhaustiveDependencies: currentHash の変化のみを契機にする
  useEffect(() => {
    setUrgent((u) => (u.open ? { ...u, open: false } : u));
  }, [currentHash]);

  const toast = useCallback((message: string) => {
    setToastState({ message, show: true });
    if (toastTimer.current) clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToastState((s) => ({ ...s, show: false })), 2600);
  }, []);

  const navigate = useCallback((hash: string) => {
    if (window.location.hash === hash) {
      setRouteNonce((n) => n + 1);
    } else {
      window.location.hash = hash;
    }
  }, []);

  const commit = useCallback(async (next: AppData | ((prev: AppData) => AppData)) => {
    const prev = dataRef.current;
    if (!prev) return;
    const nextData = typeof next === "function" ? next(prev) : next;
    setData(nextData);
    dataRef.current = nextData;
    const store = storeRef.current;
    if (!store) return;
    await store.save(KEYS.settings, nextData.settings);
    await store.save(KEYS.snoop, nextData.snoop);
    await store.save(KEYS.diary, nextData.diary);
    await store.save(KEYS.scores, nextData.scores);
  }, []);

  const reload = useCallback(async () => {
    const store = storeRef.current;
    if (!store) return;
    setData(await loadData(store));
  }, []);

  const openUrgent = useCallback((flags: string[]) => setUrgent({ open: true, flags }), []);

  // SNOOP4 未完了なら URL も #/snoop へ寄せる（元 route のリダイレクトを忠実化）。
  useEffect(() => {
    if (!ready || data === null) return;
    const v = (currentHash || "#/dashboard").replace(/^#\//, "").split("/")[0] || "dashboard";
    if (!data.settings.hasCompletedSnoop && v !== "snoop" && v !== "selftest") {
      if (window.location.hash !== "#/snoop") window.location.hash = "#/snoop";
    }
  }, [ready, data, currentHash]);

  if (!ready || data === null) {
    return (
      <div className="prom-app" data-theme="auto">
        <main id="main" className="app-main" tabIndex={-1}>
          <div className="c-card">読み込み中…</div>
        </main>
      </div>
    );
  }

  // 早期 return 後に非 null として確定した状態を const へ束ねる（クロージャ内でも narrowing 維持）。
  const appData = data;
  const theme = appData.settings.theme || "auto";
  const isDark = theme === "dark" ? true : theme === "light" ? false : systemDark;

  function cycleTheme() {
    const order: Settings["theme"][] = ["auto", "light", "dark"];
    const next = order[(order.indexOf(theme) + 1) % order.length];
    commit({ ...appData, settings: { ...appData.settings, theme: next } }).catch((e) =>
      toast(e.message)
    );
  }

  // ルーティング（元 route）。
  const raw = currentHash || "#/dashboard";
  const parts = raw.replace(/^#\//, "").split("/");
  const view = parts[0] || "dashboard";
  const param = parts[1] || "";

  // SNOOP4 ゲート: 未完了なら必ずゲートへ（selftest は例外的に到達可）。
  const gated = !data.settings.hasCompletedSnoop && view !== "snoop" && view !== "selftest";

  let body: React.ReactNode;
  if (view === "selftest") body = <SelfTestPanel />;
  else if (gated || view === "snoop") body = <SnoopGate />;
  else if (view === "diary") body = <Diary />;
  else if (view === "prom") body = <PromForm instrumentId={param} />;
  else if (view === "pain") body = <PainTracker />;
  else if (view === "report") body = <ReportView />;
  else if (view === "data") body = <DataManager />;
  else if (view === "about") body = <About />;
  else body = <Dashboard />;

  return (
    <PromProvider
      value={{
        data,
        routeNonce,
        commit,
        navigate,
        toast,
        openUrgent,
        isDark,
        store: storeRef.current as StorageAdapter,
        reload,
      }}
    >
      <div className="prom-app" data-theme={theme}>
        {/* biome-ignore lint/a11y/useValidAnchor: スキップリンクはキーボード操作用で href を持つ必要があるが、ルーター競合を防ぐため preventDefault する */}
        <a
          className="c-skip"
          href="#main"
          onClick={(e) => {
            e.preventDefault();
            document.getElementById("main")?.focus();
          }}
        >
          本文へスキップ
        </a>
        <Header theme={theme} onCycleTheme={cycleTheme} />
        <main id="main" className="app-main" tabIndex={-1}>
          {body}
        </main>
        <footer className="app-footer">
          <p>
            <strong>共通免責:</strong>{" "}
            本ツールは自己評価・記録支援を目的とし、医師の診断ではありません。スコアや解釈は参考情報であり、治療や緊急受診の判断は必ず医療従事者にご相談ください。質問票はそれぞれの権利者に帰属します。データは端末内にのみ保存され、外部へ送信されません（ローカルファースト）。
          </p>
          <p>
            <button type="button" className="c-link" onClick={() => navigate("#/selftest")}>
              開発者向け: スコアリング自己テストを実行
            </button>
          </p>
        </footer>
        <UrgentDialog
          open={urgent.open}
          flags={urgent.flags}
          onRescreen={() => {
            setUrgent({ open: false, flags: [] });
            navigate("#/snoop");
          }}
        />
        <Toast message={toastState.message} show={toastState.show} />
      </div>
    </PromProvider>
  );
}
