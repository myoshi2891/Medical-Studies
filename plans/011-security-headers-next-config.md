# Plan 011: web-next にセキュリティヘッダ（CSP 含む）を段階導入する

> **Executor instructions**: 4 段階（Stage 1: 非 CSP ヘッダ → Stage 2: CSP Report-Only 計測 →
> Stage 3: nonce ベース CSP 強制 → Stage 4: 文書更新および完了時の plans/README.md の Status 更新）で進める。**Stage をまたいで一気に実装しない** — 各 Stage の
> 検証（実ブラウザでの Google 連携動作確認を含む）を通してから次へ進むこと。
> 「STOP conditions」該当時は停止して報告する。
>
> **Drift check (run first)**:
> `git diff --stat 6614b7c..HEAD -- web-next/next.config.ts web-next/middleware.ts web-next/lib/export/google`
> `web-next/middleware.ts` が既に存在する場合は STOP（本プランは新設を前提とする）。

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
  使っていない — `headers()` と middleware が有効に働く前提が成立する。

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
- `web-next/middleware.ts`（Stage 3 で新規作成）
- `docs/publishing/04-security-policy.md`（チェックリスト・検証結果の追記）

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
| Next.js の inline script（hydration/flight data） | 想定内。Stage 3 の nonce で解決する（許可リストに `'unsafe-inline'` を**足さない**） |
| `blob:`/`wasm-unsafe-eval`（model-viewer / Draco） | `worker-src blob:` で不足なら `script-src` へ `'wasm-unsafe-eval'` を追加（wasm のみ許可。`'unsafe-eval'` は不可） |
| `https://accounts.google.com` 配下の別パス | `script-src` / `frame-src` は**オリジン単位**の指定なので追加不要のはず。発生したら記録して STOP |
| 上記以外の未知の外部ドメイン | **STOP**（想定外の外部依存 — 出所を特定して報告） |

### Stage 3: nonce ベースの CSP を強制する

`web-next/middleware.ts` を新規作成し、リクエストごとの nonce で CSP を強制モードへ切り替える
（Next.js 公式の CSP ガイドのパターン）。`'strict-dynamic'` により、信頼済みスクリプトが
動的生成する `<script>`（= `gis.ts` の GIS 読み込み）へ信頼が伝播する:

```ts
import { type NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const nonce = Buffer.from(crypto.randomUUID()).toString("base64");
  const csp = [
    "default-src 'self'",
    // strict-dynamic: nonce 付きスクリプトが生成する script（GIS 動的読込）に信頼を伝播
    `script-src 'nonce-${nonce}' 'strict-dynamic' https://accounts.google.com`,
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

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-nonce", nonce);
  const response = NextResponse.next({ request: { headers: requestHeaders } });
  response.headers.set("Content-Security-Policy", csp);
  return response;
}

export const config = {
  matcher: [
    // 静的アセット・プリフェッチには CSP 不要（誤適用によるキャッシュ劣化を避ける）
    { source: "/((?!_next/static|_next/image|favicon.ico|models/|mri/).*)" },
  ],
};
```

- Stage 2 で追加した `Content-Security-Policy-Report-Only` を `next.config.ts` から削除する
  （非 CSP ヘッダは `next.config.ts` に残す）。
- Stage 2 の計測で確定した追加ディレクティブ（`'wasm-unsafe-eval'` 等）を反映する。

**Verify**:

1. `bun run typecheck && bun run test && bun run build` → exit 0
2. `bun run start` で Stage 2 と同じ 4 巡回を再実施 — 今度は violation が **0 件**かつ全機能動作
   （特に Google 接続 → 同期の成功、3D / MRI / Mermaid の表示）
3. `curl -sI http://localhost:3000 | grep -i content-security-policy` → `script-src 'nonce-` を含む 1 行

### Stage 4: 文書更新

`docs/publishing/04-security-policy.md` §6 チェックリストの
「`next.config.ts` へのヘッダ付与を別プランとして起票した」「CSP 骨子を実 Google 連携で検証した」を
`[x]` 化し、最終的な CSP 全文と計測記録（Stage 2 の判断表の結果）を §3 の後ろに追記する。

**Verify**: `npx markdownlint-cli -c .markdownlint.json docs/publishing/04-security-policy.md` → エラー 0

## Test plan

- ヘッダ付与はフレームワーク設定のため単体テストは追加しない（`headers()` の出力検証は
  Next のビルドに委ねる）。既存テストの回帰なし（`bun run test` 全 pass）を各 Stage で確認する。
- 実効性の検証は Stage 2 / 3 の**実ブラウザ巡回チェックリスト**が担う（機械化は `plans/014` の
  CI 移行後に検討）。

## Done criteria

- [ ] `curl -sI http://localhost:3000` に HSTS / XFO / nosniff / Referrer-Policy / Permissions-Policy /
      Content-Security-Policy（`nonce-` 含む）がすべて含まれる
- [ ] `script-src` に `'unsafe-inline'` / `'unsafe-eval'` が**含まれない**
      （`curl -sI http://localhost:3000 | grep -i content-security-policy | grep -c "unsafe-inline\|unsafe-eval"` → CSP 行の script-src 部分に該当なし。style-src の `'unsafe-inline'` は暫定許容）
- [ ] Google 接続 → Sheets 同期が実アカウントで成功する（Stage 3 Verify 2）
- [ ] `/anatomy` の 3D・MRI、Mermaid 図が表示される
- [ ] `bun run typecheck` / `bun run test` / `bun run build` すべて exit 0
- [ ] `docs/publishing/04-security-policy.md` に最終 CSP と検証記録が追記されている
- [ ] `plans/README.md` の Status 更新

## STOP conditions

- Stage 2 で**未知の外部ドメイン**への violation が観測された場合（想定外の依存 = 調査が先）。
- Stage 3 で GIS の OAuth ポップアップが開かない・トークン取得に失敗する状態が、
  ディレクティブ調整 2 回で解消しない場合（`'strict-dynamic'` と GIS の相互作用の再設計が必要）。
- `middleware.ts` の導入でページの静的最適化が崩れ、ビルド出力が大きく変わる場合
  （matcher の見直しかホスティング層ヘッダへの移行判断が必要 — 独断で進めない）。
- デプロイ先が静的エクスポート（`output: "export"`）へ変更されていた場合
  （`headers()`／middleware は無効 — ホスティング層で付与する別設計になる）。

## Maintenance notes

- **Google が連携ドメインを追加した場合**（例: 新しい gstatic 系）、同期が無音で失敗し始める。
  障害時はまず DevTools の CSP violation を確認するのが一次切り分け。
- 新しい外部サービス・CDN・フォントを追加する変更は、必ず本 CSP の許可リスト更新とセットで
  レビューすること。
- `style-src 'unsafe-inline'` は Tailwind / インラインスタイル併用の暫定許容。将来の厳格化
  （style の nonce 化）は改善候補として残る。
- HSTS の `preload` ディレクティブと preload リスト登録は、独自ドメインでの HTTPS 運用が
  安定した後に別途判断する（登録は事実上不可逆）。
