/**
 * PROM コア（環境非依存）の型定義。
 * 元 prom-checker/index.html の宣言的レジストリ・スコアリングエンジン（設計書 第8章）を
 * TypeScript へ 1:1 移植するための型。DOM / Storage / 時刻に依存しない。
 */

/** 副作用のない関数の成功/失敗を表す Result 型（例外で握りつぶさない）。 */
export type Result<T> = { ok: true; value: T } | { ok: false; error: string };

export const ok = <T>(value: T): Result<T> => ({ ok: true, value });
export const err = (error: string): Result<never> => ({ ok: false, error });

/** 解釈バンドの重大度レベル（結果カードの配色に対応）。 */
export type BandLevel = "success" | "info" | "warn" | "danger";

export interface ResponseOption {
  label: string;
  value: number;
}

export interface Item {
  id: string;
  label: string;
}

export interface ContextItem {
  id: string;
  label: string;
  min: number;
  max: number;
}

export interface InterpretationBand {
  min: number;
  max: number;
  grade: string;
  label: string;
  level: BandLevel;
}

export interface Domain {
  id: string;
  label: string;
  items: number[];
  offset: number;
  divisor: number;
  mwpc: number;
}

/** 合計方式（HIT-6 / MIDAS）。 */
export interface SumScoring {
  method: "sum";
  reverseCoding?: boolean;
  range: [number, number];
  inputMax?: number;
}

/** ドメイン換算方式（MSQ v2.1）。 */
export interface DomainScoring {
  method: "domain-rescale";
  reverseCoding: boolean;
  domains: Domain[];
}

/** 単一順序尺度方式（PGIC）。 */
export interface OrdinalScoring {
  method: "single-ordinal";
  variant: "ascending" | "descending";
  favorableMin: number;
}

export type Scoring = SumScoring | DomainScoring | OrdinalScoring;

export interface License {
  holder: string;
  note: string;
  source: string;
}

export interface Mcid {
  note: string;
  improveDelta?: number;
}

/** 質問票 1 種の宣言的定義（=データ）。 */
export interface Instrument {
  id: string;
  version: string;
  title: string;
  fullName: string;
  summary: string;
  recallPeriod: string;
  recallLabel: string;
  reassessEvery?: string;
  reassessLabel?: string;
  reassessWeeks?: number[];
  inputType?: "days";
  items: Item[];
  contextItems?: ContextItem[];
  responseOptions?: ResponseOption[];
  scoring: Scoring;
  interpretationBands?: InterpretationBand[];
  mcid?: Mcid;
  license: License;
}

/**
 * スコアリングの出力。方式により埋まるフィールドが異なる（元実装の戻り値形状を踏襲）。
 * - sum: total / band / interpretation
 * - domain-rescale: domains / domainInterp / interpretation = "domain"
 * - single-ordinal: total / interpretation = "favorable" | "non-favorable"
 */
export interface ScoreValue {
  total?: number;
  domains?: Record<string, number>;
  domainInterp?: Record<string, string>;
  band?: InterpretationBand | null;
  interpretation: string;
}

export type MohLevel = "overuse" | "caution" | "safe";

export interface MohResult {
  level: MohLevel;
  threshold: number;
}

/** 疼痛強度の入力プリミティブ（採点尺度ではない）。 */
export interface PainScale {
  id: string;
  title: string;
  fullName: string;
  range: [number, number];
  mcid: string;
  license: License;
}

export interface SnoopGroup {
  code: string;
  name: string;
  check: string;
  concern: string;
}

export interface Snoop {
  id: string;
  title: string;
  groups: SnoopGroup[];
}

export interface DrugClassDef {
  label: string;
  threshold: number;
}

export interface Medication {
  name: string;
  class: string;
}

export interface ScheduleRow {
  id: string;
  title: string;
  recall: string;
  every: string;
  period: string;
}

/* ============================== 永続化・アプリ状態 ============================== */

export interface ReminderSettings {
  enabled: boolean;
}

export interface Settings {
  schemaVersion: string;
  hasCompletedSnoop: boolean;
  pgicVariant: "ascending" | "descending";
  scaleChoice: "nrs" | "vas";
  medicationList: Medication[];
  treatmentStartDate: string;
  reminders: ReminderSettings;
  theme: "auto" | "light" | "dark";
  /** インポート時にスキーマ版が異なった場合の移行元（マイグレーションの足場）。 */
  migratedFrom?: string;
}

export interface SnoopEntry {
  date: string;
  result: boolean;
  flags: string[];
}

export interface SnoopState {
  schemaVersion: string;
  history: SnoopEntry[];
}

export interface DiaryDrug {
  name: string;
  class: string;
  dose: string;
  time: string;
  effectNrs2h: number | null;
}

export interface DiaryEntry {
  id: string;
  createdAt: string;
  date: string;
  startTime: string;
  endTime: string;
  sides: string[];
  locations: string[];
  quality: string[];
  nrs: { onset: number | null; peak: number | null; post2h: number | null };
  symptoms: string[];
  aura: string[];
  prodrome: string[];
  drugs: DiaryDrug[];
  triggers: string[];
  sleep: { bedtime: string; waketime: string; quality: number | null; stress: number | null };
  impact: number | null;
}

export interface DiaryState {
  schemaVersion: string;
  entries: DiaryEntry[];
}

export interface ScoreRecord {
  date: string;
  createdAt: string;
  instrumentId: string;
  instrumentVersion: string;
  raw?: number[];
  total?: number;
  domains?: Record<string, number>;
  interpretation?: string;
  context?: Record<string, number>;
  /** NRS / VAS の記録値（疼痛強度）。 */
  value?: number;
}

export interface ScoresState {
  schemaVersion: string;
  records: ScoreRecord[];
}

/** エクスポート / インポートの JSON ペイロード（設計書 第7.2章）。 */
export interface ExportPayload {
  schemaVersion: string;
  exportDate: string;
  settings: Partial<Settings>;
  snoopHistory: SnoopEntry[];
  diary: DiaryEntry[];
  promScores: ScoreRecord[];
}

/** 同期や IndexedDB へ差し替え可能な永続化アダプタの契約（設計書 第8.3章）。 */
export interface StorageAdapter {
  load(key: string): Promise<unknown>;
  save(key: string, value: unknown): Promise<void>;
  exportAll(): Promise<string>;
  importAll(json: string): Promise<void>;
}

/** localStorage / sessionStorage 等が満たす最小インターフェース。 */
export interface StorageLike {
  getItem(key: string): string | null;
  setItem(key: string, value: string): void;
  removeItem(key: string): void;
}
