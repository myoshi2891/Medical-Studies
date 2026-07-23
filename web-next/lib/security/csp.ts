/**
 * Content Security Policy を組み立てる純粋関数。
 *
 * next.config.ts の静的ヘッダから利用する。全ページを静的プリレンダするため per-request
 * nonce を焼き込めず、nonce/'strict-dynamic' は採らない。Next.js の inline bootstrap script は
 * 'unsafe-inline' で許容し、外部スクリプトはホスト単位に限定する（詳細は docs/publishing/04）。
 *
 * @param isDev - 開発モードなら true。dev は React の eval と wasm コンパイルを許容する。
 * @returns `"; "` 区切りの CSP 文字列。
 */
export function buildContentSecurityPolicy(isDev: boolean): string {
  // script-src: React は開発モードのみ eval() を使う（HMR・スタックトレース復元等）。
  // dev だけ 'unsafe-eval' を許可し、本番ビルドでは付与しない（本番の React は eval を使わない）。
  // 'wasm-unsafe-eval': DRACO デコーダ（自己ホストの .wasm）を dev/prod 両方でコンパイルするため必須。
  // 'unsafe-eval' より狭い wasm 専用ディレクティブ。dev は 'unsafe-eval' が暗黙にカバーするが、
  // 本番では 'unsafe-eval' が除去されるため明示が必要。
  const scriptSrc = [
    "'self'",
    "'unsafe-inline'",
    "'wasm-unsafe-eval'",
    ...(isDev ? ["'unsafe-eval'"] : []),
    "https://accounts.google.com",
    "https://cdnjs.cloudflare.com",
  ].join(" ");

  // connect-src は 'self' に限定する。DRACO デコーダは public/draco/ に自己ホストするため、
  // gstatic 等の外部 CDN を許可する必要はない（同一オリジンで完結）。
  return [
    "default-src 'self'",
    `script-src ${scriptSrc}`,
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
}
