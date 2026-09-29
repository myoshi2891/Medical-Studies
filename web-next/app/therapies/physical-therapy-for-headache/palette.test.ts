import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

const css = readFileSync(join(__dirname, "physical-therapy-for-headache.css"), "utf8");

function rule(selector: string): string {
  const start = css.indexOf(`.physical-therapy-accent ${selector} {`);
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

describe("理学療法ページの配色", () => {
  it("ヒーローを落ち着いた濃さに戻し、明るい文字で読みやすさを保つ", () => {
    const backgrounds =
      rule(".hero")
        .match(/background:\s*([^;]+)/)?.[1]
        .match(/#[a-f\d]{6}/gi) ?? [];
    expect(backgrounds).toHaveLength(2);
    for (const background of backgrounds) {
      expect(luminance(background)).toBeLessThan(0.2);
      for (const selector of [
        ".hero",
        ".pt-breadcrumb",
        ".pt-eyebrow",
        ".hero-sub",
        ".pt-hero-stats dt",
        ".hero-tag",
      ]) {
        const foreground = rule(selector).match(/(?:;|\s)color:\s*(#[a-f\d]{6})/i)?.[1];
        if (!foreground) throw new Error("ヒーローの文字色が必要です");
        expect(
          (luminance(foreground) + 0.05) / (luminance(background) + 0.05)
        ).toBeGreaterThanOrEqual(4.5);
      }
    }
  });

  it("ヒーローと現在位置に、温かみのあるローズ・コーラル系を使う", () => {
    for (const selector of [".hero", ".nav-a.active"]) {
      const background = rule(selector).match(/background:\s*([^;]+)/)?.[1] ?? "";
      const colors = background.match(/#[a-f\d]{6}/gi) ?? [];
      expect(colors.length).toBeGreaterThan(0);
      for (const color of colors) {
        const red = Number.parseInt(color.slice(1, 3), 16);
        const green = Number.parseInt(color.slice(3, 5), 16);
        const blue = Number.parseInt(color.slice(5, 7), 16);
        expect(red).toBeGreaterThan(blue);
        expect(blue).toBeGreaterThan(green);
      }
    }
  });

  it("アクセント変数 --pt1〜--pt3 をヒーローと同じローズ・モーブ系にする", () => {
    for (const name of ["--pt1", "--pt2", "--pt3"]) {
      const color = css.match(new RegExp(`${name}:\\s*(#[a-f\\d]{6})`, "i"))?.[1];
      if (!color) throw new Error(`${name} の 6 桁の色指定が必要です`);
      const [red, green, blue] = [1, 3, 5].map((i) => Number.parseInt(color.slice(i, i + 2), 16));
      expect(red).toBeGreaterThan(blue);
      expect(blue).toBeGreaterThan(green);
    }
  });

  it("表の見出し・縞・ホバー背景をローズ系で揃え、文字のコントラストを確保する", () => {
    const token = (name: string) => {
      const color = css.match(new RegExp(`${name}:\\s*(#[a-f\\d]{6})`, "i"))?.[1];
      if (!color) throw new Error(`${name} の 6 桁の色指定が必要です`);
      return color;
    };
    const resolve = (value: string | undefined) => {
      const variable = value?.match(/^var\((--[\w-]+)\)$/)?.[1];
      return variable ? token(variable) : value;
    };
    const ratio = (a: string, b: string) => {
      const values = [luminance(a), luminance(b)];
      return (Math.max(...values) + 0.05) / (Math.min(...values) + 0.05);
    };

    // 見出し: 白文字 on --pt2
    const head = rule("thead th");
    const headFill = resolve(head.match(/background:\s*([^;]+)/)?.[1]?.trim());
    const headText = head
      .match(/(?:;|\s)color:\s*(#[a-f\d]{3}(?:[a-f\d]{3})?)\b/i)?.[1]
      ?.replace(/^#([a-f\d])([a-f\d])([a-f\d])$/i, "#$1$1$2$2$3$3");
    if (!headFill || !headText) throw new Error("表見出しの文字色と背景色が必要です");
    expect(ratio(headText, headFill)).toBeGreaterThanOrEqual(4.5);

    // 縞・ホバー: 赤み優位（R > B ≥ G）で本文色 --g9 と 4.5:1 以上
    for (const selector of ["tbody tr:nth-child(even)", "tbody tr:hover"]) {
      const fill = rule(selector).match(/background:\s*(#[a-f\d]{6})/i)?.[1];
      if (!fill) throw new Error(`${selector} の 6 桁の背景色が必要です`);
      const [red, green, blue] = [1, 3, 5].map((i) => Number.parseInt(fill.slice(i, i + 2), 16));
      expect(red).toBeGreaterThan(blue);
      expect(blue).toBeGreaterThanOrEqual(green);
      expect(ratio(token("--g9"), fill)).toBeGreaterThanOrEqual(4.5);
    }
  });

  it("開始ボタンと目次の通常・ホバー・現在位置で文字のコントラストを確保する", () => {
    for (const [foreground, background] of [
      [".pt-start", ".pt-start"],
      [".pt-start", ".pt-start:hover"],
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
