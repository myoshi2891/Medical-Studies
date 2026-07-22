"use client";

import { useEffect, useState } from "react";

/** サイドバー目次の項目（元 HTML の nav-a を忠実転記）。 */
type NavItem = { id: string; num: string; label: string };

const NAV_ITEMS: readonly NavItem[] = [
  { id: "s1", num: "1", label: "用語の整理：「上頚神経ブロック」とは" },
  { id: "s2", num: "2", label: "頸部交感神経系の解剖" },
  { id: "s3", num: "3", label: "適応" },
  { id: "s4", num: "4", label: "禁忌" },
  { id: "s5", num: "5", label: "術前評価と準備" },
  { id: "s6", num: "6", label: "手技：ステップ・バイ・ステップ" },
  { id: "s7", num: "7", label: "参考：古典的経口法" },
  { id: "s8", num: "8", label: "効果判定：ホルネル徴候" },
  { id: "s9", num: "9", label: "合併症とその対応" },
  { id: "s10", num: "10", label: "星状神経節ブロックとの違い" },
  { id: "s11", num: "11", label: "国際文献のエビデンスまとめ" },
  { id: "s12", num: "12", label: "まとめ" },
  { id: "s13", num: "13", label: "参考文献" },
];

/**
 * Renders a fixed sidebar table of contents for the SCGB guide and highlights the currently visible section.
 */
export function ScgbSidebar() {
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
    <nav className="sidebar" aria-label="SCGBガイド目次">
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
