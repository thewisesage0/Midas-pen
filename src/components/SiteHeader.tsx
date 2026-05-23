import { Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useAuth } from "@/store/auth";

const nav = [
  { to: "/",       label: "Home" },
  { to: "/books",  label: "Books" },
  { to: "/covers", label: "Covers" },
  { to: "/manhwa", label: "Manhwa" },
  { to: "/reviews",label: "Reviews" },
  { to: "/about",  label: "About" },
] as const;

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? "py-3" : "py-5"}`}>
      <div className="mx-auto max-w-7xl px-4">
        <div className={`flex items-center justify-between rounded-full px-5 md:px-7 py-3 transition-all duration-500 ${
          scrolled ? "glass-dark border border-flame/20 shadow-[0_8px_40px_-12px_rgba(255,42,26,0.25)]" : "border border-transparent"
        }`}>
          <Link to="/" className="group flex items-center gap-3">
            <span className="relative grid h-9 w-9 place-items-center border border-flame/40 bg-flame/5 rounded-full">
              <span className="font-tech text-[9px] font-bold text-flame tracking-wider">MP</span>
              <span className="absolute inset-0 rounded-full animate-flame-pulse bg-flame/10" />
            </span>
            <span className="font-display text-base md:text-lg tracking-[0.25em] text-ivory whitespace-nowrap">
              MIDAS <span className="text-flame">PEN</span>
            </span>
          </Link>

          <nav className="hidden lg:flex items-center gap-1">
            {nav.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="nav-link group relative px-4 py-2 font-tech text-[10px] uppercase tracking-[0.25em] text-steel transition-colors hover:text-ivory"
                activeProps={{ className: "nav-link group relative px-4 py-2 font-tech text-[10px] uppercase tracking-[0.25em] text-flame text-glow-flame" }}
                activeOptions={{ exact: item.to === "/" }}
              >
                <span>{item.label}</span>
                <span className="pointer-events-none absolute left-4 right-4 -bottom-0.5 h-px scale-x-0 origin-left bg-flame transition-transform duration-300 group-hover:scale-x-100 group-hover:shadow-[0_0_10px_var(--flame)]" />
              </Link>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-2">
            {user ? (
              <>
                {user.role === "admin" ? (
                  <Link to="/admin" className="rounded-full border border-flame/60 bg-flame/10 px-4 py-2 font-tech text-[10px] uppercase tracking-widest text-ivory hover:bg-flame/20 transition-all">
                    Console
                  </Link>
                ) : (
                  <Link to="/library" className="rounded-full border border-flame/60 bg-flame/10 px-4 py-2 font-tech text-[10px] uppercase tracking-widest text-ivory hover:bg-flame/20 transition-all">
                    Library
                  </Link>
                )}
                <Link
                  to={user.role === "admin" ? "/admin" : "/profile"}
                  className="grid place-items-center h-9 w-9 rounded-full border border-flame/40 bg-flame/10 font-tech text-[10px] text-flame"
                >
                  {user.name.slice(0, 1).toUpperCase()}
                </Link>
                <button
                  onClick={() => { logout(); navigate({ to: "/" }); }}
                  className="font-tech text-[10px] uppercase tracking-widest text-steel hover:text-flame transition-colors"
                >
                  Out
                </button>
              </>
            ) : (
              <Link
                to="/auth"
                className="rounded-full border border-flame/60 bg-flame/10 px-4 py-2 font-tech text-[10px] uppercase tracking-widest text-ivory hover:bg-flame/20 hover:glow-flame-sm transition-all"
              >
                Enter →
              </Link>
            )}
          </div>

          <button
            onClick={() => setOpen(!open)}
            className="lg:hidden font-tech text-xs text-ivory px-3 py-1 border border-flame/40 rounded-full"
            aria-label="Toggle menu"
          >
            {open ? "CLOSE" : "MENU"}
          </button>
        </div>
      </div>

      {open && (
        <div className="lg:hidden glass-dark mt-3 mx-4 rounded-2xl px-6 py-6 flex flex-col gap-4 border border-flame/20">
          {nav.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              onClick={() => setOpen(false)}
              className="font-tech text-sm uppercase tracking-widest text-steel hover:text-flame transition-colors"
              activeProps={{ className: "font-tech text-sm uppercase tracking-widest text-flame" }}
            >
              {item.label}
            </Link>
          ))}
          <div className="border-t border-flame/20 pt-4 flex flex-col gap-3">
            {user ? (
              <>
                <Link to={user.role === "admin" ? "/admin" : "/library"} onClick={() => setOpen(false)} className="font-tech text-sm uppercase tracking-widest text-flame">
                  {user.role === "admin" ? "Console" : "Library"}
                </Link>
                <Link to="/profile" onClick={() => setOpen(false)} className="font-tech text-sm uppercase tracking-widest text-ivory">Profile</Link>
                <button onClick={() => { logout(); setOpen(false); navigate({ to: "/" }); }} className="text-left font-tech text-sm uppercase tracking-widest text-steel">Logout</button>
              </>
            ) : (
              <Link to="/auth" onClick={() => setOpen(false)} className="font-tech text-sm uppercase tracking-widest text-flame">
                Enter the Universe →
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
