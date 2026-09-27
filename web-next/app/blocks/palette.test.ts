import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

function paletteFor(slug: string) {
  const css = readFileSync(join(__dirname, slug, `${slug}.css`), "utf8");
  const scope = css.match(/^\.[\w-]+/m)?.[0];
  if (!scope) throw new Error("ページのスコープが必要です");

  // 複数セレクターと後続の上書きを含め、各表示状態の色を比較する。
  const palette: Record<string, string> = {};
  for (const [selector, property] of [
    [".hero", "background"],
    [".hero", "color"],
    [".hero-sub", "color"],
    [".hero-tag", "color"],
    [".disclaimer", "background"],
    [".disclaimer", "color"],
    [".disclaimer strong", "color"],
    [".sidebar", "background"],
    [".s-hdr", "color"],
    [".nav-a", "color"],
    [".nav-a:hover", "background"],
    [".nav-a:hover", "color"],
    [".nav-a.active", "background"],
    [".nav-a.active", "color"],
    [".n-num", "background"],
    [".n-num", "color"],
    [".nav-a.active .n-num", "background"],
    [".nav-a.active .n-num", "color"],
    [":focus-visible", "outline"],
  ]) {
    for (const match of css.matchAll(/([^{}]+)\{([^{}]*)\}/g)) {
      const selectors = match[1].replace(/\/\*[\s\S]*?\*\//g, "").split(",");
      if (!selectors.some((value) => value.trim() === `${scope} ${selector}`)) continue;
      const value = match[2].match(new RegExp(`(?:^|;)\\s*${property}:\\s*([^;]+)`))?.[1];
      if (value) palette[`${selector} / ${property}`] = value.trim();
    }
  }
  return palette;
}

const reference = paletteFor("occipital-nerve-block");
const pages = readdirSync(__dirname, { withFileTypes: true })
  .filter((entry) => entry.isDirectory())
  .map((entry) => entry.name);

describe("神経ブロックカテゴリーの共通配色", () => {
  it.each(pages)("%s の導入・目次・フォーカスが後頭神経ブロックページと揃う", (slug) => {
    expect(paletteFor(slug)).toEqual(reference);
  });
});
