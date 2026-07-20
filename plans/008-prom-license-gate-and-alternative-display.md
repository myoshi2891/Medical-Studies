# Plan 008: PROM 質問票に権利確認ゲートを実装し、許諾不可時の代替表示へ切替可能にする

> **Executor instructions**: 本プランは 2 フェーズ構成である。**Phase A（メタデータ整備）は無条件で実行してよい**が、
> **Phase B（質問文レダクション）は「決定ゲート」の条件を満たした場合のみ実行する**。
> 各ステップの検証コマンドを実行し、期待結果を確認してから次へ進むこと。
> 「STOP conditions」該当時は即座に停止して報告する（自己判断で回避しない）。
> 完了時に `plans/README.md` の自分の行の Status を更新する。
>
> **Drift check (run first)**:
> `git diff --stat 6614b7c..HEAD -- web-next/lib/prom web-next/components/prom web-next/app/prom prom-checker/index.html`
> 差分がある場合は「Current state」の抜粋と実コードを突き合わせ、不一致なら STOP。

## Status

- **Priority**: P0（監査所見 F1 — 進行中の法的露出）
- **Effort**: M（Phase A: S / Phase B: M）
- **Risk**: MED（Phase B は表示挙動の変更。スコアリングロジックは不変）
- **Depends on**: なし（ただし Phase B は権利者照会の結果待ち — 下記「決定ゲート」）
- **Category**: legal-compliance / security
- **Planned at**: commit `6614b7c`, 2026-07-09

## Why this matters

本リポジトリは GitHub 上で PUBLIC 公開済みであり、著作権保護された PROM 質問票 2 種
（HIT-6 = QualityMetric 社、MSQ v2.1 = Mapi Research Trust）の**質問文全文**が
`web-next/lib/prom/registry.ts` に掲載・レンダリングされている。コード自身の `license` フィールドが
「商用利用は要許諾」「事前の書面による許諾が必須」と明記しており、権利者からの削除要請（DMCA）・
利用停止・損害賠償のリスクが現在進行形で存在する（`docs/publishing/01-urgent-exposure.md` F1）。
本プランは (A) 権利状態をコードで機械判別可能にし、(B) 許諾が得られない場合に質問文を
「概要＋公式取得先リンク＋帰属表示」へ**データ差し替えだけで**切替できる構造を作る。

## 決定ゲート（Phase B の実行条件）

Phase B は次の**いずれか**が成立した場合のみ実行する。成立していなければ Phase A のみで完了とする。

1. 権利者（QualityMetric / Mapi Research Trust）から「現在の公開態様は許諾範囲外」との回答が記録された。
2. リポジトリ管理者（ユーザー）が「照会結果を待たずにレダクションする」と明示的に指示した。

判断の記録先: `docs/publishing/01-urgent-exposure.md` のチェックリスト（照会結果を追記して更新する）。

## Current state

- `web-next/lib/prom/registry.ts` — 宣言的レジストリ（質問票＝データ）。380 行。
  - HIT-6 は `items` 6 件（22–44 行）に質問文全文。`license` は 87–91 行:

    ```ts
    license: {
      holder: "QualityMetric Incorporated（© 2001, 2015）",
      note: "学術利用は可、商用利用は要許諾。日本語版は検証済み（Sakai 2004）。",
      source: "ICHD-3 / QualityMetric",
    },
    ```

  - MSQ v2.1 は `items` 14 件（157–172 行）に質問文全文。`license` は 220–224 行:

    ```ts
    license: {
      holder: "Mapi Research Trust（専有）",
      note: "事前の書面による許諾が必須（eprovide.mapi-trust.org）。ePRO版は検証済み（Speck 2019/2021）。公開配布時は許諾状況に注意。",
      source: "Mapi Research Trust",
    },
    ```

- `web-next/lib/prom/types.ts` — `License` インターフェースは 74–78 行:

  ```ts
  export interface License {
    holder: string;
    note: string;
    source: string;
  }
  ```

  `Instrument`（86–105 行）は `items: Item[]` 必須・`license: License` 必須。

- `web-next/lib/prom/registry.test.ts` — 契約テストは**件数のみ**を検証しており、質問文の文字列には
  依存しない（例: `expect(REGISTRY.hit6.items).toHaveLength(6)`）。→ ラベル差し替えではテストは壊れない。
- `web-next/components/prom/views/PromForm.tsx` — SPA の質問票フォーム。`REGISTRY` の `items` /
  `responseOptions` をレンダリングする（Phase B で表示分岐を入れる対象）。
- `web-next/app/prom/**/page.tsx` — 尺度別の静的教育ページ（6 ルート）。ページ本文に質問文を
  引用している可能性がある（Phase B のステップ 5 で grep して特定する）。
- `prom-checker/index.html` — 旧スタンドアロン SPA。同一の REGISTRY 定義をインラインで保持する。
- `THIRD_PARTY_NOTICES.md` §2 — PROM 尺度の権利者一覧表。許諾状況の変化を反映する集約台帳。
- リポジトリ規約: `any` 禁止（`unknown`＋型ガード）、Result 型、`const` 既定。コメントは日本語。
  例示は `web-next/lib/prom/storage.ts` の型ガード群（25–28 行）を参照。

## Commands you will need

| Purpose | Command（`web-next/` で実行） | Expected on success |
|---|---|---|
| Install | `bun install --frozen-lockfile` | exit 0 |
| Typecheck | `bun run typecheck` | exit 0 |
| Tests | `bun run test` | 全テスト pass |
| Lint | `bun run lint` | exit 0 |
| Build | `bun run build` | exit 0 |

## Scope

**In scope**（変更してよいファイル）:

- `web-next/lib/prom/types.ts`（`License` 拡張）
- `web-next/lib/prom/registry.ts`（license メタデータ追記。Phase B ではラベル差し替え）
- `web-next/lib/prom/registry.test.ts`（Phase A の status フィールド契約テスト追加）
- `web-next/components/prom/views/PromForm.tsx`（Phase B の表示分岐のみ）
- `web-next/app/prom/headache-impact-test/page.tsx`・`web-next/app/prom/migraine-specific-quality-of-life/page.tsx`（Phase B の質問文引用の差し替えのみ）
- `prom-checker/index.html`（Phase B の同等レダクションのみ）
- `THIRD_PARTY_NOTICES.md` §2（許諾状況の反映）
- `docs/publishing/01-urgent-exposure.md`（チェックリスト更新のみ）

**Out of scope**（触らない）:

- `web-next/lib/prom/scoring.ts` — スコアリングアルゴリズムは一般的知識であり著作権レダクションの対象外。変更禁止。
- `web-next/lib/prom/storage.ts`・`upsert.ts`・`datetime.ts` — 無関係。
- MIDAS / PGIC / NRS / VAS の質問・定義 — F1 の対象は HIT-6 と MSQ v2.1 のみ（他尺度は別途評価）。
- `web-next/lib/export/**` — エクスポート列は instrumentId とスコア値のみで質問文を含まない。

## Git workflow

- ブランチ: `advisor/008-prom-license-gate`（`dev` から分岐）
- コミット形式: `feat(prom): <subject>` / `docs(publishing): <subject>`（`<type>(<scope>): <subject>` 規約）
- Phase A と Phase B は**別コミット**にする。push・PR はユーザー指示があるまで行わない。

## Steps

### Phase A — 権利状態メタデータの整備（無条件で実行可）

#### Step A1: `License` 型に権利状態フィールドを追加する

`web-next/lib/prom/types.ts` の `License`（74–78 行）へ optional フィールドを追加する:

```ts
/** 権利確認の状態。verified=許諾確認済み / pending=照会中 / denied=許諾不可（レダクション対象） */
export type LicenseStatus = "verified" | "pending" | "denied";

export interface License {
  holder: string;
  note: string;
  source: string;
  /** 権利確認の状態（未設定は verified 相当の既存挙動）。 */
  status?: LicenseStatus;
  /** 公式取得先 URL（レダクション時に案内する）。 */
  officialUrl?: string;
}
```

optional のため既存の全 license 定義はそのままコンパイルが通る。

**Verify**: `bun run typecheck` → exit 0

#### Step A2: HIT-6 / MSQ v2.1 の license に状態と公式取得先を追記する

`web-next/lib/prom/registry.ts` にて:

- `hit6.license` へ `status: "pending"` と `officialUrl: "https://www.qualitymetric.com/"` を追加。
- `"msq-v2.1".license` へ `status: "pending"` と `officialUrl: "https://eprovide.mapi-trust.org/"` を追加。
- `midas` / `pgic` / `PAIN_SCALES.nrs` / `PAIN_SCALES.vas` の license には**現時点で status を付けない**
  （F1 対象外。付与は各尺度の確認完了後に別途行う）。

**Verify**: `bun run typecheck && bun run test` → 全 pass（契約テストは件数のみなので影響なし）

#### Step A3: 契約テストに権利状態の固定を追加する

`web-next/lib/prom/registry.test.ts` の `describe("REGISTRY: 収録尺度")` 内へ追加（既存テストの
書式に合わせる）:

```ts
it("権利確認状態: HIT-6 / MSQ v2.1 は status を持つ（F1 管理対象）", () => {
  expect(REGISTRY.hit6.license.status).toBeDefined();
  expect(REGISTRY["msq-v2.1"].license.status).toBeDefined();
});
```

**Verify**: `bun run test` → 全 pass（新規 1 件を含む）

#### Step A4: 集約台帳へ状態を反映する

`THIRD_PARTY_NOTICES.md` §2 の表へ「確認状態」列を追加し、HIT-6 / MSQ v2.1 を「照会中（pending）」、
他を「未評価」と記録する。照会が済んだらこの表と registry の `status` を同時に更新する運用を
表の直後に 1 行で注記する。

**Verify**: `npx markdownlint-cli -c .markdownlint.json THIRD_PARTY_NOTICES.md` → エラー 0

Phase A はここで完了。コミットして `plans/README.md` の Status を
「Phase A DONE / Phase B 決定ゲート待ち」と更新する。

### Phase B — 質問文レダクション（決定ゲート成立時のみ）

#### Step B1: registry の質問文・回答選択肢ラベルを中立文へ差し替える

対象尺度（denied となった尺度のみ。以下 HIT-6 の例）:

- `license.status` を `"denied"` へ変更。
- `items[].label` を中立ラベルへ差し替える。**配列の件数・`id` は変更しない**（契約テスト・
  スコアリング・保存済みデータとの互換を維持）:

  ```ts
  items: [
    { id: "q1", label: "設問1（質問原文は公式配布元から入手してください）" },
    { id: "q2", label: "設問2（同上）" },
    // ... q6 まで同形式
  ],
  ```

- `responseOptions[].label` も同様に中立化する（`value` は変更しない）:

  ```ts
  responseOptions: [
    { label: "選択肢1", value: 6 },
    { label: "選択肢2", value: 8 },
    // ...
  ],
  ```

- `summary` は著作物の複製ではない自作の概要説明なので温存してよい。

**Verify**: `bun run test` → 全 pass（件数契約は不変）

#### Step B2: PromForm に権利ゲートの表示分岐を入れる

`web-next/components/prom/views/PromForm.tsx` にて、対象尺度の描画前に分岐を追加する。
`instrument.license.status === "denied"` の場合、質問フォームの代わりに案内カードを表示する
（既存の `c-card` / `c-alert` クラスと Toast の文体に合わせる）:

- 表示内容: 尺度の `summary`、「質問票原文は著作権保護のため本アプリには収載していません」、
  `license.officialUrl` への外部リンク（`rel="noopener noreferrer"`）、`license.holder` の帰属表示。
- 過去スコアの閲覧（Dashboard / ReportView）は変更しない — 記録済みデータは数値のみで質問文を含まない。

**Verify**: `bun run typecheck && bun run test && bun run build` → すべて exit 0

#### Step B3: 静的教育ページから逐語引用を除去する

まず逐語引用の所在を機械的に特定する:

```bash
grep -rn "ひどい痛みを感じる\|横になりたくなる\|仕事や日常の活動を中断" web-next/app/prom prom-checker/index.html
```

ヒットした箇所を「尺度の構成概要（設問数・回答形式・ドメイン構成）＋公式取得先リンク＋帰属」へ
書き換える。スコアリング方法・解釈バンド・MCID の解説は一般的知識なので温存する。

**Verify**: 上記 grep → 0 件

#### Step B4: prom-checker/index.html の同等レダクション

`prom-checker/index.html` 内のインライン REGISTRY 定義（HIT-6 / MSQ セクション）に Step B1 と
同一の差し替えを適用する。ファイルが巨大なため、`REGISTRY` オブジェクト定義部のみを編集し、
他のセクションに触れない。

**Verify**: Step B3 の grep を `prom-checker/index.html` に対して再実行 → 0 件

#### Step B5: 文書更新

- `docs/publishing/01-urgent-exposure.md` のチェックリスト該当項目を `[x]` 化し、実施日を追記。
- `THIRD_PARTY_NOTICES.md` §2 の確認状態を「許諾不可 → レダクション済み」へ更新。

**Verify**: `npx markdownlint-cli -c .markdownlint.json docs/publishing/01-urgent-exposure.md THIRD_PARTY_NOTICES.md` → エラー 0

## Test plan

- 新規テスト: Step A3 の権利状態契約テスト（`registry.test.ts`）。
- Phase B 実施時: `PromForm` の分岐テストを `web-next/components/prom/views/DataManager.test.tsx` を
  構造の手本に追加する — `status: "denied"` の尺度で案内カードが表示され、質問フォームが
  レンダリングされないこと／`status` 未設定の尺度（MIDAS 等）は従来どおり表示されること。
- 実行: `bun run test` → 全 pass。

## Done criteria

Phase A（全チェック必須）:

- [ ] `bun run typecheck` / `bun run test` / `bun run lint` がすべて exit 0
- [ ] `REGISTRY.hit6.license.status` と `REGISTRY["msq-v2.1"].license.status` が定義済み
- [ ] `THIRD_PARTY_NOTICES.md` §2 に確認状態列がある
- [ ] In scope 外のファイルに変更がない（`git status` で確認）

Phase B（決定ゲート成立時のみ追加）:

- [ ] Step B3 の grep が web-next/app/prom・prom-checker/index.html で 0 件
- [ ] `bun run build` exit 0
- [ ] `plans/README.md` の Status 更新

## STOP conditions

以下の場合は停止して報告する（改変を続けない）:

- 権利者回答が「許諾範囲内」だった場合 — Phase B は不要。Phase A の status を `"verified"` に
  更新して終了する（レダクションしない）。
- `registry.test.ts` に質問文の文字列そのものを検証するテストが追加されていた場合
  （本プラン執筆時点では件数のみ）。
- `PromForm.tsx` の構造が「Current state」の想定（REGISTRY の items をレンダリング）と大きく
  異なる場合。
- 保存済み `ScoreRecord` が質問文ラベルを含む形式へ変わっていた場合（互換性破壊の恐れ）。

## Maintenance notes

- 新しい尺度を registry へ追加する際は、`license.status` の設定と `THIRD_PARTY_NOTICES.md` §2 への
  行追加を必ずセットで行うこと（レビュー観点）。
- 権利者から許諾が得られた場合は `status: "verified"` へ変更するだけで通常表示へ戻る
  （Phase B 実施後は items のラベル復元も必要になるため、レダクション前のラベルは git 履歴で参照する）。
- 公開リポジトリの git 履歴には過去コミットの質問文全文が残存する。完全消去が必要と判断された場合は
  履歴書き換え（`plans/015-git-history-author-email-rewrite.md` と同じ `git filter-repo` 系の手順）を
  別途計画すること — 本プランのスコープ外。
