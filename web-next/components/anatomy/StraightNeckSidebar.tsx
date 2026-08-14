"use client";

import { useEffect, useState } from "react";

/** サイドバー目次の項目（元 HTML の nav-a を忠実転記）。 */
type NavItem = { id: string; num: string; label: string };

const NAV_ITEMS: readonly NavItem[] = [
  { id: "s1", num: "1", label: "頭痛の全体像" },
  { id: "s2", num: "2", label: "ストレートネックとは" },
  { id: "s3", num: "3", label: "発症メカニズム" },
  { id: "s4", num: "4", label: "科学的エビデンス" },
  { id: "s5", num: "5", label: "セルフチェック" },
  { id: "s6", num: "6", label: "危険なサイン" },
  { id: "s7", num: "7", label: "対処法" },
  { id: "s8", num: "8", label: "まとめ" },
  { id: "s9", num: "9", label: "参考文献" },
];

/**
 * Renders a fixed table of contents for the headache and straight-neck guide.
 *
 * Tracks the current guide section and highlights its corresponding navigation link.
 *
 * @returns The guide navigation sidebar.
 */
export function StraightNeckSidebar() {
  const [activeId, setActiveId] = useState<string>(NAV_ITEMS[0].id);

  useEffect(() => {
    const sections = NAV_ITEMS.map((item) => document.getElementById(item.id)).filter(
      (el): el is HTMLElement => el !== null
    );
    if (sections.length === 0) return;

    // 現在可視な section の id のみを保持する。コールバックの entries は「交差状態が
    // 変化した section」しか含まないため、集合として持ち越さないと比較できない。
    // 座標は保持しない — 通知時点の値はスクロールで即座に陳腐化するため、選択時に測り直す。
    const visibleIds = new Set<string>();

    // 可視 section のうち、ビューポート上端に最も近いものをカレントとする。
    // 現在位置を都度計測するため、entries の順序にも通知タイミングにも依存しない。
    const selectNearest = () => {
      let nearestId: string | null = null;
      let nearestDistance = Number.POSITIVE_INFINITY;
      for (const id of visibleIds) {
        const el = document.getElementById(id);
        if (el === null) continue;
        const distance = Math.abs(el.getBoundingClientRect().top);
        if (distance < nearestDistance) {
          nearestDistance = distance;
          nearestId = id;
        }
      }
      if (nearestId !== null) setActiveId(nearestId);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            visibleIds.add(entry.target.id);
            continue;
          }
          visibleIds.delete(entry.target.id);
        }
        if (visibleIds.size === 0) return;
        selectNearest();
      },
      { threshold: 0.25 }
    );

    for (const section of sections) {
      observer.observe(section);
    }

    // 複数 section が可視のまま移動する間は IntersectionObserver が再通知しないため、
    // スクロール中も測り直してカレントを追従させる。
    const handleScroll = () => {
      if (visibleIds.size === 0) return;
      selectNearest();
    };
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <nav className="sidebar">
      <div className="s-hdr">目次</div>
      {NAV_ITEMS.map((item) => (
        <a
          key={item.id}
          className={item.id === activeId ? "nav-a active" : "nav-a"}
          href={`#${item.id}`}
        >
          <span className="n-num">{item.num}</span>
          {item.label}
        </a>
      ))}
    </nav>
  );
}
