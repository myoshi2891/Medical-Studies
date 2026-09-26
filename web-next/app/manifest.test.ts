/**
 * ファビコン／アプリアイコン・Web App Manifest の契約テスト。
 *
 * デバイス別アイコン（ブラウザタブ・iOS ホーム画面・Android/PWA）が揃い、
 * manifest が参照する画像が実在して宣言どおりの寸法であることを検証する。
 * 画像は `scripts/generate-icons.mjs` で生成する。
 */

import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import manifest from "./manifest";

// jsdom 環境では import.meta.url が file: スキームにならないため cwd（web-next）起点で解決する
const appDir = join(process.cwd(), "app");
const publicDir = join(process.cwd(), "public");

/** PNG の IHDR から幅・高さを読む */
function pngSize(buf: Buffer): { width: number; height: number } {
  return { width: buf.readUInt32BE(16), height: buf.readUInt32BE(20) };
}

describe("manifest", () => {
  it("名前・起動 URL・表示モードを持つ", () => {
    const m = manifest();
    expect(m.name).toBeTruthy();
    expect(m.short_name).toBeTruthy();
    expect(m.start_url).toBe("/");
    expect(m.display).toBe("standalone");
  });

  it("192px・512px（any）と 512px（maskable）のアイコンを宣言する", () => {
    const icons = manifest().icons ?? [];
    const keys = icons.map((i) => `${i.sizes}:${i.purpose}`);
    expect(keys).toEqual(
      expect.arrayContaining(["192x192:any", "512x512:any", "512x512:maskable"])
    );
  });

  it("宣言したアイコンが public/ に実在し、寸法が sizes と一致する", () => {
    for (const icon of manifest().icons ?? []) {
      const file = join(publicDir, icon.src);
      expect(existsSync(file), icon.src).toBe(true);
      const { width, height } = pngSize(readFileSync(file));
      expect(`${width}x${height}`).toBe(icon.sizes);
    }
  });
});

describe("app/ のアイコンファイル規約", () => {
  it("icon.svg（モダンブラウザ用）が SVG である", () => {
    const svg = readFileSync(join(appDir, "icon.svg"), "utf8");
    expect(svg).toContain("<svg");
  });

  it("icon.svg の先頭の子要素に空でないアクセシブルなタイトルを持つ", () => {
    const svg = readFileSync(join(appDir, "icon.svg"), "utf8");
    const document = new DOMParser().parseFromString(svg, "image/svg+xml");
    expect(document.querySelector("parsererror")).toBeNull();
    const title = document.documentElement.firstElementChild;
    expect(title?.localName).toBe("title");
    expect(title?.textContent?.trim()).toBeTruthy();
  });

  it("apple-icon.png（iOS 用）が 180x180 である", () => {
    const size = pngSize(readFileSync(join(appDir, "apple-icon.png")));
    expect(size).toEqual({ width: 180, height: 180 });
  });

  it("favicon.ico（レガシー用）が 16/32/48px を含む", () => {
    const ico = readFileSync(join(appDir, "favicon.ico"));
    const count = ico.readUInt16LE(4);
    const sizes = Array.from({ length: count }, (_, i) => ico.readUInt8(6 + 16 * i));
    expect(sizes).toEqual([16, 32, 48]);
  });
});
