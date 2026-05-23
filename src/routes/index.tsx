import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight, Check, Star, Lock, TrendingUp, BarChart3, Radio, Flame, Trophy } from "lucide-react";
import { ScrollReveal } from "@/components/ScrollReveal";
import { Counter } from "@/components/Counter";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Sportshandicapper — Betting Intelligence At Scale" },
      { name: "description", content: "Institutional-grade sports analytics, predictive modeling, and live pick feeds built for professional handicappers." },
      { property: "og:title", content: "Sportshandicapper — Betting Intelligence At Scale" },
      { property: "og:description", content: "Pro sports analytics, predictive modeling, and live pick feeds." },
    ],
  }),
  component: Home,
});

function Home() {
  return (
    <>
      <Hero />
      <Articles />
      <ActivePicks />
      <TrustBar />
      <Packages />
      <DataTools />
      <About />
    </>
  );
}

function Hero() {
  return (
    <section className="container-x pt-6 pb-24">
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        <ScrollReveal>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-cyan-400/30 bg-cyan-400/5 mb-6">
            <span className="relative h-2 w-2 rounded-full bg-cyan-400 ping-soft" />
            <span className="text-[11px] uppercase tracking-widest font-semibold text-cyan-300">
              Live Edge Detection Active
            </span>
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight leading-[1.05]">
            <span className="gradient-text">Betting </span>
            <span className="gradient-text-vivid">Intelligence</span>
            <br />
            <span className="gradient-text">At Scale.</span>
          </h1>
          <p className="mt-6 text-lg text-slate-400 max-w-xl leading-relaxed">
            Institutional-grade sports analytics, predictive modeling, and live pick feeds built for
            professional handicappers. Don't play the house — use their data against them.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#join" className="btn-primary">
              Get Started Today <ArrowRight className="h-4 w-4" />
            </a>
            <a href="#tools" className="btn-secondary">Explore Models</a>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={200}>
          <ROISimulator />
        </ScrollReveal>
      </div>
    </section>
  );
}

function ROISimulator() {
  return (
    <div className="glass rounded-3xl p-6 md:p-8 relative overflow-hidden">
      <div className="absolute -top-20 -right-20 h-60 w-60 rounded-full bg-indigo-500/20 blur-3xl" />
      <div className="flex items-center justify-between mb-6 relative">
        <h3 className="text-xl font-bold text-white">ROI Simulator</h3>
        <span className="text-[10px] font-semibold uppercase tracking-widest px-2 py-1 rounded-md bg-white/10 text-slate-300">
          Pro Model v4.2
        </span>
      </div>

      <div className="space-y-5 relative">
        <ProgressBar label="Monthly Units Staked" value="450 Units" percent={65} />
        <ProgressBar label="Projected Win Rate" value="58.4%" percent={78} valueClass="text-cyan-300" />
      </div>

      <div className="mt-8 rounded-2xl border border-white/10 bg-black/30 p-6 text-center relative">
        <div className="eyebrow text-slate-400">Potential Monthly Profit</div>
        <div className="mt-2 text-5xl md:text-6xl font-extrabold tracking-tight text-white">
          $<Counter to={12480} decimals={2} />
        </div>
        <div className="mt-2 text-sm font-semibold text-indigo-300">+24.2% ROI PER SLIP</div>
      </div>

      <button className="mt-6 w-full py-3.5 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 text-sm font-bold uppercase tracking-widest text-slate-200 transition">
        Apply Strategy
      </button>
    </div>
  );
}

function ProgressBar({
  label, value, percent, valueClass = "text-white",
}: { label: string; value: string; percent: number; valueClass?: string }) {
  return (
    <div>
      <div className="flex justify-between text-sm mb-2">
        <span className="text-slate-400">{label}</span>
        <span className={`font-bold ${valueClass}`}>{value}</span>
      </div>
      <div className="h-2 rounded-full bg-white/5 overflow-hidden">
        <div
          className="h-full rounded-full bg-gradient-to-r from-[#1E90FF] to-[#22D3EE]"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}

const articles = [
  {
    tag: "MLB",
    title: "GAME PREVIEW: Texas Rangers vs. Colorado Rockies analysis, best bets",
    author: "Michael Rinner",
    date: "May 19, 2026",
    gradient: "from-rose-500 to-orange-500",
    initial: "M",
  },
  {
    tag: "NBA",
    title: "Cavaliers vs Knicks: Eastern Conference clash with playoff implications",
    author: "Mike Davis",
    date: "May 18, 2026",
    gradient: "from-purple-500 to-indigo-500",
    initial: "M",
  },
  {
    tag: "MLB",
    title: "Blue Jays vs Yankees: AL East rivalry sets up sharp value spots",
    author: "Michael Rinner",
    date: "May 17, 2026",
    gradient: "from-blue-500 to-cyan-500",
    initial: "M",
  },
];

function Articles() {
  return (
    <section className="container-x py-24">
      <ScrollReveal>
        <div className="flex items-end justify-between mb-10">
          <div>
            <div className="eyebrow text-indigo-300 mb-2">Editorial</div>
            <h2 className="text-4xl md:text-5xl font-extrabold gradient-text">
              Exclusive Articles and Analysis
            </h2>
          </div>
          <a href="#articles" className="text-sm font-semibold text-indigo-300 hover:text-white">
            All Articles →
          </a>
        </div>
      </ScrollReveal>

      <div className="grid lg:grid-cols-12 gap-6">
        <ScrollReveal className="lg:col-span-7" delay={100}>
          <ArticleCard article={articles[0]} large />
        </ScrollReveal>
        <div className="lg:col-span-5 grid gap-6">
          <ScrollReveal delay={200}><ArticleCard article={articles[1]} /></ScrollReveal>
          <ScrollReveal delay={300}><ArticleCard article={articles[2]} /></ScrollReveal>
        </div>
      </div>
    </section>
  );
}

function ArticleCard({ article, large = false }: { article: typeof articles[0]; large?: boolean }) {
  return (
    <article className="card-premium overflow-hidden group h-full flex flex-col">
      <div className={`relative ${large ? "h-72" : "h-40"} bg-gradient-to-br ${article.gradient} overflow-hidden`}>
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <span className="absolute top-4 left-4 px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest rounded-md bg-black/40 backdrop-blur-md text-white border border-white/20">
          {article.tag}
        </span>
      </div>
      <div className="p-6 flex-1 flex flex-col">
        <h3 className={`font-bold text-white ${large ? "text-2xl" : "text-base"} leading-snug flex-1`}>
          {article.title}
        </h3>
        <div className="mt-4 flex items-center gap-3">
          <div className={`h-8 w-8 rounded-full bg-gradient-to-br ${article.gradient} flex items-center justify-center text-white font-bold text-sm`}>
            {article.initial}
          </div>
          <div className="text-xs">
            <div className="text-slate-200 font-semibold">{article.author}</div>
            <div className="text-slate-500">{article.date}</div>
          </div>
        </div>
      </div>
    </article>
  );
}

const featuredPick = {
  matchup: "Texas Rangers vs Colorado Rockies",
  confidence: 94,
  edge: "8.2%",
  pick: "Rangers ML -118",
  venue: "Coors Field",
};

const sidePicks = [
  { match: "Blue Jays vs Yankees", conf: 93, stars: 10, label: "WHALE", tag: "MLB" },
  { match: "Cavaliers vs Knicks", conf: 76, stars: 5, label: "5★", tag: "NBA" },
  { match: "Braves vs Marlins", conf: 78, stars: 5, label: "5★", tag: "MLB" },
];

function ActivePicks() {
  return (
    <section className="container-x py-24">
      <ScrollReveal>
        <div className="flex items-end justify-between mb-10">
          <div>
            <div className="eyebrow text-emerald-300 mb-2 flex items-center gap-2">
              <span className="relative h-2 w-2 rounded-full bg-emerald-400 ping-soft" /> Live
            </div>
            <h2 className="text-4xl md:text-5xl font-extrabold gradient-text">Active Picks</h2>
            <p className="text-slate-400 mt-2">Current picks — login to see full details</p>
          </div>
          <a href="/picks" className="text-sm font-semibold text-indigo-300 hover:text-white">
            View All Picks →
          </a>
        </div>
      </ScrollReveal>

      <div className="grid lg:grid-cols-12 gap-6">
        <ScrollReveal className="lg:col-span-7" delay={100}>
          <div className="card-premium p-8 relative overflow-hidden h-full">
            <div className="absolute -top-20 -right-20 h-60 w-60 rounded-full bg-purple-500/20 blur-3xl" />
            <div className="flex items-center gap-2 mb-4">
              <span className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest rounded-md bg-gradient-to-r from-purple-500 to-pink-500 text-white">
                ★10 Whale
              </span>
              <span className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest rounded-md bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" /> Live · Started
              </span>
              <span className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest rounded-md bg-white/5 text-slate-300 border border-white/10">
                MLB
              </span>
            </div>
            <h3 className="text-3xl font-extrabold text-white">{featuredPick.matchup}</h3>
            <p className="text-slate-500 text-sm mt-1">{featuredPick.venue}</p>

            <div className="mt-6 grid grid-cols-2 gap-4">
              <div className="rounded-2xl border border-white/10 bg-black/30 p-4">
                <div className="eyebrow">Confidence</div>
                <div className="text-3xl font-bold text-white mt-1">{featuredPick.confidence}%</div>
                <div className="mt-2 h-1.5 rounded-full bg-white/5 overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-[#1E90FF] to-[#22D3EE]" style={{ width: `${featuredPick.confidence}%` }} />
                </div>
              </div>
              <div className="rounded-2xl border border-white/10 bg-black/30 p-4">
                <div className="eyebrow">+EV Edge</div>
                <div className="text-3xl font-bold text-emerald-400 mt-1">+{featuredPick.edge}</div>
                <div className="text-xs text-slate-500 mt-3">Pre-line snapshot</div>
              </div>
            </div>

            <div className="mt-6 rounded-2xl bg-white/[0.03] border border-white/10 p-4 flex items-center justify-between">
              <div>
                <div className="eyebrow">Pick</div>
                <div className="text-lg font-bold text-white mt-1">{featuredPick.pick}</div>
              </div>
              <Lock className="h-5 w-5 text-slate-500" />
            </div>

            <div className="mt-6 flex gap-3">
              <button className="btn-primary flex-1">Unlock Whale Pick <ArrowRight className="h-4 w-4" /></button>
              <button className="btn-secondary">Details</button>
            </div>
          </div>
        </ScrollReveal>

        <div className="lg:col-span-5 grid gap-6">
          {sidePicks.map((p, i) => (
            <ScrollReveal key={p.match} delay={200 + i * 80}>
              <div className="card-premium p-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest rounded bg-white/5 border border-white/10 text-slate-300">
                    {p.tag}
                  </span>
                  <span className="px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest rounded bg-gradient-to-r from-purple-500/30 to-pink-500/30 text-purple-200 border border-purple-400/30">
                    {p.label}
                  </span>
                </div>
                <h4 className="text-lg font-bold text-white">{p.match}</h4>
                <div className="mt-4 flex items-center justify-between text-sm">
                  <div className="flex items-center gap-1 text-yellow-400">
                    {Array.from({ length: Math.min(p.stars, 5) }).map((_, j) => (
                      <Star key={j} className="h-3.5 w-3.5 fill-current" />
                    ))}
                  </div>
                  <div className="text-cyan-300 font-bold">{p.conf}% conf</div>
                </div>
                <div className="mt-3 h-1.5 rounded-full bg-white/5 overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-[#1E90FF] to-[#A855F7]" style={{ width: `${p.conf}%` }} />
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function TrustBar() {
  const stats: { value: number; suffix?: string; prefix?: string; decimals?: number; label: string }[] = [
    { value: 1248, suffix: "+", label: "Total Units Won" },
    { value: 3, suffix: " yrs", label: "Verified Track Record" },
    { value: 6, label: "Sports Covered" },
    { value: 62.4, suffix: "%", decimals: 1, label: "Win Rate" },
  ];
  return (
    <section className="border-y border-white/10 bg-white/[0.015] backdrop-blur-sm">
      <div className="container-x py-12 grid grid-cols-2 md:grid-cols-4 gap-8">
        {stats.map((s, i) => (
          <ScrollReveal key={s.label} delay={i * 100}>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-extrabold gradient-text-vivid">
                <Counter to={s.value} suffix={s.suffix} prefix={s.prefix} decimals={s.decimals} />
              </div>
              <div className="mt-2 text-xs uppercase tracking-widest font-semibold text-slate-400">
                {s.label}
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}

const packages = [
  { name: "7 Days Access", price: "FREE", period: "trial", tag: "Try it out", features: ["3 sports", "5 picks/day", "Basic analytics", "Email support"], cta: "Start Free" },
  { name: "1 Week Access", price: "$24.99", period: "/ week", tag: "Quick test", features: ["All sports", "Full pick feed", "Confidence ratings", "Email + chat"] },
  { name: "2 Weeks Access", price: "$49.99", period: "/ 2 weeks", tag: "Sharper edge", features: ["All sports", "Whale picks", "Live odds", "Priority chat"] },
  { name: "1 Month Access", price: "$99.99", period: "/ month", tag: "Most Popular", popular: true, features: ["Everything in 2 Wks", "ROI simulator", "Trend reports", "Pro Discord"] },
  { name: "3 Months Access", price: "$199.99", period: "/ quarter", tag: "Save 33%", features: ["Everything in 1 Mo", "Locked-line tracking", "1:1 strategy call", "Beta access"] },
  { name: "6 Months Access", price: "$299.99", period: "/ 6 months", tag: "Best value", features: ["Everything in 3 Mo", "Bankroll planning", "Private model alerts", "Concierge support"] },
];

function Packages() {
  return (
    <section className="container-x py-24" id="packages">
      <ScrollReveal>
        <div className="text-center mb-12">
          <div className="eyebrow text-indigo-300 mb-2">Pricing</div>
          <h2 className="text-4xl md:text-5xl font-extrabold gradient-text">Membership Packages</h2>
          <p className="text-slate-400 mt-3">Start free. Upgrade anytime. Cancel anytime.</p>
        </div>
      </ScrollReveal>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {packages.map((p, i) => (
          <ScrollReveal key={p.name} delay={i * 80}>
            <div className={`card-premium p-7 h-full flex flex-col relative ${p.popular ? "ring-2 ring-indigo-400/50" : ""}`}>
              {p.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 text-[10px] font-bold uppercase tracking-widest rounded-full bg-gradient-to-r from-[#1E90FF] to-[#A855F7] text-white shadow-lg">
                  Most Popular
                </div>
              )}
              <div className="eyebrow text-indigo-300">{p.tag}</div>
              <h3 className="text-xl font-bold text-white mt-2">{p.name}</h3>
              <div className="mt-4 flex items-baseline gap-1">
                <span className="text-4xl font-extrabold text-white">{p.price}</span>
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
                {p.cta ?? "Choose plan"}
              </button>
            </div>
          </ScrollReveal>
        ))}
      </div>

      <div className="mt-8 text-center">
        <a href="/packages" className="text-sm font-semibold text-indigo-300 hover:text-white">
          View all packages & pricing →
        </a>
      </div>
    </section>
  );
}

const tools = [
  { icon: TrendingUp, name: "Simulation Model", desc: "Monte Carlo engine running 100k+ sims per slate to surface +EV plays before lines move." },
  { icon: Radio, name: "Live Odds", desc: "Real-time sportsbook odds across 20+ books with closing-line value benchmarking." },
  { icon: BarChart3, name: "Consensus Data", desc: "Public vs sharp money splits. Spot contrarian opportunities the books fear most." },
  { icon: Flame, name: "Hot Trends", desc: "Algorithmic trend detection across teams, weather, refs, and rest situations." },
];

function DataTools() {
  return (
    <section className="container-x py-24" id="tools">
      <ScrollReveal>
        <div className="text-center mb-12">
          <div className="eyebrow text-indigo-300 mb-2">Data & Tools</div>
          <h2 className="text-4xl md:text-5xl font-extrabold gradient-text">
            Everything you need to beat the books.
          </h2>
        </div>
      </ScrollReveal>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {tools.map((t, i) => (
          <ScrollReveal key={t.name} delay={i * 100}>
            <div className="card-premium p-6 h-full">
              <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-[#1E90FF] to-[#A855F7] flex items-center justify-center mb-4">
                <t.icon className="h-6 w-6 text-white" />
              </div>
              <div className="flex items-center gap-2 mb-2">
                <h3 className="text-lg font-bold text-white">{t.name}</h3>
                <span className="text-[10px] font-semibold uppercase tracking-wider px-1.5 py-0.5 rounded bg-white/10 text-slate-400">
                  Soon
                </span>
              </div>
              <p className="text-sm text-slate-400 leading-relaxed">{t.desc}</p>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}

function About() {
  return (
    <section className="container-x py-24" id="about">
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        <ScrollReveal>
          <div className="eyebrow text-indigo-300 mb-3">About Us</div>
          <h2 className="text-4xl md:text-5xl font-extrabold gradient-text leading-tight">
            Built by bettors. Powered by simulation.
          </h2>
          <p className="mt-6 text-slate-400 leading-relaxed">
            We're not influencers. We're handicappers and data engineers who got tired of watered-down
            "expert picks." Every play we post runs through our simulation model first, gets timestamped
            before lines move, and is graded after the final whistle — transparently.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#join" className="btn-primary">Join the edge <ArrowRight className="h-4 w-4" /></a>
            <a href="#picks" className="btn-secondary">See today's picks</a>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={200}>
          <div className="card-premium p-8">
            <div className="grid grid-cols-2 gap-6">
              <Stat icon={Trophy} value={62.4} suffix="%" decimals={1} label="Win Rate" />
              <Stat value={1248} prefix="+" suffix="u" label="Profit (Units)" />
              <Stat value={3} suffix=" yrs" label="Verified" />
              <Stat value={6} label="Sports Covered" />
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

function Stat({
  icon: Icon, value, prefix, suffix, decimals, label,
}: { icon?: typeof Trophy; value: number; prefix?: string; suffix?: string; decimals?: number; label: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-black/30 p-5">
      {Icon && <Icon className="h-5 w-5 text-cyan-300 mb-2" />}
      <div className="text-3xl font-extrabold gradient-text-vivid">
        <Counter to={value} prefix={prefix} suffix={suffix} decimals={decimals} />
      </div>
      <div className="text-xs uppercase tracking-widest text-slate-500 mt-1">{label}</div>
    </div>
  );
}
