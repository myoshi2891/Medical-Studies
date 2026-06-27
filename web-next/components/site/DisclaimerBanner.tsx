"use client";

import { useEffect, useRef } from "react";

/**
 * 全ページ共通の医療免責バナー（2行）。
 * 固定ヘッダ直下に固定表示し、ResizeObserver でバナー高さを
 * --ch-disclaimer-height に同期する。body.has-common-header の
 * margin-top 計算に使われ、本文がヘッダ／バナーに隠れないようにする。
 */
export function DisclaimerBanner() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const sync = () => {
      const h = el.getBoundingClientRect().height;
      document.documentElement.style.setProperty("--ch-disclaimer-height", `${h}px`);
    };

    if (typeof ResizeObserver !== "undefined") {
      const ro = new ResizeObserver(sync);
      ro.observe(el);
      return () => ro.disconnect();
    }

    requestAnimationFrame(sync);
    window.addEventListener("resize", sync);
    return () => window.removeEventListener("resize", sync);
  }, []);

  return (
    <div ref={ref} className="ch-disclaimer" lang="ja">
      <span className="ch-disclaimer-line">
        ⚠ 本サイトは医療教育目的のコンテンツです。医師による診断・治療の代替にはなりません。
      </span>
      <span className="ch-disclaimer-line">
        一部に AI
        生成による解析結果を含み、情報の正確性は保証しません。症状がある場合は必ず医療機関を受診してください。
      </span>
    </div>
  );
}
