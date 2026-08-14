"use client";

import { useCallback, useEffect, useRef, useState } from "react";

type NavItem = { id: string; num: string; label: string };

const NAV_ITEMS: readonly NavItem[] = [
  { id: "s1", num: "1", label: "なぜ頭痛と血管が関係するのか" },
  { id: "s2", num: "2", label: "頭蓋内血管の基礎知識" },
  { id: "s3", num: "3", label: "三叉神経血管系" },
  { id: "s4", num: "4", label: "血管説から神経血管説へ" },
  { id: "s5", num: "5", label: "片頭痛とCGRP" },
  { id: "s6", num: "6", label: "前兆と皮質拡延性抑制" },
  { id: "s7", num: "7", label: "血管が関わる頭痛疾患" },
  { id: "s8", num: "8", label: "疾患比較表" },
  { id: "s9", num: "9", label: "危険信号と初期対応" },
  { id: "s10", num: "10", label: "ICHD-3における位置づけ" },
  { id: "s11", num: "11", label: "まとめ" },
  { id: "s12", num: "12", label: "参考文献・情報源" },
];

/**
 * 頭痛と血管 (Vascular Basis of Headache) ガイドの固定サイドバー目次。
 *
 * 本文（section 群）は Server Component のまま、scroll-spy だけをクライアント化する。
 * IntersectionObserver（threshold 0.25）で可視 section の集合を保持し、
 * その中でビューポート上端に最も近いものを active とする。
 *
 * IntersectionObserver のコールバック引数は「変化のあったターゲット」の配列であり
 * ドキュメント順は保証されない。そのため entries の順序には依存させず、
 * 常に可視集合全体から幾何的に選び直す。加えて、交差状態が変化しないまま
 * 長い section 内をスクロールした場合にも追従できるよう scroll でも再計算する。
 */
export function VascularHeadacheSidebar() {
  const [activeId, setActiveId] = useState<string>(NAV_ITEMS[0].id);
  const visibleIdsRef = useRef<Set<string>>(new Set());

  // 可視 section のうち、ビューポート上端との距離が最小のものを選ぶ
  const syncActiveId = useCallback(() => {
    let nearestId: string | null = null;
    let nearestDistance = Number.POSITIVE_INFINITY;

    for (const id of visibleIdsRef.current) {
      const el = document.getElementById(id);
      if (el === null) continue;

      const distance = Math.abs(el.getBoundingClientRect().top);
      if (distance < nearestDistance) {
        nearestDistance = distance;
        nearestId = id;
      }
    }

    if (nearestId !== null) {
      setActiveId(nearestId);
    }
  }, []);

  useEffect(() => {
    const sections = NAV_ITEMS.map((item) => document.getElementById(item.id)).filter(
      (el): el is HTMLElement => el !== null
    );
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            visibleIdsRef.current.add(entry.target.id);
            continue;
          }
          visibleIdsRef.current.delete(entry.target.id);
        }
        syncActiveId();
      },
      { threshold: 0.25 }
    );

    for (const section of sections) {
      observer.observe(section);
    }

    window.addEventListener("scroll", syncActiveId, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", syncActiveId);
    };
  }, [syncActiveId]);

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
