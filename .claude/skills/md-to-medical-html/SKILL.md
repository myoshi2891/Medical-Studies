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

作業開始前に以下を Read する:

```
1. Read: 入力 MD ファイル（全体）
2. Read: .claude/plans/{対象}.md（存在する場合）
3. Read: .claude/skills/css-design-system/SKILL.md（初回セッションのみ）
```

**Migraine.html を直接読む必要はない**: Phase 1 のスケルトンは `scripts/build-html-skeleton.mjs` がテンプレート（`templates/skeleton.html.tmpl`）から自動生成する。CSS 変数・コンポーネントクラス・JS 初期化テンプレートはすべてテンプレートに保存済み。

---

## 🎨 デザインシステム

CSS 変数・共通コンポーネントクラス・JS 初期化テンプレートの完全仕様は `.claude/skills/css-design-system/SKILL.md` を権威ソースとする。**本ファイルでは重複定義しない**。

### ページ固有で変える要素（テンプレート引数として渡す）

| 要素 | スクリプト引数 |
|------|--------------|
| **ヒーローグラジエント 3 色** | `--hero='c1,c2,c3'` |
| **ページ固有 CSS 変数の接頭辞** | `--prefix=xxx`（例: `cpb`, `hdy`, `mig`） |
| **ヒーロー emoji** | `--emoji='🧠'` |
| **hero-tags** | `--tags='tag1,tag2,tag3'` |
| **タイトル・サブタイトル** | `--title=… --subtitle=…` |
| **セクション数・タイトル** | `--sections=N --section-titles='t1,t2,…'` |

### ヒーローカラー重複防止

`scripts/build-html-skeleton.mjs` は既存 HTML 全ファイルの hero gradient を解析し、3 色すべてが一致する場合はエラーで終了する。**手動チェック不要**。使用済みカラーの確認は `PROGRESS.md` または `grep -E '\.hero\{background:linear-gradient' Types-of-headache/html-files/**/*.html` で可能。

---

## 🔒 Mermaid 必須ルール

Mermaid 構文・HTML エンティティエスケープ・SRI ハッシュ・v10 固有ルールの**完全仕様は `.claude/skills/fix-mermaid/SKILL.md` を権威ソースとする**。本ファイルでは重複定義しない。

要点（早見）:

- `<pre class="mermaid">` 内の `<`, `>`, `&` は HTML エンティティエスケープ必須（`&lt;`, `&gt;`, `&amp;`）
- `≥`, `≤`, `→`, `⇒`, `✅`, `🚨` 等の Unicode はそのまま使用可
- SRI ハッシュ・初期化 JS は **テンプレートが自動生成** するため手動編集不要
- Mermaid 構文エラーが疑われたら `python3 .claude/skills/fix-mermaid/scripts/fix_mermaid.py <file>` で自動修正

---

## 🔄 コミット戦略（4 フェーズ分割）

大規模 HTML ファイル（1000 行超）は 4 フェーズに分割してコミットする。各 Phase は新スクリプト経由で実行することで、モデルが巨大ファイル全体を Read/Write することを回避する。

### Phase 1: スケルトン（自動生成）

```bash
bun scripts/build-html-skeleton.mjs \
  --page=<PageName> \
  --category=<Headaches|Blocks|Physical-Therapy|...> \
  --emoji='<emoji>' \
  --hero='<c1>,<c2>,<c3>' \
  --prefix=<page-prefix> \
  --sections=<N> \
  --title='<full title>' \
  --subtitle='<hero sub>' \
  --tags='<t1>,<t2>,...' \
  --section-titles='<sec1>,<sec2>,...'
```

→ 出力: `Types-of-headache/html-files/<category>/<page>.html`
→ コミット: `feat(Types-of-headache): <page>.html — Phase 1/4: skeleton`

スクリプトは以下を自動で行う:

- ヒーロー色重複チェック（既存全ページと照合）
- CSS 変数・コンポーネントクラス・JS 初期化の埋め込み（テンプレートから）
- ページ固有色変数（`--<prefix>1/2/3`）の生成
- サイドバーナビゲーション全リンクの生成
- `<!-- ##SECTION_INSERT## -->` マーカーを `<main>` 直下に配置（Phase 2/3 用）

### Phase 2: 前半セクション

1. モデルは前半セクション（例: §1〜§N/2）の HTML 断片だけを **新規ファイル** に書き出す:

   ```
   tmp/<page>-phase2.html
   ```

2. マーカー位置に挿入:

   ```bash
   bun scripts/insert-sections.mjs \
     Types-of-headache/html-files/<category>/<page>.html \
     tmp/<page>-phase2.html
   ```

3. コミット: `feat(Types-of-headache): <page>.html — Phase 2/4: sections 1-N`

**Edit ツールによる事前 Read（1000 行超）が不要になる**ため、Phase 2/3 のトークン消費が劇的に削減される。

### Phase 3: 後半セクション

Phase 2 と同じ手順で `tmp/<page>-phase3.html` を作成 → 挿入 → コミット。

### Phase 4: 最終化と検証

```bash
# マーカー除去（残っている場合）— 最終フラグメントを最後に注入する場合は --final を付ける
# マーカーが既に存在しなければスキップ可

# Mermaid 構文の自動修正
python3 .claude/skills/fix-mermaid/scripts/fix_mermaid.py \
  Types-of-headache/html-files/<category>/<page>.html

# Mermaid 修正スクリプトのテスト
python3 -m pytest .claude/skills/fix-mermaid/scripts/test_fix_mermaid.py
```

最終チェックリスト（完成確認）を確認 → コミット: `feat(Types-of-headache): <page>.html — Phase 4/4: finalize`

### コミットメッセージフォーマット

```
feat(Types-of-headache): <page>.html — Phase <N>/4: <内容>

Progress: <完了セクション>/<全セクション数> sections complete
- <このフェーズで完了した主な要素の箇条書き>

Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>
```

### Write vs Edit の判断

- **Phase 1**: スクリプトが Write を実行（モデルは直接 Write しない）
- **Phase 2/3**: モデルは `tmp/<page>-phase<N>.html` を Write（小さいファイル）。`insert-sections.mjs` が target を更新（モデルは target を Read/Write しない）
- **Phase 4**: 軽微な修正のみ `Edit` を使用

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
