# Plan 014: 最小 CI パイプライン（.github/workflows/ci.yml）を新設する

> **Executor instructions**: 本プランは CI 定義ファイルの新規作成である。YAML 骨子は本プランに
> 全文を収載している。各ステップの検証コマンドを実行し、期待結果を確認してから次へ進むこと。
> 「STOP conditions」該当時は停止して報告する。完了時に `plans/README.md` の Status を更新する。
>
> **Drift check (run first)**:
> `git diff --stat 6614b7c..HEAD -- web-next/package.json THIRD_PARTY_NOTICES.md`
> `.github/` が既に存在する場合は STOP（本プランは新設を前提とする）。
> `web-next/package.json` の scripts が「Current state」と異なる場合はコマンド名を実態に合わせる。

## Status

- **Priority**: P2（監査所見 F6 — CI／デプロイ／インフラ文書なし）
- **Effort**: M
- **Risk**: LOW（CI 追加はアプリ動作に影響しない。誤設定の影響は「CI が落ちる」に閉じる）
- **Depends on**: `plans/009-dependency-license-inventory.md`（ライセンスゲートのツール・
  `--failOn` リストを 009 の結果に合わせる。009 未実施でも本プランは実行可 — その場合
  009 と同じ既定リストを使う）
- **Category**: dx / security
- **Planned at**: commit `6614b7c`, 2026-07-09

## Why this matters

公開リポジトリでありながら CI が存在せず、型エラー・テスト失敗・ビルド破壊・ライセンス違反依存・
PII（絶対パス）混入のいずれも、マージ前に機械検知される仕組みがない。品質ゲートが
「各開発者がローカルで実行したかどうか」に依存している。`docs/publishing/06-infrastructure-and-deployment.md` §3 の
8 項目（install → typecheck → lint → test → build → 依存監査 → ライセンス → PII 検査）を
GitHub Actions として実装する。

## Current state

- `.github/` ディレクトリは存在しない（workflows なし）。
- 検証コマンド（`web-next/package.json` scripts — 実測値）:
  - `bun run typecheck`（`tsc --noEmit`）/ `bun run lint`（`biome check .`）/
    `bun run test`（`vitest run`）/ `bun run build`（`next build`）
  - パッケージマネージャ: `"packageManager": "bun@1.3.12"`、lock は `web-next/bun.lock`
- Markdown lint: リポジトリルートの `.markdownlint.json` を使い
  `npx markdownlint-cli -c .markdownlint.json <paths>` で実行する運用（`CLAUDE.md` 記載）。
- PII / 絶対パス検査規約: `.claude/rules/no-absolute-paths.md` — コミット差分に
  `/Users/` `/home/` `C:\Users\` を含めない（プレースホルダー `johndoe` は除外）。
- Mermaid 修正スクリプトのテスト: `python3 -m pytest .claude/skills/fix-mermaid/scripts/test_fix_mermaid.py`
  （`CLAUDE.md` 記載のコマンド）。
- ローカル資産生成（`web-next/scripts/build-anatomy-glb.mjs`・`web-next/scripts/curate-mri.mjs`）は
  CI で実行しない（成果物はコミット済み — `docs/publishing/06` §3 NOTE）。
- ビルドに必須の秘密情報はない。`NEXT_PUBLIC_GOOGLE_CLIENT_ID` は公開値で、未設定でも
  ビルドは通る（`DataManager.tsx:27` が `?? ""` でフォールバック）。

## Commands you will need

| Purpose | Command | Expected on success |
|---|---|---|
| YAML 構文検証（ローカル） | `bunx yaml-lint .github/workflows/ci.yml`（または `python3 -c "import yaml,sys;yaml.safe_load(open('.github/workflows/ci.yml'))"`） | exit 0 |
| web-next 全ゲート（ローカル再現） | `cd web-next && bun install --frozen-lockfile && bun run typecheck && bun run lint && bun run test && bun run build` | すべて exit 0 |
| Markdown lint（ローカル再現） | `npx markdownlint-cli -c .markdownlint.json "**/*.md" --ignore node_modules --ignore web-next/node_modules` | エラー 0（失敗したら STOP 条件参照） |

## Scope

**In scope**（変更してよいファイル）:

- `.github/workflows/ci.yml`（新規）
- `docs/publishing/06-infrastructure-and-deployment.md`（チェックリスト更新）

**Out of scope**（触らない）:

- デプロイ（CD）設定 — ホスティング先が未確定のため本プランは CI のみ。
- `web-next/package.json` の scripts 変更・依存追加。
- 既存の Markdown ファイルの lint エラー修正 — 発見したら STOP 条件に従う（黙って直さない）。
- ブランチ保護ルール（GitHub 設定）— リポジトリ管理者の操作が必要。Maintenance notes に記載。

## Git workflow

- ブランチ: `advisor/014-ci-pipeline`（`dev` から分岐）
- コミット形式: `chore(ci): <subject>`。push・PR はユーザー指示があるまで行わない
  （※ CI の最終検証には push が必要 — Done criteria 参照。push の実施はユーザーへ確認する）。

## Steps

### Step 1: ワークフローを作成する

`.github/workflows/ci.yml` を以下の内容で新規作成する:

```yaml
name: CI

on:
  push:
    branches: [main, dev]
  pull_request:
    branches: [main, dev]

jobs:
  web-next:
    name: web-next (typecheck / lint / test / build)
    runs-on: ubuntu-latest
    defaults:
      run:
        working-directory: web-next
    steps:
      - uses: actions/checkout@v4
      - uses: oven-sh/setup-bun@v2
        with:
          bun-version: 1.3.12
      - run: bun install --frozen-lockfile
      - run: bun run typecheck
      - run: bun run lint
      - run: bun run test
      - run: bun run build

  license-gate:
    name: dependency license gate
    runs-on: ubuntu-latest
    defaults:
      run:
        working-directory: web-next
    steps:
      - uses: actions/checkout@v4
      - uses: oven-sh/setup-bun@v2
        with:
          bun-version: 1.3.12
      - run: bun install --frozen-lockfile
      # 強コピーレフトの production 混入を拒否（plans/009 と同一ゲート）
      - run: bunx license-checker-rseidelsohn --production --failOn "GPL-2.0;GPL-3.0;AGPL-1.0;AGPL-3.0"

  markdown:
    name: markdown lint
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 22
      - run: npx markdownlint-cli -c .markdownlint.json "**/*.md" --ignore node_modules --ignore web-next/node_modules

  mermaid-script:
    name: fix-mermaid script tests
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-python@v5
        with:
          python-version: "3.12"
      - run: pip install pytest
      - run: python3 -m pytest .claude/skills/fix-mermaid/scripts/test_fix_mermaid.py

  pii-check:
    name: absolute-path / PII check
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      # 追跡対象の全ファイルに環境依存の絶対パスがないこと（.claude/rules/no-absolute-paths.md の CI 化）。
      # パターンは「/Users/<名前>/」「/home/<名前>/」のようにユーザー名セグメント＋後続スラッシュを
      # 必須にしている（素朴な '/home/' では Web URL（例: sagepub.com/home/cep）や
      # 検査ルール自身のパターン定義行に誤検知するため）。URL を含む行は除外する。
      - run: |
          hits=$(git grep -nI -E '(/Users/[A-Za-z0-9._-]+/|/home/[A-Za-z0-9._-]+/|C:\\Users\\)' -- ':!*.lock' | grep -vE 'johndoe|https?://' || true)
          if [ -n "$hits" ]; then
            echo "::error::環境依存の絶対パスが検出されました:"
            echo "$hits"
            exit 1
          fi
```

> [!NOTE]
> 依存脆弱性監査（`bun audit` 相当）は bun のバージョンにより挙動が異なるため本プランでは
> ジョブ化しない。代替として GitHub の **Dependabot alerts** をリポジトリ設定で有効化する
> （Maintenance notes 参照）。

**Verify**: `python3 -c "import yaml,sys;yaml.safe_load(open('.github/workflows/ci.yml'))"` → exit 0

### Step 2: 全ジョブをローカルで再現実行する

CI と同一のコマンド列をローカルで実行し、**現状のリポジトリで全ジョブが green になる**ことを
push 前に確かめる:

```bash
cd web-next && bun install --frozen-lockfile && bun run typecheck && bun run lint && bun run test && bun run build && cd ..
cd web-next && bunx license-checker-rseidelsohn --production --failOn "GPL-2.0;GPL-3.0;AGPL-1.0;AGPL-3.0" && cd ..
npx markdownlint-cli -c .markdownlint.json "**/*.md" --ignore node_modules --ignore web-next/node_modules
python3 -m pytest .claude/skills/fix-mermaid/scripts/test_fix_mermaid.py
git grep -nI -E '(/Users/[A-Za-z0-9._-]+/|/home/[A-Za-z0-9._-]+/|C:\\Users\\)' -- ':!*.lock' | grep -vE 'johndoe|https?://' || echo clean
```

**Verify**: すべて exit 0 / 最終行が `clean`。
**いずれかが既存コードの問題で失敗する場合は STOP**（CI 導入前に直すべき負債の発見 — 報告して
判断を仰ぐ。黙って修正やジョブの緩和をしない）。

### Step 3: 文書更新

`docs/publishing/06-infrastructure-and-deployment.md` §6 チェックリストの
「最小 CI パイプラインを `.github/workflows` として別プランで起票した」を `[x]` 化し、
「実装済み: `.github/workflows/ci.yml`（web-next / license-gate / markdown / mermaid-script /
pii-check の 5 ジョブ）」と付記する。「依存脆弱性監査・ライセンス棚卸しを CI に組み込む方針を
確定した」も更新する（ライセンス = CI ジョブ化済み、脆弱性 = Dependabot 方針）。

**Verify**: `npx markdownlint-cli -c .markdownlint.json docs/publishing/06-infrastructure-and-deployment.md` → エラー 0

## Test plan

- CI 定義自体のテストは Step 2 のローカル再現が担う（5 ジョブ相当すべて）。
- 最終確認は push 後の Actions 実行（下記 Done criteria）— push はユーザーの承認を得て行う。

## Done criteria

- [ ] `.github/workflows/ci.yml` が存在し、YAML として parse できる
- [ ] Step 2 のローカル再現がすべて成功する
- [ ] `docs/publishing/06-infrastructure-and-deployment.md` のチェックリストが更新されている
- [ ] In scope 外のファイルに変更がない（`git status`）
- [ ] （push 承認後）GitHub Actions で 5 ジョブすべて green
- [ ] `plans/README.md` の Status 更新

## STOP conditions

- Step 2 で既存コードに起因する失敗が出た場合（例: markdownlint が既存 `.md` でエラー、
  license-gate が検出、`bun run build` が落ちる）— 対象と内容を列挙して報告する。
  修正もジョブ削除もしない。
- `bunx license-checker-rseidelsohn` がローカル・CI とも実行不能な場合（`plans/009` の
  代替ツール選定に差し戻す）。
- `.claude/skills/fix-mermaid/scripts/test_fix_mermaid.py` が存在しない場合
  （mermaid-script ジョブの前提が崩れている — 該当ジョブを外すのではなく報告する）。

## Maintenance notes

- **リポジトリ管理者が別途行う設定**（CI ファイルでは実現できない）:
  - Dependabot alerts / security updates の有効化（Settings → Code security）
  - `main` / `dev` のブランチ保護（CI green を required checks に指定）
- `web-next/package.json` の scripts 名を変えたら本ワークフローも更新すること。
  bun のバージョン更新時は `setup-bun` の `bun-version` を `packageManager` フィールドと同期する。
- markdownlint の対象を `"**/*.md"` にしているため、新規ディレクトリの `.md` も自動的に対象になる。
  除外が必要な生成物ディレクトリが増えたら `--ignore` を追加する。
- デプロイ（CD）は本プランのスコープ外。ホスティング先（Vercel / Cloudflare Pages 等）確定後に
  `docs/publishing/06` §2 を前提に別プラン化する。CSP ヘッダ（`plans/011`）の付与層の決定と
  合わせて検討すること。
