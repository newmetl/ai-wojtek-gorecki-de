/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: "https://ai.wojtek-gorecki.de",
  generateRobotsTxt: true,
  exclude: ["/admin", "/admin/*", "/api", "/api/*"],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin", "/api"],
      },
    ],
  },
  changefreq: "weekly",
  priority: 0.7,
  sitemapSize: 5000,
};
