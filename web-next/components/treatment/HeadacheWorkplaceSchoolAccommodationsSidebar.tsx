"use client";

import { useEffect, useState } from "react";

type NavItem = { id: string; num: string; label: string };

const NAV_ITEMS: readonly NavItem[] = [
  { id: "s1", num: "1", label: "なぜ「周囲の理解」が重要なのか" },
  { id: "s2", num: "2", label: "頭痛は「見えない障害」— スティグマの構造" },
  { id: "s3", num: "3", label: "合理的配慮とは何か" },
  { id: "s4", num: "4", label: "職場における合理的配慮" },
  { id: "s5", num: "5", label: "学校における合理的配慮" },
  { id: "s6", num: "6", label: "開示とスティグマへの向き合い方" },
  { id: "s7", num: "7", label: "まとめ：一般的な進め方" },
  { id: "s8", num: "8", label: "ソース一覧" },
];

/**
 * Renders a fixed table-of-contents sidebar for the Headache Workplace School Accommodations guide.
 *
 * Highlights the navigation link for the section currently visible in the viewport.
 */
export function HeadacheWorkplaceSchoolAccommodationsSidebar() {
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
