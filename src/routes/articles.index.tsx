import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ArrowUpRight, Clock } from "lucide-react";
import { ScrollReveal } from "@/components/ScrollReveal";
import { articles } from "@/data/articles";

export const Route = createFileRoute("/articles/")({
  head: () => ({
    meta: [
      { title: "The Edge | Sportshandicapper Journal" },
      { name: "description", content: "Long-form sports betting analysis, consensus reads, and league trends across the NFL, NBA, MLB, and NHL." },
      { property: "og:title", content: "The Edge | Sportshandicapper Journal" },
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
  const lead = rest[0];
  const tail = rest.slice(1);

  const today = new Date().toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" });

  return (
    <div className="container-x py-12">
      {/* Masthead */}
      <ScrollReveal>
        <div className="rule-double">
          <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.28em] font-bold text-slate-500 py-2">
            <span>Vol. III &middot; No. 24</span>
            <span className="hidden sm:block serif-italic normal-case tracking-normal text-slate-400 text-base">The Edge</span>
            <span>{today}</span>
          </div>
        </div>

        <div className="mt-10 grid lg:grid-cols-[1fr_auto] gap-8 items-end pb-10 border-b border-white/10">
          <div>
            <div className="kicker kicker-rule text-[#1E90FF]">Editorial Journal</div>
            <h1 className="mt-5 serif-display text-6xl md:text-8xl text-white">
              The <span className="serif-italic text-[#1E90FF]">Edge</span>.
            </h1>
            <p className="mt-5 text-base text-slate-400 max-w-lg leading-relaxed">
              Long-form analysis, consensus reads, and league trends from the desk. Filed before the lines move,
              archived after the final whistle.
            </p>
          </div>
          <div className="text-right">
            <div className="serif-display text-5xl text-white">{articles.length.toString().padStart(2, "0")}</div>
            <div className="kicker mt-1 text-slate-500">Pieces this week</div>
          </div>
        </div>
      </ScrollReveal>

      {/* Filter strip */}
      <ScrollReveal delay={60}>
        <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-4">
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <span className="kicker text-slate-500">Sections</span>
            {leagues.map((l) => {
              const active = league === l;
              return (
                <button
                  key={l}
                  onClick={() => setLeague(l)}
                  className={`text-sm font-semibold tracking-wide editorial-link ${
                    active ? "text-white" : "text-slate-500 hover:text-white"
                  }`}
                  style={active ? { backgroundSize: "100% 1px" } : {}}
                >
                  {l === "ALL" ? "All" : l}
                </button>
              );
            })}
          </div>
          <span className="text-[11px] text-slate-500 serif-italic">{filtered.length} stories</span>
        </div>
      </ScrollReveal>

      {/* Featured */}
      {featured && (
        <ScrollReveal delay={120}>
          <Link
            to="/articles/$articleId"
            params={{ articleId: featured.id }}
            className="mt-12 grid lg:grid-cols-12 gap-10 group cursor-pointer pb-14 border-b border-white/10"
          >
            <div className="lg:col-span-7">
              <div className="kicker kicker-rule text-[#1E90FF] mb-5">
                Lead Story &middot; {featured.category}
              </div>
              <h2 className="serif-display text-4xl md:text-6xl text-white group-hover:text-[#1E90FF] transition-colors">
                {featured.title.split(":")[0]}
                {featured.title.includes(":") && (
                  <span className="serif-italic text-slate-400">:{featured.title.split(":").slice(1).join(":")}</span>
                )}
              </h2>
              <p className="mt-6 text-lg text-slate-300 leading-relaxed drop-cap max-w-2xl">
                {featured.excerpt}
              </p>
              <div className="mt-8 flex items-center gap-4 text-[11px] uppercase tracking-[0.2em] text-slate-500 font-bold">
                <span className="text-slate-300">By {featured.author}</span>
                <span className="text-slate-700">/</span>
                <span className="font-mono">{featured.date}</span>
                <span className="text-slate-700">/</span>
                <span className="flex items-center gap-1.5">
                  <Clock className="h-3 w-3" /> {featured.readTime}
                </span>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="relative aspect-[4/5] rounded-sm overflow-hidden border border-white/10 bg-[#0A0C1C]">
                <div className="absolute inset-0 bg-gradient-to-br from-[#1E90FF]/20 via-transparent to-[#A855F7]/10" />
                <div className="absolute inset-0 opacity-[0.08]" style={{
                  backgroundImage: "repeating-linear-gradient(0deg, rgba(255,255,255,1) 0 1px, transparent 1px 6px)"
                }} />
                <div className="absolute top-6 left-6 right-6 flex items-start justify-between">
                  <span className="kicker text-white/70">{featured.league}</span>
                  <ArrowUpRight className="h-5 w-5 text-white/60 group-hover:text-white group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" />
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-8">
                  <div className="serif-display text-[180px] leading-none text-white/[0.07] font-normal">
                    {featured.league}
                  </div>
                </div>
              </div>
              <p className="mt-4 text-xs serif-italic text-slate-500 text-right">
                Illustration / The Edge desk
              </p>
            </div>
          </Link>
        </ScrollReveal>
      )}

      {/* Lead + tail asymmetric grid */}
      <div className="mt-14 grid lg:grid-cols-12 gap-x-12 gap-y-14">
        {lead && (
          <ScrollReveal delay={80}>
            <Link
              to="/articles/$articleId"
              params={{ articleId: lead.id }}
              className="lg:col-span-7 group block border-r-0 lg:border-r lg:border-white/10 lg:pr-12"
            >
              <div className="kicker text-[#1E90FF] mb-3">
                {lead.league} &middot; {lead.category}
              </div>
              <h3 className="serif-display text-3xl md:text-5xl text-white group-hover:text-[#1E90FF] transition-colors">
                {lead.title}
              </h3>
              <p className="mt-5 text-base text-slate-400 leading-relaxed max-w-xl">{lead.excerpt}</p>
              <div className="mt-6 flex items-center gap-3 text-[11px] uppercase tracking-[0.2em] text-slate-500 font-bold">
                <span className="text-slate-300">{lead.author}</span>
                <span>&middot;</span>
                <span className="font-mono">{lead.date}</span>
              </div>
            </Link>
          </ScrollReveal>
        )}

        <div className="lg:col-span-5 space-y-10">
          {tail.slice(0, 3).map((a, i) => (
            <ScrollReveal key={a.id} delay={120 + i * 60}>
              <Link
                to="/articles/$articleId"
                params={{ articleId: a.id }}
                className="group block pb-10 border-b border-white/10 last:border-0"
              >
                <div className="flex items-baseline gap-3 mb-2">
                  <span className="section-no">No. {String(i + 2).padStart(2, "0")}</span>
                  <span className="kicker text-[#1E90FF]">{a.league}</span>
                  <span className="kicker text-slate-600">{a.category}</span>
                </div>
                <h3 className="serif-display text-2xl md:text-3xl text-white group-hover:text-[#1E90FF] transition-colors">
                  {a.title}
                </h3>
                <p className="mt-3 text-sm text-slate-400 leading-relaxed line-clamp-2">{a.excerpt}</p>
                <div className="mt-4 flex items-center gap-3 text-[11px] uppercase tracking-[0.2em] text-slate-500 font-bold">
                  <span className="text-slate-300">{a.author}</span>
                  <span>&middot;</span>
                  <span className="font-mono">{a.readTime}</span>
                </div>
              </Link>
            </ScrollReveal>
          ))}
        </div>
      </div>

      {/* Archive grid */}
      {tail.length > 3 && (
        <div className="mt-20 pt-10 border-t border-white/10">
          <div className="flex items-end justify-between mb-10">
            <h4 className="serif-display text-3xl md:text-4xl text-white">
              From the <span className="serif-italic text-[#1E90FF]">archive</span>
            </h4>
            <span className="kicker text-slate-500">Earlier filings</span>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-12">
            {tail.slice(3).map((a, i) => (
              <ScrollReveal key={a.id} delay={i * 60}>
                <Link to="/articles/$articleId" params={{ articleId: a.id }} className="group block">
                  <div className="kicker text-[#1E90FF] mb-3">
                    {a.league} &middot; {a.category}
                  </div>
                  <h3 className="serif-display text-2xl text-white group-hover:text-[#1E90FF] transition-colors">
                    {a.title}
                  </h3>
                  <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-[11px] text-slate-500 uppercase tracking-[0.2em] font-bold">
                    <span className="text-slate-300">{a.author}</span>
                    <span className="font-mono flex items-center gap-1.5">
                      <Clock className="h-3 w-3" /> {a.readTime}
                    </span>
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      )}

      {filtered.length === 0 && (
        <div className="py-20 text-center text-slate-500 serif-italic text-lg">
          Nothing filed under this section yet.
        </div>
      )}

      {/* Closing CTA */}
      <ScrollReveal delay={120}>
        <div className="mt-24 pt-12 border-t border-white/10 grid md:grid-cols-[1fr_auto] gap-8 items-end">
          <div>
            <div className="kicker text-slate-500 mb-4">Subscribe to the desk</div>
            <h4 className="serif-display text-4xl md:text-5xl text-white max-w-xl">
              Receive every dispatch the moment it&apos;s <span className="serif-italic text-[#1E90FF]">filed</span>.
            </h4>
          </div>
          <Link to="/packages" className="btn-primary whitespace-nowrap">
            Become a Member <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
      </ScrollReveal>
    </div>
  );
}
