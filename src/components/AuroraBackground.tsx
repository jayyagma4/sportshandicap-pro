export function AuroraBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden" style={{ backgroundColor: "#060818" }}>
      <div className="conic-shimmer" />
      <div
        className="aurora-blob aurora-1"
        style={{ top: "-10%", left: "-10%", width: "55vw", height: "55vw", background: "#1E90FF" }}
      />
      <div
        className="aurora-blob aurora-2"
        style={{ top: "20%", right: "-15%", width: "50vw", height: "50vw", background: "#22D3EE" }}
      />
      <div
        className="aurora-blob aurora-3"
        style={{ bottom: "-15%", left: "10%", width: "55vw", height: "55vw", background: "#A855F7" }}
      />
      <div
        className="aurora-blob aurora-4"
        style={{ bottom: "10%", right: "5%", width: "40vw", height: "40vw", background: "#22D3EE" }}
      />
      <div className="scan-beam" />
      <div className="noise-overlay" />
      <div className="vignette" />
    </div>
  );
}
