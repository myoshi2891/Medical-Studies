/**
 * ③b 永続化アダプタ（StorageAdapter インターフェース）。
 * 元 prom-checker/index.html の LocalStorageAdapter / migrateImport を TS 化（設計書 第8.3 / 8.4章）。
 * UI は具体実装を知らず StorageAdapter のみに依存（依存性逆転）。将来 IndexedDB / 同期へ差し替え可能。
 */
import type {
  DiaryEntry,
  ExportPayload,
  ScoreRecord,
  Settings,
  SnoopEntry,
  StorageAdapter,
  StorageLike,
} from "./types";

export const SCHEMA_VERSION = "1.0";

export const KEYS = {
  settings: "headache_prom_settings",
  snoop: "headache_prom_snoop",
  diary: "headache_prom_diary",
  scores: "headache_prom_scores",
} as const;

const isObject = (v: unknown): v is Record<string, unknown> => typeof v === "object" && v !== null;
const isStringValue = (v: unknown): v is string => typeof v === "string";
const asArray = <T>(v: unknown): T[] => (Array.isArray(v) ? (v as T[]) : []);
const messageOf = (e: unknown): string => (e instanceof Error ? e.message : String(e));

/** localStorage を StorageAdapter 契約へ適合させる実装。 */
export class LocalStorageAdapter implements StorageAdapter {
  private readonly storage: StorageLike;

  constructor(storage: StorageLike) {
    this.storage = storage;
  }

  load(key: string): Promise<unknown> {
    return new Promise((resolve, reject) => {
      try {
        const raw = this.storage.getItem(key);
        if (raw === null) {
          resolve(null);
          return;
        }
        resolve(JSON.parse(raw));
      } catch (e) {
        reject(new Error(`読み込みに失敗しました（${key}）: ${messageOf(e)}`));
      }
    });
  }

  save(key: string, value: unknown): Promise<void> {
    return new Promise((resolve, reject) => {
      try {
        this.storage.setItem(key, JSON.stringify(value));
        resolve();
      } catch (e) {
        reject(new Error(`保存に失敗しました（${key}）: ${messageOf(e)}`));
      }
    });
  }

  exportAll(): Promise<string> {
    return new Promise((resolve, reject) => {
      try {
        const settings = JSON.parse(this.storage.getItem(KEYS.settings) || "null");
        const snoop = JSON.parse(this.storage.getItem(KEYS.snoop) || "null");
        const diary = JSON.parse(this.storage.getItem(KEYS.diary) || "null");
        const scores = JSON.parse(this.storage.getItem(KEYS.scores) || "null");
        const payload: ExportPayload = {
          schemaVersion: SCHEMA_VERSION,
          exportDate: new Date().toISOString(),
          settings: isObject(settings) ? (settings as Partial<Settings>) : {},
          snoopHistory: isObject(snoop) ? asArray<SnoopEntry>(snoop.history) : [],
          diary: isObject(diary) ? asArray<DiaryEntry>(diary.entries) : [],
          promScores: isObject(scores) ? asArray<ScoreRecord>(scores.records) : [],
        };
        resolve(JSON.stringify(payload, null, 2));
      } catch (e) {
        reject(new Error(`エクスポートに失敗しました: ${messageOf(e)}`));
      }
    });
  }

  importAll(json: string): Promise<void> {
    return new Promise((resolve, reject) => {
      let data: unknown;
      try {
        data = JSON.parse(json);
      } catch (e) {
        reject(
          new Error(`JSON の解析に失敗しました（ファイル形式を確認してください）: ${messageOf(e)}`)
        );
        return;
      }
      if (!isObject(data)) {
        reject(new Error("インポートデータの形式が不正です"));
        return;
      }
      try {
        const migrated = migrateImport(data);
        this.storage.setItem(KEYS.settings, JSON.stringify(migrated.settings));
        this.storage.setItem(
          KEYS.snoop,
          JSON.stringify({ schemaVersion: SCHEMA_VERSION, history: migrated.snoopHistory })
        );
        this.storage.setItem(
          KEYS.diary,
          JSON.stringify({ schemaVersion: SCHEMA_VERSION, entries: migrated.diary })
        );
        this.storage.setItem(
          KEYS.scores,
          JSON.stringify({ schemaVersion: SCHEMA_VERSION, records: migrated.promScores })
        );
        resolve();
      } catch (e) {
        reject(new Error(`インポートの保存に失敗しました: ${messageOf(e)}`));
      }
    });
  }
}

interface MigratedData {
  settings: Partial<Settings>;
  snoopHistory: SnoopEntry[];
  diary: DiaryEntry[];
  promScores: ScoreRecord[];
}

/** スキーマ versioning: 後方互換マイグレーションの足場（設計書 第8.4章）。 */
export function migrateImport(data: Record<string, unknown>): MigratedData {
  const version = isStringValue(data.schemaVersion) ? data.schemaVersion : "0";
  const settings: Partial<Settings> = isObject(data.settings)
    ? (data.settings as Partial<Settings>)
    : {};
  const snoopHistory = asArray<SnoopEntry>(data.snoopHistory);
  const diary = asArray<DiaryEntry>(data.diary);
  const promScores = asArray<ScoreRecord>(data.promScores);
  // 現行は 1.0 のみ。将来の版差はここで段階的に変換する。
  if (version !== SCHEMA_VERSION) {
    settings.migratedFrom = version;
  }
  return { settings, snoopHistory, diary, promScores };
}
