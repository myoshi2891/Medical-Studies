import "./headache-brainstem-neuroscience.css";
import type { Metadata } from "next";
import { BrainstemSidebar } from "@/components/anatomy/BrainstemSidebar";
import { RelatedLinks } from "@/components/content/RelatedLinks";
import { Ext } from "@/components/Ext";
import AutoGlossary from "@/components/glossary/AutoGlossary";
import MermaidDiagram from "@/components/MermaidDiagram";

export const metadata: Metadata = {
  title: "頭痛と脳・脳幹 ― 国際文献に基づく神経科学的解説",
  description:
    "三叉神経血管系・脳幹核・視床下部・大脳皮質の関与をステップバイステップで学ぶ。ICHD-3・CGRP・皮質拡延性抑制（CSD）など神経科学の最新知見を解説。",
};

const BRAINSTEM_MERMAID_THEME: Record<string, string> = {
  primaryColor: "#e3f2fd",
  primaryTextColor: "#1a237e",
  primaryBorderColor: "#0277bd",
  lineColor: "#0277bd",
  secondaryColor: "#e0f2f1",
  tertiaryColor: "#e8f5e9",
  edgeLabelBackground: "#ffffff",
  fontSize: "13px",
};

export default function HeadacheBrainstemNeurosciencePage() {
  return (
    <div className="brainstem-page">
      {/* ヒーロー */}
      <div className="hero">
        <div style={{ fontSize: 44 }}>🧠</div>
        <h1>頭痛と脳・脳幹 ― 国際文献に基づく神経科学的解説</h1>
        <p className="hero-sub">
          三叉神経血管系・脳幹核・視床下部・大脳皮質の関与をステップバイステップで学ぶ
        </p>
        <div className="hero-tags">
          <span className="hero-tag">三叉神経血管系</span>
          <span className="hero-tag">脳幹</span>
          <span className="hero-tag">三叉神経頸椎複合体</span>
          <span className="hero-tag">視床下部</span>
          <span className="hero-tag">ICHD-3</span>
          <span className="hero-tag">CGRP</span>
          <span className="hero-tag">群発頭痛</span>
        </div>
      </div>

      {/* 免責事項 */}
      <div className="disclaimer">
        <strong>⚠️ Academic Disclaimer（学術免責事項）</strong>　本資料は
        <strong>学術・教育・研究目的のみ</strong>
        を対象としています。すべての内容は資格を持つ医療専門家による臨床適用前のレビューが必要です。個人的な医療アドバイス・診断・処方を提供するものではありません。強い頭痛、突然発症した頭痛、今までと性質の異なる頭痛がある場合は、必ず医療機関を受診してください。
      </div>

      {/* レイアウト */}
      <div className="layout">
        {/* サイドバー */}
        <BrainstemSidebar />

        {/* メインコンテンツ */}
        <main className="main">
          <AutoGlossary>
            {/* セクション 1 */}
            <section id="s1" className="sec">
              <div className="sec-hd">
                <div className="sec-num">1</div>
                <h2 className="sec-title">この記事の位置づけ</h2>
              </div>
              <div className="card">
                <p>
                  頭痛は世界的に非常にありふれた神経症状ですが、その背後にある神経科学は決して単純ではありません。世界保健機関（WHO）のファクトシートによれば、頭痛疾患は神経系疾患の中でも特に頻度の高いものの一つであり、片頭痛・緊張型頭痛・群発頭痛などの一次性頭痛が、痛みそのものを主症状とする疾患として位置づけられています。
                </p>
                <p>
                  かつて頭痛は「血管の拡張・収縮」だけで説明される
                  <span className="tN">「血管性頭痛」</span>
                  と考えられていました。しかし1980年代以降の研究により、頭痛は末梢の血管だけでなく、三叉神経系・脳幹・視床下部・大脳皮質が相互に関わる
                  <span className="tN">「神経血管性（neurovascular）」</span>
                  な現象であることが明らかになっています。本稿ではこの神経科学的な理解を、初学者にもわかりやすいよう段階的に解説します。
                </p>
                <div className="alert a-info">
                  <div className="alert-i">ℹ️</div>
                  <div>
                    本稿の内容は、国際頭痛学会（IHS）・世界保健機関（WHO）・米国国立神経疾患・脳卒中研究所（NINDS/NIH）、および{" "}
                    <em>Physiological Reviews</em>・<em>Nature Reviews Neurology</em>・
                    <em>The Lancet</em>／<em>The Lancet Neurology</em>{" "}
                    等の査読済み国際学術誌に基づいています。各セクション末尾および第13章に一次資料のURLを明記しています。
                  </div>
                </div>
              </div>
            </section>

            {/* セクション 2 */}
            <section id="s2" className="sec">
              <div className="sec-hd">
                <div className="sec-num">2</div>
                <h2 className="sec-title">頭痛とは何か ― 国際的な分類の枠組み</h2>
              </div>
              <div className="card">
                <p>
                  頭痛の診断・研究における国際標準は、国際頭痛学会が発行する
                  <strong>国際頭痛分類第3版（ICHD-3）</strong>
                  です。ICHD-3はWHOの国際疾病分類（ICD）とも連携しており、世界中の臨床・研究で共通言語として用いられています。
                </p>

                <h3>ICHD-3の3大部門</h3>
                <div className="tbl">
                  <table>
                    <thead>
                      <tr>
                        <th>部門</th>
                        <th>内容</th>
                        <th>代表的な疾患</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>一次性頭痛</td>
                        <td>頭痛そのものが病気の本体であり、他の疾患の症状ではないもの</td>
                        <td>片頭痛、緊張型頭痛、群発頭痛などの三叉神経自律神経性頭痛</td>
                      </tr>
                      <tr>
                        <td>二次性頭痛</td>
                        <td>他の疾患（外傷、血管障害、感染など）に起因して生じるもの</td>
                        <td>薬物乱用頭痛、くも膜下出血に伴う頭痛など</td>
                      </tr>
                      <tr>
                        <td>有痛性脳神経ニューロパチー・顔面痛・その他</td>
                        <td>脳神経そのものの障害などによるもの</td>
                        <td>三叉神経痛など</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <p>
                  本稿では、一次性頭痛（特に片頭痛・群発頭痛）の発生に脳・脳幹がどう関わるかに焦点を当てます。これは研究が最も進んでいる領域であり、脳幹の役割を理解する上で最も情報量の多いテーマだからです。
                </p>
                <div className="alert a-ok">
                  <div className="alert-i">🌐</div>
                  <div>
                    ICHD-3の各診断には、WHOの国際疾病分類（ICD）に対応するコードが併記されています。またWHOの国際疾病分類第11版（ICD-11）の頭痛関連分類は、国際頭痛学会との連携のもとICHD-3を踏まえて整備されており、ICHD-3は臨床・研究の国際的な共通基準として広く用いられています。
                  </div>
                </div>
              </div>
            </section>

            {/* セクション 3 */}
            <section id="s3" className="sec">
              <div className="sec-hd">
                <div className="sec-num">3</div>
                <h2 className="sec-title">「痛みを感じる脳」というよくある誤解</h2>
              </div>
              <div className="card">
                <p>
                  初学者が誤解しやすい点として、「頭痛＝脳そのものが痛んでいる」というイメージがあります。しかし、これは神経解剖学的には正確ではありません。
                </p>
                <p>
                  脳の実質（神経細胞やグリア細胞が集まった組織そのもの）には、痛みを感知する侵害受容器がほとんど存在しません。実際に痛みを感じる（＝侵害刺激を受容できる）頭蓋内の構造は限られており、主に以下のようなものです。
                </p>
                <ul>
                  <li>硬膜（脳を包む一番外側の膜）とその血管</li>
                  <li>静脈洞（硬膜内を走る太い静脈）</li>
                  <li>頭蓋底付近の大血管（内頸動脈・椎骨動脈など）</li>
                  <li>頭皮・頭蓋骨周囲の筋肉や血管</li>
                </ul>
                <p>
                  これらの構造は主に三叉神経（特に第一枝である眼神経）と、上位頸髄神経（C1〜C3）によって支配されています。
                </p>
                <div className="alert a-warn">
                  <div className="alert-i">💡</div>
                  <div>
                    <strong>ポイント：</strong>
                    頭痛の「痛みの発生源」は脳そのものではなく、脳を取り巻く膜・血管・神経です。その情報が脳幹を経由して脳へと伝えられることで「頭が痛い」という知覚が生まれます。
                  </div>
                </div>
              </div>
            </section>

            {/* セクション 4 */}
            <section id="s4" className="sec">
              <div className="sec-hd">
                <div className="sec-num">4</div>
                <h2 className="sec-title">三叉神経血管系 ― 頭痛が生まれる入口</h2>
              </div>
              <div className="card">
                <p>
                  硬膜・血管と脳をつなぐこの神経回路網は、
                  <strong>三叉神経血管系（trigeminovascular system）</strong>
                  と呼ばれます。1980年代にMoskowitzらのグループによって提唱され、その後May・Goadsbyらによって体系的にまとめられた、頭痛研究における中核的な概念です。
                </p>

                <div className="mmd">
                  <div className="mmd-lbl">フローチャート ― 三叉神経血管系の痛み伝達経路</div>
                  <MermaidDiagram
                    themeVariables={BRAINSTEM_MERMAID_THEME}
                    chart={`flowchart TD
A["硬膜・脳血管\\n（痛みを感知できる数少ない頭蓋内組織）"] -->|三叉神経第一枝<br/>眼神経の枝| B["三叉神経節\\n(Trigeminal Ganglion)"]
B --> C["三叉神経脊髄路核 尾側亜核\\n(Trigeminal Nucleus Caudalis)\\n脳幹・延髄に位置"]
C --> D["視床\\n(Thalamus)"]
D --> E["大脳皮質\\n体性感覚野・島皮質など\\n（痛みとして自覚）"]
F["中脳水道周囲灰白質\\n(PAG)"] -. "下行性の調節" .-> C
G["延髄吻側腹内側部\\n(RVM)"] -. "下行性の調節" .-> C
H["青斑核\\n(Locus Coeruleus)"] -. "調節" .-> C`}
                  />
                </div>

                <p>
                  三叉神経節の細い感覚神経線維（C線維・Aδ線維）は、硬膜血管の周囲に分布しています。これらの神経終末はCGRP（カルシトニン遺伝子関連ペプチド）やサブスタンスPといった神経ペプチドを含んでおり、刺激されると血管を拡張させると同時に、痛みの信号を脳幹へと伝えます。特にCGRPは片頭痛発作時に血中濃度が上昇することが確認されており、現在の片頭痛治療薬の主要な標的にもなっています（第12章参照）。
                </p>

                <div className="alert a-info">
                  <div className="alert-i">🔁</div>
                  <div>
                    重要なのは、この経路が一方向ではないという点です。硬膜から脳幹への「上行性」の痛み信号だけでなく、脳幹から硬膜血管への「下行性」の調節（三叉神経副交感神経反射など）も存在し、双方向のループを形成しています。
                  </div>
                </div>
              </div>
            </section>

            {/* セクション 5 */}
            <section id="s5" className="sec">
              <div className="sec-hd">
                <div className="sec-num">5</div>
                <h2 className="sec-title">脳幹 ― 頭痛の中継点であり調整役</h2>
              </div>
              <div className="card">
                <p>
                  脳幹は、単なる「痛み信号の通り道」ではなく、痛みの強さそのものを増幅させたり抑制させたりする調整役として働きます。ここでは頭痛研究において特に重要とされる脳幹核をひとつずつ見ていきます。
                </p>

                <h3>5-1. 三叉神経脊髄路核 尾側亜核（Trigeminal Nucleus Caudalis, TNC）</h3>
                <p>
                  三叉神経の中枢側の入口にあたる核で、延髄から上位頸髄（C1〜C2）にかけて連続的に広がっています。硬膜や顔面から届いた痛み信号を最初に受け取る「二次ニューロン」が存在する場所であり、次章で扱う三叉神経頸椎複合体の中心的な構成要素です。
                </p>

                <h3>5-2. 中脳水道周囲灰白質（Periaqueductal Gray, PAG）</h3>
                <p>
                  中脳に位置するPAGは、古くから全身の痛みを抑制する「下行性疼痛抑制系」の中枢として知られてきました。動物実験ではPAGを刺激するとTNCニューロンの活動が抑えられ、逆にPAGの機能を薬理学的に阻害するとTNCニューロンの自発活動・痛み関連活動がともに増加することが示されています。
                </p>

                <h3>5-3. 延髄吻側腹内側部（Rostral Ventromedial Medulla, RVM）</h3>
                <p>
                  RVMはPAGからの下行性信号をTNCへ中継する「通過点」として働くと考えられており、状況に応じて痛みを促進する方向にも抑制する方向にも働き得る、双方向性の調節を担っています。
                </p>

                <h3>5-4. 青斑核（Locus Coeruleus, LC）・縫線核（Raphe Nuclei）</h3>
                <p>
                  青斑核はノルアドレナリン作動性ニューロンが集まる脳幹核で、覚醒・注意・自律神経調節に関わることで知られていますが、頭痛研究においてもCGRPやPACAP（下垂体アデニル酸シクラーゼ活性化ポリペプチド）を含む神経細胞体が高密度に存在することが確認されており、三叉神経頸椎複合体の活動調節に関与すると考えられています。縫線核はセロトニン作動性の中枢であり、同様に下行性の痛み調節に関わります。
                </p>

                <h3>5-5. 「片頭痛発生装置（migraine generator）」論争</h3>
                <p>
                  1990年代のPET研究で、片頭痛発作中に中脳・橋（背外側橋、dorsolateral
                  pons）に活動の増加が観察されたことから、この領域が発作そのものを引き起こす「片頭痛発生装置」であるとする仮説が提唱されました。
                </p>

                <div className="tbl">
                  <table className="th-purple">
                    <thead>
                      <tr>
                        <th>立場</th>
                        <th>主張の要点</th>
                        <th>評価</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>発生装置仮説を支持</td>
                        <td>
                          片頭痛発作中に中脳・背外側橋の血流増加をPET研究で確認。発作の「引き金」となる中枢と位置づける
                        </td>
                        <td>
                          <span className="bGrn">国際的に広く引用</span>
                        </td>
                      </tr>
                      <tr>
                        <td>発生装置仮説に批判的</td>
                        <td>
                          脳幹の活動は片頭痛に特異的ではなく他の痛みでも観察されうる。PAGが常に活性化しているとは限らないとし、背外側橋は圧痛・悪心・感覚変調・痛みの調節など複数機能に関わる複雑な役割を担うと再解釈
                        </td>
                        <td>
                          <span className="bOra">議論が継続中</span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="alert a-purple">
                  <div className="alert-i">⚖️</div>
                  <div>
                    脳幹が片頭痛の病態に深く関与していること自体は多くの研究で一致していますが、その関与が「発作の引き金」なのか「発作に伴う調節反応」なのかについては、現在も国際的な学術議論が続いているというのが正確な理解です。
                  </div>
                </div>
              </div>
            </section>

            {/* セクション 6 */}
            <section id="s6" className="sec">
              <div className="sec-hd">
                <div className="sec-num">6</div>
                <h2 className="sec-title">三叉神経頸椎複合体 ― 首と頭痛がつながる理由</h2>
              </div>
              <div className="card">
                <p>
                  「肩や首のこりが頭痛につながる」という経験は多くの人にありますが、これには明確な神経解剖学的根拠があります。
                </p>
                <p>
                  三叉神経脊髄路核尾側亜核は、解剖学的に上位頸髄（C1〜C3、特にC2）の後角と連続しており、両者はまとめて
                  <strong>三叉神経頸椎複合体（Trigeminocervical Complex, TCC）</strong>
                  と呼ばれます。
                </p>

                <div className="mmd">
                  <div className="mmd-lbl">フローチャート ― 三叉神経頸椎複合体における収束</div>
                  <MermaidDiagram
                    themeVariables={BRAINSTEM_MERMAID_THEME}
                    chart={`flowchart LR
T["三叉神経\\n（顔面・前頭部・硬膜からの入力）"] --> TCC["三叉神経頸椎複合体\\n(Trigeminocervical Complex)\\n延髄〜上位頸髄"]
C1["頸神経 C1"] --> TCC
C2["頸神経 C2\\n（大後頭神経）"] --> TCC
C3["頸神経 C3"] --> TCC
TCC --> UP["視床を経て大脳皮質へ\\n（痛みとして認知）"]
TCC -. "関連痛の発生" .-> REF["後頭部・側頭部・眼窩奥などに\\n痛みが広がって感じられる"]`}
                  />
                </div>

                <p>
                  TCCでは、三叉神経（顔・前頭部・硬膜からの入力）と上位頸神経（後頭部・首からの入力）の信号が同じ二次ニューロンに収束（convergence）します。脳はこの収束した信号の「発信源」を正確に区別できないため、首の構造からの痛み信号が頭部の痛みとして自覚されたり、逆に頭痛が首や肩の症状として自覚されたりする「関連痛」が起こります。
                </p>

                <div className="alert a-info">
                  <div className="alert-i">🔗</div>
                  <div>
                    これが、緊張型頭痛や片頭痛でしばしば首のこわばりや後頭部の痛みを伴う神経学的な背景です。
                  </div>
                </div>
              </div>
            </section>

            {/* セクション 7 */}
            <section id="s7" className="sec">
              <div className="sec-hd">
                <div className="sec-num">7</div>
                <h2 className="sec-title">視床下部 ― 予兆症状と発作の周期性</h2>
              </div>
              <div className="card">
                <p>
                  片頭痛発作の多くは、頭痛そのものが始まる数時間から1日ほど前に、あくび、集中力低下、疲労感、食欲の変化、頻尿といった
                  <strong>「予兆症状（premonitory symptoms）」</strong>を伴うことが知られています。
                </p>
                <p>
                  これらの予兆症状の背景には視床下部の活動があると考えられています。ニトログリセリンで片頭痛発作を誘発する実験でH
                  <sub>2</sub>
                  <sup>15</sup>
                  O-PETを用いた研究では、頭痛が始まる前の予兆期の段階で、後部視床下部・中脳腹側被蓋野・PAGの血流増加（活動の増加）が観察されました。この所見は、視床下部が片頭痛発作の非常に早い段階、すなわち痛みが発生するよりも前の段階から関与していることを示す重要な証拠とされています。
                </p>

                <p>
                  視床下部の関与は群発頭痛においてさらに明確です。Mayらによる1998年のPET研究では、群発頭痛発作中に限って
                  <strong>後部視床下部灰白質</strong>
                  の活動が特異的に増加することが示されました。この活動は発作間欠期には見られず、片頭痛や実験的な頭部痛でも同様の所見は認められませんでした。
                </p>

                <div className="alert a-ok">
                  <div className="alert-i">⏱️</div>
                  <div>
                    この発見は、群発頭痛の特徴である厳密な日内・季節性の周期性（体内時計様の規則性）を説明する神経基盤として重視されています。
                  </div>
                </div>
              </div>
            </section>

            {/* セクション 8 */}
            <section id="s8" className="sec">
              <div className="sec-hd">
                <div className="sec-num">8</div>
                <h2 className="sec-title">大脳皮質と皮質拡延性抑制（CSD）― 前兆のメカニズム</h2>
              </div>
              <div className="card">
                <p>
                  片頭痛の一部の患者（約3割程度）は、頭痛の前や最中に「前兆（aura）」と呼ばれる一過性の神経症状（視野のギザギザした光、しびれなど）を経験します。この前兆の神経基盤として最も有力視されているのが、
                  <strong>皮質拡延性抑制（Cortical Spreading Depression, CSD）</strong>です。
                </p>
                <p>
                  CSDは1944年にブラジルの生理学者アリスチデス・レアオンによって動物脳で初めて記載された現象で、大脳皮質上を毎分数ミリメートルというごく緩やかな速度で伝播する、神経細胞の脱分極の波とそれに続く電気活動の抑制です。この波の伝播速度が、片頭痛の前兆症状（視覚症状が視野の中をゆっくり広がっていく様子）と一致することから、CSDが前兆の生理学的な基盤であるとする仮説が広く支持されています。
                </p>

                <div className="alert a-info">
                  <div className="alert-i">🧬</div>
                  <div>
                    CSDは単に大脳皮質だけの現象ではなく、皮質から三叉神経血管系を活性化させる引き金にもなりうると考えられています。つまり、前兆（皮質の現象）と頭痛（三叉神経血管系・脳幹の現象）は、CSDを介してひとつながりの過程として理解されつつあります。
                  </div>
                </div>
              </div>
            </section>

            {/* セクション 9 */}
            <section id="s9" className="sec">
              <div className="sec-hd">
                <div className="sec-num">9</div>
                <h2 className="sec-title">片頭痛発作の全体像（統合フローチャート）</h2>
              </div>
              <div className="card">
                <p>
                  ここまで見てきた要素を、片頭痛発作の時間経過に沿って統合すると、以下のようになります。
                </p>

                <div className="mmd">
                  <div className="mmd-lbl">フローチャート ― 片頭痛発作の4段階と関与する脳領域</div>
                  <MermaidDiagram
                    themeVariables={BRAINSTEM_MERMAID_THEME}
                    chart={`flowchart LR
subgraph P1["① 予兆期\\n（発作の数時間〜1日前）"]
H1["視床下部・中脳腹側被蓋野の\\n活動増加"]
end
subgraph P2["② 前兆\\n（一部の患者のみ／通常60分以内）"]
H2["大脳皮質での\\n皮質拡延性抑制（CSD）"]
end
subgraph P3["③ 頭痛期"]
H3["三叉神経血管系の活性化\\n脳幹（PAG・RVM・青斑核）による調節\\n視床を経て皮質で痛みを自覚"]
end
subgraph P4["④ 回復期\\n（Postdrome）"]
H4["疲労感・集中力低下などが\\n残りつつ神経活動が正常化"]
end
P1 --> P2 --> P3 --> P4`}
                  />
                </div>

                <div className="phase-grid">
                  <div className="ph ph1">
                    <div className="ph-icon">🌙</div>
                    <div className="ph-title">① 予兆期</div>
                    <div className="ph-time">発作の数時間〜1日前</div>
                    <div className="ph-desc">
                      視床下部・中脳腹側被蓋野の活動が増加。あくび、疲労感、集中力低下、食欲変化など
                    </div>
                  </div>
                  <div className="ph ph2">
                    <div className="ph-icon">✨</div>
                    <div className="ph-title">② 前兆（Aura）</div>
                    <div className="ph-time">一部の患者のみ／通常60分以内</div>
                    <div className="ph-desc">
                      大脳皮質で皮質拡延性抑制（CSD）が進展。視覚症状・しびれなどが緩徐に広がる
                    </div>
                  </div>
                  <div className="ph ph3">
                    <div className="ph-icon">⚡</div>
                    <div className="ph-title">③ 頭痛期</div>
                    <div className="ph-time">数時間〜72時間</div>
                    <div className="ph-desc">
                      三叉神経血管系が活性化。脳幹（PAG・RVM・青斑核）が調節し、視床を経て皮質で痛みを自覚
                    </div>
                  </div>
                  <div className="ph ph4">
                    <div className="ph-icon">🌤️</div>
                    <div className="ph-title">④ 回復期</div>
                    <div className="ph-time">Postdrome</div>
                    <div className="ph-desc">
                      疲労感・集中力低下などが残存しつつ、神経活動が緩徐に正常化
                    </div>
                  </div>
                </div>

                <div className="alert a-info">
                  <div className="alert-i">📚</div>
                  <div>
                    この4段階モデルは、Goadsbyらによる2017年の総説（<em>Physiological Reviews</em>
                    ）で体系的に整理されたもので、片頭痛が「頭痛が起きてから始まる病気」ではなく、「脳の感覚処理システムが発作前から周期的に変化している病気」であるという理解を裏付けています。
                  </div>
                </div>
              </div>
            </section>

            {/* セクション 10 */}
            <section id="s10" className="sec">
              <div className="sec-hd">
                <div className="sec-num">10</div>
                <h2 className="sec-title">群発頭痛と三叉神経自律神経反射</h2>
              </div>
              <div className="card">
                <p>
                  群発頭痛は、片方の目の奥を中心とした激烈な痛みが、涙や結膜充血、鼻閉といった自律神経症状を伴って起こる一次性頭痛で、国際頭痛分類上は
                  <strong>
                    「三叉神経自律神経性頭痛（Trigeminal Autonomic Cephalalgias, TACs）」
                  </strong>
                  というグループに分類されます。
                </p>
                <p>
                  この自律神経症状の背景には、
                  <strong>三叉神経自律神経反射（trigeminal-autonomic reflex）</strong>
                  と呼ばれる脳幹内の反射弓があります。
                </p>

                <div className="mmd">
                  <div className="mmd-lbl">フローチャート ― 三叉神経自律神経反射弓（群発頭痛）</div>
                  <MermaidDiagram
                    themeVariables={BRAINSTEM_MERMAID_THEME}
                    chart={`flowchart TD
N["三叉神経（眼神経領域）への\\n侵害刺激"] --> TNC["三叉神経脊髄路核"]
TNC --> SSN["上唾液核\\n(Superior Salivatory Nucleus)\\n橋に位置"]
SSN -->|副交感神経遠心路<br/>顔面神経（第VII脳神経）経由| SPG["翼口蓋神経節\\n（蝶形口蓋神経節）"]
SPG --> SYM["流涙・結膜充血・鼻閉などの\\n自律神経症状"]
PH["後部視床下部\\n(Posterior Hypothalamus)"] -. "発作の誘発・周期性の調節" .-> SSN
TNC --> THAL["視床・大脳皮質へ\\n（痛みの認知）"]`}
                  />
                </div>

                <p>
                  三叉神経から入った痛みの信号は、三叉神経脊髄路核だけでなく橋にある上唾液核にも伝わります。上唾液核から出る副交感神経の遠心性線維は、顔面神経を経由して翼口蓋神経節（蝶形口蓋神経節）に至り、そこから涙腺や鼻粘膜の血管を刺激することで、涙・鼻閉といった自律神経症状を引き起こします。
                </p>

                <div className="alert a-purple">
                  <div className="alert-i">🔄</div>
                  <div>
                    前述の通り、後部視床下部はこの反射の活動性そのものを調節しており、群発頭痛特有の厳密な発作周期の背景にあると考えられています。なお、こうした自律神経症状は群発頭痛に限らず、片頭痛や三叉神経痛でも程度の差はあれ見られることがあり、TACsとその他の頭痛との違いは症状の「有無」ではなく「強さ・程度」にあるとされています。
                  </div>
                </div>
              </div>
            </section>

            {/* セクション 11 */}
            <section id="s11" className="sec">
              <div className="sec-hd">
                <div className="sec-num">11</div>
                <h2 className="sec-title">まとめ表 ― 脳・脳幹の主要構造と頭痛への関与</h2>
              </div>
              <div className="card">
                <div className="tbl">
                  <table>
                    <thead>
                      <tr>
                        <th>構造</th>
                        <th>主な位置</th>
                        <th>頭痛における主な役割</th>
                        <th>関連が深い頭痛</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>三叉神経節</td>
                        <td>頭蓋底（末梢）</td>
                        <td>硬膜・血管からの痛み信号を最初に受け取り、CGRPなどを放出</td>
                        <td>片頭痛、群発頭痛など</td>
                      </tr>
                      <tr>
                        <td>三叉神経脊髄路核 尾側亜核（TNC）</td>
                        <td>延髄〜上位頸髄</td>
                        <td>痛み信号を受け取る中枢側の最初の中継点。三叉神経頸椎複合体の中核</td>
                        <td>すべての一次性頭痛</td>
                      </tr>
                      <tr>
                        <td>中脳水道周囲灰白質（PAG）</td>
                        <td>中脳</td>
                        <td>下行性の痛み調節（抑制・修飾）</td>
                        <td>片頭痛（発生装置仮説の対象）</td>
                      </tr>
                      <tr>
                        <td>延髄吻側腹内側部（RVM）</td>
                        <td>延髄</td>
                        <td>PAGからの調節信号をTNCへ中継</td>
                        <td>片頭痛</td>
                      </tr>
                      <tr>
                        <td>青斑核（LC）</td>
                        <td>橋</td>
                        <td>ノルアドレナリン作動性の調節、CGRP・PACAP高発現</td>
                        <td>片頭痛</td>
                      </tr>
                      <tr>
                        <td>上唾液核</td>
                        <td>橋</td>
                        <td>三叉神経自律神経反射の遠心路の起点</td>
                        <td>群発頭痛などTACs</td>
                      </tr>
                      <tr>
                        <td>視床下部（特に後部）</td>
                        <td>間脳</td>
                        <td>予兆症状の発生、発作の周期性・体内時計様調節</td>
                        <td>片頭痛（予兆期）、群発頭痛</td>
                      </tr>
                      <tr>
                        <td>視床</td>
                        <td>間脳</td>
                        <td>痛み信号を大脳皮質へ中継、痛みの感作にも関与</td>
                        <td>片頭痛（アロディニアなど）</td>
                      </tr>
                      <tr>
                        <td>大脳皮質</td>
                        <td>終脳</td>
                        <td>皮質拡延性抑制（CSD）による前兆症状の発生</td>
                        <td>片頭痛（前兆あり）</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </section>

            {/* セクション 12 */}
            <section id="s12" className="sec">
              <div className="sec-hd">
                <div className="sec-num">12</div>
                <h2 className="sec-title">治療標的との接点</h2>
              </div>
              <div className="card">
                <p>
                  ここまで解説した神経回路の理解は、実際の頭痛治療薬の作用機序にも直結しています。
                </p>

                <div className="drug-grid">
                  <div className="drug">
                    <div className="drug-nm">トリプタン系薬剤</div>
                    <div className="drug-br">
                      5-HT<sub>1B/1D</sub>受容体作動薬
                    </div>
                    <div className="drug-tx">
                      セロトニン受容体を介して三叉神経終末やTNCの活動を抑制すると考えられています。
                    </div>
                  </div>
                  <div className="drug">
                    <div className="drug-nm">ゲパント系薬剤</div>
                    <div className="drug-br">CGRP受容体拮抗薬</div>
                    <div className="drug-tx">
                      三叉神経血管系で放出されるCGRPの受容体結合をブロックし、急性期治療・予防の両方に用いられます。
                    </div>
                  </div>
                  <div className="drug">
                    <div className="drug-nm">抗CGRP抗体</div>
                    <div className="drug-br">モノクローナル抗体製剤</div>
                    <div className="drug-tx">
                      エレヌマブ、フレマネズマブなど。片頭痛の予防薬として、一部は群発頭痛の予防薬としても国際的に承認されています。
                    </div>
                  </div>
                  <div className="drug">
                    <div className="drug-nm">神経ブロック・神経節介入</div>
                    <div className="drug-br">後頭神経ブロック／翼口蓋神経節への介入</div>
                    <div className="drug-tx">
                      三叉神経頸椎複合体や三叉神経自律神経反射という解剖学的知見に基づき用いられます。
                    </div>
                  </div>
                </div>

                <div className="alert a-ok">
                  <div className="alert-i">🔬</div>
                  <div>
                    脳幹や視床下部といった中枢神経系の理解が進んだことで、単なる対症療法ではなく、発症機序そのものを標的とした治療薬の開発が可能になったという経緯があります。
                  </div>
                </div>
              </div>
            </section>

            {/* セクション 13 */}
            <section id="s13" className="sec">
              <div className="sec-hd">
                <div className="sec-num">13</div>
                <h2 className="sec-title">参考文献・情報源</h2>
              </div>
              <div className="card">
                <p>
                  本稿の内容は、以下の国際的に認知された学術誌・国際機関の一次資料に基づいています（アクセス日：2026年8月）。
                </p>

                <div className="src-grid">
                  <div className="src">
                    <div className="src-org">J Cereb Blood Flow Metab</div>
                    <div className="src-t">
                      May A, Goadsby PJ. The trigeminovascular system in humans（1999）
                    </div>
                    <Ext
                      className="src-url"
                      href="https://journals.sagepub.com/doi/10.1097/00004647-199902000-00001"
                    >
                      https://journals.sagepub.com/doi/10.1097/00004647-199902000-00001
                    </Ext>
                  </div>
                  <div className="src">
                    <div className="src-org">PubMed</div>
                    <div className="src-t">
                      Neuropeptide localization in the "migraine generator" region of the human
                      brainstem
                    </div>
                    <Ext className="src-url" href="https://pubmed.ncbi.nlm.nih.gov/11422090/">
                      https://pubmed.ncbi.nlm.nih.gov/11422090/
                    </Ext>
                  </div>
                  <div className="src">
                    <div className="src-org">PubMed</div>
                    <div className="src-t">
                      Migraine pathophysiology: anatomy of the trigeminovascular pathway, CSD,
                      sensitization and modulation of pain
                    </div>
                    <Ext className="src-url" href="https://pubmed.ncbi.nlm.nih.gov/24347803/">
                      https://pubmed.ncbi.nlm.nih.gov/24347803/
                    </Ext>
                  </div>
                  <div className="src">
                    <div className="src-org">PMC</div>
                    <div className="src-t">Ion Channel Disturbances in Migraine Headache</div>
                    <Ext
                      className="src-url"
                      href="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC10706278/"
                    >
                      https://www.ncbi.nlm.nih.gov/pmc/articles/PMC10706278/
                    </Ext>
                  </div>
                  <div className="src">
                    <div className="src-org">PMC</div>
                    <div className="src-t">
                      Peripheral and central mechanisms of migraine（PAG・RVM・TNCの調節）
                    </div>
                    <Ext
                      className="src-url"
                      href="https://pmc.ncbi.nlm.nih.gov/articles/PMC6668207"
                    >
                      https://pmc.ncbi.nlm.nih.gov/articles/PMC6668207
                    </Ext>
                  </div>
                  <div className="src">
                    <div className="src-org">J Neurol / Springer</div>
                    <div className="src-t">
                      An update on migraine: current understanding and future
                      directions（片頭痛発生装置仮説）
                    </div>
                    <Ext
                      className="src-url"
                      href="https://link.springer.com/article/10.1007/s00415-017-8434-y"
                    >
                      https://link.springer.com/article/10.1007/s00415-017-8434-y
                    </Ext>
                  </div>
                  <div className="src">
                    <div className="src-org">Curr Pain Headache Rep</div>
                    <div className="src-t">
                      Convergence of cervical and trigeminal sensory afferents
                    </div>
                    <Ext className="src-url" href="https://pubmed.ncbi.nlm.nih.gov/12946291/">
                      https://pubmed.ncbi.nlm.nih.gov/12946291/
                    </Ext>
                  </div>
                  <div className="src">
                    <div className="src-org">The Lancet Neurology</div>
                    <div className="src-t">
                      Ashina M et al. Migraine and the trigeminovascular system-40 years and
                      counting（2019）
                    </div>
                    <Ext className="src-url" href="https://pubmed.ncbi.nlm.nih.gov/31160203/">
                      https://pubmed.ncbi.nlm.nih.gov/31160203/
                    </Ext>
                  </div>
                  <div className="src">
                    <div className="src-org">PMC</div>
                    <div className="src-t">
                      Referred trigeminal facial pain due to greater occipital nerve
                      entrapment（TCCの解剖）
                    </div>
                    <Ext
                      className="src-url"
                      href="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC9734007/"
                    >
                      https://www.ncbi.nlm.nih.gov/pmc/articles/PMC9734007/
                    </Ext>
                  </div>
                  <div className="src">
                    <div className="src-org">PMC</div>
                    <div className="src-t">
                      Only cervical vertebrae C0-C2 are relevant for subgrouping migraine
                      patients（TCCと頸椎）
                    </div>
                    <Ext
                      className="src-url"
                      href="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC9034562/"
                    >
                      https://www.ncbi.nlm.nih.gov/pmc/articles/PMC9034562/
                    </Ext>
                  </div>
                  <div className="src">
                    <div className="src-org">WHO</div>
                    <div className="src-t">
                      Migraine and other headache disorders（ファクトシート）
                    </div>
                    <Ext
                      className="src-url"
                      href="https://www.who.int/news-room/fact-sheets/detail/headache-disorders"
                    >
                      https://www.who.int/news-room/fact-sheets/detail/headache-disorders
                    </Ext>
                  </div>
                  <div className="src">
                    <div className="src-org">International Headache Society</div>
                    <div className="src-t">
                      The International Classification of Headache Disorders, 3rd edition (ICHD-3)
                    </div>
                    <Ext className="src-url" href="https://ichd-3.org/">
                      https://ichd-3.org/
                    </Ext>
                  </div>
                  <div className="src">
                    <div className="src-org">International Headache Society</div>
                    <div className="src-t">
                      International Classification of Headache Disorders（ICHDリソースページ）
                    </div>
                    <Ext className="src-url" href="https://ihs-headache.org/en/resources/ichd/">
                      https://ihs-headache.org/en/resources/ichd/
                    </Ext>
                  </div>
                  <div className="src">
                    <div className="src-org">The Lancet Neurology</div>
                    <div className="src-t">
                      International Classification of Headache Disorders（解説）
                    </div>
                    <Ext
                      className="src-url"
                      href="https://www.thelancet.com/journals/laneur/article/PIIS1474-4422(18)30085-1/fulltext"
                    >
                      https://www.thelancet.com/journals/laneur/article/PIIS1474-4422(18)30085-1/fulltext
                    </Ext>
                  </div>
                  <div className="src">
                    <div className="src-org">NINDS / NIH</div>
                    <div className="src-t">Headache（患者向け解説ページ）</div>
                    <Ext
                      className="src-url"
                      href="https://www.ninds.nih.gov/health-information/disorders/headache"
                    >
                      https://www.ninds.nih.gov/health-information/disorders/headache
                    </Ext>
                  </div>
                  <div className="src">
                    <div className="src-org">Physiological Reviews</div>
                    <div className="src-t">
                      Goadsby PJ et al. Pathophysiology of Migraine: A Disorder of Sensory
                      Processing（2017）
                    </div>
                    <Ext
                      className="src-url"
                      href="https://journals.physiology.org/doi/full/10.1152/physrev.00034.2015"
                    >
                      https://journals.physiology.org/doi/full/10.1152/physrev.00034.2015
                    </Ext>
                  </div>
                  <div className="src">
                    <div className="src-org">Nature Reviews Neurology</div>
                    <div className="src-t">
                      Edvinsson L et al. CGRP as the target of new migraine therapies（2018）
                    </div>
                    <Ext
                      className="src-url"
                      href="https://www.nature.com/articles/s41582-018-0003-1"
                    >
                      https://www.nature.com/articles/s41582-018-0003-1
                    </Ext>
                  </div>
                  <div className="src">
                    <div className="src-org">Physiological Reviews</div>
                    <div className="src-t">
                      CGRP physiology, pharmacology, and therapeutic targets
                    </div>
                    <Ext
                      className="src-url"
                      href="https://journals.physiology.org/doi/full/10.1152/physrev.00059.2021"
                    >
                      https://journals.physiology.org/doi/full/10.1152/physrev.00059.2021
                    </Ext>
                  </div>
                  <div className="src">
                    <div className="src-org">PMC</div>
                    <div className="src-t">
                      Efficacy and Safety of Anti-CGRP Monoclonal Antibodies
                    </div>
                    <Ext
                      className="src-url"
                      href="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC10586710/"
                    >
                      https://www.ncbi.nlm.nih.gov/pmc/articles/PMC10586710/
                    </Ext>
                  </div>
                  <div className="src">
                    <div className="src-org">Nature Reviews Disease Primers</div>
                    <div className="src-t">Migraine (Ashina M et al. 2021)</div>
                    <Ext
                      className="src-url"
                      href="https://www.nature.com/articles/s41572-021-00328-4"
                    >
                      https://www.nature.com/articles/s41572-021-00328-4
                    </Ext>
                  </div>
                  <div className="src">
                    <div className="src-org">PMC</div>
                    <div className="src-t">
                      The enigma of the dorsolateral pons as a migraine generator
                    </div>
                    <Ext
                      className="src-url"
                      href="https://pmc.ncbi.nlm.nih.gov/articles/PMC3711518"
                    >
                      https://pmc.ncbi.nlm.nih.gov/articles/PMC3711518
                    </Ext>
                  </div>
                  <div className="src">
                    <div className="src-org">PubMed</div>
                    <div className="src-t">
                      The pre-ictal or premonitory phase of migraine: a narrative review
                    </div>
                    <Ext className="src-url" href="https://pubmed.ncbi.nlm.nih.gov/37563570/">
                      https://pubmed.ncbi.nlm.nih.gov/37563570/
                    </Ext>
                  </div>
                  <div className="src">
                    <div className="src-org">PubMed</div>
                    <div className="src-t">
                      Pathophysiology of Migraine: A Disorder of Sensory Processing（要旨）
                    </div>
                    <Ext className="src-url" href="https://pubmed.ncbi.nlm.nih.gov/28179394/">
                      https://pubmed.ncbi.nlm.nih.gov/28179394/
                    </Ext>
                  </div>
                  <div className="src">
                    <div className="src-org">The Lancet</div>
                    <div className="src-t">
                      May A et al. Hypothalamic activation in cluster headache attacks（1998）
                    </div>
                    <Ext
                      className="src-url"
                      href="https://www.thelancet.com/journals/lancet/article/PIIS0140-6736(98)02470-2/abstract"
                    >
                      https://www.thelancet.com/journals/lancet/article/PIIS0140-6736(98)02470-2/abstract
                    </Ext>
                  </div>
                  <div className="src">
                    <div className="src-org">Neurology</div>
                    <div className="src-t">
                      PET demonstration of hypothalamic activation in cluster headache
                    </div>
                    <Ext
                      className="src-url"
                      href="https://www.neurology.org/doi/10.1212/WNL.52.7.1522"
                    >
                      https://www.neurology.org/doi/10.1212/WNL.52.7.1522
                    </Ext>
                  </div>
                  <div className="src">
                    <div className="src-org">PubMed</div>
                    <div className="src-t">
                      Hypothalamic activation in cluster headache attacks（要旨）
                    </div>
                    <Ext className="src-url" href="https://pubmed.ncbi.nlm.nih.gov/9690407/">
                      https://pubmed.ncbi.nlm.nih.gov/9690407/
                    </Ext>
                  </div>
                  <div className="src">
                    <div className="src-org">The Lancet Neurology</div>
                    <div className="src-t">
                      Goadsby PJ. Pathophysiology of cluster headache: a trigeminal autonomic
                      cephalgia（2002）
                    </div>
                    <Ext className="src-url" href="https://pubmed.ncbi.nlm.nih.gov/12849458/">
                      https://pubmed.ncbi.nlm.nih.gov/12849458/
                    </Ext>
                  </div>
                  <div className="src">
                    <div className="src-org">Nature Reviews Neurology</div>
                    <div className="src-t">
                      Charles A, Baca SM. Cortical spreading depression and migraine（2013）
                    </div>
                    <Ext
                      className="src-url"
                      href="https://www.nature.com/articles/nrneurol.2013.192"
                    >
                      https://www.nature.com/articles/nrneurol.2013.192
                    </Ext>
                  </div>
                  <div className="src">
                    <div className="src-org">Neurology</div>
                    <div className="src-t">Leão's cortical spreading depression（歴史的解説）</div>
                    <Ext
                      className="src-url"
                      href="https://www.neurology.org/doi/10.1212/01.wnl.0000183281.12779.cd"
                    >
                      https://www.neurology.org/doi/10.1212/01.wnl.0000183281.12779.cd
                    </Ext>
                  </div>
                  <div className="src">
                    <div className="src-org">Cephalalgia</div>
                    <div className="src-t">
                      History of migraine with aura and cortical spreading depression from 1941 and
                      onwards
                    </div>
                    <Ext
                      className="src-url"
                      href="https://journals.sagepub.com/doi/full/10.1111/j.1468-2982.2009.02015.x"
                    >
                      https://journals.sagepub.com/doi/full/10.1111/j.1468-2982.2009.02015.x
                    </Ext>
                  </div>
                  <div className="src">
                    <div className="src-org">PubMed</div>
                    <div className="src-t">
                      The Neuropharmacology of Cluster Headache and other Trigeminal Autonomic
                      Cephalalgias
                    </div>
                    <Ext className="src-url" href="https://pubmed.ncbi.nlm.nih.gov/26411963/">
                      https://pubmed.ncbi.nlm.nih.gov/26411963/
                    </Ext>
                  </div>
                  <div className="src">
                    <div className="src-org">PMC</div>
                    <div className="src-t">
                      Neuroimaging in cluster headache and other trigeminal autonomic cephalalgias
                    </div>
                    <Ext
                      className="src-url"
                      href="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC3253152/"
                    >
                      https://www.ncbi.nlm.nih.gov/pmc/articles/PMC3253152/
                    </Ext>
                  </div>
                  <div className="src">
                    <div className="src-org">Cephalalgia</div>
                    <div className="src-t">
                      Goadsby PJ. Cluster headache and the trigeminal-autonomic reflex: Driving or
                      being driven?（2018）
                    </div>
                    <Ext
                      className="src-url"
                      href="https://journals.sagepub.com/doi/full/10.1177/0333102417738252"
                    >
                      https://journals.sagepub.com/doi/full/10.1177/0333102417738252
                    </Ext>
                  </div>
                  <div className="src">
                    <div className="src-org">NINDS / NIH</div>
                    <div className="src-t">Migraine（患者向け解説ページ）</div>
                    <Ext
                      className="src-url"
                      href="https://www.ninds.nih.gov/health-information/disorders/migraine"
                    >
                      https://www.ninds.nih.gov/health-information/disorders/migraine
                    </Ext>
                  </div>
                </div>

                <div className="alert a-warn">
                  <div className="alert-i">📌</div>
                  <div>
                    本稿は教育目的の要約であり、個々の症例の診断・治療方針は必ず医療専門家にご相談ください。
                  </div>
                </div>
              </div>
            </section>

            {/* 関連リンク（main 末尾） */}
            <RelatedLinks href="/anatomy/headache-brainstem-neuroscience" />
          </AutoGlossary>
        </main>
      </div>

      {/* フッター */}
      <div className="footer">
        <strong>頭痛と脳・脳幹 ― 国際文献に基づく神経科学的解説</strong> —
        三叉神経血管系・脳幹核・視床下部・大脳皮質の関与をステップバイステップで学ぶ
        <br />📅 作成年: 2026 | 次回レビュー推奨: 国際頭痛分類・主要ガイドライン更新時
        <br />
        ⚠️
        本資料は学術・教育・研究目的のみを対象としています。臨床への適用は必ず資格を持つ医療専門家の監督のもとで行ってください。
      </div>
    </div>
  );
}
