"use client";

import { useEffect, useState } from "react";

/** サイドバー目次の項目（元 HTML の nav-a を忠実転記）。 */
type NavItem = { id: string; num: string; label: string };

const NAV_ITEMS: readonly NavItem[] = [
  { id: "s1", num: "1", label: "疾患概要・定義" },
  { id: "s2", num: "2", label: "疫学" },
  { id: "s3", num: "3", label: "病態生理学" },
  { id: "s4", num: "4", label: "ICHD-3 診断分類" },
  { id: "s5", num: "5", label: "診断基準" },
  { id: "s6", num: "6", label: "SNOOP4 レッドフラッグ" },
  { id: "s7", num: "7", label: "鑑別診断" },
  { id: "s8", num: "8", label: "身体所見・誘発テスト" },
  { id: "s9", num: "9", label: "画像・診断的神経ブロック" },
  { id: "s10", num: "10", label: "評価ツール・アウトカム" },
  { id: "s11", num: "11", label: "治療戦略" },
  { id: "s12", num: "12", label: "MOH リスク評価" },
  { id: "s13", num: "13", label: "特殊集団への対応" },
  { id: "s14", num: "14", label: "標準化ケーススタディ" },
  { id: "s15", num: "15", label: "エビデンス階層" },
  { id: "s16", num: "16", label: "参考文献・URLリソース" },
];

/**
 * 頸原性頭痛ガイドの固定サイドバー目次。
 *
 * 本文（section 群）は Server Component のまま、scroll-spy だけをクライアント化する。
 * 元コードに倣い `IntersectionObserver`（threshold 0.25）で可視 section を追跡し、
 * 対応する nav-a に `active` を付与する。スムーズスクロールは CSS（scroll-behavior）に委ねる。
 */
export function CehSidebar() {
  const [activeId, setActiveId] = useState<string>(NAV_ITEMS[0].id);

  useEffect(() => {
    const sections = NAV_ITEMS.map((item) => document.getElementById(item.id)).filter(
      (el): el is HTMLElement => el !== null
    );
    if (sections.length === 0) return;

    // 全 section の最新 intersectionRatio を永続的に保持する。
    // callback の entries は「変化したターゲット」しか含まないため、
    // entries 単体で max を取ると active が誤って飛ぶ。可視集合全体から選ぶ。
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
        // 現在交差中の全 section から最大 intersectionRatio を決定論的に選ぶ。
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
    <nav className="sidebar" aria-label="頸原性頭痛ガイド目次">
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
