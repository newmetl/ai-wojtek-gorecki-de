"use client";

export default function ContactForm() {
  const endpoint = process.env.NEXT_PUBLIC_FORMSPREE_ENDPOINT ?? "#";

  return (
    <div className="bg-[#1d2634]/40 backdrop-blur-2xl p-8 md:p-12 rounded-xl border border-primary/20 shadow-[0_0_50px_rgba(0,240,255,0.05)] relative overflow-hidden">
      {/* Full-card gradient accent */}
      <div className="absolute inset-0 bg-gradient-to-bl from-primary/[0.04] via-transparent to-transparent pointer-events-none" />

      <form action={endpoint} method="POST" className="space-y-8 relative z-10">
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

        <input type="hidden" name="_next" value="https://ai.wojtek-gorecki.de/kontakt?sent=1" />

        {/* Submit */}
        <div className="pt-2">
          <button
            type="submit"
            className="group relative w-full md:w-auto overflow-hidden rounded-lg bg-gradient-to-br from-primary to-[#00deec] px-12 py-4 font-headline font-bold tracking-widest text-[#003f43] text-sm uppercase hover:shadow-[0_0_30px_rgba(0,240,255,0.4)] transition-all duration-300 active:scale-95"
          >
            <span className="relative z-10">Nachricht senden</span>
            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
          </button>
        </div>
      </form>
    </div>
  );
}
