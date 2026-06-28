"use client";

import {
  type KeyboardEvent,
  type ReactNode,
  useCallback,
  useEffect,
  useId,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";
import { getTerm } from "@/lib/glossary/glossary";

/** ツールチップの fixed 配置座標と表示方向。 */
interface TipPosition {
  top: number;
  left: number;
  /** 三角の向き。トリガの上に出すなら "top"、下なら "bottom"。 */
  placement: "top" | "bottom";
  /** 三角の水平位置（ツールチップ左端からの px）。 */
  arrowLeft: number;
}

const GAP = 8;
const MARGIN = 8;

/**
 * 専門用語に「読み仮名＋やさしい解説」のツールチップを付ける共有部品。
 *
 * `components/MermaidDiagram.tsx`・`components/Ext.tsx` と同じく最小の client 部品。
 * トリガはインラインの `<button>` で、ホバー / キーボードフォーカス / タップ（クリック）で開く。
 *
 * ツールチップは **React portal で `document.body` 直下へ描画し `position: fixed`** で配置する。
 * これにより、テーブルの `overflow-x: auto`（`.tbl`）やカードの `transform` など、祖先要素に
 * よるクリッピングを完全に回避する（旧 `position: absolute` 実装で表内ツールチップが切れていた）。
 * `role="tooltip"` と `aria-describedby` でスクリーンリーダーへ関連付け、Esc で閉じる。
 *
 * 用法:
 * - 用語集参照: `<Term id="cgrp">CGRP</Term>`（children が無ければ用語集の term を表示）
 * - インライン指定: `<Term term="大後頭神経" reading="..." plain="..." />`（/anatomy hotspot など）
 *
 * 解説テキスト（plain）が解決できない場合は、素のテキストへ静かに降格する（開発時は warn）。
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
  const [mounted, setMounted] = useState(false);
  const [pos, setPos] = useState<TipPosition | null>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const tipRef = useRef<HTMLSpanElement>(null);
  // 同一操作中に onFocus が開いたかを記録し、直後の onClick による二重発火（即閉じ）を防ぐ。
  const focusOpenedRef = useRef(false);

  // portal は client マウント後のみ（SSR 不一致回避）。
  useEffect(() => {
    setMounted(true);
  }, []);

  const entry = id ? getTerm(id) : undefined;
  if (process.env.NODE_ENV !== "production" && id && !entry) {
    console.warn(`Term: 用語集に id "${id}" がありません（素テキストへ降格）`);
  }

  const resolvedTerm = entry?.term ?? term;
  const resolvedReading = entry?.reading ?? reading;
  const resolvedPlain = entry?.plain ?? plain;
  // 用語集に無い id でも空表示にならないよう、最後の手段として id を可視テキストにする。
  const display = children ?? resolvedTerm ?? id;

  // トリガ位置からツールチップの fixed 座標を計算する（上に収まらなければ下へフリップ）。
  const reposition = useCallback(() => {
    const trigger = triggerRef.current;
    const tip = tipRef.current;
    if (!trigger || !tip) return;
    const t = trigger.getBoundingClientRect();
    const tw = tip.offsetWidth;
    const th = tip.offsetHeight;
    const vw = window.innerWidth;
    const vh = window.innerHeight;

    let placement: "top" | "bottom" = "top";
    let top = t.top - th - GAP;
    if (top < MARGIN) {
      // 上に収まらない → 下へ
      const below = t.bottom + GAP;
      if (below + th <= vh - MARGIN || below < top) {
        placement = "bottom";
        top = below;
      }
    }
    const left = Math.min(Math.max(t.left, MARGIN), Math.max(MARGIN, vw - tw - MARGIN));
    const arrowLeft = Math.min(Math.max(t.left + t.width / 2 - left, 12), Math.max(12, tw - 12));
    setPos({ top, left, placement, arrowLeft });
  }, []);

  // open 中はレイアウト確定後に位置を測り、スクロール / リサイズで追従する。
  useLayoutEffect(() => {
    if (!open) return;
    reposition();
    const onScroll = () => reposition();
    window.addEventListener("scroll", onScroll, true);
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll, true);
      window.removeEventListener("resize", onScroll);
    };
  }, [open, reposition]);

  // 解説が無ければツールチップを付けず素テキストへ降格する。
  if (!resolvedPlain) {
    return <>{display}</>;
  }

  const onKeyDown = (e: KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === "Escape") setOpen(false);
  };

  const tooltip =
    open && mounted
      ? createPortal(
          <span
            ref={tipRef}
            id={tipId}
            role="tooltip"
            className="term-tip"
            data-placement={pos?.placement ?? "top"}
            style={{
              top: pos ? `${pos.top}px` : undefined,
              left: pos ? `${pos.left}px` : undefined,
              // 未計測（初回レイアウト前）は見えない位置に置きチラつきを防ぐ。
              visibility: pos ? "visible" : "hidden",
              ...(pos ? { ["--term-arrow-left" as string]: `${pos.arrowLeft}px` } : {}),
            }}
          >
            {resolvedReading ? <span className="term-tip-reading">{resolvedReading}</span> : null}
            <span className="term-tip-plain">{resolvedPlain}</span>
          </span>,
          document.body
        )
      : null;

  return (
    <span className="term-wrap">
      <button
        ref={triggerRef}
        type="button"
        className="term"
        aria-describedby={open ? tipId : undefined}
        aria-expanded={open}
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
        onFocus={() => {
          // フォーカス（キーボード／ポインタ）は「開く」だけ。トグルはしない。
          focusOpenedRef.current = !open;
          setOpen(true);
        }}
        onBlur={() => {
          setOpen(false);
          focusOpenedRef.current = false;
        }}
        onClick={() => {
          // 直前の onFocus が同じ操作で開いた場合、click はトグルせず開いたまま保つ（二重発火回避）。
          if (focusOpenedRef.current) {
            focusOpenedRef.current = false;
            return;
          }
          setOpen((o) => !o);
        }}
        onKeyDown={onKeyDown}
      >
        {display}
      </button>
      {tooltip}
    </span>
  );
}
