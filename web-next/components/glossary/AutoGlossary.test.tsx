import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import AutoGlossary from "./AutoGlossary";
import Term from "./Term";

describe("AutoGlossary: 自動ラップ", () => {
  it("文字列中の既知用語を Term（button）化する", () => {
    render(
      <AutoGlossary>
        <p>片頭痛はよくある頭痛です。</p>
      </AutoGlossary>
    );
    expect(screen.getByRole("button", { name: "片頭痛" })).toBeInTheDocument();
  });

  it("同一用語はページ内で1回だけラップする", () => {
    render(
      <AutoGlossary>
        <p>片頭痛と片頭痛。</p>
      </AutoGlossary>
    );
    expect(screen.getAllByRole("button", { name: "片頭痛" })).toHaveLength(1);
  });

  it("最長一致を優先する（大後頭神経 を 後頭神経 より優先）", () => {
    render(
      <AutoGlossary>
        <p>大後頭神経のブロック。</p>
      </AutoGlossary>
    );
    expect(screen.getByRole("button", { name: "大後頭神経" })).toBeInTheDocument();
    expect(screen.queryByRole("button", { name: "後頭神経" })).toBeNull();
  });

  it("<a> 配下はラップしない（リンク内ボタン禁止）", () => {
    render(
      <AutoGlossary>
        <a href="#x">片頭痛</a>
      </AutoGlossary>
    );
    expect(screen.queryByRole("button")).toBeNull();
  });

  it("既存の手動 Term は温存し、同じ id の後続出現はラップしない", () => {
    render(
      <AutoGlossary>
        <p>
          <Term id="migraine">片頭痛</Term>と、もう一度片頭痛。
        </p>
      </AutoGlossary>
    );
    expect(screen.getAllByRole("button", { name: "片頭痛" })).toHaveLength(1);
  });

  it("textContent を変えない", () => {
    const text = "緊張型頭痛と片頭痛の違い。";
    const { container } = render(
      <AutoGlossary>
        <p>{text}</p>
      </AutoGlossary>
    );
    expect(container.querySelector("p")?.textContent).toBe(text);
  });

  it("既知用語が無いテキストは変化しない（ボタンなし）", () => {
    render(
      <AutoGlossary>
        <p>これは普通の文章です。</p>
      </AutoGlossary>
    );
    expect(screen.queryByRole("button")).toBeNull();
  });

  it("ネストした要素の中の用語もラップする", () => {
    render(
      <AutoGlossary>
        <div>
          <ul>
            <li>
              <strong>緊張型頭痛</strong>について
            </li>
          </ul>
        </div>
      </AutoGlossary>
    );
    expect(screen.getByRole("button", { name: "緊張型頭痛" })).toBeInTheDocument();
  });
});
