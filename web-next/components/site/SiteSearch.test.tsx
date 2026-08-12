import { fireEvent, render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { searchContent } from "@/lib/content/search";
import SiteSearch, { MAX_VISIBLE_HITS } from "./SiteSearch";

/**
 * SiteSearch（ヘッダー常設のサイト横断検索アイランド）の契約テスト。
 *
 * `AnatomySearch.test.tsx` を手本に、WAI-ARIA combobox パターンと
 * 検索コア `searchContent` との整合、キーボード操作を保証する（plans/007 Step 2 の UI 層）。
 */
function getCombobox(container: HTMLElement): HTMLInputElement {
  const el = container.querySelector<HTMLInputElement>('[role="combobox"]');
  if (!el) throw new Error("combobox が見つかりません");
  return el;
}

describe("SiteSearch: 初期状態", () => {
  it("combobox 入力を描画し、初期は listbox を開かない", () => {
    const { container } = render(<SiteSearch />);
    const combo = getCombobox(container);
    expect(combo.getAttribute("aria-expanded")).toBe("false");
    expect(container.querySelector('[role="listbox"]')).toBeNull();
  });
});

describe("SiteSearch: 候補表示", () => {
  it("CGRP 入力で listbox を開き、コアのヒット件数と一致する option を出す", () => {
    const { container } = render(<SiteSearch />);
    fireEvent.change(getCombobox(container), { target: { value: "CGRP" } });
    const options = container.querySelectorAll('[role="option"]');
    expect(options.length).toBe(searchContent("CGRP").length);
    expect(getCombobox(container).getAttribute("aria-expanded")).toBe("true");
  });

  it("option はコアの href を持つアンカーである", () => {
    const { container } = render(<SiteSearch />);
    fireEvent.change(getCombobox(container), { target: { value: "CGRP" } });
    const first = container.querySelector('[role="option"]');
    expect(first?.tagName).toBe("A");
    expect(first?.getAttribute("href")).toBe(searchContent("CGRP")[0]?.href);
  });

  it("候補にはカテゴリ表示名（context）が併記される", () => {
    const { container } = render(<SiteSearch />);
    fireEvent.change(getCombobox(container), { target: { value: "MIDAS" } });
    const meta = container.querySelector(".site-search-opt-meta");
    expect(meta?.textContent).toBe(searchContent("MIDAS")[0]?.context);
  });

  it("ヒット無しのクエリでは listbox でなく no-results を表示する", () => {
    const { container } = render(<SiteSearch />);
    fireEvent.change(getCombobox(container), { target: { value: "zzzznope" } });
    expect(container.querySelector('[role="listbox"]')).toBeNull();
    expect(container.querySelector(".site-search-empty")).not.toBeNull();
  });

  it("空白のみの入力では何も開かない", () => {
    const { container } = render(<SiteSearch />);
    fireEvent.change(getCombobox(container), { target: { value: "   " } });
    expect(container.querySelector('[role="listbox"]')).toBeNull();
    expect(container.querySelector(".site-search-empty")).toBeNull();
  });
});

describe("SiteSearch: キーボード操作", () => {
  it("ArrowDown で先頭 option を activedescendant に設定する", () => {
    const { container } = render(<SiteSearch />);
    const combo = getCombobox(container);
    fireEvent.change(combo, { target: { value: "CGRP" } });
    fireEvent.keyDown(combo, { key: "ArrowDown" });
    const active = combo.getAttribute("aria-activedescendant");
    expect(active).toBeTruthy();
    const option = active ? document.getElementById(active) : null;
    expect(option?.getAttribute("aria-selected")).toBe("true");
  });

  it("Escape で入力をクリアし listbox を閉じる", () => {
    const { container } = render(<SiteSearch />);
    const combo = getCombobox(container);
    fireEvent.change(combo, { target: { value: "CGRP" } });
    fireEvent.keyDown(combo, { key: "Escape" });
    expect(combo.value).toBe("");
    expect(container.querySelector('[role="listbox"]')).toBeNull();
  });

  it("未選択のまま Enter すると先頭候補へ暗黙遷移する", () => {
    // 候補は内部ルートのアンカーのため、click がそのまま jsdom の未実装遷移を起こす。
    // キャプチャ段階で既定動作だけ止め、コンポーネント側の onClick は通常どおり走らせる。
    // 同時に click 対象のアンカーを捕捉し、「どこへ」遷移したかまで固定する
    // （パネルが閉じるだけでは、誤った候補を click しても検知できない）。
    let clickedHref: string | null = null;
    const suppressNavigation = (e: Event) => {
      e.preventDefault();
      const target = e.target;
      if (target instanceof HTMLElement) {
        clickedHref = target.closest("a")?.getAttribute("href") ?? null;
      }
    };
    document.addEventListener("click", suppressNavigation, true);
    try {
      const { container } = render(<SiteSearch />);
      const combo = getCombobox(container);
      fireEvent.change(combo, { target: { value: "CGRP" } });
      fireEvent.keyDown(combo, { key: "Enter" });
      expect(clickedHref).toBe(searchContent("CGRP")[0]?.href);
      expect(combo.value).toBe("");
      expect(container.querySelector('[role="listbox"]')).toBeNull();
    } finally {
      document.removeEventListener("click", suppressNavigation, true);
    }
  });
});

describe("SiteSearch: フォーカス離脱", () => {
  it("コンテナ外へフォーカスが移ると候補パネルを閉じる", () => {
    const { container } = render(<SiteSearch />);
    const combo = getCombobox(container);
    fireEvent.change(combo, { target: { value: "CGRP" } });
    expect(container.querySelector('[role="listbox"]')).not.toBeNull();

    const outside = document.createElement("button");
    document.body.appendChild(outside);
    try {
      fireEvent.blur(combo, { relatedTarget: outside });
      expect(combo.value).toBe("");
      expect(container.querySelector('[role="listbox"]')).toBeNull();
    } finally {
      outside.remove();
    }
  });

  it("入力欄から候補項目への内部移動では閉じない", () => {
    const { container } = render(<SiteSearch />);
    const combo = getCombobox(container);
    fireEvent.change(combo, { target: { value: "CGRP" } });
    const option = container.querySelector<HTMLElement>('[role="option"]');
    expect(option).not.toBeNull();

    fireEvent.blur(combo, { relatedTarget: option });
    expect(combo.value).toBe("CGRP");
    expect(container.querySelector('[role="listbox"]')).not.toBeNull();
  });
});

describe("SiteSearch: 候補件数の上限", () => {
  it("広く当たるクエリでも表示件数を上限で打ち切る", () => {
    const { container } = render(<SiteSearch />);
    // 1 文字クエリはレジストリ全体に広く当たる（上限が無ければ全件描画される）。
    fireEvent.change(getCombobox(container), { target: { value: "頭" } });
    const options = container.querySelectorAll('[role="option"]');
    expect(searchContent("頭").length).toBeGreaterThan(MAX_VISIBLE_HITS);
    expect(options.length).toBe(MAX_VISIBLE_HITS);
  });
});
