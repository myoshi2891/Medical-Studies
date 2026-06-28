import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Term from "./Term";

describe("Term: 表示と降格", () => {
  it("children を本文テキストとして描画する", () => {
    render(
      <Term term="大後頭神経" reading="だいこうとうしんけい" plain="後頭部の感覚を伝える神経。">
        大後頭神経
      </Term>
    );
    expect(screen.getByRole("button", { name: "大後頭神経" })).toBeInTheDocument();
  });

  it("用語集 id から term を解決して表示する", () => {
    render(<Term id="cgrp" />);
    expect(screen.getByRole("button", { name: "CGRP" })).toBeInTheDocument();
  });

  it("解説が解決できなければ素テキストへ降格しボタンを作らない", () => {
    render(<Term term="不明語">不明語</Term>);
    expect(screen.queryByRole("button")).toBeNull();
    expect(screen.getByText("不明語")).toBeInTheDocument();
  });
});

describe("Term: ツールチップ挙動", () => {
  it("初期はツールチップ非表示", () => {
    render(<Term id="cgrp" />);
    expect(screen.queryByRole("tooltip")).toBeNull();
  });

  it("フォーカスで読み仮名＋解説を表示する", () => {
    render(<Term id="cgrp" />);
    fireEvent.focus(screen.getByRole("button"));
    const tip = screen.getByRole("tooltip");
    expect(tip).toBeInTheDocument();
    expect(tip.textContent).toContain("シージーアールピー"); // 読み仮名
    expect(tip.textContent).toContain("片頭痛"); // やさしい解説の一部
  });

  it("クリックで開閉をトグルする", () => {
    render(<Term id="cgrp" />);
    const btn = screen.getByRole("button");
    fireEvent.click(btn);
    expect(screen.getByRole("tooltip")).toBeInTheDocument();
    fireEvent.click(btn);
    expect(screen.queryByRole("tooltip")).toBeNull();
  });

  it("Escape で閉じる", () => {
    render(<Term id="cgrp" />);
    const btn = screen.getByRole("button");
    fireEvent.focus(btn);
    expect(screen.getByRole("tooltip")).toBeInTheDocument();
    fireEvent.keyDown(btn, { key: "Escape" });
    expect(screen.queryByRole("tooltip")).toBeNull();
  });

  it("開いている間トリガに aria-describedby が付き tooltip の id を指す", () => {
    render(<Term id="cgrp" />);
    const btn = screen.getByRole("button");
    fireEvent.focus(btn);
    const tip = screen.getByRole("tooltip");
    expect(btn.getAttribute("aria-describedby")).toBe(tip.id);
  });
});
