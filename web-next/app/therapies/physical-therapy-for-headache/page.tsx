import type { Metadata } from "next";
import { Ext } from "@/components/Ext";
import MermaidDiagram from "@/components/MermaidDiagram";
import { PhysicalTherapySidebar } from "@/components/therapies/PhysicalTherapySidebar";
import "./physical-therapy-for-headache.css";

export const metadata: Metadata = {
  title: "🏃 頭痛に対する理学療法 完全ガイド",
  description:
    "国際エビデンス（ICHD-3 / AAN / EHF / NICE CG150 / Cochrane）に基づく包括的解説。頭痛疾患に対する理学療法の適応、病態生理学的根拠、SNOOP4赤旗スクリーニングから、徒手療法、有酸素運動、バイオフィードバック、臨床プロトコル、特殊集団への配慮まで初学者向けに整理した完全ガイド。",
};

/** 理学療法の Mermaid テーマ。 */
const PT_MERMAID_THEME: Record<string, string> = {
  primaryColor: "#fff3e0",
  primaryTextColor: "#e65100",
  primaryBorderColor: "#f57c00",
  lineColor: "#8d6e63",
  secondaryColor: "#fff8e1",
  tertiaryColor: "#fbe9e7",
  edgeLabelBackground: "#ffffff",
  fontSize: "13px",
};

export default function PhysicalTherapyForHeadachePage() {
  return (
    <div className="physical-therapy-accent">
      {/* HERO */}
      <div className="hero">
        <div style={{ fontSize: 34 }}>🏃‍♀️</div>
        <h1>頭痛に対する理学療法 完全ガイド</h1>
        <p className="hero-sub">
          国際エビデンス（ICHD-3 / AAN / EHF / NICE CG150 / Cochrane）に基づく包括的解説 —
          初学者向けステップバイステップ
        </p>
        <div className="hero-tags">
          <span className="hero-tag">ICHD-3 準拠</span>
          <span className="hero-tag">Grade A〜U エビデンス表記</span>
          <span className="hero-tag">SNOOP4 スクリーニング</span>
          <span className="hero-tag">非薬物療法の中核</span>
          <span className="hero-tag">頸因性頭痛 第一選択</span>
        </div>
      </div>

      {/* DISCLAIMER */}
      <div className="disclaimer">
        <strong>⚠️ Academic Disclaimer（学術免責事項）</strong>　本資料は
        <strong>学術・教育・研究目的のみ</strong>
        を対象としています。すべての臨床的判断・治療介入は資格を有する医療専門家による評価・監督のもとで実施してください。個人的な医療アドバイス・診断・処方を提供するものではありません。
      </div>

      {/* LAYOUT */}
      <div className="layout">
        <PhysicalTherapySidebar />

        {/* MAIN CONTENT */}
        <main className="main">
          {/* ============================================================ SECTION 1 */}
          <section id="s1" className="sec">
            <div className="sec-hd">
              <div className="sec-num">1</div>
              <h2 className="sec-title">はじめに — なぜ頭痛に理学療法が必要か</h2>
            </div>

            <p>
              頭痛は世界で最も有病率の高い神経疾患の一つです。理学療法（Physical
              Therapy）は、薬物療法の限界を補完する<strong>非薬物療法の中核</strong>
              として国際的に位置づけされています。
            </p>

            <h3>1.1 頭痛の世界的疾病負担</h3>
            <div className="tbl">
              <table>
                <thead>
                  <tr>
                    <th>疫学指標</th>
                    <th>データ</th>
                    <th>出典</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>成人の頭痛有病率（過去1年）</td>
                    <td>
                      約 <strong>52%</strong>
                    </td>
                    <td>WHO Global Burden</td>
                  </tr>
                  <tr>
                    <td>片頭痛の生涯有病率</td>
                    <td>約 14–16%（女性：男性 = 3:1）</td>
                    <td>GBD 2019</td>
                  </tr>
                  <tr>
                    <td>慢性頭痛（≥15日/月）の有病率</td>
                    <td>成人の約 1.7–4%</td>
                    <td>Stovner et al., 2007</td>
                  </tr>
                  <tr>
                    <td>疾病負担ランキング（世界・YLD）</td>
                    <td>
                      <strong className="tO">第2位</strong>（生活機能障害年数）
                    </td>
                    <td>GBD 2019</td>
                  </tr>
                  <tr>
                    <td>経済的損失（米国のみ）</td>
                    <td>年間約 360億ドル（労働損失）</td>
                    <td>Lipton et al.</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3>1.2 薬物療法だけでは不十分な理由</h3>
            <div className="tbl">
              <table>
                <thead>
                  <tr>
                    <th>限界</th>
                    <th>内容</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>薬物過用性頭痛（MOH）リスク</td>
                    <td>急性期薬を月 8–10 日以上使用で慢性化（ICHD-3: 8.2）</td>
                  </tr>
                  <tr>
                    <td>副作用・禁忌</td>
                    <td>妊娠・心血管疾患・腎疾患で薬物選択が制限</td>
                  </tr>
                  <tr>
                    <td>奏効率の上限</td>
                    <td>トリプタンでも 2 時間以内の頭痛消失は約 60–70%</td>
                  </tr>
                  <tr>
                    <td>慢性化予防の限界</td>
                    <td>薬物のみでは神経感作（central sensitization）に十分に対処できない</td>
                  </tr>
                  <tr>
                    <td>QOL 包括的改善の困難</td>
                    <td>睡眠・ストレス・姿勢・体力など生活習慣全体への介入が薬物では不可能</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3>1.3 本ガイドの読み進め方</h3>
            <div className="steps">
              <div className="step">
                <div className="step-t">🔴 神経学的緊急事態を最初に除外</div>
                <div className="step-d">
                  Section 4（SNOOP4）で赤旗症状をスクリーニング。陽性なら PT を開始しない。
                </div>
              </div>
              <div className="step">
                <div className="step-t">🟡 頭痛タイプを分類</div>
                <div className="step-d">
                  Section 2 で ICHD-3 に基づき一次性／二次性、頭痛タイプを確定。
                </div>
              </div>
              <div className="step">
                <div className="step-t">🟢 理学療法の適応を判断</div>
                <div className="step-d">
                  Section 6 のフローチャートでタイプ別の PT 適応とモダリティを選択。
                </div>
              </div>
              <div className="step">
                <div className="step-t">🔵 具体的プロトコルを実施</div>
                <div className="step-d">
                  Section 7–8 で各モダリティ・頭痛タイプ別プロトコルを選択・実施。
                </div>
              </div>
              <div className="step">
                <div className="step-t">⚪ 定期的にアウトカム評価</div>
                <div className="step-d">
                  Section 12 で 3 ヶ月ごとに HIT-6 / MIDAS 等を再評価し、効果を客観化。
                </div>
              </div>
            </div>

            <div className="src-grid">
              <div className="src">
                <div className="src-org">WHO</div>
                <div className="src-t">Headache Disorders Fact Sheet</div>
                <Ext
                  className="src-url"
                  href="https://www.who.int/news-room/fact-sheets/detail/headache-disorders"
                >
                  who.int/…/headache-disorders
                </Ext>
              </div>
            </div>
          </section>

          {/* ============================================================ SECTION 2 */}
          <section id="s2" className="sec">
            <div className="sec-hd">
              <div className="sec-num">2</div>
              <h2 className="sec-title">頭痛の分類と理学療法の適応（ICHD-3）</h2>
            </div>

            <h3>2.1 ICHD-3 主要分類と理学療法適応性</h3>
            <div className="tbl">
              <table>
                <thead>
                  <tr>
                    <th>ICHD-3</th>
                    <th>頭痛タイプ</th>
                    <th>PT 適応度</th>
                    <th>推奨グレード</th>
                    <th>備考</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>1.1</td>
                    <td>片頭痛（前兆なし）</td>
                    <td>✅ 高</td>
                    <td>
                      <span className="bB">Grade B</span>
                    </td>
                    <td>予防的 PT が中核</td>
                  </tr>
                  <tr>
                    <td>1.2</td>
                    <td>片頭痛（前兆あり）</td>
                    <td>✅ 高</td>
                    <td>
                      <span className="bB">Grade B</span>
                    </td>
                    <td>前兆中の強度運動は禁忌</td>
                  </tr>
                  <tr>
                    <td>1.3</td>
                    <td>慢性片頭痛</td>
                    <td>✅ 最高</td>
                    <td>
                      <span className="bA">Grade A/B</span>
                    </td>
                    <td>薬物療法との並行が必須</td>
                  </tr>
                  <tr>
                    <td>2.1</td>
                    <td>非頻発性緊張型頭痛</td>
                    <td>✅ 高</td>
                    <td>
                      <span className="bA">Grade A</span>
                    </td>
                    <td>セルフケアが主</td>
                  </tr>
                  <tr>
                    <td>2.2</td>
                    <td>頻発性緊張型頭痛</td>
                    <td>✅ 非常に高</td>
                    <td>
                      <span className="bA">Grade A</span>
                    </td>
                    <td>積極的 PT 介入</td>
                  </tr>
                  <tr>
                    <td>2.3</td>
                    <td>慢性緊張型頭痛</td>
                    <td>✅ 非常に高</td>
                    <td>
                      <span className="bA">Grade A</span>
                    </td>
                    <td>マルチモーダル必須</td>
                  </tr>
                  <tr>
                    <td>3.1</td>
                    <td>群発頭痛（エピソード型）</td>
                    <td>⚠️ 補完的</td>
                    <td>
                      <span className="bC">Grade C</span>
                    </td>
                    <td>急性期は高流量 O₂ が第一</td>
                  </tr>
                  <tr>
                    <td>11.2</td>
                    <td>頸因性頭痛</td>
                    <td>✅ 最優先</td>
                    <td>
                      <span className="bA">Grade A</span>
                    </td>
                    <td>
                      <strong className="tG">PT が第一選択治療</strong>
                    </td>
                  </tr>
                  <tr>
                    <td>8.2</td>
                    <td>薬物過用性頭痛（MOH）</td>
                    <td>✅ 中断支援</td>
                    <td>
                      <span className="bB">Grade B</span>
                    </td>
                    <td>過用中断の補助として</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3>2.2 一次性頭痛 vs 二次性頭痛の鑑別</h3>
            <p>
              理学療法開始前に、<strong>一次性頭痛</strong>（脳器質的病変なし）か
              <strong>二次性頭痛</strong>（基礎疾患起因）かを必ず鑑別してください。
            </p>
            <div className="tbl">
              <table>
                <thead>
                  <tr>
                    <th>区分</th>
                    <th>代表疾患</th>
                    <th>理学療法の役割</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <strong>一次性頭痛</strong>
                    </td>
                    <td>片頭痛・緊張型頭痛・群発頭痛</td>
                    <td>
                      <strong className="tG">主要治療手段</strong>として積極的に活用
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <strong>二次性頭痛</strong>
                    </td>
                    <td>くも膜下出血・脳腫瘍・感染症・静脈洞血栓症</td>
                    <td>
                      <strong className="tR">⛔ 原因疾患の治療が最優先</strong>
                      ；PT は補完的かつ医師指示下のみ
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="src-grid">
              <div className="src">
                <div className="src-org">IHS / ICHD-3</div>
                <div className="src-t">ICHD-3 公式サイト（全文閲覧可）</div>
                <Ext className="src-url" href="https://ichd-3.org/">
                  ichd-3.org
                </Ext>
              </div>
              <div className="src">
                <div className="src-org">IHS / ICHD-3</div>
                <div className="src-t">ICHD-3 全文 PDF（2018年版）</div>
                <Ext
                  className="src-url"
                  href="https://ichd-3.org/wp-content/uploads/2018/01/The-International-Classification-of-Headache-Disorders-3rd-Edition-2018.pdf"
                >
                  ichd-3.org/…ICHD-3rd-Edition-2018.pdf
                </Ext>
              </div>
            </div>
          </section>

          {/* ============================================================ SECTION 3 */}
          <section id="s3" className="sec">
            <div className="sec-hd">
              <div className="sec-num">3</div>
              <h2 className="sec-title">病態生理学的根拠 — なぜ理学療法は効くのか</h2>
            </div>

            <h3>3.1 三叉神経頸部複合体（Trigeminocervical Complex: TCC）</h3>
            <div className="alert a-info">
              <div className="alert-i">🔑</div>
              <div>
                <strong>Key Concept:</strong>{" "}
                上位頸髄（C1–C3）後角ニューロンと三叉神経脊髄路核（Nucleus caudalis）は
                <strong>解剖学的・機能的に収束（convergence）</strong>
                しています。この収束こそが、頸部への理学療法が頭痛を軽減できる最も重要な科学的根拠です。
              </div>
            </div>
            <ul>
              <li>
                頸椎・頸部筋・関節の痛み信号が脳によって「頭痛」として認識される（→
                頸因性頭痛の発生機序）
              </li>
              <li>片頭痛発作中に頸部硬直・圧痛が生じる（頸部 ↔ 三叉神経系の双方向性）</li>
              <li>頸部への理学療法が三叉神経系を介して頭痛を軽減できる</li>
            </ul>

            <h3>3.2 中枢感作と末梢感作</h3>
            <div className="tbl">
              <table>
                <thead>
                  <tr>
                    <th>感作レベル</th>
                    <th>病態</th>
                    <th>理学療法の介入ポイント</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <strong>中枢感作</strong>
                    </td>
                    <td>疼痛閾値の低下・アロディニア・時間的加重</td>
                    <td>バイオフィードバック / 有酸素運動 / CBT</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>末梢感作</strong>
                    </td>
                    <td>硬膜・頭頸部筋の CGRP 放出・神経原性炎症</td>
                    <td>徒手療法 / トリガーポイント療法</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>筋筋膜トリガーポイント</strong>
                    </td>
                    <td>頭頸部筋の局所過緊張帯（Hyperirritable spot）</td>
                    <td>トリガーポイント療法 / ドライニードリング</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>自律神経失調</strong>
                    </td>
                    <td>交感神経過活動・副交感神経機能低下</td>
                    <td>呼吸法 / HRV バイオフィードバック / リラクゼーション</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3>3.3 内因性疼痛抑制系の活性化</h3>
            <p>
              理学療法（特に有酸素運動）は、脳内の<strong>内因性疼痛抑制メカニズム</strong>
              を活性化します。
            </p>
            <div className="tbl">
              <table>
                <thead>
                  <tr>
                    <th>神経生物学的変化</th>
                    <th>メカニズム</th>
                    <th>頭痛への効果</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>β-エンドルフィン ↑</td>
                    <td>下降性疼痛抑制系（PAG → 延髄）の賦活</td>
                    <td>鎮痛閾値の上昇</td>
                  </tr>
                  <tr>
                    <td>セロトニン（5-HT）↑</td>
                    <td>中縫線核からの放出促進</td>
                    <td>片頭痛の発作頻度低下</td>
                  </tr>
                  <tr>
                    <td>BDNF ↑</td>
                    <td>神経可塑性の促進・慢性痛回路の再編</td>
                    <td>中枢感作の軽減</td>
                  </tr>
                  <tr>
                    <td>CGRP 産生の長期的調節</td>
                    <td>運動による末梢・中枢 CGRP 動態の正常化</td>
                    <td>片頭痛頻度・強度の低下</td>
                  </tr>
                  <tr>
                    <td>炎症性サイトカイン ↓</td>
                    <td>IL-6・TNF-α の産生抑制</td>
                    <td>神経炎症の軽減</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="src-grid">
              <div className="src">
                <div className="src-org">Cephalalgia 2000</div>
                <div className="src-t">Bendtsen L. 緊張型頭痛における中枢感作</div>
                <Ext
                  className="src-url"
                  href="https://journals.sagepub.com/doi/10.1046/j.1468-2982.2000.00053.x"
                >
                  journals.sagepub.com/…1468-2982.2000.00053.x
                </Ext>
              </div>
            </div>
          </section>

          {/* ============================================================ SECTION 4 */}
          <section id="s4" className="sec">
            <div className="sec-hd">
              <div className="sec-num">4</div>
              <h2 className="sec-title">赤旗症状スクリーニング（SNOOP4）— 最優先確認事項</h2>
            </div>

            <div className="alert a-danger">
              <div className="alert-i">⛔</div>
              <div>
                <strong>絶対原則:</strong> 理学療法を開始する前に、必ず SNOOP4
                基準を確認してください。赤旗症状が陽性の場合は、<strong>緊急神経学的評価</strong>
                （CT/MRI/腰椎穿刺）を優先し、PT の開始を延期します。
              </div>
            </div>

            <div className="mmd">
              <div className="mmd-lbl">フローチャート — SNOOP4 赤旗スクリーニング</div>
              <MermaidDiagram
                themeVariables={PT_MERMAID_THEME}
                chart={`flowchart TD
START(["🟦 患者が頭痛を訴えている\\nPT 開始評価を行う前に確認"])
START --> S

S{"🔴 S — Systemic symptoms\\n全身症状:\\n発熱・髄膜刺激症状\\n原因不明の体重減少\\n免疫抑制状態・既知の悪性腫瘍"}
S -->|"🚨 該当あり"| URGENT
S -->|"✅ 該当なし"| N

N{"🔴 N — Neurological deficits\\n神経学的異常:\\n片麻痺・感覚障害\\n失語・複視・乳頭浮腫\\n意識変容・認知変化"}
N -->|"🚨 該当あり"| URGENT
N -->|"✅ 該当なし"| O1

O1{"🔴 O — Onset sudden\\n突発性発症:\\n人生最悪の頭痛\\n雷鳴頭痛（thunderclap）\\n→ くも膜下出血（SAH）を除外"}
O1 -->|"🚨 該当あり"| URGENT
O1 -->|"✅ 該当なし"| O2

O2{"🟡 O — Onset after age 50\\n50歳以降の新規発症:\\n→ 側頭動脈炎\\n→ 頭蓋内腫瘍を疑う"}
O2 -->|"⚠️ 該当あり"| CAUTION
O2 -->|"✅ 該当なし"| P

P{"🟡 P — Pattern change\\nパターン変化:\\n進行性悪化・外傷後\\n体位依存性"}
P -->|"⚠️ 該当あり"| CAUTION
P -->|"✅ 該当なし"| FOUR

FOUR{"🟡 4 — 以下いずれかに該当:\\nPapilledema（乳頭浮腫）\\nPostdural puncture（硬膜穿刺後）\\nPost-seizure（痙攣後）\\nPregnancy / Postpartum（妊娠・産後）"}
FOUR -->|"⚠️ 該当あり"| CAUTION
FOUR -->|"✅ 該当なし"| CLEAR

URGENT["🚨 緊急神経学的評価\\nCT / MRI / 腰椎穿刺\\n⛔ PT は絶対に開始しない\\n神経内科 / 脳神経外科へ即座に紹介"]
CAUTION["⚠️ 精密検査・医師連携が必要\\nMRI / CT の実施を推奨\\n医師の許可と診断確定後に PT 開始"]
CLEAR["✅ SNOOP4 クリア\\n一次性頭痛の可能性が高い\\n→ Section 6 フローチャートへ進む"]

style URGENT fill:#C0392B,color:#fff,stroke:#922B21
style CAUTION fill:#E67E22,color:#fff,stroke:#CA6F1E
style CLEAR fill:#1E8449,color:#fff,stroke:#196F3D
style START fill:#2980B9,color:#fff,stroke:#2471A3`}
              />
            </div>

            <div className="src-grid">
              <div className="src">
                <div className="src-org">NICE</div>
                <div className="src-t">Headache Guidelines CG150（英国）</div>
                <Ext className="src-url" href="https://www.nice.org.uk/guidance/cg150">
                  nice.org.uk/guidance/cg150
                </Ext>
              </div>
              <div className="src">
                <div className="src-org">AAN</div>
                <div className="src-t">Headache Guidelines</div>
                <Ext className="src-url" href="https://www.aan.com/guidelines/">
                  aan.com/guidelines
                </Ext>
              </div>
            </div>
          </section>

          {/* ============================================================ SECTION 5 */}
          <section id="s5" className="sec">
            <div className="sec-hd">
              <div className="sec-num">5</div>
              <h2 className="sec-title">エビデンス評価システム（AAN/EHF 標準）</h2>
            </div>

            <p>本ガイドのすべての推奨は、以下の国際標準グレードで分類されています。</p>

            <h3>推奨グレード</h3>
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
                    <td>≥2 件の一致した Class I RCT / 低異質性 Cochrane SR</td>
                    <td>
                      <strong>強く推奨</strong> — 実施すべきエビデンスが確立
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <span className="bB">Grade B</span>
                    </td>
                    <td>1 件の Class I RCT または ≥2 件の Class II 研究</td>
                    <td>
                      <strong>推奨</strong> — 有効である可能性が高い
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <span className="bC">Grade C</span>
                    </td>
                    <td>1 件の Class II または ≥2 件 of Class III 研究</td>
                    <td>
                      <strong>考慮可能</strong> — 有効である可能性がある
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <span className="bU">Grade U</span>
                    </td>
                    <td>不十分・相反するエビデンス</td>
                    <td>
                      <strong>推奨不可</strong> — 現時点では判断困難
                    </td>
                  </tr>
                  <tr>
                    <td>Expert</td>
                    <td>RCT なし・ガイドラインコンセンサスのみ</td>
                    <td>
                      <strong>専門家合意</strong> — 臨床経験に基づく
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3>研究クラス定義</h3>
            <div className="tbl">
              <table>
                <thead>
                  <tr>
                    <th>クラス</th>
                    <th>定義</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Class I</td>
                    <td>適切にマスクされた（盲検化された）高質な RCT</td>
                  </tr>
                  <tr>
                    <td>Class II</td>
                    <td>コホート研究・非盲検 RCT・症例対照研究（質の高いもの）</td>
                  </tr>
                  <tr>
                    <td>Class III</td>
                    <td>ケースコントロール・症例シリーズ</td>
                  </tr>
                  <tr>
                    <td>Class IV</td>
                    <td>専門家意見・ケースレポート・生理学的研究</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="src-grid">
              <div className="src">
                <div className="src-org">AAN</div>
                <div className="src-t">Clinical Practice Guideline Process Manual</div>
                <Ext className="src-url" href="https://www.aan.com/Guidelines/Home/Development">
                  aan.com/Guidelines/Home/Development
                </Ext>
              </div>
            </div>
          </section>

          {/* ============================================================ SECTION 6 */}
          <section id="s6" className="sec">
            <div className="sec-hd">
              <div className="sec-num">6</div>
              <h2 className="sec-title">頭痛タイプ別 理学療法 適応フローチャート</h2>
            </div>

            <div className="mmd">
              <div className="mmd-lbl">フローチャート — 頭痛タイプ別 PT 適応判断</div>
              <MermaidDiagram
                themeVariables={PT_MERMAID_THEME}
                chart={`flowchart TD
START(["✅ SNOOP4 クリア\\nICHD-3 診断の確認へ"])
START --> DX

DX{"ICHD-3 診断分類"}
DX -->|"片頭痛\\n1.1 / 1.2"| MIG
DX -->|"慢性片頭痛\\n1.3"| CMIG
DX -->|"緊張型頭痛\\n2.1 / 2.2 / 2.3"| TTH
DX -->|"頸因性頭痛\\n11.2"| CEH
DX -->|"群発頭痛\\n3.1 / 3.2"| CH

MIG{"頭痛頻度\\n≥ 4日/月?"}
MIG -->|"YES → 予防的PT"| MIG_H["予防プログラム（Priority）\\n✅ 有酸素運動 Grade B\\n✅ バイオフィードバック Grade A\\n✅ 鍼療法 Grade B\\n✅ 徒手療法 Grade B\\n✅ リラクゼーション Grade B"]
MIG -->|"NO → セルフケア主体"| MIG_L["セルフケア + 急性期対策\\n✅ トリガー管理・日誌\\n✅ リラクゼーション習得\\n✅ ホーム有酸素運動"]

CMIG["慢性片頭痛 — 包括的マルチモーダルPT\\n✅ 有酸素運動 Grade B（必須）\\n✅ バイオフィードバック Grade A（必須）\\n✅ 認知行動療法 Grade B\\n✅ 徒手療法 Grade B\\n⚠️ 薬物療法（CGRP mAbs等）との並行が必須"]

TTH{"慢性化?\\n≥ 15日/月"}
TTH -->|"YES → 慢性TTH"| CTTH["慢性緊張型頭痛 プロトコル\\n✅ EMGバイオフィードバック Grade A\\n✅ 徒手療法 Grade A\\n✅ トリガーポイント療法 Grade B\\n✅ 心理療法（CBT）Grade B\\n✅ TENS Grade B"]
TTH -->|"NO → エピソード性TTH"| ETTH["エピソード性TTH プロトコル\\n✅ 徒手療法 Grade A\\n✅ トリガーポイント療法 Grade B\\n✅ 姿勢矯正 Expert\\n✅ ホームストレッチ Expert"]

CEH["頸因性頭痛 — PT が第一選択治療\\n✅ 頸椎徒手療法 Grade A（最重要）\\n✅ 特定頸部運動（深頸屈筋強化）Grade A\\n✅ SNAG 手技 Grade A\\n✅ 姿勢矯正 Grade B\\n✅ エルゴノミクス介入 Grade B"]

CH["群発頭痛 — PT は補完的役割\\n⚠️ 急性期: 高流量酸素療法（第一選択）\\n✅ ストレス・睡眠管理 Grade C\\n✅ トリガー（アルコール・高度）回避\\n✅ 生活リズム正常化 Expert"]

style CMIG fill:#C0392B,color:#fff
style CEH fill:#1E8449,color:#fff
style CH fill:#7F8C8D,color:#fff
style MIG_H fill:#2980B9,color:#fff`}
              />
            </div>
          </section>

          {/* ============================================================ SECTION 7 */}
          <section id="s7" className="sec">
            <div className="sec-hd">
              <div className="sec-num">7</div>
              <h2 className="sec-title">主要理学療法モダリティ 詳細解説</h2>
            </div>

            <h3>7-1. 徒手療法（Manual Therapy）</h3>
            <p>
              徒手療法は、理学療法士・整骨医が手技によって頸椎・頭蓋周囲構造・軟組織に直接介入する方法です。
            </p>
            <div className="tbl">
              <table>
                <thead>
                  <tr>
                    <th>手技名</th>
                    <th>対象部位</th>
                    <th>作用機序</th>
                    <th>主な適応頭痛</th>
                    <th>グレード</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>頸椎モビライゼーション</td>
                    <td>C1–C7 関節</td>
                    <td>関節受容器賦活・疼痛抑制</td>
                    <td>頸因性・TTH・片頭痛</td>
                    <td>
                      <span className="bA">A/B</span>
                    </td>
                  </tr>
                  <tr>
                    <td>高速低振幅テクニック（HVLA）</td>
                    <td>C1/C2 環軸関節</td>
                    <td>急速伸張による筋緊張緩和・オピオイド放出</td>
                    <td>頸因性頭痛</td>
                    <td>
                      <span className="bA">A</span>
                    </td>
                  </tr>
                  <tr>
                    <td>後頭下筋群抑制手技</td>
                    <td>後頭骨–環椎（C0–C1）</td>
                    <td>副交感神経賦活・局所虚血解除</td>
                    <td>片頭痛・TTH</td>
                    <td>
                      <span className="bB">B</span>
                    </td>
                  </tr>
                  <tr>
                    <td>SNAG（持続的自然椎間孔滑動）</td>
                    <td>頸椎各レベル</td>
                    <td>動的関節内圧変化・疼痛抑制</td>
                    <td>頸因性頭痛</td>
                    <td>
                      <span className="bA">A</span>
                    </td>
                  </tr>
                  <tr>
                    <td>筋エネルギー技法（MET）</td>
                    <td>頸椎・胸椎</td>
                    <td>交互抑制による筋緊張低下</td>
                    <td>TTH・頸因性</td>
                    <td>
                      <span className="bC">C</span>
                    </td>
                  </tr>
                  <tr>
                    <td>頭蓋仙骨療法（CST）</td>
                    <td>頭蓋縫合・仙骨</td>
                    <td>⚠️ 機序未確立</td>
                    <td>一部症例</td>
                    <td>
                      <span className="bU">U</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h4>ステップバイステップ: 後頭下筋群抑制手技（Suboccipital Inhibition）</h4>
            <div className="steps">
              <div className="step">
                <div className="step-t">患者を仰臥位に配置</div>
                <div className="step-d">仰向けでリラックスした状態を確認する。</div>
              </div>
              <div className="step">
                <div className="step-t">術者の手を後頭骨下縁へ</div>
                <div className="step-d">
                  術者は患者の頭側に座り、両手第 2–4 指を後頭骨下縁に配置する。
                </div>
              </div>
              <div className="step">
                <div className="step-t">垂直方向に軽く圧迫</div>
                <div className="step-d">
                  C1–C2 後弓に向けて指の腹で垂直に軽く圧迫（5–8N 程度）。
                </div>
              </div>
              <div className="step">
                <div className="step-t">組織が緩むのを待つ</div>
                <div className="step-d">
                  「組織が緩むのを待つ」感覚で 4–8 分間保持する（強制しない）。
                </div>
              </div>
              <div className="step">
                <div className="step-t">徐々に圧力を解放・再評価</div>
                <div className="step-d">圧力を徐々に解放し、頸部 ROM と圧痛を再評価する。</div>
              </div>
              <div className="step">
                <div className="step-t">コースで実施</div>
                <div className="step-d">週 1–2 回 × 6–8 週のコースで実施する。</div>
              </div>
            </div>

            <div className="src-grid">
              <div className="src">
                <div className="src-org">PubMed 2006</div>
                <div className="src-t">
                  Fernández-de-Las-Peñas C, et al. 虚血性圧迫・横断摩擦の即時効果
                </div>
                <Ext className="src-url" href="https://pubmed.ncbi.nlm.nih.gov/16533614/">
                  pubmed.ncbi.nlm.nih.gov/16533614
                </Ext>
              </div>
              <div className="src">
                <div className="src-org">Cochrane 2015</div>
                <div className="src-t">Gross A, et al. 頸椎徒手療法レビュー</div>
                <Ext
                  className="src-url"
                  href="https://www.cochranelibrary.com/cdsr/doi/10.1002/14651858.CD004249.pub4"
                >
                  …CD004249.pub4
                </Ext>
              </div>
            </div>

            <h3>7-2. 有酸素運動療法（Aerobic Exercise Therapy）</h3>
            <div className="mmd">
              <div className="mmd-lbl">フローチャート — 有酸素運動が頭痛に効く神経生物学的機序</div>
              <MermaidDiagram
                themeVariables={PT_MERMAID_THEME}
                chart={`flowchart LR
EX["🏃 有酸素運動\\nの実施"]

EX --> A["β-エンドルフィン ↑\\n下降性疼痛抑制系の賦活"]
EX --> B["セロトニン（5-HT）↑\\n中縫線核からの放出"]
EX --> C["CGRP産生の長期的正常化\\n末梢・中枢 CGRP 動態"]
EX --> D["BDNF ↑\\n神経可塑性促進"]
EX --> E["炎症性サイトカイン ↓\\nIL-6 / TNF-α 抑制"]

A & B & C & D & E --> EFFECT["✅ 片頭痛頻度の低下\\n✅ 頭痛強度の軽減\\n✅ 生活の質（QOL）の改善\\n✅ 薬物使用量の減少"]

style EX fill:#2980B9,color:#fff
style EFFECT fill:#1E8449,color:#fff`}
              />
            </div>

            <h4>国際標準 推奨プロトコル（AAN/EHF 準拠）</h4>
            <div className="tbl">
              <table>
                <thead>
                  <tr>
                    <th>パラメータ</th>
                    <th>推奨値</th>
                    <th>根拠</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>頻度</td>
                    <td>週 3 回</td>
                    <td>Varkey et al., 2011 RCT</td>
                  </tr>
                  <tr>
                    <td>強度</td>
                    <td>最大心拍数（HRmax）の 60–80%（中等度）</td>
                    <td>低強度では効果不十分</td>
                  </tr>
                  <tr>
                    <td>時間</td>
                    <td>45–60 分/セッション（有酸素フェーズ最低 30 分）</td>
                    <td>Cochrane SR</td>
                  </tr>
                  <tr>
                    <td>種類</td>
                    <td>自転車エルゴメータ・ウォーキング・水泳を優先</td>
                    <td>頭部への振動が少ない種目</td>
                  </tr>
                  <tr>
                    <td>継続期間</td>
                    <td>
                      <strong>最低 12 週間</strong>（効果発現に 8–12 週）
                    </td>
                    <td>Varkey et al., 2011</td>
                  </tr>
                  <tr>
                    <td>開始前</td>
                    <td>安静時心電図・内科的リスク評価</td>
                    <td>AHA 運動ガイドライン</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h4>最大心拍数（HRmax）の計算</h4>
            <div className="alert a-info">
              <div className="alert-i">🧮</div>
              <div>
                <strong>HRmax（推定）= 220 − 年齢（歳）</strong>　例: 35 歳 → HRmax = 220 − 35 ={" "}
                <strong>185 bpm</strong>。これに目標強度（%）を掛けて運動ゾーンを算出します。
              </div>
            </div>
            <div className="tbl">
              <table>
                <thead>
                  <tr>
                    <th>ゾーン</th>
                    <th>%HRmax</th>
                    <th>35歳の目安</th>
                    <th>用途</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>適応期</td>
                    <td>60%</td>
                    <td>約 111 bpm</td>
                    <td>開始期（適応）</td>
                  </tr>
                  <tr>
                    <td>維持期</td>
                    <td>70%</td>
                    <td>約 130 bpm</td>
                    <td>標準</td>
                  </tr>
                  <tr>
                    <td>上限</td>
                    <td>80%</td>
                    <td>約 148 bpm</td>
                    <td>慣れた患者</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h4>12 週間段階的プログラム</h4>
            <div className="phase-grid" style={{ gridTemplateColumns: "repeat(3,1fr)" }}>
              <div className="ph ph1">
                <div className="ph-icon">🟡</div>
                <div className="ph-title">適応期</div>
                <div className="ph-time">1–3 週 / 50–60% HRmax</div>
                <div className="ph-desc">ウォーキング 20 分 × 週 3 回</div>
              </div>
              <div className="ph ph2">
                <div className="ph-icon">🔵</div>
                <div className="ph-title">漸増期</div>
                <div className="ph-time">4–8 週 / 60–70% HRmax</div>
                <div className="ph-desc">有酸素運動 30–45 分 × 週 3 回</div>
              </div>
              <div className="ph ph4">
                <div className="ph-icon">🟢</div>
                <div className="ph-title">維持期</div>
                <div className="ph-time">9–12 週〜 / 70–80% HRmax</div>
                <div className="ph-desc">有酸素運動 45–60 分 × 週 3 回</div>
              </div>
            </div>

            <div className="src-grid">
              <div className="src">
                <div className="src-org">Cephalalgia 2011</div>
                <div className="src-t">運動 vs トピラマート vs リラクゼーション RCT</div>
                <Ext
                  className="src-url"
                  href="https://journals.sagepub.com/doi/10.1177/0333102411412385"
                >
                  journals.sagepub.com/…0333102411412385
                </Ext>
              </div>
              <div className="src">
                <div className="src-org">PubMed 2011</div>
                <div className="src-t">有酸素運動と片頭痛</div>
                <Ext className="src-url" href="https://pubmed.ncbi.nlm.nih.gov/21328195/">
                  pubmed.ncbi.nlm.nih.gov/21328195
                </Ext>
              </div>
            </div>

            <h3>7-3. バイオフィードバック（Biofeedback）</h3>
            <p>
              バイオフィードバックとは、通常意識できない体の生理的信号をリアルタイムで視覚化・聴覚化し、それを意識的にコントロールする訓練法です。
            </p>
            <div className="mmd">
              <div className="mmd-lbl">フローチャート — バイオフィードバックの作用ループ</div>
              <MermaidDiagram
                themeVariables={PT_MERMAID_THEME}
                chart={`flowchart TD
A["体の生理信号\\n（筋電図・皮膚温・心拍変動）"] --> B["センサーで計測\\nモニター / 音でリアルタイム表示"]
B --> C["患者が意識的に調整\\n自律神経・筋緊張の自己制御"]
C --> D["繰り返し訓練で\\n制御能力が向上"]
D --> E["✅ ストレス反応・筋緊張・血管収縮の低下\\n→ 頭痛軽減"]
E -.継続フィードバック.-> C

style A fill:#fff3e0,stroke:#f57c00
style E fill:#1E8449,color:#fff`}
              />
            </div>

            <h4>主要な種類と適応</h4>
            <div className="tbl">
              <table>
                <thead>
                  <tr>
                    <th>種類</th>
                    <th>計測パラメータ</th>
                    <th>主な適応</th>
                    <th>グレード</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <strong>EMG バイオフィードバック</strong>
                    </td>
                    <td>前頭筋・僧帽筋の筋電図</td>
                    <td>緊張型頭痛（第一選択）</td>
                    <td>
                      <span className="bA">Grade A</span>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <strong>熱（皮膚温）バイオフィードバック</strong>
                    </td>
                    <td>指先皮膚温（自律神経機能）</td>
                    <td>片頭痛</td>
                    <td>
                      <span className="bA">Grade A</span>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <strong>HRV バイオフィードバック</strong>
                    </td>
                    <td>心拍変動（迷走神経機能）</td>
                    <td>慢性頭痛・片頭痛</td>
                    <td>
                      <span className="bB">Grade B</span>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <strong>EEG ニューロフィードバック</strong>
                    </td>
                    <td>α/θ 波パターン</td>
                    <td>慢性頭痛（一部）</td>
                    <td>
                      <span className="bC">Grade C</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h4>ステップバイステップ: EMG バイオフィードバック セッション手順</h4>
            <div className="steps">
              <div className="step">
                <div className="step-t">評価（ベースライン記録）</div>
                <div className="step-d">
                  電極を前頭筋（Fp1-Fp2）または僧帽筋上部に装着し、安静時筋電図を 3 分間記録（μV
                  単位）。
                </div>
              </div>
              <div className="step">
                <div className="step-t">フィードバック開始</div>
                <div className="step-d">
                  音または数値としてリアルタイム提示。音が低くなる（＝筋緊張が下がる）方向へ自発的に調整。
                </div>
              </div>
              <div className="step">
                <div className="step-t">技法の組み合わせ</div>
                <div className="step-d">
                  腹式呼吸（4-7-8 法）と視覚化（暖かく穏やかな場面の想像）を同時に実施。
                </div>
              </div>
              <div className="step">
                <div className="step-t">セッション管理</div>
                <div className="step-d">1 セッション 20–30 分、頻度は週 2–3 回 × 8–12 週。</div>
              </div>
              <div className="step">
                <div className="step-t">ホームプラクティスへ移行</div>
                <div className="step-d">携帯型 EMG デバイスで毎日 15–20 分の自主練習を推奨。</div>
              </div>
            </div>

            <div className="src-grid">
              <div className="src">
                <div className="src-org">Pain 2007</div>
                <div className="src-t">
                  Nestoriuc Y & Martin A. 片頭痛バイオフィードバック メタ解析
                </div>
                <Ext className="src-url" href="https://pubmed.ncbi.nlm.nih.gov/17097218/">
                  pubmed.ncbi.nlm.nih.gov/17097218
                </Ext>
              </div>
              <div className="src">
                <div className="src-org">J Consult Clin Psychol 2008</div>
                <div className="src-t">
                  Nestoriuc Y, et al. 緊張型頭痛バイオフィードバック メタ解析
                </div>
                <Ext className="src-url" href="https://pubmed.ncbi.nlm.nih.gov/18426234/">
                  pubmed.ncbi.nlm.nih.gov/18426234
                </Ext>
              </div>
              <div className="src">
                <div className="src-org">AAN 2012</div>
                <div className="src-t">行動・理学療法ガイドライン</div>
                <Ext
                  className="src-url"
                  href="https://www.aan.com/guidelines/home/getguidelinecontent/383"
                >
                  aan.com/…getguidelinecontent/383
                </Ext>
              </div>
              <div className="src">
                <div className="src-org">Cochrane</div>
                <div className="src-t">CBT/バイオフィードバック — 片頭痛予防</div>
                <Ext
                  className="src-url"
                  href="https://www.cochranelibrary.com/cdsr/doi/10.1002/14651858.CD012295.pub2"
                >
                  …CD012295.pub2
                </Ext>
              </div>
            </div>

            <h3>7-4. 経皮的電気神経刺激（TENS / Cefaly Device）</h3>
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
                    <td>
                      <strong>ゲートコントロール理論</strong>
                    </td>
                    <td>Aβ 繊維の刺激が脊髄後角で痛み信号（Aδ/C 繊維）の伝達をブロック</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>内因性オピオイド放出</strong>
                    </td>
                    <td>長時間刺激で β-エンドルフィン・エンケファリンの産生増加</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>三叉神経調節（Cefaly）</strong>
                    </td>
                    <td>眼窩上神経（V1）の経皮的脱感作 → 三叉神経系の過活動を抑制</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h4>Cefaly Device（眼窩上 TENS / FDA 承認デバイス）</h4>
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
                    <td>FDA 承認年</td>
                    <td>2014年（急性期治療）/ 2020年（予防）</td>
                  </tr>
                  <tr>
                    <td>電極位置</td>
                    <td>前額部中央（眼窩上神経 / 三叉神経第1枝）</td>
                  </tr>
                  <tr>
                    <td>急性期使用</td>
                    <td>60 分/回（発作時）</td>
                  </tr>
                  <tr>
                    <td>予防的使用</td>
                    <td>20 分/日（毎日）</td>
                  </tr>
                  <tr>
                    <td>エビデンス</td>
                    <td>
                      <span className="bB">Grade B</span>（予防）/{" "}
                      <span className="bB">Grade B</span>（急性）
                    </td>
                  </tr>
                  <tr>
                    <td>利点</td>
                    <td>副作用なし・在宅使用可能・MOH リスクゼロ</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="src-grid">
              <div className="src">
                <div className="src-org">Neurology 2013</div>
                <div className="src-t">Schoenen J, et al. 眼窩上 TENS による片頭痛予防 RCT</div>
                <Ext className="src-url" href="https://pubmed.ncbi.nlm.nih.gov/23401045/">
                  pubmed.ncbi.nlm.nih.gov/23401045
                </Ext>
              </div>
              <div className="src">
                <div className="src-org">FDA</div>
                <div className="src-t">医療機器データベース</div>
                <Ext className="src-url" href="https://www.fda.gov/medical-devices">
                  fda.gov/medical-devices
                </Ext>
              </div>
            </div>

            <h3>7-5. 鍼療法（Acupuncture）</h3>
            <p>
              鍼療法は東洋医学の枠を超えた科学的機序が解明されています。Cochrane Library
              の最新レビュー（Linde et al.,
              2016）では、鍼療法は片頭痛予防において予防薬（プロプラノロール／トピラマート）と
              <strong>同等以上の効果</strong>を示し、真の鍼療法は偽鍼より有意に優れていました。
            </p>
            <div className="tbl">
              <table>
                <thead>
                  <tr>
                    <th>対象頭痛</th>
                    <th>グレード</th>
                    <th>NNT</th>
                    <th>主要研究</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>片頭痛（予防）</td>
                    <td>
                      <span className="bB">B</span>
                    </td>
                    <td>約 5</td>
                    <td>Linde et al., Cochrane 2016</td>
                  </tr>
                  <tr>
                    <td>緊張型頭痛（予防）</td>
                    <td>
                      <span className="bB">B</span>
                    </td>
                    <td>約 6</td>
                    <td>Linde et al., Cochrane 2016</td>
                  </tr>
                  <tr>
                    <td>慢性頭痛（統合解析）</td>
                    <td>
                      <span className="bB">B</span>
                    </td>
                    <td>—</td>
                    <td>Acupuncture Trialists&apos; Collaboration, 2017</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="src-grid">
              <div className="src">
                <div className="src-org">Cochrane 2016</div>
                <div className="src-t">Linde K, et al. 鍼療法 — エピソード性片頭痛予防</div>
                <Ext
                  className="src-url"
                  href="https://www.cochranelibrary.com/cdsr/doi/10.1002/14651858.CD001218.pub3"
                >
                  …CD001218.pub3
                </Ext>
              </div>
              <div className="src">
                <div className="src-org">Cochrane 2016</div>
                <div className="src-t">Linde K, et al. 鍼療法 — 緊張型頭痛予防</div>
                <Ext
                  className="src-url"
                  href="https://www.cochranelibrary.com/cdsr/doi/10.1002/14651858.CD007587.pub2"
                >
                  …CD007587.pub2
                </Ext>
              </div>
            </div>

            <h3>7-6. 筋筋膜トリガーポイント療法</h3>
            <p>
              <strong>筋筋膜トリガーポイント（MTrP）</strong>
              とは、骨格筋の筋束内に存在する過敏な局所収縮帯（hyperirritable
              spot）です。頭痛患者では特定の頭頸部筋に活性型 MTrP が集中します。
            </p>
            <div className="tbl">
              <table>
                <thead>
                  <tr>
                    <th>筋肉</th>
                    <th>関連する頭痛タイプ</th>
                    <th>典型的な関連痛パターン</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>僧帽筋上部</td>
                    <td>TTH・片頭痛</td>
                    <td>こめかみ・側頭部</td>
                  </tr>
                  <tr>
                    <td>胸鎖乳突筋（SCM）</td>
                    <td>TTH・頸因性</td>
                    <td>前頭部・眼窩周囲・耳後</td>
                  </tr>
                  <tr>
                    <td>後頭下筋群</td>
                    <td>片頭痛・頸因性</td>
                    <td>後頭部 → 頭頂部 → 前頭部</td>
                  </tr>
                  <tr>
                    <td>咬筋</td>
                    <td>TTH（顎関節関連）</td>
                    <td>頬骨弓・こめかみ</td>
                  </tr>
                  <tr>
                    <td>側頭筋</td>
                    <td>TTH</td>
                    <td>側頭部・歯痛様</td>
                  </tr>
                  <tr>
                    <td>斜角筋群</td>
                    <td>頸因性</td>
                    <td>後頭部・肩甲骨間</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="tbl">
              <table>
                <thead>
                  <tr>
                    <th>手技</th>
                    <th>内容</th>
                    <th>グレード</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>虚血性圧迫法</td>
                    <td>指でトリガーポイントを 30–90 秒間持続圧迫</td>
                    <td>
                      <span className="bB">B</span>
                    </td>
                  </tr>
                  <tr>
                    <td>横断的摩擦マッサージ</td>
                    <td>筋繊維に直交する方向で摩擦刺激</td>
                    <td>
                      <span className="bC">C</span>
                    </td>
                  </tr>
                  <tr>
                    <td>ドライニードリング</td>
                    <td>鍼でトリガーポイントを刺激（局所攣縮反応 LTR 誘発）</td>
                    <td>
                      <span className="bB">B</span>
                    </td>
                  </tr>
                  <tr>
                    <td>スプレー＆ストレッチ</td>
                    <td>寒冷スプレー後に筋肉を伸張</td>
                    <td>
                      <span className="bC">C</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="src-grid">
              <div className="src">
                <div className="src-org">Headache 2006</div>
                <div className="src-t">
                  Fernández-de-Las-Peñas C, et al. MTrP と慢性 TTH の臨床パラメータ
                </div>
                <Ext className="src-url" href="https://pubmed.ncbi.nlm.nih.gov/16942467/">
                  pubmed.ncbi.nlm.nih.gov/16942467
                </Ext>
              </div>
              <div className="src">
                <div className="src-org">Cephalalgia 2007</div>
                <div className="src-t">
                  Fernández-de-Las-Peñas C, et al. MTrP と感作 — TTH 統合疼痛モデル
                </div>
                <Ext className="src-url" href="https://pubmed.ncbi.nlm.nih.gov/17359516/">
                  pubmed.ncbi.nlm.nih.gov/17359516
                </Ext>
              </div>
            </div>

            <h3>7-7. 姿勢矯正・エルゴノミクス</h3>
            <div className="alert a-warn">
              <div className="alert-i">📐</div>
              <div>
                <strong>前方頭位姿勢（FHP）の負荷:</strong> 頭部が 1 cm
                前方にずれるごとに頸椎の有効負荷が約 <strong>2.2 kg</strong>{" "}
                増加します。通常の頭部重量 ≒ 5 kg ですが、スマートフォンを見る際（45°
                前屈）の有効負荷は <strong className="tR">約 22 kg</strong>{" "}
                に達します。この慢性的な過負荷が後頭下筋・僧帽筋の緊張亢進と TCC 感作を促進します。
              </div>
            </div>
            <h4>ワークステーション評価チェックリスト</h4>
            <div className="tbl">
              <table>
                <thead>
                  <tr>
                    <th>評価項目</th>
                    <th>推奨設定</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>モニター高さ</td>
                    <td>視線より僅かに下（視線 5–15° 下向き）</td>
                  </tr>
                  <tr>
                    <td>モニター距離</td>
                    <td>50–70 cm（腕を伸ばした距離）</td>
                  </tr>
                  <tr>
                    <td>椅子の高さ</td>
                    <td>膝 90°・大腿が水平・足底が床に接地</td>
                  </tr>
                  <tr>
                    <td>キーボード位置</td>
                    <td>肘が 90–110° に屈曲する高さ</td>
                  </tr>
                  <tr>
                    <td>頸部中立位</td>
                    <td>耳孔が肩峰の直上になるよう</td>
                  </tr>
                  <tr>
                    <td>スマートフォン</td>
                    <td>視線の高さに近づける（うつむき姿勢を回避）</td>
                  </tr>
                  <tr>
                    <td>定期的な休憩</td>
                    <td>30–60 分ごとに立位・頸部ストレッチ</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3>7-8. 温熱・寒冷療法（Thermal Therapy）</h3>
            <div className="tbl">
              <table>
                <thead>
                  <tr>
                    <th>種類</th>
                    <th>適応</th>
                    <th>方法</th>
                    <th>グレード</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <strong>温熱</strong>
                    </td>
                    <td>筋緊張性頭痛・TTH</td>
                    <td>頸部後面に温湿布 15–20 分</td>
                    <td>
                      <span className="bC">C</span> / Expert
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <strong>寒冷</strong>
                    </td>
                    <td>片頭痛急性期</td>
                    <td>側頭部・頸部に ice pack 10–15 分</td>
                    <td>
                      <span className="bC">C</span>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <strong>温冷交互浴</strong>
                    </td>
                    <td>頸部循環改善</td>
                    <td>3 分温 → 1 分冷 × 3 サイクル</td>
                    <td>Expert</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="alert a-danger">
              <div className="alert-i">⚠️</div>
              <div>
                急性炎症期・皮膚感覚障害・末梢循環障害がある場合は<strong>禁忌</strong>です。
              </div>
            </div>
          </section>

          {/* ============================================================ SECTION 8 */}
          <section id="s8" className="sec">
            <div className="sec-hd">
              <div className="sec-num">8</div>
              <h2 className="sec-title">ステップバイステップ 臨床プロトコル（頭痛タイプ別）</h2>
            </div>

            <h3>8-1. 片頭痛（ICHD-3: 1.1 / 1.2）プロトコル</h3>
            <div className="mmd">
              <div className="mmd-lbl">フローチャート — 片頭痛 理学療法プロトコル</div>
              <MermaidDiagram
                themeVariables={PT_MERMAID_THEME}
                chart={`flowchart TD
START(["片頭痛患者\\nSNOOP4 クリア確認済み"])
START --> ASSESS

ASSESS{"障害度・頻度の評価\\n（ベースライン30日間の頭痛日誌）"}
ASSESS --> HIGH["高障害度 / 高頻度\\nHIT-6 ≥ 60 または MIDAS ≥ 21\\nまたは ≥ 4 頭痛日/月\\n→ 予防的PTプログラム（必須）"]
ASSESS --> LOW["低障害度 / 低頻度\\nHIT-6 &lt; 60 かつ MIDAS &lt; 21\\nかつ &lt; 4 頭痛日/月\\n→ セルフケア主体"]

HIGH --> P1["Phase 1: 評価・基盤形成\\n週 1–2 回 × 4 週"]
P1 --> P1A["ベースライン評価\\nHIT-6 / MIDAS / VAS を記録\\n頭痛日誌 30 日間継続"]
P1A --> P1B["主要トリガーの同定\\n環境・食事・睡眠・ストレス・ホルモン"]
P1B --> P1C["有酸素運動を開始\\nウォーキング 20 分 × 週 3 回\\n（HRmax の 50–60%）"]
P1C --> P2

P2["Phase 2: 積極 feather 介入\\n週 2–3 回 × 8 週"]
P2 --> P2A["バイオフィードバック\\n熱 or EMG / Grade A"]
P2 --> P2B["有酸素運動 漸増\\n30–45 分 × 週 3 回（60–70%）"]
P2 --> P2C["後頭下筋群 徒手療法\\n週 1–2 回（Grade B）"]
P2 --> P2D["リラクゼーション訓練\\n腹式呼吸 / PMR / マインドフルネス"]
P2A & P2B & P2C & P2D --> P3

P3["Phase 3: 維持・自己管理\\n月 2–4 回 × 継続"]
P3 --> P3A["ホームエクササイズ完全確立\\n有酸素運動 45–60 分 × 週 3 回"]
P3A --> P3B["3 ヶ月評価\\nHIT-6 / MIDAS / 頭痛日誌を再評価"]

P3B --> OUTCOME{"目標達成?\\n頭痛日数 ≥ 50% 減少"}
OUTCOME -->|"✅ YES"| SUCCESS["維持プログラムへ移行\\n3–6 ヶ月ごとに再評価"]
OUTCOME -->|"❌ NO"| ADJUST["プログラム調整\\nCGRP mAbs / トピラマート等を追加\\n神経内科専門医へ紹介"]

LOW --> LA["セルフケア指導\\nトリガー管理・日誌継続\\nホーム有酸素運動の習慣化\\nリラクゼーション習得"]

style SUCCESS fill:#1E8449,color:#fff
style ADJUST fill:#C0392B,color:#fff
style HIGH fill:#E67E22,color:#fff
style LOW fill:#2980B9,color:#fff`}
              />
            </div>

            <h4>週次スケジュール例（Phase 2）</h4>
            <div className="tbl">
              <table>
                <thead>
                  <tr>
                    <th>曜日</th>
                    <th>内容</th>
                    <th>時間</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>月</td>
                    <td>有酸素運動（自転車エルゴメータ／ウォーキング）</td>
                    <td>45 分</td>
                  </tr>
                  <tr>
                    <td>火</td>
                    <td>バイオフィードバック（クリニック）＋ 頸部徒手療法</td>
                    <td>60 分</td>
                  </tr>
                  <tr>
                    <td>水</td>
                    <td>有酸素運動</td>
                    <td>45 分</td>
                  </tr>
                  <tr>
                    <td>木</td>
                    <td>リラクゼーション訓練（腹式呼吸・PMR）</td>
                    <td>20 分</td>
                  </tr>
                  <tr>
                    <td>金</td>
                    <td>バイオフィードバック（クリニック／ホームデバイス）</td>
                    <td>30 分</td>
                  </tr>
                  <tr>
                    <td>土</td>
                    <td>有酸素運動（やや長め）</td>
                    <td>60 分</td>
                  </tr>
                  <tr>
                    <td>日</td>
                    <td>休息 ＋ 頭痛日誌の記録・振り返り</td>
                    <td>—</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3>8-2. 緊張型頭痛（ICHD-3: 2.1–2.3）プロトコル</h3>
            <div className="mmd">
              <div className="mmd-lbl">フローチャート — 緊張型頭痛 理学療法プロトコル</div>
              <MermaidDiagram
                themeVariables={PT_MERMAID_THEME}
                chart={`flowchart TD
START(["緊張型頭痛患者\\nSNOOP4 クリア確認済み"])
START --> TYPE

TYPE{"ICHD-3 頻度分類"}
TYPE -->|"&lt; 1 日/月\\n2.1"| INFREQ["非頻発性 TTH\\nセルフケア主体で十分"]
TYPE -->|"1–14 日/月\\n2.2"| FREQ["頻発性 TTH\\n積極的 PT 介入"]
TYPE -->|"≥ 15 日/月\\n2.3"| CHRONIC["慢性 TTH\\n包括的マルチモーダル介入"]

INFREQ --> INF1["セルフケア指導\\n✅ 姿勢矯正と意識化\\n✅ 頸部ストレッチ\\n✅ 睡眠衛生の改善\\n✅ ストレス管理の基礎"]

FREQ --> F1["Step 1: 初期評価\\n頸椎 ROM 測定\\nMTrP マッピング\\nFHP 角度の評価"]
F1 --> F2["Step 2: トリガーポイント療法\\n僧幕筋上部・SCM・側頭筋・後頭下筋群\\n虚血性圧迫法 週 2–3 回 × 6–8 週\\nGrade B"]
F2 --> F3["Step 3: 頸椎徒手療法\\nモビライゼーション\\n週 1–2 回 × 6 週 / Grade A"]
F3 --> F4["Step 4: EMG バイオフィードバック\\n前頭筋・僧帽筋\\n週 2–3 回 × 8 週 / Grade A"]
F4 --> F5["Step 5: ホームプログラム確立\\n頸部ストレッチ × 3 回/日\\n姿勢チェック × 1 時間ごと\\nリラクゼーション × 毎日 20 分"]

CHRONIC --> CH1["多専門チームアプローチ\\n理学療法 + 心理療法（CBT）+ 薬物療法\\nアミトリプチリン等の予防薬を検討"]

style CHRONIC fill:#C0392B,color:#fff
style FREQ fill:#E67E22,color:#fff
style INFREQ fill:#1E8449,color:#fff`}
              />
            </div>

            <h4>ホームストレッチプログラム（毎日実施）</h4>
            <div className="tbl">
              <table>
                <thead>
                  <tr>
                    <th>ストレッチ名</th>
                    <th>対象筋</th>
                    <th>方法</th>
                    <th>回数/日</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>頸部側屈ストレッチ</td>
                    <td>胸鎖乳突筋・斜角筋</td>
                    <td>耳を肩に近づけ 20 秒保持</td>
                    <td>3 回 × 3 セット</td>
                  </tr>
                  <tr>
                    <td>頸部前屈ストレッチ</td>
                    <td>後頭下筋群</td>
                    <td>顎を胸に近づけ 20 秒保持</td>
                    <td>3 回 × 3 セット</td>
                  </tr>
                  <tr>
                    <td>肩甲骨後退運動</td>
                    <td>僧帽筋中部・菱形筋</td>
                    <td>肩甲骨を中央に引き寄せ 10 秒</td>
                    <td>10 回 × 3 セット</td>
                  </tr>
                  <tr>
                    <td>胸椎伸展（タオルロール）</td>
                    <td>脊柱起立筋・大胸筋</td>
                    <td>胸椎下にタオルを置き仰向けで伸展</td>
                    <td>5 分</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3>8-3. 頸因性頭痛（ICHD-3: 11.2）プロトコル</h3>
            <div className="alert a-ok">
              <div className="alert-i">💡</div>
              <div>
                <strong>重要:</strong> 頸因性頭痛において、理学療法は薬物療法と
                <strong>同等以上の主要治療手段</strong>です（Jull et al., 2002）。
              </div>
            </div>
            <div className="mmd">
              <div className="mmd-lbl">フローチャート — 頸因性頭痛 理学療法プロトコル</div>
              <MermaidDiagram
                themeVariables={PT_MERMAID_THEME}
                chart={`flowchart TD
START(["頸因性頭痛 ICHD-3: 11.2\\nSNOOP4 クリア確認済み"])
START --> DIAG

DIAG["診断確認基準\\n✅ 頸椎・頸部構造に起因\\n✅ 頸部運動／圧迫で頭痛が誘発\\n✅ 頸部への介入で頭痛が軽減\\n✅ 通常は一側性"]
DIAG --> EVAL

EVAL["Step 1: 包括的頸椎評価"]
EVAL --> E1["頸椎 ROM（屈曲/伸展/回旋/側屈）\\nPPIVM テスト\\n頸部深部屈筋の筋力・持久力\\nFHP 角度の計測"]
E1 --> MANUAL

MANUAL["Step 2: 徒手療法（最重要介入）"]
MANUAL --> M1["頸椎モビライゼーション\\nC2–C3 中心 / Grade A"]
MANUAL --> M2["SNAG 手技（Mulligan Concept）\\n自動運動＋術者の滑動補助 / Grade A"]
MANUAL --> M3["HVLA マニピュレーション\\nC1–C2 / ⚠️ VAT 実施後にのみ / Grade A"]
M1 & M2 & M3 --> EXERCISE

EXERCISE["Step 3: 特定頸部運動療法"]
EXERCISE --> EX1["深頸屈筋強化\\nCCFT で評価 / 漸進的抵抗運動"]
EXERCISE --> EX2["頸椎固有感覚訓練\\n目標追跡・頭部リポジショニング"]
EXERCISE --> EX3["肩甲骨安定化運動\\n前鋸筋・菱形筋・ローテーターカフ"]
EX1 & EX2 & EX3 --> POSTURE

POSTURE["Step 4: 姿勢矯正 + エルゴノミクス"]
POSTURE --> PO1["FHP 修正プログラム\\n胸椎伸展 / チン・タック運動"]
PO1 --> OUTCOME

OUTCOME["Step 5: アウトカム評価（3–6 週ごと）"]
OUTCOME --> RESULT

RESULT{"治療効果（6 週後）"}
RESULT -->|"✅ 良好"| MAINTAIN["維持プログラムへ移行\\nホームエクササイズ確立\\n3 ヶ月ごとフォローアップ"]
RESULT -->|"❌ 不十分"| REFER["⚠️ 神経ブロック療法を検討\\n後頭神経/第3後頭神経ブロック\\nペインクリニックへ紹介\\n画像再評価（MRI）"]

style MAINTAIN fill:#1E8449,color:#fff
style REFER fill:#C0392B,color:#fff`}
              />
            </div>

            <div className="src-grid">
              <div className="src">
                <div className="src-org">Spine 2002</div>
                <div className="src-t">Jull G, et al. 頸因性頭痛への運動＋徒手療法 RCT</div>
                <Ext className="src-url" href="https://pubmed.ncbi.nlm.nih.gov/12529905/">
                  pubmed.ncbi.nlm.nih.gov/12529905
                </Ext>
              </div>
            </div>
          </section>

          {/* ============================================================ SECTION 9 */}
          <section id="s9" className="sec">
            <div className="sec-hd">
              <div className="sec-num">9</div>
              <h2 className="sec-title">全モダリティ エビデンスサマリー比較表</h2>
            </div>
            <div className="tbl">
              <table>
                <thead>
                  <tr>
                    <th>モダリティ</th>
                    <th>片頭痛</th>
                    <th>緊張型</th>
                    <th>頸因性</th>
                    <th>慢性頭痛</th>
                    <th>主要ガイドライン</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>徒手療法（モビライゼーション）</td>
                    <td>
                      <span className="bB">B</span>
                    </td>
                    <td>
                      <span className="bA">A</span>
                    </td>
                    <td>
                      <span className="bA">A</span>
                    </td>
                    <td>
                      <span className="bB">B</span>
                    </td>
                    <td>AAN / EHF / NICE</td>
                  </tr>
                  <tr>
                    <td>頸椎マニピュレーション（HVLA）</td>
                    <td>
                      <span className="bC">C</span>
                    </td>
                    <td>
                      <span className="bB">B</span>
                    </td>
                    <td>
                      <span className="bA">A</span>
                    </td>
                    <td>
                      <span className="bC">C</span>
                    </td>
                    <td>Cochrane</td>
                  </tr>
                  <tr>
                    <td>有酸素運動療法</td>
                    <td>
                      <span className="bB">B</span>
                    </td>
                    <td>
                      <span className="bB">B</span>
                    </td>
                    <td>
                      <span className="bB">B</span>
                    </td>
                    <td>
                      <span className="bB">B</span>
                    </td>
                    <td>AAN 2012</td>
                  </tr>
                  <tr>
                    <td>EMG バイオフィードバック</td>
                    <td>
                      <span className="bB">B</span>
                    </td>
                    <td>
                      <span className="bA">A</span>
                    </td>
                    <td>
                      <span className="bC">C</span>
                    </td>
                    <td>
                      <span className="bB">B</span>
                    </td>
                    <td>AAN 2012</td>
                  </tr>
                  <tr>
                    <td>熱バイオフィードバック</td>
                    <td>
                      <span className="bA">A</span>
                    </td>
                    <td>
                      <span className="bC">C</span>
                    </td>
                    <td>
                      <span className="bU">U</span>
                    </td>
                    <td>
                      <span className="bB">B</span>
                    </td>
                    <td>AAN 2012</td>
                  </tr>
                  <tr>
                    <td>リラクゼーション療法</td>
                    <td>
                      <span className="bB">B</span>
                    </td>
                    <td>
                      <span className="bB">B</span>
                    </td>
                    <td>
                      <span className="bC">C</span>
                    </td>
                    <td>
                      <span className="bB">B</span>
                    </td>
                    <td>AAN 2012</td>
                  </tr>
                  <tr>
                    <td>認知行動療法（CBT）</td>
                    <td>
                      <span className="bB">B</span>
                    </td>
                    <td>
                      <span className="bB">B</span>
                    </td>
                    <td>
                      <span className="bC">C</span>
                    </td>
                    <td>
                      <span className="bB">B</span>
                    </td>
                    <td>Cochrane</td>
                  </tr>
                  <tr>
                    <td>鍼療法</td>
                    <td>
                      <span className="bB">B</span>
                    </td>
                    <td>
                      <span className="bB">B</span>
                    </td>
                    <td>
                      <span className="bC">C</span>
                    </td>
                    <td>
                      <span className="bB">B</span>
                    </td>
                    <td>Cochrane</td>
                  </tr>
                  <tr>
                    <td>TENS（Cefaly 眼窩上）</td>
                    <td>
                      <span className="bB">B</span>
                    </td>
                    <td>
                      <span className="bB">B</span>
                    </td>
                    <td>
                      <span className="bU">U</span>
                    </td>
                    <td>
                      <span className="bC">C</span>
                    </td>
                    <td>FDA / Schoenen 2013</td>
                  </tr>
                  <tr>
                    <td>トリガーポイント療法</td>
                    <td>
                      <span className="bC">C</span>
                    </td>
                    <td>
                      <span className="bB">B</span>
                    </td>
                    <td>
                      <span className="bB">B</span>
                    </td>
                    <td>
                      <span className="bC">C</span>
                    </td>
                    <td>PubMed SR</td>
                  </tr>
                  <tr>
                    <td>ドライニードリング</td>
                    <td>
                      <span className="bC">C</span>
                    </td>
                    <td>
                      <span className="bB">B</span>
                    </td>
                    <td>
                      <span className="bB">B</span>
                    </td>
                    <td>
                      <span className="bC">C</span>
                    </td>
                    <td>EHF</td>
                  </tr>
                  <tr>
                    <td>温熱・寒冷療法</td>
                    <td>
                      <span className="bC">C</span>
                    </td>
                    <td>
                      <span className="bC">C</span>
                    </td>
                    <td>
                      <span className="bC">C</span>
                    </td>
                    <td>
                      <span className="bU">U</span>
                    </td>
                    <td>Expert</td>
                  </tr>
                  <tr>
                    <td>姿勢矯正・エルゴノミクス</td>
                    <td>Expert</td>
                    <td>
                      <span className="bC">C</span>
                    </td>
                    <td>
                      <span className="bB">B</span>
                    </td>
                    <td>Expert</td>
                    <td>Expert</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="src-grid">
              <div className="src">
                <div className="src-org">AAN 2012</div>
                <div className="src-t">ガイドライン一覧（頭痛）</div>
                <Ext className="src-url" href="https://www.aan.com/guidelines/">
                  aan.com/guidelines
                </Ext>
              </div>
              <div className="src">
                <div className="src-org">EHF</div>
                <div className="src-t">ガイドライン（PMC）</div>
                <Ext
                  className="src-url"
                  href="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC9188162/"
                >
                  ncbi.nlm.nih.gov/pmc/articles/PMC9188162
                </Ext>
              </div>
              <div className="src">
                <div className="src-org">NICE</div>
                <div className="src-t">頭痛ガイドライン CG150</div>
                <Ext className="src-url" href="https://www.nice.org.uk/guidance/cg150">
                  nice.org.uk/guidance/cg150
                </Ext>
              </div>
              <div className="src">
                <div className="src-org">Cochrane</div>
                <div className="src-t">Cochrane Library</div>
                <Ext className="src-url" href="https://www.cochranelibrary.com/">
                  cochranelibrary.com
                </Ext>
              </div>
            </div>
          </section>

          {/* ============================================================ SECTION 10 */}
          <section id="s10" className="sec">
            <div className="sec-hd">
              <div className="sec-num">10</div>
              <h2 className="sec-title">特殊集団への適用</h2>
            </div>

            <h3>10.1 小児・思春期（&lt; 18 歳）</h3>
            <div className="tbl">
              <table>
                <thead>
                  <tr>
                    <th>モダリティ</th>
                    <th>推奨・注意事項</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>有酸素運動</td>
                    <td>✅ 強く推奨 / 年齢・発達段階に応じて強度・時間を調整</td>
                  </tr>
                  <tr>
                    <td>バイオフィードバック</td>
                    <td>✅ 非常に有効（Grade A）/ 薬物の代替として優先（10歳以上）</td>
                  </tr>
                  <tr>
                    <td>徒手療法</td>
                    <td>⚠️ HVLA は慎重に / モビライゼーションを優先</td>
                  </tr>
                  <tr>
                    <td>TENS</td>
                    <td>⚠️ 12 歳未満は安全性データ限定的 / 医師判断のもとで</td>
                  </tr>
                  <tr>
                    <td>スクリーンタイム管理</td>
                    <td>✅ 重要なトリガー介入（1日2時間以内を推奨）</td>
                  </tr>
                  <tr>
                    <td>睡眠衛生</td>
                    <td>✅ 特に重要 / 規則的な就寝・起床時間の確立</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3>10.2 妊娠・授乳期</h3>
            <div className="tbl">
              <table>
                <thead>
                  <tr>
                    <th>モダリティ</th>
                    <th>推奨・注意事項</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>有酸素運動</td>
                    <td>✅ 軽–中等度（ウォーキング・水中運動）/ 産科医と連携</td>
                  </tr>
                  <tr>
                    <td>バイオフィードバック</td>
                    <td>
                      ✅ <strong>第一選択の非薬物療法</strong>として最優先
                    </td>
                  </tr>
                  <tr>
                    <td>徒手療法</td>
                    <td>⚠️ 仰臥位での子宮圧迫を避ける / 腰椎への圧迫は注意</td>
                  </tr>
                  <tr>
                    <td>鍼療法</td>
                    <td>⚠️ 禁忌ツボ（LI4 合谷・SP6 三陰交）を厳守</td>
                  </tr>
                  <tr>
                    <td>温熱療法</td>
                    <td>⚠️ 体温上昇（&gt; 38.9°C）を回避 / 全身温浴・サウナは禁忌</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3>10.3 高齢者（&gt; 65 歳）</h3>
            <div className="tbl">
              <table>
                <thead>
                  <tr>
                    <th>モダリティ</th>
                    <th>推奨・注意事項</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>有酸素運動</td>
                    <td>✅ 低強度（HRmax 50–60%）から開始 / 転倒リスク評価を先行</td>
                  </tr>
                  <tr>
                    <td>徒手療法</td>
                    <td>⚠️ 骨粗鬆症の評価が必須 / HVLA は原則回避</td>
                  </tr>
                  <tr>
                    <td>TENS</td>
                    <td>✅ 比較的安全 / ペースメーカー・植込み型機器装着者は絶対禁忌</td>
                  </tr>
                  <tr>
                    <td>バランス訓練</td>
                    <td>✅ 前庭機能・固有感覚トレーニングを追加</td>
                  </tr>
                  <tr>
                    <td>認知機能評価</td>
                    <td>✅ MoCA 等で評価後にプログラム設定</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3>10.4 薬物過用性頭痛（MOH）からの回復期</h3>
            <div className="tbl">
              <table>
                <thead>
                  <tr>
                    <th>段階</th>
                    <th>PT の役割</th>
                    <th>注意点</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>過用薬物中断期（1–2 週）</td>
                    <td>⚠️ 離脱症状のモニタリング / 支持的ケアのみ</td>
                    <td>急性痛の増悪が一時的に起こりうる</td>
                  </tr>
                  <tr>
                    <td>回復初期（2–8 週）</td>
                    <td>✅ バイオフィードバック・リラクゼーション優先</td>
                    <td>依存衝動への行動支援</td>
                  </tr>
                  <tr>
                    <td>安定期（8 週–）</td>
                    <td>✅ 有酸素運動・徒手療法・完全な PT プログラム</td>
                    <td>全モダリティの段階的導入</td>
                  </tr>
                  <tr>
                    <td>再発予防（長期）</td>
                    <td>✅ 薬物使用日数の継続モニタリング教育</td>
                    <td>頭痛日誌を永続的に継続</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* ============================================================ SECTION 11 */}
          <section id="s11" className="sec">
            <div className="sec-hd">
              <div className="sec-num">11</div>
              <h2 className="sec-title">マルチモーダル統合アプローチ</h2>
            </div>
            <div className="mmd">
              <div className="mmd-lbl">フローチャート — 慢性／高頻度頭痛への統合アプローチ</div>
              <MermaidDiagram
                themeVariables={PT_MERMAID_THEME}
                chart={`flowchart TD
CORE["慢性片頭痛 / 高頻度頭痛\\n包括的マルチモーダルアプローチ"]

CORE --> PHARMA["💊 薬物療法"]
CORE --> PT["🏃 理学療法"]
CORE --> PSYCH["🧠 心理・行動療法"]
CORE --> NUTR["🌿 栄養・サプリメント"]
CORE --> LIFE["⏰ ライフスタイル管理"]

PHARMA --> P1["急性期: トリプタン / ゲパント\\nGrade A"]
PHARMA --> P2["予防: β遮断薬 / CGRP mAbs\\nGrade A"]

PT --> PT1["有酸素運動 Grade B"]
PT --> PT2["バイオフィードバック Grade A"]
PT --> PT3["徒手療法 Grade B"]

PSYCH --> PS1["認知行動療法（CBT）Grade B"]
PSYCH --> PS3["ストレス管理 Grade B"]

NUTR --> N1["マグネシウム 400–600 mg/日\\nGrade A（AAN/EHF 推奨）"]
NUTR --> N2["リボフラビン（B2）400 mg/日\\nGrade B"]
NUTR --> N3["CoQ10 300 mg/日\\nGrade B"]

LIFE --> L1["睡眠衛生 7–8 時間"]
LIFE --> L2["水分補給 1.5–2L/日"]
LIFE --> L3["食事トリガー管理"]

PT1 & PS3 & N1 & L1 --> SYNERGY["✨ 相乗効果（Synergistic Effect）\\n単剤アプローチより優れた転帰\\n頭痛頻度 ≥ 50% 減少の達成"]

style CORE fill:#2C3E50,color:#fff
style SYNERGY fill:#F39C12,color:#fff`}
              />
            </div>

            {/* ⚠️ 見出し階層段飛ばし解消: セクション s11 で h2 の直下に h3 が来ていたため、移行先でも h3 のままとする */}
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
                    <td>薬物 + PT vs 薬物単独</td>
                    <td>頭痛頻度 30–40% の追加減少</td>
                    <td>
                      <span className="bB">B</span>
                    </td>
                  </tr>
                  <tr>
                    <td>バイオフィードバック + 薬物 vs 薬物単独</td>
                    <td>薬物使用量の有意な減少</td>
                    <td>
                      <span className="bA">A</span>
                    </td>
                  </tr>
                  <tr>
                    <td>有酸素運動 + トピラマート vs 単独</td>
                    <td>同等以上の予防効果・副作用減少</td>
                    <td>
                      <span className="bB">B</span>
                    </td>
                  </tr>
                  <tr>
                    <td>CBT + 薬物 vs 薬物単独</td>
                    <td>再発防止・QOL 改善</td>
                    <td>
                      <span className="bB">B</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="src-grid">
              <div className="src">
                <div className="src-org">JAMA 2001</div>
                <div className="src-t">慢性 TTH — 三環系＋ストレス管理 RCT</div>
                <Ext className="src-url" href="https://pubmed.ncbi.nlm.nih.gov/11325323/">
                  pubmed.ncbi.nlm.nih.gov/11325323
                </Ext>
              </div>
            </div>
          </section>

          {/* ============================================================ SECTION 12 */}
          <section id="s12" className="sec">
            <div className="sec-hd">
              <div className="sec-num">12</div>
              <h2 className="sec-title">アウトカム評価ツール</h2>
            </div>
            <h3>12.1 主要評価ツール一覧</h3>
            <div className="tbl">
              <table>
                <thead>
                  <tr>
                    <th>ツール</th>
                    <th>評価内容</th>
                    <th>スコア解釈</th>
                    <th>実施タイミング</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <strong>HIT-6</strong>
                    </td>
                    <td>頭痛による日常生活への影響</td>
                    <td>≥60 重篤 / 50–59 実質的 / 36–49 中等度 / &lt;36 軽微</td>
                    <td>開始時 / 3 ヶ月ごと</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>MIDAS</strong>
                    </td>
                    <td>仕事・家事・社会活動 of 損失日数（3ヶ月）</td>
                    <td>≥21 GradeIV / 11–20 III / 6–10 II / 0–5 I</td>
                    <td>開始時 / 3 ヶ月ごと</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>VAS / NRS</strong>
                    </td>
                    <td>疼痛強度（0–10）</td>
                    <td>0 無痛 / 1–3 軽度 / 4–6 中等度 / 7–10 重篤</td>
                    <td>毎回の治療前後</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>PGIC</strong>
                    </td>
                    <td>患者の全体的改善印象</td>
                    <td>7段階（著明改善→著明悪化）</td>
                    <td>8 週後 / 治療終了時</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>MSQ v2.1</strong>
                    </td>
                    <td>片頭痛特異的 QOL（4 ドメイン）</td>
                    <td>0–100（高値＝良好）</td>
                    <td>開始時 / 3 ヶ月ごと</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>頭痛日誌</strong>
                    </td>
                    <td>頻度・強度・持続・トリガー・薬物</td>
                    <td>月次で集計・グラフ化</td>
                    <td>毎日継続</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <h3>12.2 Evidence-Based 治療目標</h3>
            <div className="tbl">
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
                    <td>HIT-6 スコア</td>
                    <td>≥ 6 点改善（MCID）</td>
                    <td>&lt; 50 点（正常域）</td>
                  </tr>
                  <tr>
                    <td>MIDAS スコア</td>
                    <td>グレード 1 段階以上の改善</td>
                    <td>Grade I / II への移行</td>
                  </tr>
                  <tr>
                    <td>薬物使用日数</td>
                    <td>MOH 閾値以下（&lt; 8–10 日/月）</td>
                    <td>≤ 4 日/月</td>
                  </tr>
                  <tr>
                    <td>VAS ピーク強度</td>
                    <td>≥ 30% 低下</td>
                    <td>≥ 50% 低下</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="src-grid">
              <div className="src">
                <div className="src-org">Qual Life Res 2003</div>
                <div className="src-t">HIT-6 の MCID 検証</div>
                <Ext className="src-url" href="https://pubmed.ncbi.nlm.nih.gov/12789668/">
                  pubmed.ncbi.nlm.nih.gov/12789668
                </Ext>
              </div>
            </div>
          </section>

          {/* ============================================================ SECTION 13 */}
          <section id="s13" className="sec">
            <div className="sec-hd">
              <div className="sec-num">13</div>
              <h2 className="sec-title">患者教育・セルフケアプログラム</h2>
            </div>

            <h3>13.1 頭痛日誌の使い方</h3>
            <p>
              頭痛日誌は、治療介入前の <strong>30 日間ベースライン</strong>
              の客観的確立、トリガーパターンの同定、薬物使用日数のモニタリング（MOH
              の早期発見）に不可欠です。
            </p>
            <div className="tbl">
              <table>
                <thead>
                  <tr>
                    <th>記録項目</th>
                    <th>記録内容</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>発症日時</td>
                    <td>発症時刻・終了時刻・持続時間</td>
                  </tr>
                  <tr>
                    <td>痛みの強度</td>
                    <td>VAS / NRS 0–10（発症時・ピーク・2時間後）</td>
                  </tr>
                  <tr>
                    <td>痛みの部位</td>
                    <td>左/右/両側/前頭/後頭/こめかみ</td>
                  </tr>
                  <tr>
                    <td>痛みの性質</td>
                    <td>拍動性 / 圧迫感 / 刺すような</td>
                  </tr>
                  <tr>
                    <td>随伴症状</td>
                    <td>悪心・嘔吐・光過敏・音過敏・前兆</td>
                  </tr>
                  <tr>
                    <td>推定トリガー</td>
                    <td>食事・睡眠変化・ストレス・天気・月経</td>
                  </tr>
                  <tr>
                    <td>使用薬物</td>
                    <td>薬剤名・用量・使用時刻・効果（0–10）</td>
                  </tr>
                  <tr>
                    <td>日常活動への影響</td>
                    <td>仕事・家事・社会活動の支障度</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="alert a-info">
              <div className="alert-i">📱</div>
              <div>
                推奨デジタルツール: <strong>Migraine Buddy</strong>（頭痛専用 iOS/Android アプリ）、
                <strong>N1-Headache</strong>（機械学習によるトリガー分析）
              </div>
            </div>

            <h3>13.2 腹式呼吸法（4-7-8 法）— 副交感神経賦活</h3>
            <p>
              腹式呼吸は迷走神経（副交感神経）を賦活し、頭痛の誘発因子となる交感神経過活動を直接抑制します。
            </p>
            <div className="steps">
              <div className="step">
                <div className="step-t">姿勢をとる</div>
                <div className="step-d">仰臥位または椅座位でリラックスした姿勢をとる。</div>
              </div>
              <div className="step">
                <div className="step-t">4 秒で吸う</div>
                <div className="step-d">
                  鼻から 4 秒かけてゆっくり息を吸う（腹部を膨らませる）。
                </div>
              </div>
              <div className="step">
                <div className="step-t">7 秒止める</div>
                <div className="step-d">息を止めて 7 秒間保持する。</div>
              </div>
              <div className="step">
                <div className="step-t">8 秒で吐く</div>
                <div className="step-d">
                  口から 8 秒かけてゆっくり息を吐く（腹部をへこませる）。
                </div>
              </div>
              <div className="step">
                <div className="step-t">4 サイクル繰り返す</div>
                <div className="step-d">
                  これを 1 サイクルとして 4 サイクル。1 日 2 回（朝＋就寝前）毎日継続。
                </div>
              </div>
            </div>

            <h3>13.3 段階的セルフケア（患者向け 5 ステップ）</h3>
            <div className="mmd">
              <div className="mmd-lbl">フローチャート — 患者向けセルフケア 5 ステップ</div>
              <MermaidDiagram
                themeVariables={PT_MERMAID_THEME}
                chart={`flowchart TD
S1["① 頭痛日誌を開始\\n最低 30 日間のベースライン収集"]
S2["② 主要トリガーを 2–3 個同定\\n排除または管理戦略を立てる"]
S3["③ 生活リズムの確立\\n規則的な睡眠・欠食なし・水分 1.5–2L/日"]
S4["④ 有酸素運動の習慣化\\n週 3 回（ウォーキング 20 分から開始）"]
S5["⑤ リラクゼーションの実践\\n腹式呼吸・PMR を毎日 15–20 分"]

S1 --> S2 --> S3 --> S4 --> S5

style S1 fill:#fff3e0,stroke:#f57c00
style S5 fill:#1E8449,color:#fff`}
              />
            </div>
          </section>

          {/* ============================================================ SECTION 14 */}
          <section id="s14" className="sec">
            <div className="sec-hd">
              <div className="sec-num">14</div>
              <h2 className="sec-title">禁忌・注意事項・安全管理</h2>
            </div>

            <h3>14.1 頸椎徒手療法（特に HVLA）の禁忌</h3>
            <div className="tbl th-red">
              <table>
                <thead>
                  <tr>
                    <th>カテゴリ</th>
                    <th>具体的禁忌</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <strong className="tR">絶対禁忌 ⛔</strong>
                    </td>
                    <td>椎骨動脈解離（VAD）の疑いまたは確定診断</td>
                  </tr>
                  <tr>
                    <td>
                      <strong className="tR">絶対禁忌 ⛔</strong>
                    </td>
                    <td>脊髄症（myelopathy）/ 頸椎骨折・脱臼</td>
                  </tr>
                  <tr>
                    <td>
                      <strong className="tR">絶対禁忌 ⛔</strong>
                    </td>
                    <td>頸椎腫瘍（原発性・転移性）</td>
                  </tr>
                  <tr>
                    <td>
                      <strong className="tR">絶対禁忌 ⛔</strong>
                    </td>
                    <td>頸椎手術後早期（術後 3–6 ヶ月 / 医師の許可まで）</td>
                  </tr>
                  <tr>
                    <td>
                      <strong className="tO">相対禁忌 ⚠️</strong>
                    </td>
                    <td>重度骨粗鬆症（T スコア &lt; −2.5）</td>
                  </tr>
                  <tr>
                    <td>
                      <strong className="tO">相対禁忌 ⚠️</strong>
                    </td>
                    <td>リウマチ性関節炎（C1–C2 不安定性）</td>
                  </tr>
                  <tr>
                    <td>
                      <strong className="tO">相対禁忌 ⚠️</strong>
                    </td>
                    <td>大量抗凝固薬使用 / 凝固障害</td>
                  </tr>
                  <tr>
                    <td>要確認</td>
                    <td>椎骨動脈検査（VAT）を HVLA 前に必ず実施</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="alert a-danger">
              <div className="alert-i">🧠</div>
              <div>
                <strong>頸椎マニピュレーションと脳卒中リスク:</strong> HVLA
                後の椎骨動脈解離（VAD）は稀ですが報告されています（推定頻度: 約
                1/100万回）。リスク最小化のため HVLA 前に必ず
                <strong>椎骨動脈スクリーニングテスト</strong>を実施してください。
              </div>
            </div>

            <h3>14.2 有酸素運動の禁忌・注意事項</h3>
            <div className="tbl th-orange">
              <table>
                <thead>
                  <tr>
                    <th>状態</th>
                    <th>対応</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>急性片頭痛発作中</td>
                    <td>⚠️ 激しい運動は症状悪化の可能性 / 軽歩行は許容</td>
                  </tr>
                  <tr>
                    <td>未治療・管理不十分な心血管疾患</td>
                    <td>⛔ 循環器内科の評価・許可を得てから開始</td>
                  </tr>
                  <tr>
                    <td>重篤な貧血（Hb &lt; 8 g/dL）</td>
                    <td>⚠️ 貧血自体が頭痛の原因となりうる / 補正後に開始</td>
                  </tr>
                  <tr>
                    <td>重篤な起立性低血圧</td>
                    <td>⚠️ 段階的な強度増加・監視下での実施</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3>14.3 TENS の禁忌</h3>
            <div className="tbl th-orange">
              <table>
                <thead>
                  <tr>
                    <th>禁忌</th>
                    <th>内容</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>心臓ペースメーカー装着</td>
                    <td>電気干渉による誤作動リスク</td>
                  </tr>
                  <tr>
                    <td>妊娠（腹部・腰部への使用）</td>
                    <td>子宮収縮誘発の懸念</td>
                  </tr>
                  <tr>
                    <td>皮膚感覚障害部位への貼付</td>
                    <td>熱傷・電気損傷リスク</td>
                  </tr>
                  <tr>
                    <td>活動性皮膚炎・皮膚病変部</td>
                    <td>電極貼付不可</td>
                  </tr>
                  <tr>
                    <td>てんかん（頭部近傍への使用）</td>
                    <td>発作誘発リスク</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* ============================================================ SECTION 15 */}
          <section id="s15" className="sec">
            <div className="sec-hd">
              <div className="sec-num">15</div>
              <h2 className="sec-title">参考文献・エビデンスソース一覧</h2>
            </div>

            <p className="src-sep">🏛️ 国際診断基準</p>
            <div className="src-grid">
              <div className="src">
                <div className="src-org">IHS / ICHD-3</div>
                <div className="src-t">ICHD-3 公式サイト（全文閲覧可）</div>
                <Ext className="src-url" href="https://ichd-3.org/">
                  ichd-3.org
                </Ext>
              </div>
              <div className="src">
                <div className="src-org">IHS / ICHD-3</div>
                <div className="src-t">ICHD-3 全文 PDF（2018年版）</div>
                <Ext
                  className="src-url"
                  href="https://ichd-3.org/wp-content/uploads/2018/01/The-International-Classification-of-Headache-Disorders-3rd-Edition-2018.pdf"
                >
                  ichd-3.org/…ICHD-3rd-Edition-2018.pdf
                </Ext>
              </div>
              <div className="src">
                <div className="src-org">IHS</div>
                <div className="src-t">分類委員会（ICHD-4 最新動向含む）</div>
                <Ext
                  className="src-url"
                  href="https://ihs-headache.org/en/about-ihs/standing-committees/classification/"
                >
                  ihs-headache.org/…/classification
                </Ext>
              </div>
            </div>

            <p className="src-sep">📋 臨床ガイドライン</p>
            <div className="src-grid">
              <div className="src">
                <div className="src-org">AAN</div>
                <div className="src-t">ガイドライン一覧（頭痛）</div>
                <Ext className="src-url" href="https://www.aan.com/guidelines/">
                  aan.com/guidelines
                </Ext>
              </div>
              <div className="src">
                <div className="src-org">AAN 2012</div>
                <div className="src-t">行動・理学療法ガイドライン</div>
                <Ext
                  className="src-url"
                  href="https://www.aan.com/guidelines/home/getguidelinecontent/383"
                >
                  aan.com/…getguidelinecontent/383
                </Ext>
              </div>
              <div className="src">
                <div className="src-org">EHF 2022</div>
                <div className="src-t">CGRP mAbs 予防療法ガイドライン</div>
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
                <div className="src-org">IHS 2024 / Cephalalgia</div>
                <div className="src-t">急性期治療推奨 2024</div>
                <Ext
                  className="src-url"
                  href="https://journals.sagepub.com/doi/10.1177/03331024241252666"
                >
                  journals.sagepub.com/…03331024241252666
                </Ext>
              </div>
            </div>

            <p className="src-sep">🔬 Cochrane エビデンスレビュー</p>
            <div className="src-grid">
              <div className="src">
                <div className="src-org">Cochrane 2016</div>
                <div className="src-t">鍼療法 — 片頭痛予防（Linde et al.）</div>
                <Ext
                  className="src-url"
                  href="https://www.cochranelibrary.com/cdsr/doi/10.1002/14651858.CD001218.pub3"
                >
                  …CD001218.pub3
                </Ext>
              </div>
              <div className="src">
                <div className="src-org">Cochrane 2016</div>
                <div className="src-t">鍼療法 — 緊張型頭痛予防（Linde et al.）</div>
                <Ext
                  className="src-url"
                  href="https://www.cochranelibrary.com/cdsr/doi/10.1002/14651858.CD007587.pub2"
                >
                  …CD007587.pub2
                </Ext>
              </div>
              <div className="src">
                <div className="src-org">Cochrane</div>
                <div className="src-t">心理療法（CBT/バイオフィードバック）— 片頭痛予防</div>
                <Ext
                  className="src-url"
                  href="https://www.cochranelibrary.com/cdsr/doi/10.1002/14651858.CD012295.pub2"
                >
                  …CD012295.pub2
                </Ext>
              </div>
              <div className="src">
                <div className="src-org">Cochrane 2025</div>
                <div className="src-t">マグネシウム補充 — 片頭痛予防（最新）</div>
                <Ext
                  className="src-url"
                  href="https://www.cochranelibrary.com/cdsr/doi/10.1002/14651858.CD016307"
                >
                  …CD016307
                </Ext>
              </div>
              <div className="src">
                <div className="src-org">Cochrane 2015</div>
                <div className="src-t">頸椎徒手療法 — 頸痛・関連頭痛（Gross et al.）</div>
                <Ext
                  className="src-url"
                  href="https://www.cochranelibrary.com/cdsr/doi/10.1002/14651858.CD004249.pub4"
                >
                  …CD004249.pub4
                </Ext>
              </div>
              <div className="src">
                <div className="src-org">Cochrane</div>
                <div className="src-t">頭痛・片頭痛 全レビュー検索</div>
                <Ext
                  className="src-url"
                  href="https://www.cochranelibrary.com/search?query=headache+migraine&searchBy=3&type=cdsr"
                >
                  cochranelibrary.com/…headache+migraine
                </Ext>
              </div>
            </div>

            <p className="src-sep">📄 主要原著論文（PubMed）</p>
            <div className="src-grid">
              <div className="src">
                <div className="src-org">Spine 2002</div>
                <div className="src-t">Jull G, et al. 頸因性頭痛 徒手＋運動療法 RCT</div>
                <Ext className="src-url" href="https://pubmed.ncbi.nlm.nih.gov/12529905/">
                  pubmed.ncbi.nlm.nih.gov/12529905
                </Ext>
              </div>
              <div className="src">
                <div className="src-org">Cephalalgia 2011</div>
                <div className="src-t">
                  Varkey E, et al. 運動 vs トピラマート vs リラクゼーション
                </div>
                <Ext
                  className="src-url"
                  href="https://journals.sagepub.com/doi/10.1177/0333102411412385"
                >
                  journals.sagepub.com/…0333102411412385
                </Ext>
              </div>
              <div className="src">
                <div className="src-org">Pain 2007</div>
                <div className="src-t">
                  Nestoriuc Y & Martin A. 片頭痛バイオフィードバック メタ解析
                </div>
                <Ext className="src-url" href="https://pubmed.ncbi.nlm.nih.gov/17097218/">
                  pubmed.ncbi.nlm.nih.gov/17097218
                </Ext>
              </div>
              <div className="src">
                <div className="src-org">J Consult Clin Psychol 2008</div>
                <div className="src-t">
                  Nestoriuc Y, et al. 緊張型頭痛バイオフィードバック メタ解析
                </div>
                <Ext className="src-url" href="https://pubmed.ncbi.nlm.nih.gov/18426234/">
                  pubmed.ncbi.nlm.nih.gov/18426234
                </Ext>
              </div>
              <div className="src">
                <div className="src-org">Int J Sports Med 2011</div>
                <div className="src-t">Darabaneanu S, et al. 有酸素運動と片頭痛</div>
                <Ext className="src-url" href="https://pubmed.ncbi.nlm.nih.gov/21328195/">
                  pubmed.ncbi.nlm.nih.gov/21328195
                </Ext>
              </div>
            </div>
          </section>
        </main>
      </div>

      {/* FOOTER */}
      <footer className="footer">
        <strong>頭痛に対する理学療法 完全ガイド</strong> — 国際エビデンス（ICHD-3 / AAN / EHF / IHS
        2024 / NICE CG150 / Cochrane）に基づく
        <br />📅 作成年: 2026年 | 次回レビュー推奨: ICHD-4 正式発行時・AAN/IHS
        年次ガイドライン更新時
        <br />
        ⚠️
        本資料は学術・教育・研究目的のみを対象としています。臨床への適用は必ず資格を持つ医療専門家の監督のもとで行ってください。
      </footer>
    </div>
  );
}
