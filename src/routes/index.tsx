import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Check,
  Lock,
  TrendingUp,
  BarChart3,
  Radio,
  Flame,
  Trophy,
  ShieldCheck,
  Activity,
  Target,
  Clock,
  ChevronRight,
  Star,
} from "lucide-react";
import { ScrollReveal } from "@/components/ScrollReveal";
import { Counter } from "@/components/Counter";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Sportshandicapper — Verified Picks & Sharp Analytics" },
      {
        name: "description",
        content:
          "Timestamped expert picks, verified records, and institutional sports analytics across MLB, NBA, NFL, NHL, CFB and CBB.",
      },
      { property: "og:title", content: "Sportshandicapper — Verified Picks & Sharp Analytics" },
      {
        property: "og:description",
        content: "Timestamped expert picks, verified records, and live sharp analytics.",
      },
    ],
  }),
  component: Home,
});

function Home() {
  return (
    <>
      <Ticker />
      <Hero />
      <RecordStrip />
      <TodaysBoard />
      <PremiumPicks />
      <Leaderboard />
      <Packages />
      <Tools />
      <Testimonials />
      <FinalCta />
    </>
  );
}

/* ------------------------------ TICKER ------------------------------ */

const tickerItems = [
  { league: "MLB", text: "NYY -1.5 vs BOS", res: "WIN", color: "text-emerald-400" },
  { league: "NBA", text: "BOS/MIA Over 218.5", res: "WIN", color: "text-emerald-400" },
  { league: "NHL", text: "EDM ML vs LAK", res: "WIN", color: "text-emerald-400" },
  { league: "NFL", text: "KC -3 vs LAC", res: "PEND", color: "text-amber-300" },
  { league: "CFB", text: "Georgia -7.5", res: "WIN", color: "text-emerald-400" },
  { league: "MLB", text: "LAD/SD Under 8", res: "LOSS", color: "text-rose-400" },
  { league: "CBB", text: "Duke -4 vs UNC", res: "WIN", color: "text-emerald-400" },
  { league: "NBA", text: "DEN ML vs PHX", res: "WIN", color: "text-emerald-400" },
];

function Ticker() {
  const items = [...tickerItems, ...tickerItems];
  return (
    <div className="border-b border-white/10 bg-black/40 overflow-hidden">
      <div className="flex gap-10 py-2.5 whitespace-nowrap animate-[ticker_45s_linear_infinite]">
        {items.map((i, idx) => (
          <div key={idx} className="flex items-center gap-2.5 text-xs font-mono uppercase tracking-wider">
            <span className="px-1.5 py-0.5 rounded bg-white/5 border border-white/10 text-slate-300 text-[10px] font-bold">
              {i.league}
            </span>
            <span className="text-slate-200">{i.text}</span>
            <span className={`font-bold ${i.color}`}>{i.res}</span>
            <span className="text-slate-700">•</span>
          </div>
        ))}
      </div>
      <style>{`@keyframes ticker { from { transform: translateX(0) } to { transform: translateX(-50%) } }`}</style>
    </div>
  );
}

/* ------------------------------ HERO ------------------------------ */

function Hero() {
  return (
    <section className="container-x pt-12 pb-20">
      <div className="grid lg:grid-cols-[1.15fr_1fr] gap-12 items-center">
        <ScrollReveal>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md border border-emerald-400/30 bg-emerald-400/5 mb-6">
            <span className="relative h-1.5 w-1.5 rounded-full bg-emerald-400 ping-soft" />
            <span className="text-[10px] uppercase tracking-[0.18em] font-bold text-emerald-300">
              Live Slate · 12 picks released today
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl font-black tracking-tight leading-[0.95]">
            Sharper picks.
            <br />
            <span className="text-[#1E90FF]">Verified</span> records.
          </h1>

          <p className="mt-6 text-lg text-slate-400 max-w-xl leading-relaxed">
            We don't sell hype. Every pick is timestamped before line move, posted with reasoning,
            and graded after the final whistle. Coverage spans MLB, NBA, NFL, NHL, CFB and CBB.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/packages" className="btn-primary">
              View Membership <ArrowRight className="h-4 w-4" />
            </Link>
            <Link to="/picks" className="btn-secondary">
              See Today's Picks
            </Link>
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-3 text-xs text-slate-500">
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-emerald-400" />
              <span>3rd-party verified</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-cyan-300" />
              <span>Posted pre-market move</span>
            </div>
            <div className="flex items-center gap-2">
              <Activity className="h-4 w-4 text-[#1E90FF]" />
              <span>Graded transparently</span>
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={150}>
          <Scoreboard />
        </ScrollReveal>
      </div>
    </section>
  );
}

function Scoreboard() {
  return (
    <div className="card-premium overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-3 border-b border-white/10 bg-black/30">
        <div className="flex items-center gap-2">
          <div className="h-2 w-2 rounded-full bg-emerald-400" />
          <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-slate-300">
            Tonight's Card
          </span>
        </div>
        <span className="text-[10px] font-mono text-slate-500">MAY 28 · 8:42 PM ET</span>
      </div>

      {/* Game rows */}
      <div className="divide-y divide-white/5">
        {[
          { lg: "MLB", a: "NYY", b: "BOS", pick: "NYY -1.5", conf: 92, ev: "+6.4%" },
          { lg: "NBA", a: "BOS", b: "MIA", pick: "Over 218.5", conf: 88, ev: "+4.1%" },
          { lg: "NHL", a: "EDM", b: "LAK", pick: "EDM ML", conf: 81, ev: "+3.2%" },
        ].map((g) => (
          <div key={g.a} className="px-5 py-4 hover:bg-white/[0.02] transition">
            <div className="flex items-center justify-between mb-2.5">
              <div className="flex items-center gap-2">
                <span className="px-1.5 py-0.5 rounded bg-white/5 border border-white/10 text-[9px] font-bold tracking-widest text-slate-400">
                  {g.lg}
                </span>
                <span className="font-bold text-white text-sm">
                  {g.a} <span className="text-slate-600">vs</span> {g.b}
                </span>
              </div>
              <span className="text-[10px] font-mono text-emerald-400 font-bold">{g.ev} EV</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm">
                <Target className="h-3.5 w-3.5 text-[#1E90FF]" />
                <span className="font-semibold text-slate-200">{g.pick}</span>
              </div>
              <div className="flex items-center gap-2 min-w-[120px]">
                <div className="flex-1 h-1 rounded-full bg-white/5 overflow-hidden">
                  <div className="h-full bg-[#1E90FF]" style={{ width: `${g.conf}%` }} />
                </div>
                <span className="text-[10px] font-mono text-slate-400 w-8 text-right">{g.conf}%</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="px-5 py-3.5 border-t border-white/10 bg-black/30 flex items-center justify-between">
        <span className="text-[10px] uppercase tracking-widest text-slate-500">9 more picks</span>
        <Link to="/picks" className="text-[11px] font-bold uppercase tracking-widest text-cyan-300 hover:text-white flex items-center gap-1">
          View board <ChevronRight className="h-3 w-3" />
        </Link>
      </div>
    </div>
  );
}

/* --------------------------- RECORD STRIP --------------------------- */

function RecordStrip() {
  const records = [
    { label: "30-Day Hit", value: 67.4, suffix: "%", decimals: 1 },
    { label: "YTD Units", value: 184, prefix: "+" },
    { label: "Win Streak", value: 7, suffix: "W" },
    { label: "ROI", value: 12.8, suffix: "%", decimals: 1 },
  ];
  return (
    <section className="border-y border-white/10 bg-black/30">
      <div className="container-x py-8 grid grid-cols-2 md:grid-cols-4 divide-x divide-white/5">
        {records.map((r, i) => (
          <ScrollReveal key={r.label} delay={i * 80}>
            <div className="px-4 text-center">
              <div className="text-[10px] uppercase tracking-[0.2em] font-bold text-slate-500 mb-2">
                {r.label}
              </div>
              <div className="text-4xl font-black text-white font-mono">
                <Counter to={r.value} prefix={r.prefix} suffix={r.suffix} decimals={r.decimals} />
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}

/* ---------------------------- TODAY'S BOARD ---------------------------- */

const leagues = ["ALL", "MLB", "NBA", "NFL", "NHL", "CFB", "CBB"];

const board = [
  {
    league: "MLB",
    time: "7:05 PM",
    matchup: "Yankees vs Red Sox",
    pick: "NYY -1.5 (-115)",
    book: "DraftKings",
    conf: 92,
    units: 3,
    expert: "M. Rinner",
  },
  {
    league: "NBA",
    time: "8:00 PM",
    matchup: "Celtics vs Heat",
    pick: "Over 218.5 (-110)",
    book: "FanDuel",
    conf: 88,
    units: 2,
    expert: "M. Davis",
  },
  {
    league: "NHL",
    time: "10:00 PM",
    matchup: "Oilers vs Kings",
    pick: "EDM Puck Line",
    book: "BetMGM",
    conf: 81,
    units: 2,
    expert: "K. Pratt",
  },
];

function TodaysBoard() {
  return (
    <section className="container-x py-20">
      <ScrollReveal>
        <div className="flex flex-wrap items-end justify-between mb-8 gap-4">
          <div>
            <div className="eyebrow text-[#1E90FF] mb-2">Live Board</div>
            <h2 className="text-4xl md:text-5xl font-black text-white">Today's Picks.</h2>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {leagues.map((l) => (
              <button
                key={l}
                className={`px-3 py-1.5 rounded-md text-[10px] font-bold uppercase tracking-widest border transition ${
                  l === "ALL"
                    ? "bg-[#1E90FF] text-white border-[#1E90FF]"
                    : "bg-white/5 text-slate-400 border-white/10 hover:text-white hover:border-white/20"
                }`}
              >
                {l}
              </button>
            ))}
          </div>
        </div>
      </ScrollReveal>

      <div className="card-premium overflow-hidden">
        <div className="grid grid-cols-[60px_1fr_140px_80px_100px] md:grid-cols-[80px_1fr_180px_100px_120px_120px] gap-3 px-5 py-3 border-b border-white/10 bg-black/40 text-[10px] uppercase tracking-widest font-bold text-slate-500">
          <div>League</div>
          <div>Matchup</div>
          <div className="hidden md:block">Pick</div>
          <div className="text-center">Units</div>
          <div className="text-right">Confidence</div>
          <div className="hidden md:block text-right">Expert</div>
        </div>
        {board.map((row, i) => (
          <ScrollReveal key={row.matchup} delay={i * 80}>
            <div className="grid grid-cols-[60px_1fr_140px_80px_100px] md:grid-cols-[80px_1fr_180px_100px_120px_120px] gap-3 px-5 py-5 border-b border-white/5 last:border-0 hover:bg-white/[0.02] transition items-center">
              <div>
                <span className="px-1.5 py-0.5 rounded bg-white/5 border border-white/10 text-[9px] font-bold tracking-widest text-slate-300">
                  {row.league}
                </span>
              </div>
              <div>
                <div className="text-sm font-bold text-white">{row.matchup}</div>
                <div className="text-[10px] text-slate-500 font-mono mt-0.5">
                  {row.time} · {row.book}
                </div>
              </div>
              <div className="hidden md:flex items-center gap-2 text-sm font-semibold text-slate-200">
                <Lock className="h-3.5 w-3.5 text-slate-600" />
                <span className="font-mono">{row.pick}</span>
              </div>
              <div className="text-center">
                <div className="inline-flex items-center justify-center h-7 w-7 rounded-md bg-[#1E90FF]/15 border border-[#1E90FF]/30 text-[#1E90FF] font-black text-xs font-mono">
                  {row.units}u
                </div>
              </div>
              <div className="flex items-center gap-2 justify-end">
                <div className="hidden md:block flex-1 h-1 rounded-full bg-white/5 overflow-hidden max-w-[60px]">
                  <div className="h-full bg-emerald-400" style={{ width: `${row.conf}%` }} />
                </div>
                <span className="text-xs font-mono font-bold text-emerald-300 w-8 text-right">
                  {row.conf}%
                </span>
              </div>
              <div className="hidden md:block text-right text-xs font-semibold text-slate-300">
                {row.expert}
              </div>
            </div>
          </ScrollReveal>
        ))}
        <div className="px-5 py-3.5 bg-black/30 flex items-center justify-between">
          <span className="text-xs text-slate-500">9 more picks behind paywall</span>
          <Link to="/picks" className="text-[11px] font-bold uppercase tracking-widest text-cyan-300 hover:text-white flex items-center gap-1">
            Unlock board <ChevronRight className="h-3 w-3" />
          </Link>
        </div>
      </div>
    </section>
  );
}

/* --------------------------- PREMIUM PICKS --------------------------- */

function PremiumPicks() {
  return (
    <section className="container-x py-20">
      <ScrollReveal>
        <div className="text-center mb-12">
          <div className="eyebrow text-amber-300 mb-2 flex items-center justify-center gap-2">
            <Flame className="h-3 w-3" /> Whale Plays
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-white">
            High-confidence releases.
          </h2>
          <p className="text-slate-400 mt-3 max-w-xl mx-auto">
            Reserved for situations the model flags with confluence — line value, sharp money, situational edge.
          </p>
        </div>
      </ScrollReveal>

      <div className="grid md:grid-cols-3 gap-5">
        {[
          { tag: "10★ WHALE", match: "Yankees vs Red Sox", pick: "NYY ML", conf: 94, edge: "+8.2%", rec: "12-3 L15" },
          { tag: "8★ STRONG", match: "Celtics vs Heat", pick: "BOS -5.5", conf: 87, edge: "+5.4%", rec: "9-4 L13" },
          { tag: "7★ LEAN", match: "Oilers vs Kings", pick: "Under 6", conf: 79, edge: "+3.6%", rec: "8-5 L13" },
        ].map((p, i) => (
          <ScrollReveal key={p.match} delay={i * 100}>
            <div className="card-premium p-6 relative">
              <div className="flex items-center justify-between mb-5">
                <span className="px-2 py-1 rounded bg-amber-400/10 border border-amber-400/30 text-amber-300 text-[10px] font-black tracking-widest">
                  {p.tag}
                </span>
                <span className="text-[10px] font-mono text-slate-500">{p.rec}</span>
              </div>

              <h3 className="text-xl font-black text-white">{p.match}</h3>

              <div className="mt-5 grid grid-cols-2 gap-3">
                <div className="rounded-lg border border-white/10 bg-black/30 p-3">
                  <div className="text-[9px] uppercase tracking-widest text-slate-500 font-bold">Confidence</div>
                  <div className="text-2xl font-black text-white mt-1 font-mono">{p.conf}%</div>
                </div>
                <div className="rounded-lg border border-white/10 bg-black/30 p-3">
                  <div className="text-[9px] uppercase tracking-widest text-slate-500 font-bold">+EV Edge</div>
                  <div className="text-2xl font-black text-emerald-400 mt-1 font-mono">{p.edge}</div>
                </div>
              </div>

              <div className="mt-4 rounded-lg border border-white/10 bg-white/[0.02] p-3 flex items-center justify-between">
                <div className="flex items-center gap-2 text-slate-400">
                  <Lock className="h-3.5 w-3.5" />
                  <span className="text-xs font-mono">{p.pick}</span>
                </div>
                <button className="text-[10px] font-bold uppercase tracking-widest text-cyan-300 hover:text-white">
                  Unlock
                </button>
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}

/* --------------------------- LEADERBOARD --------------------------- */

const experts = [
  { name: "Michael Rinner", sport: "MLB Specialist", wl: "128-74", units: 184.3, roi: 18.2 },
  { name: "Mike Davis", sport: "NBA / CBB", wl: "94-58", units: 142.7, roi: 14.6 },
  { name: "Kyle Pratt", sport: "NHL / NFL", wl: "76-49", units: 98.4, roi: 11.9 },
];

function Leaderboard() {
  return (
    <section className="container-x py-20">
      <ScrollReveal>
        <div className="flex items-end justify-between mb-8">
          <div>
            <div className="eyebrow text-cyan-300 mb-2">Verified Experts</div>
            <h2 className="text-4xl md:text-5xl font-black text-white">Cappers Leaderboard.</h2>
          </div>
          <Link to="/picks" className="hidden md:flex text-[11px] font-bold uppercase tracking-widest text-cyan-300 hover:text-white items-center gap-1">
            All experts <ChevronRight className="h-3 w-3" />
          </Link>
        </div>
      </ScrollReveal>

      <div className="grid md:grid-cols-3 gap-5">
        {experts.map((e, i) => (
          <ScrollReveal key={e.name} delay={i * 100}>
            <div className="card-premium p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="h-11 w-11 rounded-full bg-[#1E90FF] flex items-center justify-center text-white font-black border border-white/20">
                    {e.name.split(" ").map(n => n[0]).join("")}
                  </div>
                  <div>
                    <div className="font-bold text-white text-sm">{e.name}</div>
                    <div className="text-[10px] uppercase tracking-widest text-slate-500 font-bold">{e.sport}</div>
                  </div>
                </div>
                <span className="px-1.5 py-0.5 rounded bg-emerald-400/10 border border-emerald-400/30 text-emerald-300 text-[9px] font-black tracking-widest">
                  #{i + 1}
                </span>
              </div>
              <div className="grid grid-cols-3 gap-2 border-t border-white/5 pt-4">
                <div>
                  <div className="text-[9px] uppercase tracking-widest text-slate-500 font-bold">W-L</div>
                  <div className="font-mono font-bold text-white text-sm mt-1">{e.wl}</div>
                </div>
                <div>
                  <div className="text-[9px] uppercase tracking-widest text-slate-500 font-bold">Units</div>
                  <div className="font-mono font-bold text-emerald-400 text-sm mt-1">+{e.units}</div>
                </div>
                <div>
                  <div className="text-[9px] uppercase tracking-widest text-slate-500 font-bold">ROI</div>
                  <div className="font-mono font-bold text-cyan-300 text-sm mt-1">{e.roi}%</div>
                </div>
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}

/* ------------------------------ PACKAGES ------------------------------ */

const packages = [
  { name: "Day Pass", price: "$9.99", period: "/ 24h", features: ["All picks today", "Live updates", "Email alerts"] },
  {
    name: "Monthly Pro",
    price: "$99.99",
    period: "/ month",
    popular: true,
    features: ["All picks · all sports", "Whale plays", "Live odds & alerts", "Pro Discord"],
  },
  { name: "Season Pass", price: "$299.99", period: "/ 6mo", features: ["Everything in Pro", "1:1 strategy call", "Private model alerts", "Save 50%"] },
];

function Packages() {
  return (
    <section className="container-x py-20" id="packages">
      <ScrollReveal>
        <div className="text-center mb-12">
          <div className="eyebrow text-[#1E90FF] mb-2">Membership</div>
          <h2 className="text-4xl md:text-5xl font-black text-white">Built for serious bettors.</h2>
        </div>
      </ScrollReveal>

      <div className="grid md:grid-cols-3 gap-5 max-w-5xl mx-auto">
        {packages.map((p, i) => (
          <ScrollReveal key={p.name} delay={i * 100}>
            <div className={`card-premium p-7 h-full flex flex-col relative ${p.popular ? "border-[#1E90FF]/50" : ""}`}>
              {p.popular && (
                <div className="absolute -top-2.5 left-6 px-2 py-0.5 text-[9px] font-black uppercase tracking-widest rounded bg-[#1E90FF] text-white">
                  Most Picked
                </div>
              )}
              <h3 className="text-lg font-bold text-white">{p.name}</h3>
              <div className="mt-4 flex items-baseline gap-1">
                <span className="text-4xl font-black text-white font-mono">{p.price}</span>
                <span className="text-slate-500 text-sm">{p.period}</span>
              </div>
              <ul className="mt-6 space-y-2.5 flex-1">
                {p.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm text-slate-300">
                    <Check className="h-4 w-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
              <button className={`mt-6 ${p.popular ? "btn-primary" : "btn-secondary"} w-full`}>
                Get started
              </button>
            </div>
          </ScrollReveal>
        ))}
      </div>

      <div className="mt-8 text-center">
        <Link to="/packages" className="text-sm font-semibold text-cyan-300 hover:text-white">
          Compare all plans →
        </Link>
      </div>
    </section>
  );
}

/* ------------------------------ TOOLS ------------------------------ */

const tools = [
  { icon: TrendingUp, name: "Simulation Engine", desc: "100k+ Monte Carlo sims per slate to surface +EV before lines move." },
  { icon: Radio, name: "Live Odds", desc: "Real-time odds across 20+ books with CLV benchmarking." },
  { icon: BarChart3, name: "Sharp Splits", desc: "Public vs sharp money tracking. Spot contrarian opportunity." },
  { icon: Flame, name: "Trend Detection", desc: "Algo-flagged trends on rest, weather, refs, and travel." },
];

function Tools() {
  return (
    <section className="container-x py-20" id="tools">
      <ScrollReveal>
        <div className="text-center mb-12">
          <div className="eyebrow text-[#1E90FF] mb-2">Data & Tools</div>
          <h2 className="text-4xl md:text-5xl font-black text-white">Beat the books with their own data.</h2>
        </div>
      </ScrollReveal>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
        {tools.map((t, i) => (
          <ScrollReveal key={t.name} delay={i * 80}>
            <div className="card-premium p-6 h-full">
              <div className="h-10 w-10 rounded-md bg-[#1E90FF]/15 border border-[#1E90FF]/30 flex items-center justify-center mb-4">
                <t.icon className="h-5 w-5 text-[#1E90FF]" />
              </div>
              <h3 className="text-base font-bold text-white">{t.name}</h3>
              <p className="text-sm text-slate-400 mt-2 leading-relaxed">{t.desc}</p>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}

/* --------------------------- TESTIMONIALS --------------------------- */

const reviews = [
  { name: "Jordan T.", role: "Member · 2 yrs", text: "The picks are graded openly — wins AND losses. That alone separates them from every other service." },
  { name: "Alex M.", role: "Member · 1 yr", text: "Up 62 units last quarter following the MLB board. Posting times are pre-line move, which matters." },
  { name: "Chris P.", role: "Member · 8 mo", text: "Discord community + transparent records. Feels like a sharp sportsbook, not a hype shop." },
];

function Testimonials() {
  return (
    <section className="container-x py-20">
      <ScrollReveal>
        <div className="text-center mb-12">
          <div className="eyebrow text-cyan-300 mb-2">Member Feedback</div>
          <h2 className="text-4xl md:text-5xl font-black text-white">No hype. Just receipts.</h2>
        </div>
      </ScrollReveal>

      <div className="grid md:grid-cols-3 gap-5">
        {reviews.map((r, i) => (
          <ScrollReveal key={r.name} delay={i * 100}>
            <div className="card-premium p-6 h-full flex flex-col">
              <div className="flex gap-0.5 mb-4">
                {Array.from({ length: 5 }).map((_, j) => (
                  <Star key={j} className="h-3.5 w-3.5 text-amber-300 fill-current" />
                ))}
              </div>
              <p className="text-sm text-slate-300 leading-relaxed flex-1">"{r.text}"</p>
              <div className="mt-5 pt-4 border-t border-white/5">
                <div className="text-sm font-bold text-white">{r.name}</div>
                <div className="text-[10px] uppercase tracking-widest text-slate-500 font-bold mt-0.5">{r.role}</div>
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}

/* ----------------------------- FINAL CTA ----------------------------- */

function FinalCta() {
  return (
    <section className="container-x py-20">
      <ScrollReveal>
        <div className="card-premium p-10 md:p-14 text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-px bg-[#1E90FF]/40" />
          <div className="eyebrow text-[#1E90FF] mb-3">Join the edge</div>
          <h2 className="text-4xl md:text-6xl font-black text-white max-w-3xl mx-auto leading-tight">
            Stop guessing. Start grading.
          </h2>
          <p className="mt-5 text-slate-400 max-w-xl mx-auto">
            Get verified picks across every major sport, posted before the line moves. Cancel anytime.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link to="/packages" className="btn-primary">
              Become a Member <ArrowRight className="h-4 w-4" />
            </Link>
            <Link to="/picks" className="btn-secondary">
              Browse free picks
            </Link>
          </div>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-500">
            <div className="flex items-center gap-2">
              <Trophy className="h-3.5 w-3.5 text-amber-300" />
              3-yr verified record
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
              Cancel anytime
            </div>
            <div className="flex items-center gap-2">
              <Activity className="h-3.5 w-3.5 text-cyan-300" />
              6 sports covered
            </div>
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
}
