import { Link, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { useAuth } from "@/store/auth";
import { useManhwa } from "@/store/manhwa";
import { EmberField } from "@/components/EmberField";
import { Bookmark, BookOpen, Clock } from "lucide-react";

export function LibraryPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { manhwa, library, progress, downloads } = useManhwa();

  useEffect(() => {
    if (!user) navigate({ to: "/auth" });
  }, [user, navigate]);

  if (!user) return null;

  const savedIds = library[user.id] ?? [];
  const saved = manhwa.filter((m) => savedIds.includes(m.id));
  const prog = Object.entries(progress[user.id] ?? {})
    .sort((a, b) => b[1].ts - a[1].ts)
    .map(([mid, p]) => ({ m: manhwa.find((x) => x.id === mid), p }))
    .filter((x): x is { m: NonNullable<typeof x.m>; p: typeof x.p } => !!x.m);
  const myDownloads = downloads.filter((d) => savedIds.includes(d.manhwaId));

  return (
    <section className="relative min-h-screen pt-32 pb-24 px-6 overflow-hidden">
      <EmberField count={30} />
      <div className="relative mx-auto max-w-7xl">
        <p className="font-tech text-[10px] uppercase tracking-[0.5em] text-flame">// Personal Library</p>
        <h1 className="mt-3 font-display text-6xl md:text-8xl text-ivory text-glow-flame">{user.name.split(" ")[0]}'s Vault</h1>
        <p className="mt-3 font-luxury italic text-lg text-ivory/70">Your saved stories, continued where you stopped.</p>

        <div className="mt-12">
          <h2 className="font-display text-2xl text-ivory tracking-widest flex items-center gap-2"><Clock className="w-5 h-5 text-flame" /> Continue Reading</h2>
          {prog.length === 0 ? (
            <p className="mt-4 text-sm text-steel">No reading progress yet.</p>
          ) : (
            <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-5">
              {prog.map(({ m, p }) => (
                <Link key={m.id} to="/manhwa/$id/$chapter" params={{ id: m.id, chapter: p.chapterId }} className="group">
                  <div className="relative overflow-hidden rounded-xl border border-flame/20 glass-dark">
                    <img src={m.cover} alt={m.title} className="w-full h-60 object-cover transition-transform duration-700 group-hover:scale-110" />
                    <div className="absolute bottom-0 inset-x-0 h-1 bg-flame/30">
                      <div className="h-full bg-flame" style={{ width: `${Math.min(100, p.pct)}%` }} />
                    </div>
                  </div>
                  <p className="mt-2 font-display text-sm tracking-widest text-ivory group-hover:text-flame">{m.title}</p>
                  <p className="font-tech text-[10px] text-steel uppercase">{Math.round(p.pct)}% read</p>
                </Link>
              ))}
            </div>
          )}
        </div>

        <div className="mt-16">
          <h2 className="font-display text-2xl text-ivory tracking-widest flex items-center gap-2"><Bookmark className="w-5 h-5 text-flame" /> Saved</h2>
          {saved.length === 0 ? (
            <p className="mt-4 text-sm text-steel">You haven't saved any manhwa yet. <Link to="/manhwa" className="text-flame">Browse the archive →</Link></p>
          ) : (
            <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-5">
              {saved.map((m) => (
                <Link key={m.id} to="/manhwa/$id" params={{ id: m.id }} className="group block">
                  <div className="relative overflow-hidden rounded-xl border border-flame/20 glass-dark aspect-[2/3]">
                    <img src={m.cover} alt={m.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  </div>
                  <p className="mt-2 font-display text-sm tracking-widest text-ivory group-hover:text-flame">{m.title}</p>
                </Link>
              ))}
            </div>
          )}
        </div>

        {myDownloads.length > 0 && (
          <div className="mt-16">
            <h2 className="font-display text-2xl text-ivory tracking-widest flex items-center gap-2"><BookOpen className="w-5 h-5 text-flame" /> Downloads</h2>
            <div className="mt-4 glass-dark rounded-2xl border border-flame/20 divide-y divide-flame/10">
              {myDownloads.map((d) => (
                <a key={d.id} href={d.url} className="flex items-center justify-between p-4 hover:bg-flame/5">
                  <span className="font-display text-sm tracking-widest text-ivory">{d.name}</span>
                  <span className="font-tech text-[10px] uppercase tracking-widest text-flame">{d.format}</span>
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
