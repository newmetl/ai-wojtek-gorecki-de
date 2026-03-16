/**
 * Next.js 16 Instrumentation — läuft einmalig beim Server-Start.
 * Initialisiert den Cron-Job für das wöchentliche Scraping.
 * https://nextjs.org/docs/app/building-your-application/optimizing/instrumentation
 */
export async function register() {
  // Nur im Node.js-Runtime (nicht in Edge-Runtime)
  if (process.env.NEXT_RUNTIME === "nodejs") {
    const { initCronJobs } = await import("./lib/cron");
    await initCronJobs();
  }
}
