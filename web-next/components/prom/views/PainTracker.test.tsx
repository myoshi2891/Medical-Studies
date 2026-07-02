/**
 * PainTracker 保存フローの契約テスト（1日1データ）。
 * commit にはアップデータを実データへ適用するスパイを注入し、追加/上書き/キャンセルを検証する。
 * window.confirm はモックする。AAA パターン。
 */
import { fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { type PromContextValue, PromProvider } from "@/components/prom/PromContext";
import { defaultSettings, todayISO } from "@/components/prom/state";
import { PainTracker } from "@/components/prom/views/PainTracker";
import { SCHEMA_VERSION } from "@/lib/prom/storage";
import type { AppData } from "@/components/prom/state";
import type { ScoreRecord, StorageAdapter } from "@/lib/prom/types";

function buildContext(records: ScoreRecord[]): { ctx: PromContextValue; state: { data: AppData } } {
  const state: { data: AppData } = {
    data: {
      settings: { ...defaultSettings(), scaleChoice: "nrs" },
      snoop: { schemaVersion: SCHEMA_VERSION, history: [] },
      diary: { schemaVersion: SCHEMA_VERSION, entries: [] },
      scores: { schemaVersion: SCHEMA_VERSION, records },
    },
  };
  const ctx: PromContextValue = {
    data: state.data,
    routeNonce: 0,
    // アップデータ（または直値）を実データへ適用して結果を保持（純粋 upsert の効果を観測する）。
    commit: vi.fn(async (next: AppData | ((prev: AppData) => AppData)) => {
      state.data = typeof next === "function" ? next(state.data) : next;
    }),
    navigate: vi.fn(),
    toast: vi.fn(),
    openUrgent: vi.fn(),
    isDark: false,
    store: {} as unknown as StorageAdapter,
    reload: vi.fn(async () => undefined),
  };
  return { ctx, state };
}

function submitNrs(value: number) {
  fireEvent.click(screen.getByRole("radio", { name: String(value) }));
  fireEvent.click(screen.getByRole("button", { name: "この強さで記録する" }));
}

afterEach(() => {
  vi.restoreAllMocks();
});

describe("PainTracker: 1日1データ保存", () => {
  it("新規はレコードを追加する", () => {
    const { ctx, state } = buildContext([]);
    render(
      <PromProvider value={ctx}>
        <PainTracker />
      </PromProvider>
    );

    submitNrs(7);

    expect(ctx.commit).toHaveBeenCalledTimes(1);
    expect(state.data.scores.records).toHaveLength(1);
    expect(state.data.scores.records[0].value).toBe(7);
  });

  it("同日・同指標は確認後に上書きし件数不変・値更新", () => {
    const confirmSpy = vi.spyOn(window, "confirm").mockReturnValue(true);
    const existing: ScoreRecord = {
      date: todayISO(),
      createdAt: `${todayISO()}T00:00:00.000Z`,
      instrumentId: "nrs",
      instrumentVersion: "1.0",
      value: 5,
    };
    const { ctx, state } = buildContext([existing]);
    render(
      <PromProvider value={ctx}>
        <PainTracker />
      </PromProvider>
    );

    submitNrs(8);

    expect(confirmSpy).toHaveBeenCalledTimes(1);
    expect(state.data.scores.records).toHaveLength(1);
    expect(state.data.scores.records[0].value).toBe(8);
  });

  it("確認をキャンセルすると保存しない", () => {
    vi.spyOn(window, "confirm").mockReturnValue(false);
    const existing: ScoreRecord = {
      date: todayISO(),
      createdAt: `${todayISO()}T00:00:00.000Z`,
      instrumentId: "nrs",
      instrumentVersion: "1.0",
      value: 5,
    };
    const { ctx, state } = buildContext([existing]);
    render(
      <PromProvider value={ctx}>
        <PainTracker />
      </PromProvider>
    );

    submitNrs(8);

    expect(ctx.commit).not.toHaveBeenCalled();
    expect(state.data.scores.records[0].value).toBe(5);
  });
});
