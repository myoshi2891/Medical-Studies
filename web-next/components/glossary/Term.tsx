"use client";

import { type KeyboardEvent, type ReactNode, useId, useState } from "react";
import { getTerm } from "@/lib/glossary/glossary";

/**
 * 専門用語に「読み仮名＋やさしい解説」のツールチップを付ける共有部品。
 *
 * `components/MermaidDiagram.tsx`・`components/Ext.tsx` と同じく最小の client 部品。
 * トリガはインラインの `<button>` で、ホバー / キーボードフォーカス / タップ（クリック）で開く。
 * ツールチップは開いている間だけ DOM に描画し、`role="tooltip"` と `aria-describedby` で
 * スクリーンリーダーへ関連付ける。Esc で閉じる。
 *
 * 用法:
 * - 用語集参照: `<Term id="cgrp">CGRP</Term>`（children が無ければ用語集の term を表示）
 * - インライン指定: `<Term term="大後頭神経" reading="..." plain="..." />`（/anatomy hotspot など）
 *
 * 解説テキスト（plain）が解決できない場合は、素のテキストへ静かに降格する（握りつぶさない設計：
 * 開発時は warn）。
 *
 * @param id - 用語集（lib/glossary）の id。
 * @param term - インライン指定の専門用語表記（id 未指定時）。
 * @param reading - インライン指定の読み仮名（ふりがな）。
 * @param plain - インライン指定のやさしい解説。
 * @param children - 本文に表示するテキスト（省略時は term を表示）。
 */
export default function Term({
  id,
  term,
  reading,
  plain,
  children,
}: {
  id?: string;
  term?: string;
  reading?: string;
  plain?: string;
  children?: ReactNode;
}) {
  const tipId = useId();
  const [open, setOpen] = useState(false);

  const entry = id ? getTerm(id) : undefined;
  if (process.env.NODE_ENV !== "production" && id && !entry) {
    console.warn(`Term: 用語集に id "${id}" がありません（素テキストへ降格）`);
  }

  const resolvedTerm = entry?.term ?? term;
  const resolvedReading = entry?.reading ?? reading;
  const resolvedPlain = entry?.plain ?? plain;
  const display = children ?? resolvedTerm;

  // 解説が無ければツールチップを付けず素テキストへ降格する。
  if (!resolvedPlain) {
    return <>{display}</>;
  }

  const onKeyDown = (e: KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === "Escape") setOpen(false);
  };

  return (
    <span className="term-wrap">
      <button
        type="button"
        className="term"
        aria-describedby={open ? tipId : undefined}
        aria-expanded={open}
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
        onFocus={() => setOpen(true)}
        onBlur={() => setOpen(false)}
        onClick={() => setOpen((o) => !o)}
        onKeyDown={onKeyDown}
      >
        {display}
      </button>
      {open ? (
        <span id={tipId} role="tooltip" className="term-tip">
          {resolvedReading ? <span className="term-tip-reading">{resolvedReading}</span> : null}
          <span className="term-tip-plain">{resolvedPlain}</span>
        </span>
      ) : null}
    </span>
  );
}
