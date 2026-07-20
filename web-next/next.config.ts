import path from "node:path";
import { fileURLToPath } from "node:url";
import type { NextConfig } from "next";

const configDir = path.dirname(fileURLToPath(import.meta.url));

// 強制 CSP（静的最適化を維持するため next.config.ts の静的ヘッダとして付与する）。
// web-next は全ページを静的プリレンダするため、per-request nonce は焼き込めない。
// そこで nonce/'strict-dynamic' を採らず、Next.js の inline bootstrap script を 'unsafe-inline'
// で許容し、外部スクリプトはホスト単位（accounts.google.com = GIS）に限定する。
// 当サイトは完全クライアント型・サーバ/秘密なし・ユーザー入力を script 文脈へ注入する sink が
// 無いため、'unsafe-inline' 許容による残存 XSS リスクは限定的（詳細は docs/publishing/04）。
const isDev = process.env.NODE_ENV !== "production";

// script-src: React は開発モードのみ eval() を使う（HMR・スタックトレース復元等）。
// dev だけ 'unsafe-eval' を許可し、本番ビルドでは付与しない（本番の React は eval を使わない）。
const scriptSrc = [
  "'self'",
  "'unsafe-inline'",
  ...(isDev ? ["'unsafe-eval'"] : []),
  "https://accounts.google.com",
  "https://cdnjs.cloudflare.com",
].join(" ");

const cspEnforced = [
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

// セキュリティヘッダ一式。即時強制しても既存機能を壊さない防御層。
const securityHeaders = [
  // HTTPS 固定（2 年）。preload 登録は HTTPS 運用が安定してから別途判断する。
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains" },
  // クリックジャッキング防止（CSP frame-ancestors 非対応ブラウザ向けの保険）
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  // 使用しない高権限 API を全面禁止
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), payment=()" },
  // XSS 主防御。外部スクリプト・接続先を許可ドメインに限定する。
  { key: "Content-Security-Policy", value: cspEnforced },
];

const nextConfig: NextConfig = {
  reactStrictMode: true,
  turbopack: {
    // リポジトリルート（web-next の親）をワークスペースルートとして固定する
    root: path.resolve(configDir, ".."),
  },
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
};

export default nextConfig;
