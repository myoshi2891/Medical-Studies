import type { Metadata } from "next";
import { HeadacheRelatedNervesSidebar } from "@/components/anatomy/HeadacheRelatedNervesSidebar";
import { RelatedLinks } from "@/components/content/RelatedLinks";
import { Ext } from "@/components/Ext";
import AutoGlossary from "@/components/glossary/AutoGlossary";
import MermaidDiagram from "@/components/MermaidDiagram";
import "./headache-related-nerves.css";

export const metadata: Metadata = {
  title: "頭痛と神経系 ― 国際文献にもとづく解説 | Web medical atlas",
  description:
    "ICHD-3 および国際的エビデンスに基づく頭痛と神経系（三叉神経血管系、上位頸神経、TCC、自律神経反射、中枢性感作）の解剖学と痛みのメカニズム解説。",
};

const NERVES_MERMAID_THEME: Record<string, string> = {
  primaryColor: "#e8eaf6",
  primaryTextColor: "#1a237e",
  primaryBorderColor: "#3949ab",
  lineColor: "#0288d1",
  secondaryColor: "#e0f2f1",
  tertiaryColor: "#e8f5e9",
  edgeLabelBackground: "#ffffff",
  fontSize: "13px",
};

export default function HeadacheRelatedNervesPage() {
  return (
    <div className="headache-related-nerves">
      {/* HERO */}
      <div className="hero">
        <div style={{ fontSize: 40 }}>🧠</div>
        <h1>頭痛と神経系</h1>
        <p className="hero-sub">国際文献にもとづく神経解剖ステップバイステップガイド</p>
        <div className="hero-tags">
          <span className="hero-tag">三叉神経系</span>
          <span className="hero-tag">後頭神経</span>
          <span className="hero-tag">三叉神経頸髄複合体(TCC)</span>
          <span className="hero-tag">自律神経反射</span>
          <span className="hero-tag">中枢性感作</span>
        </div>
      </div>

      {/* DISCLAIMER */}
      <div className="disclaimer">
        <strong>⚠️ 学術・教育目的の免責事項</strong> 本資料は<strong>学術・教育目的のみ</strong>
        を対象とした解説です。個々の症状の診断・治療方針を示すものではありません。実際の頭痛症状については医療機関を受診してください。
      </div>

      {/* LAYOUT */}
      <div className="layout">
        {/* SIDEBAR */}
        <HeadacheRelatedNervesSidebar />

        {/* MAIN CONTENT */}
        <main className="main">
          <AutoGlossary>
            {/* SECTION 1 */}
            <section id="s1" className="sec">
              <div className="sec-hd">
                <div className="sec-num">1</div>
                <h2 className="sec-title">なぜ「頭」が痛むのか ― 脳そのものは痛みを感じない</h2>
              </div>

              <p>
                意外に思われるかもしれませんが、
                <strong>脳の神経細胞そのものには痛みを感じる受容器(侵害受容器)がありません</strong>
                。脳外科手術で開頭したあと、脳を直接触っても患者は痛みを感じないことが知られています。
              </p>
              <p>
                では頭痛の「痛み」はどこから来るのでしょうか。国際的な総説では、頭蓋内外で痛みを感じる構造として主に以下が挙げられています。
              </p>
              <ul>
                <li>硬膜(脳を包む膜)とその血管</li>
                <li>脳表の太い動脈・静脈洞</li>
                <li>頭皮・頸部の筋肉、筋膜、関節</li>
                <li>副鼻腔・眼・歯などの周辺組織</li>
              </ul>
              <p>
                これらの組織に分布し、痛み情報を脳へ伝えているのが<strong>三叉神経系</strong>と
                <strong>上位の頸神経(首の神経)</strong>です。
              </p>

              <div className="alert a-info">
                <div className="alert-i">ℹ️</div>
                <div>
                  米国立神経疾患・脳卒中研究所(NINDS)も、片頭痛・緊張型頭痛・三叉神経自律神経性頭痛(群発頭痛など)といった主要な頭痛が、いずれも神経系の機能異常と深く関わることを解説しています。
                </div>
              </div>
            </section>

            {/* SECTION 2 */}
            <section id="s2" className="sec">
              <div className="sec-hd">
                <div className="sec-num">2</div>
                <h2 className="sec-title">頭痛に関わる神経ネットワークの全体像</h2>
              </div>

              <p>
                頭痛の神経メカニズムは複雑に見えますが、大きく分けると次の4つの要素の相互作用として理解できます。
              </p>
              <ul>
                <li>
                  <span className="tN">三叉神経系</span>
                  (主に第1枝〈眼神経〉):前頭部・眼窩・硬膜前方の感覚を担当
                </li>
                <li>
                  <span className="tN">上位頸神経(C1〜C3)・後頭神経</span>:後頭部・頸部の感覚を担当
                </li>
                <li>
                  <span className="tN">三叉神経頸髄複合体(TCC)</span>
                  :上記2つの情報が合流する中継地点
                </li>
                <li>
                  <span className="tN">自律神経系(副交感神経)</span>
                  :血管拡張や流涙・鼻閉などの症状に関与
                </li>
              </ul>

              <div className="mmd">
                <div className="mmd-lbl">フローチャート ― 頭痛神経ネットワークの全体像</div>
                <MermaidDiagram
                  themeVariables={NERVES_MERMAID_THEME}
                  chart={`flowchart TD
A["頭蓋内で痛みを感じる組織<br/>(硬膜・脳血管・静脈洞)"] --> B["三叉神経系<br/>(主に第1枝:眼神経)"]
C["後頭部・頸部の組織<br/>(筋膜・関節・靭帯)"] --> D["上位頸神経<br/>(C1-C3、後頭神経)"]
B --> E["三叉神経頸髄複合体<br/>(TCC)"]
D --> E
E --> F["視床(Thalamus)"]
F --> G["大脳皮質<br/>(頭痛として自覚される)"]
B -.->|反射性に活性化| H["副交感神経系<br/>(翼口蓋神経節など)"]
H --> I["流涙・鼻閉などの<br/>自律神経症状"]`}
                />
              </div>

              <p>
                この図が、これから説明する内容の「地図」になります。ひとつずつ見ていきましょう。
              </p>
            </section>

            {/* SECTION 3 */}
            <section id="s3" className="sec">
              <div className="sec-hd">
                <div className="sec-num">3</div>
                <h2 className="sec-title">主役① 三叉神経(血管)系(Trigeminovascular System)</h2>
              </div>

              <h3>3-1. 三叉神経とは</h3>
              <p>
                三叉神経は12対ある脳神経のうち第5番目(第V脳神経)で、顔面の感覚を担う最大の脳神経です。名前のとおり3本の枝に分かれています。
              </p>

              <div className="tbl th-teal">
                <table>
                  <thead>
                    <tr>
                      <th>枝</th>
                      <th>名称</th>
                      <th>支配領域</th>
                      <th>主に関連する頭痛</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>第1枝(V1)</td>
                      <td>眼神経</td>
                      <td>
                        前頭部・眼窩・上眼瞼・<strong>硬膜前方部</strong>
                      </td>
                      <td>片頭痛、群発頭痛</td>
                    </tr>
                    <tr>
                      <td>第2枝(V2)</td>
                      <td>上顎神経</td>
                      <td>頬部・上顎・鼻</td>
                      <td>三叉神経痛</td>
                    </tr>
                    <tr>
                      <td>第3枝(V3)</td>
                      <td>下顎神経</td>
                      <td>下顎・側頭部(感覚+咀嚼筋の運動)</td>
                      <td>三叉神経痛</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <p>
                頭痛の観点で特に重要なのは<strong>第1枝(眼神経)</strong>
                です。この枝が硬膜や脳の太い血管(特に前方の血管)を包むように分布しており、これらの組織で生じた侵害刺激(痛みのもとになる刺激)を脳へ伝えます。
              </p>

              <h3>3-2.「三叉神経血管系」という考え方</h3>
              <p>
                1980年代以降の研究(Moskowitz、Goadsby &amp;
                Edvinssonらによる一連の研究)により、脳血管とその周囲を取り巻く三叉神経の線維が機能的に一体のシステムとして働くことがわかってきました。これが
                <strong>三叉神経血管系(Trigeminovascular System)</strong>です。
              </p>
              <p>
                このシステムが活性化すると、神経終末から
                <strong>CGRP(カルシトニン遺伝子関連ペプチド)</strong>
                などの神経ペプチドが放出され、血管拡張や「神経原性炎症」と呼ばれる炎症反応を引き起こします。これがさらに神経終末を刺激し、痛みが増幅される悪循環が生まれると考えられています。CGRPを標的とした薬剤(抗CGRP抗体薬など)が近年の片頭痛治療で使われているのは、この仕組みに基づいています。
              </p>

              <div className="mmd">
                <div className="mmd-lbl">フローチャート ― 三叉神経血管系の痛み伝達経路</div>
                <MermaidDiagram
                  themeVariables={NERVES_MERMAID_THEME}
                  chart={`flowchart LR
A["硬膜・脳血管の侵害受容器<br/>(主にAδ線維・C線維)"] --> B["三叉神経節<br/>(Trigeminal Ganglion)"]
B --> C["三叉神経脊髄路核尾側亜核<br/>(Trigeminal Nucleus Caudalis)"]
C --> D["視床<br/>(Thalamus)"]
D --> E["大脳皮質<br/>(前頭葉・島皮質・帯状皮質など)"]
B -.->|CGRP等の神経ペプチド放出| F["血管拡張・神経原性炎症"]
F -.->|さらなる神経終末の感作| A`}
                />
              </div>

              <h3>3-3. 片頭痛における「前兆」との関係</h3>
              <p>
                片頭痛の一部の患者にみられる「前兆(閃輝暗点などの視覚異常)」は、
                <strong>皮質拡延性抑制(Cortical Spreading Depression, CSD)</strong>
                と呼ばれる、大脳皮質を波のように広がる一過性の神経・グリア活動の変化が関与すると考えられています。CSDが硬膜血管周囲の三叉神経終末を刺激し、頭痛発作の引き金になるという研究報告が国際的な査読誌で発表されています。
              </p>

              <div className="mmd">
                <div className="mmd-lbl">フローチャート ― 皮質拡延性抑制(CSD)から頭痛発現まで</div>
                <MermaidDiagram
                  themeVariables={NERVES_MERMAID_THEME}
                  chart={`flowchart TD
A["誘因<br/>(睡眠不足・ストレス・光刺激など)"] --> B["皮質拡延性抑制<br/>(Cortical Spreading Depression)"]
B --> C["前兆症状<br/>(視覚異常など、患者の一部にみられる)"]
B --> D["血管周囲の三叉神経終末への影響"]
D --> E["三叉神経血管系の活性化"]
E --> F["CGRP等の神経ペプチド放出"]
F --> G["血管拡張・硬膜の神経原性炎症"]
E --> H["三叉神経脊髄路核尾側亜核・視床経由大脳皮質"]
H --> I["拍動性の頭痛として自覚"]`}
                />
              </div>
            </section>

            {/* SECTION 4 */}
            <section id="s4" className="sec">
              <div className="sec-hd">
                <div className="sec-num">4</div>
                <h2 className="sec-title">主役② 上位頸神経と後頭神経</h2>
              </div>

              <p>
                後頭部や首の痛みが頭痛と一緒に起こりやすいのは、この部分を支配する神経が理由です。
              </p>

              <div className="tbl th-orange">
                <table>
                  <thead>
                    <tr>
                      <th>神経名</th>
                      <th>由来</th>
                      <th>支配領域</th>
                      <th>主に関連する頭痛</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>大後頭神経(GON)</td>
                      <td>第2頸神経(C2)後枝</td>
                      <td>後頭部の正中寄りの広い範囲</td>
                      <td>後頭神経痛、頸原性頭痛</td>
                    </tr>
                    <tr>
                      <td>小後頭神経(LON)</td>
                      <td>頸神経叢(C2・C3由来)</td>
                      <td>後頭部外側〜耳介後方</td>
                      <td>後頭神経痛</td>
                    </tr>
                    <tr>
                      <td>第三後頭神経(TON)</td>
                      <td>第3頸神経(C3)後枝</td>
                      <td>後頭下部の正中付近</td>
                      <td>頸原性頭痛</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <p>
                なかでも大後頭神経(GON)は3つの中で最も太く、後頭下筋群や僧帽筋腱膜を貫いて頭皮に達するという、やや複雑で「屈曲した」走行をとります。この解剖学的な特徴のために、筋緊張や姿勢などによって神経が刺激・圧迫されやすいことが、StatPearls(米国国立医学図書館NCBIが提供する医学文献データベース)の解説で指摘されています。
              </p>
            </section>

            {/* SECTION 5 */}
            <section id="s5" className="sec">
              <div className="sec-hd">
                <div className="sec-num">5</div>
                <h2 className="sec-title">統合ハブ「三叉神経頸髄複合体(TCC)」</h2>
              </div>

              <p>ここが本解説のなかで最も重要なポイントです。</p>
              <p>
                三叉神経(特に第1枝)からの情報と、上位頸神経(C1〜C3、後頭神経)からの情報は、脳幹の下部から脊髄上部(延髄〜C2/C3レベル)にかけて存在する神経細胞群で
                <strong>合流</strong>します。この合流地点は
                <strong>三叉神経頸髄複合体(Trigeminocervical Complex, TCC)</strong>
                と呼ばれ、頭部への痛み情報を中継する共通の「駅」のような役割を果たしています。
              </p>

              <div className="mmd">
                <div className="mmd-lbl">
                  フローチャート ― 三叉神経頸髄複合体(TCC)での情報の合流
                </div>
                <MermaidDiagram
                  themeVariables={NERVES_MERMAID_THEME}
                  chart={`flowchart TD
V1["三叉神経第1枝(眼神経)<br/>硬膜・眼窩周囲からの入力"] --> TCC
C2["大後頭神経<br/>C2神経後枝由来の入力"] --> TCC
C3["第三後頭神経<br/>C3神経由来の入力"] --> TCC
TCC["三叉神経頸髄複合体(TCC)<br/>延髄からC2/C3脊髄後角"] --> OUT["関連痛(放散痛)<br/>後頭部由来の刺激が前頭部や眼窩の痛みとして感じられることがある"]`}
                />
              </div>

              <p>
                このTCCでの情報の「合流」があるために、たとえば大後頭神経の圧迫による後頭部の痛み(後頭神経痛)が前頭部や眼の奥の痛みとして感じられたり、逆に片頭痛発作の際に首の痛みを伴ったりすることが説明できます。これは臨床現場でよく見られる「頭痛と首こりの併発」の神経学的な根拠のひとつとされています。
              </p>
            </section>

            {/* SECTION 6 */}
            <section id="s6" className="sec">
              <div className="sec-hd">
                <div className="sec-num">6</div>
                <h2 className="sec-title">
                  自律神経系の関与 ― 群発頭痛はなぜ涙や鼻づまりを伴うのか
                </h2>
              </div>

              <p>
                群発頭痛や、それに類似した一群の頭痛(三叉神経自律神経性頭痛群、Trigeminal Autonomic
                Cephalalgias:
                TACs)では、目の充血・流涙・鼻閉といった自律神経症状を伴うことが特徴です。これは「三叉神経自律神経反射」と呼ばれる仕組みによって説明されています。
              </p>
              <p>
                流れとしては、三叉神経第1枝が刺激されると、その情報が脳幹に伝わると同時に、反射的に
                <strong>上唾液核</strong>という部位を経由し、<strong>顔面神経(第7脳神経)</strong>
                を通って<strong>翼口蓋神経節(蝶口蓋神経節)</strong>
                という副交感神経節を活性化させます。この神経節からの出力が涙腺や鼻粘膜の血管に作用し、流涙や鼻閉といった症状を引き起こします。
              </p>
              <p>
                また、群発頭痛は明け方や特定の時間帯に起こりやすいなど、体内時計に関連した周期性がみられることから、
                <strong>視床下部後部</strong>
                (体内時計を司る領域)の関与が、機能画像研究などによって指摘されています。
              </p>

              <div className="mmd">
                <div className="mmd-lbl">フローチャート ― 三叉神経自律神経反射(群発頭痛)</div>
                <MermaidDiagram
                  themeVariables={NERVES_MERMAID_THEME}
                  chart={`flowchart LR
A["三叉神経第1枝<br/>(眼窩周囲の侵害刺激)"] --> B["脳幹<br/>(三叉神経脊髄路核)"]
B --> C["上唾液核<br/>(Superior Salivatory Nucleus)"]
C -->|顔面神経・第7脳神経を経由| D["翼口蓋神経節<br/>(蝶口蓋神経節)"]
D --> E["副交感神経症状<br/>流涙・結膜充血・鼻閉"]
F["視床下部後部<br/>(概日リズムの調節)"] -.->|周期性に関与| B`}
                />
              </div>
            </section>

            {/* SECTION 7 */}
            <section id="s7" className="sec">
              <div className="sec-hd">
                <div className="sec-num">7</div>
                <h2 className="sec-title">中枢性感作 ― 頭痛が「慢性化」する神経メカニズム</h2>
              </div>

              <p>
                頭痛が繰り返し起こったり、慢性化(たとえば緊張型頭痛が月15日以上続くなど)したりする背景には、
                <strong>中枢性感作</strong>という神経の可塑的変化が関わると考えられています。
              </p>
              <p>
                これは、末梢(硬膜や首・頭皮の筋膜など)からの痛み刺激が長期間・繰り返し中枢神経系に送られ続けることで、三叉神経脊髄路核や視床のニューロンが「過敏」になってしまう現象です。感作が進むと、本来は痛みを引き起こさないはずの軽い刺激(髪をとかす、帽子をかぶるなど)でも痛みとして感じる
                <strong>アロディニア(異痛症)</strong>
                が生じることがあります。緊張型頭痛の分野では、頭部・頸部の筋膜からの持続的な侵害入力が、この中枢性感作を引き起こす主要な要因のひとつとして、デンマークの研究者Bendtsenらの総説で提唱されています。
              </p>

              <div className="mmd">
                <div className="mmd-lbl">フローチャート ― 末梢性感作から中枢性感作・慢性化へ</div>
                <MermaidDiagram
                  themeVariables={NERVES_MERMAID_THEME}
                  chart={`flowchart LR
A["持続する侵害刺激<br/>(硬膜・頭頸部筋膜からの入力)"] --> B["末梢性感作<br/>(一次感覚ニューロンの閾値低下)"]
B --> C["中枢性感作<br/>(三叉神経脊髄路核・視床ニューロンの過敏化)"]
C --> D["アロディニア<br/>(通常は無痛の刺激で痛みを感じる)"]
C --> E["頭痛の慢性化<br/>(反復性から慢性への移行)"]`}
                />
              </div>
            </section>

            {/* SECTION 8 */}
            <section id="s8" className="sec">
              <div className="sec-hd">
                <div className="sec-num">8</div>
                <h2 className="sec-title">代表的な頭痛タイプと神経メカニズムのまとめ表</h2>
              </div>

              <p>
                国際頭痛分類第3版(ICHD-3、国際頭痛学会発行、WHOの国際疾病分類にも組み込まれている公式分類)に基づく代表的な頭痛と、ここまで解説した神経メカニズムとの対応をまとめます。
              </p>

              <div className="tbl">
                <table>
                  <thead>
                    <tr>
                      <th>頭痛のタイプ</th>
                      <th>ICHD-3上の位置づけ</th>
                      <th>主に関わる神経・構造</th>
                      <th>中心的な神経メカニズム</th>
                      <th>特徴的な随伴症状</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>片頭痛(Migraine)</td>
                      <td>第1部:片頭痛</td>
                      <td>三叉神経第1枝、三叉神経血管系、視床、大脳皮質</td>
                      <td>皮質拡延性抑制 → 三叉神経血管系の活性化とCGRP放出</td>
                      <td>拍動性、悪心・嘔吐、光・音過敏</td>
                    </tr>
                    <tr>
                      <td>緊張型頭痛(Tension-type headache)</td>
                      <td>第2部:緊張型頭痛</td>
                      <td>頭頸部筋膜の侵害受容器、三叉神経脊髄路核</td>
                      <td>筋膜からの持続的侵害入力 → 中枢性感作(慢性型)</td>
                      <td>締め付けられるような非拍動性の痛み</td>
                    </tr>
                    <tr>
                      <td>群発頭痛など三叉神経自律神経性頭痛群(TACs)</td>
                      <td>第3部:三叉神経自律神経性頭痛群</td>
                      <td>三叉神経第1枝、翼口蓋神経節、上唾液核、視床下部後部</td>
                      <td>三叉神経自律神経反射の過剰な活性化</td>
                      <td>眼窩周囲の激痛、流涙、鼻閉、概日リズム性</td>
                    </tr>
                    <tr>
                      <td>後頭神経痛(Occipital neuralgia)</td>
                      <td>第13部:有痛性脳神経ニューロパチー等</td>
                      <td>大後頭神経・小後頭神経・第三後頭神経(C2・C3)</td>
                      <td>神経の絞扼・圧迫による発痛</td>
                      <td>後頭部の電撃様・刺すような痛み</td>
                    </tr>
                    <tr>
                      <td>三叉神経痛(Trigeminal neuralgia)</td>
                      <td>第13部:有痛性脳神経ニューロパチー等</td>
                      <td>三叉神経本幹(多くは第2・3枝領域)</td>
                      <td>血管による神経根の圧迫と脱髄が関与するとされる</td>
                      <td>顔面の電撃様の激痛が発作性に生じる</td>
                    </tr>
                    <tr>
                      <td>頸原性頭痛(Cervicogenic headache)</td>
                      <td>付録・二次性頭痛に関連</td>
                      <td>上位頸神経(C1〜C3)、TCC</td>
                      <td>頸椎由来の侵害入力がTCCを介して頭部へ放散</td>
                      <td>頸部可動域制限を伴う片側性の痛み</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* SECTION 9 */}
            <section id="s9" className="sec">
              <div className="sec-hd">
                <div className="sec-num">9</div>
                <h2 className="sec-title">全体フローチャートのおさらい</h2>
              </div>

              <p>最後に、これまでの内容を1枚のフローチャートに統合します。</p>

              <div className="mmd">
                <div className="mmd-lbl">フローチャート ― 頭痛神経メカニズムの統合図</div>
                <MermaidDiagram
                  themeVariables={NERVES_MERMAID_THEME}
                  chart={`flowchart TD
S1["硬膜・脳血管<br/>(頭蓋内の痛みを感じる組織)"] --> TGN["三叉神経(主に第1枝)"]
S2["頭皮・頸部の筋膜・関節"] --> CN["上位頸神経(C1-C3)<br/>大後頭神経・小後頭神経・第三後頭神経"]
TGN --> TCC2["三叉神経頸髄複合体(TCC)"]
CN --> TCC2
TGN -.->|反射性に活性化| AR["三叉神経自律神経反射<br/>(上唾液核・顔面神経・翼口蓋神経節)"]
AR --> AS["流涙・鼻閉などの自律神経症状"]
TCC2 --> TH["視床"]
TH --> CX["大脳皮質(頭痛として自覚)"]
TCC2 -.->|持続的な入力| CS["中枢性感作"]
CS --> CHR["頭痛の慢性化・アロディニア"]`}
                />
              </div>

              <div className="card">
                <h3 style={{ marginTop: 0 }}>まとめ</h3>
                <ul>
                  <li>
                    脳そのものには痛覚がなく、頭痛の痛みは主に
                    <strong>硬膜・血管・頭頸部の筋膜</strong>から<strong>三叉神経</strong>と
                    <strong>上位頸神経</strong>を通じて伝えられる。
                  </li>
                  <li>
                    三叉神経系と上位頸神経系は、<strong>三叉神経頸髄複合体(TCC)</strong>
                    で情報が合流するため、後頭部の痛みが前頭部に、あるいはその逆に感じられる「放散痛」が起こりうる。
                  </li>
                  <li>
                    群発頭痛のような自律神経症状を伴う頭痛には、
                    <strong>翼口蓋神経節を介した副交感神経反射</strong>が関わる。
                  </li>
                  <li>
                    慢性的な頭痛の背景には、神経系が過敏になる<strong>中枢性感作</strong>
                    という現象が関与すると考えられている。
                  </li>
                </ul>
              </div>
            </section>

            {/* SECTION 10 */}
            <section id="s10" className="sec">
              <div className="sec-hd">
                <div className="sec-num">10</div>
                <h2 className="sec-title">参考文献・出典</h2>
              </div>

              <h3>国際的な分類・学会(第一級の情報源)</h3>
              <div className="src-grid">
                <div className="src">
                  <div className="src-org">International Headache Society</div>
                  <div className="src-t">
                    ICHD-3: The International Classification of Headache Disorders, 3rd edition
                  </div>
                  <div className="src-url">
                    <Ext href="https://ichd-3.org/">https://ichd-3.org/</Ext>
                  </div>
                </div>
                <div className="src">
                  <div className="src-org">International Headache Society</div>
                  <div className="src-t">ICHD公式リソースページ</div>
                  <div className="src-url">
                    <Ext href="https://ihs-headache.org/en/resources/ichd/">
                      https://ihs-headache.org/en/resources/ichd/
                    </Ext>
                  </div>
                </div>
                <div className="src">
                  <div className="src-org">The Lancet Neurology (2018)</div>
                  <div className="src-t">
                    Olesen J. International Classification of Headache Disorders
                  </div>
                  <div className="src-url">
                    <Ext href="https://www.thelancet.com/journals/laneur/article/PIIS1474-4422(18)30085-1/fulltext">
                      thelancet.com/.../PIIS1474-4422(18)30085-1
                    </Ext>
                  </div>
                </div>
                <div className="src">
                  <div className="src-org">PubMed(NIH)</div>
                  <div className="src-t">
                    Headache Classification Committee of the IHS. ICHD-3, 3rd edition
                  </div>
                  <div className="src-url">
                    <Ext href="https://pubmed.ncbi.nlm.nih.gov/29368949/">
                      https://pubmed.ncbi.nlm.nih.gov/29368949/
                    </Ext>
                  </div>
                </div>
              </div>

              <h3>米国政府系の医学研究機関(NIH)</h3>
              <div className="src-grid">
                <div className="src">
                  <div className="src-org">NINDS(米国立神経疾患・脳卒中研究所)</div>
                  <div className="src-t">Headache</div>
                  <div className="src-url">
                    <Ext href="https://www.ninds.nih.gov/health-information/disorders/headache">
                      ninds.nih.gov/.../headache
                    </Ext>
                  </div>
                </div>
                <div className="src">
                  <div className="src-org">NINDS</div>
                  <div className="src-t">Trigeminal Neuralgia</div>
                  <div className="src-url">
                    <Ext href="https://www.ninds.nih.gov/health-information/disorders/trigeminal-neuralgia">
                      ninds.nih.gov/.../trigeminal-neuralgia
                    </Ext>
                  </div>
                </div>
                <div className="src">
                  <div className="src-org">NIDCR(米国立歯科・頭蓋顔面研究所)</div>
                  <div className="src-t">Trigeminal Neuralgia</div>
                  <div className="src-url">
                    <Ext href="https://www.nidcr.nih.gov/health-info/trigeminal-neuralgia">
                      nidcr.nih.gov/health-info/trigeminal-neuralgia
                    </Ext>
                  </div>
                </div>
                <div className="src">
                  <div className="src-org">StatPearls(NCBI Bookshelf, NIH)</div>
                  <div className="src-t">Occipital Nerve Block</div>
                  <div className="src-url">
                    <Ext href="https://www.ncbi.nlm.nih.gov/books/NBK580523/">
                      ncbi.nlm.nih.gov/books/NBK580523
                    </Ext>
                  </div>
                </div>
                <div className="src">
                  <div className="src-org">StatPearls(NCBI Bookshelf, NIH)</div>
                  <div className="src-t">Cervicogenic Headache</div>
                  <div className="src-url">
                    <Ext href="https://www.ncbi.nlm.nih.gov/books/NBK507862/">
                      ncbi.nlm.nih.gov/books/NBK507862
                    </Ext>
                  </div>
                </div>
                <div className="src">
                  <div className="src-org">StatPearls(NCBI Bookshelf, NIH)</div>
                  <div className="src-t">Cluster Headache</div>
                  <div className="src-url">
                    <Ext href="https://www.ncbi.nlm.nih.gov/books/NBK544241/">
                      ncbi.nlm.nih.gov/books/NBK544241
                    </Ext>
                  </div>
                </div>
              </div>

              <h3>主要な査読付き総説・原著論文</h3>
              <div className="src-grid">
                <div className="src">
                  <div className="src-org">J Cereb Blood Flow Metab (1999)</div>
                  <div className="src-t">
                    May A, Goadsby PJ. The Trigeminovascular System in Humans
                  </div>
                  <div className="src-url">
                    <Ext href="https://journals.sagepub.com/doi/10.1097/00004647-199902000-00001">
                      journals.sagepub.com/.../00004647-199902000-00001
                    </Ext>
                  </div>
                </div>
                <div className="src">
                  <div className="src-org">Annals of Neurology (1993)</div>
                  <div className="src-t">
                    Goadsby PJ, Edvinsson L. The Trigeminovascular System and Migraine
                  </div>
                  <div className="src-url">
                    <Ext href="https://onlinelibrary.wiley.com/doi/abs/10.1002/ana.410330109">
                      onlinelibrary.wiley.com/.../ana.410330109
                    </Ext>
                  </div>
                </div>
                <div className="src">
                  <div className="src-org">Headache: The Journal of Head and Face Pain (2019)</div>
                  <div className="src-t">
                    Iyengar S, et al. CGRP and the Trigeminal System in Migraine
                  </div>
                  <div className="src-url">
                    <Ext href="https://headachejournal.onlinelibrary.wiley.com/doi/10.1111/head.13529">
                      headachejournal.onlinelibrary.wiley.com/.../head.13529
                    </Ext>
                  </div>
                </div>
                <div className="src">
                  <div className="src-org">The Lancet Neurology (2002)</div>
                  <div className="src-t">Goadsby PJ. Pathophysiology of Cluster Headache</div>
                  <div className="src-url">
                    <Ext href="https://www.thelancet.com/journals/laneur/article/PIIS1474-4422(02)00104-7/abstract">
                      thelancet.com/.../PIIS1474-4422(02)00104-7
                    </Ext>
                  </div>
                </div>
                <div className="src">
                  <div className="src-org">Cephalalgia / PubMed (2000)</div>
                  <div className="src-t">
                    Bendtsen L. Central Sensitization in Tension-Type Headache
                  </div>
                  <div className="src-url">
                    <Ext href="https://pubmed.ncbi.nlm.nih.gov/11037746/">
                      https://pubmed.ncbi.nlm.nih.gov/11037746/
                    </Ext>
                  </div>
                </div>
                <div className="src">
                  <div className="src-org">Current Pain and Headache Reports (2005)</div>
                  <div className="src-t">
                    Bendtsen L, Fernández-de-la-Peñas C. Pathophysiology of Tension-Type Headache
                  </div>
                  <div className="src-url">
                    <Ext href="https://link.springer.com/content/pdf/10.1007/s11916-005-0021-8.pdf">
                      link.springer.com/.../s11916-005-0021-8
                    </Ext>
                  </div>
                </div>
                <div className="src">
                  <div className="src-org">Current Opinion in Neurology / PubMed (2004)</div>
                  <div className="src-t">
                    Sanchez-del-Rio M, Reuter U. Migraine Aura: New Information on Underlying
                    Mechanisms
                  </div>
                  <div className="src-url">
                    <Ext href="https://pubmed.ncbi.nlm.nih.gov/15167063/">
                      https://pubmed.ncbi.nlm.nih.gov/15167063/
                    </Ext>
                  </div>
                </div>
              </div>

              <div className="alert a-warn" style={{ marginTop: 20 }}>
                <div className="alert-i">📌</div>
                <div>
                  本資料はステップバイステップの教育目的で作成された解説であり、上記文献の内容を要約・再構成したものです。個々の記述の詳細や最新の知見については、必ず原著論文・一次情報源をご確認ください。
                </div>
              </div>
            </section>

            {/* Related Links Component */}
            <RelatedLinks href="/anatomy/headache-related-nerves" />
          </AutoGlossary>
        </main>
      </div>

      {/* FOOTER */}
      <div className="footer">
        <strong>頭痛と神経系</strong> — 国際文献にもとづく神経解剖ステップバイステップガイド
        <br />📅 作成年: 2026 | 次回レビュー推奨: ICHD改訂または主要ガイドライン更新時
        <br />
        ⚠️
        本資料は学術・教育目的のみを対象としています。臨床への適用は必ず資格を持つ医療専門家の監督のもとで行ってください。
      </div>
    </div>
  );
}
