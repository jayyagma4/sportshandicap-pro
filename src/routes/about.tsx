import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  ShieldCheck,
  TrendingUp,
  Trophy,
  Sparkles,
  Check,
  Users,
} from "lucide-react";
import { ScrollReveal } from "@/components/ScrollReveal";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Sportshandicapper | Pro Sports Betting Intelligence" },
      {
        name: "description",
        content:
          "Meet the team behind Sportshandicapper. Institutional-grade simulations, verified records and expert handicappers across MLB, NBA, NFL, NHL and more.",
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

type Expert = {
  name: string;
  league: string;
  initials: string;
  blurb: string;
  accent: string;
};

const experts: Expert[] = [
  {
    name: "Mike Davis",
    league: "MLB",
    initials: "MD",
    blurb:
      "MLB lead. Deep edges in pitcher matchups, park factors and umpire trends.",
    accent: "from-emerald-400/30 to-emerald-400/0",
  },
  {
    name: "David Wilson",
    league: "NHL",
    initials: "DW",
    blurb:
      "Born into the high-stakes world of sports betting. Specialist in NHL goalie splits and special teams value.",
    accent: "from-cyan-400/30 to-cyan-400/0",
  },
  {
    name: "Michael Rinnier",
    league: "NBA",
    initials: "MR",
    blurb:
      "NBA modeler. Pace, lineup data and live-line discrepancies are his playground.",
    accent: "from-indigo-400/30 to-indigo-400/0",
  },
  {
    name: "Dave Johnson",
    league: "NFL",
    initials: "DJ",
    blurb:
      "The numbers behind the NFL's most feared handicapper. From spreadsheets to the Strip.",
    accent: "from-amber-400/30 to-amber-400/0",
  },
];

function AboutPage() {
  return (
    <div className="container-x pt-16 pb-32">
      {/* HERO */}
      <ScrollReveal>
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/[0.03] text-xs uppercase tracking-[0.2em] text-slate-300">
            <Sparkles className="h-3.5 w-3.5 text-cyan-300" />
            About Sportshandicapper
          </div>
          <h1
            className="mt-6 text-5xl md:text-6xl font-bold text-white leading-[1.05]"
            style={{ fontFamily: "'Orbitron', sans-serif", letterSpacing: "-0.01em" }}
          >
            Betting intelligence,{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-sky-300 to-indigo-300">
              engineered for sharps.
            </span>
          </h1>
          <p className="mt-6 text-lg text-slate-300 leading-relaxed">
            Sportshandicapper is the premier sports betting analysis platform. Our team
            of expert handicappers and data scientists has years of experience and an
            unmatched passion for North American sports.
          </p>
        </div>
      </ScrollReveal>

      {/* STATS STRIP */}
      <ScrollReveal>
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { k: "+150", l: "Units (3yr)" },
            { k: "$15K+", l: "Profit on $100 bets" },
            { k: "10k+", l: "Sim runs / game" },
            { k: "24/7", l: "Support" },
          ].map((s) => (
            <div
              key={s.l}
              className="rounded-2xl border border-white/10 bg-white/[0.02] p-5 backdrop-blur-xl"
            >
              <div
                className="text-3xl font-bold text-white"
                style={{ fontFamily: "'Orbitron', sans-serif" }}
              >
                {s.k}
              </div>
              <div className="mt-1 text-xs uppercase tracking-widest text-slate-400">
                {s.l}
              </div>
            </div>
          ))}
        </div>
      </ScrollReveal>

      {/* TWO-COL FEATURE: Simulation Model */}
      <ScrollReveal>
        <div className="mt-20 grid lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-5">
            <div className="eyebrow flex items-center gap-2">
              <TrendingUp className="h-3.5 w-3.5 text-cyan-300" /> Our Simulation Model
            </div>
            <h2
              className="mt-3 text-3xl md:text-4xl font-bold text-white"
              style={{ fontFamily: "'Orbitron', sans-serif" }}
            >
              Thousands of sims. Every game. Every night.
            </h2>
          </div>
          <div className="lg:col-span-7">
            <div className="card-premium p-7">
              <p className="text-slate-300 leading-relaxed">
                The Sportshandicapper simulation model runs every NFL, NBA, MLB and NHL
                game thousands of times. Over the last three years, our model is up
                over{" "}
                <span className="text-cyan-300 font-semibold">150 units</span>. A $100
                bettor would have netted{" "}
                <span className="text-white font-semibold">$15,000+</span>, and a $1,000
                bettor over{" "}
                <span className="text-white font-semibold">$150,000+</span>.
              </p>
              <div className="mt-6 grid sm:grid-cols-3 gap-3">
                {["NFL", "NBA", "MLB", "NHL", "CFB", "CBB"].map((lg) => (
                  <div
                    key={lg}
                    className="rounded-xl border border-white/10 bg-white/[0.02] py-2.5 text-center text-xs font-bold tracking-widest text-slate-200"
                  >
                    {lg}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </ScrollReveal>

      {/* WHAT WE OFFER */}
      <ScrollReveal>
        <div className="mt-20">
          <div className="eyebrow flex items-center gap-2">
            <ShieldCheck className="h-3.5 w-3.5 text-cyan-300" /> What We Offer
          </div>
          <h2
            className="mt-3 text-3xl md:text-4xl font-bold text-white max-w-2xl"
            style={{ fontFamily: "'Orbitron', sans-serif" }}
          >
            Sharp picks across every major league.
          </h2>
          <p className="mt-4 max-w-3xl text-slate-300 leading-relaxed">
            We offer picks on NFL, NBA, MLB, NHL, XFL, PGA Golf, and NCAA Basketball and
            Football. Packages start at just{" "}
            <span className="text-cyan-300 font-semibold">$24.99 / month</span> with
            full access to simulations, consensus data, betting trends and expert
            analysis.
          </p>

          <div className="mt-8 grid md:grid-cols-3 gap-4">
            {[
              {
                t: "Verified records",
                d: "Every pick is timestamped before games start. No edits, no excuses.",
              },
              {
                t: "Institutional data",
                d: "Live odds, sharp money flow, consensus and trend signals in one feed.",
              },
              {
                t: "Profit guarantee",
                d: "If a package doesn't show a net profit, it renews free until it does.",
              },
            ].map((f) => (
              <div
                key={f.t}
                className="card-premium p-6"
              >
                <div className="h-9 w-9 rounded-lg bg-cyan-400/10 border border-cyan-400/20 flex items-center justify-center">
                  <Check className="h-4 w-4 text-cyan-300" />
                </div>
                <div className="mt-4 text-white font-semibold">{f.t}</div>
                <div className="mt-2 text-sm text-slate-400 leading-relaxed">{f.d}</div>
              </div>
            ))}
          </div>
        </div>
      </ScrollReveal>

      {/* CTA BANNER */}
      <ScrollReveal>
        <div className="mt-16 relative overflow-hidden rounded-3xl border border-cyan-400/20 bg-gradient-to-r from-indigo-500/10 via-cyan-400/10 to-transparent p-8 md:p-10">
          <div className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-cyan-400/20 blur-3xl" />
          <div className="relative flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <div className="text-cyan-300 text-xs uppercase tracking-[0.25em] font-semibold">
                No credit card needed
              </div>
              <div
                className="mt-2 text-2xl md:text-3xl font-bold text-white"
                style={{ fontFamily: "'Orbitron', sans-serif" }}
              >
                Try Sportshandicapper free for 7 days.
              </div>
              <div className="mt-1 text-slate-300">
                Full access. Cancel anytime. Get started with our free trial.
              </div>
            </div>
            <Link to="/packages" className="btn-primary whitespace-nowrap">
              Start Free Trial <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </ScrollReveal>

      {/* COMMITMENT */}
      <ScrollReveal>
        <div className="mt-20 grid lg:grid-cols-12 gap-8">
          <div className="lg:col-span-5">
            <div className="eyebrow flex items-center gap-2">
              <Trophy className="h-3.5 w-3.5 text-cyan-300" /> Our Commitment
            </div>
            <h2
              className="mt-3 text-3xl md:text-4xl font-bold text-white"
              style={{ fontFamily: "'Orbitron', sans-serif" }}
            >
              Your bankroll. Our obsession.
            </h2>
          </div>
          <div className="lg:col-span-7 space-y-5 text-slate-300 leading-relaxed">
            <p>
              Our team is committed to providing the highest level of customer service
              and support. From our user-friendly platform to 24/7 support, we are here
              to help you succeed.
            </p>
            <p className="text-white">
              If you purchase a package and don't show a net profit at the end of your
              cycle, your package will automatically renew{" "}
              <span className="text-cyan-300 font-semibold">FREE</span> until you are a
              winning player following our selections.
            </p>
          </div>
        </div>
      </ScrollReveal>

      <div className="divider-glow mt-20" />

      {/* EXPERTS */}
      <ScrollReveal>
        <div className="mt-20">
          <div className="eyebrow flex items-center gap-2">
            <Users className="h-3.5 w-3.5 text-cyan-300" /> Meet Our Experts
          </div>
          <h2
            className="mt-3 text-3xl md:text-4xl font-bold text-white"
            style={{ fontFamily: "'Orbitron', sans-serif" }}
          >
            Decades of edge, on your side.
          </h2>
          <p className="mt-3 text-slate-400 max-w-2xl">
            Our professional handicappers bring decades of combined experience to every
            pick we release.
          </p>

          <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {experts.map((e) => (
              <div
                key={e.name}
                className="group relative card-premium p-6 overflow-hidden"
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-b ${e.accent} opacity-0 group-hover:opacity-100 transition pointer-events-none`}
                />
                <div className="relative">
                  <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-cyan-400/30 to-indigo-400/30 border border-white/10 flex items-center justify-center">
                    <span
                      className="text-xl font-bold text-white"
                      style={{ fontFamily: "'Orbitron', sans-serif" }}
                    >
                      {e.initials}
                    </span>
                  </div>
                  <div className="mt-5 text-lg font-semibold text-white">{e.name}</div>
                  <div className="mt-1 text-[10px] tracking-[0.25em] uppercase text-cyan-300 font-bold">
                    {e.league} Lead
                  </div>
                  <p className="mt-3 text-sm text-slate-400 leading-relaxed">{e.blurb}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </ScrollReveal>

      {/* FINAL CTA */}
      <ScrollReveal>
        <div className="mt-24 text-center">
          <h3
            className="text-3xl md:text-4xl font-bold text-white"
            style={{ fontFamily: "'Orbitron', sans-serif" }}
          >
            Ready to bet smarter?
          </h3>
          <p className="mt-3 text-slate-400">
            Join thousands of sharp bettors already winning with Sportshandicapper.
          </p>
          <div className="mt-7 flex items-center justify-center gap-3">
            <Link to="/packages" className="btn-primary">
              View Packages <ArrowRight className="h-4 w-4" />
            </Link>
            <Link to="/picks" className="btn-secondary">
              See Today's Picks
            </Link>
          </div>
        </div>
      </ScrollReveal>
    </div>
  );
}
