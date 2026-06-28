"use client";

import { useEffect, useState } from "react";

type NavItem = {
  id: string;
  num: number;
  title: string;
};

const navItems: NavItem[] = [
  { id: "s1", num: 1, title: "SNOOP4 レッドフラッグ" },
  { id: "s2", num: 2, title: "頭痛日誌とは" },
  { id: "s3", num: 3, title: "なぜ必要か（エビデンス）" },
  { id: "s4", num: 4, title: "STEP1 記録の準備" },
  { id: "s5", num: 5, title: "STEP2 記録項目の理解" },
  { id: "s6", num: 6, title: "STEP3 日々の記録手順" },
  { id: "s7", num: 7, title: "STEP4 MOH リスク監視" },
  { id: "s8", num: 8, title: "STEP5 トリガー同定と管理" },
  { id: "s9", num: 9, title: "STEP6 データ解析" },
  { id: "s10", num: 10, title: "STEP7 医師との情報共有" },
  { id: "s11", num: 11, title: "紙 vs デジタル" },
  { id: "s12", num: 12, title: "推奨アプリ" },
  { id: "s13", num: 13, title: "特殊集団への配慮" },
  { id: "s14", num: 14, title: "アウトカム統合" },
  { id: "s15", num: 15, title: "12週間プロトコル" },
  { id: "s16", num: 16, title: "参考文献・ソースURL" },
];

export default function HeadacheDiarySidebar() {
  const [activeId, setActiveId] = useState<string>("s1");
  const [isOpen, setIsOpen] = useState<boolean>(false);

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

      <nav className={`sidebar ${isOpen ? "open" : ""}`} id="site-nav" aria-label="目次">
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
