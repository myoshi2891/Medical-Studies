---
name: nextjs-page-migration
description: >
  Migrate HTML pages to a web-next/ Next.js App Router project using TDD.
  Handles two archetypes: A = static educational guide pages
  (Types-of-headache/html-files/**/*.html, Server Component, faithful transcription),
  B = interactive single-page apps (prom-checker/index.html, client state + hash router,
  pure-function core extraction + StorageAdapter).
  TRIGGER when the user says any of the following (Japanese or English):
  - "新規ガイドページを追加" / "ガイドページを移行" / "HTMLをNext.jsに移行"
  - "add new guide page" / "migrate guide page" / "nextjs page migration"
  - "インタラクティブHTMLを移行" / "SPAをNext.jsに移行" / "migrate interactive HTML"
  Applies this repo's patterns: globals.css / scoped-class styling, hand-written span
  syntax highlighting via dangerouslySetInnerHTML, @tabler/icons-react, lazy Mermaid,
  declarative registry + pure-function scoring core, StorageAdapter persistence.
invocation: explicit
allowed-tools:
  - Read
  - Grep
  - Glob
  - Edit
  - Write
  - Bash
---

# Next.js ページ移行スキル

## 概要

HTML ページを `web-next/`（Next.js App Router）へ TDD で移行する。移行対象は
**2 つのアーキタイプ**に大別され、手順が分岐する。

- **アーキタイプ A — 静的教育ページ**: `Types-of-headache/html-files/` 配下のガイド HTML。
  Server Component として**忠実転記**する。本スキルの大半（「新規ページ追加の標準手順」）は A 用。
- **アーキタイプ B — インタラクティブ SPA**: `prom-checker/index.html` のような状態・ルーティング・
  永続化を持つ単一 HTML アプリ。**コア（データ + 純粋関数）を抽出**し、シェル（描画 + 永続化）を
  クライアントコンポーネントへ移植する。詳細は「アーキタイプ B: インタラクティブ SPA の移行」節。

## アーキタイプ判定（最初に必ず行う）

ソース HTML の `<script>` を確認し、次のいずれかがあれば **B**、なければ **A**:

| 判定シグナル（B の兆候） | 例 |
| --- | --- |
| アプリ状態を保持する変数・更新 | `const state = {…}`、`state.x = …` |
| クライアントルーター | `location.hash` / `hashchange` / `route()` |
| 永続化 | `localStorage` / `IndexedDB` / `StorageAdapter` |
| フォーム送信ハンドラ | `addEventListener("submit", …)` で値を収集・保存 |
| 宣言的データ + 純粋関数ロジック | `REGISTRY` / スコアリング / 自己テスト（self-test） |

> `<script>` が Mermaid 初期化・スムーズスクロール・scroll-spy のみ（状態も永続化も無い）なら **A**。
> 迷ったら `grep -nE 'localStorage|location.hash|addEventListener\("submit"' source.html` で確認する。

**B の参照実装**: `prom-checker/index.html` → `web-next/`（`lib/prom/` コア +
`components/prom/` シェル）。新規 B 移行はこの構成に倣う。

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

## アーキタイプ A: 新規ページ追加の標準手順

> 静的教育ページ（Server Component・忠実転記）の手順。B の場合は次の大節へ。

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
`<pre>` 内に span とテキストが混在し JSX では空白が畳まれるため、**`dangerouslySetInnerHTML` でテンプレートリテラルとして渡す**:

```tsx
<pre
  dangerouslySetInnerHTML={{
    __html: `<span class="kw">def</span> <span class="fn">foo</span>():
    <span class="cm"># comment</span>
    return <span class="st">"bar"</span>`,
  }}
/>
```

> [!WARNING]
> Do not pass user input, API responses, database content, or generated/dynamic templates to the `__html` property. Using `dangerouslySetInnerHTML` with non-static content introduces a severe Cross-Site Scripting (XSS) vulnerability. The value passed to `__html` must be a static string literal hardcoded in the source code.


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

## アーキタイプ B: インタラクティブ SPA の移行

`prom-checker/index.html` を参照実装とする。設計の核心は**コアとシェルの分離**:

- **コア（環境非依存・TDD 対象）** = ① 宣言的レジストリ（質問票＝データ） + ② 純粋関数（スコアリング）。
  DOM / Storage / 時刻に触れない。HTML 版と TS 版で **1:1 移植可能**。
- **シェル（差し替え可能）** = ③a 描画レイヤ（HTML/JS → React/TSX） + ③b 永続化アダプタ（StorageAdapter）。

### B-0: ブートストラップ（`web-next/` 未作成時のみ・`chore`）

- 配置先はリポジトリルートの **`web-next/`**（`.gitignore` が `web-next/coverage/` を予約済み）。
- `create-next-app` は**使わない**（最新版を引き決定論を損なう）。設定ファイルを手書きで複製する。
  確定スタック（参照 `package.json` を複製）: next `16.2.6` / react・react-dom `19.2.4` /
  mermaid `10.9.6` / @tabler/icons-react `^3.34.0` / typescript `^5` /
  tailwindcss `^4` + @tailwindcss/postcss `^4` / @biomejs/biome `^2.5.0` /
  vitest `^4.1.4` + @vitest/coverage-v8 `4.1.4` / jsdom `^25` / @testing-library/{react,dom,jest-dom}。
- スクリプト: `dev/build/start/lint(biome check .)/lint:fix/format/test(vitest run)/test:coverage/test:watch/typecheck`。
- `tsconfig`: `strict: true` + paths `@/*`。`vitest.config`: `environment: "jsdom"` + setup（jest-dom）。

> **スタイルと Tailwind の共存（重要・preflight 競合回避）**: Tailwind v4 は依存に含めるが、
> 完結したカスタム CSS デザインシステムを持つページでは **`@import "tailwindcss"` を行わない**。
> preflight（リセット）が独自リセット・リスト表示・フォームスタイルを上書きして崩すため。
> ページ固有 CSS は**スコープクラス配下に別ファイル**（例 `app/<app>/<app>.css`）へ置き、
> その**クライアントコンポーネントから `import`** する（`globals.css` は最小トークンのみ）。

### B-1: [Red] コアの契約テスト → [Green] コア移植（最初の論理フェーズ）

1. `lib/<app>/types.ts`: `Result<T>` 型（`{ ok:true; value } | { ok:false; error }`）と
   レジストリ/レコードの型を定義。`any` 禁止 → `unknown` + 型ガード。
2. `lib/<app>/*.test.ts`: **HTML 埋め込み self-test → Vitest 単体テスト**へ変換（下記パターン）。
   実装前に `bun run test` で**失敗確認** → commit（`test(web-next): add failing … contract tests`）。
3. `lib/<app>/registry.ts`（宣言的データを `as const` + 型注釈で TS 化）と
   `lib/<app>/scoring.ts`（純粋関数を named export。`Result` で返す）を実装 → 緑 → commit（`feat`）。

#### 「HTML 埋め込み self-test → Vitest」変換パターン（B の TDD 起点）

多くの SPA は `runSelfTests()` のような自己診断を内蔵する。これが**移植のゴールデンテスト**になる。

| 元（HTML 内 IIFE/関数） | 変換後（Vitest） |
| --- | --- |
| `const assert = (c,m) => { if(!c) throw … }` | `expect(...).toBe(...)` |
| `t("name", () => {…})` の各シナリオ | `it("name", () => {…})` |
| `SCORING.scoreInstrument(...)`（IIFE 名前空間） | `scoreInstrument(...)`（named import） |
| 戻り値 `{ok,value}` の `unwrap` | `expect(r.ok).toBe(true); if (r.ok) …` で型を絞る |
| 異常系（範囲外・非整数・未知 method） | `expect(fn(...).ok).toBe(false)` を明示的に追加 |

> self-test は画面にも残す場合がある（`?selftest=1`）。その場合**ロジックは純粋関数に集約**し
> （例 `components/<app>/self-tests.ts`）、Vitest と画面表示の両方から呼ぶ。重複実装しない。

### B-2: [Red] → [Green] 永続化アダプタ（StorageAdapter）

- `StorageAdapter` interface（`load/save/exportAll/importAll`）に UI を依存させる（**依存性逆転**）。
  具体実装 `LocalStorageAdapter` は `StorageLike`（`getItem/setItem/removeItem`）を注入で受ける。
- テストは**インメモリ Storage モック**を注入して往復（save→load）と
  `schemaVersion` 不一致時のマイグレーション（`migratedFrom` 付与）を検証。
- 将来 IndexedDB / 同期へ差し替え可能なことを担保する。

### B-3: シェル（描画レイヤ）をクライアントコンポーネントへ

#### ハッシュ SPA → 単一 `"use client"` ルート + 内部ルーター

元のハッシュ/状態ベースのビュー切替を**そのまま忠実移植**する（最も低リスク・共有 state が単純）:

- `app/<app>/page.tsx`（Server Component）は `<XxxApp />` を描画するだけ。
- `XxxApp.tsx`（`"use client"`）: `useState` で状態、`useEffect` で起動ロード（`boot()` 相当）+
  `hashchange` リスナ。`currentHash` を state に持ち、`#/...` をパースして view/param を導出して切替。
- **ゲート不変条件**（例: SNOOP4 未完了なら遷移ブロック）は描画分岐で保持し、URL も effect で同期。
- 状態更新は**不変更新** + `commit(next)`（setState → StorageAdapter へ全キー保存）に集約。
  元の「`state` を mutate → `persistAll()`」を、`commit` 一本へ変換する。
- 共有状態・操作は **React Context** で各ビューへ配布（`navigate` / `toast` / `commit` / `openUrgent` 等）。

#### テーマ（ダーク/ライト/自動）

- `data-theme` を `<html>` ではなく**ラッパ `<div className="<app>">` へ宣言的付与**する。
  サーバ/クライアントのハイドレーション不一致を避けつつ、`.<app>[data-theme="dark"]` が
  全子孫へカスケードする。OS 追従は `matchMedia` を**必ず `typeof` ガード**（jsdom 非実装）。

#### モジュール共有オブジェクトを mutate しない

元実装が `REGISTRY.x.scoring.variant = …` のように共有データを書き換えていても、React では
**派生オブジェクト**（`{ ...def, scoring: { ...def.scoring, variant } }`）を採点関数へ渡す。
モジュールスコープの import を mutate すると全レンダーに波及して不具合になる。

#### `innerHTML` 文字列組立 → JSX 変換（A の Pitfalls 表に加えて）

| 問題 | NG（元 JS） | OK（JSX） |
|------|-------|-------|
| HTML エスケープ関数 | `esc(v)` で手動エスケープ | **不要**（JSX が自動エスケープ） |
| 文字列連結組立 | `'<div>' + esc(x) + '</div>'` | `<div>{x}</div>` |
| `element.innerHTML = html` | 動的文字列を代入 | コンポーネント + state で再描画 |
| フォーム値収集 | `$('[name=…]').value` を querySelector | `new FormData(form)` を submit 時に読む |
| 動的行（薬剤追加等） | DOM ノード生成 + 値の手動読取 | 行を **state 配列**で管理（controlled） |

> **`dangerouslySetInnerHTML` は使わない**（動的文字列のため）。Mermaid は A と同じく
> `pre.mermaid` + `mermaid.run({ nodes })` の in-place 変換で SVG を注入せず描画する。

### B-4: 検証とコミット分割

- 各コミット前に `bun run lint <変更ファイル>` / `typecheck` / `test` / `build` 全通過。
- コミット順: `chore`(bootstrap) → `test`/`feat`(core) → `test`/`feat`(storage) →
  `test`(shell 契約) → `feat`(shell) → `docs`。**テスト・実装・ドキュメントを 1 コミットにまとめない。**
- シェルは router が全ビューを束ねる密結合ユニットになりやすい。機能境界で割れない場合は
  契約テスト（ゲート→緊急 / ゲート→ダッシュボード等）を Red 起点に、シェルを 1 つの `feat` で確定してよい。

### B 関連スキルとの関係

- `html-to-nextjs-migration`: `<pre>` 改行消失・Tailwind v4 preflight 競合・`class→className`・
  HTML エンティティの落とし穴（A/B 共通の低レベル変換）。
- `md-to-nextjs-migration`: Markdown 由来コンテンツの JSX 化（主に A の本文生成）。
- 本スキルの B 節は上記を前提に、**コア抽出 + StorageAdapter + ハッシュ SPA 移植**の上位手順を定義する。

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
- **（B）コアに副作用を持ち込まない** — `lib/<app>/` は DOM / Storage / 時刻に触れない純粋層
- **（B）モジュール共有 import を mutate しない** — 派生オブジェクトを渡す
- **（B）self-test を二重実装しない** — 純粋関数に集約し Vitest と画面で共用
- **（B）`@import "tailwindcss"` でデザインシステム CSS を上書きしない** — preflight 競合回避

---

## 参考文献・ソース一覧

- **TDDコミットワークフロー**: [tdd-mandatory-cycle.md](./.claude/rules/tdd-mandatory-cycle.md) - TDD での実装とコミット手順を定義
- **デザインシステム**: [css-design-system/SKILL.md](./.claude/skills/css-design-system/SKILL.md) - `Migraine.html` を権威ソースとするデザインシステム定義
- **Mermaid.js**: [Mermaid Documentation](https://mermaid.js.org) - クライアント側ダイアグラム描画ツール
- **React 19**: [React 19 Documentation](https://react.dev) - UI ライブラリ
- **Tabler Icons**: [@tabler/icons-react](https://tabler.io/icons) - 使用する SVG アイコンコンポーネントライブラリ
