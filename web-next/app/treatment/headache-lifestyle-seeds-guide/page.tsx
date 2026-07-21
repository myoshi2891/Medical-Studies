import type { Metadata } from "next";
import { Ext } from "@/components/Ext";
import MermaidDiagram from "@/components/MermaidDiagram";
import { LifestyleSeedsSidebar } from "@/components/treatment/LifestyleSeedsSidebar";
import "./headache-lifestyle-seeds-guide.css";

export const metadata: Metadata = {
  title: "頭痛療養の基本 ― 生活習慣管理とSEEDSフレームワーク",
  description:
    "睡眠・水分・カフェイン・食事リズムの科学的根拠と実践ガイド。米国の頭痛専門医が提唱する生活習慣管理の5本柱（SEEDS）に基づいた、頭痛患者のためのセルフケア解説。",
};

const SEEDS_MERMAID_THEME: Record<string, string> = {
  primaryColor: "#fff3e0",
  primaryTextColor: "#e65100",
  primaryBorderColor: "#e65100",
  lineColor: "#00796b",
  secondaryColor: "#e0f2f1",
  tertiaryColor: "#e8f5e9",
  edgeLabelBackground: "#ffffff",
  fontSize: "13px",
};

/**
 * Renders an educational guide to headache self-care using the SEEDS lifestyle-management framework.
 */
export default function HeadacheLifestyleSeedsGuidePage() {
  return (
    <div className="lifestyle-seeds-accent">
      {/* HERO */}
      <div className="hero">
        <div style={{ fontSize: 40 }}>🌅</div>
        <h1>頭痛療養の基本：生活習慣管理とSEEDSフレームワーク</h1>
        <p className="hero-sub">睡眠・水分・カフェイン・食事リズムの科学的根拠と実践ガイド</p>
        <div className="hero-tags">
          <span className="hero-tag">SEEDSフレームワーク</span>
          <span className="hero-tag">ICHD-3準拠</span>
          <span className="hero-tag">睡眠衛生</span>
          <span className="hero-tag">水分補給</span>
          <span className="hero-tag">カフェイン管理</span>
          <span className="hero-tag">食事リズム</span>
          <span className="hero-tag">エビデンスベース</span>
        </div>
      </div>

      {/* DISCLAIMER */}
      <div className="disclaimer">
        <strong>⚠️ Academic Disclaimer（学術免責事項）</strong>　本資料は
        <strong>学術・教育・研究目的のみ</strong>
        を対象としています。すべての内容は資格を持つ医療専門家による臨床適用前のレビューが必要です。個人的な医療アドバイス・診断・処方を提供するものではありません。本ページは
        <strong>教育目的であり、個別の治療推奨ではありません</strong>。
      </div>

      {/* LAYOUT */}
      <div className="layout">
        <LifestyleSeedsSidebar />

        {/* MAIN CONTENT */}
        <main className="main">
          {/* ====================================================== SECTION 1 */}
          <section id="s1" className="sec">
            <div className="sec-hd">
              <div className="sec-num">1</div>
              <h2 className="sec-title">なぜ生活習慣が重要なのか</h2>
            </div>

            <p>
              頭痛（特に片頭痛）の管理は、薬物療法だけでなく<strong>生活習慣の調整</strong>
              が重要な柱の一つとされています。片頭痛をはじめとする一次性頭痛は、遺伝的な素因を背景に、睡眠・食事・ストレスなどの環境因子が引き金（トリガー）となって発作が誘発されると考えられています。
            </p>

            <p>
              米国の頭痛専門医による総説では、生活習慣の是正を治療の出発点として位置づけ、睡眠・食事・運動といった基本的な生活行動を整えることの重要性が強調されています。同総説では、片頭痛は世界的に見ても障害を伴う疾患負担の大きい神経疾患の一つに位置づけられています。
            </p>

            <div className="alert a-warn">
              <div className="alert-i">⚠️</div>
              <div>
                <strong>重要な注意点：</strong>
                生活習慣の調整は薬物療法の代わりになるものではなく、あくまで補助的なアプローチです。効果には個人差があり、「必ず頭痛が治る」ことを保証するものではありません。生活改善を行っても症状が続く、あるいは悪化する場合は医師に相談してください。
              </div>
            </div>

            <h3>エビデンスグレードの見方（本ページ共通）</h3>
            <p>本ページでは、各生活指導項目のエビデンスの強さを以下の4段階で表記します。</p>

            <div className="tbl">
              <table>
                <thead>
                  <tr>
                    <th>グレード</th>
                    <th>意味</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <span className="bA">bA</span>
                    </td>
                    <td>
                      複数の質の高いランダム化比較試験（RCT）やシステマティックレビューで一貫して支持されている
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <span className="bB">bB</span>
                    </td>
                    <td>
                      一定数の臨床研究で支持されているが、RCTが限定的、または結果の一貫性に課題がある
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <span className="bC">bC</span>
                    </td>
                    <td>主に観察研究・相関研究、または小規模・パイロット試験にとどまる</td>
                  </tr>
                  <tr>
                    <td>
                      <span className="bU">bU</span>
                    </td>
                    <td>
                      生理学的な機序や専門家のコンセンサスが中心で、直接的な介入試験のエビデンスが乏しい
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* ====================================================== SECTION 2 */}
          <section id="s2" className="sec">
            <div className="sec-hd">
              <div className="sec-num">2</div>
              <h2 className="sec-title">SEEDSフレームワークの全体像</h2>
            </div>

            <p>
              SEEDSは、米国メイヨークリニックの頭痛専門医らが臨床医向けに提唱した、片頭痛患者への生活指導をまとめた頭字語です。5つの柱（睡眠・運動・食事・日記・ストレス）について、それぞれのエビデンスと実践上のポイントがまとめられています。
            </p>

            <div className="mmd">
              <div className="mmd-lbl">フローチャート — SEEDSフレームワークの5本柱</div>
              <MermaidDiagram
                themeVariables={SEEDS_MERMAID_THEME}
                chart={`flowchart TD
    SEEDS["SEEDSフレームワーク\\n生活習慣管理の5本柱"]
    SEEDS --> S1["S: Sleep\\n睡眠の規則性"]
    SEEDS --> E1["E: Exercise\\n運動習慣"]
    SEEDS --> E2["E: Eat\\n食事・水分・カフェイン"]
    SEEDS --> D1["D: Diary\\n頭痛日記"]
    SEEDS --> S2["S: Stress\\nストレス管理"]
    S1 -.->|本ページで詳説| Focus["規則正しい生活\\n水分・カフェイン\\n食事リズム"]
    E2 -.->|本ページで詳説| Focus`}
              />
            </div>

            <p>
              各柱の概要は以下の通りです。睡眠については標準的な睡眠衛生指導により睡眠の量と質を最大化すること、運動については週3〜5回・1回30〜60分程度の実施、食事については規則正しい食事・十分な水分摂取・安定したカフェイン摂取量の維持、日記についてはベースラインの把握と治療反応の評価、ストレスについては認知行動療法やマインドフルネス、リラクゼーション、バイオフィードバックなどが挙げられています。
            </p>

            <div className="tbl">
              <table>
                <thead>
                  <tr>
                    <th>柱</th>
                    <th>主な内容</th>
                    <th>エビデンスの位置づけ</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Sleep（睡眠）</td>
                    <td>起床・就寝時刻を一定に保つ</td>
                    <td>
                      <span className="bB">bB</span>
                    </td>
                  </tr>
                  <tr>
                    <td>Exercise（運動）</td>
                    <td>有酸素運動を週3〜5回程度</td>
                    <td>
                      <span className="bB">bB</span>
                    </td>
                  </tr>
                  <tr>
                    <td>Eat（食事）</td>
                    <td>規則正しい食事・十分な水分・安定したカフェイン量</td>
                    <td>
                      <span className="bB">bB</span>〜<span className="bC">bC</span>
                      （項目により異なる）
                    </td>
                  </tr>
                  <tr>
                    <td>Diary（記録）</td>
                    <td>頭痛日記による発作パターンの把握</td>
                    <td>
                      <span className="bC">bC</span>（診断・モニタリング用途）
                    </td>
                  </tr>
                  <tr>
                    <td>Stress（ストレス）</td>
                    <td>認知行動療法・リラクゼーション等</td>
                    <td>
                      <span className="bB">bB</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* ====================================================== SECTION 3 */}
          <section id="s3" className="sec">
            <div className="sec-hd">
              <div className="sec-num">3</div>
              <h2 className="sec-title">規則正しい生活（睡眠リズム）</h2>
            </div>

            <h3>睡眠と頭痛の関係</h3>
            <p>
              睡眠と頭痛の関連は100年以上前から臨床的に指摘されてきましたが、実証的な研究が蓄積してきたのは近年です。片頭痛専門外来を受診した1,283名を対象とした大規模臨床研究では、多くの患者が慢性的に睡眠時間が短い傾向にあり、患者の半数で睡眠障害が頭痛の誘因になっていたことが報告されています。特に平均睡眠時間が6時間程度の群でより重い頭痛パターンがみられ、短時間睡眠群・過剰睡眠群のいずれも頭痛頻度や重症度の増加と関連していたことが示されています。
            </p>

            <h3>「週末頭痛」という現象</h3>
            <p>
              平日の睡眠不足を補おうと休日に寝だめをすることが、かえって頭痛（片頭痛）の誘因になりうる現象は「週末頭痛（weekend
              migraine）」として知られています。これは、睡眠時間の長さそのものよりも、
              <strong>睡眠リズムの変化・不規則性</strong>
              が頭痛の誘因になりうることを示唆しています。
            </p>

            <h3>実践のポイント（一般的な睡眠衛生指導）</h3>
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
                    <td>起床・就寝時刻</td>
                    <td>平日・休日を問わず、できるだけ一定の時刻を保つ</td>
                  </tr>
                  <tr>
                    <td>睡眠時間</td>
                    <td>極端な短時間睡眠・長時間睡眠の両方を避ける</td>
                  </tr>
                  <tr>
                    <td>寝だめ</td>
                    <td>休日の大幅な「寝だめ」は避ける</td>
                  </tr>
                  <tr>
                    <td>環境</td>
                    <td>就寝前の強い光・スクリーン使用を控える</td>
                  </tr>
                  <tr>
                    <td>医療機関への相談</td>
                    <td>不眠や睡眠時無呼吸などの併存が疑われる場合は医師に相談する</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="alert a-info">
              <div className="alert-i">📊</div>
              <div>
                <strong>
                  エビデンスグレード：<span className="bB">bB</span>
                </strong>
                　—
                大規模臨床サンプルでの関連は明確に示されているが、睡眠リズムを是正する介入そのものが頭痛頻度を減らすかを検証したRCTは限定的。
              </div>
            </div>
          </section>

          {/* ====================================================== SECTION 4 */}
          <section id="s4" className="sec">
            <div className="sec-hd">
              <div className="sec-num">4</div>
              <h2 className="sec-title">水分補給</h2>
            </div>

            <h3>脱水と頭痛の関係をどう考えるか</h3>
            <p>
              「水分不足が頭痛を招く」という考え方は広く知られていますが、ICHD-3（国際頭痛分類
              第3版）には脱水そのものを単独の頭痛類型として定義する項目はなく、空腹（絶食）による頭痛など関連する項目が個別に定義されています。水分摂取と頭痛の関係を検証した臨床研究はまだ数が限られており、結果も一様ではありません。
            </p>

            <h3>主な研究</h3>
            <p>
              オランダのプライマリケアで実施されたランダム化比較試験では、頭痛のある患者に1日あたり1.5リットルの水分摂取量の増加を指示したところ、片頭痛特異的QOL（MSQOL）スコアの統計的に有意な改善がみられましたが、月あたりの頭痛日数そのものには明確な変化はみられませんでした。同グループの先行パイロット試験でも同様に、水分摂取量を増やすことで2週間あたりの頭痛時間や頭痛強度に改善傾向がみられましたが、統計的な有意差には至りませんでした。
            </p>

            <p>
              一方、片頭痛患者256名を対象とした横断研究では、日常の飲水量と頭痛の重症度・持続時間との間に負の相関（水分摂取が多いほど頭痛が軽い傾向）が報告されていますが、横断研究であるため因果関係は明らかではなく、著者ら自身も更なる臨床試験の必要性を指摘しています。
            </p>

            <h3>実践のポイント</h3>
            <ul>
              <li>
                特別な疾患がない場合、<strong>日常的に十分な水分を継続的に摂取する</strong>
                ことは、頭痛対策に限らず一般的な健康管理として広く推奨されています。
              </li>
              <li>
                研究で用いられた「通常の摂取量に1.5リットル追加する」という数値はあくまで臨床試験のプロトコルであり、万人に当てはまる目標量ではありません。持病（腎疾患・心疾患など）がある方は、水分摂取量について医師に相談してください。
              </li>
              <li>
                水分摂取だけで頭痛が「治る」と保証するものではなく、他のSEEDS項目と組み合わせた包括的な生活管理の一部として位置づけるのが妥当です。
              </li>
            </ul>

            <div className="alert a-info">
              <div className="alert-i">📊</div>
              <div>
                <strong>
                  エビデンスグレード：<span className="bC">bC</span>
                </strong>
                　—
                小規模RCT・パイロット試験・横断研究が中心で、頭痛日数そのものへの効果は一貫して示されていない。
              </div>
            </div>
          </section>

          {/* ====================================================== SECTION 5 */}
          <section id="s5" className="sec">
            <div className="sec-hd">
              <div className="sec-num">5</div>
              <h2 className="sec-title">カフェインとの付き合い方</h2>
            </div>

            <p>
              カフェインは頭痛に対して「引き金」にも「対処法」にもなりうる、二面性のある物質として知られています。コーヒーを飲んだ後に片頭痛が来るように感じられても、それが本当のトリガーではなく、あくび・倦怠感・眠気といった片頭痛の前兆症状（プロドローム）の結果としてカフェイン摂取が先行しているだけの場合もあると指摘されています。
            </p>

            <h3>カフェイン離脱頭痛（Caffeine-withdrawal headache）</h3>
            <p>
              ICHD-3では、カフェイン離脱による頭痛が独立した診断カテゴリーとして定義されています。要点を整理すると以下のようになります。
            </p>

            <div className="tbl">
              <table className="th-orange">
                <thead>
                  <tr>
                    <th>診断のポイント</th>
                    <th>内容</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>背後にある摂取歴</td>
                    <td>1日200mgを超えるカフェインを2週間以上、習慣的に摂取していた</td>
                  </tr>
                  <tr>
                    <td>中断</td>
                    <td>その摂取が中断または遅延した</td>
                  </tr>
                  <tr>
                    <td>発症時期</td>
                    <td>最終摂取から24時間以内に頭痛が出現</td>
                  </tr>
                  <tr>
                    <td>軽快の仕方</td>
                    <td>
                      カフェイン100mg程度の摂取で1時間以内に軽快する、または摂取を完全にやめてから7日以内に自然消失する
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p>
              このメカニズムの背景には、慢性的なカフェイン摂取によって脳内のアデノシン受容体が適応的に変化し、摂取が途絶えるとアデノシンの作用が相対的に強まって頭痛・倦怠感・眠気などが生じるという説明があります。
            </p>

            <h3>「トリガーとしてのカフェイン」の実際のエビデンス</h3>
            <p>
              2020年までの文献を対象としたレビューでは、カフェイン／カフェイン離脱が片頭痛のトリガーになるかを調べた17研究のうち、実際にトリガーと報告された割合は参加者の2〜30%にとどまり、全体としては「すべての片頭痛患者に対してカフェインの完全な中止を推奨するだけの根拠は不十分」と結論づけられています。ただし、カフェインの過剰摂取が頭痛の慢性化に関与しうること、急な中断が頭痛を誘発しうることも同時に指摘されており、摂取するのであれば
              <strong>量をできるだけ一定に保つこと</strong>が推奨されています。
            </p>

            <h3>実践のポイント</h3>
            <ul>
              <li>
                カフェインを摂取する場合は、
                <strong>量と時間帯をできるだけ日によって変えない</strong>
                ことが、離脱頭痛の予防という観点では合理的とされています。
              </li>
              <li>
                一般的な健康な成人における目安として、1日200〜400mg程度（コーヒー約4〜5杯相当）までが安全域として言及されることが多いですが、片頭痛のある人ではより少なめ（1日200mg未満）を目安とする文献もあります。ただし、これは一般的な目安であり、個別の摂取上限を指示するものではありません。
              </li>
              <li>
                カフェインを完全に断つべきかどうかは一律に決められるものではなく、頭痛日記と併せて自分自身のパターンを確認し、必要であれば医師に相談することが望まれます。
              </li>
            </ul>

            <div className="alert a-info">
              <div className="alert-i">📊</div>
              <div>
                <strong>
                  エビデンスグレード：<span className="bB">bB</span>
                </strong>
                　—
                離脱頭痛の機序・診断基準は確立されているが、一般集団における「トリガーとしての重要性」は研究間で一致していない。
              </div>
            </div>
          </section>

          {/* ====================================================== SECTION 6 */}
          <section id="s6" className="sec">
            <div className="sec-hd">
              <div className="sec-num">6</div>
              <h2 className="sec-title">食事リズム（欠食・空腹の回避）</h2>
            </div>

            <h3>「空腹」も頭痛の誘因になりうる</h3>
            <p>
              ICHD-3には「絶食に起因する頭痛（Headache attributed to
              fasting）」という診断カテゴリーが設けられています。要点は以下の通りです。
            </p>

            <div className="tbl">
              <table className="th-teal">
                <thead>
                  <tr>
                    <th>診断のポイント</th>
                    <th>内容</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>頭痛の性質</td>
                    <td>拡散性（部位がはっきりしない）で、非拍動性、軽度〜中等度の強さが典型的</td>
                  </tr>
                  <tr>
                    <td>発症条件</td>
                    <td>8時間以上の絶食中、またはその結果として出現</td>
                  </tr>
                  <tr>
                    <td>軽快の仕方</td>
                    <td>食事を摂ることで軽快する</td>
                  </tr>
                  <tr>
                    <td>頻度との関係</td>
                    <td>絶食時間が長いほど頭痛が起こりやすくなる傾向がある</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p>
              また、片頭痛の既往がある人では、空腹によって誘発される頭痛が典型的な前兆のない片頭痛の形をとることもあり、その場合はあくまで「片頭痛」として扱われ、空腹はその誘因の一つと位置づけられます。
            </p>

            <p>
              複数国にまたがる最近の研究でも、長時間の空腹を伴う生活パターン（宗教的な断食期間など）において、拍動性の頭痛や吐き気・光過敏・音過敏を伴う頭痛が高頻度に報告されており、その多くが片頭痛様の性質を持つことが示唆されています。
            </p>

            <h3>実践 of ポイント</h3>
            <ul>
              <li>
                1日のうちで食事の間隔が極端に空きすぎないよう、<strong>規則正しい食事リズム</strong>
                を心がけることが基本的な生活指導として位置づけられています。
              </li>
              <li>
                特定の食品を除去する「除去食」のような対応は、エビデンスが確立されていないため、自己判断で極端な食事制限を行うことは推奨されません。気になる場合は医師・管理栄養士に相談してください。
              </li>
              <li>
                長時間の絶食を伴うダイエットや宗教的断食を行う場合、頭痛の既往がある人は事前に医師に相談し、食事タイミングの調整について助言を受けることが望まれます。
              </li>
            </ul>

            <div className="alert a-info">
              <div className="alert-i">📊</div>
              <div>
                <strong>
                  エビデンスグレード：<span className="bB">bB</span>
                </strong>
                　—
                ICHD-3で明確に定義された臨床像であり、複数地域での観察研究が一貫した傾向を示しているが、介入研究（食事間隔を是正することの効果を直接検証したRCT）は限定的。
              </div>
            </div>
          </section>

          {/* ====================================================== SECTION 7 */}
          <section id="s7" className="sec">
            <div className="sec-hd">
              <div className="sec-num">7</div>
              <h2 className="sec-title">生活習慣が頭痛につながる仕組み（概念図）</h2>
            </div>

            <p>
              ここまで見てきた4つの要素は、それぞれ異なる経路を通じて頭痛の起こりやすさ（閾値）に影響すると考えられています。以下は、各要素と頭痛発作の関係を概念的に整理した図です（個々の矢印は確立された単一経路を示すものではなく、教育目的の概念整理です）。
            </p>

            <div className="mmd">
              <div className="mmd-lbl">
                フローチャート — 生活習慣の乱れと頭痛発作の関係（概念図）
              </div>
              <MermaidDiagram
                themeVariables={SEEDS_MERMAID_THEME}
                chart={`flowchart TD
    A["生活リズムの乱れ"] --> B1["睡眠不足・過眠\\n睡眠リズムの変化"]
    A --> B2["水分摂取の不足"]
    A --> B3["カフェイン摂取量の急な変化"]
    A --> B4["食事間隔の乱れ・欠食"]
    B1 --> C["自律神経系・視床下部への負荷"]
    B2 --> C
    B4 --> C
    B3 --> D["アデノシン受容体の適応的変化"]
    D --> C
    C --> E["頭痛発作の閾値低下"]
    E --> F["頭痛/片頭痛発作"]
    style F fill:#ffebee,stroke:#c62828
    style E fill:#fff3e0,stroke:#e65100`}
              />
            </div>
          </section>

          {/* ====================================================== SECTION 8 */}
          <section id="s8" className="sec">
            <div className="sec-hd">
              <div className="sec-num">8</div>
              <h2 className="sec-title">SEEDSの残り3要素（簡潔に）</h2>
            </div>

            <p>
              本ページの主眼である「規則正しい生活・水分・カフェイン・食事リズム」以外にも、SEEDSフレームワークには以下の要素が含まれます。
            </p>

            <div className="tbl">
              <table>
                <thead>
                  <tr>
                    <th>要素</th>
                    <th>内容</th>
                    <th>エビデンスの位置づけ</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Exercise（運動）</td>
                    <td>週3〜5回、1回30〜60分程度の運動が一般的な目安として紹介されている</td>
                    <td>
                      <span className="bB">bB</span>
                    </td>
                  </tr>
                  <tr>
                    <td>Diary（頭痛日記）</td>
                    <td>発作の頻度・誘因・治療反応を記録し、診断精度や治療効果の評価に役立てる</td>
                    <td>
                      診断・モニタリング用途（<span className="bC">bC</span>）
                    </td>
                  </tr>
                  <tr>
                    <td>Stress（ストレス管理）</td>
                    <td>
                      認知行動療法・マインドフルネス・リラクゼーション・バイオフィードバックなどが紹介されている
                    </td>
                    <td>
                      <span className="bB">bB</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p>これらは本ページでは概要のみの紹介とし、詳細な解説は別ページに譲ります。</p>
          </section>

          {/* ====================================================== SECTION 9 */}
          <section id="s9" className="sec">
            <div className="sec-hd">
              <div className="sec-num">9</div>
              <h2 className="sec-title">個人差と受診の目安</h2>
            </div>

            <p>
              頭痛の誘因には大きな個人差があります。同じ生活パターンでも頭痛が起こる人と起こらない人がおり、SEEDSの各要素も「全員に等しく効果がある」というものではありません。まずは頭痛日記を通じて自分自身のパターンを把握し、無理のない範囲で生活習慣を調整することが現実的なアプローチとされています。
            </p>

            <h3>日々の生活チェックリスト</h3>
            <div className="qr-grid">
              <div className="qr">
                <div className="qr-t">🛌 起床・就寝時刻</div>
                <p style={{ fontSize: "12.5px", margin: 0 }}>毎日ほぼ同じ時刻を保っているか</p>
              </div>
              <div className="qr">
                <div className="qr-t">💧 水分摂取</div>
                <p style={{ fontSize: "12.5px", margin: 0 }}>
                  1日を通じてこまめに水分を摂れているか
                </p>
              </div>
              <div className="qr">
                <div className="qr-t">☕ カフェイン</div>
                <p style={{ fontSize: "12.5px", margin: 0 }}>
                  量・タイミングが日によって大きくばらついていないか
                </p>
              </div>
              <div className="qr">
                <div className="qr-t">🍽️ 食事</div>
                <p style={{ fontSize: "12.5px", margin: 0 }}>食事の間隔が極端に空いていないか</p>
              </div>
              <div className="qr">
                <div className="qr-t">📔 頭痛日記</div>
                <p style={{ fontSize: "12.5px", margin: 0 }}>
                  発作の日時・誘因らしきもの・対処法とその効果を記録できているか
                </p>
              </div>
            </div>

            <div className="alert a-danger">
              <div className="alert-i">🚨</div>
              <div>
                以下のような場合は、自己判断で対応を続けるのではなく、<strong>医師の診察</strong>
                を受けてください。
                <ul style={{ marginTop: 6 }}>
                  <li>生活習慣を調整しても頭痛が改善しない、または悪化する場合</li>
                  <li>頭痛の性質・頻度が急に変化した場合</li>
                  <li>
                    市販薬や処方薬の使用が増えている、あるいは薬を使う日数が多くなっている場合
                  </li>
                </ul>
              </div>
            </div>

            <p>
              具体的な治療方針（薬物療法を含む）については、本ページの範囲を超えるため、医師・薬剤師にご相談ください。
            </p>
          </section>

          {/* ====================================================== SECTION 10 */}
          <section id="s10" className="sec">
            <div className="sec-hd">
              <div className="sec-num">10</div>
              <h2 className="sec-title">参考文献・情報源</h2>
            </div>

            <p>
              一次情報（ガイドライン・原著論文）を優先し、要約サイトは補助的な参照にとどめています。
            </p>

            <div className="src-grid">
              <div className="src">
                <div className="src-org">疾患分類・一次情報</div>
                <div className="src-t">ICHD-3（国際頭痛分類 第3版）8.3.1 カフェイン離脱頭痛</div>
                <div className="src-url">
                  <Ext href="https://ichd-3.org/8-headache-attributed-to-a-substance-or-its-withdrawal/8-3-headache-attributed-to-substance-withdrawal/8-3-1-caffeine-withdrawal-headache/">
                    https://ichd-3.org/8-headache-attributed-to-a-substance-or-its-withdrawal/8-3-headache-attributed-to-substance-withdrawal/8-3-1-caffeine-withdrawal-headache/
                  </Ext>
                </div>
              </div>
              <div className="src">
                <div className="src-org">疾患分類・一次情報</div>
                <div className="src-t">ICHD-3 10.5 絶食に起因する頭痛</div>
                <div className="src-url">
                  <Ext href="https://ichd-3.org/10-headache-attributed-to-disorder-of-homoeostasis/10-5-headache-attributed-to-fasting/">
                    https://ichd-3.org/10-headache-attributed-to-disorder-of-homoeostasis/10-5-headache-attributed-to-fasting/
                  </Ext>
                </div>
              </div>
              <div className="src">
                <div className="src-org">レビュー論文</div>
                <div className="src-t">
                  Robblee J, Starling AJ. &quot;SEEDS for success: Lifestyle management in
                  migraine.&quot; Cleve Clin J Med. 2019;86(11):741-749.
                </div>
                <div className="src-url">
                  <Ext href="https://www.ccjm.org/content/86/11/741">
                    https://www.ccjm.org/content/86/11/741
                  </Ext>{" "}
                  （PubMed:{" "}
                  <Ext href="https://pubmed.ncbi.nlm.nih.gov/31710587/">
                    https://pubmed.ncbi.nlm.nih.gov/31710587/
                  </Ext>
                  ）
                </div>
              </div>
              <div className="src">
                <div className="src-org">原著論文（RCT）</div>
                <div className="src-t">
                  Spigt M, et al. &quot;A randomized trial on the effects of regular water intake in
                  patients with recurrent headaches.&quot; Fam Pract. 2012;29(4):370-375.
                </div>
                <div className="src-url">
                  <Ext href="https://academic.oup.com/fampra/article-abstract/29/4/370/492787">
                    https://academic.oup.com/fampra/article-abstract/29/4/370/492787
                  </Ext>
                </div>
              </div>
              <div className="src">
                <div className="src-org">原著論文（パイロット試験）</div>
                <div className="src-t">
                  Spigt MG, et al. &quot;Increasing the daily water intake for the prophylactic
                  treatment of headache: a pilot trial.&quot;
                </div>
                <div className="src-url">
                  <Ext href="https://pubmed.ncbi.nlm.nih.gov/16128874/">
                    https://pubmed.ncbi.nlm.nih.gov/16128874/
                  </Ext>
                </div>
              </div>
              <div className="src">
                <div className="src-org">原著論文（横断研究）</div>
                <div className="src-t">
                  Khorsha F, et al. &quot;Association of drinking water and migraine headache
                  severity.&quot; J Clin Neurosci. 2020;77:81-84.
                </div>
                <div className="src-url">
                  <Ext href="https://pubmed.ncbi.nlm.nih.gov/32446809/">
                    https://pubmed.ncbi.nlm.nih.gov/32446809/
                  </Ext>
                </div>
              </div>
              <div className="src">
                <div className="src-org">レビュー論文</div>
                <div className="src-t">
                  &quot;The Ambiguous Role of Caffeine in Migraine Headache: From Trigger to
                  Treatment&quot;
                </div>
                <div className="src-url">
                  <Ext href="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC7468766/">
                    https://www.ncbi.nlm.nih.gov/pmc/articles/PMC7468766/
                  </Ext>
                </div>
              </div>
              <div className="src">
                <div className="src-org">レビュー論文</div>
                <div className="src-t">
                  &quot;Caffeine for Headaches: Helpful or Harmful? A Brief Review of the
                  Literature&quot;
                </div>
                <div className="src-url">
                  <Ext href="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC10385675/">
                    https://www.ncbi.nlm.nih.gov/pmc/articles/PMC10385675/
                  </Ext>
                </div>
              </div>
              <div className="src">
                <div className="src-org">レビュー論文</div>
                <div className="src-t">
                  &quot;Caffeine and Primary (Migraine) Headaches—Friend or Foe?&quot;
                </div>
                <div className="src-url">
                  <Ext href="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC6901704/">
                    https://www.ncbi.nlm.nih.gov/pmc/articles/PMC6901704/
                  </Ext>
                </div>
              </div>
              <div className="src">
                <div className="src-org">原著論文</div>
                <div className="src-t">
                  Kelman L, Rains JC. &quot;Headache and sleep: examination of sleep patterns and
                  complaints in a large clinical sample of migraineurs.&quot; Headache.
                  2005;45(7):904-910.
                </div>
                <div className="src-url">
                  <Ext href="https://pubmed.ncbi.nlm.nih.gov/15985108/">
                    https://pubmed.ncbi.nlm.nih.gov/15985108/
                  </Ext>
                </div>
              </div>
              <div className="src">
                <div className="src-org">原著論文（多国間研究）</div>
                <div className="src-t">
                  &quot;Primary headache disorders susceptibility is associated with fasting-related
                  headache&quot; (Frontiers in Neurology)
                </div>
                <div className="src-url">
                  <Ext href="https://www.frontiersin.org/journals/neurology/articles/10.3389/fneur.2026.1859536/full">
                    https://www.frontiersin.org/journals/neurology/articles/10.3389/fneur.2026.1859536/full
                  </Ext>
                </div>
              </div>
              <div className="src">
                <div className="src-org">国際ガイドライン</div>
                <div className="src-t">
                  NICE CG150「Headaches in over 12s: diagnosis and management」
                  （英国国立医療技術評価機構）
                </div>
                <div className="src-url">
                  <Ext href="https://www.nice.org.uk/guidance/cg150">
                    https://www.nice.org.uk/guidance/cg150
                  </Ext>
                </div>
              </div>
              <div className="src">
                <div className="src-org">国内ガイドライン</div>
                <div className="src-t">
                  日本神経学会・日本頭痛学会・日本神経治療学会「頭痛の診療ガイドライン2021」
                </div>
                <div className="src-url">
                  <Ext href="https://www.neurology-jp.org/guidelinem/headache_medical_2021.html">
                    https://www.neurology-jp.org/guidelinem/headache_medical_2021.html
                  </Ext>{" "}
                  （Minds版:{" "}
                  <Ext href="https://minds.jcqhc.or.jp/summary/c00689/">
                    https://minds.jcqhc.or.jp/summary/c00689/
                  </Ext>
                  ）
                </div>
              </div>
              <div className="src">
                <div className="src-org">基礎資料（機序）</div>
                <div className="src-t">
                  NCBI Bookshelf (StatPearls) &quot;Caffeine Withdrawal&quot;
                </div>
                <div className="src-url">
                  <Ext href="https://www.ncbi.nlm.nih.gov/books/NBK430790/">
                    https://www.ncbi.nlm.nih.gov/books/NBK430790/
                  </Ext>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>

      {/* FOOTER */}
      <div className="footer">
        <strong>頭痛療養の基本：生活習慣管理とSEEDSフレームワーク</strong>
        　— 睡眠・水分・カフェイン・食事リズムの科学的根拠と実践ガイド
        <br />📅 作成年: 2026 | 次回レビュー推奨: ガイドライン更新時
        <br />
        ⚠️
        本資料は学術・教育・研究目的のみを対象としています。臨床への適用は必ず資格を持つ医療専門家の監督のもとで行ってください。
      </div>
    </div>
  );
}
