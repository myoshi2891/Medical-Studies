"use client";

import { useEffect, useState } from "react";

type NavItem = { id: string; num: string; label: string };

const NAV_ITEMS: readonly NavItem[] = [
  { id: "s1", num: "1", label: "頭痛トリガーとは" },
  { id: "s2", num: "2", label: "トリガーと前兆の違い" },
  { id: "s3", num: "3", label: "トリガー候補とエビデンス" },
  { id: "s4", num: "4", label: "頭痛ダイアリーの根拠" },
  { id: "s5", num: "5", label: "何を記録するか" },
  { id: "s6", num: "6", label: "記録から振り返りへ" },
  { id: "s7", num: "7", label: "トリガー回避の落とし穴" },
  { id: "s8", num: "8", label: "医療機関へ相談すべき時" },
  { id: "s9", num: "9", label: "まとめ" },
  { id: "s10", num: "10", label: "出典・参考文献" },
];

/**
 * Renders a sidebar table of contents for the headache trigger identification guide.
 *
 * Highlights the navigation link for the section currently visible in the document.
 */
export function HeadacheTriggerIdentificationSidebar() {
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
