import { createFileRoute } from "@tanstack/react-router";
import { TrendingUp } from "lucide-react";
import { ComingSoon } from "@/components/ComingSoon";

export const Route = createFileRoute("/trends")({
  head: () => ({
    meta: [
      { title: "Trends | Sportshandicapper" },
      { name: "description", content: "Situational, ATS and matchup trends across every major league. Launching soon." },
    ],
  }),
  component: () => (
    <ComingSoon
      eyebrow="Module · Insights"
      title="Trends that"
      highlight="actually matter."
      description="A trend engine that filters noise out of the data. Situational splits, ATS records, ump and ref splits, and matchup patterns you can act on."
      icon={TrendingUp}
      features={[
        { title: "Situational Splits", body: "Home dog, road favorite, back to back, divisional, primetime, all sliced automatically." },
        { title: "ATS Performance", body: "Against the spread records for every team and matchup, with sample size context." },
        { title: "Custom Filters", body: "Build your own trend by stacking filters, then save it to your dashboard." },
      ]}
    />
  ),
});
