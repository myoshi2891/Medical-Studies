import { describe, expect, it } from "vitest";
import {
  DEFAULT_MEDS,
  DRUG_CLASS,
  PAIN_SCALES,
  PROM_IDS,
  REGISTRY,
  SCHEDULE,
  SNOOP4,
} from "./registry";

/**
 * 宣言的レジストリ（=データ）の契約テスト。
 * 元 prom-checker/index.html の定義数を固定し、移植時の欠落・重複を検出する。
 */

describe("REGISTRY: 収録尺度", () => {
  it("PROM は 4 種（hit6 / midas / msq-v2.1 / pgic）", () => {
    expect(PROM_IDS).toEqual(["hit6", "midas", "msq-v2.1", "pgic"]);
    for (const id of PROM_IDS) {
      expect(REGISTRY[id].id).toBe(id);
    }
  });

  it("HIT-6: 6 項目 / 5 選択肢 / 4 バンド", () => {
    expect(REGISTRY.hit6.items).toHaveLength(6);
    expect(REGISTRY.hit6.responseOptions).toHaveLength(5);
    expect(REGISTRY.hit6.interpretationBands).toHaveLength(4);
  });

  it("MIDAS: 5 項目 / 補足 2 項目 / 5 バンド / inputType=days", () => {
    expect(REGISTRY.midas.items).toHaveLength(5);
    expect(REGISTRY.midas.contextItems).toHaveLength(2);
    expect(REGISTRY.midas.interpretationBands).toHaveLength(5);
    expect(REGISTRY.midas.inputType).toBe("days");
  });

  it("MSQ v2.1: 14 項目 / 6 選択肢 / 3 ドメイン", () => {
    expect(REGISTRY["msq-v2.1"].items).toHaveLength(14);
    expect(REGISTRY["msq-v2.1"].responseOptions).toHaveLength(6);
    const scoring = REGISTRY["msq-v2.1"].scoring;
    expect(scoring.method).toBe("domain-rescale");
    if (scoring.method === "domain-rescale") {
      expect(scoring.domains).toHaveLength(3);
    }
  });

  it("PGIC: 1 項目 / 7 選択肢 / 昇順既定", () => {
    expect(REGISTRY.pgic.items).toHaveLength(1);
    expect(REGISTRY.pgic.responseOptions).toHaveLength(7);
    const scoring = REGISTRY.pgic.scoring;
    expect(scoring.method).toBe("single-ordinal");
    if (scoring.method === "single-ordinal") {
      expect(scoring.variant).toBe("ascending");
    }
  });

  it("権利確認状態: HIT-6 / MSQ v2.1 は restricted（F1 管理対象・質問文は非掲載）", () => {
    for (const id of ["hit6", "msq-v2.1"] as const) {
      const license = REGISTRY[id].license;
      expect(license.status).toBe("restricted");
      // 代替表示で公式取得先を案内するため URL が必須。
      expect(license.officialUrl).toMatch(/^https:\/\//);
    }
  });

  it("権利確認状態: F1 対象外の尺度には status を付けない（未評価と restricted を混同しない）", () => {
    expect(REGISTRY.midas.license.status).toBeUndefined();
    expect(REGISTRY.pgic.license.status).toBeUndefined();
  });
});

describe("補助レジストリ", () => {
  it("SNOOP4 は 6 グループ", () => {
    expect(SNOOP4.groups).toHaveLength(6);
  });

  it("DRUG_CLASS は 2 分類（閾値 10 / 15）", () => {
    expect(Object.keys(DRUG_CLASS)).toHaveLength(2);
    expect(DRUG_CLASS["triptan-ergot-opioid-combo"].threshold).toBe(10);
    expect(DRUG_CLASS["simple-nsaid"].threshold).toBe(15);
  });

  it("DEFAULT_MEDS は 7 件、PAIN_SCALES は nrs / vas、SCHEDULE は 5 行", () => {
    expect(DEFAULT_MEDS).toHaveLength(7);
    expect(Object.keys(PAIN_SCALES).sort()).toEqual(["nrs", "vas"]);
    expect(SCHEDULE).toHaveLength(5);
  });
});
