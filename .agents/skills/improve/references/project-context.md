# Project context — Medical_Studies（リポジトリ固有・ローカル追加）

> このファイルは**本リポジトリ専用の追加リファレンス**であり、上流（shadcn / MIT）の
> `improve` スキルには含まれない。SKILL.md 本体は上流のまま維持し、リポジトリ固有の事実は
> ここに集約する（上流更新時のコンフリクトを避けるため）。
>
> Phase 1（Recon）で本ファイルを読み、記載済みの事実は再導出しないこと。
> 記載と実態が食い違う場合は**実装が正**。差分を発見したら finding として報告する。

## 成果物パイプライン（2 系統）

| 系統 | パス | 性質 |
| --- | --- | --- |
| レガシー HTML | `Types-of-headache/md-files/**`, `Types-of-headache/html-files/**` | 素の HTML + CDN Mermaid（SRI 付き）。ビルド工程なし |
| web-next | `web-next/**` | Next.js App Router + Vitest。レガシー HTML の移行先 |
| PROM SPA（移行元） | `prom-checker/index.html` | 単一 HTML アプリ。`web-next/app/prom-checker/` へ移行済み |
| 解析スクリプト | ワークスペース親（`Medical/`）の `mri_analysis.py` 等 | 本リポジトリ外。監査対象に含めない |

移行状況の正は `PROGRESS.md`。移行手順の正は `.claude/skills/nextjs-page-migration/SKILL.md`。

## 検証コマンド（全プランの verification gate に使う）

```bash
# web-next（パッケージマネージャは bun 固定。npm/yarn/pnpm を使わせない）
cd web-next
bun run typecheck   # tsc --noEmit（strict + noUnusedLocals + noUnusedParameters）
bun run test        # vitest run（jsdom）
bun run lint        # biome check
bun run build       # next build（NEXT_PUBLIC_SITE_URL 必須／後述）

# レガシー Markdown / HTML
npx markdownlint-cli -c .markdownlint.json <ファイルパス>
python3 -m pytest .claude/skills/fix-mermaid/scripts/test_fix_mermaid.py
```

- CI で通る状態が基準。**部分実行での合格を done criteria にしない**。
- `bun run lint:fix`（引数なし）はリポジトリ全体を整形するため**禁止**。パス明示で
  `bunx biome format --write <files>` を使う。

## 決定済みトレードオフ（finding として報告しないこと）

以下はいずれも**意図的な設計判断**であり、監査で「脆弱性」「未実装」として上げると誤検知になる。
根拠ドキュメントを併記する。判断の前提が変わったと考える場合のみ、根拠を示して提起する。

| 事象 | 由来・根拠 |
| --- | --- |
| CSP が `'unsafe-inline'` を script に許容（nonce / `strict-dynamic` を採らない） | 全ページ静的プリレンダのため per-request nonce を焼けない。サーバ・秘密なし、script 文脈への sink 無し。`web-next/next.config.ts` の冒頭コメントと `docs/publishing/04-security-policy.md` |
| HIT-6 / MSQ の設問文が空・プレースホルダ | 著作権保護尺度の redaction。実文言は gitignore 対象の local-only overlay からのみ読む。`docs/publishing/01-urgent-exposure.md`、`web-next/README.md` |
| `NEXT_PUBLIC_SITE_URL` に既定値がなくビルドが落ちる | fail-closed。既定値を置くと誤オリジンの sitemap を配信し続けるため。`web-next/app/sitemap.ts` |
| レガシー HTML が Mermaid を CDN + SRI で読む | ビルド工程を持たない静的 HTML のため。web-next 側は npm 依存でバンドル |
| ページ専用 CSS が Biome の整形対象外（`web-next/biome.json` の `includes` で除外） | 完結した CSS デザインシステムを保全するため |
| ページごとに巨大な `page.tsx`（数千行）が存在する | 移行元 HTML の**忠実転記**が要件。分割による意味変化・契約テスト破壊を避ける方針 |
| Tailwind v4 が依存にあるのに `@import "tailwindcss"` していない | preflight が独自デザインシステムを破壊するため意図的に不使用 |
| サイドバーが各ページ個別コンポーネント（`XxxSidebar.tsx` が多数） | 元 HTML ごとに目次構造・配色が異なるため。共通化は要検討事項であり既知 |

## アーキテクチャ上の不変条件（壊すプランを書かない）

- **`web-next/lib/content/registry.ts`（`CONTENT_REGISTRY`）がサイト横断の単一データ源。**
  相互リンク（`web-next/components/content/RelatedLinks.tsx`）・サイトマップ（`web-next/app/sitemap.ts`）・
  横断検索（`web-next/lib/content/search.ts`）・鮮度棚卸しが全てここを参照する。
  `web-next/lib/content/registry.test.ts` が `app/**/page.tsx` を実走査して登録漏れ・dangling 参照・
  不正日付を機械検知する。**ページ追加時はレジストリ登録が必須**。
- **コアとシェルの分離**（PROM）: `web-next/lib/prom/**` は DOM / Storage / 時刻に触れない純粋層。
  永続化は `StorageAdapter` interface 経由（依存性逆転）。副作用をコアへ持ち込むプランは不可。
- **Server Component 既定**。`"use client"` は状態・DOM API が要る chrome（サイドバー等）のみ。
- **用語ツールチップ**は `web-next/components/glossary/AutoGlossary.tsx` が本文ツリーを走査し初出のみラップする。
  `textContent` を変えない実装であることが契約テスト非破壊の根拠。

## コーディング規約（プランの「repo conventions」欄に必ず反映）

- `any` 禁止 → `unknown` + 型ガード。`==` 禁止、`var` 禁止、空 catch 禁止。
- エラーを握りつぶさない。失敗は `Result` 型または理由付き `Error` で表現する。
- コメント・ドキュメントは**日本語**。既存ファイルのコメント密度と用語に合わせる。
- コミット規約: `<type>(<scope>): <subject>`（type = feat / fix / docs / refactor / test / chore）。
- **TDD 必須**: `.claude/rules/tdd-mandatory-cycle.md`。Red（失敗テスト）→ Green → Refactor を
  別コミットに分ける。テスト・実装・ドキュメントを 1 コミットにまとめない。
  プランの steps もこの粒度で書く。
- **絶対パス / ユーザー名をコミット対象に含めない**: `.claude/rules/no-absolute-paths.md`。
  プラン本文・コード例も相対パスで書く。

## 既知の誤検知（監査ノイズ）

- **cSpell**: 医療略語（ICHD, CTTH, NSAIDs, Cochrane, CGRP 等）が `Unknown word` になる。対応不要。
- **SonarQube css:S7924**: CSS カスタムプロパティ（`var(--xxx)`）を解決できずコントラスト不足と
  誤判定する。実色で確認すること。

## プラン出力先

リポジトリルートに `plans/` が既に存在する（既存の設計プラン用）。**上流 SKILL.md の規定どおり、
用途が異なる場合は `advisor-plans/` を使う**。既存 `plans/` の連番・命名を確認してから決めること。
