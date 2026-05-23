import portrait from "@/assets/author-portrait.jpg";
import { SectionHeading } from "@/components/SectionHeading";
import { EmberField } from "@/components/EmberField";
import { ABOUT_STATS, ABOUT_PILLARS } from "@/data/site";

export function AboutPage() {
  return (
    <section className="relative pt-40 pb-32 px-6 overflow-hidden">
      <EmberField count={25} />
      <div className="absolute -top-20 right-0 h-[60vh] w-[60vw] gradient-radial-ember opacity-30 blur-3xl" />

      <div className="relative mx-auto max-w-7xl grid gap-16 lg:grid-cols-[1fr_1.2fr] items-center">
        <div className="relative">
          <div className="relative aspect-[4/5] overflow-hidden rounded-lg border border-flame/30 glow-flame">
            <img src={portrait} alt="The House of Midas Pen" loading="lazy" className="h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-transparent to-transparent" />
          </div>
          <div className="absolute -bottom-6 -right-6 glass-dark rounded-lg px-5 py-3 border border-flame/30">
            <p className="font-tech text-[10px] uppercase tracking-[0.4em] text-flame">Est. MMXXV</p>
            <p className="font-display text-xl tracking-wider text-ivory">House of Midas Pen</p>
          </div>
        </div>

        <div>
          <SectionHeading eyebrow="// The Mansion" title="Story is the only true light." />

          <div className="mt-10 space-y-6 font-sans text-base text-ivory/80 leading-relaxed">
            <p>
              We are <span className="text-flame font-semibold">The House of Midas Pen</span> — a cinematic
              storytelling studio of authors, cover designers and story architects. We build worlds
              that feel like film: lit with intention, paced like a long held breath, ending with a quiet detonation.
            </p>
            <p>
              Our work lives in the dark — fantasy, mafia, werewolf, sci-fi, romance with edges. The
              covers we design aren't decorative. They're cinematic relics: fog, ember, depth, and a
              single emotional cut you can feel before you read a single word.
            </p>
            <p>
              We write and design from the same place: a belief that <span className="font-luxury italic text-ivory">stories
              forged in fire</span> are the ones that survive the scroll.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-3 gap-6 border-t border-border pt-8">
            {ABOUT_STATS.map((s) => (
              <div key={s.label}>
                <p className="font-display text-4xl text-flame text-glow-flame">{s.value}</p>
                <p className="mt-2 font-tech text-[10px] uppercase tracking-[0.3em] text-steel">{s.label}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 grid sm:grid-cols-2 gap-4">
            {ABOUT_PILLARS.map((c) => (
              <div key={c.title} className="glass-dark rounded-lg p-5 border border-flame/15 hover:border-flame/40 transition-colors">
                <p className="font-tech text-[10px] uppercase tracking-[0.4em] text-flame">{c.title}</p>
                <p className="mt-2 font-sans text-sm text-ivory/80">{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
