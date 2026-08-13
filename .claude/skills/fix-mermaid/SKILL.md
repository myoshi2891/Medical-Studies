---
name: fix-mermaid
description: >
  Use this skill to fix Mermaid diagram syntax errors inside HTML files.
  Trigger when the user mentions: "mermaid error", "Syntax error in text",
  "mermaid not rendering", "diagram is broken", "all diagrams crashed",
  or references a Mermaid version error (e.g. "mermaid version 10.9.5").
  Also covers Mermaid inside web-next (Next.js App Router): the shared
  components/MermaidDiagram.tsx contract, template-literal escaping (\\n), and the
  required vi.mock in page.test.tsx.
  Fixes HTML formatter-induced indentation pollution and statement concatenation
  that break Mermaid v10 parsing.
allowed-tools:
  - Read
  - Edit
  - Grep
  - Bash
---

# Mermaid v10 構文修正スキル

## 対象

| 対象ドメイン | 記述形式 | Mermaid の供給元 |
| --- | --- | --- |
| **レガシー HTML**（`Types-of-headache/html-files/**`） | `<div class="mermaid">` ブロック / JS テンプレートリテラル | CDN + SRI（`mermaid@10.9.6`） |
| **web-next**（`web-next/app/**`） | `<MermaidDiagram chart={\`…\`} />` | npm 依存 `mermaid@10.9.6`（CDN 不使用） |

前半（本節〜「Mermaid を諦めて…」の直前）はレガシー HTML 向け。web-next 側の作法は
後半の「web-next（Next.js App Router）での Mermaid」を参照する。**構文ルール自体は共通**。

## Mermaid v10 の必須ルール

1. コンテンツは**カラム0配置**（先頭空白なし）
2. 各ステートメントは**改行で分離**（1行に複数連結しない）
3. ノードラベル `A["text"]` の内容は**1行に収める**
4. `mindmap` のみ例外 — 内部インデントは階層構造を表すため保持する
5. `block-beta` は**使用禁止** — v10.9.5 で全体クラッシュの原因になる。`graph TD` で代替する

## よくある原因

HTMLフォーマッタによる破壊パターン:

- 14スペース等のHTMLインデントがMermaidコンテンツに混入する
- 長いノードラベルが行分断される（`A["テキスト` と `続き"]` に分かれる）
- 複数ステートメントが1行に連結される（`graph TD A["x"] B["y"] A --> B`）

## 修正手順

1. `Grep` で `<div class="mermaid">` を全検索してブロック数を把握する
2. 各ブロックを `Read` で確認し、上記ルール違反を特定する
3. `Edit` で各ブロックの内容を修正する
   - `<div>` タグ自体のインデントは変更しない
   - タグ内のMermaidコンテンツのみを置換対象にする

自動修正が必要な場合は `scripts/fix_mermaid.py` を使用する:

```bash
python3 .claude/skills/fix-mermaid/scripts/fix_mermaid.py path/to/file.html
```

## 変換例

**Before（壊れた状態）:**

```html
<div class="mermaid">
  graph LR A["ノードA"] B["ノードB"] A --> B
  style A fill:#fff
</div>
```

**After（修正後）:**

```html
<div class="mermaid">
graph LR
A["ノードA"]
B["ノードB"]
A --> B
style A fill:#fff
</div>
```

## ダイアグラム別の注意点

詳細は .claude/skills/fix-mermaid/references/mermaid-v10-guide.md を参照。要点のみ:

| 種別 | 注意点 |
| ------ | -------- |
| `graph` / `flowchart` | 最頻出。カラム0ルールを厳守 |
| `sequenceDiagram` | `Note over A,B:` は1行に収める |
| `mindmap` | 内部インデント保持（唯一の例外） |
| `block-beta` | **使用禁止**（全体クラッシュ） |
| `htmlLabels: true` 環境 | `<` → `&lt;`、`>` → `&gt;` に変換 |

## 実地検証済み：ブラウザレンダラー固有の問題（2026年3月）

静的パーサー `@mermaid-js/parser` ではエラーにならないが、ブラウザの Mermaid v10.9.5 レンダラーで `Syntax error in text` が発生するパターン。

### IDEフォーマッター（Prettier）による破壊が根本原因

`<div class="mermaid">` に Mermaid ソースを直接書くと、VSCode/Prettier が保存のたびにインデントを付加して構文を壊す。**恒久対策は JS テンプレートリテラルへの移管**。

```html
<!-- ❌ Prettierが保存時にインデントを付加して破壊する -->
<div class="mermaid">
graph LR
A --> B
</div>

<!-- ✅ JSテンプレートリテラル方式（IDEが一切触れない） -->
<div id="diag-0"></div>
<script>
const DIAGRAMS = {
  'diag-0': `graph LR
A --> B`,
};
mermaid.initialize({ startOnLoad: false });
(async () => {
  for (const [id, src] of Object.entries(DIAGRAMS)) {
    const { svg } = await mermaid.render('svg-' + id, src);
    document.getElementById(id).innerHTML = svg;
  }
})();
</script>
```

この方式では `-->` を `--&gt;` にエスケープする必要もなくなる。

### ブラウザレンダラーで Syntax Error を起こす文字・構文

| 箇所 | 問題のある記述 | 対処 |
| ------ | --------------- | ------ |
| `subgraph` ラベル | 丸括弧 `()` を含む | 削除または別表現に置換 |
| `subgraph` ラベル | 絵文字（`🌐` `🖥️` 等） | 削除 |
| `participant ... as` | 絵文字（`👤` `⚡` 等） | 削除 |
| エッジラベル `\|...\|` | 先頭スラッシュ `\|/command\|` | スラッシュを除去 |
| ノードラベル `["..."]` | 全角波ダッシュ `〜` | `から` 等の日本語に置換 |
| ノードラベル `["..."]` | スラッシュ `path/to` | `-` またはスペースに置換 |
| 菱形ノード `{}` | クォートなし日本語 `{新しいファイル}` | `{"新しいファイル"}` とクォートする |

### SVG サイズ制御

Mermaid v10 は SVG 要素に絶対ピクセル値の `width`/`height` 属性を付与する。`mermaid.render()` 後に必ず除去する。

```js
svgEl.removeAttribute('width');
svgEl.removeAttribute('height');
svgEl.style.width    = 'auto';     // 'auto' 必須。'100%' は NG（拡大されて縦長になる）
svgEl.style.maxWidth = '100%';
svgEl.style.height   = 'auto';
```

CSS にもフォールバックを追加する：

```css
.mermaid-wrap svg {
  width: auto !important;
  max-width: 100% !important;
  height: auto !important;
}
```

## web-next（Next.js App Router）での Mermaid

> **重要**: 本リポジトリの `web-next/` は **CSS Modules を使っていない**（`*.module.css` は 1 つも存在しない）。
> スタイルは「ページ専用 CSS ファイル（`app/<category>/<slug>/<slug>.css`）をページスコープクラス配下に書く」方式。
> したがって `:global()` セレクタや `styles.mermaid` は**このリポジトリでは使わない**。

### コンポーネントは 2 種類ある（取り違え禁止）

| パス | export 形式 | 用途 | props |
| --- | --- | --- | --- |
| `web-next/components/MermaidDiagram.tsx` | **default export** | アーキタイプ A（静的教育ガイドページ）共有 | `chart: string` / `themeVariables?: Record<string,string>` |
| `web-next/components/prom/MermaidDiagram.tsx` | **named export** | アーキタイプ B（prom-checker）専用・流用禁止 | `isDark` 等・indigo 固定 |

A 共有版の実装方針（`dangerouslySetInnerHTML` は不使用）:

- `mermaid` を**動的 import**（初回描画時のみロード。バンドル肥大と SSR 実行を回避）
- `<pre className="mermaid">` を ref で掴み、`mermaid.run({ nodes: [node] })` で **in-place 変換**
- 再描画時は `node.removeAttribute("data-processed")` + `node.textContent = chart` で定義文へ戻す
- `securityLevel: "strict"` / `theme: "base"` / `flowchart: { curve: "linear", padding: 20 }`
- 描画失敗時はページ全体を落とさず、図の位置にフォールバック文言を出す（エラーを握りつぶさない）

### JSX でのチャート記述ルール

```tsx
import MermaidDiagram from "@/components/MermaidDiagram"; // default import

const PAGE_MERMAID_THEME: Record<string, string> = {
  primaryColor: "#fce4ec", primaryTextColor: "#4a0e2e", primaryBorderColor: "#c2185b",
  lineColor: "#546e7a", edgeLabelBackground: "#ffffff", fontSize: "13px",
};

<div className="mmd">
  <div className="mmd-lbl">フローチャート — …</div>
  <MermaidDiagram themeVariables={PAGE_MERMAID_THEME} chart={`flowchart LR
A["ノード A\\n2行目"] --> B["ノード B"]`} />
</div>
```

| ルール | 理由 |
| --- | --- |
| テンプレートリテラルは**左端揃え**（インデントを入れない） | カラム0ルール。JSX の見た目のためにインデントすると構文エラー |
| ノードラベル内の改行は **`\\n`**（二重エスケープ） | テンプレートリテラルで `\n` と書くと実改行になり、Mermaid がステートメント区切りと誤認する |
| ステートメント間は**実改行**のまま | Mermaid は改行を区切りとして要求する |
| HTML 由来の `--&gt;` 等のエンティティは**素の記号へ戻す** | JSX 文字列にエスケープは不要（`-->` と書く） |
| ページ別配色は `themeVariables` 定数に集約 | 元 HTML の `mermaid.initialize({ themeVariables })` の移植先 |

### Vitest での必須モック

`MermaidDiagram` は client component で `mermaid` を動的 import するため、jsdom では描画コスト・
非同期エラーの原因になる。**契約テストでは必ずモックする**（パスは実在するものを使うこと）。

```tsx
// アーキタイプ A のページテスト（app/<category>/<slug>/page.test.tsx）
vi.mock("@/components/MermaidDiagram", () => ({
  default: ({ chart }: { chart: string }) => <div className="mermaid" data-chart={chart} />,
}));
```

- モック後の図の個数は `container.querySelectorAll(".mermaid")` で数える契約にする。
- `@/components/docs/MermaidDiagram` は**存在しない**（旧記述。指定するとモックが効かない）。

### CSP との関係

`web-next/next.config.ts` は静的 CSP を強制し、外部スクリプトを許可ホストに限定している。
**web-next 側では Mermaid を CDN から読み込まない**（npm 依存 `mermaid@10.9.6` をバンドルする）。
CDN + SRI 方式が必要なのはレガシー HTML（`Types-of-headache/html-files/`）のみ。

---

### Mermaid を諦めて HTML/CSS に置き換えるべきケース

以下は CSS では対処不能なため、**純粋な HTML/CSS ウィジェットに置き換える**：

- `flowchart TD` で 5〜6 ノードを直列チェーン → 縦長 900px 超
- 接続されていない複数のサブグラフ（ノード数が非対称なためアスペクト比が崩れる）

判断基準：「ノード増減に関わらず、他の図と同じ高さに収まる保証がない場合」
