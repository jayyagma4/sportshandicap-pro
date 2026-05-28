import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Lock, ChevronLeft, ChevronRight, ArrowRight, Clock, Target } from "lucide-react";
import { ScrollReveal } from "@/components/ScrollReveal";
import { MatchupLogos, type League } from "@/components/TeamLogo";

export const Route = createFileRoute("/picks")({
  head: () => ({
    meta: [
      { title: "Expert Picks | Sportshandicapper" },
      { name: "description", content: "Today's expert betting picks across NBA, NFL, NHL, MLB, NCAAF, and NCAAB. Timestamped before lines move, graded after the final whistle." },
      { property: "og:title", content: "Expert Picks | Sportshandicapper" },
      { property: "og:description", content: "Today's expert betting picks across all major leagues." },
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
};

const sports: ("ALL" | Pick["sport"])[] = ["ALL", "NFL", "NCAAF", "NBA", "NCAAB", "MLB", "NHL"];

const picksData: Pick[] = [
  { id: "p1", sport: "NBA", time: "3:00 PM", matchup: "Cavaliers vs Pistons", book: "DraftKings", units: 2, confidence: 82, locked: true, expert: "M. Davis" },
  { id: "p2", sport: "MLB", time: "4:05 PM", matchup: "Orioles vs Athletics", book: "FanDuel", units: 3, confidence: 86, locked: true, expert: "M. Rinner" },
  { id: "p3", sport: "MLB", time: "6:05 PM", matchup: "Phillies vs Rockies", book: "BetMGM", units: 5, confidence: 89, locked: true, expert: "M. Rinner", whale: true },
  { id: "p4", sport: "MLB", time: "6:10 PM", matchup: "Reds vs Astros", book: "DraftKings", units: 3, confidence: 85, pick: "Astros ML -125", locked: false, expert: "D. Wilson" },
  { id: "p5", sport: "MLB", time: "6:40 PM", matchup: "Phillies vs Rockies", book: "FanDuel", units: 1, confidence: 56, locked: true, expert: "M. Rinner" },
  { id: "p6", sport: "MLB", time: "7:05 PM", matchup: "Orioles vs Athletics", book: "BetMGM", units: 5, confidence: 92, locked: true, expert: "M. Rinner", whale: true },
  { id: "p7", sport: "NFL", time: "8:20 PM", matchup: "Eagles vs Cowboys", book: "DraftKings", units: 3, confidence: 88, locked: true, expert: "M. Davis" },
  { id: "p8", sport: "NHL", time: "7:00 PM", matchup: "Bruins vs Rangers", book: "FanDuel", units: 2, confidence: 70, pick: "Rangers PL +1.5", locked: false, expert: "D. Wilson" },
  { id: "p9", sport: "NBA", time: "7:00 PM", matchup: "Pistons vs Cavaliers", book: "BetMGM", units: 1, confidence: 64, locked: true, expert: "D. Wilson" },
  { id: "p10", sport: "NCAAB", time: "6:00 PM", matchup: "UNC vs Duke", book: "DraftKings", units: 2, confidence: 77, locked: true, expert: "M. Davis" },
];

function PicksPage() {
  const [activeSport, setActiveSport] = useState<(typeof sports)[number]>("ALL");
  const [page, setPage] = useState(1);
  const perPage = 9;

  const filtered = useMemo(
    () => (activeSport === "ALL" ? picksData : picksData.filter((p) => p.sport === activeSport)),
    [activeSport]
  );
  const totalPages = Math.max(1, Math.ceil(filtered.length / perPage));
  const pageItems = filtered.slice((page - 1) * perPage, page * perPage);

  return (
    <div className="container-x py-16">
      {/* Header */}
      <ScrollReveal>
        <div className="flex items-end justify-between flex-wrap gap-6 pb-10 border-b border-white/10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md border border-emerald-400/30 bg-emerald-400/5 mb-5">
              <span className="relative h-1.5 w-1.5 rounded-full bg-emerald-400 ping-soft" />
              <span className="text-[10px] uppercase tracking-[0.18em] font-bold text-emerald-300">
                Today's Board · Live
              </span>
            </div>
            <h1 className="text-5xl md:text-6xl font-black tracking-tight leading-[0.95]">
              Expert <span className="text-[#1E90FF]">Picks.</span>
            </h1>
            <p className="mt-5 text-base text-slate-400 max-w-xl leading-relaxed">
              Timestamped before lines move. Graded after the final whistle. Every play tracked,
              every edge documented.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-6 md:gap-10">
            {[
              { v: "10", l: "Live today" },
              { v: "67%", l: "30-day hit" },
              { v: "+184u", l: "YTD profit" },
            ].map((s) => (
              <div key={s.l}>
                <div className="text-3xl font-black text-white font-mono">{s.v}</div>
                <div className="text-[10px] uppercase tracking-[0.2em] text-slate-500 font-bold mt-1">
                  {s.l}
                </div>
              </div>
            ))}
          </div>
        </div>
      </ScrollReveal>

      {/* Filters */}
      <ScrollReveal delay={80}>
        <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap gap-1.5">
            {sports.map((s) => {
              const active = activeSport === s;
              return (
                <button
                  key={s}
                  onClick={() => { setActiveSport(s); setPage(1); }}
                  className={`px-3 py-1.5 rounded-md text-[10px] font-bold uppercase tracking-widest border transition ${
                    active
                      ? "bg-[#1E90FF] text-white border-[#1E90FF]"
                      : "bg-white/5 text-slate-400 border-white/10 hover:text-white hover:border-white/20"
                  }`}
                >
                  {s}
                </button>
              );
            })}
          </div>

          <div className="flex items-center gap-3 text-xs text-slate-400">
            <Lock className="h-3.5 w-3.5 text-slate-500" />
            <span>Full picks unlocked for members.</span>
            <button className="text-[11px] font-bold uppercase tracking-widest text-cyan-300 hover:text-white flex items-center gap-1">
              Join <ArrowRight className="h-3 w-3" />
            </button>
          </div>
        </div>
      </ScrollReveal>

      {/* Picks list */}
      <div className="mt-8 card-premium overflow-hidden">
        <div className="grid grid-cols-[60px_1fr_90px_110px] md:grid-cols-[70px_1fr_180px_80px_120px_110px] gap-3 px-5 py-3 border-b border-white/10 bg-black/40 text-[10px] uppercase tracking-widest font-bold text-slate-500">
          <div>League</div>
          <div>Matchup</div>
          <div className="hidden md:block">Pick</div>
          <div className="text-center">Units</div>
          <div className="text-right">Confidence</div>
          <div className="hidden md:block text-right">Expert</div>
        </div>

        {pageItems.map((p, i) => (
          <ScrollReveal key={p.id} delay={i * 50}>
            <div className="grid grid-cols-[60px_1fr_90px_110px] md:grid-cols-[70px_1fr_180px_80px_120px_110px] gap-3 px-5 py-5 border-b border-white/5 last:border-0 hover:bg-white/[0.02] transition items-center">
              <div>
                <span className="px-1.5 py-0.5 rounded bg-white/5 border border-white/10 text-[9px] font-bold tracking-widest text-slate-300">
                  {p.sport}
                </span>
              </div>
              <div className="min-w-0">
                <div className="text-sm font-bold text-white truncate flex items-center gap-2">
                  <MatchupLogos
                    league={p.sport as League}
                    a={p.matchup.split(" vs ")[0]}
                    b={p.matchup.split(" vs ")[1]}
                    size={22}
                  />
                  <span className="truncate">{p.matchup}</span>
                  {p.whale && (
                    <span className="px-1.5 py-0.5 rounded bg-amber-400/10 border border-amber-400/30 text-amber-300 text-[9px] font-black tracking-widest">
                      WHALE
                    </span>
                  )}
                </div>
                <div className="text-[10px] text-slate-500 font-mono mt-0.5 flex items-center gap-1.5">
                  <Clock className="h-2.5 w-2.5" />
                  {p.time} · {p.book}
                </div>
              </div>
              <div className="hidden md:flex items-center gap-2 text-sm font-semibold text-slate-200 min-w-0">
                {p.locked ? (
                  <>
                    <Lock className="h-3.5 w-3.5 text-slate-600 shrink-0" />
                    <span className="font-mono text-slate-500 truncate">Members only</span>
                  </>
                ) : (
                  <>
                    <Target className="h-3.5 w-3.5 text-[#1E90FF] shrink-0" />
                    <span className="font-mono truncate">{p.pick}</span>
                  </>
                )}
              </div>
              <div className="text-center">
                <div className="inline-flex items-center justify-center h-7 w-7 rounded-md bg-[#1E90FF]/15 border border-[#1E90FF]/30 text-[#1E90FF] font-black text-xs font-mono">
                  {p.units}u
                </div>
              </div>
              <div className="flex items-center gap-2 justify-end">
                <div className="hidden md:block flex-1 h-1 rounded-full bg-white/5 overflow-hidden max-w-[60px]">
                  <div className="h-full bg-emerald-400" style={{ width: `${p.confidence}%` }} />
                </div>
                <span className="text-xs font-mono font-bold text-emerald-300 w-8 text-right">
                  {p.confidence}%
                </span>
              </div>
              <div className="hidden md:block text-right text-xs font-semibold text-slate-300 truncate">
                {p.expert}
              </div>
            </div>
          </ScrollReveal>
        ))}

        {filtered.length === 0 && (
          <div className="px-5 py-16 text-center text-slate-500 text-sm">
            No picks in this league yet.
          </div>
        )}
      </div>

      {/* Pagination */}
      {filtered.length > 0 && (
        <div className="mt-10 flex justify-center items-center gap-1.5">
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
                className={`h-9 w-9 rounded-md text-xs font-bold font-mono transition border ${
                  active
                    ? "bg-[#1E90FF] text-white border-[#1E90FF]"
                    : "bg-white/5 border-white/10 text-slate-400 hover:text-white hover:border-white/20"
                }`}
              >
                {n}
              </button>
            );
          })}
          <PageBtn disabled={page === totalPages} onClick={() => setPage((p) => Math.min(totalPages, p + 1))}>
            <ChevronRight className="h-3.5 w-3.5" />
          </PageBtn>
        </div>
      )}
    </div>
  );
}

function PageBtn({
  children, onClick, disabled,
}: { children: React.ReactNode; onClick: () => void; disabled?: boolean }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`h-9 w-9 rounded-md flex items-center justify-center border bg-white/5 border-white/10 transition ${
        disabled ? "text-slate-700 cursor-not-allowed" : "text-slate-400 hover:text-white hover:border-white/20"
      }`}
    >
      {children}
    </button>
  );
}
