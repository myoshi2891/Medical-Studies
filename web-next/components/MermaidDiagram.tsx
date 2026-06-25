"use client";

import { useEffect, useRef } from "react";

/**
 * 静的教育ガイドページ（アーキタイプ A）共有の Mermaid 描画コンポーネント。
 *
 * - mermaid は動的 import（lazy）で初回描画時のみ読み込む。
 * - `mermaid.run({ nodes })` による in-place 変換を用い、`dangerouslySetInnerHTML` は使わない。
 * - ページ固有のテーマ色は任意の `themeVariables` で上書きできる（既定は中立な base パレット）。
 *
 * @param chart - Mermaid グラフ定義（テンプレートリテラル・左端揃え・改行はステートメント区切り）。
 * @param themeVariables - Mermaid base テーマの themeVariables 上書き（ページ別配色）。
 * @returns Mermaid 図を内包する `<pre className="mermaid">`。
 */
export default function MermaidDiagram({
  chart,
  themeVariables,
}: {
  chart: string;
  themeVariables?: Record<string, string>;
}) {
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
          theme: "base",
          themeVariables: {
            primaryColor: "#eceff1",
            primaryTextColor: "#212121",
            primaryBorderColor: "#90a4ae",
            lineColor: "#546e7a",
            secondaryColor: "#eceff1",
            tertiaryColor: "#f5f5f5",
            edgeLabelBackground: "#ffffff",
            fontSize: "13px",
            ...themeVariables,
          },
          flowchart: { curve: "linear", padding: 20 },
          securityLevel: "strict",
        });
        // 再描画のためノードを定義文へ戻す（処理済みフラグを解除）。
        node.removeAttribute("data-processed");
        node.textContent = chart;
        await mermaid.run({ nodes: [node] });
      } catch {
        // 描画失敗時もページ全体は機能させる（図のみ欠落）。
        if (ref.current) {
          ref.current.textContent =
            "（図の描画に失敗しました。ネットワークまたは CDN を確認してください）";
        }
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [chart, themeVariables]);

  return (
    <pre className="mermaid" ref={ref}>
      {chart}
    </pre>
  );
}
