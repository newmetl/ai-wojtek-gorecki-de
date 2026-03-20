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

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="relative group">
            <label htmlFor="password" className="block font-headline text-[10px] text-[#6f7682] uppercase tracking-[0.2em] mb-2 group-focus-within:text-primary transition-colors">
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
              className="w-full bg-[#1d2634]/40 border-0 border-b-2 border-[#6f7682]/20 focus:border-primary focus:ring-0 text-[#e8eefc] text-sm py-4 transition-all duration-300 placeholder:text-[#6f7682]/40 outline-none"
            />
          </div>

          {error && (
            <p className="text-[#ff716c] text-sm">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary text-[#003f43] font-headline font-bold text-sm tracking-widest py-4 px-8 rounded-md transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(0,240,255,0.4)] active:scale-95 uppercase disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:shadow-none"
          >
            {loading ? "Anmeldung läuft…" : "Anmelden"}
          </button>
        </form>
      </div>
    </div>
  );
}
