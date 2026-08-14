import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

const stylesheet = readFileSync(
  join(import.meta.dirname, "headache-brainstem-neuroscience.css"),
  "utf8"
);

describe("headache-brainstem-neuroscience.css", () => {
  it("カスタムプロパティ群と通常宣言の間に空行を置く", () => {
    expect(stylesheet).toContain("  --brn-l: #e8eaf6;\n\n  font-family:");
  });

  it("セクションだけに外側余白を設定し、見出しにはスクロール余白だけを共有する", () => {
    expect(stylesheet).toMatch(
      /\.brainstem-page \.sec \{\n {2}margin: 40px 0;\n\}\n\.brainstem-page \.sec,\n\.brainstem-page \.sec-hd \{\n {2}scroll-margin-top: 120px;\n\}/
    );
    expect(stylesheet).toMatch(/\.brainstem-page \.sec-hd \{[\s\S]*?margin-bottom: 20px;/);
  });
});
