"use client";

import { useState } from "react";
import { ATLAS_LAYERS, ATLAS_PARTS } from "@/lib/anatomy/atlas";
import modelData from "@/lib/anatomy/atlas-models.json";
import { AtlasDetail, LabelToggle, PartButton, type Selection } from "./AnatomyAtlas";
import AtlasModel from "./AtlasModel";

const models: Record<string, { center: number[] }> = modelData.parts;

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
      <p className="atlas-help">部位名を選ぶと拡大し、日本語・英語の解説を表示します。</p>
      <fieldset className="atlas-part-list" aria-label={`${layer.ja}の部位一覧`}>
        {parts.map((part) => (
          <PartButton key={part.id} part={part} onClick={() => selectPart(part.id)} />
        ))}
      </fieldset>
      {selection && <AtlasDetail selection={selection} onClose={() => setSelection(null)} />}
    </div>
  );
}
