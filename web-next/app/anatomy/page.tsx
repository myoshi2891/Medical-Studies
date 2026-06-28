import AutoGlossary from "@/components/glossary/AutoGlossary";
import "./anatomy.css";
import type { Metadata } from "next";
import { AnatomyViewers } from "@/components/anatomy/AnatomyViewers";
import { ANATOMY_MANIFEST } from "@/lib/anatomy/manifest";

export const metadata: Metadata = {
  title: "頭痛 3D 解剖アトラス",
  description:
    "頭痛に関わる神経・血管・脳・骨・頚椎・筋の解剖を 3D モデルと MRI で学び、各教育ページへ誘導する教育コンテンツ。",
};

/**
 * Renders the /anatomy page for the headache anatomy atlas.
 *
 * @returns The anatomy page shell with sectioned 3D anatomy content, educational links, and an academic disclaimer.
 */
export default function AnatomyPage() {
  return (
    <div className="anatomy-accent">
      {/* HERO */}
      <header className="anatomy-hero">
        <div className="anatomy-hero-emoji">🧠🦴</div>
        <h1>頭痛 3D 解剖アトラス</h1>
        <p className="anatomy-hero-sub">
          神経・血管・脳・骨・頚椎・筋を立体と MRI で学び、各教育ページへ
        </p>
      </header>

      {/* DISCLAIMER */}
      <div className="anatomy-disclaimer">
        <strong>⚠️ Academic Disclaimer（学術免責事項）</strong>　本コンテンツは
        <strong>学術・教育・研究目的のみ</strong>
        を対象としています。表示される 3D モデルおよび MRI
        は代表的な教材であり、特定個人の診断・処方・治療方針を提供するものではありません。実際の診断は必ず有資格医師の判断のもとで行ってください。
      </div>

      {/* SECTIONS */}
      <main className="anatomy-main">
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
                {s.links.map((l) => (
                  <a key={l.href} className="anatomy-link" href={l.href}>
                    {l.label}
                  </a>
                ))}
              </nav>
            </section>
          ))}
        </AutoGlossary>
      </main>
    </div>
  );
}
