import type { Metadata } from "next";
import { Ext } from "@/components/Ext";
import AutoGlossary from "@/components/glossary/AutoGlossary";
import Term from "@/components/glossary/Term";
import { CehSidebar } from "@/components/headaches/CehSidebar";
import MermaidDiagram from "@/components/MermaidDiagram";
import "./cervicogenic-headache.css";

export const metadata: Metadata = {
  title: "頸原性頭痛（Cervicogenic Headache: CEH）完全ガイド",
  description:
    "国際標準エビデンス（ICHD-3 11.2.1）に基づく頸原性頭痛（CEH）の包括的解説。病態生理、診断基準、身体所見・誘発テスト、治療戦略、MOHリスク評価までを体系的に整理。",
};

/** CEH ページの Mermaid テーマ（元 HTML の mermaid.initialize themeVariables を踏襲）。 */
const CEH_MERMAID_THEME: Record<string, string> = {
  primaryColor: "#edf3f9",
  primaryTextColor: "#1c3a5e",
  primaryBorderColor: "#4a6fa5",
  lineColor: "#546e7a",
  secondaryColor: "#e0f2f1",
  tertiaryColor: "#e8f5e9",
  edgeLabelBackground: "#ffffff",
  fontSize: "13px",
};

/**
 * Renders the cervicogenic headache educational guide page.
 *
 * @returns The full CEH guide page layout.
 */
export default function CervicogenicHeadachePage() {
  return (
    <div className="ceh-accent">
      {/* HERO */}
      <div className="hero">
        <div style={{ fontSize: 34 }}>🦴</div>
        <h1>頸原性頭痛（Cervicogenic Headache: CEH）完全ガイド</h1>
        <p className="hero-sub">
          国際標準エビデンス（ICHD-3 11.2.1）に基づくステップバイステップ解説
        </p>
        <div className="hero-tags">
          <span className="hero-tag">ICHD-3 11.2.1</span>
          <span className="hero-tag">二次性頭痛</span>
          <span className="hero-tag">三叉神経頸髄複合体</span>
          <span className="hero-tag">理学療法 Grade A</span>
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
        <CehSidebar />

        <main className="main">
          <AutoGlossary>
            {/* ====================================================== SECTION 1 */}
            <section id="s1" className="sec">
              <div className="sec-hd">
                <div className="sec-num">1</div>
                <h2 className="sec-title">疾患概要・定義</h2>
              </div>

              <p>
                <strong className="tN">頸原性頭痛（Cervicogenic Headache: CEH）</strong> とは、
                <strong>
                  頸椎およびその構成要素（骨・椎間板・軟部組織）の障害によって引き起こされる頭痛
                </strong>
                であり、IHS（国際頭痛学会）の <strong>ICHD-3（国際頭痛分類第3版）</strong> において{" "}
                <strong>第11章「頭頸部構造の障害による頭痛」</strong> の <strong>11.2.1</strong>{" "}
                に分類される <strong>二次性頭痛</strong>です。
              </p>

              <div className="alert a-info">
                <div className="alert-i">📖</div>
                <div>
                  <strong>ICHD-3 公式の定義（原文要旨）：</strong>
                  <br />
                  <em>
                    &quot;Headache caused by a disorder of the cervical spine and its component
                    bony, disc and/or soft tissue elements, usually but not invariably accompanied
                    by neck pain.&quot;
                  </em>
                  <br />
                  （頸椎およびその構成要素である骨・椎間板・軟部組織の障害によって生じる頭痛で、通常は頸部痛を伴うが、必ずしも伴うとは限らない）
                  <br />
                  <span className="src-url">
                    出典：ICHD-3, 11.2.1 Cervicogenic headache —{" "}
                    <Ext href="https://ichd-3.org/11-headache-or-facial-pain-attributed-to-disorder-of-the-cranium-neck-eyes-ears-nose-sinuses-teeth-mouth-or-other-facial-or-cervical-structure/11-2-headache-attributed-to-disorder-of-the-neck/11-2-1-cervicogenic-headache/">
                      https://ichd-3.org/11-headache-or-facial-pain-attributed-to-disorder-of-the-cranium-neck-eyes-ears-nose-sinuses-teeth-mouth-or-other-facial-or-cervical-structure/11-2-headache-attributed-to-disorder-of-the-neck/11-2-1-cervicogenic-headache/
                    </Ext>
                  </span>
                </div>
              </div>

              <h3>1.1 最重要ポイント（初学者向け）</h3>
              <div className="tbl">
                <table>
                  <thead>
                    <tr>
                      <th>概念</th>
                      <th>解説</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <strong>二次性頭痛である</strong>
                      </td>
                      <td>
                        片頭痛・緊張型頭痛（一次性頭痛）とは異なり、「原因（頸椎病変）が別に存在する」頭痛
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <strong>関連痛（referred pain）</strong>
                      </td>
                      <td>
                        痛みの「発生源」は頸部だが、「感じる場所」は頭部。これは
                        <Term id="trigeminal-nerve">三叉神経</Term>
                        頸髄複合体の収束による（§3で詳述）
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <strong>側方固定性（side-locked）</strong>
                      </td>
                      <td>多くの場合、痛みは常に同じ側に出現する（左右が入れ替わらない）</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>頸部由来の証明が必須</strong>
                      </td>
                      <td>
                        診断には「頸椎の障害が頭痛の原因である」という因果関係の証明が要求される
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <h3>1.2 典型的臨床像</h3>
              <div className="tbl">
                <table>
                  <thead>
                    <tr>
                      <th>項目</th>
                      <th>頸原性頭痛の特徴</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <strong>部位</strong>
                      </td>
                      <td>一側性・後頭部から始まり前頭・側頭・眼窩へ波及（後方→前方放散）</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>性状</strong>
                      </td>
                      <td>非拍動性・鈍痛・締め付け感（深部痛）</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>強度</strong>
                      </td>
                      <td>軽度〜中等度（変動あり）</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>持続時間</strong>
                      </td>
                      <td>数時間〜持続性（変動性、寛解と増悪を繰り返す）</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>誘発・増悪因子</strong>
                      </td>
                      <td>頸部の特定姿勢・運動、後頸部への圧迫、長時間のデスクワーク</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>随伴症状</strong>
                      </td>
                      <td>
                        同側の頸部・肩・腕の鈍痛、頸部可動域制限。悪心・光過敏は軽度で出現しうる
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* ====================================================== SECTION 2 */}
            <section id="s2" className="sec">
              <div className="sec-hd">
                <div className="sec-num">2</div>
                <h2 className="sec-title">疫学</h2>
              </div>

              <div className="tbl">
                <table>
                  <thead>
                    <tr>
                      <th>指標</th>
                      <th>データ</th>
                      <th>出典</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>一般人口での有病率</td>
                      <td>
                        約 <strong>0.4〜2.5%</strong>
                      </td>
                      <td>
                        Sjaastad &amp; Bakketeig, Vågå study, <em>Acta Neurol Scand</em> 2008
                      </td>
                    </tr>
                    <tr>
                      <td>頭痛患者集団での割合</td>
                      <td>
                        約 <strong>15〜20%</strong>（慢性頭痛例で高い）
                      </td>
                      <td>
                        Knackstedt et al., Akershus study, <em>Cephalalgia</em> 2010
                      </td>
                    </tr>
                    <tr>
                      <td>むち打ち損傷（whiplash）後</td>
                      <td>高頻度に発症</td>
                      <td>各種コホート研究</td>
                    </tr>
                    <tr>
                      <td>性別</td>
                      <td>女性にやや多い（女性 &gt; 男性）</td>
                      <td>疫学研究の集積</td>
                    </tr>
                    <tr>
                      <td>好発年齢</td>
                      <td>中年（30〜60歳）に多いが全年齢で生じうる</td>
                      <td>—</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="alert a-info">
                <div className="alert-i">📌</div>
                <div>
                  有病率の推定値は使用する診断基準（ICHD-3 vs. Sjaastad/CHISG
                  基準）により大きく変動する点に注意。
                </div>
              </div>
            </section>

            {/* ====================================================== SECTION 3 */}
            <section id="s3" className="sec">
              <div className="sec-hd">
                <div className="sec-num">3</div>
                <h2 className="sec-title">関連解剖と病態生理学（三叉神経頸髄複合体）</h2>
              </div>

              <p>
                頸原性頭痛を理解する鍵は、
                <strong>「なぜ頸部の障害が&quot;頭&quot;の痛みになるのか」</strong> という
                <Term id="referred-pain">関連痛</Term>のメカニズムです。
              </p>

              <h3>3.1 中核機序：三叉神経頸髄複合体（Trigeminocervical Complex: TCC）</h3>
              <p>
                上位頸髄（C1〜C3）から入る感覚神経と、顔面・頭部を支配する三叉神経（特に第1枝）の侵害情報が、延髄〜上位頸髄の同一ニューロンプール（
                <strong>三叉神経頸髄複合体</strong>
                ）に<strong>収束（convergence）</strong>{" "}
                する。この収束により、脳は頸部由来の痛みを「頭部の痛み」として誤認知する。
              </p>

              <div className="mmd">
                <div className="mmd-lbl">
                  フローチャート — 三叉神経頸髄複合体（TCC）への侵害情報の収束
                </div>
                <MermaidDiagram
                  themeVariables={CEH_MERMAID_THEME}
                  chart={`flowchart TD
C1C3["上位頸髄神経根\\nC1・C2・C3 求心性入力\\n（椎間関節・筋・椎間板・靭帯）"]
TRIG["三叉神経 第1枝（眼神経）\\n求心性入力\\n（前頭・眼窩・側頭領域）"]

C1C3 --> TCC
TRIG --> TCC

TCC["三叉神経頸髄複合体\\nTrigeminocervical Complex\\n（延髄〜上位頸髄の収束ニューロン）"]

TCC --> CONV["侵害情報の収束\\n（Convergence）"]
CONV --> REF["関連痛として知覚\\n頸部の病変 → 頭部の痛みとして認知"]
REF --> CLINIC["臨床像：\\n後頭部から前頭・眼窩へ\\n放散する一側性頭痛"]

style TCC fill:#1565c0,color:#fff
style REF fill:#c0392b,color:#fff
style CLINIC fill:#1E8449,color:#fff`}
                />
              </div>

              <h3>3.2 主要な痛みの発生源（pain generators）</h3>
              <div className="tbl">
                <table>
                  <thead>
                    <tr>
                      <th>構造</th>
                      <th>神経支配</th>
                      <th>臨床的意義</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <strong>環椎後頭関節（C0-C1）</strong>
                      </td>
                      <td>C1</td>
                      <td>上部頸椎の回旋・側屈に関与</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>
                          <Term id="c1-c2">環軸関節</Term>（C1-C2）
                        </strong>
                      </td>
                      <td>C2</td>
                      <td>頭部回旋の大部分を担う。障害で回旋時痛</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>C2-C3 椎間関節</strong>
                      </td>
                      <td>第三後頭神経（TON, C3後枝）</td>
                      <td>
                        <strong>頸原性頭痛の最重要発生源</strong>
                        。TONブロックが診断・治療に有用
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <strong>頸椎椎間板（上位）</strong>
                      </td>
                      <td>洞椎骨神経</td>
                      <td>椎間板性疼痛</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>後頸部筋群</strong>
                      </td>
                      <td>頸神経後枝</td>
                      <td>
                        筋緊張・<Term id="trigger-point">トリガーポイント</Term>
                        （緊張型頭痛との鑑別が課題）
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <strong>
                          <Term id="gon">大後頭神経</Term>（GON, C2）
                        </strong>
                      </td>
                      <td>C2</td>
                      <td>後頭神経痛との関連・鑑別</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="alert a-info">
                <div className="alert-i">💡</div>
                <div>
                  <strong>臨床のキモ：</strong> C2-C3 椎間関節と、それを支配する
                  <strong>第三後頭神経（TON）</strong>{" "}
                  は頸原性頭痛で最も頻度の高い発生源とされ、診断的神経ブロックの主要ターゲットとなる。
                </div>
              </div>

              <div className="alert a-info">
                <div className="alert-i">📌</div>
                <div>
                  出典：Bogduk N.{" "}
                  <em>Cervicogenic headache: anatomic basis and pathophysiologic mechanisms.</em>{" "}
                  Curr Pain Headache Rep 2001 —{" "}
                  <Ext href="https://pubmed.ncbi.nlm.nih.gov/11403742/">
                    https://pubmed.ncbi.nlm.nih.gov/11403742/
                  </Ext>
                </div>
              </div>
            </section>

            {/* ====================================================== SECTION 4 */}
            <section id="s4" className="sec">
              <div className="sec-hd">
                <div className="sec-num">4</div>
                <h2 className="sec-title">ICHD-3 診断分類</h2>
              </div>

              <h3>4.1 第11章内の位置づけ</h3>
              <div className="tbl">
                <table>
                  <thead>
                    <tr>
                      <th>コード</th>
                      <th>診断名</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>11.2</td>
                      <td>頸部の障害による頭痛（Headache attributed to disorder of the neck）</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>11.2.1</strong>
                      </td>
                      <td>
                        <strong>頸原性頭痛（Cervicogenic headache）</strong> ← 本資料の対象
                      </td>
                    </tr>
                    <tr>
                      <td>11.2.2</td>
                      <td>咽後腱炎による頭痛（Retropharyngeal tendonitis）</td>
                    </tr>
                    <tr>
                      <td>11.2.3</td>
                      <td>頭頸部ジストニアによる頭痛（Craniocervical dystonia）</td>
                    </tr>
                    <tr>
                      <td>A11.2.4</td>
                      <td>上位頸椎神経根症による頭痛（付録診断）</td>
                    </tr>
                    <tr>
                      <td>A11.2.5</td>
                      <td>頸部筋筋膜性疼痛による頭痛（付録診断）</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="alert a-info">
                <div className="alert-i">📌</div>
                <div>
                  出典：ICHD-3 第11章 —{" "}
                  <Ext href="https://ichd-3.org/11-headache-or-facial-pain-attributed-to-disorder-of-the-cranium-neck-eyes-ears-nose-sinuses-teeth-mouth-or-other-facial-or-cervical-structure/11-2-headache-attributed-to-disorder-of-the-neck/11-2-1-cervicogenic-headache/">
                    https://ichd-3.org/11-headache-or-facial-pain-attributed-to-disorder-of-the-cranium-neck-eyes-ears-nose-sinuses-teeth-mouth-or-other-facial-or-cervical-structure/11-2-headache-attributed-to-disorder-of-the-neck/11-2-1-cervicogenic-headache/
                  </Ext>
                </div>
              </div>
            </section>

            {/* ====================================================== SECTION 5 */}
            <section id="s5" className="sec">
              <div className="sec-hd">
                <div className="sec-num">5</div>
                <h2 className="sec-title">診断基準 ステップバイステップ</h2>
              </div>

              <h3>5.1 ICHD-3 11.2.1 頸原性頭痛 公式診断基準（原文準拠）</h3>
              <div className="card">
                <p>
                  <strong className="tN">A.</strong> 基準C を満たす任意の頭痛
                </p>
                <p>
                  <strong className="tN">B.</strong> 頭痛を引き起こしうることが知られている
                  <strong>頸椎または頸部軟部組織の障害・病変</strong>
                  の臨床的および/または画像的証拠が存在する¹
                </p>
                <p>
                  <strong className="tN">C.</strong> 以下の <strong>少なくとも2項目</strong>
                  により因果関係が証明される：
                </p>
                <ol>
                  <li>
                    頭痛が、頸部障害の発症または病変出現と<strong>時間的関連</strong>
                    をもって発症した
                  </li>
                  <li>
                    頭痛が、頸部障害・病変の改善・消失と
                    <strong>並行して有意に改善または消失</strong>した
                  </li>
                  <li>
                    <strong>頸部可動域が低下</strong>し、誘発手技により頭痛が有意に増悪する
                  </li>
                  <li>
                    頸部構造またはその神経支配への
                    <strong>診断的ブロックにより頭痛が消失</strong>する
                  </li>
                </ol>
                <p>
                  <strong className="tN">D.</strong> 他のICHD-3診断で
                  <strong>よりよく説明されない</strong>²⁻⁵
                </p>
              </div>

              <div className="alert a-warn">
                <div className="alert-i">⚠️</div>
                <div>
                  <strong>注釈（重要）：</strong>
                  <ul>
                    <li>
                      ¹ 上位頸椎の画像所見は頭痛のない人にも一般的に見られ、因果関係の
                      <strong>示唆にはなるが確証にはならない</strong>。
                    </li>
                    <li>
                      ²{" "}
                      腫瘍・骨折・感染・関節リウマチは正式には検証されていないが、個別症例では基準Bを満たすと容認される。
                    </li>
                    <li>
                      ³ 頸部筋筋膜性疼痛が原因の場合は、
                      <strong>むしろ 2. 緊張型頭痛</strong>
                      としてコードすべき場合がある（重複が多い）。
                    </li>
                    <li>⁴ 上位頸椎神経根症による頭痛は付録診断 A11.2.4 として保留中。</li>
                    <li>
                      ⁵ <strong>鑑別を助ける特徴：</strong>{" "}
                      側方固定性疼痛、頸部筋への指圧や頭部運動による典型頭痛の誘発、後方→前方への放散。ただしこれらは頸原性頭痛に
                      <strong>特異的ではない</strong>。
                    </li>
                  </ul>
                </div>
              </div>

              <div className="alert a-info">
                <div className="alert-i">📌</div>
                <div>
                  出典：ICHD-3 11.2.1 —{" "}
                  <Ext href="https://ichd-3.org/11-headache-or-facial-pain-attributed-to-disorder-of-the-cranium-neck-eyes-ears-nose-sinuses-teeth-mouth-or-other-facial-or-cervical-structure/11-2-headache-attributed-to-disorder-of-the-neck/11-2-1-cervicogenic-headache/">
                    https://ichd-3.org/11-headache-or-facial-pain-attributed-to-disorder-of-the-cranium-neck-eyes-ears-nose-sinuses-teeth-mouth-or-other-facial-or-cervical-structure/11-2-headache-attributed-to-disorder-of-the-neck/11-2-1-cervicogenic-headache/
                  </Ext>
                </div>
              </div>

              <h3>5.2 診断フローチャート</h3>
              <div className="mmd">
                <div className="mmd-lbl">フローチャート — 頸原性頭痛 ICHD-3 診断アルゴリズム</div>
                <MermaidDiagram
                  themeVariables={CEH_MERMAID_THEME}
                  chart={`flowchart TD
START(["頭痛患者の来院"]) --> SNOOP{"SNOOP4\\nレッドフラッグ\\nスクリーニング"}
SNOOP -->|"該当あり"| RED["🚨 二次性緊急疾患の検索\\nCT/MRI・専門科コンサルト\\n（§6参照）"]
SNOOP -->|"クリア"| B

B{"頸椎/頸部軟部組織の\\n障害の臨床的・画像的証拠\\n（基準B）"}
B -->|"なし"| OTHER["他の頭痛診断を検討\\n（片頭痛・緊張型頭痛など）"]
B -->|"あり"| C

C{"因果関係の証拠\\n（基準C）\\n4項目中2項目以上"}
C -->|"1. 時間的関連"| COUNT
C -->|"2. 並行改善"| COUNT
C -->|"3. 可動域低下＋誘発増悪"| COUNT
C -->|"4. 診断的ブロックで消失"| COUNT

COUNT{"2項目以上\\n満たすか?"}
COUNT -->|"NO"| OTHER
COUNT -->|"YES"| D

D{"他のICHD-3診断で\\nよりよく説明されないか\\n（基準D）"}
D -->|"説明される"| OTHER
D -->|"説明されない"| DX["✅ 頸原性頭痛\\nICHD-3: 11.2.1 確定"]

style RED fill:#c0392b,color:#fff
style DX fill:#1E8449,color:#fff
style START fill:#2980b9,color:#fff
style SNOOP fill:#f39c12,color:#fff`}
                />
              </div>

              <h3>5.3 Sjaastad / CHISG 基準（補助的）</h3>
              <p>
                ICHD-3 とは別に、頸原性頭痛国際研究会（CHISG）による <strong>Sjaastad 基準</strong>
                が臨床研究で広く用いられてきました。主要項目：
              </p>
              <div className="tbl">
                <table>
                  <thead>
                    <tr>
                      <th>主要基準</th>
                      <th>内容</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>頸部からの誘発性</td>
                      <td>
                        ①頸部運動・不良姿勢、②後頸部/後頭部への外圧 により典型頭痛が誘発される
                      </td>
                    </tr>
                    <tr>
                      <td>頸部可動域制限</td>
                      <td>頸部の可動域が制限される</td>
                    </tr>
                    <tr>
                      <td>同側の頸・肩・腕痛</td>
                      <td>非根性の鈍い同側上肢痛</td>
                    </tr>
                    <tr>
                      <td>側方固定性</td>
                      <td>痛みは左右を越えない（側方固定）</td>
                    </tr>
                    <tr>
                      <td>局所麻酔ブロックでの消失</td>
                      <td>診断的ブロックによる頭痛消失（確定的所見）</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="alert a-info">
                <div className="alert-i">📌</div>
                <div>
                  出典：Sjaastad O, et al. <em>Cervicogenic headache: diagnostic criteria.</em>{" "}
                  Headache 1998 —{" "}
                  <Ext href="https://pubmed.ncbi.nlm.nih.gov/9695957/">
                    https://pubmed.ncbi.nlm.nih.gov/9695957/
                  </Ext>
                </div>
              </div>
            </section>

            {/* ====================================================== SECTION 6 */}
            <section id="s6" className="sec">
              <div className="sec-hd">
                <div className="sec-num">6</div>
                <h2 className="sec-title">SNOOP4 レッドフラッグスクリーニング</h2>
              </div>

              <div className="alert a-danger">
                <div className="alert-i">⚠️</div>
                <div>
                  <strong>
                    すべての頭痛患者において、いかなる治療プロトコル開始前にも SNOOP4
                    基準を確認すること。
                  </strong>{" "}
                  頸原性頭痛は二次性頭痛であり、「頸部由来」と早合点する前に、より重篤な二次性病変（頸動脈/椎骨動脈解離、頸髄病変、頭蓋頸椎移行部病変など）を必ず除外する。
                </div>
              </div>

              <div className="mmd">
                <div className="mmd-lbl">
                  フローチャート — SNOOP4 レッドフラッグ階層スクリーニング
                </div>
                <MermaidDiagram
                  themeVariables={CEH_MERMAID_THEME}
                  chart={`flowchart TD
START(["頭痛患者\\n問診開始"]) --> S

S{"S — Systemic 全身症状\\n発熱・項部硬直・体重減少\\n免疫不全・既知の悪性腫瘍"}
S -->|該当あり| RED["🚨 EMERGENCY\\n緊急 CT / MRI\\n二次性頭痛を除外\\n専門科緊急コンサルト"]
S -->|なし| N

N{"N — Neurological deficits\\n運動麻痺・感覚障害・失語\\n複視・意識障害・認知変化"}
N -->|該当あり| RED
N -->|なし| O1

O1{"O — Onset 突発性\\n雷鳴頭痛\\n生涯最悪の頭痛\\n→ SAH・動脈解離除外"}
O1 -->|該当あり| RED
O1 -->|なし| O2

O2{"O — Onset after 50\\n50歳以降の新規発症\\n→ 側頭動脈炎・占拠性病変"}
O2 -->|該当あり| RED
O2 -->|なし| P

P{"P — Pattern change\\n進行性増悪・外傷後新規発症\\n体位依存性"}
P -->|該当あり| RED
P -->|なし| FOUR

FOUR{"4 — 四つのP\\nPapilledema 乳頭浮腫\\nPostdural 硬膜穿刺後\\nPost-seizure 痙攣後\\nPregnancy/Postpartum 妊娠・産後"}
FOUR -->|該当あり| RED
FOUR -->|なし| CLEAR

CLEAR["✅ SNOOP4 クリア\\n二次性頭痛の検索プロセスへ\\n→ 頸原性頭痛の評価へ進む"]

style RED fill:#c0392b,color:#fff
style CLEAR fill:#27ae60,color:#fff
style START fill:#2980b9,color:#fff`}
                />
              </div>

              <h3>6.1 頸原性頭痛で特に注意すべき&quot;なりすまし&quot;病態</h3>
              <div className="tbl">
                <table className="th-red">
                  <thead>
                    <tr>
                      <th>見逃してはならない疾患</th>
                      <th>警告所見</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <strong>頸動脈/椎骨動脈解離</strong>
                      </td>
                      <td>突発性の頸部・後頭部痛、Horner徴候、若年・外傷/頸部操作後</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>頭蓋頸椎移行部病変</strong>（Chiari奇形・腫瘍）
                      </td>
                      <td>咳・労作で増悪、進行性、神経症状</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>環軸椎不安定性</strong>（関節リウマチ等）
                      </td>
                      <td>RA既往、頸部不安定感、四肢のしびれ</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>脊髄/神経根圧迫</strong>
                      </td>
                      <td>進行性の上肢筋力低下・感覚障害</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>巨細胞性動脈炎（GCA）</strong>
                      </td>
                      <td>50歳以上、側頭部痛、顎跛行、ESR/CRP上昇</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="alert a-danger">
                <div className="alert-i">⚠️</div>
                <div>
                  <strong>
                    頸部マニピュレーション（高速スラスト手技）施行前には、椎骨脳底動脈循環不全・動脈解離リスクの評価が必須。
                  </strong>
                </div>
              </div>
            </section>

            {/* ====================================================== SECTION 7 */}
            <section id="s7" className="sec">
              <div className="sec-hd">
                <div className="sec-num">7</div>
                <h2 className="sec-title">鑑別診断</h2>
              </div>

              <p>
                頸原性頭痛は、<Term id="migraine">片頭痛</Term>・
                <Term id="tension-type-headache">緊張型頭痛</Term>
                ・後頭神経痛との鑑別が最も重要かつ困難です。
              </p>

              <div className="tbl">
                <table>
                  <thead>
                    <tr>
                      <th>鑑別点</th>
                      <th>頸原性頭痛</th>
                      <th>片頭痛（前兆なし）</th>
                      <th>緊張型頭痛</th>
                      <th>後頭神経痛</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <strong>ICHD-3コード</strong>
                      </td>
                      <td>11.2.1</td>
                      <td>1.1</td>
                      <td>2.1〜2.3</td>
                      <td>13.1</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>部位</strong>
                      </td>
                      <td>一側・後頭→前方放散</td>
                      <td>一側性（多い）</td>
                      <td>両側性</td>
                      <td>GON/LON支配領域</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>側方固定性</strong>
                      </td>
                      <td>あり（典型的）</td>
                      <td>通常入れ替わる</td>
                      <td>両側</td>
                      <td>あり</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>性状</strong>
                      </td>
                      <td>非拍動性・鈍痛</td>
                      <td>拍動性</td>
                      <td>圧迫・締め付け</td>
                      <td>電撃痛・刺すような</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>頸部運動での誘発</strong>
                      </td>
                      <td>あり（特徴的）</td>
                      <td>通常なし</td>
                      <td>軽度</td>
                      <td>体位で誘発しうる</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>頸部可動域制限</strong>
                      </td>
                      <td>あり</td>
                      <td>なし</td>
                      <td>なし/軽度</td>
                      <td>なし</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>悪心/嘔吐</strong>
                      </td>
                      <td>まれ〜軽度</td>
                      <td>あり（多い）</td>
                      <td>なし</td>
                      <td>なし</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>光・音過敏</strong>
                      </td>
                      <td>軽度のことあり</td>
                      <td>あり（両方）</td>
                      <td>一方のみ可</td>
                      <td>通常なし</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>診断的頸部ブロック</strong>
                      </td>
                      <td>
                        <strong>消失する（確定的）</strong>
                      </td>
                      <td>通常無効</td>
                      <td>無効</td>
                      <td>GONブロックで消失</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>拍動性・体動増悪</strong>
                      </td>
                      <td>体動より頸部運動で増悪</td>
                      <td>体動で増悪</td>
                      <td>体動で増悪せず</td>
                      <td>—</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="alert a-info">
                <div className="alert-i">💡</div>
                <div>
                  <strong>最重要：</strong> 頸原性頭痛・片頭痛・緊張型頭痛は
                  <strong>共存しうる</strong>
                  。診断的神経ブロックによる頭痛消失（基準C-4）は頸原性頭痛を最も強く支持する所見。
                </div>
              </div>

              <div className="alert a-info">
                <div className="alert-i">📌</div>
                <div>
                  ICHD-3
                  注釈5：悪心・嘔吐・光/音過敏といった片頭痛様症状も頸原性頭痛に伴いうるが、一般に片頭痛より軽度。
                </div>
              </div>
            </section>

            {/* ====================================================== SECTION 8 */}
            <section id="s8" className="sec">
              <div className="sec-hd">
                <div className="sec-num">8</div>
                <h2 className="sec-title">身体所見・誘発テスト</h2>
              </div>

              <h3>8.1 主要な徒手評価テスト</h3>
              <div className="tbl">
                <table>
                  <thead>
                    <tr>
                      <th>テスト</th>
                      <th>方法</th>
                      <th>陽性所見の意味</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <strong>屈曲回旋テスト（FRT）</strong>
                      </td>
                      <td>頸部最大屈曲位で左右に回旋させ可動域を測定</td>
                      <td>
                        C1-C2由来の制限を検出。<strong>頸原性頭痛で感度・特異度が高い</strong>
                        とされる主要テスト
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <strong>上位頸椎の関節触診（PAIVMs）</strong>
                      </td>
                      <td>C0-C3椎間関節を後前方向に触診し、典型頭痛を再現</td>
                      <td>障害分節（特にC1-C3）の同定</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>頭蓋頸椎屈曲テスト（CCFT）</strong>
                      </td>
                      <td>バイオフィードバック圧計を用い深頸屈筋の機能を評価</td>
                      <td>深頸屈筋（頸長筋・頭長筋）の機能不全を検出</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>頸部伸筋・後頭下筋の触診</strong>
                      </td>
                      <td>トリガーポイント・圧痛を評価</td>
                      <td>関連痛の再現</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>姿勢評価</strong>
                      </td>
                      <td>前方頭位（forward head posture）等</td>
                      <td>慢性化の機械的要因</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="alert a-info">
                <div className="alert-i">💡</div>
                <div>
                  <strong>屈曲回旋テスト（Flexion-Rotation Test, FRT）</strong>{" "}
                  は、C1-C2レベルの機能障害を反映し、頸原性頭痛の臨床評価で最も研究されたテストの一つ。
                  <br />
                  <span className="src-url">
                    📌 出典：Hall T, et al.{" "}
                    <em>The flexion–rotation test and active cervical mobility.</em> Man Ther 2004 —{" "}
                    <Ext href="https://pubmed.ncbi.nlm.nih.gov/15522642/">
                      https://pubmed.ncbi.nlm.nih.gov/15522642/
                    </Ext>
                  </span>
                </div>
              </div>

              <h3>8.2 評価の流れ</h3>
              <div className="mmd">
                <div className="mmd-lbl">フローチャート — 頸原性頭痛 身体評価のステップ</div>
                <MermaidDiagram
                  themeVariables={CEH_MERMAID_THEME}
                  chart={`flowchart LR
A["問診\\n（側方固定性・誘発因子）"] --> B["姿勢・可動域評価\\n（ROM・前方頭位）"]
B --> C["屈曲回旋テスト\\nFRT"]
C --> D["上位頸椎触診\\nPAIVMs"]
D --> E["深頸屈筋機能\\nCCFT"]
E --> F["筋トリガーポイント\\n評価"]
F --> G{"頸部由来の\\n典型頭痛が\\n再現されるか"}
G -->|"YES"| POS["頸原性頭痛を支持\\n→ 必要に応じ診断的ブロック"]
G -->|"NO"| NEG["他病態を再検討"]

style POS fill:#1E8449,color:#fff
style NEG fill:#7F8C8D,color:#fff`}
                />
              </div>
            </section>

            {/* ====================================================== SECTION 9 */}
            <section id="s9" className="sec">
              <div className="sec-hd">
                <div className="sec-num">9</div>
                <h2 className="sec-title">画像・診断的神経ブロック</h2>
              </div>

              <h3>9.1 画像検査の位置づけ</h3>
              <div className="tbl">
                <table>
                  <thead>
                    <tr>
                      <th>検査</th>
                      <th>役割</th>
                      <th>注意点</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <strong>頸椎単純X線</strong>
                      </td>
                      <td>整列・変性・不安定性の評価</td>
                      <td>無症候性変性が多く、因果関係の証拠としては弱い</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>MRI</strong>
                      </td>
                      <td>椎間板・脊髄・神経根・軟部組織の評価</td>
                      <td>二次性病変の除外に重要。所見＝原因とは限らない（ICHD-3 注釈1）</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>CT</strong>
                      </td>
                      <td>骨性病変・頭蓋頸椎移行部</td>
                      <td>骨折・骨破壊の評価</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="alert a-warn">
                <div className="alert-i">⚠️</div>
                <div>
                  <strong>重要：</strong>{" "}
                  上位頸椎の画像所見は無症候者にも高頻度。画像所見のみで頸原性頭痛を確定してはならない（
                  <strong>因果関係は基準Cで証明する</strong>）。
                </div>
              </div>

              <h3>9.2 診断的神経ブロック（基準C-4の要）</h3>
              <p>
                診断的ブロックによる頭痛消失は、ICHD-3基準C-4を満たし、
                <strong>最も確実な因果関係の証拠</strong>
                となります。透視・超音波ガイド下で施行します。
              </p>
              <div className="tbl">
                <table>
                  <thead>
                    <tr>
                      <th>ブロック標的</th>
                      <th>対応する痛みの発生源</th>
                      <th>臨床的意義</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <strong>第三後頭神経（TON）ブロック</strong>
                      </td>
                      <td>C2-C3椎間関節</td>
                      <td>頸原性頭痛で最も有用。陽性なら高周波熱凝固術（RFA）の適応評価へ</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>C2-C3・C3-C4 内側枝ブロック</strong>
                      </td>
                      <td>上位頸椎椎間関節</td>
                      <td>椎間関節性頸原性頭痛の同定</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>大後頭神経（GON）ブロック</strong>
                      </td>
                      <td>C2神経・後頭神経痛との鑑別</td>
                      <td>GON+TON併用で上乗せ効果</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>C2/C3 神経根ブロック</strong>
                      </td>
                      <td>上位頸椎神経</td>
                      <td>神経根性関与の評価</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="mmd">
                <div className="mmd-lbl">
                  フローチャート — 診断的神経ブロックによる確証と治療標的の決定
                </div>
                <MermaidDiagram
                  themeVariables={CEH_MERMAID_THEME}
                  chart={`flowchart TD
DX["頸原性頭痛 疑い\\n（臨床・身体所見）"] --> BLOCK["診断的神経ブロック\\nTON / 内側枝 / GON\\n（透視・超音波ガイド下）"]
BLOCK --> RESULT{"典型頭痛が\\n消失するか"}
RESULT -->|"消失（陽性）"| CONFIRM["✅ 頸原性頭痛を確証\\nICHD-3 基準C-4 充足\\n→ 治療標的が明確化"]
RESULT -->|"消失せず"| RECONSIDER["他の発生源/診断を再検討"]

CONFIRM --> RFA{"反復ブロックで\\n再現性のある\\n良好な反応?"}
RFA -->|"YES"| ABLATION["高周波熱凝固術（RFA）\\n等の介入を検討\\n[Grade B〜C]"]
RFA -->|"NO"| CONSERV["保存的治療を継続"]

style CONFIRM fill:#1E8449,color:#fff
style RECONSIDER fill:#7F8C8D,color:#fff
style ABLATION fill:#2980b9,color:#fff`}
                />
              </div>

              <div className="alert a-info">
                <div className="alert-i">📌</div>
                <div>
                  第三後頭神経・頸椎内側枝ブロック／RFAのエビデンス：Bogduk N, Govind J.{" "}
                  <em>Cervicogenic headache: assessment of the evidence...</em> Lancet Neurol 2009 —{" "}
                  <Ext href="https://pubmed.ncbi.nlm.nih.gov/19747657/">
                    https://pubmed.ncbi.nlm.nih.gov/19747657/
                  </Ext>
                </div>
              </div>
            </section>

            {/* ====================================================== SECTION 10 */}
            <section id="s10" className="sec">
              <div className="sec-hd">
                <div className="sec-num">10</div>
                <h2 className="sec-title">評価ツール・アウトカム指標</h2>
              </div>

              <div className="tbl">
                <table>
                  <thead>
                    <tr>
                      <th>ツール</th>
                      <th>用途</th>
                      <th>解釈</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <strong>HIT-6</strong>
                      </td>
                      <td>頭痛による生活影響度</td>
                      <td>≥60 = 重度の障害</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>MIDAS</strong>
                      </td>
                      <td>頭痛による能力障害</td>
                      <td>≥21 = Grade IV（重度）</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>NDI（Neck Disability Index）</strong>
                      </td>
                      <td>
                        <strong>頸部障害度（頸原性頭痛で特に重要）</strong>
                      </td>
                      <td>0〜100%。頸部由来の障害を定量化</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>VAS / NRS</strong>
                      </td>
                      <td>疼痛強度 0〜10</td>
                      <td>発症時・ピーク・治療後2時間で記録</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>PGIC</strong>
                      </td>
                      <td>患者全般改善度</td>
                      <td>7段階尺度</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>頸部可動域（ROM）/ FRT角度</strong>
                      </td>
                      <td>機能的改善の客観指標</td>
                      <td>治療前後で比較</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>頭痛日誌</strong>
                      </td>
                      <td>ベースライン・効果判定</td>
                      <td>最低30日間の記録</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="alert a-info">
                <div className="alert-i">💡</div>
                <div>
                  頸原性頭痛では一般的な頭痛尺度に加え、<strong>NDI</strong> と{" "}
                  <strong>頸部可動域/FRT</strong>{" "}
                  を併用することで頸部機能の改善を客観的に追跡できる。
                </div>
              </div>
            </section>

            {/* ====================================================== SECTION 11 */}
            <section id="s11" className="sec">
              <div className="sec-hd">
                <div className="sec-num">11</div>
                <h2 className="sec-title">治療戦略（マルチモーダル）</h2>
              </div>

              <p>
                頸原性頭痛の治療は <strong>理学療法を中核とした多面的アプローチ</strong>
                が国際的に推奨されます。単一モダリティではなく、
                <strong>徒手療法＋運動療法の併用</strong>が最も強いエビデンスをもちます。
              </p>

              <h3>11.1 治療アルゴリズム</h3>
              <div className="mmd">
                <div className="mmd-lbl">
                  フローチャート — 頸原性頭痛 マルチモーダル治療アルゴリズム
                </div>
                <MermaidDiagram
                  themeVariables={CEH_MERMAID_THEME}
                  chart={`flowchart TD
START(["✅ 頸原性頭痛 確定\\nICHD-3: 11.2.1"]) --> EDU["患者教育・姿勢/エルゴノミクス指導\\n[Grade B]"]
EDU --> PT

PT["第一選択：理学療法（中核）\\n✅ 頸椎徒手療法 [Grade A]\\n✅ 深頸屈筋トレーニング/運動療法 [Grade A]\\n✅ SNAG（Mulligan手技）[Grade A〜B]\\n✅ 姿勢矯正・エルゴノミクス [Grade B]"]

PT --> EVAL{"6〜8週で\\n50%以上の\\n改善?"}
EVAL -->|"YES"| MAINTAIN["維持期\\nホームエクササイズ継続\\n再発予防"]
EVAL -->|"NO / 不十分"| ADJUNCT

ADJUNCT["補助・薬物療法を追加\\n・短期NSAIDs（MOH注意）\\n・筋弛緩薬（短期）\\n・併存片頭痛/TTHの治療最適化"]

ADJUNCT --> INTERV{"難治性?\\n発生源が明確?"}
INTERV -->|"YES"| BLOCK["インターベンション\\n・診断的/治療的神経ブロック [Grade B]\\n・第三後頭神経 RFA [Grade B〜C]"]
INTERV -->|"NO"| MULTI["集学的疼痛管理\\n（心理療法・運動の継続）"]

style PT fill:#1E8449,color:#fff
style START fill:#2980b9,color:#fff
style BLOCK fill:#8e44ad,color:#fff`}
                />
              </div>

              <h3>11.2 理学療法（中核治療）の詳細</h3>
              <div className="tbl">
                <table>
                  <thead>
                    <tr>
                      <th>介入</th>
                      <th>内容</th>
                      <th>エビデンス</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <strong>徒手療法（manual therapy）</strong>
                      </td>
                      <td>
                        上位頸椎モビライゼーション・マニピュレーション、関節モビライゼーション
                      </td>
                      <td>
                        <span className="bA">Grade A</span> Jull G, et al. 2002 RCT（<em>Spine</em>
                        ）— 中核エビデンス
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <strong>特定運動療法</strong>
                      </td>
                      <td>深頸屈筋（頸長筋・頭長筋）の協調性・持久力訓練、頸肩甲帯安定化</td>
                      <td>
                        <span className="bA">Grade A</span> 同上
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <strong>徒手療法＋運動の併用</strong>
                      </td>
                      <td>両者の組合せが単独より優れる</td>
                      <td>
                        <span className="bA">Grade A</span> Jull 2002では併用で最大効果、長期維持
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <strong>SNAG（Mulligan）</strong>
                      </td>
                      <td>持続的椎間関節滑走手技（Sustained Natural Apophyseal Glides）</td>
                      <td>
                        <span className="bA">Grade A</span>
                        <span className="bB">〜B</span> RCTで頭痛軽減
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <strong>姿勢・エルゴノミクス</strong>
                      </td>
                      <td>前方頭位の是正、デスク環境調整</td>
                      <td>
                        <span className="bB">Grade B</span>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <strong>後頭下筋リリース</strong>
                      </td>
                      <td>後頭下筋群の即時的緊張緩和</td>
                      <td>
                        <span className="bC">Grade C</span> 即時効果の小規模研究
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="alert a-info">
                <div className="alert-i">📌</div>
                <div>
                  <strong>最重要エビデンス：</strong> Jull G, et al.{" "}
                  <em>
                    A randomized controlled trial of exercise and manipulative therapy for
                    cervicogenic headache.
                  </em>{" "}
                  Spine 2002 —{" "}
                  <Ext href="https://pubmed.ncbi.nlm.nih.gov/12529905/">
                    https://pubmed.ncbi.nlm.nih.gov/12529905/
                  </Ext>
                  <br />→ <strong>徒手療法・運動療法の単独および併用がいぜんとして有効</strong>
                  で、併用群で効果が最大かつ12ヶ月後も維持された。
                </div>
              </div>

              <div className="alert a-info">
                <div className="alert-i">📌</div>
                <div>
                  頸椎徒手療法のCochraneレビュー：Gross A, et al.{" "}
                  <em>Manipulation and mobilisation for neck pain.</em> —{" "}
                  <Ext href="https://www.cochranelibrary.com/cdsr/doi/10.1002/14651858.CD004249.pub4">
                    https://www.cochranelibrary.com/cdsr/doi/10.1002/14651858.CD004249.pub4
                  </Ext>
                </div>
              </div>

              <h3>11.3 薬物療法・インターベンションの位置づけ</h3>
              <div className="tbl">
                <table>
                  <thead>
                    <tr>
                      <th>治療</th>
                      <th>位置づけ</th>
                      <th>注意</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>単純鎮痛薬・NSAIDs</td>
                      <td>補助的・短期のみ</td>
                      <td>
                        <strong>MOH リスク評価必須（§12）</strong>
                      </td>
                    </tr>
                    <tr>
                      <td>筋弛緩薬</td>
                      <td>短期の筋緊張緩和</td>
                      <td>鎮静・依存に注意</td>
                    </tr>
                    <tr>
                      <td>三環系抗うつ薬（例：アミトリプチリン）</td>
                      <td>慢性化例で考慮</td>
                      <td>高齢者は低用量から（§13）</td>
                    </tr>
                    <tr>
                      <td>神経ブロック（TON/GON/内側枝）</td>
                      <td>診断的かつ治療的</td>
                      <td>
                        <span className="bB">Grade B</span>
                      </td>
                    </tr>
                    <tr>
                      <td>第三後頭神経 RFA</td>
                      <td>難治性で発生源が明確な例</td>
                      <td>
                        <span className="bB">Grade B</span>
                        <span className="bC">〜C</span>、効果は一定期間で再発しうる
                      </td>
                    </tr>
                    <tr>
                      <td>外科的手術</td>
                      <td>明確な構造的原因がある例に限定</td>
                      <td>エビデンス限定的、慎重に適応</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="alert a-warn">
                <div className="alert-i">⚠️</div>
                <div>
                  オピオイドは一次性/二次性頭痛のいずれでも<strong>回避すべき</strong>
                  （MOH・依存リスク）。
                </div>
              </div>
            </section>

            {/* ====================================================== SECTION 12 */}
            <section id="s12" className="sec">
              <div className="sec-hd">
                <div className="sec-num">12</div>
                <h2 className="sec-title">薬剤過用頭痛（MOH）リスク評価</h2>
              </div>

              <p>
                頸原性頭痛は慢性経過をとりやすく、鎮痛薬の連用により{" "}
                <strong>薬剤過用頭痛（MOH, ICHD-3: 8.2）</strong> を合併しやすい点に注意します。
              </p>

              <div className="moh-grid">
                <div className="moh moh-l">
                  <div className="moh-day tG">≥15</div>
                  <div className="moh-unit">日/月（≥3ヶ月）</div>
                  <div className="moh-drug">単純鎮痛薬 / NSAIDs</div>
                </div>
                <div className="moh moh-h">
                  <div className="moh-day tR">≥10</div>
                  <div className="moh-unit">日/月（≥3ヶ月）</div>
                  <div className="moh-drug">トリプタン / エルゴタミン / オピオイド</div>
                </div>
                <div className="moh moh-m">
                  <div className="moh-day tO">≥10</div>
                  <div className="moh-unit">日/月（≥3ヶ月）</div>
                  <div className="moh-drug">複合鎮痛薬</div>
                </div>
              </div>

              <div className="alert a-warn">
                <div className="alert-i">⚠️</div>
                <div>
                  <strong>MOHは頭痛頻度を逆説的に増加させる。</strong>{" "}
                  頸原性頭痛の急性鎮痛薬の使用頻度を必ずモニタリングし、過用を認めたら離脱と予防戦略（理学療法強化）へ移行する。
                  <br />
                  <span className="src-url">
                    📌 出典：ICHD-3 8.2 Medication-overuse headache —{" "}
                    <Ext href="https://ichd-3.org/8-headache-attributed-to-a-substance-or-its-withdrawal/">
                      https://ichd-3.org/8-headache-attributed-to-a-substance-or-its-withdrawal/
                    </Ext>
                  </span>
                </div>
              </div>
            </section>

            {/* ====================================================== SECTION 13 */}
            <section id="s13" className="sec">
              <div className="sec-hd">
                <div className="sec-num">13</div>
                <h2 className="sec-title">特殊集団への対応</h2>
              </div>

              <div className="tbl">
                <table>
                  <thead>
                    <tr>
                      <th>集団</th>
                      <th>留意点</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <strong>小児・思春期</strong>
                      </td>
                      <td>
                        まず姿勢・学習環境（タブレット/スマホ使用姿勢）の評価。徒手療法は慎重に。薬物は最小限
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <strong>妊娠・授乳期</strong>
                      </td>
                      <td>
                        薬物は極力回避し、<strong>理学療法・姿勢指導を第一選択</strong>
                        。アセトアミノフェンが比較的安全な急性鎮痛薬
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <strong>高齢者（&gt;65歳）</strong>
                      </td>
                      <td>
                        頸部マニピュレーション前に椎骨動脈・骨粗鬆症・不安定性を評価。三環系抗うつ薬は低用量から（起立性低血圧・転倒・認知に注意）
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <strong>むち打ち損傷後</strong>
                      </td>
                      <td>頸原性頭痛の高リスク。早期からの運動療法・過度の安静回避が推奨</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>関節リウマチ既往</strong>
                      </td>
                      <td>
                        <strong>環軸椎不安定性</strong>
                        を除外してから徒手療法を検討（高速スラスト手技は原則禁忌）
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="alert a-danger">
                <div className="alert-i">⚠️</div>
                <div>
                  <strong>頸部高速スラストマニピュレーションの相対/絶対禁忌：</strong>{" "}
                  動脈解離リスク、環軸椎不安定性、重度骨粗鬆症、脊髄症、悪性腫瘍、感染。施行前のスクリーニング必須。
                </div>
              </div>
            </section>

            {/* ====================================================== SECTION 14 */}
            <section id="s14" className="sec">
              <div className="sec-hd">
                <div className="sec-num">14</div>
                <h2 className="sec-title">標準化ケーススタディ</h2>
              </div>

              <div className="alert a-info">
                <div className="alert-i">📋</div>
                <div>
                  以下は<strong>教育目的の架空症例</strong>
                  であり、実臨床の判断は専門家の評価に基づくこと。
                </div>
              </div>

              <div className="tbl">
                <table>
                  <thead>
                    <tr>
                      <th>項目</th>
                      <th>内容</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <strong>[1] 患者プロフィール</strong>
                      </td>
                      <td>42歳・女性・BMI 22・事務職（長時間PC作業）・運動習慣なし</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>[2] 主訴（PQRST）</strong>
                      </td>
                      <td>
                        P:右後頸部の不良姿勢で増悪／Q:非拍動性の鈍い締め付け感／R:右後頭部→右側頭・眼窩へ放散／S:NRS
                        5-6／T:数時間〜終日持続、週4-5日。頻度 約18日/月
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <strong>[3] 随伴症状</strong>
                      </td>
                      <td>右頸・肩のこわばり、軽度の悪心（時折）、光過敏は軽度。前兆なし</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>[4] SNOOP4 スクリーニング</strong>
                      </td>
                      <td>
                        発熱なし・神経学的欠損なし・突発発症なし・50歳未満・進行性増悪なし・乳頭浮腫なし
                        → <span className="tG">CLEAR</span>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <strong>[5] ICHD-3 分類</strong>
                      </td>
                      <td>
                        <strong>11.2.1 頸原性頭痛</strong>
                        （基準B：MRIでC2-C3椎間関節変性。基準C：①長時間PC作業開始と時間的関連、③頸部可動域低下＋FRT陽性で頭痛誘発
                        → 2項目充足。基準D：片頭痛/TTHでよりよく説明されない）
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <strong>[6] トリガー一覧</strong>
                      </td>
                      <td>
                        環境/姿勢：前方頭位・長時間デスクワーク／睡眠：低めの枕／ストレス：締切業務
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <strong>[7] 現治療・MOH評価</strong>
                      </td>
                      <td>
                        市販NSAIDsを<strong>月15日以上</strong>服用 →{" "}
                        <span className="tR">MOH閾値（≥15日/月）以上 → MOHリスク高、是正対象</span>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <strong>[8] アウトカムスコア</strong>
                      </td>
                      <td>HIT-6 62（重度）／NDI 38%（中等度頸部障害）／VAS 6</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>[9] 治療計画</strong>
                      </td>
                      <td>
                        <strong>急性期</strong>
                        ：NSAIDsを月10日未満に制限（MOH是正）。
                        <strong>中核治療（理学療法）</strong>
                        ：上位頸椎徒手療法＋深頸屈筋トレーニング併用{" "}
                        <span className="bA">Grade A</span>、SNAG手技、姿勢/エルゴノミクス指導{" "}
                        <span className="bB">Grade B</span>。難治なら診断的TONブロック検討{" "}
                        <span className="bB">Grade B</span>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <strong>[10] エビデンスレーティング</strong>
                      </td>
                      <td>
                        徒手療法＋運動併用 <span className="bA">Grade A</span>
                        、姿勢/エルゴノミクス <span className="bB">Grade B</span>、神経ブロック{" "}
                        <span className="bB">Grade B</span>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <strong>[11] 安全性チェック</strong>
                      </td>
                      <td>
                        頸部マニピュレーション前に動脈解離/不安定性スクリーニング。妊娠の有無確認。NSAIDs消化管リスク評価
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <strong>[12] フォローアップ指標</strong>
                      </td>
                      <td>
                        目標：3ヶ月で頭痛日数50%以上減少、HIT-6/NDI/FRT角度を3ヶ月で再評価。鎮痛薬使用日数の継続記録
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* ====================================================== SECTION 15 */}
            <section id="s15" className="sec">
              <div className="sec-hd">
                <div className="sec-num">15</div>
                <h2 className="sec-title">エビデンス階層サマリー</h2>
              </div>

              <h3>15.1 推奨グレード定義（AAN標準）</h3>
              <div className="tbl">
                <table>
                  <thead>
                    <tr>
                      <th>グレード</th>
                      <th>基準</th>
                      <th>臨床的意義</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <span className="bA">Grade A</span>
                      </td>
                      <td>≥2件の一致したClass I RCT / 低異質性Cochrane SR</td>
                      <td>強く推奨</td>
                    </tr>
                    <tr>
                      <td>
                        <span className="bB">Grade B</span>
                      </td>
                      <td>1件のClass I RCT または ≥2件のClass II研究</td>
                      <td>推奨</td>
                    </tr>
                    <tr>
                      <td>
                        <span className="bC">Grade C</span>
                      </td>
                      <td>1件のClass II または ≥2件のClass III研究</td>
                      <td>考慮可能</td>
                    </tr>
                    <tr>
                      <td>
                        <span className="bU">Grade U</span>
                      </td>
                      <td>不十分・相反するエビデンス</td>
                      <td>推奨不可（判断困難）</td>
                    </tr>
                    <tr>
                      <td>Expert Opinion</td>
                      <td>RCTなし・コンセンサスのみ</td>
                      <td>専門家合意</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <h3>15.2 頸原性頭痛 主要治療のエビデンス一覧</h3>
              <div className="tbl">
                <table>
                  <thead>
                    <tr>
                      <th>治療</th>
                      <th>グレード</th>
                      <th>主要根拠</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>徒手療法＋運動療法の併用</td>
                      <td>
                        <span className="bA">A</span>
                      </td>
                      <td>Jull 2002 RCT（Spine）</td>
                    </tr>
                    <tr>
                      <td>頸椎徒手療法（単独）</td>
                      <td>
                        <span className="bA">A</span>
                      </td>
                      <td>Jull 2002, Cochrane CD004249</td>
                    </tr>
                    <tr>
                      <td>深頸屈筋トレーニング</td>
                      <td>
                        <span className="bA">A</span>
                      </td>
                      <td>Jull 2002</td>
                    </tr>
                    <tr>
                      <td>SNAG（Mulligan手技）</td>
                      <td>
                        <span className="bA">A</span>
                        <span className="bB">〜B</span>
                      </td>
                      <td>RCT複数</td>
                    </tr>
                    <tr>
                      <td>姿勢矯正・エルゴノミクス</td>
                      <td>
                        <span className="bB">B</span>
                      </td>
                      <td>観察・準実験研究</td>
                    </tr>
                    <tr>
                      <td>診断的/治療的神経ブロック（TON/GON）</td>
                      <td>
                        <span className="bB">B</span>
                      </td>
                      <td>介入研究・専門レビュー</td>
                    </tr>
                    <tr>
                      <td>第三後頭神経 RFA</td>
                      <td>
                        <span className="bB">B</span>
                        <span className="bC">〜C</span>
                      </td>
                      <td>RCT/症例集積（効果は一定期間）</td>
                    </tr>
                    <tr>
                      <td>後頭下筋リリース（即時効果）</td>
                      <td>
                        <span className="bC">C</span>
                      </td>
                      <td>小規模研究</td>
                    </tr>
                    <tr>
                      <td>外科的治療</td>
                      <td>
                        <span className="bU">U</span>
                      </td>
                      <td>エビデンス限定的</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* ====================================================== SECTION 16 */}
            <section id="s16" className="sec">
              <div className="sec-hd">
                <div className="sec-num">16</div>
                <h2 className="sec-title">参考文献・URLリソース</h2>
              </div>

              <p>
                本資料の根拠はすべて<strong>国際的に認可された情報源</strong>
                （IHS/ICHD-3、NICE、AAN、Cochrane、PubMed収載の査読論文）に基づきます。以下に出典
                URL を補足として明示します。
              </p>

              <h3>16.1 国際診断基準</h3>
              <div className="src-grid">
                <div className="src">
                  <div className="src-org">IHS / ICHD-3</div>
                  <div className="src-t">ICHD-3 公式サイト（全文閲覧可）</div>
                  <div className="src-url">
                    <Ext href="https://ichd-3.org/">https://ichd-3.org/</Ext>
                  </div>
                </div>
                <div className="src">
                  <div className="src-org">IHS / ICHD-3</div>
                  <div className="src-t">第11章（頸部障害による頭痛）</div>
                  <div className="src-url">
                    <Ext href="https://ichd-3.org/11-headache-or-facial-pain-attributed-to-disorder-of-the-cranium-neck-eyes-ears-nose-sinuses-teeth-mouth-or-other-facial-or-cervical-structure/11-2-headache-attributed-to-disorder-of-the-neck/11-2-1-cervicogenic-headache/">
                      https://ichd-3.org/11-headache-or-facial-pain-attributed-to-disorder-of-the-cranium-neck-eyes-ears-nose-sinuses-teeth-mouth-or-other-facial-or-cervical-structure/11-2-headache-attributed-to-disorder-of-the-neck/11-2-1-cervicogenic-headache/
                    </Ext>
                  </div>
                </div>
                <div className="src">
                  <div className="src-org">IHS / ICHD-3</div>
                  <div className="src-t">ICHD-3 全文PDF（2018年版）</div>
                  <div className="src-url">
                    <Ext href="https://ichd-3.org/wp-content/uploads/2018/01/The-International-Classification-of-Headache-Disorders-3rd-Edition-2018.pdf">
                      https://ichd-3.org/wp-content/uploads/2018/01/The-International-Classification-of-Headache-Disorders-3rd-Edition-2018.pdf
                    </Ext>
                  </div>
                </div>
                <div className="src">
                  <div className="src-org">IHS</div>
                  <div className="src-t">分類委員会（ICHD-4 最新動向含む）</div>
                  <div className="src-url">
                    <Ext href="https://ihs-headache.org/en/about-ihs/standing-committees/classification/">
                      https://ihs-headache.org/en/about-ihs/standing-committees/classification/
                    </Ext>
                  </div>
                </div>
              </div>

              <h3>16.2 臨床ガイドライン</h3>
              <div className="src-grid">
                <div className="src">
                  <div className="src-org">NICE（英国）</div>
                  <div className="src-t">頭痛ガイドライン CG150</div>
                  <div className="src-url">
                    <Ext href="https://www.nice.org.uk/guidance/cg150">
                      https://www.nice.org.uk/guidance/cg150
                    </Ext>
                  </div>
                </div>
                <div className="src">
                  <div className="src-org">AAN</div>
                  <div className="src-t">ガイドライン一覧</div>
                  <div className="src-url">
                    <Ext href="https://www.aan.com/guidelines/">
                      https://www.aan.com/guidelines/
                    </Ext>
                  </div>
                </div>
                <div className="src">
                  <div className="src-org">IHS / Cephalalgia</div>
                  <div className="src-t">急性期治療推奨 2024</div>
                  <div className="src-url">
                    <Ext href="https://journals.sagepub.com/doi/10.1177/03331024241252666">
                      https://journals.sagepub.com/doi/10.1177/03331024241252666
                    </Ext>
                  </div>
                </div>
              </div>

              <h3>16.3 Cochrane エビデンスレビュー</h3>
              <div className="src-grid">
                <div className="src">
                  <div className="src-org">Cochrane</div>
                  <div className="src-t">頸椎徒手療法・モビライゼーション（頸痛・関連頭痛）</div>
                  <div className="src-url">
                    <Ext href="https://www.cochranelibrary.com/cdsr/doi/10.1002/14651858.CD004249.pub4">
                      https://www.cochranelibrary.com/cdsr/doi/10.1002/14651858.CD004249.pub4
                    </Ext>
                  </div>
                </div>
                <div className="src">
                  <div className="src-org">Cochrane</div>
                  <div className="src-t">頸原性頭痛 全レビュー検索</div>
                  <div className="src-url">
                    <Ext href="https://www.cochranelibrary.com/search?query=cervicogenic+headache&amp;searchBy=3&amp;type=cdsr">
                      https://www.cochranelibrary.com/search?query=cervicogenic+headache&amp;searchBy=3&amp;type=cdsr
                    </Ext>
                  </div>
                </div>
              </div>

              <h3>16.4 主要原著・レビュー（PubMed / 専門誌）</h3>
              <div className="tbl">
                <table>
                  <thead>
                    <tr>
                      <th>著者・年</th>
                      <th>内容</th>
                      <th>URL</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Jull G, et al. 2002</td>
                      <td>
                        頸原性頭痛への徒手療法＋運動療法 RCT（<em>Spine</em>）— 中核エビデンス
                      </td>
                      <td className="src-url">
                        <Ext href="https://pubmed.ncbi.nlm.nih.gov/12529905/">
                          pubmed.ncbi.nlm.nih.gov/12529905
                        </Ext>
                      </td>
                    </tr>
                    <tr>
                      <td>Bogduk N, Govind J. 2009</td>
                      <td>
                        頸原性頭痛のエビデンス評価（<em>Lancet Neurol</em>）
                      </td>
                      <td className="src-url">
                        <Ext href="https://pubmed.ncbi.nlm.nih.gov/19747657/">
                          pubmed.ncbi.nlm.nih.gov/19747657
                        </Ext>
                      </td>
                    </tr>
                    <tr>
                      <td>Bogduk N. 2001</td>
                      <td>
                        頸原性頭痛の解剖学的基盤と病態生理（<em>Curr Pain Headache Rep</em>）
                      </td>
                      <td className="src-url">
                        <Ext href="https://pubmed.ncbi.nlm.nih.gov/11403742/">
                          pubmed.ncbi.nlm.nih.gov/11403742
                        </Ext>
                      </td>
                    </tr>
                    <tr>
                      <td>Sjaastad O, et al. 1998</td>
                      <td>
                        頸原性頭痛の診断基準（CHISG, <em>Headache</em>）
                      </td>
                      <td className="src-url">
                        <Ext href="https://pubmed.ncbi.nlm.nih.gov/9695957/">
                          pubmed.ncbi.nlm.nih.gov/9695957
                        </Ext>
                      </td>
                    </tr>
                    <tr>
                      <td>Antonaci F, et al. 2001</td>
                      <td>
                        原診断基準の評価（<em>Cephalalgia</em>）
                      </td>
                      <td className="src-url">
                        <Ext href="https://pubmed.ncbi.nlm.nih.gov/11531896/">
                          pubmed.ncbi.nlm.nih.gov/11531896
                        </Ext>
                      </td>
                    </tr>
                    <tr>
                      <td>Hall T, et al. 2004</td>
                      <td>
                        屈曲回旋テスト（FRT）の検証（<em>Man Ther</em>）
                      </td>
                      <td className="src-url">
                        <Ext href="https://pubmed.ncbi.nlm.nih.gov/15522642/">
                          pubmed.ncbi.nlm.nih.gov/15522642
                        </Ext>
                      </td>
                    </tr>
                    <tr>
                      <td>Knackstedt H, et al. 2010</td>
                      <td>
                        一般人口での有病率（Akershus study, <em>Cephalalgia</em>）
                      </td>
                      <td className="src-url">
                        <Ext href="https://pubmed.ncbi.nlm.nih.gov/20974598/">
                          pubmed.ncbi.nlm.nih.gov/20974598
                        </Ext>
                      </td>
                    </tr>
                    <tr>
                      <td>Sjaastad O, Bakketeig LS. 2008</td>
                      <td>
                        有病率（Vågå study, <em>Acta Neurol Scand</em>）
                      </td>
                      <td className="src-url">
                        <Ext href="https://pubmed.ncbi.nlm.nih.gov/18031563/">
                          pubmed.ncbi.nlm.nih.gov/18031563
                        </Ext>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <h3>16.5 継続リサーチ用データベース</h3>
              <div className="src-grid">
                <div className="src">
                  <div className="src-org">EHF 公式誌（OA）</div>
                  <div className="src-t">The Journal of Headache and Pain</div>
                  <div className="src-url">
                    <Ext href="https://thejournalofheadacheandpain.biomedcentral.com/">
                      https://thejournalofheadacheandpain.biomedcentral.com/
                    </Ext>
                  </div>
                </div>
                <div className="src">
                  <div className="src-org">IHS 公式誌</div>
                  <div className="src-t">Cephalalgia</div>
                  <div className="src-url">
                    <Ext href="https://journals.sagepub.com/home/cep">
                      https://journals.sagepub.com/home/cep
                    </Ext>
                  </div>
                </div>
                <div className="src">
                  <div className="src-org">PubMed</div>
                  <div className="src-t">頸原性頭痛 RCT 検索</div>
                  <div className="src-url">
                    <Ext href="https://pubmed.ncbi.nlm.nih.gov/?term=cervicogenic+headache&amp;filter=pubt.clinicaltrial">
                      https://pubmed.ncbi.nlm.nih.gov/?term=cervicogenic+headache&amp;filter=pubt.clinicaltrial
                    </Ext>
                  </div>
                </div>
                <div className="src">
                  <div className="src-org">NIH</div>
                  <div className="src-t">ClinicalTrials.gov</div>
                  <div className="src-url">
                    <Ext href="https://clinicaltrials.gov/">https://clinicaltrials.gov/</Ext>
                  </div>
                </div>
              </div>

              <div className="card" style={{ marginTop: 18 }}>
                <h3>📋 文書管理情報</h3>
                <ul>
                  <li>
                    <strong>対象疾患：</strong> 頸原性頭痛（Cervicogenic Headache）
                  </li>
                  <li>
                    <strong>ICHD-3 コード：</strong> 11.2.1
                  </li>
                  <li>
                    <strong>準拠基準：</strong> ICHD-3（2018）／AAN・EHF エビデンスグレード
                  </li>
                  <li>
                    <strong>対象読者：</strong> 初学者〜臨床家・研究者
                  </li>
                  <li>
                    <strong>最終確認事項：</strong>{" "}
                    すべての臨床応用は資格を有する医療専門家の監督下で行うこと
                  </li>
                </ul>
              </div>
            </section>
          </AutoGlossary>
        </main>
      </div>

      {/* FOOTER */}
      <div className="footer">
        <strong>頸原性頭痛（Cervicogenic Headache: CEH）完全ガイド</strong> —
        国際標準エビデンス（ICHD-3 11.2.1）に基づくステップバイステップ解説
        <br />📅 作成年: 2026 | 次回レビュー推奨: ガイドライン更新時
        <br />
        ⚠️
        本資料は学術・教育・研究目的のみを対象としています。臨床への適用は必ず資格を持つ医療専門家の監督のもとで行ってください。
      </div>
    </div>
  );
}
