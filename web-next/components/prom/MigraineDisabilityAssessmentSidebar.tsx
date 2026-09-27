"use client";

import { useEffect, useRef, useState } from "react";

type NavItem = {
  id: string;
  num: number;
  title: string;
};

const navItems: NavItem[] = [
  { id: "s1", num: 1, title: "MIDASとは何か" },
  { id: "s2", num: 2, title: "SNOOP4 レッドフラッグスクリーニング" },
  { id: "s3", num: 3, title: "質問票の構造" },
  { id: "s4", num: 4, title: "スコアリング方法" },
  { id: "s5", num: 5, title: "スコア解釈（グレード分類）" },
  { id: "s6", num: 6, title: "心理測定特性" },
  { id: "s7", num: 7, title: "最小臨床重要差（MIC）" },
  { id: "s8", num: 8, title: "日本語版の検証" },
  { id: "s9", num: 9, title: "頭痛タイプ別参照スコア" },
  { id: "s10", num: 10, title: "HIT-6との比較" },
  { id: "s11", num: 11, title: "臨床使用フローチャート" },
  { id: "s12", num: 12, title: "特殊集団への適用" },
  { id: "s13", num: 13, title: "臨床応用の限界" },
  { id: "s14", num: 14, title: "統合モニタリングプロトコル" },
  { id: "s15", num: 15, title: "エビデンス要約と参考文献" },
];

export default function MigraineDisabilityAssessmentSidebar() {
  const [activeId, setActiveId] = useState<string>("s1");
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        // 交差している要素の中で、最も上部にある要素を探す
        const visibleEntry = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];

        if (visibleEntry) {
          setActiveId(visibleEntry.target.id);
        }
      },
      {
        rootMargin: "-10% 0px -70% 0px",
        threshold: 0,
      }
    );

    for (const item of navItems) {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
    setIsOpen(false);
    if (isOpen) toggleRef.current?.focus();
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
        toggleRef.current?.focus();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  return (
    <>
      <button
        ref={toggleRef}
        className="menu-toggle"
        id="menuToggle"
        type="button"
        aria-expanded={isOpen}
        aria-controls="site-nav"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span aria-hidden="true">☰</span> 目次
      </button>

      <button
        type="button"
        className={`nav-backdrop ${isOpen ? "open" : ""}`}
        id="navBackdrop"
        onClick={() => {
          setIsOpen(false);
          toggleRef.current?.focus();
        }}
        aria-label="目次を閉じる"
      />

      <nav
        className={`sidebar ${isOpen ? "open" : ""}`}
        id="site-nav"
        aria-label="PROM評価ガイド目次"
      >
        <div className="s-hdr">
          このページの目次 <span>{navItems.length}項目</span>
        </div>
        {navItems.map((item) => (
          <a
            key={item.id}
            className={`nav-a ${activeId === item.id ? "active" : ""}`}
            href={`#${item.id}`}
            aria-current={activeId === item.id ? "location" : undefined}
            onClick={(e) => handleNavClick(e, item.id)}
          >
            <span className="n-num" aria-hidden="true">
              {String(item.num).padStart(2, "0")}
            </span>
            {item.title}
          </a>
        ))}
      </nav>
    </>
  );
}
