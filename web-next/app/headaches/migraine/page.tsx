import { Ext } from "@/components/Ext";
import { MigraineSidebar } from "@/components/headaches/MigraineSidebar";
import MermaidDiagram from "@/components/MermaidDiagram";
import "./migraine.css";

const MIGRAINE_MERMAID_THEME = {
  primaryColor: "#e8eaf6",
  primaryTextColor: "#1a237e",
  primaryBorderColor: "#5c6bc0",
  lineColor: "#546e7a",
  secondaryColor: "#e0f2f1",
  tertiaryColor: "#e8f5e9",
  edgeLabelBackground: "#ffffff",
  fontSize: "13px",
};

export default function MigrainePage() {
  return (
    <div className="migraine-accent">
      {/* HERO */}
      <div className="hero">
        <div>🧠</div>
        <h1>片頭痛（Migraine）完全ガイド</h1>
        <p className="hero-sub">
          国際エビデンス（ICHD-3 / AAN / EHF / IHS 2024）に基づく包括的解説 —
          初学者向けステップバイステップ
        </p>
        <div className="hero-tags">
          <span className="hero-tag">ICHD-3 準拠</span>
          <span className="hero-tag">Grade A〜U エビデンス表記</span>
          <span className="hero-tag">CGRP 最新療法</span>
          <span className="hero-tag">SNOOP4 スクリーニング</span>
          <span className="hero-tag">MOH 対策</span>
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
        <MigraineSidebar />

        {/* MAIN CONTENT */}
        <main className="main">
          {/* ============================================================ SECTION 1 */}
          <section id="s1" className="sec">
            <div className="sec-hd">
              <div className="sec-num">1</div>
              <h2 className="sec-title">片頭痛とは何か — 基礎概念</h2>
            </div>

            <p>
              片頭痛（Migraine）は単なる「強い頭痛」ではなく、
              <strong>神経系を中心とする複雑な神経血管疾患</strong>です。WHO は片頭痛を
              <strong>世界で最も障害を引き起こす神経疾患第1位</strong>
              （15〜49歳）と位置づけています。
            </p>

            <h3>片頭痛の 4 つの病期</h3>
            <div className="phase-grid">
              <div className="ph ph1">
                <div className="ph-icon">🟡</div>
                <div className="ph-title">前駆期（Prodrome）</div>
                <div className="ph-time">数時間〜48時間前</div>
                <div className="ph-desc">疲労・あくび・食欲変化・光過敏・集中困難・気分変動</div>
              </div>
              <div className="ph ph2">
                <div className="ph-icon">🔵</div>
                <div className="ph-title">前兆期（Aura）</div>
                <div className="ph-time">5〜60分 ※約30%のみ</div>
                <div className="ph-desc">視覚・感覚・言語・運動症状（完全可逆性）</div>
              </div>
              <div className="ph ph3">
                <div className="ph-icon">🔴</div>
                <div className="ph-title">頭痛期（Headache）</div>
                <div className="ph-time">4〜72時間</div>
                <div className="ph-desc">
                  片側拍動性・中等度以上・日常動作で増悪・悪心・光音過敏
                </div>
              </div>
              <div className="ph ph4">
                <div className="ph-icon">🟢</div>
                <div className="ph-title">後発期（Postdrome）</div>
                <div className="ph-time">数時間〜48時間</div>
                <div className="ph-desc">疲労・認知障害・軽度頭痛・集中困難の残存</div>
              </div>
            </div>

            <h3>前兆（Aura）の種類</h3>
            <div className="tbl">
              <table>
                <thead>
                  <tr>
                    <th>前兆の種類</th>
                    <th>症状の例</th>
                    <th>持続時間</th>
                    <th>頻度</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <strong>視覚性前兆</strong>（最多）
                    </td>
                    <td>ジグザグ光・閃輝暗点・視野欠損</td>
                    <td>5〜60分</td>
                    <td>Aura 患者の &gt;90%</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>感覚性前兆</strong>
                    </td>
                    <td>顔・手のしびれ・ちくちく感</td>
                    <td>5〜60分</td>
                    <td>約30〜40%</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>言語性前兆</strong>
                    </td>
                    <td>言葉が出にくい・失語</td>
                    <td>5〜60分</td>
                    <td>約10〜20%</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>運動性前兆</strong>（片麻痺性）
                    </td>
                    <td>片側の筋力低下（完全可逆性）</td>
                    <td>5〜72時間</td>
                    <td>稀</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>脳幹性前兆</strong>
                    </td>
                    <td>めまい・複視・構音障害</td>
                    <td>5〜60分</td>
                    <td>稀</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="alert a-info">
              <div className="alert-i">ℹ️</div>
              <div>
                前兆は<strong>全患者の約30%</strong>
                にのみ見られます。前兆がない場合でも片頭痛と診断されます。前兆の有無は ICHD-3
                の分類コードに影響します（1.1 vs 1.2）。
              </div>
            </div>
          </section>

          {/* ============================================================ SECTION 2 */}
          <section id="s2" className="sec">
            <div className="sec-hd">
              <div className="sec-num">2</div>
              <h2 className="sec-title">疫学・世界的疾病負荷</h2>
            </div>

            <h3>主要な疫学データ</h3>
            <div className="tbl">
              <table>
                <thead>
                  <tr>
                    <th>指標</th>
                    <th>データ</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>世界有病率</td>
                    <td>
                      約 <strong>15%</strong>（約11億人）
                    </td>
                  </tr>
                  <tr>
                    <td>女性：男性比</td>
                    <td>
                      約 <strong>3:1</strong>（エストロゲン関連）
                    </td>
                  </tr>
                  <tr>
                    <td>好発年齢</td>
                    <td>
                      <strong>25〜55歳</strong>（生産年齢層）
                    </td>
                  </tr>
                  <tr>
                    <td>慢性化移行率</td>
                    <td>
                      年間約 <strong>2.5%</strong> がエピソード性 → 慢性化
                    </td>
                  </tr>
                  <tr>
                    <td>DALY ランキング（神経疾患）</td>
                    <td>
                      WHO <strong>第1位</strong>（15〜49歳）
                    </td>
                  </tr>
                  <tr>
                    <td>年間経済損失（米国）</td>
                    <td>
                      約 <strong>360億ドル</strong>（医療費＋生産性損失）
                    </td>
                  </tr>
                  <tr>
                    <td>未診断・未治療率</td>
                    <td>
                      先進国でも約 <strong>50%</strong> が適切な治療を受けていない
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3>年齢・性別別有病率</h3>
            <div className="tbl">
              <table>
                <thead>
                  <tr>
                    <th>年齢層</th>
                    <th>男性</th>
                    <th>女性</th>
                    <th>特記</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>小児（&lt;12歳）</td>
                    <td>4〜7%</td>
                    <td>4〜7%</td>
                    <td>性差なし（思春期前）</td>
                  </tr>
                  <tr>
                    <td>青年期（12〜18歳）</td>
                    <td>7〜10%</td>
                    <td>14〜18%</td>
                    <td>女性優位が始まる</td>
                  </tr>
                  <tr>
                    <td>成人（25〜45歳）</td>
                    <td>6〜8%</td>
                    <td>
                      <strong>18〜25%</strong>
                    </td>
                    <td>ピーク有病率</td>
                  </tr>
                  <tr>
                    <td>中高年（&gt;55歳）</td>
                    <td>4〜5%</td>
                    <td>11〜15%</td>
                    <td>閉経後に女性は減少傾向</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p style={{ fontSize: 12, color: "var(--g6)" }}>
              📌 ソース:{" "}
              <Ext href="https://www.thelancet.com/journals/laneur/article/PIIS1474-4422(20)30407-2/fulltext">
                GBD 2019 — Lancet Neurology
              </Ext>{" "}
              |{" "}
              <Ext href="https://www.who.int/news-room/fact-sheets/detail/headache-disorders">
                WHO Headache Disorders
              </Ext>
            </p>
          </section>

          {/* ============================================================ SECTION 3 */}
          <section id="s3" className="sec">
            <div className="sec-hd">
              <div className="sec-num">3</div>
              <h2 className="sec-title">病態生理学 — なぜ頭痛が起きるのか</h2>
            </div>

            <p>
              片頭痛は<strong>「神経血管疾患」</strong>
              です。遺伝的素因を持つ人が環境トリガーにさらされると、脳内で複雑なカスケードが生じ、最終的に激しい頭痛を引き起こします。
            </p>

            <div className="mmd">
              <div className="mmd-lbl">病態生理カスケード（上から順に発生）</div>
              <MermaidDiagram
                themeVariables={MIGRAINE_MERMAID_THEME}
                chart={`flowchart TD
A["🧬 遺伝的素因 ＋ 環境トリガー\\n（ストレス・睡眠変化・ホルモン変動）"]
B["皮質拡延性抑制（CSD）\\n神経電気活動の波状抑制（約3mm/分）\\n→ 前兆症状の神経生理学的基盤"]
C["三叉神経血管系の活性化\\n（Trigeminovascular Activation）\\n硬膜・軟膜の感覚神経終末"]
D["神経ペプチドの大量放出\\nCGRP・Substance P・PACAP\\n強力な血管拡張・神経炎症物質"]
E["硬膜血管の拡張 ＋ 神経因性炎症\\n肥満細胞の脱顆粒"]
F["三叉神経核尾側亜核（TNC）\\nへの侵害信号伝達"]
G["視床 → 大脳皮質（S1・島皮質）\\nへの痛み信号伝達"]
H["中枢感作（Central Sensitization）\\n痛み信号の増幅 → 慢性化リスク↑"]
I["🔴 片頭痛発作\\n片側拍動性頭痛 ＋ 光・音過敏・悪心"]

A --> B --> C --> D --> E --> F --> G --> H --> I

style A fill:#e3f2fd,stroke:#1565c0,color:#0d2f6b
style D fill:#fce4ec,stroke:#c62828,color:#7b1a1a
style H fill:#f3e5f5,stroke:#6a1b9a,color:#4a1169
style I fill:#ffebee,stroke:#b71c1c,color:#7b1a1a`}
              />
            </div>

            <h3>CGRP（カルシトニン遺伝子関連ペプチド）の役割</h3>
            <p>
              CGRP は片頭痛研究における<strong>パラダイムシフト</strong>
              をもたらした神経ペプチドです。
            </p>
            <div className="tbl">
              <table>
                <thead>
                  <tr>
                    <th>特性</th>
                    <th>詳細</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>産生部位</td>
                    <td>三叉神経節・脊髄後角・脳幹</td>
                  </tr>
                  <tr>
                    <td>主な作用</td>
                    <td>強力な脳血管拡張、神経炎症促進、痛み感受性亢進</td>
                  </tr>
                  <tr>
                    <td>発作中の血中濃度</td>
                    <td>
                      健常者の <strong>2〜4倍</strong> に上昇
                    </td>
                  </tr>
                  <tr>
                    <td>治療標的①</td>
                    <td>受容体拮抗（ゲパント：gepants）</td>
                  </tr>
                  <tr>
                    <td>治療標的②</td>
                    <td>リガンドまたは受容体の中和（モノクローナル抗体：mAbs）</td>
                  </tr>
                  <tr>
                    <td>心血管的意義</td>
                    <td>
                      <strong>血管収縮作用なし</strong> → 心疾患患者にも使用可能
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p style={{ fontSize: 12, color: "var(--g6)" }}>
              📌 ソース:{" "}
              <Ext href="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC9188162/">
                EHF CGRP mAbs ガイドライン 2022 (PMC)
              </Ext>
            </p>
          </section>

          {/* ============================================================ SECTION 4 */}
          <section id="s4" className="sec">
            <div className="sec-hd">
              <div className="sec-num">4</div>
              <h2 className="sec-title">ICHD-3 分類・診断基準</h2>
            </div>

            <h3>主要な分類コード一覧</h3>
            <div className="tbl">
              <table>
                <thead>
                  <tr>
                    <th>コード</th>
                    <th>分類名</th>
                    <th>定義の概要</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <strong>1.1</strong>
                    </td>
                    <td>前兆のない片頭痛</td>
                    <td>4〜72時間の頭痛、ICHD-3 A〜E 基準を満たす（≥5回）</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>1.2</strong>
                    </td>
                    <td>前兆のある片頭痛</td>
                    <td>上記 ＋ 可逆的な神経症状（Aura）≥2回</td>
                  </tr>
                  <tr>
                    <td>1.2.1</td>
                    <td>典型的前兆を伴う片頭痛</td>
                    <td>視覚・感覚・言語前兆のいずれか</td>
                  </tr>
                  <tr>
                    <td>1.2.2</td>
                    <td>脳幹性前兆を伴う片頭痛</td>
                    <td>めまい・複視・構音障害</td>
                  </tr>
                  <tr>
                    <td>1.2.3</td>
                    <td>片麻痺性片頭痛</td>
                    <td>運動性前兆（完全可逆性）</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>1.3</strong>
                    </td>
                    <td>慢性片頭痛</td>
                    <td>≥15日/月 かつ ≥3ヶ月、うち≥8日が片頭痛基準</td>
                  </tr>
                  <tr>
                    <td>2.1〜2.3</td>
                    <td>緊張型頭痛（稀/頻発/慢性）</td>
                    <td>圧迫性・両側性・軽〜中等度</td>
                  </tr>
                  <tr>
                    <td>3.1〜3.2</td>
                    <td>群発頭痛（エピソード/慢性）</td>
                    <td>一側眼窩周囲・激烈・自律症状</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>8.2</strong>
                    </td>
                    <td>薬物乱用頭痛（MOH）</td>
                    <td>鎮痛薬過剰使用による二次性頭痛（→ Section 13）</td>
                  </tr>
                  <tr>
                    <td>11.2</td>
                    <td>頸原性頭痛</td>
                    <td>頸部疾患に起因する頭痛</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="alert a-info">
              <div className="alert-i">📌</div>
              <div>
                ソース: <Ext href="https://ichd-3.org/">ICHD-3 公式サイト</Ext> |{" "}
                <Ext href="https://ichd-3.org/wp-content/uploads/2018/01/The-International-Classification-of-Headache-Disorders-3rd-Edition-2018.pdf">
                  ICHD-3 全文 PDF
                </Ext>{" "}
                | ICHD-4 最新動向:{" "}
                <Ext href="https://ihs-headache.org/en/about-ihs/standing-committees/classification/">
                  IHS 分類委員会
                </Ext>
              </div>
            </div>

            <h3>前兆のない片頭痛（1.1）正式診断基準</h3>
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
                    <td>
                      <strong>A</strong>
                    </td>
                    <td>
                      基準 B〜D を満たす発作が <strong>≥5回</strong>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <strong>B</strong>
                    </td>
                    <td>
                      頭痛持続時間 <strong>4〜72時間</strong>（未治療または治療無効の場合）
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <strong>C</strong>
                    </td>
                    <td>
                      以下の特徴の <strong>≥2項目</strong>
                      ：①片側性　②拍動性　③中等度〜重度　④日常動作で増悪
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <strong>D</strong>
                    </td>
                    <td>
                      頭痛中の <strong>≥1項目</strong>：①悪心/嘔吐　②光過敏 <strong>かつ</strong>{" "}
                      音過敏
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <strong>E</strong>
                    </td>
                    <td>他の疾患によって説明されない（SNOOP4 除外済み）</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3>診断分類フローチャート</h3>
            <div className="mmd">
              <div className="mmd-lbl">ICHD-3 診断フロー（SNOOP4 クリア後）</div>
              <MermaidDiagram
                themeVariables={MIGRAINE_MERMAID_THEME}
                chart={`flowchart TD
Start["頭痛患者が来院\\nSNOOP4 クリア済み"] --> Freq{"頭痛日数/月？"}
Freq -- "≥15日/月 ≥3ヶ月" --> Chronic["慢性頭痛カテゴリーへ"]
Freq -- "<15日/月" --> Type{"頭痛の特性確認\\nICHD-3 A〜E 基準"}
Type --> Pa{"拍動性・片側性\\n4〜72時間\\n悪心・光過敏あり？"}
Pa -- "≥2〜3項目 Yes" --> AuraQ{"前兆（Aura）あり？\\n（≥2回）"}
Pa -- "圧迫性・両側性\\n軽〜中等度" --> TTH["ICHD-3 2.x\\n緊張型頭痛"]
Pa -- "一側眼窩周囲\\n群発性・自律症状" --> Cl["ICHD-3 3.x\\n群発頭痛"]
AuraQ -- "なし" --> M11["✅ ICHD-3 1.1\\n前兆のない片頭痛"]
AuraQ -- "あり" --> M12["✅ ICHD-3 1.2\\n前兆のある片頭痛"]
Chronic --> MOH{"MOH 評価\\n薬剤過剰使用？"}
MOH -- "Yes" --> CM_MOH["ICHD-3 1.3 + 8.2\\n慢性片頭痛 ＋ MOH"]
MOH -- "No" --> CM["ICHD-3 1.3\\n慢性片頭痛"]

style M11 fill:#e8f5e9,stroke:#2e7d32,color:#1b5e20
style M12 fill:#e8f5e9,stroke:#2e7d32,color:#1b5e20
style CM_MOH fill:#fce4ec,stroke:#880e4f,color:#560027
style CM fill:#fff3e0,stroke:#e65100,color:#7b2e00
style TTH fill:#fffde7,stroke:#f9a825,color:#5c3d00
style Cl fill:#fffde7,stroke:#f9a825,color:#5c3d00`}
              />
            </div>
          </section>

          {/* ============================================================ SECTION 5 */}
          <section id="s5" className="sec">
            <div className="sec-hd">
              <div className="sec-num">5</div>
              <h2 className="sec-title">SNOOP4 レッドフラグスクリーニング</h2>
            </div>

            <div className="alert a-danger">
              <div className="alert-i">🚨</div>
              <div>
                <strong>最重要！</strong>
                　以下のいずれか1つでも存在する場合、一次性頭痛の治療を開始する<strong>前に</strong>
                緊急神経画像診断（CT/MRI）が<strong>必須</strong>
                です。命に関わる二次性頭痛を見逃さないための安全網です。
              </div>
            </div>

            <h3>SNOOP4 カード</h3>
            <div className="snoop-grid">
              <div className="sn">
                <div className="sn-letter">S</div>
                <div className="sn-title">Systemic — 全身症状</div>
                <div className="sn-symp">発熱・項部硬直・体重減少・免疫抑制・悪性腫瘍既往</div>
                <span className="sn-dx">→ 細菌性髄膜炎・脳転移</span>
              </div>
              <div className="sn">
                <div className="sn-letter">N</div>
                <div className="sn-title">Neurological — 神経学的欠損</div>
                <div className="sn-symp">運動麻痺・感覚障害・失語・複視・意識障害・認知変化</div>
                <span className="sn-dx">→ 脳卒中・脳腫瘍・硬膜下血腫</span>
              </div>
              <div className="sn">
                <div className="sn-letter">O</div>
                <div className="sn-title">Onset sudden — 突然発症</div>
                <div className="sn-symp">「生涯最悪の頭痛」・雷鳴頭痛（thunderclap headache）</div>
                <span className="sn-dx">→ くも膜下出血（SAH）！</span>
              </div>
              <div className="sn">
                <div className="sn-letter">O</div>
                <div className="sn-title">Over age 50 — 50歳以降</div>
                <div className="sn-symp">50歳以降の新規頭痛発症（特に急性または進行性）</div>
                <span className="sn-dx">→ 側頭動脈炎・頭蓋内病変</span>
              </div>
              <div className="sn">
                <div className="sn-letter">P</div>
                <div className="sn-title">Pattern change — パターン変化</div>
                <div className="sn-symp">
                  進行性増悪・外傷後新規・体位変化で変動（仰臥位増悪=ICP↑ / 起立位増悪=低ICP）
                </div>
                <span className="sn-dx">→ 頭蓋内圧亢進・低髄液圧</span>
              </div>
              <div className="sn">
                <div className="sn-letter">4</div>
                <div className="sn-title">4 つの追加フラグ</div>
                <div className="sn-symp">①乳頭浮腫　②硬膜穿刺後　③けいれん後　④妊娠/産後</div>
                <span className="sn-dx">→ ICP亢進・脳静脈洞血栓症・PRES</span>
              </div>
            </div>

            <h3>SNOOP4 スクリーニングフローチャート</h3>
            <div className="mmd">
              <div className="mmd-lbl">新規頭痛・パターン変化がある全症例に適用</div>
              <MermaidDiagram
                themeVariables={MIGRAINE_MERMAID_THEME}
                chart={`flowchart TD
A["新規頭痛患者 / パターン変化"]
B{"S: 全身症状\\n発熱・項部硬直\\n体重減少・免疫抑制？"}
C{"N: 神経学的欠損\\n麻痺・失語・複視\\n意識変化？"}
D{"O: 突然発症\\n雷鳴頭痛？"}
E{"O: 50歳以降\\n新規発症？"}
F{"P: パターン変化\\n進行性・体位依存性？"}
G{"4フラグ\\n乳頭浮腫・硬膜穿刺後\\nけいれん後・妊娠？"}
EM["🚨 即時緊急対応\\nCT → 腰椎穿刺（SAH除外）\\n感染症スクリーニング\\n脳神経外科コンサルト"]
UG["⚡ 緊急画像診断（24h以内）\\n側頭動脈炎疑い → CRP/ESR も"]
OK["✅ SNOOP4 クリア\\n一次性頭痛の診断・治療フローへ"]

A --> B
B -- "Yes" --> EM
B -- "No" --> C
C -- "Yes" --> EM
C -- "No" --> D
D -- "Yes" --> EM
D -- "No" --> E
E -- "Yes" --> UG
E -- "No" --> F
F -- "Yes" --> UG
F -- "No" --> G
G -- "Yes" --> UG
G -- "No" --> OK

style EM fill:#b71c1c,color:#ffffff
style UG fill:#e65100,color:#ffffff
style OK fill:#1b5e20,color:#ffffff`}
              />
            </div>
          </section>

          {/* ============================================================ SECTION 6 */}
          <section id="s6" className="sec">
            <div className="sec-hd">
              <div className="sec-num">6</div>
              <h2 className="sec-title">急性期治療</h2>
            </div>

            <h3>急性期治療薬の全体比較</h3>
            <div className="tbl">
              <table>
                <thead>
                  <tr>
                    <th>薬剤クラス</th>
                    <th>代表薬（用量）</th>
                    <th>機序</th>
                    <th>エビデンス</th>
                    <th>MOH リスク</th>
                    <th>心血管禁忌</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>NSAIDs</td>
                    <td>イブプロフェン 400〜800mg</td>
                    <td>COX-1/2 阻害</td>
                    <td>
                      <span className="bA">Grade A</span>
                    </td>
                    <td className="tO">≥15日/月</td>
                    <td className="tG">なし</td>
                  </tr>
                  <tr>
                    <td>単純鎮痛薬</td>
                    <td>アセトアミノフェン 1000mg</td>
                    <td>中枢性 COX 阻害</td>
                    <td>
                      <span className="bB">Grade B</span>
                    </td>
                    <td className="tO">≥15日/月</td>
                    <td className="tG">なし</td>
                  </tr>
                  <tr>
                    <td>トリプタン</td>
                    <td>スマトリプタン 50〜100mg</td>
                    <td>5-HT₁B/₁D 作動</td>
                    <td>
                      <span className="bA">Grade A</span>
                    </td>
                    <td className="tR">≥10日/月</td>
                    <td className="tR">⚠️ CAD・高血圧・脳卒中既往</td>
                  </tr>
                  <tr>
                    <td>ゲパント</td>
                    <td>ウブロゲパント 50〜100mg</td>
                    <td>CGRP 受容体拮抗</td>
                    <td>
                      <span className="bA">Grade A</span>
                    </td>
                    <td className="tG">低リスク</td>
                    <td className="tG">✅ なし</td>
                  </tr>
                  <tr>
                    <td>ゲパント</td>
                    <td>リメゲパント 75mg ODT</td>
                    <td>CGRP 受容体拮抗</td>
                    <td>
                      <span className="bA">Grade A</span>
                    </td>
                    <td className="tG">低リスク</td>
                    <td className="tG">✅ なし</td>
                  </tr>
                  <tr>
                    <td>ゲパント（点鼻）</td>
                    <td>ザベゲパント 10mg</td>
                    <td>CGRP 受容体拮抗</td>
                    <td>
                      <span className="bA">Grade A</span>
                    </td>
                    <td className="tG">低リスク</td>
                    <td className="tG">✅ なし</td>
                  </tr>
                  <tr>
                    <td>ジタン</td>
                    <td>ラスミジタン 50〜200mg</td>
                    <td>5-HT₁F 選択的作動</td>
                    <td>
                      <span className="bA">Grade A</span>
                    </td>
                    <td>未確定</td>
                    <td className="tG">✅ なし（⚠️ 運転禁止8h）</td>
                  </tr>
                  <tr>
                    <td>制吐薬（補助）</td>
                    <td>メトクロプラミド 10mg</td>
                    <td>D₂ 受容体拮抗</td>
                    <td>
                      <span className="bB">Grade B</span>
                    </td>
                    <td className="tG">なし</td>
                    <td className="tG">なし</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p style={{ fontSize: 12, color: "var(--g6)" }}>
              📌 ソース:{" "}
              <Ext href="https://journals.sagepub.com/doi/10.1177/03331024241252666">
                IHS 急性期治療推奨 2024（Cephalalgia 全文）
              </Ext>
            </p>

            <h3>急性期治療ステップフローチャート</h3>
            <div className="mmd">
              <div className="mmd-lbl">Step 1 → Step 2 → レスキューの順に進む</div>
              <MermaidDiagram
                themeVariables={MIGRAINE_MERMAID_THEME}
                chart={`flowchart TD
Start["🔴 片頭痛発作開始\\nMOH リスク確認（Section 13）"]
VAS{"重症度評価\\nVAS / NRS スコア"}
S1["📋 Step 1 — 軽度（VAS 1〜4）\\nNSAIDs（イブプロフェン 400〜800mg）\\nまたはアセトアミノフェン 1000mg\\n± 制吐薬（メトクロプラミド）\\n[Grade A/B]"]
CV{"心血管禁忌？\\n（CAD・高血圧・脳卒中既往）"}
S2a["📋 Step 2A — トリプタン\\nスマトリプタン 50〜100mg\\n[Grade A]"]
S2b["📋 Step 2B — CGRP 系\\nゲパント（ウブロゲパント等）\\nまたはジタン（ラスミジタン）\\n[Grade A]"]
S3["📋 Step 3 — 院内レスキュー\\nIV メトクロプラミド 10mg\\n＋ IV ケトロラク 30mg\\nまたは IV バルプロ酸 500mg\\n[Grade B/C]"]
Rescue["🏥 救急対応\\nIV ジヒドロエルゴタミン（DHE）\\nまたは IV ドパミン拮抗薬"]
OK["✅ 発作終了\\n薬剤使用を記録\\nMOH 閾値を監視"]

Start --> VAS
VAS -- "VAS 1〜4 軽度" --> S1
VAS -- "VAS 5〜10 中〜重度" --> CV
CV -- "No（禁忌なし）" --> S2a
CV -- "Yes（禁忌あり）" --> S2b
S1 -- "2h 後 効果不十分" --> CV
S2a -- "2h 後 効果不十分" --> S3
S2b -- "2h 後 効果不十分" --> S3
S2a -- "2h 後 改善 ✅" --> OK
S2b -- "2h 後 改善 ✅" --> OK
S1 -- "2h 後 改善 ✅" --> OK
S3 -- "効果不十分" --> Rescue

style Start fill:#ffcdd2,stroke:#c62828,color:#7b1a1a
style S1 fill:#e8f5e9,stroke:#2e7d32,color:#1b5e20
style S2a fill:#fff3e0,stroke:#e65100,color:#7b2e00
style S2b fill:#e3f2fd,stroke:#1565c0,color:#0d2f6b
style S3 fill:#fce4ec,stroke:#880e4f,color:#560027
style Rescue fill:#880e4f,color:#ffffff
style OK fill:#1b5e20,color:#ffffff`}
              />
            </div>

            <h3>トリプタン 7 剤の特性比較</h3>
            <div className="tbl">
              <table>
                <thead>
                  <tr>
                    <th>トリプタン</th>
                    <th>主な剤形</th>
                    <th>用量</th>
                    <th>T_max</th>
                    <th>半減期</th>
                    <th>特徴</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>スマトリプタン</td>
                    <td>経口・皮下注・点鼻</td>
                    <td>50〜100mg</td>
                    <td>1〜2h</td>
                    <td>2h</td>
                    <td>最多研究。皮下注が最速。</td>
                  </tr>
                  <tr>
                    <td>リザトリプタン</td>
                    <td>経口（ODT）</td>
                    <td>5〜10mg</td>
                    <td>1〜1.5h</td>
                    <td>2〜3h</td>
                    <td>速効性。口腔内崩壊錠で嚥下不要。</td>
                  </tr>
                  <tr>
                    <td>エレトリプタン</td>
                    <td>経口</td>
                    <td>20〜40mg</td>
                    <td>1.5〜2h</td>
                    <td>4〜5h</td>
                    <td>強力・再燃が少ない。</td>
                  </tr>
                  <tr>
                    <td>ナラトリプタン</td>
                    <td>経口</td>
                    <td>2.5mg</td>
                    <td>2〜3h</td>
                    <td>6h</td>
                    <td>緩効性・副作用少・再燃少。</td>
                  </tr>
                  <tr>
                    <td>ゾルミトリプタン</td>
                    <td>経口・点鼻</td>
                    <td>2.5〜5mg</td>
                    <td>1〜2h</td>
                    <td>3h</td>
                    <td>点鼻剤は吸収が速い。</td>
                  </tr>
                  <tr>
                    <td>フロバトリプタン</td>
                    <td>経口</td>
                    <td>2.5mg</td>
                    <td>2〜4h</td>
                    <td>
                      <strong>26h</strong>
                    </td>
                    <td>最長半減期・再燃リスク最低。</td>
                  </tr>
                  <tr>
                    <td>アルモトリプタン</td>
                    <td>経口</td>
                    <td>12.5mg</td>
                    <td>1〜3h</td>
                    <td>3〜4h</td>
                    <td>耐容性良好・副作用少。</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="alert a-danger">
              <div className="alert-i">⚠️</div>
              <div>
                <strong>トリプタン禁忌・相互作用（必ずチェック）</strong>
                <br />
                絶対禁忌：冠動脈疾患・脳卒中/TIA 既往・コントロール不良高血圧・片麻痺性/脳幹性片頭痛
                <br />
                MAO-I との併用：<strong>絶対禁忌</strong>（セロトニン症候群の重篤リスク）
                <br />
                SSRIs/SNRIs との併用：セロトニン症候群リスク（絶対禁忌ではないが要モニタリング）
              </div>
            </div>
          </section>

          {/* ============================================================ SECTION 7 */}
          <section id="s7" className="sec">
            <div className="sec-hd">
              <div className="sec-num">7</div>
              <h2 className="sec-title">予防療法</h2>
            </div>

            <h3>予防療法の適応基準</h3>
            <div className="tbl">
              <table className="th-teal">
                <thead>
                  <tr>
                    <th>適応基準</th>
                    <th>閾値</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>発作頻度</td>
                    <td>
                      <strong>≥4回/月</strong>
                    </td>
                  </tr>
                  <tr>
                    <td>頭痛日数</td>
                    <td>
                      <strong>≥8日/月</strong>
                    </td>
                  </tr>
                  <tr>
                    <td>重大な機能障害</td>
                    <td>
                      HIT-6 <strong>≥60</strong> または MIDAS <strong>≥21</strong>
                    </td>
                  </tr>
                  <tr>
                    <td>急性期治療の失敗</td>
                    <td>2種類以上の急性期治療が無効</td>
                  </tr>
                  <tr>
                    <td>特別な病型</td>
                    <td>片麻痺性片頭痛・脳幹性前兆・頻回の Aura</td>
                  </tr>
                  <tr>
                    <td>急性期治療に禁忌</td>
                    <td>すべての急性期薬に禁忌がある場合</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3>予防薬の比較（エビデンスグレード付き）</h3>
            <div className="tbl">
              <table>
                <thead>
                  <tr>
                    <th>薬剤</th>
                    <th>用量/日</th>
                    <th>エビデンス</th>
                    <th>NNT（50%↓）</th>
                    <th>主な副作用</th>
                    <th>禁忌</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <strong>プロプラノロール</strong>
                    </td>
                    <td>40〜240mg</td>
                    <td>
                      <span className="bA">Grade A</span> (AAN)
                    </td>
                    <td>3.5〜4.5</td>
                    <td>疲労・低血圧・徐脈</td>
                    <td>喘息・COPD・糖尿病</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>トピラマート</strong>
                    </td>
                    <td>50〜200mg</td>
                    <td>
                      <span className="bA">Grade A</span> (AAN)
                    </td>
                    <td>3.5〜4.0</td>
                    <td>認知障害・腎結石・体重減少</td>
                    <td>
                      <span className="bRed">妊娠 Category D</span>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <strong>バルプロ酸</strong>
                    </td>
                    <td>500〜1500mg</td>
                    <td>
                      <span className="bA">Grade A</span> (AAN)
                    </td>
                    <td>3.0〜4.0</td>
                    <td>体重増加・脱毛・催奇形性</td>
                    <td>
                      <span className="bRed">妊娠 Category X・REMS</span>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <strong>アミトリプチリン</strong>
                    </td>
                    <td>10〜150mg</td>
                    <td>
                      <span className="bB">Grade B</span> (AAN)
                    </td>
                    <td>3.5〜5.0</td>
                    <td>眠気・口渇・体重増加</td>
                    <td>緑内障・不整脈・MAO-I</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>ベンラファキシン</strong>
                    </td>
                    <td>75〜150mg</td>
                    <td>
                      <span className="bB">Grade B</span> (AAN)
                    </td>
                    <td>4.0〜5.0</td>
                    <td>悪心・血圧上昇</td>
                    <td>MAO-I 使用中</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>ボツリヌストキシン A</strong>
                    </td>
                    <td>155〜195単位 IM</td>
                    <td>
                      <span className="bA">Grade A</span>（慢性のみ）
                    </td>
                    <td>4.5〜6.0</td>
                    <td>注射部位痛・頸部脱力</td>
                    <td>筋神経接合部疾患</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>エレヌマブ</strong>（CGRP mAb）
                    </td>
                    <td>70〜140mg SC 月1回</td>
                    <td>
                      <span className="bA">Grade A</span>
                    </td>
                    <td>3.0〜4.5</td>
                    <td>注射部位反応・便秘</td>
                    <td>妊娠/授乳：データ不十分</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>フレマネズマブ</strong>（CGRP mAb）
                    </td>
                    <td>225mg月1回 or 675mg/季</td>
                    <td>
                      <span className="bA">Grade A</span>
                    </td>
                    <td>3.0〜4.0</td>
                    <td>注射部位反応</td>
                    <td>同上</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>ガルカネズマブ</strong>（CGRP mAb）
                    </td>
                    <td>初回240mg→120mg月1回</td>
                    <td>
                      <span className="bA">Grade A</span>
                    </td>
                    <td>3.5〜4.5</td>
                    <td>注射部位反応</td>
                    <td>同上</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>エプチネズマブ</strong>（CGRP mAb）
                    </td>
                    <td>100〜300mg IV 3ヶ月毎</td>
                    <td>
                      <span className="bA">Grade A</span>
                    </td>
                    <td>3.0〜4.0</td>
                    <td>過敏反応（IV）</td>
                    <td>同上</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p style={{ fontSize: 12, color: "var(--g6)" }}>
              📌 ソース:{" "}
              <Ext href="https://www.aan.com/guidelines/home/getguidelinecontent/545">
                AAN/AHS 片頭痛予防ガイドライン
              </Ext>{" "}
              |{" "}
              <Ext href="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC9188162/">
                EHF CGRP mAbs ガイドライン 2022
              </Ext>
            </p>

            <h3>予防療法選択フローチャート</h3>
            <div className="mmd">
              <div className="mmd-lbl">合併症・禁忌に応じた選択アルゴリズム</div>
              <MermaidDiagram
                themeVariables={MIGRAINE_MERMAID_THEME}
                chart={`flowchart TD
A["予防療法の適応あり"]
B{"合併症・禁忌の確認"}
Beta["β遮断薬\\nプロプラノロール\\n[Grade A]"]
TCA["三環系抗うつ薬\\nアミトリプチリン\\n[Grade B]"]
AED["バルプロ酸\\n（非妊婦のみ）\\n[Grade A]"]
TPM["トピラマート\\n（肥満合併・非妊婦）\\n[Grade A]"]
PG{"妊娠中\\nまたは妊娠希望？"}
Preg["非薬物療法を優先\\nマグネシウム等を考慮\\n頭痛専門医へ紹介\\n（CGRP mAb は避ける）"]
CV{"心血管禁忌あり？"}
FL["第1選択\\nプロプラノロール\\nまたはトピラマート\\n[Grade A]"]
CGRP["CGRP mAb を検討"]
CT{"慢性片頭痛\\n（≥15日/月）？"}
All4["4種 CGRP mAb ＋\\nBotox も選択肢\\n[Grade A]"]
C3["エレヌマブ /\\nフレマネズマブ /\\nガルカネズマブ\\n[Grade A]"]
Sp["頭痛専門医\\nへ紹介"]

A --> B
B -- "高血圧あり" --> Beta
B -- "うつ・不眠あり" --> TCA
B -- "てんかん合併（非妊婦）" --> AED
B -- "肥満あり（非妊婦）" --> TPM
B -- "特記なし" --> PG
PG -- "Yes（妊娠あり）" --> Preg
PG -- "No" --> CV
CV -- "No（心血管禁忌なし）" --> FL
CV -- "Yes（心血管禁忌あり）" --> CGRP
FL -- "3ヶ月後 50%改善なし" --> CGRP
CGRP --> CT
CT -- "Yes" --> All4
CT -- "No（エピソード性）" --> C3
All4 -- "6ヶ月後 効果不十分" --> Sp
C3 -- "効果不十分" --> Sp

style Preg fill:#e3f2fd,stroke:#0277bd,color:#01579b
style FL fill:#e8f5e9,stroke:#2e7d32,color:#1b5e20
style CGRP fill:#fff3e0,stroke:#e65100,color:#7b2e00
style All4 fill:#e8f5e9,stroke:#2e7d32,color:#1b5e20
style C3 fill:#e8f5e9,stroke:#2e7d32,color:#1b5e20
style Sp fill:#fce4ec,stroke:#880e4f,color:#560027`}
              />
            </div>
            <p style={{ fontSize: 12, color: "var(--g6)" }}>
              📌 ボツリヌストキシン A（PREEMPT）:{" "}
              <Ext href="https://www.cochranelibrary.com/cdsr/doi/10.1002/14651858.CD011914">
                Cochrane レビュー
              </Ext>{" "}
              | AAN 2024 ドラフト:{" "}
              <Ext href="https://www.aan.com/siteassets/home-page/policy-and-guidelines/guidelines/guidelines-and-measures-open-for-public-comment/24-pharmacologic-treatment-for-migraine-prevention-in-adults_draft_08-14-2024.pdf">
                PDF
              </Ext>
            </p>
          </section>

          {/* ============================================================ SECTION 8 */}
          <section id="s8" className="sec">
            <div className="sec-hd">
              <div className="sec-num">8</div>
              <h2 className="sec-title">CGRP 経路と最新治療薬</h2>
            </div>

            <h3>CGRP 経路と治療介入点</h3>
            <div className="mmd">
              <div className="mmd-lbl">
                三叉神経 → CGRP 放出 → 受容体 → 血管拡張・頭痛 の各段階に薬剤が介入
              </div>
              <MermaidDiagram
                themeVariables={MIGRAINE_MERMAID_THEME}
                chart={`flowchart LR
TG["三叉神経節\\nTrigeminal Ganglion"]
CGRP["CGRP 放出\\n（強力な血管拡張物質）"]
Rec["CGRP 受容体\\n（硬膜血管・中枢神経）"]
Eff["血管拡張\\n神経炎症\\n痛み増幅"]
Pain["🔴 片頭痛発作"]
LigAb["💉 CGRP リガンド mAb\\nフレマネズマブ\\nガルカネズマブ\\nエプチネズマブ"]
RecAb["💉 CGRP 受容体 mAb\\nエレヌマブ"]
Gep["💊 ゲパント\\nウブロゲパント\\nリメゲパント\\nザベゲパント"]

TG --> CGRP --> Rec --> Eff --> Pain
LigAb -. "リガンドを中和（予防）" .-> CGRP
RecAb -. "受容体を遮断（予防）" .-> Rec
Gep -. "受容体を拮抗（急性・予防）" .-> Rec

style Pain fill:#ffcdd2,stroke:#c62828,color:#7b1a1a
style LigAb fill:#e8f5e9,stroke:#2e7d32,color:#1b5e20
style RecAb fill:#e8f5e9,stroke:#2e7d32,color:#1b5e20
style Gep fill:#e3f2fd,stroke:#1565c0,color:#0d2f6b`}
              />
            </div>

            <h3>CGRP mAb（モノクローナル抗体）4 剤比較</h3>
            <div className="drug-grid">
              <div className="drug">
                <div className="drug-nm">エレヌマブ</div>
                <div className="drug-br">Aimovig®（抗 CGRP 受容体）</div>
                <div className="drug-tx">
                  <strong>標的：</strong>CGRP <em>受容体</em>
                  <br />
                  <strong>投与：</strong>70〜140mg SC 月1回
                  <br />
                  <strong>適応：</strong>エピソード性・慢性
                  <br />
                  <span className="bA">Grade A</span>
                </div>
              </div>
              <div className="drug">
                <div className="drug-nm">フレマネズマブ</div>
                <div className="drug-br">Ajovy®（抗 CGRP リガンド）</div>
                <div className="drug-tx">
                  <strong>標的：</strong>CGRP <em>リガンド</em>
                  <br />
                  <strong>投与：</strong>225mg月1回 または 675mg四半期 SC
                  <br />
                  <strong>適応：</strong>エピソード性・慢性
                  <br />
                  <span className="bA">Grade A</span>
                </div>
              </div>
              <div className="drug">
                <div className="drug-nm">ガルカネズマブ</div>
                <div className="drug-br">Emgality®（抗 CGRP リガンド）</div>
                <div className="drug-tx">
                  <strong>標的：</strong>CGRP <em>リガンド</em>
                  <br />
                  <strong>投与：</strong>初回240mg → 120mg月1回 SC
                  <br />
                  <strong>適応：</strong>エピソード性・慢性・<strong>群発頭痛</strong>
                  <br />
                  <span className="bA">Grade A</span>
                </div>
              </div>
              <div className="drug">
                <div className="drug-nm">エプチネズマブ</div>
                <div className="drug-br">Vyepti®（抗 CGRP リガンド）</div>
                <div className="drug-tx">
                  <strong>標的：</strong>CGRP <em>リガンド</em>
                  <br />
                  <strong>投与：</strong>100〜300mg <strong>IV</strong> 3ヶ月毎
                  <br />
                  <strong>特徴：</strong>唯一の静脈内投与・即日効果
                  <br />
                  <span className="bA">Grade A</span>
                </div>
              </div>
            </div>

            <h3>ゲパント（Gepants）3 剤比較</h3>
            <div className="tbl">
              <table className="th-teal">
                <thead>
                  <tr>
                    <th>薬剤名</th>
                    <th>用量</th>
                    <th>用途</th>
                    <th>剤形</th>
                    <th>特徴</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <strong>ウブロゲパント</strong>（Ubrelvy）
                    </td>
                    <td>50〜100mg</td>
                    <td>
                      <span className="bOra">急性期のみ</span>
                    </td>
                    <td>錠剤</td>
                    <td>経口・30分で効果発現</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>リメゲパント</strong>（Nurtec ODT）
                    </td>
                    <td>75mg</td>
                    <td>
                      <span className="bA">急性期＋予防（隔日）</span>
                    </td>
                    <td>口腔内崩壊錠</td>
                    <td>唯一の双方向適応</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>ザベゲパント</strong>（Zavzpret）
                    </td>
                    <td>10mg</td>
                    <td>
                      <span className="bOra">急性期のみ</span>
                    </td>
                    <td>
                      <strong>点鼻剤</strong>
                    </td>
                    <td>最速吸収・消化器症状を回避</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3>従来薬 vs 新規 CGRP 薬の比較</h3>
            <div className="tbl">
              <table>
                <thead>
                  <tr>
                    <th>比較項目</th>
                    <th>トリプタン</th>
                    <th>ゲパント</th>
                    <th>ジタン</th>
                    <th>CGRP mAb（予防）</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>主な用途</td>
                    <td>急性期</td>
                    <td>急性期（一部予防）</td>
                    <td>急性期</td>
                    <td>
                      <strong>予防</strong>
                    </td>
                  </tr>
                  <tr>
                    <td>血管収縮</td>
                    <td className="tR">あり</td>
                    <td className="tG">なし</td>
                    <td className="tG">なし</td>
                    <td className="tG">なし</td>
                  </tr>
                  <tr>
                    <td>心血管禁忌</td>
                    <td className="tR">⚠️ あり</td>
                    <td className="tG">✅ なし</td>
                    <td className="tG">✅ なし</td>
                    <td className="tG">✅ なし</td>
                  </tr>
                  <tr>
                    <td>MOH リスク</td>
                    <td className="tR">高（≥10日/月）</td>
                    <td className="tG">低（データ蓄積中）</td>
                    <td>未確定</td>
                    <td className="tG">なし（予防薬）</td>
                  </tr>
                  <tr>
                    <td>2h 無痛率（急性）</td>
                    <td>約25〜40%</td>
                    <td>約20〜25%</td>
                    <td>約28〜38%</td>
                    <td>N/A</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p style={{ fontSize: 12, color: "var(--g6)" }}>
              📌 ソース:{" "}
              <Ext href="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC9188162/">
                EHF CGRP mAbs ガイドライン 2022
              </Ext>{" "}
              |{" "}
              <Ext href="https://journals.sagepub.com/doi/10.1177/03331024241252666">
                IHS 急性期推奨 2024
              </Ext>
            </p>
          </section>

          {/* ============================================================ SECTION 9 */}
          <section id="s9" className="sec">
            <div className="sec-hd">
              <div className="sec-num">9</div>
              <h2 className="sec-title">栄養補助療法（サプリメント）</h2>
            </div>

            <div className="alert a-warn">
              <div className="alert-i">⚠️</div>
              <div>
                補充療法は薬物療法の<strong>補完的手段</strong>
                であり、単独での代替治療ではありません。すべての推奨は国際ガイドラインに基づくエビデンスグレード付きです。医療専門家への相談なしに使用しないでください。
              </div>
            </div>

            <h3>エビデンス別サプリメント一覧</h3>
            <div className="tbl">
              <table>
                <thead>
                  <tr>
                    <th>サプリメント</th>
                    <th>推奨用量/日</th>
                    <th>エビデンス</th>
                    <th>推定機序</th>
                    <th>主な注意事項</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <strong>マグネシウム</strong>（グリシン酸塩/クエン酸塩）
                    </td>
                    <td>400〜600mg</td>
                    <td>
                      <span className="bA">Grade A/B</span> (AAN/EHF)
                    </td>
                    <td>CSD 抑制・NMDA 調節・ミトコンドリア機能</td>
                    <td>下痢（用量依存）・腎機能低下患者は慎重。目標血清 Mg ≥0.85 mmol/L</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>リボフラビン（B2）</strong>
                    </td>
                    <td>400mg</td>
                    <td>
                      <span className="bA">Grade A/B</span> (AAN)
                    </td>
                    <td>ETC Complex I 最適化・エネルギー代謝</td>
                    <td>尿が黄変（無害）。長期高用量でも安全</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>CoQ10</strong>（ユビキノール推奨）
                    </td>
                    <td>300mg</td>
                    <td>
                      <span className="bB">Grade B</span> (EHF)
                    </td>
                    <td>ETC Complex I/III サポート・抗酸化</td>
                    <td>スタチン服用者は補充推奨（スタチンが CoQ10 を低下）</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>メラトニン</strong>
                    </td>
                    <td>3mg（就寝前）</td>
                    <td>
                      <span className="bC">Grade C</span>
                    </td>
                    <td>抗酸化・概日リズム調節</td>
                    <td>睡眠障害合併例に特に有効</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>α-リポ酸</strong>
                    </td>
                    <td>600mg</td>
                    <td>
                      <span className="bC">Grade C</span>
                    </td>
                    <td>抗酸化・神経保護</td>
                    <td>低血糖（糖尿病患者は要注意）</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>オメガ3 FA</strong>（EPA+DHA）
                    </td>
                    <td>1〜3g</td>
                    <td>
                      <span className="bC">Grade C</span>
                    </td>
                    <td>抗神経炎症・プロスタグランジン調節</td>
                    <td>
                      <strong>&gt;3g で抗凝固薬と出血リスク↑</strong>（INR モニタリング）
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <strong>ジンジャー（ショウガ）エキス</strong>
                    </td>
                    <td>250mg</td>
                    <td>
                      <span className="bC">Grade C</span>
                    </td>
                    <td>急性悪心緩和・軽症発作補助</td>
                    <td>抗血小板薬との相互作用。術前中止</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3>注意が必要なサプリメント</h3>
            <div className="tbl th-red">
              <table>
                <thead>
                  <tr>
                    <th>サプリメント</th>
                    <th>グレード</th>
                    <th>重要な安全情報</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <strong>フィーバーフュー</strong>（MIG-99エキス）
                    </td>
                    <td>
                      <span className="bC">Grade C</span>（混在）
                    </td>
                    <td>
                      ワルファリン/抗血小板薬と<strong>出血リスク↑</strong>
                      。術前2週間で中止。肝酵素モニタリング
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <strong>バターバー</strong>（プコエキス）
                    </td>
                    <td>
                      <span className="bC">Grade C</span>
                    </td>
                    <td>
                      <strong className="tR">肝毒性リスク</strong>：
                      <u>PA-free 認定品（Petadolex® 等）のみ</u>使用可。未精製品は絶対に不可。定期的
                      LFT 測定必要
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <strong>ビタミン D</strong>
                    </td>
                    <td>
                      <span className="bC">Grade C</span>
                    </td>
                    <td>血清 &lt;30 ng/mL の欠乏確認後のみ補充。過剰補充で高カルシウム血症</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>高用量ビタミン B6</strong>
                    </td>
                    <td>
                      <span className="bRed">禁忌</span>
                    </td>
                    <td>
                      <strong>&gt;200mg/日で末梢神経障害リスク</strong>。この用量は推奨しない
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3>食事性トリガー管理</h3>
            <div className="alert a-info">
              <div className="alert-i">📋</div>
              <div>
                系統的なトリガー管理には<strong>最低30日間の頭痛日記</strong>
                の記録が必要です。トリガーは個人差が大きく、全例に共通するわけではありません。
              </div>
            </div>
            <div className="tbl">
              <table>
                <thead>
                  <tr>
                    <th>トリガー種別</th>
                    <th>具体例</th>
                    <th>推奨対策</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>アミン類</td>
                    <td>チラミン（熟成チーズ・発酵食品）・ヒスタミン（赤ワイン・加工肉）</td>
                    <td>低アミン食の試行（4〜8週）</td>
                  </tr>
                  <tr>
                    <td>食品添加物</td>
                    <td>亜硝酸塩（ハム）・MSG・アスパルテーム</td>
                    <td>成分表示の確認と回避</td>
                  </tr>
                  <tr>
                    <td>カフェイン</td>
                    <td>
                      コーヒー・エナジードリンク（<strong>離脱でリバウンド頭痛</strong>）
                    </td>
                    <td>段階的減量（急な中断は禁忌）</td>
                  </tr>
                  <tr>
                    <td>アルコール</td>
                    <td>特に赤ワイン・ビール</td>
                    <td>個人の感受性を日記で確認</td>
                  </tr>
                  <tr>
                    <td>行動的要因</td>
                    <td>食事スキップ・脱水・睡眠不規則</td>
                    <td>規則的な食事・水分 2L/日・睡眠リズム固定</td>
                  </tr>
                  <tr>
                    <td>ホルモン変動</td>
                    <td>月経前後（エストロゲン低下）</td>
                    <td>ホルモン日記・産婦人科連携</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* ============================================================ SECTION 10 */}
          <section id="s10" className="sec">
            <div className="sec-hd">
              <div className="sec-num">10</div>
              <h2 className="sec-title">多モーダル統合アプローチ</h2>
            </div>

            <p>
              片頭痛管理では単一の治療モダリティに依存せず、
              <strong>薬物・理学・行動・栄養の4本柱</strong>
              を統合した包括的アプローチが最大の効果を発揮します。
            </p>

            <div className="mmd">
              <div className="mmd-lbl">統合治療の全体像と評価サイクル（3ヶ月毎）</div>
              <MermaidDiagram
                themeVariables={MIGRAINE_MERMAID_THEME}
                chart={`flowchart TD
Center["🎯 片頭痛管理の目標\\n≥50%頭痛日数減少（3ヶ月）\\nHIT-6 / MIDAS 改善"]
Ph["💊 薬物療法\\n急性期：NSAIDs → トリプタン/ゲパント\\n予防：β遮断薬 / AED / CGRP mAb"]
PT["🏃 理学療法\\n頸部・肩甲帯 MMT\\nマニピュレーション・姿勢矯正\\n[Grade B]"]
BE["🧠 行動療法\\nCBT [Grade B]\\nバイオフィードバック [Grade B]\\n漸進的筋弛緩法 [Grade B]"]
NT["🥗 栄養補助\\nMg ＋ B2 ＋ CoQ10\\n食事トリガー日記\\n睡眠・水分管理"]
Mon["📊 3ヶ月後アウトカム評価\\nHIT-6 / MIDAS / VAS\\n頭痛日数・薬剤使用頻度"]
As{"目標達成？\\n≥50%改善？"}
Ok["✅ 維持・継続\\n6ヶ月毎フォロー"]
Up["🔺 治療強化\\nCGRP mAb 導入 or\\n頭痛専門医紹介"]

Center --> Ph & PT & BE & NT
Ph --> Mon
PT --> Mon
BE --> Mon
NT --> Mon
Mon --> As
As -- "Yes" --> Ok
As -- "No" --> Up

style Center fill:#e3f2fd,stroke:#1565c0,color:#0d2f6b
style Mon fill:#fff3e0,stroke:#e65100,color:#7b2e00
style Ok fill:#e8f5e9,stroke:#2e7d32,color:#1b5e20
style Up fill:#fce4ec,stroke:#880e4f,color:#560027`}
              />
            </div>

            <h3>行動・非薬物療法のエビデンス</h3>
            <div className="tbl">
              <table>
                <thead>
                  <tr>
                    <th>療法</th>
                    <th>エビデンス</th>
                    <th>効果</th>
                    <th>最適な対象患者</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <strong>認知行動療法（CBT）</strong>
                    </td>
                    <td>
                      <span className="bB">Grade B</span> (AAN)
                    </td>
                    <td>薬物療法と同等</td>
                    <td>不安/うつ合併・MOH 回避が必要な患者</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>バイオフィードバック</strong>
                    </td>
                    <td>
                      <span className="bB">Grade B</span> (AAN)
                    </td>
                    <td>NNT ≈ 4〜5</td>
                    <td>ストレス誘発型・薬剤を避けたい患者</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>漸進的筋弛緩法</strong>
                    </td>
                    <td>
                      <span className="bB">Grade B</span> (AAN)
                    </td>
                    <td>3ヶ月で40〜50%改善</td>
                    <td>全般的ストレス・緊張型頭痛合併</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>マインドフルネス（MBSR）</strong>
                    </td>
                    <td>
                      <span className="bC">Grade C</span>
                    </td>
                    <td>痛み感受性・破局化思考を低下</td>
                    <td>慢性化・中枢感作が進んだ症例</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>理学療法（頸部）</strong>
                    </td>
                    <td>
                      <span className="bB">Grade B</span>
                    </td>
                    <td>頸原性要因のある症例に特に有効</td>
                    <td>頸部痛合併型・姿勢不良</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>鍼治療</strong>
                    </td>
                    <td>
                      <span className="bB">Grade B</span> (Cochrane)
                    </td>
                    <td>トリプタンに非劣性のエビデンスあり</td>
                    <td>薬剤を避けたい患者・妊婦</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p style={{ fontSize: 12, color: "var(--g6)" }}>
              📌 ソース:{" "}
              <Ext href="https://www.cochranelibrary.com/cdsr/doi/10.1002/14651858.CD012295.pub2/full">
                Cochrane 心理療法レビュー（CBT/バイオフィードバック）
              </Ext>
            </p>
          </section>

          {/* ============================================================ SECTION 11 */}
          <section id="s11" className="sec">
            <div className="sec-hd">
              <div className="sec-num">11</div>
              <h2 className="sec-title">アウトカム評価ツール</h2>
            </div>

            <h3>標準化評価ツール一覧</h3>
            <div className="tbl">
              <table>
                <thead>
                  <tr>
                    <th>ツール</th>
                    <th>正式名称</th>
                    <th>スコア範囲</th>
                    <th>重症閾値</th>
                    <th>測定内容</th>
                    <th>使用タイミング</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <strong>HIT-6</strong>
                    </td>
                    <td>Headache Impact Test</td>
                    <td>36〜78点</td>
                    <td>
                      <span className="bRed">≥60 = 重度障害</span>
                    </td>
                    <td>日常生活・仕事・社会活動への影響</td>
                    <td>治療前・3ヶ月毎</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>MIDAS</strong>
                    </td>
                    <td>Migraine Disability Assessment</td>
                    <td>0〜∞</td>
                    <td>
                      <span className="bRed">≥21 = Grade IV 重度</span>
                    </td>
                    <td>過去3ヶ月の欠勤/欠席日数</td>
                    <td>治療前・3ヶ月毎</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>VAS/NRS</strong>
                    </td>
                    <td>Visual/Numerical Rating Scale</td>
                    <td>0〜10</td>
                    <td>7以上 = 重度</td>
                    <td>発作時の疼痛強度</td>
                    <td>発作毎（発症時・2h後）</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>PGIC</strong>
                    </td>
                    <td>Patient Global Impression of Change</td>
                    <td>1〜7点</td>
                    <td>6〜7 = 著明改善</td>
                    <td>患者による総合改善度評価</td>
                    <td>3〜6ヶ月後</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>MSQ v2.1</strong>
                    </td>
                    <td>Migraine-Specific Quality of Life</td>
                    <td>0〜100点</td>
                    <td>高スコア = 高 QOL</td>
                    <td>機能的/制限的/感情的 QOL</td>
                    <td>治療前後</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3>MIDAS スコアの解釈と対応</h3>
            <div className="tbl">
              <table className="th-orange">
                <thead>
                  <tr>
                    <th>MIDAS スコア</th>
                    <th>Grade</th>
                    <th>障害の程度</th>
                    <th>推奨アクション</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>0〜5点</td>
                    <td>Grade I</td>
                    <td>軽度または障害なし</td>
                    <td>急性期治療最適化・生活習慣介入</td>
                  </tr>
                  <tr>
                    <td>6〜10点</td>
                    <td>Grade II</td>
                    <td>軽度障害</td>
                    <td>急性期治療 ＋ トリガー管理</td>
                  </tr>
                  <tr>
                    <td>11〜20点</td>
                    <td>Grade III</td>
                    <td>中等度障害</td>
                    <td>予防療法の開始を強く検討</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>≥21点</strong>
                    </td>
                    <td>
                      <strong>Grade IV</strong>
                    </td>
                    <td>
                      <strong className="tR">重度障害</strong>
                    </td>
                    <td>予防療法 ＋ 専門医紹介</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3>治療成功の定義</h3>
            <div className="tbl">
              <table className="th-teal">
                <thead>
                  <tr>
                    <th>エンドポイント</th>
                    <th>目標値</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>頭痛日数の減少（3ヶ月後）</td>
                    <td>
                      <strong>≥50% 減少</strong>（最重要指標）
                    </td>
                  </tr>
                  <tr>
                    <td>HIT-6 変化</td>
                    <td>
                      <strong>5点以上</strong>の改善（MCID）
                    </td>
                  </tr>
                  <tr>
                    <td>MIDAS Grade</td>
                    <td>
                      <strong>1段階以上</strong>の改善
                    </td>
                  </tr>
                  <tr>
                    <td>急性期薬使用頻度</td>
                    <td>
                      <strong>MOH 閾値以下</strong>を維持（Section 13 参照）
                    </td>
                  </tr>
                  <tr>
                    <td>急性期の 2h 無痛率</td>
                    <td>
                      <strong>≥30%</strong>（発作時評価）
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
              <h2 className="sec-title">特殊集団への対応</h2>
            </div>

            <h3>特殊集団別ガイドライン</h3>
            <div className="tbl">
              <table>
                <thead>
                  <tr>
                    <th>集団</th>
                    <th>急性期治療</th>
                    <th>予防療法</th>
                    <th>特別注意事項</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <strong>小児（&lt;12歳）</strong>
                    </td>
                    <td>イブプロフェン 10mg/kg（第1選択）またはアセトアミノフェン 15mg/kg</td>
                    <td>プロプラノロール・アミトリプチリン（低用量）</td>
                    <td>トリプタン：12歳未満は点鼻スマトリプタンのみ一部承認</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>青年期（12〜18歳）</strong>
                    </td>
                    <td>トリプタン（点鼻含む）・NSAIDs</td>
                    <td>上記＋トピラマート（低用量）</td>
                    <td>
                      バルプロ酸：体重増加・<strong>催奇形性</strong>についてカウンセリング必須
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <strong>妊娠・授乳中</strong>
                    </td>
                    <td>
                      <strong>第1選択：アセトアミノフェン</strong>；重症：IV 硫酸マグネシウム 1〜2g
                    </td>
                    <td>
                      <strong>可能な限り避ける</strong>（必要な場合は β 遮断薬低用量）
                    </td>
                    <td>
                      <span className="bRed">
                        禁忌：バルプロ酸・トピラマート・エルゴタミン・CGRP mAb
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <strong>高齢者（&gt;65歳）</strong>
                    </td>
                    <td>アセトアミノフェン・低用量トリプタン（慎重に）</td>
                    <td>
                      アミトリプチリン <strong>10mg から開始</strong>；β
                      遮断薬（起立性低血圧モニタリング）
                    </td>
                    <td>
                      トピラマート：<strong>認知機能低下リスク↑</strong>。転倒リスク・SNOOP4
                      感度を高く
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <strong>心疾患患者</strong>
                    </td>
                    <td>
                      <strong>トリプタン・エルゴタミン禁忌</strong> → ゲパントまたはジタン
                    </td>
                    <td>CGRP mAb（血管収縮作用なし）</td>
                    <td>詳細な心血管リスク評価後に処方。NSAIDs も慎重（心不全・腎機能）</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>生殖年齢女性（バルプロ酸）</strong>
                    </td>
                    <td>—</td>
                    <td>
                      <strong>REMS 登録が必須</strong>（米国）；避妊指導の徹底
                    </td>
                    <td>予期しない妊娠に備え他の予防薬への切り替えを積極的に検討</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3>妊娠中の片頭痛管理フローチャート</h3>
            <div className="mmd">
              <div className="mmd-lbl">妊娠中の薬剤選択（安全性データに基づく）</div>
              <MermaidDiagram
                themeVariables={MIGRAINE_MERMAID_THEME}
                chart={`flowchart TD
A["妊娠中の片頭痛発作"]
B{"重症度？"}
C["✅ 第1選択\\nアセトアミノフェン 1g\\n＋ 暗室・安静・冷却\\n± 制吐薬（必要時）"]
D["IV 硫酸マグネシウム\\n1〜2g\\n（専門医管理下）\\n[安全データあり]"]
E{"妊娠週数？"}
F["低用量トリプタン\\n（個別リスク/ベネフィット評価）\\n最新安全データを確認"]
G["⚠️ トリプタンは慎重\\n産科専門医に相談"]
Avoid["❌ 絶対回避\\nバルプロ酸（Category X）\\nトピラマート（Category D）\\nエルゴタミン\\nCGRP mAb（安全データ不十分）\\nNSAIDs（第3三半期）"]

A --> B & Avoid
B -- "軽〜中等度" --> C
B -- "重度・難治性" --> D
C -- "効果不十分" --> E
E -- "第1〜2三半期" --> F
E -- "第3三半期" --> G

style D fill:#e3f2fd,stroke:#1565c0,color:#0d2f6b
style C fill:#e8f5e9,stroke:#2e7d32,color:#1b5e20
style Avoid fill:#b71c1c,color:#ffffff
style G fill:#e65100,color:#ffffff`}
              />
            </div>
          </section>

          {/* ============================================================ SECTION 13 */}
          <section id="s13" className="sec">
            <div className="sec-hd">
              <div className="sec-num">13</div>
              <h2 className="sec-title">薬物乱用頭痛（MOH）</h2>
            </div>
            <p>
              <strong>ICHD-3 コード: 8.2 — Medication-Overuse Headache</strong>
            </p>

            <div className="alert a-warn">
              <div className="alert-i">💊</div>
              <div>
                薬物乱用頭痛（MOH）は、頭痛治療薬の
                <strong>過剰使用によって逆説的に頭痛が増悪・慢性化する</strong>
                重要な落とし穴です。「頭痛 → 薬 → 一時改善 → 再び頭痛 →
                また薬」という悪循環が生じます。急性期治療計画では
                <strong>毎回 MOH リスクを評価・記録</strong>してください。
              </div>
            </div>

            <h3>MOH リスク閾値（ICHD-3 基準）</h3>
            <div className="moh-grid">
              <div className="moh moh-h">
                <div className="moh-day tR">≥10日/月</div>
                <div className="moh-unit">≥3ヶ月で乱用成立</div>
                <div className="moh-drug">🔴 高リスク</div>
                <p style={{ fontSize: 12, marginTop: 6 }}>トリプタン・エルゴタミン・オピオイド</p>
              </div>
              <div className="moh moh-m">
                <div className="moh-day tO">≥15日/月</div>
                <div className="moh-unit">≥3ヶ月で乱用成立</div>
                <div className="moh-drug">🟡 中リスク</div>
                <p style={{ fontSize: 12, marginTop: 6 }}>単純鎮痛薬・NSAIDs（単剤）</p>
              </div>
              <div className="moh moh-m">
                <div className="moh-day tO">≥10日/月</div>
                <div className="moh-unit">≥3ヶ月で乱用成立</div>
                <div className="moh-drug">🔴 非常に高リスク</div>
                <p style={{ fontSize: 12, marginTop: 6 }}>複合鎮痛薬（カフェイン・コデイン含有）</p>
              </div>
              <div className="moh moh-l">
                <div className="moh-day tG">閾値未定</div>
                <div className="moh-unit">データ蓄積中</div>
                <div className="moh-drug">🟢 低リスク（現時点）</div>
                <p style={{ fontSize: 12, marginTop: 6 }}>ゲパント・ジタン</p>
              </div>
            </div>

            <h3>MOH 診断・管理フローチャート</h3>
            <div className="mmd">
              <div className="mmd-lbl">MOH の診断から離脱・予防再発まで</div>
              <MermaidDiagram
                themeVariables={MIGRAINE_MERMAID_THEME}
                chart={`flowchart TD
A["頭痛日数 ≥15日/月\\n≥3ヶ月継続する患者"]
B{"鎮痛薬使用頻度\\nを確認"}
C["⚠️ MOH 診断\\nICHD-3: 8.2\\n同時に 1.3（慢性片頭痛）\\nも診断"]
D["MOH 以外の慢性化要因を検索\\n→ 1.3 慢性片頭痛として管理"]
S1["Step 1\\n過剰使用薬の段階的中止\\n（外来または入院）\\n患者教育が鍵"]
S2["Step 2\\n橋渡し療法\\nNSAIDs 短期\\nまたはステロイド短期"]
S3["Step 3\\n予防療法の開始\\nトピラマートまたは CGRP mAb"]
S4["Step 4\\n行動療法\\nCBT・動機付け面接"]
Wd["⚠️ 離脱症状に注意\\n頭痛一時増悪・悪心\\n不安・睡眠障害\\n（通常1〜2週間で改善）"]
Ev["3ヶ月後再評価\\nMIDAS / HIT-6\\n薬剤使用頻度記録"]
Ok["✅ 予防療法継続\\nMOH 再発防止教育\\n6ヶ月毎フォロー"]
Ref["頭痛専門医へ\\n紹介または入院管理"]

A --> B
B -- "トリプタン等 ≥10日/月\\nまたは NSAIDs ≥15日/月" --> C
B -- "閾値以下" --> D
C --> S1
S1 --> S2 --> S3 --> S4 --> Ev
S1 --> Wd
Ev --> Ok
Ev --> Ref

style C fill:#e65100,color:#ffffff
style Wd fill:#fce4ec,stroke:#880e4f,color:#560027
style Ok fill:#1b5e20,color:#ffffff
style Ref fill:#880e4f,color:#ffffff`}
              />
            </div>
          </section>

          {/* ============================================================ SECTION 14 */}
          <section id="s14" className="sec">
            <div className="sec-hd">
              <div className="sec-num">14</div>
              <h2 className="sec-title">参考文献・公式リソース</h2>
            </div>

            <div className="alert a-ok">
              <div className="alert-i">✅</div>
              <div>
                以下はすべて<strong>国際的に認可された公式ソース</strong>です。URL
                は執筆時点で有効ですが、定期的に確認することを推奨します。
              </div>
            </div>

            <p className="src-sep">🏛️ 診断基準（ICHD-3 / IHS）</p>
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
                <div className="src-t">ICHD-3 全文 PDF（2018年版）</div>
                <Ext
                  className="src-url"
                  href="https://ichd-3.org/wp-content/uploads/2018/01/The-International-Classification-of-Headache-Disorders-3rd-Edition-2018.pdf"
                >
                  ichd-3.org/…全文PDF
                </Ext>
              </div>
              <div className="src">
                <div className="src-org">IHS</div>
                <div className="src-t">IHS 分類委員会（ICHD-4 最新動向）</div>
                <Ext
                  className="src-url"
                  href="https://ihs-headache.org/en/about-ihs/standing-committees/classification/"
                >
                  ihs-headache.org/…classification
                </Ext>
              </div>
            </div>

            <p className="src-sep">📋 臨床ガイドライン（AAN / EHF / NICE）</p>
            <div className="src-grid">
              <div className="src">
                <div className="src-org">AAN</div>
                <div className="src-t">AAN Guidelines ホーム（全ガイドライン一覧）</div>
                <Ext className="src-url" href="https://www.aan.com/guidelines/">
                  https://www.aan.com/guidelines/
                </Ext>
              </div>
              <div className="src">
                <div className="src-org">AAN / AHS</div>
                <div className="src-t">片頭痛予防ガイドライン サマリー（PDF）</div>
                <Ext
                  className="src-url"
                  href="https://www.aan.com/guidelines/home/getguidelinecontent/545"
                >
                  aan.com/…guideline 545
                </Ext>
              </div>
              <div className="src">
                <div className="src-org">AAN</div>
                <div className="src-t">AAN 2024 予防療法ドラフト（公開レビュー版）</div>
                <Ext
                  className="src-url"
                  href="https://www.aan.com/siteassets/home-page/policy-and-guidelines/guidelines/guidelines-and-measures-open-for-public-comment/24-pharmacologic-treatment-for-migraine-prevention-in-adults_draft_08-14-2024.pdf"
                >
                  aan.com/…2024ドラフト PDF
                </Ext>
              </div>
              <div className="src">
                <div className="src-org">EHF</div>
                <div className="src-t">CGRP mAbs 予防療法ガイドライン 2022 (PMC 全文)</div>
                <Ext
                  className="src-url"
                  href="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC9188162/"
                >
                  https://www.ncbi.nlm.nih.gov/pmc/articles/PMC9188162/
                </Ext>
              </div>
              <div className="src">
                <div className="src-org">EHF</div>
                <div className="src-t">トリプタン治療コンセンサス 2022（Springer）</div>
                <Ext
                  className="src-url"
                  href="https://link.springer.com/article/10.1186/s10194-022-01502-z"
                >
                  link.springer.com/…01502-z
                </Ext>
              </div>
              <div className="src">
                <div className="src-org">NICE（英国）</div>
                <div className="src-t">頭痛ガイドライン CG150</div>
                <Ext className="src-url" href="https://www.nice.org.uk/guidance/cg150">
                  https://www.nice.org.uk/guidance/cg150
                </Ext>
              </div>
            </div>

            <p className="src-sep">🔬 Cochrane エビデンスレビュー</p>
            <div className="src-grid">
              <div className="src">
                <div className="src-org">Cochrane Library</div>
                <div className="src-t">頭痛レビュー検索ページ</div>
                <Ext
                  className="src-url"
                  href="https://www.cochranelibrary.com/search?query=headache+migraine&searchBy=3&type=cdsr"
                >
                  cochranelibrary.com/…headache+migraine
                </Ext>
              </div>
              <div className="src">
                <div className="src-org">Cochrane 2025</div>
                <div className="src-t">マグネシウム補充 片頭痛予防（最新）</div>
                <Ext
                  className="src-url"
                  href="https://www.cochranelibrary.com/cdsr/doi/10.1002/14651858.CD016307"
                >
                  …CD016307
                </Ext>
              </div>
              <div className="src">
                <div className="src-org">Cochrane</div>
                <div className="src-t">心理療法（CBT/バイオフィードバック）片頭痛予防</div>
                <Ext
                  className="src-url"
                  href="https://www.cochranelibrary.com/cdsr/doi/10.1002/14651858.CD012295.pub2/full"
                >
                  …CD012295.pub2
                </Ext>
              </div>
              <div className="src">
                <div className="src-org">Cochrane</div>
                <div className="src-t">ボツリヌストキシン 慢性片頭痛予防</div>
                <Ext
                  className="src-url"
                  href="https://www.cochranelibrary.com/cdsr/doi/10.1002/14651858.CD011914"
                >
                  …CD011914
                </Ext>
              </div>
            </div>

            <p className="src-sep">📰 急性期治療ガイドライン（IHS 2024）</p>
            <div className="src-grid">
              <div className="src">
                <div className="src-org">IHS 2024 / Cephalalgia</div>
                <div className="src-t">IHS 急性期治療推奨 2024（Cephalalgia 全文）</div>
                <Ext
                  className="src-url"
                  href="https://journals.sagepub.com/doi/10.1177/03331024241252666"
                >
                  journals.sagepub.com/…03331024241252666
                </Ext>
              </div>
            </div>

            <p className="src-sep">📚 専門誌・データベース</p>
            <div className="src-grid">
              <div className="src">
                <div className="src-org">EHF 公式誌（OA）</div>
                <div className="src-t">Journal of Headache and Pain</div>
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
                  href="https://pubmed.ncbi.nlm.nih.gov/?term=headache+migraine&filter=pubt.clinicaltrials"
                >
                  pubmed.ncbi.nlm.nih.gov/…clinicaltrials
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
        <strong>片頭痛（Migraine）完全ガイド</strong> — 国際エビデンス（ICHD-3 / AAN / EHF / IHS
        2024）に基づく
        <br />📅 作成年: 2025年 | 次回レビュー推奨: ICHD-4 正式発行時・AAN/IHS
        年次ガイドライン更新時
        <br />
        ⚠️
        本資料は学術・教育・研究目的のみを対象としています。臨床への適用は必ず資格を持つ医療専門家の監督のもとで行ってください。
      </div>
    </div>
  );
}
