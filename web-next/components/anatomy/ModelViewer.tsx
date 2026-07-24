"use client";

import { useEffect, useRef, useState } from "react";
import Term from "@/components/glossary/Term";
import type { Hotspot } from "@/lib/anatomy/types";

/**
 * Displays an anatomical 3D model with interactive hotspots and an accessible text legend.
 *
 * Models that are unavailable or fail to load are represented by a placeholder while
 * preserving hotspot information.
 *
 * @param src - Path to the glTF or GLB model, or `null` when no model is available.
 * @param hotspots - Annotations containing labels, plain-language descriptions, and 3D positions.
 * @param title - Structure name used for accessibility labeling.
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

  // src が変わったら失敗状態をリセットし、新しいモデルの読み込みを再試行する。
  // src は本文で参照しないが reset トリガーとして意図的に依存に含める（削除不可）。
  // biome-ignore lint/correctness/useExhaustiveDependencies: src はリセットのトリガーとして意図的に指定
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
        // DRACO デコーダを gstatic CDN ではなく同一オリジンの /draco/ から取得させる。
        // model-viewer は接続時に self.ModelViewerElement.dracoDecoderLocation を参照するため、
        // カスタム要素登録（import）より前に設定する（CSP connect-src 'self' 準拠）。
        const g = self as unknown as { ModelViewerElement?: { dracoDecoderLocation?: string } };
        g.ModelViewerElement = g.ModelViewerElement ?? {};
        g.ModelViewerElement.dracoDecoderLocation = "/draco/";
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
