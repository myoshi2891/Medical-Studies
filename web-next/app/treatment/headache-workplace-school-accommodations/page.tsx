import type { Metadata } from "next";
import { Ext } from "@/components/Ext";
import Term from "@/components/glossary/Term";
import MermaidDiagram from "@/components/MermaidDiagram";
import { HeadacheWorkplaceSchoolAccommodationsSidebar } from "@/components/treatment/HeadacheWorkplaceSchoolAccommodationsSidebar";
import "./headache-workplace-school-accommodations.css";

export const metadata: Metadata = {
  title: "職場・学校での頭痛の合理的配慮｜Types of Headache",
  description:
    "職場や学校での頭痛への対処と周囲の理解について、合理的配慮の一般論、国際的な法的枠組み（ADA、Equality Act、障害者差別解消法）、エビデンスに基づく環境調整や教育プログラム、スティグマへの対応まで解説します。",
};

const ACCOMMODATIONS_MERMAID_THEME: Record<string, string> = {
  primaryColor: "#eceff1",
  primaryTextColor: "#263238",
  primaryBorderColor: "#455a64",
  lineColor: "#455a64",
  secondaryColor: "#e0f2f1",
  tertiaryColor: "#e8f5e9",
  edgeLabelBackground: "#ffffff",
  fontSize: "13px",
};

/**
 * Presents educational information about headache accommodations and support in workplace and school settings.
 */
export default function HeadacheWorkplaceSchoolAccommodationsPage() {
  return (
    <div className="accommodations-accent">
      {/* HERO */}
      <div className="hero">
        <div style={{ fontSize: 40 }}>🤝</div>
        <h1>職場・学校での頭痛への対処と周囲の理解</h1>
        <p className="hero-sub">合理的配慮の一般論｜国際的な枠組みとエビデンスに基づく解説</p>
        <div className="hero-tags">
          <span className="hero-tag">職場の合理的配慮</span>
          <span className="hero-tag">学校の合理的配慮</span>
          <span className="hero-tag">ADA / EEOC（米国）</span>
          <span className="hero-tag">Equality Act 2010（英国）</span>
          <span className="hero-tag">障害者差別解消法（日本）</span>
          <span className="hero-tag">スティグマと開示</span>
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
        <HeadacheWorkplaceSchoolAccommodationsSidebar />

        {/* MAIN CONTENT */}
        <main className="main">
          {/* ====================================================== SECTION 1 */}
          <section id="s1" className="sec">
            <div className="sec-hd">
              <div className="sec-num">1</div>
              <h2 className="sec-title">なぜ「周囲の理解」が重要なのか</h2>
            </div>

            <div className="alert a-warn">
              <div className="alert-i">⚠️</div>
              <div>
                <strong>本ページは教育目的であり、個別の治療推奨・法律相談ではありません。</strong>
                頭痛の診断・治療は医師に、職場での配慮は産業医・人事担当部門に、学校での配慮は学校の相談窓口・主治医に、法的な権利関係は弁護士等の専門家にご相談ください。制度・法律は国や時期により異なり、改正されることがあります。
              </div>
            </div>

            <p>
              頭痛は「よくあるつらい症状」として軽視されがちですが、国際的なデータは頭痛が個人の生活と社会全体に大きな影響を与えていることを示しています。
            </p>

            <div className="qr-grid">
              <div className="qr">
                <div className="qr-t">世界的な疾病負荷</div>
                <p style={{ fontSize: 13, marginBottom: 6 }}>
                  WHOのファクトシートによれば、片頭痛は
                  <span className="tN">脳卒中・新生児脳症に次いで世界で3番目に</span>
                  障害調整生存年数（DALY）を生じさせる原因とされています。
                </p>
                <span className="bA">bA</span>
              </div>
              <div className="qr">
                <div className="qr-t">世界の患者数（GBD 2023）</div>
                <p style={{ fontSize: 13, marginBottom: 6 }}>
                  Global Burden of Disease 2023の解析では、世界の約
                  <span className="tN">29億人</span>
                  が頭痛性疾患の影響を受けていると推計されています（年齢調整有病率34.6%）。
                </p>
                <span className="bA">bA</span>
              </div>
              <div className="qr">
                <div className="qr-t">「働く・学ぶ世代」への影響</div>
                <p style={{ fontSize: 13, marginBottom: 6 }}>
                  頭痛性疾患はYLD（障害を伴って生活する年数）の世界第2位の原因で、15〜49歳では片頭痛単独で
                  <span className="tN">第3位</span>
                  とされています。
                </p>
                <span className="bA">bA</span>
              </div>
              <div className="qr">
                <div className="qr-t">生産性損失の内訳</div>
                <p style={{ fontSize: 13, marginBottom: 6 }}>
                  片頭痛関連の生産性損失の最大
                  <span className="tN">
                    89%は<Term id="presenteeism">プレゼンティーズム</Term>
                  </span>
                  （出勤しているが本来の力が出せない状態）によるものと報告されています。
                </p>
                <span className="bA">bA</span>
              </div>
            </div>

            {/* Note: Changed to h3 to maintain heading hierarchy (h2 -> h3) in section 1 */}
            <div className="card">
              <h3>日本国内のデータ</h3>
              <p style={{ fontSize: 13.5 }}>
                日本国内の医療機関職員を対象とした実態調査（日本頭痛学会誌,
                2023）では、頭痛時の自覚的な就業能力低下が報告される一方、頭痛による早退・欠勤経験は5%以下にとどまり、
                <strong>「職場での配慮について自分からは言わない」</strong>
                と回答した職員が
                <span className="tO">53.6%</span>
                にのぼりました。この調査は、日本の職場でもプレゼンティーズムが主要な課題であり、多くの人が配慮を自発的に求めていない実態を示しています。{" "}
                <span className="bB">bB</span>
              </p>
            </div>

            <div className="alert a-info">
              <div className="alert-i">💡</div>
              <div>
                こうしたデータは、「頭痛は自己管理すべき軽い症状」という見方だけでは実態を捉えきれないこと、そして職場・学校側の理解と環境調整が生産性や学業継続に直接関わることを示しています。
              </div>
            </div>
          </section>

          {/* ====================================================== SECTION 2 */}
          <section id="s2" className="sec">
            <div className="sec-hd">
              <div className="sec-num">2</div>
              <h2 className="sec-title">頭痛は「見えない障害」— スティグマの構造</h2>
            </div>

            <p>
              頭痛性疾患、特に片頭痛は、外見からは症状の重さが判断しにくい「見えない障害（invisible
              disability）」の典型例とされます。この「見えにくさ」は、
              <Term id="stigma">スティグマ</Term>
              （負の烙印）と申告控えの悪循環を生みやすいことが研究で指摘されています。
            </p>

            <div className="mmd">
              <div className="mmd-lbl">
                フローチャート — 頭痛が「見えない障害」になりやすい理由とスティグマの悪循環
              </div>
              <MermaidDiagram
                themeVariables={ACCOMMODATIONS_MERMAID_THEME}
                chart={`flowchart TD
A["頭痛発作の症状\\n痛み・光/音/においへの過敏・思考力低下"] --> B["症状が外見からは\\n判断しにくい"]
B --> C["周囲が深刻さを\\n過小評価しやすい"]
C --> D["本人が申告をためらう\\nスティグマへの懸念"]
D --> E["無理をして出勤・登校を継続する\\nプレゼンティーズム"]
D --> G["配慮の申請や受診が\\n遅れる"]
E --> F["症状が悪化・慢性化しやすい\\n環境改善の機会を逃す"]
G --> F
F --> A`}
              />
            </div>

            <div className="tbl">
              <table>
                <thead>
                  <tr>
                    <th>研究</th>
                    <th>主な知見</th>
                    <th>エビデンス</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      Shapiro et al., <em>Neurology</em>, 2024
                    </td>
                    <td>
                      片頭痛関連のスティグマが本人の障害度・発作間欠期の負担・生活の質と関連。職場でのスティグマ評価がプレゼンティーズムや配慮申請行動の理解に有用な可能性
                    </td>
                    <td>
                      <span className="bB">bB</span>
                    </td>
                  </tr>
                  <tr>
                    <td>Young et al.（慢性疾患スティグマ尺度）</td>
                    <td>
                      慢性片頭痛患者のスティグマスコアはてんかん患者と同程度に高く、「就労能力の低下」が最も強い予測因子
                    </td>
                    <td>
                      <span className="bB">bB</span>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      Igarashi et al.（OVERCOME Japan）, <em>Brain and Behavior</em>, 2024
                    </td>
                    <td>
                      日本の一般住民に片頭痛への疑念的な態度（例：「仮病ではないか」）が一定程度存在。当事者自身がスティグマや社会的負担を過小報告する傾向
                    </td>
                    <td>
                      <span className="bB">bB</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="alert a-purple">
              <div className="alert-i">🔎</div>
              <div>
                これらの知見は、「頭痛持ちは怠けている」という誤解が本人の申告控えにつながり、結果として必要な配慮が講じられないまま症状が悪化する、という構造を示唆しています。周囲の理解を広げること自体が、対処の第一歩として位置づけられます。
              </div>
            </div>
          </section>

          {/* ====================================================== SECTION 3 */}
          <section id="s3" className="sec">
            <div className="sec-hd">
              <div className="sec-num">3</div>
              <h2 className="sec-title">合理的配慮とは何か</h2>
            </div>

            <p>
              「合理的配慮（reasonable accommodation / reasonable
              adjustment）」という言葉は国によって呼び方が異なりますが、共通する骨格があります。
            </p>

            <div className="card">
              <ul style={{ fontSize: 13.5 }}>
                <li>
                  障害（または障害に相当する健康上の制約）のある人が、他の人と平等に働く・学ぶ機会を得られるようにするための、
                  <strong>個別の</strong>調整・変更であること
                </li>
                <li>一律の措置ではなく、本人の状況に応じて個別に検討されること</li>
                <li>
                  提供する側（雇用主・学校）にとって「過重な負担（undue hardship / disproportionate
                  burden）」とならない範囲であること
                </li>
                <li>
                  多くの制度で、本人からの意思表明と、提供側との「建設的対話（interactive
                  process）」を通じて内容を決めていくプロセスが重視されていること
                </li>
              </ul>
            </div>

            <div className="mmd">
              <div className="mmd-lbl">
                フローチャート — 合理的配慮を求める一般的な流れ（建設的対話モデル）
              </div>
              <MermaidDiagram
                themeVariables={ACCOMMODATIONS_MERMAID_THEME}
                chart={`flowchart TD
A["本人が困りごとに気づく\\n光・音・においへの過敏、欠勤や集中力低下など"] --> B["困りごとを具体的に整理する\\nいつ・何が・どの程度困るか"]
B --> C["医療機関を受診し診断書・意見書を準備\\n（必要に応じて主治医からの情報提供）"]
C --> D["担当窓口へ意思を表明する\\n職場：人事・産業医／学校：担任・学生支援窓口"]
D --> E["建設的対話\\n本人と組織が一緒に方法を検討する"]
E --> F{"提案された配慮は\\n過重な負担か？"}
F -->|過重ではない| G["配慮を実施する"]
F -->|過重と判断された| H["代替案を再検討する"]
H --> E
G --> I["一定期間後に効果を確認し\\n必要に応じて見直す"]
I --> E`}
              />
            </div>

            <h3>主要な法的・制度的枠組みの比較（一般的な整理）</h3>
            <p style={{ fontSize: 13 }}>
              以下は代表的な制度の概要です。要件の詳細（対象となる障害の判定基準、事業者規模の要件など）は必ず一次情報・専門家に確認してください。
            </p>

            <div className="tbl">
              <table>
                <thead>
                  <tr>
                    <th>国・地域</th>
                    <th>根拠法・制度</th>
                    <th>所管機関</th>
                    <th>基本的な考え方</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>アメリカ合衆国（雇用）</td>
                    <td>障害のあるアメリカ人法（ADA）第I編</td>
                    <td>雇用機会均等委員会（EEOC）</td>
                    <td>
                      心身の障害が「主要な生活活動」を実質的に制限する場合に保護対象となりうる。従業員15人以上の事業主に「合理的配慮」提供の義務があり、過重な負担がある場合は除外されうる
                    </td>
                  </tr>
                  <tr>
                    <td>アメリカ合衆国（初等中等教育）</td>
                    <td>リハビリテーション法504条</td>
                    <td>教育省 公民権局（OCR）</td>
                    <td>
                      障害により教育機会に支障がある児童生徒に対し、通常の教育課程の中で行う配慮（いわゆる「504プラン」）を提供する
                    </td>
                  </tr>
                  <tr>
                    <td>イギリス</td>
                    <td>平等法2010（Equality Act 2010）</td>
                    <td>平等人権委員会（EHRC）</td>
                    <td>
                      日常生活動作への実質的・長期的な影響がある場合に障害として保護されうる。雇用主には「合理的調整（reasonable
                      adjustments）」の義務がある
                    </td>
                  </tr>
                  <tr>
                    <td>日本</td>
                    <td>障害者差別解消法</td>
                    <td>内閣府（全体調整）、事業分野ごとの主務大臣</td>
                    <td>
                      行政機関等は合理的配慮の提供が法的義務。民間事業者も2024年4月の改正法施行により、合理的配慮の提供が法的義務化。事業分野ごとの「対応指針」を参考に建設的対話を通じて検討する
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="alert a-info">
              <div className="alert-i">ℹ️</div>
              <div>
                いずれの枠組みでも、「診断名があること」自体が自動的に配慮の対象を意味するわけではなく、日常生活・就労・就学への
                <strong>実質的な支障の程度</strong>
                が判断の中心に置かれている点は共通しています。
              </div>
            </div>
          </section>

          {/* ====================================================== SECTION 4 */}
          <section id="s4" className="sec">
            <div className="sec-hd">
              <div className="sec-num">4</div>
              <h2 className="sec-title">職場における合理的配慮</h2>
            </div>

            <h3>配慮を考える2つの切り口</h3>
            <div className="card">
              <p style={{ fontSize: 13.5 }}>
                米国のJob Accommodation
                Network（JAN、米国労働省が運営する情報提供機関）は、職場での配慮案を整理する際に、次の2つの軸で考えることを提案しています。
              </p>
              <ul style={{ fontSize: 13.5 }}>
                <li>
                  <strong>制限（Limitation）別</strong>
                  ：頭痛そのものによる痛み、光・音への過敏、ストレス耐性の低下など、本人が経験している困りごとから出発する
                </li>
                <li>
                  <strong>職務機能（Work-Related Function）別</strong>
                  ：光環境、音環境、ストレス要因など、職場側の要素から出発する
                </li>
              </ul>
              <p style={{ fontSize: 13 }}>
                この2方向から整理することで、「頭痛という診断名」ではなく「具体的にどの場面で何に困っているか」を起点に配慮を検討しやすくなります。
              </p>
            </div>

            <h3>職場での配慮の例とエビデンスレベル</h3>
            <p style={{ fontSize: 13 }}>
              Begasse de Dhaemらのスコーピングレビュー（<em>Cephalalgia</em>,
              2021）は、片頭痛のある成人の職場での生産性に関連する要因と、報告されている配慮・介入を包括的に整理しています。同レビューは、個々の環境調整に関する研究の多くが横断研究・自己報告データにとどまり、対照群を伴う前向き研究など厳密なデザインは限られると指摘しています。
            </p>

            <div className="tbl">
              <table>
                <thead>
                  <tr>
                    <th>配慮の種類</th>
                    <th>具体例</th>
                    <th>エビデンス</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>光環境の調整</td>
                    <td>照明の変更、まぶしさを抑えるフィルター、自然光量の調整</td>
                    <td>
                      <span className="bC">bC</span>
                    </td>
                  </tr>
                  <tr>
                    <td>香り・におい対策</td>
                    <td>無香料方針の周知、換気の改善</td>
                    <td>
                      <span className="bC">bC</span>
                    </td>
                  </tr>
                  <tr>
                    <td>音環境の調整</td>
                    <td>静かな作業スペースの確保、遮音・防音対策</td>
                    <td>
                      <span className="bC">bC</span>
                    </td>
                  </tr>
                  <tr>
                    <td>勤務時間・場所の柔軟化</td>
                    <td>フレックスタイム、テレワーク、休憩の分割取得</td>
                    <td>
                      <span className="bB">bB</span>
                    </td>
                  </tr>
                  <tr>
                    <td>欠勤・遅刻に関する運用の調整</td>
                    <td>頭痛関連の欠勤・遅刻を画一的に不利益評価しない取り扱い</td>
                    <td>
                      <span className="bC">bC</span>
                    </td>
                  </tr>
                  <tr>
                    <td>職場での頭痛教育・臨床評価プログラム</td>
                    <td>従業員向け頭痛啓発、産業保健スタッフによる評価・受診連携</td>
                    <td>
                      <span className="bB">bB</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="alert a-ok">
              <div className="alert-i">✅</div>
              <div>
                勤務時間の柔軟化や職場教育プログラムは、複数の前向きコホート研究で欠勤・プレゼンティーズムの改善が報告されており、比較的まとまった知見があります（bB）。一方、個別の環境調整（照明・香り・音）は理論的根拠と当事者の実感に基づく報告が中心で、厳密な効果検証はまだ限られています（bC）。エビデンスの蓄積が薄いことは「効果がない」ことを意味するのではなく、「まだ十分に検証されていない」ことを意味する点に注意が必要です。
              </div>
            </div>
          </section>

          {/* ====================================================== SECTION 5 */}
          <section id="s5" className="sec">
            <div className="sec-hd">
              <div className="sec-num">5</div>
              <h2 className="sec-title">学校における合理的配慮</h2>
            </div>

            <p>
              頭痛、特に片頭痛は小児・思春期にも珍しくない疾患であり、学業への影響（欠席の増加、成績への影響、生活の質の低下）が報告されています。
            </p>

            <h3>アメリカの制度例：504プランとIEPの違い</h3>
            <p style={{ fontSize: 13.5 }}>
              米国教育省公民権局（OCR）は、片頭痛のある生徒に対するSection
              504（リハビリテーション法504条）の適用について、通常の教育課程の中で環境調整（教室の照明、香りのある芳香剤の使用制限、サングラス着用の許可など）を行う「修正（modifications）」が求められうるとしています。米国頭痛学会（American
              Headache
              Society）の臨床家向け資料では、頭痛が原因で欠席・提出物の遅れなどにより学業上の不利益を受けている場合、または受けるおそれがある場合に504プランを検討することが望ましいとされています。
            </p>

            <div className="mmd">
              <div className="mmd-lbl">
                フローチャート — 学校での配慮の検討プロセス（アメリカの例：504プラン vs IEP）
              </div>
              <MermaidDiagram
                themeVariables={ACCOMMODATIONS_MERMAID_THEME}
                chart={`flowchart TD
A["頭痛により学業に支障が生じている\\n（アメリカの例）"] --> B{"通常の教育課程の中で\\n対応できるか？"}
B -->|できる| C["Section 504 プラン\\n環境調整・出席や提出物の配慮"]
B -->|特別な指導が必要| D["IEP（個別教育計画）\\n特別支援教育の対象として検討"]
C --> E["学校チームと家族で\\nプランを作成し、定期的に見直す"]
D --> E`}
              />
            </div>

            <h3>学校での配慮の例（米国の資料を中心に）</h3>
            <div className="tbl">
              <table>
                <thead>
                  <tr>
                    <th>分野</th>
                    <th>配慮の例</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>出席・提出物</td>
                    <td>頭痛による欠席・遅刻への配慮、提出期限の柔軟化</td>
                  </tr>
                  <tr>
                    <td>試験・課題の環境</td>
                    <td>静かな別室での受験、時間延長、口頭での回答の許可</td>
                  </tr>
                  <tr>
                    <td>教室環境</td>
                    <td>
                      蛍光灯以外の照明への変更、香りのある製品の使用制限、サングラス着用の許可
                    </td>
                  </tr>
                  <tr>
                    <td>保健室等の利用</td>
                    <td>発作時に休養できる場所の確保、水分補給の許可</td>
                  </tr>
                  <tr>
                    <td>周囲の理解</td>
                    <td>教職員・関係者への正しい知識の共有（本人・保護者の同意の範囲で）</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3>日本の学校における「合理的配慮」の一般的な枠組み</h3>
            <div className="card">
              <p style={{ fontSize: 13.5 }}>
                日本では、頭痛に特化した学校向けの公式ガイドラインは確認できていませんが、教育分野における「合理的配慮」の一般的な定義が文部科学省により示されています。初等中等教育段階における合理的配慮とは、
                <strong>
                  「障害のある子どもが、他の子どもと平等に『教育を受ける権利』を享有・行使することを確保するために、学校の設置者及び学校が必要かつ適当な変更・調整を行うこと」
                </strong>
                であり、学校の設置者・学校に対して「体制面、財政面において、均衡を失した又は過度の負担を課さないもの」とされています。この一般的な枠組みは、障害者差別解消法の対象範囲が「日常生活および社会生活全般に係る分野」を広く含むことと合わせて、教育機関にも適用され得るものです。
              </p>
              <p style={{ fontSize: 13 }}>
                頭痛による学業への支障がある場合、この一般的な枠組みを踏まえたうえで、学校の相談窓口・スクールカウンセラー・主治医と個別に相談することが現実的な出発点となります。
              </p>
            </div>
          </section>

          {/* ====================================================== SECTION 6 */}
          <section id="s6" className="sec">
            <div className="sec-hd">
              <div className="sec-num">6</div>
              <h2 className="sec-title">開示とスティグマへの向き合い方</h2>
            </div>

            <p>
              頭痛の状況を職場・学校に伝える（開示する）かどうかは、本人の判断に委ねられる非常に個人的な選択です。研究からは、開示には次のような両面があることが示されています。
            </p>

            <div className="qr-grid">
              <div className="qr">
                <div className="qr-t">開示の意義</div>
                <p style={{ fontSize: 13 }}>
                  開示は、配慮を受けるための前提となる場合が多く、産業保健スタッフや学校側との建設的対話の出発点になり得ます。
                </p>
              </div>
              <div className="qr">
                <div className="qr-t">開示の懸念</div>
                <p style={{ fontSize: 13 }}>
                  スティグマ研究は、頭痛（特に片頭痛）に対する「大げさに言っているのではないか」といった誤解が一般集団にも一定程度存在することを示しており、開示によって偏見にさらされることへの懸念が申告控えにつながっていると考えられます。
                </p>
              </div>
            </div>

            <div className="alert a-info">
              <div className="alert-i">💬</div>
              <div>
                こうした研究知見を踏まえると、「開示すべきかどうか」を一律に判断することはできず、本人が信頼できる相談先（産業医、人事の相談窓口、学校の相談窓口、主治医など）とともに、
                <strong>開示の範囲・タイミング・伝え方</strong>
                を検討することが、現状のエビデンスと整合的なアプローチと言えます。
              </div>
            </div>
          </section>

          {/* ====================================================== SECTION 7 */}
          <section id="s7" className="sec">
            <div className="sec-hd">
              <div className="sec-num">7</div>
              <h2 className="sec-title">まとめ：一般的な進め方</h2>
            </div>

            <p style={{ fontSize: 13 }}>
              これまでの内容を踏まえた、一般的な進め方の整理です。個別の状況に応じた具体的な判断は、必ず該当する専門家・窓口にご相談ください。
            </p>

            <div className="card">
              <ol style={{ fontSize: 13.5 }}>
                <li>
                  <strong>困りごとを言語化する</strong>
                  ：頭痛が「いつ」「何によって」「どの程度」学業・仕事に影響しているかを、可能であれば頭痛ダイアリー等の記録とともに整理する
                </li>
                <li>
                  <strong>医療機関を受診する</strong>
                  ：診断・重症度の評価とあわせて、必要に応じて診断書や意見書の作成を相談する
                </li>
                <li>
                  <strong>相談先を確認する</strong>
                  ：職場なら人事・産業医、学校なら担任・学生支援窓口・スクールカウンセラーなど、組織ごとの窓口を確認する
                </li>
                <li>
                  <strong>建設的対話に臨む</strong>
                  ：診断名そのものより、「どの場面で何に困っているか」を具体的に伝えることが対話の出発点になる
                </li>
                <li>
                  <strong>定期的に見直す</strong>
                  ：配慮の内容は一度決めて終わりではなく、症状の変化に応じて見直すプロセスとして捉える
                </li>
              </ol>
            </div>
          </section>

          {/* ====================================================== SECTION 8 */}
          <section id="s8" className="sec">
            <div className="sec-hd">
              <div className="sec-num">8</div>
              <h2 className="sec-title">ソース一覧</h2>
            </div>

            <p style={{ fontSize: 13 }}>
              すべて政府機関・専門学会・査読付き学術誌などの一次情報源です（要約サイト等の二次情報は使用していません）。
            </p>

            <div className="src-grid">
              <div className="src">
                <div className="src-org">国際機関ファクトシート</div>
                <div className="src-t">WHO Fact sheet: Headache disorders</div>
                <Ext
                  href="https://www.who.int/news-room/fact-sheets/detail/headache-disorders"
                  className="src-url"
                >
                  https://www.who.int/news-room/fact-sheets/detail/headache-disorders
                </Ext>
              </div>
              <div className="src">
                <div className="src-org">一次文献（システマティック解析）</div>
                <div className="src-t">
                  Husøy AK, et al. Global, regional, and national burden of headache disorders,
                  1990–2023 (GBD 2023). Lancet Neurology. 2025
                </div>
                <Ext
                  href="https://www.thelancet.com/journals/laneur/article/PIIS1474-4422(25)00402-8/fulltext"
                  className="src-url"
                >
                  https://www.thelancet.com/journals/laneur/article/PIIS1474-4422(25)00402-8/fulltext
                </Ext>
              </div>
              <div className="src">
                <div className="src-org">一次文献レビュー</div>
                <div className="src-t">
                  Stovner LJ, et al. The Global Burden of Headache. PubMed
                </div>
                <Ext href="https://pubmed.ncbi.nlm.nih.gov/29791944/" className="src-url">
                  https://pubmed.ncbi.nlm.nih.gov/29791944/
                </Ext>
              </div>
              <div className="src">
                <div className="src-org">一次文献（スコーピングレビュー）</div>
                <div className="src-t">
                  Begasse de Dhaem O, et al. Identification of work accommodations and interventions
                  associated with work productivity in adults with migraine. Cephalalgia. 2021
                </div>
                <Ext
                  href="https://journals.sagepub.com/doi/full/10.1177/0333102420977852"
                  className="src-url"
                >
                  https://journals.sagepub.com/doi/full/10.1177/0333102420977852
                </Ext>
              </div>
              <div className="src">
                <div className="src-org">一次文献（レビュー）</div>
                <div className="src-t">
                  Begasse de Dhaem O, Sakai F. Migraine in the workplace. eNeurologicalSci. 2022
                </div>
                <Ext href="https://pubmed.ncbi.nlm.nih.gov/35774055/" className="src-url">
                  https://pubmed.ncbi.nlm.nih.gov/35774055/
                </Ext>
              </div>
              <div className="src">
                <div className="src-org">一次文献（前向きコホート）</div>
                <div className="src-t">
                  Sakai F, et al. Diagnosis, knowledge, perception, and productivity impact of
                  headache education and clinical evaluation program in the workplace. Cephalalgia.
                  2023
                </div>
                <Ext
                  href="https://journals.sagepub.com/doi/full/10.1177/03331024231165682"
                  className="src-url"
                >
                  https://journals.sagepub.com/doi/full/10.1177/03331024231165682
                </Ext>
              </div>
              <div className="src">
                <div className="src-org">米国政府機関ガイダンス</div>
                <div className="src-t">
                  U.S. EEOC. Enforcement Guidance on Reasonable Accommodation and Undue Hardship
                  Under the ADA
                </div>
                <Ext
                  href="https://www.eeoc.gov/laws/guidance/enforcement-guidance-reasonable-accommodation-and-undue-hardship-under-ada"
                  className="src-url"
                >
                  https://www.eeoc.gov/laws/guidance/enforcement-guidance-reasonable-accommodation-and-undue-hardship-under-ada
                </Ext>
              </div>
              <div className="src">
                <div className="src-org">米国政府系情報提供機関</div>
                <div className="src-t">
                  Job Accommodation Network (JAN, U.S. Department of Labor). Migraines
                </div>
                <Ext href="https://askjan.org/disabilities/Migraines.cfm" className="src-url">
                  https://askjan.org/disabilities/Migraines.cfm
                </Ext>
              </div>
              <div className="src">
                <div className="src-org">米国政府機関ファクトシート</div>
                <div className="src-t">
                  U.S. Department of Education, Office for Civil Rights. Section 504 Protections for
                  Students with Migraine
                </div>
                <Ext
                  href="https://www.ed.gov/media/document/ocr-factsheet-migraine-108821.pdf"
                  className="src-url"
                >
                  https://www.ed.gov/media/document/ocr-factsheet-migraine-108821.pdf
                </Ext>
              </div>
              <div className="src">
                <div className="src-org">専門学会臨床家向け資料</div>
                <div className="src-t">
                  American Headache Society. Resources to Support Students with Headache
                </div>
                <Ext
                  href="https://americanheadachesociety.org/resources/clinicians/clinical-practice-resources/resources-to-support-students-with-headache-2"
                  className="src-url"
                >
                  https://americanheadachesociety.org/resources/clinicians/clinical-practice-resources/resources-to-support-students-with-headache-2
                </Ext>
              </div>
              <div className="src">
                <div className="src-org">英国法定機関ガイド</div>
                <div className="src-t">
                  Equality and Human Rights Commission (UK). Proving disability and reasonable
                  adjustments
                </div>
                <Ext
                  href="https://www.equalityhumanrights.com/sites/default/files/proving_disability_and_reasonable_adjustments.pdf"
                  className="src-url"
                >
                  https://www.equalityhumanrights.com/sites/default/files/proving_disability_and_reasonable_adjustments.pdf
                </Ext>
              </div>
              <div className="src">
                <div className="src-org">英国議会公式記録</div>
                <div className="src-t">
                  UK Parliament. Written question on migraine and employment support
                </div>
                <Ext
                  href="https://questions-statements.parliament.uk/written-questions/detail/2025-10-10/80971"
                  className="src-url"
                >
                  https://questions-statements.parliament.uk/written-questions/detail/2025-10-10/80971
                </Ext>
              </div>
              <div className="src">
                <div className="src-org">日本政府（一次情報）</div>
                <div className="src-t">
                  内閣府．障害を理由とする差別の解消の推進に関する基本方針
                </div>
                <Ext
                  href="https://www8.cao.go.jp/shougai/suishin/sabekai/kihonhoushin/honbun.html"
                  className="src-url"
                >
                  https://www8.cao.go.jp/shougai/suishin/sabekai/kihonhoushin/honbun.html
                </Ext>
              </div>
              <div className="src">
                <div className="src-org">日本政府（一次情報）</div>
                <div className="src-t">
                  内閣府．合理的配慮の提供（障害者の差別解消に向けた理解促進ポータルサイト）
                </div>
                <Ext
                  href="https://shougaisha-sabetukaishou.go.jp/goritekihairyo/"
                  className="src-url"
                >
                  https://shougaisha-sabetukaishou.go.jp/goritekihairyo/
                </Ext>
              </div>
              <div className="src">
                <div className="src-org">日本政府（一次情報）</div>
                <div className="src-t">
                  文部科学省．本検討会における「合理的配慮」の定義について（案）
                </div>
                <Ext
                  href="https://www.mext.go.jp/a_menu/koutou/gakuseishien/shugaku/1324325.htm"
                  className="src-url"
                >
                  https://www.mext.go.jp/a_menu/koutou/gakuseishien/shugaku/1324325.htm
                </Ext>
              </div>
              <div className="src">
                <div className="src-org">一次文献</div>
                <div className="src-t">
                  Shapiro RE, et al. Migraine-Related Stigma and Its Relationship to Disability,
                  Interictal Burden, and Quality of Life. Neurology. 2024
                </div>
                <Ext
                  href="https://www.neurology.org/doi/10.1212/WNL.0000000000208074"
                  className="src-url"
                >
                  https://www.neurology.org/doi/10.1212/WNL.0000000000208074
                </Ext>
              </div>
              <div className="src">
                <div className="src-org">一次文献</div>
                <div className="src-t">The Stigma of Migraine. PMC</div>
                <Ext
                  href="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC3546922/"
                  className="src-url"
                >
                  https://www.ncbi.nlm.nih.gov/pmc/articles/PMC3546922/
                </Ext>
              </div>
              <div className="src">
                <div className="src-org">一次文献</div>
                <div className="src-t">
                  Igarashi H, et al. Underrecognition of migraine-related stigmatizing attitudes and
                  social burden: OVERCOME Japan study. Brain and Behavior. 2024
                </div>
                <Ext
                  href="https://onlinelibrary.wiley.com/doi/10.1002/brb3.3547"
                  className="src-url"
                >
                  https://onlinelibrary.wiley.com/doi/10.1002/brb3.3547
                </Ext>
              </div>
              <div className="src">
                <div className="src-org">一次文献（国内学会誌）</div>
                <div className="src-t">
                  加藤宏一．医療機関職員における頭痛の実態調査．日本頭痛学会誌．2023;49(3):584-589
                </div>
                <Ext
                  href="https://www.jstage.jst.go.jp/article/jjho/49/3/49_584/_article/-char/ja/"
                  className="src-url"
                >
                  https://www.jstage.jst.go.jp/article/jjho/49/3/49_584/_article/-char/ja/
                </Ext>
              </div>
            </div>
          </section>
        </main>
      </div>

      {/* FOOTER */}
      <div className="footer">
        <strong>職場・学校での頭痛への対処と周囲の理解</strong>
        {" — "}
        合理的配慮の一般論｜国際的な枠組みとエビデンスに基づく解説
        <br />📅 作成年: 2026 | 次回レビュー推奨: ガイドライン更新時
        <br />
        ⚠️
        本資料は学術・教育・研究目的のみを対象としています。臨床への適用は必ず資格を持つ医療専門家の監督のもとで行ってください。
      </div>
    </div>
  );
}
