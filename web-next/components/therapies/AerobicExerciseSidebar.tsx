"use client";

import { useEffect, useState } from "react";

type NavItem = { id: string; num: string; label: string };

const NAV_ITEMS: readonly NavItem[] = [
  { id: "s1", num: "1", label: "この記事について" },
  { id: "s2", num: "2", label: "頭痛の分類（ICHD-3）" },
  { id: "s3", num: "3", label: "運動と頭痛のメカニズム" },
  { id: "s4", num: "4", label: "エビデンスの俯瞰" },
  { id: "s5", num: "5", label: "国際ガイドラインの位置づけ" },
  { id: "s6", num: "6", label: "無理のない導入プロトコル" },
  { id: "s7", num: "7", label: "注意すべき危険信号" },
  { id: "s8", num: "8", label: "薬物療法との関係" },
  { id: "s9", num: "9", label: "まとめ・チェックリスト" },
  { id: "s10", num: "10", label: "参考文献・情報源" },
];

/**
 * 有酸素運動と頭痛予防ガイドの固定サイドバー目次。
 *
 * 本文（section 群）は Server Component のまま、scroll-spy だけをクライアント化する。
 * `IntersectionObserver`（threshold 0.25）で可視 section を追跡し active を付与。
 */
export function AerobicExerciseSidebar() {
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
