import { Link } from "@tanstack/react-router";
import { useManhwa } from "@/store/manhwa";
import { BookOpen, Eye, MessageSquare, TrendingUp, Users, Layers } from "lucide-react";

function Stat({ label, value, icon: Icon, hint }: { label: string; value: string | number; icon: React.ElementType; hint?: string }) {
  return (
    <div className="relative glass-dark rounded-2xl border border-flame/20 p-5 magnetic-glow overflow-hidden">
      <div className="absolute -top-12 -right-12 w-32 h-32 gradient-radial-ember opacity-50 blur-2xl" />
      <div className="relative flex items-start justify-between">
        <div>
          <p className="font-tech text-[10px] uppercase tracking-[0.3em] text-flame">{label}</p>
          <p className="mt-2 font-display text-4xl text-ivory text-glow-flame">{value}</p>
          {hint && <p className="mt-1 font-sans text-[11px] text-steel">{hint}</p>}
        </div>
        <span className="grid place-items-center w-10 h-10 rounded-full border border-flame/40 bg-flame/10 text-flame">
          <Icon className="w-4 h-4" />
        </span>
      </div>
    </div>
  );
}

export function AdminDashboard() {
  const { manhwa, chapters, comments } = useManhwa();
  const totalViews = manhwa.reduce((a, m) => a + m.views, 0);
  const totalReaders = 4321 + comments.length * 7;
  const topSeries = [...manhwa].sort((a, b) => b.views - a.views).slice(0, 5);
  const recentUploads = [...chapters].sort((a, b) => +new Date(b.releaseDate) - +new Date(a.releaseDate)).slice(0, 5);
  const recentComments = [...comments].slice(0, 5);

  return (
    <div className="space-y-8">
      <header>
        <p className="font-tech text-[10px] uppercase tracking-[0.5em] text-flame animate-flicker">// Dashboard</p>
        <h1 className="mt-2 font-display text-5xl text-ivory text-glow-flame">Author Command Deck</h1>
        <p className="mt-2 font-luxury italic text-ivory/60">Real-time pulse of your storytelling universe.</p>
      </header>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <Stat label="Manhwa"      value={manhwa.length} icon={BookOpen} />
        <Stat label="Chapters"    value={chapters.length} icon={Layers} />
        <Stat label="Readers"     value={totalReaders.toLocaleString()} icon={Users} />
        <Stat label="Total Views" value={(totalViews / 1000).toFixed(1) + "k"} icon={Eye} />
        <Stat label="Comments"    value={comments.length} icon={MessageSquare} />
        <Stat label="Trending"    value={topSeries[0]?.title.split(" ")[0] ?? "—"} icon={TrendingUp} hint="Top series" />
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="glass-dark rounded-2xl border border-flame/20 p-6">
          <h2 className="font-display text-xl text-ivory tracking-widest mb-4">Top Series by Views</h2>
          <div className="space-y-3">
            {topSeries.map((m, i) => (
              <div key={m.id} className="flex items-center gap-3">
                <span className="font-display text-xl text-flame w-6">{i + 1}</span>
                <img src={m.cover} alt="" className="w-10 h-14 object-cover rounded border border-flame/20" />
                <div className="flex-1 min-w-0">
                  <p className="font-display text-sm tracking-widest text-ivory truncate">{m.title}</p>
                  <div className="mt-1 h-1.5 rounded-full bg-flame/10 overflow-hidden">
                    <div className="h-full bg-flame rounded-full" style={{ width: `${(m.views / (topSeries[0]?.views || 1)) * 100}%` }} />
                  </div>
                </div>
                <span className="font-tech text-[10px] text-steel whitespace-nowrap">{(m.views / 1000).toFixed(1)}k</span>
              </div>
            ))}
          </div>
        </div>

        <div className="glass-dark rounded-2xl border border-flame/20 p-6">
          <h2 className="font-display text-xl text-ivory tracking-widest mb-4">Recent Uploads</h2>
          <div className="space-y-3">
            {recentUploads.map((c) => {
              const m = manhwa.find((x) => x.id === c.manhwaId);
              return m ? (
                <Link key={c.id} to="/manhwa/$id/$chapter" params={{ id: m.id, chapter: c.id }} className="flex items-center gap-3 hover:text-flame transition-colors group">
                  <img src={m.cover} alt="" className="w-10 h-14 object-cover rounded border border-flame/20" />
                  <div className="flex-1 min-w-0">
                    <p className="font-display text-sm tracking-widest text-ivory truncate group-hover:text-flame">{m.title}</p>
                    <p className="font-sans text-xs text-steel">Ch. {c.number} — {c.title}</p>
                  </div>
                  <span className="font-tech text-[10px] text-steel whitespace-nowrap">{new Date(c.releaseDate).toLocaleDateString()}</span>
                </Link>
              ) : null;
            })}
          </div>
        </div>
      </div>

      <div className="glass-dark rounded-2xl border border-flame/20 p-6">
        <h2 className="font-display text-xl text-ivory tracking-widest mb-4">Recent Comments</h2>
        <div className="space-y-3">
          {recentComments.length === 0 && <p className="text-sm text-steel">No comments yet.</p>}
          {recentComments.map((c) => {
            const m = manhwa.find((x) => x.id === c.manhwaId);
            return (
              <div key={c.id} className="flex gap-3 rounded-xl border border-flame/10 bg-obsidian/40 p-3">
                <span className="grid place-items-center w-8 h-8 rounded-full border border-flame/40 bg-flame/10 font-tech text-[10px] text-flame shrink-0">{c.userName.slice(0,1).toUpperCase()}</span>
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-display text-sm tracking-widest text-ivory">{c.userName}</span>
                    <span className="font-tech text-[10px] text-steel">{m?.title}</span>
                  </div>
                  <p className="mt-0.5 font-sans text-xs text-ivory/70 line-clamp-1">{c.body}</p>
                </div>
              </div>
            );
          })}
        </div>
        <div className="mt-4">
          <Link to="/admin/comments" className="font-tech text-[10px] uppercase tracking-widest text-flame hover:text-glow-flame">Manage all comments →</Link>
        </div>
      </div>
    </div>
  );
}
