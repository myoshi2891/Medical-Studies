"use client";

import type { ModelViewerElement } from "@google/model-viewer";
import { useEffect, useRef, useState } from "react";
import { ATLAS_LAYERS, ATLAS_PARTS } from "@/lib/anatomy/atlas";
import { loadModelViewer } from "@/lib/anatomy/load-model-viewer";

interface AtlasPin {
  id: string;
  label: string;
  position: number[];
}

const SELECTED_PART_COLOR = [0.05, 0.65, 0.58] as const;

/** 同じ出典座標で生成したGLBを表示し、公開マテリアルAPIで透過を制御する。 */
export default function AtlasModel({
  src,
  title,
  visible,
  transparent = false,
  autoRotate = false,
  pins = [],
  selectedPart,
  onSelect,
}: {
  src: string;
  title: string;
  visible?: string[];
  transparent?: boolean;
  autoRotate?: boolean;
  pins?: AtlasPin[];
  selectedPart?: string;
  onSelect?: (id: string) => void;
}) {
  const ref = useRef<ModelViewerElement>(null);
  const originalColors = useRef(new Map<string, [number, number, number]>());
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");
  const [attempt, setAttempt] = useState(0);
  const [view, setView] = useState("25deg 80deg auto");

  // src または再試行に合わせ、イベント購読と失敗状態を更新する。
  // biome-ignore lint/correctness/useExhaustiveDependencies: src と attempt はモデル再読込の境界
  useEffect(() => {
    setStatus("loading");
    originalColors.current.clear();
    const element = ref.current;
    if (!element) return;
    let cancelled = false;
    const loaded = () => setStatus("ready");
    const failed = () => setStatus("error");
    element.addEventListener("load", loaded);
    element.addEventListener("error", failed);
    (async () => {
      try {
        await loadModelViewer();
        if (!cancelled && element.loaded) loaded();
      } catch {
        if (!cancelled) failed();
      }
    })();
    return () => {
      cancelled = true;
      element.removeEventListener("load", loaded);
      element.removeEventListener("error", failed);
    };
  }, [src, attempt]);

  useEffect(() => {
    if (status !== "ready") return;
    for (const material of ref.current?.model?.materials ?? []) {
      const part = ATLAS_PARTS.find((p) => p.id === material.name);
      const layer = ATLAS_LAYERS.find((l) => l.id === part?.layer);
      if (!layer) continue;
      const alpha = visible && !visible.includes(layer.id) ? 0 : transparent ? layer.opacity : 1;
      const current = material.pbrMetallicRoughness.baseColorFactor;
      const original = originalColors.current.get(material.name) ?? [
        current[0],
        current[1],
        current[2],
      ];
      originalColors.current.set(material.name, original);
      const [r, g, b] = material.name === selectedPart ? SELECTED_PART_COLOR : original;
      material.setAlphaMode(alpha < 1 ? "BLEND" : "OPAQUE");
      material.pbrMetallicRoughness.setBaseColorFactor([r, g, b, alpha]);
    }
  }, [status, visible, transparent, selectedPart]);

  return (
    <div className="atlas-model">
      <fieldset className="atlas-camera" aria-label={`${title}の視点`}>
        {[
          ["正面", "0deg 90deg auto"],
          ["側面", "90deg 90deg auto"],
          ["背面", "180deg 90deg auto"],
          ["斜め", "25deg 80deg auto"],
        ].map(([label, orbit]) => (
          <button
            key={label}
            type="button"
            aria-pressed={view === orbit}
            onClick={() => {
              setView(orbit);
              ref.current?.setAttribute("camera-orbit", orbit);
            }}
          >
            {label}
          </button>
        ))}
      </fieldset>
      <model-viewer
        key={`${src}-${attempt}`}
        ref={ref}
        src={src}
        alt={`${title}の3Dモデル。ドラッグで回転、ホイールまたはピンチで拡大。`}
        aria-label={`${title}の3Dモデル`}
        camera-controls
        auto-rotate={autoRotate || undefined}
        camera-orbit={view}
        touch-action="pan-y"
        interaction-prompt="none"
        exposure="1.15"
      >
        {pins.map((pin) => (
          <button
            type="button"
            key={pin.id}
            slot={`hotspot-${pin.id}`}
            data-position={pin.position.join(" ")}
            className="atlas-pin"
            onClick={() => onSelect?.(pin.id)}
            aria-label={`${pin.label}の位置から拡大`}
            aria-pressed={pin.id === selectedPart}
          >
            {pin.label}
          </button>
        ))}
      </model-viewer>
      {status === "loading" && (
        <p className="atlas-load" role="status">
          3Dモデルを読み込み中…
        </p>
      )}
      {status === "error" && (
        <div className="atlas-error" role="alert">
          <p>3Dモデルを読み込めませんでした。部位一覧から解説を確認できます。</p>
          <button type="button" onClick={() => setAttempt((value) => value + 1)}>
            再読み込み
          </button>
        </div>
      )}
      <p className="atlas-gesture">
        ドラッグで回転 · スクロール／ピンチで拡大 · ラベルで部位を選択
      </p>
    </div>
  );
}
