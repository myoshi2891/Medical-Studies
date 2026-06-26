"use client";

import { useState } from "react";
import type { MriSeries } from "@/lib/anatomy/types";

/**
 * 既存 MRI PNG の 2D スライス・スクラバ（クライアントアイランド）。
 *
 * `mri` が null（Phase 0）の場合はプレースホルダを表示。Phase 1 で匿名化済み
 * スライスを wiring すると、スライダー・前後ボタンでスクラブできる。
 *
 * @param mri - 対応 MRI シリーズ（未投入時は null）。
 * @param title - 構造名（alt テキスト用）。
 */
export default function MriSliceViewer({ mri, title }: { mri: MriSeries | null; title: string }) {
  const [index, setIndex] = useState(0);

  if (!mri || mri.slices.length === 0) {
    return (
      <div className="anatomy-viewer anatomy-mri anatomy-mri-empty">
        <span className="anatomy-viewer-badge">MRI</span>
        <p className="anatomy-viewer-note">MRI スライスは準備中です（Phase 1・匿名化後に投入）</p>
      </div>
    );
  }

  const last = mri.slices.length - 1;
  const clamped = Math.min(Math.max(index, 0), last);
  const src = mri.slices[clamped];

  return (
    <div className="anatomy-viewer anatomy-mri">
      {/* biome-ignore lint/performance/noImgElement: 静的スライス PNG のスクラブ表示で next/image の最適化は不要 */}
      <img
        className="anatomy-mri-img"
        src={src}
        alt={`${title} の MRI スライス ${clamped + 1}/${mri.slices.length}`}
        loading="lazy"
      />
      <div className="anatomy-mri-controls">
        <button
          type="button"
          className="anatomy-mri-btn"
          onClick={() => setIndex(Math.max(0, clamped - 1))}
          aria-label="前のスライス"
        >
          ‹
        </button>
        <input
          type="range"
          className="anatomy-mri-range"
          min={0}
          max={last}
          value={clamped}
          onChange={(e) => setIndex(Number(e.target.value))}
          aria-label="スライス選択"
        />
        <button
          type="button"
          className="anatomy-mri-btn"
          onClick={() => setIndex(Math.min(last, clamped + 1))}
          aria-label="次のスライス"
        >
          ›
        </button>
        <span className="anatomy-mri-count">
          {clamped + 1}/{mri.slices.length}
        </span>
      </div>
      {mri.note && <p className="anatomy-mri-note">{mri.note}</p>}
    </div>
  );
}
