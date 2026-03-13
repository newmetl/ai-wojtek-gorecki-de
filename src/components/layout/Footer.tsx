import Link from "next/link";
import { Linkedin, Mail } from "lucide-react";

const year = new Date().getFullYear();

const footerLinks = {
  navigation: [
    { label: "Home", href: "/" },
    { label: "Tools", href: "/tools" },
    { label: "About this Page", href: "/about" },
    { label: "About Me", href: "/cv" },
    { label: "Kontakt", href: "/kontakt" },
  ],
  tools: [
    { label: "Trending AI Tech", href: "/tools/trending-ai" },
    { label: "AI Use Cases", href: "/tools/ai-use-cases" },
    { label: "Prompt Library", href: "/tools/prompt-library" },
    { label: "User Story Generator", href: "/tools/user-story-generator" },
  ],
  legal: [
    { label: "Impressum", href: "/impressum" },
    { label: "Datenschutz", href: "/datenschutz" },
  ],
};

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#1E293B] mt-auto">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-1 group w-fit">
              <span className="font-mono font-bold text-lg text-primary group-hover:text-primary/80 transition-colors">
                ai.
              </span>
              <span className="font-semibold text-foreground text-base">
                wojtek&#8209;gorecki.de
              </span>
            </Link>
            <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
              Tools und Ressourcen für Product Owner und Digitalexperten.
            </p>
            {/* Social Links */}
            <div className="mt-4 flex items-center gap-3">
              <a
                href="https://www.linkedin.com/in/wojtek-gorecki/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-4 w-4" />
              </a>
              <a
                href="mailto:kontakt@wojtek-gorecki.de"
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="E-Mail"
              >
                <Mail className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-xs font-semibold text-foreground uppercase tracking-wider mb-4">
              Navigation
            </h3>
            <ul className="space-y-2.5">
              {footerLinks.navigation.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Tools */}
          <div>
            <h3 className="text-xs font-semibold text-foreground uppercase tracking-wider mb-4">
              Tools
            </h3>
            <ul className="space-y-2.5">
              {footerLinks.tools.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-xs font-semibold text-foreground uppercase tracking-wider mb-4">
              Rechtliches
            </h3>
            <ul className="space-y-2.5">
              {footerLinks.legal.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-10 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-muted-foreground">
            © {year} Wojtek Gorecki. Alle Rechte vorbehalten.
          </p>
          <p className="text-xs text-muted-foreground">
            Gebaut mit{" "}
            <a
              href="https://nextjs.org"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-foreground transition-colors"
            >
              Next.js
            </a>
            {" & "}
            <a
              href="https://anthropic.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-foreground transition-colors"
            >
              Claude
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
