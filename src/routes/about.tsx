import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  ShieldCheck,
  TrendingUp,
  Trophy,
  Activity,
  Target,
  Radio,
  Cpu,
  LineChart,
  Lock,
  Sparkles,
} from "lucide-react";
import { ScrollReveal } from "@/components/ScrollReveal";
import { Counter } from "@/components/Counter";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Sportshandicapper | Pro Sports Betting Intelligence" },
      {
        name: "description",
        content:
          "Inside Sportshandicapper. Institutional-grade simulations, verified records, and a team of expert handicappers across MLB, NBA, NFL, NHL and more.",
      },
      { property: "og:title", content: "About Sportshandicapper" },
      {
        property: "og:description",
        content:
          "Sharp analytics, verified picks, and a team of pros committed to your bankroll.",
      },
    ],
  }),
  component: AboutPage,
});

const leagues = ["NFL", "NBA", "MLB", "NHL", "CFB", "CBB", "PGA", "XFL"];

const pillars = [
  {
    icon: Cpu,
    title: "Simulation Engine",
    body: "Every game runs through 10,000+ Monte Carlo simulations. Inputs are refreshed in real time as lines move.",
  },
  {
    icon: LineChart,
    title: "Sharp Analytics",
    body: "Sharp money flow, consensus splits and CLV tracking surface where books are exposed.",
  },
  {
    icon: Lock,
    title: "Verified Records",
    body: "Picks are timestamped and locked before kickoff. No edits, no revisionism. Just receipts.",
  },
];

const experts = [
  { name: "Mike Davis", league: "MLB", initials: "MD", line: "Pitching matchups, park factors, umpire trends." },
  { name: "David Wilson", league: "NHL", initials: "DW", line: "Goalie splits, special teams value, line movement." },
  { name: "Michael Rinnier", league: "NBA", initials: "MR", line: "Pace, lineup data, live-line discrepancies." },
  { name: "Dave Johnson", league: "NFL", initials: "DJ", line: "QB matchup modeling and weekly weather edges." },
];

const timeline = [
  { year: "2019", title: "Founded", body: "Started by sharps tired of fluff. Built our first sim engine." },
  { year: "2021", title: "Sharp Data Feed", body: "Integrated real-time odds, CLV tracking and consensus data." },
  { year: "2023", title: "+150 Units", body: "Three year verified record crosses +150 units across all sports." },
  { year: "2026", title: "Today", body: "Thousands of pro members. Coverage across every major league." },
];

function AboutPage() {
  return (
    <div className="container-x pt-10 pb-32">
      {/* ============ EDITORIAL HERO ============ */}
      <ScrollReveal>
        <section className="relative grid lg:grid-cols-12 gap-10 items-end pt-10 pb-16 border-b border-white/10">
          <div className="lg:col-span-7">
            <div className="flex items-center gap-3 text-[10px] uppercase tracking-[0.3em] text-slate-400 font-semibold">
              <span className="h-px w-10 bg-cyan-300/60" />
              <span>File 001 · About</span>
              <span className="ml-2 inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-400/10 border border-emerald-400/30 text-emerald-300">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 ping-soft" />
                Live since 2019
              </span>
            </div>
            <h1
              className="mt-8 text-[clamp(2.5rem,6vw,4.5rem)] font-bold text-white leading-[1.02]"
              style={{ fontFamily: "'Orbitron', sans-serif", letterSpacing: "-0.01em" }}
            >
              We don't sell hype.
              <br />
              We sell{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-sky-300 to-indigo-300">
                receipts.
              </span>
            </h1>
          </div>

          <div className="lg:col-span-5">
            <p className="text-lg text-slate-300 leading-relaxed">
              Sportshandicapper is a sports betting intelligence platform built by sharps
              for sharps. Our handicappers and data scientists pair institutional grade
              simulations with timestamped, verifiable picks across every major league in
              North America.
            </p>
            <div className="mt-8 flex flex-wrap gap-2">
              {leagues.map((l) => (
                <span
                  key={l}
                  className="px-3 py-1.5 rounded-full text-[11px] font-bold tracking-widest text-slate-200 bg-white/[0.03] border border-white/10"
                >
                  {l}
                </span>
              ))}
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* ============ NUMBERS STRIP ============ */}
      <ScrollReveal>
        <section className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-white/10 border-b border-white/10">
          {[
            { value: 150, suffix: "+", label: "Units (3 year)" },
            { value: 15, prefix: "$", suffix: "K+", label: "Profit on $100 bets" },
            { value: 10, suffix: "k+", label: "Sims per game" },
            { value: 24, suffix: "/7", label: "Live support" },
          ].map((s, i) => (
            <div key={i} className="px-6 py-8">
              <div
                className="text-4xl md:text-5xl font-bold text-white tabular-nums"
                style={{ fontFamily: "'Orbitron', sans-serif" }}
              >
                {s.prefix}
                <Counter to={s.value} />
                {s.suffix}
              </div>
              <div className="mt-2 text-[11px] uppercase tracking-[0.2em] text-slate-400 font-semibold">
                {s.label}
              </div>
            </div>
          ))}
        </section>
      </ScrollReveal>

      {/* ============ MISSION ============ */}
      <ScrollReveal>
        <section className="grid lg:grid-cols-12 gap-10 py-24 border-b border-white/10">
          <aside className="lg:col-span-4">
            <div className="sticky top-32">
              <div className="text-[10px] tracking-[0.3em] uppercase text-cyan-300 font-bold">
                Our Mission
              </div>
              <div
                className="mt-4 text-3xl font-bold text-white leading-tight"
                style={{ fontFamily: "'Orbitron', sans-serif" }}
              >
                Build the most honest edge in sports betting.
              </div>
              <div className="mt-6 h-px w-16 bg-cyan-300/50" />
            </div>
          </aside>
          <div className="lg:col-span-8 space-y-6 text-slate-300 leading-[1.75] text-[17px]">
            <p>
              The betting industry is loud. Influencers post wins, hide losses, sell
              dreams. We started Sportshandicapper because we wanted the opposite. A
              platform where every play is locked in before tip off, where the model
              shows its work, and where the only way we win is when our members do.
            </p>
            <p>
              Our simulation engine runs every NFL, NBA, MLB and NHL game thousands of
              times each night. Over the last three years our model is up over{" "}
              <span className="text-cyan-300 font-semibold">150 units</span>. A $100
              bettor following along would have netted{" "}
              <span className="text-white font-semibold">$15,000+</span>. A $1,000
              bettor, north of <span className="text-white font-semibold">$150,000</span>.
            </p>
            <p>
              That track record is timestamped, public, and yours to audit. No fine
              print.
            </p>
          </div>
        </section>
      </ScrollReveal>

      {/* ============ THREE PILLARS ============ */}
      <ScrollReveal>
        <section className="py-24 border-b border-white/10">
          <div className="flex items-end justify-between flex-wrap gap-6">
            <div>
              <div className="text-[10px] tracking-[0.3em] uppercase text-cyan-300 font-bold">
                How We Work
              </div>
              <h2
                className="mt-3 text-4xl font-bold text-white"
                style={{ fontFamily: "'Orbitron', sans-serif" }}
              >
                Three pillars. One edge.
              </h2>
            </div>
            <Link to="/picks" className="btn-secondary">
              See live picks <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="mt-12 grid md:grid-cols-3 gap-px bg-white/10 rounded-3xl overflow-hidden border border-white/10">
            {pillars.map((p, i) => {
              const Icon = p.icon;
              return (
                <div
                  key={p.title}
                  className="bg-[#0A0C1C] p-8 group hover:bg-[#0E1126] transition"
                >
                  <div className="flex items-center justify-between">
                    <div className="h-11 w-11 rounded-xl bg-cyan-400/10 border border-cyan-400/20 flex items-center justify-center">
                      <Icon className="h-5 w-5 text-cyan-300" />
                    </div>
                    <span
                      className="text-xs text-slate-500 font-mono"
                      style={{ fontFamily: "'Orbitron', sans-serif" }}
                    >
                      0{i + 1}
                    </span>
                  </div>
                  <h3
                    className="mt-6 text-xl font-bold text-white"
                    style={{ fontFamily: "'Orbitron', sans-serif" }}
                  >
                    {p.title}
                  </h3>
                  <p className="mt-3 text-[15px] text-slate-400 leading-relaxed">{p.body}</p>
                </div>
              );
            })}
          </div>
        </section>
      </ScrollReveal>

      {/* ============ TIMELINE ============ */}
      <ScrollReveal>
        <section className="py-24 border-b border-white/10">
          <div className="text-[10px] tracking-[0.3em] uppercase text-cyan-300 font-bold">
            Track Record
          </div>
          <h2
            className="mt-3 text-4xl font-bold text-white max-w-2xl"
            style={{ fontFamily: "'Orbitron', sans-serif" }}
          >
            Built brick by brick.
          </h2>

          <div className="mt-12 relative">
            <div className="absolute left-0 right-0 top-[22px] h-px bg-gradient-to-r from-cyan-300/0 via-cyan-300/40 to-cyan-300/0 hidden md:block" />
            <div className="grid md:grid-cols-4 gap-6">
              {timeline.map((t, idx) => (
                <div key={t.year} className="relative">
                  <div className="hidden md:flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-cyan-300 shadow-[0_0_20px_rgba(34,211,238,0.6)]" />
                    <div className="h-px flex-1 bg-white/10" />
                  </div>
                  <div className="mt-5 card-premium p-5">
                    <div
                      className="text-2xl font-bold text-cyan-300"
                      style={{ fontFamily: "'Orbitron', sans-serif" }}
                    >
                      {t.year}
                    </div>
                    <div className="mt-2 text-white font-semibold">{t.title}</div>
                    <p className="mt-2 text-sm text-slate-400 leading-relaxed">{t.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* ============ EXPERTS ============ */}
      <ScrollReveal>
        <section className="py-24 border-b border-white/10">
          <div className="flex items-end justify-between flex-wrap gap-6">
            <div>
              <div className="text-[10px] tracking-[0.3em] uppercase text-cyan-300 font-bold">
                The Team
              </div>
              <h2
                className="mt-3 text-4xl font-bold text-white"
                style={{ fontFamily: "'Orbitron', sans-serif" }}
              >
                Sharps in residence.
              </h2>
            </div>
            <p className="max-w-md text-slate-400">
              Decades of combined experience. Each lead owns a sport end to end, from
              data ingestion to the final release.
            </p>
          </div>

          <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {experts.map((e) => (
              <div
                key={e.name}
                className="group relative rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.04] to-transparent p-6 overflow-hidden hover:border-cyan-300/30 transition"
              >
                <div className="absolute -top-16 -right-16 h-40 w-40 rounded-full bg-cyan-400/10 blur-3xl opacity-0 group-hover:opacity-100 transition" />
                <div className="relative">
                  <div className="flex items-center justify-between">
                    <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-cyan-400/30 to-indigo-500/30 border border-white/10 flex items-center justify-center">
                      <span
                        className="text-lg font-bold text-white"
                        style={{ fontFamily: "'Orbitron', sans-serif" }}
                      >
                        {e.initials}
                      </span>
                    </div>
                    <span className="text-[10px] tracking-[0.25em] uppercase text-cyan-300 font-bold px-2 py-1 rounded-md bg-cyan-300/10 border border-cyan-300/20">
                      {e.league}
                    </span>
                  </div>
                  <div className="mt-5 text-white font-semibold text-lg">{e.name}</div>
                  <p className="mt-2 text-sm text-slate-400 leading-relaxed">{e.line}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </ScrollReveal>

      {/* ============ GUARANTEE ============ */}
      <ScrollReveal>
        <section className="py-20">
          <div className="relative overflow-hidden rounded-[28px] border border-white/10 bg-gradient-to-br from-indigo-500/10 via-[#0A0C1C] to-cyan-400/10 p-10 md:p-14">
            <div className="absolute -top-32 -right-20 h-80 w-80 rounded-full bg-cyan-400/15 blur-[120px]" />
            <div className="absolute -bottom-32 -left-20 h-80 w-80 rounded-full bg-indigo-500/15 blur-[120px]" />

            <div className="relative grid lg:grid-cols-12 gap-10 items-center">
              <div className="lg:col-span-7">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyan-300/30 bg-cyan-300/10 text-cyan-200 text-[11px] uppercase tracking-[0.25em] font-bold">
                  <ShieldCheck className="h-3.5 w-3.5" />
                  Profit Guarantee
                </div>
                <h2
                  className="mt-6 text-4xl md:text-5xl font-bold text-white leading-tight"
                  style={{ fontFamily: "'Orbitron', sans-serif" }}
                >
                  If you don't profit,{" "}
                  <span className="text-cyan-300">we extend free.</span>
                </h2>
                <p className="mt-5 text-slate-300 leading-relaxed max-w-xl">
                  Buy any package. If you don't show a net profit by the end of your
                  cycle, it renews on us until you do. That's how confident we are in
                  the model.
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <Link to="/packages" className="btn-primary">
                    View packages <ArrowRight className="h-4 w-4" />
                  </Link>
                  <Link to="/picks" className="btn-secondary">
                    Today's picks
                  </Link>
                </div>
              </div>

              <div className="lg:col-span-5">
                <div className="rounded-2xl border border-white/10 bg-black/40 backdrop-blur-xl p-6 space-y-4">
                  {[
                    { icon: Activity, t: "Real-time line tracking" },
                    { icon: Target, t: "CLV measured on every play" },
                    { icon: Radio, t: "Picks pushed before kickoff" },
                    { icon: Trophy, t: "Public, verifiable record" },
                  ].map(({ icon: Icon, t }) => (
                    <div key={t} className="flex items-center gap-3">
                      <div className="h-9 w-9 rounded-lg bg-white/[0.04] border border-white/10 flex items-center justify-center">
                        <Icon className="h-4 w-4 text-cyan-300" />
                      </div>
                      <span className="text-slate-200 text-sm">{t}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* ============ FINAL LINE ============ */}
      <ScrollReveal>
        <section className="pt-10 text-center">
          <div className="inline-flex items-center gap-2 text-cyan-300 text-[11px] uppercase tracking-[0.3em] font-bold">
            <Sparkles className="h-3.5 w-3.5" /> One last thing
          </div>
          <h3
            className="mt-5 text-3xl md:text-5xl font-bold text-white max-w-3xl mx-auto leading-tight"
            style={{ fontFamily: "'Orbitron', sans-serif" }}
          >
            We measure success the same way you do. Profit.
          </h3>
          <div className="mt-8 flex items-center justify-center gap-3">
            <Link to="/packages" className="btn-primary">
              Start free trial <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </section>
      </ScrollReveal>
    </div>
  );
}
