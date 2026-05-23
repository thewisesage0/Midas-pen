import { Outlet, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";

export function NotFoundPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="font-display text-9xl text-flame text-glow-flame">404</h1>
        <h2 className="mt-4 font-display text-2xl tracking-widest text-ivory">SIGNAL LOST</h2>
        <p className="mt-2 font-sans text-sm text-steel">This page has burned away in the static.</p>
        <div className="mt-8">
          <Link
            to="/"
            className="inline-flex items-center gap-2 border border-flame/60 bg-flame/10 px-6 py-3 font-tech text-xs uppercase tracking-widest text-ivory hover:bg-flame/20 transition-all"
          >
            Return Home <span className="text-flame">→</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export function RootLayout() {
  return (
    <div className="relative min-h-screen bg-background">
      <SiteHeader />
      <main className="relative">
        <Outlet />
      </main>
      <SiteFooter />
    </div>
  );
}
