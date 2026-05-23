import { useState } from "react";
import { useManhwa } from "@/store/manhwa";
import { useAuth } from "@/store/auth";
import { Pin, Trash2, Reply, Heart } from "lucide-react";

export function AdminCommentsPage() {
  const { user } = useAuth();
  const { comments, manhwa, deleteComment, pinComment, likeComment, addComment } = useManhwa();
  const [replyTo, setReplyTo] = useState<string | null>(null);
  const [body, setBody] = useState("");

  const sorted = [...comments].sort((a, b) => (Number(!!b.pinned) - Number(!!a.pinned)) || (+new Date(b.createdAt) - +new Date(a.createdAt)));

  return (
    <div className="space-y-6">
      <header>
        <p className="font-tech text-[10px] uppercase tracking-[0.5em] text-flame">// Moderation</p>
        <h1 className="mt-2 font-display text-4xl text-ivory text-glow-flame">Comments</h1>
        <p className="mt-1 font-luxury italic text-ivory/60 text-sm">Pin, prune, and reply with the author badge.</p>
      </header>

      <div className="glass-dark rounded-2xl border border-flame/20 divide-y divide-flame/10">
        {sorted.length === 0 && <p className="p-6 text-sm text-steel">No comments yet.</p>}
        {sorted.map((c) => {
          const m = manhwa.find((x) => x.id === c.manhwaId);
          return (
            <div key={c.id} className={`p-5 ${c.pinned ? "bg-flame/5" : ""}`}>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-display text-sm tracking-widest text-ivory">{c.userName}</span>
                {c.isAuthor && <span className="rounded-full border border-flame bg-flame/20 px-2 py-0.5 font-tech text-[9px] text-flame">Author</span>}
                {c.pinned && <span className="rounded-full border border-flame px-2 py-0.5 font-tech text-[9px] text-flame">Pinned</span>}
                <span className="ml-auto font-tech text-[10px] text-steel">{m?.title} • {new Date(c.createdAt).toLocaleDateString()}</span>
              </div>
              <p className="mt-2 text-sm text-ivory/85">{c.body}</p>
              <div className="mt-3 flex items-center gap-2 flex-wrap">
                <button onClick={() => pinComment(c.id)} className="inline-flex items-center gap-1 rounded-full border border-flame/30 px-3 py-1 font-tech text-[10px] uppercase tracking-widest text-ivory hover:bg-flame/10"><Pin className="w-3 h-3" /> {c.pinned ? "Unpin" : "Pin"}</button>
                <button onClick={() => { setReplyTo(c.id); setBody(""); }} className="inline-flex items-center gap-1 rounded-full border border-flame/30 px-3 py-1 font-tech text-[10px] uppercase tracking-widest text-ivory hover:bg-flame/10"><Reply className="w-3 h-3" /> Reply</button>
                <button onClick={() => likeComment(c.id)} className="inline-flex items-center gap-1 rounded-full border border-flame/30 px-3 py-1 font-tech text-[10px] uppercase tracking-widest text-ivory hover:bg-flame/10"><Heart className="w-3 h-3" /> {c.likes}</button>
                <button onClick={() => deleteComment(c.id)} className="inline-flex items-center gap-1 rounded-full border border-flame/30 px-3 py-1 font-tech text-[10px] uppercase tracking-widest text-flame hover:bg-flame/20"><Trash2 className="w-3 h-3" /> Delete</button>
              </div>
              {replyTo === c.id && user && (
                <div className="mt-3 flex gap-2">
                  <input value={body} onChange={(e) => setBody(e.target.value)} placeholder="Reply as author…" className="flex-1 bg-obsidian/60 border border-flame/20 rounded-full px-4 py-2 text-sm text-ivory outline-none focus:border-flame/60" />
                  <button onClick={() => { if (!body.trim()) return; addComment({ manhwaId: c.manhwaId, chapterId: c.chapterId, userId: user.id, userName: user.name, body: body.trim(), parentId: c.id, isAuthor: true }); setReplyTo(null); setBody(""); }} className="rounded-full border border-flame bg-flame/20 px-4 py-2 font-tech text-[10px] uppercase tracking-widest text-ivory hover:bg-flame/30">Send</button>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
