"use client";

import { useEffect, useState } from "react";

type NavItem = { id: string; num: string; label: string };

const NAV_ITEMS: readonly NavItem[] = [
  { id: "s1", num: "1", label: "なぜ心理・行動療法が柱か" },
  { id: "s2", num: "2", label: "SNOOP4 レッドフラッグ" },
  { id: "s3", num: "3", label: "エビデンスグレードの読み方" },
  { id: "s4", num: "4", label: "神経科学的基盤" },
  { id: "s5", num: "5", label: "心理療法マップ＋STEP1 CBT" },
  { id: "s6", num: "6", label: "STEP2 バイオフィードバック" },
  { id: "s7", num: "7", label: "STEP3 PMR・自律訓練法" },
  { id: "s8", num: "8", label: "STEP4 MBSR" },
  { id: "s9", num: "9", label: "STEP5 ACT" },
  { id: "s10", num: "10", label: "行動療法（睡眠・運動・日誌・環境）" },
  { id: "s11", num: "11", label: "統合プロトコル（12週間）" },
  { id: "s12", num: "12", label: "特殊集団への適用" },
  { id: "s13", num: "13", label: "アウトカム評価と治療目標" },
  { id: "s14", num: "14", label: "参考文献・URLリソース" },
];

export function PsychologicalBehavioralTherapySidebar() {
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
