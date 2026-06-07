const KEY = "inspin_portal_session";

export type PortalSession = {
  email: string;
  name: string;
  initial: string;
  signedInAt: number;
};

export function isAuthed(): boolean {
  if (typeof window === "undefined") return false;
  return !!window.localStorage.getItem(KEY);
}

export function getSession(): PortalSession | null {
  if (typeof window === "undefined") return null;
  const raw = window.localStorage.getItem(KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as PortalSession;
  } catch {
    return null;
  }
}

export function signIn(email: string): PortalSession {
  const handle = email.split("@")[0] || "operator";
  const name = handle
    .replace(/[._-]+/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
  const session: PortalSession = {
    email,
    name,
    initial: (name[0] || "J").toUpperCase(),
    signedInAt: Date.now(),
  };
  window.localStorage.setItem(KEY, JSON.stringify(session));
  return session;
}

export function signOut() {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(KEY);
}
