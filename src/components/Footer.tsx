import logo from "@/assets/logo.png";

export function Footer() {
  return (
    <footer className="relative mt-32 border-t border-white/10 bg-black/30 backdrop-blur-xl">
      <div className="container-x py-16">
        <div className="grid gap-12 md:grid-cols-4">
          <div className="md:col-span-2">
            <img src={logo} alt="Sportshandicapper" className="h-12 w-auto mb-4" />
            <p className="text-slate-400 text-sm max-w-md leading-relaxed">
              Expert sports analysis and verified picks across the major leagues. Built for serious
              bettors who demand data over hype.
            </p>
          </div>
          <div>
            <div className="eyebrow mb-4">Product</div>
            <ul className="space-y-2 text-sm text-slate-300">
              <li><a href="/packages" className="hover:text-white">Packages</a></li>
              <li><a href="/picks" className="hover:text-white">Today's Picks</a></li>
              <li><a href="#how" className="hover:text-white">How it works</a></li>
            </ul>
          </div>
          <div>
            <div className="eyebrow mb-4">Legal</div>
            <ul className="space-y-2 text-sm text-slate-300">
              <li><a href="#terms" className="hover:text-white">Terms</a></li>
              <li><a href="#privacy" className="hover:text-white">Privacy</a></li>
              <li><a href="#responsible" className="hover:text-white">Responsible play</a></li>
            </ul>
          </div>
        </div>
        <div className="divider-glow my-10" />
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 text-xs text-slate-500">
          <div>© {new Date().getFullYear()} Sportshandicapper. All rights reserved.</div>
          <div className="max-w-2xl text-right md:text-right">
            For entertainment purposes only. Must be 21+ to participate. If you or someone you know
            has a gambling problem, call 1-800-GAMBLER.
          </div>
        </div>
      </div>
    </footer>
  );
}
