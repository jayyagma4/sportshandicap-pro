import { createFileRoute } from "@tanstack/react-router";
import { Check, ArrowRight } from "lucide-react";
import { ScrollReveal } from "@/components/ScrollReveal";

export const Route = createFileRoute("/packages")({
  head: () => ({
    meta: [
      { title: "Packages | Sportshandicapper" },
      { name: "description", content: "Pick your edge. Transparent unit tracking, full pick history, and verified results across all plans." },
      { property: "og:title", content: "Packages | Sportshandicapper" },
      { property: "og:description", content: "Pricing plans for handicappers. Free trial, weekly, monthly, premium season." },
    ],
  }),
  component: PackagesPage,
});

const tiers = [
  {
    name: "Free Trial", price: "$0", period: "7 days", tag: "Try it free",
    features: ["3 sports", "5 picks/day", "Basic confidence ratings", "Email support"],
    cta: "Start Free",
  },
  {
    name: "Weekly", price: "$79", period: "/ week", tag: "Sharp test",
    features: ["All sports", "Full pick feed", "Whale picks", "Live confidence updates", "Priority chat"],
    cta: "Go Weekly",
  },
  {
    name: "Monthly", price: "$249", period: "/ month", tag: "Most Popular", popular: true,
    features: ["Everything in Weekly", "ROI simulator access", "Trend reports", "Private Discord", "Locked-line tracking"],
    cta: "Get Monthly",
  },
  {
    name: "Premium Season", price: "$899", period: "/ season", tag: "Best value",
    features: ["Everything in Monthly", "1:1 strategy call", "Bankroll planning", "Beta model access", "Concierge support"],
    cta: "Go Premium",
  },
];

function PackagesPage() {
  return (
    <div className="container-x py-12">
      <ScrollReveal>
        <div className="text-center">
          <div className="eyebrow text-indigo-300 mb-2">Packages</div>
          <h1 className="text-5xl md:text-7xl font-extrabold gradient-text">Pick your edge.</h1>
          <p className="mt-5 text-lg text-slate-400 max-w-2xl mx-auto">
            Every plan includes transparent unit tracking, full pick history, and verified results.
          </p>
        </div>
      </ScrollReveal>

      <div className="mt-16 grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {tiers.map((t, i) => (
          <ScrollReveal key={t.name} delay={i * 100}>
            <div className={`card-premium p-7 h-full flex flex-col relative ${t.popular ? "ring-2 ring-indigo-400/60" : ""}`}>
              {t.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 text-[10px] font-bold uppercase tracking-widest rounded-full bg-[#1E90FF] text-white shadow-lg">
                  Most Popular
                </div>
              )}
              <div className="eyebrow text-indigo-300">{t.tag}</div>
              <h3 className="text-2xl font-bold text-white mt-2">{t.name}</h3>
              <div className="mt-4 flex items-baseline gap-1">
                <span className="text-5xl font-extrabold gradient-text-vivid">{t.price}</span>
                <span className="text-slate-500 text-sm">{t.period}</span>
              </div>
              <ul className="mt-6 space-y-2.5 flex-1">
                {t.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm text-slate-300">
                    <Check className="h-4 w-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
              <button className={`mt-7 ${t.popular ? "btn-primary" : "btn-secondary"} w-full`}>
                {t.cta} <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </div>
  );
}
