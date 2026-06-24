"use client";

import { createContext, useContext } from "react";
import type { StorageAdapter } from "@/lib/prom/types";
import type { AppData } from "./state";

/**
 * シェル各ビューが共有する状態・操作の契約。
 * 描画コンポーネントは具体実装ではなくこの契約のみに依存する（依存性逆転）。
 */
export interface PromContextValue {
  /** 現在のアプリ状態（settings/snoop/diary/scores）。 */
  data: AppData;
  /** ルーティング更新を強制トリガーするための nonce。 */
  routeNonce: number;
  /** 次状態を確定し全 4 キーを永続化する（元 persistAll 相当）。 */
  commit: (next: AppData | ((prev: AppData) => AppData)) => Promise<void>;
  /** ハッシュルーティング遷移（元 navigate）。同一ハッシュでも再描画する。 */
  navigate: (hash: string) => void;
  /** 一時通知（元 toast）。 */
  toast: (msg: string) => void;
  /** SNOOP4 陽性時の緊急ダイアログを開く（遷移ブロック）。 */
  openUrgent: (flags: string[]) => void;
  /** 現在ダークテーマが有効か（Mermaid 再描画などに使用）。 */
  isDark: boolean;
  /** 永続化アダプタ（DataManager のエクスポート/インポートで使用）。 */
  store: StorageAdapter;
  /** ストアから状態を再読込（インポート/全削除後）。 */
  reload: () => Promise<void>;
}

const PromContext = createContext<PromContextValue | null>(null);

export const PromProvider = PromContext.Provider;

/**
 * Gets the shared PROM context.
 *
 * @returns The current `PromContextValue`.
 * @throws Error if called outside `PromProvider`.
 */
export function usePromContext(): PromContextValue {
  const ctx = useContext(PromContext);
  if (ctx === null) {
    throw new Error("usePromContext は PromProvider の内側で使用してください");
  }
  return ctx;
}
