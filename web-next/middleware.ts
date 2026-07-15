import { type NextRequest, NextResponse } from "next/server";

/**
 * リクエストごとに nonce を発行し、nonce ベースの CSP を強制モードで付与する。
 * Next.js App Router は CSP ヘッダ内の nonce を検出して framework 注入スクリプトへ
 * 自動付与するため、layout 側の改修は不要。'strict-dynamic' により nonce 付き信頼
 * スクリプトが動的生成する <script>（= gis.ts の GIS 読み込み）へ信頼が伝播する。
 */
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
