"use client";

import { useEffect, useState } from "react";

type NavItem = { id: string; num: string; label: string };

const NAV_ITEMS: readonly NavItem[] = [
  { id: "s1", num: "1", label: "トリガーポイントとは何か" },
  { id: "s2", num: "2", label: "ICHD-3における位置づけ" },
  { id: "s3", num: "3", label: "病態メカニズム" },
  { id: "s4", num: "4", label: "筋肉と関連痛パターン" },
  { id: "s5", num: "5", label: "セルフチェックと危険信号" },
  { id: "s6", num: "6", label: "介入法とエビデンス" },
  { id: "s7", num: "7", label: "セルフケアの方向性" },
  { id: "s8", num: "8", label: "受診の目安・よくある誤解" },
  { id: "s9", num: "9", label: "参考文献・情報源" },
];

/**
 * 頭痛のトリガーポイント入門ガイドの固定サイドバー目次。
 */
export function TriggerPointsSidebar() {
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
