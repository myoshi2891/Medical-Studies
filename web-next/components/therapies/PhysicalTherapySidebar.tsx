"use client";

import { useEffect, useState } from "react";

type NavItem = { id: string; num: string; label: string };

const NAV_ITEMS: readonly NavItem[] = [
  { id: "s1", num: "1", label: "はじめに — なぜ理学療法か" },
  { id: "s2", num: "2", label: "頭痛の分類と PT 適応" },
  { id: "s3", num: "3", label: "病態生理学的根拠" },
  { id: "s4", num: "4", label: "SNOOP4 スクリーニング" },
  { id: "s5", num: "5", label: "エビデンス評価システム" },
  { id: "s6", num: "6", label: "適応フローチャート" },
  { id: "s7", num: "7", label: "主要モダリティ詳細" },
  { id: "s8", num: "8", label: "臨床プロトコル" },
  { id: "s9", num: "9", label: "エビデンス比較表" },
  { id: "s10", num: "10", label: "特殊集団への適用" },
  { id: "s11", num: "11", label: "マルチモーダル統合" },
  { id: "s12", num: "12", label: "アウトカム評価ツール" },
  { id: "s13", num: "13", label: "患者教育・セルフケア" },
  { id: "s14", num: "14", label: "禁忌・安全管理" },
  { id: "s15", num: "15", label: "参考文献・ソース" },
];

export function PhysicalTherapySidebar() {
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
      {
        threshold: 0,
        rootMargin: "-10% 0px -70% 0px",
      }
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
