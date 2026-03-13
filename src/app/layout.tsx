import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Wojtek Gorecki — KI-gestützter Product Owner",
    template: "%s — ai.wojtek-gorecki.de",
  },
  description:
    "Tools und Ressourcen für Product Owner und Digitalexperten. Trending AI Tech, Use Cases, Prompt Library und mehr.",
  metadataBase: new URL("https://ai.wojtek-gorecki.de"),
  openGraph: {
    type: "website",
    locale: "de_DE",
    url: "https://ai.wojtek-gorecki.de",
    siteName: "ai.wojtek-gorecki.de",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="de" className="dark">
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} antialiased min-h-screen flex flex-col`}
      >
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
