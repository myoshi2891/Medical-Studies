"use client";

import { useEffect, useState } from "react";

type NavItem = { id: string; num: string; label: string };

const NAV_ITEMS: readonly NavItem[] = [
  { id: "s1", num: "1", label: "ICHD-3の全体像" },
  { id: "s2", num: "2", label: "頭部の骨の基礎解剖" },
  { id: "s3", num: "3", label: "頭蓋骨自体の病気(11.1)" },
  { id: "s4", num: "4", label: "頭蓋頸椎移行部の異常" },
  { id: "s5", num: "5", label: "頸原性頭痛(11.2.1)" },
  { id: "s6", num: "6", label: "副鼻腔性頭痛(11.5)" },
  { id: "s7", num: "7", label: "顎関節症 TMD(11.7)" },
  { id: "s8", num: "8", label: "後頭神経痛" },
  { id: "s9", num: "9", label: "Eagle症候群(11.8)" },
  { id: "s10", num: "10", label: "全体まとめ" },
  { id: "s11", num: "11", label: "参考文献(ソース)" },
];

/**
 * Renders a fixed table of contents for the bone-related headache guide.
 *
 * Highlights the navigation item corresponding to the currently visible section.
 *
 * @returns The sidebar navigation element.
 */
export function BoneRelatedHeadacheSidebar() {
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
