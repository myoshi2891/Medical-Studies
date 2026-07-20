import { Ext } from "@/components/Ext";
import MermaidDiagram from "@/components/MermaidDiagram";
import { AthSidebar } from "@/components/treatment/AthSidebar";
import "./acute-treatment-of-headache.css";

const ATH_MERMAID_THEME = {
  primaryColor: "#e0f7fa",
  primaryTextColor: "#01579b",
  primaryBorderColor: "#0277bd",
  lineColor: "#0277bd",
  secondaryColor: "#e0f2f1",
  tertiaryColor: "#e8f5e9",
  edgeLabelBackground: "#ffffff",
  fontSize: "13px",
};

export default function AcuteTreatmentOfHeadachePage() {
  return (
    <div className="acute-treatment-of-headache">
      {/* HERO */}
      <div className="hero">
        <div style={{ fontSize: 40 }}>💊🧠</div>
        <h1>頭痛の急性期治療の考え方</h1>
        <p className="hero-sub">薬効群の総論と治療戦略 ― 階層化治療・早期服薬の原則・MOH予防</p>
        <div className="hero-tags">
          <span className="hero-tag">ICHD-3</span>
          <span className="hero-tag">AHS Consensus 2021</span>
          <span className="hero-tag">EHF</span>
          <span className="hero-tag">NICE CG150</span>
          <span className="hero-tag">Cochrane Library</span>
          <span className="hero-tag">頭痛の診療ガイドライン2021</span>
        </div>
      </div>

      {/* DISCLAIMER */}
      <div className="disclaimer">
        <strong>⚠️ Academic Disclaimer（学術免責事項）</strong>　本資料は<strong>学術・教育・研究目的のみ</strong>を対象としています。すべての内容は資格を持つ医療専門家による臨床適用前のレビューが必要です。個人的な医療アドバイス・診断・処方を提供するものではありません。
      </div>

      {/* LAYOUT */}
      <div className="layout">
        {/* SIDEBAR */}
        <AthSidebar />

        {/* MAIN CONTENT */}
        <main className="main">
          {/* ====================================================== SECTION 1 */}
          <section id="s1" className="sec">
            <div className="sec-hd">
              <div className="sec-num">1</div>
              <h2>はじめに</h2>
            </div>

            <div className="alert a-warn">
              <div className="alert-i">📘</div>
              <div>
                <strong>本ページは教育目的であり、個別の治療推奨ではありません。</strong>
                頭痛の診断・治療方針は、必ず医師・薬剤師にご相談のうえ決定してください。
                本資料に記載する医薬品の情報は、一般的な薬効群としての作用機序・国際的な位置づけを解説するものであり、
                個々の患者に対する用法・用量を指示するものではありません。
                有効性・安全性に関する記述は、公表されているガイドライン・システマティックレビュー等のエビデンスの質を示すものであり、
                効果を断定・保証するものではありません。
              </div>
            </div>

            <div className="card">
              <p>
                本ページは、頭痛（主に片頭痛）の<strong>急性期治療</strong>（発作が起きたときの治療）について、
                初学者にも理解できるよう、国際的に認知されたガイドライン・システマティックレビューに基づいて整理したものです。
                対象とする薬効群は以下の5つです。
              </p>
              <ol>
                <li>アセトアミノフェン（paracetamol）</li>
                <li>NSAIDs（非ステロイド性抗炎症薬）</li>
                <li>トリプタン（triptan）</li>
                <li>ジタン（ditan、5-HT1F受容体作動薬）</li>
                <li>ゲパント（gepant、CGRP受容体拮抗薬）</li>
              </ol>
              <p>
                あわせて、<strong>階層化治療（stratified care）</strong>と<strong>早期服薬の原則</strong>
                という2つの重要な治療戦略の考え方、および<strong>薬剤の使用過多による頭痛（MOH: Medication-Overuse Headache）</strong>
                の予防についても解説します。
              </p>
              <p>
                本資料は、日本頭痛学会「頭痛の診療ガイドライン2021」、国際頭痛学会（IHS）による国際頭痛分類第3版（ICHD-3）、
                米国頭痛学会（AHS）コンセンサス声明、欧州頭痛連合（EHF）の見解、英国NICEガイドライン、
                Cochrane Libraryのシステマティックレビューなど、一次情報を優先して作成しています。
              </p>
            </div>

            <div className="alert a-info">
              <div className="alert-i">🏷️</div>
              <div>
                <strong>一般名の使用について</strong>：本資料では医薬品を一般名（成分名）または薬効群名で記載することを原則とし、
                商品名は必要な場合にのみ中立的に併記します。特定の商品名を推奨したり、優劣を主張したりするものではありません。
              </div>
            </div>

            <h3>エビデンスバッジの見方</h3>
            <p>
              本ページでは、各薬効群・各知見のエビデンスの質を、以下のバッジで大まかに示します。
              効果を保証するものではなく、あくまで公表文献における相対的な確からしさの目安です。
            </p>
            <div className="card">
              <p>
                <span className="bA">A：質の高いエビデンス</span>　システマティックレビュー・複数のRCTで一貫した結果
                <br />
                <br />
                <span className="bB">B：中等度のエビデンス</span>　良質なRCTがあるが限定的、または結果に一部不一致
                <br />
                <br />
                <span className="bC">C：限定的なエビデンス</span>　小規模試験・観察研究が中心、確実性は高くない
                <br />
                <br />
                <span className="bU">U：未確立／今後の検証課題</span>　実臨床データの蓄積中、長期的な結論は未確定
              </p>
            </div>
          </section>

          {/* ====================================================== SECTION 2 */}
          <section id="s2" className="sec">
            <div className="sec-hd">
              <div className="sec-num">2</div>
              <h2>治療戦略：階層化治療と段階的治療</h2>
            </div>

            <p>
              急性期治療とは、頭痛発作が実際に起きたときに、その発作を止める（または軽減する）ために用いる治療のことです。
              頭痛発作が起きる前に頻度・重症度そのものを減らす「予防（発症抑制）療法」とは目的が異なります。
              本ページは前者（急性期治療）に焦点を当てます。
            </p>

            <p>片頭痛の急性期治療をどう組み立てるかについては、歴史的に2つの戦略が提唱されてきました。</p>

            <div className="tbl">
              <table>
                <thead>
                  <tr>
                    <th>戦略</th>
                    <th>考え方</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <strong>段階的治療</strong>
                      <br />
                      stepped care
                    </td>
                    <td>
                      発作の重症度によらず、まずアセトアミノフェンやNSAIDsのような非特異的な鎮痛薬から治療を開始し、
                      効果が不十分な場合に、発作の中で（within attack）あるいは複数回の発作を経て（across attacks）、
                      トリプタンのような片頭痛特異的治療へ段階的に引き上げていく方法。
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <strong>階層化治療</strong>
                      <br />
                      stratified care
                    </td>
                    <td>
                      治療を開始する前に、その患者の頭痛関連障害度（MIDASスコアなど）や症状の重症度を評価し、
                      軽度であれば非特異的治療を、中等度から重度であれば最初から片頭痛特異的治療（トリプタンなど）を選択する方法。
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p>
              この2つの戦略を比較した代表的な研究が、Lipton らによる<strong>DISC試験（Disability in Strategies of Care Study）</strong>
              です（<em>JAMA</em>, 2000）。13か国・88施設が参加したこの無作為化比較試験では、階層化治療が段階的治療と比較して、
              頭痛の消失率や機能障害を伴う時間の短縮において統計学的に優れた結果を示し、費用対効果の面でも優れているという分析結果が報告されています。
              一方で、階層化治療群では有害事象がやや多く報告された点も併記されています。{" "}
              <span className="bB">B</span>
            </p>

            <div className="alert a-info">
              <div className="alert-i">🌍</div>
              <div>
                その後、欧州頭痛連合（EHF）の実践的な立場（Eigenbrodtら, <em>Nat Rev Neurol</em>, 2021 等）では、
                臨床現場での実施しやすさや経済性の観点から、段階的治療（特に発作内での2時間以内の反応評価に基づく引き上げ、
                または3回の連続した発作での評価に基づく引き上げ）を支持する見解も示されており、
                <strong>国際的に単一の「正解」が定まっているわけではありません。</strong>
                実務上は、患者の頭痛関連障害度、併存疾患、費用、アクセスのしやすさなどを総合的に考慮して、
                医師が個別に治療方針を組み立てます。
              </div>
            </div>

            <div className="mmd">
              <div className="mmd-lbl">フローチャート — 段階的治療 vs 階層化治療</div>
              <MermaidDiagram
                themeVariables={ATH_MERMAID_THEME}
                chart={`flowchart TD
A["片頭痛発作の治療戦略をどう組み立てるか"] --> B{"段階的治療 stepped care"}
A --> C{"階層化治療 stratified care"}
B --> D["まず非特異的治療 アセトアミノフェンやNSAIDsで開始"]
D --> E{"発作内または発作間で効果は十分か"}
E -->|不十分| F["片頭痛特異的治療 トリプタン等へ段階的に移行"]
E -->|十分| G["同じ治療を継続"]
C --> H["頭痛関連障害度を評価 MIDAS等の尺度を使用"]
H --> I{"障害度の程度は"}
I -->|軽度| J["非特異的治療を選択"]
I -->|中等度から重度| K["片頭痛特異的治療を最初から選択"]`}
              />
            </div>

            <div className="src-grid">
              <div className="src">
                <div className="src-org">Primary Source</div>
                <div className="src-t">
                  Lipton RB, et al. Stratified care vs step care strategies for migraine: the DISC study.
                  JAMA. 2000;284(20):2599-2605.
                </div>
                <div className="src-url">
                  <Ext href="https://pubmed.ncbi.nlm.nih.gov/11086366/">
                    https://pubmed.ncbi.nlm.nih.gov/11086366/
                  </Ext>
                </div>
              </div>
              <div className="src">
                <div className="src-org">Secondary Source</div>
                <div className="src-t">
                  Neurotorium — Strategies for acute treatment of migraine in adults
                </div>
                <div className="src-url">
                  <Ext href="https://neurotorium.org/slidedeck/migraine-treatment-principles/slide/9-migraine-treatment-principles/">
                    https://neurotorium.org/slidedeck/migraine-treatment-principles/slide/9-migraine-treatment-principles/
                  </Ext>
                </div>
              </div>
            </div>
          </section>

          {/* ====================================================== SECTION 3 */}
          <section id="s3" className="sec">
            <div className="sec-hd">
              <div className="sec-num">3</div>
              <h2>早期服薬の原則</h2>
            </div>

            <p>
              急性期治療のもう一つの重要な原則が「<strong>早期に治療する</strong>」という考え方です。
              これは、片頭痛発作の病態生理に基づく仮説によって支持されています。
            </p>

            <p>
              片頭痛発作が進行すると、末梢の三叉神経終末の感作（末梢性感作）に続いて、
              脳幹・視床レベルでの中枢性感作が生じると考えられています。
              この中枢性感作が臨床的に現れたものが「<strong>皮膚アロディニア（cutaneous allodynia）</strong>」、
              すなわち本来は痛みを伴わない刺激（髪をとかす、眼鏡をかけるなど）を痛みとして感じる状態です。
              Rami Bursteinらの基礎的知見によれば、いったんアロディニアが成立した段階でトリプタンを投与しても、
              痛みを十分に消失させることが難しくなる可能性が示唆されています。
            </p>

            <h3>発作進行の4段階と治療機会の窓</h3>
            <div className="phase-grid">
              <div className="ph ph1">
                <div className="ph-icon">🌤️</div>
                <div className="ph-title">前兆・予兆期</div>
                <div className="ph-time">発症前</div>
                <div className="ph-desc">倦怠感・気分変化・首のこわばりなど前駆症状が出現しうる段階</div>
              </div>
              <div className="ph ph2">
                <div className="ph-icon">🙂</div>
                <div className="ph-title">頭痛発症（軽度）</div>
                <div className="ph-time">発症〜1時間程度</div>
                <div className="ph-desc">痛みはまだ軽度。治療機会の窓が広いとされる段階</div>
              </div>
              <div className="ph ph3">
                <div className="ph-icon">😣</div>
                <div className="ph-title">末梢性・中枢性感作</div>
                <div className="ph-time">発症後、時間経過とともに</div>
                <div className="ph-desc">皮膚アロディニアが出現しうる。治療反応性が低下しうるとされる段階</div>
              </div>
              <div className="ph ph4">
                <div className="ph-icon">💊</div>
                <div className="ph-title">早期服薬の考え方</div>
                <div className="ph-time">原則の適用</div>
                <div className="ph-desc">アロディニア成立前、痛みが軽度な段階での服薬が有利とされる</div>
              </div>
            </div>

            <p>
              この仮説を背景として、複数の臨床試験が「発作の早期（痛みがまだ軽度な段階、目安として発症から1時間以内）に治療した場合」と
              「発作が進行してから（痛みが中等度から重度になってから）治療した場合」の効果を比較しています。
              代表的な研究の一つがフランスの<strong>TEMPO試験</strong>です。
              通常は治療のタイミングが遅い（発症から1時間以上経過してから服薬する）患者に、早期服薬（発症から1時間以内）へ切り替えてもらったところ、
              2時間後の痛み消失率は早期服薬群で52.8％、通常（遅い）服薬群で30.2％と、統計学的に有意な差が報告されています。{" "}
              <span className="bB">B</span>
            </p>

            <div className="alert a-purple">
              <div className="alert-i">🧪</div>
              <div>
                ただし、この分野のエビデンスは一様ではありません。研究デザインが不均一であること、
                早期治療による治療上の利得（therapeutic gain）が必ずしも明確でない研究もあること、
                また理論的には早期治療の推奨が薬剤の使用過多（後述するMOH）を助長しうる可能性も指摘されており、
                「早期服薬が望ましい」という考え方自体は複数のガイドライン・総説で広く支持されているものの、
                <strong>個々の患者にとって「どの段階で」「何を」服薬すべきかは、医師との相談のうえで決めるべき事項</strong>です。{" "}
                <span className="bU">U</span>
              </div>
            </div>

            <div className="mmd">
              <div className="mmd-lbl">フローチャート — 発作進行と治療機会の窓</div>
              <MermaidDiagram
                themeVariables={ATH_MERMAID_THEME}
                chart={`flowchart LR
A["前兆 予兆期"] --> B["頭痛発症 痛みはまだ軽度"]
B --> C["末梢性感作の進行"]
C --> D["中枢性感作の成立 皮膚アロディニアの出現"]
D --> E["痛みが増悪し治療反応性が低下しうる"]
B -.->|治療機会の窓が広い段階| F["この段階での服薬が有利とされる"]
D -.->|治療機会の窓が狭まる段階| G["トリプタン等の効果が減弱しうるとされる"]`}
              />
            </div>

            <h3>治療のゴール設定</h3>
            <p>
              国際頭痛学会（IHS）が提唱する急性期治療のアウトカム評価では、一般に以下のような指標が用いられます。
            </p>
            <div className="tbl">
              <table>
                <thead>
                  <tr>
                    <th>評価指標</th>
                    <th>内容</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>2時間後の疼痛消失</td>
                    <td>治療開始から2時間後に頭痛が完全に消失しているか（pain-free at 2 hours）</td>
                  </tr>
                  <tr>
                    <td>2時間後の疼痛改善</td>
                    <td>中等度〜重度の痛みが軽度以下に軽減しているか（pain relief at 2 hours）</td>
                  </tr>
                  <tr>
                    <td>24時間以内の再発の有無</td>
                    <td>一度改善した頭痛が24時間以内にぶり返していないか</td>
                  </tr>
                  <tr>
                    <td>最も煩わしい随伴症状の消失</td>
                    <td>悪心・光過敏・音過敏などの随伴症状の改善</td>
                  </tr>
                  <tr>
                    <td>通常の活動への復帰</td>
                    <td>日常生活・就業への支障がどの程度解消したか</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p>
              これらの指標は、次章で解説する薬効群ごとのエビデンス（Cochraneシステマティックレビュー等のNNT＝治療必要数など）を
              理解するうえでの共通言語になります。
            </p>

            <div className="src-grid">
              <div className="src">
                <div className="src-org">Primary Source</div>
                <div className="src-t">
                  Lantéri-Minet M, et al. Early dosing and efficacy of triptans in acute migraine treatment:
                  the TEMPO study. Cephalalgia. 2012.
                </div>
                <div className="src-url">
                  <Ext href="https://journals.sagepub.com/doi/10.1177/0333102411433042">
                    https://journals.sagepub.com/doi/10.1177/0333102411433042
                  </Ext>
                </div>
              </div>
              <div className="src">
                <div className="src-org">Secondary Source</div>
                <div className="src-t">
                  Burstein R, et al. Migraine headaches and allodynia: early use of triptans to improve outcome (Medscape解説)
                </div>
                <div className="src-url">
                  <Ext href="https://www.medscape.org/viewarticle/460306_6">
                    https://www.medscape.org/viewarticle/460306_6
                  </Ext>
                </div>
              </div>
              <div className="src">
                <div className="src-org">Emerging Evidence</div>
                <div className="src-t">
                  PRODROME試験（ウブロゲパント、前駆期治療の探索的知見）Nature Medicine, 2025年5月
                </div>
                <div className="src-url">
                  <Ext href="https://academia.carenet.com/share/news/715e530a-e053-4245-9cda-2ae89f2967bb">
                    https://academia.carenet.com/share/news/715e530a-e053-4245-9cda-2ae89f2967bb
                  </Ext>
                </div>
              </div>
            </div>
          </section>

          {/* ====================================================== SECTION 4 */}
          <section id="s4" className="sec">
            <div className="sec-hd">
              <div className="sec-num">4</div>
              <h2>薬効群各論：作用機序と国際的な位置づけ</h2>
            </div>

            <div className="alert a-warn">
              <div className="alert-i">📘</div>
              <div>
                <strong>本セクションについての注記</strong>：以下は各薬効群の作用機序と、
                国際的なガイドライン・コンセンサス声明における一般的な位置づけを解説するものであり、
                個別の患者への処方・用法用量を指示するものではありません。実際の薬剤選択・使用量は、必ず医師・薬剤師にご相談ください。
                また、有効性・安全性に関する記述は、公表されているエビデンスの質を示すものであり、効果を保証するものではありません。
              </div>
            </div>

            <h3>5つの薬効群 — 概要</h3>
            <div className="drug-grid">
              <div className="drug">
                <div className="drug-nm">アセトアミノフェン</div>
                <div className="drug-br">acetaminophen / paracetamol</div>
                <div className="drug-tx">非オピオイド系の鎮痛薬。血管収縮作用なし。禁忌・不耐容例での選択肢。</div>
              </div>
              <div className="drug">
                <div className="drug-nm">NSAIDs</div>
                <div className="drug-br">非ステロイド性抗炎症薬</div>
                <div className="drug-tx">COX阻害。血管収縮作用なし。非特異的治療の中心的存在。</div>
              </div>
              <div className="drug">
                <div className="drug-nm">トリプタン</div>
                <div className="drug-br">triptan</div>
                <div className="drug-tx">5-HT1B/1D受容体作動薬。血管収縮作用あり。片頭痛特異的治療の中心。</div>
              </div>
              <div className="drug">
                <div className="drug-nm">ジタン</div>
                <div className="drug-br">ditan（5-HT1F作動薬）</div>
                <div className="drug-tx">血管収縮作用を実質的に持たない片頭痛特異的治療薬。</div>
              </div>
              <div className="drug">
                <div className="drug-nm">ゲパント</div>
                <div className="drug-br">gepant（CGRP受容体拮抗薬）</div>
                <div className="drug-tx">CGRP受容体を阻害。血管収縮という機序を介さない。</div>
              </div>
            </div>

            <h3>2.1 アセトアミノフェン（acetaminophen／paracetamol）</h3>
            <p>
              アセトアミノフェンは、片頭痛・緊張型頭痛のいずれに対しても、非オピオイド系の鎮痛薬として一般に用いられる薬効群です。
              正確な作用機序は完全には解明されていませんが、中枢神経系におけるプロスタグランジン合成の抑制や、
              下行性疼痛抑制系への関与などが想定されています。NSAIDsと異なり末梢での抗炎症作用は乏しいとされています。
            </p>
            <p>
              Cochrane Libraryのシステマティックレビュー（Derry S, et al., 2016年更新版）では、
              成人の急性期片頭痛を対象とした二重盲検無作為化比較試験11件（参加者2,942名、4,062発作以上）を統合解析した結果、
              単回投与量のアセトアミノフェンはプラセボと比較して統計学的に有意な鎮痛効果を示し、
              2時間後の疼痛消失に関するNNT（治療必要数）は12（アセトアミノフェン群で19％、プラセボ群で10％が奏効）と報告されています。
              同レビューでは、費用が安く入手しやすいことから、NSAIDsやアスピリンに対する禁忌・不耐容がある患者にとって有用な第一選択となりうる、
              との考察がなされています。 <span className="bA">A</span>
            </p>
            <div className="alert a-info">
              <div className="alert-i">👶</div>
              <div>
                一方、小児・思春期を対象としたCochraneレビュー（2016年）では、
                アセトアミノフェンの有効性を示すエビデンスは限定的（該当する小規模試験が1件のみ）とされており、
                <strong>年齢層によってエビデンスの確実性が異なる</strong>点にも注意が必要です。{" "}
                <span className="bC">C</span>
              </div>
            </div>
            <div className="src-grid">
              <div className="src">
                <div className="src-org">Cochrane Systematic Review</div>
                <div className="src-t">
                  Derry S, Moore RA. Paracetamol (acetaminophen) with or without an antiemetic for acute migraine headaches in adults.
                </div>
                <div className="src-url">
                  <Ext href="https://www.cochrane.org/evidence/CD008040_paracetamol-acetaminophen-or-without-antiemetic-acute-migraine-adults">
                    https://www.cochrane.org/evidence/CD008040_paracetamol-acetaminophen-or-without-antiemetic-acute-migraine-adults
                  </Ext>
                </div>
              </div>
              <div className="src">
                <div className="src-org">Cochrane Systematic Review</div>
                <div className="src-t">
                  Richer L, et al. Drugs for the acute treatment of migraine in children and adolescents.
                </div>
                <div className="src-url">
                  <Ext href="https://www.cochrane.org/about-us/news/featured-review-drugs-acute-treatment-migraine-children-and-adolescents">
                    https://www.cochrane.org/about-us/news/featured-review-drugs-acute-treatment-migraine-children-and-adolescents
                  </Ext>
                </div>
              </div>
            </div>

            <h3>2.2 NSAIDs（非ステロイド性抗炎症薬）</h3>
            <p>
              NSAIDsは、シクロオキシゲナーゼ（COX）を阻害してプロスタグランジン合成を抑制することで、
              末梢および中枢の疼痛・炎症経路に作用する薬効群です。
              片頭痛の急性期治療における非特異的治療薬（migraine-nonspecific agent）として、
              国際的に広く一般に用いられています。
            </p>
            <p>
              Cochraneのシステマティックレビュー（イブプロフェンに関するRabbie R, et al.）では、
              単回投与量のイブプロフェンがプラセボと比較して統計学的に有意な鎮痛効果を示し、
              2時間後の疼痛消失に関して約26％（プラセボ群約12％）、
              疼痛改善（中等度・重度から軽度以下への軽減）については約57％（プラセボ群約25％）という結果が報告されています。
              アスピリン（900〜1000mg相当 of 単回投与を検討した別のCochraneレビュー、Kirthi V, et al., 2013年）についても、
              イブプロフェン400mgと同程度の有効性が報告されています。 <span className="bA">A</span>
            </p>
            <p>
              日本頭痛学会「頭痛の診療ガイドライン2021」では、片頭痛急性期治療薬としてのトリプタンとNSAIDsの文献比較した結果、
              トリプタンの方が2時間後の頭痛消失率が有意に高く、24時間以内の再発率が低いという分析結果が示されている一方、
              有害事象はトリプタンでやや多く（重篤なものはなし）、GRADE方式による総合評価の結果、
              トリプタンが使用できない患者を適切に除外したうえで、NSAIDsを含む非特異的治療も一般的な急性期治療の選択肢として位置づけられています。{" "}
              <span className="bB">B</span>
            </p>
            <div className="src-grid">
              <div className="src">
                <div className="src-org">Cochrane Systematic Review</div>
                <div className="src-t">
                  Rabbie R, Derry S, Moore RA. Ibuprofen with or without an antiemetic for acute migraine headaches in adults.
                </div>
                <div className="src-url">
                  <Ext href="https://www.cochrane.org/evidence/CD008039_ibuprofen-or-without-antiemetic-acute-migraine-headaches-adults">
                    https://www.cochrane.org/evidence/CD008039_ibuprofen-or-without-antiemetic-acute-migraine-headaches-adults
                  </Ext>
                </div>
              </div>
              <div className="src">
                <div className="src-org">国内ガイドライン（二次情報）</div>
                <div className="src-t">日本頭痛学会「頭痛の診療ガイドライン2021」概要（ケアネット）</div>
                <div className="src-url">
                  <Ext href="https://www.carenet.com/news/general/carenet/53578">
                    https://www.carenet.com/news/general/carenet/53578
                  </Ext>
                </div>
              </div>
            </div>

            <h3>2.3 トリプタン（triptan）</h3>
            <p>
              トリプタンは、セロトニン5-HT1B/1D受容体に選択的に結合するアゴニスト（作動薬）であり、
              片頭痛に特異的な急性期治療薬（migraine-specific agent）として国際的に第一選択薬の一つに位置づけられています。
              国内ではスマトリプタン、ゾルミトリプタン、リザトリプタン、エレトリプタン、ナラトリプタンなどが承認されています。
            </p>
            <p>作用機序として、一般に以下の3つの経路が想定されています。</p>
            <div className="tbl">
              <table>
                <thead>
                  <tr>
                    <th>機序</th>
                    <th>内容</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>①頭蓋血管の収縮</td>
                    <td>血管平滑筋上の5-HT1B受容体を刺激することにより、片頭痛発作時に拡張した頭蓋外硬膜血管を収縮させる</td>
                  </tr>
                  <tr>
                    <td>②末梢神経終末でのペプチド放出抑制</td>
                    <td>三叉神経終末上の5-HT1D受容体を刺激し、CGRP・サブスタンスPなどの神経ペプチド遊離を抑制する</td>
                  </tr>
                  <tr>
                    <td>③中枢における痛覚伝達の抑制</td>
                    <td>脳幹レベルでの二次ニューロンへの痛覚伝達を抑制する</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="alert a-danger">
              <div className="alert-i">🚫</div>
              <div>
                血管収縮作用を伴うことから、虚血性心疾患、脳血管障害、コントロール不良の高血圧、片麻痺性片頭痛、
                脳幹性前兆を伴う片頭痛などでは、一般に使用が推奨されない、あるいは禁忌とされています（日本頭痛学会ガイドライン2021, CQ II-2-3付帯事項）。
                個々の適否は必ず医師が判断します。
              </div>
            </div>
            <p>
              米国頭痛学会（AHS）の2021年コンセンサス声明では、トリプタンの処方を受けた患者のうち約30％が効果不十分（insufficient response）
              であったと報告されており、初回のトリプタンが無効であった場合に別のトリプタンへ変更することの有効性については、
              エビデンスが十分に確立していないとされています。このような背景から、後述するジタン・ゲパントという新しい薬効群が開発されてきました。{" "}
              <span className="bB">B</span>
            </p>
            <div className="src-grid">
              <div className="src">
                <div className="src-org">Primary Source</div>
                <div className="src-t">Triptans - StatPearls, NCBI Bookshelf</div>
                <div className="src-url">
                  <Ext href="https://www.ncbi.nlm.nih.gov/books/NBK554507/">
                    https://www.ncbi.nlm.nih.gov/books/NBK554507/
                  </Ext>
                </div>
              </div>
              <div className="src">
                <div className="src-org">AHS Consensus Statement</div>
                <div className="src-t">Ailani J, et al. The American Headache Society Consensus Statement 2021. Headache.</div>
                <div className="src-url">
                  <Ext href="https://headachejournal.onlinelibrary.wiley.com/doi/10.1111/head.14153">
                    https://headachejournal.onlinelibrary.wiley.com/doi/10.1111/head.14153
                  </Ext>
                </div>
              </div>
              <div className="src">
                <div className="src-org">国内ガイドライン</div>
                <div className="src-t">日本頭痛学会「頭痛の診療ガイドライン2021」</div>
                <div className="src-url">
                  <Ext href="https://www.jhsnet.net/guideline.html">
                    https://www.jhsnet.net/guideline.html
                  </Ext>
                </div>
              </div>
            </div>

            <h3>2.4 ジタン（ditan、5-HT1F受容体作動薬）</h3>
            <p>
              ジタンは、セロトニン5-HT1F受容体に選択的に作用するアゴニストであり、
              トリプタンとは異なり5-HT1B受容体への作用が乏しいため、<strong>血管収縮作用を実質的に持たない</strong>
              片頭痛特異的治療薬として位置づけられています。
              この特性から、心血管系リスクを理由にトリプタンの使用が避けられる患者にとっての選択肢として国際的に議論されています。
            </p>
            <p>
              代表的な成分にラスミジタンがあり、国内では「片頭痛」を効能・効果として2022年1月に製造販売承認され、同年6月に発売されています。
              作用機序としては、三叉神経系における5-HT1F受容体を介して、CGRPをはじめとする神経ペプチドのシナプス前放出や
              cAMPシグナル伝達を抑制すると考えられています。
            </p>
            <div className="alert a-warn">
              <div className="alert-i">😵</div>
              <div>
                血管収縮作用がない一方で、中枢神経系への作用によりめまい・傾眠などの副作用が報告されており、
                国内の添付文書上も服用後一定時間の自動車運転等の回避が求められています。
                米国頭痛学会のコンセンサス声明では、トリプタンに対する禁忌・不耐容がある患者における選択肢の一つとして位置づけられています。{" "}
                <span className="bB">B</span>
              </div>
            </div>
            <div className="src-grid">
              <div className="src">
                <div className="src-org">Mechanism Review</div>
                <div className="src-t">Lasmiditan mechanism of action review of a selective 5-HT1F agonist. PMC.</div>
                <div className="src-url">
                  <Ext href="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC7288483/">
                    https://www.ncbi.nlm.nih.gov/pmc/articles/PMC7288483/
                  </Ext>
                </div>
              </div>
              <div className="src">
                <div className="src-org">国内承認情報（二次情報）</div>
                <div className="src-t">新薬情報オンライン「レイボー（ラスミジタン）の作用機序」</div>
                <div className="src-url">
                  <Ext href="https://passmed.co.jp/di/archives/16626">
                    https://passmed.co.jp/di/archives/16626
                  </Ext>
                </div>
              </div>
            </div>

            <h3>2.5 ゲパント（gepant、CGRP受容体拮抗薬）</h3>
            <p>
              ゲパントは、片頭痛の病態生理に深く関与するとされる神経ペプチド「カルシトニン遺伝子関連ペプチド（CGRP）」
              の受容体を阻害する低分子薬です。CGRPは片頭痛発作時に三叉神経終末から放出され、血管拡張や痛覚過敏、
              神経原性炎症に関与すると考えられています。ゲパントはこの受容体への結合を阻害することで、
              血管収縮という機序を介さずに片頭痛症状を軽減すると考えられている点が、トリプタン・ジタンとの大きな違いです。
            </p>
            <p>
              第一世代のゲパント（オルセゲパント、テルカゲパント）は、静脈内投与限定であったり、
              肝機能障害の懸念から開発中止となった経緯がありますが、第二世代以降のゲパント
              （ウブロゲパント、リメゲパント、アトゲパント、ザベゲパント）は、良好な忍容性プロファイルが報告されています。
            </p>
            <p>
              米国頭痛学会（AHS）・欧州頭痛連合（EHF）関連のコンセンサス声明では、ゲパントは一般に、
              トリプタンに対する禁忌がある患者、複数のトリプタンを試しても効果不十分であった患者、
              あるいは心血管系リスク因子を有する患者における選択肢として位置づけられています。
              2024年の国際頭痛学会（IHS）実践推奨では、トリプタン数剤（目安として2〜3剤）を試したうえでの選択肢として
              位置づける記載があり、学会間で目安とする回数にはやや幅があります。費用や医療アクセスの観点から、
              いずれのコンセンサスも「優劣」ではなく「作用機序の違いに基づく個別化」という考え方を強調している点は共通しています。{" "}
              <span className="bB">B</span>
            </p>

            <div className="alert a-danger">
              <div className="alert-i">🇯🇵</div>
              <div>
                <strong>国内における承認状況（2026年7月時点）</strong>：ゲパントは成分ごとに国内承認状況が異なるため、特に注意が必要です。
                <ul style={{ marginTop: 8 }}>
                  <li>
                    <strong>リメゲパント</strong>：2025年9月に国内で製造販売承認を取得し、同年12月に発売。
                    国内では急性期治療および発作抑制（予防）の両方の適応を持つ、日本初の経口ゲパント。
                    米国では2020年（急性期）・2021年（予防）、欧州（EMA）では2022年に承認。
                  </li>
                  <li>
                    <strong>アトゲパント</strong>：国内では2026年4月に発売されているが、これは予防（発症抑制）を目的とした適応であり、
                    急性期治療薬としての位置づけではない。
                  </li>
                  <li>
                    <strong>ウブロゲパント・ザベゲパント（点鼻）</strong>：本ページ作成時点（2026年7月）で<strong>国内未承認</strong>。
                    米国等では急性期治療薬として承認されているが、日本国内での有効性・安全性は確立していない。
                    国内未承認の薬剤の使用を勧奨するものではない。
                  </li>
                </ul>
              </div>
            </div>

            <div className="alert a-info">
              <div className="alert-i">📚</div>
              <div>
                なお、日本頭痛学会「頭痛の診療ガイドライン2021」（2021年10月発行）では、当時米国FDAで承認済みであった
                ラスミジタン（ジタン）・ウブロゲパント・リメゲパント（ゲパント）を、トリプタンと同じ「Group 1（有効）」
                に位置づけていますが、これは発行時点での<strong>海外の承認状況・エビデンスに基づく評価</strong>であり、
                国内における薬事承認の有無とは別の事柄である点に留意してください。
              </div>
            </div>

            <div className="src-grid">
              <div className="src">
                <div className="src-org">Review</div>
                <div className="src-t">Gepants: targeting the CGRP pathway for migraine relief. Frontiers in Pharmacology, 2025.</div>
                <div className="src-url">
                  <Ext href="https://pmc.ncbi.nlm.nih.gov/articles/PMC12678924/">
                    https://pmc.ncbi.nlm.nih.gov/articles/PMC12678924/
                  </Ext>
                </div>
              </div>
              <div className="src">
                <div className="src-org">国内承認情報（一次情報）</div>
                <div className="src-t">ファイザー株式会社「ナルティークOD錠75mg発売」プレスリリース（2025年12月16日）</div>
                <div className="src-url">
                  <Ext href="https://www.pfizer.co.jp/pfizer/company/press/2025/2025-12-16">
                    https://www.pfizer.co.jp/pfizer/company/press/2025/2025-12-16
                  </Ext>
                </div>
              </div>
              <div className="src">
                <div className="src-org">国内動向（二次情報）</div>
                <div className="src-t">日経メディカル「片頭痛発作の急性期治療と発症抑制の両方に有効な経口薬」</div>
                <div className="src-url">
                  <Ext href="https://medical.nikkeibp.co.jp/leaf/all/series/drug/update/202510/590577.html">
                    https://medical.nikkeibp.co.jp/leaf/all/series/drug/update/202510/590577.html
                  </Ext>
                </div>
              </div>
              <div className="src">
                <div className="src-org">国内動向（二次情報）</div>
                <div className="src-t">日経メディカル「2剤登場したゲパント薬の実力」（2026年4月）</div>
                <div className="src-url">
                  <Ext href="https://medical.nikkeibp.co.jp/leaf/mem/pub/report/202604/592858.html">
                    https://medical.nikkeibp.co.jp/leaf/mem/pub/report/202604/592858.html
                  </Ext>
                </div>
              </div>
            </div>
          </section>

          {/* ====================================================== SECTION 5 */}
          <section id="s5" className="sec">
            <div className="sec-hd">
              <div className="sec-num">5</div>
              <h2>比較と意思決定アルゴリズム</h2>
            </div>

            <p>
              以下は5つの薬効群を、作用機序・血管収縮作用の有無・国際的な一般的位置づけ・国内承認状況の観点から整理したものです。
              あくまで一般的な傾向を示すものであり、個々の患者への適否は医師が判断します。
            </p>

            <div className="tbl">
              <table>
                <thead>
                  <tr>
                    <th>薬効群</th>
                    <th>代表的な一般名（国内承認分）</th>
                    <th>主な作用機序</th>
                    <th>血管収縮作用</th>
                    <th>国際的な一般的位置づけ</th>
                    <th>国内承認状況（2026年7月時点）</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>アセトアミノフェン</td>
                    <td>アセトアミノフェン</td>
                    <td>中枢性の鎮痛作用（機序は完全には未解明）</td>
                    <td className="tG">なし</td>
                    <td>非特異的治療。禁忌・不耐容時の選択肢としても言及</td>
                    <td><span className="bGrn">承認済み</span></td>
                  </tr>
                  <tr>
                    <td>NSAIDs</td>
                    <td>イブプロフェン、ナプロキセン、ジクロフェナク 等</td>
                    <td>COX阻害によるプロスタグランジン合成抑制</td>
                    <td className="tG">なし</td>
                    <td>非特異的治療。第一選択の一つとして広く使用</td>
                    <td><span className="bGrn">承認済み</span>（成分により異なる）</td>
                  </tr>
                  <tr>
                    <td>トリプタン</td>
                    <td>スマトリプタン、ゾルミトリプタン、リザトリプタン 等</td>
                    <td>5-HT1B/1D受容体作動</td>
                    <td className="tR">あり</td>
                    <td>片頭痛特異的治療の中心。中等度〜重度発作の第一選択の一つ</td>
                    <td><span className="bGrn">承認済み</span></td>
                  </tr>
                  <tr>
                    <td>ジタン</td>
                    <td>ラスミジタン</td>
                    <td>5-HT1F受容体作動</td>
                    <td className="tG">なし（実質的）</td>
                    <td>トリプタン禁忌・不耐容例での選択肢</td>
                    <td><span className="bGrn">承認済み</span>（2022年）</td>
                  </tr>
                  <tr>
                    <td>ゲパント</td>
                    <td>リメゲパント（アトゲパントは予防適応のみ）</td>
                    <td>CGRP受容体拮抗</td>
                    <td className="tG">なし</td>
                    <td>トリプタン禁忌・複数トリプタン無効例・心血管リスク例での選択肢</td>
                    <td>リメゲパントのみ急性期適応で<span className="bGrn">承認済み</span>（2025年）。ウブロゲパント・ザベゲパントは<span className="bRed">国内未承認</span></td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3>意思決定アルゴリズム</h3>
            <div className="alert a-warn">
              <div className="alert-i">⚠️</div>
              <div>
                以下のフローチャートは、これまで解説してきた「階層化治療の考え方」「早期服薬の原則」「薬効群ごとの位置づけ」を統合した、
                国際的なコンセンサスに基づく<strong>一般的な概念図</strong>です。実際の治療方針は、医師が患者ごとの病歴・併存疾患・禁忌・患者の希望を踏まえて個別に決定します。
              </div>
            </div>

            <div className="mmd">
              <div className="mmd-lbl">フローチャート — 薬効群選択の一般的な考え方</div>
              <MermaidDiagram
                themeVariables={ATH_MERMAID_THEME}
                chart={`flowchart TD
A["片頭痛発作の急性期治療を検討"] --> B{"頭痛関連障害度と重症度の評価"}
B -->|軽度| C["アセトアミノフェンまたはNSAIDsを検討"]
B -->|中等度から重度| D{"心血管系リスクや禁忌の評価"}
D -->|明確な禁忌なし| E["トリプタンを選択肢として検討"]
D -->|心血管系禁忌あり またはトリプタン不耐容| F["ジタンまたはゲパントを検討"]
E --> G{"早期服薬のうえで十分な効果<br>が複数回の発作で得られたか"}
G -->|複数回の発作で効果不十分 または副作用で継続困難| F
G -->|効果十分| H["同じ治療を継続し早期服薬の原則を維持"]
C --> I{"効果不十分か使用頻度が高いか"}
I -->|Yes| E
I -->|No| H
F --> J["医師と相談し個別に薬剤を選択"]
J --> K["使用日数を記録しMOHの予防に配慮する"]`}
              />
            </div>

            <div className="src-grid">
              <div className="src">
                <div className="src-org">AHS Consensus</div>
                <div className="src-t">Ailani J, et al. AHS Consensus Statement 2021. Headache.</div>
                <div className="src-url">
                  <Ext href="https://headachejournal.onlinelibrary.wiley.com/doi/10.1111/head.14153">
                    https://headachejournal.onlinelibrary.wiley.com/doi/10.1111/head.14153
                  </Ext>
                </div>
              </div>
              <div className="src">
                <div className="src-org">IHS Practice Recommendations</div>
                <div className="src-t">Puledda F, et al. IHS global practice recommendations for the acute pharmacological treatment of migraine. Cephalalgia. 2024.</div>
                <div className="src-url">
                  <Ext href="https://journals.sagepub.com/doi/10.1177/03331024241252666">
                    https://journals.sagepub.com/doi/10.1177/03331024241252666
                  </Ext>
                </div>
              </div>
              <div className="src">
                <div className="src-org">NICE Guideline</div>
                <div className="src-t">NICE Guideline CG150 — Headaches in over 12s: diagnosis and management</div>
                <div className="src-url">
                  <Ext href="https://www.nice.org.uk/guidance/cg150/chapter/recommendations">
                    https://www.nice.org.uk/guidance/cg150/chapter/recommendations
                  </Ext>
                </div>
              </div>
            </div>
          </section>

          {/* ====================================================== SECTION 6 */}
          <section id="s6" className="sec">
            <div className="sec-hd">
              <div className="sec-num">6</div>
              <h2>MOH（薬剤の使用過多）の予防</h2>
            </div>

            <div className="alert a-warn">
              <div className="alert-i">📘</div>
              <div>
                <strong>本セクションについての注記</strong>：本セクションはMOHの概念と一般的な予防の考え方を解説するものであり、
                個別の診断・治療方針を示すものではありません。頭痛の頻度が増えている、あるいは急性期治療薬を頻繁に使用しているという自覚がある場合は、
                自己判断で薬剤を中止・減量せず、医師にご相談ください。
              </div>
            </div>

            <p>
              急性期治療は「早期に、必要なときに使う」ことが原則である一方、<strong>使いすぎるとかえって頭痛を悪化させる</strong>
              という逆説的な現象が知られています。これが「薬剤の使用過多による頭痛（Medication-Overuse Headache; MOH）」です。
            </p>

            <h3>ICHD-3 診断基準（概要）</h3>
            <div className="tbl">
              <table>
                <thead>
                  <tr>
                    <th>基準</th>
                    <th>内容</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>A</td>
                    <td>もともと頭痛性疾患を有する患者において、頭痛が月に15日以上出現していること</td>
                  </tr>
                  <tr>
                    <td>B</td>
                    <td>急性期・対症的頭痛治療薬を3か月を超えて定期的に使用過多していること（薬剤クラスにより閾値が異なる。下記参照）</td>
                  </tr>
                  <tr>
                    <td>C</td>
                    <td>他のICHD-3診断ではよりよく説明されないこと</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p>
              慢性片頭痛の診断基準を同時に満たす場合は、両方の診断が併記されます。MOHは「薬剤の使用過多そのものが唯一の頭痛性疾患である」
              ことを意味するのではなく、片頭痛や緊張型頭痛といったもともとの頭痛性疾患の上に重なって生じると理解されています。
            </p>

            <h3>薬効群別の過用閾値（ICHD-3に基づく目安）</h3>
            <div className="moh-grid">
              <div className="moh moh-h">
                <div className="moh-day">
                  10<span style={{ fontSize: 15 }}>日/月</span>
                </div>
                <div className="moh-unit">3か月を超えて定期使用</div>
                <div className="moh-drug">エルゴタミン・トリプタン・オピオイド・配合鎮痛薬（単一クラス）</div>
              </div>
              <div className="moh moh-m">
                <div className="moh-day">
                  15<span style={{ fontSize: 15 }}>日/月</span>
                </div>
                <div className="moh-unit">3か月を超えて定期使用</div>
                <div className="moh-drug">単純鎮痛薬（アセトアミノフェン単剤、NSAIDs単剤、アスピリン単剤）</div>
              </div>
              <div className="moh moh-h">
                <div className="moh-day">
                  10<span style={{ fontSize: 15 }}>日/月</span>
                </div>
                <div className="moh-unit">3か月を超えて定期使用（合計日数）</div>
                <div className="moh-drug">上記薬剤クラスの複数を併用（単一クラスでは過用に至らない場合）</div>
              </div>
              <div className="moh moh-l">
                <div className="moh-day">閾値未満</div>
                <div className="moh-unit">目安を下回る使用</div>
                <div className="moh-drug">現在のところ相対的にリスクが低いとされる使用パターン</div>
              </div>
            </div>

            <div className="alert a-purple">
              <div className="alert-i">🔬</div>
              <div>
                この閾値は「これを超えたら必ずMOHになる」という確定的な基準ではなく、<strong>リスクが高まる目安</strong>として理解する必要があります。
                ジタン・ゲパントについては、既存のトリプタン・単純鎮痛薬と比べてMOHを誘発するリスクが低い可能性を示唆する報告
                （長期投与試験における事後解析等）もありますが、実臨床での長期データはなお蓄積中であり、確定的な結論には至っていません。{" "}
                <span className="bU">U</span>
              </div>
            </div>

            <h3>予防の実践的な考え方</h3>
            <p>MOHの管理・予防に関する一般的な考え方として、以下のような要素が国際的に共有されています（StatPearls等）。</p>
            <ol>
              <li>
                <strong>患者教育</strong>：急性期治療薬の使用日数を意識し、頭痛日記などで記録すること。
              </li>
              <li>
                <strong>適切な予防（発症抑制）療法の導入</strong>：頭痛の頻度が高い場合は、急性期治療薬への依存を減らすために予防療法の導入を医師と相談すること。
              </li>
              <li>
                <strong>過用薬剤の中止・減量</strong>：医師の指導のもとで、過用状態にある薬剤を計画的に中止・減量すること（自己判断での急な中止は推奨されない）。
              </li>
              <li>
                <strong>フォローアップ</strong>：中止後の頭痛経過を医師とともに継続的に観察し、再発を防ぐこと。
              </li>
            </ol>

            <div className="mmd">
              <div className="mmd-lbl">フローチャート — MOH予防のための一般的な流れ</div>
              <MermaidDiagram
                themeVariables={ATH_MERMAID_THEME}
                chart={`flowchart TD
A["急性期治療薬の使用状況を記録する"] --> B{"使用日数を確認"}
B -->|トリプタン 麦角 オピオイド 配合鎮痛薬が月10日以上| C["MOHのリスクが高まっている可能性"]
B -->|単純鎮痛薬が月15日以上| C
B -->|上記閾値未満| D["現在の使用パターンは比較的リスクが低い"]
C --> E["頭痛日記による記録を継続する"]
E --> F["予防 発症抑制 療法の導入を医師と相談する"]
F --> G["原因薬剤の中止 減量を医師の指導のもとで計画する"]
D --> H["早期服薬の原則を維持しつつ使用日数を注視する"]`}
              />
            </div>

            <div className="src-grid">
              <div className="src">
                <div className="src-org">ICHD-3</div>
                <div className="src-t">8.2 Medication-overuse headache, International Headache Society</div>
                <div className="src-url">
                  <Ext href="https://ichd-3.org/8-headache-attributed-to-a-substance-or-its-withdrawal/8-2-medication-overuse-headache-moh/">
                    https://ichd-3.org/8-headache-attributed-to-a-substance-or-its-withdrawal/8-2-medication-overuse-headache-moh/
                  </Ext>
                </div>
              </div>
              <div className="src">
                <div className="src-org">ICHD-3</div>
                <div className="src-t">8.2.3 Non-opioid (simple) analgesic-overuse headache</div>
                <div className="src-url">
                  <Ext href="https://ichd-3.org/8-headache-attributed-to-a-substance-or-its-withdrawal/8-2-medication-overuse-headache-moh/8-2-3-simple-analgesic-overuse-headache/">
                    https://ichd-3.org/8-headache-attributed-to-a-substance-or-its-withdrawal/8-2-medication-overuse-headache-moh/8-2-3-simple-analgesic-overuse-headache/
                  </Ext>
                </div>
              </div>
              <div className="src">
                <div className="src-org">ICHD-3</div>
                <div className="src-t">8.2.2 Triptan-overuse headache</div>
                <div className="src-url">
                  <Ext href="https://ichd-3.org/8-headache-attributed-to-a-substance-or-its-withdrawal/8-2-medication-overuse-headache-moh/8-2-2-triptan-overuse-headache/">
                    https://ichd-3.org/8-headache-attributed-to-a-substance-or-its-withdrawal/8-2-medication-overuse-headache-moh/8-2-2-triptan-overuse-headache/
                  </Ext>
                </div>
              </div>
              <div className="src">
                <div className="src-org">StatPearls</div>
                <div className="src-t">Medication-Overuse Headache - StatPearls, NCBI Bookshelf</div>
                <div className="src-url">
                  <Ext href="https://www.ncbi.nlm.nih.gov/books/NBK538150/">
                    https://www.ncbi.nlm.nih.gov/books/NBK538150/
                  </Ext>
                </div>
              </div>
            </div>
          </section>

          {/* ====================================================== SECTION 7 */}
          <section id="s7" className="sec">
            <div className="sec-hd">
              <div className="sec-num">7</div>
              <h2>まとめ・参考文献・監視すべき権威ソース</h2>
            </div>

            <h3>ステップバイステップ理解のためのポイント</h3>
            <div className="qr-grid">
              <div className="qr">
                <div className="qr-t">Step 1｜治療戦略を理解する</div>
                <p style={{ fontSize: "12.5px" }}>
                  急性期治療の目的は「発作を止めること」。段階的治療と階層化治療のどちらが適するかは、
                  頭痛関連障害度の評価が助けになる。国際的にも単一の正解はない。
                </p>
              </div>
              <div className="qr">
                <div className="qr-t">Step 2｜早期服薬を意識する</div>
                <p style={{ fontSize: "12.5px" }}>
                  中枢性感作（皮膚アロディニア）成立前の治療が反応性を高めうるという仮説に基づく原則。
                  ただし確定的ではなく、個々の判断は医師と相談する。
                </p>
              </div>
              <div className="qr">
                <div className="qr-t">Step 3｜薬効群を理解する</div>
                <p style={{ fontSize: "12.5px" }}>
                  非特異的治療（アセトアミノフェン・NSAIDs）と片頭痛特異的治療（トリプタン・ジタン・ゲパント）に大別。
                  血管収縮作用の有無が禁忌判断の鍵になる。
                </p>
              </div>
              <div className="qr">
                <div className="qr-t">Step 4｜MOHを予防する</div>
                <p style={{ fontSize: "12.5px" }}>
                  薬剤クラスにより月10日または15日の閾値を超えて3か月以上継続するとMOHのリスクが高まりうる。
                  使用日数の記録と医師への相談が重要。
                </p>
              </div>
            </div>

            <div className="alert a-ok">
              <div className="alert-i">✅</div>
              <div>
                いずれの内容も、実際の診断・治療方針の決定には<strong>医師・薬剤師への相談が不可欠</strong>です。
                ゲパントの中でも国内承認状況は成分ごとに異なる点（2026年7月時点でリメゲパントは急性期治療・予防の両方で承認済み、
                ウブロゲパント・ザベゲパントは国内未承認）にも改めて留意してください。
              </div>
            </div>

            <h3>参考文献・情報源</h3>
            <p>
              本資料の作成にあたり参照した一次情報・国際的なガイドライン・システマティックレビューを、トピック別に整理します。
              （一次情報を優先し、二次情報（要約サイト等）は補助的に付記しています）
            </p>

            <h4>疾患分類・診断基準</h4>
            <div className="src-grid">
              <div className="src">
                <div className="src-org">ICHD-3</div>
                <div className="src-t">International Classification of Headache Disorders 3rd edition, IHS — 8.2 Medication-overuse headache</div>
                <div className="src-url">
                  <Ext href="https://ichd-3.org/8-headache-attributed-to-a-substance-or-its-withdrawal/8-2-medication-overuse-headache-moh/">
                    https://ichd-3.org/8-headache-attributed-to-a-substance-or-its-withdrawal/8-2-medication-overuse-headache-moh/
                  </Ext>
                </div>
              </div>
              <div className="src">
                <div className="src-org">ICHD-3</div>
                <div className="src-t">8.2.3 Non-opioid (simple) analgesic-overuse headache</div>
                <div className="src-url">
                  <Ext href="https://ichd-3.org/8-headache-attributed-to-a-substance-or-its-withdrawal/8-2-medication-overuse-headache-moh/8-2-3-simple-analgesic-overuse-headache/">
                    https://ichd-3.org/8-headache-attributed-to-a-substance-or-its-withdrawal/8-2-medication-overuse-headache-moh/8-2-3-simple-analgesic-overuse-headache/
                  </Ext>
                </div>
              </div>
              <div className="src">
                <div className="src-org">ICHD-3</div>
                <div className="src-t">8.2.2 Triptan-overuse headache</div>
                <div className="src-url">
                  <Ext href="https://ichd-3.org/8-headache-attributed-to-a-substance-or-its-withdrawal/8-2-medication-overuse-headache-moh/8-2-2-triptan-overuse-headache/">
                    https://ichd-3.org/8-headache-attributed-to-a-substance-or-its-withdrawal/8-2-medication-overuse-headache-moh/8-2-2-triptan-overuse-headache/
                  </Ext>
                </div>
              </div>
            </div>

            <h4>国内ガイドライン</h4>
            <div className="src-grid">
              <div className="src">
                <div className="src-org">日本頭痛学会</div>
                <div className="src-t">頭痛の診療ガイドライン2021（日本頭痛学会・日本神経学会・日本神経治療学会 監修）</div>
                <div className="src-url">
                  <Ext href="https://www.jhsnet.net/guideline.html">
                    https://www.jhsnet.net/guideline.html
                  </Ext>
                </div>
              </div>
              <div className="src">
                <div className="src-org">全文（日本神経学会）</div>
                <div className="src-t">頭痛の診療ガイドライン2021 全文</div>
                <div className="src-url">
                  <Ext href="https://www.neurology-jp.org/guidelinem/headache_medical_2021.html">
                    https://www.neurology-jp.org/guidelinem/headache_medical_2021.html
                  </Ext>
                </div>
              </div>
              <div className="src">
                <div className="src-org">二次情報</div>
                <div className="src-t">ケアネット「『頭痛の診療ガイドライン』8年ぶり改訂、ポイントは」（2021年12月）</div>
                <div className="src-url">
                  <Ext href="https://www.carenet.com/news/general/carenet/53578">
                    https://www.carenet.com/news/general/carenet/53578
                  </Ext>
                </div>
              </div>
            </div>

            <h4>国際ガイドライン・コンセンサス声明</h4>
            <div className="src-grid">
              <div className="src">
                <div className="src-org">AHS</div>
                <div className="src-t">Ailani J, et al. The American Headache Society Consensus Statement. Headache. 2021.</div>
                <div className="src-url">
                  <Ext href="https://headachejournal.onlinelibrary.wiley.com/doi/10.1111/head.14153">
                    https://headachejournal.onlinelibrary.wiley.com/doi/10.1111/head.14153
                  </Ext>
                </div>
              </div>
              <div className="src">
                <div className="src-org">IHS</div>
                <div className="src-t">Puledda F, et al. IHS global practice recommendations for the acute pharmacological treatment of migraine. Cephalalgia. 2024;44(8).</div>
                <div className="src-url">
                  <Ext href="https://journals.sagepub.com/doi/10.1177/03331024241252666">
                    https://journals.sagepub.com/doi/10.1177/03331024241252666
                  </Ext>
                </div>
              </div>
              <div className="src">
                <div className="src-org">NICE</div>
                <div className="src-t">NICE Guideline CG150 — Headaches in over 12s: diagnosis and management</div>
                <div className="src-url">
                  <Ext href="https://www.nice.org.uk/guidance/cg150">
                    https://www.nice.org.uk/guidance/cg150
                  </Ext>
                </div>
              </div>
              <div className="src">
                <div className="src-org">EHF関連</div>
                <div className="src-t">Acute Treatment of Migraine: Expert Consensus Statements from the United Arab Emirates（EHF基準を参照）J Headache Pain. 2022;23(1):133</div>
                <div className="src-url">
                  <Ext href="https://pmc.ncbi.nlm.nih.gov/articles/PMC10951165/">
                    https://pmc.ncbi.nlm.nih.gov/articles/PMC10951165/
                  </Ext>
                </div>
              </div>
            </div>

            <h4>治療戦略のエビデンス</h4>
            <div className="src-grid">
              <div className="src">
                <div className="src-org">一次文献</div>
                <div className="src-t">Lipton RB, et al. Stratified care vs step care strategies for migraine: the DISC study. JAMA. 2000;284(20):2599-2605.</div>
                <div className="src-url">
                  <Ext href="https://pubmed.ncbi.nlm.nih.gov/11086366/">
                    https://pubmed.ncbi.nlm.nih.gov/11086366/
                  </Ext>
                </div>
              </div>
              <div className="src">
                <div className="src-org">二次情報</div>
                <div className="src-t">Neurotorium — Strategies for acute treatment of migraine in adults</div>
                <div className="src-url">
                  <Ext href="https://neurotorium.org/slidedeck/migraine-treatment-principles/slide/9-migraine-treatment-principles/">
                    https://neurotorium.org/slidedeck/migraine-treatment-principles/slide/9-migraine-treatment-principles/
                  </Ext>
                </div>
              </div>
              <div className="src">
                <div className="src-org">一次文献</div>
                <div className="src-t">Lantéri-Minet M, et al. Early dosing and efficacy of triptans: the TEMPO study. Cephalalgia. 2012.</div>
                <div className="src-url">
                  <Ext href="https://journals.sagepub.com/doi/10.1177/0333102411433042">
                    https://journals.sagepub.com/doi/10.1177/0333102411433042
                  </Ext>
                </div>
              </div>
            </div>

            <h4>薬効群のシステマティックレビュー・機序解説</h4>
            <div className="src-grid">
              <div className="src">
                <div className="src-org">Cochrane</div>
                <div className="src-t">Derry S, Moore RA. Paracetamol (acetaminophen) with or without an antiemetic for acute migraine headaches in adults.</div>
                <div className="src-url">
                  <Ext href="https://www.cochrane.org/evidence/CD008040_paracetamol-acetaminophen-or-without-antiemetic-acute-migraine-adults">
                    https://www.cochrane.org/evidence/CD008040_paracetamol-acetaminophen-or-without-antiemetic-acute-migraine-adults
                  </Ext>
                </div>
              </div>
              <div className="src">
                <div className="src-org">Cochrane</div>
                <div className="src-t">Rabbie R, Derry S, Moore RA. Ibuprofen with or without an antiemetic for acute migraine headaches in adults.</div>
                <div className="src-url">
                  <Ext href="https://www.cochrane.org/evidence/CD008039_ibuprofen-or-without-antiemetic-acute-migraine-headaches-adults">
                    https://www.cochrane.org/evidence/CD008039_ibuprofen-or-without-antiemetic-acute-migraine-headaches-adults
                  </Ext>
                </div>
              </div>
              <div className="src">
                <div className="src-org">StatPearls</div>
                <div className="src-t">Triptans - StatPearls, NCBI Bookshelf</div>
                <div className="src-url">
                  <Ext href="https://www.ncbi.nlm.nih.gov/books/NBK554507/">
                    https://www.ncbi.nlm.nih.gov/books/NBK554507/
                  </Ext>
                </div>
              </div>
              <div className="src">
                <div className="src-org">Review</div>
                <div className="src-t">Lasmiditan mechanism of action — review of a selective 5-HT1F agonist. PMC.</div>
                <div className="src-url">
                  <Ext href="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC7288483/">
                    https://www.ncbi.nlm.nih.gov/pmc/articles/PMC7288483/
                  </Ext>
                </div>
              </div>
              <div className="src">
                <div className="src-org">Review</div>
                <div className="src-t">Gepants: targeting the CGRP pathway for migraine relief. Frontiers in Pharmacology, 2025.</div>
                <div className="src-url">
                  <Ext href="https://pmc.ncbi.nlm.nih.gov/articles/PMC12678924/">
                    https://pmc.ncbi.nlm.nih.gov/articles/PMC12678924/
                  </Ext>
                </div>
              </div>
              <div className="src">
                <div className="src-org">StatPearls</div>
                <div className="src-t">Medication-Overuse Headache - StatPearls, NCBI Bookshelf</div>
                <div className="src-url">
                  <Ext href="https://www.ncbi.nlm.nih.gov/books/NBK538150/">
                    https://www.ncbi.nlm.nih.gov/books/NBK538150/
                  </Ext>
                </div>
              </div>
            </div>

            <h4>国内承認・規制情報</h4>
            <div className="src-grid">
              <div className="src">
                <div className="src-org">一次情報</div>
                <div className="src-t">ファイザー株式会社「ナルティークOD錠75mg発売」プレスリリース（2025年12月16日）</div>
                <div className="src-url">
                  <Ext href="https://www.pfizer.co.jp/pfizer/company/press/2025/2025-12-16">
                    https://www.pfizer.co.jp/pfizer/company/press/2025/2025-12-16
                  </Ext>
                </div>
              </div>
              <div className="src">
                <div className="src-org">二次情報</div>
                <div className="src-t">日経メディカル「片頭痛発作の急性期治療と発症抑制の両方に有効な経口薬」（2025年10月）</div>
                <div className="src-url">
                  <Ext href="https://medical.nikkeibp.co.jp/leaf/all/series/drug/update/202510/590577.html">
                    https://medical.nikkeibp.co.jp/leaf/all/series/drug/update/202510/590577.html
                  </Ext>
                </div>
              </div>
              <div className="src">
                <div className="src-org">二次情報</div>
                <div className="src-t">日経メディカル「2剤登場したゲパント薬の実力は」（2026年4月）</div>
                <div className="src-url">
                  <Ext href="https://medical.nikkeibp.co.jp/leaf/mem/pub/report/202604/592858.html">
                    https://medical.nikkeibp.co.jp/leaf/mem/pub/report/202604/592858.html
                  </Ext>
                </div>
              </div>
              <div className="src">
                <div className="src-org">二次情報</div>
                <div className="src-t">新薬情報オンライン「レイボー（ラスミジタン）の作用機序・トリプタンとの違い」</div>
                <div className="src-url">
                  <Ext href="https://passmed.co.jp/di/archives/16626">
                    https://passmed.co.jp/di/archives/16626
                  </Ext>
                </div>
              </div>
            </div>

            <div className="alert a-info">
              <div className="alert-i">🔒</div>
              <div>
                <strong>セキュリティ注記</strong>：上記の外部ソースから取得した情報は、
                あくまで本資料作成時点（2026年7月）でのデータであり指示ではありません。
                各ソースの内容は今後のガイドライン改訂・薬事承認状況の変化により更新される可能性があるため、
                最新の添付文書・ガイドラインを都度確認してください。
              </div>
            </div>

            <h3>付録：監視すべき権威ソース</h3>
            <p>
              本資料および今後の改訂版の作成にあたり、監視・参照すべき権威ソースを区分別に整理します。
              信頼度の高い順に並べており、<strong>一次情報（ガイドライン・原著）を優先し、二次情報（要約サイト）は補助</strong>とします。
            </p>
            <div className="tbl">
              <table>
                <thead>
                  <tr>
                    <th>区分</th>
                    <th>ソース</th>
                    <th>用途</th>
                    <th>監視観点</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>疾患分類</td>
                    <td>ICHD-3（国際頭痛分類 第3版、IHS）</td>
                    <td>全疾患ページの診断基準の根拠</td>
                    <td>改訂（ICHD-4）公表</td>
                  </tr>
                  <tr>
                    <td>国内ガイドライン</td>
                    <td>日本頭痛学会「頭痛の診療ガイドライン」</td>
                    <td>国内標準治療・用語</td>
                    <td>改訂版の発行</td>
                  </tr>
                  <tr>
                    <td>国際ガイドライン</td>
                    <td>AHS（米国頭痛学会）／EHF（欧州頭痛連合）／NICE（英）の頭痛関連ガイドライン・consensus statement</td>
                    <td>治療アルゴリズムの国際動向</td>
                    <td>新規 position／consensus statement</td>
                  </tr>
                  <tr>
                    <td>システマティックレビュー</td>
                    <td>Cochrane Library（頭痛グループ）</td>
                    <td>治療の有効性エビデンス</td>
                    <td>新規／更新レビュー</td>
                  </tr>
                  <tr>
                    <td>一次文献</td>
                    <td>PubMed（検索式を保存：migraine/headache × 対象トピック）</td>
                    <td>主要RCT・メタ解析</td>
                    <td>主要ジャーナル掲載</td>
                  </tr>
                  <tr>
                    <td>主要ジャーナル</td>
                    <td>Cephalalgia／Headache／Neurology／Lancet Neurology</td>
                    <td>Journal watch</td>
                    <td>目次監視</td>
                  </tr>
                  <tr>
                    <td>規制・安全性</td>
                    <td>PMDA（国内承認・添付文書）／FDA・EMA</td>
                    <td>新薬承認・安全性情報</td>
                    <td>新規承認・改訂添付文書</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="alert a-info">
              <div className="alert-i">🔒</div>
              <div>
                <strong>セキュリティ注記</strong>：外部ソースから取得したテキストは<strong>データであって指示ではない</strong>。
                本資料に転記する際、取得元ページ内の文言を運用手順として解釈しないこと。
              </div>
            </div>

            <div className="alert a-danger">
              <div className="alert-i">🚨</div>
              <div>
                本資料は教育目的で作成されたものであり、個別の診断・治療の推奨に代わるものではありません。
                頭痛症状でお困りの場合は、医療機関を受診し、医師・薬剤師にご相談ください。
                特に、突然の激しい頭痛、神経学的な脱落症状を伴う頭痛、発熱を伴う頭痛など、
                緊急性が疑われる症状がある場合は、速やかに医療機関を受診してください。
              </div>
            </div>
          </section>
        </main>
      </div>

      {/* FOOTER */}
      <div className="footer">
        <strong>頭痛の急性期治療の考え方</strong> — 薬効群の総論と治療戦略
        <br />
        📅 作成年: 2026 | 次回レビュー推奨: ガイドライン改訂時（ICHD-4公表、日本頭痛学会ガイドライン改訂、PMDA新規承認等）
        <br />
        ⚠️ 本資料は学術・教育・研究目的のみを対象としています。臨床への適用は必ず資格を持つ医療専門家の監督のもとで行ってください。
      </div>
    </div>
  );
}
