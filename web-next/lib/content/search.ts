/**
 * サイト横断コンテンツ検索のコア（plans/007 拡張項目 B・Step 2）。
 *
 * `lib/anatomy/search.ts` の「モジュールロード時に索引を構築し、DOM 非依存の純粋関数で
 * 照合する」パターンをサイト全体へ一般化したもの。索引源は単一データ源である
 * `CONTENT_REGISTRY` のみで、本文の解析は行わない（検索語は各エントリの `keywords` で宣言する）。
 * UI（`components/site/SiteSearch.tsx`）はこのコアを呼ぶだけの薄い層に留める。
 */

import { CONTENT_REGISTRY } from "./registry";
import type { ContentCategory } from "./types";

/** カテゴリの日本語表示名。候補一覧の文脈表示と、カテゴリ名での検索に使う。 */
export const CATEGORY_LABELS: Readonly<Record<ContentCategory, string>> = {
  headaches: "疾患",
  treatment: "治療",
  blocks: "神経ブロック",
  therapies: "非薬物療法",
  prom: "PROM 指標",
  anatomy: "解剖",
};

/** 検索結果 1 件（1 ページに対応）。 */
export interface ContentSearchHit {
  /** 遷移先の内部絶対パス。 */
  readonly href: string;
  /** 候補に表示するページ名。 */
  readonly title: string;
  /** 所属カテゴリ。 */
  readonly category: ContentCategory;
  /** 候補の文脈表示用（カテゴリの日本語表示名）。 */
  readonly context: string;
}

/** 索引エントリ（照合対象テキストと生成先ヒットを事前計算）。 */
interface IndexEntry {
  readonly hit: ContentSearchHit;
  /** 照合用に小文字化・結合したテキスト。 */
  readonly haystack: string;
}

/** レジストリから検索索引を一度だけ構築する（モジュールロード時に確定）。 */
const INDEX: readonly IndexEntry[] = buildIndex();

/**
 * Builds the search index from the registered content entries.
 *
 * @returns The indexed content entries with searchable text and display metadata
 */
function buildIndex(): IndexEntry[] {
  const entries: IndexEntry[] = [];
  for (const entry of CONTENT_REGISTRY) {
    const label = CATEGORY_LABELS[entry.category];
    const keywords = entry.keywords ?? [];
    entries.push({
      hit: {
        href: entry.href,
        title: entry.title,
        category: entry.category,
        context: label,
      },
      // タイトル・カテゴリ表示名・宣言済みキーワードを 1 本の haystack に結合する。
      haystack: `${entry.title} ${label} ${keywords.join(" ")}`.toLowerCase(),
    });
  }
  return entries;
}

/**
 * Searches the content index for pages matching a query.
 *
 * @param query - The search term; matching ignores case and surrounding whitespace.
 * @returns Matching page hits in registry order, without duplicate `href` values; an empty array for blank queries.
 */
export function searchContent(query: string): ContentSearchHit[] {
  const q = query.trim().toLowerCase();
  if (q.length === 0) return [];

  const seen = new Set<string>();
  const hits: ContentSearchHit[] = [];
  for (const entry of INDEX) {
    if (!entry.haystack.includes(q)) continue;
    // href はレジストリ側で一意だが、索引の将来拡張（1 ページ複数エントリ）に備えて防御する。
    if (seen.has(entry.hit.href)) continue;
    seen.add(entry.hit.href);
    hits.push(entry.hit);
  }
  return hits;
}
