"use client";

import type { Settings } from "@/lib/prom/types";
import { usePromContext } from "./PromContext";

const THEME_LABEL: Record<Settings["theme"], string> = {
  auto: "🌗 自動",
  light: "☀️ ライト",
  dark: "🌙 ダーク",
};

/** 上部固定ヘッダ（ブランド・主要ナビ・テーマ切替）。元 index.html の app-header。 */
export function Header({
  theme,
  onCycleTheme,
}: {
  theme: Settings["theme"];
  onCycleTheme: () => void;
}) {
  const { navigate } = usePromContext();
  return (
    <header className="app-header no-print">
      <div className="c-brand">
        <span className="c-dot" aria-hidden="true" />
        <span>頭痛 PROM チェッカー</span>
      </div>
      <span className="c-spacer" />
      <nav aria-label="主要ナビゲーション" style={{ display: "flex", gap: "8px" }}>
        <button type="button" className="c-iconbtn" onClick={() => navigate("#/dashboard")}>
          ホーム
        </button>
        <button type="button" className="c-iconbtn" onClick={() => navigate("#/report")}>
          レポート
        </button>
      </nav>
      <button
        type="button"
        className="c-iconbtn"
        aria-label="表示テーマを切り替え"
        title="テーマ: 自動 / ライト / ダーク"
        onClick={onCycleTheme}
      >
        {THEME_LABEL[theme]}
      </button>
    </header>
  );
}
