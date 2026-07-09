# Plan 006: 療養・セルフケアカテゴリ（/care）を新設し PROM 導線を結ぶ

> **Executor instructions**: 本ファイルは「療養」柱のカテゴリ新設計画である。既存の PROM チェッカー・
> 頭痛ダイアリー・Google Sheets 同期という実装済み資産と導線を結ぶことが主眼。コンテンツは
> md-files → nextjs-page-migration で作る。「STOP conditions」を守ること。
>
> **Drift check (run first)**: `git diff --stat a9e470c..HEAD -- web-next/app/prom-checker web-next/lib/prom web-next/lib/export docs/google-sheets-sync-design.md`

## Status

- **Priority**: P2
- **Effort**: M
- **Depends on**: plans/001, plans/002（`/care/*` ルート）, plans/003（文献規約）
- **Risk**: LOW
- **Category**: direction / docs
- **Planned at**: commit `a9e470c`, 2026-07-09

## Why this matters

頭痛の多くは慢性・反復性で、患者の QOL を左右するのは診察室の外での **日々の療養**
（トリガー回避・睡眠・運動・記録の習慣化）である。本プラットフォームには患者が記録するための
強力な資産（`/prom-checker`・頭痛ダイアリー・PROM スコアリング・Google Sheets/CSV エクスポート）が
既に実装済みだが、「なぜ・どう療養するか」を教えるコンテンツと、「記録ツールへ誘導する導線」が薄い。
`/care` を新設して両者を結べば、"学ぶ→記録する→振り返る" の患者体験ループが完成し、
実装済みの PROM 資産の価値が引き出される。

## Current state（結ぶべき既存資産）

- `/prom-checker`（`app/prom-checker/`）— 患者向け PROM 統合チェッカー SPA。スコアリング・
  localStorage 保存まで実装済み（`lib/prom/`: scoring / registry / storage / upsert / datetime）。
- `/prom/*` の解説 6 種（頭痛ダイアリー・HIT-6・MIDAS・MSQ・NRS/VAS・PGIC）。
- エクスポート: `lib/export/`（`ExportWorkbook` 中間表現 → CSV / Google Sheets、`google/` 配下）。
  設計は `docs/google-sheets-sync-design.md`。実機確認は `NEXT_PUBLIC_GOOGLE_CLIENT_ID` 設定後の残作業
  （PROGRESS.md）。
- 既存 `/therapies/psychological-behavioral-therapy`（認知行動的アプローチ）— セルフケアと隣接。
  重複を避け相互リンクする。

## 追加するコンテンツ（plans/002 の `/care/*` 準拠）

| ページ（slug） | 内容 | PROM 導線 |
|---|---|---|
| `lifestyle-basics` | 療養の基本（規則的生活・水分・カフェイン・食事リズム）。SEEDS 等の生活指導の枠組みを教育的に概説 | 頭痛ダイアリーへ誘導 |
| `trigger-management` | トリガーの特定と管理。記録して振り返る方法論 | `/prom-checker`・ダイアリーで記録→可視化 |
| `sleep` | 睡眠と頭痛の関係、睡眠衛生 | ダイアリーの睡眠項目と対応 |
| `exercise` | 有酸素運動の予防的意義、無理のない導入 | PGIC 等で変化を測る導線 |
| `work-and-school` | 職場・学校での対処と周囲の理解（合理的配慮の一般論） | MIDAS/HIT-6 で生活障害度を測る導線 |

各ページは「教育コンテンツ本文」＋末尾に「記録して振り返る」CTA（該当 PROM/ダイアリー・
`/prom-checker` への内部リンク）を持つ。

## 導線設計（学ぶ→記録→振り返る）

```text
/care/trigger-management（学ぶ）
   → 「頭痛ダイアリーで記録しよう」CTA → /prom/headache-diary（使い方）→ /prom-checker（記録）
   → 蓄積データを CSV / Google Sheets へエクスポート（既存 lib/export）で振り返り
   → /care へ戻り生活調整
```

- CTA は既存デザインシステムの `.card`/`.alert` を流用し、内部リンクで実装（新規 UI 部品は作らない）。
- Google Sheets 同期は既設計（`docs/google-sheets-sync-design.md`）を **説明する** に留め、
  本プランで同期機能自体を変更しない。

## Scope

**In scope**:

- 本ファイル（`/care` カテゴリと PROM 導線の設計）
- （実装フェーズ）`Types-of-headache/md-files/Care/*.md` の執筆と web-next 移行
- （実装フェーズ）各ページから既存 `/prom/*`・`/prom-checker` への内部リンク追加

**Out of scope**:

- `lib/prom`・`lib/export`・`app/prom-checker` の挙動変更（**導線＝リンクを張るだけ**。
  スコアリング/保存/同期のロジックは触らない）
- 新たな PROM 尺度・記録項目の追加（別途 plans/002 で尺度を増やす場合の範囲）
- 個別の治療・用量助言（plans/004 の領域）

## Steps

### Step 1: `trigger-management` を先行作成

PROM 資産と最も結びつく `trigger-management` を最初に作る。md を
`Types-of-headache/md-files/Care/` に執筆し、末尾に頭痛ダイアリー/`prom-checker` への CTA を置く。

**Verify**: `npx markdownlint-cli -c .markdownlint.json <md>` エラー 0。

### Step 2: web-next 移行と導線テスト

`nextjs-page-migration`（アーキタイプ A）で移行。契約テストに
`/prom/headache-diary` と `/prom-checker` への内部リンク存在を含める。

**Verify**: `bun run test -- care` green、`typecheck`・`lint` 成功。

### Step 3: 残りページとナビ公開

`lifestyle-basics` / `sleep` / `exercise` / `work-and-school` を追加。`Care` ドロップダウンを
nav-links.ts に追加、未完成は `disabled: true`。既存 `psychological-behavioral-therapy` と相互リンク。

**Verify**: `bun run test`（nav-links 契約テスト含む）green。

## Test plan

- `app/care/trigger-management/page.test.tsx` 等を既存教育ページの test を手本に作成。
- ケース: (1) 免責文言、(2) `/prom/headache-diary` への内部リンク、(3) `/prom-checker` への内部リンク、
  (4) 参考文献セクション。
- 検証: `bun run test -- care` 全 pass。既存 `prom`/`prom-checker`/`export` のテストが不変で green
  （導線追加が既存機能を壊していないことの確認）。

## Done criteria

- [ ] `npx markdownlint-cli -c .markdownlint.json plans/006-care-selfcare.md` → エラー 0
- [ ]（実装フェーズ）`bun run test`/`typecheck`/`lint` 成功、新規契約テスト pass
- [ ]（実装フェーズ）`lib/prom`・`lib/export`・`app/prom-checker` に変更がない（`git status` で確認）
- [ ] plans/002 の `/care/*` slug を使用、PROM への内部リンクが張られている

## STOP conditions

- 療養コンテンツが個別の治療・用量助言に踏み込みそうな場合（plans/004 の領域。分離して報告）
- 導線実装のために `lib/prom`/`lib/export`/`prom-checker` の変更が必要に見えた場合
  （設計ミス。リンクだけで実現できるはず。報告）
- 「合理的配慮」等で法的助言に踏み込む記述を求められた場合（一般的情報に留め、専門窓口へ誘導）

## Maintenance notes

- 本カテゴリの価値は PROM 資産との導線に依存する。`/prom-checker`・`lib/export` の URL や
  エクスポート仕様が変わったら、`/care` 各ページの CTA リンクを追随させる。
- レビュー観点: 導線リンクの有効性、既存 PROM 機能への副作用がないこと、免責文言。
- 意図的に先送り: `/care` 内での記録の可視化（グラフ表示等）は `/prom-checker` の責務に集約し、
  本カテゴリでは重複実装しない。可視化強化が必要なら plans/007 で prom-checker 側の拡張として扱う。
