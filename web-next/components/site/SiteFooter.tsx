import Image from "next/image";
import Link from "next/link";

/**
 * 全ページ共通のサイト情報、法務リンク、医療教育上の注意を表示する。
 */
export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="site-footer-inner">
        <div className="site-footer-top">
          <div className="site-footer-about">
            <Link className="site-footer-brand" href="/prom-checker">
              <Image src="/icon.svg" alt="" width={40} height={40} />
              <span>頭痛ケア・スタディ</span>
            </Link>
            <p>頭痛について学び、日々の状態を記録するための医療教育サイト。</p>
          </div>
          <nav aria-label="サイト情報">
            <span className="site-footer-nav-title">サイト情報</span>
            <div className="site-footer-links">
              <Link href="/privacy">プライバシーポリシー</Link>
              <Link href="/terms">利用規約</Link>
            </div>
          </nav>
        </div>
        <div className="site-footer-bottom">
          <p>本サイトは医療教育目的であり、診断・治療の代替にはなりません。</p>
          <span>MEDICAL STUDIES</span>
        </div>
      </div>
    </footer>
  );
}
