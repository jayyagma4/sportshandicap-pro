import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Lock, ChevronLeft, ChevronRight, ArrowUpRight, TrendingUp, TrendingDown, Minus, Search } from "lucide-react";
import { ScrollReveal } from "@/components/ScrollReveal";
import { MatchupLogos, type League } from "@/components/TeamLogo";

export const Route = createFileRoute("/picks")({
  head: () => ({
    meta: [
      { title: "Live Board | Today's Expert Picks" },
      { name: "description", content: "Today's expert picks across NBA, NFL, NHL, MLB, NCAAF, NCAAB. Timestamped before lines move, graded after the whistle." },
      { property: "og:title", content: "Live Board | Today's Expert Picks" },
      { property: "og:description", content: "Today's expert picks across all major leagues." },
    ],
  }),
  component: PicksPage,
});

type Pick = {
  id: string;
  sport: "NFL" | "NCAAF" | "NBA" | "NCAAB" | "MLB" | "NHL";
  time: string;
  matchup: string;
  book: string;
  units: number;
  confidence: number;
  pick?: string;
  locked: boolean;
  expert: string;
  whale?: boolean;
  move: number;
};

const sports: ("ALL" | Pick["sport"])[] = ["ALL", "NFL", "NCAAF", "NBA", "NCAAB", "MLB", "NHL"];

const picksData: Pick[] = [
  { id: "p1", sport: "NBA", time: "15:00", matchup: "Cavaliers vs Pistons", book: "DK", units: 2, confidence: 82, locked: true, expert: "M.DAVIS", move: +4 },
  { id: "p2", sport: "MLB", time: "16:05", matchup: "Orioles vs Athletics", book: "FD", units: 3, confidence: 86, locked: true, expert: "M.RINNER", move: -2 },
  { id: "p3", sport: "MLB", time: "18:05", matchup: "Phillies vs Rockies", book: "MGM", units: 5, confidence: 89, locked: true, expert: "M.RINNER", whale: true, move: +8 },
  { id: "p4", sport: "MLB", time: "18:10", matchup: "Reds vs Astros", book: "DK", units: 3, confidence: 85, pick: "HOU ML -125", locked: false, expert: "D.WILSON", move: +3 },
  { id: "p5", sport: "MLB", time: "18:40", matchup: "Phillies vs Rockies", book: "FD", units: 1, confidence: 56, locked: true, expert: "M.RINNER", move: 0 },
  { id: "p6", sport: "MLB", time: "19:05", matchup: "Orioles vs Athletics", book: "MGM", units: 5, confidence: 92, locked: true, expert: "M.RINNER", whale: true, move: +12 },
  { id: "p7", sport: "NFL", time: "20:20", matchup: "Eagles vs Cowboys", book: "DK", units: 3, confidence: 88, locked: true, expert: "M.DAVIS", move: -5 },
  { id: "p8", sport: "NHL", time: "19:00", matchup: "Bruins vs Rangers", book: "FD", units: 2, confidence: 70, pick: "NYR PL +1.5", locked: false, expert: "D.WILSON", move: +6 },
  { id: "p9", sport: "NBA", time: "19:00", matchup: "Pistons vs Cavaliers", book: "MGM", units: 1, confidence: 64, locked: true, expert: "D.WILSON", move: -1 },
  { id: "p10", sport: "NCAAB", time: "18:00", matchup: "UNC vs Duke", book: "DK", units: 2, confidence: 77, locked: true, expert: "M.DAVIS", move: +4 },
];

function PicksPage() {
  const [activeSport, setActiveSport] = useState<(typeof sports)[number]>("ALL");
  const [page, setPage] = useState(1);
  const perPage = 8;

  const filtered = useMemo(
    () => (activeSport === "ALL" ? picksData : picksData.filter((p) => p.sport === activeSport)),
    [activeSport]
  );
  const totalPages = Math.max(1, Math.ceil(filtered.length / perPage));
  const pageItems = filtered.slice((page - 1) * perPage, page * perPage);

  const date = new Date().toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" }).toUpperCase();
  const now = new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: false });

  const avgConf = Math.round(filtered.reduce((s, p) => s + p.confidence, 0) / Math.max(1, filtered.length));
  const totalUnits = filtered.reduce((s, p) => s + p.units, 0);

  return (
    <div className="terminal-grid min-h-screen">
      <div className="container-x py-8">
        {/* Command bar */}
        <ScrollReveal>
          <div className="terminal-panel rounded-sm">
            <div className="terminal-panel-header">
              <div className="flex items-center gap-3">
                <span className="led-dot bg-emerald-400 text-emerald-400 live-blink" />
                <span className="text-white">BOARD / LIVE</span>
                <span className="text-slate-600">SESSION {date} · {now} ET</span>
              </div>
              <span className="text-slate-600">DELAYED 15S</span>
            </div>
            <div className="grid md:grid-cols-4 divide-x divide-white/5">
              <Cell label="ON THE CARD" value={filtered.length.toString().padStart(2, "0")} />
              <Cell label="AVG CONFIDENCE" value={`${avgConf}`} suffix="%" />
              <Cell label="TOTAL UNITS" value={totalUnits.toFixed(1)} accent="emerald" />
              <Cell label="30D HIT" value="67.4" suffix="%" accent="cyan" />
            </div>
          </div>
        </ScrollReveal>

        {/* Title */}
        <ScrollReveal delay={60}>
          <div className="mt-10 mb-6">
            <div className="label-mono text-cyan-300 mb-2">// TODAYS BOARD</div>
            <h1 className="font-mono-num text-white text-5xl md:text-7xl font-bold leading-[0.95]">
              LIVE <span className="text-[#1E90FF]">BOARD.</span>
            </h1>
            <p className="mt-4 text-slate-400 max-w-xl">
              Every play timestamped before the line moves, graded after the whistle. Read across, then decide.
            </p>
          </div>
        </ScrollReveal>

        {/* Filter */}
        <ScrollReveal delay={80}>
          <div className="flex flex-wrap items-center justify-between gap-4 py-4 border-y border-white/10">
            <div className="flex flex-wrap items-center gap-2">
              <span className="label-mono mr-2">FILTER /</span>
              {sports.map((s) => (
                <button
                  key={s}
                  onClick={() => { setActiveSport(s); setPage(1); }}
                  className={`chip-mono ${activeSport === s ? "is-active" : ""}`}
                >
                  {s === "ALL" ? "ALL" : s}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-2 label-mono">
              <Search className="h-3.5 w-3.5 text-slate-500" />
              MEMBERS UNLOCK FULL FEED
            </div>
          </div>
        </ScrollReveal>

        {/* Board table */}
        <div className="mt-6 terminal-panel rounded-sm overflow-x-auto">
          <div className="grid grid-cols-[40px_60px_60px_60px_1fr_140px_180px_60px_60px_90px] gap-3 px-4 py-3 border-b border-white/10 label-mono min-w-[1080px]">
            <span>#</span><span>LG</span><span>TIME</span><span>BOOK</span>
            <span>MATCHUP</span><span>SELECTION</span><span>CONFIDENCE</span>
            <span className="text-right">UNITS</span><span className="text-right">MV</span>
            <span className="text-right">EXPERT</span>
          </div>

          {pageItems.map((p, i) => {
            const num = (page - 1) * perPage + i + 1;
            const [a, b] = p.matchup.split(" vs ");
            const MoveIcon = p.move > 0 ? TrendingUp : p.move < 0 ? TrendingDown : Minus;
            const moveColor = p.move > 0 ? "tape-up" : p.move < 0 ? "tape-down" : "tape-flat";
            return (
              <div key={p.id} className="terminal-row grid grid-cols-[40px_60px_60px_60px_1fr_140px_180px_60px_60px_90px] gap-3 px-4 py-4 items-center min-w-[1080px]">
                <span className="font-mono-num text-[11px] text-slate-600">{String(num).padStart(2, "0")}</span>
                <span className="font-mono-num text-[11px] text-[#1E90FF] font-bold">{p.sport}</span>
                <span className="font-mono-num text-[11px] text-slate-400">{p.time}</span>
                <span className="font-mono-num text-[10px] text-slate-500">{p.book}</span>
                <div className="flex items-center gap-2.5 min-w-0">
                  <MatchupLogos league={p.sport as League} a={a} b={b} size={20} />
                  <span className="font-mono-num text-[13px] text-white font-semibold truncate">
                    {a} <span className="text-slate-600">@</span> {b}
                  </span>
                  {p.whale && (
                    <span className="chip-mono !py-0.5 !px-1.5 !text-[9px] border-amber-400/40 bg-amber-400/10 text-amber-300">WHALE</span>
                  )}
                </div>
                <div className="font-mono-num text-[11px]">
                  {p.locked ? (
                    <span className="text-slate-600 inline-flex items-center gap-1.5"><Lock className="h-3 w-3" /> ████████</span>
                  ) : (
                    <span className="text-cyan-300 font-bold">{p.pick}</span>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <div className="bar-track flex-1">
                    <div className="bar-fill" style={{ width: `${p.confidence}%` }} />
                  </div>
                  <span className="font-mono-num text-[11px] text-white font-bold w-7 text-right">{p.confidence}</span>
                </div>
                <span className="font-mono-num text-sm text-white font-bold text-right">{p.units}.0</span>
                <span className={`font-mono-num text-[11px] text-right inline-flex items-center justify-end gap-1 ${moveColor}`}>
                  <MoveIcon className="h-3 w-3" />
                  {p.move > 0 ? `+${p.move}` : p.move}
                </span>
                <span className="font-mono-num text-[10px] text-slate-400 text-right tracking-wider">{p.expert}</span>
              </div>
            );
          })}

          {filtered.length === 0 && (
            <div className="py-16 text-center label-mono">NO ROWS / SELECT A LEAGUE</div>
          )}
        </div>

        {/* Footer */}
        {filtered.length > 0 && (
          <div className="mt-6 flex flex-wrap items-center justify-between gap-4 py-4 border-t border-white/10">
            <Link to="/packages" className="group inline-flex items-center gap-2 label-mono">
              <span className="text-[#1E90FF]">▸ MEMBERS</span>
              <span className="text-slate-300">UNLOCK EVERY SELECTION</span>
              <ArrowUpRight className="h-3.5 w-3.5 text-[#1E90FF] group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" />
            </Link>
            <div className="flex items-center gap-1">
              <PageBtn disabled={page === 1} onClick={() => setPage((p) => Math.max(1, p - 1))}>
                <ChevronLeft className="h-3.5 w-3.5" />
              </PageBtn>
              {Array.from({ length: totalPages }).map((_, i) => {
                const n = i + 1;
                const active = n === page;
                return (
                  <button
                    key={n}
                    onClick={() => setPage(n)}
                    className={`chip-mono !min-w-[36px] justify-center ${active ? "is-active" : ""}`}
                  >
                    {String(n).padStart(2, "0")}
                  </button>
                );
              })}
              <PageBtn disabled={page === totalPages} onClick={() => setPage((p) => Math.min(totalPages, p + 1))}>
                <ChevronRight className="h-3.5 w-3.5" />
              </PageBtn>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function Cell({ label, value, suffix, accent }: { label: string; value: string; suffix?: string; accent?: "emerald" | "cyan" }) {
  const c = accent === "emerald" ? "text-emerald-300" : accent === "cyan" ? "text-cyan-300" : "text-white";
  return (
    <div className="p-4">
      <div className="label-mono mb-1.5">{label}</div>
      <div className={`font-mono-num text-2xl font-bold ${c}`}>
        {value}<span className="text-slate-500 text-base ml-0.5">{suffix}</span>
      </div>
    </div>
  );
}

function PageBtn({ children, onClick, disabled }: { children: React.ReactNode; onClick: () => void; disabled?: boolean }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`h-9 w-9 flex items-center justify-center border border-white/10 rounded-sm transition ${
        disabled ? "text-slate-700 cursor-not-allowed" : "text-slate-400 hover:text-white hover:border-white/30"
      }`}
    >
      {children}
    </button>
  );
}
