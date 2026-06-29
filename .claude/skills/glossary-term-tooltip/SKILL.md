---
name: glossary-term-tooltip
description: >
  web-next の画面で医学的な専門用語に「読み仮名（ふりがな）＋やさしい解説」の
  ツールチップを付ける手順。用語集レジストリ（lib/glossary）に語を追記し、対象ページ本文を
  AutoGlossary で包むだけで初出が自動的に <Term> 化される。契約テストを壊さない安全な適用方法を含む。
  TRIGGER when the user says any of the following (Japanese or English):
  - "用語ツールチップを追加" / "やさしい解説を追加" / "読み仮名を付ける" / "ふりがなを付ける"
  - "専門用語を" / "用語集に追加" / "Term を適用" / "用語解説を付ける"
  - "add glossary term" / "add term tooltip" / "glossary term" / "furigana tooltip"
---

# 専門用語ツールチップ（読み仮名＋やさしい解説）の展開

`docs/architecture.md` Phase 3 で導入した用語ツールチップ基盤。v2 で **AutoGlossary（自動ラップ）** 方式へ移行し、
静的教育ページは本文ルートを 1 つのコンポーネントで包むだけで、辞書に載っている全用語へ
ツールチップが付くようになった。逐一手動ラップは原則不要。

## 基盤（既存・通常は変更不要）

| 役割 | パス | 備考 |
|---|---|---|
| 型・検証 | `web-next/lib/glossary/types.ts` | `GlossaryTerm { id, term, reading, plain }`。`validateGlossary` が `unknown`＋型ガードで検証。空文字・空白のみ・前後空白を含む `id`・id 重複は例外（fail-fast）。 |
| レジストリ | `web-next/lib/glossary/glossary.ts` | `TERMS` 配列＋`GLOSSARY`（検証済み）＋`getTerm(id)`。語はここに集約。 |
| 表示部品 | `web-next/components/glossary/Term.tsx` | `"use client"`。ホバー／フォーカス／タップで開閉。ツールチップは **React portal で `document.body` 直下へ `position: fixed`** 描画（祖先の `overflow`／`transform` によるクリップを回避）。`role="tooltip"`＋`aria-describedby`、Esc で閉じる。 |
| 自動ラップ | `web-next/components/glossary/AutoGlossary.tsx` | 子ツリーを走査し、既知用語の**ページ内初出 1 回**を `<Term id>` 化。Server Component から利用可。 |
| スタイル | `web-next/app/globals.css` の `.term-*` | 全ページ共通。`.term-tip` は fixed＋フリップ対応。追記不要。 |

## 推奨フロー — AutoGlossary で網羅展開

### 1. 用語集に語を追記（`lib/glossary/glossary.ts`）

`TERMS` 配列へ `{ id, term, reading, plain }` を追加する。**カバレッジ＝辞書の収録語数**。

- `id`: kebab-case の一意キー（例: `"cgrp"`, `"trigeminal-nerve"`）。前後に空白を含めない。
- `term`: 専門用語の表記（複合語も収録。最長一致で部分語より優先される）。
- `reading`: 読み仮名（**ひらがな**。英略語は読み下し例 `"シージーアールピー"`）。
- `plain`: **分かりやすい** 1〜2 文の言い換え。専門語の連鎖を避け、たとえを使う。
- **過度に汎用な単漢字語（頭痛／神経／脳 単独）は収録しない**（過剰ラップ・誤マッチ防止）。

### 2. ページ本文を AutoGlossary で包む

各静的教育ページの**本文ルートのみ**を包む（hero/sidebar/disclaimer は `main` の外なので自動除外）。
1 ページあたり「import 追加＋`main` 直下を AutoGlossary で包む」の最小 2 編集で全用語をカバーする。

```tsx
import AutoGlossary from "@/components/glossary/AutoGlossary";

<main className="main">
  <AutoGlossary>
    {/* 既存のセクション群はそのまま */}
  </AutoGlossary>
</main>
```

AutoGlossary の安全策（変更不要・把握のみ）:

- **最長一致優先**（複合語を部分語より先に拾う。例: 緊張型頭痛 > 頭痛）。
- `<a>`／`Ext`／`code`／`button` 配下、`data-no-glossary` を持つ要素は走査しない。
  `data-no-glossary` は**属性が存在すれば**（`data-no-glossary=""` でも）オプトアウト扱い。
- 既存の手動 `<Term id>` は温存し、その id を「使用済み」として記録する（手動ラップと共存）。
- 文字列を分割して用語を子要素に保持するだけなので **textContent は不変**（契約テスト非破壊）。
- `MermaidDiagram` のチャートは prop（children ではない）ため自然に対象外。

### 除外ページ

- `app/prom-checker/page.tsx`（アーキタイプB・client の `PromApp`。`getByRole("button")` の
  振る舞いテストがあり、ボタン増加で壊れるため自動適用しない）。
- `app/page.tsx`（リダイレクトのみ）。

## 手動 `<Term>`（個別指定が必要な場合のみ）

AutoGlossary でカバーできない 1 回限りの語や `/anatomy` の hotspot 用にはインライン指定を使う。

```tsx
import Term from "@/components/glossary/Term";

// 用語集 id 参照
<Term id="cgrp">CGRP</Term>

// インライン指定（用語集に載せない語）
<Term term="大後頭神経" reading="だいこうとうしんけい" plain="後頭部の感覚を伝える神経。">
  大後頭神経
</Term>
```

- `plain`（解説）が解決できない場合、Term は素のテキストへ静かに降格する（開発時は console.warn）。
  用語集に無い `id` を渡しても空表示にはならず、最後の手段として `id` を可視テキストにする。
- 表示は `<button>`。`<a>`・見出し・table 要素の**数を増やさない**ため契約テストを壊さない。
- **hero の `<h1>` は触らない**（textContent 完全一致の契約があるため）。

## 検証（必須）

```bash
cd web-next
bun run test                              # 全テスト green（契約テスト非破壊）
bun run build                             # 型・ビルド
bunx @biomejs/biome check --write lib/glossary components/glossary app/<対象ページ>/page.tsx
```

- AutoGlossary は要素数・textContent を変えないため、既存ページ契約テストは green を維持する。
- 長い `plain` 文字列は Biome formatter が改行する。`--write` で整形してからコミット。
- 新規 id を足したら `lib/glossary/glossary.test.ts` の既知 id テストはそのまま通る。
  挙動を変えた場合のみテストを追加する。

## 注意

- `reading`・`plain` は AI 教育コンテンツであり医師の診断ではない（各ページの Disclaimer を踏襲）。
- 同じ語を複数ページで使う場合も用語集 id は 1 つ（重複追加すると `validateGlossary` が例外）。
- 表内（`.tbl { overflow-x: auto }`）でもツールチップは portal＋fixed で**切れずに全文表示**される。
