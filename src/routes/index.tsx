import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight, Lock, ShieldCheck, Activity, TrendingUp, TrendingDown, Minus, Zap } from "lucide-react";

import { ScrollReveal } from "@/components/ScrollReveal";
import { MatchupLogos, type League } from "@/components/TeamLogo";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Sportshandicapper | Live Betting Terminal" },
      { name: "description", content: "Live odds, verified picks, sharp money flow, and institutional sports analytics across all major US leagues." },
      { property: "og:title", content: "Sportshandicapper | Live Betting Terminal" },
      { property: "og:description", content: "Live odds, verified picks, and sharp analytics." },
    ],
  }),
  component: Home,
});

function Home() {
  return (
    <div className="terminal-grid">
      <Tape />
      <CommandBar />
      <Hero />
      <Board />
      <Metrics />
      <Desk />
      <PackagesStrip />
      <FinalBar />
    </div>
  );
}

/* ------------------------------ TAPE ------------------------------ */

const tape = [
  { lg: "MLB", sym: "NYY/BOS", line: "-1.5", px: -110, mv: +5, res: "W" },
  { lg: "NBA", sym: "BOS/MIA", line: "O 218.5", px: -108, mv: -3, res: "W" },
  { lg: "NHL", sym: "EDM/LAK", line: "ML", px: -135, mv: +12, res: "W" },
  { lg: "NFL", sym: "KC/LAC", line: "-3", px: -110, mv: 0, res: "P" },
  { lg: "CFB", sym: "UGA/AUB", line: "-7.5", px: -115, mv: +4, res: "W" },
  { lg: "MLB", sym: "LAD/SD", line: "U 8", px: -105, mv: -2, res: "L" },
  { lg: "CBB", sym: "DUKE/UNC", line: "-4", px: -110, mv: +6, res: "W" },
  { lg: "NBA", sym: "DEN/PHX", line: "ML", px: -160, mv: +8, res: "W" },
];

function Tape() {
  const items = [...tape, ...tape];
  return (
    <div className="border-y border-white/10 bg-black/60 overflow-hidden">
      <div className="flex items-center gap-2 px-4 py-2.5 border-b border-white/10 bg-[#05070F]">
        <span className="label-mono text-emerald-300 inline-flex items-center gap-2">
          <span className="led-dot bg-emerald-400 text-emerald-400 live-blink" />
          LIVE TAPE
        </span>
        <span className="label-mono text-slate-600">/ MARKET</span>
        <span className="ml-auto label-mono text-slate-600">DELAYED 15S</span>
      </div>
      <div className="flex whitespace-nowrap py-2.5 marquee-text">
        {items.map((i, idx) => {
          const dir = i.mv > 0 ? "tape-up" : i.mv < 0 ? "tape-down" : "tape-flat";
          const Icon = i.mv > 0 ? TrendingUp : i.mv < 0 ? TrendingDown : Minus;
          return (
            <div key={idx} className="flex items-center gap-2.5 px-5 font-mono-num text-[11px]">
              <span className="label-mono">{i.lg}</span>
              <span className="text-slate-200 font-semibold">{i.sym}</span>
              <span className="text-slate-400">{i.line}</span>
              <span className="text-slate-500">{i.px > 0 ? `+${i.px}` : i.px}</span>
              <span className={`${dir} inline-flex items-center gap-1`}>
                <Icon className="h-3 w-3" />
                {i.mv > 0 ? `+${i.mv}` : i.mv}
              </span>
              <span className={`text-[10px] font-bold ${i.res === "W" ? "tape-up" : i.res === "L" ? "tape-down" : "text-amber-300"}`}>{i.res}</span>
              <span className="text-slate-800">|</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ------------------------------ COMMAND BAR ------------------------------ */

function CommandBar() {
  const now = new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: false });
  const date = new Date().toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" }).toUpperCase();
  return (
    <div className="container-x">
      <div className="flex items-center justify-between border-b border-white/5 py-3 text-[10px] font-mono-num tracking-[0.2em] uppercase">
        <div className="flex items-center gap-4 text-slate-500">
          <span>SESSION / {date}</span>
          <span className="text-slate-700">·</span>
          <span>USR / GUEST</span>
          <span className="text-slate-700">·</span>
          <span className="text-slate-400">DESK / NYC</span>
        </div>
        <div className="flex items-center gap-4 text-slate-500">
          <span className="inline-flex items-center gap-2 text-emerald-300">
            <span className="led-dot bg-emerald-400 text-emerald-400" /> ONLINE
          </span>
          <span>{now} ET</span>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------ HERO ------------------------------ */

function Hero() {
  return (
    <section className="container-x pt-16 pb-12">
      <div className="grid lg:grid-cols-12 gap-10">
        <ScrollReveal>
          <div className="lg:col-span-8">
            <div className="flex items-center gap-2 mb-6">
              <span className="chip-mono is-active">
                <span className="led-dot bg-emerald-400 text-emerald-400 live-blink" />
                MARKET OPEN
              </span>
              <span className="label-mono">12 PICKS FILED · 6 LEAGUES</span>
            </div>
            <h1 className="font-mono-num text-white text-[56px] md:text-[96px] leading-[0.95] font-bold tracking-tight">
              SHARP MONEY,<br />
              <span className="text-[#1E90FF]">EXECUTED.</span>
            </h1>
            <p className="mt-8 text-slate-400 text-base max-w-xl leading-relaxed">
              Institutional-grade pick feed across NBA, NFL, MLB, NHL, CFB, and CBB. Every selection timestamped before the line moves and graded after the final whistle.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/packages" className="btn-primary">
                Open Account <ArrowUpRight className="h-4 w-4" />
              </Link>
              <Link to="/picks" className="btn-secondary">
                View Live Board
              </Link>
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={120}>
          <div className="lg:col-span-4 grid grid-cols-2 gap-3">
            <StatTile label="30D HIT" value="67.4" suffix="%" up />
            <StatTile label="YTD UNITS" value="+184.3" up />
            <StatTile label="ROI" value="12.8" suffix="%" up />
            <StatTile label="STREAK" value="7W" up />
            <div className="col-span-2 terminal-panel rounded-sm p-4">
              <div className="label-mono mb-3">CONFIDENCE INDEX</div>
              <div className="bar-track">
                <div className="bar-fill" style={{ width: "82%" }} />
              </div>
              <div className="flex items-center justify-between mt-2 font-mono-num text-[11px]">
                <span className="text-slate-500">LOW</span>
                <span className="text-white font-bold">82 / 100</span>
                <span className="text-slate-500">MAX</span>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

function StatTile({ label, value, suffix, up }: { label: string; value: string; suffix?: string; up?: boolean }) {
  return (
    <div className="terminal-panel rounded-sm p-4">
      <div className="flex items-center justify-between mb-2">
        <span className="label-mono">{label}</span>
        {up ? <TrendingUp className="h-3 w-3 text-emerald-300" /> : <TrendingDown className="h-3 w-3 text-rose-400" />}
      </div>
      <div className="font-mono-num text-3xl text-white font-bold">
        {value}<span className="text-slate-500 text-xl ml-0.5">{suffix}</span>
      </div>
    </div>
  );
}

/* ------------------------------ BOARD ------------------------------ */

const board = [
  { lg: "MLB", time: "19:05", a: "NYY", b: "BOS", pick: "NYY -1.5", conf: 92, units: 3, expert: "M.RINNER", move: +5 },
  { lg: "NBA", time: "20:00", a: "BOS", b: "MIA", pick: "OVER 218.5", conf: 88, units: 2, expert: "M.DAVIS", move: -3 },
  { lg: "NHL", time: "22:00", a: "EDM", b: "LAK", pick: "EDM PL", conf: 81, units: 2, expert: "K.PRATT", move: +12 },
  { lg: "NFL", time: "20:20", a: "KC", b: "LAC", pick: "KC -3", conf: 76, units: 2, expert: "M.DAVIS", move: 0 },
  { lg: "CFB", time: "15:30", a: "UGA", b: "AUB", pick: "UGA -7.5", conf: 79, units: 2, expert: "D.WILSON", move: +4 },
];

function Board() {
  return (
    <section className="container-x py-12">
      <ScrollReveal>
        <div className="terminal-panel rounded-sm">
          <div className="terminal-panel-header">
            <div className="flex items-center gap-3">
              <span className="led-dot bg-emerald-400 text-emerald-400 live-blink" />
              <span className="text-white">LIVE BOARD</span>
              <span className="text-slate-600">/ TODAYS CARD</span>
            </div>
            <Link to="/picks" className="text-cyan-300 hover:text-white inline-flex items-center gap-1.5">
              FULL BOARD <ArrowUpRight className="h-3 w-3" />
            </Link>
          </div>

          <div className="grid grid-cols-[60px_60px_1fr_120px_180px_80px_80px] gap-3 px-4 py-3 border-b border-white/10 label-mono">
            <span>LG</span>
            <span>TIME</span>
            <span>MATCHUP</span>
            <span>SELECTION</span>
            <span>CONFIDENCE</span>
            <span className="text-right">UNITS</span>
            <span className="text-right">MV</span>
          </div>

          <div>
            {board.map((r, i) => (
              <div key={i} className="terminal-row grid grid-cols-[60px_60px_1fr_120px_180px_80px_80px] gap-3 px-4 py-4 items-center">
                <span className="font-mono-num text-[11px] text-[#1E90FF] font-bold">{r.lg}</span>
                <span className="font-mono-num text-[11px] text-slate-400">{r.time}</span>
                <div className="flex items-center gap-2.5 min-w-0">
                  <MatchupLogos league={r.lg as League} a={r.a} b={r.b} size={22} />
                  <span className="font-mono-num text-sm text-white font-semibold truncate">{r.a} <span className="text-slate-600">@</span> {r.b}</span>
                </div>
                {i < 2 ? (
                  <span className="font-mono-num text-[11px] text-slate-600 inline-flex items-center gap-1.5">
                    <Lock className="h-3 w-3" /> ████████
                  </span>
                ) : (
                  <span className="font-mono-num text-[11px] text-cyan-300 font-bold">{r.pick}</span>
                )}
                <div className="flex items-center gap-2">
                  <div className="bar-track flex-1">
                    <div className="bar-fill" style={{ width: `${r.conf}%` }} />
                  </div>
                  <span className="font-mono-num text-[11px] text-white font-bold w-7 text-right">{r.conf}</span>
                </div>
                <span className="font-mono-num text-sm text-white font-bold text-right">{r.units}.0</span>
                <span className={`font-mono-num text-[11px] text-right ${r.move > 0 ? "tape-up" : r.move < 0 ? "tape-down" : "tape-flat"}`}>
                  {r.move > 0 ? `+${r.move}` : r.move}
                </span>
              </div>
            ))}
          </div>

          <div className="px-4 py-3 border-t border-white/10 flex items-center justify-between label-mono">
            <span>SHOWING 5 / 14 · SUBSCRIBE TO UNLOCK</span>
            <Link to="/packages" className="text-cyan-300 hover:text-white">UNLOCK FULL FEED →</Link>
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
}

/* ------------------------------ METRICS ------------------------------ */

function Metrics() {
  const data = [
    { lg: "MLB", w: 78, l: 41, units: 64.2, roi: 14.1 },
    { lg: "NBA", w: 52, l: 33, units: 38.7, roi: 11.8 },
    { lg: "NFL", w: 31, l: 19, units: 28.4, roi: 16.2 },
    { lg: "NHL", w: 44, l: 28, units: 22.9, roi: 9.6 },
    { lg: "CFB", w: 27, l: 18, units: 19.1, roi: 12.4 },
    { lg: "CBB", w: 35, l: 22, units: 11.0, roi: 8.3 },
  ];
  return (
    <section className="container-x py-12">
      <ScrollReveal>
        <div className="grid lg:grid-cols-[1fr_auto] gap-6 items-end mb-6">
          <div>
            <div className="label-mono mb-3 text-cyan-300">// 02 PERFORMANCE / BY LEAGUE</div>
            <h2 className="font-mono-num text-white text-4xl md:text-5xl font-bold">YEAR TO DATE</h2>
          </div>
          <span className="label-mono">UPDATED 14:32:08 ET</span>
        </div>

        <div className="terminal-panel rounded-sm overflow-x-auto">
          <div className="grid grid-cols-[80px_1fr_120px_120px_120px] gap-3 px-4 py-3 border-b border-white/10 label-mono min-w-[560px]">
            <span>LG</span><span>WIN RATE</span><span className="text-right">W·L</span><span className="text-right">UNITS</span><span className="text-right">ROI</span>
          </div>
          {data.map((d) => {
            const wr = (d.w / (d.w + d.l)) * 100;
            return (
              <div key={d.lg} className="terminal-row grid grid-cols-[80px_1fr_120px_120px_120px] gap-3 px-4 py-3.5 items-center min-w-[560px]">
                <span className="font-mono-num text-[#1E90FF] font-bold text-sm">{d.lg}</span>
                <div className="flex items-center gap-3">
                  <div className="bar-track flex-1 max-w-[280px]">
                    <div className="bar-fill" style={{ width: `${wr}%` }} />
                  </div>
                  <span className="font-mono-num text-xs text-white font-bold w-12">{wr.toFixed(1)}%</span>
                </div>
                <span className="font-mono-num text-xs text-slate-300 text-right">{d.w}-{d.l}</span>
                <span className="font-mono-num text-xs text-emerald-300 text-right font-bold">+{d.units.toFixed(1)}</span>
                <span className="font-mono-num text-xs text-cyan-300 text-right font-bold">{d.roi.toFixed(1)}%</span>
              </div>
            );
          })}
        </div>
      </ScrollReveal>
    </section>
  );
}

/* ------------------------------ DESK ------------------------------ */

const experts = [
  { name: "MICHAEL RINNER", id: "MRN-001", sport: "MLB · NHL", wl: "128-74", units: 184.3, roi: 18.2 },
  { name: "MIKE DAVIS", id: "MDV-002", sport: "NBA · CBB", wl: "94-58", units: 142.7, roi: 14.6 },
  { name: "KYLE PRATT", id: "KPR-003", sport: "NHL · NFL", wl: "76-49", units: 98.4, roi: 11.9 },
];

function Desk() {
  return (
    <section className="container-x py-12">
      <ScrollReveal>
        <div className="label-mono mb-3 text-cyan-300">// 03 THE DESK / VERIFIED HANDICAPPERS</div>
        <h2 className="font-mono-num text-white text-4xl md:text-5xl font-bold mb-8">ACTIVE TRADERS</h2>
        <div className="grid md:grid-cols-3 gap-3">
          {experts.map((e) => (
            <div key={e.id} className="terminal-panel rounded-sm p-5">
              <div className="flex items-center justify-between mb-4">
                <span className="label-mono text-emerald-300 inline-flex items-center gap-2">
                  <span className="led-dot bg-emerald-400 text-emerald-400" /> ACTIVE
                </span>
                <span className="label-mono">{e.id}</span>
              </div>
              <div className="font-mono-num text-white text-lg font-bold tracking-tight">{e.name}</div>
              <div className="label-mono text-[#1E90FF] mt-1">{e.sport}</div>
              <div className="mt-5 pt-4 border-t border-white/10 grid grid-cols-3 gap-2">
                <Stat label="W·L" value={e.wl} />
                <Stat label="UNITS" value={`+${e.units}`} accent="emerald" />
                <Stat label="ROI" value={`${e.roi}%`} accent="cyan" />
              </div>
            </div>
          ))}
        </div>
      </ScrollReveal>
    </section>
  );
}

function Stat({ label, value, accent }: { label: string; value: string; accent?: "emerald" | "cyan" }) {
  const c = accent === "emerald" ? "text-emerald-300" : accent === "cyan" ? "text-cyan-300" : "text-white";
  return (
    <div>
      <div className="label-mono">{label}</div>
      <div className={`font-mono-num text-sm font-bold mt-1 ${c}`}>{value}</div>
    </div>
  );
}

/* ------------------------------ PACKAGES ------------------------------ */

const tiers = [
  { code: "TRIAL-00", name: "FREE TRIAL", price: "0.00", period: "7D", features: ["1 WEEK ACCESS", "1★ PICKS", "NO CARD"], cta: "INITIATE", featured: false },
  { code: "STD-03", name: "STANDARD", price: "99.99", period: "MO", features: ["30D ACCESS", "1-4★ PICKS", "DISCORD + ALERTS", "WHALE PREVIEW"], cta: "DEPLOY", featured: true },
  { code: "WHL-07", name: "WHALE", price: "999.99", period: "YR", features: ["365D ACCESS", "ALL TIERS", "10★ WHALE PICKS", "1:1 STRATEGY"], cta: "ESCALATE", featured: false },
];

function PackagesStrip() {
  return (
    <section className="container-x py-12">
      <ScrollReveal>
        <div className="label-mono mb-3 text-cyan-300">// 04 SUBSCRIPTIONS</div>
        <h2 className="font-mono-num text-white text-4xl md:text-5xl font-bold mb-8">ACCESS TIERS</h2>
        <div className="grid md:grid-cols-3 gap-3">
          {tiers.map((t) => (
            <div key={t.code} className={`terminal-panel rounded-sm p-5 ${t.featured ? "ring-1 ring-[#1E90FF]/60 relative" : ""}`}>
              {t.featured && (
                <div className="absolute -top-px left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#1E90FF] to-transparent" />
              )}
              <div className="flex items-center justify-between mb-3">
                <span className="label-mono">{t.code}</span>
                {t.featured && <span className="chip-mono is-active"><Zap className="h-3 w-3" /> POPULAR</span>}
              </div>
              <div className="font-mono-num text-2xl text-white font-bold">{t.name}</div>
              <div className="mt-4 flex items-baseline gap-2">
                <span className="font-mono-num text-5xl text-white font-bold">${t.price}</span>
                <span className="label-mono">/ {t.period}</span>
              </div>
              <div className="my-5 h-px bg-white/10" />
              <ul className="space-y-2 mb-6">
                {t.features.map((f) => (
                  <li key={f} className="font-mono-num text-[11px] text-slate-300 flex items-center gap-2">
                    <span className="text-[#1E90FF]">▸</span> {f}
                  </li>
                ))}
              </ul>
              <Link to="/packages" className={`${t.featured ? "btn-primary" : "btn-secondary"} w-full !rounded-sm font-mono-num text-xs tracking-[0.18em]`}>
                {t.cta}
              </Link>
            </div>
          ))}
        </div>
      </ScrollReveal>
    </section>
  );
}

/* ------------------------------ FINAL ------------------------------ */

function FinalBar() {
  return (
    <section className="container-x py-16">
      <ScrollReveal>
        <div className="terminal-panel rounded-sm p-8 md:p-12 relative overflow-hidden">
          <div className="absolute inset-0 scanline opacity-50 pointer-events-none" />
          <div className="relative grid lg:grid-cols-[1fr_auto] gap-10 items-end">
            <div>
              <div className="label-mono text-cyan-300 mb-4">// EXECUTE</div>
              <h2 className="font-mono-num text-white text-4xl md:text-6xl font-bold leading-[0.95]">
                STOP GUESSING.<br />
                <span className="text-[#1E90FF]">START GRADING.</span>
              </h2>
              <p className="mt-6 text-slate-400 max-w-lg">
                Receipts beat hype. Every pick public, every grade audited, every unit accounted for.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link to="/packages" className="btn-primary">
                  Open Account <ArrowUpRight className="h-4 w-4" />
                </Link>
                <Link to="/picks" className="btn-secondary">Free Board</Link>
              </div>
            </div>
            <div className="grid grid-cols-3 lg:grid-cols-1 gap-3 lg:gap-2 text-xs">
              <Trust icon={<ShieldCheck className="h-4 w-4 text-emerald-300" />} label="3-YR VERIFIED RECORD" />
              <Trust icon={<Activity className="h-4 w-4 text-cyan-300" />} label="6 LEAGUES COVERED" />
              <Trust icon={<Lock className="h-4 w-4 text-[#1E90FF]" />} label="CANCEL ANYTIME" />
            </div>
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
}

function Trust({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <div className="flex items-center gap-2 px-3 py-2 border border-white/10 rounded-sm bg-white/[0.02]">
      {icon}
      <span className="label-mono text-slate-300">{label}</span>
    </div>
  );
}
