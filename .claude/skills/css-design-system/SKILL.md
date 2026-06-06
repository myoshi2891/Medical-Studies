---
name: css-design-system
description: >
  Guideline for inheriting the core CSS design system from Migraine.html.
  Ensures color consistency, layout templates, evidence badge configurations,
  and prefixing for page-specific styles. Trigger when user says:
  "デザインシステムを継承", "CSS変数を適用", "Migraine.htmlのデザイン", "CSS共通クラス",
  "css design system", or "inherit layout".
allowed-tools:
  - Read
  - Write
  - Edit
  - Bash
---

# デザインシステム（Migraine.html）継承スキル

本リポジトリで作成または編集するすべての頭痛教育コンテンツ HTML は、デザインの権威ソースである `Types-of-headache/html-files/Headaches/Migraine.html` のデザインシステム（CSS 変数・コンポーネント・レイアウト）を厳密に継承しなければならない。

---

## 🎨 1. CSS 変数（変更禁止）

以下の変数はデザインシステム全体で統一されているため、値を変更したり、個々のページで再定義してはならない。

```css
:root {
  /* メインカラー */
  --navy: #1a237e;
  --navy2: #0d1b2a;
  --blue: #0277bd;
  --teal: #00695c;
  --orange: #ef6c00;
  --red: #c62828;
  --green: #2e7d32;
  --purple: #6a1b9a;

  /* 薄色背景（アラート等用） */
  --red-l: #ffebee;
  --orange-l: #fff3e0;
  --green-l: #e8f5e9;
  --blue-l: #e1f5fe;
  --teal-l: #e0f2f1;
  --yellow-l: #fffde7;

  /* グレースケール */
  --g1: #ffffff;
  --g2: #fcfcfd;
  --g3: #f5f5f7;
  --g4: #e5e5ea;
  --g5: #aeaeb2;
  --g6: #8e8e93;
  --g7: #48484a;
  --g8: #1c1c1e;
  --g9: #000000;

  /* その他共通変数 */
  --sh: 0 4px 20px rgba(0, 0, 0, 0.08); /* box-shadow */
  --r: 12px;                            /* radius */
  --rs: 8px;                           /* radius-small */
}
```

---

## 🧱 2. 共通コンポーネントクラスの HTML 構造

各コンポーネントを配置する際は、以下の HTML テンプレートおよびクラス構成を厳密に使用すること。

### 汎用カード (`.card`)

```html
<div class="card">
  <!-- コンテンツ -->
</div>
```

### カラー付きアラートボックス (`.alert`)
各カラータイプ (`danger`, `warn`, `info`, `ok`, `purple`) に対応。

```html
<div class="alert a-info">
  <div class="alert-i">ℹ️</div>
  <div>
    <strong>タイトル</strong><br>
    詳細な説明文。
  </div>
</div>
```

| クラス | 用途 | アイコンの目安 |
|---|---|---|
| `.a-danger` | 重大な警告・禁忌・危険シグナル | 🚨 |
| `.a-warn` | 注意・副作用・制限事項 | ⚠️ |
| `.a-info` | 補足情報・エビデンス背景 | ℹ️ |
| `.a-ok` | 推奨される治療・診断基準クリア条件 | ✅ |
| `.a-purple` | 特記事項・臨床のコツ | 💡 |

### スタイル付きテーブル (`.tbl`)
必ず `.tbl` で `<table>` を囲むこと。

```html
<div class="tbl">
  <table>
    <thead>
      <tr>
        <th class="th-teal">大項目</th>
        <th>詳細説明</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>データ1</td>
        <td>データ2</td>
      </tr>
    </tbody>
  </table>
</div>
```

- **ヘッダー変色クラス** (`<th>` に付与):
  - `.th-teal` / `.th-red` / `.th-orange` / `.th-purple`

### Mermaid ダイアグラムコンテナ (`.mmd`)
Mermaid のレンダリング崩れを防ぎ、ラベルを綺麗に配置するためのコンテナ。

```html
<div class="mmd">
  <div class="mmd-lbl">図名 — フローチャート等の説明</div>
  <pre class="mermaid">
    <!-- Mermaid 構文 (HTMLエスケープ必須) -->
  </pre>
</div>
```

### エビデンスグレードバッジ (`.bA`, `.bB`, `.bC`, `.bU`)

```html
<span class="bA">Grade A</span>
<span class="bB">Grade B</span>
<span class="bC">Grade C</span>
<span class="bU">推奨未確立</span>
```

### グリッドレイアウト
- **`.phase-grid`**: 比較カード（4 カラムなど）用
- **`.snoop-grid`**: 二次性頭痛の SNOOP4 スクリーニング用
- **`.moh-grid`**: 薬剤過用リスク分類用
- **`.src-grid`**: 参考文献カード用

---

## 🎨 3. ページ別ヒーローカラーと重複禁止

各疾患・ブロックのページは、ファーストビューのヒーローエリアのグラデーションカラーで区別する。すでに使用されているカラーとの重複は禁止する。

| ページ | グラジエント色 |
|---|---|
| `Migraine.html` | `#1a237e → #0277bd` (ブルー系) |
| `Tension-Type-Headache.html` | `#1b4332 → #40916c` (フォレストグリーン系) |
| `Medication-Overuse-Headache.html` | `#2d142c → #801336` (ワインレッド・バーガンディ系) |
| `Stellate-Ganglion-Block.html` | `#0f2b46 → #1a5f7a` (ディープオーシャンブルー系) |
| *新しいページ* | 上記と明確に異なる配色を設定する。 |

---

## 🛡️ 4. 固有 CSS のカプセル化規約

各ページ固有の CSS クラス（例: 特殊なダイアグラムの枠線や、特定のレイアウト調整）を定義する場合、グローバルなスタイルや他ページと名前衝突を起こさないよう、**必ずページ固有のプレフィックス**を付与する。

- **ルール**: クラス名の先頭に `.[ページ識別子]-` を付与する。
  - *良い例*: `.sgb-special-card`, `.sgb-evidence-map`
  - *悪い例*: `.special-card`, `.evidence-map`（グローバルクラス名と衝突する危険がある）

---

## 🔄 5. JavaScript 初期化テンプレート (Mermaid / ナビゲーション)

HTML の末尾に記述する JavaScript ブロックは、以下のテンプレートを使用し、一貫性を保つこと。

```html
<script>
  // Mermaid 初期化 (テーマ変数はページのヒーローに合わせる)
  mermaid.initialize({
    startOnLoad: true,
    theme: 'base',
    themeVariables: {
      primaryColor: '#f5f5f7',
      primaryTextColor: '#1c1c1e',
      primaryBorderColor: '#aeaeb2',
      lineColor: '#8e8e93',
      secondaryColor: '#e5e5ea',
      tertiaryColor: '#ffffff',
      edgeLabelBackground: '#ffffff',
      fontSize: '13px'
    },
    flowchart: { curve: 'linear', padding: 20 }
  });

  // IntersectionObserver によるサイドバーの active 追従ロジック
  document.addEventListener('DOMContentLoaded', () => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        const id = entry.target.getAttribute('id');
        const link = document.querySelector(`.nav-a[href="#${id}"]`);
        if (!link) return;
        if (entry.intersectionRatio > 0) {
          document.querySelectorAll('.nav-a').forEach(a => a.classList.remove('active'));
          link.classList.add('active');
        }
      });
    }, { rootMargin: '0px 0px -60% 0px' });

    document.querySelectorAll('section.sec').forEach(section => {
      observer.observe(section);
    });
  });
</script>
```
