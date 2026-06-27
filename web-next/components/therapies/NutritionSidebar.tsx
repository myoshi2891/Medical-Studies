"use client";

import { useEffect, useState } from "react";

/** サイドバー目次の項目（元 HTML の nav-a を忠実転記）。 */
type NavItem = { id: string; num: string; label: string };

const NAV_ITEMS: readonly NavItem[] = [
  { id: "s1", num: "1", label: "なぜ栄養が頭痛に影響するのか" },
  { id: "s2", num: "2", label: "エビデンスの読み方" },
  { id: "s3", num: "3", label: "STEP 1 — 高エビデンス（A/B）" },
  { id: "s4", num: "4", label: "STEP 2 — 中等度（Grade C）" },
  { id: "s5", num: "5", label: "STEP 3 — 要注意サプリメント" },
  { id: "s6", num: "6", label: "STEP 4 — 食事性トリガー管理" },
  { id: "s7", num: "7", label: "STEP 5 — MOH リスク統合" },
  { id: "s8", num: "8", label: "STEP 6 — 相互作用チェック" },
  { id: "s9", num: "9", label: "STEP 7 — 特別集団への配慮" },
  { id: "s10", num: "10", label: "STEP 8 — 統合プロトコル" },
  { id: "s11", num: "11", label: "STEP 9 — アウトカム評価" },
  { id: "s12", num: "12", label: "参考文献・ソース URL" },
];

/**
 * 栄養療法ガイドの固定サイドバー目次。
 *
 * 本文（section 群）は Server Component のまま、scroll-spy だけをクライアント化する。
 * IntersectionObserver（threshold 0.25）で可視 section を追跡し、
 * 対応する nav-a に `active` を付与する。スムーズスクロールは CSS（scroll-behavior）に委ねる。
 */
export function NutritionSidebar() {
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
