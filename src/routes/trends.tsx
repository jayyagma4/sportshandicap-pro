import { createFileRoute } from "@tanstack/react-router";
import { TrendingUp } from "lucide-react";
import { ComingSoon } from "@/components/ComingSoon";

export const Route = createFileRoute("/trends")({
  head: () => ({
    meta: [
      { title: "Trends | Sportshandicapper" },
      { name: "description", content: "Situational and ATS trends. Launching soon." },
    ],
  }),
  component: () => (
    <ComingSoon
      eyebrow="Trends"
      title="Trends"
      description="Situational splits, ATS records and matchup patterns you can act on. Coming soon."
      icon={TrendingUp}
    />
  ),
});
