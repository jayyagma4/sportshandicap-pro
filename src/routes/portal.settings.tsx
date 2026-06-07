import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PortalHeader } from "./portal.index";

export const Route = createFileRoute("/portal/settings")({
  component: SettingsPage,
});

function SettingsPage() {
  return (
    <div className="p-6 lg:p-8 space-y-6">
      <PortalHeader title="Settings" subtitle="Settings." crumb="Notifications, security, and terminal preferences." />

      <Group title="NOTIFICATIONS">
        <Toggle label="Email alerts when a new pick is released" defaultOn />
        <Toggle label="SMS for live picks (Pro Desk+)" />
        <Toggle label="Daily recap digest at market close" defaultOn />
      </Group>

      <Group title="DISPLAY">
        <Toggle label="Reduce motion on terminal" />
        <Toggle label="Use American odds (off = decimal)" defaultOn />
        <Toggle label="Hide locked / paid content" />
      </Group>

      <Group title="SECURITY">
        <Toggle label="Two-factor authentication" />
        <Toggle label="Remember this terminal for 30 days" defaultOn />
      </Group>

      <div className="terminal-panel rounded-sm p-6 border-rose-400/20">
        <div className="text-[10px] tracking-[0.2em] text-rose-300">DANGER ZONE</div>
        <div className="mt-2 text-white font-semibold">Delete account</div>
        <p className="text-sm text-slate-400 mt-1">Permanently remove your operator profile, pick history, and access. This cannot be undone.</p>
        <button className="mt-4 h-10 px-5 bg-rose-500/15 hover:bg-rose-500/25 text-rose-200 border border-rose-400/30 font-bold tracking-[0.18em] text-[11px]">
          REQUEST DELETION
        </button>
      </div>
    </div>
  );
}

function Group({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="terminal-panel rounded-sm">
      <div className="terminal-panel-header">
        <span className="text-white">{title}</span>
      </div>
      <div className="divide-y divide-white/5">{children}</div>
    </div>
  );
}

function Toggle({ label, defaultOn }: { label: string; defaultOn?: boolean }) {
  const [on, setOn] = useState(!!defaultOn);
  return (
    <button onClick={() => setOn((v) => !v)} className="w-full flex items-center justify-between px-6 py-4 hover:bg-white/[0.02] transition text-left">
      <span className="text-sm text-slate-200">{label}</span>
      <span className={`relative h-5 w-9 rounded-full transition ${on ? "bg-amber-300" : "bg-white/10"}`}>
        <span className={`absolute top-0.5 h-4 w-4 rounded-full bg-black transition ${on ? "left-[18px]" : "left-0.5 bg-white"}`} />
      </span>
    </button>
  );
}
