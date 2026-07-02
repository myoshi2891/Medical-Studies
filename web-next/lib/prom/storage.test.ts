import { beforeEach, describe, expect, it } from "vitest";
import {
  KEYS,
  LocalStorageAdapter,
  migrateImport,
  normalizeSyncTargets,
  SCHEMA_VERSION,
} from "./storage";
import type { StorageLike } from "./types";

/**
 * 永続化アダプタ（StorageAdapter）の契約テスト。
 * 元 index.html の LocalStorageAdapter / migrateImport を TS 化したものを検証。
 * 依存性逆転のため、テストはインメモリの Storage モックを注入する。
 */

function createMemoryStorage(): StorageLike & { dump: Record<string, string> } {
  const dump: Record<string, string> = {};
  return {
    dump,
    getItem: (k) => (k in dump ? dump[k] : null),
    setItem: (k, v) => {
      dump[k] = v;
    },
    removeItem: (k) => {
      delete dump[k];
    },
  };
}

describe("LocalStorageAdapter: load / save", () => {
  let mem: ReturnType<typeof createMemoryStorage>;
  let adapter: LocalStorageAdapter;

  beforeEach(() => {
    mem = createMemoryStorage();
    adapter = new LocalStorageAdapter(mem);
  });

  it("存在しないキーは null を返す", async () => {
    expect(await adapter.load("missing")).toBeNull();
  });

  it("save した値を load で往復できる", async () => {
    await adapter.save(KEYS.settings, { theme: "dark" });
    expect(await adapter.load(KEYS.settings)).toEqual({ theme: "dark" });
  });

  it("壊れた JSON の load は reject する", async () => {
    mem.dump[KEYS.diary] = "{not json";
    await expect(adapter.load(KEYS.diary)).rejects.toThrow();
  });
});

describe("LocalStorageAdapter: exportAll / importAll", () => {
  let mem: ReturnType<typeof createMemoryStorage>;
  let adapter: LocalStorageAdapter;

  beforeEach(() => {
    mem = createMemoryStorage();
    adapter = new LocalStorageAdapter(mem);
  });

  it("4 つのキーを schemaVersion 付きペイロードへ集約する", async () => {
    await adapter.save(KEYS.settings, { theme: "light" });
    await adapter.save(KEYS.snoop, {
      schemaVersion: SCHEMA_VERSION,
      history: [{ date: "2026-06-01", result: false, flags: [] }],
    });
    await adapter.save(KEYS.diary, { schemaVersion: SCHEMA_VERSION, entries: [{ id: "d1" }] });
    await adapter.save(KEYS.scores, {
      schemaVersion: SCHEMA_VERSION,
      records: [{ instrumentId: "hit6" }],
    });

    const json = await adapter.exportAll();
    const payload = JSON.parse(json);
    expect(payload.schemaVersion).toBe(SCHEMA_VERSION);
    expect(typeof payload.exportDate).toBe("string");
    expect(payload.snoopHistory).toHaveLength(1);
    expect(payload.diary).toHaveLength(1);
    expect(payload.promScores).toHaveLength(1);
  });

  it("importAll はペイロードを 4 キーへ復元する", async () => {
    const payload = {
      schemaVersion: SCHEMA_VERSION,
      settings: { theme: "dark" },
      snoopHistory: [{ date: "2026-06-02", result: true, flags: ["突然の発症"] }],
      diary: [{ id: "d9" }],
      promScores: [{ instrumentId: "midas" }],
    };
    await adapter.importAll(JSON.stringify(payload));

    const settings = await adapter.load(KEYS.settings);
    const snoop = await adapter.load(KEYS.snoop);
    const scores = await adapter.load(KEYS.scores);
    expect(settings).toMatchObject({ schemaVersion: SCHEMA_VERSION, theme: "dark" });
    expect(snoop).toMatchObject({ history: [{ result: true }] });
    expect(scores).toMatchObject({ records: [{ instrumentId: "midas" }] });
  });

  it("不正な JSON の importAll は reject する", async () => {
    await expect(adapter.importAll("{broken")).rejects.toThrow();
  });

  it("オブジェクトでないペイロードは reject する", async () => {
    await expect(adapter.importAll("42")).rejects.toThrow();
  });
});

describe("migrateImport", () => {
  it("schemaVersion 不一致のとき settings.migratedFrom を付与する", () => {
    const migrated = migrateImport({ schemaVersion: "0", settings: {} });
    expect(migrated.settings.migratedFrom).toBe("0");
  });

  it("現行版なら migratedFrom は付かない", () => {
    const migrated = migrateImport({ schemaVersion: SCHEMA_VERSION, settings: {} });
    expect(migrated.settings.migratedFrom).toBeUndefined();
  });

  it("欠損フィールドは空配列・空オブジェクトで補完する", () => {
    const migrated = migrateImport({});
    expect(migrated.snoopHistory).toEqual([]);
    expect(migrated.diary).toEqual([]);
    expect(migrated.promScores).toEqual([]);
    expect(migrated.settings).toBeTypeOf("object");
  });
});

describe("normalizeSyncTargets", () => {
  it("未定義は undefined を返す（未定義許容）", () => {
    expect(normalizeSyncTargets(undefined)).toBeUndefined();
  });

  it("spreadsheetId が無い場合は undefined を返す", () => {
    expect(normalizeSyncTargets({ googleSheets: {} })).toBeUndefined();
  });

  it("spreadsheetId と lastSyncedAt のみ抽出し、混入したトークンは保存しない", () => {
    // Arrange（accessToken は本来アプリが保存しないが、混入しても落とすことを検証）
    const raw = {
      googleSheets: { spreadsheetId: "SS1", lastSyncedAt: "2026-07-02", accessToken: "SECRET" },
    };
    // Act
    const out = normalizeSyncTargets(raw);
    // Assert
    expect(out).toEqual({ googleSheets: { spreadsheetId: "SS1", lastSyncedAt: "2026-07-02" } });
    expect(JSON.stringify(out)).not.toContain("SECRET");
  });

  it("lastSyncedAt 欠損は空文字で補完する", () => {
    const out = normalizeSyncTargets({ googleSheets: { spreadsheetId: "SS2" } });
    expect(out).toEqual({ googleSheets: { spreadsheetId: "SS2", lastSyncedAt: "" } });
  });
});

describe("migrateImport: syncTargets", () => {
  it("インポート settings の syncTargets を正規化しトークンを落とす", () => {
    const migrated = migrateImport({
      schemaVersion: SCHEMA_VERSION,
      settings: {
        syncTargets: {
          googleSheets: { spreadsheetId: "IMP1", lastSyncedAt: "2026-07-01", accessToken: "TOK" },
        },
      },
    });
    expect(migrated.settings.syncTargets).toEqual({
      googleSheets: { spreadsheetId: "IMP1", lastSyncedAt: "2026-07-01" },
    });
    expect(JSON.stringify(migrated.settings)).not.toContain("TOK");
  });

  it("syncTargets が無いインポートは syncTargets 未設定のまま", () => {
    const migrated = migrateImport({ schemaVersion: SCHEMA_VERSION, settings: {} });
    expect(migrated.settings.syncTargets).toBeUndefined();
  });
});
