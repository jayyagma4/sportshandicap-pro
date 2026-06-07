import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PortalHeader, PanelHeader } from "./portal.index";

export const Route = createFileRoute("/portal/settings")({
  component: SettingsPage,
});

function SettingsPage() {
  return (
    <div className="space-y-8">
      <PortalHeader
        title="Settings."
        crumb="Notifications, security, and display preferences."
      />

      <Group title="Notifications">
        <Toggle label="Email alerts when a new pick is released" defaultOn />
        <Toggle label="SMS for live picks (Pro Desk+)" />
        <Toggle label="Daily recap digest at market close" defaultOn />
      </Group>

      <Group title="Display">
        <Toggle label="Reduce motion in dashboard" />
        <Toggle label="Use American odds (off = decimal)" defaultOn />
        <Toggle label="Hide locked / paid content" />
      </Group>

      <Group title="Security">
        <Toggle label="Two-factor authentication" />
        <Toggle label="Remember this device for 30 days" defaultOn />
      </Group>

      <div className="p-card p-6 border border-[var(--p-rose)]/30">
        <div className="text-[10px] tracking-[0.2em] font-bold text-[var(--p-rose)]">
          DANGER ZONE
        </div>
        <div className="mt-2 text-[15px] font-semibold">Delete account</div>
        <p className="text-sm text-[var(--p-text-muted)] mt-1 max-w-xl">
          Permanently remove your operator profile, pick history, and access. This
          cannot be undone.
        </p>
        <button className="mt-5 inline-flex items-center gap-2 h-10 px-4 rounded-lg bg-[var(--p-rose)] text-white text-sm font-semibold hover:opacity-90">
          Request deletion
        </button>
      </div>
    </div>
  );
}

function Group({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="p-card">
      <PanelHeader title={title} />
      <div>{children}</div>
    </div>
  );
}

function Toggle({ label, defaultOn }: { label: string; defaultOn?: boolean }) {
  const [on, setOn] = useState(!!defaultOn);
  return (
    <button
      onClick={() => setOn((v) => !v)}
      className="w-full flex items-center justify-between px-6 py-4 hover:bg-[var(--p-surface-muted)]/60 transition text-left border-b border-[var(--p-border)] last:border-b-0"
    >
      <span className="text-[14px]">{label}</span>
      <span
        className={`relative h-5 w-9 rounded-full transition ${
          on ? "bg-[var(--p-blue)]" : "bg-[var(--p-border-strong)]"
        }`}
      >
        <span
          className={`absolute top-0.5 h-4 w-4 rounded-full bg-white transition shadow ${
            on ? "left-[18px]" : "left-0.5"
          }`}
        />
      </span>
    </button>
  );
}
