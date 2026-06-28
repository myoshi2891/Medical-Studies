import AutoGlossary from "@/components/glossary/AutoGlossary";
import "./patient-global-impression-of-change.css";
import { Ext } from "@/components/Ext";
import MermaidDiagram from "@/components/MermaidDiagram";
import PatientGlobalImpressionOfChangeSidebar from "@/components/prom/PatientGlobalImpressionOfChangeSidebar";

const PGIC_MERMAID_THEME = {
  primaryColor: "#d5f0ed",
  primaryTextColor: "#0b3954",
  primaryBorderColor: "#0e7c7b",
  lineColor: "#546e7a",
  secondaryColor: "#e0f2f1",
  tertiaryColor: "#e8f5e9",
  edgeLabelBackground: "#ffffff",
  fontSize: "13px",
};

export default function PatientGlobalImpressionOfChangePage() {
  return (
    <div className="pgic-accent">
      {/* HERO */}
      <div className="hero">
        <div>📊</div>
        <h1>PGIC（Patient Global Impression of Change）— 患者全般改善度</h1>
        <p className="hero-sub">理論・実践・頭痛医学への応用｜初学者向けステップバイステップ解説</p>
        <div className="hero-tags">
          <span className="hero-tag">PRO</span>
          <span className="hero-tag">アンカー指標</span>
          <span className="hero-tag">MCID</span>
          <span className="hero-tag">CGRP</span>
          <span className="hero-tag">FDA公認</span>
        </div>
      </div>

      {/* DISCLAIMER */}
      <div className="disclaimer">
        <strong>⚠️ Academic Disclaimer（学術免責事項）</strong>　本資料は
        <strong>学術・教育・研究目的のみ</strong>
        を対象としています。すべての内容は資格を持つ医療専門家による臨床適用前のレビューが必要です。個人的な医療アドバイス・診断・処方を提供するものではありません。
      </div>

      {/* LAYOUT */}
      <div className="layout">
        <PatientGlobalImpressionOfChangeSidebar />

        {/* MAIN CONTENT */}
        <main className="main">
          <AutoGlossary>
            {/* ====================================================== SECTION 1 */}
            <section id="s1" className="sec">
              <div className="sec-hd">
                <div className="sec-num">1</div>
                <h2 className="sec-title">PGICとは何か — 基本概念の理解</h2>
              </div>

              <div className="card">
                <h3>1.1 定義</h3>
                <p>
                  <strong>PGIC（Patient Global Impression of Change / 患者全般改善度）</strong>{" "}
                  は、治療開始前のベースライン状態と比較して、患者自身が感じる全体的な病状の変化を主観的に評価するための
                  <strong>単項目・7段階順序尺度（7-point Likert scale）</strong>です。
                </p>
                <div className="alert a-purple">
                  <span className="alert-i">💡</span>
                  <div>
                    <strong>一言で言えば：</strong>
                    <br />
                    「あなたは治療を始めてから、全体的にどのくらい良くなりましたか（あるいは悪くなりましたか）？」という問いに対して、患者自身が
                    1〜7 のスコアで答える尺度です。
                  </div>
                </div>
              </div>

              <div className="card">
                <h3>1.2 PGICが評価する概念領域</h3>
                <p>
                  PGIC は単なる「痛みの軽減」だけでなく、以下を<strong>包括的（holistic）に</strong>
                  捉えます：
                </p>
                <div className="tbl">
                  <table>
                    <thead>
                      <tr>
                        <th>評価領域</th>
                        <th>含まれる内容</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>
                          <strong>活動制限（Activity Limitations）</strong>
                        </td>
                        <td>仕事・家事・余暇活動への支障</td>
                      </tr>
                      <tr>
                        <td>
                          <strong>症状（Symptoms）</strong>
                        </td>
                        <td>頭痛強度・頻度・随伴症状の変化</td>
                      </tr>
                      <tr>
                        <td>
                          <strong>感情（Emotions）</strong>
                        </td>
                        <td>不安・抑うつ・生活への影響</td>
                      </tr>
                      <tr>
                        <td>
                          <strong>全体的なQOL（Overall Quality of Life）</strong>
                        </td>
                        <td>健康関連生活の質全般</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p>
                  これが、PGIC
                  を「痛みスケール（VAS/NRS）」や病態特異的尺度（HIT-6、MIDAS）と区別する最大の特徴です。
                </p>
              </div>

              <div className="card">
                <h3>1.3 なぜPGICが重要なのか — 患者中心医療（Patient-Centered Care）の視点</h3>
                <div className="mmd">
                  <div className="mmd-lbl">
                    フローチャート — 客観指標と患者中心指標のギャップを橋渡しするPGIC
                  </div>
                  <MermaidDiagram
                    themeVariables={PGIC_MERMAID_THEME}
                    chart={`graph TD
A["従来の転帰測定\\n（医師・研究者中心）"] --> B["客観的指標\\n（頭痛日数・薬剤使用量・MRI所見）"]
C["患者中心転帰測定\\n（PRO: Patient-Reported Outcome）"] --> D["主観的指標\\n（PGIC, HIT-6, MIDAS, MSQ）"]
B --> E["測定可能だが\\n患者の実感と乖離する可能性"]
D --> F["患者が実感する\\n治療の価値を直接反映"]
E --> G{"臨床的意義の\\nギャップ"}
F --> G
G --> H["PGICはこのギャップを\\n橋渡しするアンカー指標"]
style A fill:#e3f2fd,stroke:#0277bd
style C fill:#e8f5e9,stroke:#2e7d32
style H fill:#fff3e0,stroke:#e65100`}
                  />
                </div>
              </div>
            </section>

            {/* ====================================================== SECTION 2 */}
            <section id="s2" className="sec">
              <div className="sec-hd">
                <div className="sec-num">2</div>
                <h2 className="sec-title">歴史的背景 — Guy (1976) から現代へ</h2>
              </div>

              <div className="card">
                <h3>2.1 起源：CGI スケール（Clinical Global Impression）</h3>
                <p>
                  PGIC の起源は、精神科領域における治療評価ツールとして{" "}
                  <strong>William Guy（1976年）</strong> が開発した{" "}
                  <strong>CGI（Clinical Global Impression / 臨床全般印象）</strong>{" "}
                  スケールにあります。
                </p>
                <div className="tbl">
                  <table className="th-purple">
                    <thead>
                      <tr>
                        <th>項目</th>
                        <th>内容</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>
                          <strong>開発年</strong>
                        </td>
                        <td>1976年</td>
                      </tr>
                      <tr>
                        <td>
                          <strong>開発者</strong>
                        </td>
                        <td>William Guy</td>
                      </tr>
                      <tr>
                        <td>
                          <strong>元の目的</strong>
                        </td>
                        <td>精神科薬物試験における治療効果評価</td>
                      </tr>
                      <tr>
                        <td>
                          <strong>原典</strong>
                        </td>
                        <td>ECDEU Assessment Manual for Psychopharmacology（改訂版）</td>
                      </tr>
                      <tr>
                        <td>
                          <strong>元の構成</strong>
                        </td>
                        <td>
                          CGI-S（重症度）・CGI-I（改善度）・CGI-E（効果と副作用のバランス）の3要素
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="card">
                <h3>2.2 PGICへの発展：医師評価 → 患者評価へのパラダイムシフト</h3>
                <div className="mmd">
                  <div className="mmd-lbl">タイムライン — PGICの歴史的発展</div>
                  <MermaidDiagram
                    themeVariables={PGIC_MERMAID_THEME}
                    chart={`timeline
title PGICの歴史的発展タイムライン
1976 : Guy開発 CGI（Clinical Global Impression） : 精神科薬物試験での臨床医評価ツールとして確立
1990s : 慢性疼痛・神経疼痛領域への応用拡大 : 患者自己評価版（PGIC）の概念が登場
2001 : Farrar et al.（Pain誌） : PGICをアンカーとしたNRS-MCID of 定義 : 慢性疼痛研究での標準化
2006-2009 : FDA PRO ガイダンス（草案2006→最終版2009） : PGICが規制当局公認のアンカー指標として確立
2010s : CGRP関連片頭痛試験への導入 : エレヌマブ・フレマネズマブ・ガルカネズマブ試験で採用
2024-2025 : PGIC vs MMD比較研究（Romozzi et al.） : 抗CGRP mAbの治療継続判断指標として再評価`}
                  />
                </div>
              </div>

              <div className="card">
                <h3>2.3 頭痛医学における採用の経緯</h3>
                <p>
                  PGIC
                  が片頭痛・頭痛臨床試験に広く採用されるようになった背景には、以下の認識があります：
                </p>
                <ol>
                  <li>
                    <strong>月間頭痛日数（MHD/MMD）の削減のみでは患者の実感を捉えきれない</strong>
                  </li>
                  <li>
                    <strong>慢性片頭痛では軽度の日数削減でも生活の質に大きな影響をもたらす</strong>
                  </li>
                  <li>
                    <strong>FDAが医薬品承認申請においてPROエビデンスを重視するようになった</strong>
                  </li>
                </ol>
              </div>
            </section>

            {/* ====================================================== SECTION 3 */}
            <section id="s3" className="sec">
              <div className="sec-hd">
                <div className="sec-num">3</div>
                <h2 className="sec-title">スケールの構造と採点方法</h2>
              </div>

              <div className="card">
                <h3>3.1 質問の構造（標準フォーム）</h3>
                <p>
                  PGIC は<strong>たった1問</strong>で構成されます。これが最大の実用的強みです。
                </p>
                <div className="alert a-info">
                  <span className="alert-i">🗣️</span>
                  <div>
                    <strong>標準的な問いかけ（英文）</strong>
                    <br />
                    <em>
                      &quot;Since beginning the treatment in this study, how would you describe the
                      change (if any) in your headaches/migraines in terms of activity limitations,
                      symptoms, emotions, and overall quality of life?&quot;
                    </em>
                    <br />
                    <br />
                    <strong>日本語訳（頭痛医学版）</strong>
                    <br />
                    「この治療を始めてから、活動制限・症状・気持ち・全体的な生活の質という観点で、あなたの頭痛はどのように変化しましたか？」
                  </div>
                </div>
              </div>

              <div className="card">
                <h3>3.2 採点方法（主要片頭痛試験で使用される標準バージョン）</h3>
                <p>
                  フレマネズマブ・エレヌマブ等の主要片頭痛試験で使用される昇順型バージョンの採点を示します。
                </p>
                <div className="tbl">
                  <table>
                    <thead>
                      <tr>
                        <th>スコア</th>
                        <th>英語表現</th>
                        <th>日本語訳</th>
                        <th>解釈</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="tN">
                          <strong>1</strong>
                        </td>
                        <td>No change (or condition got worse)</td>
                        <td>変化なし（または悪化）</td>
                        <td>無効または悪化</td>
                      </tr>
                      <tr>
                        <td className="tN">
                          <strong>2</strong>
                        </td>
                        <td>Almost the same, hardly any change at all</td>
                        <td>ほぼ同じ、ほとんど変化なし</td>
                        <td>変化なし</td>
                      </tr>
                      <tr>
                        <td className="tN">
                          <strong>3</strong>
                        </td>
                        <td>A little better, but no noticeable change</td>
                        <td>少し良いが、気づける変化なし</td>
                        <td>軽微な改善</td>
                      </tr>
                      <tr>
                        <td className="tN">
                          <strong>4</strong>
                        </td>
                        <td>Somewhat better, but the change has not made any real difference</td>
                        <td>やや良いが、実質的な差なし</td>
                        <td>有意でない改善</td>
                      </tr>
                      <tr>
                        <td className="tG">
                          <strong>5</strong>
                        </td>
                        <td>Moderately better, and a slight but noticeable change</td>
                        <td>中程度に改善、わずかだが気づける変化あり</td>
                        <td>
                          <strong>最小有効閾値</strong>
                        </td>
                      </tr>
                      <tr>
                        <td className="tG">
                          <strong>6</strong>
                        </td>
                        <td>
                          Better, and a definite improvement that has made a real and worthwhile
                          difference
                        </td>
                        <td>改善し、真に価値ある確実な改善</td>
                        <td>明確な有効応答</td>
                      </tr>
                      <tr>
                        <td className="tG">
                          <strong>7</strong>
                        </td>
                        <td>
                          A great deal better, and a considerable improvement that has made all the
                          difference
                        </td>
                        <td>大幅に改善し、大きな変化</td>
                        <td>最大応答</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="alert a-ok">
                  <span className="alert-i">⭐</span>
                  <div>
                    <strong>
                      臨床的解釈の閾値：スコア 5〜7 = 有意な改善（favorable response）
                    </strong>
                    <br />
                    主要RCTでは、スコア <strong>5・6・7</strong> を「有意な改善あり（Yes）」、スコア{" "}
                    <strong>1〜4</strong>{" "}
                    を「有意な改善なし（No）」と二値化して解析するのが標準的手法です。
                  </div>
                </div>
              </div>
            </section>

            {/* ====================================================== SECTION 4 */}
            <section id="s4" className="sec">
              <div className="sec-hd">
                <div className="sec-num">4</div>
                <h2 className="sec-title">2つのバージョンと方向性の違い</h2>
              </div>

              <div className="card">
                <h3>4.1 ⚠️ 重要：スコアの「向き」が逆転するバリアントに注意</h3>
                <p>
                  PGIC には採点方向が<strong>逆転した2つの主要バリアント</strong>
                  が存在します。臨床研究のデータを比較・解釈する際は、どちらのバージョンが使用されているかを
                  <strong>必ず確認</strong>してください。
                </p>
                <div className="tbl">
                  <table className="th-orange">
                    <thead>
                      <tr>
                        <th>項目</th>
                        <th>バージョンA（昇順型）</th>
                        <th>バージョンB（降順型）</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>
                          <strong>スコア1の意味</strong>
                        </td>
                        <td>変化なし・悪化</td>
                        <td>大幅に改善（Very much improved）</td>
                      </tr>
                      <tr>
                        <td>
                          <strong>スコア7の意味</strong>
                        </td>
                        <td>大幅に改善</td>
                        <td>大幅に悪化（Very much worse）</td>
                      </tr>
                      <tr>
                        <td>
                          <strong>スコアが高い = ?</strong>
                        </td>
                        <td>改善 ↑</td>
                        <td>悪化 ↑</td>
                      </tr>
                      <tr>
                        <td>
                          <strong>主な採用試験</strong>
                        </td>
                        <td>フレマネズマブ、エレヌマブ、ガルカネズマブ（片頭痛予防試験）</td>
                        <td>エプチネズマブ（RELIEF試験）、Guy原版に近い形式</td>
                      </tr>
                      <tr>
                        <td>
                          <strong>「改善」閾値</strong>
                        </td>
                        <td>5〜7</td>
                        <td>1〜3</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="mmd">
                  <div className="mmd-lbl">フローチャート — 昇順型 vs 降順型のスコア方向</div>
                  <MermaidDiagram
                    themeVariables={PGIC_MERMAID_THEME}
                    chart={`graph LR
subgraph VER_A["バージョンA：昇順型（片頭痛mAb試験で多用）"]
A1["1<br/>変化なし/悪化"] --> A2["2<br/>ほぼ同じ"] --> A3["3<br/>少し良い"] --> A4["4<br/>やや良い"] --> A5["5<br/>中程度改善 ★閾値"] --> A6["6<br/>明確な改善"] --> A7["7<br/>大幅改善"]
end
subgraph VER_B["バージョンB：降順型（Guy原版・エプチネズマブ等）"]
B1["1<br/>大幅改善 ★閾値"] --> B2["2<br/>かなり改善"] --> B3["3<br/>最小限改善 ★閾値"] --> B4["4<br/>変化なし"] --> B5["5<br/>最小限悪化"] --> B6["6<br/>かなり悪化"] --> B7["7<br/>大幅悪化"]
end
style A5 fill:#c8e6c9,stroke:#2e7d32
style A6 fill:#a5d6a7,stroke:#2e7d32
style A7 fill:#81c784,stroke:#2e7d32
style B1 fill:#81c784,stroke:#2e7d32
style B2 fill:#a5d6a7,stroke:#2e7d32
style B3 fill:#c8e6c9,stroke:#2e7d32`}
                  />
                </div>
                <div className="alert a-warn">
                  <span className="alert-i">⚠️</span>
                  <div>
                    <strong>実践的ポイント：</strong> 論文・プロトコルを読む際は、必ず &quot;1 = no
                    change/worse&quot; か &quot;1 = very much improved&quot;
                    かをファーストページで確認する習慣をつけてください。
                  </div>
                </div>
              </div>
            </section>

            {/* ====================================================== SECTION 5 */}
            <section id="s5" className="sec">
              <div className="sec-hd">
                <div className="sec-num">5</div>
                <h2 className="sec-title">心理測定学的特性</h2>
              </div>

              <div className="card">
                <h3>5.1 信頼性（Reliability）</h3>
                <div className="tbl">
                  <table>
                    <thead>
                      <tr>
                        <th>特性</th>
                        <th>評価</th>
                        <th>根拠</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>
                          <strong>内的整合性</strong>
                        </td>
                        <td>単項目のため非該当（Cronbach&apos;s α は適用不可）</td>
                        <td>単一質問</td>
                      </tr>
                      <tr>
                        <td>
                          <strong>検者内信頼性（test-retest）</strong>
                        </td>
                        <td>中程度〜高い</td>
                        <td>慢性疼痛研究群での繰り返し測定</td>
                      </tr>
                      <tr>
                        <td>
                          <strong>PGIC–CGIC 相関</strong>
                        </td>
                        <td className="tG">
                          <strong>r = 0.87</strong>（非常に高い相関）
                        </td>
                        <td>Farrar et al., 2001（Pain誌）</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="alert a-info">
                  <span className="alert-i">ℹ️</span>
                  <div>
                    PGIC（患者評価）と CGIC（臨床医評価）の相関係数が r=0.87
                    という極めて高い値を示すことは、患者の自己評価が臨床的実態を正確に反映していることを意味します。この知見が、PGIC
                    を単独で主要転帰指標として用いることを正当化する重要な根拠となっています。
                  </div>
                </div>
              </div>

              <div className="card">
                <h3>5.2 妥当性（Validity）</h3>
                <div className="tbl">
                  <table className="th-teal">
                    <thead>
                      <tr>
                        <th>妥当性の種類</th>
                        <th>内容</th>
                        <th>エビデンス</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>
                          <strong>内容妥当性</strong>
                        </td>
                        <td>患者が重視する複数の健康ドメイン（活動・症状・感情・QOL）を包括</td>
                        <td>FDA PRO Guidance 2009; 各試験のPRO概念的枠組み</td>
                      </tr>
                      <tr>
                        <td>
                          <strong>構成概念妥当性</strong>
                        </td>
                        <td>HIT-6、NRS/VAS との中〜高相関</td>
                        <td>Farrar et al. 2001; RELIEF試験（eptinezumab, 2022）</td>
                      </tr>
                      <tr>
                        <td>
                          <strong>基準関連妥当性</strong>
                        </td>
                        <td>NRS変化量との ROC 曲線解析で高い判別能（AUC &gt; 0.75）</td>
                        <td>Salaffi et al., 2004</td>
                      </tr>
                      <tr>
                        <td>
                          <strong>収束妥当性</strong>
                        </td>
                        <td>MIDAS・MSQ v2.1 との相関確認</td>
                        <td>複数の片頭痛臨床試験</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="card">
                <h3>5.3 反応性（Responsiveness）</h3>
                <p>
                  PGIC
                  は治療による変化を検出する感度（反応性）が高いことが複数の慢性疼痛・頭痛試験で確認されています：
                </p>
                <ul>
                  <li>
                    プレガバリンを用いた10の慢性疼痛RCTにおいて、
                    <strong>NRS変化量とPGICカテゴリーの間に一貫した高い関連性</strong>
                    が示されました（Farrar et al., 2001）。
                  </li>
                  <li>
                    この関連性は、疾患の種類・投薬の有無・試験の成否・年齢・性別を問わず一貫して再現されました。
                  </li>
                </ul>
              </div>
            </section>

            {/* ====================================================== SECTION 6 */}
            <section id="s6" className="sec">
              <div className="sec-hd">
                <div className="sec-num">6</div>
                <h2 className="sec-title">最小臨床的重要差（MCID）の概念と頭痛医学への適用</h2>
              </div>

              <div className="card">
                <h3>6.1 MCIDとは何か</h3>
                <p>
                  <strong>
                    MCID（Minimal Clinically Important Difference / 最小臨床的重要差）
                  </strong>{" "}
                  とは、患者が「実際に良くなった」と感じる最小限の変化量を定量化した値です。
                </p>
                <div className="alert a-purple">
                  <span className="alert-i">💡</span>
                  <div>
                    <strong>なぜMCIDが重要か：</strong>
                    <br />
                    統計的有意差（p &lt;
                    0.05）があっても、患者が「良くなった」と感じるほどの変化でなければ、その治療は臨床的に意味がない可能性があります。MCIDはこの「統計的有意性と臨床的意義のギャップ」を埋める概念です。
                  </div>
                </div>
              </div>

              <div className="card">
                <h3>6.2 PGICをアンカーとするMCID算出法</h3>
                <div className="mmd">
                  <div className="mmd-lbl">
                    フローチャート — PGICアンカーベースのMCID算出プロセス
                  </div>
                  <MermaidDiagram
                    themeVariables={PGIC_MERMAID_THEME}
                    chart={`flowchart TD
A["ベースライン評価\\nNRS / VAS / HIT-6 / MIDAS 等"] --> B["治療介入\\n（薬物療法・神経ブロック・行動療法 等）"]
B --> C["フォローアップ評価\\n同じ転帰尺度を再測定"]
C --> D["PGIC 評価\\n患者が1〜7で自己評価"]
D --> E{"PGICスコアで\\n患者を層別化"}
E --> F["改善群\\nPGIC 5〜7（バージョンA）"]
E --> G["非改善群\\nPGIC 1〜4（バージョンA）"]
F --> H["改善群の\\n転帰尺度変化量を算出"]
G --> I["非改善群の\\n転帰尺度変化量を算出"]
H --> J["ROC曲線解析"]
I --> J
J --> K["AUC最大化する\\nカットオフ値 = MCID"]
style K fill:#fff3e0,stroke:#e65100`}
                  />
                </div>
              </div>

              <div className="card">
                <h3>6.3 慢性疼痛・頭痛領域のMCID参照値</h3>
                <div className="tbl">
                  <table>
                    <thead>
                      <tr>
                        <th>転帰尺度</th>
                        <th>MCID親閾値</th>
                        <th>対応するPGIC</th>
                        <th>文献</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>
                          <strong>NRS（11点）</strong>
                        </td>
                        <td>−1.74点（または−15%）が「最小限改善」</td>
                        <td>PGIC &quot;slightly better&quot;</td>
                        <td>Salaffi et al., 2004</td>
                      </tr>
                      <tr>
                        <td>
                          <strong>NRS（11点）</strong>
                        </td>
                        <td>−2.0点（または−33%）が「かなり改善」</td>
                        <td>PGIC &quot;much better&quot;</td>
                        <td>Farrar et al., 2001</td>
                      </tr>
                      <tr>
                        <td>
                          <strong>HIT-6</strong>
                        </td>
                        <td>
                          <strong>−2.3点</strong>（MCID）；<strong>−6点</strong>
                          以上が「実質的な改善」
                        </td>
                        <td>PGIC 5〜7</td>
                        <td>Zencir et al.; RELIEF試験</td>
                      </tr>
                      <tr>
                        <td>
                          <strong>MIDAS</strong>
                        </td>
                        <td>≥50%削減が標準的な成功指標</td>
                        <td>PGIC 6〜7</td>
                        <td>頭痛ガイドライン横断的基準</td>
                      </tr>
                      <tr>
                        <td>
                          <strong>月間片頭痛日数（MMD）</strong>
                        </td>
                        <td>≥50%削減（50%レスポンダー率）が主要転帰</td>
                        <td>PGIC 5〜7 に相関</td>
                        <td>CGRP mAb 主要試験</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="card">
                <h3>6.4 頭痛医学特有の重要な知見（2025年最新エビデンス）</h3>
                <div className="alert a-ok">
                  <span className="alert-i">🔬</span>
                  <div>
                    <strong>
                      Romozzi et al., 2025（Annals of Clinical and Translational Neurology）：
                    </strong>
                    <br />
                    169名の抗CGRP mAb治療患者を対象とした研究で、治療継続の決定因子として{" "}
                    <strong>PGIC が月間片頭痛日数（MMD）削減よりも強い予測因子</strong>
                    である可能性が示されました。
                    <br />→
                    患者の治療継続意欲は、客観的な日数削減よりも「自分が良くなったと感じるか」という主観的変化感が主導する可能性があります。
                  </div>
                </div>
              </div>
            </section>

            {/* ====================================================== SECTION 7 */}
            <section id="s7" className="sec">
              <div className="sec-hd">
                <div className="sec-num">7</div>
                <h2 className="sec-title">頭痛医学・片頭痛臨床試験における実践的応用</h2>
              </div>

              <div className="card">
                <h3>7.1 PGIC が採用されている主要な頭痛RCT</h3>
                <div className="tbl">
                  <table className="th-teal">
                    <thead>
                      <tr>
                        <th>試験名</th>
                        <th>薬剤</th>
                        <th>PGICの役割</th>
                        <th>採用バージョン</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>
                          <strong>HALO EM / HALO CM</strong>
                        </td>
                        <td>フレマネズマブ（Ajovy）</td>
                        <td>副次転帰</td>
                        <td>昇順型（1=悪化、7=大幅改善）</td>
                      </tr>
                      <tr>
                        <td>
                          <strong>ARISE / STRIVE / LIBERTY</strong>
                        </td>
                        <td>エレヌマブ（Aimovig）</td>
                        <td>副次転帰</td>
                        <td>昇順型</td>
                      </tr>
                      <tr>
                        <td>
                          <strong>EVOLVE-1 / EVOLVE-2 / REGAIN</strong>
                        </td>
                        <td>ガルカネズマブ（Emgality）</td>
                        <td>副次転帰</td>
                        <td>昇順型</td>
                      </tr>
                      <tr>
                        <td>
                          <strong>RELIEF</strong>
                        </td>
                        <td>エプチネズマブ（Vyepti）</td>
                        <td>副次転帰</td>
                        <td>降順型（1=大幅改善、7=大幅悪化）</td>
                      </tr>
                      <tr>
                        <td>
                          <strong>PROMISE-1 / PROMISE-2</strong>
                        </td>
                        <td>エプチネズマブ</td>
                        <td>副次転帰</td>
                        <td>降順型</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="card">
                <h3>7.2 頭痛診療における PGIC 実施タイムライン</h3>
                <div className="mmd">
                  <div className="mmd-lbl">
                    ガントチャート — PGICを組み込んだ頭痛治療転帰評価タイムライン
                  </div>
                  <MermaidDiagram
                    themeVariables={PGIC_MERMAID_THEME}
                    chart={`gantt
title PGICを組み込んだ頭痛治療転帰評価タイムライン
dateFormat YYYY-MM
axisFormat %m月
section 前治療評価
ベースライン評価（HIT-6, MIDAS, VAS, 頭痛日記） :milestone, m1, 2024-01, 0d
30日間ベースライン頭痛日記記録 :a1, 2024-01, 30d
section 治療フェーズ
治療開始（薬物 / 神経ブロック / 行動療法） :milestone, m2, 2024-02, 0d
Month 1 評価（頭痛日記継続） :a2, 2024-02, 28d
Month 2 評価 :a3, 2024-03, 28d
Month 3 主要転帰評価（PGIC + HIT-6 + MIDAS） :crit, a4, 2024-04, 14d
section フォローアップ
Month 6 評価（PGIC + HIT-6） :a5, 2024-07, 14d
Month 12 最終評価（全転帰指標） :crit, a6, 2024-12, 14d`}
                  />
                </div>
              </div>

              <div className="card">
                <h3>7.3 頭痛特異的なPGIC評価フォーム（実践版）</h3>
                <p>
                  治療を開始してから、あなたの<strong>頭痛</strong>
                  は活動の制限・症状・気持ち・全体的な生活の質という観点でどう変化しましたか？
                </p>
                <div className="tbl">
                  <table>
                    <thead>
                      <tr>
                        <th>選択</th>
                        <th>スコア</th>
                        <th>意味</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>☐</td>
                        <td className="tN">
                          <strong>1</strong>
                        </td>
                        <td>変化なし、または悪化している</td>
                      </tr>
                      <tr>
                        <td>☐</td>
                        <td className="tN">
                          <strong>2</strong>
                        </td>
                        <td>ほぼ変わらない、ほとんど変化なし</td>
                      </tr>
                      <tr>
                        <td>☐</td>
                        <td className="tN">
                          <strong>3</strong>
                        </td>
                        <td>少し良くなったが、はっきりした変化ではない</td>
                      </tr>
                      <tr>
                        <td>☐</td>
                        <td className="tN">
                          <strong>4</strong>
                        </td>
                        <td>やや良くなったが、実生活での差は感じられない</td>
                      </tr>
                      <tr>
                        <td>☐</td>
                        <td className="tG">
                          <strong>5 ★</strong>
                        </td>
                        <td>中程度に良くなり、わずかだが明らかな変化がある</td>
                      </tr>
                      <tr>
                        <td>☐</td>
                        <td className="tG">
                          <strong>6 ★</strong>
                        </td>
                        <td>良くなり、実生活で確実に価値ある改善がある</td>
                      </tr>
                      <tr>
                        <td>☐</td>
                        <td className="tG">
                          <strong>7 ★</strong>
                        </td>
                        <td>大幅に良くなり、生活が一変するほどの改善がある</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="alert a-ok">
                  <span className="alert-i">✅</span>
                  <div>
                    <strong>
                      ★ スコア5〜7 = 治療有効応答（clinically meaningful improvement）
                    </strong>
                  </div>
                </div>
              </div>

              <div className="card">
                <h3>7.4 PGIC 結果の解釈と臨床的対応</h3>
                <div className="mmd">
                  <div className="mmd-lbl">フローチャート — PGICスコア別の臨床的対応</div>
                  <MermaidDiagram
                    themeVariables={PGIC_MERMAID_THEME}
                    chart={`flowchart TD
A["PGIC 評価実施"] --> B{"スコア確認"}
B --> C["スコア 1〜2<br/>変化なし・ほぼ同じ"]
B --> D["スコア 3〜4<br/>軽微〜一定の改善"]
B --> E["スコア 5〜7<br/>中程度〜大幅改善"]
C --> C1["治療再評価必須<br/>・MOHスクリーニング<br/>・診断再確認（SNOOP4）<br/>・薬剤変更 / 増量検討<br/>・神経ブロック追加を検討"]
D --> D1["部分奏効として評価<br/>・現治療を継続し観察<br/>・付加的アプローチ検討<br/>（CBT・生体FB・理学療法）<br/>・3ヶ月後に再評価"]
E --> E1["治療有効応答<br/>・現治療プランを継続<br/>・HIT-6・MIDASで改善確認<br/>・治療目標（≥50%削減）達成度確認<br/>・次の評価時期を設定"]
C1 --> F["SNOOP4 再確認<br/>（二次性頭痛を除外）"]
D1 --> G["3ヶ月フォローアップ"]
E1 --> G
F --> G
style E fill:#c8e6c9,stroke:#2e7d32
style D fill:#fff9c4,stroke:#f57f17
style C fill:#ffcdd2,stroke:#c62828`}
                  />
                </div>
              </div>
            </section>

            {/* ====================================================== SECTION 8 */}
            <section id="s8" className="sec">
              <div className="sec-hd">
                <div className="sec-num">8</div>
                <h2 className="sec-title">CGRPモノクローナル抗体試験でのPGICの位置づけ</h2>
              </div>

              <div className="card">
                <h3>8.1 CGRP mAb試験におけるPGICの意義</h3>
                <p>
                  CGRPモノクローナル抗体（erenumab, fremanezumab, galcanezumab,
                  eptinezumab）の臨床試験では、PGIC は
                  <strong>副次転帰（secondary endpoint）</strong>
                  として一貫して採用されています。
                </p>
              </div>

              <div className="card">
                <h3>8.2 主要試験でのPGIC結果（エビデンス概要）</h3>
                <div className="tbl">
                  <table className="th-teal">
                    <thead>
                      <tr>
                        <th>薬剤</th>
                        <th>試験</th>
                        <th>有効応答率（PGIC 5〜7）活性群</th>
                        <th>プラセボ群</th>
                        <th>備考</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>フレマネズマブ</td>
                        <td>HALO CM</td>
                        <td className="tG">~66%</td>
                        <td>~45%</td>
                        <td>月1回・四半期1回両群で有意差</td>
                      </tr>
                      <tr>
                        <td>エレヌマブ</td>
                        <td>ARISE</td>
                        <td className="tG">~61%</td>
                        <td>~39%</td>
                        <td>70mg群での代表値</td>
                      </tr>
                      <tr>
                        <td>ガルカネズマブ</td>
                        <td>EVOLVE-1</td>
                        <td className="tG">~60%</td>
                        <td>~36%</td>
                        <td>120mg群での代表値</td>
                      </tr>
                      <tr>
                        <td>エプチネズマブ</td>
                        <td>RELIEF</td>
                        <td className="tG">PGIC 1〜3（改善）62%</td>
                        <td>45%</td>
                        <td>バージョンB採用</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p style={{ fontSize: 12, color: "var(--g6)", marginTop: 4 }}>
                  ※
                  上記の数値は各主要RCTの公表結果に基づく代表的な概数であり、試験条件・解析時点により差異があります。
                </p>
              </div>

              <div className="card">
                <h3>8.3 2025年最新知見：PGIC vs MMD — どちらが治療継続を予測するか</h3>
                <p>
                  <strong>Romozzi et al. (2025)</strong> の実臨床データ（169名、イタリア多施設 RICe
                  レジストリ）では：
                </p>
                <ul>
                  <li>
                    抗CGRP mAbで治療を継続した患者（継続群）と中断した患者（中断群）の比較において
                  </li>
                  <li>
                    <strong>
                      月間片頭痛日数（MMD）削減量よりも、PGICスコアの方が治療継続を強力に予測
                    </strong>
                    しました。
                  </li>
                  <li>
                    治療中断の 21.3%
                    は「無効」を理由とするものでしたが、MMD削減が基準を満たしていても
                    PGICスコアが低い患者は中断傾向が高い傾向が示されました。
                  </li>
                </ul>
                <div className="alert a-purple">
                  <span className="alert-i">💡</span>
                  <div>
                    <strong>臨床的示唆：</strong> 抗CGRP mAb
                    の治療効果判定に際して、MMD削減率だけでなく PGIC
                    による患者の主観的評価を同時に参照することが、
                    <strong>より正確な治療意思決定</strong>につながる可能性があります。
                  </div>
                </div>
              </div>
            </section>

            {/* ====================================================== SECTION 9 */}
            <section id="s9" className="sec">
              <div className="sec-hd">
                <div className="sec-num">9</div>
                <h2 className="sec-title">PGIC vs CGIC — 患者評価と臨床医評価の比較</h2>
              </div>

              <div className="card">
                <h3>9.1 定義と構造の比較</h3>
                <div className="tbl">
                  <table>
                    <thead>
                      <tr>
                        <th>特性</th>
                        <th>PGIC（患者評価）</th>
                        <th>CGIC（臨床医評価）</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>
                          <strong>評価者</strong>
                        </td>
                        <td>患者本人</td>
                        <td>担当医師・看護師等</td>
                      </tr>
                      <tr>
                        <td>
                          <strong>質問文</strong>
                        </td>
                        <td>「あなた自身の変化は？」</td>
                        <td>「患者の全体的状態の変化は？」</td>
                      </tr>
                      <tr>
                        <td>
                          <strong>スケール</strong>
                        </td>
                        <td>同一の7段階</td>
                        <td>同一の7段階</td>
                      </tr>
                      <tr>
                        <td>
                          <strong>バイアスリスク</strong>
                        </td>
                        <td>期待バイアス、想起バイアス</td>
                        <td>ハロー効果、観察バイアス</td>
                      </tr>
                      <tr>
                        <td>
                          <strong>FDAの推奨</strong>
                        </td>
                        <td>主要PRO転帰として優先</td>
                        <td>補助的参照指標</td>
                      </tr>
                      <tr>
                        <td>
                          <strong>相関係数（r）</strong>
                        </td>
                        <td colSpan={2} className="tG">
                          PGICとCGICの相関：<strong>r = 0.87</strong>（Farrar 2001）
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="card">
                <h3>9.2 相関性が高い意味と限界</h3>
                <p>
                  相関係数 r=0.87 という高い値は、
                  <strong>患者の自己認識と臨床医の観察が高度に一致する</strong>
                  ことを示します。これは：
                </p>
                <ul>
                  <li>患者が自身の症状変化を正確に認識できていることの根拠</li>
                  <li>PGIC を単独の主要転帰として採用することの妥当性を支持</li>
                </ul>
                <p>
                  一方、<strong>一致しないケース（約13%の乖離）</strong>において：
                </p>
                <ul>
                  <li>慢性疼痛では患者の期待値・心理状態が影響を与える可能性がある</li>
                  <li>
                    臨床医が観察できない領域（家庭内活動、睡眠の質等）を患者だけが評価している
                  </li>
                </ul>
              </div>
            </section>

            {/* ====================================================== SECTION 10 */}
            <section id="s10" className="sec">
              <div className="sec-hd">
                <div className="sec-num">10</div>
                <h2 className="sec-title">FDAによる規制上の位置づけ — PRO エビデンスとして</h2>
              </div>

              <div className="card">
                <h3>10.1 FDA PRO ガイダンス（2009）における PGIC の位置づけ</h3>
                <p>
                  2009年12月に最終化されたFDA ガイダンス{" "}
                  <strong>
                    &quot;Patient-Reported Outcome Measures: Use in Medical Product Development to
                    Support Labeling Claims&quot;
                  </strong>{" "}
                  において：
                </p>
                <ul>
                  <li>
                    <strong>PRO（Patient-Reported Outcome）</strong>{" "}
                    が医薬品承認申請における有効性主張を支持する正式なエビデンスとして認定。
                  </li>
                  <li>
                    PGIC は <strong>アンカー（anchor）</strong>
                    として、他のPRO尺度のMCID算出に不可欠なツールと位置づけ。
                  </li>
                  <li>
                    MCIDの決定には <strong>アンカーベース法（anchor-based method）</strong>
                    （PGICをアンカーとする）と
                    <strong>分布ベース法（distribution-based method）</strong>の組み合わせが推奨。
                  </li>
                </ul>
              </div>

              <div className="card">
                <h3>10.2 Patient-Focused Drug Development（PFDD）ガイダンスシリーズとPGIC</h3>
                <p>
                  FDAは2020年代にかけて<strong>PFDDガイダンスシリーズ</strong>
                  を発行し、PGIC（およびPGIS：重症度版）を：
                </p>
                <ul>
                  <li>
                    <strong>意味のある患者内変化（Meaningful Within-Patient Change）</strong>{" "}
                    の決定のための標準アンカーとして明示。
                  </li>
                  <li>経験的累積分布関数（eCDF）・確率密度関数（PDF）曲線との併用を推奨。</li>
                </ul>
                <div className="tbl">
                  <table className="th-purple">
                    <thead>
                      <tr>
                        <th>ガイダンス文書</th>
                        <th>要点</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>FDA PRO最終ガイダンス（2009）</td>
                        <td>PRO尺度の開発・検証・申請への使用基準を確立</td>
                      </tr>
                      <tr>
                        <td>PFDD ガイダンスシリーズ（2020〜）</td>
                        <td>
                          PGIC/PGISをMCID算出の必須アンカーとして明示；2009年版を段階的に代替予定
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </section>

            {/* ====================================================== SECTION 11 */}
            <section id="s11" className="sec">
              <div className="sec-hd">
                <div className="sec-num">11</div>
                <h2 className="sec-title">他の転帰指標との統合的活用</h2>
              </div>

              <div className="card">
                <h3>11.1 頭痛医学における標準転帰指標の比較</h3>
                <div className="tbl">
                  <table>
                    <thead>
                      <tr>
                        <th>尺度</th>
                        <th>略称</th>
                        <th>評価次元</th>
                        <th>項目数</th>
                        <th>MCID/カットオフ</th>
                        <th>特徴</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>
                          <strong>患者全般改善度</strong>
                        </td>
                        <td>PGIC</td>
                        <td>多面的（活動・症状・感情・QOL）</td>
                        <td>1問</td>
                        <td>スコア ≥5 （改善）</td>
                        <td>
                          最も簡便な<strong>アンカー指標</strong>。患者の満足度を包括的に反映。
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <strong>片頭痛影響テスト</strong>
                        </td>
                        <td>HIT-6</td>
                        <td>社会的機能・影響度</td>
                        <td>6問</td>
                        <td>−2.3点（実質的改善は−6点）</td>
                        <td>
                          直近4週間の影響度を測定。<strong>頭痛の機能的影響</strong>に特化。
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <strong>片頭痛機能障害評価</strong>
                        </td>
                        <td>MIDAS</td>
                        <td>就労・家庭・社会生活の損失日数</td>
                        <td>5問</td>
                        <td>≥50%削減（カットオフ値 ≥11で重症）</td>
                        <td>
                          直近3ヶ月の損失日数を評価。<strong>長期的な社会的・経済的損失</strong>
                          の指標。
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <strong>片頭痛特異的QOL</strong>
                        </td>
                        <td>MSQ v2.1</td>
                        <td>QOL（役割制限・予防的機能制限・感情影響）</td>
                        <td>14問</td>
                        <td>ドメイン毎に3.2点〜4.6点</td>
                        <td>
                          片頭痛がQOLに与える影響を多面的に評価する
                          <strong>詳細な疾患特異的PRO</strong>。
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <strong>数値評価スケール</strong>
                        </td>
                        <td>NRS / VAS</td>
                        <td>痛み強度（主観的痛み）</td>
                        <td>1問</td>
                        <td>−2.0点（または−33%）</td>
                        <td>痛みの強さを直接的かつ瞬時に評価するための標準ツール。</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="card">
                <h3>11.2 多軸評価マトリクス — 転帰指標の相補的使用</h3>
                <p>
                  臨床場面では、PGIC
                  の単独使用を避け、以下のように補完的に評価することが推奨されます：
                </p>
                <div className="mmd">
                  <div className="mmd-lbl">
                    フローチャート — 複数転帰指標による多角的治療効果評価
                  </div>
                  <MermaidDiagram
                    themeVariables={PGIC_MERMAID_THEME}
                    chart={`graph TD
Patient["患者"] --> A["PGICで評価<br/>（全体的変化感）"]
Patient --> B["HIT-6で評価<br/>（日常機能への影響）"]
Patient --> C["MIDASで評価<br/>（社会・職業的損失）"]
Patient --> D["VAS/NRSで評価<br/>（疼痛強度）"]
Patient --> E["頭痛日記で評価<br/>（頭痛日数・急性薬剤使用）"]
A --> F["統合解釈<br/>治療効果の多角的評価"]
B --> F
C --> F
D --> F
E --> F
F --> G{"目標達成確認"}`}
                  />
                </div>
                <div className="tbl">
                  <table className="th-teal">
                    <thead>
                      <tr>
                        <th>評価次元</th>
                        <th>推奨尺度</th>
                        <th>評価する問いかけ</th>
                        <th>臨床的役割</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>
                          <strong>痛みの「強さ」</strong>
                        </td>
                        <td>NRS / VAS</td>
                        <td>「現在の頭痛はどのくらい痛いですか？」</td>
                        <td>瞬間的・客観的な痛みの変化の追跡</td>
                      </tr>
                      <tr>
                        <td>
                          <strong>日常の「生活障害」</strong>
                        </td>
                        <td>HIT-6 / MIDAS</td>
                        <td>「頭痛のために仕事を休んだり、活動を制限しましたか？」</td>
                        <td>社会的・経済的な障害度合いの把握</td>
                      </tr>
                      <tr>
                        <td>
                          <strong>全体的な「変化感」</strong>
                        </td>
                        <td>PGIC</td>
                        <td>「治療を始めてから、全体的に良くなりましたか？」</td>
                        <td>患者自身の全体的満足度・治療継続意欲の予測</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="card">
                <h3>11.3 PGIC と HIT-6 の臨床的補完関係（ケーススタディ型解説）</h3>
                <div className="alert a-info">
                  <span className="alert-i">💡</span>
                  <div>
                    <strong>事例：ある慢性片頭痛患者の治療評価</strong>
                    <br />
                    ある患者が新規治療を開始し、3ヶ月後に以下の結果が得られました：
                    <ul>
                      <li>
                        <strong>月間片頭痛日数（MMD）：</strong> 15日 → 10日に減少（MMD
                        33%削減、主要RCTの基準では「無効」）
                      </li>
                      <li>
                        <strong>HIT-6 スコア：</strong> 65点 →
                        58点（−7点の低下、実質的な臨床的重要改善を達成）
                      </li>
                      <li>
                        <strong>PGIC スコア：</strong>{" "}
                        6（「良くなり、実生活で確実に価値ある改善がある」）
                      </li>
                    </ul>
                    <strong>【臨床的解釈】</strong>
                    <br />
                    日数（MMD）の削減自体は33%に留まりましたが、HIT-6
                    は大幅に改善し、患者自身も生活の質全般の改善（PGIC
                    6）を強く実感しています。この結果は、治療が「有効」であり、
                    <strong>治療方針を継続すべき</strong>であることを臨床医に示唆しています。
                  </div>
                </div>
              </div>
            </section>

            {/* ====================================================== SECTION 12 */}
            <section id="s12" className="sec">
              <div className="sec-hd">
                <div className="sec-num">12</div>
                <h2 className="sec-title">臨床実施ワークフロー</h2>
              </div>

              <div className="card">
                <h3>12.1 PGIC を組み込んだ標準的頭痛治療評価フロー</h3>
                <div className="mmd">
                  <div className="mmd-lbl">
                    フローチャート — SNOOP4 から PGIC 評価までの治療フロー
                  </div>
                  <MermaidDiagram
                    themeVariables={PGIC_MERMAID_THEME}
                    chart={`flowchart TD
Start(["新規頭痛患者 初診"]) --> S1["STEP 1：SNOOP4 スクリーニング\\n🚨 二次性頭痛・神経学的緊急事態を除外"]
S1 --> S1_Check{"SNOOP4\\n陽性？"}
S1_Check -->|"Yes"| S1_Ref["⚠️ 緊急画像検査（CT / MRI）\\n専門医紹介"]
S1_Check -->|"No"| S2["STEP 2：ベースライン評価\\n・ICHD-3 診断コード確定\\n・HIT-6 スコア記録\\n・MIDAS スコア記録\\n・VAS/NRS ピーク・平均値\\n・30日間頭痛日記開始"]
S2 --> S3["STEP 3：治療計画立案\\n急性期 + 予防 + 非薬物療法\\n（エビデンスグレードを付記）"]
S3 --> S4["STEP 4：治療開始\\nMOHリスク閾値を患者教育"]
S4 --> S5["STEP 5：Month 1〜2 経過観察\\n頭痛日記・急性薬剤使用日数モニタリング\\n副作用チェック"]
S5 --> S6["STEP 6：3ヶ月時点 主要転帰評価\\n★ PGIC 実施\\n★ HIT-6 再測定\\n★ MIDAS 再測定\\n★ MMD/MHD 集計"]
S6 --> S7{"PGIC スコア\\n評価"}
S7 -->|"スコア 5〜7 有効応答"| S8["✅ 治療継続\\n6ヶ月評価へ進む"]
S7 -->|"スコア 3〜4 部分奏効"| S9["⚡ 治療強化検討\\n・付加的介入\\n・用量調整\\n・CBT / 生体FB 追加\\n・神経ブロック検討"]
S7 -->|"スコア 1〜2 無効"| S10["🔄 治療再評価\\n・MOH確認\\n・ICHD-3コード再確認\\n・新規薬剤検討（CGRP mAb等）\\n・専門医コンサルト"]
S8 --> S11["STEP 7：6ヶ月・12ヶ月フォローアップ\\nPGIC + 全転帰指標再評価\\n長期治療維持計画立案"]
S9 --> S5
S10 --> S3
style Start fill:#e3f2fd,stroke:#0277bd
style S1_Ref fill:#ffcdd2,stroke:#c62828
style S8 fill:#c8e6c9,stroke:#2e7d32
style S9 fill:#fff9c4,stroke:#f57f17
style S10 fill:#ffcdd2,stroke:#c62828`}
                  />
                </div>
              </div>

              <div className="card">
                <h3>12.2 PGIC 実施の実践的チェックリスト</h3>
                <div className="tbl">
                  <table>
                    <thead>
                      <tr>
                        <th>項目</th>
                        <th>チェック</th>
                        <th>備考</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>評価時点の明確化（4週・12週・24週・52週）</td>
                        <td>☐</td>
                        <td>試験プロトコルまたは診療計画に明記</td>
                      </tr>
                      <tr>
                        <td>バージョンの確認（昇順型 vs 降順型）</td>
                        <td>☐</td>
                        <td>データ解析前に必ず確認</td>
                      </tr>
                      <tr>
                        <td>紙媒体またはePROでの実施</td>
                        <td>☐</td>
                        <td>臨床試験ではePRO（電子PRO）が推奨</td>
                      </tr>
                      <tr>
                        <td>患者への説明（ベースラインと比較して評価することを教示）</td>
                        <td>☐</td>
                        <td>「この治療を始める前と比べて」と明示</td>
                      </tr>
                      <tr>
                        <td>他の転帰指標（HIT-6, MIDAS）との同時評価</td>
                        <td>☐</td>
                        <td>単独使用は避け、多軸評価を実施</td>
                      </tr>
                      <tr>
                        <td>データ欠損への対応方針（imputation strategy）</td>
                        <td>☐</td>
                        <td>LOCF（最終観察値補完）等の事前規定</td>
                      </tr>
                      <tr>
                        <td>PGIC スコアの二値化基準を事前規定</td>
                        <td>☐</td>
                        <td>スコア ≥5 = favorable response と事前に明記</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </section>

            {/* ====================================================== SECTION 13 */}
            <section id="s13" className="sec">
              <div className="sec-hd">
                <div className="sec-num">13</div>
                <h2 className="sec-title">PGIC の限界点と批判的評価</h2>
              </div>

              <div className="card">
                <h3>13.1 主要な限界点</h3>
                <div className="tbl">
                  <table className="th-red">
                    <thead>
                      <tr>
                        <th>限界点</th>
                        <th>詳細</th>
                        <th>対応策</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>
                          <strong>想起バイアス（Recall Bias）</strong>
                        </td>
                        <td>患者がベースライン状態を正確に記憶できない可能性</td>
                        <td>ベースライン記録の明示・頭痛日記との併用</td>
                      </tr>
                      <tr>
                        <td>
                          <strong>反応バイアス（Response Bias）</strong>
                        </td>
                        <td>治療への期待感が「実際より良い」評価につながる</td>
                        <td>盲検化（RCT）・文脈感受性の理解</td>
                      </tr>
                      <tr>
                        <td>
                          <strong>天井効果（Ceiling Effect）</strong>
                        </td>
                        <td>治療開始時の重症度が低い患者では改善幅が小さく見える</td>
                        <td>ベースライン重症度別のサブグループ解析</td>
                      </tr>
                      <tr>
                        <td>
                          <strong>単項目の限界</strong>
                        </td>
                        <td>1問のみのため、どの側面が改善したか不明</td>
                        <td>HIT-6・MIDAS・MSQ と組み合わせ多次元評価</td>
                      </tr>
                      <tr>
                        <td>
                          <strong>言語的・文化的感受性</strong>
                        </td>
                        <td>「moderately better」等の表現が文化圏で異なる解釈をされる</td>
                        <td>各言語への適切な翻訳・認知デブリーフィング</td>
                      </tr>
                      <tr>
                        <td>
                          <strong>スコア方向の混在</strong>
                        </td>
                        <td>2つのバージョンが混在し、比較困難</td>
                        <td>論文・プロトコル確認を習慣化</td>
                      </tr>
                      <tr>
                        <td>
                          <strong>慢性疼痛での妥当性検証の限界</strong>
                        </td>
                        <td>慢性疼痛リハビリ環境での正式な妥当性評価が限られている</td>
                        <td>Journal of Pain 2009年の慢性疼痛リハビリ研究（参考文献参照）</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="card">
                <h3>13.2 PGIC の強みの再確認</h3>
                <p>上記の限界にもかかわらず、以下の強みがあるため広く採用が続いています：</p>
                <ul>
                  <li>
                    <strong>たった1問</strong> — 患者負担が最小限（所要時間 ≈ 1分）
                  </li>
                  <li>
                    <strong>包括的評価</strong> —
                    疾患特異的指標では捉えられない患者の全体的変化感を捉える
                  </li>
                  <li>
                    <strong>国際標準性</strong> —
                    FDA・EMA・主要ガイドラインで認定された規制当局公認指標
                  </li>
                  <li>
                    <strong>アンカーとしての汎用性</strong> — あらゆる転帰指標のMCID算出に使用可能
                  </li>
                </ul>
              </div>
            </section>

            {/* ====================================================== SECTION 14 */}
            <section id="s14" className="sec">
              <div className="sec-hd">
                <div className="sec-num">14</div>
                <h2 className="sec-title">参考文献・ソース一覧</h2>
              </div>

              <div className="alert a-info">
                <span className="alert-i">📚</span>
                <div>
                  <strong>ソース使用原則：</strong>{" "}
                  本ページに記載されたすべての情報は、国際的に認可された学術誌・規制当局・臨床試験データベースを出典としています。
                </div>
              </div>

              <div className="card">
                <h3>14.1 原典・基礎文献</h3>
                <div className="src-grid">
                  <div className="src">
                    <div className="src-org">NIMH（原典）</div>
                    <div className="src-t">
                      Guy, W. (1976) — ECDEU Assessment Manual for
                      Psychopharmacology（CGIスケールの原典）
                    </div>
                    <div className="src-url">※出版物（非オンライン）</div>
                  </div>
                  <div className="src">
                    <div className="src-org">Pain（2001）</div>
                    <div className="src-t">
                      Farrar JT, et al. — Clinical importance of changes in chronic pain intensity
                      measured on an 11-point numerical pain rating scale
                    </div>
                    <div className="src-url">
                      <Ext href="https://pubmed.ncbi.nlm.nih.gov/11690728/">
                        pubmed.ncbi.nlm.nih.gov/11690728
                      </Ext>
                    </div>
                  </div>
                  <div className="src">
                    <div className="src-org">Eur J Pain（2004）</div>
                    <div className="src-t">
                      Salaffi F, et al. — Minimal clinically important changes in chronic
                      musculoskeletal pain（NRSとPGICによるMCID定義）
                    </div>
                    <div className="src-url">
                      <Ext href="https://onlinelibrary.wiley.com/doi/10.1016/j.ejpain.2003.09.004">
                        onlinelibrary.wiley.com/doi/10.1016/j.ejpain.2003.09.004
                      </Ext>
                    </div>
                  </div>
                </div>
              </div>

              <div className="card">
                <h3>14.2 規制当局ガイダンス</h3>
                <div className="src-grid">
                  <div className="src">
                    <div className="src-org">FDA（2009）</div>
                    <div className="src-t">
                      Guidance for Industry: Patient-Reported Outcome Measures — Use in Medical
                      Product Development to Support Labeling Claims（最終版）
                    </div>
                    <div className="src-url">
                      <Ext href="https://www.federalregister.gov/documents/2009/12/09/E9-29273/guidance-for-industry-on-patient-reported-outcome-measures-use-in-medical-product-development-to">
                        federalregister.gov（E9-29273）
                      </Ext>
                    </div>
                  </div>
                  <div className="src">
                    <div className="src-org">FDA（公式PDF）</div>
                    <div className="src-t">PRO Guidance 本文（FDA公式）</div>
                    <div className="src-url">
                      <Ext href="https://www.fda.gov/media/77832/download">
                        fda.gov/media/77832/download
                      </Ext>
                    </div>
                  </div>
                  <div className="src">
                    <div className="src-org">FDA PFDD</div>
                    <div className="src-t">
                      Patient-Focused Drug Development Guidance Series for Enhancing the
                      Incorporation of the Patient&apos;s Voice
                    </div>
                    <div className="src-url">
                      <Ext href="https://www.fda.gov/drugs/development-approval-process-drugs/fda-patient-focused-drug-development-guidance-series-enhancing-incorporation-patients-voice-medical">
                        fda.gov/drugs/…/fda-patient-focused-drug-development-guidance-series
                      </Ext>
                    </div>
                  </div>
                </div>
              </div>

              <div className="card">
                <h3>14.3 CGRP / 片頭痛関連臨床文献</h3>
                <div className="src-grid">
                  <div className="src">
                    <div className="src-org">Ann Clin Transl Neurol（2025）</div>
                    <div className="src-t">
                      Romozzi M, et al. — PGIC Score Compared to Monthly Migraine Days to Evaluate
                      Treatment Persistence With Anti-CGRP Monoclonal Antibodies
                    </div>
                    <div className="src-url">
                      <Ext href="https://onlinelibrary.wiley.com/doi/10.1002/acn3.70053">
                        onlinelibrary.wiley.com/doi/10.1002/acn3.70053
                      </Ext>{" "}
                      / <Ext href="https://pubmed.ncbi.nlm.nih.gov/40244898/">PubMed 40244898</Ext>
                    </div>
                  </div>
                  <div className="src">
                    <div className="src-org">J Headache Pain（2022）</div>
                    <div className="src-t">
                      RELIEF 試験 — Eptinezumab treatment initiated during a migraine
                      attack（PGIC含む副次結果）
                    </div>
                    <div className="src-url">
                      <Ext href="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC8903522/">
                        ncbi.nlm.nih.gov/pmc/articles/PMC8903522
                      </Ext>
                    </div>
                  </div>
                  <div className="src">
                    <div className="src-org">ClinicalTrials.gov</div>
                    <div className="src-t">
                      HALO CM 試験（フレマネズマブ）NCT02621931 — PGIC採用仕様
                    </div>
                    <div className="src-url">
                      <Ext href="https://clinicaltrials.gov/study/NCT02621931">
                        clinicaltrials.gov/study/NCT02621931
                      </Ext>
                    </div>
                  </div>
                  <div className="src">
                    <div className="src-org">ClinicalTrials.gov</div>
                    <div className="src-t">ARISE 試験（エレヌマブ）NCT02483585 — PGIC採用仕様</div>
                    <div className="src-url">
                      <Ext href="https://clinicaltrials.gov/study/NCT02483585">
                        clinicaltrials.gov/study/NCT02483585
                      </Ext>
                    </div>
                  </div>
                </div>
              </div>

              <div className="card">
                <h3>14.4 頭痛ガイドライン（PGIC採用文脈）</h3>
                <div className="src-grid">
                  <div className="src">
                    <div className="src-org">IHS / Cephalalgia（2024）</div>
                    <div className="src-t">IHS Acute Treatment Recommendations 2024</div>
                    <div className="src-url">
                      <Ext href="https://journals.sagepub.com/doi/10.1177/03331024241252666">
                        journals.sagepub.com/doi/10.1177/03331024241252666
                      </Ext>
                    </div>
                  </div>
                  <div className="src">
                    <div className="src-org">EHF（2022）</div>
                    <div className="src-t">CGRP mAbs 予防療法ガイドライン — PGIC使用文脈を含む</div>
                    <div className="src-url">
                      <Ext href="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC9188162/">
                        ncbi.nlm.nih.gov/pmc/articles/PMC9188162
                      </Ext>
                    </div>
                  </div>
                  <div className="src">
                    <div className="src-org">AAN（2024草案）</div>
                    <div className="src-t">
                      Pharmacologic Treatment for Migraine Prevention in Adults（草案）
                    </div>
                    <div className="src-url">
                      <Ext href="https://www.aan.com/siteassets/home-page/policy-and-guidelines/guidelines/guidelines-and-measures-open-for-public-comment/24-pharmacologic-treatment-for-migraine-prevention-in-adults_draft_08-14-2024.pdf">
                        aan.com（migraine prevention draft, 2024）
                      </Ext>
                    </div>
                  </div>
                  <div className="src">
                    <div className="src-org">ICHD-3</div>
                    <div className="src-t">頭痛疾患国際分類 第3版（診断コード体系）</div>
                    <div className="src-url">
                      <Ext href="https://ichd-3.org/">ichd-3.org</Ext>
                    </div>
                  </div>
                </div>
              </div>

              <div className="card">
                <h3>14.5 転帰測定・心理測定参考文献</h3>
                <div className="src-grid">
                  <div className="src">
                    <div className="src-org">J Pain（2009）</div>
                    <div className="src-t">
                      Patient global impression of change scores within the context of a chronic
                      pain rehabilitation program
                    </div>
                    <div className="src-url">
                      <Ext href="https://www.jpain.org/article/S1526-5900(09)00269-7/fulltext">
                        jpain.org/article/S1526-5900(09)00269-7
                      </Ext>
                    </div>
                  </div>
                  <div className="src">
                    <div className="src-org">PubMed</div>
                    <div className="src-t">PGIC関連の最新臨床試験検索（頭痛・片頭痛）</div>
                    <div className="src-url">
                      <Ext href="https://pubmed.ncbi.nlm.nih.gov/?term=PGIC+migraine+headache&filter=pubt.clinicaltrial">
                        pubmed.ncbi.nlm.nih.gov（PGIC migraine headache）
                      </Ext>
                    </div>
                  </div>
                  <div className="src">
                    <div className="src-org">Cochrane Library</div>
                    <div className="src-t">頭痛・片頭痛関連コクランレビュー一覧</div>
                    <div className="src-url">
                      <Ext href="https://www.cochranelibrary.com/search?query=headache+migraine&searchBy=3&type=cdsr">
                        cochranelibrary.com（headache migraine）
                      </Ext>
                    </div>
                  </div>
                </div>
              </div>

              <div className="alert a-warn">
                <span className="alert-i">📅</span>
                <div>
                  文書バージョン：1.0 ｜ 作成：2026年6月 ｜
                  対象読者：頭痛医学初学者〜中級者、臨床研究者、神経科・ペインクリニック専門医 ｜
                  エビデンス最終確認：2025年（Romozzi et al. 2025 を含む）
                </div>
              </div>
            </section>
          </AutoGlossary>
        </main>
      </div>
      {/* end layout */}

      {/* FOOTER */}
      <div className="footer">
        <strong>PGIC（Patient Global Impression of Change）— 患者全般改善度</strong> —
        理論・実践・頭痛医学への応用｜初学者向けステップバイステップ解説
        <br />📅 作成年: 2026 | 次回レビュー推奨: ガイドライン更新時
        <br />
        ⚠️
        本資料は学術・教育・研究目的のみを対象としています。臨床への適用は必ず資格を持つ医療専門家の監督のもとで行ってください。
      </div>
    </div>
  );
}
