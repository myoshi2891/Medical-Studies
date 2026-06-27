import { Ext } from "@/components/Ext";
import { TthSidebar } from "@/components/headaches/TthSidebar";
import MermaidDiagram from "@/components/MermaidDiagram";
import "./tension-type-headache.css";

// ページ別配色 (元HTMLの themeVariables に準拠)
const TTH_MERMAID_THEME: Record<string, string> = {
  primaryColor: "#e8f5e9",
  primaryTextColor: "#1b4332",
  primaryBorderColor: "#40916c",
  lineColor: "#546e7a",
  secondaryColor: "#e0f2f1",
  tertiaryColor: "#e8f5e9",
  edgeLabelBackground: "#ffffff",
  fontSize: "13px",
};

const CHART_PATHOPHYSIOLOGY = `flowchart TD
A(["誘発因子\\nストレス / 姿勢異常 / 睡眠障害\\n疲労 / 不規則な食事 / カフェイン"]) --> B

B["頭頸部筋・筋膜の\\n持続的収縮・虚血"]

B --> C["一酸化窒素 NO 産生増加\\n筋膜侵害受容器の活性化"]
C --> D["**末梢感作**\\n圧痛閾値 PPT の低下\\n頭蓋周囲圧痛 増大"]

D --> E{"頭痛頻度"}

E -->|低頻度 &lt; 1日/月| F["2.1 低頻度エピソード型\\n末梢機序が主体"]
E -->|高頻度 1-14日/月| G["2.2 高頻度エピソード型\\n末梢＋中枢機序"]
E -->|慢性化 ≥15日/月| H["2.3 慢性緊張型頭痛\\n**中枢感作が主体**"]

G --> I["**中枢感作**\\n三叉神経核脊髄路の過感受化\\n下行性疼痛抑制系の機能低下\\nセロトニン・ノルアドレナリン経路"]
H --> I

I --> J["痛み処理回路の可塑的変化\\n灰白質体積減少\\n慢性疼痛サイクルの確立"]

style A fill:#f0e68c
style D fill:#ffcc99
style I fill:#ff9999
style J fill:#ff6666,color:#fff`;

const CHART_CLASSIFICATION = `flowchart TD
ROOT["2. 緊張型頭痛\\nTension-Type Headache\\nICHD-3 第2章"]

ROOT --> A["2.1 低頻度エピソード型\\nInfrequent Episodic TTH\\n&lt; 1日/月（年 &lt; 12日）"]
ROOT --> B["2.2 高頻度エピソード型\\nFrequent Episodic TTH\\n1〜14日/月（&gt; 3ヶ月）"]
ROOT --> C["2.3 慢性緊張型頭痛\\nChronic TTH\\n≥ 15日/月（&gt; 3ヶ月）"]
ROOT --> D["2.4 確率的緊張型頭痛\\nProbable TTH\\n基準を1項目欠く場合"]

A --> A1["2.1.1 頭蓋周囲圧痛あり"]
A --> A2["2.1.2 頭蓋周囲圧痛なし"]

B --> B1["2.2.1 頭蓋周囲圧痛あり"]
B --> B2["2.2.2 頭蓋周囲圧痛なし"]

C --> C1["2.3.1 頭蓋周囲圧痛あり"]
C --> C2["2.3.2 頭蓋周囲圧痛なし"]

D --> D1["2.4.1 確率的低頻度型"]
D --> D2["2.4.2 確率的高頻度型"]
D --> D3["2.4.3 確率的慢性型"]

style ROOT fill:#2c3e50,color:#fff
style A fill:#27ae60,color:#fff
style B fill:#e67e22,color:#fff
style C fill:#e74c3c,color:#fff
style D fill:#7f8c8d,color:#fff`;

const CHART_DIAGNOSIS_FLOW = `flowchart TD
START([頭痛患者 評価開始]) --> SNOOP

SNOOP{SNOOP4 レッドフラッグ確認\\n→ Section 6 参照}
SNOOP -->|レッドフラッグあり| EMERGENCY[緊急画像検査\\nCT / MRI\\n二次性頭痛を除外]
SNOOP -->|クリア| A

A{"A. エピソード数\\n10回以上のエピソードがあるか？"}
A -->|いいえ| FAIL[診断基準 未充足\\n他疾患を検討]
A -->|はい| B

B{"B. 持続時間\\n30分〜7日間か？"}
B -->|いいえ| FAIL
B -->|はい| C

C{"C. 以下の4特徴のうち\\n2項目以上を満たすか？\\n① 両側性\\n② 圧迫感・締め付け感（非拍動性）\\n③ 軽度〜中等度の強度\\n④ 日常的身体活動で悪化しない"}
C -->|1項目以下| FAIL
C -->|2項目以上| D

D{"D. 以下の両方を満たすか？\\n① 悪心・嘔吐なし\\n② 光過敏または音過敏の一方のみ（両方は不可）"}
D -->|いいえ| MIGRAINE[片頭痛の可能性を再評価]
D -->|はい| E

E{"E. 他の ICHD-3 診断で\\n説明できないか？"}
E -->|説明できる| OTHER[他診断を適用]
E -->|説明できない| FREQ

FREQ{"頻度で分類"}
FREQ -->|&lt; 1日/月| CODE21["2.1 低頻度エピソード型TTH"]
FREQ -->|1〜14日/月| CODE22["2.2 高頻度エピソード型TTH"]

style EMERGENCY fill:#e74c3c,color:#fff
style FAIL fill:#95a5a6,color:#fff
style CODE21 fill:#27ae60,color:#fff
style CODE22 fill:#f39c12,color:#fff
style MIGRAINE fill:#8e44ad,color:#fff
style OTHER fill:#2980b9,color:#fff`;

const CHART_SNOOP4 = `flowchart TD
START([頭痛患者\\n来院・問診開始]) --> S

S{"S — Systemic 全身症状\\n・発熱・項部硬直\\n・体重減少\\n・免疫不全状態\\n・既知の悪性腫瘍既往"}
S -->|該当あり| RED["EMERGENCY\\n緊急 CT / MRI 施行\\n二次性頭痛を除外\\n専門科へ緊急コンサルト"]
S -->|なし| N

N{"N — Neurological Deficits\\n神経学的欠損症状\\n・運動麻痺・感覚障害\\n・失語・複視・視野欠損\\n・意識障害"}
N -->|該当あり| RED
N -->|なし| O1

O1{"O — Onset 発症様式\\n突発性発症：\\n生涯で最悪の頭痛\\nThunderclap Headache\\nくも膜下出血除外必須"}
O1 -->|該当あり| RED
O1 -->|なし| O2

O2{"O — Onset after 50\\n50歳以降の新規発症\\n側頭動脈炎\\n頭蓋内占拠性病変"}
O2 -->|該当あり| RED
O2 -->|なし| P

P{"P — Pattern Change\\nパターン変化\\n・進行性増悪\\n・外傷後の新規発症\\n・体位性変化（仰臥位 or 起立位悪化）"}
P -->|該当あり| RED
P -->|なし| FOUR

FOUR{"4 — 四つのP\\nPapilledema 乳頭浮腫\\nPostdural 硬膜穿刺後\\nPost-seizure 痙攣後\\nPregnancy / Postpartum 妊娠・産後"}
FOUR -->|該当あり| RED
FOUR -->|なし| CLEAR

CLEAR["SNOOP4 クリア\\n一次性頭痛の診断プロセスへ\\nICHD-3 分類へ進む"]

style RED fill:#c0392b,color:#fff
style CLEAR fill:#27ae60,color:#fff
style START fill:#2980b9,color:#fff`;

const CHART_ACUTE_TREATMENT = `flowchart TD
ASSESS([急性頭痛発症\\n疼痛強度を評価]) --> MILD

MILD{"NRS ≤ 3\\n軽度"}
MILD -->|はい| STEP1
MILD -->|いいえ| MOD

STEP1["Step 1 — 一般OTC薬\\n・イブプロフェン 400〜800mg\\n・アセトアミノフェン 500〜1000mg\\n・アスピリン 500〜1000mg\\nGrade A（AAN / NICE CG150）"]
STEP1 --> CHECK1

CHECK1{"2時間後\\n効果ありか？"}
CHECK1 -->|はい| END1["治療完了\\n使用頻度を記録"]
CHECK1 -->|いいえ| MOD

MOD{"NRS 4〜7\\n中等度"}
MOD --> STEP2

STEP2["Step 2 — NSAIDs 強化 or 変薬\\n・ナプロキセン 375〜550mg\\n・ケトプロフェン 25〜50mg\\n・アスピリン + カフェイン 配合剤\\nGrade A/B"]
STEP2 --> CHECK2

CHECK2{"2時間後\\n効果ありか？"}
CHECK2 -->|はい| END2["治療完了"]
CHECK2 -->|いいえ| RESCUE

RESCUE["Step 3 — レスキュー\\n専門医へコンサルト\\n非薬物療法の併用\\nMOH評価・予防療法導入を検討\\nGrade C / Expert Opinion"]

RESCUE --> WARN["注意事項\\nトリプタン：TTHへの適応なし\\nオピオイド：一次性頭痛では避ける\\n（MOH・依存リスク）"]

style END1 fill:#27ae60,color:#fff
style END2 fill:#27ae60,color:#fff
style WARN fill:#c0392b,color:#fff
style RESCUE fill:#e67e22,color:#fff`;

const CHART_PREVENTIVE_DECISION = `flowchart LR
CHECK{"予防療法の適応を評価"}

CHECK --> I1["頭痛頻度\\n≥ 1回/週（高頻度ETTH）\\nまたは 慢性型（CTTH）"]
CHECK --> I2["急性薬剤で\\n十分なコントロール不良"]
CHECK --> I3["MOHリスク\\nまたは 既存のMOH"]
CHECK --> I4["QOL著明低下\\nHIT-6 ≥ 60点\\nMIDAS ≥ 11点"]
CHECK --> I5["精神的合併症\\n（うつ・不安）あり"]

I1 & I2 & I3 & I4 & I5 --> DECIDE{"いずれか1つでも\\n該当するか？"}

DECIDE -->|はい| START["予防療法開始\\n第一選択：アミトリプチリン\\n非薬物療法を必ず併用"]
DECIDE -->|いいえ| WATCH["経過観察\\n頭痛日誌を継続\\n1〜3ヶ月後に再評価"]

style START fill:#27ae60,color:#fff
style WATCH fill:#3498db,color:#fff`;

const CHART_NON_PHARMACOLOGICAL = `flowchart TD
NP["非薬物療法\\nNon-Pharmacological Treatment"]

NP --> PSY["心理・行動療法"]
NP --> PHY["身体療法"]
NP --> LIFE["生活習慣改善"]

PSY --> P1["認知行動療法 CBT\\nGrade B — Cochrane SR 2017\\n薬物療法と同等の効果"]
PSY --> P2["バイオフィードバック\\nGrade B — Meta-analysis 2008\\nEMGフィードバックが最有効"]
PSY --> P3["リラクゼーション訓練\\nGrade B — AAN/AHS\\n漸進的筋弛緩法・自律訓練法"]
PSY --> P4["マインドフルネス MBSR\\nGrade C — 小規模RCT\\n慢性型に有望"]

PHY --> H1["理学療法 / 頸部モビライゼーション\\nGrade B — Fernandez-de-las-Penas 2006\\n姿勢矯正・頸部機能障害に有効"]
PHY --> H2["鍼治療\\nGrade B — Cochrane SR 2016\\n予防効果：偽鍼と同等以上"]
PHY --> H3["マッサージ療法\\nGrade C — 観察研究\\n頭蓋周囲圧痛の軽減"]
PHY --> H4["有酸素運動\\nGrade C — Varkey et al. 2011\\n週3回30分を推奨"]

LIFE --> L1["睡眠衛生指導\\n目標 7〜8時間/日\\n規則正しい起床就寝時刻"]
LIFE --> L2["ストレスマネジメント\\n職場環境・対人関係調整"]
LIFE --> L3["姿勢指導\\nエルゴノミクス\\nデスクワーク中の姿勢"]
LIFE --> L4["トリガー管理\\n頭痛日誌による同定\\n規則的な食事・水分補給"]

style PSY fill:#3498db,color:#fff
style PHY fill:#27ae60,color:#fff
style LIFE fill:#8e44ad,color:#fff`;

const CHART_MOH_FLOW = `flowchart TD
START(["急性期薬剤の使用歴を評価\\nICHD-3 8.2 MOH診断基準に照合"]) --> A

A{"単純鎮痛薬 / NSAIDs\\n（イブプロフェン・アセトアミノフェン等）\\n≥ 15日/月 かつ ≥ 3ヶ月間？"}
A -->|はい| MOH
A -->|いいえ| B

B{"トリプタン / エルゴタミン / オピオイド\\n≥ 10日/月 かつ ≥ 3ヶ月間？"}
B -->|はい| MOH
B -->|いいえ| C

C{"配合鎮痛薬（複合成分製剤）\\n≥ 10日/月 かつ ≥ 3ヶ月間？"}
C -->|はい| MOH
C -->|いいえ| D

D{"複数薬剤を組み合わせて\\n合計 ≥ 10日/月使用？"}
D -->|はい| MOH
D -->|いいえ| SAFE

SAFE["現時点のMOHリスクなし\\n定期的な再評価を継続"]

MOH["MEDICATION OVERUSE HEADACHE 疑い\\nICHD-3コード：8.2\\n逆説的頭痛頻度増加に注意"]

MOH --> MANAGE["管理戦略"]
MANAGE --> M1["段階的な過用薬剤の離脱\\n（急激な中止は離脱頭痛のリスク）"]
MANAGE --> M2["予防療法の並行開始\\nアミトリプチリン Grade A"]
MANAGE --> M3["詳細な患者教育\\nMOHのメカニズム説明"]
MANAGE --> M4["行動療法の導入\\nCBT / バイオフィードバック"]
MANAGE --> M5["3ヶ月後に再評価\\nICHD-3: MOHは薬剤中止後に消退"]

style MOH fill:#c0392b,color:#fff
style SAFE fill:#27ae60,color:#fff
style MANAGE fill:#e67e22,color:#fff`;

export default function TensionTypeHeadachePage() {
  return (
    <div className="tth-accent">
      {/* HERO */}
      <div className="hero">
        <div style={{ fontSize: 48, marginBottom: 6 }}>💆</div>
        <h1>緊張型頭痛（Tension-Type Headache）完全ガイド</h1>
        <p className="hero-sub">
          初学者から臨床家まで ─ 国際標準エビデンス（ICHD-3 / EFNS 2010 / AAN /
          Cochrane）に基づく包括的解説
        </p>
        <div className="hero-tags">
          <span className="hero-tag">ICHD-3 準拠</span>
          <span className="hero-tag">Grade A〜U エビデンス表記</span>
          <span className="hero-tag">末梢・中枢感作メカニズム</span>
          <span className="hero-tag">SNOOP4 スクリーニング</span>
          <span className="hero-tag">MOH 対策</span>
          <span className="hero-tag">アミトリプチリン予防療法</span>
        </div>
      </div>

      {/* DISCLAIMER */}
      <div className="disclaimer">
        <strong>⚠️ Academic Disclaimer（学術免責事項）</strong> 本資料は
        <strong>学術・教育・研究目的のみ</strong>
        を対象としています。すべての内容は資格を持つ医療専門家による臨床適用前のレビューが必要です。個人的な医療アドバイス・診断・処方を提供するものではありません。
      </div>

      {/* LAYOUT */}
      <div className="layout">
        <TthSidebar />

        {/* MAIN CONTENT */}
        <main className="main">
          {/* SECTION 1 */}
          <section id="s1" className="sec">
            <div className="sec-hd">
              <div className="sec-num">1</div>
              <h2 className="sec-title">疾患概要・定義</h2>
            </div>

            <p>
              緊張型頭痛（Tension-Type Headache: TTH）は、世界で
              <strong>最も有病率の高い一次性頭痛疾患</strong>であり、IHS（国際頭痛学会）が発行する
              <strong>ICHD-3（国際頭痛分類第3版）</strong>において第2章に分類されます。
            </p>
            <p>
              かつては「筋収縮性頭痛」「心因性頭痛」「ストレス頭痛」とも呼ばれていましたが、ICHD-3では
              <strong>神経生物学的基盤を持つ疾患</strong>として再定義されています。
            </p>

            <div className="alert a-info">
              <div className="alert-i">📖</div>
              <div>
                <strong>出典：ICHD-3（Cephalalgia 2018; 38(1): 1–211）</strong>
                <br />
                「以前は主に心因性と考えられていたが、ICHD-I
                以降の研究は、少なくとも重症型においては神経生物学的基盤の存在を強く示唆している」
              </div>
            </div>

            <h3>特徴的な臨床像</h3>
            <div className="tbl th-teal">
              <table>
                <thead>
                  <tr>
                    <th>項目</th>
                    <th>緊張型頭痛の特徴</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <strong>部位</strong>
                    </td>
                    <td>両側性（前頭部・頭頂部・後頭部）</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>性状</strong>
                    </td>
                    <td>圧迫感・締め付け感（非拍動性）</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>強度</strong>
                    </td>
                    <td>軽度〜中等度</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>持続時間</strong>
                    </td>
                    <td>30分〜7日間</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>体動による変化</strong>
                    </td>
                    <td>
                      日常的な身体活動で<strong>悪化しない</strong>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <strong>随伴症状</strong>
                    </td>
                    <td>
                      悪心・嘔吐<strong>なし</strong>；光過敏または音過敏は一方のみ許容
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="alert a-ok">
              <div className="alert-i">💡</div>
              <div>
                <strong>片頭痛との最重要鑑別ポイント：</strong>
                「非拍動性」「体動で悪化しない」「悪心なし」の3点が TTH の特徴です。詳細な鑑別は
                Section 7 を参照。
              </div>
            </div>
          </section>

          {/* SECTION 2 */}
          <section id="s2" className="sec">
            <div className="sec-hd">
              <div className="sec-num">2</div>
              <h2 className="sec-title">疫学</h2>
            </div>

            <h3>世界的有病率</h3>
            <div className="tbl">
              <table>
                <thead>
                  <tr>
                    <th>分類</th>
                    <th>年間有病率</th>
                    <th>生涯有病率</th>
                    <th>世界的順位</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>緊張型頭痛（全体）</td>
                    <td>
                      <strong>38〜78%</strong>
                    </td>
                    <td>
                      <strong>〜78%</strong>
                    </td>
                    <td>最多の頭痛疾患</td>
                  </tr>
                  <tr>
                    <td>高頻度エピソード型（2.2）</td>
                    <td>約 24%</td>
                    <td>—</td>
                    <td>—</td>
                  </tr>
                  <tr>
                    <td>慢性緊張型頭痛（2.3）</td>
                    <td>約 2〜3%</td>
                    <td>—</td>
                    <td>重大な障害原因</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3>人口統計学的特徴</h3>
            <div className="tbl th-teal">
              <table>
                <thead>
                  <tr>
                    <th>特徴</th>
                    <th>詳細</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <strong>性別比</strong>
                    </td>
                    <td>女性 &gt; 男性（比率 約1.4:1）</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>発症ピーク</strong>
                    </td>
                    <td>30〜50歳代</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>社会経済的影響</strong>
                    </td>
                    <td>
                      慢性型はQOLと労働生産性に甚大な影響；GBD 2016で「世界第2位の障害原因疾患」
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <strong>共存疾患</strong>
                    </td>
                    <td>うつ病・不安障害・睡眠障害との高い共存率</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="alert a-info">
              <div className="alert-i">📊</div>
              <div>
                <strong>主要疫学データソース：</strong>
                <br />• Rasmussen BK et al. <em>J Clin Epidemiol</em> 1991; 44: 1147–1157
                <br />• Jensen R &amp; Stovner LJ. <em>Lancet Neurol</em> 2008; 7: 354–361
                <br />•{" "}
                <Ext href="https://www.thelancet.com/journals/laneur/article/PIIS1474-4422(18)30499-X/fulltext">
                  Global Burden of Disease 2016（Lancet Neurol）
                </Ext>
              </div>
            </div>
          </section>

          {/* SECTION 3 */}
          <section id="s3" className="sec">
            <div className="sec-hd">
              <div className="sec-num">3</div>
              <h2 className="sec-title">病態生理学</h2>
            </div>

            <p>
              TTHの病態生理は完全には解明されていませんが、ICHD-3は「
              <strong>末梢性機序と中枢性機序の両方が関与する</strong>
              」ことを明記しています。型によって主要な機序が異なる点が重要です。
            </p>

            <h3>病態生理学の統合モデル</h3>
            <div className="mmd">
              <div className="mmd-lbl">フローチャート — 末梢感作から中枢感作への移行モデル</div>
              <MermaidDiagram themeVariables={TTH_MERMAID_THEME} chart={CHART_PATHOPHYSIOLOGY} />
            </div>

            <h3>① 末梢感作（Peripheral Sensitization）— 主に 2.1 / 2.2 型</h3>
            <p>頭蓋周囲の筋膜侵害受容器が持続的な刺激を受け活性化します。</p>
            <div className="tbl">
              <table>
                <thead>
                  <tr>
                    <th>機序</th>
                    <th>詳細</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <strong>一酸化窒素（NO）増加</strong>
                    </td>
                    <td>血管拡張・痛み増強を引き起こす</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>圧痛閾値（PPT）低下</strong>
                    </td>
                    <td>臨床的に「頭蓋周囲圧痛（pericranial tenderness）」として観察可能</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>圧痛部位</strong>
                    </td>
                    <td>前頭筋・側頭筋・咬筋・胸鎖乳突筋・斜方筋など</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="alert a-teal">
              <div className="alert-i">📄</div>
              <div>
                <strong>根拠文献：</strong> Bendtsen L. <em>Cephalalgia</em> 2000; 20: 486–508 /
                Ashina M et al. <em>Lancet</em> 1999; 353: 287–289
              </div>
            </div>

            <h3>② 中枢感作（Central Sensitization）— 主に 2.3 型（慢性型）</h3>
            <p>反復する末梢刺激により三叉神経系が過感受化し、中枢での痛み処理が変容します。</p>
            <div className="tbl">
              <table>
                <thead>
                  <tr>
                    <th>機序</th>
                    <th>詳細</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <strong>下行性疼痛抑制系の機能低下</strong>
                    </td>
                    <td>セロトニン・ノルアドレナリン系の機能不全</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>広域性痛覚過敏</strong>
                    </td>
                    <td>Generalized hyperalgesia の出現</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>構造的変化</strong>
                    </td>
                    <td>
                      慢性型（CTTH）での灰白質体積減少（Schmidt-Wilcke et al. <em>Neurology</em>{" "}
                      2005）
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="alert a-teal">
              <div className="alert-i">📄</div>
              <div>
                <strong>根拠文献：</strong> Ashina S et al. <em>Cephalalgia</em> 2006; 26: 940–948
              </div>
            </div>

            <h3>③ 心理社会的因子（Psychosocial Factors）</h3>
            <div className="tbl">
              <table>
                <thead>
                  <tr>
                    <th>因子</th>
                    <th>役割</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <strong>ストレス</strong>
                    </td>
                    <td>最強の誘発因子；慢性化の促進因子でもある</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>うつ病・不安障害</strong>
                    </td>
                    <td>
                      双方向関連性（うつ病は TTH 発症リスクを増加させ、CTTH はうつ病を促進する）
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <strong>睡眠障害</strong>
                    </td>
                    <td>睡眠の質の低下は頭痛頻度と正の相関を示す</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="alert a-teal">
              <div className="alert-i">📄</div>
              <div>
                <strong>根拠文献：</strong> Holroyd KA et al. <em>JAMA</em> 2001; 285: 2208–2215 /
                Janke EA et al. <em>Pain</em> 2004; 111: 230–238
              </div>
            </div>
          </section>

          {/* SECTION 4 */}
          <section id="s4" className="sec">
            <div className="sec-hd">
              <div className="sec-num">4</div>
              <h2 className="sec-title">ICHD-3 診断分類</h2>
            </div>

            <p>
              ICHD-3（2018年版）における緊張型頭痛の完全な分類体系です。<strong>頻度</strong>
              によって4つの大分類に分けられ、さらに頭蓋周囲圧痛の有無により細分類されます。
            </p>

            <h3>4型の直感的理解</h3>
            <div className="phase-grid">
              <div className="ph ph1">
                <div className="ph-icon">🟢</div>
                <div className="ph-title">2.1 低頻度エピソード型</div>
                <div className="ph-code">Infrequent Episodic TTH</div>
                <div className="ph-time">&lt; 1日/月（年 &lt; 12日）</div>
                <div className="ph-desc">軽症；医療介入不要なことが多い。末梢機序が主体.</div>
              </div>
              <div className="ph ph2">
                <div className="ph-icon">🟡</div>
                <div className="ph-title">2.2 高頻度エピソード型</div>
                <div className="ph-code">Frequent Episodic TTH</div>
                <div className="ph-time">1〜14日/月（&gt; 3ヶ月）</div>
                <div className="ph-desc">MOHリスク開始. 予防療法を考慮. 末梢 + 中枢機序.</div>
              </div>
              <div className="ph ph3">
                <div className="ph-icon">🔴</div>
                <div className="ph-title">2.3 慢性緊張型頭痛</div>
                <div className="ph-code">Chronic TTH (CTTH)</div>
                <div className="ph-time">≥ 15日/月（&gt; 3ヶ月）</div>
                <div className="ph-desc">最重症；QOL著明低下. 予防療法必須. 中枢感作が主体.</div>
              </div>
              <div className="ph ph4">
                <div className="ph-icon">⚪</div>
                <div className="ph-title">2.4 確率的 TTH</div>
                <div className="ph-code">Probable TTH</div>
                <div className="ph-time">基準を1項目欠く場合</div>
                <div className="ph-desc">他の診断除外後に使用. 研究目的での分類.</div>
              </div>
            </div>

            <h3>ICHD-3 分類ツリー</h3>
            <div className="mmd">
              <div className="mmd-lbl">フローチャート — ICHD-3 第2章 完全分類体系</div>
              <MermaidDiagram themeVariables={TTH_MERMAID_THEME} chart={CHART_CLASSIFICATION} />
            </div>

            <h3>各型の臨床的意義</h3>
            <div className="tbl th-forest">
              <table>
                <thead>
                  <tr>
                    <th>コード</th>
                    <th>分類名</th>
                    <th>頻度基準</th>
                    <th>主な病態機序</th>
                    <th>臨床的重要性</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <strong>2.1</strong>
                    </td>
                    <td>低頻度エピソード型</td>
                    <td>&lt; 1日/月（年 &lt; 12日）</td>
                    <td>末梢性が主体</td>
                    <td>通常は軽症；医療介入不要なことが多い</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>2.2</strong>
                    </td>
                    <td>高頻度エピソード型</td>
                    <td>1〜14日/月（&gt; 3ヶ月）</td>
                    <td>末梢 + 中枢</td>
                    <td>MOHリスク開始；予防療法を考慮</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>2.3</strong>
                    </td>
                    <td>慢性緊張型頭痛</td>
                    <td>≥ 15日/月（&gt; 3ヶ月）</td>
                    <td>中枢感作が主体</td>
                    <td>最重症；QOL著明低下；予防療法必須</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>2.4</strong>
                    </td>
                    <td>確率的 TTH</td>
                    <td>基準を1項目欠く</td>
                    <td>—</td>
                    <td>他の診断除外後に使用（研究目的）</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="alert a-info">
              <div className="alert-i">🔗</div>
              <div>
                <strong>公式出典：</strong>{" "}
                <Ext href="https://ichd-3.org/2-tension-type-headache/">
                  ICHD-3 公式サイト — 第2章 緊張型頭痛
                </Ext>
                <br />
                頭蓋周囲圧痛による細分類（.1 vs .2）は、主に研究目的のため ICHD-3
                で維持されています。
              </div>
            </div>
          </section>

          {/* SECTION 5 */}
          <section id="s5" className="sec">
            <div className="sec-hd">
              <div className="sec-num">5</div>
              <h2 className="sec-title">診断基準 ステップバイステップ</h2>
            </div>

            <h3>エピソード型 TTH（2.1 / 2.2）の診断フロー</h3>
            <div className="mmd">
              <div className="mmd-lbl">フローチャート — ICHD-3 エピソード型 TTH 診断プロセス</div>
              <MermaidDiagram themeVariables={TTH_MERMAID_THEME} chart={CHART_DIAGNOSIS_FLOW} />
            </div>

            <h3>慢性緊張型頭痛（2.3）の診断基準</h3>
            <div className="tbl th-red">
              <table>
                <thead>
                  <tr>
                    <th>基準</th>
                    <th>内容</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <strong>A. 頻度</strong>
                    </td>
                    <td>≥ 15日/月（&gt; 3ヶ月以上；年 ≥ 180日）</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>B. 持続時間</strong>
                    </td>
                    <td>数時間〜持続性（上限なし）</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>C. 頭痛の特徴</strong>
                    </td>
                    <td>エピソード型と同様（4項目中2項目以上）</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>D. 随伴症状</strong>
                    </td>
                    <td>①悪心は軽度なら許容（嘔吐は不可）；②光過敏または音過敏の一方のみ</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>E. 除外診断</strong>
                    </td>
                    <td>他のICHD-3診断で説明できない</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="alert a-warn">
              <div className="alert-i">⚠️</div>
              <div>
                <strong>重要：</strong>慢性型（2.3）では「<strong>軽度の悪心</strong>
                」が許容されますが、エピソード型（2.1/2.2）では悪心は
                <strong>一切許容されません</strong>。
              </div>
            </div>

            <h3>頭蓋周囲圧痛の評価方法</h3>
            <div className="tbl">
              <table>
                <thead>
                  <tr>
                    <th>手順</th>
                    <th>詳細</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <strong>検査手技</strong>
                    </td>
                    <td>示指・中指による回転加圧（ペルパトメーターが推奨）</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>評価筋群</strong>
                    </td>
                    <td>前頭筋・側頭筋・咬筋・外側翼突筋・胸鎖乳突筋・板状筋・僧帽筋</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>スコアリング</strong>
                    </td>
                    <td>各筋 0〜3点（計 Total Tenderness Score: TTS）</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>臨床意義</strong>
                    </td>
                    <td>治療効果の指標；患者への説明補助に有用</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* SECTION 6 */}
          <section id="s6" className="sec">
            <div className="sec-hd">
              <div className="sec-num">6</div>
              <h2 className="sec-title">SNOOP4 レッドフラッグスクリーニング</h2>
            </div>

            <div className="alert a-danger">
              <div className="alert-i">🚨</div>
              <div>
                <strong>
                  すべての頭痛患者において、いかなる治療プロトコル開始前にも SNOOP4
                  基準を確認すること。一項目でも該当すれば神経学的緊急症として対処する。
                </strong>
              </div>
            </div>

            <h3>SNOOP4 スクリーニングフロー</h3>
            <div className="mmd">
              <div className="mmd-lbl">フローチャート — SNOOP4 レッドフラッグ評価</div>
              <MermaidDiagram themeVariables={TTH_MERMAID_THEME} chart={CHART_SNOOP4} />
            </div>

            <h3>SNOOP4 各項目の詳細解説</h3>
            <div className="snoop-grid">
              <div className="sn">
                <div className="sn-letter">S</div>
                <div className="sn-title">Systemic — 全身症状</div>
                <div className="sn-symp">
                  • 発熱 + 項部硬直（髄膜刺激症状）
                  <br />• 体重減少・倦怠感
                  <br />• 免疫不全状態（HIV・ステロイド等）
                  <br />• 悪性腫瘍の既往
                </div>
                <div className="sn-dx">細菌性髄膜炎 / 脳炎 / CNSリンパ腫</div>
              </div>
              <div className="sn">
                <div className="sn-letter">N</div>
                <div className="sn-title">Neurological — 神経学的欠損</div>
                <div className="sn-symp">
                  • 片麻痺・感覚障害
                  <br />• 失語・構音障害
                  <br />• 複視・視野欠損
                  <br />• 意識障害・認知機能変化
                </div>
                <div className="sn-dx">脳卒中 / TIA / 脳腫瘍</div>
              </div>
              <div className="sn">
                <div className="sn-letter">O</div>
                <div className="sn-title">Onset — 突発性発症</div>
                <div className="sn-symp">
                  • 「生涯で最悪の頭痛」
                  <br />• 雷鳴頭痛（Thunderclap）
                  <br />• 秒〜分単位での急激な増悪
                  <br />• 運動・性行為・Valsalvaで誘発
                </div>
                <div className="sn-dx">くも膜下出血（致死率高）</div>
              </div>
              <div className="sn">
                <div className="sn-letter">O</div>
                <div className="sn-title">Onset after 50 — 50歳以降の新規</div>
                <div className="sn-symp">
                  • 50歳以降の初発頭痛
                  <br />• 側頭部疼痛 + 顎跛行
                  <br />• ESR・CRP 上昇
                  <br />• 視力障害の合併
                </div>
                <div className="sn-dx">側頭動脈炎（失明リスク）/ 頭蓋内病変</div>
              </div>
              <div className="sn">
                <div className="sn-letter">P</div>
                <div className="sn-title">Pattern Change — パターン変化</div>
                <div className="sn-symp">
                  • 進行性増悪（週〜月単位）
                  <br />• 外傷後の新規発症
                  <br />• 仰臥位で悪化 → ICP 亢進
                  <br />• 起立位で悪化 → 低髄液圧
                </div>
                <div className="sn-dx">脳腫瘍 / 水頭症 / 低髄液圧症候群</div>
              </div>
              <div className="sn">
                <div className="sn-letter">4</div>
                <div className="sn-title">四つのP — 特殊状況</div>
                <div className="sn-symp">
                  • <strong>P</strong>apilledema 乳頭浮腫
                  <br />• <strong>P</strong>ostdural 硬膜穿刺後
                  <br />• <strong>P</strong>ost-seizure 痙攣後
                  <br />• <strong>P</strong>regnancy / Postpartum 妊娠・産後
                </div>
                <div className="sn-dx">ICP亢進疾患 / CVST（妊娠・産後）</div>
              </div>
            </div>

            <h3>緊急度と想定診断</h3>
            <div className="tbl th-red">
              <table>
                <thead>
                  <tr>
                    <th>項目</th>
                    <th>キーワード</th>
                    <th>緊急度</th>
                    <th>想定される二次性頭痛</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <strong>S</strong>
                    </td>
                    <td>発熱 + 項部硬直</td>
                    <td>
                      <span className="bRed">最高</span>
                    </td>
                    <td>細菌性髄膜炎・脳炎</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>S</strong>
                    </td>
                    <td>体重減少 + 免疫不全</td>
                    <td>
                      <span className="bOra">高</span>
                    </td>
                    <td>脳腫瘍・CNSリンパ腫・結核性髄膜炎</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>N</strong>
                    </td>
                    <td>片麻痺・失語</td>
                    <td>
                      <span className="bRed">最高</span>
                    </td>
                    <td>脳卒中・TIA・脳腫瘍</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>O（突発性）</strong>
                    </td>
                    <td>雷鳴頭痛</td>
                    <td>
                      <span className="bRed">最高</span>
                    </td>
                    <td>くも膜下出血（SAH）</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>O（50歳↑）</strong>
                    </td>
                    <td>側頭部疼痛 + ESR上昇</td>
                    <td>
                      <span className="bOra">高</span>
                    </td>
                    <td>側頭動脈炎（失明リスク）</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>P（体位性）</strong>
                    </td>
                    <td>仰臥位悪化</td>
                    <td>
                      <span className="bOra">高</span>
                    </td>
                    <td>ICP亢進（脳腫瘍・水頭症）</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>P（体位性）</strong>
                    </td>
                    <td>起立位悪化</td>
                    <td>
                      <span className="bOra">高</span>
                    </td>
                    <td>低髄液圧症候群</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>4（乳頭浮腫）</strong>
                    </td>
                    <td>眼底所見</td>
                    <td>
                      <span className="bOra">高</span>
                    </td>
                    <td>ICP亢進疾患全般</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* SECTION 7 */}
          <section id="s7" className="sec">
            <div className="sec-hd">
              <div className="sec-num">7</div>
              <h2 className="sec-title">鑑別診断</h2>
            </div>

            <h3>主要頭痛疾患との包括的比較</h3>
            <div className="tbl">
              <table>
                <thead>
                  <tr>
                    <th>鑑別点</th>
                    <th>緊張型頭痛（TTH）</th>
                    <th>片頭痛（前兆なし）</th>
                    <th>群発頭痛</th>
                    <th>頸原性頭痛</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <strong>ICHD-3コード</strong>
                    </td>
                    <td>2.1〜2.3</td>
                    <td>1.1</td>
                    <td>3.1〜3.2</td>
                    <td>11.2</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>部位</strong>
                    </td>
                    <td>両側性</td>
                    <td>片側性（多い）</td>
                    <td>片側眼窩周囲</td>
                    <td>後頭部〜頸部〜片側</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>性状</strong>
                    </td>
                    <td>圧迫・締め付け</td>
                    <td>拍動性</td>
                    <td>激烈・穿孔性</td>
                    <td>頸部動作で変化</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>強度</strong>
                    </td>
                    <td>軽〜中等度</td>
                    <td>中〜重度</td>
                    <td>最重度</td>
                    <td>軽〜中等度</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>持続時間</strong>
                    </td>
                    <td>30分〜7日</td>
                    <td>4〜72時間</td>
                    <td>15〜180分</td>
                    <td>数時間〜持続</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>悪心/嘔吐</strong>
                    </td>
                    <td>なし（CTTH は軽度可）</td>
                    <td>あり（多い）</td>
                    <td>なし</td>
                    <td>まれ</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>光過敏</strong>
                    </td>
                    <td>なし / 一方のみ</td>
                    <td>あり</td>
                    <td>なし</td>
                    <td>なし</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>音過敏</strong>
                    </td>
                    <td>なし / 一方のみ</td>
                    <td>あり</td>
                    <td>なし</td>
                    <td>なし</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>自律神経症状</strong>
                    </td>
                    <td>なし</td>
                    <td>なし</td>
                    <td>流涙・鼻漏・縮瞳</td>
                    <td>なし</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>体動悪化</strong>
                    </td>
                    <td>なし</td>
                    <td>あり（特徴的）</td>
                    <td>なし</td>
                    <td>あり（頸部）</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>主な誘発因子</strong>
                    </td>
                    <td>ストレス・疲労・姿勢</td>
                    <td>多彩（ホルモン等）</td>
                    <td>アルコール・季節性</td>
                    <td>頸椎病変</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>好発年齢</strong>
                    </td>
                    <td>30〜50歳代</td>
                    <td>15〜55歳</td>
                    <td>20〜40歳代（男性多）</td>
                    <td>全年齢</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="alert a-purple">
              <div className="alert-i">💡</div>
              <div>
                <strong>最重要鑑別：</strong> TTH と片頭痛は
                <strong>同一患者に共存することが多い</strong>
                （両方の診断が成立し得る）。頭痛日誌による区別が不可欠です（Section 8 参照）。
              </div>
            </div>
          </section>

          {/* SECTION 8 */}
          <section id="s8" className="sec">
            <div className="sec-hd">
              <div className="sec-num">8</div>
              <h2 className="sec-title">評価ツール・スコアリング</h2>
            </div>

            <h3>バリデーション済み評価ツール一覧</h3>
            <div className="tbl th-teal">
              <table>
                <thead>
                  <tr>
                    <th>ツール</th>
                    <th>評価対象</th>
                    <th>スコア解釈</th>
                    <th>リンク</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <strong>HIT-6</strong>
                    </td>
                    <td>頭痛の生活影響度</td>
                    <td>≥ 60点：重篤な障害；36〜49：軽微</td>
                    <td>
                      <Ext href="https://headachejournal.onlinelibrary.wiley.com/">
                        Headache Journal
                      </Ext>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <strong>MIDAS</strong>
                    </td>
                    <td>片頭痛障害評価（日数換算）</td>
                    <td>≥ 21点：Grade IV重度；1〜5：Grade I軽度</td>
                    <td>
                      <Ext href="https://www.migraineresearch.org/">migraineresearch.org</Ext>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <strong>VAS / NRS</strong>
                    </td>
                    <td>疼痛強度</td>
                    <td>0〜10（0=なし；10=最悪の痛み）</td>
                    <td>標準的臨床ツール</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>PGIC</strong>
                    </td>
                    <td>全般的改善度（患者主観）</td>
                    <td>7点尺度（1=著明悪化〜7=著明改善）</td>
                    <td>
                      <Ext href="https://pubmed.ncbi.nlm.nih.gov/12185096/">PubMed</Ext>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <strong>PHQ-9</strong>
                    </td>
                    <td>うつ症状スクリーニング</td>
                    <td>≥ 10：中等度うつ疑い</td>
                    <td>
                      <Ext href="https://www.phqscreeners.com/">phqscreeners.com</Ext>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <strong>GAD-7</strong>
                    </td>
                    <td>不安症状スクリーニング</td>
                    <td>≥ 10：中等度不安疑い</td>
                    <td>
                      <Ext href="https://www.phqscreeners.com/">phqscreeners.com</Ext>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3>頭痛日誌の活用</h3>
            <div className="alert a-ok">
              <div className="alert-i">📓</div>
              <div>
                <strong>
                  治療開始前に最低30日間のベースライン記録を取得することを推奨する（ICHD-3準拠）。
                </strong>
              </div>
            </div>

            <div className="tbl">
              <table>
                <thead>
                  <tr>
                    <th>カテゴリ</th>
                    <th>記録項目</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <strong>頭痛情報</strong>
                    </td>
                    <td>発症日時・持続時間・NRS強度（発症時・ピーク時・2時間後）</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>性質</strong>
                    </td>
                    <td>部位・性状・拍動性の有無</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>随伴症状</strong>
                    </td>
                    <td>悪心・光過敏・音過敏の有無</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>誘発因子</strong>
                    </td>
                    <td>ストレス・睡眠時間・食事・天候・月経周期</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>薬剤使用</strong>
                    </td>
                    <td>使用薬剤名・用量・効果・使用日数（MOH評価のため必須）</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* SECTION 9 */}
          <section id="s9" className="sec">
            <div className="sec-hd">
              <div className="sec-num">9</div>
              <h2 className="sec-title">治療戦略</h2>
            </div>

            <h3>9.1 急性期治療</h3>

            <div className="alert a-warn">
              <div className="alert-i">⚠️</div>
              <div>
                急性期治療においては常に<strong>MOHリスク（Section 11 参照）</strong>
                を評価すること。
              </div>
            </div>

            <div className="mmd">
              <div className="mmd-lbl">フローチャート — 急性期 Step-by-Step 治療</div>
              <MermaidDiagram themeVariables={TTH_MERMAID_THEME} chart={CHART_ACUTE_TREATMENT} />
            </div>

            <h4>急性期薬剤エビデンスサマリー</h4>
            <div className="tbl th-forest">
              <table>
                <thead>
                  <tr>
                    <th>薬剤</th>
                    <th>推奨用量</th>
                    <th>エビデンス</th>
                    <th>主な根拠</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <strong>イブプロフェン</strong>
                    </td>
                    <td>200〜800mg</td>
                    <td>
                      <span className="bA">Grade A</span>
                    </td>
                    <td>Cochrane SR; NICE CG150</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>アスピリン</strong>
                    </td>
                    <td>500〜1000mg</td>
                    <td>
                      <span className="bA">Grade A</span>
                    </td>
                    <td>AAN/AHS; Cochrane</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>アセトアミノフェン</strong>
                    </td>
                    <td>500〜1000mg</td>
                    <td>
                      <span className="bA">Grade A</span>
                    </td>
                    <td>NICE CG150; 複数RCT</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>ナプロキセン</strong>
                    </td>
                    <td>375〜550mg</td>
                    <td>
                      <span className="bA">Grade A</span>
                    </td>
                    <td>Cochrane SR</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>ケトプロフェン</strong>
                    </td>
                    <td>25〜50mg</td>
                    <td>
                      <span className="bB">Grade B</span>
                    </td>
                    <td>
                      Lange et al. <em>Cephalalgia</em> 2004
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <strong>アスピリン + カフェイン配合</strong>
                    </td>
                    <td>500 + 65mg</td>
                    <td>
                      <span className="bB">Grade B</span>
                    </td>
                    <td>
                      Diener et al. <em>Cephalalgia</em> 2005
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="alert a-warn">
              <div className="alert-i">☕</div>
              <div>
                <strong>カフェインの注意点：</strong>
                鎮痛増強効果がある一方で、過剰摂取または離脱により頭痛を引き起こすリスクがあります。
              </div>
            </div>

            <h3>9.2 予防療法</h3>

            <div className="mmd">
              <div className="mmd-lbl">フローチャート — 予防療法の適応判断</div>
              <MermaidDiagram
                themeVariables={TTH_MERMAID_THEME}
                chart={CHART_PREVENTIVE_DECISION}
              />
            </div>

            <h4>予防薬剤エビデンステーブル</h4>
            <div className="tbl">
              <table>
                <thead>
                  <tr>
                    <th>薬剤</th>
                    <th>用量</th>
                    <th>エビデンス</th>
                    <th>主な副作用</th>
                    <th>禁忌・特記事項</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <strong>アミトリプチリン（TCA）</strong>
                    </td>
                    <td>10〜75mg/夜</td>
                    <td>
                      <span className="bA">Grade A</span>
                    </td>
                    <td>口渇・眠気・体重増加・便秘</td>
                    <td>緑内障・QT延長・MAOIs 併用禁忌</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>ノルトリプチリン</strong>
                    </td>
                    <td>25〜75mg/夜</td>
                    <td>
                      <span className="bB">Grade B</span>
                    </td>
                    <td>TCA より副作用軽微</td>
                    <td>アミトリプチリン不耐の場合の代替</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>ミルタザピン</strong>
                    </td>
                    <td>15〜30mg/夜</td>
                    <td>
                      <span className="bB">Grade B</span>
                    </td>
                    <td>眠気・体重増加</td>
                    <td>うつ合併例で特に有効（Bendtsen 2004）</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>ベンラファキシン</strong>
                    </td>
                    <td>75〜150mg/日</td>
                    <td>
                      <span className="bC">Grade C</span>
                    </td>
                    <td>嘔気・血圧上昇・発汗</td>
                    <td>不安・うつ合併例に考慮</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>バルプロ酸</strong>
                    </td>
                    <td>500〜1000mg/日</td>
                    <td>
                      <span className="bC">Grade C</span>
                    </td>
                    <td>体重増加・振戦・肝障害</td>
                    <td>
                      <span className="tR">妊娠絶対禁忌（Category X）</span>；REMS 登録
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <strong>トピラマート</strong>
                    </td>
                    <td>25〜100mg/日</td>
                    <td>
                      <span className="bC">Grade C</span>
                    </td>
                    <td>認知障害・尿路結石・体重減少</td>
                    <td>
                      <span className="tO">妊娠要注意（Category D）</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="alert a-ok">
              <div className="alert-i">⭐</div>
              <div>
                <strong>エビデンスの最重要ポイント：</strong>
                アミトリプチリンは40年以上の使用歴と多数のRCTに裏付けられた
                <strong>唯一の Grade A 予防薬</strong>です。
                <br />
                根拠：Bendtsen L &amp; Jensen R. <em>Cephalalgia</em> 2000 / Holroyd KA et al.{" "}
                <em>JAMA</em> 2001;{" "}
                <Ext href="https://pubmed.ncbi.nlm.nih.gov/11325323/">PubMed 11325323</Ext>
              </div>
            </div>

            <h3>9.3 非薬物療法（ノンファーマコロジカル治療）</h3>

            <p>
              TTHにおいて非薬物療法は薬物療法と<strong>同等以上</strong>
              のエビデンスを示すことがあり、統合的アプローチとして積極的に推奨されます。
            </p>

            <div className="mmd">
              <div className="mmd-lbl">フローチャート — 非薬物療法の全体像</div>
              <MermaidDiagram
                themeVariables={TTH_MERMAID_THEME}
                chart={CHART_NON_PHARMACOLOGICAL}
              />
            </div>

            <h4>非薬物療法エビデンステーブル</h4>
            <div className="tbl th-teal">
              <table>
                <thead>
                  <tr>
                    <th>療法</th>
                    <th>エビデンス</th>
                    <th>主な根拠</th>
                    <th>効果の推定</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <strong>認知行動療法（CBT）</strong>
                    </td>
                    <td>
                      <span className="bB">Grade B</span>
                    </td>
                    <td>
                      <Ext href="https://www.cochranelibrary.com/cdsr/doi/10.1002/14651858.CD012295.pub2">
                        Cochrane 2017 SR
                      </Ext>
                    </td>
                    <td>頭痛頻度 30〜50% 低下</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>バイオフィードバック（EMG）</strong>
                    </td>
                    <td>
                      <span className="bB">Grade B</span>
                    </td>
                    <td>
                      Nestoriuc Y et al. <em>J Consult Clin Psychol</em> 2008
                    </td>
                    <td>効果量 d = 0.73</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>リラクゼーション訓練</strong>
                    </td>
                    <td>
                      <span className="bB">Grade B</span>
                    </td>
                    <td>AAN Practice Guideline</td>
                    <td>長期持続効果あり</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>理学療法（頸部）</strong>
                    </td>
                    <td>
                      <span className="bB">Grade B</span>
                    </td>
                    <td>
                      Fernández-de-las-Peñas et al. <em>Headache</em> 2007
                    </td>
                    <td>頸部機能障害合併例で特に有効</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>鍼治療（予防）</strong>
                    </td>
                    <td>
                      <span className="bB">Grade B</span>
                    </td>
                    <td>
                      <Ext href="https://www.cochranelibrary.com/cdsr/doi/10.1002/14651858.CD007587.pub2">
                        Linde K et al. Cochrane 2016
                      </Ext>
                    </td>
                    <td>偽鍼より有意な頻度低下</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>CBT + アミトリプチリン 併用</strong>
                    </td>
                    <td>
                      <span className="bA">Grade A</span>
                    </td>
                    <td>
                      Holroyd KA et al. <em>JAMA</em> 2001
                    </td>
                    <td>単独療法より優れた効果</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>有酸素運動</strong>
                    </td>
                    <td>
                      <span className="bC">Grade C</span>
                    </td>
                    <td>
                      Varkey E et al. <em>Cephalalgia</em> 2011
                    </td>
                    <td>頻度・強度低下</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="alert a-ok">
              <div className="alert-i">🏆</div>
              <div>
                <strong>統合療法の特筆事項：</strong>Holroyd et al.（JAMA 2001）のRCTは、
                <strong>アミトリプチリン + ストレス管理療法の併用</strong>
                が各単独療法より優れることを示した唯一の Grade A RCT です。
              </div>
            </div>
          </section>

          {/* SECTION 10 */}
          <section id="s10" className="sec">
            <div className="sec-hd">
              <div className="sec-num">10</div>
              <h2 className="sec-title">栄養補助療法</h2>
            </div>

            <div className="alert a-warn">
              <div className="alert-i">⚠️</div>
              <div>
                以下はすべて<strong>補助的位置づけ</strong>
                です。単独では一次治療として推奨できません。TTHに特化したエビデンスは片頭痛と比較して限定的です。
              </div>
            </div>

            <div className="tbl">
              <table>
                <thead>
                  <tr>
                    <th>サプリメント</th>
                    <th>推奨用量</th>
                    <th>エビデンス</th>
                    <th>TTH特異的エビデンス</th>
                    <th>注意事項</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <strong>マグネシウム</strong>（グリシン酸/クエン酸塩）
                    </td>
                    <td>400〜600mg/日</td>
                    <td>
                      <span className="bB">Grade B</span>
                    </td>
                    <td>限定的（片頭痛のエビデンスを外抑）</td>
                    <td>腎不全では禁忌；下痢リスク</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>リボフラビン（B2）</strong>
                    </td>
                    <td>400mg/日</td>
                    <td>
                      <span className="bC">Grade C</span>
                    </td>
                    <td>TTH へのデータ不十分</td>
                    <td>無害；尿が黄色くなる</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>CoQ10（ユビキノール）</strong>
                    </td>
                    <td>300mg/日</td>
                    <td>
                      <span className="bC">Grade C</span>
                    </td>
                    <td>主に片頭痛データ</td>
                    <td>一般的に安全</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>オメガ3脂肪酸（EPA+DHA）</strong>
                    </td>
                    <td>1〜3g/日</td>
                    <td>
                      <span className="bC">Grade C</span>
                    </td>
                    <td>抗炎症作用：間接的根拠</td>
                    <td>抗凝固薬との相互作用に注意</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>メラトニン</strong>
                    </td>
                    <td>3mg/夜</td>
                    <td>
                      <span className="bC">Grade C</span>
                    </td>
                    <td>睡眠障害合併例で考慮</td>
                    <td>自動車運転に注意</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3>重要な薬物・サプリメント相互作用</h3>
            <div className="tbl th-red">
              <table>
                <thead>
                  <tr>
                    <th>組み合わせ</th>
                    <th>リスク</th>
                    <th>対応</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>フィーバーフュー + ワルファリン</td>
                    <td>出血リスク増大</td>
                    <td>併用回避</td>
                  </tr>
                  <tr>
                    <td>オメガ3 高用量（&gt;3g）+ 抗凝固薬</td>
                    <td>INR 変動</td>
                    <td>INR モニタリング</td>
                  </tr>
                  <tr>
                    <td>バターバー（未認定品）</td>
                    <td>肝毒性（ピロリジジンアルカロイド）</td>
                    <td>
                      <span className="tR">PA-free 認定品のみ使用</span>
                    </td>
                  </tr>
                  <tr>
                    <td>高用量 B6（&gt;200mg/日）</td>
                    <td>末梢神経障害</td>
                    <td>当量以下に制限</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* SECTION 11 */}
          <section id="s11" className="sec">
            <div className="sec-hd">
              <div className="sec-num">11</div>
              <h2 className="sec-title">薬剤過用頭痛（MOH）リスク評価</h2>
            </div>

            <h3>MOH 診断フロー（ICHD-3 8.2 準拠）</h3>
            <div className="mmd">
              <div className="mmd-lbl">フローチャート — ICHD-3 コード 8.2 薬剤過用頭痛の診断</div>
              <MermaidDiagram themeVariables={TTH_MERMAID_THEME} chart={CHART_MOH_FLOW} />
            </div>

            <h3>MOH 閾値の早見表</h3>
            <div className="moh-grid">
              <div className="moh moh-h">
                <div className="moh-day">≥ 10</div>
                <div className="moh-unit">日/月（≥ 3ヶ月）</div>
                <div className="moh-drug">トリプタン / エルゴタミン / オピオイド</div>
              </div>
              <div className="moh moh-m">
                <div className="moh-day">≥ 15</div>
                <div className="moh-unit">日/月（≥ 3ヶ月）</div>
                <div className="moh-drug">単純鎮痛薬 / NSAIDs / 配合鎮痛薬</div>
              </div>
              <div className="moh moh-l">
                <div className="moh-day">≥ 10</div>
                <div className="moh-unit">日/月（合計・複数薬）</div>
                <div className="moh-drug">複数薬剤組み合わせ使用</div>
              </div>
            </div>

            <h3>MOHの病態メカニズム（簡易解説）</h3>
            <div className="tbl">
              <table>
                <thead>
                  <tr>
                    <th>ステップ</th>
                    <th>メカニズム</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <strong>急性薬剤の頻用</strong>
                    </td>
                    <td>鎮痛薬受容体の脱感作・下行性疼痛抑制系の機能低下</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>逆説的効果</strong>
                    </td>
                    <td>薬剤によって「薬剤誘発性頭痛」のサイクルが形成される</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>慢性化</strong>
                    </td>
                    <td>頭痛頻度がさらに増加し、薬剤使用量も増加する悪循環</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>回復</strong>
                    </td>
                    <td>過用薬剤の離脱後、多くは2〜4週で改善（ICHD-3準拠）</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="alert a-info">
              <div className="alert-i">🔗</div>
              <div>
                <strong>ICHD-3 コード 8.2：</strong>{" "}
                <Ext href="https://ichd-3.org/8-headache-attributed-to-a-substance-or-its-withdrawal/8-2-medication-overuse-headache-moh/">
                  薬剤過用頭痛（MOH）公式診断基準
                </Ext>
              </div>
            </div>
          </section>

          {/* SECTION 12 */}
          <section id="s12" className="sec">
            <div className="sec-hd">
              <div className="sec-num">12</div>
              <h2 className="sec-title">特殊集団への対応</h2>
            </div>

            <h3>集団別の TTH 管理指針</h3>
            <div className="tbl th-purple">
              <table>
                <thead>
                  <tr>
                    <th>集団</th>
                    <th>急性期治療</th>
                    <th>予防療法</th>
                    <th>重要な注意点</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <strong>小児（&lt;12歳）</strong>
                    </td>
                    <td>イブプロフェン 10mg/kg；アセトアミノフェン第一選択</td>
                    <td>非薬物療法を優先（バイオフィードバック・CBT有効）</td>
                    <td>トリプタンは適応外（TTH）</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>思春期（12〜18歳）</strong>
                    </td>
                    <td>NSAID；アセトアミノフェン</td>
                    <td>アミトリプチリン低用量（5〜10mg）</td>
                    <td>バルプロ酸：催奇形性・体重増加を十分説明</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>妊娠中</strong>
                    </td>
                    <td>
                      <span className="tG">アセトアミノフェン第一選択</span>
                    </td>
                    <td>アミトリプチリン低用量（慎重投与）</td>
                    <td>
                      <span className="tR">バルプロ酸・トピラマート・エルゴタミン：絶対禁忌</span>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <strong>授乳中</strong>
                    </td>
                    <td>アセトアミノフェン；イブプロフェン（短期）</td>
                    <td>アミトリプチリン少量（移行量少ない）</td>
                    <td>薬剤選択は授乳科と連携</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>高齢者（&gt;65歳）</strong>
                    </td>
                    <td>アセトアミノフェン推奨；NSAIDは腎機能考慮</td>
                    <td>アミトリプチリン 10mg/夜から開始</td>
                    <td>起立性低血圧・転倒・認知機能（トピラマート）に注意</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>腎機能障害</strong>
                    </td>
                    <td>アセトアミノフェン；NSAIDは避ける</td>
                    <td>—</td>
                    <td>マグネシウム蓄積リスク</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>肝機能障害</strong>
                    </td>
                    <td>アセトアミノフェン用量調整</td>
                    <td>
                      バルプロ酸<span className="tR">禁忌</span>
                    </td>
                    <td>TCA 代謝遅延に注意</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="alert a-danger">
              <div className="alert-i">🚫</div>
              <div>
                <strong>バルプロ酸を生殖可能年齢の女性に処方する場合：</strong>
                <br />• 米国では{" "}
                <strong>REMS（Risk Evaluation and Mitigation Strategy）登録必須</strong>
                <br />• 確実な避妊の確認
                <br />• 計画外妊娠時の対応方針を事前に説明
                <br />• TTH への Grade C
                エビデンスしかなく、リスクベネフィット比を慎重に検討すること
              </div>
            </div>
          </section>

          {/* SECTION 13 */}
          <section id="s13" className="sec">
            <div className="sec-hd">
              <div className="sec-num">13</div>
              <h2 className="sec-title">標準化ケーススタディ</h2>
            </div>

            <div className="alert a-warn">
              <div className="alert-i">📋</div>
              <div>
                <strong>教育目的の架空症例です。実際の患者診療には適用しないこと。</strong>
              </div>
            </div>

            <div className="case-step">
              <div className="case-step-n">Step 1 — 患者プロファイル</div>
              <div className="case-step-t">42歳女性 / ITエンジニア / 高頻度エピソード型TTH</div>
              <div className="tbl" style={{ marginTop: 10 }}>
                <table>
                  <thead>
                    <tr>
                      <th>項目</th>
                      <th>内容</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>年齢 / 性別</td>
                      <td>42歳 / 女性</td>
                    </tr>
                    <tr>
                      <td>BMI</td>
                      <td>22.8</td>
                    </tr>
                    <tr>
                      <td>職業</td>
                      <td>IT プロジェクトマネージャー（長時間デスクワーク）</td>
                    </tr>
                    <tr>
                      <td>生活習慣</td>
                      <td>睡眠6時間/日（不規則）；運動習慣なし；コーヒー4杯/日；水分摂取不足</td>
                    </tr>
                    <tr>
                      <td>既往歴</td>
                      <td>特記事項なし；アレルギーなし</td>
                    </tr>
                    <tr>
                      <td>服薬歴</td>
                      <td>OTC イブプロフェン自己使用（月 ≥ 15日、継続 ≥ 3ヶ月）</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="case-step">
              <div className="case-step-n">Step 2 — 主訴（PQRST法）</div>
              <div className="case-step-t">疼痛の質・量・場所・随伴・時間的評価</div>
              <div className="tbl" style={{ marginTop: 10 }}>
                <table>
                  <thead>
                    <tr>
                      <th>要素</th>
                      <th>内容</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <strong>P（Provocation）</strong>
                      </td>
                      <td>職場ストレス・長時間作業・睡眠不足で増悪；休息で軽減</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>Q（Quality）</strong>
                      </td>
                      <td>圧迫感・締め付け感（「頭を締め付けられるような感覚」）</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>R（Region）</strong>
                      </td>
                      <td>両側前頭部〜側頭部〜後頭部；放散なし</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>S（Severity）</strong>
                      </td>
                      <td>NRS 5〜6 / 10（平均）</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>T（Timing）</strong>
                      </td>
                      <td>週3〜4回；1エピソード 4〜6時間；月12〜16日</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="case-step">
              <div className="case-step-n">Step 3 — 随伴症状 &amp; SNOOP4</div>
              <div className="case-step-t">随伴症状の確認とレッドフラッグスクリーニング</div>
              <div className="tbl" style={{ marginTop: 10 }}>
                <table>
                  <thead>
                    <tr>
                      <th>症状</th>
                      <th>有無</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>悪心 / 嘔吐</td>
                      <td>なし</td>
                    </tr>
                    <tr>
                      <td>光過敏</td>
                      <td>なし</td>
                    </tr>
                    <tr>
                      <td>音過敏</td>
                      <td>軽度あり（会議中に悪化）</td>
                    </tr>
                    <tr>
                      <td>視覚前兆</td>
                      <td>なし</td>
                    </tr>
                    <tr>
                      <td>体動による悪化</td>
                      <td>なし（歩行しても不変）</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="tbl" style={{ marginTop: 10 }}>
                <table>
                  <thead>
                    <tr>
                      <th>SNOOP4 項目</th>
                      <th>評価</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>S — 全身症状</td>
                      <td>
                        <span className="bGrn">クリア</span> なし
                      </td>
                    </tr>
                    <tr>
                      <td>N — 神経学的欠損</td>
                      <td>
                        <span className="bGrn">クリア</span> なし
                      </td>
                    </tr>
                    <tr>
                      <td>O — 突発性発症</td>
                      <td>
                        <span className="bGrn">クリア</span> なし（徐々に悪化するパターン）
                      </td>
                    </tr>
                    <tr>
                      <td>O — 50歳以降</td>
                      <td>
                        <span className="bGrn">クリア</span> なし（42歳）
                      </td>
                    </tr>
                    <tr>
                      <td>P — パターン変化</td>
                      <td>
                        <span className="bGrn">クリア</span> 急変なし（2年間同様のパターン）
                      </td>
                    </tr>
                    <tr>
                      <td>4 — 四つのP</td>
                      <td>
                        <span className="bGrn">クリア</span> 乳頭浮腫・硬膜穿刺後・痙攣後・妊産婦
                        すべてなし
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="alert a-ok" style={{ marginTop: 10 }}>
                <div className="alert-i">✅</div>
                <div>
                  <strong>SNOOP4 クリア</strong> → ICHD-3 一次性頭痛の診断へ進行可能
                </div>
              </div>
            </div>

            <div className="case-step">
              <div className="case-step-n">Step 4 — ICHD-3 分類 &amp; スコアリング</div>
              <div className="case-step-t">診断確定と障害度の定量化</div>
              <div className="tbl" style={{ marginTop: 10 }}>
                <table>
                  <thead>
                    <tr>
                      <th>診断</th>
                      <th>ICHD-3 コード</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <strong>高頻度エピソード型緊張型頭痛</strong>
                      </td>
                      <td>
                        <strong>2.2.1</strong>（頭蓋周囲圧痛あり）
                      </td>
                    </tr>
                    <tr>
                      <td>薬剤過用頭痛（同時診断）</td>
                      <td>
                        <strong>8.2.3.2</strong>（NSAIDs過用：イブプロフェン ≥ 15日/月 かつ ≥
                        3ヶ月）
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="tbl" style={{ marginTop: 10 }}>
                <table>
                  <thead>
                    <tr>
                      <th>評価ツール</th>
                      <th>スコア</th>
                      <th>解釈</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <strong>HIT-6</strong>
                      </td>
                      <td>62点</td>
                      <td>
                        <span className="bRed">重篤な障害</span>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <strong>MIDAS</strong>
                      </td>
                      <td>18点</td>
                      <td>Grade III（重度）</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>VAS（平均）</strong>
                      </td>
                      <td>5.5 / 10</td>
                      <td>中等度</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>PHQ-9</strong>
                      </td>
                      <td>8点</td>
                      <td>軽度うつ疑い</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>TTS（頭蓋周囲圧痛スコア）</strong>
                      </td>
                      <td>18点</td>
                      <td>異常高値</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="case-step">
              <div className="case-step-n">Step 5 — 提案治療計画</div>
              <div className="case-step-t">多角的・エビデンスに基づく統合的アプローチ</div>

              <h4>急性期治療（Step-down 戦略）</h4>
              <ul>
                <li>
                  イブプロフェン使用を月 <strong>9日以下</strong>に制限（MOH 回避の閾値）
                </li>
                <li>アセトアミノフェンとの交互使用を指導（同一薬剤への依存回避）</li>
                <li>非薬物療法を優先し、薬剤使用頻度を積極的に低減する</li>
              </ul>

              <h4>
                予防療法 <span className="bA">Grade A</span>
              </h4>
              <ul>
                <li>アミトリプチリン 10mg/夜から開始 → 4週ごとに 10mg 増量 → 目標 25〜50mg</li>
                <li>効果判定：3ヶ月後に頭痛日数 50%以上の減少を目標</li>
              </ul>

              <h4>
                理学療法 <span className="bB">Grade B</span>
              </h4>
              <ul>
                <li>頸部モビライゼーション 週2回</li>
                <li>姿勢矯正プログラム（デスクワーク姿勢の評価・指導）</li>
                <li>肩甲帯ストレッチ・等尺性運動 セルフケア指導</li>
              </ul>

              <h4>
                心理・行動療法 <span className="bB">Grade B</span>
              </h4>
              <ul>
                <li>CBT（認知行動療法）+ バイオフィードバック（EMG）6週間プログラム</li>
                <li>睡眠衛生指導（目標：7〜8時間、規則的就寝）</li>
                <li>ストレスマネジメント：職場環境のエルゴノミクス評価</li>
              </ul>

              <h4>
                栄養プロトコル <span className="bB">Grade B</span>
              </h4>
              <ul>
                <li>マグネシウム グリシン酸塩 400mg/日</li>
                <li>カフェイン摂取量を週1杯ずつ漸減（離脱頭痛予防のため段階的に）</li>
                <li>1日 1.5〜2L の水分摂取励行</li>
              </ul>
            </div>

            <div className="case-step">
              <div className="case-step-n">Step 6 — フォローアップ計画</div>
              <div className="case-step-t">アウトカム指標と再評価スケジュール</div>
              <div className="tbl" style={{ marginTop: 10 }}>
                <table>
                  <thead>
                    <tr>
                      <th>時期</th>
                      <th>評価項目</th>
                      <th>目標</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <strong>4週後</strong>
                      </td>
                      <td>頭痛日誌レビュー；副作用確認</td>
                      <td>MOH 回避（使用 ≤ 9日/月）</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>8週後</strong>
                      </td>
                      <td>HIT-6 / VAS；アミトリプチリン用量調整</td>
                      <td>HIT-6 ≥ 5点改善</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>3ヶ月後</strong>
                      </td>
                      <td>HIT-6 / MIDAS / TTS / NRS</td>
                      <td>
                        <strong>≥ 50%の頭痛日数減少</strong>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <strong>6ヶ月後</strong>
                      </td>
                      <td>QOL 評価；予防薬継続判断</td>
                      <td>MIDAS Grade 改善；HIT-6 &lt; 60</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          {/* SECTION 14 */}
          <section id="s14" className="sec">
            <div className="sec-hd">
              <div className="sec-num">14</div>
              <h2 className="sec-title">エビデンス階層サマリー</h2>
            </div>

            <h3>TTH 管理における推奨グレード早見表</h3>
            <div className="tbl th-forest">
              <table>
                <thead>
                  <tr>
                    <th>推奨</th>
                    <th>エビデンス</th>
                    <th>根拠ガイドライン</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <strong>急性期：イブプロフェン</strong>
                    </td>
                    <td>
                      <span className="bA">Grade A</span>
                    </td>
                    <td>AAN / NICE CG150 / Cochrane SR</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>急性期：アスピリン</strong>
                    </td>
                    <td>
                      <span className="bA">Grade A</span>
                    </td>
                    <td>AAN / NICE CG150</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>急性期：アセトアミノフェン</strong>
                    </td>
                    <td>
                      <span className="bA">Grade A</span>
                    </td>
                    <td>NICE CG150 / 複数 RCT</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>急性期：ナプロキセン</strong>
                    </td>
                    <td>
                      <span className="bA">Grade A</span>
                    </td>
                    <td>Cochrane SR</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>予防：アミトリプチリン</strong>
                    </td>
                    <td>
                      <span className="bA">Grade A</span>
                    </td>
                    <td>EHF / AAN / Holroyd 2001</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>予防：アミトリプチリン + CBT 併用</strong>
                    </td>
                    <td>
                      <span className="bA">Grade A</span>
                    </td>
                    <td>
                      Holroyd <em>JAMA</em> 2001
                    </td>
                  </tr>
                  <tr>
                    <td>バイオフィードバック（EMG）</td>
                    <td>
                      <span className="bB">Grade B</span>
                    </td>
                    <td>AAN / Nestoriuc 2008</td>
                  </tr>
                  <tr>
                    <td>CBT（認知行動療法）</td>
                    <td>
                      <span className="bB">Grade B</span>
                    </td>
                    <td>AAN / Cochrane 2017</td>
                  </tr>
                  <tr>
                    <td>リラクゼーション訓練</td>
                    <td>
                      <span className="bB">Grade B</span>
                    </td>
                    <td>AAN</td>
                  </tr>
                  <tr>
                    <td>理学療法（頸部）</td>
                    <td>
                      <span className="bB">Grade B</span>
                    </td>
                    <td>EHF / Fernández-de-las-Peñas</td>
                  </tr>
                  <tr>
                    <td>鍼治療（予防）</td>
                    <td>
                      <span className="bB">Grade B</span>
                    </td>
                    <td>Cochrane SR 2016</td>
                  </tr>
                  <tr>
                    <td>ノルトリプチリン</td>
                    <td>
                      <span className="bB">Grade B</span>
                    </td>
                    <td>EFNS Guideline</td>
                  </tr>
                  <tr>
                    <td>ミルタザピン</td>
                    <td>
                      <span className="bB">Grade B</span>
                    </td>
                    <td>Bendtsen 2004 RCT</td>
                  </tr>
                  <tr>
                    <td>マグネシウム</td>
                    <td>
                      <span className="bB">Grade B</span>
                    </td>
                    <td>AAN / EHF</td>
                  </tr>
                  <tr>
                    <td>有酸素運動</td>
                    <td>
                      <span className="bC">Grade C</span>
                    </td>
                    <td>Varkey 2011</td>
                  </tr>
                  <tr>
                    <td>ベンラファキシン</td>
                    <td>
                      <span className="bC">Grade C</span>
                    </td>
                    <td>1 Class II 研究</td>
                  </tr>
                  <tr>
                    <td>バルプロ酸</td>
                    <td>
                      <span className="bC">Grade C</span>
                    </td>
                    <td>複数 Class III 研究</td>
                  </tr>
                  <tr>
                    <td>マインドフルネス MBSR</td>
                    <td>
                      <span className="bC">Grade C</span>
                    </td>
                    <td>小規模 RCT</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>CGRP 経路薬（TTH 適応）</strong>
                    </td>
                    <td>
                      <span className="bU">Grade U</span>
                    </td>
                    <td>
                      <strong>未承認；エビデンス不十分</strong>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3>エビデンス階層の定義</h3>
            <div className="tbl">
              <table>
                <thead>
                  <tr>
                    <th>グレード</th>
                    <th>定義</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <span className="bA">Grade A</span>
                    </td>
                    <td>≥ 2本の一貫した Class I RCT / Cochrane SR（低 heterogeneity）</td>
                  </tr>
                  <tr>
                    <td>
                      <span className="bB">Grade B</span>
                    </td>
                    <td>1本の Class I RCT または ≥ 2本の Class II 研究</td>
                  </tr>
                  <tr>
                    <td>
                      <span className="bC">Grade C</span>
                    </td>
                    <td>1本の Class II または ≥ 2本の Class III 研究</td>
                  </tr>
                  <tr>
                    <td>
                      <span className="bU">Grade U</span>
                    </td>
                    <td>不十分または相反するエビデンス</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* SECTION 15 */}
          <section id="s15" className="sec">
            <div className="sec-hd">
              <div className="sec-num">15</div>
              <h2 className="sec-title">参考文献・URLリソース</h2>
            </div>

            <h3>診断基準（最重要一次資料）</h3>
            <div className="src-grid">
              <div className="src">
                <div className="src-org">IHS / ICHD-3</div>
                <div className="src-t">ICHD-3 公式サイト（全文閲覧可）</div>
                <Ext className="src-url" href="https://ichd-3.org/">
                  https://ichd-3.org/
                </Ext>
              </div>
              <div className="src">
                <div className="src-org">IHS / ICHD-3</div>
                <div className="src-t">ICHD-3 第2章 — 緊張型頭痛</div>
                <Ext className="src-url" href="https://ichd-3.org/2-tension-type-headache/">
                  https://ichd-3.org/2-tension-type-headache/
                </Ext>
              </div>
              <div className="src">
                <div className="src-org">IHS / Cephalalgia 2018</div>
                <div className="src-t">ICHD-3 全文 PDF（Cephalalgia 2018; 38(1): 1–211）</div>
                <Ext
                  className="src-url"
                  href="https://ichd-3.org/wp-content/uploads/2018/01/The-International-Classification-of-Headache-Disorders-3rd-Edition-2018.pdf"
                >
                  ICHD-3 全文 PDF
                </Ext>
              </div>
              <div className="src">
                <div className="src-org">IHS</div>
                <div className="src-t">IHS 分類委員会（ICHD-4 最新動向）</div>
                <Ext
                  className="src-url"
                  href="https://ihs-headache.org/en/about-ihs/standing-committees/classification/"
                >
                  ihs-headache.org / classification
                </Ext>
              </div>
              <div className="src">
                <div className="src-org">IHS / ICHD-3</div>
                <div className="src-t">薬剤過用頭痛 MOH — ICHD-3 コード 8.2</div>
                <Ext
                  className="src-url"
                  href="https://ichd-3.org/8-headache-attributed-to-a-substance-or-its-withdrawal/8-2-medication-overuse-headache-moh/"
                >
                  ICHD-3 8.2 MOH
                </Ext>
              </div>
            </div>

            <h3>臨床ガイドライン</h3>
            <div className="src-grid">
              <div className="src">
                <div className="src-org">EHF / EFNS 2010</div>
                <div className="src-t">EFNS Guideline on Treatment of Tension-Type Headache</div>
                <Ext
                  className="src-url"
                  href="https://onlinelibrary.wiley.com/doi/10.1111/j.1468-1331.2010.03070.x"
                >
                  Eur J Neurol 2010; 17: 1318–1325
                </Ext>
              </div>
              <div className="src">
                <div className="src-org">NICE (UK)</div>
                <div className="src-t">Headache in over 12s — NICE Clinical Guideline CG150</div>
                <Ext className="src-url" href="https://www.nice.org.uk/guidance/cg150">
                  https://www.nice.org.uk/guidance/cg150
                </Ext>
              </div>
              <div className="src">
                <div className="src-org">AAN</div>
                <div className="src-t">AAN Guidelines ホーム（頭痛全ガイドライン一覧）</div>
                <Ext className="src-url" href="https://www.aan.com/guidelines/">
                  https://www.aan.com/guidelines/
                </Ext>
              </div>
              <div className="src">
                <div className="src-org">IHS / Cephalalgia 2024</div>
                <div className="src-t">IHS 急性期治療推奨 2024</div>
                <Ext
                  className="src-url"
                  href="https://journals.sagepub.com/doi/10.1177/03331024241252666"
                >
                  Cephalalgia 2024（Sage Journals）
                </Ext>
              </div>
            </div>

            <h3>Cochrane エビデンスレビュー</h3>
            <div className="src-grid">
              <div className="src">
                <div className="src-org">Cochrane Library</div>
                <div className="src-t">鍼治療 — 緊張型頭痛予防（Linde K 2016）</div>
                <Ext
                  className="src-url"
                  href="https://www.cochranelibrary.com/cdsr/doi/10.1002/14651858.CD007587.pub2"
                >
                  CD007587.pub2
                </Ext>
              </div>
              <div className="src">
                <div className="src-org">Cochrane Library</div>
                <div className="src-t">CBT / バイオフィードバック — 頭痛予防</div>
                <Ext
                  className="src-url"
                  href="https://www.cochranelibrary.com/cdsr/doi/10.1002/14651858.CD012295.pub2"
                >
                  CD012295.pub2
                </Ext>
              </div>
              <div className="src">
                <div className="src-org">Cochrane Library</div>
                <div className="src-t">抗うつ薬 TTH 予防（Banzi 2015）</div>
                <Ext
                  className="src-url"
                  href="https://www.cochranelibrary.com/cdsr/doi/10.1002/14651858.CD004533.pub3"
                >
                  CD004533.pub3
                </Ext>
              </div>
              <div className="src">
                <div className="src-org">Cochrane Library</div>
                <div className="src-t">マグネシウム — 頭痛予防（2025年最新）</div>
                <Ext
                  className="src-url"
                  href="https://www.cochranelibrary.com/cdsr/doi/10.1002/14651858.CD016307"
                >
                  CD016307
                </Ext>
              </div>
            </div>

            <h3>主要引用文献（アルファベット順）</h3>
            <div className="src-grid">
              <div className="src">
                <div className="src-org">Bendtsen L. 2000 / Cephalalgia</div>
                <div className="src-t">
                  Central sensitization in TTH — Possible pathophysiological mechanisms
                </div>
                <Ext
                  className="src-url"
                  href="https://journals.sagepub.com/doi/10.1046/j.1468-2982.2000.00053.x"
                >
                  Cephalalgia 20: 486–508
                </Ext>
              </div>
              <div className="src">
                <div className="src-org">Bendtsen L &amp; Jensen R. 2004 / Neurology</div>
                <div className="src-t">
                  Mirtazapine is effective in the prophylactic treatment of CTTH
                </div>
                <Ext className="src-url" href="https://pubmed.ncbi.nlm.nih.gov/15159484/">
                  PubMed 15159484
                </Ext>
              </div>
              <div className="src">
                <div className="src-org">Bendtsen L et al. 2010 / Eur J Neurol</div>
                <div className="src-t">
                  EFNS guideline on the treatment of tension-type headache
                </div>
                <Ext
                  className="src-url"
                  href="https://onlinelibrary.wiley.com/doi/10.1111/j.1468-1331.2010.03070.x"
                >
                  Eur J Neurol 17: 1318–1325
                </Ext>
              </div>
              <div className="src">
                <div className="src-org">Fernández-de-las-Peñas et al. 2007 / Cephalalgia</div>
                <div className="src-t">
                  Myofascial trigger points and sensitization: Updated pain model for TTH
                </div>
                <Ext className="src-url" href="https://pubmed.ncbi.nlm.nih.gov/17359516/">
                  PubMed 17359516
                </Ext>
              </div>
              <div className="src">
                <div className="src-org">Holroyd KA et al. 2001 / JAMA</div>
                <div className="src-t">
                  Management of CTTH with TCA, stress management, and combination: A RCT
                </div>
                <Ext className="src-url" href="https://pubmed.ncbi.nlm.nih.gov/11325323/">
                  JAMA 285: 2208–2215
                </Ext>
              </div>
              <div className="src">
                <div className="src-org">Jensen R &amp; Stovner LJ. 2008 / Lancet Neurol</div>
                <div className="src-t">Epidemiology and comorbidity of headache</div>
                <Ext
                  className="src-url"
                  href="https://www.thelancet.com/journals/laneur/article/PIIS1474-4422(08)70062-0/abstract"
                >
                  Lancet Neurol 7: 354–361
                </Ext>
              </div>
              <div className="src">
                <div className="src-org">Nestoriuc Y et al. 2008 / J Consult Clin Psychol</div>
                <div className="src-t">Meta-analysis of biofeedback for tension-type headache</div>
                <Ext className="src-url" href="https://pubmed.ncbi.nlm.nih.gov/18426234/">
                  PubMed 18426234
                </Ext>
              </div>
              <div className="src">
                <div className="src-org">Rasmussen BK et al. 1991 / J Clin Epidemiol</div>
                <div className="src-t">Epidemiology of headache in a general population</div>
                <Ext className="src-url" href="https://pubmed.ncbi.nlm.nih.gov/1941010/">
                  PubMed 1941010
                </Ext>
              </div>
              <div className="src">
                <div className="src-org">Stovner LJ et al. 2022 / Cephalalgia</div>
                <div className="src-t">
                  Global, regional, and national burden of migraine and TTH
                </div>
                <Ext
                  className="src-url"
                  href="https://journals.sagepub.com/doi/10.1177/03331024221097313"
                >
                  Cephalalgia 42: 1160–1196
                </Ext>
              </div>
            </div>

            <h3>学術誌・継続的情報源</h3>
            <div className="src-grid">
              <div className="src">
                <div className="src-org">EHF 公式誌（OA）</div>
                <div className="src-t">Journal of Headache and Pain</div>
                <Ext
                  className="src-url"
                  href="https://thejournalofheadacheandpain.biomedcentral.com/"
                >
                  BioMed Central / JHAP
                </Ext>
              </div>
              <div className="src">
                <div className="src-org">IHS 公式誌</div>
                <div className="src-t">Cephalalgia（ICHD 改訂・主要臨床試験）</div>
                <Ext className="src-url" href="https://journals.sagepub.com/home/cep">
                  Sage Journals / Cephalalgia
                </Ext>
              </div>
              <div className="src">
                <div className="src-org">PubMed / NLM</div>
                <div className="src-t">PubMed — TTH 臨床試験専用検索</div>
                <Ext
                  className="src-url"
                  href="https://pubmed.ncbi.nlm.nih.gov/?term=tension+type+headache&filter=pubt.clinicaltrial"
                >
                  pubmed.ncbi.nlm.nih.gov (TTH RCTs)
                </Ext>
              </div>
              <div className="src">
                <div className="src-org">ClinicalTrials.gov</div>
                <div className="src-t">進行中・完了試験の確認</div>
                <Ext
                  className="src-url"
                  href="https://clinicaltrials.gov/search?cond=tension+type+headache"
                >
                  clinicaltrials.gov / TTH
                </Ext>
              </div>
            </div>

            <div className="alert a-info" style={{ marginTop: 20 }}>
              <div className="alert-i">📌</div>
              <div>
                <strong>更新情報：</strong>
                <br />
                本資料の準拠基準：ICHD-3（2018）/ EFNS TTH 治療ガイドライン 2010 / AAN 2024 ドラフト
                / Cochrane SR 最新版
                <br />
                <strong>ICHD-4 動向：</strong>2024年に作業進行版が一部公開。TTH
                分類への大幅変更は現時点では報告されていないが、診断閾値の精緻化が継続検討中。定期的に{" "}
                <Ext href="https://ihs-headache.org/en/about-ihs/standing-committees/classification/">
                  IHS 分類委員会サイト
                </Ext>
                を参照すること。
                <br />
                <strong>免責事項：</strong>
                本資料に含まれる薬剤情報は各国の承認状況・薬価・保険適用が異なる。臨床応用前に各国の規制機関（日本：PMDA、米国：FDA、欧州：EMA）の最新承認情報を確認すること。
              </div>
            </div>
          </section>
        </main>
      </div>

      {/* FOOTER */}
      <div className="footer">
        <strong>緊張型頭痛（TTH）完全ガイド</strong> — 国際標準エビデンス（ICHD-3 / EFNS 2010 / AAN
        / Cochrane）に基づく
        <br />📅 作成年: 2026年 | 次回レビュー推奨: ICHD-4 正式発行時・AAN / IHS
        年次ガイドライン更新時
        <br />
        ⚠️
        本資料は学術・教育・研究目的のみを対象としています。臨床への適用は必ず資格を持つ医療専門家の監督のもとで行ってください。
      </div>
    </div>
  );
}
