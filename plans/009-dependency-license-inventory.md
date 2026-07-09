# Plan 009: web-next の npm 依存ライセンスを棚卸しし、THIRD_PARTY_NOTICES.md に検証済み台帳を作る

> **Executor instructions**: 本プランは read-only の調査＋ドキュメント更新である。
> **ソースコード・package.json・lock ファイルは変更しない**。各ステップの検証コマンドを実行し、
> 期待結果を確認してから次へ進むこと。「STOP conditions」該当時は停止して報告する。
> 完了時に `plans/README.md` の自分の行の Status を更新する。
>
> **Drift check (run first)**:
> `git diff --stat 6614b7c..HEAD -- web-next/package.json web-next/bun.lock THIRD_PARTY_NOTICES.md`
> `package.json` の依存が変わっている場合も本プランはそのまま実行できる（棚卸しは常に現状に対して行う）。
> `THIRD_PARTY_NOTICES.md` §4 が既に「検証済み」となっている場合のみ STOP（二重実施）。

## Status

- **Priority**: P0 派生（監査所見 F2 — ライセンス整合の残タスク）
- **Effort**: S
- **Risk**: LOW（成果物はドキュメントのみ）
- **Depends on**: なし（`plans/014-minimal-ci-pipeline.md` が本プランのツール選定を参照する）
- **Category**: legal-compliance / dx
- **Planned at**: commit `6614b7c`, 2026-07-09

## Why this matters

リポジトリはルート `LICENSE`（MIT・スコープ注記付き）で公開されているが、`web-next/` の npm 依存の
ライセンスは**未検証の代表例**しか記録されていない（`THIRD_PARTY_NOTICES.md` §4 に「要検証」注記付きの
4 行のみ）。GPL / AGPL 等の強コピーレフト依存が production ビルドに混入していた場合、MIT 宣言との矛盾や
ソース開示義務が生じうる。公開運用の前提として、全依存の機械的棚卸しと判断記録が必要である
（`docs/publishing/02-copyright-and-licensing.md` チェックリスト・`docs/publishing/06-infrastructure-and-deployment.md` §3-7 参照）。

## Current state

- `THIRD_PARTY_NOTICES.md` §4（52–64 行）— 代表 4 パッケージの表（`next`/`react`/`react-dom`=MIT、
  `mermaid`=MIT、`@google/model-viewer`=Apache-2.0、`@tabler/icons-react`=MIT）と
  「上表は代表例であり網羅ではない。公開・配布前に棚卸しを行うこと」という NOTE がある。
- `web-next/package.json` — dependencies 6 件（`@google/model-viewer`・`@tabler/icons-react`・
  `mermaid`・`next`・`react`・`react-dom`）、devDependencies 17 件。
  `"packageManager": "bun@1.3.12"`、lock は `web-next/bun.lock`。
- 配布形態: web-next は**ビルド成果物（フロントエンド）を配信**する。production dependencies は
  バンドルに含まれ再配布に当たる。devDependencies はビルド時のみ使用で再配布されない
  （＝義務の重さが異なる。判断表で区別する）。

## Commands you will need

| Purpose | Command（`web-next/` で実行） | Expected on success |
|---|---|---|
| Install | `bun install --frozen-lockfile` | exit 0（node_modules 生成） |
| 棚卸し（要約） | `bunx license-checker-rseidelsohn --production --summary` | ライセンス種別ごとの件数一覧 |
| 棚卸し（詳細） | `bunx license-checker-rseidelsohn --production --csv` | パッケージごとの license 列挙 |
| コピーレフト検出 | `bunx license-checker-rseidelsohn --production --failOn "GPL-2.0;GPL-3.0;AGPL-1.0;AGPL-3.0"` | exit 0（検出なし） |
| Lint（文書） | `npx markdownlint-cli -c .markdownlint.json THIRD_PARTY_NOTICES.md` | エラー 0 |

`license-checker-rseidelsohn` は `node_modules/` の package.json 群を走査する npm 互換ツールであり、
bun が生成する node_modules レイアウトでも動作する。

## Scope

**In scope**（変更してよいファイル）:

- `THIRD_PARTY_NOTICES.md`（§4 の表を検証結果で置き換え・棚卸しメタデータ追記）
- `docs/publishing/02-copyright-and-licensing.md`（チェックリスト「npm 依存ライセンスの棚卸しを実施した」の `[x]` 化のみ）

**Out of scope**（触らない）:

- `web-next/package.json`・`web-next/bun.lock` — 依存の追加・削除・更新は本プランの対象外。
  問題依存が見つかっても**置換はしない**（STOP して報告し、別プランで対応する）。
- `node_modules/` はコミットしない（生成物）。
- 生成した CSV / JSON はリポジトリにコミットしない（要約のみを Markdown 表へ転記する）。

## Git workflow

- ブランチ: `advisor/009-license-inventory`（`dev` から分岐）
- コミット形式: `docs(legal): <subject>`。push・PR はユーザー指示があるまで行わない。

## Steps

### Step 1: 依存をインストールし棚卸しを実行する

```bash
cd web-next
bun install --frozen-lockfile
bunx license-checker-rseidelsohn --production --summary
bunx license-checker-rseidelsohn --production --csv > /tmp/license-prod.csv
bunx license-checker-rseidelsohn --summary > /tmp/license-all-summary.txt
```

**Verify**: `--summary` の出力にライセンス種別と件数が表示される（例: `MIT: NN`）。
`bunx` がツールを解決できない場合は `npx license-checker-rseidelsohn` で代替し、それも失敗したら STOP。

### Step 2: コピーレフト検出ゲートを実行する

```bash
cd web-next
bunx license-checker-rseidelsohn --production --failOn "GPL-2.0;GPL-3.0;AGPL-1.0;AGPL-3.0"
```

**Verify**: exit 0（強コピーレフトなし）。**exit 非 0 の場合は STOP conditions に従う。**

LGPL / MPL-2.0 / CC-BY 系が `--summary` に現れた場合は STOP せず、Step 3 の判断表に従い記録する:

| 検出ライセンス | 扱い |
|---|---|
| MIT / ISC / BSD-2/3 / Apache-2.0 / 0BSD / Unlicense | 問題なし。件数のみ記録 |
| LGPL / MPL-2.0 / EPL | 動的リンク・ファイル単位コピーレフト。バンドル形態の確認が必要 — パッケージ名・用途を §4 に個別記録し、判断保留と明記 |
| GPL / AGPL（production） | **STOP**（下記） |
| GPL / AGPL（devDependencies のみ） | 再配布されないため通常は許容。パッケージ名と「ビルド時のみ使用」を §4 に記録 |
| UNKNOWN / カスタム | パッケージ名を記録し、当該 repo の LICENSE ファイルを手動確認して結果を記録 |

### Step 3: THIRD_PARTY_NOTICES.md §4 を検証済み台帳へ更新する

§4 の既存表を以下の構成で置き換える（既存の見出し・前文は温存）:

1. **棚卸しメタデータ**（実施日・ツール名とバージョン・対象 = production / 全依存の別・依存総数）
2. **直接依存（dependencies 6 件）の表** — パッケージ / バージョン / ライセンス（検証済み）/ 用途
3. **推移的依存の要約** — `--summary` の種別別件数を転記
4. **要注意判定の記録** — Step 2 の判断表で「個別記録」となったものを列挙（なければ「該当なし」と明記）
5. 既存 NOTE（「網羅ではない」）を「本表は YYYY-MM-DD 時点の機械的棚卸しに基づく。依存を追加・更新した際は再実行すること（`plans/014-minimal-ci-pipeline.md` で CI 化）」へ差し替え

**Verify**: `npx markdownlint-cli -c .markdownlint.json THIRD_PARTY_NOTICES.md` → エラー 0

### Step 4: 公開準備チェックリストへ反映する

`docs/publishing/02-copyright-and-licensing.md` §5 チェックリストの
「npm 依存ライセンスの棚卸しを実施した（`06` 参照）」を `[x]` 化し、実施日を括弧書きで追記する。

**Verify**: `npx markdownlint-cli -c .markdownlint.json docs/publishing/02-copyright-and-licensing.md` → エラー 0

## Test plan

コード変更がないため自動テストの追加はない。検証はコマンド出力の記録で代替する:

- Step 2 の `--failOn` コマンドと exit code を `THIRD_PARTY_NOTICES.md` §4 の棚卸しメタデータに記載する
  （再現手順の記録）。
- 念のため `bun run test`（`web-next/`）を実行し、install によって既存テストが壊れていないことを確認 → 全 pass。

## Done criteria

- [ ] `THIRD_PARTY_NOTICES.md` §4 に棚卸し実施日・ツール・direct 依存 6 件の検証済みライセンス・
      推移的依存の種別別件数・要注意判定（または「該当なし」）が記録されている
- [ ] `bunx license-checker-rseidelsohn --production --failOn "GPL-2.0;GPL-3.0;AGPL-1.0;AGPL-3.0"` が exit 0
- [ ] `docs/publishing/02-copyright-and-licensing.md` のチェックリストが更新されている
- [ ] `git status` の変更が In scope の 2 ファイルのみ（`web-next/` 配下に変更なし）
- [ ] `plans/README.md` の Status 更新

## STOP conditions

- production 依存に GPL / AGPL が検出された場合 — 依存の置換・削除は本プランで行わず、
  検出内容（パッケージ名・バージョン・依存経路 `bunx license-checker-rseidelsohn --production --csv` で特定）を
  報告して停止する。
- `bunx` / `npx` の双方でツールが実行できない場合（ネットワーク遮断等）。
- `bun install --frozen-lockfile` が失敗する場合（lock 不整合 — 依存を修復しようとしないこと）。

## Maintenance notes

- 依存を追加・更新する PR では §4 の再棚卸しが必要。`plans/014-minimal-ci-pipeline.md` が本プランと
  同じ `--failOn` ゲートを CI に組み込み、再実行漏れを機械検知する予定。
- `@google/model-viewer`（Apache-2.0）は NOTICE 条項があるため、将来バンドル形態を変える場合は
  帰属表示の同梱要否を再確認すること。
- 本棚卸しは npm 依存のみを対象とする。3D モデル（CC-BY-SA 2.1 JP）・PROM 尺度・MRI 画像の
  権利は §1〜§3 および `plans/008`・`plans/010` で別管理。
