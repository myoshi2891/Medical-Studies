import "./headache-related-muscles.css";
import type { Metadata } from "next";
import { RelatedLinks } from "@/components/content/RelatedLinks";
import { Ext } from "@/components/Ext";
import { HeadacheRelatedMusclesSidebar } from "@/components/headaches/HeadacheRelatedMusclesSidebar";
import MermaidDiagram from "@/components/MermaidDiagram";

export const metadata: Metadata = {
  title: "頭痛に関連する筋肉 ― 国際文献に基づく解剖学とメカニズム",
  description:
    "ICHD-3および国際的エビデンスに基づく頭痛関連筋、トリガーポイント、中枢性感作、三叉神経頸髄複合体の解剖学とメカニズム解説ガイド。",
};

const MSC_MERMAID_THEME: Record<string, string> = {
  primaryColor: "#fbeef1",
  primaryTextColor: "#5c1a2e",
  primaryBorderColor: "#8e2748",
  lineColor: "#8e2748",
  secondaryColor: "#e0f2f1",
  tertiaryColor: "#e8f5e9",
  edgeLabelBackground: "#ffffff",
  fontSize: "13px",
};

export default function HeadacheRelatedMusclesPage() {
  return (
    <div className="headache-related-muscles">
      {/* HERO */}
      <div className="hero">
        <div style={{ fontSize: 40 }}>💪</div>
        <h1>頭痛に関連する筋肉</h1>
        <p className="hero-sub">
          Muscles and Headache: Evidence-Based Anatomy, Trigger Points &amp; Central Sensitization
        </p>
        <div className="hero-tags">
          <span className="hero-tag">ICHD-3</span>
          <span className="hero-tag">Tension-Type Headache</span>
          <span className="hero-tag">Cervicogenic Headache</span>
          <span className="hero-tag">Myofascial Trigger Points</span>
          <span className="hero-tag">Central Sensitization</span>
        </div>
      </div>

      {/* DISCLAIMER */}
      <div className="disclaimer">
        <strong>⚠️ Academic Disclaimer（学術免責事項）</strong>　本資料は
        <strong>学術・教育・研究目的のみ</strong>
        を対象としています。すべての内容は資格を持つ医療専門家による臨床適用前のレビューが必要です。個人的な医療アドバイス・診断・処方を提供するものではありません。頭痛が持続する、急激に悪化する、今までにない性質の頭痛が起きた場合は、必ず医師の診察を受けてください。
      </div>

      {/* LAYOUT */}
      <div className="layout">
        {/* SIDEBAR */}
        <HeadacheRelatedMusclesSidebar />

        {/* MAIN CONTENT */}
        <main className="main">
          {/* ====================================================== SECTION 1 */}
          <section id="s1" className="sec">
            <div className="sec-hd">
              <div className="sec-num">1</div>
              <h2 className="sec-title">頭痛の国際分類を知る（ICHD-3）</h2>
            </div>

            <p>
              頭痛と聞くと「脳の病気では」と不安になる方も多いですが、日常的に経験する頭痛の多くは、頭・首まわりの
              <strong>筋肉</strong>
              の状態と深く関わっています。頭痛の診断は、国際頭痛学会（International Headache
              Society, IHS）が策定する
              <strong>国際頭痛分類第3版（ICHD-3, 2018年）</strong>
              に基づいて行われます。頭痛は大きく「一次性頭痛（他の病気が原因ではない頭痛）」と「二次性頭痛（他の疾患が原因の頭痛）」に分類され、筋肉が主な関与因子となるのは主に以下の3つです。
            </p>

            <div className="tbl">
              <table>
                <thead>
                  <tr>
                    <th>分類</th>
                    <th>頭痛の種類</th>
                    <th>ICHD-3コード</th>
                    <th>筋肉との関係</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>一次性頭痛</td>
                    <td>緊張型頭痛（Tension-Type Headache, TTH）</td>
                    <td>2</td>
                    <td>頭蓋周囲筋（pericranial muscles）の圧痛が特徴的所見</td>
                  </tr>
                  <tr>
                    <td>二次性頭痛</td>
                    <td>頸原性頭痛（Cervicogenic Headache）</td>
                    <td>11.2.1</td>
                    <td>頸椎・頸部軟部組織（筋肉を含む）の障害が原因</td>
                  </tr>
                  <tr>
                    <td>二次性頭痛に近縁</td>
                    <td>後頭神経痛（Occipital Neuralgia）</td>
                    <td>13.4</td>
                    <td>後頭下筋群による大後頭神経の圧迫などが関与</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="alert a-info">
              <div className="alert-i">ℹ️</div>
              <div>
                国際頭痛学会は、緊張型頭痛を世界で最も頻度の高い神経疾患の一つとし、全世界で20億人以上が経験していると報告しています。大規模メタ解析では、18〜65歳人口の年間有病率はTTHで約33%、片頭痛で約24%と推定されています。
              </div>
            </div>

            <div className="alert a-danger">
              <div className="alert-i">🚨</div>
              <div>
                <strong>受診の目安：</strong>
                今までに経験したことのない激しい頭痛（雷鳴頭痛）、発熱や項部硬直を伴う頭痛、頭部外傷後の頭痛、意識障害やしびれ・麻痺を伴う頭痛などは、筋肉が原因ではない緊急性の高い病態である可能性があります。速やかに医療機関を受診してください。
              </div>
            </div>

            <div className="mmd">
              <div className="mmd-lbl">フローチャート ― 本記事の進め方（Step 1〜8）</div>
              <MermaidDiagram
                themeVariables={MSC_MERMAID_THEME}
                chart={`flowchart LR
    S1["Step1\\n頭痛の国際分類"] --> S2["Step2\\n緊張型頭痛と筋肉"]
    S2 --> S3["Step3\\n関連筋の解剖学"]
    S3 --> S4["Step4\\nトリガーポイントと関連痛"]
    S4 --> S5["Step5\\n末梢性から中枢性感作へ"]
    S5 --> S6["Step6\\n頸原性頭痛の神経メカニズム"]
    S6 --> S7["Step7\\n臨床での触診評価"]
    S7 --> S8["Step8\\nエビデンスに基づく対処法"]`}
              />
            </div>
          </section>

          {/* ====================================================== SECTION 2 */}
          <section id="s2" className="sec">
            <div className="sec-hd">
              <div className="sec-num">2</div>
              <h2 className="sec-title">筋肉が主役となる代表的頭痛「緊張型頭痛」</h2>
            </div>

            <p>
              緊張型頭痛はかつて「筋収縮性頭痛（muscle contraction
              headache）」とも呼ばれていました。ICHD-3の診断基準は、要旨として以下のように整理できます（原文を要約したものです）。
            </p>

            <div className="tbl">
              <table>
                <thead>
                  <tr>
                    <th>基準</th>
                    <th>内容の要旨</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>A</td>
                    <td>同様の頭痛エピソードを繰り返している</td>
                  </tr>
                  <tr>
                    <td>B</td>
                    <td>持続時間は30分〜7日間</td>
                  </tr>
                  <tr>
                    <td>C</td>
                    <td>
                      以下の4特徴のうち2つ以上：両側性／圧迫感・締め付け感（拍動性ではない）／軽度〜中等度の強さ／日常動作で悪化しない
                    </td>
                  </tr>
                  <tr>
                    <td>D</td>
                    <td>悪心・嘔吐がない、光過敏か音過敏のどちらか一方のみ（両方はない）</td>
                  </tr>
                  <tr>
                    <td>E</td>
                    <td>他の疾患による頭痛として説明できない</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="alert a-purple">
              <div className="alert-i">🔎</div>
              <div>
                ICHD-3ではこの頭痛を、<strong>「頭蓋周囲の圧痛を伴うもの」</strong>と
                <strong>「伴わないもの」</strong>
                にさらに細分類しています。この圧痛の有無を調べる対象こそが、Step
                3で紹介する筋肉群です。
              </div>
            </div>
          </section>

          {/* ====================================================== SECTION 3 */}
          <section id="s3" className="sec">
            <div className="sec-hd">
              <div className="sec-num">3</div>
              <h2 className="sec-title">頭痛に関連する筋肉の解剖学</h2>
            </div>

            <p>
              臨床研究で繰り返し取り上げられる「頭痛関連筋」を部位ごとに整理します。特にBendtsenらの触診法（Total
              Tenderness
              Score）では、前頭筋・側頭筋・咬筋・翼突筋・胸鎖乳突筋・頭板状筋・僧帽筋の7筋群が評価対象とされています。
            </p>

            <h3>3-1. 頭部の筋肉（表情筋・咀嚼筋）</h3>
            <div className="tbl th-teal">
              <table>
                <thead>
                  <tr>
                    <th>筋肉名</th>
                    <th>位置</th>
                    <th>起始</th>
                    <th>停止</th>
                    <th>主な働き</th>
                    <th>関連する頭痛</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>前頭筋（Frontalis）</td>
                    <td>額</td>
                    <td>帽状腱膜</td>
                    <td>眉の皮膚</td>
                    <td>眉を上げる、額にしわを寄せる</td>
                    <td>緊張型頭痛（前頭部の圧痛点）</td>
                  </tr>
                  <tr>
                    <td>後頭筋（Occipitalis）</td>
                    <td>後頭部</td>
                    <td>後頭骨上項線</td>
                    <td>帽状腱膜</td>
                    <td>頭皮を後方へ引く</td>
                    <td>緊張型頭痛（後頭部の圧痛点）</td>
                  </tr>
                  <tr>
                    <td>側頭筋（Temporalis）</td>
                    <td>こめかみ</td>
                    <td>側頭窩</td>
                    <td>下顎骨筋突起</td>
                    <td>咀嚼（下顎を引き上げる）</td>
                    <td>緊張型頭痛、顎関節症関連頭痛</td>
                  </tr>
                  <tr>
                    <td>咬筋（Masseter）</td>
                    <td>頬〜下顎角</td>
                    <td>頬骨弓</td>
                    <td>下顎角・下顎枝外側</td>
                    <td>咀嚼</td>
                    <td>緊張型頭痛、顎関節症関連頭痛</td>
                  </tr>
                  <tr>
                    <td>翼突筋（外側・内側）</td>
                    <td>下顎の深部</td>
                    <td>蝶形骨翼状突起</td>
                    <td>下顎頸／下顎枝内側面</td>
                    <td>咀嚼、下顎の側方運動</td>
                    <td>緊張型頭痛、顎関節症関連頭痛</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3>3-2. 頸部の筋肉（表層〜中層）</h3>
            <div className="tbl th-teal">
              <table>
                <thead>
                  <tr>
                    <th>筋肉名</th>
                    <th>位置</th>
                    <th>起始</th>
                    <th>停止</th>
                    <th>主な働き</th>
                    <th>関連する頭痛</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>胸鎖乳突筋（SCM）</td>
                    <td>頸部前外側</td>
                    <td>胸骨柄・鎖骨</td>
                    <td>側頭骨乳様突起</td>
                    <td>頭部の回旋・屈曲</td>
                    <td>緊張型頭痛、頸原性頭痛（前頭部・眼窩への関連痛）</td>
                  </tr>
                  <tr>
                    <td>僧帽筋上部（Upper Trapezius）</td>
                    <td>後頸部〜肩</td>
                    <td>後頭骨・項靭帯</td>
                    <td>鎖骨外側・肩峰</td>
                    <td>肩甲骨挙上、頭部伸展の補助</td>
                    <td>緊張型頭痛、頸原性頭痛</td>
                  </tr>
                  <tr>
                    <td>頭板状筋（Splenius Capitis）</td>
                    <td>後頸部</td>
                    <td>項靭帯・下位頸椎〜上位胸椎棘突起</td>
                    <td>乳様突起・上項線外側</td>
                    <td>頭部の伸展・回旋</td>
                    <td>緊張型頭痛</td>
                  </tr>
                  <tr>
                    <td>肩甲挙筋（Levator Scapulae）</td>
                    <td>頸部後外側</td>
                    <td>C1〜C4横突起</td>
                    <td>肩甲骨上角</td>
                    <td>肩甲骨挙上</td>
                    <td>緊張型頭痛との関連が報告される筋の一つ</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3>3-3. 後頭下筋群（深層・頸原性頭痛のカギ）</h3>
            <p>後頭骨のすぐ下、僧帽筋・頭板状筋・半棘筋の深層に位置する4つの小さな筋肉群です。</p>
            <div className="tbl th-teal">
              <table>
                <thead>
                  <tr>
                    <th>筋肉名</th>
                    <th>起始</th>
                    <th>停止</th>
                    <th>主な働き</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>大後頭直筋（Rectus Capitis Posterior Major）</td>
                    <td>軸椎（C2）棘突起</td>
                    <td>後頭骨下項線外側部</td>
                    <td>頭部の伸展</td>
                  </tr>
                  <tr>
                    <td>小後頭直筋（Rectus Capitis Posterior Minor）</td>
                    <td>環椎（C1）後結節</td>
                    <td>後頭骨下項線内側部</td>
                    <td>頭部の伸展</td>
                  </tr>
                  <tr>
                    <td>上頭斜筋（Obliquus Capitis Superior）</td>
                    <td>環椎横突起</td>
                    <td>後頭骨（上項線と下項線の間）</td>
                    <td>頭部の伸展・側屈</td>
                  </tr>
                  <tr>
                    <td>下頭斜筋（Obliquus Capitis Inferior）</td>
                    <td>軸椎棘突起</td>
                    <td>環椎横突起（頭蓋には付着しない唯一の後頭下筋）</td>
                    <td>頭部の回旋</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="alert a-info">
              <div className="alert-i">🧠</div>
              <div>
                これら4筋のうち3筋（大後頭直筋・上頭斜筋・下頭斜筋）が囲む領域は「
                <strong>後頭下三角（suboccipital triangle）</strong>
                」と呼ばれ、椎骨動脈と後頭下神経（C1後枝）が走行する重要な解剖学的指標です。また、小後頭直筋は
                <strong>結合組織の橋（筋硬膜橋）を介して硬膜と直接つながっている</strong>
                ことが解剖学的に示されており、これが頸部の筋緊張と頭痛を結びつける一因として注目されています。
              </div>
            </div>

            <div className="mmd">
              <div className="mmd-lbl">フローチャート ― 筋肉群と頭痛タイプの対応</div>
              <MermaidDiagram
                themeVariables={MSC_MERMAID_THEME}
                chart={`flowchart TD
    M1["前頭筋 / 側頭筋 / 咬筋 / 翼突筋\\n頭部の筋肉"] --> TTH["緊張型頭痛\\nTension-Type Headache"]
    M2["胸鎖乳突筋 / 僧帽筋上部 / 頭板状筋\\n頸部表層の筋肉"] --> TTH
    M2 --> CGH["頸原性頭痛\\nCervicogenic Headache"]
    M3["後頭下筋群\\n頸部深層の筋肉"] --> CGH
    M3 --> ON["後頭神経痛\\nOccipital Neuralgia"]`}
              />
            </div>
          </section>

          {/* ====================================================== SECTION 4 */}
          <section id="s4" className="sec">
            <div className="sec-hd">
              <div className="sec-num">4</div>
              <h2 className="sec-title">筋筋膜性トリガーポイントと「関連痛」</h2>
            </div>

            <p>
              トリガーポイント（myofascial trigger point,
              TrP）とは、筋肉内にできる過敏な小さな硬結（張った帯状の部分の中にある圧痛点）で、押すと局所の痛みだけでなく離れた部位に痛みが放散する「
              <strong>関連痛（referred pain）</strong>
              」を引き起こすことが知られています。慢性緊張型頭痛の患者を対象とした対照研究では、健常者と比較して上部僧帽筋・胸鎖乳突筋・側頭筋にトリガーポイントが有意に多く認められ、これらを刺激すると患者本人が「いつもの頭痛と同じ」と認識する関連痛（＝活動性トリガーポイント）が再現されることが報告されています。
            </p>

            <div className="tbl th-purple">
              <table>
                <thead>
                  <tr>
                    <th>筋肉</th>
                    <th>トリガーポイントからの主な関連痛領域</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>上部僧帽筋</td>
                    <td>後頸部外側から耳の後ろを通り側頭部へ</td>
                  </tr>
                  <tr>
                    <td>胸鎖乳突筋</td>
                    <td>前頭側頭部、同側の眼窩周囲、前額部</td>
                  </tr>
                  <tr>
                    <td>側頭筋</td>
                    <td>こめかみから眼窩上部にかけて</td>
                  </tr>
                  <tr>
                    <td>咬筋</td>
                    <td>側頭部、頬部、上顎の歯列</td>
                  </tr>
                  <tr>
                    <td>後頭下筋群</td>
                    <td>後頭部から頭頂部にかけて（研究では検出頻度が最も高い筋群）</td>
                  </tr>
                  <tr>
                    <td>頭板状筋</td>
                    <td>頭頂部、眼窩後方</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="alert a-ok">
              <div className="alert-i">📊</div>
              <div>
                小児の慢性緊張型頭痛を対象とした研究でも、頭部・頸部・肩の筋群（側頭筋・咬筋・上頭斜筋・上部僧帽筋・胸鎖乳突筋・後頭下筋・肩甲挙筋）に活動性トリガーポイントが有意に多く見られ、健常児では活動性トリガーポイントはほとんど確認されなかったと報告されています。
              </div>
            </div>
          </section>

          {/* ====================================================== SECTION 5 */}
          <section id="s5" className="sec">
            <div className="sec-hd">
              <div className="sec-num">5</div>
              <h2 className="sec-title">なぜ筋肉の異常が頭痛につながるのか？</h2>
            </div>

            <p>
              緊張型頭痛の病態モデルとして最も広く引用されているのが、デンマークの頭痛研究者 Lars
              Bendtsen が提唱した「末梢性感作→中枢性感作」モデルです。
            </p>

            <div className="mmd">
              <div className="mmd-lbl">
                フローチャート ― 緊張型頭痛の慢性化メカニズム（Bendtsenモデル）
              </div>
              <MermaidDiagram
                themeVariables={MSC_MERMAID_THEME}
                chart={`flowchart TD
    A["ストレス・不良姿勢・眼精疲労・\\n過度な咀嚼など"] --> B["頭蓋周囲筋の持続的な収縮・使用"]
    B --> C["筋・筋膜組織内の侵害受容器の感作\\n末梢性感作 peripheral sensitization"]
    C --> D["三叉神経脊髄路核および\\n上位頸髄後角ニューロンへの\\n持続的な痛み信号の入力"]
    D --> E{"痛み入力が反復・持続するか"}
    E -->|"散発的・短期間"| F["反復性緊張型頭痛\\nEpisodic TTH"]
    E -->|"長期間持続"| G["中枢神経系の感作\\nCentral Sensitization"]
    G --> H["下行性疼痛抑制系の機能低下 +\\n痛覚閾値の全身的な低下"]
    H --> I["慢性緊張型頭痛\\nChronic TTH"]`}
              />
            </div>

            <div className="alert a-purple">
              <div className="alert-i">💡</div>
              <div>
                このモデルのポイントは2点です。①
                <strong>反復性（エピソード性）緊張型頭痛</strong>
                では、頭蓋周囲筋・筋膜からの末梢性の痛み信号が主な発生源と考えられています。②その痛み信号が長期間繰り返されると、脊髄後角・三叉神経脊髄路核レベルで神経が過敏になる「中枢性感作」が生じ、
                <strong>もともとの筋肉の問題が改善しても頭痛が慢性化してしまう</strong>
                と考えられています。実際、慢性緊張型頭痛患者では健常者と比べて頭蓋周囲筋が硬く、圧痛閾値が全身的に低下していることが報告されています。
              </div>
            </div>

            <p>
              この知見は、「エピソード性の段階で末梢（筋肉）への対処を行い、慢性化＝中枢性感作の進行を防ぐことが重要」という治療戦略の根拠にもなっています。
            </p>
          </section>

          {/* ====================================================== SECTION 6 */}
          <section id="s6" className="sec">
            <div className="sec-hd">
              <div className="sec-num">6</div>
              <h2 className="sec-title">頸原性頭痛の神経メカニズム</h2>
            </div>

            <p>
              首の筋肉や関節の異常が、なぜ額や目の奥の痛みとして感じられるのでしょうか。その鍵は「
              <strong>三叉神経頸髄複合体（trigeminocervical complex, TCC）</strong>
              」と呼ばれる神経の合流地点にあります。顔面の感覚を伝える三叉神経の下行路（三叉神経脊髄路核）は、脳幹から下降して
              <strong>上位頸髄（C1〜C3）の後角にまで連続</strong>
              しています。この場所で、顔面からの三叉神経の情報と、後頭下筋群・胸鎖乳突筋・僧帽筋など上位頸部の筋肉や関節からの感覚情報が
              <strong>同じ神経細胞に収束</strong>します。
            </p>

            <div className="mmd">
              <div className="mmd-lbl">フローチャート ― 三叉神経頸髄複合体における感覚の収束</div>
              <MermaidDiagram
                themeVariables={MSC_MERMAID_THEME}
                chart={`flowchart LR
    subgraph PERI["末梢からの入力"]
        N1["三叉神経第1枝\\n眼窩・前頭部の感覚"]
        N2["上位頸神経 C1-C3\\n後頭下筋群・胸鎖乳突筋・僧帽筋"]
    end
    N1 --> TCC["三叉神経頸髄複合体\\nTrigeminocervical Complex"]
    N2 --> TCC
    TCC --> P["視床を経由し大脳皮質で痛みを知覚"]
    P --> Q["頸部が原因の痛みが前頭部・眼窩部の\\n痛みとして感じられる = 関連痛"]`}
              />
            </div>

            <p>
              この神経学的な「合流」により、後頭下筋群や頸部の異常による痛み信号が、脳では「前頭部や眼の奥の痛み」として誤って認識されることがあります。これが頸原性頭痛や後頭神経痛で、後頭部だけでなく前頭部・眼窩部にまで痛みが広がる理由の神経科学的な説明とされています。
            </p>

            <div className="alert a-warn">
              <div className="alert-i">⚠️</div>
              <div>
                ICHD-3では、頸原性頭痛の診断には画像所見や神経ブロックによる診断的裏付けが重視されており、単なる「首こり」との自己判断は推奨されていません。気になる症状がある場合は専門医に相談してください。
              </div>
            </div>
          </section>

          {/* ====================================================== SECTION 7 */}
          <section id="s7" className="sec">
            <div className="sec-hd">
              <div className="sec-num">7</div>
              <h2 className="sec-title">臨床での触診評価：Total Tenderness Score</h2>
            </div>

            <p>
              研究・臨床の現場では、指（示指・中指）で小さく回転させるように圧をかけて筋肉の圧痛を評価する方法が標準化されています。対象となるのは前頭筋・側頭筋・咬筋・翼突筋・胸鎖乳突筋・頭板状筋・僧帽筋の7筋群（左右で計測）です。
            </p>

            <div className="tbl">
              <table>
                <thead>
                  <tr>
                    <th>評価の流れ</th>
                    <th>内容</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>① 対象筋の選定</td>
                    <td>前頭筋・側頭筋・咬筋・翼突筋・胸鎖乳突筋・頭板状筋・僧帽筋（左右）</td>
                  </tr>
                  <tr>
                    <td>② 触診方法</td>
                    <td>
                      指で小さな回転運動を加えながら一定の圧で押す（研究では圧力計＝パルポメーターを使用することもある）
                    </td>
                  </tr>
                  <tr>
                    <td>③ スコアリング</td>
                    <td>各筋につき0〜3点（0：圧痛なし〜3：強い圧痛・逃避反応あり）</td>
                  </tr>
                  <tr>
                    <td>④ 総合評価</td>
                    <td>全筋の合計点を「Total Tenderness Score（総圧痛スコア）」として算出</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="alert a-info">
              <div className="alert-i">📈</div>
              <div>
                慢性緊張型頭痛患者を対象とした地域住民ベースの研究（ノルウェー・Akershus研究）では、慢性緊張型頭痛群は一般人口と比較して総圧痛スコアが有意に高いことが確認されており、頸部痛を合併している場合はさらに圧痛が強くなる傾向が報告されています。
              </div>
            </div>
          </section>

          {/* ====================================================== SECTION 8 */}
          <section id="s8" className="sec">
            <div className="sec-hd">
              <div className="sec-num">8</div>
              <h2 className="sec-title">エビデンスに基づく対処法</h2>
            </div>

            <p>
              筋肉が関与する頭痛に対しては、薬物療法以外にも、理学療法・徒手療法に関する複数のランダム化比較試験・システマティックレビューが報告されています。バッジは各アプローチについて引用したシステマティックレビュー・メタ解析が示す
              <strong>エビデンスの量と一貫性に関する定性的な要約</strong>
              であり、正式なGRADE評価ではありません。あくまで一般的な知見であり、個々の症状への適用は専門家の判断が必要です。
            </p>

            <div className="tbl th-orange">
              <table>
                <thead>
                  <tr>
                    <th>エビデンス</th>
                    <th>アプローチ</th>
                    <th>内容</th>
                    <th>エビデンスの概要</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <span className="bB">中程度</span>
                    </td>
                    <td>トリガーポイント治療</td>
                    <td>
                      圧迫（虚血性圧迫）、ドライニードリング、マッサージなどでトリガーポイントを不活化
                    </td>
                    <td>
                      システマティックレビューで頭痛の強度・頻度・持続時間の減少が報告されている
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <span className="bB">中程度</span>
                    </td>
                    <td>頭蓋・頸部・顎の運動療法</td>
                    <td>ストレッチ、筋膜リリース、頸部牽引、姿勢矯正運動</td>
                    <td>
                      複数のRCTで短期〜中期的な症状軽減効果が報告されているが、標準化された単一プロトコルはまだ確立されていない
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <span className="bB">中程度</span>
                    </td>
                    <td>徒手療法（マニュアルセラピー）</td>
                    <td>頸椎モビライゼーション、結合組織マニピュレーションなど</td>
                    <td>頭蓋・頸部・顎領域へのアプローチで有意な効果を示す報告がある</td>
                  </tr>
                  <tr>
                    <td>
                      <span className="bC">限定的</span>
                    </td>
                    <td>姿勢・生活習慣の見直し</td>
                    <td>
                      長時間のデスクワーク・スマートフォン使用時の頭部前方位（forward head
                      posture）の改善
                    </td>
                    <td>
                      頭部前方位はトリガーポイントの活動性や圧痛スコアの高さと関連することが報告されている
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="alert a-warn">
              <div className="alert-i">⚠️</div>
              <div>
                上記はあくまで一般的な研究知見の要約です。個々の治療方針は、症状・既往歴を踏まえて医師・理学療法士などの専門家と相談の上で決定してください。
              </div>
            </div>
          </section>

          {/* ====================================================== SECTION 9 */}
          <section id="s9" className="sec">
            <div className="sec-hd">
              <div className="sec-num">9</div>
              <h2 className="sec-title">まとめ</h2>
            </div>

            <div className="qr-grid">
              <div className="qr">
                <div className="qr-t">頭蓋周囲筋と緊張型頭痛</div>
                <p style={{ marginBottom: 0 }}>
                  日常的な頭痛の多くを占める緊張型頭痛は、前頭筋・側頭筋・咬筋・翼突筋・胸鎖乳突筋・頭板状筋・僧帽筋という「頭蓋周囲筋」の圧痛と密接に関係しています。
                </p>
              </div>
              <div className="qr">
                <div className="qr-t">後頭下筋群と頸原性頭痛</div>
                <p style={{ marginBottom: 0 }}>
                  後頭下筋群は硬膜と結合組織でつながっており、頸原性頭痛の発生に深く関与すると考えられています。
                </p>
              </div>
              <div className="qr">
                <div className="qr-t">末梢から中枢へ</div>
                <p style={{ marginBottom: 0 }}>
                  筋肉の異常による末梢からの痛み信号が長期間続くと、脊髄・脳幹レベルで痛みを感じやすくなる「中枢性感作」が生じ、頭痛が慢性化する可能性があります。
                </p>
              </div>
              <div className="qr">
                <div className="qr-t">神経の合流点</div>
                <p style={{ marginBottom: 0 }}>
                  三叉神経と上位頸神経が「三叉神経頸髄複合体」で合流するため、首の筋肉の問題が前頭部・眼窩部の痛みとして感じられることがあります。
                </p>
              </div>
            </div>

            <div className="alert a-ok">
              <div className="alert-i">✅</div>
              <div>
                トリガーポイント治療や運動療法・徒手療法など、筋肉に着目したアプローチのエビデンスも蓄積されつつあります。頭痛の性質が変化した場合や心配な症状がある場合は、自己判断せず医療機関に相談しましょう。
              </div>
            </div>
          </section>

          {/* ====================================================== SECTION 10 */}
          <section id="s10" className="sec">
            <div className="sec-hd">
              <div className="sec-num">10</div>
              <h2 className="sec-title">参考文献・情報源</h2>
            </div>

            <p>
              すべて国際的に認知された情報源（国際頭痛学会公式分類、米国国立医学図書館
              NCBI/PubMed、査読付き医学雑誌等）から構成しています。
            </p>

            <div className="src-grid">
              <div className="src">
                <div className="src-org">International Headache Society</div>
                <div className="src-t">ICHD-3 公式分類：緊張型頭痛の項</div>
                <Ext className="src-url" href="https://ichd-3.org/2-tension-type-headache/">
                  ichd-3.org/2-tension-type-headache
                </Ext>
              </div>
              <div className="src">
                <div className="src-org">International Headache Society</div>
                <div className="src-t">ICHD-3 公式分類アウトライン</div>
                <Ext className="src-url" href="https://ichd-3.org/classification-outline/">
                  ichd-3.org/classification-outline
                </Ext>
              </div>
              <div className="src">
                <div className="src-org">International Headache Society</div>
                <div className="src-t">ICHD-3 第3版 公式PDF</div>
                <Ext
                  className="src-url"
                  href="https://ichd-3.org/wp-content/uploads/2018/01/The-International-Classification-of-Headache-Disorders-3rd-Edition-2018.pdf"
                >
                  ichd-3.org（公式PDF）
                </Ext>
              </div>
              <div className="src">
                <div className="src-org">International Headache Society</div>
                <div className="src-t">緊張型頭痛の疫学に関する公式ページ</div>
                <Ext
                  className="src-url"
                  href="https://ihs-headache.org/en/resources/tension-type-headache-awareness-campaign/"
                >
                  ihs-headache.org
                </Ext>
              </div>
              <div className="src">
                <div className="src-org">NCBI StatPearls</div>
                <div className="src-t">Muscle Contraction Tension Headache</div>
                <Ext className="src-url" href="https://www.ncbi.nlm.nih.gov/books/NBK562274/">
                  ncbi.nlm.nih.gov/books/NBK562274
                </Ext>
              </div>
              <div className="src">
                <div className="src-org">NCBI StatPearls</div>
                <div className="src-t">Anatomy, Head and Neck, Suboccipital Muscles</div>
                <Ext className="src-url" href="https://www.ncbi.nlm.nih.gov/books/NBK567762/">
                  ncbi.nlm.nih.gov/books/NBK567762
                </Ext>
              </div>
              <div className="src">
                <div className="src-org">NCBI StatPearls</div>
                <div className="src-t">Neuroanatomy, Suboccipital Nerve</div>
                <Ext className="src-url" href="https://www.ncbi.nlm.nih.gov/books/NBK556133/">
                  ncbi.nlm.nih.gov/books/NBK556133
                </Ext>
              </div>
              <div className="src">
                <div className="src-org">PubMed</div>
                <div className="src-t">
                  Fernández-de-las-Peñas et al.
                  慢性緊張型頭痛におけるトリガーポイントと臨床パラメータの関係
                </div>
                <Ext className="src-url" href="https://pubmed.ncbi.nlm.nih.gov/16942471/">
                  pubmed.ncbi.nlm.nih.gov/16942471
                </Ext>
              </div>
              <div className="src">
                <div className="src-org">PMC（NIH）</div>
                <div className="src-t">
                  小児の慢性緊張型頭痛における頭頸部トリガーポイントからの関連痛
                </div>
                <Ext className="src-url" href="https://pmc.ncbi.nlm.nih.gov/articles/PMC3056016/">
                  pmc.ncbi.nlm.nih.gov/PMC3056016
                </Ext>
              </div>
              <div className="src">
                <div className="src-org">Cephalalgia</div>
                <div className="src-t">
                  Bendtsen L. Central Sensitization in Tension-Type Headache（2000）
                </div>
                <Ext
                  className="src-url"
                  href="https://journals.sagepub.com/doi/10.1046/j.1468-2982.2000.00070.x"
                >
                  journals.sagepub.com
                </Ext>
              </div>
              <div className="src">
                <div className="src-org">Neurologic Clinics</div>
                <div className="src-t">Bendtsen L, Jensen R. Tension-type headache（2009）</div>
                <Ext className="src-url" href="https://pubmed.ncbi.nlm.nih.gov/19289230/">
                  pubmed.ncbi.nlm.nih.gov/19289230
                </Ext>
              </div>
              <div className="src">
                <div className="src-org">Practical Neurology</div>
                <div className="src-t">Cervical Spine Considerations in Headache Management</div>
                <Ext
                  className="src-url"
                  href="https://practicalneurology.com/archives/may-jun-2025-issue/cervical-spine-considerations-in-headache-management/35799/"
                >
                  practicalneurology.com
                </Ext>
              </div>
              <div className="src">
                <div className="src-org">ASRA Pain Medicine</div>
                <div className="src-t">Cervicogenic Headache</div>
                <Ext
                  className="src-url"
                  href="https://asra.com/news-publications/asra-updates/blog-landing/legacy-b-blog-posts/2019/08/06/cervicogenic-headache"
                >
                  asra.com
                </Ext>
              </div>
              <div className="src">
                <div className="src-org">TeachMeAnatomy</div>
                <div className="src-t">Suboccipital Muscles（筋硬膜橋についての記述を含む）</div>
                <Ext
                  className="src-url"
                  href="https://teachmeanatomy.info/neck/muscles/suboccipital/"
                >
                  teachmeanatomy.info
                </Ext>
              </div>
              <div className="src">
                <div className="src-org">Kenhub</div>
                <div className="src-t">Suboccipital Triangle</div>
                <Ext
                  className="src-url"
                  href="https://www.kenhub.com/en/library/anatomy/suboccipital-triangle"
                >
                  kenhub.com
                </Ext>
              </div>
              <div className="src">
                <div className="src-org">PMC（NIH）</div>
                <div className="src-t">
                  The global prevalence of headache disorders of public-health
                  importance（メタ解析）
                </div>
                <Ext
                  className="src-url"
                  href="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC12502191/"
                >
                  ncbi.nlm.nih.gov/pmc/PMC12502191
                </Ext>
              </div>
              <div className="src">
                <div className="src-org">PMC（NIH）</div>
                <div className="src-t">
                  Trigger Point Therapy Techniques for Tension Headaches（システマティックレビュー）
                </div>
                <Ext
                  className="src-url"
                  href="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC11431695/"
                >
                  ncbi.nlm.nih.gov/pmc/PMC11431695
                </Ext>
              </div>
              <div className="src">
                <div className="src-org">PMC（NIH）</div>
                <div className="src-t">
                  Physical Therapy in Tension-Type Headache: Systematic Review of RCTs
                </div>
                <Ext
                  className="src-url"
                  href="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC10001815/"
                >
                  ncbi.nlm.nih.gov/pmc/PMC10001815
                </Ext>
              </div>
              <div className="src">
                <div className="src-org">PMC（NIH）</div>
                <div className="src-t">
                  Effectiveness of Trigger Point Manual Treatment on Primary Headaches（メタ解析）
                </div>
                <Ext
                  className="src-url"
                  href="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC5928320/"
                >
                  ncbi.nlm.nih.gov/pmc/PMC5928320
                </Ext>
              </div>
              <div className="src">
                <div className="src-org">MedLink Neurology</div>
                <div className="src-t">Tension-type headache</div>
                <Ext
                  className="src-url"
                  href="https://www.medlink.com/articles/tension-type-headache"
                >
                  medlink.com
                </Ext>
              </div>
            </div>
          </section>

          {/* Related links */}
          <RelatedLinks href="/anatomy/headache-related-muscles" />
        </main>
      </div>

      {/* FOOTER */}
      <div className="footer">
        <strong>頭痛に関連する筋肉</strong> — Muscles and Headache: Evidence-Based Anatomy, Trigger
        Points &amp; Central Sensitization
        <br />📅 作成年: 2026 | 次回レビュー推奨: ガイドライン更新時
        <br />
        ⚠️
        本資料は学術・教育・研究目的のみを対象としています。臨床への適用は必ず資格を持つ医療専門家の監督のもとで行ってください。
      </div>
    </div>
  );
}
