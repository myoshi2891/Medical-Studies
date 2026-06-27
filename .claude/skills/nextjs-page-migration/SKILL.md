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

> [!IMPORTANT]
> **本プロジェクトのパッケージ管理およびコマンド実行には `bun` が必須です。**
> パッケージの追加やスクリプトの実行（`bun run test`, `bun run dev` など）には必ず `bun` を使用してください。

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
3. **参照実装（アーキタイプ別・既存。新規探索は不要 — まずこれを Read する）**:
   - **アーキタイプ A**（静的教育ガイド）: `web-next/app/blocks/cervical-plexus-block/page.tsx` +
     `page.test.tsx` + `cervical-plexus-block.css` / `web-next/components/MermaidDiagram.tsx` /
     `web-next/components/Ext.tsx` / `web-next/components/blocks/CpbSidebar.tsx` /
     `web-next/tests/setup.ts`（jsdom shim）。**この 7 ファイルを読めば A の全パターンが揃う。**
   - **アーキタイプ B**（インタラクティブ SPA）: `web-next/app/prom-checker/page.tsx` +
     `page.test.tsx` + `prom-checker.css` / `web-next/lib/prom/`（コア）/ `web-next/components/prom/`（シェル）。
   - 共通: `web-next/app/layout.tsx` / `web-next/app/globals.css` / `web-next/biome.json` / `web-next/tests/setup.ts`。
   - デザインの権威ソース（配色・コンポーネントクラスの由来）: `Types-of-headache/html-files/Headaches/Migraine.html`。

> **トークン節約の鉄則**: web-next の構成は上記参照実装に固定済み。`Explore`/`Task` エージェントで
> 構造を再導出しない。対象パスは既知なので **直接 Read** する（ファイル名は本節と次の表で確定）。

---

## プロジェクト構成（web-next/ — 移行開始後の想定）

| パス | 役割 |
| --- | --- |
| `app/layout.tsx` | `<html lang="ja">` + `next/font/google`（Noto Sans JP 等）+ globals import |
| `app/globals.css` | デザイントークン（`:root`）と各ページのコンポーネントクラス。ページ単位でスコープクラス（例 `.migraine`）配下に記述 |
| `app/<category>/<slug>/page.tsx` | ページ本体（Server Component）。先頭で `import "./<slug>.css"` |
| `app/<category>/<slug>/page.test.tsx` | 契約テスト（vitest + @testing-library/react） |
| `app/<category>/<slug>/<slug>.css` | **（A 参照実装の方式）** 元 `<style>` をページ専用スコープクラス（例 `.cervical-accent`）配下へ移植。`biome.json` の `includes` に `!...css` で除外する |
| `components/MermaidDiagram.tsx` | **（A 共有・既存）** Mermaid 描画（`"use client"` + 動的 import + `mermaid.run` の in-place 変換）。**default export**。props = `chart: string` + 任意 `themeVariables?: Record<string,string>`。`dangerouslySetInnerHTML` 不使用 |
| `components/Ext.tsx` | **（A 共有・既存）** 外部リンク（`target=_blank` + `rel=noopener noreferrer`）。**named export `Ext`** |
| `components/<category>/XxxSidebar.tsx` | **（A・既存例 `components/blocks/CpbSidebar.tsx`）** chrome（scroll-spy）のみ `"use client"`。本文は Server Component のまま |
| `components/prom/MermaidDiagram.tsx` | **（B 専用・流用禁止）** named export・`isDark` prop・indigo 固定。A の共有 `components/MermaidDiagram.tsx` とは別物 |
| `tests/setup.ts` | jsdom shim 集約（`matchMedia` / `scrollTo` / `scrollIntoView` / `IntersectionObserver`）。コンポーネント側で再実装しない |
| `lib/fonts.ts` | next/font 定義（`outfit` / `inter`。`layout.tsx` で `<html className>` に適用済み） |
| `biome.json` | Lint/Format。完結した CSS デザインシステムを持つページ CSS は `includes` で整形対象外にする |

**スタイル方式**: A 参照実装（`cervical-plexus-block`）は **ページ専用 CSS ファイル**
（`app/<category>/<slug>/<slug>.css`）を採用し、`page.tsx`（Server Component）の先頭で `import` する。
App Router は Server Component でも CSS import 可。元 `<style>` の `:root` トークンは**ページ専用スコープクラス
配下のローカル変数**へ移し、`globals.css` の共通トークンを汚染しない（CSS Modules や shiki は不使用）。
`globals.css` 内スコープクラスへネストする方式も可だが、新規 A 移行は参照実装に倣い**ページ専用 CSS ファイル**を既定とする。

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
7. **見出し階層の各レベル個数**（`h3` / `h4` …）を固定する。後述の「見出し階層を飛ばさない」を満たす値にする

`bun run test` で**失敗を確認**してから commit（`test(web-next): add failing contract tests …`）。

> 個数の数え方（実装前に必ず実行し、契約値を確定する。`f` にソース HTML パスを入れる）:
>
> ```bash
> f=Types-of-headache/html-files/Blocks/Cervical-Plexus-Block.html   # 対象に置換
> grep -oE 'id="s[0-9]+"' "$f" | wc -l        # section.sec の id 数（id 命名が違う場合は調整）
> grep -c 'class="nav-a"' "$f"                # サイドバー目次リンク数（section 数と一致するはず）
> grep -c '<h2>' "$f"                          # 主要セクション見出し
> grep -c 'class="mermaid"' "$f"              # Mermaid 図
> grep -c '<table' "$f"                        # table（`<table>` も `<table class=...>` も拾う）
> grep -c '<pre>' "$f"                         # 非 Mermaid コードブロック（0 なら dangerouslySetInnerHTML 不要）
> grep -oE 'href="https?://[^"]*"' "$f" | wc -l   # 外部リンク（target/rel 検証の母数）
> ```
>
> > 参考: CPB 参照実装の実測値 = section 18 / nav-a 18 / h2 38 / mermaid 12 / table 22 / pre 0 / 外部リンク 15。
> > これらは `page.test.tsx` に定数（`SECTION_IDS` / `H2_COUNT` 等）として固定する。

### Step 2: [Green] page.tsx の実装

> **faithful 必須**: ソース HTML の **全リスト項目・全コードブロック・全図・全 callout・全 table** を
> JSX に転写する。要約・省略・縮約は禁止。

- **Server Component デフォルト**。`"use client"` は状態が必要な場合のみ
- ルートを `<div className="<scope>">`（例 `.cervical-accent`）で包む
- 元 HTML の `<style>` を **ページ専用 CSS ファイル**（`app/<category>/<slug>/<slug>.css`）へ移植し、
  `page.tsx` の先頭で `import "./<slug>.css"` する。`:root` のページ固有トークンは `.<scope>` 配下の
  ローカル変数へ移す（`globals.css` の共通トークンへ強制リマップしない）
- `<scope> *{ … }` のような全称リセットは**スコープを必ず前置**（`.cervical-accent *`）し、ページ外へ波及させない
- ドキュメント全体のスムーズスクロールが必要でも `html{ scroll-behavior:smooth }` を**無条件で置かない**。
  必ず `prefers-reduced-motion` ガード配下に入れる（アクセシビリティ要件。レビューで必ず指摘される）:

  ```css
  /* reduced-motion を希望しないユーザーにのみ滑らかスクロールを適用する */
  @media (prefers-reduced-motion: no-preference) {
    html { scroll-behavior: smooth; }
  }
  ```

- **font-family の単語フォント名は引用符を付けない**。空白・キーワード衝突のある名前のみ引用符を付ける
  （Stylelint `font-family-name-quotes`）。例: `'Yu Gothic', Meiryo, 'Noto Sans JP'`（`Meiryo` は無引用符）

#### 見出し階層を飛ばさない（h2 → h3 → h4）

faithful 転記でも**見出しレベルを 1 段ずつ下げる一律変換は階層スキップを生む**。元 HTML が
`section h2` の直下で小見出しに `h3` を飛ばして `h4` を使っている（または親ラベル h3 と
子ラベル h3 が同階層）場合、移行先では**論理階層に合わせて是正する**:

- セクション本文の小見出しは `h2 → h3 → h4 …` と**段飛ばしせず**配置する
  （例: §3 の `Step 1〜6` が `h2` 直下なら `h4` ではなく `h3`）
- 親ラベル（例「禁忌一覧」h3）の配下に来る子見出し（「絶対禁忌」「相対禁忌」）は**1 段深く**する（h4）
- 是正したら **`page.test.tsx` の `H3_COUNT` / `H4_COUNT` を実態に合わせて更新**し、コメントに理由を残す

#### 公開文面の衛生（内部メモ・誤字を持ち込まない）

ソースに紛れ込んだ**内部メモ・誤字を公開ページにそのまま転記しない**。faithful 転記の例外として除去・修正する:

- **内部生成メモを除去**: 「（Claude知識カットオフ）」のような AI 生成の注記は利用者に見せない。
  公開すべき出典・最終更新日のみ残す
- **重複文字・誤変換を修正**: 転記時に生じやすい二重文字（`〜を対象としてとして` / `嗜嗜好` / `エビエビデンス` /
  `準准`（正: 準拠）/ `脱顆黎`（正: 脱顆粒））を検出する。Mermaid ノードラベル内も対象。
  検出グレップ例:

  ```bash
  # 同一日本語文字の不自然な連続（誤った二重文字）を機械検出
  grep -nE '(.)\1' app/<category>/<slug>/page.tsx | grep -E '[ぁ-んァ-ヶ一-龠]'
  # 内部メモの混入チェック
  grep -nE 'カットオフ|TODO|FIXME|知識.*?202' app/<category>/<slug>/page.tsx
  ```

#### Mermaid 決定分岐の論理的正しさ

フローチャートの判断ノードで**異なる禁忌・条件を 1 ノードに混在させない**。混在は誤った経路へ
ルーティングする原因になる（例: 「心血管禁忌 または 妊婦？」を 1 ノードにし Yes を両方 CGRP へ送ると、
妊婦が禁忌薬へ誘導される）。**独立した条件は独立ノードに分け**、各分岐先がページ本文の禁忌記述と
矛盾しないことを確認する。

#### インタラクティブ chrome（固定サイドバー・進捗バー・scroll-spy）

ソースが固定サイドバー nav・スクロール進捗バー・現在地ハイライト等の
**クライアント interactivity** を持つ場合、**chrome だけをクライアントコンポーネント化し、
本文（section 群）は Server Component の children のまま**にする。

- `page.tsx`（server）: `<XxxSidebar groups={NAV_GROUPS} />` と `<main>…本文…</main>` を置く
- `XxxSidebar.tsx`（`"use client"`）: 進捗バーと nav のみ描画
  - 進捗バー: `scroll` で `scrollY / (scrollHeight - innerHeight)` を `transform: scaleX()` に反映
  - scroll-spy: `IntersectionObserver`（参照実装 `CpbSidebar.tsx` は `threshold: 0.25`。
    元 HTML の値があればそれを踏襲）で可視 section を追跡し `active` クラスを付与
  - nav リンクは素の `<a href="#sN">`。スムーズスクロールは CSS（`html{scroll-behavior:smooth}`）に委ね、
    JS クリックハンドラは不要（参照実装はハンドラを持たない）
  - `useEffect` のクリーンアップで `removeEventListener` / `observer.disconnect()` を必ず行う
  - **jsdom shim（重要）**: jsdom は `IntersectionObserver` を実装しないため、scroll-spy を持つ
    コンポーネントを `render` するテストは shim が無いと**マウント時に必ず落ちる**。
    `web-next/tests/setup.ts` に no-op スタブを 1 か所だけ追加する（`matchMedia` / `scrollTo` /
    `scrollIntoView` と同じ集約先）。**コンポーネント側に `typeof` ガードを足して回避しない**

> **A 移行の先回りチェック（この 2 点を最初に済ませると手戻りが消える）**:
>
> 1. **biome の CSS 除外**: 完結した CSS デザインシステムを持つページ専用 CSS は
>    `web-next/biome.json` の `files.includes` に `"!app/<category>/<slug>/<slug>.css"` を追加する
>    （既存 `!app/prom-checker/prom-checker.css` と同方針）。怠ると `bun run lint` が整形差分で落ちる。
> 2. **jsdom IntersectionObserver スタブ**: 上記のとおり `tests/setup.ts` に追加（scroll-spy ページのみ）。
>
> なお `bun run lint <変更ファイル…>` の整形差分は、引数なし `lint:fix` 禁止のため
> **`bunx biome format --write <変更ファイル…>`（パス明示）** で解消する（全リポジトリ整形は行わない）。

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
import MermaidDiagram from "@/components/MermaidDiagram"; // default import（B 専用の named import と混同しない）

// ページ別配色は themeVariables 定数に集約し、各図へ渡す（元 HTML の mermaid.initialize の themeVariables を踏襲）
const CPB_MERMAID_THEME: Record<string, string> = {
  primaryColor: "#fce4ec", primaryTextColor: "#4a0e2e", primaryBorderColor: "#c2185b",
  lineColor: "#546e7a", secondaryColor: "#fce4ec", tertiaryColor: "#f8bbd0",
  edgeLabelBackground: "#ffffff", fontSize: "13px",
};

<div className="mmd">
  <div className="mmd-lbl">フローチャート — …</div>
  <MermaidDiagram themeVariables={CPB_MERMAID_THEME} chart={`flowchart LR
A["ノード A\\n2行目"] --> B["ノード B"]`} />
</div>
```

- props は `chart`（必須）+ `themeVariables`（任意・ページ別配色）。`themeVariables` 省略時は中立 base パレット
- ラベル内の改行記法 `\n` は、テンプレートリテラルでは **`\\n`** と二重エスケープして保持
- ダイアグラムの**行間**は実改行のまま（Mermaid はステートメント区切りに実改行を要求）。記述は**左端揃え**
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
- **見出し階層を段飛ばししない** — `h2 → h3 → h4`。是正したら test の `H3_COUNT`/`H4_COUNT` も更新
- **公開文面に内部メモを残さない** — 「（Claude知識カットオフ）」等の AI 生成注記は除去
- **転記由来の二重文字・誤変換を残さない** — `を対象としてとして` / `嗜嗜好` / `準准` 等を grep で検出・修正
- **`scroll-behavior:smooth` を無条件で置かない** — `@media (prefers-reduced-motion: no-preference)` で囲う
- **単語フォント名に引用符を付けない** — `font-family-name-quotes`（例: `Meiryo` は無引用符）
- **Mermaid 判断ノードに異なる条件を混在させない** — 独立条件は独立ノードに分け、本文の禁忌記述と整合させる
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
