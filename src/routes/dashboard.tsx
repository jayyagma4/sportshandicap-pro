import { createFileRoute, Link } from "@tanstack/react-router";
import { ScrollReveal } from "@/components/ScrollReveal";
import {
  TrendingUp,
  TrendingDown,
  Activity,
  Clock,
  ArrowUpRight,
  Trophy,
  FileText,
  Settings,
  CreditCard,
  User,
} from "lucide-react";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Dashboard | Sportshandicapper Terminal" },
      { name: "description", content: "Your personal handicapping terminal: package, units, pick history, and articles." },
    ],
  }),
  component: DashboardPage,
});

const user = {
  name: "Jay Yagma",
  initial: "J",
  package: "Free Trial",
  status: "★ Access",
  expires: "JUN 07, 2026",
  daysLeft: 0,
  totalUnits: 7.3,
  winRate: 0,
  wins: 0,
  losses: 1,
  graded: 1,
  activePicks: 0,
  totalPicks: 1,
  joined: "JUN 07, 2026",
};

const bySport = [
  { sport: "NBA", units: -2.2, record: "0-1", pct: 35 },
];

const history = [
  { id: "h1", sport: "NBA", matchup: "Knicks vs Spurs", date: "JUN 05", units: 1, result: "LOSS", pl: -2.2 },
];

const articles = [
  { id: "a1", league: "NHL", date: "JUN 06", title: "Stanley Cup Final Game 3: Hurricanes vs. Knights - Who Controls Vegas?" },
  { id: "a2", league: "MLB", date: "JUN 06", title: "June 6th, 2026 GAME PREVIEW: Oakland Athletics vs. Houston Astros analysis, best bets, prediction and odds" },
  { id: "a3", league: "NHL", date: "MAY 24", title: "Western Conference Final Game 6: Stars at Oilers Late Night Series Decider" },
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

function DashboardPage() {
  const date = "SUN, JUN 07 2026";

  return (
    <div className="terminal-grid min-h-screen">
      <div className="container-x py-8">
        {/* Command bar */}
        <ScrollReveal>
          <div className="terminal-panel rounded-sm">
            <div className="terminal-panel-header">
              <div className="flex items-center gap-3">
                <span className="led-dot bg-emerald-400 text-emerald-400 live-blink" />
                <span className="text-white">ACCOUNT / TERMINAL</span>
                <span className="text-slate-600">SESSION {date}</span>
              </div>
              <span className="text-slate-600">PERSONAL DESK</span>
            </div>

            <div className="grid lg:grid-cols-[280px_1fr] gap-0 border-t border-white/5">
              {/* Identity */}
              <div className="border-r border-white/5 p-6 flex items-center gap-4">
                <div className="w-14 h-14 grid place-items-center bg-amber-500/15 border border-amber-400/30 text-amber-300 font-black text-2xl font-mono-num">
                  {user.initial}
                </div>
                <div className="min-w-0">
                  <div className="text-[10px] tracking-[0.2em] text-slate-500">OPERATOR</div>
                  <div className="text-white font-semibold truncate">{user.name}</div>
                  <div className="text-[11px] text-amber-300/90 mt-0.5">{user.status} · JOINED {user.joined}</div>
                </div>
              </div>

              {/* Headline */}
              <div className="p-6">
                <div className="flex items-baseline gap-3 flex-wrap">
                  <h1 className="text-3xl md:text-4xl font-black tracking-tight text-white">
                    Welcome back, <span className="text-amber-300">{user.name.split(" ")[0]}</span>.
                  </h1>
                  <span className="text-[11px] text-slate-500 tracking-[0.18em]">{user.daysLeft} DAYS LEFT ON {user.package.toUpperCase()}</span>
                </div>
                <p className="mt-2 text-sm text-slate-400 max-w-2xl">
                  Live snapshot of your subscription, capital deployed, and content access. All values graded and timestamped.
                </p>
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* Stat grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mt-4">
          <ScrollReveal delay={40}>
            <div className="terminal-panel rounded-sm p-5 h-full">
              <div className="flex items-center justify-between">
                <span className="text-[10px] tracking-[0.2em] text-slate-500">MY PACKAGE</span>
                <Trophy className="h-3.5 w-3.5 text-amber-300" />
              </div>
              <div className="mt-3 text-2xl font-black text-white">{user.package}</div>
              <div className="mt-1 text-[11px] text-amber-300">{user.status}</div>
              <div className="mt-4 h-1 bg-white/5">
                <div className="h-full w-full bg-gradient-to-r from-amber-400 to-amber-200" />
              </div>
              <div className="mt-2 text-[10px] tracking-[0.18em] text-slate-500">EXPIRES {user.expires}</div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={80}>
            <div className="terminal-panel rounded-sm p-5 h-full">
              <div className="flex items-center justify-between">
                <span className="text-[10px] tracking-[0.2em] text-slate-500">TOTAL UNITS</span>
                <TrendingUp className="h-3.5 w-3.5 text-emerald-400" />
              </div>
              <div className="mt-3 text-3xl font-black text-emerald-400 font-mono-num">
                +{user.totalUnits.toFixed(2)}
              </div>
              <div className="mt-4">
                <Bar pct={73} />
              </div>
              <div className="mt-2 text-[10px] tracking-[0.18em] text-slate-500">PROFITABLE SINCE SIGN-UP</div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={120}>
            <div className="terminal-panel rounded-sm p-5 h-full">
              <div className="flex items-center justify-between">
                <span className="text-[10px] tracking-[0.2em] text-slate-500">WIN RATE</span>
                <TrendingDown className="h-3.5 w-3.5 text-rose-400" />
              </div>
              <div className="mt-3 text-3xl font-black text-rose-400 font-mono-num">{user.winRate}%</div>
              <div className="mt-4">
                <Bar pct={user.winRate} negative />
              </div>
              <div className="mt-2 text-[10px] tracking-[0.18em] text-slate-500 font-mono-num">
                {user.wins}W · {user.losses}L · {user.graded} GRADED
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={160}>
            <div className="terminal-panel rounded-sm p-5 h-full">
              <div className="flex items-center justify-between">
                <span className="text-[10px] tracking-[0.2em] text-slate-500">ACTIVE PICKS</span>
                <Activity className="h-3.5 w-3.5 text-cyan-300" />
              </div>
              <div className="mt-3 text-3xl font-black text-white font-mono-num">{user.activePicks}</div>
              <div className="mt-4 flex gap-0.5">
                {Array.from({ length: 12 }).map((_, i) => (
                  <div key={i} className={`h-3 flex-1 ${i < user.totalPicks ? "bg-amber-300/70" : "bg-white/5"}`} />
                ))}
              </div>
              <div className="mt-2 text-[10px] tracking-[0.18em] text-slate-500">{user.totalPicks} TOTAL PICKS SINCE SIGN-UP</div>
            </div>
          </ScrollReveal>
        </div>

        {/* Two-column: Active board + By Sport */}
        <div className="grid lg:grid-cols-[1.4fr_1fr] gap-3 mt-4">
          <ScrollReveal>
            <div className="terminal-panel rounded-sm h-full">
              <div className="terminal-panel-header">
                <div className="flex items-center gap-2">
                  <span className="led-dot bg-amber-400 text-amber-400" />
                  <span className="text-white">ACTIVE PICKS</span>
                </div>
                <Link to="/picks" className="text-amber-300 hover:text-amber-200 flex items-center gap-1">
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
          </ScrollReveal>

          <ScrollReveal delay={100}>
            <div className="terminal-panel rounded-sm h-full">
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
                      <div className="text-white font-semibold tracking-wide">{s.sport}</div>
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
                <div className="text-[10px] tracking-[0.18em] text-slate-600 pt-2 border-t border-white/5">
                  EXPAND COVERAGE BY UPGRADING PACKAGE
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>

        {/* Pick history + articles */}
        <div className="grid lg:grid-cols-[1.4fr_1fr] gap-3 mt-4">
          <ScrollReveal>
            <div className="terminal-panel rounded-sm">
              <div className="terminal-panel-header">
                <div className="flex items-center gap-2">
                  <Clock className="h-3 w-3 text-slate-500" />
                  <span className="text-white">PICK HISTORY</span>
                </div>
                <Link to="/picks" className="text-amber-300 hover:text-amber-200 flex items-center gap-1">
                  SEE ALL <ArrowUpRight className="h-3 w-3" />
                </Link>
              </div>
              <div className="hidden md:grid grid-cols-[60px_60px_1fr_60px_80px_80px] gap-3 px-6 py-2 text-[10px] tracking-[0.18em] text-slate-500 border-b border-white/5">
                <span>LG</span>
                <span>DATE</span>
                <span>MATCHUP</span>
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
                    <span className={`px-2 py-0.5 text-[10px] font-bold tracking-wider ${h.result === "LOSS" ? "bg-rose-500/15 text-rose-300 border border-rose-400/30" : "bg-emerald-500/15 text-emerald-300 border border-emerald-400/30"}`}>
                      {h.result}
                    </span>
                  </span>
                  <span className={`text-right font-mono-num font-bold ${h.pl < 0 ? "text-rose-400" : "text-emerald-400"}`}>
                    {h.pl > 0 ? "+" : ""}{h.pl.toFixed(2)}u
                  </span>
                </div>
              ))}
              <div className="px-6 py-4 text-[11px] text-slate-500">
                Showing {history.length} of {history.length} graded entries.
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={100}>
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
                  <Link
                    key={a.id}
                    to="/articles"
                    className="block px-6 py-4 hover:bg-white/[0.02] transition group"
                  >
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
          </ScrollReveal>
        </div>

        {/* Account utility row */}
        <ScrollReveal delay={80}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-4">
            {[
              { icon: User, label: "MY PROFILE", to: "/dashboard" as const },
              { icon: CreditCard, label: "PACKAGES", to: "/packages" as const },
              { icon: Settings, label: "SETTINGS", to: "/dashboard" as const },
              { icon: Activity, label: "MY PICKS", to: "/picks" as const },
            ].map((item) => (
              <Link
                key={item.label}
                to={item.to}
                className="terminal-panel rounded-sm p-4 flex items-center justify-between group hover:border-amber-300/30 transition"
              >
                <div className="flex items-center gap-3">
                  <item.icon className="h-4 w-4 text-slate-400 group-hover:text-amber-300" />
                  <span className="text-[11px] tracking-[0.2em] text-slate-300 group-hover:text-white">{item.label}</span>
                </div>
                <ArrowUpRight className="h-3.5 w-3.5 text-slate-600 group-hover:text-amber-300" />
              </Link>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </div>
  );
}
