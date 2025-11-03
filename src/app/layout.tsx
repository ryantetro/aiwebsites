import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "ZeroToSite",
    template: "%s | ZeroToSite",
  },
  description:
    "Professional websites built fast. Fast, mobile optimized, and SEO ready.",
  keywords: ["website", "web design", "Next.js", "React", "Tailwind CSS"],
  authors: [{ name: "ZeroToSite" }],
  creator: "ZeroToSite",
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon.ico", sizes: "any" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  manifest: "/site.webmanifest",
  themeColor: "#2563eb",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://zerotosite.app",
    siteName: "ZeroToSite",
    title: "ZeroToSite - Professional Websites Built Fast",
    description:
      "Professional websites built fast. Fast, mobile optimized, and SEO ready. From zero to live in 24 hours.",
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: "ZeroToSite - Professional Websites Built Fast",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ZeroToSite - Professional Websites Built Fast",
    description:
      "Professional websites built fast. Fast, mobile optimized, and SEO ready. From zero to live in 24 hours.",
    images: ["/logo.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <Analytics />
      </body>
    </html>
  );
}
