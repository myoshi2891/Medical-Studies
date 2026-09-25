"use client";

import { useEffect, useRef, useState } from "react";
import { ATLAS_LAYERS, ATLAS_PARTS, type AtlasPart } from "@/lib/anatomy/atlas";
import modelData from "@/lib/anatomy/atlas-models.json";
import AtlasModel from "./AtlasModel";

const models: Record<string, { center: number[] }> = modelData.parts;
const ALL_LAYERS = ATLAS_LAYERS.map((layer) => layer.id);
const ANCHORS: Record<string, string> = {
  nerves: "frontal-nerve",
  vessels: "carotid",
  brain: "cerebrum",
  brainstem: "medulla",
  skull: "frontal-bone",
  cervical: "axis-c2",
  muscles: "scm",
};
interface Selection {
  layer: string;
  part?: string;
}

/** ネイティブdialogのフォーカス制御・背景の不活性化を利用する。 */
function AtlasDetail({ selection, onClose }: { selection: Selection; onClose: () => void }) {
  const ref = useRef<HTMLDialogElement>(null);
  const [partId, setPartId] = useState(selection.part);
  const [query, setQuery] = useState("");
  const layer = ATLAS_LAYERS.find((l) => l.id === selection.layer) ?? ATLAS_LAYERS[0];
  const parts = ATLAS_PARTS.filter((p) => p.layer === layer.id);
  const part = parts.find((p) => p.id === partId);
  const filtered = parts.filter((p) =>
    `${p.ja} ${p.en}`.toLowerCase().includes(query.trim().toLowerCase())
  );

  useEffect(() => {
    const previous = document.activeElement;
    const dialog = ref.current;
    dialog?.showModal();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      dialog?.close();
      document.body.style.overflow = previousOverflow;
      if (previous instanceof HTMLElement && previous.isConnected) previous.focus();
    };
  }, []);

  return (
    <dialog
      ref={ref}
      className="atlas-dialog"
      aria-labelledby="atlas-detail-title"
      onCancel={(event) => {
        event.preventDefault();
        onClose();
      }}
      onKeyDown={(event) => {
        if (event.key === "Escape") {
          event.preventDefault();
          onClose();
        }
      }}
      onClick={(event) => {
        if (event.target === ref.current) onClose();
      }}
    >
      <div className="atlas-dialog-inner">
        <header className="atlas-detail-header">
          <div>
            <p className="atlas-eyebrow">STRUCTURE EXPLORER</p>
            <h2 id="atlas-detail-title">
              {layer.ja} <span lang="en">{layer.en}</span>
            </h2>
          </div>
          <button type="button" className="atlas-close" onClick={onClose} aria-label="閉じる">
            閉じる ×
          </button>
        </header>
        <div className="atlas-detail-grid">
          <div>
            <AtlasModel
              key={part?.id ?? layer.id}
              src={`/models/atlas/${part?.id ?? layer.id}.glb`}
              title={part?.ja ?? layer.ja}
              pins={
                part
                  ? []
                  : parts.map((p) => ({ id: p.id, label: p.ja, position: models[p.id].center }))
              }
              onSelect={setPartId}
            />
            {part && (
              <button type="button" className="atlas-back" onClick={() => setPartId(undefined)}>
                セクション全体に戻る
              </button>
            )}
            <p className="atlas-model-note">
              {part
                ? "選択部位を単独で拡大しています。左右の構造は同時に表示します。"
                : "部位名を選ぶと、その構造だけを拡大します。"}
            </p>
          </div>
          <div className="atlas-detail-text">
            <label className="atlas-search-label">
              このセクションの部位
              <input
                type="search"
                value={query}
                placeholder="日本語 / English"
                onChange={(event) => setQuery(event.target.value)}
              />
            </label>
            <div className="atlas-part-list">
              {filtered.map((p) => (
                <PartButton
                  key={p.id}
                  part={p}
                  selected={part?.id === p.id}
                  onClick={() => setPartId(p.id)}
                />
              ))}
              {filtered.length === 0 && <p role="status">該当する部位がありません。</p>}
            </div>
            {part ? (
              <article className="atlas-description" aria-live="polite">
                <h3>
                  {part.ja}
                  <span lang="en">{part.en}</span>
                </h3>
                <h4>
                  位置と働き <span lang="en">Anatomy & function</span>
                </h4>
                <p>{part.description.ja}</p>
                <p lang="en">{part.description.en}</p>
                <h4>
                  頭痛を学ぶポイント <span lang="en">Clinical context</span>
                </h4>
                <p>{part.clinical.ja}</p>
                <p lang="en">{part.clinical.en}</p>
                <p className="atlas-sources">
                  参考資料 / References:{" "}
                  {part.sources.map((url, index) => (
                    <a key={url} href={url} target="_blank" rel="noopener noreferrer">
                      {url.includes("openstax") ? "OpenStax" : "NCBI Bookshelf"} [{index + 1}]
                    </a>
                  ))}
                </p>
              </article>
            ) : (
              <div className="atlas-description">
                <h3>{layer.ja}の観察</h3>
                <p>{layer.summary.ja}</p>
                <p lang="en">{layer.summary.en}</p>
                <p>一覧または3D上のラベルから部位を選んでください。</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </dialog>
  );
}

function PartButton({
  part,
  selected,
  onClick,
}: {
  part: AtlasPart;
  selected?: boolean;
  onClick: () => void;
}) {
  return (
    <button type="button" className="atlas-part-button" aria-pressed={selected} onClick={onClick}>
      <span>{part.ja}</span>
      <span lang="en">{part.en}</span>
    </button>
  );
}

/** 既存のカテゴリ見出しからも同じ拡大画面へ到達できる導線。 */
export function AtlasSectionButton({ layers }: { layers: string[] }) {
  const [selection, setSelection] = useState<Selection | null>(null);
  return (
    <div className="atlas-section-actions">
      {ATLAS_LAYERS.filter((l) => layers.includes(l.id)).map((layer) => (
        <button type="button" key={layer.id} onClick={() => setSelection({ layer: layer.id })}>
          {layer.ja}の部位を拡大・日英解説
        </button>
      ))}
      {selection && <AtlasDetail selection={selection} onClose={() => setSelection(null)} />}
    </div>
  );
}

export default function AnatomyAtlas() {
  const [visible, setVisible] = useState(ALL_LAYERS);
  const [transparent, setTransparent] = useState(true);
  const [query, setQuery] = useState("");
  const [selection, setSelection] = useState<Selection | null>(null);
  const [labels, setLabels] = useState(true);
  const results = query.trim()
    ? ATLAS_PARTS.filter((p) =>
        `${p.ja} ${p.en}`.toLowerCase().includes(query.trim().toLowerCase())
      )
    : [];
  return (
    <div className="atlas-explorer">
      <div className="atlas-heading">
        <div>
          <p className="atlas-eyebrow">HEAD & NECK · INTERACTIVE ATLAS</p>
          <h3>ひとつの身体で、つながりを見る。</h3>
        </div>
        <span className="atlas-count">7 SYSTEMS / {ATLAS_PARTS.length} STRUCTURES</span>
      </div>
      <div className="atlas-overview-grid">
        <div className="atlas-stage">
          <AtlasModel
            src="/models/atlas/overview.glb"
            title="頭頸部の全体像"
            visible={visible}
            transparent={transparent}
            pins={
              labels
                ? ATLAS_LAYERS.filter((l) => visible.includes(l.id)).map((l) => ({
                    id: l.id,
                    label: l.ja,
                    position: models[ANCHORS[l.id]].center,
                  }))
                : []
            }
            onSelect={(id) => setSelection({ layer: id })}
          />
          {visible.length === 0 && (
            <p className="atlas-empty" role="status">
              全レイヤーが非表示です。右の一覧から表示できます。
            </p>
          )}
        </div>
        <aside className="atlas-controls" aria-label="全体像の表示設定">
          <h4>
            表示する構造 <span lang="en">Layers</span>
          </h4>
          <p className="atlas-help">チェックで表示切替。名前を押すと拡大します。</p>
          {ATLAS_LAYERS.map((layer) => (
            <div className="atlas-layer" key={layer.id}>
              <input
                type="checkbox"
                aria-label={`${layer.ja}を表示`}
                checked={visible.includes(layer.id)}
                onChange={() =>
                  setVisible((current) =>
                    current.includes(layer.id)
                      ? current.filter((id) => id !== layer.id)
                      : [...current, layer.id]
                  )
                }
              />
              <span className="atlas-swatch" style={{ backgroundColor: layer.color }} />
              <button
                type="button"
                aria-label={`${layer.ja}を拡大`}
                onClick={() => setSelection({ layer: layer.id })}
              >
                <strong>{layer.ja}</strong>
                <span lang="en">{layer.en}</span>
                <span aria-hidden="true">↗</span>
              </button>
            </div>
          ))}
          <div className="atlas-display-options">
            <label>
              <input
                type="checkbox"
                checked={transparent}
                onChange={(event) => setTransparent(event.target.checked)}
              />
              骨・脳・筋を透過
            </label>
            <label>
              <input
                type="checkbox"
                checked={labels}
                onChange={(event) => setLabels(event.target.checked)}
              />
              3Dラベルを表示
            </label>
          </div>
          <button type="button" className="atlas-reset" onClick={() => setVisible(ALL_LAYERS)}>
            全レイヤーを表示
          </button>
        </aside>
      </div>
      <div className="atlas-search">
        <label className="atlas-search-label">
          部位を検索（日英）
          <input
            type="search"
            placeholder="例：延髄 / medulla / C1"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
        </label>
        {query.trim() && (
          <div className="atlas-results">
            {results.map((part) => (
              <PartButton
                key={part.id}
                part={part}
                onClick={() => setSelection({ layer: part.layer, part: part.id })}
              />
            ))}
            {results.length === 0 && <p role="status">該当する部位がありません。</p>}
          </div>
        )}
      </div>
      <details className="atlas-coverage">
        <summary>収録範囲・モデルの出典</summary>
        <p>
          BodyParts3Dの代表解剖を使用しています。7系統の主要構造を含みますが、全ての神経・血管・筋を網羅するものではありません。三叉神経本幹、大後頭神経、頸神経根、靱帯、椎間板、脳幹の各神経核は未収録です。大脳は収録された皮質表面と白質を組み合わせ、僧帽筋などは付着部を保つため上背部まで表示します。左右は解剖学的位置に保ち、細い枝はグループ化しています。
        </p>
        <p lang="en">
          This reference includes major structures in seven systems, not every anatomical structure
          or variation. The trigeminal trunk, greater occipital nerves, cervical roots, ligaments,
          discs and individual brainstem nuclei are not modeled. Bilateral parts are grouped;
          upper-back muscle extent is preserved.
        </p>
        <p>
          操作設計の参考:{" "}
          <a
            href="https://github.com/ashemag/human-atlas"
            target="_blank"
            rel="noopener noreferrer"
          >
            Human Atlas
          </a>
          。モデルは本リポジトリのBodyParts3D元データから生成（CC BY-SA 2.1 JP）。
        </p>
      </details>
      {selection && <AtlasDetail selection={selection} onClose={() => setSelection(null)} />}
    </div>
  );
}
