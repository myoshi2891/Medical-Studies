"use client";

import { useEffect, useState } from "react";
import type { RestrictedOverlay } from "@/lib/prom/restricted";
import { fetchRestrictedOverlay } from "@/lib/prom/restricted-loader";

/** オーバーレイの取得状態。読込中と「不在確定」を区別する（表示のちらつきを防ぐ）。 */
export type OverlayState =
  | { status: "loading" }
  | { status: "ready"; overlay: RestrictedOverlay | null };

/**
 * ローカル専用オーバーレイを取得する。
 * 本番モードでは fetch せず即座に「不在」を確定させる（restricted-loader の二重ゲート）。
 */
export function useRestrictedOverlay(): OverlayState {
  const [state, setState] = useState<OverlayState>({ status: "loading" });

  useEffect(() => {
    let active = true;
    fetchRestrictedOverlay().then((overlay) => {
      if (active) setState({ status: "ready", overlay });
    });
    return () => {
      active = false;
    };
  }, []);

  return state;
}
