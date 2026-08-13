import "./vascular-headache.css";
import type { Metadata } from "next";
import { RelatedLinks } from "@/components/content/RelatedLinks";
import { Ext } from "@/components/Ext";
import { VascularHeadacheSidebar } from "@/components/headaches/VascularHeadacheSidebar";
import MermaidDiagram from "@/components/MermaidDiagram";

export const metadata: Metadata = {
  title: "頭痛と血管 ― Vascular Basis of Headache",
  description:
    "国際頭痛分類(ICHD-3)・WHO・AHA/ASA・ACR・NCBI・査読誌にもとづく神経血管メカニズムの解説ガイド。",
};

const VHD_MERMAID_THEME: Record<string, string> = {
  primaryColor: "#fdecea",
  primaryTextColor: "#1a1a2e",
  primaryBorderColor: "#b3211f",
  lineColor: "#424242",
  secondaryColor: "#e0f2f1",
  tertiaryColor: "#e8f5e9",
  edgeLabelBackground: "#ffffff",
  fontSize: "13px",
};

export default function VascularHeadachePage() {
  return (
    <div className="vascular-headache">
      {/* HERO */}
      <div className="hero">
        <div style={{ fontSize: 34 }}>🩸</div>
        <h1>頭痛と血管 ― Vascular Basis of Headache</h1>
        <p className="hero-sub">
          国際頭痛分類(ICHD-3)・WHO・AHA/ASA・ACR・NCBI・査読誌にもとづく神経血管メカニズムの解説
        </p>
        <div className="hero-tags">
          <span className="hero-tag">三叉神経血管系</span>
          <span className="hero-tag">CGRP</span>
          <span className="hero-tag">ICHD-3</span>
          <span className="hero-tag">レッドフラッグ</span>
          <span className="hero-tag">国際文献</span>
        </div>
      </div>

      {/* DISCLAIMER */}
      <div className="disclaimer">
        <strong>⚠️ Academic Disclaimer（学術免責事項）</strong>　本資料は
        <strong>学術・教育・研究目的のみ</strong>
        を対象としています。すべての内容は資格を持つ医療専門家による臨床適用前のレビューが必要です。個人的な医療アドバイス・診断・処方を提供するものではありません。
        <strong>
          突然発症する激しい頭痛や神経症状を伴う頭痛がある場合は、直ちに救急医療機関を受診してください。
        </strong>
      </div>

      {/* LAYOUT */}
      <div className="layout">
        {/* SIDEBAR */}
        <VascularHeadacheSidebar />

        {/* MAIN CONTENT */}
        <main className="main">
          <div className="legend">
            <strong style={{ color: "var(--g8)" }}>エビデンスグレード:</strong>
            <span className="bA">A</span>国際ガイドライン/RCT・系統的レビュー
            <span className="bB">B</span>コホート・臨床生理学的研究
            <span className="bC">C</span>症例集積・専門家総説
            <span className="bU">U</span>機序に関する発展中の知見
          </div>

          {/* SECTION 1 */}
          <section id="s1" className="sec">
            <div className="sec-hd">
              <div className="sec-num">1</div>
              <h2 className="sec-title">なぜ頭痛と血管が関係するのか</h2>
            </div>

            <p>
              脳そのもの(大脳皮質や深部の神経組織)には、痛みを感じる神経終末がほとんど存在しません。では、なぜ「頭が痛い」と感じるのでしょうか。
            </p>
            <p>
              実は、痛みを感じる(侵害受容性の)神経終末が豊富に分布しているのは、脳の実質ではなく、
              <strong>頭蓋内外の血管・硬膜(脳を包む膜)・その周囲の組織</strong>
              です。血管の壁やそれを取り巻く膜が、拡張・炎症・牽引・攣縮といった刺激を受けると、そこに分布する神経が興奮し、痛みの信号として脳へ伝わります。
            </p>
            <p>
              この「血管(および血管周囲の神経)が痛みの発生源になりうる」という基本原理が、片頭痛や群発頭痛のような一次性頭痛から、くも膜下出血のような救急疾患まで、多くの頭痛を理解するための土台になっています。
            </p>

            <div className="alert a-info">
              <div className="alert-i">ℹ️</div>
              <div>
                国際頭痛学会(IHS)は、片頭痛・群発頭痛のような一次性頭痛と、脳血管障害による二次性頭痛の双方を、神経と血管の相互作用(neurovascular)という共通の枠組みで捉えています。{" "}
                <span className="bA">A</span>
              </div>
            </div>
          </section>

          {/* SECTION 2 */}
          <section id="s2" className="sec">
            <div className="sec-hd">
              <div className="sec-num">2</div>
              <h2 className="sec-title">頭蓋内血管の基礎知識</h2>
            </div>

            <p>頭痛を理解するうえで重要な血管は、大きく2種類に分けられます。</p>
            <ul>
              <li>
                <strong>脳実質を養う動脈(脳動脈)</strong>:
                内頸動脈・椎骨動脈から始まり、脳の深部で輪状のネットワーク「Willis動脈輪(circle of
                Willis)」を形成したのち、前・中・後大脳動脈として脳表面に分布します。
              </li>
              <li>
                <strong>硬膜を養う動脈(硬膜動脈)</strong>: 代表格は
                <strong>中硬膜動脈(middle meningeal artery)</strong>
                で、外頸動脈の枝である顎動脈から分かれ、頭蓋骨の棘孔(foramen
                spinosum)を通って頭蓋内に入り、硬膜に血液を供給します。硬膜は痛みに敏感な組織であり、中硬膜動脈は三叉神経から豊富な神経支配を受けています。{" "}
                <span className="bB">B</span>
              </li>
            </ul>

            <div className="mmd">
              <div className="mmd-lbl">フローチャート ― Willis動脈輪の模式図</div>
              <MermaidDiagram
                themeVariables={VHD_MERMAID_THEME}
                chart={`flowchart LR
    ICA_L["左内頸動脈"] --- ACA_L["左前大脳動脈"]
    ICA_R["右内頸動脈"] --- ACA_R["右前大脳動脈"]
    ACA_L --- ACOM["前交通動脈"]
    ACA_R --- ACOM
    ICA_L --- PCOM_L["左後交通動脈"]
    ICA_R --- PCOM_R["右後交通動脈"]
    PCOM_L --- PCA_L["左後大脳動脈"]
    PCOM_R --- PCA_R["右後大脳動脈"]
    BA["脳底動脈(左右椎骨動脈が合流)"] --- PCA_L
    BA --- PCA_R
    ICA_L --- MCA_L["左中大脳動脈"]
    ICA_R --- MCA_R["右中大脳動脈"]`}
              />
            </div>
            <p style={{ fontSize: "12px", color: "var(--g6)" }}>
              出典: NCBI Bookshelf (StatPearls) 中硬膜動脈解剖 ―{" "}
              <Ext href="https://www.ncbi.nlm.nih.gov/books/NBK519545/">
                ncbi.nlm.nih.gov/books/NBK519545
              </Ext>
            </p>

            <div className="alert a-warn">
              <div className="alert-i">⚠️</div>
              <div>
                Willis動脈輪は片側の血流減少を他方が代償する「安全装置」だが、ここに生じた動脈瘤の破裂はくも膜下出血の主因となる(詳細は第7・8節)。
              </div>
            </div>
          </section>

          {/* SECTION 3 */}
          <section id="s3" className="sec">
            <div className="sec-hd">
              <div className="sec-num">3</div>
              <h2 className="sec-title">三叉神経血管系</h2>
            </div>

            <p>
              頭蓋内の血管(特に硬膜動脈や大きな脳動脈・静脈洞)は、主に<strong>三叉神経</strong>
              (脳神経の中で最大の神経で、特に第1枝である眼神経)によって知覚されています。この「血管+それを支配する三叉神経」のセットを
              <strong>三叉神経血管系(trigeminovascular system)</strong>と呼びます。
            </p>
            <p>
              この概念は1990年代にArne MayとPeter
              Goadsbyらによってまとめられ、以後の頭痛研究の基盤となりました。{" "}
              <span className="bB">B</span>
            </p>

            <div className="mmd">
              <div className="mmd-lbl">フローチャート ― 三叉神経血管系の痛覚伝導路</div>
              <MermaidDiagram
                themeVariables={VHD_MERMAID_THEME}
                chart={`flowchart LR
    A["頭蓋内血管(硬膜動脈・脳動脈・静脈洞)"] -->|"三叉神経(主に第1枝)が知覚"| B["三叉神経節"]
    B --> C["三叉神経脊髄路核(脳幹・上位頸髄)"]
    C --> D["視床"]
    D --> E["大脳皮質(痛みとして自覚)"]
    C -.- border-color:transparent
    C -.-|"三叉神経-自律神経反射"| F["副交感神経系(涙・鼻汁・結膜充血)"]`}
              />
            </div>
            <p style={{ fontSize: "12px", color: "var(--g6)" }}>
              出典: May A, Goadsby PJ. <em>J Cereb Blood Flow Metab</em> 1999 ―{" "}
              <Ext href="https://journals.sagepub.com/doi/10.1097/00004647-199902000-00001">
                journals.sagepub.com/doi/10.1097/00004647-199902000-00001
              </Ext>
            </p>

            <p>
              群発頭痛でみられる同側の涙・鼻づまり・結膜充血といった自律神経症状は、この三叉神経-自律神経反射経路(trigeminoparasympathetic
              reflex)で説明されます。
            </p>
          </section>

          {/* SECTION 4 */}
          <section id="s4" className="sec">
            <div className="sec-hd">
              <div className="sec-num">4</div>
              <h2 className="sec-title">血管説から神経血管説へ</h2>
            </div>

            <p>
              かつて片頭痛は、20世紀半ばのHarold Wolffらの研究にもとづき、
              <strong>「血管が過度に拡張すること自体が痛みの原因である」という単純な血管説</strong>
              で説明されていました。この考え方は「血管性頭痛(vascular
              headache)」という呼び名にも反映されていました。
            </p>
            <p>
              しかし1980年代以降の脳血流測定・機能画像研究により、この図式は修正されました。現在の理解では、
              <strong>
                血管の拡張は結果の一つに過ぎず、その根本には脳・脳幹の神経活動の変化がある
              </strong>
              とされています。 <span className="bB">B</span>
            </p>

            <div className="mmd">
              <div className="mmd-lbl">フローチャート ― 頭痛研究のパラダイム転換</div>
              <MermaidDiagram
                themeVariables={VHD_MERMAID_THEME}
                chart={`flowchart TD
    subgraph OLD["20世紀半ば:血管説(Wolffの仮説)"]
        O1["血管が過度に拡張する"] --> O2["拡張そのものが痛みを引き起こす"]
    end
    subgraph NEW["1980年代以降:神経血管説(現在の主流)"]
        N1["脳・脳幹の興奮性変化(例:皮質拡延性抑制)"] --> N2["三叉神経血管系の活性化"]
        N2 --> N3["CGRPなど神経ペプチドの放出"]
        N3 --> N4["血管拡張+神経原性炎症+痛覚感作"]
        N4 --> N5["頭痛として自覚される"]
    end
    OLD -.-|"血流研究・分子生物学的知見により見直し"| NEW`}
              />
            </div>
            <p style={{ fontSize: "12px", color: "var(--g6)" }}>
              出典: May A, Goadsby PJ. <em>J Cereb Blood Flow Metab</em> 1999 ―{" "}
              <Ext href="https://journals.sagepub.com/doi/10.1097/00004647-199902000-00001">
                journals.sagepub.com/doi/10.1097/00004647-199902000-00001
              </Ext>
            </p>

            <p>
              May &
              Goadsby(1999)は、片頭痛や群発頭痛は「血管性頭痛」というより、神経と血管の相互作用を強調する
              <strong>「神経血管性頭痛(neurovascular headache)」</strong>
              と呼ぶべきだと論じています。
            </p>
          </section>

          {/* SECTION 5 */}
          <section id="s5" className="sec">
            <div className="sec-hd">
              <div className="sec-num">5</div>
              <h2 className="sec-title">片頭痛とCGRP</h2>
            </div>

            <p>
              現在の片頭痛研究の中心にあるのが、
              <strong>CGRP(カルシトニン遺伝子関連ペプチド)</strong>
              という神経ペプチドです。CGRPは三叉神経の神経終末に豊富に存在し、神経が興奮すると血管周囲に放出されます。{" "}
              <span className="bA">A</span>
            </p>

            <div className="mmd">
              <div className="mmd-lbl">フローチャート ― CGRPを中心とした片頭痛発生メカニズム</div>
              <MermaidDiagram
                themeVariables={VHD_MERMAID_THEME}
                chart={`flowchart TD
    A["三叉神経終末の興奮"] --> B["CGRP放出(カルシトニン遺伝子関連ペプチド)"]
    B --> C["硬膜血管の拡張"]
    B --> D["肥満細胞の脱顆粒 → 神経原性炎症"]
    B --> E["三叉神経終末の感作(末梢性感作)"]
    C --> F["痛覚受容器のさらなる興奮"]
    D --> F
    E --> G["脳幹・視床での中枢性感作"]
    F --> H["拍動性の頭痛"]
    G --> I["皮膚アロディニア(通常無害な刺激で痛みを感じる)"]
    H --> J["片頭痛発作"]
    I --> J`}
              />
            </div>
            <p style={{ fontSize: "12px", color: "var(--g6)" }}>
              出典: Iyengar S, et al. <em>Headache</em> 2019 ―{" "}
              <Ext href="https://headachejournal.onlinelibrary.wiley.com/doi/10.1111/head.13529">
                headachejournal.onlinelibrary.wiley.com/doi/10.1111/head.13529
              </Ext>{" "}
              ／ Goadsby PJ, Edvinsson L. <em>Ann Neurol</em> 1993 ―{" "}
              <Ext href="https://onlinelibrary.wiley.com/doi/abs/10.1002/ana.410330109">
                onlinelibrary.wiley.com/doi/abs/10.1002/ana.410330109
              </Ext>
            </p>

            <p>
              1990年代のGoadsby &
              Edvinssonの研究では、片頭痛発作中に頸静脈血中のCGRP濃度が上昇し、有効な急性期治療薬(スマトリプタンなど)によってCGRP濃度と頭痛の両方が改善することが示されました。この知見が、その後の抗CGRPモノクローナル抗体薬という、片頭痛特異的な予防治療薬の開発につながりました。
            </p>

            <h3>代表的な抗CGRP治療薬(予防療法)</h3>
            <div className="drug-grid">
              <div className="drug">
                <div className="drug-nm">エレヌマブ</div>
                <div className="drug-br">Erenumab (AMG334)</div>
                <div className="drug-tx">CGRP受容体拮抗抗体。月1回皮下注射。</div>
              </div>
              <div className="drug">
                <div className="drug-nm">フレマネズマブ</div>
                <div className="drug-br">Fremanezumab (TEV48125)</div>
                <div className="drug-tx">抗CGRPリガンド抗体。月1回または3か月に1回皮下注射。</div>
              </div>
              <div className="drug">
                <div className="drug-nm">ガルカネズマブ</div>
                <div className="drug-br">Galcanezumab (LY2951742)</div>
                <div className="drug-tx">抗CGRPリガンド抗体。月1回皮下注射。</div>
              </div>
              <div className="drug">
                <div className="drug-nm">エプチネズマブ</div>
                <div className="drug-br">Eptinezumab (ALD403)</div>
                <div className="drug-tx">抗CGRPリガンド抗体。3か月ごとに点滴静注。</div>
              </div>
            </div>
            <p style={{ fontSize: "12px", color: "var(--g6)" }}>
              出典: Springer <em>Current Pain and Headache Reports</em> 2025
              CGRPモノクローナル抗体総説 ―{" "}
              <Ext href="https://link.springer.com/article/10.1007/s11916-025-01365-4">
                link.springer.com/article/10.1007/s11916-025-01365-4
              </Ext>
            </p>
          </section>

          {/* SECTION 6 */}
          <section id="s6" className="sec">
            <div className="sec-hd">
              <div className="sec-num">6</div>
              <h2 className="sec-title">前兆と皮質拡延性抑制(CSD)</h2>
            </div>

            <p>
              片頭痛の約3割の患者にみられる「前兆(aura)」――視野のギザギザした光(閃輝暗点)やしびれなど――は、
              <strong>皮質拡延性抑制(cortical spreading depression: CSD)</strong>
              という現象と関連づけられています。 <span className="bB">B</span>
            </p>
            <p>
              CSDは、大脳皮質のニューロンとグリア細胞が波状に脱分極し、それがゆっくり(1分間に数mm)皮質表面を伝播していく現象です。この波が伝わるとき、脳血流も一過性の増加(充血)の後に、長時間の減少(乏血)を示すことが、Martin
              LauritzenやJes
              Olesenらのキセノン133吸入法やPET・機能的MRIを用いた研究によって示されています。この血流変化のパターンは、片頭痛の前兆症状が広がる速度や部位とよく対応します。
            </p>
            <p>
              つまり、血流の変化は「原因」ではなく、脳の神経活動の変化に伴って
              <strong>二次的に生じる現象</strong>
              として理解されており、血管説から神経血管説への転換を支える重要な証拠となりました。
            </p>
            <p style={{ fontSize: "12px", color: "var(--g6)" }}>
              出典: Lauritzen M. <em>Cephalalgia</em> 2001 ―{" "}
              <Ext href="https://journals.sagepub.com/doi/full/10.1111/j.1468-2982.2001.00244.x">
                journals.sagepub.com/doi/full/10.1111/j.1468-2982.2001.00244.x
              </Ext>
            </p>
          </section>

          {/* SECTION 7 */}
          <section id="s7" className="sec">
            <div className="sec-hd">
              <div className="sec-num">7</div>
              <h2 className="sec-title">血管が関わる主な頭痛疾患</h2>
            </div>

            <p>
              ここでは、血管が中心的な役割を果たす代表的な頭痛疾患を、良性のものから緊急性の高いものまで紹介します。
            </p>

            <h3>7.1 片頭痛 (Migraine)</h3>
            <p>
              三叉神経血管系とCGRPを中心としたメカニズムで説明される、片側性・拍動性の頭痛です。WHOは、片頭痛を含む頭痛疾患が世界の疾病負担(DALY)において脳卒中・認知症に次いで大きいと報告しています。{" "}
              <span className="bA">A</span>
            </p>

            <h3>7.2 群発頭痛 (Cluster Headache)</h3>
            <p>
              三叉神経自律神経性頭痛(trigeminal autonomic
              cephalalgias)の代表格で、片側の眼窩・側頭部に極めて激しい痛みが15分〜3時間程度出現し、同側の流涙・結膜充血・鼻閉などの自律神経症状を伴います。三叉神経血管系に加えて視床下部の関与が示唆されています。{" "}
              <span className="bA">A</span>
            </p>

            <h3>7.3 巨細胞性動脈炎 (Giant Cell Arteritis, 側頭動脈炎)</h3>
            <p>
              中〜大型の血管、特に浅側頭動脈に炎症(血管炎)が生じる自己免疫疾患です。50歳以上に新規発症する、こめかみの頭痛や側頭動脈の圧痛・拍動低下が特徴で、顎跛行(咀嚼で顎が痛む)を伴うこともあります。
              <strong>治療が遅れると失明のリスクがある救急疾患</strong>
              であり、米国リウマチ学会(ACR)は疑い例への迅速なステロイド治療を推奨しています。{" "}
              <span className="bA">A</span>
            </p>

            <h3>7.4 くも膜下出血 (Subarachnoid Hemorrhage, SAH)</h3>
            <p>
              多くは脳動脈瘤の破裂によって、くも膜下腔に出血が生じるものです。「人生最悪の頭痛」「雷に打たれたような頭痛」と表現される、
              <strong>
                発症から1分以内にピークに達する突然の激しい頭痛(サンダークラップヘッドache)
              </strong>
              が特徴的です。意識障害や項部硬直を伴うことが多く、生命に関わる神経救急疾患です。{" "}
              <span className="bA">A</span>
            </p>

            <h3>7.5 可逆性脳血管攣縮症候群 (RCVS)</h3>
            <p>
              頭蓋内の複数の動脈が数日〜数週間にわたり可逆的に攣縮する疾患で、反復する雷鳴頭痛が特徴です。産褥期や特定の薬剤(血管収縮薬など)が誘因となることがあり、脳血管撮影では動脈が数珠状にくびれる所見がみられます。多くは3か月以内に自然軽快しますが、脳梗塞や脳出血を合併することがあります。{" "}
              <span className="bC">C</span>
            </p>

            <h3>7.6 頸動脈・椎骨動脈解離 (Cervical Artery Dissection)</h3>
            <p>
              頸部の内頸動脈や椎骨動脈の血管壁が裂けることで生じ、新規の頭痛や頸部痛が初発症状となることが多い疾患です。若年〜中年の脳卒中の重要な原因であり、AHA/ASAは、頭痛・顔面痛(約65%)、頸部痛(約50%)がしばしば脳虚血症状に先行すると報告しています。{" "}
              <span className="bA">A</span>
            </p>
          </section>

          {/* SECTION 8 */}
          <section id="s8" className="sec">
            <div className="sec-hd">
              <div className="sec-num">8</div>
              <h2 className="sec-title">疾患比較表</h2>
            </div>

            <div className="tbl">
              <table>
                <thead>
                  <tr>
                    <th>疾患名</th>
                    <th>主に関わる血管・機序</th>
                    <th>頭痛の特徴</th>
                    <th>代表的な随伴症状</th>
                    <th>緊急度</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <strong>片頭痛</strong>
                    </td>
                    <td>硬膜血管・三叉神経血管系・CGRP</td>
                    <td>片側性・拍動性、中等度〜重度、4〜72時間持続</td>
                    <td>悪心・嘔吐、光/音過敏、前兆(閃輝暗点など)</td>
                    <td>
                      <span className="bGrn">通常は良性</span>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <strong>群発頭痛</strong>
                    </td>
                    <td>三叉神経血管系・視床下部</td>
                    <td>片側の眼窩/側頭部、極めて激烈、15分〜3時間、群発する</td>
                    <td>同側の流涙、結膜充血、鼻閉、眼瞼下垂</td>
                    <td>
                      <span className="bGrn">良性(激痛)</span>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <strong>巨細胞性動脈炎</strong>
                    </td>
                    <td>浅側頭動脈などの血管炎</td>
                    <td>新規発症のこめかみの頭痛、動脈の圧痛</td>
                    <td>顎跛行、視力障害、全身倦怠感、50歳以上</td>
                    <td>
                      <span className="bRed">緊急(失明)</span>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <strong>くも膜下出血</strong>
                    </td>
                    <td>脳動脈瘤破裂など</td>
                    <td>「人生最悪の頭痛」、秒〜分でピークに達する雷鳴頭痛</td>
                    <td>意識障害、項部硬直、嘔吐</td>
                    <td>
                      <span className="bRed">生命に関わる救急</span>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <strong>可逆性脳血管攣縮症候群</strong>
                    </td>
                    <td>頭蓋内動脈の可逆的攣縮</td>
                    <td>反復する雷鳴頭痛(数日〜数週間)</td>
                    <td>局所神経症状、けいれん</td>
                    <td>
                      <span className="bOra">準緊急</span>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <strong>頸動脈・椎骨動脈解離</strong>
                    </td>
                    <td>頸部動脈壁の裂け</td>
                    <td>新規の頭痛+頸部痛、片側性</td>
                    <td>Horner徴候、脱力・しびれ・言語障害</td>
                    <td>
                      <span className="bRed">緊急(脳卒中)</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* SECTION 9 */}
          <section id="s9" className="sec">
            <div className="sec-hd">
              <div className="sec-num">9</div>
              <h2 className="sec-title">危険信号と初期対応</h2>
            </div>

            <p>
              頭痛のほとんどは良性(一次性)ですが、一部には血管障害などの重篤な原因(二次性頭痛)が隠れています。国際頭痛学会の二次性頭痛特別研究班による
              <strong>SNNOOP10リスト</strong>(Do TP, et al. <em>Neurology</em>{" "}
              2019)は、二次性頭痛を疑うべき危険信号を体系的にまとめたものです。{" "}
              <span className="bB">B</span>
            </p>

            <div className="snoop-grid">
              <div className="sn">
                <div className="sn-letter">S</div>
                <div className="sn-title">全身症状(発熱など)</div>
                <div className="sn-symp">発熱、体重減少、倦怠感を伴う頭痛</div>
                <div className="sn-dx">→ 感染症・髄膜炎を疑う</div>
              </div>
              <div className="sn">
                <div className="sn-letter">N</div>
                <div className="sn-title">悪性腫瘍の既往</div>
                <div className="sn-symp">がんの既往がある患者の新規頭痛</div>
                <div className="sn-dx">→ 脳転移を疑う</div>
              </div>
              <div className="sn">
                <div className="sn-letter">N</div>
                <div className="sn-title">神経脱落症状</div>
                <div className="sn-symp">意識障害、麻痺、言語障害を伴う頭痛</div>
                <div className="sn-dx">→ 脳卒中・出血を疑う</div>
              </div>
              <div className="sn">
                <div className="sn-letter">O</div>
                <div className="sn-title">突然発症(雷鳴頭痛)</div>
                <div className="sn-symp">1分以内にピークへ達する激しい頭痛</div>
                <div className="sn-dx">→ SAH・RCVS・動脈解離を疑う</div>
              </div>
              <div className="sn">
                <div className="sn-letter">O</div>
                <div className="sn-title">65歳以降の新規発症</div>
                <div className="sn-symp">高齢での初めての頭痛パターン</div>
                <div className="sn-dx">→ 巨細胞性動脈炎・腫瘍を疑う</div>
              </div>
              <div className="sn">
                <div className="sn-letter">P</div>
                <div className="sn-title">妊娠・産褥期</div>
                <div className="sn-symp">妊娠中・産後の新規/増悪する頭痛</div>
                <div className="sn-dx">→ 静脈洞血栓症・RCVS・子癇前症を疑う</div>
              </div>
            </div>
            <p style={{ fontSize: "13px", color: "var(--g6)" }}>
              上記に加え、体位による変化・咳嗽/努責による誘発・乳頭浮腫・進行性/非定型の経過・眼痛+自律神経症状・外傷後の発症・免疫不全状態・鎮痛薬の使用過多も、SNNOOP10リストに含まれる危険信号です。
            </p>

            <div className="mmd">
              <div className="mmd-lbl">フローチャート ― 突然発症の激しい頭痛への初期対応</div>
              <MermaidDiagram
                themeVariables={VHD_MERMAID_THEME}
                chart={`flowchart TD
    A["突然発症・1分以内にピークへ達する激しい頭痛(サンダークラップヘッドache)"] --> B{"意識障害・神経症状・項部硬直はあるか?"}
    B -->|"あり"| C["直ちに救急要請(脳卒中・くも膜下出血を疑う)"]
    B -->|"明らかな随伴症状なし"| D["それでも速やかに医療機関(救急/専門医)を受診"]
    D --> E["頭部CT検査(発症6時間以内は高感度)"]
    E -->|"出血所見あり"| F["くも膜下出血(SAH)"]
    E -->|"出血所見なし"| G["腰椎穿刺、またはMRA/CTAによる血管評価を検討"]
    G -->|"多発性の血管攣縮所見"| H["可逆性脳血管攣縮症候群(RCVS)を疑う"]
    G -->|"頸部痛・局所神経症状あり"| I["頸動脈/椎骨動脈解離を疑う"]
    G -->|"特記所見なし・反復しない"| J["一次性雷鳴頭痛などとして経過観察・専門医フォロー"]`}
              />
            </div>
            <p style={{ fontSize: "12px", color: "var(--g6)" }}>
              出典: SNNOOP10 ― Do TP, et al. <em>Neurology</em> 2019 ―{" "}
              <Ext href="https://www.neurology.org/doi/10.1212/WNL.0000000000006697">
                neurology.org/doi/10.1212/WNL.0000000000006697
              </Ext>{" "}
              ／ MSD Manual Professional Edition ―{" "}
              <Ext href="https://www.msdmanuals.com/professional/neurologic-disorders/stroke/subarachnoid-hemorrhage">
                msdmanuals.com
              </Ext>
            </p>

            <div className="alert a-danger">
              <div className="alert-i">🚨</div>
              <div>
                上記はあくまで一般的な考え方の整理です。実際の検査方針は医療機関での評価にもとづいて決定されます。突然の激しい頭痛を経験した場合は、自己判断せず速やかに医療機関(緊急時は救急)を受診してください。
              </div>
            </div>
          </section>

          {/* SECTION 10 */}
          <section id="s10" className="sec">
            <div className="sec-hd">
              <div className="sec-num">10</div>
              <h2 className="sec-title">ICHD-3における位置づけ</h2>
            </div>

            <p>
              国際頭痛学会(IHS)が策定する<strong>国際頭痛分類第3版(ICHD-3, 2018年発行)</strong>
              は、WHOの疾病分類(ICD)にも組み込まれている、頭痛診断の国際標準です。血管に関連する頭痛は、この分類の中で次のように位置づけられています。{" "}
              <span className="bA">A</span>
            </p>

            <div className="tbl">
              <table>
                <thead>
                  <tr>
                    <th>区分</th>
                    <th>内容</th>
                    <th>血管に関連する代表例</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <strong>Part 1</strong>
                      <br />
                      一次性頭痛
                    </td>
                    <td>基礎疾患のない、神経・血管系機能の変化による頭痛</td>
                    <td>片頭痛(第1章)、群発頭痛を含む三叉神経自律神経性頭痛(第3章)</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>Part 2</strong>
                      <br />
                      二次性頭痛
                    </td>
                    <td>他の疾患に起因する頭痛</td>
                    <td>
                      「頭蓋または頸部血管障害による頭痛」(第6章):くも膜下出血、RCVS、動脈解離、巨細胞性動脈炎など
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <strong>Part 3</strong>
                      <br />
                      有痛性脳神経ニューロパチー等
                    </td>
                    <td>神経障害性の痛みなど</td>
                    <td>三叉神経痛など</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p>
              ICHD-3は「一次性頭痛の多くも血管系の関与を伴う機能的な変化である」という理解と、「血管そのものの器質的な病変による二次性頭痛」という理解を、明確に区別しながら体系立てています。
            </p>
            <p style={{ fontSize: "12px", color: "var(--g6)" }}>
              出典: ICHD-3 公式サイト ― <Ext href="https://ichd-3.org/">ichd-3.org</Ext>
            </p>
          </section>

          {/* SECTION 11 */}
          <section id="s11" className="sec">
            <div className="sec-hd">
              <div className="sec-num">11</div>
              <h2 className="sec-title">まとめ</h2>
            </div>

            <div className="qr-grid">
              <div className="qr">
                <div className="qr-t">痛みの発生源</div>
                脳実質には痛覚がほとんどなく、痛みを感じるのは主に血管とその周囲の膜・神経である。
              </div>
              <div className="qr">
                <div className="qr-t">三叉神経血管系</div>
                血管とそれを支配する三叉神経のセットが、多くの頭痛の共通基盤となっている。
              </div>
              <div className="qr">
                <div className="qr-t">血管説→神経血管説</div>
                単純な「血管拡張=痛み」という理解は、CGRPを介した神経原性炎症・感作という理解へ発展した。
              </div>
              <div className="qr">
                <div className="qr-t">前兆とCSD</div>
                片頭痛の前兆は皮質拡延性抑制という神経活動の波とそれに伴う血流変化で説明される。
              </div>
              <div className="qr">
                <div className="qr-t">器質的な血管疾患</div>
                巨細胞性動脈炎・くも膜下出血・RCVS・動脈解離など、命に関わる二次性頭痛も存在する。
              </div>
              <div className="qr">
                <div className="qr-t">危険信号</div>
                突然発症の激しい頭痛や神経症状を伴う頭痛は、速やかな医療機関受診が必要である。
              </div>
            </div>
          </section>

          {/* SECTION 12 */}
          <section id="s12" className="sec">
            <div className="sec-hd">
              <div className="sec-num">12</div>
              <h2 className="sec-title">参考文献・情報源</h2>
            </div>

            <p>以下はすべて国際的に認知された学術団体・専門誌・公的機関によるものです。</p>

            <div className="src-grid">
              <div className="src">
                <div className="src-org">IHS</div>
                <div className="src-t">国際頭痛分類 ICHD-3 公式サイト</div>
                <div className="src-url">
                  <Ext href="https://ichd-3.org/">https://ichd-3.org/</Ext>
                </div>
              </div>
              <div className="src">
                <div className="src-org">IHS</div>
                <div className="src-t">ICHD関連リソースページ</div>
                <div className="src-url">
                  <Ext href="https://ihs-headache.org/en/resources/ichd/">
                    https://ihs-headache.org/en/resources/ichd/
                  </Ext>
                </div>
              </div>
              <div className="src">
                <div className="src-org">IHS</div>
                <div className="src-t">ICHD-3 ポケット版(PDF)</div>
                <div className="src-url">
                  <Ext href="https://ihs-headache.org/wp-content/uploads/2020/05/ICHD-3-Pocket-version.pdf">
                    https://ihs-headache.org/wp-content/uploads/2020/05/ICHD-3-Pocket-version.pdf
                  </Ext>
                </div>
              </div>
              <div className="src">
                <div className="src-org">WHO</div>
                <div className="src-t">頭痛疾患ファクトシート</div>
                <div className="src-url">
                  <Ext href="https://www.who.int/news-room/fact-sheets/detail/headache-disorders">
                    https://www.who.int/news-room/fact-sheets/detail/headache-disorders
                  </Ext>
                </div>
              </div>
              <div className="src">
                <div className="src-org">J Cereb Blood Flow Metab</div>
                <div className="src-t">三叉神経血管系の総説(May &amp; Goadsby, 1999)</div>
                <div className="src-url">
                  <Ext href="https://journals.sagepub.com/doi/10.1097/00004647-199902000-00001">
                    https://journals.sagepub.com/doi/10.1097/00004647-199902000-00001
                  </Ext>
                </div>
              </div>
              <div className="src">
                <div className="src-org">Ann Neurol</div>
                <div className="src-t">
                  三叉神経血管系とCGRP・治療薬の研究(Goadsby &amp; Edvinsson, 1993)
                </div>
                <div className="src-url">
                  <Ext href="https://onlinelibrary.wiley.com/doi/abs/10.1002/ana.410330109">
                    https://onlinelibrary.wiley.com/doi/abs/10.1002/ana.410330109
                  </Ext>
                </div>
              </div>
              <div className="src">
                <div className="src-org">Headache</div>
                <div className="src-t">CGRPと三叉神経血管系(総説, Iyengar et al. 2019)</div>
                <div className="src-url">
                  <Ext href="https://headachejournal.onlinelibrary.wiley.com/doi/10.1111/head.13529">
                    https://headachejournal.onlinelibrary.wiley.com/doi/10.1111/head.13529
                  </Ext>
                </div>
              </div>
              <div className="src">
                <div className="src-org">Cephalalgia</div>
                <div className="src-t">皮質拡延性抑制と片頭痛(総説, Lauritzen 2001)</div>
                <div className="src-url">
                  <Ext href="https://journals.sagepub.com/doi/full/10.1111/j.1468-2982.2001.00244.x">
                    https://journals.sagepub.com/doi/full/10.1111/j.1468-2982.2001.00244.x
                  </Ext>
                </div>
              </div>
              <div className="src">
                <div className="src-org">Front Neuroanat</div>
                <div className="src-t">硬膜の神経支配(中硬膜動脈周囲, Lee et al. 2017)</div>
                <div className="src-url">
                  <Ext href="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC5742225/">
                    https://www.ncbi.nlm.nih.gov/pmc/articles/PMC5742225/
                  </Ext>
                </div>
              </div>
              <div className="src">
                <div className="src-org">NCBI</div>
                <div className="src-t">中硬膜動脈の解剖(StatPearls)</div>
                <div className="src-url">
                  <Ext href="https://www.ncbi.nlm.nih.gov/books/NBK519545/">
                    https://www.ncbi.nlm.nih.gov/books/NBK519545/
                  </Ext>
                </div>
              </div>
              <div className="src">
                <div className="src-org">NCBI</div>
                <div className="src-t">可逆性脳血管攣縮症候群(StatPearls)</div>
                <div className="src-url">
                  <Ext href="https://www.ncbi.nlm.nih.gov/books/NBK551723/">
                    https://www.ncbi.nlm.nih.gov/books/NBK551723/
                  </Ext>
                </div>
              </div>
              <div className="src">
                <div className="src-org">NCBI</div>
                <div className="src-t">巨細胞性動脈炎(StatPearls)</div>
                <div className="src-url">
                  <Ext href="https://www.ncbi.nlm.nih.gov/books/NBK459376/">
                    https://www.ncbi.nlm.nih.gov/books/NBK459376/
                  </Ext>
                </div>
              </div>
              <div className="src">
                <div className="src-org">ACR</div>
                <div className="src-t">巨細胞性動脈炎 患者向け解説</div>
                <div className="src-url">
                  <Ext href="https://rheumatology.org/patients/giant-cell-arteritis">
                    https://rheumatology.org/patients/giant-cell-arteritis
                  </Ext>
                </div>
              </div>
              <div className="src">
                <div className="src-org">AHA/ASA · Stroke</div>
                <div className="src-t">くも膜下出血診療に関する論説</div>
                <div className="src-url">
                  <Ext href="https://www.ahajournals.org/doi/10.1161/STROKEAHA.123.044560">
                    https://www.ahajournals.org/doi/10.1161/STROKEAHA.123.044560
                  </Ext>
                </div>
              </div>
              <div className="src">
                <div className="src-org">AHA/ASA · Stroke</div>
                <div className="src-t">頸動脈・椎骨動脈解離 科学的声明</div>
                <div className="src-url">
                  <Ext href="https://www.ahajournals.org/doi/10.1161/STR.0000000000000457">
                    https://www.ahajournals.org/doi/10.1161/STR.0000000000000457
                  </Ext>
                </div>
              </div>
              <div className="src">
                <div className="src-org">Neurology (AAN)</div>
                <div className="src-t">二次性頭痛の危険信号(SNNOOP10, Do et al. 2019)</div>
                <div className="src-url">
                  <Ext href="https://www.neurology.org/doi/10.1212/WNL.0000000000006697">
                    https://www.neurology.org/doi/10.1212/WNL.0000000000006697
                  </Ext>
                </div>
              </div>
              <div className="src">
                <div className="src-org">MSD Manual</div>
                <div className="src-t">くも膜下出血の臨床解説(Professional Edition)</div>
                <div className="src-url">
                  <Ext href="https://www.msdmanuals.com/professional/neurologic-disorders/stroke/subarachnoid-hemorrhage">
                    https://www.msdmanuals.com/professional/neurologic-disorders/stroke/subarachnoid-hemorrhage
                  </Ext>
                </div>
              </div>
              <div className="src">
                <div className="src-org">Curr Pain Headache Rep</div>
                <div className="src-t">抗CGRPモノクローナル抗体の総説(2025)</div>
                <div className="src-url">
                  <Ext href="https://link.springer.com/article/10.1007/s11916-025-01365-4">
                    https://link.springer.com/article/10.1007/s11916-025-01365-4
                  </Ext>
                </div>
              </div>
            </div>
          </section>

          <RelatedLinks href="/anatomy/vascular-headache" />
        </main>
      </div>

      {/* FOOTER */}
      <div className="footer">
        <strong>頭痛と血管 ― Vascular Basis of Headache</strong> —
        ICHD-3・WHO・AHA/ASA・ACR・NCBI・査読誌にもとづく神経血管メカニズムの解説
        <br />📅 作成年: 2026 | 次回レビュー推奨: ICHD-4またはガイドライン更新時
        <br />
        ⚠️
        本資料は学術・教育・研究目的のみを対象としています。臨床への適用は必ず資格を持つ医療専門家の監督のもとで行ってください。
      </div>
    </div>
  );
}
