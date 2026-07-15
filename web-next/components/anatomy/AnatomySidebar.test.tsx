import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ANATOMY_MANIFEST } from "@/lib/anatomy/manifest";
import { AnatomySidebar } from "./AnatomySidebar";

/**
 * AnatomySidebar（scroll-spy 左ナビ）の契約テスト。
 * ナビ項目は manifest（`ANATOMY_MANIFEST`）駆動で、各構造へ `#<id>` アンカーで導線を張り、
 * 初期は先頭構造をカレント表示する（MigraineSidebar 同型 / promp.md ③）。
 * jsdom の IntersectionObserver は no-op スタブのため、scroll-spy 更新は視覚検証に委ねる。
 */
describe("AnatomySidebar", () => {
  it("nav をラベル付きで描画する", () => {
    const { container } = render(<AnatomySidebar />);
    const nav = container.querySelector("nav");
    expect(nav).not.toBeNull();
    expect(nav?.getAttribute("aria-label")).toBeTruthy();
  });

  it("manifest の全構造分のアンカーを #<id> 順で描画する", () => {
    const { container } = render(<AnatomySidebar />);
    const hrefs = Array.from(container.querySelectorAll("a")).map((a) => a.getAttribute("href"));
    expect(hrefs).toEqual(ANATOMY_MANIFEST.map((s) => `#${s.id}`));
  });

  it("各アンカーが対応する構造名を表示する", () => {
    const { container } = render(<AnatomySidebar />);
    const links = Array.from(container.querySelectorAll("a"));
    ANATOMY_MANIFEST.forEach((s, i) => {
      expect(links[i]?.textContent).toContain(s.title);
    });
  });

  it("初期は先頭構造だけを aria-current=location とする", () => {
    const { container } = render(<AnatomySidebar />);
    const links = Array.from(container.querySelectorAll("a"));
    expect(links[0]?.getAttribute("aria-current")).toBe("location");
    for (const link of links.slice(1)) {
      expect(link.getAttribute("aria-current")).toBeNull();
    }
  });
});
