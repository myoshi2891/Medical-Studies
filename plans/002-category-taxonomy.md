# Plan 002: 頭痛専門プラットフォームのカテゴリ体系（情報アーキテクチャ）を確定する

> **Executor instructions**: 本ファイルは web-next のカテゴリ・ルート体系の設計文書である。
> コンテンツ拡張プラン（plans/004〜006）と技術拡張プラン（plans/007）は本ファイルの
> タクソノミとルート名を正とする。ルート名を変える必要が生じたら、先に本ファイルを改訂すること。
> 「STOP conditions」に該当したら止めて報告すること。
>
> **Drift check (run first)**: `git diff --stat a9e470c..HEAD -- web-next/app web-next/components/site/nav-links.ts`
> app/ 配下のディレクトリや nav-links.ts が変わっている場合、「Current state」の
> ナビ構成表と実態を突き合わせてから進めること。

## Status

- **Priority**: P1
- **Effort**: M
- **Risk**: LOW（設計文書。誤りは後続プランの手戻りとして顕在化する）
- **Depends on**: plans/001-platform-vision-and-current-state.md
- **Category**: direction
- **Planned at**: commit `a9e470c`, 2026-07-09

## Why this matters

現在の web-next は 6 カテゴリ（Anatomy / Headaches / Blocks / Therapies / PROM / PROM チェッカー）で、
頭痛医学の標準分類である **ICHD-3（国際頭痛分類 第 3 版）** の広がりに対して疾患カバレッジが
一次性 2＋二次性 2 にとどまる。また「薬物療法」「療養・セルフケア」「研究・エビデンス」という
利用者ニーズの大きい領域にカテゴリ自体が存在しない。カテゴリ体系を先に確定しないと、
ページを足すたびにルート名・ナビ位置・相互リンクが場当たりになり、後からの再編は全ページの
URL 変更（=外部リンク切れ）を招く。本プランで **拡張後も安定な URL 空間** を先に固定する。

## Current state

### ナビ構成（`web-next/components/site/nav-links.ts`、commit `a9e470c` 時点）

| ナビ項目 | 種別 | 配下ルート |
|---|---|---|
| Home | リーフ | `/prom-checker` |
| Anatomy | リーフ | `/anatomy` |
| Headaches | ドロップダウン | `/headaches/{migraine, tension-type-headache, medication-overuse-headache, cervicogenic-headache}` |
| Blocks | ドロップダウン | `/blocks/{occipital-nerve-block, cervical-plexus-block, stellate-ganglion-block}` |
| Therapies | ドロップダウン | `/therapies/{physical-therapy-for-headache, nutrition-and-supplements, psychological-behavioral-therapy}` |
| PROM 指標 | ドロップダウン | `/prom/{headache-diary, headache-impact-test, migraine-disability-assessment, migraine-specific-quality-of-life, numerical-rating-scale-visual-analogue-scale, patient-global-impression-of-change}` |

### 踏襲すべき既存規約（nav-links.ts のコメントより）

- ルート slug 規約: **カテゴリ階層 + kebab-case**（例: `/headaches/migraine`）。
- 未実装ルートは `disabled: true` を付けてナビに「（準備中）」として掲示できる
  （クリック不可・404 を出さない）。段階公開はこの機構で行う。
- コンテンツ SSoT は `Types-of-headache/md-files/` 配下の Markdown
  （plans/001「不変の原則」3 参照）。カテゴリ追加は md-files 側のディレクトリ追加と対で行う。

## 提案するカテゴリ体系（拡張後の全体像）

分類の主軸は **ICHD-3 の疾患分類**、副軸は **利用者の行動**（調べる→治療を知る→療養する→測る）。
既存 URL は一切変更しない（追加のみ）。

### 1. 疾患（`/headaches/*`）— ICHD-3 軸で拡張

| 追加ページ（slug） | 内容 | ICHD-3 | 優先度 |
|---|---|---|---|
| `cluster-headache` | 群発頭痛 | 3.1 | **P1**（一次性頭痛の三大疾患で唯一未着手） |
| `paroxysmal-hemicrania` | 発作性片側頭痛 | 3.2 | P2 |
| `sunct-suna` | SUNCT/SUNA | 3.3 | P3 |
| `hemicrania-continua` | 持続性片側頭痛 | 3.4 | P3 |
| `other-primary-headaches` | その他の一次性頭痛（運動時・咳嗽性・性行為時・雷鳴頭痛等の総覧） | 4 | P2 |
| `secondary-headaches-red-flags` | 二次性頭痛とレッドフラグ（SNNOOP10）。受診勧奨の教育ページ | 5〜12 | **P1**（安全性情報として最優先級） |
| `trigeminal-neuralgia` | 三叉神経痛・有痛性脳神経ニューロパチー | 13 | P2 |

### 2. ライフステージ・特殊集団（`/populations/*`）— 新カテゴリ

疾患軸と直交する横断テーマのため、`/headaches` 配下に混ぜず独立させる。

| ページ（slug） | 内容 | 優先度 |
|---|---|---|
| `pediatric-and-adolescent` | 小児・思春期の頭痛（学校生活・起立性調節障害との鑑別を含む） | P2 |
| `womens-headache` | 女性の頭痛（月経関連片頭痛・妊娠/授乳期の治療選択・ホルモンとの関係） | **P1**（片頭痛有病率の性差から需要最大） |
| `elderly-headache` | 高齢者の頭痛（新規発症時の注意・併存疾患と薬物相互作用） | P3 |

### 3. 薬物療法（`/medications/*`）— 新カテゴリ（詳細は plans/004）

非薬物療法（既存 `/therapies`）と対をなす。**個別の用量推奨は行わない**（plans/001 原則 1）。

| ページ（slug） | 内容 | 優先度 |
|---|---|---|
| `acute-treatment` | 急性期治療薬（アセトアミノフェン・NSAIDs・トリプタン・ジタン・ゲパント） | **P1** |
| `preventive-treatment` | 予防薬（従来予防薬: β遮断薬・抗てんかん薬・抗うつ薬・Ca 拮抗薬） | **P1** |
| `cgrp-targeted-therapies` | CGRP 関連薬（抗 CGRP/受容体抗体・経口ゲパント予防） | P2 |
| `medication-overuse-prevention` | 鎮痛薬の適正使用（既存 MOH ページと相互リンク） | P2 |

### 4. 非薬物療法（既存 `/therapies/*` に追加）

| 追加ページ（slug） | 内容 | 優先度 |
|---|---|---|
| `neuromodulation` | ニューロモジュレーション（非侵襲的迷走神経刺激・経頭蓋磁気刺激等の教育的概説） | P3 |
| `acupuncture-and-manual-therapy` | 鍼・徒手療法のエビデンス概説 | P3 |

既存 `nutrition-and-supplements`（サプリメント: Mg・ビタミン B2・CoQ10 等）の拡充は plans/004 で扱う。

### 5. 研究・エビデンス（`/research/*`）— 新カテゴリ（詳細は plans/005）

`guidelines`（ガイドライン要約）/ `journal-watch`（注目論文）/ `pathophysiology`（病態生理）。

### 6. 療養・セルフケア（`/care/*`）— 新カテゴリ（詳細は plans/006）

`lifestyle-basics` / `trigger-management` / `sleep` / `exercise` / `work-and-school`。

### 7. 既存のまま維持

- `/blocks/*`（主要 3 手技完了。追加候補があれば疾患ページからの需要で判断）
- `/prom/*`・`/prom-checker`（尺度網羅済み。plans/006 が導線を強化）
- `/anatomy`（実資産投入は PROGRESS.md 記載の既存残作業）
- `/glossary`（用語集一覧ページ）— 新設候補だが技術基盤側の話として plans/007 で扱う

### ナビ再編後の姿（ドロップダウン 8 グループ）

```text
Home | Anatomy | Headaches(7+4) | Populations(3) | Medications(4) |
Therapies(5) | Blocks(3) | Care(5) | Research(3) | PROM 指標(6)
```

グループ数が 10 に達しナビ幅が飽和するため、ヘッダー設計の見直し（メガメニュー化 or
2 階層化）を plans/007 の検討項目に含める。**本プランではルート体系のみ確定し、
ナビ UI の実装方式は決めない。**

## Scope

**In scope**:

- 本ファイル（カテゴリ・ルート名・優先度の確定）

**Out of scope**:

- 各ページの内容設計（plans/004〜006 の責務）
- nav-links.ts への `disabled` エントリ追加などのコード変更（各コンテンツプラン実行時に実施）
- 既存 URL の変更・リダイレクト（**恒久的に禁止**。追加のみ）

## Steps（後続プランが本タクソノミを消費する手順）

### Step 1: md-files ディレクトリ規約の対応付け

新カテゴリのコンテンツ Markdown は `Types-of-headache/md-files/` 配下に
カテゴリ名のディレクトリ（例: `Medications/`, `Care/`, `Research/`, `Populations/`）を
新設して置く。既存の `Headaches/`・`Blocks/` の慣習（1 ページ 1 md、PascalCase-with-hyphen
ファイル名）に合わせる。

**Verify**: 新カテゴリ初回ページの md 追加コミットで、パスが
`Types-of-headache/md-files/<Category>/<Page-Name>.md` 形式であること。

### Step 2: 段階公開順の遵守

P1（`cluster-headache` / `secondary-headaches-red-flags` / `womens-headache` /
`acute-treatment` / `preventive-treatment`）→ P2 → P3 の順で着手する。
各ページ着手時に nav-links.ts へ `disabled: true` エントリを追加し、
ページ完成時に `disabled` を外す。

**Verify**: `bun run test` が green（nav-links の契約テストが `isSafeHref` 検証を含む）。

### Step 3: 相互リンクの張り方

新ページは最低 2 本の内部リンクを持つ：所属カテゴリのインデックス的ページ（または隣接ページ）と、
関連する既存ページ（例: `cluster-headache` → `/blocks/stellate-ganglion-block`、
`acute-treatment` → `/headaches/medication-overuse-headache`）。

**Verify**: 各ページの契約テスト（`page.test.tsx`）に内部リンク存在のアサーションがあること。

## Done criteria

- [ ] `npx markdownlint-cli -c .markdownlint.json plans/002-category-taxonomy.md` → エラー 0
- [ ] plans/004〜006 が本ファイルのルート名（slug）をそのまま使用している
- [ ] 既存 URL の変更を要求する記述が本ファイルに存在しない
- [ ] plans/001 の「不変の原則」5 項目に反するカテゴリ（診断支援等）が含まれていない

## STOP conditions

- 既存ルートのリネーム・削除が必要に見えた場合（本タクソノミは追加のみで成立する設計。
  リネームが必要なら設計ミスなので報告して本ファイルを改訂する）
- ICHD-3 の改訂（ICHD-4 公表等）で疾患分類の前提が変わった場合
- ナビのグループ数・項目数が本ファイルの想定を超えて破綻した場合（plans/007 の
  ナビ再設計を先に実施する）

## Maintenance notes

- 本タクソノミの安定性が最重要。**URL は一度公開したら変えない**。カテゴリの意味が
  変わる場合も slug は維持し、表示名のみ変える。
- 優先度（P1/P2/P3）は plans/003 の情報収集運用で得た知見（ガイドライン改訂・新薬承認）に
  応じて見直してよいが、見直したら本ファイルの表を更新すること。
- 意図的に見送ったもの: 「頭痛外来の探し方」等の医療機関紹介（医療広告規制との整理が必要、
  `docs/publishing/05` の検討を先行させる）、フォーラム/コミュニティ機能（ユーザー投稿は
  医療情報の品質管理が不能になるため plans/001 のビジョン外）。
