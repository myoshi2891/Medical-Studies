import type { MetadataRoute } from "next";

/**
 * Web App Manifest（Android のホーム画面追加・PWA インストール用）。
 * アイコン画像は `scripts/generate-icons.mjs` で生成する。
 */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Medical Studies — 頭痛の医学教育と PROM チェッカー",
    short_name: "Med Studies",
    description:
      "頭痛疾患の医学教育コンテンツと、患者報告アウトカム（PROM）をローカルファーストで自己記録するチェッカー。",
    start_url: "/",
    display: "standalone",
    background_color: "#0d1117",
    theme_color: "#0d1117",
    lang: "ja",
    icons: [
      { src: "/icons/icon-192.png", sizes: "192x192", type: "image/png", purpose: "any" },
      { src: "/icons/icon-512.png", sizes: "512x512", type: "image/png", purpose: "any" },
      {
        src: "/icons/icon-maskable-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
