import { Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import heroImg from "@/assets/hero-mansion.jpg";
import { EmberField } from "@/components/EmberField";
import { SectionHeading } from "@/components/SectionHeading";
import { books, reviews, BRAND } from "@/data/site";
import { useManhwa } from "@/store/manhwa";
import { useAuth } from "@/store/auth";
import { Eye, Star, BookOpen } from "lucide-react";

export function HomePage() {
  const featured = books.filter((b) => b.featured);
  const [active, setActive] = useState(0);
  const [mouse, setMouse] = useState({ x: 50, y: 50 });
  const { manhwa, chapters, progress } = useManhwa();
  const { user } = useAuth();

  const trendingManhwa = useMemo(() => [...manhwa].sort((a, b) => b.views - a.views).slice(0, 4), [manhwa]);
  const latestChapters = useMemo(
    () => [...chapters].sort((a, b) => +new Date(b.releaseDate) - +new Date(a.releaseDate)).slice(0, 5),
    [chapters],
  );
  const continueList = useMemo(() => {
    if (!user) return [];
    return Object.entries(progress[user.id] ?? {})
      .sort((a, b) => b[1].ts - a[1].ts)
      .map(([mid, p]) => ({ m: manhwa.find((x) => x.id === mid), p }))
      .filter((x): x is { m: NonNullable<typeof x.m>; p: typeof x.p } => !!x.m)
      .slice(0, 4);
  }, [user, progress, manhwa]);

  useEffect(() => {
    if (!featured.length) return;
    const id = setInterval(() => setActive((a) => (a + 1) % featured.length), 5500);
    return () => clearInterval(id);
  }, [featured.length]);

  return (
    <>
      {/* HERO */}
      <section
        className="relative grain min-h-screen overflow-hidden flex items-center justify-center"
        onMouseMove={(e) => {
          const r = e.currentTarget.getBoundingClientRect();
          setMouse({ x: ((e.clientX - r.left) / r.width) * 100, y: ((e.clientY - r.top) / r.height) * 100 });
        }}
      >
        <div className="absolute inset-0">
          <img src={heroImg} alt="" className="h-full w-full object-cover animate-slow-zoom opacity-90" />
          <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-background/40 to-background" />
          <div
            className="absolute inset-0 transition-[background] duration-300"
            style={{ background: `radial-gradient(600px circle at ${mouse.x}% ${mouse.y}%, oklch(0.62 0.24 28 / 0.25), transparent 60%)` }}
          />
        </div>
        <EmberField count={50} />

        <div className="relative z-10 mx-auto max-w-6xl px-6 text-center">
          <div className="flex items-center justify-center gap-3 mb-8">
            <span className="h-px w-12 bg-flame animate-flicker" />
            <p className="font-tech text-[10px] uppercase tracking-[0.5em] text-flame">Welcome to the universe // MMXXV</p>
            <span className="h-px w-12 bg-flame animate-flicker" />
          </div>

          <h1 className="font-display leading-[0.82] tracking-tight text-ivory text-glow-flame">
            <span className="block text-[9vw] md:text-[5.5rem] opacity-90">THE HOUSE OF</span>
            <span className="block text-[18vw] md:text-[13rem] text-flame text-glow-flame mt-2">MIDAS PEN</span>
          </h1>

          <p className="mt-8 font-luxury italic text-lg md:text-2xl text-steel tracking-wider">A Cinematic Storytelling Mansion</p>
          <p className="mx-auto mt-6 max-w-xl font-sans text-sm md:text-base text-ivory/70 leading-relaxed">
            Cinematic dark fantasy novels. Editorial luxury cover design. A futuristic universe where every page burns and every cover breathes.
          </p>

          <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-5">
            <Link to="/books" className="magnetic-glow group inline-flex items-center gap-3 rounded-full border border-flame bg-flame/15 px-9 py-4 font-tech text-xs uppercase tracking-[0.3em] text-ivory glow-flame-sm">
              Enter the Library <span className="text-flame transition-transform group-hover:translate-x-1">→</span>
            </Link>
            <Link to="/covers" className="magnetic-glow inline-flex items-center gap-3 rounded-full border border-ivory/20 px-9 py-4 font-tech text-xs uppercase tracking-[0.3em] text-ivory/90 hover:border-ivory/60">
              View Cover Vault
            </Link>
          </div>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-3">
          <p className="font-tech text-[9px] uppercase tracking-[0.4em] text-steel">Scroll</p>
          <div className="h-12 w-px bg-gradient-to-b from-flame to-transparent" />
        </div>
      </section>

      {/* MARQUEE */}
      <section className="border-y border-flame/15 bg-obsidian py-6 overflow-hidden">
        <div className="flex animate-marquee whitespace-nowrap">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="flex items-center gap-16 px-8">
              {["Dark Fantasy", "Cinematic Romance", "Cyber Noir", "Mafia", "Werewolf Sagas", "Editorial Cover Design", "House of Midas Pen"].map((t) => (
                <span key={t} className="font-display text-2xl tracking-[0.3em] text-ivory/60 flex items-center gap-16">
                  {t}
                  <span className="h-1 w-1 rounded-full bg-flame" />
                </span>
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* MANHWA UNIVERSE */}
      <section className="relative py-32 px-6 overflow-hidden border-b border-flame/10">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 h-96 w-[600px] gradient-radial-ember opacity-20 blur-3xl" />
        <div className="mx-auto max-w-7xl relative">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeading eyebrow="// The Manhwa Vault" title="Trending in the universe." subtitle="Step into the cinematic manhwa wing of the mansion." />
            <Link to="/manhwa" className="font-tech text-xs uppercase tracking-widest text-flame hover:text-glow-flame">Enter the Archive →</Link>
          </div>

          {continueList.length > 0 && (
            <div className="mt-12">
              <p className="font-tech text-[10px] uppercase tracking-[0.4em] text-flame mb-4">// Continue Reading</p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {continueList.map(({ m, p }) => (
                  <Link key={m.id} to="/manhwa/$id/$chapter" params={{ id: m.id, chapter: p.chapterId }} className="group glass-dark rounded-xl border border-flame/20 overflow-hidden hover:border-flame/60 transition-all">
                    <div className="relative aspect-[3/2] overflow-hidden">
                      <img src={m.cover} alt={m.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                      <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/40 to-transparent" />
                      <div className="absolute bottom-2 left-3 right-3">
                        <p className="font-display text-sm tracking-widest text-ivory truncate">{m.title}</p>
                        <div className="mt-1 h-1 rounded-full bg-flame/20 overflow-hidden">
                          <div className="h-full bg-flame" style={{ width: `${Math.round(p.pct)}%` }} />
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          <div className="mt-12">
            <p className="font-tech text-[10px] uppercase tracking-[0.4em] text-flame mb-4">// Trending Now</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {trendingManhwa.map((m, i) => (
                <Link key={m.id} to="/manhwa/$id" params={{ id: m.id }} className="group relative block">
                  <span className="absolute -top-3 -left-3 z-10 grid place-items-center w-10 h-10 rounded-full border border-flame bg-obsidian font-display text-flame text-2xl glow-flame-sm">{i + 1}</span>
                  <div className="relative overflow-hidden rounded-2xl border border-flame/20 glass-dark aspect-[2/3]">
                    <img src={m.cover} alt={m.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                    <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/30 to-transparent" />
                    <div className="absolute bottom-0 inset-x-0 p-4">
                      <p className="font-tech text-[9px] uppercase tracking-[0.3em] text-flame">{m.status}</p>
                      <p className="mt-1 font-display text-lg tracking-widest text-ivory">{m.title}</p>
                      <div className="mt-1 flex gap-3 font-tech text-[9px] text-ivory/70 uppercase tracking-widest">
                        <span className="flex items-center gap-1"><Eye className="w-3 h-3 text-flame" /> {(m.views / 1000).toFixed(1)}k</span>
                        <span className="flex items-center gap-1"><Star className="w-3 h-3 text-flame" /> {m.rating.toFixed(1)}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          <div className="mt-14">
            <p className="font-tech text-[10px] uppercase tracking-[0.4em] text-flame mb-4">// Latest Chapters</p>
            <div className="glass-dark rounded-2xl border border-flame/20 divide-y divide-flame/10">
              {latestChapters.map((c) => {
                const m = manhwa.find((x) => x.id === c.manhwaId);
                if (!m) return null;
                return (
                  <Link key={c.id} to="/manhwa/$id/$chapter" params={{ id: m.id, chapter: c.id }} className="flex items-center gap-4 p-4 hover:bg-flame/5 transition-colors group">
                    <img src={m.cover} alt={m.title} className="w-12 h-16 object-cover rounded-md border border-flame/20" />
                    <div className="flex-1 min-w-0">
                      <p className="font-display text-base tracking-widest text-ivory truncate group-hover:text-flame transition-colors">{m.title}</p>
                      <p className="font-sans text-xs text-steel truncate">Ch. {c.number} — {c.title}</p>
                    </div>
                    <span className="hidden sm:inline-flex items-center gap-1 font-tech text-[10px] uppercase tracking-widest text-flame whitespace-nowrap">
                      <BookOpen className="w-3 h-3" /> Read
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* FEATURED BOOKS */}
      <section className="relative py-32 px-6 overflow-hidden">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeading eyebrow="// Featured From The Vault" title="Three stories. One universe." subtitle="Cinematic novels currently lit and burning across reader platforms." />
            <Link to="/books" className="font-tech text-xs uppercase tracking-widest text-flame hover:text-glow-flame">View All Books →</Link>
          </div>

          <div className="relative mt-16">
            <div className="relative h-[640px] md:h-[560px]">
              {featured.map((b, i) => {
                const isActive = i === active;
                const offset = i - active;
                return (
                  <article key={b.title} className="absolute inset-0 transition-all duration-1000 ease-[cubic-bezier(0.2,0.8,0.2,1)]"
                    style={{ opacity: isActive ? 1 : 0, transform: `translateX(${offset * 60}px) scale(${isActive ? 1 : 0.95})`, filter: isActive ? "blur(0)" : "blur(8px)", pointerEvents: isActive ? "auto" : "none", zIndex: isActive ? 10 : 1 }}>
                    <div className="glass-dark relative grid md:grid-cols-[1fr_1.4fr] gap-10 p-8 md:p-12 border border-flame/20 rounded-2xl overflow-hidden">
                      <div className="relative aspect-[2/3] overflow-hidden rounded-lg border border-flame/30 glow-flame">
                        <img src={b.cover} alt={b.title} className="h-full w-full object-cover" />
                        <div className="absolute inset-0 bg-gradient-to-t from-obsidian/80 via-transparent to-transparent" />
                      </div>
                      <div className="relative flex flex-col justify-center">
                        <p className="font-tech text-[10px] uppercase tracking-[0.4em] text-flame">{b.genre}</p>
                        <h3 className="mt-3 font-display text-4xl md:text-6xl text-ivory tracking-wider leading-[0.9]">{b.title}</h3>
                        <div className="mt-4 flex items-center gap-3 text-flame text-glow-flame">
                          {Array.from({ length: 5 }).map((_, idx) => (<span key={idx} className={idx < Math.round(b.rating) ? "" : "text-steel/30"}>★</span>))}
                          <span className="font-tech text-[10px] text-steel">{b.rating} • {b.reviews.toLocaleString()} reviews</span>
                        </div>
                        <p className="mt-6 font-luxury italic text-base md:text-lg text-ivory/80 leading-relaxed max-w-xl">"{b.blurb}"</p>
                        <div className="mt-6 flex flex-wrap gap-2">
                          {b.tropes.slice(0, 4).map((t) => (<span key={t} className="font-tech text-[9px] uppercase tracking-widest text-ivory/70 border border-flame/20 rounded-full px-3 py-1">{t}</span>))}
                        </div>
                        <div className="mt-8">
                          <p className="font-tech text-[9px] uppercase tracking-[0.4em] text-steel mb-3">Read on</p>
                          <div className="flex flex-wrap gap-2">
                            {b.platforms.map((p) => (
                              <a key={p.name} href={p.url} target="_blank" rel="noreferrer" className="group inline-flex items-center gap-2 rounded-full border border-ivory/15 bg-ivory/5 px-4 py-1.5 font-tech text-[10px] uppercase tracking-widest text-ivory hover:border-flame hover:bg-flame/10 hover:text-flame transition-all">
                                {p.name} <span className="opacity-50 group-hover:opacity-100">↗</span>
                              </a>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
            <div className="mt-8 flex items-center justify-center gap-3">
              {featured.map((_, i) => (
                <button key={i} onClick={() => setActive(i)} aria-label={`Slide ${i + 1}`}
                  className={`h-1.5 rounded-full transition-all ${i === active ? "w-12 bg-flame glow-flame-sm" : "w-6 bg-ivory/20 hover:bg-ivory/40"}`} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* MANIFESTO */}
      <section className="relative py-32 px-6 border-y border-flame/10 bg-gradient-to-b from-background via-obsidian to-background overflow-hidden">
        <EmberField count={20} />
        <div className="relative mx-auto max-w-4xl text-center">
          <p className="font-tech text-[10px] uppercase tracking-[0.5em] text-flame mb-8">// Manifesto</p>
          <blockquote className="font-luxury italic text-3xl md:text-5xl text-ivory leading-[1.2]">
            "We don't write stories. We forge cinematic relics for worlds that refuse to be quiet."
          </blockquote>
          <p className="mt-8 font-tech text-xs tracking-[0.3em] text-steel">— THE HOUSE OF MIDAS PEN</p>
        </div>
      </section>

      {/* REVIEWS PREVIEW */}
      <section className="relative py-32 px-6 bg-obsidian/50 overflow-hidden">
        <div className="mx-auto max-w-7xl">
          <SectionHeading eyebrow="// Signal from readers" title="Whispered in the dark." align="center" />
          <div className="mt-16 grid gap-6 md:grid-cols-3">
            {reviews.slice(0, 3).map((r) => (
              <div key={r.name} className="glass-dark p-8 rounded-xl border border-flame/10 hover:border-flame/40 hover:-translate-y-1 transition-all">
                <div className="flex gap-1 text-flame text-glow-flame">{Array.from({ length: r.rating }).map((_, i) => (<span key={i}>★</span>))}</div>
                <p className="mt-5 font-luxury italic text-ivory/90 leading-relaxed">"{r.text}"</p>
                <div className="mt-6 pt-6 border-t border-border/50">
                  <p className="font-display tracking-widest text-ivory">{r.name}</p>
                  <p className="font-tech text-[10px] uppercase tracking-[0.3em] text-flame mt-1">{r.ref}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-12 flex flex-wrap justify-center gap-4">
            <Link to="/reviews" className="font-tech text-xs uppercase tracking-widest text-flame hover:text-glow-flame">All reviews →</Link>
            <a href={BRAND.reviewUrl} target="_blank" rel="noreferrer" className="magnetic-glow inline-flex items-center gap-3 rounded-full border border-flame/60 bg-flame/10 px-7 py-2 font-tech text-[11px] uppercase tracking-widest text-ivory hover:bg-flame/20 hover:glow-flame-sm">
              Leave a Review →
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
