import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowUpRight, Filter, Search } from "lucide-react";
import { PortalHeader, PanelHeader } from "./portal.index";

export const Route = createFileRoute("/portal/picks")({
  component: MyPicks,
});

const picks = [
  { id: "p1", sport: "NBA", matchup: "Knicks vs Spurs", selection: "Spurs +6.5", units: 1, odds: "-110", result: "LOSS", pl: -2.2, date: "Jun 05" },
  { id: "p2", sport: "NHL", matchup: "Hurricanes vs Knights", selection: "Over 5.5", units: 2, odds: "-115", result: "WIN", pl: 3.6, date: "Jun 02" },
  { id: "p3", sport: "MLB", matchup: "Yankees vs Red Sox", selection: "Yankees ML", units: 1.5, odds: "-140", result: "WIN", pl: 2.1, date: "May 30" },
  { id: "p4", sport: "NBA", matchup: "Celtics vs Heat", selection: "Under 213.5", units: 1, odds: "-108", result: "WIN", pl: 1.85, date: "May 28" },
  { id: "p5", sport: "NFL", matchup: "Chiefs vs Bills", selection: "Chiefs -3", units: 2, odds: "-105", result: "PUSH", pl: 0, date: "May 24" },
  { id: "p6", sport: "NHL", matchup: "Stars vs Oilers", selection: "Oilers ML", units: 1, odds: "+120", result: "WIN", pl: 1.2, date: "May 22" },
];

const summary = [
  { k: "Record", v: "3-1-1", tone: "neutral" },
  { k: "ROI", v: "+24.1%", tone: "emerald" },
  { k: "Units", v: "+6.55", tone: "emerald" },
  { k: "Avg Odds", v: "-112", tone: "neutral" },
];

const filters = ["All", "NBA", "NHL", "MLB", "NFL"];

function MyPicks() {
  const [filter, setFilter] = useState("All");
  const visible = filter === "All" ? picks : picks.filter((p) => p.sport === filter);

  return (
    <div className="space-y-8">
      <PortalHeader
        title="My Picks."
        crumb="Full audit trail of every pick you've taken with INSPIN analysts."
      />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {summary.map((s) => (
          <div key={s.k} className="p-card p-5">
            <div className="p-eyebrow">{s.k}</div>
            <div
              className={`mt-2 p-stat-num text-3xl ${
                s.tone === "emerald" ? "text-[var(--p-emerald)]" : ""
              }`}
            >
              {s.v}
            </div>
          </div>
        ))}
      </div>

      <div className="p-card">
        <PanelHeader title="Full History" />

        <div className="flex flex-wrap items-center gap-3 px-6 py-4 border-b border-[var(--p-border)]">
          <div className="flex items-center gap-2 flex-1 min-w-[200px] max-w-sm">
            <div className="flex items-center gap-2 flex-1 px-3 h-10 rounded-lg border border-[var(--p-border)] bg-[var(--p-surface)]">
              <Search className="h-4 w-4 text-[var(--p-text-faint)]" />
              <input
                placeholder="Search matchups…"
                className="bg-transparent w-full outline-none text-sm"
              />
            </div>
          </div>
          <div className="flex items-center gap-1.5">
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-3 h-8 rounded-full text-[12px] font-semibold transition ${
                  filter === f
                    ? "bg-[var(--p-text)] text-white"
                    : "bg-[var(--p-surface-muted)] text-[var(--p-text-muted)] hover:text-[var(--p-text)]"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
          <button className="ml-auto p-btn-ghost h-9 px-3 text-[12px]">
            <Filter className="h-3.5 w-3.5" /> Filters
          </button>
        </div>

        <div className="hidden md:grid grid-cols-[60px_80px_1.4fr_1fr_70px_70px_90px_90px] gap-3 px-6 py-3 text-[10px] tracking-[0.18em] text-[var(--p-text-faint)] border-b border-[var(--p-border)] font-semibold">
          <span>LEAGUE</span>
          <span>DATE</span>
          <span>MATCHUP</span>
          <span>SELECTION</span>
          <span className="text-right">UNITS</span>
          <span className="text-right">ODDS</span>
          <span className="text-right">RESULT</span>
          <span className="text-right">P/L</span>
        </div>

        {visible.map((p) => (
          <div
            key={p.id}
            className="grid grid-cols-2 md:grid-cols-[60px_80px_1.4fr_1fr_70px_70px_90px_90px] gap-3 px-6 py-4 border-b border-[var(--p-border)] items-center text-sm last:border-b-0 hover:bg-[var(--p-surface-muted)]/60 transition"
          >
            <span className="text-[11px] font-bold text-[var(--p-blue)]">{p.sport}</span>
            <span className="p-stat-num text-[var(--p-text-muted)]">{p.date}</span>
            <span className="font-medium truncate">{p.matchup}</span>
            <span className="text-[var(--p-text-muted)] truncate">{p.selection}</span>
            <span className="text-right p-stat-num text-[var(--p-text-muted)]">{p.units}u</span>
            <span className="text-right p-stat-num text-[var(--p-text-muted)]">{p.odds}</span>
            <span className="text-right">
              <span
                className={`p-chip ${
                  p.result === "WIN"
                    ? "p-chip-emerald"
                    : p.result === "LOSS"
                    ? "p-chip-rose"
                    : "p-chip-neutral"
                }`}
              >
                {p.result}
              </span>
            </span>
            <span
              className={`text-right p-stat-num font-bold ${
                p.pl < 0
                  ? "text-[var(--p-rose)]"
                  : p.pl > 0
                  ? "text-[var(--p-emerald)]"
                  : "text-[var(--p-text-muted)]"
              }`}
            >
              {p.pl > 0 ? "+" : ""}
              {p.pl.toFixed(2)}u
            </span>
          </div>
        ))}

        <div className="px-6 py-4 flex items-center justify-between text-[12px] text-[var(--p-text-muted)]">
          <span>
            Showing {visible.length} of {picks.length} graded entries.
          </span>
          <Link
            to="/picks"
            className="text-[var(--p-blue)] hover:text-[var(--p-blue-hover)] inline-flex items-center gap-1 font-semibold"
          >
            View live board <ArrowUpRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
