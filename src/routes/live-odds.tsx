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
      eyebrow="Live Odds"
      title="Live Odds"
      description="A unified live odds board across every major US sportsbook. Coming soon."
      icon={Radio}
    />
  ),
});
