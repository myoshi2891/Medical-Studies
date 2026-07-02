import { fireEvent, render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { searchAnatomy } from "@/lib/anatomy/search";
import AnatomySearch from "./AnatomySearch";

/**
 * AnatomySearch（autocomplete アイランド）の契約テスト。
 * WAI-ARIA combobox パターン（combobox + listbox + option / aria-activedescendant）と
 * 検索コア `searchAnatomy` との整合、キーボード操作を保証する（promp.md ② / ⑬）。
 */
function getCombobox(container: HTMLElement): HTMLInputElement {
  const el = container.querySelector<HTMLInputElement>('[role="combobox"]');
  if (!el) throw new Error("combobox が見つかりません");
  return el;
}

describe("AnatomySearch: 初期状態", () => {
  it("combobox 入力を描画し、初期は listbox を開かない", () => {
    const { container } = render(<AnatomySearch />);
    const combo = getCombobox(container);
    expect(combo.getAttribute("aria-expanded")).toBe("false");
    expect(container.querySelector('[role="listbox"]')).toBeNull();
  });
});

describe("AnatomySearch: 候補表示", () => {
  it("V1 入力で listbox を開き、コアのヒット件数と一致する option を出す", () => {
    const { container } = render(<AnatomySearch />);
    fireEvent.change(getCombobox(container), { target: { value: "V1" } });
    const options = container.querySelectorAll('[role="option"]');
    expect(options.length).toBe(searchAnatomy("V1").length);
    expect(getCombobox(container).getAttribute("aria-expanded")).toBe("true");
  });

  it("option は href を持つアンカーで、コアの href と一致する", () => {
    const { container } = render(<AnatomySearch />);
    fireEvent.change(getCombobox(container), { target: { value: "V1" } });
    const first = container.querySelector('[role="option"]');
    expect(first?.tagName).toBe("A");
    expect(first?.getAttribute("href")).toBe(searchAnatomy("V1")[0].href);
  });

  it("ヒット無しのクエリでは listbox でなく no-results を表示する", () => {
    const { container } = render(<AnatomySearch />);
    fireEvent.change(getCombobox(container), { target: { value: "zzzznope" } });
    expect(container.querySelector('[role="listbox"]')).toBeNull();
    expect(container.querySelector(".anatomy-search-empty")).not.toBeNull();
  });
});

describe("AnatomySearch: キーボード操作", () => {
  it("ArrowDown で先頭 option を activedescendant に設定する", () => {
    const { container } = render(<AnatomySearch />);
    const combo = getCombobox(container);
    fireEvent.change(combo, { target: { value: "V1" } });
    fireEvent.keyDown(combo, { key: "ArrowDown" });
    const active = combo.getAttribute("aria-activedescendant");
    expect(active).toBeTruthy();
    const option = active ? document.getElementById(active) : null;
    expect(option?.getAttribute("aria-selected")).toBe("true");
  });

  it("Escape で入力をクリアし listbox を閉じる", () => {
    const { container } = render(<AnatomySearch />);
    const combo = getCombobox(container);
    fireEvent.change(combo, { target: { value: "V1" } });
    fireEvent.keyDown(combo, { key: "Escape" });
    expect(combo.value).toBe("");
    expect(container.querySelector('[role="listbox"]')).toBeNull();
  });
});
