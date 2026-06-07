import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Camera } from "lucide-react";
import { getSession } from "@/lib/portalAuth";
import { PortalHeader, PanelHeader } from "./portal.index";

export const Route = createFileRoute("/portal/profile")({
  component: Profile,
});

function Profile() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [tz, setTz] = useState("America / New York");
  const [league, setLeague] = useState("NBA");

  useEffect(() => {
    const s = getSession();
    if (s) {
      setEmail(s.email);
      setName(s.name);
    }
  }, []);

  return (
    <div className="space-y-8">
      <PortalHeader
        title="My Profile."
        crumb="Your identity, contact details, and analyst preferences."
      />

      <div className="grid lg:grid-cols-[1fr_2fr] gap-4">
        <div className="p-card p-7 text-center">
          <div className="relative w-24 h-24 mx-auto">
            <div className="w-24 h-24 rounded-full bg-[var(--p-blue-soft)] text-[var(--p-blue)] grid place-items-center font-bold text-4xl">
              {(name[0] || "J").toUpperCase()}
            </div>
            <button className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-[var(--p-text)] text-white grid place-items-center border-2 border-[var(--p-surface)]">
              <Camera className="h-4 w-4" />
            </button>
          </div>
          <div className="mt-5 text-lg font-bold">{name || "Operator"}</div>
          <div className="mt-1 inline-flex p-chip p-chip-purple">★ FREE TRIAL</div>
          <div className="mt-5 text-[12px] text-[var(--p-text-faint)]">
            Joined Jun 07, 2026
          </div>

          <div className="mt-6 grid grid-cols-3 gap-2 text-left">
            <MiniStat k="Picks" v="1" />
            <MiniStat k="Wins" v="0" />
            <MiniStat k="Units" v="+7.3" tone="emerald" />
          </div>
        </div>

        <div className="p-card">
          <PanelHeader title="Contact & preferences" />
          <div className="p-6 grid sm:grid-cols-2 gap-5">
            <Field label="Display name" value={name} onChange={setName} />
            <Field label="Email" value={email} onChange={setEmail} type="email" />
            <Field label="Timezone" value={tz} onChange={setTz} />
            <Field label="Favorite league" value={league} onChange={setLeague} />
          </div>
          <div className="px-6 pb-6 flex items-center gap-3">
            <button className="p-btn">Save changes</button>
            <button className="p-btn-ghost">Cancel</button>
          </div>
        </div>
      </div>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
}) {
  return (
    <label className="block">
      <div className="text-[12px] font-semibold text-[var(--p-text-muted)] mb-1.5">{label}</div>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="p-input"
      />
    </label>
  );
}

function MiniStat({ k, v, tone }: { k: string; v: string; tone?: "emerald" }) {
  return (
    <div className="p-card-tinted px-3 py-2.5">
      <div className="text-[10px] tracking-[0.18em] text-[var(--p-text-faint)] font-semibold">
        {k.toUpperCase()}
      </div>
      <div
        className={`p-stat-num text-sm mt-0.5 ${
          tone === "emerald" ? "text-[var(--p-emerald)]" : ""
        }`}
      >
        {v}
      </div>
    </div>
  );
}
