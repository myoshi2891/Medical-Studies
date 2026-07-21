import type { Metadata } from "next";
import { Ext } from "@/components/Ext";
import MermaidDiagram from "@/components/MermaidDiagram";
import { HeadacheTriggerIdentificationSidebar } from "@/components/treatment/HeadacheTriggerIdentificationSidebar";
import "./headache-trigger-identification-guide.css";

export const metadata: Metadata = {
  title: "頭痛トリガーの特定と管理 ― 記録から振り返りまでの実践ガイド",
  description:
    "頭痛発作の引き金（トリガー）と前兆症状（プロドローム）の違い、エビデンスに基づく主要トリガー候補の強さ、想起バイアスを防ぐ頭痛ダイアリーの記録方法、および回避行動の落とし穴について解説。",
};

const TRIGGER_MERMAID_THEME: Record<string, string> = {
  primaryColor: "#e8eaf6",
  primaryTextColor: "#1a237e",
  primaryBorderColor: "#303f9f",
  lineColor: "#757575",
  secondaryColor: "#e0f2f1",
  tertiaryColor: "#e8f5e9",
  edgeLabelBackground: "#ffffff",
  fontSize: "13px",
};

export default function HeadacheTriggerIdentificationGuidePage() {
  return (
    <div className="headache-trigger-accent">
      {/* HERO */}
      <div className="hero">
        <div style={{ fontSize: 40 }}>🔍</div>
        <h1>頭痛トリガーの特定と管理</h1>
        <p className="hero-sub">
          記録から振り返りまでの実践ガイド ― 前兆症状との混同を避け、エビデンスに基づいて振り返る
        </p>
        <div className="hero-tags">
          <span className="hero-tag">ICHD-3</span>
          <span className="hero-tag">頭痛ダイアリー</span>
          <span className="hero-tag">NICE CG150</span>
          <span className="hero-tag">エビデンスベース</span>
          <span className="hero-tag">初学者向け</span>
        </div>
      </div>

      {/* DISCLAIMER */}
      <div className="disclaimer">
        <strong>⚠️ DisclaimerBanner（学術・教育目的の免責事項）</strong>
        　本ページは教育目的の一般的な情報提供であり、<strong>個別の治療推奨ではありません</strong>
        。頭痛の診断・トリガーの特定・生活習慣の変更については、自己判断で完結させず、必ず医師・医療専門家にご相談ください。本ページの内容は特定の方法の効果や安全性を保証するものではありません。
      </div>

      {/* LAYOUT */}
      <div className="layout">
        <HeadacheTriggerIdentificationSidebar />

        {/* MAIN CONTENT */}
        <main className="main">
          <div className="card" style={{ marginTop: 0 }}>
            <p style={{ marginBottom: 0 }}>
              対象読者は、頭痛（片頭痛・緊張型頭痛など）のトリガー（誘発因子）について、記録と振り返りの方法を基礎から学びたい方です。本記事は国際頭痛分類（ICHD-3）、国内外のガイドライン、査読付き文献に基づいて構成しています。具体的な薬剤の用法・用量には触れません。記載しているエビデンスの強さは相対的な表現（強い／中等度／限定的／不明）にとどめ、断定は避けています。
            </p>
          </div>

          {/* ====================================================== SECTION 1 */}
          <section id="s1" className="sec">
            <div className="sec-hd">
              <div className="sec-num">1</div>
              <h2 className="sec-title">頭痛トリガーとは何か</h2>
            </div>

            <p>
              「トリガー（誘発因子）」とは、頭痛発作の引き金になりうると考えられている内的・外的な要因のことです。国際頭痛分類（ICHD-3）は頭痛そのものの診断基準を定めるものであり、個々のトリガーを診断基準として規定しているわけではありませんが、片頭痛のレビュー文献では、ストレス、月経周期の変化、天候変化、睡眠の乱れ、アルコール、特定の食品などが自己申告で多く挙げられるトリガー候補として整理されています。
            </p>

            <div className="alert a-info">
              <div className="alert-i">ℹ️</div>
              <div>
                実験的に確実に頭痛を誘発できる物質（ニトログリセリンなど）とは異なり、日常生活で自己申告される「自然な」トリガーは再現性が低く、個人差が大きいことが指摘されています。「誰かに効いた・当てはまった」トリガー対策が、そのまま自分にも当てはまるとは限りません。
              </div>
            </div>
          </section>

          {/* ====================================================== SECTION 2 */}
          <section id="s2" className="sec">
            <div className="sec-hd">
              <div className="sec-num">2</div>
              <h2 className="sec-title">トリガーと前兆（プロドローム）症状の混同という落とし穴</h2>
            </div>

            <p>
              頭痛のセルフケアで見落とされがちなのが、「トリガーだと思っていた症状が、実は頭痛発作そのものの前兆（プロドローム）症状だった」というケースです。
            </p>

            <p>
              片頭痛発作は、頭痛が始まる前から「予兆期（premonitory
              phase／prodrome）」と呼ばれる段階を経ることが知られており、疲労感、集中力の低下、首のこり、あくび、特定の食べ物への渇望（食渇望）といった症状がこの時期に現れることがあります。電子日記を用いた古典的な研究では、こうした予兆症状を報告した患者の多くが、実際にその後の頭痛発作を高い割合で予測できたことが示されています。
            </p>

            <div className="alert a-warn">
              <div className="alert-i">⚠️</div>
              <div>
                「チョコレートを食べた後に頭痛が起きた」という経験は、実際には「頭痛発作の予兆としてチョコレートへの渇望が生じ、それを食べた後にもともと予定されていた頭痛が発生した」だけという可能性があります。近年のレビューでもトリガーと予兆症状を区別する視点（threshold
                hypothesis）が提唱されており、両者を峻別する重要性が指摘されています。
              </div>
            </div>

            <div className="mmd">
              <div className="mmd-lbl">フローチャート — トリガーか前兆かを見分ける視点</div>
              <MermaidDiagram
                themeVariables={TRIGGER_MERMAID_THEME}
                chart={`flowchart TD
    A["気になる症状が\\n頭痛の前に出現した"] --> B{"発作のたびに\\nほぼ毎回出現するか？"}
    B -- はい --> C{"症状の性質は？\\n疲労感・集中力低下・\\nあくび・食欲変化・首のこり等"}
    B -- "いいえ（一部の発作のみ）" --> D{"具体的な曝露\\n（特定の食品・天候変化・\\n飲酒・欠食等）と一致するか"}
    C -- 一致する --> E["前兆（プロドローム）症状の\\n可能性を疑う\\n『トリガー』と誤認しやすい"]
    D -- 一致する --> F["個人トリガーの候補として\\n記録を続ける"]
    D -- 一致しない --> G["偶然の一致や\\n他要因の可能性を考える"]
    E --> H["頭痛ダイアリーで\\n複数回の発作を確認する"]
    F --> H
    G --> H
    H --> I{"複数回の発作で\\n同じ関連が\\n再現されるか"}
    I -- 再現される --> J["個人トリガー候補として整理し\\n医師と相談する"]
    I -- 再現されない --> K["単なる偶然だった\\n可能性が高いと考える"]`}
              />
            </div>

            <div className="alert a-purple">
              <div className="alert-i">💡</div>
              <div>
                この判別は自己判断だけで完信させず、記録をもとに医師と相談しながら進めることが推奨されます。
              </div>
            </div>
          </section>

          {/* ====================================================== SECTION 3 */}
          <section id="s3" className="sec">
            <div className="sec-hd">
              <div className="sec-num">3</div>
              <h2 className="sec-title">報告されているトリガー候補とエビデンスの現状</h2>
            </div>

            <p>
              以下は自己申告や観察研究で頻繁に挙げられるトリガー候補と、現時点でのエビデンスの相対的な強さです。
              <strong>
                個人差が大きいため、この表はあくまで「何を記録すべきかの手がかり」であり、特定の食品や行動の回避を推奨するものではありません。
              </strong>
            </p>

            <h3>エビデンス表記の凡例</h3>
            <div className="qr-grid">
              <div className="qr">
                <div className="qr-t">
                  <span className="bA">bA</span>
                </div>
                <div>複数の質の高い研究・レビューで比較的一貫して支持されている</div>
              </div>
              <div className="qr">
                <div className="qr-t">
                  <span className="bB">bB</span>
                </div>
                <div>
                  一定数の研究で関連が示されているが、因果関係の解明や質の高い検証はなお発展途上
                </div>
              </div>
              <div className="qr">
                <div className="qr-t">
                  <span className="bC">bC</span>
                </div>
                <div>
                  自己申告としての報告頻度は高いが、実験的検証（二重盲検の誘発試験等）では支持が乏しい、または研究間で結果が一致しない
                </div>
              </div>
              <div className="qr">
                <div className="qr-t">
                  <span className="bU">bU</span>
                </div>
                <div>現時点では明確な結論を出すだけの根拠が乏しい</div>
              </div>
            </div>

            <div className="tbl">
              <table>
                <thead>
                  <tr>
                    <th>トリガー候補</th>
                    <th>内容の例</th>
                    <th>エビデンスの現状</th>
                    <th>評価</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>ホルモン変動</td>
                    <td>月経周期に伴うエストロゲン低下</td>
                    <td>月経周期との関連は比較的一貫して報告されている</td>
                    <td>
                      <span className="bB">bB</span>
                    </td>
                  </tr>
                  <tr>
                    <td>空腹・欠食</td>
                    <td>食事を抜く、長時間の絶食</td>
                    <td>複数の臨床研究で関連が確認されている</td>
                    <td>
                      <span className="bB">bB</span>
                    </td>
                  </tr>
                  <tr>
                    <td>睡眠の変化</td>
                    <td>睡眠不足、睡眠過多、リズムの乱れ</td>
                    <td>関連を示す研究が複数ある</td>
                    <td>
                      <span className="bB">bB</span>
                    </td>
                  </tr>
                  <tr>
                    <td>ストレスとその解放（letdown）</td>
                    <td>緊張状態からの弛緩期</td>
                    <td>
                      自己申告で最も頻度の高い要因の一つだが、因果関係の生物学的機序は解明が進行中
                    </td>
                    <td>
                      <span className="bB">bB</span>
                    </td>
                  </tr>
                  <tr>
                    <td>カフェインの急な中断</td>
                    <td>普段の摂取習慣を急にやめる</td>
                    <td>ICHD-3にカフェイン離脱頭痛の診断基準があり、関連性は比較的明確</td>
                    <td>
                      <span className="bB">bB</span>
                    </td>
                  </tr>
                  <tr>
                    <td>感覚刺激</td>
                    <td>強い光、音、匂い</td>
                    <td>
                      片頭痛の発作間欠期でも感覚過敏が確認されており、関連は比較的支持されている
                    </td>
                    <td>
                      <span className="bB">bB</span>
                    </td>
                  </tr>
                  <tr>
                    <td>気象・気圧の変化</td>
                    <td>低気圧、天候の急変</td>
                    <td>関連を示唆する報告はあるが、個人差が大きく研究間の一貫性に乏しい</td>
                    <td>
                      <span className="bC">bC</span>
                    </td>
                  </tr>
                  <tr>
                    <td>アルコール</td>
                    <td>特に赤ワインなど</td>
                    <td>自己申告としての報告は多いが、実験的に再現性を確認した研究は限定的</td>
                    <td>
                      <span className="bC">bC</span>
                    </td>
                  </tr>
                  <tr>
                    <td>特定の食品・食品添加物</td>
                    <td>チョコレート、うま味調味料など</td>
                    <td>
                      自己申告は多い一方、対照試験では支持が乏しく、前兆期の食渇望を「トリガー」と誤認している可能性が指摘されている
                    </td>
                    <td>
                      <span className="bC">bC</span> / <span className="bU">bU</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="alert a-warn">
              <div className="alert-i">⚠️</div>
              <div>
                小児・青年を対象としたレビューでも、食事関連のトリガーについては根拠が非常に限定的であるとされており、明確な個別のトリガーが特定されていない段階で特定の食品を場当たり的に制限するよりも、欠食を避けてバランスの良い食事をとることを助言する方が妥当だとされています。根拠の乏しい食事制限は、かえって生活の質を損なう可能性があります。
              </div>
            </div>
          </section>

          {/* ====================================================== SECTION 4 */}
          <section id="s4" className="sec">
            <div className="sec-hd">
              <div className="sec-num">4</div>
              <h2 className="sec-title">頭痛ダイアリー（記録）が重視される理由</h2>
            </div>

            <h3>なぜ「記憶」ではなく「記録」なのか</h3>
            <p>
              人は頭痛の頻度や強さを後から振り返って報告するとき、その場その場の記憶をそのまま思い出しているわけではなく、記憶の再構成による偏り（想起バイアス）の影響を受けることが、症状報告研究の分野で繰り返し指摘されています。電子日記の活用に関する総説では、数日から数週間にわたる期間を振り返って一つの代表値を答えるという作業そのものに、認知的な偏りが入り込みやすいことが論じられています。
            </p>
            <p>
              頭痛領域でも、前向きに毎日記録した日記データと、後から振り返って回答した質問票データを比較した研究において、両者の間に統計的に有意な差があり、振り返り型の質問票は日々の日記データと必ずしも一致しないことが示されています。小児頭痛を対象にした先行研究でも同様の想起バイアスの存在が報告されています。
            </p>

            <h3>ガイドラインにおける頭痛ダイアリーの位置づけ</h3>
            <p>
              英国NICEのガイドライン（CG150）では、頭痛の診断や治療効果のモニタリング、患者との対話の基盤として頭痛ダイアリーの活用を推奨しており、記録する場合は少なくとも8週間継続すること、月経関連片頭痛の診断には少なくとも2回の月経周期にわたる記録を用いることを挙げています。記録項目としては、頭痛の頻度・持続時間・強さ、随伴症状、使用した市販薬・処方薬（すべて）、想定される誘因、月経との関連が挙げられています。
            </p>
            <p>
              国内の「頭痛の診療ガイドライン2021」（日本神経学会・日本頭痛学会・日本神経治療学会監修）でも、頭痛ダイアリーの有用性そのものを検討する項目（CQ：頭痛ダイアリーは有用か）が設けられており、日常診療における記録の位置づけが整理されています。
            </p>

            <h3>紙の日記と電子日記（アプリ）の違い</h3>
            <p>
              紙の日記は手軽である一方、その場で記録せず後でまとめて記入してしまう「後付け入力」が起こりやすく、これが想起バイアスの混入につながる可能性が指摘されています。電子日記（スマートフォンアプリや専用デバイス）は、入力時刻の記録や事後編集の制限などによって、より高い信頼性が期待できるとする報告があります。
            </p>

            <div className="alert a-ok">
              <div className="alert-i">✅</div>
              <div>
                これは「電子日記でなければ意味がない」ということではありません。紙であっても
                <strong>その日のうちに、できごとの直後に記録する習慣</strong>
                が最も重要である、という点が実務的な要点です。どの記録方法（紙／特定のアプリ）を選ぶかは個人の使いやすさによるため、本ガイドでは特定の製品名を推奨することはしません。
              </div>
            </div>
          </section>

          {/* ====================================================== SECTION 5 */}
          <section id="s5" className="sec">
            <div className="sec-hd">
              <div className="sec-num">5</div>
              <h2 className="sec-title">頭痛ダイアリーに何を記録するか</h2>
            </div>

            <div className="tbl">
              <table>
                <thead>
                  <tr>
                    <th>記録項目</th>
                    <th>記録内容の例</th>
                    <th>タイミング</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>頭痛の有無・開始/終了時刻</td>
                    <td>頭痛がなかった日も含めて毎日記録する</td>
                    <td>毎日</td>
                  </tr>
                  <tr>
                    <td>強さ</td>
                    <td>0〜10などのスケール、または軽度・中等度・重度</td>
                    <td>頭痛が起きたとき</td>
                  </tr>
                  <tr>
                    <td>随伴症状</td>
                    <td>悪心・嘔吐、光過敏、音過敏、拍動性の有無など</td>
                    <td>頭痛が起きたとき</td>
                  </tr>
                  <tr>
                    <td>服薬の記録</td>
                    <td>
                      市販薬・処方薬を使用したかどうかとタイミング（具体的な用量の指導は本ガイドの範囲外です）
                    </td>
                    <td>頭痛が起きたとき</td>
                  </tr>
                  <tr>
                    <td>想定される誘因の候補</td>
                    <td>睡眠時間、食事状況（欠食の有無）、ストレス度、天候など</td>
                    <td>毎日</td>
                  </tr>
                  <tr>
                    <td>前兆的な症状の有無</td>
                    <td>あくび、集中力低下、首のこり、食欲・気分の変化など</td>
                    <td>頭痛の前</td>
                  </tr>
                  <tr>
                    <td>月経との関連（該当者）</td>
                    <td>月経周期の日数</td>
                    <td>毎日/周期ごと</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="alert a-info">
              <div className="alert-i">ℹ️</div>
              <div>
                ポイントは「頭痛が起きた日だけ」記録するのではなく、
                <strong>頭痛がなかった日も含めて毎日記録する</strong>
                ことです。これにより、「その要因があった日に頭痛が起きなかった頻度」も把握でき、見かけ上の関連（偶然の一致）を見分けやすくなります。
              </div>
            </div>
          </section>

          {/* ====================================================== SECTION 6 */}
          <section id="s6" className="sec">
            <div className="sec-hd">
              <div className="sec-num">6</div>
              <h2 className="sec-title">記録から振り返りへ ― パターン抽出のステップ</h2>
            </div>

            <div className="mmd">
              <div className="mmd-lbl">フローチャート — 記録から振り返りまでのサイクル</div>
              <MermaidDiagram
                themeVariables={TRIGGER_MERMAID_THEME}
                chart={`flowchart LR
    A["毎日記録する\\n頭痛の有無に関わらず"] --> B["一定期間記録を蓄積する\\n目安：最低8週間\\n月経関連は2周期以上"]
    B --> C["記録を振り返る\\n頻度・時間帯・随伴要因を確認"]
    C --> D["パターンの候補を抽出し\\n仮説を立てる"]
    D --> E["複数回の発作で\\n再現性を検証する"]
    E --> F["医師・医療専門家と\\n記録を共有する"]
    F --> G["診断や生活習慣見直しの\\n材料として活用する"]
    G -.継続.-> A`}
              />
            </div>

            <h3>振り返り時に注意すべきこと</h3>
            <ul>
              <li>
                <strong>1回の一致だけで結論づけない</strong>
                ：ある要因のあった日に1回頭痛が起きたからといって、それが真のトリガーとは限りません。複数回（できれば同じ要因が「あった日」と「なかった日」の両方の記録）を比較して、繰り返し関連が見られるかを確認します。個々の患者ごとにトリガー候補を絞り込んでいく手法（個人内でのトリガー特定アプローチ）を扱った研究でも、こうした反復的な検証の重要性が論じられています。
              </li>
              <li>
                <strong>確証バイアスに注意する</strong>
                ：「甘いものが原因だ」と思い込んでいると、甘いものを食べて頭痛が起きた日ばかりが印象に残り、食べても頭痛が起きなかった日を見落としがちです。日々の記録はこの偏りを補正する役割を持ちます。
              </li>
              <li>
                <strong>複数要因が重なっている可能性を考える</strong>
                ：睡眠不足とストレスと欠食が同時に重なっていた場合、どれか一つだけを「犯人」と決めつけるのは早計です。
              </li>
              <li>
                <strong>前兆症状との切り分けを忘れない</strong>（セクション2を参照）。
              </li>
            </ul>
          </section>

          {/* ====================================================== SECTION 7 */}
          <section id="s7" className="sec">
            <div className="sec-hd">
              <div className="sec-num">7</div>
              <h2 className="sec-title">トリガー回避という対応の落とし穴</h2>
            </div>

            <p>
              「トリガーを避けることが最善の予防策である」という助言は広く行われていますが、この考え方そのものを問い直す研究の系譜があります。行動医学分野のレビューでは、トリガー回避を推奨する従来の臨床的助言が、必ずしも明確な理論やエビデンスに基づいて確立されたものではないと指摘されており、不安症における「回避によってかえって過敏さが強まる」という学習理論の知見を踏まえた再検討が提案されています。
            </p>

            <p>
              具体的には、トリガーになりうる刺激との接触に対して不安や警戒心を強め、それを避け続けることが、かえってその刺激への過敏さ（感作）を助長し、生活の選択肢を狭めてしまう可能性が議論されています。片頭痛患者を対象にした実験心理学的研究でも、トリガーに関連する刺激に対する注意の向け方に、健康な対照群とは異なるパターンがみられ、学習された回避的な反応である可能性が示唆されています。
            </p>

            <div className="mmd">
              <div className="mmd-lbl">
                フローチャート — 回避の悪循環と、記録に基づくバランスの取れた対応
              </div>
              <MermaidDiagram
                themeVariables={TRIGGER_MERMAID_THEME}
                chart={`flowchart TD
    subgraph sg1["悪循環になりやすい経路"]
    A["トリガーと疑われる\\n要因に遭遇する"] --> B["不安・警戒心が高まる"]
    B --> C["その要因を回避する"]
    C --> D["生活の選択肢が\\n徐々に狭まる"]
    D --> E["些細な再遭遇にも\\n過敏に反応しやすくなる"]
    E --> B
    end

    subgraph sg2["記録に基づくアプローチ"]
    A2["トリガー候補への気づき"] --> B2["頭痛ダイアリーでの\\n記録・反復検証"]
    B2 --> C2["医師・医療専門家との相談"]
    C2 --> D2["根拠に基づいた\\n必要最小限の対応"]
    D2 --> E2["生活の質を保ちながら\\n頭痛の管理を目指す"]
    end`}
              />
            </div>

            <div className="alert a-purple">
              <div className="alert-i">💡</div>
              <div>
                ここで強調したいのは、「トリガーを一切気にしなくてよい」ということではありません。記録によって再現性が確認された要因については、医師と相談のうえで現実的な対応（睡眠リズムの安定化、規則的な食事など）を検討する価値があります。一方で、根拠の乏しい段階で幅広い食品や活動を自己判断で制限していくことは、生活の質の低下や不必要な不安の助長につながりうるため、慎重さが求められます。
              </div>
            </div>
          </section>

          {/* ====================================================== SECTION 8 */}
          <section id="s8" className="sec">
            <div className="sec-hd">
              <div className="sec-num">8</div>
              <h2 className="sec-title">こんなときは医療機関に相談を</h2>
            </div>

            <p>
              頭痛の性質が普段と異なる場合や、以下のような特徴を伴う場合は、トリガーの自己分析よりも先に医療機関へ相談することが推奨されます。これは国際的に提唱されている二次性頭痛（他の疾患が原因の頭痛）を見逃さないための注意点（いわゆるレッドフラグ）の一部です。
            </p>

            <div className="tbl th-red">
              <table>
                <thead>
                  <tr>
                    <th>注意すべき特徴（一部抜粋）</th>
                    <th>該当しうる状況の例</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>今までに経験したことのない、突然・激烈な頭痛</td>
                    <td>「今まで最悪」の頭痛が数分以内にピークに達する</td>
                  </tr>
                  <tr>
                    <td>発熱や意識障害を伴う頭痛</td>
                    <td>感染症や中枢神経系の異常が疑われる場合</td>
                  </tr>
                  <tr>
                    <td>神経学的な異常所見を伴う頭痛</td>
                    <td>手足の麻痺、言葉が出にくい、視野の異常など</td>
                  </tr>
                  <tr>
                    <td>
                      65歳以降に初めて発症した頭痛、または頭痛のパターンが最近急に変化した場合
                    </td>
                    <td>これまでと明らかに違う頭痛が続く</td>
                  </tr>
                  <tr>
                    <td>咳・くしゃみ・排便・運動で誘発される頭痛</td>
                    <td>特定の動作で毎回頭痛が引き起こされる</td>
                  </tr>
                  <tr>
                    <td>妊娠中・産褥期の頭痛</td>
                    <td>この時期特有のリスクを考慮する必要がある</td>
                  </tr>
                  <tr>
                    <td>市販の鎮痛薬や頭痛薬を頻回に使用している</td>
                    <td>薬物乱用頭痛（MOH）の可能性を含め、医師に相談</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="alert a-danger">
              <div className="alert-i">🚨</div>
              <div>
                この一覧はあくまで一般的な目安であり、網羅的なチェックリストではありません。少しでも不安がある場合は自己判断で済まさず、医師に相談してください。
              </div>
            </div>
          </section>

          {/* ====================================================== SECTION 9 */}
          <section id="s9" className="sec">
            <div className="sec-hd">
              <div className="sec-num">9</div>
              <h2 className="sec-title">まとめ</h2>
            </div>

            <div className="card">
              <ul style={{ marginBottom: 0 }}>
                <li>
                  頭痛のトリガーは個人差が大きく、「自然な」トリガーの多くは実験的な再現性が低いとされています
                </li>
                <li>
                  頭痛前に感じる症状の中には、トリガーではなく発作自体の前兆（プロドローム）症状が含まれている可能性があり、両者の切り分けが重要です
                </li>
                <li>
                  頭痛ダイアリーは、想起バイアスを避け、パターンを客観的に把握するための科学的根拠のある手法として、国内外のガイドラインで推奨されています
                </li>
                <li>
                  記録は「頭痛があった日」だけでなく「なかった日」も含めて毎日行い、複数回の発作で再現性を確認することが望まれます
                </li>
                <li>
                  トリガー回避を絶対視することにはリスクもあり、根拠に基づいた必要最小限の対応を、医師と相談しながら検討することが推奨されます
                </li>
                <li>
                  普段と違う頭痛や危険な兆候がある場合は、自己分析より先に医療機関を受診してください
                </li>
              </ul>
            </div>
          </section>

          {/* ====================================================== SECTION 10 */}
          <section id="s10" className="sec">
            <div className="sec-hd">
              <div className="sec-num">10</div>
              <h2 className="sec-title">出典・参考文献</h2>
            </div>

            <div className="src-grid">
              <div className="src">
                <div className="src-org">IHS</div>
                <div className="src-t">
                  International Classification of Headache Disorders, 3rd edition（ICHD-3）
                </div>
                <div className="src-url">
                  <Ext href="https://ichd-3.org/">https://ichd-3.org/</Ext>
                </div>
              </div>
              <div className="src">
                <div className="src-org">日本神経学会・日本頭痛学会・日本神経治療学会</div>
                <div className="src-t">
                  頭痛の診療ガイドライン2021（頭痛ダイアリーの有用性CQを含む）
                </div>
                <div className="src-url">
                  <Ext href="https://www.neurology-jp.org/guidelinem/headache_medical_2021.html">
                    https://www.neurology-jp.org/guidelinem/headache_medical_2021.html
                  </Ext>
                </div>
              </div>
              <div className="src">
                <div className="src-org">NICE</div>
                <div className="src-t">
                  CG150「Headaches in over 12s: diagnosis and
                  management」（頭痛ダイアリーの記録項目・期間を推奨）
                </div>
                <div className="src-url">
                  <Ext href="https://www.nice.org.uk/guidance/cg150/chapter/recommendations">
                    https://www.nice.org.uk/guidance/cg150/chapter/recommendations
                  </Ext>
                </div>
              </div>
              <div className="src">
                <div className="src-org">Curr Pain Headache Rep, 2018</div>
                <div className="src-t">
                  Marmura MJ. Triggers, Protectors, and Predictors in Episodic Migraine.
                </div>
                <div className="src-url">
                  <Ext href="https://pubmed.ncbi.nlm.nih.gov/30291562/">
                    https://pubmed.ncbi.nlm.nih.gov/30291562/
                  </Ext>
                </div>
              </div>
              <div className="src">
                <div className="src-org">Neurology, 2003</div>
                <div className="src-t">
                  Giffin NJ, et al. Premonitory symptoms in migraine: an electronic diary study.
                </div>
                <div className="src-url">
                  <Ext href="https://pubmed.ncbi.nlm.nih.gov/12654956/">
                    https://pubmed.ncbi.nlm.nih.gov/12654956/
                  </Ext>
                </div>
              </div>
              <div className="src">
                <div className="src-org">Cephalalgia, 2024</div>
                <div className="src-t">
                  Sebastianelli G, et al. Insights from triggers and prodromal symptoms: the
                  threshold hypothesis.
                </div>
                <div className="src-url">
                  <Ext href="https://journals.sagepub.com/doi/full/10.1177/03331024241287224">
                    https://journals.sagepub.com/doi/full/10.1177/03331024241287224
                  </Ext>
                </div>
              </div>
              <div className="src">
                <div className="src-org">Curr Pain Headache Rep, 2010</div>
                <div className="src-t">
                  Martin PR. Behavioral management of migraine headache triggers: learning to cope
                  with triggers.
                </div>
                <div className="src-url">
                  <Ext href="https://pubmed.ncbi.nlm.nih.gov/20425190/">
                    https://pubmed.ncbi.nlm.nih.gov/20425190/
                  </Ext>
                </div>
              </div>
              <div className="src">
                <div className="src-org">BMC Neurology, 2011</div>
                <div className="src-t">
                  Puschmann AK, Sommer C. Hypervigilance or avoidance of trigger related cues in
                  migraineurs?
                </div>
                <div className="src-url">
                  <Ext href="https://bmcneurol.biomedcentral.com/articles/10.1186/1471-2377-11-141">
                    https://bmcneurol.biomedcentral.com/articles/10.1186/1471-2377-11-141
                  </Ext>
                </div>
              </div>
              <div className="src">
                <div className="src-org">Pharmaceut Med, 2008</div>
                <div className="src-t">
                  Broderick JE. Electronic diaries: appraisal and current status.
                </div>
                <div className="src-url">
                  <Ext href="https://pmc.ncbi.nlm.nih.gov/articles/PMC2796846/">
                    https://pmc.ncbi.nlm.nih.gov/articles/PMC2796846/
                  </Ext>
                </div>
              </div>
              <div className="src">
                <div className="src-org">Cephalalgia（二次解析）</div>
                <div className="src-t">
                  前向き日記と振り返り質問票の一致度を検証した研究（20週間）
                </div>
                <div className="src-url">
                  <Ext href="https://pmc.ncbi.nlm.nih.gov/articles/PMC9060397/">
                    https://pmc.ncbi.nlm.nih.gov/articles/PMC9060397/
                  </Ext>
                </div>
              </div>
              <div className="src">
                <div className="src-org">Cephalalgia, 2017</div>
                <div className="src-t">
                  Peris F, et al. Towards improved migraine management: determining potential
                  trigger factors in individual patients.
                </div>
                <div className="src-url">
                  <Ext href="https://doi.org/10.1177/0333102416649761">
                    https://doi.org/10.1177/0333102416649761
                  </Ext>
                </div>
              </div>
              <div className="src">
                <div className="src-org">Pediatric review</div>
                <div className="src-t">
                  A Review on the Triggers of Pediatric Migraine with the Aim of Improving Headache
                  Education.
                </div>
                <div className="src-url">
                  <Ext href="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC7699367/">
                    https://www.ncbi.nlm.nih.gov/pmc/articles/PMC7699367/
                  </Ext>
                </div>
              </div>
              <div className="src">
                <div className="src-org">Neurology, 2019</div>
                <div className="src-t">
                  Do TP, et al. Red and orange flags for secondary headaches in clinical practice:
                  SNNOOP10 list.
                </div>
                <div className="src-url">
                  <Ext href="https://www.neurology.org/doi/10.1212/WNL.0000000000006697">
                    https://www.neurology.org/doi/10.1212/WNL.0000000000006697
                  </Ext>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>

      {/* FOOTER */}
      <div className="footer">
        <strong>頭痛トリガーの特定と管理</strong> — 記録から振り返りまでの実践ガイド
        <br />📅 作成年: 2026 | 次回レビュー推奨: ガイドライン更新時
        <br />
        ⚠️
        本ページは学術・教育・研究目的のみを対象としています。臨床への適用は必ず資格を持つ医療専門家の監督のもとで行ってください。
      </div>
    </div>
  );
}
