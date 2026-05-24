export function AuroraBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden" style={{ backgroundColor: "#060818" }}>
      <div
        className="absolute rounded-full"
        style={{
          top: "-20%",
          left: "-10%",
          width: "60vw",
          height: "60vw",
          background: "#1E90FF",
          filter: "blur(160px)",
          opacity: 0.12,
        }}
      />
      <div
        className="absolute rounded-full"
        style={{
          bottom: "-20%",
          right: "-10%",
          width: "55vw",
          height: "55vw",
          background: "#0EA5E9",
          filter: "blur(160px)",
          opacity: 0.1,
        }}
      />
      <div className="noise-overlay" />
      <div className="vignette" />
    </div>
  );
}
