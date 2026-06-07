import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ArrowUpRight, Clock, FileText, Filter } from "lucide-react";
import { ScrollReveal } from "@/components/ScrollReveal";
import { articles } from "@/data/articles";

export const Route = createFileRoute("/articles/")({
  head: () => ({
    meta: [
      { title: "Research Terminal | Sportshandicapper" },
      { name: "description", content: "Long-form sports betting analysis, consensus reads, and league trends across the NFL, NBA, MLB, and NHL." },
      { property: "og:title", content: "Research Terminal | Sportshandicapper" },
      { property: "og:description", content: "Long-form analysis, consensus reads, and league trends." },
    ],
  }),
  component: ArticlesPage,
});

type League = "ALL" | "NFL" | "NBA" | "MLB" | "NHL";
const leagues: League[] = ["ALL", "NFL", "NBA", "MLB", "NHL"];

function ArticlesPage() {
  const [league, setLeague] = useState<League>("ALL");

  const filtered = useMemo(
    () => (league === "ALL" ? articles : articles.filter((a) => a.league === league)),
    [league]
  );
  const featured = filtered.find((a) => a.featured) ?? filtered[0];
  const rest = filtered.filter((a) => a.id !== featured?.id);

  const date = new Date().toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" }).toUpperCase();
  const now = new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: false });

  return (
    <div className="terminal-grid min-h-screen">
      <div className="container-x py-8">
        {/* Header strip */}
        <ScrollReveal>
          <div className="terminal-panel rounded-sm">
            <div className="terminal-panel-header">
              <div className="flex items-center gap-3">
                <FileText className="h-3 w-3 text-cyan-300" />
                <span className="text-white">RESEARCH / DESK</span>
                <span className="text-slate-600">FEED {date} · {now} ET</span>
              </div>
              <span className="text-slate-600">{articles.length} DISPATCHES</span>
            </div>
            <div className="grid md:grid-cols-4 divide-x divide-white/5">
              <Cell label="DISPATCHES" value={articles.length.toString().padStart(2, "0")} />
              <Cell label="THIS WEEK" value="07" accent="cyan" />
              <Cell label="ANALYSTS" value="04" />
              <Cell label="LEAGUES" value="04" accent="emerald" />
            </div>
          </div>
        </ScrollReveal>

        {/* Title */}
        <ScrollReveal delay={60}>
          <div className="mt-10 mb-6 grid lg:grid-cols-[1fr_auto] gap-6 items-end">
            <div>
              <div className="label-mono text-cyan-300 mb-2">// THE EDGE / RESEARCH</div>
              <h1 className="font-mono-num text-white text-5xl md:text-7xl font-bold leading-[0.95]">
                THE <span className="text-[#1E90FF]">EDGE.</span>
              </h1>
              <p className="mt-4 text-slate-400 max-w-xl">
                Long-form analysis, consensus reads, and league trends from the desk. Filed before the lines move, archived after the whistle.
              </p>
            </div>
            <div className="terminal-panel rounded-sm p-4 min-w-[220px]">
              <div className="label-mono mb-2">LATEST FILING</div>
              <div className="font-mono-num text-white text-lg font-bold">{articles[0]?.date}</div>
              <div className="label-mono mt-1 text-[#1E90FF]">{articles[0]?.league} / {articles[0]?.category.toUpperCase()}</div>
            </div>
          </div>
        </ScrollReveal>

        {/* Filter */}
        <ScrollReveal delay={80}>
          <div className="flex flex-wrap items-center justify-between gap-4 py-4 border-y border-white/10">
            <div className="flex flex-wrap items-center gap-2">
              <span className="label-mono mr-2 inline-flex items-center gap-2"><Filter className="h-3 w-3" /> LEAGUE /</span>
              {leagues.map((l) => (
                <button
                  key={l}
                  onClick={() => setLeague(l)}
                  className={`chip-mono ${league === l ? "is-active" : ""}`}
                >
                  {l}
                </button>
              ))}
            </div>
            <span className="label-mono">{filtered.length} ROWS</span>
          </div>
        </ScrollReveal>

        {/* Featured */}
        {featured && (
          <ScrollReveal delay={120}>
            <Link
              to="/articles/$articleId"
              params={{ articleId: featured.id }}
              className="mt-8 block terminal-panel rounded-sm overflow-hidden group"
            >
              <div className="terminal-panel-header">
                <div className="flex items-center gap-3">
                  <span className="led-dot bg-[#1E90FF] text-[#1E90FF]" />
                  <span className="text-white">LEAD STORY</span>
                  <span className="text-slate-600">{featured.league} / {featured.category.toUpperCase()}</span>
                </div>
                <span className="text-cyan-300 inline-flex items-center gap-1.5 group-hover:translate-x-0.5 transition">
                  OPEN <ArrowUpRight className="h-3 w-3" />
                </span>
              </div>
              <div className="grid lg:grid-cols-[1.4fr_1fr]">
                <div className="p-8 md:p-10">
                  <div className="label-mono mb-4">ID / {featured.id.toUpperCase()} · {featured.date}</div>
                  <h2 className="font-mono-num text-white text-3xl md:text-5xl font-bold leading-[1.05] group-hover:text-[#1E90FF] transition-colors">
                    {featured.title}
                  </h2>
                  <p className="mt-6 text-slate-400 max-w-2xl">{featured.excerpt}</p>
                  <div className="mt-8 flex flex-wrap items-center gap-3 label-mono">
                    <span className="text-slate-300">▸ {featured.author.toUpperCase()}</span>
                    <span className="text-slate-700">|</span>
                    <span className="inline-flex items-center gap-1.5"><Clock className="h-3 w-3" /> {featured.readTime.toUpperCase()}</span>
                  </div>
                </div>
                <div className="relative bg-[#05070F] border-l border-white/10 p-8 md:p-10 flex flex-col justify-between">
                  <div>
                    <div className="label-mono text-[#1E90FF] mb-3">KEY INSIGHTS</div>
                    {featured.keyInsights?.slice(0, 4).map((k) => (
                      <div key={k.label} className="flex items-center justify-between py-2.5 border-b border-white/5">
                        <span className="label-mono">{k.label.toUpperCase()}</span>
                        <span className="font-mono-num text-white font-bold text-sm">{k.value}</span>
                      </div>
                    )) ?? (
                      <p className="text-slate-500 text-sm">No insights filed.</p>
                    )}
                  </div>
                  <div className="mt-6 font-mono-num text-[120px] leading-none text-white/[0.05] font-bold text-right">
                    {featured.league}
                  </div>
                </div>
              </div>
            </Link>
          </ScrollReveal>
        )}

        {/* Article rows */}
        <div className="mt-8 terminal-panel rounded-sm overflow-x-auto">
          <div className="grid grid-cols-[40px_70px_120px_1fr_120px_80px] gap-3 px-4 py-3 border-b border-white/10 label-mono min-w-[820px]">
            <span>#</span><span>LG</span><span>CATEGORY</span>
            <span>HEADLINE</span><span>AUTHOR</span><span className="text-right">READ</span>
          </div>
          {rest.map((a, i) => (
            <ScrollReveal key={a.id} delay={i * 40}>
              <Link
                to="/articles/$articleId"
                params={{ articleId: a.id }}
                className="terminal-row grid grid-cols-[40px_70px_120px_1fr_120px_80px] gap-3 px-4 py-4 items-center min-w-[820px] group"
              >
                <span className="font-mono-num text-[11px] text-slate-600">{String(i + 2).padStart(2, "0")}</span>
                <span className="font-mono-num text-[11px] text-[#1E90FF] font-bold">{a.league}</span>
                <span className="font-mono-num text-[10px] text-slate-400 truncate">{a.category.toUpperCase()}</span>
                <div className="min-w-0">
                  <div className="font-mono-num text-sm text-white font-semibold truncate group-hover:text-[#1E90FF] transition-colors">
                    {a.title}
                  </div>
                  <div className="text-[11px] text-slate-500 truncate mt-1">{a.excerpt}</div>
                </div>
                <span className="font-mono-num text-[10px] text-slate-400 tracking-wider truncate">{a.author.toUpperCase()}</span>
                <span className="font-mono-num text-[11px] text-cyan-300 text-right inline-flex items-center justify-end gap-1">
                  <Clock className="h-3 w-3" /> {a.readTime.replace(" min", "M")}
                </span>
              </Link>
            </ScrollReveal>
          ))}

          {filtered.length === 0 && (
            <div className="py-16 text-center label-mono">NO DISPATCHES / SELECT A LEAGUE</div>
          )}
        </div>

        {/* CTA bar */}
        <ScrollReveal delay={120}>
          <div className="mt-12 terminal-panel rounded-sm p-8 md:p-10 relative overflow-hidden">
            <div className="absolute inset-0 scanline opacity-40 pointer-events-none" />
            <div className="relative grid md:grid-cols-[1fr_auto] gap-6 items-end">
              <div>
                <div className="label-mono text-cyan-300 mb-3">// SUBSCRIBE</div>
                <h3 className="font-mono-num text-white text-3xl md:text-4xl font-bold">
                  GET EVERY DISPATCH <span className="text-[#1E90FF]">THE MOMENT IT FILES.</span>
                </h3>
              </div>
              <Link to="/packages" className="btn-primary whitespace-nowrap">
                Open Account <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </div>
  );
}

function Cell({ label, value, suffix, accent }: { label: string; value: string; suffix?: string; accent?: "emerald" | "cyan" }) {
  const c = accent === "emerald" ? "text-emerald-300" : accent === "cyan" ? "text-cyan-300" : "text-white";
  return (
    <div className="p-4">
      <div className="label-mono mb-1.5">{label}</div>
      <div className={`font-mono-num text-2xl font-bold ${c}`}>
        {value}<span className="text-slate-500 text-base ml-0.5">{suffix}</span>
      </div>
    </div>
  );
}
