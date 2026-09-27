import { fireEvent, render, screen, within } from "@testing-library/react";
import { StrictMode } from "react";
import { afterEach, beforeAll, describe, expect, it, vi } from "vitest";
import { ATLAS_LAYERS, ATLAS_PARTS } from "@/lib/anatomy/atlas";
import AnatomyAtlas from "./AnatomyAtlas";
import AtlasSectionViewer, { AtlasSectionGroup } from "./AtlasSectionViewer";

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
  it("詳細画面のラベルを隠しても一覧から部位を選べ、系統全体の表示を保持する", () => {
    render(<AnatomyAtlas />);
    fireEvent.click(screen.getByRole("button", { name: "神経を拡大" }));
    const dialog = screen.getByRole("dialog");
    const labels = within(dialog).getByRole("checkbox", { name: "3Dラベルを表示" });
    expect(labels).toBeChecked();
    expect(dialog.querySelectorAll(".atlas-pin").length).toBeGreaterThan(0);
    fireEvent.click(labels);
    expect(dialog.querySelectorAll(".atlas-pin")).toHaveLength(0);
    fireEvent.click(within(dialog).getByRole("button", { name: /眼神経.*Ophthalmic/ }));
    expect(dialog.querySelector("model-viewer")).toHaveAttribute("src", "/models/atlas/nerves.glb");
    expect(within(dialog).getByRole("button", { name: /眼神経.*Ophthalmic/ })).toHaveAttribute(
      "aria-pressed",
      "true"
    );
    expect(within(dialog).queryByRole("button", { name: "セクション全体に戻る" })).toBeNull();
    expect(labels).not.toBeChecked();
    expect(dialog.querySelectorAll(".atlas-pin")).toHaveLength(0);
    fireEvent.click(labels);
    expect(dialog.querySelectorAll(".atlas-pin").length).toBeGreaterThan(0);
  });
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
  it("セクションから詳細画面を開き、全体像の選択部位と日英の解説を連動する", () => {
    render(<AnatomyAtlas />);
    fireEvent.click(screen.getByRole("button", { name: "脳幹を拡大" }));
    const dialog = screen.getByRole("dialog");
    expect(within(dialog).getByRole("heading", { name: /脳幹/, level: 2 })).toBeInTheDocument();
    fireEvent.click(within(dialog).getByRole("button", { name: /延髄.*Medulla/ }));
    const part = ATLAS_PARTS.find((p) => p.id === "medulla");
    expect(part).toBeDefined();
    expect(dialog.querySelector("model-viewer")).toHaveAttribute(
      "src",
      "/models/atlas/brainstem.glb"
    );
    expect(within(dialog).getByText(part?.description.ja ?? "")).toBeInTheDocument();
    expect(within(dialog).getByText(part?.description.en ?? "")).toHaveAttribute("lang", "en");
    expect(within(dialog).getByText(part?.clinical.ja ?? "")).toBeInTheDocument();
    expect(within(dialog).queryByText("脳幹の観察")).toBeNull();
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
      "/models/atlas/brainstem.glb"
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

describe("系統別のアトラス表示", () => {
  it.each([
    "nerves",
    "vessels",
    "brain",
    "brainstem",
    "skull",
    "cervical",
    "muscles",
  ])("共通座標の%sモデルを自動回転し、ラベルだけを切り替える", (layerId) => {
    const { container } = render(<AtlasSectionViewer layerId={layerId} />);
    const viewer = container.querySelector("model-viewer");
    expect(viewer).toHaveAttribute("src", `/models/atlas/${layerId}.glb`);
    expect(viewer).toHaveAttribute("auto-rotate");
    const labels = screen.getByRole("checkbox", { name: "3Dラベルを表示" });
    expect(labels).toBeChecked();
    const parts = ATLAS_PARTS.filter((p) => p.layer === layerId);
    expect(viewer?.querySelectorAll(".atlas-pin")).toHaveLength(parts.length);
    fireEvent.click(labels);
    expect(container.querySelector("model-viewer")).toBe(viewer);
    expect(viewer?.querySelectorAll(".atlas-pin")).toHaveLength(0);
    expect(viewer).toHaveAttribute("auto-rotate");
    fireEvent.click(screen.getByRole("checkbox", { name: "自動回転" }));
    expect(viewer).not.toHaveAttribute("auto-rotate");
    fireEvent.click(labels);
    expect(viewer?.querySelectorAll(".atlas-pin")).toHaveLength(parts.length);
    expect(viewer).not.toHaveAttribute("auto-rotate");
    fireEvent.click(screen.getByRole("checkbox", { name: "自動回転" }));
    expect(viewer).toHaveAttribute("auto-rotate");
    fireEvent.click(screen.getByRole("button", { name: "正面" }));
    expect(viewer).toHaveAttribute("camera-orbit", "0deg 90deg auto");
  });

  it("ラベル非表示・読込失敗でも日英の部位一覧から解説を開ける", () => {
    const { container } = render(<AtlasSectionViewer layerId="nerves" />);
    fireEvent.click(screen.getByRole("checkbox", { name: "3Dラベルを表示" }));
    const viewer = container.querySelector("model-viewer");
    if (!viewer) throw new Error("ビューアがありません");
    fireEvent.error(viewer);
    const trigger = screen.getByRole("button", { name: /眼神経.*Ophthalmic/ });
    trigger.focus();
    fireEvent.click(trigger);
    const dialog = screen.getByRole("dialog");
    expect(dialog.querySelector("model-viewer")).toHaveAttribute("src", "/models/atlas/nerves.glb");
    fireEvent.click(within(dialog).getByRole("button", { name: "閉じる" }));
    expect(trigger).toHaveFocus();
    expect(screen.getByRole("checkbox", { name: "3Dラベルを表示" })).not.toBeChecked();
  });

  it("系統IDの指定だけで血管にも同じ操作を適用できる", () => {
    const { container } = render(<AtlasSectionViewer layerId="vessels" />);
    expect(container.querySelector("model-viewer")).toHaveAttribute(
      "src",
      "/models/atlas/vessels.glb"
    );
    const part = ATLAS_PARTS.find((p) => p.layer === "vessels");
    if (!part) throw new Error("血管部位がありません");
    fireEvent.click(screen.getByRole("button", { name: `${part.ja}の位置から拡大` }));
    expect(screen.getByRole("dialog").querySelector("model-viewer")).toHaveAttribute(
      "src",
      "/models/atlas/vessels.glb"
    );
  });

  it.each(
    ATLAS_LAYERS
  )("$jaのラベル非表示・読込失敗でも一覧から詳細を開き、設定とフォーカスを保持する", (layer) => {
    const { container } = render(<AtlasSectionViewer layerId={layer.id} />);
    const labels = screen.getByRole("checkbox", { name: "3Dラベルを表示" });
    fireEvent.click(labels);
    const viewer = container.querySelector("model-viewer");
    if (!viewer) throw new Error("ビューアがありません");
    fireEvent.error(viewer);
    expect(screen.getByRole("alert")).toBeInTheDocument();
    const parts = ATLAS_PARTS.filter((part) => part.layer === layer.id);
    const list = screen.getByRole("group", { name: `${layer.ja}の部位一覧` });
    expect(within(list).getAllByRole("button")).toHaveLength(parts.length);
    const trigger = within(list).getAllByRole("button")[0];
    trigger.focus();
    fireEvent.click(trigger);
    const dialog = screen.getByRole("dialog");
    const detailViewer = dialog.querySelector("model-viewer");
    const detailLabels = within(dialog).getByRole("checkbox", { name: "3Dラベルを表示" });
    expect(detailLabels).toBeChecked();
    fireEvent.click(detailLabels);
    const nextPart = parts[1];
    fireEvent.click(within(dialog).getByRole("button", { name: `${nextPart.ja} ${nextPart.en}` }));
    expect(dialog.querySelector("model-viewer")).toBe(detailViewer);
    expect(detailViewer).toHaveAttribute("src", `/models/atlas/${layer.id}.glb`);
    expect(detailViewer?.querySelectorAll(".atlas-pin")).toHaveLength(0);
    expect(within(dialog).getByText(nextPart.description.ja)).toBeInTheDocument();
    expect(within(dialog).getByText(nextPart.description.en)).toHaveAttribute("lang", "en");
    fireEvent(dialog, new Event("cancel", { bubbles: true }));
    expect(screen.queryByRole("dialog")).toBeNull();
    expect(trigger).toHaveFocus();
    expect(labels).not.toBeChecked();
    expect(viewer).toHaveAttribute("auto-rotate");
  });
});

describe("複数系統を含む欄の表示", () => {
  it.each([
    { title: "脳・脳幹", first: "brain", second: "brainstem" },
    { title: "骨・頚椎", first: "skull", second: "cervical" },
  ])("$titleを切り替えてもラベル・回転設定を保ち、選択系統の部位だけを表示する", ({
    title,
    first,
    second,
  }) => {
    const { container } = render(<AtlasSectionGroup layers={[first, second]} title={title} />);
    const firstLayer = ATLAS_LAYERS.find((layer) => layer.id === first);
    const secondLayer = ATLAS_LAYERS.find((layer) => layer.id === second);
    if (!firstLayer || !secondLayer) throw new Error("系統がありません");
    const switcher = screen.getByRole("group", { name: `${title}の表示系統` });
    expect(switcher).toHaveClass("atlas-system-switcher");
    expect(switcher).not.toHaveClass("atlas-camera");
    const firstButton = within(switcher).getByRole("button", { name: firstLayer.ja });
    const secondButton = within(switcher).getByRole("button", { name: secondLayer.ja });
    expect(firstButton).toHaveAttribute("aria-pressed", "true");
    expect(container.querySelector("model-viewer")).toHaveAttribute(
      "src",
      `/models/atlas/${first}.glb`
    );
    const labels = screen.getByRole("checkbox", { name: "3Dラベルを表示" });
    const rotation = screen.getByRole("checkbox", { name: "自動回転" });
    fireEvent.click(labels);
    fireEvent.click(rotation);
    fireEvent.click(secondButton);
    expect(firstButton).toHaveAttribute("aria-pressed", "false");
    expect(secondButton).toHaveAttribute("aria-pressed", "true");
    const viewer = container.querySelector("model-viewer");
    expect(container.querySelectorAll("model-viewer")).toHaveLength(1);
    expect(viewer).toHaveAttribute("src", `/models/atlas/${second}.glb`);
    expect(viewer).not.toHaveAttribute("auto-rotate");
    expect(viewer?.querySelectorAll(".atlas-pin")).toHaveLength(0);
    expect(labels).not.toBeChecked();
    expect(rotation).not.toBeChecked();
    expect(screen.queryByRole("group", { name: `${firstLayer.ja}の部位一覧` })).toBeNull();
    const parts = ATLAS_PARTS.filter((part) => part.layer === second);
    const list = screen.getByRole("group", { name: `${secondLayer.ja}の部位一覧` });
    expect(within(list).getAllByRole("button")).toHaveLength(parts.length);
    const trigger = within(list).getAllByRole("button")[0];
    trigger.focus();
    fireEvent.click(trigger);
    const dialog = screen.getByRole("dialog");
    expect(dialog.querySelector("model-viewer")).toHaveAttribute(
      "src",
      `/models/atlas/${second}.glb`
    );
    expect(within(dialog).getByText(parts[0].description.ja)).toBeInTheDocument();
    fireEvent.click(within(dialog).getByRole("button", { name: "閉じる" }));
    expect(trigger).toHaveFocus();
    fireEvent.click(labels);
    expect(viewer?.querySelectorAll(".atlas-pin")).toHaveLength(parts.length);
    fireEvent.click(rotation);
    expect(viewer).toHaveAttribute("auto-rotate");
    fireEvent.click(firstButton);
    expect(container.querySelector("model-viewer")).toHaveAttribute(
      "src",
      `/models/atlas/${first}.glb`
    );
    expect(labels).toBeChecked();
    expect(rotation).toBeChecked();
  });

  it("筋のような単一系統では系統切替を表示せず、ラベルと自動回転を利用できる", () => {
    const { container } = render(<AtlasSectionGroup layers={["muscles"]} title="筋" />);
    expect(screen.queryByRole("group", { name: "筋の表示系統" })).toBeNull();
    expect(container.querySelector("model-viewer")).toHaveAttribute(
      "src",
      "/models/atlas/muscles.glb"
    );
    expect(screen.getByRole("checkbox", { name: "3Dラベルを表示" })).toBeChecked();
    expect(screen.getByRole("checkbox", { name: "自動回転" })).toBeChecked();
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
