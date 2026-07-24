import type { Metadata } from "next";
import { Ext } from "@/components/Ext";
import MermaidDiagram from "@/components/MermaidDiagram";
import { AerobicExerciseSidebar } from "@/components/therapies/AerobicExerciseSidebar";
import "./aerobic-exercise-headache-prevention.css";

export const metadata: Metadata = {
  title: "頭痛予防のための有酸素運動 ― エビデンスに基づくステップガイド",
  description:
    "ICHD-3・AHS・EHF/EAN・NICE・WHO・Cochrane Library など国際的な一次情報に基づく、無理のない運動導入の解説",
};

/** 有酸素運動と頭痛予防ページの Mermaid テーマ */
const EXERCISE_MERMAID_THEME: Record<string, string> = {
  primaryColor: "#e0f2f1",
  primaryTextColor: "#004d40",
  primaryBorderColor: "#00695c",
  lineColor: "#00897b",
  secondaryColor: "#e0f2f1",
  tertiaryColor: "#e8f5e9",
  edgeLabelBackground: "#ffffff",
  fontSize: "13px",
};

/**
 * Renders an educational guide on introducing aerobic exercise for headache prevention.
 *
 * @returns The complete headache prevention guide page
 */
export default function AerobicExerciseHeadachePreventionPage() {
  return (
    <div className="aerobic-exercise-accent">
      {/* HERO */}
      <div className="hero">
        <div style={{ fontSize: 34 }}>🏃</div>
        <h1>頭痛予防のための有酸素運動 ― エビデンスに基づくステップガイド</h1>
        <p className="hero-sub">
          ICHD-3・AHS・EHF/EAN・NICE・WHO・Cochrane Library
          など国際的な一次情報に基づく、無理のない運動導入の解説
        </p>
        <div className="hero-tags">
          <span className="hero-tag">有酸素運動</span>
          <span className="hero-tag">頭痛予防</span>
          <span className="hero-tag">エビデンスベース医療</span>
          <span className="hero-tag">初学者向け</span>
          <span className="hero-tag">国際ガイドライン準拠</span>
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
        <AerobicExerciseSidebar />

        {/* MAIN CONTENT */}
        <main className="main">
          <div className="alert a-warn">
            <div className="alert-i">📋</div>
            <div>
              <strong>本ページは教育目的であり、個別の治療推奨ではありません。</strong>
              頭痛の診断・運動の可否・薬物療法の要否は、必ず医師・薬剤師にご相談ください。本ページは特定の患者に対する運動処方や治療方針を示すものではなく、国際的な文献の要約による一般的な情報提供です。
            </div>
          </div>

          {/* ====================================================== SECTION 1 */}
          <section id="s1" className="sec">
            <div className="sec-hd">
              <div className="sec-num">1</div>
              <h2 className="sec-title">この記事の対象と読み方</h2>
            </div>

            <div className="card">
              <p>
                この記事は、「頭痛持ちだけれど運動と頭痛の関係を一から知りたい」という初学者の方向けに、
                <strong>
                  国際頭痛学会（IHS）・米国頭痛学会（AHS）・欧州頭痛連合（EHF）・世界保健機関（WHO）・Cochrane
                  Library
                </strong>{" "}
                などの一次情報・国際的ガイドラインをもとに、有酸素運動の頭痛予防における意義と、無理のない始め方をステップ形式で解説します。
              </p>
              <ul>
                <li>
                  各エビデンスには「エビデンスの質」バッジ（
                  <span className="bA">質が高い</span> <span className="bB">中程度</span>{" "}
                  <span className="bC">限定的</span> <span className="bU">参考情報</span>
                  ）を明記し、「効果がある／ない」という断定ではなく、<strong>相対的な表現</strong>
                  を用いています。
                </li>
                <li>
                  記事末尾（セクション10）に、本文中で参照した一次・二次情報のURL一覧を掲載しています。
                </li>
              </ul>
            </div>
          </section>

          {/* ====================================================== SECTION 2 */}
          <section id="s2" className="sec">
            <div className="sec-hd">
              <div className="sec-num">2</div>
              <h2 className="sec-title">Step 0：まず頭痛の種類を理解する</h2>
            </div>

            <div className="card">
              <p>
                有酸素運動と頭痛の関係を論じる前提として、頭痛の分類を押さえておく必要があります。頭痛の国際的な診断基準は、
                <strong>国際頭痛学会（IHS）が策定する国際頭痛分類 第3版（ICHD-3）</strong>
                が世界標準として用いられています。
              </p>

              <div className="tbl">
                <table>
                  <thead>
                    <tr>
                      <th>大分類（ICHD-3）</th>
                      <th>代表例</th>
                      <th>有酸素運動との関わり方</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>一次性頭痛：片頭痛（1.）</td>
                      <td>片頭痛（前兆あり／なし）</td>
                      <td>本稿で扱う「予防目的の有酸素運動」の主な対象</td>
                    </tr>
                    <tr>
                      <td>一次性頭痛：緊張型頭痛（2.）</td>
                      <td>緊張型頭痛</td>
                      <td>運動療法・姿勢改善の対象としても研究されている</td>
                    </tr>
                    <tr>
                      <td>一次性頭痛：三叉神経・自律神経性頭痛（3.）</td>
                      <td>群発頭痛など</td>
                      <td>本稿の主対象外（専門的治療が中心）</td>
                    </tr>
                    <tr>
                      <td>その他の一次性頭痛（4.）</td>
                      <td>
                        <strong>4.2 一次性運動時頭痛</strong> など
                      </td>
                      <td>運動そのものが誘因となる頭痛。セクション7で詳述</td>
                    </tr>
                    <tr>
                      <td>二次性頭痛</td>
                      <td>くも膜下出血、動脈解離など</td>
                      <td>除外が必須。セクション7の「危険信号」を参照</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="alert a-info">
                <div className="alert-i">ℹ️</div>
                <div>
                  ICHD-3は世界保健機関（WHO）の国際疾病分類（ICD）とも連携する形で整備されており、頭痛研究・診療における世界共通言語として扱われています。
                </div>
              </div>
            </div>
          </section>

          {/* ====================================================== SECTION 3 */}
          <section id="s3" className="sec">
            <div className="sec-hd">
              <div className="sec-num">3</div>
              <h2 className="sec-title">Step 1：有酸素運動が頭痛に関与しうるメカニズム</h2>
            </div>

            <div className="card">
              <p>
                「なぜ運動が頭痛に関係するのか」を理解すると、後述する「無理のない導入」の必要性も理解しやすくなります。研究でこれまでに議論されてきた主なメカニズムは以下の通りです（いずれも仮説・観察研究レベルの知見を含み、個人差が大きい点に留意してください）。
              </p>

              <div className="mmd">
                <div className="mmd-lbl">
                  フローチャート ― 有酸素運動が頭痛に関与しうる経路（仮説）
                </div>
                <MermaidDiagram
                  themeVariables={EXERCISE_MERMAID_THEME}
                  chart={`flowchart TB
    Ex["有酸素運動を継続的に実施する"]
    Ex --> Op["内因性オピオイド ベータエンドルフィン等の分泌変化"]
    Ex --> Bd["BDNF 脳由来神経栄養因子の一過性変化"]
    Ex --> Ec["内因性カンナビノイド系の活性化"]
    Ex --> Hpa["HPA系や自律神経系の調整"]
    Ex --> Cv["心肺機能や血管調節機能の向上"]
    Op --> Pain["痛みの調整に関わる神経系機能の変化"]
    Bd --> Pain
    Ec --> Pain
    Hpa --> Pain
    Cv --> Pain
    Pain --> Result["頭痛の頻度や強度への影響の可能性"]`}
                />
              </div>

              <h3>主なメカニズム仮説の概要</h3>
              <div className="tbl">
                <table>
                  <thead>
                    <tr>
                      <th>メカニズム</th>
                      <th>内容の概要</th>
                      <th>留意点</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>内因性オピオイド（ベータエンドルフィン）</td>
                      <td>
                        一定の運動強度・時間を超えると分泌が増え、鎮痛系に関与する可能性が指摘されている
                      </td>
                      <td>
                        片頭痛患者ではベースラインの値が低いとする報告があり、運動による変化には個人差がある
                      </td>
                    </tr>
                    <tr>
                      <td>BDNF（脳由来神経栄養因子）</td>
                      <td>
                        神経可塑性に関与する物質で、片頭痛発作時に血中濃度が変動するとの報告がある
                      </td>
                      <td>運動と頭痛頻度との直接的な因果関係はまだ確立していない</td>
                    </tr>
                    <tr>
                      <td>内因性カンナビノイド系</td>
                      <td>運動による報酬系・情動的な痛み調整への関与が想定されている</td>
                      <td>片頭痛患者ではこの系の機能低下が指摘されており、研究途上</td>
                    </tr>
                    <tr>
                      <td>HPA系・自律神経系</td>
                      <td>
                        ストレス応答系の調整を通じて、頭痛の誘因となるストレス負荷を緩和する可能性
                      </td>
                      <td>直接的な頭痛頻度への効果は間接的な経路と考えられる</td>
                    </tr>
                    <tr>
                      <td>心肺機能・血管調節</td>
                      <td>
                        有酸素運動による心血管系のコンディショニング自体が、片頭痛の病態生理と関連するとの仮説がある
                      </td>
                      <td>生活習慣改善全般の効果と重なる部分がある</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="alert a-purple">
                <div className="alert-i">📚</div>
                <div>
                  出典：「The association between migraine and physical
                  exercise」（PMC6134860）ほか。詳細はセクション10の参考文献を参照してください。これらのメカニズムはいずれも観察研究・基礎研究レベルの知見であり、臨床的な効果を保証するものではありません。
                </div>
              </div>
            </div>
          </section>

          {/* ====================================================== SECTION 4 */}
          <section id="s4" className="sec">
            <div className="sec-hd">
              <div className="sec-num">4</div>
              <h2 className="sec-title">Step 2：予防的意義に関するエビデンスを俯瞰する</h2>
            </div>

            <div className="card">
              <p>
                「有酸素運動は頭痛予防に効果がある」と一言で言っても、エビデンスの質にはばらつきがあります。ここでは代表的な研究を、エビデンスの階層とあわせて整理します。
              </p>

              <h3>エビデンスの質の目安（本稿での表記ルール）</h3>
              <div className="tbl">
                <table>
                  <thead>
                    <tr>
                      <th>バッジ</th>
                      <th>意味</th>
                      <th>本稿での対応する研究デザイン</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <span className="bA">質が高い</span>
                      </td>
                      <td>
                        複数のランダム化比較試験（RCT）を統合したシステマティックレビュー・メタ解析
                      </td>
                      <td>Cochrane Library、Journal of Headache and Pain 掲載のメタ解析等</td>
                    </tr>
                    <tr>
                      <td>
                        <span className="bB">中程度</span>
                      </td>
                      <td>単一の質の高いRCT</td>
                      <td>Varkey et al. 2011（Cephalalgia）等</td>
                    </tr>
                    <tr>
                      <td>
                        <span className="bC">限定的</span>
                      </td>
                      <td>小規模RCT・パイロット試験、観察研究</td>
                      <td>Dittrich et al. 2008、Darabaneanu et al. 2011 等</td>
                    </tr>
                    <tr>
                      <td>
                        <span className="bU">参考情報</span>
                      </td>
                      <td>大規模コホートの疫学的関連（因果関係の証明ではない）</td>
                      <td>HUNTスタディなど</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <h3>代表的な研究とその結果概要</h3>
              <div className="tbl">
                <table>
                  <thead>
                    <tr>
                      <th>研究／出典</th>
                      <th>デザイン</th>
                      <th>対象</th>
                      <th>主な知見（相対表現）</th>
                      <th>質</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Lemmens et al. 2019, J Headache Pain</td>
                      <td>6研究を統合したシステマティックレビュー・メタ解析</td>
                      <td>片頭痛患者</td>
                      <td>
                        有酸素運動により片頭痛日数が統計的に有意に減少したとの報告あり（月あたり平均0.6日程度の減少）。ただし研究間のばらつきが大きく、頭痛の強さ・持続時間については統合できなかった
                      </td>
                      <td>
                        <span className="bA">質が高い</span>
                      </td>
                    </tr>
                    <tr>
                      <td>ネットワークメタ解析 2022, J Headache Pain（PMC9563744）</td>
                      <td>複数のRCTを間接比較</td>
                      <td>片頭痛患者</td>
                      <td>
                        有酸素運動・筋力トレーニングいずれもプラセボ群より片頭痛頻度の減少に有効性が示されているが、研究間で相対順位には限界がある
                      </td>
                      <td>
                        <span className="bA">質が高い</span>
                      </td>
                    </tr>
                    <tr>
                      <td>Varkey et al. 2011, Cephalalgia（RCT）</td>
                      <td>
                        91名を運動・リラクゼーション・薬物療法（一般名：抗てんかん薬群）の3群に無作為割付
                      </td>
                      <td>月2〜8日の片頭痛がある成人</td>
                      <td>
                        有酸素運動群でも他の対照群と同程度に頭痛頻度の改善が認められたと報告されている
                      </td>
                      <td>
                        <span className="bB">中程度</span>
                      </td>
                    </tr>
                    <tr>
                      <td>Dittrich et al. 2008（RCT、小規模）</td>
                      <td>6週間・週2回・1時間の有酸素運動</td>
                      <td>片頭痛のある女性30名</td>
                      <td>
                        運動群で頭痛の強さ・頻度の改善が報告されているが、サンプルサイズが小さい
                      </td>
                      <td>
                        <span className="bC">限定的</span>
                      </td>
                    </tr>
                    <tr>
                      <td>Geneen et al. 2017, Cochrane Database of Systematic Reviews</td>
                      <td>21件のCochraneレビューの統合</td>
                      <td>慢性疼痛患者全般（頭痛限定ではない）</td>
                      <td>
                        運動療法は慢性疼痛に対して有効性が示唆されるが、個々の研究規模が小さく、エビデンスの質は総じて低いと評価されている
                      </td>
                      <td>
                        <span className="bC">限定的</span>
                      </td>
                    </tr>
                    <tr>
                      <td>Varkey et al.（HUNTスタディ、疫学研究）</td>
                      <td>大規模コホートの前向き・横断調査（約2万〜4万人規模）</td>
                      <td>一般成人</td>
                      <td>
                        身体活動量が高い群で非片頭痛性頭痛の報告割合が低かったとする関連が観察された
                      </td>
                      <td>
                        <span className="bU">参考情報</span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="alert a-warn">
                <div className="alert-i">⚠️</div>
                <div>
                  <strong>重要な留意点：</strong>
                  上記はいずれも研究間で運動の種類・強度・期間が異なり、直接比較には限界があります。「有酸素運動が頭痛の頻度や強さを一定程度減らす方向のエビデンスが積み重なりつつある」という
                  <strong>相対的な評価</strong>
                  にとどめ、「必ず効果がある」という断定は避けるべきです。効果には個人差があり、運動が誘因となる患者も一定数存在します（セクション7参照）。
                </div>
              </div>
            </div>
          </section>

          {/* ====================================================== SECTION 5 */}
          <section id="s5" className="sec">
            <div className="sec-hd">
              <div className="sec-num">5</div>
              <h2 className="sec-title">Step 3：国際的な学術団体・ガイドラインの位置づけ</h2>
            </div>

            <div className="card">
              <p>
                複数の主要な国際学術団体が、片頭痛など頭痛の管理における生活習慣・行動療法の一環として運動を位置づけています。
              </p>

              <div className="tbl">
                <table>
                  <thead>
                    <tr>
                      <th>発行団体</th>
                      <th>文書</th>
                      <th>運動に関する位置づけ（要約）</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>米国頭痛学会（AHS）</td>
                      <td>
                        Consensus Statement: Update on integrating new migraine treatments into
                        clinical practice（2021）
                      </td>
                      <td>
                        頭痛予防治療計画において、トリガー要因の管理・適切な栄養・
                        <strong>定期的な運動</strong>
                        ・十分な水分摂取・睡眠・ストレス管理といった教育と生活習慣改善が重要であるとしている（個別化が前提）
                      </td>
                    </tr>
                    <tr>
                      <td>米国頭痛学会（AHS）</td>
                      <td>
                        Position Statement on Integrating New Migraine Treatments into Clinical
                        Practice（2019）
                      </td>
                      <td>
                        生活習慣の修正（トリガー管理・栄養・運動・水分摂取）は、他の治療と並行して個別化して実施すべきとしている
                      </td>
                    </tr>
                    <tr>
                      <td>欧州頭痛連合（EHF）・欧州神経学会（EAN）</td>
                      <td>
                        Diagnosis and management of migraine in ten steps（Nature Reviews Neurology,
                        2021）
                      </td>
                      <td>
                        片頭痛の診断・管理の標準的な10ステップの中で、生活習慣要因への配慮を診療プロセスに組み込むことを推奨
                      </td>
                    </tr>
                    <tr>
                      <td>英国 NICE</td>
                      <td>Headaches in over 12s: diagnosis and management（CG150）</td>
                      <td>
                        頭痛全般の診断・管理に関する英国の公的ガイドライン。薬物療法を中心に、患者との対話を通じた個別の管理方針の重要性を強調
                      </td>
                    </tr>
                    <tr>
                      <td>世界保健機関（WHO）</td>
                      <td>WHO guidelines on physical activity and sedentary behaviour（2020）</td>
                      <td>
                        頭痛に特化した推奨ではないが、成人一般に対し
                        <strong>
                          中強度有酸素活動を週150〜300分、または高強度有酸素活動を週75〜150分
                        </strong>
                        （もしくはその組み合わせ）行うことを推奨。これが「無理のない導入」の到達目標の目安となる
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="alert a-info">
                <div className="alert-i">ℹ️</div>
                <div>
                  国際的な学術団体は「運動を含む生活習慣改善」を頭痛管理の一部として位置づけていますが、これは
                  <strong>
                    薬物療法の代替を意味するものではなく、個別化された補完的アプローチ
                  </strong>
                  として説明されている点に注意してください。
                </div>
              </div>
            </div>
          </section>

          {/* ====================================================== SECTION 6 */}
          <section id="s6" className="sec">
            <div className="sec-hd">
              <div className="sec-num">6</div>
              <h2 className="sec-title">Step 4：無理のない導入 ― 段階的プロトコル</h2>
            </div>

            <div className="card">
              <p>
                ここが本稿の中心です。研究で用いられてきた運動介入（例：Varkey et al. 2011
                の12週間・週3回・自覚的運動強度Borgスケール11〜14の範囲での有酸素運動、Dittrich et
                al. 2008 の週2回・1時間・6週間プログラムなど）に共通するのは、
                <strong>
                  急激な高強度運動ではなく、低強度から段階的に強度・時間を増やしていく設計
                </strong>
                であるという点です。
              </p>
              <p>
                また、片頭痛患者の一定割合（研究によっては約2割程度）が運動そのものを頭痛の誘因として経験するとの報告もあり、この点からも「無理のない導入」が重要になります。
              </p>

              <div className="mmd">
                <div className="mmd-lbl">フローチャート ― 無理のない運動導入プロトコル</div>
                <MermaidDiagram
                  themeVariables={EXERCISE_MERMAID_THEME}
                  chart={`flowchart TB
    A["運動開始を検討する"]
    A --> B{"危険信号に該当するか"}
    B -->|該当する 人生最悪の急な頭痛 神経症状を伴う頭痛 発熱を伴う頭痛 頭部外傷後の頭痛 50歳以降で新規に出現した頭痛など| C["運動を開始せず 医療機関を受診する 二次性頭痛の除外が必要"]
    B -->|該当しない 既に一次性頭痛と診断され安定している| D["かかりつけ医または頭痛専門医に運動開始の可否を相談する"]
    D --> E["頭痛日誌の記録を開始する 頻度 強さ 持続時間 誘因を記録"]
    E --> F["低強度から開始する 自覚的運動強度 目安11から13 会話が可能な速さのウォーキングなど"]
    F --> G["週2から3回 1回20分程度から開始する"]
    G --> H{"2から4週間継続して状態を確認する"}
    H -->|悪化なく経過が良好| I["時間と頻度を少しずつ増やす 最終目標の目安は中強度で週150分程度"]
    H -->|頭痛の増悪や新しい症状が出た| J["運動を中止し医師に相談する"]
    I --> K["数か月を目安に頭痛日誌で効果を振り返る"]
    K --> L["医師と相談しながら強度や頻度を継続的に調整する"]`}
                />
              </div>

              <h3>各ステップの補足</h3>
              <div className="tbl">
                <table>
                  <thead>
                    <tr>
                      <th>ステップ</th>
                      <th>目的</th>
                      <th>補足事項</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>①危険信号の確認</td>
                      <td>二次性頭痛の除外</td>
                      <td>
                        突然の激しい頭痛（雷鳴頭痛）、神経症状を伴う頭痛、発熱を伴う頭痛、外傷後の頭痛、妊娠中に新たに生じた運動関連の頭痛、50歳以降で初めて生じた頭痛などは、運動開始前に必ず医療機関の評価が必要（ICHD-3「4.2
                        一次性運動時頭痛」の診断基準でも、初発時には出血性疾患・動脈解離・可逆性脳血管攣縮症候群などの除外が必須とされている）
                      </td>
                    </tr>
                    <tr>
                      <td>②医師への相談</td>
                      <td>個別化された可否判断</td>
                      <td>
                        心血管疾患などの併存疾患の有無によっても適切な強度は異なるため、必ず個別に相談する
                      </td>
                    </tr>
                    <tr>
                      <td>③頭痛日誌の記録</td>
                      <td>効果と悪化の両方を客観的に把握</td>
                      <td>
                        主観的な印象だけでなく記録に基づいて判断することが、AHSなど複数のガイドラインでも推奨されている
                      </td>
                    </tr>
                    <tr>
                      <td>④低強度からの開始</td>
                      <td>運動そのものが誘因となるリスクを抑える</td>
                      <td>
                        自覚的運動強度（ボルグスケール）で「ややきつい」未満を目安に、会話ができる強度から始める
                      </td>
                    </tr>
                    <tr>
                      <td>⑤頻度・時間の設定</td>
                      <td>継続可能性を重視</td>
                      <td>週2〜3回、1回20分程度からのスタートは、複数の研究プロトコルとも整合的</td>
                    </tr>
                    <tr>
                      <td>⑥数週間ごとの再評価</td>
                      <td>悪化サインの早期発見</td>
                      <td>悪化があれば無理に継続せず、いったん中止して医師に相談する</td>
                    </tr>
                    <tr>
                      <td>⑦漸増</td>
                      <td>WHOの一般的な身体活動推奨量への到達を目安に</td>
                      <td>
                        中強度で週150〜300分、または高強度で週75〜150分を最終的な目安とする（頭痛のための特別な数値ではなく、WHOの一般的な成人向け推奨に基づく目安）
                      </td>
                    </tr>
                    <tr>
                      <td>⑧継続的な医師との連携</td>
                      <td>個別最適化</td>
                      <td>
                        効果・悪化のいずれについても、自己判断のみで継続・中断を決めず、医療者と情報を共有する
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <h3>実施環境に関する補足（一次性運動時頭痛への配慮）</h3>
              <p>
                ICHD-3では、一次性運動時頭痛（4.2）が
                <strong>高温環境や高地で生じやすい</strong>
                とされています。無理のない導入の一環として、以下のような環境要因への配慮も参考になります。
              </p>
              <div className="tbl">
                <table>
                  <thead>
                    <tr>
                      <th>配慮事項</th>
                      <th>内容</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>気温・湿度</td>
                      <td>高温多湿の環境での急激な負荷は避け、こまめな水分補給を意識する</td>
                    </tr>
                    <tr>
                      <td>高地・気圧変化</td>
                      <td>
                        高地でのトレーニングは通常時と異なる反応が出ることがあるため、初めての環境では強度を控えめにする
                      </td>
                    </tr>
                    <tr>
                      <td>ウォームアップ</td>
                      <td>急激に強度を上げず、緩徐に強度を高めていく</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          {/* ====================================================== SECTION 7 */}
          <section id="s7" className="sec">
            <div className="sec-hd">
              <div className="sec-num">7</div>
              <h2 className="sec-title">Step 5：注意すべき危険信号（レッドフラッグ）</h2>
            </div>

            <div className="card">
              <div className="alert a-danger">
                <div className="alert-i">🚨</div>
                <div>
                  有酸素運動が頭痛の予防に役立つ可能性がある一方で、
                  <strong>運動自体が頭痛の誘因になりうる病態</strong>
                  も存在します。ICHD-3では「4.2
                  一次性運動時頭痛」として分類されていますが、初めてこのタイプの頭痛を経験した場合は、まず二次性頭痛の除外が必須とされています。
                </div>
              </div>

              <div className="tbl th-red">
                <table>
                  <thead>
                    <tr>
                      <th>危険信号</th>
                      <th>除外すべき代表的な病態</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>突然の激しい頭痛（雷鳴頭痛様）</td>
                      <td>くも膜下出血、脳動脈解離、可逆性脳血管攣縮症候群など</td>
                    </tr>
                    <tr>
                      <td>神経症状（麻痺・言語障害・意識障害等）を伴う頭痛</td>
                      <td>脳血管障害など</td>
                    </tr>
                    <tr>
                      <td>発熱・項部硬直を伴う頭痛</td>
                      <td>髄膜炎など</td>
                    </tr>
                    <tr>
                      <td>頭部外傷後の頭痛</td>
                      <td>頭蓋内出血など</td>
                    </tr>
                    <tr>
                      <td>妊娠中に新たに生じた運動関連の頭痛</td>
                      <td>二次性頭痛のリスクが高いとされ、詳細な評価が推奨される</td>
                    </tr>
                    <tr>
                      <td>50歳以降で初めて生じた頭痛</td>
                      <td>一次性頭痛以外の原因の可能性が高まる年代とされる</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="alert a-danger">
                <div className="alert-i">🚨</div>
                <div>
                  これらに該当する場合、本稿で述べた段階的な運動導入を行う前に、
                  <strong>必ず医療機関を受診してください。</strong>
                </div>
              </div>
            </div>
          </section>

          {/* ====================================================== SECTION 8 */}
          <section id="s8" className="sec">
            <div className="sec-hd">
              <div className="sec-num">8</div>
              <h2 className="sec-title">
                Step 6：薬物療法との関係（一般的な位置づけの説明にとどめます）
              </h2>
            </div>

            <div className="card">
              <p>
                有酸素運動は、片頭痛など頭痛の管理における
                <strong>生活習慣改善・行動療法の一つ</strong>
                として、AHSなどのガイドラインで薬物療法と並んで言及されています。ただし、本稿では以下の理由から、個別の薬剤情報には立ち入りません。
              </p>
              <ul>
                <li>
                  頭痛の予防治療として一般に用いられる薬効群には、抗てんかん薬、降圧薬（β遮断薬など）、抗うつ薬、CGRP関連薬などが研究上比較対象として用いられることがありますが、
                  <strong>
                    どの薬効群が適切かは個々の患者の病歴・併存疾患・使用中の薬剤によって大きく異なります
                  </strong>
                  。
                </li>
                <li>
                  薬剤の承認状況（適応の有無、国内外での承認状況）は国や時期によって異なり、本稿作成時点の一般的な言及にとどめます。
                  <strong>具体的な処方・用法用量は必ず医師・薬剤師にご相談ください。</strong>
                </li>
                <li>特定の商品名の推奨や、薬剤間・製品間の優劣を比較する記載は行いません。</li>
              </ul>

              <div className="alert a-warn">
                <div className="alert-i">💊</div>
                <div>
                  本ページで言及した薬効群はあくまで一般名（成分群）レベルの説明です。個別の用法・用量、適応の可否、国内承認状況の詳細については、必ず医師・薬剤師にご相談ください。
                </div>
              </div>
            </div>
          </section>

          {/* ====================================================== SECTION 9 */}
          <section id="s9" className="sec">
            <div className="sec-hd">
              <div className="sec-num">9</div>
              <h2 className="sec-title">まとめ：ステップバイステップ・チェックリスト</h2>
            </div>

            <div className="card">
              <div className="tbl th-teal">
                <table>
                  <thead>
                    <tr>
                      <th>ステップ</th>
                      <th>やること</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Step 0</td>
                      <td>自分の頭痛が一次性か二次性か、専門的な診断を受けているか確認する</td>
                    </tr>
                    <tr>
                      <td>Step 1</td>
                      <td>
                        運動が頭痛に関わりうるメカニズムを大まかに理解する（過度な期待も過度な不安も持たない）
                      </td>
                    </tr>
                    <tr>
                      <td>Step 2</td>
                      <td>
                        「効果がある」という情報を見たら、その根拠となる研究のエビデンスの質を確認する習慣を持つ
                      </td>
                    </tr>
                    <tr>
                      <td>Step 3</td>
                      <td>
                        AHS・EHF/EAN・WHOなど国際的な団体が生活習慣改善（運動を含む）をどう位置づけているかを踏まえる
                      </td>
                    </tr>
                    <tr>
                      <td>Step 4</td>
                      <td>
                        危険信号がないことを確認したうえで、医師に相談しつつ低強度・低頻度から段階的に導入する
                      </td>
                    </tr>
                    <tr>
                      <td>Step 5</td>
                      <td>新しい症状や頭痛の悪化があれば自己判断で継続せず、速やかに医療機関へ</td>
                    </tr>
                    <tr>
                      <td>Step 6</td>
                      <td>薬物療法との組み合わせが必要な場合は、必ず医師・薬剤師と相談する</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          {/* ====================================================== SECTION 10 */}
          <section id="s10" className="sec">
            <div className="sec-hd">
              <div className="sec-num">10</div>
              <h2 className="sec-title">監視すべき権威ソース（本稿の情報源一覧）</h2>
            </div>

            <div className="card">
              <p>
                信頼度の高い順に整理しています。
                <strong>一次情報（ガイドライン・原著論文）を優先</strong>
                し、二次情報（要約サイト・患者向け解説ページ）は補助的な位置づけとしています。
              </p>

              <div className="tbl">
                <table>
                  <thead>
                    <tr>
                      <th>区分</th>
                      <th>ソース</th>
                      <th>用途</th>
                      <th>URL</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>疾患分類（一次情報）</td>
                      <td>ICHD-3（国際頭痛分類 第3版、国際頭痛学会）</td>
                      <td>頭痛全体の分類、一次性運動時頭痛の診断基準</td>
                      <td>
                        <Ext href="https://ichd-3.org/">ichd-3.org</Ext>
                      </td>
                    </tr>
                    <tr>
                      <td>疾患分類（一次情報）</td>
                      <td>ICHD-3「4.2 一次性運動時頭痛」該当ページ</td>
                      <td>運動時頭痛の診断基準・除外すべき病態</td>
                      <td>
                        <Ext href="https://ichd-3.org/other-primary-headache-disorders/4-2-primary-exercise-headache/">
                          ichd-3.org/4-2
                        </Ext>
                      </td>
                    </tr>
                    <tr>
                      <td>疾患分類（一次情報）</td>
                      <td>国際頭痛学会（IHS）公式サイト</td>
                      <td>ICHD関連情報の全体像</td>
                      <td>
                        <Ext href="https://ihs-headache.org/en/resources/ichd/">
                          ihs-headache.org
                        </Ext>
                      </td>
                    </tr>
                    <tr>
                      <td>国際ガイドライン</td>
                      <td>
                        米国頭痛学会（AHS）Consensus Statement 2021（Ailani et al., Headache）
                      </td>
                      <td>生活習慣改善（運動含む）の位置づけ</td>
                      <td>
                        <Ext href="https://headachejournal.onlinelibrary.wiley.com/doi/10.1111/head.14153">
                          headachejournal.onlinelibrary.wiley.com
                        </Ext>
                      </td>
                    </tr>
                    <tr>
                      <td>国際ガイドライン</td>
                      <td>米国頭痛学会（AHS）Position Statement 2019</td>
                      <td>生活習慣改善・神経調整療法の位置づけ</td>
                      <td>
                        <Ext href="https://headachejournal.onlinelibrary.wiley.com/doi/10.1111/head.13456">
                          headachejournal.onlinelibrary.wiley.com
                        </Ext>
                      </td>
                    </tr>
                    <tr>
                      <td>国際ガイドライン（患者向け解説・二次情報）</td>
                      <td>AHS「Lifestyle Modification for Migraine」</td>
                      <td>生活習慣改善に関する患者向け解説</td>
                      <td>
                        <Ext href="https://americanheadachesociety.org/resources/primary-care/lifestyle-modification-for-migraine">
                          americanheadachesociety.org
                        </Ext>
                      </td>
                    </tr>
                    <tr>
                      <td>国際ガイドライン</td>
                      <td>
                        欧州頭痛連合（EHF）・欧州神経学会（EAN）共同コンセンサス（Nature Reviews
                        Neurology, 2021）
                      </td>
                      <td>片頭痛診断・管理の10ステップ</td>
                      <td>
                        <Ext href="https://www.nature.com/articles/s41582-021-00509-5">
                          nature.com
                        </Ext>
                      </td>
                    </tr>
                    <tr>
                      <td>国際ガイドライン</td>
                      <td>英国 NICE「Headaches in over 12s: diagnosis and management」（CG150）</td>
                      <td>頭痛全般の診断・管理に関する公的ガイドライン</td>
                      <td>
                        <Ext href="https://www.nice.org.uk/guidance/cg150">
                          nice.org.uk/guidance/cg150
                        </Ext>
                      </td>
                    </tr>
                    <tr>
                      <td>身体活動推奨（一次情報）</td>
                      <td>WHO guidelines on physical activity and sedentary behaviour（2020）</td>
                      <td>成人向け有酸素運動の推奨量の目安</td>
                      <td>
                        <Ext href="https://www.ncbi.nlm.nih.gov/books/NBK566046/">
                          ncbi.nlm.nih.gov/books/NBK566046
                        </Ext>
                      </td>
                    </tr>
                    <tr>
                      <td>システマティックレビュー</td>
                      <td>Lemmens et al. 2019, Journal of Headache and Pain</td>
                      <td>有酸素運動と片頭痛日数に関するメタ解析</td>
                      <td>
                        <Ext href="https://link.springer.com/article/10.1186/s10194-019-0961-8">
                          link.springer.com
                        </Ext>
                      </td>
                    </tr>
                    <tr>
                      <td>システマティックレビュー</td>
                      <td>ネットワークメタ解析 2022, Journal of Headache and Pain</td>
                      <td>有酸素運動と筋力トレーニングの比較</td>
                      <td>
                        <Ext href="https://pmc.ncbi.nlm.nih.gov/articles/PMC9563744/">
                          pmc.ncbi.nlm.nih.gov
                        </Ext>
                      </td>
                    </tr>
                    <tr>
                      <td>Cochraneレビュー</td>
                      <td>Geneen et al. 2017, Cochrane Database of Systematic Reviews</td>
                      <td>慢性疼痛全般に対する運動療法の統合評価</td>
                      <td>
                        <Ext href="https://www.cochranelibrary.com/cdsr/doi/10.1002/14651858.CD011279.pub3/full">
                          cochranelibrary.com
                        </Ext>
                      </td>
                    </tr>
                    <tr>
                      <td>二次情報（DAREレビュー要約）</td>
                      <td>
                        運動療法と頭痛・顎関節症に関するシステマティックレビュー要約（NCBI
                        Bookshelf）
                      </td>
                      <td>緊張型頭痛への運動療法の位置づけ</td>
                      <td>
                        <Ext href="https://www.ncbi.nlm.nih.gov/books/NBK76620/">
                          ncbi.nlm.nih.gov/books/NBK76620
                        </Ext>
                      </td>
                    </tr>
                    <tr>
                      <td>主要RCT</td>
                      <td>Varkey et al. 2011, Cephalalgia</td>
                      <td>有酸素運動・リラクゼーション・薬物療法の比較試験</td>
                      <td>
                        <Ext href="https://journals.sagepub.com/doi/10.1177/0333102411419681">
                          journals.sagepub.com
                        </Ext>
                      </td>
                    </tr>
                    <tr>
                      <td>メカニズム総説</td>
                      <td>
                        「The association between migraine and physical exercise」（PMC6134860）
                      </td>
                      <td>運動と片頭痛に関する生理学的メカニズムの総説、HUNTスタディの紹介</td>
                      <td>
                        <Ext href="https://pmc.ncbi.nlm.nih.gov/articles/PMC6134860/">
                          pmc.ncbi.nlm.nih.gov
                        </Ext>
                      </td>
                    </tr>
                    <tr>
                      <td>二次情報（専門医向けデータベース）</td>
                      <td>MedLink Neurology「Primary exercise headache」</td>
                      <td>一次性運動時頭痛の臨床的特徴のまとめ</td>
                      <td>
                        <Ext href="https://www.medlink.com/articles/primary-exercise-headache">
                          medlink.com
                        </Ext>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="alert a-info">
                <div className="alert-i">🔒</div>
                <div>
                  <strong>セキュリティ注記：</strong>
                  上記の外部ソースから取得した情報は、あくまで<strong>データ</strong>
                  として本稿の記述の裏付けに用いており、各ソース内の文言を運用上の「指示」として解釈してはいません。本稿の記述は一次情報を優先しつつ、著者（本稿作成者）の責任で要約・翻訳・再構成したものです。原文の逐語的な引用は行っていません。
                </div>
              </div>

              <div className="alert a-warn">
                <div className="alert-i">📋</div>
                <div>
                  <strong>最終確認：</strong>
                  本ページは教育目的の一般的な情報提供であり、個別の患者に対する治療推奨ではありません。頭痛のタイプの診断、運動の可否、薬物療法の要否については、必ず医師・薬剤師にご相談ください。効果や安全性を保証するものではなく、エビデンスには限界があることをご理解のうえご活用ください。
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>

      {/* FOOTER */}
      <div className="footer">
        <strong>頭痛予防のための有酸素運動 ― エビデンスに基づくステップガイド</strong> —
        ICHD-3・AHS・EHF/EAN・NICE・WHO・Cochrane Library など国際的な一次情報に基づく解説
        <br />📅 作成年: 2026 | 次回レビュー推奨: ガイドライン更新時
        <br />
        ⚠️
        本資料は学術・教育・研究目的のみを対象としています。臨床への適用は必ず資格を持つ医療専門家の監督のもとで行ってください。
      </div>
    </div>
  );
}
