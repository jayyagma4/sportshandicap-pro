import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import {
  ArrowLeft,
  ArrowRight,
  Clock,
  Calendar,
  MapPin,
  Trophy,
  Share2,
  Bookmark,
  Lock,
  ChevronRight,
  TrendingUp,
  CheckCircle2,
  AlertTriangle,
  Sparkles,
} from "lucide-react";
import { ScrollReveal } from "@/components/ScrollReveal";
import { articles, getArticle, type Article, type Block } from "@/data/articles";

export const Route = createFileRoute("/articles/$articleId")({
  head: ({ params }) => {
    const a = getArticle(params.articleId);
    const title = a ? `${a.title} | Sportshandicapper` : "Article | Sportshandicapper";
    const desc = a?.excerpt ?? "Expert sports betting analysis.";
    return {
      meta: [
        { title },
        { name: "description", content: desc },
        { property: "og:title", content: title },
        { property: "og:description", content: desc },
      ],
    };
  },
  loader: ({ params }) => {
    const article = getArticle(params.articleId);
    if (!article) throw notFound();
    return { article };
  },
  errorComponent: ({ error }) => (
    <div className="container-x py-32 text-center text-slate-400">
      Couldn't load this article: {error.message}
    </div>
  ),
  notFoundComponent: () => (
    <div className="container-x py-32 text-center">
      <p className="text-slate-400">Article not found.</p>
      <Link to="/articles" className="mt-4 inline-block text-[#1E90FF] font-bold">
        Back to all articles →
      </Link>
    </div>
  ),
  component: ArticleDetail,
});

function ArticleDetail() {
  const { article } = Route.useLoaderData() as { article: Article };
  const related = articles.filter((a) => a.id !== article.id && a.league === article.league).slice(0, 3);

  return (
    <article className="relative">
      {/* HERO */}
      <header className="relative overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-br from-[#0A0C1C] via-[#0d1024] to-[#1E90FF]/15" />
          <div
            className="absolute inset-0 opacity-[0.07]"
            style={{
              backgroundImage:
                "repeating-linear-gradient(90deg, rgba(255,255,255,1) 0 1px, transparent 1px 80px), repeating-linear-gradient(0deg, rgba(255,255,255,1) 0 1px, transparent 1px 80px)",
            }}
          />
          <div className="absolute -top-32 -right-32 h-[480px] w-[480px] rounded-full bg-[#1E90FF]/20 blur-3xl" />
          <div className="absolute -bottom-40 -left-32 h-[400px] w-[400px] rounded-full bg-[#A855F7]/15 blur-3xl" />
        </div>

        <div className="container-x py-12 lg:py-16">
          <Link
            to="/articles"
            className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] font-bold text-slate-400 hover:text-white transition mb-8"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> All Articles
          </Link>

          <ScrollReveal>
            <div className="flex flex-wrap items-center gap-2 mb-6">
              <span className="px-2.5 py-1 rounded border border-[#1E90FF]/40 bg-[#1E90FF]/10 text-[10px] font-bold uppercase tracking-widest text-[#1E90FF]">
                {article.league}
              </span>
              <span className="px-2.5 py-1 rounded border border-white/10 bg-white/5 text-[10px] font-bold uppercase tracking-widest text-slate-300">
                {article.category}
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded border border-emerald-400/30 bg-emerald-500/10 text-[10px] font-bold uppercase tracking-widest text-emerald-300">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" /> Live coverage
              </span>
            </div>

            <h1 className="text-3xl md:text-5xl lg:text-6xl font-black tracking-tight leading-[1.02] max-w-5xl">
              {article.title}
            </h1>

            <p className="mt-6 text-lg text-slate-300 leading-relaxed max-w-3xl">{article.excerpt}</p>

            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 text-xs text-slate-400">
              <div className="flex items-center gap-3">
                <span className="h-9 w-9 rounded-full bg-gradient-to-br from-[#1E90FF] to-[#A855F7] inline-flex items-center justify-center text-white font-black text-[11px]">
                  {article.author
                    .split(" ")
                    .map((w) => w[0])
                    .slice(0, 2)
                    .join("")}
                </span>
                <div>
                  <div className="text-sm font-bold text-white">{article.author}</div>
                  {article.authorRole && (
                    <div className="text-[10px] uppercase tracking-widest text-slate-500">
                      {article.authorRole}
                    </div>
                  )}
                </div>
              </div>
              <span className="h-6 w-px bg-white/10" />
              <span className="inline-flex items-center gap-1.5 font-mono">
                <Calendar className="h-3.5 w-3.5" /> {article.date}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Clock className="h-3.5 w-3.5" /> {article.readTime} read
              </span>
              <span className="ml-auto flex items-center gap-2">
                <button className="h-9 w-9 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 inline-flex items-center justify-center text-slate-300 transition">
                  <Share2 className="h-4 w-4" />
                </button>
                <button className="h-9 w-9 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 inline-flex items-center justify-center text-slate-300 transition">
                  <Bookmark className="h-4 w-4" />
                </button>
              </span>
            </div>
          </ScrollReveal>

          {article.matchup && (
            <ScrollReveal delay={80}>
              <div className="mt-10 rounded-2xl border border-white/10 bg-black/30 backdrop-blur p-5 md:p-6 grid md:grid-cols-[1fr_auto_1fr] gap-6 items-center">
                <TeamSide name={article.matchup.away} side="away" />
                <div className="text-center">
                  <div className="text-[10px] uppercase tracking-[0.25em] font-bold text-slate-500">
                    {article.matchup.series}
                  </div>
                  <div className="my-2 text-2xl md:text-3xl font-black text-white font-mono">VS</div>
                  <div className="flex flex-wrap justify-center gap-x-4 gap-y-1 text-[11px] text-slate-400">
                    <span className="inline-flex items-center gap-1">
                      <Calendar className="h-3 w-3" /> {article.date}
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <Clock className="h-3 w-3" /> {article.matchup.time}
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <MapPin className="h-3 w-3" /> {article.matchup.venue}
                    </span>
                  </div>
                </div>
                <TeamSide name={article.matchup.home} side="home" />
              </div>
            </ScrollReveal>
          )}
        </div>
      </header>

      {/* BODY + SIDEBAR */}
      <div className="container-x py-12 lg:py-16 grid lg:grid-cols-[1fr_340px] gap-12 lg:gap-16">
        {/* Main column */}
        <div className="min-w-0">
          {article.tldr && article.tldr.length > 0 && (
            <ScrollReveal>
              <aside className="mb-10 rounded-2xl border border-[#1E90FF]/25 bg-[#1E90FF]/[0.04] p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Sparkles className="h-4 w-4 text-[#1E90FF]" />
                  <span className="text-[10px] uppercase tracking-[0.25em] font-bold text-[#1E90FF]">
                    Executive Summary
                  </span>
                </div>
                <ul className="space-y-2.5">
                  {article.tldr.map((t, i) => (
                    <li key={i} className="flex gap-3 text-sm text-slate-300 leading-relaxed">
                      <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-[#1E90FF] flex-shrink-0" />
                      <span>{t}</span>
                    </li>
                  ))}
                </ul>
              </aside>
            </ScrollReveal>
          )}

          <div className="prose-custom">
            {article.body.map((block, i) => (
              <BlockRenderer key={i} block={block} />
            ))}
          </div>

          {article.faqs && article.faqs.length > 0 && (
            <ScrollReveal>
              <section className="mt-16">
                <div className="flex items-center gap-3 mb-6">
                  <span className="h-px flex-1 bg-white/10" />
                  <span className="text-[10px] uppercase tracking-[0.25em] font-bold text-slate-500">
                    Frequently Asked
                  </span>
                  <span className="h-px flex-1 bg-white/10" />
                </div>
                <div className="divide-y divide-white/10 border-y border-white/10">
                  {article.faqs.map((f, i) => (
                    <details key={i} className="group py-5">
                      <summary className="flex cursor-pointer items-center justify-between gap-4 text-sm font-bold text-white list-none">
                        <span>{f.q}</span>
                        <ChevronRight className="h-4 w-4 text-[#1E90FF] transition group-open:rotate-90 flex-shrink-0" />
                      </summary>
                      <p className="mt-3 text-sm text-slate-400 leading-relaxed">{f.a}</p>
                    </details>
                  ))}
                </div>
              </section>
            </ScrollReveal>
          )}
        </div>

        {/* Sidebar */}
        <aside className="lg:sticky lg:top-28 lg:self-start space-y-6">
          {article.keyInsights && article.keyInsights.length > 0 && (
            <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-5">
              <div className="flex items-center gap-2 mb-4">
                <TrendingUp className="h-4 w-4 text-[#1E90FF]" />
                <span className="text-[10px] uppercase tracking-[0.25em] font-bold text-slate-400">
                  Key Insights
                </span>
              </div>
              <dl className="space-y-3">
                {article.keyInsights.map((k) => (
                  <div key={k.label} className="flex items-center justify-between gap-3 pb-3 border-b border-white/5 last:border-0 last:pb-0">
                    <dt className="text-xs text-slate-400">{k.label}</dt>
                    <dd className="text-sm font-black text-white font-mono">{k.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          )}

          <div className="rounded-2xl border border-[#1E90FF]/30 bg-gradient-to-br from-[#1E90FF]/10 via-transparent to-[#A855F7]/10 p-6">
            <div className="inline-flex items-center gap-1.5 px-2 py-1 rounded border border-[#1E90FF]/40 bg-[#1E90FF]/10 text-[9px] font-black uppercase tracking-widest text-[#1E90FF] mb-4">
              <Lock className="h-3 w-3" /> Members Only
            </div>
            <h3 className="text-lg font-black text-white leading-tight">
              Today's Pick for This Game
            </h3>
            <p className="mt-2 text-xs text-slate-400 leading-relaxed">
              Side, total, and our high-value prop — unlocked the moment you join.
            </p>
            <div className="mt-5 flex items-center gap-2">
              {[1, 2, 3, 4, 5].map((s) => (
                <Trophy key={s} className="h-3.5 w-3.5 text-[#1E90FF]" fill="currentColor" />
              ))}
              <span className="ml-2 text-[10px] uppercase tracking-widest font-bold text-slate-400">
                5-star confidence
              </span>
            </div>
            <button className="mt-5 w-full btn-primary !py-2.5 !text-sm justify-center">
              Unlock Pick <ArrowRight className="h-3.5 w-3.5" />
            </button>
            <button className="mt-2 w-full text-xs text-slate-400 hover:text-white transition py-2">
              Already a member? Log in
            </button>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-5">
            <div className="text-[10px] uppercase tracking-[0.25em] font-bold text-slate-400 mb-3">
              Author
            </div>
            <div className="flex items-center gap-3">
              <span className="h-11 w-11 rounded-full bg-gradient-to-br from-[#1E90FF] to-[#A855F7] inline-flex items-center justify-center text-white font-black text-sm">
                {article.author
                  .split(" ")
                  .map((w) => w[0])
                  .slice(0, 2)
                  .join("")}
              </span>
              <div>
                <div className="text-sm font-bold text-white">{article.author}</div>
                <div className="text-[10px] uppercase tracking-widest text-slate-500">
                  {article.authorRole ?? "Handicapper"}
                </div>
              </div>
            </div>
          </div>
        </aside>
      </div>

      {/* Related */}
      {related.length > 0 && (
        <section className="border-t border-white/10">
          <div className="container-x py-16">
            <div className="flex items-end justify-between mb-8">
              <div>
                <div className="text-[10px] uppercase tracking-[0.25em] font-bold text-[#1E90FF]">
                  More {article.league} Coverage
                </div>
                <h2 className="mt-2 text-2xl md:text-3xl font-black tracking-tight">
                  Related Articles
                </h2>
              </div>
              <Link
                to="/articles"
                className="hidden md:inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-400 hover:text-white transition"
              >
                View all <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
            <div className="grid md:grid-cols-3 gap-x-8 gap-y-10">
              {related.map((r) => (
                <Link
                  key={r.id}
                  to="/articles/$articleId"
                  params={{ articleId: r.id }}
                  className="group block"
                >
                  <div className="flex items-center gap-3 text-[10px] uppercase tracking-[0.2em] font-bold">
                    <span className="text-[#1E90FF]">{r.league}</span>
                    <span className="h-px w-5 bg-white/10" />
                    <span className="text-slate-500">{r.category}</span>
                  </div>
                  <h3 className="mt-3 text-base font-bold leading-snug text-white group-hover:text-[#1E90FF] transition-colors">
                    {r.title}
                  </h3>
                  <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-[11px] text-slate-500">
                    <span>{r.author}</span>
                    <span className="font-mono">{r.date}</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </article>
  );
}

function TeamSide({ name, side }: { name: string; side: "home" | "away" }) {
  const initials = name
    .split(" ")
    .map((w) => w[0])
    .slice(0, 3)
    .join("");
  return (
    <div className={`flex items-center gap-4 ${side === "home" ? "md:flex-row-reverse md:text-right" : ""}`}>
      <span className="h-14 w-14 rounded-xl bg-gradient-to-br from-[#1E90FF] to-[#A855F7] inline-flex items-center justify-center text-white font-black text-base flex-shrink-0">
        {initials}
      </span>
      <div>
        <div className="text-[10px] uppercase tracking-[0.2em] font-bold text-slate-500">
          {side === "home" ? "Home" : "Away"}
        </div>
        <div className="text-base md:text-lg font-black text-white leading-tight">{name}</div>
      </div>
    </div>
  );
}

function BlockRenderer({ block }: { block: Block }) {
  switch (block.type) {
    case "p":
      return <p className="my-5 text-[15px] text-slate-300 leading-[1.8]">{block.text}</p>;
    case "h2":
      return (
        <h2 className="mt-12 mb-5 text-2xl md:text-3xl font-black tracking-tight text-white flex items-center gap-3">
          {block.icon && <span className="text-2xl">{block.icon}</span>}
          <span>{block.text}</span>
          <span className="ml-2 h-1 flex-1 bg-gradient-to-r from-[#1E90FF]/40 to-transparent rounded-full" />
        </h2>
      );
    case "h3":
      return (
        <h3 className="mt-8 mb-3 text-lg md:text-xl font-bold text-white">
          <span className="text-[#1E90FF]">·</span> {block.text}
        </h3>
      );
    case "ul":
      return (
        <ul className="my-5 space-y-2.5">
          {block.items.map((it, i) => (
            <li key={i} className="flex gap-3 text-[15px] text-slate-300 leading-relaxed">
              <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[#1E90FF] flex-shrink-0" />
              <span>{it}</span>
            </li>
          ))}
        </ul>
      );
    case "quote":
      return (
        <blockquote className="my-7 border-l-2 border-[#1E90FF] pl-5 italic text-slate-200">
          "{block.text}"
          {block.cite && <footer className="mt-2 not-italic text-xs text-slate-500">— {block.cite}</footer>}
        </blockquote>
      );
    case "table":
      return (
        <div className="my-8 overflow-x-auto rounded-xl border border-white/10">
          <table className="w-full text-sm">
            <thead className="bg-white/[0.03]">
              <tr>
                {block.headers.map((h, i) => (
                  <th
                    key={i}
                    className={`px-4 py-3 text-[10px] uppercase tracking-widest font-bold text-slate-400 ${
                      i === 0 ? "text-left" : "text-center"
                    }`}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {block.rows.map((row, i) => (
                <tr key={i} className="hover:bg-white/[0.02] transition">
                  {row.map((cell, j) => (
                    <td
                      key={j}
                      className={`px-4 py-3 ${
                        j === 0
                          ? "text-left text-slate-300 font-semibold"
                          : "text-center font-mono text-white"
                      }`}
                    >
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    case "callout": {
      const map = {
        info: { ring: "border-[#1E90FF]/30 bg-[#1E90FF]/[0.06]", icon: Sparkles, color: "text-[#1E90FF]" },
        warning: { ring: "border-amber-400/30 bg-amber-500/[0.06]", icon: AlertTriangle, color: "text-amber-300" },
        success: { ring: "border-emerald-400/30 bg-emerald-500/[0.06]", icon: CheckCircle2, color: "text-emerald-300" },
      } as const;
      const cfg = map[block.tone];
      const Icon = cfg.icon;
      return (
        <div className={`my-8 rounded-2xl border p-5 md:p-6 ${cfg.ring}`}>
          <div className="flex items-center gap-2 mb-2">
            <Icon className={`h-4 w-4 ${cfg.color}`} />
            <div className={`text-sm font-black uppercase tracking-wide ${cfg.color}`}>{block.title}</div>
          </div>
          <p className="text-sm text-slate-300 leading-relaxed">{block.text}</p>
        </div>
      );
    }
    default:
      return null;
  }
}

// silence unused
void ({} as Article);
