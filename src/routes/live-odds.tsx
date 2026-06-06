import { createFileRoute } from "@tanstack/react-router";
import { Radio } from "lucide-react";
import { ComingSoon } from "@/components/ComingSoon";

export const Route = createFileRoute("/live-odds")({
  head: () => ({
    meta: [
      { title: "Live Odds | Sportshandicapper" },
      { name: "description", content: "Real time odds across every major sportsbook. Launching soon." },
    ],
  }),
  component: () => (
    <ComingSoon
      eyebrow="Module · Data Feed"
      title="Live odds,"
      highlight="from every major book."
      description="A unified, low latency odds board across the biggest US sportsbooks. Compare lines side by side, spot the best price, and track movement as it happens."
      icon={Radio}
      features={[
        { title: "Side by Side Pricing", body: "Compare moneylines, spreads and totals across all major US books on one screen." },
        { title: "Line Movement Charts", body: "Watch how the market moves into kickoff. Spot steam and reverse line moves instantly." },
        { title: "Best Price Highlight", body: "We surface the sharpest available price for every market so you never leave value on the table." },
      ]}
    />
  ),
});
