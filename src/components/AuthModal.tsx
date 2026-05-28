import { useEffect, useState } from "react";
import { X, Eye, EyeOff, ArrowRight, Check } from "lucide-react";
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
  const [agree, setAgree] = useState(false);

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
      <div className="absolute inset-0 bg-[#03050F]/85 backdrop-blur-xl" />

      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-md card-premium animate-in zoom-in-95 slide-in-from-bottom-4 duration-300"
      >
        <div className="absolute top-0 left-0 right-0 h-px bg-[#1E90FF]/50" />

        <button
          onClick={onClose}
          className="absolute top-4 right-4 h-8 w-8 rounded-md bg-white/5 border border-white/10 hover:bg-white/10 flex items-center justify-center text-slate-400 hover:text-white transition"
          aria-label="Close"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="p-7 sm:p-9">
          <div className="flex items-center gap-2.5 mb-7">
            <img src={logo} alt="Sportshandicapper" className="h-7 w-auto" />
          </div>

          <div className="eyebrow text-[#1E90FF] mb-2">
            {isLogin ? "Member Access" : "Join the Edge"}
          </div>
          <h3 className="text-2xl font-black text-white tracking-tight">
            {isLogin ? "Sign in to your account" : "Create your account"}
          </h3>
          <p className="mt-2 text-sm text-slate-400">
            {isLogin
              ? "Access today's board and your tracked bankroll."
              : "Start a free trial. Cancel anytime."}
          </p>

          {/* Tabs */}
          <div className="mt-6 grid grid-cols-2 p-1 rounded-md border border-white/10 bg-black/30">
            <button
              onClick={() => onModeChange("login")}
              className={`py-2 text-[11px] font-bold uppercase tracking-widest rounded transition ${
                isLogin ? "bg-[#1E90FF] text-white" : "text-slate-400 hover:text-white"
              }`}
            >
              Log In
            </button>
            <button
              onClick={() => onModeChange("signup")}
              className={`py-2 text-[11px] font-bold uppercase tracking-widest rounded transition ${
                !isLogin ? "bg-[#1E90FF] text-white" : "text-slate-400 hover:text-white"
              }`}
            >
              Join
            </button>
          </div>

          <form
            className="mt-5 space-y-3"
            onSubmit={(e) => {
              e.preventDefault();
              onClose();
            }}
          >
            {!isLogin && (
              <Field type="text" placeholder="Full name" autoComplete="name" label="Name" />
            )}
            <Field type="email" placeholder="you@email.com" autoComplete="email" label="Email" />
            <Field
              type={showPwd ? "text" : "password"}
              placeholder="••••••••"
              autoComplete={isLogin ? "current-password" : "new-password"}
              label="Password"
              trailing={
                <button
                  type="button"
                  onClick={() => setShowPwd((v) => !v)}
                  className="text-slate-500 hover:text-white transition"
                  tabIndex={-1}
                >
                  {showPwd ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              }
            />

            {isLogin ? (
              <div className="flex items-center justify-between text-xs pt-1">
                <label className="flex items-center gap-2 cursor-pointer select-none text-slate-400">
                  <Checkbox checked={remember} onChange={setRemember} />
                  Remember me
                </label>
                <a href="#forgot" className="text-cyan-300 hover:text-white font-semibold">
                  Forgot password?
                </a>
              </div>
            ) : (
              <label className="flex items-start gap-2 text-xs text-slate-400 cursor-pointer pt-1">
                <Checkbox checked={agree} onChange={setAgree} />
                <span>
                  I agree to the{" "}
                  <a href="#tos" className="text-cyan-300 hover:underline">Terms</a> and{" "}
                  <a href="#privacy" className="text-cyan-300 hover:underline">Privacy Policy</a>.
                </span>
              </label>
            )}

            <button
              type="submit"
              disabled={!isLogin && !agree}
              className="btn-primary w-full !py-3 mt-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLogin ? "Log In" : "Create Account"}
              <ArrowRight className="h-4 w-4" />
            </button>

            <div className="flex items-center gap-3 py-1">
              <div className="flex-1 divider-glow" />
              <span className="text-[10px] uppercase tracking-widest text-slate-600">or</span>
              <div className="flex-1 divider-glow" />
            </div>

            <div className="grid grid-cols-2 gap-2.5">
              <SocialBtn provider="Google" />
              <SocialBtn provider="Apple" />
            </div>

            <p className="text-center text-xs text-slate-500 pt-2">
              {isLogin ? (
                <>
                  No account?{" "}
                  <button
                    type="button"
                    onClick={() => onModeChange("signup")}
                    className="text-cyan-300 hover:text-white font-semibold"
                  >
                    Join now
                  </button>
                </>
              ) : (
                <>
                  Already a member?{" "}
                  <button
                    type="button"
                    onClick={() => onModeChange("login")}
                    className="text-cyan-300 hover:text-white font-semibold"
                  >
                    Log in
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
  label,
  trailing,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  trailing?: React.ReactNode;
}) {
  return (
    <div>
      <label className="block text-[10px] uppercase tracking-widest font-bold text-slate-500 mb-1.5">
        {label}
      </label>
      <div className="relative">
        <input
          {...props}
          className="w-full h-11 rounded-md bg-black/30 border border-white/10 px-3.5 pr-10 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-[#1E90FF]/60 focus:bg-black/40 transition"
        />
        {trailing && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center">{trailing}</div>
        )}
      </div>
    </div>
  );
}

function Checkbox({ checked, onChange }: { checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <button
      type="button"
      onClick={() => onChange(!checked)}
      className={`relative h-4 w-4 rounded-[4px] border flex items-center justify-center transition flex-shrink-0 mt-0.5 ${
        checked ? "bg-[#1E90FF] border-transparent" : "border-white/20 bg-black/30 hover:border-white/40"
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
      className="h-10 rounded-md border border-white/10 bg-white/[0.02] hover:bg-white/[0.06] hover:border-white/20 text-xs font-bold uppercase tracking-widest text-slate-200 flex items-center justify-center gap-2 transition"
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
