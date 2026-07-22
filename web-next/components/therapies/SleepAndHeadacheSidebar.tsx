"use client";

import { useEffect, useState } from "react";

type NavItem = { id: string; num: string; label: string };

const NAV_ITEMS: readonly NavItem[] = [
  { id: "s1", num: "1", label: "頭痛の分類（ICHD-3）" },
  { id: "s2", num: "2", label: "双方向性のメカニズム" },
  { id: "s3", num: "3", label: "睡眠関連の頭痛疾患" },
  { id: "s4", num: "4", label: "疫学：何がわかっているか" },
  { id: "s5", num: "5", label: "睡眠衛生の基本" },
  { id: "s6", num: "6", label: "非薬物的アプローチ" },
  { id: "s7", num: "7", label: "薬物療法の一般的注意" },
  { id: "s8", num: "8", label: "受診の目安（レッドフラッグ）" },
  { id: "s9", num: "9", label: "まとめ・チェックリスト" },
  { id: "s10", num: "10", label: "情報源一覧" },
];

/**
 * Renders a table of contents sidebar for the sleep and headache guide.
 *
 * @returns The sidebar navigation with the currently visible section highlighted.
 */
export function SleepAndHeadacheSidebar() {
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
    <nav className="sidebar" aria-label="睡眠と頭痛ガイド目次">
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
