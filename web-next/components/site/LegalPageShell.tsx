import Link from "next/link";
import type { ReactNode } from "react";

type LegalSection = {
  id: string;
  title: string;
};

/** 法務ページの導入、章目次、本文を共通のレイアウトで表示する。 */
export function LegalPageShell({
  title,
  label,
  intro,
  sections,
  children,
}: {
  title: string;
  label: string;
  intro: ReactNode;
  sections: readonly LegalSection[];
  children: ReactNode;
}) {
  return (
    <main className="legal-page">
      <header className="legal-hero">
        <div className="legal-hero-inner">
          <Link className="legal-back" href="/prom-checker">
            <span aria-hidden="true">←</span> ホームへ戻る
          </Link>
          <p className="legal-eyebrow">SITE INFORMATION / {label}</p>
          <h1>{title}</h1>
          <p className="legal-intro">{intro}</p>
          <p className="legal-updated">最終更新日: 2026-07-23</p>
        </div>
      </header>
      <div className="legal-layout">
        <nav className="legal-toc" aria-label="このページの目次">
          <span className="legal-toc-title">このページ</span>
          <ol>
            {sections.map((section) => (
              <li key={section.id}>
                <a href={`#${section.id}`}>{section.title}</a>
              </li>
            ))}
          </ol>
        </nav>
        <article className="legal-article">{children}</article>
      </div>
    </main>
  );
}
