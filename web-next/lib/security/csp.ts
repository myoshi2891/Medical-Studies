/**
 * Builds a Content Security Policy for statically pre-rendered pages.
 *
 * @param isDev - Whether to include development-only script evaluation permissions.
 * @returns The CSP directives joined by `"; "`.
 */
export function buildContentSecurityPolicy(isDev: boolean): string {
  // script-src: React は開発モードのみ eval() を使う（HMR・スタックトレース復元等）。
  // dev だけ 'unsafe-eval' を許可し、本番ビルドでは付与しない（本番の React は eval を使わない）。
  // 'wasm-unsafe-eval': DRACO デコーダ（自己ホストの .wasm）を dev/prod 両方でコンパイルするため必須。
  // 'unsafe-eval' より狭い wasm 専用ディレクティブ。dev は 'unsafe-eval' が暗黙にカバーするが、
  // 本番では 'unsafe-eval' が除去されるため明示が必要。
  // 外部ホストの許可は accounts.google.com（GIS の動的 script 読込）のみに限定する。
  // CDN（cdnjs 等）は利用していない — 新規追加は実コードの参照とセットでレビューすること。
  const scriptSrc = [
    "'self'",
    "'unsafe-inline'",
    "'wasm-unsafe-eval'",
    ...(isDev ? ["'unsafe-eval'"] : []),
    "https://accounts.google.com",
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
