"use client";

import { useEffect, useState } from "react";

/** サイドバー目次の項目（元 HTML の nav-a を忠実転記）。 */
type NavItem = { id: string; num: string; label: string };

const NAV_ITEMS: readonly NavItem[] = [
  { id: "s1", num: "1", label: "後頭神経ブロックとは" },
  { id: "s2", num: "2", label: "解剖学 — 後頭部の神経" },
  { id: "s3", num: "3", label: "作用機序（TCC）" },
  { id: "s4", num: "4", label: "SNOOP4 スクリーニング" },
  { id: "s5", num: "5", label: "ICHD-3 適応疾患" },
  { id: "s6", num: "6", label: "患者選択基準と禁忌" },
  { id: "s7", num: "7", label: "必要物品・使用薬剤" },
  { id: "s8", num: "8", label: "手技① ランドマーク法" },
  { id: "s9", num: "9", label: "手技② エコーガイド下法" },
  { id: "s10", num: "10", label: "術後ケアと効果評価" },
  { id: "s11", num: "11", label: "疾患別エビデンス" },
  { id: "s12", num: "12", label: "ステロイド併用 vs 単独" },
  { id: "s13", num: "13", label: "合併症・安全性" },
  { id: "s14", num: "14", label: "アウトカム評価指標" },
  { id: "s15", num: "15", label: "多モーダル統合" },
  { id: "s16", num: "16", label: "参考文献・公式リソース" },
  { id: "s17", num: "★", label: "まとめ — 10ポイント" },
];

/**
 * ONB ガイドの固定サイドバー目次。
 *
 * 本文（section 群）は Server Component のまま、scroll-spy だけをクライアント化する。
 * 元コードに倣い `IntersectionObserver`（threshold 0.25）で可視 section を追跡し、
 * 対応する nav-a に `active` を付与する。スムーズスクロールは CSS（scroll-behavior）に委ねる。
 */
export function OnbSidebar() {
  const [activeId, setActiveId] = useState<string>(NAV_ITEMS[0].id);

  useEffect(() => {
    const sections = NAV_ITEMS.map((item) => document.getElementById(item.id)).filter(
      (el): el is HTMLElement => el !== null
    );
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        // 1 バッチにつき可視 section を 1 つだけ選ぶ（最大 intersectionRatio）。
        // entries の順序に依存せず決定論的に active を更新する。
        let best: IntersectionObserverEntry | null = null;
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          if (best === null || entry.intersectionRatio > best.intersectionRatio) {
            best = entry;
          }
        }
        if (best !== null) setActiveId(best.target.id);
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
    <nav className="sidebar" aria-label="後頭神経ブロックガイド目次">
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
