---
paths:
  - "Types-of-headache/md-files/**/*.md"
  - "Types-of-headache/html-files/**/*.html"
  - "web-next/**/*"
---

# 編集・変換の必須サイクル & コミット分割ルール

頭痛医療教育コンテンツの品質とトレーサビリティを担保するため、以下の編集・検証サイクルおよびコミット分割を**絶対的な強制ルール**として適用する。

## 核心原則

<ai_agent_directive>
**AI エージェントへの厳格な指示**:

1. **検証チェック（Lint/テスト）を経ないコミットや、無秩序な一括コミットは禁止。**
2. **ステップバイステップでの実装・コミットの厳守。** 「Markdown の修正」と「HTML の作成・変換」など、異なる作業フェーズを一括で実装・コミットしてはならない。必ず 1 つのステップが完了し、検証（Lint/テスト）を通過した段階で個別にコミットを実行し、その後に次のステップへ進むこと。
3. **大規模 HTML 作成時は 4 フェーズ分割コミット戦略の徹底。**
4. **web-next では Red（失敗するテスト）を経ないコードをコミットしない。** 実装 → テストの順で書いてはならない。
5. **違反検知時は即時報告。** サイクルを飛ばしたことに気づいた場合、独断で `git reset` 等を実行せず、直ちにユーザーへ報告し、承認を得たうえでリカバリ手順を実施すること。
</ai_agent_directive>

## 適用ドメイン（2 系統・混同しないこと）

本リポジトリには**性質の異なる 2 つの成果物パイプライン**があり、それぞれ別のサイクルを適用する。

| ドメイン | 対象パス | 適用サイクル |
| --- | --- | --- |
| **レガシー HTML**（素の HTML + Mermaid CDN） | `Types-of-headache/md-files/**`, `Types-of-headache/html-files/**` | 下記「必須ワークフロー（レガシー HTML）」ステップ 1〜3 |
| **web-next**（Next.js App Router + Vitest） | `web-next/**`（`biome.json` / `next.config.ts` 等の設定ファイルを含む） | 下記「web-next の必須 TDD サイクル」 |

レガシー HTML を web-next へ移行する作業は**両方に該当する**。その場合、
移行元 HTML の修正（ステップ 1〜3）と移行先 TSX の実装（web-next サイクル）を
**別コミットに分ける**こと。手順の詳細は `.claude/skills/nextjs-page-migration/SKILL.md`。

## 必須ワークフロー（レガシー HTML）

### ステップ 1: Markdown 編集 & 品質チェック (Lint & Format)

Markdown ファイルを新規作成または編集した場合、必ずコミット前に自動整形と Lint 検証を実行する。

- **実行**:
  1. 自動整形: `bun scripts/format-markdown.mjs <ファイルパス>`
  2. Lint検証: `npx markdownlint-cli -c .markdownlint.json <ファイルパス>`
- **コミット**: `docs(Types-of-headache): <作業内容の要約 (例: update Stellate-Ganglion-Block.md)>`

### ステップ 2: HTML 変換・作成とテスト

Markdown から HTML を作成または修正する場合、デザインシステム（`Migraine.html`）を継承し、Mermaid 構文のチェックを実施する。

- **HTML 変換**:
  - `md-to-medical-html` スキルを活用して、Markdown から HTML への変換を正しく行う。
- **Mermaid 構文の自動修正とテスト**:
  - `python3 .claude/skills/fix-mermaid/scripts/fix_mermaid.py <HTMLファイルパス>` を実行して Mermaid の HTML エンティティエスケープと構文の自動修正を行う。
  - `python3 -m pytest .claude/skills/fix-mermaid/scripts/test_fix_mermaid.py` を実行し、修正スクリプトのテストスイートがすべてパスすることを確認する。
- **コミット（大規模 HTML 新規作成時）**:
  - 以下の 4 フェーズに分割してコミットする。コミットメッセージには必ず `Progress: N/M sections complete` を含める。
  - **詳細手順とスクリプト引数の完全仕様は `.claude/skills/md-to-medical-html/SKILL.md` を参照**（重複定義禁止）。
    - **Phase 1**: スケルトン自動生成 — `bun scripts/build-html-skeleton.mjs --page=… --hero=… ...`
    - **Phase 2**: 前半セクション断片を `tmp/<page>-phase2.html` に書き出し → `bun scripts/insert-sections.mjs <target> <fragment>` で挿入
    - **Phase 3**: 後半セクションを同様に挿入（最後の挿入では `--final` でマーカー除去）
    - **Phase 4**: `python3 .claude/skills/fix-mermaid/scripts/fix_mermaid.py <target>` で Mermaid 検証 + 最終チェックリスト確認

### ステップ 3: 最終検証 (Verify)

成果物となる HTML ファイルが正常に動作するか、完成確認チェックリストを満たしているかを確認する。

- **チェック項目**:
  - ブラウザで開き、Mermaid 図がすべてレンダリングされているか
  - サイドバーのスクロールリンクが機能しているか
  - モバイル幅（<900px）でナビゲーションがアクセス可能な状態に保たれているか（以下のいずれか）
    - **(a) 非表示方式**: サイドバーを非表示にし、コンテンツの視認性を確保する（従来の標準パターン）
    - **(b) スライドアウト方式**: サイドバーを画面外へ退避し、トグルボタン（ネイティブ `<button>`・`aria-expanded` 同期・Escape/背景クリックで閉じる）で開閉できる。採用時はキーボード操作とフォーカス復帰を必ず検証する（例: `Headache-Diary.html`）
  - 外部リンクに `target="_blank" rel="noopener noreferrer"` が付与されているか
  - `<script>` タグ（Mermaid 等）に正しい integrity ハッシュと crossorigin が付与されているか

## web-next の必須 TDD サイクル

`web-next/` 配下（Next.js App Router + Vitest）では、**Red → Green →（Refactor）→ commit**
を論理フェーズごとに 1 周させる。テスト・実装・ドキュメントを 1 コミットにまとめてはならない。

### サイクル本体

| フェーズ | 行うこと | コミット |
| --- | --- | --- |
| **Red** | 契約テスト（`*.test.tsx` / `*.test.ts`）を先に書き、`bun run test <パス>` で**失敗を目視確認**する | `test(web-next): add failing contract tests for <対象>` |
| **Green** | テストが通る最小実装。既存テストを 1 件も壊さない | `feat(web-next): implement <対象>` |
| **Refactor** | 重複除去・命名整理。**テストは変更しない**（変えるなら Red に戻る） | `refactor(web-next): <内容>` |
| **Docs** | `GEMINI.md` / `CLAUDE.md` / `PROGRESS.md` の同期 | `docs: <内容>` |

> **Red を経ないコードは未完了扱い。** 実装を先に書いてしまった場合は、テストを追加したうえで
> 一度実装を戻して失敗を確認するか、その旨をユーザーへ報告すること（黙って進めない）。

### 各コミット前に必須の検証（全通過が条件）

```bash
cd web-next
bun run lint <変更ファイル…>   # Biome。引数なしの lint:fix は禁止
bun run typecheck              # tsc --noEmit（strict + noUnusedLocals）
bun run test                   # Vitest 全件（対象だけの部分実行で代替しない）
bun run build                  # 本番ビルド（※ユーザーから「ビルド禁止」指示がある場合は省略）
```

- 整形差分で lint が落ちる場合は **`bunx biome format --write <変更ファイル…>`**（パス明示）で解消する。
  リポジトリ全体の一括整形は行わない。
- `bun run build` は `NEXT_PUBLIC_SITE_URL` を要求する（`app/sitemap.ts` の fail-closed 検証）。
  未設定なら `web-next/.env.local.example` を `.env.local` へコピーして https の値を入れる。

### 新規ページ追加時の「登録 1 セット」（漏らすとテストが落ちる）

ページ本体だけを作って終わりにしない。以下は**機械検知される必須の付随更新**である。

1. `web-next/lib/content/registry.ts` — `CONTENT_REGISTRY` へエントリ追加（`related` は最低 2 本）。
   未登録は `lib/content/registry.test.ts` が `app/**/page.tsx` の実走査と突き合わせて検出する。
2. `web-next/components/site/nav-links.ts` — グローバルナビへ追加。
   `components/site/SiteHeader.test.tsx` の実装済みルート一覧にも追記する（Red 起点）。
3. ページ本文末尾に `<RelatedLinks href="/<category>/<slug>" />` を置く（`<main>` 内）。

`app/sitemap.ts` はレジストリから機械生成されるため**手書きの追記は不要**。

### コミット前の PII チェック（必須）

`.claude/rules/no-absolute-paths.md` に従い、ステージ済み差分に絶対パスが無いことを確認する。

```bash
git diff --cached | grep -E '^\+[^+]' | grep -E '(/Users/|/home/|C:\\Users\\)'
```

## 違反時の対応

万が一、このルールに違反（手順のスキップや一括コミットなど）したことに気づいた場合は、以下の手順を徹底すること：

1. **即座に報告**: ユーザーに対して、どの手順をスキップしたか、どのコミットが不適切であったかを直ちに報告する。
2. **勝手な修復の禁止**: ユーザーの承認を得る前に `git reset` や修正コミットを自律的に実行してはならない。
3. **リカバリ案の提示**: 正しい状態に戻すための手順を提案し、承認を得てから実行する。
