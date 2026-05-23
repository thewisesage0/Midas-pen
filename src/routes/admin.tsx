import { Outlet, Link, useNavigate, useLocation } from "@tanstack/react-router";
import { useEffect } from "react";
import { useAuth } from "@/store/auth";
import { LayoutDashboard, MessageSquare, LogOut, BookPlus, Library } from "lucide-react";

const items = [
  { to: "/admin",          label: "Dashboard",      icon: LayoutDashboard },
  { to: "/admin/manage",   label: "Manage Library", icon: Library },
  { to: "/admin/chapter",  label: "New Chapter",    icon: BookPlus },
  { to: "/admin/comments", label: "Comments",       icon: MessageSquare },
] as const;

export function AdminLayout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const loc = useLocation();

  useEffect(() => {
    if (!user || user.role !== "admin") navigate({ to: "/auth" });
  }, [user, navigate, loc.pathname]);

  if (!user || user.role !== "admin") return null;

  return (
    <div className="relative min-h-screen pt-28 pb-16">
      <div className="mx-auto max-w-7xl px-4 grid md:grid-cols-[240px_1fr] gap-6">
        <aside className="md:sticky md:top-28 self-start glass-dark rounded-2xl border border-flame/20 p-4">
          <p className="font-tech text-[10px] uppercase tracking-[0.4em] text-flame px-3 mb-3">// Author Console</p>
          <nav className="flex md:flex-col gap-1 overflow-x-auto">
            {items.map((it) => (
              <Link key={it.to} to={it.to}
                className="flex items-center gap-3 rounded-xl px-3 py-2.5 font-tech text-[10px] uppercase tracking-widest text-steel hover:text-ivory hover:bg-flame/10 transition-all whitespace-nowrap"
                activeProps={{ className: "flex items-center gap-3 rounded-xl px-3 py-2.5 font-tech text-[10px] uppercase tracking-widest text-ivory bg-flame/15 border border-flame/30 glow-flame-sm whitespace-nowrap" }}
                activeOptions={{ exact: it.to === "/admin" }}
              >
                <it.icon className="w-4 h-4" /> {it.label}
              </Link>
            ))}
            <button onClick={() => { logout(); navigate({ to: "/" }); }} className="md:mt-4 flex items-center gap-3 rounded-xl px-3 py-2.5 font-tech text-[10px] uppercase tracking-widest text-steel hover:text-flame">
              <LogOut className="w-4 h-4" /> Logout
            </button>
          </nav>
        </aside>
        <main className="min-w-0">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
