import type { ReactNode } from "react";
import { useRouterState } from "@tanstack/react-router";
import { AuroraBackground } from "./AuroraBackground";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";

export function SiteLayout({ children }: { children: ReactNode }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const chromeless = pathname === "/login" || pathname.startsWith("/portal");

  if (chromeless) {
    return <>{children}</>;
  }

  return (
    <>
      <AuroraBackground />
      <Navbar />
      <main className="pt-28">{children}</main>
      <Footer />
    </>
  );
}
