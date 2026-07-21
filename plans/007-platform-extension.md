# Plan 007: 技術基盤を拡張し、コンテンツ増加に耐えるプラットフォームにする

> **Executor instructions**: 本ファイルはコンテンツ量の増加（plans/002〜006 で 20+ ページ増）に
> 耐えるための技術基盤拡張計画である。既存の実装パターン（`lib/anatomy/search.ts` の宣言的
> マニフェスト＋純関数コア）を **再利用** することが方針。新規の重い依存追加は避ける。
> 「STOP conditions」を守ること。
>
> **Drift check (run first)**: `git diff --stat a9e470c..HEAD -- web-next/lib web-next/components/site web-next/app/sitemap.ts web-next/app/layout.tsx`

## Status

- **Priority**: P2（コンテンツが 10 ページ超増える前に着手）
- **Effort**: L
- **Depends on**: plans/001, plans/002（カテゴリ体系）。plans/003 の鮮度メタ規約を実装で受ける
- **Risk**: MED（横断機能はページ数に比例して回帰リスクが増える）
- **Category**: tech-debt / dx / direction
- **Planned at**: commit `a9e470c`, 2026-07-09

## Why this matters

現在 20 ページ規模の web-next は、plans/002〜006 で疾患 7・集団 3・薬物 4・研究 3・療養 5 など
20 ページ以上増える見込みである。今の構成には、(1) ページ横断のコンテンツ検索がない
（`/anatomy` 内検索はあるがサイト全体はない）、(2) ナビが 10 グループに達し飽和する、
(3) plans/003 が要求する「最終更新日メタデータ」の置き場所がない、(4) サイトマップ・
用語集の全ページ展開が手作業、という弱点がある。コンテンツを足す前に基盤を整えないと、
ページ追加のたびに手作業コストと不整合リスクが線形に増える。本プランは既存パターンの再利用で
これらを解決する。

## Current state（再利用する既存パターン）

- **宣言的レジストリ＋純関数コア**: `web-next/lib/anatomy/search.ts` は `ANATOMY_MANIFEST` を
  索引源に、DOM 非依存の純関数で横断照合する（`buildIndex()` でモジュールロード時に索引構築、
  `SearchHit`/`IndexEntry` 型）。同 `lib/prom/registry.ts`、`lib/export/registry.ts` も
  「宣言的レジストリ」パターン。**サイト全体検索もこの形を踏襲**する。
- **用語集**: `lib/glossary`＋`components/glossary`（AutoGlossary/`<Term>`）。初出を自動 `<Term>` 化する
  仕組みが既にあり、`glossary-term-tooltip` スキルで運用される。全ページ展開はこの仕組みの適用拡大。
- **ナビ**: `components/site/nav-links.ts`（`NavLeaf`/`NavDropdown` 型、`isSafeHref` 検証、
  `disabled` 機構、開発時アサーション）。`SiteHeader`/`SiteHeaderClient` がレンダリング。
- **テスト**: 各ページに `page.test.tsx` 契約テスト（356 tests green）。`vitest` + Testing Library。
- サイトマップ生成・ページメタデータ基盤の有無は未確認 → Step 0 で調査する。

## 拡張項目（優先度順）

### A. コンテンツメタデータ基盤（plans/003 の鮮度メタを受ける器）

各ページの `lastReviewed`/`sourcesAsOf`/カテゴリ/タグを **宣言的レジストリ** に集約する
（`lib/content/registry.ts` 新設を想定。`lib/anatomy/manifest.ts` の型定義スタイルを踏襲、
`any` 禁止・`readonly` 型）。これが下記 B・C・D の共通データ源になる。

### B. サイト横断検索

A のレジストリを索引源に、`lib/anatomy/search.ts` の `buildIndex()`＋純関数照合パターンを
サイト全体へ一般化（`lib/content/search.ts`）。UI はコアを呼ぶ薄い層（既存 `AnatomySearch` と同構造）。

### C. ナビ再設計（飽和対策）

plans/002 でグループが 10 に達しヘッダーが横溢する。対策の選択肢を評価して 1 つ選ぶ：
(1) メガメニュー化、(2) 2 階層グルーピング（「疾患を知る／治療／療養／研究」の 4 メタグループ）、
(3) 検索優先＋ナビ簡素化。`nav-links.ts` の型（`NavLeaf`/`NavDropdown`）を拡張し、
`isSafeHref`・開発時アサーション・`disabled` 機構は保持する。

### D. サイトマップ & 用語集展開

A のレジストリから `app/sitemap.ts`（Next.js メタデータ）を生成。用語集 `<Term>` を
新規カテゴリ全ページに適用（`glossary-term-tooltip` スキル運用）。

## Scope

**In scope**（実装フェーズ）:

- 本ファイル（技術拡張の設計）
- `lib/content/`（レジストリ＋検索コア、新設。`lib/anatomy` パターン踏襲）
- `components/site/nav-links.ts`（型拡張。後方互換を保つ）とヘッダー UI
- `app/sitemap.ts`（新設または拡張）
- 対応する `*.test.ts` / `page.test.tsx`

**Out of scope**:

- コンテンツ本文の執筆（plans/004〜006）
- `lib/prom`・`lib/export`・`app/prom-checker` のロジック変更（メタ登録の参照のみ、挙動は不変）
- 重量級の外部検索サービス（Algolia 等）の導入（自前の純関数検索で足りる規模。将来スパイク）
- 多言語化・認証・収益化（下記「将来スパイク」で優先度管理のみ）

## Steps

### Step 0: 現状調査（実装前）

`app/sitemap.ts`・ページ `metadata` エクスポートの有無、`lib/anatomy/manifest.ts` の型定義スタイル、
`nav-links.ts` の契約テストを読む。

**Verify**: 調査メモに「サイトマップ有無」「メタデータ基盤有無」「再利用する型/関数の一覧」が揃う。

### Step 1: コンテンツレジストリ新設（A）

`lib/content/registry.ts` と型を追加。既存ページ分のメタ（カテゴリ・slug・`lastReviewed`）を登録。
`lib/anatomy/manifest.ts` を手本に `readonly` 型・宣言的定義とする。

**Verify**: `bun run typecheck` exit 0。`lib/content/registry.test.ts` が全エントリの
href 安全性（`isSafeHref` 再利用）と slug 一意性を検証し pass。

### Step 2: 横断検索コア（B）

`lib/content/search.ts` を `lib/anatomy/search.ts` の構造で実装（`buildIndex`＋純関数照合）。

**Verify**: `bun run test -- content/search` で happy path・no-hit・部分一致のケースが pass。

### Step 3: サイトマップと用語集展開（D）

`app/sitemap.ts` をレジストリから生成。新カテゴリページに `<Term>` 適用。

**Verify**: `bun run build` 成功、sitemap に全登録 URL が出力される（テストで件数一致を確認）。

### Step 4: ナビ再設計（C）

選定した方式で `nav-links.ts` の型とヘッダーを拡張。`isSafeHref`・アサーション・`disabled` を保持。

**Verify**: `bun run test`（nav-links 契約テスト）green、`bun run build` 成功。

## Test plan

- `lib/content/registry.test.ts`: 全 href が `isSafeHref` を満たす、slug 重複なし、
  各エントリが必須メタ（category/slug/lastReviewed）を持つ。
- `lib/content/search.test.ts`: `lib/anatomy/search.test.ts` を手本に、ヒット/ノーヒット/
  部分一致/種別（structure 相当のページ種別）を網羅。
- `app/sitemap.test.ts`: レジストリ件数と sitemap エントリ数が一致。
- 既存 356 tests が不変で green（回帰なし）であること。

## Done criteria

- [ ] `npx markdownlint-cli -c .markdownlint.json plans/007-platform-extension.md` → エラー 0
- [ ]（実装フェーズ）`bun run typecheck`/`test`/`build`/`lint` すべて成功
- [ ]（実装フェーズ）`lib/content` が `lib/anatomy` の宣言的レジストリ＋純関数パターンを踏襲
      （`any` 不使用・`readonly` 型・DOM 非依存コア）
- [ ]（実装フェーズ）既存 356 tests が green のまま（回帰なし）
- [ ] plans/003 の鮮度メタ（`lastReviewed` 等）を格納する器がレジストリに存在する

## STOP conditions

- 検索/レジストリ実装のために重量級の外部依存（検索 SaaS・全文検索エンジン）が必要に見えた場合
  （現規模では純関数で足りる設計のはず。報告して規模を再評価）
- ナビ再設計が既存 URL の変更を要求する場合（plans/002 の「URL は変えない」原則違反。報告）
- `lib/prom`/`lib/export`/`prom-checker` の挙動変更が必要になった場合（メタ参照のみのはず。報告）
- CLAUDE.md の `any` 禁止・早期リターン等のコード規約と衝突する実装しか思いつかない場合（報告）

## Maintenance notes

- コンテンツレジストリ（A）が全横断機能の単一データ源になる。新規ページ追加時は
  「md 執筆 → web-next 移行 → **レジストリ登録**」を 1 セットにする（登録漏れは検索・sitemap・
  鮮度棚卸しから欠落する）。契約テストで「app/ 配下の全ページがレジストリに存在する」を
  検証すると登録漏れを機械検知できる。
- レビュー観点: 純関数コアが DOM/React に依存していないか、レジストリ型に `any` がないか、
  既存テストの回帰、URL 不変。
- 将来スパイク（優先度のみ管理、本プラン外）: 多言語化（i18n）、文献 API 半自動取り込み
  （plans/003/005 と連動）、`prom-checker` のデータ可視化強化（plans/006 と連動）、
  検索 SaaS 移行（ページ数が純関数検索の実用限界を超えたら再評価）。いずれも plans/001 の
  ビジョン（教育専用・SaMD 非該当）を逸脱しない範囲に限る。
