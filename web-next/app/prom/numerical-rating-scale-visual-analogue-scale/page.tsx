import AutoGlossary from "@/components/glossary/AutoGlossary";
import "./numerical-rating-scale-visual-analogue-scale.css";
import { Ext } from "@/components/Ext";
import MermaidDiagram from "@/components/MermaidDiagram";
import NumericalRatingScaleVisualAnalogueScaleSidebar from "@/components/prom/NumericalRatingScaleVisualAnalogueScaleSidebar";

const VNS_MERMAID_THEME = {
  primaryColor: "#f1d2d2",
  primaryTextColor: "#14532d",
  primaryBorderColor: "#b45309",
  lineColor: "#546e7a",
  secondaryColor: "#e0f2f1",
  tertiaryColor: "#e8f5e9",
  edgeLabelBackground: "#ffffff",
  fontSize: "13px",
};

export default function NumericalRatingScaleVisualAnalogueScalePage() {
  return (
    <div className="nrs-vas-accent">
      {/* HERO */}
      <div className="hero">
        <div>📏</div>
        <h1>VAS / NRS（視覚的アナログスケール / 数値評価スケール）</h1>
        <p className="hero-sub">
          疼痛強度評価の理論・実践・頭痛医学への応用 — 初学者向けステップバイステップ
        </p>
        <div className="hero-tags">
          <span className="hero-tag">IASP</span>
          <span className="hero-tag">IHS</span>
          <span className="hero-tag">FDA PRO</span>
          <span className="hero-tag">ICHD-3</span>
          <span className="hero-tag">MCID</span>
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
        <NumericalRatingScaleVisualAnalogueScaleSidebar />

        {/* MAIN CONTENT */}
        <main className="main">
          <AutoGlossary>
            {/* ====================================================== SECTION 1 */}
            <section id="s1" className="sec">
              <div className="sec-hd">
                <div className="sec-num">1</div>
                <h2 className="sec-title">はじめに — なぜ疼痛を「測定」するのか</h2>
              </div>

              <h3>1.1 疼痛評価の意義</h3>
              <p>
                疼痛（Pain）は、
                <strong>
                  国際疼痛学会（IASP: International Association for the Study of Pain）
                </strong>{" "}
                が 2020 年に改訂した定義によれば、本質的に<strong>主観的（subjective）</strong>
                かつ多次元的な現象です。
              </p>

              <div className="alert a-info">
                <div className="alert-i">📖</div>
                <div>
                  「実際のまたは潜在的な組織損傷に伴う、またはそれに類似した、不快な感覚的・情動的経験」
                  <br />
                  <span style={{ fontSize: 12, color: "var(--g6)" }}>
                    — Raja SN, et al. <em>Pain</em>. 2020;161(9):1976–1982.
                  </span>
                </div>
              </div>

              <p>
                「痛みは測定できない」という直感を超えて、疼痛を定量化することは Evidence-Based
                Medicine（EBM）の礎石であり、以下の目的のために不可欠です。
              </p>

              <div className="tbl">
                <table>
                  <thead>
                    <tr>
                      <th>目的</th>
                      <th>内容</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <strong>診断支援</strong>
                      </td>
                      <td>疼痛特性の客観的記録（ICHD-3 診断基準への組み込み）</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>治療効果判定</strong>
                      </td>
                      <td>ベースラインとの比較による奏効評価（MCID の達成確認）</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>臨床試験エンドポイント</strong>
                      </td>
                      <td>FDA・EMA が求める PRO（患者報告アウトカム）の根幹</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>多施設間比較</strong>
                      </td>
                      <td>標準化されたスケールによる国際的データ比較</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>MOH リスク監視</strong>
                      </td>
                      <td>急性期薬剤の使用頻度と疼痛強度の経時的記録</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>治療継続の根拠形成</strong>
                      </td>
                      <td>CGRP mAb 等の高額治療の継続適応評価</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <h3>1.2 疼痛の多次元性と測定スケールの役割</h3>
              <p>
                VAS / NRS が測定する「疼痛強度（pain
                intensity）」は疼痛の一側面に過ぎません。疼痛の多次元的構造と各評価指標の対応関係を以下に示します。
              </p>

              <div className="mmd">
                <div className="mmd-lbl">概念図 — 疼痛の多次元構造と評価指標の対応</div>
                <MermaidDiagram
                  themeVariables={VNS_MERMAID_THEME}
                  chart={`graph TD
A["疼痛<br>Pain"] --> B["感覚的側面<br>Sensory Dimension<br>（強度・性質・部位）"]
A --> C["情動的側面<br>Affective Dimension<br>（苦痛・不安・抑うつ）"]
A --> D["認認知側面的側面<br>Cognitive Dimension<br>（意味づけ・破局的思考）"]
A --> E["行動的側面<br>Behavioral Dimension<br>（回避行動・機能障害）"]
B --> F["🎯 VAS / NRS<br>疼痛強度を定量化<br>（本ガイドの主題）"]
C --> G["PGIC<br>患者全般改善度"]
D --> H["PHQ-9 / GAD-7<br>うつ・不安スクリーニング"]
E --> I["HIT-6 / MIDAS<br>機能障害・障害評価"]
style F fill:#fff3e0,stroke:#FF9800,stroke-width:2px
style A fill:#e3f2fd,stroke:#1565C0`}
                />
              </div>
            </section>

            {/* ====================================================== SECTION 2 */}
            <section id="s2" className="sec">
              <div className="sec-hd">
                <div className="sec-num">2</div>
                <h2 className="sec-title">歴史的背景</h2>
              </div>

              <h3>2.1 VAS の起源 — Huskisson (1974)</h3>
              <p>
                疼痛評価への VAS の体系的導入は、英国のリウマチ科医 <strong>E.C. Huskisson</strong>{" "}
                が 1974 年 <em>The Lancet</em> に発表した論文に端を発します。この論文で Huskisson
                は、当時の疼痛測定法と比較して VAS が
                <strong>最も感度の高い（most sensitive）</strong>
                疼痛測定法であると結論づけました。
              </p>
              <div className="alert a-info">
                <div className="alert-i">📚</div>
                <div>
                  Huskisson EC. Measurement of pain. <em>The Lancet</em>. 1974;2(7889):1127–1131.
                  <br />
                  <span style={{ fontSize: 12, color: "var(--g6)" }}>
                    線的アナログスケールの概念自体は Aitken（1969）の気分評価研究や Clarke &
                    Spear（1964）の精神医学的研究に源流があります。
                  </span>
                </div>
              </div>

              <h3>2.2 NRS の確立 — Jensen, Karoly & Braver (1986)</h3>
              <p>
                慢性疼痛患者 75 名を対象に 6 種のスケールを比較し、
                <strong>101 点 NRS（0〜100）が最も実用的な指標</strong>
                であることを示した比較研究の基盤です。
              </p>
              <div className="alert a-info">
                <div className="alert-i">📚</div>
                <div>
                  Jensen MP, Karoly P, Braver S. The measurement of clinical pain intensity: a
                  comparison of six methods. <em>Pain</em>. 1986;27(1):117–126.
                </div>
              </div>

              <h3>2.3 VAS の比率尺度特性の検証 — Price et al. (1983)</h3>
              <p>VAS が比率尺度（ratio scale）としての特性を有することを実証した基礎文献です。</p>
              <div className="alert a-info">
                <div className="alert-i">📚</div>
                <div>
                  Price DD, McGrath PA, Rafii A, Buckingham B. The validation of visual analogue
                  scales as ratio scale measures for chronic and experimental pain. <em>Pain</em>.
                  1983;17(1):45–56.
                </div>
              </div>

              <h3>2.4 慢性疼痛 MCID の里程碑 — Farrar et al. (2001)</h3>
              <p>
                10 のプレガバリン臨床試験データ（計 2,724 例）を統合解析し、NRS における{" "}
                <strong>MCID（最小臨床的重要差）</strong>
                を定量化した、慢性疼痛・頭痛研究の基盤となる研究（引用数 &gt; 5,000）です。
              </p>
              <div className="alert a-info">
                <div className="alert-i">📚</div>
                <div>
                  Farrar JT, Young JP Jr, LaMoreaux L, Werth JL, Poole RM. Clinical importance of
                  changes in chronic pain intensity measured on an 11-point numerical pain rating
                  scale. <em>Pain</em>. 2001;94(2):149–158.
                </div>
              </div>

              <h3>2.5 VAS MCID の急性疼痛での検証 — Gallagher et al. (2001)</h3>
              <p>救急外来での急性疼痛における VAS MCID を確立した重要研究です。</p>
              <div className="alert a-info">
                <div className="alert-i">📚</div>
                <div>
                  Gallagher EJ, Liebman M, Bijur PE. Prospective validation of clinically important
                  changes in pain severity measured on a visual analog scale. <em>Ann Emerg Med</em>
                  . 2001;38(6):633–638.
                </div>
              </div>
            </section>

            {/* ====================================================== SECTION 3 */}
            <section id="s3" className="sec">
              <div className="sec-hd">
                <div className="sec-num">3</div>
                <h2 className="sec-title">VAS — 視覚的アナログスケール（Visual Analogue Scale）</h2>
              </div>

              <h3>3.1 定義と構造</h3>
              <p>
                <strong>VAS（Visual Analogue Scale）</strong>は、両端にアンカー（錨点）が記された
                <strong>通常 100mm（10cm）の連続した水平または垂直の線分</strong>
                を用いて、患者が自らの疼痛強度を直感的に表現するスケールです。
              </p>

              <div className="tbl">
                <table>
                  <thead>
                    <tr>
                      <th>要素</th>
                      <th>仕様</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <strong>形式</strong>
                      </td>
                      <td>100mm 連続線分（水平方向が国際標準；垂直型も使用可）</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>左端アンカー（0mm）</strong>
                      </td>
                      <td>「全く痛みなし（No pain at all）」</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>右端アンカー（100mm）</strong>
                      </td>
                      <td>「想像しうる最悪の痛み（Worst pain imaginable）」</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>中間目盛り</strong>
                      </td>
                      <td>
                        原則として<strong>表示なし</strong>（連続スケールの特性を保つため）
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <strong>採点</strong>
                      </td>
                      <td>患者のマーク位置から左端までの距離を mm で計測</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>計測ツール</strong>
                      </td>
                      <td>ミリ定規（紙媒体）/ デジタルスコアリングシステム（電子版）</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="alert a-warn">
                <div className="alert-i">⚠️</div>
                <div>
                  <strong>重要：</strong>
                  中間に目盛りや数字を加えると連続スケールの特性が失われ、事実上 NRS
                  に変容します。IHS ガイドラインに準拠した研究では、
                  <strong>数字・目盛りなしの 100mm 線</strong>
                  のみを使用してください。
                </div>
              </div>

              <h3>3.2 VAS の実施手順（ステップバイステップ）</h3>
              <div className="mmd">
                <div className="mmd-lbl">フローチャート — VAS 実施の 6 ステップ</div>
                <MermaidDiagram
                  themeVariables={VNS_MERMAID_THEME}
                  chart={`flowchart TD
A(["VAS 実施開始"]) --> B["STEP 1：環境整備<br>・静かで明るい環境<br>・患者が集中できる状態<br>・評価中は医療者が誘導しない"]
B --> C["STEP 2：患者への説明（標準化テキスト）<br>「この直線は痛みの強さを表しています。<br>左端は全く痛みのない状態、右端はこれ以上<br>考えられないほどの最悪の痛みを表します。<br>今の痛みの強さに相当する位置に<br>縦線を引いてください」"]
C --> D["STEP 3：標準化された用紙を提示<br>・100mm 水平線<br>・アンカー文言を両端に明示<br>・数字・目盛りは非表示<br>・前回の記録は患者に見せない"]
D --> E["STEP 4：患者が自己マーキング<br>・現在の痛みの強さを表す点に<br>　縦線または印を記入<br>・時間制限なし（急かさない）"]
E --> F["STEP 5：計測<br>・左端から印までの距離をミリ定規で測定<br>・0〜100mm の整数値で記録"]
F --> G["STEP 6：記録<br>・測定値（mm）を記録<br>・評価時刻・評価状況<br>　（安静時 / 労作時 / 発作時）を付記"]
G --> H(["終了 / 次回評価へ"])
style A fill:#e3f2fd,stroke:#1565C0
style H fill:#c8e6c9,stroke:#1B5E20`}
                />
              </div>

              <h3>3.3 VAS スコアの解釈指針</h3>
              <div className="tbl">
                <table>
                  <thead>
                    <tr>
                      <th>VAS スコア（mm）</th>
                      <th>疼痛カテゴリー</th>
                      <th>臨床的意義</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <strong>0–4 mm</strong>
                      </td>
                      <td>無痛（None）</td>
                      <td>疼痛なし</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>5–44 mm</strong>
                      </td>
                      <td>軽度（Mild）</td>
                      <td>日常活動にほぼ支障なし</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>45–74 mm</strong>
                      </td>
                      <td>中等度（Moderate）</td>
                      <td>日常活動に支障あり</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>75–100 mm</strong>
                      </td>
                      <td>重度（Severe）</td>
                      <td>活動不能 / 安静が必要</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="alert a-info">
                <div className="alert-i">ℹ️</div>
                <div>
                  <strong>頭痛研究における標準的カットオフ：</strong>VAS
                  ≥45mm（中等度以上）で治療薬を投与することが IHS
                  の急性期試験ガイドラインの標準とされています。
                </div>
              </div>

              <h3>3.4 VAS の利点と限界</h3>
              <div className="tbl">
                <table>
                  <thead>
                    <tr>
                      <th>利点</th>
                      <th>限界</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>連続変量として高い統計解析感度</td>
                      <td>定規・計測器が必要（現場での煩雑さ）</td>
                    </tr>
                    <tr>
                      <td>言語的バリアが少ない</td>
                      <td>高齢者・認知機能低下患者には難しい</td>
                    </tr>
                    <tr>
                      <td>変化の検出感度（反応性）が高い</td>
                      <td>電話・音声によるリモート評価が困難</td>
                    </tr>
                    <tr>
                      <td>比率尺度特性を持つ（Price 1983）</td>
                      <td>理解不足によるアンカーへの集中（エンドスタッキング）</td>
                    </tr>
                    <tr>
                      <td>豊富な歴史的使用実績（1974 年〜）</td>
                      <td>採点の手間（mm 測定）</td>
                    </tr>
                    <tr>
                      <td>単語・数字不要で多言語対応</td>
                      <td>前回スコアの記憶による偏り（アンカリング効果）</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* ====================================================== SECTION 4 */}
            <section id="s4" className="sec">
              <div className="sec-hd">
                <div className="sec-num">4</div>
                <h2 className="sec-title">NRS — 数値評価スケール（Numerical Rating Scale）</h2>
              </div>

              <h3>4.1 定義と構造</h3>
              <p>
                <strong>NRS（Numerical Rating Scale）</strong>は、患者が自らの疼痛強度を{" "}
                <strong>0〜10（または 0〜100）の整数値</strong>
                で口頭または記述で表現するスケールです。臨床・研究の国際標準形 is{" "}
                <strong>NRS-11（0〜10 の 11 点尺度）</strong>です。
              </p>

              <div className="tbl">
                <table>
                  <thead>
                    <tr>
                      <th>要素</th>
                      <th>仕様</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <strong>形式</strong>
                      </td>
                      <td>0〜10 の 11 段階順序尺度（整数のみ）</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>0 の意味</strong>
                      </td>
                      <td>「痛みなし（No pain）」</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>10 の意味</strong>
                      </td>
                      <td>「想像しうる最悪の痛み（Worst possible pain）」</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>採点</strong>
                      </td>
                      <td>患者が選択した整数値をそのまま記録</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>実施方法</strong>
                      </td>
                      <td>口頭・紙媒体・電子 PRO（ePRO）・電話すべてに対応</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <h3>4.2 NRS の実施手順（ステップバイステップ）</h3>
              <div className="mmd">
                <div className="mmd-lbl">フローチャート — NRS 実施手順（評価形式の分岐つき）</div>
                <MermaidDiagram
                  themeVariables={VNS_MERMAID_THEME}
                  chart={`flowchart TD
A(["NRS 実施開始"]) --> B["STEP 1：評価形式の選択<br>口頭 / 紙媒体 / 電子 PRO<br>（患者の識字能力・認知機能・評価状況に応じて）"]
B --> C["STEP 2：患者への標準化説明<br>「0 から 10 の数字で今の痛みを教えてください。<br>0 は全く痛みがない状態、<br>10 はこれ以上考えられないほどの<br>最悪の痛みを表します。<br>今の痛みは何点ですか？」"]
C --> D{"評価形式は？"}
D -->|"口頭評価"| E["STEP 3a：口頭で整数を回答させる<br>（0, 1, 2...10 のみ）<br>小数・分数・範囲での回答は不可"]
D -->|"紙媒体・電子 PRO"| F["STEP 3b：用紙 / 端末上で<br>数字を選択・記入させる"]
E --> G["STEP 4：記録<br>・選択した整数（0〜10）を記録<br>・評価時刻・評価状況（安静時 / 発作時）<br>・推奨：発症時・ピーク時・治療 2 時間後の 3 点測定"]
F --> G
G --> H(["終了 / 次回評価へ"])
style A fill:#e3f2fd,stroke:#1565C0
style H fill:#c8e6c9,stroke:#1B5E20`}
                />
              </div>

              <h3>4.3 NRS スコアの解釈指針</h3>
              <div className="tbl">
                <table>
                  <thead>
                    <tr>
                      <th>NRS スコア（0〜10）</th>
                      <th>疼痛カテゴリー</th>
                      <th>臨床的意義</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <strong>0</strong>
                      </td>
                      <td>無痛（None）</td>
                      <td>疼痛なし</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>1–3</strong>
                      </td>
                      <td>軽度（Mild）</td>
                      <td>日常活動にほぼ支障なし</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>4–6</strong>
                      </td>
                      <td>中等度（Moderate）</td>
                      <td>日常活動に支障あり</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>7–10</strong>
                      </td>
                      <td>重度（Severe）</td>
                      <td>活動不能 / 安静が必要</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="alert a-info">
                <div className="alert-i">ℹ️</div>
                <div>
                  <strong>IHS 頭痛臨床試験標準：</strong>NRS
                  ≥4（中等度以上）の頭痛を対象として治療薬を投与することが IHS
                  の急性期試験ガイドラインの基準です。4 段階 VRS（0〜3）との対応は「軽度（NRS
                  1〜3）= VRS 1、中等度（NRS 4〜6）= VRS 2、重度（NRS 7〜10）= VRS
                  3」と近似されます。
                </div>
              </div>

              <h3>4.4 NRS の利点と限界</h3>
              <div className="tbl">
                <table>
                  <thead>
                    <tr>
                      <th>利点</th>
                      <th>限界</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>口頭・電話・電子 PRO への高い汎用性</td>
                      <td>離散値（整数のみ）のため統計感度は VAS より若干劣る</td>
                    </tr>
                    <tr>
                      <td>計測器不要で即時に記録可能</td>
                      <td>比率尺度特性が VAS より弱い（零点の解釈が不明確）</td>
                    </tr>
                    <tr>
                      <td>高齢者・認知機能低下患者にも適用しやすい</td>
                      <td>低疼痛域でスコアが人為的に高めになる傾向（エンドスタッキング）</td>
                    </tr>
                    <tr>
                      <td>遠隔診療・電話評価での使用可</td>
                      <td>文化・言語によって数値の解釈が異なる可能性</td>
                    </tr>
                    <tr>
                      <td>患者コンプライアンスが高い</td>
                      <td>「最悪の痛み（10 点）」の概念が文化的に異なりうる</td>
                    </tr>
                    <tr>
                      <td>多数の臨床試験エビデンス蓄積</td>
                      <td>整数のみ → 微細な変化の検出が VAS に比べ困難</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* ====================================================== SECTION 5 */}
            <section id="s5" className="sec">
              <div className="sec-hd">
                <div className="sec-num">5</div>
                <h2 className="sec-title">VRS — 言語評価スケール（Verbal Rating Scale）との比較</h2>
              </div>

              <p>
                <strong>VRS（Verbal Rating Scale）</strong>
                は、疼痛を言語カテゴリーで表現するスケールです。
              </p>

              <h3>5.1 代表的な VRS フォーマット</h3>
              <div className="tbl">
                <table>
                  <thead>
                    <tr>
                      <th>VRS 形式</th>
                      <th>カテゴリー</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <strong>4 段階 VRS（IHS 標準・旧来型）</strong>
                      </td>
                      <td>0 = なし / 1 = 軽度 / 2 = 中等度 / 3 = 重度</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>5 段階 VRS</strong>
                      </td>
                      <td>なし / 軽度 / 中等度 / 重度 / 激烈</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>6 段階 VRS</strong>
                      </td>
                      <td>なし / ごく軽度 / 軽度 / 中等度 / 重度 / 激烈</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="alert a-info">
                <div className="alert-i">🧠</div>
                <div>
                  <strong>頭痛医学での特記事項：</strong>IHS の旧来のガイドライン（第 1〜3
                  版）では、片頭痛急性期試験において <strong>4 段階 VRS（0〜3）</strong>
                  が主要エンドポイントの標準として使用されてきました（初期トリプタン試験の全てで使用）。現在の
                  IHS ガイドライン（2024 年版）では VRS・VAS・NRS
                  のいずれかの使用が認められており、NRS-11 の採用が増加しています。
                </div>
              </div>

              <h3>5.2 3 スケールの特性比較</h3>
              <div className="tbl">
                <table>
                  <thead>
                    <tr>
                      <th>特性</th>
                      <th>VAS（100mm）</th>
                      <th>NRS（0〜10）</th>
                      <th>VRS（4 段階）</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <strong>尺度水準</strong>
                      </td>
                      <td>比率尺度（支持される証拠あり）</td>
                      <td>順序〜区間尺度</td>
                      <td>順序尺度</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>変化検出感度</strong>
                      </td>
                      <td>◎ 最高</td>
                      <td>○ 高い</td>
                      <td>△ 限定的</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>遠隔評価適性</strong>
                      </td>
                      <td>× 困難</td>
                      <td>◎ 最高</td>
                      <td>○ 適切</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>高齢者への適用</strong>
                      </td>
                      <td>△ やや困難</td>
                      <td>○ 適切</td>
                      <td>◎ 最も簡便</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>臨床試験実績</strong>
                      </td>
                      <td>◎ 豊富</td>
                      <td>◎ 豊富</td>
                      <td>◎ 最も豊富（頭痛領域）</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>患者コンプライアンス</strong>
                      </td>
                      <td>△ やや低い</td>
                      <td>◎ 最高</td>
                      <td>◎ 高い</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>統計解析の柔軟性</strong>
                      </td>
                      <td>◎ 連続変量</td>
                      <td>○ 連続変量に近似</td>
                      <td>△ カテゴリカル</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>言語依存性</strong>
                      </td>
                      <td>低い</td>
                      <td>低い</td>
                      <td>高い</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* ====================================================== SECTION 6 */}
            <section id="s6" className="sec">
              <div className="sec-hd">
                <div className="sec-num">6</div>
                <h2 className="sec-title">VAS vs NRS — 直接比較と使い分け</h2>
              </div>

              <h3>6.1 系統的レビューのエビデンス</h3>
              <p>
                <strong>Hjermstad MJ, et al. (2011)</strong> による系統的レビュー（
                <em>J Pain Symptom Manage</em>, 41(6):1073–1093）は VAS・NRS・VRS
                を直接比較し、以下の結論を提示しました。
              </p>
              <div className="card">
                <ul>
                  <li>
                    <strong>NRS-11</strong> は 3
                    スケールの中で患者コンプライアンス・識別能・再現性の観点から
                    <strong>最も推奨される</strong>
                  </li>
                  <li>
                    VAS・NRS・VRS のスコア間には高い相関があるが、
                    <strong>高齢者（≥65 歳）では両スケールは互換的でない</strong>（後述）
                  </li>
                  <li>NRS-11 は電話・電子 PRO・対面すべての評価形式に対応でき、最も汎用性が高い</li>
                </ul>
              </div>

              <h3>6.2 頭痛特異的エビデンス</h3>
              <p>
                <strong>Loder & Burch (2012)</strong>（<em>Cephalalgia</em>,
                32(7):593–597）は、頭痛研究における疼痛測定の課題を詳細に分析しました。
              </p>
              <div className="card">
                <ul>
                  <li>
                    初期トリプタン試験（1990 年代）が確立した 4 段階 VRS の伝統とその利点・限界
                  </li>
                  <li>
                    VAS は紙媒体での実施・計測の煩雑さから、頭痛日誌への組み込みに実務的課題がある
                  </li>
                  <li>
                    <strong>NRS-11 の採用がゲパント・ジタン時代の試験で増加</strong>しており、IHS
                    も現在は容認
                  </li>
                </ul>
              </div>

              <h3>6.3 使い分けの実践的指針</h3>
              <div className="mmd">
                <div className="mmd-lbl">
                  フローチャート — 評価設定・患者特性に応じたスケール選択
                </div>
                <MermaidDiagram
                  themeVariables={VNS_MERMAID_THEME}
                  chart={`graph TD
A["疼痛評価スケールの選択"] --> B{"評価設定は？"}
B -->|"電話・遠隔診療"| C["NRS-11 を選択<br>（口頭で即座に回答可）<br>✅ 国際推奨"]
B -->|"電子 PRO・スマートフォン"| D["NRS または電子 VAS<br>（電子 VAS は 100mm アナログを再現可）<br>✅ FDA 推奨"]
B -->|"入院・外来・対面"| E{"患者の特性は？"}
E -->|"成人・認知機能正常"| F{"研究目的か？"}
E -->|"高齢者（≥65 歳）"| G["NRS または VRS（4 段階）を優先使用<br>（VAS は誤用リスク高い）<br>⚠️ 互換性に注意"]
E -->|"小児（8〜12 歳）"| H["Faces Pain Scale-Revised（FPS-R）<br>または NRS（11 歳以上）"]
E -->|"小児（&lt;8 歳）"| I["FLACC スケール<br>（行動観察型）"]
F -->|"臨床研究・RCT"| J["VAS（高感度な連続変量）<br>または NRS-11<br>IHS / FDA ガイドライン準拠"]
F -->|"日常臨床・頭痛日誌"| K["NRS-11<br>（簡便・即時・口頭対応）"]
style C fill:#e8f5e9,stroke:#2E7D32
style D fill:#e8f5e9,stroke:#2E7D32
style G fill:#fff9c4,stroke:#F9A825
style H fill:#fff9c4,stroke:#F9A825
style I fill:#ffcdd2,stroke:#C62828
style J fill:#e3f2fd,stroke:#1565C0
style K fill:#e8f5e9,stroke:#2E7D32`}
                />
              </div>
            </section>

            {/* ====================================================== SECTION 7 */}
            <section id="s7" className="sec">
              <div className="sec-hd">
                <div className="sec-num">7</div>
                <h2 className="sec-title">心理測定学的特性</h2>
              </div>

              <h3>7.1 信頼性（Reliability）</h3>
              <p>
                信頼性とは「同じ状況で同じ測定を繰り返したときに一貫した結果を得られるか」を示す指標です。
              </p>
              <div className="tbl">
                <table>
                  <thead>
                    <tr>
                      <th>信頼性の種類</th>
                      <th>VAS の実績</th>
                      <th>NRS の実績</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <strong>再テスト信頼性</strong>
                      </td>
                      <td>r = 0.80〜0.99（病態安定時）</td>
                      <td>r = 0.67〜0.96（病態安定時）</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>検者間信頼性</strong>
                      </td>
                      <td>高い（患者自己記入のため影響小）</td>
                      <td>高い（患者自己記入のため影響小）</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>内的一貫性</strong>
                      </td>
                      <td>単一項目のため非該当</td>
                      <td>単一項目のため非該当</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="alert a-warn">
                <div className="alert-i">⚠️</div>
                <div>
                  再テスト信頼性は「病態が変化していない期間」の測定を前提とします。頭痛研究では
                  <strong>片頭痛発作間欠期と発作期</strong>を明確に区別して記録することが必須です。
                </div>
              </div>

              <h3>7.2 妥当性（Validity）</h3>
              <h4>構成概念妥当性（Construct Validity）</h4>
              <ul>
                <li>
                  VAS 疼痛スコアは、5 段階言語スケールおよび NRS と高い相関を示す（r = 0.62〜0.91）
                </li>
                <li>
                  NRS は 4 段階 VRS・VAS との相関が確認されており、同一 of
                  疼痛構成概念を測定していると考えられる
                </li>
                <li>鎮痛薬投与・神経ブロック前後でのスコア低下が代理基準関連妥当性の根拠となる</li>
              </ul>
              <h4>基準関連妥当性（Criterion Validity）</h4>
              <p>
                疼痛の「ゴールドスタンダード」は存在しないため（痛みは主観的現象）、厳密な基準関連妥当性は原理的に評価不能です。これは
                VAS/NRS の限界ではなく、疼痛という現象の本質的特性です。
              </p>
              <h4>反応性（Responsiveness / 変化検出能）</h4>
              <ul>
                <li>VAS・NRS ともに治療前後の変化を検出する感度は十分に高い</li>
                <li>
                  NRS は離散値（整数のみ）のため、VAS
                  よりわずかに検出感度が低い可能性があるが、臨床的影響は限定的
                </li>
              </ul>

              <h3>7.3 COSMIN フレームワークによる評価</h3>
              <p>
                <strong>
                  COSMIN（COnsensus-based Standards for the selection of health Measurement
                  INstruments）
                </strong>
                に基づく系統的評価（Wertli et al., <em>Pain</em>, 2018）では：
              </p>
              <div className="card">
                <ul>
                  <li>
                    NRS の測定誤差に関する高品質エビデンス：<strong>「不十分」</strong>{" "}
                    ——「不十分」の意味は「測定誤差が小さい」ではなく「測定誤差の研究が不十分」であることに注意
                  </li>
                  <li>VAS の全測定特性：低〜超低品質のエビデンス（研究設計の問題）</li>
                  <li>
                    <strong>どちらが優れているかを明確に示すエビデンスは現時点では不十分</strong>
                  </li>
                </ul>
              </div>
              <div className="alert a-ok">
                <div className="alert-i">✅</div>
                <div>
                  <strong>実践的結論：</strong>COSMIN レビューの指摘にもかかわらず、VAS/NRS
                  は数十年の臨床使用実績・規制当局の承認・IHS ガイドラインへの組み込みから、
                  <strong>疼痛強度の国際標準的測定法として確立</strong>されています。
                </div>
              </div>
            </section>

            {/* ====================================================== SECTION 8 */}
            <section id="s8" className="sec">
              <div className="sec-hd">
                <div className="sec-num">8</div>
                <h2 className="sec-title">最小臨床的重要差（MCID）</h2>
              </div>

              <h3>8.1 MCID とは何か</h3>
              <p>
                <strong>MCID（Minimal Clinically Important Difference）</strong>
                は、患者が「本当に良くなった（または悪くなった）」と感じる最小限の変化量を定量化した値です。統計的有意差（p
                &lt; 0.05）が示されても、MCID
                を超えなければその変化は患者にとって意味がない可能性があります。
              </p>

              <div className="mmd">
                <div className="mmd-lbl">
                  フローチャート — 統計的有意差と臨床的意義（MCID）の関係
                </div>
                <MermaidDiagram
                  themeVariables={VNS_MERMAID_THEME}
                  chart={`flowchart LR
A["統計的有意差<br>（p &lt; 0.05）"] --> C{"MCID を<br>超えているか？"}
B["臨床的意義<br>（患者の実感）"] --> C
C -->|"Yes"| D["✅ 臨床的に意義ある改善<br>治療の有効性が実証された"]
C -->|"No — 統計的有意差あり<br>MCID 未達成"| E["⚠️ 統計的有意差のみ<br>患者は「良くなった」と感じていない可能性<br>治療の実臨床的価値に疑問"]
C -->|"No — どちらも未達成"| F["❌ 無効<br>治療プランの見直しが必要"]
style D fill:#c8e6c9,stroke:#1B5E20
style E fill:#fff9c4,stroke:#F9A825
style F fill:#ffcdd2,stroke:#C62828`}
                />
              </div>

              <h3>8.2 NRS における主要 MCID 参照値</h3>
              <div className="tbl">
                <table>
                  <thead>
                    <tr>
                      <th>研究 / 条件</th>
                      <th>MCID（絶対値）</th>
                      <th>MCID（% 変化）</th>
                      <th>アンカー指標</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <strong>Farrar et al. 2001（慢性疼痛）</strong>
                      </td>
                      <td>−2.0 点</td>
                      <td>−33%</td>
                      <td>PGIC「大幅改善」</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>Farrar et al. 2001（最小改善）</strong>
                      </td>
                      <td>−1.0〜−1.5 点</td>
                      <td>−15〜−20%</td>
                      <td>PGIC「わずかに改善」</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>Salaffi et al. 2004（慢性筋骨格痛）</strong>
                      </td>
                      <td>−1.74 点</td>
                      <td>約 30%</td>
                      <td>PGIC「最小改善」</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>頭痛神経ブロック研究（臨床基準）</strong>
                      </td>
                      <td>−2.0 点</td>
                      <td>—</td>
                      <td>臨床的意義基準</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <h3>8.3 VAS における主要 MCID 参照値</h3>
              <div className="tbl">
                <table>
                  <thead>
                    <tr>
                      <th>研究 / 条件</th>
                      <th>MCID（絶対値 mm）</th>
                      <th>MCID（% 変化）</th>
                      <th>アンカー指標</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <strong>Gallagher et al. 2001（急性疼痛）</strong>
                      </td>
                      <td>
                        <strong>−13mm</strong>
                      </td>
                      <td>—</td>
                      <td>臨床判断</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>慢性疼痛一般（複数研究）</strong>
                      </td>
                      <td>−10〜−15mm</td>
                      <td>−15〜−30%</td>
                      <td>PGIC「改善」</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>頭痛急性期試験（Pain Freedom 基準）</strong>
                      </td>
                      <td>−45mm（例：VAS 60 → 15）</td>
                      <td>≥50% 以上</td>
                      <td>「なし/軽度」への移行</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <h3>8.4 疼痛削減率の臨床的意義</h3>
              <div className="tbl">
                <table>
                  <thead>
                    <tr>
                      <th>削減率</th>
                      <th>意義</th>
                      <th>頭痛医学での位置づけ</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <strong>≥15% 削減</strong>
                      </td>
                      <td>最小限改善（MCID 下限）</td>
                      <td>—</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>≥30% 削減</strong>
                      </td>
                      <td>意味のある改善（standard responder）</td>
                      <td>NRS −2 点前後に相当</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>≥50% 削減</strong>
                      </td>
                      <td>優れた治療反応（50% レスポンダー）</td>
                      <td>CGRP mAb 試験の主要エンドポイント基準</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>100% 削減（NRS/VAS = 0）</strong>
                      </td>
                      <td>完全疼痛消失（Pain Freedom）</td>
                      <td>片頭痛急性期試験の重要エンドポイント</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <h3>8.5 NRS と VAS の近似換算</h3>
              <div className="alert a-warn">
                <div className="alert-i">⚠️</div>
                <div>
                  NRS × 10mm ≈ VAS mm という近似式が文献で用いられますが、これは
                  <strong>近似値</strong>
                  に過ぎず、特に高齢者集団では両スケールの互換性が低いため、個々の患者において一方のスケールから他方への直接換算は推奨されません。
                </div>
              </div>
              <div className="tbl">
                <table>
                  <thead>
                    <tr>
                      <th>NRS（0〜10）</th>
                      <th>VAS 近似値（mm）</th>
                      <th>疼痛カテゴリー</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>0</td>
                      <td>0 mm</td>
                      <td>無痛</td>
                    </tr>
                    <tr>
                      <td>1〜3</td>
                      <td>10〜30 mm</td>
                      <td>軽度</td>
                    </tr>
                    <tr>
                      <td>4〜6</td>
                      <td>40〜60 mm</td>
                      <td>中等度</td>
                    </tr>
                    <tr>
                      <td>7〜10</td>
                      <td>70〜100 mm</td>
                      <td>重度</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* ====================================================== SECTION 9 */}
            <section id="s9" className="sec">
              <div className="sec-hd">
                <div className="sec-num">9</div>
                <h2 className="sec-title">頭痛医学における VAS / NRS の応用</h2>
              </div>

              <h3>9.1 IHS 臨床試験ガイドラインにおける位置づけ</h3>
              <div className="alert a-info">
                <div className="alert-i">📖</div>
                <div>
                  「頭痛強度は 4 段階 VRS、100mm VAS、または 11 段階 NRS で測定すること」
                  <br />
                  <span style={{ fontSize: 12, color: "var(--g6)" }}>
                    — IHS Clinical Trials Standing Committee, <em>Cephalalgia</em>,
                    2024（片頭痛急性期臨床試験ガイドライン 第 4 版）
                  </span>
                </div>
              </div>
              <p>
                このガイドラインに基づき、片頭痛急性期試験では以下のエンドポイントが標準化されています。
              </p>
              <div className="tbl">
                <table>
                  <thead>
                    <tr>
                      <th>エンドポイント</th>
                      <th>定義</th>
                      <th>評価時点</th>
                      <th>エビデンス</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <strong>Pain Freedom（疼痛消失）</strong>
                      </td>
                      <td>NRS / VRS = 0（頭痛なし）</td>
                      <td>治療後 2 時間</td>
                      <td>
                        <span className="bA">Grade A</span> FDA / IHS 主要
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <strong>Pain Relief（疼痛軽減）</strong>
                      </td>
                      <td>中等度/重度 → なし/軽度への移行</td>
                      <td>治療後 2 時間</td>
                      <td>
                        <span className="bA">Grade A</span> 副次
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <strong>Sustained Pain Freedom</strong>
                      </td>
                      <td>2 時間後の疼痛消失が 24 時間持続</td>
                      <td>2〜24 時間</td>
                      <td>
                        <span className="bA">Grade A</span> 副次
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <strong>Time to Pain Freedom</strong>
                      </td>
                      <td>疼痛消失までの時間（生存分析）</td>
                      <td>連続測定</td>
                      <td>
                        <span className="bB">Grade B</span> 副次
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <h3>9.2 頭痛日誌への VAS / NRS 組み込み</h3>
              <div className="alert a-info">
                <div className="alert-i">📒</div>
                <div>
                  <strong>
                    治療開始前に最低 30 日間のベースライン記録を取得すること（ICHD-3 準拠）。
                  </strong>
                </div>
              </div>
              <div className="tbl">
                <table>
                  <thead>
                    <tr>
                      <th>記録タイミング</th>
                      <th>目的</th>
                      <th>IHS 推奨</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <strong>発症時（Onset）</strong>
                      </td>
                      <td>ベースライン疼痛強度の確認；治療投与の判断（NRS ≥4 推奨）</td>
                      <td>✅</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>ピーク時（Peak）</strong>
                      </td>
                      <td>最大疼痛強度の記録</td>
                      <td>✅</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>治療投与 30 分後</strong>
                      </td>
                      <td>早期効果の確認（急性神経ブロック評価に重要）</td>
                      <td>オプション</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>治療投与 2 時間後</strong>
                      </td>
                      <td>IHS 標準主要評価時点（Pain Freedom / Pain Relief の判定）</td>
                      <td>✅ 必須</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>治療投与 24 時間後</strong>
                      </td>
                      <td>再燃・Sustained Pain Freedom の評価</td>
                      <td>✅</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>頭痛消失時</strong>
                      </td>
                      <td>発作持続時間の記録</td>
                      <td>✅</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <h3>9.3 急性期治療評価フロー（VAS / NRS 組み込み版）</h3>
              <div className="mmd">
                <div className="mmd-lbl">フローチャート — SNOOP4 除外から治療反応評価まで</div>
                <MermaidDiagram
                  themeVariables={VNS_MERMAID_THEME}
                  chart={`flowchart TD
A(["頭痛発症"]) --> B["⚠️ SNOOP4 スクリーニング<br>二次性頭痛・神経学的緊急事態を除外<br>（S: 全身症状, N: 神経症状, O: 突発発症<br>O: 50 歳以降発症, P: パターン変化, 4: 4 項目）"]
B --> C{"SNOOP4 陽性？"}
C -->|"Yes"| D["🚨 緊急画像検査（CT / MRI）<br>専門医紹介<br>VAS/NRS 評価より緊急対応を優先"]
C -->|"No"| E["NRS / VAS 評価（発症時）<br>記録：時刻 + 強度スコア + 薬剤使用日数"]
E --> F{"NRS スコアは？"}
F -->|"NRS 1〜3 / VAS 5〜44mm<br>（軽度）"| G["Step 1：アセトアミノフェン<br>または NSAIDs（標準用量）<br>[Grade A]"]
F -->|"NRS 4〜6 / VAS 45〜69mm<br>（中等度）"| H["Step 1〜2：NSAIDs 強化<br>または トリプタン（片頭痛）<br>[Grade A]"]
F -->|"NRS 7〜10 / VAS ≥70mm<br>（重度）"| I["Step 2〜3：トリプタン / ゲパント / ジタン<br>または専門的介入<br>[Grade A]"]
G --> J["治療後 2 時間<br>NRS / VAS 再評価"]
H --> J
I --> J
J --> K{"疼痛評価結果"}
K -->|"NRS = 0 / VAS = 0mm<br>Pain Freedom 達成"| L["✅ Pain Freedom<br>日誌に記録 / MCID 達成確認"]
K -->|"NRS 1〜3 / VAS ≤44mm<br>Pain Relief 達成"| M["✅ Pain Relief<br>（中等度→軽度）/ MCID 達成"]
K -->|"NRS ≥4 / VAS ≥45mm<br>治療無効"| N["⚠️ 治療奏効なし<br>レスキュー療法 / MOH 評価<br>予防療法導入を検討"]
L --> O["24 時間後評価<br>Sustained Pain Freedom 確認"]
M --> O
N --> P["MOH リスク評価<br>NSAIDs ≥15 日/月<br>トリプタン ≥10 日/月<br>→ ICHD-3 コード 8.2 を確認"]
style D fill:#ffcdd2,stroke:#C62828,stroke-width:2px
style L fill:#c8e6c9,stroke:#1B5E20
style M fill:#dcedc8,stroke:#33691E
style N fill:#fff9c4,stroke:#F9A825
style P fill:#ffcdd2,stroke:#C62828`}
                />
              </div>

              <h3>9.4 MOH（薬物乱用頭痛）リスクとの連携</h3>
              <div className="alert a-danger">
                <div className="alert-i">⚠️</div>
                <div>
                  <strong>MOH（ICHD-3 コード 8.2）の閾値：</strong>
                  <br />
                  ・単純鎮痛薬 / NSAIDs：月 15 日以上 × 3 ヶ月継続
                  <br />
                  ・組み合わせ鎮痛薬：月 10 日以上 × 3 ヶ月継続
                  <br />
                  ・トリプタン / エルゴタミン / オピオイド：月 10 日以上 × 3 ヶ月継続
                </div>
              </div>
              <div className="tbl">
                <table>
                  <thead>
                    <tr>
                      <th>NRS 記録の役割</th>
                      <th>MOH 管理への貢献</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <strong>発症時 NRS 記録</strong>
                      </td>
                      <td>急性薬剤使用の閾値管理（NRS ≥4 で投与が標準）</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>月間使用日数カウント</strong>
                      </td>
                      <td>MOH 診断基準（日数）の正確な把握</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>NRS 経時変化の追跡</strong>
                      </td>
                      <td>「薬剤が効いても直ちに頭痛が戻る」パターンの検出</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>トレンド分析</strong>
                      </td>
                      <td>NRS の月間ピーク値の増加傾向 = MOH 早期兆候</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* ====================================================== SECTION 10 */}
            <section id="s10" className="sec">
              <div className="sec-hd">
                <div className="sec-num">10</div>
                <h2 className="sec-title">FDA PRO ガイダンスとエンドポイント設計</h2>
              </div>

              <h3>10.1 FDA の患者報告アウトカム（PRO）ガイダンス</h3>
              <p>
                米国食品医薬品局（FDA）は 2009 年に <strong>PRO ガイダンス</strong>
                を発表し、疼痛スケールを含む患者報告アウトカムの医薬品承認への活用基準を示しました。このガイダンスにおいて
                VAS / NRS は「疼痛強度」の <strong>PRO エンドポイント</strong>
                として明示的に認定されています。
              </p>
              <div className="tbl">
                <table>
                  <thead>
                    <tr>
                      <th>FDA 推奨事項</th>
                      <th>VAS / NRS への適用</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>コンテンツ妥当性の確認</td>
                      <td>疼痛強度の単一次元評価として確立済み</td>
                    </tr>
                    <tr>
                      <td>認知的デブリーフィング</td>
                      <td>患者が 0 と 10（両端）の意味を正しく理解することを確認</td>
                    </tr>
                    <tr>
                      <td>テスト再テスト信頼性</td>
                      <td>病態安定時の繰り返し信頼性の文書化</td>
                    </tr>
                    <tr>
                      <td>ePRO（電子 PRO）での実施</td>
                      <td>紙媒体と同等に許容（デジタル VAS も承認）</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <h3>10.2 片頭痛臨床試験における FDA 標準エンドポイント</h3>
              <div className="tbl">
                <table>
                  <thead>
                    <tr>
                      <th>エンドポイント分類</th>
                      <th>評価指標</th>
                      <th>採用スケール</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <strong>主要（急性期）</strong>
                      </td>
                      <td>治療後 2 時間 Pain Freedom</td>
                      <td>4 段階 VRS（0=なし）または NRS（0=なし）</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>主要（予防）</strong>
                      </td>
                      <td>月間片頭痛日数（MMD）の変化量</td>
                      <td>頭痛日誌 + NRS / VRS</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>重要副次</strong>
                      </td>
                      <td>最も困難な随伴症状の消失</td>
                      <td>VRS / NRS</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>副次</strong>
                      </td>
                      <td>Sustained Pain Freedom（2〜24 時間）</td>
                      <td>NRS / VRS</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="alert a-info">
                <div className="alert-i">ℹ️</div>
                <div>
                  <strong>参考：</strong>FDA
                  片頭痛急性期治療薬ガイダンス（2018）および予防療法ガイダンス（2023）。URL は §15
                  参考文献を参照。
                </div>
              </div>
            </section>

            {/* ====================================================== SECTION 11 */}
            <section id="s11" className="sec">
              <div className="sec-hd">
                <div className="sec-num">11</div>
                <h2 className="sec-title">特別集団への配慮</h2>
              </div>

              <h3>11.1 小児・青年期（&lt; 18 歳）</h3>
              <div className="tbl">
                <table>
                  <thead>
                    <tr>
                      <th>年齢層</th>
                      <th>推奨スケール</th>
                      <th>備考</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <strong>&lt; 4 歳</strong>
                      </td>
                      <td>FLACC スケール</td>
                      <td>自己報告不可；行動観察型</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>4〜7 歳</strong>
                      </td>
                      <td>Faces Pain Scale-Revised（FPS-R）</td>
                      <td>視覚的・直感的；言語不要</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>8〜11 歳</strong>
                      </td>
                      <td>FPS-R または NRS（訓練が必要）</td>
                      <td>IHS の小児頭痛ガイドライン準拠</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>12 歳以上</strong>
                      </td>
                      <td>NRS-11（成人と同等）</td>
                      <td>十分な認知的成熟が確認できれば適用可</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="alert a-info">
                <div className="alert-i">ℹ️</div>
                <div>
                  <strong>PedMIDAS（小児版 MIDAS）との併用推奨：</strong>NRS
                  単独では小児の頭痛障害を捉えきれないため、機能的影響の評価を同時に行うことが推奨されます。
                </div>
              </div>

              <h3>11.2 高齢者（≥ 65 歳）</h3>
              <div className="alert a-warn">
                <div className="alert-i">⚠️</div>
                <div>
                  <strong>重要エビデンス：</strong>Rognstad et al. (2023) の前向き研究（平均 77
                  歳・37 名）では、VAS と NRS の間に平均 2.0 点（95% LoA:
                  −1.7〜5.7）の有意な偏差が認められ（p &lt; 0.001）、
                  <strong>高齢者において VAS と NRS は互換的に使用すべきでない</strong>
                  ことが示されました。
                </div>
              </div>
              <div className="tbl">
                <table>
                  <thead>
                    <tr>
                      <th>問題点</th>
                      <th>推奨対応</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>VAS の抽象的概念の理解困難</td>
                      <td>NRS または VRS（4 段階）を優先使用</td>
                    </tr>
                    <tr>
                      <td>VAS と NRS の互換性低下</td>
                      <td>
                        同一患者には <strong>1 種類のスケールを一貫使用</strong>
                      </td>
                    </tr>
                    <tr>
                      <td>聴覚障害のある患者</td>
                      <td>紙媒体または電子 PRO を選択</td>
                    </tr>
                    <tr>
                      <td>認知機能低下（MCI / 認知症）</td>
                      <td>PACSLAC / PAINAD（行動観察型）を検討</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <h3>11.3 妊娠中・授乳中</h3>
              <div className="tbl">
                <table>
                  <thead>
                    <tr>
                      <th>考慮点</th>
                      <th>対応</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>VAS / NRS 自体の安全性</td>
                      <td>問題なし（非侵襲的評価ツール）</td>
                    </tr>
                    <tr>
                      <td>急性薬物療法の選択</td>
                      <td>
                        アセトアミノフェン第一選択；NRS ≥7 の重症発作では IV
                        硫酸マグネシウム（1〜2g）を考慮
                      </td>
                    </tr>
                    <tr>
                      <td>絶対禁忌薬の確認</td>
                      <td>
                        バルプロ酸（Category X）・トピラマート（Category D）・エルゴタミン → NRS
                        に関わらず禁忌
                      </td>
                    </tr>
                    <tr>
                      <td>MOH リスク管理</td>
                      <td>NRS による薬剤使用頻度と疼痛強度の厳密な記録が特に重要</td>
                    </tr>
                    <tr>
                      <td>緊急評価基準</td>
                      <td>NRS ≥8 に加え SNOOP4 陽性症状（子癇前症・硬膜外血腫等）に即時対応</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <h3>11.4 認知機能障害患者</h3>
              <div className="tbl">
                <table>
                  <thead>
                    <tr>
                      <th>認知機能低下の程度</th>
                      <th>推奨スケール</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <strong>MCI（軽度認知機能障害）</strong>
                      </td>
                      <td>NRS（ゆっくり明確に説明）または VRS</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>中等度認知症</strong>
                      </td>
                      <td>FPS-R（顔画像スケール）または VRS</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>重度認知症</strong>
                      </td>
                      <td>PAINAD（Pain Assessment in Advanced Dementia）等の行動観察型</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* ====================================================== SECTION 12 */}
            <section id="s12" className="sec">
              <div className="sec-hd">
                <div className="sec-num">12</div>
                <h2 className="sec-title">他の転帰指標との統合的活用</h2>
              </div>

              <h3>12.1 頭痛医学標準転帰指標との相補的関係</h3>
              <div className="tbl">
                <table>
                  <thead>
                    <tr>
                      <th>尺度</th>
                      <th>評価次元</th>
                      <th>MCID</th>
                      <th>VAS / NRS との関係</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <strong>VAS / NRS</strong>
                      </td>
                      <td>疼痛強度のみ</td>
                      <td>NRS −2 点 / VAS −13mm</td>
                      <td>基盤的測定 — 他指標の補完が必須</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>PGIC</strong>
                      </td>
                      <td>患者全般改善度（包括）</td>
                      <td>スコア ≥5</td>
                      <td>NRS 変化量のアンカー指標として機能</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>HIT-6</strong>
                      </td>
                      <td>頭痛の生活影響度</td>
                      <td>−2.3〜−5 点</td>
                      <td>NRS 強度 + HIT-6 で多角評価</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>MIDAS</strong>
                      </td>
                      <td>社会的障害（90 日間）</td>
                      <td>≥50% 削減</td>
                      <td>NRS 強度だけでは機能障害を捉えられない</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>MSQ v2.1</strong>
                      </td>
                      <td>頭痛特異的 QOL</td>
                      <td>ドメイン別</td>
                      <td>NRS と補完的</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>月間片頭痛日数（MMD）</strong>
                      </td>
                      <td>頭痛頻度</td>
                      <td>≥50% 削減</td>
                      <td>NRS は強度を測定；MMD は頻度を測定</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <h3>12.2 多軸評価マトリクス</h3>
              <div className="mmd">
                <div className="mmd-lbl">概念図 — VAS/NRS を中核とした多軸統合評価</div>
                <MermaidDiagram
                  themeVariables={VNS_MERMAID_THEME}
                  chart={`graph TD
P["患者"] --> A["VAS / NRS<br>疼痛強度を測定<br>（発症時・ピーク・2h 後）"]
P --> B["HIT-6<br>日常機能への影響<br>（4 週ごと）"]
P --> C["MIDAS<br>社会・職業的損失<br>（3 ヶ月ごと）"]
P --> D["PGIC<br>全体的変化感<br>（3・6・12 ヶ月）"]
P --> E["頭痛日誌<br>頭痛日数・薬剤使用<br>（毎日）"]
A --> F["統合評価<br>治療効果の多角的解釈"]
B --> F
C --> F
D --> F
E --> F
F --> G{"治療目標達成？"}
G --> H["✅ VAS/NRS MCID 達成<br>✅ HIT-6 改善 ≥2.3 点<br>✅ MIDAS Grade 改善<br>✅ PGIC ≥5（改善）<br>✅ MMD ≥50% 削減"]
G --> I["⚠️ 一部未達成<br>治療プランの見直し<br>MOH / SNOOP4 再評価"]
style H fill:#c8e6c9,stroke:#388E3C
style I fill:#ffcdd2,stroke:#C62828`}
                />
              </div>

              <h3>12.3 VAS / NRS の限界を補完する評価の組み合わせ</h3>
              <div className="tbl">
                <table>
                  <thead>
                    <tr>
                      <th>VAS / NRS 単独での限界</th>
                      <th>補完指標</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>疼痛「強度」のみ — 頻度・持続時間は非評価</td>
                      <td>頭痛日誌（月間頭痛日数、発作持続時間）</td>
                    </tr>
                    <tr>
                      <td>機能障害・社会的影響を捉えない</td>
                      <td>MIDAS / HIT-6</td>
                    </tr>
                    <tr>
                      <td>QOL（生活の質）の変化を反映しない</td>
                      <td>MSQ v2.1</td>
                    </tr>
                    <tr>
                      <td>患者の全体的回復感を反映しない</td>
                      <td>PGIC</td>
                    </tr>
                    <tr>
                      <td>感情的側面（不安・抑うつ）を評価しない</td>
                      <td>PHQ-9 / GAD-7</td>
                    </tr>
                    <tr>
                      <td>前兆・随伴症状の変化を記録しない</td>
                      <td>頭痛日誌（詳細版）</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* ====================================================== SECTION 13 */}
            <section id="s13" className="sec">
              <div className="sec-hd">
                <div className="sec-num">13</div>
                <h2 className="sec-title">臨床実施ワークフロー（12 週間フレームワーク）</h2>
              </div>

              <h3>13.1 初診時 — ベースライン評価フロー</h3>
              <div className="mmd">
                <div className="mmd-lbl">フローチャート — 新規頭痛患者の初診 6 ステップ</div>
                <MermaidDiagram
                  themeVariables={VNS_MERMAID_THEME}
                  chart={`flowchart TD
Start(["新規頭痛患者 初診"]) --> S1["STEP 1：SNOOP4 スクリーニング<br>🚨 二次性頭痛・神経学的緊急事態を除外"]
S1 --> C1{"SNOOP4 陽性？"}
C1 -->|"Yes"| Ref["⚠️ 緊急画像検査（CT / MRI）<br>専門医紹介"]
C1 -->|"No"| S2["STEP 2：ICHD-3 診断基準による頭痛分類<br>（1.1 片頭痛 / 2.1〜2.3 TTH / 3.1〜3.2 群発等）"]
S2 --> S3["STEP 3：ベースライン VAS / NRS 評価<br>・直近の典型的発作時のピーク NRS<br>・最終発作の NRS（発症時・ピーク・2h 後）<br>・頭痛日誌を使用した 30 日間記録開始"]
S3 --> S4["STEP 4：関連転帰指標の同時評価<br>・HIT-6（頭痛生活影響：≥60 = 重度）<br>・MIDAS（社会的障害：≥21 = Grade IV）<br>・MOH リスク評価（使用薬剤・使用頻度）"]
S4 --> S5["STEP 5：治療計画立案<br>・NRS ≥4 で急性薬剤投与を基準とする<br>・NRS ≥7 または月 4 回以上で予防療法を検討<br>・エビデンスグレード [Grade A/B/C/U] を付記"]
S5 --> S6["STEP 6：患者教育<br>・NRS の使用方法と意味<br>・頭痛日誌への記録方法<br>・MOH 閾値（NSAIDs ≥15 日/月等）の説明"]
S6 --> End(["治療開始 / フォローアップへ"])
style Start fill:#e3f2fd,stroke:#1565C0
style Ref fill:#ffcdd2,stroke:#C62828,stroke-width:2px
style End fill:#c8e6c9,stroke:#1B5E20`}
                />
              </div>

              <h3>13.2 12 週間フォローアップフレームワーク</h3>
              <div className="tbl">
                <table>
                  <thead>
                    <tr>
                      <th>時点</th>
                      <th>NRS / VAS 評価</th>
                      <th>関連指標</th>
                      <th>評価目標</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <strong>ベースライン（0 週）</strong>
                      </td>
                      <td>✅ 必須</td>
                      <td>HIT-6, MIDAS, 頭痛日誌開始</td>
                      <td>治療前の基準値確立</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>4 週（1 ヶ月後）</strong>
                      </td>
                      <td>✅ 実施</td>
                      <td>HIT-6, 日誌確認, 副作用チェック</td>
                      <td>初期反応確認</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>8 週（2 ヶ月後）</strong>
                      </td>
                      <td>✅ 実施</td>
                      <td>HIT-6, 急性薬使用日数モニタリング</td>
                      <td>中間評価</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>12 週（3 ヶ月後）</strong>
                      </td>
                      <td>
                        ✅ <strong>必須</strong>
                      </td>
                      <td>HIT-6, MIDAS, PGIC</td>
                      <td>主要転帰評価；MCID 達成確認</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>6 ヶ月</strong>
                      </td>
                      <td>✅ 必須</td>
                      <td>全指標</td>
                      <td>長期維持判断</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>12 ヶ月</strong>
                      </td>
                      <td>✅ 必須</td>
                      <td>全指標</td>
                      <td>年間評価；CGRP mAb 継続可否</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <h3>13.3 治療成功基準（複合アウトカム）</h3>
              <div className="tbl">
                <table>
                  <thead>
                    <tr>
                      <th>指標</th>
                      <th>最小成功基準（MCID）</th>
                      <th>優良基準</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <strong>NRS ピーク強度</strong>
                      </td>
                      <td>≥2 点改善（≥30% 削減）</td>
                      <td>≥5 点改善（≥50% 削減）</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>VAS ピーク強度</strong>
                      </td>
                      <td>≥13mm 改善（≥30% 削減）</td>
                      <td>≥30mm 改善（≥50% 削減）</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>Pain Freedom 率</strong>
                      </td>
                      <td>増加傾向</td>
                      <td>≥30% の発作で 2 時間後 Pain Freedom</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>HIT-6 スコア</strong>
                      </td>
                      <td>≥2.3 点改善</td>
                      <td>&lt;50 点（正常域）</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>MIDAS Grade</strong>
                      </td>
                      <td>1 グレード以上改善</td>
                      <td>Grade I への移行</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>月間頭痛日数（MMD）</strong>
                      </td>
                      <td>減少傾向</td>
                      <td>≥50% 削減（CGRP mAb 基準）</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>PGIC</strong>
                      </td>
                      <td>スコア ≥5（改善）</td>
                      <td>スコア ≥6（著明改善）</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* ====================================================== SECTION 14 */}
            <section id="s14" className="sec">
              <div className="sec-hd">
                <div className="sec-num">14</div>
                <h2 className="sec-title">よくある誤りと注意点</h2>
              </div>

              <h3>14.1 VAS 使用時の典型的誤り</h3>
              <div className="tbl">
                <table className="th-red">
                  <thead>
                    <tr>
                      <th>誤り</th>
                      <th>影響</th>
                      <th>正しい対応</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>VAS 線上に目盛り・数字を追加</td>
                      <td>連続スケールの特性が失われ、事実上 NRS に変容</td>
                      <td>数字・目盛りなしの 100mm 線のみを使用</td>
                    </tr>
                    <tr>
                      <td>100mm 以外の長さを使用</td>
                      <td>スコアの国際互換性が失われる</td>
                      <td>
                        <strong>必ず 100mm</strong> を使用
                      </td>
                    </tr>
                    <tr>
                      <td>mm ではなく cm で記録</td>
                      <td>MCID 計算に誤差（10 倍の誤り）</td>
                      <td>mm で記録（0〜100mm）</td>
                    </tr>
                    <tr>
                      <td>複数回測定で前回スコアを患者に見せる</td>
                      <td>アンカリング効果による偏り</td>
                      <td>毎回新しい用紙を使用；前回値を見せない</td>
                    </tr>
                    <tr>
                      <td>VAS が理解できない患者に強行</td>
                      <td>無効な測定データの蓄積</td>
                      <td>理解確認後に実施；困難なら NRS に切替</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <h3>14.2 NRS 使用時の典型的誤り</h3>
              <div className="tbl">
                <table className="th-red">
                  <thead>
                    <tr>
                      <th>誤り</th>
                      <th>影響</th>
                      <th>正しい対応</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>評価時点を明示せずに聞く</td>
                      <td>発症時・ピーク・2 時間後の区別が不明確</td>
                      <td>「今この瞬間のお痛みは何点？」等と明示</td>
                    </tr>
                    <tr>
                      <td>小数値（「7.5 点」）を許容する</td>
                      <td>NRS の尺度特性が失われる</td>
                      <td>
                        <strong>整数のみ</strong>を回答させる
                      </td>
                    </tr>
                    <tr>
                      <td>アンカーを説明せずに評価</td>
                      <td>患者によって解釈が異なる（10 点 ≠ 最悪の痛み）</td>
                      <td>毎回「0 は痛みなし、10 は最悪の痛み」を説明</td>
                    </tr>
                    <tr>
                      <td>VAS と NRS を混在使用</td>
                      <td>スコアの比較不能；MCID の計算が困難</td>
                      <td>
                        同一患者には<strong>同一スケールを一貫使用</strong>
                      </td>
                    </tr>
                    <tr>
                      <td>「いつもの痛みは何点？」と聞く</td>
                      <td>「平均」と「ピーク」の混在</td>
                      <td>「今」「ピーク時」「平均」を明確に区別</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <h3>14.3 頭痛特異的注意事項</h3>
              <div className="tbl">
                <table>
                  <thead>
                    <tr>
                      <th>注意事項</th>
                      <th>詳細</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <strong>発作間欠期と発作期の区別</strong>
                      </td>
                      <td>
                        「現在の頭痛強度」（発作期）と「典型的な発作時のピーク強度」を明確に区別して記録
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <strong>SNOOP4 との連携</strong>
                      </td>
                      <td>
                        NRS ≥8 + 突発的発症（秒〜分単位で最悪に達する）→ 雷鳴頭痛疑い → 直ちに SAH
                        除外のため CT/MRI
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <strong>トリプタン使用タイミング</strong>
                      </td>
                      <td>
                        NRS ≥4（中等度）での投与が標準；軽度（NRS
                        1〜3）での早期投与は再燃リスクを減らす可能性（個別判断）
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <strong>MOH 監視</strong>
                      </td>
                      <td>
                        NRS 記録は薬剤使用日数カウントと連動；NRS 上昇傾向 + 使用頻度増加 = MOH
                        早期兆候
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <strong>予防療法の効果判定</strong>
                      </td>
                      <td>
                        NRS は発作強度の変化を反映；発作頻度は MMD で評価。両指標の改善で治療成功
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <strong>群発頭痛での VAS 注意</strong>
                      </td>
                      <td>
                        群発頭痛は NRS 9〜10
                        が標準的；スコアのみで重症度を判断せず、発作頻度と持続時間を重視
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
                <h2 className="sec-title">参考文献・ソース一覧</h2>
              </div>

              <div className="alert a-info">
                <div className="alert-i">📚</div>
                <div>
                  <strong>ソース使用原則：</strong>
                  本ページに記載されたすべての情報は、国際的に認可された学術誌・規制当局・IHS / IASP
                  公式機関を出典としています。
                </div>
              </div>

              <h3>VAS / NRS 原典・基礎文献</h3>
              <div className="src-grid">
                <div className="src">
                  <div className="src-org">The Lancet · 1974</div>
                  <div className="src-t">
                    Huskisson EC. Measurement of pain — VAS 臨床導入の原典
                  </div>
                  <div className="src-url">
                    <Ext href="https://doi.org/10.1016/S0140-6736(74)90884-8">
                      DOI: 10.1016/S0140-6736(74)90884-8
                    </Ext>
                  </div>
                </div>
                <div className="src">
                  <div className="src-org">Pain · 1986</div>
                  <div className="src-t">
                    Jensen MP, et al. The measurement of clinical pain intensity: a comparison of
                    six methods
                  </div>
                  <div className="src-url">
                    <Ext href="https://doi.org/10.1016/0304-3959(86)90228-9">
                      DOI: 10.1016/0304-3959(86)90228-9
                    </Ext>
                  </div>
                </div>
                <div className="src">
                  <div className="src-org">Pain · 1983</div>
                  <div className="src-t">
                    Price DD, et al. The validation of VAS as ratio scale measures —
                    比率尺度特性の検証
                  </div>
                  <div className="src-url">
                    <Ext href="https://doi.org/10.1016/0304-3959(83)90126-4">
                      DOI: 10.1016/0304-3959(83)90126-4
                    </Ext>
                  </div>
                </div>
                <div className="src">
                  <div className="src-org">Pain · 2001</div>
                  <div className="src-t">
                    Farrar JT, et al. Clinical importance of changes on an 11-point NRS — NRS MCID
                    最重要文献
                  </div>
                  <div className="src-url">
                    <Ext href="https://pubmed.ncbi.nlm.nih.gov/11690728/">PubMed: 11690728</Ext>
                  </div>
                </div>
                <div className="src">
                  <div className="src-org">Eur J Pain · 2004</div>
                  <div className="src-t">
                    Salaffi F, et al. Minimal clinically important changes in chronic
                    musculoskeletal pain (NRS) — MCID 1.74 点
                  </div>
                  <div className="src-url">
                    <Ext href="https://www.sciencedirect.com/science/article/abs/pii/S1090380103001289">
                      ScienceDirect
                    </Ext>
                  </div>
                </div>
                <div className="src">
                  <div className="src-org">Ann Emerg Med · 2001</div>
                  <div className="src-t">
                    Gallagher EJ, et al. Prospective validation of changes in pain severity on a VAS
                    — VAS MCID 約 13mm
                  </div>
                  <div className="src-url">
                    <Ext href="https://pubmed.ncbi.nlm.nih.gov/11719741/">PubMed: 11719741</Ext>
                  </div>
                </div>
              </div>

              <h3>系統的レビュー・心理測定学</h3>
              <div className="src-grid">
                <div className="src">
                  <div className="src-org">J Pain Symptom Manage · 2011</div>
                  <div className="src-t">
                    Hjermstad MJ, et al. Studies comparing NRS, VRS, and VAS for pain intensity in
                    adults: a systematic review
                  </div>
                  <div className="src-url">
                    <Ext href="https://www.jpsmjournal.com/article/S0885-3924(11)00014-5/fulltext">
                      JPSM Full Text
                    </Ext>
                  </div>
                </div>
                <div className="src">
                  <div className="src-org">J Pain · 2018</div>
                  <div className="src-t">
                    Wertli MM, et al. Measurement properties of VAS, NRS, and BPI-PS in low back
                    pain（COSMIN 評価）
                  </div>
                  <div className="src-url">
                    <Ext href="https://pubmed.ncbi.nlm.nih.gov/30099210/">PubMed: 30099210</Ext>
                  </div>
                </div>
                <div className="src">
                  <div className="src-org">Pain · 1994</div>
                  <div className="src-t">
                    Price DD, et al. The validation of VAS as ratio scale measures for chronic and
                    experimental pain
                  </div>
                  <div className="src-url">
                    <Ext href="https://pubmed.ncbi.nlm.nih.gov/7936709/">PubMed: 7936709</Ext>
                  </div>
                </div>
              </div>

              <h3>頭痛医学における VAS / NRS</h3>
              <div className="src-grid">
                <div className="src">
                  <div className="src-org">Cephalalgia · 2012</div>
                  <div className="src-t">
                    Loder E, Burch R. Measuring pain intensity in headache trials: which scale to
                    use?
                  </div>
                  <div className="src-url">
                    <Ext href="https://journals.sagepub.com/doi/10.1177/0333102411434812">
                      Cephalalgia
                    </Ext>
                  </div>
                </div>
                <div className="src">
                  <div className="src-org">Cephalalgia · 2012</div>
                  <div className="src-t">
                    Aicher B, et al. Pain measurement: VAS and VRS in clinical trials with OTC
                    analgesics in headache
                  </div>
                  <div className="src-url">
                    <Ext href="https://journals.sagepub.com/doi/10.1177/03331024111430856">
                      Cephalalgia
                    </Ext>
                  </div>
                </div>
                <div className="src">
                  <div className="src-org">J Headache Pain · 2025</div>
                  <div className="src-t">
                    Gunasekera L, et al. Prioritising patient involvement in PROMs — 最新 PROMs
                    レビュー
                  </div>
                  <div className="src-url">
                    <Ext href="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC11983965/">
                      PMC: 11983965
                    </Ext>
                  </div>
                </div>
                <div className="src">
                  <div className="src-org">Cephalalgia · 2024</div>
                  <div className="src-t">
                    IHS Clinical Trials Standing Committee —
                    片頭痛急性期治療臨床試験ガイドライン（VAS/NRS 使用推奨）
                  </div>
                  <div className="src-url">
                    <Ext href="https://journals.sagepub.com/doi/10.1177/03331024241252666">
                      DOI: 10.1177/03331024241252666
                    </Ext>
                  </div>
                </div>
              </div>

              <h3>規制当局・国際機関ガイダンス</h3>
              <div className="src-grid">
                <div className="src">
                  <div className="src-org">FDA · 2009</div>
                  <div className="src-t">
                    Guidance for Industry: Patient-Reported Outcome Measures（PRO / NRS / VAS
                    の規制上の位置づけ）
                  </div>
                  <div className="src-url">
                    <Ext href="https://www.fda.gov/media/77832/download">fda.gov/media/77832</Ext>
                  </div>
                </div>
                <div className="src">
                  <div className="src-org">FDA · 2018</div>
                  <div className="src-t">Migraine — Developing Drugs for Acute Treatment</div>
                  <div className="src-url">
                    <Ext href="https://www.fda.gov/media/89829/download">fda.gov/media/89829</Ext>
                  </div>
                </div>
                <div className="src">
                  <div className="src-org">FDA · 2023</div>
                  <div className="src-t">Migraine — Developing Drugs for Preventive Treatment</div>
                  <div className="src-url">
                    <Ext href="https://www.fda.gov/media/168871/download">fda.gov/media/168871</Ext>
                  </div>
                </div>
                <div className="src">
                  <div className="src-org">IASP</div>
                  <div className="src-t">
                    Pain Management Center Toolkit — Chapter 4（NRS の IASP 推奨）
                  </div>
                  <div className="src-url">
                    <Ext href="https://www.iasp-pain.org/resources/toolkits/pain-management-center/chapter4/">
                      iasp-pain.org Toolkit Ch.4
                    </Ext>
                  </div>
                </div>
                <div className="src">
                  <div className="src-org">IHS / ICHD-3</div>
                  <div className="src-t">
                    International Classification of Headache Disorders 3rd Edition
                  </div>
                  <div className="src-url">
                    <Ext href="https://ichd-3.org/">ichd-3.org</Ext>
                  </div>
                </div>
              </div>

              <h3>疼痛の定義・特別集団</h3>
              <div className="src-grid">
                <div className="src">
                  <div className="src-org">Pain · 2020</div>
                  <div className="src-t">
                    Raja SN, et al. The revised IASP definition of pain — 疼痛の現代的定義
                  </div>
                  <div className="src-url">
                    <Ext href="https://pubmed.ncbi.nlm.nih.gov/32694387/">PubMed: 32694387</Ext>
                  </div>
                </div>
                <div className="src">
                  <div className="src-org">Compr Psychiatry · 2023</div>
                  <div className="src-t">
                    Rognstad S, et al. Measuring pain intensity in older adults — Can VAS and NRS be
                    used interchangeably?
                  </div>
                  <div className="src-url">
                    <Ext href="https://www.sciencedirect.com/science/article/pii/S0278584623002117">
                      ScienceDirect
                    </Ext>
                  </div>
                </div>
              </div>

              <div className="alert a-info" style={{ marginTop: 18 }}>
                <div className="alert-i">🏛️</div>
                <div>
                  本ページは、ICHD-3・IHS・AAN・EHF・FDA・IASP
                  の国際的ガイドラインおよび査読済み学術文献に基づいて作成されました。
                  <br />
                  <span style={{ fontSize: 12, color: "var(--g6)" }}>最終更新：2026 年 6 月</span>
                </div>
              </div>
            </section>
          </AutoGlossary>
        </main>
      </div>

      {/* FOOTER */}
      <div className="footer">
        <strong>VAS / NRS（視覚的アナログスケール / 数値評価スケール）</strong> —
        疼痛強度評価の理論・実践・頭痛医学への応用 — 初学者向けステップバイステップ
        <br />📅 作成年: 2026 | 次回レビュー推奨: ガイドライン更新時
        <br />
        ⚠️
        本資料は学術・教育・研究目的のみを対象としています。臨床への適用は必ず資格を持つ医療専門家の監督のもとで行ってください。
      </div>
    </div>
  );
}
