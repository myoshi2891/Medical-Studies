import type { Metadata } from "next";
import { SgbSidebar } from "@/components/blocks/SgbSidebar";
import { Ext } from "@/components/Ext";
import AutoGlossary from "@/components/glossary/AutoGlossary";
import MermaidDiagram from "@/components/MermaidDiagram";
import "./stellate-ganglion-block.css";

export const metadata: Metadata = {
  title: "星状神経節ブロック（Stellate Ganglion Block: SGB）完全ガイド",
  description:
    "国際エビデンス（2026年時点）に基づく星状神経節ブロック（SGB）の包括的解説。超音波ガイド下技術、適応・禁忌・手技・局所麻酔薬・合併症・安全管理を初学者向けに整理。",
};

/** SGB ページの Mermaid テーマ。 */
const SGB_MERMAID_THEME: Record<string, string> = {
  primaryColor: "#ede7f6",
  primaryTextColor: "#311b92",
  primaryBorderColor: "#7e57c2",
  lineColor: "#546e7a",
  secondaryColor: "#e0f2f1",
  tertiaryColor: "#e8f5e9",
  edgeLabelBackground: "#ffffff",
  fontSize: "13px",
};

/**
 * Renders the complete guide page for stellate ganglion block (SGB).
 *
 * @returns The full educational article layout, including the sidebar, sections, diagrams, tables, and disclaimers.
 */
export default function StellateGanglionBlockPage() {
  return (
    <div className="stellate-accent">
      {/* HERO */}
      <div className="hero">
        <div style={{ fontSize: 34 }}>⭐</div>
        <h1>星状神経節ブロック（Stellate Ganglion Block: SGB）完全ガイド</h1>
        <p className="hero-sub">
          国際エビデンス（2026年時点）に基づく包括的解説 — 初学者向けステップバイステップ
        </p>
        <div className="hero-tags">
          <span className="hero-tag">超音波ガイド下技術</span>
          <span className="hero-tag">Grade A〜U エビデンス表記</span>
          <span className="hero-tag">ホルネル症候群</span>
          <span className="hero-tag">PTSD / 電気的嵐</span>
          <span className="hero-tag">LAST 安全管理</span>
        </div>
      </div>

      {/* DISCLAIMER */}
      <div className="disclaimer">
        <strong>⚠️ Academic Disclaimer（学術免責事項）</strong>　本資料は
        <strong>学術・教育・研究目的のみ</strong>
        を対象としています。星状神経節ブロックは<strong>侵襲的手技</strong>
        であり、適切なトレーニング・設備・緊急対応体制を備えた医師のみが実施できます。本資料は個人への医療アドバイス・診断・処方を提供するものではありません。
      </div>

      {/* LAYOUT */}
      <div className="layout">
        <SgbSidebar />

        <main className="main">
          <AutoGlossary>
            {/* ============================================================ SECTION 1 */}
            <section id="s1" className="sec">
              <div className="sec-hd">
                <div className="sec-num">1</div>
                <h2 className="sec-title">概論 — 星状神経節ブロックとは</h2>
              </div>

              <p>
                <strong>星状神経節ブロック（Stellate Ganglion Block: SGB）</strong>
                は、頸胸部交感神経節（星状神経節）の近傍に局所麻酔薬を注入することで、同側の交感神経活動を一時的に遮断する
                <strong>低侵襲的な神経ブロック手技</strong>
                です。
              </p>

              <div className="alert a-info">
                <div className="alert-i">📌</div>
                <div>
                  「星状（stellate）」の語源はラテン語の <em>stella</em>
                  （星）に由来し、この神経節の外観が星形であることから命名されました。
                </div>
              </div>

              <h3>歴史的背景</h3>
              <div className="tbl">
                <table>
                  <thead>
                    <tr>
                      <th>年代</th>
                      <th>出来事</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>1920年代</td>
                      <td>交感神経ブロックとして臨床導入</td>
                    </tr>
                    <tr>
                      <td>1930〜1960年代</td>
                      <td>疼痛・血管障害への応用が広がる</td>
                    </tr>
                    <tr>
                      <td>1990年代</td>
                      <td>ホットフラッシュ（更年期症状）への適応拡大</td>
                    </tr>
                    <tr>
                      <td>2008年〜</td>
                      <td>PTSD（心的外傷後ストレス障害）への適応が報告され始める</td>
                    </tr>
                    <tr>
                      <td>2010年代</td>
                      <td>超音波ガイド下技術の普及により安全性が大幅向上</td>
                    </tr>
                    <tr>
                      <td>2020年代</td>
                      <td>
                        不整脈（電気的嵐）・周術期合併症予防など新領域へのエビデンス蓄積が進む
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <h3>全体像の把握</h3>
              <div className="mmd">
                <div className="mmd-lbl">フローチャート — 星状神経節からみたSGBの適応領域</div>
                <MermaidDiagram
                  themeVariables={SGB_MERMAID_THEME}
                  chart={`flowchart TD
SG["⭐ 星状神経節\\n（Stellate Ganglion）\\n頸部・胸部交感神経の主要中継点"]

SG --> Anatomy["🫀 解剖\\n下頸神経節 + 第1胸神経節の融合体\\n（約80%の人口で）\\nC6-C7椎体レベルに位置"]

SG --> Function["⚡ 機能\\n・頭頸部・上肢の交感神経支配\\n・心臓交感神経調節\\n・闘争/逃走（Fight-or-Flight）反応の制御"]

SG --> Block["💉 SGB実施\\n局所麻酔薬の神経節周囲への注入\\n→ 交感神経シグナルの一時的遮断"]

Block --> Effect1["🩺 疼痛性疾患\\nCRPS・片頭痛\\n顔面痛・帯状疱疹後神経痛"]
Block --> Effect2["🫀 心臓領域\\n室性不整脈（電気的嵐）\\n心房細動予防"]
Block --> Effect3["🧠 精神・神経領域\\nPTSD・うつ症状\\n睡眠障害"]
Block --> Effect4["🌡️ 自律神経領域\\nホットフラッシュ\\n多汗症・レイノー症候群"]

style SG fill:#ede7f6,stroke:#5e35b1,font-weight:bold
style Block fill:#fff3e0,stroke:#e65100
style Effect1 fill:#e8f5e9,stroke:#2e7d32
style Effect2 fill:#fce4ec,stroke:#c62828
style Effect3 fill:#f3e5f5,stroke:#6a1b9a
style Effect4 fill:#fff8e1,stroke:#f57f17`}
                />
              </div>
            </section>

            {/* ============================================================ SECTION 2 */}
            <section id="s2" className="sec">
              <div className="sec-hd">
                <div className="sec-num">2</div>
                <h2 className="sec-title">解剖学的基礎</h2>
              </div>

              <div className="alert a-purple">
                <div className="alert-i">🎯</div>
                <div>
                  <strong>初学者へのポイント：</strong>
                  SGBを安全に理解するには、まず星状神経節の位置と周辺構造を確実に把握することが最重要です。
                </div>
              </div>

              <h3>星状神経節の形成</h3>
              <p>
                <strong>星状神経節（SG）</strong>は、以下の2つの神経節が合体して形成されます。
              </p>
              <div className="tbl">
                <table>
                  <thead>
                    <tr>
                      <th>構成要素</th>
                      <th>内容</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <strong>下頸神経節</strong>（Inferior cervical ganglion）
                      </td>
                      <td>頸部交感神経幹の最下端</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>第1胸神経節</strong>（First thoracic ganglion: T1）
                      </td>
                      <td>胸部交感神経幹の最上端</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>融合率</strong>
                      </td>
                      <td>
                        約<strong>80%</strong>
                        の人で両者が融合してSGを形成；残り20%は独立して存在
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <strong>大きさ</strong>
                      </td>
                      <td>長径 約2.5 cm、幅 約1 cm（個人差大）</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="alert a-info">
                <div className="alert-i">📌</div>
                <div>
                  <strong>重要な解剖学的注意点：</strong>
                  約20%の人では下頸神経節とT1神経節が融合せず独立して存在します。この場合、「星状神経節」という構造自体が存在せず、解剖学的変異として認識する必要があります。
                </div>
              </div>

              <h3>位置関係（Topographic Anatomy）</h3>
              <p>SGは以下の構造に囲まれた、手術的に危険な領域に位置します。</p>
              <div className="mmd">
                <div className="mmd-lbl">
                  フローチャート — 星状神経節を取り囲む解剖構造（赤＝高リスク構造）
                </div>
                <MermaidDiagram
                  themeVariables={SGB_MERMAID_THEME}
                  chart={`flowchart LR
subgraph anterior["前方（Anterior）"]
CA["総頸動脈\\nCommon Carotid Artery"]
IJV["内頸静脈\\nInternal Jugular Vein"]
end

subgraph medial["内側（Medial）"]
LC["前長筋\\nLongus Colli Muscle"]
RL["反回喉頭神経\\nRecurrent Laryngeal Nerve"]
ESO["食道（左側）\\nEsophagus"]
end

SG["⭐ 星状神経節\\nC7-T1レベル\\n（C6での注射が安全）"]

subgraph lateral["外側（Lateral）"]
BP["腕神経叢\\nBrachial Plexus"]
SCM["胸鎖乳突筋\\nSCM Muscle"]
end

subgraph posterior["後方（Posterior）"]
VA["椎骨動脈\\nVertebral Artery\\n（C6では横突孔内に保護）"]
SP["頸椎横突起\\nTransverse Process"]
end

subgraph inferior["下方（Inferior）"]
APEX["肺尖部\\nLung Apex\\n（気胸リスク）"]
TH["胸管（左側）\\nThoracic Duct"]
end

anterior --- SG
medial --- SG
lateral --- SG
posterior --- SG
inferior --- SG

style SG fill:#fff9c4,stroke:#f9a825,font-weight:bold
style APEX fill:#ffcdd2,stroke:#c62828
style VA fill:#fce4ec,stroke:#c62828
style RL fill:#fce4ec,stroke:#c62828`}
                />
              </div>

              <h3>C6 vs C7：注射レベルの選択</h3>
              <div className="tbl">
                <table>
                  <thead>
                    <tr>
                      <th>項目</th>
                      <th>C6（シャセニャック結節）</th>
                      <th>C7レベル</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>解剖学的目印</td>
                      <td>前結節（Chassaignac's tubercle）が触知可能</td>
                      <td>前結節が小さく触知困難</td>
                    </tr>
                    <tr>
                      <td>椎骨動脈</td>
                      <td>横突孔内に収まり保護される ✅</td>
                      <td>横突孔外に出る可能性 ⚠️</td>
                    </tr>
                    <tr>
                      <td>肺尖部との距離</td>
                      <td>比較的離れている ✅</td>
                      <td>近接する ⚠️</td>
                    </tr>
                    <tr>
                      <td>腕神経叢との距離</td>
                      <td>比較的離れている ✅</td>
                      <td>近接する ⚠️</td>
                    </tr>
                    <tr>
                      <td>真のSGへの到達</td>
                      <td>技術的にはSG本体（C7/T1）より上方</td>
                      <td>SG本体により近い</td>
                    </tr>
                    <tr>
                      <td>臨床的名称</td>
                      <td>
                        <strong>頸部交感神経ブロック</strong>（より正確）
                      </td>
                      <td>星状神経節ブロック（より直接的）</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>推奨度</strong>
                      </td>
                      <td>
                        <span className="tG">臨床上の第一選択 ✅</span>
                      </td>
                      <td>特殊なケースに限定</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="alert a-info">
                <div className="alert-i">📌</div>
                <div>
                  <strong>解剖学的補足：</strong>
                  厳密には、C6レベルに存在するのは星状神経節ではなく、そこを通過する交感神経線維（中頸神経節の一部）です。しかし局所麻酔薬の拡散により交感神経遮断効果が得られるため、臨床上「SGB」と呼ばれます。
                </div>
              </div>

              <h3>組織学的構造</h3>
              <div className="tbl">
                <table>
                  <thead>
                    <tr>
                      <th>構成成分</th>
                      <th>役割</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>節後ニューロン（Postganglionic neurons）</td>
                      <td>交感神経シグナルの最終共通経路</td>
                    </tr>
                    <tr>
                      <td>衛星グリア細胞（Satellite glial cells）</td>
                      <td>ニューロンの代謝サポート・シグナル調節</td>
                    </tr>
                    <tr>
                      <td>SIF細胞（Small intensely fluorescent cells）</td>
                      <td>神経節内伝達の調節</td>
                    </tr>
                    <tr>
                      <td>混合神経線維</td>
                      <td>節前・節後の軸索が混在</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* ============================================================ SECTION 3 */}
            <section id="s3" className="sec">
              <div className="sec-hd">
                <div className="sec-num">3</div>
                <h2 className="sec-title">作用機序</h2>
              </div>

              <h3>基本的な交感神経遮断機序</h3>
              <div className="mmd">
                <div className="mmd-lbl">
                  フローチャート — 局所麻酔薬による交感神経遮断のカスケード
                </div>
                <MermaidDiagram
                  themeVariables={SGB_MERMAID_THEME}
                  chart={`flowchart TD
A["💉 局所麻酔薬の注入\\n（ブピバカイン/ロピバカインなど）"]

A --> B["Na+チャネルの遮断\\n神経膜電位の安定化"]
B --> C["節前・節後ニューロンの\\n活動電位伝導ブロック"]
C --> D["交感神経シグナルの遮断"]

D --> E1["頭頸部への\\n交感神経遮断\\n→ ホルネル症候群"]
D --> E2["上肢への\\n交感神経遮断\\n→ 血管拡張・皮膚温上昇"]
D --> E3["心臓交感神経への\\n影響\\n→ 抗不整脈効果"]

E1 --> F["ブロック成功の確認\\n✅ ホルネル症候群の出現"]

style A fill:#ede7f6,stroke:#5e35b1
style D fill:#fff3e0,stroke:#e65100
style F fill:#e8f5e9,stroke:#2e7d32,font-weight:bold`}
                />
              </div>

              <h3>延長効果の仮説的機序（NGF仮説）</h3>
              <p>
                局所麻酔薬の作用時間（数時間）を超えた持続効果を説明するため、以下の機序が提唱されています。
              </p>
              <div className="mmd">
                <div className="mmd-lbl">
                  フローチャート — NGF仮説：疾患形成（赤）とSGBによる是正（緑）
                </div>
                <MermaidDiagram
                  themeVariables={SGB_MERMAID_THEME}
                  chart={`flowchart TD
Trigger["外傷・ストレス・ホルモン変動\\n（PTSD・CRPS・更年期などの誘因）"]
NGF["🔬 神経成長因子（NGF）の過剰産生\\n交感神経節での発現亢進"]
Sprouting["交感神経の異常発芽\\n（Sympathetic Sprouting）\\n→ 脊髄後根神経節への異常投射"]
NE["脳内ノルエピネフリン（NE）の上昇\\n→ 扁桃体・視床下部の過活動"]
Symptoms["症状の発現\\nPTSD過覚醒 / ホットフラッシュ / CRPS疼痛"]

SGB["💉 SGB施行\\n（局所麻酔薬の星状神経節周囲注射）"]
NGF_down["NGF産生の低下\\n交感神経シグナルの遮断"]
Sprouting_down["異常発芽の退縮\\n（長期的リモデリング）"]
NE_down["脳内NE濃度の正常化\\n視床下部-下垂体-副腎（HPA）軸の調整"]
Improvement["🟢 症状改善\\n局所麻酔効果を超えた持続効果の根拠"]

Trigger --> NGF
NGF --> Sprouting
Sprouting --> NE
NE --> Symptoms

SGB --> NGF_down
NGF_down --> Sprouting_down
Sprouting_down --> NE_down
NE_down --> Improvement

style Trigger fill:#ffcdd2,stroke:#c62828
style Symptoms fill:#ff8a80,stroke:#c62828
style SGB fill:#ede7f6,stroke:#5e35b1,font-weight:bold
style Improvement fill:#c8e6c9,stroke:#2e7d32,font-weight:bold`}
                />
              </div>

              <div className="alert a-warn">
                <div className="alert-i">⚠️</div>
                <div>
                  <strong>重要な注記：</strong>
                  このNGF仮説は現在研究段階にあり、完全には解明されていません。PTSDへの持続効果のメカニズムは「incomplete
                  understanding（不完全な理解）」の状態です。
                </div>
              </div>

              <h3>心臓への作用機序（不整脈領域）</h3>
              <div className="mmd">
                <div className="mmd-lbl">
                  フローチャート — 左右星状神経節の心臓支配と左SGBの抗不整脈効果
                </div>
                <MermaidDiagram
                  themeVariables={SGB_MERMAID_THEME}
                  chart={`flowchart LR
LeftSG["左星状神経節\\n左心室・左心房の\\n主要な交感神経支配"]
RightSG["右星状神経節\\n洞結節（SA node）に優位\\n→ 心拍数制御"]

LeftSG --> QT["QT延長\\n→ 不整脈誘発"]
RightSG --> HR["心拍数↑\\n→ 不整脈閾値低下"]

SGB_L["左SGB実施\\n（不整脈への第一選択）"]
SGB_L --> QT_norm["QT正常化\\n交感神経過活動の抑制\\n→ VT/VF抑制"]

QT --- SGB_L
HR --- SGB_L

style LeftSG fill:#fce4ec,stroke:#c62828
style SGB_L fill:#ede7f6,stroke:#5e35b1
style QT_norm fill:#e8f5e9,stroke:#2e7d32`}
                />
              </div>
            </section>

            {/* ============================================================ SECTION 4 */}
            <section id="s4" className="sec">
              <div className="sec-hd">
                <div className="sec-num">4</div>
                <h2 className="sec-title">適応症とエビデンスグレード</h2>
              </div>

              <h3>適応症一覧</h3>
              <div className="tbl">
                <table>
                  <thead>
                    <tr>
                      <th>適応症</th>
                      <th>エビデンス</th>
                      <th>推奨サイド</th>
                      <th>主なエビデンス源</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <strong>複合性局所疼痛症候群（CRPS type I/II）</strong>
                      </td>
                      <td>
                        <span className="bB">Grade B</span>
                      </td>
                      <td>患側</td>
                      <td>系統的レビュー複数</td>
                    </tr>
                    <tr>
                      <td>交感神経性維持疼痛</td>
                      <td>
                        <span className="bB">Grade B</span>
                      </td>
                      <td>患側</td>
                      <td>RCT/観察研究</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>ホットフラッシュ（更年期・乳がん治療後）</strong>
                      </td>
                      <td>
                        <span className="bA">Grade A</span>
                      </td>
                      <td>右側優先</td>
                      <td>複数RCT（Menopause誌）</td>
                    </tr>
                    <tr>
                      <td>多汗症（上肢・頭部）</td>
                      <td>
                        <span className="bB">Grade B</span>
                      </td>
                      <td>患側</td>
                      <td>観察研究・症例集積</td>
                    </tr>
                    <tr>
                      <td>レイノー症候群</td>
                      <td>
                        <span className="bC">Grade C</span>
                      </td>
                      <td>患側</td>
                      <td>症例報告・小規模研究</td>
                    </tr>
                    <tr>
                      <td>帯状疱疹後神経痛（顔面・上肢）</td>
                      <td>
                        <span className="bB">Grade B</span>
                      </td>
                      <td>患側</td>
                      <td>複数RCT</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>PTSD</strong>
                      </td>
                      <td>
                        <span className="bB">Grade B</span>
                      </td>
                      <td>右側優先</td>
                      <td>複数RCT（Anesth Analg 誌等）</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>室性不整脈・電気的嵐</strong>
                      </td>
                      <td>
                        <span className="bB">Grade B</span>
                      </td>
                      <td>左側優先</td>
                      <td>多施設観察研究・STAR study (ESC)</td>
                    </tr>
                    <tr>
                      <td>心房細動（周術期予防）</td>
                      <td>
                        <span className="bC">Grade C</span>
                      </td>
                      <td>左または右</td>
                      <td>単施設RCT複数</td>
                    </tr>
                    <tr>
                      <td>片頭痛・群発頭痛</td>
                      <td>
                        <span className="bC">Grade C</span>
                      </td>
                      <td>患側</td>
                      <td>小規模研究・症例集積</td>
                    </tr>
                    <tr>
                      <td>顔面非定型痛</td>
                      <td>
                        <span className="bC">Grade C</span>
                      </td>
                      <td>患側</td>
                      <td>症例報告・専門家コンセンサス</td>
                    </tr>
                    <tr>
                      <td>急性感音性難聴</td>
                      <td>
                        <span className="bC">Grade C</span>
                      </td>
                      <td>患側</td>
                      <td>小規模RCT（日本・韓国）</td>
                    </tr>
                    <tr>
                      <td>突発性難聴</td>
                      <td>
                        <span className="bC">Grade C</span>
                      </td>
                      <td>患側</td>
                      <td>症例集積・小規模研究</td>
                    </tr>
                    <tr>
                      <td>Bell麻痺</td>
                      <td>
                        <span className="bC">Grade C</span>
                      </td>
                      <td>患側</td>
                      <td>小規模RCT</td>
                    </tr>
                    <tr>
                      <td>脳血管攣縮（くも膜下出血後）</td>
                      <td>
                        <span className="bC">Grade C</span>
                      </td>
                      <td>進行中RCT</td>
                      <td>NCT04691271（試験中）</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="alert a-info">
                <div className="alert-i">📌</div>
                <div>
                  <strong>エビデンスグレード凡例：</strong>
                  <span className="bA">Grade A</span> =
                  複数の高質なRCTまたはCochrane系統的レビュー／
                  <span className="bB">Grade B</span> = 単数のRCTまたは複数の観察研究／
                  <span className="bC">Grade C</span> = 小規模研究・症例報告・専門家コンセンサス
                </div>
              </div>

              <h3>適応選択フローチャート</h3>
              <div className="mmd">
                <div className="mmd-lbl">
                  フローチャート — 患者評価から効果判定までの意思決定フロー
                </div>
                <MermaidDiagram
                  themeVariables={SGB_MERMAID_THEME}
                  chart={`flowchart TD
START(["患者評価開始"])

Q1{"SNOOP4\\nレッドフラッグ確認\\n（頭痛主訴の場合）"}
Q1 -->|"該当あり"| EMERGENCY["🚨 緊急対応\\nCT/MRI施行\\n二次性疾患の除外を優先"]
Q1 -->|"クリア"| Q2{"SGBの\\n適応症に該当するか？"}

Q2 -->|"No"| OTHER["他の治療法を検討"]
Q2 -->|"Yes"| Q3{"禁忌事項の\\n確認"}

Q3 -->|"禁忌あり"| CONTRAINDICATED["⛔ SGB禁忌\\n代替治療へ"]
Q3 -->|"禁忌なし"| Q4{"病変の側面確認"}

Q4 -->|"両側性 or 不明確"| SIDE_SELECT["サイド選択の原則：\\n・疼痛 → 患側\\n・PTSD/ホットフラッシュ → 右側\\n・不整脈 → 左側"]
Q4 -->|"片側性疾患"| IPSILATERAL["患側でのSGBを実施"]

SIDE_SELECT --> IMAGING["画像ガイド下施術の準備\\n（超音波推奨）"]
IPSILATERAL --> IMAGING

IMAGING --> PROCEDURE["施術実施\\n↓\\nホルネル症候群の確認"]

PROCEDURE --> FOLLOWUP["効果判定\\n・急性期：24〜48時間後\\n・慢性期：1〜3ヶ月後"]

style EMERGENCY fill:#c62828,color:#fff
style CONTRAINDICATED fill:#e64a19,color:#fff
style PROCEDURE fill:#5e35b1,color:#fff
style START fill:#2e7d32,color:#fff`}
                />
              </div>
            </section>

            {/* ============================================================ SECTION 5 */}
            <section id="s5" className="sec">
              <div className="sec-hd">
                <div className="sec-num">5</div>
                <h2 className="sec-title">禁忌と注意事項</h2>
              </div>

              <h3>絶対禁忌</h3>
              <div className="tbl th-red">
                <table>
                  <thead>
                    <tr>
                      <th>禁忌事項</th>
                      <th>理由</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <strong>対側SGBからの24時間以内の二度目の実施</strong>
                      </td>
                      <td>両側の反回喉頭神経同時ブロック → 気道閉塞のリスク</td>
                    </tr>
                    <tr>
                      <td>注射部位の局所感染</td>
                      <td>感染播種・化膿性神経炎のリスク</td>
                    </tr>
                    <tr>
                      <td>重篤な出血傾向・抗凝固療法中（コントロール不良）</td>
                      <td>頸部血腫による気道圧迫のリスク</td>
                    </tr>
                    <tr>
                      <td>局所麻酔薬アレルギーの既往</td>
                      <td>アナフィラキシーショック</td>
                    </tr>
                    <tr>
                      <td>患者の同意が得られない場合</td>
                      <td>倫理的・法的義務</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <h3>相対禁忌・慎重投与</h3>
              <div className="tbl th-orange">
                <table>
                  <thead>
                    <tr>
                      <th>条件</th>
                      <th>内容</th>
                      <th>対応</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>重篤な呼吸機能障害（FEV1 &lt;1.0L）</td>
                      <td>片側横隔膜神経ブロックでも呼吸不全悪化リスク</td>
                      <td>事前に呼吸機能評価を実施</td>
                    </tr>
                    <tr>
                      <td>重篤な頸椎疾患・頸椎手術後</td>
                      <td>解剖構造の変化により合併症リスク増大</td>
                      <td>画像確認後に慎重に判断</td>
                    </tr>
                    <tr>
                      <td>高度不整脈（徐脈：HR &lt;50 bpm）</td>
                      <td>交感神経遮断により悪化の可能性</td>
                      <td>不整脈管理後に実施</td>
                    </tr>
                    <tr>
                      <td>妊娠（特に第1三半期）</td>
                      <td>局所麻酔薬の胎児への影響</td>
                      <td>リスクベネフィットを慎重に評価</td>
                    </tr>
                    <tr>
                      <td>血液凝固異常（INR &gt;1.5、PT &gt;1.5倍）</td>
                      <td>血腫リスク</td>
                      <td>凝固改善後に実施</td>
                    </tr>
                    <tr>
                      <td>対側声帯麻痺の既往</td>
                      <td>反回喉頭神経ブロックで気道確保が困難に</td>
                      <td>耳鼻咽喉科評価後に判断</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* ============================================================ SECTION 6 */}
            <section id="s6" className="sec">
              <div className="sec-hd">
                <div className="sec-num">6</div>
                <h2 className="sec-title">施術プロトコル — ステップバイステップ</h2>
              </div>

              <div className="alert a-warn">
                <div className="alert-i">⚠️</div>
                <div>
                  以下は教育目的の概説です。実際の施術は専門的なトレーニングを受けた医師のみが実施できます。
                </div>
              </div>

              <h3>施術前の準備</h3>
              <div className="mmd">
                <div className="mmd-lbl">
                  フローチャート — 施術前チェックリスト（赤＝救急設備の必須確認）
                </div>
                <MermaidDiagram
                  themeVariables={SGB_MERMAID_THEME}
                  chart={`flowchart TD
PRE_A["📋 施術前チェックリスト"]

PRE_A --> CONSENT["✅ インフォームドコンセントの取得\\n・適応・リスク・代替治療を説明\\n・書面での同意"]

PRE_A --> LABS["🔬 検査確認\\n・血液凝固（PT-INR・APTT・血小板）\\n・アレルギー歴\\n・現在の薬剤（抗凝固薬・抗血小板薬）"]

PRE_A --> EQUIP["🏥 救急設備の確認\\n・除細動器\\n・気道確保器具（ラリンゲアルマスク・挿管器具）\\n・エピネフリン・脂肪乳剤（LAST対応）\\n・パルスオキシメーター・心電図モニター"]

PRE_A --> POSITION["🛏️ 患者体位の設定\\n・仰臥位\\n・頸部をわずかに後屈（枕を肩の下に入れる）\\n・患者の頭部を反対側に10〜15°回旋\\n・口は軽く開ける（気道確保のため）"]

style PRE_A fill:#ede7f6,stroke:#5e35b1,font-weight:bold
style EQUIP fill:#fce4ec,stroke:#c62828`}
                />
              </div>

              <h3>超音波ガイド下施術の手順（C6レベル）</h3>

              <h4>ステップ 1：超音波プローブの設置と解剖構造の同定</h4>
              <div className="tbl">
                <table>
                  <thead>
                    <tr>
                      <th>手順</th>
                      <th>詳細</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>プローブ</td>
                      <td>
                        <strong>高周波リニアプローブ</strong>（7〜15 MHz）
                      </td>
                    </tr>
                    <tr>
                      <td>設置部位</td>
                      <td>輪状軟骨（甲状腺下方）の高さ、胸鎖乳突筋の内側縁</td>
                    </tr>
                    <tr>
                      <td>確認構造</td>
                      <td>頸動脈（CA）、内頸静脈（IJV）、甲状腺、前長筋（LC）、C6横突起前結節</td>
                    </tr>
                    <tr>
                      <td>ターゲット</td>
                      <td>
                        <strong>前長筋（longus colli）の腹側表面と椎前筋膜の間</strong>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <h4>ステップ 2：皮膚消毒と局所麻酔</h4>
              <div className="tbl">
                <table>
                  <thead>
                    <tr>
                      <th>手順</th>
                      <th>詳細</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>皮膚消毒</td>
                      <td>ポビドンヨードまたはクロルヘキシジンアルコール</td>
                    </tr>
                    <tr>
                      <td>局所麻酔</td>
                      <td>皮膚・皮下組織への1〜2% リドカイン 0.5〜1 mL</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <h4>ステップ 3：穿刺と薬液注入</h4>
              <div className="mmd">
                <div className="mmd-lbl">
                  フローチャート — 平面内アプローチによる穿刺〜注入〜確認
                </div>
                <MermaidDiagram
                  themeVariables={SGB_MERMAID_THEME}
                  chart={`flowchart LR
PROBE["🖥️ 超音波プローブ\\n（横断面短軸観察）"]

PROBE --> VIEW["解剖構造確認\\n・頸動脈（CA）\\n・前長筋（LC）\\n・C6横突起前結節\\n・椎骨動脈（横突孔内）"]

VIEW --> NEEDLE["🪡 穿刺\\n平面内（in-plane）アプローチ\\n22〜25G針\\n\\n針先の目標：\\n椎前筋膜と前長筋の境界面\\n（subfascial injection）"]

NEEDLE --> ASPIRATION["吸引確認（Aspiration test）\\n血液の逆流がないことを確認\\n※ 陰性でも血管内注入の可能性あり"]

ASPIRATION -->|"血液なし"| TEST_DOSE["テスト用量の注入\\n（1〜2 mL）\\n→ 局所麻酔薬中毒症状がないことを確認\\n30秒待機"]

ASPIRATION -->|"血液あり"| REPOSITION["針の位置調整\\n再度穿刺"]

TEST_DOSE --> FULL_INJECTION["全量注入\\n（残りを1〜2 mLずつ分割投与）\\n※ リアルタイム超音波で薬液拡散を観察"]

FULL_INJECTION --> CONFIRM["ホルネル症候群の確認\\n（5〜10分後）"]

style ASPIRATION fill:#fff3e0,stroke:#e65100
style CONFIRM fill:#e8f5e9,stroke:#2e7d32,font-weight:bold`}
                />
              </div>

              <h3>アプローチ法の比較</h3>
              <div className="tbl">
                <table>
                  <thead>
                    <tr>
                      <th>アプローチ法</th>
                      <th>概要</th>
                      <th>長所</th>
                      <th>短所</th>
                      <th>推奨度</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <strong>超音波ガイド下（パラカロティド）</strong>
                      </td>
                      <td>リアルタイム超音波で針先と解剖構造を可視化</td>
                      <td>血管誤穿刺リスク最低；薬液拡散の確認が可能</td>
                      <td>機器と習熟が必要</td>
                      <td>
                        <span className="tG">第一選択 ✅</span>
                      </td>
                    </tr>
                    <tr>
                      <td>透視（フルオロスコピー）ガイド下</td>
                      <td>X線透視下でのランドマーク確認後に注射</td>
                      <td>骨性目標の可視化に優れる</td>
                      <td>放射線被曝；血管は見えない</td>
                      <td>代替選択</td>
                    </tr>
                    <tr>
                      <td>CT ガイド下</td>
                      <td>CT画像で詳細な位置確認後に注射</td>
                      <td>最高の精度；解剖学的変異への対応</td>
                      <td>放射線量が多い；施術時間が長い；コスト高</td>
                      <td>特殊ケースのみ</td>
                    </tr>
                    <tr>
                      <td>体表ランドマーク（盲目的）</td>
                      <td>シャセニャック結節の触診のみに依存</td>
                      <td>機器不要；迅速</td>
                      <td>合併症リスクが最も高い</td>
                      <td>
                        <span className="tR">非推奨 ⛔</span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* ============================================================ SECTION 7 */}
            <section id="s7" className="sec">
              <div className="sec-hd">
                <div className="sec-num">7</div>
                <h2 className="sec-title">使用薬剤と用量</h2>
              </div>

              <h3>局所麻酔薬の選択</h3>
              <div className="tbl">
                <table>
                  <thead>
                    <tr>
                      <th>薬剤</th>
                      <th>濃度</th>
                      <th>用量（成人）</th>
                      <th>作用発現</th>
                      <th>持続時間</th>
                      <th>特記事項</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <strong>ロピバカイン</strong>
                      </td>
                      <td>0.2〜0.5%</td>
                      <td>
                        <strong>4〜10 mL</strong>
                      </td>
                      <td>10〜15分</td>
                      <td>4〜12 hour</td>
                      <td>
                        心毒性が最も低い；<span className="tG">最も推奨</span>
                      </td>
                    </tr>
                    <tr>
                      <td>ブピバカイン</td>
                      <td>0.25〜0.5%</td>
                      <td>4〜10 mL</td>
                      <td>10〜15分</td>
                      <td>6〜16 hour</td>
                      <td>長時間作用型；心毒性に注意</td>
                    </tr>
                    <tr>
                      <td>リドカイン</td>
                      <td>1〜2%</td>
                      <td>4〜8 mL</td>
                      <td>3〜5分</td>
                      <td>1〜3 hour</td>
                      <td>急性期疼痛・不整脈に有用；短時間作用型</td>
                    </tr>
                    <tr>
                      <td>メピバカイン</td>
                      <td>1〜1.5%</td>
                      <td>4〜8 mL</td>
                      <td>5〜10分</td>
                      <td>2〜4 hour</td>
                      <td>中等度持続型；まれに使用</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="alert a-danger">
                <div className="alert-i">🚨</div>
                <div>
                  <strong>LAST（局所麻酔薬全身毒性）対応：</strong>
                  施術室には常に20%脂肪乳剤（Intralipid）と気道確保器具を準備すること。LAST発症時の初期徴候は
                  <strong>耳鳴り・口唇しびれ・金属味・興奮状態</strong>
                  で始まり、<strong>痙攣 → 心停止</strong>の順で進行しうる。
                </div>
              </div>

              <h3>PTSD・ホットフラッシュへの標準的な用量</h3>
              <div className="tbl th-purple">
                <table>
                  <thead>
                    <tr>
                      <th>適応</th>
                      <th>推奨局所麻酔薬</th>
                      <th>用量</th>
                      <th>施術側</th>
                      <th>反復投与</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>PTSD</td>
                      <td>ロピバカイン 0.5% またはブピバカイン 0.5%</td>
                      <td>
                        <strong>6〜7 mL</strong>
                      </td>
                      <td>右側（第一選択）</td>
                      <td>24時間以上あけて対側も検討可</td>
                    </tr>
                    <tr>
                      <td>ホットフラッシュ</td>
                      <td>ロピバカイン 0.5%</td>
                      <td>5〜7 mL</td>
                      <td>右側</td>
                      <td>1〜3回が一般的（間隔：数週〜数ヶ月）</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <h3>心臓領域（電気的嵐）への標準的な用量</h3>
              <div className="tbl th-red">
                <table>
                  <thead>
                    <tr>
                      <th>項目</th>
                      <th>内容</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>第一選択薬</td>
                      <td>ブピバカイン（70%以上の使用報告）またはロピバカイン</td>
                    </tr>
                    <tr>
                      <td>用量</td>
                      <td>
                        <strong>8〜12 mL</strong>
                      </td>
                    </tr>
                    <tr>
                      <td>施術側</td>
                      <td>
                        <strong>左側優先</strong>
                        （左心室の主要交感神経支配のため）
                      </td>
                    </tr>
                    <tr>
                      <td>特殊状況</td>
                      <td>気管挿管中は両側同時施術も検討可</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <h3>ステロイドの追加について</h3>
              <div className="tbl">
                <table>
                  <thead>
                    <tr>
                      <th>項目</th>
                      <th>内容</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>使用の可否</td>
                      <td>一部の術者が局所麻酔薬に追加</td>
                    </tr>
                    <tr>
                      <td>推定メリット</td>
                      <td>炎症抑制・効果持続の延長</td>
                    </tr>
                    <tr>
                      <td>エビデンス</td>
                      <td>現時点では明確な上乗せ効果を示すRCTなし</td>
                    </tr>
                    <tr>
                      <td>推奨</td>
                      <td>
                        ルーティン使用は<strong>推奨されない</strong>（
                        <span className="bU">Grade U</span>）
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* ============================================================ SECTION 8 */}
            <section id="s8" className="sec">
              <div className="sec-hd">
                <div className="sec-num">8</div>
                <h2 className="sec-title">ブロック成功の確認 — ホルネル症候群</h2>
              </div>

              <p>
                SGB成功の<strong>最重要確認指標</strong>はホルネル症候群（Horner&apos;s
                Syndrome）の出現です。
              </p>

              <div className="mmd">
                <div className="mmd-lbl">フローチャート — ホルネル症候群の構成徴候と評価</div>
                <MermaidDiagram
                  themeVariables={SGB_MERMAID_THEME}
                  chart={`flowchart TD
SGB_SUCCESS["💉 SGB施行後\\n5〜10分経過"]

SGB_SUCCESS --> HORNER["ホルネル症候群\\n（同側に出現）"]

HORNER --> S1["👁️ 上眼瞼下垂（Ptosis）\\n上眼瞼挙筋の交感神経支配喪失"]
HORNER --> S2["🔵 縮瞳（Miosis）\\n瞳孔散大筋の弛緩"]
HORNER --> S3["💧 無汗症（Anhidrosis）\\n同側顔面の発汗停止"]
HORNER --> S4["🌡️ 皮膚温上昇\\n同側上肢の血管拡張→温度上昇 ≥1°C"]
HORNER --> S5["👁️ 眼球陥凹（Enophthalmos）\\nまれに確認可能"]

S4 --> TEMP["皮膚温度計での確認\\n（定量的評価に有用）\\n≥1°F（0.56°C）の上昇"]

HORNER --> DURATION["持続時間\\n局所麻酔薬の種類に依存\\n4〜12時間で自然消退"]

style HORNER fill:#fff3e0,stroke:#e65100,font-weight:bold
style SGB_SUCCESS fill:#ede7f6,stroke:#5e35b1
style DURATION fill:#f3e5f5,stroke:#6a1b9a`}
                />
              </div>

              <h3>その他の成功確認指標</h3>
              <div className="tbl">
                <table>
                  <thead>
                    <tr>
                      <th>指標</th>
                      <th>内容</th>
                      <th>評価タイミング</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>同側上肢皮膚温上昇</td>
                      <td>≥1°F（0.56°C）の温度上昇</td>
                      <td>注射後15〜30分</td>
                    </tr>
                    <tr>
                      <td>同側顔面発赤・温感</td>
                      <td>交感神経遮断による血管拡張</td>
                      <td>注射後5〜15分</td>
                    </tr>
                    <tr>
                      <td>同側鼻粘膜充血</td>
                      <td>まれに患者が「鼻が詰まった感じ」を訴える</td>
                      <td>注射後5〜20分</td>
                    </tr>
                    <tr>
                      <td>上肢安静時疼痛の即時軽減</td>
                      <td>CRPSなどの疼痛疾患では即時の疼痛VAS低下</td>
                      <td>注射後15〜30分</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* ============================================================ SECTION 9 */}
            <section id="s9" className="sec">
              <div className="sec-hd">
                <div className="sec-num">9</div>
                <h2 className="sec-title">合併症と安全管理</h2>
              </div>

              <h3>軽微な副作用（ほぼ全例で一時的に出現）</h3>
              <div className="tbl th-orange">
                <table>
                  <thead>
                    <tr>
                      <th>副作用</th>
                      <th>発現率</th>
                      <th>原因</th>
                      <th>対応</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>ホルネル症候群</td>
                      <td>
                        <strong>ほぼ100%</strong>（確認指標）
                      </td>
                      <td>交感神経遮断</td>
                      <td>自然消退（4〜16時間）</td>
                    </tr>
                    <tr>
                      <td>嗄声（Hoarseness）</td>
                      <td>
                        <strong>最も多い副作用</strong>
                      </td>
                      <td>反回喉頭神経の一時的ブロック</td>
                      <td>数時間で自然消退；飲水・食事を一時的に制限</td>
                    </tr>
                    <tr>
                      <td>嚥下困難感</td>
                      <td>—</td>
                      <td>反回喉頭神経ブロック</td>
                      <td>数時間で自然消退；誤嚥に注意（食事制限）</td>
                    </tr>
                    <tr>
                      <td>横隔膜麻痺</td>
                      <td>—</td>
                      <td>横隔神経（phrenic nerve）のブロック</td>
                      <td>通常1側のみで問題なし；重篤呼吸障害患者は要注意</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <h3>重篤な合併症（頻度は低いが生命を脅かす可能性）</h3>
              <div className="mmd">
                <div className="mmd-lbl">
                  フローチャート — 重篤な合併症とLAST対応（赤＝致死的なもの）
                </div>
                <MermaidDiagram
                  themeVariables={SGB_MERMAID_THEME}
                  chart={`flowchart TD
COMP["⚠️ 重篤な合併症"]

COMP --> C1["🩸 血管内注入\\nIntravenous Injection\\n・頸動脈・椎骨動脈への誤注入\\n・LAST（局所麻酔薬全身毒性）\\n→ 痙攣・心停止"]
COMP --> C2["💊 硬膜外/くも膜下注入\\n→ 全脊髄麻酔\\n（呼吸停止・血圧低下）"]
COMP --> C3["🫁 気胸（Pneumothorax）\\n→ 呼吸困難・胸痛\\n（C7レベルや低位注射でリスク↑）"]
COMP --> C4["🩸 頸部血腫\\nHematoma\\n→ 気道圧迫（致死的）\\n（死亡例の報告あり）"]
COMP --> C5["🦠 感染症\\n感染性椎間板炎・硬膜外膿瘍\\n（四肢麻痺報告例あり）"]
COMP --> C6["⚡ 腕神経叢ブロック\\n→ 上肢の脱力・感覚消失"]

C1 --> LAST_MGMT["LAST対応\\n1. 呼吸確保（気道管理）\\n2. 20%脂肪乳剤（Intralipid）静注\\n3. 心肺蘇生（必要時）"]

style COMP fill:#ffcdd2,stroke:#c62828,font-weight:bold
style C4 fill:#b71c1c,color:#fff
style LAST_MGMT fill:#ede7f6,stroke:#5e35b1`}
                />
              </div>

              <h3>合併症の系統的レビュー（Eldrige et al., 2019）</h3>
              <p>260例の有害事象を分析した系統的レビュー（1990〜2018年）の結果：</p>
              <div className="tbl">
                <table>
                  <thead>
                    <tr>
                      <th>合併症カテゴリー</th>
                      <th>割合</th>
                      <th>主な内容</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>薬剤関連・全身性副作用</td>
                      <td>
                        <strong>68.4%</strong>
                      </td>
                      <td>LAST・血圧変動・アレルギー反応</td>
                    </tr>
                    <tr>
                      <td>手技関連・局所副作用</td>
                      <td>
                        <strong>31.5%</strong>
                      </td>
                      <td>血腫・気胸·神経損傷</td>
                    </tr>
                    <tr>
                      <td>死亡例</td>
                      <td>—</td>
                      <td>1例報告：大量血腫による気道閉塞</td>
                    </tr>
                    <tr>
                      <td>四肢麻痺</td>
                      <td>—</td>
                      <td>1例報告：化膿性頸椎硬膜外膿瘍</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="alert a-warn">
                <div className="alert-i">📌</div>
                <div>
                  <strong>重要な安全上の結論：</strong>
                  ランドマーク法と画像ガイド法の両方で合併症は報告されており、
                  <strong>超音波ガイド下でも合併症は完全には防止できない</strong>
                  。ただし超音波ガイドにより血管・神経の直接可視化が可能となり、リスクを有意に低減できます。
                </div>
              </div>

              <h3>安全管理のフローチャート</h3>
              <div className="mmd">
                <div className="mmd-lbl">
                  フローチャート — 施術中・施術後のモニタリングと緊急対応分岐
                </div>
                <MermaidDiagram
                  themeVariables={SGB_MERMAID_THEME}
                  chart={`flowchart TD
DURING["施術中・施術直後の監視"]

DURING --> MONITOR["必須モニタリング\\n・パルスオキシメーター\\n・心電図（12誘導）\\n・血圧（5分毎）\\n・意識レベルの継続確認"]

DURING --> OBSERVATION["施術後観察\\n最低30分（呼吸・意識・バイタル）"]

OBSERVATION --> HOARSE{"嗄声・呼吸困難が\\n重篤か？"}
HOARSE -->|"軽度（想定内）"| MILD["一時的ブロック\\n飲水制限・経過観察\\n通常1〜2時間で改善"]
HOARSE -->|"重篤（気道閉塞）"| AIRWAY["🚨 緊急気道確保\\n挿管 or ラリンゲアルマスク\\n緊急対応チームの呼び出し"]

OBSERVATION --> PTOSIS{"ホルネル症候群\\n以外の神経症状？"}
PTOSIS -->|"なし"| DISCHARGE["安全確認後に帰宅可能\\n（ホルネル症候群は想定内）"]
PTOSIS -->|"片麻痺・失語など"| NEURO["🚨 神経学的緊急事態\\n即座に脳外科・神経内科コンサルト\\n頭部CT実施"]

style AIRWAY fill:#c62828,color:#fff
style NEURO fill:#c62828,color:#fff
style DISCHARGE fill:#2e7d32,color:#fff`}
                />
              </div>
            </section>

            {/* ============================================================ SECTION 10 */}
            <section id="s10" className="sec">
              <div className="sec-hd">
                <div className="sec-num">10</div>
                <h2 className="sec-title">エビデンスサマリーと最新知見</h2>
              </div>

              <h3>ホットフラッシュ（更年期症状・乳がん治療後）</h3>
              <div className="tbl th-teal">
                <table>
                  <thead>
                    <tr>
                      <th>研究</th>
                      <th>デザイン</th>
                      <th>結果</th>
                      <th>グレード</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Lipov et al. (2008)</td>
                      <td>パイロット試験</td>
                      <td>ホットフラッシュ頻度50%以上減少</td>
                      <td>
                        <span className="bC">C</span>
                      </td>
                    </tr>
                    <tr>
                      <td>Walega et al. (2014) Menopause誌</td>
                      <td>RCT</td>
                      <td>SGB群でホットフラッシュ頻度の有意な減少（p&lt;0.01）</td>
                      <td>
                        <span className="bA">A</span>
                      </td>
                    </tr>
                    <tr>
                      <td>Freedman et al. (2014)</td>
                      <td>RCT（偽注射対照）</td>
                      <td>真のSGBで有意な効果；偽注射対照群より優位</td>
                      <td>
                        <span className="bA">A</span>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <strong>結論</strong>
                      </td>
                      <td colSpan={2}>
                        乳がん治療後（タモキシフェン等）のホットフラッシュへの最もエビデンスが充実した適応
                      </td>
                      <td>
                        <span className="bA">A</span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <h3>PTSD（心的外傷後ストレス障害）</h3>
              <div className="tbl th-purple">
                <table>
                  <thead>
                    <tr>
                      <th>研究</th>
                      <th>デザイン</th>
                      <th>結果</th>
                      <th>グレード</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Hollifield et al. (2019) Anesth Analg</td>
                      <td>RCT</td>
                      <td>PTSD症状スコア（CAPS-5）の有意な改善</td>
                      <td>
                        <span className="bB">B</span>
                      </td>
                    </tr>
                    <tr>
                      <td>Rae Olmsted et al. (2020)</td>
                      <td>RCT（軍人対象）</td>
                      <td>SGB群でPTSD症状の有意な改善（p=0.04）</td>
                      <td>
                        <span className="bB">B</span>
                      </td>
                    </tr>
                    <tr>
                      <td>Blakey et al. (2024) Transl Psychiatry</td>
                      <td>RCT二次解析</td>
                      <td>トラウマの種類によって反応性が異なる</td>
                      <td>
                        <span className="bB">B</span>
                      </td>
                    </tr>
                    <tr>
                      <td>メタ解析（2025年）</td>
                      <td>系統的レビュー・メタ解析</td>
                      <td>PTSD全体症状・再体験・回避・過覚醒の改善を支持</td>
                      <td>
                        <span className="bB">B</span>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <strong>結論</strong>
                      </td>
                      <td colSpan={2}>
                        有望なエビデンスが蓄積中；ただし長期効果・最適反復回数は未確定
                      </td>
                      <td>
                        <span className="bB">B</span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <h3>室性不整脈・電気的嵐（Electrical Storm）</h3>
              <div className="tbl th-red">
                <table>
                  <thead>
                    <tr>
                      <th>研究</th>
                      <th>デザイン</th>
                      <th>結果</th>
                      <th>グレード</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Savastano et al. STAR study (2024) Eur Heart J</td>
                      <td>多施設観察研究</td>
                      <td>SGB後24時間でVT/VF中央値7.5回→1.0回（p&lt;0.001）</td>
                      <td>
                        <span className="bB">B</span>
                      </td>
                    </tr>
                    <tr>
                      <td>Motazedian et al. (2024) Sci Rep</td>
                      <td>系統的レビュー・メタ解析</td>
                      <td>SGBは電気的嵐に対して有意な不整脈抑制効果</td>
                      <td>
                        <span className="bB">B</span>
                      </td>
                    </tr>
                    <tr>
                      <td>JACC:CE 多施設研究 (2024)</td>
                      <td>多施設観察研究</td>
                      <td>不整脈種別・心筋症原因を問わず改善</td>
                      <td>
                        <span className="bB">B</span>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <strong>GANGSTER Trial</strong>
                      </td>
                      <td>進行中RCT</td>
                      <td>結果待ち</td>
                      <td>—</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>結論</strong>
                      </td>
                      <td colSpan={2}>
                        難治性電気的嵐への短期的な有効性はGrade B；RCTデータが強く待望される
                      </td>
                      <td>
                        <span className="bB">B</span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <h3>日本における特殊性</h3>
              <div className="tbl">
                <table>
                  <thead>
                    <tr>
                      <th>特徴</th>
                      <th>内容</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>適応の広さ</td>
                      <td>免疫機能改善・内分泌疾患・皮膚疾患など「全身疾患」への応用が報告</td>
                    </tr>
                    <tr>
                      <td>施術頻度</td>
                      <td>慢性疾患への定期的な繰り返し施術が欧米より多い傾向</td>
                    </tr>
                    <tr>
                      <td>エビデンス状況</td>
                      <td>欧米の国際誌へのRCTデータは限定的；エビデンスの国際的な評価が課題</td>
                    </tr>
                    <tr>
                      <td>現状</td>
                      <td>日本ペインクリニック学会（JSPC）のガイドラインに基づく施術が推奨</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <h3>新興領域</h3>
              <div className="tbl">
                <table>
                  <thead>
                    <tr>
                      <th>領域</th>
                      <th>現状</th>
                      <th>進行中の主要試験</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>脳血管攣縮（くも膜下出血後）</td>
                      <td>
                        <span className="bC">Grade C</span>（有望な症例報告）
                      </td>
                      <td>NCT04691271（n=202）・NCT06797752（n=50）</td>
                    </tr>
                    <tr>
                      <td>周術期心房細動予防</td>
                      <td>Grade C→B（複数の小規模RCT）</td>
                      <td>NCT06476925（n=100）・NCT05357690（n=220）</td>
                    </tr>
                    <tr>
                      <td>長期COVIDに伴う嗅覚消失</td>
                      <td>
                        <span className="bC">Grade C</span>（症例報告）
                      </td>
                      <td>予備的データ蓄積中</td>
                    </tr>
                    <tr>
                      <td>免疫調節作用</td>
                      <td>基礎研究段階</td>
                      <td>自己免疫疾患への応用が研究中</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <h3>総合エビデンスマップ</h3>
              <div className="card">
                <div className="mmd-lbl">適応症のエビデンスグレード分布</div>
                <div className="sgb-evidence-map">
                  {/* 進行中RCT */}
                  <div className="sgb-evidence-sec-card ongoing">
                    <div className="sgb-evidence-hdr">
                      <span className="sgb-evidence-icon">🔬</span>
                      <span className="sgb-evidence-title">進行中RCT</span>
                    </div>
                    <div className="sgb-evidence-grid">
                      <div className="sgb-evidence-node">
                        電気的嵐 <span className="subtext">（GANGSTER Trial）</span>
                      </div>
                      <div className="sgb-evidence-node">
                        周術期AF予防 <span className="subtext">（NCT06476925等）</span>
                      </div>
                      <div className="sgb-evidence-node">
                        脳血管攣縮 <span className="subtext">（NCT04691271等）</span>
                      </div>
                    </div>
                  </div>

                  {/* Grade C */}
                  <div className="sgb-evidence-sec-card grade-c">
                    <div className="sgb-evidence-hdr">
                      <span className="sgb-evidence-icon">⭐</span>
                      <span className="sgb-evidence-title">Grade C</span>
                      <span className="sgb-evidence-desc">（症例集積・小規模研究）</span>
                    </div>
                    <div className="sgb-evidence-grid">
                      <div className="sgb-evidence-node">片頭痛・群発頭痛</div>
                      <div className="sgb-evidence-node">顔面非定型痛</div>
                      <div className="sgb-evidence-node">急性感音性難聴</div>
                      <div className="sgb-evidence-node">Bell麻痺</div>
                      <div className="sgb-evidence-node">心房細動予防</div>
                      <div className="sgb-evidence-node">レイノー症候群</div>
                      <div className="sgb-evidence-node">脳血管攣縮</div>
                    </div>
                  </div>

                  {/* Grade B */}
                  <div className="sgb-evidence-sec-card grade-b">
                    <div className="sgb-evidence-hdr">
                      <span className="sgb-evidence-icon">⭐⭐</span>
                      <span className="sgb-evidence-title">Grade B</span>
                      <span className="sgb-evidence-desc">（単数RCTまたは複数観察研究）</span>
                    </div>
                    <div className="sgb-evidence-grid">
                      <div className="sgb-evidence-node">PTSD</div>
                      <div className="sgb-evidence-node">室性不整脈・電気的嵐</div>
                      <div className="sgb-evidence-node">CRPS type I/II</div>
                      <div className="sgb-evidence-node">帯状疱疹後神経痛</div>
                      <div className="sgb-evidence-node">多汗症（上肢・頭部）</div>
                    </div>
                  </div>

                  {/* Grade A */}
                  <div className="sgb-evidence-sec-card grade-a">
                    <div className="sgb-evidence-hdr">
                      <span className="sgb-evidence-icon">⭐⭐⭐</span>
                      <span className="sgb-evidence-title">Grade A</span>
                      <span className="sgb-evidence-desc">（複数RCTまたはCochrane SR）</span>
                    </div>
                    <div className="sgb-evidence-grid">
                      <div className="sgb-evidence-node">
                        ホットフラッシュ
                        <span className="subtext">（更年期・乳がん治療後）</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* ============================================================ SECTION 11 */}
            <section id="s11" className="sec">
              <div className="sec-hd">
                <div className="sec-num">11</div>
                <h2 className="sec-title">参考文献・エビデンスソース</h2>
              </div>

              <p>
                以下はすべて国際的に認知された情報源（査読付きジャーナル・公的データベース・公式臨床リソース）です。各リンクは新規タブで開きます。
              </p>

              <h3>解剖学・基礎</h3>
              <div className="src-grid">
                <div className="src">
                  <div className="src-org">Diagnostics (MDPI) · 2025</div>
                  <div className="src-t">
                    Anatomy, Imaging, and Clinical Significance of the Cervicothoracic (Stellate)
                    Ganglion
                  </div>
                  <Ext href="https://www.mdpi.com/2075-4418/15/22/2911" className="src-url">
                    https://www.mdpi.com/2075-4418/15/22/2911
                  </Ext>
                </div>
                <div className="src">
                  <div className="src-org">StatPearls / NCBI</div>
                  <div className="src-t">Neuroanatomy, Stellate Ganglion — StatPearls</div>
                  <Ext href="https://www.ncbi.nlm.nih.gov/books/NBK542193/" className="src-url">
                    https://www.ncbi.nlm.nih.gov/books/NBK542193/
                  </Ext>
                </div>
                <div className="src">
                  <div className="src-org">OpenAnesthesia (IARS)</div>
                  <div className="src-t">Stellate Ganglion Block — OpenAnesthesia</div>
                  <Ext
                    href="https://www.openanesthesia.org/keywords/stellate-ganglion-block/"
                    className="src-url"
                  >
                    https://www.openanesthesia.org/keywords/stellate-ganglion-block/
                  </Ext>
                </div>
              </div>

              <h3>超音波ガイド下技術・手技</h3>
              <div className="src-grid">
                <div className="src">
                  <div className="src-org">Korean J Anesthesiol · 2011 (PMC)</div>
                  <div className="src-t">
                    Optimal volume of 0.2% ropivacaine for ultrasound-guided SGB
                  </div>
                  <Ext href="https://pmc.ncbi.nlm.nih.gov/articles/PMC3071481/" className="src-url">
                    https://pmc.ncbi.nlm.nih.gov/articles/PMC3071481/
                  </Ext>
                </div>
                <div className="src">
                  <div className="src-org">Pain Pract · 2024</div>
                  <div className="src-t">Novel ultrasound-guided supraclavicular SGB</div>
                  <Ext href="https://pubmed.ncbi.nlm.nih.gov/38251786/" className="src-url">
                    https://pubmed.ncbi.nlm.nih.gov/38251786/
                  </Ext>
                </div>
                <div className="src">
                  <div className="src-org">Br J Anaesth · 2025</div>
                  <div className="src-t">SGB in perioperative practice: a narrative review</div>
                  <Ext
                    href="https://www.bjanaesthesia.org/article/S0007-0912(25)00606-3/abstract"
                    className="src-url"
                  >
                    https://www.bjanaesthesia.org/article/S0007-0912(25)00606-3/abstract
                  </Ext>
                </div>
              </div>

              <h3>合併症・安全性</h3>
              <div className="src-grid">
                <div className="src">
                  <div className="src-org">Reg Anesth Pain Med · 2019</div>
                  <div className="src-t">
                    Complications associated with stellate ganglion nerve block: a systematic review
                  </div>
                  <Ext href="https://pubmed.ncbi.nlm.nih.gov/30992414/" className="src-url">
                    https://pubmed.ncbi.nlm.nih.gov/30992414/
                  </Ext>
                </div>
                <div className="src">
                  <div className="src-org">ScienceDirect (Elsevier)</div>
                  <div className="src-t">
                    SGB: Indications, technique and complications — ScienceDirect Topics
                  </div>
                  <Ext
                    href="https://www.sciencedirect.com/topics/biochemistry-genetics-and-molecular-biology/stellate-ganglion-block"
                    className="src-url"
                  >
                    https://www.sciencedirect.com/topics/biochemistry-genetics-and-molecular-biology/stellate-ganglion-block
                  </Ext>
                </div>
              </div>

              <h3>PTSD</h3>
              <div className="src-grid">
                <div className="src">
                  <div className="src-org">VA/DoD · NCBI Bookshelf</div>
                  <div className="src-t">Evidence Brief: Effectiveness of SGB for PTSD</div>
                  <Ext href="https://www.ncbi.nlm.nih.gov/books/NBK442253/" className="src-url">
                    https://www.ncbi.nlm.nih.gov/books/NBK442253/
                  </Ext>
                </div>
                <div className="src">
                  <div className="src-org">Autonomic Neuroscience · 2025</div>
                  <div className="src-t">SGB for PTSD: A Systematic Review and Meta-Analysis</div>
                  <Ext
                    href="https://www.autonomicneuroscience.com/article/S1566-0702(25)00122-5/fulltext"
                    className="src-url"
                  >
                    https://www.autonomicneuroscience.com/article/S1566-0702(25)00122-5/fulltext
                  </Ext>
                </div>
                <div className="src">
                  <div className="src-org">Curr Psychiatry Rep · 2026</div>
                  <div className="src-t">
                    SGB for PTSD: Comprehensive Review — Military and Non-Military Patients
                  </div>
                  <Ext
                    href="https://link.springer.com/article/10.1007/s11920-026-01666-4"
                    className="src-url"
                  >
                    https://link.springer.com/article/10.1007/s11920-026-01666-4
                  </Ext>
                </div>
              </div>

              <h3>不整脈・電気的嵐</h3>
              <div className="src-grid">
                <div className="src">
                  <div className="src-org">Eur Heart J · 2024</div>
                  <div className="src-t">
                    STAR Study: Electrical Storm Treatment by Percutaneous SGB
                  </div>
                  <Ext
                    href="https://academic.oup.com/eurheartj/article/45/10/823/7476499"
                    className="src-url"
                  >
                    https://academic.oup.com/eurheartj/article/45/10/823/7476499
                  </Ext>
                </div>
                <div className="src">
                  <div className="src-org">Sci Rep · 2024</div>
                  <div className="src-t">
                    Efficacy of SGB in Electrical Storm: Systematic Review and Meta-Analysis
                  </div>
                  <Ext href="https://doi.org/10.1038/s41598-024-76663-9" className="src-url">
                    https://doi.org/10.1038/s41598-024-76663-9
                  </Ext>
                </div>
                <div className="src">
                  <div className="src-org">JACC: Clinical Electrophysiology · 2024</div>
                  <div className="src-t">
                    Multicenter Study of SGB for Refractory Ventricular Arrhythmias
                  </div>
                  <Ext
                    href="https://www.jacc.org/doi/10.1016/j.jacep.2023.12.012"
                    className="src-url"
                  >
                    https://www.jacc.org/doi/10.1016/j.jacep.2023.12.012
                  </Ext>
                </div>
                <div className="src">
                  <div className="src-org">PubMed · 2025</div>
                  <div className="src-t">
                    SGB for Ventricular Arrhythmias: Mechanisms, Outcomes, Future Directions
                  </div>
                  <Ext href="https://pubmed.ncbi.nlm.nih.gov/40569055/" className="src-url">
                    https://pubmed.ncbi.nlm.nih.gov/40569055/
                  </Ext>
                </div>
              </div>

              <h3>ホットフラッシュ・更年期</h3>
              <div className="src-grid">
                <div className="src">
                  <div className="src-org">Med Hypotheses · 2009 (ScienceDirect)</div>
                  <div className="src-t">Unifying theory: SGB for CRPS, hot flashes, and PTSD</div>
                  <Ext
                    href="https://www.sciencedirect.com/science/article/abs/pii/S0306987709000413"
                    className="src-url"
                  >
                    https://www.sciencedirect.com/science/article/abs/pii/S0306987709000413
                  </Ext>
                </div>
              </div>

              <h3>周術期・救急領域</h3>
              <div className="src-grid">
                <div className="src">
                  <div className="src-org">EMCrit Project · 2025</div>
                  <div className="src-t">SGB for Electrical Storm — EMCrit Clinical Review</div>
                  <Ext
                    href="https://emcrit.org/emcrit/stellate-ganglion-block/"
                    className="src-url"
                  >
                    https://emcrit.org/emcrit/stellate-ganglion-block/
                  </Ext>
                </div>
                <div className="src">
                  <div className="src-org">ACEP · EM Ultrasound · 2025</div>
                  <div className="src-t">Riders on the Storm: SGB for Electrical Storm</div>
                  <Ext
                    href="https://www.acep.org/emultrasound/newsroom/march-2025/riders-on-the-storm-stellate-ganglion-block-for-electrical-storm"
                    className="src-url"
                  >
                    https://www.acep.org/emultrasound/newsroom/march-2025/riders-on-the-storm-stellate-ganglion-block-for-electrical-storm
                  </Ext>
                </div>
              </div>

              <h3>総合レビュー</h3>
              <div className="src-grid">
                <div className="src">
                  <div className="src-org">Cureus · 2023 (PMC)</div>
                  <div className="src-t">A Review of SGB as an Adjunctive Treatment Modality</div>
                  <Ext
                    href="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC10029323/"
                    className="src-url"
                  >
                    https://www.ncbi.nlm.nih.gov/pmc/articles/PMC10029323/
                  </Ext>
                </div>
                <div className="src">
                  <div className="src-org">PMC</div>
                  <div className="src-t">
                    SGB: Angina Pectoris — Systematic Review and Meta-Analysis
                  </div>
                  <Ext
                    href="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC11842144/"
                    className="src-url"
                  >
                    https://www.ncbi.nlm.nih.gov/pmc/articles/PMC11842144/
                  </Ext>
                </div>
              </div>

              <h3>進行中の臨床試験（ClinicalTrials.gov）</h3>
              <div className="src-grid">
                <div className="src">
                  <div className="src-org">GANGSTER Trial</div>
                  <div className="src-t">電気的嵐に対するSGBのRCT</div>
                  <Ext href="https://clinicaltrials.gov" className="src-url">
                    https://clinicaltrials.gov
                  </Ext>
                </div>
                <div className="src">
                  <div className="src-org">NCT04691271</div>
                  <div className="src-t">くも膜下出血後脳血管攣縮へのSGB（n=202）</div>
                  <Ext href="https://clinicaltrials.gov/study/NCT04691271" className="src-url">
                    https://clinicaltrials.gov/study/NCT04691271
                  </Ext>
                </div>
                <div className="src">
                  <div className="src-org">NCT06476925</div>
                  <div className="src-t">周術期AF予防（n=100）</div>
                  <Ext href="https://clinicaltrials.gov/study/NCT06476925" className="src-url">
                    https://clinicaltrials.gov/study/NCT06476925
                  </Ext>
                </div>
                <div className="src">
                  <div className="src-org">NCT05357690</div>
                  <div className="src-t">周術期AF予防（n=220）</div>
                  <Ext href="https://clinicaltrials.gov/study/NCT05357690" className="src-url">
                    https://clinicaltrials.gov/study/NCT05357690
                  </Ext>
                </div>
                <div className="src">
                  <div className="src-org">NCT05094245</div>
                  <div className="src-t">Bell麻痺へのSGB</div>
                  <Ext href="https://clinicaltrials.gov/study/NCT05094245" className="src-url">
                    https://clinicaltrials.gov/study/NCT05094245
                  </Ext>
                </div>
              </div>

              <div className="alert a-purple">
                <div className="alert-i">📋</div>
                <div>
                  <strong>最終的な学術的免責事項：</strong>
                  本資料のすべての情報は<strong>学術・教育・研究目的のみ</strong>
                  を対象としています。星状神経節ブロックは<strong>侵襲的手技</strong>
                  であり、適切な医学的トレーニング・設備・緊急対応体制なしに実施することは禁止されています。すべての臨床判断は、有資格医師による個別患者評価のもとで行われなければなりません。
                </div>
              </div>
            </section>
          </AutoGlossary>
        </main>
      </div>

      {/* FOOTER */}
      <div className="footer">
        <strong>星状神経節ブロック（SGB）完全ガイド</strong> —
        国際エビデンス（2026年時点）に基づく学術資料
        <br />📅 作成年: 2025年 | 次回レビュー推奨: 重要RCT（GANGSTER Trial 等）の公開時
        <br />
        ⚠️
        本資料は学術・教育・研究目的のみを対象としています。臨床への適用は必ず資格を持つ医療専門家の監督のもとで行ってください。
      </div>
    </div>
  );
}
