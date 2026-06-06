import { Link } from "@tanstack/react-router";
import { ArrowLeft, type LucideIcon } from "lucide-react";

export type ComingSoonProps = {
  eyebrow: string;
  title: string;
  description: string;
  icon: LucideIcon;
};

export function ComingSoon({ eyebrow, title, description, icon: Icon }: ComingSoonProps) {
  return (
    <div className="container-x min-h-[80vh] flex items-center justify-center py-24">
      <div className="relative max-w-xl w-full text-center">
        <div className="absolute -inset-20 bg-gradient-to-br from-cyan-400/10 via-transparent to-indigo-500/10 blur-3xl rounded-full pointer-events-none" />

        <div className="relative">
          <div className="mx-auto h-16 w-16 rounded-2xl bg-cyan-400/10 border border-cyan-400/20 flex items-center justify-center">
            <Icon className="h-7 w-7 text-cyan-300" />
          </div>

          <div className="mt-8 inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/[0.03] text-[10px] uppercase tracking-[0.3em] text-slate-400 font-semibold">
            {eyebrow}
          </div>

          <h1
            className="mt-6 text-5xl md:text-6xl font-bold text-white leading-[1.05]"
            style={{ fontFamily: "'Orbitron', sans-serif", letterSpacing: "-0.01em" }}
          >
            {title}
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-sky-300 to-indigo-300">
              Coming Soon
            </span>
          </h1>

          <p className="mt-6 text-slate-400 leading-relaxed">{description}</p>

          <div className="mt-10">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-sm text-slate-300 hover:text-white transition"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
