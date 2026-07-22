import { Ext } from "@/components/Ext";
import MermaidDiagram from "@/components/MermaidDiagram";
import { ScgbSidebar } from "@/components/blocks/ScgbSidebar";
import "./superior-cervical-ganglion-block.css";

const SCGB_MERMAID_THEME: Record<string, string> = {
  primaryColor: "#0e8388",
  primaryTextColor: "#ffffff",
  primaryBorderColor: "#0d1b4c",
  lineColor: "#546e7a",
  secondaryColor: "#e0f2f1",
  secondaryTextColor: "#0d1b4c",
  secondaryBorderColor: "#0e8388",
  tertiaryColor: "#e8f5e9",
  tertiaryTextColor: "#0d1b4c",
  tertiaryBorderColor: "#2e7d32",
  textColor: "#0d1b4c",
  titleColor: "#0d1b4c",
  nodeTextColor: "#ffffff",
  edgeLabelBackground: "#ffffff",
  clusterBkg: "#f5f5f5",
  clusterTextColor: "#0d1b4c",
  fontSize: "13px",
};

export default function SuperiorCervicalGanglionBlockPage() {
  return (
    <div className="superior-cervical-ganglion-block">
      {/* HERO */}
      <div className="hero">
        <div style={{ fontSize: 40 }}>🧠</div>
        <h1>上頸神経節ブロック（Superior Cervical Ganglion Block）</h1>
        <p className="hero-sub">
          国際文献に基づくステップ・バイ・ステップ解説 — 初学者のための頸部交感神経ブロック講座
        </p>
        <div className="hero-tags">
          <span className="hero-tag">頭痛・顔面痛</span>
          <span className="hero-tag">頸部交感神経</span>
          <span className="hero-tag">超音波ガイド下手技</span>
          <span className="hero-tag">エビデンスに基づく医療</span>
          <span className="hero-tag">上頸神経節(SCG)</span>
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
        {/* SIDEBAR */}
        <ScgbSidebar />

        {/* MAIN CONTENT */}
        <main className="main">
          {/* SECTION 1 */}
          <section id="s1" className="sec">
            <div className="sec-hd">
              <div className="sec-num">1</div>
              <h2 className="sec-title">用語の整理：「上頚神経ブロック」とは</h2>
            </div>
            <div className="card">
              <p>
                日本語の臨床現場では「上頚神経ブロック」「上頚神経節ブロック」という表現が使われますが、正式名称は{" "}
                <strong>上頸神経節ブロック（Superior Cervical Ganglion Block: SCGB）</strong>{" "}
                です。頸部の交感神経節のうち、最も頭側（上方）にある「上頸神経節」を標的とするブロックを指します。
              </p>
              <div className="alert a-info">
                <div className="alert-i">ℹ️</div>
                <div>
                  初学者が混同しやすい類似手技を下表で整理します。名称が似ているため、カルテや文献を読む際は「標的となる神経節・神経」を必ず確認しましょう。
                </div>
              </div>
            </div>

            <div className="tbl">
              <table>
                <thead>
                  <tr>
                    <th>名称</th>
                    <th>標的</th>
                    <th>主な適応領域</th>
                    <th>備考</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <strong>上頸神経節ブロック</strong>（本資料の対象）
                    </td>
                    <td>上頸神経節（交感神経節、C2–C3高位）</td>
                    <td>顔面・頭部の痛み、頭痛、耳鳴りなど</td>
                    <td>星状神経節ブロックより頭側</td>
                  </tr>
                  <tr>
                    <td>星状神経節ブロック（Stellate Ganglion Block）</td>
                    <td>星状神経節（下頸神経節+Th1神経節、C6–C7高位）</td>
                    <td>顔・肩・上肢・上胸部の症状</td>
                    <td>日本で最も普及した交感神経節ブロック</td>
                  </tr>
                  <tr>
                    <td>頸神経叢ブロック（Cervical Plexus Block）</td>
                    <td>C1–C4頸神経前枝（体性神経）</td>
                    <td>頸動脈内膜剥離術、鎖骨骨折の鎮痛など</td>
                    <td>交感神経ではなく体性感覚神経が対象</td>
                  </tr>
                  <tr>
                    <td>頚椎神経根ブロック（Cervical Nerve Root Block）</td>
                    <td>頸椎の脊髄神経根</td>
                    <td>頸椎椎間板ヘルニア等による頸部〜上肢の疼痛</td>
                    <td>整形外科・脊椎領域で頻用</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="alert a-ok">
              <div className="alert-i">✅</div>
              <div>
                この整理は、上頸神経節と星状神経節を対比した国際文献の記載にも一致します<sup>[1]</sup>
                。本資料では以降「上頸神経節ブロック（SCGB）」という正式名称で統一して解説します。
              </div>
            </div>
          </section>

          {/* SECTION 2 */}
          <section id="s2" className="sec">
            <div className="sec-hd">
              <div className="sec-num">2</div>
              <h2 className="sec-title">頸部交感神経系の解剖</h2>
            </div>
            <div className="card">
              <p>
                頸部の交感神経幹には、通常
                <strong>
                  上頸神経節・中頸神経節・星状神経節（下頸神経節+Th1神経節が融合したもの）
                </strong>
                の3つの神経節が存在します<sup>[3][4]</sup>
                。中頸神経節は個体差があり、しばしば痕跡的、あるいは欠如することもあります。
              </p>
              <p>
                上頸神経節（SCG）は3つのうち<strong>最も大きく</strong>
                、紡錘形で長径10〜30mmとされ<sup>[5]</sup>
                、次のような位置関係にあります<sup>[1][2][6]</sup>。
              </p>
              <ul>
                <li>
                  高位：<strong>第2〜第3頸椎（C2–C3）横突起の前方</strong>
                  （上は下顎角のやや尾側、下は第4頸椎上縁まで及ぶことがある）
                </li>
                <li>
                  前後関係：<strong>総頸動脈分岐部のすぐ後方（深部）</strong>、
                  <strong>頭長筋（Longus capitis）の前方</strong>
                </li>
                <li>
                  内側性の関係：<strong>迷走神経の後内側</strong>に位置する
                </li>
                <li>
                  個体差：cadaver（献体）を用いた形態学的研究では、位置の個体差は比較的小さいと報告されている
                  <sup>[6]</sup>
                </li>
              </ul>
            </div>

            <div className="mmd">
              <div className="mmd-lbl">頸部交感神経幹の模式図（概念図・実寸ではありません）</div>
              <MermaidDiagram
                themeVariables={SCGB_MERMAID_THEME}
                chart={`flowchart TD
    SCG["上頸神経節 (SCG)\\nC2–C3椎体高位\\n最大の頸部交感神経節"]
    MCG["中頸神経節\\n存在しない例あり\\nC6高位"]
    SGB["星状神経節\\n(下頸神経節+Th1神経節)\\nC7高位"]
    SCG --- MCG --- SGB --- Thoracic["胸部交感神経幹へ連続"]
    SCG -- 節後線維 --> ICA_N["内頸動脈神経叢\\n頭蓋内血管・眼へ"]
    SCG -- 節後線維 --> ECA_N["外頸動脈神経叢\\n顔面・唾液腺へ"]
    SCG -- 節後線維 --> Pharynx["咽頭枝・心臓枝"]`}
              />
            </div>

            <div className="mmd">
              <div className="mmd-lbl">
                穿刺経路の位置関係（超音波ガイド下・in-plane法の概念図）
              </div>
              <MermaidDiagram
                themeVariables={SCGB_MERMAID_THEME}
                chart={`flowchart LR
    Skin["皮膚穿刺点\\n（プローブ外側 約1cm）"] --> SCM["胸鎖乳突筋"]
    SCM --> Sheath["頸動脈鞘\\n（内頸静脈・総頸動脈）"]
    Sheath --> Bif["総頸動脈分岐部\\n（超音波での重要な目印）"]
    Bif --> ICA["内頸動脈のすぐ後方"]
    ICA --> Target(("上頸神経節\\n（標的部位）"))
    Target --> LC["頭長筋\\n(Longus capitis)"]
    LC --> TP["頸椎横突起\\n（C2–C3）"]`}
              />
            </div>

            <div className="alert a-info">
              <div className="alert-i">📍</div>
              <div>
                <strong>ポイント</strong>
                ：総頸動脈が内頸動脈・外頸動脈に分岐する部位（carotid
                bifurcation）を超音波で同定することが、上頸神経節を安全かつ正確に見つけるための最重要ランドマークです
                <sup>[1][2]</sup>。
              </div>
            </div>
          </section>

          {/* SECTION 3 */}
          <section id="s3" className="sec">
            <div className="sec-hd">
              <div className="sec-num">3</div>
              <h2 className="sec-title">適応</h2>
            </div>
            <div className="card">
              <p>
                上頸神経節ブロックの適応は基本的に星状神経節ブロックと重なりますが、
                <strong>頭部・顔面に及ぼす影響がより明確</strong>であるとされています<sup>[4]</sup>
                。国際文献で報告されている主な適応は以下の通りです。
              </p>
              <div className="legend">
                <span className="tag bA">bA</span>十分なエビデンス（システマティックレビュー等）
                <span className="tag bB">bB</span>中等度（コホート・比較研究）
                <span className="tag bC">bC</span>限定的（症例集積・小規模後ろ向き研究）
                <span className="tag bU">bU</span>不明確／専門家意見レベル
              </div>
            </div>

            <div className="tbl">
              <table>
                <thead>
                  <tr>
                    <th>分類</th>
                    <th>具体的な病態・報告例</th>
                    <th>エビデンス</th>
                    <th>出典</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>顔面の神経障害性疼痛</td>
                    <td>
                      特発性顔面痛、外傷後三叉神経障害性疼痛、帯状疱疹後三叉神経障害性疼痛、舌痛症
                    </td>
                    <td>
                      <span className="bC">bC</span>
                    </td>
                    <td>[1]</td>
                  </tr>
                  <tr>
                    <td>頭痛性疾患</td>
                    <td>片頭痛発作（トリプタン製剤との併用）、後頭神経痛</td>
                    <td>
                      <span className="bB">bB</span>
                    </td>
                    <td>[1][10]</td>
                  </tr>
                  <tr>
                    <td>三叉神経・顔面痛</td>
                    <td>三叉神経痛、非定型顔面痛</td>
                    <td>
                      <span className="bC">bC</span>
                    </td>
                    <td>[4][9]</td>
                  </tr>
                  <tr>
                    <td>耳鼻科領域</td>
                    <td>治療抵抗性の耳鳴り</td>
                    <td>
                      <span className="bU">bU</span>
                    </td>
                    <td>[4]</td>
                  </tr>
                  <tr>
                    <td>脳血管攣縮関連</td>
                    <td>くも膜下出血後の脳血管攣縮・遅発性脳虚血</td>
                    <td>
                      <span className="bU">bU</span>
                    </td>
                    <td>[4]</td>
                  </tr>
                  <tr>
                    <td>その他報告例</td>
                    <td>微小血管虚血による外転神経麻痺の回復促進</td>
                    <td>
                      <span className="bU">bU</span>
                    </td>
                    <td>[4]</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="alert a-warn">
              <div className="alert-i">⚠️</div>
              <div>
                うつ症状への応用など、一部の適応は症例報告レベルの限定的なエビデンスであり<sup>[4]</sup>
                、標準治療としては確立していません。適応判断は個々の症例と施設のプロトコルに基づいて慎重に行う必要があります。
              </div>
            </div>
          </section>

          {/* SECTION 4 */}
          <section id="s4" className="sec">
            <div className="sec-hd">
              <div className="sec-num">4</div>
              <h2 className="sec-title">禁忌</h2>
            </div>
            <div className="card">
              <p>
                上頸神経節ブロックは頸動脈・頸静脈・脳神経に近接した部位を穿刺するため、以下のような禁忌・慎重投与が国際的なレビューで指摘されています
                <sup>[1][3][8]</sup>。
              </p>
            </div>

            <div className="tbl">
              <table className="th-red">
                <thead>
                  <tr>
                    <th>区分</th>
                    <th>禁忌・注意事項</th>
                    <th>理由</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <span className="tR">絶対的禁忌</span>
                    </td>
                    <td>局所麻酔薬に対するアレルギー</td>
                    <td>アナフィラキシー・局所麻酔薬中毒のリスク</td>
                  </tr>
                  <tr>
                    <td>
                      <span className="tR">絶対的禁忌</span>
                    </td>
                    <td>穿刺部位の感染・蜂窩織炎</td>
                    <td>感染の深部への波及リスク</td>
                  </tr>
                  <tr>
                    <td>
                      <span className="tR">絶対的禁忌</span>
                    </td>
                    <td>患者の同意が得られない、または体動制御が困難</td>
                    <td>血管損傷リスクの増大</td>
                  </tr>
                  <tr>
                    <td>
                      <span className="tO">相対的禁忌</span>
                    </td>
                    <td>抗凝固薬・抗血小板薬内服中、凝固異常</td>
                    <td>
                      致死的となりうる後咽頭血腫のリスク<sup>[7][8]</sup>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <span className="tO">相対的禁忌</span>
                    </td>
                    <td>対側の反回神経麻痺・声帯麻痺の既往</td>
                    <td>両側性声帯麻痺による気道閉塞リスク</td>
                  </tr>
                  <tr>
                    <td>
                      <span className="tO">相対的禁忌</span>
                    </td>
                    <td>横隔神経依存の呼吸状態（頸髄損傷等）</td>
                    <td>横隔神経遮断による呼吸抑制の懸念</td>
                  </tr>
                  <tr>
                    <td>
                      <span className="tO">相対的禁忌</span>
                    </td>
                    <td>重度の頸動脈狭窄・頸動脈手術直後</td>
                    <td>血管操作による血行動態への影響</td>
                  </tr>
                  <tr>
                    <td>
                      <span className="tO">相対的禁忌</span>
                    </td>
                    <td>妊娠</td>
                    <td>データが限られており、リスク・ベネフィットを個別に評価</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* SECTION 5 */}
          <section id="s5" className="sec">
            <div className="sec-hd">
              <div className="sec-num">5</div>
              <h2 className="sec-title">術前評価と準備</h2>
            </div>
            <div className="qr-grid">
              <div className="qr">
                <div className="qr-t">① 問診・診察</div>
                <p>
                  疼痛の性状・分布、既往歴（出血傾向、抗凝固薬内服、頸部手術歴）、アレルギー歴の確認
                </p>
              </div>
              <div className="qr">
                <div className="qr-t">② インフォームドコンセント</div>
                <p>
                  目的、期待される効果（ホルネル徴候が出ることを含む）、合併症のリスクを説明し同意を取得
                </p>
              </div>
              <div className="qr">
                <div className="qr-t">③ 画像・血液検査</div>
                <p>
                  必要に応じて凝固能検査、頸部の解剖学的異常（腫瘍、術後瘢痕）の評価
                </p>
              </div>
              <div className="qr">
                <div className="qr-t">④ モニタリング環境</div>
                <p>
                  血圧計、パルスオキシメーター、心電図モニター、救急蘇生薬剤（脂肪乳剤を含む）と気道確保器具をすぐ使える状態に
                </p>
              </div>
              <div className="qr">
                <div className="qr-t">⑤ 体位</div>
                <p>
                  患側を上にした側臥位、または仰臥位で頸部をやや伸展位に保持<sup>[1][9]</sup>
                </p>
              </div>
            </div>
          </section>

          {/* SECTION 6 */}
          <section id="s6" className="sec">
            <div className="sec-hd">
              <div className="sec-num">6</div>
              <h2 className="sec-title">手技：ステップ・バイ・ステップ（超音波ガイド下法）</h2>
            </div>
            <div className="card">
              <p>
                現在、国際文献で報告されている主流の手法は<strong>超音波ガイド下アプローチ</strong>
                です。以下は、代表的な報告<sup>[1][2]</sup>に基づく手順です。
              </p>
            </div>

            <div className="tbl">
              <table className="th-teal">
                <thead>
                  <tr>
                    <th>ステップ</th>
                    <th>内容</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>① 体位確保</td>
                    <td>患側を上にした側臥位（または仰臥位・頸部軽度伸展位）とする</td>
                  </tr>
                  <tr>
                    <td>② 消毒・清潔野作成</td>
                    <td>乳様突起から頸部にかけて広く消毒し、清潔野を作成する</td>
                  </tr>
                  <tr>
                    <td>③ プローブ走査</td>
                    <td>
                      高周波（6–13MHz程度）リニアプローブを頸部下方に横断的に当て、気管・食道・甲状腺を確認しながら外側へ走査する
                    </td>
                  </tr>
                  <tr>
                    <td>④ 血管の同定</td>
                    <td>
                      内頸静脈と総頸動脈をカラードプラで確認し、プローブを頭側へ移動して総頸動脈の分岐部（bifurcation）を描出する
                    </td>
                  </tr>
                  <tr>
                    <td>⑤ 目標構造の確認</td>
                    <td>分岐部のすぐ後方・頭長筋前方にある上頸神経節相当部位を同定する</td>
                  </tr>
                  <tr>
                    <td>⑥ 穿刺</td>
                    <td>
                      25G程度の穿刺針を、プローブ外側の刺入点からin-plane法（針全体を超音波画面上で見ながら進める方法）でリアルタイムに進める
                    </td>
                  </tr>
                  <tr>
                    <td>⑦ 針先の位置決め</td>
                    <td>内頸動脈の後方、頭長筋の前方まで針先を進める</td>
                  </tr>
                  <tr>
                    <td>⑧ 吸引テスト</td>
                    <td>注入前に必ず吸引を行い、血液の逆流がないことを確認する</td>
                  </tr>
                  <tr>
                    <td>⑨ 薬液注入</td>
                    <td>
                      局所麻酔薬（例：1%メピバカイン 2–3mL）を少量ずつ緩徐に注入する<sup>[1]</sup>
                    </td>
                  </tr>
                  <tr>
                    <td>⑩ モニタリング</td>
                    <td>
                      注入後は血圧を10分ごと、脈拍・SpO₂を持続的に約30分間モニタリングする<sup>[1]</sup>
                    </td>
                  </tr>
                  <tr>
                    <td>⑪ 効果判定</td>
                    <td>
                      注入後15〜30分でホルネル徴候（後述）の出現を確認する<sup>[1]</sup>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="mmd">
              <div className="mmd-lbl">手技全体のフローチャート</div>
              <MermaidDiagram
                themeVariables={SCGB_MERMAID_THEME}
                chart={`flowchart TD
    Start(["診察・適応確認"]) --> Consent{"禁忌なし・\\nインフォームドコンセント取得?"}
    Consent -- いいえ --> Stop1["実施を見合わせる"]
    Consent -- はい --> Position["体位確保\\n（患側を上にした側臥位）"]
    Position --> Prep["皮膚消毒・清潔野作成"]
    Prep --> Probe["高周波リニアプローブで\\n頸部を横断走査"]
    Probe --> Identify["総頸動脈と分岐部を同定"]
    Identify --> Needle["in-plane法で穿刺針を進める\\n（プローブ外側から刺入）"]
    Needle --> Target2["内頸動脈後方・頭長筋前方の\\n上頸神経節相当部位まで到達"]
    Target2 --> Aspirate{"吸引で血液の\\n逆流なし?"}
    Aspirate -- 逆流あり --> Reposition["針先を再調整"]
    Reposition --> Aspirate
    Aspirate -- 逆流なし --> Inject["局所麻酔薬を少量ずつ\\n緩徐に注入"]
    Inject --> Monitor["バイタルサイン監視\\n（血圧10分毎、SpO2/脈拍持続）"]
    Monitor --> Horner{"ホルネル徴候\\n（縮瞳・眼瞼下垂・発汗低下）出現?"}
    Horner -- 出現 --> Success["手技成功と判断"]
    Horner -- 非出現 --> Reassess["解剖学的な位置関係を再評価"]
    Success --> Observe["15–30分の経過観察後に\\n帰宅・転棟を判断"]`}
              />
            </div>
          </section>

          {/* SECTION 7 */}
          <section id="s7" className="sec">
            <div className="sec-hd">
              <div className="sec-num">7</div>
              <h2 className="sec-title">参考：古典的経口法（Transoral法）</h2>
            </div>
            <div className="card">
              <p>
                現在主流の超音波ガイド下法が普及する以前は、口腔内から「ストッパー」と呼ばれる器具を用いて針の進達距離を制限しながら盲目的に穿刺する
                <strong>経口法（transoral approach）</strong>が古典的な手技として報告されていました<sup>[2][4]</sup>
                。しかし、この方法は針先を標的から離れた位置にしか到達させられず、内頸動脈誤穿刺の懸念から局所麻酔薬の注入自体が禁忌とされていたほか、口腔内からの穿刺に伴う
                <strong>頭蓋頸部膿瘍の症例報告</strong>もあり<sup>[9]</sup>
                、感染リスクの観点からも現在ではほとんど用いられていません。
              </p>
              <div className="alert a-purple">
                <div className="alert-i">📜</div>
                <div>
                  2013年に発表された献体を用いた研究で超音波ガイド下アプローチの正確性（95%の成功率）が示されて以降
                  <sup>[2]</sup>
                  、超音波ガイド下法が事実上の標準となっています。
                </div>
              </div>
            </div>
          </section>

          {/* SECTION 8 */}
          <section id="s8" className="sec">
            <div className="sec-hd">
              <div className="sec-num">8</div>
              <h2 className="sec-title">効果判定：ホルネル徴候</h2>
            </div>
            <div className="card">
              <p>
                上頸神経節が正しくブロックされると、同側の交感神経遠心路が遮断され、
                <strong>ホルネル徴候（Horner&apos;s sign）</strong>
                と呼ばれる特徴的な所見が出現します。これは合併症ではなく、
                <strong>手技が成功したことを示す生理学的な指標</strong>として扱われます。
              </p>
            </div>

            <div className="tbl">
              <table>
                <thead>
                  <tr>
                    <th>徴候</th>
                    <th>機序</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>縮瞳（miosis）</td>
                    <td>瞳孔散大筋への交感神経支配の消失</td>
                  </tr>
                  <tr>
                    <td>眼瞼下垂（ptosis）</td>
                    <td>Müller筋（上眼瞼挙筋の一部）の機能低下</td>
                  </tr>
                  <tr>
                    <td>眼球陥凹様所見（enophthalmos様）</td>
                    <td>眼窩筋の緊張低下</td>
                  </tr>
                  <tr>
                    <td>顔面の発汗低下（anhidrosis）</td>
                    <td>汗腺への交感神経支配の消失</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="alert a-ok">
              <div className="alert-i">✅</div>
              <div>
                ある単施設の後方視的研究では、43回の手技すべてでホルネル徴候が確認されており（100%）<sup>[1]</sup>
                、これは解剖学的な位置の個体差が比較的小さいことの裏付けとしても言及されています
                <sup>[1][6]</sup>
                。ホルネル徴候は通常、局所麻酔薬の効果消退とともに数時間以内に自然軽快します。
              </div>
            </div>
          </section>

          {/* SECTION 9 */}
          <section id="s9" className="sec">
            <div className="sec-hd">
              <div className="sec-num">9</div>
              <h2 className="sec-title">合併症とその対応</h2>
            </div>

            <div className="tbl">
              <table className="th-orange">
                <thead>
                  <tr>
                    <th>合併症</th>
                    <th>内容</th>
                    <th>対応・備考</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>血管穿刺</td>
                    <td>総頸動脈・内頸動脈・内頸静脈・椎骨動脈の誤穿刺</td>
                    <td>圧迫止血、超音波でのリアルタイム観察により回避</td>
                  </tr>
                  <tr>
                    <td>
                      <span className="tR">後咽頭血腫</span>
                    </td>
                    <td>
                      まれだが気道閉塞に至り致死的となりうる合併症<sup>[7][8]</sup>
                    </td>
                    <td>頸部腫脹・呼吸困難出現時は直ちに気道評価と緊急対応</td>
                  </tr>
                  <tr>
                    <td>局所麻酔薬中毒（LAST）</td>
                    <td>血管内誤注入による痙攣・不整脈・心停止</td>
                    <td>
                      少量分割注入・頻回吸引で予防。ASRAのLASTチェックリストに準拠した蘇生対応を準備
                    </td>
                  </tr>
                  <tr>
                    <td>反回神経遮断</td>
                    <td>一過性の嗄声・嚥下違和感</td>
                    <td>通常自然軽快。遷延時は耳鼻科的評価</td>
                  </tr>
                  <tr>
                    <td>迷走神経・舌咽神経・舌下神経への波及</td>
                    <td>嚥下障害、咽頭違和感</td>
                    <td>一過性であることが多い</td>
                  </tr>
                  <tr>
                    <td>ホルネル徴候の遷延</td>
                    <td>通常は数時間で消退</td>
                    <td>遷延する場合は原因精査</td>
                  </tr>
                  <tr>
                    <td>感染・膿瘍</td>
                    <td>
                      特に経口法で報告例あり<sup>[9]</sup>
                    </td>
                    <td>無菌操作の徹底、超音波ガイド下法の選択で低減</td>
                  </tr>
                  <tr>
                    <td>横隔神経遮断（理論上）</td>
                    <td>呼吸機能への影響</td>
                    <td>呼吸予備能の低い患者では特に注意</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="mmd">
              <div className="mmd-lbl">合併症発生時の対応フロー（簡易版）</div>
              <MermaidDiagram
                themeVariables={SCGB_MERMAID_THEME}
                chart={`flowchart TD
    A["穿刺・注入中に異常所見"] --> B{"血管内注入や\\nLAST様症状の疑い?"}
    B -- あり --> C["直ちに注入中止\\n応援要請・気道/循環管理を開始"]
    C --> D["ASRA LASTチェックリストに\\n準拠した蘇生対応"]
    B -- なし --> E{"頸部腫脹・\\n血腫形成?"}
    E -- あり --> F["圧迫・気道評価\\n緊急コンサルト（麻酔科/耳鼻科）"]
    E -- なし --> G{"嗄声・嚥下障害など\\n神経症状?"}
    G -- あり --> H["経過観察\\n多くは自然軽快、遷延時は専門科紹介"]
    G -- なし --> I["通常の術後観察を継続"]`}
              />
            </div>
          </section>

          {/* SECTION 10 */}
          <section id="s10" className="sec">
            <div className="sec-hd">
              <div className="sec-num">10</div>
              <h2 className="sec-title">星状神経節ブロックとの違い</h2>
            </div>
            <div className="card">
              <p>
                初学者が最も混同しやすいのが星状神経節ブロックとの違いです。国際文献での位置づけを整理すると以下のようになります<sup>[1][4]</sup>。
              </p>
            </div>

            <div className="tbl">
              <table className="th-purple">
                <thead>
                  <tr>
                    <th>比較項目</th>
                    <th>上頸神経節ブロック（SCGB）</th>
                    <th>星状神経節ブロック（SGB）</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>標的神経節</td>
                    <td>上頸神経節（3神経節中最大）</td>
                    <td>星状神経節（下頸神経節+Th1神経節）</td>
                  </tr>
                  <tr>
                    <td>穿刺高位</td>
                    <td>C2–C3付近（総頸動脈分岐部）</td>
                    <td>C6（またはC7）付近</td>
                  </tr>
                  <tr>
                    <td>主な適応</td>
                    <td>頭部・顔面の疼痛、頭痛、耳鳴りなど</td>
                    <td>顔・肩・上肢・上胸部の疼痛、CRPS等</td>
                  </tr>
                  <tr>
                    <td>血管損傷リスクの特徴</td>
                    <td>内頸動脈・内頸静脈に近接</td>
                    <td>
                      椎骨動脈・甲状腺動脈損傷による後咽頭血腫が特に問題視される<sup>[7][8]</sup>
                    </td>
                  </tr>
                  <tr>
                    <td>普及度</td>
                    <td>限定的（専門施設中心）</td>
                    <td>広く普及、症例数・エビデンスも豊富</td>
                  </tr>
                  <tr>
                    <td>歴史的アプローチ</td>
                    <td>経口法（現在は非推奨）</td>
                    <td>気管傍・傍矢状アプローチ</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* SECTION 11 */}
          <section id="s11" className="sec">
            <div className="sec-hd">
              <div className="sec-num">11</div>
              <h2 className="sec-title">国際文献のエビデンスまとめ</h2>
            </div>
            <div className="card">
              <p>上頸神経節ブロックに関する主要な国際文献の到達点を、時系列に沿って整理します。</p>
              <ul>
                <li>
                  <strong>
                    2013年（<em>Pain Medicine</em>誌）
                  </strong>{" "}
                  <span className="bB">bB</span>
                  ：Siegenthalerらは献体を用いた研究で、超音波ガイド下アプローチにより上頸神経節への到達精度が高い（20穿刺中19穿刺が成功）ことを示し、従来の盲目的経口法に代わる手法の礎を築きました
                  <sup>[2]</sup>。
                </li>
                <li>
                  <strong>
                    2023年（<em>JA Clinical Reports</em>誌）
                  </strong>{" "}
                  <span className="bC">bC</span>
                  ：Maedaらは単施設での後方視的コホート研究（患者10名、43手技）を報告し、全手技でホルネル徴候が確認され、疼痛スコアが有意に改善したこと、重大な有害事象が観察されなかったことを示しました
                  <sup>[1]</sup>
                  。ただし単施設・少数例・対照群なしという限界も明記されています。
                </li>
                <li>
                  <strong>
                    2025年（<em>Frontiers in Pain Research</em>誌）
                  </strong>{" "}
                  <span className="bB">bB</span>
                  ：片頭痛発作に対し、トリプタン製剤単独群とトリプタン+超音波ガイド下上頸神経節ブロック併用群を傾向スコアマッチングで比較した後方視的・前向き混合コホート研究では、併用群でより高い疼痛緩和効果が示唆されています
                  <sup>[10]</sup>
                  。ただし無作為化比較試験ではない点に留意が必要です。
                </li>
                <li>
                  <strong>合併症に関するエビデンス</strong>{" "}
                  <span className="bU">bU</span>
                  ：上頸神経節ブロックに特化した大規模な合併症データベースは現時点で乏しく、多くの安全性に関する議論は、より症例数の多い星状神経節ブロックの系統的レビュー
                  <sup>[8]</sup>や後咽頭血腫の解析<sup>[7]</sup>から類推されています。
                </li>
              </ul>
            </div>

            <div className="alert a-info">
              <div className="alert-i">🔎</div>
              <div>
                <strong>総合的な評価</strong>
                ：上頸神経節ブロックは、解剖学的に到達可能で、超音波ガイド下では比較的安全に実施しうる手技であることが複数の国際文献で示されています。一方で、エビデンスの大部分は少数例・単施設・後方視的研究にとどまり、大規模な無作為化比較試験は現時点で確立していません。そのため、標準治療というよりは
                <strong>専門的な疼痛管理を行う施設における補助的・二次的治療選択肢</strong>
                として位置づけるのが、現時点の文献に忠実な理解といえます。
              </div>
            </div>
          </section>

          {/* SECTION 12 */}
          <section id="s12" className="sec">
            <div className="sec-hd">
              <div className="sec-num">12</div>
              <h2 className="sec-title">まとめ</h2>
            </div>

            <div className="qr-grid">
              <div className="qr">
                <div className="qr-t">正式名称</div>
                <p>
                  「上頚神経ブロック」は正式には<strong>上頸神経節ブロック（SCGB）</strong>
                  であり、星状神経節ブロックや頸神経叢ブロックとは標的も適応も異なる
                </p>
              </div>
              <div className="qr">
                <div className="qr-t">標的の位置</div>
                <p>
                  上頸神経節は<strong>C2–C3高位・総頸動脈分岐部の後方・頭長筋前方</strong>
                  に位置する
                </p>
              </div>
              <div className="qr">
                <div className="qr-t">標準アプローチ</div>
                <p>
                  現在の標準は<strong>超音波ガイド下・in-plane法</strong>
                  であり、古典的経口法は感染・血管損傷リスクから推奨されない
                </p>
              </div>
              <div className="qr">
                <div className="qr-t">主な適応</div>
                <p>
                  主に<strong>頭部・顔面の神経障害性疼痛、頭痛性疾患</strong>など
                </p>
              </div>
              <div className="qr">
                <div className="qr-t">成功の指標</div>
                <p>
                  <strong>ホルネル徴候</strong>（縮瞳・眼瞼下垂・発汗低下）
                </p>
              </div>
              <div className="qr">
                <div className="qr-t">最大の安全上の懸念</div>
                <p>
                  <strong>血管損傷とそれに伴う後咽頭血腫</strong>
                  であり、少量分割注入と頻回の吸引確認が重要
                </p>
              </div>
              <div className="qr">
                <div className="qr-t">エビデンスの現状</div>
                <p>
                  蓄積されつつあるが、<strong>大規模無作為化比較試験は未確立</strong>
                  であり、専門施設での実施が前提
                </p>
              </div>
            </div>
          </section>

          {/* SECTION 13 */}
          <section id="s13" className="sec">
            <div className="sec-hd">
              <div className="sec-num">13</div>
              <h2 className="sec-title">参考文献（一次情報源）</h2>
            </div>

            <div className="src-grid">
              <div className="src">
                <div className="src-org">JA Clinical Reports (2023)</div>
                <div className="src-t">
                  [1] Maeda A, Chikama Y, Tanaka R, Tominaga M, Shirozu K, Yamaura K. Safety and
                  utility of ultrasound-guided superior cervical ganglion block for headaches and
                  orofacial pain: a retrospective, single-center study of 10 patients.
                </div>
                <div className="src-url">
                  <Ext href="https://doi.org/10.1186/s40981-023-00613-z">
                    https://doi.org/10.1186/s40981-023-00613-z
                  </Ext>
                </div>
              </div>
              <div className="src">
                <div className="src-org">Pain Medicine (2013)</div>
                <div className="src-t">
                  [2] Siegenthaler A, Haug M, Eichenberger U, Suter MR, Moriggl B. Block of the
                  Superior Cervical Ganglion, Description of a Novel Ultrasound-Guided Technique in
                  Human Cadavers.
                </div>
                <div className="src-url">
                  <Ext href="https://pubmed.ncbi.nlm.nih.gov/23438374/">
                    https://pubmed.ncbi.nlm.nih.gov/23438374/
                  </Ext>
                </div>
              </div>
              <div className="src">
                <div className="src-org">Regional Anesthesia and Pain Medicine (2017)</div>
                <div className="src-t">
                  [3] Baig S, Moon JY, Shankar H. Review of Sympathetic Blocks: Anatomy,
                  Sonoanatomy, Evidence, and Techniques.
                </div>
                <div className="src-url">
                  <Ext href="https://pubmed.ncbi.nlm.nih.gov/28272291/">
                    https://pubmed.ncbi.nlm.nih.gov/28272291/
                  </Ext>
                </div>
              </div>
              <div className="src">
                <div className="src-org">Springer, Cham (2022)</div>
                <div className="src-t">
                  [4] Tumber P, Jankovic D. Cervical Sympathetic Chain and Superior Cervical
                  Ganglion Block. In: Jankovic D, Peng P, eds. Regional Nerve Blocks in Anesthesia
                  and Pain Therapy.
                </div>
                <div className="src-url">
                  <Ext href="https://link.springer.com/chapter/10.1007/978-3-030-88727-8_12">
                    https://link.springer.com/chapter/10.1007/978-3-030-88727-8_12
                  </Ext>
                </div>
              </div>
              <div className="src">
                <div className="src-org">Anesthesia &amp; Analgesia (2012)</div>
                <div className="src-t">
                  [5] Wisco JJ, Stark ME, Safir I, Rahman S. A heat map of superior cervical
                  ganglion location relative to the common carotid artery bifurcation.
                </div>
                <div className="src-url">
                  <Ext href="https://doi.org/10.1213/ANE.0b013e31823b676d">
                    https://doi.org/10.1213/ANE.0b013e31823b676d
                  </Ext>
                </div>
              </div>
              <div className="src">
                <div className="src-org">Brain and Behavior (2017)</div>
                <div className="src-t">
                  [6] Mitsuoka K, Kikutani T, Sato I. Morphological relationship between the
                  superior cervical ganglion and cervical nerves in Japanese cadaver donors.
                </div>
                <div className="src-url">
                  <Ext href="https://doi.org/10.1002/brb3.619">
                    https://doi.org/10.1002/brb3.619
                  </Ext>
                </div>
              </div>
              <div className="src">
                <div className="src-org">Anesthesiology (2006)</div>
                <div className="src-t">
                  [7] Higa K, Hirata K, Hirota K, Nitahara K, Shono S. Retropharyngeal hematoma
                  after stellate ganglion block: analysis of 27 patients reported in the
                  literature.
                </div>
                <div className="src-url">
                  <Ext href="https://doi.org/10.1097/00000542-200612000-00024">
                    https://doi.org/10.1097/00000542-200612000-00024
                  </Ext>
                </div>
              </div>
              <div className="src">
                <div className="src-org">Regional Anesthesia and Pain Medicine (2019)</div>
                <div className="src-t">
                  [8] Goel V, Patwardhan AM, Ibrahim M, Howe CL, Schultz DM, Shankar H.
                  Complications associated with stellate ganglion nerve block: a systematic review.
                </div>
                <div className="src-url">
                  <Ext href="https://pubmed.ncbi.nlm.nih.gov/30992414/">
                    https://pubmed.ncbi.nlm.nih.gov/30992414/
                  </Ext>
                </div>
              </div>
              <div className="src">
                <div className="src-org">Case Reports in Medicine (2018)</div>
                <div className="src-t">
                  [9] Sproll C, Turowski B, Depprich R, Kübler NR, Rapp M, Lommen J, Holtmann H.
                  Extensive craniocervical abscess after transoral ganglionic local opioid
                  analgesia at the superior cervical ganglion for atypical trigeminal neuralgia.
                </div>
                <div className="src-url">
                  <Ext href="https://doi.org/10.1155/2018/5247594">
                    https://doi.org/10.1155/2018/5247594
                  </Ext>
                </div>
              </div>
              <div className="src">
                <div className="src-org">Frontiers in Pain Research (2025)</div>
                <div className="src-t">
                  [10] Ultrasound-guided block of the superior cervical ganglion for migraine
                  attacks: a propensity score-matched retrospective study.
                </div>
                <div className="src-url">
                  <Ext href="https://www.frontiersin.org/journals/pain-research/articles/10.3389/fpain.2025.1556654/full">
                    https://www.frontiersin.org/journals/pain-research/articles/10.3389/fpain.2025.1556654/full
                  </Ext>
                </div>
              </div>
              <div className="src">
                <div className="src-org">Cephalalgia (2018)</div>
                <div className="src-t">
                  [11] Headache Classification Committee of the International Headache Society (IHS).
                  The International Classification of Headache Disorders, 3rd edition.
                </div>
                <div className="src-url">
                  <Ext href="https://doi.org/10.1177/0333102417738202">
                    https://doi.org/10.1177/0333102417738202
                  </Ext>
                </div>
              </div>
              <div className="src">
                <div className="src-org">NYSORA</div>
                <div className="src-t">
                  [12]
                  頸神経叢を理解する：解剖学、ブロック、臨床的関連性（頸部筋膜・頸神経叢の解剖に関する背景情報として参照）
                </div>
                <div className="src-url">
                  <Ext href="https://www.nysora.com/ja/%E6%95%99%E8%82%B2%E3%83%8B%E3%83%A5%E3%83%BC%E3%82%B9/%E9%A0%B8%E7%A5%9E%E7%B5%8C%E5%8F%A2%E3%83%96%E3%83%AD%E3%83%83%E3%82%AF%E3%81%AE%E3%83%92%E3%83%B3%E3%83%88-2/">
                    https://www.nysora.com/ja/...頸神経叢ブロックのヒント-2/
                  </Ext>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>

      {/* FOOTER */}
      <div className="footer">
        <strong>上頸神経節ブロック（Superior Cervical Ganglion Block）</strong> —
        国際文献に基づくステップ・バイ・ステップ解説
        <br />
        📅 作成年: 2026 | 次回レビュー推奨: ガイドライン更新時
        <br />
        ⚠️
        本資料は学術・教育・研究目的のみを対象としています。臨床への適用は必ず資格を持つ医療専門家の監督のもとで行ってください。
      </div>
    </div>
  );
}
