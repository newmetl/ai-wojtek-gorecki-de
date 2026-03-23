"use client";

import { useState } from "react";

export default function ContactForm() {
  const endpoint = process.env.NEXT_PUBLIC_FORMSPREE_ENDPOINT ?? "#";
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    const form = e.currentTarget;
    const res = await fetch(endpoint, {
      method: "POST",
      body: new FormData(form),
      headers: { Accept: "application/json" },
    });
    if (res.ok) {
      setStatus("success");
      form.reset();
    } else {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="bg-[#1d2634]/40 backdrop-blur-2xl p-8 md:p-12 rounded-xl border border-primary/20 shadow-[0_0_50px_rgba(0,240,255,0.05)] relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-bl from-primary/[0.04] via-transparent to-transparent pointer-events-none" />
        <div className="relative z-10 flex flex-col items-start gap-4">
          <span className="text-3xl">✓</span>
          <p className="font-headline text-[#e8eefc] text-lg font-bold">Nachricht erhalten.</p>
          <p className="text-[#a5abb8] text-sm">Ich melde mich so schnell wie möglich bei dir.</p>
          <button
            onClick={() => setStatus("idle")}
            className="mt-2 font-headline text-[10px] tracking-widest text-primary uppercase hover:text-secondary transition-colors"
          >
            Neue Nachricht schreiben
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#1d2634]/40 backdrop-blur-2xl p-8 md:p-12 rounded-xl border border-primary/20 shadow-[0_0_50px_rgba(0,240,255,0.05)] relative overflow-hidden">
      {/* Full-card gradient accent */}
      <div className="absolute inset-0 bg-gradient-to-bl from-primary/[0.04] via-transparent to-transparent pointer-events-none" />

      <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
        {/* Name + E-Mail grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-2 group">
            <label
              htmlFor="name"
              className="block font-headline text-[10px] tracking-widest text-[#a5abb8] uppercase ml-1 group-focus-within:text-primary transition-colors"
            >
              Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              autoComplete="name"
              placeholder="Dein Name"
              className="w-full bg-[#1d2634]/50 border-0 border-b border-[#424853]/30 py-3 px-4 focus:border-primary focus:ring-0 text-[#e8eefc] text-sm placeholder:text-[#6f7682]/40 font-headline tracking-tight outline-none transition-colors"
            />
          </div>

          <div className="space-y-2 group">
            <label
              htmlFor="email"
              className="block font-headline text-[10px] tracking-widest text-[#a5abb8] uppercase ml-1 group-focus-within:text-primary transition-colors"
            >
              E-Mail
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              autoComplete="email"
              placeholder="deine@email.de"
              className="w-full bg-[#1d2634]/50 border-0 border-b border-[#424853]/30 py-3 px-4 focus:border-primary focus:ring-0 text-[#e8eefc] text-sm placeholder:text-[#6f7682]/40 font-headline tracking-tight outline-none transition-colors"
            />
          </div>
        </div>

        {/* Betreff */}
        <div className="space-y-2 group">
          <label
            htmlFor="subject"
            className="block font-headline text-[10px] tracking-widest text-[#a5abb8] uppercase ml-1 group-focus-within:text-primary transition-colors"
          >
            Betreff
          </label>
          <input
            id="subject"
            name="subject"
            type="text"
            placeholder="Worum geht es?"
            className="w-full bg-[#1d2634]/50 border-0 border-b border-[#424853]/30 py-3 px-4 focus:border-primary focus:ring-0 text-[#e8eefc] text-sm placeholder:text-[#6f7682]/40 font-headline tracking-tight outline-none transition-colors"
          />
        </div>

        {/* Nachricht */}
        <div className="space-y-2 group">
          <label
            htmlFor="message"
            className="block font-headline text-[10px] tracking-widest text-[#a5abb8] uppercase ml-1 group-focus-within:text-primary transition-colors"
          >
            Nachricht
          </label>
          <textarea
            id="message"
            name="message"
            required
            rows={5}
            placeholder="Deine Nachricht..."
            className="w-full bg-[#1d2634]/50 border-0 border-b border-[#424853]/30 py-3 px-4 focus:border-primary focus:ring-0 text-[#e8eefc] text-sm placeholder:text-[#6f7682]/40 font-headline tracking-tight outline-none transition-colors resize-none"
          />
        </div>

        {status === "error" && (
          <p className="text-sm text-red-400 font-headline">
            Etwas ist schiefgelaufen. Bitte versuche es erneut oder schreib mir direkt per E-Mail.
          </p>
        )}

        {/* Submit */}
        <div className="pt-2">
          <button
            type="submit"
            disabled={status === "loading"}
            className="group relative w-full md:w-auto overflow-hidden rounded-lg bg-gradient-to-br from-primary to-[#00deec] px-12 py-4 font-headline font-bold tracking-widest text-[#003f43] text-sm uppercase hover:shadow-[0_0_30px_rgba(0,240,255,0.4)] transition-all duration-300 active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            <span className="relative z-10">
              {status === "loading" ? "Wird gesendet…" : "Nachricht senden"}
            </span>
            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
          </button>
        </div>
      </form>
    </div>
  );
}
