type Props = {
  className?: string;
  height?: number;
};

/**
 * Minimal, professional Sportshandicapper logo.
 * Orbitron typography, single accent color (#1E90FF), no gradients.
 */
export function Logo({ className = "", height = 40 }: Props) {
  return (
    <svg
      role="img"
      aria-label="Sportshandicapper"
      viewBox="0 0 360 72"
      height={height}
      className={className}
      style={{ display: "block" }}
    >
      {/* Monogram mark */}
      <g>
        <rect x="2" y="10" width="52" height="52" rx="10" fill="none" stroke="#1E90FF" strokeWidth="2" />
        <text
          x="28"
          y="48"
          textAnchor="middle"
          fill="#FFFFFF"
          fontFamily="'Orbitron', sans-serif"
          fontWeight="800"
          fontSize="26"
          letterSpacing="0"
        >
          S
        </text>
        {/* corner accent */}
        <rect x="44" y="12" width="8" height="2" fill="#1E90FF" />
        <rect x="50" y="12" width="2" height="8" fill="#1E90FF" />
      </g>

      {/* Wordmark */}
      <text
        x="70"
        y="36"
        fill="#FFFFFF"
        fontFamily="'Orbitron', sans-serif"
        fontWeight="700"
        fontSize="22"
        letterSpacing="2"
      >
        SPORTS
      </text>
      <text
        x="70"
        y="58"
        fill="#1E90FF"
        fontFamily="'Orbitron', sans-serif"
        fontWeight="500"
        fontSize="11"
        letterSpacing="6"
      >
        HANDICAPPER
      </text>
    </svg>
  );
}

export default Logo;
