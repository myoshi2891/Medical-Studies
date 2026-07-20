# Plan 012: 共有端末向けの localStorage 注意喚起を常設し、データ消去導線へ誘導する

> **Executor instructions**: 本プランは小規模な UI 追加である。各ステップの検証コマンドを実行し、
> 期待結果を確認してから次へ進むこと。「STOP conditions」該当時は停止して報告する。
> 完了時に `plans/README.md` の Status を更新する。
>
> **Drift check (run first)**:
> `git diff --stat 6614b7c..HEAD -- web-next/components/prom web-next/lib/prom/storage.ts`
> 差分がある場合は「Current state」の抜粋と実コードを突き合わせ、不一致なら STOP。

## Status

- **Priority**: P1（監査所見 F4/F5 — localStorage 残存リスクのユーザー向け注意喚起）
- **Effort**: S
- **Risk**: LOW（表示の追加のみ。保存・消去ロジックは変更しない）
- **Depends on**: なし（`plans/013-privacy-policy-and-terms-pages.md` のプライバシーポリシーと文言を整合させる）
- **Category**: security / ux
- **Planned at**: commit `6614b7c`, 2026-07-09

## Why this matters

頭痛日誌・PROM スコアという**健康データ**が端末の `localStorage` に平文で保存されるため、共有端末・
公共端末では次の利用者が閲覧できてしまう。是正方針（`docs/publishing/04-security-policy.md` §4）は
(a) 「この端末に健康データが残る」ことの明示、(b) ワンクリック消去導線、(c) 共有端末での利用を控える
注意書きの常設、の 3 点。**(b) の消去機能は既に実装済み**（下記 Current state）だが、(a)(c) の
注意喚起が存在せず、消去導線の存在もデータ管理画面を開くまで分からない。本プランは注意喚起を
常設し、既存の消去導線へ接続する — 新しい消去ロジックは書かない。

## Current state

- **消去機能は実装済み**: `web-next/components/prom/views/DataManager.tsx` の `onWipe`（193–205 行）が
  `window.confirm` 確認のうえ `store.clearAll()` を呼ぶ。ボタンは同ファイル 362–364 行
  （`c-btn c-btn--danger`「すべてのデータを削除」）。
- 消去対象キー: `web-next/lib/prom/storage.ts` の `KEYS`（18–23 行）—
  `headache_prom_settings` / `headache_prom_snoop` / `headache_prom_diary` / `headache_prom_scores`。
  `LocalStorageAdapter.clearAll()`（149–161 行）が 4 キーすべてを削除する。
- ルーティング: PROM SPA はハッシュルータ。データ管理画面は **`#/data`**
  （`web-next/components/prom/PromApp.tsx` 257 行 `view === "data"` → `<DataManager />`）。
  ビュー切替は `PromContext` の `navigate("#/data")`。
- `DataManager.tsx` の画面説明文（213–216 行）に「データは外部に送信されません」とあるが、
  **端末に残ること・共有端末のリスクへの言及はどこにもない**。
- 文体・部品の手本: 小さな注意書きは `c-small c-muted` クラス、カードは `c-card`、
  ボタン行は `c-btnrow`（いずれも `DataManager.tsx` 内に使用例多数）。
- テストの手本: `web-next/components/prom/views/DataManager.test.tsx`（Testing Library + vitest）。

## Commands you will need

| Purpose | Command（`web-next/` で実行） | Expected on success |
|---|---|---|
| Install | `bun install --frozen-lockfile` | exit 0 |
| Typecheck | `bun run typecheck` | exit 0 |
| Tests | `bun run test` | 全 pass |
| Lint | `bun run lint` | exit 0 |
| Build | `bun run build` | exit 0 |

## Scope

**In scope**（変更してよいファイル）:

- `web-next/components/prom/StorageNotice.tsx`（新規作成）
- `web-next/components/prom/StorageNotice.test.tsx`（新規作成）
- `web-next/components/prom/views/Dashboard.tsx`（StorageNotice の設置のみ）
- `web-next/components/prom/views/DataManager.tsx`（説明文への 1 文追記のみ）
- `docs/publishing/04-security-policy.md`（チェックリスト更新）

**Out of scope**（触らない）:

- `web-next/lib/prom/storage.ts` — `clearAll` は実装済み。ロジック変更禁止。
- `onWipe` の `window.confirm` — 確認方式の変更（モーダル化等）は本プランに含めない。
- 静的教育ページ（`web-next/app/prom/**`）— localStorage を使用しないため対象外。
- `prom-checker/index.html` — 旧 SPA。web-next への注意喚起が優先（旧版対応は必要になったら別途）。

## Git workflow

- ブランチ: `advisor/012-storage-notice`（`dev` から分岐）
- コミット形式: `feat(prom): <subject>`。push・PR はユーザー指示があるまで行わない。

## Steps

### Step 1: StorageNotice コンポーネントを作成する

`web-next/components/prom/StorageNotice.tsx` を新規作成する。`usePromContext` の `navigate` で
`#/data` へ遷移するリンクボタンを持つ小さな注意書き（既存のクラス体系に合わせる）:

```tsx
"use client";

import { usePromContext } from "./PromContext";

/**
 * localStorage 保存に関する常設の注意喚起（監査所見 F4/F5）。
 * 健康データが端末に残ること・共有端末のリスク・消去導線を 1 箇所で案内する。
 */
export function StorageNotice() {
  const { navigate } = usePromContext();
  return (
    <p className="c-small c-muted" role="note">
      記録（頭痛日誌・PROM スコア）は通常この端末のブラウザに保存されます。
      Google Sheets への同期を実行した場合は、選択したデータが Google に送信されます。
      共有・公共の端末では利用を控えるか、利用後に{" "}
      <button type="button" className="c-link" onClick={() => navigate("#/data")}>
        データ管理
      </button>{" "}
      から「すべてのデータを削除」を実行してください。
    </p>
  );
}
```

> `c-link` クラスのボタンは `PromApp.tsx` 297 行に既存の使用例がある（同じ書式にする）。

**Verify**: `bun run typecheck` → exit 0

### Step 2: Dashboard に常設する

`web-next/components/prom/views/Dashboard.tsx` のビュー見出し（`c-viewhead`）直後に
`<StorageNotice />` を 1 箇所追加する（import を含め 2 行の追加に留める）。

**Verify**: `bun run typecheck && bun run test` → 全 pass

### Step 3: DataManager の説明文に端末残存の明示を足す

`DataManager.tsx` の画面説明文（213–216 行の `<p>`）の末尾に 1 文を追記する:

変更前（抜粋）: 「…データは外部に送信されません。」

変更後: 「…記録（頭痛日誌・PROM スコア）は通常この端末のブラウザに保存されます。Google Sheets への同期を実行した場合は、選択したデータが Google に送信されます。**共有端末では利用後に下の「すべてのデータを削除」を実行してください。**」

**Verify**: `bun run test` → 全 pass（DataManager.test.tsx が文言に依存して失敗した場合は
該当アサーションのみ新文言へ更新する）

### Step 4: テストを追加する

`web-next/components/prom/StorageNotice.test.tsx` を新規作成する
（`DataManager.test.tsx` の構造・レンダリング方法を手本にする）:

- 注意文（「通常、この端末のブラウザにのみ保存されます」）が表示される。
- 「データ管理」ボタンのクリックで `navigate` が `#/data` を引数に呼ばれる
  （PromContext をテスト用にモック／ラップする方法も DataManager.test.tsx に合わせる）。

**Verify**: `bun run test` → 全 pass（新規 2 件を含む）

### Step 5: 文書更新

`docs/publishing/04-security-policy.md` §6 チェックリストの
「localStorage 消去導線・注意喚起 UI を別プランとして起票した」を `[x]` 化し、
「実装済み: 消去導線は既存 `DataManager`、注意喚起は `StorageNotice`（本プラン）」と付記する。

**Verify**: `npx markdownlint-cli -c .markdownlint.json docs/publishing/04-security-policy.md` → エラー 0

## Test plan

- 新規: `StorageNotice.test.tsx` — 表示（正常系）と `navigate("#/data")` 呼び出し（操作系）の 2 件。
  AAA パターン、`DataManager.test.tsx` を構造の手本にする。
- 回帰: `bun run test` 全体（Dashboard への設置で既存 Dashboard テストが壊れないこと）。

## Done criteria

- [ ] `bun run typecheck` / `bun run test` / `bun run lint` / `bun run build` がすべて exit 0
- [ ] `/prom-checker` の Dashboard に注意喚起が常設表示される（`bun run dev` で目視確認）
- [ ] 注意喚起の「データ管理」からデータ管理画面（`#/data`）へ遷移できる
- [ ] `grep -rn "StorageNotice" web-next/components/prom/views/Dashboard.tsx` が 2 件（import と JSX）
- [ ] In scope 外のファイルに変更がない（`git status`）
- [ ] `plans/README.md` の Status 更新

## STOP conditions

- `Dashboard.tsx` に `c-viewhead` 構造が存在しない等、「Current state」の想定とビュー構造が
  大きく異なる場合。
- `PromContext` の `navigate` が `#/data` を受け付けない（ルート名が変わっている）場合 —
  `PromApp.tsx` の view 分岐を確認して報告する。
- 文言変更で `DataManager.test.tsx` 以外のテストが 3 件以上失敗する場合（想定外の文言依存）。

## Maintenance notes

- 注意喚起の文言は `plans/013`（プライバシーポリシー）の「保存場所・共有端末の注意」の記述と
  一貫させること。ポリシー側を変えたら本コンポーネントも見直す。
- 将来 IndexedDB や同期ストレージへ移行する場合（`StorageAdapter` の差し替え）、
  「この端末のブラウザにのみ保存され」の文言が正確でなくなるため、`StorageNotice` を必ず更新する。
- SNOOP ゲート（初回フロー）にも表示すべきかは UX 判断待ち — 本プランでは Dashboard のみとし、
  過剰な警告表示による注意疲れを避けた。
