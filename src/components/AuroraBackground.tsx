import stadiumBg from "@/assets/stadium-bg.jpg";

export function AuroraBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden" style={{ backgroundColor: "#060818" }}>
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `url(${stadiumBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: 0.75,
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(6,8,24,0.35) 0%, rgba(6,8,24,0.55) 60%, rgba(6,8,24,0.85) 100%)",
        }}
      />
      <div
        className="absolute rounded-full"
        style={{
          top: "-20%",
          left: "-10%",
          width: "55vw",
          height: "55vw",
          background: "#1E90FF",
          filter: "blur(160px)",
          opacity: 0.18,
        }}
      />
      <div
        className="absolute rounded-full"
        style={{
          bottom: "-20%",
          right: "-10%",
          width: "50vw",
          height: "50vw",
          background: "#0EA5E9",
          filter: "blur(160px)",
          opacity: 0.14,
        }}
      />
      <div className="noise-overlay" />
      <div className="vignette" />
    </div>
  );
}
