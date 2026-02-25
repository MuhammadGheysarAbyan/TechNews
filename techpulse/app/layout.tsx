// app/layout.tsx
import type { Metadata } from "next";
import { Inter, Merriweather, JetBrains_Mono } from "next/font/google";
import { Toaster } from "react-hot-toast";
import { Providers } from "@/components/Providers";
import "@/styles/globals.css";

const inter = Inter({
  subsets:  ["latin"],
  variable: "--font-inter",
  display:  "swap",
});
const merriweather = Merriweather({
  subsets:  ["latin"],
  weight:   ["300", "400", "700", "900"],
  variable: "--font-merriweather",
  display:  "swap",
});
const jetbrains = JetBrains_Mono({
  subsets:  ["latin"],
  variable: "--font-jetbrains",
  display:  "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://techpulse.id"),
  title: {
    default:  "TechPulse — Berita Teknologi Terdepan Indonesia",
    template: "%s | TechPulse",
  },
  description:
    "Media teknologi terpercaya Indonesia. Berita terkini AI, Programming, Gadget, Startup, dan Cyber Security.",
  keywords: ["teknologi", "AI", "programming", "startup", "gadget", "indonesia", "berita tech"],
  authors: [{ name: "TechPulse" }],
  creator: "TechPulse",
  openGraph: {
    type:        "website",
    locale:      "id_ID",
    url:         "https://techpulse.id",
    siteName:    "TechPulse",
    title:       "TechPulse — Berita Teknologi Terdepan Indonesia",
    description: "Media teknologi terpercaya Indonesia.",
    images: [{ url: "/og-default.jpg", width: 1200, height: 630, alt: "TechPulse" }],
  },
  twitter: {
    card:        "summary_large_image",
    site:        "@techpulseid",
    creator:     "@techpulseid",
    title:       "TechPulse — Berita Teknologi Terdepan Indonesia",
    description: "Media teknologi terpercaya Indonesia.",
    images:      ["/og-default.jpg"],
  },
  robots: {
    index:   true,
    follow:  true,
    googleBot: { index: true, follow: true, "max-video-preview": -1, "max-image-preview": "large" },
  },
  verification: { google: "your-google-verification-code" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id" className={`${inter.variable} ${merriweather.variable} ${jetbrains.variable}`} suppressHydrationWarning>
      <body className="bg-gray-950 text-white antialiased">
        <Providers>
          {children}
          <Toaster
            position="bottom-right"
            toastOptions={{
              style: { background: "#1f2937", color: "#fff", border: "1px solid rgba(255,255,255,.1)" },
            }}
          />
        </Providers>
      </body>
    </html>
  );
}
