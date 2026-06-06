import { Link } from "@tanstack/react-router";
import { ArrowRight, Bell, type LucideIcon } from "lucide-react";
import { ScrollReveal } from "./ScrollReveal";

export type ComingSoonProps = {
  eyebrow: string;
  title: string;
  highlight: string;
  description: string;
  icon: LucideIcon;
  features: { title: string; body: string }[];
  eta?: string;
};

export function ComingSoon({
  eyebrow,
  title,
  highlight,
  description,
  icon: Icon,
  features,
  eta = "Q2 2026",
}: ComingSoonProps) {
  return (
    <div className="container-x pt-10 pb-32">
      {/* HERO */}
      <ScrollReveal>
        <section className="relative grid lg:grid-cols-12 gap-10 items-end pt-10 pb-16 border-b border-white/10">
          <div className="lg:col-span-7">
            <div className="flex items-center gap-3 text-[10px] uppercase tracking-[0.3em] text-slate-400 font-semibold">
              <span className="h-px w-10 bg-cyan-300/60" />
              <span>{eyebrow}</span>
              <span className="ml-2 inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-white/[0.03] border border-white/10 text-slate-300">
                Coming {eta}
              </span>
            </div>
            <h1
              className="mt-8 text-[clamp(2.5rem,6vw,4.5rem)] font-bold text-white leading-[1.02]"
              style={{ fontFamily: "'Orbitron', sans-serif", letterSpacing: "-0.01em" }}
            >
              {title}{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-sky-300 to-indigo-300">
                {highlight}
              </span>
            </h1>
          </div>

          <div className="lg:col-span-5">
            <div className="relative">
              <div className="absolute -inset-6 bg-gradient-to-br from-cyan-400/10 to-indigo-500/10 blur-3xl rounded-full" />
              <div className="relative rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.05] to-white/[0.01] p-8 backdrop-blur-xl">
                <div className="h-14 w-14 rounded-2xl bg-cyan-400/10 border border-cyan-400/20 flex items-center justify-center">
                  <Icon className="h-6 w-6 text-cyan-300" />
                </div>
                <p className="mt-5 text-slate-300 leading-relaxed">{description}</p>
              </div>
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* PROGRESS STRIP */}
      <ScrollReveal>
        <section className="border-b border-white/10 py-10">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <div className="text-[10px] tracking-[0.3em] uppercase text-cyan-300 font-bold">
                Build Progress
              </div>
              <div
                className="mt-2 text-2xl font-bold text-white"
                style={{ fontFamily: "'Orbitron', sans-serif" }}
              >
                In active development
              </div>
            </div>
            <div className="text-right">
              <div
                className="text-3xl font-bold text-white tabular-nums"
                style={{ fontFamily: "'Orbitron', sans-serif" }}
              >
                72<span className="text-cyan-300">%</span>
              </div>
              <div className="text-[11px] uppercase tracking-[0.2em] text-slate-400 font-semibold">
                Toward beta
              </div>
            </div>
          </div>
          <div className="mt-6 h-1.5 rounded-full bg-white/[0.05] overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-cyan-300 via-sky-300 to-indigo-300 rounded-full"
              style={{ width: "72%" }}
            />
          </div>
          <div className="mt-3 grid grid-cols-4 text-[10px] uppercase tracking-[0.2em] text-slate-500 font-semibold">
            <div className="text-cyan-300">Research</div>
            <div className="text-cyan-300">Design</div>
            <div className="text-cyan-300">Build</div>
            <div className="text-right">Beta</div>
          </div>
        </section>
      </ScrollReveal>

      {/* FEATURES */}
      <ScrollReveal>
        <section className="py-24 border-b border-white/10">
          <div className="text-[10px] tracking-[0.3em] uppercase text-cyan-300 font-bold">
            What's Inside
          </div>
          <h2
            className="mt-3 text-4xl font-bold text-white max-w-2xl"
            style={{ fontFamily: "'Orbitron', sans-serif" }}
          >
            A preview of what's shipping.
          </h2>

          <div className="mt-12 grid md:grid-cols-3 gap-px bg-white/10 rounded-3xl overflow-hidden border border-white/10">
            {features.map((f, i) => (
              <div
                key={f.title}
                className="bg-[#0A0C1C] p-8 hover:bg-[#0E1126] transition"
              >
                <div className="flex items-center justify-between">
                  <span
                    className="text-xs text-slate-500"
                    style={{ fontFamily: "'Orbitron', sans-serif" }}
                  >
                    0{i + 1}
                  </span>
                  <span className="text-[10px] uppercase tracking-[0.2em] text-slate-500 font-semibold">
                    Planned
                  </span>
                </div>
                <h3
                  className="mt-6 text-xl font-bold text-white"
                  style={{ fontFamily: "'Orbitron', sans-serif" }}
                >
                  {f.title}
                </h3>
                <p className="mt-3 text-[15px] text-slate-400 leading-relaxed">{f.body}</p>
              </div>
            ))}
          </div>
        </section>
      </ScrollReveal>

      {/* NOTIFY CTA */}
      <ScrollReveal>
        <section className="py-20">
          <div className="relative overflow-hidden rounded-[28px] border border-white/10 bg-gradient-to-br from-indigo-500/10 via-[#0A0C1C] to-cyan-400/10 p-10 md:p-14">
            <div className="absolute -top-32 -right-20 h-80 w-80 rounded-full bg-cyan-400/15 blur-[120px]" />
            <div className="absolute -bottom-32 -left-20 h-80 w-80 rounded-full bg-indigo-500/15 blur-[120px]" />

            <div className="relative grid lg:grid-cols-12 gap-10 items-center">
              <div className="lg:col-span-7">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyan-300/30 bg-cyan-300/10 text-cyan-200 text-[11px] uppercase tracking-[0.25em] font-bold">
                  <Bell className="h-3.5 w-3.5" />
                  Get Notified
                </div>
                <h2
                  className="mt-6 text-4xl md:text-5xl font-bold text-white leading-tight"
                  style={{ fontFamily: "'Orbitron', sans-serif" }}
                >
                  Be first in line when{" "}
                  <span className="text-cyan-300">we go live.</span>
                </h2>
                <p className="mt-5 text-slate-300 leading-relaxed max-w-xl">
                  Members get early access to every new tool we ship. Pick a package
                  today and your seat is reserved automatically.
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <Link to="/packages" className="btn-primary">
                    Reserve access <ArrowRight className="h-4 w-4" />
                  </Link>
                  <Link to="/picks" className="btn-secondary">
                    Browse today's picks
                  </Link>
                </div>
              </div>

              <div className="lg:col-span-5">
                <div className="rounded-2xl border border-white/10 bg-black/40 backdrop-blur-xl p-6">
                  <div className="text-[10px] uppercase tracking-[0.25em] text-slate-400 font-bold">
                    Release Timeline
                  </div>
                  <div className="mt-5 space-y-4">
                    {[
                      { label: "Private alpha", state: "Done" },
                      { label: "Internal QA", state: "Done" },
                      { label: "Member beta", state: "In progress" },
                      { label: "Public launch", state: eta },
                    ].map((s, i) => (
                      <div key={s.label} className="flex items-center gap-3">
                        <div
                          className={`h-2.5 w-2.5 rounded-full ${
                            i < 2
                              ? "bg-cyan-300"
                              : i === 2
                              ? "bg-cyan-300/50 border border-cyan-300"
                              : "bg-white/10 border border-white/20"
                          }`}
                        />
                        <span className="text-sm text-slate-200 flex-1">{s.label}</span>
                        <span className="text-[10px] uppercase tracking-[0.2em] text-slate-400 font-semibold">
                          {s.state}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </ScrollReveal>
    </div>
  );
}
