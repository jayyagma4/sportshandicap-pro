import { useEffect, useState } from "react";
import {
  X,
  Mail,
  Lock,
  User,
  Eye,
  EyeOff,
  ArrowRight,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  Trophy,
  Check,
} from "lucide-react";
import logo from "@/assets/logo.png";

export type AuthMode = "login" | "signup";

interface AuthModalProps {
  open: boolean;
  mode: AuthMode;
  onClose: () => void;
  onModeChange: (mode: AuthMode) => void;
}

export function AuthModal({ open, mode, onClose, onModeChange }: AuthModalProps) {
  const [showPwd, setShowPwd] = useState(false);
  const [remember, setRemember] = useState(true);
  const [agreeTos, setAgreeTos] = useState(false);
  const [agreePrivacy, setAgreePrivacy] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open) return null;

  const isLogin = mode === "login";

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 animate-in fade-in duration-200"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-[#03050F]/85 backdrop-blur-xl" />
      {/* Aurora glow behind modal */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[720px] h-[720px] rounded-full blur-[140px] opacity-40"
          style={{
            background:
              "conic-gradient(from 0deg, #1E90FF, #22D3EE, #A855F7, #1E90FF)",
          }}
        />
      </div>

      {/* Modal */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-5xl grid md:grid-cols-[1.05fr_1fr] rounded-3xl overflow-hidden border border-white/10 bg-gradient-to-br from-[#0D1224]/95 via-[#0A0C1C]/95 to-[#0D1224]/95 shadow-[0_40px_120px_-20px_rgba(30,144,255,0.35)] animate-in zoom-in-95 slide-in-from-bottom-4 duration-300"
      >
        {/* Top gradient strip */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent" />

        {/* LEFT — Brand panel */}
        <div className="relative hidden md:flex flex-col justify-between p-10 bg-gradient-to-br from-[#0A0F22] via-[#0B1430] to-[#0A0C1C] overflow-hidden">
          <div
            className="absolute -top-20 -left-20 w-[380px] h-[380px] rounded-full blur-[110px] opacity-50"
            style={{ background: "#1E90FF" }}
          />
          <div
            className="absolute -bottom-24 -right-16 w-[340px] h-[340px] rounded-full blur-[110px] opacity-40"
            style={{ background: "#A855F7" }}
          />
          <div className="absolute inset-0 opacity-[0.04]" style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
            backgroundSize: "24px 24px",
          }} />

          <div className="relative">
            <img src={logo} alt="Sportshandicapper" className="h-10 w-auto" />
            <div className="mt-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[11px] uppercase tracking-widest text-slate-300">
                <span className="relative h-1.5 w-1.5 rounded-full bg-emerald-400 ping-soft" />
                Verified Picks · Live
              </div>
              <h2 className="mt-5 text-4xl font-extrabold leading-tight">
                <span className="gradient-text">Sharper picks.</span>
                <br />
                <span className="text-white">Smarter bankroll.</span>
              </h2>
              <p className="mt-4 text-slate-400 text-sm leading-relaxed max-w-sm">
                Join thousands of bettors winning with timestamped, graded picks from verified
                handicappers — across every major league.
              </p>
            </div>
          </div>

          <div className="relative space-y-3 mt-10">
            {[
              { icon: TrendingUp, label: "+184u YTD verified profit" },
              { icon: ShieldCheck, label: "100% timestamped & graded" },
              { icon: Trophy, label: "Top 1% capper leaderboard" },
            ].map((f) => (
              <div
                key={f.label}
                className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-2.5"
              >
                <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-[#1E90FF]/30 to-[#A855F7]/30 border border-white/10 flex items-center justify-center">
                  <f.icon className="h-4 w-4 text-cyan-300" />
                </div>
                <span className="text-sm text-slate-200">{f.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT — Form */}
        <div className="relative p-6 sm:p-10">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 h-9 w-9 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 flex items-center justify-center text-slate-300 hover:text-white transition"
            aria-label="Close"
          >
            <X className="h-4 w-4" />
          </button>

          <div className="md:hidden flex items-center justify-center mb-4">
            <img src={logo} alt="Sportshandicapper" className="h-9 w-auto" />
          </div>

          <div className="text-center md:text-left">
            <div className="eyebrow text-indigo-300 flex items-center gap-2 justify-center md:justify-start">
              <Sparkles className="h-3 w-3" />
              {isLogin ? "Welcome back" : "Join the edge"}
            </div>
            <h3 className="mt-2 text-3xl font-extrabold text-white">
              {isLogin ? "Sign in to your account" : "Create your account"}
            </h3>
            <p className="mt-1.5 text-sm text-slate-400">
              {isLogin
                ? "Access today's picks and your tracked bankroll."
                : "Start with a free trial — cancel anytime."}
            </p>
          </div>

          {/* Tabs */}
          <div className="mt-6 relative grid grid-cols-2 p-1 rounded-full border border-white/10 bg-white/[0.03]">
            <span
              className="absolute top-1 bottom-1 w-[calc(50%-4px)] rounded-full bg-gradient-to-r from-[#1E90FF] to-[#A855F7] shadow-[0_8px_24px_-8px_rgba(30,144,255,0.7)] transition-transform duration-300"
              style={{ transform: isLogin ? "translateX(4px)" : "translateX(calc(100% + 4px))" }}
            />
            <button
              onClick={() => onModeChange("login")}
              className={`relative z-10 py-2.5 text-sm font-semibold transition-colors ${
                isLogin ? "text-white" : "text-slate-300 hover:text-white"
              }`}
            >
              Log In
            </button>
            <button
              onClick={() => onModeChange("signup")}
              className={`relative z-10 py-2.5 text-sm font-semibold transition-colors ${
                !isLogin ? "text-white" : "text-slate-300 hover:text-white"
              }`}
            >
              Join Now
            </button>
          </div>

          {/* Form */}
          <form
            className="mt-6 space-y-4"
            onSubmit={(e) => {
              e.preventDefault();
              onClose();
            }}
          >
            {!isLogin && (
              <Field icon={User} type="text" placeholder="Full name" autoComplete="name" />
            )}
            <Field icon={Mail} type="email" placeholder="Email address" autoComplete="email" />
            <Field
              icon={Lock}
              type={showPwd ? "text" : "password"}
              placeholder="Password"
              autoComplete={isLogin ? "current-password" : "new-password"}
              trailing={
                <button
                  type="button"
                  onClick={() => setShowPwd((v) => !v)}
                  className="text-slate-400 hover:text-white transition"
                  tabIndex={-1}
                >
                  {showPwd ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              }
            />

            {isLogin ? (
              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2 cursor-pointer select-none text-slate-300">
                  <Checkbox checked={remember} onChange={setRemember} />
                  Remember me
                </label>
                <a href="#forgot" className="text-cyan-300 hover:text-cyan-200 font-medium">
                  Forgot password?
                </a>
              </div>
            ) : (
              <div className="space-y-2 rounded-xl border border-amber-400/20 bg-amber-400/[0.04] p-3">
                <div className="text-[11px] font-bold uppercase tracking-widest text-amber-300">
                  This is not a gambling site
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Information is for entertainment purposes only. Past performance is not a
                  guarantee of future results.
                </p>
                <div className="space-y-1.5 pt-1">
                  <label className="flex items-start gap-2 text-xs text-slate-300 cursor-pointer">
                    <Checkbox checked={agreeTos} onChange={setAgreeTos} />
                    <span>
                      I agree to the{" "}
                      <a href="#tos" className="text-cyan-300 hover:underline">
                        Terms of Service
                      </a>
                    </span>
                  </label>
                  <label className="flex items-start gap-2 text-xs text-slate-300 cursor-pointer">
                    <Checkbox checked={agreePrivacy} onChange={setAgreePrivacy} />
                    <span>
                      I agree to the{" "}
                      <a href="#privacy" className="text-cyan-300 hover:underline">
                        Privacy Policy
                      </a>
                    </span>
                  </label>
                </div>
              </div>
            )}

            <button
              type="submit"
              disabled={!isLogin && (!agreeTos || !agreePrivacy)}
              className="btn-primary w-full !py-3 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLogin ? "Log In" : "Create Account"}
              <ArrowRight className="h-4 w-4" />
            </button>

            {/* Divider */}
            <div className="flex items-center gap-3 py-1">
              <div className="flex-1 divider-glow" />
              <span className="text-[11px] uppercase tracking-widest text-slate-500">or continue with</span>
              <div className="flex-1 divider-glow" />
            </div>

            {/* Social */}
            <div className="grid grid-cols-2 gap-3">
              <SocialBtn provider="Google" />
              <SocialBtn provider="Apple" />
            </div>

            <p className="text-center text-sm text-slate-400 pt-1">
              {isLogin ? (
                <>
                  Don't have an account?{" "}
                  <button
                    type="button"
                    onClick={() => onModeChange("signup")}
                    className="text-cyan-300 hover:text-cyan-200 font-semibold"
                  >
                    Join Now
                  </button>
                </>
              ) : (
                <>
                  Already have an account?{" "}
                  <button
                    type="button"
                    onClick={() => onModeChange("login")}
                    className="text-cyan-300 hover:text-cyan-200 font-semibold"
                  >
                    Log In
                  </button>
                </>
              )}
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

function Field({
  icon: Icon,
  trailing,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & {
  icon: React.ComponentType<{ className?: string }>;
  trailing?: React.ReactNode;
}) {
  return (
    <div className="group relative">
      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
        <Icon className="h-4 w-4 text-slate-500 group-focus-within:text-cyan-300 transition" />
      </div>
      <input
        {...props}
        className="w-full h-12 rounded-xl bg-white/[0.04] border border-white/10 pl-10 pr-11 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-cyan-400/50 focus:bg-white/[0.06] focus:ring-4 focus:ring-cyan-400/10 transition"
      />
      {trailing && (
        <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center">{trailing}</div>
      )}
    </div>
  );
}

function Checkbox({
  checked,
  onChange,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <button
      type="button"
      onClick={() => onChange(!checked)}
      className={`relative h-4 w-4 rounded-[5px] border flex items-center justify-center transition flex-shrink-0 mt-0.5 ${
        checked
          ? "bg-gradient-to-br from-[#1E90FF] to-[#A855F7] border-transparent"
          : "border-white/20 bg-white/[0.03] hover:border-white/40"
      }`}
      aria-checked={checked}
      role="checkbox"
    >
      {checked && <Check className="h-3 w-3 text-white" strokeWidth={3} />}
    </button>
  );
}

function SocialBtn({ provider }: { provider: "Google" | "Apple" }) {
  return (
    <button
      type="button"
      className="h-11 rounded-xl border border-white/10 bg-white/[0.03] hover:bg-white/[0.07] hover:border-white/20 text-sm text-slate-200 font-medium flex items-center justify-center gap-2 transition"
    >
      {provider === "Google" ? (
        <svg className="h-4 w-4" viewBox="0 0 48 48">
          <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3c-1.6 4.7-6.1 8-11.3 8-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.2 7.9 3l5.7-5.7C34 6.5 29.3 4.5 24 4.5 13.2 4.5 4.5 13.2 4.5 24S13.2 43.5 24 43.5 43.5 34.8 43.5 24c0-1.2-.1-2.3-.4-3.5z"/>
          <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.7 16 19 13 24 13c3.1 0 5.8 1.2 7.9 3l5.7-5.7C34 6.5 29.3 4.5 24 4.5 16.3 4.5 9.7 8.8 6.3 14.7z"/>
          <path fill="#4CAF50" d="M24 43.5c5.2 0 9.9-2 13.5-5.2l-6.2-5.2c-2 1.4-4.6 2.4-7.3 2.4-5.2 0-9.6-3.3-11.2-8l-6.5 5C9.5 39 16.2 43.5 24 43.5z"/>
          <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.3-2.3 4.3-4.3 5.7l6.2 5.2C40.9 36 43.5 30.5 43.5 24c0-1.2-.1-2.3-.4-3.5z"/>
        </svg>
      ) : (
        <svg className="h-4 w-4 fill-white" viewBox="0 0 24 24">
          <path d="M17.05 12.04c-.03-2.87 2.35-4.25 2.46-4.32-1.34-1.96-3.43-2.23-4.17-2.26-1.78-.18-3.47 1.05-4.37 1.05-.92 0-2.3-1.03-3.78-1-1.94.03-3.74 1.13-4.74 2.86-2.02 3.5-.52 8.69 1.45 11.54.96 1.39 2.11 2.96 3.6 2.9 1.45-.06 2-.94 3.75-.94s2.24.94 3.78.91c1.56-.03 2.55-1.42 3.5-2.82 1.1-1.62 1.56-3.18 1.59-3.26-.03-.01-3.05-1.17-3.07-4.66zM14.36 3.86c.81-.98 1.36-2.34 1.21-3.7-1.17.05-2.59.78-3.42 1.76-.75.86-1.4 2.24-1.22 3.58 1.3.1 2.62-.66 3.43-1.64z"/>
        </svg>
      )}
      {provider}
    </button>
  );
}
