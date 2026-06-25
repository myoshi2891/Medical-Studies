import "@testing-library/jest-dom/vitest";
import { cleanup } from "@testing-library/react";
import { afterEach, vi } from "vitest";

// jsdom は matchMedia を実装しないため、PromApp のテーマ判定が参照できるよう最小スタブを注入する。
if (typeof window !== "undefined" && typeof window.matchMedia !== "function") {
  window.matchMedia = (query: string): MediaQueryList =>
    ({
      matches: false,
      media: query,
      onchange: null,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      addListener: vi.fn(),
      removeListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }) as unknown as MediaQueryList;
}

// jsdom は scrollTo / scrollIntoView を実装しない。移植コードは typeof ガードしているが、
// 念のためテスト中のノイズ（Not implemented）を抑止するため no-op を割り当てる。
if (typeof window !== "undefined") {
  window.scrollTo = vi.fn();
  Element.prototype.scrollIntoView = vi.fn();
}

// jsdom は IntersectionObserver を実装しない。ガイドページの scroll-spy（CpbSidebar）が
// マウント時に参照するため、最小の no-op スタブを注入する。
if (typeof globalThis.IntersectionObserver !== "function") {
  class IntersectionObserverStub implements IntersectionObserver {
    readonly root: Element | null = null;
    readonly rootMargin: string = "";
    readonly thresholds: ReadonlyArray<number> = [];
    observe = vi.fn();
    unobserve = vi.fn();
    disconnect = vi.fn();
    takeRecords = vi.fn(() => []);
  }
  globalThis.IntersectionObserver =
    IntersectionObserverStub as unknown as typeof IntersectionObserver;
}

// 各テスト後に DOM をクリーンアップ（RTL のデフォルト動作を明示化）
afterEach(() => {
  cleanup();
});
