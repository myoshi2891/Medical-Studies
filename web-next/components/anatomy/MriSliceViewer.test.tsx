import { fireEvent, render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import type { MriSeries } from "@/lib/anatomy/types";
import MriSliceViewer from "./MriSliceViewer";

const SERIES: MriSeries = {
  id: "brain",
  bodyPart: "brain",
  slices: ["/mri/brain/01.png", "/mri/brain/02.png", "/mri/brain/03.png"],
  note: "代表スライス",
};

describe("MriSliceViewer: 降格表示", () => {
  it("mri=null でプレースホルダを表示しステージを描画しない", () => {
    const { container } = render(<MriSliceViewer mri={null} title="神経" />);
    expect(container.querySelector(".anatomy-mri-empty")).not.toBeNull();
    expect(container.querySelector(".anatomy-mri-stage")).toBeNull();
  });

  it("slices が空でもプレースホルダを表示する", () => {
    const empty: MriSeries = { id: "x", bodyPart: "brain", slices: [] };
    const { container } = render(<MriSliceViewer mri={empty} title="神経" />);
    expect(container.querySelector(".anatomy-mri-empty")).not.toBeNull();
  });
});

describe("MriSliceViewer: 初期描画", () => {
  it("1 枚目を src・alt とともに表示する", () => {
    const { container } = render(<MriSliceViewer mri={SERIES} title="脳" />);
    const img = container.querySelector<HTMLImageElement>(".anatomy-mri-img");
    expect(img?.getAttribute("src")).toBe("/mri/brain/01.png");
    expect(img?.getAttribute("alt")).toBe("脳 の MRI スライス 1/3");
  });

  it("読影風オーバーレイに series ラベルとスライス番号を表示する", () => {
    const { container } = render(<MriSliceViewer mri={SERIES} title="脳" />);
    const stage = container.querySelector(".anatomy-mri-stage");
    expect(stage).not.toBeNull();
    expect(container.querySelector(".anatomy-mri-ov-series")?.textContent).toBe("BRAIN");
    expect(container.querySelector(".anatomy-mri-ov-index")?.textContent).toBe("1/3");
  });

  it("note を表示する", () => {
    const { container } = render(<MriSliceViewer mri={SERIES} title="脳" />);
    expect(container.querySelector(".anatomy-mri-note")?.textContent).toBe("代表スライス");
  });
});

describe("MriSliceViewer: スクラブ操作", () => {
  it("次へボタンで 1 枚進む", () => {
    const { container, getByLabelText } = render(<MriSliceViewer mri={SERIES} title="脳" />);
    fireEvent.click(getByLabelText("次のスライス"));
    expect(container.querySelector(".anatomy-mri-ov-index")?.textContent).toBe("2/3");
    expect(container.querySelector(".anatomy-mri-img")?.getAttribute("src")).toBe(
      "/mri/brain/02.png"
    );
  });

  it("先頭で前へを押しても先頭に留まる（下端クランプ）", () => {
    const { container, getByLabelText } = render(<MriSliceViewer mri={SERIES} title="脳" />);
    fireEvent.click(getByLabelText("前のスライス"));
    expect(container.querySelector(".anatomy-mri-ov-index")?.textContent).toBe("1/3");
  });

  it("スライダーで任意のスライスへ移動する", () => {
    const { container, getByLabelText } = render(<MriSliceViewer mri={SERIES} title="脳" />);
    fireEvent.change(getByLabelText("スライス選択"), { target: { value: "2" } });
    expect(container.querySelector(".anatomy-mri-ov-index")?.textContent).toBe("3/3");
  });
});

describe("MriSliceViewer: キーボード操作", () => {
  // キーボードスクラブはネイティブ <input type="range"> が担う（矢印キー対応）。
  // ステージはフォーカス順に入れない純粋な表示要素（a11y アンチパターン回避）。
  it("ステージは tabIndex / role を持たない表示専用要素である", () => {
    const { container } = render(<MriSliceViewer mri={SERIES} title="脳" />);
    const stage = container.querySelector(".anatomy-mri-stage");
    expect(stage).not.toBeNull();
    expect(stage?.getAttribute("tabindex")).toBeNull();
    expect(stage?.getAttribute("role")).toBeNull();
  });

  it("スライダーがキーボード到達可能な操作子として存在する", () => {
    const { getByLabelText } = render(<MriSliceViewer mri={SERIES} title="脳" />);
    const slider = getByLabelText("スライス選択");
    expect(slider.tagName).toBe("INPUT");
    expect(slider.getAttribute("type")).toBe("range");
  });
});
