"use client";

import type { Hotspot } from "@/lib/anatomy/types";

/**
 * 解剖構造の 3D ビューア（クライアントアイランド）。
 *
 * Phase 0（本雛形）: モデル未投入のため、プレースホルダとホットスポット凡例
 * （専門名＋やさしい言い換え）を表示する。Phase 2 で `src` の glTF を
 * model-viewer 経由（マウント時の遅延ロード・`MermaidDiagram` と同型）で描画し、
 * 失敗時は本プレースホルダへ降格する。
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
  return (
    <div className="anatomy-viewer anatomy-model" data-src={src ?? ""}>
      <div
        className="anatomy-viewer-stage"
        role="img"
        aria-label={`${title} の 3D モデル（準備中）`}
      >
        <span className="anatomy-viewer-badge">3D</span>
        <p className="anatomy-viewer-note">
          {src ? "3D モデルは準備中です（Phase 2 で投入）" : "総覧セクション（モデルなし）"}
        </p>
      </div>
      {hotspots.length > 0 && (
        <ul className="anatomy-hotspots">
          {hotspots.map((h) => (
            <li key={h.id} className="anatomy-hotspot">
              <span className="anatomy-hotspot-label">{h.label}</span>
              <span className="anatomy-hotspot-plain">{h.plain}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
