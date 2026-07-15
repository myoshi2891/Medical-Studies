import { type AnatomyStructure, type MriSeries, validateManifest } from "./types";

/**
 * Phase 1 で curate した匿名化済み MRI シリーズ（public/mri/<series>/）。
 * 生成元は scripts/curate-mri.mjs、宣言の正本は public/mri/manifest.json。
 * 同一シリーズを複数構造から再利用する（設計書 §3 マッピング）。
 */
/** 本リポジトリの MRI は開発者本人保有（本人撮影分）。帰属表示・ライセンス指定は不要（F3）。 */
const OWN_PROVENANCE = {
  source: "自己保有（本人撮影分）",
  copyrightHolder: "リポジトリ管理者（本人保有）",
  permission: "own",
  verifiedAt: "2026-07-15",
} as const;

const BRAIN_SERIES: MriSeries = {
  id: "brain",
  bodyPart: "brain",
  slices: Array.from({ length: 8 }, (_, i) => `/mri/brain/${String(i + 1).padStart(2, "0")}.png`),
  note: "頭部 T2 軸位の代表スライス（教育用・正常解剖中心）",
  provenance: OWN_PROVENANCE,
};

const CERVICAL_SERIES: MriSeries = {
  id: "cervical",
  bodyPart: "cervical",
  slices: Array.from(
    { length: 8 },
    (_, i) => `/mri/cervical/${String(i + 1).padStart(2, "0")}.png`
  ),
  note: "頚椎 矢状断の代表スライス（教育用）",
  provenance: OWN_PROVENANCE,
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
    summary:
      "眼神経(三叉神経第1枝 V1)・眼窩上神経など、前頭部痛に関わる三叉神経第1枝系。" +
      "※三叉神経本幹・大後頭神経(GON)は元データ(BodyParts3D)に含まれないため、V1 系で代替表示。",
    modelSrc: "/models/nerves.glb",
    hotspots: [
      {
        id: "ophthalmic",
        label: "眼神経 (三叉神経第1枝 V1)",
        reading: "がんしんけい",
        plain: "顔の感覚を伝える三叉神経の第1枝（本幹はこのモデルには含まれません）",
        // glb_report.json の Left/Right ophthalmic nerve 中心の正中平均（モデル空間・メートル）。
        position: "0 -0.008 -0.02",
      },
      {
        id: "supraorbital",
        label: "眼窩上神経",
        reading: "がんかじょうしんけい",
        plain: "額の感覚を伝える神経。神経ブロックの標的",
        position: "0 0.017 0.03",
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
        // glb_report.json の Left/Right vertebral artery 中心の正中平均。
        position: "0 -0.012 0.017",
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
        // 延髄(medulla oblongata)の中心＝TCC の座（glb_report.json）。
        position: "0 -0.03 0.007",
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
        // Atlas(C1)と Axis(C2)の中心の中点（glb_report.json）。
        position: "0 -0.037 -0.017",
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
        // 大後頭直筋・下頭斜筋の中心付近（glb_report.json の正中平均）。
        position: "0 0.18 -0.02",
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
