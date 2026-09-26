import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

const stylesheet = readFileSync(join(__dirname, "anatomy.css"), "utf8");

function declarationsFor(selector: string): string {
  const escapedSelector = selector.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const match = stylesheet.match(new RegExp(`${escapedSelector}\\s*\\{([^}]*)\\}`));

  expect(match, `${selector} の CSS ルールが存在すること`).not.toBeNull();
  return match?.[1] ?? "";
}

describe("anatomy レイアウト", () => {
  it("メインレイアウトを画面幅まで広げる", () => {
    const declarations = declarationsFor(".anatomy-layout");

    expect(declarations).toMatch(/width:\s*100%/);
    expect(declarations).toMatch(/max-width:\s*none/);
  });

  it("3D と MRI を同じ横幅で縦に並べる", () => {
    const viewers = declarationsFor(".anatomy-viewers");
    const children = declarationsFor(".anatomy-viewers > *");

    expect(viewers).toMatch(/grid-template-columns:\s*minmax\(0,\s*1fr\)/);
    expect(children).toMatch(/width:\s*100%/);
    expect(children).toMatch(/min-width:\s*0/);
  });
});
