import "./headache-diary.css";
import HeadacheDiarySidebar from "@/components/prom/HeadacheDiarySidebar";
import { Ext } from "@/components/Ext";
import MermaidDiagram from "@/components/MermaidDiagram";

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
          {/* ====================================================== SECTION 1 */}
          <section id="s1" className="sec">
            <div className="sec-hd">
              <div className="sec-num">1</div>
              <h2 className="sec-title">SNOOP4 レッドフラッグスクリーニング（最優先評価）</h2>
            </div>

            <div className="alert a-danger">
              <div className="alert-i">⛔</div>
              <div>
                以下の兆候がある場合は、<strong>頭痛日誌の開始より前に緊急医療評価（CT/MRI）が必要</strong>
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
                    <td>
                      進行性の悪化・外傷後・体位依存性（臥位悪化→ICP↑、立位悪化→ICP↓）
                    </td>
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
                    <td>
                      月あたり使用日数のリアルタイム監視 → 8〜10日/月の閾値超過を可視化
                    </td>
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
                    <td>Valade D et al., 2008 (<em>Cephalalgia</em>)</td>
                    <td>頭痛センター初診患者 n=76</td>
                    <td>
                      片頭痛感度92%・TTH感度75%・MOH感度75%（臨床面接との比較）；コンプライアンス71%
                    </td>
                    <td>
                      <span className="bB">Grade B</span>
                    </td>
                  </tr>
                  <tr>
                    <td>Vandenbussche N et al., 2025 (<em>Neurol Int</em>)</td>
                    <td>27名・90日間スマートフォン日誌</td>
                    <td>「確実な片頭痛」の新規ICHD-3症状を患者の97%以上で追加検出</td>
                    <td>
                      <span className="bB">Grade B</span>
                    </td>
                  </tr>
                  <tr>
                    <td>Peng KP et al., 2024 (<em>J Headache Pain</em>)</td>
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
                definition={`flowchart LR
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
                    <td>
                      スクリーニング感度95.2%（ICHD基準の自己報告版）[PubMed: PMC3850931]
                    </td>
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
                definition={`flowchart TD
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
                definition={`mindmap
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
                    <td>
                      ICHD-3診断基準（片頭痛：4〜72h、TTH：30min〜7日）の判定に必須
                    </td>
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
                    <td>
                      気象感受性の評価（約40%の片頭痛患者が気候変化に感受性あり）
                    </td>
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
        </main>
      </div>
    </div>
  );
}
