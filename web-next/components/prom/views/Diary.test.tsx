/**
 * Diary 保存フローの契約テスト（1日1データ）。
 * commit にはアップデータを実データへ適用するスパイを注入し、追加/上書き/キャンセルを検証する。
 * window.confirm はモックする。AAA パターン。
 */
import { fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { type PromContextValue, PromProvider } from "@/components/prom/PromContext";
import type { AppData } from "@/components/prom/state";
import { defaultSettings, todayISO } from "@/components/prom/state";
import { Diary } from "@/components/prom/views/Diary";
import { SCHEMA_VERSION } from "@/lib/prom/storage";
import type { DiaryEntry, StorageAdapter } from "@/lib/prom/types";

function buildContext(entries: DiaryEntry[]): { ctx: PromContextValue; state: { data: AppData } } {
  const state: { data: AppData } = {
    data: {
      settings: defaultSettings(),
      snoop: { schemaVersion: SCHEMA_VERSION, history: [] },
      diary: { schemaVersion: SCHEMA_VERSION, entries },
      scores: { schemaVersion: SCHEMA_VERSION, records: [] },
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

function existingDiaryEntry(): DiaryEntry {
  return {
    id: "diary_existing",
    createdAt: `${todayISO()}T00:00:00.000Z`,
    date: todayISO(),
    startTime: "08:00",
    endTime: "09:00",
    sides: [],
    locations: [],
    quality: [],
    nrs: { onset: null, peak: null, post2h: null },
    symptoms: [],
    aura: [],
    prodrome: [],
    drugs: [],
    triggers: [],
    sleep: { bedtime: "", waketime: "", quality: null, stress: null },
    impact: null,
  };
}

function fillAndSubmitDiary(startTime: string) {
  fireEvent.change(screen.getByLabelText("開始時刻"), { target: { value: startTime } });
  fireEvent.click(screen.getByRole("button", { name: "日誌を保存する" }));
}

afterEach(() => {
  vi.restoreAllMocks();
});

describe("Diary: 1日1データ保存", () => {
  it("新規はエントリを追加する", () => {
    const { ctx, state } = buildContext([]);
    render(
      <PromProvider value={ctx}>
        <Diary />
      </PromProvider>
    );

    fillAndSubmitDiary("10:00");

    expect(ctx.commit).toHaveBeenCalledTimes(1);
    expect(state.data.diary.entries).toHaveLength(1);
    expect(state.data.diary.entries[0].startTime).toBe("10:00");
    expect(state.data.diary.entries[0].date).toBe(todayISO());
  });

  it("同日の記録が既にあれば確認後に上書きし件数不変・値更新", () => {
    const confirmSpy = vi.spyOn(window, "confirm").mockReturnValue(true);
    const existing = existingDiaryEntry();
    const { ctx, state } = buildContext([existing]);
    render(
      <PromProvider value={ctx}>
        <Diary />
      </PromProvider>
    );

    fillAndSubmitDiary("11:30");

    expect(confirmSpy).toHaveBeenCalledTimes(1);
    expect(state.data.diary.entries).toHaveLength(1);
    expect(state.data.diary.entries[0].startTime).toBe("11:30");
  });

  it("確認をキャンセルすると保存しない", () => {
    vi.spyOn(window, "confirm").mockReturnValue(false);
    const existing = existingDiaryEntry();
    const { ctx, state } = buildContext([existing]);
    render(
      <PromProvider value={ctx}>
        <Diary />
      </PromProvider>
    );

    fillAndSubmitDiary("11:30");

    expect(ctx.commit).not.toHaveBeenCalled();
    expect(state.data.diary.entries[0].startTime).toBe(existing.startTime);
  });
});
