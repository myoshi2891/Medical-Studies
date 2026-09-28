"use client";

import Image from "next/image";
import type { Settings } from "@/lib/prom/types";
import { usePromContext } from "./PromContext";

const THEME_LABEL: Record<Settings["theme"], string> = {
  auto: "🌗 自動",
  light: "☀️ ライト",
  dark: "🌙 ダーク",
};

/**
 * Displays the fixed top header with branding, primary navigation, and theme switching.
 */
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
        <Image className="c-brand-icon" src="/icon.svg" alt="" width={38} height={38} />
        <span className="c-brand-copy">
          <span className="c-brand-overline">HEADACHE CARE TOOLS</span>
          <span>頭痛 PROM チェッカー</span>
        </span>
      </div>
      <span className="c-spacer" />
      <nav className="app-header-actions" aria-label="主要ナビゲーション">
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
