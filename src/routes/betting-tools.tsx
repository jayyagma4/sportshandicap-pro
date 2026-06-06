import { createFileRoute } from "@tanstack/react-router";
import { Wrench } from "lucide-react";
import { ComingSoon } from "@/components/ComingSoon";

export const Route = createFileRoute("/betting-tools")({
  head: () => ({
    meta: [
      { title: "Betting Tools | Sportshandicapper" },
      { name: "description", content: "Pro grade betting calculators, hedging tools and bankroll utilities. Launching soon." },
    ],
  }),
  component: () => (
    <ComingSoon
      eyebrow="Module · Tools"
      title="Betting tools,"
      highlight="forged for sharps."
      description="A full suite of calculators and decision tools: parlay builder, hedger, Kelly sizer, no vig converter and bankroll simulator. Designed to plug straight into our picks feed."
      icon={Wrench}
      features={[
        { title: "Kelly Sizer", body: "Optimal stake sizing based on your edge and bankroll, with fractional Kelly presets." },
        { title: "Hedge Calculator", body: "Lock in profit or minimize loss across multi leg tickets with real time line input." },
        { title: "No Vig Converter", body: "Strip the juice off any line to see the true implied probability books are pricing." },
      ]}
    />
  ),
});
