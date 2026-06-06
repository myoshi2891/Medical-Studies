---
paths:
  - "Types-of-headache/md-files/**/*.md"
  - "Types-of-headache/html-files/**/*.html"
  - "PROGRESS.md"
---

# PROGRESS.md セッション終了前・完了後同期ルール

Markdown から HTML への変換作業および修正作業において、セッションが終了する前、または各ページの作成・修正完了時に、必ず `PROGRESS.md` を最新の状態に同期する。

## 実行タイミング

<ai_agent_directive>
**AI エージェントへの厳格な指示**:
本手順は、作業状況のトレーサビリティを保つための**絶対的なゲート条件（Gate Condition）**です。
1ページの作業が完了し、`git commit` を行う前後、または次のページの読み込みを開始する前に、必ず `PROGRESS.md` を更新し、単独でコミットしてください。進捗ファイルの更新を無視して次の作業に進むことは禁止されています。
</ai_agent_directive>

### 必須のタイミング
- 新規 HTML ページの作成（Phase 4/4 完了時）および大きな修正が完了し、コミットした直後。
- ユーザーから「セッション終了」「作業を中断する」「一時停止」などの指示があった場合。

---

## 手順

### 1. 検証確認

`PROGRESS.md` を更新する前に、変更を加えたすべてのファイルが以下の検証をパスしていることを確認する：

```bash
# Markdown 整形と Lint の確認
bun scripts/format-markdown.mjs <ファイルパス>
npx markdownlint-cli -c .markdownlint.json <ファイルパス>

# Mermaid 構文の自動修正とテストの確認
python3 .claude/skills/fix-mermaid/scripts/fix_mermaid.py <HTMLファイルパス>
python3 -m pytest .claude/skills/fix-mermaid/scripts/test_fix_mermaid.py
```

最新の git コミットハッシュを取得する：

```bash
git rev-parse --short HEAD
```

### 2. `PROGRESS.md` を更新

以下の項目を最新の状態に更新する：

| 項目 | 更新内容 |
|---|---|
| `最新 HEAD` | `git rev-parse --short HEAD` で取得したハッシュ値 + 最後のコミットメッセージ |
| `ビルド状態` | テスト実行状況が正常であることを記載 |
| `次の作業` | 次のセッション、または次に最初に取り掛かる作業（例: `Occipital-Nerve-Block.html 移行`） |
| `未移行 HTML 残数` | 残りの未作成 HTML ファイルの数を更新 |
| `移行ステータス` (テーブル) | 完了したファイルのステータスを `✅ 完了` に更新し、日付や備考を必要に応じて追記 |

### 3. コミット

`PROGRESS.md` の更新のみを対象としてコミットを実行する：

```bash
git add PROGRESS.md
git commit -m "chore(docs): update PROGRESS.md — <作業内容の1行要約>"
```

---

## 禁止事項
- コミットハッシュ（HEAD）やステータスを更新せず、進捗がズレた状態でセッションを終了すること。
- 検証チェック（Lint / テスト）でエラーが残っている状態で `PROGRESS.md` を完了扱いにして同期すること。
