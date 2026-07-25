# 04. セキュリティ方針（P1）

> Updated 2026-07-15

> [!NOTE]
> 本文書は**設計・是正案の提示**として起票され、`plans/011` により**コード実装済み**（§3 「実装状況」参照）。CSP 等のヘッダ値の**実ブラウザ・実 Google 連携での実効性検証は別途実施**する。

- **対象監査所見**: F4（CSP／セキュリティヘッダ未設定、`SECURITY.md`・脆弱性開示方針なし）
- **成果物**: ルート `SECURITY.md`（新設）、本文書、`web-next/next.config.ts`（全セキュリティヘッダ + 強制 CSP を静的付与）。
- **記載時点コミット**: `0fced4f`

---

## 1. セキュリティ姿勢（現状の強み）

このアプリは攻撃対象領域が小さい。記録として明示する。

- **完全クライアント型**: `web-next/app/api/` は存在しない（サーバサイド API・秘密情報なし）。ビルド成果物は静的／SSR フロントエンドのみ。
- **Google 連携はゼロ知識設計**: OAuth トークンはブラウザメモリ上のみで保持し、サーバへ送信・永続化しない。スコープは `https://www.googleapis.com/auth/drive.file`（ユーザーが本アプリで作成したファイルのみ）に限定。
- **秘密情報を持たない**: 公開環境変数は `NEXT_PUBLIC_GOOGLE_CLIENT_ID` のみ（OAuth クライアント ID は設計上公開値）。`.env.example` は公開値のみを含む。ハードコードされた資格情報は検出されていない（テスト内ダミーを除く）。
- **患者データは端末内のみ**: 頭痛日誌・PROM スコアは `localStorage` に保存。運営側にデータ資産は存在しない。

## 2. 攻撃対象領域と主なリスク

サーバがないため、リスクはブラウザ内に集中する。

| リスク | 説明 | 主対策 |
|---|---|---|
| XSS | 外部スクリプト注入・依存汚染による localStorage / OAuth トークン窃取 | CSP（`script-src` 制限）、依存監査 |
| クリックジャッキング | iframe 埋め込みによる UI 詐取 | `X-Frame-Options` / CSP `frame-ancestors` |
| トークン漏洩 | メモリ上 OAuth トークンの中間者・拡張機能経由の窃取 | HTTPS 強制（HSTS）、最小スコープ |
| localStorage 残存 | 共有端末で前ユーザーの健康データが閲覧される | ユーザー注意喚起・消去導線（`05` と連携） |
| リファラ漏洩 | 遷移先へ URL 経由で情報が渡る | `Referrer-Policy` |

## 3. 是正案：セキュリティヘッダ（設計のみ・実装しない）

`web-next/next.config.ts` は現状 `reactStrictMode` と `turbopack.root` のみ。以下のヘッダ付与を推奨する。**導入は別プラン**とし、本文書では値の根拠を示すに留める。

> [!IMPORTANT]
> 下記は**参考値の骨子**であり、そのまま貼り付けるコードではない。Google GIS/Sheets は将来ドメインを追加する可能性があるため、CSP 導入後は OAuth ログイン・Sheets 書き込みの実地動作確認が必須。

### 推奨ヘッダと根拠

| ヘッダ | 推奨値（骨子） | 根拠 |
|---|---|---|
| `Content-Security-Policy` | 下記 CSP 骨子参照 | XSS の主防御。外部スクリプト・接続先を許可ドメインに限定 |
| `Strict-Transport-Security` | `max-age=63072000; includeSubDomains; preload` | HTTPS 固定でトークン中間者攻撃を防止 |
| `X-Frame-Options` | `DENY` | クリックジャッキング防止（CSP 非対応ブラウザ向け保険） |
| `X-Content-Type-Options` | `nosniff` | MIME スニッフィング抑止 |
| `Referrer-Policy` | `strict-origin-when-cross-origin` | 遷移先へのパス・クエリ漏洩を抑制 |
| `Permissions-Policy` | `camera=(), microphone=(), geolocation=()` 等を無効化 | 不要な高権限 API を全面禁止 |

### CSP 骨子（Google GIS/Sheets 連携を含む）

実コードから逆算した許可ドメイン（`web-next/lib/` の Google 連携で使用）:

- スクリプト: `https://accounts.google.com/gsi/client`（Google Identity Services）
- 接続先: `https://sheets.googleapis.com`（Sheets API v4）、`https://accounts.google.com`（トークン）
- フレーム: Google のログイン UI が iframe を用いるため `frame-src` に `https://accounts.google.com` を許可

```text
default-src 'self';
script-src 'self' https://accounts.google.com;
connect-src 'self' https://sheets.googleapis.com https://accounts.google.com;
frame-src https://accounts.google.com;
img-src 'self' data:;
style-src 'self' 'unsafe-inline';   # Tailwind/inline style を使う場合。nonce 化で 'unsafe-inline' 除去を検討
frame-ancestors 'none';
base-uri 'self';
form-action 'self';
```

> [!NOTE]
> `style-src 'unsafe-inline'` は Tailwind/インラインスタイル併用時の暫定。`script-src` に `'unsafe-inline'` を入れないこと（XSS 防御が無効化される）。Next.js の nonce/strict-dynamic 対応で段階的に厳格化する。Mermaid はビルド時レンダor SRI 付き自己ホストなら外部 `script-src` 追加は不要か要検証。

### 実装状況（`plans/011` により導入済み）

`plans/011` の段階導入（非 CSP ヘッダ → Report-Only 計測 → 強制 CSP）を実装した。
すべて `web-next/next.config.ts` の `headers()` で全パス（`/:path*`）へ静的付与する。

- **非 CSP ヘッダ**: HSTS（`max-age=63072000; includeSubDomains`。`preload` は HTTPS 運用安定後に
  別途判断のため未付与）・X-Frame-Options・X-Content-Type-Options・Referrer-Policy・Permissions-Policy。
- **CSP 本体**: 強制モード（`Content-Security-Policy`）で付与。

> [!IMPORTANT]
> **nonce/`'strict-dynamic'` は採用しなかった（設計判断）**。web-next は全ページを静的プリレンダ
> （`○ Static`）するため、per-request nonce を HTML に焼き込めず、nonce ベース CSP は静的ページで
> 機能しない（Next.js は静的シェルをリクエスト毎に再レンダしない）。nonce を機能させるには全ページの
> 動的 SSR 化が必要で、静的最適化・CDN キャッシュを全放棄するトレードオフになる。当サイトは
> **完全クライアント型・サーバ/秘密なし・ユーザー入力を script 文脈へ注入する sink が無い**ため、
> Next.js の inline bootstrap script を `'unsafe-inline'` で許容しても残存 XSS リスクは限定的と判断し、
> 静的最適化の維持を優先した。外部スクリプトはホスト単位（`accounts.google.com` = GIS）に限定する。

最終的に強制している CSP:

```text
default-src 'self';
script-src 'self' 'unsafe-inline' https://accounts.google.com;
connect-src 'self' https://sheets.googleapis.com https://accounts.google.com;
frame-src https://accounts.google.com;
img-src 'self' data: blob:;
style-src 'self' 'unsafe-inline';
font-src 'self';
worker-src 'self' blob:;
frame-ancestors 'none';
base-uri 'self';
form-action 'self';
```

> [!NOTE]
> **`script-src` の `'unsafe-eval'` は開発モード（`next dev`）のみ**付与する。React は開発時に
> `eval()` を使う（HMR・スタックトレース復元等）ため、無いと DevTools コンソールに eval 違反が出る。
> `next.config.ts` の `process.env.NODE_ENV !== "production"` で分岐し、**本番ビルドには含めない**。

**自動検証（実施済み）**: `bun run typecheck` / `bun run test`（403 pass）/ `bun run build` すべて exit 0。
全ページが `○ Static` を維持。`curl -sI` で 6 ヘッダ（非 CSP 5 + `Content-Security-Policy`）の実付与を確認。
本番（`next start`）は `script-src` に `'unsafe-eval'` を含まず、開発（`next dev`）のみ含むことを確認済み。

**実ブラウザ検証で判明した経緯**: 当初 `middleware.ts` による nonce/`'strict-dynamic'` 強制を実装したが、
静的ページに nonce が焼き込めず Next.js の inline script が全ブロックされ、ページが描画されなかった
（`/anatomy`・`/prom-checker` が「読み込み中…」で停止）。この検証結果を受けて上記の静的維持型 CSP へ
方針変更した。**将来の厳格化候補**: 動的 SSR 化を許容できるなら nonce/`'strict-dynamic'` へ回帰し
`script-src` の `'unsafe-inline'` を除去できる。`style-src 'unsafe-inline'` も nonce 化で厳格化しうる。

## 4. localStorage のデータ保持リスクとユーザー向け注意喚起

- 頭痛日誌・PROM スコアは端末の `localStorage` に平文で残る。共有端末・公共端末では次の利用者が閲覧しうる。
- **是正方針（`05` と連携）**: (a) 保存前に「この端末に健康データが残る」旨を明示、(b) ワンクリックのデータ消去導線を提供、(c) 共有端末での利用を控える注意書きを常設。実装は別プラン。

## 5. ルート `SECURITY.md`

- 脆弱性報告の一次窓口を **GitHub Private Vulnerability Reporting**（Security advisories）とし、個人メール等の PII を晒さない方針とした。
- 対象範囲（クライアント型ゆえサーバ脆弱性は非該当・依存とヘッダが主対象）、対応目安、開示方針（責任ある開示）を記載。

## 6. チェックリスト

- [x] セキュリティ姿勢（クライアント型・ゼロ知識・最小スコープ）を文書化した
- [x] ルート `SECURITY.md` を配置した
- [x] `next.config.ts` へのヘッダ付与を別プランとして起票し、**実装した** →
  [`plans/011-security-headers-next-config.md`](../../plans/011-security-headers-next-config.md)（3 段階導入・§3「実装状況」）
- [x] CSP を実ブラウザで検証しレンダリング破壊を是正した（nonce 方式が静的ページで不成立と判明 →
  静的維持型の強制 CSP へ方針変更。§3「実装状況」参照）
- [ ] **実 Google 連携（OAuth ログイン・Sheets 書込）の実効性検証** — 実 Google アカウント・
  `NEXT_PUBLIC_GOOGLE_CLIENT_ID` を要するため未了（トップ / prom-checker の描画復帰は確認済み）
- [x] localStorage 消去導線・注意喚起 UI を別プランとして起票し、**実装した** →
  [`plans/012-localstorage-notice-and-clear-ui.md`](../../plans/012-localstorage-notice-and-clear-ui.md)
  （消去導線は既存 `DataManager` を再利用、注意喚起は `StorageNotice` を新設し Dashboard に常設）
- [ ] 依存脆弱性監査（`bun audit` 等）の定期実行を CI に組み込む方針を `06` に反映した

## 関連文書

- 法務・規制（免責・localStorage の利用規約観点）: [`05-legal-and-regulatory.md`](05-legal-and-regulatory.md)
- CI・依存監査・秘密情報管理: [`06-infrastructure-and-deployment.md`](06-infrastructure-and-deployment.md)
