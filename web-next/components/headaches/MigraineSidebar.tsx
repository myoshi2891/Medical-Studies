"use client";

import { useEffect, useState } from "react";

/** サイドバー目次の項目（元 HTML の nav-a を忠実転記）。 */
type NavItem = { id: string; num: string; label: string };

const NAV_ITEMS: readonly NavItem[] = [
  { id: "s1", num: "1", label: "片頭痛とは何か" },
  { id: "s2", num: "2", label: "疫学・疾病負荷" },
  { id: "s3", num: "3", label: "病態生理学" },
  { id: "s4", num: "4", label: "ICHD-3 分類・診断" },
  { id: "s5", num: "5", label: "SNOOP4 スクリーニング" },
  { id: "s6", num: "6", label: "急性期治療" },
  { id: "s7", num: "7", label: "予防療法" },
  { id: "s8", num: "8", label: "CGRP と最新治療薬" },
  { id: "s9", num: "9", label: "栄養補助療法" },
  { id: "s10", num: "10", label: "多モーダル統合" },
  { id: "s11", num: "11", label: "アウトカム評価" },
  { id: "s12", num: "12", label: "特殊集団への対応" },
  { id: "s13", num: "13", label: "薬物乱用頭痛（MOH）" },
  { id: "s14", num: "14", label: "参考文献・リソース" },
];

/**
 * 片頭痛（Migraine）ガイドの固定サイドバー目次。
 *
 * 本文（section 群）は Server Component のまま、scroll-spy だけをクライアント化する。
 * 元コードに倣い `IntersectionObserver`（threshold 0.25）で可視 section を追跡し、
 * 対応する nav-a に `active` を付与する。スムーズスクロールは CSS（scroll-behavior）に委ねる。
 */
export function MigraineSidebar() {
  const [activeId, setActiveId] = useState<string>(NAV_ITEMS[0].id);

  useEffect(() => {
    const sections = NAV_ITEMS.map((item) => document.getElementById(item.id)).filter(
      (el): el is HTMLElement => el !== null
    );
    if (sections.length === 0) return;

    // 全 section の最新 intersectionRatio を永続的に保持する。
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
    <nav className="sidebar" aria-label="片頭痛ガイド目次">
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
