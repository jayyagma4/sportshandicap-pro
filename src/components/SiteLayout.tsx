import type { ReactNode } from "react";
import { AuroraBackground } from "./AuroraBackground";
import { ParticleField } from "./ParticleField";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";

export function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <AuroraBackground />
      <ParticleField />
      <Navbar />
      <main className="pt-28">{children}</main>
      <Footer />
    </>
  );
}
