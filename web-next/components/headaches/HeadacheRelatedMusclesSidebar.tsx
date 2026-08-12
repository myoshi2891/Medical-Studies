"use client";

import { useEffect, useState } from "react";

const NAV_ITEMS = [
  { id: "s1", num: "1", title: "頭痛の国際分類（ICHD-3）" },
  { id: "s2", num: "2", title: "緊張型頭痛と筋肉" },
  { id: "s3", num: "3", title: "関連筋の解剖学" },
  { id: "s4", num: "4", title: "トリガーポイントと関連痛" },
  { id: "s5", num: "5", title: "末梢性から中枢性感作へ" },
  { id: "s6", num: "6", title: "頸原性頭痛の神経メカニズム" },
  { id: "s7", num: "7", title: "臨床での触診評価" },
  { id: "s8", num: "8", title: "エビデンスに基づく対処法" },
  { id: "s9", num: "9", title: "まとめ" },
  { id: "s10", num: "10", title: "参考文献・情報源" },
];

export function HeadacheRelatedMusclesSidebar() {
  const [activeId, setActiveId] = useState<string>("s1");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { threshold: 0.25 }
    );

    NAV_ITEMS.forEach((item) => {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <nav className="sidebar">
      <div className="s-hdr">目次</div>
      {NAV_ITEMS.map((item) => (
        <a
          key={item.id}
          className={`nav-a ${activeId === item.id ? "active" : ""}`}
          href={`#${item.id}`}
        >
          <span className="n-num">{item.num}</span>
          {item.title}
        </a>
      ))}
    </nav>
  );
}
