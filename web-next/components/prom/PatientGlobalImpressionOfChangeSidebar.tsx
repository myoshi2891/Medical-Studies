"use client";

import { useEffect, useRef, useState } from "react";

type NavItem = {
  id: string;
  num: number;
  title: string;
};

const navItems: NavItem[] = [
  { id: "s1", num: 1, title: "PGICとは何か" },
  { id: "s2", num: 2, title: "歴史的背景" },
  { id: "s3", num: 3, title: "スケール構造と採点" },
  { id: "s4", num: 4, title: "2つのバージョン" },
  { id: "s5", num: 5, title: "心理測定学的特性" },
  { id: "s6", num: 6, title: "MCIDと頭痛医学" },
  { id: "s7", num: 7, title: "臨床試験での応用" },
  { id: "s8", num: 8, title: "CGRP mAb試験での位置づけ" },
  { id: "s9", num: 9, title: "PGIC vs CGIC" },
  { id: "s10", num: 10, title: "FDA規制上の位置づけ" },
  { id: "s11", num: 11, title: "他指標との統合活用" },
  { id: "s12", num: 12, title: "臨床実施ワークフロー" },
  { id: "s13", num: 13, title: "限界点と批判的評価" },
  { id: "s14", num: 14, title: "参考文献・ソース" },
];

export default function PatientGlobalImpressionOfChangeSidebar() {
  const [activeId, setActiveId] = useState<string>("s1");
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
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
        inert={isMobile && !isOpen ? true : undefined}
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
            onClick={handleNavClick}
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
