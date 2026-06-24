/**
 * ① 宣言的レジストリ（質問票＝データ）。
 * 元 prom-checker/index.html の REGISTRY / PAIN_SCALES / SNOOP4 / DRUG_CLASS /
 * DEFAULT_MEDS / SCHEDULE を TypeScript へ忠実移植（設計書 第3章・第8.1章）。
 */
import type { DrugClassDef, Instrument, Medication, PainScale, ScheduleRow, Snoop } from "./types";

export const COMMON_DISCLAIMER =
  "本ツールは自己評価・記録支援を目的とし、医師の診断ではありません。スコアや解釈は参考情報であり、治療や緊急受診の判断は必ず医療従事者にご相談ください。";

export const REGISTRY: Record<string, Instrument> = {
  hit6: {
    id: "hit6",
    version: "1.0",
    title: "HIT-6",
    fullName: "Headache Impact Test",
    summary: "過去4週間の頭痛が日常生活へ与えた影響度（所要 約5分）",
    recallPeriod: "P4W",
    recallLabel: "過去4週間",
    reassessEvery: "P1M",
    reassessLabel: "月次",
    items: [
      { id: "q1", label: "頭痛のとき、ひどい痛みを感じることはどのくらいありますか？" },
      {
        id: "q2",
        label:
          "頭痛のために、日常生活（家事・仕事・学業・社会活動）が制限されることはどのくらいありますか？",
      },
      { id: "q3", label: "頭痛のとき、横になりたくなることはどのくらいありますか？" },
      {
        id: "q4",
        label:
          "過去4週間、頭痛のために疲れすぎて仕事や日常生活ができなかったことはどのくらいありますか？",
      },
      {
        id: "q5",
        label: "過去4週間、頭痛のためにうんざりしたり、いらだったことはどのくらいありますか？",
      },
      {
        id: "q6",
        label:
          "過去4週間、頭痛のために仕事や日常生活で集中できなかったことはどのくらいありますか？",
      },
    ],
    responseOptions: [
      { label: "まったくない", value: 6 },
      { label: "めったにない", value: 8 },
      { label: "ときどき", value: 10 },
      { label: "非常によく", value: 11 },
      { label: "いつも", value: 13 },
    ],
    scoring: { method: "sum", reverseCoding: false, range: [36, 78] },
    interpretationBands: [
      {
        min: 36,
        max: 49,
        grade: "grade1",
        label: "グレード1：生活への影響は軽微または皆無",
        level: "success",
      },
      {
        min: 50,
        max: 55,
        grade: "grade2",
        label: "グレード2：日常生活にある程度の影響あり",
        level: "info",
      },
      {
        min: 56,
        max: 59,
        grade: "grade3",
        label: "グレード3：相当な影響あり（予防療法の検討推奨）",
        level: "warn",
      },
      {
        min: 60,
        max: 78,
        grade: "grade4",
        label: "グレード4：重度の影響あり（積極的な専門的治療を推奨）",
        level: "danger",
      },
    ],
    mcid: {
      note: "反復性片頭痛 −2.5〜6点、慢性片頭痛 ≥6点の改善で臨床的に意味のある変化。",
      improveDelta: -6,
    },
    license: {
      holder: "QualityMetric Incorporated（© 2001, 2015）",
      note: "学術利用は可、商用利用は要許諾。日本語版は検証済み（Sakai 2004）。",
      source: "ICHD-3 / QualityMetric",
    },
  },

  midas: {
    id: "midas",
    version: "1.0",
    title: "MIDAS",
    fullName: "Migraine Disability Assessment Scale",
    summary: "過去3ヶ月間の頭痛による支障日数（所要 約5分）。Q1〜Q5 の日数を合計します。",
    recallPeriod: "P3M",
    recallLabel: "過去3ヶ月",
    reassessEvery: "P3M",
    reassessLabel: "四半期（3ヶ月ごと）",
    inputType: "days",
    items: [
      { id: "q1", label: "頭痛のために仕事や学業を休んだ日数" },
      {
        id: "q2",
        label: "頭痛のために仕事や学業の能率が半分以下になった日数（Q1で休んだ日は除く）",
      },
      { id: "q3", label: "頭痛のために家事ができなかった日数" },
      {
        id: "q4",
        label: "頭痛のために家事の能率が半分以下になった日数（Q3で出来なかった日は除く）",
      },
      { id: "q5", label: "頭痛のために家族・社会・余暇の活動を休んだ日数" },
    ],
    contextItems: [
      { id: "a", label: "補足A：過去3ヶ月の総頭痛日数（0〜90）", min: 0, max: 90 },
      { id: "b", label: "補足B：頭痛の平均的な強さ NRS（0〜10）", min: 0, max: 10 },
    ],
    scoring: { method: "sum", range: [0, 270], inputMax: 90 },
    interpretationBands: [
      {
        min: 0,
        max: 5,
        grade: "I",
        label: "グレードI：支障なし、または極めて軽微",
        level: "success",
      },
      { min: 6, max: 10, grade: "II", label: "グレードII：軽度の支障", level: "info" },
      { min: 11, max: 20, grade: "III", label: "グレードIII：中等度の支障", level: "warn" },
      { min: 21, max: 40, grade: "IV-A", label: "グレードIV-A：重度の支障", level: "danger" },
      { min: 41, max: 270, grade: "IV-B", label: "グレードIV-B：最重度の支障", level: "danger" },
    ],
    mcid: {
      note: "MIC: グレードII〜III（6〜20点）で ≥−4点、グレードIV（≥21点）で ≥−30%。レスポンダー定義 ≥50% 改善。",
    },
    license: {
      holder: "（明示的な著作権表記なし）",
      note: "日本語版は検証済み（Iigaya 2003, 北里大学）。補足A・Bはスコアに含めず臨床的文脈として保存。",
      source: "Stewart & Lipton",
    },
  },

  "msq-v2.1": {
    id: "msq-v2.1",
    version: "2.1",
    title: "MSQ v2.1",
    fullName: "Migraine-Specific Quality of Life Questionnaire",
    summary:
      "過去4週間の片頭痛に特化した QOL（14項目・6段階）。逆転後、3ドメインを 0〜100 に換算（高いほど良好）。",
    recallPeriod: "P4W",
    recallLabel: "過去4週間",
    reassessEvery: "P4W",
    reassessLabel: "月次〜4週ごと",
    items: [
      { id: "q1", label: "片頭痛のために、仕事や日常の活動を中断したことがありましたか？" },
      { id: "q2", label: "片頭痛のために、家族・友人との時間を妨げられましたか？" },
      { id: "q3", label: "片頭痛のために、レジャーや余暇活動が困難でしたか？" },
      { id: "q4", label: "片頭痛のために、仕事や日常の活動で生産性が落ちましたか？" },
      { id: "q5", label: "片頭痛のために、集中するのが難しかったですか？" },
      { id: "q6", label: "片頭痛のために、疲労を感じて仕事や活動が妨げられましたか？" },
      { id: "q7", label: "片頭痛のために、やりたいこと（社会・余暇など）を制限しましたか？" },
      { id: "q8", label: "片頭痛のために、予定をキャンセル・変更せざるを得なかったですか？" },
      { id: "q9", label: "片頭痛のために、助けが必要になりましたか？" },
      { id: "q10", label: "片頭痛のために、計画どおりに物事を進められませんでしたか？" },
      { id: "q11", label: "片頭痛のために、対人関係に支障が出ましたか？" },
      { id: "q12", label: "片頭痛のために、いらだちを感じましたか？" },
      { id: "q13", label: "片頭痛のために、自分が重荷だと感じましたか？" },
      { id: "q14", label: "片頭痛のために、再発への不安や恐れを感じましたか？" },
    ],
    responseOptions: [
      { label: "まったくない", value: 1 },
      { label: "ほとんどない", value: 2 },
      { label: "ときどきある", value: 3 },
      { label: "かなりある", value: 4 },
      { label: "ほとんどいつもある", value: 5 },
      { label: "いつもある", value: 6 },
    ],
    scoring: {
      method: "domain-rescale",
      reverseCoding: true,
      domains: [
        {
          id: "rfr",
          label: "役割機能制限 (RFR)",
          items: [0, 1, 2, 3, 4, 5, 6],
          offset: 7,
          divisor: 35,
          mwpc: 25.71,
        },
        {
          id: "rfp",
          label: "役割機能阻害 (RFP)",
          items: [7, 8, 9, 10],
          offset: 4,
          divisor: 20,
          mwpc: 20.0,
        },
        {
          id: "ef",
          label: "感情機能 (EF)",
          items: [11, 12, 13],
          offset: 3,
          divisor: 15,
          mwpc: 26.67,
        },
      ],
    },
    interpretationBands: [
      { min: 0, max: 40, grade: "severe", label: "重度", level: "danger" },
      { min: 40, max: 60, grade: "moderate", label: "中等度", level: "warn" },
      { min: 60, max: 80, grade: "mild-moderate", label: "軽〜中等度", level: "info" },
      { min: 80, max: 100, grade: "mild", label: "軽度〜良好", level: "success" },
    ],
    mcid: {
      note: "MWPC（意味のある変化, Speck 2021）: RFR ≥25.71 / RFP ≥20.00 / EF ≥26.67。絶対値より変化を主指標に。",
    },
    license: {
      holder: "Mapi Research Trust（専有）",
      note: "事前の書面による許諾が必須（eprovide.mapi-trust.org）。ePRO版は検証済み（Speck 2019/2021）。公開配布時は許諾状況に注意。",
      source: "Mapi Research Trust",
    },
  },

  pgic: {
    id: "pgic",
    version: "1.0",
    title: "PGIC",
    fullName: "Patient Global Impression of Change",
    summary:
      "治療開始前と比べた総合的な改善度（1問・7段階）。本アプリは昇順版A（高スコア＝改善大）を既定とします。",
    recallPeriod: "treatment-start",
    recallLabel: "治療開始から評価時点まで",
    reassessEvery: "P4W",
    reassessLabel: "治療開始後 4 / 12 / 24 / 52 週",
    reassessWeeks: [4, 12, 24, 52],
    items: [
      {
        id: "q1",
        label: "治療を始める前と比べて、現在のあなたの状態は全体としてどのように変化しましたか？",
      },
    ],
    responseOptions: [
      { label: "変化なし（または悪化）", value: 1 },
      { label: "ほぼ同じ、ほとんど変化なし", value: 2 },
      { label: "少し良いが、気づける変化なし", value: 3 },
      { label: "やや良いが、実質的な差なし", value: 4 },
      { label: "中程度に改善、わずかだが気づける変化あり", value: 5 },
      { label: "改善し、真に価値ある確実な改善", value: 6 },
      { label: "大幅に改善し、大きな変化", value: 7 },
    ],
    scoring: { method: "single-ordinal", variant: "ascending", favorableMin: 5 },
    license: {
      holder: "パブリックドメイン（Guy 1976 の CGI 由来）",
      note: "自由利用可。降順版も存在するため pgicVariant 設定で解釈を切替可能。",
      source: "Guy 1976 / CGI",
    },
  },
};

/** PROM タブの表示順（元 index.html の PROM_IDS と一致）。 */
export const PROM_IDS = ["hit6", "midas", "msq-v2.1", "pgic"] as const;

/** NRS / VAS は採点尺度ではなく入力プリミティブ（設計書 第3.3）。 */
export const PAIN_SCALES: Record<"nrs" | "vas", PainScale> = {
  nrs: {
    id: "nrs",
    title: "NRS",
    fullName: "Numerical Rating Scale",
    range: [0, 10],
    mcid: "MCID −2.0点（≈30%減）。最小改善 −1.0〜1.5点。強い反応 ≥50%減。",
    license: {
      holder: "一般尺度（IHS / FDA が PRO エンドポイントとして承認）",
      note: "整数のみで記録。",
      source: "IHS / FDA",
    },
  },
  vas: {
    id: "vas",
    title: "VAS",
    fullName: "Visual Analogue Scale",
    range: [0, 100],
    mcid: "MCID 急性痛 −13mm（慢性痛 −10〜15mm, 15〜30%減）。痛みゼロ＝Pain Freedom。",
    license: {
      holder: "一般尺度（IHS / FDA が PRO エンドポイントとして承認）",
      note: "目盛り・数値を表示しない連続尺度。0〜100mm の実数で記録。",
      source: "IHS / FDA",
    },
  },
};

/** SNOOP4 ゲート定義（採点せず関門として機能, 設計書 第3.1）。 */
export const SNOOP4: Snoop = {
  id: "snoop4",
  title: "SNOOP4 レッドフラッグ・スクリーニング",
  groups: [
    {
      code: "S",
      name: "全身の症状・兆候",
      check:
        "発熱、首の後ろが硬く曲がりにくい（項部硬直）、原因不明の体重減少、がんの既往・免疫不全のいずれかがある。",
      concern: "細菌性髄膜炎・脳炎・脳転移など",
    },
    {
      code: "N",
      name: "神経の症状",
      check:
        "手足の麻痺やしびれ、言葉がうまく出ない、物が二重に見える、意識がぼんやりする、急な物忘れの進行のいずれかがある。",
      concern: "脳卒中・脳腫瘍・硬膜下血腫など",
    },
    {
      code: "O",
      name: "突然の発症（雷鳴頭痛）",
      check: "「人生で最も激しい頭痛」である、または数秒〜数分で痛みのピークに達した。",
      concern: "くも膜下出血（SAH）など",
    },
    {
      code: "O",
      name: "50歳以降の新規発症",
      check: "50歳を過ぎてから、これまで経験のない新しいタイプの頭痛が始まった。",
      concern: "側頭動脈炎・頭蓋内新生物など",
    },
    {
      code: "P",
      name: "パターンの変化",
      check:
        "頻度や強さがどんどん悪化している、頭をぶつけた後に始まった、横になる/起き上がると悪化する。",
      concern: "頭蓋内圧亢進・低髄液圧症など",
    },
    {
      code: "4",
      name: "4つの特殊病態",
      check:
        "「乳頭浮腫」を指摘された、腰椎穿刺の後・けいれん発作の後に始まった、妊娠中または出産直後である。",
      concern: "静脈洞血栓症・子癇前症など",
    },
  ],
};

/** 既定の急性期薬リスト（MOH 判定の薬剤分類付き, 設計書 第3.2）。 */
export const DRUG_CLASS: Record<string, DrugClassDef> = {
  "triptan-ergot-opioid-combo": {
    label: "トリプタン/エルゴタミン/オピオイド/複合鎮痛薬",
    threshold: 10,
  },
  "simple-nsaid": { label: "単純鎮痛薬/NSAIDs", threshold: 15 },
};

export const DEFAULT_MEDS: Medication[] = [
  { name: "スマトリプタン", class: "triptan-ergot-opioid-combo" },
  { name: "リザトリプタン", class: "triptan-ergot-opioid-combo" },
  { name: "エルゴタミン製剤", class: "triptan-ergot-opioid-combo" },
  { name: "コデイン配合鎮痛薬", class: "triptan-ergot-opioid-combo" },
  { name: "ロキソプロフェン", class: "simple-nsaid" },
  { name: "イブプロフェン", class: "simple-nsaid" },
  { name: "アセトアミノフェン", class: "simple-nsaid" },
];

/** 再評価スケジュール（リコール期間・推奨周期, 設計書 第5章）。 */
export const SCHEDULE: ScheduleRow[] = [
  { id: "hit6", title: "HIT-6", recall: "過去4週間", every: "月次", period: "P1M" },
  { id: "msq-v2.1", title: "MSQ v2.1", recall: "過去4週間", every: "月次〜4週ごと", period: "P4W" },
  { id: "midas", title: "MIDAS", recall: "過去3ヶ月", every: "四半期（3ヶ月ごと）", period: "P3M" },
  {
    id: "pgic",
    title: "PGIC",
    recall: "治療開始から評価時点",
    every: "治療開始後 4 / 12 / 24 / 52 週",
    period: "P4W",
  },
  {
    id: "diary",
    title: "頭痛日誌",
    recall: "日次（前向き）",
    every: "毎日（最低30日のベースライン、標準12週監視）",
    period: "P1D",
  },
];
