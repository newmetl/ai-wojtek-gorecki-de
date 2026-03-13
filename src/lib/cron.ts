// Cron-Job Setup — Wird in Schritt 5 implementiert
// Wird über Next.js instrumentation.ts beim Server-Start initialisiert

export async function initCronJobs() {
  if (process.env.NODE_ENV !== "production") return;

  const cron = await import("node-cron");
  const { runFullScrape } = await import("./scraping");

  // Wöchentlich Sonntag 03:00 Uhr
  cron.schedule("0 3 * * 0", async () => {
    console.log("[Cron] Starte wöchentlichen Scraping-Lauf...");
    await runFullScrape();
  });

  console.log("[Cron] Cron-Jobs initialisiert.");
}
