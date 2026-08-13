import { act, render } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { StraightNeckSidebar } from "./StraightNeckSidebar";

/**
 * StraightNeckSidebar の scroll-spy 契約テスト。
 *
 * IntersectionObserver のコールバックに渡る entries の順序は仕様上不定であり、
 * 「最後の isIntersecting な entry」を採用すると、ビューポート上端から遠い section が
 * カレント表示になってしまう。可視 section 集合を保持し、boundingClientRect の上端が
 * ビューポート上端に最も近い section を選ぶことを保証する。
 */

type ObserverCallback = (entries: IntersectionObserverEntry[]) => void;

let capturedCallback: ObserverCallback | null = null;
const originalObserver = globalThis.IntersectionObserver;

class CapturingIntersectionObserver implements IntersectionObserver {
  readonly root: Element | null = null;
  readonly rootMargin: string = "";
  readonly thresholds: ReadonlyArray<number> = [];
  constructor(callback: ObserverCallback) {
    capturedCallback = callback;
  }
  observe(): void {
    // 監視登録は不要（テストは capturedCallback を直接呼ぶ）
  }
  unobserve(): void {
    // 監視解除も不要（登録していないため）
  }
  disconnect(): void {
    // 破棄処理は不要（capturedCallback は beforeEach でリセットする）
  }
  takeRecords(): IntersectionObserverEntry[] {
    return [];
  }
}

/** section の現在位置を差し替える（jsdom は常に top: 0 を返すため）。 */
function setSectionTop(id: string, top: number): HTMLElement {
  const target = document.getElementById(id);
  if (target === null) throw new Error(`section #${id} が DOM にありません`);
  target.getBoundingClientRect = () => ({ top }) as DOMRect;
  return target;
}

/** テスト用の最小 entry。併せて section の現在位置も `top` に合わせる。 */
function makeEntry(id: string, top: number, isIntersecting: boolean): IntersectionObserverEntry {
  const target = setSectionTop(id, top);
  return {
    target,
    isIntersecting,
    boundingClientRect: { top } as DOMRectReadOnly,
  } as unknown as IntersectionObserverEntry;
}

/** 本文の section 群を最小構成で用意する（本体は Server Component のため）。 */
function mountSections(ids: readonly string[]): void {
  for (const id of ids) {
    const el = document.createElement("section");
    el.id = id;
    document.body.appendChild(el);
  }
}

const activeLabel = (container: HTMLElement): string | undefined =>
  container.querySelector("a.active")?.textContent ?? undefined;

describe("StraightNeckSidebar", () => {
  beforeEach(() => {
    capturedCallback = null;
    globalThis.IntersectionObserver =
      CapturingIntersectionObserver as unknown as typeof IntersectionObserver;
    mountSections(["s1", "s2", "s3", "s4"]);
  });

  afterEach(() => {
    globalThis.IntersectionObserver = originalObserver;
    document.body.innerHTML = "";
  });

  it("複数 section が可視のとき、entry 順序に依らずビューポート上端に最も近い section を active にする", () => {
    const { container } = render(<StraightNeckSidebar />);

    // entries の順序は「上端に最も近い s2 が先頭」— 最後の entry を採用する実装だと s3 が選ばれる。
    act(() => {
      capturedCallback?.([
        makeEntry("s2", 40, true),
        makeEntry("s4", 620, true),
        makeEntry("s3", 300, true),
      ]);
    });

    expect(activeLabel(container)).toContain("ストレートネックとは");

    // 同じ可視 section を逆順で通知しても選択は変わらない（先頭 entry 依存でないことの保証）。
    act(() => {
      capturedCallback?.([
        makeEntry("s3", 300, true),
        makeEntry("s4", 620, true),
        makeEntry("s2", 40, true),
      ]);
    });

    expect(activeLabel(container)).toContain("ストレートネックとは");
  });

  it("可視のままスクロールで位置が入れ替わったら、再計測して active を更新する", () => {
    const { container } = render(<StraightNeckSidebar />);

    act(() => {
      capturedCallback?.([makeEntry("s2", 40, true), makeEntry("s3", 300, true)]);
    });
    expect(activeLabel(container)).toContain("ストレートネックとは");

    // 双方とも可視のままスクロールした場合、IntersectionObserver は再通知しない。
    // 通知時の座標を保持したままだと active が固まるため、現在位置を測り直す必要がある。
    setSectionTop("s2", -320);
    setSectionTop("s3", 20);
    act(() => {
      window.dispatchEvent(new Event("scroll"));
    });

    expect(activeLabel(container)).toContain("発症メカニズム");
  });

  it("可視 section 集合を保持し、離脱した section を除いた残りから active を選ぶ", () => {
    const { container } = render(<StraightNeckSidebar />);

    act(() => {
      capturedCallback?.([makeEntry("s2", 30, true), makeEntry("s3", 500, true)]);
    });
    expect(activeLabel(container)).toContain("ストレートネックとは");

    // s2 が上へ抜けた通知だけが届いても、残る s3 が active にならなければならない。
    act(() => {
      capturedCallback?.([makeEntry("s2", -400, false)]);
    });
    expect(activeLabel(container)).toContain("発症メカニズム");
  });
});
