import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Lock, Star, ChevronLeft, ChevronRight, ArrowRight, MapPin, Clock, TrendingUp, Sparkles } from "lucide-react";
import { ScrollReveal } from "@/components/ScrollReveal";

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

type Team = { name: string; initials: string; gradient: string };
type Pick = {
  id: string;
  sport: "NFL" | "NCAAF" | "NBA" | "NCAAB" | "MLB" | "NHL";
  date: string;
  venue: string;
  home: Team;
  away: Team;
  stars: number; // 1-5, or 10 for whale
  whale?: boolean;
  confidence: number;
  pick?: string;
  locked: boolean;
  author: { name: string; initial: string; gradient: string };
};

const sportColors: Record<Pick["sport"], string> = {
  NBA: "from-orange-500 to-red-500",
  NFL: "from-amber-500 to-orange-600",
  NHL: "bg-sky-500",
  MLB: "from-rose-400 to-red-500",
  NCAAF: "from-amber-400 to-yellow-600",
  NCAAB: "from-violet-500 to-fuchsia-500",
};

const sports: ("All" | Pick["sport"])[] = ["All", "NFL", "NCAAF", "NBA", "NCAAB", "MLB", "NHL"];

const picksData: Pick[] = [
  {
    id: "p1", sport: "NBA", date: "May 09, 2026 @ 3:00 PM ET", venue: "Rocket Arena, Cleveland, OH",
    home: { name: "Cavaliers", initials: "CLE", gradient: "bg-red-600" },
    away: { name: "Pistons", initials: "DET", gradient: "bg-blue-600" },
    stars: 4, confidence: 82, locked: true,
    author: { name: "Mike Davis", initial: "M", gradient: "bg-indigo-500" },
  },
  {
    id: "p2", sport: "MLB", date: "May 09, 2026 @ 4:05 PM ET", venue: "Oriole Park at Camden Yards, Baltimore, MD",
    home: { name: "Orioles", initials: "BAL", gradient: "bg-orange-500" },
    away: { name: "Athletics", initials: "ATH", gradient: "bg-emerald-600" },
    stars: 5, confidence: 86, locked: true,
    author: { name: "Michael Rinner", initial: "M", gradient: "bg-rose-500" },
  },
  {
    id: "p3", sport: "MLB", date: "May 09, 2026 @ 6:05 PM ET", venue: "Citizens Bank Park, Philadelphia, PA",
    home: { name: "Phillies", initials: "PHI", gradient: "bg-rose-600" },
    away: { name: "Rockies", initials: "COL", gradient: "bg-indigo-600" },
    stars: 10, whale: true, confidence: 89, locked: true,
    author: { name: "Michael Rinner", initial: "M", gradient: "bg-rose-500" },
  },
  {
    id: "p4", sport: "MLB", date: "May 08, 2026 @ 6:10 PM ET", venue: "Great American Ball Park, Cincinnati, OH",
    home: { name: "Reds", initials: "CIN", gradient: "bg-red-700" },
    away: { name: "Astros", initials: "HOU", gradient: "bg-amber-600" },
    stars: 5, confidence: 85, pick: "Astros ML -125", locked: false,
    author: { name: "David Wilson", initial: "D", gradient: "bg-cyan-500" },
  },
  {
    id: "p5", sport: "MLB", date: "May 08, 2026 @ 6:40 PM ET", venue: "Citizens Bank Park, Philadelphia, PA",
    home: { name: "Phillies", initials: "PHI", gradient: "bg-rose-600" },
    away: { name: "Rockies", initials: "COL", gradient: "bg-indigo-600" },
    stars: 1, confidence: 56, locked: true,
    author: { name: "Michael Rinner", initial: "M", gradient: "bg-rose-500" },
  },
  {
    id: "p6", sport: "MLB", date: "May 08, 2026 @ 7:05 PM ET", venue: "Oriole Park at Camden Yards, Baltimore, MD",
    home: { name: "Orioles", initials: "BAL", gradient: "bg-orange-500" },
    away: { name: "Athletics", initials: "ATH", gradient: "bg-emerald-600" },
    stars: 10, whale: true, confidence: 92, locked: true,
    author: { name: "Michael Rinner", initial: "M", gradient: "bg-rose-500" },
  },
  {
    id: "p7", sport: "NFL", date: "May 09, 2026 @ 8:20 PM ET", venue: "Lincoln Financial Field, Philadelphia, PA",
    home: { name: "Eagles", initials: "PHI", gradient: "bg-emerald-700" },
    away: { name: "Cowboys", initials: "DAL", gradient: "bg-blue-800" },
    stars: 5, confidence: 88, locked: true,
    author: { name: "Mike Davis", initial: "M", gradient: "bg-indigo-500" },
  },
  {
    id: "p8", sport: "NHL", date: "May 09, 2026 @ 7:00 PM ET", venue: "TD Garden, Boston, MA",
    home: { name: "Bruins", initials: "BOS", gradient: "bg-amber-600" },
    away: { name: "Rangers", initials: "NYR", gradient: "bg-blue-600" },
    stars: 3, confidence: 70, pick: "Rangers PL +1.5", locked: false,
    author: { name: "David Wilson", initial: "D", gradient: "bg-cyan-500" },
  },
  {
    id: "p9", sport: "NBA", date: "May 07, 2026 @ 7:00 PM ET", venue: "Little Caesars Arena, Detroit, MI",
    home: { name: "Pistons", initials: "DET", gradient: "bg-blue-600" },
    away: { name: "Cavaliers", initials: "CLE", gradient: "bg-red-600" },
    stars: 2, confidence: 64, locked: true,
    author: { name: "David Wilson", initial: "D", gradient: "bg-cyan-500" },
  },
  {
    id: "p10", sport: "NCAAB", date: "May 09, 2026 @ 6:00 PM ET", venue: "Dean Smith Center, Chapel Hill, NC",
    home: { name: "UNC", initials: "UNC", gradient: "bg-sky-500" },
    away: { name: "Duke", initials: "DUKE", gradient: "bg-indigo-800" },
    stars: 4, confidence: 77, locked: true,
    author: { name: "Mike Davis", initial: "M", gradient: "bg-indigo-500" },
  },
];

function PicksPage() {
  const [activeSport, setActiveSport] = useState<(typeof sports)[number]>("All");
  const [page, setPage] = useState(1);
  const perPage = 9;

  const filtered = useMemo(
    () => (activeSport === "All" ? picksData : picksData.filter((p) => p.sport === activeSport)),
    [activeSport]
  );
  const totalPages = Math.max(1, Math.ceil(filtered.length / perPage));
  const pageItems = filtered.slice((page - 1) * perPage, page * perPage);

  return (
    <div className="container-x py-12">
      {/* Hero header */}
      <ScrollReveal>
        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-[#0A0C1C]/85 p-8 md:p-12">
          {/* aurora glows */}
          <div className="absolute -top-32 -left-24 h-72 w-72 rounded-full bg-indigo-500/30 blur-3xl pointer-events-none" />
          <div className="absolute -top-24 right-0 h-72 w-72 rounded-full bg-cyan-500/25 blur-3xl pointer-events-none" />
          <div className="absolute -bottom-32 left-1/3 h-72 w-72 rounded-full bg-fuchsia-500/20 blur-3xl pointer-events-none" />
          {/* scan beam */}
          
          <div className="relative grid lg:grid-cols-[1.4fr_1fr] gap-10 items-center">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-500/10 px-3 py-1.5">
                <span className="relative h-2 w-2 rounded-full bg-emerald-400 ping-soft" />
                <span className="eyebrow text-emerald-300 !mb-0">Today's board · Live</span>
              </div>

              <h1 className="mt-5 text-5xl md:text-7xl font-extrabold leading-[1.02] tracking-tight">
                <span className="gradient-text">Expert </span>
                <span className="gradient-text-vivid">Picks</span>
                <span className="text-cyan-300">.</span>
              </h1>

              <p className="mt-5 text-lg text-slate-400 max-w-xl">
                Timestamped before lines move. Graded after the final whistle. Every play tracked, every
                edge documented — no rewriting history.
              </p>

              {/* mini stats strip */}
              <div className="mt-7 grid grid-cols-3 gap-3 max-w-md">
                {[
                  { v: "10", l: "Live today" },
                  { v: "67%", l: "30-day hit" },
                  { v: "+184u", l: "YTD profit" },
                ].map((s) => (
                  <div key={s.l} className="rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2.5">
                    <div className="text-xl font-extrabold gradient-text-vivid">{s.v}</div>
                    <div className="text-[11px] uppercase tracking-wider text-slate-500 mt-0.5">{s.l}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* right side decorative card */}
            <div className="hidden lg:block relative">
              <div className="relative rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur">
                                <div className="relative flex items-center gap-3">
                  <div className="h-10 w-10 rounded-xl bg-[#1E90FF] grid place-items-center">
                    <Sparkles className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <div className="text-white font-bold">Featured Whale</div>
                    <div className="text-xs text-slate-400">Highest confidence today</div>
                  </div>
                </div>
                <div className="mt-5 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="h-12 w-12 rounded-full bg-orange-500 grid place-items-center text-white text-xs font-bold">BAL</div>
                    <span className="text-slate-500 text-sm">vs</span>
                    <div className="h-12 w-12 rounded-full bg-emerald-600 grid place-items-center text-white text-xs font-bold">ATH</div>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-extrabold text-cyan-300">92%</div>
                    <div className="text-[10px] uppercase tracking-wider text-slate-500">confidence</div>
                  </div>
                </div>
                <div className="mt-4 h-1.5 rounded-full bg-white/5 overflow-hidden">
                  <div className="h-full w-[92%] bg-[#1E90FF]" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </ScrollReveal>

      {/* Sport filter + login row */}
      <ScrollReveal delay={100}>
        <div className="mt-8 flex flex-col xl:flex-row xl:items-center gap-5">
          {/* filter pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 xl:pb-0 flex-1 min-w-0">
            <span className="text-[11px] uppercase tracking-widest text-slate-500 pr-1 shrink-0">League</span>
            <div className="h-5 w-px bg-white/10 mr-1 shrink-0" />
            {sports.map((s) => {
              const active = activeSport === s;
              return (
                <button
                  key={s}
                  onClick={() => { setActiveSport(s); setPage(1); }}
                  className={`shrink-0 px-4 py-2 rounded-full text-sm font-semibold transition ${
                    active
                      ? "bg-[#1E90FF] text-white shadow-[0_8px_30px_-8px_rgba(99,102,241,0.7)]"
                      : "border border-white/10 bg-white/[0.03] text-slate-300 hover:border-indigo-400/40 hover:text-white"
                  }`}
                >
                  {s}
                </button>
              );
            })}
          </div>

          {/* compact login CTA */}
          <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-3 pl-5 flex items-center gap-4 xl:w-auto">
            <Lock className="h-4 w-4 text-cyan-300 shrink-0" />
            <div className="text-sm text-slate-300 min-w-0">
              <span className="text-white font-semibold">Unlock full picks.</span>{" "}
              <span className="text-slate-400">Game info is free for all.</span>
            </div>
            <div className="flex gap-2 ml-auto shrink-0">
              <button className="btn-secondary !py-2 !px-4 text-sm">Log In</button>
              <button className="btn-primary !py-2 !px-4 text-sm">Join <ArrowRight className="h-3.5 w-3.5" /></button>
            </div>
          </div>
        </div>
      </ScrollReveal>

      {/* Picks grid */}
      <div className="mt-10 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {pageItems.map((p, i) => (
          <ScrollReveal key={p.id} delay={i * 60}>
            <PickCard pick={p} />
          </ScrollReveal>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="mt-16 text-center text-slate-400">No picks in this category yet.</div>
      )}

      {/* Pagination */}
      <div className="mt-14 flex justify-center items-center gap-2">
        <PageBtn disabled={page === 1} onClick={() => setPage((p) => Math.max(1, p - 1))}>
          <ChevronLeft className="h-4 w-4" />
        </PageBtn>
        {Array.from({ length: Math.max(totalPages, 4) }).map((_, i) => {
          const n = i + 1;
          const active = n === page;
          const disabled = n > totalPages;
          return (
            <button
              key={n}
              disabled={disabled}
              onClick={() => setPage(n)}
              className={`h-10 w-10 rounded-xl text-sm font-bold transition ${
                active
                  ? "bg-[#1E90FF] text-white shadow-[0_8px_24px_-8px_rgba(99,102,241,0.7)]"
                  : disabled
                  ? "glass text-slate-600 cursor-not-allowed"
                  : "glass text-slate-300 hover:text-white hover:border-indigo-400/40"
              }`}
            >
              {n}
            </button>
          );
        })}
        <PageBtn disabled={page === totalPages} onClick={() => setPage((p) => Math.min(totalPages, p + 1))}>
          <ChevronRight className="h-4 w-4" />
        </PageBtn>
      </div>
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
      className={`h-10 w-10 rounded-xl flex items-center justify-center glass transition ${
        disabled ? "text-slate-600 cursor-not-allowed" : "text-slate-300 hover:text-white hover:border-indigo-400/40"
      }`}
    >
      {children}
    </button>
  );
}

function PickCard({ pick }: { pick: Pick }) {
  const accent = sportColors[pick.sport];
  // split "May 09, 2026 @ 4:05 PM ET" → date / time
  const [dateStr, timeStr] = pick.date.split(" @ ");
  const venueShort = pick.venue.split(",").slice(0, 2).join(",");

  return (
    <div className="card-premium relative overflow-hidden flex flex-col h-full group">
      {/* Sport accent strip */}
      <div className={`h-1 w-full ${accent}`} />
      {/* Ambient glow */}
      <div className={`absolute -top-24 -right-24 h-48 w-48 rounded-full ${accent} opacity-20 blur-3xl pointer-events-none`} />

      <div className="p-6 flex flex-col flex-1 relative">
        {/* Header: sport chip + stars */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-2">
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-white/[0.04] border border-white/10">
              <div className={`h-5 w-5 rounded-full ${accent} flex items-center justify-center text-[8px] font-extrabold text-white`}>
                {pick.sport.charAt(0)}
              </div>
              <span className="text-xs font-bold text-white">{pick.sport}</span>
              <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-300 pl-1.5 ml-0.5 border-l border-white/10">
                Graded
              </span>
            </div>
          </div>
          {pick.whale ? (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest rounded-full bg-cyan-500/20 text-cyan-200 border border-cyan-400/30 text-white shadow-[0_6px_20px_-6px_rgba(168,85,247,0.7)]">
              <Sparkles className="h-3 w-3" /> ★10 Whale
            </span>
          ) : (
            <div className="flex items-center gap-0.5">
              {Array.from({ length: 5 }).map((_, j) => (
                <Star
                  key={j}
                  className={`h-3.5 w-3.5 ${j < pick.stars ? "text-cyan-300 fill-cyan-300" : "text-slate-700"}`}
                />
              ))}
            </div>
          )}
        </div>

        {/* Time + venue */}
        <div className="mt-4 flex items-center gap-3 text-xs text-slate-400">
          <span className="inline-flex items-center gap-1.5">
            <Clock className="h-3 w-3 text-slate-500" />
            <span className="text-slate-300 font-semibold">{dateStr}</span>
            <span className="text-cyan-300 font-bold">{timeStr}</span>
          </span>
        </div>
        <div className="mt-1.5 flex items-center gap-1.5 text-xs text-slate-500">
          <MapPin className="h-3 w-3" />
          <span className="truncate">{venueShort}</span>
        </div>

        {/* Matchup showdown */}
        <div className="mt-5 grid grid-cols-[1fr_auto_1fr] items-center gap-3">
          <TeamCol team={pick.away} align="left" />
          <div className="flex flex-col items-center">
            <div className="text-[10px] uppercase tracking-widest text-slate-500 font-bold">vs</div>
            <div className="my-1 h-8 w-px bg-white/15" />
          </div>
          <TeamCol team={pick.home} align="right" />
        </div>

        {/* Confidence: ring + label */}
        <div className="mt-6 flex items-center gap-4 rounded-2xl border border-white/10 bg-black/30 p-4">
          <ConfidenceRing value={pick.confidence} />
          <div className="flex-1 min-w-0">
            <div className="text-[10px] uppercase tracking-widest font-bold text-slate-500">
              Model Confidence
            </div>
            <div className="text-base font-extrabold text-white mt-0.5">{pick.confidence}% edge</div>
            <div className="mt-1 flex items-center gap-1 text-[11px] text-emerald-400 font-semibold">
              <TrendingUp className="h-3 w-3" /> +EV detected
            </div>
          </div>
        </div>

        {/* Pick reveal */}
        <div className="mt-4 flex-1">
          {pick.locked ? (
            <button className="w-full group/lock flex items-center justify-between gap-3 rounded-2xl border border-white/10 bg-white/[0.03] hover:bg-white/[0.06] hover:border-indigo-400/40 px-4 py-3 transition">
              <div className="flex items-center gap-3 min-w-0">
                <div className="h-9 w-9 rounded-xl bg-[#1E90FF] flex items-center justify-center flex-shrink-0">
                  <Lock className="h-4 w-4 text-white" />
                </div>
                <div className="text-left min-w-0">
                  <div className="text-sm font-bold text-white">Members Only Pick</div>
                  <div className="text-[11px] text-slate-400 truncate">Subscribe to unlock the play</div>
                </div>
              </div>
              <span className="text-xs font-bold uppercase tracking-widest text-cyan-300 group-hover/lock:text-white whitespace-nowrap">
                Unlock <ArrowRight className="inline h-3 w-3" />
              </span>
            </button>
          ) : (
            <div className="rounded-2xl border border-cyan-400/30 bg-cyan-500/10 px-4 py-3">
              <div className="flex items-center justify-between gap-3">
                <div className="min-w-0">
                  <div className="text-[10px] uppercase tracking-widest text-cyan-300 font-bold">The Pick</div>
                  <div className="mt-0.5 text-base font-extrabold text-white truncate">{pick.pick}</div>
                </div>
                <span className="px-2 py-0.5 rounded-md bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 text-[10px] font-bold uppercase tracking-widest whitespace-nowrap">
                  Live
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="mt-5 pt-4 border-t border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-2 min-w-0">
            <div className={`h-7 w-7 rounded-full ${pick.author.gradient} flex items-center justify-center text-xs font-bold text-white flex-shrink-0`}>
              {pick.author.initial}
            </div>
            <div className="min-w-0">
              <div className="text-xs font-semibold text-slate-200 truncate">{pick.author.name}</div>
              <div className="text-[10px] uppercase tracking-widest text-slate-500 font-semibold">Analyst</div>
            </div>
          </div>
          <button className="text-[11px] font-bold uppercase tracking-widest text-slate-400 hover:text-cyan-300 transition flex items-center gap-1">
            Analysis <ArrowRight className="h-3 w-3" />
          </button>
        </div>
      </div>
    </div>
  );
}

function TeamCol({ team, align }: { team: Team; align: "left" | "right" }) {
  return (
    <div className={`flex items-center gap-2.5 ${align === "right" ? "flex-row-reverse text-right" : ""}`}>
      <div className={`h-11 w-11 rounded-2xl ${team.gradient} flex items-center justify-center text-[10px] font-extrabold text-white shadow-lg ring-2 ring-white/10 flex-shrink-0`}>
        {team.initials}
      </div>
      <div className="min-w-0">
        <div className="text-[10px] uppercase tracking-widest text-slate-500 font-bold">
          {align === "left" ? "Away" : "Home"}
        </div>
        <div className="text-sm font-bold text-white truncate">{team.name}</div>
      </div>
    </div>
  );
}

function ConfidenceRing({ value }: { value: number }) {
  const size = 64;
  const stroke = 6;
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const offset = c - (value / 100) * c;
  return (
    <div className="relative flex-shrink-0" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <defs>
          <linearGradient id={`ring-${value}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1E90FF" />
            <stop offset="50%" stopColor="#22D3EE" />
            <stop offset="100%" stopColor="#A855F7" />
          </linearGradient>
        </defs>
        <circle cx={size / 2} cy={size / 2} r={r} stroke="rgba(255,255,255,0.06)" strokeWidth={stroke} fill="none" />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          stroke={`url(#ring-${value})`}
          strokeWidth={stroke}
          fill="none"
          strokeDasharray={c}
          strokeDashoffset={offset}
          strokeLinecap="round"
          style={{ transition: "stroke-dashoffset 1s ease" }}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center text-sm font-extrabold text-white">
        {value}%
      </div>
    </div>
  );
}
