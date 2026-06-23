---
name: check-docs-sync
description: >
  Verify and update documentation after a git push containing feat/fix/refactor commits.
  TRIGGER when the user says any of the following (Japanese or English):
  - "ドキュメントを同期して" / "ドキュメント更新漏れを確認"
  - "push したからドキュメント確認して" / "仕様書を最新化"
  - "docs が古い" / "stale docs" / "doc sync" / "docs sync"
  - "/check-docs-sync"
  Detects stale sections in GEMINI.md, CLAUDE.md, PROGRESS.md, and
  .claude/skills/*/SKILL.md by comparing git-diff output against actual file state.
  Updates only the sections that are out of date. Does NOT run bun/pytest.
allowed-tools:
  - Bash
  - Read
  - Edit
---

# ドキュメント同期スキル

## 概要

このスキルは `git diff` で変更ファイルを特定し、ファイル種別→更新対象ドキュメントの
マッピングテーブルに従って **必要なドキュメントのセクションのみ** を更新する。

| 原則 | 内容 |
|---|---|
| 最小 Read | セクション行番号を先に `grep -n` で特定し `offset + limit` で部分読み込み |
| 事実のみ記録 | `find` / `grep` の実測値のみ使用。推測で記述しない |
| 1 箇所ずつ Edit | 複数箇所を一括置換せず 1 Edit = 1 変更 |
| GEMINI.md が SSoT | コマンド・設定の不一致は常に GEMINI.md に従う（CLAUDE.md と同内容） |

---

## Step 1: コミット範囲と変更ファイルの取得

### 1-1. コミット範囲を確定する

ユーザーが明示的にコミット範囲（例: `abc123..HEAD` や `HEAD~3..HEAD`）を指定した場合はそれを使用する。
指定がない場合は最新の feat / fix / refactor コミットを確認して範囲を決める:

```bash
git log --oneline -10
```

デフォルトは、最新の feat / fix / refactor コミットを起点とした範囲。

### 1-2. 変更ファイル一覧を取得する

最新の feat / fix / refactor コミットのハッシュを起点に差分を取得する:

```bash
BASE=$(git log --format="%H" --grep='^feat\|^fix\|^refactor' -n 1 2>/dev/null)
if [ -n "$BASE" ]; then
  git diff --name-only "${BASE}^..HEAD"
else
  # 対象コミットが見つからない場合のフォールバック
  git diff --name-only HEAD~1..HEAD
fi
```

ユーザーがコミット範囲を明示した場合（例: `abc123..HEAD`）はそのまま使用する:

```bash
git diff --name-only <from>..<to>
```

---

## Step 2: ファイル種別 → 更新対象ドキュメントのマッピング

Step 1-2 の出力と以下のテーブルを照合し、更新が必要なドキュメントを列挙する。
複数のパターンに該当する場合は全て列挙する。

| 変更されたファイルのパターン | 更新対象ドキュメント |
|---|---|
| `Types-of-headache/md-files/**/*.md`（新規・編集） | `PROGRESS.md` 移行ステータステーブル、`GEMINI.md`/`CLAUDE.md` コンテンツ源セクション |
| `Types-of-headache/html-files/**/*.html`（新規） | `PROGRESS.md` 移行ステータステーブル（✅ 完了に更新）、`GEMINI.md`/`CLAUDE.md` 成果物セクション |
| `scripts/*.mjs`（新規・変更） | `GEMINI.md`/`CLAUDE.md` コマンドセクション |
| `.claude/skills/*/SKILL.md` | `GEMINI.md`/`CLAUDE.md` 利用可能なスキルセクション |
| `.claude/rules/*.md` | `GEMINI.md`/`CLAUDE.md` 参照先としてリスト確認 |
| `*.test.ts` / `*.test.py`（新規追加） | `/check-docs-sync` では対応しない。ユーザーへ報告 |

対象ドキュメントが 0 件の場合はその旨を報告して終了する。

---

## Step 3: 対象セクションの行番号を特定する

各 (ドキュメント, セクション) のペアについて、`grep -n` でセクション開始行を特定する。

### よく使うパターン

```bash
# GEMINI.md / CLAUDE.md のセクション位置
grep -n "## コマンド\|## 利用可能なスキル\|## プロジェクト概要" GEMINI.md

# PROGRESS.md のセクション位置
grep -n "## 移行ステータス\|## 現在地" PROGRESS.md

# SKILL.md のコマンド位置
grep -n "bun scripts\|python3\|npx" .claude/skills/pre-commit-check/SKILL.md
```

---

## Step 4: 対象セクションを部分読み込みする

行番号が判明したら `offset` と `limit` を指定して対象範囲だけを Read する。
ファイル全体の読み込みは禁止。

---

## Step 5: コード実態を確認する

ドキュメントと比較するための実際のファイル状態を取得する。

### 現在の Markdown / HTML ファイルの実態確認

```bash
find Types-of-headache/md-files -name "*.md" | sort
find Types-of-headache/html-files -name "*.html" | sort
```

### スクリプトの実態確認

```bash
find scripts -name "*.mjs" | sort
```

### スキル一覧の実態確認

```bash
ls .claude/skills/
```

### CI コマンドの確認

GEMINI.md の `## コマンド` セクションを Read して正しいコマンドを確認する（外部ツール実行不要）。

---

## Step 6: 差分を判定して Edit する

Step 4（ドキュメントの現状）と Step 5（コードの実態）を比較し:

- **差分なし** → そのドキュメント/セクションをスキップ（変更しない）
- **差分あり** → 以下のパターンに従って Edit する。1 箇所ずつ順番に実行する

### 6-1. PROGRESS.md 移行ステータステーブルへの行追記

完了した HTML ページを `✅ 完了` として追記する。

書式（既存行のスタイルに合わせる）:

```text
| Headaches | <疾患名> | [<md>.md](Types-of-headache/md-files/…) | [<html>.html](Types-of-headache/html-files/…) | ✅ 完了 | <備考> |
```

### 6-2. SKILL.md のコマンド修正

`.claude/skills/*/SKILL.md` 内のコマンドが GEMINI.md と食い違っている場合:

| 典型的な誤りパターン | 正しい記述 |
|---|---|
| `npm run` | `bun run` または `bun scripts/…` |
| 旧スクリプトパス | `scripts/` ベースの現行パス |

### 6-3. PROGRESS.md の HEAD ハッシュ（スキップ）

HEAD ハッシュは `migration-progress-sync` ルールが担当。このスキルでは変更対象外。

### 6-4. テスト数の更新（このスキルでは対応しない）

テスト数の変更はこのスキルでは対応しない。ユーザーへ報告のみ。

---

## Step 7: 実行結果を報告する

以下の形式でまとめる（テーブルで差分なし / 更新済み / スキップを明記）:

```
## ドキュメント同期レポート

### 対象コミット範囲
HEAD~1..HEAD

### 変更されたファイル（対象パターンにマッチしたもの）
- Types-of-headache/html-files/Headaches/Migraine.html（新規）

### 確認・更新結果

| ドキュメント | セクション | 結果 |
|---|---|---|
| PROGRESS.md | 移行ステータス | 更新: Migraine を ✅ 完了 に追記 |
| GEMINI.md | 利用可能なスキル | 差分なし。スキップ |
| PROGRESS.md | — | スキップ（HEADハッシュは migration-progress-sync が担当） |
```

---

## 注意事項

- **`GEMINI.md` と `CLAUDE.md` は同内容**（`GEMINI.md` が SSoT）。どちらかを更新した際はもう一方も同期する
- **ビルド・テスト実行禁止**（`bun run build` / `pytest` は実行しない）
- **推測で記述しない**（`find` / `grep` の実測値のみ）
