# Plan 004: 治療法カテゴリ（薬物療法・サプリメント・その他）を拡張する

> **Executor instructions**: 本ファイルは「治療」柱のコンテンツ拡張計画である。実際の執筆は
> `Types-of-headache/md-files/` への Markdown 追加 → `nextjs-page-migration` スキルでの web-next 移行
> という既存パイプラインで行う（web-next への直書き禁止）。医療・法規制上の制約が最も厳しい領域なので、
> 「STOP conditions」を必ず守ること。
>
> **Drift check (run first)**: `git diff --stat a9e470c..HEAD -- web-next/app/therapies Types-of-headache/md-files/Nutrition-and-Supplements docs/publishing/05-legal-and-regulatory.md`

## Status

- **Priority**: P1
- **Effort**: L
- **Risk**: MED（医療内容の正確性・薬機法/医療広告規制）
- **Depends on**: plans/001, plans/002（`/medications/*` ルート）, plans/003（エビデンス/文献規約）
- **Category**: direction / docs
- **Planned at**: commit `a9e470c`, 2026-07-09

## Why this matters

現在 web-next には非薬物療法（`/therapies`: 理学療法・栄養/サプリ・心理行動療法）はあるが、
**薬物療法の独立カテゴリが存在しない**。頭痛治療で患者・学習者の関心が最も高いのは急性期治療薬と
予防薬であり、この 10 年で CGRP 関連抗体・ゲパント・ジタンという新しい選択肢が加わって治療体系が
大きく更新された。この核心領域が欠けたままでは「頭痛専門プラットフォーム」を名乗れない。一方で
薬の情報は薬機法・医療広告規制の制約が最も強く、**個別の用量推奨や効果保証は禁止**（教育的概説に限る）。
本プランは何を・どの順で・どの制約下で作るかを定義する。

## Current state

- 既存 `/therapies/nutrition-and-supplements`（`components/therapies/`）— サプリ（Mg・ビタミン B2・
  CoQ10 等）を扱うページが既にある。薬物療法拡張時はこれと役割分担し重複を避ける。
- 既存 `/headaches/medication-overuse-headache`（MOH）— 鎮痛薬使用過多による頭痛。急性期治療薬ページと
  相互リンクすべき対象。
- 法規制の権威文書: `docs/publishing/05-legal-and-regulatory.md`（薬機法・医療広告ガイドライン）。
  治療コンテンツはここに従う。全ページ共通の `components/site/DisclaimerBanner.tsx` あり。
- デザイン: 既存 `nutrition-and-supplements` は `.nut-rx`（処方カード）クラスを持つ（PROGRESS.md）。
  薬剤カードもこの系統のコンポーネントを流用して一貫性を保つ。
- エビデンス/参考文献の書式は plans/003 の規約に従う。

## 追加するコンテンツ（plans/002 の `/medications/*` 準拠）

| ページ（slug） | 内容の骨子 | 優先度 |
|---|---|---|
| `acute-treatment` | 急性期治療の考え方。薬効群: アセトアミノフェン / NSAIDs / トリプタン（作用機序・使い分けの一般論）/ ジタン（5-HT1F 作動）/ ゲパント（CGRP 受容体拮抗・急性期）。成層化治療の概念、早期服薬の原則、MOH 予防への注意 | P1 |
| `preventive-treatment` | 予防治療の適応（発作頻度・QOL 障害）。従来予防薬の薬効群: β遮断薬 / Ca 拮抗薬 / 抗てんかん薬 / 抗うつ薬。効果発現までの期間・継続と中止の一般原則 | P1 |
| `cgrp-targeted-therapies` | CGRP 経路を標的とする治療の概説。抗 CGRP/受容体モノクローナル抗体（予防）、経口ゲパントの予防適応。位置づけ・国内承認状況（PMDA 準拠、plans/003 の規制監視と連動） | P2 |
| `medication-overuse-prevention` | 急性期薬の適正使用日数の考え方、MOH の予防。既存 `/headaches/medication-overuse-headache` と双方向リンク | P2 |

サプリメントの拡充（既存 `nutrition-and-supplements` の増補）：エビデンスのある予防的栄養素
（マグネシウム・リボフラビン・CoQ10・フィーバーフュー・メラトニン等）を **エビデンスの質つきで**
概説。新規ページではなく既存ページの改訂として扱う。

その他の非薬物療法（plans/002 の `/therapies` 追加分: `neuromodulation`、
`acupuncture-and-manual-therapy`）は P3。本プランではルートの存在を確認するに留め、優先度が
上がった時点で本ファイルに骨子を追記する。

## 記述の厳守事項（薬機法・医療広告）

- **個別患者への用量・用法の指示を書かない**。「一般に◯◯という薬効群が用いられる」までとし、
  具体的処方は「医師・薬剤師に相談」へ誘導する。
- **効果・安全性を断定・保証しない**。エビデンスの質を明示し（plans/003 規約）、
  「有効性が示されている／限定的」等の相対表現に留める。
- **特定商品名の推奨・比較優位の主張をしない**。一般名（成分名・薬効群）で記述し、
  商品名は必要時に中立的に併記するに留める。
- 未承認・適応外の言及は「国内未承認」等の事実として明示し、使用を勧奨しない。
- 各治療ページ冒頭に、`DisclaimerBanner` に加えて「本ページは教育目的であり個別の治療推奨ではない」
  旨をページ内明示する。

## Scope

**In scope**（本プランで作成/改訂する成果物）:

- 本ファイル（治療カテゴリ拡張の設計）
- （後続実装フェーズで）`Types-of-headache/md-files/Medications/*.md` の新規執筆
- （後続実装フェーズで）既存 `Nutrition-and-Supplements` md のサプリ増補
- （後続実装フェーズで）`nextjs-page-migration` による web-next 化と nav-links.ts への追加

**Out of scope**:

- 診断アルゴリズム・治療選択の意思決定支援（plans/001 原則 1、SaMD 非該当を維持）
- 個別用量計算機・相互作用チェッカー等のツール（医療機器該当リスク）
- 既存 `/therapies`・`/headaches` の URL 変更

## Steps（実装フェーズの進め方。本プランはコード変更を含まない）

### Step 1: md 執筆（P1 の 2 ページ）

`acute-treatment` / `preventive-treatment` の Markdown を
`Types-of-headache/md-files/Medications/` に作成。plans/003 のエビデンス表記・参考文献規約に従い、
「記述の厳守事項」を満たす。既存 `Nutrition-and-Supplements.md` を文体・構成の手本にする。

**Verify**: `npx markdownlint-cli -c .markdownlint.json <新規md>` → エラー 0。
本文に用量指示・効果保証・商品名推奨が含まれないことを目視レビュー。

### Step 2: web-next 移行

`nextjs-page-migration` スキル（アーキタイプ A: 静的教育ページ）で `page.tsx` と `page.test.tsx` を生成。
契約テストに「免責文言の存在」「参考文献ブロックの存在」「MOH ページへの内部リンク」を含める。

**Verify**: `bun run test` green、`bun run typecheck` exit 0、`bun run lint` exit 0。

### Step 3: ナビ公開

nav-links.ts に `Medications` ドロップダウンを追加。未完成ページは `disabled: true`。
完成ページのみ `disabled` を外す。

**Verify**: `bun run test`（nav-links 契約テスト）green。

## Test plan

- 新規 `app/medications/acute-treatment/page.test.tsx` 等を、既存
  `app/therapies/nutrition-and-supplements/page.test.tsx` の構造を手本に作成。
- カバーするケース: (1) ページが免責文言を含む、(2) 参考文献セクションが存在、
  (3) MOH 等関連ページへの内部リンクが存在、(4) 見出し構造の主要セクションが揃う。
- 検証: `bun run test -- medications` で新規テストが全 pass。

## Done criteria

- [ ] `npx markdownlint-cli -c .markdownlint.json plans/004-treatment-content.md` → エラー 0
- [ ]（実装フェーズ）新規 md が用量指示・効果保証・商品名推奨を含まない（レビュー済み）
- [ ]（実装フェーズ）`bun run test` / `typecheck` / `lint` すべて成功、新規契約テストが存在し pass
- [ ] plans/002 の `/medications/*` slug をそのまま使用している
- [ ] plans/001 の「教育専用・SaMD 非該当」を維持している

## STOP conditions

- コンテンツに個別用量・具体的処方の記載を求められた場合（薬機法上の危険。要約・薬効群概説に留め報告）
- 特定商品の効果比較・推奨を求められた場合（医療広告規制違反リスク。報告）
- 添付文書・ガイドラインの長文転載が必要になった場合（`docs/publishing/02` 著作権確認を先行）
- 相互作用チェッカー・用量計算機など、医療機器（SaMD）該当リスクのある機能を求められた場合
  （plans/001 のスコープ外。報告）

## Maintenance notes

- 薬物療法は最も陳腐化が速い。新薬承認・適応拡大（PMDA/FDA/EMA）を plans/003 の随時監視で追い、
  `cgrp-targeted-therapies` と `acute-treatment` を優先的に更新する。
- レビュー観点: 用量・商品名・効果保証の有無、エビデンスの質表記、免責文言、国内承認状況の正確さ。
- 意図的に先送り: 小児・妊娠授乳期の薬物治療の詳細は plans/002 の `/populations/*`
  （`pediatric-and-adolescent` / `womens-headache`）側で、本ページから相互リンクして扱う
  （集団特異の禁忌・注意が多く、薬効群概説とは粒度が異なるため分離）。
