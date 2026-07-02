"use client";

import Link from "next/link";
import { useId, useMemo, useRef, useState } from "react";
import { type SearchHit, searchAnatomy } from "@/lib/anatomy/search";

/**
 * 頭痛 3D 解剖アトラスの横断検索（autocomplete アイランド）。
 *
 * WAI-ARIA combobox パターン（combobox + listbox + option / `aria-activedescendant`）で、
 * 検索コア `searchAnatomy`（純粋関数）のヒットを候補表示する。候補はフォーカスを奪わず
 * 入力に留めたまま矢印キーで仮想選択し、Enter で選択中アンカーへ遷移する
 * （アンカー click に一元化＝ハッシュはスクロール、内部ルートは Next クライアント遷移）。
 * 設計書 §5 / promp.md ②（検索）・⑬（キーボード操作）。
 */
export default function AnatomySearch() {
  const baseId = useId();
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(-1);
  const listRef = useRef<HTMLDivElement>(null);

  const trimmed = query.trim();
  const hits = useMemo<SearchHit[]>(() => (trimmed ? searchAnatomy(trimmed) : []), [trimmed]);
  const open = trimmed.length > 0;
  const hasHits = hits.length > 0;
  const listId = `${baseId}-list`;
  const optionId = (i: number) => `${baseId}-opt-${i}`;

  /** クエリ変更で候補を更新し、仮想選択をリセットする。 */
  function onChange(value: string) {
    setQuery(value);
    setActiveIndex(-1);
  }

  /** 候補確定（アンカー click に委譲）後、パネルを閉じる。 */
  function close() {
    setQuery("");
    setActiveIndex(-1);
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Escape") {
      close();
      return;
    }
    if (!open || !hasHits) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((i) => Math.min(i + 1, hits.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter" && activeIndex >= 0) {
      e.preventDefault();
      // 仮想選択中のアンカーを click して遷移を一元化する。
      listRef.current
        ?.querySelector<HTMLAnchorElement>(`#${CSS.escape(optionId(activeIndex))}`)
        ?.click();
    }
  }

  const kindLabel: Record<SearchHit["kind"], string> = {
    structure: "構造",
    hotspot: "部位",
    link: "教育ページ",
  };

  return (
    <div className="anatomy-search">
      <span className="anatomy-search-icon" aria-hidden="true">
        🔍
      </span>
      <input
        type="search"
        role="combobox"
        className="anatomy-search-input"
        placeholder="神経・血管・略称・疾患名で検索（例: V1, ONB, 椎骨動脈）"
        aria-label="解剖・教育ページを検索"
        aria-expanded={open && hasHits}
        aria-controls={listId}
        aria-autocomplete="list"
        aria-activedescendant={activeIndex >= 0 ? optionId(activeIndex) : undefined}
        value={query}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={onKeyDown}
      />
      {open && hasHits && (
        // WAI-ARIA combobox: listbox 直下に option（アンカー）を配置する。
        <div ref={listRef} id={listId} role="listbox" className="anatomy-search-list">
          {hits.map((hit, i) => {
            const selected = i === activeIndex;
            const className = selected ? "anatomy-search-opt active" : "anatomy-search-opt";
            const inner = (
              <>
                <span className="anatomy-search-opt-label">{hit.label}</span>
                <span className="anatomy-search-opt-meta">
                  {kindLabel[hit.kind]}・{hit.context}
                </span>
              </>
            );
            const key = `${hit.kind}-${hit.href}-${hit.label}`;
            // ハッシュ（構造/部位）はネイティブ <a>、内部ルート（教育ページ）は Next Link。
            return hit.href.startsWith("#") ? (
              <a
                key={key}
                id={optionId(i)}
                role="option"
                aria-selected={selected}
                tabIndex={-1}
                className={className}
                href={hit.href}
                onClick={close}
              >
                {inner}
              </a>
            ) : (
              <Link
                key={key}
                id={optionId(i)}
                role="option"
                aria-selected={selected}
                tabIndex={-1}
                className={className}
                href={hit.href}
                onClick={close}
              >
                {inner}
              </Link>
            );
          })}
        </div>
      )}
      {open && !hasHits && (
        // <output> は暗黙 role=status。ライブリージョンとして結果なしを通知する。
        <output className="anatomy-search-empty">「{trimmed}」に一致する項目はありません</output>
      )}
    </div>
  );
}
