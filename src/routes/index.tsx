import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowUpRight,
  Lock,
  ShieldCheck,
  Activity,
  Clock,
  Trophy,
} from "lucide-react";

import { ScrollReveal } from "@/components/ScrollReveal";
import { Counter } from "@/components/Counter";
import { MatchupLogos, type League } from "@/components/TeamLogo";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Sportshandicapper | Verified Picks & Sharp Analytics" },
      { name: "description", content: "Timestamped expert picks, verified records, and institutional sports analytics across MLB, NBA, NFL, NHL, CFB and CBB." },
      { property: "og:title", content: "Sportshandicapper | Verified Picks & Sharp Analytics" },
      { property: "og:description", content: "Timestamped expert picks, verified records, and live sharp analytics." },
    ],
  }),
  component: Home,
});

function Home() {
  return (
    <>
      <Ticker />
      <Masthead />
      <Hero />
      <RecordStrip />
      <LeadStory />
      <Leaderboard />
      <Packages />
      <FinalCta />
    </>
  );
}

/* ------------------------------ TICKER ------------------------------ */

const tickerItems = [
  { league: "MLB", text: "NYY -1.5 vs BOS", res: "WIN" },
  { league: "NBA", text: "BOS/MIA Over 218.5", res: "WIN" },
  { league: "NHL", text: "EDM ML vs LAK", res: "WIN" },
  { league: "NFL", text: "KC -3 vs LAC", res: "PEND" },
  { league: "CFB", text: "Georgia -7.5", res: "WIN" },
  { league: "MLB", text: "LAD/SD Under 8", res: "LOSS" },
  { league: "CBB", text: "Duke -4 vs UNC", res: "WIN" },
  { league: "NBA", text: "DEN ML vs PHX", res: "WIN" },
];

function Ticker() {
  const items = [...tickerItems, ...tickerItems];
  return (
    <div className="border-b border-white/10 bg-black/40 overflow-hidden">
      <div className="flex whitespace-nowrap py-3 marquee-text">
        {items.map((i, idx) => (
          <div key={idx} className="flex items-center gap-3 px-6 text-[11px] uppercase tracking-[0.18em] font-bold">
            <span className="text-slate-500">{i.league}</span>
            <span className="serif-italic text-slate-200 normal-case tracking-normal text-sm">{i.text}</span>
            <span className={i.res === "WIN" ? "text-emerald-300" : i.res === "LOSS" ? "text-rose-400" : "text-amber-300"}>{i.res}</span>
            <span className="text-slate-700">/</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ------------------------------ MASTHEAD ------------------------------ */

function Masthead() {
  const today = new Date().toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" });
  return (
    <div className="container-x pt-10">
      <div className="rule-double">
        <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.28em] font-bold text-slate-500 py-2">
          <span>Vol. III &middot; No. 24</span>
          <span className="hidden sm:block serif-italic normal-case tracking-normal text-slate-400 text-base">The Sportshandicapper Daily</span>
          <span>{today}</span>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------ HERO ------------------------------ */

function Hero() {
  return (
    <section className="container-x pt-14 pb-20">
      <div className="grid lg:grid-cols-12 gap-12 items-end">
        <ScrollReveal>
          <div className="lg:col-span-8">
            <div className="kicker kicker-rule text-emerald-300 mb-6">
              <span className="relative inline-flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 relative ping-soft" />
                Today&apos;s edition &middot; 12 picks filed
              </span>
            </div>
            <h1 className="serif-display text-[64px] md:text-[120px] text-white">
              Sharper picks.
              <br />
              <span className="serif-italic text-[#1E90FF]">Verified</span> records.
            </h1>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={120}>
          <div className="lg:col-span-4 lg:border-l lg:border-white/10 lg:pl-8">
            <p className="text-base text-slate-300 leading-relaxed drop-cap">
              We don&apos;t sell hype. Every pick is timestamped before the line moves, posted with reasoning, and graded after the final whistle. Coverage spans MLB, NBA, NFL, NHL, CFB, and CBB.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/packages" className="btn-primary">
                View Membership <ArrowUpRight className="h-4 w-4" />
              </Link>
              <Link to="/picks" className="btn-secondary">
                Today&apos;s Board
              </Link>
            </div>
          </div>
        </ScrollReveal>
      </div>

      <ScrollReveal delay={200}>
        <div className="mt-14 pt-6 border-t border-white/10 grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
          <div className="flex items-center gap-3 text-slate-400">
            <ShieldCheck className="h-4 w-4 text-emerald-400" />
            <span className="serif-italic text-slate-300">Third-party verified records</span>
          </div>
          <div className="flex items-center gap-3 text-slate-400">
            <Clock className="h-4 w-4 text-cyan-300" />
            <span className="serif-italic text-slate-300">Filed pre-market move</span>
          </div>
          <div className="flex items-center gap-3 text-slate-400">
            <Activity className="h-4 w-4 text-[#1E90FF]" />
            <span className="serif-italic text-slate-300">Graded transparently, win or lose</span>
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
}

/* --------------------------- RECORD STRIP --------------------------- */

function RecordStrip() {
  const records = [
    { label: "30-day hit", value: 67.4, suffix: "%", decimals: 1 },
    { label: "YTD units", value: 184, prefix: "+" },
    { label: "Win streak", value: 7, suffix: "W" },
    { label: "Return on investment", value: 12.8, suffix: "%", decimals: 1 },
  ];
  return (
    <section className="border-y border-white/10 bg-black/20">
      <div className="container-x py-12 grid grid-cols-2 md:grid-cols-4 divide-x divide-white/10">
        {records.map((r, i) => (
          <ScrollReveal key={r.label} delay={i * 80}>
            <div className="px-6 text-center">
              <div className="serif-display text-5xl md:text-6xl text-white">
                <Counter to={r.value} prefix={r.prefix} suffix={r.suffix} decimals={r.decimals} />
              </div>
              <div className="kicker mt-3 text-slate-500">{r.label}</div>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}

/* ---------------------------- LEAD STORY ---------------------------- */

const today = [
  { league: "MLB", time: "7:05 PM", a: "NYY", b: "BOS", pick: "NYY -1.5", conf: 92, units: 3, expert: "M. Rinner" },
  { league: "NBA", time: "8:00 PM", a: "BOS", b: "MIA", pick: "Over 218.5", conf: 88, units: 2, expert: "M. Davis" },
  { league: "NHL", time: "10:00 PM", a: "EDM", b: "LAK", pick: "EDM Puck Line", conf: 81, units: 2, expert: "K. Pratt" },
];

function LeadStory() {
  return (
    <section className="container-x py-24">
      <ScrollReveal>
        <div className="flex items-end justify-between gap-6 pb-8 border-b border-white/10">
          <div>
            <div className="kicker kicker-rule text-[#1E90FF]">Section 01 &middot; The Board</div>
            <h2 className="mt-4 serif-display text-5xl md:text-7xl text-white">
              Tonight&apos;s <span className="serif-italic text-[#1E90FF]">card</span>.
            </h2>
          </div>
          <Link to="/picks" className="hidden md:inline-flex items-center gap-2 text-sm text-slate-300 editorial-link group">
            View full board
            <ArrowUpRight className="h-4 w-4 text-[#1E90FF] group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>
      </ScrollReveal>

      <div className="mt-10 divide-y divide-white/10">
        {today.map((row, i) => (
          <ScrollReveal key={row.a} delay={i * 80}>
            <article className="grid grid-cols-12 gap-4 md:gap-8 py-8 group">
              <div className="col-span-2 md:col-span-1">
                <div className="section-no">No. {String(i + 1).padStart(2, "0")}</div>
                <div className="kicker text-[#1E90FF] mt-1">{row.league}</div>
              </div>
              <div className="col-span-10 md:col-span-6 min-w-0">
                <div className="text-[10px] uppercase tracking-[0.22em] font-bold text-slate-500 mb-2 font-mono">
                  {row.time}
                </div>
                <div className="flex items-center gap-3">
                  <MatchupLogos league={row.league as League} a={row.a} b={row.b} size={28} />
                  <h3 className="serif-display text-2xl md:text-3xl text-white group-hover:text-[#1E90FF] transition-colors">
                    {row.a} <span className="serif-italic text-slate-500">vs</span> {row.b}
                  </h3>
                </div>
                <div className="mt-3 text-sm text-slate-500 serif-italic flex items-center gap-2">
                  <Lock className="h-3 w-3" /> Selection reserved: {row.pick.replace(/./g, "•").slice(0, 6)}…
                </div>
              </div>
              <div className="hidden md:block md:col-span-3">
                <div className="kicker text-slate-500 mb-2">Confidence</div>
                <div className="flex items-center gap-3">
                  <div className="flex-1 h-px bg-white/10 relative">
                    <div className="absolute inset-y-0 left-0 bg-[#1E90FF]" style={{ width: `${row.conf}%`, height: "1px", top: "50%" }} />
                    <div className="absolute h-2 w-2 rounded-full bg-[#1E90FF]" style={{ left: `calc(${row.conf}% - 4px)`, top: "50%", marginTop: "-4px" }} />
                  </div>
                  <span className="font-mono text-sm font-bold text-white tabular-nums">{row.conf}</span>
                </div>
              </div>
              <div className="col-span-12 md:col-span-2 flex md:flex-col items-center md:items-end justify-between gap-2 md:text-right">
                <div>
                  <div className="kicker text-slate-500">Units</div>
                  <div className="serif-display text-3xl text-white mt-1">{row.units}</div>
                </div>
                <div className="text-[11px] uppercase tracking-[0.2em] text-slate-300 font-bold">{row.expert}</div>
              </div>
            </article>
          </ScrollReveal>
        ))}
      </div>

      <div className="mt-6 flex items-center justify-between">
        <span className="serif-italic text-slate-500 text-sm">Nine more picks behind the paywall.</span>
        <Link to="/picks" className="text-sm text-slate-300 editorial-link inline-flex items-center gap-2 group">
          Unlock the full board
          <ArrowUpRight className="h-3.5 w-3.5 text-[#1E90FF] group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" />
        </Link>
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
    <section className="container-x py-24 border-t border-white/10">
      <ScrollReveal>
        <div className="flex items-end justify-between gap-6 pb-8 border-b border-white/10">
          <div>
            <div className="kicker kicker-rule text-cyan-300">Section 02 &middot; The Desk</div>
            <h2 className="mt-4 serif-display text-5xl md:text-7xl text-white">
              Our verified <span className="serif-italic text-[#1E90FF]">handicappers</span>.
            </h2>
          </div>
        </div>
      </ScrollReveal>

      <div className="mt-10 grid md:grid-cols-3 gap-12 md:divide-x md:divide-white/10">
        {experts.map((e, i) => (
          <ScrollReveal key={e.name} delay={i * 100}>
            <div className="md:px-8 first:md:pl-0">
              <div className="flex items-baseline justify-between mb-5">
                <div className="section-no">No. {String(i + 1).padStart(2, "0")}</div>
                <div className="kicker text-[#1E90FF]">{e.sport}</div>
              </div>
              <h3 className="serif-display text-3xl md:text-4xl text-white">{e.name}</h3>
              <p className="mt-3 text-sm text-slate-400 serif-italic">
                Filed under the desk since &apos;23. Tracked publicly, win and loss.
              </p>
              <div className="mt-8 grid grid-cols-3 gap-4 border-t border-white/10 pt-5">
                <div>
                  <div className="kicker text-slate-500">W&middot;L</div>
                  <div className="font-mono font-bold text-white text-sm mt-2">{e.wl}</div>
                </div>
                <div>
                  <div className="kicker text-slate-500">Units</div>
                  <div className="font-mono font-bold text-emerald-300 text-sm mt-2">+{e.units}</div>
                </div>
                <div>
                  <div className="kicker text-slate-500">ROI</div>
                  <div className="font-mono font-bold text-cyan-300 text-sm mt-2">{e.roi}%</div>
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

const tiers = [
  { rank: "00", name: "Free Trial", price: "Free", period: "7 days", tag: "Start free", features: ["1 Week Access", "1 star Picks", "No card required"], cta: "Start Free", featured: false },
  { rank: "03", name: "Standard", price: "$99.99", period: "/ month", tag: "Most subscribed", features: ["1 Month Access", "1 to 4 star Picks", "Discord + alerts", "Whale plays preview"], cta: "Get Standard", featured: true },
  { rank: "07", name: "Whale", price: "$999.99", period: "/ year", tag: "Ultimate access", features: ["1 Year Access", "Every star tier unlocked", "10 star Whale picks", "1:1 strategy call"], cta: "Become a Whale", featured: false },
];

function Packages() {
  return (
    <section className="container-x py-24 border-t border-white/10" id="packages">
      <ScrollReveal>
        <div className="flex items-end justify-between gap-6 pb-8 border-b border-white/10">
          <div>
            <div className="kicker kicker-rule text-[#1E90FF]">Section 03 &middot; Subscribe</div>
            <h2 className="mt-4 serif-display text-5xl md:text-7xl text-white">
              Built for serious <span className="serif-italic text-[#1E90FF]">bettors</span>.
            </h2>
          </div>
          <p className="hidden md:block serif-italic text-slate-400 max-w-xs text-right">
            Try it free, run the season, or own the year.
          </p>
        </div>
      </ScrollReveal>

      <div className="mt-12 grid md:grid-cols-3 gap-px bg-white/10 border border-white/10">
        {tiers.map((t, i) => (
          <ScrollReveal key={t.name} delay={i * 80}>
            <div className={`h-full p-8 flex flex-col bg-[#060818] ${t.featured ? "lg:scale-[1.02] relative z-10 ring-1 ring-[#1E90FF]/40" : ""}`}>
              <div className="flex items-baseline justify-between mb-6">
                <div className="section-no">No. {t.rank}</div>
                <div className={`kicker ${t.featured ? "text-[#1E90FF]" : "text-slate-500"}`}>{t.tag}</div>
              </div>
              <h3 className="serif-display text-4xl text-white">{t.name}</h3>
              <div className="mt-5 flex items-baseline gap-2">
                <span className={`serif-display text-5xl ${t.price === "Free" ? "text-[#1E90FF]" : "text-white"}`}>{t.price}</span>
                <span className="kicker text-slate-500">{t.period}</span>
              </div>
              <div className="my-6 h-px bg-white/10" />
              <ul className="space-y-3 flex-1">
                {t.features.map((f) => (
                  <li key={f} className="flex items-start gap-3 text-sm text-slate-300">
                    <span className="serif-italic text-[#1E90FF] mt-0.5">&mdash;</span>
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <Link to="/packages" className={`mt-8 ${t.featured ? "btn-primary" : "btn-secondary"} w-full`}>
                {t.cta} <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>
          </ScrollReveal>
        ))}
      </div>

      <ScrollReveal delay={200}>
        <div className="mt-8 text-center">
          <Link to="/packages" className="text-sm text-slate-400 editorial-link inline-flex items-center gap-2 group">
            Compare all eight tiers
            <ArrowUpRight className="h-3.5 w-3.5 text-[#1E90FF] group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>
      </ScrollReveal>
    </section>
  );
}

/* ----------------------------- FINAL CTA ----------------------------- */

function FinalCta() {
  return (
    <section className="container-x py-28 border-t border-white/10">
      <ScrollReveal>
        <div className="grid lg:grid-cols-12 gap-12 items-end">
          <div className="lg:col-span-8">
            <div className="kicker kicker-rule text-[#1E90FF] mb-6">Closing column</div>
            <h2 className="serif-display text-6xl md:text-[110px] text-white">
              Stop guessing.
              <br />
              <span className="serif-italic text-[#1E90FF]">Start grading</span>.
            </h2>
            <p className="mt-8 text-base text-slate-400 max-w-md leading-relaxed serif-italic">
              Verified picks across every major sport, filed before the line moves. No hype, just receipts.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link to="/packages" className="btn-primary">
                Become a Member <ArrowUpRight className="h-4 w-4" />
              </Link>
              <Link to="/picks" className="btn-secondary">
                Browse free picks
              </Link>
            </div>
            <div className="mt-10 flex flex-wrap items-center gap-x-7 gap-y-3 text-xs text-slate-500">
              <div className="flex items-center gap-2"><Trophy className="h-3.5 w-3.5 text-amber-300" /> 3-yr verified record</div>
              <div className="flex items-center gap-2"><ShieldCheck className="h-3.5 w-3.5 text-emerald-400" /> Cancel anytime</div>
              <div className="flex items-center gap-2"><Activity className="h-3.5 w-3.5 text-cyan-300" /> 6 sports covered</div>
            </div>
          </div>

          <div className="lg:col-span-4 lg:border-l lg:border-white/10 lg:pl-10">
            <div className="space-y-8">
              {[
                { v: "67.4", s: "%", l: "30-day hit rate" },
                { v: "+184", s: "u", l: "YTD profit" },
                { v: "12.8", s: "%", l: "Return on investment" },
              ].map((s) => (
                <div key={s.l} className="flex items-baseline justify-between gap-4 pb-6 border-b border-white/10 last:border-0">
                  <div className="kicker text-slate-500 flex-1">{s.l}</div>
                  <div className="serif-display text-5xl text-white">
                    {s.v}<span className="text-2xl text-slate-500 ml-0.5">{s.s}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
}
