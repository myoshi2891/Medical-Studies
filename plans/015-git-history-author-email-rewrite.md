# Plan 015: git 履歴の author 個人メールアドレスを noreply へ書き換える（破壊的・要ユーザー判断）

> **Executor instructions**: 本プランは**全コミット SHA が変わる破壊的操作**の手順書である。
> 「決定ゲート」の成立なしに 1 コマンドも実行してはならない。実行時も Step 順を厳守し、
> 各 Verify を確認してから次へ進む。「STOP conditions」該当時は即停止して報告する。
> 完了時に `plans/README.md` の Status を更新する。
>
> **Drift check (run first)**: 本プランはコードではなく git 履歴を対象とするため、
> ファイル差分の drift check は不要。代わりに Step 1 の現状調査を必ず再実行する
> （履歴の状態はプラン執筆時から変わっている可能性がある）。

## Status

- **Priority**: P2（監査所見 F7 — git 履歴に実メールアドレス残存）
- **Effort**: M（手順自体は短いが、調整・検証・後処理が重い）
- **Risk**: **HIGH**（全 SHA 変更・force-push・フォーク/クローン/PR との整合破壊）
- **Depends on**: **他の全プラン（008〜014）の実行完了後に行うこと**（理由は下記）
- **Category**: privacy
- **Planned at**: commit `6614b7c`, 2026-07-09

## Why this matters

公開リポジトリの git 履歴の author に**個人メールアドレスが 1 種類残存**しており、
`git log` で誰でも閲覧できる（種類: 個人メールアドレス。**値は本プランに記載しない** —
Step 1 のコマンドで特定する）。スパム・スクレイピング・なりすましの素材になりうる。
一方、是正手段の履歴書き換えは全コミット SHA を変える破壊的操作であり、「許容する」も
合理的な選択肢である（`docs/publishing/06-infrastructure-and-deployment.md` §5）。

## 決定ゲート（実行条件 — いずれも必須）

1. リポジトリ管理者（ユーザー）が「許容」ではなく「書き換え」を明示的に選択した。
2. オープン中の Pull Request が 0 件である（`gh pr list` で確認）。
3. 共同作業者・フォークへの周知（force-push 後は全員再クローンが必要）が済んでいる。
   個人プロジェクトで共同作業者がいない場合はこの項は自動的に満たされる。

**なぜ最後に実行するか**: `plans/008` 〜 `014` および `docs/publishing/*` は
コミット SHA（`6614b7c`・`a9e470c`・`0fced4f` 等）を drift check の基準として参照している。
履歴書き換えはこれらの SHA をすべて無効化するため、他プランの実行後に行い、
Step 7 で参照 SHA を新 SHA へ更新する。

## Current state（プラン執筆時の調査結果）

- author メールは 3 種類: GitHub noreply 形式 1 件・bot（coderabbitai）1 件・**個人メール 1 件**。
  個人メールのコミットが履歴の大半を占める。
- ローカルブランチ: `dev`・`main` に加え、bot が作成した `coderabbitai/docstrings/*` が 4 本
  （**ローカルのみ**。remote は `origin/dev`・`origin/main` の 2 本）。
- remote: `origin = git@github.com:myoshi2891/Medical-Studies.git`（PUBLIC）。
- `git filter-repo` はインストール済み（`command -v git-filter-repo` で確認できる）。
- **過去の教訓**（本リポジトリで実際に発生）: 機密除去の履歴書き換えを**片方のブランチだけ**に
  適用すると、dev / main の共通祖先が分岐して疑似コンフリクトが発生する。
  **全ブランチを同一の書き換えで一括処理**しなければならない。
  `git filter-repo` は既定で**全 refs** を処理するため、この要件を満たす。

## Commands you will need

| Purpose | Command | Expected on success |
|---|---|---|
| 個人メールの特定 | `git log --all --format='%an <%ae>%n%cn <%ce>' \| sort -u` | 3 種類の author が見える |
| PR 確認 | `gh pr list --state open` | 0 件 |
| filter-repo 確認 | `git filter-repo --version` | バージョン表示 |
| 書き換え後検証 | `git log --all --format='%ae%n%ce' \| sort -u` | 個人メールが含まれない |

## Scope

**In scope**:

- git 履歴（全 refs）の author / committer メールアドレスの置換
- 書き換え後の SHA 参照更新: `plans/*.md`・`docs/publishing/*.md` 内の旧 SHA（`6614b7c`・
  `a9e470c`・`0fced4f` ほか Step 7 で洗い出す）
- 再発防止のローカル / GitHub 設定（Step 8）

**Out of scope**（この手順でやらないこと）:

- ファイル内容の書き換え（機密ファイルの除去等）— 本プランはメールアドレスのみ。
- フォーク・ミラー・アーカイブ上の旧履歴の消去 — 技術的に不可能。GitHub 上のキャッシュ済み
  ビューの掃除は GitHub Support への依頼事項（Maintenance notes）。
- `coderabbitai/docstrings/*` ローカルブランチの救済 — Step 2 で扱いを確定する。

## Git workflow

本プランは通常のブランチ運用に**従わない**（履歴そのものが対象）。作業はリポジトリ外の
一時ディレクトリで行い、既存の作業コピーは Step 6 まで変更しない。

## Steps

### Step 1: 現状調査と対象の確定（read-only）

```bash
git log --all --format='%an <%ae>' | sort | uniq -c | sort -rn
git log --all --format='%cn <%ce>' | sort -u
gh pr list --state open
git branch -a
```

- 個人メール（noreply でも bot でもないもの）を特定し、**書き換え先**となる GitHub noreply
  アドレス（`<ID>+<username>@users.noreply.github.com` 形式 — 履歴中に既に存在する）を控える。
- committer 側にも個人メールが含まれるかを確認する（含まれる場合も mailmap で同時に置換される）。

**Verify**: 個人メールが author に存在すること・オープン PR が 0 件であることを確認した。

### Step 2: ローカル専用ブランチの扱いを確定する

`coderabbitai/docstrings/*`（4 本・ローカルのみ）は書き換えの起点となる origin に存在しないため、
**再クローン後は消失する**。実行前にユーザーへ以下を確認する:

- 不要（bot の提案が取り込み済み／破棄済み）→ そのまま進む（推奨）。
- 必要 → 該当ブランチを先に origin へ push するか、パッチ（`git format-patch`）で退避する。

**Verify**: ユーザーの回答を記録した。

### Step 3: バックアップ（ミラークローン）を取る

リポジトリの**外**の一時ディレクトリで:

```bash
git clone --mirror git@github.com:myoshi2891/Medical-Studies.git medical-studies-backup.git
```

ローカル作業コピー（未 push の変更・stash・ローカルブランチ含む）も別途無事であることを
`git status` / `git stash list` で確認する。

**Verify**: `medical-studies-backup.git` が存在し、`git -C medical-studies-backup.git log --oneline -1` が
最新コミットを表示する。

### Step 4: mailmap を作成する（リポジトリ外・コミットしない）

一時ディレクトリに `mailmap.txt` を作成する（**このファイルをリポジトリ内に置かない・
コミットしない** — 個人メールの値を含むため）:

```text
表示名 <ID+username@users.noreply.github.com> <個人メールアドレス>
```

（`表示名` と各アドレスは Step 1 で確認した実値。committer にも個人メールがあった場合、
mailmap は author / committer の両方に適用される。）

**Verify**: `cat mailmap.txt` の書式が `新 <新メール> <旧メール>` の 1 行であること。

### Step 5: フレッシュクローンで書き換えを実行する

`git filter-repo` は安全のため**フレッシュクローンでの実行**を要求する。既存の作業コピーでは実行しない:

```bash
git clone git@github.com:myoshi2891/Medical-Studies.git medical-studies-rewrite
cd medical-studies-rewrite
git filter-repo --mailmap ../mailmap.txt
```

`filter-repo` は全 refs（origin にある dev / main）を一括処理する — **片ブランチのみの
書き換えは過去の教訓により厳禁**（このコマンド構成なら発生しない）。

**Verify**:

```bash
git log --all --format='%ae%n%ce' | sort -u
```

→ 出力に個人メールが**含まれない**（noreply と bot のみ）。含まれていたら STOP。
また `wc -l .git/filter-repo/commit-map` で旧→新 SHA の対応表が生成されていることを確認する
（Step 7 で使用。この対応表もコミットしない）。

### Step 6: force-push と作業環境の切り替え

```bash
cd medical-studies-rewrite
git remote add origin git@github.com:myoshi2891/Medical-Studies.git  # filter-repo は origin を除去する
git push --force origin 'refs/heads/*:refs/heads/*'
git push --force origin --tags
```

その後、**旧作業コピーを使い続けない**こと（旧 SHA 基準の push が汚染を戻す）。
旧作業コピーの未コミット変更を退避したうえで、新しくクローンし直して作業を再開する。

**Verify**: GitHub 上（`gh api repos/myoshi2891/Medical-Studies/commits?per_page=1`）の最新コミット
author が noreply になっている。

### Step 7: ドキュメント内の SHA 参照を更新する

新しいクローンで、旧 SHA を参照している文書を洗い出して更新する:

```bash
grep -rn "6614b7c\|a9e470c\|0fced4f" plans/ docs/
```

`.git/filter-repo/commit-map`（Step 5 のクローン内）で旧 SHA → 新 SHA を引き、該当箇所を
置換して通常のコミット（`docs(plans): update planned-at SHAs after history rewrite`）を行う。
コミット前に markdownlint と PII 検査（`.claude/rules/no-absolute-paths.md`）を実施する。

**Verify**: 上記 grep → 0 件（すべて新 SHA へ更新済み）。

### Step 8: 再発防止設定

1. このリポジトリのローカル設定: `git config user.email` を noreply アドレスへ変更する。
2. GitHub アカウント設定（ユーザーの操作）: Settings → Emails →
   「Keep my email addresses private」と「Block command line pushes that expose my email」を有効化。
3. バックアップ（Step 3）と `mailmap.txt`・`commit-map` は、安定運用を確認した後
   （目安 2 週間）にユーザー判断で破棄する。

**Verify**: `git config user.email` が noreply を返す。

## Test plan

コード変更がないため自動テストはない。検証は以下の 3 点で代替する:

- Step 5 の全 refs メール検証（個人メール 0 件）
- Step 6 の GitHub 上の author 確認
- 書き換え後クローンで `cd web-next && bun install --frozen-lockfile && bun run test` → 全 pass
  （履歴書き換えがファイル内容に影響していないことの念押し確認）

## Done criteria

- [ ] `git log --all --format='%ae%n%ce' | sort -u`（新クローン）に個人メールが含まれない
- [ ] origin の dev / main が新履歴を指している（force-push 完了）
- [ ] `plans/`・`docs/` 内の旧 SHA 参照が 0 件（Step 7 の grep）
- [ ] バックアップ（ミラー）が保全されている
- [ ] `git config user.email` が noreply（再発防止）
- [ ] `plans/README.md` の Status 更新

## STOP conditions

- 決定ゲート 3 条件のいずれかが未成立（**最重要** — 破壊的操作の無断実行は禁止）。
- Step 5 の検証で個人メールが残存した場合（mailmap の書式ミスの可能性 — force-push 前に停止）。
- `git filter-repo` がフレッシュクローン以外での実行を警告した場合（`--force` で握りつぶさない）。
- force-push が保護ルールで拒否された場合（ブランチ保護の一時解除はユーザーの操作 — 依頼して待つ）。
- 未 push のローカル変更・stash が旧作業コピーに残っていることが Step 3 で判明し、
  退避方法が自明でない場合。

## Maintenance notes

- **旧履歴は完全には消えない**: フォーク・既存クローン・GitHub のキャッシュ済みビュー
  （旧 SHA 直リンク）には旧メールが残りうる。GitHub 上のキャッシュ掃除は GitHub Support への
  依頼で対応可能な場合がある。この限界は「許容 or 書き換え」判断の材料として
  ユーザーへ事前に伝えること。
- 書き換え後、`plans/008` の Maintenance notes にある「PROM 質問文の履歴残存」を履歴から
  消す判断をする場合は、同じ手順（filter-repo・全 refs・バックアップ）に `--invert-paths` 等の
  パス除去を加えた別プランとして起票する。
- 以後のコミットが noreply で行われているかは、`plans/014` の CI に author チェックを足すことで
  機械監視できる（必要になったら追加）。
