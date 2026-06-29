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

  it("用語集に無い id は id 文字列を可視テキストに降格しボタンを作らない", () => {
    // children も term も無く id が用語集未登録 → display = id（最後のフォールバック）。
    render(<Term id="__missing__" />);
    expect(screen.queryByRole("button")).toBeNull();
    expect(screen.getByText("__missing__")).toBeInTheDocument();
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

  it("ポインタのクリックで開閉をトグルする（pointerDown→focus→click の実順序）", () => {
    render(<Term id="cgrp" />);
    const btn = screen.getByRole("button");
    // 実ブラウザのポインタ操作は pointerdown→focus→click の順。focus が開き、同一操作の click は二重発火しない。
    fireEvent.pointerDown(btn);
    fireEvent.focus(btn);
    fireEvent.click(btn);
    expect(screen.getByRole("tooltip")).toBeInTheDocument();
    // 2 回目のポインタクリック（focus 済み）でトグルして閉じる。
    fireEvent.pointerDown(btn);
    fireEvent.click(btn);
    expect(screen.queryByRole("tooltip")).toBeNull();
  });

  it("キーボード起動（Tab フォーカス後の Enter/Space=click）はトグルする", () => {
    render(<Term id="cgrp" />);
    const btn = screen.getByRole("button");
    // pointerdown を伴わないフォーカスはキーボード由来。focus が開き、続く click は抑止されずトグルで閉じる。
    fireEvent.focus(btn);
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

  it("ツールチップは portal で body 直下に描画され .term-wrap の外に出る（overflow クリップ回避）", () => {
    const { container } = render(<Term id="cgrp" />);
    fireEvent.focus(screen.getByRole("button"));
    const tip = screen.getByRole("tooltip");
    // .term-wrap（コンポーネント本体）の内側ではないこと。
    expect(container.querySelector(".term-wrap")?.contains(tip)).toBe(false);
    // body 配下に portal されていること。
    expect(document.body.contains(tip)).toBe(true);
    // 祖先の overflow/transform を逃れる fixed 配置クラス（.term-tip）が付くこと。
    // jsdom は globals.css を読み込まないため computed style は検証できず、配置を担う
    // class と placement 属性の付与で fixed 配置の適用を確認する。
    expect(tip).toHaveClass("term-tip");
    expect(tip.dataset.placement).toBeTruthy();
  });
});
