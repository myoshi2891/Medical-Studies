---
name: pre-commit-check
description: >
  Run all checks before committing to verify code quality.
  TRIGGER when the user says any of the following (Japanese or English):
  - "コミット前チェック" / "テスト実行" / "CI 確認"
  - "全部テストして" / "コミットしていいか確認"
  - "pre-commit check" / "run tests" / "check before commit" / "verify build"
  Validates markdown lint/format, Mermaid script tests, link check (if script exists),
  and conditionally validates frontend (bun run test + bun run build) and backend
  (pytest) if those directories exist.
invocation: explicit
allowed-tools:
  - Bash
  - Read
  - Grep
  - Glob
---

# コミット前チェックスキル

## 概要

GEMINI.md（≒ CLAUDE.md）で定義されたコミット前チェックリストを順次実行する。
いずれかのステップが失敗した場合は**即座に停止**してユーザーに報告する。

> [!NOTE]
> 各ステップのコードブロックに記述されている `set -e` は、個別のステップを手動で実行する際のエラー検知を目的として、学習・参照用に独立して記述されています。
>
> これらの手順を 1 つのシェルスクリプトに統合して実行する場合は、スクリプトの先頭に一度だけ `set -e` を宣言してください。

---

## 実行手順

### Step 1: Markdown フォーマットと Lint（必須）

変更した Markdown ファイルに対して実行する。

```bash
set -e
# 変更した Markdown ファイルに対して実行
bun scripts/format-markdown.mjs <file_path>
npx markdownlint-cli -c .markdownlint.json <file_path>
```

### Step 2: Mermaid スクリプトのテスト（必須）

```bash
set -e
python3 -m pytest .claude/skills/fix-mermaid/scripts/test_fix_mermaid.py
```

全テスト PASS を確認する。

### Step 3: リンク有効性検証（`package.json` が存在する場合のみ）

`package.json` が存在し `check-links` スクリプトが定義されている場合のみ実行する：

```bash
set -e
if [ -f "package.json" ] && grep -q '"check-links"' package.json; then
  bun run check-links
fi
```

### Step 4: フロントエンドビルド（`web-next/` が存在する場合のみ）

将来 Next.js アプリが追加された際に実行する：

```bash
set -e
if [ -d "web-next" ]; then
  cd web-next && bun run build
fi
```

`next build` が実行される。型エラー・ビルドエラーがないことを確認する。

### Step 5: フロントエンドテスト（`web-next/` が存在する場合のみ）

将来 Next.js アプリが追加された際に実行する：

```bash
set -e
if [ -d "web-next" ]; then
  cd web-next && bun run test
fi
```

vitest が実行される。全テスト PASS を確認する。

### Step 6: バックエンドテスト（`scraper/` が存在する場合のみ）

```bash
set -e
if [ -d "scraper" ]; then
  cd scraper && uv run pytest
fi
```

### Step 7: 設定ファイルの意図しない変更チェック

以下のファイルが意図せず変更されていないか `git diff` で確認する（ファイルが存在する場合のみ）:

- `.markdownlint.json`
- `.claude/skills/fix-mermaid/scripts/fix_mermaid.py`
- `web-next/next.config.ts`（存在する場合）
- `web-next/biome.json`（存在する場合）

変更がある場合はユーザーに報告して確認を求める。

---

## 判定基準

| 結果 | アクション |
| --- | --- |
| 全ステップ成功 | 「コミット OK」と報告 |
| いずれか失敗 | **停止**してエラー内容をユーザーに報告。自動修正しない |

## 注意事項

- このスキルは `invocation: explicit` — `/pre-commit-check` での手動呼び出しのみ
- テストの書き直しや設定ファイルの変更は行わない
- 失敗時は原因の特定と報告のみ行い、修正はユーザーの指示を待つ
