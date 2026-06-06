import { createFileRoute } from "@tanstack/react-router";
import { Users } from "lucide-react";
import { ComingSoon } from "@/components/ComingSoon";

export const Route = createFileRoute("/consensus")({
  head: () => ({
    meta: [
      { title: "Consensus | Sportshandicapper" },
      { name: "description", content: "Public vs sharp money splits, ticket and handle percentages. Launching soon." },
    ],
  }),
  component: () => (
    <ComingSoon
      eyebrow="Module · Market Data"
      title="Public, sharp,"
      highlight="and everyone in between."
      description="See exactly where the money is going. Ticket counts, handle percentages and sharp action indicators for every game on the board."
      icon={Users}
      features={[
        { title: "Ticket vs Handle", body: "Spot the discrepancy between bet count and money flow, a classic sharp signal." },
        { title: "Sharp Money Flags", body: "Auto detect reverse line moves and steam moves that suggest pro action." },
        { title: "Historical Splits", body: "Backtest how the public has performed in similar matchups across every league." },
      ]}
    />
  ),
});
