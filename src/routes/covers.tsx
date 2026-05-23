import { useState } from "react";
import { SectionHeading } from "@/components/SectionHeading";
import { EmberField } from "@/components/EmberField";
import { coverPortfolio, categories, BRAND } from "@/data/site";

export function CoversPage() {
  const [filter, setFilter] = useState<string>("All Covers");
  const [open, setOpen] = useState<number | null>(null);

  const filtered = filter === "All Covers"
    ? coverPortfolio
    : coverPortfolio.filter((c) => c.category === filter || c.tags.includes(filter));

  return (
    <>
      <section className="relative pt-40 pb-16 px-6 border-b border-flame/10 overflow-hidden">
        <EmberField count={18} />
        <div className="relative mx-auto max-w-7xl">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeading eyebrow="// Cover Vault" title="Designed like film posters." subtitle="A cinematic gallery built with light, fog, depth and intention. Hover to feel the heat." />
            <a href={BRAND.whatsapp} target="_blank" rel="noreferrer" className="magnetic-glow group relative inline-flex items-center gap-3 rounded-full border border-flame bg-flame/15 px-7 py-3 font-tech text-xs uppercase tracking-[0.3em] text-ivory glow-flame-sm animate-pulse-glow">
              <span className="relative grid h-7 w-7 place-items-center rounded-full bg-flame/30 text-flame">✦</span>
              Book a Cover
              <span className="text-flame group-hover:translate-x-1 transition-transform">→</span>
            </a>
          </div>
          <div className="mt-12 flex flex-wrap gap-2">
            {categories.map((c) => (
              <button key={c} onClick={() => setFilter(c)} className={`rounded-full px-5 py-2 font-tech text-[10px] uppercase tracking-[0.3em] border transition-all ${filter === c ? "border-flame bg-flame/15 text-ivory glow-flame-sm" : "border-border text-steel hover:border-flame/40 hover:text-ivory"}`}>{c}</button>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-6">
        <div className="mx-auto max-w-7xl">
          {filtered.length === 0 ? (
            <p className="text-center font-luxury italic text-steel py-20">No covers in this genre yet — request one below.</p>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 auto-rows-[20rem] md:auto-rows-[26rem]">
              {filtered.map((c, i) => (
                <button key={c.id} onClick={() => setOpen(c.id)} className={`group relative overflow-hidden rounded-lg border border-border bg-card text-left animate-in fade-in zoom-in-95 duration-700 ${i % 5 === 0 ? "lg:row-span-2" : ""}`} style={{ animationDelay: `${i * 70}ms` }}>
                  <img src={c.image} alt={c.title} loading="lazy" className="absolute inset-0 h-full w-full object-cover transition-all duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/30 to-transparent opacity-90 group-hover:opacity-100 transition-opacity" />
                  <div className="absolute inset-0 border-2 border-flame opacity-0 group-hover:opacity-100 transition-opacity glow-flame rounded-lg" />
                  <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-2 group-hover:translate-y-0 transition-transform">
                    <p className="font-tech text-[9px] uppercase tracking-[0.3em] text-flame">{c.category}</p>
                    <h3 className="font-display text-2xl tracking-wider text-ivory mt-1">{c.title}</h3>
                  </div>
                  <span className="absolute top-4 right-4 font-tech text-[10px] text-ivory/80 rounded-full bg-obsidian/60 px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity">EXPAND ↗</span>
                </button>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="relative py-24 px-6 border-y border-flame/10 bg-obsidian/60 overflow-hidden">
        <EmberField count={15} />
        <div className="relative mx-auto max-w-4xl text-center">
          <p className="font-tech text-[10px] uppercase tracking-[0.5em] text-flame mb-6">// Commission</p>
          <h2 className="font-display text-4xl md:text-6xl text-ivory tracking-tight leading-[0.95]">Your story, framed in fire.</h2>
          <p className="mt-6 font-luxury italic text-steel max-w-xl mx-auto">Book your cinematic cover directly. Conversations open on WhatsApp.</p>
          <a href={BRAND.whatsapp} target="_blank" rel="noreferrer" className="magnetic-glow group mt-10 inline-flex items-center gap-3 rounded-full border border-flame bg-flame/15 px-9 py-4 font-tech text-xs uppercase tracking-[0.3em] text-ivory glow-flame-sm">
            Book a Cover on WhatsApp <span className="text-flame group-hover:translate-x-1 transition-transform">→</span>
          </a>
        </div>
      </section>

      {open !== null && (
        <div onClick={() => setOpen(null)} className="fixed inset-0 z-[100] grid place-items-center bg-background/95 backdrop-blur-xl p-6 animate-in fade-in duration-300">
          <button onClick={() => setOpen(null)} className="absolute top-6 right-6 rounded-full border border-flame/40 bg-flame/10 px-4 py-2 font-tech text-[10px] uppercase tracking-widest text-ivory hover:bg-flame/25 hover:glow-flame-sm">CLOSE ✕</button>
          {coverPortfolio.filter((c) => c.id === open).map((c) => (
            <div key={c.id} onClick={(e) => e.stopPropagation()} className="grid md:grid-cols-2 gap-12 max-w-5xl items-center animate-in zoom-in-95 duration-500">
              <img src={c.image} alt={c.title} className="w-full max-h-[80vh] object-contain glow-flame rounded-lg" />
              <div>
                <p className="font-tech text-[10px] uppercase tracking-[0.4em] text-flame">{c.category}</p>
                <h3 className="mt-3 font-display text-5xl text-ivory tracking-wider">{c.title}</h3>
                <p className="mt-6 font-luxury italic text-lg text-steel leading-relaxed">"{c.description}"</p>
                <a href={BRAND.whatsapp} target="_blank" rel="noreferrer" className="mt-8 inline-flex items-center gap-3 rounded-full border border-flame bg-flame/15 px-7 py-3 font-tech text-xs uppercase tracking-widest text-ivory hover:bg-flame/25 hover:glow-flame-sm">
                  Book a Similar Cover →
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
