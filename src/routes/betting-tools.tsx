import { createFileRoute } from "@tanstack/react-router";
import { Wrench } from "lucide-react";
import { ComingSoon } from "@/components/ComingSoon";

export const Route = createFileRoute("/betting-tools")({
  head: () => ({
    meta: [
      { title: "Betting Tools | Sportshandicapper" },
      { name: "description", content: "Pro grade betting calculators and tools. Launching soon." },
    ],
  }),
  component: () => (
    <ComingSoon
      eyebrow="Betting Tools"
      title="Betting Tools"
      description="Calculators, hedgers and bankroll utilities are on the way. Sit tight."
      icon={Wrench}
    />
  ),
});
