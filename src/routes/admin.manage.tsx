import { Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { useManhwa } from "@/store/manhwa";
import { Pencil, Trash2, Plus, ChevronDown, ChevronUp, RotateCcw } from "lucide-react";

function ConfirmDialog({ open, title, description, confirmLabel, onCancel, onConfirm }: { open: boolean; title: string; description: string; confirmLabel: string; onCancel: () => void; onConfirm: () => void; }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[200] grid place-items-center bg-background/90 backdrop-blur-sm px-4">
      <div className="glass-dark rounded-2xl border border-flame/30 p-8 max-w-md w-full">
        <h3 className="font-display text-2xl text-ivory tracking-widest">{title}</h3>
        <p className="mt-3 font-sans text-sm text-steel">{description}</p>
        <div className="mt-6 flex gap-3 justify-end">
          <button onClick={onCancel} className="rounded-full border border-border px-5 py-2 font-tech text-[10px] uppercase tracking-widest text-steel hover:text-ivory">Cancel</button>
          <button onClick={onConfirm} className="rounded-full border border-flame bg-flame/20 px-5 py-2 font-tech text-[10px] uppercase tracking-widest text-ivory hover:bg-flame/30">{confirmLabel}</button>
        </div>
      </div>
    </div>
  );
}

export function AdminManhwaPage() {
  const { manhwa, chapters, archivedManhwa, deleteManhwa, restoreManhwa, deleteChapter } = useManhwa();
  const [expanded, setExpanded] = useState<string | null>(null);
  const [confirmManhwa, setConfirmManhwa] = useState<string | null>(null);
  const [confirmChapter, setConfirmChapter] = useState<string | null>(null);

  const sorted = useMemo(() => [...manhwa].sort((a, b) => +new Date(b.createdAt) - +new Date(a.createdAt)), [manhwa]);

  return (
    <div className="space-y-6">
      <header className="flex items-end justify-between flex-wrap gap-3">
        <div>
          <p className="font-tech text-[10px] uppercase tracking-[0.5em] text-flame">// Library</p>
          <h1 className="mt-2 font-display text-4xl text-ivory text-glow-flame">Manage Series</h1>
          <p className="mt-1 font-luxury italic text-ivory/60 text-sm">Edit, archive, and curate every series in your catalogue.</p>
        </div>
        <Link to="/admin/chapter" className="inline-flex items-center gap-2 rounded-full border border-flame bg-flame/20 px-5 py-2.5 font-tech text-[10px] uppercase tracking-widest text-ivory hover:bg-flame/30 glow-flame-sm transition-all">
          <Plus className="w-4 h-4" /> New Chapter
        </Link>
      </header>

      <div className="grid gap-4">
        {sorted.length === 0 && (<div className="glass-dark rounded-2xl border border-flame/20 p-10 text-center text-steel">No manhwa yet.</div>)}
        {sorted.map((m) => {
          const list = chapters.filter((c) => c.manhwaId === m.id).sort((a, b) => a.number - b.number);
          const isOpen = expanded === m.id;
          return (
            <article key={m.id} className="glass-dark rounded-2xl border border-flame/20 overflow-hidden">
              <div className="flex gap-4 p-4">
                <img src={m.cover} alt={m.title} className="w-20 h-28 object-cover rounded-lg border border-flame/20" />
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h2 className="font-display text-xl text-ivory truncate">{m.title}</h2>
                    <span className="rounded-full border border-flame/30 px-2 py-0.5 font-tech text-[9px] uppercase tracking-widest text-flame">{m.status}</span>
                  </div>
                  <p className="mt-1 text-sm text-ivory/70 line-clamp-2">{m.blurb}</p>
                  <p className="mt-2 font-tech text-[10px] uppercase tracking-widest text-steel">{list.length} chapters · {m.views.toLocaleString()} views · ★ {m.rating}</p>
                </div>
                <div className="flex flex-col gap-2 items-end shrink-0">
                  <button onClick={() => setConfirmManhwa(m.id)} className="inline-flex items-center gap-1 rounded-full border border-flame/50 px-3 py-1.5 font-tech text-[10px] uppercase tracking-widest text-flame hover:bg-flame/20 transition-all"><Trash2 className="w-3.5 h-3.5" /> Archive</button>
                  <button onClick={() => setExpanded(isOpen ? null : m.id)} className="inline-flex items-center gap-1 rounded-full border border-flame/20 px-3 py-1.5 font-tech text-[10px] uppercase tracking-widest text-steel hover:text-ivory hover:bg-flame/10 transition-all">
                    Chapters {isOpen ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>
              {isOpen && (
                <div className="border-t border-flame/15 bg-obsidian/40 p-4 space-y-2">
                  {list.length === 0 && (<p className="text-sm text-steel text-center py-4">No chapters yet.</p>)}
                  {list.map((c) => (
                    <div key={c.id} className="flex items-center gap-3 rounded-xl border border-flame/10 bg-obsidian/60 p-3 hover:border-flame/30 transition-all">
                      <span className="font-tech text-[10px] uppercase tracking-widest text-flame w-12">Ch.{c.number}</span>
                      <span className="flex-1 font-sans text-sm text-ivory truncate">{c.title}</span>
                      <span className="font-tech text-[10px] uppercase tracking-widest text-steel hidden sm:inline">{c.panels.length} panels</span>
                      <button onClick={() => setConfirmChapter(c.id)} className="inline-flex items-center gap-1 rounded-full border border-flame/40 px-3 py-1 font-tech text-[10px] uppercase tracking-widest text-flame hover:bg-flame/20"><Trash2 className="w-3 h-3" /> Delete</button>
                    </div>
                  ))}
                </div>
              )}
            </article>
          );
        })}
      </div>

      {archivedManhwa.length > 0 && (
        <section className="glass-dark rounded-2xl border border-flame/20 p-5">
          <p className="font-tech text-[10px] uppercase tracking-[0.4em] text-flame mb-3">// Archive · {archivedManhwa.length}</p>
          <ul className="space-y-2">
            {archivedManhwa.map((m) => (
              <li key={m.id} className="flex items-center gap-3 rounded-xl border border-flame/10 bg-obsidian/40 p-3">
                <img src={m.cover} alt="" className="w-10 h-14 object-cover rounded" />
                <span className="flex-1 font-sans text-sm text-ivory/80 truncate">{m.title}</span>
                <button onClick={() => restoreManhwa(m.id)} className="inline-flex items-center gap-1 rounded-full border border-flame/40 px-3 py-1 font-tech text-[10px] uppercase tracking-widest text-ivory hover:bg-flame/20"><RotateCcw className="w-3 h-3" /> Restore</button>
              </li>
            ))}
          </ul>
        </section>
      )}

      <ConfirmDialog open={!!confirmManhwa} title="Archive this manhwa?" description="It will disappear from the homepage and library. You can restore it from the archive." confirmLabel="Archive" onCancel={() => setConfirmManhwa(null)} onConfirm={() => { if (confirmManhwa) deleteManhwa(confirmManhwa); setConfirmManhwa(null); }} />
      <ConfirmDialog open={!!confirmChapter} title="Delete this chapter?" description="Readers will no longer see this chapter." confirmLabel="Delete" onCancel={() => setConfirmChapter(null)} onConfirm={() => { if (confirmChapter) deleteChapter(confirmChapter); setConfirmChapter(null); }} />
    </div>
  );
}
