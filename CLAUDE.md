# GEMINI.md

Updated 2026-06-28

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## プロジェクト概要

頭痛疾患（Types of Headache）の医療教育コンテンツを Markdown で執筆し、スタイル付き HTML に変換するスタディリポジトリ。

- **コンテンツ源**: `Types-of-headache/md-files/{Headaches,Blocks}/*.md` — 国際エビデンス（ICHD-3）に基づいた医療教育 Markdown
- **成果物**: `Types-of-headache/html-files/{Headaches,Blocks}/*.html` — ブラウザで閲覧可能な教育 HTML ページ
- **デザインの権威ソース**: `Types-of-headache/html-files/Headaches/Migraine.html`（CSS 変数・コンポーネントはここを基準とする）

## コマンド

- **Markdown の自動整形（MD012/MD022/MD047 を修正）**:
  `scripts/format-markdown.mjs` スクリプトを用いて、Markdownファイルを自動整形します。
- **Markdown Lint 検証**:
  `npx markdownlint-cli -c .markdownlint.json <ファイルパス>`
- **Mermaid 構文の自動修正（HTML ファイル用）**:
  `python3 .claude/skills/fix-mermaid/scripts/fix_mermaid.py <HTMLファイルパス>`
- **Mermaid 修正スクリプトのテスト**:
  `python3 -m pytest .claude/skills/fix-mermaid/scripts/test_fix_mermaid.py`
- **新規 HTML ページのスケルトン生成（Phase 1）**:
  `scripts/build-html-skeleton.mjs` スクリプトを用いて、新規HTMLページのスケルトンを生成します。詳細は `.claude/skills/md-to-medical-html/SKILL.md` を参照してください。
- **Phase 2/3 — セクション HTML 断片をマーカー位置に挿入**:
  `scripts/insert-sections.mjs` スクリプトを用いて、セクションHTML断片をマーカー位置に挿入します。

## HTML デザインシステム

すべての `.html` ページは `Migraine.html` の CSS 変数とコンポーネントクラスを継承する。

- **CSS 変数・共通コンポーネントクラス（`.card`/`.alert`/`.tbl`/`.mmd`/`.bA`〜`.bU`/`.phase-grid`/`.snoop-grid`/`.moh-grid`/`.src-grid` 等）の完全定義**: `Types-of-headache/html-files/Headaches/Migraine.html` を権威ソースとする。`.claude/skills/css-design-system/SKILL.md` は運用ガイドとして参照する（**重複定義禁止**）。
- **ページ別ヒーローカラー使用済み一覧**: `PROGRESS.md` および新規生成時の `scripts/build-html-skeleton.mjs` が機械的に重複検出する。手動チェック不要。

## Mermaid（HTML 内）必須ルール

- **HTML エンティティエスケープ・SRI ハッシュ・初期化テンプレートの完全仕様**: `.claude/skills/fix-mermaid/SKILL.md` および `.claude/skills/md-to-medical-html/SKILL.md` を参照。
- **CDN URL（現行バージョン）**: `https://cdnjs.cloudflare.com/ajax/libs/mermaid/10.6.1/mermaid.min.js`
- バージョン変更時のハッシュ取得: `GET https://api.cdnjs.com/libraries/mermaid/{VERSION}?fields=sri`

## Markdownlint ルール（有効なもの）

| ルール | 内容 |
|--------|------|
| **MD031** | コードフェンス前後の空行は**必須** |
| **MD012** | 連続空行は**禁止** |
| **MD047** | ファイル末尾の改行は**必須** |
| MD022, MD032 | **無効化済**（空行チェックなし） |
| MD013 | 行長チェックは実質無効（上限 1000 文字） |

## 利用可能なスキル

`.claude/skills/` に格納されたプロジェクト固有スキル:

| スキル名 | 呼び出し方 | 説明 |
|---------|-----------|------|
| `md-to-medical-html` | "HTMLファイルを作成", "頭痛HTMLを作成" | MD → 医療教育 HTML 変換。Mermaid エスケープ・SRI・4フェーズ分割コミット戦略を含む |
| `fix-mermaid` | "mermaid error", "diagram is broken" | HTML 内 Mermaid 構文エラーの修正 |
| `markdown-formatter` | "markdownlint", "MD031" | `.markdownlint.json` 準拠の Markdown 整形 |
| `css-design-system` | "デザインシステムを継承", "CSS変数を適用", "Migraine.htmlのデザイン", "CSS共通クラス" | デザインシステム（`Migraine.html`）を継承し、プレーン HTML/CSS の一貫性を維持するためのルール |
| `check-docs-sync` | "ドキュメントを同期して", "docs sync", "/check-docs-sync" | git push 後にドキュメント（GEMINI.md・PROGRESS.md 等）の更新漏れを検出・修正 |
| `pre-commit-check` | "/pre-commit-check", "コミット前チェック" | コミット前の Markdown Lint・Mermaid テスト・フロントエンドビルド/テスト（条件付き）を検証（手動呼び出しのみ） |
| `spec-sync` | "仕様書同期", "ドキュメント同期", "仕様同期" | GEMINI.md / CLAUDE.md / PROGRESS.md とコード実態の乖離を検出・修正 |
| `nextjs-page-migration` | "/nextjs-page-migration", "HTMLをNext.jsに移行", "ガイドページを移行", "SPAをNext.jsに移行" | HTML を `web-next/` Next.js App Router へ TDD 移行。2 アーキタイプ対応: A=静的教育ページ（`html-files/`・Server Component）/ B=インタラクティブ SPA（`prom-checker/index.html`・コア抽出 + StorageAdapter、参照実装は `lib/prom/`・`components/prom/`） |
| `glossary-term-tooltip` | "用語ツールチップを追加", "やさしい解説を追加", "読み仮名を付ける", "用語集に追加" | web-next の専門用語に読み仮名＋やさしい解説のツールチップを付与。用語集レジストリ（`lib/glossary`）に語を追記し、本文初出を `<Term>`（`components/glossary/Term.tsx`）でラップ。契約テスト非破壊手順を含む |

> [!NOTE]
> `GEMINI.md` と `CLAUDE.md` は**同一内容**（`GEMINI.md` が SSoT）。一方を更新したら `spec-sync` スキルで他方も同期すること。

## コミット規約

フォーマット: `<type>(<scope>): <subject>`

| type | 用途 |
|------|------|
| `feat` | 新規コンテンツ・機能 |
| `fix` | バグ・誤情報の修正 |
| `docs` | Markdown の更新 |
| `chore` | 設定・スクリプトの変更 |

**大規模 HTML ファイル作成時**は 4 フェーズに分割してコミットする（`md-to-medical-html` スキル参照）。コミットメッセージに `Progress: N/M sections complete` を含める。

## 既知の誤検知

- **cSpell**: 医療略語（ICHD, CTTH, NSAIDs, Cochrane 等）は登録外のため `Unknown word` 警告が出るが対応不要
- **SonarQube css:S7924**: CSS カスタムプロパティ（`var(--xxx)`）を解決できないため誤ってコントラスト不足と判定する場合がある。実色で確認すること
