import { Ext } from "@/components/Ext";
import { MohSidebar } from "@/components/headaches/MohSidebar";
import MermaidDiagram from "@/components/MermaidDiagram";
import "./medication-overuse-headache.css";

const MOH_MERMAID_THEME = {
  primaryColor: "#fbe9e7",
  primaryTextColor: "#4e2000",
  primaryBorderColor: "#bf360c",
  lineColor: "#546e7a",
  secondaryColor: "#fff3e0",
  tertiaryColor: "#e8f5e9",
  edgeLabelBackground: "#ffffff",
  fontSize: "13px",
};

export default function MedicationOveruseHeadachePage() {
  return (
    <div className="moh-accent">
      {/* HERO */}
      <div className="hero">
        <div style={{ fontSize: 52, marginBottom: 4 }}>💊</div>
        <h1>薬剤過用頭痛（MOH）完全ガイド</h1>
        <p className="hero-sub">
          国際エビデンス（ICHD-3 / AAN / EHF / NICE 2024）に基づく包括的解説 —
          初学者向けステップバイステップ
        </p>
        <div className="hero-tags">
          <span className="hero-tag">ICHD-3 コード 8.2</span>
          <span className="hero-tag">Grade A〜U エビデンス</span>
          <span className="hero-tag">5ステップ治療戦略</span>
          <span className="hero-tag">CGRP 製剤 MOH 対応</span>
          <span className="hero-tag">再発予防・長期戦略</span>
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
        <MohSidebar />

        {/* MAIN CONTENT */}
        <main className="main">
          {/* ============================================================ SECTION 1 */}
          <section id="s1" className="sec">
            <div className="sec-hd">
              <div className="sec-num">1</div>
              <h2 className="sec-title">MOHとは何か — 基本概念の理解</h2>
            </div>

            <div className="alert a-warn">
              <span className="alert-i">⚠️</span>
              <div>
                <strong>「頭痛を治そうと飲んだ薬が、さらに多くの頭痛を作り出す」</strong>
                <br />
                薬剤過用頭痛（MOH）は、急性期頭痛薬を長期間・過剰に使用することで逆に頭痛が慢性化・悪化するという逆説的な疾患です。
              </div>
            </div>

            <p>
              <strong>薬剤過用頭痛（Medication-Overuse Headache; MOH）</strong>
              とは、元々頭痛持ちであった患者が急性期頭痛薬を長期間・過剰に使用することで逆に頭痛が慢性化・悪化するという、「薬が頭痛を招く」という逆説的な疾患です。
            </p>
            <p>
              <strong>ICHD-3コード: 8.2</strong>（国際頭痛分類第3版）
            </p>

            <h3>1.2 旧称・別名の変遷</h3>
            <p>
              ICHD-3は「乱用（abuse）」や「誤用（misuse）」という表現を避け、患者へのスティグマを軽減するために「過用（overuse）」という中立的表現を採用しています。
            </p>
            <div className="tbl">
              <table>
                <thead>
                  <tr>
                    <th>旧名称</th>
                    <th>現在の推奨名称</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>鎮痛薬誘発性頭痛（Analgesic-induced headache）</td>
                    <td>薬剤過用頭痛（MOH）</td>
                  </tr>
                  <tr>
                    <td>薬物乱用頭痛（Drug-induced headache）</td>
                    <td>MOH</td>
                  </tr>
                  <tr>
                    <td>反跳性頭痛（Rebound headache）</td>
                    <td>MOH</td>
                  </tr>
                  <tr>
                    <td>薬物誤用頭痛（Medication-misuse headache）</td>
                    <td>MOH</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="alert a-info">
              <span className="alert-i">📌</span>
              <div>
                ICHD-3は「過用（overuse）」という用語を採用することで、患者が「乱用者」や「誤用者」と見なされるスティグマを軽減し、客観的な診断基準（頻度・期間）に焦点を当てています。
              </div>
            </div>
          </section>

          {/* ============================================================ SECTION 2 */}
          <section id="s2" className="sec">
            <div className="sec-hd">
              <div className="sec-num">2</div>
              <h2 className="sec-title">疫学 — どれくらい多い疾患か</h2>
            </div>

            <h3>2.1 有病率</h3>
            <div className="tbl th-orange">
              <table>
                <thead>
                  <tr>
                    <th>対象集団</th>
                    <th>有病率</th>
                    <th>備考</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>一般成人人口</td>
                    <td>
                      <strong>1〜2%</strong>
                    </td>
                    <td>世界的コンセンサス推計</td>
                  </tr>
                  <tr>
                    <td>慢性連日頭痛（≥15日/月）患者</td>
                    <td>
                      <strong className="tR">50〜60%</strong>
                    </td>
                    <td>最重要統計 — 半数以上がMOH</td>
                  </tr>
                  <tr>
                    <td>頭痛専門外来患者</td>
                    <td>
                      <strong>30〜50%</strong>
                    </td>
                    <td>専門施設での高い割合</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3>2.2 人口統計学的特徴</h3>
            <div className="tbl">
              <table>
                <thead>
                  <tr>
                    <th>項目</th>
                    <th>データ</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>性差</td>
                    <td>
                      女性に多い（女性：男性 ≒ <strong>3:1</strong>）
                    </td>
                  </tr>
                  <tr>
                    <td>好発年齢</td>
                    <td>
                      <strong>30〜50歳</strong>（ただし全年齢に発症しうる）
                    </td>
                  </tr>
                  <tr>
                    <td>好発基礎疾患</td>
                    <td>片頭痛（最多）、緊張型頭痛、群発頭痛</td>
                  </tr>
                  <tr>
                    <td>職業的傾向</td>
                    <td>ストレス過多、不規則勤務（看護師、シフト労働者）に多い</td>
                  </tr>
                  <tr>
                    <td>地域差</td>
                    <td>世界全地域に分布。低中所得国では市販鎮痛薬過用が特に問題</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* ============================================================ SECTION 3 */}
          <section id="s3" className="sec">
            <div className="sec-hd">
              <div className="sec-num">3</div>
              <h2 className="sec-title">病態生理 — なぜ薬で頭痛が悪化するのか</h2>
            </div>

            <p>
              急性期頭痛薬の慢性的過用が頭痛を悪化させるメカニズムは、複数の神経生物学的変化が複合的に絡み合っています。以下にステップごとに解説します。
            </p>

            <h3>Step 1 — 急性期薬の慢性過用</h3>
            <p>
              繰り返す頭痛に対して急性期薬（鎮痛薬・トリプタンなど）を頻繁に使用する状態が続きます。
            </p>

            <h3>Step 2 — 中枢感作（Central Sensitization）の進行</h3>
            <p>
              三叉神経痛覚経路の閾値が低下し、本来頭痛を引き起こさない程度の刺激でも頭痛が誘発されるようになります。これは脊髄後角ニューロンおよび三叉神経核尾側亜核（Trigeminal
              nucleus caudalis）の興奮性亢進によるものです。
            </p>

            <h3>Step 3 — 下行性疼痛調節系の機能不全</h3>
            <p>
              脳幹（中脳水道周囲灰白質：PAG、吻側延髄腹内側部：RVM）からの下行性疼痛抑制系が機能低下し、痛みのゲートが常に「開いた」状態になります。
            </p>

            <h3>Step 4 — 神経可塑性変化（Neuroplasticity）</h3>
            <p>
              長期過用により前頭前皮質（特に眼窩前頭皮質：OFC）に構造・機能変化が生じ、衝動制御や薬物渇望行動（薬物依存と類似したパターン）が現れます。SDS（依存重症度スケール）スコアは過用の有意な予測因子です。
            </p>

            <h3>Step 5 — セロトニン系の脱感作</h3>
            <p>
              トリプタンなどの5-HT1B/1D受容体作動薬の過用により、セロトニン受容体が下方制御（ダウンレギュレーション）し、セロトニンによる内因性疼痛抑制が低下します。
            </p>

            <h3>Step 6 — CGRPの上昇とトリプタン効果の減弱</h3>
            <p>
              CGRP（カルシトニン遺伝子関連ペプチド）の放出が慢性的に増加し、三叉神経血管系の感作が維持されます。同時にトリプタンへの反応性も低下する可能性があります。
            </p>

            <div className="mmd">
              <div className="mmd-lbl">病態生理カスケード — 中枢感作の悪循環</div>
              <MermaidDiagram
                themeVariables={MOH_MERMAID_THEME}
                chart={`flowchart TD
A["🔴 急性期頭痛薬の慢性過用\\n（&gt;10〜15日/月 × 3ヶ月以上）"]
A --> B["三叉神経痛覚経路の持続的活性化"]
B --> C["中枢感作の進行\\n（脊髄後角・三叉神経核尾側亜核）"]
B --> D["下行性疼痛抑制系（PAG/RVM）の機能不全"]
C --> E["痛覚過敏・異痛症の発現"]
D --> E
E --> F["前頭前皮質の神経可塑性変化\\n（眼窩前頭皮質OFC）"]
F --> G["衝動制御障害・薬物渇望行動\\n（依存類似パターン）"]
G --> H["さらなる薬物過用"]
H --> A
B --> I["セロトニン受容体の下方制御\\n（5-HT1B/1D脱感作）"]
B --> J["CGRP慢性放出増加\\n→三叉神経血管系感作の持続"]
I --> E
J --> E
style A fill:#ff4444,color:#fff,font-weight:bold
style H fill:#ff4444,color:#fff
style E fill:#ff8800,color:#fff,font-weight:bold
style G fill:#cc4400,color:#fff`}
              />
            </div>
          </section>

          {/* ============================================================ SECTION 4 */}
          <section id="s4" className="sec">
            <div className="sec-hd">
              <div className="sec-num">4</div>
              <h2 className="sec-title">ICHD-3 診断基準</h2>
            </div>

            <div className="alert a-info">
              <span className="alert-i">📌</span>
              <div>
                <strong>ICHD-3より：</strong>{" "}
                MOHと診断された患者の多くは、過用薬物中止後に改善を示します。また予防療法への反応性も回復します。プライマリケアでも原因と結果についての簡潔な説明（パンフレット提供など）だけで過用を防止・中止できる場合があります。
              </div>
            </div>

            <h3>4.1 MOH（8.2）総括診断基準</h3>
            <p>
              <strong>A.</strong> 既存の頭痛疾患を持つ患者において、<strong>月15日以上</strong>
              の頭痛が出現している
            </p>
            <p>
              <strong>B.</strong> 💡 頭痛の急性期・対症療法に用いられうる1種類以上の薬剤を、
              <strong>3ヶ月を超えて定期的に過用</strong>している
            </p>
            <p>
              <strong>C.</strong> 他のICHD-3診断ではより適切に説明されない
            </p>

            <h3>4.2 サブタイプ別診断基準</h3>
            <div className="tbl th-purple">
              <table>
                <thead>
                  <tr>
                    <th>ICHD-3コード</th>
                    <th>サブタイプ</th>
                    <th>過用閾値（月あたり）</th>
                    <th>注釈</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <strong>8.2.1</strong>
                    </td>
                    <td>エルゴタミン過用頭痛</td>
                    <td>≥10日</td>
                    <td>生物学的利用能が変動するため最低用量は定義不可</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>8.2.2</strong>
                    </td>
                    <td>トリプタン過用頭痛</td>
                    <td>≥10日</td>
                    <td>全剤形・全種類を合算</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>8.2.3</strong>
                    </td>
                    <td>非オピオイド鎮痛薬過用頭痛</td>
                    <td>≥15日</td>
                    <td>下記サブフォーム参照</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>8.2.3.1</strong>
                    </td>
                    <td>アセトアミノフェン過用頭痛</td>
                    <td>≥15日</td>
                    <td>最も汎用される市販薬</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>8.2.3.2</strong>
                    </td>
                    <td>NSAID過用頭痛（アスピリン除く）</td>
                    <td>≥15日</td>
                    <td>イブプロフェン・ナプロキセンなど</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>8.2.3.2.1</strong>
                    </td>
                    <td>アスピリン過用頭痛</td>
                    <td>≥15日</td>
                    <td>NSAIDだが独自活性のため独立コード</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>8.2.4</strong>
                    </td>
                    <td>オピオイド過用頭痛</td>
                    <td>≥10日</td>
                    <td>最高再発率 — 特に注意</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>8.2.5</strong>
                    </td>
                    <td>複合鎮痛薬過用頭痛</td>
                    <td>≥10日</td>
                    <td>最多組合せ：非オピオイド＋オピオイド＋カフェイン±バルビツール酸</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>8.2.6</strong>
                    </td>
                    <td>複数薬剤クラス過用（個別未超過）</td>
                    <td>≥10日（合計）</td>
                    <td>単剤では閾値未達だが合計で過用</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>8.2.7</strong>
                    </td>
                    <td>複数薬剤・未特定/未確認過用</td>
                    <td>≥10日（合計）</td>
                    <td>詳細不明 — 日記記録後に再分類</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>8.2.8</strong>
                    </td>
                    <td>その他薬剤過用頭痛</td>
                    <td>≥10日</td>
                    <td>上記以外の薬剤</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="alert a-warn">
              <span className="alert-i">📌</span>
              <div>
                <strong>重要な二重診断ルール：</strong> 1.3 慢性片頭痛と 8.2 MOH
                の両診断基準を満たす場合は<strong>両診断コードを付与</strong>します。例：「1.3
                慢性片頭痛 + 8.2.2 トリプタン過用頭痛」
              </div>
            </div>
          </section>

          {/* ============================================================ SECTION 5 */}
          <section id="s5" className="sec">
            <div className="sec-hd">
              <div className="sec-num">5</div>
              <h2 className="sec-title">原因薬剤と過用閾値</h2>
            </div>

            <p>
              薬剤ごとに過用閾値と MOH 誘発リスクが異なります。リスクの高い薬剤ほど少ない使用日数で
              MOH を誘発します。
            </p>

            <div className="moh-grid">
              <div className="moh moh-h">
                <div className="moh-day">≥10日</div>
                <div className="moh-unit">/ 月（過用閾値）</div>
                <div className="moh-drug">🔴 オピオイド</div>
                <div className="moh-note">
                  コデイン、トラマドール、モルヒネ
                  <br />
                  MOH誘発リスク: 最高 / 離脱困難度: 高（漸減必須）
                </div>
              </div>
              <div className="moh moh-h">
                <div className="moh-day">≥10日</div>
                <div className="moh-unit">/ 月（過用閾値）</div>
                <div className="moh-drug">🔴 複合鎮痛薬</div>
                <div className="moh-note">
                  カフェイン配合、バルビツール配合製剤
                  <br />
                  MOH誘発リスク: 高 / 離脱困難度: 高（漸減推奨）
                </div>
              </div>
              <div className="moh moh-h">
                <div className="moh-day">≥10日</div>
                <div className="moh-unit">/ 月（過用閾値）</div>
                <div className="moh-drug">🔴 エルゴタミン</div>
                <div className="moh-note">
                  エルゴタミン酒石酸塩
                  <br />
                  MOH誘発リスク: 高 / 離脱困難度: 中〜高
                </div>
              </div>
              <div className="moh moh-m">
                <div className="moh-day">≥10日</div>
                <div className="moh-unit">/ 月（過用閾値）</div>
                <div className="moh-drug">🟠 トリプタン</div>
                <div className="moh-note">
                  スマトリプタン、ゾルミトリプタン等
                  <br />
                  MOH誘発リスク: 中〜高 / 離脱困難度: 中（比較的迅速）
                </div>
              </div>
              <div className="moh moh-m">
                <div className="moh-day">≥15日</div>
                <div className="moh-unit">/ 月（過用閾値）</div>
                <div className="moh-drug">🟡 アセトアミノフェン</div>
                <div className="moh-note">
                  パラセタモール（カロナール等）
                  <br />
                  MOH誘発リスク: 中 / 離脱困難度: 中
                </div>
              </div>
              <div className="moh moh-m">
                <div className="moh-day">≥15日</div>
                <div className="moh-unit">/ 月（過用閾値）</div>
                <div className="moh-drug">🟡 NSAIDs（アスピリン含む）</div>
                <div className="moh-note">
                  イブプロフェン、ナプロキセン等
                  <br />
                  MOH誘発リスク: 中 / 離脱困難度: 中
                </div>
              </div>
              <div className="moh moh-l">
                <div className="moh-day" style={{ fontSize: 16, paddingTop: 4 }}>
                  低リスク
                </div>
                <div className="moh-unit">（現時点のエビデンス）</div>
                <div className="moh-drug">🟢 CGRP gepants</div>
                <div className="moh-note">
                  リメゲパント、ウブロゲパント
                  <br />
                  MOH誘発リスク: 低（動物実験データ） / 離脱困難度: 低
                </div>
              </div>
            </div>

            <div className="alert a-warn">
              <span className="alert-i">⚠️</span>
              <div>
                <strong>臨床的注意：</strong> オピオイド系は最高再発率を示す（ICHD-3
                Comment参照）。gepantsはMOHを誘発しない可能性が示唆されているが、長期的エビデンスは現時点では限られています。
              </div>
            </div>
          </section>

          {/* ============================================================ SECTION 6 */}
          <section id="s6" className="sec">
            <div className="sec-hd">
              <div className="sec-num">6</div>
              <h2 className="sec-title">リスクファクター</h2>
            </div>

            <h3>6.1 患者側因子</h3>
            <div className="tbl th-red">
              <table>
                <thead>
                  <tr>
                    <th>リスクカテゴリー</th>
                    <th>具体的因子</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <strong>素因的頭痛疾患</strong>
                    </td>
                    <td>片頭痛（最大リスク）、緊張型頭痛、群発頭痛</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>精神医学的併存疾患</strong>
                    </td>
                    <td>うつ病、不安障害、PTSD、強迫性障害</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>依存・嗜好傾向</strong>
                    </td>
                    <td>アルコール依存、喫煙、物質使用障害の既往</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>心理社会的因子</strong>
                    </td>
                    <td>慢性ストレス、睡眠障害、離婚・失業などの生活困難</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>遺伝的因子</strong>
                    </td>
                    <td>家族歴、特定遺伝子多型（SLC6A4、COMT等 — 研究段階）</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>性別</strong>
                    </td>
                    <td>女性（特に生殖年齢）にリスク高</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3>6.2 薬剤側因子</h3>
            <div className="tbl th-orange">
              <table>
                <thead>
                  <tr>
                    <th>リスクカテゴリー</th>
                    <th>具体的因子</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <strong>過用しやすい薬剤プロファイル</strong>
                    </td>
                    <td>市販薬（OTC）として容易に入手可能、即効性が高い</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>医療アクセス不良</strong>
                    </td>
                    <td>頭痛専門医不在、予防療法の未受診・未処方</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>患者教育不足</strong>
                    </td>
                    <td>MOHリスクについての説明がない</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* ============================================================ SECTION 7 */}
          <section id="s7" className="sec">
            <div className="sec-hd">
              <div className="sec-num">7</div>
              <h2 className="sec-title">診断アルゴリズム</h2>
            </div>

            <div className="alert a-danger">
              <span className="alert-i">🚨</span>
              <div>
                <strong>SNOOP4 レッドフラッグ確認が最優先：</strong>{" "}
                月15日以上の頭痛があっても、まず二次性頭痛（くも膜下出血・脳腫瘍・髄膜炎など）を除外することが必須です。レッドフラッグが一つでもあれば即座に画像検査を施行してください。
              </div>
            </div>

            <div className="mmd">
              <div className="mmd-lbl">
                診断アルゴリズム — SNOOP4確認 → 頻度評価 → 薬剤閾値チェック
              </div>
              <MermaidDiagram
                themeVariables={MOH_MERMAID_THEME}
                chart={`flowchart TD
START(["Node 🩺 頭痛患者が来院"]) --> Q1

Q1{"月に何日頭痛があるか？"}
Q1 -- "&lt;15日/月" --> LOW["現時点でMOHの\\n診断基準外\\n（再評価・経過観察）"]
Q1 -- "≥15日/月" --> Q2

Q2{"SNOOP4レッドフラッグを確認"}
Q2 -- "レッドフラッグあり" --> RED["🚨 緊急画像検査\\n（CT/MRI）を優先\\n二次性頭痛を除外"]
Q2 -- "レッドフラッグなし" --> Q3

Q3{"既存の原発性頭痛疾患\\n（片頭痛・TTHなど）の既往は？"}
Q3 -- "なし" --> DIFF["他の頭痛疾患を\\n鑑別診断"]
Q3 -- "あり" --> Q4

Q4{"急性期頭痛薬を\\n定期的に使用しているか？"}
Q4 -- "いいえ（または稀）" --> NOMED["慢性片頭痛など\\nMOH以外の診断を検討"]
Q4 -- "はい" --> Q5

Q5{"使用頻度と期間を確認\\n（30日頭痛日誌を参照）"}
Q5 --> DRUG_CHECK

DRUG_CHECK["📋 薬剤別閾値チェック\\n━━━━━━━━━━━━━━━━━━\\n✦ トリプタン・オピオイド・エルゴタミン\\n  → ≥10日/月 × &gt;3ヶ月\\n✦ 鎮痛薬（アセトアミノフェン・NSAIDs）\\n  → ≥15日/月 × &gt;3ヶ月\\n✦ 複合鎮痛薬\\n  → ≥10日/月 × &gt;3ヶ月"]

DRUG_CHECK --> Q6{"閾値を超えているか？"}
Q6 -- "いいえ" --> Q7{"複数薬剤の合計が\\n≥10日/月？"}
Q7 -- "いいえ" --> NOMED
Q7 -- "はい" --> MOH26["診断：8.2.6\\n複数薬剤過用頭痛\\n（個別未超過）"]

Q6 -- "はい" --> SUBTYPE

SUBTYPE["📌 サブタイプを特定\\n━━━━━━━━━━━━━━━━━━\\n8.2.1 エルゴタミン\\n8.2.2 トリプタン\\n8.2.3 非オピオイド鎮痛薬\\n8.2.4 オピオイド\\n8.2.5 複合鎮痛薬"]

SUBTYPE --> DUAL["二重診断の確認\\n例：1.3 慢性片頭痛\\n＋ 8.2.2 トリプタン過用頭痛"]
DUAL --> TREAT(["🩹 治療計画へ → STEP 1-5"])

style START fill:#4a90d9,color:#fff,font-weight:bold
style TREAT fill:#27ae60,color:#fff,font-weight:bold
style RED fill:#e74c3c,color:#fff,font-weight:bold
style DRUG_CHECK fill:#f39c12,color:#fff
style SUBTYPE fill:#8e44ad,color:#fff
style DUAL fill:#2980b9,color:#fff`}
              />
            </div>
          </section>

          {/* ============================================================ SECTION 8 */}
          <section id="s8" className="sec">
            <div className="sec-hd">
              <div className="sec-num">8</div>
              <h2 className="sec-title">治療戦略の全体像</h2>
            </div>

            <p>
              MOHの治療は<strong>5つのステップ</strong>
              からなる多モダリティアプローチが推奨されます。各ステップは独立して機能しながら、相互に補完し合う統合的な治療プランを構成します。
            </p>

            <div className="mmd">
              <div className="mmd-lbl">5ステップ治療戦略 — 多モダリティアプローチ</div>
              <MermaidDiagram
                themeVariables={MOH_MERMAID_THEME}
                chart={`flowchart LR
S1["🎓 STEP 1\\n患者教育\\n動機付け"]
S2["💊 STEP 2\\n過用薬剤\\n離脱"]
S3["🌉 STEP 3\\nブリッジング\\n療法"]
S4["🛡 STEP 4\\n予防薬\\n療法"]
S5["🧘 STEP 5\\n非薬物\\n行動療法"]

S1 --> S2 --> S3
S3 --> S4
S4 --> S5
S5 -.->|"3ヶ月後再評価"| EVAL(["📊 アウトカム評価\\nHIT-6 / MIDAS / VAS"])

style S1 fill:#3498db,color:#fff,font-weight:bold
style S2 fill:#e74c3c,color:#fff,font-weight:bold
style S3 fill:#e67e22,color:#fff,font-weight:bold
style S4 fill:#8e44ad,color:#fff,font-weight:bold
style S5 fill:#27ae60,color:#fff,font-weight:bold
style EVAL fill:#2c3e50,color:#fff`}
              />
            </div>

            <div className="phase-grid">
              <div className="ph ph2">
                <div className="ph-icon">🎓</div>
                <div className="ph-title">STEP 1</div>
                <div className="ph-time">患者教育・動機付け</div>
                <div className="ph-desc">
                  MOHのメカニズム説明、過用閾値の提示、治療同盟の構築、頭痛日誌開始
                </div>
              </div>
              <div className="ph ph3">
                <div className="ph-icon">💊</div>
                <div className="ph-title">STEP 2</div>
                <div className="ph-time">過用薬剤の離脱</div>
                <div className="ph-desc">
                  突然離脱（単純鎮痛薬・トリプタン）または漸減（オピオイド・バルビツール酸）
                </div>
              </div>
              <div className="ph ph1">
                <div className="ph-icon">🌉</div>
                <div className="ph-title">STEP 3</div>
                <div className="ph-time">ブリッジング療法</div>
                <div className="ph-desc">
                  離脱症状緩和のための橋渡し薬（ナプロキセン・プレドニゾロン・制吐剤など）
                </div>
              </div>
              <div className="ph ph4">
                <div className="ph-icon">🛡</div>
                <div className="ph-title">STEP 4</div>
                <div className="ph-time">予防薬療法</div>
                <div className="ph-desc">
                  トピラマート・プロプラノロール・CGRP mAbs・ボツリヌストキシンなど
                </div>
              </div>
              <div className="ph ph5">
                <div className="ph-icon">🧘</div>
                <div className="ph-title">STEP 5</div>
                <div className="ph-time">非薬物・行動療法</div>
                <div className="ph-desc">
                  CBT・バイオフィードバック・マインドフルネス・有酸素運動・栄養補助療法
                </div>
              </div>
            </div>
          </section>

          {/* ============================================================ SECTION 9 */}
          <section id="s9" className="sec">
            <div className="sec-hd">
              <div className="sec-num">9</div>
              <h2 className="sec-title">STEP 1 — 患者教育と動機付け</h2>
            </div>

            <div className="alert a-info">
              <span className="alert-i">📌</span>
              <div>
                <strong>ICHD-3より：</strong>{" "}
                「原因と結果についての簡潔な説明は本質的な管理の一部であり、パンフレット提供のみでも過用を防止・中止できる場合がある。」—
                教育なしの薬物離脱は再発リスクが高く、患者の協力なしには離脱自体が困難です。
              </div>
            </div>

            <h3>患者への説明ポイント（伝達スクリプト）</h3>
            <div className="card">
              <ul>
                <li>
                  <strong>ポイント①</strong>{" "}
                  「薬を飲めば飲むほど、脳が次の頭痛を作り出そうとします」—
                  中枢感作のメカニズムを平易に説明
                </li>
                <li style={{ marginTop: 10 }}>
                  <strong>ポイント②</strong>{" "}
                  「今使っている薬を一定期間やめると、最初は頭痛が一時的に悪くなりますが、それを乗り越えると改善します」—
                  離脱症状への事前準備
                </li>
                <li style={{ marginTop: 10 }}>
                  <strong>ポイント③</strong>{" "}
                  「頭痛薬は月10〜15日（薬の種類による）を超えて使うと危険です」— 具体的な閾値の提示
                </li>
                <li style={{ marginTop: 10 }}>
                  <strong>ポイント④</strong>{" "}
                  「一人で我慢する必要はありません。一緒に計画を立てましょう」— 治療同盟の構築
                </li>
              </ul>
            </div>

            <h3>動機付けツール</h3>
            <ul>
              <li>
                <strong>30日間頭痛日誌（Headache diary）の記録開始</strong> —
                治療前ベースライン確立に必須
              </li>
              <li>
                <strong>SDS（依存重症度スケール）</strong>を用いた依存傾向の評価
              </li>
              <li>
                <strong>HIT-6・MIDAS</strong>
                を用いた障害度の可視化（数値化することで患者の実感を促す）
              </li>
            </ul>
          </section>

          {/* ============================================================ SECTION 10 */}
          <section id="s10" className="sec">
            <div className="sec-hd">
              <div className="sec-num">10</div>
              <h2 className="sec-title">STEP 2 — 過用薬剤の離脱（Detoxification）</h2>
            </div>

            <h3>10.1 離脱方法の選択</h3>

            <div className="mmd">
              <div className="mmd-lbl">離脱方法の選択 — 薬剤種別による突然離脱 vs 漸減</div>
              <MermaidDiagram
                themeVariables={MOH_MERMAID_THEME}
                chart={`flowchart TD
A["過用薬剤の離脱開始"] --> B{"どの薬剤を過用しているか？"}

B -- "単純鎮痛薬\\n（アセトアミノフェン・NSAIDs）\\nトリプタン\\nエルゴタミン" --> C["🔴 突然離脱（Abrupt Withdrawal）\\n● 推奨される標準的アプローチ\\n● 外来設定でも実施可能\\n● 離脱期間：5〜10日"]

B -- "オピオイド\\nバルビツール酸（ブタルビタール）\\nベンゾジアゼピン\\nカフェイン大量配合製剤" --> D["🟡 段階的漸減（Gradual Tapering）\\n● 急激中断で重篤な離脱症状のリスク\\n● 10〜20%/週ずつ漸減\\n● 入院設定を考慮"]

C --> E["外来管理（多くのケースで適切）"]
D --> F{"依存度・症状の重症度？"}
F -- "軽〜中等度" --> E
F -- "重度・精神医学的併存疾患あり" --> G["入院管理\\n（専門施設）"]

E --> H["ブリッジング療法へ → STEP 3"]
G --> H

style C fill:#e74c3c,color:#fff
style D fill:#e67e22,color:#fff
style G fill:#8e44ad,color:#fff
style H fill:#27ae60,color:#fff`}
              />
            </div>

            <h3>10.2 離脱症状の予測と対処</h3>
            <div className="alert a-warn">
              <span className="alert-i">⚠️</span>
              <div>
                <strong>離脱頭痛を乗り越えることが重要：</strong>{" "}
                離脱開始後、多くの患者で一時的に頭痛が悪化します（離脱頭痛）。この段階を乗り越えることがMOH治療の最大の鍵です。事前に患者に十分な説明を行うことが不可欠です。
              </div>
            </div>
            <div className="tbl th-orange">
              <table>
                <thead>
                  <tr>
                    <th>離脱症状</th>
                    <th>発現時期</th>
                    <th>持続期間</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <strong>頭痛の一時的悪化</strong>
                    </td>
                    <td>離脱後2〜10日</td>
                    <td>
                      トリプタン：短め（2〜4日）/ 鎮痛薬：やや長め（5〜7日）/ オピオイド：最も長い
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <strong>悪心・嘔吐</strong>
                    </td>
                    <td>2〜5日</td>
                    <td>数日間</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>不眠</strong>
                    </td>
                    <td>全期間</td>
                    <td>2週間程度</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>不安・易刺激性</strong>
                    </td>
                    <td>2〜5日</td>
                    <td>数日間</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>血圧変動</strong>
                    </td>
                    <td>特にオピオイド離脱時</td>
                    <td>数日間</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* ============================================================ SECTION 11 */}
          <section id="s11" className="sec">
            <div className="sec-hd">
              <div className="sec-num">11</div>
              <h2 className="sec-title">STEP 3 — ブリッジング療法</h2>
            </div>

            <p>過用薬剤を中断した後の離脱症状を緩和するための「橋渡し」薬物療法です。</p>

            <h3>11.1 外来ブリッジング</h3>
            <div className="tbl th-teal">
              <table>
                <thead>
                  <tr>
                    <th>薬剤</th>
                    <th>用量・用法</th>
                    <th>エビデンス</th>
                    <th>注意事項</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <strong>ナプロキセン</strong>
                    </td>
                    <td>500mg 1日2回 × 10〜14日</td>
                    <td>
                      <span className="bB">Grade B</span>
                    </td>
                    <td>NSAIDs離脱の場合は使用不可</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>プレドニゾロン</strong>
                    </td>
                    <td>40〜60mg/日 × 5〜7日（漸減）</td>
                    <td>
                      <span className="bC">Grade C</span>
                    </td>
                    <td>効果はメタ解析で混在 — 短期のみ使用</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>メトクロプラミド（制吐剤）</strong>
                    </td>
                    <td>10mg 頓用または1日3回</td>
                    <td>
                      <span className="bB">Grade B</span>
                    </td>
                    <td>悪心・嘔吐管理に有効</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>オンダンセトロン</strong>
                    </td>
                    <td>4〜8mg 頓用</td>
                    <td>
                      <span className="bC">Grade C</span>
                    </td>
                    <td>嘔吐が強い場合</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>クロルプロマジン（経口）</strong>
                    </td>
                    <td>25〜50mg</td>
                    <td>
                      <span className="bU">Expert Opinion</span>
                    </td>
                    <td>難治例、鎮静作用あり — 転倒注意</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3>11.2 入院ブリッジング（重症例）</h3>
            <div className="tbl th-purple">
              <table>
                <thead>
                  <tr>
                    <th>薬剤</th>
                    <th>用量</th>
                    <th>エビデンス</th>
                    <th>特記</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <strong>IV ジヒドロエルゴタミン（DHE）</strong>
                    </td>
                    <td>0.5〜1mg IV q8h × 2〜3日</td>
                    <td>
                      <span className="bA">Grade A</span>
                    </td>
                    <td>ラスムッセン・プロトコル — 専門施設限定</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>IV マグネシウム硫酸塩</strong>
                    </td>
                    <td>1〜2g IV 緩徐投与</td>
                    <td>
                      <span className="bB">Grade B</span>
                    </td>
                    <td>妊婦の重症急性発作にも使用可</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>IV メトクロプラミド</strong>
                    </td>
                    <td>10mg IV</td>
                    <td>
                      <span className="bB">Grade B</span>
                    </td>
                    <td>制吐・鎮痛補助</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>IV バルプロ酸</strong>
                    </td>
                    <td>500〜1000mg IV</td>
                    <td>
                      <span className="bC">Grade C</span>
                    </td>
                    <td>
                      難治性 — <span className="bRed">妊婦禁忌</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* ============================================================ SECTION 12 */}
          <section id="s12" className="sec">
            <div className="sec-hd">
              <div className="sec-num">12</div>
              <h2 className="sec-title">STEP 4 — 予防薬療法</h2>
            </div>

            <div className="alert a-info">
              <span className="alert-i">📌</span>
              <div>
                <strong>パラダイムシフト：</strong>{" "}
                過去は「まず離脱してから予防薬開始」が通説でしたが、近年のエビデンスは
                <strong>離脱と同時並行での開始</strong>
                も有効であることを示しています（特にCGRP製剤）。MOHと慢性片頭痛の双方を同時に標的とする戦略が推奨されます。
              </div>
            </div>

            <h3>12.1 従来型予防薬（エビデンス順）</h3>
            <div className="tbl">
              <table>
                <thead>
                  <tr>
                    <th>薬剤</th>
                    <th>用量</th>
                    <th>MOHでのエビデンス</th>
                    <th>主な副作用・禁忌</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <strong>トピラマート</strong>
                    </td>
                    <td>50〜100mg/日（2回分割）</td>
                    <td>
                      <span className="bA">Grade A</span> MOHで特に有効
                    </td>
                    <td>
                      認知障害（ぼんやり感）、腎結石、体重減少、
                      <span className="bRed">妊婦禁忌（Category D）</span>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <strong>アミトリプチリン</strong>
                    </td>
                    <td>10〜75mg/日（就寝前）</td>
                    <td>
                      <span className="bB">Grade B</span>
                    </td>
                    <td>口渇・眠気・体重増加、QT延長、高齢者は10mgから開始</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>プロプラノロール</strong>
                    </td>
                    <td>40〜120mg/日（2回分割）</td>
                    <td>
                      <span className="bA">Grade A</span>
                    </td>
                    <td>気管支喘息禁忌、起立性低血圧、糖尿病患者は低血糖マスク注意</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>バルプロ酸</strong>
                    </td>
                    <td>500〜1500mg/日</td>
                    <td>
                      <span className="bA">Grade A</span>
                    </td>
                    <td>
                      <span className="bRed">妊婦絶対禁忌（Category X — REMS必要）</span>
                      、肝障害、体重増加
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <strong>フルナリジン</strong>
                      <br />
                      <small>（日本未承認）</small>
                    </td>
                    <td>5〜10mg/日（就寝前）</td>
                    <td>
                      <span className="bA">Grade A</span> (EHF)
                    </td>
                    <td>錐体外路症状、うつ</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3>12.2 ボツリヌストキシン（オナボツリヌストキシンA）</h3>
            <div className="card">
              <div className="tbl" style={{ margin: 0 }}>
                <table>
                  <thead>
                    <tr>
                      <th>項目</th>
                      <th>内容</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>対象</td>
                      <td>
                        <strong>慢性片頭痛 + MOH</strong>（PREEMPT プロトコル）
                      </td>
                    </tr>
                    <tr>
                      <td>用量</td>
                      <td>155〜195単位、31〜39箇所への頭頸部筋肉内注射</td>
                    </tr>
                    <tr>
                      <td>投与間隔</td>
                      <td>12週ごと</td>
                    </tr>
                    <tr>
                      <td>エビデンス</td>
                      <td>
                        <span className="bA">Grade A</span> — PREEMPT 1/2 試験（n=1384）で有効性確立
                      </td>
                    </tr>
                    <tr>
                      <td>特徴</td>
                      <td>MOHがある慢性片頭痛でも有効。過用薬剤なしでも使用可</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <h3>12.3 CGRP 関連製剤（最新・最重要）</h3>
            <p>
              <strong>CGRP製剤はMOH合併例でも有効性が示されている革新的薬剤群です。</strong>
            </p>

            <h4>予防的モノクローナル抗体（mAbs）</h4>
            <div className="drug-grid">
              <div className="drug">
                <div className="drug-nm">エレヌマブ（Aimovig）</div>
                <div className="drug-br">標的: CGRPr（受容体）</div>
                <div className="drug-tx">
                  <strong>用量:</strong> 70〜140mg SC 月1回
                  <br />
                  <strong>エビデンス:</strong> <span className="bA">Grade A</span>{" "}
                  REGAIN試験でMOH合併CM改善
                  <br />
                  <strong>副作用:</strong> 便秘・注射部位反応
                </div>
              </div>
              <div className="drug">
                <div className="drug-nm">フレマネズマブ（Ajovy）</div>
                <div className="drug-br">標的: CGRP（リガンド）</div>
                <div className="drug-tx">
                  <strong>用量:</strong> 225mg SC 月1回 または 675mg SC 3ヶ月1回
                  <br />
                  <strong>エビデンス:</strong> <span className="bA">Grade A</span> MOH合併でも有効
                  <br />
                  <strong>副作用:</strong> 注射部位反応
                </div>
              </div>
              <div className="drug">
                <div className="drug-nm">ガルカネズマブ（Emgality）</div>
                <div className="drug-br">標的: CGRP（リガンド）</div>
                <div className="drug-tx">
                  <strong>用量:</strong> 240mgローディング後 120mg SC 月1回
                  <br />
                  <strong>エビデンス:</strong> <span className="bA">Grade A</span>
                  <br />
                  <strong>副作用:</strong> 注射部位反応
                </div>
              </div>
              <div className="drug">
                <div className="drug-nm">エプチネズマブ（Vyepti）</div>
                <div className="drug-br">標的: CGRP（リガンド）</div>
                <div className="drug-tx">
                  <strong>用量:</strong> 100〜300mg IV 3ヶ月1回
                  <br />
                  <strong>エビデンス:</strong> <span className="bA">Grade A</span>
                  <br />
                  <strong>特徴:</strong> IV投与 — 即効性
                </div>
              </div>
            </div>

            <h4>急性期 CGRP gepants（二刀流薬剤あり）</h4>
            <div className="tbl th-teal">
              <table>
                <thead>
                  <tr>
                    <th>薬剤</th>
                    <th>承認</th>
                    <th>用量</th>
                    <th>MOH誘発リスク</th>
                    <th>特徴</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <strong>リメゲパント（Nurtec ODT）</strong>
                    </td>
                    <td>急性期＋予防（米国）</td>
                    <td>75mg ODT 隔日（予防）/ 頓用（急性）</td>
                    <td>
                      <span className="bGrn">低リスク</span>
                    </td>
                    <td>唯一の急性＋予防デュアル承認薬</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>ウブロゲパント（Ubrelvy）</strong>
                    </td>
                    <td>急性期</td>
                    <td>50〜100mg 頓用</td>
                    <td>
                      <span className="bGrn">低リスク</span>
                    </td>
                    <td>心血管安全性が高い</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>ザベゲパント（Zavzpret）</strong>
                    </td>
                    <td>急性期</td>
                    <td>10mg 鼻腔内</td>
                    <td>
                      <span className="bGrn">低リスク</span>
                    </td>
                    <td>最速発現（鼻腔内）</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* ============================================================ SECTION 13 */}
          <section id="s13" className="sec">
            <div className="sec-hd">
              <div className="sec-num">13</div>
              <h2 className="sec-title">STEP 5 — 非薬物療法・行動介入</h2>
            </div>

            <h3>13.1 根拠のある非薬物療法</h3>
            <div className="tbl th-teal">
              <table>
                <thead>
                  <tr>
                    <th>介入</th>
                    <th>エビデンス</th>
                    <th>概要</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <strong>認知行動療法（CBT）</strong>
                    </td>
                    <td>
                      <span className="bB">Grade B</span> (AAN/EHF)
                    </td>
                    <td>
                      頭痛に関連した破局化思考・回避行動の修正、薬物渇望への対処スキル構築。再発予防に特に有効
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <strong>バイオフィードバック</strong>
                    </td>
                    <td>
                      <span className="bB">Grade B</span> (AAN)
                    </td>
                    <td>
                      筋電図（EMG）または皮膚温フィードバックによる自律神経調節訓練。薬剤単独よりも組合せで相乗効果
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <strong>リラクゼーション訓練</strong>
                    </td>
                    <td>
                      <span className="bB">Grade B</span> (AAN)
                    </td>
                    <td>漸進的筋弛緩法、横隔膜呼吸、自律訓練法。自宅で継続可能</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>マインドフルネス瞑想（MBSR）</strong>
                    </td>
                    <td>
                      <span className="bC">Grade C</span>
                    </td>
                    <td>痛みへの注意制御、感情反応の調節。うつ・不安の併存にも有益</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>理学療法（頸椎アプローチ）</strong>
                    </td>
                    <td>
                      <span className="bB">Grade B</span>
                    </td>
                    <td>特に頸原性要因が関与する場合。手技療法＋運動療法の組合せ</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>有酸素運動</strong>
                    </td>
                    <td>
                      <span className="bB">Grade B</span>
                    </td>
                    <td>
                      週3〜5回 ×
                      30〜40分の中強度有酸素運動。内因性エンドルフィン・セロトニン分泌促進
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3>13.2 栄養・サプリメント療法</h3>
            <div className="tbl th-teal">
              <table>
                <thead>
                  <tr>
                    <th>サプリメント</th>
                    <th>用量</th>
                    <th>エビデンス</th>
                    <th>MOHへの意義</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <strong>マグネシウム（グリシン酸/クエン酸塩）</strong>
                    </td>
                    <td>400〜600mg/日</td>
                    <td>
                      <span className="bA">Grade A/B</span>
                    </td>
                    <td>中枢感作の軽減、三叉神経興奮閾値の上昇</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>リボフラビン（ビタミンB2）</strong>
                    </td>
                    <td>400mg/日</td>
                    <td>
                      <span className="bA">Grade A/B</span>
                    </td>
                    <td>ミトコンドリア機能改善（電子伝達系Complex I）</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>CoQ10（ユビキノール）</strong>
                    </td>
                    <td>300mg/日</td>
                    <td>
                      <span className="bB">Grade B</span>
                    </td>
                    <td>ミトコンドリアComplex I/III支持</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>メラトニン</strong>
                    </td>
                    <td>3mg（就寝前）</td>
                    <td>
                      <span className="bC">Grade C</span>
                    </td>
                    <td>睡眠障害関連頭痛、特に群発頭痛との共存時</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* ============================================================ SECTION 14 */}
          <section id="s14" className="sec">
            <div className="sec-hd">
              <div className="sec-num">14</div>
              <h2 className="sec-title">特殊集団への対応</h2>
            </div>

            <div className="alert a-danger">
              <span className="alert-i">🚨</span>
              <div>
                <strong>絶対禁忌薬剤（妊婦）：</strong> バルプロ酸（Category
                X）・トピラマート（Category
                D）・エルゴタミンは妊婦・妊娠可能性のある女性への投与が禁忌です。CGRP
                mAbsも原則回避推奨です。
              </div>
            </div>

            <h3>14.1 妊娠中・授乳中</h3>
            <div className="tbl th-red">
              <table>
                <thead>
                  <tr>
                    <th>薬剤カテゴリー</th>
                    <th>推奨</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>バルプロ酸</td>
                    <td>
                      🔴 <strong>絶対禁忌（Category X）</strong> — 胎児の重大催奇形性リスク
                    </td>
                  </tr>
                  <tr>
                    <td>トピラマート</td>
                    <td>
                      🔴 <strong>禁忌（Category D）</strong>
                    </td>
                  </tr>
                  <tr>
                    <td>エルゴタミン</td>
                    <td>
                      🔴 <strong>禁忌</strong>
                    </td>
                  </tr>
                  <tr>
                    <td>トリプタン</td>
                    <td>
                      🟡 <strong>注意使用</strong>
                      （スマトリプタン妊娠レジストリあり、リスク検討の上で使用）
                    </td>
                  </tr>
                  <tr>
                    <td>CGRP mAbs</td>
                    <td>
                      🟡 <strong>データ不十分</strong> — 原則回避推奨
                    </td>
                  </tr>
                  <tr>
                    <td>アセトアミノフェン</td>
                    <td>
                      🟢 <strong>急性期第一選択</strong>（最も安全性データ充実）
                    </td>
                  </tr>
                  <tr>
                    <td>IV マグネシウム硫酸塩</td>
                    <td>
                      🟢 <strong>重症急性発作で使用可</strong>
                    </td>
                  </tr>
                  <tr>
                    <td>非薬物療法（CBT・バイオフィードバック）</td>
                    <td>
                      🟢 <strong>積極的に活用</strong>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3>14.2 高齢者（65歳以上）</h3>
            <div className="tbl th-orange">
              <table>
                <thead>
                  <tr>
                    <th>考慮点</th>
                    <th>推奨事項</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>三環系抗うつ薬（アミトリプチリン）</td>
                    <td>
                      <strong>10mgから開始</strong>（起立性低血圧・転倒リスク）
                    </td>
                  </tr>
                  <tr>
                    <td>トピラマート</td>
                    <td>認知機能への影響を注意深くモニタリング</td>
                  </tr>
                  <tr>
                    <td>β遮断薬</td>
                    <td>徐脈・起立性低血圧・転倒に注意</td>
                  </tr>
                  <tr>
                    <td>オピオイド</td>
                    <td>
                      <strong>可能な限り回避</strong>（転倒・せん妄リスク）
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3>14.3 小児・思春期（12〜18歳）</h3>
            <div className="tbl th-teal">
              <table>
                <thead>
                  <tr>
                    <th>薬剤</th>
                    <th>推奨</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>イブプロフェン 10mg/kg</td>
                    <td>急性期第一選択</td>
                  </tr>
                  <tr>
                    <td>アセトアミノフェン 15mg/kg</td>
                    <td>急性期第一選択</td>
                  </tr>
                  <tr>
                    <td>スマトリプタン鼻腔内スプレー</td>
                    <td>
                      <strong>12歳以上で承認</strong>（最も普及）
                    </td>
                  </tr>
                  <tr>
                    <td>バルプロ酸（思春期女性）</td>
                    <td>体重増加・催奇形性についての十分なカウンセリングが必須</td>
                  </tr>
                  <tr>
                    <td>CGRP mAbs（思春期）</td>
                    <td>データ蓄積中 — 個別判断</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* ============================================================ SECTION 15 */}
          <section id="s15" className="sec">
            <div className="sec-hd">
              <div className="sec-num">15</div>
              <h2 className="sec-title">予後・再発予防</h2>
            </div>

            <h3>15.1 予後データ</h3>
            <div className="tbl th-teal">
              <table>
                <thead>
                  <tr>
                    <th>評価時期</th>
                    <th>改善率</th>
                    <th>再発率</th>
                    <th>データソース</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>離脱後3ヶ月</td>
                    <td>
                      <strong className="tG">60〜70%</strong>
                    </td>
                    <td>—</td>
                    <td>Diener et al., 1989; 複数コホート研究</td>
                  </tr>
                  <tr>
                    <td>離脱後1年</td>
                    <td>
                      <strong className="tG">50〜70%</strong>
                    </td>
                    <td>
                      <strong className="tO">25〜30%</strong>
                    </td>
                    <td>Schnider et al., 1996; Aaseth et al., 2011</td>
                  </tr>
                  <tr>
                    <td>離脱後5年</td>
                    <td>—</td>
                    <td>
                      <strong className="tR">40〜45%</strong>
                    </td>
                    <td>Schnider et al., 1996</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3>15.2 予後不良予測因子</h3>
            <div className="tbl th-red">
              <table>
                <thead>
                  <tr>
                    <th>予後不良因子</th>
                    <th>備考</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <strong>オピオイド・複合鎮痛薬の過用</strong>
                    </td>
                    <td>単純鎮痛薬・トリプタンよりも再発率が高い</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>MOH罹患期間が長い</strong>
                    </td>
                    <td>5年以上の慢性化</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>SDS（依存重症度スケール）スコア高値</strong>
                    </td>
                    <td>スコア高値は予後不良の有意な予測因子</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>うつ病・不安障害の未治療</strong>
                    </td>
                    <td>精神医学的併存疾患への介入が必須</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>社会的サポートの欠如</strong>
                    </td>
                    <td>再発時の受け皿が薬物頼りになりやすい</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>複数薬剤の同時過用（8.2.6/8.2.7）</strong>
                    </td>
                    <td>単一薬剤過用より複雑</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3>15.3 再発予防のための長期戦略</h3>
            <div className="mmd">
              <div className="mmd-lbl">再発予防のための長期戦略 — 離脱成功後のフォローアップ</div>
              <MermaidDiagram
                themeVariables={MOH_MERMAID_THEME}
                chart={`flowchart TD
A["✅ 離脱成功（頭痛日数≥50%減少）"]
A --> B["📅 定期フォローアップ体制の確立\\n（3・6・12ヶ月後の再評価）"]
B --> C["📓 頭痛日誌の継続記録\\n（過用再発の早期発見）"]
B --> D["🛡 予防薬の継続\\n（最低12〜24ヶ月）"]
B --> E["🧠 CBT・リラクゼーションの継続\\n（再発時の対処スキル）"]
B --> F["📋 限界日数の遵守\\n（急性期薬：月10日未満のルール）"]
C --> G{"過用再発の兆候？"}
G -- "なし" --> H["良好なコントロール状態維持"]
G -- "あり" --> I["🚨 早期介入\\n主治医への報告\\n離脱・治療計画の再検討"]

style A fill:#27ae60,color:#fff,font-weight:bold
style I fill:#e74c3c,color:#fff,font-weight:bold
style H fill:#2980b9,color:#fff`}
              />
            </div>
          </section>

          {/* ============================================================ SECTION 16 */}
          <section id="s16" className="sec">
            <div className="sec-hd">
              <div className="sec-num">16</div>
              <h2 className="sec-title">アウトカム評価ツール</h2>
            </div>

            <h3>16.1 必須評価ツール一覧</h3>
            <div className="tbl th-purple">
              <table>
                <thead>
                  <tr>
                    <th>ツール名</th>
                    <th>測定内容</th>
                    <th>カットオフ / 判定</th>
                    <th>評価タイミング</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <strong>HIT-6</strong>
                      <br />
                      <small>(Headache Impact Test)</small>
                    </td>
                    <td>頭痛による日常生活への影響</td>
                    <td>
                      <span className="bRed">≥60点 = 重度障害</span>
                    </td>
                    <td>治療前・3ヶ月後・6ヶ月後</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>MIDAS</strong>
                      <br />
                      <small>(Migraine Disability Assessment)</small>
                    </td>
                    <td>過去3ヶ月の日常活動消失日数</td>
                    <td>
                      <span className="bRed">≥21日 = Grade IV（最重度）</span>
                    </td>
                    <td>治療前・3ヶ月後</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>VAS / NRS</strong>
                    </td>
                    <td>疼痛強度 0〜10</td>
                    <td>2点以上の改善 = 臨床的有意差</td>
                    <td>発作ごと（発作時・ピーク時・治療後2h）</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>PGIC</strong>
                      <br />
                      <small>(Patient Global Impression of Change)</small>
                    </td>
                    <td>患者自身の包括的改善感</td>
                    <td>7段階評価（1=最大改善 〜 7=最大悪化）</td>
                    <td>3・6ヶ月後</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>SDS</strong>
                      <br />
                      <small>(Severity of Dependence Scale)</small>
                    </td>
                    <td>薬物依存重症度</td>
                    <td>スコア高値→予後不良因子</td>
                    <td>治療前</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>頭痛日誌</strong>
                    </td>
                    <td>頭痛日数・使用薬剤・疼痛強度・誘発因子</td>
                    <td>治療前30日間のベースライン必須</td>
                    <td>継続的（最低30日ベースライン → 維持期）</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3>16.2 治療成功の定義（目標値）</h3>
            <div className="tbl th-teal">
              <table>
                <thead>
                  <tr>
                    <th>目標</th>
                    <th>数値</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>頭痛日数の減少</td>
                    <td>
                      <strong>≥50%の減少</strong>（ベースラインから3ヶ月後）
                    </td>
                  </tr>
                  <tr>
                    <td>HIT-6スコア</td>
                    <td>
                      <strong>56点未満</strong>（重度障害からの離脱）
                    </td>
                  </tr>
                  <tr>
                    <td>月間急性期薬使用日数</td>
                    <td>
                      <strong>&lt;15日/月</strong>（NSAID/アセトアミノフェン）または
                      <strong>&lt;10日/月</strong>（トリプタン）
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* ============================================================ SECTION 17 */}
          <section id="s17" className="sec">
            <div className="sec-hd">
              <div className="sec-num">17</div>
              <h2 className="sec-title">エビデンスサマリー</h2>
            </div>

            <div className="alert a-ok">
              <span className="alert-i">✅</span>
              <div>
                以下は AAN・EHF・NICE・Cochrane
                のコンセンサスに基づくエビデンスグレードのまとめです。すべて国際的に認可された機関の推奨に基づいています。
              </div>
            </div>

            <div className="tbl">
              <table>
                <thead>
                  <tr>
                    <th>介入</th>
                    <th>エビデンスグレード</th>
                    <th>推奨出典</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>オナボツリヌストキシンA（慢性片頭痛+MOH）</td>
                    <td>
                      <span className="bA">Grade A</span>
                    </td>
                    <td>AAN/AHS 2016, NICE CG150</td>
                  </tr>
                  <tr>
                    <td>トピラマート（MOH合併予防）</td>
                    <td>
                      <span className="bA">Grade A</span>
                    </td>
                    <td>AAN, EHF</td>
                  </tr>
                  <tr>
                    <td>CGRP mAbs（MOH合併CM）</td>
                    <td>
                      <span className="bA">Grade A</span>
                    </td>
                    <td>EHF 2022 Guideline (PMC9188162)</td>
                  </tr>
                  <tr>
                    <td>プロプラノロール</td>
                    <td>
                      <span className="bA">Grade A</span>
                    </td>
                    <td>AAN</td>
                  </tr>
                  <tr>
                    <td>バルプロ酸</td>
                    <td>
                      <span className="bA">Grade A</span>
                    </td>
                    <td>
                      AAN（<span className="bRed">妊婦禁忌</span>）
                    </td>
                  </tr>
                  <tr>
                    <td>IV DHE（入院ブリッジング）</td>
                    <td>
                      <span className="bA">Grade A</span>
                    </td>
                    <td>AAN（専門施設限定）</td>
                  </tr>
                  <tr>
                    <td>患者教育・Brief intervention（プライマリケア）</td>
                    <td>
                      <span className="bA">Grade A</span>
                    </td>
                    <td>BIMOH試験（BMJ 2015, Neurology 2016）</td>
                  </tr>
                  <tr>
                    <td>アミトリプチリン</td>
                    <td>
                      <span className="bB">Grade B</span>
                    </td>
                    <td>AAN, EHF</td>
                  </tr>
                  <tr>
                    <td>認知行動療法（CBT）</td>
                    <td>
                      <span className="bB">Grade B</span>
                    </td>
                    <td>AAN, Cochrane</td>
                  </tr>
                  <tr>
                    <td>バイオフィードバック</td>
                    <td>
                      <span className="bB">Grade B</span>
                    </td>
                    <td>AAN, Cochrane</td>
                  </tr>
                  <tr>
                    <td>マグネシウム（予防）</td>
                    <td>
                      <span className="bA">Grade A/B</span>
                    </td>
                    <td>AAN, EHF, Cochrane 2025</td>
                  </tr>
                  <tr>
                    <td>リボフラビン 400mg</td>
                    <td>
                      <span className="bA">Grade A/B</span>
                    </td>
                    <td>AAN, EHF</td>
                  </tr>
                  <tr>
                    <td>CoQ10 300mg</td>
                    <td>
                      <span className="bB">Grade B</span>
                    </td>
                    <td>EHF</td>
                  </tr>
                  <tr>
                    <td>短期プレドニゾロン（ブリッジング）</td>
                    <td>
                      <span className="bC">Grade C</span>
                    </td>
                    <td>EHF（混在したメタ解析結果）</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3>エビデンスグレード定義</h3>
            <div className="tbl th-teal">
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
                    <td>複数の良質な RCT またはメタ解析で裏付けられた強い推奨</td>
                  </tr>
                  <tr>
                    <td>
                      <span className="bB">Grade B</span>
                    </td>
                    <td>限られた RCT または質の高い観察研究に基づく推奨</td>
                  </tr>
                  <tr>
                    <td>
                      <span className="bC">Grade C</span>
                    </td>
                    <td>専門家コンセンサスまたは小規模研究に基づく弱い推奨</td>
                  </tr>
                  <tr>
                    <td>
                      <span className="bU">Expert Opinion</span>
                    </td>
                    <td>エビデンスに乏しいが専門医の臨床経験に基づく</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* ============================================================ SECTION 18 */}
          <section id="s18" className="sec">
            <div className="sec-hd">
              <div className="sec-num">18</div>
              <h2 className="sec-title">参考文献・ソースURL</h2>
            </div>

            <div className="alert a-ok">
              <span className="alert-i">✅</span>
              <div>
                以下はすべて国際的に認可された機関・ジャーナルからのソースです。URLはすべて2025年時点でアクセス可能なものを掲載しています。
              </div>
            </div>

            <h3>A. 診断基準（ICHD-3）</h3>
            <div className="src-grid">
              <div className="src">
                <div className="src-org">IHS / ICHD-3</div>
                <div className="src-t">ICHD-3 公式サイト（全文閲覧可）</div>
                <Ext className="src-url" href="https://ichd-3.org/">
                  https://ichd-3.org/
                </Ext>
              </div>
              <div className="src">
                <div className="src-org">IHS / Cephalalgia 2018</div>
                <div className="src-t">ICHD-3 全文PDF（Cephalalgia 2018）— 8.2 MOH診断基準</div>
                <Ext
                  className="src-url"
                  href="https://ichd-3.org/wp-content/uploads/2018/01/The-International-Classification-of-Headache-Disorders-3rd-Edition-2018.pdf"
                >
                  ichd-3.org/…/ICHD-3-Edition-2018.pdf
                </Ext>
              </div>
              <div className="src">
                <div className="src-org">IHS</div>
                <div className="src-t">IHS 分類委員会（ICHD-4最新動向）</div>
                <Ext
                  className="src-url"
                  href="https://ihs-headache.org/en/about-ihs/standing-committees/classification/"
                >
                  ihs-headache.org/…/classification/
                </Ext>
              </div>
            </div>

            <h3>B. 臨床ガイドライン</h3>
            <div className="src-grid">
              <div className="src">
                <div className="src-org">AAN</div>
                <div className="src-t">AAN 頭痛ガイドライン一覧</div>
                <Ext className="src-url" href="https://www.aan.com/guidelines/">
                  https://www.aan.com/guidelines/
                </Ext>
              </div>
              <div className="src">
                <div className="src-org">AAN / AHS</div>
                <div className="src-t">AAN/AHS 片頭痛予防ガイドライン（PDF）</div>
                <Ext
                  className="src-url"
                  href="https://www.aan.com/guidelines/home/getguidelinecontent/545"
                >
                  aan.com/guidelines/…/545
                </Ext>
              </div>
              <div className="src">
                <div className="src-org">AAN 2024 Draft</div>
                <div className="src-t">AAN 2024年予防療法ドラフト（公開レビュー用）</div>
                <Ext
                  className="src-url"
                  href="https://www.aan.com/siteassets/home-page/policy-and-guidelines/guidelines/guidelines-and-measures-open-for-public-comment/24-pharmacologic-treatment-for-migraine-prevention-in-adults_draft_08-14-2024.pdf"
                >
                  aan.com/…/pharmacologic-treatment-draft-2024.pdf
                </Ext>
              </div>
              <div className="src">
                <div className="src-org">EHF 2022</div>
                <div className="src-t">EHF CGRP mAbs 予防療法ガイドライン 2022（PMC全文）</div>
                <Ext
                  className="src-url"
                  href="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC9188162/"
                >
                  https://www.ncbi.nlm.nih.gov/pmc/articles/PMC9188162/
                </Ext>
              </div>
              <div className="src">
                <div className="src-org">EHF 2022</div>
                <div className="src-t">EHF トリプタン治療コンセンサス 2022</div>
                <Ext
                  className="src-url"
                  href="https://link.springer.com/article/10.1186/s10194-022-01502-z"
                >
                  link.springer.com/…/s10194-022-01502-z
                </Ext>
              </div>
              <div className="src">
                <div className="src-org">NICE</div>
                <div className="src-t">NICE 頭痛ガイドライン CG150（英国）</div>
                <Ext className="src-url" href="https://www.nice.org.uk/guidance/cg150">
                  https://www.nice.org.uk/guidance/cg150
                </Ext>
              </div>
              <div className="src">
                <div className="src-org">IHS / Cephalalgia 2024</div>
                <div className="src-t">IHS 急性期治療推奨 2024（Cephalalgia誌全文）</div>
                <Ext
                  className="src-url"
                  href="https://journals.sagepub.com/doi/10.1177/03331024241252666"
                >
                  journals.sagepub.com/doi/10.1177/03331024241252666
                </Ext>
              </div>
            </div>

            <h3>C. Cochrane エビデンスレビュー</h3>
            <div className="src-grid">
              <div className="src">
                <div className="src-org">Cochrane Library</div>
                <div className="src-t">Cochrane 頭痛・片頭痛レビュー検索</div>
                <Ext
                  className="src-url"
                  href="https://www.cochranelibrary.com/search?query=headache+migraine&searchBy=3&type=cdsr"
                >
                  cochranelibrary.com/search?query=headache+migraine
                </Ext>
              </div>
              <div className="src">
                <div className="src-org">Cochrane 2025</div>
                <div className="src-t">マグネシウム補充 片頭痛予防（2025年最新）</div>
                <Ext
                  className="src-url"
                  href="https://www.cochranelibrary.com/cdsr/doi/10.1002/14651858.CD016307"
                >
                  cochranelibrary.com/…/CD016307
                </Ext>
              </div>
              <div className="src">
                <div className="src-org">Cochrane</div>
                <div className="src-t">心理療法（CBT/バイオフィードバック）片頭痛予防</div>
                <Ext
                  className="src-url"
                  href="https://www.cochranelibrary.com/cdsr/doi/10.1002/14651858.CD012295.pub2/full"
                >
                  cochranelibrary.com/…/CD012295.pub2
                </Ext>
              </div>
              <div className="src">
                <div className="src-org">Cochrane</div>
                <div className="src-t">ボツリヌストキシン 慢性片頭痛予防</div>
                <Ext
                  className="src-url"
                  href="https://www.cochranelibrary.com/cdsr/doi/10.1002/14651858.CD011914"
                >
                  cochranelibrary.com/…/CD011914
                </Ext>
              </div>
            </div>

            <h3>D. 主要専門誌・データベース</h3>
            <div className="src-grid">
              <div className="src">
                <div className="src-org">EHF Official Journal</div>
                <div className="src-t">Journal of Headache and Pain（EHF公式誌・OA）</div>
                <Ext
                  className="src-url"
                  href="https://thejournalofheadacheandpain.biomedcentral.com/"
                >
                  https://thejournalofheadacheandpain.biomedcentral.com/
                </Ext>
              </div>
              <div className="src">
                <div className="src-org">IHS Official Journal</div>
                <div className="src-t">Cephalalgia（IHS公式誌）</div>
                <Ext className="src-url" href="https://journals.sagepub.com/home/cep">
                  https://journals.sagepub.com/home/cep
                </Ext>
              </div>
              <div className="src">
                <div className="src-org">PubMed / NCBI</div>
                <div className="src-t">PubMed 薬剤過用頭痛 RCT 専用検索</div>
                <Ext
                  className="src-url"
                  href="https://pubmed.ncbi.nlm.nih.gov/?term=medication+overuse+headache&filter=pubt.clinicaltrials"
                >
                  pubmed.ncbi.nlm.nih.gov/?term=medication+overuse+headache
                </Ext>
              </div>
              <div className="src">
                <div className="src-org">ClinicalTrials.gov</div>
                <div className="src-t">ClinicalTrials.gov（MOH関連試験）</div>
                <Ext
                  className="src-url"
                  href="https://clinicaltrials.gov/search?cond=Medication+Overuse+Headache"
                >
                  clinicaltrials.gov/search?cond=Medication+Overuse+Headache
                </Ext>
              </div>
            </div>

            <h3>E. 主要一次文献（精選）</h3>
            <div className="tbl">
              <table>
                <thead>
                  <tr>
                    <th>著者・年</th>
                    <th>タイトル（要旨）</th>
                    <th>掲載誌</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Diener HC et al., 1989</td>
                    <td>鎮痛薬誘発性頭痛：離脱療法の長期結果</td>
                    <td>
                      <em>J Neurol</em> 236: 9–14
                    </td>
                  </tr>
                  <tr>
                    <td>Schnider P et al., 1996</td>
                    <td>入院離脱後5年フォローアップ</td>
                    <td>
                      <em>Cephalalgia</em> 16: 481–485
                    </td>
                  </tr>
                  <tr>
                    <td>Kristoffersen ES et al., 2015 (BIMOH)</td>
                    <td>プライマリケアでの簡潔介入RCT</td>
                    <td>
                      <em>J Neurol Neurosurg Psychiatry</em> 86: 505–512
                    </td>
                  </tr>
                  <tr>
                    <td>Kristoffersen ES et al., 2016</td>
                    <td>BIMOH研究6ヶ月フォローアップ</td>
                    <td>
                      <em>J Neurol</em> 263: 344–353
                    </td>
                  </tr>
                  <tr>
                    <td>Aaseth K et al., 2011</td>
                    <td>二次性慢性頭痛の3年フォローアップ（Akershus研究）</td>
                    <td>
                      <em>Eur J Pain</em> 15: 186–192
                    </td>
                  </tr>
                  <tr>
                    <td>Limmroth V et al., 2002</td>
                    <td>異なる急性期薬過用後のMOH特徴</td>
                    <td>
                      <em>Neurology</em> 59: 1011–1014
                    </td>
                  </tr>
                  <tr>
                    <td>Grande RB et al., 2009</td>
                    <td>SDSスコアとMOH検出（Akershus研究）</td>
                    <td>
                      <em>J Neurol Neurosurg Psychiatry</em> 80: 784–789
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p style={{ fontSize: 12, color: "var(--g6)", marginTop: 24 }}>
              本ガイドは ICHD-3（IHS, 2018）、AAN/AHS ガイドライン、EHF 2022ガイドライン、NICE
              CG150、Cochrane Library
              の内容に基づき作成されました。最終更新参照基準日：2025年8月。個別臨床判断は必ず専門医との相談の上で行ってください。
            </p>
          </section>
        </main>
      </div>

      {/* FOOTER */}
      <div className="footer">
        <strong>薬剤過用頭痛（MOH）完全ガイド</strong> — 国際エビデンス（ICHD-3 / AAN / EHF / NICE
        2024）に基づく
        <br />📅 作成年: 2025年 | 次回レビュー推奨: ICHD-4 正式発行時・AAN/EHF
        年次ガイドライン更新時
        <br />
        ⚠️
        本資料は学術・教育・研究目的のみを対象としています。臨床への適用は必ず資格を持つ医療専門家の監督のもとで行ってください。
      </div>
    </div>
  );
}
