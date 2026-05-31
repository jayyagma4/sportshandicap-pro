export type League = "NFL" | "NBA" | "MLB" | "NHL";

export type Block =
  | { type: "p"; text: string }
  | { type: "h2"; text: string; icon?: string }
  | { type: "h3"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "quote"; text: string; cite?: string }
  | { type: "table"; headers: string[]; rows: string[][] }
  | { type: "callout"; tone: "info" | "warning" | "success"; title: string; text: string };

export type Article = {
  id: string;
  league: League;
  category: string;
  title: string;
  excerpt: string;
  author: string;
  authorRole?: string;
  date: string;
  readTime: string;
  featured?: boolean;
  matchup?: { home: string; away: string; venue: string; time: string; series: string };
  tldr?: string[];
  keyInsights?: { label: string; value: string }[];
  faqs?: { q: string; a: string }[];
  body: Block[];
};

export const articles: Article[] = [
  {
    id: "a1",
    league: "NHL",
    category: "Game Preview",
    title:
      "May 24th, 2026 GAME PREVIEW: Colorado Avalanche vs Las Vegas Knights analysis, best bets, prediction and odds",
    excerpt:
      "MacKinnon meets Marner in a playoff clash that could define the series. Who holds the edge in Game 3? Get the edge before the puck drops.",
    author: "Simulator NHL Expert Handicapper",
    authorRole: "Senior NHL Analyst",
    date: "May 24, 2026",
    readTime: "8 min",
    featured: true,
    matchup: {
      home: "Las Vegas Golden Knights",
      away: "Colorado Avalanche",
      venue: "T-Mobile Arena, Las Vegas, NV",
      time: "TBD",
      series: "NHL Playoffs 2026 — Game 3",
    },
    tldr: [
      "Vegas is 7-2 at home this postseason vs Colorado's 4-5 road record.",
      "Mitch Marner has elevated playoff critics with 8 points in Vegas's postseason run.",
      "Nathan MacKinnon's 21-point playoff stretch is real, but Colorado's support cast is fading.",
      "Vegas's power play (37.1%) significantly outpaces Colorado (28.4%).",
      "Cale Makar's day-to-day upper-body injury status is critical.",
    ],
    keyInsights: [
      { label: "Vegas home record", value: "7-2" },
      { label: "Colorado road record", value: "4-5" },
      { label: "Vegas power play", value: "37.1%" },
      { label: "Best bet confidence", value: "High" },
    ],
    faqs: [
      { q: "What is Vegas's home record this postseason vs their overall record?", a: "Vegas is 7-2 at home and 11-5 overall this postseason." },
      { q: "How many playoff points does Nathan MacKinnon have through 16 games?", a: "MacKinnon has tallied 21 points across the first 16 playoff games." },
      { q: "What is Mitch Marner's postseason point total for Vegas?", a: "Marner sits at 18 points with 8 of those in Vegas's current run." },
      { q: "What is Colorado's road record this postseason?", a: "Colorado is 4-5 away from Ball Arena in the 2026 playoffs." },
      { q: "Which Colorado defenseman is day-to-day with an upper-body injury?", a: "Cale Makar is officially listed as day-to-day." },
      { q: "Compare the power play percentages: Vegas vs Colorado", a: "Vegas 37.1% vs Colorado 28.4% — a meaningful nine-point gap." },
      { q: "What was the Game 2 final score and who won?", a: "Vegas won Game 2 by a final of 4-3 in overtime." },
      { q: "What is the difference in penalty kill percentages?", a: "Vegas PK 87.1% vs Colorado 76.6%." },
      { q: "Is Adin Hill expected to start for Vegas in Game 3?", a: "Yes, Hill is the projected Game 3 starter." },
      { q: "When is Colorado forward Valeri Nichushkin expected to return?", a: "Nichushkin's return remains questionable on an undisclosed injury." },
    ],
    body: [
      {
        type: "p",
        text: "The desert is heating up, and not just because it's May in Nevada. The Colorado Avalanche roll into T-Mobile Arena trailing or knotted in this white-knuckle playoff series, and Game 3 promises to be the most pivotal contest yet. With superstar Nathan MacKinnon leading Colorado's relentless attack and newly acquired Mitch Marner orchestrating Las Vegas's power-play machine, this matchup is a chess match at 100 mph on ice.",
      },
      { type: "h3", text: "Colorado Avalanche at Las Vegas Golden Knights, Game 3 Preview" },
      {
        type: "p",
        text: "Date: May 24, 2026. Venue: T-Mobile Arena, Las Vegas, NV. Time: TBD. Series: NHL Playoffs 2026.",
      },
      { type: "h2", text: "Star Player Spotlight", icon: "⭐" },
      { type: "h3", text: "Nathan MacKinnon, Colorado Avalanche" },
      {
        type: "p",
        text: "MacKinnon has been an absolute force this postseason, averaging over 1.5 points per game with a shooting percentage that has opposing goaltenders on edge every shift. His skating speed and vision in the offensive zone remain unmatched in the league. In Games 1 and 2, MacKinnon registered multi-point efforts and was a consistent +/- positive, driving Colorado's transition game and creating chaos on every zone entry.",
      },
      { type: "h3", text: "Mitch Marner, Las Vegas Golden Knights" },
      {
        type: "p",
        text: "After his blockbuster offseason move to Las Vegas, Marner has become the engine that makes Vegas hum. His playmaking IQ is elite, threading passes through seams most players don't even see. Marner's power-play production has been critical for the Knights in this series, and with home-ice advantage in Game 3, expect him to feed off the T-Mobile Arena crowd in a massive way.",
      },
      { type: "h2", text: "Team Offensive & Defensive Stats, 2026 Playoffs", icon: "📊" },
      {
        type: "table",
        headers: ["Category", "Colorado Avalanche", "Las Vegas Golden Knights"],
        rows: [
          ["Goals Per Game (Playoffs)", "3.6", "4.1"],
          ["Goals Allowed Per Game", "2.9", "3.2"],
          ["Power Play %", "28.4%", "37.1%"],
          ["Penalty Kill %", "82.1%", "87.1%"],
          ["Shots Per Game", "33.4", "35.1"],
          ["Save Percentage", ".912", ".908"],
          ["Faceoff Win %", "51.3%", "48.6%"],
        ],
      },
      { type: "h2", text: "Injury Report", icon: "🩹" },
      {
        type: "ul",
        items: [
          "Colorado Avalanche: Defenseman Devon Toews listed as day-to-day (lower body). His absence would significantly impact Colorado's blue-line depth and power-play setup. Forward Valeri Nichushkin questionable with an undisclosed injury after leaving Game 2.",
          "Las Vegas Golden Knights: Goaltender Adin Hill full practice participant, no injury concerns heading into Game 3. Defenseman Alex Pietrangelo limited in practice (maintenance day), expected to play.",
        ],
      },
      { type: "h2", text: "Venue & Weather Factors", icon: "🏟️" },
      {
        type: "p",
        text: "T-Mobile Arena is a fully enclosed, climate-controlled indoor NHL facility, meaning traditional weather has zero direct impact on gameplay. However, the indoor atmosphere in Las Vegas is one of the loudest and most electric in the league during playoff hockey. Crowd noise and home-ice energy have historically boosted the Golden Knights' performance, particularly in the first period. Expect a raucous environment that could fuel Vegas's fast-start tendencies and put early pressure on Colorado's goaltending.",
      },
      { type: "h2", text: "Game 2 Quick Recap", icon: "🎬" },
      {
        type: "p",
        text: "In a back-and-forth battle, the Golden Knights edged the Avalanche in a high-event contest that went to overtime. Marner delivered the game-winning assist on a perfectly timed cross-ice feed, while MacKinnon kept Colorado alive with a highlight-reel goal in the third period. The game total went OVER with both offenses generating quality chances at will. Colorado's penalty kill struggled here, giving Vegas the edge they needed to seize momentum heading into Game 3 with home-ice advantage.",
      },
      { type: "h2", text: "Why Game 3 Is Must-Watch Hockey", icon: "🔥" },
      {
        type: "p",
        text: "This series has everything: elite star power, a vulnerable penalty kill on both sides, goaltending matchups that could swing on any single play, and two rosters built to go deep in May. The team that wins Game 3 will hold a commanding series advantage and the psychological edge. Momentum in playoff hockey is everything, and right now it's swinging toward the Golden Knights' goal lights.",
      },
      {
        type: "p",
        text: "Every shift. Every faceoff. Every power play. Game 3 is where legends are made and series are broken open. Do not watch this game without knowing exactly where the value lies.",
      },
      {
        type: "callout",
        tone: "success",
        title: "Want the Winning Edge?",
        text: "Our expert NHL handicapper has locked in a Best Bet Selection for Game 3, including the side, total, and a high-value prop play that screams value based on the injury report and matchup data above.",
      },
      {
        type: "p",
        text: "This is NOT the pick you want to miss. Our NHL Expert Simulator has gone 7-2 in playoff Best Bets this postseason, and Game 3 is circled on the board.",
      },
      {
        type: "callout",
        tone: "warning",
        title: "Responsible Gaming",
        text: "Always gamble responsibly. Bet sizing should reflect no more than 1-3% of your total bankroll on any single wager. Always practice responsible bankroll management and verify all lines before wagering.",
      },
    ],
  },
  {
    id: "a2",
    league: "NBA",
    category: "Game Preview",
    title: "Oklahoma City Thunder vs San Antonio Spurs — Where the smart money sits",
    excerpt:
      "OKC leads 2-1 but San Antonio fights back at home. Game 4 is a must-watch and the line has moved.",
    author: "David Wilson",
    date: "May 24, 2026",
    readTime: "5 min",
    body: [{ type: "p", text: "Full breakdown coming soon." }],
  },
  {
    id: "a3",
    league: "NFL",
    category: "Best Bets",
    title: "DC Defenders vs Orlando Storm — Full breakdown and best bets",
    excerpt:
      "The Defenders invade Orlando on May 22nd. Can the Storm's offense hold the fort? Full breakdown inside.",
    author: "Dave Johnson",
    date: "May 22, 2026",
    readTime: "7 min",
    body: [{ type: "p", text: "Full breakdown coming soon." }],
  },
  {
    id: "a4",
    league: "MLB",
    category: "Trends",
    title: "Phillies vs Rockies — Why the road dogs keep cashing at Coors",
    excerpt: "A look at three trends quietly moving the needle on NL West totals this month.",
    author: "M. Rinner",
    date: "May 21, 2026",
    readTime: "4 min",
    body: [{ type: "p", text: "Full breakdown coming soon." }],
  },
  {
    id: "a5",
    league: "NBA",
    category: "Consensus",
    title: "Where the public is wrong on tonight's NBA slate",
    excerpt: "Three games where the consensus and sharp money are heading in opposite directions.",
    author: "Mike Davis",
    date: "May 20, 2026",
    readTime: "5 min",
    body: [{ type: "p", text: "Full breakdown coming soon." }],
  },
  {
    id: "a6",
    league: "NHL",
    category: "Series Outlook",
    title: "Eastern Conference Final — Goalie matchup is the whole story",
    excerpt: "Save percentage, high-danger chances, and what the model says about the series price.",
    author: "D. Wilson",
    date: "May 19, 2026",
    readTime: "6 min",
    body: [{ type: "p", text: "Full breakdown coming soon." }],
  },
  {
    id: "a7",
    league: "NFL",
    category: "Futures",
    title: "Early Week 1 lines — Three sides worth grabbing now",
    excerpt: "The market is thin and the numbers are soft. Three lines that should move by August.",
    author: "Dave Johnson",
    date: "May 18, 2026",
    readTime: "5 min",
    body: [{ type: "p", text: "Full breakdown coming soon." }],
  },
];

export function getArticle(id: string) {
  return articles.find((a) => a.id === id);
}
