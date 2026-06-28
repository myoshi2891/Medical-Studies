/**
 * 共通ナビゲーションのリンク定義。
 *
 * 参考元 (AI/LLM-Studies/web-next/components/site/nav-links.ts) は zod スキーマで
 * href を検証していたが、本リポジトリは zod 未依存のため依存追加を避け、
 * 同等の安全性チェック (isSafeHref) を純関数として実装する。
 *
 * 方針:
 * - `Types-of-headache/html-files/` 配下の全ページを web-next へ移行予定。
 *   未移行ルートは `disabled: true` を付け、ナビ上は「（準備中）」の非活性項目として表示する
 *   （クリックしても 404 にならない）。移行が完了したら該当項目の `disabled` を外す。
 * - ルート slug 規約: カテゴリ階層 + kebab-case（例: /headaches/migraine）。
 */

/** リーフ（子を持たない単一リンク）。disabled=true は未実装ルート（準備中表示）。 */
export type NavLeaf = {
  readonly name: string;
  readonly href: string;
  readonly disabled?: boolean;
};

/** ドロップダウン（子リンクを持つ親項目）。 */
export type NavDropdown = {
  readonly name: string;
  readonly children: readonly NavLeaf[];
};

export type NavLink = NavLeaf | NavDropdown;

/**
 * href が安全な内部絶対パスか検証する。
 * - `/` 始まりの絶対パスのみ許可
 * - プロトコル相対 URL (`//evil.com`) を拒否
 * - `javascript:` を含むものを拒否
 */
export function isSafeHref(href: string): boolean {
  if (href.length === 0) return false;
  if (href.startsWith("//")) return false;
  if (!href.startsWith("/")) return false;
  // 危険スキームは大文字小文字・前後空白を正規化してから検出する
  // （`JavaScript:` や ` javascript:` 等の変種を取りこぼさない）。
  const normalized = href.trim().toLowerCase();
  if (normalized.includes("javascript:")) return false;
  return true;
}

/** NavLink がドロップダウンかを判定する型ガード。 */
export function isDropdown(link: NavLink): link is NavDropdown {
  return "children" in link;
}

export const navLinks: readonly NavLink[] = [
  { name: "Home", href: "/prom-checker" },
  { name: "Anatomy", href: "/anatomy" },
  {
    name: "Headaches",
    children: [
      { name: "片頭痛 (Migraine)", href: "/headaches/migraine" },
      {
        name: "緊張型頭痛 (TTH)",
        href: "/headaches/tension-type-headache",
      },
      {
        name: "薬物乱用頭痛 (MOH)",
        href: "/headaches/medication-overuse-headache",
      },
      {
        name: "頸原性頭痛 (CEH)",
        href: "/headaches/cervicogenic-headache",
      },
    ],
  },
  {
    name: "Blocks",
    children: [
      { name: "後頭神経ブロック (ONB)", href: "/blocks/occipital-nerve-block" },
      { name: "頚神経叢ブロック (CPB)", href: "/blocks/cervical-plexus-block" },
      {
        name: "星状神経節ブロック (SGB)",
        href: "/blocks/stellate-ganglion-block",
      },
    ],
  },
  {
    name: "Therapies",
    children: [
      {
        name: "理学療法 (PT)",
        href: "/therapies/physical-therapy-for-headache",
      },
      {
        name: "栄養・サプリメント",
        href: "/therapies/nutrition-and-supplements",
      },
      {
        name: "心理・行動療法",
        href: "/therapies/psychological-behavioral-therapy",
      },
    ],
  },
  {
    name: "PROM 指標",
    children: [
      { name: "頭痛ダイアリー", href: "/prom/headache-diary", disabled: true },
      { name: "HIT-6", href: "/prom/headache-impact-test", disabled: true },
      { name: "MIDAS", href: "/prom/migraine-disability-assessment", disabled: true },
      {
        name: "MSQ v2.1",
        href: "/prom/migraine-specific-quality-of-life",
        disabled: true,
      },
      {
        name: "NRS / VAS",
        href: "/prom/numerical-rating-scale-visual-analogue-scale",
        disabled: true,
      },
      {
        name: "PGIC",
        href: "/prom/patient-global-impression-of-change",
        disabled: true,
      },
    ],
  },
];

// 開発時アサーション: 全 href が安全な内部パスであることを保証する。
// （zod の代替。ビルド時の型では表現できないランタイム不変条件を検証）
if (process.env.NODE_ENV !== "production") {
  for (const link of navLinks) {
    const hrefs = isDropdown(link) ? link.children.map((c) => c.href) : [link.href];
    for (const href of hrefs) {
      if (!isSafeHref(href)) {
        throw new Error(`navLinks contains unsafe href: ${href}`);
      }
    }
  }
}
