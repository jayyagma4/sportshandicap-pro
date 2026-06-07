import { createFileRoute, Link, Outlet, useNavigate, useRouterState } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  LayoutDashboard,
  ListChecks,
  Package,
  FileText,
  BarChart3,
  TrendingUp,
  Activity,
  Wrench,
  User,
  Settings,
  LogOut,
  ArrowLeft,
} from "lucide-react";
import logo from "@/assets/logo.png";
import { getSession, isAuthed, signOut, type PortalSession } from "@/lib/portalAuth";

export const Route = createFileRoute("/portal")({
  head: () => ({
    meta: [
      { title: "Terminal | Sportshandicapper" },
      { name: "description", content: "Your private handicapping terminal." },
    ],
  }),
  component: PortalLayout,
});

const menu = [
  { label: "Dashboard", to: "/portal" as const, icon: LayoutDashboard, exact: true },
  { label: "My Picks", to: "/portal/picks" as const, icon: ListChecks },
  { label: "Packages", to: "/portal/packages" as const, icon: Package },
];

const content = [
  { label: "Articles", to: "/articles" as const, icon: FileText },
  { label: "Consensus", to: "/consensus" as const, icon: BarChart3 },
  { label: "Trends", to: "/trends" as const, icon: TrendingUp },
  { label: "Live Odds", to: "/live-odds" as const, icon: Activity },
  { label: "Betting Tools", to: "/betting-tools" as const, icon: Wrench },
];

const account = [
  { label: "My Profile", to: "/portal/profile" as const, icon: User },
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
      <div className="min-h-screen grid place-items-center bg-[#06080F]">
        <div className="text-[11px] tracking-[0.3em] text-slate-500">AUTHENTICATING…</div>
      </div>
    );
  }

  const onSignOut = () => {
    signOut();
    navigate({ to: "/login", replace: true });
  };

  return (
    <div className="min-h-screen flex bg-[#06080F] text-white">
      <Sidebar onSignOut={onSignOut} session={session} />
      <main className="flex-1 min-w-0 lg:ml-[260px]">
        <Outlet />
      </main>
    </div>
  );
}

function Sidebar({
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
    <aside className="hidden lg:flex fixed left-0 top-0 bottom-0 w-[260px] flex-col border-r border-white/5 bg-[#080A14]">
      <div className="px-6 py-5 border-b border-white/5 flex items-center gap-2">
        <img src={logo} alt="INSPIN" className="h-9 w-auto" />
      </div>

      <div className="flex-1 overflow-y-auto px-3 py-5 space-y-6">
        <Section label="Menu">
          {menu.map((item) => (
            <NavItem key={item.to} {...item} active={isActive(item.to, item.exact)} />
          ))}
        </Section>

        <Section label="Content">
          {content.map((item) => (
            <NavItem key={item.to} {...item} active={isActive(item.to)} />
          ))}
        </Section>

        <Section label="Account">
          {account.map((item) => (
            <NavItem key={item.to} {...item} active={isActive(item.to)} />
          ))}
          <button
            onClick={onSignOut}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-md text-sm text-slate-300 hover:bg-white/5 hover:text-white transition"
          >
            <LogOut className="h-4 w-4" />
            Log Out
          </button>
        </Section>
      </div>

      <div className="border-t border-white/5">
        <Link
          to="/"
          className="flex items-center gap-2 px-6 py-3 text-[11px] tracking-[0.18em] text-slate-500 hover:text-amber-300 transition"
        >
          <ArrowLeft className="h-3 w-3" />
          BACK TO INSPIN.COM
        </Link>
        {session && (
          <div className="px-4 py-3 border-t border-white/5 flex items-center gap-3">
            <div className="w-9 h-9 grid place-items-center bg-amber-500/15 border border-amber-400/30 text-amber-300 font-black text-sm font-mono-num">
              {session.initial}
            </div>
            <div className="min-w-0">
              <div className="text-sm text-white truncate font-semibold">{session.name}</div>
              <div className="text-[10px] tracking-[0.18em] text-amber-300/90">★ ACCESS</div>
            </div>
          </div>
        )}
      </div>
    </aside>
  );
}

function Section({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="px-3 mb-2 text-[10px] tracking-[0.22em] text-slate-600 font-bold">{label}</div>
      <div className="space-y-0.5">{children}</div>
    </div>
  );
}

function NavItem({
  label,
  to,
  icon: Icon,
  active,
}: {
  label: string;
  to: string;
  icon: React.ComponentType<{ className?: string }>;
  active: boolean;
}) {
  return (
    <Link
      to={to}
      className={`flex items-center gap-3 px-3 py-2.5 rounded-md text-sm transition ${
        active
          ? "bg-amber-300 text-black font-semibold"
          : "text-slate-300 hover:bg-white/5 hover:text-white"
      }`}
    >
      <Icon className="h-4 w-4" />
      {label}
    </Link>
  );
}
