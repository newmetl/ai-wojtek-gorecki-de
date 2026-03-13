"use client";

export default function ContactForm() {
  // Formspree-Endpoint aus env (NEXT_PUBLIC_ nicht nötig da Server-seitig verarbeitet)
  // Im MVP: plain HTML form POST zu Formspree
  const endpoint = process.env.NEXT_PUBLIC_FORMSPREE_ENDPOINT ?? "#";

  return (
    <form
      action={endpoint}
      method="POST"
      className="space-y-5"
    >
      {/* Name */}
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-foreground mb-1.5">
          Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          autoComplete="name"
          placeholder="Dein Name"
          className="w-full rounded-lg border border-white/10 bg-card px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/60 outline-none transition-colors focus:border-primary/50 focus:ring-2 focus:ring-primary/20"
        />
      </div>

      {/* E-Mail */}
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-foreground mb-1.5">
          E-Mail
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="email"
          placeholder="deine@email.de"
          className="w-full rounded-lg border border-white/10 bg-card px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/60 outline-none transition-colors focus:border-primary/50 focus:ring-2 focus:ring-primary/20"
        />
      </div>

      {/* Nachricht */}
      <div>
        <label htmlFor="message" className="block text-sm font-medium text-foreground mb-1.5">
          Nachricht
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          placeholder="Deine Nachricht..."
          className="w-full rounded-lg border border-white/10 bg-card px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/60 outline-none transition-colors focus:border-primary/50 focus:ring-2 focus:ring-primary/20 resize-none"
        />
      </div>

      {/* Formspree Redirect (optional) */}
      <input type="hidden" name="_next" value="https://ai.wojtek-gorecki.de/kontakt?sent=1" />

      {/* Submit */}
      <button
        type="submit"
        className="w-full rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-primary/25 transition-all hover:bg-primary/90 hover:shadow-primary/40 hover:-translate-y-0.5 active:translate-y-0"
      >
        Nachricht senden
      </button>
    </form>
  );
}
