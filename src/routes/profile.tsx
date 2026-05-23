import { Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { EmberField } from "@/components/EmberField";
import { useAuth } from "@/store/auth";

export function ProfilePage() {
  const { user, updateProfile, logout } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState(user?.name ?? "");
  const [avatar, setAvatar] = useState(user?.avatar ?? "");

  useEffect(() => { if (!user) navigate({ to: "/auth" }); }, [user, navigate]);
  if (!user) return null;

  return (
    <section className="relative min-h-screen pt-32 pb-24 px-6 overflow-hidden">
      <EmberField count={20} />
      <div className="relative mx-auto max-w-2xl glass-dark rounded-2xl border border-flame/30 p-8">
        <p className="font-tech text-[10px] uppercase tracking-[0.5em] text-flame">// Profile</p>
        <h1 className="mt-2 font-display text-5xl text-ivory text-glow-flame">{user.name}</h1>
        <p className="mt-1 font-sans text-sm text-steel">{user.email}</p>

        <form onSubmit={(e) => { e.preventDefault(); updateProfile({ name, avatar: avatar || undefined }); }} className="mt-8 space-y-4">
          <label className="block">
            <span className="font-tech text-[10px] uppercase tracking-widest text-flame">Display name</span>
            <input value={name} onChange={(e) => setName(e.target.value)} className="mt-2 w-full bg-obsidian/60 border border-flame/20 rounded-full px-5 py-3 font-sans text-sm text-ivory outline-none focus:border-flame/60" />
          </label>
          <label className="block">
            <span className="font-tech text-[10px] uppercase tracking-widest text-flame">Avatar URL</span>
            <input value={avatar} onChange={(e) => setAvatar(e.target.value)} placeholder="https://…" className="mt-2 w-full bg-obsidian/60 border border-flame/20 rounded-full px-5 py-3 font-sans text-sm text-ivory outline-none focus:border-flame/60" />
          </label>
          <div className="flex gap-3 pt-2">
            <button type="submit" className="rounded-full border border-flame bg-flame/20 px-5 py-2.5 font-tech text-[10px] uppercase tracking-widest text-ivory hover:bg-flame/30">Save</button>
            <Link to="/library" className="rounded-full border border-flame/30 px-5 py-2.5 font-tech text-[10px] uppercase tracking-widest text-ivory/80 hover:bg-flame/10">My Library</Link>
            <button type="button" onClick={() => { logout(); navigate({ to: "/" }); }} className="ml-auto rounded-full border border-border px-5 py-2.5 font-tech text-[10px] uppercase tracking-widest text-steel hover:text-flame">Logout</button>
          </div>
        </form>
      </div>
    </section>
  );
}
