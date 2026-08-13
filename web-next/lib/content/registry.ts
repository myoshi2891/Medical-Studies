/**
 * サイト横断コンテンツレジストリ（plans/007 拡張項目 A・Step 1）。
 *
 * `lib/anatomy/manifest.ts` の宣言的レジストリ＋純関数コアのパターンを踏襲する。
 * 全コンテンツページのメタ（カテゴリ・鮮度・関連ページ）をここに集約し、
 * 相互リンク（RelatedLinks）・サイトマップ・鮮度棚卸しが同一のデータ源を参照する。
 *
 * **新規ページ追加時は本レジストリへの登録を 1 セットにすること。**
 * 登録漏れ・dangling 参照・実ルートとの不一致は `registry.test.ts` が機械検知する。
 *
 * `title` はナビ表記（`components/site/nav-links.ts`）に準じた短いラベルとし、
 * ページの SEO タイトル（各 page.tsx の `metadata.title`）とは役割を分ける。
 * `lastReviewed` の初期値は各 `page.tsx` の最終コミット日を採用した。
 */

import type { ContentEntry } from "./types";

export const CONTENT_REGISTRY: readonly ContentEntry[] = [
  // ── 解剖 ──────────────────────────────────────────────
  {
    href: "/anatomy",
    title: "頭痛の 3D 解剖アトラス",
    category: "anatomy",
    lastReviewed: "2026-07-03",
    keywords: ["3D", "解剖", "アトラス", "神経", "血管", "MRI"],
    related: [
      "/anatomy/bone-related-headache",
      "/headaches/headache-pathophysiology",
      "/blocks/occipital-nerve-block",
      "/headaches/cervicogenic-headache",
    ],
  },
  {
    href: "/anatomy/bone-related-headache",
    title: "頭痛に関連する骨 (Bone-Related)",
    category: "anatomy",
    lastReviewed: "2026-08-12",
    keywords: ["頭痛", "骨", "ICHD-3", "頸椎", "顎関節", "副鼻腔", "後頭神経痛"],
    related: [
      "/anatomy",
      "/headaches/cervicogenic-headache",
      "/headaches/headache-pathophysiology",
    ],
  },
  {
    href: "/anatomy/headache-related-muscles",
    title: "頭痛に関連する筋肉 (Muscles)",
    category: "anatomy",
    lastReviewed: "2026-08-12",
    keywords: [
      "頭痛",
      "筋肉",
      "ICHD-3",
      "緊張型頭痛",
      "トリガーポイント",
      "中枢性感作",
      "三叉神経頸髄複合体",
    ],
    related: [
      "/anatomy",
      "/headaches/tension-type-headache",
      "/headaches/cervicogenic-headache",
      "/therapies/physical-therapy-for-headache",
    ],
  },
  {
    href: "/anatomy/headache-and-straight-neck",
    title: "頭痛とストレートネック (Straight Neck)",
    category: "anatomy",
    lastReviewed: "2026-08-13",
    keywords: [
      "頭痛",
      "ストレートネック",
      "ICHD-3",
      "Forward Head Posture",
      "FHP",
      "緊張型頭痛",
      "頸原性頭痛",
      "三叉神経頸髄核",
      "CVA",
    ],
    related: [
      "/anatomy/bone-related-headache",
      "/anatomy/headache-related-muscles",
      "/headaches/cervicogenic-headache",
      "/headaches/tension-type-headache",
      "/therapies/physical-therapy-for-headache",
    ],
  },
  {
    href: "/anatomy/headache-related-nerves",
    title: "頭痛と神経系 (Nerves)",
    category: "anatomy",
    lastReviewed: "2026-08-13",
    keywords: [
      "頭痛",
      "神経系",
      "三叉神経血管系",
      "三叉神経頸髄複合体",
      "TCC",
      "後頭神経",
      "自律神経反射",
      "中枢性感作",
      "ICHD-3",
    ],
    related: [
      "/anatomy",
      "/anatomy/headache-related-muscles",
      "/headaches/headache-pathophysiology",
      "/headaches/cervicogenic-headache",
    ],
  },

  // ── 疾患 ──────────────────────────────────────────────
  {
    href: "/headaches/migraine",
    title: "片頭痛 (Migraine)",
    category: "headaches",
    lastReviewed: "2026-06-28",
    keywords: ["片頭痛", "Migraine", "前兆", "拍動性", "光過敏"],
    related: [
      "/headaches/headache-pathophysiology",
      "/treatment/acute-treatment-of-headache",
      "/treatment/migraine-prevention-therapy-guide",
      "/prom/migraine-disability-assessment",
    ],
  },
  {
    href: "/headaches/tension-type-headache",
    title: "緊張型頭痛 (TTH)",
    category: "headaches",
    lastReviewed: "2026-06-28",
    keywords: ["緊張型頭痛", "TTH", "締めつけ", "肩こり", "両側性"],
    related: [
      "/headaches/headache-pathophysiology",
      "/therapies/physical-therapy-for-headache",
      "/therapies/psychological-behavioral-therapy",
      "/headaches/cervicogenic-headache",
    ],
  },
  {
    href: "/headaches/medication-overuse-headache",
    title: "薬物乱用頭痛 (MOH)",
    category: "headaches",
    lastReviewed: "2026-06-28",
    keywords: ["薬物乱用頭痛", "MOH", "鎮痛薬", "使いすぎ", "離脱"],
    related: [
      "/treatment/moh-acute-use-days",
      "/treatment/acute-treatment-of-headache",
      "/treatment/migraine-prevention-therapy-guide",
    ],
  },
  {
    href: "/headaches/cervicogenic-headache",
    title: "頸原性頭痛 (CEH)",
    category: "headaches",
    lastReviewed: "2026-06-28",
    keywords: ["頸原性頭痛", "CEH", "首", "頸椎", "後頭部"],
    related: [
      "/therapies/physical-therapy-for-headache",
      "/therapies/trigger-points-and-headache",
      "/blocks/occipital-nerve-block",
    ],
  },
  {
    href: "/headaches/headache-pathophysiology",
    title: "頭痛の病態生理",
    category: "headaches",
    lastReviewed: "2026-07-21",
    keywords: ["病態生理", "三叉神経血管系", "CSD", "皮質拡延性抑制", "中枢感作"],
    related: ["/headaches/migraine", "/treatment/cgrp-pathway-headache-treatments", "/anatomy"],
  },
  {
    href: "/headaches/vascular-headache",
    title: "頭痛と血管 (Vascular Basis)",
    category: "headaches",
    lastReviewed: "2026-08-13",
    keywords: ["頭痛", "血管", "三叉神経血管系", "CGRP", "ICHD-3", "雷鳴頭痛", "くも膜下出血"],
    related: [
      "/headaches/headache-pathophysiology",
      "/headaches/migraine",
      "/treatment/cgrp-pathway-headache-treatments",
    ],
  },

  // ── 治療 ──────────────────────────────────────────────
  {
    href: "/treatment/acute-treatment-of-headache",
    title: "急性期治療の考え方",
    category: "treatment",
    lastReviewed: "2026-07-21",
    keywords: ["急性期治療", "トリプタン", "NSAIDs", "頓服", "発作時"],
    related: [
      "/headaches/medication-overuse-headache",
      "/treatment/moh-acute-use-days",
      "/headaches/migraine",
    ],
  },
  {
    href: "/treatment/migraine-prevention-therapy-guide",
    title: "片頭痛予防治療ガイド",
    category: "treatment",
    lastReviewed: "2026-07-23",
    keywords: ["予防療法", "予防薬", "βブロッカー", "抗てんかん薬", "発作頻度"],
    related: [
      "/treatment/cgrp-pathway-headache-treatments",
      "/headaches/migraine",
      "/therapies/nutrition-and-supplements",
    ],
  },
  {
    href: "/treatment/cgrp-pathway-headache-treatments",
    title: "CGRP 標的治療薬",
    category: "treatment",
    lastReviewed: "2026-07-23",
    keywords: ["CGRP", "抗体薬", "ガルカネズマブ", "エレヌマブ", "ゲパント"],
    related: [
      "/treatment/migraine-prevention-therapy-guide",
      "/headaches/headache-pathophysiology",
      "/headaches/migraine",
    ],
  },
  {
    href: "/treatment/moh-acute-use-days",
    title: "適正使用日数と MOH 予防",
    category: "treatment",
    lastReviewed: "2026-07-22",
    keywords: ["使用日数", "月 10 日", "MOH 予防", "頓服回数", "上限"],
    related: [
      "/headaches/medication-overuse-headache",
      "/treatment/acute-treatment-of-headache",
      "/prom/headache-diary",
    ],
  },
  {
    href: "/treatment/headache-lifestyle-seeds-guide",
    title: "生活習慣管理と SEEDS",
    category: "treatment",
    lastReviewed: "2026-07-21",
    keywords: ["SEEDS", "生活習慣", "睡眠", "食事", "運動", "ストレス"],
    related: [
      "/treatment/headache-trigger-identification-guide",
      "/therapies/sleep-and-headache-guide",
      "/therapies/aerobic-exercise-headache-prevention",
    ],
  },
  {
    href: "/treatment/headache-trigger-identification-guide",
    title: "トリガーの特定と管理",
    category: "treatment",
    lastReviewed: "2026-07-23",
    keywords: ["トリガー", "誘因", "天候", "気圧", "記録"],
    related: [
      "/prom/headache-diary",
      "/treatment/headache-lifestyle-seeds-guide",
      "/therapies/nutrition-and-supplements",
    ],
  },
  {
    href: "/treatment/headache-workplace-school-accommodations",
    title: "職場・学校での合理的配慮",
    category: "treatment",
    lastReviewed: "2026-07-23",
    keywords: ["合理的配慮", "職場", "学校", "休職", "就労"],
    related: [
      "/prom/headache-impact-test",
      "/prom/migraine-disability-assessment",
      "/treatment/headache-lifestyle-seeds-guide",
    ],
  },

  // ── 神経ブロック ──────────────────────────────────────
  {
    href: "/blocks/occipital-nerve-block",
    title: "後頭神経ブロック (ONB)",
    category: "blocks",
    lastReviewed: "2026-06-28",
    keywords: ["後頭神経ブロック", "ONB", "大後頭神経", "GON", "局所麻酔"],
    related: ["/headaches/cervicogenic-headache", "/blocks/cervical-plexus-block", "/anatomy"],
  },
  {
    href: "/blocks/cervical-plexus-block",
    title: "頚神経叢ブロック (CPB)",
    category: "blocks",
    lastReviewed: "2026-06-28",
    keywords: ["頚神経叢ブロック", "CPB", "頸神経叢", "エコーガイド"],
    related: ["/blocks/occipital-nerve-block", "/headaches/cervicogenic-headache", "/anatomy"],
  },
  {
    href: "/blocks/stellate-ganglion-block",
    title: "星状神経節ブロック (SGB)",
    category: "blocks",
    lastReviewed: "2026-06-28",
    keywords: ["星状神経節ブロック", "SGB", "交感神経", "ホルネル徴候"],
    related: [
      "/blocks/superior-cervical-ganglion-block",
      "/blocks/occipital-nerve-block",
      "/anatomy",
    ],
  },
  {
    href: "/blocks/superior-cervical-ganglion-block",
    title: "上頸神経節ブロック (SCGB)",
    category: "blocks",
    lastReviewed: "2026-07-25",
    keywords: ["上頸神経節ブロック", "SCGB", "上頸神経節", "交感神経"],
    related: ["/blocks/stellate-ganglion-block", "/anatomy", "/headaches/migraine"],
  },

  // ── 非薬物療法 ────────────────────────────────────────
  {
    href: "/therapies/physical-therapy-for-headache",
    title: "理学療法 (PT)",
    category: "therapies",
    lastReviewed: "2026-06-28",
    keywords: ["理学療法", "PT", "運動療法", "姿勢", "徒手療法"],
    related: [
      "/headaches/cervicogenic-headache",
      "/therapies/trigger-points-and-headache",
      "/headaches/tension-type-headache",
    ],
  },
  {
    href: "/therapies/nutrition-and-supplements",
    title: "栄養・サプリメント",
    category: "therapies",
    lastReviewed: "2026-06-28",
    keywords: ["サプリメント", "マグネシウム", "ビタミン B2", "リボフラビン", "栄養"],
    related: [
      "/treatment/migraine-prevention-therapy-guide",
      "/treatment/headache-lifestyle-seeds-guide",
      "/treatment/headache-trigger-identification-guide",
    ],
  },
  {
    href: "/therapies/psychological-behavioral-therapy",
    title: "心理・行動療法",
    category: "therapies",
    lastReviewed: "2026-06-28",
    keywords: [
      "認知行動療法",
      "CBT",
      "リラクセーション",
      "バイオフィードバック",
      "マインドフルネス",
    ],
    related: [
      "/headaches/tension-type-headache",
      "/therapies/sleep-and-headache-guide",
      "/prom/patient-global-impression-of-change",
    ],
  },
  {
    href: "/therapies/headache-acupoints-trigger-points",
    title: "経穴・トリガーポイント",
    category: "therapies",
    lastReviewed: "2026-07-23",
    keywords: ["経穴", "ツボ", "鍼", "トリガーポイント", "指圧"],
    related: [
      "/therapies/trigger-points-and-headache",
      "/therapies/physical-therapy-for-headache",
      "/headaches/tension-type-headache",
    ],
  },
  {
    href: "/therapies/trigger-points-and-headache",
    title: "トリガーポイント入門",
    category: "therapies",
    lastReviewed: "2026-07-23",
    keywords: ["トリガーポイント", "筋筋膜性疼痛", "関連痛", "僧帽筋", "索状硬結"],
    related: [
      "/therapies/headache-acupoints-trigger-points",
      "/therapies/physical-therapy-for-headache",
      "/headaches/cervicogenic-headache",
    ],
  },
  {
    href: "/therapies/aerobic-exercise-headache-prevention",
    title: "有酸素運動と頭痛予防",
    category: "therapies",
    lastReviewed: "2026-07-23",
    keywords: ["有酸素運動", "ウォーキング", "運動強度", "エアロビクス", "予防"],
    related: [
      "/treatment/headache-lifestyle-seeds-guide",
      "/therapies/sleep-and-headache-guide",
      "/treatment/migraine-prevention-therapy-guide",
    ],
  },
  {
    href: "/therapies/sleep-and-headache-guide",
    title: "睡眠衛生ガイド",
    category: "therapies",
    lastReviewed: "2026-07-23",
    keywords: ["睡眠衛生", "不眠", "寝不足", "睡眠時間", "起床時刻"],
    related: [
      "/treatment/headache-lifestyle-seeds-guide",
      "/therapies/aerobic-exercise-headache-prevention",
      "/therapies/psychological-behavioral-therapy",
    ],
  },

  // ── PROM 指標 ─────────────────────────────────────────
  {
    href: "/prom/headache-diary",
    title: "頭痛ダイアリー",
    category: "prom",
    lastReviewed: "2026-06-28",
    keywords: ["頭痛ダイアリー", "頭痛日誌", "記録", "診察", "セルフモニタリング"],
    related: [
      "/prom/migraine-disability-assessment",
      "/treatment/headache-trigger-identification-guide",
      "/treatment/moh-acute-use-days",
    ],
  },
  {
    href: "/prom/headache-impact-test",
    title: "HIT-6",
    category: "prom",
    lastReviewed: "2026-07-15",
    keywords: ["HIT-6", "影響度", "質問票", "スコア", "PROM"],
    related: [
      "/prom/migraine-disability-assessment",
      "/prom/migraine-specific-quality-of-life",
      "/prom/headache-diary",
    ],
  },
  {
    href: "/prom/migraine-disability-assessment",
    title: "MIDAS",
    category: "prom",
    lastReviewed: "2026-06-28",
    keywords: ["MIDAS", "生活支障度", "欠勤", "日数", "PROM"],
    related: ["/prom/headache-impact-test", "/prom/headache-diary", "/headaches/migraine"],
  },
  {
    href: "/prom/migraine-specific-quality-of-life",
    title: "MSQ v2.1",
    category: "prom",
    lastReviewed: "2026-07-15",
    keywords: ["MSQ", "QOL", "生活の質", "PROM"],
    related: [
      "/prom/headache-impact-test",
      "/prom/patient-global-impression-of-change",
      "/headaches/migraine",
    ],
  },
  {
    href: "/prom/numerical-rating-scale-visual-analogue-scale",
    title: "NRS / VAS",
    category: "prom",
    lastReviewed: "2026-06-28",
    keywords: ["NRS", "VAS", "痛みの強さ", "0〜10", "評価スケール"],
    related: [
      "/prom/headache-diary",
      "/prom/patient-global-impression-of-change",
      "/prom/headache-impact-test",
    ],
  },
  {
    href: "/prom/patient-global-impression-of-change",
    title: "PGIC",
    category: "prom",
    lastReviewed: "2026-06-28",
    keywords: ["PGIC", "全般的印象", "改善度", "変化", "PROM"],
    related: [
      "/prom/numerical-rating-scale-visual-analogue-scale",
      "/prom/migraine-specific-quality-of-life",
      "/prom/headache-diary",
    ],
  },
];

/** href 引きの索引をモジュールロード時に一度だけ構築する（`lib/anatomy/search.ts` と同方式）。 */
const BY_HREF: ReadonlyMap<string, ContentEntry> = new Map(
  CONTENT_REGISTRY.map((entry) => [entry.href, entry])
);

/**
 * Finds a registered content entry by its internal URL.
 *
 * @param href - The internal absolute path to look up
 * @returns The matching content entry, or `undefined` if the path is not registered
 */
export function getEntry(href: string): ContentEntry | undefined {
  return BY_HREF.get(href);
}

/**
 * Resolves the related pages declared for a content page.
 *
 * @param href - The internal path of the source page.
 * @returns The related page entries in declaration order, or an empty array if the page is unregistered or a related page is missing.
 */
export function getRelated(href: string): ContentEntry[] {
  const entry = BY_HREF.get(href);
  if (entry === undefined) return [];

  const resolved: ContentEntry[] = [];
  for (const relatedHref of entry.related) {
    const target = BY_HREF.get(relatedHref);
    if (target === undefined) continue;
    resolved.push(target);
  }
  return resolved;
}
