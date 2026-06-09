import type { Metadata } from "next";
import { Geist, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Cursor } from "@/components/shared/cursor";
import { ScrollProgress } from "@/components/shared/scroll-progress";
import { SiteFooter } from "@/components/shared/site-footer";
import { SiteNav } from "@/components/shared/site-nav";
import { site } from "@/lib/data/site";

const geistSans = Geist({
  variable: "--font-sans",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: site.title,
  description: site.description,
  authors: [{ name: site.author }],
  openGraph: {
    title: site.title,
    description: site.description,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: site.title,
    description: site.description,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${jetbrainsMono.variable} dark h-full antialiased`}
    >
      <body className="custom-cursor min-h-full bg-background font-sans text-foreground">
        <div className="bg-grid bg-grid-mask pointer-events-none fixed inset-0 -z-10" />
        <ScrollProgress />
        <SiteNav />
        <Cursor />
        <div className="flex min-h-svh flex-col">
          <main className="flex-1">{children}</main>
          <SiteFooter />
        </div>
      </body>
    </html>
  );
}
