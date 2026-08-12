import Link from "next/link";
import { getRelated } from "@/lib/content/registry";

/**
 * Displays navigation links for pages related to the specified page.
 *
 * @param href - The page URL used to find related pages
 * @returns A related-links navigation element, or `null` when no related pages exist
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
