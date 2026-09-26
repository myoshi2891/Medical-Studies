"use client";

import dynamic from "next/dynamic";
import type { MriSeries, StructureId } from "@/lib/anatomy/types";

/**
 * 重いクライアント専用ビューア（アトラス / MriSliceViewer）を遅延読込する境界。
 *
 * Server Component（app/anatomy/page.tsx）からは `ssr: false` 付きの
 * `next/dynamic` を直接呼べない（Next.js のビルド制約）ため、本クライアント
 * ラッパーで dynamic import を閉じ込め、初期バンドルを小さく保つ。
 * page.tsx はこのラッパーのみを参照する。
 */
const MriSliceViewer = dynamic(() => import("@/components/anatomy/MriSliceViewer"), {
  ssr: false,
  loading: () => <div className="anatomy-viewer-loading">MRI ビューアを読み込み中…</div>,
});

const AnatomyAtlas = dynamic(() => import("@/components/anatomy/AnatomyAtlas"), { ssr: false });
const AtlasSectionButton = dynamic(
  () => import("@/components/anatomy/AnatomyAtlas").then((module) => module.AtlasSectionButton),
  { ssr: false }
);
const AtlasSectionGroup = dynamic(
  () =>
    import("@/components/anatomy/AtlasSectionViewer").then((module) => module.AtlasSectionGroup),
  {
    ssr: false,
    loading: () => <div className="anatomy-viewer-loading">3D ビューアを読み込み中…</div>,
  }
);

/** ページの欄とモデルの系統を対応付け、詳細導線と通常表示で共用する。 */
const SECTION_LAYERS: Record<Exclude<StructureId, "overview">, [string, ...string[]]> = {
  nerves: ["nerves"],
  vessels: ["vessels"],
  brain: ["brain", "brainstem"],
  bones: ["skull", "cervical"],
  muscles: ["muscles"],
};

interface AnatomyViewersProps {
  structureId: StructureId;
  mri: MriSeries | null;
  title: string;
}

export function AnatomyViewers({ structureId, mri, title }: AnatomyViewersProps) {
  return (
    <>
      {structureId === "overview" ? (
        <>
          <AnatomyAtlas />
          <div className="anatomy-viewers">
            <MriSliceViewer mri={mri} title={title} />
          </div>
        </>
      ) : (
        <>
          <AtlasSectionButton layers={SECTION_LAYERS[structureId]} />
          <div className="anatomy-viewers">
            <AtlasSectionGroup layers={SECTION_LAYERS[structureId]} title={title} />
            <MriSliceViewer mri={mri} title={title} />
          </div>
        </>
      )}
    </>
  );
}
