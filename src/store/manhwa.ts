import { create } from "zustand";
import { persist } from "zustand/middleware";
import { seedManhwa, seedChapters, seedComments, type Manhwa, type Chapter, type Comment } from "@/data/site";

type Download = { id: string; manhwaId: string; name: string; format: "PDF" | "EPUB"; url: string };

type State = {
  manhwa: Manhwa[];
  chapters: Chapter[];
  comments: Comment[];
  downloads: Download[];
  archivedManhwa: Manhwa[];
  archivedChapters: Chapter[];
  library: Record<string, string[]>;
  progress: Record<string, Record<string, { chapterId: string; pct: number; ts: number }>>;

  createManhwa: (m: Omit<Manhwa, "id" | "views" | "rating" | "createdAt">) => Manhwa;
  updateManhwa: (id: string, patch: Partial<Manhwa>) => void;
  deleteManhwa: (id: string) => void;
  restoreManhwa: (id: string) => void;
  createChapter: (manhwaId: string, c: Omit<Chapter, "id" | "manhwaId" | "number" | "views">) => Chapter;
  updateChapter: (id: string, patch: Partial<Omit<Chapter, "id" | "manhwaId">>) => void;
  deleteChapter: (id: string) => void;
  restoreChapter: (id: string) => void;
  addDownload: (d: Omit<Download, "id">) => void;

  addComment: (c: Omit<Comment, "id" | "createdAt" | "likes">) => void;
  updateComment: (id: string, patch: Partial<Pick<Comment, "body" | "rating">>) => void;
  deleteComment: (id: string) => void;
  pinComment: (id: string) => void;
  likeComment: (id: string) => void;

  toggleSave: (userId: string, manhwaId: string) => void;
  saveProgress: (userId: string, manhwaId: string, chapterId: string, pct: number) => void;
  trackView: (chapterId: string) => void;
};

export const useManhwa = create<State>()(
  persist(
    (set, get) => ({
      manhwa: seedManhwa,
      chapters: seedChapters,
      comments: [...seedComments],
      downloads: [],
      archivedManhwa: [],
      archivedChapters: [],
      library: {},
      progress: {},

      createManhwa: (m) => {
        const item: Manhwa = { ...m, id: "m-" + Math.random().toString(36).slice(2, 8), views: 0, rating: 0, createdAt: new Date().toISOString() };
        set({ manhwa: [item, ...get().manhwa] });
        return item;
      },
      updateManhwa: (id, patch) =>
        set({ manhwa: get().manhwa.map((m) => (m.id === id ? { ...m, ...patch } : m)) }),
      deleteManhwa: (id) => {
        const s = get();
        const target = s.manhwa.find((m) => m.id === id);
        const related = s.chapters.filter((c) => c.manhwaId === id);
        set({
          manhwa: s.manhwa.filter((m) => m.id !== id),
          chapters: s.chapters.filter((c) => c.manhwaId !== id),
          archivedManhwa: target ? [target, ...s.archivedManhwa] : s.archivedManhwa,
          archivedChapters: [...related, ...s.archivedChapters],
        });
      },
      restoreManhwa: (id) => {
        const s = get();
        const target = s.archivedManhwa.find((m) => m.id === id);
        if (!target) return;
        const restoredChapters = s.archivedChapters.filter((c) => c.manhwaId === id);
        set({
          manhwa: [target, ...s.manhwa],
          chapters: [...s.chapters, ...restoredChapters],
          archivedManhwa: s.archivedManhwa.filter((m) => m.id !== id),
          archivedChapters: s.archivedChapters.filter((c) => c.manhwaId !== id),
        });
      },
      createChapter: (manhwaId, c) => {
        const existing = get().chapters.filter((x) => x.manhwaId === manhwaId);
        const number = existing.length ? Math.max(...existing.map((x) => x.number)) + 1 : 1;
        const ch: Chapter = { ...c, id: "c-" + Math.random().toString(36).slice(2, 8), manhwaId, number, views: 0 };
        set({ chapters: [...get().chapters, ch] });
        return ch;
      },
      updateChapter: (id, patch) =>
        set({ chapters: get().chapters.map((c) => (c.id === id ? { ...c, ...patch } : c)) }),
      deleteChapter: (id) => {
        const s = get();
        const target = s.chapters.find((c) => c.id === id);
        set({ chapters: s.chapters.filter((c) => c.id !== id), archivedChapters: target ? [target, ...s.archivedChapters] : s.archivedChapters });
      },
      restoreChapter: (id) => {
        const s = get();
        const target = s.archivedChapters.find((c) => c.id === id);
        if (!target) return;
        set({ chapters: [...s.chapters, target], archivedChapters: s.archivedChapters.filter((c) => c.id !== id) });
      },
      addDownload: (d) =>
        set({ downloads: [...get().downloads, { ...d, id: "d-" + Math.random().toString(36).slice(2, 8) }] }),

      addComment: (c) =>
        set({ comments: [{ ...c, id: "co-" + Math.random().toString(36).slice(2, 8), createdAt: new Date().toISOString(), likes: 0 }, ...get().comments] }),
      updateComment: (id, patch) =>
        set({ comments: get().comments.map((c) => (c.id === id ? { ...c, ...patch, updatedAt: new Date().toISOString() } : c)) }),
      deleteComment: (id) => set({ comments: get().comments.filter((c) => c.id !== id) }),
      pinComment: (id) => set({ comments: get().comments.map((c) => (c.id === id ? { ...c, pinned: !c.pinned } : c)) }),
      likeComment: (id) => set({ comments: get().comments.map((c) => (c.id === id ? { ...c, likes: c.likes + 1 } : c)) }),

      toggleSave: (userId, manhwaId) => {
        const lib = { ...get().library };
        const cur = lib[userId] ?? [];
        lib[userId] = cur.includes(manhwaId) ? cur.filter((x) => x !== manhwaId) : [manhwaId, ...cur];
        set({ library: lib });
      },
      saveProgress: (userId, manhwaId, chapterId, pct) => {
        const prog = { ...get().progress };
        prog[userId] = { ...(prog[userId] ?? {}), [manhwaId]: { chapterId, pct, ts: Date.now() } };
        set({ progress: prog });
      },
      trackView: (chapterId) =>
        set({ chapters: get().chapters.map((c) => (c.id === chapterId ? { ...c, views: c.views + 1 } : c)) }),
    }),
    {
      name: "midas-manhwa",
      partialize: (s) => ({
        manhwa: s.manhwa,
        chapters: s.chapters,
        comments: s.comments,
        downloads: s.downloads,
        archivedManhwa: s.archivedManhwa,
        archivedChapters: s.archivedChapters,
        library: s.library,
        progress: s.progress,
      }),
    },
  ),
);
