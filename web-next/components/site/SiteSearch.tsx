"use client";

import Link from "next/link";
import { useId, useMemo, useRef, useState } from "react";
import { type ContentSearchHit, searchContent } from "@/lib/content/search";

/**
 * サイト横断検索（ヘッダー常設の autocomplete アイランド）。plans/007 Step 2 の UI 層。
 *
 * `components/anatomy/AnatomySearch.tsx` と同じ WAI-ARIA combobox パターン
 * （combobox + listbox + option / `aria-activedescendant`）を用い、検索コア
 * `searchContent`（純粋関数）のヒットを候補表示する。候補はフォーカスを奪わず入力に留めたまま
 * 矢印キーで仮想選択し、Enter で選択中アンカーを click して遷移する（遷移経路を一元化）。
 *
 * ヘッダーの `.ch-links`（ドロワー）の外に置くこと。内側に置くと `SiteHeaderClient` が
 * 付与する「リンククリックでドロワーを閉じる」ハンドラと二重に制御される。
 */
export default function SiteSearch() {
  const baseId = useId();
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(-1);
  const listRef = useRef<HTMLDivElement>(null);

  const trimmed = query.trim();
  const hits = useMemo<ContentSearchHit[]>(
    () => (trimmed ? searchContent(trimmed) : []),
    [trimmed]
  );
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
    } else if (e.key === "Enter") {
      e.preventDefault();
      // 仮想選択中のアンカー、未選択なら先頭候補（暗黙選択）を click して遷移を一元化する。
      const targetIndex = activeIndex >= 0 ? activeIndex : 0;
      listRef.current
        ?.querySelector<HTMLAnchorElement>(`#${CSS.escape(optionId(targetIndex))}`)
        ?.click();
    }
  }

  return (
    <div className="site-search">
      <span className="site-search-icon" aria-hidden="true">
        🔍
      </span>
      <input
        type="search"
        role="combobox"
        className="site-search-input"
        placeholder="ページを検索（例: CGRP, MIDAS, 睡眠）"
        aria-label="サイト内のページを検索"
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
        <div ref={listRef} id={listId} role="listbox" className="site-search-list">
          {hits.map((hit, i) => {
            const selected = i === activeIndex;
            return (
              <Link
                key={hit.href}
                id={optionId(i)}
                role="option"
                aria-selected={selected}
                tabIndex={-1}
                className={selected ? "site-search-opt active" : "site-search-opt"}
                href={hit.href}
                onClick={close}
              >
                <span className="site-search-opt-label">{hit.title}</span>
                <span className="site-search-opt-meta">{hit.context}</span>
              </Link>
            );
          })}
        </div>
      )}
      {open && !hasHits && (
        // <output> は暗黙 role=status。ライブリージョンとして結果なしを通知する。
        <output className="site-search-empty">「{trimmed}」に一致するページはありません</output>
      )}
    </div>
  );
}
