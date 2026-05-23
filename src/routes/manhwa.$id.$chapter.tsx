import { Link, useParams, useNavigate } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState } from "react";
import { useManhwa } from "@/store/manhwa";
import { useAuth } from "@/store/auth";
import { ChevronLeft, ChevronRight, Maximize2, Minimize2, List, ArrowLeft, MessageSquare } from "lucide-react";

export function ManhwaChapterPage() {
  const { id, chapter } = useParams({ strict: false }) as { id: string; chapter: string };
  const navigate = useNavigate();
  const { manhwa, chapters, comments, addComment, likeComment, trackView, saveProgress } = useManhwa();
  const { user } = useAuth();
  const m = manhwa.find((x) => x.id === id);
  const list = useMemo(() => chapters.filter((c) => c.manhwaId === id).sort((a, b) => a.number - b.number), [chapters, id]);
  const ch = list.find((c) => c.id === chapter);
  const idx = list.findIndex((c) => c.id === chapter);
  const prev = idx > 0 ? list[idx - 1] : null;
  const next = idx >= 0 && idx < list.length - 1 ? list[idx + 1] : null;
  const cm = comments.filter((c) => c.chapterId === chapter);
  const [drawer, setDrawer] = useState(false);
  const [fs, setFs] = useState(false);
  const [body, setBody] = useState("");
  const [replyTo, setReplyTo] = useState<string | null>(null);
  const [replyBody, setReplyBody] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);
  const [pct, setPct] = useState(0);
  const topLevel = cm.filter((c) => !c.parentId);
  const repliesOf = (pid: string) => cm.filter((c) => c.parentId === pid);

  useEffect(() => {
    if (ch) trackView(ch.id);
    window.scrollTo(0, 0);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ch?.id]);

  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement.scrollHeight - window.innerHeight;
      const p = h > 0 ? Math.min(100, (window.scrollY / h) * 100) : 0;
      setPct(p);
      if (user && m && ch) saveProgress(user.id, m.id, ch.id, p);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [user, m, ch, saveProgress]);

  if (!m || !ch) return (
    <div className="pt-40 text-center">
      <p className="text-ivory">Chapter not found.</p>
      <Link to="/manhwa" className="text-flame">← Back</Link>
    </div>
  );

  return (
    <div className={`relative min-h-screen ${fs ? "bg-black" : "bg-background"}`}>
      <div className="fixed top-0 left-0 right-0 h-1 z-[60] bg-flame/10">
        <div className="h-full bg-flame transition-all" style={{ width: `${pct}%` }} />
      </div>

      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 rounded-full glass-dark border border-flame/30 px-3 py-2 shadow-[0_10px_40px_-10px_rgba(255,42,26,0.4)]">
        {prev ? (
          <button onClick={() => navigate({ to: "/manhwa/$id/$chapter", params: { id: m.id, chapter: prev.id } })} className="grid place-items-center w-9 h-9 rounded-full border border-flame/30 text-ivory hover:bg-flame/20"><ChevronLeft className="w-4 h-4" /></button>
        ) : <span className="w-9 h-9" />}
        <button onClick={() => setDrawer(true)} className="grid place-items-center w-9 h-9 rounded-full border border-flame/30 text-ivory hover:bg-flame/20"><List className="w-4 h-4" /></button>
        <span className="font-tech text-[10px] uppercase tracking-widest text-ivory px-2">Ch. {ch.number}</span>
        <button onClick={() => setFs(!fs)} className="grid place-items-center w-9 h-9 rounded-full border border-flame/30 text-ivory hover:bg-flame/20">{fs ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}</button>
        {next ? (
          <button onClick={() => navigate({ to: "/manhwa/$id/$chapter", params: { id: m.id, chapter: next.id } })} className="grid place-items-center w-9 h-9 rounded-full border border-flame/30 text-ivory hover:bg-flame/20"><ChevronRight className="w-4 h-4" /></button>
        ) : <span className="w-9 h-9" />}
      </div>

      {!fs && (
        <header className="pt-28 pb-8 px-6 mx-auto max-w-3xl text-center">
          <Link to="/manhwa/$id" params={{ id: m.id }} className="inline-flex items-center gap-2 font-tech text-[10px] uppercase tracking-widest text-flame hover:text-ivory"><ArrowLeft className="w-3 h-3" /> {m.title}</Link>
          <h1 className="mt-3 font-display text-4xl text-ivory">{ch.title}</h1>
          <p className="mt-2 font-sans text-sm text-steel">Chapter {ch.number} • {ch.panels.length} panels</p>
        </header>
      )}

      <div ref={scrollRef} className={`mx-auto ${fs ? "max-w-3xl pt-10" : "max-w-3xl"} px-2 md:px-0`}>
        {ch.panels.map((p, i) => (
          <img key={i} src={p} alt={`Panel ${i + 1}`} loading="lazy" className="w-full block" />
        ))}
      </div>

      {!fs && (
        <>
          <div className="mx-auto max-w-3xl px-6 my-12 flex justify-between">
            {prev ? (
              <button onClick={() => navigate({ to: "/manhwa/$id/$chapter", params: { id: m.id, chapter: prev.id } })} className="inline-flex items-center gap-2 rounded-full border border-flame/40 bg-flame/10 px-5 py-2.5 font-tech text-[10px] uppercase tracking-widest text-ivory hover:bg-flame/20 transition-all">
                <ChevronLeft className="w-3 h-3" /> Ch. {prev.number}
              </button>
            ) : <div />}
            {next ? (
              <button onClick={() => navigate({ to: "/manhwa/$id/$chapter", params: { id: m.id, chapter: next.id } })} className="inline-flex items-center gap-2 rounded-full border border-flame bg-flame/20 px-5 py-2.5 font-tech text-[10px] uppercase tracking-widest text-ivory hover:bg-flame/30 transition-all">
                Ch. {next.number} <ChevronRight className="w-3 h-3" />
              </button>
            ) : (
              <Link to="/manhwa/$id" params={{ id: m.id }} className="inline-flex items-center gap-2 rounded-full border border-flame/40 bg-flame/10 px-5 py-2.5 font-tech text-[10px] uppercase tracking-widest text-ivory hover:bg-flame/20 transition-all">
                Back to Series
              </Link>
            )}
          </div>

          <section className="mx-auto max-w-3xl px-6 pb-24">
            <div className="glass-dark rounded-2xl border border-flame/20 p-6">
              <h3 className="font-display text-xl text-ivory tracking-widest mb-5 flex items-center gap-2"><MessageSquare className="w-4 h-4 text-flame" /> Chapter Reactions</h3>
              {user ? (
                <div className="flex gap-3 mb-6">
                  <textarea value={body} onChange={(e) => setBody(e.target.value)} placeholder="React to this chapter…" className="flex-1 bg-obsidian/60 border border-flame/20 rounded-xl p-3 font-sans text-sm text-ivory placeholder:text-steel/60 outline-none focus:border-flame/60" rows={2} />
                  <button onClick={() => { if (!body.trim()) return; addComment({ manhwaId: m.id, chapterId: ch.id, userId: user.id, userName: user.name, body: body.trim(), isAuthor: user.role === "admin" }); setBody(""); }} className="self-end rounded-full border border-flame bg-flame/20 px-4 py-2 font-tech text-[10px] uppercase tracking-widest text-ivory hover:bg-flame/30">Post</button>
                </div>
              ) : (
                <p className="text-sm text-steel mb-4"><Link to="/auth" className="text-flame">Log in</Link> to react.</p>
              )}
              <div className="space-y-3">
                {topLevel.length === 0 && <p className="text-sm text-steel">No reactions yet.</p>}
                {topLevel.map((c) => {
                  const replies = repliesOf(c.id);
                  return (
                    <div key={c.id} className="rounded-xl border border-flame/10 bg-obsidian/40 p-3 hover:border-flame/40 transition-colors">
                      <div className="flex items-center gap-2">
                        <span className="font-display text-xs tracking-widest text-ivory">{c.userName}</span>
                        {c.isAuthor && <span className="rounded-full border border-flame bg-flame/20 px-2 py-0.5 font-tech text-[9px] text-flame">Author</span>}
                        <span className="ml-auto font-tech text-[10px] text-steel">{new Date(c.createdAt).toLocaleDateString()}</span>
                      </div>
                      <p className="mt-1.5 font-sans text-sm text-ivory/85">{c.body}</p>
                      <div className="mt-1.5 flex items-center gap-3">
                        <button onClick={() => likeComment(c.id)} className="font-tech text-[10px] uppercase text-steel hover:text-flame">♥ {c.likes}</button>
                        {user && (
                          <button onClick={() => { setReplyTo(replyTo === c.id ? null : c.id); setReplyBody(""); }} className="inline-flex items-center gap-1 font-tech text-[10px] uppercase text-steel hover:text-flame">
                            <MessageSquare className="w-3 h-3" /> Reply
                          </button>
                        )}
                      </div>
                      {replyTo === c.id && (
                        <div className="mt-3 flex gap-2">
                          <input value={replyBody} onChange={(e) => setReplyBody(e.target.value)} placeholder="Write a reply…" className="flex-1 bg-obsidian/60 border border-flame/20 rounded-full px-3 py-1.5 font-sans text-xs text-ivory outline-none focus:border-flame/60" />
                          <button onClick={() => { if (!replyBody.trim() || !user) return; addComment({ manhwaId: m.id, chapterId: ch.id, parentId: c.id, userId: user.id, userName: user.name, body: replyBody.trim(), isAuthor: user.role === "admin" }); setReplyBody(""); setReplyTo(null); }} className="rounded-full border border-flame bg-flame/20 px-3 py-1.5 font-tech text-[10px] uppercase tracking-widest text-ivory hover:bg-flame/30">Send</button>
                        </div>
                      )}
                      {replies.length > 0 && (
                        <div className="mt-3 pl-4 border-l border-flame/20 space-y-2">
                          {replies.map((r) => (
                            <div key={r.id} className="rounded-lg bg-obsidian/60 border border-flame/10 p-2.5">
                              <div className="flex items-center gap-2">
                                <span className="font-display text-[11px] tracking-widest text-ivory">{r.userName}</span>
                                {r.isAuthor && <span className="rounded-full border border-flame bg-flame/20 px-1.5 py-0.5 font-tech text-[8px] text-flame">Author</span>}
                                <span className="ml-auto font-tech text-[9px] text-steel">{new Date(r.createdAt).toLocaleDateString()}</span>
                              </div>
                              <p className="mt-1 font-sans text-xs text-ivory/85">{r.body}</p>
                              <button onClick={() => likeComment(r.id)} className="mt-1 font-tech text-[9px] uppercase text-steel hover:text-flame">♥ {r.likes}</button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </section>
        </>
      )}

      {drawer && (
        <div className="fixed inset-0 z-[70] bg-black/80 backdrop-blur-sm" onClick={() => setDrawer(false)}>
          <div className="absolute right-0 top-0 bottom-0 w-full max-w-sm glass-dark border-l border-flame/30 p-6 overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <p className="font-tech text-[10px] uppercase tracking-widest text-flame mb-4">{m.title}</p>
            <h3 className="font-display text-2xl text-ivory mb-4">Chapters</h3>
            <div className="space-y-2">
              {list.map((c) => (
                <button key={c.id} onClick={() => { navigate({ to: "/manhwa/$id/$chapter", params: { id: m.id, chapter: c.id } }); setDrawer(false); }} className={`w-full text-left rounded-lg border p-3 transition-all ${c.id === ch.id ? "border-flame bg-flame/20 text-ivory" : "border-flame/10 text-ivory/80 hover:border-flame/40 hover:bg-flame/5"}`}>
                  <span className="font-display text-sm tracking-widest">Ch. {c.number} — {c.title}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
