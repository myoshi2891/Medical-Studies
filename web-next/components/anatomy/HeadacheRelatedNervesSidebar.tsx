"use client";

import { useEffect, useState } from "react";

type NavItem = { id: string; num: string; label: string };

const NAV_ITEMS: readonly NavItem[] = [
  { id: "s1", num: "1", label: "脳はなぜ痛みを感じないのか" },
  { id: "s2", num: "2", label: "神経ネットワークの全体像" },
  { id: "s3", num: "3", label: "三叉神経(血管)系" },
  { id: "s4", num: "4", label: "上位頸神経と後頭神経" },
  { id: "s5", num: "5", label: "三叉神経頸髄複合体(TCC)" },
  { id: "s6", num: "6", label: "自律神経系の関与" },
  { id: "s7", num: "7", label: "中枢性感作" },
  { id: "s8", num: "8", label: "頭痛タイプ別まとめ" },
  { id: "s9", num: "9", label: "全体フローチャート" },
  { id: "s10", num: "10", label: "参考文献・出典" },
];

/**
 * Renders a fixed sidebar table of contents for the headache-related nerves guide.
 *
 * Highlights the navigation link for the section nearest the top of the viewport.
 *
 * @returns The sidebar navigation element.
 */
export function HeadacheRelatedNervesSidebar() {
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
