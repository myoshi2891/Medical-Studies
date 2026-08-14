import type { Metadata } from "next";
import "./headache-and-straight-neck.css";
import { StraightNeckSidebar } from "@/components/anatomy/StraightNeckSidebar";
import { RelatedLinks } from "@/components/content/RelatedLinks";
import { Ext } from "@/components/Ext";
import AutoGlossary from "@/components/glossary/AutoGlossary";
import MermaidDiagram from "@/components/MermaidDiagram";

export const metadata: Metadata = {
  title: "頭痛とストレートネック — エビデンスに基づく医学教育ガイド",
  description:
    "Forward Head Posture（頭部前方位）と頭痛の関係について、ICHD-3、三叉神経頸髄核における収束メカニズム、エビデンスに基づく対処法を解剖学的に解説します。",
};

const STRAIGHT_NECK_MERMAID_THEME: Record<string, string> = {
  primaryColor: "#e5f4f2",
  primaryTextColor: "#132a56",
  primaryBorderColor: "#12977e",
  lineColor: "#0f6674",
  secondaryColor: "#e0f2f1",
  tertiaryColor: "#e8f5e9",
  edgeLabelBackground: "#ffffff",
  fontSize: "13px",
};

const DIAGRAM_1 = `flowchart TD
ROOT["頭痛\\nHeadache"] --> PRIM["一次性頭痛\\nPrimary Headache"]
ROOT --> SEC["二次性頭痛\\nSecondary Headache"]
PRIM --> M["片頭痛\\nMigraine"]
PRIM --> T["緊張型頭痛\\nTension-Type Headache"]
PRIM --> CL["群発頭痛\\nCluster Headache"]
SEC --> CGH["頸原性頭痛\\nCervicogenic Headache\\nICHD-3 第11.2.1項"]
SEC --> OTHER["その他の二次性頭痛\\n外傷後・血管障害・感染症など"]`;

const DIAGRAM_2 = `flowchart TD
A["長時間のスマートフォン・PC使用"] --> B["頭部が前方へ移動\\nForward Head Posture"]
B --> C["頸椎前弯の減少\\nいわゆる「ストレートネック」"]
C --> D["頭部を支える力学的負荷の増加\\nHansraj, 2014"]
D --> E["後頭下筋群・僧帽筋の持続的な過緊張"]
E --> F["上位頸神経（C1-C3）の感作・刺激"]
F --> G["三叉神経頸髄核での感覚の収束\\nTrigeminocervical Nucleus"]
G --> H["脳が痛みを「頭部由来」と誤って認識"]
H --> I["緊張型頭痛 / 頸原性頭痛として自覚される"]`;

const DIAGRAM_3 = `flowchart TD
START["頭痛がある"] --> Q1{"突然発症し数分でピークに達する\\n「人生最悪の頭痛」か？"}
Q1 -->|"はい"| ER["直ちに救急受診\\nくも膜下出血などの除外が必要"]
Q1 -->|"いいえ"| Q2{"発熱・首の硬直・意識障害・\\n視覚異常・手足の麻痺を伴うか？"}
Q2 -->|"はい"| ER
Q2 -->|"いいえ"| Q3{"頭部への外傷後に生じた、\\nまたは50歳以降に初めて生じたか？"}
Q3 -->|"はい"| DOC["早めに医療機関を受診"]
Q3 -->|"いいえ"| Q4{"頻度や強さが\\n徐々に悪化しているか？"}
Q4 -->|"はい"| DOC
Q4 -->|"いいえ"| SELF["セルフケア＋経過観察\\n改善しなければ受診"]`;

/**
 * Presents an evidence-based educational guide about headaches and forward head posture.
 */
export default function HeadacheAndStraightNeckPage() {
  return (
    <div className="straight-neck">
      {/* HERO */}
      <div className="hero">
        <div>🧠</div>
        <h1>頭痛とストレートネック</h1>
        <p className="hero-sub">
          Forward Head Posture と頭痛の関係 — 国際的エビデンスに基づく教育ガイド
        </p>
        <div className="hero-tags">
          <span className="hero-tag">ICHD-3</span>
          <span className="hero-tag">WHO</span>
          <span className="hero-tag">NIH / PubMed</span>
          <span className="hero-tag">Cervicogenic Headache</span>
          <span className="hero-tag">Forward Head Posture</span>
          <span className="hero-tag">Evidence-Based</span>
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
        <StraightNeckSidebar />

        {/* MAIN CONTENT */}
        <main className="main">
          <AutoGlossary>
            {/* SECTION 1 */}
            <section id="s1" className="sec">
              <div className="sec-hd">
                <div className="sec-num">1</div>
                <h2 className="sec-title">頭痛の全体像を知る</h2>
              </div>

              <p>
                頭痛性疾患は、世界保健機関（WHO）によれば全世界で最も頻度の高い神経疾患の一つです。片頭痛は脳卒中・新生児脳症に次いで世界第3位のDALY（障害調整生命年）原因とされています{" "}
                <span className="bB">WHO</span>
                。2023年時点のGlobal Burden of
                Disease研究では、世界で約29億人が何らかの頭痛性疾患の影響を受けており、年齢調整有病率は34.6%と報告されています{" "}
                <span className="bA">GBD 2023</span>。
              </p>

              <div className="alert a-info">
                <div className="alert-i">ℹ️</div>
                <div>
                  頭痛は「珍しい病気」ではなく「人類の大多数が経験する、しかし軽視されやすい疾患」です。
                </div>
              </div>

              <h3>頭痛の国際的分類（ICHD-3）</h3>
              <p>
                頭痛の国際的な診断基準は、国際頭痛学会（International Headache Society）が策定する
                <strong>国際頭痛分類第3版（ICHD-3）</strong>
                です。ICHD-3は頭痛を大きく「一次性頭痛（それ自体が疾患）」と「二次性頭痛（他の疾患が原因）」に分けています。
              </p>

              <div className="mmd">
                <div className="mmd-lbl">フローチャート — ICHD-3による頭痛の分類</div>
                <MermaidDiagram chart={DIAGRAM_1} themeVariables={STRAIGHT_NECK_MERMAID_THEME} />
              </div>

              <p>
                本ガイドのテーマである「ストレートネックと頭痛」は、主に <strong>緊張型頭痛</strong>{" "}
                と <strong>頸原性頭痛（cervicogenic headache）</strong> の2つに関わってきます。
              </p>

              <h3>主要な頭痛タイプの比較</h3>
              <div className="tbl">
                <table>
                  <thead>
                    <tr>
                      <th>特徴</th>
                      <th>緊張型頭痛</th>
                      <th>片頭痛</th>
                      <th>頸原性頭痛</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>痛みの性質</td>
                      <td>締め付けられる・圧迫されるような痛み</td>
                      <td>ズキズキとした拍動性の痛み</td>
                      <td>片側性で、首の後ろから頭部へ広がる痛み</td>
                    </tr>
                    <tr>
                      <td>主な部位</td>
                      <td>両側性が多い</td>
                      <td>片側性が多い</td>
                      <td>片側性（首の動きで誘発・悪化）</td>
                    </tr>
                    <tr>
                      <td>よくある随伴症状</td>
                      <td>首・肩の筋肉のこわばり</td>
                      <td>光過敏・音過敏・吐き気</td>
                      <td>頸部可動域の制限、首を押すと痛みが再現される</td>
                    </tr>
                    <tr>
                      <td>分類上の位置づけ</td>
                      <td>一次性頭痛</td>
                      <td>一次性頭痛</td>
                      <td>二次性頭痛（首の構造的問題に起因）</td>
                    </tr>
                    <tr>
                      <td>出典</td>
                      <td>Cleveland Clinic</td>
                      <td>WHO</td>
                      <td>StatPearls（NIH）／Cleveland Clinic</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* SECTION 2 */}
            <section id="s2" className="sec">
              <div className="sec-hd">
                <div className="sec-num">2</div>
                <h2 className="sec-title">「ストレートネック」とは何か</h2>
              </div>

              <h3>頸椎の基本構造</h3>
              <p>
                頸椎（首の骨）は7個の椎骨（C1〜C7）から構成されており、健康な状態では前方に緩やかに湾曲した「生理的前弯（cervical
                lordosis）」というC字型のカーブを描いています。この前弯は、頭部（成人でおよそ4.5〜5.5kg）の重さを効率よく支え、衝撃を分散させるための構造です。健康な頸椎前弯角度は、立位側面X線でおおむね
                <strong>20〜40度</strong>
                の範囲とされますが、個人差は大きい点に留意が必要です。
              </p>

              <div className="alert a-purple">
                <div className="alert-i">📌</div>
                <div>
                  「ストレートネック」は日本で広く使われる通称ですが、国際的な医学文献ではおおむね以下の用語が対応する概念として扱われています。
                  <ul style={{ marginTop: 6 }}>
                    <li>
                      <strong>Loss of cervical lordosis</strong>
                      （頸椎前弯の減少・消失）
                    </li>
                    <li>
                      <strong>Forward Head Posture, FHP</strong>（頭部前方位）
                    </li>
                    <li>
                      <strong>Military neck</strong>
                      （前弯が失われ真っ直ぐになった状態の通称）
                    </li>
                  </ul>
                </div>
              </div>

              <h3>なぜ首がまっすぐになってしまうのか</h3>
              <p>
                長時間のスマートフォンやパソコンの使用、デスクワーク中の前かがみ姿勢などにより、頭部が肩よりも前方に移動した状態が慢性的に続くと、頸椎を支える筋肉のバランスが崩れ、前弯が徐々に失われていくと考えられています。この状態は「テックネック（tech
                neck）」「テキストネック（text neck）」とも呼ばれます。
              </p>

              <h3>頭部前方位を測る指標：頭蓋脊椎角（CVA）</h3>
              <p>
                臨床研究では、頭部前方位の程度を{" "}
                <strong>頭蓋脊椎角（Craniovertebral Angle, CVA）</strong>{" "}
                という指標で数値化することが一般的です。これは、耳垂（耳たぶ）と第7頸椎棘突起を結ぶ線と、水平線がなす角度で、この角度が小さいほど頭部が前方に突出していることを意味します。
              </p>
            </section>

            {/* SECTION 3 */}
            <section id="s3" className="sec">
              <div className="sec-hd">
                <div className="sec-num">3</div>
                <h2 className="sec-title">なぜ姿勢が頭痛を引き起こしうるのか（メカニズム）</h2>
              </div>

              <h3>力学的負荷：頭を傾けるほど首への負担は跳ね上がる</h3>
              <p>
                米国の脊椎外科医Kenneth
                Hansraj氏による2014年の生体力学研究は、頭部の前傾角度が増えるごとに頸椎にかかる負荷（相対的な重み）がどれほど増加するかを定量化しました。
              </p>

              <div className="tbl">
                <table className="th-teal">
                  <thead>
                    <tr>
                      <th>頭部の前傾角度</th>
                      <th>頸椎にかかる相対的な負荷</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>0°（耳が肩の真上にある自然な姿勢）</td>
                      <td>約4.5〜5.5kg（頭部本来の重さ）</td>
                    </tr>
                    <tr>
                      <td>15°</td>
                      <td>約12kg</td>
                    </tr>
                    <tr>
                      <td>30°</td>
                      <td>約18kg</td>
                    </tr>
                    <tr>
                      <td>45°</td>
                      <td>約22kg</td>
                    </tr>
                    <tr>
                      <td>60°（スマートフォンを見る際の典型的な角度）</td>
                      <td>約27kg</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p style={{ fontSize: "12.5px", color: "var(--g6)" }}>
                出典：Hansraj, K. K. (2014). <em>Surgical Technology International</em>, 25,
                277–279（本記事末尾の参考文献[7]を参照）。今日の生活習慣に伴う頸部負荷を象徴するデータとしてしばしば引用されますが、単一の生体力学モデルに基づく試算である点には留意が必要です。
              </p>

              <h3>筋の持続的緊張と緊張型頭痛</h3>
              <p>
                Cleveland
                Clinicの解説によれば、緊張型頭痛は後頭部から首、頭皮にかけての筋肉の緊張が関与していると考えられており、その誘因として睡眠不足・不良姿勢・ストレスが挙げられています。頭部前方位が続くと、後頭下筋群や僧帽筋上部は頭の重みを支え続けるために持続的に収縮し、筋の過緊張・血流低下・痛覚過敏を招くと考えられています。
              </p>

              <h3>神経学的メカニズム：三叉神経頸髄核における「収束」</h3>
              <p>
                頸部由来の痛みがなぜ「頭痛」として感じられるのか。その鍵となるのが{" "}
                <strong>三叉神経頸髄核（trigeminocervical nucleus）</strong>{" "}
                です。NIHの医学教育資料（StatPearls）によると、上位頸神経（C1〜C3）は、顔面や頭部の感覚を伝える三叉神経の脊髄路核と、脳幹〜上位頸髄のレベルで神経学的に収束（合流）しています。この収束構造のために、本来は首から発生した痛み信号が、脳内では「頭部から来た痛み」として誤って認識されることがあります。
              </p>

              <div className="mmd">
                <div className="mmd-lbl">フローチャート — 姿勢から頭痛が生じるまでの経路</div>
                <MermaidDiagram chart={DIAGRAM_2} themeVariables={STRAIGHT_NECK_MERMAID_THEME} />
              </div>

              <h3>頸原性頭痛の国際診断基準（ICHD-3 第11.2.1項）</h3>
              <p>ICHD-3における頸原性頭痛の診断は、大まかに以下の要件で構成されています。</p>
              <ul>
                <li>
                  頭痛の原因として、頸椎または頸部軟部組織の障害・病変が臨床的または画像的に確認できること
                </li>
                <li>
                  以下のうち少なくとも2つで、頸部の問題と頭痛の因果関係が示されること
                  <ol>
                    <li>頸部の障害の発症と時間的に一致して頭痛が始まった</li>
                    <li>頸部の障害の改善と並行して頭痛が改善・消失した</li>
                    <li>頸部の可動域が制限されており、誘発動作で頭痛が明らかに悪化する</li>
                    <li>頸部の構造やその神経支配への診断的ブロック注射で頭痛が消失する</li>
                  </ol>
                </li>
                <li>他のICHD-3診断ではうまく説明できないこと</li>
              </ul>
            </section>

            {/* SECTION 4 */}
            <section id="s4" className="sec">
              <div className="sec-hd">
                <div className="sec-num">4</div>
                <h2 className="sec-title">科学的エビデンスは何を示しているか</h2>
              </div>

              <p>
                姿勢と頭痛の関係は、臨床的には広く語られる一方で、研究者の間では
                <strong>まだ議論が続いているテーマ</strong>
                です。誠実な理解のために、代表的な研究を紹介します。
              </p>

              <div className="evidence-legend">
                <span className="evidence-legend-title">エビデンス区分：</span>
                <span className="bA">システマティックレビュー／メタ分析（最高レベル）</span>
                <span className="bB">ランダム化比較試験（RCT）</span>
                <span className="bC">横断研究／観察研究</span>
                <span className="bU">専門家見解／ポジションペーパー</span>
              </div>

              <div className="tbl">
                <table className="th-purple">
                  <thead>
                    <tr>
                      <th>研究</th>
                      <th>デザイン</th>
                      <th>対象規模</th>
                      <th>主な知見</th>
                      <th>エビデンス</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Mahmoud et al., 2019</td>
                      <td>システマティックレビュー＋メタ分析</td>
                      <td>15研究・2,339人</td>
                      <td>
                        頸部痛のある人はFHPの角度が有意に大きい（平均差4.84度）。ただし因果関係の証明にはなお議論の余地があると結論
                      </td>
                      <td>
                        <span className="bA">SR／メタ分析</span>
                      </td>
                    </tr>
                    <tr>
                      <td>Usen &amp; Demiroz Gunduz, 2025</td>
                      <td>横断研究</td>
                      <td>117人（FHPを有する頸部痛患者）</td>
                      <td>
                        FHP患者の53.8%が頸原性頭痛を併発。CVAが小さい（頭部前方位が強い）ほど頸原性頭痛のリスクが高い
                      </td>
                      <td>
                        <span className="bC">横断研究</span>
                      </td>
                    </tr>
                    <tr>
                      <td>Fernández-de-las-Peñas ら, 2022</td>
                      <td>専門家によるポジションペーパー</td>
                      <td>—</td>
                      <td>
                        緊張型頭痛患者にも頭部前方位・頸部可動域制限・頸部感作が共通してみられると報告
                      </td>
                      <td>
                        <span className="bU">専門家見解</span>
                      </td>
                    </tr>
                    <tr>
                      <td>Jull et al., 2002</td>
                      <td>ランダム化比較試験（RCT）</td>
                      <td>200人（頸原性頭痛患者）</td>
                      <td>
                        頸部エクササイズと徒手療法により、12ヶ月後も頭痛の頻度・強度が有意に改善（対照群と比較）
                      </td>
                      <td>
                        <span className="bB">RCT</span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="alert a-warn">
                <div className="alert-i">⚖️</div>
                <div>
                  Mahmoud
                  らのレビュー（2019）が明言しているように、「頭部前方位が頸部痛や頭痛の“原因”である」という主張は、依然として
                  <strong>議論の的</strong>
                  です。多くの研究は横断研究（ある一時点での相関関係を見る研究）であり、「姿勢が悪いから頭痛になる」のか「頭痛や頸部の問題があるから姿勢が崩れる」のか、因果の向きを完全には特定できていません。統計的な関連は繰り返し報告されていますが、単純な一方向の因果関係と断定するのは時期尚早です。
                </div>
              </div>
            </section>

            {/* SECTION 5 */}
            <section id="s5" className="sec">
              <div className="sec-hd">
                <div className="sec-num">5</div>
                <h2 className="sec-title">セルフチェックの方法</h2>
              </div>

              <div className="alert a-info">
                <div className="alert-i">ℹ️</div>
                <div>
                  以下は一般的な教育目的のセルフチェックであり、
                  <strong>医学的診断ではありません</strong>。
                </div>
              </div>

              <div className="qr-grid">
                <div className="qr">
                  <div className="qr-t">① 壁を使ったチェック</div>
                  <p style={{ margin: 0, fontSize: "13px" }}>
                    かかと・お尻・肩甲骨を壁につけて自然に立ったとき、後頭部が無理なく壁につくかどうかを確認する。頭を大きく前に出さないと壁につかない場合、頭部前方位の可能性があります。
                  </p>
                </div>
                <div className="qr">
                  <div className="qr-t">② 横からの写真チェック</div>
                  <p style={{ margin: 0, fontSize: "13px" }}>
                    リラックスした状態で真横から全身写真を撮り、耳の穴の位置が肩の中心（肩峰）の真上にあるかを確認する。耳が肩よりも明らかに前に出ている場合、頭部前方位のサインである可能性があります。
                  </p>
                </div>
                <div className="qr">
                  <div className="qr-t">③ 症状のセルフモニタリング</div>
                  <p style={{ margin: 0, fontSize: "13px" }}>
                    後頭部から始まる片側性の頭痛、首を動かすと悪化する頭痛、首・肩のこわばりを伴う頭痛がある場合は、頸部由来の頭痛の可能性を考慮し、専門家に相談することが推奨されます。
                  </p>
                </div>
              </div>
            </section>

            {/* SECTION 6 */}
            <section id="s6" className="sec">
              <div className="sec-hd">
                <div className="sec-num">6</div>
                <h2 className="sec-title">危険な頭痛のサイン（レッドフラッグ）</h2>
              </div>

              <p>
                姿勢由来の頭痛の多くは良性ですが、
                <strong>まれに緊急性の高い病気が背景にある頭痛</strong>
                も存在します。英国国民保健サービス（NHS）は、以下のような症状がある場合はただちに医療機関を受診するよう案内しています。
              </p>

              <div className="snoop-grid">
                <div className="sn">
                  <div className="sn-letter">01</div>
                  <div className="sn-title">雷鳴頭痛</div>
                  <div className="sn-symp">突然発症し、数分でピークに達する「人生最悪の頭痛」</div>
                  <div className="sn-dx">要：くも膜下出血の除外</div>
                </div>
                <div className="sn">
                  <div className="sn-letter">02</div>
                  <div className="sn-title">随伴する神経症状</div>
                  <div className="sn-symp">
                    発熱・首の硬直・意識障害・視覚異常・手足の麻痺を伴う頭痛
                  </div>
                  <div className="sn-dx">要：緊急受診</div>
                </div>
                <div className="sn">
                  <div className="sn-letter">03</div>
                  <div className="sn-title">外傷後・遅発性</div>
                  <div className="sn-symp">
                    頭部外傷後に生じた頭痛、または50歳以降に初めて生じた頭痛
                  </div>
                  <div className="sn-dx">要：早期受診</div>
                </div>
                <div className="sn">
                  <div className="sn-letter">04</div>
                  <div className="sn-title">進行性の悪化</div>
                  <div className="sn-symp">頻度や強さが時間とともに徐々に悪化していく頭痛</div>
                  <div className="sn-dx">要：早期受診</div>
                </div>
              </div>

              <div className="mmd">
                <div className="mmd-lbl">フローチャート — 受診要否の判断</div>
                <MermaidDiagram chart={DIAGRAM_3} themeVariables={STRAIGHT_NECK_MERMAID_THEME} />
              </div>

              <div className="alert a-danger">
                <div className="alert-i">🚨</div>
                <div>
                  上記のいずれかに該当する場合は、本ガイドのようなセルフケア情報を参照する前に、必ず医療機関を受診してください。
                </div>
              </div>
            </section>

            {/* SECTION 7 */}
            <section id="s7" className="sec">
              <div className="sec-hd">
                <div className="sec-num">7</div>
                <h2 className="sec-title">エビデンスに基づく対処法</h2>
              </div>

              <h3>運動療法：頸部エクササイズの効果</h3>
              <p>
                頸原性頭痛に関する系統的レビューは、頸部エクササイズ（特に深頸屈筋の強化を含むcraniocervical
                flexion
                exercise）や徒手療法が、頭痛の頻度と強度の改善に有効である可能性を報告しています。特にJullら（2002）のRCTでは、6週間の頸部エクササイズ（背臥位での等尺性craniocervical
                flexion運動、肩甲骨のretraction、姿勢指導など）を行った群で、12ヶ月後も頭痛の頻度・強度・頸部痛指数の有意な改善が維持されていました。
              </p>

              <h3>推奨される日常的なセルフケア</h3>
              <div className="drug-grid">
                <div className="drug">
                  <div className="drug-nm">こまめな運動</div>
                  <div className="drug-br">Cleveland Clinic</div>
                  <div className="drug-tx">
                    長時間同じ姿勢を続けず、こまめに動く（&quot;motion is lotion&quot;の考え方）
                  </div>
                </div>
                <div className="drug">
                  <div className="drug-nm">ストレッチ</div>
                  <div className="drug-br">Cleveland Clinic</div>
                  <div className="drug-tx">首・肩のストレッチを日常的に取り入れる</div>
                </div>
                <div className="drug">
                  <div className="drug-nm">デスク環境の見直し</div>
                  <div className="drug-br">Cleveland Clinic</div>
                  <div className="drug-tx">
                    モニターの高さ、椅子の高さなどエルゴノミクスを調整する
                  </div>
                </div>
                <div className="drug">
                  <div className="drug-nm">休養・水分・食事</div>
                  <div className="drug-br">NHS</div>
                  <div className="drug-tx">
                    十分な休養・水分摂取・規則正しい食事、リラックスできる活動（運動、ヨガ、マッサージなど）
                  </div>
                </div>
              </div>

              <div className="alert a-warn">
                <div className="alert-i">💊</div>
                <div>
                  NHSは、鎮痛薬の使用は<strong>月10〜15日を超えないよう</strong>
                  注意を呼びかけています（使いすぎによる薬物乱用頭痛の予防のため）。
                </div>
              </div>
            </section>

            {/* SECTION 8 */}
            <section id="s8" className="sec">
              <div className="sec-hd">
                <div className="sec-num">8</div>
                <h2 className="sec-title">まとめ</h2>
              </div>

              <div className="alert a-ok">
                <div className="alert-i">1️⃣</div>
                <div>
                  頭痛は世界的に非常に頻度の高い疾患であり、緊張型頭痛と頸原性頭痛は「首」との関連が深いタイプである。
                </div>
              </div>
              <div className="alert a-ok">
                <div className="alert-i">2️⃣</div>
                <div>
                  「ストレートネック」は国際文献における「頭部前方位（FHP）」「頸椎前弯の減少（loss
                  of cervical
                  lordosis）」に相当する概念であり、頭部を支える力学的負荷の増加と関連する。
                </div>
              </div>
              <div className="alert a-ok">
                <div className="alert-i">3️⃣</div>
                <div>
                  首と頭痛をつなぐ神経学的な鍵は「三叉神経頸髄核」における感覚の収束であり、頸部由来の痛みが頭痛として知覚され得る。
                </div>
              </div>
              <div className="alert a-warn">
                <div className="alert-i">4️⃣</div>
                <div>
                  姿勢と頭痛の関連は多くの研究で報告されているが、因果関係の証明はなお議論が続いており、断定的な結論は避けるべきである。
                </div>
              </div>
              <div className="alert a-danger">
                <div className="alert-i">5️⃣</div>
                <div>
                  突然の激しい頭痛や神経症状を伴う頭痛は、姿勢由来と自己判断せず、直ちに医療機関を受診すべきである。
                </div>
              </div>
              <div className="alert a-ok">
                <div className="alert-i">6️⃣</div>
                <div>頸部エクササイズや姿勢改善など、エビデンスに支持された対処法が存在する。</div>
              </div>
            </section>

            {/* SECTION 9 */}
            <section id="s9" className="sec">
              <div className="sec-hd">
                <div className="sec-num">9</div>
                <h2 className="sec-title">参考文献・情報源</h2>
              </div>

              <p>本ガイドは以下の国際的に認可・査読された情報源に基づいています。</p>

              <div className="src-grid">
                <div className="src">
                  <div className="src-org">World Health Organization</div>
                  <div className="src-t">[1] Migraine and other headache disorders</div>
                  <div className="src-url">
                    <Ext href="https://www.who.int/news-room/fact-sheets/detail/headache-disorders">
                      who.int/news-room/fact-sheets/detail/headache-disorders
                    </Ext>
                  </div>
                </div>
                <div className="src">
                  <div className="src-org">International Headache Society</div>
                  <div className="src-t">
                    [2] The International Classification of Headache Disorders, ICHD-3
                  </div>
                  <div className="src-url">
                    <Ext href="https://ichd-3.org/">ichd-3.org</Ext>
                  </div>
                </div>
                <div className="src">
                  <div className="src-org">International Headache Society</div>
                  <div className="src-t">[3] ICHD-3 Pocket version（PDF）</div>
                  <div className="src-url">
                    <Ext href="https://ihs-headache.org/wp-content/uploads/2020/05/ICHD-3-Pocket-version.pdf">
                      ihs-headache.org/.../ICHD-3-Pocket-version.pdf
                    </Ext>
                  </div>
                </div>
                <div className="src">
                  <div className="src-org">NIH — NCBI Bookshelf / StatPearls</div>
                  <div className="src-t">[4] Cervicogenic Headache</div>
                  <div className="src-url">
                    <Ext href="https://www.ncbi.nlm.nih.gov/books/NBK507862/">
                      ncbi.nlm.nih.gov/books/NBK507862
                    </Ext>
                  </div>
                </div>
                <div className="src">
                  <div className="src-org">NIH — PubMed Central (PMC)</div>
                  <div className="src-t">[5] Understanding Cervicogenic Headache</div>
                  <div className="src-url">
                    <Ext href="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC3821111/">
                      ncbi.nlm.nih.gov/pmc/articles/PMC3821111
                    </Ext>
                  </div>
                </div>
                <div className="src">
                  <div className="src-org">PubMed</div>
                  <div className="src-t">
                    [6] Cervicogenic headache: a review of diagnostic and treatment strategies
                  </div>
                  <div className="src-url">
                    <Ext href="https://pubmed.ncbi.nlm.nih.gov/15928349/">
                      pubmed.ncbi.nlm.nih.gov/15928349
                    </Ext>
                  </div>
                </div>
                <div className="src">
                  <div className="src-org">PubMed</div>
                  <div className="src-t">
                    [7] Hansraj (2014). Assessment of stresses in the cervical spine caused by
                    posture and position of the head. Surgical Technology International, 25.
                  </div>
                  <div className="src-url">
                    <Ext href="https://pubmed.ncbi.nlm.nih.gov/25393825/?dopt=Abstract">
                      pubmed.ncbi.nlm.nih.gov/25393825
                    </Ext>
                  </div>
                </div>
                <div className="src">
                  <div className="src-org">PubMed</div>
                  <div className="src-t">
                    [8] Mahmoud et al. (2019). The Relationship Between Forward Head Posture and
                    Neck Pain: a Systematic Review and Meta-Analysis. Current Reviews in
                    Musculoskeletal Medicine, 12(4).
                  </div>
                  <div className="src-url">
                    <Ext href="https://pubmed.ncbi.nlm.nih.gov/31773477/?dopt=Abstract">
                      pubmed.ncbi.nlm.nih.gov/31773477
                    </Ext>
                  </div>
                </div>
                <div className="src">
                  <div className="src-org">NIH — PubMed Central (PMC)</div>
                  <div className="src-t">
                    [9] Usen &amp; Demiroz Gunduz (2025). Cervicogenic headache in forward head
                    posture: frequency and associated factors in a cross-sectional study
                  </div>
                  <div className="src-url">
                    <Ext href="https://pmc.ncbi.nlm.nih.gov/articles/PMC12520431/">
                      pmc.ncbi.nlm.nih.gov/articles/PMC12520431
                    </Ext>
                  </div>
                </div>
                <div className="src">
                  <div className="src-org">ScienceDirect（査読誌）</div>
                  <div className="src-t">
                    [10] The cervical spine in tension-type headache: position paper
                  </div>
                  <div className="src-url">
                    <Ext href="https://www.sciencedirect.com/science/article/abs/pii/S2468781222001400">
                      sciencedirect.com/.../S2468781222001400
                    </Ext>
                  </div>
                </div>
                <div className="src">
                  <div className="src-org">Macquarie University Research Portal</div>
                  <div className="src-t">
                    [11] Jull et al. (2002). A Randomized Controlled Trial of Exercise and
                    Manipulative Therapy for Cervicogenic Headache
                  </div>
                  <div className="src-url">
                    <Ext href="https://researchers.mq.edu.au/en/publications/a-randomized-controlled-trial-of-exercise-and-manipulative-therap/">
                      researchers.mq.edu.au/.../a-randomized-controlled-trial...
                    </Ext>
                  </div>
                </div>
                <div className="src">
                  <div className="src-org">NIH — PubMed Central (PMC)</div>
                  <div className="src-t">
                    [12] The effectiveness of manual and exercise therapy on headache intensity and
                    frequency among patients with cervicogenic headache: a systematic review and
                    meta-analysis
                  </div>
                  <div className="src-url">
                    <Ext href="https://pmc.ncbi.nlm.nih.gov/articles/PMC9682850/">
                      pmc.ncbi.nlm.nih.gov/articles/PMC9682850
                    </Ext>
                  </div>
                </div>
                <div className="src">
                  <div className="src-org">Cleveland Clinic</div>
                  <div className="src-t">[13] Tension Headache: Symptoms &amp; Treatment</div>
                  <div className="src-url">
                    <Ext href="https://my.clevelandclinic.org/health/diseases/8257-tension-headaches">
                      my.clevelandclinic.org/health/diseases/8257-tension-headaches
                    </Ext>
                  </div>
                </div>
                <div className="src">
                  <div className="src-org">Cleveland Clinic</div>
                  <div className="src-t">
                    [14] Cervicogenic Headache: What It Is, Symptoms &amp; Treatment
                  </div>
                  <div className="src-url">
                    <Ext href="https://my.clevelandclinic.org/health/diseases/cervicogenic-headache">
                      my.clevelandclinic.org/health/diseases/cervicogenic-headache
                    </Ext>
                  </div>
                </div>
                <div className="src">
                  <div className="src-org">Cleveland Clinic</div>
                  <div className="src-t">[15] Neck Pain: 6 Common Causes and Treatments</div>
                  <div className="src-url">
                    <Ext href="https://my.clevelandclinic.org/health/symptoms/21179-neck-pain">
                      my.clevelandclinic.org/health/symptoms/21179-neck-pain
                    </Ext>
                  </div>
                </div>
                <div className="src">
                  <div className="src-org">NHS（英国国民保健サービス）</div>
                  <div className="src-t">[16] Headaches</div>
                  <div className="src-url">
                    <Ext href="https://www.nhs.uk/symptoms/headaches/">
                      nhs.uk/symptoms/headaches
                    </Ext>
                  </div>
                </div>
                <div className="src">
                  <div className="src-org">NHS（英国国民保健サービス）</div>
                  <div className="src-t">[17] Tension headaches</div>
                  <div className="src-url">
                    <Ext href="https://www.nhs.uk/conditions/tension-headaches/">
                      nhs.uk/conditions/tension-headaches
                    </Ext>
                  </div>
                </div>
                <div className="src">
                  <div className="src-org">The Lancet Neurology</div>
                  <div className="src-t">
                    [18] Global, regional, and national burden of headache disorders, 1990–2023: GBD
                    2023
                  </div>
                  <div className="src-url">
                    <Ext href="https://www.thelancet.com/journals/laneur/article/PIIS1474-4422(25)00402-8/fulltext">
                      thelancet.com/journals/laneur/.../fulltext
                    </Ext>
                  </div>
                </div>
              </div>

              <div className="alert a-info" style={{ marginTop: "18px" }}>
                <div className="alert-i">📝</div>
                <div>
                  [19]
                  頸椎前弯角度の一般的範囲（約20〜40度）は、臨床解剖学・脊椎外科分野で広く参照される数値を採用しています。個人差があり、単一の「正常値」で判定すべきではない点に留意してください。
                </div>
              </div>
            </section>

            {/* Related links */}
            <RelatedLinks href="/anatomy/headache-and-straight-neck" />
          </AutoGlossary>
        </main>
      </div>

      {/* FOOTER */}
      <div className="footer">
        <strong>頭痛とストレートネック</strong> — Forward Head Posture
        と頭痛の関係：国際的エビデンスに基づく教育ガイド
        <br />📅 作成年: 2026 | 次回レビュー推奨: ガイドライン更新時
        <br />
        ⚠️
        本資料は学術・教育・研究目的のみを対象としています。臨床への適用は必ず資格を持つ医療専門家の監督のもとで行ってください。
      </div>
    </div>
  );
}
