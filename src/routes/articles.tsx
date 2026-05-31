import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ArrowRight, Clock, BookOpen } from "lucide-react";
import { ScrollReveal } from "@/components/ScrollReveal";
import { articles } from "@/data/articles";

export const Route = createFileRoute("/articles")({
  head: () => ({
    meta: [
      { title: "Exclusive Articles | Sportshandicapper" },
      { name: "description", content: "Expert sports betting articles, consensus analysis, and betting trends across NBA, NFL, MLB, and NHL." },
      { property: "og:title", content: "Exclusive Articles | Sportshandicapper" },
      { property: "og:description", content: "Expert sports betting articles, consensus analysis, and betting trends." },
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

  return (
    <div className="container-x py-16">
      {/* Header */}
      <ScrollReveal>
        <div className="flex items-end justify-between flex-wrap gap-6 pb-10 border-b border-white/10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md border border-[#1E90FF]/30 bg-[#1E90FF]/5 mb-5">
              <span className="h-1.5 w-1.5 rounded-full bg-[#1E90FF]" />
              <span className="text-[10px] uppercase tracking-[0.18em] font-bold text-[#1E90FF]">
                Editorial · Updated daily
              </span>
            </div>
            <h1 className="text-5xl md:text-6xl font-black tracking-tight leading-[0.95]">
              Articles &amp; <span className="text-[#1E90FF]">Analysis.</span>
            </h1>
            <p className="mt-5 text-base text-slate-400 max-w-xl leading-relaxed">
              Expert betting articles, consensus reads, and trends. Written before the lines move,
              archived after the final whistle.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-6 md:gap-10">
            {[
              { v: articles.length.toString().padStart(2, "0"), l: "This week" },
              { v: "4", l: "Leagues" },
              { v: "12", l: "Writers" },
            ].map((s) => (
              <div key={s.l}>
                <div className="text-3xl font-black text-white font-mono">{s.v}</div>
                <div className="text-[10px] uppercase tracking-[0.2em] text-slate-500 font-bold mt-1">
                  {s.l}
                </div>
              </div>
            ))}
          </div>
        </div>
      </ScrollReveal>

      {/* Filters */}
      <ScrollReveal delay={80}>
        <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap gap-1.5">
            {leagues.map((l) => {
              const active = league === l;
              return (
                <button
                  key={l}
                  onClick={() => setLeague(l)}
                  className={`px-3 py-1.5 rounded-md text-[10px] font-bold uppercase tracking-widest border transition ${
                    active
                      ? "bg-[#1E90FF] text-white border-[#1E90FF]"
                      : "bg-white/5 text-slate-400 border-white/10 hover:text-white hover:border-white/20"
                  }`}
                >
                  {l}
                </button>
              );
            })}
          </div>
          <div className="flex items-center gap-3 text-xs text-slate-400">
            <BookOpen className="h-3.5 w-3.5 text-slate-500" />
            <span>{filtered.length} articles</span>
          </div>
        </div>
      </ScrollReveal>

      {/* Featured */}
      {featured && (
        <ScrollReveal delay={120}>
          <Link
            to="/articles/$articleId"
            params={{ articleId: featured.id }}
            className="mt-10 grid lg:grid-cols-[1fr_1.1fr] gap-10 lg:gap-16 items-center pb-12 border-b border-white/10 group cursor-pointer"
          >
            <div className="order-2 lg:order-1">
              <div className="flex items-center gap-3 text-[10px] uppercase tracking-[0.2em] font-bold text-slate-500">
                <span className="text-[#1E90FF]">{featured.league}</span>
                <span className="h-px w-6 bg-white/10" />
                <span>{featured.category}</span>
              </div>
              <h2 className="mt-4 text-3xl md:text-4xl font-black tracking-tight leading-[1.05] text-white group-hover:text-[#1E90FF] transition-colors">
                {featured.title}
              </h2>
              <p className="mt-5 text-slate-400 leading-relaxed max-w-xl">{featured.excerpt}</p>
              <div className="mt-7 flex items-center gap-5 text-xs text-slate-500">
                <span className="font-semibold text-slate-300">{featured.author}</span>
                <span>·</span>
                <span className="font-mono">{featured.date}</span>
                <span>·</span>
                <span className="inline-flex items-center gap-1.5">
                  <Clock className="h-3 w-3" />
                  {featured.readTime}
                </span>
              </div>
              <div className="mt-7 inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-[#1E90FF]">
                Read article <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
              </div>
            </div>
            <div className="order-1 lg:order-2 relative aspect-[16/10] rounded-xl overflow-hidden border border-white/10 bg-gradient-to-br from-[#0A0C1C] via-[#0d1024] to-[#1E90FF]/10">
              <div className="absolute inset-0 opacity-[0.06]" style={{
                backgroundImage: "repeating-linear-gradient(90deg, rgba(255,255,255,1) 0 1px, transparent 1px 80px)"
              }} />
              <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between">
                <span className="text-[100px] md:text-[140px] font-black leading-none text-white/[0.05] font-mono">
                  {featured.league}
                </span>
                <span className="px-2.5 py-1 rounded border border-[#1E90FF]/40 bg-[#1E90FF]/10 text-[10px] font-bold uppercase tracking-widest text-[#1E90FF]">
                  Featured
                </span>
              </div>
            </div>
          </Link>

        </ScrollReveal>
      )}

      {/* Grid */}
      <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-12">
        {rest.map((a, i) => (
          <ScrollReveal key={a.id} delay={i * 60}>
            <article className="group cursor-pointer flex flex-col h-full">
              <div className="flex items-center gap-3 text-[10px] uppercase tracking-[0.2em] font-bold">
                <span className="text-[#1E90FF]">{a.league}</span>
                <span className="h-px w-5 bg-white/10" />
                <span className="text-slate-500">{a.category}</span>
              </div>
              <h3 className="mt-3 text-lg font-bold tracking-tight leading-snug text-white group-hover:text-[#1E90FF] transition-colors">
                {a.title}
              </h3>
              <p className="mt-3 text-sm text-slate-400 leading-relaxed line-clamp-3">{a.excerpt}</p>
              <div className="mt-5 pt-4 border-t border-white/5 flex items-center justify-between text-[11px] text-slate-500">
                <span className="font-semibold text-slate-300">{a.author}</span>
                <span className="flex items-center gap-1.5 font-mono">
                  <Clock className="h-3 w-3" />
                  {a.readTime}
                </span>
              </div>
            </article>
          </ScrollReveal>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="px-5 py-20 text-center text-slate-500 text-sm">
          No articles in this league yet.
        </div>
      )}

      {/* CTA */}
      <ScrollReveal delay={120}>
        <div className="mt-20 pt-12 border-t border-white/10 flex flex-wrap items-center justify-between gap-6">
          <div>
            <div className="text-[10px] uppercase tracking-[0.2em] font-bold text-slate-500">
              Members
            </div>
            <p className="mt-2 text-xl font-bold text-white">
              Get every article the moment it's published.
            </p>
          </div>
          <button className="btn-primary !py-2.5 !px-5 !text-sm">
            Become a Member <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>
      </ScrollReveal>
    </div>
  );
}
