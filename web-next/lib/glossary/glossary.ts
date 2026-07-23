import { type GlossaryTerm, validateGlossary } from "./types";

/**
 * 専門用語の用語集（宣言的レジストリ）。
 *
 * - 各エントリは Term コンポーネント（components/glossary/Term.tsx）と
 *   /anatomy・主要ガイドページのツールチップから参照される。
 * - plain は「分かりやすい」言い換えを基準にする。reading はひらがな。
 * - 新しい画面へ展開する際は語を追記する（手順は .claude/skills/glossary-term-tooltip/SKILL.md）。
 */
const TERMS: GlossaryTerm[] = [
  // --- /anatomy の解剖構造（hotspot 由来）---
  {
    id: "gon",
    term: "大後頭神経",
    reading: "だいこうとうしんけい",
    plain: "後頭部（頭の後ろ）の皮膚の感覚を脳に伝える神経。首の上の方（C2）から出ています。",
  },
  {
    id: "trigeminal-nerve",
    term: "三叉神経",
    reading: "さんさしんけい",
    plain: "顔やおでこ、目のまわりの感覚を脳に伝える、頭で最も大きな神経。頭痛と深く関わります。",
  },
  {
    id: "vertebral-artery",
    term: "椎骨動脈",
    reading: "ついこつどうみゃく",
    plain: "首の骨の中を通って、脳の後ろ側へ血液（酸素や栄養）を送る太い血管。",
  },
  {
    id: "tcc",
    term: "三叉頚椎複合体",
    reading: "さんさけいついふくごうたい",
    plain:
      "顔の神経（三叉神経）と首の神経の信号が、脳幹で合流する場所。首の痛みが頭痛として感じられる理由のひとつ。",
  },
  {
    id: "c1-c2",
    term: "環軸関節",
    reading: "かんじくかんせつ",
    plain: "首の一番上にある関節（C1とC2の骨の間）。首を左右に回す動きの中心になります。",
  },
  {
    id: "suboccipital",
    term: "後頭下筋群",
    reading: "こうとうかきんぐん",
    plain: "後頭部の深いところにある小さな筋肉の集まり。頭を支え、こると頭痛の原因になります。",
  },
  // --- 頭痛のメカニズム・主要用語 ---
  {
    id: "cgrp",
    term: "CGRP",
    reading: "シージーアールピー",
    plain:
      "神経から出るタンパク質の一種。血管を広げて痛みを強めるため、片頭痛を起こす引き金として注目されています。",
  },
  {
    id: "aura",
    term: "前兆",
    reading: "ぜんちょう",
    plain:
      "頭痛が始まる前に出るサイン。ギザギザの光が見える、視界の一部が欠けるなど、目の症状が多いです。",
  },
  {
    id: "cortical-spreading-depression",
    term: "皮質拡延性抑制",
    reading: "ひしつかくえんせいよくせい",
    plain:
      "脳の表面を、神経の活動を抑える波がゆっくり広がる現象。片頭痛の前兆の正体だと考えられています。",
  },
  {
    id: "central-sensitization",
    term: "中枢性感作",
    reading: "ちゅうすうせいかんさ",
    plain: "脳や脊髄が痛みに敏感になりすぎた状態。弱い刺激でも強い痛みに感じてしまいます。",
  },
  {
    id: "allodynia",
    term: "アロディニア",
    reading: "あろでぃにあ",
    plain:
      "普通なら痛くない刺激（髪をとかす、メガネをかける等）でも痛みを感じる状態。痛みに敏感になっているサイン。",
  },
  {
    id: "serotonin",
    term: "セロトニン",
    reading: "せろとにん",
    plain:
      "脳の中で気分や血管・痛みを調整する物質。量のバランスが崩れると頭痛に関わると考えられています。",
  },
  {
    id: "moh",
    term: "薬物乱用頭痛",
    reading: "やくぶつらんようずつう",
    plain:
      "頭痛薬を使いすぎることで、かえって頭痛が増えてしまう状態。月に10〜15日以上の服用が続くと起こりやすいです。",
  },
  // --- 筋・首に関わる用語 ---
  {
    id: "myofascial",
    term: "筋膜",
    reading: "きんまく",
    plain:
      "筋肉を包んでいる薄い膜。ここが硬くなったり傷ついたりすると、こりや痛みの原因になります。",
  },
  {
    id: "trigger-point",
    term: "トリガーポイント",
    reading: "とりがーぽいんと",
    plain:
      "筋肉の中にできる、押すと強く痛むしこり。離れた場所に痛みを飛ばすこと（関連痛）があります。",
  },
  {
    id: "acupoint",
    term: "経穴",
    reading: "けいけつ",
    plain:
      "東洋医学で「ツボ」と呼ばれる場所。体の中のエネルギー（気・血）が通る経路（経絡）の上にあります。",
  },
  {
    id: "referred-pain",
    term: "関連痛",
    reading: "かんれんつう",
    plain:
      "痛みの原因がある場所とは別のところに感じる痛み。首のこりが頭の痛みとして感じられるのが例です。",
  },
  {
    id: "occipital-nerve",
    term: "後頭神経",
    reading: "こうとうしんけい",
    plain: "後頭部の感覚を伝える神経。首の付け根から出ていて、頸原性頭痛と関わります。",
  },
  // --- 頭痛の種類 ---
  {
    id: "migraine",
    term: "片頭痛",
    reading: "へんずつう",
    plain:
      "ズキンズキンと脈打つように痛む頭痛。光や音に敏感になり、吐き気をともなうこともあります。",
  },
  {
    id: "tension-type-headache",
    term: "緊張型頭痛",
    reading: "きんちょうがたずつう",
    plain:
      "頭全体がしめつけられるように痛む、最もよくある頭痛。首や肩のこり・ストレスが関係します。",
  },
  {
    id: "cervicogenic-headache",
    term: "頸原性頭痛",
    reading: "けいげんせいずつう",
    plain: "首の関節や筋肉の問題が原因で起こる頭痛。多くは後頭部から片側に広がります。",
  },
  {
    id: "cluster-headache",
    term: "群発頭痛",
    reading: "ぐんぱつずつう",
    plain: "片目の奥がえぐられるように激しく痛む頭痛が、一定期間に集中して起こるタイプ。",
  },
  {
    id: "chronic-migraine",
    term: "慢性片頭痛",
    reading: "まんせいへんずつう",
    plain: "1か月のうち15日以上、頭痛がある状態が続く片頭痛。",
  },
  {
    id: "secondary-headache",
    term: "二次性頭痛",
    reading: "にじせいずつう",
    plain: "病気やけがなど、別の原因によって引き起こされる頭痛。",
  },
  {
    id: "primary-headache",
    term: "一次性頭痛",
    reading: "いちじせいずつう",
    plain: "原因となる別の病気がなく、頭痛そのものが主役のタイプ（片頭痛・緊張型頭痛など）。",
  },
  {
    id: "rebound-headache",
    term: "反跳性頭痛",
    reading: "はんちょうせいずつう",
    plain: "薬の効果が切れたときに、はね返るように起こる頭痛。",
  },
  {
    id: "moh-overuse",
    term: "薬剤過用頭痛",
    reading: "やくざいかようずつう",
    plain: "頭痛薬を使いすぎることで、かえって頭痛が増えてしまう状態（薬物乱用頭痛と同じ）。",
  },
  // --- 病態・生理 ---
  {
    id: "trigeminovascular",
    term: "三叉神経血管説",
    reading: "さんさしんけいけっかんせつ",
    plain: "片頭痛は三叉神経と血管のはたらきの異常で起こる、という有力な考え方。",
  },
  {
    id: "trigeminocervical-complex-2",
    term: "三叉神経頸髄複合体",
    reading: "さんさしんけいけいずいふくごうたい",
    plain: "顔の神経と首の神経の信号が脳幹で合流する場所。首の痛みが頭に響く理由のひとつ。",
  },
  {
    id: "peripheral-sensitization",
    term: "末梢感作",
    reading: "まっしょうかんさ",
    plain: "痛みを受け取る末端の神経が、刺激に敏感になりすぎた状態。",
  },
  {
    id: "central-sensitization-alt",
    term: "中枢感作",
    reading: "ちゅうすうかんさ",
    plain: "脳や脊髄が痛みに敏感になりすぎた状態。弱い刺激でも強く痛みを感じる。",
  },
  {
    id: "descending-pain-inhibition",
    term: "下行性疼痛抑制",
    reading: "かこうせいとうつうよくせい",
    plain: "脳から脊髄へ信号を送り、痛みをやわらげる体のしくみ。",
  },
  {
    id: "photophobia",
    term: "光過敏",
    reading: "ひかりかびん",
    plain: "光をまぶしく不快に感じること。片頭痛の発作中によく起こる。",
  },
  {
    id: "phonophobia",
    term: "音過敏",
    reading: "おとかびん",
    plain: "音を不快に強く感じること。片頭痛の発作中によく起こる。",
  },
  {
    id: "scintillating-scotoma",
    term: "閃輝暗点",
    reading: "せんきあんてん",
    plain: "視界にギザギザ光る模様が現れ、その部分が見えにくくなる前兆。",
  },
  {
    id: "prodrome",
    term: "前駆期",
    reading: "ぜんくき",
    plain: "頭痛が始まる前に出る予兆の時期。あくび・気分の変化・食欲の変化など。",
  },
  {
    id: "postdrome",
    term: "後発期",
    reading: "こうはつき",
    plain: "頭痛が治まった後に、だるさや集中しにくさが残る時期。",
  },
  {
    id: "estrogen",
    term: "エストロゲン",
    reading: "えすとろげん",
    plain: "女性ホルモンの一種。量が大きく変わると片頭痛が起こりやすくなることがある。",
  },
  // --- 解剖（追加）---
  {
    id: "lesser-occipital-nerve",
    term: "小後頭神経",
    reading: "しょうこうとうしんけい",
    plain: "耳の後ろあたりの感覚を伝える神経。",
  },
  {
    id: "third-occipital-nerve",
    term: "第三後頭神経",
    reading: "だいさんこうとうしんけい",
    plain: "首の上部（C3）から出て、後頭部の感覚に関わる神経。",
  },
  {
    id: "stellate-ganglion",
    term: "星状神経節",
    reading: "せいじょうしんけいせつ",
    plain: "首の付け根にある自律神経のかたまり。顔や腕の血流などを調整する。",
  },
  {
    id: "cervical-plexus",
    term: "頚神経叢",
    reading: "けいしんけいそう",
    plain: "首の神経が網の目のように集まった部分。首や肩の感覚に関わる。",
  },
  {
    id: "superficial-cervical-plexus",
    term: "浅頚神経叢",
    reading: "せんけいしんけいそう",
    plain: "首の皮膚の感覚を担当する、浅い位置にある神経の集まり。",
  },
  {
    id: "deep-cervical-plexus",
    term: "深頚神経叢",
    reading: "しんけいしんけいそう",
    plain: "首の深い筋肉などを支配する、深い位置にある神経の集まり。",
  },
  {
    id: "cervical-spine",
    term: "頸椎",
    reading: "けいつい",
    plain: "首の部分の背骨。7個の骨が積み重なってできている。",
  },
  {
    id: "sternocleidomastoid",
    term: "胸鎖乳突筋",
    reading: "きょうさにゅうとつきん",
    plain: "首の前側にある大きな筋肉。頭を回したり傾けたりするときに働く。",
  },
  {
    id: "trapezius",
    term: "僧帽筋",
    reading: "そうぼうきん",
    plain: "首から肩・背中の上部に広がる大きな筋肉。こりやすく頭痛と関係する。",
  },
  {
    id: "pericranial-tenderness",
    term: "頭蓋周囲圧痛",
    reading: "ずがいしゅういあっつう",
    plain: "頭のまわりの筋肉を押すと痛む状態。緊張型頭痛の特徴のひとつ。",
  },
  // --- 神経ブロック・手技 ---
  {
    id: "nerve-block",
    term: "神経ブロック",
    reading: "しんけいぶろっく",
    plain: "痛みを伝える神経に薬を効かせて、痛みをやわらげる治療。",
  },
  {
    id: "occipital-nerve-block",
    term: "後頭神経ブロック",
    reading: "こうとうしんけいぶろっく",
    plain: "後頭神経に局所麻酔を注射して、後頭部の頭痛をやわらげる治療。",
  },
  {
    id: "stellate-ganglion-block",
    term: "星状神経節ブロック",
    reading: "せいじょうしんけいせつぶろっく",
    plain: "首の自律神経のかたまりに麻酔をして、血流や痛みを整える治療。",
  },
  {
    id: "cervical-plexus-block",
    term: "頚神経叢ブロック",
    reading: "けいしんけいそうぶろっく",
    plain: "首の神経の集まりに局所麻酔をする治療。",
  },
  {
    id: "local-anesthetic",
    term: "局所麻酔薬",
    reading: "きょくしょますいやく",
    plain: "注射した場所の感覚を一時的に麻痺させる薬。",
  },
  {
    id: "ultrasound-guided",
    term: "超音波ガイド",
    reading: "ちょうおんぱがいど",
    plain: "超音波の画像で位置を確認しながら、安全に注射する方法。",
  },
  {
    id: "horner-syndrome",
    term: "ホルネル症候群",
    reading: "ほるねるしょうこうぐん",
    plain: "片側のまぶたが下がり瞳が小さくなる、自律神経の一時的な変化。",
  },
  {
    id: "last",
    term: "LAST",
    reading: "ラスト",
    plain: "局所麻酔薬が血液に入りすぎて全身に悪影響が出る状態（局所麻酔中毒）。",
  },
  {
    id: "phrenic-nerve-palsy",
    term: "横隔膜麻痺",
    reading: "おうかくまくまひ",
    plain: "呼吸を助ける横隔膜の動きが一時的に弱くなること。",
  },
  // --- 評価尺度・分類 ---
  {
    id: "ichd3",
    term: "ICHD-3",
    reading: "アイシーエイチディースリー",
    plain: "国際頭痛分類 第3版。世界共通で使われる頭痛の診断基準。",
  },
  {
    id: "snoop4",
    term: "SNOOP4",
    reading: "スヌープフォー",
    plain: "危険な二次性頭痛を見逃さないための警告サインの覚え方（頭文字）。",
  },
  {
    id: "hit6",
    term: "HIT-6",
    reading: "ヒットシックス",
    plain: "頭痛が生活にどれだけ影響しているかを6つの質問で測るテスト。",
  },
  {
    id: "midas",
    term: "MIDAS",
    reading: "マイダス",
    plain: "過去3か月で頭痛のために生活がどれだけ妨げられたかを測る指標。",
  },
  {
    id: "msq",
    term: "MSQ",
    reading: "エムエスキュー",
    plain: "片頭痛が生活の質にどう影響するかを測る、片頭痛専用の質問票。",
  },
  {
    id: "pgic",
    term: "PGIC",
    reading: "ピージーアイシー",
    plain: "治療の前後で全体的にどれくらい良くなったかを、患者自身が評価する指標。",
  },
  {
    id: "nrs",
    term: "NRS",
    reading: "エヌアールエス",
    plain: "痛みの強さを0〜10の数字で答えてもらう評価方法。",
  },
  {
    id: "vas",
    term: "VAS",
    reading: "ブイエーエス",
    plain: "痛みの強さを1本の直線上の位置で示してもらう評価方法。",
  },
  {
    id: "mcid",
    term: "MCID",
    reading: "エムシーアイディー",
    plain: "患者が「良くなった」と実感できる、意味のある最小の変化量。",
  },
  {
    id: "pro",
    term: "PRO",
    reading: "ピーアールオー",
    plain: "患者本人が自分の症状や状態を報告した情報（患者報告アウトカム）。",
  },
  {
    id: "qol",
    term: "QOL",
    reading: "キューオーエル",
    plain: "生活の質。どれだけ快適で充実した暮らしができているかを表す考え方。",
  },
  {
    id: "red-flag",
    term: "レッドフラッグ",
    reading: "れっどふらっぐ",
    plain: "重い病気が隠れているかもしれない、見逃してはいけない危険な症状のサイン。",
  },
  {
    id: "side-locked",
    term: "側方固定性",
    reading: "そくほうこていせい",
    plain: "いつも決まった片側だけに起こる痛みのこと。",
  },
  {
    id: "prevalence",
    term: "有病率",
    reading: "ゆうびょうりつ",
    plain: "ある時点で、その病気を持っている人の割合。",
  },
  {
    id: "contraindication",
    term: "禁忌",
    reading: "きんき",
    plain: "してはいけないこと。その人に使うと危険なため避けるべき薬や治療。",
  },
  // --- 薬剤・治療 ---
  {
    id: "triptan",
    term: "トリプタン",
    reading: "とりぷたん",
    plain: "片頭痛の発作時に使う、痛みを抑える代表的な治療薬。",
  },
  {
    id: "nsaids",
    term: "NSAIDs",
    reading: "エヌセイズ",
    plain: "炎症と痛みをやわらげる薬の総称（ロキソニン・イブプロフェンなど）。",
  },
  {
    id: "acetaminophen",
    term: "アセトアミノフェン",
    reading: "あせとあみのふぇん",
    plain: "熱や痛みをやわらげる、比較的おだやかな鎮痛薬。",
  },
  {
    id: "gepant",
    term: "ゲパント",
    reading: "げぱんと",
    plain: "CGRPの働きを受容体でブロックする、新しいタイプの片頭痛の飲み薬。",
  },
  {
    id: "anti-cgrp-antibody",
    term: "抗CGRP抗体",
    reading: "こうシージーアールピーこうたい",
    plain: "CGRPの働きを抑える、注射タイプの片頭痛の予防薬。",
  },
  {
    id: "botox",
    term: "ボトックス",
    reading: "ぼとっくす",
    plain: "筋肉の過剰な緊張を抑える注射。慢性片頭痛の予防に使われる。",
  },
  {
    id: "amitriptyline",
    term: "アミトリプチリン",
    reading: "あみとりぷちりん",
    plain: "もとは抗うつ薬だが、頭痛の予防にも使われる薬。",
  },
  {
    id: "topiramate",
    term: "トピラマート",
    reading: "とぴらまーと",
    plain: "もとはてんかんの薬だが、片頭痛の予防にも使われる薬。",
  },
  {
    id: "valproate",
    term: "バルプロ酸",
    reading: "ばるぷろさん",
    plain: "てんかんや片頭痛の予防に使われる薬。",
  },
  {
    id: "cbt",
    term: "CBT",
    reading: "シービーティー",
    plain: "考え方や行動を見直して、ストレスや痛みにうまく対処する心理療法（認知行動療法）。",
  },
  {
    id: "biofeedback",
    term: "バイオフィードバック",
    reading: "ばいおふぃーどばっく",
    plain: "体の状態を画面などで見ながら、自分でリラックスする方法を学ぶ訓練。",
  },
  {
    id: "progressive-muscle-relaxation",
    term: "漸進的筋弛緩法",
    reading: "ぜんしんてききんしかんほう",
    plain: "筋肉に力を入れてからゆるめ、全身の緊張をほぐすリラックス法。",
  },
  {
    id: "autogenic-training",
    term: "自律訓練法",
    reading: "じりつくんれんほう",
    plain: "決まった言葉を心の中で唱えて、体と心をリラックスさせる方法。",
  },
  {
    id: "mindfulness",
    term: "マインドフルネス",
    reading: "まいんどふるねす",
    plain: "今この瞬間に意識を向け、良し悪しを判断せず観察する心の訓練。",
  },
  {
    id: "physical-therapy",
    term: "理学療法",
    reading: "りがくりょうほう",
    plain: "運動や手による施術で、体の機能や動きを回復させる治療。",
  },
  {
    id: "manual-therapy",
    term: "徒手療法",
    reading: "としゅりょうほう",
    plain: "セラピストが手で関節や筋肉を動かして整える治療。",
  },
  {
    id: "aerobic-exercise",
    term: "有酸素運動",
    reading: "ゆうさんそうんどう",
    plain: "ウォーキングなど、軽〜中くらいの強さで長く続ける運動。",
  },
  // --- 栄養・サプリ ---
  {
    id: "magnesium",
    term: "マグネシウム",
    reading: "まぐねしうむ",
    plain: "神経や筋肉のはたらきに必要なミネラル。片頭痛の予防に役立つことがある。",
  },
  {
    id: "riboflavin",
    term: "リボフラビン",
    reading: "りぼふらびん",
    plain: "ビタミンB2のこと。片頭痛の予防に使われることがある。",
  },
  {
    id: "coq10",
    term: "CoQ10",
    reading: "コーキューテン",
    plain: "体のエネルギー作りを助ける成分。片頭痛予防のサプリに使われる。",
  },
  {
    id: "omega3",
    term: "オメガ3脂肪酸",
    reading: "おめがすりーしぼうさん",
    plain: "魚などに多く含まれる体に良い油。炎症をやわらげるとされる。",
  },
  {
    id: "presenteeism",
    term: "プレゼンティーズム",
    reading: "ぷれぜんてぃーずむ",
    plain: "体調不良のまま出勤し、本来のパフォーマンスが発揮できない状態のこと。",
  },
  {
    id: "stigma",
    term: "スティグマ",
    reading: "すてぃぐま",
    plain: "周囲の偏見や誤解によって、不当に低い評価や差別的な扱いを受けること。",
  },
];

/** 起動時に検証済みの用語集（不正・id 重複なら例外で fail-fast）。 */
export const GLOSSARY: GlossaryTerm[] = validateGlossary(TERMS);

const BY_ID = new Map(GLOSSARY.map((t) => [t.id, t]));

/**
 * id で用語を取得する。
 *
 * @param id - 用語の識別子（未知 id は undefined）。
 */
export function getTerm(id: string): GlossaryTerm | undefined {
  return BY_ID.get(id);
}
