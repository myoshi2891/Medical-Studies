/**
 * PromForm（PGIC）保存フローの契約テスト（1日1データ）。
 * commit にはアップデータを実データへ適用するスパイを注入し、追加/上書き/キャンセルを検証する。
 * window.confirm はモックする。AAA パターン。
 */
import { fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { type PromContextValue, PromProvider } from "@/components/prom/PromContext";
import type { AppData } from "@/components/prom/state";
import { defaultSettings, todayISO } from "@/components/prom/state";
import { PromForm } from "@/components/prom/views/PromForm";
import { SCHEMA_VERSION } from "@/lib/prom/storage";
import type { ScoreRecord, StorageAdapter } from "@/lib/prom/types";

function buildContext(records: ScoreRecord[]): { ctx: PromContextValue; state: { data: AppData } } {
  const state: { data: AppData } = {
    data: {
      settings: defaultSettings(),
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

function pgicRecord(total: number): ScoreRecord {
  return {
    date: todayISO(),
    createdAt: `${todayISO()}T00:00:00.000Z`,
    instrumentId: "pgic",
    instrumentVersion: "1.0",
    total,
    interpretation: total >= 5 ? "favorable" : "non-favorable",
  };
}

function submitPgic(label: RegExp) {
  fireEvent.click(screen.getByRole("radio", { name: label }));
  fireEvent.click(screen.getByRole("button", { name: "回答を記録する" }));
}

afterEach(() => {
  vi.restoreAllMocks();
});

describe("PromForm(PGIC): 1日1データ保存", () => {
  it("新規はスコアを記録する", () => {
    const { ctx, state } = buildContext([]);
    render(
      <PromProvider value={ctx}>
        <PromForm instrumentId="pgic" />
      </PromProvider>
    );

    submitPgic(/少し良いが、気づける変化なし/); // value=3

    expect(ctx.commit).toHaveBeenCalledTimes(1);
    expect(state.data.scores.records).toHaveLength(1);
    expect(state.data.scores.records[0].total).toBe(3);
  });

  it("同日・同指標は確認後に上書きし件数不変・値更新", () => {
    const confirmSpy = vi.spyOn(window, "confirm").mockReturnValue(true);
    const existing = pgicRecord(3);
    const { ctx, state } = buildContext([existing]);
    render(
      <PromProvider value={ctx}>
        <PromForm instrumentId="pgic" />
      </PromProvider>
    );

    submitPgic(/改善し、真に価値ある確実な改善/); // value=6

    expect(confirmSpy).toHaveBeenCalledTimes(1);
    expect(state.data.scores.records).toHaveLength(1);
    expect(state.data.scores.records[0].total).toBe(6);
  });

  it("確認をキャンセルすると保存しない", () => {
    vi.spyOn(window, "confirm").mockReturnValue(false);
    const existing = pgicRecord(3);
    const { ctx, state } = buildContext([existing]);
    render(
      <PromProvider value={ctx}>
        <PromForm instrumentId="pgic" />
      </PromProvider>
    );

    submitPgic(/改善し、真に価値ある確実な改善/);

    expect(ctx.commit).not.toHaveBeenCalled();
    expect(state.data.scores.records[0].total).toBe(3);
  });
});
