/**
 * StorageNotice の UI 契約テスト（監査所見 F4/F5）。
 * localStorage 常設注意喚起の (1) 表示 と (2) 消去導線への遷移呼び出しを固定する。
 */
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { type PromContextValue, PromProvider } from "@/components/prom/PromContext";
import { StorageNotice } from "@/components/prom/StorageNotice";
import { defaultSettings } from "@/components/prom/state";
import { SCHEMA_VERSION } from "@/lib/prom/storage";
import type { StorageAdapter } from "@/lib/prom/types";

function buildContext(navigate: PromContextValue["navigate"]): PromContextValue {
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
    navigate,
    toast: vi.fn(),
    openUrgent: vi.fn(),
    isDark: false,
    store,
    reload: vi.fn(async () => undefined),
  };
}

function renderNotice(navigate = vi.fn()) {
  render(
    <PromProvider value={buildContext(navigate)}>
      <StorageNotice />
    </PromProvider>
  );
  return { navigate };
}

describe("StorageNotice: localStorage 常設注意喚起", () => {
  it("端末保存に関する注意文を表示する（正常系）", () => {
    // Arrange & Act
    renderNotice();
    // Assert
    expect(screen.getByText(/この端末のブラウザに保存されます/)).toBeInTheDocument();
  });

  it("「データ管理」ボタンのクリックで #/data へ navigate する（操作系）", () => {
    // Arrange
    const { navigate } = renderNotice();
    // Act
    fireEvent.click(screen.getByRole("button", { name: "データ管理" }));
    // Assert
    expect(navigate).toHaveBeenCalledWith("#/data");
  });
});
