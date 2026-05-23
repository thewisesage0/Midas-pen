import { SectionHeading } from "@/components/SectionHeading";
import { EmberField } from "@/components/EmberField";
import { reviews, BRAND } from "@/data/site";

export function ReviewsPage() {
  return (
    <>
      <section className="relative pt-40 pb-16 px-6 overflow-hidden border-b border-flame/10">
        <EmberField count={25} />
        <div className="relative mx-auto max-w-7xl">
          <div className="flex flex-wrap items-end justify-between gap-8">
            <SectionHeading eyebrow="// Signal from readers" title="Whispered in the dark." subtitle="Voices echoing through the cinematic halls of The House of Midas Pen." />
            <a href={BRAND.reviewUrl} target="_blank" rel="noreferrer" className="magnetic-glow group relative inline-flex items-center gap-3 rounded-full border border-flame bg-flame/15 px-8 py-4 font-tech text-xs uppercase tracking-[0.3em] text-ivory glow-flame-sm animate-pulse-glow">
              <span className="relative grid h-7 w-7 place-items-center rounded-full bg-flame/30 text-flame">★</span>
              Leave a Review
              <span className="text-flame group-hover:translate-x-1 transition-transform">→</span>
            </a>
          </div>
        </div>
      </section>

      <section className="py-24 px-6 overflow-hidden">
        <div className="mx-auto max-w-7xl">
          <div className="flex animate-marquee gap-6 whitespace-nowrap mb-16">
            {[...reviews, ...reviews].map((r, i) => (
              <div key={i} className="inline-flex items-center gap-4 glass-dark rounded-full border border-flame/15 px-8 py-4 shrink-0">
                <span className="text-flame">★★★★★</span>
                <span className="font-luxury italic text-ivory/80 text-sm">"{r.text.slice(0, 60)}..."</span>
                <span className="font-tech text-[10px] text-flame uppercase tracking-widest">— {r.name}</span>
              </div>
            ))}
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {reviews.map((r, i) => (
              <article key={r.name} className="group relative glass-dark p-8 rounded-xl border border-flame/15 hover:border-flame/50 hover:-translate-y-2 transition-all duration-500 animate-in fade-in slide-in-from-bottom-4" style={{ animationDelay: `${i * 80}ms` }}>
                <div className="absolute -top-px left-8 right-8 h-px bg-gradient-to-r from-transparent via-flame to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="flex justify-between items-start">
                  <div className="flex gap-1 text-flame text-glow-flame">
                    {Array.from({ length: r.rating }).map((_, idx) => (<span key={idx} className="inline-block animate-in zoom-in-50" style={{ animationDelay: `${idx * 100}ms` }}>★</span>))}
                  </div>
                  <span className="font-tech text-[10px] text-steel">N° {String(i + 1).padStart(2, "0")}</span>
                </div>
                <p className="mt-6 font-luxury italic text-lg text-ivory leading-relaxed">"{r.text}"</p>
                <div className="mt-8 pt-6 border-t border-border/50 flex items-center justify-between">
                  <p className="font-display tracking-widest text-ivory">{r.name}</p>
                  <p className="font-tech text-[9px] uppercase tracking-[0.3em] text-flame">{r.ref}</p>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-20 text-center">
            <p className="font-luxury italic text-steel text-lg mb-6">Have a story to share from inside the universe?</p>
            <a href={BRAND.reviewUrl} target="_blank" rel="noreferrer" className="magnetic-glow group inline-flex items-center gap-3 rounded-full border border-flame bg-flame/15 px-10 py-4 font-tech text-xs uppercase tracking-[0.3em] text-ivory glow-flame">
              Leave a Review on Google <span className="text-flame group-hover:translate-x-1 transition-transform">→</span>
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
