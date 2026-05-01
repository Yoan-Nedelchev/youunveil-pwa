import type { Metadata, Viewport } from "next";
import { Geist_Mono, Manrope, Noto_Serif } from "next/font/google";
import { getLocale } from "next-intl/server";

import { AppProviders } from "@/components/providers/app-providers";
import { routing } from "@/i18n/routing";

import "./globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

const notoSerif = Noto_Serif({
  variable: "--font-noto-serif",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "YouUnveil",
    template: "%s · YouUnveil",
  },
  description: "YouUnveil progressive web app",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "YouUnveil",
  },
};

export const viewport: Viewport = {
  themeColor: "#0a0e1a",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  let locale: string = routing.defaultLocale;
  try {
    locale = await getLocale();
  } catch {
    /* e.g. routes without intl context */
  }

  return (
    <html lang={locale} className="dark" suppressHydrationWarning>
      <body
        className={`${manrope.variable} ${notoSerif.variable} ${geistMono.variable} min-h-dvh antialiased`}
      >
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
