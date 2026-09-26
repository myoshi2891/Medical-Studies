import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import AtlasModel from "./AtlasModel";

vi.mock("@/lib/anatomy/load-model-viewer", () => ({
  loadModelViewer: vi.fn().mockResolvedValue(undefined),
}));

// 非同期importがテスト終了後に実モジュールを読み込まないよう完了を待つ。
afterEach(async () => {
  await vi.dynamicImportSettled();
});

function material(name: string) {
  return {
    name,
    setAlphaMode: vi.fn(),
    pbrMetallicRoughness: { baseColorFactor: [0.2, 0.3, 0.4, 1], setBaseColorFactor: vi.fn() },
  };
}

describe("アトラスの描画制御", () => {
  it("読込後の実マテリアルへレイヤー表示と透過を反映する", () => {
    const skull = material("frontal-bone");
    const medulla = material("medulla");
    const { container, rerender } = render(
      <AtlasModel
        src="/models/atlas/overview.glb"
        title="全体像"
        visible={["brainstem"]}
        transparent
      />
    );
    const viewer = container.querySelector("model-viewer");
    if (!viewer) throw new Error("ビューアがありません");
    Object.defineProperty(viewer, "model", { value: { materials: [skull, medulla] } });
    fireEvent(viewer, new Event("load"));
    expect(skull.pbrMetallicRoughness.setBaseColorFactor).toHaveBeenLastCalledWith([
      0.2, 0.3, 0.4, 0,
    ]);
    expect(medulla.setAlphaMode).toHaveBeenLastCalledWith("OPAQUE");
    rerender(
      <AtlasModel
        src="/models/atlas/overview.glb"
        title="全体像"
        visible={["skull", "brainstem"]}
        transparent
      />
    );
    expect(skull.pbrMetallicRoughness.setBaseColorFactor).toHaveBeenLastCalledWith([
      0.2, 0.3, 0.4, 0.18,
    ]);
    rerender(
      <AtlasModel
        src="/models/atlas/overview.glb"
        title="全体像"
        visible={["skull", "brainstem"]}
      />
    );
    expect(skull.pbrMetallicRoughness.setBaseColorFactor).toHaveBeenLastCalledWith([
      0.2, 0.3, 0.4, 1,
    ]);
  });
  it("選択部位だけを強調色にし、選択変更時に元の色へ戻す", () => {
    const atlas = material("atlas-c1");
    const axis = material("axis-c2");
    const { container, rerender } = render(
      <AtlasModel
        src="/models/atlas/cervical.glb"
        title="頸椎"
        selectedPart="atlas-c1"
      />
    );
    const viewer = container.querySelector("model-viewer");
    if (!viewer) throw new Error("ビューアがありません");
    Object.defineProperty(viewer, "model", { value: { materials: [atlas, axis] } });
    fireEvent(viewer, new Event("load"));

    expect(atlas.pbrMetallicRoughness.setBaseColorFactor).toHaveBeenLastCalledWith([
      0.05, 0.65, 0.58, 1,
    ]);
    expect(axis.pbrMetallicRoughness.setBaseColorFactor).toHaveBeenLastCalledWith([
      0.2, 0.3, 0.4, 1,
    ]);

    rerender(
      <AtlasModel src="/models/atlas/cervical.glb" title="頸椎" selectedPart="axis-c2" />
    );
    expect(atlas.pbrMetallicRoughness.setBaseColorFactor).toHaveBeenLastCalledWith([
      0.2, 0.3, 0.4, 1,
    ]);
    expect(axis.pbrMetallicRoughness.setBaseColorFactor).toHaveBeenLastCalledWith([
      0.05, 0.65, 0.58, 1,
    ]);
  });
  it("失敗後に再試行し、同じモデルの読込成功まで復帰できる", async () => {
    const { container } = render(<AtlasModel src="/models/atlas/medulla.glb" title="延髄" />);
    const first = container.querySelector("model-viewer");
    if (!first) throw new Error("ビューアがありません");
    fireEvent.error(first);
    fireEvent.click(screen.getByRole("button", { name: "再読み込み" }));
    const second = container.querySelector("model-viewer");
    expect(second).not.toBe(first);
    if (!second) throw new Error("再試行ビューアがありません");
    fireEvent(second, new Event("load"));
    await waitFor(() => expect(screen.queryByRole("alert")).toBeNull());
    expect(screen.queryByRole("status")).toBeNull();
  });
});
