# 04. セキュリティ方針（P1）

> [!NOTE]
> 本文書は**設計・是正案の提示**であり、コードは変更しない。CSP 等のヘッダ値は推奨骨子であって、導入時に実ブラウザ・実 Google 連携で検証すること。

- **対象監査所見**: F4（CSP／セキュリティヘッダ未設定、`SECURITY.md`・脆弱性開示方針なし）
- **成果物**: ルート `SECURITY.md`（新設）、本文書。
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

## 4. localStorage のデータ保持リスクとユーザー向け注意喚起

- 頭痛日誌・PROM スコアは端末の `localStorage` に平文で残る。共有端末・公共端末では次の利用者が閲覧しうる。
- **是正方針（`05` と連携）**: (a) 保存前に「この端末に健康データが残る」旨を明示、(b) ワンクリックのデータ消去導線を提供、(c) 共有端末での利用を控える注意書きを常設。実装は別プラン。

## 5. ルート `SECURITY.md`

- 脆弱性報告の一次窓口を **GitHub Private Vulnerability Reporting**（Security advisories）とし、個人メール等の PII を晒さない方針とした。
- 対象範囲（クライアント型ゆえサーバ脆弱性は非該当・依存とヘッダが主対象）、対応目安、開示方針（責任ある開示）を記載。

## 6. チェックリスト

- [x] セキュリティ姿勢（クライアント型・ゼロ知識・最小スコープ）を文書化した
- [x] ルート `SECURITY.md` を配置した
- [x] `next.config.ts` へのヘッダ付与を別プランとして起票した →
  [`plans/011-security-headers-next-config.md`](../../plans/011-security-headers-next-config.md)（3 段階導入）
- [ ] CSP 骨子を実 Google 連携（OAuth ログイン・Sheets 書込）で検証した（`plans/011` Stage 2〜3 で実施）
- [x] localStorage 消去導線・注意喚起 UI を別プランとして起票した →
  [`plans/012-localstorage-notice-and-clear-ui.md`](../../plans/012-localstorage-notice-and-clear-ui.md)
  （消去導線は既存 `DataManager` を再利用し、注意喚起の常設のみ追加）
- [ ] 依存脆弱性監査（`bun audit` 等）の定期実行を CI に組み込む方針を `06` に反映した

## 関連文書

- 法務・規制（免責・localStorage の利用規約観点）: [`05-legal-and-regulatory.md`](05-legal-and-regulatory.md)
- CI・依存監査・秘密情報管理: [`06-infrastructure-and-deployment.md`](06-infrastructure-and-deployment.md)
