"use client";

import { useEffect, useState } from "react";

/** サイドバー目次の項目（元 HTML の nav-a を忠実転記）。 */
type NavItem = { id: string; num: string; label: string };

const NAV_ITEMS: readonly NavItem[] = [
  { id: "s1", num: "1", label: "生活習慣管理の重要性" },
  { id: "s2", num: "2", label: "SEEDSフレームワーク全体像" },
  { id: "s3", num: "3", label: "規則正しい生活（睡眠）" },
  { id: "s4", num: "4", label: "水分補給" },
  { id: "s5", num: "5", label: "カフェインとの付き合い方" },
  { id: "s6", num: "6", label: "食事リズム" },
  { id: "s7", num: "7", label: "生活習慣と頭痛の関係" },
  { id: "s8", num: "8", label: "SEEDS残り3要素" },
  { id: "s9", num: "9", label: "個人差と受診の目安" },
  { id: "s10", num: "10", label: "参考文献・情報源" },
];

/**
 * Lifestyle Seeds ガイドの固定サイドバー目次。
 *
 * 本文（section 群）は Server Component のまま、scroll-spy だけをクライアント化する。
 * 元コードに倣い `IntersectionObserver`（threshold 0.25）で可視 section を追跡し、
 * 対応する nav-a に `active` を付与する。スムーズスクロールは CSS（scroll-behavior）に委ねる。
 */
export function LifestyleSeedsSidebar() {
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
