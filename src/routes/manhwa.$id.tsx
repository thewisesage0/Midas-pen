import { Link, useParams, useNavigate } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { EmberField } from "@/components/EmberField";
import { useManhwa } from "@/store/manhwa";
import { useAuth } from "@/store/auth";
import { Bookmark, BookOpen, Download, Eye, Star, Calendar, Pencil, Trash2, X, Check } from "lucide-react";

export function ManhwaDetailPage() {
  const { id } = useParams({ strict: false }) as { id: string };
  const navigate = useNavigate();
  const { manhwa, chapters, comments, downloads, library, toggleSave, addComment, updateComment, deleteComment, likeComment } = useManhwa();
  const { user } = useAuth();
  const m = manhwa.find((x) => x.id === id);
  const list = useMemo(() => chapters.filter((c) => c.manhwaId === id).sort((a, b) => a.number - b.number), [chapters, id]);
  const dls = downloads.filter((d) => d.manhwaId === id);
  const cm = comments.filter((c) => c.manhwaId === id && !c.chapterId);
  const reviewsWithRating = cm.filter((c) => typeof c.rating === "number");
  const avgRating = reviewsWithRating.length ? reviewsWithRating.reduce((s, c) => s + (c.rating ?? 0), 0) / reviewsWithRating.length : m?.rating ?? 0;
  const myReview = user ? cm.find((c) => c.userId === user.id && typeof c.rating === "number") : undefined;
  const [body, setBody] = useState("");
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [editId, setEditId] = useState<string | null>(null);
  const [editBody, setEditBody] = useState("");
  const [editRating, setEditRating] = useState(0);
  const saved = user ? (library[user.id] ?? []).includes(id) : false;

  if (!m) return (
    <div className="pt-40 px-6 text-center">
      <h1 className="font-display text-4xl text-ivory">Not found</h1>
      <Link to="/manhwa" className="mt-6 inline-block text-flame">← Back to library</Link>
    </div>
  );

  return (
    <div className="relative min-h-screen overflow-hidden">
      <section className="relative h-[60vh] min-h-[420px] overflow-hidden">
        <div className="absolute inset-0 animate-slow-zoom" style={{ backgroundImage: `url(${m.banner ?? m.cover})`, backgroundSize: "cover", backgroundPosition: "center" }} />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-obsidian/70 to-obsidian/40" />
        <EmberField count={30} />
      </section>

      <section className="relative -mt-48 mx-auto max-w-7xl px-6 pb-20">
        <div className="grid md:grid-cols-[280px_1fr] gap-10">
          <div className="relative">
            <img src={m.cover} alt={m.title} className="w-full rounded-2xl border border-flame/30 shadow-[0_30px_60px_-20px_rgba(255,42,26,0.5)]" />
            <div className="mt-4 flex gap-2">
              {list[0] && (
                <Link to="/manhwa/$id/$chapter" params={{ id: m.id, chapter: list[0].id }} className="flex-1 rounded-full border border-flame bg-flame/20 px-4 py-3 font-tech text-[10px] uppercase tracking-widest text-ivory text-center hover:bg-flame/30 hover:glow-flame-sm transition-all">
                  Start Reading
                </Link>
              )}
              <button
                onClick={() => user ? toggleSave(user.id, m.id) : navigate({ to: "/auth" })}
                className={`grid place-items-center w-12 h-12 rounded-full border transition-all ${saved ? "border-flame bg-flame/30 text-ivory glow-flame-sm" : "border-flame/40 text-ivory/80 hover:bg-flame/10"}`}
                aria-label="Save"
              >
                <Bookmark className={`w-4 h-4 ${saved ? "fill-current" : ""}`} />
              </button>
            </div>
          </div>

          <div>
            <p className="font-tech text-[10px] uppercase tracking-[0.4em] text-flame">// {m.status}</p>
            <h1 className="mt-3 font-display text-5xl md:text-7xl text-ivory leading-[0.9] text-glow-flame">{m.title}</h1>
            <p className="mt-3 font-tech text-[11px] uppercase tracking-[0.3em] text-ivory/60">By <span className="text-flame">The House of Midas Pen</span></p>
            <div className="mt-5 flex flex-wrap gap-4 font-tech text-xs text-ivory/70 uppercase tracking-widest">
              <span className="flex items-center gap-1.5"><Star className="w-3.5 h-3.5 text-flame" /> {m.rating.toFixed(1)}</span>
              <span className="flex items-center gap-1.5"><Eye className="w-3.5 h-3.5 text-flame" /> {(m.views / 1000).toFixed(1)}k views</span>
              <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5 text-flame" /> {m.year}</span>
              <span className="flex items-center gap-1.5"><BookOpen className="w-3.5 h-3.5 text-flame" /> {list.length} chapters</span>
            </div>
            <p className="mt-6 font-luxury italic text-lg text-ivory/85 max-w-3xl">{m.blurb}</p>
            <div className="mt-6 flex flex-wrap gap-2">
              {m.genres.map((g) => (<span key={g} className="rounded-full border border-flame/40 bg-flame/10 px-3 py-1 font-tech text-[10px] uppercase tracking-widest text-ivory/80">{g}</span>))}
              {m.tags.map((t) => (<span key={t} className="rounded-full border border-border px-3 py-1 font-tech text-[10px] uppercase tracking-widest text-steel">{t}</span>))}
            </div>
            {dls.length > 0 && (
              <div className="mt-6">
                <p className="font-tech text-[10px] uppercase tracking-[0.3em] text-flame mb-2">Downloads</p>
                <div className="flex flex-wrap gap-2">
                  {dls.map((d) => (<a key={d.id} href={d.url} className="inline-flex items-center gap-2 rounded-full border border-flame/40 bg-flame/10 px-4 py-2 font-tech text-[10px] uppercase tracking-widest text-ivory hover:bg-flame/20 transition-all"><Download className="w-3.5 h-3.5" /> {d.name} ({d.format})</a>))}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="mt-16">
          <h2 className="font-display text-3xl text-ivory tracking-widest">Chapters</h2>
          <div className="mt-6 grid gap-3">
            {list.map((c) => (
              <Link key={c.id} to="/manhwa/$id/$chapter" params={{ id: m.id, chapter: c.id }} className="group flex items-center gap-4 glass-dark rounded-xl border border-flame/15 p-4 hover:border-flame/60 hover:bg-flame/5 transition-all">
                <span className="font-display text-3xl text-flame w-14 text-center">{String(c.number).padStart(2, "0")}</span>
                <img src={c.thumbnail ?? c.panels[0] ?? m.cover} alt={c.title} loading="lazy" className="w-16 h-20 object-cover rounded-md border border-flame/20 group-hover:border-flame/60 transition-all" />
                <div className="flex-1 min-w-0">
                  <p className="font-display text-lg tracking-widest text-ivory group-hover:text-flame transition-colors truncate">{c.title}</p>
                  <p className="font-sans text-xs text-steel truncate">{c.description}</p>
                  <p className="mt-1 font-tech text-[10px] uppercase tracking-widest text-flame/70">{c.panels.length} panels</p>
                </div>
                <span className="font-tech text-[10px] text-steel uppercase tracking-widest whitespace-nowrap">{new Date(c.releaseDate).toLocaleDateString()}</span>
              </Link>
            ))}
            {list.length === 0 && <p className="p-6 text-steel text-sm">No chapters yet.</p>}
          </div>
        </div>

        <div className="mt-16">
          <div className="flex items-end justify-between flex-wrap gap-4">
            <h2 className="font-display text-3xl text-ivory tracking-widest">Reader Reviews</h2>
            <div className="flex items-center gap-3 glass-dark rounded-full border border-flame/30 px-5 py-2">
              <span className="font-display text-3xl text-flame text-glow-flame">{avgRating.toFixed(1)}</span>
              <div className="flex gap-0.5">{[1,2,3,4,5].map((s) => (<Star key={s} className={`w-4 h-4 ${s <= Math.round(avgRating) ? "fill-flame text-flame" : "text-steel/40"}`} />))}</div>
              <span className="font-tech text-[10px] uppercase tracking-widest text-steel">{reviewsWithRating.length} reviews</span>
            </div>
          </div>

          <div className="mt-6 glass-dark rounded-2xl border border-flame/20 p-6">
            {user ? (
              myReview ? (
                <p className="mb-6 text-sm text-steel">You've already left a review — edit or delete it below.</p>
              ) : (
                <div className="mb-6">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="font-tech text-[10px] uppercase tracking-widest text-flame">Your rating</span>
                    <div className="flex gap-1">
                      {[1,2,3,4,5].map((s) => (
                        <button key={s} type="button" onMouseEnter={() => setHover(s)} onMouseLeave={() => setHover(0)} onClick={() => setRating(s)} className="transition-transform hover:scale-110" aria-label={`Rate ${s}`}>
                          <Star className={`w-5 h-5 ${s <= (hover || rating) ? "fill-flame text-flame" : "text-steel/40"}`} />
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <textarea value={body} onChange={(e) => setBody(e.target.value)} placeholder="Share your thoughts…" className="flex-1 bg-obsidian/60 border border-flame/20 rounded-xl p-3 font-sans text-sm text-ivory placeholder:text-steel/60 outline-none focus:border-flame/60" rows={3} />
                    <button onClick={() => { if (!body.trim() || rating === 0) return; addComment({ manhwaId: m.id, userId: user.id, userName: user.name, body: body.trim(), rating, isAuthor: user.role === "admin" }); setBody(""); setRating(0); }} className="self-end rounded-full border border-flame bg-flame/20 px-5 py-2.5 font-tech text-[10px] uppercase tracking-widest text-ivory hover:bg-flame/30 transition-all">Post</button>
                  </div>
                </div>
              )
            ) : (
              <p className="mb-6 text-sm text-steel"><Link to="/auth" className="text-flame hover:underline">Sign in</Link> to leave a review.</p>
            )}

            <div className="space-y-4">
              {cm.length === 0 && <p className="text-sm text-steel">Be the first to review this manhwa.</p>}
              {cm.map((c) => {
                const isMine = user && c.userId === user.id;
                const isEditing = editId === c.id;
                return (
                  <div key={c.id} className="rounded-xl border border-flame/15 bg-obsidian/40 p-4 hover:border-flame/40 transition-all">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="grid place-items-center w-8 h-8 rounded-full border border-flame/40 bg-flame/10 font-tech text-[10px] text-flame">{c.userName.slice(0,1).toUpperCase()}</span>
                      <span className="font-display text-sm tracking-widest text-ivory">{c.userName}</span>
                      {c.isAuthor && (<span className="rounded-full border border-flame bg-flame/20 px-2 py-0.5 font-tech text-[9px] uppercase tracking-widest text-flame">Author</span>)}
                      {typeof c.rating === "number" && (<span className="flex gap-0.5">{[1,2,3,4,5].map((s) => (<Star key={s} className={`w-3 h-3 ${s <= c.rating! ? "fill-flame text-flame" : "text-steel/40"}`} />))}</span>)}
                      <span className="ml-auto font-tech text-[10px] text-steel">{new Date(c.createdAt).toLocaleDateString()}{c.updatedAt ? " · edited" : ""}</span>
                    </div>
                    {isEditing ? (
                      <div className="mt-3">
                        {typeof c.rating === "number" && (<div className="flex gap-1 mb-2">{[1,2,3,4,5].map((s) => (<button key={s} type="button" onClick={() => setEditRating(s)}><Star className={`w-4 h-4 ${s <= editRating ? "fill-flame text-flame" : "text-steel/40"}`} /></button>))}</div>)}
                        <textarea value={editBody} onChange={(e) => setEditBody(e.target.value)} rows={3} className="w-full bg-obsidian/60 border border-flame/20 rounded-xl p-3 font-sans text-sm text-ivory outline-none focus:border-flame/60" />
                        <div className="mt-2 flex gap-2">
                          <button onClick={() => { updateComment(c.id, { body: editBody.trim(), ...(typeof c.rating === "number" ? { rating: editRating } : {}) }); setEditId(null); }} className="inline-flex items-center gap-1 rounded-full border border-flame bg-flame/20 px-4 py-1.5 font-tech text-[10px] uppercase tracking-widest text-ivory hover:bg-flame/30"><Check className="w-3 h-3" /> Save</button>
                          <button onClick={() => setEditId(null)} className="inline-flex items-center gap-1 rounded-full border border-flame/30 px-4 py-1.5 font-tech text-[10px] uppercase tracking-widest text-steel hover:text-ivory"><X className="w-3 h-3" /> Cancel</button>
                        </div>
                      </div>
                    ) : (
                      <p className="mt-2 font-sans text-sm text-ivory/85">{c.body}</p>
                    )}
                    {!isEditing && (
                      <div className="mt-3 flex items-center gap-3">
                        <button onClick={() => likeComment(c.id)} className="font-tech text-[10px] uppercase tracking-widest text-steel hover:text-flame">♥ {c.likes}</button>
                        {isMine && (
                          <>
                            <button onClick={() => { setEditId(c.id); setEditBody(c.body); setEditRating(c.rating ?? 0); }} className="inline-flex items-center gap-1 font-tech text-[10px] uppercase tracking-widest text-steel hover:text-flame"><Pencil className="w-3 h-3" /> Edit</button>
                            <button onClick={() => deleteComment(c.id)} className="inline-flex items-center gap-1 font-tech text-[10px] uppercase tracking-widest text-steel hover:text-flame"><Trash2 className="w-3 h-3" /> Delete</button>
                          </>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
