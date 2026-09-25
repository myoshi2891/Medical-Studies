import { fireEvent, render, screen, within } from "@testing-library/react";
import { StrictMode } from "react";
import { afterEach, beforeAll, describe, expect, it, vi } from "vitest";
import { ATLAS_LAYERS, ATLAS_PARTS } from "@/lib/anatomy/atlas";
import AnatomyAtlas from "./AnatomyAtlas";

vi.mock("@/lib/anatomy/load-model-viewer", () => ({
  loadModelViewer: vi.fn().mockResolvedValue(undefined),
}));

// 非同期importがテスト終了後に実モジュールを読み込まないよう完了を待つ。
afterEach(async () => {
  await vi.dynamicImportSettled();
});
beforeAll(() => {
  HTMLDialogElement.prototype.showModal = function () {
    this.setAttribute("open", "");
  };
  HTMLDialogElement.prototype.close = function () {
    this.removeAttribute("open");
  };
});

describe("頭頸部の統合アトラス", () => {
  it("全7レイヤーを初期表示し、全体モデルを読み込む", () => {
    const { container } = render(<AnatomyAtlas />);
    expect(container.querySelector("model-viewer")).toHaveAttribute(
      "src",
      "/models/atlas/overview.glb"
    );
    for (const layer of ATLAS_LAYERS) {
      expect(screen.getByRole("checkbox", { name: `${layer.ja}を表示` })).toBeChecked();
    }
  });
  it("レイヤーを切り替え、全表示に戻せる", () => {
    render(<AnatomyAtlas />);
    const toggle = screen.getByRole("checkbox", { name: "頭蓋骨を表示" });
    fireEvent.click(toggle);
    expect(toggle).not.toBeChecked();
    fireEvent.click(screen.getByRole("button", { name: "全レイヤーを表示" }));
    expect(toggle).toBeChecked();
  });
  it("セクションからモーダルを開き、部位を個別拡大して日英の解説を表示する", () => {
    render(<AnatomyAtlas />);
    fireEvent.click(screen.getByRole("button", { name: "脳幹を拡大" }));
    const dialog = screen.getByRole("dialog");
    expect(within(dialog).getByRole("heading", { name: /脳幹/, level: 2 })).toBeInTheDocument();
    fireEvent.click(within(dialog).getByRole("button", { name: /延髄.*Medulla/ }));
    const part = ATLAS_PARTS.find((p) => p.id === "medulla");
    expect(part).toBeDefined();
    expect(dialog.querySelector("model-viewer")).toHaveAttribute(
      "src",
      "/models/atlas/medulla.glb"
    );
    expect(within(dialog).getByText(part?.description.ja ?? "")).toBeInTheDocument();
    expect(within(dialog).getByText(part?.description.en ?? "")).toHaveAttribute("lang", "en");
    expect(within(dialog).getByText(part?.clinical.ja ?? "")).toBeInTheDocument();
    fireEvent.click(within(dialog).getByRole("button", { name: "セクション全体に戻る" }));
    expect(dialog.querySelector("model-viewer")).toHaveAttribute(
      "src",
      "/models/atlas/brainstem.glb"
    );
  });
  it("閉じると開いたボタンにフォーカスが戻り、再度開ける", () => {
    render(<AnatomyAtlas />);
    const trigger = screen.getByRole("button", { name: "神経を拡大" });
    trigger.focus();
    fireEvent.click(trigger);
    fireEvent.click(within(screen.getByRole("dialog")).getByRole("button", { name: "閉じる" }));
    expect(screen.queryByRole("dialog")).toBeNull();
    expect(trigger).toHaveFocus();
    fireEvent.click(trigger);
    fireEvent(screen.getByRole("dialog"), new Event("cancel", { bubbles: true }));
    expect(screen.queryByRole("dialog")).toBeNull();
    expect(trigger).toHaveFocus();
  });
  it("英語で検索して対象部位を開ける・該当なしを表示する", () => {
    render(<AnatomyAtlas />);
    fireEvent.change(screen.getByRole("searchbox", { name: "部位を検索（日英）" }), {
      target: { value: "medulla" },
    });
    fireEvent.click(screen.getByRole("button", { name: /延髄.*Medulla/ }));
    expect(screen.getByRole("dialog").querySelector("model-viewer")).toHaveAttribute(
      "src",
      "/models/atlas/medulla.glb"
    );
    fireEvent.click(within(screen.getByRole("dialog")).getByRole("button", { name: "閉じる" }));
    fireEvent.change(screen.getByRole("searchbox"), { target: { value: "no-such-part" } });
    expect(screen.getByText("該当する部位がありません。")).toBeInTheDocument();
  });
  it("モデル読込失敗時にも拡大と解説の導線を残す", () => {
    const { container } = render(<AnatomyAtlas />);
    const viewer = container.querySelector("model-viewer");
    if (!viewer) throw new Error("ビューアがありません");
    fireEvent.error(viewer);
    expect(screen.getByRole("alert")).toHaveTextContent("3Dモデルを読み込めませんでした");
    fireEvent.click(screen.getByRole("button", { name: "頸椎を拡大" }));
    expect(screen.getByRole("dialog")).toBeInTheDocument();
  });
});

it("StrictModeの再マウントでもダイアログが閉じず、キーボードで戻れる", () => {
  render(
    <StrictMode>
      <AnatomyAtlas />
    </StrictMode>
  );
  const trigger = screen.getByRole("button", { name: "脳幹を拡大" });
  trigger.focus();
  fireEvent.click(trigger);
  const dialog = screen.getByRole("dialog");
  expect(dialog).toHaveAttribute("open");
  // Escape はブラウザが dialog の cancel イベントとして通知する。
  fireEvent(dialog, new Event("cancel", { bubbles: true }));
  expect(screen.queryByRole("dialog")).toBeNull();
  expect(trigger).toHaveFocus();
});
