import type { Metadata } from "next";
import { Space_Grotesk, Manrope, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Wojtek Gorecki — KI & Gesellschaftlicher Wandel",
    template: "%s — ai.wojtek-gorecki.de",
  },
  description:
    "Persönliche Website zu KI, Technologie und gesellschaftlichem Wandel. Trending AI Tech, Blog und mehr.",
  metadataBase: new URL("https://ai.wojtek-gorecki.de"),
  openGraph: {
    type: "website",
    locale: "de_DE",
    url: "https://ai.wojtek-gorecki.de",
    siteName: "ai.wojtek-gorecki.de",
    images: [
      {
        url: "/images/og/default.png",
        width: 1200,
        height: 630,
        alt: "Wojtek Gorecki — KI & Gesellschaftlicher Wandel",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/images/og/default.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="de"
      className={`dark ${spaceGrotesk.variable} ${manrope.variable} ${jetbrainsMono.variable}`}
      suppressHydrationWarning
    >
      <body className="antialiased min-h-screen flex flex-col">
        {children}
      </body>
    </html>
  );
}
