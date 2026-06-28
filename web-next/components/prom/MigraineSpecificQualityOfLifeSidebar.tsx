"use client";

import { useEffect, useState } from "react";

type NavItem = {
  id: string;
  num: number;
  title: string;
};

const navItems: NavItem[] = [
  { id: "s1", num: 1, title: "MSQ v2.1 とは何か" },
  { id: "s2", num: 2, title: "SNOOP4 レッドフラッグ" },
  { id: "s3", num: 3, title: "開発の歴史（v1.0からv2.1）" },
  { id: "s4", num: 4, title: "質問票の構造（3ドメイン）" },
  { id: "s5", num: 5, title: "各ドメインの詳細" },
  { id: "s6", num: 6, title: "スコアリング方法" },
  { id: "s7", num: 7, title: "スコア解釈と治療反応" },
  { id: "s8", num: 8, title: "心理測定特性" },
  { id: "s9", num: 9, title: "最小臨床重要差（MWPC）" },
  { id: "s10", num: 10, title: "CGRP試験での活用" },
  { id: "s11", num: 11, title: "他の頭痛PROとの比較" },
  { id: "s12", num: 12, title: "臨床使用フローチャート" },
  { id: "s13", num: 13, title: "特殊集団への適用" },
  { id: "s14", num: 14, title: "12週間プロトコル" },
  { id: "s15", num: 15, title: "エビデンス・参考文献" },
];

export default function MigraineSpecificQualityOfLifeSidebar() {
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

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
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
            onClick={(e) => handleNavClick(e, item.id)}
          >
            <span className="n-num">{item.num}</span>
            {item.title}
          </a>
        ))}
      </nav>
    </>
  );
}
