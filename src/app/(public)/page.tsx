import type { Metadata } from "next";
import Hero from "@/components/home/Hero";
import ToolTeaser from "@/components/home/ToolTeaser";
import LatestTrending from "@/components/home/LatestTrending";
import ShortProfile from "@/components/home/ShortProfile";

export const metadata: Metadata = {
  title: "Wojtek Gorecki — KI-gestützter Product Owner",
  description:
    "KI-Tools und Ressourcen für Product Owner: Trending AI Tech, Use Cases, Prompt Library und User Story Generator.",
};

export default function HomePage() {
  return (
    <>
      {/* JSON-LD: WebSite */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: "Wojtek Gorecki — KI-gestützter Product Owner",
            url: "https://ai.wojtek-gorecki.de",
            description:
              "Tools und Ressourcen für Product Owner und Digitalexperten.",
            author: {
              "@type": "Person",
              name: "Wojtek Gorecki",
            },
          }),
        }}
      />

      <main className="flex-1 pt-16">
        <Hero />
        <ToolTeaser />
        <LatestTrending />
        <ShortProfile />
      </main>
    </>
  );
}
