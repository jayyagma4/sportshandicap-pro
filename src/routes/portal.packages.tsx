import { createFileRoute, Link } from "@tanstack/react-router";
import { Check, ArrowUpRight } from "lucide-react";
import { PortalHeader } from "./portal.index";

export const Route = createFileRoute("/portal/packages")({
  component: Packages,
});

const current = {
  name: "Free Trial",
  tier: "★ ACCESS",
  renews: "Jun 07, 2026",
  perks: ["1 daily free pick", "Public articles access", "Limited consensus data"],
};

const plans = [
  {
    id: "rookie",
    name: "Rookie",
    price: 49,
    period: "mo",
    features: ["3-5 picks daily", "All articles", "Full consensus", "Email alerts"],
    cta: "Upgrade",
    popular: false,
  },
  {
    id: "pro",
    name: "Pro Desk",
    price: 149,
    period: "mo",
    features: [
      "All picks across leagues",
      "Premium analyst writeups",
      "Live odds + line movement",
      "SMS + email alerts",
      "Trend exports (CSV)",
    ],
    cta: "Upgrade",
    popular: true,
  },
  {
    id: "syndicate",
    name: "Syndicate",
    price: 499,
    period: "mo",
    features: [
      "Everything in Pro Desk",
      "Direct analyst Slack",
      "Bankroll consultation",
      "API access to picks feed",
      "Whitelisted IP for terminal",
    ],
    cta: "Contact Sales",
    popular: false,
  },
];

function Packages() {
  return (
    <div className="space-y-8">
      <PortalHeader
        title="Packages."
        crumb="Your active subscription and the upgrade tiers available to you."
      />

      {/* Current */}
      <div className="p-card overflow-hidden">
        <div className="grid lg:grid-cols-[1.1fr_2fr]">
          <div className="p-7 bg-[var(--p-surface-muted)] border-r border-[var(--p-border)]">
            <span className="p-chip p-chip-purple">★ Active</span>
            <div className="mt-4 text-3xl font-bold tracking-tight">{current.name}</div>
            <div className="mt-1 text-sm text-[var(--p-text-muted)]">Renews {current.renews}</div>
            <Link to="#pricing" className="mt-6 inline-flex p-btn">
              Upgrade plan <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="p-7">
            <div className="p-eyebrow">What's included</div>
            <ul className="mt-4 grid sm:grid-cols-2 gap-3">
              {current.perks.map((p) => (
                <li key={p} className="flex items-start gap-2.5 text-sm">
                  <span className="mt-0.5 w-5 h-5 rounded-full bg-[var(--p-blue-soft)] grid place-items-center shrink-0">
                    <Check className="h-3 w-3 text-[var(--p-blue)]" />
                  </span>
                  {p}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Plans */}
      <div id="pricing" className="grid lg:grid-cols-3 gap-4">
        {plans.map((p) => (
          <div
            key={p.id}
            className={`p-card relative p-7 flex flex-col ${
              p.popular
                ? "border-[var(--p-blue)] shadow-[0_8px_30px_-12px_rgba(37,99,235,0.25)]"
                : ""
            }`}
          >
            {p.popular && (
              <span className="absolute -top-2.5 left-7 p-chip p-chip-purple">
                Most popular
              </span>
            )}
            <div className="p-eyebrow">Plan</div>
            <div className="mt-1.5 text-xl font-bold tracking-tight">{p.name}</div>
            <div className="mt-5 flex items-baseline gap-1.5">
              <span className="p-stat-num text-4xl">${p.price}</span>
              <span className="text-[13px] text-[var(--p-text-muted)]">/ {p.period}</span>
            </div>
            <ul className="mt-6 space-y-3 flex-1">
              {p.features.map((f) => (
                <li key={f} className="flex items-start gap-2.5 text-[13.5px]">
                  <span
                    className={`mt-0.5 w-5 h-5 rounded-full grid place-items-center shrink-0 ${
                      p.popular ? "bg-[var(--p-blue-soft)]" : "bg-[var(--p-surface-muted)]"
                    }`}
                  >
                    <Check
                      className={`h-3 w-3 ${
                        p.popular ? "text-[var(--p-blue)]" : "text-[var(--p-text-muted)]"
                      }`}
                    />
                  </span>
                  {f}
                </li>
              ))}
            </ul>
            <button
              className={`mt-7 ${
                p.popular ? "p-btn" : "p-btn-ghost"
              } w-full`}
            >
              {p.cta} <ArrowUpRight className="h-4 w-4" />
            </button>
          </div>
        ))}
      </div>

      <div className="p-card p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="font-semibold">Compare every tier on the pricing page</div>
          <div className="text-sm text-[var(--p-text-muted)] mt-0.5">
            Detailed breakdown of analyst access, league coverage, and limits.
          </div>
        </div>
        <Link to="/packages" className="p-btn-ghost">
          Open pricing <ArrowUpRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}
