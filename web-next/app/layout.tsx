import type { Metadata, Viewport } from "next";
import { DisclaimerBanner } from "@/components/site/DisclaimerBanner";
import { SiteFooter } from "@/components/site/SiteFooter";
import { SiteHeader } from "@/components/site/SiteHeader";
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
 * Renders the application's root layout.
 *
 * @param children - React nodes to render inside the document body
 */
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ja" className={`${outfit.variable} ${inter.variable}`}>
      <body className="has-common-header">
        <SiteHeader />
        <DisclaimerBanner />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
