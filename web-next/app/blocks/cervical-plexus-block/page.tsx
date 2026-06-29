import type { Metadata } from "next";
import { CpbSidebar } from "@/components/blocks/CpbSidebar";
import { Ext } from "@/components/Ext";
import AutoGlossary from "@/components/glossary/AutoGlossary";
import MermaidDiagram from "@/components/MermaidDiagram";
import "./cervical-plexus-block.css";

export const metadata: Metadata = {
  title: "浅・深頚神経叢ブロック（Cervical Plexus Block: CPB）完全ガイド",
  description:
    "国際エビデンス（StatPearls 2024 / NYSORA / Korean J Anesthesiol 2018 / BJA Education 2023）に基づく頚神経叢ブロック（CPB）の包括的解説。浅・中間・深の3層、適応・禁忌・手技・局所麻酔薬・合併症・安全管理を初学者向けに整理。",
};

/** CPB ページの Mermaid テーマ（元 HTML の mermaid.initialize themeVariables を踏襲）。 */
const CPB_MERMAID_THEME: Record<string, string> = {
  primaryColor: "#fce4ec",
  primaryTextColor: "#4a0e2e",
  primaryBorderColor: "#c2185b",
  lineColor: "#546e7a",
  secondaryColor: "#fce4ec",
  tertiaryColor: "#f8bbd0",
  edgeLabelBackground: "#ffffff",
  fontSize: "13px",
};

/**
 * Renders the cervical plexus block guide page.
 *
 * @returns The page content for the comprehensive cervical plexus block educational guide.
 */
export default function CervicalPlexusBlockPage() {
  return (
    <div className="cervical-accent">
      {/* HERO */}
      <div className="hero">
        <div style={{ fontSize: 34 }}>💉</div>
        <h1>浅・深頚神経叢ブロック（Cervical Plexus Block: CPB）完全ガイド</h1>
        <p className="hero-sub">
          国際エビデンス（StatPearls 2024 / NYSORA / Korean J Anesthesiol 2018 / BJA Education
          2023）に基づく包括的解説 — 初学者向けステップバイステップ
        </p>
        <div className="hero-tags">
          <span className="hero-tag">浅・中間・深の3層</span>
          <span className="hero-tag">C2〜C4 感覚枝（4本）</span>
          <span className="hero-tag">頸動脈内膜切除術（CEA）</span>
          <span className="hero-tag">超音波ガイド下法</span>
          <span className="hero-tag">LAST 安全管理</span>
        </div>
      </div>

      {/* DISCLAIMER */}
      <div className="disclaimer">
        <strong>⚠️ Academic Disclaimer（学術免責事項）</strong>　本資料は
        <strong>学術・教育・研究目的のみ</strong>
        を対象としています。頚神経叢ブロックは<strong>侵襲的手技</strong>
        であり、適切なトレーニング・設備・緊急対応体制を備えた医療専門家のみが実施できます。本資料は個人への医療アドバイス・診断・処方を提供するものではありません。実際の手技は必ず有資格医師の判断のもとで行ってください。
      </div>

      {/* LAYOUT */}
      <div className="layout">
        <CpbSidebar />

        <main className="main">
          <AutoGlossary>
            {/* ============ SECTION 1 ============ */}
            <section id="s1" className="sec">
              <div className="sec-hd">
                <div className="sec-num">1</div>
                <h1 className="sec-title">概論 — 頚神経叢ブロックとは</h1>
              </div>

              <p>
                <strong>頚神経叢ブロック（Cervical Plexus Block; CPB）</strong>
                は、頸部前外側・耳垂・鎖骨・肩峰鎖骨関節の皮膚および深部組織に麻酔と鎮痛を提供する
                <strong>区域麻酔技術</strong>
                です。C2〜C4神経根の分布域に対して密度の高い麻酔・鎮痛効果を生みます。
              </p>

              <div className="alert a-info">
                <div className="alert-i">📌</div>
                <div>
                  頚神経叢ブロックが麻酔する範囲は<strong>「ケープ状領域」</strong>
                  と呼ばれ、耳垂の後端・鎖骨外側端・下顎骨内側面・鎖骨下面によって区切られる体表領域です。
                </div>
              </div>

              <h2>1-1. 歴史的背景</h2>
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
                      <td>1914年</td>
                      <td>Heidenheit が外側アプローチを初めて記載</td>
                    </tr>
                    <tr>
                      <td>1920年</td>
                      <td>
                        Victor Pauchet が外側アプローチを推奨（後方アプローチより優れると主張）
                      </td>
                    </tr>
                    <tr>
                      <td>1975年</td>
                      <td>Winnie が単回注射による外側アプローチの簡略化手技を記載</td>
                    </tr>
                    <tr>
                      <td>2004年</td>
                      <td>中間（Intermediate）CPB の概念が導入</td>
                    </tr>
                    <tr>
                      <td>2008年</td>
                      <td>GALA トライアル（多施設RCT）が局所麻酔 vs 全身麻酔の成績を比較</td>
                    </tr>
                    <tr>
                      <td>2010年代〜</td>
                      <td>超音波ガイド下技術の普及により安全性が大幅向上</td>
                    </tr>
                    <tr>
                      <td>2023年</td>
                      <td>
                        BJA Education（Jarvis et al.）が浅・中間・深の3層の筋膜標的を体系的に整理
                      </td>
                    </tr>
                    <tr>
                      <td>2025年</td>
                      <td>Anesthesiology 誌にて術後慢性疼痛への予防効果が初のRCTで報告</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <h2>1-2. 全体像の把握</h2>
              <div className="mmd">
                <div className="mmd-lbl">フローチャート — 頚神経叢の構成と CPB の3タイプ</div>
                <MermaidDiagram
                  themeVariables={CPB_MERMAID_THEME}
                  chart={`flowchart TD
CP["🔵 頚神経叢\\n（Cervical Plexus）\\nC1〜C4前枝から形成"]

CP --> Shallow["浅枝（感覚枝）\\n4本の終末枝\\n皮膚・浅層の知覚を支配"]
CP --> Deep["深枝（主に運動枝）\\n頸部深筋の運動支配\\n横隔神経（C3-C5）を含む"]

Shallow --> B1["小後頭神経 Lesser Occipital\\nC2 → 後頭部外側・耳介後部"]
Shallow --> B2["大耳介神経 Greater Auricular\\nC2/C3 → 耳介・耳下腺部"]
Shallow --> B3["頸横神経 Transverse Cervical\\nC2/C3 → 頸部前面"]
Shallow --> B4["鎖骨上神経 Supraclavicular\\nC3/C4 → 鎖骨上・肩峰部"]

Deep --> D1["頸神経ワナ Ansa Cervicalis\\nC1-C3 → 舌骨下筋群"]
Deep --> D2["横隔神経 Phrenic Nerve\\nC3-C5 → 横隔膜（運動）"]

CP --> Block["💉 CPBの3タイプ"]
Block --> SCB["浅頚神経叢ブロック\\nSuperficial CPB\\n皮下注射/筋膜浅層"]
Block --> ICB["中間頚神経叢ブロック\\nIntermediate CPB\\n深頸筋膜投資層と椎前筋膜の間"]
Block --> DCB["深頚神経叢ブロック\\nDeep CPB\\n椎前筋膜深層/横突起傍"]

style CP fill:#1565c0,color:#fff
style Block fill:#e65100,color:#fff
style SCB fill:#1b5e20,color:#fff
style ICB fill:#4a148c,color:#fff
style DCB fill:#b71c1c,color:#fff`}
                />
              </div>
            </section>

            {/* ============ SECTION 2 ============ */}
            <section id="s2" className="sec">
              <div className="sec-hd">
                <div className="sec-num">2</div>
                <h1 className="sec-title">解剖学的基礎 — 頚神経叢の構造</h1>
              </div>

              <div className="alert a-purple">
                <div className="alert-i">🎯</div>
                <div>
                  <strong>初学者へのポイント：</strong>CPB を安全に習得するには、
                  <strong>胸鎖乳突筋（SCM）の後縁</strong>と<strong>頸部筋膜の層構造</strong>
                  を体系的に理解することが最重要です。
                </div>
              </div>

              <h2>2-1. 頚神経叢の形成</h2>
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
                        <strong>起源</strong>
                      </td>
                      <td>
                        C1〜C4脊髄神経の<strong>腹側一次枝（前枝）</strong>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <strong>感覚ブロックの主標的</strong>
                      </td>
                      <td>
                        <strong>C2〜C4</strong>（浅枝4本）
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <strong>出現部位</strong>
                      </td>
                      <td>SCM後縁中点、甲状軟骨切痕レベル</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>超音波での外観</strong>
                      </td>
                      <td>低エコーの卵形構造の集合体（ハニカム様）</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <h2>2-2. 4本の浅枝（感覚枝）の支配域</h2>
              <div className="tbl">
                <table>
                  <thead>
                    <tr>
                      <th>神経名</th>
                      <th>起源</th>
                      <th>支配域</th>
                      <th>臨床的重要性</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <strong>小後頭神経（Lesser Occipital N.）</strong>
                      </td>
                      <td>C2腹側枝</td>
                      <td>後頭部外側・耳介後部</td>
                      <td>乳様突起周囲手術</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>大耳介神経（Greater Auricular N.）</strong>
                      </td>
                      <td>C2/C3腹側枝</td>
                      <td>耳介全体・耳下腺部・顎角下方</td>
                      <td>耳介・耳下腺手術</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>頸横神経（Transverse Cervical N.）</strong>
                      </td>
                      <td>C2/C3腹側枝</td>
                      <td>頸部前面の皮膚</td>
                      <td>頸部前面手術</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>鎖骨上神経（Supraclavicular N.）</strong>
                      </td>
                      <td>C3/C4腹側枝</td>
                      <td>鎖骨上・肩峰・上腕近位部皮膚</td>
                      <td>鎖骨手術・肩関節手術補助</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="alert a-warn">
                <div className="alert-i">⚠️</div>
                <div>
                  これら4本はすべて<strong>SCM後縁の中点</strong>
                  付近から皮下に出現します。この部位がランドマーク法の注射点となります。
                </div>
              </div>

              <h2>2-3. 神経の走行</h2>
              <div className="mmd">
                <div className="mmd-lbl">フローチャート — C2〜C4前枝から皮下出現までの走行</div>
                <MermaidDiagram
                  themeVariables={CPB_MERMAID_THEME}
                  chart={`flowchart LR
A["🔵 C2〜C4\\n脊髄神経前枝\\n（椎間孔内）"]
B["椎前筋膜（Prevertebral Fascia）\\n深層を通って前方へ走行"]
C["深頸筋膜の投資層\\n（Investing Layer of\\nDeep Cervical Fascia）\\nを貫通"]
D["SCM後縁の中点\\n（甲状軟骨レベル）\\n←4本が同時に出現する「ホットスポット」"]
E["🔴 皮下組織へ\\n各方向に扇状に走行\\n→ 前外側頸部・耳介・鎖骨上・後頭部外側"]

A --> B --> C --> D --> E

style A fill:#1565c0,color:#fff
style D fill:#e65100,color:#fff
style E fill:#2e7d32,color:#fff`}
                />
              </div>
            </section>

            {/* ============ SECTION 3 ============ */}
            <section id="s3" className="sec">
              <div className="sec-hd">
                <div className="sec-num">3</div>
                <h1 className="sec-title">頸部筋膜の層構造（最重要コンセプト）</h1>
              </div>

              <div className="alert a-danger">
                <div className="alert-i">⚠️</div>
                <div>
                  <strong>これが最重要です：</strong>CPB の3タイプ（浅・中間・深）は、それぞれ
                  <strong>異なる筋膜層</strong>
                  を標的とします。この概念を理解しないと3つのブロックの違いが把握できません。
                </div>
              </div>

              <h2>3-1. 頸部筋膜の3層と各ブロックの標的</h2>
              <div className="mmd">
                <div className="mmd-lbl">
                  フローチャート — 表層から深層への筋膜と各 CPB の注入標的
                </div>
                <MermaidDiagram
                  themeVariables={CPB_MERMAID_THEME}
                  chart={`flowchart TB
subgraph Surface["表層 ← 皮膚"]
SKIN["🟤 皮膚\\n（Skin）"]
SFC["浅頸筋膜\\n（Superficial Cervical Fascia）\\n広頸筋・浅静脈・リンパ節"]
end

subgraph DCF["深頸筋膜（Deep Cervical Fascia）"]
IL["投資層\\n（Investing Layer / 深頸筋膜固有層）\\nSCM・僧帽筋を包む"]
PCS["後頸部間隙\\n（Posterior Cervical Space: PCS）\\n← 中間CPBの標的空間"]
PVF["椎前筋膜\\n（Prevertebral Fascia）\\n前・中斜角筋・頸長筋を包む"]
end

subgraph Deep["深層"]
TP["頸椎横突起\\n（Transverse Processes C2-C4）\\n← 深CPBの針先目標"]
VES["神経根・椎骨動脈"]
end

SKIN --> SFC --> IL --> PCS --> PVF --> TP

SCB["💉 浅CPB\\n注入：皮下組織〜投資層の浅層\\n→ 主に感覚枝を遮断"]
ICB["💉 中間CPB\\n注入：投資層と椎前筋膜の間（PCS）\\n→ 感覚枝＋一部深枝"]
DCB["💉 深CPB\\n注入：椎前筋膜深層〜横突起傍\\n→ 感覚枝＋深枝（完全遮断）"]

SFC -.-> SCB
PCS -.-> ICB
TP -.-> DCB

style SCB fill:#1b5e20,color:#fff
style ICB fill:#4a148c,color:#fff
style DCB fill:#b71c1c,color:#fff
style PCS fill:#f3e5f5,stroke:#6a1b9a
style TP fill:#fce4ec,stroke:#c62828`}
                />
              </div>

              <h2>3-2. 3タイプの比較一覧</h2>
              <div className="tbl">
                <table>
                  <thead>
                    <tr>
                      <th>比較項目</th>
                      <th>浅CPB（Superficial）</th>
                      <th>中間CPB（Intermediate）</th>
                      <th>深CPB（Deep）</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <strong>注入標的</strong>
                      </td>
                      <td>皮下組織〜投資層の外側</td>
                      <td>投資層と椎前筋膜の間</td>
                      <td>椎前筋膜深層（横突起傍）</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>遮断できる枝</strong>
                      </td>
                      <td>感覚枝（4枝）のみ</td>
                      <td>感覚枝＋一部深枝</td>
                      <td>感覚枝＋深枝（完全）</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>運動ブロック</strong>
                      </td>
                      <td>なし</td>
                      <td>最小限</td>
                      <td>あり（横隔神経・深枝）</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>技術的難易度</strong>
                      </td>
                      <td>
                        <span className="tG">易（★☆☆）</span>
                      </td>
                      <td>中（★★☆）</td>
                      <td>
                        <span className="tR">難（★★★）</span>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <strong>合併症リスク</strong>
                      </td>
                      <td>
                        <span className="tG">低</span>
                      </td>
                      <td>中〜低</td>
                      <td>
                        <span className="tR">高</span>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <strong>超音波の必要性</strong>
                      </td>
                      <td>推奨（安全性向上）</td>
                      <td>強く推奨</td>
                      <td>
                        <span className="tR">必須</span>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <strong>CEA麻酔への適用</strong>
                      </td>
                      <td>単独では不完全な場合あり</td>
                      <td>補助として有効</td>
                      <td>従来から使用</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>甲状腺手術への適用</strong>
                      </td>
                      <td>両側で有効 ✅</td>
                      <td>単側で有効 ✅</td>
                      <td>通常は不要</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>横隔膜麻痺リスク</strong>
                      </td>
                      <td>
                        <span className="tG">極めて低い</span>
                      </td>
                      <td>低〜中（濃度依存）</td>
                      <td>
                        <span className="tR">高（約50-80%）</span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="alert a-info">
                <div className="alert-i">📌</div>
                <div>
                  <strong>BJA Education 2023（Jarvis et al.）の重要なメッセージ：</strong>中間CPB
                  は浅CPB の鎮痛効果を保ちながら、深CPB
                  のリスク（横隔膜麻痺・反回喉頭神経ブロック・高位脊髄麻酔）を回避できる「折衷案」として、多くの術式で深CPB
                  の代替となり得る。
                </div>
              </div>
            </section>

            {/* ============ SECTION 4 ============ */}
            <section id="s4" className="sec">
              <div className="sec-hd">
                <div className="sec-num">4</div>
                <h1 className="sec-title">ブロックの3分類と局所麻酔薬の注入部位</h1>
              </div>

              <h2>4-1. 注入部位の断面イメージ（C4レベル横断面）</h2>
              <p>
                外側（皮膚側）から最深部（横突起側）へ向かう構造物と、各 CPB
                が薬液を置く層を順に示します。
              </p>
              <div className="tbl">
                <table>
                  <thead>
                    <tr>
                      <th>位置関係</th>
                      <th>構造物</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>最表層（外側から）</td>
                      <td>皮膚 → 皮下組織 → 広頸筋</td>
                    </tr>
                    <tr>
                      <td>
                        <span className="tG">① 浅CPBの標的</span>
                      </td>
                      <td>SCM後縁付近の皮下組織（投資層の外）</td>
                    </tr>
                    <tr>
                      <td>SCMの厚さ</td>
                      <td>約1〜2 cm</td>
                    </tr>
                    <tr>
                      <td>
                        <span className="tB">② 中間CPBの標的</span>
                      </td>
                      <td>SCMと椎前筋膜の間の後頸部間隙（PCS）</td>
                    </tr>
                    <tr>
                      <td>椎前筋膜</td>
                      <td>前斜角筋・頸長筋を包む強靭な筋膜</td>
                    </tr>
                    <tr>
                      <td>
                        <span className="tR">③ 深CPBの標的</span>
                      </td>
                      <td>椎前筋膜深層（横突起の前外側）</td>
                    </tr>
                    <tr>
                      <td>最深部</td>
                      <td>頸椎横突起・椎骨動脈（横突孔内）</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="phase-grid">
                <div className="ph ph4">
                  <div className="ph-icon">①</div>
                  <div className="ph-title">浅CPB</div>
                  <div className="ph-time">最も浅い</div>
                  <div className="ph-desc">
                    皮下組織〜投資層の外側。感覚枝（4枝）のみを遮断。最も安全で簡便。
                  </div>
                </div>
                <div className="ph ph2">
                  <div className="ph-icon">②</div>
                  <div className="ph-title">中間CPB</div>
                  <div className="ph-time">中間層</div>
                  <div className="ph-desc">
                    投資層と椎前筋膜の間（PCS）。感覚枝＋一部深枝。リスクと効果の最適バランス。
                  </div>
                </div>
                <div className="ph ph3">
                  <div className="ph-icon">③</div>
                  <div className="ph-title">深CPB</div>
                  <div className="ph-time">最も深い</div>
                  <div className="ph-desc">
                    椎前筋膜深層〜横突起傍。感覚枝＋深枝を完全遮断。横隔膜麻痺リスク高。
                  </div>
                </div>
                <div className="ph ph1">
                  <div className="ph-icon">🎯</div>
                  <div className="ph-title">共通原則</div>
                  <div className="ph-time">全タイプ</div>
                  <div className="ph-desc">
                    逆吸引（aspiration）必須・分割投与・総量管理。深いほど超音波の必要性が高まる。
                  </div>
                </div>
              </div>
            </section>

            {/* ============ SECTION 5 ============ */}
            <section id="s5" className="sec">
              <div className="sec-hd">
                <div className="sec-num">5</div>
                <h1 className="sec-title">適応症とエビデンスグレード</h1>
              </div>

              <h2>5-1. 適応症一覧</h2>
              <div className="tbl">
                <table>
                  <thead>
                    <tr>
                      <th>術式・処置</th>
                      <th>推奨ブロックタイプ</th>
                      <th>エビデンスグレード</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <strong>頸動脈内膜切除術（CEA）</strong>
                      </td>
                      <td>浅CPB＋中間CPB または 浅＋深CPB</td>
                      <td>
                        <span className="bA">Grade A</span> GALA Trial（Lancet 2008）
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <strong>甲状腺・副甲状腺手術</strong>
                      </td>
                      <td>両側浅CPBまたは両側中間CPB</td>
                      <td>
                        <span className="bA">Grade A</span> SR/MA（BJA 2018; Indian J Anaesth 2023）
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <strong>頸部リンパ節郭清術</strong>
                      </td>
                      <td>浅CPB ± 深CPB</td>
                      <td>
                        <span className="bB">Grade B</span> 複数のRCT
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <strong>鎖骨骨折・鎖骨手術</strong>
                      </td>
                      <td>浅CPB ± 鎖骨胸筋筋膜面ブロック</td>
                      <td>
                        <span className="bB">Grade B</span> RCT 2023-2025
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <strong>後頭下開頭術（慢性術後疼痛予防）</strong>
                      </td>
                      <td>浅CPB（術前）</td>
                      <td>
                        <span className="bA">Grade A</span> RCT（Anesthesiology 2025; n=292）
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <strong>頸部表在手術（リンパ節生検等）</strong>
                      </td>
                      <td>浅CPB</td>
                      <td>
                        <span className="bB">Grade B</span> 観察研究多数
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <strong>耳介・外耳道手術</strong>
                      </td>
                      <td>浅CPB</td>
                      <td>
                        <span className="bB">Grade B</span> 症例シリーズ
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <strong>肩関節手術（補助）</strong>
                      </td>
                      <td>浅CPB ± 斜角筋間ブロック</td>
                      <td>
                        <span className="bB">Grade B</span> 観察研究
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <strong>内頸静脈CVCカテーテル挿入（救急）</strong>
                      </td>
                      <td>浅CPB</td>
                      <td>
                        <span className="bC">Grade C</span> 症例シリーズ
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <strong>顎口腔外科手術</strong>
                      </td>
                      <td>浅CPB ± 局所浸潤麻酔</td>
                      <td>
                        <span className="bC">Grade C</span> Frontiers Oncol 2024
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <strong>頸原性頭痛（診断・治療）</strong>
                      </td>
                      <td>深CPB（診断的ブロック）</td>
                      <td>
                        <span className="bC">Grade C</span> 症例シリーズ
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <h2>5-2. 患者選択フローチャート</h2>
              <div className="mmd">
                <div className="mmd-lbl">
                  フローチャート — 侵襲深度・呼吸予備能・術式に基づくブロック選択
                </div>
                <MermaidDiagram
                  themeVariables={CPB_MERMAID_THEME}
                  chart={`flowchart TD
START(["🩺 CPB候補患者\\n評価開始"])
START --> Q1{"手術の侵襲深度は？"}

Q1 -->|"皮膚・皮下組織のみ\\n（表在手術）"| SCB_ONLY["✅ 浅CPB単独\\nシンプル・安全"]
Q1 -->|"頸部深層・甲状腺\\n（中等度侵襲）"| Q2

Q2{"呼吸予備能は？"}
Q2 -->|"正常"| Q3
Q2 -->|"重篤なCOPD\\n対側横隔膜麻痺など"| CAUTION["⚠️ 深CPBは禁忌\\n浅CPBまたは中間CPBを\\n慎重に選択"]

Q3{"CEAで神経学的\\nモニタリングが必要か？"}
Q3 -->|"Yes（覚醒下）"| CEA_CHOICE["CEA: 浅CPB＋中間CPB（推奨）\\nまたは 浅CPB＋深CPB（従来法）"]
Q3 -->|"No（甲状腺・頸部）"| THYROID["甲状腺：両側浅CPBまたは中間CPB\\n頸部郭清：浅＋中間CPBの組み合わせ"]

SCB_ONLY --> PROCEED["🟢 手技実施へ\\n（禁忌確認後）"]
CEA_CHOICE --> PROCEED
THYROID --> PROCEED
CAUTION --> PROCEED

style CAUTION fill:#e65100,color:#fff
style PROCEED fill:#1b5e20,color:#fff
style START fill:#1565c0,color:#fff`}
                />
              </div>
            </section>

            {/* ============ SECTION 6 ============ */}
            <section id="s6" className="sec">
              <div className="sec-hd">
                <div className="sec-num">6</div>
                <h1 className="sec-title">禁忌と注意事項</h1>
              </div>

              <h2>6-1. 絶対禁忌</h2>
              <div className="tbl">
                <table className="th-red">
                  <thead>
                    <tr>
                      <th>禁忌事項</th>
                      <th>理由</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <strong>患者の同意が得られない</strong>
                      </td>
                      <td>倫理的・法的義務</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>注射部位の局所感染</strong>
                      </td>
                      <td>感染播種・深部感染のリスク</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>局所麻酔薬（アミド系・エステル系）アレルギーの既往</strong>
                      </td>
                      <td>アナフィラキシーショック</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>対側横隔膜麻痺（深CPBの場合）</strong>
                      </td>
                      <td>両側横隔膜麻痺 → 呼吸停止</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <h2>6-2. 相対禁忌（特に深CPBで問題となる）</h2>
              <div className="tbl">
                <table className="th-orange">
                  <thead>
                    <tr>
                      <th>条件</th>
                      <th>リスク</th>
                      <th>対応</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>重篤なCOPD（FEV1 &lt; 1.0 L）</td>
                      <td>片側横隔膜麻痺でも呼吸不全悪化</td>
                      <td>浅CPBに切り替え、または全身麻酔を選択</td>
                    </tr>
                    <tr>
                      <td>頸部手術既往・頸部放射線照射歴</td>
                      <td>解剖構造の変化により合併症リスク増大</td>
                      <td>超音波ガイド下で慎重に判断</td>
                    </tr>
                    <tr>
                      <td>重篤な凝固障害（INR &gt; 1.5）</td>
                      <td>血腫による気道圧迫リスク</td>
                      <td>凝固能改善後に実施</td>
                    </tr>
                    <tr>
                      <td>対側声帯麻痺の既往</td>
                      <td>反回喉頭神経ブロックで気道確保困難</td>
                      <td>耳鼻咽喉科評価後に判断</td>
                    </tr>
                    <tr>
                      <td>妊娠（特に第1三半期）</td>
                      <td>局所麻酔薬の胎児への影響</td>
                      <td>リスクベネフィットを慎重に評価</td>
                    </tr>
                    <tr>
                      <td>未治療の対側気胸</td>
                      <td>同側横隔膜麻痺 → 換気不全</td>
                      <td>気胸治療後に実施</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="alert a-warn">
                <div className="alert-i">⚠️</div>
                <div>
                  <strong>注意：</strong>
                  最近の前向き研究では、浅CPB
                  での横隔膜麻痺リスクは従来考えられていたより低いことが示唆されています。ただし、
                  <strong>深CPB では依然としてリスクが有意に高い</strong>点に注意してください。
                </div>
              </div>
            </section>

            {/* ============ SECTION 7 ============ */}
            <section id="s7" className="sec">
              <div className="sec-hd">
                <div className="sec-num">7</div>
                <h1 className="sec-title">必要物品</h1>
              </div>

              <h2>7-1. 標準物品チェックリスト</h2>
              <div className="tbl">
                <table>
                  <thead>
                    <tr>
                      <th>カテゴリー</th>
                      <th>必要物品</th>
                      <th>仕様</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <strong>穿刺針</strong>
                      </td>
                      <td>25G短斜面針（浅CPB）</td>
                      <td>長さ 25 mm</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>穿刺針</strong>
                      </td>
                      <td>22G針（深CPB/中間CPB）</td>
                      <td>長さ 50〜75 mm</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>局所麻酔薬</strong>
                      </td>
                      <td>ロピバカイン0.5%、ブピバカイン0.25〜0.5%、リドカイン1〜2%</td>
                      <td>用量は §13 参照</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>注射器</strong>
                      </td>
                      <td>10 mL または 20 mL</td>
                      <td>ルアーロック型推奨</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>超音波機器</strong>
                      </td>
                      <td>高周波リニアプローブ（10〜15 MHz）</td>
                      <td>浅CPBに最適</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>皮膚消毒薬</strong>
                      </td>
                      <td>クロルヘキシジンアルコール</td>
                      <td>ポビドンヨードも可</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>滅菌手袋・ドレープ</strong>
                      </td>
                      <td>標準的無菌操作に準じる</td>
                      <td>—</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>緊急薬品</strong>
                      </td>
                      <td>20%脂肪乳剤（LAST対応）・エピネフリン</td>
                      <td>
                        <span className="tR">必須</span>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <strong>モニタリング</strong>
                      </td>
                      <td>パルスオキシメーター・心電図・血圧計</td>
                      <td>施術前から装着</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* ============ SECTION 8 ============ */}
            <section id="s8" className="sec">
              <div className="sec-hd">
                <div className="sec-num">8</div>
                <h1 className="sec-title">手技① — 浅頚神経叢ブロック（ランドマーク法）</h1>
              </div>

              <div className="alert a-warn">
                <div className="alert-i">⚠️</div>
                <div>
                  以下は教育目的の解説です。実際の施術は
                  <strong>専門トレーニングを受けた医師のみ</strong>が実施できます。
                </div>
              </div>

              <h2>8-1. ランドマークの同定と手順</h2>
              <h3>ステップ 1：ランドマークのマーキング</h3>
              <div className="mmd">
                <div className="mmd-lbl">フローチャート — 浅CPB ランドマーク法の注射点同定</div>
                <MermaidDiagram
                  themeVariables={CPB_MERMAID_THEME}
                  chart={`flowchart LR
A["乳様突起（Mastoid Process）\\nを触診・マーク"]
B["鎖骨中点（Midclavicle）\\nをマーク"]
C["SCM後縁を触診\\n乳様突起〜鎖骨中点\\nを結ぶ線上"]
D["🎯 SCM後縁の中点\\n甲状軟骨切痕レベル\\n← 浅CPBの注射点"]
E["皮膚消毒・局所浸潤麻酔\\n（任意）"]
F["💉 注射：\\n25G針で皮下組織に扇状に注入\\n上方・後方・下方へ各2〜3 cm"]

A --> B --> C --> D --> E --> F

style D fill:#e65100,color:#fff
style F fill:#1b5e20,color:#fff`}
                />
              </div>

              <h3>ステップ 2：「ニードルファニング」技術</h3>
              <ol>
                <li>針の刺入点：SCM後縁の中点</li>
                <li>皮膚を穿刺後、皮下組織に針先を到達させる</li>
                <li>上方（頭側）・後方（背側）・下方（尾側）へ針を扇状に再刺入</li>
                <li>
                  各方向に 2〜3 mL ずつ局所麻酔薬を注入（<strong>総量 10〜15 mL</strong>）
                </li>
                <li>
                  注入前に必ず<strong>逆吸引（Aspiration test）</strong>を実施
                </li>
              </ol>

              <div className="alert a-info">
                <div className="alert-i">📌</div>
                <div>
                  <strong>ポイント：</strong>SCM後縁の皮下組織に<strong>「ソーセージ状」</strong>
                  に局所麻酔薬が広がるイメージで注入します。
                </div>
              </div>

              <h2>8-2. ランドマーク法の注射点（深CPBとの比較）</h2>
              <div className="tbl">
                <table>
                  <thead>
                    <tr>
                      <th>解剖学的指標</th>
                      <th>浅CPB注射点</th>
                      <th>深CPB注射点</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <strong>乳様突起</strong>
                      </td>
                      <td>参照点</td>
                      <td>基準点（上端）</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>シャセニャック結節（C6前結節）</strong>
                      </td>
                      <td>参照点</td>
                      <td>基準点（下端）</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>C2横突起</strong>
                      </td>
                      <td>—</td>
                      <td>乳様突起から2 cm下</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>C3横突起</strong>
                      </td>
                      <td>—</td>
                      <td>乳様突起から4 cm下</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>C4横突起</strong>
                      </td>
                      <td>—</td>
                      <td>乳様突起から6 cm下</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>注射の深さ</strong>
                      </td>
                      <td>皮下（数mm〜1 cm）</td>
                      <td>2〜3 cm（横突起に触れるまで）</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* ============ SECTION 9 ============ */}
            <section id="s9" className="sec">
              <div className="sec-hd">
                <div className="sec-num">9</div>
                <h1 className="sec-title">手技② — 浅頚神経叢ブロック（超音波ガイド下）</h1>
              </div>

              <p>
                超音波ガイド下法は血管誤穿刺を回避し、薬液の拡散をリアルタイムで確認できるため、ランドマーク法よりも
                <strong>安全で確実</strong>です。
              </p>

              <h2>9-1. 超音波ガイド下浅CPBのステップ</h2>
              <div className="tbl">
                <table>
                  <thead>
                    <tr>
                      <th>ステップ</th>
                      <th>操作</th>
                      <th>ポイント</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>1. プローブ設置</td>
                      <td>高周波リニアプローブ（10〜15 MHz）をSCM後縁・C4レベルに横断位で置く</td>
                      <td>ゲル少量使用</td>
                    </tr>
                    <tr>
                      <td>2. 解剖構造同定</td>
                      <td>
                        SCM、肩甲挙筋（Levator
                        Scapulae）、内頸静脈・総頸動脈、頸神経叢（ハニカム状低エコー）を確認
                      </td>
                      <td>神経はSCM後縁深部に見える</td>
                    </tr>
                    <tr>
                      <td>3. カラードプラ</td>
                      <td>頸動脈・内頸静脈・外頸静脈を確認・回避</td>
                      <td>誤穿刺防止</td>
                    </tr>
                    <tr>
                      <td>4. 針の刺入</td>
                      <td>平面内（in-plane）アプローチで外側から内側へ</td>
                      <td>針先を常に可視化</td>
                    </tr>
                    <tr>
                      <td>5. 薬液確認</td>
                      <td>1〜2 mL注入して薬液拡散をリアルタイムで確認（ハイドロダイセクション）</td>
                      <td>SCMと椎前筋膜の間に広がるか確認</td>
                    </tr>
                    <tr>
                      <td>6. 全量注入</td>
                      <td>10 mLを2 mLずつ分割投与</td>
                      <td>最終的にSCM深面に「ソーセージ状」に広がることを確認</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <h2>9-2. 超音波で確認すべき解剖構造（C4レベル横断面）</h2>
              <div className="mmd">
                <div className="mmd-lbl">フローチャート — C4横断面の構造配列と浅CPB注入目標</div>
                <MermaidDiagram
                  themeVariables={CPB_MERMAID_THEME}
                  chart={`flowchart TB
subgraph US_Image["超音波画像（C4横断面）内側→外側"]
direction LR
IJV["内頸静脈\\n（IJV）\\n圧迫で虚脱する"]
CCA["総頸動脈\\n（CCA）\\n拍動・圧迫で虚脱しない"]
SCM_US["胸鎖乳突筋\\n（SCM）\\n比較的高エコー・三角形"]
PLEXUS["🎯 頸神経叢\\n（C2-C4）\\n低エコーのハニカム状\\nSCM後縁深部〜外側"]
LS["肩甲挙筋\\n（Levator Scapulae）\\n深層"]
PVF_US["椎前筋膜\\nPrevertebral Fascia\\n高エコーの明瞭な線"]
end

IJV --- CCA --- SCM_US --- PLEXUS --- LS --- PVF_US

TARGET["💉 浅CPBの注入目標\\nSCM後縁の外側〜深部の\\n皮下組織（投資層の外面）"]
PLEXUS -.-> TARGET

style PLEXUS fill:#1565c0,color:#fff
style TARGET fill:#1b5e20,color:#fff`}
                />
              </div>
            </section>

            {/* ============ SECTION 10 ============ */}
            <section id="s10" className="sec">
              <div className="sec-hd">
                <div className="sec-num">10</div>
                <h1 className="sec-title">手技③ — 中間頚神経叢ブロック（超音波ガイド下）</h1>
              </div>

              <h2>10-1. 概要と位置づけ</h2>
              <p>
                中間CPB は、2004年に導入された比較的新しいアプローチです。浅CPB
                より効果が強く、深CPB
                より安全で、現在多くの術式（特に甲状腺手術・CEA）で推奨されています。
              </p>

              <div className="alert a-purple">
                <div className="alert-i">📌</div>
                <div>
                  <strong>BJA Education 2023（Jarvis et al.）</strong>は、中間CPB を「多くの適応で
                  <strong>リスクとベネフィットの最適なバランス</strong>
                  を達成できる手技」として位置づけています。
                </div>
              </div>

              <h2>10-2. 手順</h2>
              <div className="mmd">
                <div className="mmd-lbl">
                  フローチャート — 中間CPB（超音波ガイド下）の手技ステップ
                </div>
                <MermaidDiagram
                  themeVariables={CPB_MERMAID_THEME}
                  chart={`flowchart LR
A["プローブ設置\\nC4レベル・SCM後縁\\n横断位"]
B["解剖構造同定\\nSCM・肩甲挙筋・\\n前斜角筋・椎前筋膜を確認"]
C["投資層と椎前筋膜の間の\\n後頸部間隙（PCS）を同定\\n← 目標空間"]
D["22G針を平面内アプローチで\\n外側→内側へ刺入\\n針先をPCSに進める"]
E["逆吸引（Aspiration）\\n血液・CSFの逆流がないことを確認"]
F["1〜2 mL注入で位置確認\\n（ハイドロダイセクション）\\n筋膜間に薬液が広がるか確認"]
G["残量を分割投与\\n総量 10〜15 mL\\n注入時の抵抗に注意"]

A --> B --> C --> D --> E --> F --> G

style C fill:#4a148c,color:#fff
style E fill:#e65100,color:#fff
style G fill:#1b5e20,color:#fff`}
                />
              </div>

              <h3>超音波所見のポイント</h3>
              <ul>
                <li>投資層（高エコーの明瞭な筋膜線）とSCMの深面を確認</li>
                <li>椎前筋膜（前斜角筋の浅面に位置する高エコーの筋膜）を確認</li>
                <li>
                  薬液が両筋膜の間を<strong>「はがす」ように広がれば</strong>正しい位置
                </li>
              </ul>
            </section>

            {/* ============ SECTION 11 ============ */}
            <section id="s11" className="sec">
              <div className="sec-hd">
                <div className="sec-num">11</div>
                <h1 className="sec-title">手技④ — 深頚神経叢ブロック（ランドマーク法）</h1>
              </div>

              <div className="alert a-danger">
                <div className="alert-i">🚨</div>
                <div>
                  <strong>重要な安全警告：</strong>深CPB
                  のランドマーク（盲目的）法は、高位脊髄麻酔・椎骨動脈内注入などの重篤な合併症リスクが有意に高い（
                  <strong>OR 2.13</strong>, Pandit et al., 2007）。
                  <strong>超音波ガイド下法が強く推奨</strong>
                  されます。ランドマーク法は学習目的の理解にとどめることを推奨します。
                </div>
              </div>

              <h2>11-1. ランドマークの同定（3点法）</h2>
              <h3>2点のランドマーク</h3>
              <ol>
                <li>
                  <strong>乳様突起（Mastoid Process; MP）</strong>：耳後方の骨性突起
                </li>
                <li>
                  <strong>シャセニャック結節（Chassaignac's Tubercle）</strong>
                  ：C6前結節、輪状軟骨直下・SCM鎖骨頭の内側で触知可能
                </li>
              </ol>

              <h3>マーキングラインと C2-C4 注射点</h3>
              <div className="tbl">
                <table>
                  <thead>
                    <tr>
                      <th>注射点</th>
                      <th>位置</th>
                      <th>深さの目安</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <strong>C2</strong>
                      </td>
                      <td>乳様突起から尾側 2 cm（MP-C6ライン上）</td>
                      <td>1.5〜3 cm</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>C3</strong>
                      </td>
                      <td>乳様突起から尾側 4 cm</td>
                      <td>2〜3 cm</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>C4</strong>
                      </td>
                      <td>乳様突起から尾側 6 cm（シャセニャック結節の近傍）</td>
                      <td>2〜3 cm</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <h2>11-2. 注射手順（各レベル）</h2>
              <div className="mmd">
                <div className="mmd-lbl">
                  フローチャート — 深CPB ランドマーク法の刺入・逆吸引・注入
                </div>
                <MermaidDiagram
                  themeVariables={CPB_MERMAID_THEME}
                  chart={`flowchart TD
P["患者体位\\n仰臥位・頭部反対側へ\\n10〜15°回旋\\n枕は使用しない（頸部伸展を保持）"]
P --> L["ランドマーク同定\\n乳様突起・シャセニャック結節\\n→ ライン上にC2・C3・C4点をマーク"]
L --> N["22G針を刺入\\n皮膚に対してわずかに尾側方向\\n（頭側方向への刺入は禁止→\\n神経孔への誤刺入リスク）\\n横突起に当たるまで進める（2〜3 cm）"]
N --> A["逆吸引（必須）\\n血液（椎骨動脈）・CSF（くも膜下）の\\n逆流がないことを確認"]
A -->|"陰性"| I["各点に3〜5 mL注入\\n総量 9〜15 mL（3点注射）\\nまたは単点注射（C4のみ: 10〜15 mL）"]
A -->|"陽性"| R["⚠️ 即座に針を抜く\\n位置調整後に再試行\\n繰り返す場合は超音波ガイド下へ切り替え"]

style A fill:#e65100,color:#fff
style R fill:#b71c1c,color:#fff
style I fill:#1b5e20,color:#fff`}
                />
              </div>
            </section>

            {/* ============ SECTION 12 ============ */}
            <section id="s12" className="sec">
              <div className="sec-hd">
                <div className="sec-num">12</div>
                <h1 className="sec-title">手技⑤ — 深頚神経叢ブロック（超音波ガイド下）</h1>
              </div>

              <p>
                超音波ガイド下では、血管・神経・筋膜層をリアルタイムで可視化しながら安全に実施できます。
              </p>

              <h2>12-1. 超音波下深CPBの特徴</h2>
              <div className="tbl">
                <table>
                  <thead>
                    <tr>
                      <th>確認すべき構造</th>
                      <th>超音波での外観</th>
                      <th>目的</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>椎骨動脈（Vertebral Artery）</td>
                      <td>C6では横突孔内（保護される）；C5以上では横突孔外に出ることがある</td>
                      <td>
                        <span className="tR">回避</span>（椎骨動脈内注入→全身痙攣）
                      </td>
                    </tr>
                    <tr>
                      <td>総頸動脈</td>
                      <td>拍動性・圧迫で虚脱しない円形高エコー</td>
                      <td>
                        <span className="tR">回避</span>
                      </td>
                    </tr>
                    <tr>
                      <td>頸椎横突起</td>
                      <td>高エコーの骨性輝点（後方音響陰影）</td>
                      <td>
                        <span className="tG">目標</span>（針先を横突起の前外側に置く）
                      </td>
                    </tr>
                    <tr>
                      <td>椎前筋膜</td>
                      <td>高エコーの薄い筋膜線</td>
                      <td>
                        <span className="tG">目標</span>（この深層に注入）
                      </td>
                    </tr>
                    <tr>
                      <td>頸神経根</td>
                      <td>横突孔内の低エコー構造</td>
                      <td>確認・回避</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <h2>12-2. 超音波ガイド下深CPBのステップ</h2>
              <div className="tbl">
                <table>
                  <thead>
                    <tr>
                      <th>ステップ</th>
                      <th>操作</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>1. プローブ設置</td>
                      <td>高周波リニアプローブをC4レベルに短軸横断位で置く</td>
                    </tr>
                    <tr>
                      <td>2. 横突起の同定</td>
                      <td>
                        横突起の前後結節（二又状の高エコー）を確認。C6では前結節が大きく、これがシャセニャック結節
                      </td>
                    </tr>
                    <tr>
                      <td>3. C4レベルの確認</td>
                      <td>
                        C4横突起は前結節のみ（後結節なし）が特徴。これを指標に椎体レベルを確認
                      </td>
                    </tr>
                    <tr>
                      <td>4. 針の刺入</td>
                      <td>
                        22G針を平面内（in-plane）アプローチで外側から内側へ。針先を横突起の前結節から外側〜前外側へ進める
                      </td>
                    </tr>
                    <tr>
                      <td>5. 注射点の確認</td>
                      <td>椎前筋膜の深面（前長筋/頸長筋の外側面）に針先が位置することを確認</td>
                    </tr>
                    <tr>
                      <td>6. 逆吸引・注入</td>
                      <td>逆吸引陰性確認後、各レベルに3〜5 mLを注入</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* ============ SECTION 13 ============ */}
            <section id="s13" className="sec">
              <div className="sec-hd">
                <div className="sec-num">13</div>
                <h1 className="sec-title">局所麻酔薬の選択と用量</h1>
              </div>

              <h2>13-1. 薬剤選択の原則</h2>
              <div className="drug-grid">
                <div className="drug">
                  <div className="drug-nm">ロピバカイン（Ropivacaine）</div>
                  <div className="drug-br">0.5% / 持続 4〜8時間</div>
                  <div className="drug-tx">
                    運動ブロックが少なく心毒性が低い。<strong>第一選択</strong>（特に浅・中間CPB）。
                  </div>
                </div>
                <div className="drug">
                  <div className="drug-nm">ブピバカイン（Bupivacaine）</div>
                  <div className="drug-br">0.25〜0.5% / 持続 4〜12時間</div>
                  <div className="drug-tx">
                    <strong>長時間効果</strong>。長時間手術・術後鎮痛重視の場合に適す。
                  </div>
                </div>
                <div className="drug">
                  <div className="drug-nm">リドカイン（Lidocaine）</div>
                  <div className="drug-br">1〜2% / 持続 1〜3時間</div>
                  <div className="drug-tx">
                    <strong>速効性・短時間</strong>。短時間処置・診断的ブロックに適す。
                  </div>
                </div>
                <div className="drug">
                  <div className="drug-nm">混合（CEA等）</div>
                  <div className="drug-br">2%リドカイン＋0.5%ブピバカイン</div>
                  <div className="drug-tx">
                    速効性と持続性の両立。<strong>覚醒下CEA</strong>に適す。
                  </div>
                </div>
              </div>

              <h2>13-2. ブロックタイプ別推奨用量</h2>
              <div className="tbl">
                <table>
                  <thead>
                    <tr>
                      <th>ブロックタイプ</th>
                      <th>推奨薬剤</th>
                      <th>推奨容量</th>
                      <th>最大容量</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>浅CPB（片側）</td>
                      <td>0.5%ロピバカイン</td>
                      <td>10〜15 mL</td>
                      <td>20 mL</td>
                    </tr>
                    <tr>
                      <td>浅CPB（両側・甲状腺）</td>
                      <td>0.25%ブピバカイン または 0.5%ロピバカイン</td>
                      <td>各10 mL</td>
                      <td>各15 mL</td>
                    </tr>
                    <tr>
                      <td>中間CPB（片側）</td>
                      <td>0.5%ロピバカイン</td>
                      <td>10〜15 mL</td>
                      <td>20 mL</td>
                    </tr>
                    <tr>
                      <td>深CPB（3点注射 C2-C4）</td>
                      <td>0.5%ブピバカイン</td>
                      <td>各3〜5 mL（計9〜15 mL）</td>
                      <td>計20 mL</td>
                    </tr>
                    <tr>
                      <td>深CPB（単点注射 C4）</td>
                      <td>0.5%ロピバカイン</td>
                      <td>10〜15 mL</td>
                      <td>20 mL</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="alert a-warn">
                <div className="alert-i">⚠️</div>
                <div>
                  <strong>注意：</strong>
                  両側ブロックでは局所麻酔薬の総量が最大許容量を超えないよう必ず計算してください。ロピバカインの最大許容量は
                  <strong>3 mg/kg</strong>（体重60 kgの場合、0.5%ロピバカインで最大36 mL）です。
                </div>
              </div>

              <h2>13-3. デクスメデトミジン添加の証拠</h2>
              <div className="alert a-info">
                <div className="alert-i">📌</div>
                <div>
                  <strong>RCT（Cairo University 2022〜2024; NCT05814744）：</strong>中間CPB
                  にデクスメデトミジン0.5 μg/kg
                  を添加すると、鎮痛持続時間が延長し、術後オピオイド消費量が有意に減少することが示されています。ただし、
                  <strong>低血圧・徐脈</strong>に注意が必要です。
                </div>
              </div>
            </section>

            {/* ============ SECTION 14 ============ */}
            <section id="s14" className="sec">
              <div className="sec-hd">
                <div className="sec-num">14</div>
                <h1 className="sec-title">合併症と安全管理</h1>
              </div>

              <h2>14-1. 浅CPBの合併症プロファイル</h2>
              <p>浅CPB は一般的に安全性が高く、重篤な合併症はまれです。</p>
              <div className="tbl">
                <table>
                  <thead>
                    <tr>
                      <th>合併症</th>
                      <th>頻度</th>
                      <th>予防策</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>注入部位の疼痛・内出血</td>
                      <td>一般的</td>
                      <td>細針使用・圧迫止血</td>
                    </tr>
                    <tr>
                      <td>迷走神経反射（血管迷走神経性失神）</td>
                      <td>まれ</td>
                      <td>仰臥位で実施・経過観察</td>
                    </tr>
                    <tr>
                      <td>外頸静脈への誤穿刺</td>
                      <td>まれ</td>
                      <td>超音波ガイドで回避</td>
                    </tr>
                    <tr>
                      <td>局所麻酔薬全身毒性（LAST）</td>
                      <td>極めてまれ</td>
                      <td>逆吸引・分割投与・総量管理</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <h2>14-2. 深CPBの合併症プロファイル（特に注意が必要）</h2>
              <div className="mmd">
                <div className="mmd-lbl">フローチャート — 深CPB の合併症（頻度・重篤度順）</div>
                <MermaidDiagram
                  themeVariables={CPB_MERMAID_THEME}
                  chart={`flowchart TD
COMP["⚠️ 深CPBの合併症（頻度順）"]

COMP --> C1["🫁 横隔膜麻痺\\n（Phrenic Nerve Block）\\n頻度：深CPBで50〜80%\\n→ 中CPBでは低下、浅CPBではほぼなし\\n対側が正常であれば通常は問題なし"]
COMP --> C2["🗣️ 反回喉頭神経ブロック\\n（Hoarseness）\\n頻度：まれ〜中程度\\n→ 嗄声・嚥下困難（一過性）"]
COMP --> C3["😴 ホルネル症候群\\n（交感神経ブロック）\\n頻度：まれ\\n→ 縮瞳・眼瞼下垂・顔面無汗（一過性）"]
COMP --> C4["🩸 椎骨動脈内注入\\n（Vertebral Artery Injection）\\n頻度：まれ\\n→ 少量でも全身痙攣・意識消失\\n（椎骨動脈は脳に直接繋がるため）"]
COMP --> C5["💊 くも膜下腔誤注入\\n（Intrathecal Injection）\\n頻度：極めてまれ\\n→ 全脊髄麻酔・呼吸停止\\n【最重篤な合併症】"]
COMP --> C6["🩸 頸部血腫\\n（Hematoma）\\n頻度：まれ\\n→ 気道圧迫（致死的になりえる）"]

style C4 fill:#b71c1c,color:#fff
style C5 fill:#b71c1c,color:#fff
style C6 fill:#e65100,color:#fff`}
                />
              </div>

              <h2>14-3. 系統的レビューによる合併症比較（最重要データ）</h2>
              <div className="alert a-danger">
                <div className="alert-i">📌</div>
                <div>
                  <strong>Pandit et al. (2007, Br J Anaesth)</strong>{" "}
                  の系統的レビュー（69論文、7,558件の深/複合ブロック vs 2,533件の浅/中間ブロック）：
                  <strong>
                    深/複合ブロックは針関連の重篤な合併症率が浅/中間ブロックより有意に高い（OR 2.13,
                    p=0.006）
                  </strong>
                  。
                </div>
              </div>
              <div className="tbl">
                <table>
                  <thead>
                    <tr>
                      <th>比較項目</th>
                      <th>深/複合CPB</th>
                      <th>浅/中間CPB</th>
                      <th>p値</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>針関連重篤合併症</td>
                      <td>
                        <span className="tR">高い</span>
                      </td>
                      <td>
                        <span className="tG">低い</span>
                      </td>
                      <td>
                        <strong>p=0.006</strong>（OR 2.13）
                      </td>
                    </tr>
                    <tr>
                      <td>全身麻酔への変更率</td>
                      <td>低い（REAが良い）</td>
                      <td>同等</td>
                      <td>NS</td>
                    </tr>
                    <tr>
                      <td>術中合併症（脳梗塞・心筋梗塞・死亡）</td>
                      <td>有意差なし</td>
                      <td>有意差なし</td>
                      <td>NS</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <h2>14-4. LASTs（局所麻酔薬全身毒性）への対応</h2>
              <div className="mmd">
                <div className="mmd-lbl">
                  フローチャート — LAST 初期症状から脂肪乳剤療法までの対応
                </div>
                <MermaidDiagram
                  themeVariables={CPB_MERMAID_THEME}
                  chart={`flowchart TD
SIGN["⚠️ LASTs初期症状\\n耳鳴り・金属味・口唇しびれ\\n視覚障害・不安・興奮"]
SIGN --> STOP["1️⃣ 即座に注射を中止"]
STOP --> CALL["2️⃣ 応援を呼ぶ\\n救急チームへ連絡"]
CALL --> AIRWAY["3️⃣ 気道確保\\n100% O₂投与\\n必要時は気管挿管"]
AIRWAY --> SEIZURE{"痙攣の有無"}
SEIZURE -->|"あり"| BENZO["ベンゾジアゼピン静注\\nまたは\\nプロポフォール低用量"]
SEIZURE -->|"なし"| MONITOR["継続モニタリング"]
BENZO --> LIPID["4️⃣ 20%脂肪乳剤（Intralipid）\\n初回: 1.5 mL/kg iv（体重70 kgで約100 mL）\\n維持: 0.25 mL/kg/分 × 10分"]
MONITOR --> LIPID
LIPID --> CPR{"心停止？"}
CPR -->|"あり"| ALS["心肺蘇生（CPR）開始\\n脂肪乳剤継続"]
CPR -->|"なし"| OBSERVE["症状改善まで観察\\n30分以上"]

style SIGN fill:#e65100,color:#fff
style LIPID fill:#1565c0,color:#fff
style ALS fill:#b71c1c,color:#fff`}
                />
              </div>
            </section>

            {/* ============ SECTION 15 ============ */}
            <section id="s15" className="sec">
              <div className="sec-hd">
                <div className="sec-num">15</div>
                <h1 className="sec-title">臨床適応別エビデンスレビュー</h1>
              </div>

              <h2>15-1. 頸動脈内膜切除術（CEA）</h2>
              <p>
                CEA は CPB が最も古くから使用されてきた術式です。局所麻酔下の最大の利点は、
                <strong>覚醒下での脳神経学的モニタリング</strong>が可能な点です。
              </p>
              <div className="tbl">
                <table>
                  <thead>
                    <tr>
                      <th>研究</th>
                      <th>デザイン</th>
                      <th>主な結果</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <strong>GALAトライアル（Lancet 2008）</strong>
                      </td>
                      <td>多施設RCT（24カ国95施設、n=3,526）</td>
                      <td>
                        全身麻酔 vs 局所麻酔で30日脳卒中・心筋梗塞・死亡率に有意差なし。局所麻酔では
                        <strong>シャント使用率が有意に低下</strong>（14% vs 43%）
                      </td>
                    </tr>
                    <tr>
                      <td>Pandit et al. (2007, BJA)</td>
                      <td>SR（69論文、計10,091件）</td>
                      <td>深CPBは浅/中間CPBより針関連重篤合併症が高い（OR 2.13, p=0.006）</td>
                    </tr>
                    <tr>
                      <td>Turhan et al. (BMC Anesthesiol 2025)</td>
                      <td>RCT（中間 vs 深CPB for CEA）</td>
                      <td>中間CPBは深CPBと同等の麻酔効果を提供し、合併症が少ない</td>
                    </tr>
                    <tr>
                      <td>Jarvis et al. (BJA Educ 2023)</td>
                      <td>Review</td>
                      <td>中間CPBはCEA・甲状腺手術で深CPBの代替として推奨</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <h3>CEA におけるブロック選択の推奨</h3>
              <div className="mmd">
                <div className="mmd-lbl">フローチャート — CEA における局所麻酔ブロックの選択</div>
                <MermaidDiagram
                  themeVariables={CPB_MERMAID_THEME}
                  chart={`flowchart LR
CEA["頸動脈内膜切除術\\n（CEA）"]
CEA --> RA["局所麻酔を選択する場合\\n（覚醒下神経学的モニタリング目的）"]
RA --> CHOICE["推奨：浅CPB＋中間CPB\\n（BJA Educ 2023）\\nor 浅CPB＋深CPB（従来法）"]
CHOICE --> SUPPLE["術野への局所浸潤麻酔\\n（外科医による追加）\\nがしばしば必要"]

style CHOICE fill:#1565c0,color:#fff`}
                />
              </div>

              <h2>15-2. 甲状腺・副甲状腺手術</h2>
              <div className="tbl">
                <table>
                  <thead>
                    <tr>
                      <th>研究</th>
                      <th>デザイン</th>
                      <th>主な結果</th>
                      <th>グレード</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <strong>Mayhew et al. (BJA 2018)</strong>
                      </td>
                      <td>SR/MA</td>
                      <td>
                        両側浅CPBにより、術後モルヒネ消費量が有意に減少（加重平均差: -5.1 mg、95%CI:
                        -8.1〜-2.1）
                      </td>
                      <td>
                        <span className="bA">Grade A</span>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <strong>Wilson et al. (Indian J Anaesth 2023)</strong>
                      </td>
                      <td>SR/MA</td>
                      <td>両側浅CPBが甲状腺手術後の急性期痛を有意に軽減（VAS有意改善）</td>
                      <td>
                        <span className="bA">Grade A</span>
                      </td>
                    </tr>
                    <tr>
                      <td>Han et al. (J Pain Res 2022)</td>
                      <td>RCT</td>
                      <td>
                        中間CPBにより横隔膜麻痺が認められたが、高濃度ロピバカイン使用時にリスク増加（濃度依存性）
                      </td>
                      <td>
                        <span className="bB">Grade B</span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="alert a-ok">
                <div className="alert-i">✅</div>
                <div>
                  <strong>甲状腺手術での臨床的推奨：</strong>両側浅CPB または両側中間CPB
                  が推奨。術後オピオイド使用量削減・早期回復に有効。高リスク患者（高齢・呼吸機能低下）では浅CPB
                  が安全。
                </div>
              </div>

              <h2>15-3. 後頭下開頭術後慢性疼痛（2025年最新エビデンス）</h2>
              <div className="alert a-info">
                <div className="alert-i">📌</div>
                <div>
                  <strong>Anesthesiology 2025（多施設RCT, n=292）：</strong>
                  後頭下開頭術を受ける患者に術前超音波ガイド下浅CPB（0.5%ロピバカイン）を実施すると、
                  <strong>3カ月後の慢性術後疼痛の発生率がプラセボと比較して約1/3に減少</strong>
                  。急性期鎮痛効果は小さかったが、慢性疼痛予防効果が明確に示された。術前浅CPBによる
                  <strong>術後慢性疼痛の予防（Pre-emptive blockade）</strong>
                  を支持する初の大規模RCT証拠です。　<span className="bA">Grade A</span>
                  （2025年更新）
                </div>
              </div>

              <h2>15-4. 鎖骨手術</h2>
              <div className="tbl">
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
                      <td>Xu et al. (J Clin Monit Comput 2023)</td>
                      <td>RCT</td>
                      <td>
                        浅CPB＋鎖骨胸筋筋膜面ブロック vs
                        浅CPB＋斜角筋間ブロック：前者がより良好な鎮痛と上肢機能保持
                      </td>
                      <td>
                        <span className="bB">Grade B</span>
                      </td>
                    </tr>
                    <tr>
                      <td>Zhuo et al. (Anesth Analg 2022)</td>
                      <td>RCT</td>
                      <td>中間CPB＋鎖骨胸筋筋膜面ブロックが鎖骨骨幹骨折手術の麻酔として有効</td>
                      <td>
                        <span className="bB">Grade B</span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* ============ SECTION 16 ============ */}
            <section id="s16" className="sec">
              <div className="sec-hd">
                <div className="sec-num">16</div>
                <h1 className="sec-title">アウトカム評価指標</h1>
              </div>

              <h2>16-1. 推奨評価ツール</h2>
              <div className="tbl">
                <table>
                  <thead>
                    <tr>
                      <th>ツール</th>
                      <th>評価内容</th>
                      <th>評価タイミング</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <strong>VAS / NRS（0〜10）</strong>
                      </td>
                      <td>痛みの強度</td>
                      <td>注入前・注入30分後・術後2h・術後24h</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>ブロック成功の確認</strong>
                      </td>
                      <td>麻酔域内の感覚テスト（冷覚テスト等）</td>
                      <td>注入15〜30分後</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>横隔膜機能評価（深CPBの場合）</strong>
                      </td>
                      <td>超音波での横隔膜呼吸移動の確認</td>
                      <td>注入後15〜30分</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>HIT-6・MIDAS</strong>
                      </td>
                      <td>慢性頭痛評価（頸神経起源頭痛の場合）</td>
                      <td>3ヶ月後</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>術後オピオイド消費量</strong>
                      </td>
                      <td>鎮痛効果の客観的指標</td>
                      <td>術後24〜48時間</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>PGIC（患者全般印象変化）</strong>
                      </td>
                      <td>患者の主観的改善感（7点尺度）</td>
                      <td>術後4〜6週後</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <h2>16-2. ブロック成功の確認基準</h2>
              <div className="mmd">
                <div className="mmd-lbl">フローチャート — 浅CPB のブロック成功判定と追加注射</div>
                <MermaidDiagram
                  themeVariables={CPB_MERMAID_THEME}
                  chart={`flowchart LR
A["浅CPB実施\\n15〜30分後"]
A --> B{"4枝の麻酔域内\\n感覚テスト\\n（ピン・冷覚）"}
B -->|"麻酔域内：感覚消失"| C["✅ ブロック成功\\n手術開始可"]
B -->|"不十分な感覚消失"| D{"追加注射の\\n必要性評価"}
D -->|"追加可能"| E["追加2〜5 mL注入\\n（最大投与量の範囲内で）"]
D -->|"最大量到達"| F["外科医による\\n局所浸潤麻酔を追加\\nor 全身麻酔への切り替え検討"]

style C fill:#1b5e20,color:#fff
style F fill:#e65100,color:#fff`}
                />
              </div>
            </section>

            {/* ============ SECTION 17 ============ */}
            <section id="s17" className="sec">
              <div className="sec-hd">
                <div className="sec-num">17</div>
                <h1 className="sec-title">参考文献・公式リソース</h1>
              </div>

              <h2>17-1. 主要な一次文献</h2>
              <div className="src-grid">
                <div className="src">
                  <div className="src-org">StatPearls Publishing</div>
                  <div className="src-t">
                    Hipskind JE et al. (2024) — Cervical Plexus Block（Updated Mar 2024）
                  </div>
                  <div className="src-url">
                    <Ext href="https://www.ncbi.nlm.nih.gov/books/NBK557382/">
                      ncbi.nlm.nih.gov/books/NBK557382/
                    </Ext>
                  </div>
                </div>
                <div className="src">
                  <div className="src-org">Korean J Anesthesiol</div>
                  <div className="src-t">
                    Kim JS et al. (2018) — Cervical plexus block（71(4):274-288）
                  </div>
                  <div className="src-url">
                    <Ext href="https://pmc.ncbi.nlm.nih.gov/articles/PMC6078883/">
                      pmc.ncbi.nlm.nih.gov/articles/PMC6078883/
                    </Ext>
                  </div>
                </div>
                <div className="src">
                  <div className="src-org">Br J Anaesth</div>
                  <div className="src-t">
                    Pandit JJ et al. (2007) — Superficial or deep CPB for CEA: a systematic review
                    of complications（BJA 99:159-169）
                  </div>
                  <div className="src-url">
                    <Ext href="https://pubmed.ncbi.nlm.nih.gov/17576970/">
                      pubmed.ncbi.nlm.nih.gov/17576970/
                    </Ext>
                  </div>
                </div>
                <div className="src">
                  <div className="src-org">The Lancet</div>
                  <div className="src-t">
                    GALA Collaborative (2008) — GA vs LA for carotid surgery (GALA): multicentre
                    RCT（Lancet 372:2132-42）
                  </div>
                  <div className="src-url">
                    <Ext href="https://www.thelancet.com/journals/lancet/article/PIIS0140-6736(08)61699-2/abstract">
                      thelancet.com/.../PIIS0140-6736(08)61699-2/abstract
                    </Ext>
                  </div>
                </div>
                <div className="src">
                  <div className="src-org">Br J Anaesth</div>
                  <div className="src-t">
                    Mayhew D et al. (2018) — Analgesic efficacy of bilateral superficial CPB for
                    thyroid surgery: MA/SR（BJA 120:241-251）
                  </div>
                  <div className="src-url">
                    <Ext href="https://www.bjanaesthesia.org/article/S0007-0912(17)54053-1/fulltext">
                      bjanaesthesia.org/article/S0007-0912(17)54053-1/fulltext
                    </Ext>
                  </div>
                </div>
                <div className="src">
                  <div className="src-org">Indian J Anaesth</div>
                  <div className="src-t">
                    Wilson L et al. (2023) — Analgesic effects of bilateral superficial CPB in
                    thyroid surgery: SR/MA（67:579-89）
                  </div>
                  <div className="src-url">
                    <Ext href="https://pmc.ncbi.nlm.nih.gov/articles/PMC10436725/">
                      pmc.ncbi.nlm.nih.gov/articles/PMC10436725/
                    </Ext>
                  </div>
                </div>
                <div className="src">
                  <div className="src-org">BJA Education</div>
                  <div className="src-t">Jarvis T et al. (2023) — The cervical plexus</div>
                  <div className="src-url">
                    <Ext href="https://www.bjaed.org/article/S2058-5349(22)00151-2/fulltext">
                      bjaed.org/article/S2058-5349(22)00151-2/fulltext
                    </Ext>
                  </div>
                </div>
                <div className="src">
                  <div className="src-org">BMC Anesthesiol</div>
                  <div className="src-t">
                    Turhan Ö et al. (2025) — US-guided intermediate vs deep CPB for CEA:
                    RCT（25:581）
                  </div>
                  <div className="src-url">
                    <Ext href="https://link.springer.com/article/10.1186/s12871-024-02674-8">
                      link.springer.com/article/10.1186/s12871-024-02674-8
                    </Ext>
                  </div>
                </div>
              </div>

              <h2>17-2. 国際ガイドライン・標準テキスト</h2>
              <div className="tbl">
                <table>
                  <thead>
                    <tr>
                      <th>機関・資料</th>
                      <th>内容</th>
                      <th>URL</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <strong>NYSORA</strong>
                      </td>
                      <td>頚神経叢ブロック：ランドマーク法（詳細手技）</td>
                      <td>
                        <Ext href="https://www.nysora.com/techniques/head-and-neck-blocks/cervical/cervical-plexus-block/">
                          nysora.com — cervical-plexus-block
                        </Ext>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <strong>NYSORA</strong>
                      </td>
                      <td>超音波ガイド下頚神経叢ブロック</td>
                      <td>
                        <Ext href="https://www.nysora.com/techniques/head-and-neck-blocks/cervical/ultrasound-guided-cervical-plexus-block/">
                          nysora.com — ultrasound-guided-cervical-plexus-block
                        </Ext>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <strong>ACEP</strong>
                      </td>
                      <td>Ultrasound-Guided Superficial Cervical Plexus Block</td>
                      <td>
                        <Ext href="https://www.acep.org/emultrasound/newsroom/september-2022/ultrasound-guided-superficial-cervical-plexus-block">
                          acep.org — US-Guided Superficial CPB
                        </Ext>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <strong>日本区域麻酔学会</strong>
                      </td>
                      <td>ブロック用語推薦リスト</td>
                      <td>
                        <Ext href="https://www.regional-anesth.jp/education/terminology.html">
                          regional-anesth.jp/education/terminology.html
                        </Ext>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <strong>日本ペインクリニック学会</strong>
                      </td>
                      <td>ペインクリニック治療指針（神経ブロック総論）</td>
                      <td>
                        <Ext href="https://www.jspc.gr.jp/Contents/public/pdf/shishin/6-7.pdf">
                          jspc.gr.jp — 治療指針 6-7.pdf
                        </Ext>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <strong>PubMed</strong>
                      </td>
                      <td>頚神経叢ブロック RCT・メタ解析検索</td>
                      <td>
                        <Ext href="https://pubmed.ncbi.nlm.nih.gov/?term=cervical+plexus+block&filter=pubt.clinicaltrial">
                          pubmed — cervical plexus block (clinicaltrial)
                        </Ext>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <strong>ClinicalTrials.gov</strong>
                      </td>
                      <td>進行中・完了試験の確認</td>
                      <td>
                        <Ext href="https://clinicaltrials.gov/search?cond=cervical+plexus+block">
                          clinicaltrials.gov — cervical plexus block
                        </Ext>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* ============ SECTION 18 (SUMMARY) ============ */}
            <section id="s18" className="sec">
              <div className="sec-hd">
                <div className="sec-num">★</div>
                <h1 className="sec-title">まとめ — 初学者が押さえるべき10のポイント</h1>
              </div>

              <div className="cpb-key-grid">
                <div className="cpb-key">
                  <div className="cpb-key-n">1</div>
                  <div className="cpb-key-tx">
                    CPB には浅・中間・深の<strong>3層</strong>
                    がある。それぞれが異なる筋膜層を標的にしており、効果と合併症リスクが異なる。
                  </div>
                </div>
                <div className="cpb-key">
                  <div className="cpb-key-n">2</div>
                  <div className="cpb-key-tx">
                    浅枝4本（小後頭・大耳介・頸横・鎖骨上神経）は<strong>SCM後縁中点付近</strong>
                    から一斉に皮下に出現する。
                  </div>
                </div>
                <div className="cpb-key">
                  <div className="cpb-key-n">3</div>
                  <div className="cpb-key-tx">
                    <strong>浅CPBが最もシンプルで安全</strong>
                    。多くの表在頸部手術・甲状腺手術に十分な鎮痛を提供できる。
                  </div>
                </div>
                <div className="cpb-key">
                  <div className="cpb-key-n">4</div>
                  <div className="cpb-key-tx">
                    <strong>中間CPBは深CPBの代替</strong>として多くの場面で有効（BJA Education
                    2023）。合併症リスクが深CPBより低い。
                  </div>
                </div>
                <div className="cpb-key">
                  <div className="cpb-key-n">5</div>
                  <div className="cpb-key-tx">
                    <strong>深CPBは針関連重篤合併症リスクが浅/中間CPBの2倍以上</strong>（OR 2.13,
                    Pandit 2007）。必ず超音波ガイド下で実施。
                  </div>
                </div>
                <div className="cpb-key">
                  <div className="cpb-key-n">6</div>
                  <div className="cpb-key-tx">
                    <strong>逆吸引（Aspiration test）は毎回必須</strong>
                    。特に深CPBでは椎骨動脈・くも膜下腔への誤注入リスクがある。
                  </div>
                </div>
                <div className="cpb-key">
                  <div className="cpb-key-n">7</div>
                  <div className="cpb-key-tx">
                    <strong>局所麻酔薬の総量管理</strong>
                    は両側ブロック時に特に重要。最大許容量（ロピバカイン: 3
                    mg/kg）を計算してから実施。
                  </div>
                </div>
                <div className="cpb-key">
                  <div className="cpb-key-n">8</div>
                  <div className="cpb-key-tx">
                    GALAトライアルが示すように、
                    <strong>CEAにおける局所麻酔 vs 全身麻酔の30日アウトカムに有意差はない</strong>
                    。ただし局所麻酔ではシャント使用率が低下する。
                  </div>
                </div>
                <div className="cpb-key">
                  <div className="cpb-key-n">9</div>
                  <div className="cpb-key-tx">
                    術前の浅CPBは<strong>後頭下開頭術後の慢性疼痛を1/3に減少</strong>
                    させる（Anesthesiology RCT 2025）。術後慢性疼痛予防への応用が期待される。
                  </div>
                </div>
                <div className="cpb-key">
                  <div className="cpb-key-n">10</div>
                  <div className="cpb-key-tx">
                    CPBは全身麻酔の<strong>代替ではなく補完</strong>
                    （多モーダル鎮痛の一部）。必要時の全身麻酔への切り替え準備を常に整えておく。
                  </div>
                </div>
              </div>

              <div className="alert a-purple">
                <div className="alert-i">📋</div>
                <div>
                  <strong>最終的な学術的免責事項：</strong>本資料のすべての情報は
                  <strong>学術・教育・研究目的のみ</strong>
                  を対象としています。頚神経叢ブロックは侵襲的手技であり、適切な医学的トレーニング・設備・緊急対応体制なしに実施することは禁止されています。すべての臨床判断は、有資格医師による個別患者評価のもとで行われなければなりません。
                </div>
              </div>
            </section>
          </AutoGlossary>
        </main>
      </div>
      {/* end layout */}

      {/* FOOTER */}
      <div className="footer">
        <strong>浅・深頚神経叢ブロック（CPB）完全ガイド</strong> — 国際エビデンス（StatPearls
        2024・Korean J Anesthesiol 2018・BJA Education 2023・GALA Trial Lancet 2008・Pandit BJA
        2007）に基づく学術資料
        <br />📅 最終更新: 2025年6月版を反映 | 次回レビュー推奨: 主要RCT・ガイドライン改訂時
        <br />
        ⚠️
        本資料は学術・教育・研究目的のみを対象としています。臨床への適用は必ず資格を持つ医療専門家の監督のもとで行ってください。
      </div>
    </div>
  );
}
