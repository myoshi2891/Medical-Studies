# Plan 005: 研究・エビデンスカテゴリ（/research）を新設する

> **Executor instructions**: 本ファイルは「研究」柱のカテゴリ新設計画である。コンテンツは既存パイプライン
> （md-files → nextjs-page-migration）で作る。論文サマリーは著作権に配慮し、要約・引用の範囲に留める。
> 「STOP conditions」を守ること。
>
> **Drift check (run first)**: `git diff --stat a9e470c..HEAD -- web-next/app Types-of-headache/md-files`

## Status

- **Priority**: P2
- **Effort**: L
- **Depends on**: plans/001, plans/002（`/research/*` ルート）, plans/003（監視ソース・文献規約）
- **Risk**: MED（論文の引用・著作権、内容の正確性）
- **Category**: direction / docs
- **Planned at**: commit `a9e470c`, 2026-07-09

## Why this matters

疾患・治療ページは「確立した知識」を教えるが、頭痛医学は CGRP 研究をはじめ活発に更新されている。
医学生・研修医・関心の高い患者は「今どこまで分かっているか」「最近何が変わったか」を知りたい。
現状これに応える場がなく、各疾患ページの参考文献リストに知見が散在するだけである。`/research` を
新設し、(1) ガイドライン要約、(2) 注目論文サマリー（journal watch）、(3) 病態生理アップデートを
集約すれば、plans/003 の情報収集運用の「出力先」が定まり、監視→発信のループが閉じる。

## Current state

- 既存の各疾患/治療ページは末尾に参考文献グリッド（`.src-grid`）を持つが、横断的な
  「研究トピック」ページはない。
- plans/003 で監視ソース（ICHD-3・日本頭痛学会 GL・AHS/EHF/NICE・Cochrane・PubMed・主要ジャーナル）と
  四半期の journal-watch サイクルを定義済み。本カテゴリはその受け皿。
- コンテンツパイプライン・デザインシステム・文献規約は既存ページと共通（plans/001・003）。

## 追加するコンテンツ（plans/002 の `/research/*` 準拠）

| ページ（slug） | 内容 | 更新頻度 |
|---|---|---|
| `guidelines` | 主要ガイドラインの要点要約と版管理（日本頭痛学会・AHS・EHF・NICE）。各 GL の位置づけ・主な推奨の概観。全文転載せず要約＋原典リンク | 改訂時 |
| `journal-watch` | 四半期ごとの注目論文サマリー（定型フォーマット、下記）。RCT・メタ解析・重要総説を選定 | 四半期 |
| `pathophysiology` | 病態生理アップデート（三叉神経血管系・CGRP・皮質拡延性抑制など）。既存 `/anatomy` と相互リンク | 随時 |

### 論文サマリーの定型フォーマット（journal-watch の各エントリ）

各論文を以下の構造で 1 カード（既存 `.card` クラス流用）にまとめる：

- **タイトル / 著者 / 出典（ジャーナル・年）/ DOI**
- **研究デザイン**（RCT / コホート / メタ解析 等）と **対象・規模**
- **主要結果**（数値は原典どおり、解釈を混ぜない）
- **臨床的含意**（教育的観点。個別推奨はしない）
- **エビデンスの位置づけ**（plans/003 のエビデンス表記規約に準拠）
- **一次情報へのリンク**（要約は自作、原文転載は引用の範囲に限定）

## 相互リンク設計

- `pathophysiology` ⇄ `/anatomy`（三叉神経血管系の 3D）、⇄ 各疾患ページ（病態の項）
- `guidelines` ⇄ `/medications/*`（plans/004）、⇄ 各疾患ページの治療セクション
- `journal-watch` の各エントリ → 関連する疾患/治療ページ

## Scope

**In scope**:

- 本ファイル（`/research` カテゴリの設計）
- （実装フェーズ）`Types-of-headache/md-files/Research/*.md` の執筆と web-next 移行

**Out of scope**:

- 論文全文の転載・PDF ホスティング（著作権）
- 独自のメタ解析・研究の実施（本プラットフォームは教育目的。一次研究は行わない）
- 論文データベースの自動取り込み（plans/007 将来スパイク候補）

## Steps

### Step 1: `pathophysiology` を先行作成

3 ページ中、既存 `/anatomy`・疾患ページと最も相互補完的な `pathophysiology` を最初に作る。
md を `Types-of-headache/md-files/Research/` に執筆。

**Verify**: `npx markdownlint-cli -c .markdownlint.json <md>` エラー 0。原文転載でなく要約であることを目視。

### Step 2: web-next 移行

`nextjs-page-migration`（アーキタイプ A）で移行。契約テストに `/anatomy` への内部リンク・
参考文献ブロック・免責文言の存在を含める。

**Verify**: `bun run test` green、`typecheck`・`lint` 成功。

### Step 3: `guidelines` → `journal-watch` の順で追加

`guidelines` は plans/003 の監視ソースと対応。`journal-watch` は四半期運用の初回エントリを載せる。
ナビは `Research` ドロップダウンを追加し、未完成は `disabled: true`。

**Verify**: `bun run test`（nav-links 契約テスト含む）green。

## Test plan

- `app/research/pathophysiology/page.test.tsx` 等を既存教育ページの test を手本に作成。
- ケース: (1) 免責文言、(2) 参考文献セクション、(3) `/anatomy` または関連疾患への内部リンク、
  (4) journal-watch はサマリーカード構造の主要要素が揃う。
- 検証: `bun run test -- research` 全 pass。

## Done criteria

- [ ] `npx markdownlint-cli -c .markdownlint.json plans/005-research-evidence.md` → エラー 0
- [ ]（実装フェーズ）論文サマリーが定型フォーマットに従い、原文転載でなく要約＋原典リンクである
- [ ]（実装フェーズ）`bun run test`/`typecheck`/`lint` 成功、新規契約テスト pass
- [ ] plans/002 の `/research/*` slug を使用、plans/003 の文献/エビデンス規約に準拠

## STOP conditions

- 論文本文・図表の転載が要約の範囲を超える場合（`docs/publishing/02` 著作権確認を先行、報告）
- 未発表・査読前情報を確定的知見として書くよう求められた場合（報告）
- 特定治療の推奨・効果保証に踏み込む記述を求められた場合（plans/004 の厳守事項と同じ。報告）

## Maintenance notes

- `journal-watch` は四半期更新が前提。更新が滞ると「最新」を謳うページが最も古くなる矛盾が起きる。
  更新できない期間は「最終更新: YYYY-QN」を明示し、鮮度メタ（plans/007）で棚卸し対象にする。
- レビュー観点: 要約の正確性、原典リンクの有効性、解釈と結果の混同がないか。
- 意図的に先送り: PubMed/Crossref API 連携による半自動の文献取り込みは plans/007 の将来スパイク。
  当面は plans/003 の人手監視で選定する。
