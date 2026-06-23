import { beforeEach, describe, expect, it } from "vitest";
import { KEYS, LocalStorageAdapter, migrateImport, SCHEMA_VERSION } from "./storage";
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
    await adapter.save(KEYS.snoop, { schemaVersion: SCHEMA_VERSION, history: [{ date: "2026-06-01", result: false, flags: [] }] });
    await adapter.save(KEYS.diary, { schemaVersion: SCHEMA_VERSION, entries: [{ id: "d1" }] });
    await adapter.save(KEYS.scores, { schemaVersion: SCHEMA_VERSION, records: [{ instrumentId: "hit6" }] });

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

    const snoop = await adapter.load(KEYS.snoop);
    const scores = await adapter.load(KEYS.scores);
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
