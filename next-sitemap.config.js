/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: "https://ai.wojtek-gorecki.de",
  generateRobotsTxt: false,
  exclude: ["/admin", "/admin/*", "/api", "/api/*"],
  changefreq: "weekly",
  priority: 0.7,
  sitemapSize: 5000,
};
