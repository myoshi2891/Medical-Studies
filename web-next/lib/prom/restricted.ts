/**
 * 著作権保護 PROM 質問文のローカル専用オーバーレイ（純粋関数）。
 *
 * 公開レジストリ（registry.ts）は中立プレースホルダのみを持つ。実文言は git 管理外の
 * オーバーレイ JSON（public/prom-restricted.local.json）に置き、ローカル開発時のみ注入する。
 * ここは I/O を持たない純粋関数だけを提供し、読み込みは restricted-loader.ts が担う。
 *
 * 不変条件: items / responseOptions の **件数・id・value は絶対に変えない**。
 * 差し替えるのは label のみ。件数が食い違うオーバーレイは黙って捨て、レジストリの
 * プレースホルダへフォールバックする（著作物の漏洩ではなく表示崩れ側に倒す）。
 */
import { err, type Instrument, ok, type Result } from "./types";

/** 1 尺度分のオーバーレイ。ラベル文字列のみを順序どおりに保持する。 */
export interface InstrumentOverlay {
  items: string[];
  responseOptions?: string[];
}

/** 尺度 id → オーバーレイ。 */
export type RestrictedOverlay = Record<string, InstrumentOverlay>;

const isObject = (v: unknown): v is Record<string, unknown> =>
  typeof v === "object" && v !== null && !Array.isArray(v);

const isStringArray = (v: unknown): v is string[] =>
  Array.isArray(v) && v.every((s) => typeof s === "string");

/** 尺度が権利ゲートの対象か（質問文を公開レジストリに持たない尺度か）。 */
export const isRestricted = (def: Instrument): boolean => def.license.status === "restricted";

/**
 * 未知の入力（JSON.parse の結果など）をオーバーレイへ絞り込む。
 * `__` 始まりのキーは人間向け注釈として無視する。
 */
export function parseRestrictedOverlay(input: unknown): Result<RestrictedOverlay> {
  if (!isObject(input)) {
    return err("オーバーレイはオブジェクトである必要があります");
  }

  const overlay: RestrictedOverlay = {};
  for (const [id, raw] of Object.entries(input)) {
    if (id.startsWith("__")) continue; // 注釈キー
    if (!isObject(raw)) {
      return err(`オーバーレイの ${id} はオブジェクトである必要があります`);
    }
    if (!isStringArray(raw.items)) {
      return err(`オーバーレイの ${id}.items は文字列配列である必要があります`);
    }

    const entry: InstrumentOverlay = { items: raw.items };
    if (raw.responseOptions !== undefined) {
      if (!isStringArray(raw.responseOptions)) {
        return err(`オーバーレイの ${id}.responseOptions は文字列配列である必要があります`);
      }
      entry.responseOptions = raw.responseOptions;
    }
    overlay[id] = entry;
  }

  return ok(overlay);
}

/**
 * オーバーレイのラベルを尺度定義へ適用した**新しい** Instrument を返す。
 * 該当エントリが無い／件数が合わない場合は元の定義をそのまま返す（フェイルセーフ）。
 */
export function applyRestrictedOverlay(
  def: Instrument,
  overlay: RestrictedOverlay | null
): Instrument {
  const entry = overlay?.[def.id];
  if (!entry) return def;
  // 件数不一致は「別バージョンの質問票」を意味しうる。採点との整合が保証できないため適用しない。
  if (entry.items.length !== def.items.length) return def;

  const merged: Instrument = {
    ...def,
    items: def.items.map((item, i) => ({ ...item, label: entry.items[i] })),
  };

  const options = entry.responseOptions;
  if (options && def.responseOptions && options.length === def.responseOptions.length) {
    merged.responseOptions = def.responseOptions.map((opt, i) => ({ ...opt, label: options[i] }));
  }

  return merged;
}
