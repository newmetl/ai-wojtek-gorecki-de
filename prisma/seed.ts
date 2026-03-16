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

  // ─── Trending AI Tech Einträge (Dummy-Daten) ───
  const trendingEntries = [
    // LLMs & Foundation Models
    {
      name: "Claude Opus 4.6",
      slug: "claude-opus-4-6",
      categorySlug: "llms-foundation-models",
      description: "Anthropics leistungsstärkstes Modell (März 2026) mit 75,6% auf SWE-bench und 1M Token Context Window. Führend bei Reasoning, Coding und Enterprise-Safety.",
      emoji: "🧠",
      sourceUrl: "https://www.anthropic.com",
      sourceName: "blog",
      trendStatus: "rising",
      trendScore: 95,
    },
    {
      name: "GPT-5.2",
      slug: "gpt-5-2",
      categorySlug: "llms-foundation-models",
      description: "OpenAIs aktuelles Flaggschiff-Modell mit 1M Token Context Window und um 33% reduzierten Halluzinationen. Marktführer bei Consumer- und Enterprise-KI-Anwendungen.",
      emoji: "🤖",
      sourceUrl: "https://openai.com",
      sourceName: "blog",
      trendStatus: "stable",
      trendScore: 90,
    },
    {
      name: "Gemini 3.1 Pro",
      slug: "gemini-3-1-pro",
      categorySlug: "llms-foundation-models",
      description: "Googles nativ multimodales Modell mit 77,1% ARC-AGI-2 Score und 1M Token Context. Tief integriert in Google Workspace mit 2 Mrd. AI Assists pro Monat.",
      emoji: "💡",
      sourceUrl: "https://deepmind.google/technologies/gemini/",
      sourceName: "blog",
      trendStatus: "rising",
      trendScore: 88,
    },
    {
      name: "Llama 4",
      slug: "llama-4",
      categorySlug: "llms-foundation-models",
      description: "Metas Open-Source-Flaggschiff mit 10M Token Context Window. Maverick übertrifft GPT-4o in vielen Benchmarks – kostenlos für kommerzielle Nutzung verfügbar.",
      emoji: "🦙",
      sourceUrl: "https://ai.meta.com/llama/",
      sourceName: "github",
      trendStatus: "rising",
      trendScore: 85,
    },
    {
      name: "DeepSeek-V3.2",
      slug: "deepseek-v3-2",
      categorySlug: "llms-foundation-models",
      description: "Chinesisches Open-Source-Modell auf GPT-5-Niveau bei dramatisch niedrigeren Kosten (ab $0,27/1M Tokens). Hat durch MoE-Architektur den gesamten KI-Markt preislich unter Druck gesetzt.",
      emoji: "🔬",
      sourceUrl: "https://www.deepseek.com",
      sourceName: "github",
      trendStatus: "new",
      trendScore: 82,
    },
    {
      name: "Mistral Large 3",
      slug: "mistral-large-3",
      categorySlug: "llms-foundation-models",
      description: "Europas führendes Open-Source-Modell (675B Parameter MoE) unter Apache 2.0 Lizenz. Stark positioniert für DSGVO-konformes Enterprise-Deployment im DACH-Raum.",
      emoji: "🇪🇺",
      sourceUrl: "https://mistral.ai",
      sourceName: "blog",
      trendStatus: "stable",
      trendScore: 78,
    },

    // Coding-Assistenten & Dev-Tools
    {
      name: "Claude Code",
      slug: "claude-code",
      categorySlug: "coding-assistenten-dev-tools",
      description: "Anthropics agentisches Terminal-Coding-Tool mit parallelen Agent Teams, Checkpoint-System und nativer Git-Integration. Gilt als das intelligenteste Tool für Deep Reasoning und komplexes Debugging.",
      emoji: "⚡",
      sourceUrl: "https://docs.anthropic.com/en/docs/claude-code",
      sourceName: "blog",
      trendStatus: "rising",
      trendScore: 92,
    },
    {
      name: "Cursor",
      slug: "cursor",
      categorySlug: "coding-assistenten-dev-tools",
      description: "KI-nativer Code-Editor auf VS-Code-Basis mit Agent Mode und Background Agents. Von über der Hälfte der Fortune 500 genutzt, über $2 Mrd. ARR und $29,3 Mrd. Bewertung.",
      emoji: "🖱️",
      sourceUrl: "https://cursor.com",
      sourceName: "producthunt",
      trendStatus: "stable",
      trendScore: 90,
    },
    {
      name: "GitHub Copilot Workspace",
      slug: "github-copilot-workspace",
      categorySlug: "coding-assistenten-dev-tools",
      description: "Agent Mode für Repo-Level Tasks und natürlichsprachliche Planung von Entwicklungsaufgaben. Industriestandard mit Free Tier (2.000 Completions/Monat) und breiter IDE-Unterstützung.",
      emoji: "🐙",
      sourceUrl: "https://github.com/features/copilot",
      sourceName: "github",
      trendStatus: "stable",
      trendScore: 88,
    },
    {
      name: "Windsurf",
      slug: "windsurf",
      categorySlug: "coding-assistenten-dev-tools",
      description: "Agentic AI IDE mit Cascade-Engine für tiefes Codebase-Verständnis und autonome Multi-File-Edits. Ranking #1 in den LogRocket AI Dev Tool Power Rankings (Feb 2026).",
      emoji: "🌊",
      sourceUrl: "https://windsurf.com",
      sourceName: "producthunt",
      trendStatus: "new",
      trendScore: 82,
    },
    {
      name: "v0 by Vercel",
      slug: "v0-by-vercel",
      categorySlug: "coding-assistenten-dev-tools",
      description: "AI-gestütztes UI-Generierungstool, das produktionsreife React-Komponenten mit Tailwind CSS aus natürlichen Prompts erzeugt. Tief in das Next.js-Ökosystem integriert.",
      emoji: "▲",
      sourceUrl: "https://v0.dev",
      sourceName: "producthunt",
      trendStatus: "new",
      trendScore: 75,
    },
    {
      name: "Devin",
      slug: "devin",
      categorySlug: "coding-assistenten-dev-tools",
      description: "Autonomer AI Software Engineer, der End-to-End-Engineering-Tasks parallel in Cloud-Sandboxes ausführt. 67% der generierten PRs werden gemergt – 4× schneller beim Problemlösen.",
      emoji: "🤖",
      sourceUrl: "https://devin.ai",
      sourceName: "blog",
      trendStatus: "rising",
      trendScore: 78,
    },

    // Bild-, Video- & Audiogenerierung
    {
      name: "Sora 2",
      slug: "sora-2",
      categorySlug: "bild-video-audiogenerierung",
      description: "OpenAIs Video-Generator setzt den Benchmark für realistische KI-Videogenerierung mit natürlicher Physik-Simulation und synchronisiertem Audio bis 25 Sekunden.",
      emoji: "🎬",
      sourceUrl: "https://sora.com",
      sourceName: "blog",
      trendStatus: "new",
      trendScore: 90,
    },
    {
      name: "Runway Gen-4.5",
      slug: "runway-gen-4-5",
      categorySlug: "bild-video-audiogenerierung",
      description: "Führende Plattform für AI-Video und VFX mit Motion Brushes und über 30 Built-in Tools. Favorit für Filmemacher und Creative Professionals.",
      emoji: "🎥",
      sourceUrl: "https://runwayml.com",
      sourceName: "producthunt",
      trendStatus: "rising",
      trendScore: 85,
    },
    {
      name: "Midjourney",
      slug: "midjourney",
      categorySlug: "bild-video-audiogenerierung",
      description: "Führendes Text-to-Image-Tool für konzeptuelle Visuals und hochwertige, stilistisch vielfältige Bilder. Unverzichtbar für Ideation, Moodboarding und UX-Visualisierung.",
      emoji: "🖼️",
      sourceUrl: "https://www.midjourney.com",
      sourceName: "blog",
      trendStatus: "stable",
      trendScore: 82,
    },
    {
      name: "ElevenLabs",
      slug: "elevenlabs",
      categorySlug: "bild-video-audiogenerierung",
      description: "Führende Plattform für AI Voice Synthesis mit den realistischsten Stimmen am Markt. Text-to-Speech in 29+ Sprachen, Voice Cloning und Dubbing Studio.",
      emoji: "🔊",
      sourceUrl: "https://elevenlabs.io",
      sourceName: "producthunt",
      trendStatus: "stable",
      trendScore: 80,
    },
    {
      name: "Kling AI 3.0",
      slug: "kling-ai-3-0",
      categorySlug: "bild-video-audiogenerierung",
      description: "ByteDances AI-Video-Generator mit 4K-Output und Cinematic Series Mode für Multi-Shot-Konsistenz. Realistisches Human Motion und Lip-Sync für UGC und Performance Marketing.",
      emoji: "🎞️",
      sourceUrl: "https://klingai.com",
      sourceName: "producthunt",
      trendStatus: "new",
      trendScore: 78,
    },

    // KI-Agenten & Automation
    {
      name: "Agentic AI",
      slug: "agentic-ai",
      categorySlug: "ki-agenten-automation",
      description: "Autonome KI-Systeme, die eigenständig planen, ausführen und iterieren. Bis Ende 2026 werden laut Gartner 40% der Enterprise-Applikationen AI Agents integrieren. DER dominierende Trend 2026.",
      emoji: "🧩",
      sourceUrl: "https://www.deloitte.com/us/en/insights/topics/technology-management/tech-trends/2026/agentic-ai-strategy.html",
      sourceName: "blog",
      trendStatus: "rising",
      trendScore: 95,
    },
    {
      name: "MCP (Model Context Protocol)",
      slug: "mcp-model-context-protocol",
      categorySlug: "ki-agenten-automation",
      description: "Von Anthropic eingeführter Open Standard für LLM-Tool-Anbindung via JSON-RPC 2.0 – jetzt de-facto-Industriestandard, adoptiert von OpenAI, Google, Microsoft und AWS. Über 5.800 MCP-Server.",
      emoji: "🔗",
      sourceUrl: "https://modelcontextprotocol.io",
      sourceName: "github",
      trendStatus: "rising",
      trendScore: 92,
    },
    {
      name: "CrewAI",
      slug: "crewai",
      categorySlug: "ki-agenten-automation",
      description: "Framework für Multi-Agent-Orchestrierung mit spezialisierten AI-Agents als Teammitglieder. Visual Builder, unterstützt GPT, Claude, Gemini und RAG-Tools.",
      emoji: "👥",
      sourceUrl: "https://www.crewai.com",
      sourceName: "github",
      trendStatus: "rising",
      trendScore: 83,
    },
    {
      name: "LangGraph",
      slug: "langgraph",
      categorySlug: "ki-agenten-automation",
      description: "Graph-basierte Multi-Agent-Orchestrierung aus dem LangChain-Ökosystem mit integriertem Tracing via LangSmith. Etablierter Standard für komplexe agentic Workflows.",
      emoji: "🕸️",
      sourceUrl: "https://www.langchain.com",
      sourceName: "github",
      trendStatus: "rising",
      trendScore: 83,
    },
    {
      name: "A2A Protocol",
      slug: "a2a-protocol",
      categorySlug: "ki-agenten-automation",
      description: "Von Google lanciertes offenes Protokoll für Agent-zu-Agent-Kommunikation, komplementär zu MCP. 150+ Organisationen unterstützen A2A, seit Juni 2025 unter Linux Foundation Governance.",
      emoji: "🔄",
      sourceUrl: "https://github.com/a2aproject/A2A",
      sourceName: "github",
      trendStatus: "new",
      trendScore: 80,
    },
    {
      name: "Dify",
      slug: "dify",
      categorySlug: "ki-agenten-automation",
      description: "Production-ready Open-Source-Plattform für Agentic Workflow-Entwicklung mit visuellem Builder, RAG-Pipeline-Management und MCP-Integration. Ideal für schnellen AI-Service-Aufbau.",
      emoji: "🏗️",
      sourceUrl: "https://dify.ai",
      sourceName: "github",
      trendStatus: "new",
      trendScore: 76,
    },

    // Datenanalyse & Business Intelligence
    {
      name: "Databricks AI/BI Genie",
      slug: "databricks-ai-bi-genie",
      categorySlug: "datenanalyse-business-intelligence",
      description: "Conversational Analytics direkt in der Lakehouse-Plattform mit Unity Catalog für Governance. Keine Per-Seat-Lizenzkosten für BI; Genie ist in Slack und Teams einbettbar.",
      emoji: "🏔️",
      sourceUrl: "https://www.databricks.com/product/business-intelligence",
      sourceName: "blog",
      trendStatus: "rising",
      trendScore: 82,
    },
    {
      name: "Microsoft Copilot in Power BI",
      slug: "microsoft-copilot-power-bi",
      categorySlug: "datenanalyse-business-intelligence",
      description: "Natural Language Queries, automatische Anomaly Detection und Forecasting im BI-Marktführer (~20% Marktanteil). Copilot ermöglicht 340% schnellere Time-to-Value.",
      emoji: "📈",
      sourceUrl: "https://www.microsoft.com/en-us/power-platform/products/power-bi",
      sourceName: "blog",
      trendStatus: "stable",
      trendScore: 80,
    },
    {
      name: "Snowflake Cortex",
      slug: "snowflake-cortex",
      categorySlug: "datenanalyse-business-intelligence",
      description: "AI direkt in SQL-Workflows innerhalb der Snowflake Data Cloud ohne Datenbewegung. LLM Functions für Summarize, Classify und Translate – alles via SQL aufrufbar.",
      emoji: "❄️",
      sourceUrl: "https://www.snowflake.com/en/data-cloud/cortex/",
      sourceName: "blog",
      trendStatus: "rising",
      trendScore: 78,
    },
    {
      name: "Julius AI",
      slug: "julius-ai",
      categorySlug: "datenanalyse-business-intelligence",
      description: "AI Data Scientist für konversationelle Datenanalyse. Verbindet sich mit Postgres, Snowflake und BigQuery und beantwortet Fragen durch automatisch generierten Python/R-Code.",
      emoji: "🔭",
      sourceUrl: "https://julius.ai",
      sourceName: "producthunt",
      trendStatus: "new",
      trendScore: 72,
    },

    // Sprache, NLP & Conversational AI
    {
      name: "Perplexity AI",
      slug: "perplexity-ai",
      categorySlug: "sprache-nlp-conversational-ai",
      description: "AI-gestützte Suchmaschine mit über 100 Mio. monatlich aktiven Usern und 780 Mio. Queries/Monat. Pro Search führt Multi-Step-Research mit verifizierbaren Quellzitaten durch.",
      emoji: "🔍",
      sourceUrl: "https://www.perplexity.ai",
      sourceName: "producthunt",
      trendStatus: "rising",
      trendScore: 88,
    },
    {
      name: "Synthesia",
      slug: "synthesia",
      categorySlug: "sprache-nlp-conversational-ai",
      description: "Enterprise-Plattform für AI-Avatar-Videos mit 240+ Avataren, Voice Cloning und 1-Click-Übersetzung in 160+ Sprachen. 90% der Fortune 100 nutzen Synthesia für Training und Onboarding.",
      emoji: "🎭",
      sourceUrl: "https://www.synthesia.io",
      sourceName: "producthunt",
      trendStatus: "stable",
      trendScore: 80,
    },
    {
      name: "RAG (Retrieval-Augmented Generation)",
      slug: "rag-retrieval-augmented-generation",
      categorySlug: "sprache-nlp-conversational-ai",
      description: "Kombination von LLMs mit Echtzeit-Retrieval aus externen Wissensquellen für halluzinationsarme Antworten. Von experimentellen Pilots zur produktionskritischen Enterprise-Architektur geworden.",
      emoji: "📚",
      sourceUrl: "https://aws.amazon.com/what-is/retrieval-augmented-generation/",
      sourceName: "blog",
      trendStatus: "stable",
      trendScore: 85,
    },

    // Sicherheit, Governance & Alignment
    {
      name: "EU AI Act",
      slug: "eu-ai-act",
      categorySlug: "sicherheit-governance-alignment",
      description: "Die weltweit erste umfassende KI-Regulierung trat 2025 in Kraft. Risikobasierter Ansatz mit Verboten für unakzeptable Risiken und strengen Anforderungen für hochriskante KI-Systeme.",
      emoji: "⚖️",
      sourceUrl: "https://www.europarl.europa.eu/topics/en/article/20230601STO93804/eu-ai-act-first-regulation-on-artificial-intelligence",
      sourceName: "blog",
      trendStatus: "stable",
      trendScore: 85,
    },
    {
      name: "Tabnine Enterprise",
      slug: "tabnine-enterprise",
      categorySlug: "sicherheit-governance-alignment",
      description: "Privacy-first AI Code Assistant mit Zero-Knowledge-Architektur und On-Premise-Deployment. HIPAA/SOC 2 compliant – besonders beliebt in regulierten Branchen wie Finanzen und Gesundheit.",
      emoji: "🔐",
      sourceUrl: "https://www.tabnine.com",
      sourceName: "blog",
      trendStatus: "stable",
      trendScore: 72,
    },
    {
      name: "Synthetic Data",
      slug: "synthetic-data",
      categorySlug: "sicherheit-governance-alignment",
      description: "Künstlich generierte Daten, die reale Muster nachbilden ohne personenbezogene Informationen zu enthalten. Für den DACH-Raum entscheidend, wo DSGVO-Anforderungen den Zugang zu Trainingsdaten limitieren.",
      emoji: "🧬",
      sourceUrl: "https://www.startus-insights.com/innovators-guide/new-technology-trends/",
      sourceName: "blog",
      trendStatus: "new",
      trendScore: 70,
    },

    // Infrastruktur, MLOps & Deployment
    {
      name: "Ollama",
      slug: "ollama",
      categorySlug: "infrastruktur-mlops-deployment",
      description: "Framework zum lokalen Ausführen von LLMs – ohne externe Datenübertragung, vollständig offline-fähig. Unterstützt Llama, Mistral, Gemma, DeepSeek. Backbone der Local-AI-Bewegung.",
      emoji: "🦙",
      sourceUrl: "https://ollama.com",
      sourceName: "github",
      trendStatus: "rising",
      trendScore: 85,
    },
    {
      name: "Hugging Face",
      slug: "hugging-face",
      categorySlug: "infrastruktur-mlops-deployment",
      description: "Das zentrale Hub-Ökosystem der AI-Community mit über 4,3 Mio. AI-Repositories. Primäre Distributionsplattform für Open-Source-Modelle von DeepSeek, Meta, Mistral und Stability AI.",
      emoji: "🤗",
      sourceUrl: "https://huggingface.co",
      sourceName: "github",
      trendStatus: "stable",
      trendScore: 88,
    },
    {
      name: "LlamaIndex",
      slug: "llamaindex",
      categorySlug: "infrastruktur-mlops-deployment",
      description: "Spezialisiertes Framework für RAG und datengesteuerte LLM-Applikationen mit leistungsstarken Abstraktionen für Daten-Ingestion, Indexierung und Querying. Top-10-AI-Agent-Framework 2026.",
      emoji: "📑",
      sourceUrl: "https://www.llamaindex.ai",
      sourceName: "github",
      trendStatus: "rising",
      trendScore: 80,
    },
    {
      name: "vLLM",
      slug: "vllm",
      categorySlug: "infrastruktur-mlops-deployment",
      description: "Hochperformante Open-Source-Inference-Engine für LLMs mit PagedAttention-Technologie. Semantic Router v0.1 bietet intelligentes LLM-Routing und integrierte Halluzinations-Erkennung.",
      emoji: "🚀",
      sourceUrl: "https://vllm.ai",
      sourceName: "github",
      trendStatus: "rising",
      trendScore: 78,
    },
    {
      name: "Vercel AI SDK",
      slug: "vercel-ai-sdk",
      categorySlug: "infrastruktur-mlops-deployment",
      description: "Open-Source TypeScript-Toolkit für AI-powered Applications mit React, Next.js, Vue und Svelte. AI SDK 6 bietet eine Unified API für alle großen LLM-Provider mit SSE-Streaming.",
      emoji: "▲",
      sourceUrl: "https://ai-sdk.dev",
      sourceName: "github",
      trendStatus: "new",
      trendScore: 72,
    },
  ];

  // Kategorien-Map aufbauen
  const categories = await prisma.category.findMany({ where: { type: "trending" } });
  const categoryMap = new Map(categories.map((c) => [c.slug, c.id]));

  let trendingCreated = 0;
  for (const entry of trendingEntries) {
    const categoryId = categoryMap.get(entry.categorySlug);
    if (!categoryId) {
      console.warn(`⚠ Kategorie nicht gefunden: ${entry.categorySlug}`);
      continue;
    }
    await prisma.trendingTech.upsert({
      where: { slug: entry.slug },
      update: {
        description: entry.description,
        trendStatus: entry.trendStatus,
        trendScore: entry.trendScore,
      },
      create: {
        name: entry.name,
        slug: entry.slug,
        categoryId,
        description: entry.description,
        emoji: entry.emoji,
        sourceUrl: entry.sourceUrl,
        sourceName: entry.sourceName,
        trendStatus: entry.trendStatus,
        reviewStatus: "approved",
        trendScore: entry.trendScore,
      },
    });
    trendingCreated++;
  }

  console.log(`✓ ${trendingCreated} Trending-Einträge angelegt`);
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
