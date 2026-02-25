import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "TechPulse — Berita Teknologi Terdepan Indonesia",
  description: "TechPulse menyajikan berita teknologi terkini, analisis mendalam, dan wawasan industri digital Indonesia.",
  keywords: "teknologi, berita tech, AI, startup Indonesia, programming, gadget, cyber security",
  openGraph: {
    title: "TechPulse — Berita Teknologi Terdepan Indonesia",
    description: "Media teknologi terdepan Indonesia",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Merriweather:wght@400;700;900&family=JetBrains+Mono:wght@400;500;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
