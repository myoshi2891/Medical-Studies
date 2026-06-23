import type { Metadata, Viewport } from "next";
import { inter, outfit } from "@/lib/fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: "頭痛 PROM 統合チェッカー",
  description:
    "頭痛患者向けの患者報告アウトカム（PROM）統合チェッカー。HIT-6 / MIDAS / MSQ v2.1 / PGIC / NRS / VAS と頭痛日誌・SNOOP4 をローカルファーストで自己記録。",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  colorScheme: "light dark",
};

/**
 * アプリ全体のルートレイアウト。`<html lang="ja">` にフォント変数を適用する。
 * テーマ（data-theme）はクライアント側（PromApp）で localStorage に基づき設定する。
 *
 * @param children - body 内に描画する React ノード
 */
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ja" className={`${outfit.variable} ${inter.variable}`}>
      <body>{children}</body>
    </html>
  );
}
