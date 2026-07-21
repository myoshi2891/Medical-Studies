"use client";

import { useEffect, useState } from "react";

/** サイドバー目次の項目（元 HTML の nav-a を忠実転記）。 */
type NavItem = { id: string; num: string; label: string };

const NAV_ITEMS: readonly NavItem[] = [
  { id: "s1", num: "1", label: "なぜ病態生理を学ぶのか" },
  { id: "s2", num: "2", label: "頭痛の分類（ICHD-3）" },
  { id: "s3", num: "3", label: "片頭痛発作の4フェーズ" },
  { id: "s4", num: "4", label: "三叉神経血管系" },
  { id: "s5", num: "5", label: "CGRP" },
  { id: "s6", num: "6", label: "皮質拡延性抑制（CSD）" },
  { id: "s7", num: "7", label: "脳幹・視床下部と周期性" },
  { id: "s8", num: "8", label: "全体像の統合" },
  { id: "s9", num: "9", label: "病態生理と治療標的" },
  { id: "s10", num: "10", label: "限界とオープンクエスチョン" },
  { id: "s11", num: "11", label: "まとめ" },
  { id: "s12", num: "12", label: "権威ソース・参考文献" },
];

/**
 * HeadachePathophysiologySidebar component.
 *
 * Renders the floating sidebar for headache pathophysiology.
 * Track active section on viewport using IntersectionObserver.
 */
export function HeadachePathophysiologySidebar() {
  const [activeId, setActiveId] = useState<string>(NAV_ITEMS[0].id);

  useEffect(() => {
    const sections = NAV_ITEMS.map((item) => document.getElementById(item.id)).filter(
      (el): el is HTMLElement => el !== null
    );
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        }
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
