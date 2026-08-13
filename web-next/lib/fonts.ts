import localFont from "next/font/local";

// フォントはリポジトリ内にセルフホストする（assets/fonts/）。
// next/font/google はビルド時に fonts.googleapis.com / fonts.gstatic.com へ実 fetch するため、
// Google 側がフォント実体を差し替えた瞬間に woff2 が 404 となり Turbopack ビルドが失敗した
// （CI run 31683067206）。ビルドを外部 CDN の可用性から切り離し決定論的にするため local へ移行。
// 実体は Google Fonts が latin サブセット向けに配信する可変フォント（wght 軸）と同一。
// ライセンス: いずれも SIL OFL 1.1（assets/fonts/*-OFL.txt に同梱）。
//
// 収録範囲は移行前の `subsets: ["latin"]` と同じ latin サブセットのみ。
// 日本語は globals.css の --font-sans チェーンで OS フォントへフォールバックする。

// 見出し用: Outfit（元 index.html の "Outfit" 指定）
export const outfit = localFont({
  src: [{ path: "../assets/fonts/outfit-latin-var.woff2", weight: "400 800", style: "normal" }],
  variable: "--font-outfit",
  display: "swap",
  // 可変フォント読み込み前のレイアウトシフトを抑えるメトリクス調整済みフォールバック
  adjustFontFallback: "Arial",
});

// 本文用: Inter（元 index.html の "Inter" 指定）
export const inter = localFont({
  src: [{ path: "../assets/fonts/inter-latin-var.woff2", weight: "400 700", style: "normal" }],
  variable: "--font-inter",
  display: "swap",
  adjustFontFallback: "Arial",
});
