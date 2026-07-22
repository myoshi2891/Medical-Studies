import { Ext } from "@/components/Ext";
import MermaidDiagram from "@/components/MermaidDiagram";
import { CgrpPathwaySidebar } from "@/components/treatment/CgrpPathwaySidebar";
import "./cgrp-pathway-headache-treatments.css";

const CGRP_MERMAID_THEME: Record<string, string> = {
  primaryColor: "#ede7f6",
  primaryTextColor: "#1a237e",
  primaryBorderColor: "#6a1b9a",
  lineColor: "#5c6bc0",
  secondaryColor: "#e0f2f1",
  tertiaryColor: "#e8f5e9",
  edgeLabelBackground: "#ffffff",
  fontSize: "13px",
};

export default function CgrpPathwayHeadacheTreatmentsPage() {
  return (
    <div className="cgrp-pathway-headache-treatments">
      {/* HERO */}
      <div className="hero">
        <div style={{ fontSize: 40 }}>🧬</div>
        <h1>CGRP経路を標的とした頭痛治療薬</h1>
        <p className="hero-sub">
          抗CGRP/受容体モノクローナル抗体と経口ゲパントの位置づけ・国内承認状況（PMDA準拠）
        </p>
        <div className="hero-tags">
          <span className="hero-tag">ICHD-3準拠</span>
          <span className="hero-tag">抗CGRPモノクローナル抗体</span>
          <span className="hero-tag">経口ゲパント</span>
          <span className="hero-tag">PMDA承認状況</span>
          <span className="hero-tag">AHS / NICE / EHF / 日本頭痛学会</span>
          <span className="hero-tag">教育目的資料</span>
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
        {/* SIDEBAR */}
        <CgrpPathwaySidebar />

        {/* MAIN CONTENT */}
        <main className="main">
          {/* PAGE-LEVEL DISCLAIMER */}
          <div className="alert a-warn">
            <div className="alert-i">⚠️</div>
            <div>
              <strong>本ページは教育目的であり、個別の治療推奨ではありません。</strong>
              <br />
              本ページに記載する内容は、国際的に認知されたガイドライン・原著論文・規制当局の公表資料に基づく一般的な医学教育情報であり、特定の個人に対する診断・処方・治療方針を示すものではありません。実際の治療選択は、必ず医師・薬剤師にご相談のうえ決定してください。
            </div>
          </div>
          <div className="card">
            <ul>
              <li>
                本ページは<strong>個別患者への用量・用法を指示するものではありません</strong>。
              </li>
              <li>
                効果・安全性について<strong>断定的な保証は行わず</strong>
                、エビデンスの質に応じた相対的な表現（「有効性が示されている」「限定的」等）にとどめています。
              </li>
              <li>
                <strong>特定商品名の推奨や優劣の主張は行いません。</strong>
                原則として一般名（成分名）で記述し、商品名は識別のために中立的に併記するにとどめます。
              </li>
              <li>
                国内未承認・適応外の内容は、その旨を<strong>事実として明示</strong>
                し、使用を勧奨するものではありません。
              </li>
            </ul>
          </div>

          {/* ====================================================== SECTION 1 */}
          <section id="s1" className="sec">
            <div className="sec-hd">
              <div className="sec-num">1</div>
              <h2 className="sec-title">はじめに：CGRPと頭痛医学における位置づけ</h2>
            </div>

            <p>
              片頭痛は世界的に見ても有病率の高い神経疾患のひとつであり、日本国内でも成人の一定割合が罹患しているとされています。従来の片頭痛予防治療は、抗てんかん薬・降圧薬・抗うつ薬など、もともと片頭痛以外の疾患のために開発された薬剤を転用する形で行われてきました。
            </p>

            <p>
              こうした状況を変えたのが、
              <strong>
                CGRP（calcitonin gene-related peptide：カルシトニン遺伝子関連ペプチド）
              </strong>
              という神経ペプチドを標的とした「片頭痛特異的」治療薬群です。CGRPは片頭痛の病態形成に中心的な役割を果たす分子であることが基礎研究・臨床研究の両面から裏付けられており、この経路を標的とする薬剤群は現在、国際的な頭痛医学において重要な位置を占めています。
            </p>

            <div className="card">
              <h4>本ページで中心的に扱う2群</h4>
              <ul>
                <li>
                  <strong>抗CGRP／抗CGRP受容体モノクローナル抗体</strong>（予防治療薬）
                </li>
                <li>
                  <strong>経口CGRP受容体拮抗薬（ゲパント）の予防適応</strong>
                </li>
              </ul>
            </div>

            <p>
              それぞれについて、作用機序・国際的なエビデンス・位置づけ・国内承認状況（PMDA準拠）を、初学者にもわかりやすく解説します。
            </p>
          </section>

          {/* ====================================================== SECTION 2 */}
          <section id="s2" className="sec">
            <div className="sec-hd">
              <div className="sec-num">2</div>
              <h2 className="sec-title">ICHD-3における文脈</h2>
            </div>

            <p>
              CGRP標的治療薬が主に用いられるのは、国際頭痛分類第3版（
              <strong>ICHD-3</strong>、International Classification of Headache Disorders, 3rd
              edition）における「片頭痛（Migraine）」の枠組みの中です。ICHD-3は国際頭痛学会（IHS）が策定した頭痛疾患の診断基準体系であり、片頭痛を「前兆のない片頭痛」「前兆のある片頭痛」「慢性片頭痛」などに分類しています。
            </p>

            <p>
              CGRP標的治療薬の主要な臨床試験は、このICHD-3の診断基準を満たす反復性片頭痛（episodic
              migraine）および慢性片頭痛（chronic
              migraine、月間頭痛日数15日以上）の患者を対象に実施されています。本ページで扱う有効性エビデンスも、原則としてこの診断枠組みに基づく患者集団のデータであることに留意してください。
            </p>

            <div className="alert a-info">
              <div className="alert-i">ℹ️</div>
              <div>
                出典：ICHD-3公式サイト（国際頭痛学会） —{" "}
                <Ext href="https://ichd-3.org/">https://ichd-3.org/</Ext>
              </div>
            </div>
          </section>

          {/* ====================================================== SECTION 3 */}
          <section id="s3" className="sec">
            <div className="sec-hd">
              <div className="sec-num">3</div>
              <h2 className="sec-title">CGRP経路の病態生理</h2>
            </div>

            <p>
              CGRPは三叉神経系に豊富に存在する神経ペプチドで、片頭痛発作時に三叉神経終末から放出されると考えられています。放出されたCGRPは、硬膜血管の拡張、神経原性炎症、三叉神経血管系の痛覚感作といった複数の経路を介して片頭痛発作の形成に関与するとされています。
            </p>

            <p>
              CGRP標的治療薬は、この経路のどこを遮断するかによって大きく3つの作用様式に分けられます。
            </p>

            <div className="mmd">
              <div className="mmd-lbl">フローチャート — CGRP経路の病態生理と治療薬の作用点</div>
              <MermaidDiagram
                themeVariables={CGRP_MERMAID_THEME}
                chart={`flowchart LR
    A["三叉神経終末からのCGRP放出"] --> B["硬膜血管の拡張"]
    A --> C["神経原性炎症"]
    A --> D["三叉神経血管系の痛覚感作"]
    B --> E["片頭痛発作の形成"]
    C --> E
    D --> E

    F["抗CGRPモノクローナル抗体\\n(CGRPリガンドを中和)"] -.-| "阻害" | A
    G["抗CGRP受容体モノクローナル抗体\\n(受容体を遮断)"] -.-| "阻害" | A
    H["経口ゲパント\\n(受容体を可逆的に拮抗)"] -.-| "阻害" | A`}
              />
            </div>

            <ul>
              <li>
                <strong>リガンド中和型</strong>
                ：CGRPそのものに結合し、受容体への作用を防ぐ（fremanezumab、galcanezumab、eptinezumab）
              </li>
              <li>
                <strong>受容体遮断型（抗体）</strong>
                ：CGRP受容体に結合し、CGRPが結合できないようにする（erenumab）
              </li>
              <li>
                <strong>受容体拮抗型（低分子・経口）</strong>
                ：CGRP受容体に可逆的に結合する小分子化合物（ゲパント全般）
              </li>
            </ul>

            <div className="alert a-info">
              <div className="alert-i">ℹ️</div>
              <div>
                出典：European Headache Federation guideline on CGRP monoclonal antibodies (2022
                update) —{" "}
                <Ext href="https://pmc.ncbi.nlm.nih.gov/articles/PMC9188162/">
                  https://pmc.ncbi.nlm.nih.gov/articles/PMC9188162/
                </Ext>
              </div>
            </div>
          </section>

          {/* ====================================================== SECTION 4 */}
          <section id="s4" className="sec">
            <div className="sec-hd">
              <div className="sec-num">4</div>
              <h2 className="sec-title">CGRP標的治療薬の分類</h2>
            </div>

            <p>
              現在、国際的に承認・使用されているCGRP標的治療薬は、大きく「注射剤（モノクローナル抗体）」と「低分子薬（ゲパント）」の2系統に分類されます。
            </p>

            <div className="mmd">
              <div className="mmd-lbl">フローチャート — CGRP標的治療薬の分類ツリー</div>
              <MermaidDiagram
                themeVariables={CGRP_MERMAID_THEME}
                chart={`flowchart TD
    A["CGRP経路を標的とする片頭痛治療薬"] --> B["モノクローナル抗体\\n(予防のみ・注射/点滴)"]
    A --> C["低分子ゲパント\\n(経口・一部は点鼻)"]

    B --> B1["erenumab エレヌマブ\\n(受容体を標的)"]
    B --> B2["galcanezumab ガルカネズマブ\\n(リガンドを標的)"]
    B --> B3["fremanezumab フレマネズマブ\\n(リガンドを標的)"]
    B --> B4["eptinezumab エプチネズマブ\\n(リガンドを標的・国内未承認)"]

    C --> C1["rimegepant リメゲパント\\n(急性期・予防の両適応)"]
    C --> C2["atogepant アトゲパント\\n(主に予防適応)"]
    C --> C3["ubrogepant ウブロゲパント\\n(急性期のみ・国内未承認)"]
    C --> C4["zavegepant ザベゲパント\\n(点鼻・急性期のみ・国内未承認)"]`}
              />
            </div>

            <div className="alert a-info">
              <div className="alert-i">📌</div>
              <div>
                本ページで重点的に扱うのは、<strong>予防治療</strong>
                に用いられるモノクローナル抗体群と、<strong>予防適応を持つ</strong>
                ゲパント（rimegepant、atogepant）です。
              </div>
            </div>
          </section>

          {/* ====================================================== SECTION 5 */}
          <section id="s5" className="sec">
            <div className="sec-hd">
              <div className="sec-num">5</div>
              <h2 className="sec-title">抗CGRP/受容体モノクローナル抗体（予防）</h2>
            </div>

            <h3>5.1 概要</h3>
            <p>
              抗CGRPモノクローナル抗体は、月1回または3か月に1回程度の頻度で投与される生物学的製剤で、片頭痛予防治療薬として開発された最初の「疾患特異的」薬剤群です。一般に、皮下注射で投与されるもの（erenumab、galcanezumab、fremanezumab）と、点滴静注で投与されるもの（eptinezumab）に分かれます。
            </p>

            <div className="alert a-warn">
              <div className="alert-i">⚠️</div>
              <div>
                具体的な用量・投与間隔・自己注射導入の可否等は、薬剤ごと・患者ごとに異なります。個別の使用方法については必ず
                <strong>医師・薬剤師にご相談</strong>ください。
              </div>
            </div>

            <h3>5.2 薬剤一覧（一般名ベース）</h3>
            <div className="tbl th-teal">
              <table>
                <thead>
                  <tr>
                    <th>一般名（成分名）</th>
                    <th>標的</th>
                    <th>投与形態（一般的分類）</th>
                    <th>主な適応</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>erenumab（エレヌマブ）</td>
                    <td>CGRP受容体</td>
                    <td>皮下注射</td>
                    <td>片頭痛予防</td>
                  </tr>
                  <tr>
                    <td>galcanezumab（ガルカネズマブ）</td>
                    <td>CGRPリガンド</td>
                    <td>皮下注射</td>
                    <td>片頭痛予防（国際的には群発頭痛の一部病型にも適応あり）</td>
                  </tr>
                  <tr>
                    <td>fremanezumab（フレマネズマブ）</td>
                    <td>CGRPリガンド</td>
                    <td>皮下注射</td>
                    <td>片頭痛予防</td>
                  </tr>
                  <tr>
                    <td>eptinezumab（エプチネズマブ）</td>
                    <td>CGRPリガンド</td>
                    <td>点滴静注</td>
                    <td>
                      片頭痛予防（<span className="bU">国内未承認</span>、11章参照）
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p style={{ fontSize: 12.5, color: "var(--g6)" }}>
              商品名は識別のための参考情報として国内承認状況の章（8章）にまとめて記載します。
            </p>

            <h3>5.3 エビデンスの概要</h3>
            <p>
              複数のシステマティックレビュー・メタアナリシス{" "}
              <span className="bB">メタアナリシス</span>{" "}
              において、抗CGRPモノクローナル抗体群はプラセボと比較して、月間片頭痛日数の50%以上減少を達成する患者の割合（レスポンダー率）に関して有意な改善が示されています。ただし、これらは主に数か月〜1年程度の臨床試験・観察研究に基づくものであり、長期の実臨床データ{" "}
              <span className="bC">実臨床データ</span>{" "}
              は蓄積が進んでいる段階です。日本国内でも、実臨床コホート研究により長期的な有効性・忍容性を検証する取り組みが継続されています。
            </p>

            <div className="src-grid">
              <div className="src">
                <div className="src-org">Meta-analysis</div>
                <div className="src-t">Cochrane Collaborationの手法に準拠したメタアナリシス</div>
                <div className="src-url">
                  <Ext href="https://pmc.ncbi.nlm.nih.gov/articles/PMC6379644/">
                    https://pmc.ncbi.nlm.nih.gov/articles/PMC6379644/
                  </Ext>
                </div>
              </div>
              <div className="src">
                <div className="src-org">Real-world / Japan</div>
                <div className="src-t">
                  国内実臨床コホート研究（European Journal of Neurology, 2026）
                </div>
                <div className="src-url">
                  <Ext href="https://onlinelibrary.wiley.com/doi/10.1111/ene.70562">
                    https://onlinelibrary.wiley.com/doi/10.1111/ene.70562
                  </Ext>
                </div>
              </div>
              <div className="src">
                <div className="src-org">Real-world / Japan</div>
                <div className="src-t">
                  日本における長期実臨床データ（Frontiers in Neurology, 2026）
                </div>
                <div className="src-url">
                  <Ext href="https://www.frontiersin.org/journals/neurology/articles/10.3389/fneur.2026.1827022/full">
                    frontiersin.org/.../fneur.2026.1827022/full
                  </Ext>
                </div>
              </div>
            </div>

            <div className="alert a-info">
              <div className="alert-i">ℹ️</div>
              <div>
                <strong>エビデンスの質に関する注記</strong>
                ：有効性の程度は薬剤・患者背景・評価期間によって異なり、「全ての患者に一様に有効である」ことを保証するものではありません。個々の患者における有効性・適応の判断は、担当医が総合的に行うべき事項です。
              </div>
            </div>
          </section>

          {/* ====================================================== SECTION 6 */}
          <section id="s6" className="sec">
            <div className="sec-hd">
              <div className="sec-num">6</div>
              <h2 className="sec-title">経口ゲパント（予防適応を中心に）</h2>
            </div>

            <h3>6.1 概要と開発の経緯</h3>
            <p>
              ゲパント（gepant）は、CGRP受容体に可逆的に結合する低分子・経口の受容体拮抗薬です。CGRP受容体拮抗薬という薬剤クラス自体は2000年代から開発が進められていましたが、telcagepantなど第一世代の一部の化合物は、肝機能障害（肝酵素上昇）のリスクが確認され開発中止となった経緯があります。現在承認されている第二世代のゲパント（rimegepant、atogepantなど）は、この経緯を踏まえて肝安全性プロファイルが重点的に評価されたうえで各国規制当局の承認を得ています。
            </p>

            <div className="alert a-warn">
              <div className="alert-i">📖</div>
              <div>
                第一世代ゲパント（telcagepant等）の開発中止は肝機能障害リスクが理由であり、現行の第二世代ゲパントとは化合物・安全性プロファイルが異なる点に留意が必要です（詳細は10章）。
              </div>
            </div>

            <div className="src-grid">
              <div className="src">
                <div className="src-org">Review / Japan</div>
                <div className="src-t">
                  日本内科学会誌掲載レビュー（Migraine Management in Japan）
                </div>
                <div className="src-url">
                  <Ext href="https://pmc.ncbi.nlm.nih.gov/articles/PMC12854955/">
                    https://pmc.ncbi.nlm.nih.gov/articles/PMC12854955/
                  </Ext>
                </div>
              </div>
              <div className="src">
                <div className="src-org">Regulatory / EMA</div>
                <div className="src-t">
                  欧州医薬品庁（EMA）によるアトゲパントの評価文書（肝安全性の追加解析を経て承認）
                </div>
                <div className="src-url">
                  <Ext href="https://www.ema.europa.eu/en/documents/overview/aquipta-epar-medicine-overview_en.pdf">
                    ema.europa.eu/.../aquipta-epar-medicine-overview_en.pdf
                  </Ext>
                </div>
              </div>
            </div>

            <h3>6.2 モノクローナル抗体との違い</h3>
            <p>
              ゲパントは経口薬であるため、<strong>急性期治療と予防治療の両方</strong>
              に使える薬剤（rimegepantなど）が存在する点が、注射剤であるモノクローナル抗体（予防専用）との大きな違いです。また、代謝経路として肝代謝酵素（CYP3A4等）を介するため、薬物相互作用（他の薬剤との飲み合わせ）に関する注意が、抗体医薬より相対的に重要になります。
            </p>

            <h3>6.3 薬剤一覧（一般名ベース、予防適応の有無）</h3>
            <div className="tbl th-orange">
              <table>
                <thead>
                  <tr>
                    <th>一般名（成分名）</th>
                    <th>急性期治療</th>
                    <th>予防治療</th>
                    <th>備考</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>rimegepant（リメゲパント）</td>
                    <td>○</td>
                    <td>○</td>
                    <td>
                      経口薬（口腔内崩壊錠）。急性期・予防の両方に有効性が示されている国が複数存在
                    </td>
                  </tr>
                  <tr>
                    <td>atogepant（アトゲパント）</td>
                    <td>国・地域により異なる</td>
                    <td>○</td>
                    <td>主として予防適応で承認。一部地域では急性期適応が追加された例もある</td>
                  </tr>
                  <tr>
                    <td>ubrogepant（ウブロゲパント）</td>
                    <td>○</td>
                    <td>
                      <span className="bRed">✕（未承認）</span>
                    </td>
                    <td>
                      急性期治療専用として承認されている地域が中心（
                      <span className="bU">国内未承認</span>、11章参照）
                    </td>
                  </tr>
                  <tr>
                    <td>zavegepant（ザベゲパント）</td>
                    <td>○（点鼻）</td>
                    <td>
                      <span className="bRed">✕（未承認）</span>
                    </td>
                    <td>
                      点鼻薬タイプの急性期治療薬（<span className="bU">国内未承認</span>
                      、11章参照）
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3>6.4 エビデンスの概要</h3>
            <p>
              rimegepant・atogepantについては、プラセボ対照ランダム化比較試験{" "}
              <span className="bA">RCT</span>{" "}
              において、月間片頭痛日数の減少に関して統計学的に有意な差が報告されています。ただし、他の予防薬（トピラマート等）との直接比較（head-to-head試験）のデータは限定的であり、国内患者を対象とした間接比較研究が進められている段階です。
            </p>

            <div className="alert a-info">
              <div className="alert-i">ℹ️</div>
              <div>
                出典：atogepant・rimegepantの国内患者における比較有効性研究（間接比較解析） —{" "}
                <Ext href="https://journals.sagepub.com/doi/10.1177/03331024251374569">
                  journals.sagepub.com/doi/10.1177/03331024251374569
                </Ext>
              </div>
            </div>

            <div className="alert a-info">
              <div className="alert-i">📌</div>
              <div>
                <strong>エビデンスの質に関する注記</strong>
                ：ここでも「有効性が示されている」という表現にとどめ、効果の程度や個人差については担当医との相談が前提となります。
              </div>
            </div>
          </section>

          {/* ====================================================== SECTION 7 */}
          <section id="s7" className="sec">
            <div className="sec-hd">
              <div className="sec-num">7</div>
              <h2 className="sec-title">国際的な位置づけ・治療アルゴリズムの動向</h2>
            </div>

            <h3>7.1 国際頭痛学会（IHS）のグローバル推奨</h3>
            <p>
              国際頭痛学会（IHS）は2024年に、片頭痛の急性期治療および予防治療それぞれについて、世界各地の診療ガイドラインを横断的に参照した実践的推奨（global
              practice
              recommendations）を公表しました。この中でCGRP関連治療薬は、片頭痛に特異的な作用機序を持つ治療選択肢として位置づけられています。
            </p>
            <div className="alert a-info">
              <div className="alert-i">ℹ️</div>
              <div>
                出典：Puledda et al., International Headache Society Global Practice Recommendations
                for Preventive Pharmacological Treatment of Migraine, Cephalalgia 2024 —{" "}
                <Ext href="https://journals.sagepub.com/doi/10.1177/03331024241269735">
                  journals.sagepub.com/doi/10.1177/03331024241269735
                </Ext>
              </div>
            </div>

            <h3>7.2 米国頭痛学会（AHS）の立場表明</h3>
            <p>
              米国頭痛学会（AHS）は2024年3月、CGRP標的治療薬を片頭痛予防の「
              <span className="tG">第一選択の選択肢の一つ</span>
              」として位置づけるポジションステートメントを更新しました。この声明の要点は、CGRP標的治療薬の導入にあたり、従来型の予防薬を先に試して効果不十分であることを必須条件としない、という点にあります。
            </p>
            <div className="alert a-info">
              <div className="alert-i">ℹ️</div>
              <div>
                出典：Charles et al., CGRP-targeting therapies are a first-line option for the
                prevention of migraine: An American Headache Society position statement update,
                Headache 2024 —{" "}
                <Ext href="https://headachejournal.onlinelibrary.wiley.com/doi/10.1111/head.14692">
                  headachejournal.onlinelibrary.wiley.com/doi/10.1111/head.14692
                </Ext>
              </div>
            </div>

            <h3>7.3 英国NICEおよび欧州頭痛連合（EHF）の立場</h3>
            <p>
              一方、英国の医療技術評価機関であるNICE（National Institute for Health and Care
              Excellence）や欧州頭痛連合（EHF）のガイドラインでは、CGRPモノクローナル抗体は、既存の予防薬を複数種類（NICEの技術評価では概ね3種類程度）試して効果不十分であった場合に、専門医療機関での導入を検討する
              <span className="tO">段階的（step therapy）</span>な位置づけとされています。
            </p>
            <div className="alert a-info">
              <div className="alert-i">ℹ️</div>
              <div>
                出典：European Headache Federation guideline (2022 update) —{" "}
                <Ext href="https://pmc.ncbi.nlm.nih.gov/articles/PMC9188162/">
                  https://pmc.ncbi.nlm.nih.gov/articles/PMC9188162/
                </Ext>
              </div>
            </div>

            <div className="qr-grid">
              <div className="qr">
                <div className="qr-t">🇺🇸 米国 AHS（2024）</div>
                <p style={{ marginBottom: 0 }}>
                  他の予防薬の失敗歴を前提とせず、CGRP標的治療薬を
                  <strong className="tG">第一選択の一つ</strong>として検討可能とする立場。
                </p>
              </div>
              <div className="qr">
                <div className="qr-t">🇬🇧 英国 NICE / 🇪🇺 EHF</div>
                <p style={{ marginBottom: 0 }}>
                  既存予防薬を複数種類試して効果不十分な場合に、専門医療機関で導入を検討する
                  <strong className="tO">段階的アプローチ</strong>。
                </p>
              </div>
            </div>

            <p>
              このように、CGRP標的治療薬を予防治療の「どの段階で」検討するかについては、学会・国・医療制度によって考え方が分かれているのが現状です。次章では、日本国内における位置づけを扱います。
            </p>
          </section>

          {/* ====================================================== SECTION 8 */}
          <section id="s8" className="sec">
            <div className="sec-hd">
              <div className="sec-num">8</div>
              <h2 className="sec-title">国内承認状況（PMDA準拠）</h2>
            </div>

            <h3>8.1 抗CGRP/受容体モノクローナル抗体の国内承認</h3>
            <p>日本国内では、2021年に3剤の抗CGRP関連モノクローナル抗体が相次いで承認されました。</p>

            <div className="tbl th-teal">
              <table>
                <thead>
                  <tr>
                    <th>一般名</th>
                    <th>商品名（参考・中立併記）</th>
                    <th>国内承認年</th>
                    <th>発売時期（参考）</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>galcanezumab（ガルカネズマブ）</td>
                    <td>エムガルティ</td>
                    <td>2021年</td>
                    <td>2021年4月</td>
                  </tr>
                  <tr>
                    <td>erenumab（エレヌマブ）</td>
                    <td>アイモビーグ</td>
                    <td>2021年</td>
                    <td>2021年8月</td>
                  </tr>
                  <tr>
                    <td>fremanezumab（フレマネズマブ）</td>
                    <td>アジョビ</td>
                    <td>2021年</td>
                    <td>2021年8月</td>
                  </tr>
                  <tr>
                    <td>eptinezumab（エプチネズマブ）</td>
                    <td>—</td>
                    <td>
                      <span className="bU">国内未承認</span>
                    </td>
                    <td>―</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="alert a-info">
              <div className="alert-i">ℹ️</div>
              <div>
                出典：日本頭痛学会会員を対象としたオンライン調査論文 —{" "}
                <Ext href="https://pmc.ncbi.nlm.nih.gov/articles/PMC10941476/">
                  https://pmc.ncbi.nlm.nih.gov/articles/PMC10941476/
                </Ext>
              </div>
            </div>

            <p>
              これら3剤は、厚生労働省が高額な新規バイオ医薬品に対して設定する「
              <strong>最適使用推進ガイドライン</strong>
              」の適用対象となっており、処方にあたっては施設要件・医師要件（頭痛診療の専門性等）が定められています。これはPMDAの審査・承認プロセスと連動した国内特有の規制監視の仕組みです。
            </p>

            <h3>8.2 経口ゲパントの国内承認</h3>
            <p>
              国内では、2025年末にrimegepant（リメゲパント、商品名ナルティーク）が急性期治療・予防治療の両適応で承認・発売されました。続いて2026年2月19日にatogepant（アトゲパント水和物、商品名アクイプタ）が「片頭痛発作の発症抑制」（予防）の適応で承認され、同年4月17日に発売されています。
            </p>

            <div className="tbl th-orange">
              <table>
                <thead>
                  <tr>
                    <th>一般名</th>
                    <th>商品名（参考・中立併記）</th>
                    <th>国内適応</th>
                    <th>承認・発売時期（参考）</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>rimegepant（リメゲパント）</td>
                    <td>ナルティーク</td>
                    <td>急性期治療＋予防</td>
                    <td>2025年末頃 承認・発売</td>
                  </tr>
                  <tr>
                    <td>atogepant（アトゲパント水和物）</td>
                    <td>アクイプタ</td>
                    <td>予防（片頭痛発作の発症抑制）</td>
                    <td>2026年2月19日承認／同年4月17日発売</td>
                  </tr>
                  <tr>
                    <td>ubrogepant（ウブロゲパント）</td>
                    <td>―</td>
                    <td colSpan={2}>
                      <span className="bU">国内未承認</span>
                    </td>
                  </tr>
                  <tr>
                    <td>zavegepant（ザベゲパント）</td>
                    <td>―</td>
                    <td colSpan={2}>
                      <span className="bU">国内未承認</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="src-grid">
              <div className="src">
                <div className="src-org">News / Medical</div>
                <div className="src-t">
                  日経メディカル「片頭痛予防に2剤目の経口CGRP受容体拮抗薬」
                </div>
                <div className="src-url">
                  <Ext href="https://medical.nikkeibp.co.jp/leaf/all/series/drug/update/202604/592703.html">
                    medical.nikkeibp.co.jp/.../592703.html
                  </Ext>
                </div>
              </div>
              <div className="src">
                <div className="src-org">News / Medical</div>
                <div className="src-t">日経メディカル「『片頭痛フリー』は実現できるか」</div>
                <div className="src-url">
                  <Ext href="https://medical.nikkeibp.co.jp/leaf/mem/pub/report/202604/592858.html">
                    medical.nikkeibp.co.jp/.../592858.html
                  </Ext>
                </div>
              </div>
              <div className="src">
                <div className="src-org">Press Release</div>
                <div className="src-t">
                  ファイザー株式会社 プレスリリース（リメゲパント承認申請）
                </div>
                <div className="src-url">
                  <Ext href="https://www.pfizer.co.jp/pfizer/company/press/2024/2024-11-27">
                    pfizer.co.jp/pfizer/company/press/2024/2024-11-27
                  </Ext>
                </div>
              </div>
            </div>

            <h3>8.3 日本頭痛学会による位置づけ</h3>
            <p>
              日本頭痛学会は、抗CGRP関連抗体薬の使用に関する暫定的なガイドライン（「CGRP関連新規片頭痛治療薬ガイドライン（暫定版）」）を公表しており、その中で示されている一般的な考え方として、
              <strong className="tN">月間片頭痛日数がおおむね4日以上</strong>であり、かつ
              <strong className="tN">既存の予防薬による治療歴があり効果不十分</strong>
              であることを、CGRP関連抗体薬導入の目安とする枠組みが示されています。これは7.3で述べた英国NICEの段階的アプローチと近い考え方であり、7.2で述べた米国AHSの「第一選択」という位置づけとは異なる点に留意が必要です。
            </p>

            <div className="alert a-info">
              <div className="alert-i">ℹ️</div>
              <div>
                出典：日本頭痛学会「CGRP関連新規片頭痛治療薬ガイドライン（暫定版）」 —{" "}
                <Ext href="https://www.jhsnet.net/guideline_CGRP.html">
                  https://www.jhsnet.net/guideline_CGRP.html
                </Ext>
                ／日本頭痛学会 ガイドライン一覧ページ —{" "}
                <Ext href="https://www.jhsnet.net/guideline.html">
                  https://www.jhsnet.net/guideline.html
                </Ext>
              </div>
            </div>

            <h3>8.4 国内 vs 国際的な位置づけの比較図</h3>
            <div className="mmd">
              <div className="mmd-lbl">
                フローチャート — 米国AHSと日本／英国の段階的アプローチの比較
              </div>
              <MermaidDiagram
                themeVariables={CGRP_MERMAID_THEME}
                chart={`flowchart TD
    subgraph US ["米国：AHS 2024年ポジションステートメント"]
        U1["片頭痛予防治療の適応を検討"] --> U2["CGRP標的治療薬を第一選択の一つとして検討可能\\n(他剤の失敗歴を前提としない)"]
    end

    subgraph JPUK ["日本／英国：段階的アプローチ"]
        J1["月間片頭痛日数がおおむね4日以上"] --> J2["既存予防薬による治療歴があり効果不十分"]
        J2 --> J3["国内では最適使用推進ガイドラインの基準を満たす医療機関・医師が処方"]
        J3 --> J4["CGRP関連抗体薬／ゲパントの導入を検討"]
    end`}
              />
            </div>

            <div className="alert a-info">
              <div className="alert-i">📌</div>
              <div>
                上記はあくまで各ガイドライン文書の一般的な考え方を図示したものであり、個別の適応判断は担当医が行います。
              </div>
            </div>
          </section>

          {/* ====================================================== SECTION 9 */}
          <section id="s9" className="sec">
            <div className="sec-hd">
              <div className="sec-num">9</div>
              <h2 className="sec-title">エビデンスの質と有効性解釈の注意点</h2>
            </div>

            <p>
              CGRP標的治療薬に関するエビデンスは、ランダム化比較試験（RCT）、システマティックレビュー・メタアナリシス、そして近年蓄積が進んでいる実臨床観察研究（real-world
              evidence）の3層で構成されています。
            </p>

            <div className="qr-grid">
              <div className="qr">
                <div className="qr-t">
                  <span className="bA">RCT</span> ランダム化比較試験
                </div>
                <p style={{ marginBottom: 0 }}>
                  プラセボ対照試験において、月間片頭痛日数の減少や50%レスポンダー率について統計学的に有意な効果が繰り返し報告されています。
                </p>
              </div>
              <div className="qr">
                <div className="qr-t">
                  <span className="bB">SR/メタアナリシス</span>
                </div>
                <p style={{ marginBottom: 0 }}>
                  Cochrane
                  Libraryの方法論に準拠した複数の系統的レビューが、抗CGRPモノクローナル抗体群の有効性・忍容性について一定の質のエビデンスを示しています。
                </p>
              </div>
              <div className="qr">
                <div className="qr-t">
                  <span className="bC">実臨床データ</span>
                </div>
                <p style={{ marginBottom: 0 }}>
                  日本国内を含む多施設・長期の観察研究が進行中であり、RCTでは把握しきれない長期の治療継続率や、まれな有害事象の実態把握に寄与しています。
                </p>
              </div>
            </div>

            <div className="alert a-info">
              <div className="alert-i">📌</div>
              <div>
                これらのバッジは各エビデンスが得られた研究デザインの<strong>層（カテゴリ）</strong>
                を示すものであり、優劣を格付けする公式な質評価スケールではありません。
              </div>
            </div>

            <div className="alert a-info">
              <div className="alert-i">ℹ️</div>
              <div>
                いずれの層のエビデンスも、「有効性が示されている」「一定の質のエビデンスがある」という相対的な表現で理解されるべきものであり、個々の患者における効果を保証するものではありません。また、エビデンスの多くは特定の患者選択基準（例：月間片頭痛日数、既往治療歴）を満たす集団から得られたものであり、その基準に当てはまらない患者への外挿には注意が必要です。
              </div>
            </div>
          </section>

          {/* ====================================================== SECTION 10 */}
          <section id="s10" className="sec">
            <div className="sec-hd">
              <div className="sec-num">10</div>
              <h2 className="sec-title">安全性に関する一般的留意点</h2>
            </div>

            <div className="alert a-warn">
              <div className="alert-i">⚠️</div>
              <div>
                以下は、公表されている系統的レビュー・添付文書・規制当局評価文書等に基づく、
                <strong>薬効群レベル</strong>
                での一般的な留意点です。個別の患者における副作用リスク評価・対応は、必ず医師・薬剤師にご相談ください。
              </div>
            </div>

            <div className="qr-grid">
              <div className="qr">
                <div className="qr-t">モノクローナル抗体群</div>
                <p style={{ marginBottom: 0 }}>
                  注射部位反応、便秘（特にリガンド標的抗体で報告）などが一般に報告されています。受容体標的抗体（erenumab）については、血圧上昇（高血圧）のリスクについて複数の系統的レビューで検討が行われています。
                </p>
              </div>
              <div className="qr">
                <div className="qr-t">ゲパント群</div>
                <p style={{ marginBottom: 0 }}>
                  悪心、便秘、傾眠などが一般に報告されています。第一世代の一部のCGRP受容体拮抗薬で肝機能障害が問題となった経緯があるため、現行の第二世代ゲパントについても、承認審査の過程で肝安全性が重点的に評価されています。
                </p>
              </div>
              <div className="qr">
                <div className="qr-t">共通の留意点</div>
                <p style={{ marginBottom: 0 }}>
                  妊娠・授乳中の使用や、他疾患・他剤併用時の安全性については、エビデンスが限定的な領域も残っています。個別の背景を持つ患者への適応判断は、専門医による総合的評価が必要です。
                </p>
              </div>
            </div>

            <div className="src-grid">
              <div className="src">
                <div className="src-org">Systematic Review</div>
                <div className="src-t">CGRPモノクローナル抗体と高血圧に関する系統的レビュー</div>
                <div className="src-url">
                  <Ext href="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC12435869/">
                    ncbi.nlm.nih.gov/pmc/articles/PMC12435869/
                  </Ext>
                </div>
              </div>
              <div className="src">
                <div className="src-org">Regulatory / EMA</div>
                <div className="src-t">EMAによるアトゲパントの肝安全性評価</div>
                <div className="src-url">
                  <Ext href="https://www.ema.europa.eu/en/documents/overview/aquipta-epar-medicine-overview_en.pdf">
                    ema.europa.eu/.../aquipta-epar-medicine-overview_en.pdf
                  </Ext>
                </div>
              </div>
            </div>
          </section>

          {/* ====================================================== SECTION 11 */}
          <section id="s11" className="sec">
            <div className="sec-hd">
              <div className="sec-num">11</div>
              <h2 className="sec-title">未承認・適応外に関する事実整理</h2>
            </div>

            <div className="alert a-info">
              <div className="alert-i">ℹ️</div>
              <div>
                以下の内容は、<strong>2026年7月時点</strong>で確認できる公表情報に基づく
                <strong>事実の整理</strong>
                であり、使用を勧奨するものではありません。将来的に承認状況が変わる可能性があるため、最新情報はPMDAの公式発表をご確認ください。
              </div>
            </div>

            <div className="qr-grid">
              <div className="qr">
                <div className="qr-t">
                  eptinezumab（エプチネズマブ） <span className="bU">国内未承認</span>
                </div>
                <p style={{ marginBottom: 0 }}>
                  米国FDAでは2020年、欧州EMAでは2022年1月に承認。国内では日本人を含む臨床試験（第III相
                  SUNRISE試験、長期継続試験SUNSET等）が実施され、長期の安全性・有効性データが報告されている段階です。
                </p>
              </div>
              <div className="qr">
                <div className="qr-t">
                  ubrogepant（ウブロゲパント） <span className="bU">国内未承認</span>
                </div>
                <p style={{ marginBottom: 0 }}>
                  米国では急性期治療薬として承認されていますが、国内では未承認です。
                </p>
              </div>
              <div className="qr">
                <div className="qr-t">
                  zavegepant（ザベゲパント、点鼻薬） <span className="bU">国内未承認</span>
                </div>
                <p style={{ marginBottom: 0 }}>
                  米国では急性期治療薬として承認されていますが、国内では未承認です。
                </p>
              </div>
            </div>

            <div className="src-grid">
              <div className="src">
                <div className="src-org">Clinical Trial / Japan</div>
                <div className="src-t">エプチネズマブの国内第III相試験（長期継続試験）</div>
                <div className="src-url">
                  <Ext href="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC12659320/">
                    ncbi.nlm.nih.gov/pmc/articles/PMC12659320/
                  </Ext>
                </div>
              </div>
              <div className="src">
                <div className="src-org">Press Release</div>
                <div className="src-t">
                  ルンドベック・ジャパン プレスリリース（エプチネズマブ第III相試験）
                </div>
                <div className="src-url">
                  <Ext href="https://www.lundbeck.com/content/dam/lundbeck-com/asia/japan/press/news-release/20241105_%E3%83%AB%E3%83%B3%E3%83%89%E3%83%99%E3%83%83%E3%82%AF%E3%80%81%E7%89%87%E9%A0%AD%E7%97%9B%E4%BA%88%E9%98%B2%E3%81%AB%E5%AF%BE%E3%81%99%E3%82%8B%E3%82%A8%E3%83%97%E3%83%81%E3%83%8D%E3%82%BA%E3%83%9E%E3%83%96%E3%81%AE%E7%AC%AClll%E7%9B%B8%E6%A4%9C%E8%A8%BC%E7%9A%84%E8%A9%A6%E9%A8%93%EF%BC%88SUNRISE%EF%BC%89%E3%81%AE%E8%89%AF%E5%A5%BD%E3%81%AA%E7%B5%90%E6%9E%9C%E3%82%92%E7%99%BA%E8%A1%A8.pdf">
                    lundbeck.com（プレスリリースPDF）
                  </Ext>
                </div>
              </div>
            </div>

            <div className="alert a-danger">
              <div className="alert-i">🚫</div>
              <div>
                <strong>重要</strong>
                ：上記の海外承認薬について、国内未承認であるにもかかわらず個人輸入等で入手・使用することは、安全性・品質管理上のリスクを伴います。本ページはそうした利用を一切勧奨するものではありません。
              </div>
            </div>
          </section>

          {/* ====================================================== SECTION 12 */}
          <section id="s12" className="sec">
            <div className="sec-hd">
              <div className="sec-num">12</div>
              <h2 className="sec-title">まとめ：位置づけの全体像</h2>
            </div>

            <div className="mmd">
              <div className="mmd-lbl">
                フローチャート — 片頭痛診断からCGRP標的治療薬導入までの全体像
              </div>
              <MermaidDiagram
                themeVariables={CGRP_MERMAID_THEME}
                chart={`flowchart TD
    A["片頭痛と診断（ICHD-3基準）"] --> B{"月間片頭痛日数・既往治療歴の評価"}
    B --> C["急性期治療の最適化\\n(トリプタン等、一般的な薬効群)"]
    B --> D["予防治療の適応を検討"]
    D --> E["国際的にはCGRP標的治療薬の位置づけに関する\\nガイドライン間の差異が存在"]
    E --> F["米国AHS：第一選択の一つとして検討可能"]
    E --> G["日本JHS／英国NICE：既存予防薬の効果不十分を\\n前提とした段階的導入"]
    F --> H["抗CGRP関連抗体薬／経口ゲパントの適応を医師が総合判断"]
    G --> H
    H --> I["医師・薬剤師による個別の処方・フォローアップ"]`}
              />
            </div>

            <p>
              CGRP経路を標的とした治療薬は、抗体医薬（モノクローナル抗体）と低分子経口薬（ゲパント）という2つの技術基盤から構成され、いずれも国際的な頭痛医学において重要な予防治療選択肢として認識されています。一方で、「どの段階で」これらの治療を検討するかについては、学会・国・医療制度によって考え方に幅があり、日本国内ではPMDAの承認審査・最適使用推進ガイドライン・日本頭痛学会のガイドラインが連動する形で運用されています。最終的な治療選択は、これらの情報を踏まえたうえで、担当医との相談に基づいて個別化して決定されるべき事項です。
            </p>
          </section>

          {/* ====================================================== SECTION 13 */}
          <section id="s13" className="sec">
            <div className="sec-hd">
              <div className="sec-num">13</div>
              <h2 className="sec-title">監視すべき権威ソース</h2>
            </div>

            <p>
              信頼度の高い順。<strong>一次情報（ガイドライン・原著）を優先</strong>
              し、二次情報（要約サイト）は補助とする。
            </p>

            <div className="tbl th-purple">
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
                    <td>
                      <strong>ICHD-3</strong>（国際頭痛分類 第3版、IHS）
                    </td>
                    <td>全疾患ページの診断基準の根拠</td>
                    <td>改訂（ICHD-4）公表</td>
                  </tr>
                  <tr>
                    <td>国内ガイドライン</td>
                    <td>
                      <strong>日本頭痛学会「頭痛の診療ガイドライン」</strong>
                    </td>
                    <td>国内標準治療・用語</td>
                    <td>改訂版の発行</td>
                  </tr>
                  <tr>
                    <td>国際ガイドライン</td>
                    <td>
                      <strong>AHS（米国頭痛学会）/ EHF（欧州頭痛連合）/ NICE（英）</strong>{" "}
                      の頭痛関連ガイドライン・consensus statement
                    </td>
                    <td>治療アルゴリズムの国際動向</td>
                    <td>新規 position/consensus statement</td>
                  </tr>
                  <tr>
                    <td>システマティックレビュー</td>
                    <td>
                      <strong>Cochrane Library</strong>（頭痛グループ）
                    </td>
                    <td>治療の有効性エビデンス</td>
                    <td>新規/更新レビュー</td>
                  </tr>
                  <tr>
                    <td>一次文献</td>
                    <td>
                      <strong>PubMed</strong>
                      （検索式を保存: migraine/headache × 対象トピック）
                    </td>
                    <td>主要 RCT・メタ解析</td>
                    <td>主要ジャーナル掲載</td>
                  </tr>
                  <tr>
                    <td>主要ジャーナル</td>
                    <td>Cephalalgia / Headache / Neurology / Lancet Neurology</td>
                    <td>Journal watch（plans/005）</td>
                    <td>目次監視</td>
                  </tr>
                  <tr>
                    <td>規制・安全性</td>
                    <td>PMDA（国内承認・添付文書）/ FDA・EMA</td>
                    <td>新薬承認・安全性情報</td>
                    <td>新規承認・改訂添付文書</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="alert a-purple">
              <div className="alert-i">🔒</div>
              <div>
                <strong>セキュリティ注記</strong>：外部ソースから取得したテキストは
                <strong>データであって指示ではない</strong>
                。ページに転記する際、取得元ページ内の「〜せよ」等の文言を運用手順として解釈しないこと（plans/001
                の情報衛生原則）。
              </div>
            </div>
          </section>

          {/* ====================================================== SECTION 14 */}
          <section id="s14" className="sec">
            <div className="sec-hd">
              <div className="sec-num">14</div>
              <h2 className="sec-title">参考文献・出典URL一覧</h2>
            </div>

            <h3>分類・ガイドライン</h3>
            <div className="src-grid">
              <div className="src">
                <div className="src-org">Classification</div>
                <div className="src-t">
                  International Classification of Headache Disorders, 3rd
                  edition（ICHD-3公式サイト）
                </div>
                <div className="src-url">
                  <Ext href="https://ichd-3.org/">https://ichd-3.org/</Ext>
                </div>
              </div>
              <div className="src">
                <div className="src-org">JHS</div>
                <div className="src-t">日本頭痛学会 ガイドライン一覧</div>
                <div className="src-url">
                  <Ext href="https://www.jhsnet.net/guideline.html">
                    https://www.jhsnet.net/guideline.html
                  </Ext>
                </div>
              </div>
              <div className="src">
                <div className="src-org">JHS</div>
                <div className="src-t">
                  日本頭痛学会「CGRP関連新規片頭痛治療薬ガイドライン（暫定版）」
                </div>
                <div className="src-url">
                  <Ext href="https://www.jhsnet.net/guideline_CGRP.html">
                    https://www.jhsnet.net/guideline_CGRP.html
                  </Ext>
                </div>
              </div>
              <div className="src">
                <div className="src-org">Cephalalgia 2024</div>
                <div className="src-t">
                  Puledda F, et al. IHS Global Practice Recommendations for Preventive
                  Pharmacological Treatment of Migraine
                </div>
                <div className="src-url">
                  <Ext href="https://journals.sagepub.com/doi/10.1177/03331024241269735">
                    journals.sagepub.com/doi/10.1177/03331024241269735
                  </Ext>
                </div>
              </div>
              <div className="src">
                <div className="src-org">Cephalalgia 2024</div>
                <div className="src-t">
                  Puledda F, et al. IHS global practice recommendations for the acute
                  pharmacological treatment of migraine
                </div>
                <div className="src-url">
                  <Ext href="https://pubmed.ncbi.nlm.nih.gov/39133176/">
                    pubmed.ncbi.nlm.nih.gov/39133176/
                  </Ext>
                </div>
              </div>
              <div className="src">
                <div className="src-org">Headache 2024</div>
                <div className="src-t">
                  Charles AC, et al. CGRP-targeting therapies are a first-line option for the
                  prevention of migraine（AHS position statement update）
                </div>
                <div className="src-url">
                  <Ext href="https://headachejournal.onlinelibrary.wiley.com/doi/10.1111/head.14692">
                    headachejournal.onlinelibrary.wiley.com/doi/10.1111/head.14692
                  </Ext>
                </div>
              </div>
              <div className="src">
                <div className="src-org">EHF 2022</div>
                <div className="src-t">
                  European Headache Federation guideline on monoclonal antibodies targeting the CGRP
                  pathway（2022 update）
                </div>
                <div className="src-url">
                  <Ext href="https://pmc.ncbi.nlm.nih.gov/articles/PMC9188162/">
                    pmc.ncbi.nlm.nih.gov/articles/PMC9188162/
                  </Ext>
                </div>
              </div>
            </div>

            <h3>エビデンス（システマティックレビュー・メタアナリシス・RCT）</h3>
            <div className="src-grid">
              <div className="src">
                <div className="src-org">Meta-analysis</div>
                <div className="src-t">
                  CGRP monoclonal antibody for preventive treatment of chronic migraine:
                  meta-analysis update
                </div>
                <div className="src-url">
                  <Ext href="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC6379644/">
                    ncbi.nlm.nih.gov/pmc/articles/PMC6379644/
                  </Ext>
                </div>
              </div>
              <div className="src">
                <div className="src-org">Systematic Review</div>
                <div className="src-t">
                  Efficacy and Safety of Anti-CGRP Monoclonal Antibodies in Preventing Migraines: A
                  Systematic Review
                </div>
                <div className="src-url">
                  <Ext href="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC10586710/">
                    ncbi.nlm.nih.gov/pmc/articles/PMC10586710/
                  </Ext>
                </div>
              </div>
              <div className="src">
                <div className="src-org">Systematic Review</div>
                <div className="src-t">
                  Assessing the Occurrence of Hypertension in Patients Receiving CGRP Monoclonal
                  Antibodies: A Systematic Review
                </div>
                <div className="src-url">
                  <Ext href="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC12435869/">
                    ncbi.nlm.nih.gov/pmc/articles/PMC12435869/
                  </Ext>
                </div>
              </div>
              <div className="src">
                <div className="src-org">EJN 2026 / Japan</div>
                <div className="src-t">
                  A Real-World Study of CGRP Monoclonal Antibodies for Migraine（日本国内コホート）
                </div>
                <div className="src-url">
                  <Ext href="https://onlinelibrary.wiley.com/doi/10.1111/ene.70562">
                    onlinelibrary.wiley.com/doi/10.1111/ene.70562
                  </Ext>
                </div>
              </div>
              <div className="src">
                <div className="src-org">Front Neurol 2026 / Japan</div>
                <div className="src-t">
                  Three-year real-world effectiveness of anti-CGRP monoclonal
                  antibodies（日本国内コホート）
                </div>
                <div className="src-url">
                  <Ext href="https://www.frontiersin.org/journals/neurology/articles/10.3389/fneur.2026.1827022/full">
                    frontiersin.org/.../fneur.2026.1827022/full
                  </Ext>
                </div>
              </div>
              <div className="src">
                <div className="src-org">Review 2026</div>
                <div className="src-t">
                  CGRP and Migraine: Real World Insights and Future Therapeutic Directions
                </div>
                <div className="src-url">
                  <Ext href="https://pmc.ncbi.nlm.nih.gov/articles/PMC12818195/">
                    pmc.ncbi.nlm.nih.gov/articles/PMC12818195/
                  </Ext>
                </div>
              </div>
              <div className="src">
                <div className="src-org">Review / Japan</div>
                <div className="src-t">
                  Migraine Management in Japan: Current Approaches and Science
                  Narrative（ゲパントの肝安全性含む）
                </div>
                <div className="src-url">
                  <Ext href="https://pmc.ncbi.nlm.nih.gov/articles/PMC12854955/">
                    pmc.ncbi.nlm.nih.gov/articles/PMC12854955/
                  </Ext>
                </div>
              </div>
              <div className="src">
                <div className="src-org">Cephalalgia</div>
                <div className="src-t">
                  Comparative effectiveness of atogepant and rimegepant for migraine prevention in
                  Japanese patients
                </div>
                <div className="src-url">
                  <Ext href="https://journals.sagepub.com/doi/10.1177/03331024251374569">
                    journals.sagepub.com/doi/10.1177/03331024251374569
                  </Ext>
                </div>
              </div>
              <div className="src">
                <div className="src-org">J Headache Pain 2025 / Japan</div>
                <div className="src-t">
                  Long-term tolerability and effectiveness of eptinezumab in Japanese
                  adults（SUNSET試験）
                </div>
                <div className="src-url">
                  <Ext href="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC12659320/">
                    ncbi.nlm.nih.gov/pmc/articles/PMC12659320/
                  </Ext>
                </div>
              </div>
            </div>

            <h3>規制・承認情報（FDA / EMA / PMDA）</h3>
            <div className="src-grid">
              <div className="src">
                <div className="src-org">News / Medical</div>
                <div className="src-t">
                  日経メディカル「片頭痛予防に2剤目の経口CGRP受容体拮抗薬」（アトゲパント国内承認）
                </div>
                <div className="src-url">
                  <Ext href="https://medical.nikkeibp.co.jp/leaf/all/series/drug/update/202604/592703.html">
                    medical.nikkeibp.co.jp/.../592703.html
                  </Ext>
                </div>
              </div>
              <div className="src">
                <div className="src-org">News / Medical</div>
                <div className="src-t">
                  日経メディカル「『片頭痛フリー』は実現できるか、2剤登場したゲパント薬の実力は」
                </div>
                <div className="src-url">
                  <Ext href="https://medical.nikkeibp.co.jp/leaf/mem/pub/report/202604/592858.html">
                    medical.nikkeibp.co.jp/.../592858.html
                  </Ext>
                </div>
              </div>
              <div className="src">
                <div className="src-org">Press Release</div>
                <div className="src-t">
                  ファイザー株式会社 プレスリリース（リメゲパント国内承認申請）
                </div>
                <div className="src-url">
                  <Ext href="https://www.pfizer.co.jp/pfizer/company/press/2024/2024-11-27">
                    pfizer.co.jp/pfizer/company/press/2024/2024-11-27
                  </Ext>
                </div>
              </div>
              <div className="src">
                <div className="src-org">PMDA</div>
                <div className="src-t">PMDA「新医薬品承認品目一覧」</div>
                <div className="src-url">
                  <Ext href="https://www.pmda.go.jp/review-services/drug-reviews/review-information/p-drugs/0040.html">
                    pmda.go.jp/.../p-drugs/0040.html
                  </Ext>
                </div>
              </div>
              <div className="src">
                <div className="src-org">Survey / Japan</div>
                <div className="src-t">
                  CGRP-monoclonal antibodies in Japan: online survey of Japanese Headache Society
                  physicians（国内承認経緯）
                </div>
                <div className="src-url">
                  <Ext href="https://pmc.ncbi.nlm.nih.gov/articles/PMC10941476/">
                    pmc.ncbi.nlm.nih.gov/articles/PMC10941476/
                  </Ext>
                </div>
              </div>
              <div className="src">
                <div className="src-org">EMA</div>
                <div className="src-t">EMA: Aquipta (atogepant) 医薬品概要</div>
                <div className="src-url">
                  <Ext href="https://www.ema.europa.eu/en/medicines/human/EPAR/aquipta">
                    ema.europa.eu/en/medicines/human/EPAR/aquipta
                  </Ext>
                </div>
              </div>
              <div className="src">
                <div className="src-org">EMA</div>
                <div className="src-t">
                  EMA: Aquipta 医薬品概要（肝安全性の追加解析を経た承認の経緯）
                </div>
                <div className="src-url">
                  <Ext href="https://www.ema.europa.eu/en/documents/overview/aquipta-epar-medicine-overview_en.pdf">
                    ema.europa.eu/.../aquipta-epar-medicine-overview_en.pdf
                  </Ext>
                </div>
              </div>
              <div className="src">
                <div className="src-org">Press Release</div>
                <div className="src-t">
                  Pfizer/Biohaven
                  プレスリリース：VYDURA（rimegepant）欧州初承認（急性期・予防両適応）
                </div>
                <div className="src-url">
                  <Ext href="https://www.pfizer.com/news/press-release/press-release-detail/pfizer-and-biohavens-vydurar-rimegepant-granted-first-ever">
                    pfizer.com（プレスリリース）
                  </Ext>
                </div>
              </div>
              <div className="src">
                <div className="src-org">Press Release</div>
                <div className="src-t">
                  ルンドベック・ジャパン プレスリリース（エプチネズマブ、国内未承認・海外承認状況）
                </div>
                <div className="src-url">
                  <Ext href="https://www.lundbeck.com/content/dam/lundbeck-com/asia/japan/press/news-release/20241105_%E3%83%AB%E3%83%B3%E3%83%89%E3%83%99%E3%83%83%E3%82%AF%E3%80%81%E7%89%87%E9%A0%AD%E7%97%9B%E4%BA%88%E9%98%B2%E3%81%AB%E5%AF%BE%E3%81%99%E3%82%8B%E3%82%A8%E3%83%97%E3%83%81%E3%83%8D%E3%82%BA%E3%83%9E%E3%83%96%E3%81%AE%E7%AC%AClll%E7%9B%B8%E6%A4%9C%E8%A8%BC%E7%9A%84%E8%A9%A6%E9%A8%93%EF%BC%88SUNRISE%EF%BC%89%E3%81%AE%E8%89%AF%E5%A5%BD%E3%81%AA%E7%B5%90%E6%9E%9C%E3%82%92%E7%99%BA%E8%A1%A8.pdf">
                    lundbeck.com（プレスリリースPDF）
                  </Ext>
                </div>
              </div>
            </div>

            <div className="alert a-warn">
              <div className="alert-i">📋</div>
              <div>
                <strong>免責事項（再掲）</strong>
                ：本ページは教育目的の一般的な医学情報提供であり、個別の患者に対する診断・治療の推奨ではありません。記載内容は作成時点（2026年7月）で確認できる公表情報に基づいており、規制当局の承認状況・ガイドラインは今後変更される可能性があります。実際の治療方針については、必ず医師・薬剤師にご相談ください。本ページの内容と、実際に処方される医薬品の添付文書・最新の公式情報が異なる場合は、後者を優先してください。
              </div>
            </div>
          </section>
        </main>
      </div>

      {/* FOOTER */}
      <div className="footer">
        <strong>CGRP経路を標的とした頭痛治療薬</strong> —
        抗CGRP/受容体モノクローナル抗体と経口ゲパントの位置づけ・国内承認状況（PMDA準拠）
        <br />📅 作成年: 2026 | 次回レビュー推奨: ガイドライン改訂・PMDA新規承認時
        <br />
        ⚠️
        本資料は学術・教育・研究目的のみを対象としています。臨床への適用は必ず資格を持つ医療専門家の監督のもとで行ってください。
      </div>
    </div>
  );
}
