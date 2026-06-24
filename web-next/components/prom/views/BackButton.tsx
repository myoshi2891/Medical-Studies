"use client";

import { usePromContext } from "../PromContext";

/**
 * Renders a button that navigates back to the dashboard.
 *
 * @param noPrint - Adds the `no-print` class when set to `true`.
 */
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
