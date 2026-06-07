import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  TrendingUp,
  TrendingDown,
  Activity,
  ArrowUpRight,
  Trophy,
  FileText,
  Sparkles,
  CalendarClock,
} from "lucide-react";
import { getSession } from "@/lib/portalAuth";

export const Route = createFileRoute("/portal/")({
  component: DashboardHome,
});

const stats = {
  package: "Free Trial",
  expires: "Jun 07, 2026",
  totalUnits: 7.3,
  winRate: 0,
  wins: 0,
  losses: 1,
  graded: 1,
  activePicks: 0,
  totalPicks: 1,
};

const bySport = [
  { sport: "NBA", units: -2.2, record: "0-1", pct: 35 },
  { sport: "NHL", units: 0, record: "0-0", pct: 0 },
  { sport: "MLB", units: 0, record: "0-0", pct: 0 },
];

const history = [
  { id: "h1", sport: "NBA", matchup: "Knicks vs Spurs", date: "Jun 05", units: 1, result: "LOSS", pl: -2.2 },
];

const articles = [
  { id: "a1", league: "NHL", date: "Jun 06", title: "Stanley Cup Final Game 3: Hurricanes vs. Knights" },
  { id: "a2", league: "MLB", date: "Jun 06", title: "Athletics vs. Astros best bets and prediction" },
  { id: "a3", league: "NHL", date: "May 24", title: "Western Conference Final Game 6: Stars at Oilers" },
];

function DashboardHome() {
  const [name, setName] = useState("Operator");
  useEffect(() => {
    const s = getSession();
    if (s) setName(s.name.split(" ")[0]);
  }, []);

  return (
    <div className="space-y-8">
      <PortalHeader
        title={`Welcome back, ${name}.`}
        crumb="Here is a snapshot of your handicapping desk today."
        action={
          <Link to="/picks" className="p-btn">
            <Sparkles className="h-4 w-4" /> Today's Live Board
          </Link>
        }
      />

      {/* Stat grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          eyebrow="My Package"
          icon={<Trophy className="h-4 w-4 text-[var(--p-purple)]" />}
          value={stats.package}
          sub={`Expires ${stats.expires}`}
          chip={<span className="p-chip p-chip-purple">★ Access</span>}
        />
        <StatCard
          eyebrow="Total Units"
          icon={<TrendingUp className="h-4 w-4 text-[var(--p-emerald)]" />}
          value={
            <span className="text-[var(--p-emerald)]">+{stats.totalUnits.toFixed(2)}</span>
          }
          sub="Profitable since sign up"
          bar={<Bar pct={73} tone="emerald" />}
        />
        <StatCard
          eyebrow="Win Rate"
          icon={<TrendingDown className="h-4 w-4 text-[var(--p-rose)]" />}
          value={<span className="text-[var(--p-rose)]">{stats.winRate}%</span>}
          sub={`${stats.wins}W · ${stats.losses}L · ${stats.graded} graded`}
          bar={<Bar pct={stats.winRate || 6} tone="rose" />}
        />
        <StatCard
          eyebrow="Active Picks"
          icon={<Activity className="h-4 w-4 text-[var(--p-blue)]" />}
          value={stats.activePicks}
          sub={`${stats.totalPicks} total picks`}
          bar={
            <div className="flex gap-1">
              {Array.from({ length: 10 }).map((_, i) => (
                <div
                  key={i}
                  className="h-2 flex-1 rounded-sm"
                  style={{
                    background:
                      i < stats.totalPicks ? "var(--p-blue)" : "var(--p-surface-muted)",
                  }}
                />
              ))}
            </div>
          }
        />
      </div>

      {/* Active + by sport */}
      <div className="grid lg:grid-cols-[1.5fr_1fr] gap-4">
        <div className="p-card">
          <PanelHeader title="Active Picks" rightHref="/portal/picks" rightLabel="View all" />
          <div className="px-6 py-14 grid place-items-center text-center">
            <div className="w-14 h-14 grid place-items-center rounded-full bg-[var(--p-blue-soft)] mb-4">
              <FileText className="h-5 w-5 text-[var(--p-blue)]" />
            </div>
            <div className="text-[15px] font-semibold">No picks on the board</div>
            <p className="text-sm text-[var(--p-text-muted)] mt-1 max-w-sm">
              When our analysts release a play, it will show up here in real time.
            </p>
            <Link to="/picks" className="p-btn mt-5">
              Open Live Board <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        </div>

        <div className="p-card">
          <PanelHeader title="By Sport" rightHref="/trends" rightLabel="Full trends" />
          <div className="p-6 space-y-5">
            {bySport.map((s) => (
              <div key={s.sport}>
                <div className="flex items-end justify-between mb-2">
                  <div className="text-sm font-semibold">{s.sport}</div>
                  <div className="text-right">
                    <div
                      className={`p-stat-num text-sm ${
                        s.units < 0
                          ? "text-[var(--p-rose)]"
                          : s.units > 0
                          ? "text-[var(--p-emerald)]"
                          : "text-[var(--p-text-muted)]"
                      }`}
                    >
                      {s.units > 0 ? "+" : ""}
                      {s.units.toFixed(1)}u
                    </div>
                    <div className="text-[10px] tracking-[0.18em] text-[var(--p-text-faint)]">
                      {s.record}
                    </div>
                  </div>
                </div>
                <Bar pct={s.pct} tone={s.units < 0 ? "rose" : "blue"} />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* History + dispatches */}
      <div className="grid lg:grid-cols-[1.5fr_1fr] gap-4">
        <div className="p-card">
          <PanelHeader title="Pick History" rightHref="/portal/picks" rightLabel="See all" />
          <div className="hidden md:grid grid-cols-[60px_80px_1fr_70px_90px_90px] gap-3 px-6 py-3 text-[10px] tracking-[0.18em] text-[var(--p-text-faint)] border-b border-[var(--p-border)] font-semibold">
            <span>LEAGUE</span><span>DATE</span><span>MATCHUP</span>
            <span className="text-right">UNITS</span>
            <span className="text-right">RESULT</span>
            <span className="text-right">P/L</span>
          </div>
          {history.map((h) => (
            <div
              key={h.id}
              className="grid grid-cols-[60px_80px_1fr_70px_90px_90px] gap-3 px-6 py-4 border-b border-[var(--p-border)] items-center text-sm last:border-b-0"
            >
              <span className="text-[11px] font-bold text-[var(--p-blue)]">{h.sport}</span>
              <span className="p-stat-num text-[var(--p-text-muted)]">{h.date}</span>
              <span className="font-medium truncate">{h.matchup}</span>
              <span className="text-right p-stat-num text-[var(--p-text-muted)]">{h.units}u</span>
              <span className="text-right">
                <span className="p-chip p-chip-rose">{h.result}</span>
              </span>
              <span className="text-right p-stat-num font-bold text-[var(--p-rose)]">
                {h.pl.toFixed(2)}u
              </span>
            </div>
          ))}
        </div>

        <div className="p-card">
          <PanelHeader title="Latest Dispatches" rightHref="/articles" rightLabel="All articles" />
          <div>
            {articles.map((a, i) => (
              <Link
                key={a.id}
                to="/articles"
                className={`block px-6 py-4 hover:bg-[var(--p-surface-muted)] transition group ${
                  i !== articles.length - 1 ? "border-b border-[var(--p-border)]" : ""
                }`}
              >
                <div className="flex items-center gap-2 text-[11px]">
                  <span className="p-chip p-chip-neutral">{a.league}</span>
                  <span className="flex items-center gap-1 text-[var(--p-text-faint)]">
                    <CalendarClock className="h-3 w-3" /> {a.date}
                  </span>
                </div>
                <div className="mt-2 text-[14px] font-semibold leading-snug group-hover:text-[var(--p-blue)]">
                  {a.title}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export function PortalHeader({
  title,
  crumb,
  action,
}: {
  title: string;
  subtitle?: string;
  crumb?: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
      <div>
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight">{title}</h1>
        {crumb && <p className="mt-1.5 text-[15px] text-[var(--p-text-muted)]">{crumb}</p>}
      </div>
      {action}
    </div>
  );
}

function StatCard({
  eyebrow,
  icon,
  value,
  sub,
  bar,
  chip,
}: {
  eyebrow: string;
  icon: React.ReactNode;
  value: React.ReactNode;
  sub: string;
  bar?: React.ReactNode;
  chip?: React.ReactNode;
}) {
  return (
    <div className="p-card p-5">
      <div className="flex items-center justify-between">
        <span className="p-eyebrow">{eyebrow}</span>
        <span className="w-8 h-8 grid place-items-center rounded-lg bg-[var(--p-surface-muted)]">
          {icon}
        </span>
      </div>
      <div className="mt-3 p-stat-num text-3xl">{value}</div>
      {chip && <div className="mt-1.5">{chip}</div>}
      {bar && <div className="mt-4">{bar}</div>}
      <div className="mt-2 text-[11px] text-[var(--p-text-faint)]">{sub}</div>
    </div>
  );
}

function Bar({ pct, tone }: { pct: number; tone: "emerald" | "rose" | "blue" }) {
  const color =
    tone === "emerald" ? "var(--p-emerald)" : tone === "rose" ? "var(--p-rose)" : "var(--p-blue)";
  return (
    <div className="h-1.5 w-full bg-[var(--p-surface-muted)] rounded-full overflow-hidden">
      <div
        className="h-full rounded-full"
        style={{ width: `${Math.min(100, Math.abs(pct))}%`, background: color }}
      />
    </div>
  );
}

export function PanelHeader({
  title,
  rightLabel,
  rightHref,
}: {
  title: string;
  rightLabel?: string;
  rightHref?: string;
}) {
  return (
    <div className="flex items-center justify-between px-6 py-4 border-b border-[var(--p-border)]">
      <h3 className="text-[15px] font-semibold tracking-tight">{title}</h3>
      {rightHref && rightLabel && (
        <Link
          to={rightHref}
          className="text-[12px] font-semibold text-[var(--p-blue)] hover:text-[var(--p-blue-hover)] inline-flex items-center gap-1"
        >
          {rightLabel} <ArrowUpRight className="h-3.5 w-3.5" />
        </Link>
      )}
    </div>
  );
}
