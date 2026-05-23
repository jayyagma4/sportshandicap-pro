# Picks Page Redesign

Rebuild `/picks` to match the structure of the inSpin reference screenshots — but rendered entirely in the Sportshandicapper aurora / blue→cyan→purple language (NO orange, NO flat black).

## New layout (top to bottom)

1. **Page header**
   - Eyebrow with live ping dot: "Today's board"
   - Title "Expert Picks" with gradient on "Picks"
   - Subtitle: "Our latest betting picks across all sports"

2. **Sport filter pills**
   - Pills: All, NFL, NCAAF, NBA, NCAAB, MLB, NHL
   - Active pill = gradient #1E90FF → #A855F7 fill + glow
   - Inactive = glass pill with white/10 border, hover lifts border to indigo-400/30
   - Client-side filter (useState) on the picks list

3. **Login / Join banner**
   - Full-width glass card, rounded-2xl, subtle aurora glow
   - Left: "Login or join to see full pick details." + slate subtext "Game info and status are visible to all."
   - Right: secondary "Log In" + primary gradient "Join Now"

4. **Picks grid (3-col)**
   Each card (card-premium) contains:
   - Top row: sport icon in gradient circle + sport label (NBA/MLB/etc) + "Graded" pill on left; "STARS" label + filled star rating on right (whale rows get a `★10 WHALE` gradient pill)
   - Date/time + venue line in slate-500
   - Matchup row: two small team logo circles (gradient initials) with team names + "vs" separator
   - Confidence: "Graded Pick" chip + bold cyan "XX% Confidence" + gradient progress bar
   - Members-only inner card: glass panel with lock icon, "Members Only Pick", "Login or subscribe to unlock this pick", two buttons (Log In secondary, Subscribe primary)
   - Footer divider + author row: gradient initial avatar + name in slate

5. **Pagination**
   - Centered: prev arrow, numbered buttons 1–4, next arrow
   - Active page = gradient fill; others = glass pills
   - Client-side state only (no real paging — first page shows 9 picks, others show placeholder slice)

## Data
Expand current pick list to ~10 entries with: sport, teams (with initials/colors), date/time, venue, graded status, stars (1–5 or 10 whale), confidence %, locked flag, author name. Some Graded + unlocked (show pick text), most locked.

## Components
- Add `SportIcon` helper (small gradient circle with sport letter/emoji) — keeps it lightweight, no new deps
- Reuse existing `card-premium`, `btn-primary`, `btn-secondary`, `ScrollReveal`
- Star row, progress bar, members-only overlay inlined in the card component

## Files touched
- `src/routes/picks.tsx` — full rewrite of layout, keep route + head() identical
- No CSS additions needed (tokens already cover it)
- No other routes change

## Style guardrails (Sportshandicapper, not inSpin)
- Background stays aurora; cards stay glass + white/10 border
- Accent colors: #1E90FF, #22D3EE, #A855F7, emerald for live dots
- Stars: cyan-300 instead of yellow (matches palette better) — confirm if you'd prefer yellow
- All pills rounded-full, gradient-text on heading

Ready to build on approval.