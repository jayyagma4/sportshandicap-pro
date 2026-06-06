import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Lock, ChevronLeft, ChevronRight, ArrowUpRight, Target } from "lucide-react";
import { ScrollReveal } from "@/components/ScrollReveal";
import { MatchupLogos, type League } from "@/components/TeamLogo";

export const Route = createFileRoute("/picks")({
  head: () => ({
    meta: [
      { title: "The Board | Today's Expert Picks" },
      { name: "description", content: "Today's expert picks across the NBA, NFL, NHL, MLB, NCAAF, and NCAAB. Timestamped before lines move, graded after the final whistle." },
      { property: "og:title", content: "The Board | Today's Expert Picks" },
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
  const perPage = 8;

  const filtered = useMemo(
    () => (activeSport === "ALL" ? picksData : picksData.filter((p) => p.sport === activeSport)),
    [activeSport]
  );
  const totalPages = Math.max(1, Math.ceil(filtered.length / perPage));
  const pageItems = filtered.slice((page - 1) * perPage, page * perPage);

  const today = new Date().toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" });

  return (
    <div className="container-x py-12">
      {/* Masthead */}
      <ScrollReveal>
        <div className="rule-double">
          <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.28em] font-bold text-slate-500 py-2">
            <span>The Board &middot; Daily</span>
            <span className="hidden sm:block serif-italic normal-case tracking-normal text-slate-400 text-base">Today&apos;s Card</span>
            <span>{today}</span>
          </div>
        </div>

        <div className="mt-10 grid lg:grid-cols-[1fr_auto] gap-8 items-end pb-10 border-b border-white/10">
          <div>
            <div className="kicker kicker-rule text-emerald-300">
              <span className="relative inline-flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 ping-soft relative" />
                Live slate
              </span>
            </div>
            <h1 className="mt-5 serif-display text-6xl md:text-8xl text-white">
              The <span className="serif-italic text-[#1E90FF]">Board</span>.
            </h1>
            <p className="mt-5 text-base text-slate-400 max-w-lg leading-relaxed drop-cap">
              Every play, timestamped before the line moves and graded after the final whistle. Read across, then decide.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-8 text-right lg:text-left">
            {[
              { v: filtered.length.toString().padStart(2, "0"), l: "On the card" },
              { v: "67.4%", l: "30-day hit" },
              { v: "+184u", l: "YTD profit" },
            ].map((s) => (
              <div key={s.l}>
                <div className="serif-display text-4xl text-white">{s.v}</div>
                <div className="kicker mt-1 text-slate-500">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </ScrollReveal>

      {/* Section filter */}
      <ScrollReveal delay={60}>
        <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-4">
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <span className="kicker text-slate-500">Leagues</span>
            {sports.map((s) => {
              const active = activeSport === s;
              return (
                <button
                  key={s}
                  onClick={() => { setActiveSport(s); setPage(1); }}
                  className={`text-sm font-semibold tracking-wide editorial-link ${
                    active ? "text-white" : "text-slate-500 hover:text-white"
                  }`}
                  style={active ? { backgroundSize: "100% 1px" } : {}}
                >
                  {s === "ALL" ? "All" : s}
                </button>
              );
            })}
          </div>
          <div className="flex items-center gap-2 text-[11px] text-slate-500 serif-italic">
            <Lock className="h-3 w-3" /> Member picks unlock on subscribe.
          </div>
        </div>
      </ScrollReveal>

      {/* Editorial list */}
      <div className="mt-10 divide-y divide-white/10">
        {pageItems.map((p, i) => {
          const num = (page - 1) * perPage + i + 1;
          const [a, b] = p.matchup.split(" vs ");
          return (
            <ScrollReveal key={p.id} delay={i * 40}>
              <article className="grid grid-cols-12 gap-4 md:gap-8 py-7 group hover:bg-white/[0.015] transition-colors -mx-4 px-4">
                {/* Number + league */}
                <div className="col-span-2 md:col-span-1">
                  <div className="section-no">No. {String(num).padStart(2, "0")}</div>
                  <div className="kicker text-[#1E90FF] mt-1">{p.sport}</div>
                </div>

                {/* Matchup + headline */}
                <div className="col-span-10 md:col-span-6 min-w-0">
                  <div className="flex items-center gap-2 mb-2 text-[10px] uppercase tracking-[0.22em] font-bold text-slate-500">
                    <span className="font-mono">{p.time}</span>
                    <span>&middot;</span>
                    <span>{p.book}</span>
                    {p.whale && (
                      <span className="ml-1 px-1.5 py-0.5 rounded-sm bg-amber-400/10 border border-amber-400/40 text-amber-300 text-[9px] font-black tracking-widest">
                        WHALE
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-3">
                    <MatchupLogos league={p.sport as League} a={a} b={b} size={28} />
                    <h3 className="serif-display text-2xl md:text-3xl text-white group-hover:text-[#1E90FF] transition-colors">
                      {a} <span className="serif-italic text-slate-500">vs</span> {b}
                    </h3>
                  </div>
                  <div className="mt-3 flex items-center gap-2 text-sm">
                    {p.locked ? (
                      <span className="text-slate-500 serif-italic flex items-center gap-1.5">
                        <Lock className="h-3 w-3" /> Selection reserved for members.
                      </span>
                    ) : (
                      <span className="flex items-center gap-1.5 text-slate-200 font-mono">
                        <Target className="h-3.5 w-3.5 text-[#1E90FF]" /> {p.pick}
                      </span>
                    )}
                  </div>
                </div>

                {/* Confidence bar */}
                <div className="hidden md:block md:col-span-3">
                  <div className="kicker text-slate-500 mb-2">Confidence</div>
                  <div className="flex items-center gap-3">
                    <div className="flex-1 h-px bg-white/10 relative overflow-hidden">
                      <div className="absolute inset-y-0 left-0 h-full bg-[#1E90FF]" style={{ width: `${p.confidence}%`, height: "1px", top: "50%", marginTop: "-0.5px" }} />
                      <div className="absolute h-2 w-2 rounded-full bg-[#1E90FF] -mt-[3px]" style={{ left: `calc(${p.confidence}% - 4px)`, top: "50%" }} />
                    </div>
                    <span className="font-mono text-sm font-bold text-white tabular-nums">{p.confidence}</span>
                  </div>
                </div>

                {/* Units + byline */}
                <div className="col-span-12 md:col-span-2 flex md:flex-col items-center md:items-end justify-between md:justify-start gap-2 md:text-right">
                  <div>
                    <div className="kicker text-slate-500">Units</div>
                    <div className="serif-display text-3xl text-white mt-1">{p.units}</div>
                  </div>
                  <div className="text-[11px] uppercase tracking-[0.2em] text-slate-500 font-bold">
                    <span className="text-slate-300">{p.expert}</span>
                  </div>
                </div>
              </article>
            </ScrollReveal>
          );
        })}

        {filtered.length === 0 && (
          <div className="py-20 text-center text-slate-500 serif-italic text-lg">
            Nothing on the card in this league yet.
          </div>
        )}
      </div>

      {/* Pagination + members CTA */}
      {filtered.length > 0 && (
        <div className="mt-12 pt-8 border-t border-white/10 flex flex-wrap items-center justify-between gap-6">
          <Link to="/packages" className="group inline-flex items-center gap-2 text-sm">
            <span className="kicker text-[#1E90FF]">Members</span>
            <span className="text-slate-300 editorial-link">
              Unlock every selection on the board
            </span>
            <ArrowUpRight className="h-3.5 w-3.5 text-[#1E90FF] group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" />
          </Link>
          <div className="flex items-center gap-1.5">
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
                  className={`h-9 w-9 text-xs font-mono tabular-nums transition border-b ${
                    active
                      ? "text-white border-[#1E90FF] font-bold"
                      : "text-slate-500 border-transparent hover:text-white hover:border-white/30"
                  }`}
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
  );
}

function PageBtn({
  children, onClick, disabled,
}: { children: React.ReactNode; onClick: () => void; disabled?: boolean }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`h-9 w-9 flex items-center justify-center transition ${
        disabled ? "text-slate-700 cursor-not-allowed" : "text-slate-400 hover:text-white"
      }`}
    >
      {children}
    </button>
  );
}
