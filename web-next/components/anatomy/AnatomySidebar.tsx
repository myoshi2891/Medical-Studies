"use client";

import { useEffect, useState } from "react";
import { ANATOMY_MANIFEST } from "@/lib/anatomy/manifest";

/** ナビ項目（manifest 駆動）。 */
const NAV_ITEMS = ANATOMY_MANIFEST.map((s) => ({ id: s.id, title: s.title }));

/**
 * 頭痛 3D 解剖アトラスの固定サイドナビ（scroll-spy）。
 *
 * 本文（構造セクション群）は Server Component のまま、現在位置追跡だけをクライアント化する。
 * 既存ガイドの `MigraineSidebar` と同型で、`IntersectionObserver`（threshold 0.25）により
 * 可視セクションの最大 intersectionRatio を決定論的に選び、対応リンクを `active` にする。
 * スムーズスクロールは CSS（`scroll-behavior`）に委ねる（promp.md ③）。
 */
export function AnatomySidebar() {
  const [activeId, setActiveId] = useState<string>(NAV_ITEMS[0]?.id ?? "");

  useEffect(() => {
    const sections = NAV_ITEMS.map((item) => document.getElementById(item.id)).filter(
      (el): el is HTMLElement => el !== null
    );
    if (sections.length === 0) return;

    // 全 section の最新 intersectionRatio を保持し、最大のものをカレントにする。
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
    <nav className="anatomy-sidebar" aria-label="解剖アトラス目次">
      <div className="anatomy-sidebar-hdr">構造</div>
      {NAV_ITEMS.map((item) => (
        <a
          key={item.id}
          className={item.id === activeId ? "anatomy-nav-a active" : "anatomy-nav-a"}
          href={`#${item.id}`}
          aria-current={item.id === activeId ? "location" : undefined}
        >
          {item.title}
        </a>
      ))}
    </nav>
  );
}
