"use client";

import { useEffect, useState } from "react";

/** サイドバー目次の項目（元 HTML の nav-a を忠実転記）。 */
type NavItem = { id: string; num: string; label: string };

const NAV_ITEMS: readonly NavItem[] = [
  { id: "s1", num: "1", label: "この記事の位置づけ" },
  { id: "s2", num: "2", label: "頭痛の国際分類（ICHD-3）" },
  { id: "s3", num: "3", label: "「痛みを感じる脳」という誤解" },
  { id: "s4", num: "4", label: "三叉神経血管系" },
  { id: "s5", num: "5", label: "脳幹 ― 中継点と調整役" },
  { id: "s6", num: "6", label: "三叉神経頸椎複合体" },
  { id: "s7", num: "7", label: "視床下部の役割" },
  { id: "s8", num: "8", label: "皮質拡延性抑制（CSD）" },
  { id: "s9", num: "9", label: "片頭痛発作の全体像" },
  { id: "s10", num: "10", label: "群発頭痛と自律神経反射" },
  { id: "s11", num: "11", label: "まとめ表" },
  { id: "s12", num: "12", label: "治療標的との接点" },
  { id: "s13", num: "13", label: "参考文献・情報源" },
];

/**
 * 頭痛と脳・脳幹ガイドの固定サイドバー目次。
 *
 * 本文（section 群）は Server Component のまま、scroll-spy だけをクライアント化する。
 * IntersectionObserver で可視 section を追跡し、対応する nav-a に `active` を付与する。
 */
export function BrainstemSidebar() {
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
