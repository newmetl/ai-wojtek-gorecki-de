import { MetadataRoute } from "next";

export const dynamic = "force-dynamic";

export default function robots(): MetadataRoute.Robots {
  const isIndexingAllowed = process.env.ALLOW_INDEXING === "true";

  if (!isIndexingAllowed) {
    return {
      rules: {
        userAgent: "*",
        disallow: "/",
      },
    };
  }

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/admin", "/api"],
    },
    sitemap: "https://ai.wojtek-gorecki.de/sitemap.xml",
  };
}
