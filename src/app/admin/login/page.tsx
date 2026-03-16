"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Lock } from "lucide-react";

export default function AdminLoginPage() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    const result = await signIn("credentials", {
      password,
      redirect: false,
    });
    setLoading(false);
    if (result?.ok) {
      router.push("/admin");
    } else {
      setError("Falsches Passwort. Bitte erneut versuchen.");
    }
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mb-4">
            <Lock className="h-6 w-6 text-primary" />
          </div>
          <h1 className="text-xl font-semibold text-foreground">Admin-Login</h1>
          <p className="text-muted text-sm mt-1">ai.wojtek-gorecki.de</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-surface border border-border rounded-xl p-6 space-y-4">
          <div>
            <label htmlFor="password" className="block text-sm text-foreground mb-2">
              Passwort
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Admin-Passwort eingeben"
              required
              autoFocus
              className="w-full px-3 py-2 bg-background border border-border rounded-lg text-foreground placeholder:text-muted text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
          </div>

          {error && (
            <p className="text-red-400 text-sm">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary hover:bg-primary-hover text-white py-2 px-4 rounded-lg text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Anmeldung läuft…" : "Anmelden"}
          </button>
        </form>
      </div>
    </div>
  );
}
