import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight, Filter } from "lucide-react";
import { PortalHeader } from "./portal.index";

export const Route = createFileRoute("/portal/picks")({
  component: MyPicks,
});

const picks = [
  { id: "p1", sport: "NBA", matchup: "Knicks vs Spurs", selection: "Spurs +6.5", units: 1, odds: "-110", result: "LOSS", pl: -2.2, date: "JUN 05" },
  { id: "p2", sport: "NHL", matchup: "Hurricanes vs Knights", selection: "Over 5.5", units: 2, odds: "-115", result: "WIN", pl: +3.6, date: "JUN 02" },
  { id: "p3", sport: "MLB", matchup: "Yankees vs Red Sox", selection: "Yankees ML", units: 1.5, odds: "-140", result: "WIN", pl: +2.1, date: "MAY 30" },
  { id: "p4", sport: "NBA", matchup: "Celtics vs Heat", selection: "Under 213.5", units: 1, odds: "-108", result: "WIN", pl: +1.85, date: "MAY 28" },
  { id: "p5", sport: "NFL", matchup: "Chiefs vs Bills", selection: "Chiefs -3", units: 2, odds: "-105", result: "PUSH", pl: 0, date: "MAY 24" },
  { id: "p6", sport: "NHL", matchup: "Stars vs Oilers", selection: "Oilers ML", units: 1, odds: "+120", result: "WIN", pl: +1.2, date: "MAY 22" },
];

const summary = [
  { k: "RECORD", v: "3-1-1" },
  { k: "ROI", v: "+24.1%" },
  { k: "UNITS", v: "+6.55" },
  { k: "AVG ODDS", v: "-112" },
];

function MyPicks() {
  return (
    <div className="p-6 lg:p-8 space-y-6">
      <PortalHeader title="My Picks" subtitle="My Picks." crumb="Full audit trail of every pick you've taken with INSPIN analysts." />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {summary.map((s) => (
          <div key={s.k} className="terminal-panel rounded-sm p-5">
            <div className="text-[10px] tracking-[0.2em] text-slate-500">{s.k}</div>
            <div className="mt-2 text-3xl font-black text-white font-mono-num">{s.v}</div>
          </div>
        ))}
      </div>

      <div className="terminal-panel rounded-sm">
        <div className="terminal-panel-header">
          <div className="flex items-center gap-2">
            <span className="led-dot bg-amber-400 text-amber-400" />
            <span className="text-white">FULL HISTORY</span>
          </div>
          <button className="flex items-center gap-1 text-slate-400 hover:text-amber-300">
            <Filter className="h-3 w-3" /> FILTERS
          </button>
        </div>
        <div className="hidden md:grid grid-cols-[60px_70px_1.4fr_1fr_70px_70px_90px_90px] gap-3 px-6 py-2 text-[10px] tracking-[0.18em] text-slate-500 border-b border-white/5">
          <span>LG</span><span>DATE</span><span>MATCHUP</span><span>SELECTION</span>
          <span className="text-right">UNITS</span>
          <span className="text-right">ODDS</span>
          <span className="text-right">RESULT</span>
          <span className="text-right">P/L</span>
        </div>
        {picks.map((p) => (
          <div key={p.id} className="grid grid-cols-2 md:grid-cols-[60px_70px_1.4fr_1fr_70px_70px_90px_90px] gap-3 px-6 py-4 border-b border-white/5 items-center text-sm">
            <span className="text-[10px] tracking-[0.18em] text-amber-300 font-bold">{p.sport}</span>
            <span className="font-mono-num text-slate-400">{p.date}</span>
            <span className="text-white truncate">{p.matchup}</span>
            <span className="text-slate-300 truncate">{p.selection}</span>
            <span className="text-right font-mono-num text-slate-300">{p.units}u</span>
            <span className="text-right font-mono-num text-slate-400">{p.odds}</span>
            <span className="text-right">
              <span className={`px-2 py-0.5 text-[10px] font-bold tracking-wider border ${
                p.result === "WIN"
                  ? "bg-emerald-500/15 text-emerald-300 border-emerald-400/30"
                  : p.result === "LOSS"
                  ? "bg-rose-500/15 text-rose-300 border-rose-400/30"
                  : "bg-slate-500/15 text-slate-300 border-slate-400/30"
              }`}>
                {p.result}
              </span>
            </span>
            <span className={`text-right font-mono-num font-bold ${p.pl < 0 ? "text-rose-400" : p.pl > 0 ? "text-emerald-400" : "text-slate-400"}`}>
              {p.pl > 0 ? "+" : ""}{p.pl.toFixed(2)}u
            </span>
          </div>
        ))}
        <div className="px-6 py-4 flex items-center justify-between text-[11px] text-slate-500">
          <span>Showing {picks.length} of {picks.length} graded entries.</span>
          <Link to="/picks" className="text-amber-300 hover:text-amber-200 flex items-center gap-1">
            VIEW LIVE BOARD <ArrowUpRight className="h-3 w-3" />
          </Link>
        </div>
      </div>
    </div>
  );
}
