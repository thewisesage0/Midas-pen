import { useNavigate } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { useManhwa } from "@/store/manhwa";
import { Trash2, Plus } from "lucide-react";

function Field({ label, value, onChange, type = "text", required }: { label: string; value: string; onChange: (v: string) => void; type?: string; required?: boolean }) {
  return (
    <label className="block">
      <span className="font-tech text-[10px] uppercase tracking-widest text-flame">{label}{required && " *"}</span>
      <input type={type} value={value} required={required} onChange={(e) => onChange(e.target.value)} className="mt-2 w-full bg-obsidian/60 border border-flame/20 rounded-full px-5 py-3 text-sm text-ivory outline-none focus:border-flame/60" />
    </label>
  );
}

export function AdminChapterPage() {
  const { manhwa, chapters, createChapter, addDownload } = useManhwa();
  const navigate = useNavigate();
  const [mid, setMid] = useState(manhwa[0]?.id ?? "");
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [thumb, setThumb] = useState("");
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [panels, setPanels] = useState<string[]>([]);
  const [panelInput, setPanelInput] = useState("");
  const [dlName, setDlName] = useState("");
  const [dlFormat, setDlFormat] = useState<"PDF" | "EPUB">("PDF");
  const [dlUrl, setDlUrl] = useState("");

  const nextNum = useMemo(() => {
    const list = chapters.filter((c) => c.manhwaId === mid);
    return list.length ? Math.max(...list.map((c) => c.number)) + 1 : 1;
  }, [chapters, mid]);

  const onFiles = (files: FileList | null) => {
    if (!files) return;
    const arr = Array.from(files).map((f) => URL.createObjectURL(f));
    setPanels((p) => [...p, ...arr]);
  };

  const move = (i: number, dir: -1 | 1) => {
    const j = i + dir;
    if (j < 0 || j >= panels.length) return;
    const next = [...panels];
    [next[i], next[j]] = [next[j], next[i]];
    setPanels(next);
  };

  return (
    <div className="space-y-6">
      <header>
        <p className="font-tech text-[10px] uppercase tracking-[0.5em] text-flame">// Upload</p>
        <h1 className="mt-2 font-display text-4xl text-ivory text-glow-flame">New Chapter</h1>
      </header>

      <form onSubmit={(e) => {
        e.preventDefault();
        if (!mid || panels.length === 0) return;
        createChapter(mid, { title, description: desc, thumbnail: thumb || undefined, releaseDate: date, panels });
        if (dlUrl && dlName) addDownload({ manhwaId: mid, name: dlName, format: dlFormat, url: dlUrl });
        navigate({ to: "/manhwa/$id", params: { id: mid } });
      }} className="glass-dark rounded-2xl border border-flame/20 p-6 space-y-5">
        <div className="grid md:grid-cols-2 gap-4">
          <label className="block">
            <span className="font-tech text-[10px] uppercase tracking-widest text-flame">Manhwa</span>
            <select value={mid} onChange={(e) => setMid(e.target.value)} className="mt-2 w-full bg-obsidian/60 border border-flame/20 rounded-full px-5 py-3 text-sm text-ivory outline-none">
              {manhwa.map((m) => <option key={m.id} value={m.id}>{m.title}</option>)}
            </select>
          </label>
          <div className="flex items-end">
            <p className="font-tech text-[10px] uppercase tracking-widest text-flame">Next chapter # → <span className="text-ivory text-lg ml-2">{nextNum}</span></p>
          </div>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          <Field label="Chapter title" required value={title} onChange={setTitle} />
          <Field label="Release date" type="date" value={date} onChange={setDate} />
        </div>
        <label className="block">
          <span className="font-tech text-[10px] uppercase tracking-widest text-flame">Description</span>
          <textarea value={desc} onChange={(e) => setDesc(e.target.value)} rows={3} className="mt-2 w-full bg-obsidian/60 border border-flame/20 rounded-2xl px-5 py-3 text-sm text-ivory outline-none focus:border-flame/60" />
        </label>
        <Field label="Thumbnail URL (optional)" value={thumb} onChange={setThumb} />

        <div>
          <p className="font-tech text-[10px] uppercase tracking-widest text-flame">Panels</p>
          <div className="mt-2 flex gap-2">
            <input value={panelInput} onChange={(e) => setPanelInput(e.target.value)} placeholder="Panel image URL" className="flex-1 bg-obsidian/60 border border-flame/20 rounded-full px-5 py-3 text-sm text-ivory outline-none focus:border-flame/60" />
            <button type="button" onClick={() => { if (panelInput.trim()) { setPanels((p) => [...p, panelInput.trim()]); setPanelInput(""); } }} className="rounded-full border border-flame/40 px-4 py-2 text-flame hover:bg-flame/10"><Plus className="w-4 h-4" /></button>
            <label className="rounded-full border border-flame/40 bg-flame/10 px-4 py-2 cursor-pointer font-tech text-[10px] uppercase tracking-widest text-ivory hover:bg-flame/20">
              Upload
              <input type="file" multiple accept="image/*" onChange={(e) => onFiles(e.target.files)} className="hidden" />
            </label>
          </div>
          {panels.length > 0 && (
            <div className="mt-4 space-y-2 max-h-96 overflow-y-auto">
              {panels.map((p, i) => (
                <div key={i} className="flex items-center gap-3 rounded-xl border border-flame/10 bg-obsidian/40 p-2">
                  <img src={p} alt="" className="w-12 h-16 object-cover rounded" />
                  <span className="flex-1 font-tech text-[10px] uppercase tracking-widest text-ivory truncate">Panel {i + 1}</span>
                  <button type="button" onClick={() => move(i, -1)} className="text-steel hover:text-flame text-xs">↑</button>
                  <button type="button" onClick={() => move(i, 1)} className="text-steel hover:text-flame text-xs">↓</button>
                  <button type="button" onClick={() => setPanels(panels.filter((_, j) => j !== i))} className="text-steel hover:text-flame"><Trash2 className="w-3.5 h-3.5" /></button>
                </div>
              ))}
            </div>
          )}
          <p className="mt-2 font-tech text-[10px] text-steel uppercase tracking-widest">{panels.length} panels queued</p>
        </div>

        <div className="border-t border-flame/10 pt-5">
          <p className="font-tech text-[10px] uppercase tracking-widest text-flame mb-2">Attach Download (optional)</p>
          <div className="grid md:grid-cols-3 gap-3">
            <Field label="File name" value={dlName} onChange={setDlName} />
            <label className="block">
              <span className="font-tech text-[10px] uppercase tracking-widest text-flame">Format</span>
              <select value={dlFormat} onChange={(e) => setDlFormat(e.target.value as typeof dlFormat)} className="mt-2 w-full bg-obsidian/60 border border-flame/20 rounded-full px-5 py-3 text-sm text-ivory outline-none">
                <option>PDF</option><option>EPUB</option>
              </select>
            </label>
            <Field label="Download URL" value={dlUrl} onChange={setDlUrl} />
          </div>
        </div>

        <button type="submit" className="rounded-full border border-flame bg-flame/20 px-6 py-3 font-tech text-[10px] uppercase tracking-widest text-ivory hover:bg-flame/30 glow-flame-sm transition-all">
          Publish Chapter
        </button>
      </form>
    </div>
  );
}
