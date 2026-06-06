---
name: md-to-medical-html
description: >
  Use this skill to convert a medical study Markdown file into a polished HTML
  education page in the Types-of-headache series. Trigger when the user says:
  "HTMLファイルを作成", "MDからHTMLに変換", "headache HTML", "頭痛HTMLを作成",
  "new headache page", or references a specific headache type MD file
  (e.g. "Tension-Type-Headache.md", "Migraine.md", "Cluster.md").
  Covers: Mermaid HTML entity escaping, SRI script tags, per-section commit
  strategy, CSS design-system inheritance from Migraine.html, and known
  false-positive diagnostics (cSpell medical terms, SonarQube CSS vars).
allowed-tools:
  - Read
  - Write
  - Edit
  - Bash
  - WebFetch
---

# MD → 医療教育 HTML 変換スキル

## 対象ファイル

- **入力**: `Types-of-headache/md-files/{Category}/{HeadacheName}.md` （※Categoryは `Headaches` または `Blocks`）
- **出力**: `Types-of-headache/html-files/{Category}/{HeadacheName}.html`
- **テンプレート参照**: `Types-of-headache/html-files/Headaches/Migraine.html`（デザインシステムの権威ソース）
- **プランファイル**: `.claude/plans/*.md`（存在する場合は事前に読む）

---

## ✅ 事前チェック（Pre-flight）

作業開始前に以下を必ず Read する。スキップ禁止。

```
1. Read: 入力 MD ファイル（全体）
2. Read: Migraine.html（先頭200行でCSS変数・コンポーネントクラスを把握）
3. Read: Migraine.htmlの末尾60行（JS初期化ブロックの確認）
4. Read: .claude/plans/{対象}.md（存在する場合）
```

---

## 🎨 デザインシステム（Migraine.html から継承）

### 継承するもの（変更禁止）

| 要素 | 詳細 |
|------|------|
| CSS 変数 | `--navy`, `--blue`, `--teal`, `--orange`, `--red`, `--green`, `--purple` 等 |
| コンポーネント | `.card`, `.alert(.a-danger/.a-warn/.a-info/.a-ok/.a-purple)`, `.tbl`, `.mmd`, `.src-grid`, `.snoop-grid/.sn`, `.moh-grid/.moh`, `.phase-grid/.ph` |
| エビデンスバッジ | `.bA`, `.bB`, `.bC`, `.bU`, `.bRed`, `.bGrn`, `.bOra` |
| レイアウト | hero → disclaimer → `.layout`(sidebar + main) → footer |
| Mermaid CDN | `https://cdnjs.cloudflare.com/ajax/libs/mermaid/10.6.1/mermaid.min.js` |
| JavaScript | Mermaid 初期化 + IntersectionObserver ナビゲーション |

### ページ固有で変える要素

| 要素 | 方針 |
|------|------|
| **ヒーローグラジエント** | 疾患ごとに異なる色（下表参照） |
| **`.sec-num` 丸の色** | ヒーローのアクセントカラーを使用（例：TTH は `var(--forest2)`） |
| **`.nav-a.active` の色** | 同上 |
| **ヒーロー emoji** | 疾患イメージに合ったもの |
| **hero-tags** | その疾患固有のキーワード |

### 疾患別ヒーローカラー早見表

| 疾患 | グラジエント | 追加 CSS 変数 |
|------|------------|-------------|
| Migraine | `#1a237e → #0277bd`（ブルー系）| なし（既存変数を使用）|
| **Tension-Type Headache** | `#1b4332 → #40916c`（フォレストグリーン）| `--forest1/#1b4332`, `--forest2/#2d6a4f`, `--forest3/#40916c` |
| Cluster Headache | `#4a0000 → #b71c1c`（深紅）| 要追加 |
| 次の疾患 | 上記と被らない色を選択 | 要追加 |

---

## 🔒 Mermaid 必須ルール

### 1. `<pre class="mermaid">` 内の HTML エンティティエスケープ

`<pre>` 内でも `<` と `>` は HTML タグとして解析される。**必ずエスケープすること。**

```html
<!-- ❌ そのまま書くと HTML として解析される -->
<pre class="mermaid">
E -->|低頻度 < 1日/月| F[...]
</pre>

<!-- ✅ エスケープが必須 -->
<pre class="mermaid">
E -->|低頻度 &lt; 1日/月| F[...]
</pre>
```

**MD ファイルから移植する際に確認すべき文字:**

- `<` → `&lt;`（分類コードの `< 1日/月`, `< 12日` など）
- `>` → `&gt;`（`> 3ヶ月` など）
- `&` → `&amp;`（稀だが参照文献名に含まれる場合あり）

`≥`, `≤`, `→`, `⇒`, `✅`, `🚨` などの Unicode 文字はそのまま使用可能。

### 2. Mermaid v10 の追加ルール（fix-mermaid スキルより）

| ルール | 詳細 |
|--------|------|
| カラム0 配置 | `<pre>` 内のコンテンツの先頭空白は問題なし（`pre` タグが空白を保持するため） |
| `**bold**` サポート | v10 はノードラベル内の `**text**` でボールドをサポート |
| 絵文字 | ノードラベル内の絵文字は動作するが複雑なフローでは避ける |
| `block-beta` 禁止 | v10 で全体クラッシュの原因。使用しない |
| Prettier 問題 | VSCode 保存時に `<pre>` 内のインデントが壊れることがある。将来 JS テンプレートリテラルへの移行を検討 |

### 3. Mermaid CDN の SRI ハッシュ

外部スクリプトには必ず `integrity` と `crossorigin` を付ける（セキュリティフック要件）。

```html
<script
  src="https://cdnjs.cloudflare.com/ajax/libs/mermaid/10.6.1/mermaid.min.js"
  integrity="sha512-yD6UxqB1PGCP/nC8vd2pcozgicMkT/FEFo98T0ian+EtJPkbAL+h5gYV3r5Fpy1XWTVdDVoHx/E/9fFHdrHu1g=="
  crossorigin="anonymous"
  referrerpolicy="no-referrer">
</script>
```

バージョンを変更する場合は cdnjs API でハッシュを取得する:

```
GET https://api.cdnjs.com/libraries/mermaid/{VERSION}?fields=sri
```

---

## 📝 Mermaid 初期化 JS（テンプレート固定）

テーマ変数はデザインシステムに合わせる。グリーン系ページの例:

```js
mermaid.initialize({
  startOnLoad: true,
  theme: 'base',
  themeVariables: {
    primaryColor: '#e8f5e9',
    primaryTextColor: '#1b4332',
    primaryBorderColor: '#40916c',
    lineColor: '#546e7a',
    secondaryColor: '#e0f2f1',
    tertiaryColor: '#e8f5e9',
    edgeLabelBackground: '#ffffff',
    fontSize: '13px'
  },
  flowchart: { curve: 'linear', padding: 20 }
});
```

---

## 🔄 コミット戦略（重要）

大規模 HTML ファイル（1000行超）は一度に Write するとトークンを大量消費する。
以下のフェーズに分割してコミットすることで中断リスクを低減する。

### フェーズ分割

| フェーズ | 内容 | 推奨コミットタイミング |
|---------|------|---------------------|
| **Phase 1: スケルトン** | `<head>`, CSS 全体, hero, disclaimer, sidebar（ナビリンクのみ）, footer, `<script>` | ファイル作成直後 |
| **Phase 2: 前半セクション** | 全セクション数の前半（例：15セクションなら §1〜§7）| 前半完了後 |
| **Phase 3: 後半セクション** | 残りセクション（§8〜§15）| 後半完了後 |
| **Phase 4: 修正・仕上げ** | SRI 追加、対比チェック、リンク確認 | 最終確認後 |

### コミットメッセージフォーマット

```
feat(Types-of-headache): {HeadacheName}.html — Phase {N}/4: {内容}

Progress: {完了セクション}/{全セクション数} sections complete
- {このフェーズで完了した主な要素の箇条書き}

Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>
```

**例（Phase 2 完了時）:**

```
feat(Types-of-headache): Tension-Type-Headache.html — Phase 2/4: sections 1-7

Progress: 7/15 sections complete
- 疾患概要・疫学・病態生理（Mermaid 統合モデル）
- ICHD-3 分類ツリー + phase-grid カード
- 診断基準フロー・SNOOP4 スクリーニング + SNOOP4 カード
- 鑑別診断テーブル（TTH/片頭痛/群発/頸原性）

Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>
```

### Write vs Edit の判断

- **Write**: ファイルが存在しない場合（Phase 1 のみ）
- **Edit**: 以降のフェーズはすべて **Edit** を使い、既存コンテンツを壊さない差分を当てる

---

## ⚠️ 既知の誤検知（対応不要）

### cSpell: 医療用語の Unknown word

医療略語・固有名詞（ICHD, CTTH, ETTH, NSAIDs, Bendtsen, Holroyd, Cochrane, Fernández-de-las-Peñas, pericranial, hyperalgesia 等）は cSpell に登録されていないため大量に誤検知される。これらは**医学的に正確な記述**であり修正不要。

プロジェクトの `.cspell.json` または `cSpell.words` に追加することで抑制できるが、HTML 医療教育ページには義務ではない。

### SonarQube css:S7924: コントラスト不足

CSS カスタムプロパティ（`var(--forest1)` 等）をSonarQube は解決できないため、実際のコントラスト比が十分でも警告が出る。**白背景に濃い色、ダーク背景に白** という基本原則を守っていれば実際の WCAG 違反ではない。

確認方法（手動）: [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/) でヒーロー背景色とテキスト色を確認する。

**ただし** `opacity` を使ったテキスト色薄め（`opacity: 0.85`）は、SonarQube ではなく実際の WCAG AA（4.5:1）を下回ることがあるため注意する。代わりに透明度込みの実色を使う。

---

## 📐 セクション構成テンプレート

```html
<!-- ====================================================== SECTION N -->
<section id="sN" class="sec">
  <div class="sec-hd">
    <div class="sec-num">N</div>
    <h1 class="sec-title">セクションタイトル</h1>
  </div>

  <!-- テーブル -->
  <div class="tbl">
    <table>
      <thead><tr><th>列1</th><th>列2</th></tr></thead>
      <tbody>
        <tr><td>...</td><td>...</td></tr>
      </tbody>
    </table>
  </div>

  <!-- Mermaid -->
  <div class="mmd">
    <div class="mmd-lbl">フローチャート — タイトル</div>
<pre class="mermaid">
flowchart TD
    A[ノード] --> B[ノード]
</pre>
  </div>

  <!-- アラート -->
  <div class="alert a-info">
    <div class="alert-i">ℹ️</div>
    <div>メッセージ</div>
  </div>
</section>
```

---

## 📌 完成確認チェックリスト

```
[ ] ブラウザで開き、Mermaid 図が全てレンダリングされる
[ ] サイドバーのスクロールリンクが全て機能する
[ ] モバイル幅（<900px）でサイドバーが非表示になりコンテンツが読める
[ ] 全ての外部リンクが target="_blank" かつ rel="noopener noreferrer" で開く
[ ] <script> タグに integrity + crossorigin が付いている
[ ] ヒーローグラジエントが他ページと重複していない
[ ] エビデンスバッジ (.bA/.bB/.bC/.bU) が正しく使われている
```
