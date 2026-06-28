---
name: glossary-term-tooltip
description: >
  web-next の画面で医学的な専門用語に「読み仮名（ふりがな）＋高校生レベルのやさしい解説」の
  ツールチップを付ける手順。用語集レジストリ（lib/glossary）に語を追記し、対象ページ本文の
  初出を <Term> でラップする。契約テストを壊さない安全な適用方法を含む。
  TRIGGER when the user says any of the following (Japanese or English):
  - "用語ツールチップを追加" / "やさしい解説を追加" / "読み仮名を付ける" / "ふりがなを付ける"
  - "専門用語を高校生向けに" / "用語集に追加" / "Term を適用" / "用語解説を付ける"
  - "add glossary term" / "add term tooltip" / "glossary term" / "furigana tooltip"
---

# 専門用語ツールチップ（読み仮名＋やさしい解説）の展開

`docs/architecture.md` Phase 3 で導入した用語ツールチップ基盤を、残りの画面
（`app/therapies/`・`app/blocks/`・`app/prom/`・`app/page.tsx` など）へ反復適用するための手順。

## 基盤（既存・変更不要）

| 役割 | パス | 備考 |
|---|---|---|
| 型・検証 | `web-next/lib/glossary/types.ts` | `GlossaryTerm { id, term, reading, plain }`。`validateGlossary` が `unknown`＋型ガードで検証し、空文字・id 重複は例外（fail-fast）。 |
| レジストリ | `web-next/lib/glossary/glossary.ts` | `GLOSSARY` 配列＋`getTerm(id)`。語はここに集約。 |
| 表示部品 | `web-next/components/glossary/Term.tsx` | `"use client"`。ホバー／フォーカス／タップで開閉、`role="tooltip"`＋`aria-describedby`、Esc で閉じる。 |
| スタイル | `web-next/app/globals.css` の `.term-*` | 全ページ共通。中立色なのでどのアクセントスコープでも視認可能。追記不要。 |

## Term の使い方

```tsx
import Term from "@/components/glossary/Term";

// 用語集 id 参照（推奨）。children が本文表示テキスト。
<Term id="cgrp">CGRP</Term>

// インライン指定（用語集に載せない 1 回限りの語や /anatomy hotspot 用）。
<Term term="大後頭神経" reading="だいこうとうしんけい" plain="後頭部の感覚を伝える神経。">
  大後頭神経
</Term>
```

- `plain`（解説）が解決できない場合、Term は素のテキストへ静かに降格する（開発時は console.warn）。
- 表示は `<button>`。`<a>`・見出し・table 要素の**数を増やさない**ため、後述の契約テストを壊さない。

## 手順

### 1. 対象ページの専門用語を抽出

対象 `page.tsx` から、高校生に説明が必要な語を選ぶ。**そのページ自身のテーマ語は避け**、
他疾患・他概念への相互参照になる語を優先する（例: 片頭痛ページでは「片頭痛」を囲まない）。
1 ページあたり **8〜15 語**を目安に、網羅ではなく要点を優先。

### 2. 用語集に追記（`lib/glossary/glossary.ts`）

`TERMS` 配列へ `{ id, term, reading, plain }` を追加する。

- `id`: kebab-case の一意キー（例: `"cgrp"`, `"trigeminal-nerve"`）。
- `term`: 専門用語の表記。
- `reading`: 読み仮名（**ひらがな**。英略語は読み下し例 `"シージーアールピー"`）。
- `plain`: **高校生でも分かる** 1〜2 文の言い換え。専門語の連鎖を避け、たとえを使う。

### 3. 本文の初出を `<Term>` でラップ

- `import Term from "@/components/glossary/Term";` を追加（`@/components/Ext` の近く）。
- 各語の**本文（`<p>`/`<td>`/`<li>`）の初出**を `<Term id="...">用語</Term>` に置換する。
- **hero の `<h1>` は触らない**（textContent 完全一致の契約があるため）。
- 見出し（h2〜h4）内の語も textContent は不変だが、迷ったら本文を優先。
- Mermaid 図のチャート文字列（テンプレートリテラル）内は JSX ではないので**ラップ不可**。

### 4. 契約テスト非破壊チェック（必須）

```bash
cd web-next
bun run test -- --run app/<対象ページ>   # 当該ページの契約テスト
bun run test                              # 全体
bun run build                             # 型・ビルド
npx @biomejs/biome check --write lib/glossary app/<対象ページ>/page.tsx
```

- Term は `<button>` なので `<a>`/`<table>`/`<h2..>` の数は不変。textContent はラップしても変わらない
  （`tension-type-headache` の h3/h4 textContent 検証も通る）。
- 長い `plain` 文字列は Biome formatter が改行する。`--write` で整形してからコミット。

## 注意

- `reading`・`plain` は AI 教育コンテンツであり医師の診断ではない（各ページの Disclaimer を踏襲）。
- 同じ語を複数ページで使う場合も用語集 id は 1 つ（重複追加すると `validateGlossary` が例外）。
- 新規 id を足したら `lib/glossary/glossary.test.ts` の `getTerm("cgrp")` のような既知 id テストは
  そのまま通る。挙動を変えた場合のみテストを追加する。
