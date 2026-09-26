"use client";

import { useState } from "react";
import { ATLAS_LAYERS, ATLAS_PARTS } from "@/lib/anatomy/atlas";
import modelData from "@/lib/anatomy/atlas-models.json";
import { AtlasDetail, LabelToggle, PartButton, type Selection } from "./AnatomyAtlas";
import AtlasModel from "./AtlasModel";

const models: Record<string, { center: number[] }> = modelData.parts;

/** 複数系統の欄では表示する系統を選び、ラベル・回転設定は欄内で共有する。 */
export function AtlasSectionGroup({
  layers,
  title,
}: {
  layers: [string, ...string[]];
  title: string;
}) {
  const [selected, setSelected] = useState(layers[0]);
  const layerId = layers.includes(selected) ? selected : layers[0];
  const options = layers.map((id) => {
    const layer = ATLAS_LAYERS.find((item) => item.id === id);
    if (!layer) throw new Error(`未登録のアトラス系統: ${id}`);
    return layer;
  });

  return (
    <div className="atlas-section-group">
      {options.length > 1 && (
        <fieldset className="atlas-system-switcher" aria-label={`${title}の表示系統`}>
          <legend>表示する系統</legend>
          <div className="atlas-system-options">
            {options.map((layer) => (
              <button
                key={layer.id}
                type="button"
                aria-pressed={layer.id === layerId}
                onClick={() => setSelected(layer.id)}
              >
                <span>{layer.ja}</span>
                <span lang="en" aria-hidden="true">
                  {layer.en}
                </span>
              </button>
            ))}
          </div>
        </fieldset>
      )}
      <AtlasSectionViewer layerId={layerId} />
    </div>
  );
}

/** 全体像と同じモデル・座標・部位解説を使う系統別ビューア。 */
export default function AtlasSectionViewer({ layerId }: { layerId: string }) {
  const [labels, setLabels] = useState(true);
  const [autoRotate, setAutoRotate] = useState(true);
  const [selection, setSelection] = useState<Selection | null>(null);
  const layer = ATLAS_LAYERS.find((item) => item.id === layerId);
  if (!layer) throw new Error(`未登録のアトラス系統: ${layerId}`);
  const parts = ATLAS_PARTS.filter((part) => part.layer === layerId);
  const selectPart = (part: string) => setSelection({ layer: layerId, part });

  return (
    <div className="anatomy-viewer atlas-section-viewer">
      <div className="atlas-section-toolbar">
        <p className="atlas-eyebrow" lang="en">
          {layer.en} / 3D VIEW
        </p>
        <fieldset className="atlas-display-options" aria-label={`${layer.ja}の表示設定`}>
          <LabelToggle checked={labels} onChange={setLabels} />
          <label>
            <input
              type="checkbox"
              checked={autoRotate}
              onChange={(event) => setAutoRotate(event.target.checked)}
            />
            自動回転
          </label>
        </fieldset>
      </div>
      <div className="atlas-section-workspace">
        <AtlasModel
          src={`/models/atlas/${layerId}.glb`}
          title={layer.ja}
          autoRotate={autoRotate}
          pins={
            labels
              ? parts.map((part) => ({
                  id: part.id,
                  label: part.ja,
                  position: models[part.id].center,
                }))
              : []
          }
          onSelect={selectPart}
        />
        <aside className="atlas-section-parts" aria-label={`${layer.ja}の部位探索`}>
          <h3>
            部位を探索 <span>{parts.length}部位</span>
          </h3>
          <p className="atlas-help">部位を選んで拡大し、日英の解説を読む。</p>
          <fieldset className="atlas-part-list" aria-label={`${layer.ja}の部位一覧`}>
            {parts.map((part) => (
              <PartButton key={part.id} part={part} onClick={() => selectPart(part.id)} />
            ))}
          </fieldset>
        </aside>
      </div>
      {selection && <AtlasDetail selection={selection} onClose={() => setSelection(null)} />}
    </div>
  );
}
