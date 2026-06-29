"use client";

import { useEffect, useRef, useState } from "react";
import Term from "@/components/glossary/Term";
import type { Hotspot } from "@/lib/anatomy/types";

/**
 * 解剖構造の 3D ビューア（クライアントアイランド）。
 *
 * `src` の glTF/GLB を `@google/model-viewer` で描画する。重い Web Component は
 * 初期バンドルに含めず、マウント時に動的 `import()` で遅延ロードする
 * （`components/MermaidDiagram.tsx` と同型）。モデル未投入（src=null）や
 * 読込失敗時はプレースホルダへ降格し、ページ全体は機能を保つ
 * （設計書 docs/architecture.md §4 / §6 の降格戦略）。
 *
 * ホットスポット（専門名・やさしい言い換え・3D 座標）は、3D 上のピン
 * （`slot="hotspot-<id>"` + `data-position`）と、常時表示のテキスト凡例の
 * 二系統で提示する（凡例は降格時・スクリーンリーダー向けに情報を保持）。
 *
 * @param src - public/models 配下の glTF パス（未投入時は null）。
 * @param hotspots - 注釈（専門名・やさしい言い換え・3D 座標）。
 * @param title - 構造名（アクセシビリティ用）。
 */
export default function ModelViewer({
  src,
  hotspots,
  title,
}: {
  src: string | null;
  hotspots: Hotspot[];
  title: string;
}) {
  const ref = useRef<HTMLElement>(null);
  const [failed, setFailed] = useState(false);

  const showModel = src !== null && !failed;

  useEffect(() => {
    setFailed(false);
  }, [src]);

  useEffect(() => {
    if (!showModel) return;
    let cancelled = false;
    const node = ref.current;
    // .glb の取得・解析失敗時はプレースホルダへ降格する。
    const onError = () => {
      if (!cancelled) setFailed(true);
    };
    node?.addEventListener("error", onError);
    (async () => {
      try {
        // 副作用でカスタム要素 <model-viewer> を登録する。
        await import("@google/model-viewer");
      } catch {
        // import 自体の失敗（ネットワーク等）でも降格する。
        if (!cancelled) setFailed(true);
      }
    })();
    return () => {
      cancelled = true;
      node?.removeEventListener("error", onError);
    };
  }, [showModel]);

  const legend =
    hotspots.length > 0 ? (
      <ul className="anatomy-hotspots">
        {hotspots.map((h) => (
          <li key={h.id} className="anatomy-hotspot">
            <span className="anatomy-hotspot-label">
              {/* 専門名にツールチップ（読み仮名＋やさしい言い換え）を付ける。 */}
              <Term term={h.label} reading={h.reading} plain={h.plain}>
                {h.label}
              </Term>
            </span>
            {/* 降格・スクリーンリーダー向けに、やさしい言い換えは常時テキストでも残す。 */}
            <span className="anatomy-hotspot-plain">{h.plain}</span>
          </li>
        ))}
      </ul>
    ) : null;

  if (!showModel) {
    const note = failed
      ? "3D モデルの読み込みに失敗しました（ネットワークまたはモデルを確認してください）"
      : src
        ? "3D モデルは準備中です（モデル未投入）"
        : "総覧セクション（モデルなし）";
    const statusText = failed ? "読込失敗" : src ? "準備中" : "モデルなし";
    return (
      <div className="anatomy-viewer anatomy-model" data-src={src ?? ""}>
        <div
          className="anatomy-viewer-stage"
          role="img"
          aria-label={`${title} の 3D モデル（${statusText}）`}
        >
          <span className="anatomy-viewer-badge">3D</span>
          <p className="anatomy-viewer-note">{note}</p>
        </div>
        {legend}
      </div>
    );
  }

  return (
    <div className="anatomy-viewer anatomy-model" data-src={src}>
      <model-viewer
        ref={ref}
        src={src}
        camera-controls
        auto-rotate
        touch-action="pan-y"
        aria-label={`${title} の 3D モデル`}
      >
        {hotspots.map((h) => (
          <button
            key={h.id}
            type="button"
            className="anatomy-hotspot-pin"
            slot={`hotspot-${h.id}`}
            data-position={h.position}
          >
            {h.label}
          </button>
        ))}
      </model-viewer>
      {legend}
    </div>
  );
}
