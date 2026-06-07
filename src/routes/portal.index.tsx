import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  TrendingUp,
  TrendingDown,
  Activity,
  Clock,
  ArrowUpRight,
  Trophy,
  FileText,
} from "lucide-react";
import { getSession } from "@/lib/portalAuth";

export const Route = createFileRoute("/portal/")({
  component: DashboardHome,
});

const stats = {
  package: "Free Trial",
  status: "★ Access",
  expires: "JUN 07, 2026",
  totalUnits: 7.3,
  winRate: 0,
  wins: 0,
  losses: 1,
  graded: 1,
  activePicks: 0,
  totalPicks: 1,
};

const bySport = [{ sport: "NBA", units: -2.2, record: "0-1", pct: 35 }];

const history = [
  { id: "h1", sport: "NBA", matchup: "Knicks vs Spurs", date: "JUN 05", units: 1, result: "LOSS", pl: -2.2 },
];

const articles = [
  { id: "a1", league: "NHL", date: "JUN 06", title: "Stanley Cup Final Game 3: Hurricanes vs. Knights" },
  { id: "a2", league: "MLB", date: "JUN 06", title: "Athletics vs. Astros best bets and prediction" },
  { id: "a3", league: "NHL", date: "MAY 24", title: "Western Conference Final Game 6: Stars at Oilers" },
];

function Bar({ pct, negative }: { pct: number; negative?: boolean }) {
  return (
    <div className="h-1 w-full bg-white/5 overflow-hidden">
      <div
        className={`h-full ${negative ? "bg-rose-400" : "bg-emerald-400"}`}
        style={{ width: `${Math.min(100, Math.abs(pct))}%` }}
      />
    </div>
  );
}

function DashboardHome() {
  const [name, setName] = useState("Operator");
  useEffect(() => {
    const s = getSession();
    if (s) setName(s.name.split(" ")[0]);
  }, []);

  return (
    <div className="p-6 lg:p-8 space-y-6">
      <PortalHeader title="Dashboard" subtitle={`Welcome back, ${name}.`} crumb="Live snapshot of your operator desk." />

      {/* Stat grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <div className="terminal-panel rounded-sm p-5">
          <div className="flex items-center justify-between">
            <span className="text-[10px] tracking-[0.2em] text-slate-500">MY PACKAGE</span>
            <Trophy className="h-3.5 w-3.5 text-amber-300" />
          </div>
          <div className="mt-3 text-2xl font-black text-white">{stats.package}</div>
          <div className="mt-1 text-[11px] text-amber-300">{stats.status}</div>
          <div className="mt-4 h-1 bg-white/5">
            <div className="h-full w-full bg-gradient-to-r from-amber-400 to-amber-200" />
          </div>
          <div className="mt-2 text-[10px] tracking-[0.18em] text-slate-500">EXPIRES {stats.expires}</div>
        </div>

        <div className="terminal-panel rounded-sm p-5">
          <div className="flex items-center justify-between">
            <span className="text-[10px] tracking-[0.2em] text-slate-500">TOTAL UNITS</span>
            <TrendingUp className="h-3.5 w-3.5 text-emerald-400" />
          </div>
          <div className="mt-3 text-3xl font-black text-emerald-400 font-mono-num">
            +{stats.totalUnits.toFixed(2)}
          </div>
          <div className="mt-4"><Bar pct={73} /></div>
          <div className="mt-2 text-[10px] tracking-[0.18em] text-slate-500">PROFITABLE SINCE SIGN-UP</div>
        </div>

        <div className="terminal-panel rounded-sm p-5">
          <div className="flex items-center justify-between">
            <span className="text-[10px] tracking-[0.2em] text-slate-500">WIN RATE</span>
            <TrendingDown className="h-3.5 w-3.5 text-rose-400" />
          </div>
          <div className="mt-3 text-3xl font-black text-rose-400 font-mono-num">{stats.winRate}%</div>
          <div className="mt-4"><Bar pct={stats.winRate} negative /></div>
          <div className="mt-2 text-[10px] tracking-[0.18em] text-slate-500 font-mono-num">
            {stats.wins}W · {stats.losses}L · {stats.graded} GRADED
          </div>
        </div>

        <div className="terminal-panel rounded-sm p-5">
          <div className="flex items-center justify-between">
            <span className="text-[10px] tracking-[0.2em] text-slate-500">ACTIVE PICKS</span>
            <Activity className="h-3.5 w-3.5 text-cyan-300" />
          </div>
          <div className="mt-3 text-3xl font-black text-white font-mono-num">{stats.activePicks}</div>
          <div className="mt-4 flex gap-0.5">
            {Array.from({ length: 12 }).map((_, i) => (
              <div key={i} className={`h-3 flex-1 ${i < stats.totalPicks ? "bg-amber-300/70" : "bg-white/5"}`} />
            ))}
          </div>
          <div className="mt-2 text-[10px] tracking-[0.18em] text-slate-500">{stats.totalPicks} TOTAL PICKS</div>
        </div>
      </div>

      {/* Active + By sport */}
      <div className="grid lg:grid-cols-[1.4fr_1fr] gap-3">
        <div className="terminal-panel rounded-sm">
          <div className="terminal-panel-header">
            <div className="flex items-center gap-2">
              <span className="led-dot bg-amber-400 text-amber-400" />
              <span className="text-white">ACTIVE PICKS</span>
            </div>
            <Link to="/portal/picks" className="text-amber-300 hover:text-amber-200 flex items-center gap-1">
              VIEW ALL <ArrowUpRight className="h-3 w-3" />
            </Link>
          </div>
          <div className="px-6 py-16 grid place-items-center text-center">
            <div className="w-12 h-12 grid place-items-center border border-white/10 mb-4">
              <FileText className="h-5 w-5 text-slate-500" />
            </div>
            <div className="text-sm text-slate-400">No active picks on the board.</div>
            <Link to="/picks" className="mt-4 inline-flex items-center gap-2 text-[11px] tracking-[0.2em] text-amber-300 hover:text-amber-200 border border-amber-300/30 px-3 py-1.5">
              OPEN LIVE BOARD <ArrowUpRight className="h-3 w-3" />
            </Link>
          </div>
        </div>

        <div className="terminal-panel rounded-sm">
          <div className="terminal-panel-header">
            <div className="flex items-center gap-2">
              <span className="led-dot bg-cyan-400 text-cyan-400" />
              <span className="text-white">BY SPORT</span>
            </div>
            <Link to="/trends" className="text-amber-300 hover:text-amber-200 flex items-center gap-1">
              FULL TRENDS <ArrowUpRight className="h-3 w-3" />
            </Link>
          </div>
          <div className="p-6 space-y-5">
            {bySport.map((s) => (
              <div key={s.sport}>
                <div className="flex items-end justify-between mb-2">
                  <div className="text-white font-semibold">{s.sport}</div>
                  <div className="text-right">
                    <div className={`font-mono-num font-bold ${s.units < 0 ? "text-rose-400" : "text-emerald-400"}`}>
                      {s.units > 0 ? "+" : ""}{s.units.toFixed(1)}u
                    </div>
                    <div className="text-[10px] tracking-[0.18em] text-slate-500 font-mono-num">{s.record}</div>
                  </div>
                </div>
                <Bar pct={s.pct} negative={s.units < 0} />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* History + articles */}
      <div className="grid lg:grid-cols-[1.4fr_1fr] gap-3">
        <div className="terminal-panel rounded-sm">
          <div className="terminal-panel-header">
            <div className="flex items-center gap-2">
              <Clock className="h-3 w-3 text-slate-500" />
              <span className="text-white">PICK HISTORY</span>
            </div>
            <Link to="/portal/picks" className="text-amber-300 hover:text-amber-200 flex items-center gap-1">
              SEE ALL <ArrowUpRight className="h-3 w-3" />
            </Link>
          </div>
          <div className="hidden md:grid grid-cols-[60px_60px_1fr_60px_80px_80px] gap-3 px-6 py-2 text-[10px] tracking-[0.18em] text-slate-500 border-b border-white/5">
            <span>LG</span><span>DATE</span><span>MATCHUP</span>
            <span className="text-right">UNITS</span>
            <span className="text-right">RESULT</span>
            <span className="text-right">P/L</span>
          </div>
          {history.map((h) => (
            <div key={h.id} className="grid grid-cols-[60px_60px_1fr_60px_80px_80px] gap-3 px-6 py-4 border-b border-white/5 items-center text-sm">
              <span className="text-[10px] tracking-[0.18em] text-amber-300 font-bold">{h.sport}</span>
              <span className="font-mono-num text-slate-400">{h.date}</span>
              <span className="text-white truncate">{h.matchup}</span>
              <span className="text-right font-mono-num text-slate-300">{h.units}u</span>
              <span className="text-right">
                <span className="px-2 py-0.5 text-[10px] font-bold tracking-wider bg-rose-500/15 text-rose-300 border border-rose-400/30">
                  {h.result}
                </span>
              </span>
              <span className="text-right font-mono-num font-bold text-rose-400">
                {h.pl.toFixed(2)}u
              </span>
            </div>
          ))}
        </div>

        <div className="terminal-panel rounded-sm">
          <div className="terminal-panel-header">
            <div className="flex items-center gap-2">
              <FileText className="h-3 w-3 text-slate-500" />
              <span className="text-white">LATEST DISPATCHES</span>
            </div>
            <Link to="/articles" className="text-amber-300 hover:text-amber-200 flex items-center gap-1">
              ALL ARTICLES <ArrowUpRight className="h-3 w-3" />
            </Link>
          </div>
          <div className="divide-y divide-white/5">
            {articles.map((a) => (
              <Link key={a.id} to="/articles" className="block px-6 py-4 hover:bg-white/[0.02] transition group">
                <div className="flex items-center gap-2 text-[10px] tracking-[0.18em]">
                  <span className="text-amber-300 font-bold">{a.league}</span>
                  <span className="text-slate-600">·</span>
                  <span className="font-mono-num text-slate-500">{a.date}</span>
                </div>
                <div className="mt-1.5 text-sm text-white group-hover:text-amber-200 leading-snug">
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

export function PortalHeader({ title, subtitle, crumb }: { title: string; subtitle?: string; crumb?: string }) {
  return (
    <div className="terminal-panel rounded-sm">
      <div className="terminal-panel-header">
        <div className="flex items-center gap-2">
          <span className="led-dot bg-emerald-400 text-emerald-400" />
          <span className="text-white">{title.toUpperCase()}</span>
        </div>
        <span className="text-slate-600">PERSONAL DESK</span>
      </div>
      <div className="px-6 py-5">
        {subtitle && <h1 className="text-3xl md:text-4xl font-black text-white tracking-tight">{subtitle}</h1>}
        {crumb && <p className="mt-2 text-sm text-slate-400">{crumb}</p>}
      </div>
    </div>
  );
}
