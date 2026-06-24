---
name: spec-sync
description: Audit and update repository specifications (GEMINI.md, CLAUDE.md, PROGRESS.md) to prevent spec drift.
trigger: "仕様書更新", "仕様書同期", "ドキュメント更新", "ドキュメント同期", "仕様同期"
---

# 仕様書同期スキル (spec-sync)

## 目的

機能追加、リファクタ、またはドキュメント構造の変更後に生じる、プロジェクトの主要ドキュメント（`GEMINI.md`, `CLAUDE.md`, `PROGRESS.md`）と実コード・ディレクトリ構造の乖離を検出し、整合性を維持した状態に同期・更新します。

> [!IMPORTANT]
> `GEMINI.md` と `CLAUDE.md` は**同一内容を維持**する（`GEMINI.md` が SSoT）。一方を更新したら必ず他方も更新すること。

---

## 最終更新日（Last Updated）の記載ルール

更新を行った際は、ドキュメントに最終更新日を明記または更新し、いつ時点の仕様であるかを誰でも判断できるようにします。

| ドキュメント | 最終更新日の記載方法 | 記載・更新場所 |
|---|---|---|
| `GEMINI.md` / `CLAUDE.md` | `Updated YYYY-MM-DD`（またはそれに類する表記） | ファイル冒頭付近 |
| `PROGRESS.md` | 最新 HEAD のコミットハッシュとメッセージで実質管理 | `## 現在地` セクション |

---

## 対象仕様書・進捗ドキュメントと更新トリガー

| ファイル | 役割 | 更新が必要な変更 |
|---|---|---|
| `GEMINI.md` | エージェント向け仕様（開発の絶対ルール、構成、注意事項）。SSoT | 設計原則の変更、ルール追加、コマンドの変更、スキル追加 |
| `CLAUDE.md` | `GEMINI.md` と同内容を維持（Claude 向け） | `GEMINI.md` を更新したら同期 |
| `PROGRESS.md` | Markdown→HTML 移行進捗のスナップショット | 新規 HTML ページ完了時、HEAD ハッシュ更新時 |

---

## 監査・確認プロセス

仕様書の整合性を確認する際、またはタスク完了時には、以下の手順を実行し、すべての不整合を解消してください。

### 1. 監査チェックリスト

- [ ] **`GEMINI.md` / `CLAUDE.md` 監査**
  - [ ] 記載されているコマンドが `scripts/` 配下の実際のスクリプトと一致しているか
  - [ ] `## 利用可能なスキル` テーブルが `.claude/skills/` の実ファイルと一致しているか
  - [ ] `## HTML デザインシステム` が現在の `Migraine.html` 実装と乖離していないか
- [ ] **`PROGRESS.md` 監査**
  - [ ] `## 移行ステータス` テーブルが `Types-of-headache/html-files/` の実際の HTML ファイルと一致しているか
  - [ ] `## 現在地` の `最新 HEAD` が最新のコミットハッシュと一致しているか

---

## 修正とコミット規約

監査の結果、乖離が検出された場合は直ちに修正し、適切なコミットメッセージでコミットしてください。

### コミットメッセージの例

```bash
git add GEMINI.md CLAUDE.md
git commit -m "chore(docs): sync GEMINI.md and CLAUDE.md with recent changes"

git add PROGRESS.md
git commit -m "chore(docs): update PROGRESS.md — sync migration status"
```
