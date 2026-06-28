import { type GlossaryTerm, validateGlossary } from "./types";

/**
 * 専門用語の用語集（宣言的レジストリ）。
 *
 * - 各エントリは Term コンポーネント（components/glossary/Term.tsx）と
 *   /anatomy・主要ガイドページのツールチップから参照される。
 * - plain は「高校生でも分かる」言い換えを基準にする。reading はひらがな。
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
