import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { getSession } from "@/lib/portalAuth";
import { PortalHeader } from "./portal.index";

export const Route = createFileRoute("/portal/profile")({
  component: Profile,
});

function Profile() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");

  useEffect(() => {
    const s = getSession();
    if (s) { setEmail(s.email); setName(s.name); }
  }, []);

  return (
    <div className="p-6 lg:p-8 space-y-6">
      <PortalHeader title="My Profile" subtitle="My Profile." crumb="Identity, contact, and analyst preferences." />

      <div className="grid lg:grid-cols-[1fr_2fr] gap-3">
        <div className="terminal-panel rounded-sm p-6 text-center">
          <div className="w-20 h-20 mx-auto grid place-items-center bg-amber-500/15 border border-amber-400/30 text-amber-300 font-black text-3xl font-mono-num">
            {(name[0] || "J").toUpperCase()}
          </div>
          <div className="mt-4 text-white font-bold">{name || "Operator"}</div>
          <div className="text-[11px] tracking-[0.18em] text-amber-300 mt-0.5">★ ACCESS</div>
          <div className="mt-4 text-[10px] tracking-[0.18em] text-slate-500">JOINED JUN 07, 2026</div>
        </div>

        <div className="terminal-panel rounded-sm">
          <div className="terminal-panel-header">
            <span className="text-white">CONTACT</span>
            <span className="text-slate-600">EDITABLE</span>
          </div>
          <div className="p-6 grid sm:grid-cols-2 gap-5">
            <Field label="DISPLAY NAME" value={name} onChange={setName} />
            <Field label="EMAIL" value={email} onChange={setEmail} />
            <Field label="TIMEZONE" value="America / New York" onChange={() => {}} />
            <Field label="FAVORITE LEAGUE" value="NBA" onChange={() => {}} />
          </div>
          <div className="px-6 pb-6">
            <button className="h-10 px-5 bg-amber-300 hover:bg-amber-200 text-black font-bold tracking-[0.18em] text-[11px]">
              SAVE CHANGES
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function Field({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <label className="block">
      <div className="text-[10px] tracking-[0.2em] text-slate-500">{label}</div>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-1.5 w-full bg-black/30 border border-white/10 px-3 h-10 text-sm text-white outline-none focus:border-amber-300/40"
      />
    </label>
  );
}
