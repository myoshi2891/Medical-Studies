import type { Metadata } from "next";
import { Ext } from "@/components/Ext";
import MermaidDiagram from "@/components/MermaidDiagram";
import { MohAcuteUseDaysSidebar } from "@/components/treatment/MohAcuteUseDaysSidebar";
import "./moh-acute-use-days.css";

export const metadata: Metadata = {
  title: "頭痛急性期治療薬の「適正使用日数」とMOH予防｜Types of Headache",
  description:
    "国際頭痛分類（ICHD-3）と主要国際ガイドラインに基づき、急性期治療薬の適正使用日数・薬剤の使用過多による頭痛（MOH）の診断基準・予防の実践フレームワークを解説する医療教育ガイド。",
};

const MOH_MERMAID_THEME: Record<string, string> = {
  primaryColor: "#fdecea",
  primaryTextColor: "#b71c1c",
  primaryBorderColor: "#c62828",
  lineColor: "#757575",
  secondaryColor: "#fdecea",
  tertiaryColor: "#fff3e0",
  edgeLabelBackground: "#ffffff",
  fontSize: "13px",
};

export default function MohAcuteUseDaysPage() {
  return (
    <div className="moh-acute">
      {/* HERO */}
      <div className="hero">
        <div style={{ fontSize: 40 }}>💊</div>
        <h1>頭痛急性期治療薬の「適正使用日数」とMOH予防</h1>
        <p className="hero-sub">
          国際頭痛分類（ICHD-3）と主要国際ガイドラインに基づく実践フレームワーク
        </p>
        <div className="hero-tags">
          <span className="hero-tag">MOH予防</span>
          <span className="hero-tag">ICHD-3</span>
          <span className="hero-tag">急性期治療薬</span>
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
        <MohAcuteUseDaysSidebar />

        {/* MAIN CONTENT */}
        <main className="main">
          <div className="alert a-warn">
            <div className="alert-i">📘</div>
            <div>
              <strong>本ページは教育目的であり、個別の治療推奨ではありません。</strong>
              実際の薬剤選択・用量・用法・休薬方法は、必ず医師・薬剤師にご相談ください。本ページの内容だけで自己判断による服薬の開始・変更・中止を行わないでください。
            </div>
          </div>

          {/* ====================================================== SECTION 1 */}
          <section id="s1" className="sec">
            <div className="sec-hd">
              <div className="sec-num">1</div>
              <h2 className="sec-title">MOH（薬剤の使用過多による頭痛）とは何か</h2>
            </div>

            <h3>用語の整理</h3>
            <p>
              <strong>一次性頭痛</strong>
              ：片頭痛、緊張型頭痛、群発頭痛など、他の疾患が原因ではない頭痛そのものが本体である頭痛。
              <strong>二次性頭痛</strong>：他の疾患に起因する頭痛。
              <strong>MOH（Medication-Overuse Headache）</strong>
              ：もともと一次性頭痛（片頭痛・緊張型頭痛が多い）を持つ人が、急性期治療薬を長期間・頻回に使用し続けることで頭痛そのものが慢性化・増悪する二次性頭痛です。日本頭痛学会は誤解を避けるため「薬物乱用頭痛」から
              <strong>「薬剤の使用過多による頭痛」</strong>という訳語に変更しています。
              <span className="bB">エビデンス：国内学会解説</span>
            </p>

            <div className="alert a-info">
              <div className="alert-i">ℹ️</div>
              <div>
                薬に対する不安から早めに服薬したり、頭痛がないのに服薬することで薬の効果が弱まり、さらに頭痛が悪化するという悪循環に陥ることがあるとされています（出典：日本頭痛学会）。
              </div>
            </div>

            <div className="alert a-warn">
              <div className="alert-i">🚨</div>
              <div>
                <strong>本ページの範囲</strong>
                ：一次性頭痛に対する慢性的な急性期薬使用とMOHを対象としています。突然の激烈な頭痛・神経学的異常・50歳以降の新規発症頭痛などの危険な兆候（SNOOP4）がある場合は本ページの対象外であり、速やかな医療機関受診が必要です。
              </div>
            </div>

            <h3>ICHD-3（国際頭痛分類 第3版）の診断基準</h3>
            <p>
              MOHの定義は、国際頭痛学会（IHS）が策定する<strong>ICHD-3</strong>
              が国際的な一次情報です。基本構造は以下のA〜Cです。
            </p>

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
                    <td>既存の一次性頭痛を持つ患者において、月15日以上の頻度で頭痛が生じている</td>
                  </tr>
                  <tr>
                    <td>B</td>
                    <td>
                      急性期・対症的頭痛治療薬の1種類以上を3か月を超えて定期的に使用過多している（薬剤によって月10日以上、または月15日以上という閾値が異なる）
                    </td>
                  </tr>
                  <tr>
                    <td>C</td>
                    <td>他のICHD-3診断ではうまく説明できない</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="alert a-purple">
              <div className="alert-i">🎓</div>
              <div>
                ICHD-3の一般注釈には「各サブタイプで使用過多とされる薬剤使用日数は、正式なエビデンスというより専門家の合意に基づくものである」と明記されています。つまりこの日数閾値は
                <strong>絶対的な安全基準ではなく、専門家コンセンサスに基づく目安</strong>です。
                <span className="bC">専門家合意</span>
              </div>
            </div>

            <h3>薬効群別の使用日数の目安（ICHD-3 サブタイプ）</h3>
            <p>
              以下はICHD-3の各サブタイプが定義する「使用過多」とされる目安の使用日数です。
              <strong>これは治療上の許容量の指示ではなく、診断基準としての目安</strong>
              である点にご留意ください。
            </p>

            <div className="moh-grid">
              <div className="moh moh-h">
                <div className="moh-day tR">
                  10<span style={{ fontSize: 13 }}>日/月〜</span>
                </div>
                <div className="moh-unit">3か月超で継続</div>
                <div className="moh-drug">エルゴタミン製剤（8.2.1）</div>
              </div>
              <div className="moh moh-h">
                <div className="moh-day tR">
                  10<span style={{ fontSize: 13 }}>日/月〜</span>
                </div>
                <div className="moh-unit">3か月超で継続</div>
                <div className="moh-drug">トリプタン系薬剤（8.2.2）</div>
              </div>
              <div className="moh moh-m">
                <div className="moh-day tO">
                  15<span style={{ fontSize: 13 }}>日/月〜</span>
                </div>
                <div className="moh-unit">3か月超で継続</div>
                <div className="moh-drug">
                  非オピオイド系鎮痛薬（8.2.3）
                  <br />
                  <span style={{ fontWeight: 400, fontSize: 11 }}>
                    アセトアミノフェン・NSAIDs・アスピリン等
                  </span>
                </div>
              </div>
              <div className="moh moh-h">
                <div className="moh-day tR">
                  10<span style={{ fontSize: 13 }}>日/月〜</span>
                </div>
                <div className="moh-unit">3か月超で継続</div>
                <div className="moh-drug">オピオイド系薬剤（8.2.6）</div>
              </div>
              <div className="moh moh-h">
                <div className="moh-day tR">
                  10<span style={{ fontSize: 13 }}>日/月〜</span>
                </div>
                <div className="moh-unit">3か月超で継続</div>
                <div className="moh-drug">配合鎮痛薬（複数成分の合剤、8.2.5）</div>
              </div>
              <div className="moh moh-m">
                <div className="moh-day tO">
                  10<span style={{ fontSize: 13 }}>日/月〜（合計）</span>
                </div>
                <div className="moh-unit">3か月超で継続</div>
                <div className="moh-drug">
                  複数薬効群の組み合わせ使用（8.2.4）
                  <br />
                  <span style={{ fontWeight: 400, fontSize: 11 }}>
                    単剤としては過多でない場合を含む
                  </span>
                </div>
              </div>
            </div>

            <div className="mmd">
              <div className="mmd-lbl">フローチャート — ICHD-3診断ロジック（薬効群別）</div>
              <MermaidDiagram
                themeVariables={MOH_MERMAID_THEME}
                chart={`flowchart TD
A["急性期治療薬を\\n定期的に使用している"] --> B{"薬効群は？"}
B -->|"トリプタン／エルゴタミン／\\nオピオイド／配合鎮痛薬"| C{"月10日以上を\\n3か月超で使用？"}
B -->|"単純鎮痛薬\\n（アセトアミノフェン・NSAIDs等）"| D{"月15日以上を\\n3か月超で使用？"}
B -->|"複数薬効群を併用\\n（単剤では未達）"| E{"合計で月10日以上を\\n3か月超で使用？"}
C -->|"はい"| F["MOHの可能性を疑う基準に該当\\n（ICHD-3 8.2）"]
D -->|"はい"| F
E -->|"はい"| F
C -->|"いいえ"| G["現時点では\\n診断基準に該当しない"]
D -->|"いいえ"| G
E -->|"いいえ"| G
F --> H["医師・頭痛専門医への\\n相談を推奨"]`}
              />
            </div>

            <p style={{ fontSize: 12, color: "var(--g6)" }}>
              出典：ICHD-3「8.2 Medication-overuse headache (MOH)」、「8.2.3 Non-opioid
              analgesic-overuse
              headache」の規定（複数の非オピオイド鎮痛薬を併用する場合も単一薬効群として合算される）。原文は本ページ末尾の参考文献を参照。
            </p>
          </section>

          {/* ====================================================== SECTION 2 */}
          <section id="s2" className="sec">
            <div className="sec-hd">
              <div className="sec-num">2</div>
              <h2 className="sec-title">なぜ「日数」で管理するのか（根拠と機序）</h2>
            </div>

            <h3>疫学的根拠</h3>
            <p>
              MOHは一般人口の約1〜2%が罹患すると推定される、世界的に見られる病態であり、Global
              Burden of
              Diseaseの障害調整生存年（YLD）指標において18位にランクされるなど、公衆衛生上の負担が国際的に認識されています。
              <span className="bB">エビデンス：疫学研究・複数の横断研究（中等度）</span>
            </p>

            <h3>機序についての仮説（エビデンスの質を明示）</h3>
            <p>
              頭痛専門誌 <em>The Lancet Neurology</em>{" "}
              に掲載されたDienerらのレビューでは、ストレスや睡眠など内的・外的な出来事が脳内のストレス回路とκオピオイド受容体でのダイノルフィンシグナリングに作用し、下行性疼痛修飾経路の調節不全を促進するという「感作」の仮説が提示されています。
              <span className="bC">エビデンス：機序研究（基礎・神経画像研究中心）</span>
            </p>

            <div className="alert a-info">
              <div className="alert-i">🧠</div>
              <div>
                この機序モデルは主に基礎研究・神経画像研究に基づくものであり、
                <strong>個々の患者での臨床的因果関係を断定するものではありません</strong>。
              </div>
            </div>

            <h3>休薬（withdrawal）症状の持続期間 — 薬効群による違い</h3>
            <p>臨床研究では、休薬頭痛の持続期間には薬効群による違いが報告されています。</p>

            <div className="tbl">
              <table>
                <thead>
                  <tr>
                    <th>薬効群</th>
                    <th>休薬頭痛の持続期間の目安</th>
                    <th>エビデンス</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>トリプタン系薬剤</td>
                    <td>約4日</td>
                    <td>
                      <span className="bB">中等度</span>
                    </td>
                  </tr>
                  <tr>
                    <td>エルゴタミン製剤</td>
                    <td>約7日</td>
                    <td>
                      <span className="bB">中等度</span>
                    </td>
                  </tr>
                  <tr>
                    <td>単純鎮痛薬</td>
                    <td>約9.5日</td>
                    <td>
                      <span className="bB">中等度</span>
                    </td>
                  </tr>
                  <tr>
                    <td>オピオイド系薬剤</td>
                    <td>
                      2〜10日程度（通常4週間を超えない）。嘔気・嘔吐・頭痛・不安・落ち着きのなさ・睡眠障害・頻脈を伴うことがある
                    </td>
                    <td>
                      <span className="bB">中等度</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p style={{ fontSize: 12, color: "var(--g6)" }}>
              出典：デンマーク頭痛センターで実施されたランダム化比較試験に基づく報告（単施設または少数の対照試験）。
            </p>

            <div className="alert a-purple">
              <div className="alert-i">📌</div>
              <div>
                <strong>要点</strong>
                ：「なぜ10日・15日という数字なのか」に対する誠実な答えは、単一の決定的なRCTではなく、
                <strong>専門家コンセンサス＋疫学研究＋機序研究を組み合わせた総合的な判断</strong>
                である、という点です。ICHD-3自身がこれを「専門家の合意に基づく」と明記しています。
              </div>
            </div>
          </section>

          {/* ====================================================== SECTION 3 */}
          <section id="s3" className="sec">
            <div className="sec-hd">
              <div className="sec-num">3</div>
              <h2 className="sec-title">国際ガイドライン間の比較</h2>
            </div>

            <p>
              同じMOH／使用過多という概念について、各国際機関・学会の記述には共通点と若干の視点の違いがあります。以下は主要な一次情報の比較です。
            </p>

            <div className="tbl">
              <table>
                <thead>
                  <tr>
                    <th>ガイドライン／機関</th>
                    <th>使用日数の目安</th>
                    <th>特徴・視点</th>
                    <th>エビデンスの性質</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <strong>ICHD-3</strong>（国際頭痛学会）
                    </td>
                    <td>単純鎮痛薬：月15日以上／トリプタン等：月10日以上（3か月超）</td>
                    <td>診断基準としての閾値。MOHという二次性頭痛の診断名を定義するもの</td>
                    <td>
                      <span className="bC">専門家合意</span>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <strong>NICE</strong>（英国CG150）
                    </td>
                    <td>
                      トリプタン・オピオイド・エルゴタミン・配合鎮痛薬：月10日以上／単純鎮痛薬：単独もしくは併用で月15日以上（3か月以上）
                    </td>
                    <td>臨床現場向けの「気づきの基準」として提示</td>
                    <td>
                      <span className="bA">ガイドライン推奨</span>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <strong>米国頭痛学会（AHS）</strong>コンセンサス（2021）
                    </td>
                    <td>平均して週2日を目安に使用を抑える指導。超える場合は予防療法の提供を検討</td>
                    <td>
                      「月」ベースの閾値よりやや保守的な「週」単位の目安を予防療法導入のトリガーとして活用
                    </td>
                    <td>
                      <span className="bB">専門家コンセンサス</span>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <strong>欧州神経学会（EAN）</strong>MOH管理ガイドライン（2020）
                    </td>
                    <td>ICHD-3基準を踏襲しつつ治療アルゴリズムを提示</td>
                    <td>
                      休薬が長年MOH治療の第一段階として報告されるが、方法・長期効果に国際コンセンサスなし
                    </td>
                    <td>
                      <span className="bB">GRADE評価（項目により強度が異なる）</span>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <strong>米国内科学会（ACP）</strong>臨床ガイドライン（2025）
                    </td>
                    <td>NSAIDs：月15日以上／トリプタン：月10日以上</td>
                    <td>急性期片頭痛薬のネットワークメタ解析に基づく比較臨床ガイドライン</td>
                    <td>
                      <span className="bA">システマティックレビュー＋GRADE</span>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <strong>日本頭痛学会</strong>
                    </td>
                    <td>ICHD-3に準拠</td>
                    <td>
                      「薬剤の使用過多による頭痛」という訳語を採用。休薬後の改善率は約7割、再発率は約3割との説明
                    </td>
                    <td>
                      <span className="bB">国内ガイドライン・一般向け解説</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="mmd">
              <div className="mmd-lbl">フローチャート — 国際ガイドラインの共通認識</div>
              <MermaidDiagram
                themeVariables={MOH_MERMAID_THEME}
                chart={`flowchart LR
ICHD["ICHD-3\\n診断基準（月次閾値）"] --> Common["共通認識：\\n薬効群ごとに異なる\\n使用日数閾値が存在する"]
NICE["NICE CG150\\n臨床的気づきの基準"] --> Common
AHS["AHS consensus\\n週2日という\\n予防導入トリガー"] --> Common
EAN["EAN 2020\\n治療アルゴリズム"] --> Common
ACP["ACP 2025\\n比較臨床ガイドライン"] --> Common
JHS["日本頭痛学会\\n国内標準・患者説明"] --> Common`}
              />
            </div>

            <div className="alert a-info">
              <div className="alert-i">📌</div>
              <div>
                <strong>AHSの「週2日」とICHD-3の「月10日・15日」の違い</strong>
                ：週2日は月に換算すると概ね8〜9日相当であり、ICHD-3の診断閾値（10日・15日）よりもやや手前で「予防療法を検討すべきタイミング」として提示されています。これは診断基準と予防的介入トリガーという
                <strong>目的の違い</strong>
                によるものであり、どちらかが誤りというわけではありません。
              </div>
            </div>
          </section>

          {/* ====================================================== SECTION 4 */}
          <section id="s4" className="sec">
            <div className="sec-hd">
              <div className="sec-num">4</div>
              <h2 className="sec-title">MOH予防の実践フレームワーク（ステップバイステップ）</h2>
            </div>

            <div className="alert a-warn">
              <div className="alert-i">⚠️</div>
              <div>
                以下は国際的なエビデンスを踏まえた<strong>一般的な考え方の枠組み</strong>
                です。個々の対応は必ず医師・薬剤師と相談のうえで決定してください。
              </div>
            </div>

            <div className="mmd">
              <div className="mmd-lbl">フローチャート — 予防の5ステップ</div>
              <MermaidDiagram
                themeVariables={MOH_MERMAID_THEME}
                chart={`flowchart LR
A["Step 1\\n頭痛日誌の記録"] --> B["Step 2\\n月間使用日数の\\nセルフモニタリング"]
B --> C["Step 3\\n閾値に近づいたら\\n医療者へ相談"]
C --> D["Step 4\\n予防療法の要否を\\n一般名レベルで検討"]
D --> E["Step 5\\n定期フォローアップ\\nと再評価"]
E -.->|"経過観察を継続"| B`}
              />
            </div>

            <h3>Step 1：頭痛日誌をつける</h3>
            <p>
              頭痛の頻度・強度・使用した薬（成分名ベースで）・使用日を記録します。NICEやAHSを含む多くのガイドラインが、月経関連片頭痛の診断や治療評価においても少なくとも2周期分の頭痛日誌の活用を推奨しているなど、日誌は国際的に共通して重視される基本ツールです。
            </p>

            <h3>Step 2：月間使用日数のセルフモニタリング</h3>
            <p>
              Step 1の日誌を用いて、薬効群ごとに「月に何日使用したか」を数えます。ここで重要なのは、
              <strong>
                同じ薬効群に分類される複数の薬剤を併用している場合、ICHD-3では合算してカウントする
              </strong>
              という点です（8.2.3の規定：複数の非オピオイド鎮痛薬を使用していても、個々の薬剤ではなく単一の薬効群として合算して評価される）。
            </p>

            <h3>Step 3：閾値に近づいたら医療者へ相談</h3>
            <p>
              前掲の目安（トリプタン等は月10日、単純鎮痛薬は月15日、AHSの目安では週2日）に近づいてきた場合、自己判断で薬の種類や量を調整するのではなく、医師・薬剤師に相談することが一般的に推奨されています。AHSコンセンサスステートメントでは、この目安を超える患者には予防療法の提供を検討すべきとされています。
            </p>

            <h3>Step 4：予防療法の検討（一般名・薬効群レベルの一般論）</h3>
            <p>
              具体的な処方は医師の判断によりますが、一般に予防療法として検討される薬効群には以下のようなものがあります。
              <strong>
                本ページはどの薬剤が最適かを判断するものではなく、選択と用量は医師にご相談ください。
              </strong>
            </p>

            <div className="drug-grid">
              <div className="drug">
                <div className="drug-nm">抗てんかん薬</div>
                <div className="drug-br">
                  例：バルプロ酸系、トピラマート系（国内承認状況は薬剤ごとに異なる）
                </div>
                <div className="drug-tx">
                  片頭痛の予防目的で古くから用いられてきた薬効群の一つ{" "}
                  <span className="bB">中等度〜有効性が示されている</span>
                </div>
              </div>
              <div className="drug">
                <div className="drug-nm">β遮断薬</div>
                <div className="drug-br" />
                <div className="drug-tx">
                  片頭痛予防で伝統的に用いられる薬効群 <span className="bB">中等度</span>
                </div>
              </div>
              <div className="drug">
                <div className="drug-nm">三環系抗うつ薬</div>
                <div className="drug-br" />
                <div className="drug-tx">
                  有効性がプラセボ対照試験で明確には示されていないとの指摘もある{" "}
                  <span className="bC">限定的</span>
                </div>
              </div>
              <div className="drug">
                <div className="drug-nm">ボツリヌス毒素製剤</div>
                <div className="drug-br" />
                <div className="drug-tx">
                  慢性片頭痛かつ複数の予防療法が奏効しない場合などに検討される選択肢の一つ{" "}
                  <span className="bA">有効性が示されている</span>
                </div>
              </div>
              <div className="drug">
                <div className="drug-nm">抗CGRP関連薬剤</div>
                <div className="drug-br">モノクローナル抗体・受容体拮抗薬</div>
                <div className="drug-tx">
                  比較的新しい薬効群。MOHを合併する患者を対象とした研究も進行中{" "}
                  <span className="bB">中等度〜示唆されている</span>
                </div>
              </div>
            </div>

            <h3>Step 5：定期フォローアップと再評価</h3>
            <p>
              予防療法を開始した場合も、休薬・減薬を行った場合も、一定期間後に頭痛頻度・使用日数を再評価することが一般的です。欧州のガイドラインでは休薬（overuseの中止）がMOH治療の出発点として長年推奨されてきた一方で、その具体的な実施方法や長期的効果については
              <strong>国際的なコンセンサスが確立していない</strong>
              とされており、対応は医療機関ごとに個別性があります。
            </p>

            <div className="mmd">
              <div className="mmd-lbl">フローチャート — MOH疑い後の対応の全体像</div>
              <MermaidDiagram
                themeVariables={MOH_MERMAID_THEME}
                chart={`flowchart TD
Diag["MOHの診断基準に\\n該当する可能性"] --> Edu["患者教育\\n（使用過多の説明）"]
Diag --> Consult["医師・頭痛専門医への相談"]
Consult --> Path1["休薬方針の検討\\n（医療者の管理下）"]
Consult --> Path2["予防療法の並行検討"]
Path1 --> Note1["エビデンス：欧州各国で\\n推奨されるが方法論に\\n国際的コンセンサスなし"]
Path2 --> Note2["エビデンス：\\n薬効群により異なる"]
Note1 --> FollowUp["定期フォローアップ"]
Note2 --> FollowUp`}
              />
            </div>
          </section>

          {/* ====================================================== SECTION 5 */}
          <section id="s5" className="sec">
            <div className="sec-hd">
              <div className="sec-num">5</div>
              <h2 className="sec-title">
                新しい薬剤クラスの位置づけ（ゲパント等）— 未承認・適応外情報の扱い
              </h2>
            </div>

            <p>
              比較的新しい薬効群である<strong>CGRP受容体拮抗薬（いわゆる「ゲパント」）</strong>
              について、MOHとの関連が近年議論されています。
            </p>

            <div className="alert a-info">
              <div className="alert-i">📄</div>
              <div>
                米国頭痛学会のコンセンサスステートメントでは、新しい薬剤のうちCGRP受容体拮抗薬（ウブロゲパント、リメゲパントなど）を反復投与しても薬剤の使用過多による頭痛とは関連しないようであると述べられていますが、同時に、ラスミジタンの反復使用については前臨床モデルにおいて持続的な末梢・中枢感作を介してMOHを誘発しうることが示唆される一方、臨床研究は不足していると明記されています。
                <span className="bU">新しい薬効群・データ蓄積中</span>
              </div>
            </div>

            <h3>国内承認状況について（本ページ執筆時点：2026年7月の情報）</h3>
            <p>
              ゲパント系薬剤や一部の抗CGRP抗体を含め、薬剤ごとに日本国内での承認適応（発症抑制／急性期治療のいずれか、または両方）や承認時期は異なり、かつ承認状況は継続的に変化しています。
            </p>

            <div className="tbl">
              <table>
                <thead>
                  <tr>
                    <th>成分名（一般名）</th>
                    <th>本ページ執筆時点の国内承認状況</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>リメゲパント</td>
                    <td>2025年9月に承認（発症抑制・急性期治療の両方の適応で承認）</td>
                  </tr>
                  <tr>
                    <td>アトゲパント</td>
                    <td>
                      2026年に発症抑制（予防）目的で承認・発売。急性期治療の適応は本ページ執筆時点で確認できていない
                    </td>
                  </tr>
                  <tr>
                    <td>ウブロゲパント／ザベゲパント</td>
                    <td>本ページ執筆時点（2026年7月）で国内未承認</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="alert a-danger">
              <div className="alert-i">🚫</div>
              <div>
                <strong>
                  国内未承認の薬剤・適応外使用について、有効性や安全性を保証する記載はできません。
                </strong>
                本ページは特定の商品名を推奨するものではなく、個々の薬剤が現時点で国内のどの適応について承認されているかは、必ずPMDAの添付文書情報、または医師・薬剤師にご確認ください。承認状況は変わりうるため、上表はあくまで執筆時点のスナップショットです。
              </div>
            </div>
          </section>

          {/* ====================================================== SECTION 6 */}
          <section id="s6" className="sec">
            <div className="sec-hd">
              <div className="sec-num">6</div>
              <h2 className="sec-title">本ページにおけるエビデンスグレーディングの考え方</h2>
            </div>

            <p>
              本ページでは、GRADE（Grading of Recommendations, Assessment, Development and
              Evaluation）の考え方を参考にしつつ、一般読者にもわかりやすいよう以下の4段階の相対表現に統一しています。
            </p>

            <div className="tbl">
              <table>
                <thead>
                  <tr>
                    <th>バッジ</th>
                    <th>本ページでの表記</th>
                    <th>おおよその対応</th>
                    <th>本文中の言い回し例</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <span className="bA">bA</span>
                    </td>
                    <td>強い・十分なエビデンス</td>
                    <td>複数の質の高いRCT・システマティックレビューによる支持</td>
                    <td>「有効性が示されている」</td>
                  </tr>
                  <tr>
                    <td>
                      <span className="bB">bB</span>
                    </td>
                    <td>中等度のエビデンス</td>
                    <td>一定数の対照試験や大規模観察研究による支持</td>
                    <td>「有効性が示唆されている」</td>
                  </tr>
                  <tr>
                    <td>
                      <span className="bC">bC</span>
                    </td>
                    <td>限定的・専門家合意</td>
                    <td>少数の試験、専門家コンセンサス、機序研究が中心</td>
                    <td>「経験的に用いられている」「専門家の合意に基づく」</td>
                  </tr>
                  <tr>
                    <td>
                      <span className="bU">bU</span>
                    </td>
                    <td>新しい・不確実</td>
                    <td>前臨床データ中心、臨床データが少数・進行中</td>
                    <td>「データ蓄積中」「限定的」</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="alert a-purple">
              <div className="alert-i">🎓</div>
              <div>
                ICHD-3自身も、MOHの使用過多とされる各薬剤の日数閾値について「正式なエビデンスというよりも専門家の意見に基づく」と明記しており、本ページ全体を通じて、確立された合意事項と、現在も議論が続いている論点（休薬方法の最適化、新薬効群のMOHリスクなど）を区別して記載するよう努めています。
              </div>
            </div>
          </section>

          {/* ====================================================== SECTION 7 */}
          <section id="s7" className="sec">
            <div className="sec-hd">
              <div className="sec-num">7</div>
              <h2 className="sec-title">よくある誤解（Q&amp;A）</h2>
            </div>

            <div className="card">
              <h4>Q. 「月に10日以上薬を使ったら即座に危険」という意味ですか？</h4>
              <p>
                A.
                いいえ。ICHD-3の閾値は「3か月を超えて」「定期的に」使用した場合の診断基準であり、単月の使用日数だけで判断するものではありません。また、この日数閾値自体が専門家の合意に基づくものであり、絶対的な安全域を示す数値ではありません。ご自身の状況については医師にご相談ください。
                <span className="bC">専門家合意</span>
              </p>
            </div>

            <div className="card">
              <h4>Q. 薬をやめればMOHは必ず治りますか？</h4>
              <p>
                A.
                日本頭痛学会の説明では、乱用薬をやめることで頭痛が治る方が約7割、再発する方が約3割とされています。効果には個人差があり、100%の治癒を保証するものではありません。
                <span className="bB">中等度のエビデンス</span>
              </p>
            </div>

            <div className="card">
              <h4>Q. 新しい薬（ゲパントなど）ならMOHの心配はいらないのですか？</h4>
              <p>
                A.
                一部の研究でMOHとの関連が少ない可能性が示唆されていますが、薬剤によってはデータが限定的なものもあります。断定はできず、今後のデータ蓄積が必要な段階です。
                <span className="bU">データ蓄積中</span>
              </p>
            </div>
          </section>

          {/* ====================================================== SECTION 8 */}
          <section id="s8" className="sec">
            <div className="sec-hd">
              <div className="sec-num">8</div>
              <h2 className="sec-title">まとめ・チェックリスト</h2>
            </div>

            <div className="qr-grid">
              <div className="qr">
                <div className="qr-t">✅ セルフチェック</div>
                <ul>
                  <li>頭痛日誌をつけ、薬効群ごとの月間使用日数を記録している</li>
                  <li>
                    ICHD-3の目安（トリプタン等は月10日、単純鎮痛薬は月15日）と、AHSの目安（週2日）の違いを理解している
                  </li>
                  <li>
                    同じ薬効群の薬剤を複数併用している場合、合算してカウントする必要があることを理解している
                  </li>
                </ul>
              </div>
              <div className="qr">
                <div className="qr-t">✅ 医療機関との連携</div>
                <ul>
                  <li>閾値に近づいたら自己判断で薬を調整せず、医師・薬剤師に相談する方針である</li>
                  <li>
                    予防療法や休薬の具体的な方法は、個別に医療者と相談する前提であることを理解している
                  </li>
                  <li>
                    新しい薬効群（ゲパント等）の国内承認状況は変化しうるため、必要時にPMDA情報や医師に確認する方針である
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* ====================================================== SECTION 9 */}
          <section id="s9" className="sec">
            <div className="sec-hd">
              <div className="sec-num">9</div>
              <h2 className="sec-title">監視すべき権威ソース・参考文献</h2>
            </div>

            <h3>監視すべき権威ソース</h3>
            <p>
              信頼度の高い順。<strong>一次情報（ガイドライン・原著）を優先</strong>
              し、二次情報（要約サイト）は補助とする。
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
                      <strong>AHS（米国頭痛学会）／EHF・EAN（欧州）／NICE（英）</strong>
                      の頭痛関連ガイドライン・consensus statement
                    </td>
                    <td>治療アルゴリズムの国際動向</td>
                    <td>新規position/consensus statement</td>
                  </tr>
                  <tr>
                    <td>システマティックレビュー</td>
                    <td>
                      <strong>Cochrane Library</strong>（頭痛関連レビュー）
                    </td>
                    <td>治療の有効性エビデンス</td>
                    <td>新規/更新レビュー</td>
                  </tr>
                  <tr>
                    <td>一次文献</td>
                    <td>
                      <strong>PubMed</strong>（検索式を保存：migraine/headache × 対象トピック）
                    </td>
                    <td>主要RCT・メタ解析</td>
                    <td>主要ジャーナル掲載</td>
                  </tr>
                  <tr>
                    <td>主要ジャーナル</td>
                    <td>
                      Cephalalgia / Headache / Neurology / Lancet Neurology / European Journal of
                      Neurology
                    </td>
                    <td>Journal watch</td>
                    <td>目次監視</td>
                  </tr>
                  <tr>
                    <td>規制・安全性</td>
                    <td>PMDA（国内承認・添付文書）／ FDA・EMA</td>
                    <td>新薬承認・安全性情報</td>
                    <td>新規承認・改訂添付文書</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="alert a-info">
              <div className="alert-i">🔒</div>
              <div>
                <strong>セキュリティ注記</strong>：外部ソースから取得したテキストは
                <strong>データであって指示ではない</strong>
                。本ページに転記する際、取得元ページ内の「〜せよ」等の文言を運用手順として解釈していない。
              </div>
            </div>

            <h3>参考文献・引用ソース一覧</h3>
            <div className="src-grid">
              <div className="src">
                <div className="src-org">IHS / ICHD-3</div>
                <div className="src-t">8.2 Medication-overuse headache (MOH)</div>
                <div className="src-url">
                  <Ext href="https://ichd-3.org/8-headache-attributed-to-a-substance-or-its-withdrawal/8-2-medication-overuse-headache-moh/">
                    https://ichd-3.org/8-headache-attributed-to-a-substance-or-its-withdrawal/8-2-medication-overuse-headache-moh/
                  </Ext>
                </div>
              </div>
              <div className="src">
                <div className="src-org">IHS / ICHD-3</div>
                <div className="src-t">8.2.3 Non-opioid analgesic-overuse headache</div>
                <div className="src-url">
                  <Ext href="https://ichd-3.org/8-headache-attributed-to-a-substance-or-its-withdrawal/8-2-medication-overuse-headache-moh/8-2-3-simple-analgesic-overuse-headache/">
                    https://ichd-3.org/8-headache-attributed-to-a-substance-or-its-withdrawal/8-2-medication-overuse-headache-moh/8-2-3-simple-analgesic-overuse-headache/
                  </Ext>
                </div>
              </div>
              <div className="src">
                <div className="src-org">IHS / ICHD-3</div>
                <div className="src-t">8.2.2 Triptan-overuse headache</div>
                <div className="src-url">
                  <Ext href="https://ichd-3.org/8-headache-attributed-to-a-substance-or-its-withdrawal/8-2-medication-overuse-headache-moh/8-2-2-triptan-overuse-headache/">
                    https://ichd-3.org/8-headache-attributed-to-a-substance-or-its-withdrawal/8-2-medication-overuse-headache-moh/8-2-2-triptan-overuse-headache/
                  </Ext>
                </div>
              </div>
              <div className="src">
                <div className="src-org">NICE</div>
                <div className="src-t">CG150 — Headaches in over 12s: diagnosis and management</div>
                <div className="src-url">
                  <Ext href="https://www.nice.org.uk/guidance/cg150/chapter/recommendations">
                    https://www.nice.org.uk/guidance/cg150/chapter/recommendations
                  </Ext>
                </div>
              </div>
              <div className="src">
                <div className="src-org">AHS / Headache</div>
                <div className="src-t">
                  Ailani J, et al. American Headache Society Consensus Statement (2021)
                </div>
                <div className="src-url">
                  <Ext href="https://headachejournal.onlinelibrary.wiley.com/doi/10.1111/head.14153">
                    https://headachejournal.onlinelibrary.wiley.com/doi/10.1111/head.14153
                  </Ext>
                </div>
              </div>
              <div className="src">
                <div className="src-org">EAN / Eur J Neurol</div>
                <div className="src-t">
                  Diener HC, et al. EAN guideline on management of MOH (2020)
                </div>
                <div className="src-url">
                  <Ext href="https://onlinelibrary.wiley.com/doi/10.1111/ene.14268">
                    https://onlinelibrary.wiley.com/doi/10.1111/ene.14268
                  </Ext>
                </div>
              </div>
              <div className="src">
                <div className="src-org">Lancet Neurology</div>
                <div className="src-t">
                  Diener HC, et al. Pathophysiology, prevention, and treatment of MOH (2019)
                </div>
                <div className="src-url">
                  <Ext href="https://doi.org/10.1016/S1474-4422(19)30146-2">
                    https://doi.org/10.1016/S1474-4422(19)30146-2
                  </Ext>
                </div>
              </div>
              <div className="src">
                <div className="src-org">ACP / Ann Intern Med</div>
                <div className="src-t">
                  Pharmacologic Treatments of Acute Episodic Migraine Headache (2025)
                </div>
                <div className="src-url">
                  <Ext href="https://www.acpjournals.org/doi/10.7326/ANNALS-24-03095">
                    https://www.acpjournals.org/doi/10.7326/ANNALS-24-03095
                  </Ext>
                </div>
              </div>
              <div className="src">
                <div className="src-org">Nature Reviews Disease Primers</div>
                <div className="src-t">
                  Ashina S, Terwindt GM, Steiner TJ, et al. Medication overuse headache (2023)
                </div>
                <div className="src-url">
                  <Ext href="https://www.nature.com/articles/s41572-022-00415-0">
                    https://www.nature.com/articles/s41572-022-00415-0
                  </Ext>
                </div>
              </div>
              <div className="src">
                <div className="src-org">日本頭痛学会</div>
                <div className="src-t">「薬剤の使用過多による頭痛」一般向け解説</div>
                <div className="src-url">
                  <Ext href="https://www.jhsnet.net/ippan_zutu_kaisetu_05.html">
                    https://www.jhsnet.net/ippan_zutu_kaisetu_05.html
                  </Ext>
                </div>
              </div>
              <div className="src">
                <div className="src-org">日本頭痛学会</div>
                <div className="src-t">頭痛ガイドライン 一覧ページ</div>
                <div className="src-url">
                  <Ext href="https://www.jhsnet.net/guideline.html">
                    https://www.jhsnet.net/guideline.html
                  </Ext>
                </div>
              </div>
              <div className="src">
                <div className="src-org">NCBI Bookshelf</div>
                <div className="src-t">
                  Fischer MA, Jan A. Medication-Overuse Headache. StatPearls
                </div>
                <div className="src-url">
                  <Ext href="https://www.ncbi.nlm.nih.gov/books/NBK538150/">
                    https://www.ncbi.nlm.nih.gov/books/NBK538150/
                  </Ext>
                </div>
              </div>
              <div className="src">
                <div className="src-org">Front Pain Res</div>
                <div className="src-t">
                  Kebede YT, et al. Medication overuse headache: review of evidence and management
                  (2023)
                </div>
                <div className="src-url">
                  <Ext href="https://pmc.ncbi.nlm.nih.gov/articles/PMC10442656/">
                    https://pmc.ncbi.nlm.nih.gov/articles/PMC10442656/
                  </Ext>
                </div>
              </div>
              <div className="src">
                <div className="src-org">Front Pain Res</div>
                <div className="src-t">
                  Krymchantowski A, et al. Medication-overuse headache — review of treatment
                  strategies (2023)
                </div>
                <div className="src-url">
                  <Ext href="https://pmc.ncbi.nlm.nih.gov/articles/PMC10597723/">
                    https://pmc.ncbi.nlm.nih.gov/articles/PMC10597723/
                  </Ext>
                </div>
              </div>
              <div className="src">
                <div className="src-org">PMDA</div>
                <div className="src-t">
                  独立行政法人 医薬品医療機器総合機構（承認情報・添付文書）
                </div>
                <div className="src-url">
                  <Ext href="https://www.pmda.go.jp/">https://www.pmda.go.jp/</Ext>
                </div>
              </div>
            </div>
          </section>

          {/* FOOTER */}
          <footer className="footer">
            <strong>Types of Headache — 医療教育コンテンツ</strong>
            <br />
            本ページはICHD-3・国際ガイドラインに基づく学術・教育目的の情報整理です。個別の治療推奨・診断・処方ではありません。
          </footer>
        </main>
      </div>
    </div>
  );
}
