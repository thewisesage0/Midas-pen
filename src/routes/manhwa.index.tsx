import { Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { EmberField } from "@/components/EmberField";
import { SectionHeading } from "@/components/SectionHeading";
import { AuthGateway } from "@/components/AuthGateway";
import { useManhwa } from "@/store/manhwa";
import { useAuth } from "@/store/auth";
import { BookOpen, Bookmark, Eye, Star, Search } from "lucide-react";

export function ManhwaListPage() {
  const { manhwa, chapters, library, progress } = useManhwa();
  const { user } = useAuth();
  const [q, setQ] = useState("");
  const [genre, setGenre] = useState<string>("All");

  if (!user) return <AuthGateway />;

  const genres = useMemo(() => {
    const s = new Set<string>();
    manhwa.forEach((m) => m.genres.forEach((g) => s.add(g)));
    return ["All", ...Array.from(s)];
  }, [manhwa]);

  const filtered = useMemo(() => {
    const term = q.trim().toLowerCase();
    return manhwa.filter((m) => {
      if (genre !== "All" && !m.genres.includes(genre)) return false;
      if (!term) return true;
      return m.title.toLowerCase().includes(term) || m.blurb.toLowerCase().includes(term) || m.genres.some((g) => g.toLowerCase().includes(term)) || m.tags.some((t) => t.toLowerCase().includes(term));
    });
  }, [manhwa, q, genre]);

  const trending = [...manhwa].sort((a, b) => b.views - a.views).slice(0, 4);
  const featured = manhwa[0];
  const latest = [...chapters].sort((a, b) => +new Date(b.releaseDate) - +new Date(a.releaseDate)).slice(0, 6);
  const savedIds = library[user.id] ?? [];
  const continueList = Object.entries(progress[user.id] ?? {})
    .sort((a, b) => b[1].ts - a[1].ts)
    .map(([mid, p]) => ({ m: manhwa.find((x) => x.id === mid), p }))
    .filter((x): x is { m: NonNullable<typeof x.m>; p: typeof x.p } => !!x.m);

  return (
    <div className="relative min-h-screen pt-32 pb-24 overflow-hidden">
      {featured && (
        <section className="relative mx-auto max-w-7xl px-6 mb-20">
          <div className="relative overflow-hidden rounded-3xl border border-flame/20 glass-dark grain">
            <div className="absolute inset-0 animate-slow-zoom opacity-60" style={{ backgroundImage: `url(${featured.banner ?? featured.cover})`, backgroundSize: "cover", backgroundPosition: "center" }} />
            <div className="absolute inset-0 bg-gradient-to-r from-obsidian via-obsidian/80 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-transparent to-transparent" />
            <EmberField count={30} />
            <div className="relative grid md:grid-cols-2 gap-10 p-10 md:p-16 min-h-[60vh] items-center">
              <div>
                <p className="font-tech text-[10px] uppercase tracking-[0.5em] text-flame animate-flicker">// Featured Manhwa</p>
                <h1 className="mt-4 font-display text-6xl md:text-8xl text-ivory leading-[0.9] text-glow-flame">{featured.title}</h1>
                <p className="mt-5 font-luxury italic text-lg text-ivory/80 max-w-xl">{featured.blurb}</p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {featured.genres.map((g) => (<span key={g} className="rounded-full glass-dark border border-flame/30 px-3 py-1 font-tech text-[10px] uppercase tracking-[0.25em] text-ivory/80">{g}</span>))}
                </div>
                <div className="mt-8 flex gap-3">
                  <Link to="/manhwa/$id" params={{ id: featured.id }} className="magnetic-glow inline-flex items-center gap-2 rounded-full border border-flame bg-flame/20 px-6 py-3 font-tech text-[10px] uppercase tracking-widest text-ivory hover:bg-flame/30 hover:glow-flame-sm transition-all">
                    <BookOpen className="w-4 h-4" /> Read Now
                  </Link>
                  <Link to="/manhwa/$id" params={{ id: featured.id }} className="rounded-full border border-flame/30 px-6 py-3 font-tech text-[10px] uppercase tracking-widest text-ivory/80 hover:text-ivory">Explore</Link>
                </div>
              </div>
              <div className="hidden md:block relative">
                <img src={featured.cover} alt={featured.title} className="mx-auto h-[60vh] w-auto object-cover rounded-2xl shadow-[0_30px_60px_-20px_rgba(255,42,26,0.5)] border border-flame/30" />
              </div>
            </div>
          </div>
        </section>
      )}

      <section className="mx-auto max-w-7xl px-6 mb-12">
        <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center">
          <div className="flex-1 glass-dark rounded-full border border-flame/30 px-5 py-3 flex items-center gap-3">
            <Search className="w-4 h-4 text-flame" />
            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search titles, genres, tags…" className="flex-1 bg-transparent outline-none font-sans text-sm text-ivory placeholder:text-steel/60" />
          </div>
          <div className="flex flex-wrap gap-2">
            {genres.map((g) => (
              <button key={g} onClick={() => setGenre(g)} className={`rounded-full border px-4 py-2 font-tech text-[10px] uppercase tracking-[0.25em] transition-all ${genre === g ? "border-flame bg-flame/20 text-ivory glow-flame-sm" : "border-flame/20 text-steel hover:text-ivory hover:border-flame/40"}`}>{g}</button>
            ))}
          </div>
        </div>
      </section>

      {continueList.length > 0 && (
        <section className="mx-auto max-w-7xl px-6 mb-16">
          <SectionHeading eyebrow="Continue Reading" title="Pick Up Where You Stopped" />
          <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-5">
            {continueList.slice(0, 4).map(({ m, p }) => (
              <Link key={m.id} to="/manhwa/$id/$chapter" params={{ id: m.id, chapter: p.chapterId }} className="group">
                <div className="relative overflow-hidden rounded-xl border border-flame/20 glass-dark">
                  <img src={m.cover} alt={m.title} className="w-full h-56 object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute bottom-0 inset-x-0 h-1 bg-flame/30">
                    <div className="h-full bg-flame" style={{ width: `${Math.min(100, p.pct)}%` }} />
                  </div>
                </div>
                <p className="mt-3 font-display text-sm tracking-widest text-ivory group-hover:text-flame transition-colors">{m.title}</p>
              </Link>
            ))}
          </div>
        </section>
      )}

      <section className="mx-auto max-w-7xl px-6 mb-16">
        <SectionHeading eyebrow="Trending Now" title="Burning the Charts" />
        <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-6">
          {trending.map((m, i) => (
            <Link key={m.id} to="/manhwa/$id" params={{ id: m.id }} className="group relative">
              <span className="absolute -top-3 -left-3 z-10 grid place-items-center w-10 h-10 rounded-full border border-flame bg-obsidian font-display text-flame text-2xl glow-flame-sm">{i + 1}</span>
              <div className="relative overflow-hidden rounded-2xl border border-flame/20 glass-dark aspect-[2/3]">
                <img src={m.cover} alt={m.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-transparent to-transparent" />
                <div className="absolute bottom-0 inset-x-0 p-4">
                  <p className="font-display text-lg tracking-widest text-ivory">{m.title}</p>
                  <div className="mt-1 flex gap-3 font-tech text-[9px] text-flame uppercase tracking-widest">
                    <span className="flex items-center gap-1"><Eye className="w-3 h-3" /> {(m.views / 1000).toFixed(1)}k</span>
                    <span className="flex items-center gap-1"><Star className="w-3 h-3" /> {m.rating.toFixed(1)}</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 mb-20">
        <SectionHeading eyebrow="The Archive" title={genre === "All" ? "All Manhwa" : genre} />
        {filtered.length === 0 ? (
          <p className="mt-10 font-sans text-sm text-steel">No manhwa match your search.</p>
        ) : (
          <div className="mt-10 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filtered.map((m) => (
              <Link key={m.id} to="/manhwa/$id" params={{ id: m.id }} className="group block">
                <div className="relative overflow-hidden rounded-2xl border border-flame/20 glass-dark aspect-[2/3]">
                  <img src={m.cover} alt={m.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-obsidian/95 via-obsidian/30 to-transparent" />
                  {savedIds.includes(m.id) && (
                    <span className="absolute top-3 right-3 grid place-items-center w-8 h-8 rounded-full bg-flame/80 text-ivory">
                      <Bookmark className="w-4 h-4 fill-current" />
                    </span>
                  )}
                  <div className="absolute bottom-0 inset-x-0 p-4">
                    <p className="font-tech text-[9px] uppercase tracking-[0.3em] text-flame">{m.status}</p>
                    <p className="mt-1 font-display text-lg tracking-widest text-ivory">{m.title}</p>
                    <p className="mt-1 font-sans text-[11px] text-ivory/60 line-clamp-2">{m.blurb}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>

      <section className="mx-auto max-w-7xl px-6">
        <SectionHeading eyebrow="Latest Chapters" title="Fresh From the Press" />
        <div className="mt-8 glass-dark rounded-2xl border border-flame/20 divide-y divide-flame/10">
          {latest.map((c) => {
            const m = manhwa.find((x) => x.id === c.manhwaId);
            if (!m) return null;
            return (
              <Link key={c.id} to="/manhwa/$id/$chapter" params={{ id: m.id, chapter: c.id }} className="flex items-center gap-4 p-4 hover:bg-flame/5 transition-colors group">
                <img src={m.cover} alt={m.title} className="w-14 h-20 object-cover rounded-md border border-flame/20" />
                <div className="flex-1 min-w-0">
                  <p className="font-display text-base tracking-widest text-ivory truncate group-hover:text-flame transition-colors">{m.title}</p>
                  <p className="font-sans text-xs text-steel truncate">Ch. {c.number} — {c.title}</p>
                </div>
                <p className="font-tech text-[10px] uppercase tracking-widest text-flame whitespace-nowrap">{new Date(c.releaseDate).toLocaleDateString()}</p>
              </Link>
            );
          })}
        </div>
      </section>
    </div>
  );
}
