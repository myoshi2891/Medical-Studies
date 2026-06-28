import AutoGlossary from "@/components/glossary/AutoGlossary";
import "./headache-diary.css";
import { Ext } from "@/components/Ext";
import MermaidDiagram from "@/components/MermaidDiagram";
import HeadacheDiarySidebar from "@/components/prom/HeadacheDiarySidebar";

const DIARY_MERMAID_THEME = {
  primaryColor: "#eee6e1",
  primaryTextColor: "#3e2723",
  primaryBorderColor: "#6d4c41",
  lineColor: "#546e7a",
  secondaryColor: "#e0f2f1",
  tertiaryColor: "#e8f5e9",
  edgeLabelBackground: "#ffffff",
  fontSize: "13px",
};

export default function HeadacheDiaryPage() {
  return (
    <div className="headache-diary-accent">
      {/* HERO */}
      <div className="hero">
        <div>📔</div>
        <h1>頭痛日誌（Headache Diary）完全ガイド</h1>
        <p className="hero-sub">
          初学者向けステップバイステップ解説 — 国際エビデンス準拠（ICHD-3 / IHS / AAN / VA-DoD）
        </p>
        <div className="hero-tags">
          <span className="hero-tag">ICHD-3</span>
          <span className="hero-tag">IHS 臨床試験標準</span>
          <span className="hero-tag">MOH 監視</span>
          <span className="hero-tag">初学者向け</span>
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
        <HeadacheDiarySidebar />

        <main className="main">
          <AutoGlossary>
            {/* ====================================================== SECTION 1 */}
            <section id="s1" className="sec">
              <div className="sec-hd">
                <div className="sec-num">1</div>
                <h2 className="sec-title">SNOOP4 レッドフラッグスクリーニング（最優先評価）</h2>
              </div>

              <div className="alert a-danger">
                <div className="alert-i">⛔</div>
                <div>
                  以下の兆候がある場合は、
                  <strong>頭痛日誌の開始より前に緊急医療評価（CT/MRI）が必要</strong>
                  です。頭痛日誌はあくまでも一次性頭痛の管理ツールであり、二次性頭痛の除外は医師が行います。
                </div>
              </div>

              <div className="tbl th-red">
                <table>
                  <thead>
                    <tr>
                      <th>記号</th>
                      <th>意味</th>
                      <th>具体的な警戒徴候</th>
                      <th>鑑別すべき緊急疾患</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <strong className="tR">S</strong>
                      </td>
                      <td>Systemic symptoms</td>
                      <td>発熱・項部硬直・体重減少・免疫不全・悪性腫瘍既往</td>
                      <td>細菌性髄膜炎・脳炎・悪性腫瘍</td>
                    </tr>
                    <tr>
                      <td>
                        <strong className="tR">N</strong>
                      </td>
                      <td>Neurological deficits</td>
                      <td>麻痺・感覚障害・失語・複視・意識障害・認知変化</td>
                      <td>脳卒中・脳腫瘍・硬膜下血腫</td>
                    </tr>
                    <tr>
                      <td>
                        <strong className="tR">O</strong>
                      </td>
                      <td>Onset sudden</td>
                      <td>「人生最悪の頭痛」・雷鳴頭痛（thunderclap headache）</td>
                      <td>くも膜下出血（SAH）</td>
                    </tr>
                    <tr>
                      <td>
                        <strong className="tR">O</strong>
                      </td>
                      <td>Onset after age 50</td>
                      <td>50歳以降の新規頭痛</td>
                      <td>側頭動脈炎・頭蓋内病変</td>
                    </tr>
                    <tr>
                      <td>
                        <strong className="tR">P</strong>
                      </td>
                      <td>Pattern change</td>
                      <td>進行性の悪化・外傷後・体位依存性（臥位悪化→ICP↑、立位悪化→ICP↓）</td>
                      <td>頭蓋内圧亢進症・低髄液圧症</td>
                    </tr>
                    <tr>
                      <td>
                        <strong className="tR">4</strong>
                      </td>
                      <td>4つのP</td>
                      <td>
                        Papilledema（乳頭浮腫）/ Postdural（硬膜穿刺後）/ Post-seizure（痙攣後）/
                        Pregnancy・Postpartum（妊娠・産後）
                      </td>
                      <td>各病態に応じた緊急評価</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="alert a-info">
                <div className="alert-i">📌</div>
                <div>
                  <strong>ソース</strong>：ICHD-3 How to Use the Classification —{" "}
                  <Ext href="https://ichd-3.org/how-to-use-the-classification/">ichd-3.org</Ext>
                </div>
              </div>
            </section>

            {/* ====================================================== SECTION 2 */}
            <section id="s2" className="sec">
              <div className="sec-hd">
                <div className="sec-num">2</div>
                <h2 className="sec-title">頭痛日誌とは何か — 定義と意義</h2>
              </div>

              <h3>2.1 定義</h3>
              <div className="card">
                <p>
                  <strong>頭痛日誌（Headache Diary）</strong>{" "}
                  とは、患者が頭痛発作ごとに症状・随伴症状・薬剤使用・誘発因子・日常機能への影響を体系的に記録する
                  <strong>プロスペクティブ（前向き）</strong>な自己記録ツールです。
                </p>
                <p>
                  ICHD-3（国際頭痛分類第3版）は、複数の頭痛タイプが疑われる患者に対して、診断精度の向上と薬剤消費量の正確な把握のために頭痛日誌の使用を
                  <strong>明示的に推奨</strong>しています。
                </p>
              </div>

              <div className="alert a-info">
                <div className="alert-i">📖</div>
                <div>
                  <em>
                    「患者が2種類以上の頭痛タイプまたはサブタイプを有すると疑われる場合、各頭痛エピソードの重要な特徴を記録した診断的頭痛日誌を記載することを強く推奨する。頭痛日誌が診断精度を向上させ、薬剤消費量のより正確な評価を可能にすることが示されている」
                  </em>
                  <br />— ICHD-3 How to Use the Classification, ichd-3.org
                </div>
              </div>

              <h3>2.2 頭痛日誌の5つの核心的役割</h3>
              <div className="tbl">
                <table>
                  <thead>
                    <tr>
                      <th>役割</th>
                      <th>具体的機能</th>
                      <th>対応するエビデンス</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <strong>①診断精度の向上</strong>
                      </td>
                      <td>主観的症状を客観的データに変換 → ICHD-3診断基準との照合</td>
                      <td>感度92%（片頭痛）、87%（MOH）[PubMed: 18624804]</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>②薬剤過用頭痛（MOH）の早期検出</strong>
                      </td>
                      <td>月あたり使用日数のリアルタイム監視 → 8〜10日/月の閾値超過を可視化</td>
                      <td>ICHD-3 コード 8.2 準拠</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>③トリガーの同定</strong>
                      </td>
                      <td>発症前24〜48時間の環境・食事・睡眠・ホルモン変化との相関分析</td>
                      <td>N1-Headache App: 個人特有トリガー同定 [ClinicalTrials NCT05979285]</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>④治療効果の定量化</strong>
                      </td>
                      <td>ベースライン比較による50%改善基準の客観的評価</td>
                      <td>IHS臨床試験ガイドライン準拠</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>⑤医師との情報共有</strong>
                      </td>
                      <td>記憶依存バイアスの排除 → 診察時の正確なデータ提示</td>
                      <td>VA/DoD CPG 2023</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* ====================================================== SECTION 3 */}
            <section id="s3" className="sec">
              <div className="sec-hd">
                <div className="sec-num">3</div>
                <h2 className="sec-title">なぜ頭痛日誌が必要なのか — エビデンスの全体像</h2>
              </div>

              <h3>3.1 診断精度の向上</h3>
              <div className="tbl">
                <table>
                  <thead>
                    <tr>
                      <th>研究</th>
                      <th>対象</th>
                      <th>主な知見</th>
                      <th>エビデンスレベル</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        Valade D et al., 2008 (<em>Cephalalgia</em>)
                      </td>
                      <td>頭痛センター初診患者 n=76</td>
                      <td>
                        片頭痛感度92%・TTH感度75%・MOH感度75%（臨床面接との比較）；コンプライアンス71%
                      </td>
                      <td>
                        <span className="bB">Grade B</span>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        Vandenbussche N et al., 2025 (<em>Neurol Int</em>)
                      </td>
                      <td>27名・90日間スマートフォン日誌</td>
                      <td>「確実な片頭痛」の新規ICHD-3症状を患者の97%以上で追加検出</td>
                      <td>
                        <span className="bB">Grade B</span>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        Peng KP et al., 2024 (<em>J Headache Pain</em>)
                      </td>
                      <td>AI診断モデル 59名（多施設前向き）</td>
                      <td>最低1ヶ月の頭痛日誌が正解診断のゴールドスタンダードとして機能</td>
                      <td>
                        <span className="bB">Grade B</span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <h3>3.2 診断における「記憶バイアス」の問題</h3>
              <p>後ろ向き（回顧的）なデータ収集は、以下の理由で不正確です。</p>
              <div className="mmd">
                <div className="mmd-lbl">フローチャート — 記憶バイアスが診断を歪めるメカニズム</div>
                <MermaidDiagram
                  themeVariables={DIARY_MERMAID_THEME}
                  chart={`flowchart LR
A["患者の記憶"] --> B["頭痛頻度の<br/>過大評価"]
A --> C["頭痛頻度の<br/>過小評価"]
A --> D["薬剤使用量の<br/>不正確な報告"]
A --> E["トリガー同定の<br/>失敗"]
B --> F["診断エラー<br/>治療選択の誤り"]
C --> F
D --> F
E --> F
F --> G["頭痛日誌による<br/>リアルタイム記録で解決"]
style F fill:#e74c3c,color:#fff
style G fill:#27ae60,color:#fff`}
                />
              </div>

              <h3>3.3 MOH検出における決定的役割</h3>
              <p>
                <strong>薬剤過用頭痛（MOH, ICHD-3コード8.2）</strong>{" "}
                の診断は、月あたりの薬剤使用日数の客観的記録なしには確定できません。
              </p>
              <div className="tbl">
                <table>
                  <thead>
                    <tr>
                      <th>薬剤種別</th>
                      <th>MOH閾値</th>
                      <th>日誌なしの検出率</th>
                      <th>日誌ありの検出率</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>トリプタン・エルゴタミン・オピオイド</td>
                      <td>
                        <strong className="tR">≥10日/月</strong> × 3ヶ月
                      </td>
                      <td>低い（患者自身も気づいていないことが多い）</td>
                      <td>スクリーニング感度95.2%（ICHD基準の自己報告版）[PubMed: PMC3850931]</td>
                    </tr>
                    <tr>
                      <td>単純鎮痛薬・NSAIDs</td>
                      <td>
                        <strong className="tR">≥15日/月</strong> × 3ヶ月
                      </td>
                      <td>低い</td>
                      <td>高い</td>
                    </tr>
                    <tr>
                      <td>複合鎮痛薬</td>
                      <td>
                        <strong className="tR">≥10日/月</strong> × 3ヶ月
                      </td>
                      <td>低い</td>
                      <td>高い</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <h3>3.4 IHS臨床試験ガイドラインにおける中心的役割</h3>
              <p>
                国際頭痛学会（IHS）の臨床試験ガイドライン（第4版, <em>Cephalalgia</em>{" "}
                2024）は、すべての片頭痛予防・急性期治療試験において
                <strong>電子頭痛日誌（e-diary）を標準的な主要エンドポイント収集ツール</strong>
                として指定しています。
              </p>
              <div className="alert a-info">
                <div className="alert-i">📌</div>
                <div>
                  <strong>ソース</strong>：IHS Guidelines —{" "}
                  <Ext href="https://ihs-headache.org/en/resources/guidelines/">
                    ihs-headache.org/en/resources/guidelines/
                  </Ext>
                </div>
              </div>
            </section>

            {/* ====================================================== SECTION 4 */}
            <section id="s4" className="sec">
              <div className="sec-hd">
                <div className="sec-num">4</div>
                <h2 className="sec-title">STEP 1：記録の準備</h2>
              </div>

              <h3>4.1 日誌開始の適応フローチャート</h3>
              <div className="mmd">
                <div className="mmd-lbl">フローチャート — 頭痛日誌を開始すべきか判断する</div>
                <MermaidDiagram
                  themeVariables={DIARY_MERMAID_THEME}
                  chart={`flowchart TD
A["頭痛症状の初診・評価"] --> B{"SNOOP4 レッドフラッグ評価"}
B -- "いずれかに該当" --> C["⛔ 緊急神経学的評価へ<br/>CT/MRI を優先実施"]
B -- "該当なし" --> D{"頭痛の特徴"}
D -- "1ヶ月に1〜2回未満・軽度" --> E["経過観察<br/>（日誌は推奨だが任意）"]
D -- "1ヶ月に2回以上<br/>または日常生活に支障" --> F["✅ 頭痛日誌の開始を強く推奨"]
D -- "診断が不明確<br/>または複数の頭痛タイプの疑い" --> F
D -- "薬剤使用頻度が高い" --> F
F --> G["最低30日間の<br/>ベースライン記録を開始"]
G --> H["ICHD-3診断基準との照合<br/>（専門医との共同評価）"]
H --> I["治療計画の策定"]
style C fill:#e74c3c,color:#fff
style F fill:#27ae60,color:#fff
style G fill:#2980b9,color:#fff`}
                />
              </div>

              <h3>4.2 必要なもの（紙版の場合）</h3>
              <div className="tbl">
                <table>
                  <thead>
                    <tr>
                      <th>アイテム</th>
                      <th>推奨仕様</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <strong>記録ノートまたは印刷用紙</strong>
                      </td>
                      <td>A4またはA5；月ごとの一覧表形式が望ましい</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>ペン</strong>
                      </td>
                      <td>素早く記入できる油性ボールペン</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>定規・カレンダー</strong>
                      </td>
                      <td>月・日の確認用</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>NRSカード</strong>
                      </td>
                      <td>0〜10の数値評価スケールのリファレンスカード（オプション）</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="alert a-ok">
                <div className="alert-i">📌</div>
                <div>
                  <strong>推奨テンプレート（PDF・無料）</strong>：
                  <ul>
                    <li>
                      VA/DoD 7日間頭痛日誌（2024年最新版）：
                      <Ext href="https://www.healthquality.va.gov/guidelines/pain/headache/HA-Diary-7-Day-Diary-Final-11Jan2024.pdf">
                        healthquality.va.gov
                      </Ext>
                    </li>
                    <li>
                      VA/DoD 3ヶ月頭痛日誌（2024年最新版）：
                      <Ext href="https://www.healthquality.va.gov/guidelines/Pain/headache/">
                        healthquality.va.gov
                      </Ext>
                    </li>
                    <li>
                      IHS患者リソース：
                      <Ext href="https://ihs-headache.org/en/resources/patient-resources/">
                        ihs-headache.org
                      </Ext>
                    </li>
                    <li>
                      Migraine Trust 日誌リソース：
                      <Ext href="https://migrainetrust.org/live-with-migraine/self-management/keeping-a-migraine-diary/">
                        migrainetrust.org
                      </Ext>
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            {/* ====================================================== SECTION 5 */}
            <section id="s5" className="sec">
              <div className="sec-hd">
                <div className="sec-num">5</div>
                <h2 className="sec-title">STEP 2：記録項目の全体理解</h2>
              </div>

              <h3>5.1 記録項目マップ（全体像）</h3>
              <div className="mmd">
                <div className="mmd-lbl">マインドマップ — 頭痛日誌で記録する6カテゴリー</div>
                <MermaidDiagram
                  themeVariables={DIARY_MERMAID_THEME}
                  chart={`mindmap
  root((頭痛日誌<br/>記録項目))
    A[頭痛の特性]
      A1[発症日時・終了時刻]
      A2[持続時間]
      A3[痛みの部位]
      A4[痛みの性状]
    B[重症度]
      B1[NRS 0-10 発症時]
      B2[NRS 0-10 ピーク時]
      B3[NRS 0-10 2時間後]
    C[随伴症状]
      C1[悪心・嘔吐]
      C2[光過敏・音過敏]
      C3[前兆の有無・種類]
      C4[予兆・後兆]
    D[薬剤・治療]
      D1[使用薬剤名・用量]
      D2[使用時刻]
      D3[効果 of 評価]
      D4[副作用の有無]
    E[誘発因子候補]
      E1[睡眠時間・質]
      E2[食事・水分摂取]
      E3[ストレスレベル]
      E4[月経周期]
      E5[天候・気圧]
    F[機能障害]
      F1[仕事・学業への影響]
      F2[家事への影響]
      F3[社会活動への影響]`}
                />
              </div>

              <h3>5.2 必須記録項目の詳細一覧</h3>
              <div className="tbl">
                <table>
                  <thead>
                    <tr>
                      <th>カテゴリー</th>
                      <th>記録項目</th>
                      <th>記録の頻度</th>
                      <th>なぜ重要か</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <strong>頭痛の時間的特徴</strong>
                      </td>
                      <td>発症日時・終了時刻・持続時間</td>
                      <td>発作のたびに</td>
                      <td>ICHD-3診断基準（片頭痛：4〜72h、TTH：30min〜7日）の判定に必須</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>痛みの強度（NRS）</strong>
                      </td>
                      <td>0〜10の数値（発症時・ピーク・2時間後の3点）</td>
                      <td>発作のたびに</td>
                      <td>治療効果の定量評価；IHS臨床試験標準エンドポイント</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>痛みの部位</strong>
                      </td>
                      <td>片側/両側・前頭/側頭/後頭/眼窩周囲</td>
                      <td>発作のたびに</td>
                      <td>ICHD-3分類の判定（片頭痛：通常片側、TTH：通常両側）</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>痛みの性状</strong>
                      </td>
                      <td>拍動性/圧迫性/締め付け感/刺すような</td>
                      <td>発作のたびに</td>
                      <td>ICHD-3診断基準の直接項目</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>随伴症状</strong>
                      </td>
                      <td>悪心・嘔吐・光過敏・音過敏・臭い過敏</td>
                      <td>発作のたびに</td>
                      <td>ICHD-3片頭痛基準の必須項目（悪心または光+音過敏）</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>前兆（Aura）</strong>
                      </td>
                      <td>視覚性（閃輝暗点・暗点）・感覚性・言語性；持続時間</td>
                      <td>発作のたびに</td>
                      <td>ICHD-3コード1.2（前兆ありの片頭痛）の診断</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>予兆（Prodrome）</strong>
                      </td>
                      <td>情動変化・欠伸・頸部こわばり・倦怠感（発症前数時間〜数日）</td>
                      <td>毎日</td>
                      <td>早期介入のタイミング特定</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>後兆（Postdrome）</strong>
                      </td>
                      <td>集中力低下・倦怠感・頸部痛（発作後24h）</td>
                      <td>発作後</td>
                      <td>真の頭痛持続時間の把握</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>薬剤使用</strong>
                      </td>
                      <td>薬剤名・用量・使用時刻・効果（NRS変化）・副作用</td>
                      <td>使用のたびに</td>
                      <td>
                        <strong className="tR">MOH検出の核心</strong>
                        ；トリプタン≥10日/月、鎮痛薬≥15日/月が閾値
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <strong>睡眠</strong>
                      </td>
                      <td>就寝時刻・起床時刻・睡眠時間・睡眠の質（0〜10）</td>
                      <td>毎日</td>
                      <td>睡眠変動は強力なトリガー（週末の寝坊→「週末片頭痛」）</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>食事・水分</strong>
                      </td>
                      <td>食事時刻・水分摂取量・アルコール・カフェイン量</td>
                      <td>毎日</td>
                      <td>食事スキップ・脱水・カフェイン離脱はトリガー</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>月経周期（女性）</strong>
                      </td>
                      <td>月経開始日を1日目として記録</td>
                      <td>毎日</td>
                      <td>月経前後のエストロゲン急落は強力なトリガー</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>ストレス</strong>
                      </td>
                      <td>ストレスレベル（NRS 0〜10）</td>
                      <td>毎日</td>
                      <td>慢性ストレスおよびストレス解放後頭痛の同定</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>天候・気圧</strong>
                      </td>
                      <td>気圧・気温・天気（気象アプリと照合）</td>
                      <td>毎日（任意）</td>
                      <td>気象感受性の評価（約40%の片頭痛患者が気候変化に感受性あり）</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>日常機能障害</strong>
                      </td>
                      <td>仕事・家事・社会活動への支障（0〜3段階）</td>
                      <td>発作のたびに</td>
                      <td>MIDAS計算の根拠データとなる</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>
            {/* ====================================================== SECTION 6 */}
            <section id="s6" className="sec">
              <div className="sec-hd">
                <div className="sec-num">6</div>
                <h2 className="sec-title">STEP 3：日々の記録手順</h2>
              </div>

              <h3>6.1 1日の記録フロー（初学者向け）</h3>
              <div className="mmd">
                <div className="mmd-lbl">フローチャート — 起床から就寝までの1日の記録手順</div>
                <MermaidDiagram
                  themeVariables={DIARY_MERMAID_THEME}
                  chart={`flowchart TD
A["🌅 朝（起床時）"] --> B["睡眠データの記録<br/>・就寝時刻<br/>・起床時刻<br/>・睡眠時間・質(0-10)"]
B --> C{"本日、頭痛はあるか？"}
C -- "なし" --> D["✅ 頭痛なし → 1行で記録<br/>・日付<br/>・頭痛なし（0）<br/>・睡眠・ストレス・食事のみ"]
C -- "あり" --> E["🔴 頭痛発症を検知したら即座に記録"]
E --> F["発症時刻の記録（分単位）<br/>痛みの強度 NRS 0-10（発症時）<br/>部位・性状の記録<br/>前兆があれば詳細を記録"]
F --> G{"薬剤を使用したか？"}
G -- "使用" --> H["薬剤名・用量・使用時刻を記録"]
G -- "未使用" --> I["その旨を記録"]
H --> J["2時間後の痛みの強度を再評価 NRS 0-10"]
I --> J
J --> K["頭痛終了時刻を記録<br/>ピーク時 NRS 0-10 を追記"]
K --> L["推定トリガーを振り返る<br/>（発症前24-48時間の食事・睡眠・ストレス）"]
L --> M["機能障害の程度を記録<br/>（仕事・家事・社会活動 0-3）"]
D --> N["🌙 就寝前：<br/>月間サマリーの確認<br/>薬剤使用日数を月次集計"]
M --> N
style E fill:#e74c3c,color:#fff
style D fill:#27ae60,color:#fff
style N fill:#8e44ad,color:#fff`}
                />
              </div>

              <h3>6.2 痛みの強度スケール（NRS）の使い方</h3>
              <div className="tbl">
                <table>
                  <thead>
                    <tr>
                      <th>NRS スコア</th>
                      <th>痛みの表現</th>
                      <th>日常生活への影響</th>
                      <th>典型的な対応</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <strong>0</strong>
                      </td>
                      <td>痛みなし</td>
                      <td>なし</td>
                      <td>記録のみ</td>
                    </tr>
                    <tr>
                      <td>
                        <strong className="tG">1〜3</strong>
                      </td>
                      <td>軽度の痛み</td>
                      <td>通常の活動が可能</td>
                      <td>安静・水分補給・必要なら鎮痛薬</td>
                    </tr>
                    <tr>
                      <td>
                        <strong className="tO">4〜6</strong>
                      </td>
                      <td>中等度の痛み</td>
                      <td>活動に支障、無理をすれば可能</td>
                      <td>急性期薬剤（第1選択）の使用を検討</td>
                    </tr>
                    <tr>
                      <td>
                        <strong className="tR">7〜9</strong>
                      </td>
                      <td>高度の痛み</td>
                      <td>通常の活動が困難</td>
                      <td>急性期薬剤（トリプタンなど）の使用</td>
                    </tr>
                    <tr>
                      <td>
                        <strong className="tR">10</strong>
                      </td>
                      <td>最大限の痛み（これ以上はない）</td>
                      <td>活動不能・暗室安静が必要</td>
                      <td>救急受診を検討；SNOOP4の再評価</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="alert a-warn">
                <div className="alert-i">⚠️</div>
                <div>
                  NRS 10の突発性頭痛（雷鳴頭痛）は直ちにSNOOP4スクリーニングを行い、
                  <strong>SAH（くも膜下出血）を除外</strong>してください。
                </div>
              </div>

              <h3>6.3 前兆（Aura）の記録方法</h3>
              <p>前兆は多様な形で出現するため、以下のカテゴリー別に記録することが推奨されます。</p>
              <div className="tbl">
                <table>
                  <thead>
                    <tr>
                      <th>前兆の種類</th>
                      <th>具体的症状</th>
                      <th>典型的持続時間</th>
                      <th>ICHD-3コード</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <strong>視覚性（最多）</strong>
                      </td>
                      <td>
                        閃輝暗点（キラキラ・ジグザグ光）・視野欠損（暗点）・光の線・視野全体の曇り
                      </td>
                      <td>5〜60分</td>
                      <td>1.2.1</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>感覚性</strong>
                      </td>
                      <td>手・腕・顔のチクチク感や麻痺感（ゆっくり進展する）</td>
                      <td>5〜60分</td>
                      <td>1.2.2</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>言語性</strong>
                      </td>
                      <td>言葉が出にくい・聞き取りにくい・構音障害</td>
                      <td>5〜60分</td>
                      <td>1.2.3</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>運動性</strong>
                      </td>
                      <td>筋力低下（片側）→ 片麻痺性片頭痛</td>
                      <td>5〜72時間</td>
                      <td>1.3</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>脳幹性</strong>
                      </td>
                      <td>複視・耳鳴り・めまい・意識変容</td>
                      <td>5〜60分</td>
                      <td>1.2.6</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>網膜性</strong>
                      </td>
                      <td>単眼の視覚症状（片目のみ）</td>
                      <td>5〜60分</td>
                      <td>1.2.7</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="alert a-danger">
                <div className="alert-i">⚠️</div>
                <div>
                  <strong>運動性前兆・脳幹性前兆・単眼視覚症状</strong>
                  は、神経内科専門医への早急な相談が必要です。トリプタン投与は禁忌の可能性があります。
                </div>
              </div>
            </section>

            {/* ====================================================== SECTION 7 */}
            <section id="s7" className="sec">
              <div className="sec-hd">
                <div className="sec-num">7</div>
                <h2 className="sec-title">STEP 4：MOH（薬剤過用頭痛）リスクの継続的監視</h2>
              </div>

              <h3>7.1 MOH監視フローチャート</h3>
              <div className="mmd">
                <div className="mmd-lbl">フローチャート — 月次集計から MOH リスクを判定する</div>
                <MermaidDiagram
                  themeVariables={DIARY_MERMAID_THEME}
                  chart={`flowchart TD
A["月次集計：薬剤使用日数の確認"] --> B{"使用薬剤の種類"}
B --> C["トリプタン<br/>エルゴタミン<br/>オピオイド"]
B --> D["単純鎮痛薬<br/>NSAIDs<br/>アスピリン"]
B --> E["複合鎮痛薬<br/>（カフェイン含有等）"]
C --> F{"月あたり使用日数 ≥ 10日？"}
D --> G{"月あたり使用日数 ≥ 15日？"}
E --> H{"月あたり使用日数 ≥ 10日？"}
F -- "YES（≥3ヶ月継続）" --> I
G -- "YES（≥3ヶ月継続）" --> I
H -- "YES（≥3ヶ月継続）" --> I
F -- "NO" --> J["✅ MOH指針以下<br/>継続監視"]
G -- "NO" --> J
H -- "NO" --> J
I["🚨 MOH（薬剤過用頭痛）疑い<br/>ICHD-3コード 8.2<br/>専門医への早急な相談が必要"]
I --> K["同時に頭痛頻度を確認"]
K --> L{"頭痛日数 ≥15日/月<br/>（≥3ヶ月）?"}
L -- "YES" --> M["慢性片頭痛 + MOH の<br/>複合診断の可能性<br/>（ICHD-3: 1.3 + 8.2）"]
L -- "NO" --> N["エピソード性MOH<br/>の可能性"]
M --> O["離脱療法・予防薬療法の<br/>専門的評価へ"]
N --> O
style I fill:#e74c3c,color:#fff
style J fill:#27ae60,color:#fff
style M fill:#e67e22,color:#fff`}
                />
              </div>

              <h3>7.2 月次薬剤使用記録シート（日誌への転記例）</h3>
              <p>頭痛日誌の月末に、以下のサマリーを作成することを推奨します。</p>
              <div className="tbl">
                <table>
                  <thead>
                    <tr>
                      <th>月</th>
                      <th>トリプタン使用日数</th>
                      <th>NSAIDs使用日数</th>
                      <th>複合鎮痛薬使用日数</th>
                      <th>頭痛発作日数</th>
                      <th>MOHリスク判定</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>例：4月</td>
                      <td>6日</td>
                      <td>4日</td>
                      <td>0日</td>
                      <td>9日</td>
                      <td>
                        <span className="bGrn">✅ 閾値以下</span>
                      </td>
                    </tr>
                    <tr>
                      <td>例：5月</td>
                      <td>9日</td>
                      <td>5日</td>
                      <td>0日</td>
                      <td>12日</td>
                      <td>
                        <span className="bRed">🚨 トリプタン閾値超過</span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* ====================================================== SECTION 8 */}
            <section id="s8" className="sec">
              <div className="sec-hd">
                <div className="sec-num">8</div>
                <h2 className="sec-title">STEP 5：トリガー（誘発因子）の同定と管理</h2>
              </div>

              <h3>8.1 トリガー同定のプロセス</h3>
              <div className="mmd">
                <div className="mmd-lbl">
                  フローチャート — 30日分のデータからトリガーを確定するまで
                </div>
                <MermaidDiagram
                  themeVariables={DIARY_MERMAID_THEME}
                  chart={`flowchart LR
A["頭痛日誌の<br/>30日分データ"] --> B["発症前24〜48時間の<br/>要因を振り返る"]
B --> C["繰り返し出現する<br/>パターンを探す"]
C --> D{"同じ要因が<br/>3回以上登場するか？"}
D -- "YES" --> E["トリガー候補として<br/>リストアップ"]
D -- "NO" --> F["さらに記録を継続<br/>（追加の60日）"]
E --> G["試験的除去 or 回避<br/>（2〜4週間）"]
G --> H{"その期間の<br/>頭痛頻度は減少したか？"}
H -- "YES（≥50%減少）" --> I["✅ 確認されたトリガー<br/>管理戦略を確立"]
H -- "NO" --> J["トリガーの可能性は低い<br/>別の要因を検討"]
I --> K["トリガー管理計画を<br/>治療プランに統合"]
style I fill:#27ae60,color:#fff
style J fill:#95a5a6,color:#fff
style K fill:#2980b9,color:#fff`}
                />
              </div>

              <h3>8.2 主要トリガー一覧と記録・管理戦略</h3>
              <div className="tbl">
                <table>
                  <thead>
                    <tr>
                      <th>トリガーカテゴリー</th>
                      <th>具体的な要因</th>
                      <th>日誌への記録方法</th>
                      <th>管理戦略</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <strong>食事性トリガー</strong>
                      </td>
                      <td>
                        チラミン（熟成チーズ・赤ワイン・発酵食品）・亜硝酸塩（加工肉）・MSG・アスパルテーム・ヒスタミン（発酵食品・ワイン）
                      </td>
                      <td>食事内容を具体的に記録</td>
                      <td>
                        日誌で個人特有のトリガーを3週間以上確認後、試験的除去（2〜4週間）→
                        再摂取テスト
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <strong>睡眠変動</strong>
                      </td>
                      <td>睡眠不足・過剰睡眠・就寝時刻の乱れ・週末の寝坊（&gt;2時間）</td>
                      <td>就寝・起床時刻と睡眠時間を毎日記録</td>
                      <td>平日・休日ともに就寝・起床時刻の変動を±30分以内に制限</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>カフェイン</strong>
                      </td>
                      <td>摂取量の急増・急減（離脱頭痛は最終摂取の12〜24時間後に出現）</td>
                      <td>カフェイン摂取量（mg/日）を記録</td>
                      <td>漸減（週1〜2杯削減）；目標200mg/日未満；急激な断絶は避ける</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>脱水・食事スキップ</strong>
                      </td>
                      <td>水分不足（1日1.5L未満）・食事間隔&gt;4〜5時間の空腹</td>
                      <td>水分摂取量・食事時刻を記録</td>
                      <td>1日1.5〜2Lの水分摂取；規則的な食事時間（欠食なし）</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>ホルモン変動（女性）</strong>
                      </td>
                      <td>月経前後のエストロゲン急落；経口避妊薬の服用タイミング</td>
                      <td>月経周期日（開始日を1日目）を毎日記録</td>
                      <td>月経周期と頭痛日誌を照合；月経片頭痛は婦人科医との連携</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>感覚環境トリガー</strong>
                      </td>
                      <td>強い光・チカチカする光・騒音・強い香り・揮発性有機化合物</td>
                      <td>発症前の環境をメモ欄に記録</td>
                      <td>偏光レンズ（FL-41フィルター）の使用；静音空間の確保；換気</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>天候・気圧変動</strong>
                      </td>
                      <td>急な気圧変化（特に低気圧通過）・強風・温度変化</td>
                      <td>気象アプリのデータと照合（任意）</td>
                      <td>気象予報の確認；変化前日からの予防的マグネシウム補充（専門医相談後）</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>ストレス</strong>
                      </td>
                      <td>
                        急性ストレス・慢性ストレス蓄積；「ストレス解放後頭痛」（週末・休暇初日）
                      </td>
                      <td>ストレスレベル（NRS 0〜10）を毎日記録</td>
                      <td>CBT（認知行動療法）・バイオフィードバック・マインドフルネス</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>運動</strong>
                      </td>
                      <td>重激な運動（特に準備なしの高強度）；一方で有酸素運動は予防的</td>
                      <td>運動種類・強度・時間を記録</td>
                      <td>
                        急激な高強度運動を避ける；中等度の有酸素運動を週3回{" "}
                        <span className="bB">Grade B</span>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <strong>睡眠時無呼吸</strong>
                      </td>
                      <td>睡眠中の呼吸停止・いびき・朝の頭痛（特に後頭部）</td>
                      <td>朝の頭痛パターンと睡眠の質を記録</td>
                      <td>睡眠時無呼吸の専門的評価（STOP-BANG質問票など）</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="alert a-warn">
                <div className="alert-i">⚠️</div>
                <div>
                  <strong>重要：</strong>
                  トリガー同定には個人差が大きく、ある人のトリガーが別の人には無関係なこともあります。日誌を通じた「自分のトリガープロファイル」の確立が必要です。また、「トリガー回避」が不安行動や回避行動の強化につながることもあるため、CBTなど行動療法との組み合わせを推奨します。
                </div>
              </div>
            </section>

            {/* ====================================================== SECTION 9 */}
            <section id="s9" className="sec">
              <div className="sec-hd">
                <div className="sec-num">9</div>
                <h2 className="sec-title">STEP 6：データ解析とパターン認識</h2>
              </div>

              <h3>9.1 3ヶ月分の日誌から何がわかるか</h3>
              <p>30〜90日分の記録が蓄積されたら、以下の観点から整理します。</p>
              <div className="mmd">
                <div className="mmd-lbl">フローチャート — 月次集計から治療方針の判断へ</div>
                <MermaidDiagram
                  themeVariables={DIARY_MERMAID_THEME}
                  chart={`flowchart TD
A["3ヶ月分の頭痛日誌データ"] --> B["月次集計を行う"]
B --> C["①頭痛頻度<br/>（発作回数/月・頭痛日数/月）"]
B --> D["②月平均重症度<br/>（NRS ピーク値の平均）"]
B --> E["③薬剤使用日数/月<br/>（種類別）"]
B --> F["④誘発因子パターン<br/>（繰り返し出現するトリガー）"]
B --> G["⑤機能障害日数<br/>（MIDAS計算の素材）"]
C --> H{"頭痛日数 ≥8〜15日/月？"}
H -- "YES（≥8日）" --> I["予防療法の開始を検討<br/>（AAN/EHF基準）"]
H -- "YES（≥15日 × 3ヶ月）" --> J["慢性片頭痛（ICHD-3: 1.3）<br/>の評価"]
E --> K{"MOH閾値超過？"}
K -- "YES" --> L["MOH（8.2）の評価<br/>離脱療法の検討"]
G --> M["MIDAS スコア計算<br/>（3ヶ月データが必要）"]
M --> N{"MIDAS ≥21？"}
N -- "YES" --> O["Grade IV：重症<br/>CGRP製剤・ボツリヌス毒素の適応評価"]
style I fill:#2980b9,color:#fff
style J fill:#e67e22,color:#fff
style L fill:#e74c3c,color:#fff
style O fill:#8e44ad,color:#fff`}
                />
              </div>

              <h3>9.2 治療開始の判断基準と頭痛日誌データの対応</h3>
              <div className="tbl">
                <table>
                  <thead>
                    <tr>
                      <th>治療変更の根拠</th>
                      <th>頭痛日誌での確認事項</th>
                      <th>参照ガイドライン</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <strong>急性期治療の強化</strong>
                      </td>
                      <td>
                        1回の発作でNRS ≥7が2時間以上持続・既存の急性期薬が無効（NRS改善&lt;30%）
                      </td>
                      <td>AAN/AHS 急性期治療ガイドライン</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>予防療法の開始</strong>
                      </td>
                      <td>
                        発作回数 ≥4回/月、または頭痛日数 ≥8日/月、または機能障害が高度（MIDAS ≥11）
                      </td>
                      <td>AAN/EHF 予防療法ガイドライン 2024ドラフト</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>CGRP製剤への切り替え</strong>
                      </td>
                      <td>従来予防薬が2種類以上で無効（発作頻度50%減少なし）；MOH合併</td>
                      <td>AHS Position Statement 2024; EHF CGRP mAbs ガイドライン 2022</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>MOH治療の開始</strong>
                      </td>
                      <td>薬剤使用日数が閾値超過 × 3ヶ月</td>
                      <td>ICHD-3 コード 8.2；NICE CG150</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>ボツリヌス毒素の適応</strong>
                      </td>
                      <td>慢性片頭痛（≥15日/月 × 3ヶ月）かつ薬物療法が不十分</td>
                      <td>
                        AAN <span className="bA">Grade A</span>；NICE CG150
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* ====================================================== SECTION 10 */}
            <section id="s10" className="sec">
              <div className="sec-hd">
                <div className="sec-num">10</div>
                <h2 className="sec-title">STEP 7：医師との効果的な情報共有</h2>
              </div>

              <h3>10.1 診察前準備チェックリスト</h3>
              <p>診察の1週間前に以下をまとめておくことで、診察時間を最大限に活用できます。</p>
              <div className="tbl">
                <table>
                  <thead>
                    <tr>
                      <th>準備内容</th>
                      <th>具体的に用意するもの</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <strong>頭痛日誌の原本・印刷物</strong>
                      </td>
                      <td>最低3ヶ月分；デジタルアプリの場合はPDFレポートを印刷</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>月次サマリーシート</strong>
                      </td>
                      <td>頭痛日数/月・薬剤使用日数/月・平均NRS・主要トリガーをA4 1枚に要約</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>HIT-6スコア</strong>
                      </td>
                      <td>事前に記入して持参（≥60で重症）</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>MIDAS スコア</strong>
                      </td>
                      <td>直近3ヶ月のデータから計算（≥21でGrade IV重症）</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>薬剤リスト</strong>
                      </td>
                      <td>現在使用中の全薬剤（処方薬・OTC・サプリメント）の名称・用量・頻度</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>質問リスト</strong>
                      </td>
                      <td>診察で聞きたい項目を箇条書きで準備</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <h3>10.2 医師への伝達の優先順位</h3>
              <div className="card">
                <ol>
                  <li>
                    <strong>頭痛日数/月の変化</strong>（増加・減少・安定のトレンド）
                  </li>
                  <li>
                    <strong>薬剤使用日数/月</strong>（MOH閾値との比較）
                  </li>
                  <li>
                    <strong>最も日常生活を障害した頭痛のエピソード</strong>
                  </li>
                  <li>
                    <strong>新たに同定したトリガー</strong>
                  </li>
                  <li>
                    <strong>これまでの治療に対する反応</strong>（NRS変化、副作用）
                  </li>
                </ol>
              </div>
            </section>

            {/* ====================================================== SECTION 11 */}
            <section id="s11" className="sec">
              <div className="sec-hd">
                <div className="sec-num">11</div>
                <h2 className="sec-title">紙日誌 vs. デジタル日誌 — 比較と選択基準</h2>
              </div>

              <h3>11.1 紙 vs. 電子（e-diary）の比較</h3>
              <div className="tbl">
                <table>
                  <thead>
                    <tr>
                      <th>評価項目</th>
                      <th>紙の頭痛日誌</th>
                      <th>電子日誌（スマートフォンアプリ）</th>
                      <th>根拠</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <strong>コンプライアンス率</strong>
                      </td>
                      <td>71〜77.5%（適切な指導を受けた場合）</td>
                      <td>94〜96.4%（vs. 紙の11%という報告も）</td>
                      <td>Stone et al.; van der Donckt et al. 2021 [PMC]</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>リアルタイム記録</strong>
                      </td>
                      <td>記録が後回しになりやすい；ゲーミング（後からまとめて入力）の問題</td>
                      <td>発作時に即座に入力可能；タイムスタンプで入力時刻が確認可能</td>
                      <td>JMIR mHealth 2014</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>データ分析</strong>
                      </td>
                      <td>手動集計が必要</td>
                      <td>自動グラフ化・PDFレポート生成</td>
                      <td>複数のアプリレビュー研究</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>医師との共有</strong>
                      </td>
                      <td>紙を持参するか口頭で伝える</td>
                      <td>アプリ内レポートをメールやPDFで送信</td>
                      <td>ClinicalTrials NCT06532357</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>アクセシビリティ</strong>
                      </td>
                      <td>
                        <span className="bGrn">✅</span>{" "}
                        スマートフォン不要；ネット不要；高齢者でも使用可能
                      </td>
                      <td>スマートフォン・インターネット環境が必要；高齢者には操作習得が必要</td>
                      <td>—</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>プライバシー</strong>
                      </td>
                      <td>データは自己管理</td>
                      <td>
                        <span className="bOra">⚠️</span>{" "}
                        アプリ会社へのデータ共有に注意；プライバシーポリシーの確認が必要
                      </td>
                      <td>
                        Minen MT et al., <em>Headache</em> 2019 [PMC6347475]
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <strong>コスト</strong>
                      </td>
                      <td>
                        <span className="bGrn">✅</span> 無料（VA/DoD テンプレートを印刷）
                      </td>
                      <td>多くは無料（有料プレミアム版あり）</td>
                      <td>—</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>IHS臨床試験における使用</strong>
                      </td>
                      <td>研究者主導試験での使用を許可</td>
                      <td>推奨される標準的手法</td>
                      <td>IHS 臨床試験ガイドライン第4版 2024</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="alert a-info">
                <div className="alert-i">📌</div>
                <div>
                  <strong>推奨原則：</strong>
                  臨床の現場では、患者の年齢・デジタルリテラシー・アクセス環境に応じて柔軟に選択することが重要です。
                </div>
              </div>

              <h3>11.2 電子日誌選択時のチェックポイント</h3>
              <div className="tbl">
                <table>
                  <thead>
                    <tr>
                      <th>確認項目</th>
                      <th>詳細</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <strong>ICHD-3準拠 of 記録項目</strong>
                      </td>
                      <td>部位・性状・随伴症状（悪心・光過敏・音過敏）・前兆が記録できるか</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>薬剤使用の記録</strong>
                      </td>
                      <td>薬剤名・用量・時刻の記録とMOH閾値の警告機能</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>レポート出力機能</strong>
                      </td>
                      <td>医師に共有できるPDF/グラフレポートの生成機能</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>プライバシーポリシー</strong>
                      </td>
                      <td>データの第三者提供・売買に関する明記</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>補助機能</strong>
                      </td>
                      <td>トリガー分析・月経周期記録・気象データ連携</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>医師との連携</strong>
                      </td>
                      <td>ヘルスケアプロバイダーとのデータ共有機能</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* ====================================================== SECTION 12 */}
            <section id="s12" className="sec">
              <div className="sec-hd">
                <div className="sec-num">12</div>
                <h2 className="sec-title">推奨デジタルツールとアプリ</h2>
              </div>

              <h3>12.1 主要アプリの比較</h3>
              <div className="tbl">
                <table>
                  <thead>
                    <tr>
                      <th>アプリ名</th>
                      <th>開発元</th>
                      <th>主な特徴</th>
                      <th>エビデンス・根拠</th>
                      <th>プラットフォーム</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <strong>Migraine Buddy</strong>
                      </td>
                      <td>Healint（シンガポール）</td>
                      <td>
                        ICHD-3準拠の記録；トリガー分析；医師共有レポート；世界190ヶ国370万以上のダウンロード
                      </td>
                      <td>AAN 2024発表（HeAD-US研究）；Pfizer社Nurtec試験で利用（NCT06532357）</td>
                      <td>iOS / Android</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>N1-Headache（Curelator）</strong>
                      </td>
                      <td>Curelator Inc.</td>
                      <td>機械学習による個人特有トリガー・プロテクター同定</td>
                      <td>
                        MEDUSA試験（NCT05979285）；英国NHSプライマリケア試験（PubMed 35364371）
                      </td>
                      <td>iOS / Android</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>M-sense Migraine</strong>
                      </td>
                      <td>EarlySense（ドイツ）</td>
                      <td>ICHD-3準拠自動分類；気象データ連携；90日アドヒアランス解析に使用</td>
                      <td>
                        Klan M et al., <em>JMIR mHealth</em> 2021；自動分類アルゴリズムの検証 kappa
                        0.74 [PubMed PMC7291668]
                      </td>
                      <td>iOS / Android</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>VA Headache Coach</strong>
                      </td>
                      <td>米国退役軍人省（VA）</td>
                      <td>
                        頭痛日誌＋非薬物療法ツール（CBT・リラクゼーション）統合；VA医療サービスと連携
                      </td>
                      <td>VA/DoD CPG 2023；VA News 2025</td>
                      <td>iOS / Android</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>RELAXaHEAD</strong>
                      </td>
                      <td>NYU Langone</td>
                      <td>頭痛日誌＋漸進的筋弛緩法（PMR）の統合；ユーザビリティ検証済み</td>
                      <td>
                        Minen MT et al. <em>Front Neurol</em> 2019 [PMC6374137]
                      </td>
                      <td>iOS</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="alert a-warn">
                <div className="alert-i">📌</div>
                <div>
                  <strong>注意：</strong>
                  アプリのプライバシーポリシーを事前に確認してください。ユーザーデータが第三者（広告主・製薬企業）と共有される可能性があります。参考：Minen
                  MT et al. &quot;Privacy Issues in Smartphone Applications&quot; <em>Headache</em>{" "}
                  2019 —{" "}
                  <Ext href="https://pmc.ncbi.nlm.nih.gov/articles/PMC6347475/">PMC6347475</Ext>
                </div>
              </div>

              <h3>12.2 公式紙テンプレートリソース</h3>
              <div className="tbl">
                <table>
                  <thead>
                    <tr>
                      <th>資料</th>
                      <th>発行機関</th>
                      <th>URL</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>7日間頭痛日誌（2024年最新・PDF）</td>
                      <td>VA/DoD</td>
                      <td>
                        <Ext href="https://www.healthquality.va.gov/guidelines/pain/headache/HA-Diary-7-Day-Diary-Final-11Jan2024.pdf">
                          healthquality.va.gov
                        </Ext>
                      </td>
                    </tr>
                    <tr>
                      <td>3ヶ月頭痛日誌（2024年最新・PDF）</td>
                      <td>VA/DoD</td>
                      <td>
                        <Ext href="https://www.healthquality.va.gov/guidelines/Pain/headache/">
                          healthquality.va.gov
                        </Ext>
                      </td>
                    </tr>
                    <tr>
                      <td>患者向けリソース（日誌テンプレート含む）</td>
                      <td>IHS</td>
                      <td>
                        <Ext href="https://ihs-headache.org/en/resources/patient-resources/">
                          ihs-headache.org
                        </Ext>
                      </td>
                    </tr>
                    <tr>
                      <td>頭痛日誌セルフケアガイド</td>
                      <td>Migraine Trust</td>
                      <td>
                        <Ext href="https://migrainetrust.org/live-with-migraine/self-management/keeping-a-migraine-diary/">
                          migrainetrust.org
                        </Ext>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* ====================================================== SECTION 13 */}
            <section id="s13" className="sec">
              <div className="sec-hd">
                <div className="sec-num">13</div>
                <h2 className="sec-title">特殊集団への配慮</h2>
              </div>

              <h3>13.1 小児・青年期（12歳未満 / 12〜18歳）</h3>
              <div className="tbl">
                <table>
                  <thead>
                    <tr>
                      <th>配慮事項</th>
                      <th>推奨事項</th>
                      <th>エビデンス</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <strong>日誌の記録様式</strong>
                      </td>
                      <td>絵や顔スケール（フェイシャルスケール）を組み合わせた簡略版</td>
                      <td>
                        IHS小児臨床試験ガイドライン 2023（<em>Cephalalgia</em>）
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <strong>保護者との連携</strong>
                      </td>
                      <td>小学生以下は保護者が代理記録；思春期は本人が主体で保護者が補助</td>
                      <td>—</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>学校欠席の記録</strong>
                      </td>
                      <td>欠席日数の記録は PedMIDAS のスコアリングに直結</td>
                      <td>
                        Hershey AD et al., <em>Headache</em> 2004
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <strong>睡眠記録の重要性</strong>
                      </td>
                      <td>小児期は睡眠変動が強力なトリガー；就寝・起床時刻の記録を優先</td>
                      <td>—</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>薬剤使用の閾値</strong>
                      </td>
                      <td>MOH閾値は成人と同じ基準が適用されるが、小児では特に慎重に監視</td>
                      <td>ICHD-3</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <h3>13.2 妊娠・授乳中</h3>
              <div className="tbl">
                <table>
                  <thead>
                    <tr>
                      <th>配慮事項</th>
                      <th>推奨事項</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <strong>薬剤使用の記録</strong>
                      </td>
                      <td>
                        使用薬剤の安全性クラスを明記；すべての薬剤使用を産科医・神経内科医に報告
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <strong>安全な急性期薬</strong>
                      </td>
                      <td>アセトアミノフェン（第1選択）；IV硫酸マグネシウム1〜2g（重症例）</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>避けるべき薬剤</strong>
                      </td>
                      <td>
                        エルゴタミン（禁忌）・トリプタン（慎重使用）・バルプロ酸（禁忌）・トピラマート（禁忌）
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <strong>頭痛パターンの変化</strong>
                      </td>
                      <td>妊娠中（特に妊娠中期）に片頭痛が改善することがある → 日誌でモニター</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>SNOOP4の強化</strong>
                      </td>
                      <td>
                        妊娠・産後は4番目の「P（Pregnancy/Postpartum）」に相当 →
                        子癇前症・RCVS・CVSTを常に念頭に
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <h3>13.3 高齢者（65歳以上）</h3>
              <div className="tbl">
                <table>
                  <thead>
                    <tr>
                      <th>配慮事項</th>
                      <th>推奨事項</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <strong>記録様式の簡略化</strong>
                      </td>
                      <td>記録項目を最低限（頭痛の有無・NRS・薬剤使用）に絞ることも許容</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>薬剤相互作用の監視</strong>
                      </td>
                      <td>多剤服用が多い → 日誌に全服薬情報を記載して医師と共有</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>転倒リスク</strong>
                      </td>
                      <td>頭痛発作中の歩行困難・姿勢障害の記録 → 転倒予防計画に活用</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>新規頭痛の評価</strong>
                      </td>
                      <td>
                        65歳以降の新規頭痛はSNOOP4の「O（Onset after age 50）」に相当 →
                        必ず専門医評価
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <strong>認知機能への配慮</strong>
                      </td>
                      <td>デジタルアプリより紙の日誌が使いやすいケースが多い</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <h3>13.4 月経関連片頭痛（Menstrual Migraine）</h3>
              <p>月経周期と頭痛発作の関連を評価するためには、少なくとも3ヶ月分の日誌が必要です。</p>
              <div className="mmd">
                <div className="mmd-lbl">フローチャート — 月経関連片頭痛の評価プロセス</div>
                <MermaidDiagram
                  themeVariables={DIARY_MERMAID_THEME}
                  chart={`flowchart LR
A["月経周期の記録<br/>（月経開始日を1日目）"] --> B["頭痛発作日との照合<br/>（3ヶ月分）"]
B --> C{"月経前2日〜月経3日以内に<br/>頭痛発作が集中しているか？"}
C -- "YES（2/3周期以上）" --> D["純粋月経時片頭痛<br/>または月経関連片頭痛<br/>の診断評価（ICHD-3 A1.1.1/A1.1.2）"]
C -- "NO" --> E["月経との関連は低い<br/>他のトリガーを探索"]
D --> F["月経前後のエストロゲン変動管理<br/>婦人科医との連携<br/>PCNSAIDs法・トリプタン短期予防療法"]
style D fill:#8e44ad,color:#fff
style F fill:#2980b9,color:#fff`}
                />
              </div>
            </section>

            {/* ====================================================== SECTION 14 */}
            <section id="s14" className="sec">
              <div className="sec-hd">
                <div className="sec-num">14</div>
                <h2 className="sec-title">アウトカム測定との統合（HIT-6 / MIDAS / VAS）</h2>
              </div>

              <h3>14.1 頭痛日誌と主要アウトカム指標の関係</h3>
              <p>頭痛日誌のデータは、標準化されたアウトカム指標の算出に直結します。</p>
              <div className="tbl">
                <table>
                  <thead>
                    <tr>
                      <th>アウトカム指標</th>
                      <th>算出に必要な日誌データ</th>
                      <th>評価頻度</th>
                      <th>治療成功の閾値</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <strong>HIT-6（Headache Impact Test）</strong>
                      </td>
                      <td>頭痛の強度・頻度・機能障害・日常活動への影響の記録</td>
                      <td>4週間ごと（想起期間4週）</td>
                      <td>5〜6点の改善（MCID）；目標&lt;50点（正常域）</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>MIDAS（Migraine Disability Assessment）</strong>
                      </td>
                      <td>職業的・家実に的・社会的活動の障害日数（3ヶ月分）</td>
                      <td>3ヶ月ごと（想起期間90日）</td>
                      <td>≥50%スコア減少；グレードI/IIへの移行</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>NRS / VAS</strong>
                      </td>
                      <td>毎回の発作時に記録（発症时・ピーク・2時間後）</td>
                      <td>毎発作</td>
                      <td>≥50%の強度低下（2時間後）</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>頭痛日数/月の変化</strong>
                      </td>
                      <td>月次集計</td>
                      <td>毎月</td>
                      <td>≥50%減少（主要エンドポイント：IHS基準）</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>PGIC（患者全般印象変化）</strong>
                      </td>
                      <td>治療前後の総合的改善評価（7点尺度）</td>
                      <td>3〜6ヶ月ごと</td>
                      <td>「改善（5点）」以上</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>50%レスポンダー率</strong>
                      </td>
                      <td>治療前後の頭痛日数比較</td>
                      <td>3ヶ月後</td>
                      <td>≥50%の患者が50%以上減少を達成</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <h3>14.2 日誌データからHIT-6・MIDASを補完する</h3>
              <div className="mmd">
                <div className="mmd-lbl">
                  フローチャート — 日誌データが各アウトカム指標へ集約される流れ
                </div>
                <MermaidDiagram
                  themeVariables={DIARY_MERMAID_THEME}
                  chart={`flowchart LR
A["頭痛日誌<br/>（毎日の記録）"] --> B["NRS × 持続時間<br/>→ 頭痛強度プロファイル"]
A --> C["機能障害日数の記録<br/>→ MIDAS素材"]
A --> D["薬剤使用の記録<br/>→ MOH評価"]
B --> E["HIT-6の<br/>精度向上"]
C --> F["MIDAS スコア<br/>（3ヶ月分で計算）"]
D --> G["MOH閾値<br/>阻害の判定"]
E --> H["統合アウトカム評価<br/>（3ヶ月・6ヶ月・12ヶ月）"]
F --> H
G --> H
H --> I["治療方針の<br/>見直し・調整"]
style H fill:#27ae60,color:#fff
style I fill:#2980b9,color:#fff`}
                />
              </div>
            </section>

            {/* ====================================================== SECTION 15 */}
            <section id="s15" className="sec">
              <div className="sec-hd">
                <div className="sec-num">15</div>
                <h2 className="sec-title">12週間モニタリングプロトコル</h2>
              </div>

              <h3>15.1 頭痛日誌を核とした12週間フレームワーク</h3>
              <div className="tbl">
                <table>
                  <thead>
                    <tr>
                      <th>時点</th>
                      <th>頭痛日誌の役割</th>
                      <th>医師との評価内容</th>
                      <th>判断基準</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <strong>ベースライン（0週）</strong>
                      </td>
                      <td>最低30日間の記録収集；ICHD-3診断の根拠データ</td>
                      <td>SNOOP4評価・ICHD-3分類・HIT-6・MIDAS初回評価；MOH閾値確認</td>
                      <td>診断確定・治療計画策定</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>4週（1ヶ月後）</strong>
                      </td>
                      <td>薬剤使用日数・頭痛日数の集計；トリガー候補の同定</td>
                      <td>HIT-6再評価（4週間想起期間に対応）；副作用確認</td>
                      <td>初期反応確認；治療アドヒアランス評価</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>8週（2ヶ月後）</strong>
                      </td>
                      <td>トリガー回避戦略の効果確認；MOHリスクのモニター</td>
                      <td>HIT-6再評価；副作用・耐容性評価</td>
                      <td>中間評価；用量調整の判断</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>12週（3ヶ月後）</strong>
                      </td>
                      <td>3ヶ月分データ完成；トリガープロファイル確立</td>
                      <td>MIDAS再評価・HIT-6・NRS変化・50%レスポンダー判定</td>
                      <td>正式アウトカム評価；治療継続/変更の根拠</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>6ヶ月</strong>
                      </td>
                      <td>継続記録</td>
                      <td>MIDAS・HIT-6・日誌データの包括的レビュー</td>
                      <td>長期維持の確認；CGRP mAbsの継続可否</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>12ヶ月</strong>
                      </td>
                      <td>年間記録のサマリー</td>
                      <td>年次評価；QOL評価（MSQ v2.1）</td>
                      <td>年間評価；予防薬漸減・中止の検討</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <h3>15.2 治療成功の複合基準（頭痛日誌データに基づく）</h3>
              <div className="tbl">
                <table>
                  <thead>
                    <tr>
                      <th>指標</th>
                      <th>最小成功基準（MCID）</th>
                      <th>優秀な反応</th>
                      <th>評価のタイムポイント</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <strong>頭痛日数/月</strong>
                      </td>
                      <td>≥50%減少</td>
                      <td>≥75%減少</td>
                      <td>12週以降</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>HIT-6スコア</strong>
                      </td>
                      <td>≥5〜6点改善</td>
                      <td>&lt;50点（正常域）への移行</td>
                      <td>4週ごと</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>MIDASスコア</strong>
                      </td>
                      <td>≥50%減少</td>
                      <td>Grade Iへの移行</td>
                      <td>12週ごと</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>急性期薬使用日数</strong>
                      </td>
                      <td>MOH閾値以下</td>
                      <td>≤4日/月</td>
                      <td>毎月</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>NRS ピーク強度</strong>
                      </td>
                      <td>≥30%低下</td>
                      <td>≥50%低下</td>
                      <td>毎発作</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>機能障害日数（MIDAS素材）</strong>
                      </td>
                      <td>50%以上減少</td>
                      <td>Grade I（0〜5日）</td>
                      <td>3ヶ月ごと</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* ====================================================== SECTION 16 */}
            <section id="s16" className="sec">
              <div className="sec-hd">
                <div className="sec-num">16</div>
                <h2 className="sec-title">参考文献・ソースURL一覧</h2>
              </div>

              <div className="alert a-info">
                <div className="alert-i">🌐</div>
                <div>
                  以下はすべて<strong>国際的に認可された一次ソース</strong>
                  （ICHD-3 / IHS / AAN / AHS / EHF / NICE / VA-DoD / Cochrane /
                  PubMed）です。リンクは新しいタブで開きます。
                </div>
              </div>

              <h3>A. ICHD-3診断基準（最重要ソース）</h3>
              <div className="tbl">
                <table>
                  <thead>
                    <tr>
                      <th>資料</th>
                      <th>URL</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>ICHD-3 公式サイト（全文閲覧可・日本語あり）</td>
                      <td>
                        <Ext href="https://ichd-3.org/">ichd-3.org</Ext>
                      </td>
                    </tr>
                    <tr>
                      <td>ICHD-3 How to Use the Classification（頭痛日誌の推奨根拠）</td>
                      <td>
                        <Ext href="https://ichd-3.org/how-to-use-the-classification/">
                          ichd-3.org/how-to-use-the-classification
                        </Ext>
                      </td>
                    </tr>
                    <tr>
                      <td>ICHD-3 全文PDF（Cephalalgia 2018）</td>
                      <td>
                        <Ext href="https://ichd-3.org/wp-content/uploads/2018/01/The-International-Classification-of-Headache-Disorders-3rd-Edition-2018.pdf">
                          ICHD-3 全文PDF
                        </Ext>
                      </td>
                    </tr>
                    <tr>
                      <td>IHS 分類委員会（ICHD-4最新動向）</td>
                      <td>
                        <Ext href="https://ihs-headache.org/en/about-ihs/standing-committees/classification/">
                          ihs-headache.org/classification
                        </Ext>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <h3>B. 臨床ガイドライン</h3>
              <div className="tbl">
                <table>
                  <thead>
                    <tr>
                      <th>機関・資料</th>
                      <th>URL</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>AAN 頭痛ガイドライン一覧</td>
                      <td>
                        <Ext href="https://www.aan.com/guidelines/">aan.com/guidelines</Ext>
                      </td>
                    </tr>
                    <tr>
                      <td>AAN/AHS 片頭痛予防ガイドライン（PDF）</td>
                      <td>
                        <Ext href="https://www.aan.com/guidelines/home/getguidelinecontent/545">
                          aan.com（content/545）
                        </Ext>
                      </td>
                    </tr>
                    <tr>
                      <td>AAN 2024年予防療法ドラフト（公開レビュー用）</td>
                      <td>
                        <Ext href="https://www.aan.com/siteassets/home-page/policy-and-guidelines/guidelines/guidelines-and-measures-open-for-public-comment/24-pharmacologic-treatment-for-migraine-prevention-in-adults_draft_08-14-2024.pdf">
                          AAN 2024 予防療法ドラフト PDF
                        </Ext>
                      </td>
                    </tr>
                    <tr>
                      <td>AHS CGRP第一選択化 Position Statement 2024</td>
                      <td>
                        <Ext href="https://americanheadachesociety.org/">
                          americanheadachesociety.org
                        </Ext>
                      </td>
                    </tr>
                    <tr>
                      <td>EHF CGRP mAbs 予防療法ガイドライン 2022（PMC全文）</td>
                      <td>
                        <Ext href="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC9188162/">
                          PMC9188162
                        </Ext>
                      </td>
                    </tr>
                    <tr>
                      <td>EHF トリプタン治療コンセンサス 2022</td>
                      <td>
                        <Ext href="https://link.springer.com/article/10.1186/s10194-022-01502-z">
                          link.springer.com（10194-022-01502-z）
                        </Ext>
                      </td>
                    </tr>
                    <tr>
                      <td>NICE 頭痛ガイドライン CG150（英国）</td>
                      <td>
                        <Ext href="https://www.nice.org.uk/guidance/cg150">
                          nice.org.uk/guidance/cg150
                        </Ext>
                      </td>
                    </tr>
                    <tr>
                      <td>IHS 急性期治療推奨 2024（Cephalalgia全文）</td>
                      <td>
                        <Ext href="https://journals.sagepub.com/doi/10.1177/03331024241252666">
                          sagepub.com（03331024241252666）
                        </Ext>
                      </td>
                    </tr>
                    <tr>
                      <td>IHS ガイドライン総覧（2024〜2025）</td>
                      <td>
                        <Ext href="https://ihs-headache.org/en/resources/guidelines/">
                          ihs-headache.org/resources/guidelines
                        </Ext>
                      </td>
                    </tr>
                    <tr>
                      <td>VA/DoD 頭痛管理 CPG 2023</td>
                      <td>
                        <Ext href="https://www.healthquality.va.gov/guidelines/Pain/headache/">
                          healthquality.va.gov
                        </Ext>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <h3>C. 頭痛日誌の診断・評価エビデンス（一次文献）</h3>
              <div className="tbl">
                <table>
                  <thead>
                    <tr>
                      <th>著者・年</th>
                      <th>主な知見</th>
                      <th>掲載誌・URL</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Valade D et al., 2008</td>
                      <td>頭痛日誌の診断感度92%（片頭痛）・75%（TTH・MOH）；コンプライアンス71%</td>
                      <td>
                        <em>Cephalalgia</em> —{" "}
                        <Ext href="https://pubmed.ncbi.nlm.nih.gov/18624804/">PubMed: 18624804</Ext>
                      </td>
                    </tr>
                    <tr>
                      <td>Vandenbussche N et al., 2025</td>
                      <td>90日間スマートフォン日誌 vs. 臨床面接の比較；ICHD-3症状の新規同定</td>
                      <td>
                        <em>Neurol Int</em> —{" "}
                        <Ext href="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC11944553/">
                          PMC11944553
                        </Ext>
                      </td>
                    </tr>
                    <tr>
                      <td>Klan M et al., 2021</td>
                      <td>M-sense アプリの自動分類アルゴリズム；神経内科医との一致度 kappa 0.74</td>
                      <td>
                        <em>JMIR mHealth</em> —{" "}
                        <Ext href="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC7291668/">
                          PMC7291668
                        </Ext>
                      </td>
                    </tr>
                    <tr>
                      <td>Stone AA et al., 2002</td>
                      <td>電子日誌コンプライアンス94% vs. 紙日誌11%（ゲーミング問題）</td>
                      <td>
                        <em>BMJ</em> — 紙 vs. 電子比較
                      </td>
                    </tr>
                    <tr>
                      <td>van der Donckt J et al., 2021</td>
                      <td>電子日誌コンプライアンス96.4%；医師満足度スコア8/10</td>
                      <td>
                        ResearchGate —{" "}
                        <Ext href="https://www.researchgate.net/publication/351331349">
                          E-diary prospective study
                        </Ext>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <h3>D. デジタルアプリの検証研究</h3>
              <div className="tbl">
                <table>
                  <thead>
                    <tr>
                      <th>研究・ソース</th>
                      <th>URL</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>JMIR mHealth — 商業ヘッドエイクアプリの系統的レビュー 2014</td>
                      <td>
                        <Ext href="https://mhealth.jmir.org/2014/3/e36/">
                          mhealth.jmir.org/2014/3/e36
                        </Ext>
                      </td>
                    </tr>
                    <tr>
                      <td>MEDUSA Study — N1-Headache App（ClinicalTrials）</td>
                      <td>
                        <Ext href="https://clinicaltrials.gov/study/NCT05979285">NCT05979285</Ext>
                      </td>
                    </tr>
                    <tr>
                      <td>HeAD-US Study — Migraine Buddy（AAN 2024）</td>
                      <td>
                        <Ext href="https://migrainebuddy.com/">migrainebuddy.com</Ext>
                      </td>
                    </tr>
                    <tr>
                      <td>Minen MT et al. — アプリのプライバシー問題（PMC）</td>
                      <td>
                        <Ext href="https://pmc.ncbi.nlm.nih.gov/articles/PMC6347475/">
                          PMC6347475
                        </Ext>
                      </td>
                    </tr>
                    <tr>
                      <td>Minen MT et al. — RELAXaHEAD アプリ（PMC）</td>
                      <td>
                        <Ext href="https://pmc.ncbi.nlm.nih.gov/articles/PMC6374137/">
                          PMC6374137
                        </Ext>
                      </td>
                    </tr>
                    <tr>
                      <td>NPP Digital Psychiatry — N1-Headacheアドヒアランス研究</td>
                      <td>
                        <Ext href="https://www.nature.com/articles/s44277-024-00021-w">
                          nature.com（s44277-024-00021-w）
                        </Ext>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <h3>E. IHS臨床試験ガイドライン（日誌の標準的役割）</h3>
              <div className="tbl">
                <table>
                  <thead>
                    <tr>
                      <th>資料</th>
                      <th>URL</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>IHS 臨床試験ガイドライン（急性期治療・第4版）</td>
                      <td>
                        <Ext href="https://journals.sagepub.com/doi/10.1177/03331024241252666">
                          sagepub.com（03331024241252666）
                        </Ext>
                      </td>
                    </tr>
                    <tr>
                      <td>IHS 小児片頭痛予防臨床試験ガイドライン更新 2023</td>
                      <td>
                        <Ext href="https://journals.sagepub.com/doi/full/10.1177/03331024231178239">
                          sagepub.com（03331024231178239）
                        </Ext>
                      </td>
                    </tr>
                    <tr>
                      <td>IHS 頭痛・群発頭痛のリアルワールドエビデンス試験ガイドライン 2025</td>
                      <td>
                        <Ext href="https://ihs-headache.org/en/resources/guidelines/">
                          ihs-headache.org/resources/guidelines
                        </Ext>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <h3>F. 専門誌・データベース（継続リサーチ用）</h3>
              <div className="tbl">
                <table>
                  <thead>
                    <tr>
                      <th>名称</th>
                      <th>用途</th>
                      <th>URL</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Journal of Headache and Pain（EHF公式誌・OA）</td>
                      <td>最新EHF研究・ガイドライン更新</td>
                      <td>
                        <Ext href="https://thejournalofheadacheandpain.biomedcentral.com/">
                          thejournalofheadacheandpain.biomedcentral.com
                        </Ext>
                      </td>
                    </tr>
                    <tr>
                      <td>Cephalalgia（IHS公式誌）</td>
                      <td>ICHD改訂・臨床試験</td>
                      <td>
                        <Ext href="https://journals.sagepub.com/home/cep">sagepub.com/home/cep</Ext>
                      </td>
                    </tr>
                    <tr>
                      <td>PubMed 頭痛日誌関連研究</td>
                      <td>最新エビデンスの確認</td>
                      <td>
                        <Ext href="https://pubmed.ncbi.nlm.nih.gov/?term=headache+diary+validation">
                          pubmed（headache diary validation）
                        </Ext>
                      </td>
                    </tr>
                    <tr>
                      <td>Cochrane Library — 頭痛レビュー</td>
                      <td>系統的レビュー</td>
                      <td>
                        <Ext href="https://www.cochranelibrary.com/search?query=headache+migraine&searchBy=3&type=cdsr">
                          cochranelibrary.com
                        </Ext>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <h3>G. 患者向け日誌テンプレート（無料ダウンロード）</h3>
              <div className="tbl">
                <table>
                  <thead>
                    <tr>
                      <th>資料</th>
                      <th>提供機関</th>
                      <th>URL</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>7日間頭痛日誌（2024年・PDF）</td>
                      <td>VA/DoD</td>
                      <td>
                        <Ext href="https://www.healthquality.va.gov/guidelines/pain/headache/HA-Diary-7-Day-Diary-Final-11Jan2024.pdf">
                          healthquality.va.gov（7-Day-Diary PDF）
                        </Ext>
                      </td>
                    </tr>
                    <tr>
                      <td>3ヶ月頭痛日誌（2024年）</td>
                      <td>VA/DoD</td>
                      <td>
                        <Ext href="https://www.healthquality.va.gov/guidelines/Pain/headache/">
                          healthquality.va.gov
                        </Ext>
                      </td>
                    </tr>
                    <tr>
                      <td>IHS患者リソース（日誌含む）</td>
                      <td>IHS</td>
                      <td>
                        <Ext href="https://ihs-headache.org/en/resources/patient-resources/">
                          ihs-headache.org/resources/patient-resources
                        </Ext>
                      </td>
                    </tr>
                    <tr>
                      <td>Migraine Trust 日誌ガイド</td>
                      <td>Migraine Trust（英国）</td>
                      <td>
                        <Ext href="https://migrainetrust.org/live-with-migraine/self-management/keeping-a-migraine-diary/">
                          migrainetrust.org
                        </Ext>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="alert a-warn">
                <div className="alert-i">📅</div>
                <div>
                  <strong>作成年：</strong>2026年 | <strong>次回レビュー推奨：</strong>
                  ICHD-4 正式発行時 / AAN・IHS 年次ガイドライン更新時
                  <br />
                  <strong>免責事項：</strong>
                  本資料は学術・教育・研究目的のみを対象としています。臨床への適用は必ず資格を持つ医療専門家の監督のもとで行ってください。本資料は個人への医療アドバイス・診断・処方を提供するものではありません。
                </div>
              </div>
            </section>
          </AutoGlossary>
        </main>
      </div>

      {/* FOOTER */}
      <div className="footer">
        <strong>頭痛日誌（Headache Diary）完全ガイド</strong> — 初学者向けステップバイステップ解説 —
        国際エビデンス準拠（ICHD-3 / IHS / AAN / VA-DoD）
        <br />📅 作成年: 2026 | 次回レビュー推奨: ガイドライン更新時
        <br />
        ⚠️
        本資料は学術・教育・研究目的のみを対象としています。臨床への適用は必ず資格を持つ医療専門家の監督のもとで行ってください。
      </div>
    </div>
  );
}
