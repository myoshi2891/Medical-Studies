"use client";

import { useEffect, useState } from "react";

type NavItem = { id: string; num: string; label: string };

const NAV_ITEMS: readonly NavItem[] = [
  { id: "s1", num: "1", label: "この記事の位置づけ" },
  { id: "s2", num: "2", label: "経穴とトリガーポイント" },
  { id: "s3", num: "3", label: "各経穴の解剖学的位置" },
  { id: "s4", num: "4", label: "ICHD-3分類との整合性" },
  { id: "s5", num: "5", label: "エビデンスの質" },
  { id: "s6", num: "6", label: "安全性に関する重要事項" },
  { id: "s7", num: "7", label: "専門家への相談の流れ" },
  { id: "s8", num: "8", label: "セルフケア・よくある誤解" },
  { id: "s9", num: "9", label: "参考文献・情報源" },
];

/**
 * 頭痛と経穴（アキュポイント）ガイドの固定サイドバー目次。
 */
export function HeadacheAcupointsSidebar() {
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
