import { Link } from "@tanstack/react-router";
import { BRAND } from "@/data/site";

const links = [
  { l: "Home",    to: "/" },
  { l: "Books",   to: "/books" },
  { l: "Covers",  to: "/covers" },
  { l: "Manhwa",  to: "/manhwa" },
  { l: "Reviews", to: "/reviews" },
  { l: "About",   to: "/about" },
] as const;

export function SiteFooter() {
  return (
    <footer className="relative overflow-hidden border-t border-flame/20 bg-gradient-to-b from-background to-obsidian">
      <div className="absolute inset-x-0 top-0 ember-line" />
      <div className="absolute -top-32 left-1/2 h-64 w-[80%] -translate-x-1/2 gradient-radial-ember opacity-40 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-6 py-20">
        <div className="grid gap-12 md:grid-cols-3">
          <div>
            <h3 className="font-display text-3xl tracking-[0.2em] text-ivory">
              THE HOUSE OF<br /><span className="text-flame text-glow-flame">MIDAS PEN</span>
            </h3>
            <p className="mt-4 font-tech text-[10px] uppercase text-flame tracking-[0.3em]">
              {BRAND.tagline}
            </p>
            <p className="mt-6 max-w-sm font-luxury text-sm italic text-steel leading-relaxed">
              "Stories forged in fire. Covers carved from cinema."
            </p>
          </div>

          <div>
            <p className="font-tech text-[10px] uppercase text-flame mb-5 tracking-[0.3em]">Navigate</p>
            <ul className="grid grid-cols-2 gap-3">
              {links.map((l) => (
                <li key={l.l}>
                  <Link to={l.to} className="font-display text-base tracking-widest text-ivory/80 hover:text-flame transition-colors">
                    {l.l}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="font-tech text-[10px] uppercase text-flame mb-5 tracking-[0.3em]">Connect</p>
            <ul className="space-y-3 font-sans text-sm text-ivory/80">
              <li><a href={`mailto:${BRAND.email}`} className="hover:text-flame transition-colors">{BRAND.email}</a></li>
              <li><a href={BRAND.whatsapp} target="_blank" rel="noreferrer" className="hover:text-flame transition-colors">WhatsApp — Book a Cover</a></li>
              <li><a href={BRAND.instagram} className="hover:text-flame transition-colors">Instagram — @midas.pen</a></li>
              <li><a href={BRAND.goodreads} className="hover:text-flame transition-colors">Goodreads — House Page</a></li>
            </ul>
          </div>
        </div>

        <div className="mt-20 border-t border-border/40 pt-8 flex flex-col items-center gap-3">
          <p className="font-tech text-[10px] uppercase tracking-[0.4em] text-steel/60">
            © {new Date().getFullYear()} The House of Midas Pen. All rights reserved.
          </p>
          <span className="font-luxury text-xs italic text-steel/50 tracking-wider">
            {BRAND.credit}
          </span>
        </div>
      </div>
    </footer>
  );
}
