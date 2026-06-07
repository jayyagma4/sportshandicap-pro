import { createFileRoute, Link, Outlet, useNavigate, useRouterState } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  LayoutDashboard,
  ListChecks,
  Package,
  User,
  Settings,
  LogOut,
  ArrowLeft,
  Bell,
  Search,
} from "lucide-react";
import { getSession, isAuthed, signOut, type PortalSession } from "@/lib/portalAuth";

export const Route = createFileRoute("/portal")({
  head: () => ({
    meta: [
      { title: "Dashboard | Sportshandicapper" },
      { name: "description", content: "Your private handicapping dashboard." },
    ],
  }),
  component: PortalLayout,
});

const nav = [
  { label: "Overview", to: "/portal" as const, icon: LayoutDashboard, exact: true },
  { label: "My Picks", to: "/portal/picks" as const, icon: ListChecks },
  { label: "Packages", to: "/portal/packages" as const, icon: Package },
  { label: "Profile", to: "/portal/profile" as const, icon: User },
  { label: "Settings", to: "/portal/settings" as const, icon: Settings },
];

function PortalLayout() {
  const navigate = useNavigate();
  const [session, setSession] = useState<PortalSession | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!isAuthed()) {
      navigate({ to: "/login", replace: true });
      return;
    }
    setSession(getSession());
    setReady(true);
  }, [navigate]);

  if (!ready) {
    return (
      <div className="portal-theme min-h-screen grid place-items-center">
        <div className="text-xs tracking-[0.3em] text-[var(--p-text-faint)]">SIGNING YOU IN…</div>
      </div>
    );
  }

  const onSignOut = () => {
    signOut();
    navigate({ to: "/login", replace: true });
  };

  return (
    <div className="portal-theme min-h-screen">
      <TopNav session={session} onSignOut={onSignOut} />
      <main className="max-w-[1240px] mx-auto px-5 lg:px-8 py-8">
        <Outlet />
      </main>
      <footer className="max-w-[1240px] mx-auto px-5 lg:px-8 py-10 text-xs text-[var(--p-text-faint)] flex flex-wrap items-center justify-between gap-3 border-t border-[var(--p-border)] mt-10">
        <span>© 2026 INSPIN. All rights reserved.</span>
        <Link to="/" className="inline-flex items-center gap-1.5 hover:text-[var(--p-blue)]">
          <ArrowLeft className="h-3 w-3" /> Back to inspin.com
        </Link>
      </footer>
    </div>
  );
}

function TopNav({
  session,
  onSignOut,
}: {
  session: PortalSession | null;
  onSignOut: () => void;
}) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const isActive = (to: string, exact?: boolean) =>
    exact ? pathname === to : pathname === to || pathname.startsWith(to + "/");

  return (
    <header className="sticky top-0 z-30 bg-[var(--p-surface)]/85 backdrop-blur border-b border-[var(--p-border)]">
      <div className="max-w-[1240px] mx-auto px-5 lg:px-8 h-16 flex items-center gap-6">
        <Link to="/portal" className="flex items-center gap-2">
          <span className="w-8 h-8 rounded-lg bg-[var(--p-blue)] grid place-items-center text-white font-black text-sm">i</span>
          <span className="font-bold tracking-tight text-[15px]">INSPIN</span>
          <span className="text-[10px] tracking-[0.18em] text-[var(--p-purple)] font-bold ml-1 hidden sm:inline">DASHBOARD</span>
        </Link>

        <nav className="hidden lg:flex items-center gap-1 ml-4">
          {nav.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className={`p-topnav-link ${isActive(item.to, item.exact) ? "is-active" : ""}`}
            >
              <item.icon className="h-3.5 w-3.5" />
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-2">
          <button className="hidden sm:grid place-items-center h-10 w-10 rounded-full hover:bg-[var(--p-surface-muted)] text-[var(--p-text-muted)]">
            <Search className="h-4 w-4" />
          </button>
          <button className="relative hidden sm:grid place-items-center h-10 w-10 rounded-full hover:bg-[var(--p-surface-muted)] text-[var(--p-text-muted)]">
            <Bell className="h-4 w-4" />
            <span className="absolute top-2.5 right-2.5 w-1.5 h-1.5 rounded-full bg-[var(--p-purple)]" />
          </button>

          {session && (
            <div className="flex items-center gap-2.5 pl-2 sm:pl-3 sm:ml-1 sm:border-l sm:border-[var(--p-border)]">
              <div className="w-9 h-9 grid place-items-center rounded-full bg-[var(--p-blue-soft)] text-[var(--p-blue)] font-bold text-sm">
                {session.initial}
              </div>
              <div className="hidden sm:block leading-tight">
                <div className="text-[13px] font-semibold">{session.name}</div>
                <div className="text-[10px] tracking-[0.16em] text-[var(--p-purple)] font-bold">★ FREE TRIAL</div>
              </div>
              <button
                onClick={onSignOut}
                className="ml-1 grid place-items-center h-9 w-9 rounded-full hover:bg-[var(--p-surface-muted)] text-[var(--p-text-muted)]"
                title="Sign out"
              >
                <LogOut className="h-4 w-4" />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Mobile nav */}
      <div className="lg:hidden border-t border-[var(--p-border)] overflow-x-auto">
        <div className="flex items-center gap-1 px-4 py-2 w-max">
          {nav.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className={`p-topnav-link whitespace-nowrap ${isActive(item.to, item.exact) ? "is-active" : ""}`}
            >
              <item.icon className="h-3.5 w-3.5" />
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
}
