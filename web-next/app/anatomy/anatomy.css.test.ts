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

  it("MRI画像と操作列をデバイス幅に応じた表示幅で中央に保つ", () => {
    const mriContent = declarationsFor(".anatomy-mri-stage, .anatomy-mri-controls");

    expect(mriContent).toMatch(/width:\s*min\(100%,\s*clamp\(320px,\s*50vw,\s*520px\)\)/);
    expect(mriContent).toMatch(/align-self:\s*center/);
  });

  it("詳細画面の部位一覧を内部スクロールなしで全件表示する", () => {
    const partList = declarationsFor(".atlas-part-list");

    expect(partList).toMatch(/overflow:\s*visible/);
    expect(partList).not.toMatch(/max-height/);
    expect(partList).not.toMatch(/overflow-y:\s*auto/);
  });
});
