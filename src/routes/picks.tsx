import { createFileRoute } from "@tanstack/react-router";
import { Lock, Star, Clock } from "lucide-react";
import { ScrollReveal } from "@/components/ScrollReveal";

export const Route = createFileRoute("/picks")({
  head: () => ({
    meta: [
      { title: "Live Picks — Sportshandicapper" },
      { name: "description", content: "Today's board of timestamped, simulation-backed picks across the major leagues." },
      { property: "og:title", content: "Live Picks — Sportshandicapper" },
      { property: "og:description", content: "Today's timestamped picks across NBA, NFL, NHL, MLB, NCAAF, NCAAB." },
    ],
  }),
  component: PicksPage,
});

type Pick = {
  sport: string; match: string; pick: string; stars: number; conf: number; time: string; locked?: boolean;
};

const picks: Pick[] = [
  { sport: "NBA", match: "Lakers @ Warriors", pick: "Warriors -3.5", stars: 4, conf: 81, time: "7:30 PM PT" },
  { sport: "NBA", match: "Celtics @ Nuggets", pick: "Over 224.5", stars: 3, conf: 72, time: "9:00 PM PT" },
  { sport: "NFL", match: "Eagles vs Cowboys", pick: "Eagles ML -135", stars: 5, conf: 88, time: "8:20 PM ET" },
  { sport: "NFL", match: "Chiefs vs Bills", pick: "Under 47", stars: 4, conf: 79, time: "4:25 PM ET" },
  { sport: "NHL", match: "Rangers @ Bruins", pick: "Rangers PL +1.5", stars: 3, conf: 70, time: "7:00 PM ET" },
  { sport: "MLB", match: "Dodgers @ Yankees", pick: "Dodgers ML -110", stars: 5, conf: 91, time: "7:05 PM ET", locked: true },
  { sport: "NCAAF", match: "Alabama vs Georgia", pick: "Bama +2.5", stars: 4, conf: 84, time: "3:30 PM ET", locked: true },
  { sport: "NCAAB", match: "Duke @ UNC", pick: "Under 152.5", stars: 4, conf: 77, time: "6:00 PM ET", locked: true },
  { sport: "NBA", match: "Heat @ Sixers", pick: "Heat +4", stars: 3, conf: 69, time: "8:00 PM ET", locked: true },
];

function PicksPage() {
  return (
    <div className="container-x py-12">
      <ScrollReveal>
        <div className="eyebrow text-emerald-300 mb-2 flex items-center gap-2">
          <span className="relative h-2 w-2 rounded-full bg-emerald-400 ping-soft" /> Today's board
        </div>
        <h1 className="text-5xl md:text-7xl font-extrabold gradient-text">Live picks.</h1>
        <p className="mt-4 text-lg text-slate-400 max-w-2xl">
          Every pick is timestamped before lines move and graded after the final whistle. Sign in to
          unlock locked plays.
        </p>
      </ScrollReveal>

      <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {picks.map((p, i) => (
          <ScrollReveal key={p.match} delay={i * 60}>
            <PickCard pick={p} />
          </ScrollReveal>
        ))}
      </div>
    </div>
  );
}

function PickCard({ pick }: { pick: Pick }) {
  return (
    <div className="card-premium p-6 relative overflow-hidden h-full">
      <div className="flex items-center justify-between mb-3">
        <span className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest rounded-md bg-gradient-to-r from-[#1E90FF]/30 to-[#A855F7]/30 text-cyan-200 border border-cyan-400/30">
          {pick.sport}
        </span>
        <span className="flex items-center gap-1 text-xs text-slate-500">
          <Clock className="h-3 w-3" /> {pick.time}
        </span>
      </div>
      <h3 className="text-lg font-bold text-white">{pick.match}</h3>
      <div className={`mt-3 text-sm font-semibold ${pick.locked ? "blur-sm select-none" : "text-cyan-300"}`}>
        {pick.pick}
      </div>

      <div className="mt-4 flex items-center justify-between">
        <div className="flex items-center gap-0.5 text-yellow-400">
          {Array.from({ length: 5 }).map((_, j) => (
            <Star key={j} className={`h-3.5 w-3.5 ${j < pick.stars ? "fill-current" : "opacity-20"}`} />
          ))}
        </div>
        <div className="text-sm font-bold text-white">{pick.conf}%</div>
      </div>
      <div className="mt-3 h-1.5 rounded-full bg-white/5 overflow-hidden">
        <div className="h-full bg-gradient-to-r from-[#1E90FF] to-[#A855F7]" style={{ width: `${pick.conf}%` }} />
      </div>

      {pick.locked && (
        <div className="absolute inset-0 bg-[#060818]/70 backdrop-blur-sm flex flex-col items-center justify-center gap-3">
          <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-[#1E90FF] to-[#A855F7] flex items-center justify-center">
            <Lock className="h-5 w-5 text-white" />
          </div>
          <div className="text-sm font-bold uppercase tracking-widest text-white">Members Only</div>
          <button className="btn-primary !py-2 !px-4 !text-xs">Unlock Picks</button>
        </div>
      )}
    </div>
  );
}
