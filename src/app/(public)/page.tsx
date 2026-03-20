import type { Metadata } from "next";
import Hero from "@/components/home/Hero";
import LatestTrending from "@/components/home/LatestTrending";
import LatestBlogPosts from "@/components/home/LatestBlogPosts";
import ShortProfile from "@/components/home/ShortProfile";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Wojtek Gorecki — KI und der gesellschaftliche Wandel",
  description:
    "Meine persönliche Website über KI, technologischen Wandel und die Fragen, die mich bewegen — mit wöchentlich kuratierten Trends und Artikeln.",
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
            name: "Wojtek Gorecki",
            url: "https://ai.wojtek-gorecki.de",
            description:
              "Persönliche Website über KI, technologischen Wandel und die Fragen, die mich bewegen.",
            author: {
              "@type": "Person",
              name: "Wojtek Gorecki",
            },
          }),
        }}
      />

      <main className="flex-1">
        <Hero />
        <LatestTrending />
        <LatestBlogPosts />
        <ShortProfile />
      </main>
    </>
  );
}
