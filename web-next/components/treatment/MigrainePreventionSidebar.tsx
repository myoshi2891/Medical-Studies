"use client";

import { useEffect, useState } from "react";

type NavItem = { id: string; num?: string; label: string };

const NAV_ITEMS: readonly NavItem[] = [
  { id: "overview", label: "📋　この文書の位置づけ" },
  { id: "s1", num: "1", label: "頭痛分類の基礎（ICHD-3）" },
  { id: "s2", num: "2", label: "予防治療の適応判断" },
  { id: "s3", num: "3", label: "従来予防薬の薬効群 全体像" },
  { id: "s4", num: "4", label: "薬効群ごとの解説" },
  { id: "s5", num: "5", label: "効果発現までの期間" },
  { id: "s6", num: "6", label: "継続と中止の一般原則" },
  { id: "s7", num: "7", label: "総合フローチャート" },
  { id: "s8", num: "8", label: "監視すべき権威ソース" },
  { id: "s9", num: "9", label: "参考文献・出典" },
];

/**
 * Renders a sidebar navigation for the migraine prevention treatment guide.
 */
export function MigrainePreventionSidebar() {
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
    <nav className="sidebar" aria-label="片頭痛予防治療ガイド目次">
      <div className="s-hdr">目次</div>
      {NAV_ITEMS.map((item) => (
        <a
          key={item.id}
          className={item.id === activeId ? "nav-a active" : "nav-a"}
          href={`#${item.id}`}
          aria-current={item.id === activeId ? "location" : undefined}
        >
          {item.num ? <span className="n-num">{item.num}</span> : null}
          {item.label}
        </a>
      ))}
    </nav>
  );
}
