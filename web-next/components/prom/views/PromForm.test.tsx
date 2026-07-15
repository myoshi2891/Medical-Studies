/**
 * PromForm（PGIC）保存フローの契約テスト（1日1データ）。
 * commit にはアップデータを実データへ適用するスパイを注入し、追加/上書き/キャンセルを検証する。
 * window.confirm はモックする。AAA パターン。
 */
import { fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { type PromContextValue, PromProvider } from "@/components/prom/PromContext";
import type { AppData } from "@/components/prom/state";
import { defaultSettings, todayISO } from "@/components/prom/state";
import { PromForm } from "@/components/prom/views/PromForm";
import { REGISTRY } from "@/lib/prom/registry";
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

/**
 * 権利ゲート（F1）。license.status === "restricted" の尺度は、ローカル専用オーバーレイが
 * 無い状態（＝公開デプロイと同じ状態）では質問票を描画せず、代替表示へ切り替わること。
 * fetch は未定義／404 相当をモックし、「オーバーレイ不在」を再現する。
 */
describe("PromForm: 著作権ゲート（restricted 尺度）", () => {
  function renderPromForm(instrumentId: string) {
    const { ctx } = buildContext([]);
    return render(
      <PromProvider value={ctx}>
        <PromForm instrumentId={instrumentId} />
      </PromProvider>
    );
  }

  beforeEach(() => {
    // オーバーレイ未配置（公開デプロイと同じ状態）を再現する。
    vi.spyOn(globalThis, "fetch").mockResolvedValue(new Response(null, { status: 404 }));
  });

  it("HIT-6: 質問票を描画せず、代替表示（公式取得先の案内）を出す", async () => {
    const { container } = renderPromForm("hit6");

    expect(await screen.findByRole("link", { name: /公式/ })).toHaveAttribute(
      "href",
      REGISTRY.hit6.license.officialUrl
    );
    expect(screen.getByText(/本アプリには収載していません/)).toBeInTheDocument();
    // 回答フォームそのものが存在しない（設問の選択肢・送信ボタンが出ない）。
    // 尺度切替タブも radio input のため、設問の入力名で絞り込む。
    expect(container.querySelector("form")).toBeNull();
    expect(container.querySelectorAll('input[name^="hit6_q"]')).toHaveLength(0);
    expect(screen.queryByRole("button", { name: /記録する/ })).toBeNull();
  });

  it("MSQ v2.1: 同じく代替表示になる", async () => {
    const { container } = renderPromForm("msq-v2.1");

    expect(await screen.findByText(/本アプリには収載していません/)).toBeInTheDocument();
    expect(container.querySelector("form")).toBeNull();
    expect(container.querySelectorAll('input[name^="msq-v2.1_q"]')).toHaveLength(0);
  });

  it("MIDAS（status 未設定）: 従来どおり質問票を描画する", async () => {
    renderPromForm("midas");

    expect(await screen.findByRole("button", { name: "合計して記録する" })).toBeInTheDocument();
    expect(screen.queryByText(/本アプリには収載していません/)).toBeNull();
  });

  it("代替表示でも出典・著作権の帰属は表示し続ける", async () => {
    renderPromForm("hit6");

    expect(await screen.findByText(new RegExp(REGISTRY.hit6.license.holder))).toBeInTheDocument();
  });
});
