import type { Metadata } from "next";
import { Ext } from "@/components/Ext";
import MermaidDiagram from "@/components/MermaidDiagram";
import { SleepAndHeadacheSidebar } from "@/components/therapies/SleepAndHeadacheSidebar";
import "./sleep-and-headache-guide.css";

export const metadata: Metadata = {
  title: "睡眠と頭痛 — エビデンスに基づく基礎知識と睡眠衛生ガイド",
  description:
    "ICHD-3・NICE・AASM・Cochraneなど国際的な一次情報に基づく教育コンテンツ（初学者向け・ステップバイステップ解説）",
};

const SLEEP_MERMAID_THEME: Record<string, string> = {
  primaryColor: "#3949ab",
  primaryTextColor: "#ffffff",
  primaryBorderColor: "#1a2151",
  lineColor: "#7e57c2",
  secondaryColor: "#e0f2f1",
  tertiaryColor: "#e8f5e9",
  edgeLabelBackground: "#ffffff",
  fontSize: "13px",
};

/**
 * Renders an educational guide about the relationship between sleep and headache.
 *
 * @returns The complete sleep and headache guide page
 */
export default function SleepAndHeadacheGuidePage() {
  return (
    <div className="sleep-guide">
      {/* HERO */}
      <div className="hero">
        <div style={{ fontSize: 40 }}>🌙🧠</div>
        <h1>睡眠と頭痛 — エビデンスに基づく基礎知識と睡眠衛生ガイド</h1>
        <p className="hero-sub">
          ICHD-3・NICE・AASM・Cochraneなど国際的な一次情報に基づく教育コンテンツ（初学者向け・ステップバイステップ解説）
        </p>
        <div className="hero-tags">
          <span className="hero-tag">ICHD-3</span>
          <span className="hero-tag">AASM / World Sleep Society</span>
          <span className="hero-tag">NICE</span>
          <span className="hero-tag">Cochrane</span>
          <span className="hero-tag">睡眠衛生 &amp; CBT-I</span>
          <span className="hero-tag">教育目的</span>
        </div>
      </div>

      {/* DISCLAIMER */}
      <div className="disclaimer">
        <strong>⚠️ Academic Disclaimer（学術免責事項）</strong>
        <br />
        本ページは<strong>学術・教育・情報提供のみ</strong>
        を目的としており、個別の患者に対する診断・治療の推奨ではありません。記載内容は国際的に認知されているガイドライン・システマティックレビュー等の一次情報に基づく一般的な解説です。ご自身の症状・治療方針については、必ず医師・薬剤師にご相談ください。緊急性の高い症状（Step
        8「レッドフラッグ」参照）がある場合は速やかに医療機関を受診してください。
      </div>

      {/* LAYOUT */}
      <div className="layout">
        <SleepAndHeadacheSidebar />

        {/* MAIN CONTENT */}
        <main className="main">
          {/* SECTION 1 */}
          <section id="s1" className="sec">
            <div className="sec-hd">
              <div className="sec-num">1</div>
              <h2 className="sec-title">頭痛を分類する — ICHD-3とは</h2>
            </div>

            <p>
              睡眠と頭痛の関係を理解する前に、まず「頭痛はどう分類されているか」を知る必要があります。国際的な診断基準として使われているのが、国際頭痛学会（International
              Headache Society, IHS）が策定した<strong>国際頭痛分類第3版（ICHD-3）</strong>
              です。世界保健機関（WHO）の疾病分類（ICD）とも連携する形で位置づけられており、臨床・研究の両方で標準的に用いられています。
            </p>

            <div className="tbl">
              <table>
                <thead>
                  <tr>
                    <th>区分</th>
                    <th>内容</th>
                    <th>代表例</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      一次性頭痛
                      <br />
                      (Primary headache)
                    </td>
                    <td>それ自体が独立した疾患である頭痛</td>
                    <td>
                      片頭痛、緊張型頭痛、群発頭痛などの三叉神経・自律神経性頭痛、その他の一次性頭痛（睡眠時のみ起こる「就眠時頭痛」を含む）
                    </td>
                  </tr>
                  <tr>
                    <td>
                      二次性頭痛
                      <br />
                      (Secondary headache)
                    </td>
                    <td>他の疾患・状態が原因となって生じる頭痛</td>
                    <td>
                      外傷、血管障害、感染症、そして本ガイドで扱う「睡眠時無呼吸による頭痛」など、恒常性の障害に起因する頭痛
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="mmd">
              <div className="mmd-lbl">フローチャート — ICHD-3による頭痛分類の全体像</div>
              <MermaidDiagram
                themeVariables={SLEEP_MERMAID_THEME}
                chart={`flowchart TB
    H["頭痛（ICHD-3による分類）"] --> P["一次性頭痛\\n（それ自体が独立した疾患）"]
    H --> S["二次性頭痛\\n（他の疾患が原因）"]
    P --> P1["片頭痛"]
    P --> P2["緊張型頭痛"]
    P --> P3["群発頭痛など\\n三叉神経・自律神経性頭痛"]
    P --> P4["その他の一次性頭痛\\n（就眠時頭痛を含む）"]
    S --> S1["外傷・血管障害・感染症など"]
    S --> S2["恒常性の障害に起因する頭痛\\n（睡眠時無呼吸による頭痛を含む）"]`}
              />
            </div>

            <div className="alert a-info">
              <div className="alert-i">ℹ️</div>
              <div>
                ICHD-3は2018年に正式発行されており、現在は次期改訂版（ICHD-4）に向けた検討が国際頭痛学会で進められています（2026年時点）。最新の改訂状況は{" "}
                <Ext href="https://ihs-headache.org/en/resources/ichd/">IHS公式サイト</Ext>{" "}
                で確認できます。
              </div>
            </div>

            <div className="alert a-purple">
              <div className="alert-i">🇯🇵</div>
              <div>
                国内では、日本神経学会・日本頭痛学会・日本神経治療学会の共同監修による「頭痛の診療ガイドライン2021」が、ICHD-3に準拠した国内標準の診療指針として公表されています（
                <Ext href="https://minds.jcqhc.or.jp/summary/c00689/">
                  Minds診療ガイドライン情報データベース
                </Ext>
                ）。
              </div>
            </div>
          </section>

          {/* SECTION 2 */}
          <section id="s2" className="sec">
            <div className="sec-hd">
              <div className="sec-num">2</div>
              <h2 className="sec-title">睡眠と頭痛はなぜ関係するのか — 双方向性のメカニズム</h2>
            </div>

            <p>
              睡眠と頭痛（特に片頭痛）の関係を調べた複数のレビューにおいて、共通して指摘されているのが
              <strong>双方向性（bidirectional）の関係</strong>
              です。睡眠の質が悪い・睡眠不足であることが頭痛の誘因や悪化に関わりうる一方で、頭痛そのものが睡眠の質を損なうという、相互に影響し合う関係が報告されています。
            </p>

            <div className="mmd">
              <div className="mmd-lbl">
                フローチャート — 睡眠と頭痛の双方向関係（研究段階の仮説を含む）
              </div>
              <MermaidDiagram
                themeVariables={SLEEP_MERMAID_THEME}
                chart={`flowchart TB
    A["睡眠の質低下・睡眠不足・睡眠障害"] --> B["頭痛発作の頻度・強さに関連しうる"]
    B --> A
    C["共通の神経基盤の関与が研究段階で示唆されている\\n（視床下部・青斑核ノルアドレナリン神経など）"]
    C -.-> A
    C -.-> B`}
              />
            </div>

            <h3>研究段階で議論されているメカニズム</h3>
            <ul>
              <li>
                視床下部を中心とした睡眠・概日リズムの調節系と、片頭痛発作に関わる神経回路の重なり
              </li>
              <li>
                青斑核（locus
                coeruleus）のノルアドレナリン神経が、急性の睡眠障害と頭痛の相互作用に関与する可能性（2024年発表の基礎研究）
              </li>
              <li>脳脊髄液を介した老廃物排出（グリンパティック系）と睡眠の関係についての仮説</li>
            </ul>

            <div className="alert a-warn">
              <div className="alert-i">⚠️</div>
              <div>
                上記はいずれも<strong>研究途上の仮説</strong>
                であり、因果関係が確立された結論ではありません。臨床的には、片頭痛患者は発作の前後で睡眠の質が悪化しやすいと報告されていますが、これは主に自己申告に基づくものであり、機序としては十分に解明されていません。
              </div>
            </div>
          </section>

          {/* SECTION 3 */}
          <section id="s3" className="sec">
            <div className="sec-hd">
              <div className="sec-num">3</div>
              <h2 className="sec-title">睡眠に関連する頭痛疾患を知る</h2>
            </div>

            <p>
              ICHD-3では、睡眠そのものが発症に直接関わる頭痛として、以下の2つが明確に定義されています。いずれも診断は医師が行うものであり、以下は教育目的の概要説明です。
            </p>

            <h3>3-1. 就眠時頭痛（Hypnic headache）— 一次性頭痛の一種</h3>
            <p>
              「アラーム時計頭痛」とも呼ばれ、睡眠中にのみ発生し、目が覚めてしまうタイプの頭痛です。
            </p>

            <div className="tbl">
              <table className="th-purple">
                <thead>
                  <tr>
                    <th>項目</th>
                    <th>概要（ICHD-3の考え方を要約）</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>発症年齢</td>
                    <td>主に50歳以降に多いとされる（若年での報告もあり）</td>
                  </tr>
                  <tr>
                    <td>発生タイミング</td>
                    <td>睡眠中にのみ起こり、覚醒を伴う</td>
                  </tr>
                  <tr>
                    <td>持続時間</td>
                    <td>目安として15分〜4時間程度</td>
                  </tr>
                  <tr>
                    <td>頻度</td>
                    <td>月10日以上、3か月を超えて繰り返すことが目安とされる</td>
                  </tr>
                  <tr>
                    <td>その他の特徴</td>
                    <td>自律神経症状（流涙・鼻づまり等）や落ち着きのなさを伴わないことが多い</td>
                  </tr>
                  <tr>
                    <td>鑑別の重要性</td>
                    <td>群発頭痛など他の一次性頭痛との鑑別が重要とされる</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="alert a-info">
              <div className="alert-i">📖</div>
              <div>
                ICHD-3の解説では、就眠時頭痛と診断する前に睡眠時無呼吸・夜間高血圧・低血糖・薬物乱用など、他に説明可能な原因がないかを確認することの重要性が強調されています（
                <Ext href="https://ichd-3.org/other-primary-headache-disorders/4-9-hypnic-headache/">
                  ICHD-3公式 4.9 Hypnic headache
                </Ext>
                ）。
              </div>
            </div>

            <h3>3-2. 睡眠時無呼吸による頭痛（Sleep apnoea headache）— 二次性頭痛の一種</h3>
            <p>睡眠時無呼吸（呼吸が止まる・浅くなる状態）が原因で生じるとされる頭痛です。</p>

            <div className="tbl">
              <table className="th-purple">
                <thead>
                  <tr>
                    <th>項目</th>
                    <th>概要（ICHD-3の考え方を要約）</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>特徴</td>
                    <td>主に両側性で、持続時間は4時間未満とされることが多い朝の頭痛</td>
                  </tr>
                  <tr>
                    <td>診断の目安</td>
                    <td>
                      睡眠時無呼吸（無呼吸低呼吸指数 [AHI] &gt;=5）が診断されていることが前提となる
                    </td>
                  </tr>
                  <tr>
                    <td>因果関係の考え方</td>
                    <td>
                      睡眠時無呼吸の発症と時間的に関連していること、治療改善に伴い頭痛も改善・消失することなどが手がかりとされる
                    </td>
                  </tr>
                  <tr>
                    <td>経過</td>
                    <td>睡眠時無呼吸への治療が奏効すると、頭痛も改善するとされている</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="mmd">
              <div className="mmd-lbl">
                フローチャート — 起床時頭痛を考える一般的な視点（教育目的・自己診断ツールではない）
              </div>
              <MermaidDiagram
                themeVariables={SLEEP_MERMAID_THEME}
                chart={`flowchart TB
    Sx["起床時に頭痛がある"] --> N["自己判断はせず、まず医療機関に相談する"]
    N --> D1["医師が問診・診察・必要に応じて検査で\\n原因を評価する"]
    D1 --> D2["原因の例：睡眠時無呼吸、片頭痛、緊張型頭痛、\\n薬物乱用、その他の要因など多岐にわたる"]`}
              />
            </div>

            <div className="alert a-warn">
              <div className="alert-i">⚠️</div>
              <div>
                <strong>起床時の頭痛は非特異的な症状</strong>
                であり、片頭痛や緊張型頭痛、その他の睡眠関連疾患でも起こりえます。「朝に頭が痛い＝睡眠時無呼吸」と単純に結び付けることはできません。実際、ICHD-2からICHD-3への基準改定に伴い、睡眠時無呼吸患者における該当率は変化したことが報告されています（
                <Ext href="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC4478186/">
                  Suzuki et al., 2015
                </Ext>
                ）。診断は医師による評価（必要に応じて睡眠検査を含む）が必要です。
              </div>
            </div>
          </section>

          {/* SECTION 4 */}
          <section id="s4" className="sec">
            <div className="sec-hd">
              <div className="sec-num">4</div>
              <h2 className="sec-title">睡眠と頭痛の疫学 — 何がわかっているか</h2>
            </div>

            <p>
              複数のレビューで報告されている知見を、エビデンスの性質を踏まえて整理します。いずれも観察研究・レビューに基づくものであり、因果関係の証明ではなく「関連が報告されている」という位置づけです。
            </p>

            <div className="tbl">
              <table>
                <thead>
                  <tr>
                    <th>知見</th>
                    <th>内容</th>
                    <th>エビデンスの性質</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>不眠症・むずむず脚症候群の併存</td>
                    <td>片頭痛患者では、不眠症やむずむず脚症候群の頻度が高いと報告されている</td>
                    <td>
                      <span className="bC">限定的</span>
                    </td>
                  </tr>
                  <tr>
                    <td>不眠と片頭痛の重症度</td>
                    <td>不眠が、より重い片頭痛表現型と関連する可能性が指摘されている</td>
                    <td>
                      <span className="bU">不明確</span>
                    </td>
                  </tr>
                  <tr>
                    <td>慢性片頭痛と睡眠の質</td>
                    <td>
                      慢性片頭痛では睡眠障害の頻度が高く、両者は双方向的に影響し合うと報告されている
                    </td>
                    <td>
                      <span className="bC">限定的</span>
                    </td>
                  </tr>
                  <tr>
                    <td>緊張型頭痛と睡眠</td>
                    <td>睡眠の質の低さが、慢性緊張型頭痛の痛みの強さと関連するとされる</td>
                    <td>
                      <span className="bC">限定的</span>
                    </td>
                  </tr>
                  <tr>
                    <td>群発頭痛と概日リズム</td>
                    <td>群発頭痛の発作パターンには概日リズムの関与が示唆されている</td>
                    <td>
                      <span className="bU">不明確</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="alert a-info">
              <div className="alert-i">📚</div>
              <div>
                出典:{" "}
                <Ext href="https://pubmed.ncbi.nlm.nih.gov/20021325/">Rains &amp; Poceta, 2010</Ext>{" "}
                ／{" "}
                <Ext href="https://pmc.ncbi.nlm.nih.gov/articles/PMC6527324/">
                  Sleep Disorders and Migraine (レビュー)
                </Ext>{" "}
                ／{" "}
                <Ext href="https://pubmed.ncbi.nlm.nih.gov/36225323/">
                  Current Perspectives on Chronic Migraine and Sleep, 2022
                </Ext>{" "}
                ／{" "}
                <Ext href="https://link.springer.com/article/10.1007/s11910-026-01487-1">
                  Sleep and Headache Disorders (Curr Neurol Neurosci Rep)
                </Ext>
              </div>
            </div>

            <div className="alert a-purple">
              <div className="alert-i">💡</div>
              <div>
                これらは「関連が報告されている」段階の知見であり、「睡眠を改善すれば必ず頭痛が改善する」という断定はできません。次のStepで、実際に睡眠介入がどの程度の効果を示しているかを、エビデンスの質とともに見ていきます。
              </div>
            </div>
          </section>

          {/* SECTION 5 */}
          <section id="s5" className="sec">
            <div className="sec-hd">
              <div className="sec-num">5</div>
              <h2 className="sec-title">睡眠衛生とは何か — 国際的に推奨される基本習慣</h2>
            </div>

            <p>
              「睡眠衛生（Sleep
              hygiene）」とは、良い睡眠を後押しするための生活習慣・行動を指す言葉です。米国疾病予防管理センター（CDC）などの公的機関が、一般向けの基本的な推奨事項を公開しています。
            </p>

            <h3>5-1. 1日の流れで見る基本習慣（CDC等の公的情報に基づく一般的な推奨）</h3>

            <div className="phase-grid">
              <div className="ph ph1">
                <div className="ph-icon">🌅</div>
                <div className="ph-title">朝</div>
                <div className="ph-time">起床後</div>
                <div className="ph-desc">
                  毎日ほぼ同じ時刻に起床する。カーテンを開けるなどして自然光を浴びる。
                </div>
              </div>
              <div className="ph ph2">
                <div className="ph-icon">☀️</div>
                <div className="ph-title">日中</div>
                <div className="ph-time">午前〜午後</div>
                <div className="ph-desc">日中に体を動かす習慣を持つ。長すぎる昼寝を避ける。</div>
              </div>
              <div className="ph ph3">
                <div className="ph-icon">🌆</div>
                <div className="ph-title">夕方〜就寝前</div>
                <div className="ph-time">就寝の数時間前</div>
                <div className="ph-desc">
                  大量の食事・カフェイン・アルコールを避ける。強い光（ブルーライト等）への曝露を控える。
                </div>
              </div>
              <div className="ph ph4">
                <div className="ph-icon">🛏️</div>
                <div className="ph-title">就寝・夜間</div>
                <div className="ph-time">就寝時刻〜起床まで</div>
                <div className="ph-desc">
                  寝室を静かで暗く快適な温度に保つ。毎日ほぼ同じ時刻に就寝する。
                </div>
              </div>
            </div>

            <div className="mmd">
              <div className="mmd-lbl">フローチャート — 睡眠衛生の主な領域</div>
              <MermaidDiagram
                themeVariables={SLEEP_MERMAID_THEME}
                chart={`flowchart TB
    Root["睡眠衛生の主な領域"] --> C1["就寝・起床時刻の一貫性"]
    Root --> C2["寝室環境（暗さ・静けさ・温度）"]
    Root --> C3["日中の光曝露と活動量"]
    Root --> C4["就寝前の飲食物（カフェイン・アルコール等）"]
    Root --> C5["就寝前のルーティンと光環境"]`}
              />
            </div>

            <div className="alert a-info">
              <div className="alert-i">📚</div>
              <div>
                出典:{" "}
                <Ext href="https://www.cdc.gov/sleep/about/index.html">CDC「About Sleep」</Ext>
              </div>
            </div>

            <h3>5-2. 推奨される睡眠時間の目安</h3>
            <p>
              米国睡眠医学会（AASM）と睡眠研究学会（SRS）による合同コンセンサス声明では、成人に推奨される睡眠時間の目安が示されています。
            </p>

            <div className="tbl">
              <table className="th-teal">
                <thead>
                  <tr>
                    <th>年齢層</th>
                    <th>推奨される睡眠時間の目安</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>成人</td>
                    <td>1晩あたり7時間以上（上限は設けられていない）</td>
                  </tr>
                  <tr>
                    <td>13〜18歳</td>
                    <td>1日あたり8〜10時間</td>
                  </tr>
                  <tr>
                    <td>6〜12歳</td>
                    <td>1日あたり9〜12時間</td>
                  </tr>
                  <tr>
                    <td>3〜5歳</td>
                    <td>1日あたり10〜13時間（昼寝を含む）</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="alert a-info">
              <div className="alert-i">📚</div>
              <div>
                出典:{" "}
                <Ext href="https://aasm.org/resources/pdf/pressroom/adult-sleep-duration-consensus.pdf">
                  AASM・SRS合同コンセンサス声明
                </Ext>{" "}
                ／{" "}
                <Ext href="https://jcsm.aasm.org/doi/10.5664/jcsm.4950">
                  方法論論文（J Clin Sleep Med, 2015）
                </Ext>
                。同声明では、慢性的に6時間以下の睡眠は成人の健康維持には不十分である可能性が高いとされる一方、必要な睡眠時間には個人差があることも強調されています。
              </div>
            </div>

            <h3>5-3. 重要な留意点 — 「睡眠衛生教育」単独の効果には限界がある</h3>
            <div className="alert a-warn">
              <div className="alert-i">⚠️</div>
              <div>
                世界睡眠学会（World Sleep
                Society）は、AASMによる成人の慢性不眠症に対する診療ガイドラインを検証した見解の中で、
                <strong>
                  「睡眠衛生教育を単独の治療法として用いることは、有効性を裏付けるエビデンスが不足しているため推奨されない」
                </strong>
                としています（<span className="bU">エビデンス不十分</span>
                ）。睡眠衛生は後述する多要素の認知行動療法（CBT-I）の一部としては位置づけられていますが、単独の生活習慣アドバイスだけで不眠症や頭痛が改善するとは限りません。出典:{" "}
                <Ext href="https://www.sciencedirect.com/science/article/abs/pii/S1389945723002447">
                  World Sleep Society によるAASM CBT-Iガイドライン支持声明
                </Ext>
              </div>
            </div>

            <p>
              つまり、睡眠衛生は「土台となる基本習慣」ではあるものの、
              <strong>それ単独での治療効果は限定的</strong>
              であり、より体系的なアプローチ（Step
              6）と組み合わせることが国際的には推奨されています。
            </p>
          </section>

          {/* SECTION 6 */}
          <section id="s6" className="sec">
            <div className="sec-hd">
              <div className="sec-num">6</div>
              <h2 className="sec-title">
                睡眠を土台にした頭痛マネジメント — 非薬物的アプローチのエビデンス
              </h2>
            </div>

            <div className="alert a-purple">
              <div className="alert-i">🎓</div>
              <div>
                <strong>本セクションは教育目的であり、個別の治療推奨ではありません。</strong>
                実際の治療方針は医師にご相談ください。
              </div>
            </div>

            <div className="legend">
              <strong style={{ fontSize: "12.5px", color: "var(--g8)" }}>
                エビデンス表記の凡例：
              </strong>
              <div className="legend-item">
                <span className="bA">強い推奨・質の高いエビデンス</span>
              </div>
              <div className="legend-item">
                <span className="bB">中等度のエビデンス</span>
              </div>
              <div className="legend-item">
                <span className="bC">限定的なエビデンス（弱い）</span>
              </div>
              <div className="legend-item">
                <span className="bU">エビデンス不十分・不明確</span>
              </div>
            </div>

            <h3>6-1. 不眠症に対する第一選択 — 多要素認知行動療法（CBT-I）</h3>
            <p>
              AASMの診療ガイドラインでは、成人の慢性不眠症に対して、
              <strong>
                多要素の認知行動療法（Cognitive Behavioral Therapy for Insomnia,
                CBT-I）を第一選択の治療法とすることが強く推奨
              </strong>
              されています（<span className="bA">強い推奨</span>
              ）。この推奨は世界睡眠学会からも支持されています。
            </p>

            <div className="mmd">
              <div className="mmd-lbl">
                フローチャート — 多要素認知行動療法 CBT-I の主な構成要素
              </div>
              <MermaidDiagram
                themeVariables={SLEEP_MERMAID_THEME}
                chart={`flowchart TB
    subgraph CBTI["多要素認知行動療法 CBT-I の主な構成要素"]
        direction TB
        M1["刺激制御法"]
        M2["睡眠制限法"]
        M3["認知療法"]
        M4["リラクゼーション法"]
        M5["睡眠衛生教育（補助的な位置づけ）"]
    end`}
              />
            </div>

            <p>
              各構成要素は単独でも条件付きで推奨されていますが、睡眠衛生教育のみを単独療法として用いることは前述のとおり推奨されていません。CBT-Iは対面・遠隔（オンライン）いずれの形式でも一定の効果が報告されています（出典:{" "}
              <Ext href="https://link.springer.com/article/10.1007/s44470-025-00038-8">
                AASM 成人慢性不眠症の併用療法診療ガイドライン
              </Ext>
              ）。
            </p>

            <h3>6-2. 頭痛（特に片頭痛）に対する睡眠関連の介入エビデンス</h3>
            <p>
              睡眠と頭痛の双方向性を踏まえ、睡眠に着目した介入が頭痛にどの程度有効かを検討した研究が近年蓄積されています。エビデンスの質を正確に区別して整理します。
            </p>

            <div className="tbl">
              <table className="th-orange">
                <thead>
                  <tr>
                    <th>情報源</th>
                    <th>主な結論</th>
                    <th>エビデンスの強さ</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>コクランレビュー：心理療法による片頭痛予防（Sharpe et al., 2019）</td>
                    <td>
                      心理的介入が片頭痛予防に有効かどうかを判断できる質の高いエビデンスは不足しているとされた
                    </td>
                    <td>
                      <span className="bU">非常に低い</span>
                    </td>
                  </tr>
                  <tr>
                    <td>AHRQ委託研究：行動介入による片頭痛予防（2024）</td>
                    <td>
                      慢性片頭痛の成人において、睡眠に焦点を当てた行動的介入が6週間時点での頭痛頻度減少と関連した可能性
                    </td>
                    <td>
                      <span className="bC">低い</span>
                    </td>
                  </tr>
                  <tr>
                    <td>心理的睡眠介入のシステマティックレビュー・メタ解析（2019）</td>
                    <td>
                      片頭痛・緊張型頭痛に対する心理的睡眠介入が頭痛頻度・睡眠指標の改善と関連
                    </td>
                    <td>
                      <span className="bC">限定的（研究数少）</span>
                    </td>
                  </tr>
                  <tr>
                    <td>片頭痛と睡眠の双方向性に関する系統的レビュー（2026）</td>
                    <td>両方に同時にアプローチする統合的介入の可能性が示唆された</td>
                    <td>
                      <span className="bU">研究途上</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="alert a-info">
              <div className="alert-i">📚</div>
              <div>
                出典:{" "}
                <Ext href="https://www.cochranelibrary.com/cdsr/doi/10.1002/14651858.CD012295.pub2/full">
                  Cochrane: Psychological therapies for the prevention of migraine (2019)
                </Ext>{" "}
                ／{" "}
                <Ext href="https://effectivehealthcare.ahrq.gov/products/behavioral-interventions-migraine-prevention/research">
                  AHRQ: Behavioral Interventions for Migraine Prevention (2024)
                </Ext>{" "}
                ／{" "}
                <Ext href="https://pmc.ncbi.nlm.nih.gov/articles/PMC11951403/">
                  Treadwell et al., 2025 メタ解析
                </Ext>{" "}
                ／{" "}
                <Ext href="https://www.nature.com/articles/s41598-019-42785-8">
                  Scientific Reports, 2019 メタ解析
                </Ext>{" "}
                ／{" "}
                <Ext href="https://pmc.ncbi.nlm.nih.gov/articles/PMC13093645/">
                  Sforza et al., 2026 系統的レビュー
                </Ext>
              </div>
            </div>

            <div className="alert a-warn">
              <div className="alert-i">⚠️</div>
              <div>
                <strong>まとめると</strong>
                、「睡眠を整えることが頭痛の改善に役立つ可能性がある」という方向性を示す研究は増えていますが、いずれも「限定的なエビデンス」「今後の研究が必要」という位置づけであり、
                <strong>効果を断定・保証するものではありません</strong>
                。ご自身の頭痛に対してどのようなアプローチが適切かは、医師と相談しながら判断することが推奨されます。
              </div>
            </div>
          </section>

          {/* SECTION 7 */}
          <section id="s7" className="sec">
            <div className="sec-hd">
              <div className="sec-num">7</div>
              <h2 className="sec-title">薬物療法に関する一般的注意（教育目的）</h2>
            </div>

            <div className="alert a-purple">
              <div className="alert-i">🎓</div>
              <div>
                <strong>本セクションは教育目的であり、個別の治療推奨ではありません。</strong>
                記載する薬効群は一般的な分類にとどめ、具体的な薬剤選択・用法・用量については必ず医師・薬剤師にご相談ください。
              </div>
            </div>

            <h3>7-1. 不眠に対する薬物療法の位置づけ</h3>
            <p>
              国際的なガイドラインでは、不眠症に対してまずCBT-Iなどの非薬物療法を優先することが推奨されています。薬物療法は、非薬物療法が実施できない場合や、非薬物療法後も症状が残る場合の補助的な選択肢として位置づけられています。一般に用いられる薬効群としては、次のようなものが知られています（一般名・薬効群レベルの説明であり、個別の使用を推奨するものではありません）。
            </p>

            <div className="drug-grid">
              <div className="drug">
                <div className="drug-nm">メラトニン受容体作動薬</div>
                <div className="drug-br">薬効群としての一般的分類</div>
                <div className="drug-tx">用法・用量は医師・薬剤師にご相談ください。</div>
              </div>
              <div className="drug">
                <div className="drug-nm">オレキシン受容体拮抗薬</div>
                <div className="drug-br">薬効群としての一般的分類</div>
                <div className="drug-tx">用法・用量は医師・薬剤師にご相談ください。</div>
              </div>
              <div className="drug">
                <div className="drug-nm">非ベンゾジアゼピン系睡眠薬</div>
                <div className="drug-br">薬効群としての一般的分類</div>
                <div className="drug-tx">用法・用量は医師・薬剤師にご相談ください。</div>
              </div>
              <div className="drug">
                <div className="drug-nm">ベンゾジアゼピン系睡眠薬</div>
                <div className="drug-br">薬効群としての一般的分類</div>
                <div className="drug-tx">用法・用量は医師・薬剤師にご相談ください。</div>
              </div>
            </div>

            <div className="alert a-info">
              <div className="alert-i">ℹ️</div>
              <div>
                ある診療ガイドラインでは、慢性不眠症に対してメラトニンなど一部の薬剤を用いることについて、条件付きで推奨しないとしている場合もあり、薬剤ごとに評価が異なる点にも留意が必要です（出典:{" "}
                <Ext href="https://link.springer.com/article/10.1007/s44470-025-00038-8">
                  AASM 成人慢性不眠症の併用療法診療ガイドライン
                </Ext>
                ）。
                <strong>
                  どの薬効群が適切かは、症状・併存疾患・年齢などによって個別に異なるため、必ず医師・薬剤師にご相談ください。
                </strong>
              </div>
            </div>

            <h3>7-2. メラトニンに関する国内の状況（重要な注意）</h3>
            <div className="alert a-danger">
              <div className="alert-i">🚨</div>
              <div>
                海外ではメラトニンが一般用サプリメントとして販売されている国もありますが、
                <strong>
                  日本国内では、成人の一般的な不眠や頭痛予防を目的としたメラトニン製剤・サプリメントとしての流通は認められていません（国内未承認）
                </strong>
                。国内でメラトニンが医薬品として承認されているのは2020年に承認された処方箋医薬品であり、その適応は
                <strong>小児期の神経発達症に伴う入眠困難の改善という限定的な範囲</strong>
                にとどまります。成人の不眠症や、片頭痛の予防・治療を目的とした一般的な使用は、国内では未承認の使用にあたります。海外サプリメントの個人輸入等による自己判断での使用は推奨されません。ご不明な点は医師・薬剤師にご相談ください。出典:{" "}
                <Ext href="https://www.jstage.jst.go.jp/article/ojjscn/50/5/50_364/_pdf/-char/ja">
                  メラトニンの国内規制状況に関する学術報告
                </Ext>
              </div>
            </div>

            <h3>7-3. 頭痛治療薬について</h3>
            <div className="alert a-info">
              <div className="alert-i">ℹ️</div>
              <div>
                頭痛（片頭痛・緊張型頭痛・群発頭痛など）に対する急性期治療薬・予防薬についても、一般に複数の薬効群が用いられますが、本ガイドは睡眠と頭痛の関係および睡眠衛生に焦点を当てているため、詳細な薬理解説は割愛します。具体的な薬剤選択については、頭痛専門の診療ガイドラインを参照のうえ、医師にご相談ください。
              </div>
            </div>
          </section>

          {/* SECTION 8 */}
          <section id="s8" className="sec">
            <div className="sec-hd">
              <div className="sec-num">8</div>
              <h2 className="sec-title">どんな時に医療機関を受診すべきか（レッドフラッグ）</h2>
            </div>

            <p>
              以下は、国際頭痛学会の二次性頭痛特別関心グループが文献レビューと専門家の合意に基づきまとめた
              <strong>SNOOP10リスト</strong>
              （危険な頭痛＝二次性頭痛を疑うべきサインの一覧）を基に、教育目的で要点を紹介するものです。自己診断のためのチェックリストではなく、該当する場合はもちろん、該当しなくても症状が心配な場合は速やかに医療機関を受診してください。出典:{" "}
              <Ext href="https://www.neurology.org/doi/10.1212/WNL.0000000000006697">
                Do TP, et al. Neurology 2019;92:134–144
              </Ext>
            </p>

            <div className="snoop-grid">
              <div className="sn">
                <div className="sn-letter">🌡️</div>
                <div className="sn-title">全身症状（発熱など）</div>
                <div className="sn-symp">発熱や体重減少などを伴う頭痛</div>
                <div className="sn-dx">要受診</div>
              </div>
              <div className="sn">
                <div className="sn-letter">🧬</div>
                <div className="sn-title">がんの既往</div>
                <div className="sn-symp">悪性腫瘍の既往がある方の新規頭痛</div>
                <div className="sn-dx">要受診</div>
              </div>
              <div className="sn">
                <div className="sn-letter">🧠</div>
                <div className="sn-title">神経学的異常</div>
                <div className="sn-symp">意識障害・麻痺・言語障害などを伴う頭痛</div>
                <div className="sn-dx">緊急性あり</div>
              </div>
              <div className="sn">
                <div className="sn-letter">⚡</div>
                <div className="sn-title">突然の急激な発症</div>
                <div className="sn-symp">数秒〜数分でピークに達する「雷鳴頭痛」</div>
                <div className="sn-dx">緊急性あり</div>
              </div>
              <div className="sn">
                <div className="sn-letter">👴</div>
                <div className="sn-title">高齢での新規発症</div>
                <div className="sn-symp">これまでなかった頭痛が高齢になって初めて出現</div>
                <div className="sn-dx">要受診</div>
              </div>
              <div className="sn">
                <div className="sn-letter">🔄</div>
                <div className="sn-title">頭痛パターンの変化</div>
                <div className="sn-symp">従来と明らかに異なるパターンへの変化</div>
                <div className="sn-dx">要受診</div>
              </div>
              <div className="sn">
                <div className="sn-letter">🧍</div>
                <div className="sn-title">体位により変化する頭痛</div>
                <div className="sn-symp">起立・臥位で明らかに強さが変わる頭痛</div>
                <div className="sn-dx">要受診</div>
              </div>
              <div className="sn">
                <div className="sn-letter">😮‍💨</div>
                <div className="sn-title">咳・くしゃみ・運動で誘発</div>
                <div className="sn-symp">いきみ動作で誘発される頭痛</div>
                <div className="sn-dx">要受診</div>
              </div>
              <div className="sn">
                <div className="sn-letter">👁️</div>
                <div className="sn-title">乳頭浮腫</div>
                <div className="sn-symp">眼底検査で指摘される所見を伴う頭痛</div>
                <div className="sn-dx">要受診</div>
              </div>
              <div className="sn">
                <div className="sn-letter">🤰</div>
                <div className="sn-title">妊娠・産褥期</div>
                <div className="sn-symp">妊娠中・産後に新たに生じた頭痛</div>
                <div className="sn-dx">要受診</div>
              </div>
              <div className="sn">
                <div className="sn-letter">🤕</div>
                <div className="sn-title">外傷後の頭痛</div>
                <div className="sn-symp">頭部外傷後に生じた・悪化した頭痛</div>
                <div className="sn-dx">要受診</div>
              </div>
              <div className="sn">
                <div className="sn-letter">💊</div>
                <div className="sn-title">鎮痛薬の使用過多</div>
                <div className="sn-symp">頭痛薬の使用日数・頻度が増え続けている</div>
                <div className="sn-dx">要受診</div>
              </div>
            </div>

            <h3>頭痛薬の使用頻度に関する国際的な目安（薬物乱用頭痛, ICHD-3）</h3>
            <p>
              ICHD-3では、頭痛薬の使用頻度が高い状態が続くこと自体が「薬物乱用頭痛」という二次性頭痛の原因になりうるとされています。以下は一般名・薬効群レベルでの頻度の目安であり、個別の使用方法を示すものではありません。
            </p>

            <div className="moh-grid">
              <div className="moh moh-h">
                <div className="moh-day">
                  10<span style={{ fontSize: 14 }}>日/月〜</span>
                </div>
                <div className="moh-unit">3か月を超えて 定期的に使用</div>
                <div className="moh-drug">トリプタン系・エルゴタミン・オピオイド系・配合鎮痛薬</div>
              </div>
              <div className="moh moh-m">
                <div className="moh-day">
                  10<span style={{ fontSize: 14 }}>日/月〜</span>
                </div>
                <div className="moh-unit">特定の薬剤に偏らず複数系統を併用</div>
                <div className="moh-drug">複数系統の鎮痛薬を組み合わせて使用している場合</div>
              </div>
              <div className="moh moh-l">
                <div className="moh-day">
                  15<span style={{ fontSize: 14 }}>日/月〜</span>
                </div>
                <div className="moh-unit">3か月を超えて 定期的に使用</div>
                <div className="moh-drug">単一成分の鎮痛薬（NSAIDs・アセトアミノフェン等）</div>
              </div>
            </div>

            <div className="alert a-info">
              <div className="alert-i">📚</div>
              <div>
                出典:{" "}
                <Ext href="https://ichd-3.org/8-headache-attributed-to-a-substance-or-its-withdrawal/8-2-medication-overuse-headache-moh/">
                  ICHD-3公式 8.2 Medication-overuse headache
                </Ext>
              </div>
            </div>

            <div className="alert a-danger">
              <div className="alert-i">🚨</div>
              <div>
                これらの目安は診断を確定するものではなく、「医療機関に相談すべきタイミング」の参考情報です。最終的な評価・診断は医師が行います。緊急性の高い症状（突然の激しい頭痛、神経症状を伴う頭痛など）がある場合は、直ちに医療機関を受診してください。
              </div>
            </div>
          </section>

          {/* SECTION 9 */}
          <section id="s9" className="sec">
            <div className="sec-hd">
              <div className="sec-num">9</div>
              <h2 className="sec-title">まとめとセルフチェックリスト</h2>
            </div>

            <div className="qr-grid">
              <div className="qr">
                <div className="qr-t">睡眠と頭痛の関係</div>
                <ul>
                  <li>双方向の関連が報告されているが、機序は研究途上</li>
                  <li>起床時の頭痛は非特異的で自己判断は不可</li>
                </ul>
              </div>
              <div className="qr">
                <div className="qr-t">睡眠衛生の位置づけ</div>
                <ul>
                  <li>基本習慣として重要だが、単独での治療効果は限定的</li>
                  <li>CBT-Iなど体系的アプローチとの併用が推奨される</li>
                </ul>
              </div>
              <div className="qr">
                <div className="qr-t">エビデンスの扱い方</div>
                <ul>
                  <li>睡眠に着目した介入の頭痛への効果は限定的なエビデンス</li>
                  <li>効果を断定・保証する記載は避けるべき</li>
                </ul>
              </div>
              <div className="qr">
                <div className="qr-t">薬物療法について</div>
                <ul>
                  <li>薬効群レベルの理解にとどめ、具体的使用は医師・薬剤師に相談</li>
                  <li>メラトニンは国内では成人の一般的用途には未承認</li>
                </ul>
              </div>
            </div>

            <h3>セルフチェック（習慣の振り返り用・診断目的ではありません）</h3>
            <div className="tbl">
              <table>
                <thead>
                  <tr>
                    <th>チェック項目</th>
                    <th>できている</th>
                    <th>見直したい</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>毎日ほぼ同じ時刻に寝起きしている</td>
                    <td>☐</td>
                    <td>☐</td>
                  </tr>
                  <tr>
                    <td>寝室は暗く、静かで、快適な温度である</td>
                    <td>☐</td>
                    <td>☐</td>
                  </tr>
                  <tr>
                    <td>日中に自然光を浴び、体を動かす時間がある</td>
                    <td>☐</td>
                    <td>☐</td>
                  </tr>
                  <tr>
                    <td>就寝前の大量の食事・カフェイン・アルコールを控えている</td>
                    <td>☐</td>
                    <td>☐</td>
                  </tr>
                  <tr>
                    <td>就寝前の強い光（画面の光など）を控えている</td>
                    <td>☐</td>
                    <td>☐</td>
                  </tr>
                  <tr>
                    <td>頭痛の頻度・強さと睡眠の状態を記録している</td>
                    <td>☐</td>
                    <td>☐</td>
                  </tr>
                  <tr>
                    <td>気になる症状（レッドフラッグ）があれば医療機関に相談している</td>
                    <td>☐</td>
                    <td>☐</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="alert a-purple">
              <div className="alert-i">🎓</div>
              <div>
                本ページは教育目的の一般的な情報提供であり、個別の診断・治療の推奨ではありません。体調に不安がある場合、または症状が続く・悪化する場合は、必ず医師にご相談ください。
              </div>
            </div>
          </section>

          {/* SECTION 10 */}
          <section id="s10" className="sec">
            <div className="sec-hd">
              <div className="sec-num">10</div>
              <h2 className="sec-title">情報源一覧</h2>
            </div>

            <p>
              信頼度の高い順に、<strong>一次情報（ガイドライン・原著論文）を優先</strong>
              し、二次情報は補助的に参照しています。
            </p>

            <div className="src-grid">
              <div className="src">
                <div className="src-org">疾患分類</div>
                <div className="src-t">ICHD-3（国際頭痛分類 第3版、国際頭痛学会）</div>
                <div className="src-url">
                  <Ext href="https://ichd-3.org/">https://ichd-3.org/</Ext>
                </div>
              </div>
              <div className="src">
                <div className="src-org">疾患分類</div>
                <div className="src-t">ICHD-3 — 就眠時頭痛（4.9 Hypnic headache）</div>
                <div className="src-url">
                  <Ext href="https://ichd-3.org/other-primary-headache-disorders/4-9-hypnic-headache/">
                    ichd-3.org/.../4-9-hypnic-headache/
                  </Ext>
                </div>
              </div>
              <div className="src">
                <div className="src-org">疾患分類</div>
                <div className="src-t">ICHD-3 — 睡眠時無呼吸による頭痛（10.1.4）</div>
                <div className="src-url">
                  <Ext href="https://ichd-3.org/10-headache-attributed-to-disorder-of-homoeostasis/10-1-headache-attributed-to-hypoxia-andor-hypercapnia/10-1-4-sleep-apnoea-headache/">
                    ichd-3.org/.../10-1-4-sleep-apnoea-headache/
                  </Ext>
                </div>
              </div>
              <div className="src">
                <div className="src-org">疾患分類</div>
                <div className="src-t">
                  ICHD-3 — 薬物乱用頭痛（8.2 Medication-overuse headache）
                </div>
                <div className="src-url">
                  <Ext href="https://ichd-3.org/8-headache-attributed-to-a-substance-or-its-withdrawal/8-2-medication-overuse-headache-moh/">
                    ichd-3.org/.../8-2-medication-overuse-headache-moh/
                  </Ext>
                </div>
              </div>
              <div className="src">
                <div className="src-org">国際頭痛学会</div>
                <div className="src-t">ICHDの公式解説ページ（改訂動向）</div>
                <div className="src-url">
                  <Ext href="https://ihs-headache.org/en/resources/ichd/">
                    ihs-headache.org/en/resources/ichd/
                  </Ext>
                </div>
              </div>
              <div className="src">
                <div className="src-org">国内ガイドライン</div>
                <div className="src-t">頭痛の診療ガイドライン2021（日本神経学会ほか）</div>
                <div className="src-url">
                  <Ext href="https://minds.jcqhc.or.jp/summary/c00689/">
                    minds.jcqhc.or.jp/summary/c00689/
                  </Ext>
                </div>
              </div>
              <div className="src">
                <div className="src-org">国内ガイドライン</div>
                <div className="src-t">日本神経学会 頭痛診療ガイドライン掲載ページ</div>
                <div className="src-url">
                  <Ext href="https://www.neurology-jp.org/guidelinem/headache_medical_2021.html">
                    neurology-jp.org/guidelinem/headache_medical_2021.html
                  </Ext>
                </div>
              </div>
              <div className="src">
                <div className="src-org">国際ガイドライン</div>
                <div className="src-t">NICE CG150 — Headaches in over 12s</div>
                <div className="src-url">
                  <Ext href="https://www.nice.org.uk/guidance/cg150">
                    nice.org.uk/guidance/cg150
                  </Ext>
                </div>
              </div>
              <div className="src">
                <div className="src-org">国際ガイドライン</div>
                <div className="src-t">AASM・SRS合同コンセンサス声明（推奨睡眠時間）</div>
                <div className="src-url">
                  <Ext href="https://aasm.org/resources/pdf/pressroom/adult-sleep-duration-consensus.pdf">
                    aasm.org/.../adult-sleep-duration-consensus.pdf
                  </Ext>
                </div>
              </div>
              <div className="src">
                <div className="src-org">国際ガイドライン</div>
                <div className="src-t">AASM・SRS コンセンサス声明 方法論論文（JCSM, 2015）</div>
                <div className="src-url">
                  <Ext href="https://jcsm.aasm.org/doi/10.5664/jcsm.4950">
                    jcsm.aasm.org/doi/10.5664/jcsm.4950
                  </Ext>
                </div>
              </div>
              <div className="src">
                <div className="src-org">国際ガイドライン</div>
                <div className="src-t">AASM 成人慢性不眠症 併用療法診療ガイドライン</div>
                <div className="src-url">
                  <Ext href="https://link.springer.com/article/10.1007/s44470-025-00038-8">
                    link.springer.com/article/10.1007/s44470-025-00038-8
                  </Ext>
                </div>
              </div>
              <div className="src">
                <div className="src-org">国際見解</div>
                <div className="src-t">World Sleep Society によるAASM CBT-I支持声明</div>
                <div className="src-url">
                  <Ext href="https://www.sciencedirect.com/science/article/abs/pii/S1389945723002447">
                    sciencedirect.com/.../S1389945723002447
                  </Ext>
                </div>
              </div>
              <div className="src">
                <div className="src-org">公的機関</div>
                <div className="src-t">CDC「About Sleep」（睡眠衛生の基本習慣）</div>
                <div className="src-url">
                  <Ext href="https://www.cdc.gov/sleep/about/index.html">
                    cdc.gov/sleep/about/index.html
                  </Ext>
                </div>
              </div>
              <div className="src">
                <div className="src-org">システマティックレビュー</div>
                <div className="src-t">
                  Cochrane: Psychological therapies for migraine prevention (2019)
                </div>
                <div className="src-url">
                  <Ext href="https://www.cochranelibrary.com/cdsr/doi/10.1002/14651858.CD012295.pub2/full">
                    cochranelibrary.com/.../CD012295.pub2/full
                  </Ext>
                </div>
              </div>
              <div className="src">
                <div className="src-org">システマティックレビュー</div>
                <div className="src-t">
                  AHRQ: Behavioral Interventions for Migraine Prevention (2024)
                </div>
                <div className="src-url">
                  <Ext href="https://effectivehealthcare.ahrq.gov/products/behavioral-interventions-migraine-prevention/research">
                    effectivehealthcare.ahrq.gov/.../research
                  </Ext>
                </div>
              </div>
              <div className="src">
                <div className="src-org">一次文献（メタ解析）</div>
                <div className="src-t">
                  Treadwell et al., 2025 — 行動介入の系統的レビュー・メタ解析
                </div>
                <div className="src-url">
                  <Ext href="https://pmc.ncbi.nlm.nih.gov/articles/PMC11951403/">
                    pmc.ncbi.nlm.nih.gov/articles/PMC11951403/
                  </Ext>
                </div>
              </div>
              <div className="src">
                <div className="src-org">一次文献（レビュー）</div>
                <div className="src-t">Sforza et al., 2026 — 片頭痛と睡眠の双方向性レビュー</div>
                <div className="src-url">
                  <Ext href="https://pmc.ncbi.nlm.nih.gov/articles/PMC13093645/">
                    pmc.ncbi.nlm.nih.gov/articles/PMC13093645/
                  </Ext>
                </div>
              </div>
              <div className="src">
                <div className="src-org">一次文献（レビュー）</div>
                <div className="src-t">
                  Rains &amp; Poceta, 2010 — Sleep and headache: a bidirectional relationship
                </div>
                <div className="src-url">
                  <Ext href="https://pubmed.ncbi.nlm.nih.gov/20021325/">
                    pubmed.ncbi.nlm.nih.gov/20021325/
                  </Ext>
                </div>
              </div>
              <div className="src">
                <div className="src-org">一次文献（レビュー）</div>
                <div className="src-t">Sleep Disorders and Migraine — メカニズム・疫学レビュー</div>
                <div className="src-url">
                  <Ext href="https://pmc.ncbi.nlm.nih.gov/articles/PMC6527324/">
                    pmc.ncbi.nlm.nih.gov/articles/PMC6527324/
                  </Ext>
                </div>
              </div>
              <div className="src">
                <div className="src-org">一次文献（レビュー）</div>
                <div className="src-t">
                  Current Perspectives on Chronic Migraine and Sleep Quality (2022)
                </div>
                <div className="src-url">
                  <Ext href="https://pubmed.ncbi.nlm.nih.gov/36225323/">
                    pubmed.ncbi.nlm.nih.gov/36225323/
                  </Ext>
                </div>
              </div>
              <div className="src">
                <div className="src-org">主要ジャーナル</div>
                <div className="src-t">Sleep and Headache Disorders (Curr Neurol Neurosci Rep)</div>
                <div className="src-url">
                  <Ext href="https://link.springer.com/article/10.1007/s11910-026-01487-1">
                    link.springer.com/article/10.1007/s11910-026-01487-1
                  </Ext>
                </div>
              </div>
              <div className="src">
                <div className="src-org">主要ジャーナル</div>
                <div className="src-t">
                  青斑核ノルアドレナリン神経と睡眠障害・頭痛（J Headache Pain, 2024）
                </div>
                <div className="src-url">
                  <Ext href="https://doi.org/10.1186/s10194-024-01714-5">
                    doi.org/10.1186/s10194-024-01714-5
                  </Ext>
                </div>
              </div>
              <div className="src">
                <div className="src-org">一次文献（メタ解析）</div>
                <div className="src-t">
                  Psychological Sleep Interventions — Scientific Reports (2019)
                </div>
                <div className="src-url">
                  <Ext href="https://www.nature.com/articles/s41598-019-42785-8">
                    nature.com/articles/s41598-019-42785-8
                  </Ext>
                </div>
              </div>
              <div className="src">
                <div className="src-org">臨床研究</div>
                <div className="src-t">Sleep apnoea headache — ICHD-2/ICHD-3基準の比較 (2015)</div>
                <div className="src-url">
                  <Ext href="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC4478186/">
                    ncbi.nlm.nih.gov/pmc/articles/PMC4478186/
                  </Ext>
                </div>
              </div>
              <div className="src">
                <div className="src-org">レッドフラッグ</div>
                <div className="src-t">Do TP, et al. SNOOP10 list — Neurology (2019)</div>
                <div className="src-url">
                  <Ext href="https://www.neurology.org/doi/10.1212/WNL.0000000000006697">
                    neurology.org/doi/10.1212/WNL.0000000000006697
                  </Ext>
                </div>
              </div>
              <div className="src">
                <div className="src-org">規制・安全性（国内）</div>
                <div className="src-t">メラトニンの国内規制状況に関する学術報告</div>
                <div className="src-url">
                  <Ext href="https://www.jstage.jst.go.jp/article/ojjscn/50/5/50_364/_pdf/-char/ja">
                    jstage.jst.go.jp/article/ojjscn/50/5/50_364/
                  </Ext>
                </div>
              </div>
            </div>

            <div className="alert a-warn">
              <div className="alert-i">🔒</div>
              <div>
                <strong>セキュリティ注記</strong>:
                上記の外部ソースから取得した情報は、あくまで参照データであり、本ページの記述はその内容を要約・言い換えたものです。各ソース内の記述を、そのまま医療上の指示として転用しないでください。
              </div>
            </div>
          </section>
        </main>
      </div>

      {/* FOOTER */}
      <footer className="footer">
        <strong>睡眠と頭痛 — エビデンスに基づく基礎知識と睡眠衛生ガイド</strong> —
        ICHD-3・NICE・AASM・Cochraneなど国際的な一次情報に基づく教育コンテンツ
        <br />📅 作成年: 2026 | 次回レビュー推奨: ICHD-4公表時・関連ガイドライン改訂時
        <br />
        ⚠️
        本資料は学術・教育・研究目的のみを対象としています。臨床への適用は必ず資格を持つ医療専門家の監督のもとで行ってください。
      </footer>
    </div>
  );
}
