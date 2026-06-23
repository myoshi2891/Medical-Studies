"use client";

import { usePromContext } from "../PromContext";

/** ダッシュボードへ戻る共通ボタン（元 各ビュー冒頭の c-back）。 */
export function BackButton({ noPrint = false }: { noPrint?: boolean }) {
  const { navigate } = usePromContext();
  return (
    <button
      type="button"
      className={`c-back${noPrint ? " no-print" : ""}`}
      onClick={() => navigate("#/dashboard")}
    >
      ← ダッシュボード
    </button>
  );
}
