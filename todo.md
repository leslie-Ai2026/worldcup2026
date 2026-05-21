# 2026 FIFA World Cup AI Predictor - TODO

## Phase 1: Global Theme & Routing
- [x] Configure dark theme (deep green / black base, gold #D4AF37 / white highlights) in index.css
- [x] Set up App.tsx with routes: Dashboard (/), Matches (/matches), Golden Boot (/golden-boot)
- [x] Create top navigation bar with three route links

## Phase 2: Layout & Navigation
- [x] Build TopNav component with logo, nav links (Dashboard, Matches, Golden Boot)
- [x] Create MainLayout wrapper component
- [x] Ensure mobile responsive navigation (hamburger menu on mobile)

## Phase 3: Dashboard Page
- [x] Dynamic countdown timer to 2026 World Cup opening (June 11, 2026)
- [x] AI Champion Predictor module with progress bars for top 5 teams
- [x] Today's Matches module with team flags emoji, match time, live/simulated scores

## Phase 4: Matches & Group Stage Page
- [x] Complete schedule for Groups A-H with all match data
- [x] Timezone switcher (user can select local timezone)
- [x] "AI Preview & Prediction" expandable card per featured match
- [x] LLM-generated English analysis with win/draw/loss percentages

## Phase 5: Golden Boot Tracker Page
- [x] Player cards for Mbappé, Messi, Bellingham and other top scorers
- [x] Goal tally display with stats
- [x] AI Golden Boot prediction module (LLM-powered probability analysis)

## Phase 6: Backend tRPC LLM Integration
- [x] tRPC procedure: championPredict (top 5 teams win probability)
- [x] tRPC procedure: matchPredict (match preview + win/draw/loss %)
- [x] tRPC procedure: goldenBootPredict (golden boot probability per player)
- [x] Proper loading states and error handling for all AI calls

## Phase 7: Testing & Delivery
- [x] Write vitest tests for tRPC procedures
- [x] Final responsive check on mobile
- [x] Save checkpoint and deliver

## Phase 8: Community Voting Feature
- [x] Database schema: votes table (category, choice, voter_id, created_at)
- [x] tRPC: castVote mutation (champion / best_player categories)
- [x] tRPC: getVoteResults query (returns vote counts + percentages per choice)
- [x] Frontend: Champion Vote widget with team cards and live bar chart
- [x] Frontend: Best Player Vote widget with player cards
- [x] Voter identity via localStorage fingerprint (no login required)
- [x] Prevent duplicate votes per category per device
- [x] Show user's own vote highlighted after casting
- [x] Integrate both vote widgets into Dashboard page
- [x] Write vitest tests for vote procedures

## Phase 9: Monetization Hub Upgrade
- [x] Update TopNav: Host City Guide | The Fan Pack (Shop) | About Us + [Get Guide] CTA
- [x] Rewrite Hero: new H1/subtitle/dual CTA (Explore Host Cities + Shop Exclusive Kit)
- [x] Build Host City Guide section: Affordable Stays (NY/NJ + LA cards) + Transit Hacks
- [x] Build The Fan Pack POD section: 3-column product cards (Hoodie $45 / Tote $19.99 / Hat $24.99)
- [x] Update Footer: copyright disclaimer + Shipping & Returns + Privacy Policy links
- [x] Add About Us page stub
- [x] Add Shipping & Returns page stub
- [x] Add Privacy Policy page stub

## Phase 10: Football Soul Overhaul
- [x] Global theme: stadium atmosphere colors, Bebas Neue / Oswald headline font, football-specific CSS animations
- [x] TopNav: Home / Matches / Golden Boot / Host City Guide / Fan Pack (Shop) — 5-item nav
- [x] Hero: SVG stadium silhouette background, waving flags strip, countdown timer, bold "THE WORLD STOPS. JUNE 11." headline
- [x] Match Center: horizontal scroll match cards with team flags, kickoff time, venue, status badge
- [x] Star Players Spotlight: player profile cards (Mbappé, Messi, Bellingham, Ronaldo, Vinicius)
- [x] Latest News Stream: 6 mock news cards with category badge, headline, timestamp
- [x] Trophy Predictor voting block (reuse existing champion vote data)
- [x] Golden Boot Predictor voting block (reuse existing best player vote data)
- [x] Fan Comments Feed: anonymous trash-talk wall with submit form
- [x] Backend: comments table (content, voter_id, created_at), tRPC getComments + addComment
- [x] Write vitest tests for comments procedures
- [x] Save checkpoint

## Phase 11: Host City Guide — Travel Magazine Style
- [x] Add Playfair Display serif font for magazine-style headings
- [x] Define magazine CSS tokens: white background, pitch-green, gold-yellow, layered typography
- [x] Rewrite HostCityGuide: magazine cover Hero, city data cards, savings visualization
- [x] Price comparison bar charts (hotel vs Airbnb vs hostel)
- [x] Transit time comparison table with color-coded cost badges
- [x] Savings highlight callouts in gold (e.g. "Save up to $140/night")
- [x] Magazine-style pull quotes and section dividers
- [x] Save checkpoint

## Phase 12: Sidebar Layout — Football Fan Hub Overhaul
- [x] Rebuild App.tsx with sidebar layout (SidebarLayout component)
- [x] Sidebar nav: Home / Schedule & Groups / AI Match Predictor / Star Spotlights / Host City Hacks / The Supporter Kit
- [x] Sidebar football soul: pitch green accent, soccer net texture, stadium fog, bold sports typography
- [x] Home feed: Countdown Timer at top
- [x] Home feed: Latest World Cup News grid (ESPN/Sky Sports style, 6 cards with player/stadium images)
- [x] Home feed: Fan Zone section with Trophy Predictor (country flag voting) + Golden Boot Poll (player avatar cards)
- [x] Remove generic AI Tools cards from Home
- [x] Update page titles for renamed routes
- [x] TypeScript zero errors, all tests pass
- [x] Save checkpoint

## Phase 13: Editorial Style Overhaul (The Athletic / ESPN)

- [x] Global CSS: remove all neon glows, gradients, particles; establish flat editorial design tokens
- [x] Background: solid #121212 charcoal, surfaces #1C1C1C, borders 1px solid #2A2A2A (no inner glows)
- [x] Typography: Oswald/Bebas for headlines, Inter for body; high contrast white-on-dark
- [x] Sidebar layout: update colors to match editorial theme, remove neon accents
- [x] Home page: 70/30 two-column golden layout (main content left, fan widgets right)
- [x] Left column: Countdown Timer + Latest News grid + Match Schedule
- [x] Right column: Trophy Predictor + Golden Boot Poll (flat cards, no glows)
- [x] All cards: flat design, 1px solid border, no inner glow, no gradient backgrounds
- [x] Player/team cards: real photography placeholder images (Unsplash/Pexels URLs)
- [x] TypeScript zero errors, all tests pass
- [x] Save checkpoint

## Phase 14: Design Doc v2.0 Full Overhaul

- [x] Global CSS: warm color tokens (#F5B800 gold, #0f0e0a warm black, #F5F0E8 warm white, #B8A88A warm muted)
- [x] Font system: Barlow Condensed (display) + Inter (body) + JetBrains Mono (data)
- [x] Micro-animations: fadeUp entrance, LIVE pulse dot, countdown flip, card hover translateY, progress bar Intersection Observer
- [x] Skeleton loading shimmer effect
- [x] Scrollbar: 4px gold thumb on dark track
- [x] Ticker Bar: 36px height, 13px Inter 500, gold ⚽ separators, LIVE red pulse dot, slower scroll
- [x] Sidebar: rename nav items (Match Schedule / AI Predictions [NEW] / Player Spotlight / Smart Stay Guide / Fan Shop)
- [x] Sidebar: active state = 3px gold left border + rgba(245,184,0,0.08) bg (no solid block)
- [x] Sidebar: sub-labels under Smart Stay ("Save up to $700/night" in green) and Fan Shop ("World Cup gear" in gold)
- [x] Sidebar: bottom countdown in Barlow Condensed, numbers 24px gold
- [x] Home Block 1: Hero Banner — full-width, countdown with flip animation, "🏟️ Opening: Estadio Azteca" line
- [x] Home Block 2: Feature Strip — 4 equal cells (AI Predictions / Smart Stay EXCLUSIVE / Live Match Data / Fan Shop)
- [x] Home Block 3: Today's Focus — 65/35 layout, hero story card + 3 secondary stories, gold tags, "Read Story →"
- [x] Home Block 4: AI Spotlight — green-tinted bg, 3 AI cards (Champion / Match / Golden Boot)
- [x] Home Block 5: Smart Stay Preview — scrollable city cards, "Save $X/night" in green, 6 cities
- [x] Home Block 6: Fan Voice — fix 0 votes with seed data, show % not raw count, 2×4 flag grid, Golden Boot vertical list with AI Pick badge
- [x] Home Block 7: Discovery Bar — 2-column CTA (City Guides + AI Predictor)
- [x] Mobile: bottom Tab Bar (<768px), stacked layout, 44px touch targets
- [x] Fix 0 votes: seed data initialization (2000 votes distributed), always show percentage
- [x] Save checkpoint

## Phase 15: Editorial Detox — The Athletic Style

- [x] CSS: background #111111, surfaces #161616, borders 1px solid #222222, radius 4px, ZERO glows/gradients
- [x] CSS: typography — Inter 800 for headlines pure white, Inter 400 for body #A0A0A0
- [x] CSS: accent gold #D4AF37 (muted, not neon), no box-shadow, no text-shadow
- [x] Sidebar: flat #0D0D0D bg, no glow, clean nav items, gold left-border active state
- [x] Home: strict 70/30 two-column layout (left: news + matches, right: countdown + voting)
- [x] Left column: hero news card (real photo, no icon), 4 secondary news cards, match schedule rows
- [x] Right column: countdown timer (flat digits, no glow), Trophy Predictor (flag grid), Golden Boot Poll (list)
- [x] All cards: 1px #222222 border, 4px radius, flat background, NO inner glow, NO gradient
- [x] Remove ALL tech/AI icons, replace with photo placeholders (Unsplash URLs)
- [x] TypeScript zero errors, 17 tests pass
- [x] Save checkpoint

## Phase 16: The Supporter Kit — Premium POD Showcase Page

- [x] Search and source high-quality product mockup images (hoodie, tote, cap)
- [x] SupporterKit page: Hero header "The 2026 Pitch Pack. Wear the Passion."
- [x] SupporterKit page: 3-column flat product grid (Hoodie $45 / Tote $19.99 / Cap $24.99)
- [x] SupporterKit page: Trust badges section (Local Printing / Fast Shipping / Zero Waste)
- [x] Flat design: zero glows, sharp rectangular cards, generous whitespace, large bold typography
- [x] Register /supporter-kit route in App.tsx
- [x] Update sidebar Fan Shop link to point to /supporter-kit
- [x] TypeScript zero errors, tests pass
- [x] Save checkpoint
