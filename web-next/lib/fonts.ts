import { Inter, Outfit } from "next/font/google";

// 見出し用: Outfit（元 index.html の "Outfit" 指定を next/font で読み込み）
export const outfit = Outfit({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-outfit",
  display: "swap",
});

// 本文用: Inter（元 index.html の "Inter" 指定。日本語は OS フォントへフォールバック）
export const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});
