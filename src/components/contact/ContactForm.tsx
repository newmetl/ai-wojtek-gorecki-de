"use client";

export default function ContactForm() {
  const endpoint = process.env.NEXT_PUBLIC_FORMSPREE_ENDPOINT ?? "#";

  return (
    <form action={endpoint} method="POST" className="space-y-8">
      {/* Name */}
      <div className="relative group">
        <label htmlFor="name" className="block font-headline text-[10px] text-[#6f7682] uppercase tracking-[0.2em] mb-2 group-focus-within:text-primary transition-colors">
          Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          autoComplete="name"
          placeholder="Dein Name"
          className="w-full bg-[#1d2634]/40 border-0 border-b-2 border-[#6f7682]/20 focus:border-primary focus:ring-0 text-[#e8eefc] text-sm py-4 transition-all duration-300 placeholder:text-[#6f7682]/40 outline-none"
        />
      </div>

      {/* E-Mail */}
      <div className="relative group">
        <label htmlFor="email" className="block font-headline text-[10px] text-[#6f7682] uppercase tracking-[0.2em] mb-2 group-focus-within:text-primary transition-colors">
          E-Mail
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="email"
          placeholder="deine@email.de"
          className="w-full bg-[#1d2634]/40 border-0 border-b-2 border-[#6f7682]/20 focus:border-primary focus:ring-0 text-[#e8eefc] text-sm py-4 transition-all duration-300 placeholder:text-[#6f7682]/40 outline-none"
        />
      </div>

      {/* Nachricht */}
      <div className="relative group">
        <label htmlFor="message" className="block font-headline text-[10px] text-[#6f7682] uppercase tracking-[0.2em] mb-2 group-focus-within:text-primary transition-colors">
          Nachricht
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          placeholder="Deine Nachricht..."
          className="w-full bg-[#1d2634]/40 border-0 border-b-2 border-[#6f7682]/20 focus:border-primary focus:ring-0 text-[#e8eefc] text-sm py-4 transition-all duration-300 placeholder:text-[#6f7682]/40 outline-none resize-none"
        />
      </div>

      <input type="hidden" name="_next" value="https://ai.wojtek-gorecki.de/kontakt?sent=1" />

      {/* Submit */}
      <button
        type="submit"
        className="w-full bg-primary text-[#003f43] font-headline font-bold text-sm tracking-widest py-4 px-8 rounded-md transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(0,240,255,0.4)] active:scale-95 uppercase"
      >
        Nachricht senden
      </button>
    </form>
  );
}
