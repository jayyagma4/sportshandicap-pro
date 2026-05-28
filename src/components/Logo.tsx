type Props = {
  className?: string;
  height?: number;
};

/**
 * Flat, monochrome-friendly Sportshandicapper logo.
 * No gradients. Single accent color (#1E90FF) + white type on a deep navy plate.
 * Scales cleanly at any size.
 */
export function Logo({ className = "", height = 40 }: Props) {
  return (
    <svg
      role="img"
      aria-label="Sportshandicapper"
      viewBox="0 0 320 88"
      height={height}
      className={className}
      style={{ display: "block" }}
    >
      {/* Outer plate */}
      <rect x="2" y="2" width="316" height="84" rx="14" fill="#0A0C1C" stroke="#1E90FF" strokeWidth="2" />
      {/* Inner hairline frame */}
      <rect x="10" y="10" width="300" height="68" rx="10" fill="none" stroke="#1E90FF" strokeOpacity="0.35" strokeWidth="1" />

      {/* Accent bar (left) */}
      <rect x="20" y="20" width="6" height="48" rx="2" fill="#1E90FF" />

      {/* SPORTS wordmark */}
      <text
        x="40"
        y="46"
        fill="#FFFFFF"
        fontFamily="'Inter','Helvetica Neue',Arial,sans-serif"
        fontWeight="900"
        fontSize="30"
        letterSpacing="4"
      >
        SPORTS
      </text>

      {/* divider line under SPORTS */}
      <line x1="40" y1="54" x2="232" y2="54" stroke="#1E90FF" strokeWidth="1.5" />

      {/* HANDICAPPER subline */}
      <text
        x="40"
        y="70"
        fill="#1E90FF"
        fontFamily="'Inter','Helvetica Neue',Arial,sans-serif"
        fontWeight="700"
        fontSize="11"
        letterSpacing="6"
      >
        HANDICAPPER
      </text>

      {/* Right-side mark: stacked bars (analytics nod) */}
      <g transform="translate(252,22)">
        <rect x="0" y="30" width="8" height="18" rx="1.5" fill="#1E90FF" opacity="0.55" />
        <rect x="14" y="18" width="8" height="30" rx="1.5" fill="#1E90FF" opacity="0.8" />
        <rect x="28" y="6" width="8" height="42" rx="1.5" fill="#1E90FF" />
        <circle cx="32" cy="6" r="3" fill="#FFFFFF" />
      </g>
    </svg>
  );
}

export default Logo;
