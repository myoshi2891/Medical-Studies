# 06. インフラ・デプロイ・CI（P2）

> [!NOTE]
> 本文書は設計案である。CI・デプロイの実装（`.github/workflows` 等の追加）は本計画のスコープ外で、方針提示に留める。

- **対象監査所見**: F6（CI／デプロイ／インフラ文書なし）、F7（git 履歴に実メールアドレス）
- **成果物**: 本文書。
- **記載時点コミット**: `0fced4f`

---

## 1. 現状

- `.github/workflows` なし、`vercel.json` / `Dockerfile` なし。公開運用のビルド・秘密情報・可用性方針が未定義。
- アプリ基盤: `web-next/` は Next.js。パッケージマネージャは **bun**（`web-next/bun.lock`）。
- 検証コマンド（`web-next/package.json`）:
  - ビルド: `bun run build`（`next build`）
  - テスト: `bun run test`（`vitest run`）
  - 型検査: `bun run typecheck`（`tsc --noEmit`）
  - Lint: `bun run lint`（`biome check .`）

## 2. 想定デプロイ構成

- **完全クライアント型**（`app/api/` なし・サーバ秘密情報なし）ゆえ、静的/SSR フロントエンドのホスティングで足りる。
- **ホスティング候補**: Vercel（Next.js ネイティブ）、Cloudflare Pages、静的エクスポート可能なら任意の静的ホスト。
- **公開環境変数**: `NEXT_PUBLIC_GOOGLE_CLIENT_ID`（OAuth クライアント ID・設計上公開値）。ビルド時に注入する。**秘密情報は存在しない**ため、シークレットストアの運用負荷は最小。
- **セキュリティヘッダ**: `04` の CSP/HSTS 等をホスティング層またはミドルウェアで付与する（実装は別プラン）。

## 3. CI 設計案（実装は別プラン）

公開運用に向けた最小 CI パイプライン（`web-next/` を対象）:

1. **依存インストール**: `bun install --frozen-lockfile`
2. **型検査**: `bun run typecheck`
3. **Lint**: `bun run lint`
4. **テスト**: `bun run test`
5. **ビルド**: `bun run build`
6. **依存脆弱性監査**: `bun audit`（または相当ツール）を定期・PR 時に実行（`04` の F4 チェックリストと連携）
7. **ライセンス棚卸し**: 依存ライセンスの自動チェック（コピーレフト混入検出。`02` / `THIRD_PARTY_NOTICES.md` と連携）
8. **PII/絶対パス検査**: コミット差分に環境依存の絶対パス（`/Users/` 等）が混入しないか機械チェック（`.claude/rules/no-absolute-paths.md` の検証手順を CI 化）

> [!NOTE]
> 3D モデル生成（`web-next/scripts/build-anatomy-glb.mjs`）や MRI キュレーション（`scripts/curate-mri.mjs`）はローカル資産生成であり、CI で毎回走らせる必要はない。成果物 `.glb` / `.png` はリポジトリにコミット済み。

## 4. 可用性・バックアップ

- **ユーザーデータは端末 `localStorage` のみ**＝運営側にデータ資産が存在しない。したがってサーバ側バックアップ・DR の対象データは無い。
- 可用性の焦点は静的アセット配信（CDN）に限られる。データ喪失リスクはユーザー端末側（`04`/`05` の localStorage 注意喚起で対応）。

## 5. git 履歴の個人情報（F7）

- **現状**: git 履歴の author に実メールアドレスが 1 件残存している（種類: 個人メールアドレス。値は本文書に記載しない — PII 保護のため `git log` で確認すること）。公開リポジトリの履歴に含まれる。
- **対応オプション（ユーザー判断）**:
  1. **許容する** — GitHub の noreply メール併用など、露出を実害と見なさない判断。最も低コスト。
  2. **履歴書き換え** — `git filter-repo` で author メールを noreply 等へ置換する。ただし全 commit の SHA が変わり、フォーク・PR・クローンとの整合が崩れる破壊的操作。

> [!IMPORTANT]
> 履歴書き換えを行う場合は**全ブランチを一括処理**すること。片方のブランチだけ書き換えると共通祖先が壊れ、疑似コンフリクトが発生する（過去の教訓）。実行前にバックアップ（ミラークローン）を取り、force-push の影響（協働者の再クローン要否）を周知する。実装は別プラン。

## 6. チェックリスト

- [x] 検証コマンド（build/test/typecheck/lint）を記録した
- [x] 想定デプロイ構成・公開環境変数の方針を整理した
- [x] 最小 CI パイプラインを `.github/workflows` として別プランで起票した →
  [`plans/014-minimal-ci-pipeline.md`](../../plans/014-minimal-ci-pipeline.md)（5 ジョブ構成の YAML 骨子付き）
- [ ] 依存脆弱性監査・ライセンス棚卸しを CI に組み込む方針を確定した（ライセンスゲートは
  `plans/014` でジョブ化、脆弱性監査は Dependabot 有効化方針 — 同プラン参照）
- [ ] git 履歴の author メール（F7）の対応（許容 or 書き換え）をユーザーが判断した
  （書き換えを選ぶ場合の手順書:
  [`plans/015-git-history-author-email-rewrite.md`](../../plans/015-git-history-author-email-rewrite.md)。
  全ブランチ一括・バックアップ・決定ゲート付き）

## 関連文書

- セキュリティヘッダ・依存監査: [`04-security-policy.md`](04-security-policy.md)
- 依存ライセンス棚卸し: [`02-copyright-and-licensing.md`](02-copyright-and-licensing.md) / [`../../THIRD_PARTY_NOTICES.md`](../../THIRD_PARTY_NOTICES.md)
