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
 * 頭痛と神経系 (Headache Related Nerves) ガイドの固定サイドバー目次。
 *
 * 本文（section 群）は Server Component のまま、scroll-spy だけをクライアント化する。
 * IntersectionObserver（threshold 0.25）で可視 section を追跡し、
 * 対応する nav-a に `active` を付与する。
 */
export function HeadacheRelatedNervesSidebar() {
  const [activeId, setActiveId] = useState<string>(NAV_ITEMS[0].id);

  useEffect(() => {
    const sections = NAV_ITEMS.map((item) => document.getElementById(item.id)).filter(
      (el): el is HTMLElement => el !== null
    );
    if (sections.length === 0) return;

    // 現在可視な section の上端座標を保持する。コールバックの entries は「交差状態が
    // 変化した section」しか含まないため、集合として持ち越さないと比較できない。
    const visibleTops = new Map<string, number>();

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            visibleTops.set(entry.target.id, entry.boundingClientRect.top);
            continue;
          }
          visibleTops.delete(entry.target.id);
        }
        if (visibleTops.size === 0) return;

        // entries の順序には依存せず、ビューポート上端に最も近い section をカレントとする。
        let nearestId: string | null = null;
        let nearestDistance = Number.POSITIVE_INFINITY;
        for (const [id, top] of visibleTops) {
          const distance = Math.abs(top);
          if (distance < nearestDistance) {
            nearestDistance = distance;
            nearestId = id;
          }
        }
        if (nearestId !== null) setActiveId(nearestId);
      },
      { threshold: 0.25 }
    );

    for (const section of sections) {
      observer.observe(section);
    }

    return () => {
      observer.disconnect();
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
