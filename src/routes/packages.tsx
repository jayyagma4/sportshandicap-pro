import { createFileRoute } from "@tanstack/react-router";
import { Check, X, ArrowRight, Gift, Crown } from "lucide-react";
import { ScrollReveal } from "@/components/ScrollReveal";

export const Route = createFileRoute("/packages")({
  head: () => ({
    meta: [
      { title: "Packages | Sportshandicapper" },
      { name: "description", content: "Pick your edge. Free trial, weekly, monthly, and whale-tier season packages with transparent unit tracking." },
      { property: "og:title", content: "Packages | Sportshandicapper" },
      { property: "og:description", content: "Free trial, weekly, monthly, and whale-tier season packages." },
    ],
  }),
  component: PackagesPage,
});

type Tier = {
  name: string;
  access: string;
  price: string;
  bonus: string;
  included: string[];
  excluded: string[];
  cta: string;
  badge?: string;
};

const tiers: Tier[] = [
  {
    name: "1 Week",
    access: "1 Week Access",
    price: "$24.99",
    bonus: "Get 2★ Picks",
    included: ["1 Week Access", "24/7 Support", "Expert Analysis", "1, 2★ Picks"],
    excluded: ["3, 4, 5, 10★ Picks"],
    cta: "Get Started",
  },
  {
    name: "2 Week",
    access: "2 Week Access",
    price: "$49.99",
    bonus: "Get 3★ Picks + extra week",
    included: ["2 Week Access", "24/7 Support", "Expert Analysis", "1, 2, 3★ Picks"],
    excluded: ["4, 5, 10★ Picks"],
    cta: "Get Started",
  },
  {
    name: "1 Month",
    access: "1 Month Access",
    price: "$99.99",
    bonus: "Get 4★ Picks + extra 2 weeks",
    included: ["1 Month Access", "24/7 Support", "Expert Analysis", "1, 2, 3, 4★ Picks"],
    excluded: ["5, 10★ Picks"],
    cta: "Get Started",
    badge: "Most Popular",
  },
  {
    name: "2 Month",
    access: "2 Month Access",
    price: "$149.99",
    bonus: "Get 5★ Picks + extra month",
    included: ["2 Month Access", "24/7 Support", "Expert Analysis", "1, 2, 3, 4, 5★ Picks"],
    excluded: ["10★ Picks"],
    cta: "Get Started",
  },
  {
    name: "3 Month",
    access: "3 Month Access",
    price: "$199.99",
    bonus: "Get extra month",
    included: ["3 Month Access", "24/7 Support", "Expert Analysis", "1, 2, 3, 4, 5★ Picks"],
    excluded: ["10★ Picks"],
    cta: "Get Started",
  },
  {
    name: "6 Month",
    access: "6 Month Access",
    price: "$299.99",
    bonus: "Get 10★ Picks + extra 3 months",
    included: ["6 Month Access", "24/7 Support", "Expert Analysis", "1, 2, 3, 4, 5, 10★ Picks"],
    excluded: ["Whale Analysis"],
    cta: "Get Started",
    badge: "Best Value",
  },
];

function PackagesPage() {
  return (
    <div className="container-x py-12">
      <ScrollReveal>
        <div className="text-center max-w-3xl mx-auto">
          <div className="eyebrow text-[#1E90FF] mb-2">Packages</div>
          <h1 className="text-5xl md:text-6xl font-black tracking-tight text-white">
            Pick your <span className="text-[#1E90FF]">edge</span>.
          </h1>
          <p className="mt-5 text-base text-slate-400">
            Transparent unit tracking, full pick history, and verified results across every plan.
          </p>
        </div>
      </ScrollReveal>

      {/* Free Trial banner */}
      <ScrollReveal delay={80}>
        <div className="mt-12 card-premium p-6 md:p-7 flex flex-col md:flex-row md:items-center gap-6 relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-px bg-[#1E90FF]/60" />
          <div className="flex items-start gap-4 flex-1">
            <div className="h-12 w-12 rounded-md bg-[#1E90FF]/10 border border-[#1E90FF]/30 flex items-center justify-center flex-shrink-0">
              <Gift className="h-5 w-5 text-[#1E90FF]" />
            </div>
            <div className="min-w-0">
              <div className="eyebrow text-[#1E90FF]">Starts free — no credit card needed</div>
              <h3 className="mt-1 text-xl md:text-2xl font-black text-white tracking-tight">
                Free Trial · 1 Week Access
              </h3>
              <div className="mt-3 flex flex-wrap gap-x-5 gap-y-1.5 text-xs text-slate-300">
                <Inline ok>24/7 Support</Inline>
                <Inline ok>Expert Analysis</Inline>
                <Inline ok>1★ Picks Included</Inline>
                <Inline>2, 3, 4, 5, 10★ Picks</Inline>
              </div>
            </div>
          </div>
          <div className="flex md:flex-col md:items-end items-center justify-between md:justify-center gap-3 md:min-w-[200px]">
            <div className="text-right">
              <div className="text-3xl md:text-4xl font-black text-[#1E90FF] font-mono leading-none">FREE</div>
              <div className="text-[11px] text-slate-500 mt-1.5">1 Week Access · No card required</div>
            </div>
            <button className="btn-primary !py-2.5 whitespace-nowrap">
              Start Free Trial <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </ScrollReveal>

      {/* Pricing grid */}
      <div className="mt-8 grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {tiers.map((t, i) => (
          <ScrollReveal key={t.name} delay={i * 60}>
            <div
              className={`card-premium p-7 h-full flex flex-col relative ${
                t.badge ? "border-[#1E90FF]/40" : ""
              }`}
            >
              {t.badge && (
                <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 px-2.5 py-0.5 text-[10px] font-black uppercase tracking-widest rounded bg-[#1E90FF] text-white whitespace-nowrap">
                  {t.badge}
                </div>
              )}
              <div className="text-center">
                <div className="text-4xl font-black text-white font-mono">{t.price}</div>
                <div className="text-[11px] uppercase tracking-widest text-slate-500 mt-1.5">
                  {t.access}
                </div>
                <div className="mt-3 text-xs font-bold text-[#1E90FF]">{t.bonus}</div>
              </div>

              <div className="my-5 h-px bg-white/5" />

              <ul className="space-y-2.5 flex-1">
                {t.included.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm text-slate-200">
                    <Check className="h-4 w-4 text-[#1E90FF] mt-0.5 flex-shrink-0" />
                    {f}
                  </li>
                ))}
                {t.excluded.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm text-slate-600 line-through">
                    <X className="h-4 w-4 text-slate-700 mt-0.5 flex-shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>

              <button
                className={`mt-6 w-full ${t.badge ? "btn-primary" : "btn-secondary"}`}
              >
                {t.cta} <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </ScrollReveal>
        ))}
      </div>

      {/* Whale banner */}
      <ScrollReveal delay={120}>
        <div className="mt-10 card-premium p-6 md:p-7 flex flex-col md:flex-row md:items-center gap-6 relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-px bg-[#1E90FF]" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#1E90FF]/[0.06] to-transparent pointer-events-none" />
          <div className="relative flex items-start gap-4 flex-1">
            <div className="h-12 w-12 rounded-md bg-[#1E90FF]/15 border border-[#1E90FF]/40 flex items-center justify-center flex-shrink-0">
              <Crown className="h-5 w-5 text-[#1E90FF]" />
            </div>
            <div className="min-w-0">
              <div className="eyebrow text-[#1E90FF]">Whale Package — Ultimate Access</div>
              <h3 className="mt-1 text-xl md:text-2xl font-black text-white tracking-tight">
                1 Year Access · Get 10★ Picks + extra 6 months
              </h3>
              <div className="mt-3 flex flex-wrap gap-x-5 gap-y-1.5 text-xs text-slate-300">
                <Inline ok>24/7 Support</Inline>
                <Inline ok>Expert Analysis</Inline>
                <Inline ok>1–7★ Picks Included</Inline>
              </div>
            </div>
          </div>
          <div className="relative flex md:flex-col md:items-end items-center justify-between md:justify-center gap-3 md:min-w-[200px]">
            <div className="text-right">
              <div className="text-3xl md:text-4xl font-black text-white font-mono leading-none">
                $999.99
              </div>
              <div className="text-[11px] text-slate-500 mt-1.5">1 Year Access</div>
            </div>
            <button className="btn-primary !py-2.5 whitespace-nowrap">
              Become a Whale <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </ScrollReveal>

      <p className="mt-8 text-center text-xs text-slate-500">
        Already have an account?{" "}
        <a href="#login" className="text-[#1E90FF] font-semibold hover:text-white">
          Login here
        </a>
      </p>
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
