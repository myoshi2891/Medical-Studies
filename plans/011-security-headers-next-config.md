# Plan 011: web-next にセキュリティヘッダ（CSP 含む）を段階導入する

> [!IMPORTANT]
> **本プランは 2026-08-11 に完了済み（Status: DONE / 残余リスク受入あり）。以下は実施記録である。**
> 立案時は Stage 3 を「nonce ベース CSP 強制（`middleware.ts` 新設）」として書いていたが、
> 実装・実ブラウザ検証の結果 **nonce/`'strict-dynamic'` は不採用**となり、`middleware.ts` は
> 導入後に撤去した。現行の実装は **`next.config.ts` による静的 CSP 付与**（CSP 文字列は
> `web-next/lib/security/csp.ts` の純粋関数 `buildContentSecurityPolicy(isDev)` が生成）。
> 廃止した nonce 手順は「実施済み・不採用の履歴」節へ移した — **現行手順として実行しないこと**。
>
> **Executor instructions（改訂後）**: 4 段階（Stage 1: 非 CSP ヘッダ → Stage 2: CSP Report-Only 計測 →
> Stage 3: 静的 CSP 強制 → Stage 4: 文書更新および完了時の plans/README.md の Status 更新）で進める。
> **Stage をまたいで一気に実装しない** — 各 Stage の検証（実ブラウザでの Google 連携動作確認を含む）を
> 通してから次へ進むこと。「STOP conditions」該当時は停止して報告する。
>
> **Drift check (run first)**:
> `git diff --stat 6614b7c..HEAD -- web-next/next.config.ts web-next/lib/security web-next/lib/export/google`
> `web-next/middleware.ts` が存在する場合は STOP（本設計では**存在しないこと**が正しい状態）。

## Status

- **Priority**: P1（監査所見 F4 — セキュリティヘッダ未設定）
- **Effort**: M
- **Risk**: MED〜HIGH（CSP の設定ミスは OAuth ログイン・Sheets 同期・3D 表示を無音で破壊する）
- **Depends on**: なし
- **Category**: security
- **Planned at**: commit `6614b7c`, 2026-07-09

## Why this matters

web-next は完全クライアント型（サーバ API・秘密情報なし）で、患者の健康データ（頭痛日誌・PROM スコア）を
`localStorage` に保持し、Google OAuth トークンをメモリ上で扱う。サーバがない分、**リスクはブラウザ内に
集中する**: XSS による localStorage / トークン窃取、クリックジャッキング、中間者攻撃。現状
`web-next/next.config.ts` にはヘッダ設定が一切なく、CSP・HSTS・X-Frame-Options 等の標準防御が
すべて欠落している（`docs/publishing/04-security-policy.md` §2–3）。

## Current state

- `web-next/next.config.ts` — 全 15 行。`reactStrictMode` と `turbopack.root` のみ:

  ```ts
  const nextConfig: NextConfig = {
    reactStrictMode: true,
    turbopack: {
      root: path.resolve(configDir, ".."),
    },
  };
  ```

- 外部接続先（CSP 許可リストの根拠 — 実コードから逆算済み）:
  - `web-next/lib/export/google/gis.ts:9` — `const GIS_SRC = "https://accounts.google.com/gsi/client";`
    （GIS スクリプトを `document.createElement("script")` で**動的に**読み込む。10–37 行）
  - `web-next/lib/export/google/sheetsClient.ts:9` — `const BASE = "https://sheets.googleapis.com/v4/spreadsheets";`（fetch 接続先）
  - `web-next/lib/export/google/googleSheetsExporter.ts:71` — `https://docs.google.com/spreadsheets/d/`
    は `<a href>` の遷移先のみ（CSP の対象外）
- フォントは `next/font`（`web-next/lib/fonts.ts` の inter / outfit）でビルド時に自己ホスト化される —
  外部フォントドメインの許可は不要。
- Mermaid は npm 依存としてバンドルされる（CDN 読み込みなし）。`@google/model-viewer` は
  3D 表示に blob / wasm を使う可能性がある（Stage 2 の計測で確定させる）。
- デプロイ想定は Node ランタイム（`next start` / Vercel 系）。`output: "export"`（静的エクスポート）は
  使っていない — `next.config.ts` の `headers()` が有効に働く前提が成立する。

## Commands you will need

| Purpose | Command（`web-next/` で実行） | Expected on success |
|---|---|---|
| Install | `bun install --frozen-lockfile` | exit 0 |
| Typecheck | `bun run typecheck` | exit 0 |
| Tests | `bun run test` | 全 pass |
| Build | `bun run build` | exit 0 |
| 本番相当起動 | `bun run build && bun run start` | localhost:3000 で応答 |
| ヘッダ確認 | `curl -sI http://localhost:3000 \| grep -i -E "strict-transport\|x-frame\|x-content\|referrer\|permissions\|content-security"` | 設定したヘッダが表示される |

## Scope

**In scope**（変更してよいファイル）:

- `web-next/next.config.ts`（`headers()` の追加）
- `web-next/lib/security/csp.ts` + `csp.test.ts`（CSP 文字列生成の純粋関数と契約テスト。Stage 3 で新設）
- `docs/publishing/04-security-policy.md`（チェックリスト・検証結果の追記）

> `web-next/middleware.ts` は当初 Stage 3 の In scope だったが、nonce 方式の不採用に伴い
> **撤去済み・再新設しない**（理由は冒頭の IMPORTANT と「実施済み・不採用の履歴」節）。

**Out of scope**（触らない）:

- `web-next/lib/export/google/**` — Google 連携の実装。CSP 側を連携に合わせる（逆ではない）。
- `SECURITY.md`・脆弱性開示方針 — 整備済み。
- ホスティング層のヘッダ設定（Vercel ダッシュボード等）— 本プランはアプリ層で完結させる。
- `localStorage` の注意喚起 UI — `plans/012-localstorage-notice-and-clear-ui.md` が担当。

## Git workflow

- ブランチ: `advisor/011-security-headers`（`dev` から分岐）
- コミット: Stage 1〜3 は `feat(security): <subject>`、Stage 4 は `docs(security): <subject>`。
  push・PR はユーザー指示があるまで行わない。

## Steps

### Stage 1: 非 CSP セキュリティヘッダを追加する（即時強制で安全）

`web-next/next.config.ts` へ `headers()` を追加する（既存設定は温存）:

```ts
const securityHeaders = [
  // HTTPS 固定（2 年）。preload 登録は HTTPS 運用が安定してから別途判断する。
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains" },
  // クリックジャッキング防止（CSP frame-ancestors 非対応ブラウザ向けの保険）
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  // 使用しない高権限 API を全面禁止
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), payment=()" },
];

const nextConfig: NextConfig = {
  reactStrictMode: true,
  turbopack: {
    root: path.resolve(configDir, ".."),
  },
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
};
```

**Verify**:

1. `bun run typecheck && bun run test && bun run build` → exit 0
2. `bun run start` を起動し、`curl -sI http://localhost:3000 | grep -ci -E "strict-transport|x-frame|x-content|referrer|permissions"` → `5`

### Stage 2: CSP を Report-Only で計測する

同じ `next.config.ts` に **`Content-Security-Policy-Report-Only`** を追加する（強制しない）。
`docs/publishing/04-security-policy.md` §3 の CSP 骨子を、実コードの接続先で具体化した初期値:

```ts
const cspReportOnly = [
  "default-src 'self'",
  "script-src 'self' https://accounts.google.com",
  "connect-src 'self' https://sheets.googleapis.com https://accounts.google.com",
  "frame-src https://accounts.google.com",
  "img-src 'self' data: blob:",
  "style-src 'self' 'unsafe-inline'",
  "font-src 'self'",
  "worker-src 'self' blob:",
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "form-action 'self'",
].join("; ");
// securityHeaders へ追加:
// { key: "Content-Security-Policy-Report-Only", value: cspReportOnly },
```

**Verify（実地計測 — 全ルートを実際に操作する）**: `bun run build && bun run start` のうえ、
ブラウザ DevTools コンソールで CSP violation 報告（`[Report Only]` 表示）を記録しながら以下を巡回する:

1. `/`（トップ）と `/prom-checker`（SNOOP ゲート → HIT-6 入力 → スコア保存まで）
2. `/anatomy` — 3D モデル表示（5 構造切替）と MRI スライスビューア操作
3. `/prom-checker` のデータ管理 → **「Google と接続」→ OAuth ポップアップ → 「スプレッドシートへ同期」**
   （`NEXT_PUBLIC_GOOGLE_CLIENT_ID` を `.env.local` に設定して実施。実 Google アカウントで確認）
4. Mermaid 図のある教育ページ（例: `/prom/headache-impact-test`）

観測された violation は以下の判断表で処理し、結果を `docs/publishing/04-security-policy.md` へ追記する:

| violation | 対応 |
|---|---|
| Next.js の inline script（hydration/flight data） | 想定内。**Stage 3 の実測により `script-src 'unsafe-inline'` で許容すると決定**（静的プリレンダと nonce が両立しないため。残余リスクは受入済み — `docs/publishing/04-security-policy.md` §3「残余リスクの受入記録」） |
| `blob:`/`wasm-unsafe-eval`（model-viewer / Draco） | `worker-src blob:` で不足なら `script-src` へ `'wasm-unsafe-eval'` を追加（wasm のみ許可。`'unsafe-eval'` は不可） |
| `https://accounts.google.com` 配下の別パス | `script-src` / `frame-src` は**オリジン単位**の指定なので追加不要のはず。発生したら記録して STOP |
| 上記以外の未知の外部ドメイン | **STOP**（想定外の外部依存 — 出所を特定して報告） |

### Stage 3: 静的 CSP を強制する（`next.config.ts` + `lib/security/csp.ts`）

CSP 文字列の組み立てを純粋関数 `buildContentSecurityPolicy(isDev)` へ分離し
（`web-next/lib/security/csp.ts`）、`next.config.ts` の `headers()` から
`Content-Security-Policy`（強制モード）として全パスへ静的付与する。
`middleware.ts` は**作らない** — 全ページが静的プリレンダ（`○ Static`）のため per-request nonce を
HTML に焼き込めず、nonce ベース CSP は機能しない（実測済み。下記「実施済み・不採用の履歴」参照）。

```ts
// next.config.ts（抜粋）
import { buildContentSecurityPolicy } from "./lib/security/csp";

const isDev = process.env.NODE_ENV !== "production";
const cspEnforced = buildContentSecurityPolicy(isDev);
// securityHeaders へ追加: { key: "Content-Security-Policy", value: cspEnforced }
```

`buildContentSecurityPolicy(isDev)` が満たすべき不変条件（`lib/security/csp.test.ts` で固定する）:

- `script-src` に `'unsafe-eval'` を含むのは **`isDev === true` のときのみ**（本番ビルドには含めない）
- `'wasm-unsafe-eval'` は dev / prod 双方に含む（`/anatomy` の DRACO デコーダ用）
- `script-src` の `'unsafe-inline'` は静的プリレンダ維持のため**意図的に含む**
- 外部ホスト許可は `accounts.google.com` のみ。`cdnjs` / `gstatic` 等が混入しないことを
  negative assertion で検知する

作業手順:

- Stage 2 で追加した `Content-Security-Policy-Report-Only` を `next.config.ts` から削除し、
  `Content-Security-Policy`（強制）へ置き換える（非 CSP ヘッダは `next.config.ts` に残す）。
- Stage 2 の計測で確定した追加ディレクティブ（`'wasm-unsafe-eval'` 等）を反映する。

**Verify**:

1. `bun run typecheck && bun run test && bun run lint && bun run build` → すべて exit 0
2. `bun run build` の出力で**全ページが `○ Static`（静的プリレンダ）を維持**していること
   （Next.js 16.2.11 で確認済み。動的 SSR へ転落していたら CSP 設計の前提が崩れるため STOP）
3. `bun run start`（本番ビルド）で Stage 2 と同じ 4 巡回を再実施 — violation が **0 件**かつ全機能動作
   （特に Google 接続 → 同期の成功、3D / MRI / Mermaid の表示）
4. `curl -sI http://localhost:3000 | grep -i content-security-policy` → `Content-Security-Policy` が
   1 行返り、`script-src 'self' 'unsafe-inline' 'wasm-unsafe-eval' https://accounts.google.com` を含む。
   **`'unsafe-eval'` と `nonce-` を含まない**こと
5. `bun run dev` の同ヘッダには `'unsafe-eval'` が**含まれる**こと（dev のみの分岐が効いている確認）

**実測結果（2026-08-11 / Next.js 16.2.11 / HEAD `c89e701` 時点）**: 上記 1〜5 すべて充足。
本番ヘッダの実値は `docs/publishing/04-security-policy.md` §3「最終的に強制している CSP」と一致する。

### 実施済み・不採用の履歴: nonce / `'strict-dynamic'` / `middleware.ts`

> [!WARNING]
> **以下は実施したうえで棄却した設計であり、現行手順ではない。再実装しないこと。**

当初 Stage 3 は `web-next/middleware.ts` を新設し、リクエストごとの nonce で CSP を強制する
（`script-src 'nonce-${nonce}' 'strict-dynamic' https://accounts.google.com`）設計だった。
`'strict-dynamic'` により、信頼済みスクリプトが動的生成する `<script>`（= `gis.ts` の GIS 読み込み）へ
信頼が伝播することを狙っていた。

**棄却理由（実ブラウザ検証で判明）**: web-next は全ページを静的プリレンダするため、Next.js は
静的シェルをリクエスト毎に再レンダしない。結果、middleware が発行した nonce は HTML の
`<script>` に焼き込まれず、Next.js の inline bootstrap script が全ブロックされて**ページが描画されなかった**
（`/anatomy`・`/prom-checker` が「読み込み中…」で停止）。nonce を機能させるには全ページの動的 SSR 化が必要で、
静的最適化・CDN キャッシュを全放棄するトレードオフになる。

**採用した代替**: `script-src 'unsafe-inline'` を許容し静的最適化を維持する。残存 XSS リスクの評価・
代替統制・再評価条件は `docs/publishing/04-security-policy.md` §3「残余リスクの受入記録」に確定済み。
`middleware.ts` は撤去し、CSP は `next.config.ts` の静的付与に一本化した。

### Stage 4: 文書更新

`docs/publishing/04-security-policy.md` §6 チェックリストの
「`next.config.ts` へのヘッダ付与を別プランとして起票した」「CSP 骨子を実 Google 連携で検証した」を
`[x]` 化し、最終的な CSP 全文と計測記録（Stage 2 の判断表の結果）を §3 の後ろに追記する。

**Verify**: `npx markdownlint-cli -c .markdownlint.json docs/publishing/04-security-policy.md` → エラー 0

## Test plan

- `headers()` の配線自体はフレームワーク設定のため単体テストを持たない（出力検証は Next のビルドに委ねる）。
  一方、**CSP 文字列の不変条件は `web-next/lib/security/csp.test.ts` で機械的に固定する**
  （`buildContentSecurityPolicy(isDev)` を純粋関数に分離したのはこのため）。検証項目は Stage 3 に列挙した
  4 つの不変条件 — 本番の `'unsafe-eval'` 不在 / dev のみ付与、`'wasm-unsafe-eval'` の常時付与、
  `'unsafe-inline'` の意図的許容、外部ホストが `accounts.google.com` のみ（`cdnjs`・`gstatic` の negative assertion）。
- 既存テストの回帰なし（`bun run test` 全 pass）を各 Stage で確認する。
- 実効性（実際にブラウザがブロックしないか）の検証は Stage 2 / 3 の**実ブラウザ巡回チェックリスト**が担う
  （機械化は `plans/014` の CI 移行後に検討）。

## Done criteria

> [!NOTE]
> 受入基準 1・2（ヘッダ一式の付与と `script-src` の中身）は当初 nonce 方式を前提に
> 「`script-src` に `'nonce-` を含み `'unsafe-inline'` を含まないこと」と書かれていた。Stage 3 で
> **nonce は全ページ静的プリレンダと両立しない**ことが実証され静的維持型 CSP を採用したため、
> 採用設計に合わせて下記のとおり訂正した（2026-08-11）。判定はすべて Next.js 16.2.11 の
> `bun run build` 出力と `next start` 実行時ヘッダで実測している。

- [x] **(1)** `curl -sI http://localhost:3000` に HSTS / XFO / nosniff / Referrer-Policy /
      Permissions-Policy / Content-Security-Policy がすべて含まれる（計 6 ヘッダ）
- [x] **(2)** 本番（`next start`）の `Content-Security-Policy` が
      `script-src 'self' 'unsafe-inline' 'wasm-unsafe-eval' https://accounts.google.com` であること。
      すなわち **`'unsafe-eval'` と `'nonce-` を含まず**、`'wasm-unsafe-eval'` は DRACO 用に含み、
      外部ホスト許可は `accounts.google.com` のみ（cdnjs は未使用のため除去）。
      `'unsafe-inline'` は静的プリレンダ維持のため意図的に許容し、残余リスクは受入済み — 根拠は
      `docs/publishing/04-security-policy.md` §3「残余リスクの受入記録」
- [x] **(3)** `bun run dev` の同ヘッダには `'unsafe-eval'` が含まれる（dev 分岐が効いている）
- [x] **(4)** `bun run build`（Next.js 16.2.11）で**全ページが `○ Static` を維持**し、動的 SSR へ
      転落していない（静的維持型 CSP の前提条件）
- [x] **(5)** `web-next/middleware.ts` が存在しない（nonce 方式の残骸が無い）
- [x] **(6)** Google 接続 → Sheets 同期が実アカウントで成功する（Stage 3 Verify 3）
- [x] **(7)** `/anatomy` の 3D・MRI、Mermaid 図が表示され、CSP violation 0 件（Stage 3 Verify 3）
- [x] **(8)** `bun run typecheck` / `bun run test` / `bun run lint` / `bun run build` すべて exit 0
- [x] **(9)** `lib/security/csp.test.ts` が Stage 3 の 4 つの不変条件を固定している
- [x] **(10)** `docs/publishing/04-security-policy.md` に最終 CSP・検証記録・残余リスク受入が追記されている
- [x] **(11)** `plans/README.md` の Status 更新（残余リスク受入済みである旨を含む）

## STOP conditions

- Stage 2 で**未知の外部ドメイン**への violation が観測された場合（想定外の依存 = 調査が先）。
- Stage 3 で GIS の OAuth ポップアップが開かない・トークン取得に失敗する状態が、
  ディレクティブ調整 2 回で解消しない場合（`script-src` / `frame-src` / `connect-src` の
  オリジン許可と GIS の実挙動の突き合わせが必要）。
- `bun run build` の出力で**いずれかのページが `○ Static` を失った**場合（静的維持型 CSP の前提が崩れる。
  ホスティング層ヘッダへの移行か nonce 方式への回帰かの設計判断が要る — 独断で進めない）。
- `web-next/middleware.ts` が存在する／新設されようとしている場合（nonce 方式は棄却済み。
  「実施済み・不採用の履歴」節を読み、再実装しないこと）。
- デプロイ先が静的エクスポート（`output: "export"`）へ変更されていた場合
  （`headers()` は無効 — ホスティング層で付与する別設計になる）。

## Maintenance notes

- **Google が連携ドメインを追加した場合**（例: 新しい gstatic 系）、同期が無音で失敗し始める。
  障害時はまず DevTools の CSP violation を確認するのが一次切り分け。
- 新しい外部サービス・CDN・フォントを追加する変更は、必ず本 CSP の許可リスト更新とセットで
  レビューすること。
- `style-src 'unsafe-inline'` は Tailwind / インラインスタイル併用の暫定許容。将来の厳格化
  （style の nonce 化）は、`script-src` と同じく全ページ動的 SSR 化を伴うため、静的維持方針を
  変更する場合にのみ検討対象となる（改善候補として残す）。
- HSTS の `preload` ディレクティブと preload リスト登録は、独自ドメインでの HTTPS 運用が
  安定した後に別途判断する（登録は事実上不可逆）。
