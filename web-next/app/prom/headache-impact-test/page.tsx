import { Ext } from "@/components/Ext";
import MermaidDiagram from "@/components/MermaidDiagram";
import HeadacheImpactTestSidebar from "@/components/prom/HeadacheImpactTestSidebar";
import "./headache-impact-test.css";

const HIT_MERMAID_THEME = {
  primaryColor: "#eedaf2",
  primaryTextColor: "#4a148c",
  primaryBorderColor: "#7b1fa2",
  lineColor: "#546e7a",
  secondaryColor: "#e0f2f1",
  tertiaryColor: "#e8f5e9",
  edgeLabelBackground: "#ffffff",
  fontSize: "13px",
};

export default function HeadacheImpactTestPage() {
  return (
    <div className="headache-impact-test-accent">
      {/* HERO */}
      <div className="hero">
        <div>📊</div>
        <h1>HIT-6（Headache Impact Test）完全リファレンスガイド</h1>
        <p className="hero-sub">
          初学者から臨床家まで — 国際エビデンス準拠（IRT / ICHD-3 / EMA / AAN）
        </p>
        <div className="hero-tags">
          <span className="hero-tag">HIT-6</span>
          <span className="hero-tag">IRT スコアリング</span>
          <span className="hero-tag">MCID</span>
          <span className="hero-tag">SNOOP4</span>
          <span className="hero-tag">27言語検証</span>
          <span className="hero-tag">初学者向け</span>
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
        <HeadacheImpactTestSidebar />

        {/* MAIN CONTENT */}
        <main className="main">
          {/* §1 HIT-6とは何か */}
          <section className="sec" id="s1">
            <div className="sec-hd">
              <span className="sec-num">1</span>
              <h2 className="sec-title">HIT-6とは何か</h2>
            </div>

            <div className="card">
              <h3>1.1 開発の背景</h3>
              <p>
                <strong>HIT-6（Headache Impact Test）</strong> は、2003年に Kosinski
                ら（QualityMetric
                Incorporated）によって開発された、頭痛が患者の日常生活に与える影響（インパクト）を定量的に評価するための{" "}
                <strong>
                  6項目自己記入式短縮調査票（Short-Form Self-Administered Questionnaire）
                </strong>{" "}
                です。
              </p>
              <p>
                従来の頭痛評価は頭痛の<strong>頻度（frequency）</strong>や
                <strong>持続時間（duration）</strong>
                のみに焦点を当てていましたが、片頭痛患者の実際の苦しみは「頭痛のない時間も含めた生活全体への影響」にあります。HIT-6
                はこの視点から設計されました。
              </p>
              <div className="alert a-info">
                <span className="alert-i">📘</span>
                <div>
                  <strong>出典：</strong> Kosinski M, et al.{" "}
                  <em>A six-item short-form survey for measuring headache impact: The HIT-6™.</em>{" "}
                  <em>Qual Life Res</em> 2003;12(8):963–974.
                  <br />
                  <Ext href="https://pubmed.ncbi.nlm.nih.gov/14651415/">
                    https://pubmed.ncbi.nlm.nih.gov/14651415/
                  </Ext>
                </div>
              </div>
            </div>

            <div className="card">
              <h3>1.2 開発プロセス</h3>
              <div className="tbl">
                <table>
                  <thead>
                    <tr>
                      <th>ステップ</th>
                      <th>内容</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <strong>候補項目プール</strong>
                      </td>
                      <td>
                        既存インパクト項目54問＋臨床家推薦35問＝<strong>計89項目</strong>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <strong>選別基準</strong>
                      </td>
                      <td>
                        内容妥当性・IRT情報量関数・項目内部一貫性・スコア分布・臨床妥当性・言語分析
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <strong>検証サンプル</strong>
                      </td>
                      <td>
                        インターネット調査・頭痛患者 <em>n</em> = 1,103（America Online
                        会員）、14日後に <em>n</em> = 540 が追跡調査
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <strong>最終形式</strong>
                      </td>
                      <td>
                        <strong>6項目</strong>、5段階リッカートスケール、記入所要時間：
                        <strong>約5分</strong>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="card">
              <h3>1.3 HIT-6 が測定する6つのドメイン</h3>
              <p>
                HIT-6 は単なる「痛みの強さ」ではなく、頭痛が生活に与える{" "}
                <strong>多次元的インパクト（Multidimensional Impact）</strong> を測定します。
              </p>
              <div className="tbl">
                <table className="th-teal">
                  <thead>
                    <tr>
                      <th>ドメイン（Domain）</th>
                      <th>内容</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <strong>1. 疼痛強度（Pain Severity）</strong>
                      </td>
                      <td>激しい頭痛が起こる頻度</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>2. 役割機能（Role Functioning）</strong>
                      </td>
                      <td>仕事・学業・家事・社会活動の制限頻度</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>3. 活力（Vitality）</strong>
                      </td>
                      <td>疲労感のため日常活動ができない頻度</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>4. 認知機能（Cognitive Functioning）</strong>
                      </td>
                      <td>集中力や思考力の低下頻度</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>5. 心理的苦痛（Psychological Distress）</strong>
                      </td>
                      <td>苛立ちや不快感の頻度</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>6. 重症度感（Symptom Severity）</strong>
                      </td>
                      <td>横になりたいほどの頭痛の頻度</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="alert a-ok">
                <span className="alert-i">✅</span>
                <div>
                  <strong>臨床的ポイント：</strong>これらのドメインは
                  ICHD-3（国際頭痛分類第3版）の機能障害基準と対応しており、診断から治療効果判定まで一貫して使用できます。
                  <br />
                  ICHD-3 全文：<Ext href="https://ichd-3.org/">https://ichd-3.org/</Ext>
                </div>
              </div>
            </div>

            <div className="card">
              <h3>付録：HIT-6 クイックリファレンス</h3>
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
                      <td>
                        <strong>ツール名</strong>
                      </td>
                      <td>Headache Impact Test-6（HIT-6™）</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>著作権</strong>
                      </td>
                      <td>© 2001, 2015 QualityMetric Incorporated</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>開発年</strong>
                      </td>
                      <td>2003年（Kosinski M, et al.）</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>質問数</strong>
                      </td>
                      <td>6項目</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>回答形式</strong>
                      </td>
                      <td>5段階（6 / 8 / 10 / 11 / 13 点）</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>スコア範囲</strong>
                      </td>
                      <td>36〜78点</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>想起期間</strong>
                      </td>
                      <td>Q1〜Q3：なし ／ Q4〜Q6：過去4週間</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>記入時間</strong>
                      </td>
                      <td>約5分</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>グレード分類</strong>
                      </td>
                      <td>&le;49：軽微 ／ 50〜55：一部 ／ 56〜59：相当 ／ &ge;60：重度</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>臨床試験認定</strong>
                      </td>
                      <td>EMA（欧州医薬品庁）が適合性を認定</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>言語対応</strong>
                      </td>
                      <td>27言語以上（日本語版検証済）</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          {/* §2 SNOOP4 レッドフラッグスクリーニング */}
          <section className="sec" id="s2">
            <div className="sec-hd">
              <span className="sec-num">2</span>
              <h2 className="sec-title">SNOOP4 レッドフラッグスクリーニング</h2>
            </div>

            <div className="alert a-danger">
              <span className="alert-i">🚨</span>
              <div>
                <strong>
                  重要：HIT-6 を使用する前に SNOOP4 スクリーニングを必ず完了すること。
                </strong>
                <br />
                二次性頭痛（Secondary Headache）が疑われる場合、先に CT/MRI
                等の画像診断を行い、原疾患を除外した後にのみ HIT-6 によるインパクト評価を実施する。
              </div>
            </div>

            <div className="snoop-grid">
              <div className="sn">
                <div className="sn-letter">S</div>
                <div className="sn-title">Systemic symptoms</div>
                <div className="sn-symp">
                  発熱・髄膜刺激症状・体重減少・免疫抑制状態・悪性腫瘍既往
                </div>
                <span className="sn-dx">→ 緊急画像診断</span>
              </div>
              <div className="sn">
                <div className="sn-letter">N</div>
                <div className="sn-title">Neurological deficits</div>
                <div className="sn-symp">運動麻痺・感覚障害・失語・複視・意識変容・認知変化</div>
                <span className="sn-dx">→ 緊急神経学的精査</span>
              </div>
              <div className="sn">
                <div className="sn-letter">O</div>
                <div className="sn-title">Onset sudden（雷鳴頭痛）</div>
                <div className="sn-symp">「生涯最悪の頭痛」として突然発症 → くも膜下出血除外</div>
                <span className="sn-dx">→ 緊急 CT</span>
              </div>
              <div className="sn">
                <div className="sn-letter">O</div>
                <div className="sn-title">Onset after 50</div>
                <div className="sn-symp">50歳以降の新規頭痛 → 側頭動脈炎・頭蓋内病変除外</div>
                <span className="sn-dx">→ 緊急画像診断</span>
              </div>
              <div className="sn">
                <div className="sn-letter">P</div>
                <div className="sn-title">Pattern change</div>
                <div className="sn-symp">
                  増悪傾向・外傷後新規発症・体位依存性（仰臥位悪化→ICP↑、立位悪化→ICP↓）
                </div>
                <span className="sn-dx">→ 画像診断</span>
              </div>
              <div className="sn">
                <div className="sn-letter">4</div>
                <div className="sn-title">4つの追加基準</div>
                <div className="sn-symp">乳頭浮腫 ／ 硬膜穿刺後 ／ 痙攣後 ／ 妊娠・産後</div>
                <span className="sn-dx">→ それぞれ専門的評価</span>
              </div>
            </div>

            <div className="alert a-warn">
              <span className="alert-i">⚠️</span>
              <div>
                <strong>SNOOP4 レッドフラッグが1つでも該当する場合</strong>：HIT-6
                評価を一時停止し、二次性頭痛の除外を優先する。
                <br />
                参考：<Ext href="https://ichd-3.org/">ICHD-3 国際頭痛分類</Ext> ／{" "}
                <Ext href="https://www.aan.com/guidelines/">AAN 頭痛ガイドライン</Ext>
              </div>
            </div>
          </section>

          {/* §3 HIT-6の構造——6つの質問項目 */}
          <section className="sec" id="s3">
            <div className="sec-hd">
              <span className="sec-num">3</span>
              <h2 className="sec-title">HIT-6の構造——6つの質問項目</h2>
            </div>

            <div className="card">
              <h3>3.1 6つの質問項目（英語・日本語対訳）</h3>
              <p>
                以下の各質問に対し、過去 <strong>4週間（Q4〜Q6）</strong>{" "}
                または現在の状態（Q1〜Q3）を5段階で回答します。
              </p>
              <div className="tbl">
                <table className="th-purple">
                  <thead>
                    <tr>
                      <th>項目</th>
                      <th>英語原文（要旨）</th>
                      <th>日本語概訳</th>
                      <th>評価ドメイン</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <strong>Q1</strong>
                      </td>
                      <td>How often do you have severe headache pain?</td>
                      <td>激しい頭痛はどのくらい起こりますか？</td>
                      <td>疼痛強度</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>Q2</strong>
                      </td>
                      <td>How often does headache limit your ability to do daily activities?</td>
                      <td>頭痛のために日常活動（仕事・学業・家事・社会活動）が制限されますか？</td>
                      <td>役割機能</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>Q3</strong>
                      </td>
                      <td>When you have a headache, how often do you wish you could lie down?</td>
                      <td>頭痛があるとき、横になりたいと感じますか？</td>
                      <td>重症度感</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>Q4</strong>
                      </td>
                      <td>
                        In the past 4 weeks, how often did you feel too tired to work/do daily
                        activities because of headache?
                      </td>
                      <td>
                        過去4週間で、頭痛のために疲れて仕事や日常活動ができなかったことはありますか？
                      </td>
                      <td>活力</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>Q5</strong>
                      </td>
                      <td>
                        In the past 4 weeks, how often did you feel irritated/fed up because of
                        headache?
                      </td>
                      <td>過去4週間で、頭痛のために気分が落ち込んだり、うんざりしましたか？</td>
                      <td>心理的苦痛</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>Q6</strong>
                      </td>
                      <td>
                        In the past 4 weeks, how often did headache limit your ability to
                        concentrate on work/daily activities?
                      </td>
                      <td>過去4週間で、頭痛のために集中力が低下しましたか？</td>
                      <td>認知機能</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="alert a-info">
                <span className="alert-i">📅</span>
                <div>
                  <strong>記憶帰還期間（Recall Period）：</strong>
                  <br />
                  Q1〜Q3：特定の想起期間なし（現在の状態を反映）
                  <br />
                  Q4〜Q6：<strong>過去4週間（28日間）</strong>
                </div>
              </div>
            </div>
          </section>

          {/* §4 スコアリング方法（IRT非線形採点） */}
          <section className="sec" id="s4">
            <div className="sec-hd">
              <span className="sec-num">4</span>
              <h2 className="sec-title">スコアリング方法（IRT非線形採点）</h2>
            </div>

            <div className="card">
              <h3>4.1 回答と点数の対応</h3>
              <p>
                各質問への回答は以下の点数に変換されます。この{" "}
                <strong>非線形スコアリング（Non-linear Scoring）</strong> は、項目反応理論（IRT:
                Item Response
                Theory）に基づいて設計されており、重篤な影響を示す回答により高い重みを持たせています。
              </p>
              <div className="tbl">
                <table>
                  <thead>
                    <tr>
                      <th>回答選択肢</th>
                      <th>英語</th>
                      <th>点数</th>
                      <th>備考</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>まったくない</td>
                      <td>Never</td>
                      <td className="tG">
                        <strong>6点</strong>
                      </td>
                      <td>最低点</td>
                    </tr>
                    <tr>
                      <td>めったにない</td>
                      <td>Rarely</td>
                      <td className="tG">
                        <strong>8点</strong>
                      </td>
                      <td></td>
                    </tr>
                    <tr>
                      <td>ときどき</td>
                      <td>Sometimes</td>
                      <td className="tO">
                        <strong>10点</strong>
                      </td>
                      <td></td>
                    </tr>
                    <tr>
                      <td>非常によく</td>
                      <td>Very Often</td>
                      <td className="tO">
                        <strong>11点</strong>
                      </td>
                      <td>※ 1点刻みにジャンプ（IRT設計）</td>
                    </tr>
                    <tr>
                      <td>いつも</td>
                      <td>Always</td>
                      <td className="tR">
                        <strong>13点</strong>
                      </td>
                      <td>最高点；重篤影響に最高重み</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="alert a-warn">
                <span className="alert-i">💡</span>
                <div>
                  <strong>初学者向け解説（IRT非線形採点）：</strong>
                  <br />
                  「Sometimes → Very Often」が1点差（10→11点）なのに対し、「Very Often →
                  Always」も1点差（11→13点）ではなく2点差になっています。これは IRT
                  によって、重篤側の変化（Very
                  Often→Always）に大きい重みを与えるよう設計されています。6項目の合計で計算することで、この差が累積的に影響します。
                </div>
              </div>
            </div>

            <div className="card">
              <h3>4.2 IRT採点スケール — 視覚的理解</h3>
              <div className="mmd">
                <div className="mmd-lbl">📊 IRT非線形スコアリング（応答→点数マッピング）</div>
                <MermaidDiagram
                  themeVariables={HIT_MERMAID_THEME}
                  chart={`flowchart LR
A["まったくない<br/>Never"] -->|6点| S1["合計スコア<br/>36〜78点"]
B["めったにない<br/>Rarely"] -->|8点| S1
C["ときどき<br/>Sometimes"] -->|10点| S1
D["非常によく<br/>Very Often"] -->|11点| S1
E["いつも<br/>Always"] -->|13点| S1
style D fill:#fff3e0,color:#e65100,stroke:#e65100
style E fill:#ffebee,color:#c62828,stroke:#c62828`}
                />
              </div>
              <p style={{ fontSize: 12, color: "var(--g6)", marginTop: 4 }}>
                ※ 上図で D・E（Very Often /
                Always）がオレンジ・赤で強調されているのは、これらの回答に IRT
                による大きな重みが設定されているためです。
              </p>
            </div>

            <div className="card">
              <h3>4.3 段階的計算例（初学者向け）</h3>
              <p>
                <strong>例：ある重度頭痛患者の回答</strong>
              </p>
              <div className="tbl">
                <table className="th-orange">
                  <thead>
                    <tr>
                      <th>質問</th>
                      <th>回答</th>
                      <th>点数</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Q1</td>
                      <td>非常によく</td>
                      <td className="tO">11</td>
                    </tr>
                    <tr>
                      <td>Q2</td>
                      <td>いつも</td>
                      <td className="tR">13</td>
                    </tr>
                    <tr>
                      <td>Q3</td>
                      <td>非常によく</td>
                      <td className="tO">11</td>
                    </tr>
                    <tr>
                      <td>Q4</td>
                      <td>ときどき</td>
                      <td>10</td>
                    </tr>
                    <tr>
                      <td>Q5</td>
                      <td>いつも</td>
                      <td className="tR">13</td>
                    </tr>
                    <tr>
                      <td>Q6</td>
                      <td>非常によく</td>
                      <td className="tO">11</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>合計</strong>
                      </td>
                      <td></td>
                      <td className="tR">
                        <strong>69点</strong>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="alert a-danger">
                <span className="alert-i">📊</span>
                <div>
                  → <strong>グレード4：重度インパクト（Severe Impact）&ge;60点</strong> —
                  積極的な治療介入が必要
                </div>
              </div>
              <p>
                <strong>計算式：</strong>
                <code>HIT-6合計 = Q1 + Q2 + Q3 + Q4 + Q5 + Q6</code>
                <br />
                最小スコア: 6 &times; 6 = <strong>36点</strong>（全項目「まったくない」）
                <br />
                最大スコア: 6 &times; 13 = <strong>78点</strong>（全項目「いつも」）
              </p>
            </div>
          </section>

          {/* §5 スコア解釈——4段階グレード分類 */}
          <section className="sec" id="s5">
            <div className="sec-hd">
              <span className="sec-num">5</span>
              <h2 className="sec-title">スコア解釈——4段階グレード分類</h2>
            </div>

            <div className="card">
              <h3>5.1 4段階グレード分類</h3>
              <div className="tbl">
                <table>
                  <thead>
                    <tr>
                      <th>HIT-6スコア</th>
                      <th>グレード</th>
                      <th>英語</th>
                      <th>臨床的意味</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <strong>36〜49点</strong>
                      </td>
                      <td>
                        <span className="bGrn">グレード1</span>
                      </td>
                      <td>Little or No Impact</td>
                      <td className="tG">頭痛による生活への影響は軽微または皆無</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>50〜55点</strong>
                      </td>
                      <td>
                        <span className="bOra">グレード2</span>
                      </td>
                      <td>Some Impact</td>
                      <td className="tO">日常活動にある程度の影響あり</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>56〜59点</strong>
                      </td>
                      <td>
                        <span className="bOra">グレード3</span>
                      </td>
                      <td>Substantial Impact</td>
                      <td className="tO">相当な機能障害；予防療法の適応を検討</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>&ge;60点</strong>
                      </td>
                      <td>
                        <span className="bRed">グレード4</span>
                      </td>
                      <td>Severe Impact</td>
                      <td className="tR">重度の機能障害；積極的な治療介入が必要</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="card">
              <h3>5.2 グレード分類 — 視覚的フローチャート</h3>
              <div className="mmd">
                <div className="mmd-lbl">📊 HIT-6スコア → グレード分類</div>
                <MermaidDiagram
                  themeVariables={HIT_MERMAID_THEME}
                  chart={`flowchart LR
SC["HIT-6<br/>スコア"] --> G1["グレード1<br/>36〜49点<br/>軽微・なし"]
SC --> G2["グレード2<br/>50〜55点<br/>一部インパクト"]
SC --> G3["グレード3<br/>56〜59点<br/>相当なインパクト"]
SC --> G4["グレード4<br/>≥60点<br/>重度インパクト"]
style G1 fill:#e8f5e9,color:#1b5e20,stroke:#66bb6a
style G2 fill:#fff8e1,color:#f57f17,stroke:#ffc107
style G3 fill:#fff3e0,color:#e65100,stroke:#ff9800
style G4 fill:#ffebee,color:#c62828,stroke:#ef5350`}
                />
              </div>
            </div>

            <div className="alert a-warn">
              <span className="alert-i">🎯</span>
              <div>
                <strong>臨床的判断基準：</strong>
                <br />・<strong>HIT-6 &ge; 56点</strong> →
                頭痛が日常生活に有意なインパクトを与えていることを示す臨床的閾値
                <br />・<strong>HIT-6 &ge; 60点</strong> →
                重度インパクト：片頭痛の予防療法開始基準（月4回以上の発作または著明な機能障害）と重複評価を推奨
                <br />・<strong>HIT-6 &lt; 50点</strong> → 過剰治療・過剰診断のリスクを考慮
              </div>
            </div>
          </section>

          {/* §6 心理測定特性 */}
          <section className="sec" id="s6">
            <div className="sec-hd">
              <span className="sec-num">6</span>
              <h2 className="sec-title">心理測定特性（Psychometric Properties）</h2>
            </div>

            <div className="card">
              <h3>
                6.1 信頼性（Reliability） <span className="bA">Grade A</span>
              </h3>
              <p>
                <strong>信頼性</strong>
                とは「同じ状態の患者を測定した場合、毎回同じ結果が得られるか」を示す指標です。
              </p>
              <div className="tbl">
                <table className="th-teal">
                  <thead>
                    <tr>
                      <th>指標</th>
                      <th>値</th>
                      <th>解釈基準</th>
                      <th>出典</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <strong>内的一貫性（Cronbach's &alpha;）</strong>
                      </td>
                      <td className="tG">
                        <strong>0.82〜0.92</strong>
                      </td>
                      <td>&alpha; &ge; 0.70 = 良好</td>
                      <td>Yang et al. 2011; Rendas-Baum et al. 2014</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>検査再検査信頼性（Test-retest ICC）</strong>
                      </td>
                      <td className="tG">
                        <strong>0.77〜0.89</strong>
                      </td>
                      <td>ICC &ge; 0.70 = 良好</td>
                      <td>Kosinski et al. 2003（原版 ICC = 0.80）</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>代替形式信頼性（Alternate Forms）</strong>
                      </td>
                      <td className="tG">
                        <strong>0.90</strong>
                      </td>
                      <td>—</td>
                      <td>Kosinski et al. 2003</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="alert a-info">
                <span className="alert-i">📘</span>
                <div>
                  <strong>初学者向け解説：</strong>
                  <br />
                  <strong>Cronbach's &alpha;（クロンバックのアルファ）</strong>
                  は「6つの質問が同じ概念（頭痛インパクト）を測っているか」の一貫性指標です。0.82〜0.92という値は{" "}
                  <strong>「非常に良好」</strong>を意味します。
                  <br />
                  <strong>ICC（級内相関係数）</strong>
                  は「2週間後に同じ患者に再測定しても結果が安定しているか」を示します。0.77〜0.89は{" "}
                  <strong>「良好〜優秀」</strong>の範囲です。
                </div>
              </div>
            </div>

            <div className="card">
              <h3>
                6.2 妥当性（Validity） <span className="bA">Grade A</span>
              </h3>
              <p>
                <strong>妥当性</strong>とは「測りたいものを正しく測れているか」を示す概念です。
              </p>
              <div className="tbl">
                <table>
                  <thead>
                    <tr>
                      <th>妥当性の種類</th>
                      <th>結果</th>
                      <th>詳細</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <strong>構成概念妥当性（Construct Validity）</strong>
                      </td>
                      <td>
                        <span className="tG">確認</span>
                      </td>
                      <td>確認的因子分析（CFA）で1因子構造が支持</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>収束妥当性（Convergent Validity）</strong>
                      </td>
                      <td>
                        <span className="tG">r = 0.52（p &lt; 0.001）</span>
                      </td>
                      <td>
                        MIDAS と有意相関（Sauro et al. 2010、CHORD研究、<em>n</em> = 798）
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <strong>弁別妥当性（Discriminant Validity）</strong>
                      </td>
                      <td>
                        <span className="tG">F = 488.02, p &lt; 0.0001</span>
                      </td>
                      <td>慢性片頭痛・発作性片頭痛・非片頭痛間で有意差</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>内容妥当性（Content Validity）</strong>
                      </td>
                      <td>
                        <span className="tG">確認</span>
                      </td>
                      <td>患者インタビューと専門家レビューによる（Houts et al. 2020）</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>反応性（Responsiveness）</strong>
                      </td>
                      <td>
                        <span className="tG">確認</span>
                      </td>
                      <td>予防療法介入前後で有意な変化を検出</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>異文化間等価性（Cross-cultural Equivalence）</strong>
                      </td>
                      <td>
                        <span className="tG">確認（27言語）</span>{" "}
                        <span className="bA">Grade A</span>
                      </td>
                      <td>Martin et al. 2004; DIF 分析で支持</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="card">
              <h3>
                6.3 多言語・多集団での検証 <span className="bA">Grade A</span>
              </h3>
              <div className="tbl">
                <table className="th-teal">
                  <thead>
                    <tr>
                      <th>検証集団・言語</th>
                      <th>主な結果</th>
                      <th>出典</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>発作性・慢性片頭痛（英語圏）</td>
                      <td>
                        良好な信頼性・妥当性（<em>n</em> = 2,049）
                      </td>
                      <td>
                        Yang et al. 2011（<em>Cephalalgia</em>）<br />
                        <Ext href="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC3057423/">
                          PMC3057423
                        </Ext>
                      </td>
                    </tr>
                    <tr>
                      <td>慢性片頭痛（PREEMPT試験）</td>
                      <td>
                        良好な心理測定特性（<em>n</em> = 1,384）
                      </td>
                      <td>
                        Rendas-Baum et al. 2014（<em>HQLO</em>）<br />
                        <Ext href="https://pmc.ncbi.nlm.nih.gov/articles/PMC4243819/">
                          PMC4243819
                        </Ext>
                      </td>
                    </tr>
                    <tr>
                      <td>慢性片頭痛（PROMISE-2試験）</td>
                      <td>
                        IRT 解析で単次元性確認（<em>n</em> = 1,072）
                      </td>
                      <td>
                        Houts et al. 2021（<em>Qual Life Res</em>）<br />
                        <Ext href="https://link.springer.com/article/10.1007/s11136-020-02668-2">
                          SpringerLink
                        </Ext>
                      </td>
                    </tr>
                    <tr>
                      <td>9言語（多言語検証）</td>
                      <td>等価性確認</td>
                      <td>
                        Martin et al. 2004（<em>J Clin Epidemiol</em>）<br />
                        <Ext href="https://pubmed.ncbi.nlm.nih.gov/15617954/">PubMed: 15617954</Ext>
                      </td>
                    </tr>
                    <tr>
                      <td>27言語（翻訳プロジェクト）</td>
                      <td>概念的・言語的等価性を確認</td>
                      <td>
                        Gandek et al. 2003（<em>Qual Life Res</em>）
                      </td>
                    </tr>
                    <tr>
                      <td>日本語版（邦文）</td>
                      <td>信頼性・妥当性を確認（日本国内）</td>
                      <td>
                        Sakai et al. 2004（<em>Rinsho Iyaku</em>）
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="alert a-ok">
                <span className="alert-i">🇯🇵</span>
                <div>
                  <strong>臨床的意義：</strong>HIT-6 は日本語版が正式に検証されており（Sakai et al.
                  2004）、Eli Lilly Japan
                  によって日本語使用が公式に認可されています。日本人患者への適用は科学的に裏付けられています。
                </div>
              </div>
            </div>
          </section>

          {/* §7 MCID——最小臨床重要差 */}
          <section className="sec" id="s7">
            <div className="sec-hd">
              <span className="sec-num">7</span>
              <h2 className="sec-title">
                MCID——最小臨床重要差（Minimally Clinically Important Difference）
              </h2>
            </div>

            <div className="card">
              <h3>7.1 MCID とは何か</h3>
              <p>
                <strong>MCID（Minimally Clinically Important Difference）</strong>または{" "}
                <strong>MIC（Minimally Important Change）</strong>
                とは、「統計的に有意な変化」ではなく「患者が実際に感じ取れる最小の変化量」を指します。
              </p>
              <div className="alert a-info">
                <span className="alert-i">💡</span>
                <div>
                  <strong>具体例：</strong> HIT-6 が 65点 → 63点
                  に変化した場合（2点減少）、統計的には改善を示すかもしれませんが、患者の実感として「良くなった」と感じる閾値に達しているかどうかを判断するのが
                  MCID です。
                </div>
              </div>
            </div>

            <div className="card">
              <h3>
                7.2 HIT-6 の MCID 推定値（文献別） <span className="bB">Grade B</span>
              </h3>
              <div className="tbl">
                <table className="th-purple">
                  <thead>
                    <tr>
                      <th>研究</th>
                      <th>対象集団</th>
                      <th>推定 MCID</th>
                      <th>推定方法</th>
                      <th>出典</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Smelt et al. 2014</td>
                      <td>
                        発作性片頭痛（プライマリケア、<em>n</em> = 490）
                      </td>
                      <td className="tO">
                        <strong>−2.5〜−6点</strong>（範囲）
                      </td>
                      <td>Mean change法 / ROC曲線法</td>
                      <td>
                        <em>Cephalalgia</em> 34(1):29–36
                        <br />
                        <Ext href="https://pubmed.ncbi.nlm.nih.gov/23843470/">PubMed: 23843470</Ext>
                      </td>
                    </tr>
                    <tr>
                      <td>Coeytaux et al. 2005</td>
                      <td>頭痛専門外来患者</td>
                      <td className="tO">
                        <strong>−1.5〜−2.3点</strong>
                      </td>
                      <td>アンカーベース法</td>
                      <td>
                        <em>Headache</em> 45:638–643
                      </td>
                    </tr>
                    <tr>
                      <td>Houts et al. 2020</td>
                      <td>慢性片頭痛（PROMISE-2）</td>
                      <td className="tR">
                        <strong>&ge;6点減少</strong> <span className="bA">Grade A</span>
                      </td>
                      <td>多段階統計法</td>
                      <td>
                        <em>Headache</em> 60(9):2003–2013
                        <br />
                        <Ext href="https://pubmed.ncbi.nlm.nih.gov/32862469/">PubMed: 32862469</Ext>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="card">
              <h3>7.3 臨床推奨 MCID の解釈</h3>
              <div className="alert a-purple">
                <span className="alert-i">📊</span>
                <div>
                  <strong>発作性片頭痛（Episodic Migraine）における目安：</strong>
                  <br />
                  　HIT-6 &ge; 2〜3点の減少 → 個人レベルでの最小改善
                  <br />
                  　HIT-6 &ge; 5点の減少 → 臨床的に意味のある改善
                  <br />
                  <br />
                  <strong>慢性片頭痛（Chronic Migraine）における目安：</strong>
                  <br />
                  　HIT-6 <strong>&ge; 6点の減少</strong> → 臨床的に意味のある改善（推奨閾値）
                  <br />
                  　（Houts et al. 2020; PROMISE-2 研究に基づく）
                </div>
              </div>
              <div className="alert a-warn">
                <span className="alert-i">⚠️</span>
                <div>
                  <strong>注意：</strong>MCID はグループ間変化（between-group
                  MID）と個人内変化（within-person
                  MIC）では異なる値を取ります。臨床試験では前者、個別患者評価では後者を参照することが一般的です。
                </div>
              </div>
            </div>

            <div className="card">
              <h3>7.4 CGRP モノクローナル抗体試験での HIT-6 変化例（参照値）</h3>
              <div className="tbl">
                <table className="th-teal">
                  <thead>
                    <tr>
                      <th>薬剤・試験</th>
                      <th>治療群変化（3ヵ月時点）</th>
                      <th>プラセボ群変化</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <strong>エレヌマブ 140 mg</strong>（発作性片頭痛）
                      </td>
                      <td className="tG">
                        <strong>−9.34点</strong>（p &lt; 0.001）<span className="bA">Grade A</span>
                      </td>
                      <td>−6.62点</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>エレヌマブ 70 mg</strong>
                      </td>
                      <td className="tG">
                        <strong>−8.39点</strong>（p = 0.004）<span className="bA">Grade A</span>
                      </td>
                      <td>−6.62点</td>
                    </tr>
                    <tr>
                      <td>日本人発作性片頭痛（Sakai et al. 2019）</td>
                      <td>ベースライン 57.4〜58.9点</td>
                      <td>—</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          {/* §8 頭痛タイプ別参照スコア */}
          <section className="sec" id="s8">
            <div className="sec-hd">
              <span className="sec-num">8</span>
              <h2 className="sec-title">頭痛タイプ別参照スコア</h2>
            </div>

            <div className="card">
              <h3>8.1 疾患別 HIT-6 平均スコア</h3>
              <div className="tbl">
                <table className="th-purple">
                  <thead>
                    <tr>
                      <th>頭痛タイプ（ICHD-3）</th>
                      <th>平均 HIT-6（&plusmn;SD）</th>
                      <th>臨床的解釈</th>
                      <th>出典</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <strong>慢性片頭痛（&ge;15日/月）</strong>
                      </td>
                      <td className="tR">
                        <strong>62.5 &plusmn; 7.8</strong>
                      </td>
                      <td>
                        <span className="bRed">重度インパクト</span>
                      </td>
                      <td>Yang et al. 2011</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>発作性片頭痛（&lt;15日/月）</strong>
                      </td>
                      <td className="tR">
                        <strong>60.2 &plusmn; 6.8</strong>
                      </td>
                      <td>
                        <span className="bRed">重度インパクト</span>
                      </td>
                      <td>Yang et al. 2011</td>
                    </tr>
                    <tr>
                      <td>非片頭痛頭痛</td>
                      <td className="tO">
                        <strong>49.1 &plusmn; 8.7</strong>
                      </td>
                      <td>
                        <span className="bOra">一部インパクト</span>
                      </td>
                      <td>Yang et al. 2011</td>
                    </tr>
                    <tr>
                      <td>日本人・発作性片頭痛</td>
                      <td className="tO">
                        <strong>57.4〜58.9</strong>
                      </td>
                      <td>
                        <span className="bOra">相当〜重度インパクト</span>
                      </td>
                      <td>Sakai et al. 2019</td>
                    </tr>
                    <tr>
                      <td>日本人・慢性片頭痛</td>
                      <td className="tR">
                        <strong>62.7〜63.3</strong>
                      </td>
                      <td>
                        <span className="bRed">重度インパクト</span>
                      </td>
                      <td>Lipton et al. 2019</td>
                    </tr>
                    <tr>
                      <td>治療抵抗性慢性片頭痛</td>
                      <td className="tR">
                        <strong>67.6</strong>
                      </td>
                      <td>
                        <span className="bRed">重度インパクト（最重症域）</span>
                      </td>
                      <td>Lambru et al. 2020</td>
                    </tr>
                    <tr>
                      <td>睡眠時無呼吸症候群関連頭痛</td>
                      <td className="tO">
                        <strong>55.0</strong>
                      </td>
                      <td>
                        <span className="bOra">中等度インパクト</span>
                      </td>
                      <td>
                        Nakayama et al. 2023
                        <br />
                        <Ext href="https://sleep.biomedcentral.com/articles/10.1186/s41606-023-00084-2">
                          BioMedCentral
                        </Ext>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="alert a-info">
                <span className="alert-i">📊</span>
                <div>
                  <strong>疾患重症度の鑑別指標として：</strong>片頭痛患者（発作性・慢性）は典型的に
                  60点以上を示すのに対し、非片頭痛頭痛では 50点を下回る傾向があります（Yang et al.
                  2011, <em>n</em> = 2,049）。ただし HIT-6
                  単独での頭痛タイプ診断は不可能であることに注意。
                </div>
              </div>
            </div>

            <div className="card">
              <h3>8.2 ICHD-3 分類との対応</h3>
              <div className="tbl">
                <table className="th-teal">
                  <thead>
                    <tr>
                      <th>ICHD-3 コード</th>
                      <th>診断名</th>
                      <th>典型的 HIT-6 範囲</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>1.1</td>
                      <td>前兆なし片頭痛</td>
                      <td>56〜65点</td>
                    </tr>
                    <tr>
                      <td>1.2</td>
                      <td>前兆あり片頭痛</td>
                      <td>56〜65点</td>
                    </tr>
                    <tr>
                      <td>1.3</td>
                      <td>慢性片頭痛</td>
                      <td className="tR">60〜78点</td>
                    </tr>
                    <tr>
                      <td>2.1</td>
                      <td>低頻度発作性緊張型頭痛</td>
                      <td className="tG">36〜49点</td>
                    </tr>
                    <tr>
                      <td>2.2</td>
                      <td>高頻度発作性緊張型頭痛</td>
                      <td>50〜56点</td>
                    </tr>
                    <tr>
                      <td>2.3</td>
                      <td>慢性緊張型頭痛</td>
                      <td>55〜65点</td>
                    </tr>
                    <tr>
                      <td>3.1 / 3.2</td>
                      <td>群発頭痛</td>
                      <td className="tR">60〜75点（発作期）</td>
                    </tr>
                    <tr>
                      <td>8.2</td>
                      <td>薬剤乱用頭痛（MOH）</td>
                      <td className="tR">60〜75点（乱用期）</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p style={{ fontSize: 12, color: "var(--g6)" }}>
                出典：ICHD-3 <Ext href="https://ichd-3.org/">https://ichd-3.org/</Ext> ／ Yang et
                al. 2011
              </p>
            </div>
          </section>

          {/* §9 HIT-6とMIDASの比較 */}
          <section className="sec" id="s9">
            <div className="sec-hd">
              <span className="sec-num">9</span>
              <h2 className="sec-title">HIT-6とMIDASの比較・補完的使用</h2>
            </div>

            <div className="card">
              <h3>9.1 比較概要</h3>
              <p>
                HIT-6 と MIDAS（Migraine Disability Assessment
                Scale）は、いずれも国際的に広く使用される頭痛インパクト評価ツールですが、
                <strong>測定する概念・時間軸・感受性</strong>に重要な違いがあります。
              </p>
              <div className="tbl">
                <table>
                  <thead>
                    <tr>
                      <th>比較項目</th>
                      <th>HIT-6</th>
                      <th>MIDAS</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <strong>開発年</strong>
                      </td>
                      <td>2003年</td>
                      <td>2000年</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>質問数</strong>
                      </td>
                      <td>6項目</td>
                      <td>5項目（＋補足2項目）</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>回答形式</strong>
                      </td>
                      <td>5段階リッカートスケール</td>
                      <td>実損失日数（日数カウント）</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>想起期間</strong>
                      </td>
                      <td>4週間（28日）</td>
                      <td>3ヵ月（90日）</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>スコア範囲</strong>
                      </td>
                      <td>36〜78点</td>
                      <td>0〜&infin;点</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>主な感受性</strong>
                      </td>
                      <td className="tN">
                        <strong>頭痛強度・質の変化を捉えやすい</strong>
                      </td>
                      <td>
                        <strong>頭痛頻度の変化を捉えやすい</strong>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <strong>記入時間</strong>
                      </td>
                      <td>約5分</td>
                      <td>約5分</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>MIDASとの相関</strong>
                      </td>
                      <td>r = 0.52（p &lt; 0.001）</td>
                      <td>—</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>言語対応</strong>
                      </td>
                      <td>27言語以上</td>
                      <td>複数言語</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>日本語版</strong>
                      </td>
                      <td>あり（検証済）</td>
                      <td>あり（検証済）</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>臨床試験での採用</strong>
                      </td>
                      <td>多数の CGRP mAb 試験</td>
                      <td>多数 of 試験</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="card">
              <h3>9.2 使い分けの指針</h3>
              <div className="phase-grid">
                <div className="ph ph1">
                  <div className="ph-icon">📊</div>
                  <div className="ph-title">HIT-6 が優れる場面</div>
                  <div className="ph-desc">
                    頭痛の<strong>質・強度</strong>が問題の中心
                    <br />
                    <strong>短期（1ヵ月単位）</strong>のモニタリング
                    <br />
                    患者の<strong>主観的 QoL</strong> を多面的に評価
                    <br />
                    頭痛種別を問わず全般的インパクトを把握
                  </div>
                </div>
                <div className="ph ph2">
                  <div className="ph-icon">📅</div>
                  <div className="ph-title">MIDAS が優れる場面</div>
                  <div className="ph-desc">
                    <strong>頭痛頻度・日数</strong>の変化が主要アウトカム
                    <br />
                    <strong>生産性損失・経済的コスト</strong>の定量化
                    <br />
                    <strong>3ヵ月単位</strong>の長期障害評価
                    <br />
                    社会保障・労務管理的観点での評価
                  </div>
                </div>
                <div className="ph ph3">
                  <div className="ph-icon">🔗</div>
                  <div className="ph-title">補完的併用（推奨）</div>
                  <div className="ph-desc">
                    Sauro et al. 2010（CHORD研究）：
                    <br />
                    <strong>HIT-6 と MIDAS の補完的使用</strong>
                    で頭痛障害をより正確に評価できると結論。
                    <br />
                    単独使用より補完的使用が推奨。
                  </div>
                </div>
                <div className="ph ph4">
                  <div className="ph-icon">📓</div>
                  <div className="ph-title">頭痛日誌との組み合わせ</div>
                  <div className="ph-desc">
                    REFORM 2026：HIT-6・MIDAS は<strong>頭痛日誌の代替にはならない</strong>
                    。3者を組み合わせることで治療反応を包括的に把握。
                  </div>
                </div>
              </div>

              <div className="alert a-warn">
                <span className="alert-i">⚠️</span>
                <div>
                  <strong>重要な注意（REFORM 研究、2026年）：</strong>HIT-6 および MIDAS
                  は治療反応性評価において重要な側面を反映するものの、エレヌマブの治療反応を評価する際に前向き頭痛日誌を代替するには十分な精度を持たないことが示されました（Danish
                  Headache Center）。
                  <br />
                  出典：Thuraiaiyah J, et al. <em>Eur J Neurol</em> 2026;33(4):e70542.
                  <br />
                  <Ext href="https://pubmed.ncbi.nlm.nih.gov/41902353/">
                    https://pubmed.ncbi.nlm.nih.gov/41902353/
                  </Ext>
                  <span className="bC">Grade C</span>（最新研究、今後のエビデンス蓄積を要する）
                </div>
              </div>
            </div>
          </section>

          {/* §10 臨床使用フローチャート */}
          <section className="sec" id="s10">
            <div className="sec-hd">
              <span className="sec-num">10</span>
              <h2 className="sec-title">臨床使用フローチャート</h2>
            </div>

            <div className="card">
              <p>
                以下のフローチャートは、患者が頭痛を主訴として来院した際の HIT-6
                活用手順を示します。SNOOP4
                スクリーニングから12週間モニタリングプロトコルまでを一連の流れとして表現しています。
              </p>
              <div className="mmd">
                <div className="mmd-lbl">
                  📊 HIT-6 臨床使用フローチャート（SNOOP4 → スコア分類 → 12週プロトコル）
                </div>
                <MermaidDiagram
                  themeVariables={HIT_MERMAID_THEME}
                  chart={`flowchart TD
A[患者が頭痛を主訴として来院] --> B{SNOOP4<br/>レッドフラッグスクリーニング}
B -->|フラグあり| C[緊急画像診断<br/>CT / MRI<br/>二次性頭痛を除外]
C --> D{画像・検査<br/>結果}
D -->|二次性頭痛が判明| E[原疾患の治療<br/>専門科紹介]
D -->|異常なし| F
B -->|フラグなし| F[HIT-6 実施<br/>記入所要時間：約5分]
F --> G[スコア計算<br/>6項目合計：36〜78点]
G --> H{スコア分類}
H -->|36〜49点| I[グレード1<br/>軽微・なし<br/>経過観察・生活指導]
H -->|50〜55点| J[グレード2<br/>一部インパクト<br/>急性期治療の見直し<br/>頭痛日誌開始]
H -->|56〜59点| K[グレード3<br/>相当なインパクト<br/>予防療法の適応検討<br/>MIDAS 併用評価]
H -->|≥60点| L[グレード4<br/>重度インパクト<br/>予防療法開始<br/>多モーダル治療計画]
I --> M[3ヵ月後に再評価]
J --> M
K --> N[12週間治療プロトコル<br/>開始]
L --> N
N --> O{12週後<br/>HIT-6 再評価}
O -->|≥5〜6点改善<br/>慢性片頭痛では≥6点| P[治療継続・維持]
O -->|改善不十分| Q[治療計画の見直し<br/>MOH評価<br/>CGRP mAb 検討]
P --> R[6ヵ月・1年後の<br/>長期フォロー]
Q --> R
style A fill:#4a90d9,color:#ffffff
style C fill:#e74c3c,color:#ffffff
style E fill:#e74c3c,color:#ffffff
style I fill:#2ecc71,color:#ffffff
style J fill:#f39c12,color:#ffffff
style K fill:#e67e22,color:#ffffff
style L fill:#c0392b,color:#ffffff
style P fill:#27ae60,color:#ffffff
style Q fill:#8e44ad,color:#ffffff`}
                />
              </div>
              <div className="alert a-info">
                <span className="alert-i">📘</span>
                <div>
                  参考ガイドライン：<Ext href="https://ichd-3.org/">ICHD-3</Ext> ／{" "}
                  <Ext href="https://www.aan.com/guidelines/">
                    AAN Migraine Prevention Guidelines
                  </Ext>{" "}
                  ／{" "}
                  <Ext href="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC9188162/">
                    EHF CGRP mAbs Guidelines 2022
                  </Ext>
                </div>
              </div>
            </div>
          </section>

          {/* §11 特殊集団への適用 */}
          <section className="sec" id="s11">
            <div className="sec-hd">
              <span className="sec-num">11</span>
              <h2 className="sec-title">特殊集団への適用</h2>
            </div>

            <div className="alert a-warn">
              <span className="alert-i">⚠️</span>
              <div>
                <strong>特殊集団では HIT-6 の標準スコア解釈に追加の臨床判断が必要です。</strong>
                以下の各集団における注意点を確認してください。
              </div>
            </div>

            <div className="card">
              <h3>
                11.1 小児・青年期（Pediatric ＆ Adolescent Population）
                <span className="bU">推奨未確立</span>
              </h3>
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
                      <td>
                        <strong>対象年齢</strong>
                      </td>
                      <td>標準的 HIT-6 は成人向けに開発・検証。12歳以上での使用が一般的</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>小児適応の課題</strong>
                      </td>
                      <td>抽象的な概念（「集中力」「気分の落ち込み」）の理解に年齢依存性あり</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>代替ツール</strong>
                      </td>
                      <td>PedMIDAS（小児用 MIDAS）との併用を検討</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>臨床的閾値</strong>
                      </td>
                      <td>
                        成人と同じ閾値の適用は<strong>慎重に行うこと</strong>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="card">
              <h3>11.2 妊娠・授乳期（Pregnancy ＆ Lactation）</h3>
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
                      <td>
                        <strong>ツールの使用</strong>
                      </td>
                      <td>HIT-6 評価自体は問題なく使用可能</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>注意点</strong>
                      </td>
                      <td>スコアが高い場合でも、薬剤選択は妊娠安全性に基づいて行うこと</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>禁忌薬</strong>
                      </td>
                      <td>
                        バルプロ酸（Category X）・トピラマート（Category D）・エルゴタミン系 →
                        使用禁忌
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <strong>安全な選択</strong>
                      </td>
                      <td>
                        アセトアミノフェン（急性期第一選択）・硫酸マグネシウム IV（重篤発作時）
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="card">
              <h3>11.3 高齢者（Geriatric Population：65歳以上）</h3>
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
                      <td>
                        <strong>認知機能低下</strong>
                      </td>
                      <td>質問の理解・記憶への影響を考慮。補助者によるサポートが必要な場合あり</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>スコア解釈</strong>
                      </td>
                      <td>
                        高齢者では身体機能低下が HIT-6
                        スコアを過大評価させる可能性あり（多重疾患の影響）
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <strong>薬剤注意点</strong>
                      </td>
                      <td>
                        TCA（アミトリプチリン）は低用量（10mg）から開始。&beta;遮断薬による起立性低血圧・転倒リスク、トピラマートによる認知機能への影響に注意
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="card">
              <h3>11.4 薬剤乱用頭痛（MOH：ICHD-3 コード 8.2）</h3>
              <div className="alert a-danger">
                <span className="alert-i">🚨</span>
                <div>
                  <strong>MOH 評価は HIT-6 使用前に必須チェック項目</strong>
                </div>
              </div>
              <div className="tbl">
                <table className="th-red">
                  <thead>
                    <tr>
                      <th>薬剤カテゴリ</th>
                      <th>乱用基準（月間）</th>
                      <th>リスク</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>単純鎮痛薬・NSAIDs</td>
                      <td className="tR">
                        <strong>月15日以上 &times; 3ヵ月以上</strong>
                      </td>
                      <td>MOH リスク</td>
                    </tr>
                    <tr>
                      <td>トリプタン・エルゴタミン・オピオイド</td>
                      <td className="tR">
                        <strong>月10日以上 &times; 3ヵ月以上</strong>
                      </td>
                      <td>MOH リスク</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p>
                MOH 患者では HIT-6 スコアが <strong>60〜75点</strong> と高値を示すことが多く、
                <strong>離脱療法後のスコア改善</strong>を治療目標の指標として活用可能です。
              </p>
            </div>
          </section>

          {/* §12 臨床応用の限界 */}
          <section className="sec" id="s12">
            <div className="sec-hd">
              <span className="sec-num">12</span>
              <h2 className="sec-title">臨床応用の限界と注意点</h2>
            </div>

            <div className="card">
              <h3>12.1 HIT-6 の制限事項</h3>
              <div className="tbl">
                <table className="th-red">
                  <thead>
                    <tr>
                      <th>限界点</th>
                      <th>詳細</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <strong>頭痛頻度の直接測定不可</strong>
                      </td>
                      <td>
                        HIT-6 は頻度ではなく<em>インパクト</em>を測定。頭痛日誌との組み合わせが必要
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <strong>頭痛タイプの区別不可</strong>
                      </td>
                      <td>
                        単一スコアは複数の頭痛タイプを混合して評価するため、タイプ別診断に使用不可
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <strong>想起バイアス</strong>
                      </td>
                      <td>4週間の回顧的評価であり、記憶の歪みが生じる可能性あり</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>フロア・シーリング効果</strong>
                      </td>
                      <td>極めて軽症（36点付近）または最重症（78点付近）では変化の検出が困難</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>頭痛以外の要因の影響</strong>
                      </td>
                      <td>抑うつ・睡眠障害・他疾患が HIT-6 スコアを独立して上昇させる可能性</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>治療反応の単独代替不可</strong>
                      </td>
                      <td>
                        REFORM 研究（2026）：治療反応評価において頭痛日誌の代替として使用不可{" "}
                        <span className="bC">Grade C</span>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <strong>ライセンス管理</strong>
                      </td>
                      <td>
                        HIT-6™ は QualityMetric Incorporated
                        の商標。臨床試験での使用にはライセンス取得が必要な場合あり（EMA
                        が適合性を認定）
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="card">
              <h3>12.2 HIT-6 単独使用が不十分な場面</h3>
              <div className="alert a-warn">
                <span className="alert-i">⛔</span>
                <div>
                  <strong>以下の目的には HIT-6 単独使用は不十分です：</strong>
                  <br />✗ 新規頭痛の初期診断（ICHD-3 診断基準を使用すること）
                  <br />✗ 薬剤選択の根拠としての単独使用（MIDAS・臨床評価を組み合わせること）
                  <br />✗ CGRP mAb 治療反応の唯一 of 評価指標（頭痛日誌との組み合わせが必要）
                  <br />✗ 緊急性の判断（SNOOP4 を使用すること）
                </div>
              </div>
            </div>
          </section>

          {/* §13 統合モニタリングプロトコル（12週） */}
          <section className="sec" id="s13">
            <div className="sec-hd">
              <span className="sec-num">13</span>
              <h2 className="sec-title">統合モニタリングプロトコル（12週間フレームワーク）</h2>
            </div>

            <div className="card">
              <h3>13.1 12週間フレームワーク</h3>
              <p>
                HIT-6 は治療の「スナップショット」ではなく、
                <strong>継続的なモニタリングツール</strong>として機能します。以下は CGRP mAb
                ガイドライン・AAN 予防療法ガイドライン・EHF 推奨に基づいたプロトコルです。
              </p>
              <div className="tbl">
                <table className="th-teal">
                  <thead>
                    <tr>
                      <th>時点</th>
                      <th>HIT-6 実施</th>
                      <th>MIDAS 実施</th>
                      <th>頭痛日誌</th>
                      <th>目標</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <strong>ベースライン（0週）</strong>
                      </td>
                      <td className="tG">✅ 必須</td>
                      <td className="tG">✅ 必須</td>
                      <td>最低30日間</td>
                      <td>治療前評価の確立</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>4週（1ヵ月後）</strong>
                      </td>
                      <td className="tG">✅ 実施</td>
                      <td>—</td>
                      <td>継続</td>
                      <td>初期反応確認</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>8週（2ヵ月後）</strong>
                      </td>
                      <td className="tG">✅ 実施</td>
                      <td>—</td>
                      <td>継続</td>
                      <td>中間評価</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>12週（3ヵ月後）</strong>
                      </td>
                      <td className="tG">✅ 必須</td>
                      <td className="tG">✅ 必須</td>
                      <td>継続</td>
                      <td>正式アウトカム評価</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>6ヵ月</strong>
                      </td>
                      <td className="tG">✅ 必須</td>
                      <td className="tG">✅ 必須</td>
                      <td>継続</td>
                      <td>長期維持の判断</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>12ヵ月</strong>
                      </td>
                      <td className="tG">✅ 必須</td>
                      <td className="tG">✅ 必須</td>
                      <td>継続</td>
                      <td>年間評価</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="card">
              <h3>13.2 治療成功基準（複合アウトカム）</h3>
              <div className="tbl">
                <table className="th-purple">
                  <thead>
                    <tr>
                      <th>指標</th>
                      <th>成功の目安</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <strong>HIT-6 改善</strong>
                      </td>
                      <td>
                        ベースラインから{" "}
                        <span className="tG">
                          <strong>&ge;5〜6点減少</strong>
                        </span>
                        （慢性片頭痛では <strong>&ge;6点</strong>）
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <strong>HIT-6 グレード改善</strong>
                      </td>
                      <td>例：グレード4（&ge;60点）→ グレード3（56〜59点）以下への移行</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>頭痛日数減少</strong>
                      </td>
                      <td>&ge;50%減少（月間頭痛日数 responder definition）</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>MIDAS 改善</strong>
                      </td>
                      <td>ベースラインから &ge;50%減少</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>PGIC</strong>
                      </td>
                      <td>7点尺度で「かなり改善」または「非常に改善」（5〜7点）</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="card">
              <h3>13.3 治療プラン別 HIT-6 改善の期待値</h3>
              <div className="tbl">
                <table>
                  <thead>
                    <tr>
                      <th>治療介入</th>
                      <th>期待される HIT-6 改善幅</th>
                      <th>エビデンス</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>エレヌマブ 140 mg/月（発作性片頭痛）</td>
                      <td className="tG">
                        <strong>−9.34点</strong>（プラセボ比有意）
                      </td>
                      <td>
                        <span className="bA">Grade A</span>
                      </td>
                    </tr>
                    <tr>
                      <td>エレヌマブ 70 mg/月</td>
                      <td className="tG">
                        <strong>−8.39点</strong>
                      </td>
                      <td>
                        <span className="bA">Grade A</span>
                      </td>
                    </tr>
                    <tr>
                      <td>オナボツリヌムトキシンA（慢性片頭痛）</td>
                      <td>有意な改善（PREEMPT試験）</td>
                      <td>
                        <span className="bA">Grade A</span>
                      </td>
                    </tr>
                    <tr>
                      <td>フレマネズマブ（予防）</td>
                      <td>有意な改善</td>
                      <td>
                        <span className="bA">Grade A</span>
                      </td>
                    </tr>
                    <tr>
                      <td>バイオフィードバック（Biofeedback）</td>
                      <td>臨床的意義のある改善</td>
                      <td>
                        <span className="bB">Grade B</span>
                      </td>
                    </tr>
                    <tr>
                      <td>認知行動療法（CBT）</td>
                      <td>臨床的意義のある改善</td>
                      <td>
                        <span className="bB">Grade B</span>
                      </td>
                    </tr>
                    <tr>
                      <td>マグネシウム補充（400〜600 mg/日）</td>
                      <td>補助的効果</td>
                      <td>
                        <span className="bB">Grade B</span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p style={{ fontSize: 12, color: "var(--g6)" }}>
                参考：
                <Ext href="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC9188162/">
                  EHF CGRP mAbs Guidelines 2022（PMC9188162）
                </Ext>{" "}
                ／{" "}
                <Ext href="https://www.aan.com/guidelines/">AAN Migraine Prevention Guidelines</Ext>
              </p>
            </div>
          </section>

          {/* §14 エビデンス要約と参考文献 */}
          <section className="sec" id="s14">
            <div className="sec-hd">
              <span className="sec-num">14</span>
              <h2 className="sec-title">エビデンス要約と参考文献</h2>
            </div>

            <div className="card">
              <h3>14.1 エビデンス要約</h3>
              <div className="tbl">
                <table className="th-teal">
                  <thead>
                    <tr>
                      <th>カテゴリ</th>
                      <th>評価</th>
                      <th>根拠</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <strong>信頼性</strong>
                      </td>
                      <td>
                        <span className="bA">Grade A（優秀）</span>
                      </td>
                      <td>
                        複数の大規模 RCT・コホート研究で一貫して &alpha; &gt; 0.80、ICC &gt; 0.77
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <strong>妥当性</strong>
                      </td>
                      <td>
                        <span className="bA">Grade A（優秀）</span>
                      </td>
                      <td>構成概念・収束・弁別妥当性がすべて確認済み</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>反応性</strong>
                      </td>
                      <td>
                        <span className="bA">Grade A（良好）</span>
                      </td>
                      <td>PREEMPT・PROMISE-2・CGRP mAb 複数試験で治療変化を検出</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>異文化間等価性</strong>
                      </td>
                      <td>
                        <span className="bA">Grade A（優秀）</span>
                      </td>
                      <td>27言語で等価性確認、DIF 分析で支持</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>MCID の明確性</strong>
                      </td>
                      <td>
                        <span className="bB">Grade B（良好）</span>
                      </td>
                      <td>複数の方法で推定値が示されているが、集団・疾患タイプにより幅あり</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>頭痛日誌代替可能性</strong>
                      </td>
                      <td>
                        <span className="bC">否定的（Grade C）</span>
                      </td>
                      <td>REFORM 研究（2026）で単独使用の限界が示された</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="card">
              <h3>14.2 開発・バリデーション（原著）</h3>
              <div className="src-grid">
                <div className="src">
                  <div className="src-org">Development / Original Validation</div>
                  <div className="src-t">
                    Kosinski M, et al. — A six-item short-form survey for measuring headache impact:
                    The HIT-6™
                  </div>
                  <div>
                    <em>Qual Life Res</em> 2003;12(8):963–974
                  </div>
                  <Ext href="https://pubmed.ncbi.nlm.nih.gov/14651415/">
                    https://pubmed.ncbi.nlm.nih.gov/14651415/
                  </Ext>
                </div>
                <div className="src">
                  <div className="src-org">IRT Calibration</div>
                  <div className="src-t">
                    Bjorner JB, et al. — Calibration of an item pool for assessing the burden of
                    headaches: An application of IRT to the HIT™
                  </div>
                  <div>
                    <em>Qual Life Res</em> 2003;12:913–933
                  </div>
                  <Ext href="https://link.springer.com/article/10.1023/A:1026119331193">
                    https://link.springer.com/article/10.1023/A:1026119331193
                  </Ext>
                </div>
                <div className="src">
                  <div className="src-org">Cross-cultural Equivalence</div>
                  <div className="src-t">
                    Martin M, et al. — The short-form HIT-6 was psychometrically equivalent in nine
                    languages
                  </div>
                  <div>
                    <em>J Clin Epidemiol</em> 2004;57:1271–1278
                  </div>
                  <Ext href="https://pubmed.ncbi.nlm.nih.gov/15617954/">
                    https://pubmed.ncbi.nlm.nih.gov/15617954/
                  </Ext>
                </div>
              </div>
            </div>

            <div className="card">
              <h3>14.3 心理測定特性・バリデーション（追加研究）</h3>
              <div className="src-grid">
                <div className="src">
                  <div className="src-org">Episodic &amp; Chronic Migraine Validation</div>
                  <div className="src-t">
                    Yang M, et al. — Validation of the HIT-6™ across episodic and chronic migraine
                  </div>
                  <div>
                    <em>Cephalalgia</em> 2011;31(4):357–367
                  </div>
                  <Ext href="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC3057423/">
                    https://www.ncbi.nlm.nih.gov/pmc/articles/PMC3057423/
                  </Ext>
                </div>
                <div className="src">
                  <div className="src-org">PREEMPT / Chronic Migraine</div>
                  <div className="src-t">
                    Rendas-Baum R, et al. — Validation of the HIT-6 in patients with chronic
                    migraine
                  </div>
                  <div>
                    <em>HQLO</em> 2014;12:117
                  </div>
                  <Ext href="https://pmc.ncbi.nlm.nih.gov/articles/PMC4243819/">
                    https://pmc.ncbi.nlm.nih.gov/articles/PMC4243819/
                  </Ext>
                </div>
                <div className="src">
                  <div className="src-org">PROMISE-2 / IRT Analysis</div>
                  <div className="src-t">
                    Houts CR, et al. — Reliability and validity of the HIT-6 in chronic migraine
                    from the PROMISE-2 study
                  </div>
                  <div>
                    <em>Qual Life Res</em> 2021;30:931–943
                  </div>
                  <Ext href="https://link.springer.com/article/10.1007/s11136-020-02668-2">
                    https://link.springer.com/article/10.1007/s11136-020-02668-2
                  </Ext>
                </div>
                <div className="src">
                  <div className="src-org">Content Validity</div>
                  <div className="src-t">
                    Houts CR, et al. — Content validity of HIT-6 as a measure of headache impact in
                    people with migraine
                  </div>
                  <div>
                    <em>Headache</em> 2020;60(1):28–39
                  </div>
                  <Ext href="https://headachejournal.onlinelibrary.wiley.com/doi/full/10.1111/head.13701">
                    https://headachejournal.onlinelibrary.wiley.com/doi/full/10.1111/head.13701
                  </Ext>
                </div>
              </div>
            </div>

            <div className="card">
              <h3>14.4 MCID・スコア解釈</h3>
              <div className="src-grid">
                <div className="src">
                  <div className="src-org">MCID — Episodic Migraine</div>
                  <div className="src-t">
                    Smelt AF, et al. — What is a clinically relevant change on the HIT-6?
                  </div>
                  <div>
                    <em>Cephalalgia</em> 2014;34(1):29–36
                  </div>
                  <Ext href="https://pubmed.ncbi.nlm.nih.gov/23843470/">
                    https://pubmed.ncbi.nlm.nih.gov/23843470/
                  </Ext>
                </div>
                <div className="src">
                  <div className="src-org">MCID — Chronic Migraine (PROMISE-2)</div>
                  <div className="src-t">
                    Houts CR, et al. — Determining Thresholds for Meaningful Change for the HIT-6 in
                    Chronic Migraine
                  </div>
                  <div>
                    <em>Headache</em> 2020;60(9):2003–2013
                  </div>
                  <Ext href="https://pubmed.ncbi.nlm.nih.gov/32862469/">
                    https://pubmed.ncbi.nlm.nih.gov/32862469/
                  </Ext>
                </div>
              </div>
            </div>

            <div className="card">
              <h3>14.5 HIT-6 vs MIDAS 比較・REFORM 研究</h3>
              <div className="src-grid">
                <div className="src">
                  <div className="src-org">HIT-6 vs MIDAS — CHORD Study</div>
                  <div className="src-t">
                    Sauro KM, et al. — HIT-6 and MIDAS as Measures of Headache Disability in a
                    Headache Referral Population
                  </div>
                  <div>
                    <em>Headache</em> 2010;50:383–395
                  </div>
                  <Ext href="https://pubmed.ncbi.nlm.nih.gov/19817883/">
                    https://pubmed.ncbi.nlm.nih.gov/19817883/
                  </Ext>
                </div>
                <div className="src">
                  <div className="src-org">REFORM Study 2026</div>
                  <div className="src-t">
                    Thuraiaiyah J, et al. — MIDAS and HIT-6 Questionnaires Versus Headache Diaries
                    for Monitoring Treatment Response to Erenumab in Migraine
                  </div>
                  <div>
                    <em>Eur J Neurol</em> 2026;33(4):e70542
                  </div>
                  <Ext href="https://pubmed.ncbi.nlm.nih.gov/41902353/">
                    https://pubmed.ncbi.nlm.nih.gov/41902353/
                  </Ext>
                </div>
              </div>
            </div>

            <div className="card">
              <h3>14.6 日本語版・日本人データ</h3>
              <div className="src-grid">
                <div className="src">
                  <div className="src-org">Japanese Validation</div>
                  <div className="src-t">
                    Sakai F, et al. — Evaluation of the reliability of the Japanese version of the
                    HIT-6
                  </div>
                  <div>
                    <em>Rinsho Iyaku</em> 2004;20:1045–1054
                  </div>
                  <div className="src-url">（日本語文献 — PubMed未収載）</div>
                </div>
                <div className="src">
                  <div className="src-org">Sleep Apnea &amp; Headache — Japan</div>
                  <div className="src-t">
                    Nakayama H, et al. — Clinical application of HIT-6 and ESS for sleep apnea
                    headache
                  </div>
                  <div>
                    <em>Sleep Sci Pract</em> 2023
                  </div>
                  <Ext href="https://sleep.biomedcentral.com/articles/10.1186/s41606-023-00084-2">
                    https://sleep.biomedcentral.com/articles/10.1186/s41606-023-00084-2
                  </Ext>
                </div>
              </div>
            </div>

            <div className="card">
              <h3>14.7 国際ガイドライン・分類基準</h3>
              <div className="src-grid">
                <div className="src">
                  <div className="src-org">IHS / ICHD-3</div>
                  <div className="src-t">国際頭痛分類第3版（全文）</div>
                  <Ext href="https://ichd-3.org/">https://ichd-3.org/</Ext>
                </div>
                <div className="src">
                  <div className="src-org">AAN Guidelines</div>
                  <div className="src-t">片頭痛予防ガイドライン（AAN/AHS）</div>
                  <Ext href="https://www.aan.com/guidelines/">https://www.aan.com/guidelines/</Ext>
                </div>
                <div className="src">
                  <div className="src-org">EHF — CGRP mAbs 2022</div>
                  <div className="src-t">
                    CGRP モノクローナル抗体予防療法ガイドライン（欧州頭痛連盟）
                  </div>
                  <Ext href="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC9188162/">
                    https://www.ncbi.nlm.nih.gov/pmc/articles/PMC9188162/
                  </Ext>
                </div>
                <div className="src">
                  <div className="src-org">Cephalalgia / IHS — Acute Treatment 2024</div>
                  <div className="src-t">IHS 急性期治療推奨 2024</div>
                  <Ext href="https://journals.sagepub.com/doi/10.1177/03331024241252666">
                    https://journals.sagepub.com/doi/10.1177/03331024241252666
                  </Ext>
                </div>
                <div className="src">
                  <div className="src-org">Cochrane Library</div>
                  <div className="src-t">頭痛・片頭痛 系統的レビュー総覧</div>
                  <Ext href="https://www.cochranelibrary.com/search?query=headache+migraine&searchBy=3&type=cdsr">
                    https://www.cochranelibrary.com/
                  </Ext>
                </div>
                <div className="src">
                  <div className="src-org">Physiopedia</div>
                  <div className="src-t">HIT-6 臨床解説（英語）</div>
                  <Ext href="https://www.physio-pedia.com/Headache_Impact_Test_(HIT-6)">
                    https://www.physio-pedia.com/Headache_Impact_Test_(HIT-6)
                  </Ext>
                </div>
              </div>
            </div>

            <div className="alert a-info">
              <span className="alert-i">📅</span>
              <div>
                本文書は2026年6月時点の国際的学術文献に基づいて作成されています。ICHD-4
                作業版（2024年）の改訂動向を含む最新ガイドラインの更新については、IHS 分類委員会（
                <Ext href="https://ihs-headache.org/en/about-ihs/standing-committees/classification/">
                  IHS Headache Classification Committee
                </Ext>
                ）を定期的に参照してください。
              </div>
            </div>
          </section>
        </main>
      </div>

      {/* FOOTER */}
      <div className="footer">
        <strong>HIT-6（Headache Impact Test）完全リファレンスガイド</strong> — 初学者から臨床家まで
        — 国際エビデンス準拠（IRT / ICHD-3 / EMA / AAN）
        <br />📅 作成年: 2026 | 次回レビュー推奨: ガイドライン更新時
        <br />
        ⚠️
        本資料は学術・教育・研究目的のみを対象としています。臨床への適用は必ず資格を持つ医療専門家の監督のもとで行ってください。
      </div>
    </div>
  );
}
