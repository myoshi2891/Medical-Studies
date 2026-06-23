---
name: nextjs-page-migration
description: >
  Migrate static HTML guide pages (Types-of-headache/html-files/**/*.html) to a
  web-next/ Next.js App Router project using TDD.
  TRIGGER when the user says any of the following (Japanese or English):
  - "新規ガイドページを追加" / "ガイドページを移行" / "HTMLをNext.jsに移行"
  - "add new guide page" / "migrate guide page" / "nextjs page migration"
  Applies this repo's patterns: globals.css scoped class styling, hand-written span
  syntax highlighting via dangerouslySetInnerHTML, @tabler/icons-react, lazy Mermaid.
invocation: explicit
allowed-tools:
  - Read
  - Grep
  - Glob
  - Edit
  - Write
  - Bash
---

# Next.js ガイドページ移行スキル

## 概要

`Types-of-headache/html-files/` 配下の静的 HTML ページを
`web-next/`（Next.js App Router）へ TDD で移行する。

> [!IMPORTANT]
> **このスキルは移行開始前（`web-next/` ディレクトリ未作成の段階）での準備スキルです。**
> 移行開始時に最初の移行ページをブートストラップし、そのページが「参照実装」となります。
> 以後の移行はすべてその参照実装のパターンに倣ってください。

**デザインの権威ソース（移行時も継承する）**: `Types-of-headache/html-files/Headaches/Migraine.html`
（CSS 変数・コンポーネントクラスはここを基準とする。詳細は `css-design-system/SKILL.md` 参照）

## セッション開始時に必ず読むファイル

1. **このファイル** — 標準手順と実装パターン
2. **`.claude/rules/tdd-mandatory-cycle.md`** — TDD コミットワークフロー（Red→Green→Refactor→commit）
3. **参照実装** — 最初に移行したページの `page.tsx`（+ `.test.tsx`）と `web-next/app/globals.css`
   （移行開始後に存在する。開始前はデザインの権威ソース `Migraine.html` を読む）

---

## プロジェクト構成（web-next/ — 移行開始後の想定）

| パス | 役割 |
| --- | --- |
| `app/layout.tsx` | `<html lang="ja">` + `next/font/google`（Noto Sans JP 等）+ globals import |
| `app/globals.css` | デザイントークン（`:root`）と各ページのコンポーネントクラス。ページ単位でスコープクラス（例 `.migraine`）配下に記述 |
| `app/<category>/<slug>/page.tsx` | ページ本体（Server Component） |
| `app/<category>/<slug>/page.test.tsx` | 契約テスト（vitest + @testing-library/react） |
| `components/MermaidDiagram.tsx` | Mermaid 描画（`"use client"` + 動的 import + dark テーマ）。**default export** |
| `components/Ext.tsx` | 外部リンク（`target=_blank` + `rel=noopener noreferrer`）。**named export `Ext`** |
| `lib/fonts.ts` | next/font 定義 |
| `biome.json` | Lint/Format |

**スタイル方式**: ページのスタイルは `globals.css` 内のスコープクラス（`.migraine { … }`）に
ネストして記述する（CSS Modules や shiki は不使用）。

**ページ固有トークン名前空間の温存**: ソース HTML が独自のデザイントークンを持つ場合、それらを
既存の `--color-*` へ強制リマップしない。スコープクラス内のローカル変数として温存する:

```css
.migraine {
  --ac: #22d3ee;   /* このページ専用。:root の共通トークンは汚染しない */
  --bg: #0a0e14;
}
```

---

## TDD コミットワークフロー（最重要）

`.claude/rules/tdd-mandatory-cycle.md` を厳守し、論理フェーズごとに
**Red → Green →（Refactor）→ commit** を繰り返す。テスト・実装・ドキュメントを
1 コミットにまとめない。Red（失敗テスト）を経ないコードは未完了扱い。

---

## 新規ページ追加の標準手順

### Step 1: [Red] 契約テストの作成

`app/<category>/<slug>/page.test.tsx` を作成。Mermaid は描画コストを排除するため
`vi.mock` で軽量化する:

```tsx
vi.mock("@/components/MermaidDiagram", () => ({
  default: ({ chart }: { chart: string }) => <div className="mermaid" data-chart={chart} />,
}));
```

最低限の契約（ソースの実数を `grep` で数えてから固定する）:

1. `<h1>` テキスト一致
2. `<h2>`（主要セクション）の個数
3. `section.section` の `id` 配列がソースと一致
4. 外部リンク（href が `http` 始まり）すべてに `target="_blank"` と `rel="noopener noreferrer"`
5. 内部リンク（`#`・相対パス）に `.html` を含まない（外部リンクは除外）
6. Mermaid 図・table・コードブロック（`pre`）の個数

`bun run test` で**失敗を確認**してから commit（`test(web-next): add failing contract tests …`）。

> 個数の数え方の例:
>
> ```bash
> grep -c '<h2>' source.html
> grep -c 'class="mermaid"' source.html
> grep -c '<pre>' source.html
> grep -oE 'href="https?://[^"]*"' source.html | wc -l
> ```

### Step 2: [Green] page.tsx の実装

> **faithful 必須**: ソース HTML の **全リスト項目・全コードブロック・全図・全 callout・全 table** を
> JSX に転写する。要約・省略・縮約は禁止。

- **Server Component デフォルト**。`"use client"` は状態が必要な場合のみ
- ルートを `<div className="<scope>">` で包み、`globals.css` のスコープクラスにスタイルを移植
- 元 HTML の `<style>` を `globals.css` の `:root` トークン + スコープクラスへ移植

#### インタラクティブ chrome（固定サイドバー・進捗バー・scroll-spy）

ソースが固定サイドバー nav・スクロール進捗バー・現在地ハイライト等の
**クライアント interactivity** を持つ場合、**chrome だけをクライアントコンポーネント化し、
本文（section 群）は Server Component の children のまま**にする。

- `page.tsx`（server）: `<XxxSidebar groups={NAV_GROUPS} />` と `<main>…本文…</main>` を置く
- `XxxSidebar.tsx`（`"use client"`）: 進捗バーと nav のみ描画
  - 進捗バー: `scroll` で `scrollY / (scrollHeight - innerHeight)` を `transform: scaleX()` に反映
  - scroll-spy: `IntersectionObserver`（`rootMargin: "-20% 0px -60% 0px"`）で可視 section を追跡
  - `useEffect` のクリーンアップで `removeEventListener` / `observer.disconnect()` を必ず行う

#### JSX 変換 Pitfalls

| 問題 | NG | OK |
|------|-------|-------|
| `class` 属性 | `class="foo"` | `className="foo"` |
| `for` 属性 | `for="id"` | `htmlFor="id"` |
| void 要素 | `<br>` `<img>` | `<br />` `<img />` |
| HTML コメント | `<!-- c -->` | `{/* c */}` |
| インラインスタイル | `style="margin-top:20px"` | `style={{ marginTop: 20 }}` |
| 角括弧テキスト | `<動作>` | `&lt;動作&gt;`（JSX がデコード） |
| 中括弧テキスト | `/products/{id}` | `/products/{"{id}"}` |
| `rowspan` | `rowspan="3"` | `rowSpan={3}` |

#### アイコン（@tabler/icons-react）

元 HTML が Tabler webfont（`<i class="ti ti-xxx">`）を使っている場合は
**`@tabler/icons-react` の SVG コンポーネント**へ変換する。

> **変換は webfont クラス（`<i class="ti …">`）の場合のみ**。Unicode emoji をテキストとして
> 直接埋め込んでいる場合は JSX テキストとしてそのまま残してよい。

- `ti-test-pipe` → `<IconTestPipe />`（PascalCase 化）
- 色: 元 `style="color:var(--c-x)"` → `color="var(--c-x)"` prop
- サイズ: `size`（本文/インライン 16・h2 18・カード/ロゴ 20 が目安）

#### コードブロック（手書き span ハイライト）

ソースは手書き `<span class="kw|cm|st|fn|nu">` でハイライトしている。**shiki は使わない。**
`<pre>` 内に span とテキストが混在し JSX では空白が畳まれるため、
**`dangerouslySetInnerHTML` でテンプレートリテラルとして渡す**（静的文字列のみ・XSS リスクなし）:

```tsx
<pre
  dangerouslySetInnerHTML={{
    __html: `<span class="kw">def</span> <span class="fn">foo</span>():
    <span class="cm"># comment</span>
    return <span class="st">"bar"</span>`,
  }}
/>
```

- biome の `noDangerouslySetInnerHtml` は `biome.json` の `overrides` で**当該ページのみ off** にする:

```jsonc
"overrides": [
  { "includes": ["app/<category>/<slug>/page.tsx"],
    "linter": { "rules": { "security": { "noDangerouslySetInnerHtml": "off" } } } }
]
```

ハイライト用クラス（`globals.css` に定義）: `kw`（キーワード）/ `cm`（コメント・斜体）/
`st`（文字列）/ `fn`（関数名）/ `nu`（数値）。

#### Mermaid ダイアグラム

```tsx
import MermaidDiagram from "@/components/MermaidDiagram"; // default import
<div className="mermaid-wrap">
  <MermaidDiagram chart={`flowchart LR
    A --> B`} />
  <div className="diagram-caption">…</div>
</div>
```

- ラベル内の改行記法 `\n` は、テンプレートリテラルでは **`\\n`** と二重エスケープして保持
- ダイアグラムの**行間**は実改行のまま（Mermaid はステートメント区切りに実改行を要求）
- 記述は**左端揃え**（余計なインデント混入で構文エラー）

#### 外部リンク

```tsx
import { Ext } from "@/components/Ext"; // named import
<Ext href="https://example.com" className="source-item">
  <IconExternalLink size={16} /> ラベル<span className="source-label">英語</span>
</Ext>
```

`Ext` が `target=_blank` + `rel=noopener noreferrer` を保証する。内部リンク（`#anchor`）は
通常の `<a>` を使う。

### Step 3: ローカル検証

```bash
cd web-next
bun run lint        # Biome（変更ファイル単位でパス指定。lint:fix の引数なし実行は禁止）
bun run typecheck   # tsc --noEmit
bun run test        # vitest
bun run build       # Next.js production build
```

**全通過**が必須。部分 pass でコミットしない。

### Step 4: 視覚確認（ユーザー手動）

`bun run dev` → `http://localhost:3000/<category>/<slug>` をユーザーが目視確認。

### Step 5: ドキュメント同期

- `GEMINI.md` / `CLAUDE.md` / `PROGRESS.md` に移行ページを追記
- `git commit` 前に PII チェック（`.claude/rules/no-absolute-paths.md`）:

  ```bash
  git diff --cached | grep -E '^\+[^+]' | grep -E '(/Users/|/home/|C:\\Users\\)'
  ```

---

## 判定基準

| 結果 | アクション |
| --- | --- |
| 全ステップ成功 + テスト全通過 | コミット OK と報告 |
| 単体テスト失敗 | テストの意図を確認し、実装かテストのどちらが誤りか判断 |
| ビルド失敗 | 停止。import / 型エラーを最小差分で修正 |
| lint エラー | 変更ファイル単位でパス指定して修正 |
| 設定ファイルの意図しない変更 | 停止してユーザー確認 |

---

## Constraints（禁止事項）

- **要約・省略しない** — faithful 転写を最優先
- **`"use client"` を不必要に使わない** — Server Component デフォルト
- **shiki / CSS Modules を導入しない** — 手書き span + globals.css スコープ方式
- **`<i class="ti …">` を残さない** — `@tabler/icons-react` へ変換
- **Mermaid ラベルの `\n` を実改行にしない** — テンプレートリテラルでは `\\n`
- **`dangerouslySetInnerHTML` に外部入力を渡さない** — 静的な手書きハイライト文字列のみ
- **`bun run lint:fix`（引数なし）を実行しない** — 変更ファイル単位でパス指定
- **外部フォントを `<link>` で読み込まない** — `next/font/google` のみ（`layout.tsx`）
- **コミット対象に絶対パス / ユーザー名を含めない** — `.claude/rules/no-absolute-paths.md`

---

## 参考文献・ソース一覧

- **TDDコミットワークフロー**: [tdd-mandatory-cycle.md](./.claude/rules/tdd-mandatory-cycle.md) - TDD での実装とコミット手順を定義
- **デザインシステム**: [css-design-system/SKILL.md](./.claude/skills/css-design-system/SKILL.md) - `Migraine.html` を権威ソースとするデザインシステム定義
- **Mermaid.js**: [Mermaid Documentation](https://mermaid.js.org) - クライアント側ダイアグラム描画ツール
- **React 19**: [React 19 Documentation](https://react.dev) - UI ライブラリ
- **Tabler Icons**: [@tabler/icons-react](https://tabler.io/icons) - 使用する SVG アイコンコンポーネントライブラリ
