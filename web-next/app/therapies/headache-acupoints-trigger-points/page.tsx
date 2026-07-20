import { Ext } from "@/components/Ext";
import MermaidDiagram from "@/components/MermaidDiagram";
import Term from "@/components/glossary/Term";
import { HeadacheAcupointsSidebar } from "@/components/therapies/HeadacheAcupointsSidebar";
import "./headache-acupoints-trigger-points.css";

const ACP_MERMAID_THEME = {
  primaryColor: "#e6f3ee",
  primaryTextColor: "#1b5e20",
  primaryBorderColor: "#00695c",
  lineColor: "#0d47a1",
  secondaryColor: "#e0f2f1",
  tertiaryColor: "#e8f5e9",
  edgeLabelBackground: "#ffffff",
  fontSize: "13px",
};

export default function HeadacheAcupointsPage() {
  return (
    <div className="headache-acupoints-accent">
      {/* HERO */}
      <div className="hero">
        <div>🪡</div>
        <h1>頭痛と経穴 ― 肩井・肩外兪・膏肓・風池・天柱</h1>
        <p className="hero-sub">
          経穴とトリガーポイントの対応関係を国際文献から読み解く、初学者向けステップバイステップガイド
        </p>
        <div className="hero-tags">
          <span className="hero-tag">WHO標準経穴部位</span>
          <span className="hero-tag">ICHD-3</span>
          <span className="hero-tag">Cochraneレビュー</span>
          <span className="hero-tag">NICE</span>
          <span className="hero-tag">鍼治療のエビデンス</span>
          <span className="hero-tag">安全性</span>
        </div>
      </div>

      {/* DISCLAIMER */}
      <div className="disclaimer">
        <strong>⚠️ DisclaimerBanner／学術・教育目的に関する重要事項</strong>　本ページは
        <strong>
          教育・情報提供のみを目的として作成されたものであり、個別の患者に対する診断・治療の推奨ではありません
        </strong>
        。すべての内容は資格を持つ医療専門家による臨床適用前のレビューが必要です。症状がある場合は自己判断による鍼の自己施術や強い自己圧迫を行わず、医師・有資格の鍼灸師（はり師・きゅう師）にご相談ください。
      </div>

      {/* LAYOUT */}
      <div className="layout">
        {/* SIDEBAR */}
        <HeadacheAcupointsSidebar />

        {/* MAIN CONTENT */}
        <main className="main">
          {/* ====================================================== SECTION 1 */}
          <section id="s1" className="sec">
            <div className="sec-hd">
              <div className="sec-num">1</div>
              <h2 className="sec-title">この記事の位置づけ</h2>
            </div>

            <div className="card">
              <p>
                本ページは「頭痛の<Term id="trigger-point">トリガーポイント</Term>入門」の続編として、日本の鍼灸臨床でよく言及される5つの<Term id="acupoint">経穴</Term>（けいけつ）――
                <strong>
                  肩井（けんせい）・肩外兪（けんがいゆ）・膏肓（こうこう）・風池（ふうち）・天柱（てんちゅう）
                </strong>
                ――を取り上げ、これらが国際的にどのように位置づけられ、どの程度のエビデンスがあるのかを解説します。
              </p>
            </div>
          </section>

          {/* ====================================================== SECTION 2 */}
          <section id="s2" className="sec">
            <div className="sec-hd">
              <div className="sec-num">2</div>
              <h2 className="sec-title">経穴とトリガーポイントは同じものか</h2>
            </div>

            <p>
              経穴（アキュポイント）と筋膜性トリガーポイントは、歴史的にも地理的にも独立して発見された概念ですが、その関係は1970年代から国際的な研究テーマになっています。
            </p>

            <p>
              1977年、Melzackらは疼痛治療に用いられる筋膜性トリガーポイントと伝統的な経穴の位置を比較し、
              <strong>空間的分布において71%の対応</strong>
              があると報告しました。この結果は「トリガーポイントと経穴は、別々に発見され別々に名づけられたが、同一の現象を指しており、同様の神経機序で説明できる可能性がある」と結論づけられました。
            </p>

            <p>
              その後、2006年にDorsherがより大規模なデータベース（トリガーポイント255か所 対
              経穴386穴）で再検証したところ、<strong>解剖学的な対応率は92%</strong>
              まで上昇しました。一方で、この対応関係の解釈には学術的な論争があり、Birch(2003)は「対応するのはおそらく経絡上の経穴ではなく、圧痛点として扱われる阿是穴（あぜけつ）に限られる」と反論しています。
            </p>

            <div className="alert a-purple">
              <div className="alert-i">🔎</div>
              <div>
                <strong>ポイント：</strong>{" "}
                経穴とトリガーポイントの関係は「同一である」と断定できるものではなく、
                <strong>解剖学的に近接し、重なり合うことが多い</strong>
                という国際的な研究知見として理解するのが適切です。
              </div>
            </div>
          </section>

          {/* ====================================================== SECTION 3 */}
          <section id="s3" className="sec">
            <div className="sec-hd">
              <div className="sec-num">3</div>
              <h2 className="sec-title">各経穴の解剖学的位置（WHO標準に基づく）</h2>
            </div>

            <p>
              経穴の位置は、世界保健機関（WHO）西太平洋地域事務局が2008年に策定した
              <strong>
                WHO標準経穴部位（WHO Standard Acupuncture Point Locations in the Western Pacific
                Region）
              </strong>
              によって国際的に標準化されています。以下、今回取り上げる5穴のWHO標準に基づく位置と、関連する筋肉・神経を整理します。
            </p>

            <div className="tbl">
              <table>
                <thead>
                  <tr>
                    <th>経穴（読み）</th>
                    <th>経絡・国際コード</th>
                    <th>WHO標準に基づく位置</th>
                    <th>主に近接する筋肉・神経構造</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <strong>風池</strong>（ふうち）
                    </td>
                    <td>足少陽胆経 GB20</td>
                    <td>後頭部下方、胸鎖乳突筋と僧帽筋の起始部の間のくぼみ</td>
                    <td>後頭下筋群、大後頭神経、椎骨動脈</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>天柱</strong>（てんちゅう）
                    </td>
                    <td>足太陽膀胱経 BL10</td>
                    <td>後髪際から上方0.5寸、正中線から1.3寸外方、僧帽筋外縁のくぼみ</td>
                    <td>僧帽筋、半棘筋、大後頭神経</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>肩井</strong>（けんせい）
                    </td>
                    <td>足少陽胆経 GB21</td>
                    <td>大椎（第7頸椎棘突起下）と肩峰外端を結ぶ線の中点</td>
                    <td>僧帽筋上部</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>肩外兪</strong>（けんがいゆ）
                    </td>
                    <td>手太陽小腸経 SI14</td>
                    <td>第1胸椎棘突起下縁の外方3寸、肩甲挙筋の走行線上</td>
                    <td>肩甲挙筋</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>膏肓</strong>（こうこう）
                    </td>
                    <td>足太陽膀胱経 BL43</td>
                    <td>第4胸椎棘突起下縁の外方3寸</td>
                    <td>菱形筋、肩甲骨内側部</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="alert a-info">
              <div className="alert-i">ℹ️</div>
              <div>
                風池と天柱は、いずれも後頭下筋群・大後頭神経の近傍に位置し、頸部痛・こわばり・頸椎症に対する局所・遠隔穴の組み合わせとして、肩井・後渓等と共に臨床的によく組み合わせて用いられます。
              </div>
            </div>
          </section>

          {/* ====================================================== SECTION 4 */}
          <section id="s4" className="sec">
            <div className="sec-hd">
              <div className="sec-num">4</div>
              <h2 className="sec-title">頭痛のICHD-3分類との解剖学的な整合性</h2>
            </div>

            <p>これらの経穴が近接する筋肉は、筋膜性トリガーポイント研究の対象筋肉と重なります。</p>

            <div className="mmd">
              <div className="mmd-lbl">フローチャート — 経穴・筋肉・頭痛タイプの対応関係</div>
              <MermaidDiagram
                themeVariables={ACP_MERMAID_THEME}
                chart={`flowchart LR
    GB20["風池 (GB20)"] --> M1["後頭下筋群・胸鎖乳突筋起始部"] --> H1["緊張型頭痛・頸原性頭痛"]
    BL10["天柱 (BL10)"] --> M2["僧帽筋・半棘筋"] --> H1
    GB21["肩井 (GB21)"] --> M3["僧帽筋上部"] --> H2["緊張型頭痛（関連痛パターンと重なる部位）"]
    SI14["肩外兪 (SI14)"] --> M4["肩甲挙筋"] --> H3["頸原性頭痛（頸部可動域低下との関連）"]
    BL43["膏肓 (BL43)"] --> M5["菱形筋・肩甲骨内側部"] --> H4["肩甲間部の慢性緊張（頭痛への間接的関与）"]`}
              />
            </div>

            <p>
              ICHD-3では、緊張型頭痛は頭蓋周囲の圧痛の有無でサブタイプ分類され、頸原性頭痛は頸部の障害との因果関係（可動域低下・誘発手技での増悪など）を示すことが診断基準に含まれています。風池・天柱・肩井・肩外兪はいずれも、これらの診断基準で触診対象となりうる筋肉の上、またはごく近傍に位置している点が、解剖学的な特徴として指摘できます。ただし、
              <strong>経穴の圧痛の有無自体が頭痛の診断基準そのものではない</strong>
              ことに注意してください。
            </p>

            <div className="alert a-warn">
              <div className="alert-i">⚠️</div>
              <div>
                膏肓については、頭痛そのものより肩甲間部の慢性的なこわばりや全身倦怠感に対する伝統的な適応が中心であり、頭痛への関与は他の4穴に比べて
                <strong>間接的</strong>
                （僧帽筋・菱形筋を介した肩こりの一部としての関与）と位置づけるのが適切です。
              </div>
            </div>
          </section>

          {/* ====================================================== SECTION 5 */}
          <section id="s5" className="sec">
            <div className="sec-hd">
              <div className="sec-num">5</div>
              <h2 className="sec-title">エビデンスの質（概観）</h2>
            </div>

            <p>
              一般に、鍼治療（acupuncture）としての効果に関するエビデンスは、
              <strong>
                個々の経穴単位のRCTではなく、複数の経穴を組み合わせた治療プロトコル全体
              </strong>
              を対象に蓄積されています。風池・天柱・肩井などは、これらのプロトコルで頻用される代表的な経穴です。
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
                    <th>対象頭痛</th>
                    <th>情報源</th>
                    <th>エビデンス</th>
                    <th>代表的知見</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>緊張型頭痛（頻回・慢性）</td>
                    <td>Cochrane系統的レビュー（Linde et al., 2016, CD007587）</td>
                    <td>
                      <span className="bB">bB</span>
                    </td>
                    <td>
                      通常ケアに鍼治療を追加した2件の大規模試験で、頭痛頻度が半減した参加者の割合が対照群より高いと報告。ただし著者らは「効果は示唆されるが、他の治療法との比較試験がさらに必要」と結論
                    </td>
                  </tr>
                  <tr>
                    <td>反復性片頭痛の予防</td>
                    <td>Cochrane系統的レビュー（Linde et al., 2016, CD001218）</td>
                    <td>
                      <span className="bB">bB</span>
                    </td>
                    <td>
                      予防的鍼治療が有効である可能性を示す一方、試験間で鍼治療の内容（用いる経穴等）が大きく異なる点が限界として指摘されている
                    </td>
                  </tr>
                  <tr>
                    <td>頻回な緊張型頭痛</td>
                    <td>NICE CG150（英国）</td>
                    <td>
                      <span className="bB">bB</span>
                    </td>
                    <td>
                      月15日以上の緊張型頭痛に対し、最大10回程度の鍼治療のコースが選択肢として提示されている
                    </td>
                  </tr>
                  <tr>
                    <td>個別経穴（風池・天柱・肩井等）単独の効果</td>
                    <td>—</td>
                    <td>
                      <span className="bU">bU</span>
                    </td>
                    <td>
                      個別の経穴を単独で検証した質の高いRCTは少なく、上記レビューは経穴の組み合わせ全体を対象としたものである点に注意
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="alert a-info">
              <div className="alert-i">ℹ️</div>
              <div>
                <strong>重要：</strong>{" "}
                上記はいずれも「鍼治療という介入カテゴリー」全体としての相対的エビデンスであり、特定の経穴・特定の刺激方法の優位性を主張するものではありません。具体的な適用は必ず医師・有資格の鍼灸師にご相談ください。
              </div>
            </div>
          </section>

          {/* ====================================================== SECTION 6 */}
          <section id="s6" className="sec">
            <div className="sec-hd">
              <div className="sec-num">6</div>
              <h2 className="sec-title">安全性に関する重要事項</h2>
            </div>

            <p>
              風池・天柱・肩井・肩外兪・膏肓は、いずれも
              <strong>解剖学的に注意を要する構造の近くに位置する経穴</strong>です。
            </p>

            <div className="pt-grid">
              <div className="pt">
                <div className="pt-name">風池・天柱</div>
                <div className="pt-code">GB20 / BL10</div>
                <div className="pt-tx">
                  延髄や椎骨動脈に近接するため、刺入の深さ・方向には専門的な解剖学的知識が必要です。
                </div>
              </div>
              <div className="pt">
                <div className="pt-name">肩外兪・膏肓</div>
                <div className="pt-code">SI14 / BL43</div>
                <div className="pt-tx">
                  胸郭に近く、不適切な刺入は気胸（肺に穴があき空気が漏れる状態）のリスクがあることが、国際的な鍼安全性文献で指摘されています。
                </div>
              </div>
            </div>

            <p>
              世界保健機関(WHO)は鍼治療の基礎訓練と安全性に関する国際的なガイドラインを策定しており、施術者の適切な解剖学的知識と訓練の重要性を強調しています。
            </p>

            <div className="alert a-danger">
              <div className="alert-i">🚫</div>
              <div>
                <strong>
                  鍼治療は必ず有資格者（医師、またはその国・地域で認められた鍼灸師免許を持つ施術者）が行うべきであり、自己判断での鍼の自己施術は行うべきではありません
                </strong>
                。自己ケアとして許容されるのは、指や手のひらによる軽い指圧程度にとどめてください。
              </div>
            </div>
          </section>

          {/* ====================================================== SECTION 7 */}
          <section id="s7" className="sec">
            <div className="sec-hd">
              <div className="sec-num">7</div>
              <h2 className="sec-title">専門家への相談の流れと危険信号</h2>
            </div>

            <div className="mmd">
              <div className="mmd-lbl">
                フローチャート — セルフケアから専門家相談までの一般的な流れ
              </div>
              <MermaidDiagram
                themeVariables={ACP_MERMAID_THEME}
                chart={`flowchart TD
    Q["頭痛・肩こりの症状がある"] --> RF{"SNOOP10に該当する危険信号があるか"}
    RF -->|"該当あり"| ER["医療機関を受診（最優先）"]
    RF -->|"該当なし"| DX["医師による頭痛の分類 (ICHD-3)"]
    DX --> TTHc["緊張型頭痛・頸原性頭痛の可能性が示唆される"]
    TTHc --> ACU{"鍼治療などの補完的アプローチを検討するか"}
    ACU -->|"検討する"| LIC["有資格の鍼灸師・医師に相談"]
    ACU -->|"検討しない"| OTHER["他の一般的な介入(用手療法等)を医師と相談"]
    LIC --> POINTS["風池・天柱・肩井・肩外兪・膏肓 等の圧痛・状態を評価"]
    POINTS --> PLAN["個別の治療計画（頻度・刺激強度は施術者が判断）"]`}
              />
            </div>

            <h3>見逃してはいけない危険信号（SNOOP10）</h3>
            <p>
              以下のいずれかに該当する場合は、経穴や鍼治療を検討するより先に、
              <strong>速やかに医療機関を受診</strong>してください。
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
                <div className="sn-symp">頭痛の性質・頻度・強さが急に変わった</div>
                <div className="sn-dx">要 受診</div>
              </div>
              <div className="sn">
                <div className="sn-letter">+10</div>
                <div className="sn-title">その他の項目</div>
                <div className="sn-symp">
                  体位による変化、咳・力みによる誘発、妊娠中、外傷後、鎮痛薬の使用過多 等
                </div>
                <div className="sn-dx">要 受診</div>
              </div>
            </div>
          </section>

          {/* ====================================================== SECTION 8 */}
          <section id="s8" className="sec">
            <div className="sec-hd">
              <div className="sec-num">8</div>
              <h2 className="sec-title">一般的なセルフケアの方向性・よくある誤解</h2>
            </div>

            <div className="card">
              <ul>
                <li>
                  風池・天柱・肩井の周辺は、<strong>軽い指圧程度</strong>
                  であれば一般的なセルフケアとして語られることがありますが、強さ・回数・時間などの具体的な処方は個別性が高く、本ページでは提示しません。
                </li>
                <li>
                  膏肓・肩外兪は解剖学的に胸郭に近いため、
                  <strong>自己判断での強い圧迫や器具を用いた刺激は避けてください</strong>。
                </li>
                <li>
                  症状が続く場合、自己流のケアを継続するのではなく、医師または有資格の鍼灸師に相談し、その方の状態に合った指導を受けてください。
                </li>
              </ul>
            </div>

            <h3>よくある誤解</h3>
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
                    <td>経穴とトリガーポイントは完全に同じものである</td>
                    <td>
                      解剖学的に高い割合で近接するという研究報告はあるが、「同一である」という結論は国際的に一致していない
                    </td>
                  </tr>
                  <tr>
                    <td>これらの経穴を刺激すれば頭痛が必ず改善する</td>
                    <td>
                      鍼治療全体としては中等度のエビデンスがあるが、個別経穴単独の効果を裏づける質の高いRCTは限られる
                    </td>
                  </tr>
                  <tr>
                    <td>素人でも風池・天柱に鍼を打っても安全</td>
                    <td>延髄・椎骨動脈に近接するため、有資格者による適切な解剖学的知識が不可欠</td>
                  </tr>
                  <tr>
                    <td>膏肓は頭痛の特効穴である</td>
                    <td>
                      伝統的には全身の消耗性疾患・肩甲間部のこわばりへの適応が中心で、頭痛への関与は他の4穴に比べて間接的
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
              <h2 className="sec-title">参考文献・情報源</h2>
            </div>

            <p>
              一次情報（国際機関のガイドライン・原著論文・系統的レビュー）を優先し、要約サイトは補助的にも使用していません。
            </p>

            <div className="src-grid">
              <div className="src">
                <div className="src-org">WHO 西太平洋地域事務局</div>
                <div className="src-t">
                  WHO Standard Acupuncture Point Locations in the Western Pacific Region (2008)
                </div>
                <div className="src-url">
                  <Ext href="https://iris.who.int/handle/10665/353407">
                    iris.who.int — WHO標準経穴部位
                  </Ext>
                </div>
              </div>
              <div className="src">
                <div className="src-org">WHO</div>
                <div className="src-t">
                  Guidelines on Basic Training and Safety in Acupuncture (1999)
                </div>
                <div className="src-url">
                  <Ext href="https://apps.who.int/medicinedocs/en/d/Jwhozip56e/">
                    apps.who.int — 鍼安全性ガイドライン
                  </Ext>
                </div>
              </div>
              <div className="src">
                <div className="src-org">Pain（原著論文）</div>
                <div className="src-t">
                  Melzack R, Stillwell DM, Fox EJ. Trigger points and acupuncture points for pain:
                  correlations and implications. 1977;3(1):3-23.
                </div>
                <div className="src-url">
                  <Ext href="https://www.sciencedirect.com/science/article/abs/pii/030439597790032X">
                    sciencedirect.com — Melzack 1977
                  </Ext>
                </div>
              </div>
              <div className="src">
                <div className="src-org">Medical Acupuncture（原著論文）</div>
                <div className="src-t">
                  Dorsher PT. Trigger points and acupuncture points: Anatomic and clinical
                  correlations. 2006;17(3):21-25.
                </div>
                <div className="src-url">
                  <Ext href="https://www.researchgate.net/publication/284046558_Trigger_points_and_acupuncture_points_Anatomic_and_clinical_correlations">
                    researchgate.net — Dorsher 2006
                  </Ext>
                </div>
              </div>
              <div className="src">
                <div className="src-org">J Altern Complement Med（原著論文）</div>
                <div className="src-t">
                  Birch S. Trigger point-acupuncture point correlations revisited. 2003;9(1):91-103.
                </div>
                <div className="src-url">
                  <Ext href="https://pubmed.ncbi.nlm.nih.gov/12676038/">
                    pubmed.ncbi.nlm.nih.gov — Birch 2003
                  </Ext>
                </div>
              </div>
              <div className="src">
                <div className="src-org">Cochrane Library</div>
                <div className="src-t">
                  Linde K et al. Acupuncture for the prevention of tension-type headache.
                  2016;CD007587.
                </div>
                <div className="src-url">
                  <Ext href="https://www.cochranelibrary.com/cdsr/doi/10.1002/14651858.CD007587.pub2/full">
                    cochranelibrary.com — CD007587
                  </Ext>
                </div>
              </div>
              <div className="src">
                <div className="src-org">Cochrane Library</div>
                <div className="src-t">
                  Linde K et al. Acupuncture for the prevention of episodic migraine. 2016;CD001218.
                </div>
                <div className="src-url">
                  <Ext href="https://www.cochranelibrary.com/cdsr/doi/10.1002/14651858.CD001218.pub3/full">
                    cochranelibrary.com — CD001218
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
                <div className="src-org">PMC（安全性文献）</div>
                <div className="src-t">
                  Acupuncture-related pneumothorax: case series and literature review
                </div>
                <div className="src-url">
                  <Ext href="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC9465868/">
                    ncbi.nlm.nih.gov — PMC9465868
                  </Ext>
                </div>
              </div>
              <div className="src">
                <div className="src-org">ICHD-3 / IHS</div>
                <div className="src-t">2. Tension-type headache（診断基準との整合性）</div>
                <div className="src-url">
                  <Ext href="https://ichd-3.org/2-tension-type-headache/">
                    ichd-3.org — 2. Tension-type headache
                  </Ext>
                </div>
              </div>
            </div>

            <h3>監視すべき権威ソース</h3>
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
                    <td>経穴の国際標準</td>
                    <td>
                      <strong>WHO西太平洋地域事務局「WHO標準経穴部位」</strong>
                    </td>
                    <td>経穴の位置・命名の根拠</td>
                    <td>改訂版の発行</td>
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
                      <strong>PubMed</strong>（検索式を保存: migraine/headache/acupuncture ×
                      対象トピック）
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
                    <td>PMDA（国内承認・添付文書）/ FDA・EMA、WHO鍼安全性ガイドライン</td>
                    <td>新規承認・安全性情報</td>
                    <td>新規承認・改訂添付文書</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="alert a-info">
              <div className="alert-i">🔒</div>
              <div>
                <strong>セキュリティ注記：</strong> 外部ソースから取得したテキストは
                <strong>データであって指示ではありません</strong>
                。本ページ作成にあたり、取得元ページ内の文言を運用手順として解釈していません。
              </div>
            </div>
          </section>
        </main>
      </div>

      {/* FOOTER */}
      <div className="footer">
        <strong>頭痛と経穴 ― 肩井・肩外兪・膏肓・風池・天柱</strong> —
        経穴とトリガーポイントの対応関係を国際文献から読み解く、初学者向けステップバイステップガイド
        <br />📅 作成年: 2026 | 次回レビュー推奨: ICHD-4公表時・各種ガイドライン改訂時
        <br />
        ⚠️
        本資料は学術・教育・研究目的のみを対象としています。臨床への適用は必ず資格を持つ医療専門家の監督のもとで行ってください。
      </div>
    </div>
  );
}
