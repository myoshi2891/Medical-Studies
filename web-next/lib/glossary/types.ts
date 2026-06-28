/**
 * 専門用語の用語集（glossary）の型と検証。
 * 設計: docs/architecture.md §10 Phase 3「やさしい言い換え」をツールチップ化する基盤。
 * lib/anatomy/types.ts と同型に、`any` を使わず unknown + 型ガードで絞り込む（不正データは起動時に例外）。
 */

/** 用語集の 1 エントリ。 */
export interface GlossaryTerm {
  /** kebab-case の一意キー（例: "gon", "cgrp", "trigeminal-nerve"）。 */
  id: string;
  /** 専門用語の表記（例: "大後頭神経"）。 */
  term: string;
  /** 読み仮名（ふりがな・ひらがな。例: "だいこうとうしんけい"）。 */
  reading: string;
  /** 高校生レベルのやさしい解説（1〜2 文）。 */
  plain: string;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function isNonEmptyString(value: unknown): value is string {
  return typeof value === "string" && value.length > 0;
}

function assertTerm(value: unknown, ctx: string): GlossaryTerm {
  if (!isRecord(value)) throw new Error(`${ctx}: term がオブジェクトではありません`);
  const { id, term, reading, plain } = value;
  if (!isNonEmptyString(id)) throw new Error(`${ctx}: term.id が不正です`);
  if (!isNonEmptyString(term)) throw new Error(`${ctx}: term.term が不正です`);
  if (!isNonEmptyString(reading)) throw new Error(`${ctx}: term.reading が不正です`);
  if (!isNonEmptyString(plain)) throw new Error(`${ctx}: term.plain が不正です`);
  return { id, term, reading, plain };
}

/**
 * 用語集データを検証し GlossaryTerm[] へ絞り込む。
 * 不正時・id 重複時は理由付き Error を投げる（握りつぶさない）。
 *
 * @param data - 検証対象（信頼できない unknown）。
 * @returns 検証済みの用語配列（最低 1 件）。
 */
export function validateGlossary(data: unknown): GlossaryTerm[] {
  if (!Array.isArray(data)) throw new Error("glossary は配列である必要があります");
  if (data.length === 0) throw new Error("glossary は最低1語を含む必要があります");
  const terms = data.map((t, i) => assertTerm(t, `glossary[${i}]`));
  const seen = new Set<string>();
  for (const t of terms) {
    if (seen.has(t.id)) throw new Error(`glossary: id "${t.id}" が重複しています`);
    seen.add(t.id);
  }
  return terms;
}
