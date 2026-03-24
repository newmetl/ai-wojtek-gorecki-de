"use client";

import { useState, useEffect, useCallback } from "react";
import { RefreshCw, CheckCircle, XCircle, Clock, Play } from "lucide-react";

interface ScrapingLog {
  status: "running" | "success" | "error";
  runAt: string;
  itemsFound: number;
  itemsNew: number;
  itemsUpdated: number;
  durationMs: number | null;
  errorMessage: string | null;
  source: string;
}

function formatDuration(ms: number | null): string {
  if (!ms) return "—";
  if (ms < 1000) return `${ms}ms`;
  if (ms < 60000) return `${(ms / 1000).toFixed(1)}s`;
  return `${Math.round(ms / 60000)}min`;
}

function formatDate(dateStr: string): string {
  return new Intl.DateTimeFormat("de-DE", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(dateStr));
}

export default function ScrapingStatus() {
  const [log, setLog] = useState<ScrapingLog | null>(null);
  const [loading, setLoading] = useState(false);
  const [triggering, setTriggering] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchStatus = useCallback(async () => {
    try {
      const res = await fetch("/api/admin/scraping/trigger");
      const json = await res.json();
      if (json.success && json.data) {
        setLog(json.data as ScrapingLog);
      }
    } catch {
      // Stille Fehler beim Polling
    }
  }, []);

  // Initial laden
  useEffect(() => {
    setLoading(true);
    fetchStatus().finally(() => setLoading(false));
  }, [fetchStatus]);

  // Polling wenn Status "running"
  useEffect(() => {
    if (log?.status !== "running") return;
    const interval = setInterval(fetchStatus, 3000);
    return () => clearInterval(interval);
  }, [log?.status, fetchStatus]);

  const handleTrigger = async () => {
    setTriggering(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/scraping/trigger", { method: "POST" });
      const json = await res.json();
      if (!json.success) {
        setError(json.error?.message ?? "Unbekannter Fehler");
      } else {
        // Kurz warten, dann Status laden (damit der Log-Eintrag in DB ist)
        setTimeout(fetchStatus, 500);
      }
    } catch {
      setError("Netzwerkfehler beim Starten des Scrapings");
    } finally {
      setTriggering(false);
    }
  };

  const isRunning = log?.status === "running" || triggering;

  return (
    <div className="bg-surface-container-low rounded-xl p-5 mb-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <RefreshCw className="h-4 w-4 text-primary" />
          <h3 className="font-semibold text-on-surface text-sm">Scraping-Status</h3>
        </div>
        <button
          onClick={handleTrigger}
          disabled={isRunning}
          className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium bg-primary text-primary-foreground transition-all duration-300 hover:shadow-[0_0_20px_rgba(0,240,255,0.3)] disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none"
        >
          {isRunning ? (
            <>
              <RefreshCw className="h-3.5 w-3.5 animate-spin" />
              Scraping läuft…
            </>
          ) : (
            <>
              <Play className="h-3.5 w-3.5" />
              Jetzt scrapen
            </>
          )}
        </button>
      </div>

      {error && (
        <div className="text-sm text-red-400 bg-red-400/10 rounded-lg px-3 py-2 mb-3">
          {error}
        </div>
      )}

      {loading ? (
        <p className="text-sm text-on-surface-variant">Lade Status…</p>
      ) : log ? (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {/* Status */}
          <div className="bg-surface-container rounded-lg p-3">
            <p className="text-xs text-on-surface-variant mb-1">Status</p>
            <div className="flex items-center gap-1.5">
              {log.status === "success" && (
                <>
                  <CheckCircle className="h-4 w-4 text-accent shrink-0" />
                  <span className="text-sm font-medium text-accent">Erfolgreich</span>
                </>
              )}
              {log.status === "error" && (
                <>
                  <XCircle className="h-4 w-4 text-red-400 shrink-0" />
                  <span className="text-sm font-medium text-red-400">Fehler</span>
                </>
              )}
              {log.status === "running" && (
                <>
                  <RefreshCw className="h-4 w-4 text-primary animate-spin shrink-0" />
                  <span className="text-sm font-medium text-primary">Läuft…</span>
                </>
              )}
            </div>
            {log.status === "error" && log.errorMessage && (
              <p className="text-xs text-red-400/70 mt-1 truncate" title={log.errorMessage}>
                {log.errorMessage}
              </p>
            )}
          </div>

          {/* Letzter Lauf */}
          <div className="bg-surface-container rounded-lg p-3">
            <p className="text-xs text-on-surface-variant mb-1">Letzter Lauf</p>
            <div className="flex items-center gap-1.5">
              <Clock className="h-4 w-4 text-on-surface-variant shrink-0" />
              <span className="text-sm font-medium text-on-surface">
                {formatDate(log.runAt)}
              </span>
            </div>
            <p className="text-xs text-on-surface-variant mt-1">
              Dauer: {formatDuration(log.durationMs)}
            </p>
          </div>

          {/* Gefunden */}
          <div className="bg-surface-container rounded-lg p-3">
            <p className="text-xs text-on-surface-variant mb-1">Gefunden</p>
            <p className="text-2xl font-bold text-on-surface">{log.itemsFound}</p>
            <p className="text-xs text-on-surface-variant mt-0.5">Items gesamt</p>
          </div>

          {/* Neu / Aktualisiert */}
          <div className="bg-surface-container rounded-lg p-3">
            <p className="text-xs text-on-surface-variant mb-1">Ergebnis</p>
            <p className="text-sm font-medium text-on-surface">
              <span className="text-accent">+{log.itemsNew}</span> neu
            </p>
            <p className="text-xs text-on-surface-variant mt-0.5">{log.itemsUpdated} aktualisiert</p>
          </div>
        </div>
      ) : (
        <p className="text-sm text-on-surface-variant">
          Noch kein Scraping durchgeführt. Klicke auf &quot;Jetzt scrapen&quot; um zu starten.
        </p>
      )}

      <p className="text-xs text-on-surface-variant mt-3">
        🕐 Automatischer Lauf: Sonntags um 03:00 Uhr
      </p>
    </div>
  );
}
