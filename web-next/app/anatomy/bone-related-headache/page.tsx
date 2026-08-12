import "./bone-related-headache.css";
import type { Metadata } from "next";
import { RelatedLinks } from "@/components/content/RelatedLinks";
import { Ext } from "@/components/Ext";
import { BoneRelatedHeadacheSidebar } from "@/components/headaches/BoneRelatedHeadacheSidebar";
import MermaidDiagram from "@/components/MermaidDiagram";

export const metadata: Metadata = {
  title: "頭痛に関連する骨 ― Bone-Related Headache Disorders",
  description:
    "ICHD-3に基づく頭痛に関連する骨・頸椎・副鼻腔・顎関節の構造と疾患に関する初学者向け解説ガイド。",
};

const BHD_MERMAID_THEME: Record<string, string> = {
  primaryColor: "#eceff1",
  primaryTextColor: "#263238",
  primaryBorderColor: "#546e7a",
  lineColor: "#607d8b",
  secondaryColor: "#e0f2f1",
  tertiaryColor: "#e8f5e9",
  edgeLabelBackground: "#ffffff",
  fontSize: "13px",
};

export default function BoneRelatedHeadachePage() {
  return (
    <div className="bone-related-headache">
      {/* HERO */}
      <div className="hero">
        <div style={{ fontSize: 44 }}>🦴</div>
        <h1>頭痛に関連する骨</h1>
        <p className="hero-sub">
          Bone-Related Headache Disorders ― ICHD-3に基づく初学者向けステップバイステップ解説
        </p>
        <div className="hero-tags">
          <span className="hero-tag">ICHD-3</span>
          <span className="hero-tag">国際頭痛学会 IHS</span>
          <span className="hero-tag">頸原性頭痛</span>
          <span className="hero-tag">顎関節症 TMD</span>
          <span className="hero-tag">頭蓋頸椎移行部</span>
        </div>
      </div>

      {/* DISCLAIMER */}
      <div className="disclaimer">
        <strong>⚠️ Academic Disclaimer(学術免責事項)</strong>　本資料は
        <strong>学術・教育・研究目的のみ</strong>
        を対象としています。すべての内容は資格を持つ医療専門家による臨床適用前のレビューが必要です。個人的な医療アドバイス・診断・処方を提供するものではありません。頭痛が続く、悪化する、または神経症状を伴う場合は、速やかに医療機関を受診してください。
      </div>

      {/* LAYOUT */}
      <div className="layout">
        {/* SIDEBAR */}
        <BoneRelatedHeadacheSidebar />

        {/* MAIN CONTENT */}
        <main className="main">
          {/* Evidence legend */}
          <div className="card">
            <h3 style={{ marginTop: 0 }}>エビデンスバッジの見方</h3>
            <div className="qr-grid">
              <div className="qr">
                <span className="bA">Class A</span>
                <p style={{ marginTop: 8, marginBottom: 0 }}>
                  国際頭痛学会(IHS)のICHD-3など、国際的コンセンサス基準
                </p>
              </div>
              <div className="qr">
                <span className="bB">Class B</span>
                <p style={{ marginTop: 8, marginBottom: 0 }}>
                  NCBI StatPearls・Merck Manual・NIH機関などの主要レビュー・専門家向け解説
                </p>
              </div>
              <div className="qr">
                <span className="bC">Class C</span>
                <p style={{ marginTop: 8, marginBottom: 0 }}>
                  症例報告・小規模研究(PMC収載の個別論文など)
                </p>
              </div>
              <div className="qr">
                <span className="bU">機序未確定</span>
                <p style={{ marginTop: 8, marginBottom: 0 }}>
                  病態メカニズムがまだ完全には解明されておらず、研究が進行中の領域
                </p>
              </div>
            </div>
          </div>

          {/* SECTION 1 */}
          <section id="s1" className="sec">
            <div className="sec-hd">
              <div className="sec-num">1</div>
              <h2 className="sec-title">そもそも頭痛はどう分類されるのか(ICHD-3の全体像)</h2>
            </div>

            <p>
              頭痛を国際的に議論する際の共通言語となっているのが、国際頭痛学会(International
              Headache Society; IHS)が作成した <strong>国際頭痛分類 第3版(ICHD-3)</strong>{" "}
              です。ICHD-3は世界中の頭痛研究・診療で標準的に用いられており、WHOの疾病分類(ICD)とも連携しています。{" "}
              <span className="bA">Class A</span>
            </p>

            <p>
              ICHD-3は頭痛を大きく「一次性頭痛(原因となる病気が見つからないタイプ、片頭痛や緊張型頭痛など)」と「二次性頭痛(何らかの病気や構造異常が原因となるタイプ)」に分けます。骨に関連する頭痛の多くは、この
              <strong>二次性頭痛の第11章</strong>
              「頭蓋骨・頸部・眼・耳・鼻・副鼻腔・歯・口腔、またはその他の顔面/頸部構造の障害に起因する頭痛」に分類されます。
            </p>

            <div className="mmd">
              <div className="mmd-lbl">フローチャート ― ICHD-3における「骨関連頭痛」の位置づけ</div>
              <MermaidDiagram
                themeVariables={BHD_MERMAID_THEME}
                chart={`flowchart TD
    A["国際頭痛分類 第3版\\nICHD-3(国際頭痛学会)"] --> B["一次性頭痛\\n第1〜4章\\n片頭痛・緊張型頭痛など"]
    A --> C["二次性頭痛\\n第5〜12章\\n原因となる病気や構造がある頭痛"]
    C --> D["第11章\\n頭蓋・頸部・眼・耳・鼻・副鼻腔・\\n歯・口腔などの構造に起因する頭痛"]
    D --> E["11.1 頭蓋骨の障害"]
    D --> F["11.2 頸部の障害\\n(頸原性頭痛など)"]
    D --> G["11.5 鼻・副鼻腔の障害"]
    D --> H["11.6 歯の障害"]
    D --> I["11.7 顎関節症(TMD)"]
    D --> J["11.8 茎突舌骨靱帯の炎症\\n(Eagle症候群)"]
    D --> K["11.9 その他の構造による頭痛"]`}
              />
            </div>

            <div className="alert a-info">
              <div className="alert-i">ℹ️</div>
              <div>
                <strong>ポイント:</strong>{" "}
                「骨が原因の頭痛」は一つの病気ではなく、頭蓋骨そのもの・頸椎・副鼻腔を囲む骨・顎関節・側頭骨の突起など、複数の部位にまたがる複数の疾患群として整理されています。
              </div>
            </div>
          </section>

          {/* SECTION 2 */}
          <section id="s2" className="sec">
            <div className="sec-hd">
              <div className="sec-num">2</div>
              <h2 className="sec-title">頭部の骨の基礎解剖</h2>
            </div>

            <p>
              頭痛の話に入る前に、頭部の骨の基本を押さえましょう。頭蓋骨(skull)は大きく、脳を収める{" "}
              <strong>脳頭蓋(neurocranium)</strong> と、顔の骨格を作る{" "}
              <strong>顔面頭蓋(viscerocranium)</strong>{" "}
              の2つに分けられます。成人の頭蓋骨は合計22個の骨から構成されます。{" "}
              <span className="bB">Class B</span>
            </p>

            <div className="tbl">
              <table>
                <thead>
                  <tr>
                    <th>骨の名称(日本語)</th>
                    <th>英語名</th>
                    <th>分類</th>
                    <th>頭痛との関連の要点</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>前頭骨</td>
                    <td>Frontal bone</td>
                    <td>脳頭蓋</td>
                    <td>内部に前頭洞を含み、副鼻腔性頭痛の発生源になりうる</td>
                  </tr>
                  <tr>
                    <td>頭頂骨(左右)</td>
                    <td>Parietal bone</td>
                    <td>脳頭蓋</td>
                    <td>頭蓋冠の大部分を構成、単独での病変は稀</td>
                  </tr>
                  <tr>
                    <td>側頭骨(左右)</td>
                    <td>Temporal bone</td>
                    <td>脳頭蓋</td>
                    <td>
                      側頭骨と顎関節(TMJ)・乳様突起・茎状突起・中耳を含み、TMD・乳様突起炎・Eagle症候群の起点
                    </td>
                  </tr>
                  <tr>
                    <td>後頭骨</td>
                    <td>Occipital bone</td>
                    <td>脳頭蓋</td>
                    <td>大後頭孔を含み、頭蓋頸椎移行部異常やキアリ奇形、後頭神経痛に関連</td>
                  </tr>
                  <tr>
                    <td>蝶形骨</td>
                    <td>Sphenoid bone</td>
                    <td>脳頭蓋(頭蓋底)</td>
                    <td>蝶形骨洞を含み、頭蓋底の要をなす骨。頭蓋底腫瘍の好発部位</td>
                  </tr>
                  <tr>
                    <td>篩骨</td>
                    <td>Ethmoid bone</td>
                    <td>脳頭蓋/顔面</td>
                    <td>篩骨洞(副鼻腔の一つ)を含み、鼻・副鼻腔性頭痛に関連</td>
                  </tr>
                  <tr>
                    <td>上顎骨(左右)</td>
                    <td>Maxilla</td>
                    <td>顔面頭蓋</td>
                    <td>上顎洞(副鼻腔)と上顎の歯を支持、歯性・副鼻腔性頭痛に関連</td>
                  </tr>
                  <tr>
                    <td>下顎骨</td>
                    <td>Mandible</td>
                    <td>顔面頭蓋</td>
                    <td>側頭骨と顎関節を形成、TMDに直結</td>
                  </tr>
                  <tr>
                    <td>頬骨・鼻骨・涙骨・口蓋骨・下鼻甲介・鋤骨</td>
                    <td>Zygomatic, Nasal, Lacrimal, Palatine, Inferior nasal concha, Vomer</td>
                    <td>顔面頭蓋</td>
                    <td>顔面の輪郭・眼窩・鼻腔を構成</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p>
              頭蓋骨は単独で存在するのではなく、
              <strong>頸椎(特に第1頸椎=環椎/C1、第2頸椎=軸椎/C2)</strong>{" "}
              と関節を介して連結しています。大後頭孔(foramen
              magnum)そのものは延髄・脊髄や血管が通過する「開口部」であり、関節面ではありません。実際に頭蓋と頸椎をつないでいるのは、大後頭孔の左右にある{" "}
              <strong>後頭顆(occipital condyle)</strong> と環椎(C1)の <strong>上関節面</strong>{" "}
              が形成する <strong>環椎後頭関節(atlanto-occipital joint)</strong>{" "}
              です。この「頭蓋骨と頸椎のつなぎ目」を{" "}
              <strong>頭蓋頸椎移行部(craniocervical junction, CVJ)</strong>{" "}
              と呼び、頭痛の原因として重要な部位です(ステップ4で詳述)。
            </p>

            <div className="mmd">
              <div className="mmd-lbl">図解 ― 頭蓋骨と頸椎の連結関係</div>
              <MermaidDiagram
                themeVariables={BHD_MERMAID_THEME}
                chart={`flowchart LR
    Frontal["前頭骨"] --- Parietal["頭頂骨"]
    Parietal --- Occipital["後頭骨"]
    Parietal --- Temporal["側頭骨"]
    Temporal --- Sphenoid["蝶形骨"]
    Sphenoid --- Ethmoid["篩骨"]
    Ethmoid --- Maxilla["上顎骨"]
    Maxilla --- Mandible["下顎骨(顎関節を介して側頭骨と連結)"]
    Occipital --- C1["環椎(C1)"]
    C1 --- C2["軸椎(C2)"]`}
              />
            </div>
          </section>

          {/* SECTION 3 */}
          <section id="s3" className="sec">
            <div className="sec-hd">
              <div className="sec-num">3</div>
              <h2 className="sec-title">頭蓋骨そのものの病気による頭痛(ICHD-3 11.1)</h2>
            </div>

            <p>
              ICHD-3の <strong>11.1「頭蓋骨の障害に起因する頭痛」</strong>{" "}
              は、頭蓋骨自体の病変が原因となる頭痛を扱います。 <span className="bA">Class A</span>
            </p>

            <div className="alert a-info">
              <div className="alert-i">ℹ️</div>
              <div>
                ICHD-3は「頭蓋骨の先天奇形・骨折・腫瘍・転移の多くは、実は頭痛を伴わないことが多い」と明記しています。その中で、頭痛を起こしやすい代表的な例外は限られています。
              </div>
            </div>

            <ul>
              <li>
                <strong>骨髄炎(osteomyelitis)</strong> ― 骨の細菌感染
              </li>
              <li>
                <strong>多発性骨髄腫(multiple myeloma)</strong> ― 骨を侵す血液がん
              </li>
              <li>
                <strong>Paget病(Paget's disease of bone)</strong> ―
                骨の代謝異常により骨が変形・肥厚する疾患
              </li>
              <li>
                <strong>乳様突起の病変・錐体骨炎(petrositis)</strong> ―
                側頭骨の一部である乳様突起や錐体部の炎症
              </li>
            </ul>

            <h3>診断の考え方(ICHD-3基準の要点)</h3>
            <div className="tbl">
              <table className="th-teal">
                <thead>
                  <tr>
                    <th>診断のステップ</th>
                    <th>内容</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>① 臨床所見・画像所見</td>
                    <td>頭蓋骨に頭痛を起こしうる病変があると確認されている</td>
                  </tr>
                  <tr>
                    <td>② 因果関係の証拠(2つ以上)</td>
                    <td>
                      病変の発症と頭痛の発症が時期的に一致する /
                      病変の悪化・改善と頭痛の悪化・改善が並行する / 頭痛が病変部位を押すと悪化する
                      / 頭痛が病変の部位に一致して局在する
                    </td>
                  </tr>
                  <tr>
                    <td>③ 除外診断</td>
                    <td>他のICHD-3診断でよりよく説明されない</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p style={{ fontSize: "12.5px", color: "var(--g6)" }}>
              出典: 国際頭痛分類 第3版(ICHD-3)11.1「頭蓋骨の障害に起因する頭痛」
            </p>
          </section>

          {/* SECTION 4 */}
          <section id="s4" className="sec">
            <div className="sec-hd">
              <div className="sec-num">4</div>
              <h2 className="sec-title">頭蓋骨と頸椎の「継ぎ目」で起こる異常(頭蓋頸椎移行部)</h2>
            </div>

            <p>
              後頭骨・環椎(C1)・軸椎(C2)が接する部分を{" "}
              <strong>頭蓋頸椎移行部(craniocervical junction, CVJ)</strong>{" "}
              と呼びます。ここは延髄や上位脊髄が通る非常に重要な場所であり、骨の形成異常や位置異常があると、脳幹や脊髄が圧迫されて頭痛を含むさまざまな神経症状が出ます。
            </p>

            <div className="tbl">
              <table className="th-orange">
                <thead>
                  <tr>
                    <th>異常の名称</th>
                    <th>何が起きているか</th>
                    <th>主な原因</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>頭蓋底陥入症(basilar invagination)</td>
                    <td>軸椎の歯突起が大後頭孔の中に押し上げられる</td>
                    <td>先天性、関節リウマチ、Paget病など</td>
                  </tr>
                  <tr>
                    <td>扁平頭蓋底(platybasia)</td>
                    <td>頭蓋底(後頭骨)が平坦化する</td>
                    <td>先天性、代謝性骨疾患</td>
                  </tr>
                  <tr>
                    <td>環椎後頭骨癒合(atlas assimilation)</td>
                    <td>環椎(C1)が後頭骨と癒合する</td>
                    <td>先天性</td>
                  </tr>
                  <tr>
                    <td>クリッペル・ファイル症候群(Klippel-Feil malformation)</td>
                    <td>複数の頸椎が癒合する</td>
                    <td>先天性</td>
                  </tr>
                  <tr>
                    <td>歯突起骨(os odontoideum)</td>
                    <td>軸椎の歯突起が本来の骨から分離している</td>
                    <td>先天性または外傷後</td>
                  </tr>
                  <tr>
                    <td>キアリ奇形(Chiari malformation)</td>
                    <td>小脳の一部が大後頭孔を越えて脊柱管側に下垂する</td>
                    <td>後頭蓋窩が先天的に小さいことなどが関与</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="alert a-warn">
              <div className="alert-i">🚨</div>
              <div>
                これらの異常があると、しばしば「せき・くしゃみ・いきみで悪化する後頭部の頭痛」が特徴的な症状として報告されます。これはキアリ奇形における頭痛の典型像として、米国NINDS(米国国立神経疾患・脳卒中研究所)も明記しています。{" "}
                <span className="bA">Class A</span>
              </div>
            </div>

            <div className="alert a-purple">
              <div className="alert-i">🔬</div>
              <div>
                ただし、頭痛が起こる正確な機序(脳脊髄液の流れの変化なのか、別の要因なのか)については、近年でも研究が続けられており、完全には解明されていません。{" "}
                <span className="bU">機序未確定</span>
              </div>
            </div>

            <div className="mmd">
              <div className="mmd-lbl">フローチャート ― 頭蓋頸椎移行部の骨異常から頭痛へ</div>
              <MermaidDiagram
                themeVariables={BHD_MERMAID_THEME}
                chart={`flowchart TD
    Occ["後頭骨(大後頭孔を含む)"] --> C1a["環椎 C1"]
    C1a --> C2a["軸椎 C2(歯突起)"]
    Occ -->|先天的異常| BI["頭蓋底陥入症"]
    Occ -->|先天的異常| Plat["扁平頭蓋底"]
    Occ -->|後頭蓋窩が狭小化| Chiari["キアリ奇形"]
    C1a -->|先天的異常| Assim["環椎後頭骨癒合"]
    C1a -->|先天的異常| KF["クリッペル・ファイル症候群"]
    C2a -->|先天的または外傷性| OsOd["歯突起骨"]
    BI --> Compress["脳幹・上位脊髄の圧迫"]
    Chiari --> Compress
    Compress --> HA["せき・いきみで悪化する\\n後頭部の頭痛など"]`}
              />
            </div>

            <p style={{ fontSize: "12.5px", color: "var(--g6)" }}>
              出典: 米国NINDS「キアリ奇形」、Merck Manual(専門家版)「頭蓋頸椎移行部異常」、MSD
              Manual(一般向け)「頭蓋頸椎移行部の病気」
            </p>
          </section>

          {/* SECTION 5 */}
          <section id="s5" className="sec">
            <div className="sec-hd">
              <div className="sec-num">5</div>
              <h2 className="sec-title">
                頸原性頭痛 ― 首の骨・関節が引き起こす頭痛(ICHD-3 11.2.1)
              </h2>
            </div>

            <p>
              <strong>頸原性頭痛(cervicogenic headache; CGH)</strong>{" "}
              は、ICHD-3の11.2.1に定義される二次性頭痛で、首(頸椎)の骨・関節・筋肉・靱帯といった筋骨格系の障害によって引き起こされます。一般人口における有病率は調査によって幅があり、およそ0.4〜4.6%程度と報告されています。{" "}
              <span className="bA">Class A</span>
            </p>

            <p>原因となりうる代表的な構造は以下の通りです。</p>
            <ul>
              <li>
                <strong>環椎後頭関節(atlanto-occipital joint)</strong>
              </li>
              <li>
                <strong>正中・外側環軸関節(atlanto-axial joints)</strong>
              </li>
              <li>
                <strong>C2-C3椎間板・C2-C3椎間関節(zygapophysial joint)</strong>
              </li>
              <li>上部頸部の筋肉(僧帽筋・胸鎖乳突筋など)や硬膜</li>
            </ul>

            <h3>なぜ「首の骨・関節」の問題が「頭」の痛みとして感じられるのか</h3>
            <p>
              このカラクリを理解する鍵が <strong>三叉神経頸髄核(trigeminocervical nucleus)</strong>{" "}
              という神経の中継地点です。三叉神経(顔・前頭部の感覚を担う脳神経)の脊髄路核は、延髄から下降して上位頸髄(C1〜C4付近)の後角にまで連続しています。ここに、三叉神経由来の感覚情報と、上位頸神経(C1〜C3、首の骨・関節由来の感覚情報)が「合流」します。そのため、首の骨や関節の異常刺激が、あたかも頭部(前頭部や眼窩周囲を含む)の痛みであるかのように脳へ伝わってしまうのです。{" "}
              <span className="bC">Class C</span>
            </p>

            <div className="mmd">
              <div className="mmd-lbl">フローチャート ― 三叉神経頸髄核における収束メカニズム</div>
              <MermaidDiagram
                themeVariables={BHD_MERMAID_THEME}
                chart={`flowchart LR
    subgraph INPUT["末梢からの感覚入力"]
        T1["三叉神経第1枝(眼神経)\\n前頭部・眼窩からの感覚"]
        Cn["上位頸神経 C1〜C3\\n環椎後頭関節・環軸関節・\\nC2-C3椎間関節からの感覚"]
    end
    T1 --> TCN["三叉神経頸髄核\\n(延髄〜C2-C4後角で収束)"]
    Cn --> TCN
    TCN --> Thal["視床を経由して大脳皮質へ"]
    Thal --> Pain["頭部の痛みとして自覚される\\n(発生源が首でも頭痛と感じる)"]`}
              />
            </div>

            <h3>診断の考え方(ICHD-3 11.2.1の要点)</h3>
            <div className="tbl">
              <table className="th-teal">
                <thead>
                  <tr>
                    <th>診断のステップ</th>
                    <th>内容</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>① 病変の証拠</td>
                    <td>
                      頸椎または頸部軟部組織に、頭痛を起こしうる臨床的または画像的な障害・病変が確認される
                    </td>
                  </tr>
                  <tr>
                    <td>② 因果関係の証拠(2つ以上)</td>
                    <td>
                      頭痛の発症が頸部障害の発症と時期的に一致する /
                      頸部障害の改善と並行して頭痛が改善する /
                      頸部の可動域制限があり、誘発手技で頭痛が明らかに悪化する /
                      頸部の構造やその神経支配への診断的ブロックで頭痛が消失する
                    </td>
                  </tr>
                  <tr>
                    <td>③ 除外診断</td>
                    <td>他のICHD-3診断でよりよく説明されない</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p style={{ fontSize: "12.5px", color: "var(--g6)" }}>
              出典: 国際頭痛分類 第3版(ICHD-3)11.2.1「頸原性頭痛」、米国NCBI
              Bookshelf(StatPearls)「頸原性頭痛」
            </p>
          </section>

          {/* SECTION 6 */}
          <section id="s6" className="sec">
            <div className="sec-hd">
              <div className="sec-num">6</div>
              <h2 className="sec-title">副鼻腔(骨に囲まれた空洞)による頭痛(ICHD-3 11.5)</h2>
            </div>

            <p>
              副鼻腔(paranasal
              sinuses)は、前頭骨・篩骨・上顎骨・蝶形骨という「骨の中にある空洞」です。ICHD-3の11.5では、この鼻・副鼻腔の障害による頭痛を扱います。
            </p>

            <div className="alert a-warn">
              <div className="alert-i">⚠️</div>
              <div>
                ICHD-3自身が「"副鼻腔性頭痛(sinus
                headache)"という用語は、実際には片頭痛など別の一次性頭痛に対しても誤って使われてきた、時代遅れの表現である」と明確に注意を促しています。{" "}
                <span className="bA">Class A</span>
              </div>
            </div>

            <div className="tbl">
              <table>
                <thead>
                  <tr>
                    <th>部位</th>
                    <th>痛みの典型的な局在(参考)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>上顎洞炎(上顎骨内)</td>
                    <td>頬・歯肉・上顎の歯の周囲</td>
                  </tr>
                  <tr>
                    <td>篩骨洞炎(篩骨内)</td>
                    <td>両眼の間</td>
                  </tr>
                  <tr>
                    <td>前頭洞炎(前頭骨内)</td>
                    <td>前頭部</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p>急性副鼻腔炎による頭痛(11.5.1)の診断の考え方は次の通りです。</p>
            <ul>
              <li>
                頭痛の発症が急性副鼻腔炎の発症と時期的に一致する、または改善と並行して頭痛が改善する
              </li>
              <li>副鼻腔の上を圧迫すると頭痛が悪化する</li>
              <li>片側性の副鼻腔炎であれば、頭痛もその側に局在する</li>
              <li>他のICHD-3診断でよりよく説明されない</li>
            </ul>

            <p>
              慢性・反復性副鼻腔炎による頭痛(11.5.2)でも同様の因果関係の基準が用いられますが、慢性の場合はより慎重な評価(鼻内視鏡検査や画像検査での炎症所見の確認)が推奨されます。
            </p>

            <p style={{ fontSize: "12.5px", color: "var(--g6)" }}>
              出典: 国際頭痛分類 第3版(ICHD-3)11.5・11.5.1・11.5.2「鼻・副鼻腔の障害に起因する頭痛」
            </p>
          </section>

          {/* SECTION 7 */}
          <section id="s7" className="sec">
            <div className="sec-hd">
              <div className="sec-num">7</div>
              <h2 className="sec-title">顎関節(側頭骨)による頭痛 ― TMD(ICHD-3 11.7)</h2>
            </div>

            <p>
              顎関節症(temporomandibular disorders; TMD)は、<strong>側頭骨</strong>{" "}
              と下顎骨の間にある顎関節(TMJ)、およびそれを動かす咀嚼筋群に関する30種類以上の疾患群の総称です。米国国立歯科顎顔面研究所(NIDCR、NIHの一機関)関連の資料によれば、米国だけで1,100万〜1,200万人の成人が顎関節周囲の痛みを抱えているとされ、頭痛・線維筋痛症など他の疾患と併発することも多いとされています。{" "}
              <span className="bB">Class B</span>
            </p>

            <ul>
              <li>
                痛みは側頭部・耳前部・咬筋部に最も強く出やすく、両側の顎関節に病変があれば両側性になりやすい
              </li>
              <li>
                痛みの原因としては、関節円板のずれ・関節の変形性関節症・筋膜性疼痛などが挙げられる
              </li>
              <li>
                顎関節そのものの骨折や骨髄炎、腫瘍など「TMD以外の顎の病気」は、局所の痛みが主体で頭痛単独としては現れにくく、その場合はICHD-3の別項目(11.9)で分類される
              </li>
            </ul>

            <p style={{ fontSize: "12.5px", color: "var(--g6)" }}>
              出典: 国際頭痛分類
              第3版(ICHD-3)11.7「顎関節症(TMD)に起因する頭痛」、NIDCR関連資料、米国家庭医学会(AAFP)エビデンスレビュー
            </p>
          </section>

          {/* SECTION 8 */}
          <section id="s8" className="sec">
            <div className="sec-hd">
              <div className="sec-num">8</div>
              <h2 className="sec-title">後頭部の骨と神経 ― 後頭神経痛</h2>
            </div>

            <p>
              <strong>後頭神経痛(occipital neuralgia)</strong>{" "}
              は、後頭骨の下縁から頭皮に向かって走行する{" "}
              <strong>大後頭神経(greater occipital nerve)</strong>・小後頭神経(lesser occipital
              nerve)・第三後頭神経(third occipital
              nerve)が、骨・筋膜のトンネルを通過する部分などで刺激・絞扼されることによって生じる、電気が走るような鋭い痛みを特徴とする病態です。大後頭神経は解剖学的に第2頸神経(C2)後枝の内側枝、第三後頭神経は第3頸神経(C3)後枝の内側枝であり、いずれも軸椎(C2)周囲の骨・靱帯構造やC2-C3椎間関節と密接に関係しています。{" "}
              <span className="bB">Class B</span>
            </p>

            <p>
              痛みは首の後ろから始まり、頭皮・前頭部・眼の奥にまで広がることがあり、頭皮の接触過敏や光過敏を伴うこともあります。
            </p>

            <div className="alert a-ok">
              <div className="alert-i">✅</div>
              <div>
                臨床的には、罹患が疑われる神経(大後頭神経・小後頭神経・第三後頭神経)へのブロック(局所麻酔薬の注射)によって痛みが
                <strong>一時的に軽減する</strong>
                かどうかが、診断的にも治療的にも重要な手がかりとして用いられています。{" "}
                <span className="bC">Class C</span>
              </div>
            </div>

            <p style={{ fontSize: "12.5px", color: "var(--g6)" }}>
              出典:
              PMC(NIH/NLM収載論文)大後頭神経の形態学的特徴、超音波ガイド下大後頭神経ブロックに関する報告
            </p>
          </section>

          {/* SECTION 9 */}
          <section id="s9" className="sec">
            <div className="sec-hd">
              <div className="sec-num">9</div>
              <h2 className="sec-title">側頭骨の突起による頭痛 ― Eagle症候群(ICHD-3 11.8)</h2>
            </div>

            <p>
              側頭骨からは <strong>茎状突起(styloid process)</strong>{" "}
              という細長い骨の突起が下方に伸びており、そこに茎突舌骨靱帯(stylohyoid
              ligament)が付着しています。この突起が通常より長い、あるいは靱帯が石灰化することで周囲を刺激し、頭部・頸部・咽頭・顔面の痛みを引き起こす状態を{" "}
              <strong>Eagle症候群</strong>{" "}
              と呼び、ICHD-3では11.8「茎突舌骨靱帯の炎症に起因する頭痛または顔面痛」として分類されています。{" "}
              <span className="bA">Class A</span>
            </p>

            <p>診断の手がかり(ICHD-3の基準の要点):</p>
            <ul>
              <li>画像検査で茎状突起の石灰化・伸長が確認される</li>
              <li>茎突舌骨靱帯を指で圧迫すると痛みが誘発・悪化する</li>
              <li>局所麻酔薬の注射や靱帯・突起の切除で痛みが有意に改善する</li>
              <li>痛みは炎症のある側と一致する</li>
            </ul>

            <p style={{ fontSize: "12.5px", color: "var(--g6)" }}>
              出典: 国際頭痛分類 第3版(ICHD-3)11.8「茎突舌骨靱帯の炎症に起因する頭痛または顔面痛」
            </p>
          </section>

          {/* SECTION 10 */}
          <section id="s10" className="sec">
            <div className="sec-hd">
              <div className="sec-num">10</div>
              <h2 className="sec-title">全体まとめ ― なぜ「骨」の異常が頭痛になるのか</h2>
            </div>

            <p>
              ここまで見てきたように、「骨に関連する頭痛」は単一の病気ではなく、
              <strong>
                骨そのものの病変・骨と骨の連結部の異常・骨に囲まれた空洞の炎症・骨に支えられた関節の障害・骨を通過する神経の刺激
              </strong>
              という、複数の異なるメカニズムから成り立っています。
            </p>

            <div className="mmd">
              <div className="mmd-lbl">フローチャート ― 骨・関節由来の頭痛メカニズムの全体像</div>
              <MermaidDiagram
                themeVariables={BHD_MERMAID_THEME}
                chart={`flowchart TD
    Bone["骨・関節に関連する異常"] --> A1["頭蓋骨自体の病変\\n(骨髄炎・多発性骨髄腫・Paget病など)\\nICHD-3 11.1"]
    Bone --> A2["頭蓋頸椎移行部の異常\\n(頭蓋底陥入症・キアリ奇形など)"]
    Bone --> A3["頸椎(環軸関節等)の\\n機能異常・頸原性頭痛\\nICHD-3 11.2.1"]
    Bone --> A4["副鼻腔を包む骨の炎症\\nICHD-3 11.5"]
    Bone --> A5["顎関節(側頭骨)の障害\\nTMD ICHD-3 11.7"]
    Bone --> A6["後頭骨周囲の神経刺激\\n後頭神経痛"]
    Bone --> A7["茎状突起(側頭骨)の異常\\nEagle症候群 ICHD-3 11.8"]
    A1 -->|骨膜・硬膜の侵害受容| TG["三叉神経の求心路\\n(V1〜V3)"]
    A4 -->|副鼻腔粘膜・骨膜の炎症| TG
    A5 -->|"顎関節・咀嚼筋(V3)"| TG
    A2 -->|後頭蓋窩硬膜・上位頸椎構造| CX["上位頸神経の求心路\\n(C1〜C3)"]
    A3 -->|環軸関節・C2-C3椎間関節| CX
    A6 -->|"後頭神経そのものの絞扼・炎症(神経障害性疼痛)"| CX
    A7 -->|茎状突起・靱帯による周囲組織の刺激| GX["舌咽神経・迷走神経\\nおよび三叉神経下顎枝(V3)"]
    TG --> TCN2["三叉神経頸髄核での収束\\n(トリジェミノサーヴィカル・コンプレックス)"]
    CX --> TCN2
    TCN2 --> Ref["関連痛\\n(発生源と離れた前頭部・眼窩周囲にも感じる)"]
    GX --> Local["咽頭・頸部・顔面の\\n局所痛および放散痛"]
    Ref --> Result["頭部・顔面の痛みとして自覚される"]
    Local --> Result`}
              />
            </div>

            <div className="alert a-info">
              <div className="alert-i">🧭</div>
              <div>
                共通して重要なのは、
                <strong>
                  痛みを感じる場所(頭)と、実際に問題が起きている場所(骨・関節)が必ずしも一致しない
                </strong>
                という点です。これは三叉神経系と上位頸神経系が神経学的に「合流」する構造(トリジェミノサーヴィカル・コンプレックス)を持つためであり、この仕組みを理解することが、頸原性頭痛や後頭神経痛など「骨・関節由来の頭痛」を正しく捉える第一歩になります。
              </div>
            </div>
          </section>

          {/* SECTION 11 */}
          <section id="s11" className="sec">
            <div className="sec-hd">
              <div className="sec-num">11</div>
              <h2 className="sec-title">参考文献(ソース一覧)</h2>
            </div>

            <p>以下はすべて国際的に認知された学術・専門機関による情報源です。</p>

            <h3>国際頭痛分類 第3版(ICHD-3)/ 国際頭痛学会</h3>
            <div className="src-grid">
              <div className="src">
                <div className="src-org">IHS / ICHD-3</div>
                <div className="src-t">ICHD-3 公式サイト トップページ</div>
                <Ext className="src-url" href="https://ichd-3.org/">
                  https://ichd-3.org/
                </Ext>
              </div>
              <div className="src">
                <div className="src-org">IHS / ICHD-3</div>
                <div className="src-t">分類全体の一覧(Classification Outline)</div>
                <Ext className="src-url" href="https://ichd-3.org/classification-outline/">
                  https://ichd-3.org/classification-outline/
                </Ext>
              </div>
              <div className="src">
                <div className="src-org">IHS / ICHD-3</div>
                <div className="src-t">第11章 総論</div>
                <Ext
                  className="src-url"
                  href="https://ichd-3.org/11-headache-or-facial-pain-attributed-to-disorder-of-the-cranium-neck-eyes-ears-nose-sinuses-teeth-mouth-or-other-facial-or-cervical-structure/"
                >
                  ichd-3.org/11-headache-or-facial-pain-attributed...
                </Ext>
              </div>
              <div className="src">
                <div className="src-org">IHS / ICHD-3</div>
                <div className="src-t">11.1 頭蓋骨の障害に起因する頭痛</div>
                <Ext
                  className="src-url"
                  href="https://ichd-3.org/11-headache-or-facial-pain-attributed-to-disorder-of-the-cranium-neck-eyes-ears-nose-sinuses-teeth-mouth-or-other-facial-or-cervical-structure/11-1-headache-attributed-to-disorder-of-cranial-bone/"
                >
                  ichd-3.org/.../11-1-headache-attributed-to-disorder-of-cranial-bone/
                </Ext>
              </div>
              <div className="src">
                <div className="src-org">IHS / ICHD-3</div>
                <div className="src-t">11.2.1 頸原性頭痛</div>
                <Ext
                  className="src-url"
                  href="https://ichd-3.org/11-headache-or-facial-pain-attributed-to-disorder-of-the-cranium-neck-eyes-ears-nose-sinuses-teeth-mouth-or-other-facial-or-cervical-structure/11-2-headache-attributed-to-disorder-of-the-neck/11-2-1-cervicogenic-headache/"
                >
                  ichd-3.org/.../11-2-1-cervicogenic-headache/
                </Ext>
              </div>
              <div className="src">
                <div className="src-org">IHS / ICHD-3</div>
                <div className="src-t">11.5 鼻・副鼻腔の障害に起因する頭痛</div>
                <Ext
                  className="src-url"
                  href="https://ichd-3.org/11-headache-or-facial-pain-attributed-to-disorder-of-the-cranium-neck-eyes-ears-nose-sinuses-teeth-mouth-or-other-facial-or-cervical-structure/11-5-headache-attributed-to-disorder-of-the-nose-or-paranasal-sinuses/"
                >
                  ichd-3.org/.../11-5-headache-attributed-to-disorder-of-the-nose/
                </Ext>
              </div>
              <div className="src">
                <div className="src-org">IHS / ICHD-3</div>
                <div className="src-t">11.5.1 急性副鼻腔炎による頭痛</div>
                <Ext
                  className="src-url"
                  href="https://ichd-3.org/11-headache-or-facial-pain-attributed-to-disorder-of-the-cranium-neck-eyes-ears-nose-sinuses-teeth-mouth-or-other-facial-or-cervical-structure/11-5-headache-attributed-to-disorder-of-the-nose-or-paranasal-sinuses/11-5-1-headache-attributed-to-acute-rhinosinusitis/"
                >
                  ichd-3.org/.../11-5-1-headache-attributed-to-acute-rhinosinusitis/
                </Ext>
              </div>
              <div className="src">
                <div className="src-org">IHS / ICHD-3</div>
                <div className="src-t">11.5.2 慢性・反復性副鼻腔炎による頭痛</div>
                <Ext
                  className="src-url"
                  href="https://ichd-3.org/11-headache-or-facial-pain-attributed-to-disorder-of-the-cranium-neck-eyes-ears-nose-sinuses-teeth-mouth-or-other-facial-or-cervical-structure/11-5-headache-attributed-to-disorder-of-the-nose-or-paranasal-sinuses/11-5-2-headache-attributed-to-chronic-or-recurring-rhinosinusitis/"
                >
                  ichd-3.org/.../11-5-2-headache-attributed-to-chronic-rhinosinusitis/
                </Ext>
              </div>
              <div className="src">
                <div className="src-org">IHS / ICHD-3</div>
                <div className="src-t">11.7 顎関節症(TMD)に起因する頭痛</div>
                <Ext
                  className="src-url"
                  href="https://ichd-3.org/11-headache-or-facial-pain-attributed-to-disorder-of-the-cranium-neck-eyes-ears-nose-sinuses-teeth-mouth-or-other-facial-or-cervical-structure/11-7-headache-attributed-to-temporomandibular-disorder-tmd/"
                >
                  ichd-3.org/.../11-7-headache-attributed-to-temporomandibular-disorder/
                </Ext>
              </div>
              <div className="src">
                <div className="src-org">IHS / ICHD-3</div>
                <div className="src-t">11.8 茎突舌骨靱帯の炎症(Eagle症候群)</div>
                <Ext
                  className="src-url"
                  href="https://ichd-3.org/11-headache-or-facial-pain-attributed-to-disorder-of-the-cranium-neck-eyes-ears-nose-sinuses-teeth-mouth-or-other-facial-or-cervical-structure/11-8-head-or-facial-pain-attributed-to-inflammation-of-the-stylohyoid-ligament/"
                >
                  ichd-3.org/.../11-8-inflammation-of-the-stylohyoid-ligament/
                </Ext>
              </div>
            </div>

            <h3>米国国立衛生研究所(NIH)関連</h3>
            <div className="src-grid">
              <div className="src">
                <div className="src-org">NCBI Bookshelf</div>
                <div className="src-t">StatPearls ― 前頭骨</div>
                <Ext className="src-url" href="https://www.ncbi.nlm.nih.gov/books/NBK535424/">
                  ncbi.nlm.nih.gov/books/NBK535424/
                </Ext>
              </div>
              <div className="src">
                <div className="src-org">NCBI Bookshelf</div>
                <div className="src-t">StatPearls ― 後頭骨・動脈・静脈・神経</div>
                <Ext className="src-url" href="https://www.ncbi.nlm.nih.gov/books/NBK541093/">
                  ncbi.nlm.nih.gov/books/NBK541093/
                </Ext>
              </div>
              <div className="src">
                <div className="src-org">NCBI Bookshelf</div>
                <div className="src-t">StatPearls ― 蝶形骨</div>
                <Ext className="src-url" href="https://www.ncbi.nlm.nih.gov/books/NBK544308/">
                  ncbi.nlm.nih.gov/books/NBK544308/
                </Ext>
              </div>
              <div className="src">
                <div className="src-org">NCBI Bookshelf</div>
                <div className="src-t">StatPearls ― 頭蓋骨孔</div>
                <Ext className="src-url" href="https://www.ncbi.nlm.nih.gov/books/NBK546621/">
                  ncbi.nlm.nih.gov/books/NBK546621/
                </Ext>
              </div>
              <div className="src">
                <div className="src-org">NCBI Bookshelf</div>
                <div className="src-t">StatPearls ― 頭蓋骨画像診断</div>
                <Ext className="src-url" href="https://www.ncbi.nlm.nih.gov/books/NBK556122/">
                  ncbi.nlm.nih.gov/books/NBK556122/
                </Ext>
              </div>
              <div className="src">
                <div className="src-org">NCBI Bookshelf</div>
                <div className="src-t">StatPearls ― 頸原性頭痛</div>
                <Ext className="src-url" href="https://www.ncbi.nlm.nih.gov/books/NBK507862/">
                  ncbi.nlm.nih.gov/books/NBK507862/
                </Ext>
              </div>
              <div className="src">
                <div className="src-org">NINDS</div>
                <div className="src-t">キアリ奇形(Chiari Malformation)</div>
                <Ext
                  className="src-url"
                  href="https://www.ninds.nih.gov/health-information/disorders/chiari-malformation"
                >
                  ninds.nih.gov/health-information/disorders/chiari-malformation
                </Ext>
              </div>
              <div className="src">
                <div className="src-org">NIH / NIDCR関連</div>
                <div className="src-t">顎関節症(TMD)研究資料</div>
                <Ext
                  className="src-url"
                  href="https://www.nationalacademies.org/projects/HMD-HSP-18-21"
                >
                  nationalacademies.org/projects/HMD-HSP-18-21
                </Ext>
              </div>
              <div className="src">
                <div className="src-org">AHRQ</div>
                <div className="src-t">TMD治療ガイドライン技術概要</div>
                <Ext
                  className="src-url"
                  href="https://effectivehealthcare.ahrq.gov/sites/default/files/nt_docs/1029-temporomandibular-dysfunction-topic-brief.pdf"
                >
                  effectivehealthcare.ahrq.gov/.../1029-temporomandibular-dysfunction-topic-brief.pdf
                </Ext>
              </div>
              <div className="src">
                <div className="src-org">PMC(NIH/NLM)</div>
                <div className="src-t">大後頭神経の形態学的特徴</div>
                <Ext
                  className="src-url"
                  href="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC10780152/"
                >
                  ncbi.nlm.nih.gov/pmc/articles/PMC10780152/
                </Ext>
              </div>
              <div className="src">
                <div className="src-org">PMC(NIH/NLM)</div>
                <div className="src-t">後頭神経痛による顔面症状の報告</div>
                <Ext
                  className="src-url"
                  href="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC5346380/"
                >
                  ncbi.nlm.nih.gov/pmc/articles/PMC5346380/
                </Ext>
              </div>
              <div className="src">
                <div className="src-org">PMC(NIH/NLM)</div>
                <div className="src-t">頭蓋底陥入症とキアリ奇形I型の症例報告</div>
                <Ext
                  className="src-url"
                  href="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC10518641/"
                >
                  ncbi.nlm.nih.gov/pmc/articles/PMC10518641/
                </Ext>
              </div>
            </div>

            <h3>その他の国際的専門機関・学会</h3>
            <div className="src-grid">
              <div className="src">
                <div className="src-org">BrainFacts.org(NINDS作成解説の転載)</div>
                <div className="src-t">後頭神経痛</div>
                <Ext
                  className="src-url"
                  href="https://www.brainfacts.org/diseases-and-disorders/neurological-disorders-az/diseases-a-to-z-from-ninds/occipital-neuralgia"
                >
                  brainfacts.org/.../occipital-neuralgia
                </Ext>
              </div>
              <div className="src">
                <div className="src-org">Anesthesiology & Pain Medicine誌</div>
                <div className="src-t">超音波ガイド下大後頭神経ブロック</div>
                <Ext
                  className="src-url"
                  href="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC3833045/"
                >
                  ncbi.nlm.nih.gov/pmc/articles/PMC3833045/
                </Ext>
              </div>
              <div className="src">
                <div className="src-org">ASRA Pain Medicine</div>
                <div className="src-t">頸原性頭痛 解説</div>
                <Ext
                  className="src-url"
                  href="https://asra.com/news-publications/asra-updates/blog-landing/legacy-b-blog-posts/2019/08/06/cervicogenic-headache"
                >
                  asra.com/.../cervicogenic-headache
                </Ext>
              </div>
              <div className="src">
                <div className="src-org">UCNS 継続教育資料</div>
                <div className="src-t">鼻・副鼻腔疾患による頭痛</div>
                <Ext
                  className="src-url"
                  href="https://ucns.org/common/Uploaded%20files/Continuous%20Certification/2026%20HM%20Marmura_Headaches-due-to-Nasal-and-Paranasal-Sinus-Disease.pdf"
                >
                  ucns.org/.../Headaches-due-to-Nasal-and-Paranasal-Sinus-Disease.pdf
                </Ext>
              </div>
              <div className="src">
                <div className="src-org">AAFP(米国家庭医学会)</div>
                <div className="src-t">顎関節症エビデンスレビュー</div>
                <Ext
                  className="src-url"
                  href="https://www.aafp.org/pubs/afp/issues/2023/0100/temporomandibular-disorders.html"
                >
                  aafp.org/pubs/afp/issues/2023/0100/temporomandibular-disorders.html
                </Ext>
              </div>
              <div className="src">
                <div className="src-org">Merck Manual(専門家版)</div>
                <div className="src-t">頭蓋頸椎移行部異常</div>
                <Ext
                  className="src-url"
                  href="https://www.merckmanuals.com/professional/neurologic-disorders/craniocervical-junction-abnormalities/craniocervical-junction-abnormalities"
                >
                  merckmanuals.com/.../craniocervical-junction-abnormalities
                </Ext>
              </div>
              <div className="src">
                <div className="src-org">MSD Manual(一般向け)</div>
                <div className="src-t">頭蓋頸椎移行部の病気</div>
                <Ext
                  className="src-url"
                  href="https://www.msdmanuals.com/home/brain-spinal-cord-and-nerve-disorders/craniocervical-junction-disorders/craniocervical-junction-disorders"
                >
                  msdmanuals.com/.../craniocervical-junction-disorders
                </Ext>
              </div>
              <div className="src">
                <div className="src-org">medRxiv プレプリント</div>
                <div className="src-t">キアリ奇形の脳脊髄液動態に関する研究</div>
                <Ext
                  className="src-url"
                  href="https://www.medrxiv.org/content/10.1101/2025.05.01.25326708.full.pdf"
                >
                  medrxiv.org/content/10.1101/2025.05.01.25326708.full.pdf
                </Ext>
              </div>
            </div>
          </section>

          {/* 関連ページ導線（plans/002 Step 3・レジストリ駆動） */}
          <RelatedLinks href="/anatomy/bone-related-headache" />
        </main>
      </div>

      {/* FOOTER */}
      <div className="footer">
        <strong>頭痛に関連する骨</strong> ― Bone-Related Headache Disorders ―
        ICHD-3に基づく初学者向けステップバイステップ解説
        <br />📅 作成年: 2026 | 次回レビュー推奨: ICHD-4公表時、またはガイドライン更新時
        <br />
        ⚠️
        本資料は学術・教育・研究目的のみを対象としています。臨床への適用は必ず資格を持つ医療専門家の監督のもとで行ってください。
      </div>
    </div>
  );
}
