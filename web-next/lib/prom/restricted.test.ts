/**
 * 著作権保護 PROM 質問文のローカル専用オーバーレイの契約テスト。
 *
 * 公開レジストリは中立プレースホルダのみを持ち、実文言は git 管理外の
 * オーバーレイ JSON から注入される。オーバーレイが無い／壊れている場合は
 * 必ず「レジストリのまま（＝プレースホルダ表示）」へフォールバックすること
 * （＝著作物が漏れないだけでなく、アプリも壊れない）を固定する。AAA パターン。
 */
import { describe, expect, it } from "vitest";
import { REGISTRY } from "./registry";
import { applyRestrictedOverlay, isRestricted, parseRestrictedOverlay } from "./restricted";
import type { Instrument } from "./types";

/** テスト用の最小 instrument（2 項目 / 2 選択肢）。 */
function buildInstrument(): Instrument {
  return {
    id: "test",
    version: "1.0",
    title: "TEST",
    fullName: "Test Instrument",
    summary: "テスト用",
    recallPeriod: "P4W",
    recallLabel: "過去4週間",
    items: [
      { id: "q1", label: "設問1（非掲載）" },
      { id: "q2", label: "設問2（非掲載）" },
    ],
    responseOptions: [
      { label: "選択肢1", value: 1 },
      { label: "選択肢2", value: 2 },
    ],
    scoring: { method: "sum", range: [0, 4] },
    license: {
      holder: "権利者",
      note: "要許諾",
      source: "出典",
      status: "restricted",
      officialUrl: "https://example.com/",
    },
  };
}

describe("parseRestrictedOverlay: 未知の入力を型ガードで絞り込む", () => {
  it("正しい形の入力を ok で返す", () => {
    // Arrange
    const input: unknown = {
      hit6: {
        items: ["実文言1", "実文言2"],
        responseOptions: ["実選択肢1"],
      },
    };

    // Act
    const result = parseRestrictedOverlay(input);

    // Assert
    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.value.hit6?.items).toEqual(["実文言1", "実文言2"]);
      expect(result.value.hit6?.responseOptions).toEqual(["実選択肢1"]);
    }
  });

  it("responseOptions は省略できる（items のみのオーバーレイ）", () => {
    const result = parseRestrictedOverlay({ hit6: { items: ["実文言1"] } });

    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.value.hit6?.responseOptions).toBeUndefined();
    }
  });

  it("アンダースコア始まりのキー（__note 等）は注釈として無視する", () => {
    const result = parseRestrictedOverlay({
      __note: "このファイルの入手方法",
      hit6: { items: ["実文言1"] },
    });

    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(Object.keys(result.value)).toEqual(["hit6"]);
    }
  });

  it("オブジェクトでない入力は err", () => {
    expect(parseRestrictedOverlay(null).ok).toBe(false);
    expect(parseRestrictedOverlay("文字列").ok).toBe(false);
    expect(parseRestrictedOverlay([1, 2]).ok).toBe(false);
  });

  it("items が文字列配列でない場合は err（型不一致を握りつぶさない）", () => {
    expect(parseRestrictedOverlay({ hit6: { items: [1, 2] } }).ok).toBe(false);
    expect(parseRestrictedOverlay({ hit6: { items: "実文言" } }).ok).toBe(false);
    expect(parseRestrictedOverlay({ hit6: {} }).ok).toBe(false);
  });
});

describe("applyRestrictedOverlay: 件数と id を保ったままラベルだけ差し替える", () => {
  it("件数が一致するとき items / responseOptions のラベルを差し替える", () => {
    // Arrange
    const def = buildInstrument();
    const overlay = {
      test: { items: ["実文言1", "実文言2"], responseOptions: ["実選択肢1", "実選択肢2"] },
    };

    // Act
    const merged = applyRestrictedOverlay(def, overlay);

    // Assert
    expect(merged.items.map((i) => i.label)).toEqual(["実文言1", "実文言2"]);
    // id と value は不変（スコアリング・保存済みデータとの互換）。
    expect(merged.items.map((i) => i.id)).toEqual(["q1", "q2"]);
    expect(merged.responseOptions?.map((o) => o.label)).toEqual(["実選択肢1", "実選択肢2"]);
    expect(merged.responseOptions?.map((o) => o.value)).toEqual([1, 2]);
  });

  it("元の instrument を破壊しない（イミュータブル）", () => {
    const def = buildInstrument();

    applyRestrictedOverlay(def, { test: { items: ["実文言1", "実文言2"] } });

    expect(def.items[0].label).toBe("設問1（非掲載）");
  });

  it("items の件数が一致しない場合は差し替えず元の定義を返す（フェイルセーフ）", () => {
    const def = buildInstrument();

    const merged = applyRestrictedOverlay(def, { test: { items: ["実文言1"] } });

    expect(merged.items.map((i) => i.label)).toEqual(["設問1（非掲載）", "設問2（非掲載）"]);
  });

  it("responseOptions の件数だけ不一致なら items のみ差し替える", () => {
    const def = buildInstrument();

    const merged = applyRestrictedOverlay(def, {
      test: { items: ["実文言1", "実文言2"], responseOptions: ["実選択肢1"] },
    });

    expect(merged.items.map((i) => i.label)).toEqual(["実文言1", "実文言2"]);
    expect(merged.responseOptions?.map((o) => o.label)).toEqual(["選択肢1", "選択肢2"]);
  });

  it("オーバーレイが null / 当該尺度のエントリ無しなら元の定義を返す", () => {
    const def = buildInstrument();

    expect(applyRestrictedOverlay(def, null).items[0].label).toBe("設問1（非掲載）");
    expect(applyRestrictedOverlay(def, { hit6: { items: ["x"] } }).items[0].label).toBe(
      "設問1（非掲載）"
    );
  });
});

describe("isRestricted: 権利ゲートの判定", () => {
  it("license.status が restricted の尺度のみ true", () => {
    expect(isRestricted(REGISTRY.hit6)).toBe(true);
    expect(isRestricted(REGISTRY["msq-v2.1"])).toBe(true);
    expect(isRestricted(REGISTRY.midas)).toBe(false);
    expect(isRestricted(REGISTRY.pgic)).toBe(false);
  });
});
