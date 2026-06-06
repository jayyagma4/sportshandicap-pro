import { createFileRoute } from "@tanstack/react-router";
import { Users } from "lucide-react";
import { ComingSoon } from "@/components/ComingSoon";

export const Route = createFileRoute("/consensus")({
  head: () => ({
    meta: [
      { title: "Consensus | Sportshandicapper" },
      { name: "description", content: "Public vs sharp money splits. Launching soon." },
    ],
  }),
  component: () => (
    <ComingSoon
      eyebrow="Consensus"
      title="Consensus"
      description="Ticket counts, handle percentages and sharp action signals. Coming soon."
      icon={Users}
    />
  ),
});
