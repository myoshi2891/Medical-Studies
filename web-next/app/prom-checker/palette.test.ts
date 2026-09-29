import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

const css = readFileSync(join(__dirname, "prom-checker.css"), "utf8");

/** セレクターが完全一致するブロックのカスタムプロパティを、記述順に上書きしながら集める。 */
function tokensFor(selector: string, source = css): Record<string, string> {
  const tokens: Record<string, string> = {};
  for (const match of source.matchAll(/([^{}]+)\{([^{}]*)\}/g)) {
    if (match[1].replace(/\/\*[\s\S]*?\*\//g, "").trim() !== selector) continue;
    for (const decl of match[2].matchAll(/(--[\w-]+):\s*([^;]+);/g)) {
      tokens[decl[1]] = decl[2].trim();
    }
  }
  return tokens;
}

function rgb(value: string): number[] {
  const hex = value.match(/^#([a-f\d]{6})$/i)?.[1];
  if (hex) return [0, 2, 4].map((i) => Number.parseInt(hex.slice(i, i + 2), 16));
  const parts = value.split(",").map((part) => Number(part.trim()));
  if (parts.length !== 3 || parts.some(Number.isNaN))
    throw new Error(`色を解釈できません: ${value}`);
  return parts;
}

function luminance([r, g, b]: number[]): number {
  const [lr, lg, lb] = [r, g, b].map((channel) => {
    const value = channel / 255;
    return value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4;
  });
  return lr * 0.2126 + lg * 0.7152 + lb * 0.0722;
}

function contrast(a: number[], b: number[]): number {
  const values = [luminance(a), luminance(b)];
  return (Math.max(...values) + 0.05) / (Math.min(...values) + 0.05);
}

const SNOOP_CHECKED = ".prom-app .c-snoop-item .c-chip input:checked + span";

describe("SNOOP4 ゲートの選択済みチップ", () => {
  it("文字色は専用トークン --color-danger-text を参照する", () => {
    const start = css.indexOf(`${SNOOP_CHECKED} {`);
    expect(start).toBeGreaterThanOrEqual(0);
    const rule = css.slice(start, css.indexOf("}", start));
    expect(rule).toMatch(/(?:;|\s)color:\s*var\(--color-danger-text\)/);
  });

  it("ライトテーマで淡赤背景に対し 4.5:1 以上のコントラストを確保する", () => {
    // Arrange: 背景 = --bg-main の上に rgba(--color-danger-rgb, .12) を合成
    const light = tokensFor(".prom-app");
    const base = rgb(light["--bg-main"]);
    const tint = rgb(light["--color-danger-rgb"]);
    const background = base.map((channel, i) => Math.round(tint[i] * 0.12 + channel * 0.88));
    // Act
    const text = rgb(light["--color-danger-text"] ?? light["--color-danger"]);
    // Assert
    expect(contrast(text, background)).toBeGreaterThanOrEqual(4.5);
  });

  it("ダークテーマ（手動・OS 追従）の文字色は従来の #f87171 のまま", () => {
    const autoDark = css.slice(css.lastIndexOf("@media (prefers-color-scheme: dark)"));
    for (const tokens of [
      tokensFor('.prom-app[data-theme="dark"]'),
      tokensFor('.prom-app[data-theme="auto"]', autoDark),
    ]) {
      expect(tokens["--color-danger-text"]).toBe("#f87171");
    }
  });
});

describe("印刷時のカード背景", () => {
  it("最終 @media print で .prom-app .c-card の背景を白に直接指定する（ダークテーマのトークンに依存しない）", () => {
    // Arrange: テーマ別スタイルより後ろにある最後の印刷ブロック
    const print = css.slice(css.lastIndexOf("@media print"));
    // Act
    const start = print.indexOf(".prom-app .c-card {");
    // Assert
    expect(start).toBeGreaterThanOrEqual(0);
    const rule = print.slice(start, print.indexOf("}", start));
    expect(rule).toMatch(/(?:;|\{|\s)background:\s*#fff(?:fff)?\s*;/);
  });
});

describe("印刷時のキッカー・表見出し", () => {
  const print = css.slice(css.lastIndexOf("@media print"));
  const ruleOf = (selector: string): string => {
    const start = print.indexOf(`${selector} {`);
    expect(start).toBeGreaterThanOrEqual(0);
    return print.slice(start, print.indexOf("}", start));
  };

  it(".c-card-kicker の文字色を黒に直接指定する（アクセント色トークンに依存しない）", () => {
    expect(ruleOf(".prom-app .c-card-kicker")).toMatch(/(?:;|\{|\s)color:\s*#000(?:000)?\s*;/);
  });

  it(".c-tbl thead th は白背景・黒文字で印刷する", () => {
    const rule = ruleOf(".prom-app .c-tbl thead th");
    expect(rule).toMatch(/(?:;|\{|\s)background:\s*#fff(?:fff)?\s*;/);
    expect(rule).toMatch(/(?:;|\{|\s)color:\s*#000(?:000)?\s*;/);
  });
});
