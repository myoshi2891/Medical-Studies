"use client";

import { useEffect, useState } from "react";

type NavItem = { id: string; num: string; label: string };

const NAV_ITEMS: readonly NavItem[] = [
  { id: "s1", num: "1", label: "はじめに：CGRPと頭痛医学における位置づけ" },
  { id: "s2", num: "2", label: "ICHD-3における文脈" },
  { id: "s3", num: "3", label: "CGRP経路の病態生理" },
  { id: "s4", num: "4", label: "CGRP標的治療薬の分類" },
  { id: "s5", num: "5", label: "抗CGRP/受容体モノクローナル抗体（予防）" },
  { id: "s6", num: "6", label: "経口ゲパント（予防適応を中心に）" },
  { id: "s7", num: "7", label: "国際的な位置づけ・治療アルゴリズムの動向" },
  { id: "s8", num: "8", label: "国内承認状況（PMDA準拠）" },
  { id: "s9", num: "9", label: "エビデンスの質と有効性解釈の注意点" },
  { id: "s10", num: "10", label: "安全性に関する一般的留意点" },
  { id: "s11", num: "11", label: "未承認・適応外に関する事実整理" },
  { id: "s12", num: "12", label: "まとめ：位置づけの全体像" },
  { id: "s13", num: "13", label: "監視すべき権威ソース" },
  { id: "s14", num: "14", label: "参考文献・出典URL一覧" },
];

/**
 * Renders the fixed sidebar navigation for the CGRP pathway headache treatments guide.
 */
export function CgrpPathwaySidebar() {
  const [activeId, setActiveId] = useState<string>(NAV_ITEMS[0].id);

  useEffect(() => {
    const sections = NAV_ITEMS.map((item) => document.getElementById(item.id)).filter(
      (el): el is HTMLElement => el !== null
    );
    if (sections.length === 0) return;

    const ratios = new Map<string, number>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            ratios.set(entry.target.id, entry.intersectionRatio);
          } else {
            ratios.delete(entry.target.id);
          }
        }
        let bestId: string | null = null;
        let bestRatio = -1;
        for (const [id, ratio] of ratios) {
          if (ratio > bestRatio) {
            bestRatio = ratio;
            bestId = id;
          }
        }
        if (bestId !== null) setActiveId(bestId);
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
    <nav className="sidebar" aria-label="CGRP標的頭痛治療薬ガイド目次">
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
