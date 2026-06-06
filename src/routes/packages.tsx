import { createFileRoute } from "@tanstack/react-router";
import { Check, ArrowRight, Gift, Crown, Star, Sparkles } from "lucide-react";
import { ScrollReveal } from "@/components/ScrollReveal";

export const Route = createFileRoute("/packages")({
  head: () => ({
    meta: [
      { title: "Packages | Sportshandicapper" },
      { name: "description", content: "Pick your edge. Free trial, weekly, monthly, and whale tier season packages with transparent unit tracking." },
      { property: "og:title", content: "Packages | Sportshandicapper" },
      { property: "og:description", content: "Free trial, weekly, monthly, and whale tier season packages." },
    ],
  }),
  component: PackagesPage,
});

type Tier = {
  rank: string;
  name: string;
  access: string;
  price: string;
  stars: number;
  bonus: string;
  included: string[];
  badge?: "popular" | "best";
};

const tiers: Tier[] = [
  { rank: "01", name: "Sprint",  access: "1 Week Access",  price: "$24.99",  stars: 2,  bonus: "Get 2 star picks",                       included: ["1 Week Access", "24/7 Support", "Expert Analysis", "1, 2 star Picks"] },
  { rank: "02", name: "Doubles", access: "2 Week Access",  price: "$49.99",  stars: 3,  bonus: "Get 3 star picks plus extra week",       included: ["2 Week Access", "24/7 Support", "Expert Analysis", "1, 2, 3 star Picks"] },
  { rank: "03", name: "Starter", access: "1 Month Access", price: "$99.99",  stars: 4,  bonus: "Get 4 star picks plus extra 2 weeks",    included: ["1 Month Access", "24/7 Support", "Expert Analysis", "1, 2, 3, 4 star Picks"], badge: "popular" },
  { rank: "04", name: "Stretch", access: "2 Month Access", price: "$149.99", stars: 5,  bonus: "Get 5 star picks plus extra month",      included: ["2 Month Access", "24/7 Support", "Expert Analysis", "1, 2, 3, 4, 5 star Picks"] },
  { rank: "05", name: "Quarter", access: "3 Month Access", price: "$199.99", stars: 5,  bonus: "Get extra month",                        included: ["3 Month Access", "24/7 Support", "Expert Analysis", "1, 2, 3, 4, 5 star Picks"] },
  { rank: "06", name: "Season",  access: "6 Month Access", price: "$299.99", stars: 10, bonus: "Get 10 star picks plus extra 3 months",  included: ["6 Month Access", "24/7 Support", "Expert Analysis", "1 to 10 star Picks"], badge: "best" },
];

function PackagesPage() {
  return (
    <div className="relative">
      {/* ============ DECORATIVE BACKGROUND ============ */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* Grid mesh */}
        <div
          className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)",
            backgroundSize: "64px 64px",
            maskImage: "radial-gradient(ellipse at 50% 0%, black 30%, transparent 75%)",
            WebkitMaskImage: "radial-gradient(ellipse at 50% 0%, black 30%, transparent 75%)",
          }}
        />
        {/* Radial glows */}
        <div className="absolute -top-32 left-1/4 h-[520px] w-[520px] rounded-full bg-cyan-400/10 blur-[140px]" />
        <div className="absolute top-40 right-0 h-[460px] w-[460px] rounded-full bg-indigo-500/15 blur-[140px]" />
        <div className="absolute top-[1100px] left-0 h-[420px] w-[420px] rounded-full bg-sky-500/10 blur-[140px]" />
        {/* Vignette */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#060818]" />
      </div>

      <div className="relative container-x py-16">
        {/* ============ HEADER ============ */}
        <ScrollReveal>
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyan-300/30 bg-cyan-300/10 text-cyan-200 text-[11px] uppercase tracking-[0.25em] font-bold">
              <Sparkles className="h-3.5 w-3.5" />
              Membership
            </div>
            <h1
              className="mt-6 text-5xl md:text-6xl font-bold text-white leading-[1.05]"
              style={{ fontFamily: "'Orbitron', sans-serif", letterSpacing: "-0.01em" }}
            >
              Pick your{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-sky-300 to-indigo-300">
                edge.
              </span>
            </h1>
            <p className="mt-5 text-slate-400 leading-relaxed">
              Eight transparent tiers. Verified records, full pick history and unit
              tracking across every plan.
            </p>
          </div>
        </ScrollReveal>

        {/* ============ FREE TRIAL ============ */}
        <ScrollReveal>
          <div className="mt-12 relative overflow-hidden rounded-2xl border border-cyan-300/20 bg-gradient-to-r from-cyan-400/10 via-[#0A0C1C]/80 to-indigo-500/10 backdrop-blur-xl">
            <div className="absolute -top-20 -right-20 h-60 w-60 rounded-full bg-cyan-400/20 blur-3xl" />
            <div className="relative flex flex-col md:flex-row items-center gap-5 p-5 md:p-6">
              <div className="flex items-center gap-4 flex-1 min-w-0">
                <div className="h-12 w-12 rounded-xl bg-cyan-400/15 border border-cyan-400/30 flex items-center justify-center flex-shrink-0">
                  <Gift className="h-5 w-5 text-cyan-300" />
                </div>
                <div className="min-w-0">
                  <div className="text-[10px] uppercase tracking-[0.25em] text-cyan-300 font-bold">
                    Free Trial · No card required
                  </div>
                  <div className="mt-1 text-lg md:text-xl font-bold text-white">
                    1 Week Access with 1 star picks included
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-5 self-stretch md:self-auto">
                <div className="text-right">
                  <div
                    className="text-2xl md:text-3xl font-bold text-cyan-300 leading-none"
                    style={{ fontFamily: "'Orbitron', sans-serif" }}
                  >
                    FREE
                  </div>
                  <div className="mt-1 text-[10px] uppercase tracking-[0.2em] text-slate-400 font-semibold">
                    7 days
                  </div>
                </div>
                <button className="btn-primary !py-2.5 whitespace-nowrap">
                  Start Trial <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* ============ TIER GRID ============ */}
        <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {tiers.map((t, i) => (
            <ScrollReveal key={t.rank}>
              <TierCard tier={t} delay={i * 40} />
            </ScrollReveal>
          ))}
        </div>

        {/* ============ WHALE ============ */}
        <ScrollReveal>
          <div className="mt-10 relative overflow-hidden rounded-[28px] border border-cyan-300/30 bg-gradient-to-br from-indigo-500/15 via-[#0A0C1C] to-cyan-400/15 p-8 md:p-12">
            <div className="absolute -top-32 -right-20 h-80 w-80 rounded-full bg-cyan-400/20 blur-[120px]" />
            <div className="absolute -bottom-32 -left-20 h-80 w-80 rounded-full bg-indigo-500/20 blur-[120px]" />
            <div className="relative grid lg:grid-cols-[auto_1fr_auto] gap-8 items-center">
              <div className="flex items-center gap-5">
                <div
                  className="text-6xl font-bold text-cyan-300/30 leading-none"
                  style={{ fontFamily: "'Orbitron', sans-serif" }}
                >
                  07
                </div>
                <div className="h-16 w-16 rounded-2xl bg-cyan-300/15 border border-cyan-300/40 flex items-center justify-center">
                  <Crown className="h-7 w-7 text-cyan-300" />
                </div>
              </div>
              <div className="min-w-0">
                <div className="text-[10px] uppercase tracking-[0.25em] text-cyan-300 font-bold">
                  Whale Package · Ultimate Access
                </div>
                <h3
                  className="mt-2 text-2xl md:text-3xl font-bold text-white leading-tight"
                  style={{ fontFamily: "'Orbitron', sans-serif" }}
                >
                  1 Year Access with every star tier unlocked.
                </h3>
                <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-xs text-slate-300">
                  {["10 star Picks plus 6 extra months", "24/7 Support", "Expert Analysis", "Whale Analysis"].map((x) => (
                    <span key={x} className="inline-flex items-center gap-1.5">
                      <Check className="h-3.5 w-3.5 text-cyan-300" />
                      {x}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex lg:flex-col items-end justify-between gap-3 lg:min-w-[180px]">
                <div className="text-right">
                  <div
                    className="text-3xl md:text-4xl font-bold text-white leading-none"
                    style={{ fontFamily: "'Orbitron', sans-serif" }}
                  >
                    $999.99
                  </div>
                  <div className="mt-1.5 text-[10px] uppercase tracking-[0.2em] text-slate-400 font-semibold">
                    1 Year
                  </div>
                </div>
                <button className="btn-primary whitespace-nowrap">
                  Become a Whale <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </ScrollReveal>

        <p className="mt-12 text-center text-xs text-slate-500">
          Already have an account?{" "}
          <a href="#login" className="text-cyan-300 font-semibold hover:text-white">
            Login here
          </a>
        </p>
      </div>
    </div>
  );
}

function TierCard({ tier, delay = 0 }: { tier: Tier; delay?: number }) {
  const isPopular = tier.badge === "popular";
  const isBest = tier.badge === "best";
  const accent = isPopular || isBest;

  return (
    <div
      className={`group relative h-full rounded-2xl border bg-gradient-to-b from-white/[0.04] to-transparent backdrop-blur-xl p-6 transition overflow-hidden ${
        accent
          ? "border-cyan-300/40 shadow-[0_0_60px_-20px_rgba(34,211,238,0.4)]"
          : "border-white/10 hover:border-white/20"
      }`}
      style={{ animationDelay: `${delay}ms` }}
    >
      {accent && (
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-300 to-transparent" />
      )}
      <div className="absolute -top-24 -right-24 h-48 w-48 rounded-full bg-cyan-400/0 group-hover:bg-cyan-400/10 blur-3xl transition" />

      <div className="relative flex items-start justify-between">
        <div>
          <div
            className={`text-xs font-bold ${
              accent ? "text-cyan-300" : "text-slate-500"
            }`}
            style={{ fontFamily: "'Orbitron', sans-serif" }}
          >
            {tier.rank}
          </div>
          <h3
            className="mt-2 text-2xl font-bold text-white"
            style={{ fontFamily: "'Orbitron', sans-serif" }}
          >
            {tier.name}
          </h3>
          <div className="mt-1 text-[10px] uppercase tracking-[0.2em] text-slate-400 font-semibold">
            {tier.access}
          </div>
        </div>
        {tier.badge && (
          <span className="px-2 py-1 text-[9px] font-bold uppercase tracking-widest rounded-md bg-cyan-300/15 text-cyan-200 border border-cyan-300/30 whitespace-nowrap">
            {isPopular ? "Most Popular" : "Best Value"}
          </span>
        )}
      </div>

      {/* Price */}
      <div className="relative mt-6 flex items-baseline gap-1.5">
        <div
          className="text-4xl font-bold text-white"
          style={{ fontFamily: "'Orbitron', sans-serif" }}
        >
          {tier.price}
        </div>
      </div>
      <div className="mt-1.5 text-[11px] font-semibold uppercase tracking-[0.15em] text-cyan-300">
        {tier.bonus}
      </div>

      {/* Stars */}
      <div className="relative mt-5 flex items-center gap-1">
        {Array.from({ length: Math.min(tier.stars, 5) }).map((_, i) => (
          <Star
            key={i}
            className={`h-3.5 w-3.5 ${
              accent ? "fill-cyan-300 text-cyan-300" : "fill-white/40 text-white/40"
            }`}
          />
        ))}
        {tier.stars > 5 && (
          <span className="ml-1 text-[11px] font-bold text-cyan-300">{tier.stars}★</span>
        )}
      </div>

      <div className="relative mt-5 h-px bg-white/10" />

      {/* Features */}
      <ul className="relative mt-5 space-y-2.5">
        {tier.included.map((f) => (
          <li key={f} className="flex items-center gap-2.5 text-sm text-slate-300">
            <div className="h-5 w-5 rounded-md bg-cyan-300/10 border border-cyan-300/20 flex items-center justify-center flex-shrink-0">
              <Check className="h-3 w-3 text-cyan-300" />
            </div>
            {f}
          </li>
        ))}
      </ul>

      {/* CTA */}
      <button
        className={`relative mt-7 w-full h-11 rounded-xl text-sm font-semibold inline-flex items-center justify-center gap-2 transition ${
          accent
            ? "bg-gradient-to-r from-cyan-400 to-sky-500 text-white hover:opacity-90"
            : "border border-white/15 text-white hover:bg-white/5 hover:border-white/30"
        }`}
      >
        Select {tier.name} <ArrowRight className="h-4 w-4" />
      </button>
    </div>
  );
}
