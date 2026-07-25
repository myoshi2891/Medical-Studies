import Link from "next/link";

/**
 * Renders the shared site footer with legal links and a medical education disclaimer.
 *
 * @returns The site footer element.
 */
export function SiteFooter() {
  return (
    <footer className="site-footer">
      <nav aria-label="サイト情報">
        <Link href="/privacy">プライバシーポリシー</Link>
        <span aria-hidden="true">・</span>
        <Link href="/terms">利用規約</Link>
      </nav>
      <p>本サイトは医療教育目的であり、診断・治療の代替にはなりません。</p>
    </footer>
  );
}
