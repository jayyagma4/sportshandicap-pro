import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowRight, Lock, Mail, ShieldCheck } from "lucide-react";
import { signIn } from "@/lib/portalAuth";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Sign In | Sportshandicapper Terminal" },
      { name: "description", content: "Sign in to your handicapping terminal." },
    ],
  }),
  component: LoginPage,
});

function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("jay.yagma@inspin.com");
  const [password, setPassword] = useState("demo");
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    signIn(email);
    setTimeout(() => navigate({ to: "/portal" }), 250);
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-[1.1fr_1fr]">
      {/* Left brand panel */}
      <div className="relative hidden lg:flex flex-col justify-between p-10 border-r border-white/5 bg-[#070912] overflow-hidden">
        <div className="absolute inset-0 opacity-[0.06] pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.7) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.7) 1px, transparent 1px)",
            backgroundSize: "44px 44px",
          }}
        />
        <div className="relative">
          <div className="text-[11px] tracking-[0.3em] text-amber-300/90 font-bold">INSPIN // TERMINAL</div>
          <div className="mt-2 text-xs tracking-[0.2em] text-slate-500 font-mono-num">SECURE ACCESS · v3.21</div>
        </div>

        <div className="relative max-w-md">
          <h1 className="text-5xl xl:text-6xl font-black tracking-tight text-white leading-[1.02]">
            Sign in to your <span className="text-amber-300">desk</span>.
          </h1>
          <p className="mt-5 text-sm text-slate-400 leading-relaxed">
            Live picks, capital tracking, market dispatches and your private analyst feed.
            Authenticated sessions are logged and timestamped for audit.
          </p>

          <div className="mt-10 grid grid-cols-3 gap-3">
            {[
              { k: "UPTIME", v: "99.98%" },
              { k: "ANALYSTS", v: "24" },
              { k: "WIN RATE", v: "62.4%" },
            ].map((s) => (
              <div key={s.k} className="terminal-panel rounded-sm p-3">
                <div className="text-[10px] tracking-[0.18em] text-slate-500">{s.k}</div>
                <div className="text-lg font-black text-white font-mono-num">{s.v}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="relative text-[10px] tracking-[0.2em] text-slate-600 flex items-center gap-2">
          <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
          ENCRYPTED CHANNEL · TLS 1.3
        </div>
      </div>

      {/* Right form */}
      <div className="flex items-center justify-center p-6 sm:p-10 bg-[#0A0C18]">
        <form onSubmit={onSubmit} className="terminal-panel rounded-sm w-full max-w-md">
          <div className="terminal-panel-header">
            <div className="flex items-center gap-2">
              <span className="led-dot bg-amber-400 text-amber-400" />
              <span className="text-white">OPERATOR LOGIN</span>
            </div>
            <span className="text-slate-600">FORM / SECURE</span>
          </div>

          <div className="p-6 space-y-5">
            <div>
              <label className="text-[10px] tracking-[0.2em] text-slate-500">EMAIL</label>
              <div className="mt-1.5 flex items-center gap-2 border border-white/10 bg-black/30 px-3 h-11 focus-within:border-amber-300/40">
                <Mail className="h-4 w-4 text-slate-500" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@inspin.com"
                  className="bg-transparent w-full outline-none text-sm text-white placeholder:text-slate-600"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label className="text-[10px] tracking-[0.2em] text-slate-500">PASSWORD</label>
                <a className="text-[10px] tracking-[0.18em] text-amber-300 hover:text-amber-200 cursor-pointer">FORGOT?</a>
              </div>
              <div className="mt-1.5 flex items-center gap-2 border border-white/10 bg-black/30 px-3 h-11 focus-within:border-amber-300/40">
                <Lock className="h-4 w-4 text-slate-500" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="bg-transparent w-full outline-none text-sm text-white placeholder:text-slate-600"
                />
              </div>
            </div>

            <label className="flex items-center gap-2 text-[11px] tracking-wide text-slate-400 select-none cursor-pointer">
              <input type="checkbox" defaultChecked className="accent-amber-400" />
              Keep me signed in on this terminal
            </label>

            <button
              type="submit"
              disabled={loading}
              className="w-full h-11 bg-amber-300 hover:bg-amber-200 text-black font-bold tracking-[0.18em] text-[12px] flex items-center justify-center gap-2 transition disabled:opacity-60"
            >
              {loading ? "AUTHENTICATING…" : "ENTER TERMINAL"} <ArrowRight className="h-4 w-4" />
            </button>

            <div className="text-[11px] text-slate-500 text-center pt-2 border-t border-white/5">
              Demo build — any email + password lets you in.
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
