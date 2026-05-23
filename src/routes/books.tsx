import { useMemo, useState } from "react";
import { SectionHeading } from "@/components/SectionHeading";
import { EmberField } from "@/components/EmberField";
import { books, type Book } from "@/data/site";

function highlight(text: string, q: string) {
  if (!q) return <>{text}</>;
  const parts = text.split(new RegExp(`(${q.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`, "ig"));
  return (
    <>
      {parts.map((p, i) =>
        p.toLowerCase() === q.toLowerCase()
          ? <mark key={i} className="bg-flame/30 text-flame text-glow-flame px-0.5 rounded-sm">{p}</mark>
          : <span key={i}>{p}</span>
      )}
    </>
  );
}

export function BooksPage() {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState<Book | null>(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return books;
    return books.filter((b) =>
      [b.title, b.genre, b.blurb, ...b.tags, ...b.tropes].some((f) => f.toLowerCase().includes(q))
    );
  }, [query]);

  return (
    <>
      <section className="relative pt-40 pb-12 px-6 overflow-hidden border-b border-flame/10">
        <EmberField count={20} />
        <div className="relative mx-auto max-w-7xl">
          <SectionHeading eyebrow="// The Library" title="Books from the dark." subtitle="Each story is built like a film: paced, lit, and layered. Step inside and let them burn." />
          <div className="relative mt-12 max-w-2xl">
            <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-flame/40 via-transparent to-flame/40 opacity-60 blur-lg" />
            <div className="relative glass-dark rounded-full border border-flame/30 flex items-center gap-3 px-6 py-4">
              <span className="text-flame">⌕</span>
              <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search by title, genre, trope or keyword…" className="flex-1 bg-transparent outline-none font-sans text-sm text-ivory placeholder:text-steel/60" />
              {query && (<button onClick={() => setQuery("")} className="font-tech text-[10px] uppercase tracking-widest text-steel hover:text-flame">Clear</button>)}
              <span className="font-tech text-[10px] uppercase tracking-widest text-flame">{filtered.length} / {books.length}</span>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-6">
        <div className="mx-auto max-w-7xl">
          {filtered.length === 0 ? (
            <p className="text-center font-luxury italic text-steel py-20">No stories match that signal.</p>
          ) : (
            <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((book, i) => (
                <article key={book.title} className="group relative animate-in fade-in slide-in-from-bottom-4 duration-700" style={{ animationDelay: `${i * 80}ms` }}>
                  <div className="relative aspect-[2/3] overflow-hidden rounded-lg border border-flame/20 bg-card">
                    <img src={book.cover} alt={book.title} loading="lazy" className="h-full w-full object-cover transition-all duration-700 group-hover:scale-110" />
                    <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/20 to-transparent" />
                    <div className="absolute inset-0 border-2 border-flame opacity-0 group-hover:opacity-100 transition-opacity glow-flame rounded-lg" />
                    <span className="absolute top-4 left-4 font-tech text-[10px] text-flame bg-obsidian/70 rounded px-2 py-1">N° {String(i + 1).padStart(2, "0")}</span>
                    <span className="absolute top-4 right-4 font-tech text-[10px] text-ivory bg-flame/80 rounded px-2 py-1">★ {book.rating}</span>
                  </div>
                  <div className="mt-5">
                    <p className="font-tech text-[10px] uppercase tracking-[0.3em] text-flame">{book.genre}</p>
                    <h3 className="mt-2 font-display text-2xl tracking-wider text-ivory group-hover:text-flame transition-colors">{highlight(book.title, query)}</h3>
                    <div className="mt-4 flex gap-3">
                      <a href={book.platforms[0]?.url ?? "#"} target="_blank" rel="noreferrer" className="flex-1 text-center rounded-full border border-flame bg-flame/10 px-4 py-2 font-tech text-[10px] uppercase tracking-widest text-ivory hover:bg-flame/25 hover:glow-flame-sm transition-all">Read Now →</a>
                      <button onClick={() => setOpen(book)} className="flex-1 rounded-full border border-ivory/15 px-4 py-2 font-tech text-[10px] uppercase tracking-widest text-ivory/80 hover:border-flame hover:text-flame transition-all">View More</button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      {open && (
        <div onClick={() => setOpen(null)} className="fixed inset-0 z-[100] grid place-items-center bg-background/90 backdrop-blur-2xl p-4 md:p-10 animate-in fade-in duration-300">
          <button onClick={() => setOpen(null)} className="absolute top-6 right-6 rounded-full border border-flame/40 bg-flame/10 px-4 py-2 font-tech text-[10px] uppercase tracking-widest text-ivory hover:bg-flame/25 z-10">CLOSE ✕</button>
          <div onClick={(e) => e.stopPropagation()} className="glass-dark relative w-full max-w-5xl rounded-2xl border border-flame/30 p-6 md:p-10 grid md:grid-cols-[1fr_1.4fr] gap-10 max-h-[90vh] overflow-y-auto animate-in zoom-in-95 duration-500">
            <EmberField count={12} />
            <div className="relative aspect-[2/3] overflow-hidden rounded-lg border border-flame/40 glow-flame">
              <img src={open.cover} alt={open.title} className="h-full w-full object-cover" />
            </div>
            <div className="relative">
              <p className="font-tech text-[10px] uppercase tracking-[0.4em] text-flame">{open.genre}</p>
              <h3 className="mt-3 font-display text-4xl md:text-5xl text-ivory tracking-wider leading-[0.9]">{open.title}</h3>
              <div className="mt-4 flex items-center gap-3 text-flame text-glow-flame">
                {Array.from({ length: 5 }).map((_, i) => (<span key={i} className={i < Math.round(open.rating) ? "" : "text-steel/30"}>★</span>))}
                <span className="font-tech text-[10px] text-steel">{open.rating} • {open.reviews.toLocaleString()} reviews</span>
              </div>
              <p className="mt-6 font-luxury italic text-lg text-ivory/85 leading-relaxed">"{open.blurb}"</p>
              <div className="mt-6">
                <p className="font-tech text-[9px] uppercase tracking-[0.4em] text-steel mb-3">Tropes</p>
                <div className="flex flex-wrap gap-2">{open.tropes.map((t) => (<span key={t} className="font-tech text-[10px] uppercase tracking-widest text-ivory/80 border border-flame/30 rounded-full px-3 py-1">{t}</span>))}</div>
              </div>
              <div className="mt-8">
                <p className="font-tech text-[9px] uppercase tracking-[0.4em] text-steel mb-3">Read on platforms</p>
                <div className="flex flex-wrap gap-2">
                  {open.platforms.map((p) => (<a key={p.name} href={p.url} target="_blank" rel="noreferrer" className="group inline-flex items-center gap-2 rounded-full border border-flame/40 bg-flame/10 px-4 py-2 font-tech text-[10px] uppercase tracking-widest text-ivory hover:bg-flame/25 hover:glow-flame-sm transition-all">{p.name} <span className="text-flame">↗</span></a>))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
