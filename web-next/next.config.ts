import path from "node:path";
import { fileURLToPath } from "node:url";
import type { NextConfig } from "next";

const configDir = path.dirname(fileURLToPath(import.meta.url));

// CSP を含まない標準セキュリティヘッダ。即時強制しても既存機能を壊さない安全な防御層。
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
    // リポジトリルート（web-next の親）をワークスペースルートとして固定する
    root: path.resolve(configDir, ".."),
  },
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
};

export default nextConfig;
