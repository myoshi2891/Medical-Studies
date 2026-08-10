import Link from "next/link";
import { getRelated } from "@/lib/content/registry";

/**
 * 関連ページの導線（plans/002 Step 3）。
 *
 * リンク関係は本文ではなく `lib/content/registry.ts` の `related` が持つため、
 * 本コンポーネントはレジストリを引いて描画するだけの薄い層に留める
 * （リンク切れ・登録漏れはレジストリの契約テストが機械検知する）。
 * Server Component のまま動作し、クライアント JS を増やさない。
 */
export function RelatedLinks({ href }: { readonly href: string }) {
  const related = getRelated(href);
  // 未登録ページ・関連なしでは見出しだけが残らないよう、何も描画しない。
  if (related.length === 0) return null;

  return (
    <nav className="related-links" aria-label="関連ページ">
      <h2>関連ページ</h2>
      <ul>
        {related.map((entry) => (
          <li key={entry.href}>
            <Link href={entry.href}>{entry.title}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
