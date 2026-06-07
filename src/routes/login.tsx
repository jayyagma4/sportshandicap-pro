import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowRight, Lock, Mail, ShieldCheck, ArrowLeft } from "lucide-react";
import { signIn } from "@/lib/portalAuth";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Sign In | Sportshandicapper Dashboard" },
      { name: "description", content: "Sign in to your handicapping dashboard." },
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
    <div className="portal-theme min-h-screen grid lg:grid-cols-[1.05fr_1fr]">
      {/* Left brand panel */}
      <div className="relative hidden lg:flex flex-col justify-between p-12 bg-[#05070D] text-white overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.06] pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.9) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.9) 1px, transparent 1px)",
            backgroundSize: "44px 44px",
          }}
        />
        <div
          className="absolute -bottom-32 -right-32 w-[460px] h-[460px] rounded-full opacity-30"
          style={{ background: "var(--p-blue)" }}
        />
        <div
          className="absolute -top-24 -left-20 w-[320px] h-[320px] rounded-full opacity-20"
          style={{ background: "var(--p-purple)" }}
        />

        <div className="relative flex items-center gap-2">
          <span className="w-9 h-9 rounded-lg bg-[var(--p-blue)] grid place-items-center font-black">
            i
          </span>
          <span className="font-bold tracking-tight">INSPIN</span>
          <span className="text-[10px] tracking-[0.2em] text-[var(--p-purple)]/90 font-bold ml-2">
            DASHBOARD
          </span>
        </div>

        <div className="relative max-w-md">
          <h1 className="text-5xl xl:text-6xl font-bold tracking-tight leading-[1.05]">
            Sign in to your{" "}
            <span className="text-[var(--p-blue)]">desk</span>.
          </h1>
          <p className="mt-5 text-[15px] text-white/70 leading-relaxed">
            Live picks, capital tracking, market dispatches, and your private
            analyst feed, all in one clean workspace.
          </p>

          <div className="mt-10 grid grid-cols-3 gap-3">
            {[
              { k: "Uptime", v: "99.98%" },
              { k: "Analysts", v: "24" },
              { k: "Win Rate", v: "62.4%" },
            ].map((s) => (
              <div
                key={s.k}
                className="rounded-xl p-3 bg-white/[0.05] border border-white/10"
              >
                <div className="text-[10px] tracking-[0.18em] text-white/50 font-semibold">
                  {s.k.toUpperCase()}
                </div>
                <div className="p-stat-num text-lg mt-0.5">{s.v}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="relative text-[11px] tracking-[0.18em] text-white/40 flex items-center gap-2">
          <ShieldCheck className="h-3.5 w-3.5 text-[var(--p-blue)]" />
          ENCRYPTED CHANNEL · TLS 1.3
        </div>
      </div>

      {/* Right form */}
      <div className="flex items-center justify-center p-6 sm:p-10">
        <div className="w-full max-w-md">
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-[12px] font-semibold text-[var(--p-text-muted)] hover:text-[var(--p-blue)] mb-8"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> Back to inspin.com
          </Link>

          <h2 className="text-3xl font-bold tracking-tight">Welcome back</h2>
          <p className="mt-1.5 text-[15px] text-[var(--p-text-muted)]">
            Sign in to continue to your dashboard.
          </p>

          <form onSubmit={onSubmit} className="mt-8 space-y-5">
            <div>
              <label className="text-[12px] font-semibold text-[var(--p-text-muted)]">
                Email
              </label>
              <div className="mt-1.5 flex items-center gap-2 p-input">
                <Mail className="h-4 w-4 text-[var(--p-text-faint)]" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@inspin.com"
                  className="bg-transparent w-full outline-none text-sm"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label className="text-[12px] font-semibold text-[var(--p-text-muted)]">
                  Password
                </label>
                <a className="text-[12px] font-semibold text-[var(--p-blue)] hover:text-[var(--p-blue-hover)] cursor-pointer">
                  Forgot?
                </a>
              </div>
              <div className="mt-1.5 flex items-center gap-2 p-input">
                <Lock className="h-4 w-4 text-[var(--p-text-faint)]" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="bg-transparent w-full outline-none text-sm"
                />
              </div>
            </div>

            <label className="flex items-center gap-2 text-[13px] text-[var(--p-text-muted)] select-none cursor-pointer">
              <input
                type="checkbox"
                defaultChecked
                className="accent-[var(--p-blue)] h-4 w-4"
              />
              Keep me signed in on this device
            </label>

            <button
              type="submit"
              disabled={loading}
              className="p-btn w-full h-12 disabled:opacity-60"
            >
              {loading ? "Signing in…" : "Sign in to dashboard"}{" "}
              <ArrowRight className="h-4 w-4" />
            </button>

            <div className="text-[12px] text-[var(--p-text-faint)] text-center pt-3 border-t border-[var(--p-border)]">
              Demo build, any email + password works.
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
