import { createFileRoute, Link } from "@tanstack/react-router";
import { Check, ArrowUpRight } from "lucide-react";
import { PortalHeader } from "./portal.index";

export const Route = createFileRoute("/portal/packages")({
  component: Packages,
});

const current = {
  name: "Free Trial",
  tier: "★ ACCESS",
  renews: "JUN 07, 2026",
  perks: ["1 daily free pick", "Public articles access", "Limited consensus data"],
};

const plans = [
  {
    id: "rookie",
    name: "Rookie",
    price: 49,
    period: "MO",
    features: ["3-5 picks daily", "All articles", "Full consensus", "Email alerts"],
    cta: "UPGRADE",
    accent: "border-white/10",
  },
  {
    id: "pro",
    name: "Pro Desk",
    price: 149,
    period: "MO",
    features: ["All picks across leagues", "Premium analyst writeups", "Live odds + line movement", "SMS + email alerts", "Trend exports (CSV)"],
    cta: "UPGRADE",
    accent: "border-amber-300/40 ring-1 ring-amber-300/20",
    badge: "MOST POPULAR",
  },
  {
    id: "syndicate",
    name: "Syndicate",
    price: 499,
    period: "MO",
    features: ["Everything in Pro Desk", "Direct analyst Slack", "Bankroll consultation", "API access to picks feed", "Whitelisted IP for terminal"],
    cta: "CONTACT SALES",
    accent: "border-white/10",
  },
];

function Packages() {
  return (
    <div className="p-6 lg:p-8 space-y-6">
      <PortalHeader title="Packages" subtitle="Packages." crumb="Active subscription and available upgrade tiers." />

      {/* Current */}
      <div className="terminal-panel rounded-sm">
        <div className="terminal-panel-header">
          <div className="flex items-center gap-2">
            <span className="led-dot bg-emerald-400 text-emerald-400" />
            <span className="text-white">ACTIVE SUBSCRIPTION</span>
          </div>
          <span className="text-slate-600">RENEWS {current.renews}</span>
        </div>
        <div className="p-6 grid lg:grid-cols-[1fr_2fr] gap-6">
          <div>
            <div className="text-[10px] tracking-[0.2em] text-slate-500">CURRENT PACKAGE</div>
            <div className="mt-2 text-3xl font-black text-white">{current.name}</div>
            <div className="mt-1 text-[11px] text-amber-300 tracking-[0.18em]">{current.tier}</div>
          </div>
          <div>
            <div className="text-[10px] tracking-[0.2em] text-slate-500 mb-3">INCLUDED</div>
            <ul className="space-y-2">
              {current.perks.map((p) => (
                <li key={p} className="flex items-center gap-2 text-sm text-slate-300">
                  <Check className="h-3.5 w-3.5 text-emerald-400" /> {p}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Plans */}
      <div className="grid lg:grid-cols-3 gap-3">
        {plans.map((p) => (
          <div key={p.id} className={`terminal-panel rounded-sm relative ${p.accent}`}>
            {p.badge && (
              <span className="absolute -top-2 left-4 text-[10px] tracking-[0.2em] bg-amber-300 text-black font-bold px-2 py-0.5">
                {p.badge}
              </span>
            )}
            <div className="p-6">
              <div className="text-[10px] tracking-[0.2em] text-slate-500">PACKAGE</div>
              <div className="mt-1 text-2xl font-black text-white">{p.name}</div>
              <div className="mt-4 flex items-baseline gap-1">
                <span className="text-4xl font-black text-white font-mono-num">${p.price}</span>
                <span className="text-[11px] tracking-[0.18em] text-slate-500">/ {p.period}</span>
              </div>
              <ul className="mt-5 space-y-2">
                {p.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm text-slate-300">
                    <Check className="h-3.5 w-3.5 text-amber-300 mt-0.5 shrink-0" /> {f}
                  </li>
                ))}
              </ul>
              <button className="mt-6 w-full h-10 bg-amber-300 hover:bg-amber-200 text-black font-bold tracking-[0.18em] text-[11px] flex items-center justify-center gap-2 transition">
                {p.cta} <ArrowUpRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="terminal-panel rounded-sm p-5 flex items-center justify-between">
        <div>
          <div className="text-white font-semibold">Compare every tier on the pricing page</div>
          <div className="text-sm text-slate-400 mt-1">Detailed breakdown of analyst access, league coverage, and limits.</div>
        </div>
        <Link to="/packages" className="text-[11px] tracking-[0.2em] text-amber-300 hover:text-amber-200 flex items-center gap-1">
          OPEN PRICING <ArrowUpRight className="h-3 w-3" />
        </Link>
      </div>
    </div>
  );
}
