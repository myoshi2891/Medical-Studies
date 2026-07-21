# Plan 010: MRI 画像の出典メタデータを manifest に組み込み、未確認時の公開除外フォールバックを実装する

> **Executor instructions**: 本プランは 2 フェーズ構成である。**Phase A（出典メタデータの器の実装）は
> 無条件で実行してよい**。**Phase B（公開除外）は「決定ゲート」の条件を満たした場合のみ実行する**。
> 各ステップの検証コマンドを実行し、期待結果を確認してから次へ進むこと。
> 「STOP conditions」該当時は停止して報告する。完了時に `plans/README.md` の Status を更新する。
>
> **Drift check (run first)**:
> `git diff --stat 6614b7c..HEAD -- web-next/lib/anatomy web-next/public/mri web-next/components/anatomy docs/publishing/03-mri-image-provenance.md`
> 差分がある場合は「Current state」の抜粋と実コードを突き合わせ、不一致なら STOP。

## Status

- **Priority**: P1（監査所見 F3 — 公開画像の権利未文書化）
- **Effort**: M（Phase A: S / Phase B: S）
- **Risk**: MED（Phase B は公開ページの表示内容が変わる）
- **Depends on**: なし（Phase B の判断入力は `docs/publishing/03-mri-image-provenance.md` §3 テンプレートの記入結果）
- **Category**: legal-compliance
- **Planned at**: commit `6614b7c`, 2026-07-09

## Why this matters

公開リポジトリは匿名化済み MRI 画像 16 枚（`web-next/public/mri/{brain,cervical}/*.png` 各 8 枚）を
再配布し `/anatomy` ページに表示しているが、**撮影者・提供元・利用許諾が一切記録されていない**。
PHI 匿名化（済）と著作権・利用許諾（未確認）は別問題であり、権利者が公開を許諾していなければ
再配布できない（`docs/publishing/03-mri-image-provenance.md`）。本プランは (A) 出典メタデータを
manifest スキーマに組み込んで「未確認」を機械可読にし、(B) 確認が取れないシリーズを
1 箇所の判定関数で公開から外せる構造を作る。

## 決定ゲート（Phase B の実行条件）

Phase B は次の**いずれか**が成立した場合のみ実行する。成立していなければ Phase A のみで完了とする。

1. `docs/publishing/03-mri-image-provenance.md` §3 のテンプレートに「許諾なし／確認不能」の結果が記録された。
2. リポジトリ管理者（ユーザー）が「確認完了まで公開から外す」と明示的に指示した。

## Current state

- `web-next/public/mri/manifest.json` — 出典宣言の正本。`schema` ブロックは
  `id` / `bodyPart` / `slices` / `note` のみで**出典・権利のフィールドがない**。`series` は
  brain / cervical の 2 件。冒頭 `note` に匿名化手順（`scripts/curate-mri.mjs`・`sanitizePng`）の記録あり。
- `web-next/lib/anatomy/types.ts` — `MriSeries`（33–39 行）:

  ```ts
  export interface MriSeries {
    id: string;
    bodyPart: "brain" | "cervical";
    /** public/mri 配下のスライス相対パス（順序＝スクラブ順）。 */
    slices: string[];
    note?: string;
  }
  ```

  検証は `assertMri`（100–117 行、unknown＋型ガードで絞り込み・不正時は理由付き Error）。
  `AnatomyStructure.mri` は **`MriSeries | null`**（56 行）— null 許容なので「MRI なし構造」は既にサポートされている。
- `web-next/lib/anatomy/manifest.ts` — TS 側の series 定義（`BRAIN_SERIES` 8–13 行、
  `CERVICAL_SERIES` 15–23 行）。6 構造（overview / nerves / vessels / brain / bones / muscles）が
  この 2 シリーズを再利用し、`validateManifest(STRUCTURES)` で fail-fast 検証（166 行）。
  **manifest.json と manifest.ts は二重管理**であり、変更時は両方を同期する必要がある。
- `web-next/lib/anatomy/manifest.test.ts`・`web-next/components/anatomy/MriSliceViewer.test.tsx` —
  既存テスト。テスト構造の手本にする。
- リポジトリ規約: `any` 禁止（unknown＋型ガード）。`assertMri` の書式に合わせて拡張する。

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

- `web-next/lib/anatomy/types.ts`（`MriProvenance` 型と検証の追加）
- `web-next/lib/anatomy/manifest.ts`（series への provenance 付与、Phase B ではゲート関数適用)
- `web-next/lib/anatomy/manifest.test.ts`（契約テスト追加）
- `web-next/public/mri/manifest.json`（schema と series への provenance 追記）
- `docs/publishing/03-mri-image-provenance.md`（チェックリスト更新）
- Phase B のみ: `web-next/public/mri/{brain,cervical}/*.png`（削除する場合）

**Out of scope**（触らない）:

- `web-next/components/anatomy/MriSliceViewer.tsx` — `mri: null` は既存の型で表現できるため
  ビューア側の変更は原則不要（null 時に非表示にならない場合のみ STOP して報告）。
- `web-next/scripts/curate-mri.mjs` — 生成スクリプトの変更は不要（`images/` ソースは gitignore 済み）。
- `web-next/lib/anatomy/search.ts` ほか anatomy の検索・用語機能。

## Git workflow

- ブランチ: `advisor/010-mri-provenance`（`dev` から分岐)
- コミット形式: Phase A は `feat(anatomy): <subject>`、Phase B は `fix(anatomy): <subject>`。
  push・PR はユーザー指示があるまで行わない。

## Steps

### Phase A — 出典メタデータの器（無条件で実行可）

#### Step A1: `MriProvenance` 型と検証を追加する

`web-next/lib/anatomy/types.ts` に追加する（`assertMri` の直前に配置）:

```ts
/** MRI シリーズの出典・権利状態。permission が granted / own 以外は公開可否未確定。 */
export interface MriProvenance {
  /** 元データの取得元（施設名・データセット名等）。未確認は "unverified"。 */
  source: string;
  /** 著作権者。未確認は "unverified"。 */
  copyrightHolder: string;
  /** 利用許諾: own=自己保有 / granted=許諾取得済 / unverified=未確認 / denied=許諾なし */
  permission: "own" | "granted" | "unverified" | "denied";
  /** 適用ライセンス（該当時のみ）。 */
  license?: string;
  /** 帰属表示文（必要な場合のみ）。 */
  attribution?: string;
  /** 確認日（ISO 8601）。未確認時は省略。 */
  verifiedAt?: string;
}
```

`MriSeries` へ `provenance?: MriProvenance;` を追加し、`assertMri` に検証を追加する
（既存の書式・エラーメッセージの文体に合わせる。`permission` は 4 値のいずれかであることを検証）。

**Verify**: `bun run typecheck` → exit 0

#### Step A2: manifest.json と manifest.ts に現状（unverified）を記録する

- `web-next/public/mri/manifest.json` の `schema` ブロックへ `provenance` の説明を追記し、
  brain / cervical 両 series へ以下を追加する:

  ```json
  "provenance": {
    "source": "unverified",
    "copyrightHolder": "unverified",
    "permission": "unverified"
  }
  ```

- `web-next/lib/anatomy/manifest.ts` の `BRAIN_SERIES` / `CERVICAL_SERIES` にも同内容を追加する
  （json と ts の二重管理を同期）。

**Verify**: `bun run typecheck && bun run test` → 全 pass

#### Step A3: 契約テストを追加する

`web-next/lib/anatomy/manifest.test.ts` に追加（既存テストの書式に合わせる）:

- 全構造の `mri.provenance` が定義されていること。
- `permission` が `"own" | "granted" | "unverified" | "denied"` のいずれかであること。
- `assertMri` が不正な `permission` 値で理由付き Error を投げること。

**Verify**: `bun run test` → 全 pass（新規テスト含む）

#### Step A4: 公開準備文書を更新する

`docs/publishing/03-mri-image-provenance.md` §5 チェックリストの
「確認結果を `manifest.json` / 本文書に記録した」の行へ「（器は実装済み — 値は照会後に更新）」を追記し、
「許諾不明の場合の対応（除外 or 差し替え）を別プランとして起票した」を `[x]` 化して本プランへの
参照 `plans/010-mri-provenance-manifest-and-fallback.md` を付記する。

**Verify**: `npx markdownlint-cli -c .markdownlint.json docs/publishing/03-mri-image-provenance.md` → エラー 0

Phase A はここで完了。コミットして `plans/README.md` の Status を
「Phase A DONE / Phase B 決定ゲート待ち」と更新する。

### Phase B — 公開除外フォールバック（決定ゲート成立時のみ）

#### Step B1: 公開可否ゲート関数を実装する

`web-next/lib/anatomy/manifest.ts` に純関数を追加し、構造定義の `mri:` に適用する:

```ts
/** 出典確認が済んでいないシリーズを公開対象から外す（F3 フォールバック）。 */
function displayableOrNull(series: MriSeries): MriSeries | null {
  const p = series.provenance;
  if (p && (p.permission === "own" || p.permission === "granted")) return series;
  return null;
}
```

6 構造すべての `mri: BRAIN_SERIES` / `mri: CERVICAL_SERIES` を
`mri: displayableOrNull(BRAIN_SERIES)` 等へ置き換える。`AnatomyStructure.mri` は元々
`MriSeries | null` なので型変更は不要。

**Verify**: `bun run typecheck && bun run test && bun run build` → すべて exit 0。
`/anatomy` ページで MRI ビューアが非表示（または「画像なし」状態）になることを
`bun run dev` で目視確認する。ビューアが null で壊れる場合は STOP。

#### Step B2: 配布自体を止める場合は画像ファイルを削除する

> 表示除外（Step B1）だけでは `public/mri/*.png` は**引き続き配信・リポジトリ配布される**。
> 権利者の許諾が「なし（denied）」と確定した場合はファイル削除まで行う:

- `web-next/public/mri/{brain,cervical}/` の該当 PNG を `git rm` する。
- `manifest.json` の該当 series の `slices` を空配列にし、`permission: "denied"` と経緯を `note` に記録する。
- `manifest.ts` も同期する（`slices: []`）。

**Verify**: `bun run test && bun run build` → exit 0。
`git status` で削除対象以外に変更がないこと。

> [!NOTE]
> 過去コミットの履歴には画像が残存する。履歴からの完全消去が必要な場合は
> `git filter-repo` による履歴書き換え（`plans/015` と同種の破壊的操作）を別途計画する — 本プランのスコープ外。

#### Step B3: 文書を更新する

`docs/publishing/03-mri-image-provenance.md` §3 の表に確認結果（または「denied → 除外済み」）を記入し、
§5 チェックリストを更新する。

**Verify**: `npx markdownlint-cli -c .markdownlint.json docs/publishing/03-mri-image-provenance.md` → エラー 0

## Test plan

- 新規テスト（Phase A・Step A3）: provenance の存在と permission 値域の契約、`assertMri` の異常系。
  `web-next/lib/anatomy/manifest.test.ts` の既存書式（AAA・日本語 it 名）を踏襲する。
- Phase B 実施時: `displayableOrNull` の単体テスト（own / granted → series を返す、
  unverified / denied / provenance なし → null）を追加。
- 実行: `bun run test` → 全 pass。

## Done criteria

Phase A（全チェック必須）:

- [ ] `bun run typecheck` / `bun run test` / `bun run lint` がすべて exit 0
- [ ] `web-next/public/mri/manifest.json` の両 series に `provenance` があり、`schema` に説明がある
- [ ] `grep -c "provenance" web-next/lib/anatomy/manifest.ts` が 2 以上
- [ ] `docs/publishing/03-mri-image-provenance.md` のチェックリストが更新されている
- [ ] In scope 外のファイルに変更がない（`git status`）

Phase B（決定ゲート成立時のみ追加）:

- [ ] permission が own / granted でないシリーズについて `/anatomy` に MRI が表示されない
- [ ] （denied 確定時）該当 PNG が `git rm` され、manifest の slices が空
- [ ] `bun run build` exit 0、`plans/README.md` の Status 更新

## STOP conditions

- `MriSliceViewer` が `mri: null` を想定しておらずクラッシュ・空白崩れする場合
  （ビューア修正は本プランのスコープ外 — 報告して指示を待つ）。
- `assertMri` の実装が「Current state」の抜粋（100–117 行）と大きく異なる場合。
- 出典確認の結果、一部スライスのみ許諾なしという**シリーズ内で権利が分かれる**事実が判明した場合
  （スライス単位の provenance 設計が必要になる — 本プランの schema では表現できない）。
- Phase B Step B2 で削除対象の画像が manifest 記載以外の場所から参照されていることが
  `grep -rn "/mri/" web-next/app web-next/components` で判明した場合。

## Maintenance notes

- 新しい MRI シリーズを追加する際は、`provenance` の記入（permission が own / granted であること）を
  必須とする — Step A3 の契約テストが「provenance なし」を検出する。
- 出典確認が完了したら `permission` / `verifiedAt` / `attribution` を更新し、
  帰属表示が必要な場合は `/anatomy` ページの ATTRIBUTION セクション
  （BodyParts3D 帰属の隣）へ追記すること。
- manifest.json（正本）と manifest.ts の二重管理は既知の構造的負債。将来 json を fetch して
  検証・使用する一本化を検討する場合、`validateManifest` がそのまま流用できる。
