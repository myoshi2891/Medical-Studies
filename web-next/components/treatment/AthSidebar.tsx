"use client";

import { useEffect, useState } from "react";

type NavItem = { id: string; num: string; label: string };

const NAV_ITEMS: readonly NavItem[] = [
  { id: "s1", num: "1", label: "はじめに" },
  { id: "s2", num: "2", label: "治療戦略：階層化治療と段階的治療" },
  { id: "s3", num: "3", label: "早期服薬の原則" },
  { id: "s4", num: "4", label: "薬効群各論" },
  { id: "s5", num: "5", label: "比較と意思決定アルゴリズム" },
  { id: "s6", num: "6", label: "MOH（薬剤の使用過多）の予防" },
  { id: "s7", num: "7", label: "まとめ・参考文献・監視ソース" },
];

/**
 * Renders the fixed sidebar navigation for the acute headache treatment guide.
 *
 * Highlights the navigation link for the section with the greatest current visibility.
 */
export function AthSidebar() {
  const [activeId, setActiveId] = useState<string>(NAV_ITEMS[0].id);

  useEffect(() => {
    const sections = NAV_ITEMS.map((item) => document.getElementById(item.id)).filter(
      (el): el is HTMLElement => el !== null
    );
    if (sections.length === 0) return;

    // 全 section の最新 intersectionRatio を永続的に保持する。
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
        // 現在交差中の全 section から最大 intersectionRatio を決定論的に選ぶ。
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
    <nav className="sidebar" aria-label="急性期治療ガイド目次">
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
