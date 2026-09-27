import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

const css = readFileSync(join(__dirname, "acute-treatment-of-headache.css"), "utf8");

function rule(selector: string): string {
  const start = css.indexOf(`.acute-treatment-of-headache ${selector} {`);
  expect(start).toBeGreaterThanOrEqual(0);
  return css.slice(start, css.indexOf("}", start));
}

function luminance(hex: string): number {
  const channels = hex.match(/[a-f\d]{2}/gi)?.map((part) => {
    const value = Number.parseInt(part, 16) / 255;
    return value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4;
  });
  if (channels?.length !== 3) throw new Error("6桁の色指定が必要です");
  return channels[0] * 0.2126 + channels[1] * 0.7152 + channels[2] * 0.0722;
}

describe("急性期治療ページの配色", () => {
  it("ヒーローと現在位置に、ケアをイメージした緑系を使う", () => {
    for (const selector of [".hero", ".nav-a.active"]) {
      const background = rule(selector).match(/background:\s*([^;]+)/)?.[1] ?? "";
      const colors = background.match(/#[a-f\d]{6}/gi) ?? [];
      expect(colors.length).toBeGreaterThan(0);
      for (const color of colors) {
        const red = Number.parseInt(color.slice(1, 3), 16);
        const green = Number.parseInt(color.slice(3, 5), 16);
        const blue = Number.parseInt(color.slice(5, 7), 16);
        expect(green).toBeGreaterThan(red);
        expect(green).toBeGreaterThan(blue);
      }
    }
  });

  it("開始ボタンと目次の通常・ホバー・現在位置で文字のコントラストを確保する", () => {
    for (const [foreground, background] of [
      [".ath-start", ".ath-start"],
      [".ath-start", ".ath-start:hover"],
      [".nav-a", ".sidebar"],
      [".nav-a:hover", ".nav-a:hover"],
      [".nav-a.active", ".nav-a.active"],
      [".n-num", ".n-num"],
    ]) {
      const text = rule(foreground).match(/(?:;|\s)color:\s*(#[a-f\d]+)/i)?.[1];
      const fill = rule(background).match(/background:\s*(#[a-f\d]+)/i)?.[1];
      const expand = (value: string | undefined) => {
        if (!value) throw new Error("文字色と背景色が必要です");
        return value.length === 4 ? value.replace(/[a-f\d]/gi, "$&$&") : value;
      };
      const values = [luminance(expand(text)), luminance(expand(fill))];
      expect((Math.max(...values) + 0.05) / (Math.min(...values) + 0.05)).toBeGreaterThanOrEqual(
        4.5
      );
    }
  });
});
