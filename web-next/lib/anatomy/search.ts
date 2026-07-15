/**
 * 頭痛 3D 解剖アトラス（/anatomy）の検索コア。
 *
 * `ANATOMY_MANIFEST` を索引源に、構造名・概要・ホットスポット（専門名/読み仮名/やさしい言い換え）・
 * 教育リンク名を横断照合する純粋関数。DOM やイベントに依存しないため単体テストが容易
 * （設計書 §5 / promp.md ②）。UI（AnatomySearch）はこのコアを呼ぶだけの薄い層とする。
 */

import { ANATOMY_MANIFEST } from "./manifest";
import type { StructureId } from "./types";

/** 検索ヒットの種別。 */
export type SearchHitKind = "structure" | "hotspot" | "link";

/** 検索結果 1 件。 */
export interface SearchHit {
  /** 所属構造の識別子。 */
  structureId: StructureId;
  /** 候補に表示するラベル（構造名/ホットスポット名/リンク名）。 */
  label: string;
  /** ヒット種別。 */
  kind: SearchHitKind;
  /** 遷移先。構造/ホットスポットは `#<id>`、リンクは該当ルート。 */
  href: string;
  /** 候補の文脈表示用（所属構造名）。 */
  context: string;
}

/** 索引エントリ（照合対象テキストと生成先ヒットを事前計算）。 */
interface IndexEntry {
  hit: SearchHit;
  /** 照合用に小文字化・結合したテキスト。 */
  haystack: string;
}

/** manifest から検索索引を一度だけ構築する（モジュールロード時に確定）。 */
const INDEX: readonly IndexEntry[] = buildIndex();

function buildIndex(): IndexEntry[] {
  const entries: IndexEntry[] = [];
  for (const s of ANATOMY_MANIFEST) {
    // 構造レベル: 構造名＋概要を索引する。
    entries.push({
      hit: {
        structureId: s.id,
        label: s.title,
        kind: "structure",
        href: `#${s.id}`,
        context: s.title,
      },
      haystack: `${s.title} ${s.summary}`.toLowerCase(),
    });
    // ホットスポット: 専門名＋読み仮名＋やさしい言い換えを索引する。
    for (const h of s.hotspots) {
      entries.push({
        hit: {
          structureId: s.id,
          label: h.label,
          kind: "hotspot",
          href: `#${s.id}`,
          context: s.title,
        },
        haystack: `${h.label} ${h.reading ?? ""} ${h.plain}`.toLowerCase(),
      });
    }
    // 教育リンク: リンク名を索引し、遷移先は該当ルート。
    for (const l of s.links) {
      entries.push({
        hit: { structureId: s.id, label: l.label, kind: "link", href: l.href, context: s.title },
        haystack: l.label.toLowerCase(),
      });
    }
  }
  return entries;
}

/**
 * クエリで解剖索引を照合し、ヒットを manifest 走査順で返す。
 *
 * @param query - 検索語（日英・略称可、大文字小文字非依存）。空・空白のみは `[]`。
 * @returns 一致した検索ヒット（構造→ホットスポット→リンクの順、重複 href は除外）。
 */
export function searchAnatomy(query: string): SearchHit[] {
  const q = query.trim().toLowerCase();
  if (q.length === 0) return [];

  const seen = new Set<string>();
  const hits: SearchHit[] = [];
  for (const entry of INDEX) {
    if (!entry.haystack.includes(q)) continue;
    // 同一遷移先・同一種別・同一ラベルの重複を除外（例: 複数構造に同じリンク）。
    const key = `${entry.hit.kind}|${entry.hit.href}|${entry.hit.label}`;
    if (seen.has(key)) continue;
    seen.add(key);
    hits.push(entry.hit);
  }
  return hits;
}
