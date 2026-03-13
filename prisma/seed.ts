import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding database...");

  // ─── Trending-Kategorien ───
  const trendingCategories = [
    {
      name: "LLMs & Foundation Models",
      slug: "llms-foundation-models",
      type: "trending",
      emoji: "🧠",
      sortOrder: 1,
    },
    {
      name: "Coding-Assistenten & Dev-Tools",
      slug: "coding-assistenten-dev-tools",
      type: "trending",
      emoji: "💻",
      sortOrder: 2,
    },
    {
      name: "Bild-, Video- & Audiogenerierung",
      slug: "bild-video-audiogenerierung",
      type: "trending",
      emoji: "🎨",
      sortOrder: 3,
    },
    {
      name: "KI-Agenten & Automation",
      slug: "ki-agenten-automation",
      type: "trending",
      emoji: "🤖",
      sortOrder: 4,
    },
    {
      name: "Datenanalyse & Business Intelligence",
      slug: "datenanalyse-business-intelligence",
      type: "trending",
      emoji: "📊",
      sortOrder: 5,
    },
    {
      name: "Sprache, NLP & Conversational AI",
      slug: "sprache-nlp-conversational-ai",
      type: "trending",
      emoji: "💬",
      sortOrder: 6,
    },
    {
      name: "Sicherheit, Governance & Alignment",
      slug: "sicherheit-governance-alignment",
      type: "trending",
      emoji: "🛡️",
      sortOrder: 7,
    },
    {
      name: "Infrastruktur, MLOps & Deployment",
      slug: "infrastruktur-mlops-deployment",
      type: "trending",
      emoji: "⚙️",
      sortOrder: 8,
    },
  ];

  for (const category of trendingCategories) {
    await prisma.category.upsert({
      where: { slug: category.slug },
      update: {},
      create: category,
    });
  }

  console.log(`✓ ${trendingCategories.length} Trending-Kategorien angelegt`);

  // ─── Use-Case-Kategorien (Phase 2) ───
  const useCaseCategories = [
    { name: "E-Commerce", slug: "e-commerce", type: "usecase", emoji: "🛒", sortOrder: 1 },
    { name: "SaaS", slug: "saas", type: "usecase", emoji: "☁️", sortOrder: 2 },
    { name: "Gesundheit", slug: "gesundheit", type: "usecase", emoji: "🏥", sortOrder: 3 },
    { name: "Bildung", slug: "bildung", type: "usecase", emoji: "📚", sortOrder: 4 },
    { name: "Finanzen", slug: "finanzen", type: "usecase", emoji: "💰", sortOrder: 5 },
    { name: "Marketing", slug: "marketing", type: "usecase", emoji: "📣", sortOrder: 6 },
    { name: "HR", slug: "hr", type: "usecase", emoji: "👥", sortOrder: 7 },
    { name: "Logistik", slug: "logistik", type: "usecase", emoji: "🚚", sortOrder: 8 },
    { name: "Medien", slug: "medien", type: "usecase", emoji: "📰", sortOrder: 9 },
  ];

  for (const category of useCaseCategories) {
    await prisma.category.upsert({
      where: { slug: category.slug },
      update: {},
      create: category,
    });
  }

  console.log(`✓ ${useCaseCategories.length} Use-Case-Kategorien angelegt`);

  // ─── Prompt-Kategorien (Phase 3) ───
  const promptCategories = [
    { name: "User Stories", slug: "user-stories", type: "prompt", emoji: "📝", sortOrder: 1 },
    { name: "Stakeholder-Kommunikation", slug: "stakeholder-kommunikation", type: "prompt", emoji: "🤝", sortOrder: 2 },
    { name: "Sprint Planning", slug: "sprint-planning", type: "prompt", emoji: "🏃", sortOrder: 3 },
    { name: "Backlog Refinement", slug: "backlog-refinement", type: "prompt", emoji: "📋", sortOrder: 4 },
    { name: "Marktanalyse", slug: "marktanalyse", type: "prompt", emoji: "🔍", sortOrder: 5 },
    { name: "Wettbewerbsrecherche", slug: "wettbewerbsrecherche", type: "prompt", emoji: "⚡", sortOrder: 6 },
    { name: "Dokumentation", slug: "dokumentation", type: "prompt", emoji: "📄", sortOrder: 7 },
    { name: "Testing", slug: "testing", type: "prompt", emoji: "🧪", sortOrder: 8 },
  ];

  for (const category of promptCategories) {
    await prisma.category.upsert({
      where: { slug: category.slug },
      update: {},
      create: category,
    });
  }

  console.log(`✓ ${promptCategories.length} Prompt-Kategorien angelegt`);
  console.log("Seeding abgeschlossen.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
