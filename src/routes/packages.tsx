import { createFileRoute } from "@tanstack/react-router";
import { Check, X, ArrowRight, Gift, Crown, Star } from "lucide-react";
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
  excluded: string[];
  badge?: "popular" | "best";
};

const tiers: Tier[] = [
  {
    rank: "01",
    name: "Sprint",
    access: "1 Week Access",
    price: "$24.99",
    stars: 2,
    bonus: "Get 2 star picks",
    included: ["1 Week Access", "24/7 Support", "Expert Analysis", "1, 2 star Picks"],
    excluded: ["3, 4, 5, 10 star Picks"],
  },
  {
    rank: "02",
    name: "Doubles",
    access: "2 Week Access",
    price: "$49.99",
    stars: 3,
    bonus: "Get 3 star picks plus extra week",
    included: ["2 Week Access", "24/7 Support", "Expert Analysis", "1, 2, 3 star Picks"],
    excluded: ["4, 5, 10 star Picks"],
  },
  {
    rank: "03",
    name: "Starter",
    access: "1 Month Access",
    price: "$99.99",
    stars: 4,
    bonus: "Get 4 star picks plus extra 2 weeks",
    included: ["1 Month Access", "24/7 Support", "Expert Analysis", "1, 2, 3, 4 star Picks"],
    excluded: ["5, 10 star Picks"],
    badge: "popular",
  },
  {
    rank: "04",
    name: "Stretch",
    access: "2 Month Access",
    price: "$149.99",
    stars: 5,
    bonus: "Get 5 star picks plus extra month",
    included: ["2 Month Access", "24/7 Support", "Expert Analysis", "1, 2, 3, 4, 5 star Picks"],
    excluded: ["10 star Picks"],
  },
  {
    rank: "05",
    name: "Quarter",
    access: "3 Month Access",
    price: "$199.99",
    stars: 5,
    bonus: "Get extra month",
    included: ["3 Month Access", "24/7 Support", "Expert Analysis", "1, 2, 3, 4, 5 star Picks"],
    excluded: ["10 star Picks"],
  },
  {
    rank: "06",
    name: "Season",
    access: "6 Month Access",
    price: "$299.99",
    stars: 10,
    bonus: "Get 10 star picks plus extra 3 months",
    included: ["6 Month Access", "24/7 Support", "Expert Analysis", "1 to 10 star Picks"],
    excluded: ["Whale Analysis"],
    badge: "best",
  },
];

function PackagesPage() {
  return (
    <div className="container-x py-12">
      {/* HEADER */}
      <ScrollReveal>
        <div className="grid lg:grid-cols-[1.4fr_1fr] gap-10 items-end">
          <div>
            <div className="eyebrow text-[#1E90FF] mb-2">Membership Board</div>
            <h1 className="text-5xl md:text-6xl font-black tracking-tight text-white leading-[1.05]">
              Climb the <span className="text-[#1E90FF]">board</span>.<br />
              Pick your tier.
            </h1>
            <p className="mt-5 text-base text-slate-400 max-w-xl">
              Eight tiers. One scoreboard. Transparent unit tracking, full pick
              history, and verified results across every plan.
            </p>
          </div>
          <div className="grid grid-cols-3 gap-3 lg:gap-4 lg:pl-8 lg:border-l lg:border-white/10">
            <Stat k="8" v="Plans" />
            <Stat k="10★" v="Top Tier" />
            <Stat k="1yr" v="Max Run" />
          </div>
        </div>
      </ScrollReveal>

      {/* FREE TRIAL STRIP */}
      <ScrollReveal delay={60}>
        <div className="mt-10 relative rounded-md border border-white/10 bg-black/40 overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-px bg-[#1E90FF]/70" />
          <div className="flex flex-col md:flex-row md:items-center gap-5 p-5 md:p-6">
            <div className="flex items-center gap-4 flex-1 min-w-0">
              <div className="hidden sm:flex h-11 w-11 rounded bg-[#1E90FF]/10 border border-[#1E90FF]/30 items-center justify-center flex-shrink-0">
                <Gift className="h-5 w-5 text-[#1E90FF]" />
              </div>
              <div className="min-w-0">
                <div className="text-[10px] uppercase tracking-widest font-bold text-[#1E90FF]">
                  Rank 00 · Free Trial · No card required
                </div>
                <div className="mt-1 text-lg md:text-xl font-black text-white tracking-tight">
                  1 Week Access with 1 star picks included
                </div>
              </div>
            </div>
            <div className="flex items-center gap-5">
              <div className="text-right">
                <div className="text-2xl md:text-3xl font-black text-[#1E90FF] font-mono leading-none">FREE</div>
                <div className="text-[10px] text-slate-500 mt-1 uppercase tracking-widest">7 days</div>
              </div>
              <button className="btn-primary !py-2.5 whitespace-nowrap">
                Start Trial <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </ScrollReveal>

      {/* SCOREBOARD LADDER */}
      <div className="mt-6 flex items-center justify-between">
        <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-slate-500 font-bold">
          <div className="h-px w-6 bg-[#1E90FF]/60" />
          Scoreboard
        </div>
        <div className="text-[10px] uppercase tracking-widest text-slate-600 font-bold hidden md:block">
          Rank · Plan · Picks · Access · Price
        </div>
      </div>

      <div className="mt-3 space-y-3">
        {tiers.map((t, i) => (
          <ScrollReveal key={t.rank} delay={i * 40}>
            <TierRow tier={t} />
          </ScrollReveal>
        ))}
      </div>

      {/* WHALE PODIUM */}
      <ScrollReveal delay={80}>
        <div className="mt-8 relative rounded-md border border-[#1E90FF]/40 bg-gradient-to-br from-[#0A0C1C] via-[#0A1A30] to-[#0A0C1C] overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#1E90FF] to-transparent" />
          <div className="absolute inset-y-0 left-0 w-1 bg-[#1E90FF]" />
          {/* Lane lines */}
          <div className="pointer-events-none absolute inset-0 opacity-[0.05]">
            <div className="absolute inset-y-0 left-1/4 w-px bg-white" />
            <div className="absolute inset-y-0 left-2/4 w-px bg-white" />
            <div className="absolute inset-y-0 left-3/4 w-px bg-white" />
          </div>

          <div className="relative p-6 md:p-8 grid lg:grid-cols-[auto_1fr_auto] gap-6 items-center">
            <div className="flex items-center gap-4">
              <div className="text-5xl md:text-6xl font-black font-mono text-[#1E90FF]/30 leading-none">07</div>
              <div className="h-14 w-14 rounded bg-[#1E90FF]/15 border border-[#1E90FF]/50 flex items-center justify-center">
                <Crown className="h-6 w-6 text-[#1E90FF]" />
              </div>
            </div>
            <div className="min-w-0">
              <div className="text-[10px] uppercase tracking-widest font-bold text-[#1E90FF]">
                Whale Package · Ultimate Access
              </div>
              <div className="mt-1 text-2xl md:text-3xl font-black text-white tracking-tight">
                1 Year Access with every star tier unlocked
              </div>
              <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-slate-300">
                <Inline ok>10 star Picks plus extra 6 months</Inline>
                <Inline ok>24/7 Support</Inline>
                <Inline ok>Expert Analysis</Inline>
                <Inline ok>Whale Analysis</Inline>
              </div>
            </div>
            <div className="flex lg:flex-col items-end justify-between gap-3 lg:min-w-[180px]">
              <div className="text-right">
                <div className="text-3xl md:text-4xl font-black text-white font-mono leading-none">$999.99</div>
                <div className="text-[10px] text-slate-500 mt-1.5 uppercase tracking-widest">1 Year</div>
              </div>
              <button className="btn-primary !py-2.5 whitespace-nowrap">
                Become a Whale <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </ScrollReveal>

      <p className="mt-10 text-center text-xs text-slate-500">
        Already have an account?{" "}
        <a href="#login" className="text-[#1E90FF] font-semibold hover:text-white">
          Login here
        </a>
      </p>
    </div>
  );
}

function TierRow({ tier }: { tier: Tier }) {
  const isPopular = tier.badge === "popular";
  const isBest = tier.badge === "best";
  const accent = isPopular || isBest;

  return (
    <div
      className={`group relative rounded-md border bg-black/30 transition overflow-hidden hover:bg-black/50 ${
        accent ? "border-[#1E90FF]/40" : "border-white/10 hover:border-white/20"
      }`}
    >
      {/* Hover lane marker */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-[#1E90FF]/0 group-hover:bg-[#1E90FF]/60 transition" />
      {accent && <div className="absolute inset-y-0 left-0 w-[3px] bg-[#1E90FF]" />}

      <div className="grid grid-cols-12 gap-4 items-center p-5">
        {/* Rank */}
        <div className="col-span-2 md:col-span-1 flex items-center">
          <div className={`text-3xl md:text-4xl font-black font-mono leading-none ${
            accent ? "text-[#1E90FF]" : "text-white/15"
          }`}>
            {tier.rank}
          </div>
        </div>

        {/* Name + stars + bonus */}
        <div className="col-span-10 md:col-span-4">
          <div className="flex items-center gap-2 flex-wrap">
            <div className="text-base md:text-lg font-black text-white tracking-tight">
              {tier.name}
            </div>
            {tier.badge && (
              <span className="px-2 py-0.5 text-[9px] font-black uppercase tracking-widest rounded bg-[#1E90FF] text-white whitespace-nowrap">
                {isPopular ? "Most Popular" : "Best Value"}
              </span>
            )}
          </div>
          <div className="mt-1.5 text-[11px] uppercase tracking-widest text-slate-500 font-bold">
            {tier.access}
          </div>
          <div className="mt-2 flex items-center gap-1">
            {Array.from({ length: Math.min(tier.stars, 5) }).map((_, i) => (
              <Star
                key={i}
                className={`h-3 w-3 ${accent ? "fill-[#1E90FF] text-[#1E90FF]" : "fill-white/40 text-white/40"}`}
              />
            ))}
            {tier.stars > 5 && (
              <span className="ml-1 text-[10px] font-mono font-bold text-[#1E90FF]">
                {tier.stars}★
              </span>
            )}
          </div>
        </div>

        {/* Features */}
        <div className="col-span-12 md:col-span-4 hidden md:block">
          <ul className="space-y-1.5">
            {tier.included.slice(0, 3).map((f) => (
              <li key={f} className="flex items-center gap-2 text-xs text-slate-300">
                <Check className="h-3.5 w-3.5 text-[#1E90FF] flex-shrink-0" />
                {f}
              </li>
            ))}
            {tier.excluded.slice(0, 1).map((f) => (
              <li key={f} className="flex items-center gap-2 text-xs text-slate-600">
                <X className="h-3.5 w-3.5 text-slate-700 flex-shrink-0" />
                <span className="line-through">{f}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Price + CTA */}
        <div className="col-span-12 md:col-span-3 flex items-center justify-between md:justify-end gap-4">
          <div className="text-right">
            <div className={`text-2xl md:text-3xl font-black font-mono leading-none ${
              accent ? "text-white" : "text-white"
            }`}>
              {tier.price}
            </div>
            <div className="mt-1 text-[10px] text-[#1E90FF] font-bold uppercase tracking-widest">
              {tier.bonus}
            </div>
          </div>
          <button
            className={`h-10 px-4 rounded-md text-xs font-black uppercase tracking-widest inline-flex items-center gap-1.5 transition whitespace-nowrap flex-shrink-0 ${
              accent
                ? "bg-[#1E90FF] text-white hover:bg-[#1E90FF]/90"
                : "border border-white/15 text-white hover:bg-white/10 hover:border-white/30"
            }`}
          >
            Select <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      {/* Mobile features */}
      <div className="md:hidden px-5 pb-5 -mt-2">
        <div className="pt-3 border-t border-white/5 flex flex-wrap gap-x-4 gap-y-1.5">
          {tier.included.slice(0, 3).map((f) => (
            <span key={f} className="inline-flex items-center gap-1.5 text-[11px] text-slate-300">
              <Check className="h-3 w-3 text-[#1E90FF]" />
              {f}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

function Stat({ k, v }: { k: string; v: string }) {
  return (
    <div>
      <div className="text-2xl md:text-3xl font-black font-mono text-white leading-none">{k}</div>
      <div className="mt-1.5 text-[10px] uppercase tracking-widest text-slate-500 font-bold">{v}</div>
    </div>
  );
}

function Inline({ children, ok }: { children: React.ReactNode; ok?: boolean }) {
  return (
    <span className="inline-flex items-center gap-1.5">
      {ok ? (
        <Check className="h-3.5 w-3.5 text-[#1E90FF]" />
      ) : (
        <X className="h-3.5 w-3.5 text-slate-600" />
      )}
      <span className={ok ? "" : "text-slate-600 line-through"}>{children}</span>
    </span>
  );
}
