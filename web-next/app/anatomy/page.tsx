import AutoGlossary from "@/components/glossary/AutoGlossary";
import "./anatomy.css";
import type { Metadata } from "next";
import Link from "next/link";
import AnatomySearch from "@/components/anatomy/AnatomySearch";
import { AnatomySidebar } from "@/components/anatomy/AnatomySidebar";
import { AnatomyViewers } from "@/components/anatomy/AnatomyViewers";
import { ANATOMY_MANIFEST } from "@/lib/anatomy/manifest";

export const metadata: Metadata = {
  title: "頭痛 3D 解剖アトラス",
  description:
    "頭痛に関わる神経・血管・脳・骨・頚椎・筋の解剖を 3D モデルと MRI で学び、各教育ページへ誘導する教育コンテンツ。",
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
        <div className="anatomy-hero-emoji">🧠🦴</div>
        <h1>頭痛 3D 解剖アトラス</h1>
        <p className="anatomy-hero-sub">
          神経・血管・脳・骨・頚椎・筋を立体と MRI で学び、各教育ページへ
        </p>

        {/* 横断検索（autocomplete）— 目的の解剖へ最短到達する主動線 */}
        <AnatomySearch />

        {/* 人気カテゴリ・クイックジャンプ（3 クリック以内到達の導線。promp.md ①） */}
        <nav className="anatomy-chips" aria-label="カテゴリへジャンプ">
          {ANATOMY_MANIFEST.map((s) => (
            <a key={s.id} className="anatomy-chip" href={`#${s.id}`}>
              {s.title}
            </a>
          ))}
        </nav>
      </header>

      {/* DISCLAIMER */}
      <div className="anatomy-disclaimer">
        <strong>⚠️ Academic Disclaimer（学術免責事項）</strong>　本コンテンツは
        <strong>学術・教育・研究目的のみ</strong>
        を対象としています。表示される 3D モデルおよび MRI
        は代表的な教材であり、特定個人の診断・処方・治療方針を提供するものではありません。実際の診断は必ず有資格医師の判断のもとで行ってください。
      </div>

      {/* LAYOUT: 左固定サイドナビ（scroll-spy）＋ 本文 */}
      <div className="anatomy-layout">
        <AnatomySidebar />

        {/* SECTIONS */}
        <main id="anatomy-main" className="anatomy-main">
          <AutoGlossary>
            {ANATOMY_MANIFEST.map((s) => (
              <section key={s.id} id={s.id} className="anatomy-sec">
                <h2 className="anatomy-sec-title">{s.title}</h2>
                <p className="anatomy-sec-summary">{s.summary}</p>

                <AnatomyViewers
                  modelSrc={s.modelSrc}
                  hotspots={s.hotspots}
                  mri={s.mri}
                  title={s.title}
                />

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
