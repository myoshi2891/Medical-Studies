# Plan 013: プライバシーポリシーと利用規約のページを新設し、全ページから到達可能にする

> **Executor instructions**: 本文ドラフトは本プランに全文を収載している。執筆者の判断で内容を
> 追加・削除せず、**そのまま転記**すること（文言の法的判断は実行者の仕事ではない）。
> 各ステップの検証コマンドを実行し、期待結果を確認してから次へ進む。
> 「STOP conditions」該当時は停止して報告する。完了時に `plans/README.md` の Status を更新する。
>
> **Drift check (run first)**:
> `git diff --stat 6614b7c..HEAD -- web-next/app web-next/components/site docs/publishing/05-legal-and-regulatory.md`
> `web-next/app/privacy` または `web-next/app/terms` が既に存在する場合は STOP（二重実施）。

## Status

- **Priority**: P1（監査所見 F5 — 利用規約・プライバシーポリシー未整備）
- **Effort**: M
- **Risk**: LOW（静的ページの追加とフッター新設のみ）
- **Depends on**: なし（文言は `plans/012` の注意喚起・`docs/publishing/05-legal-and-regulatory.md` §4 と整合済み）
- **Category**: legal-compliance / docs
- **Planned at**: commit `6614b7c`, 2026-07-09

## Why this matters

健康データ（頭痛日誌・PROM スコア）を扱う公開 Web アプリでありながら、利用規約もプライバシー
ポリシーも存在しない。実態は「サーバに何も送らない」設計（端末内 localStorage のみ・任意の
Google 連携も利用者自身のアカウントへ直接送信）で説明は簡潔に済むが、**文書がなければ利用者は
それを知りようがない**。`docs/publishing/05-legal-and-regulatory.md` §4 が骨子を定義済みであり、
本プランはそれをページとして実装する。

> [!IMPORTANT]
> 本ドラフトは法務レビュー前の暫定文書である。ページ末尾に「本文書は暫定版です」の注記を含める
> （ドラフト内に記載済み）。法務レビュー後の文言確定は別途行う。

## Current state

- `web-next/app/` に `privacy` / `terms` ルートは存在しない。`/`（`app/page.tsx`・8 行）は
  `/prom-checker` へ redirect するのみ。
- レイアウト: `web-next/app/layout.tsx`（35 行）— `<SiteHeader />` と `<DisclaimerBanner />` を
  `<body>` 直下に置き、`{children}` を描画する。**フッターは存在しない**。
- メタデータの書式: 各静的ページは `export const metadata: Metadata = {...}` を使う
  （例: `web-next/app/anatomy/page.tsx:10`）。
- ナビ定義: `web-next/components/site/nav-links.ts` — `navLinks` 配列（リーフ／ドロップダウン）。
  `isSafeHref` による開発時アサーションあり。ヘッダナビは教育コンテンツ用のため、
  法務ページは**フッターから**リンクする（ナビには追加しない）。
- 実態の事実確認（ポリシー本文の根拠）:
  - 保存キー: `web-next/lib/prom/storage.ts` の `KEYS` 4 種（settings / snoop / diary / scores）
  - Google 連携: `drive.file` 最小スコープ（`web-next/lib/export/google/gis.ts:11`）、
    トークンはメモリのみ（`DataManager.tsx` 28–29 行のコメント）
  - アクセス解析・トラッキング Cookie: **なし**（gtag / plausible 等の grep 結果 0 件）
  - フォント: `next/font` で自己ホスト（外部フォント配信への接続なし）
- スタイル: グローバル CSS は `web-next/app/globals.css`。静的教育ページはページ専用 CSS を
  併置する形式（例: `app/prom/headache-impact-test/headache-impact-test.css`）だが、
  本ページは装飾最小のためグローバルの範囲で足りる（新規 CSS ファイル不要）。

## Commands you will need

| Purpose | Command（`web-next/` で実行） | Expected on success |
|---|---|---|
| Install | `bun install --frozen-lockfile` | exit 0 |
| Typecheck | `bun run typecheck` | exit 0 |
| Tests | `bun run test` | 全 pass |
| Lint | `bun run lint` | exit 0 |
| Build | `bun run build` | exit 0（/privacy /terms がルート一覧に出る） |

## Scope

**In scope**（変更してよいファイル）:

- `web-next/app/privacy/page.tsx`（新規）
- `web-next/app/terms/page.tsx`（新規）
- `web-next/components/site/SiteFooter.tsx`（新規）
- `web-next/components/site/SiteFooter.test.tsx`（新規）
- `web-next/app/layout.tsx`（`<SiteFooter />` の設置のみ）
- `web-next/app/globals.css`（フッター用の最小スタイル追加のみ）
- `docs/publishing/05-legal-and-regulatory.md`（チェックリスト更新）

**Out of scope**（触らない）:

- `web-next/components/site/nav-links.ts` — ヘッダナビへは追加しない（フッター掲載で足りる）。
- `DisclaimerBanner.tsx` — 免責バナーは現状のまま。
- ポリシー・規約の**文言の改変** — ドラフトの転記のみ。誤字を見つけた場合も報告に留める。

## Git workflow

- ブランチ: `advisor/013-legal-pages`（`dev` から分岐）
- コミット形式: `feat(site): <subject>`。push・PR はユーザー指示があるまで行わない。

## Steps

### Step 1: プライバシーポリシーページを作成する

`web-next/app/privacy/page.tsx` を Server Component（`"use client"` なし）で作成する。
`metadata` は `title: "プライバシーポリシー | 頭痛 PROM 統合チェッカー"`。
以下のドラフトを `<main>` 内に h1 / h2 / p / ul で忠実に転記する:

```text
# プライバシーポリシー

最終更新日: <実装日を YYYY-MM-DD で記入>

本サイト（頭痛医学教育・PROM 統合チェッカー）は、医療教育と自己記録の支援を目的とした
非営利の公開ウェブサイトです。本ポリシーは、本サイトが扱う情報とその保存場所を説明します。

## 1. 収集する情報と保存場所

- 本サイトには利用者の情報を収集・保存するサーバがありません。
- 頭痛日誌・PROM スコア・設定・SNOOP チェック履歴は、すべて利用者の端末内
  （ブラウザの localStorage）にのみ保存されます。運営者はこれらのデータに一切アクセスできません。
- 氏名・生年月日・連絡先などの個人識別情報を入力する欄はありません。

## 2. 外部送信（Google 連携を有効化した場合のみ）

- 「Google スプレッドシートへ同期」機能は任意機能です。利用者が明示的に接続・同意した
  場合にのみ、記録データが利用者自身の Google アカウント（Google Drive / スプレッドシート）へ
  直接送信されます。運営者のサーバは仲介しません。
- 要求する権限は drive.file（本アプリが作成したファイルのみへのアクセス）に限定されます。
- アクセストークンはブラウザのメモリ上でのみ扱い、保存されません。ページを閉じると失効します。

## 3. Cookie・アクセス解析

- 本サイトはトラッキング Cookie・アクセス解析ツール・広告配信を使用していません。
- フォント等のアセットは本サイト自身から配信され、第三者への接続は第 2 条の Google 連携時を
  除き発生しません。

## 4. 共有端末での注意とデータの削除

- 記録は端末のブラウザに残るため、共有・公共の端末での利用はお控えください。
- 記録アプリ内の「データ管理」→「すべてのデータを削除」で、端末内の全データを消去できます。
  ブラウザのサイトデータ消去でも同様に削除されます。

## 5. 本ポリシーの変更

- 本ポリシーを変更する場合は、本ページの更新をもって告知します。

## 6. お問い合わせ

- 本サイトに関する問い合わせは、GitHub リポジトリの Issue で受け付けます。

※ 本文書は暫定版であり、専門家によるレビュー後に更新されることがあります。
```

**Verify**: `bun run typecheck` → exit 0

### Step 2: 利用規約ページを作成する

`web-next/app/terms/page.tsx` を同じ書式で作成する。
`metadata` は `title: "利用規約 | 頭痛 PROM 統合チェッカー"`。ドラフト:

```text
# 利用規約

最終更新日: <実装日を YYYY-MM-DD で記入>

本サイトを利用することで、以下の規約に同意したものとみなします。

## 1. 目的と性質

- 本サイトは頭痛疾患に関する医学教育コンテンツの提供と、利用者自身による記録
  （頭痛日誌・患者報告アウトカム尺度）の支援を目的とします。
- 本サイトは医療機器・診断ツールではありません。表示されるスコアや解釈の目安は
  各尺度の提供元が定義する一般的な参考値であり、個別の医学的助言・診断・治療の
  推奨ではありません。

## 2. 医療上の免責

- 本サイトの情報は医師による診断・治療の代替にはなりません。症状がある場合は
  必ず医療機関を受診してください。
- 緊急を要する症状（本サイトのレッドフラッグ・チェックの項目等）がある場合は、
  本サイトの利用にかかわらず直ちに受診してください。

## 3. 無保証・責任の制限

- 本サイトは情報の正確性・完全性・最新性・可用性を保証しません。
- 本サイトの利用または利用不能から生じたいかなる損害についても、運営者は
  法令上許容される最大限の範囲で責任を負いません。
- 記録データは利用者の端末に保存されます。端末・ブラウザの状態に起因する
  データの消失について、運営者は責任を負いません（エクスポート機能による
  バックアップを推奨します）。

## 4. 知的財産・第三者の権利

- 本サイトのソースコードとコンテンツのライセンスは、リポジトリの LICENSE および
  THIRD_PARTY_NOTICES.md に定めるとおりです。
- 収載する臨床評価尺度には第三者が権利を有するものが含まれます。それらの複製・
  再配布には権利者の許諾条件が適用されます。

## 5. 禁止事項

- 本サイトを医療行為・診断の根拠として第三者に提供する行為
- 本サイトの運営を妨害する行為

## 6. 準拠法

- 本規約は日本法に準拠します。

## 7. 規約の変更

- 本規約を変更する場合は、本ページの更新をもって告知します。

※ 本文書は暫定版であり、専門家によるレビュー後に更新されることがあります。
```

**Verify**: `bun run typecheck` → exit 0

### Step 3: SiteFooter を作成し全ページへ設置する

1. `web-next/components/site/SiteFooter.tsx` を新規作成する（Server Component で可）:

   ```tsx
   import Link from "next/link";

   /** 全ページ共通フッター。法務ページと帰属への導線を常設する。 */
   export function SiteFooter() {
     return (
       <footer className="site-footer">
         <nav aria-label="サイト情報">
           <Link href="/privacy">プライバシーポリシー</Link>
           <span aria-hidden="true">・</span>
           <Link href="/terms">利用規約</Link>
         </nav>
         <p>本サイトは医療教育目的であり、診断・治療の代替にはなりません。</p>
       </footer>
     );
   }
   ```

2. `web-next/app/layout.tsx` の `{children}` の直後に `<SiteFooter />` を追加する（import 込み 2 行）。
3. `web-next/app/globals.css` の末尾に最小スタイルを追加する（既存のデザイントークンに
   合わせた控えめな配色。中央寄せ・小さめフォント・上部余白）。クラス名は `site-footer` 接頭辞で
   衝突を避ける。

**Verify**: `bun run typecheck && bun run build` → exit 0。
`bun run dev` で任意ページ最下部にフッターが表示され、リンク 2 件が機能する。

### Step 4: テストを追加する

`web-next/components/site/SiteFooter.test.tsx` を新規作成する（Testing Library。既存の
コンポーネントテストの書式を手本にする）:

- 「プライバシーポリシー」リンクが `href="/privacy"` を持つ。
- 「利用規約」リンクが `href="/terms"` を持つ。

**Verify**: `bun run test` → 全 pass（新規 2 件を含む）

### Step 5: 文書更新

`docs/publishing/05-legal-and-regulatory.md` §5 チェックリストの
「プライバシーポリシーを別途起草した」「利用規約を別途起草した」を `[x]` 化し、
ルート（`/privacy`・`/terms`）と「暫定版・法務レビュー待ち」の状態を付記する。

**Verify**: `npx markdownlint-cli -c .markdownlint.json docs/publishing/05-legal-and-regulatory.md` → エラー 0

## Test plan

- 新規: `SiteFooter.test.tsx` の 2 件（リンク先の検証）。
- 回帰: `bun run test` 全体 — layout 変更で既存のページテスト（`app/prom-checker/page.test.tsx` 等）が
  壊れないこと。
- ビルド検証: `bun run build` の出力に `/privacy` と `/terms` が静的ルートとして現れること。

## Done criteria

- [ ] `/privacy` と `/terms` がビルドされ、ドラフト全文（見出し 6〜7 個）が表示される
- [ ] 全ページ最下部のフッターから両ページへ遷移できる
- [ ] 両ページに「最終更新日」と「暫定版」注記がある
- [ ] `bun run typecheck` / `bun run test` / `bun run lint` / `bun run build` すべて exit 0
- [ ] In scope 外のファイルに変更がない（`git status`）
- [ ] `plans/README.md` の Status 更新

## STOP conditions

- `app/layout.tsx` の構造が「Current state」の抜粋（SiteHeader / DisclaimerBanner / children）と
  異なる場合。
- ドラフトの記述と実装の実態が食い違う事実を発見した場合（例: アクセス解析が導入されていた、
  localStorage 以外への保存が増えていた）— **文言を変えずに**報告する（ポリシーが実態と異なる
  まま公開されるのが最悪の結果）。
- フッター設置で既存テストが 3 件以上失敗する場合。

## Maintenance notes

- **実装が変わったらポリシーも変える**: Google 連携のスコープ変更・アクセス解析の導入・
  ストレージ方式の変更は、必ず `/privacy` の該当条項と `plans/012` の `StorageNotice` 文言の
  更新をセットにすること（レビュー観点）。
- 法務レビュー後の文言確定時は「最終更新日」を更新し、「暫定版」注記を外す。
- SNOOP4 の扱いなど医療免責の文言は `DisclaimerBanner` と重複するが、バナー（常時視認）と
  規約（網羅的記述）で役割が異なるため統合しない。
