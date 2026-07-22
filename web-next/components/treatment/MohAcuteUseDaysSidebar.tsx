"use client";

import { useEffect, useState } from "react";

type NavItem = { id: string; num: string; label: string };

const NAV_ITEMS: readonly NavItem[] = [
  { id: "s1", num: "1", label: "MOHとは何か" },
  { id: "s2", num: "2", label: "なぜ「日数」で管理するのか" },
  { id: "s3", num: "3", label: "国際ガイドラインの比較" },
  { id: "s4", num: "4", label: "予防の実践フレームワーク" },
  { id: "s5", num: "5", label: "新しい薬剤クラスの位置づけ" },
  { id: "s6", num: "6", label: "エビデンスグレーディング" },
  { id: "s7", num: "7", label: "よくある誤解（Q&A）" },
  { id: "s8", num: "8", label: "まとめ・チェックリスト" },
  { id: "s9", num: "9", label: "権威ソース・参考文献" },
];

/**
 * 頭痛急性期治療薬の「適正使用日数」とMOH予防ガイドの固定サイドバーナビゲーション。
 */
export function MohAcuteUseDaysSidebar() {
  const [activeId, setActiveId] = useState<string>(NAV_ITEMS[0].id);

  useEffect(() => {
    const sections = NAV_ITEMS.map((item) => document.getElementById(item.id)).filter(
      (el): el is HTMLElement => el !== null
    );
    if (sections.length === 0) return;

    const ratios = new Map<string, number>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            ratios.set(entry.target.id, entry.intersectionRatio);
          } else {
            ratios.delete(entry.target.id);
          }
        }
        let bestId: string | null = null;
        let bestRatio = -1;
        for (const [id, ratio] of ratios) {
          if (ratio > bestRatio) {
            bestRatio = ratio;
            bestId = id;
          }
        }
        if (bestId !== null) setActiveId(bestId);
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
    <nav className="sidebar" aria-label="MOH適正使用日数ガイド目次">
      <div className="s-hdr">目次</div>
      {NAV_ITEMS.map((item) => (
        <a
          key={item.id}
          className={item.id === activeId ? "nav-a active" : "nav-a"}
          href={`#${item.id}`}
          aria-current={item.id === activeId ? "location" : undefined}
        >
          <span className="n-num">{item.num}</span>
          {item.label}
        </a>
      ))}
    </nav>
  );
}
