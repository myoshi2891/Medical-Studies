"use client";

import { useEffect, useState } from "react";

/** サイドバー目次の項目（元 HTML の nav-a を忠実転記）。 */
type NavItem = { id: string; num: string; label: string };

const NAV_ITEMS: readonly NavItem[] = [
  { id: "s1", num: "1", label: "頚神経叢ブロックとは" },
  { id: "s2", num: "2", label: "解剖学的基礎 — 頚神経叢" },
  { id: "s3", num: "3", label: "頸部筋膜の層構造（最重要）" },
  { id: "s4", num: "4", label: "3分類と注入部位" },
  { id: "s5", num: "5", label: "適応症とエビデンス" },
  { id: "s6", num: "6", label: "禁忌と注意事項" },
  { id: "s7", num: "7", label: "必要物品" },
  { id: "s8", num: "8", label: "手技① 浅CPB ランドマーク法" },
  { id: "s9", num: "9", label: "手技② 浅CPB 超音波下" },
  { id: "s10", num: "10", label: "手技③ 中間CPB 超音波下" },
  { id: "s11", num: "11", label: "手技④ 深CPB ランドマーク法" },
  { id: "s12", num: "12", label: "手技⑤ 深CPB 超音波下" },
  { id: "s13", num: "13", label: "局所麻酔薬の選択と用量" },
  { id: "s14", num: "14", label: "合併症と安全管理" },
  { id: "s15", num: "15", label: "適応別エビデンスレビュー" },
  { id: "s16", num: "16", label: "アウトカム評価指標" },
  { id: "s17", num: "17", label: "参考文献・公式リソース" },
  { id: "s18", num: "★", label: "まとめ — 10ポイント" },
];

/**
 * CPB ガイドの固定サイドバー目次。
 *
 * 本文（section 群）は Server Component のまま、scroll-spy だけをクライアント化する。
 * 元コードに倣い `IntersectionObserver`（threshold 0.25）で可視 section を追跡し、
 * 対応する nav-a に `active` を付与する。スムーズスクロールは CSS（scroll-behavior）に委ねる。
 */
export function CpbSidebar() {
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
