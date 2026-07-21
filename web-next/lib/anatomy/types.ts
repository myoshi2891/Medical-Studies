/**
 * 頭痛 3D 解剖アトラス（/anatomy）の manifest 型と検証。
 * 設計書: docs/architecture.md §5。`any` を使わず unknown + 型ガードで絞り込む。
 */

/** 解剖構造の識別子（設計書 §3 コンテンツ・マッピング）。 */
export type StructureId = "overview" | "nerves" | "vessels" | "brain" | "bones" | "muscles";

const STRUCTURE_IDS: readonly StructureId[] = [
  "overview",
  "nerves",
  "vessels",
  "brain",
  "bones",
  "muscles",
];

/** 3D モデル上の注釈ホットスポット。 */
export interface Hotspot {
  /** 一意キー。 */
  id: string;
  /** 専門名（例: 大後頭神経 GON）。 */
  label: string;
  /** 読み仮名（ふりがな・ひらがな。任意。ツールチップに表示）。 */
  reading?: string;
  /** やさしい言い換え（v1.2 Translation Engine の転用）。 */
  plain: string;
  /** model-viewer の data-position 形式 "x y z"。 */
  position: string;
}

/** 利用許諾の状態: own=自己保有 / granted=許諾取得済 / unverified=未確認 / denied=許諾なし。 */
export type MriPermission = "own" | "granted" | "unverified" | "denied";

const MRI_PERMISSIONS: readonly MriPermission[] = ["own", "granted", "unverified", "denied"];

/** MRI シリーズの出典・権利状態（監査所見 F3）。permission が own / granted 以外は公開可否未確定。 */
export interface MriProvenance {
  /** 元データの取得元（施設名・データセット名等）。未確認は "unverified"。 */
  source: string;
  /** 著作権者。未確認は "unverified"。 */
  copyrightHolder: string;
  /** 利用許諾の状態。 */
  permission: MriPermission;
  /** 適用ライセンス（該当時のみ）。 */
  license?: string;
  /** 帰属表示文（必要な場合のみ）。 */
  attribution?: string;
  /** 確認日（ISO 8601）。未確認時は省略。 */
  verifiedAt?: string;
}

/** 構造に対応する MRI シリーズ（既存 PNG・匿名化済み）。 */
export interface MriSeries {
  id: string;
  bodyPart: "brain" | "cervical";
  /** public/mri 配下のスライス相対パス（順序＝スクラブ順）。 */
  slices: string[];
  note?: string;
  /** 出典・権利状態（F3）。未記入シリーズは公開可否が未確定。 */
  provenance?: MriProvenance;
}

/** md 教育ページへのリンク。 */
export interface MdLink {
  label: string;
  /** 内部ルート（/...）またはアンカー（#...）。 */
  href: string;
}

/** 解剖構造 1 件。 */
export interface AnatomyStructure {
  id: StructureId;
  title: string;
  summary: string;
  /** glTF/GLB の公開パス。未投入時は null。 */
  modelSrc: string | null;
  hotspots: Hotspot[];
  mri: MriSeries | null;
  links: MdLink[];
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function isNonEmptyString(value: unknown): value is string {
  return typeof value === "string" && value.length > 0;
}

function isStructureId(value: unknown): value is StructureId {
  return typeof value === "string" && (STRUCTURE_IDS as readonly string[]).includes(value);
}

function assertHotspot(value: unknown, ctx: string): Hotspot {
  if (!isRecord(value)) throw new Error(`${ctx}: hotspot がオブジェクトではありません`);
  const { id, label, reading, plain, position } = value;
  if (!isNonEmptyString(id)) throw new Error(`${ctx}: hotspot.id が不正です`);
  if (!isNonEmptyString(label)) throw new Error(`${ctx}: hotspot.label が不正です`);
  if (!isNonEmptyString(plain)) throw new Error(`${ctx}: hotspot.plain が不正です`);
  if (!isNonEmptyString(position)) throw new Error(`${ctx}: hotspot.position が不正です`);
  const result: Hotspot = { id, label, plain, position };
  // reading は任意。存在する場合のみ検証して付与する。
  if (reading !== undefined) {
    if (!isNonEmptyString(reading)) throw new Error(`${ctx}: hotspot.reading が不正です`);
    result.reading = reading;
  }
  return result;
}

/**
 * Validates and constructs an internal Markdown link.
 *
 * @param value - The value to validate as a link
 * @param ctx - Context included in validation error messages
 * @returns A validated link with its label and internal or anchor href
 * @throws Error if the value is invalid or the href does not start with `/` or `#`
 */
function assertMdLink(value: unknown, ctx: string): MdLink {
  if (!isRecord(value)) throw new Error(`${ctx}: link がオブジェクトではありません`);
  const { label, href } = value;
  if (!isNonEmptyString(label)) throw new Error(`${ctx}: link.label が不正です`);
  if (!isNonEmptyString(href)) throw new Error(`${ctx}: link.href が不正です`);
  // 内部ルート（/...）またはアンカー（#...）のみ許可。<a href> へ渡す前に弾く。
  if (!href.startsWith("/") && !href.startsWith("#")) {
    throw new Error(`${ctx}: link.href は / または # 始まりである必要があります`);
  }
  return { label, href };
}

/**
 * Determines whether a value is a valid MRI permission.
 *
 * @param value - The value to check
 * @returns `true` if the value is an allowed MRI permission, `false` otherwise.
 */
function isMriPermission(value: unknown): value is MriPermission {
  return typeof value === "string" && (MRI_PERMISSIONS as readonly string[]).includes(value);
}

/**
 * Validates MRI provenance metadata and returns its normalized representation.
 *
 * @param value - The provenance metadata to validate
 * @param ctx - Context used to identify validation errors
 * @returns The validated MRI provenance metadata
 * @throws Error if the value or any required or present optional field is invalid
 */
function assertProvenance(value: unknown, ctx: string): MriProvenance {
  if (!isRecord(value)) throw new Error(`${ctx}: provenance がオブジェクトではありません`);
  const { source, copyrightHolder, permission, license, attribution, verifiedAt } = value;
  if (!isNonEmptyString(source)) throw new Error(`${ctx}: provenance.source が不正です`);
  if (!isNonEmptyString(copyrightHolder)) {
    throw new Error(`${ctx}: provenance.copyrightHolder が不正です`);
  }
  if (!isMriPermission(permission)) {
    throw new Error(`${ctx}: provenance.permission が不正です`);
  }
  const result: MriProvenance = { source, copyrightHolder, permission };
  // license / attribution / verifiedAt は任意。存在する場合のみ検証して付与する。
  if (license !== undefined) {
    if (!isNonEmptyString(license)) throw new Error(`${ctx}: provenance.license が不正です`);
    result.license = license;
  }
  if (attribution !== undefined) {
    if (!isNonEmptyString(attribution)) {
      throw new Error(`${ctx}: provenance.attribution が不正です`);
    }
    result.attribution = attribution;
  }
  if (verifiedAt !== undefined) {
    if (!isNonEmptyString(verifiedAt)) throw new Error(`${ctx}: provenance.verifiedAt が不正です`);
    result.verifiedAt = verifiedAt;
  }
  return result;
}

/**
 * Validates an MRI series manifest entry.
 *
 * @param value - The value to validate, or `null` when no MRI series is available
 * @param ctx - Context included in validation error messages
 * @returns A validated MRI series, or `null` when `value` is `null`
 * @throws Error If the value or any MRI field is invalid
 */
function assertMri(value: unknown, ctx: string): MriSeries | null {
  if (value === null) return null;
  if (!isRecord(value)) throw new Error(`${ctx}: mri が不正です`);
  const { id, bodyPart, slices, note, provenance } = value;
  if (!isNonEmptyString(id)) throw new Error(`${ctx}: mri.id が不正です`);
  if (bodyPart !== "brain" && bodyPart !== "cervical") {
    throw new Error(`${ctx}: mri.bodyPart が不正です`);
  }
  if (!Array.isArray(slices) || !slices.every(isNonEmptyString)) {
    throw new Error(`${ctx}: mri.slices が不正です`);
  }
  const result: MriSeries = { id, bodyPart, slices };
  if (note !== undefined) {
    if (!isNonEmptyString(note)) throw new Error(`${ctx}: mri.note が不正です`);
    result.note = note;
  }
  // provenance は任意。存在する場合のみ検証して付与する（F3）。
  if (provenance !== undefined) {
    result.provenance = assertProvenance(provenance, `${ctx}.mri`);
  }
  return result;
}

/**
 * Validates and constructs an anatomy structure from an unknown value.
 *
 * @param value - The value to validate as an anatomy structure
 * @param index - The structure's position in the manifest, used in validation errors
 * @returns The validated anatomy structure
 * @throws Error if the value or any required field is invalid
 */
function assertStructure(value: unknown, index: number): AnatomyStructure {
  const ctx = `structure[${index}]`;
  if (!isRecord(value)) throw new Error(`${ctx}: オブジェクトではありません`);
  const { id, title, summary, modelSrc, hotspots, mri, links } = value;
  if (!isStructureId(id)) throw new Error(`${ctx}: id が未知です`);
  if (!isNonEmptyString(title)) throw new Error(`${ctx}: title が不正です`);
  if (!isNonEmptyString(summary)) throw new Error(`${ctx}: summary が不正です`);
  if (modelSrc !== null && !isNonEmptyString(modelSrc)) {
    throw new Error(`${ctx}: modelSrc が不正です`);
  }
  if (!Array.isArray(hotspots)) throw new Error(`${ctx}: hotspots が配列ではありません`);
  if (!Array.isArray(links) || links.length === 0) {
    throw new Error(`${ctx}: links が空です`);
  }
  return {
    id,
    title,
    summary,
    modelSrc,
    hotspots: hotspots.map((h, i) => assertHotspot(h, `${ctx}.hotspot[${i}]`)),
    mri: assertMri(mri, ctx),
    links: links.map((l, i) => assertMdLink(l, `${ctx}.link[${i}]`)),
  };
}

/**
 * manifest データを検証し AnatomyStructure[] へ絞り込む。
 * 不正時は理由付き Error を投げる（握りつぶさない）。
 *
 * @param data - 検証対象（信頼できない unknown）。
 * @returns 検証済みの解剖構造配列（最低 1 件）。
 */
export function validateManifest(data: unknown): AnatomyStructure[] {
  if (!Array.isArray(data)) throw new Error("manifest は配列である必要があります");
  if (data.length === 0) throw new Error("manifest は最低1構造を含む必要があります");
  return data.map((s, i) => assertStructure(s, i));
}
