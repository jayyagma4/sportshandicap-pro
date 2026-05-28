import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { BarChart3, ChevronDown, ArrowRight } from "lucide-react";
import { Logo } from "./Logo";
import { AuthModal, type AuthMode } from "./AuthModal";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState<AuthMode>("login");

  const openAuth = (mode: AuthMode) => {
    setAuthMode(mode);
    setAuthOpen(true);
  };

  return (
    <>
    <header className="fixed top-4 left-0 right-0 z-50">
      <div className="container-x">
        <nav
          className="flex items-center justify-between gap-4 rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-2.5 backdrop-blur-2xl"
          style={{ boxShadow: "0 10px 40px -10px rgba(99,102,241,0.25)" }}
        >
          <Link to="/" className="flex items-center gap-2" aria-label="Sportshandicapper home">
            <Logo height={40} />
          </Link>

          <div className="hidden lg:flex items-center gap-1 rounded-full bg-white/[0.02] px-2 py-1.5 border border-white/5">
            <Link
              to="/articles"
              className="flex items-center gap-2 px-3 py-1.5 text-sm text-slate-200 hover:text-white rounded-full hover:bg-white/5 transition"
            >
              Exclusive Articles
              <span className="text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded bg-cyan-500/20 text-cyan-200 text-white">
                New
              </span>
            </Link>
            <Link
              to="/picks"
              className="flex items-center gap-2 px-3 py-1.5 text-sm text-slate-200 hover:text-white rounded-full hover:bg-white/5 transition"
            >
              <span className="relative h-2 w-2 rounded-full bg-emerald-400 ping-soft" />
              Picks
            </Link>
            <Link
              to="/packages"
              className="px-3 py-1.5 text-sm text-slate-200 hover:text-white rounded-full hover:bg-white/5 transition"
            >
              Packages
            </Link>
            <div
              className="relative"
              onMouseEnter={() => setOpen(true)}
              onMouseLeave={() => setOpen(false)}
            >
              <button className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-slate-200 hover:text-white rounded-full hover:bg-white/5 transition">
                <BarChart3 className="h-3.5 w-3.5" />
                Data & Tools
                <ChevronDown className="h-3.5 w-3.5" />
              </button>
              {open && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-56 rounded-2xl border border-white/10 bg-[#0A0C1C]/95 backdrop-blur-2xl p-2 shadow-2xl">
                  {["Betting Tools", "Live Odds", "Consensus", "Trends"].map((item) => (
                    <div
                      key={item}
                      className="flex items-center justify-between px-3 py-2 text-sm text-slate-300 hover:bg-white/5 rounded-lg cursor-not-allowed"
                    >
                      {item}
                      <span className="text-[10px] font-semibold uppercase tracking-wider px-1.5 py-0.5 rounded bg-white/10 text-slate-400">
                        Soon
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <a
              href="#about"
              className="px-3 py-1.5 text-sm text-slate-200 hover:text-white rounded-full hover:bg-white/5 transition"
            >
              About Us
            </a>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => openAuth("login")}
              className="hidden sm:block text-sm text-slate-200 hover:text-white"
            >
              Log In
            </button>
            <button onClick={() => openAuth("signup")} className="btn-primary !py-2 !px-4 !text-sm">
              Join Now <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </nav>
      </div>
    </header>
    <AuthModal
      open={authOpen}
      mode={authMode}
      onClose={() => setAuthOpen(false)}
      onModeChange={setAuthMode}
    />
    </>
  );
}
