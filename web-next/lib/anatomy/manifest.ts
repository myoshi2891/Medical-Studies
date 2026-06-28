import { type AnatomyStructure, type MriSeries, validateManifest } from "./types";

/**
 * Phase 1 で curate した匿名化済み MRI シリーズ（public/mri/<series>/）。
 * 生成元は scripts/curate-mri.mjs、宣言の正本は public/mri/manifest.json。
 * 同一シリーズを複数構造から再利用する（設計書 §3 マッピング）。
 */
const BRAIN_SERIES: MriSeries = {
  id: "brain",
  bodyPart: "brain",
  slices: Array.from({ length: 8 }, (_, i) => `/mri/brain/${String(i + 1).padStart(2, "0")}.png`),
  note: "頭部 T2 軸位の代表スライス（教育用・正常解剖中心）",
};

const CERVICAL_SERIES: MriSeries = {
  id: "cervical",
  bodyPart: "cervical",
  slices: Array.from(
    { length: 8 },
    (_, i) => `/mri/cervical/${String(i + 1).padStart(2, "0")}.png`
  ),
  note: "頚椎 矢状断の代表スライス（教育用）",
};

/**
 * 頭痛 3D 解剖アトラスの宣言的 manifest（設計書 §3）。
 *
 * - modelSrc は public/models 配下の glTF を指す（Phase 2 で実モデル投入）。
 *   未投入でも ModelViewer はプレースホルダへ降格する。
 * - mri は Phase 1 で匿名化済みスライスを wiring 済み（脳=BRAIN_SERIES／頚椎=CERVICAL_SERIES）。
 * - links は web-next の内部ルート。一部は移行待ち（PROGRESS 参照）。
 */
const STRUCTURES: AnatomyStructure[] = [
  {
    id: "overview",
    title: "頭頚部の全体像",
    summary: "頭痛に関わる神経・血管・脳・骨・筋の位置関係を俯瞰します。",
    modelSrc: null,
    hotspots: [],
    mri: BRAIN_SERIES,
    links: [
      { label: "片頭痛 (Migraine)", href: "/headaches/migraine" },
      { label: "頸原性頭痛 (CEH)", href: "/headaches/cervicogenic-headache" },
    ],
  },
  {
    id: "nerves",
    title: "神経",
    summary: "大後頭神経(GON/C2)・三叉神経・頚神経叢など、頭痛の発生と伝達に関わる神経。",
    modelSrc: "/models/nerves.glb",
    hotspots: [
      {
        id: "gon",
        label: "大後頭神経 (GON / C2)",
        reading: "だいこうとうしんけい",
        plain: "後頭部の感覚を伝える神経",
        position: "0 0.2 0.1",
      },
      {
        id: "trigeminal",
        label: "三叉神経",
        reading: "さんさしんけい",
        plain: "顔の感覚を伝える神経",
        position: "0.1 0.4 0.1",
      },
    ],
    mri: CERVICAL_SERIES,
    links: [
      { label: "後頭神経ブロック (ONB)", href: "/blocks/occipital-nerve-block" },
      { label: "頸椎神経叢ブロック (CPB)", href: "/blocks/cervical-plexus-block" },
    ],
  },
  {
    id: "vessels",
    title: "血管",
    summary: "椎骨動脈・Willis 環・星状神経節周囲など、頭痛・自律神経に関わる血管系。",
    modelSrc: "/models/vessels.glb",
    hotspots: [
      {
        id: "vertebral-artery",
        label: "椎骨動脈",
        reading: "ついこつどうみゃく",
        plain: "首の骨を通って脳へ血液を送る動脈",
        position: "0 0.1 0.1",
      },
    ],
    mri: BRAIN_SERIES,
    links: [
      { label: "星状神経節ブロック (SGB)", href: "/blocks/stellate-ganglion-block" },
      { label: "片頭痛 (Migraine)", href: "/headaches/migraine" },
    ],
  },
  {
    id: "brain",
    title: "脳・脳幹",
    summary: "三叉頚椎複合体(TCC)・脳幹での痛覚収束など、頭痛の中枢メカニズム。",
    modelSrc: "/models/brain.glb",
    hotspots: [
      {
        id: "tcc",
        label: "三叉頚椎複合体 (TCC)",
        reading: "さんさけいついふくごうたい",
        plain: "首と頭の痛みが脳幹で合流する場所",
        position: "0 0.3 0",
      },
    ],
    mri: BRAIN_SERIES,
    links: [
      { label: "片頭痛 (Migraine)", href: "/headaches/migraine" },
      { label: "後頭神経ブロック (ONB)", href: "/blocks/occipital-nerve-block" },
    ],
  },
  {
    id: "bones",
    title: "骨・頚椎",
    summary: "C1-C2・後頭骨・椎間関節など、頸原性頭痛に関わる骨構造。",
    modelSrc: "/models/bones.glb",
    hotspots: [
      {
        id: "c1-c2",
        label: "環軸関節 (C1-C2)",
        reading: "かんじくかんせつ",
        plain: "首を回す動きの中心となる関節",
        position: "0 0.05 0.05",
      },
    ],
    mri: CERVICAL_SERIES,
    links: [
      { label: "頸原性頭痛 (CEH)", href: "/headaches/cervicogenic-headache" },
      { label: "頸椎神経叢ブロック (CPB)", href: "/blocks/cervical-plexus-block" },
    ],
  },
  {
    id: "muscles",
    title: "筋",
    summary: "後頭下筋群・僧帽筋・胸鎖乳突筋など、緊張型・頸原性頭痛に関わる筋。",
    modelSrc: "/models/muscles.glb",
    hotspots: [
      {
        id: "suboccipital",
        label: "後頭下筋群",
        reading: "こうとうかきんぐん",
        plain: "後頭部の深い位置にある小さな筋肉",
        position: "0 0.15 0.08",
      },
    ],
    mri: CERVICAL_SERIES,
    links: [
      { label: "緊張型頭痛 (TTH)", href: "/headaches/tension-type-headache" },
      {
        label: "頭痛に対する理学療法 (PT)",
        href: "/physical-therapy/physical-therapy-for-headache",
      },
    ],
  },
];

/** 起動時に検証済みの解剖アトラス manifest（不正なら例外で fail-fast）。 */
export const ANATOMY_MANIFEST: AnatomyStructure[] = validateManifest(STRUCTURES);

/**
 * id で解剖構造を取得する。
 *
 * @param id - 構造識別子（未知 id は undefined）。
 */
export function getStructure(id: string): AnatomyStructure | undefined {
  return ANATOMY_MANIFEST.find((s) => s.id === id);
}
