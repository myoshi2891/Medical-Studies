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

## 3. セキュリティヘッダ（立案時の設計と現行実装）

以下は、実装前に作成した立案時の設計を履歴として残したものである。セキュリティヘッダはその後 `plans/011` で導入済みであり、**現行の CSP とヘッダ値は `web-next/next.config.ts` を正本**とする（後述「実装状況」参照）。

> [!IMPORTANT]
> 下記は**立案時の参考値の骨子**であり、現行設定ではない。Google GIS/Sheets は将来ドメインを追加する可能性があるため、設定変更後は OAuth ログイン・Sheets 書き込みの実地動作確認が必須。

### 立案時の推奨ヘッダと根拠

| ヘッダ | 推奨値（骨子） | 根拠 |
|---|---|---|
| `Content-Security-Policy` | 下記 CSP 骨子参照 | XSS の主防御。外部スクリプト・接続先を許可ドメインに限定 |
| `Strict-Transport-Security` | `max-age=63072000; includeSubDomains; preload` | HTTPS 固定でトークン中間者攻撃を防止 |
| `X-Frame-Options` | `DENY` | クリックジャッキング防止（CSP 非対応ブラウザ向け保険） |
| `X-Content-Type-Options` | `nosniff` | MIME スニッフィング抑止 |
| `Referrer-Policy` | `strict-origin-when-cross-origin` | 遷移先へのパス・クエリ漏洩を抑制 |
| `Permissions-Policy` | `camera=(), microphone=(), geolocation=()` 等を無効化 | 不要な高権限 API を全面禁止 |

### 立案時の CSP 骨子（Google GIS/Sheets 連携を含む）

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
> 上記は**立案時（2026-07-09）の骨子**であり、`script-src` から `'unsafe-inline'` を排除して nonce/`'strict-dynamic'` で段階的に厳格化する前提で書かれていた。**このうち nonce を前提とした部分は plans/011 Stage 3 の実測で不成立と判明した**（nonce はレスポンスごとに一意かつ予測困難でなければ防御にならないが、全ページ静的プリレンダではその per-request nonce を静的生成物へ反映できない）。ただし不成立なのは nonce 方式であって、`'strict-dynamic'` 自体は nonce・ハッシュのいずれとも併用でき、ビルド間で内容が安定した inline script についてはハッシュベース CSP という選択肢が残る（本プロジェクトでは採用していない。理由は次節「実装状況」）。現行の採用値と、`'unsafe-inline'` を許容した設計判断・残余リスクの受入記録は次節「実装状況」を参照すること。`style-src 'unsafe-inline'` は Tailwind/インラインスタイル併用時の暫定という位置づけのまま。Mermaid は npm 依存としてバンドルされ、外部 `script-src` の追加は不要であることを確認済み。

### 実装状況（`plans/011` により導入済み）

`plans/011` の段階導入（非 CSP ヘッダ → Report-Only 計測 → 強制 CSP）を実装した。
すべて `web-next/next.config.ts` の `headers()` で全パス（`/:path*`）へ静的付与する。

- **非 CSP ヘッダ**: HSTS（`max-age=63072000; includeSubDomains`。`preload` は HTTPS 運用安定後に
  別途判断のため未付与）・X-Frame-Options・X-Content-Type-Options・Referrer-Policy・Permissions-Policy。
- **CSP 本体**: 強制モード（`Content-Security-Policy`）で付与。

> [!IMPORTANT]
> **nonce/`'strict-dynamic'` は採用しなかった（設計判断）**。web-next は全ページを静的プリレンダ
> （`○ Static`）するため、per-request nonce を静的生成物へ反映できず、nonce ベース CSP は静的ページで
> 機能しない（Next.js は静的シェルをリクエスト毎に再レンダしない）。nonce は**レスポンスごとに一意
> かつ予測困難**でなければ攻撃者に値を知られて防御にならないため、ビルド時に固定値を埋め込む代替も
> 成立しない。nonce を機能させるには全ページの
> 動的 SSR 化が必要で、静的最適化・CDN キャッシュを全放棄するトレードオフになる。当サイトは
> **完全クライアント型・サーバ/秘密なし・他者入力が script 文脈へ到達する経路が無い**ため
> （実行時 HTML sink は `prom-checker/index.html` の `innerHTML` 描画に限られ、`esc()` でエスケープする。
> 詳細は下記「残余リスクの受入記録」の表を参照）、
> Next.js の inline bootstrap script を `'unsafe-inline'` で許容しても残存 XSS リスクは限定的と判断し、
> 静的最適化の維持を優先した。外部スクリプトはホスト単位（`accounts.google.com` = GIS）に限定する。

最終的に強制している CSP:

```text
default-src 'self';
script-src 'self' 'unsafe-inline' 'wasm-unsafe-eval' https://accounts.google.com;
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

> [!NOTE]
> **`'wasm-unsafe-eval'` は dev / prod 両方で付与する**。`/anatomy` の 3D 表示が使う DRACO デコーダ
> （自己ホスト。`web-next/public/draco/`）が WebAssembly をコンパイルするために必要で、`'unsafe-eval'`
> より作用範囲の狭い wasm 専用ディレクティブ。dev は `'unsafe-eval'` が暗黙にカバーするが、
> 本番では `'unsafe-eval'` を除去するため明示が要る。

**外部スクリプト許可は `accounts.google.com`（GIS）のみ**。一時的に `script-src` へ入っていた
`https://cdnjs.cloudflare.com` は、アプリコード（`public/`・`app/`・`components/`・`lib/`）から
参照が無い死んだ許可であり、XSS 時に任意ライブラリの読み込みを許すため除去した。再混入は
`web-next/lib/security/csp.test.ts` の negative assertion（`gstatic` と同じ形）で防ぐ。
CSP 文字列の組み立ては `web-next/lib/security/csp.ts` の純粋関数 `buildContentSecurityPolicy(isDev)`
に分離され、上記の不変条件は契約テストで担保される。

**自動検証（実施済み。plans/011 Stage 3 時点 = 2026-08-11 の実測値）**:
`bun run typecheck` / `bun run test`（当時 web-next 全体 403 pass）/ `bun run build` すべて exit 0。
全ページが `○ Static` を維持。`curl -sI` で 6 ヘッダ（非 CSP 5 + `Content-Security-Policy`）の実付与を確認。
本番（`next start`）は `script-src` に `'unsafe-eval'` を含まず、開発（`next dev`）のみ含むことを確認済み。

**実ブラウザ検証で判明した経緯**: 当初 `middleware.ts` による nonce/`'strict-dynamic'` 強制を実装したが、
静的ページへ per-request nonce を反映できず Next.js の inline script が全ブロックされ、ページが描画されなかった
（`/anatomy`・`/prom-checker` が「読み込み中…」で停止）。この検証結果を受けて上記の静的維持型 CSP へ
方針変更した。**将来の厳格化候補**: 動的 SSR 化を許容できるなら nonce/`'strict-dynamic'` へ回帰し
`script-src` の `'unsafe-inline'` を除去できる。`style-src 'unsafe-inline'` も nonce 化で厳格化しうる。

#### 残余リスクの受入記録（`script-src 'unsafe-inline'`）

CSP の inline XSS 防御は `script-src 'unsafe-inline'` により**無効**である。これは未解決の課題ではなく
**受入済みの残余リスク**として扱う。受入日 2026-08-11 / 受入単位 plans/011（Status: DONE）/
再評価トリガーは下表「再評価の条件」。

**inline XSS 防御を補う代替策（現に効いている統制）**:

| 統制 | 実体 | 何を補うか |
|---|---|---|
| 注入 sink の限定 | **本アプリが運用するサーバ・DB は無く**、ユーザー間で共有される保存先も持たないため、**他者**入力が script 文脈へ到達する経路が無い。web-next 側に実行時の `dangerouslySetInnerHTML` は存在しない（Mermaid も `mermaid.run({ nodes })` の in-place 変換で、HTML 文字列を注入しない）。ただし**単一 HTML SPA の `prom-checker/index.html` は画面描画に `innerHTML` を用いており、`localStorage` 由来の state 値やフォーム入力値を文字列連結で差し込む**。これらは同ファイルの `esc()`（`& < > " '` をエンティティ化）でエスケープしてから描画する前提であり、**新規に `innerHTML` を追加する際の `esc()` 付け忘れが残余リスク**（現状の未エスケープ箇所は `type="range"` の `input.value` のようにブラウザが数値へ正規化する値に限られる） | inline script 注入の**発生源**を絞る。ただし sink はゼロではないため、CSP は前段のエスケープを**補完する**防御層として位置づける（`'unsafe-inline'` 許容下では inline 実行自体は止められない — 下記「残る被害想定」参照） |
| React の既定エスケープ | 本文は Server Component の JSX 描画。文字列は自動エスケープされる | 反射型・格納型 XSS の主経路 |
| 外部ホスト許可の最小化 | `script-src` の外部許可は `accounts.google.com` のみ。`connect-src` は `self` + Sheets/GIS のみ。CDN 許可なし（cdnjs 除去済み・`csp.test.ts` で再混入を検知） | 任意ライブラリの読込を封じ、**接続 API 経由**（`fetch` / `XMLHttpRequest` / WebSocket / `sendBeacon` / EventSource）の持ち出し先を許可ホストに限定する。**トップレベルナビゲーションは対象外** — 下記注記参照 |
| `base-uri 'self'` / `form-action 'self'` / `frame-ancestors 'none'` | 実 CSP に付与済み | base タグ乗っ取り・フォーム外部送信・クリックジャッキング（`'unsafe-inline'` では防げない別経路） |
| 秘密の非永続化 | Google アクセストークンは React state（`DataManager` のメモリ）のみで、`localStorage` に置かない | **アクティブセッション外**への被害の持ち越しを断つ（再読み込み後・次回セッションではトークンが存在しないため、XSS が後から拾える秘密は残らない）。セッション中の窃取は防げない — 下記「残る被害想定」を参照 |
| Google 権限スコープの最小化 | `drive.file`（`lib/export/google/gis.ts`）。到達しうるのは (a) 通常経路で `spreadsheets.create` が生成した本アプリ作成シート、(b) JSON インポートで `settings.syncTargets.googleSheets.spreadsheetId` として保存された任意の ID（`lib/prom/storage.ts` の `normalizeSyncTargets` は文字列であることのみ検査し、`GoogleSheetsExporter` はその ID に対し `spreadsheets.values.get` / `values.batchUpdate` / `values.append` を実行する）の 2 経路。`drive.file` の性質上、(b) の ID が本アプリ由来でなければ Google API 側が拒否する。なお `drive.file` は「ユーザーが明示選択したファイル」も許可しうるが、**本アプリに選択 UI（Google Picker 等）は存在しない**ため現状この経路は無い | トークン漏洩時の到達範囲を Drive 全体ではなく、本アプリが作成した／本アプリに紐づいたシートに限定 |
| 供給網の監視 | `plans/014` の CI（依存監査・ライセンスゲート） | inline script 混入の現実的な最大経路である依存改ざん |

> [!NOTE]
> **`connect-src` はナビゲーション経由の持ち出しを止めない（残余リスク）**。`connect-src` が制限するのは
> 接続 API（`fetch` / `XHR` / WebSocket / `sendBeacon` 等）であり、`window.location` への代入・
> `window.open`・注入されたリンク URL といった**トップレベルナビゲーション**でデータをクエリ文字列に
> 載せて外部へ送る経路は対象外である（`form-action 'self'` が縛るのはフォーム送信のみ）。これを縛る
> `navigate-to` ディレクティブは CSP 仕様から撤回されブラウザ実装も無いため、**本プロジェクトでは導入しない**。
> 仮に実装があっても、Google GIS はログイン時に `accounts.google.com` へのポップアップ／リダイレクトを
> 行うため、その互換性維持のための許可が必要になり、実効的な制限にはなりにくい。
> したがって XSS 成立時のデータ持ち出しは CSP では封じられない前提で、前段（sink のエスケープ・依存監査）
> を主たる統制とする。

**残る被害想定**: 上記をすべて突破する XSS（＝依存パッケージ改ざん等でバンドル自体に混入）が成立した場合、
被害は `localStorage` の健康データにとどまらない。想定される範囲は次の 2 つである。

1. **`localStorage` の頭痛日誌・PROM スコアの窃取**（永続データのため、いつ XSS が成立しても読める）
2. **Google アクセストークンの悪用**: トークンは永続化しないが、ユーザーが「Google と接続」した後の
   アクティブセッション中は React state（メモリ）に存在し、同一オリジンで動く XSS ペイロードからは
   到達しうる。取得されれば `drive.file` スコープの範囲で Google Sheets API の**読み取り・作成・更新・
   追加**（`spreadsheets.create` による新規シート作成と、本アプリに紐づいたシート — 通常経路で本アプリが
   作成したもの、または JSON インポートで `spreadsheetId` として保存されたもの — に対する
   `spreadsheets.values.get` / `values.batchUpdate` / `values.append` 相当）を攻撃者に誘発されうる。
   なおユーザーが Picker 等でファイルを明示選択する経路は**現状存在しない**。将来これを追加した場合は、
   選択されたファイルに対する読み取り・更新・追加を本項の残余リスクへ追記すること。

2 の到達範囲は次の 3 点で抑えられている（無効化はされない）: スコープが `drive.file` のため Drive 全体
ではなく**本アプリに紐づいたシートのみ**が対象であること（本アプリ由来でない ID は Google API 側が
拒否する）、GIS の access token は**短寿命**（トークンレスポンスの `expires_in` 値が示す秒数で失効し、
`requestAccessToken` はこの値を `expiresIn` としてアクセストークンとともに返す）
で refresh token を保持しないこと、そしてページ再読み込み後・次回セッションではトークンが**残存しない**
こと。ただしこれらが限定するのは**一過性の XSS**の場合であり、本項の想定（バンドル自体への混入）では
配布されているバンドルが修正されるまで**次回以降の起動でも同じコードが実行される**ため、ユーザーが再接続する
たびに新しいアクセストークンを取得しうる。トークンを永続化しない統制が防ぐのは「過去のトークンの再利用」で
あって、攻撃の窓そのものではない。また `spreadsheets.values.append` / `spreadsheets.values.batchUpdate` で
シートに加えられた変更は、タブを閉じた後も残る。

なお 1・2 いずれの経路も `'unsafe-inline'` の有無にかかわらず（自オリジンの `'self'` スクリプトとして）
成立するため、**`'unsafe-inline'` の除去では防げない**。

**再評価の条件**（いずれか成立時に本受入を破棄し再設計する）:

1. 動的 SSR（per-request レンダ）を許容する方針変更 — nonce/`'strict-dynamic'` へ回帰し `'unsafe-inline'` を除去する
2. ユーザー入力・外部由来コンテンツを実行時に描画する機能の追加（コメント・投稿・URL パラメータ由来の本文等）
3. サーバサイド／認証／他者間データ共有の導入
4. Next.js が静的プリレンダと両立する nonce 機構を提供した場合

### 実 Google 連携での検証記録（2026-08-11）

本番ビルド（`next start`）＋実 Google アカウントで OAuth 承認 → Sheets 書込 → 生成シート参照まで成功。
`/anatomy` の 3D・MRI、Mermaid 図、トップも確認し **CSP 違反（`Refused to ...` / `violates the
following Content Security Policy directive`）は 0 件**。以下 2 種はコンソールに出るが CSP とは無関係の
既知メッセージであり、対応不要（将来の切り分けのため記録する）:

| コンソール出力 | 正体 | 判断 |
|---|---|---|
| `Cross-Origin-Opener-Policy policy would block the window.closed call.`（`client:138`） | GIS が認可ポップアップの閉鎖検知に `window.closed` を参照するが、ポップアップ側（`accounts.google.com`）の COOP により opener 関係が切断されるため Chrome が警告する。GIS ポップアップ方式に共通の既知警告 | 無害。トークン取得・同期は成功する |
| `The resource <URL> was preloaded using link preload but not used ...`（`_next/static/chunks/*.css`） | Next.js のルートプリフェッチが先読みした CSS を、該当ルートへ遷移しなかったため未使用のまま数秒経過した | 無害（性能上の情報提供）。CSP・ヘッダ設定とは無関係 |

> [!NOTE]
> **将来の強化候補**: `Cross-Origin-Opener-Policy: same-origin-allow-popups` の付与。cross-origin から
> の window 参照を遮断しつつ OAuth ポップアップは維持できる。付与時は上記 GIS 警告が消えるとは限らず、
> **実 Google 連携の再検証が必須**のため、本プラン（011）の範囲外として保留した。

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
- [x] **実 Google 連携（OAuth ログイン・Sheets 書込）の実効性検証** — 2026-08-11 に本番ビルド
  （`next start`）＋実 Google アカウントで実施。OAuth ポップアップ承認 → Sheets 書込 → 生成シートの
  参照まで成功。`/anatomy` の 3D（DRACO wasm）・MRI スライス、Mermaid 図、トップも確認し、
  **CSP 違反は 0 件**（§3「実装状況」の観測メモ参照）
- [x] localStorage 消去導線・注意喚起 UI を別プランとして起票し、**実装した** →
  [`plans/012-localstorage-notice-and-clear-ui.md`](../../plans/012-localstorage-notice-and-clear-ui.md)
  （消去導線は既存 `DataManager` を再利用、注意喚起は `StorageNotice` を新設し Dashboard に常設）
- [ ] 依存脆弱性監査（`bun audit` 等）の定期実行を CI に組み込む方針を `06` に反映した

## 関連文書

- 法務・規制（免責・localStorage の利用規約観点）: [`05-legal-and-regulatory.md`](05-legal-and-regulatory.md)
- CI・依存監査・秘密情報管理: [`06-infrastructure-and-deployment.md`](06-infrastructure-and-deployment.md)
