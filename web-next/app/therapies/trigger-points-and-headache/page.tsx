import "./trigger-points-and-headache.css";
import { Ext } from "@/components/Ext";
import MermaidDiagram from "@/components/MermaidDiagram";
import { TriggerPointsSidebar } from "@/components/therapies/TriggerPointsSidebar";

const MTP_MERMAID_THEME: Record<string, string> = {
  primaryColor: "#f3e5f5",
  primaryTextColor: "#4a148c",
  primaryBorderColor: "#7b1fa2",
  lineColor: "#6a1b9a",
  secondaryColor: "#e0f2f1",
  tertiaryColor: "#e8f5e9",
  edgeLabelBackground: "#ffffff",
  fontSize: "13px",
};

export default function TriggerPointsAndHeadachePage() {
  return (
    <div className="trigger-points-accent">
      {/* HERO */}
      <div className="hero">
        <div>🎯</div>
        <h1>頭痛のトリガーポイント入門</h1>
        <p className="hero-sub">
          筋膜性疼痛（トリガーポイント）と頭痛の関係を ICHD-3
          と国際文献から読み解く、初学者向けステップバイステップガイド
        </p>
        <div className="hero-tags">
          <span className="hero-tag">ICHD-3</span>
          <span className="hero-tag">緊張型頭痛</span>
          <span className="hero-tag">頸原性頭痛</span>
          <span className="hero-tag">筋膜性疼痛 (MTrP)</span>
          <span className="hero-tag">SNNOOP10</span>
          <span className="hero-tag">エビデンスに基づく医療</span>
        </div>
      </div>

      {/* DISCLAIMER */}
      <div className="disclaimer">
        <strong>⚠️ DisclaimerBanner／学術・教育目的に関する重要事項</strong>　 本ページは
        <strong>
          教育・情報提供のみを目的として作成されたものであり、個別の患者に対する診断・治療の推奨ではありません
        </strong>
        。 すべての内容は資格を持つ医療専門家による臨床適用前のレビューが必要です。
        症状がある場合は自己判断せず、医師・理学療法士・鍼灸師等の有資格の医療専門家にご相談ください。
      </div>

      {/* LAYOUT */}
      <div className="layout">
        {/* SIDEBAR */}
        <TriggerPointsSidebar />

        {/* MAIN CONTENT */}
        <main className="main">
          {/* ====================================================== SECTION 1 */}
          <section id="s1" className="sec">
            <div className="sec-hd">
              <div className="sec-num">1</div>
              <h1 className="sec-title">トリガーポイントとは何か</h1>
            </div>

            <div className="card">
              <p>
                筋膜性トリガーポイント（myofascial trigger point,
                MTrP）とは、骨格筋の中にある過敏化したスポットで、索状に硬くなった帯（taut
                band）の中に、押すと痛む結節として触知されるものと定義されています。この概念は1950年代に
                Travell と Simons
                によって体系化され、現在まで筋膜性疼痛症候群の診断・治療の中心的な考え方として用いられてきました。
              </p>
            </div>

            <div className="tbl">
              <table>
                <thead>
                  <tr>
                    <th>種類</th>
                    <th>特徴</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <strong>活動性（active）トリガーポイント</strong>
                    </td>
                    <td>何もしなくても持続的な痛みの訴えを引き起こす</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>潜在性（latent）トリガーポイント</strong>
                    </td>
                    <td>用手的な触診・圧迫の際にのみ痛みを生じる</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="alert a-warn">
              <div className="alert-i">⚠️</div>
              <div>
                <strong>科学的な論争点：</strong>{" "}
                国際頭痛分類（ICHD-3）自体が、いわゆる「トリガーポイント」と筋膜性疼痛の関係には議論があり、想定されるトリガーポイントを再現性をもって示すことは難しく、治療反応にもばらつきがあると明記しています。トリガーポイントの検出は現在も主に用手触診に依存しており、施術者間の一致率にも課題が指摘されています。本ページの内容は、こうした論争を踏まえた上での情報提供です。
              </div>
            </div>
          </section>

          {/* ====================================================== SECTION 2 */}
          <section id="s2" className="sec">
            <div className="sec-hd">
              <div className="sec-num">2</div>
              <h1 className="sec-title">国際頭痛分類（ICHD-3）における位置づけ</h1>
            </div>

            <p>
              頭痛の診断は自己判断で行うものではなく、国際頭痛学会（IHS）の国際頭痛分類第3版（ICHD-3）に基づき、医療専門家が問診・診察を通じて行うものです。トリガーポイント・筋膜性疼痛は、主に次の2つの診断カテゴリーと関連づけて議論されています。
            </p>

            <div className="mmd">
              <div className="mmd-lbl">フローチャート — 頭痛分類とトリガーポイントの位置づけ</div>
              <MermaidDiagram
                themeVariables={MTP_MERMAID_THEME}
                chart={`flowchart TD
    A["繰り返す頭痛"] --> B{"一次性頭痛か二次性頭痛か\\nを鑑別 (ICHD-3, 医師が実施)"}
    B -->|"一次性"| C["2. 緊張型頭痛 (TTH)"]
    B -->|"二次性・頸部由来を疑う"| D["11.2.1 頸原性頭痛"]
    C --> E{"頭蓋周囲筋の圧痛はあるか"}
    E -->|"あり"| F["頭蓋周囲圧痛を伴う緊張型頭痛"]
    E -->|"なし"| G["頭蓋周囲圧痛を伴わない緊張型頭痛"]
    D --> H["付録診断 A11.2.5: 頸部筋膜性疼痛による頭痛 (研究段階・議論あり)"]
    F -. 深く関連 .-> H`}
              />
            </div>

            <h2>2-1. 緊張型頭痛（Tension-Type Headache, TTH）</h2>
            <p>
              ICHD-3では、緊張型頭痛は頭蓋周囲の圧痛（pericranial
              tenderness）の有無によってさらにサブタイプ分類されています。この圧痛は頭痛の強さや頻度が増すほど強くなる傾向があるとされ、用手的な触診によって簡便に検出・記録できるとされています。
            </p>

            <h2>2-2. 頸原性頭痛（Cervicogenic Headache）</h2>
            <p>
              頸椎やその周囲軟部組織の障害によって生じる頭痛です。診断には、頭痛が頸部の障害の発症と時間的に関連していること、頸部の障害の改善と並行して頭痛も改善すること、頸部可動域の低下と誘発手技での増悪、診断的ブロックによる頭痛の消失、といった項目のうち少なくとも2つによる「因果関係の証拠」が求められます。
            </p>

            <div className="alert a-info">
              <div className="alert-i">📎</div>
              <div>
                <strong>付録診断 A11.2.5：</strong>{" "}
                ICHD-3の付録には「頸部筋肉における筋膜性疼痛（トリガーポイントを含む）が原因である頭痛」の診断基準が試験的に収載されています。ただしこれは、この種の頭痛が緊張型頭痛よりも他の頸原性頭痛に近いというさらなるエビデンスの蓄積を待つ
                <strong>研究段階の診断</strong>であり、正式な診断カテゴリーではありません。
              </div>
            </div>
          </section>

          {/* ====================================================== SECTION 3 */}
          <section id="s3" className="sec">
            <div className="sec-hd">
              <div className="sec-num">3</div>
              <h1 className="sec-title">病態メカニズム：なぜ関連しうるのか</h1>
            </div>

            <p>トリガーポイントと頭痛の関係については、大きく2つの仮説モデルが議論されています。</p>

            <div className="mmd">
              <div className="mmd-lbl">フローチャート — ボトムアップ仮説とトップダウン仮説</div>
              <MermaidDiagram
                themeVariables={MTP_MERMAID_THEME}
                chart={`flowchart LR
    subgraph BU["ボトムアップ仮説"]
        M1["筋膜トリガーポイント"] --> N1["末梢侵害受容の増加"] --> S1["中枢感作"] --> P1["痛覚閾値の低下・頭痛の慢性化"]
    end
    subgraph TD2["トップダウン仮説"]
        S2["中枢感作が先行"] --> M2["結果としてトリガーポイントが形成"]
    end`}
              />
            </div>

            <p>
              緊張型頭痛においては、活動性トリガーポイントを押すと、患者が普段感じている頭痛パターンが再現されることが複数の研究で示されています。また、活動性トリガーポイントを持つ患者は、より広範囲の痛覚過敏（圧痛閾値の低下）を示すことがあり、これは中枢感作への関与を示唆すると考えられています。
            </p>

            <p>
              片頭痛については、活動性トリガーポイントの触診が片頭痛発作を誘発しうることが報告されていますが、トリガーポイントの数が発作頻度や強度と関連するかについては研究間で結果が一致していません。
            </p>

            <div className="alert a-purple">
              <div className="alert-i">🔎</div>
              <div>
                <strong>ポイント：</strong>{" "}
                トリガーポイントは頭痛の「原因」なのか、それとも慢性化の「結果として蓄積したもの」なのかは、現時点の国際的なエビデンスでも結論が出ていません。実際、思春期に比べ成人で活動性トリガーポイントの数が多いことは、頭痛パラメーターとの明確な関連がないまま報告されており、蓄積の結果である可能性も示唆されています。
              </div>
            </div>
          </section>

          {/* ====================================================== SECTION 4 */}
          <section id="s4" className="sec">
            <div className="sec-hd">
              <div className="sec-num">4</div>
              <h1 className="sec-title">代表的な筋肉と関連痛パターン</h1>
            </div>

            <p>
              トリガーポイントは、押された場所とは離れた部位に痛みを感じさせる「関連痛（referred
              pain）」を引き起こすことが特徴です。頭頸部の中でも研究の蓄積が多い筋肉は以下の通りです。
            </p>

            <div className="tbl">
              <table>
                <thead>
                  <tr>
                    <th>筋肉</th>
                    <th>主に研究された関連痛の広がり方</th>
                    <th>関連する頭痛タイプ</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <strong>僧帽筋上部</strong>（upper trapezius）
                    </td>
                    <td>側頭部・耳の後ろ・後頭部にかけての痛み</td>
                    <td>緊張型頭痛・片頭痛</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>胸鎖乳突筋</strong>（sternocleidomastoid）
                    </td>
                    <td>前頭部・眼窩周囲・頭頂部</td>
                    <td>片頭痛・頸原性頭痛</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>側頭筋</strong>（temporalis）
                    </td>
                    <td>こめかみ・上顎・眉毛周辺</td>
                    <td>緊張型頭痛</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>後頭下筋群</strong>（suboccipital muscles）
                    </td>
                    <td>後頭部から頭頂部（時に眼窩後方まで）</td>
                    <td>緊張型頭痛・頸原性頭痛</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="alert a-info">
              <div className="alert-i">ℹ️</div>
              <div>
                これらの知見は触診・関連痛誘発試験を用いた臨床研究に基づくものであり、
                <strong>画像診断によって客観的に「見える」ものではありません</strong>
                。トリガーポイントの検出は現在も主に用手触診に依存しており、施術者間で一致率が低いという再現性の課題があります。超音波エラストグラフィーなど新しい画像評価法も研究段階にあります。
              </div>
            </div>
          </section>

          {/* ====================================================== SECTION 5 */}
          <section id="s5" className="sec">
            <div className="sec-hd">
              <div className="sec-num">5</div>
              <h1 className="sec-title">セルフチェックの考え方と危険信号（SNNOOP10）</h1>
            </div>

            <p>
              以下は<strong>理解のための思考の流れ</strong>
              であり、自己診断の手順ではありません。危険信号がある場合は、迷わず受診してください。
            </p>

            <div className="mmd">
              <div className="mmd-lbl">フローチャート — 頭痛への向き合い方（教育目的）</div>
              <MermaidDiagram
                themeVariables={MTP_MERMAID_THEME}
                chart={`flowchart TD
    Start["頭痛が繰り返し起こる"] --> RF{"SNNOOP10に該当する危険信号があるか"}
    RF -->|"該当あり"| ER["速やかに医療機関を受診"]
    RF -->|"該当なし"| Pattern{"両側性・圧迫感・首肩のこりを伴うか"}
    Pattern -->|"はい"| Palp["僧帽筋上部・側頭筋・胸鎖乳突筋・後頭下筋群周辺が張っていないか意識してみる"]
    Pattern -->|"いいえ"| Other["他の頭痛タイプの可能性 → 医師に相談"]
    Palp --> Tender{"押すといつもの頭痛に似た痛みが再現されるか"}
    Tender -->|"再現される"| Active["活動性トリガーポイントの関与が疑われる状態"]
    Tender -->|"局所の圧痛のみ"| Latent["潜在性トリガーポイントの可能性"]
    Active --> Consult["医師・理学療法士など専門家に相談"]
    Latent --> Consult`}
              />
            </div>

            <h2>見逃してはいけない危険信号（SNNOOP10）</h2>
            <p>
              国際的に使われる二次性頭痛のスクリーニングリスト <strong>SNNOOP10</strong>{" "}
              は、以下のような項目に当てはまる場合、単なる一次性頭痛ではない可能性を考慮すべきとしています。
            </p>

            <div className="snoop-grid">
              <div className="sn">
                <div className="sn-letter">S</div>
                <div className="sn-title">全身症状</div>
                <div className="sn-symp">発熱、体重減少、免疫抑制状態を伴う頭痛</div>
                <div className="sn-dx">要 受診</div>
              </div>
              <div className="sn">
                <div className="sn-letter">N</div>
                <div className="sn-title">神経学的異常</div>
                <div className="sn-symp">しびれ、脱力、意識障害、ろれつが回らない等</div>
                <div className="sn-dx">要 受診</div>
              </div>
              <div className="sn">
                <div className="sn-letter">N</div>
                <div className="sn-title">腫瘍の既往（Neoplasm）</div>
                <div className="sn-symp">悪性腫瘍の既往がある方の新規・変化した頭痛</div>
                <div className="sn-dx">要 受診</div>
              </div>
              <div className="sn">
                <div className="sn-letter">O</div>
                <div className="sn-title">突然の発症（Onset）</div>
                <div className="sn-symp">
                  「今までで最悪」の頭痛が数秒〜数分で最悪の強さに達する
                </div>
                <div className="sn-dx">要 緊急受診</div>
              </div>
              <div className="sn">
                <div className="sn-letter">O</div>
                <div className="sn-title">高齢発症（Older age）</div>
                <div className="sn-symp">65歳以降で初めて経験する頭痛</div>
                <div className="sn-dx">要 受診</div>
              </div>
              <div className="sn">
                <div className="sn-letter">P</div>
                <div className="sn-title">パターンの変化</div>
                <div className="sn-symp">頭痛の性質・頻度・強さが急に変わった、新規発症</div>
                <div className="sn-dx">要 受診</div>
              </div>
              <div className="sn">
                <div className="sn-letter">+10</div>
                <div className="sn-title">その他の項目</div>
                <div className="sn-symp">
                  体位による変化、咳・力みによる誘発、乳頭浮腫、進行性の経過、妊娠・産褥期、自律神経症状を伴う眼の痛み、外傷後の発症、免疫系疾患の既往、鎮痛薬の使用過多や新規薬剤開始時の頭痛
                </div>
                <div className="sn-dx">要 受診</div>
              </div>
            </div>

            <div className="alert a-danger">
              <div className="alert-i">🚨</div>
              <div>
                これらに一つでも該当する場合は、トリガーポイントの自己評価を試みるより先に、
                <strong>速やかに医療機関を受診</strong>してください。
              </div>
            </div>
          </section>

          {/* ====================================================== SECTION 6 */}
          <section id="s6" className="sec">
            <div className="sec-hd">
              <div className="sec-num">6</div>
              <h1 className="sec-title">主な介入法とエビデンスの質（概観）</h1>
            </div>

            <p>
              以下は学術文献に基づく<strong>一般的な治療カテゴリーの紹介</strong>
              であり、特定の製品・術式の優劣を主張するものではありません。
              実際にどの方法が適切かは、医師・理学療法士等が個別に判断します。エビデンスの質は相対表現で示します。
            </p>

            <div className="qr-grid">
              <div className="qr">
                <div className="qr-t">凡例</div>
                <p>
                  <span className="bA">bA</span> 質の高いエビデンスで有効性の指摘あり
                </p>
                <p>
                  <span className="bB">bB</span> 中等度のエビデンス
                </p>
                <p>
                  <span className="bC">bC</span> 限定的・質の低いエビデンス
                </p>
                <p>
                  <span className="bU">bU</span> 結論が定まらない
                </p>
              </div>
            </div>

            <div className="tbl">
              <table>
                <thead>
                  <tr>
                    <th>介入カテゴリー</th>
                    <th>主な対象</th>
                    <th>エビデンス</th>
                    <th>代表的知見</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>徒手療法＋運動療法（関節モビライゼーション等）</td>
                    <td>頸原性頭痛</td>
                    <td>
                      <span className="bB">bB</span>
                    </td>
                    <td>
                      約20件・1,500例規模のRCTを対象とした系統的レビューで、短期的な頭痛頻度・強度の中等度〜大きな減少が報告
                    </td>
                  </tr>
                  <tr>
                    <td>
                      トリガーポイント指向の徒手療法（虚血性圧迫・ポジショナルリリース・マッサージ等）
                    </td>
                    <td>緊張型頭痛・片頭痛</td>
                    <td>
                      <span className="bC">bC</span>
                    </td>
                    <td>
                      メタ解析で発作頻度・強度・持続時間の統計的に有意な減少が示されたが、全体のエビデンスの質は非常に低いと評価
                    </td>
                  </tr>
                  <tr>
                    <td>ドライニードリング</td>
                    <td>緊張型頭痛</td>
                    <td>
                      <span className="bB">bB</span> / <span className="bC">bC</span>
                    </td>
                    <td>複数のRCTで活動性トリガーポイント数と頭痛強度の減少が報告</td>
                  </tr>
                  <tr>
                    <td>鍼治療（acupuncture）</td>
                    <td>月15日以上の頻回な緊張型頭痛</td>
                    <td>
                      <span className="bB">bB</span>
                    </td>
                    <td>
                      英国NICEガイドラインでは、頻回な緊張型頭痛に対して最大10回程度のコースが選択肢として挙げられている
                    </td>
                  </tr>
                  <tr>
                    <td>局所麻酔薬のトリガーポイント注射</td>
                    <td>緊張型頭痛</td>
                    <td>
                      <span className="bC">bC</span>
                    </td>
                    <td>
                      プラセボ対照試験で頻度・強度の減少が報告されているが、医師のみが実施できる医療行為
                    </td>
                  </tr>
                  <tr>
                    <td>ボツリヌス毒素注射</td>
                    <td>慢性緊張型頭痛</td>
                    <td>
                      <span className="bU">bU</span>
                    </td>
                    <td>メタ解析では緊張型頭痛への有効性は支持されていない</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="alert a-danger">
              <div className="alert-i">🚫</div>
              <div>
                <strong>国内未承認：</strong>{" "}
                ボツリヌス毒素注射は、日本国内では頭痛（片頭痛・緊張型頭痛のいずれも）に対する承認された適応ではありません（保険適用外・自費診療）。
                米国等での承認は慢性片頭痛に限られており、緊張型頭痛への使用を裏づける質の高い根拠は確立していません。
                本ページはこの治療法の使用を推奨するものではありません。
              </div>
            </div>

            <div className="alert a-info">
              <div className="alert-i">💊</div>
              <div>
                <strong>薬機法・医療広告に関する記述方針：</strong>{" "}
                本ページでは、一般に用いられる介入の<strong>カテゴリー名（一般名・手法名）</strong>
                のみを紹介し、
                個別の用法・用量・実施回数・強さの処方は記載しません。具体的な適用は必ず医師・薬剤師・理学療法士等の専門家にご相談ください。
              </div>
            </div>
          </section>

          {/* ====================================================== SECTION 7 */}
          <section id="s7" className="sec">
            <div className="sec-hd">
              <div className="sec-num">7</div>
              <h1 className="sec-title">一般的なセルフケアの方向性</h1>
            </div>

            <div className="alert a-warn">
              <div className="alert-i">⚠️</div>
              <div>
                自己判断での強い刺激（強い圧迫や長時間のマッサージなど）は、かえって症状を悪化させる可能性があります。
              </div>
            </div>

            <div className="card">
              <p>一般的に語られる生活習慣的な方向性としては、次のようなものが挙げられます。</p>
              <ul>
                <li>姿勢（特に前方頭位姿勢）の見直し</li>
                <li>
                  首・肩まわりの過度な緊張を招く生活習慣（長時間のデスクワーク、スマートフォンの見過ぎ等）の調整
                </li>
                <li>十分な睡眠とストレス管理</li>
              </ul>
            </div>

            <div className="alert a-info">
              <div className="alert-i">ℹ️</div>
              <div>
                具体的なストレッチの回数・強度・頻度などの処方は個別性が高く、
                <strong>本ページでは提示しません</strong>。
                自己流の判断で継続するのではなく、症状が続く場合は医師・理学療法士に相談し、その方の状態に合った指導を受けてください。
              </div>
            </div>
          </section>

          {/* ====================================================== SECTION 8 */}
          <section id="s8" className="sec">
            <div className="sec-hd">
              <div className="sec-num">8</div>
              <h1 className="sec-title">受診 of 目安・よくある誤解</h1>
            </div>

            <div className="qr-grid">
              <div className="qr">
                <div className="qr-t">受診の目安</div>
                <ul>
                  <li>
                    SNNOOP10に該当する項目がある → <span className="tR">速やかに受診</span>
                  </li>
                  <li>頭痛の性質が普段と明らかに違う、悪化している → 受診して相談</li>
                  <li>月15日以上頭痛がある（薬物乱用頭痛のリスク） → 受診して相談</li>
                  <li>市 市販薬で十分にコントロールできない → 受診して相談</li>
                </ul>
              </div>
              <div className="qr">
                <div className="qr-t">診断の基本姿勢</div>
                <p>
                  頭痛の診断・治療方針の決定は、問診と身体診察が最も重要とされています。
                  一次性頭痛は除外診断ではなく、支持的な臨床所見に基づいて診断されるべきものとされています。
                </p>
              </div>
            </div>

            <h2>よくある誤解</h2>
            <div className="tbl">
              <table>
                <thead>
                  <tr>
                    <th>誤解</th>
                    <th>実際のところ</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>トリガーポイントは画像で簡単に確認できる</td>
                    <td>現状、主な評価法は用手触診であり、施術者間での一致率に課題がある</td>
                  </tr>
                  <tr>
                    <td>トリガーポイント治療をすれば頭痛が必ず治る</td>
                    <td>
                      効果を示す研究がある一方、質の高いプラセボ対照試験は少なく、効果は個人差が大きい
                    </td>
                  </tr>
                  <tr>
                    <td>マッサージは強ければ強いほど良い</td>
                    <td>過度な刺激は逆効果になりうる。強さ・方法は専門家の判断に委ねるべき</td>
                  </tr>
                  <tr>
                    <td>トリガーポイントがあれば必ず「頸部由来の頭痛」と診断できる</td>
                    <td>
                      診断はICHD-3の複数の基準を満たす必要があり、トリガーポイントの存在だけでは診断確定にならない
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* ====================================================== SECTION 9 */}
          <section id="s9" className="sec">
            <div className="sec-hd">
              <div className="sec-num">9</div>
              <h1 className="sec-title">参考文献・情報源</h1>
            </div>

            <p>
              一次情報（診断基準・原著論文・公式ガイドライン）を優先し、要約サイトは補助的にも使用していません。
            </p>

            <div className="src-grid">
              <div className="src">
                <div className="src-org">ICHD-3 / IHS</div>
                <div className="src-t">11.2.1 Cervicogenic headache（頸原性頭痛の診断基準）</div>
                <div className="src-url">
                  <Ext href="https://ichd-3.org/11-headache-or-facial-pain-attributed-to-disorder-of-the-cranium-neck-eyes-ears-nose-sinuses-teeth-mouth-or-other-facial-or-cervical-structure/11-2-headache-attributed-to-disorder-of-the-neck/11-2-1-cervicogenic-headache/">
                    ichd-3.org — 11.2.1 Cervicogenic headache
                  </Ext>
                </div>
              </div>
              <div className="src">
                <div className="src-org">ICHD-3 Appendix / IHS</div>
                <div className="src-t">A11.2.5 Headache attributed to cervical myofascial pain</div>
                <div className="src-url">
                  <Ext href="https://ichd-3.org/appendix/a11-headache-or-facial-pain-attributed-to-disorder-of-the-cranium-neck-eyes-ears-nose-sinuses-teeth-mouth-or-other-facial-or-cervical-structure/a11-2-headache-attributed-to-disorder-of-the-neck/a11-2-5-headache-attributed-to-cervical-myofascial-pain/">
                    ichd-3.org — Appendix A11.2.5
                  </Ext>
                </div>
              </div>
              <div className="src">
                <div className="src-org">ICHD-3 / IHS</div>
                <div className="src-t">2. Tension-type headache（頭蓋周囲圧痛の総論）</div>
                <div className="src-url">
                  <Ext href="https://ichd-3.org/2-tension-type-headache/">
                    ichd-3.org — 2. Tension-type headache
                  </Ext>
                </div>
              </div>
              <div className="src">
                <div className="src-org">The Journal of Headache and Pain</div>
                <div className="src-t">
                  Do TP et al. Myofascial trigger points in migraine and tension-type headache
                  (2018)
                </div>
                <div className="src-url">
                  <Ext href="https://link.springer.com/article/10.1186/s10194-018-0913-8">
                    link.springer.com — 10.1186/s10194-018-0913-8
                  </Ext>
                </div>
              </div>
              <div className="src">
                <div className="src-org">PMC / 系統的レビュー</div>
                <div className="src-t">
                  Effectiveness of Trigger Point Manual Treatment on Primary Headaches: Systematic
                  Review and Meta-Analysis
                </div>
                <div className="src-url">
                  <Ext href="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC5928320/">
                    ncbi.nlm.nih.gov — PMC5928320
                  </Ext>
                </div>
              </div>
              <div className="src">
                <div className="src-org">PMC / 系統的レビュー</div>
                <div className="src-t">
                  Trigger Point Therapy Techniques for Tension Headaches: A Systematic Review
                  (Healthcare, 2024)
                </div>
                <div className="src-url">
                  <Ext href="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC11431695/">
                    ncbi.nlm.nih.gov — PMC11431695
                  </Ext>
                </div>
              </div>
              <div className="src">
                <div className="src-org">NICE（英国）</div>
                <div className="src-t">CG150 — Headaches in over 12s: diagnosis and management</div>
                <div className="src-url">
                  <Ext href="https://www.nice.org.uk/guidance/cg150">
                    nice.org.uk/guidance/cg150
                  </Ext>
                </div>
              </div>
              <div className="src">
                <div className="src-org">Neurology / IHS</div>
                <div className="src-t">
                  Do TP, Remmers A, Schytz HW et al. Red and orange flags for secondary headaches:
                  SNNOOP10 list (2019)
                </div>
                <div className="src-url">
                  <Ext href="https://researchprofiles.ku.dk/en/publications/red-and-orange-flags-for-secondary-headaches-in-clinical-practice/">
                    researchprofiles.ku.dk — SNNOOP10
                  </Ext>
                </div>
              </div>
              <div className="src">
                <div className="src-org">日本頭痛学会・日本神経学会・日本神経治療学会</div>
                <div className="src-t">頭痛の診療ガイドライン2021（国内標準治療の背景として）</div>
                <div className="src-url">
                  <Ext href="https://www.jhsnet.net/pdf/guideline_2021.pdf">
                    jhsnet.net/pdf/guideline_2021.pdf
                  </Ext>
                </div>
              </div>
              <div className="src">
                <div className="src-org">日本神経学会</div>
                <div className="src-t">頭痛診療ガイドライン2021 掲載ページ</div>
                <div className="src-url">
                  <Ext href="https://www.neurology-jp.org/guidelinem/headache_medical_2021.html">
                    neurology-jp.org — 頭痛診療ガイドライン2021
                  </Ext>
                </div>
              </div>
            </div>

            <h2>監視すべき権威ソース</h2>
            <p>
              本シリーズの情報収集方針。信頼度の高い順に、
              <strong>一次情報（ガイドライン・原著）を優先</strong>
              し、二次情報（要約サイト）は補助とする。
            </p>

            <div className="tbl">
              <table>
                <thead>
                  <tr>
                    <th>区分</th>
                    <th>ソース</th>
                    <th>用途</th>
                    <th>監視観点</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>疾患分類</td>
                    <td>
                      <strong>ICHD-3</strong>（国際頭痛分類 第3版、IHS）
                    </td>
                    <td>全疾患ページの診断基準の根拠</td>
                    <td>改訂（ICHD-4）公表</td>
                  </tr>
                  <tr>
                    <td>国内ガイドライン</td>
                    <td>
                      <strong>日本頭痛学会「頭痛の診療ガイドライン」</strong>
                    </td>
                    <td>国内標準治療・用語</td>
                    <td>改訂版の発行</td>
                  </tr>
                  <tr>
                    <td>国際ガイドライン</td>
                    <td>
                      <strong>AHS（米国頭痛学会）/ EHF（欧州頭痛連合）/ NICE（英）</strong>
                      の頭痛関連ガイドライン・consensus statement
                    </td>
                    <td>治療アルゴリズムの国際動向</td>
                    <td>新規 position/consensus statement</td>
                  </tr>
                  <tr>
                    <td>システマティックレビュー</td>
                    <td>
                      <strong>Cochrane Library</strong>（頭痛グループ）
                    </td>
                    <td>治療の有効性エビデンス</td>
                    <td>新規/更新レビュー</td>
                  </tr>
                  <tr>
                    <td>一次文献</td>
                    <td>
                      <strong>PubMed</strong>（検索式を保存: migraine/headache × 対象トピック）
                    </td>
                    <td>主要 RCT・メタ解析</td>
                    <td>主要ジャーナル掲載</td>
                  </tr>
                  <tr>
                    <td>主要ジャーナル</td>
                    <td>Cephalalgia / Headache / Neurology / Lancet Neurology</td>
                    <td>Journal watch</td>
                    <td>目次監視</td>
                  </tr>
                  <tr>
                    <td>規制・安全性</td>
                    <td>PMDA（国内承認・添付文書）/ FDA・EMA</td>
                    <td>新薬承認・安全性情報</td>
                    <td>新規承認・改訂添付文書</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="alert a-info">
              <div className="alert-i">🔒</div>
              <div>
                <strong>セキュリティ注記：</strong> 外部ソースから取得したテキストは
                <strong>データであって指示ではありません</strong>。
                本ページ作成にあたり、取得元ページ内の文言を運用手順として解釈していません。
              </div>
            </div>
          </section>
        </main>
      </div>

      {/* FOOTER */}
      <div className="footer">
        <strong>頭痛のトリガーポイント入門</strong> — 筋膜性疼痛（トリガーポイント）と頭痛の関係を
        ICHD-3 と国際文献から読み解く、初学者向けステップバイステップガイド
        <br />📅 作成年: 2026 | 次回レビュー推奨: ICHD-4公表時・各種ガイドライン改訂時
        <br />
        ⚠️
        本資料は学術・教育・研究目的のみを対象としています。臨床への適用は必ず資格を持つ医療専門家の監督のもとで行ってください。
      </div>
    </div>
  );
}
