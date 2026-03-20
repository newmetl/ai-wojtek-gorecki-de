import Link from "next/link";

const year = new Date().getFullYear();

const footerLinks = [
  { label: "Trending AI", href: "/trending-ai" },
  { label: "Blog", href: "/blog" },
  { label: "About Me", href: "/cv" },
  { label: "Kontakt", href: "/kontakt" },
  { label: "Impressum", href: "/impressum" },
  { label: "Datenschutz", href: "/datenschutz" },
];

export default function Footer() {
  return (
    <footer className="w-full border-t border-[#424853]/15 bg-[#080f18] mt-auto">
      <div className="flex flex-col md:flex-row justify-between items-center px-6 md:px-12 py-16 gap-8 max-w-[1440px] mx-auto">
        <Link
          href="/"
          className="font-headline text-lg font-bold tracking-tighter hover:opacity-80 transition-opacity"
        >
          <span className="text-primary">ai.</span>
          <span className="text-foreground">wojtek&#8209;gorecki.de</span>
        </Link>

        <div className="flex flex-wrap justify-center gap-8 font-headline text-[10px] tracking-[0.2em] uppercase">
          {footerLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-foreground/40 hover:text-primary transition-colors duration-300"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="font-headline text-[10px] tracking-[0.2em] uppercase text-foreground/30">
          © {year} Wojtek Gorecki
        </div>
      </div>
    </footer>
  );
}
