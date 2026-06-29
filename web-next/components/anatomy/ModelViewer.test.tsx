import { fireEvent, render } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import type { Hotspot } from "@/lib/anatomy/types";
import ModelViewer from "./ModelViewer";

// 実 Web Component（ブラウザ API 依存・重量）は読み込まない。
// カスタム要素は未登録のまま <model-viewer> は不明要素として描画され、
// DOM 属性アサーションは成立する。
vi.mock("@google/model-viewer", () => ({}));

const HOTSPOTS: Hotspot[] = [
  {
    id: "gon",
    label: "大後頭神経 (GON / C2)",
    plain: "後頭部の感覚を伝える神経",
    position: "0 0.2 0.1",
  },
  { id: "trigeminal", label: "三叉神経", plain: "顔の感覚を伝える神経", position: "0.1 0.4 0.1" },
];

/** null を握りつぶさず、存在を表明してから要素を返す（非null assertion 回避）。 */
function requireModelViewer(container: HTMLElement): HTMLElement {
  const el = container.querySelector<HTMLElement>("model-viewer");
  expect(el).not.toBeNull();
  if (!el) throw new Error("model-viewer が描画されていない");
  return el;
}

describe("ModelViewer: 降格表示（モデル無し）", () => {
  it("src=null では model-viewer を描画せずプレースホルダを表示する", () => {
    const { container } = render(<ModelViewer src={null} hotspots={[]} title="頭頚部の全体像" />);
    expect(container.querySelector("model-viewer")).toBeNull();
    expect(container.querySelector(".anatomy-viewer-note")?.textContent).toContain("モデルなし");
  });

  it("src=null でもホットスポット凡例があれば表示する", () => {
    const { container } = render(<ModelViewer src={null} hotspots={HOTSPOTS} title="神経" />);
    expect(container.querySelectorAll(".anatomy-hotspot")).toHaveLength(HOTSPOTS.length);
  });
});

describe("ModelViewer: 3D 描画", () => {
  it("src があれば model-viewer を src 付きで描画する", () => {
    const { container } = render(
      <ModelViewer src="/models/nerves.glb" hotspots={HOTSPOTS} title="神経" />
    );
    const mv = requireModelViewer(container);
    expect(mv.getAttribute("src")).toBe("/models/nerves.glb");
  });

  it("各ホットスポットを slot とデータ位置付きで描画する", () => {
    const { container } = render(
      <ModelViewer src="/models/nerves.glb" hotspots={HOTSPOTS} title="神経" />
    );
    for (const h of HOTSPOTS) {
      const pin = container.querySelector<HTMLElement>(`[slot="hotspot-${h.id}"]`);
      expect(pin).not.toBeNull();
      expect(pin?.getAttribute("data-position")).toBe(h.position);
      expect(pin?.textContent).toContain(h.label);
    }
  });

  it("3D 描画時もテキスト凡例（専門名＋やさしい言い換え）を維持する", () => {
    const { container } = render(
      <ModelViewer src="/models/nerves.glb" hotspots={HOTSPOTS} title="神経" />
    );
    const labels = Array.from(container.querySelectorAll(".anatomy-hotspot-label")).map(
      (n) => n.textContent
    );
    const plains = Array.from(container.querySelectorAll(".anatomy-hotspot-plain")).map(
      (n) => n.textContent
    );
    expect(labels).toEqual(HOTSPOTS.map((h) => h.label));
    expect(plains).toEqual(HOTSPOTS.map((h) => h.plain));
  });

  it("ホットスポット 0 件でも model-viewer は描画する（ピンのみ欠落）", () => {
    const { container } = render(<ModelViewer src="/models/brain.glb" hotspots={[]} title="脳" />);
    expect(container.querySelector("model-viewer")).not.toBeNull();
    expect(container.querySelectorAll("[slot^='hotspot-']")).toHaveLength(0);
  });
});

describe("ModelViewer: 失敗時の降格", () => {
  it("model-viewer の error イベントでプレースホルダへ降格する", () => {
    const { container } = render(
      <ModelViewer src="/models/nerves.glb" hotspots={HOTSPOTS} title="神経" />
    );
    const mv = requireModelViewer(container);
    fireEvent.error(mv);
    expect(container.querySelector("model-viewer")).toBeNull();
    expect(container.querySelector(".anatomy-viewer-note")?.textContent).toContain("失敗");
    // 降格後も凡例は残り情報を失わない。
    expect(container.querySelectorAll(".anatomy-hotspot")).toHaveLength(HOTSPOTS.length);
  });
});
