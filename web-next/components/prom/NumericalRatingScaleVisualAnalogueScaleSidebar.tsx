"use client";

import { useEffect, useState } from "react";

type NavItem = {
  id: string;
  num: number;
  title: string;
};

const navItems: NavItem[] = [
  { id: "s1", num: 1, title: "はじめに — なぜ疼痛を測定するのか" },
  { id: "s2", num: 2, title: "歴史的背景" },
  { id: "s3", num: 3, title: "VAS（視覚的アナログスケール）" },
  { id: "s4", num: 4, title: "NRS（数値評価スケール）" },
  { id: "s5", num: 5, title: "VRS との比較" },
  { id: "s6", num: 6, title: "VAS vs NRS — 使い分け" },
  { id: "s7", num: 7, title: "心理測定学的特性" },
  { id: "s8", num: 8, title: "最小臨床的重要差（MCID）" },
  { id: "s9", num: 9, title: "頭痛医学への応用" },
  { id: "s10", num: 10, title: "FDA PRO ガイダンス" },
  { id: "s11", num: 11, title: "特別集団への配慮" },
  { id: "s12", num: 12, title: "他の転帰指標との統合" },
  { id: "s13", num: 13, title: "臨床実施ワークフロー（12週間）" },
  { id: "s14", num: 14, title: "よくある誤りと注意点" },
  { id: "s15", num: 15, title: "参考文献・ソース一覧" },
];

export default function NumericalRatingScaleVisualAnalogueScaleSidebar() {
  const [activeId, setActiveId] = useState<string>("s1");
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    const media = window.matchMedia("(max-width: 900px)");
    const listener = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    setIsMobile(media.matches);
    media.addEventListener("change", listener);
    return () => media.removeEventListener("change", listener);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
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

  const handleNavClick = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  return (
    <>
      <button
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
        onClick={() => setIsOpen(false)}
        aria-label="目次を閉じる"
      />

      <nav
        className={`sidebar ${isOpen ? "open" : ""}`}
        id="site-nav"
        aria-label="目次"
        inert={isMobile && !isOpen ? true : undefined}
      >
        <div className="s-hdr">目次</div>
        {navItems.map((item) => (
          <a
            key={item.id}
            className={`nav-a ${activeId === item.id ? "active" : ""}`}
            href={`#${item.id}`}
            onClick={handleNavClick}
          >
            <span className="n-num">{item.num}</span>
            {item.title}
          </a>
        ))}
      </nav>
    </>
  );
}
