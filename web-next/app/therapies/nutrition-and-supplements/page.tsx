import type { Metadata } from "next";
import { Ext } from "@/components/Ext";
import MermaidDiagram from "@/components/MermaidDiagram";
import { NutritionSidebar } from "@/components/therapies/NutritionSidebar";
import "./nutrition-and-supplements.css";

export const metadata: Metadata = {
  title: "🌿 頭痛と栄養・サプリメント療法 完全ガイド",
  description:
    "国際エビデンス（ICHD-3 / AAN / EHF / Cochrane / NICE）に基づく包括的解説。マグネシウム・リボフラビン・CoQ10のコアトリオから食事性トリガー、MOHスクリーニング、薬物相互作用、特別集団への配慮まで初学者向けに整理した完全ガイド。",
};

/** 栄養療法の Mermaid テーマ。 */
const NUTRITION_MERMAID_THEME: Record<string, string> = {
  primaryColor: "#e8f5e9",
  primaryTextColor: "#1b5e20",
  primaryBorderColor: "#43a047",
  lineColor: "#546e7a",
  secondaryColor: "#e0f2f1",
  tertiaryColor: "#f1f8e9",
  edgeLabelBackground: "#ffffff",
  fontSize: "13px",
};

export default function NutritionAndSupplementsPage() {
  return (
    <div className="nutrition-accent">
      {/* HERO */}
      <div className="hero">
        <div style={{ fontSize: 34 }}>🌿</div>
        <h1>頭痛と栄養・サプリメント療法 完全ガイド</h1>
        <p className="hero-sub">
          国際エビデンス（ICHD-3 / AAN / EHF / Cochrane / NICE）に基づく包括的解説 —
          初学者向けステップバイステップ
        </p>
        <div className="hero-tags">
          <span className="hero-tag">Mg・B2・CoQ10 コアトリオ</span>
          <span className="hero-tag">Grade A〜U エビデンス表記</span>
          <span className="hero-tag">ミトコンドリア代謝</span>
          <span className="hero-tag">MOH 統合評価</span>
          <span className="hero-tag">薬剤相互作用チェック</span>
        </div>
      </div>

      {/* DISCLAIMER */}
      <div className="disclaimer">
        <strong>⚠️ Academic Disclaimer（学術免責事項）</strong>　本資料は
        <strong>学術・教育・研究目的のみ</strong>
        を対象としています。すべての内容は国際的に認定された文献・ガイドラインに基づいていますが、個人の医療診断・処方・治療の代替とはなりません。臨床応用の前に必ず資格を持つ医療専門家（神経内科・頭痛専門医）にご相談ください。
        <br />
        <strong>参照基準</strong>: ICHD-3 | AAN | EHF | IHS 2024 | NICE CG150 | Cochrane Library |
        WHO | PubMed
      </div>

      {/* LAYOUT */}
      <div className="layout">
        <NutritionSidebar />

        {/* MAIN */}
        <main className="main">
          {/* ====================================================== SECTION 1 */}
          <section id="s1" className="sec">
            <div className="sec-hd">
              <div className="sec-num">1</div>
              <h1 className="sec-title">はじめに — なぜ栄養が頭痛に影響するのか？</h1>
            </div>

            <h2>1-1. 片頭痛の病態生理学と栄養の接点</h2>
            <p>
              片頭痛（Migraine）は単なる「頭の痛み」ではなく、
              <strong>脳の神経代謝障害・三叉神経血管系の活性化・中枢感作</strong>
              が複雑に絡み合う慢性神経疾患です。栄養素は、これらの病態メカニズムの複数の段階に介入できます。
            </p>

            <div className="mmd">
              <div className="mmd-lbl">フローチャート — 片頭痛の病態メカニズムと栄養素の作用点</div>
              <MermaidDiagram
                themeVariables={NUTRITION_MERMAID_THEME}
                chart={`flowchart TD
TRIGGER["⚡ トリガー因子\\n（ストレス・睡眠不足・ホルモン変動・食事）"]

TRIGGER --> MITO["🔋 ミトコンドリア機能低下\\nATP産生障害\\n酸化ストレス増大"]
TRIGGER --> ION["⚡ イオンチャネル異常\\nMg²⁺欠乏 → NMDA受容体過活動\\nCSD（皮質拡延性抑制）促進"]
TRIGGER --> NEURO["🧠 神経炎症\\nCGRP放出増加\\n三叉神経節活性化"]

MITO --> ATTACK["🔴 片頭痛発作\\nCGRP主導の神経血管性炎症\\n三叉神経痛覚過敏"]
ION --> ATTACK
NEURO --> ATTACK

B2["💊 リボフラビン（B2）400mg/日\\n→ ETC Complex I 最適化"] -.->|補正| MITO
CoQ10["💊 CoQ10 300mg/日\\n→ Complex I/III 電子伝達"] -.->|補正| MITO
Mg["💊 マグネシウム 400-600mg/日\\n→ NMDA受容体調節・CSD抑制"] -.->|補正| ION
Omega3["💊 オメガ3脂肪酸 1-3g/日\\n→ プロスタグランジン調節"] -.->|抑制| NEURO
ALA["💊 α-リポ酸 600mg/日\\n→ 酸化ストレス軽減"] -.->|補正| MITO

style ATTACK fill:#c0392b,color:#fff
style MITO fill:#e74c3c,color:#fff
style ION fill:#e67e22,color:#fff
style NEURO fill:#8e44ad,color:#fff
style Mg fill:#27ae60,color:#fff
style B2 fill:#27ae60,color:#fff
style CoQ10 fill:#27ae60,color:#fff
style Omega3 fill:#2980b9,color:#fff
style ALA fill:#2980b9,color:#fff`}
              />
            </div>

            <h2>1-2. なぜサプリメントが「補助的」位置づけなのか</h2>
            <p>
              栄養補助療法は強力な補完手段ですが、以下の理由から
              <strong>薬物療法の代替にはなりません</strong>：
            </p>

            <div className="tbl">
              <table>
                <thead>
                  <tr>
                    <th>観点</th>
                    <th>薬物療法</th>
                    <th>栄養補助療法</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>作用の速度</td>
                    <td>急速（急性期：30〜120分）</td>
                    <td>緩徐（予防的：4〜12週）</td>
                  </tr>
                  <tr>
                    <td>エビデンスの質</td>
                    <td>RCT多数、Grade A多</td>
                    <td>RCT限定的、Grade C多</td>
                  </tr>
                  <tr>
                    <td>即効性</td>
                    <td>高い</td>
                    <td>低い（蓄積効果）</td>
                  </tr>
                  <tr>
                    <td>副作用プロファイル</td>
                    <td>明確（禁忌あり）</td>
                    <td>一般的に良好</td>
                  </tr>
                  <tr>
                    <td>最適な役割</td>
                    <td>急性期 + 予防</td>
                    <td>
                      <strong>予防補助 + ライフスタイル基盤</strong>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="alert a-ok">
              <div className="alert-i">📌</div>
              <div>
                <strong>結論</strong>
                ：栄養補助療法は「薬物療法の効果を最大化するための土台づくり」として位置づける。
              </div>
            </div>
          </section>

          {/* ====================================================== SECTION 2 */}
          <section id="s2" className="sec">
            <div className="sec-hd">
              <div className="sec-num">2</div>
              <h1 className="sec-title">エビデンスの読み方 — グレーディングシステム</h1>
            </div>

            <p>
              本ガイドでは、<strong>AAN（米国神経学会）/ EHF（欧州頭痛連盟）</strong>
              の標準的なエビデンスグレーディングを使用します。
            </p>

            <h2>2-1. グレーディング基準</h2>
            <div className="tbl">
              <table>
                <thead>
                  <tr>
                    <th>グレード</th>
                    <th>定義</th>
                    <th>実際の意味</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <span className="bA">Grade A</span>
                    </td>
                    <td>2つ以上の一貫したClass I RCT または Cochrane SRで低ヘテロジェニティ</td>
                    <td>使用を強く支持する — 最も信頼できる</td>
                  </tr>
                  <tr>
                    <td>
                      <span className="bB">Grade B</span>
                    </td>
                    <td>1つのClass I RCT または 2つ以上のClass II研究</td>
                    <td>使用を支持する — 相当の根拠あり</td>
                  </tr>
                  <tr>
                    <td>
                      <span className="bC">Grade C</span>
                    </td>
                    <td>1つのClass II または 2つ以上のClass III研究</td>
                    <td>使用を考慮できる — 限定的根拠</td>
                  </tr>
                  <tr>
                    <td>
                      <span className="bU">Grade U</span>
                    </td>
                    <td>不十分または相反するエビデンス</td>
                    <td>推奨不可（中立）</td>
                  </tr>
                  <tr>
                    <td>
                      <span className="bOra">Expert Opinion</span>
                    </td>
                    <td>RCTなし、ガイドラインコンセンサスのみ</td>
                    <td>専門家の意見として参考</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h2>2-2. 栄養補助療法の全体エビデンスマップ</h2>
            <div className="mmd">
              <div className="mmd-lbl">フローチャート — エビデンスグレード別サプリメント分類</div>
              <MermaidDiagram
                themeVariables={NUTRITION_MERMAID_THEME}
                chart={`flowchart LR
subgraph A["🟢 Grade A / B（AAN/EHF承認）"]
direction TB
Mg2["🧲 マグネシウム\\n400–600mg/日\\nGrade A/B"]
B22["🟡 リボフラビン（B2）\\n400mg/日\\nGrade A/B"]
CoQ["⚡ CoQ10（ユビキノール）\\n300mg/日\\nGrade B"]
end

subgraph B["🟡 Grade C（補助的使用可）"]
direction TB
Mel["🌙 メラトニン\\n3mg/夜\\nGrade C"]
ALA2["🔶 α-リポ酸\\n600mg/日\\nGrade C"]
Om["🐟 オメガ3脂肪酸\\n1–3g/日\\nGrade C"]
Gin["🌿 ショウガエキス\\n250mg（急性補助）\\nGrade C"]
end

subgraph C["⚠️ 要注意（慎重使用）"]
direction TB
FV["🌼 フィーバーフュー\\n(MIG-99)\\nGrade C＋要監視"]
BB["🌱 バターバー\\nPA-free品のみ\\nGrade C＋肝毒性注意"]
VD["☀️ ビタミンD\\n欠乏確認後のみ\\nGrade C"]
end

subgraph D["🔴 禁忌"]
direction TB
B6["❌ 高用量B6\\n&gt;200mg/日\\n末梢神経障害リスク"]
end

A --> B --> C --> D`}
              />
            </div>
          </section>

          {/* ====================================================== SECTION 3 */}
          <section id="s3" className="sec">
            <div className="sec-hd">
              <div className="sec-num">3</div>
              <h1 className="sec-title">STEP 1 — 高エビデンスサプリメント（Grade A/B）</h1>
            </div>

            <div className="alert a-info">
              <div className="alert-i">🎓</div>
              <div>
                <strong>初学者へのガイド</strong>：Grade
                A/Bのサプリメントは国際ガイドライン（AAN・EHF）で正式に推奨されているものです。予防療法の補助として最初に検討すべき選択肢です。
              </div>
            </div>

            <h2>
              3-1. マグネシウム（Magnesium） <span className="bA">Grade A/B</span>
            </h2>
            <p>
              <strong>片頭痛における「最も基盤的な」栄養素</strong>
            </p>

            <h3>なぜ重要か？（病態生理）</h3>
            <p>
              片頭痛患者では健常者と比較して<strong>血清マグネシウム濃度が有意に低い</strong>
              ことが多くの研究で確認されています。マグネシウムは以下の複数の機序を通じて片頭痛病態に関与します：
            </p>
            <div className="tbl">
              <table>
                <thead>
                  <tr>
                    <th>機序</th>
                    <th>説明</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <strong>NMDA受容体調節</strong>
                    </td>
                    <td>
                      Mg²⁺はNMDA受容体チャネルを閉鎖し過剰な神経興奮を防ぐ（欠乏→ 中枢感作促進）
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <strong>CSD（皮質拡延性抑制）抑制</strong>
                    </td>
                    <td>低Mg状態でCSD閾値が低下し、前兆発生リスクが上昇</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>血小板凝集抑制</strong>
                    </td>
                    <td>Mg²⁺欠乏でセロトニン放出を伴う血小板凝集が亢進</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>ミトコンドリア機能</strong>
                    </td>
                    <td>ATP合成に必須の補因子として作用</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>血管拡張調節</strong>
                    </td>
                    <td>血管平滑筋の調節に直接関与</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3>製剤の選択と推奨用量</h3>
            <div className="tbl">
              <table>
                <thead>
                  <tr>
                    <th>剤形</th>
                    <th>吸収率</th>
                    <th>推奨度</th>
                    <th>特記事項</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <strong>グリシン酸マグネシウム</strong>
                    </td>
                    <td>⭐⭐⭐⭐⭐（最高）</td>
                    <td>第一選択</td>
                    <td>胃腸副作用が最小</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>クエン酸マグネシウム</strong>
                    </td>
                    <td>⭐⭐⭐⭐</td>
                    <td>代替選択</td>
                    <td>水に溶けやすい</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>マグネシウムL-スレオネート</strong>
                    </td>
                    <td>⭐⭐⭐⭐</td>
                    <td>血液脳関門通過性良好</td>
                    <td>神経系への移行性が高い可能性</td>
                  </tr>
                  <tr>
                    <td>酸化マグネシウム</td>
                    <td>⭐⭐（低）</td>
                    <td>
                      <strong>推奨しない</strong>
                    </td>
                    <td>便秘薬として一般的だが吸収率が低い</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="nut-rx">
              <div className="nut-rx-t">💊 推奨プロトコル（予防的補充）</div>
              <dl>
                <dt>用量</dt>
                <dd>400–600 mg/日（2–3回に分割）</dd>
                <dt>目標血清Mg濃度</dt>
                <dd>≥ 0.85 mmol/L</dd>
                <dt>開始用量</dt>
                <dd>200mg/日（消化器症状軽減のため漸増）</dd>
                <dt>評価時期</dt>
                <dd>3ヶ月後に頭痛頻度を再評価</dd>
              </dl>
            </div>
            <div className="nut-rx">
              <div className="nut-rx-t">🏥 急性期（重症発作・来院時）</div>
              <dl>
                <dt>IV マグネシウム硫酸塩</dt>
                <dd>1–2g を20分で点滴（病院内のみ）</dd>
                <dt>妊娠中</dt>
                <dd>重症発作でも使用可（要専門医管理）</dd>
              </dl>
            </div>

            <h3>エビデンスサマリー</h3>
            <div className="tbl">
              <table>
                <thead>
                  <tr>
                    <th>研究</th>
                    <th>結果</th>
                    <th>グレード</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      Peikert A, et al. <em>Cephalalgia</em> 1996
                    </td>
                    <td>高用量Mg（600mg/日）で発作頻度41.6%減少</td>
                    <td>
                      <span className="bA">Grade A</span>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      Teigen L &amp; Boes CJ. <em>J Headache Pain</em> 2015
                    </td>
                    <td>予防的Mg補充の系統的レビュー — 発作頻度低下を確認</td>
                    <td>
                      <span className="bA">Grade A/B</span>
                    </td>
                  </tr>
                  <tr>
                    <td>Cochrane SR 2025（マグネシウム補充・最新版）</td>
                    <td>推奨、発作頻度・重症度ともに改善</td>
                    <td>
                      <span className="bA">Grade A/B</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="alert a-info">
              <div className="alert-i">📌</div>
              <div>
                <strong>ソース</strong>：
                <Ext href="https://www.cochranelibrary.com/cdsr/doi/10.1002/14651858.CD016307">
                  Cochrane マグネシウム補充 片頭痛予防 2025
                </Ext>
                {" ／ "}
                <Ext href="https://www.aan.com/siteassets/home-page/policy-and-guidelines/guidelines/guidelines-and-measures-open-for-public-comment/24-pharmacologic-treatment-for-migraine-prevention-in-adults_draft_08-14-2024.pdf">
                  AAN/AHS 片頭痛予防ガイドライン 2024（草案）
                </Ext>
                {" ／ "}
                <Ext href="https://pubmed.ncbi.nlm.nih.gov/8734727/">
                  PubMed: Peikert A, et al. 1996
                </Ext>
              </div>
            </div>

            <h3>安全情報</h3>
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
                    <td>主な副作用</td>
                    <td>軟便・下痢（用量依存性）→ 漸増で軽減</td>
                  </tr>
                  <tr>
                    <td>禁忌</td>
                    <td>重篤な腎機能低下（eGFR &lt; 30）→ 慎重投与・定期モニタリング</td>
                  </tr>
                  <tr>
                    <td>薬物相互作用</td>
                    <td>カルシウムチャネル拮抗薬との相乗的降圧作用に注意</td>
                  </tr>
                  <tr>
                    <td>妊娠時</td>
                    <td>IV硫酸マグネシウムは専門医管理下で使用可</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h2>
              3-2. リボフラビン（ビタミンB2 / Riboflavin） <span className="bA">Grade A</span>
            </h2>
            <p>
              <strong>ミトコンドリアのエネルギー産生を根本から改善する</strong>
            </p>

            <h3>なぜ重要か？（病態生理）</h3>
            <p>
              片頭痛患者の脳では、発作間欠期においても
              <strong>ミトコンドリア電子伝達系（ETC）のComplex Iの機能低下</strong>
              が観察されます。リボフラビン（B2）は以下の経路を通じてこの問題を修正します：
            </p>
            <div className="mmd">
              <div className="mmd-lbl">フローチャート — リボフラビンのミトコンドリア作用機序</div>
              <MermaidDiagram
                themeVariables={NUTRITION_MERMAID_THEME}
                chart={`flowchart LR
B2["💊 リボフラビン（B2）\\n400mg/日"]

B2 --> FAD["FAD（フラビンアデニン\\nジヌクレオチド）合成増加"]
B2 --> FMN["FMN（フラビンモノ\\nヌクレオチド）合成増加"]

FAD --> ComplexI["⚡ ミトコンドリア\\nETC Complex I\\n（NADH脱水素酵素）"]
FMN --> ComplexI

ComplexI --> ATP["🔋 ATP産生効率改善"]
ATP --> Stabilize["脳エネルギー代謝安定化"]
Stabilize --> Prevent["💚 CSD閾値上昇\\n→ 片頭痛発作抑制"]

style B2 fill:#f39c12,color:#fff
style Prevent fill:#27ae60,color:#fff
style ComplexI fill:#2980b9,color:#fff`}
              />
            </div>

            <h3>推奨プロトコル</h3>
            <div className="nut-rx">
              <div className="nut-rx-t">💊 リボフラビン（B2）予防プロトコル</div>
              <dl>
                <dt>用量</dt>
                <dd>400 mg/日（単回または2分割）</dd>
                <dt>開始時期</dt>
                <dd>4週間は効果発現しない（蓄積期間）</dd>
                <dt>評価</dt>
                <dd>3ヶ月後に頭痛頻度を再評価</dd>
                <dt>特記事項</dt>
                <dd>尿が黄色〜オレンジ色に変色 — 無害・正常反応（フラビンの尿中排泄）</dd>
              </dl>
            </div>

            <h3>エビデンスサマリー</h3>
            <div className="tbl">
              <table>
                <thead>
                  <tr>
                    <th>研究</th>
                    <th>結果</th>
                    <th>グレード</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      Schoenen J, et al. <em>Neurology</em> 1998
                    </td>
                    <td>400mg/日で頭痛頻度59%減少（vs プラセボ15%）: n=55 RCT</td>
                    <td>
                      <span className="bA">Grade A</span>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      Boehnke C, et al. <em>Eur J Neurol</em> 2004
                    </td>
                    <td>長期（6ヶ月）有効性・安全性の確認</td>
                    <td>
                      <span className="bB">Grade B</span>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      MacLennan SC, et al. <em>J Child Neurol</em> 2008
                    </td>
                    <td>小児（12歳以上）での有効性示唆（成人より弱いエビデンス）</td>
                    <td>
                      <span className="bC">Grade C</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="alert a-info">
              <div className="alert-i">📌</div>
              <div>
                <strong>ソース</strong>：
                <Ext href="https://pubmed.ncbi.nlm.nih.gov/9484373/">
                  Schoenen J, et al. Neurology 1998 — PubMed
                </Ext>
                {" ／ "}
                <Ext href="https://www.aan.com/guidelines/">
                  AAN 片頭痛予防ガイドライン（全リスト）
                </Ext>
                {" ／ "}
                <Ext href="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC9188162/">
                  EHF 片頭痛予防ガイドライン 2022 (PMC全文)
                </Ext>
              </div>
            </div>

            <h3>安全情報</h3>
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
                    <td>副作用</td>
                    <td>極めてまれ；高用量長期でも安全報告多数</td>
                  </tr>
                  <tr>
                    <td>禁忌</td>
                    <td>実質的なし（水溶性ビタミン、過剰分は尿中排泄）</td>
                  </tr>
                  <tr>
                    <td>薬物相互作用</td>
                    <td>
                      三環系抗うつ薬（TCA）がリボフラビン吸収を軽度低下させる可能性（要注意、CI非）
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h2>
              3-3. コエンザイムQ10（CoQ10 / Ubiquinol） <span className="bB">Grade B</span>
            </h2>
            <p>
              <strong>ミトコンドリア電子伝達の「電子シャトル」</strong>
            </p>

            <h3>なぜ重要か？（病態生理）</h3>
            <p>
              CoQ10（ユビキノン/ユビキノール）はミトコンドリアのETC Complex
              I〜IIIの間で電子を受け渡す<strong>不可欠な補酵素</strong>
              です。片頭痛患者のCoQ10欠乏（血漿レベル低下）が複数の研究で確認されています。
            </p>
            <div className="tbl">
              <table>
                <thead>
                  <tr>
                    <th>機序</th>
                    <th>説明</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <strong>ETC Complex I/III サポート</strong>
                    </td>
                    <td>電子伝達の効率化 → ATP産生量改善</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>抗酸化作用</strong>
                    </td>
                    <td>活性酸素（ROS）を直接中和 → 神経炎症軽減</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>膜安定化</strong>
                    </td>
                    <td>細胞膜とミトコンドリア膜の脂質過酸化を抑制</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3>製剤の選択</h3>
            <div className="tbl">
              <table>
                <thead>
                  <tr>
                    <th>剤形</th>
                    <th>特徴</th>
                    <th>推奨度</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <strong>ユビキノール（還元型CoQ10）</strong>
                    </td>
                    <td>吸収率が高い（特に高齢者・吸収障害例）</td>
                    <td>第一選択 ⭐⭐⭐⭐⭐</td>
                  </tr>
                  <tr>
                    <td>ユビキノン（酸化型CoQ10）</td>
                    <td>標準剤形、RCTデータはこちらで多い</td>
                    <td>代替 ⭐⭐⭐⭐</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="nut-rx">
              <div className="nut-rx-t">💊 CoQ10 推奨プロトコル</div>
              <dl>
                <dt>用量</dt>
                <dd>
                  300 mg/日（100mgを3回に分割 — 脂溶性のため食後推奨）／または
                  300mg単回（ユビキノール製剤なら吸収効率良好）
                </dd>
                <dt>評価</dt>
                <dd>3ヶ月後に頭痛頻度を再評価</dd>
                <dt>スタチン服用者</dt>
                <dd>CoQ10が枯渇しやすいため補充を特に推奨</dd>
              </dl>
            </div>

            <h3>エビデンスサマリー</h3>
            <div className="tbl">
              <table>
                <thead>
                  <tr>
                    <th>研究</th>
                    <th>結果</th>
                    <th>グレード</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      Sándor PS, et al. <em>Neurology</em> 2005
                    </td>
                    <td>300mg/日で頭痛頻度47.6%改善（vs プラセボ14.4%）: n=42 RCT</td>
                    <td>
                      <span className="bB">Grade B</span>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      Hershey AD, et al. <em>Headache</em> 2007
                    </td>
                    <td>小児・青年の片頭痛でCoQ10欠乏と頭痛頻度の相関</td>
                    <td>
                      <span className="bC">Grade C</span>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      Shoeibi A, et al. <em>Nutr Neurosci</em> 2017
                    </td>
                    <td>トピラマートとCoQ10の比較RCT — 非劣性示唆</td>
                    <td>
                      <span className="bB">Grade B</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="alert a-info">
              <div className="alert-i">📌</div>
              <div>
                <strong>ソース</strong>：
                <Ext href="https://pubmed.ncbi.nlm.nih.gov/15728298/">
                  Sándor PS, et al. Neurology 2005 — PubMed
                </Ext>
                {" ／ "}
                <Ext href="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC9188162/">
                  EHF CGRP mAbsガイドライン 2022
                </Ext>
                {" ／ "}
                <Ext href="https://thejournalofheadacheandpain.biomedcentral.com/">
                  Journal of Headache and Pain
                </Ext>
              </div>
            </div>

            <h3>安全情報</h3>
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
                    <td>副作用</td>
                    <td>まれ；軽度の消化器症状（食後摂取で軽減）</td>
                  </tr>
                  <tr>
                    <td>スタチン服用者</td>
                    <td>スタチンはCoQ10産生を抑制 → 補充を特に推奨</td>
                  </tr>
                  <tr>
                    <td>抗凝固薬</td>
                    <td>ワルファリンとの相互作用報告あり（INRモニタリング）</td>
                  </tr>
                  <tr>
                    <td>妊娠</td>
                    <td>安全データ限定的 — 妊娠中は担当医に相談</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h2>3-4. マグネシウム + B2 + CoQ10 三剤併用プロトコル</h2>
            <p>
              この3剤はミトコンドリア代謝の<strong>異なる段階に作用する相補的な組み合わせ</strong>
              です。
            </p>
            <div className="mmd">
              <div className="mmd-lbl">
                フローチャート — 三剤のミトコンドリア電子伝達系における作用点
              </div>
              <MermaidDiagram
                themeVariables={NUTRITION_MERMAID_THEME}
                chart={`flowchart TD
Input["🍎 食事摂取\\nエネルギー基質（グルコース・脂肪酸）"]

Input --> Glycolysis["解糖系\\nグルコース → ピルビン酸"]
Glycolysis --> TCA["TCAサイクル\\nピルビン酸 → NADH / FADH₂"]

TCA --> C1["Complex I\\nNADH脱水素酵素"]
TCA --> C2["Complex II\\nコハク酸脱水素酵素"]
C1 --> CoQ10Chain["🔄 CoQ10 電子シャトル"]
C2 --> CoQ10Chain
CoQ10Chain --> C3["Complex III\\nシトクロムbc₁複合体"]
C3 --> Cytc["シトクロムc"]
Cytc --> C4["Complex IV\\nシトクロムcオキシダーゼ"]
C4 --> O2["O₂ → H₂O"]

C1 & C2 & C3 & C4 --> ATP_Synth["Complex V（ATP合成酵素）"]
ATP_Synth --> ATP["⚡ ATP 産生"]

Mg_effect["🧲 Mg²⁺\\n→ ATP合成酵素の補因子\\n→ NMDA受容体チャネル調節"] -.->|補助| ATP_Synth
B2_effect["🟡 B2（リボフラビン）\\n→ FAD/FMN供与\\n→ Complex Iを直接活性化"] -.->|補助| C1
CoQ10_effect["⚡ CoQ10（ユビキノール）\\n→ Complex I–III間\\n電子伝達を仲介"] -.->|補助| CoQ10Chain

style ATP fill:#f39c12,color:#fff
style Mg_effect fill:#27ae60,color:#fff
style B2_effect fill:#f39c12,color:#fff
style CoQ10_effect fill:#2980b9,color:#fff`}
              />
            </div>

            <h3>三剤の標準的な1日プロトコル例</h3>
            <div className="tbl">
              <table>
                <thead>
                  <tr>
                    <th>時間帯</th>
                    <th>服用</th>
                    <th>用量</th>
                    <th>備考</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>朝食後</td>
                    <td>リボフラビン（B2）</td>
                    <td>200mg</td>
                    <td>水溶性 — 食後推奨</td>
                  </tr>
                  <tr>
                    <td>昼食後</td>
                    <td>CoQ10（ユビキノール）</td>
                    <td>100mg</td>
                    <td>脂溶性 — 必ず食後</td>
                  </tr>
                  <tr>
                    <td>夕食後</td>
                    <td>CoQ10（ユビキノール）</td>
                    <td>100mg</td>
                    <td>脂溶性 — 必ず食後</td>
                  </tr>
                  <tr>
                    <td>夕食後</td>
                    <td>CoQ10（ユビキノール）</td>
                    <td>100mg（合計300mg）</td>
                    <td>分割で吸収効率改善</td>
                  </tr>
                  <tr>
                    <td>就寝前</td>
                    <td>リボフラビン（B2）</td>
                    <td>200mg（合計400mg）</td>
                    <td>夜間代謝をサポート</td>
                  </tr>
                  <tr>
                    <td>朝夜に分割</td>
                    <td>マグネシウム（グリシン酸塩）</td>
                    <td>各200–300mg（合計400–600mg）</td>
                    <td>食後推奨、消化器副作用↓</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="alert a-warn">
              <div className="alert-i">⚠️</div>
              <div>
                <strong>重要</strong>
                ：この組み合わせは一般的に安全ですが、他の薬剤を服用している場合は必ず医師・薬剤師に相談してください。
              </div>
            </div>
          </section>

          {/* ====================================================== SECTION 4 */}
          <section id="s4" className="sec">
            <div className="sec-hd">
              <div className="sec-num">4</div>
              <h1 className="sec-title">STEP 2 — 中等度エビデンスサプリメント（Grade C）</h1>
            </div>

            <h2>
              4-1. メラトニン（Melatonin） <span className="bC">Grade C</span>
            </h2>
            <div className="tbl">
              <table>
                <thead>
                  <tr>
                    <th>項目</th>
                    <th>詳細</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <strong>推奨用量</strong>
                    </td>
                    <td>3mg（就寝30〜60分前）</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>主な機序</strong>
                    </td>
                    <td>抗酸化作用 / 概日リズム調節 / 5-HT合成サポート / 内因性鎮痛</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>最適な対象</strong>
                    </td>
                    <td>睡眠障害を合併する片頭痛患者 / 群発頭痛との共存例</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>特記事項</strong>
                    </td>
                    <td>
                      プロプラノロールと同等の予防効果を示したRCTあり（Gonçalves et al. 2016）
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <strong>副作用</strong>
                    </td>
                    <td>日中の眠気 / 起床困難 → 就寝直前に服用</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>禁忌</strong>
                    </td>
                    <td>自己免疫疾患（潜在的免疫調節作用）/ 重篤な肝障害</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="alert a-info">
              <div className="alert-i">📌</div>
              <div>
                <strong>ソース</strong>：
                <Ext href="https://pubmed.ncbi.nlm.nih.gov/26898255/">
                  Gonçalves AL, et al. <em>J Neurol</em> 2016 — PubMed
                </Ext>
              </div>
            </div>

            <h2>
              4-2. α-リポ酸（Alpha-Lipoic Acid / ALA） <span className="bC">Grade C</span>
            </h2>
            <div className="tbl">
              <table>
                <thead>
                  <tr>
                    <th>項目</th>
                    <th>詳細</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <strong>推奨用量</strong>
                    </td>
                    <td>600mg/日（単回または分割）</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>主な機序</strong>
                    </td>
                    <td>
                      強力な抗酸化作用（水溶性・脂溶性双方）/ 神経保護 / ミトコンドリア機能改善
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <strong>主な副作用</strong>
                    </td>
                    <td>低血糖リスク（特に糖尿病患者）/ チアミン欠乏の潜在的リスク</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>禁忌</strong>
                    </td>
                    <td>インスリン・血糖降下薬との相互作用（血糖モニタリング必須）</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>チアミン注意</strong>
                    </td>
                    <td>高用量長期使用でビタミンB1欠乏を引き起こす可能性（B1補充を考慮）</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="alert a-info">
              <div className="alert-i">📌</div>
              <div>
                <strong>ソース</strong>：
                <Ext href="https://pubmed.ncbi.nlm.nih.gov/17355549/">
                  Magis D, et al. <em>Eur J Neurol</em> 2007 — PubMed
                </Ext>
              </div>
            </div>

            <h2>
              4-3. オメガ3脂肪酸（EPA + DHA） <span className="bC">Grade C</span>
            </h2>
            <div className="tbl">
              <table>
                <thead>
                  <tr>
                    <th>項目</th>
                    <th>詳細</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <strong>推奨用量</strong>
                    </td>
                    <td>1〜3g/日（EPA + DHAの合計）</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>主な機序</strong>
                    </td>
                    <td>
                      プロスタグランジンE₂（炎症性）からEPAを経たエイコサノイドへのシフト /
                      神経炎症を抑制
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <strong>最適な対象</strong>
                    </td>
                    <td>食事でのオメガ3摂取が少ない患者 / 心血管リスクを持つ患者</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>重要な相互作用</strong>
                    </td>
                    <td>
                      <strong>
                        &gt;3g/日 + 抗凝固薬（ワルファリン等）→ 出血リスク↑ / INRモニタリング必須
                      </strong>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <strong>副作用</strong>
                    </td>
                    <td>魚のげっぷ（腸溶性製剤で軽減）/ 胃腸不快感</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="alert a-ok">
              <div className="alert-i">✅</div>
              <div>
                <strong>MOH注意</strong>
                ：オメガ3は急性鎮痛目的の薬剤ではないため、使用頻度制限の問題はありません。
              </div>
            </div>
            <div className="alert a-info">
              <div className="alert-i">📌</div>
              <div>
                <strong>ソース</strong>：
                <Ext href="https://pubmed.ncbi.nlm.nih.gov/34112693/">
                  Ramsden CE, et al. <em>BMJ</em> 2021 — PubMed
                </Ext>
              </div>
            </div>

            <h2>
              4-4. ショウガエキス（Ginger Extract） <span className="bC">Grade C</span>
            </h2>
            <div className="tbl">
              <table>
                <thead>
                  <tr>
                    <th>項目</th>
                    <th>詳細</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <strong>推奨用量</strong>
                    </td>
                    <td>250mg（急性発作の補助 / 制吐目的）</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>主な機序</strong>
                    </td>
                    <td>5-HT₃拮抗作用（制吐）/ プロスタグランジン合成阻害</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>最適な対象</strong>
                    </td>
                    <td>吐き気・嘔吐が前景症状の軽症〜中等症発作</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>禁忌注意</strong>
                    </td>
                    <td>抗血小板薬 / ワルファリンとの出血リスク / 術前2週間は中止</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="alert a-info">
              <div className="alert-i">📌</div>
              <div>
                <strong>ソース</strong>：
                <Ext href="https://pubmed.ncbi.nlm.nih.gov/24254706/">
                  Maghbooli M, et al. <em>Phytother Res</em> 2014 — PubMed
                </Ext>
              </div>
            </div>
          </section>

          {/* ====================================================== SECTION 5 */}
          <section id="s5" className="sec">
            <div className="sec-hd">
              <div className="sec-num">5</div>
              <h1 className="sec-title">STEP 3 — 要注意サプリメント — 正しく使わないと危険</h1>
            </div>

            <div className="alert a-danger">
              <div className="alert-i">⚠️</div>
              <div>
                <strong>このセクションは特に重要です。</strong>{" "}
                以下のサプリメントは「自然由来＝安全」ではなく、
                <strong>
                  適切なモニタリングと管理なしには重篤な副作用を引き起こす可能性があります。
                </strong>
              </div>
            </div>

            <h2>
              5-1. フィーバーフュー（Feverfew / タナセタム・パルテニウム）{" "}
              <span className="bC">Grade C</span>
            </h2>
            <h3>概要と注意点</h3>
            <div className="tbl">
              <table>
                <thead>
                  <tr>
                    <th>項目</th>
                    <th>詳細</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <strong>有効成分</strong>
                    </td>
                    <td>パルテノライド（セスキテルペンラクトン）</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>推奨製剤</strong>
                    </td>
                    <td>MIG-99 標準化エキス（パルテノライド含量0.2%以上）</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>エビデンスグレード</strong>
                    </td>
                    <td>Grade C（RCT結果が混在 — Cochrane SRで不一致）</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>推奨用量</strong>
                    </td>
                    <td>50–100mg/日（MIG-99換算）</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <h3>重要な安全情報</h3>
            <div className="tbl th-red">
              <table>
                <thead>
                  <tr>
                    <th>リスク</th>
                    <th>詳細</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <strong>⚠️ 出血リスク</strong>
                    </td>
                    <td>
                      <strong>
                        ワルファリン・抗血小板薬（アスピリン等）と併用 → 出血リスク大幅増加
                      </strong>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <strong>術前中止</strong>
                    </td>
                    <td>手術2週間前には必ず中止</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>肝毒性</strong>
                    </td>
                    <td>長期使用で肝酵素上昇の報告 → 定期的なLFT（肝機能検査）推奨</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>突然中止禁忌</strong>
                    </td>
                    <td>&quot;Feverfew Syndrome&quot;（頭痛反跳・筋硬直・関節痛）→ 漸減すること</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>妊婦禁忌</strong>
                    </td>
                    <td>子宮収縮促進作用の懸念</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>アレルギー</strong>
                    </td>
                    <td>キク科アレルギー（カモミール・デイジー）との交差反応</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="alert a-info">
              <div className="alert-i">📌</div>
              <div>
                <strong>ソース</strong>：
                <Ext href="https://www.cochranelibrary.com/search?query=feverfew+migraine&amp;searchBy=3&amp;type=cdsr">
                  Pittler MH, et al. Cochrane Review 2004 — Cochrane Library
                </Ext>
              </div>
            </div>

            <h2>
              5-2. バターバー（Butterbur / Petasites hybridus） <span className="bC">Grade C</span>
            </h2>
            <h3>概要</h3>
            <div className="tbl">
              <table>
                <thead>
                  <tr>
                    <th>項目</th>
                    <th>詳細</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <strong>有効成分</strong>
                    </td>
                    <td>ペタシン / イソペタシン</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>推奨製剤</strong>
                    </td>
                    <td>
                      <strong>PA-free（ピロリジジンアルカロイド除去）認定品のみ</strong> — 例:
                      Petadolex®
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <strong>エビデンスグレード</strong>
                    </td>
                    <td>Grade C（過去Grade Bから格下げ — 安全懸念のため）</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>推奨用量</strong>
                    </td>
                    <td>75mg 1日2回（PA-free製品使用時）</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="alert a-danger">
              <div className="alert-i">🚨</div>
              <div>
                <strong>
                  ⛔ 最重要警告：非認定品（PA含有）バターバーは絶対に使用してはならない。
                </strong>
                <br />
                ピロリジジンアルカロイド（PA）は<strong>肝静脈閉塞症（VOD）や肝細胞障害</strong>
                を引き起こす可能性がある。複数の重篤肝障害症例が報告されており、欧州医薬品庁（EMA）はPA含有バターバー製品の販売禁止措置を複数国で実施している。
              </div>
            </div>
            <div className="tbl th-red">
              <table>
                <thead>
                  <tr>
                    <th>リスク</th>
                    <th>詳細</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <strong>🔴 肝毒性（最重要）</strong>
                    </td>
                    <td>PA含有製品 → 肝静脈閉塞症 / 肝炎 / 肝不全リスク</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>⚠️ PA-free品でも</strong>
                    </td>
                    <td>定期的LFT（肝機能検査）モニタリングを推奨（3ヶ月毎）</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>妊婦禁忌</strong>
                    </td>
                    <td>妊娠・授乳中は絶対禁忌</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>小児禁忌</strong>
                    </td>
                    <td>18歳未満への安全性データ不十分</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>免疫抑制剤</strong>
                    </td>
                    <td>相互作用データ限定的 → 使用禁忌</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="alert a-info">
              <div className="alert-i">📌</div>
              <div>
                <strong>ソース</strong>：
                <Ext href="https://www.ema.europa.eu/en/medicines/herbal">
                  EMA バターバー安全評価レポート
                </Ext>
                {" ／ "}
                <Ext href="https://pubmed.ncbi.nlm.nih.gov/15148345/">
                  Lipton RB, et al. <em>Neurology</em> 2004 — PubMed
                </Ext>
              </div>
            </div>

            <h2>
              5-3. ビタミンD <span className="bC">Grade C</span>
            </h2>
            <div className="tbl">
              <table>
                <thead>
                  <tr>
                    <th>項目</th>
                    <th>詳細</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <strong>推奨条件</strong>
                    </td>
                    <td>
                      <strong>血清ビタミンD濃度 &lt; 30 ng/mL（欠乏）の確認後のみ補充を考慮</strong>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <strong>エビデンスグレード</strong>
                    </td>
                    <td>Grade C — 頭痛への直接効果のエビデンスは限定的</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>なぜ関連するか</strong>
                    </td>
                    <td>VDRが三叉神経・脊髄後角に発現 / 免疫調節 / 神経保護</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>補充用量</strong>
                    </td>
                    <td>欠乏時: 1,000〜2,000 IU/日（医師の判断で高用量使用可）</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>注意事項</strong>
                    </td>
                    <td>
                      過剰補充 → <strong>高カルシウム血症</strong>（腎障害・血管石灰化）
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <strong>禁忌</strong>
                    </td>
                    <td>高カルシウム血症 / 原発性副甲状腺機能亢進症</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h2>
              5-4. 🚫 高用量ビタミンB6（&gt;200mg/日）— 禁忌 <span className="bRed">禁忌</span>
            </h2>
            <div className="alert a-danger">
              <div className="alert-i">⛔</div>
              <div>
                <strong>この用量は絶対に推奨しない。</strong>
              </div>
            </div>
            <div className="tbl th-red">
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
                      <strong>リスク</strong>
                    </td>
                    <td>
                      用量依存性の<strong>末梢神経障害（感覚神経優位の多発神経障害）</strong>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <strong>Threshold（閾値）</strong>
                    </td>
                    <td>一般的に &gt;200mg/日で発症リスク上昇（100mg/日でも長期連用は要注意）</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>症状</strong>
                    </td>
                    <td>四肢の痺れ・感覚鈍麻・歩行障害</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>回復</strong>
                    </td>
                    <td>中止後に改善するが、重篤例では不可逆</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>適切な用量</strong>
                    </td>
                    <td>B6の頭痛効果のエビデンスは乏しい — 標準食事摂取量（1.3–1.7mg/日）で十分</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="alert a-info">
              <div className="alert-i">📌</div>
              <div>
                <strong>ソース</strong>：
                <Ext href="https://www.who.int/">WHO ビタミンB6安全性評価</Ext>
              </div>
            </div>
          </section>

          {/* ====================================================== SECTION 6 */}
          <section id="s6" className="sec">
            <div className="sec-hd">
              <div className="sec-num">6</div>
              <h1 className="sec-title">STEP 4 — 食事性トリガー管理</h1>
            </div>

            <h2>6-1. 主要な食事性トリガーの分類</h2>
            <div className="alert a-info">
              <div className="alert-i">ℹ️</div>
              <div>
                <strong>重要な前提</strong>
                ：食事性トリガーは高度に個人差があります。特定食品を無闇に排除するのではなく、
                <strong>30日以上の頭痛日記</strong>
                でご自身のパターンを確認してから対応することが最も科学的です。
              </div>
            </div>
            <div className="tbl">
              <table>
                <thead>
                  <tr>
                    <th>トリガー種別</th>
                    <th>主な食品</th>
                    <th>推定機序</th>
                    <th>証拠の質</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <strong>チラミン</strong>
                    </td>
                    <td>熟成チーズ（パルメザン等）・ワイン・発酵食品・味噌・醤油</td>
                    <td>MAO阻害下でのカテコールアミン放出</td>
                    <td>中程度</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>ヒスタミン</strong>
                    </td>
                    <td>赤ワイン・サバ等青魚・加工肉・缶詰</td>
                    <td>血管拡張・神経ペプチド放出</td>
                    <td>中程度</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>亜硝酸塩</strong>
                    </td>
                    <td>ハム・ベーコン・ソーセージ・加工肉一般</td>
                    <td>一酸化窒素（NO）産生 → 血管拡張</td>
                    <td>中程度</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>カフェイン</strong>
                    </td>
                    <td>コーヒー・紅茶・エナジードリンク・一部鎮痛薬</td>
                    <td>
                      <strong>離脱時のリバウンド頭痛</strong>が最大の問題
                    </td>
                    <td>高い</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>アスパルテーム</strong>
                    </td>
                    <td>ダイエット飲料・人工甘味料使用食品</td>
                    <td>フェニルアラニン / アスパラギン酸の神経興奮性</td>
                    <td>限定的</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>MSG（グルタミン酸ナトリウム）</strong>
                    </td>
                    <td>加工食品・インスタント麺・中華料理</td>
                    <td>一過性の神経興奮作用</td>
                    <td>限定的</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>アルコール一般</strong>
                    </td>
                    <td>特に赤ワイン・ビール</td>
                    <td>ヒスタミン・チラミン・血管拡張</td>
                    <td>高い</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>スキップミール</strong>
                    </td>
                    <td>食事抜き・絶食</td>
                    <td>低血糖 → 交感神経系活性化</td>
                    <td>高い</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>脱水</strong>
                    </td>
                    <td>水分不足（&lt; 1.5L/日）</td>
                    <td>脳容積減少 → 硬膜伸張</td>
                    <td>高い</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h2>6-2. カフェイン管理の重要性</h2>
            <div className="mmd">
              <div className="mmd-lbl">フローチャート — カフェイン依存と離脱頭痛のサイクル</div>
              <MermaidDiagram
                themeVariables={NUTRITION_MERMAID_THEME}
                chart={`flowchart TD
Caffeine["☕ カフェイン常用\\n（&gt;200mg/日）"]

Caffeine --> Tolerance["アデノシン受容体の上方制御\\n（カフェイン耐性形成）"]
Tolerance --> Dependency["カフェイン依存状態"]
Dependency --> Withdrawal["⚠️ 急な摂取中断\\n（&gt;24時間）"]
Withdrawal --> Rebound["🔴 カフェイン離脱頭痛\\n（両側性・拍動性・悪心を伴う）\\n通常12–24時間後に発症"]

Rebound --> MoreCaffeine["再びカフェイン摂取\\n→ 一時的な緩和"]
MoreCaffeine --> Dependency

Solution["✅ 正しい対応\\n段階的な減量（weekly 10–20%ずつ）\\n急な中断は禁忌"]

style Rebound fill:#c0392b,color:#fff
style Solution fill:#27ae60,color:#fff
style Dependency fill:#e74c3c,color:#fff`}
              />
            </div>
            <div className="card">
              <h3>推奨カフェイン管理</h3>
              <ul>
                <li>
                  目標摂取量: <strong>&lt; 200mg/日</strong>（コーヒー1〜2杯相当）
                </li>
                <li>漸減ペース: 1〜2週ごとに現在量の10〜20%を減量</li>
                <li>中断禁忌: 急激な中断は離脱頭痛を誘発</li>
              </ul>
            </div>

            <h2>6-3. 頭痛トリガー日記（標準フォーマット）</h2>
            <div className="tbl">
              <table>
                <thead>
                  <tr>
                    <th>記録日時</th>
                    <th>発症時刻</th>
                    <th>強度(VAS 0-10)</th>
                    <th>直前12時間の食事</th>
                    <th>水分量</th>
                    <th>睡眠時間</th>
                    <th>推定トリガー</th>
                    <th>使用薬剤・効果</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>〇月〇日</td>
                    <td>〇時〇分</td>
                    <td>/ 10</td>
                    <td>（具体的に記録）</td>
                    <td>L</td>
                    <td>時間</td>
                    <td />
                    <td />
                  </tr>
                  <tr>
                    <td>〇月〇日</td>
                    <td>〇時〇分</td>
                    <td>/ 10</td>
                    <td />
                    <td>L</td>
                    <td>時間</td>
                    <td />
                    <td />
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="alert a-ok">
              <div className="alert-i">📝</div>
              <div>
                <strong>推奨記録期間</strong>：最低30日間（治療開始前のベースライン確立）
              </div>
            </div>
          </section>

          {/* ====================================================== SECTION 7 */}
          <section id="s7" className="sec">
            <div className="sec-hd">
              <div className="sec-num">7</div>
              <h1 className="sec-title">STEP 5 — MOHリスク評価との統合</h1>
            </div>

            <h2>7-1. MOHとは何か</h2>
            <p>
              <strong>薬物乱用頭痛（MOH: Medication-Overuse Headache）</strong>
              は、急性期鎮痛薬の過剰使用により逆説的に頭痛が増加するという、頭痛医学における最も重要な落とし穴の一つです（ICHD-3コード:
              8.2）。
            </p>
            <div className="alert a-warn">
              <div className="alert-i">⚠️</div>
              <div>
                <strong>栄養補助療法とMOHの関係</strong>
                ：サプリメントはMOHを引き起こしません。しかし、MOHが存在する場合、サプリメントの効果も制限される可能性があります。必ずMOHリスクを先に評価してください。
              </div>
            </div>
            <div className="mmd">
              <div className="mmd-lbl">
                フローチャート — MOH スクリーニングと栄養補助療法の開始判断
              </div>
              <MermaidDiagram
                themeVariables={NUTRITION_MERMAID_THEME}
                chart={`flowchart TD
START(["🔍 STEP 0: 急性期薬剤の使用歴を確認する\\n（ICHD-3 MOH診断基準 8.2）"])

START --> A{"💊 単純鎮痛薬 / NSAIDs\\n（イブプロフェン・アセトアミノフェン等）\\n≥ 15日/月 かつ ≥ 3ヶ月 継続？"}
A -->|"⚠️ はい"| MOH_FLAG
A -->|"いいえ"| B

B{"💊 トリプタン / エルゴタミン / オピオイド\\n≥ 10日/月 かつ ≥ 3ヶ月 継続？"}
B -->|"⚠️ はい"| MOH_FLAG
B -->|"いいえ"| C

C{"💊 配合鎮痛薬（複合成分製剤）\\n≥ 10日/月 かつ ≥ 3ヶ月 継続？"}
C -->|"⚠️ はい"| MOH_FLAG
C -->|"いいえ"| D

D{"複数薬剤を組み合わせて\\n合計 ≥ 10日/月 使用？"}
D -->|"⚠️ はい"| MOH_FLAG
D -->|"いいえ"| SAFE

SAFE["✅ 現時点のMOHリスク低\\n→ 栄養補助療法の並行開始を検討"]

MOH_FLAG["🚨 MOH 疑い（ICHD-3: 8.2）\\n→ まず頭痛専門医への紹介を優先"]

MOH_FLAG --> NUTR_ADJUNCT["📝 MOH管理中の栄養補助療法\\nMg + B2 + CoQ10 は\\nMOH患者にも安全に使用可能\\n予防効果の補助として継続推奨"]

SAFE --> NUTR_START["🌿 栄養補助療法の開始\\nSTEP 1のプロトコルを参照"]

style MOH_FLAG fill:#c0392b,color:#fff
style SAFE fill:#27ae60,color:#fff
style NUTR_ADJUNCT fill:#e67e22,color:#fff
style NUTR_START fill:#27ae60,color:#fff`}
              />
            </div>
            <div className="alert a-info">
              <div className="alert-i">📌</div>
              <div>
                <strong>ソース</strong>：
                <Ext href="https://ichd-3.org/8-headache-attributed-to-a-substance-or-its-withdrawal/8-2-medication-overuse-headache-moh/">
                  ICHD-3 MOH（薬物乱用頭痛）診断基準 8.2
                </Ext>
              </div>
            </div>
          </section>

          {/* ====================================================== SECTION 8 */}
          <section id="s8" className="sec">
            <div className="sec-hd">
              <div className="sec-num">8</div>
              <h1 className="sec-title">STEP 6 — 薬物・サプリメント相互作用チェックリスト</h1>
            </div>

            <div className="alert a-danger">
              <div className="alert-i">⚠️</div>
              <div>
                <strong>
                  このチェックリストは毎回のサプリメント開始前に必ず確認してください。
                </strong>
              </div>
            </div>

            <h2>8-1. 重大な相互作用（使用禁忌または厳重管理）</h2>
            <div className="tbl th-red">
              <table>
                <thead>
                  <tr>
                    <th>サプリメント</th>
                    <th>相互作用薬</th>
                    <th>リスク</th>
                    <th>対応</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <strong>フィーバーフュー</strong>
                    </td>
                    <td>ワルファリン / 抗血小板薬</td>
                    <td>出血リスク大幅増加</td>
                    <td>
                      <strong>⛔ 併用回避</strong>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <strong>フィーバーフュー</strong>
                    </td>
                    <td>術前</td>
                    <td>出血リスク</td>
                    <td>
                      <strong>手術2週間前に中止</strong>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <strong>オメガ3 &gt;3g/日</strong>
                    </td>
                    <td>抗凝固薬（ワルファリン）</td>
                    <td>INR変動・出血リスク</td>
                    <td>
                      <strong>INRモニタリング必須</strong>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <strong>バターバー（PA含有品）</strong>
                    </td>
                    <td>—</td>
                    <td>肝静脈閉塞症</td>
                    <td>
                      <strong>⛔ 絶対使用禁止</strong>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <strong>バターバー（PA-free品）</strong>
                    </td>
                    <td>免疫抑制剤</td>
                    <td>相互作用不明</td>
                    <td>
                      <strong>⛔ 使用禁忌</strong>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <strong>高用量B6 &gt;200mg/日</strong>
                    </td>
                    <td>—</td>
                    <td>末梢神経障害</td>
                    <td>
                      <strong>⛔ この用量禁忌</strong>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <strong>ショウガエキス</strong>
                    </td>
                    <td>抗血小板薬 / ワルファリン</td>
                    <td>出血リスク</td>
                    <td>注意・モニタリング</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>α-リポ酸</strong>
                    </td>
                    <td>インスリン / 血糖降下薬</td>
                    <td>低血糖</td>
                    <td>血糖モニタリング強化</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>CoQ10</strong>
                    </td>
                    <td>ワルファリン</td>
                    <td>INR変動</td>
                    <td>INRモニタリング推奨</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>マグネシウム</strong>
                    </td>
                    <td>Caチャネル拮抗薬</td>
                    <td>相乗的降圧作用</td>
                    <td>血圧モニタリング</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>高用量オメガ3</strong>
                    </td>
                    <td>アスピリン</td>
                    <td>出血リスク強化</td>
                    <td>モニタリング</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>バターバー（PA-free）</strong>
                    </td>
                    <td>定期LFT</td>
                    <td>肝保護目的</td>
                    <td>3ヶ月毎に肝機能検査</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h2>8-2. 片頭痛の主要薬物との相互作用（サプリ視点）</h2>
            <div className="tbl">
              <table>
                <thead>
                  <tr>
                    <th>主要薬</th>
                    <th>関連サプリ</th>
                    <th>注意事項</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <strong>トリプタン</strong>
                    </td>
                    <td>—</td>
                    <td>サプリとの直接的な重大相互作用は少ない</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>SSRIs/SNRIs</strong>
                    </td>
                    <td>5-HTPサプリ（本ガイド範囲外）</td>
                    <td>セロトニン症候群リスク</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>MAO阻害薬</strong>
                    </td>
                    <td>チラミン高含有食品</td>
                    <td>高血圧クリーゼリスク（本ガイド記載の食事トリガー参照）</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>バルプロ酸</strong>
                    </td>
                    <td>CoQ10</td>
                    <td>バルプロ酸がCoQ10産生を阻害 → 補充を考慮</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>スタチン</strong>
                    </td>
                    <td>CoQ10</td>
                    <td>
                      スタチンがCoQ10産生を阻害 → <strong>補充を積極的に推奨</strong>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <strong>利尿薬</strong>
                    </td>
                    <td>マグネシウム</td>
                    <td>利尿薬がMg排泄を増加 → 補充を考慮</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* ====================================================== SECTION 9 */}
          <section id="s9" className="sec">
            <div className="sec-hd">
              <div className="sec-num">9</div>
              <h1 className="sec-title">STEP 7 — 特別集団への配慮</h1>
            </div>

            <h2>9-1. 集団別サプリメント安全ガイド</h2>
            <div className="mmd">
              <div className="mmd-lbl">フローチャート — 患者プロファイル別の安全性判断</div>
              <MermaidDiagram
                themeVariables={NUTRITION_MERMAID_THEME}
                chart={`flowchart TD
Patient["👤 患者プロファイルを確認"]

Patient --> Ped["👶 小児（&lt; 12歳）"]
Patient --> Teen["🧑 青年期（12–18歳）"]
Patient --> Preg["🤰 妊娠・授乳中"]
Patient --> Elderly["👴 高齢者（&gt; 65歳）"]
Patient --> Renal["🫁 腎機能低下"]

Ped --> Ped_Safe["✅ 安全: Mg（低用量）・B2\\n⚠️ CoQ10は12歳以下データ限定\\n❌ バターバー・フィーバーフュー禁忌"]
Teen --> Teen_Safe["✅ 安全: Mg・B2・CoQ10\\n⚠️ バターバーは18歳未満禁忌\\n✅ メラトニンは入眠障害合併に有効"]
Preg --> Preg_Safe["✅ 安全: Mg（食事量程度）・B2\\n⚠️ CoQ10: 安全データ限定 → 医師相談\\n❌ フィーバーフュー禁忌（子宮収縮）\\n❌ バターバー禁忌\\n⚠️ オメガ3: 2g/日以下推奨"]
Elderly --> Elderly_Safe["✅ Mg（グリシン酸優先）・B2・CoQ10\\n⚠️ Mg: 腎機能確認必須\\n⚠️ メラトニン: 低用量（0.5–1mg）から開始\\n✅ ユビキノール: 高齢者に特に推奨"]
Renal --> Renal_Safe["⚠️ Mg: eGFR&lt; 30で禁忌または厳重管理\\n✅ B2: 安全（水溶性）\\n✅ CoQ10: 安全\\n⚠️ α-リポ酸: 代謝変化に注意"]

style Preg fill:#fce4ec,stroke:#880e4f
style Renal fill:#fff3e0,stroke:#e65100`}
              />
            </div>

            <h2>9-2. 集団別推奨サマリー表</h2>
            <div className="tbl">
              <table>
                <thead>
                  <tr>
                    <th>サプリメント</th>
                    <th>小児</th>
                    <th>青年期</th>
                    <th>妊娠中</th>
                    <th>授乳中</th>
                    <th>高齢者</th>
                    <th>腎機能低下</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>マグネシウム</td>
                    <td>✅</td>
                    <td>✅</td>
                    <td>✅</td>
                    <td>✅</td>
                    <td>✅⚠️</td>
                    <td>⚠️（eGFR確認）</td>
                  </tr>
                  <tr>
                    <td>リボフラビン（B2）</td>
                    <td>✅</td>
                    <td>✅</td>
                    <td>✅</td>
                    <td>✅</td>
                    <td>✅</td>
                    <td>✅</td>
                  </tr>
                  <tr>
                    <td>CoQ10</td>
                    <td>⚠️</td>
                    <td>✅</td>
                    <td>⚠️</td>
                    <td>⚠️</td>
                    <td>✅</td>
                    <td>✅</td>
                  </tr>
                  <tr>
                    <td>メラトニン</td>
                    <td>⚠️</td>
                    <td>✅</td>
                    <td>❌</td>
                    <td>❌</td>
                    <td>✅（低用量）</td>
                    <td>⚠️</td>
                  </tr>
                  <tr>
                    <td>オメガ3</td>
                    <td>✅（低用量）</td>
                    <td>✅</td>
                    <td>✅（≤2g）</td>
                    <td>✅</td>
                    <td>✅</td>
                    <td>✅</td>
                  </tr>
                  <tr>
                    <td>α-リポ酸</td>
                    <td>❌</td>
                    <td>⚠️</td>
                    <td>❌</td>
                    <td>❌</td>
                    <td>⚠️</td>
                    <td>⚠️</td>
                  </tr>
                  <tr>
                    <td>フィーバーフュー</td>
                    <td>❌</td>
                    <td>⚠️</td>
                    <td>❌</td>
                    <td>❌</td>
                    <td>⚠️</td>
                    <td>⚠️</td>
                  </tr>
                  <tr>
                    <td>バターバー</td>
                    <td>❌</td>
                    <td>❌（&lt;18歳）</td>
                    <td>❌</td>
                    <td>❌</td>
                    <td>⚠️（PA-free）</td>
                    <td>⚠️</td>
                  </tr>
                  <tr>
                    <td>ビタミンD</td>
                    <td>✅（欠乏時）</td>
                    <td>✅</td>
                    <td>✅（欠乏時）</td>
                    <td>✅</td>
                    <td>✅</td>
                    <td>⚠️</td>
                  </tr>
                  <tr>
                    <td>高用量B6（&gt;200mg）</td>
                    <td>❌</td>
                    <td>❌</td>
                    <td>❌</td>
                    <td>❌</td>
                    <td>❌</td>
                    <td>❌</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="alert a-info">
              <div className="alert-i">🔑</div>
              <div>
                <strong>凡例</strong>：✅ = 使用可 ／ ⚠️ = 注意・医師確認 ／ ❌ = 禁忌・推奨しない
              </div>
            </div>
          </section>

          {/* ====================================================== SECTION 10 */}
          <section id="s10" className="sec">
            <div className="sec-hd">
              <div className="sec-num">10</div>
              <h1 className="sec-title">STEP 8 — 統合プロトコル（段階的実践ガイド）</h1>
            </div>

            <h2>10-1. 全体的なアプローチの流れ</h2>
            <div className="mmd">
              <div className="mmd-lbl">
                フローチャート — ベースラインから維持までの4フェーズ統合プロトコル
              </div>
              <MermaidDiagram
                themeVariables={NUTRITION_MERMAID_THEME}
                chart={`flowchart TD
S0["📋 PHASE 0: ベースライン確立\\n（治療開始前）"]

S0 --> D0["① 頭痛日記の開始\\n（最低30日間）"]
S0 --> D1["② 血液検査\\n血清Mg・ビタミンD・LFT・CBC・INR"]
S0 --> D2["③ MOHリスク評価（STEP 5参照）"]
S0 --> D3["④ HIT-6 / MIDAS / VASによるベースライン記録"]

D0 & D1 & D2 & D3 --> S1

S1["💊 PHASE 1（Week 1-4）: 基盤サプリメント導入"]
S1 --> P1A["マグネシウム 200mg/日から開始\\n（Week 2から300–400mg/日へ増量）"]
S1 --> P1B["リボフラビン（B2）400mg/日 開始"]
S1 --> P1C["食事トリガー日記の継続と分析"]

P1A & P1B & P1C --> S2

S2["⚡ PHASE 2（Week 4-12）: 完全プロトコル実施"]
S2 --> P2A["マグネシウム 400–600mg/日\\n（目標血清Mg ≥0.85 mmol/L）"]
S2 --> P2B["リボフラビン 400mg/日 継続"]
S2 --> P2C["CoQ10（ユビキノール）300mg/日 追加"]
S2 --> P2D["必要に応じてメラトニン 3mg/夜（睡眠障害合併時）"]
S2 --> P2E["カフェイン管理・食事トリガー排除開始"]
S2 --> P2F["水分摂取 1.5–2L/日の確保"]
S2 --> P2G["週3–5回 × 30分の有酸素運動開始"]

P2A & P2B & P2C & P2D & P2E & P2F & P2G --> S3

S3["📊 PHASE 3（3ヶ月）: アウトカム評価"]
S3 --> Eval{"目標達成評価\\n≥50%頭痛日数減少？\\nHIT-6 / MIDAS 改善？"}
Eval -->|"✅ 達成"| Maintain["維持フェーズ\\n6ヶ月毎に再評価"]
Eval -->|"❌ 未達成"| Escalate["治療強化\\n頭痛専門医への相談\\n予防薬（β遮断薬 / CGRP mAb）の検討"]

style S0 fill:#e3f2fd,stroke:#1565c0
style S1 fill:#e8f5e9,stroke:#2e7d32
style S2 fill:#fff3e0,stroke:#e65100
style S3 fill:#fce4ec,stroke:#880e4f
style Maintain fill:#27ae60,color:#fff
style Escalate fill:#c0392b,color:#fff`}
              />
            </div>

            <h2>10-2. 薬物療法との統合アプローチ</h2>
            <div className="tbl">
              <table>
                <thead>
                  <tr>
                    <th>治療カテゴリ</th>
                    <th>具体的介入</th>
                    <th>エビデンス</th>
                    <th>栄養療法との相乗効果</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <strong>急性期薬物</strong>
                    </td>
                    <td>NSAIDs / トリプタン / ゲパント</td>
                    <td>
                      <span className="bA">Grade A</span>
                    </td>
                    <td>なし（直接的相乗なし）</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>予防薬物</strong>
                    </td>
                    <td>プロプラノロール / トピラマート</td>
                    <td>
                      <span className="bA">Grade A</span>
                    </td>
                    <td>Mg補充でトピラマートの腎結石リスク↓</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>CGRP mAbs</strong>
                    </td>
                    <td>エレヌマブ / フレマネズマブ等</td>
                    <td>
                      <span className="bA">Grade A</span>
                    </td>
                    <td>Mg + B2 + CoQ10はミトコンドリアレベルから相補</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>ボツリヌストキシン</strong>
                    </td>
                    <td>PREEMPT プロトコル</td>
                    <td>
                      <span className="bA">Grade A</span>
                    </td>
                    <td>栄養療法は独立した補助的役割</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>CBT / バイオフィードバック</strong>
                    </td>
                    <td>認知行動療法 / EMGフィードバック</td>
                    <td>
                      <span className="bB">Grade B</span>
                    </td>
                    <td>食事トリガー管理 + 心理療法で相乗効果</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>有酸素運動</strong>
                    </td>
                    <td>週3–5回 × 30–40分</td>
                    <td>
                      <span className="bB">Grade B</span>
                    </td>
                    <td>CoQ10 / Mg補充でミトコンドリアの運動適応を促進</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>栄養補助（本ガイド）</strong>
                    </td>
                    <td>Mg + B2 + CoQ10（コアトリオ）</td>
                    <td>
                      <span className="bA">Grade A/B</span>
                    </td>
                    <td>全モダリティの土台</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* ====================================================== SECTION 11 */}
          <section id="s11" className="sec">
            <div className="sec-hd">
              <div className="sec-num">11</div>
              <h1 className="sec-title">STEP 9 — アウトカム評価と効果測定</h1>
            </div>

            <h2>11-1. 主要評価ツール</h2>
            <div className="tbl">
              <table>
                <thead>
                  <tr>
                    <th>ツール</th>
                    <th>評価内容</th>
                    <th>重症度スコア</th>
                    <th>測定タイミング</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <strong>HIT-6</strong>
                    </td>
                    <td>頭痛による日常生活への影響</td>
                    <td>≥60: 重篤 / 50–59: 実質的 / &lt;50: 中等度以下</td>
                    <td>開始時・3ヶ月毎</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>MIDAS</strong>
                    </td>
                    <td>仕事・家事・社会活動の損失日数（90日）</td>
                    <td>≥21: Grade IV / 11–20: III / 6–10: II / 0–5: I</td>
                    <td>開始時・3ヶ月毎</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>VAS/NRS</strong>
                    </td>
                    <td>疼痛強度</td>
                    <td>0–10（発症時・ピーク・2時間後）</td>
                    <td>毎回記録</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>PGIC</strong>
                    </td>
                    <td>患者全体的改善印象</td>
                    <td>7段階スケール</td>
                    <td>8週後・治療終了時</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>頭痛日誌</strong>
                    </td>
                    <td>頻度・強度・トリガー・薬剤使用</td>
                    <td>月次で集計</td>
                    <td>毎日継続</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h2>11-2. 治療成功基準（エビデンスベース）</h2>
            <div className="tbl th-teal">
              <table>
                <thead>
                  <tr>
                    <th>評価指標</th>
                    <th>最低成功基準（MCID）</th>
                    <th>優良基準</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>頭痛日数/月</td>
                    <td>
                      <strong>≥ 50% 減少</strong>
                    </td>
                    <td>≥ 75% 減少</td>
                  </tr>
                  <tr>
                    <td>HIT-6スコア</td>
                    <td>≥ 6点改善</td>
                    <td>&lt; 50点（正常域）</td>
                  </tr>
                  <tr>
                    <td>MIDASスコア</td>
                    <td>1グレード以上の改善</td>
                    <td>Grade I または II</td>
                  </tr>
                  <tr>
                    <td>急性期薬使用日数</td>
                    <td>MOH閾値以下（NSAIDs &lt; 15日/月・トリプタン等 &lt; 10日/月）</td>
                    <td>≤ 4日/月</td>
                  </tr>
                  <tr>
                    <td>VASピーク強度</td>
                    <td>≥ 30% 低下</td>
                    <td>≥ 50% 低下</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="alert a-info">
              <div className="alert-i">📌</div>
              <div>
                <strong>ソース（HIT-6 MCID）</strong>：
                <Ext href="https://pubmed.ncbi.nlm.nih.gov/12789668/">
                  Kosinski M, et al. <em>Qual Life Res</em> 2003 — PubMed
                </Ext>
              </div>
            </div>
          </section>

          {/* ====================================================== SECTION 12 */}
          <section id="s12" className="sec">
            <div className="sec-hd">
              <div className="sec-num">12</div>
              <h1 className="sec-title">参考文献・ソースURL</h1>
            </div>

            <div className="alert a-ok">
              <div className="alert-i">🌐</div>
              <div>
                <strong>注意</strong>
                ：すべてのソースは国際的に認可された機関・査読済みジャーナルのものです。
              </div>
            </div>

            <div className="src-sep">A. 診断基準（ICHD-3 / IHS）</div>
            <div className="src-grid">
              <div className="src">
                <div className="src-org">ICHD-3</div>
                <div className="src-t">公式サイト（全文閲覧可）</div>
                <Ext href="https://ichd-3.org/" className="src-url">
                  https://ichd-3.org/
                </Ext>
              </div>
              <div className="src">
                <div className="src-org">ICHD-3</div>
                <div className="src-t">全文PDF（Cephalalgia 2018）</div>
                <Ext
                  href="https://ichd-3.org/wp-content/uploads/2018/01/The-International-Classification-of-Headache-Disorders-3rd-Edition-2018.pdf"
                  className="src-url"
                >
                  ichd-3.org/…/ICHD-3-2018.pdf
                </Ext>
              </div>
              <div className="src">
                <div className="src-org">IHS</div>
                <div className="src-t">分類委員会（ICHD-4最新動向）</div>
                <Ext
                  href="https://ihs-headache.org/en/about-ihs/standing-committees/classification/"
                  className="src-url"
                >
                  ihs-headache.org/…/classification
                </Ext>
              </div>
              <div className="src">
                <div className="src-org">ICHD-3</div>
                <div className="src-t">MOH 診断基準 8.2</div>
                <Ext
                  href="https://ichd-3.org/8-headache-attributed-to-a-substance-or-its-withdrawal/8-2-medication-overuse-headache-moh/"
                  className="src-url"
                >
                  ichd-3.org/…/8-2-medication-overuse-headache-moh
                </Ext>
              </div>
            </div>

            <div className="src-sep">B. 臨床ガイドライン（AAN / EHF / NICE）</div>
            <div className="src-grid">
              <div className="src">
                <div className="src-org">AAN</div>
                <div className="src-t">Guidelines ホーム（全頭痛ガイドライン一覧）</div>
                <Ext href="https://www.aan.com/guidelines/" className="src-url">
                  https://www.aan.com/guidelines/
                </Ext>
              </div>
              <div className="src">
                <div className="src-org">AAN/AHS</div>
                <div className="src-t">片頭痛予防ガイドライン 2024草案</div>
                <Ext
                  href="https://www.aan.com/siteassets/home-page/policy-and-guidelines/guidelines/guidelines-and-measures-open-for-public-comment/24-pharmacologic-treatment-for-migraine-prevention-in-adults_draft_08-14-2024.pdf"
                  className="src-url"
                >
                  aan.com/…/migraine-prevention_draft_2024.pdf
                </Ext>
              </div>
              <div className="src">
                <div className="src-org">EHF</div>
                <div className="src-t">CGRP mAbs予防療法ガイドライン 2022</div>
                <Ext
                  href="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC9188162/"
                  className="src-url"
                >
                  ncbi.nlm.nih.gov/pmc/articles/PMC9188162
                </Ext>
              </div>
              <div className="src">
                <div className="src-org">EHF</div>
                <div className="src-t">トリプタン治療コンセンサス 2022</div>
                <Ext
                  href="https://link.springer.com/article/10.1186/s10194-022-01502-z"
                  className="src-url"
                >
                  link.springer.com/…/s10194-022-01502-z
                </Ext>
              </div>
              <div className="src">
                <div className="src-org">IHS</div>
                <div className="src-t">急性期治療推奨 2024（Cephalalgia誌）</div>
                <Ext
                  href="https://journals.sagepub.com/doi/10.1177/03331024241252666"
                  className="src-url"
                >
                  journals.sagepub.com/doi/10.1177/03331024241252666
                </Ext>
              </div>
              <div className="src">
                <div className="src-org">NICE</div>
                <div className="src-t">頭痛ガイドライン CG150</div>
                <Ext href="https://www.nice.org.uk/guidance/cg150" className="src-url">
                  https://www.nice.org.uk/guidance/cg150
                </Ext>
              </div>
            </div>

            <div className="src-sep">C. Cochrane エビデンスレビュー</div>
            <div className="src-grid">
              <div className="src">
                <div className="src-org">Cochrane</div>
                <div className="src-t">マグネシウム補充・片頭痛予防（2025年最新）</div>
                <Ext
                  href="https://www.cochranelibrary.com/cdsr/doi/10.1002/14651858.CD016307"
                  className="src-url"
                >
                  cochranelibrary.com/cdsr/…/CD016307
                </Ext>
              </div>
              <div className="src">
                <div className="src-org">Cochrane</div>
                <div className="src-t">心理療法（CBT/バイオフィードバック）片頭痛予防</div>
                <Ext
                  href="https://www.cochranelibrary.com/cdsr/doi/10.1002/14651858.CD012295.pub2/full"
                  className="src-url"
                >
                  cochranelibrary.com/cdsr/…/CD012295.pub2
                </Ext>
              </div>
              <div className="src">
                <div className="src-org">Cochrane</div>
                <div className="src-t">ボツリヌストキシン・慢性片頭痛予防</div>
                <Ext
                  href="https://www.cochranelibrary.com/cdsr/doi/10.1002/14651858.CD011914"
                  className="src-url"
                >
                  cochranelibrary.com/cdsr/…/CD011914
                </Ext>
              </div>
              <div className="src">
                <div className="src-org">Cochrane</div>
                <div className="src-t">頭痛レビュー検索ページ</div>
                <Ext
                  href="https://www.cochranelibrary.com/search?query=headache+migraine&amp;searchBy=3&amp;type=cdsr"
                  className="src-url"
                >
                  cochranelibrary.com/search?query=headache+migraine
                </Ext>
              </div>
            </div>

            <div className="src-sep">D. 主要個別研究（PubMed）</div>
            <div className="src-grid">
              <div className="src">
                <div className="src-org">PubMed</div>
                <div className="src-t">Peikert A, et al. 1996 — Magnesium 600mg/day</div>
                <Ext href="https://pubmed.ncbi.nlm.nih.gov/8734727/" className="src-url">
                  pubmed.ncbi.nlm.nih.gov/8734727
                </Ext>
              </div>
              <div className="src">
                <div className="src-org">PubMed</div>
                <div className="src-t">Schoenen J, et al. 1998 — Riboflavin 400mg/day RCT</div>
                <Ext href="https://pubmed.ncbi.nlm.nih.gov/9484373/" className="src-url">
                  pubmed.ncbi.nlm.nih.gov/9484373
                </Ext>
              </div>
              <div className="src">
                <div className="src-org">PubMed</div>
                <div className="src-t">Sándor PS, et al. 2005 — CoQ10 300mg/day RCT</div>
                <Ext href="https://pubmed.ncbi.nlm.nih.gov/15728298/" className="src-url">
                  pubmed.ncbi.nlm.nih.gov/15728298
                </Ext>
              </div>
              <div className="src">
                <div className="src-org">PubMed</div>
                <div className="src-t">
                  Gonçalves AL, et al. 2016 — Melatonin vs Propranolol RCT
                </div>
                <Ext href="https://pubmed.ncbi.nlm.nih.gov/26898255/" className="src-url">
                  pubmed.ncbi.nlm.nih.gov/26898255
                </Ext>
              </div>
              <div className="src">
                <div className="src-org">PubMed</div>
                <div className="src-t">Ramsden CE, et al. 2021 — Omega-3 and migraine (BMJ)</div>
                <Ext href="https://pubmed.ncbi.nlm.nih.gov/34112693/" className="src-url">
                  pubmed.ncbi.nlm.nih.gov/34112693
                </Ext>
              </div>
              <div className="src">
                <div className="src-org">PubMed</div>
                <div className="src-t">Maghbooli M, et al. 2014 — Ginger for acute migraine</div>
                <Ext href="https://pubmed.ncbi.nlm.nih.gov/24254706/" className="src-url">
                  pubmed.ncbi.nlm.nih.gov/24254706
                </Ext>
              </div>
              <div className="src">
                <div className="src-org">PubMed</div>
                <div className="src-t">Lipton RB, et al. 2004 — Butterbur (Petadolex) RCT</div>
                <Ext href="https://pubmed.ncbi.nlm.nih.gov/15148345/" className="src-url">
                  pubmed.ncbi.nlm.nih.gov/15148345
                </Ext>
              </div>
              <div className="src">
                <div className="src-org">PubMed</div>
                <div className="src-t">Holroyd KA, et al. 2001 — CBT + Amitriptyline (JAMA)</div>
                <Ext href="https://pubmed.ncbi.nlm.nih.gov/11325323/" className="src-url">
                  pubmed.ncbi.nlm.nih.gov/11325323
                </Ext>
              </div>
              <div className="src">
                <div className="src-org">PubMed</div>
                <div className="src-t">Kosinski M, et al. 2003 — HIT-6 MCID (Qual Life Res)</div>
                <Ext href="https://pubmed.ncbi.nlm.nih.gov/12789668/" className="src-url">
                  pubmed.ncbi.nlm.nih.gov/12789668
                </Ext>
              </div>
            </div>

            <div className="src-sep">E. 専門誌・継続リサーチ用リソース</div>
            <div className="src-grid">
              <div className="src">
                <div className="src-org">EHF 公式誌</div>
                <div className="src-t">Journal of Headache and Pain（OA）</div>
                <Ext
                  href="https://thejournalofheadacheandpain.biomedcentral.com/"
                  className="src-url"
                >
                  thejournalofheadacheandpain.biomedcentral.com
                </Ext>
              </div>
              <div className="src">
                <div className="src-org">IHS 公式誌</div>
                <div className="src-t">Cephalalgia</div>
                <Ext href="https://journals.sagepub.com/home/cep" className="src-url">
                  journals.sagepub.com/home/cep
                </Ext>
              </div>
              <div className="src">
                <div className="src-org">PubMed</div>
                <div className="src-t">頭痛 RCT 専用検索</div>
                <Ext
                  href="https://pubmed.ncbi.nlm.nih.gov/?term=headache+migraine&amp;filter=pubt.clinicaltrial"
                  className="src-url"
                >
                  pubmed.ncbi.nlm.nih.gov/?term=headache+migraine
                </Ext>
              </div>
              <div className="src">
                <div className="src-org">NIH</div>
                <div className="src-t">ClinicalTrials.gov 頭痛試験</div>
                <Ext
                  href="https://clinicaltrials.gov/search?term=migraine+headache"
                  className="src-url"
                >
                  clinicaltrials.gov/search?term=migraine+headache
                </Ext>
              </div>
            </div>

            <div className="alert a-info">
              <div className="alert-i">📖</div>
              <div>
                <strong>作成基準</strong>：ICHD-3 | AAN/AHS 2024 | EHF 2022 | IHS 2024 | NICE CG150
                | Cochrane Library｜
                <strong>エビデンスグレーディング</strong>：AAN/EHF標準基準（Grade A/B/C/U）｜
                <strong>対象読者</strong>：医学生・研修医・神経内科研修者・頭痛患者教育担当者
              </div>
            </div>
          </section>
        </main>
      </div>

      {/* FOOTER */}
      <div className="footer">
        <strong>頭痛と栄養・サプリメント療法 完全ガイド</strong> — 国際エビデンス（ICHD-3 / AAN /
        EHF / Cochrane / NICE）に基づく
        <br />📅 作成基準: 2024–2025年度 最新国際ガイドライン | 次回レビュー推奨: AAN/IHS
        年次ガイドライン更新時・Cochrane SR 改訂時
        <br />
        ⚠️
        本資料は学術・教育・研究目的のみを対象としています。臨床への適用は必ず資格を持つ医療専門家の監督のもとで行ってください。
      </div>
    </div>
  );
}
