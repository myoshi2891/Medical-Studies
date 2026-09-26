import { RelatedLinks } from "@/components/content/RelatedLinks";
import AutoGlossary from "@/components/glossary/AutoGlossary";
import "./anatomy.css";
import type { Metadata } from "next";
import Link from "next/link";
import AnatomySearch from "@/components/anatomy/AnatomySearch";
import { AnatomySidebar } from "@/components/anatomy/AnatomySidebar";
import { AnatomyViewers } from "@/components/anatomy/AnatomyViewers";
import { ATLAS_LAYERS, ATLAS_PARTS } from "@/lib/anatomy/atlas";
import { ANATOMY_MANIFEST } from "@/lib/anatomy/manifest";

export const metadata: Metadata = {
  title: "頭痛 3D 解剖アトラス",
  description:
    "頭痛に関わる神経・血管・脳・骨・頚椎・筋のつながりを、3Dモデルと日英の部位解説で学ぶ解剖アトラス。",
};

/**
 * 教育リンクの href からセマンティックカテゴリを導出する（promp.md ⑨ タグ改善）。
 * 「何のページか」をタグで明示し、単なる青ピルの曖昧さを解消する。
 *
 * @param href - 内部ルート（/...）。
 * @returns 表示カテゴリ（疾患 / 神経ブロック / 治療 / 教育）。
 */
function linkCategory(href: string): string {
  if (href.startsWith("/headaches")) return "疾患";
  if (href.startsWith("/blocks")) return "神経ブロック";
  if (href.startsWith("/therapies") || href.startsWith("/physical-therapy")) return "治療";
  return "教育";
}

/**
 * Renders the /anatomy page for the headache anatomy atlas.
 *
 * @returns The anatomy page shell with sectioned 3D anatomy content, educational links, and an academic disclaimer.
 */
export default function AnatomyPage() {
  return (
    <div className="anatomy-accent">
      {/* SKIP LINK（キーボード利用者が本文へ直行できる。設計書 §9 / promp.md ⑬） */}
      <a className="anatomy-skip" href="#anatomy-main">
        本文へスキップ
      </a>

      {/* HERO */}
      <header className="anatomy-hero">
        <div className="anatomy-hero-copy">
          <p className="anatomy-eyebrow">
            MEDICAL STUDIES <span>/</span> ANATOMY ATLAS
          </p>
          <h1>頭痛 3D 解剖アトラス</h1>
          <p className="anatomy-hero-sub">
            構造を知る。つながりが見える。
            <br />
            頭頸部をめぐる解剖を、触れて学ぶ3Dアトラス。
          </p>
          <a className="anatomy-explore" href="#overview">
            全体像を探索 <span aria-hidden="true">↗</span>
          </a>
        </div>
        <div className="anatomy-hero-tools">
          <dl className="anatomy-stats">
            <div>
              <dt>系統</dt>
              <dd>{String(ATLAS_LAYERS.length).padStart(2, "0")}</dd>
            </div>
            <div>
              <dt>解剖構造</dt>
              <dd>{ATLAS_PARTS.length}</dd>
            </div>
            <div>
              <dt>部位解説</dt>
              <dd className="anatomy-stats-lang">JA / EN</dd>
            </div>
          </dl>
          <p className="anatomy-search-caption">気になる構造・疾患から探す</p>
          <AnatomySearch />
        </div>
        <nav className="anatomy-chips" aria-label="カテゴリへジャンプ">
          {ANATOMY_MANIFEST.map((s, index) => (
            <a key={s.id} className="anatomy-chip" href={`#${s.id}`}>
              <span aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
              {s.title}
            </a>
          ))}
        </nav>
      </header>

      {/* DISCLAIMER */}
      <details className="anatomy-disclaimer">
        <summary>
          このアトラスについて <span>学習・研究用の代表的な解剖モデルです</span>
        </summary>
        <p>
          <strong>Academic Disclaimer（学術免責事項）</strong>　本コンテンツは
          <strong>学術・教育・研究目的のみ</strong>
          を対象としています。表示される 3D モデル
          は代表的な教材であり、特定個人の診断・処方・治療方針を提供するものではありません。実際の診断は必ず有資格医師の判断のもとで行ってください。
        </p>
      </details>

      {/* LAYOUT: 左固定サイドナビ（scroll-spy）＋ 本文 */}
      <div className="anatomy-layout">
        <AnatomySidebar />

        {/* SECTIONS */}
        <main id="anatomy-main" className="anatomy-main">
          <AutoGlossary>
            {ANATOMY_MANIFEST.map((s, index) => (
              <section key={s.id} id={s.id} className="anatomy-sec">
                <header className="anatomy-section-heading">
                  <span className="anatomy-section-number" aria-hidden="true">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h2 className="anatomy-sec-title">{s.title}</h2>
                    <p className="anatomy-sec-summary">{s.summary}</p>
                  </div>
                </header>

                <AnatomyViewers structureId={s.id} mri={s.mri} title={s.title} />

                <nav className="anatomy-links" aria-label={`${s.title} の関連教育ページ`}>
                  {s.links.map((l) => {
                    const cat = linkCategory(l.href);
                    return (
                      <Link key={l.href} className="anatomy-link" data-cat={cat} href={l.href}>
                        <span className="anatomy-link-cat">{cat}</span>
                        {l.label}
                      </Link>
                    );
                  })}
                </nav>
              </section>
            ))}
          </AutoGlossary>

          {/* 関連ページ導線（plans/002 Step 3・レジストリ駆動） */}
          <RelatedLinks href="/anatomy" />
        </main>
      </div>

      {/* ATTRIBUTION（CC-BY-SA 2.1 JP は帰属表示が必須。詳細は public/models/LICENSES.md） */}
      <footer className="anatomy-credits">
        <p>
          3D モデル出典:{" "}
          <a href="https://lifesciencedb.jp/bp3d/" target="_blank" rel="noopener noreferrer">
            BodyParts3D
          </a>
          , © The Database Center for Life Science, licensed under{" "}
          <a
            href="https://creativecommons.org/licenses/by-sa/2.1/jp/"
            target="_blank"
            rel="noopener noreferrer"
          >
            CC BY-SA 2.1 JP
          </a>
          。教材化のため統合・簡略化・座標変換などの改変を加えています。
        </p>
      </footer>
    </div>
  );
}
