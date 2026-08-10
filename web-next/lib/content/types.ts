/**
 * サイト横断コンテンツレジストリの型定義（plans/007 拡張項目 A）。
 *
 * `lib/anatomy/types.ts` の宣言的スタイルを踏襲する: `any` を使わず、
 * 公開型は `readonly` で不変を明示する。レジストリは相互リンク（plans/002 Step 3）・
 * サイトマップ（plans/007 D）・鮮度棚卸し（plans/003）の共通データ源となる。
 */

/** コンテンツカテゴリ。値は URL の第 1 セグメントと一致させる（/anatomy のみ単独ルート）。 */
export type ContentCategory =
  | "headaches"
  | "treatment"
  | "blocks"
  | "therapies"
  | "prom"
  | "anatomy";

/** 既知カテゴリの一覧（契約テストの検証に使用）。 */
export const CONTENT_CATEGORIES: readonly ContentCategory[] = [
  "headaches",
  "treatment",
  "blocks",
  "therapies",
  "prom",
  "anatomy",
];

/** コンテンツページ 1 件のメタデータ。 */
export interface ContentEntry {
  /** 内部絶対パス（例: /treatment/moh-acute-use-days）。レジストリ内で一意。 */
  readonly href: string;
  /** 相互リンク・サイトマップで表示する短いラベル（ナビ表記に準じる）。 */
  readonly title: string;
  /** 所属カテゴリ。 */
  readonly category: ContentCategory;
  /**
   * 最終レビュー日（YYYY-MM-DD）。plans/003「鮮度メタデータ規約」の器。
   * 半期棚卸しではこの値の古い順にレビュー対象を抽出する。
   */
  readonly lastReviewed: string;
  /** 参照ガイドライン・文献の基準日（YYYY-MM-DD、任意）。plans/003 規約。 */
  readonly sourcesAsOf?: string;
  /**
   * 関連ページの href（宣言順に表示）。plans/002 Step 3 により最低 2 本。
   * 参照先は必ずレジストリに存在すること（契約テストで dangling を検知）。
   */
  readonly related: readonly string[];
}
