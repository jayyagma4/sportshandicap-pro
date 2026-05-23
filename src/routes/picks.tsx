import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Lock, Star, ChevronLeft, ChevronRight, ArrowRight, MapPin, Clock, TrendingUp, Sparkles } from "lucide-react";
import { ScrollReveal } from "@/components/ScrollReveal";

export const Route = createFileRoute("/picks")({
  head: () => ({
    meta: [
      { title: "Expert Picks — Sportshandicapper" },
      { name: "description", content: "Today's expert betting picks across NBA, NFL, NHL, MLB, NCAAF, and NCAAB — timestamped before lines move, graded after the final whistle." },
      { property: "og:title", content: "Expert Picks — Sportshandicapper" },
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
  NHL: "from-sky-400 to-blue-600",
  MLB: "from-rose-400 to-red-500",
  NCAAF: "from-amber-400 to-yellow-600",
  NCAAB: "from-violet-500 to-fuchsia-500",
};

const sports: ("All" | Pick["sport"])[] = ["All", "NFL", "NCAAF", "NBA", "NCAAB", "MLB", "NHL"];

const picksData: Pick[] = [
  {
    id: "p1", sport: "NBA", date: "May 09, 2026 @ 3:00 PM ET", venue: "Rocket Arena, Cleveland, OH",
    home: { name: "Cavaliers", initials: "CLE", gradient: "from-red-700 to-amber-500" },
    away: { name: "Pistons", initials: "DET", gradient: "from-blue-500 to-red-500" },
    stars: 4, confidence: 82, locked: true,
    author: { name: "Mike Davis", initial: "M", gradient: "from-purple-500 to-indigo-500" },
  },
  {
    id: "p2", sport: "MLB", date: "May 09, 2026 @ 4:05 PM ET", venue: "Oriole Park at Camden Yards, Baltimore, MD",
    home: { name: "Orioles", initials: "BAL", gradient: "from-orange-500 to-amber-600" },
    away: { name: "Athletics", initials: "ATH", gradient: "from-green-600 to-emerald-700" },
    stars: 5, confidence: 86, locked: true,
    author: { name: "Michael Rinner", initial: "M", gradient: "from-rose-500 to-orange-500" },
  },
  {
    id: "p3", sport: "MLB", date: "May 09, 2026 @ 6:05 PM ET", venue: "Citizens Bank Park, Philadelphia, PA",
    home: { name: "Phillies", initials: "PHI", gradient: "from-red-500 to-rose-600" },
    away: { name: "Rockies", initials: "COL", gradient: "from-indigo-500 to-purple-600" },
    stars: 10, whale: true, confidence: 89, locked: true,
    author: { name: "Michael Rinner", initial: "M", gradient: "from-rose-500 to-orange-500" },
  },
  {
    id: "p4", sport: "MLB", date: "May 08, 2026 @ 6:10 PM ET", venue: "Great American Ball Park, Cincinnati, OH",
    home: { name: "Reds", initials: "CIN", gradient: "from-red-600 to-red-800" },
    away: { name: "Astros", initials: "HOU", gradient: "from-orange-500 to-amber-700" },
    stars: 5, confidence: 85, pick: "Astros ML -125", locked: false,
    author: { name: "David Wilson", initial: "D", gradient: "from-cyan-500 to-blue-500" },
  },
  {
    id: "p5", sport: "MLB", date: "May 08, 2026 @ 6:40 PM ET", venue: "Citizens Bank Park, Philadelphia, PA",
    home: { name: "Phillies", initials: "PHI", gradient: "from-red-500 to-rose-600" },
    away: { name: "Rockies", initials: "COL", gradient: "from-indigo-500 to-purple-600" },
    stars: 1, confidence: 56, locked: true,
    author: { name: "Michael Rinner", initial: "M", gradient: "from-rose-500 to-orange-500" },
  },
  {
    id: "p6", sport: "MLB", date: "May 08, 2026 @ 7:05 PM ET", venue: "Oriole Park at Camden Yards, Baltimore, MD",
    home: { name: "Orioles", initials: "BAL", gradient: "from-orange-500 to-amber-600" },
    away: { name: "Athletics", initials: "ATH", gradient: "from-green-600 to-emerald-700" },
    stars: 10, whale: true, confidence: 92, locked: true,
    author: { name: "Michael Rinner", initial: "M", gradient: "from-rose-500 to-orange-500" },
  },
  {
    id: "p7", sport: "NFL", date: "May 09, 2026 @ 8:20 PM ET", venue: "Lincoln Financial Field, Philadelphia, PA",
    home: { name: "Eagles", initials: "PHI", gradient: "from-emerald-600 to-emerald-800" },
    away: { name: "Cowboys", initials: "DAL", gradient: "from-blue-700 to-slate-800" },
    stars: 5, confidence: 88, locked: true,
    author: { name: "Mike Davis", initial: "M", gradient: "from-purple-500 to-indigo-500" },
  },
  {
    id: "p8", sport: "NHL", date: "May 09, 2026 @ 7:00 PM ET", venue: "TD Garden, Boston, MA",
    home: { name: "Bruins", initials: "BOS", gradient: "from-yellow-500 to-amber-700" },
    away: { name: "Rangers", initials: "NYR", gradient: "from-blue-600 to-red-600" },
    stars: 3, confidence: 70, pick: "Rangers PL +1.5", locked: false,
    author: { name: "David Wilson", initial: "D", gradient: "from-cyan-500 to-blue-500" },
  },
  {
    id: "p9", sport: "NBA", date: "May 07, 2026 @ 7:00 PM ET", venue: "Little Caesars Arena, Detroit, MI",
    home: { name: "Pistons", initials: "DET", gradient: "from-blue-500 to-red-500" },
    away: { name: "Cavaliers", initials: "CLE", gradient: "from-red-700 to-amber-500" },
    stars: 2, confidence: 64, locked: true,
    author: { name: "David Wilson", initial: "D", gradient: "from-cyan-500 to-blue-500" },
  },
  {
    id: "p10", sport: "NCAAB", date: "May 09, 2026 @ 6:00 PM ET", venue: "Dean Smith Center, Chapel Hill, NC",
    home: { name: "UNC", initials: "UNC", gradient: "from-sky-400 to-blue-600" },
    away: { name: "Duke", initials: "DUKE", gradient: "from-blue-800 to-indigo-900" },
    stars: 4, confidence: 77, locked: true,
    author: { name: "Mike Davis", initial: "M", gradient: "from-purple-500 to-indigo-500" },
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
      {/* Header */}
      <ScrollReveal>
        <div className="eyebrow text-emerald-300 mb-3 flex items-center gap-2">
          <span className="relative h-2 w-2 rounded-full bg-emerald-400 ping-soft" /> Today's board
        </div>
        <h1 className="text-5xl md:text-7xl font-extrabold leading-[1.05]">
          <span className="gradient-text">Expert </span>
          <span className="gradient-text-vivid">Picks.</span>
        </h1>
        <p className="mt-4 text-lg text-slate-400 max-w-2xl">
          Our latest betting picks across all sports — timestamped before lines move and graded after
          the final whistle.
        </p>
      </ScrollReveal>

      {/* Sport filter */}
      <ScrollReveal delay={100}>
        <div className="mt-10 flex flex-wrap gap-2">
          {sports.map((s) => {
            const active = activeSport === s;
            return (
              <button
                key={s}
                onClick={() => { setActiveSport(s); setPage(1); }}
                className={`px-5 py-2 rounded-full text-sm font-semibold transition ${
                  active
                    ? "bg-gradient-to-r from-[#1E90FF] to-[#A855F7] text-white shadow-[0_8px_30px_-8px_rgba(99,102,241,0.7)]"
                    : "glass text-slate-300 hover:border-indigo-400/40 hover:text-white"
                }`}
              >
                {s}
              </button>
            );
          })}
        </div>
      </ScrollReveal>

      {/* Login banner */}
      <ScrollReveal delay={150}>
        <div className="mt-8 relative overflow-hidden rounded-2xl glass p-6 md:p-7">
          <div className="absolute -top-20 -right-20 h-60 w-60 rounded-full bg-indigo-500/25 blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 h-60 w-60 rounded-full bg-cyan-500/20 blur-3xl pointer-events-none" />
          <div className="relative flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <div className="text-white font-bold text-base md:text-lg">
                Login or join to see full pick details.{" "}
                <span className="text-slate-400 font-normal">Game info and status are visible to all.</span>
              </div>
            </div>
            <div className="flex gap-3">
              <button className="btn-secondary">Log In</button>
              <button className="btn-primary">Join Now <ArrowRight className="h-4 w-4" /></button>
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
                  ? "bg-gradient-to-r from-[#1E90FF] to-[#A855F7] text-white shadow-[0_8px_24px_-8px_rgba(99,102,241,0.7)]"
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
  return (
    <div className="card-premium p-6 flex flex-col h-full">
      {/* Top row */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className={`h-9 w-9 rounded-full bg-gradient-to-br ${sportColors[pick.sport]} flex items-center justify-center text-[10px] font-extrabold text-white shadow-lg`}>
            {pick.sport.slice(0, 3)}
          </div>
          <div>
            <div className="text-sm font-bold text-white">{pick.sport}</div>
            <span className="inline-block mt-1 px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest rounded-md bg-white/5 border border-white/10 text-slate-300">
              Graded
            </span>
          </div>
        </div>
        <div className="text-right">
          <div className="text-[10px] uppercase tracking-widest text-slate-500 font-semibold">Stars</div>
          {pick.whale ? (
            <span className="mt-1 inline-block px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest rounded-md bg-gradient-to-r from-purple-500 to-pink-500 text-white">
              ★10 Whale
            </span>
          ) : (
            <div className="flex items-center gap-0.5 mt-1 justify-end">
              {Array.from({ length: 5 }).map((_, j) => (
                <Star
                  key={j}
                  className={`h-3.5 w-3.5 ${j < pick.stars ? "text-cyan-300 fill-cyan-300" : "text-slate-700"}`}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Date + venue */}
      <div className="mt-5 text-xs text-slate-500 leading-relaxed">
        <span className="text-slate-300 font-semibold">{pick.date}</span>
        <span className="mx-2 text-slate-600">·</span>
        {pick.venue}
      </div>

      {/* Matchup */}
      <div className="mt-4 flex items-center gap-3 flex-wrap">
        <div className="flex items-center gap-2">
          <div className={`h-7 w-7 rounded-full bg-gradient-to-br ${pick.away.gradient} flex items-center justify-center text-[9px] font-extrabold text-white`}>
            {pick.away.initials}
          </div>
          <span className="text-white font-bold text-sm">{pick.away.name}</span>
        </div>
        <span className="text-[10px] uppercase tracking-widest text-slate-500 font-semibold">vs</span>
        <div className="flex items-center gap-2">
          <div className={`h-7 w-7 rounded-full bg-gradient-to-br ${pick.home.gradient} flex items-center justify-center text-[9px] font-extrabold text-white`}>
            {pick.home.initials}
          </div>
          <span className="text-white font-bold text-sm">{pick.home.name}</span>
        </div>
      </div>

      {/* Confidence */}
      <div className="mt-5">
        <div className="flex items-center gap-2">
          <span className="px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest rounded-md bg-white/5 border border-white/10 text-slate-300">
            Graded Pick
          </span>
          <span className="text-sm font-extrabold text-cyan-300">{pick.confidence}% Confidence</span>
        </div>
        <div className="mt-2 h-1.5 rounded-full bg-white/5 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-[#1E90FF] via-[#22D3EE] to-[#A855F7]"
            style={{ width: `${pick.confidence}%` }}
          />
        </div>
      </div>

      {/* Pick body / members-only */}
      <div className="mt-5 flex-1">
        {pick.locked ? (
          <div className="rounded-2xl glass p-5 text-center">
            <div className="mx-auto h-10 w-10 rounded-2xl bg-gradient-to-br from-[#1E90FF] to-[#A855F7] flex items-center justify-center mb-3">
              <Lock className="h-4 w-4 text-white" />
            </div>
            <div className="text-sm font-bold text-white">Members Only Pick</div>
            <div className="text-xs text-slate-400 mt-1">Login or subscribe to unlock this pick</div>
            <div className="mt-4 flex gap-2 justify-center">
              <button className="btn-secondary !py-2 !px-4 !text-xs">Log In</button>
              <button className="btn-primary !py-2 !px-4 !text-xs">Subscribe</button>
            </div>
          </div>
        ) : (
          <div className="rounded-2xl border border-cyan-400/30 bg-gradient-to-br from-cyan-500/10 to-indigo-500/10 p-5">
            <div className="eyebrow text-cyan-300">Pick</div>
            <div className="mt-1 text-lg font-extrabold text-white">{pick.pick}</div>
            <div className="mt-1 text-xs text-slate-400">Locked at pre-line snapshot</div>
          </div>
        )}
      </div>

      {/* Author */}
      <div className="mt-5 pt-4 border-t border-white/10 flex items-center gap-2">
        <div className={`h-7 w-7 rounded-full bg-gradient-to-br ${pick.author.gradient} flex items-center justify-center text-xs font-bold text-white`}>
          {pick.author.initial}
        </div>
        <span className="text-sm text-slate-300">{pick.author.name}</span>
      </div>
    </div>
  );
}
