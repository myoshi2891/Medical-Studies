import type { Metadata } from "next";
import { Ext } from "@/components/Ext";
import MermaidDiagram from "@/components/MermaidDiagram";
import { MigrainePreventionSidebar } from "@/components/treatment/MigrainePreventionSidebar";
import "./migraine-prevention-therapy-guide.css";

export const metadata: Metadata = {
  title: "片頭痛予防治療ガイド｜適応判断・薬効群・効果発現期間・継続と中止",
  description:
    "片頭痛予防治療の適応判断、従来予防薬（β遮断薬、Ca拮抗薬、抗てんかん薬、抗うつ薬）の薬効群・効果発現期間・継続/中止の一般原則に関する医療教育ガイド。",
};

const MERMAID_THEME: Record<string, string> = {
  primaryColor: "#0d47a1",
  primaryTextColor: "#ffffff",
  primaryBorderColor: "#00695c",
  lineColor: "#00695c",
  secondaryColor: "#e0f2f1",
  tertiaryColor: "#e8f5e9",
  edgeLabelBackground: "#ffffff",
  textColor: "#212121",
  titleColor: "#212121",
  fontSize: "13px",
};

/**
 * Presents an educational guide to migraine preventive therapy, including treatment eligibility, medication classes, expected onset, and general continuation and discontinuation principles.
 */
export default function MigrainePreventionTherapyGuidePage() {
  return (
    <div className="migraine-prevention">
      {/* HERO */}
      <div className="hero">
        <div style={{ fontSize: 34 }}>🛡️</div>
        <h1>片頭痛予防治療ガイド</h1>
        <p className="hero-sub">適応判断・従来予防薬の薬効群・効果発現期間・継続/中止の一般原則</p>
        <div className="hero-tags">
          <span className="hero-tag">ICHD-3</span>
          <span className="hero-tag">AAN・AHS</span>
          <span className="hero-tag">EHF（GRADE）</span>
          <span className="hero-tag">NICE</span>
          <span className="hero-tag">教育目的・個別治療推奨ではありません</span>
        </div>
      </div>

      {/* DISCLAIMER */}
      <div className="disclaimer">
        <strong>⚠️ Academic Disclaimer（学術免責事項）</strong>　本ページは
        <strong>学術・教育・研究目的のみ</strong>
        を対象とした一般的な医学情報の整理であり、
        <strong>個別の患者に対する治療推奨・処方指示ではありません</strong>
        。すべての内容は資格を持つ医療専門家による臨床適用前のレビューが必要です。
        <div className="d-line">
          診断・治療方針の決定は、必ず医師・薬剤師にご相談ください。本ページの記述は、国際的に認知されたガイドライン・システマティックレビュー・規制当局情報に基づく要約であり、特定の医薬品の効果・安全性を保証するものではなく、特定商品名の優劣を主張するものでもありません。
        </div>
      </div>

      {/* LAYOUT */}
      <div className="layout">
        <MigrainePreventionSidebar />

        {/* MAIN CONTENT */}
        <main className="main">
          {/* TOP NOTICE */}
          <div className="alert a-warn" id="overview-notice">
            <div className="alert-i">🎓</div>
            <div>
              <strong>本ページは教育目的の一般情報整理です。個別の治療推奨ではありません。</strong>
              <br />
              掲載内容は初学者（医療従事者・研究目的の学習者を想定）向けに、国際的に認知された一次情報を要約したものです。実際の治療方針・薬剤選択は、必ず医師・薬剤師にご相談ください。
            </div>
          </div>

          {/* OVERVIEW CARD */}
          <section id="overview" className="sec">
            <div className="card">
              <h2 className="sec-title" style={{ marginTop: 0 }}>
                この文書の位置づけ
              </h2>
              <div className="tbl">
                <table>
                  <thead>
                    <tr>
                      <th style={{ width: 160 }}>項目</th>
                      <th>内容</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>対象読者</td>
                      <td>頭痛医学を学び始めた初学者（医療従事者・研究目的の学習者を想定）</td>
                    </tr>
                    <tr>
                      <td>目的</td>
                      <td>
                        片頭痛予防治療の「適応判断」「薬効群の全体像」「効果発現までの期間」「継続・中止の一般原則」を、国際的に認知された一次情報に基づき整理する
                      </td>
                    </tr>
                    <tr>
                      <td>スコープ外</td>
                      <td>
                        個別処方（用量・用法・薬剤選択の最終判断）、CGRP関連新規薬剤の詳細（本ガイドでは位置づけのみ言及）、急性期治療
                      </td>
                    </tr>
                    <tr>
                      <td>遵守事項</td>
                      <td>
                        薬機法・医療広告ガイドラインに配慮し、一般名（成分名）表記を基本とし、効果は相対表現（有効性が示されている／限定的等）に留める
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          {/* SECTION 1 */}
          <section id="s1" className="sec">
            <div className="sec-hd">
              <div className="sec-num">1</div>
              <h2 className="sec-title">頭痛分類の基礎（ICHD-3）</h2>
            </div>

            <p>
              予防治療の適応を考えるうえでの出発点は、
              <strong>国際頭痛分類第3版（ICHD-3, 国際頭痛学会（IHS）策定）</strong>
              による診断確定です。予防治療の議論は「片頭痛」という診断が確定していることを前提とします。
            </p>

            <div className="mmd">
              <div className="mmd-lbl">頭痛の分類階層（ICHD-3）</div>
              <MermaidDiagram
                themeVariables={MERMAID_THEME}
                chart={`graph TD
    A[頭痛 Headache] --> B["一次性頭痛\\nPrimary Headache Disorders"]
    A --> C["二次性頭痛\\nSecondary Headache Disorders\\n器質的疾患に伴う頭痛"]
    B --> D["片頭痛\\nMigraine"]
    B --> E["緊張型頭痛\\nTension-Type Headache"]
    B --> F["三叉神経・自律神経性頭痛\\n群発頭痛など"]
    D --> G["前兆のない片頭痛\\nMigraine without Aura"]
    D --> H["前兆のある片頭痛\\nMigraine with Aura"]
    D --> I["慢性片頭痛\\nChronic Migraine"]
    I --> J["月15日以上の頭痛日数が3か月以上持続し\\nうち8日以上が片頭痛様の頭痛"]`}
              />
            </div>

            <h3>重要な区別：エピソード性片頭痛 vs 慢性片頭痛</h3>
            <div className="tbl">
              <table>
                <thead>
                  <tr>
                    <th>分類</th>
                    <th>ICHD-3上の目安</th>
                    <th>予防治療の議論での位置づけ</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>エピソード性片頭痛（EM）</td>
                    <td>月間頭痛日数が1〜14日</td>
                    <td>頻度・QOL障害の程度に応じて予防治療を検討</td>
                  </tr>
                  <tr>
                    <td>高頻度エピソード性片頭痛（HFEM）</td>
                    <td>月間頭痛日数が8〜14日</td>
                    <td>予防治療の適応が支持されやすい層として言及されることが多い</td>
                  </tr>
                  <tr>
                    <td>慢性片頭痛（CM）</td>
                    <td>月15日以上の頭痛が3か月超持続し、うち8日以上が片頭痛の性質を満たす</td>
                    <td>予防治療の適応がより強く支持される</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="alert a-info">
              <div className="alert-i">📖</div>
              <div>
                診断基準の一次情報：
                <Ext href="https://ichd-3.org/">国際頭痛学会（IHS）ICHD-3公式サイト</Ext>
              </div>
            </div>
          </section>

          {/* SECTION 2 */}
          <section id="s2" className="sec">
            <div className="sec-hd">
              <div className="sec-num">2</div>
              <h2 className="sec-title">予防治療の適応判断</h2>
            </div>

            <h3>2.1　「いつ予防治療を検討するか」の一般的な考え方</h3>
            <p>
              国際的なガイドライン・臨床試験の組み入れ基準を横断すると、予防治療の適応は主に次の3軸で議論されます。
            </p>
            <ol>
              <li>
                <strong>頭痛頻度</strong>：月間の頭痛日数・片頭痛日数
              </li>
              <li>
                <strong>QOL障害・生活支障の程度</strong>：急性期治療で十分にコントロールできない障害の有無
              </li>
              <li>
                <strong>薬物乱用頭痛（MOH）のリスク</strong>：急性期治療薬の使用頻度が高すぎないか
              </li>
            </ol>
            <p>
              米国内科学会（ACP）はエピソード性片頭痛を「月1〜14日の頭痛日数」と定義した上で薬物予防治療のガイドラインを発行しており、これは臨床試験の組み入れ基準（多くのRCTが月4日以上の片頭痛日数を組み入れ条件とする）とも整合しています。カナダ頭痛学会の最新の予防治療ガイドラインでは、高頻度エピソード性片頭痛（月8日以上、ただし頭痛日数15日未満）で中等度以上の障害がある患者、および慢性片頭痛の患者を、より積極的に予防治療の対象とすべき集団として位置づけています。
            </p>

            <div className="mmd">
              <div className="mmd-lbl">予防治療の適応を検討する判断の流れ</div>
              <MermaidDiagram
                themeVariables={MERMAID_THEME}
                chart={`flowchart TD
    Start[片頭痛の診断が確定している] --> Q1{"月間の頭痛日数\\nQOL障害の程度は"}
    Q1 -->|頭痛日数が少なく\\n生活支障も軽度| Obs["急性期治療の最適化・\\n非薬物療法を優先し経過観察"]
    Q1 -->|頻度が高い\\nまたは生活支障が大きい| Q2{"急性期治療薬の\\n使用頻度は"}
    Q2 -->|月10〜15日以上\\n使用している| MOH["薬物乱用頭痛のリスク評価を優先\\n医師に相談"]
    Q2 -->|使用頻度は\\n問題となる範囲ではない| Q3{"頭痛の\\nパターンは"}
    Q3 -->|エピソード性\\n高頻度の傾向あり| Prevent1["予防治療の適応を\\n医師と相談"]
    Q3 -->|慢性片頭痛の\\n基準に該当| Prevent2["予防治療の適応が\\nより強く支持される"]
    Prevent1 --> Consult["医師・薬剤師に相談し\\n薬効群を選択"]
    Prevent2 --> Consult`}
              />
            </div>

            <h3>2.2　適応判断に関する国際的な目安の比較</h3>
            <div className="tbl th-teal">
              <table>
                <thead>
                  <tr>
                    <th>ソース</th>
                    <th>予防治療を検討する目安（要旨）</th>
                    <th>特記事項</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>ACP（米国内科学会）臨床ガイドライン</td>
                    <td>エピソード性片頭痛（月1〜14日）の成人を対象とした予防薬物治療のガイドライン</td>
                    <td>頻度そのものより、患者の希望・QOL障害を重視する枠組み</td>
                  </tr>
                  <tr>
                    <td>Canadian Headache Society（2024年改訂）</td>
                    <td>高頻度エピソード性片頭痛（月8日以上、頭痛日数15日未満）で中等度以上の障害、および慢性片頭痛</td>
                    <td>障害の程度（disability）を明示的な判断軸としている</td>
                  </tr>
                  <tr>
                    <td>NICE（英国）CG150</td>
                    <td>
                      頭痛日記による評価を前提に、頭痛頻度・QOLへの影響を踏まえて予防薬（一般名でプロプラノロール・トピラマート・アミトリプチリン等）を検討
                    </td>
                    <td>HIT-6等の指標を用いたQOL評価を推奨</td>
                  </tr>
                  <tr>
                    <td>小児・青年期（AAN/AHS 実践ガイドライン）</td>
                    <td>月4日以上の頭痛頻度、またはPedMIDAS等の機能障害尺度で中等度以上の障害</td>
                    <td>成人基準をそのまま外挿しない旨が明記されている</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="alert a-warn">
              <div className="alert-i">⚠️</div>
              <div>
                <strong>重要</strong>
                ：これらは臨床試験・ガイドラインにおける「目安」であり、個々の患者に予防治療を開始するか否かは、併存疾患・薬物相互作用・妊娠可能性・患者の価値観を踏まえて医師が総合的に判断します。本ガイドはその判断枠組みを理解するための教育情報です。
              </div>
            </div>
          </section>

          {/* SECTION 3 */}
          <section id="s3" className="sec">
            <div className="sec-hd">
              <div className="sec-num">3</div>
              <h2 className="sec-title">従来予防薬の薬効群 全体像</h2>
            </div>

            <p>
              以下は、米国頭痛学会・米国神経学会（AHS/AAN）2012年版エビデンスに基づくガイドライン、および欧州頭痛連合（EHF）による2023年の系統的再評価（GRADEアプローチ）で扱われている、
              <strong>従来から用いられる4つの薬効群</strong>の全体像です。
            </p>

            <div className="mmd">
              <div className="mmd-lbl">片頭痛予防治療 従来薬効群の全体マップ</div>
              <MermaidDiagram
                themeVariables={MERMAID_THEME}
                chart={`graph LR
    Core["片頭痛予防治療\\n従来薬効群"] --> BB["β遮断薬\\nBeta-blockers"]
    Core --> CCB["Ca拮抗薬\\nCalcium Channel Blockers"]
    Core --> AED["抗てんかん薬\\nAntiepileptic Drugs"]
    Core --> AD["抗うつ薬\\nAntidepressants"]
    BB --> BB1[プロプラノロール・メトプロロール・チモロール]
    CCB --> CCB1["フルナリジン・ロメリジン\\nベラパミルは主に群発頭痛予防で使用"]
    AED --> AED1[バルプロ酸/ジバルプロエクス・トピラマート]
    AD --> AD1[アミトリプチリン・ベンラファキシン]`}
              />
            </div>

            <h3>薬効群 早見表</h3>
            <div className="qr-grid">
              <div className="qr">
                <div className="qr-t">💙 β遮断薬</div>
                <ul>
                  <li>
                    プロプラノロール・メトプロロール・チモロール <span className="bA">Level A</span>
                  </li>
                  <li>
                    アテノロール・ナドロール <span className="bB">Level B</span>
                  </li>
                  <li>国内：プロプラノロールは保険適用</li>
                </ul>
              </div>
              <div className="qr">
                <div className="qr-t">🌊 Ca拮抗薬</div>
                <ul>
                  <li>フルナリジン（国内未承認）</li>
                  <li>ロメリジン（国内承認・保険適用）</li>
                  <li>ベラパミルは主に群発頭痛予防で使用</li>
                </ul>
              </div>
              <div className="qr">
                <div className="qr-t">🧠 抗てんかん薬</div>
                <ul>
                  <li>
                    トピラマート・バルプロ酸/ジバルプロエクス <span className="bA">Level A</span>
                  </li>
                  <li>妊娠可能年齢では特に慎重な検討が必要とされる</li>
                  <li>国内：バルプロ酸は保険適用、トピラマートは適応外使用</li>
                </ul>
              </div>
              <div className="qr">
                <div className="qr-t">🍃 抗うつ薬</div>
                <ul>
                  <li>
                    アミトリプチリン・ベンラファキシン <span className="bB">Level B</span>
                  </li>
                  <li>国内：アミトリプチリンは片頭痛予防として適応外使用</li>
                </ul>
              </div>
            </div>

            <h3>3.1　エビデンスレベルの読み方（AAN/AHS方式）</h3>
            <p>
              米国神経学会（AAN）と米国頭痛学会（AHS）による2012年版ガイドラインでは、下表のようなレベル分類で推奨の強さを整理しています（本ガイドではこの分類を「エビデンスの質を示す目安」として引用します。効果を保証するものではありません）。
            </p>
            <div className="tbl th-purple">
              <table>
                <thead>
                  <tr>
                    <th>レベル</th>
                    <th>定義の要旨</th>
                    <th>本ガイド該当薬効群における位置づけ（要旨）</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <span className="bA">Level A</span>
                      <br />
                      確立された有効性
                    </td>
                    <td>質の高いRCTが複数あり、有効性が確立していると判断される</td>
                    <td>
                      プロプラノロール・メトプロロール・チモロール（β遮断薬）／バルプロ酸・ジバルプロエクス・トピラマート（抗てんかん薬）
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <span className="bB">Level B</span>
                      <br />
                      おそらく有効
                    </td>
                    <td>中程度のエビデンスがあり、有効性が示唆される</td>
                    <td>
                      アミトリプチリン・ベンラファキシン（抗うつ薬）／アテノロール・ナドロール（β遮断薬）
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <span className="bC">Level C</span>
                      <br />
                      有効の可能性
                    </td>
                    <td>エビデンスは限定的だが考慮され得る</td>
                    <td>カルバマゼピン、一部の降圧薬 等</td>
                  </tr>
                  <tr>
                    <td>
                      <span className="bRed">Level A（無効が確立）</span>
                    </td>
                    <td>質の高いRCTで無効性が示された</td>
                    <td>ラモトリギンは無効とされている（本ガイドの対象外の薬剤）</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="alert a-info">
              <div className="alert-i">📖</div>
              <div>
                出典：AAN/AHS「Evidence-based guideline update: Pharmacologic treatment for episodic
                migraine prevention in adults」（Neurology, 2012）{" "}
                <Ext href="https://www.neurology.org/doi/10.1212/WNL.0b013e3182535d20">論文リンク</Ext>
              </div>
            </div>

            <h3>3.2　欧州頭痛連合（EHF）による2023年系統的再評価（GRADE方式）</h3>
            <p>
              EHFは2022年8月までのRCTを対象に、代表的な経口予防薬について個別の系統的レビュー・メタ解析シリーズ（Part
              1〜4）を発表しています。GRADEアプローチにより、エビデンスの「確実性（certainty）」を明示している点が特徴です。
            </p>
            <div className="tbl th-teal">
              <table>
                <thead>
                  <tr>
                    <th>Part</th>
                    <th>対象薬効群/薬剤</th>
                    <th>GRADEによる主な結論の要旨</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Part 1</td>
                    <td>アミトリプチリン（抗うつ薬）</td>
                    <td>
                      プラセボと比較した有効性のエビデンスがある一方、確実性の評価には限界があるとされている
                    </td>
                  </tr>
                  <tr>
                    <td>Part 2</td>
                    <td>フルナリジン（Ca拮抗薬）</td>
                    <td>プラセボと比較した有効性が示されているが、日本を含む一部地域では未承認</td>
                  </tr>
                  <tr>
                    <td>Part 3</td>
                    <td>トピラマート（抗てんかん薬）</td>
                    <td>
                      50%レスポンダー率の相対リスクは1.61（95%信頼区間
                      1.29–2.01）で、確実性は高いと評価。一方、有害事象による中止も一定数報告されている
                    </td>
                  </tr>
                  <tr>
                    <td>Part 4</td>
                    <td>プロプラノロール（β遮断薬）</td>
                    <td>
                      プラセボと比較して有効性が示されている（詳細は個別のメタ解析結果を参照）
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="alert a-info">
              <div className="alert-i">📖</div>
              <div>
                出典：Journal of Headache and Pain誌 EHF critical re-appraisal シリーズ（Part 1–4,
                2023–2024）— 詳細URLはセクション9を参照
              </div>
            </div>
          </section>

          {/* SECTION 4 */}
          <section id="s4" className="sec">
            <div className="sec-hd">
              <div className="sec-num">4</div>
              <h2 className="sec-title">薬効群ごとの解説</h2>
            </div>

            <div className="alert a-warn">
              <div className="alert-i">⚠️</div>
              <div>
                以下は<strong>一般名（成分名）・薬効群としての解説</strong>
                であり、個別の用量・用法は記載しません。具体的な処方判断は必ず医師・薬剤師にご相談ください。国内承認状況は変更される可能性があるため、最新情報はPMDA添付文書等でご確認ください。
              </div>
            </div>

            <h3>4.1　β遮断薬（Beta-blockers）</h3>
            <div className="tbl">
              <table>
                <thead>
                  <tr>
                    <th style={{ width: 180 }}>項目</th>
                    <th>内容</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>想定される作用機序</td>
                    <td>
                      交感神経系（β受容体）を介した血管緊張・中枢性の関与が想定されているが、片頭痛予防効果の機序は完全には解明されていない
                    </td>
                  </tr>
                  <tr>
                    <td>代表的な一般名</td>
                    <td>
                      プロプラノロール、メトプロロール、チモロール{" "}
                      <span className="bA">Level A</span>（いずれもAAN/AHSでLevel A評価）
                    </td>
                  </tr>
                  <tr>
                    <td>エビデンスの要旨</td>
                    <td>
                      複数の質の高いRCTでプラセボに対する有効性が示されている。EHFの系統的再評価でも支持的な結果が報告されている
                    </td>
                  </tr>
                  <tr>
                    <td>一般的な留意点（薬効群として）</td>
                    <td>
                      喘息・徐脈性不整脈等の既往がある場合は使用が制限され得る。うつ病を合併する患者では自己対処薬としてのリスクにも配慮が必要とされている（NICEガイドラインが言及）
                    </td>
                  </tr>
                  <tr>
                    <td>国内の承認状況</td>
                    <td>
                      プロプラノロールは片頭痛に対して保険適用がある{" "}
                      <span className="bGrn">保険適用</span>（国内承認薬効の一つ）
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3>4.2　Ca拮抗薬（Calcium Channel Blockers）</h3>
            <div className="tbl th-teal">
              <table>
                <thead>
                  <tr>
                    <th style={{ width: 180 }}>項目</th>
                    <th>内容</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>想定される作用機序</td>
                    <td>血管平滑筋・神経細胞のカルシウムチャネルを介した作用が想定されている</td>
                  </tr>
                  <tr>
                    <td>代表的な一般名</td>
                    <td>
                      フルナリジン（欧州・カナダ等のガイドラインで評価が高いが、
                      <strong>国内未承認</strong> <span className="bRed">国内未承認</span>
                      ）、ロメリジン（
                      <strong>国内で片頭痛予防として承認・保険適用</strong>{" "}
                      <span className="bGrn">保険適用</span>）
                    </td>
                  </tr>
                  <tr>
                    <td>エビデンスの要旨</td>
                    <td>
                      フルナリジンはEHFの系統的再評価で有効性が示されている。ベラパミルは片頭痛よりも群発頭痛の予防で用いられることが多く、片頭痛予防としてのエビデンスは相対的に限定的とされる
                    </td>
                  </tr>
                  <tr>
                    <td>一般的な留意点（薬効群として）</td>
                    <td>眠気・体重増加等が報告されている（薬剤ごとに異なる）</td>
                  </tr>
                  <tr>
                    <td>国内の承認状況</td>
                    <td>
                      ロメリジンは国内承認・保険適用あり <span className="bGrn">保険適用</span>
                      。フルナリジンは国内未承認 <span className="bRed">国内未承認</span>
                      。ベラパミルは片頭痛への使用について審査上認められる事例があるが、主たる適応は他疾患である点に留意{" "}
                      <span className="bOra">適応要相談</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3>4.3　抗てんかん薬（Antiepileptic Drugs）</h3>
            <div className="tbl th-orange">
              <table>
                <thead>
                  <tr>
                    <th style={{ width: 180 }}>項目</th>
                    <th>内容</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>想定される作用機序</td>
                    <td>
                      中枢神経系の興奮性抑制（電位依存性チャネルやGABA系への関与等）が想定されている
                    </td>
                  </tr>
                  <tr>
                    <td>代表的な一般名</td>
                    <td>
                      トピラマート、バルプロ酸/ジバルプロエクス{" "}
                      <span className="bA">Level A</span>（いずれもAAN/AHSでLevel A評価）
                    </td>
                  </tr>
                  <tr>
                    <td>エビデンスの要旨</td>
                    <td>
                      複数の質の高いRCTで有効性が確立していると評価されている。EHFの系統的再評価でもトピラマートについて高い確実性（high
                      certainty）の有効性が報告されている
                    </td>
                  </tr>
                  <tr>
                    <td>一般的な留意点（薬効群として）</td>
                    <td>
                      妊娠可能な年齢の患者では特に慎重な検討が必要とされる（催奇形性等のリスクに関する安全性情報がPMDA・FDA・EMA等から発出されている）。認知機能への影響、体重変化等、薬剤ごとに異なる有害事象プロファイルがある
                    </td>
                  </tr>
                  <tr>
                    <td>国内の承認状況</td>
                    <td>
                      バルプロ酸は片頭痛に対して保険適用あり <span className="bGrn">保険適用</span>
                      。トピラマートは国内では片頭痛予防としては<strong>適応外使用</strong>
                      に該当する <span className="bOra">適応外使用</span>
                      （国際的なガイドラインでの評価の高さと、国内承認状況にはギャップがある点に留意）
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3>4.4　抗うつ薬（Antidepressants）</h3>
            <div className="tbl th-purple">
              <table>
                <thead>
                  <tr>
                    <th style={{ width: 180 }}>項目</th>
                    <th>内容</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>想定される作用機序</td>
                    <td>
                      セロトニン・ノルアドレナリン系を介した中枢性の疼痛修飾機構への関与が想定されている
                    </td>
                  </tr>
                  <tr>
                    <td>代表的な一般名</td>
                    <td>
                      アミトリプチリン（三環系 <span className="bB">Level B</span>
                      ）、ベンラファキシン（SNRI <span className="bB">Level B</span>）
                    </td>
                  </tr>
                  <tr>
                    <td>エビデンスの要旨</td>
                    <td>
                      アミトリプチリンは抗うつ薬の中で最も研究の蓄積が多いとされるが、EHFの系統的再評価では確実性の評価に限界がある旨が報告されている。フルオキセチン（SSRI）についてはエビデンスが一貫していない
                    </td>
                  </tr>
                  <tr>
                    <td>一般的な留意点（薬効群として）</td>
                    <td>
                      抗コリン作用に関連する症状、眠気等が報告されている。他の抗うつ薬治療を受けている場合はセロトニン症候群等の相互作用にも留意が必要とされる
                    </td>
                  </tr>
                  <tr>
                    <td>国内の承認状況</td>
                    <td>
                      アミトリプチリンは片頭痛予防としては国内では<strong>適応外使用</strong>
                      に該当する <span className="bOra">適応外使用</span>
                      （保険診療上の取り扱いには条件により幅があるため、医療機関での確認が必要）
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* SECTION 5 */}
          <section id="s5" className="sec">
            <div className="sec-hd">
              <div className="sec-num">5</div>
              <h2 className="sec-title">効果発現までの期間</h2>
            </div>

            <h3>5.1　一般原則</h3>
            <p>
              国際的なガイドライン・主要な臨床試験デザイン（EHF系統的再評価が対象とした試験の多くは12〜26週間の観察期間を設定）を横断すると、
              <strong>予防治療の効果判定には一定の期間を要する</strong>
              という点でおおむね一致しています。一般に、以下のような段階を経ることが多いとされています。
            </p>

            <div className="phase-grid">
              <div className="ph ph1">
                <div className="ph-icon">🚩</div>
                <div className="ph-title">治療開始</div>
                <div className="ph-time">Week 0</div>
                <div className="ph-desc">
                  低用量から開始し忍容性を確認しながら漸増（具体的な用量調整は医師が判断）
                </div>
              </div>
              <div className="ph ph2">
                <div className="ph-icon">⏳</div>
                <div className="ph-title">用量調整期</div>
                <div className="ph-time">数週間</div>
                <div className="ph-desc">忍容性の確認・用量調整の期間</div>
              </div>
              <div className="ph ph3">
                <div className="ph-icon">📊</div>
                <div className="ph-title">効果判定</div>
                <div className="ph-time">約8〜12週間（およそ2〜3か月）</div>
                <div className="ph-desc">頭痛日記等をもとに効果判定を行う一般的な目安</div>
              </div>
              <div className="ph ph4">
                <div className="ph-icon">🔁</div>
                <div className="ph-title">継続 or 変更</div>
                <div className="ph-time">判定後</div>
                <div className="ph-desc">
                  効果あり→頭痛日記で経過観察を継続／不十分→薬効群の変更や専門医への相談を検討
                </div>
              </div>
            </div>

            <div className="mmd">
              <div className="mmd-lbl">効果判定までの一般的なタイムライン</div>
              <MermaidDiagram
                themeVariables={MERMAID_THEME}
                chart={`flowchart LR
    W0["治療開始\\n低用量から開始し\\n忍容性を確認しながら漸増\\n（具体的な用量調整は医師が判断）"] --> W4["数週間\\n忍容性の確認・用量調整の期間"]
    W4 --> W12["約8〜12週間\\n（およそ2〜3か月）\\n効果判定の一般的な目安"]
    W12 -->|効果が不十分・\\n忍容性に問題| Switch["薬効群の変更や\\n専門医への相談を検討"]
    W12 -->|効果が確認できた| Continue["頭痛日記等で経過観察を\\n継続しながら治療継続"]`}
              />
            </div>

            <h3>5.2　なぜ「2〜3か月」が目安とされるのか</h3>
            <ul>
              <li>
                多くの薬効群で、忍容性を確認しながら段階的に用量を調整する必要があるため、治療域に到達するまでに数週間を要します。
              </li>
              <li>
                頭痛の自然な変動（月ごとのばらつき）があるため、単月の変化だけで有効性を判断すると誤った結論に至るリスクがあります。頭痛日記等による複数か月の記録が推奨されます。
              </li>
              <li>
                国際頭痛学会（IHS）が示す予防治療の臨床試験ガイドライン（controlled trials of
                preventive
                treatment）でも、評価期間として数か月単位の観察を前提とした試験デザインが標準とされています。
              </li>
            </ul>

            <div className="alert a-warn">
              <div className="alert-i">📝</div>
              <div>
                <strong>留意</strong>
                ：これは薬効群共通の一般原則であり、個別の薬剤ごとの具体的な漸増スケジュールや評価タイミングは医師の指示に従ってください。本ガイドは特定の用量・スケジュールを推奨するものではありません。
              </div>
            </div>
          </section>

          {/* SECTION 6 */}
          <section id="s6" className="sec">
            <div className="sec-hd">
              <div className="sec-num">6</div>
              <h2 className="sec-title">継続と中止の一般原則</h2>
            </div>

            <h3>6.1　継続期間の目安</h3>
            <p>
              NICE（英国）のガイドラインは、
              <strong>予防治療の開始から6か月後に、治療継続の必要性を見直すこと</strong>
              を明示しています。カナダ頭痛学会の2024年改訂ガイドラインは、経口予防薬について、
              <strong>
                十分な効果が得られ、頭痛パターンがエピソード性（低頻度）に戻り、急性期治療で良好にコントロールされ、薬物乱用頭痛のリスクがなく、有害事象が少ない場合には、およそ12か月の時点で漸減を検討することが合理的
              </strong>
              であるという考え方を示しています。
            </p>

            <h3>6.2　中止判断に関する一般原則</h3>
            <p>頭痛予防治療の中止に関する系統的レビューでは、中止を検討する理由として主に以下が挙げられています。</p>
            <ul>
              <li>有害事象（忍容性の問題）</li>
              <li>効果不十分（efficacy failure）</li>
              <li>長期使用後の「休薬期間（drug holiday）」の検討</li>
              <li>患者個々の事情（妊娠希望、他疾患の治療方針変更等）</li>
            </ul>
            <p>
              同レビューは、
              <strong>経口予防薬の中止判断については、各国・各学会のガイドラインに従うことが合理的</strong>
              であるとし、漸減中に頭痛が再燃した場合は、
              <strong>有効だった治療への復帰を医師と相談すること</strong>
              が一般的な対応であるとしています。
            </p>

            <div className="mmd">
              <div className="mmd-lbl">継続・中止の判断フロー</div>
              <MermaidDiagram
                themeVariables={MERMAID_THEME}
                chart={`flowchart TD
    C1[予防療法を継続中] --> C2{"開始から\\nおよそ6〜12か月経過"}
    C2 --> C3{"頭痛頻度が安定して低い\\nQOL良好\\n有害事象が少ない"}
    C3 -->|該当する| C4["医師と相談のうえ\\n漸減・中止を検討"]
    C3 -->|判断が難しい・\\n効果不十分| C5["継続、または\\n薬効群の見直しを医師と相談"]
    C4 --> C6{"漸減中に\\n頭痛が再燃するか"}
    C6 -->|再燃する| C7["前治療への復帰を\\n医師と相談"]
    C6 -->|再燃しない| C8["中止を継続し\\n経過観察を続ける"]`}
              />
            </div>

            <h3>6.3　再燃リスクに関する留意点</h3>
            <p>
              頭痛予防治療中止後の再燃リスクに関する研究では、
              <strong>中止後最初の1年間に再燃リスクが最も高い</strong>
              という報告があり、中止後も一定期間の経過観察が推奨されています。この点は、薬効群を問わず共通する留意事項として位置づけられます。
            </p>

            <div className="alert a-purple">
              <div className="alert-i">🔎</div>
              <div>
                <strong>注記</strong>
                ：中止後の効果持続性（中止後も予防効果が一定期間持続するかどうか）については、薬剤ごとに研究の蓄積が異なり、確定的な結論が得られていない薬剤もあります（例：プロプラノロールに関する初期のコクランレビューでは、中止後の効果持続性について確定的な結論を出せないとされています）。
              </div>
            </div>
          </section>

          {/* SECTION 7 */}
          <section id="s7" className="sec">
            <div className="sec-hd">
              <div className="sec-num">7</div>
              <h2 className="sec-title">総合フローチャート</h2>
            </div>

            <div className="alert a-warn">
              <div className="alert-i">⚠️</div>
              <div>
                以下は、本ガイドの各セクションを統合した、教育目的の全体像です。
                <strong>
                  実際の臨床判断は必ず医師が行うものであり、本フローチャートはその枠組みを理解するための概念図です。
                </strong>
              </div>
            </div>

            <div className="mmd">
              <div className="mmd-lbl">片頭痛予防治療の全体像（教育用フローチャート）</div>
              <MermaidDiagram
                themeVariables={MERMAID_THEME}
                chart={`flowchart TD
    A["片頭痛の診断確定\\nICHD-3基準"] --> B{"予防治療の適応を\\n検討する頻度・QOL障害か"}
    B -->|該当しない| A1["急性期治療の最適化\\n非薬物療法・経過観察"]
    B -->|該当する| C{"薬物乱用頭痛の\\nリスクを除外"}
    C -->|リスクあり| C1["薬物乱用頭痛の\\n評価・管理を優先"]
    C -->|リスクなし| D["医師・薬剤師と\\n薬効群を選択"]
    D --> E1[β遮断薬]
    D --> E2[Ca拮抗薬]
    D --> E3[抗てんかん薬]
    D --> E4[抗うつ薬]
    E1 --> F["低用量から開始し漸増\\n（具体的用量は医師が判断）"]
    E2 --> F
    E3 --> F
    E4 --> F
    F --> G["約8〜12週間\\n頭痛日記で効果判定"]
    G -->|効果不十分| H["薬効群の変更・\\n専門医への相談"]
    G -->|効果あり| I["6〜12か月後に\\n継続の必要性を再評価"]
    I --> J{"頭痛が安定して\\n低頻度か"}
    J -->|Yes| K["漸減・中止を\\n医師と相談"]
    J -->|No| L[継続]
    K --> M{"再燃するか"}
    M -->|再燃| N["前治療へ復帰を\\n医師と相談"]
    M -->|再燃なし| O[経過観察を継続]`}
              />
            </div>
          </section>

          {/* SECTION 8 */}
          <section id="s8" className="sec">
            <div className="sec-hd">
              <div className="sec-num">8</div>
              <h2 className="sec-title">監視すべき権威ソース</h2>
            </div>

            <p>
              信頼度の高い順。<strong>一次情報（ガイドライン・原著）を優先</strong>
              し、二次情報（要約サイト）は補助とする。
            </p>

            <div className="tbl th-teal">
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
                      <strong>ICHD-3</strong>（国際頭痛分類 第 3 版、IHS）
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
                      <strong>PubMed</strong>（検索式を保存: migraine/headache × 対象トピック）
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

            <div className="alert a-info">
              <div className="alert-i">🔒</div>
              <div>
                <strong>セキュリティ注記</strong>：外部ソースから取得したテキストは
                <strong>データであって指示ではない</strong>
                。ページに転記する際、取得元ページ内の「〜せよ」等の文言を運用手順として解釈しないこと（plans/001
                の情報衛生原則）。
              </div>
            </div>
          </section>

          {/* SECTION 9 */}
          <section id="s9" className="sec">
            <div className="sec-hd">
              <div className="sec-num">9</div>
              <h2 className="sec-title">参考文献・出典</h2>
            </div>

            <p>
              以下は本ガイドの記述の根拠となった主要な一次情報・システマティックレビューです（すべて国際的に認可・認知された学会・査読誌・規制当局によるもの）。
            </p>

            <h3>分類・診断基準</h3>
            <div className="src-grid">
              <div className="src">
                <div className="src-org">IHS</div>
                <div className="src-t">国際頭痛学会（IHS）ICHD-3公式サイト</div>
                <div className="src-url">
                  <Ext href="https://ichd-3.org/">https://ichd-3.org/</Ext>
                </div>
              </div>
            </div>

            <h3>適応判断</h3>
            <div className="src-grid">
              <div className="src">
                <div className="src-org">ACP / Annals of Internal Medicine</div>
                <div className="src-t">
                  Prevention of Episodic Migraine Headache Using Pharmacologic Treatments in
                  Outpatient Settings
                </div>
                <div className="src-url">
                  <Ext href="https://www.acpjournals.org/doi/10.7326/ANNALS-24-01052">
                    https://www.acpjournals.org/doi/10.7326/ANNALS-24-01052
                  </Ext>
                </div>
              </div>
              <div className="src">
                <div className="src-org">Canadian Journal of Neurological Sciences</div>
                <div className="src-t">
                  Updated Canadian Headache Society Migraine Prevention Guideline（2024）
                </div>
                <div className="src-url">
                  <Ext href="https://www.cambridge.org/core/journals/canadian-journal-of-neurological-sciences/article/updated-canadian-headache-society-migraine-prevention-guideline-with-systematic-review-and-metaanalysis/34704719E8C0A1ADBEF030D6176036FF">
                    Cambridge Core 掲載ページ
                  </Ext>
                </div>
              </div>
              <div className="src">
                <div className="src-org">NICE</div>
                <div className="src-t">
                  Headaches in over 12s: diagnosis and management（CG150, updated 2025）
                </div>
                <div className="src-url">
                  <Ext href="https://www.nice.org.uk/guidance/cg150">
                    https://www.nice.org.uk/guidance/cg150
                  </Ext>
                </div>
              </div>
              <div className="src">
                <div className="src-org">Neurology, 2019</div>
                <div className="src-t">
                  Oskoui M, et al. Practice guideline update summary: Pharmacologic treatment for
                  pediatric migraine prevention
                </div>
                <div className="src-url">
                  <Ext href="https://www.neurology.org/doi/10.1212/WNL.0000000000008105">
                    https://www.neurology.org/doi/10.1212/WNL.0000000000008105
                  </Ext>
                </div>
              </div>
            </div>

            <h3>従来予防薬のエビデンス</h3>
            <div className="src-grid">
              <div className="src">
                <div className="src-org">Neurology, 2012 / AAN・AHS</div>
                <div className="src-t">
                  Silberstein SD, et al. Evidence-based guideline update: Pharmacologic treatment for
                  episodic migraine prevention in adults
                </div>
                <div className="src-url">
                  <Ext href="https://www.neurology.org/doi/10.1212/WNL.0b013e3182535d20">
                    https://www.neurology.org/doi/10.1212/WNL.0b013e3182535d20
                  </Ext>
                  （全文PMC:{" "}
                  <Ext href="https://pmc.ncbi.nlm.nih.gov/articles/PMC3335452/">PMC3335452</Ext>）
                </div>
              </div>
              <div className="src">
                <div className="src-org">Headache, 2012</div>
                <div className="src-t">
                  Loder E, Burch R, Rizzoli P. The 2012 AHS/AAN Guidelines for Prevention of Episodic
                  Migraine: A Summary and Comparison With Other Recent Clinical Practice Guidelines
                </div>
                <div className="src-url">
                  <Ext href="https://headachejournal.onlinelibrary.wiley.com/doi/10.1111/j.1526-4610.2012.02185.x">
                    Wiley Online Library 掲載ページ
                  </Ext>
                </div>
              </div>
              <div className="src">
                <div className="src-org">J Headache Pain, 2023 / EHF</div>
                <div className="src-t">
                  EHF critical re-appraisal and meta-analysis of oral drugs in migraine prevention —
                  Part 1: Amitriptyline
                </div>
                <div className="src-url">
                  <Ext href="https://pmc.ncbi.nlm.nih.gov/articles/PMC10088191/">
                    https://pmc.ncbi.nlm.nih.gov/articles/PMC10088191/
                  </Ext>
                </div>
              </div>
              <div className="src">
                <div className="src-org">J Headache Pain, 2023 / EHF</div>
                <div className="src-t">EHF critical re-appraisal — Part 2: Flunarizine</div>
                <div className="src-url">
                  <Ext href="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC10507915/">
                    https://www.ncbi.nlm.nih.gov/pmc/articles/PMC10507915/
                  </Ext>
                </div>
              </div>
              <div className="src">
                <div className="src-org">J Headache Pain, 2023 / EHF</div>
                <div className="src-t">EHF critical re-appraisal — Part 3: Topiramate</div>
                <div className="src-url">
                  <Ext href="https://pmc.ncbi.nlm.nih.gov/articles/PMC10563338/">
                    https://pmc.ncbi.nlm.nih.gov/articles/PMC10563338/
                  </Ext>
                </div>
              </div>
              <div className="src">
                <div className="src-org">J Headache Pain, 2024 / EHF</div>
                <div className="src-t">EHF critical re-appraisal — Part 4: Propranolol</div>
                <div className="src-url">
                  <Ext href="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC11267726/">
                    https://www.ncbi.nlm.nih.gov/pmc/articles/PMC11267726/
                  </Ext>
                </div>
              </div>
              <div className="src">
                <div className="src-org">PLOS One, 2019</div>
                <div className="src-t">
                  Jackson JL, et al. Beta-blockers for the prevention of headache in adults, a
                  systematic review and meta-analysis
                </div>
                <div className="src-url">
                  <Ext href="https://journals.plosone.org/plosone/article?id=10.1371%2Fjournal.pone.0212785">
                    PLOS One 掲載ページ
                  </Ext>
                </div>
              </div>
              <div className="src">
                <div className="src-org">Cephalalgia, 2015</div>
                <div className="src-t">
                  Linde M, Mulleners WM, et al. Antiepileptics in migraine prophylaxis: an updated
                  Cochrane review（EHF Part 3内で引用）
                </div>
                <div className="src-url">—</div>
              </div>
              <div className="src">
                <div className="src-org">Cochrane（withdrawn review, 2019 update note）</div>
                <div className="src-t">Propranolol for migraine prophylaxis</div>
                <div className="src-url">
                  <Ext href="https://pmc.ncbi.nlm.nih.gov/articles/PMC6464045/">
                    https://pmc.ncbi.nlm.nih.gov/articles/PMC6464045/
                  </Ext>
                </div>
              </div>
            </div>

            <h3>CGRP関連（新規予防治療の位置づけの参考情報）</h3>
            <div className="src-grid">
              <div className="src">
                <div className="src-org">Headache, 2024 / AHS</div>
                <div className="src-t">
                  Charles AC, et al. Calcitonin gene-related peptide-targeting therapies are a
                  first-line option for the prevention of migraine: An American Headache Society
                  position statement update
                </div>
                <div className="src-url">
                  <Ext href="https://headachejournal.onlinelibrary.wiley.com/doi/10.1111/head.14692">
                    Wiley Online Library 掲載ページ
                  </Ext>
                </div>
              </div>
            </div>

            <h3>継続・中止の一般原則</h3>
            <div className="src-grid">
              <div className="src">
                <div className="src-org">系統的レビュー</div>
                <div className="src-t">de Vries Lentsch S, et al. The sense of stopping migraine prophylaxis</div>
                <div className="src-url">
                  <Ext href="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC9933401/">
                    https://www.ncbi.nlm.nih.gov/pmc/articles/PMC9933401/
                  </Ext>
                </div>
              </div>
              <div className="src">
                <div className="src-org">NICE CG150</div>
                <div className="src-t">継続要否の6か月レビューに関する推奨</div>
                <div className="src-url">
                  <Ext href="https://www.nice.org.uk/guidance/cg150">
                    https://www.nice.org.uk/guidance/cg150
                  </Ext>
                </div>
              </div>
            </div>

            <h3>国内規制・承認状況</h3>
            <div className="src-grid">
              <div className="src">
                <div className="src-org">日本頭痛学会</div>
                <div className="src-t">頭痛ガイドライン</div>
                <div className="src-url">
                  <Ext href="https://www.jhsnet.net/guideline.html">
                    https://www.jhsnet.net/guideline.html
                  </Ext>
                </div>
              </div>
              <div className="src">
                <div className="src-org">日本神経学会</div>
                <div className="src-t">頭痛の診療ガイドライン2021</div>
                <div className="src-url">
                  <Ext href="https://www.neurology-jp.org/guidelinem/headache_medical_2021.html">
                    https://www.neurology-jp.org/guidelinem/headache_medical_2021.html
                  </Ext>
                </div>
              </div>
              <div className="src">
                <div className="src-org">PMDA</div>
                <div className="src-t">医薬品医療機器総合機構</div>
                <div className="src-url">
                  <Ext href="https://www.pmda.go.jp/">https://www.pmda.go.jp/</Ext>
                </div>
              </div>
            </div>

            <div className="card" style={{ marginTop: 24 }}>
              <h3 style={{ marginTop: 0 }}>最終確認事項</h3>
              <p>
                本ガイドに記載された内容は、作成時点で確認可能であった国際的な一次情報・システマティックレビューに基づく教育的整理です。医薬品の承認状況・保険適用・ガイドラインの版は改訂され得るため、実臨床での判断にあたっては必ず最新の添付文書・ガイドライン・専門医の判断を優先してください。
                <strong>本ページは個別の治療推奨を目的としたものではありません。</strong>
              </p>
            </div>
          </section>
        </main>
      </div>

      {/* FOOTER */}
      <div className="footer">
        <strong>片頭痛予防治療ガイド</strong> — 適応判断・従来予防薬の薬効群・効果発現期間・継続/中止の一般原則
        <br />
        📅 作成年: 2026 | 次回レビュー推奨: ガイドライン更新時
        <br />
        ⚠️
        本資料は学術・教育・研究目的のみを対象としています。臨床への適用は必ず資格を持つ医療専門家の監督のもとで行ってください。
      </div>
    </div>
  );
}
