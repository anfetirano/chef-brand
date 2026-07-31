import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { AnalyticsProvider } from "@/components/analytics/analytics-provider";
import { siteConfig } from "@/content/site";
import { buildRootMetadata } from "@/lib/seo/metadata";
import "./globals.css";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-cormorant",
  weight: ["400", "500"],
});

export const metadata: Metadata = buildRootMetadata();

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0c0c0b",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang={siteConfig.locale}
      className={`${manrope.variable} ${cormorant.variable} h-full scroll-smooth antialiased`}
      style={
        {
          "--background": "#0d0c0a",
          "--surface": "#171411",
          "--surface-strong": "#211c17",
          "--panel": "#0b0a08",
          "--foreground": "#fffaf1",
          "--muted": "#c4bbb0",
          "--border": "rgba(255, 250, 241, 0.2)",
          "--accent": "#c96f38",
        } as React.CSSProperties
      }
    >
      <body className="min-h-full flex flex-col">
        <AnalyticsProvider />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
