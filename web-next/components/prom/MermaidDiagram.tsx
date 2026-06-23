"use client";

import { useEffect, useRef } from "react";

/**
 * Mermaid 図を遅延 import で描画（元 runMermaid）。テーマ変更で再描画する。
 * pre.mermaid にグラフ定義をテキストで置き mermaid.run で in-place 変換するため
 * dangerouslySetInnerHTML を使わない。securityLevel: "strict" を堅持。
 */
export function MermaidDiagram({ chart, isDark }: { chart: string; isDark: boolean }) {
  const ref = useRef<HTMLPreElement>(null);

  useEffect(() => {
    let cancelled = false;
    const node = ref.current;
    if (!node) return;

    (async () => {
      try {
        const mermaid = (await import("mermaid")).default;
        if (cancelled || !ref.current) return;
        mermaid.initialize({
          startOnLoad: false,
          theme: isDark ? "dark" : "base",
          themeVariables: isDark
            ? {}
            : {
                primaryColor: "#e8eaf6",
                primaryTextColor: "#1a237e",
                primaryBorderColor: "#5c6bc0",
                lineColor: "#64748b",
                secondaryColor: "#ede9fe",
                tertiaryColor: "#eef2ff",
                edgeLabelBackground: "#ffffff",
                fontSize: "13px",
              },
          flowchart: { curve: "linear", padding: 18 },
          securityLevel: "strict",
        });
        // 再描画のためノードを定義文へ戻す（処理済みフラグを解除）。
        node.removeAttribute("data-processed");
        node.textContent = chart;
        await mermaid.run({ nodes: [node] });
      } catch {
        // 描画失敗時もアプリ全体は機能させる（図のみ欠落）。
        if (ref.current) {
          ref.current.textContent =
            "（図の描画に失敗しました。ネットワークまたは CDN を確認してください）";
        }
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [chart, isDark]);

  return (
    <pre className="mermaid" ref={ref}>
      {chart}
    </pre>
  );
}
