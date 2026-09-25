"use client";

import dynamic from "next/dynamic";
import type { Hotspot, MriSeries, StructureId } from "@/lib/anatomy/types";

/**
 * 重いクライアント専用ビューア（ModelViewer / MriSliceViewer）を遅延読込する境界。
 *
 * Server Component（app/anatomy/page.tsx）からは `ssr: false` 付きの
 * `next/dynamic` を直接呼べない（Next.js のビルド制約）ため、本クライアント
 * ラッパーで dynamic import を閉じ込め、初期バンドルを小さく保つ。
 * page.tsx はこのラッパーのみを参照する。
 */
const ModelViewer = dynamic(() => import("@/components/anatomy/ModelViewer"), {
  ssr: false,
  loading: () => <div className="anatomy-viewer-loading">3D ビューアを読み込み中…</div>,
});

const MriSliceViewer = dynamic(() => import("@/components/anatomy/MriSliceViewer"), {
  ssr: false,
  loading: () => <div className="anatomy-viewer-loading">MRI ビューアを読み込み中…</div>,
});

const AnatomyAtlas = dynamic(() => import("./AnatomyAtlas"), { ssr: false });
const AtlasSectionButton = dynamic(
  () => import("./AnatomyAtlas").then((module) => module.AtlasSectionButton),
  { ssr: false }
);

interface AnatomyViewersProps {
  structureId: StructureId;
  modelSrc: string | null;
  hotspots: Hotspot[];
  mri: MriSeries | null;
  title: string;
}

export function AnatomyViewers({
  structureId,
  modelSrc,
  hotspots,
  mri,
  title,
}: AnatomyViewersProps) {
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
          <AtlasSectionButton
            layers={
              structureId === "brain"
                ? ["brain", "brainstem"]
                : structureId === "bones"
                  ? ["skull", "cervical"]
                  : [structureId]
            }
          />
          <div className="anatomy-viewers">
            <ModelViewer src={modelSrc} hotspots={hotspots} title={title} />
            <MriSliceViewer mri={mri} title={title} />
          </div>
        </>
      )}
    </>
  );
}
