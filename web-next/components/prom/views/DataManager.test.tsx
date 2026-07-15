/**
 * DataManager「外部連携・同期」カードの UI 契約テスト（設計書 第 8 章・第 11 章）。
 * エクスポータ実行の副作用は起こさず、描画契約（カード見出し・CSV・接続ボタン）のみ固定する。
 */
import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { type PromContextValue, PromProvider } from "@/components/prom/PromContext";
import { defaultSettings } from "@/components/prom/state";
import { DataManager } from "@/components/prom/views/DataManager";
import { SCHEMA_VERSION } from "@/lib/prom/storage";
import type { StorageAdapter } from "@/lib/prom/types";

function buildContext(): PromContextValue {
  const store = {
    load: vi.fn(async () => null),
    save: vi.fn(async () => undefined),
    exportAll: vi.fn(async () => "{}"),
    importAll: vi.fn(async () => undefined),
    clearAll: vi.fn(async () => undefined),
  } as unknown as StorageAdapter;
  return {
    data: {
      settings: defaultSettings(),
      snoop: { schemaVersion: SCHEMA_VERSION, history: [] },
      diary: { schemaVersion: SCHEMA_VERSION, entries: [] },
      scores: { schemaVersion: SCHEMA_VERSION, records: [] },
    },
    routeNonce: 0,
    commit: vi.fn(async () => undefined),
    navigate: vi.fn(),
    toast: vi.fn(),
    openUrgent: vi.fn(),
    isDark: false,
    store,
    reload: vi.fn(async () => undefined),
  };
}

function renderDataManager() {
  return render(
    <PromProvider value={buildContext()}>
      <DataManager />
    </PromProvider>
  );
}

describe("DataManager: 外部連携・同期カード", () => {
  it("同期カードの見出しを表示する", () => {
    renderDataManager();
    expect(screen.getByText("外部連携・同期")).toBeInTheDocument();
  });

  it("CSV ダウンロードボタンを表示する", () => {
    renderDataManager();
    expect(screen.getByRole("button", { name: "CSV をダウンロード" })).toBeInTheDocument();
  });

  it("Google と接続ボタンを表示する", () => {
    renderDataManager();
    expect(screen.getByRole("button", { name: "Google と接続" })).toBeInTheDocument();
  });
});
