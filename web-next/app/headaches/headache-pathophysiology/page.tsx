import type { Metadata } from "next";
import { Ext } from "@/components/Ext";
import AutoGlossary from "@/components/glossary/AutoGlossary";
import { HeadachePathophysiologySidebar } from "@/components/headaches/HeadachePathophysiologySidebar";
import MermaidDiagram from "@/components/MermaidDiagram";
import "./headache-pathophysiology.css";

export const metadata: Metadata = {
  title: "頭痛の病態生理アップデート｜三叉神経血管系・CGRP・皮質拡延性抑制",
  description:
    "三叉神経血管系・CGRP・皮質拡延性抑制（CSD）など、国際エビデンス（ICHD-3）に基づく頭痛の病態生理の最新メカニズムを体系的に解説する医療教育コンテンツ。",
};

/** ページの Mermaid テーマ（元 HTML の mermaid.initialize themeVariables を踏襲）。 */
const PATHOPHYSIOLOGY_MERMAID_THEME: Record<string, string> = {
  primaryColor: "#ede9fe",
  primaryTextColor: "#1a1a4e",
  primaryBorderColor: "#4c1d95",
  lineColor: "#4c1d95",
  secondaryColor: "#e0f2f1",
  tertiaryColor: "#e8f5e9",
  edgeLabelBackground: "#ffffff",
  fontSize: "16px",
};

/**
 * Renders the headache pathophysiology update guide page.
 *
 * @returns The page content for the comprehensive headache pathophysiology guide.
 */
export default function HeadachePathophysiologyPage() {
  return (
    <div className="headache-pathophysiology-accent">
      {/* HERO */}
      <div className="hero">
        <div style={{ fontSize: 34 }}>🧠</div>
        <h1>頭痛の病態生理アップデート</h1>
        <p className="hero-sub">
          三叉神経血管系・CGRP・皮質拡延性抑制（CSD）— 国際文献に基づくステップバイステップ解説
        </p>
        <div className="hero-tags">
          <span className="hero-tag">ICHD-3準拠</span>
          <span className="hero-tag">三叉神経血管系</span>
          <span className="hero-tag">CGRP</span>
          <span className="hero-tag">皮質拡延性抑制（CSD）</span>
          <span className="hero-tag">教育目的のみ</span>
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
        <HeadachePathophysiologySidebar />

        <main className="main">
          <AutoGlossary>
            <div className="alert a-warn">
              <div className="alert-i">📘</div>
              <div>
                <strong>
                  本ページは教育目的のコンテンツであり、個別の治療推奨ではありません。
                </strong>
                頭痛症状がある場合や治療方針の検討には、必ず医師・薬剤師などの医療専門職にご相談ください。本ページの内容は作成時点（2026年7月）の公開文献に基づいており、今後の研究の進展により見解が更新される可能性があります。
              </div>
            </div>

            {/* ====================================================== SECTION 1 */}
            <section id="s1" className="sec">
              <div className="sec-hd">
                <div className="sec-num">1</div>
                <h2 className="sec-title">なぜ「病態生理」を学ぶのか</h2>
              </div>
              <p>
                片頭痛は世界で10億人以上が罹患しているとされ、障害を引き起こす疾患として世界的に上位に位置づけされています。かつて片頭痛は「脳血管の拡張が痛みを引き起こす」という
                <strong>血管説（vascular theory）</strong>
                で説明されてきましたが、1980年代以降の研究により、この理解は大きく修正されました。現在では、片頭痛は
                <strong>脳の感覚処理の障害（a disorder of sensory processing）</strong>
                として捉えられています。
              </p>
              <p>この病態生理の理解が重要な理由は、単なる知識にとどまりません。</p>
              <ul>
                <li>なぜCGRPを標的とする薬剤が開発されたのか（メカニズムに基づく創薬）</li>
                <li>なぜ「アウラ（前兆）」と「頭痛」が別々の現象として議論されるのか</li>
                <li>なぜ片頭痛は「発作性（周期的に起こる）」なのか</li>
              </ul>
              <p>といった臨床上の疑問は、すべてこの病態生理の理解を土台としています。</p>
            </section>

            {/* ====================================================== SECTION 2 */}
            <section id="s2" className="sec">
              <div className="sec-hd">
                <div className="sec-num">2</div>
                <h2 className="sec-title">頭痛の分類：ICHD-3という共通言語</h2>
              </div>
              <p>
                頭痛の診断・研究・教育の基盤となっているのが、国際頭痛学会（International Headache
                Society, IHS）が策定した
                <strong>
                  国際頭痛分類第3版（International Classification of Headache Disorders, 3rd
                  edition: ICHD-3）
                </strong>
                です。ICHD-3は世界保健機関（WHO）の疾病分類（ICD-11）との整合性も考慮して作られており、国際的な頭痛研究・診療の共通言語として機能しています。
              </p>

              <div className="tbl">
                <table>
                  <thead>
                    <tr>
                      <th>区分</th>
                      <th>主な内容</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Part 1：一次性頭痛</td>
                      <td>
                        片頭痛、緊張型頭痛、三叉神経・自律神経性頭痛（群発頭痛など）、その他の一次性頭痛
                      </td>
                    </tr>
                    <tr>
                      <td>Part 2：二次性頭痛</td>
                      <td>外傷、血管障害、感染、薬物使用過多など他疾患に起因する頭痛</td>
                    </tr>
                    <tr>
                      <td>Part 3：有痛性脳神経ニューロパチー、他の顔面痛、その他</td>
                      <td>三叉神経痛など</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <p>
                日本国内では、日本神経学会・日本頭痛学会・日本神経治療学会が合同で策定した「頭痛の診療ガイドライン2021」がICHD-3に準拠する形で臨床実務の指針となっています。本ページ以降の解説も、主に
                <strong>片頭痛（migraine）</strong>
                の病態生理を中心に扱います。
              </p>
            </section>

            {/* ====================================================== SECTION 3 */}
            <section id="s3" className="sec">
              <div className="sec-hd">
                <div className="sec-num">3</div>
                <h2 className="sec-title">片頭痛発作の全体像：4つのフェーズ</h2>
              </div>
              <p>
                片頭痛発作は「頭痛が起きて終わり」という単純な現象ではなく、複数のフェーズからなる一連のプロセスとして理解されています。すべての患者に全フェーズが明瞭に現れるわけではなく、個人差が大きい点に注意してください。
              </p>

              <div className="phase-grid">
                <div className="ph ph1">
                  <div className="ph-icon">🌤️</div>
                  <div className="ph-title">前兆期</div>
                  <div className="ph-time">発作前 2〜48時間</div>
                  <div className="ph-desc">
                    気分変化・疲労感・食欲変化・頸部のこわばり・あくびなど非特異的な症状
                  </div>
                </div>
                <div className="ph ph2">
                  <div className="ph-icon">✨</div>
                  <div className="ph-title">アウラ（前兆）</div>
                  <div className="ph-time">頭痛の直前〜直後（患者の約1/3）</div>
                  <div className="ph-desc">
                    視覚症状（閃輝暗点など）・感覚症状・言語症状。一過性かつ可逆性
                  </div>
                </div>
                <div className="ph ph3">
                  <div className="ph-icon">⚡</div>
                  <div className="ph-title">頭痛期</div>
                  <div className="ph-time">4〜72時間</div>
                  <div className="ph-desc">片側性・拍動性の頭痛、悪心・嘔吐、光過敏・音過敏</div>
                </div>
                <div className="ph ph4">
                  <div className="ph-icon">🌥️</div>
                  <div className="ph-title">回復期</div>
                  <div className="ph-time">頭痛後 数時間〜数日</div>
                  <div className="ph-desc">倦怠感、集中力低下、気分の変化が残存することがある</div>
                </div>
              </div>

              <div className="mmd">
                <div className="mmd-lbl">
                  フローチャート — 片頭痛発作の4フェーズ（一例、個人差が大きい）
                </div>
                <div className="mmd-scroll">
                  <MermaidDiagram
                    themeVariables={PATHOPHYSIOLOGY_MERMAID_THEME}
                    chart={`flowchart LR
    A["🌤️ 前兆期<br/>発作前 2〜48時間<br/>気分変化・疲労感<br/>食欲変化・あくび"] --> B["✨ アウラ<br/>頭痛の直前〜直後<br/>（患者の約1/3）<br/>視覚・感覚・言語症状"]
    B --> C["⚡ 頭痛期<br/>4〜72時間<br/>拍動性頭痛<br/>悪心・光音過敏"]
    C --> D["🌥️ 回復期<br/>頭痛後<br/>数時間〜数日<br/>倦怠感・集中力低下"]

    classDef ph1 fill:#fff8e1,stroke:#ffc107,stroke-width:2px,color:#6d4c00
    classDef ph2 fill:#e3f2fd,stroke:#2196f3,stroke-width:2px,color:#0d3d66
    classDef ph3 fill:#ffebee,stroke:#ef5350,stroke-width:2px,color:#7a1315
    classDef ph4 fill:#e8f5e9,stroke:#66bb6a,stroke-width:2px,color:#1b5e20
    class A ph1
    class B ph2
    class C ph3
    class D ph4`}
                  />
                </div>
              </div>

              <div className="alert a-info">
                <div className="alert-i">ℹ️</div>
                <div>
                  前兆期に視床下部の活動変化が機能画像研究で示唆されていることから、片頭痛発作は「頭痛が始まる前から」脳内で始まっている一連のプロセスであると考えされています。
                </div>
              </div>
            </section>

            {/* ====================================================== SECTION 4 */}
            <section id="s4" className="sec">
              <div className="sec-hd">
                <div className="sec-num">4</div>
                <h2 className="sec-title">三叉神経血管系（Trigeminovascular System）</h2>
              </div>

              <h3>基本構造</h3>
              <p>
                片頭痛の痛みのメカニズムを理解する上で中心となるのが
                <strong>三叉神経血管系</strong>
                という概念です。これは、脳を包む硬膜や脳血管に分布する三叉神経の感覚線維（主にAδ線維・C線維）と、それらが投射する脳幹の核（三叉神経脊髄路核）、さらに視床・大脳皮質へと至る一連の神経経路を指します。
              </p>
              <p>
                この概念は1980〜1990年代、Goadsby・Edvinssonらの一連の研究によって確立されました。彼らは、硬膜や脳血管の侵害受容器（痛みを感知するセンサー）が刺激されると、三叉神経を介して脳幹・視床・大脳皮質へと信号が伝わり、これが片頭痛の痛みの経路になっていることを示しました。
              </p>

              <div className="mmd">
                <div className="mmd-lbl">フローチャート — 三叉神経血管系の経路</div>
                <div className="mmd-scroll">
                  <MermaidDiagram
                    themeVariables={PATHOPHYSIOLOGY_MERMAID_THEME}
                    chart={`flowchart TD
    A["硬膜・脳血管の侵害受容器<br/>（Aδ線維・C線維が分布）"] --> B["三叉神経節<br/>(Trigeminal ganglion)"]
    B --> C["三叉神経脊髄路核<br/>（延髄〜頸髄C2：三叉神経頸髄複合体）"]
    C --> D["視床<br/>(Thalamus)"]
    D --> E["大脳皮質<br/>（体性感覚野・島皮質など）<br/>＝痛みとして知覚される"]
    C -.->|三叉神経・自律神経反射| F["上唾液核"]
    F -.->|副交感神経遠心路| A`}
                  />
                </div>
              </div>

              <h3>「血管説」から「神経・感覚処理説」へ</h3>
              <p>
                かつては「血管が拡張すること自体が頭痛の原因」と考えられていましたが、その後の研究で、血管拡張は片頭痛発作に必須でも十分でもないことを示すデータが蓄積しました。現在の主流の理解は、
                <strong>
                  三叉神経終末の活性化とそれに伴う神経ペプチド放出（CGRPなど）が中心的な役割を果たす
                </strong>
                というものです。
              </p>

              <div className="alert a-purple">
                <div className="alert-i">🔬</div>
                <div>
                  <strong>学説の対立は現在進行形</strong>
                  ：「血管の関与を軽視すべきではない」とする立場（vessel-to-neuron仮説）と、「中枢性の機能障害こそが本質」とする立場との間で、2025年にも学術誌上で活発な議論が交わされています。本ページでは、こうした学説上の対立が現在も続いていることを踏まえ、断定的な記載を避けています。
                </div>
              </div>
            </section>

            {/* ====================================================== SECTION 5 */}
            <section id="s5" className="sec">
              <div className="sec-hd">
                <div className="sec-num">5</div>
                <h2 className="sec-title">CGRP（カルシトニン遺伝子関連ペプチド）</h2>
              </div>

              <h3>CGRPとは何か</h3>
              <p>
                <strong>CGRP（calcitonin gene-related peptide）</strong>
                は37個のアミノ酸からなる神経ペプチドで、三叉神経のAδ線維・C線維の大部分（約80〜90%）に含まれています。三叉神経終末が活性化すると、CGRPをはじめとする神経ペプチド（サブスタンスP、ニューロキニンAなど）が放出されます。
              </p>
              <p>
                CGRPが片頭痛の病態生理において重要視される根拠として、代表的な知見には以下のようなものがあります。
              </p>
              <ul>
                <li>片頭痛発作中に、頭部の静脈血中でCGRP濃度の上飾が観察される</li>
                <li>CGRPを健常者・片頭痛患者に投与すると、片頭痛様の頭痛を誘発しうる</li>
                <li>
                  有効な急性期治療薬（トリプタンなど）の投与後、CGRP濃度の正常化と頭痛の軽快が並行して観察される
                </li>
              </ul>

              <div className="alert a-info">
                <div className="alert-i">ℹ️</div>
                <div>
                  これらの知見は、CGRPが片頭痛の発症メカニズムに深く関与していることを
                  <strong>示唆</strong>
                  するものであり、CGRPだけが唯一の原因物質であることを意味するものではありません。
                </div>
              </div>

              <h3>CGRPが引き起こす「神経原性炎症」</h3>
              <p>
                放出されたCGRPは、血管拡張・血漿タンパクの漏出・肥満細胞の脱顆粒などを介して、
                <strong>神経原性炎症（neurogenic inflammation）</strong>
                と呼ばれる局所の炎症反応を引き起こすと考えられています。この炎症反応が、周囲の侵害受容器をより興奮しやすい状態にする「末梢性感作（peripheral
                sensitization）」につながり、さらに中枢側の三叉神経脊髄路核ニューロンが持続的に興奮する「中枢性感作（central
                sensitization）」へと発展すると考えられています。中枢性感作は、頭皮に触れるだけで痛みを感じる「アロディニア（allodynia）」といった臨床症状と関連づけされています。
              </p>

              <div className="mmd">
                <div className="mmd-lbl">フローチャート — CGRPによる神経原性炎症カスケード</div>
                <div className="mmd-scroll">
                  <MermaidDiagram
                    themeVariables={PATHOPHYSIOLOGY_MERMAID_THEME}
                    chart={`flowchart LR
    A["三叉神経終末の活性化"] --> B["CGRP・サブスタンスP・<br/>ニューロキニンAの放出"]
    B --> C["血管拡張"]
    B --> D["肥満細胞の脱顆粒"]
    B --> E["血漿タンパクの漏出"]
    C --> F["神経原性炎症<br/>(Neurogenic inflammation)"]
    D --> F
    E --> F
    F --> G["侵害受容器の感作<br/>（末梢性感作）"]
    G --> H["三叉神経脊髄路核ニューロンの<br/>持続的興奮"]
    H --> I["中枢性感作<br/>（アロディニアなど）"]`}
                  />
                </div>
              </div>

              <h3>CGRPは「原因」なのか「結果」なのか</h3>
              <p>
                ここで初学者が誤解しやすい点を整理します。CGRPの上昇は片頭痛発作と強く相関することが示されていますが、これは「CGRPの上昇＝片頭痛の唯一の原因」という単純な図式を意味するものではありません。CGRPは三叉神経血管系の活性化の
                <strong>指標（バイオマーカー）</strong>
                であると同時に、痛みの伝達・炎症反応を
                <strong>増幅する分子</strong>
                として位置づけされています。CGRPを標的とする薬剤が一定の有効性を示すことは、CGRPが病態の重要な一部を担っていることの傍証にはなりますが、片頭痛の病態全体を単一の分子で説明できるわけではない点は、多くの総説で共通して指摘されています。
              </p>
            </section>

            {/* ====================================================== SECTION 6 */}
            <section id="s6" className="sec">
              <div className="sec-hd">
                <div className="sec-num">6</div>
                <h2 className="sec-title">皮質拡延性抑制（Cortical Spreading Depression, CSD）</h2>
              </div>

              <h3>CSDとは何か</h3>
              <p>
                <strong>皮質拡延性抑制（cortical spreading depression, CSD）</strong>
                は、1944年にAristides
                Leãoによって初めて記載された現象で、大脳皮質のニューロンとグリア細胞が一過性に過剰興奮した後、電気的な活動が抑制される状態が、皮質表面を
                <strong>毎分およそ2〜5mm</strong>
                という比較的ゆっくりとした速度で波のように伝播していく現象です。
              </p>
              <p>
                この現象は、片頭痛の
                <strong>アウラ（前兆）</strong>
                、特に視覚アウラで報告される「閃輝暗点（scintillating
                scotoma）」の広がる速度と対応することから、アウラの生理学的な基盤（背景にある仕組み）である可能性が古くから指摘されてきました。
              </p>

              <div className="mmd">
                <div className="mmd-lbl">
                  フローチャート — CSDのメカニズムと頭痛への関与（推定経路を含む）
                </div>
                <div className="mmd-scroll">
                  <MermaidDiagram
                    themeVariables={PATHOPHYSIOLOGY_MERMAID_THEME}
                    chart={`flowchart TD
    A["皮質ニューロン・グリアの<br/>一過性の過剰興奮<br/>（K+・グルタミン酸の細胞外流出）"] --> B["脱分極の波が皮質表面を<br/>毎分2〜5mmで伝播"]
    B --> C["一過性の神経活動抑制<br/>（Spreading Depression）"]
    B --> D["一過性の局所脳血流の変化"]
    C --> E["アウラ症状<br/>（視覚・感覚症状など）"]
    B -.->|"動物実験で示唆される経路<br/>（ヒトでの直接証明は限定的）"| F["軟膜血管・硬膜への<br/>シグナル伝達"]
    F -.-> G["三叉神経血管系の活性化"]
    G -.-> H["頭痛の惹起に関与しうる<br/>（因果関係は現在も議論継続中）"]`}
                  />
                </div>
              </div>

              <h3>CSDと頭痛の関係：確立されていること／議論が続いていること</h3>
              <p>ここは特に慎重な理解が求められる領域です。</p>

              <div className="alert a-ok">
                <div className="alert-i">✅</div>
                <div>
                  <strong>比較的コンセンサスが得られている点</strong>
                  ：CSDが動物モデル（げっ歯類など）で明確に観察され、アウラの伝播パターンと類似した挙動を示すこと。脳損傷や脳卒中患者の脳内記録でも、ヒトの脳でCSDに類似した現象が生じることが確認されていること。
                </div>
              </div>

              <div className="alert a-warn">
                <div className="alert-i">⚠️</div>
                <div>
                  <strong>現在も議論が続いている点</strong>
                  ：CSDがヒトの片頭痛アウラの直接的な生理学的基盤であるかどうかは、動物実験ほど明確には証明されていません。2025年に発表されたヒト脳内記録の報告はこの仮説を支持する新たな知見として注目されていますが、議論に完全な決着がついたとは言えません。またアウラを伴わない片頭痛（患者の過半数）でのCSDの関与や、CSDが三叉神経血管系を活性化する経路がヒトの頭痛にどの程度寄与するかについても、専門家の間で見解が分かれています。
                </div>
              </div>
            </section>

            {/* ====================================================== SECTION 7 */}
            <section id="s7" className="sec">
              <div className="sec-hd">
                <div className="sec-num">7</div>
                <h2 className="sec-title">脳幹・視床下部と発作の「周期性」</h2>
              </div>
              <p>
                片頭痛は、なぜ「常に」ではなく「発作性」に起こるのでしょうか。この疑問に対しては、脳幹（特に中脳水道周囲灰白質、青斑核など）や視床下部が、感覚入力の処理・自律神経機能・生体リズムの調整に関与しており、これらの機能変化が発作の引き金や周期性に関わっているという考え方が示されています。
              </p>
              <p>
                機能的MRIを用いた研究では、頭痛が始まる前の「前兆期」の段階ですでに視床下部の活動変化が観察されるという報告があり、これは片頭痛発作が「痛みが始まってから」ではなく、脳の中でそれ以前から準備されているプロセスであることを示唆しています。ただし、こうした画像研究の解釈には技術的な制約もあり、単一の研究結果のみで因果関係を断定することはできません。
              </p>
            </section>

            {/* ====================================================== SECTION 8 */}
            <section id="s8" className="sec">
              <div className="sec-hd">
                <div className="sec-num">8</div>
                <h2 className="sec-title">全体像を1枚にまとめる</h2>
              </div>
              <p>
                これまで解説してきた要素を統合すると、次のような全体像として整理できます（あくまで概念図であり、実際の生体内では各要素が並行して、また相互に影響し合いながら進行します）。
              </p>

              <div className="mmd">
                <div className="mmd-lbl">フローチャート — 頭痛病態生理の統合モデル</div>
                <div className="mmd-scroll">
                  <MermaidDiagram
                    themeVariables={PATHOPHYSIOLOGY_MERMAID_THEME}
                    chart={`flowchart TB
    subgraph CTR["中枢からの引き金となりうる要素"]
    P1["視床下部・脳幹の機能変化<br/>（発作周期性、前兆期症状）"]
    P2["皮質拡延性抑制 CSD<br/>（アウラとの関連が想定される）"]
    end

    subgraph TVS["三叉神経血管系での出来事"]
    T1["硬膜血管・三叉神経終末"]
    T2["CGRP等の神経ペプチド放出"]
    T3["神経原性炎症・末梢性感作"]
    end

    subgraph CNP["中枢での痛みの処理"]
    C1["三叉神経脊髄路核"]
    C2["視床"]
    C3["大脳皮質<br/>（痛みとして知覚）"]
    C4["中枢性感作<br/>（アロディニアなど）"]
    end

    P1 --> T1
    P2 -.->|"関連が想定される経路<br/>因果関係は議論継続中"| T1
    T1 --> T2 --> T3 --> C1
    C1 --> C2 --> C3
    C1 --> C4`}
                  />
                </div>
              </div>

              <p>
                この図が示すとおり、片頭痛の病態生理は「単一の原因」で説明されるものではなく、
                <strong>
                  中枢（脳幹・視床下部・皮質）と末梢（三叉神経血管系）が双方向に影響し合う複合的なプロセス
                </strong>
                として理解されています。
              </p>
            </section>

            {/* ====================================================== SECTION 9 */}
            <section id="s9" className="sec">
              <div className="sec-hd">
                <div className="sec-num">9</div>
                <h2 className="sec-title">病態生理と治療標的の関係（一般的な位置づけ）</h2>
              </div>

              <div className="alert a-danger">
                <div className="alert-i">🚫</div>
                <div>
                  本セクションは
                  <strong>メカニズムと薬効群の対応関係</strong>
                  を示す一般的な整理であり、個別の患者に対する処方の推奨ではありません。用量・用法についても記載していません。
                  <strong>実際の治療方針の決定は、必ず医師・薬剤師にご相談ください。</strong>
                </div>
              </div>

              <div className="tbl">
                <table>
                  <thead>
                    <tr>
                      <th>位置づけ</th>
                      <th>薬効群（一般名レベル）</th>
                      <th>想定される主な作用点</th>
                      <th>エビデンスの確実性</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>急性期治療</td>
                      <td>トリプタン系（5-HT1B/1D受容体作動薬）</td>
                      <td>三叉神経終末・血管平滑筋の5-HT1受容体</td>
                      <td>
                        <span className="bA">高</span>
                        　国際的に確立
                      </td>
                    </tr>
                    <tr>
                      <td>急性期治療</td>
                      <td>CGRP受容体拮抗薬（いわゆる「ゲパント系」）</td>
                      <td>CGRP受容体への拮抗作用</td>
                      <td>
                        <span className="bB">中〜高</span>
                        　位置づけが進行中
                      </td>
                    </tr>
                    <tr>
                      <td>急性期治療</td>
                      <td>5-HT1F受容体作動薬（いわゆる「ジタン系」）</td>
                      <td>血管作用を介さない三叉神経系への作用</td>
                      <td>
                        <span className="bB">中</span>
                        　RCTで報告あり
                      </td>
                    </tr>
                    <tr>
                      <td>予防療法</td>
                      <td>抗CGRP抗体／抗CGRP受容体抗体（モノクローナル抗体）</td>
                      <td>CGRPまたはその受容体の中和</td>
                      <td>
                        <span className="bA">高</span>
                        　複数ガイドラインで第一選択の一つ
                      </td>
                    </tr>
                    <tr>
                      <td>予防療法</td>
                      <td>従来型の予防薬（β遮断薬、一部の抗てんかん薬、三環系抗うつ薬など）</td>
                      <td>中枢性の興奮性調整など多様な機序</td>
                      <td>
                        <span className="bB">中〜高</span>
                        　成分により異なる
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="alert a-warn">
                <div className="alert-i">⚠️</div>
                <div>
                  <strong>国内承認・適応外使用に関する注記</strong>
                  ：上記の薬効群に含まれる個々の成分の国内における承認状況・適応（保険適用の範囲を含む）は、成分ごと、また改訂のタイミングによって異なります。国内で未承認の成分や、承認された適応症の範囲外（適応外）で議論されている使用法も一部存在します。個々の薬剤の最新の国内承認状況については、日本頭痛学会のガイドラインおよび添付文書、PMDA（医薬品医療機器総合機構）の公表情報を参照し、必ず担当の医師・薬剤師にご確認ください。本ページはいずれの成分・製品についても、有効性・安全性の保証や優劣の比較、使用の勧奨を行うものではありません。
                </div>
              </div>
            </section>

            {/* ====================================================== SECTION 10 */}
            <section id="s10" className="sec">
              <div className="sec-hd">
                <div className="sec-num">10</div>
                <h2 className="sec-title">現在の限界とオープンクエスチョン</h2>
              </div>
              <p>
                病態生理研究は日進月歩で進展していますが、次のような点は現時点でも十分に解明されていません。
              </p>
              <ul>
                <li>
                  <strong>アウラを伴わない片頭痛の機序</strong>
                  ：CSDに関する知見の多くはアウラとの関連で議論されていますが、片頭痛患者の過半数を占める「アウラのない片頭痛」において、痛みが生じる引き金が何であるかは、なお研究途上です。
                </li>
                <li>
                  <strong>中枢起源か末梢起源かという論点</strong>
                  ：三叉神経血管系の活性化が「末梢（硬膜血管側）から始まるのか」「中枢（脳幹・皮質側）から始まるのか」については、専門家の間でも意見が分かれており、2025年時点でも学術誌上での議論が続いています。
                </li>
                <li>
                  <strong>個人差・性差の機序</strong>
                  ：片頭痛は女性に多いことが知られていますが、ホルモンとCGRP系の相互作用など、性差を生む生物学的な機序の全容は解明されていません。
                </li>
                <li>
                  <strong>CGRP標的治療が奏効しない患者群の存在</strong>
                  ：CGRP関連治療は多くの患者で有効性が報告されていますが、すべての患者に奏効するわけではなく、CGRP以外の経路（PACAPなど他の神経ペプチドを含む）の関与も研究対象となっています。
                </li>
              </ul>
              <div className="alert a-info">
                <div className="alert-i">ℹ️</div>
                <div>
                  本ページの内容は、これらの分野における現時点（2026年7月）の主要な文献に基づく整理であり、今後の研究により更新される可能性があることをご理解ください。
                </div>
              </div>
            </section>

            {/* ====================================================== SECTION 11 */}
            <section id="s11" className="sec">
              <div className="sec-hd">
                <div className="sec-num">11</div>
                <h2 className="sec-title">まとめ</h2>
              </div>

              <div className="qr-grid">
                <div className="qr">
                  <div className="qr-t">三叉神経血管系</div>
                  <p style={{ fontSize: 12.5 }}>
                    硬膜・脳血管の侵害受容器から脳幹・視床・大脳皮質へと至る、痛みの中心的な伝達経路。
                  </p>
                </div>
                <div className="qr">
                  <div className="qr-t">CGRP</div>
                  <p style={{ fontSize: 12.5 }}>
                    三叉神経終末から放出される神経ペプチド。神経原性炎症・末梢性感作・中枢性感作に関与。
                  </p>
                </div>
                <div className="qr">
                  <div className="qr-t">CSD</div>
                  <p style={{ fontSize: 12.5 }}>
                    アウラの生理学的基盤として想定。頭痛そのものとの因果関係は議論継続中。
                  </p>
                </div>
                <div className="qr">
                  <div className="qr-t">脳幹・視床下部</div>
                  <p style={{ fontSize: 12.5 }}>
                    発作の周期性・前兆期の症状に関与すると考えられている。
                  </p>
                </div>
              </div>

              <p>
                片頭痛は「血管の病気」ではなく、<strong>脳の感覚処理の障害</strong>
                として理解されるようになってきました。これらの知見はCGRPを標的とする薬剤をはじめとする治療法開発の土台となっていますが、個々の治療選択は必ず医師・薬剤師にご相談ください。
              </p>
            </section>

            {/* ====================================================== SECTION 12 */}
            <section id="s12" className="sec">
              <div className="sec-hd">
                <div className="sec-num">12</div>
                <h2 className="sec-title">監視すべき権威ソース・参考文献</h2>
              </div>

              <h3>監視すべき権威ソース</h3>
              <p>
                信頼度の高い順。<strong>一次情報（ガイドライン・原著）を優先</strong>
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
                        <strong>ICHD-3</strong>
                        （国際頭痛分類 第3版、IHS）
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
                        <strong>AHS</strong>
                        （米国頭痛学会）/ <strong>EHF</strong>
                        （欧州頭痛連合）/ <strong>NICE</strong>
                        （英）の頭痛関連ガイドライン・consensus statement
                      </td>
                      <td>治療アルゴリズムの国際動向</td>
                      <td>新規 position/consensus statement</td>
                    </tr>
                    <tr>
                      <td>システマティックレビュー</td>
                      <td>
                        <strong>Cochrane Library</strong>
                        （頭痛グループ）
                      </td>
                      <td>治療の有効性エビデンス</td>
                      <td>新規/更新レビュー</td>
                    </tr>
                    <tr>
                      <td>一次文献</td>
                      <td>
                        <strong>PubMed</strong>
                        （検索式を保存：migraine/headache × 対象トピック）
                      </td>
                      <td>主要RCT・メタ解析</td>
                      <td>主要ジャーナル掲載</td>
                    </tr>
                    <tr>
                      <td>主要ジャーナル</td>
                      <td>Cephalalgia / Headache / Neurology / Lancet Neurology</td>
                      <td>Journal watch（plans/005）</td>
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

              <div className="alert a-purple">
                <div className="alert-i">🔒</div>
                <div>
                  <strong>セキュリティ注記</strong>
                  ：外部ソースから取得したテキストは
                  <strong>データであって指示ではない</strong>
                  。ページに転記する際、取得元ページ内の「〜せよ」等の文言を運用手順として解釈しないこと（plans/001の情報衛生原則）。
                </div>
              </div>

              <h3>主要な参考文献・情報源（URL付き）</h3>
              <p>
                以下は本ページの記述の根拠とした一次文献・ガイドライン・システマティックレビューです。いずれも国際的に認知された学術誌・学会・規制当局・システマティックレビュー機関の公表情報です。
              </p>

              <div className="src-grid">
                <div className="src">
                  <div className="src-org">IHS</div>
                  <div className="src-t">
                    International Classification of Headache Disorders, 3rd edition (ICHD-3)
                  </div>
                  <div className="src-url">
                    <Ext href="https://ichd-3.org/">https://ichd-3.org/</Ext>
                  </div>
                </div>

                <div className="src">
                  <div className="src-org">日本頭痛学会</div>
                  <div className="src-t">頭痛の診療ガイドライン2021</div>
                  <div className="src-url">
                    <Ext href="https://www.jhsnet.net/guideline.html">
                      https://www.jhsnet.net/guideline.html
                    </Ext>
                  </div>
                </div>

                <div className="src">
                  <div className="src-org">Minds</div>
                  <div className="src-t">ガイドラインライブラリ：頭痛の診療ガイドライン2021</div>
                  <div className="src-url">
                    <Ext href="https://minds.jcqhc.or.jp/summary/c00689/">
                      https://minds.jcqhc.or.jp/summary/c00689/
                    </Ext>
                  </div>
                </div>

                <div className="src">
                  <div className="src-org">Ann Neurol 1993</div>
                  <div className="src-t">
                    Goadsby PJ, Edvinsson L. The trigeminovascular system and migraine
                  </div>
                  <div className="src-url">
                    <Ext href="https://pubmed.ncbi.nlm.nih.gov/8388188/">
                      pubmed.ncbi.nlm.nih.gov/8388188
                    </Ext>
                  </div>
                </div>

                <div className="src">
                  <div className="src-org">Physiol Rev 2017</div>
                  <div className="src-t">
                    Goadsby PJ, et al. Pathophysiology of Migraine: A Disorder of Sensory Processing
                  </div>
                  <div className="src-url">
                    <Ext href="https://journals.physiology.org/doi/full/10.1152/physrev.00034.2015">
                      journals.physiology.org/doi/10.1152/physrev.00034.2015
                    </Ext>
                  </div>
                </div>

                <div className="src">
                  <div className="src-org">Lancet Neurol 2019</div>
                  <div className="src-t">
                    Ashina M, et al. Migraine and the trigeminovascular system — 40 years and
                    counting
                  </div>
                  <div className="src-url">
                    <Ext href="https://www.thelancet.com/article/S1474-4422(19)30185-1/abstract">
                      thelancet.com/article/S1474-4422(19)30185-1
                    </Ext>
                  </div>
                </div>

                <div className="src">
                  <div className="src-org">J Headache Pain 2025</div>
                  <div className="src-t">
                    The vessel-to-neuron trigeminovascular hypothesis — the &quot;pro&quot; argument
                  </div>
                  <div className="src-url">
                    <Ext href="https://link.springer.com/article/10.1186/s10194-025-02130-z">
                      link.springer.com/article/10.1186/s10194-025-02130-z
                    </Ext>
                  </div>
                </div>

                <div className="src">
                  <div className="src-org">Nat Rev Neurol 2010</div>
                  <div className="src-t">
                    Ho TW, Edvinsson L, Goadsby PJ. CGRP and its receptors provide new insights into
                    migraine pathophysiology
                  </div>
                  <div className="src-url">
                    <Ext href="https://doi.org/10.1038/nrneurol.2010.127">
                      doi.org/10.1038/nrneurol.2010.127
                    </Ext>
                  </div>
                </div>

                <div className="src">
                  <div className="src-org">Nat Rev Neurol 2018</div>
                  <div className="src-t">CGRP as the target of new migraine therapies</div>
                  <div className="src-url">
                    <Ext href="https://www.nature.com/articles/s41582-018-0003-1">
                      nature.com/articles/s41582-018-0003-1
                    </Ext>
                  </div>
                </div>

                <div className="src">
                  <div className="src-org">Headache 2017</div>
                  <div className="src-t">
                    Edvinsson L. The Trigeminovascular Pathway: Role of CGRP and CGRP Receptors in
                    Migraine
                  </div>
                  <div className="src-url">
                    <Ext href="https://headachejournal.onlinelibrary.wiley.com/doi/abs/10.1111/head.13081">
                      headachejournal.onlinelibrary.wiley.com/doi/10.1111/head.13081
                    </Ext>
                  </div>
                </div>

                <div className="src">
                  <div className="src-org">Nat Rev Neurol 2013</div>
                  <div className="src-t">
                    Charles AC, Baca SM. Cortical spreading depression and migraine
                  </div>
                  <div className="src-url">
                    <Ext href="https://www.nature.com/articles/nrneurol.2013.192">
                      nature.com/articles/nrneurol.2013.192
                    </Ext>
                  </div>
                </div>

                <div className="src">
                  <div className="src-org">Headache 2025</div>
                  <div className="src-t">
                    Charles AC. The cortical spreading depression/migraine aura hypothesis — finally
                    some definitive evidence
                  </div>
                  <div className="src-url">
                    <Ext href="https://pubmed.ncbi.nlm.nih.gov/40105144/">
                      pubmed.ncbi.nlm.nih.gov/40105144
                    </Ext>
                  </div>
                </div>

                <div className="src">
                  <div className="src-org">Headache 2024</div>
                  <div className="src-t">
                    American Headache Society Position Statement：CGRP-targeting therapies as a
                    first-line option for migraine prevention
                  </div>
                  <div className="src-url">
                    <Ext href="https://headachejournal.onlinelibrary.wiley.com/doi/10.1111/head.14692">
                      headachejournal.onlinelibrary.wiley.com/doi/10.1111/head.14692
                    </Ext>
                  </div>
                </div>

                <div className="src">
                  <div className="src-org">EHF 2022</div>
                  <div className="src-t">
                    European Headache Federation guideline on monoclonal antibodies targeting the
                    CGRP pathway（2022 update）
                  </div>
                  <div className="src-url">
                    <Ext href="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC9188162/">
                      ncbi.nlm.nih.gov/pmc/articles/PMC9188162
                    </Ext>
                  </div>
                </div>

                <div className="src">
                  <div className="src-org">Cochrane Library 2023</div>
                  <div className="src-t">
                    Oteri V, et al. Prophylactic treatment with monoclonal antibodies targeting the
                    CGRP pathway for migraine prevention
                  </div>
                  <div className="src-url">
                    <Ext href="https://www.cochranelibrary.com/cdsr/doi/10.1002/14651858.CD015505/full">
                      cochranelibrary.com/cdsr/doi/10.1002/14651858.CD015505
                    </Ext>
                  </div>
                </div>

                <div className="src">
                  <div className="src-org">Nat Rev Dis Primers 2022</div>
                  <div className="src-t">Ferrari MD, et al. Migraine</div>
                  <div className="src-url">
                    <Ext href="https://www.nature.com/articles/s41572-021-00328-4">
                      nature.com/articles/s41572-021-00328-4
                    </Ext>
                  </div>
                </div>

                <div className="src">
                  <div className="src-org">PMDA</div>
                  <div className="src-t">独立行政法人 医薬品医療機器総合機構</div>
                  <div className="src-url">
                    <Ext href="https://www.pmda.go.jp/">https://www.pmda.go.jp/</Ext>
                  </div>
                </div>

                <div className="src">
                  <div className="src-org">FDA</div>
                  <div className="src-t">米国食品医薬品局</div>
                  <div className="src-url">
                    <Ext href="https://www.fda.gov/">https://www.fda.gov/</Ext>
                  </div>
                </div>

                <div className="src">
                  <div className="src-org">EMA</div>
                  <div className="src-t">欧州医薬品庁</div>
                  <div className="src-url">
                    <Ext href="https://www.ema.europa.eu/">https://www.ema.europa.eu/</Ext>
                  </div>
                </div>
              </div>

              <div className="alert a-warn">
                <div className="alert-i">📘</div>
                <div>
                  本ページは教育目的のコンテンツです。個別の症状・治療に関するご判断は、必ず医師・薬剤師などの医療専門職にご相談ください。（作成時点：2026年7月）
                </div>
              </div>
            </section>
          </AutoGlossary>
        </main>
      </div>

      {/* FOOTER */}
      <div className="footer">
        <strong>頭痛の病態生理アップデート</strong> — 三叉神経血管系・CGRP・皮質拡延性抑制（CSD）—
        国際文献に基づくステップバイステップ解説
        <br />📅 作成年: 2026 | 次回レビュー推奨: ガイドライン更新時
        <br />
        ⚠️
        本資料は学術・教育・研究目的のみを対象としています。臨床への適用は必ず資格を持つ医療専門家の監督のもとで行ってください。
      </div>
    </div>
  );
}
