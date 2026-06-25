import "./occipital-nerve-block.css";
import { OnbSidebar } from "@/components/blocks/OnbSidebar";
import { Ext } from "@/components/Ext";
import MermaidDiagram from "@/components/MermaidDiagram";

const ONB_MERMAID_THEME: Record<string, string> = {
  primaryColor: "#e0f2f1",
  primaryTextColor: "#00363a",
  primaryBorderColor: "#0097a7",
  lineColor: "#546e7a",
  secondaryColor: "#e0f2f1",
  tertiaryColor: "#e8f5e9",
  edgeLabelBackground: "#ffffff",
  fontSize: "13px",
};

export default function OccipitalNerveBlockPage() {
  return (
    <div className="occipital-accent">
      {/* HERO */}
      <div className="hero">
        <div style={{ fontSize: 34 }}>🧠</div>
        <h1>後頭神経ブロック（Occipital Nerve Block: ONB）完全ガイド</h1>
        <p className="hero-sub">
          国際エビデンス（ICHD-3 / AAN / IHS / StatPearls 2025）に基づく包括的解説 —
          初学者向けステップバイステップ
        </p>
        <div className="hero-tags">
          <span className="hero-tag">大後頭神経（GON / C2）</span>
          <span className="hero-tag">三叉頸椎複合体（TCC）</span>
          <span className="hero-tag">ICHD-3 13.1 後頭神経痛</span>
          <span className="hero-tag">エコーガイド下法</span>
          <span className="hero-tag">SNOOP4 安全管理</span>
        </div>
      </div>

      {/* DISCLAIMER */}
      <div className="disclaimer">
        <strong>⚠️ Academic Disclaimer（学術免責事項）</strong>　本資料は
        <strong>学術・教育・研究目的のみ</strong>
        を対象としています。後頭神経ブロックは
        <strong>侵襲的手技</strong>
        であり、適切なトレーニング・設備・緊急対応体制を備えた医療専門家のみが実施できます。本資料は個人への医療アドバイス・診断・処方を提供するものではありません。実際の手技は必ず有資格医師の判断のもとで行ってください。
      </div>

      {/* LAYOUT */}
      <div className="layout">
        <OnbSidebar />

        {/* MAIN CONTENT */}
        <main className="main">
          {/* ============================================================ SECTION 1 */}
          <section id="s1" className="sec">
            <div className="sec-hd">
              <div className="sec-num">1</div>
              <h1 className="sec-title">後頭神経ブロックとは — 基礎概念</h1>
            </div>

            <p>
              <strong>後頭神経ブロック（Occipital Nerve Block; ONB）</strong>
              は、後頭部に分布する神経（主に<strong>大後頭神経 GON</strong>
              ）の周囲に局所麻酔薬やステロイドを注入することで、後頭部を起源とする様々な頭痛を治療する手技です。
            </p>

            <div className="alert a-purple">
              <div className="alert-i">💡</div>
              <div>
                <strong>なぜ効くのか（一言で）：</strong>頸部の神経と頭部の神経（三叉神経）が
                <strong>脳幹レベルで収束</strong>
                しているため。後頭神経の痛みシグナルを遮断することで、三叉神経系の痛みまで抑制できます（詳細は
                §3）。
              </div>
            </div>

            <h2>GON ブロックの双対的役割</h2>
            <div className="onb-role-grid">
              <div className="onb-role">
                <div className="onb-role-t">🔍 診断的役割</div>
                <div className="onb-role-d">
                  局所麻酔薬の注入後に頭痛が消失 → <strong>後頭神経起源の頭痛</strong>
                  と確認できる。後頭神経痛（ICHD-3 13.1）の診断基準にも含まれる。
                </div>
              </div>
              <div className="onb-role">
                <div className="onb-role-t">💉 治療的役割</div>
                <div className="onb-role-d">
                  急性発作の緩和・予防的抑制の<strong>双方</strong>
                  に使用できる。繰り返し施行による予防的ブロックも可能。
                </div>
              </div>
            </div>

            <h2>効果の持続時間 — 「麻酔」を超える鎮痛</h2>
            <div className="alert a-info">
              <div className="alert-i">⏳</div>
              <div>
                局所麻酔薬の効果（数時間）よりも<strong>はるかに長い</strong>
                鎮痛効果（数週間〜数ヶ月）が得られることがあります。これは末梢から中枢への
                <strong>「中枢感作の抑制」</strong>が起きているためと考えられています（§3 で詳述）。
              </div>
            </div>
          </section>

          {/* ============================================================ SECTION 2 */}
          <section id="s2" className="sec">
            <div className="sec-hd">
              <div className="sec-num">2</div>
              <h1 className="sec-title">解剖学 — 後頭部の神経構造</h1>
            </div>

            <p>
              後頭部には3つの神経が分布しており、それぞれが異なる部位を支配しています。ブロックの主標的は
              <strong>大後頭神経（GON）</strong>です。
            </p>

            <h2>後頭部の3神経</h2>
            <div className="tbl">
              <table>
                <thead>
                  <tr>
                    <th>神経名</th>
                    <th>英語名</th>
                    <th>起源</th>
                    <th>支配領域</th>
                    <th>ブロックの主対象</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <strong>大後頭神経</strong>
                    </td>
                    <td>Greater Occipital Nerve (GON)</td>
                    <td>C2後枝（背側一次枝）の感覚枝</td>
                    <td>後頭部の大部分〜頭頂部</td>
                    <td>
                      <span className="tG">✅ 最重要（主標的）</span>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <strong>小後頭神経</strong>
                    </td>
                    <td>Lesser Occipital Nerve (LON)</td>
                    <td>C2/C3腹側一次枝</td>
                    <td>後頭部外側〜耳介後部</td>
                    <td>⚪ 補助的に使用</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>第三後頭神経</strong>
                    </td>
                    <td>Third Occipital Nerve (TON)</td>
                    <td>C3後枝の表在内側枝</td>
                    <td>上頸部〜後頭骨隆起下方</td>
                    <td>⚪ 頸原性頭痛に重要</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h2>大後頭神経（GON）の走行 — ステップごとに理解する</h2>
            <div className="mmd">
              <div className="mmd-lbl">フローチャート — GON の起源から皮下出現までの走行</div>
              <MermaidDiagram
                themeVariables={ONB_MERMAID_THEME}
                chart={`flowchart LR
A["🔵 C2脊髄神経\\n（後根神経節）\\n起源"]
B["下斜筋\\nと半棘筋頸部の間を\\n上行（筋間走行）"]
C["半棘筋頸部を\\n貫通\\n（筋貫通点 ← 絞扼リスク）"]
D["僧帽筋の腱膜下を\\n内側から外側へ走行"]
E["後頭動脈の\\n内側に位置\\n（上項線レベル）"]
F["🔴 皮下に出現\\n後頭部皮膚を\\n広く支配\\n（頭頂部まで）"]

A --> B --> C --> D --> E --> F

style A fill:#1565c0,color:#fff
style C fill:#e65100,color:#fff
style F fill:#2e7d32,color:#fff`}
              />
            </div>

            <div className="alert a-warn">
              <div className="alert-i">⚠️</div>
              <div>
                <strong>絞扼点（Entrapment Sites）：</strong>GON は
                <strong>下斜筋・半棘筋・僧帽筋</strong>
                の3箇所で物理的に絞扼されやすい。これが後頭神経痛の原因となります。
              </div>
            </div>

            <h2>体表ランドマークとブロック注入点の関係</h2>
            <div className="tbl">
              <table>
                <thead>
                  <tr>
                    <th>ランドマーク</th>
                    <th>説明</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <strong>後頭骨隆起（EOP）</strong>
                    </td>
                    <td>後頭部正中の骨の突起（「イニオン」とも呼ばれる）。触れてわかる。</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>乳様突起（Mastoid Process）</strong>
                    </td>
                    <td>耳の後方にある骨の突起。</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="onb-role-grid">
              <div className="onb-role">
                <div className="onb-role-t">📍 GON 注入点</div>
                <div className="onb-role-d">
                  EOP〜乳様突起を結ぶ線上の<strong>内側2/3</strong>
                  （EOPから約1/3）。<strong>後頭動脈の拍動の内側</strong>。上項線レベル。目安は EOP
                  から
                  <strong>約2cm外側・2cm下方</strong>。
                </div>
              </div>
              <div className="onb-role">
                <div className="onb-role-t">📍 LON 注入点</div>
                <div className="onb-role-d">
                  EOP〜乳様突起を結ぶ線上の<strong>外側1/3</strong>（乳様突起寄り）。
                </div>
              </div>
            </div>

            <div className="alert a-info">
              <div className="alert-i">🔗</div>
              <div>
                <strong>次セクションへの橋渡し：</strong>GON は C2 レベルで
                <strong>三叉頸椎複合体（TCC）</strong>に入り、三叉神経第1枝（V1）からの求心性線維と
                <strong>同一の2次ニューロンに収束</strong>します。これが GON
                ブロックが片頭痛・群発頭痛にも効く解剖学的根拠です。
              </div>
            </div>
          </section>

          {/* ============================================================ SECTION 3 */}
          <section id="s3" className="sec">
            <div className="sec-hd">
              <div className="sec-num">3</div>
              <h1 className="sec-title">作用機序 — 三叉頸椎複合体（TCC）</h1>
            </div>

            <p>
              GON
              ブロックの効果が局所麻酔薬の作用時間を超えて持続するのは、単なる神経の「麻酔」ではなく、
              <strong>中枢レベルの痛覚調節</strong>が起きているためと考えられています。
            </p>

            <h2>三叉頸椎複合体（Trigeminocervical Complex, TCC）とは</h2>
            <div className="mmd">
              <div className="mmd-lbl">
                フローチャート — TCC における三叉神経系と後頭神経系の収束
              </div>
              <MermaidDiagram
                themeVariables={ONB_MERMAID_THEME}
                chart={`flowchart TD
A["🔴 三叉神経（V1: 眼枝）\\n硬膜・前頭部・眼窩周囲の\\n痛みシグナル"]
B["🔵 大後頭神経（GON/C2）\\n後頭部・頸部の\\n痛みシグナル"]
C["三叉頸椎複合体（TCC）\\nTrigeminal nucleus caudalis\\n+ 上位頸髄（C1〜C3）\\n両者が同一の2次ニューロンに収束"]
D["視床\\nThalamus\\n痛みシグナルの中継・増幅"]
E["大脳皮質\\n（一次感覚野・島皮質）\\n痛みの「知覚」・情動反応"]
F["🟢 GONブロックによる\\n求心性シグナル遮断\\n↓\\n三叉神経系の痛覚伝達も\\n同時に抑制（中枢調節）"]

A --> C
B --> C
C --> D
D --> E
F -. "C2レベルで\\n侵害信号を遮断" .-> C

style A fill:#b71c1c,color:#fff
style B fill:#1565c0,color:#fff
style C fill:#4a148c,color:#fff
style F fill:#1b5e20,color:#fff`}
              />
            </div>

            <h2>作用機序の仮説（現在の理解）— 4ステップ</h2>
            <div className="phase-grid">
              <div className="ph ph2">
                <div className="ph-icon">①</div>
                <div className="ph-title">求心性シグナル遮断</div>
                <div className="ph-time">即時</div>
                <div className="ph-desc">
                  局所麻酔薬が GON に作用し、後頭部から C2
                  経由で脊髄へ向かう痛みの求心性シグナルを一時的に遮断。
                </div>
              </div>
              <div className="ph ph1">
                <div className="ph-icon">②</div>
                <div className="ph-title">中枢感作の抑制</div>
                <div className="ph-time">持続的</div>
                <div className="ph-desc">
                  TCC
                  における三叉神経痛覚ニューロンの興奮性が低下。麻酔が消えた後も続く鎮痛の主要メカニズム。
                </div>
              </div>
              <div className="ph ph4">
                <div className="ph-icon">③</div>
                <div className="ph-title">下行性抑制系の賦活</div>
                <div className="ph-time">持続的</div>
                <div className="ph-desc">
                  中脳水道周囲灰白質（PAG）からの下行性抑制系が賦活され、脳幹で痛みの「ゲート」が閉じる。
                </div>
              </div>
              <div className="ph ph3">
                <div className="ph-icon">④</div>
                <div className="ph-title">神経炎症の鎮静</div>
                <div className="ph-time">長期</div>
                <div className="ph-desc">
                  ステロイド併用時、GON
                  周囲の神経炎症（浮腫・炎症性メディエーター）が抑制され、より長期の効果。
                </div>
              </div>
            </div>

            <div className="alert a-info">
              <div className="alert-i">📌</div>
              <div>
                <strong>根拠：</strong>Hoffmann J et al. GON block modulates nociceptive signals
                within the trigeminocervical complex. <em>J Neurol Neurosurg Psychiatry</em>, 2021.
                doi:
                <Ext href="https://jnnp.bmj.com/content/92/10/1046">10.1136/jnnp-2021-326433</Ext>
              </div>
            </div>
          </section>

          {/* ============================================================ SECTION 4 */}
          <section id="s4" className="sec">
            <div className="sec-hd">
              <div className="sec-num">4</div>
              <h1 className="sec-title">SNOOP4 レッドフラグスクリーニング</h1>
            </div>

            <div className="alert a-danger">
              <div className="alert-i">🚨</div>
              <div>
                <strong>最重要原則：</strong>GON ブロックはあくまで<strong>一次性頭痛</strong>
                に対する治療です。二次性頭痛（脳腫瘍・くも膜下出血・髄膜炎など）を見逃してはなりません。
                <strong>すべての患者で手技実施前に SNOOP4 を確認</strong>してください。
              </div>
            </div>

            <h2>SNOOP4 — 6つの危険サイン</h2>
            <div className="snoop-grid">
              <div className="sn">
                <div className="sn-letter">S</div>
                <div className="sn-title">Systemic（全身症状）</div>
                <div className="sn-symp">
                  発熱・項部硬直（髄膜炎）、体重減少（悪性腫瘍）、免疫不全・既知の悪性腫瘍
                </div>
                <div className="sn-dx">画像・髄液検査を検討</div>
              </div>
              <div className="sn">
                <div className="sn-letter">N</div>
                <div className="sn-title">Neurological（神経学的欠損）</div>
                <div className="sn-symp">片麻痺・感覚障害・失語、複視・意識障害</div>
                <div className="sn-dx">緊急画像診断</div>
              </div>
              <div className="sn">
                <div className="sn-letter">O</div>
                <div className="sn-title">Onset sudden（突発性発症）</div>
                <div className="sn-symp">「生涯最悪の頭痛」・雷鳴頭痛 → SAH 除外必須</div>
                <div className="sn-dx">CT / 髄液で SAH 除外</div>
              </div>
              <div className="sn">
                <div className="sn-letter">O</div>
                <div className="sn-title">Onset after age 50（50歳以降）</div>
                <div className="sn-symp">新規発症 → 側頭動脈炎・頭蓋内病変</div>
                <div className="sn-dx">CRP/ESR・画像</div>
              </div>
              <div className="sn">
                <div className="sn-letter">P</div>
                <div className="sn-title">Pattern change（パターン変化）</div>
                <div className="sn-symp">
                  進行性増悪、体位性変化（仰臥位悪化 → ICP↑）、外傷後新規発症
                </div>
                <div className="sn-dx">緊急画像診断</div>
              </div>
              <div className="sn">
                <div className="sn-letter">4</div>
                <div className="sn-title">4つの追加フラグ</div>
                <div className="sn-symp">乳頭浮腫・硬膜穿刺後・けいれん後・妊娠/産後</div>
                <div className="sn-dx">個別に精査</div>
              </div>
            </div>

            <h2>SNOOP4 判定フロー</h2>
            <div className="mmd">
              <div className="mmd-lbl">フローチャート — SNOOP4 による二次性頭痛スクリーニング</div>
              <MermaidDiagram
                themeVariables={ONB_MERMAID_THEME}
                chart={`flowchart TD
START(["🩺 後頭神経ブロック\\n候補患者の評価"]) --> S

S{"S — Systemic 全身症状\\n・発熱・項部硬直（髄膜炎）\\n・体重減少（悪性腫瘍）\\n・免疫不全・既知の悪性腫瘍"}
S -->|"該当あり"| RED["🚨 緊急対応 STOP\\n▶ 画像診断（CT/MRI）\\n▶ 髄液検査を検討\\n▶ 専門科コンサルト\\n▶ ONBは実施しない"]
S -->|"なし"| N

N{"N — Neurological Deficits\\n神経学的欠損\\n・片麻痺・感覚障害・失語\\n・複視・意識障害"}
N -->|"該当あり"| RED
N -->|"なし"| O1

O1{"O — Onset sudden\\n突発性発症\\n'生涯最悪の頭痛'\\n雷鳴頭痛 → SAH除外必須"}
O1 -->|"該当あり"| RED
O1 -->|"なし"| O2

O2{"O — Onset after age 50\\n50歳以降の新規発症\\n→ 側頭動脈炎・頭蓋内病変"}
O2 -->|"該当あり"| URGENT["⚡ 緊急画像診断\\n（24時間以内）\\nCRP/ESR採血も考慮\\nONB延期"]
O2 -->|"なし"| P

P{"P — Pattern change\\nパターン変化\\n・進行性増悪\\n・体位性変化（仰臥位悪化 → ICP↑）\\n・外傷後新規発症"}
P -->|"該当あり"| URGENT
P -->|"なし"| FOUR

FOUR{"4 — 乳頭浮腫\\n硬膜穿刺後\\nけいれん後\\n妊娠/産後"}
FOUR -->|"該当あり"| URGENT
FOUR -->|"なし"| CLEAR["✅ SNOOP4 クリア\\nONB 実施を検討可\\n→ 患者選択基準へ"]

style RED fill:#b71c1c,color:#ffffff,font-weight:bold
style URGENT fill:#e65100,color:#ffffff
style CLEAR fill:#1b5e20,color:#ffffff
style START fill:#1565c0,color:#fff`}
              />
            </div>

            <div className="alert a-warn">
              <div className="alert-i">🤰</div>
              <div>
                <strong>産後・妊娠中の注意：</strong>硬膜穿刺後頭痛（PDPH）は ONB
                が有効な特殊状況のひとつ（FOUR フラグ）です。ただし「産後」に該当する場合でも、
                <strong>脳静脈洞血栓症（CVST）を除外</strong>したうえで ONB を検討します。
              </div>
            </div>
          </section>

          {/* ============================================================ SECTION 5 */}
          <section id="s5" className="sec">
            <div className="sec-hd">
              <div className="sec-num">5</div>
              <h1 className="sec-title">ICHD-3 適応疾患</h1>
            </div>

            <p>
              GON ブロックが有効とされる主要な頭痛疾患と、対応する ICHD-3 コードを以下に示します。
            </p>

            <div className="tbl">
              <table>
                <thead>
                  <tr>
                    <th>ICHD-3</th>
                    <th>疾患名</th>
                    <th>GONブロックの位置づけ</th>
                    <th>エビデンスグレード</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <strong>13.1</strong>
                    </td>
                    <td>
                      <strong>後頭神経痛</strong>
                    </td>
                    <td>✅ 第一選択・診断的ブロック</td>
                    <td>
                      <span className="bA">Grade A/B</span> ガイドライン推奨
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <strong>1.1 / 1.2</strong>
                    </td>
                    <td>前兆あり/なし片頭痛（急性期）</td>
                    <td>✅ 急性期・難治性発作に</td>
                    <td>
                      <span className="bB">Grade B</span> AAN/VA-DoD 2024
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <strong>1.3</strong>
                    </td>
                    <td>慢性片頭痛（≥15日/月）</td>
                    <td>✅ 予防的ブロック（反復施行）</td>
                    <td>
                      <span className="bB">Grade B</span> メタ解析支持
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <strong>3.1 / 3.2</strong>
                    </td>
                    <td>エピソード性/慢性群発頭痛</td>
                    <td>✅ 移行療法・救済療法として</td>
                    <td>
                      <span className="bB">Grade B</span> 2 RCT 支持
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <strong>11.2</strong>
                    </td>
                    <td>頸原性頭痛</td>
                    <td>✅ 第三後頭神経ブロックも考慮</td>
                    <td>
                      <span className="bB">Grade B</span> 1 RCT
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <strong>7.2.1</strong>
                    </td>
                    <td>硬膜穿刺後頭痛（PDPH）</td>
                    <td>✅ ブラッドパッチへの橋渡し</td>
                    <td>
                      <span className="bC">Grade C</span> 症例・観察研究
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <strong>1.3（重積）</strong>
                    </td>
                    <td>片頭痛重積（Status Migrainosus）</td>
                    <td>⚪ 補助的使用（ER設定）</td>
                    <td>
                      <span className="bC">Grade C</span>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <strong>13.x</strong>
                    </td>
                    <td>後頭神経絞扼症候群</td>
                    <td>✅ 診断・治療的ブロック</td>
                    <td>
                      <span className="bU">Expert Opinion</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="alert a-info">
              <div className="alert-i">📌</div>
              <div>
                <strong>ソース：</strong>
                <Ext href="https://ichd-3.org/">ICHD-3 公式サイト</Ext> ｜{" "}
                <Ext href="https://www.nursingcenter.com/getattachment/clinical-resources/Guideline-Summaries/Headache/Guideline-Summary_Headache_August-2024.pdf.aspx">
                  VA/DoD 頭痛ガイドライン 2024
                </Ext>
              </div>
            </div>
          </section>

          {/* ============================================================ SECTION 6 */}
          <section id="s6" className="sec">
            <div className="sec-hd">
              <div className="sec-num">6</div>
              <h1 className="sec-title">患者選択基準と禁忌</h1>
            </div>

            <h2>ONB が特に有効な患者プロファイル</h2>
            <div className="tbl">
              <table>
                <thead>
                  <tr>
                    <th>特徴</th>
                    <th>臨床的意義</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <strong>GON圧迫点で再現性のある圧痛</strong>
                    </td>
                    <td>診断的意義が高く、ブロック反応の最良の予測因子</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>頭皮の異痛症（Allodynia）</strong>
                    </td>
                    <td>中枢感作の存在を示し、末梢遮断が有効な場合が多い</td>
                  </tr>
                  <tr>
                    <td>後頭部〜頭頂部の放散痛</td>
                    <td>GON 支配領域に一致した症状</td>
                  </tr>
                  <tr>
                    <td>他の治療が無効・禁忌</td>
                    <td>妊婦・高齢者など薬物療法に制限がある場合</td>
                  </tr>
                  <tr>
                    <td>片頭痛の急性期・重積状態</td>
                    <td>ER/外来での迅速な介入として</td>
                  </tr>
                  <tr>
                    <td>群発頭痛の発作期</td>
                    <td>予防薬が効果発現するまでの「橋渡し療法」</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h2>患者選択フローチャート</h2>
            <div className="mmd">
              <div className="mmd-lbl">
                フローチャート — SNOOP4 → 適応 → 禁忌確認 → 同意取得の流れ
              </div>
              <MermaidDiagram
                themeVariables={ONB_MERMAID_THEME}
                chart={`flowchart TD
A["頭痛患者\\n後頭神経ブロック候補？"] --> B{"SNOOP4クリア？\\n（Section 4参照）"}
B -->|"❌ フラグあり"| STOP["ONB 実施しない\\n二次性頭痛を除外"]
B -->|"✅ クリア"| C{"ICHD-3 適応疾患\\nに該当するか？"}
C -->|"なし"| D["他の診断を検討\\nまたは専門医紹介"]
C -->|"あり"| E{"絶対禁忌の\\n確認"}

E -->|"あり"| STOP2["ONB 禁忌\\n代替療法を選択"]
E -->|"なし"| F{"相対禁忌の\\n確認と評価"}
F -->|"リスクが高い"| G["リスク・ベネフィット\\n慎重に評価\\n患者と相談"]
F -->|"リスク許容範囲"| H["✅ インフォームド\\nコンセント取得\\n→ 手技へ"]
G -->|"同意"| H
G -->|"非同意"| D

style STOP fill:#b71c1c,color:#fff
style STOP2 fill:#b71c1c,color:#fff
style H fill:#1b5e20,color:#fff`}
              />
            </div>

            <h2>禁忌一覧</h2>
            <h3>絶対禁忌（Absolute Contraindications）</h3>
            <div className="tbl">
              <table className="th-red">
                <thead>
                  <tr>
                    <th>禁忌</th>
                    <th>理由</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>患者の拒否</td>
                    <td>インフォームドコンセントなしに手技は行えない</td>
                  </tr>
                  <tr>
                    <td>局所麻酔薬へのアレルギー</td>
                    <td>アナフィラキシーリスク</td>
                  </tr>
                  <tr>
                    <td>注入部位の感染・皮膚病変</td>
                    <td>感染の深部播種リスク</td>
                  </tr>
                  <tr>
                    <td>開頭術後の解剖学的欠損部位</td>
                    <td>頭蓋内浸入リスク</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3>相対禁忌（Relative Contraindications）</h3>
            <div className="tbl">
              <table className="th-orange">
                <thead>
                  <tr>
                    <th>禁忌</th>
                    <th>理由</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>凝固障害（抗凝固療法中など）</td>
                    <td>血腫形成リスク（慎重に評価）</td>
                  </tr>
                  <tr>
                    <td>アーノルド・キアリ奇形の既往</td>
                    <td>解剖学的変異による合併症リスク</td>
                  </tr>
                  <tr>
                    <td>長時間の腹臥位/座位困難</td>
                    <td>手技の安全な実施に必要な体位がとれない</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="alert a-info">
              <div className="alert-i">📌</div>
              <div>
                <strong>ソース：</strong>
                <Ext href="https://www.ncbi.nlm.nih.gov/books/NBK580523/">
                  StatPearls — Occipital Nerve Block (NCBI Bookshelf, 2025年7月更新)
                </Ext>
              </div>
            </div>
          </section>

          {/* ============================================================ SECTION 7 */}
          <section id="s7" className="sec">
            <div className="sec-hd">
              <div className="sec-num">7</div>
              <h1 className="sec-title">必要物品・使用薬剤</h1>
            </div>

            <h2>標準的な必要物品リスト</h2>
            <div className="tbl">
              <table>
                <thead>
                  <tr>
                    <th>カテゴリー</th>
                    <th>品目</th>
                    <th>規格・備考</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>注射器</td>
                    <td>シリンジ</td>
                    <td>5mL（片側）×必要本数</td>
                  </tr>
                  <tr>
                    <td>針</td>
                    <td>注射針</td>
                    <td>
                      <strong>25G × 25mm</strong>（標準）— 細針推奨
                    </td>
                  </tr>
                  <tr>
                    <td>消毒</td>
                    <td>ポビドンヨード/クロルヘキシジン</td>
                    <td>注入部位の皮膚消毒</td>
                  </tr>
                  <tr>
                    <td>ドレープ</td>
                    <td>滅菌ドレープ</td>
                    <td>任意（外来では省略可）</td>
                  </tr>
                  <tr>
                    <td>エコー（任意）</td>
                    <td>超音波装置</td>
                    <td>線形プローブ（高周波）推奨</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h2>局所麻酔薬（必須）</h2>
            <div className="drug-grid">
              <div className="drug">
                <div className="drug-nm">リドカイン（Lidocaine）</div>
                <div className="drug-br">1〜2% / 1〜2mL</div>
                <div className="drug-tx">
                  作用発現 5〜10分・持続 1〜3時間。<strong>速効性</strong>で効果確認用に最適。
                </div>
              </div>
              <div className="drug">
                <div className="drug-nm">ブピバカイン（Bupivacaine）</div>
                <div className="drug-br">0.25〜0.5% / 1〜2mL</div>
                <div className="drug-tx">
                  作用発現 15〜20分・持続 6〜12時間。<strong>長時間作用</strong>
                  で予防的ブロックに適す。
                </div>
              </div>
              <div className="drug">
                <div className="drug-nm">混合（1:1〜1:3）</div>
                <div className="drug-br">計 2〜4mL</div>
                <div className="drug-tx">
                  <strong>最も一般的</strong>。リドカイン即効＋ブピバカイン持続を両立。
                </div>
              </div>
            </div>

            <div className="alert a-warn">
              <div className="alert-i">⚠️</div>
              <div>
                <strong>総注入量：</strong>片側あたり<strong>最大4mL</strong>
                を超えないこと。両側ブロックでも過剰にならないよう注意。
              </div>
            </div>

            <h2>コルチコステロイド（任意・疾患により使い分け）</h2>
            <div className="tbl">
              <table>
                <thead>
                  <tr>
                    <th>薬物</th>
                    <th>量</th>
                    <th>皮膚副作用リスク</th>
                    <th>推奨状況</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <strong>メチルプレドニゾロン</strong>
                    </td>
                    <td>40mg/mL × 1〜2mL</td>
                    <td>
                      <span className="bGrn">低め（推奨）</span>
                    </td>
                    <td>群発頭痛・頸原性頭痛</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>デキサメタゾン</strong>
                    </td>
                    <td>2〜4mg × 1mL</td>
                    <td>
                      <span className="bGrn">最低</span>
                    </td>
                    <td>デキサメタゾンでの使用も比較的安全</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>トリアムシノロン</strong>
                    </td>
                    <td>—</td>
                    <td>
                      <span className="bRed">⚠️ 最高</span>
                    </td>
                    <td>
                      <span className="tR">推奨しない</span> — 脱毛・皮膚アトロフィー
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="alert a-danger">
              <div className="alert-i">🚫</div>
              <div>
                <strong>重要：</strong>
                トリアムシノロンは局所皮膚萎縮・後頭部脱毛（円形脱毛症様）の報告が多い。
                <strong>メチルプレドニゾロンまたはデキサメタゾンが推奨</strong>されます。
                <br />📌 Lambru G et al. <em>Headache</em> 2012: doi:
                <Ext href="https://headachejournal.onlinelibrary.wiley.com/doi/abs/10.1111/j.1526-4610.2012.02270.x">
                  10.1111/j.1526-4610.2012.02270.x
                </Ext>
              </div>
            </div>

            <h2>片頭痛 vs. 群発頭痛でのステロイド使用の判断</h2>
            <div className="tbl">
              <table>
                <thead>
                  <tr>
                    <th>疾患</th>
                    <th>ステロイド追加</th>
                    <th>根拠</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>片頭痛</td>
                    <td>
                      <span className="tR">❌ 追加効果なし</span>
                    </td>
                    <td>短期・長期ともに有意差なし（RCT複数）</td>
                  </tr>
                  <tr>
                    <td>群発頭痛</td>
                    <td>
                      <span className="tG">✅ 推奨</span>
                    </td>
                    <td>後頭下ステロイド注射が群発期を短縮（2 RCT）</td>
                  </tr>
                  <tr>
                    <td>頸原性頭痛</td>
                    <td>
                      <span className="tG">✅ 推奨</span>
                    </td>
                    <td>神経周囲炎症の鎮静に有効</td>
                  </tr>
                  <tr>
                    <td>後頭神経痛</td>
                    <td>
                      <span className="tG">✅ 推奨</span>
                    </td>
                    <td>神経絞扼部位の炎症抑制</td>
                  </tr>
                  <tr>
                    <td>硬膜穿刺後頭痛</td>
                    <td>⚪ 状況次第</td>
                    <td>局所麻酔薬のみで十分なことが多い</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="alert a-info">
              <div className="alert-i">📌</div>
              <div>
                <strong>ソース：</strong>
                <Ext href="https://www.ncbi.nlm.nih.gov/books/NBK580523/">
                  StatPearls — Occipital Nerve Block (NCBI, 2025)
                </Ext>{" "}
                — "Studies suggest no difference in short and long-term migraine pain control when
                anesthetic is injected alone or in combination with steroid."
              </div>
            </div>
          </section>

          {/* ============================================================ SECTION 8 */}
          <section id="s8" className="sec">
            <div className="sec-hd">
              <div className="sec-num">8</div>
              <h1 className="sec-title">手技① — ランドマーク法（体表指標法）</h1>
            </div>

            <p>
              ランドマーク法は体表の骨指標と動脈の拍動を用いて注入点を決定する方法です。
              <strong>外来・救急での迅速な実施</strong>に適しています。
            </p>

            <h2>ランドマーク法の7ステップ</h2>
            <div className="mmd">
              <div className="mmd-lbl">フローチャート — ランドマーク法の手技ステップ</div>
              <MermaidDiagram
                themeVariables={ONB_MERMAID_THEME}
                chart={`flowchart TD
S1["🟤 STEP 1: 体位決定\\n患者を座位または腹臥位とする\\n頸部をやや前屈（顎を引く）\\n→ 後頭部の構造が触れやすくなる"]
S2["🔵 STEP 2: 体表ランドマークの確認\\n① 後頭骨隆起（EOP）を同定\\n② 乳様突起を同定\\n③ 両者を結ぶ線（上項線）を想定"]
S3["🟠 STEP 3: 注入点の決定\\n✦ GON注入点:\\nEOP〜乳様突起線の内側1/3〜2/3境界\\n後頭動脈の拍動（触知可能）の\\n直接内側（medial）\\n✦ LON注入点（必要時）:\\n外側1/3（乳様突起寄り）"]
S4["🟡 STEP 4: 消毒\\nポビドンヨードまたはクロルヘキシジンで\\n注入予定部位を消毒・乾燥"]
S5["🟢 STEP 5: 注入\\n① 25G針を用いて皮下垂直刺入\\n② 必ず逆吸引（aspiration）\\n  血液逆流→位置変更\\n③ 皮下〜神経周囲に\\n  2〜4mLをゆっくり注入\\n  （扇状に広げると確実）"]
S6["🔵 STEP 6: 効果確認\\n5分後（リドカイン）または\\n15分後（ブピバカイン）に\\n後頭部の感覚変化（しびれ感）を確認\\n→ 感覚鈍麻が得られれば成功"]
S7["✅ STEP 7: 術後観察\\n15〜30分間経過観察\\n迷走神経反射（失神）監視\\nVAS/NRS で痛みスコア再評価"]

S1 --> S2 --> S3 --> S4 --> S5 --> S6 --> S7

style S1 fill:#4e342e,color:#fff
style S2 fill:#1565c0,color:#fff
style S3 fill:#e65100,color:#fff
style S4 fill:#f9a825,color:#333
style S5 fill:#1b5e20,color:#fff
style S6 fill:#0d47a1,color:#fff
style S7 fill:#2e7d32,color:#fff`}
              />
            </div>

            <h2>逆吸引（Aspiration）が特に重要な理由</h2>
            <div className="alert a-danger">
              <div className="alert-i">🩸</div>
              <div>
                後頭動脈は GON 注入点の直近を走行しています。誤って動脈内に注入すると
                <strong>局所麻酔薬全身毒性（LAST）</strong>または逆行性塞栓による
                <strong>脳梗塞</strong>のリスクがあります。<strong>必ず注入前に吸引</strong>
                してください。
              </div>
            </div>
            <div className="tbl">
              <table>
                <thead>
                  <tr>
                    <th>吸引結果</th>
                    <th>対応</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>血液の逆流なし</td>
                    <td>
                      <span className="tG">そのまま注入可</span>
                    </td>
                  </tr>
                  <tr>
                    <td>血液が逆流</td>
                    <td>
                      <span className="tR">針を抜いて位置を変更、再試行</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* ============================================================ SECTION 9 */}
          <section id="s9" className="sec">
            <div className="sec-hd">
              <div className="sec-num">9</div>
              <h1 className="sec-title">手技② — エコーガイド下法（超音波ガイド法）</h1>
            </div>

            <p>
              超音波ガイド下法はより<strong>標的特異的</strong>
              で、解剖学的変異がある症例や「ランドマーク法が失敗した症例」に特に有用です。
            </p>

            <h2>ランドマーク法 vs. エコーガイド下法</h2>
            <div className="tbl">
              <table>
                <thead>
                  <tr>
                    <th>比較点</th>
                    <th>ランドマーク法</th>
                    <th>エコーガイド下法</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>設定の容易さ</td>
                    <td>
                      <span className="tG">✅ 簡便・迅速</span>
                    </td>
                    <td>⚠️ エコー機器が必要</td>
                  </tr>
                  <tr>
                    <td>標的特異性</td>
                    <td>
                      <span className="tR">❌ 隣接神経も麻酔されやすい</span>
                    </td>
                    <td>
                      <span className="tG">✅ 高い特異性</span>
                    </td>
                  </tr>
                  <tr>
                    <td>解剖変異への対応</td>
                    <td>
                      <span className="tR">❌ 困難</span>
                    </td>
                    <td>
                      <span className="tG">✅ 良好</span>
                    </td>
                  </tr>
                  <tr>
                    <td>診断的精度</td>
                    <td>低い</td>
                    <td>高い（神経の直接可視化）</td>
                  </tr>
                  <tr>
                    <td>合併症リスク</td>
                    <td>5〜10%の懸念</td>
                    <td>低下（動脈損傷回避）</td>
                  </tr>
                  <tr>
                    <td>学習曲線</td>
                    <td>浅い</td>
                    <td>必要あり</td>
                  </tr>
                  <tr>
                    <td>エビデンス</td>
                    <td>長い使用歴</td>
                    <td>増加中</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="alert a-info">
              <div className="alert-i">📌</div>
              <div>
                <strong>ソース：</strong>Greher M et al. "Sonographic visualization and
                ultrasound-guided blockade of the greater occipital nerve." <em>Br J Anaesth</em>{" "}
                2010;104:637-42. doi:
                <Ext href="https://academic.oup.com/bja/article/104/5/637/261124">
                  10.1093/bja/aeq052
                </Ext>
              </div>
            </div>

            <h2>エコーガイド下法の2つのアプローチ</h2>
            <div className="onb-role-grid">
              <div className="onb-role">
                <div className="onb-role-t">① 上項線レベル（古典的）</div>
                <div className="onb-role-d">
                  線形プローブを上項線に横断位 → カラードプラで後頭動脈を同定。GON は動脈の
                  <strong>内側</strong>に高エコー索状構造。深さ約8mm（浅い）。GON
                  が既に分岐していることがあり確実性やや低い。
                </div>
              </div>
              <div className="onb-role">
                <div className="onb-role-t">② C2レベル（推奨）</div>
                <div className="onb-role-d">
                  プローブを C2 椎体レベルに → 下斜筋（OCI）の浅層に GON を同定。深さ約17〜18mm。
                  <strong>注入確実性 20/20（100%）</strong>（vs 古典法
                  16/20＝80%）。標的特異性が高く診断的ブロックにも推奨。
                </div>
              </div>
            </div>

            <div className="mmd">
              <div className="mmd-lbl">フローチャート — エコーガイド下法 2アプローチの比較</div>
              <MermaidDiagram
                themeVariables={ONB_MERMAID_THEME}
                chart={`flowchart LR
subgraph Classic["アプローチ① 上項線レベル"]
C1["プローブ横断位\\n上項線上"] --> C2["後頭動脈同定\\n（カラードプラ）"] --> C3["GON = 動脈の\\n内側に索状高エコー"] --> C4["深さ約8mm\\n1〜3mL注入"]
end

subgraph C2Level["アプローチ② C2レベル（推奨）"]
D1["プローブ横断位\\nC2椎体レベル"] --> D2["下斜筋（OCI）を\\n同定"] --> D3["GON = OCI浅層の\\n筋膜上に索状高エコー"] --> D4["深さ約17〜18mm\\n2〜3mL注入"]
end

style Classic fill:#e3f2fd,stroke:#1565c0
style C2Level fill:#e8f5e9,stroke:#2e7d32`}
              />
            </div>

            <h2>エコーガイド下法のステップ（上項線レベル）</h2>
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
                    <td>線形プローブ（13〜15MHz）を上項線に横断位</td>
                    <td>ゲル少量使用</td>
                  </tr>
                  <tr>
                    <td>2. 後頭動脈同定</td>
                    <td>カラードプラON → 拍動する血流信号</td>
                    <td>EOPの1〜2cm外側に出現</td>
                  </tr>
                  <tr>
                    <td>3. GON同定</td>
                    <td>動脈内側の白い索状構造（高エコー）</td>
                    <td>直径約4mm × 1.4mm</td>
                  </tr>
                  <tr>
                    <td>4. 針の刺入</td>
                    <td>平面内アプローチ（in-plane）で針先を追跡</td>
                    <td>神経束内への直接注入を避ける</td>
                  </tr>
                  <tr>
                    <td>5. 逆吸引</td>
                    <td>血液の逆流がないことを確認</td>
                    <td>動脈内注入予防</td>
                  </tr>
                  <tr>
                    <td>6. 注入</td>
                    <td>
                      神経の<strong>周囲</strong>（epineural）に注入（ハイドロダイセクション）
                    </td>
                    <td>薬液がGONを「包む」のを確認</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* ============================================================ SECTION 10 */}
          <section id="s10" className="sec">
            <div className="sec-hd">
              <div className="sec-num">10</div>
              <h1 className="sec-title">術後ケアと効果の評価</h1>
            </div>

            <h2>術後即時管理</h2>
            <div className="tbl">
              <table>
                <thead>
                  <tr>
                    <th>時間</th>
                    <th>対応</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>注入直後</td>
                    <td>注入部位を軽く圧迫（出血・血腫予防）</td>
                  </tr>
                  <tr>
                    <td>5分後</td>
                    <td>リドカイン使用時は感覚変化（しびれ・温感）を確認</td>
                  </tr>
                  <tr>
                    <td>15〜30分後</td>
                    <td>VAS/NRS で頭痛スコア再評価、迷走神経反射症状の確認</td>
                  </tr>
                  <tr>
                    <td>30分後</td>
                    <td>歩行・帰宅可能かチェック（失神リスクが消えた後）</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h2>効果の時間軸</h2>
            <div className="mmd">
              <div className="mmd-lbl">フローチャート — 注入直後から数ヶ月までの効果の推移</div>
              <MermaidDiagram
                themeVariables={ONB_MERMAID_THEME}
                chart={`flowchart LR
T0["注入直後\\n0分"] --> T20["15〜30分後\\nリドカイン効果\\n発現開始\\n局所感覚鈍麻"] --> T6["〜12時間\\nブピバカイン\\n効果持続"] --> T2w["数日〜数週\\n局所麻酔消失後も\\n中枢感作抑制効果\\n持続（個人差大）"] --> T3m["数週〜3ヶ月\\n一部の患者で\\n長期鎮痛持続"]

style T0 fill:#e3f2fd,stroke:#1565c0
style T20 fill:#fff9c4,stroke:#f9a825
style T6 fill:#e8f5e9,stroke:#2e7d32
style T2w fill:#f3e5f5,stroke:#6a1b9a
style T3m fill:#e8f5e9,stroke:#1b5e20`}
              />
            </div>

            <h2>再投与の基準</h2>
            <div className="alert a-ok">
              <div className="alert-i">🔁</div>
              <div>
                効果が良好で持続が短い場合：<strong>6週〜3ヶ月ごと</strong>の繰り返し施行を検討。
                <br />
                <strong>6ヶ月以内に3回以上</strong>
                のブロックが必要な場合は、代替・追加治療の探索を強く推奨。
              </div>
            </div>
          </section>

          {/* ============================================================ SECTION 11 */}
          <section id="s11" className="sec">
            <div className="sec-hd">
              <div className="sec-num">11</div>
              <h1 className="sec-title">適応疾患別エビデンスレビュー</h1>
            </div>

            <h2>後頭神経痛（ICHD-3: 13.1）— 最も強い適応</h2>
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
                    <td>疾患の定義</td>
                    <td>GON・LON・TON の支配領域を走る片側性または両側性の発作性疼痛</td>
                  </tr>
                  <tr>
                    <td>診断的ブロックの意義</td>
                    <td>「診断的GONブロックで痛みが消失」が ICHD-3 診断基準に含まれる</td>
                  </tr>
                  <tr>
                    <td>治療的ブロックの位置づけ</td>
                    <td>第一選択療法（ステロイド併用を推奨）</td>
                  </tr>
                  <tr>
                    <td>期待される効果</td>
                    <td>数日〜数ヶ月の疼痛緩和</td>
                  </tr>
                  <tr>
                    <td>エビデンスグレード</td>
                    <td>
                      <span className="bB">Grade B</span> 観察研究・症例シリーズが中心
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h2>片頭痛（Migraine）</h2>
            <div className="mmd">
              <div className="mmd-lbl">
                フローチャート — 片頭痛における GON ブロックの活用シーン
              </div>
              <MermaidDiagram
                themeVariables={ONB_MERMAID_THEME}
                chart={`flowchart TD
M["片頭痛患者における\\nGONブロックの活用シーン"]

M --> A1["急性発作の緩和\\n（Acute Treatment）\\n✅ 推奨：Grade B"]
M --> A2["難治性片頭痛重積\\n（Status Migrainosus）\\nERでの迅速介入"]
M --> A3["慢性片頭痛の予防\\n（≥15日/月）\\n定期的反復施行"]
M --> A4["延長前兆\\n（Prolonged Aura）\\n症例報告レベル"]

A1 --> E1["12/13のRCTで有効性確認\\n（頭痛頻度・強度・持続時間\\nのいずれかが改善）\\nVA/DoD 2024 推奨: Suggested"]
A3 --> E2["メタ解析 2022\\n（Acta Neurol Scand）:\\n慢性片頭痛でGONB有効\\nVAS低下・頭痛日数減少"]

style M fill:#1565c0,color:#fff
style E1 fill:#e8f5e9,stroke:#2e7d32
style E2 fill:#e8f5e9,stroke:#2e7d32`}
              />
            </div>
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
                    <td>12のRCTメタ解析</td>
                    <td>SR/MA</td>
                    <td>12/13のRCTで有効性あり（頻度・強度・持続時間改善）</td>
                  </tr>
                  <tr>
                    <td>VA/DoD 2024ガイドライン</td>
                    <td>推奨</td>
                    <td>"急性期片頭痛治療として GONB が示唆される"</td>
                  </tr>
                  <tr>
                    <td>Velásquez-Rimachi 2022</td>
                    <td>SR/MA（Acta Neurol Scand）</td>
                    <td>慢性片頭痛で VAS・頭痛日数有意改善</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h2>群発頭痛（ICHD-3: 3.1/3.2）</h2>
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
                    <td>使用タイミング</td>
                    <td>
                      群発期開始時の「移行療法」。予防薬（ベラパミル等）が効果発現するまでの橋渡し。
                    </td>
                  </tr>
                  <tr>
                    <td>注入薬剤</td>
                    <td>
                      <strong>ステロイドの追加が必須</strong>（局所麻酔薬のみでは不十分）
                    </td>
                  </tr>
                  <tr>
                    <td>メタ解析のまとめ</td>
                    <td>
                      1ヶ月時点の無痛率 <strong>50%</strong>（95%CI 24〜76%）。RCT
                      2件でプラセボ比の相対リスク比 <strong>4.86</strong>（95%CI 1.35〜17.55）
                    </td>
                  </tr>
                  <tr>
                    <td>エビデンスグレード</td>
                    <td>
                      <span className="bB">Grade B</span>（2つのRCT）
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="alert a-info">
              <div className="alert-i">📌</div>
              <div>
                <strong>ソース：</strong>González-García N et al. "Efficacy and safety of greater
                occipital nerve block for the treatment of cluster headache: a systematic review and
                meta-analysis." <em>Cephalalgia</em> 2020. PMID:{" "}
                <Ext href="https://pubmed.ncbi.nlm.nih.gov/32781922/">32781922</Ext>
              </div>
            </div>

            <h2>頸原性頭痛（ICHD-3: 11.2）</h2>
            <div className="tbl">
              <table>
                <thead>
                  <tr>
                    <th>特徴</th>
                    <th>詳細</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>TONブロックの意義</td>
                    <td>C2-3椎間関節由来の頸原性頭痛には第三後頭神経（TON）ブロックが特に有効</td>
                  </tr>
                  <tr>
                    <td>GONブロックの役割</td>
                    <td>GON + TON の同時ブロックが推奨（単独より上乗せ効果）</td>
                  </tr>
                  <tr>
                    <td>ステロイド追加</td>
                    <td>推奨（神経周囲炎症の鎮静）</td>
                  </tr>
                  <tr>
                    <td>エビデンスグレード</td>
                    <td>
                      <span className="bB">Grade B</span> 1つのRCT
                    </td>
                  </tr>
                  <tr>
                    <td>注意点</td>
                    <td>理学療法との組み合わせで相乗効果</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h2>硬膜穿刺後頭痛（PDPH）</h2>
            <div className="tbl">
              <table>
                <thead>
                  <tr>
                    <th>特徴</th>
                    <th>詳細</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>使用タイミング</td>
                    <td>ブラッドパッチ実施前の橋渡し、またはブラッドパッチ拒否時</td>
                  </tr>
                  <tr>
                    <td>推定機序</td>
                    <td>低髄液圧による三叉神経・後頭神経の感作を抑制</td>
                  </tr>
                  <tr>
                    <td>エビデンスグレード</td>
                    <td>
                      <span className="bC">Grade C</span> 観察研究・症例報告中心
                    </td>
                  </tr>
                  <tr>
                    <td>妊婦への使用</td>
                    <td>比較的安全（局所麻酔薬のみ推奨、ステロイドは慎重に）</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* ============================================================ SECTION 12 */}
          <section id="s12" className="sec">
            <div className="sec-hd">
              <div className="sec-num">12</div>
              <h1 className="sec-title">ステロイド併用 vs. 局所麻酔薬単独</h1>
            </div>

            <p>
              最も臨床的に重要な問いのひとつは<strong>「ステロイドを加えるべきか？」</strong>
              です。現時点の最良のエビデンスをまとめます。
            </p>

            <div className="tbl">
              <table>
                <thead>
                  <tr>
                    <th>疾患</th>
                    <th>ステロイド追加の推奨</th>
                    <th>根拠</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <strong>片頭痛</strong>
                    </td>
                    <td>
                      <span className="tR">❌ 追加効果なし</span>
                    </td>
                    <td>複数のRCTで局所麻酔単独と有意差なし</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>群発頭痛</strong>
                    </td>
                    <td>
                      <span className="tG">✅ 強く推奨</span>
                    </td>
                    <td>後頭下ステロイド注射で RCT 2件が有効性確認</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>後頭神経痛</strong>
                    </td>
                    <td>
                      <span className="tG">✅ 推奨（長期効果）</span>
                    </td>
                    <td>神経周囲炎症の鎮静に有効</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>頸原性頭痛</strong>
                    </td>
                    <td>
                      <span className="tG">✅ 推奨</span>
                    </td>
                    <td>神経根周囲炎症の鎮静</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>PDPH</strong>
                    </td>
                    <td>⚪ 局所麻酔のみで十分なことが多い</td>
                    <td>エビデンス限定的</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h2>ステロイド選択のアルゴリズム（使用する場合）</h2>
            <div className="mmd">
              <div className="mmd-lbl">
                フローチャート — ステロイド選択（粒子性・皮膚副作用リスクで判断）
              </div>
              <MermaidDiagram
                themeVariables={ONB_MERMAID_THEME}
                chart={`flowchart LR
A["ステロイドを追加する場合"] --> B{"どのステロイドを選ぶか？"}
B --> C["メチルプレドニゾロン 40mg\\n✅ 第一推奨\\n粒子性低い・皮膚副作用少ない"]
B --> D["デキサメタゾン 4〜8mg\\n✅ 第一推奨（代替）\\n水溶性・妊婦でも比較的安全"]
B --> E["トリアムシノロン\\n❌ 避けること\\n粒子状・脱毛・皮膚萎縮リスク高"]

style C fill:#1b5e20,color:#fff
style D fill:#1b5e20,color:#fff
style E fill:#b71c1c,color:#fff`}
              />
            </div>

            <div className="alert a-info">
              <div className="alert-i">📌</div>
              <div>
                <strong>ソース：</strong>Shields KG et al. "Alopecia and cutaneous atrophy after
                greater occipital nerve infiltration with corticosteroid." <em>Neurology</em>{" "}
                2004;63:2193–4. ｜ Lambru G et al. <em>Headache</em> 2012.
              </div>
            </div>
          </section>

          {/* ============================================================ SECTION 13 */}
          <section id="s13" className="sec">
            <div className="sec-hd">
              <div className="sec-num">13</div>
              <h1 className="sec-title">合併症・安全プロファイル</h1>
            </div>

            <p>GON ブロックは一般的に安全性が高く、重篤な合併症はまれです。</p>

            <h2>合併症の全体像</h2>
            <div className="tbl">
              <table>
                <thead>
                  <tr>
                    <th>カテゴリー</th>
                    <th>合併症</th>
                    <th>頻度</th>
                    <th>予防策</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>局所・一時的</td>
                    <td>注入部位の疼痛・内出血</td>
                    <td>一般的</td>
                    <td>細針使用・圧迫止血</td>
                  </tr>
                  <tr>
                    <td>局所・一時的</td>
                    <td>迷走神経反射（血管迷走神経性失神）</td>
                    <td>まれ〜時々</td>
                    <td>仰臥位で経過観察</td>
                  </tr>
                  <tr>
                    <td>ステロイド関連</td>
                    <td>皮膚萎縮（Cutaneous Atrophy）</td>
                    <td>&lt;1%</td>
                    <td>メチルプレドニゾロン推奨・深部注入</td>
                  </tr>
                  <tr>
                    <td>ステロイド関連</td>
                    <td>後頭部脱毛（Alopecia）</td>
                    <td>まれ</td>
                    <td>トリアムシノロン回避</td>
                  </tr>
                  <tr>
                    <td>ステロイド関連</td>
                    <td>毛嚢炎（Folliculitis）</td>
                    <td>まれ</td>
                    <td>無菌操作の徹底</td>
                  </tr>
                  <tr>
                    <td>血管関連</td>
                    <td>動脈内注入（後頭動脈）</td>
                    <td>まれ</td>
                    <td>必ず逆吸引確認</td>
                  </tr>
                  <tr>
                    <td>
                      <span className="tR">重篤（極めてまれ）</span>
                    </td>
                    <td>局所麻酔薬全身毒性（LAST）</td>
                    <td>極めてまれ</td>
                    <td>逆吸引・低用量・分割注入</td>
                  </tr>
                  <tr>
                    <td>
                      <span className="tR">重篤（極めてまれ）</span>
                    </td>
                    <td>くも膜下腔誤注入 → 脳幹麻酔</td>
                    <td>極めてまれ</td>
                    <td>深度管理・エコーガイド</td>
                  </tr>
                  <tr>
                    <td>
                      <span className="tR">重篤（極めてまれ）</span>
                    </td>
                    <td>急性小脳症候群</td>
                    <td>症例報告レベル</td>
                    <td>—</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h2>特に注意：脱毛と皮膚萎縮</h2>
            <div className="alert a-warn">
              <div className="alert-i">💈</div>
              <div>
                後頭部の脱毛（円形脱毛症様）と皮膚萎縮は、<strong>トリアムシノロン</strong>
                使用時に報告が集中。
                <br />
                <strong>機序：</strong>
                粒子状ステロイドが皮下に結晶沈着 → 周囲血管収縮 → 皮膚・毛根への血流低下 →
                皮膚萎縮・脱毛。皮膚が薄い後頭部は特にリスクが高い。
              </div>
            </div>
            <div className="alert a-ok">
              <div className="alert-i">✅</div>
              <div>
                <strong>回避策：</strong>
                メチルプレドニゾロンまたはデキサメタゾンを使用し、皮内への浅い注入を避けること。
              </div>
            </div>

            <h2>LAST への備え</h2>
            <div className="alert a-danger">
              <div className="alert-i">🧯</div>
              <div>
                GON ブロックを実施する場所には、LAST
                の初期症状（耳鳴り・金属味・痙攣）を認識し対応できるスタッフと、
                <strong>イントラリポス（脂肪乳剤）</strong>の準備があることが望ましい。
              </div>
            </div>
          </section>

          {/* ============================================================ SECTION 14 */}
          <section id="s14" className="sec">
            <div className="sec-hd">
              <div className="sec-num">14</div>
              <h1 className="sec-title">アウトカム評価指標</h1>
            </div>

            <p>以下の標準化ツールを用いて GON ブロックの効果を定量的に評価します。</p>

            <div className="tbl">
              <table>
                <thead>
                  <tr>
                    <th>ツール</th>
                    <th>評価内容</th>
                    <th>判断基準</th>
                    <th>評価タイミング</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <strong>VAS / NRS (0〜10)</strong>
                    </td>
                    <td>痛みの強度</td>
                    <td>3以上の低下を有意とする</td>
                    <td>注入前・30分後・1週後</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>HIT-6</strong>
                    </td>
                    <td>日常生活への影響</td>
                    <td>≥60点 = 重度障害</td>
                    <td>3ヶ月ごと</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>MIDAS</strong>
                    </td>
                    <td>片頭痛による生活機能障害</td>
                    <td>≥21点 = Grade IV 重度</td>
                    <td>3ヶ月ごと</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>頭痛日数/月</strong>
                    </td>
                    <td>頻度の客観的指標</td>
                    <td>
                      <strong>≥50%減少</strong>を治療成功目標
                    </td>
                    <td>毎月</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>PGIC</strong>
                    </td>
                    <td>患者の主観的改善感</td>
                    <td>7段階（1〜7）</td>
                    <td>注入4〜6週後</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h2>治療成功の定義と再評価</h2>
            <div className="mmd">
              <div className="mmd-lbl">フローチャート — 4〜6週後の再評価と次のアクション</div>
              <MermaidDiagram
                themeVariables={ONB_MERMAID_THEME}
                chart={`flowchart LR
A["GONブロック実施"]
B["4〜6週後に再評価"]
C{"頭痛日数≥50%減少\\nまたは\\nVAS≥3点改善？"}
D["✅ 成功\\n必要に応じて\\n定期的反復施行\\n（6〜12週ごと）"]
E{"反応なし or\\n不十分？"}
F["代替治療を検討\\n・CGRP mAb\\n・ボツリヌストキシン\\n・中枢作用型予防薬\\n・頭痛専門医紹介"]
G["部分的反応\\n（25〜49%改善）"]
H["追加治療の\\n組み合わせを検討\\n（多モーダルアプローチ）"]

A --> B --> C
C -->|"Yes"| D
C -->|"No"| E
E -->|"反応なし"| F
E -->|"部分反応"| G
G --> H

style D fill:#1b5e20,color:#fff
style F fill:#b71c1c,color:#fff
style H fill:#e65100,color:#fff`}
              />
            </div>
          </section>

          {/* ============================================================ SECTION 15 */}
          <section id="s15" className="sec">
            <div className="sec-hd">
              <div className="sec-num">15</div>
              <h1 className="sec-title">多モーダル統合アプローチ</h1>
            </div>

            <p>
              GON ブロックは単独治療としても使えますが、最善の効果は
              <strong>他の治療法との組み合わせ</strong>
              で得られます。
            </p>

            <h2>慢性片頭痛（ICHD-3: 1.3）の統合プロトコル</h2>
            <div className="tbl">
              <table>
                <thead>
                  <tr>
                    <th>治療モダリティ</th>
                    <th>内容</th>
                    <th>エビデンス</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>GONブロック</td>
                    <td>6〜12週ごと定期施行（急性増悪時にも）</td>
                    <td>
                      <span className="bB">Grade B</span>
                    </td>
                  </tr>
                  <tr>
                    <td>CGRP mAb</td>
                    <td>エレヌマブ/フレマネズマブ/ガルカネズマブ 月1回</td>
                    <td>
                      <span className="bA">Grade A</span>
                    </td>
                  </tr>
                  <tr>
                    <td>ボツリヌストキシン</td>
                    <td>PREEMPTプロトコル 12週毎（155〜195単位）</td>
                    <td>
                      <span className="bA">Grade A</span>
                    </td>
                  </tr>
                  <tr>
                    <td>認知行動療法</td>
                    <td>薬物療法との組み合わせで相乗効果</td>
                    <td>
                      <span className="bB">Grade B</span>
                    </td>
                  </tr>
                  <tr>
                    <td>マグネシウム補充</td>
                    <td>400〜600mg/日</td>
                    <td>
                      <span className="bA">Grade A/B</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h2>群発頭痛（3.1/3.2）の群発期管理</h2>
            <div className="tbl">
              <table>
                <thead>
                  <tr>
                    <th>治療モダリティ</th>
                    <th>内容</th>
                    <th>エビデンス</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>GONブロック（ステロイド込み）</td>
                    <td>群発期開始時に即施行（移行療法）</td>
                    <td>
                      <span className="bB">Grade B</span>
                    </td>
                  </tr>
                  <tr>
                    <td>ベラパミル（予防）</td>
                    <td>240〜480mg/日（主要予防薬）</td>
                    <td>
                      <span className="bA">Grade A</span>
                    </td>
                  </tr>
                  <tr>
                    <td>スマトリプタン皮下注射</td>
                    <td>6mg 皮下注、各発作に</td>
                    <td>
                      <span className="bA">Grade A</span>
                    </td>
                  </tr>
                  <tr>
                    <td>高流量酸素吸入</td>
                    <td>100% O₂ 12〜15L/分 × 15〜20分</td>
                    <td>
                      <span className="bA">Grade A</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h2>後頭神経痛の難治性症例 — ステップアップ</h2>
            <div className="phase-grid">
              <div className="ph ph2">
                <div className="ph-icon">1</div>
                <div className="ph-title">Step 1</div>
                <div className="ph-desc">GONブロック（局麻＋ステロイド）× 繰り返し施行</div>
              </div>
              <div className="ph ph1">
                <div className="ph-icon">2</div>
                <div className="ph-title">Step 2</div>
                <div className="ph-desc">
                  薬物療法：アミトリプチリン/ガバペンチン/カルバマゼピン
                </div>
              </div>
              <div className="ph ph3">
                <div className="ph-icon">3</div>
                <div className="ph-title">Step 3</div>
                <div className="ph-desc">パルス高周波（PRF）/ 後頭神経刺激（ONS）</div>
              </div>
              <div className="ph ph4">
                <div className="ph-icon">4</div>
                <div className="ph-title">Step 4</div>
                <div className="ph-desc">脊髄刺激療法（SCS）— 難治例</div>
              </div>
            </div>

            <h2>GONブロックと他治療の相互作用</h2>
            <div className="tbl">
              <table>
                <thead>
                  <tr>
                    <th>組み合わせ</th>
                    <th>相乗効果の根拠</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>GONブロック ＋ CGRP mAb</td>
                    <td>末梢（GON）＋中枢（CGRP）の異なる標的に作用</td>
                  </tr>
                  <tr>
                    <td>GONブロック ＋ 理学療法</td>
                    <td>頸椎由来の頭痛（頸原性頭痛）で特に有効</td>
                  </tr>
                  <tr>
                    <td>GONブロック ＋ 認知行動療法</td>
                    <td>痛みの恐怖・回避行動の修正と身体的介入の統合</td>
                  </tr>
                  <tr>
                    <td>GONブロック ＋ 生活習慣改善</td>
                    <td>トリガー管理＋神経系のリセットを同時に</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* ============================================================ SECTION 16 */}
          <section id="s16" className="sec">
            <div className="sec-hd">
              <div className="sec-num">16</div>
              <h1 className="sec-title">参考文献・公式リソース</h1>
            </div>

            <h2>最重要一次文献・ガイドライン</h2>
            <div className="src-grid">
              <div className="src">
                <div className="src-org">StatPearls / NCBI</div>
                <div className="src-t">
                  Occipital Nerve Block（2025年7月更新）— 解剖・手技の最重要リファレンス
                </div>
                <Ext href="https://www.ncbi.nlm.nih.gov/books/NBK580523/" className="src-url">
                  https://www.ncbi.nlm.nih.gov/books/NBK580523/
                </Ext>
              </div>
              <div className="src">
                <div className="src-org">IHS / ICHD-3</div>
                <div className="src-t">ICHD-3 公式サイト（診断基準 全文閲覧可）</div>
                <Ext href="https://ichd-3.org/" className="src-url">
                  https://ichd-3.org/
                </Ext>
              </div>
              <div className="src">
                <div className="src-org">ICHD-3 全文PDF</div>
                <div className="src-t">
                  The International Classification of Headache Disorders, 3rd Edition (2018)
                </div>
                <Ext
                  href="https://ichd-3.org/wp-content/uploads/2018/01/The-International-Classification-of-Headache-Disorders-3rd-Edition-2018.pdf"
                  className="src-url"
                >
                  ichd-3.org/…/ICHD-3rd-Edition-2018.pdf
                </Ext>
              </div>
              <div className="src">
                <div className="src-org">VA / DoD 2024</div>
                <div className="src-t">頭痛の総合診療ガイドライン（GONブロック推奨含む）</div>
                <Ext
                  href="https://www.nursingcenter.com/getattachment/clinical-resources/Guideline-Summaries/Headache/Guideline-Summary_Headache_August-2024.pdf.aspx"
                  className="src-url"
                >
                  nursingcenter.com/…/Guideline-Summary_Headache_August-2024.pdf
                </Ext>
              </div>
              <div className="src">
                <div className="src-org">IHS / Cephalalgia 2024</div>
                <div className="src-t">IHS Acute Treatment Recommendations</div>
                <Ext
                  href="https://journals.sagepub.com/doi/10.1177/03331024241252666"
                  className="src-url"
                >
                  https://journals.sagepub.com/doi/10.1177/03331024241252666
                </Ext>
              </div>
              <div className="src">
                <div className="src-org">AAN</div>
                <div className="src-t">AAN Headache Guidelines ホームページ</div>
                <Ext href="https://www.aan.com/guidelines/" className="src-url">
                  https://www.aan.com/guidelines/
                </Ext>
              </div>
              <div className="src">
                <div className="src-org">EHF 2022 / PMC</div>
                <div className="src-t">CGRP mAb 予防療法ガイドライン（PMC 全文）</div>
                <Ext
                  href="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC9188162/"
                  className="src-url"
                >
                  https://www.ncbi.nlm.nih.gov/pmc/articles/PMC9188162/
                </Ext>
              </div>
            </div>

            <h2>GONブロック専門文献（PubMed）</h2>
            <div className="src-grid">
              <div className="src">
                <div className="src-org">Med Clin (Barc) 2023</div>
                <div className="src-t">
                  Castillo-Álvarez F et al. — GONブロックのエビデンスレビュー（最新SR）
                </div>
                <Ext
                  href="https://www.sciencedirect.com/science/article/abs/pii/S2387020623002905"
                  className="src-url"
                >
                  sciencedirect.com/…/S2387020623002905
                </Ext>
              </div>
              <div className="src">
                <div className="src-org">Cephalalgia 2020 · PMID 32781922</div>
                <div className="src-t">González-García N et al. — 群発頭痛への GONB：SR/MA</div>
                <Ext href="https://pubmed.ncbi.nlm.nih.gov/32781922/" className="src-url">
                  https://pubmed.ncbi.nlm.nih.gov/32781922/
                </Ext>
              </div>
              <div className="src">
                <div className="src-org">J Oral Facial Pain Headache 2024</div>
                <div className="src-t">
                  Shekoohi S et al. — GONブロックのナラティブレビュー（2024年2月）
                </div>
                <Ext
                  href="https://www.jofph.com/articles/10.22514/jofph.2024.010"
                  className="src-url"
                >
                  https://www.jofph.com/articles/10.22514/jofph.2024.010
                </Ext>
              </div>
              <div className="src">
                <div className="src-org">Br J Anaesth 2010</div>
                <div className="src-t">
                  Greher M et al. — エコーガイド下 GONB の解剖学的検証（C2法 vs 古典法）
                </div>
                <Ext
                  href="https://academic.oup.com/bja/article/104/5/637/261124"
                  className="src-url"
                >
                  https://academic.oup.com/bja/article/104/5/637/261124
                </Ext>
              </div>
              <div className="src">
                <div className="src-org">Cephalalgia 2006 · PMID 17504651</div>
                <div className="src-t">Afridi SK et al. — GONB の PubMed レビュー</div>
                <Ext href="https://pubmed.ncbi.nlm.nih.gov/17504651/" className="src-url">
                  https://pubmed.ncbi.nlm.nih.gov/17504651/
                </Ext>
              </div>
              <div className="src">
                <div className="src-org">Headache 2012</div>
                <div className="src-t">Lambru G et al. — トリアムシノロンによる脱毛・皮膚萎縮</div>
                <Ext
                  href="https://headachejournal.onlinelibrary.wiley.com/doi/abs/10.1111/j.1526-4610.2012.02270.x"
                  className="src-url"
                >
                  headachejournal.onlinelibrary.wiley.com/…/j.1526-4610.2012.02270.x
                </Ext>
              </div>
              <div className="src">
                <div className="src-org">Acta Neurol Scand 2022 · PMID 35538756</div>
                <div className="src-t">Velásquez-Rimachi V et al. — 慢性片頭痛への GONB：MA</div>
                <Ext href="https://pubmed.ncbi.nlm.nih.gov/35538756/" className="src-url">
                  https://pubmed.ncbi.nlm.nih.gov/35538756/
                </Ext>
              </div>
              <div className="src">
                <div className="src-org">JNNP 2021</div>
                <div className="src-t">
                  Hoffmann J et al. — GONB の三叉頸椎複合体への作用（fMRI 研究）
                </div>
                <Ext href="https://jnnp.bmj.com/content/92/10/1046" className="src-url">
                  https://jnnp.bmj.com/content/92/10/1046
                </Ext>
              </div>
            </div>

            <h2>エコーガイド下法・解剖学リソース</h2>
            <div className="src-grid">
              <div className="src">
                <div className="src-org">NYSORA</div>
                <div className="src-t">Ultrasound-Guided Greater Occipital Nerve Block</div>
                <Ext
                  href="https://www.nysora.com/pain-management/ultrasound-guided-greater-occipital-nerve-block/"
                  className="src-url"
                >
                  nysora.com/…/ultrasound-guided-greater-occipital-nerve-block/
                </Ext>
              </div>
              <div className="src">
                <div className="src-org">USRA</div>
                <div className="src-t">Greater Occipital Nerve Block</div>
                <Ext
                  href="https://usra.ca/pain-medicine/specific-blocks/head-neck/gon.php"
                  className="src-url"
                >
                  https://usra.ca/pain-medicine/specific-blocks/head-neck/gon.php
                </Ext>
              </div>
              <div className="src">
                <div className="src-org">Emory University</div>
                <div className="src-t">Ultrasound-Guided ONB Procedure</div>
                <Ext
                  href="https://med.emory.edu/departments/emergency-medicine/sections/ultrasound/case-of-the-month/procedures/occipital-nerve-block.html"
                  className="src-url"
                >
                  med.emory.edu/…/occipital-nerve-block.html
                </Ext>
              </div>
              <div className="src">
                <div className="src-org">ALiEM</div>
                <div className="src-t">GON Block in the Emergency Department</div>
                <Ext
                  href="https://www.aliem.com/greater-occipital-nerve-block-emergency-department/"
                  className="src-url"
                >
                  aliem.com/greater-occipital-nerve-block-emergency-department/
                </Ext>
              </div>
            </div>

            <h2>継続的情報更新リソース</h2>
            <div className="src-grid">
              <div className="src">
                <div className="src-org">PubMed</div>
                <div className="src-t">GON Block 検索（最新RCT・MA）</div>
                <Ext
                  href="https://pubmed.ncbi.nlm.nih.gov/?term=greater+occipital+nerve+block+headache&amp;filter=pubt.clinicaltrial"
                  className="src-url"
                >
                  pubmed.ncbi.nlm.nih.gov/?term=greater+occipital+nerve+block+headache
                </Ext>
              </div>
              <div className="src">
                <div className="src-org">Cochrane Library</div>
                <div className="src-t">系統的レビュー検索</div>
                <Ext
                  href="https://www.cochranelibrary.com/search?query=occipital+nerve+block&amp;searchBy=3"
                  className="src-url"
                >
                  cochranelibrary.com/search?query=occipital+nerve+block
                </Ext>
              </div>
              <div className="src">
                <div className="src-org">The J. of Headache and Pain</div>
                <div className="src-t">EHF 公式誌（オープンアクセス）</div>
                <Ext
                  href="https://thejournalofheadacheandpain.biomedcentral.com/"
                  className="src-url"
                >
                  https://thejournalofheadacheandpain.biomedcentral.com/
                </Ext>
              </div>
              <div className="src">
                <div className="src-org">ClinicalTrials.gov</div>
                <div className="src-t">進行中・完了試験</div>
                <Ext
                  href="https://clinicaltrials.gov/search?cond=occipital+nerve+block"
                  className="src-url"
                >
                  https://clinicaltrials.gov/search?cond=occipital+nerve+block
                </Ext>
              </div>
            </div>
          </section>

          {/* ============================================================ SECTION 17 */}
          <section id="s17" className="sec">
            <div className="sec-hd">
              <div className="sec-num">★</div>
              <h1 className="sec-title">まとめ — 初学者が押さえるべき10のポイント</h1>
            </div>

            <div className="onb-key-grid">
              <div className="onb-key">
                <div className="onb-key-n">1</div>
                <div className="onb-key-tx">
                  GONブロックは「局所麻酔」だが、効果は中枢（三叉頸椎複合体）レベルの調節により、局所麻酔薬の作用時間より
                  <strong>長く持続</strong>する。
                </div>
              </div>
              <div className="onb-key">
                <div className="onb-key-n">2</div>
                <div className="onb-key-tx">
                  <strong>SNOOP4 を必ず確認</strong>
                  してから実施。二次性頭痛の見逃しは致命的になりえる。
                </div>
              </div>
              <div className="onb-key">
                <div className="onb-key-n">3</div>
                <div className="onb-key-tx">
                  GON 注入点は「後頭動脈の拍動の<strong>直接内側</strong>」が目安。
                </div>
              </div>
              <div className="onb-key">
                <div className="onb-key-n">4</div>
                <div className="onb-key-tx">
                  注入前の<strong>逆吸引（aspiration）は必須</strong> — 動脈内注入回避。
                </div>
              </div>
              <div className="onb-key">
                <div className="onb-key-n">5</div>
                <div className="onb-key-tx">
                  片頭痛ではステロイド追加の上乗せ効果はない。<strong>群発頭痛・後頭神経痛</strong>
                  では追加推奨。
                </div>
              </div>
              <div className="onb-key">
                <div className="onb-key-n">6</div>
                <div className="onb-key-tx">
                  <strong>トリアムシノロンは使用しない</strong>
                  （脱毛・皮膚萎縮）。メチルプレドニゾロンまたはデキサメタゾンを選ぶ。
                </div>
              </div>
              <div className="onb-key">
                <div className="onb-key-n">7</div>
                <div className="onb-key-tx">
                  注入総量は片側<strong>最大4mL</strong>。両側ブロックでも過剰にならないよう注意。
                </div>
              </div>
              <div className="onb-key">
                <div className="onb-key-n">8</div>
                <div className="onb-key-tx">
                  エコーガイド下法（C2レベル）は<strong>100%の標的特異性</strong>
                  を持ち、難治例・解剖変変異例に推奨。
                </div>
              </div>
              <div className="onb-key">
                <div className="onb-key-n">9</div>
                <div className="onb-key-tx">
                  <strong>6ヶ月以内に3回以上</strong>必要なら代替・追加治療を強く検討。
                </div>
              </div>
              <div className="onb-key">
                <div className="onb-key-n">10</div>
                <div className="onb-key-tx">
                  GONブロックは単独治療ではなく、薬物療法・CGRP製剤・理学療法などとの
                  <strong>多モーダル統合の一部</strong>。
                </div>
              </div>
            </div>

            <div className="alert a-purple">
              <div className="alert-i">📋</div>
              <div>
                <strong>最終的な学術的免責事項：</strong>本資料のすべての情報は
                <strong>学術・教育・研究目的のみ</strong>
                を対象としています。後頭神経ブロックは侵襲的手技であり、適切な医学的トレーニング・設備・緊急対応体制なしに実施することは禁止されています。すべての臨床判断は、有資格医師による個別患者評価のもとで行われなければなりません。
              </div>
            </div>
          </section>
        </main>
      </div>

      {/* FOOTER */}
      <div className="footer">
        <strong>後頭神経ブロック（ONB）完全ガイド</strong> — 国際エビデンス（StatPearls 2025・VA/DoD
        2024・ICHD-3・EHF 2022）に基づく学術資料
        <br />📅 最終更新: 2025年7月版を反映 | 次回レビュー推奨: 主要RCT・ガイドライン改訂時
        <br />
        ⚠️
        本資料は学術・教育・研究目的のみを対象としています。臨床への適用は必ず資格を持つ医療専門家の監督のもとで行ってください。
      </div>
    </div>
  );
}
