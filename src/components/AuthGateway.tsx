import { useState } from "react";
import { EmberField } from "@/components/EmberField";
import { useAuth } from "@/store/auth";
import { Shield, Mail, KeyRound, User as UserIcon } from "lucide-react";

type Mode = "login" | "signup" | "forgot" | "admin";

export function AuthGateway({ onAuthed }: { onAuthed?: () => void }) {
  const { loginReader, signupReader, resetPassword, loginAdmin } = useAuth();
  const [mode, setMode] = useState<Mode>("login");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [err, setErr] = useState<string | null>(null);
  const [ok, setOk] = useState<string | null>(null);

  const reset = () => { setErr(null); setOk(null); };

  const handle = (e: React.FormEvent) => {
    e.preventDefault();
    reset();
    if (mode === "login") {
      const r = loginReader(email, password);
      if (!r.ok) return setErr(r.error ?? "Login failed");
      onAuthed?.();
    } else if (mode === "signup") {
      const r = signupReader(name.trim(), email, password);
      if (!r.ok) return setErr(r.error ?? "Signup failed");
      onAuthed?.();
    } else if (mode === "forgot") {
      const r = resetPassword(email, newPassword);
      if (!r.ok) return setErr(r.error ?? "Reset failed");
      setOk("Password updated. You can now sign in.");
      setMode("login");
    } else if (mode === "admin") {
      const r = loginAdmin(email, password);
      if (!r.ok) return setErr(r.error ?? "Access denied");
      onAuthed?.();
    }
  };

  const isAdmin = mode === "admin";
  const fieldClass = "w-full rounded-lg border border-flame/20 bg-flame/5 px-4 py-3 font-sans text-sm text-ivory placeholder-steel/60 outline-none focus:border-flame/60 focus:ring-1 focus:ring-flame/40 transition-all";

  return (
    <section className="relative min-h-screen pt-32 pb-24 px-6 grid place-items-center overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-40 -left-20 w-[40rem] h-[40rem] rounded-full bg-flame/10 blur-[140px] animate-flame-pulse" />
        <div className="absolute bottom-0 right-0 w-[36rem] h-[36rem] rounded-full bg-flame/5 blur-[160px]" />
      </div>
      <EmberField count={50} />

      <div className="relative w-full max-w-md">
        <div className={`glass-dark rounded-2xl border p-8 md:p-10 ${isAdmin ? "border-flame/50" : "border-flame/20"}`}>
          {isAdmin && (
            <div className="mb-6 flex items-center gap-3 rounded-lg border border-flame/30 bg-flame/10 px-4 py-3">
              <Shield className="h-4 w-4 text-flame shrink-0" />
              <p className="font-tech text-[10px] uppercase tracking-widest text-flame">Admin Access</p>
            </div>
          )}

          <div className="mb-8 text-center">
            <h1 className="font-display text-4xl tracking-widest text-ivory">
              {mode === "login" ? "ENTER" : mode === "signup" ? "JOIN" : mode === "forgot" ? "RESET" : "CONSOLE"}
            </h1>
            <p className="mt-2 font-luxury italic text-sm text-steel">
              {mode === "login" ? "The universe awaits." : mode === "signup" ? "Forge your place inside." : mode === "forgot" ? "Reclaim your access." : "Authorised access only."}
            </p>
          </div>

          <form onSubmit={handle} className="space-y-4">
            {mode === "signup" && (
              <div className="relative">
                <UserIcon className="absolute left-3 top-3.5 h-4 w-4 text-steel" />
                <input className={`${fieldClass} pl-10`} placeholder="Your name" value={name} onChange={(e) => setName(e.target.value)} required />
              </div>
            )}
            <div className="relative">
              <Mail className="absolute left-3 top-3.5 h-4 w-4 text-steel" />
              <input className={`${fieldClass} pl-10`} type="email" placeholder="Email address" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            {mode !== "forgot" && (
              <div className="relative">
                <KeyRound className="absolute left-3 top-3.5 h-4 w-4 text-steel" />
                <input className={`${fieldClass} pl-10`} type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
              </div>
            )}
            {mode === "forgot" && (
              <div className="relative">
                <KeyRound className="absolute left-3 top-3.5 h-4 w-4 text-steel" />
                <input className={`${fieldClass} pl-10`} type="password" placeholder="New password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} required />
              </div>
            )}

            {err && <p className="font-tech text-[10px] uppercase tracking-widest text-red-400">{err}</p>}
            {ok  && <p className="font-tech text-[10px] uppercase tracking-widest text-green-400">{ok}</p>}

            <button type="submit" className="w-full rounded-lg border border-flame bg-flame/15 py-3 font-tech text-xs uppercase tracking-[0.3em] text-ivory hover:bg-flame/30 transition-all glow-flame-sm">
              {mode === "login" ? "Enter" : mode === "signup" ? "Create Account" : mode === "forgot" ? "Reset Password" : "Access Console"}
            </button>
          </form>

          <div className="mt-6 flex flex-col gap-2 text-center">
            {mode === "login" && (
              <>
                <button onClick={() => { setMode("signup"); reset(); }} className="font-tech text-[10px] uppercase tracking-widest text-steel hover:text-flame transition-colors">No account? Join</button>
                <button onClick={() => { setMode("forgot"); reset(); }} className="font-tech text-[10px] uppercase tracking-widest text-steel hover:text-flame transition-colors">Forgot password?</button>
                <button onClick={() => { setMode("admin"); reset(); }} className="font-tech text-[10px] uppercase tracking-widest text-steel/50 hover:text-flame transition-colors">Admin access</button>
              </>
            )}
            {(mode === "signup" || mode === "forgot" || mode === "admin") && (
              <button onClick={() => { setMode("login"); reset(); }} className="font-tech text-[10px] uppercase tracking-widest text-steel hover:text-flame transition-colors">← Back to login</button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
