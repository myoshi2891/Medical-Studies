# AGENTS.md

任意の AI エージェント（Antigravity / Gemini CLI / Codex / Cursor / Claude Code 等）向けの
**共通エントリポイント**。ツール非依存の最小限だけをここに置き、詳細は各文書へ委譲する。

> **SSoT**: 詳細仕様は `GEMINI.md`（＝`CLAUDE.md` と同一内容）が正。
> 本ファイルは重複させず、**参照先と絶対に守る規約だけ**を記載する。
> 3 文書が食い違った場合は `GEMINI.md` を正とし、`spec-sync` スキルで同期する。

## このリポジトリは何か

頭痛疾患の医療教育コンテンツを執筆し、Web アプリとして公開するスタディリポジトリ。
**成果物パイプラインが 2 系統**あり、混同しないこと。

| 系統 | パス | 性質 |
| --- | --- | --- |
| レガシー HTML | `Types-of-headache/{md-files,html-files}/**` | 素の HTML + CDN Mermaid（SRI）。ビルド工程なし |
| **web-next** | `web-next/**` | Next.js App Router + Vitest。レガシー HTML の移行先。**現在の主戦場** |

## 最初に読むファイル（タスク別）

| やること | 読む順 |
| --- | --- |
| **HTML → Next.js 移行** | `.claude/skills/nextjs-page-migration/SKILL.md` → `.claude/rules/tdd-mandatory-cycle.md` → `web-next/package.json` → 参照実装 `web-next/app/anatomy/bone-related-headache/{page.tsx,page.test.tsx}` |
| Mermaid の不具合修正 | `.claude/skills/fix-mermaid/SKILL.md` |
| Markdown 執筆・整形 | `.claude/skills/markdown-formatter/SKILL.md` |
| MD → 医療教育 HTML 作成 | `.claude/skills/md-to-medical-html/SKILL.md` |
| CSS / デザイン継承 | `.claude/skills/css-design-system/SKILL.md`（権威ソース: `Types-of-headache/html-files/Headaches/Migraine.html`） |
| 用語ツールチップ追加 | `.claude/skills/glossary-term-tooltip/SKILL.md` |
| コードベース監査・改善提案 | `.agents/skills/improve/SKILL.md` + `.agents/skills/improve/references/project-context.md` |
| 進捗・移行状況の確認 | `PROGRESS.md` |

> `.claude/skills/` は Claude Code のスキル機構用ディレクトリだが、**中身は素の Markdown 手順書**であり、
> 他のエージェントがそのまま読んで実行できる。スキル機構を持たないツールは直接 Read すること。

## 絶対に守る規約

1. **TDD**: `web-next/**` の変更は Red（失敗テスト）→ Green → Refactor の順。
   テスト・実装・ドキュメントを 1 コミットにまとめない。詳細 `.claude/rules/tdd-mandatory-cycle.md`。
2. **絶対パス禁止**: コミット対象に `/Users/...` 等のローカル絶対パス・ユーザー名を含めない。
   詳細 `.claude/rules/no-absolute-paths.md`。コミット前に下記チェックを実行する。

   ```bash
   git diff --cached | grep -E '^\+[^+]' | grep -E '(/Users/|/home/|C:\\Users\\)'
   ```

3. **パッケージマネージャは `bun` 固定**（`web-next/`）。npm / yarn / pnpm を使わない。
4. **`any` 禁止** → `unknown` + 型ガード。`==` / `var` / 空 catch も禁止。エラーを握りつぶさない。
5. **忠実転記**: HTML 移行では要約・省略・見出し階層の段飛ばしをしない。
6. **新規ページは「登録 1 セット」まで**が完了条件 — `web-next/lib/content/registry.ts` への登録、
   `web-next/components/site/nav-links.ts` への追加、本文末尾の `<RelatedLinks>`。
   登録漏れは `lib/content/registry.test.ts` が実ルート走査で検知して失敗する。
7. **コメント・ドキュメントは日本語**。
8. **セキュリティ変更は独断で行わない** — CSP（`web-next/lib/security/csp.ts`）の許可ホスト追加、
   外部依存の追加、破壊的な API 変更はユーザー確認を取る。

## 検証コマンド

```bash
# web-next（全通過が必須。部分 pass でコミットしない）
cd web-next
bun run typecheck   # tsc --noEmit
bun run test        # vitest run
bun run lint        # biome check（lint:fix の引数なし実行は禁止）
bun run build       # next build（NEXT_PUBLIC_SITE_URL が必要。.env.local.example を参照）

# レガシー Markdown / HTML
npx markdownlint-cli -c .markdownlint.json <ファイルパス>
python3 .claude/skills/fix-mermaid/scripts/fix_mermaid.py <HTMLファイルパス>
python3 -m pytest .claude/skills/fix-mermaid/scripts/test_fix_mermaid.py
```

## コミット規約

`<type>(<scope>): <subject>` — type は `feat` / `fix` / `docs` / `refactor` / `test` / `chore`。

## 既知の誤検知（対応不要）

- **cSpell**: 医療略語（ICHD, CTTH, NSAIDs, Cochrane, CGRP 等）の `Unknown word` 警告。
- **SonarQube css:S7924**: `var(--xxx)` を解決できずコントラスト不足と誤判定する場合がある。実色で確認。
