import { useState } from "react";

type League = "MLB" | "NBA" | "NFL" | "NHL" | "NCAAF" | "NCAAB" | "CFB" | "CBB";

// Map team name OR abbreviation to ESPN abbreviation code by league.
const TEAM_MAP: Record<string, Record<string, string>> = {
  MLB: {
    yankees: "nyy", nyy: "nyy",
    "red sox": "bos", bos: "bos",
    athletics: "oak", oak: "oak", ath: "oak",
    orioles: "bal", bal: "bal",
    phillies: "phi", phi: "phi",
    rockies: "col", col: "col",
    reds: "cin", cin: "cin",
    astros: "hou", hou: "hou",
    dodgers: "lad", lad: "lad",
    mets: "nym", nym: "nym",
  },
  NBA: {
    cavaliers: "cle", cle: "cle",
    pistons: "det", det: "det",
    celtics: "bos", bos: "bos",
    heat: "mia", mia: "mia",
    lakers: "lal", lal: "lal",
    warriors: "gsw", gsw: "gsw",
  },
  NFL: {
    eagles: "phi", phi: "phi",
    cowboys: "dal", dal: "dal",
    chiefs: "kc", kc: "kc",
    bills: "buf", buf: "buf",
  },
  NHL: {
    bruins: "bos", bos: "bos",
    rangers: "nyr", nyr: "nyr",
    oilers: "edm", edm: "edm",
    kings: "lak", lak: "lak",
  },
};

const ESPN_LEAGUE: Record<string, string> = {
  MLB: "mlb", NBA: "nba", NFL: "nfl", NHL: "nhl",
  NCAAF: "ncaa", NCAAB: "ncaa", CFB: "ncaa", CBB: "ncaa",
};

function getLogoUrl(league: League, team: string): string | null {
  const key = team.trim().toLowerCase();
  const map = TEAM_MAP[league as string];
  const code = map?.[key];
  const lg = ESPN_LEAGUE[league];
  if (!code || !lg) return null;
  return `https://a.espncdn.com/i/teamlogos/${lg}/500/${code}.png`;
}

export function TeamLogo({
  league,
  team,
  size = 28,
  className = "",
}: {
  league: League;
  team: string;
  size?: number;
  className?: string;
}) {
  const url = getLogoUrl(league, team);
  const [errored, setErrored] = useState(false);
  const initials = team
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 3)
    .toUpperCase();

  if (!url || errored) {
    return (
      <span
        className={`inline-flex items-center justify-center rounded-full bg-gradient-to-br from-[#1E90FF] to-[#A855F7] text-white font-black ${className}`}
        style={{ width: size, height: size, fontSize: size * 0.38 }}
        aria-label={team}
      >
        {initials}
      </span>
    );
  }
  return (
    <img
      src={url}
      alt={`${team} logo`}
      width={size}
      height={size}
      onError={() => setErrored(true)}
      className={`object-contain ${className}`}
      style={{ width: size, height: size }}
      loading="lazy"
    />
  );
}

export function MatchupLogos({
  league,
  a,
  b,
  size = 24,
}: {
  league: League;
  a: string;
  b: string;
  size?: number;
}) {
  return (
    <span className="inline-flex items-center -space-x-2 mr-2 align-middle">
      <TeamLogo league={league} team={a} size={size} className="ring-2 ring-black/60 rounded-full bg-white/5 p-0.5" />
      <TeamLogo league={league} team={b} size={size} className="ring-2 ring-black/60 rounded-full bg-white/5 p-0.5" />
    </span>
  );
}
