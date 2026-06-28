import type { Metadata } from "next";
import { Ext } from "@/components/Ext";
import MermaidDiagram from "@/components/MermaidDiagram";
import { PsychologicalBehavioralTherapySidebar } from "@/components/therapies/PsychologicalBehavioralTherapySidebar";
import "./psychological-behavioral-therapy.css";

export const metadata: Metadata = {
  title: "🌙 頭痛の心理・行動療法 完全ガイド",
  description:
    "国際エビデンス（ICHD-3 / AAN / EHF / Cochrane / NICE）に基づく包括的解説 — 初学者向けステップバイステップ",
};

/** 心理・行動療法の Mermaid テーマ。 */
const MIND_MERMAID_THEME: Record<string, string> = {
  primaryColor: "#e8eaf6",
  primaryTextColor: "#1a237e",
  primaryBorderColor: "#5c6bc0",
  lineColor: "#546e7a",
  secondaryColor: "#e0f2f1",
  tertiaryColor: "#e8f5e9",
  edgeLabelBackground: "#ffffff",
  fontSize: "13px",
};

export default function PsychologicalBehavioralTherapyPage() {
  return (
    <div className="psychological-behavioral-accent">
      {/* HERO */}
      <div className="hero">
        <div style={{ fontSize: 34 }}>🌙</div>
        <h1>頭痛の心理・行動療法 完全ガイド</h1>
        <p className="hero-sub">
          国際エビデンス（ICHD-3 / AAN / EHF / Cochrane / NICE）に基づく包括的解説 —
          初学者向けステップバイステップ
        </p>
        <div className="hero-tags">
          <span className="hero-tag">ICHD-3 準拠</span>
          <span className="hero-tag">CBT・バイオフィードバック</span>
          <span className="hero-tag">Grade A〜U 表記</span>
          <span className="hero-tag">SNOOP4 必須</span>
          <span className="hero-tag">MOH 対策</span>
        </div>
      </div>

      {/* DISCLAIMER */}
      <div className="disclaimer">
        <strong>⚠️ Academic Disclaimer（学術免責事項）</strong>　本資料は
        <strong>学術・教育・研究目的のみ</strong>
        を対象としています。内容は ICHD-3 / AAN / EHF / IHS 2024 / NICE CG150 / Cochrane / WHO /
        PubMed
        に基づく国際的に認定された文献に準拠していますが、個人の医療診断・処方・治療の代替にはなりません。臨床への適用前に、必ず資格を有する医療専門家（神経内科・頭痛専門医・臨床心理士）にご相談ください。
      </div>

      {/* LAYOUT */}
      <div className="layout">
        <PsychologicalBehavioralTherapySidebar />

        {/* MAIN CONTENT */}
        <main className="main">
          {/* ============================================================ SECTION 1 */}
          <section id="s1" className="sec">
            <div className="sec-hd">
              <div className="sec-num">1</div>
              <h2 className="sec-title">なぜ「心理・行動療法」が頭痛治療の柱なのか？</h2>
            </div>

            <p>
              頭痛は<strong>バイオサイコソーシャル（BPS）モデル</strong>
              で理解する疾患です。片頭痛・緊張型頭痛（TTH）の発症・慢性化には、生物学的因子のみならず、心理的ストレス・感情調節不全・不適切な行動パターンが深く関与しています。
            </p>

            <h3>1-1. 薬物療法単独の限界</h3>
            <div className="tbl th-red">
              <table>
                <thead>
                  <tr>
                    <th>課題</th>
                    <th>詳細</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <strong>薬物乱用頭痛（MOH）リスク</strong>
                    </td>
                    <td>
                      NSAIDs ≥15日/月・トリプタン ≥10日/月で逆説的に頭痛を増悪（ICHD-3 code: 8.2）
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <strong>副作用・禁忌</strong>
                    </td>
                    <td>
                      トリプタン（心血管禁忌）・バルプロ酸（妊娠禁忌 Category X）等の重大な制限
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <strong>慢性化の抑制に限界</strong>
                    </td>
                    <td>薬物は急性症状に対応するが、慢性化プロセスへの根本介入は困難</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>患者選好・アクセシビリティ</strong>
                    </td>
                    <td>妊婦・小児・高齢者・薬剤過敏例では薬物使用に制限がある</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>心理的側面の未対応</strong>
                    </td>
                    <td>疼痛破局化・不安・うつは薬物単独では改善しない慢性化の独立因子</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3>1-2. 心理・行動療法の優位性</h3>
            <div className="mmd">
              <div className="mmd-lbl">フローチャート — 薬物単独 vs. 統合療法のアウトカム</div>
              <MermaidDiagram
                themeVariables={MIND_MERMAID_THEME}
                chart={`flowchart TD
DRUG["💊 薬物療法のみ"]
COMBO["✨ 薬物 ＋ 心理・行動療法"]

DRUG --> D1["急性症状を一時的に抑制"]
DRUG --> D2["MOHリスクが蓄積"]
DRUG --> D3["心理的慢性化因子は未解決"]

COMBO --> C1["急性症状の緩和\\n（薬剤使用量を削減しながら）"]
COMBO --> C2["慢性化プロセスへの直接介入\\n（中枢感作・疼痛破局化）"]
COMBO --> C3["再発率の低下\\n（技法の自己管理化による長期効果）"]
COMBO --> C4["MOHリスクの積極的軽減"]

C1 & C2 & C3 & C4 --> OUTCOME["📊 治療目標：≥50% 頭痛日数減少\\nHIT-6 / MIDAS スコア改善\\nQOLの回復"]

style DRUG fill:#922b21,color:#fff
style COMBO fill:#1a6b3c,color:#fff
style OUTCOME fill:#1a237e,color:#fff`}
              />
            </div>

            <div className="alert a-info">
              <div className="alert-i">📌</div>
              <div>
                <strong>主要エビデンスソース（統合療法優位性）</strong>
                <br />
                AAN 2012 行動・理学療法ガイドライン:{" "}
                <Ext href="https://www.aan.com/guidelines/home/getguidelinecontent/383">
                  aan.com/guidelines/…/383
                </Ext>
                <br />
                Cochrane 心理療法 SR（CBT/バイオフィードバック）:{" "}
                <Ext href="https://www.cochranelibrary.com/cdsr/doi/10.1002/14651858.CD012295.pub2/full">
                  cochranelibrary.com/…/CD012295.pub2
                </Ext>
              </div>
            </div>
          </section>

          {/* ============================================================ SECTION 2 */}
          <section id="s2" className="sec">
            <div className="sec-hd">
              <div className="sec-num">2</div>
              <h2 className="sec-title">必読：SNOOP4 レッドフラッグスクリーニング</h2>
            </div>

            <div className="alert a-danger">
              <div className="alert-i">⛔</div>
              <div>
                すべての心理・行動療法の開始前に、以下の
                <strong>二次性頭痛（危険な疾患が原因）の除外</strong>
                を必ず行うこと。一項目でも該当する場合は心理・行動療法を開始せず、神経内科へ緊急紹介する。
              </div>
            </div>

            <div className="snoop-grid">
              <div className="sn">
                <div className="sn-letter">S</div>
                <div className="sn-title">Systemic symptoms（全身症状）</div>
                <div className="sn-symp">
                  発熱・髄膜刺激症状・体重減少・免疫抑制状態・悪性腫瘍既往
                </div>
                <div className="sn-dx">髄膜炎・脳炎・転移性脳腫瘍</div>
              </div>
              <div className="sn">
                <div className="sn-letter">N</div>
                <div className="sn-title">Neurological deficits（神経学的欠落）</div>
                <div className="sn-symp">運動麻痺・感覚障害・失語・複視・意識変容・認知変化</div>
                <div className="sn-dx">脳血管障害・占拠性病変</div>
              </div>
              <div className="sn">
                <div className="sn-letter">O</div>
                <div className="sn-title">Onset sudden（突発発症 / thunderclap）</div>
                <div className="sn-symp">「生涯最悪の頭痛」が数秒で最大に達する</div>
                <div className="sn-dx">くも膜下出血（SAH）→ 緊急CT</div>
              </div>
              <div className="sn">
                <div className="sn-letter">O</div>
                <div className="sn-title">Onset after age 50（50歳以降発症）</div>
                <div className="sn-symp">50歳以降の新規発症頭痛</div>
                <div className="sn-dx">側頭動脈炎・頭蓋内病変</div>
              </div>
              <div className="sn">
                <div className="sn-letter">P</div>
                <div className="sn-title">Pattern change（パターン変化）</div>
                <div className="sn-symp">
                  進行性増悪・体位依存（仰臥位で悪化→頭蓋内圧↑；直立で悪化→低髄液圧）
                </div>
                <div className="sn-dx">頭蓋内圧亢進・硬膜下血腫</div>
              </div>
              <div className="sn">
                <div className="sn-letter">4</div>
                <div className="sn-title">Papilledema / Postdural / Post-seizure / Pregnancy</div>
                <div className="sn-symp">うっ血乳頭・硬膜穿刺後・発作後・妊娠/産褥期</div>
                <div className="sn-dx">それぞれの緊急病態</div>
              </div>
            </div>

            <div className="alert a-info">
              <div className="alert-i">📌</div>
              <div>
                <strong>ソース</strong>：Dodick DW. "Pearls: Headache." Semin Neurol 2010; Dodick
                DW. Headache 2019. —{" "}
                <Ext href="https://pubmed.ncbi.nlm.nih.gov/31350744/">
                  pubmed.ncbi.nlm.nih.gov/31350744
                </Ext>
              </div>
            </div>
          </section>

          {/* ============================================================ SECTION 3 */}
          <section id="s3" className="sec">
            <div className="sec-hd">
              <div className="sec-num">3</div>
              <h2 className="sec-title">エビデンスグレードの読み方</h2>
            </div>

            <p>
              本文書では AAN（米国神経学会）/EHF（欧州頭痛連盟）の標準的な評価基準を使用します。
            </p>
            <div className="tbl">
              <table>
                <thead>
                  <tr>
                    <th>グレード</th>
                    <th>定義</th>
                    <th>意味</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <span className="bA">Grade A</span>
                    </td>
                    <td>≥2本の一貫した Class I RCT / Cochrane SR（低 heterogeneity）</td>
                    <td>強いエビデンス：臨床実践に採用すべき</td>
                  </tr>
                  <tr>
                    <td>
                      <span className="bB">Grade B</span>
                    </td>
                    <td>1本の Class I RCT または ≥2本の Class II 研究</td>
                    <td>可能性が高いエビデンス：推奨される</td>
                  </tr>
                  <tr>
                    <td>
                      <span className="bC">Grade C</span>
                    </td>
                    <td>1本の Class II または ≥2本の Class III 研究</td>
                    <td>可能性のあるエビデンス：考慮してよい</td>
                  </tr>
                  <tr>
                    <td>
                      <span className="bU">Grade U</span>
                    </td>
                    <td>不十分または相反するエビデンス</td>
                    <td>現時点では推奨できない</td>
                  </tr>
                  <tr>
                    <td>
                      <span className="bExp">Expert</span>
                    </td>
                    <td>RCT なし、ガイドライン委員会コンセンサス</td>
                    <td>専門家意見</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* ============================================================ SECTION 4 */}
          <section id="s4" className="sec">
            <div className="sec-hd">
              <div className="sec-num">4</div>
              <h2 className="sec-title">神経科学的基盤 — 心理と頭痛をつなぐ脳内メカニズム</h2>
            </div>

            <p>
              「心理療法は気持ちの問題を扱うだけ」というのは誤解です。頭痛と心理的因子の関係には、以下の
              <strong>明確な神経生物学的基盤</strong>があります。
            </p>

            <div className="mmd">
              <div className="mmd-lbl">
                フローチャート — ストレスから慢性化へ、そして介入ポイント
              </div>
              <MermaidDiagram
                themeVariables={MIND_MERMAID_THEME}
                chart={`flowchart TD
STRESS["⚡ 心理的ストレス・感情反応"]

STRESS --> HPA["視床下部—下垂体—副腎皮質軸\\n（HPA axis）\\nコルチゾール↑・CRH↑"]
STRESS --> LIMBIC["辺縁系（扁桃体・島皮質）\\n感情処理 of 過活動"]
STRESS --> ANS["自律神経系\\n交感神経過緊張\\n→ 頸部・頭部筋緊張↑"]

HPA --> CS["🔴 中枢感作\\n（Central Sensitization）\\n脊髄後角・脳幹の過剰感受性\\n→ 慢性化の核心機序"]
LIMBIC --> CATAS["疼痛破局化\\n（Pain Catastrophizing）\\n痛みの過大評価・無力感\\n→ 慢性化の独立予測因子"]
ANS --> TP["トリガーポイント形成\\n→ 緊張型頭痛・片頭痛の増悪"]

CS & CATAS & TP --> CHRONIC["慢性頭痛への移行\\n（Episodic → Chronic）"]

INTERV["✅ 心理・行動療法の介入ポイント"]
INTERV --> I1["CBT → 疼痛破局化の修正\\n認知再構成"]
INTERV --> I2["バイオフィードバック → 自律神経調節\\n筋緊張の自己制御"]
INTERV --> I3["MBSR / PMR → HPA軸の正常化\\nコルチゾール↓"]
INTERV --> I4["有酸素運動 → BDNF↑\\n中枢感作の逆転"]

I1 -.->|修正| CATAS
I2 -.->|制御| ANS
I3 -.->|調節| HPA
I4 -.->|抑制| CS

style STRESS fill:#922b21,color:#fff
style CHRONIC fill:#8B0000,color:#fff
style INTERV fill:#1a6b3c,color:#fff
style I1 fill:#1b4332,color:#fff
style I2 fill:#1b4332,color:#fff
style I3 fill:#1b4332,color:#fff
style I4 fill:#1b4332,color:#fff`}
              />
            </div>

            <h3>主要な神経科学的機序まとめ</h3>
            <div className="tbl th-purple">
              <table>
                <thead>
                  <tr>
                    <th>機序</th>
                    <th>詳細</th>
                    <th>心理療法による介入</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <strong>視床下部—辺縁系—脳幹軸</strong>
                    </td>
                    <td>ストレス・感情が三叉神経核（TNC）の興奮閾値を直接変調</td>
                    <td>CBT・MBSR による前頭前野の調節能力強化</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>下降性疼痛抑制系（DPMS）</strong>
                    </td>
                    <td>PAG（中脳水道周囲灰白質）を介するオピオイド性抑制；ストレスで弱化</td>
                    <td>リラクゼーション・バイオフィードバックで副交感神経優位化</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>中枢感作</strong>
                    </td>
                    <td>繰り返す疼痛刺激が脊髄後角・脳幹を「過剰感受性」化 → 慢性化</td>
                    <td>有酸素運動による BDNF 上昇で神経可塑性を回復</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>疼痛破局化</strong>
                    </td>
                    <td>痛みの過大評価・無力感・反芻思考；慢性化・頻度増加の独立予測因子</td>
                    <td>CBT の認知再構成が最も直接的に介入</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>HPA 軸の過活動</strong>
                    </td>
                    <td>慢性ストレス → コルチゾール過剰 → 炎症性メディエーター増加</td>
                    <td>MBSR・PMR がコルチゾール日内変動を正常化</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* ============================================================ SECTION 5 */}
          <section id="s5" className="sec">
            <div className="sec-hd">
              <div className="sec-num">5</div>
              <h2 className="sec-title">
                PART I 心理療法 — 全体マップ ＋ STEP1 認知行動療法（CBT）
              </h2>
            </div>

            <h3>療法選択の全体マップ</h3>
            <div className="mmd">
              <div className="mmd-lbl">フローチャート — 患者プロファイルから心理療法を選択する</div>
              <MermaidDiagram
                themeVariables={MIND_MERMAID_THEME}
                chart={`flowchart TD
ENTRY["患者プロファイル評価"]
ENTRY --> Q1{"不安・うつ症状あり\\nまたは慢性化（≥15日/月）？"}
ENTRY --> Q2{"筋緊張・自律神経症状が主体？"}
ENTRY --> Q3{"中枢感作が進行？\\n薬剤を忌避したい？"}
ENTRY --> Q4{"痛みへの過剰な感情反応？\\n回避行動？"}

Q1 -->|"Yes"| CBT["→ STEP 1: CBT\\n[Grade B]\\n認知再構成・行動活性化"]
Q2 -->|"Yes"| BF["→ STEP 2: バイオフィードバック\\n[Grade A]\\nEMG / 熱 / HRV"]
Q3 -->|"Yes"| RELAX["→ STEP 3: PMR / AT\\n[Grade B]\\n漸進的筋弛緩・自律訓練"]
Q3 -->|"Yes"| MBSR["→ STEP 4: MBSR\\n[Grade C]\\nマインドフルネス8週"]
Q4 -->|"Yes"| ACT["→ STEP 5: ACT\\n[Grade C/U]\\nアクセプタンス療法"]

CBT & BF & RELAX & MBSR & ACT --> COMBINE["多くの場合、2〜3種の組み合わせが最も効果的\\n（CBT ＋ バイオフィードバック が最頻推奨）"]

style CBT fill:#4a235a,color:#fff
style BF fill:#154360,color:#fff
style RELAX fill:#1b4332,color:#fff
style MBSR fill:#7b3f00,color:#fff
style ACT fill:#5d4037,color:#fff
style COMBINE fill:#1a6b3c,color:#fff`}
              />
            </div>

            <h3>
              STEP 1：認知行動療法（CBT）{" "}
              <span className="bB">Grade B — AAN / EHF / Cochrane SR</span>
            </h3>
            <h4>CBT ととは？（初学者向け解説）</h4>
            <p>
              <strong>認知行動療法（Cognitive Behavioral Therapy: CBT）</strong>
              は、「考え方のクセ（認知）」と「行動パターン」の悪循環を特定し、より適応的なパターンへと修正する心理療法です。慢性頭痛において、CBT
              は疼痛体験そのものを変えるのではなく、
              <strong>痛みに対する反応（認知・感情・行動）を変える</strong>
              ことで慢性化を防ぎます。
            </p>
            {/* 忠実転記：元の HTML に「CBT ととは？」という二重文字誤字があるので、そのまま再現します */}

            <h4>頭痛における CBT の悪循環モデル</h4>
            <div className="mmd">
              <div className="mmd-lbl">
                フローチャート — CBT が断ち切る悪循環と4つの介入ポイント
              </div>
              <MermaidDiagram
                themeVariables={MIND_MERMAID_THEME}
                chart={`flowchart TD
TRIGGER_P["⚡ 頭痛発症・ストレス"]

TRIGGER_P --> THOUGHT["🧠 自動思考（認知）\\n『また頭痛だ。今日も1日終わった』\\n『絶対治らない（破局化思考）』\\n『自分は役に立たない（無力感）』"]

THOUGHT --> EMOTION["💔 感情反応\\n不安・うつ・怒り・絶望感"]
EMOTION --> BEHAVIOR["🚶 行動パターン\\n社会的引きこもり\\n過剰な薬剤使用（→MOH）\\n活動回避 → 機能低下"]
BEHAVIOR --> PHYS["🔴 身体反応\\n筋緊張↑・睡眠障害・HPA軸過活動\\n頭痛の慢性化促進"]
PHYS --> TRIGGER_P

CBT_INT["✅ CBT の4つの介入ポイント"]
CBT_INT --> C1["① 認知再構成\\n→ 破局化思考を現実的・適応的思考に書き換える"]
CBT_INT --> C2["② 行動活性化\\n→ 段階的な活動参加・回避の克服"]
CBT_INT --> C3["③ 対処スキル訓練\\n→ 痛みへの適応的対処法の習得"]
CBT_INT --> C4["④ 再発防止\\n→ 前兆認識と早期対処計画の個別化"]

C1 -.->|「現実的な思考」に修正| THOUGHT
C2 -.->|「段階的行動」に置換| BEHAVIOR
C3 -.->|「感情調節」で緩和| EMOTION
C4 -.->|「早期対処」でトリガー制御| TRIGGER_P

style PHYS fill:#8B0000,color:#fff
style THOUGHT fill:#922b21,color:#fff
style CBT_INT fill:#1a6b3c,color:#fff
style C1 fill:#1b4332,color:#fff
style C2 fill:#1b4332,color:#fff
style C3 fill:#1b4332,color:#fff
style C4 fill:#1b4332,color:#fff`}
              />
            </div>

            <h4>標準的 CBT プログラム構成（12セッション）</h4>
            <div className="tbl">
              <table>
                <thead>
                  <tr>
                    <th>セッション</th>
                    <th>テーマ</th>
                    <th>主な内容</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>1〜2回目</td>
                    <td>心理教育</td>
                    <td>
                      慢性頭痛のバイオサイコソーシャルモデルの理解；頭痛日誌解析；個別目標設定
                    </td>
                  </tr>
                  <tr>
                    <td>3〜4回目</td>
                    <td>認知の同定</td>
                    <td>自動思考・頭痛に対する信念の特定；コラム法（ABCモデル）の練習</td>
                  </tr>
                  <tr>
                    <td>5〜6回目</td>
                    <td>認知再構成</td>
                    <td>非機能的思考の同定；証拠の検討；現実的・適応的思考への書き換え</td>
                  </tr>
                  <tr>
                    <td>7〜8回目</td>
                    <td>行動活性化</td>
                    <td>活動回避パターンの特定；段階的克服；価値に基づく行動計画</td>
                  </tr>
                  <tr>
                    <td>9〜10回目</td>
                    <td>対処スキル</td>
                    <td>発作時の対処計画（Pain Coping Plan）；ストレス管理スキルの実践</td>
                  </tr>
                  <tr>
                    <td>11〜12回目</td>
                    <td>再発防止</td>
                    <td>前兆（Prodrome）の個別認識；維持計画の作成；セルフモニタリング</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h4>認知再構成の実践例（ABCモデル）</h4>
            <div className="tbl th-purple">
              <table>
                <thead>
                  <tr>
                    <th>要素</th>
                    <th>例</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <strong>A：出来事（Activating Event）</strong>
                    </td>
                    <td>仕事中に頭痛が始まった</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>B：信念（Belief）</strong>
                    </td>
                    <td>「また片頭痛だ。今日のプレゼンも台無し。私はいつもこうだ」（破局化）</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>C：結果（Consequence）</strong>
                    </td>
                    <td>強い不安・集中力低下・過剰な鎮痛薬使用</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>D：反駁（Disputation）</strong>
                    </td>
                    <td>
                      「過去にも発表中に頭痛があったが乗り切った。今日も対処できる可能性がある」
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <strong>E：代替思考（Effect）</strong>
                    </td>
                    <td>
                      「休憩をとり、水分補給と呼吸法で対処してみよう。最悪の場合は相談できる」
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h4>CBT エビデンスサマリー</h4>
            <div className="tbl">
              <table>
                <thead>
                  <tr>
                    <th>研究</th>
                    <th>主要知見</th>
                    <th>グレード</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      Holroyd KA et al. <em>JAMA</em> 2001
                    </td>
                    <td>CBT＋アミトリプチリンで薬物単独より有意な頭痛頻度減少（慢性TTH）</td>
                    <td>
                      <span className="bA">Grade A</span>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      Andrasik F. <em>Headache</em> 2004
                    </td>
                    <td>CBT はトリプタンと同等の長期的有効性（片頭痛）</td>
                    <td>
                      <span className="bB">Grade B</span>
                    </td>
                  </tr>
                  <tr>
                    <td>Cochrane SR 2017（Martin PR et al.）</td>
                    <td>心理療法（CBT・バイオフィードバック）は片頭痛予防に有効</td>
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
                <strong>ソース</strong>
                <br />
                Cochrane 心理療法レビュー（CBT/バイオフィードバック）:{" "}
                <Ext href="https://www.cochranelibrary.com/cdsr/doi/10.1002/14651858.CD012295.pub2/full">
                  cochranelibrary.com/…/CD012295.pub2
                </Ext>
                <br />
                Holroyd KA et al. JAMA 2001 — PubMed:{" "}
                <Ext href="https://pubmed.ncbi.nlm.nih.gov/11325323/">
                  pubmed.ncbi.nlm.nih.gov/11325323
                </Ext>
                <br />
                AAN 2012 行動療法ガイドライン:{" "}
                <Ext href="https://www.aan.com/guidelines/home/getguidelinecontent/383">
                  aan.com/guidelines/…/383
                </Ext>
              </div>
            </div>
          </section>

          {/* ============================================================ SECTION 6 */}
          <section id="s6" className="sec">
            <div className="sec-hd">
              <div className="sec-num">6</div>
              <h2 className="sec-title">STEP2 バイオフィードバック</h2>
            </div>

            <p>
              <span className="bA">Grade A（EMG・熱）</span>{" "}
              <span className="bB">Grade B（HRV）— AAN 2012</span>
            </p>

            <h3>バイオフィードバックとは？（初学者向け解説）</h3>
            <p>
              <strong>バイオフィードバック（Biofeedback）</strong>
              は、通常は意識下にある生理的信号（筋電図・皮膚温・心拍変動）をリアルタイムで可視化・音声化し、その信号を
              <strong>意識的にコントロールする訓練法</strong>
              です。繰り返すことで自律神経・筋緊張の自己制御能力が確立されます。
            </p>

            <h3>種類とエビデンス</h3>
            <div className="tbl th-teal">
              <table>
                <thead>
                  <tr>
                    <th>種類</th>
                    <th>計測パラメータ</th>
                    <th>主な対象頭痛</th>
                    <th>エビデンス</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <strong>EMG バイオフィードバック</strong>
                    </td>
                    <td>前頭筋・僧帽筋の筋電図（μV）</td>
                    <td>緊張型頭痛（第一選択）・片頭痛</td>
                    <td>
                      <span className="bA">Grade A（AAN）</span>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <strong>熱（皮膚温）バイオフィードバック</strong>
                    </td>
                    <td>指先皮膚温（℃）：末梢血管の代替指標</td>
                    <td>片頭痛（特に有効）・自律神経症状</td>
                    <td>
                      <span className="bA">Grade A（AAN）</span>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <strong>HRV バイオフィードバック</strong>
                    </td>
                    <td>心拍変動（ms²）：迷走神経トーン</td>
                    <td>慢性頭痛・自律神経障害合併</td>
                    <td>
                      <span className="bB">Grade B</span>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <strong>EEG ニューロフィードバック</strong>
                    </td>
                    <td>α/θ波パターン</td>
                    <td>慢性頭痛（一部）</td>
                    <td>
                      <span className="bC">Grade C</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3>EMG バイオフィードバック：ステップバイステップ手順</h3>
            <div className="mmd">
              <div className="mmd-lbl">フローチャート — EMG バイオフィードバックの6ステップ</div>
              <MermaidDiagram
                themeVariables={MIND_MERMAID_THEME}
                chart={`flowchart LR
S1["🔬 Step 1\\n【評価・設定】\\n電極を前頭筋（Fp1-Fp2）\\nまたは僧帽筋上部に装着\\n安静時ベースラインEMGを\\n3分間記録\\n（目標 &lt; 2.0 μV が理想的弛緩状態）"]

S2["📊 Step 2\\n【フィードバック開始】\\n音または数値でリアルタイム提示\\n目標：音が低くなる方向に\\n自発的に調整\\n（= 筋緊張の低下）"]

S3["🌬️ Step 3\\n【呼吸技法の統合】\\n腹式呼吸（4-7-8 法）と同時実施\\n吸気4秒 → 保持7秒 → 呼気8秒\\n3〜4サイクル繰り返す"]

S4["🌄 Step 4\\n【視覚化の統合】\\n暖かく穏やかな場面を想像\\n体の各部位が温かく\\n重くなる感覚に集中"]

S5["⏱️ Step 5\\n【セッション管理】\\n1セッション：20〜30分\\n頻度：週2〜3回\\n期間：8〜12週\\nNNT ≈ 4〜5"]

S6["🏠 Step 6\\n【ホーム移行】\\n携帯型 EMG デバイスを使用\\n毎日 15〜20分の自主練習\\n（長期維持に必須）"]

S1 --> S2 --> S3 --> S4 --> S5 --> S6`}
              />
            </div>

            <h3>バイオフィードバック エビデンスサマリー</h3>
            <div className="tbl">
              <table>
                <thead>
                  <tr>
                    <th>研究</th>
                    <th>主要知見</th>
                    <th>グレード</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      Nestoriuc Y &amp; Martin A. <em>Pain</em> 2007（メタ解析、55試験）
                    </td>
                    <td>片頭痛に対し効果量 d = 0.58（中〜大）；薬物療法と同等</td>
                    <td>
                      <span className="bA">Grade A（片頭痛）</span>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      Nestoriuc Y et al. <em>J Consult Clin Psychol</em> 2008（メタ解析）
                    </td>
                    <td>
                      緊張型頭痛での EMG バイオフィードバック：頻度・強度・持続時間すべてで有意改善
                    </td>
                    <td>
                      <span className="bA">Grade A（TTH）</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="alert a-info">
              <div className="alert-i">📌</div>
              <div>
                <strong>ソース</strong>
                <br />
                Nestoriuc Y &amp; Martin A. <em>Pain</em> 2007:{" "}
                <Ext href="https://pubmed.ncbi.nlm.nih.gov/17097218/">
                  pubmed.ncbi.nlm.nih.gov/17097218
                </Ext>
                <br />
                Nestoriuc Y et al. <em>J Consult Clin Psychol</em> 2008:{" "}
                <Ext href="https://pubmed.ncbi.nlm.nih.gov/18426234/">
                  pubmed.ncbi.nlm.nih.gov/18426234
                </Ext>
                <br />
                AAN 2012 行動・理学療法ガイドライン:{" "}
                <Ext href="https://www.aan.com/guidelines/home/getguidelinecontent/383">
                  aan.com/guidelines/…/383
                </Ext>
              </div>
            </div>
          </section>

          {/* ============================================================ SECTION 7 */}
          <section id="s7" className="sec">
            <div className="sec-hd">
              <div className="sec-num">7</div>
              <h2 className="sec-title">STEP3 漸進的筋弛緩法（PMR）・自律訓練法（AT）</h2>
            </div>

            <p>
              <span className="bB">Grade B — AAN / EHF</span>
            </p>

            <h3>A. 漸進的筋弛緩法（Progressive Muscle Relaxation: PMR）</h3>
            <p>
              <strong>原理</strong>
              ：全身の筋肉グループを順番に「緊張させてから一気に脱力」する訓練。筋緊張の存在に気づく能力と、意識的に弛緩させる能力を同時に高めます。バイオフィードバックの「セルフ版」とも言えます。
            </p>
            <div className="tbl th-teal">
              <table>
                <thead>
                  <tr>
                    <th>順序</th>
                    <th>筋肉グループ</th>
                    <th>緊張方法</th>
                    <th>緊張時間</th>
                    <th>弛緩時間</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>1</td>
                    <td>両手・前腕（利き手から）</td>
                    <td>強く握りしめる</td>
                    <td>5〜7秒</td>
                    <td>20〜30秒</td>
                  </tr>
                  <tr>
                    <td>2</td>
                    <td>二頭筋</td>
                    <td>力こぶを作る</td>
                    <td>5〜7秒</td>
                    <td>20〜30秒</td>
                  </tr>
                  <tr>
                    <td>3</td>
                    <td>三頭筋</td>
                    <td>肘を伸ばして後方に押す</td>
                    <td>5〜7秒</td>
                    <td>20〜30秒</td>
                  </tr>
                  <tr>
                    <td>4</td>
                    <td>肩・頸部</td>
                    <td>肩を耳に向けて引き上げる</td>
                    <td>5〜7秒</td>
                    <td>20〜30秒</td>
                  </tr>
                  <tr>
                    <td>5</td>
                    <td>顔（額）</td>
                    <td>眉を引き上げる</td>
                    <td>5〜7秒</td>
                    <td>20〜30秒</td>
                  </tr>
                  <tr>
                    <td>6</td>
                    <td>顔（目・頬）</td>
                    <td>目を強くつぶる</td>
                    <td>5〜7秒</td>
                    <td>20〜30秒</td>
                  </tr>
                  <tr>
                    <td>7</td>
                    <td>顎</td>
                    <td>歯を噛みしめる</td>
                    <td>5〜7秒</td>
                    <td>20〜30秒</td>
                  </tr>
                  <tr>
                    <td>8</td>
                    <td>胸・背中</td>
                    <td>深呼吸して胸を膨らませ背筋を緊張</td>
                    <td>5〜7秒</td>
                    <td>20〜30秒</td>
                  </tr>
                  <tr>
                    <td>9</td>
                    <td>腹部</td>
                    <td>腹筋を引き締める</td>
                    <td>5〜7秒</td>
                    <td>20〜30秒</td>
                  </tr>
                  <tr>
                    <td>10</td>
                    <td>大腿〜ふくらはぎ〜足</td>
                    <td>足首を背屈し・つま先を引く</td>
                    <td>5〜7秒</td>
                    <td>20〜30秒</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="alert a-ok">
              <div className="alert-i">⏱️</div>
              <div>
                <strong>実施目安</strong>：1セッション20〜30分 / 1日1〜2回 / 週5回以上が理想
              </div>
            </div>

            <h3>
              B. 自律訓練法（Autogenic Training: AT） <span className="bB">Grade B — EHF</span>
            </h3>
            <p>
              J.H. Schultz が開発した自己暗示技法。以下の6段階を順に習得します。
              <strong>特に「第6公式（頭部涼感）」が頭痛患者に重要</strong>です。
            </p>
            <div className="tbl th-purple">
              <table>
                <thead>
                  <tr>
                    <th>段階</th>
                    <th>内容</th>
                    <th>練習フレーズ例</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>第1公式</td>
                    <td>重感訓練</td>
                    <td>「両腕が非常に重い」</td>
                  </tr>
                  <tr>
                    <td>第2公式</td>
                    <td>温感訓練</td>
                    <td>「両腕が非常に温かい」</td>
                  </tr>
                  <tr>
                    <td>第3公式</td>
                    <td>心臓調整</td>
                    <td>「心臓が静かに規則正しく打っている」</td>
                  </tr>
                  <tr>
                    <td>第4公式</td>
                    <td>呼吸調整</td>
                    <td>「呼吸が自然に楽に行われている」</td>
                  </tr>
                  <tr>
                    <td>第5公式</td>
                    <td>腹部温感</td>
                    <td>「お腹が温かい」</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>第6公式</strong>
                    </td>
                    <td>
                      <strong>頭部涼感</strong>
                    </td>
                    <td>
                      <strong>「頭が涼しく清々しい」</strong>← 頭痛患者に特に重要
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="alert a-ok">
              <div className="alert-i">⏱️</div>
              <div>
                <strong>実施目安</strong>：1回10〜20分 / 1日2〜3回 / 継続6週間で効果を評価
              </div>
            </div>

            <div className="alert a-info">
              <div className="alert-i">📌</div>
              <div>
                <strong>ソース</strong>
                <br />
                AAN 2012 ガイドライン（リラクゼーション）:{" "}
                <Ext href="https://www.aan.com/guidelines/home/getguidelinecontent/383">
                  aan.com/guidelines/…/383
                </Ext>
                <br />
                EHF 片頭痛予防ガイドライン 2022（PMC全文）:{" "}
                <Ext href="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC9188162/">
                  ncbi.nlm.nih.gov/pmc/articles/PMC9188162
                </Ext>
              </div>
            </div>
          </section>

          {/* ============================================================ SECTION 8 */}
          <section id="s8" className="sec">
            <div className="sec-hd">
              <div className="sec-num">8</div>
              <h2 className="sec-title">STEP4 マインドフルネスストレス低減法（MBSR）</h2>
            </div>

            <p>
              <span className="bC">Grade C — Cochrane SR / 有望なエビデンス</span>
            </p>

            <h3>MBSR とは？（初学者向け解説）</h3>
            <p>
              <strong>
                マインドフルネスストレス低減法（Mindfulness-Based Stress Reduction: MBSR）
              </strong>
              は、Jon Kabat-Zinn が開発した<strong>8週間の構造化プログラム</strong>
              です。「今この瞬間の経験を、評価せず・判断せずに観察する能力」を系統的に訓練します。慢性頭痛では、痛みへの反応パターン（破局化・過覚醒）の変容が目的です。
            </p>

            <h3>MBSR の神経科学的作用機序</h3>
            <div className="tbl th-purple">
              <table>
                <thead>
                  <tr>
                    <th>標的機序</th>
                    <th>内容</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>疼痛破局化の低下</td>
                    <td>内側前頭前野・前帯状回の皮質厚増加 → 痛みへの過剰な感情反応を抑制</td>
                  </tr>
                  <tr>
                    <td>中枢感作の緩和</td>
                    <td>島皮質・扁桃体の過活動を正常化 → 痛みの主観的体験の変容</td>
                  </tr>
                  <tr>
                    <td>HPA 軸の調節</td>
                    <td>コルチゾール分泌の正常化 → 慢性ストレス関連トリガーの軽減</td>
                  </tr>
                  <tr>
                    <td>睡眠質の改善</td>
                    <td>夜間コルチゾールの低下 → 入眠容易性・睡眠効率の向上</td>
                  </tr>
                  <tr>
                    <td>自律神経調節</td>
                    <td>副交感神経活動の増加（HRV 改善）→ 血管反応性の安定化</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3>標準 MBSR プログラム（8週間）</h3>
            <div className="tbl">
              <table>
                <thead>
                  <tr>
                    <th>週</th>
                    <th>テーマ</th>
                    <th>主な実践</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>1〜2週</td>
                    <td>自動操縦への気づき</td>
                    <td>ボディスキャン（20〜45分）；食べるマインドフルネス</td>
                  </tr>
                  <tr>
                    <td>3〜4週</td>
                    <td>現在への注意</td>
                    <td>呼吸への注意；マインドフルヨーガ（軽度の動き）</td>
                  </tr>
                  <tr>
                    <td>5〜6週</td>
                    <td>ストレス反応の認識</td>
                    <td>困難との向き合い；感情のマインドフルネス；痛みの観察</td>
                  </tr>
                  <tr>
                    <td>7〜8週</td>
                    <td>コミュニケーション・維持</td>
                    <td>日常への統合；個別維持計画の作成</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>自宅練習</strong>
                    </td>
                    <td>—</td>
                    <td>
                      <strong>毎日 45分（正式練習）＋ 非公式の日常実践</strong>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3>CBT vs. MBSR — 初学者のための比較</h3>
            <div className="tbl">
              <table>
                <thead>
                  <tr>
                    <th>比較項目</th>
                    <th>CBT</th>
                    <th>MBSR</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>主な目標</td>
                    <td>不適応的な思考・行動を変える</td>
                    <td>思考・感情への反応のし方を変える</td>
                  </tr>
                  <tr>
                    <td>アプローチ</td>
                    <td>能動的：証拠を検討し「思考を修正」</td>
                    <td>受容的：思考を「ただ観察」する</td>
                  </tr>
                  <tr>
                    <td>構造化の度合い</td>
                    <td>高（セッションごとに明確なテーマ）</td>
                    <td>中（毎日の練習による漸進的変容）</td>
                  </tr>
                  <tr>
                    <td>効果が出やすい対象</td>
                    <td>不安・うつ合併；MOH からの離脱</td>
                    <td>慢性化・中枢感作が進んだ症例</td>
                  </tr>
                  <tr>
                    <td>エビデンスグレード</td>
                    <td>
                      <span className="bB">Grade B</span>（AAN / Cochrane）
                    </td>
                    <td>
                      <span className="bC">Grade C</span>（現在進行中のRCTあり）
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="alert a-info">
              <div className="alert-i">📌</div>
              <div>
                <strong>ソース</strong>
                <br />
                Cochrane 心理療法レビュー（片頭痛）:{" "}
                <Ext href="https://www.cochranelibrary.com/cdsr/doi/10.1002/14651858.CD012295.pub2/full">
                  cochranelibrary.com/…/CD012295.pub2
                </Ext>
                <br />
                MBSR 公式プログラム（UMass Medical School）:{" "}
                <Ext href="https://www.umassmed.edu/cfm/mindfulness-based-programs/mbsr-courses/">
                  umassmed.edu/cfm/…/mbsr-courses
                </Ext>
              </div>
            </div>
          </section>

          {/* ============================================================ SECTION 9 */}
          <section id="s9" className="sec">
            <div className="sec-hd">
              <div className="sec-num">9</div>
              <h2 className="sec-title">STEP5 アクセプタンス＆コミットメント療法（ACT）</h2>
            </div>

            <p>
              <span className="bC">Grade C / U — 現在データ蓄積中</span>
            </p>

            <h3>ACT とは？（初学者向け解説）</h3>
            <p>
              <strong>
                アクセプタンス＆コミットメント療法（Acceptance and Commitment Therapy: ACT）
              </strong>
              は、痛みを「取り除くべき敵」とするのではなく、痛みを含めた現在の体験を
              <strong>ありのままに受け入れ（アクセプタンス）</strong>、自分の人生において
              <strong>価値があると思う行動へコミットする</strong>ことを支援する心理療法です。
            </p>

            <h3>ACT の6つのコアプロセス（慢性頭痛への適用）</h3>
            <div className="tbl th-purple">
              <table>
                <thead>
                  <tr>
                    <th>プロセス</th>
                    <th>慢性頭痛における定義</th>
                    <th>具体的な介入アプローチ</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <strong>1. アクセプタンス</strong>
                    </td>
                    <td>痛みや不快感をコントロールしようと戦うことをやめ、そのまま存在させる</td>
                    <td>
                      「痛みをコントロールしようとする努力」がどれだけ生活を狭めているか検討する
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <strong>2. 認知の脱フュージョン</strong>
                    </td>
                    <td>
                      「この痛みがある限り何もできない」といった思考と一体化（フュージョン）した状態から距離を置く
                    </td>
                    <td>
                      「私は〜という思考を持っている」と表現し、思考を単なる言葉として観察する
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <strong>3. 今この瞬間との接触</strong>
                    </td>
                    <td>
                      未来の痛みへの不安や過去の健康な状態への執着から離れ、現在に注意を向ける
                    </td>
                    <td>呼吸や周囲の感覚（5感）に注意を向けるマインドフルネスエクササイズ</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>4. 文脈としての自己</strong>
                    </td>
                    <td>
                      「痛みに苦しむ自分」という固定化された自己像から、それを観察している超越的な自己に気づく
                    </td>
                    <td>
                      「思考や感情は変化するが、それを観察している『あなた』は常に安全である」というメタファー
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <strong>5. 価値の明確化</strong>
                    </td>
                    <td>
                      痛みの有無にかかわらず、自分が人生で本当に大切にしたい方向性や領域を同定する
                    </td>
                    <td>
                      「もし痛みが明日魔法のように消えたら、何をしたいか？」という問いから価値を定義
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <strong>6. コミットされた行為</strong>
                    </td>
                    <td>価値に沿った段階的で具体的な行動計画を設定し、実行する</td>
                    <td>
                      「たとえ頭痛があっても、子供と10分間本を読む」といった価値に基づく具体的な行動実践
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="alert a-info">
              <div className="alert-i">📌</div>
              <div>
                <strong>ソース</strong>
                <br />
                Association for Contextual Behavioral Science (ACBS):{" "}
                <Ext href="https://contextualscience.org/">contextualscience.org</Ext>
                <br />
                ACT 慢性疼痛ガイドライン:{" "}
                <Ext href="https://www.diva-portal.org/smash/get/diva2:1083995/FULLTEXT01.pdf">
                  diva-portal.org/…/FULLTEXT01.pdf
                </Ext>
              </div>
            </div>
          </section>

          {/* ============================================================ SECTION 10 */}
          <section id="s10" className="sec">
            <div className="sec-hd">
              <div className="sec-num">10</div>
              <h2 className="sec-title">PART II 行動療法 — 睡眠・運動・頭痛日誌・環境</h2>
            </div>

            <h3>
              STEP6 睡眠衛生指導 <span className="bB">Grade B — AAN / AASM / NICE CG150</span>
            </h3>
            <h4>なぜ睡眠が頭痛に直接影響するのか？（神経生物学的機序）</h4>
            <div className="tbl th-red">
              <table>
                <thead>
                  <tr>
                    <th>睡眠異常のタイプ</th>
                    <th>頭痛への影響メカニズム</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <strong>睡眠不足（&lt; 6時間）</strong>
                    </td>
                    <td>コルチゾール上昇・セロトニン低下 → 中枢感作増悪；痛み閾値↓</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>過剰睡眠（&gt; 9時間）</strong>
                    </td>
                    <td>セロトニン代謝変化 → 週末の「週末型片頭痛」の主因</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>睡眠スケジュール不規則性</strong>
                    </td>
                    <td>サーカディアンリズム障害 → 視床下部（頭痛の「発電所」）の不安定化</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>睡眠時無呼吸（SAS）</strong>
                    </td>
                    <td>低酸素血症 → 慢性早朝頭痛の最重要原因の一つ</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>REM 睡眠の障害</strong>
                    </td>
                    <td>REM 関連群発頭痛発作の誘発；慢性頭痛の REM 比率低下</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h4>睡眠衛生の10原則（国際標準）</h4>
            <div className="tbl">
              <table>
                <thead>
                  <tr>
                    <th>原則</th>
                    <th>具体的実践</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <strong>① 規則的な就寝・起床時刻（最重要）</strong>
                    </td>
                    <td>週末・休日も同じ時刻を維持；変動は ±30分以内</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>② 適切な睡眠時間</strong>
                    </td>
                    <td>成人：7〜8時間（過剰・不足どちらも頭痛リスク↑）</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>③ 刺激物の制限</strong>
                    </td>
                    <td>カフェイン：就寝6時間前以降を避ける；アルコール：就寝前3時間以内は回避</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>④ 電子機器の制限</strong>
                    </td>
                    <td>就寝1時間前からブルーライト遮断（スマートフォン・PC・タブレット）</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>⑤ 寝室環境の最適化</strong>
                    </td>
                    <td>暗室・静音（耳栓）・室温 18〜22℃・低湿度</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>⑥ 運動のタイミング</strong>
                    </td>
                    <td>激しい運動は就寝3時間前以降を回避（軽度のヨーガ・ストレッチは可）</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>⑦ 食事のタイミング</strong>
                    </td>
                    <td>就寝2〜3時間前以降の重食を避ける（空腹も回避）</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>⑧ 就寝前ルーティンの確立</strong>
                    </td>
                    <td>20〜30分の「ウインドダウン」（入浴→軽読書→PMR）</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>⑨ 昼寝の管理</strong>
                    </td>
                    <td>15〜20分以内・午後3時前まで（夜間睡眠圧の維持）</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>⑩ 睡眠制限法（慢性不眠の場合）</strong>
                    </td>
                    <td>就寝時間を実際の睡眠時間に制限し徐々に延長（専門家指導下）</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="alert a-info">
              <div className="alert-i">📌</div>
              <div>
                <strong>ソース</strong>
                <br />
                American Academy of Sleep Medicine（AASM）:{" "}
                <Ext href="https://aasm.org/">aasm.org</Ext>
                <br />
                NICE CG150 頭痛ガイドライン:{" "}
                <Ext href="https://www.nice.org.uk/guidance/cg150">nice.org.uk/guidance/cg150</Ext>
                <br />
                EHF 片頭痛予防ガイドライン 2022:{" "}
                <Ext href="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC9188162/">
                  ncbi.nlm.nih.gov/pmc/articles/PMC9188162
                </Ext>
              </div>
            </div>

            <h3>
              STEP7 有酸素運動療法 <span className="bB">Grade B — AAN / EHF</span>
            </h3>
            <h4>なぜ有酸素運動が頭痛を減少させるのか？（神経生物学的機序）</h4>
            <div className="tbl th-teal">
              <table>
                <thead>
                  <tr>
                    <th>メカニズム</th>
                    <th>詳細</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <strong>内因性オピオイド放出</strong>
                    </td>
                    <td>β-エンドルフィン・エンケファリン分泌↑ → 中枢性鎮痛</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>セロトニン系の安定化</strong>
                    </td>
                    <td>5-HT 合成・放出の安定化 → 片頭痛予防に直接寄与</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>BDNF 上昇</strong>
                    </td>
                    <td>脳由来神経栄養因子 → 神経可塑性促進 → 中枢感作の逆転</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>ミトコンドリア機能改善</strong>
                    </td>
                    <td>運動適応 → ミトコンドリア数・機能↑（栄養補助との相乗）</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>HPA 軸の正常化</strong>
                    </td>
                    <td>ストレスホルモン軸の調節 → ストレス関連トリガーの軽減</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>頸部・肩甲帯の筋機能改善</strong>
                    </td>
                    <td>トリガーポイントの解消・筋緊張の正常化</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h4>推奨運動プロトコル（段階的導入）</h4>
            <div className="mmd">
              <div className="mmd-lbl">フローチャート — 12週間の段階的有酸素運動プロトコル</div>
              <MermaidDiagram
                themeVariables={MIND_MERMAID_THEME}
                chart={`flowchart LR
L0(["📋 LEVEL 0\\nベースライン評価\\nVAS 頭痛頻度・強度確認\\n運動耐容能の評価\\n（必要に応じて心肺機能検査）"])

L0 --> L1["🚶 LEVEL 1\\nWeek 1〜4 — 導入期\\nウォーキング\\n15〜20分/回\\n週3回\\nRPE 11〜12（楽〜ほどよい）"]

L1 --> L2["🏃 LEVEL 2\\nWeek 5〜8 — 構築期\\nウォーキング＋軽ジョギング\\n25〜30分/回\\n週3〜4回\\nRPE 12〜13（ほどよい）"]

L2 --> L3["🏃 LEVEL 3\\nWeek 9〜12 — 達成期\\n有酸素運動\\n30〜40分/回\\n週3〜5回\\nHRmax 50〜70%\\nRPE 12〜14"]

L3 --> MAINT["🏆 維持期（長期継続）\\n週3〜5回 × 30〜40分\\n種目は個人の好みで柔軟に選択\\n（水泳・自転車・ヨーガも可）"]

style L0 fill:#1a1a2e,color:#fff
style L1 fill:#1b4332,color:#fff
style L2 fill:#154360,color:#fff
style L3 fill:#4a235a,color:#fff
style MAINT fill:#27ae60,color:#fff`}
              />
            </div>
            <div className="alert a-ok">
              <div className="alert-i">📏</div>
              <div>
                <strong>Borg 自覚的運動強度（RPE）</strong> 0〜20の尺度：11 = 楽、12〜13 =
                ほどよい、14〜15 = やや辛い
              </div>
            </div>

            <h4>種目別適性</h4>
            <div className="tbl">
              <table>
                <thead>
                  <tr>
                    <th>種目</th>
                    <th>頭痛への適性</th>
                    <th>特記事項</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <strong>ウォーキング</strong>
                    </td>
                    <td>⭐⭐⭐⭐⭐</td>
                    <td>全年齢・体力レベルで開始可；発作への移行リスク最小</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>水泳・アクアビクス</strong>
                    </td>
                    <td>⭐⭐⭐⭐⭐</td>
                    <td>関節負荷なし；光・騒音刺激少；妊婦・高齢者に特に推奨</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>サイクリング（室内・屋外）</strong>
                    </td>
                    <td>⭐⭐⭐⭐</td>
                    <td>頸部への衝撃少；頸原性頭痛合併例に適</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>ヨーガ</strong>
                    </td>
                    <td>⭐⭐⭐⭐</td>
                    <td>呼吸制御・リラクゼーションとの統合；バイオフィードバックと相乗</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>ジョギング・ランニング</strong>
                    </td>
                    <td>⭐⭐⭐</td>
                    <td>運動習慣形成後に導入；衝撃性（頭部振動）に注意</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="alert a-warn">
              <div className="alert-i">⚠️</div>
              <div>
                <strong>頭痛発作中の激しい運動は禁忌</strong>
                （痛みを増悪させることが多い）。運動後の脱水は重要なトリガー：運動前後の水分補給（500mL
                以上）を徹底する。運動後に頭痛が増悪する場合は「運動誘発性頭痛（ICHD-3:
                4.2）」の可能性を考慮し専門医に相談。
              </div>
            </div>

            <h4>運動療法 エビデンスサマリー</h4>
            <div className="tbl">
              <table>
                <thead>
                  <tr>
                    <th>研究</th>
                    <th>主要知見</th>
                    <th>グレード</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      Varkey E et al. <em>Cephalalgia</em> 2011
                    </td>
                    <td>
                      週3回の有酸素運動がトピラマートおよびリラクゼーション法と
                      <strong>同等の予防効果</strong>
                    </td>
                    <td>
                      <span className="bB">Grade B</span>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      Darabaneanu S et al. <em>Int J Sports Med</em> 2011
                    </td>
                    <td>10週間の有酸素運動プログラムで頭痛頻度が有意に減少</td>
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
                <strong>ソース</strong>
                <br />
                Varkey E et al. <em>Cephalalgia</em> 2011:{" "}
                <Ext href="https://journals.sagepub.com/doi/10.1177/0333102411412385">
                  journals.sagepub.com/doi/10.1177/0333102411412385
                </Ext>
                <br />
                Darabaneanu S et al. <em>Int J Sports Med</em> 2011:{" "}
                <Ext href="https://pubmed.ncbi.nlm.nih.gov/21328195/">
                  pubmed.ncbi.nlm.nih.gov/21328195
                </Ext>
              </div>
            </div>

            <h3>
              STEP8 頭痛日誌とトリガー管理{" "}
              <span className="bExp">Expert Consensus / 全ガイドライン共通推奨</span>
            </h3>
            <p>
              頭痛日誌は、主観的な「頭痛がひどい」という訴えを
              <strong>客観的・定量的なデータ</strong>
              に変換するツールです。治療開始前の最低30日間の記録が国際的に標準とされています。
            </p>
            <h4>記録すべき最低限の要素</h4>
            <div className="tbl">
              <table>
                <thead>
                  <tr>
                    <th>カテゴリー</th>
                    <th>記録項目</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <strong>頭痛の特性</strong>
                    </td>
                    <td>
                      日付・時刻・持続時間・痛みの性状（拍動性 / 圧迫性）・部位（片側 / 両側）
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <strong>重症度</strong>
                    </td>
                    <td>NRS / VAS 0〜10（発症時・ピーク時・2時間後）</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>随伴症状</strong>
                    </td>
                    <td>悪心・嘔吐・光過敏・音過敏・前兆の有無・誘発因子</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>薬剤使用</strong>
                    </td>
                    <td>使用薬剤名・用量・使用時刻・効果（完全軽快 / 部分軽快 / 無効）</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>トリガー候補</strong>
                    </td>
                    <td>睡眠時間・食事内容・月経周期・ストレスレベル・天候・飲酒</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>日常機能</strong>
                    </td>
                    <td>仕事・家事・社会活動への支障（MIDAS グレードの自己評価）</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <h4>主要トリガー一覧と対処戦略</h4>
            <div className="tbl th-orange">
              <table>
                <thead>
                  <tr>
                    <th>トリガーカテゴリー</th>
                    <th>具体例</th>
                    <th>対処策</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <strong>食事性トリガー</strong>
                    </td>
                    <td>
                      チラミン（熟成チーズ・赤ワイン）・ヒスタミン（発酵食品）・亜硝酸塩（加工肉）・MSG・アスパルテーム・アルコール
                    </td>
                    <td>日誌で個人トリガーを特定後、試験的除去（2〜4週間）→ 再摂取テスト</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>睡眠関連</strong>
                    </td>
                    <td>睡眠不足・過剰睡眠・不規則な就寝時刻・週末の寝坊</td>
                    <td>睡眠衛生指導（STEP6参照）；変動 ±30分以内</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>カフェイン</strong>
                    </td>
                    <td>急激な摂取量変化（多量摂取後の中断 = 離脱頭痛）</td>
                    <td>漸減（週1〜2杯ずつ削減）；200mg/日未満を目標</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>ホルモン変動</strong>
                    </td>
                    <td>月経前後のエストロゲン急落；経口避妊薬</td>
                    <td>月経日程と頭痛日誌の照合；婦人科医との連携</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>環境・感覚</strong>
                    </td>
                    <td>強い光・騒音・強いにおい・天候変化・気圧変動</td>
                    <td>偏光レンズの使用；静音環境の確保；気圧変化への事前対応</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>ストレス・感情</strong>
                    </td>
                    <td>仕事締め切り・人間関係の緊張・「ストレス解放後」の頭痛</td>
                    <td>CBT による認知再構成；バイオフィードバックによる自律神経調節</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>脱水・食事スキップ</strong>
                    </td>
                    <td>水分不足・食事間隔の乱れ（&gt; 4〜5時間の空腹）</td>
                    <td>1日 1.5〜2L の水分摂取；定時の食事</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3>
              STEP9 環境・ライフスタイル調整 <span className="bC">Expert Consensus / Grade C</span>
            </h3>
            <div className="tbl">
              <table>
                <thead>
                  <tr>
                    <th>領域</th>
                    <th>推奨される調整</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <strong>職場エルゴノミクス</strong>
                    </td>
                    <td>
                      モニター高さの調整（視線と水平 or やや下方）；頸部への負荷を最小化；デスク作業
                      45〜60分毎の5分休憩
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <strong>光環境</strong>
                    </td>
                    <td>
                      偏光レンズ（FL-41 フィルター）の使用；スクリーン輝度の調整；蛍光灯から
                      LED（暖色系）への変更
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <strong>カフェイン管理</strong>
                    </td>
                    <td>摂取量を 200mg/日未満へ漸減；急激な変化を避ける</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>水分管理</strong>
                    </td>
                    <td>1日 1.5〜2L（発汗・運動量に応じて増量）；頭痛日誌に水分摂取量を記録</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>スクリーンタイム</strong>
                    </td>
                    <td>
                      20-20-20
                      ルール（20分毎に20フィート先を20秒見る）；就寝前1時間のデバイス使用制限
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <strong>ストレス管理</strong>
                    </td>
                    <td>計画的な休暇・余暇時間の確保；過剰なコミットメントの制限</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* ============================================================ SECTION 11 */}
          <section id="s11" className="sec">
            <div className="sec-hd">
              <div className="sec-num">11</div>
              <h2 className="sec-title">PART III 統合プロトコル（12週間プログラム）</h2>
            </div>

            <h3>統合アプローチのエビデンス</h3>
            <div className="tbl">
              <table>
                <thead>
                  <tr>
                    <th>比較</th>
                    <th>効果</th>
                    <th>グレード</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>バイオフィードバック ＋ 薬物 vs 薬物単独</td>
                    <td>薬剤使用量の有意な減少</td>
                    <td>
                      <span className="bA">Grade A</span>
                    </td>
                  </tr>
                  <tr>
                    <td>CBT ＋ アミトリプチリン vs 各単独</td>
                    <td>相加的な頭痛日数減少・QOL 改善</td>
                    <td>
                      <span className="bA">Grade A</span>
                    </td>
                  </tr>
                  <tr>
                    <td>有酸素運動 ＋ トピラマート vs 各単独</td>
                    <td>同等以上の効果・副作用軽減</td>
                    <td>
                      <span className="bB">Grade B</span>
                    </td>
                  </tr>
                  <tr>
                    <td>心理 ＋ 行動療法 ＋ 薬物 vs 薬物単独</td>
                    <td>頭痛頻度 30〜40% の追加減少</td>
                    <td>
                      <span className="bB">Grade B</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3>12週間スケジュール</h3>
            <div className="tbl th-purple">
              <table>
                <thead>
                  <tr>
                    <th>期間</th>
                    <th>心理療法</th>
                    <th>行動療法</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <strong>Week 1〜2</strong>
                    </td>
                    <td>心理評価・CBT 初回（心理教育・目標設定）；頭痛日誌解析</td>
                    <td>睡眠日誌開始；運動耐容能評価；ウォーキング15分・週3回</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>Week 3〜4</strong>
                    </td>
                    <td>CBT：自動思考の同定・ABCモデル練習；バイオフィードバック評価開始</td>
                    <td>ウォーキング20分・週3回；睡眠衛生の全原則実施</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>Week 5〜8</strong>
                    </td>
                    <td>
                      CBT継続（認知再構成・行動活性化）；EMGバイオフィードバック週2〜3回；PMR 習得
                    </td>
                    <td>ウォーキング25〜30分・週3〜4回；環境調整の実施</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>Week 9〜12</strong>
                    </td>
                    <td>MBSR 導入（希望者）；自主バイオフィードバック移行；AT の習得</td>
                    <td>有酸素運動30〜40分・週3〜5回；カフェイン管理の完成</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>3ヶ月時点</strong>
                    </td>
                    <td>アウトカム評価（HIT-6/MIDAS/VAS）；維持計画の個別化</td>
                    <td>運動習慣の確立確認；頭痛日誌の継続</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3>統合プロトコルの全体フロー</h3>
            <div className="mmd">
              <div className="mmd-lbl">
                フローチャート — 治療開始から維持・治療強化までの統合フロー
              </div>
              <MermaidDiagram
                themeVariables={MIND_MERMAID_THEME}
                chart={`flowchart TD
START(["🚦 治療開始前"])
START --> SNOOP["✅ SNOOP4 スクリーニング\\n（レッドフラッグ除外）"]
SNOOP --> ICHD["📋 ICHD-3 診断確定\\n+\\nベースライン評価\\nHIT-6 / MIDAS / VAS\\n頭痛日誌（30日）"]

ICHD --> FREQ{"頭痛の頻度・障害度"}

FREQ -->|"≥4日/月 または\\nMIDAS ≥ Grade II"| PREVENT["予防的介入が適応\\n（薬物療法 ＋ 心理・行動療法）"]
FREQ -->|"&lt; 4日/月 かつ\\n障害軽度"| ACUTE["急性期対応中心\\n（心理・行動療法単独も可）"]

PREVENT --> PARALLEL["🔄 2本柱の並行実施"]
ACUTE --> PARALLEL

PARALLEL --> PSYCH["🧠 心理療法（PART I）\\n\\nCBT（週1回 × 12週）\\n＋\\nバイオフィードバック\\n（EMG or 熱；週2〜3回 × 8〜12週）\\n＋\\nPMR / AT（毎日）\\n±\\nMBSR（8週；希望者）"]

PARALLEL --> BEHAV["⏰ 行動療法（PART II）\\n\\n睡眠衛生（毎日実践）\\n＋\\n有酸素運動（週3〜5回）\\n＋\\n頭痛日誌（継続）\\n＋\\n環境・ライフスタイル調整"]

PSYCH & BEHAV --> ASSESS["📊 3ヶ月時点 アウトカム評価\\nHIT-6 / MIDAS / VAS\\n頭痛日数・薬剤使用頻度"]

ASSESS --> GOAL{"治療目標達成？\\n≥50% 頭痛日数減少\\nHIT-6 ≥6点改善\\nMIDAS グレード改善"}

GOAL -->|"✅ 達成"| MAINT["🟢 維持フェーズ\\n現プロトコルを継続\\n6ヶ月毎に再評価\\n個別化・最適化"]

GOAL -->|"❌ 未達成"| ESC["⬆️ 治療強化\\n頭痛専門医への紹介\\n予防薬の導入検討\\n（β遮断薬 / CGRP mAbs / AED）"]

ESC --> COMBO["🔄 薬物療法 ＋ 心理・行動療法の継続\\n（並行実施が最も効果的）"]

style START fill:#1a1a2e,color:#fff
style SNOOP fill:#27ae60,color:#fff
style ICHD fill:#154360,color:#fff
style PSYCH fill:#4a235a,color:#fff
style BEHAV fill:#1b4332,color:#fff
style MAINT fill:#27ae60,color:#fff
style ESC fill:#c0392b,color:#fff
style COMBO fill:#7f8c8d,color:#fff`}
              />
            </div>
          </section>

          {/* ============================================================ SECTION 12 */}
          <section id="s12" className="sec">
            <div className="sec-hd">
              <div className="sec-num">12</div>
              <h2 className="sec-title">特殊集団への適用</h2>
            </div>

            <div className="alert a-warn">
              <div className="alert-i">⚠️</div>
              <div>
                以下は一般的な指針です。実際の臨床適用は必ず専門家の判断のもとで行ってください。
              </div>
            </div>

            <h3>12-1. 小児・思春期（12歳未満 / 12〜18歳）</h3>
            <div className="tbl">
              <table>
                <thead>
                  <tr>
                    <th>介入</th>
                    <th>推奨度</th>
                    <th>注意事項</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <strong>バイオフィードバック（EMG / 熱）</strong>
                    </td>
                    <td>
                      ✅ <strong>強く推奨（Grade A）</strong>
                    </td>
                    <td>薬物の代替として優先；10歳以上から有効</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>CBT（小児版）</strong>
                    </td>
                    <td>✅ 推奨（Grade B）</td>
                    <td>親の参加を含む家族システム療法として実施</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>有酸素運動</strong>
                    </td>
                    <td>✅ 推奨</td>
                    <td>年齢・発達段階に応じて強度・時間を調整</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>PMR</strong>
                    </td>
                    <td>✅ 推奨（Grade B）</td>
                    <td>学校での実施も可能；動画ガイドの活用</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>MBSR</strong>
                    </td>
                    <td>⚠️ 要年齢調整</td>
                    <td>12歳以上で有効性示唆；教師・専門家との連携必須</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>ACT</strong>
                    </td>
                    <td>⚠️ データ限定</td>
                    <td>思春期特有の「価値」探索に適合しやすいが専門家指導下で</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3>12-2. 妊娠・授乳期</h3>
            <div className="tbl">
              <table>
                <thead>
                  <tr>
                    <th>介入</th>
                    <th>推奨度</th>
                    <th>注意事項</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <strong>バイオフィードバック</strong>
                    </td>
                    <td>
                      ✅ <strong>第一選択の非薬物療法</strong>
                    </td>
                    <td>妊娠中の薬物制限下での最重要介入</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>CBT</strong>
                    </td>
                    <td>✅ 強く推奨</td>
                    <td>ホルモン変動関連の認知的対処に特に有効</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>PMR</strong>
                    </td>
                    <td>✅ 推奨</td>
                    <td>仰臥位での実施に注意（妊娠後期は側臥位で）</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>有酸素運動（軽〜中等度）</strong>
                    </td>
                    <td>✅ 推奨</td>
                    <td>ウォーキング・水中運動；産科医との連携のうえ実施</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>MBSR</strong>
                    </td>
                    <td>✅ 推奨</td>
                    <td>産前不安への有効性も報告されており相乗効果が期待できる</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3>12-3. 高齢者（&gt; 65歳）</h3>
            <div className="tbl">
              <table>
                <thead>
                  <tr>
                    <th>介入</th>
                    <th>推奨度</th>
                    <th>注意事項</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <strong>バイオフィードバック</strong>
                    </td>
                    <td>✅ 推奨</td>
                    <td>認知機能の評価（MoCA）後にプログラム設計</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>CBT（簡略版）</strong>
                    </td>
                    <td>✅ 推奨（Grade B）</td>
                    <td>セッション数を減らす；大きめの文字・図解を使用</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>有酸素運動（低強度）</strong>
                    </td>
                    <td>✅ 推奨</td>
                    <td>HRmax 50〜60% から開始；転倒リスク評価を先行実施</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>PMR</strong>
                    </td>
                    <td>✅ 推奨</td>
                    <td>椅子座位での実施が安全で取り組みやすい</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>MBSR</strong>
                    </td>
                    <td>⚠️ 要調整</td>
                    <td>45分間の正式練習は長すぎる場合あり；20〜30分に短縮</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3>12-4. 薬物過用性頭痛（MOH: ICHD-3 8.2）からの回復期</h3>
            <div className="mmd">
              <div className="mmd-lbl">
                フローチャート — MOH 回復期における心理・行動療法の段階的導入
              </div>
              <MermaidDiagram
                themeVariables={MIND_MERMAID_THEME}
                chart={`flowchart LR
MOH(["⚠️ MOH 診断\\nICHD-3 コード: 8.2\\n急性期薬剤の漸減開始"])

MOH --> P1["🔴 離脱期\\nWeek 1〜2\\n離脱症状（反跳性頭痛）のモニタリング\\nバイオフィードバックと PMR を支持的に実施\\n（CBT は心理教育と動機付けのみ）"]

P1 --> P2["🟡 回復初期\\nWeek 2〜8\\nバイオフィードバック・PMR・MBSR を優先\\nCBT：薬剤依存の認知パターンへの介入\\n睡眠衛生の徹底"]

P2 --> P3["🟢 安定期\\nWeek 8〜\\n全プログラムの段階的導入\\n有酸素運動の開始\\n薬物使用日数の継続モニタリング"]

P3 --> P4["✅ 再発予防（長期）\\n頭痛日誌の永続的継続\\nMOH 再発の早期検出教育\\n6ヶ月毎の外来フォローアップ"]

style MOH fill:#c0392b,color:#fff
style P1 fill:#8B0000,color:#fff
style P2 fill:#7b3f00,color:#fff
style P3 fill:#1b4332,color:#fff
style P4 fill:#27ae60,color:#fff`}
              />
            </div>
          </section>

          {/* ============================================================ SECTION 13 */}
          <section id="s13" className="sec">
            <div className="sec-hd">
              <div className="sec-num">13</div>
              <h2 className="sec-title">アウトカム評価と治療目標</h2>
            </div>

            <h3>標準的アウトカム測定ツール</h3>
            <div className="tbl th-teal">
              <table>
                <thead>
                  <tr>
                    <th>ツール</th>
                    <th>評価内容</th>
                    <th>判定基準</th>
                    <th>参照</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <strong>HIT-6</strong>（Headache Impact Test）
                    </td>
                    <td>頭痛による日常生活への支障度</td>
                    <td>≥ 60 = 重度障害；MCID = 6点改善</td>
                    <td>
                      <Ext href="https://pubmed.ncbi.nlm.nih.gov/12789668/">PubMed 検証論文</Ext>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <strong>MIDAS</strong>（Migraine Disability Assessment）
                    </td>
                    <td>社会的機能障害（仕事・家事・社会活動の損失日数）</td>
                    <td>≥ 21 = Grade IV 重度</td>
                    <td>
                      <Ext href="https://ichd-3.org/">IHS 公式ガイドライン</Ext>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <strong>VAS / NRS（0〜10）</strong>
                    </td>
                    <td>痛みの強度（発症時・ピーク時・2時間後）</td>
                    <td>2点以上の改善 = 臨床的意義あり</td>
                    <td>全ガイドライン共通</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>PGIC</strong>（Patient Global Impression of Change）
                    </td>
                    <td>患者による全体的な改善印象（7段階）</td>
                    <td>5〜7（「改善」以上）= 成功</td>
                    <td>AAN / EHF</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>MSQ v2.1</strong>（Migraine-Specific QOL）
                    </td>
                    <td>片頭痛特異的 QOL（3下位尺度）</td>
                    <td>10〜15点の改善 = 臨床的意義あり</td>
                    <td>
                      <Ext href="https://pubmed.ncbi.nlm.nih.gov/">PubMed 検証論文</Ext>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <strong>頭痛日誌</strong>
                    </td>
                    <td>月間頭痛日数・薬剤使用日数</td>
                    <td>治療前比 ≥ 50% の減少 = 治療成功</td>
                    <td>ICHD-3 / 全ガイドライン</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3>治療成功の定義（国際基準）</h3>
            <div className="card">
              <p>
                <strong>主要目標（3ヶ月時点での評価）</strong>
              </p>
              <ul>
                <li>
                  月間頭痛日数：<strong>≥ 50% の減少</strong>
                </li>
                <li>
                  HIT-6：<strong>≥ 6点の改善</strong>（MCID）
                </li>
                <li>
                  MIDAS：<strong>1グレード以上の改善</strong>
                </li>
                <li>
                  急性期薬剤使用日数：MOH 閾値（NSAIDs 15日、トリプタン 10日）
                  <strong>以下に維持</strong>
                </li>
              </ul>
            </div>

            <div className="alert a-purple">
              <div className="alert-i">📌</div>
              <div>
                <strong>本ガイドのエッセンス</strong>　コアトリオ（Grade A/B）＝ EMG
                バイオフィードバック ＋ CBT ＋ PMR。行動変容の基盤（Grade B）＝ 睡眠衛生の徹底 ＋
                週3〜5回の有酸素運動 ＋ 頭痛日誌30日記録。新興療法（Grade C）＝ MBSR ＋
                ACT。すべての介入は SNOOP4 と MOH リスク評価の後に開始し、3ヶ月時点の HIT-6 / MIDAS
                再評価で効果を確認する。
              </div>
            </div>
          </section>

          {/* ============================================================ SECTION 14 */}
          <section id="s14" className="sec">
            <div className="sec-hd">
              <div className="sec-num">14</div>
              <h2 className="sec-title">参考文献・URLリソース</h2>
            </div>

            <h3>国際診断基準</h3>
            <div className="src-grid">
              <div className="src">
                <div className="src-org">ICHD-3</div>
                <div className="src-t">国際頭痛分類 第3版 公式サイト（全文閲覧可）</div>
                <Ext className="src-url" href="https://ichd-3.org/">
                  https://ichd-3.org/
                </Ext>
              </div>
              <div className="src">
                <div className="src-org">ICHD-3 PDF</div>
                <div className="src-t">ICHD-3 全文 PDF（2018年版）</div>
                <Ext
                  className="src-url"
                  href="https://ichd-3.org/wp-content/uploads/2018/01/The-International-Classification-of-Headache-Disorders-3rd-Edition-2018.pdf"
                >
                  ichd-3.org/…/ICHD-3rd-Edition-2018.pdf
                </Ext>
              </div>
              <div className="src">
                <div className="src-org">IHS</div>
                <div className="src-t">IHS 分類委員会（ICHD-4 最新動向）</div>
                <Ext
                  className="src-url"
                  href="https://ihs-headache.org/en/about-ihs/standing-committees/classification/"
                >
                  ihs-headache.org/…/classification
                </Ext>
              </div>
            </div>

            <h3>臨床ガイドライン（行動・心理療法）</h3>
            <div className="src-grid">
              <div className="src">
                <div className="src-org">AAN</div>
                <div className="src-t">
                  行動・理学療法ガイドライン 2012（CBT・バイオフィードバック）
                </div>
                <Ext
                  className="src-url"
                  href="https://www.aan.com/guidelines/home/getguidelinecontent/383"
                >
                  aan.com/guidelines/…/383
                </Ext>
              </div>
              <div className="src">
                <div className="src-org">AAN</div>
                <div className="src-t">片頭痛予防ガイドライン（総合）</div>
                <Ext
                  className="src-url"
                  href="https://www.aan.com/guidelines/home/getguidelinecontent/545"
                >
                  aan.com/guidelines/…/545
                </Ext>
              </div>
              <div className="src">
                <div className="src-org">AAN</div>
                <div className="src-t">2024年予防療法ドラフト（公開レビュー版）</div>
                <Ext
                  className="src-url"
                  href="https://www.aan.com/siteassets/home-page/policy-and-guidelines/guidelines/guidelines-and-measures-open-for-public-comment/24-pharmacologic-treatment-for-migraine-prevention-in-adults_draft_08-14-2024.pdf"
                >
                  aan.com/…/migraine-prevention_draft_08-14-2024.pdf
                </Ext>
              </div>
              <div className="src">
                <div className="src-org">EHF</div>
                <div className="src-t">CGRP mAbs 予防療法ガイドライン 2022（PMC全文）</div>
                <Ext
                  className="src-url"
                  href="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC9188162/"
                >
                  ncbi.nlm.nih.gov/pmc/articles/PMC9188162
                </Ext>
              </div>
              <div className="src">
                <div className="src-org">NICE</div>
                <div className="src-t">頭痛ガイドライン CG150（英国）</div>
                <Ext className="src-url" href="https://www.nice.org.uk/guidance/cg150">
                  nice.org.uk/guidance/cg150
                </Ext>
              </div>
              <div className="src">
                <div className="src-org">IHS</div>
                <div className="src-t">急性期治療推奨 2024（Cephalalgia 誌）</div>
                <Ext
                  className="src-url"
                  href="https://journals.sagepub.com/doi/10.1177/03331024241252666"
                >
                  journals.sagepub.com/doi/10.1177/03331024241252666
                </Ext>
              </div>
              <div className="src">
                <div className="src-org">AASM</div>
                <div className="src-t">睡眠衛生指導推奨</div>
                <Ext className="src-url" href="https://aasm.org/">
                  https://aasm.org/
                </Ext>
              </div>
              <div className="src">
                <div className="src-org">UMass</div>
                <div className="src-t">MBSR 公式プログラム情報</div>
                <Ext
                  className="src-url"
                  href="https://www.umassmed.edu/cfm/mindfulness-based-programs/mbsr-courses/"
                >
                  umassmed.edu/cfm/…/mbsr-courses
                </Ext>
              </div>
            </div>

            <h3>Cochrane エビデンスレビュー</h3>
            <div className="src-grid">
              <div className="src">
                <div className="src-org">Cochrane</div>
                <div className="src-t">心理療法（CBT・バイオフィードバック）— 片頭痛予防</div>
                <Ext
                  className="src-url"
                  href="https://www.cochranelibrary.com/cdsr/doi/10.1002/14651858.CD012295.pub2/full"
                >
                  cochranelibrary.com/…/CD012295.pub2
                </Ext>
              </div>
              <div className="src">
                <div className="src-org">Cochrane</div>
                <div className="src-t">マグネシウム補充 — 片頭痛予防（2025年最新）</div>
                <Ext
                  className="src-url"
                  href="https://www.cochranelibrary.com/cdsr/doi/10.1002/14651858.CD016307"
                >
                  cochranelibrary.com/…/CD016307
                </Ext>
              </div>
              <div className="src">
                <div className="src-org">Cochrane</div>
                <div className="src-t">ボツリヌストキシン — 慢性片頭痛予防</div>
                <Ext
                  className="src-url"
                  href="https://www.cochranelibrary.com/cdsr/doi/10.1002/14651858.CD011914"
                >
                  cochranelibrary.com/…/CD011914
                </Ext>
              </div>
              <div className="src">
                <div className="src-org">Cochrane</div>
                <div className="src-t">頭痛・片頭痛 全レビュー検索ページ</div>
                <Ext
                  className="src-url"
                  href="https://www.cochranelibrary.com/search?query=headache+migraine&amp;searchBy=3&amp;type=cdsr"
                >
                  cochranelibrary.com/search?query=headache+migraine
                </Ext>
              </div>
            </div>

            <h3>主要原著論文</h3>
            <div className="src-grid">
              <div className="src">
                <div className="src-org">JAMA 2001</div>
                <div className="src-t">
                  Holroyd KA et al. — CBT ＋ アミトリプチリン RCT（慢性 TTH）
                </div>
                <Ext className="src-url" href="https://pubmed.ncbi.nlm.nih.gov/11325323/">
                  pubmed.ncbi.nlm.nih.gov/11325323
                </Ext>
              </div>
              <div className="src">
                <div className="src-org">Headache 2004</div>
                <div className="src-t">Andrasik F. — CBT と薬物療法の長期有効性比較（片頭痛）</div>
                <Ext className="src-url" href="https://pubmed.ncbi.nlm.nih.gov/15012657/">
                  pubmed.ncbi.nlm.nih.gov/15012657
                </Ext>
              </div>
              <div className="src">
                <div className="src-org">Pain 2007</div>
                <div className="src-t">
                  Nestoriuc Y &amp; Martin A. — バイオフィードバック 片頭痛メタ解析（55試験）
                </div>
                <Ext className="src-url" href="https://pubmed.ncbi.nlm.nih.gov/17097218/">
                  pubmed.ncbi.nlm.nih.gov/17097218
                </Ext>
              </div>
              <div className="src">
                <div className="src-org">J Consult Clin Psychol 2008</div>
                <div className="src-t">
                  Nestoriuc Y et al. — バイオフィードバック 緊張型頭痛メタ解析
                </div>
                <Ext className="src-url" href="https://pubmed.ncbi.nlm.nih.gov/18426234/">
                  pubmed.ncbi.nlm.nih.gov/18426234
                </Ext>
              </div>
              <div className="src">
                <div className="src-org">Cephalalgia 2011</div>
                <div className="src-t">
                  Varkey E et al. — 有酸素運動 vs トピラマート vs リラクゼーション RCT
                </div>
                <Ext
                  className="src-url"
                  href="https://journals.sagepub.com/doi/10.1177/0333102411412385"
                >
                  journals.sagepub.com/doi/10.1177/0333102411412385
                </Ext>
              </div>
              <div className="src">
                <div className="src-org">Int J Sports Med 2011</div>
                <div className="src-t">Darabaneanu S et al. — 有酸素運動 10週間プログラム</div>
                <Ext className="src-url" href="https://pubmed.ncbi.nlm.nih.gov/21328195/">
                  pubmed.ncbi.nlm.nih.gov/21328195
                </Ext>
              </div>
              <div className="src">
                <div className="src-org">Headache 2019</div>
                <div className="src-t">Dodick DW. — SNOOP4 レッドフラッグ診断レビュー</div>
                <Ext className="src-url" href="https://pubmed.ncbi.nlm.nih.gov/31350744/">
                  pubmed.ncbi.nlm.nih.gov/31350744
                </Ext>
              </div>
              <div className="src">
                <div className="src-org">Qual Life Res 2003</div>
                <div className="src-t">Kosinski M et al. — HIT-6 の MCID 検証</div>
                <Ext className="src-url" href="https://pubmed.ncbi.nlm.nih.gov/12789668/">
                  pubmed.ncbi.nlm.nih.gov/12789668
                </Ext>
              </div>
            </div>

            <h3>専門誌・データベース</h3>
            <div className="src-grid">
              <div className="src">
                <div className="src-org">EHF 公式誌</div>
                <div className="src-t">Journal of Headache and Pain（OA）</div>
                <Ext
                  className="src-url"
                  href="https://thejournalofheadacheandpain.biomedcentral.com/"
                >
                  thejournalofheadacheandpain.biomedcentral.com
                </Ext>
              </div>
              <div className="src">
                <div className="src-org">IHS 公式誌</div>
                <div className="src-t">Cephalalgia（ICHD 改訂・臨床試験）</div>
                <Ext className="src-url" href="https://journals.sagepub.com/home/cep">
                  journals.sagepub.com/home/cep
                </Ext>
              </div>
              <div className="src">
                <div className="src-org">PubMed</div>
                <div className="src-t">頭痛 RCT 専用検索</div>
                <Ext
                  className="src-url"
                  href="https://pubmed.ncbi.nlm.nih.gov/?term=headache+migraine&amp;filter=pubt.clinicaltrial"
                >
                  pubmed.ncbi.nlm.nih.gov/…clinicaltrial
                </Ext>
              </div>
              <div className="src">
                <div className="src-org">ClinicalTrials.gov</div>
                <div className="src-t">進行中・完了試験の確認</div>
                <Ext className="src-url" href="https://clinicaltrials.gov/">
                  https://clinicaltrials.gov/
                </Ext>
              </div>
            </div>
          </section>
        </main>
      </div>

      {/* FOOTER */}
      <div className="footer">
        <strong>頭痛の心理・行動療法 完全ガイド</strong> — 国際エビデンス（ICHD-3 / AAN / EHF /
        Cochrane / NICE）に基づく
        <br />📅 文書バージョン: 2026年6月 | 次回レビュー推奨: ICHD-4 正式公開時・AAN 2025
        行動療法ガイドライン更新時
        <br />
        ⚠️
        本資料は学術・教育・研究目的のみを対象としています。臨床への適用は必ず資格を持つ医療専門家の監督のもとで行ってください。
      </div>
    </div>
  );
}
