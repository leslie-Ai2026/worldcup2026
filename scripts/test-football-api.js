/**
 * Football API Mock Test Script
 *
 * Simulates fetching from API-Football / TheSportDB,
 * maps response fields to frontend component props,
 * validates data types to prevent rendering breaks.
 *
 * Usage: node scripts/test-football-api.js
 */

// ═══════════════════════════════════════════════════════════════
// 1. MOCK API RESPONSE (simulating API-Football v3 format)
// ═══════════════════════════════════════════════════════════════

const MOCK_API_RESPONSE = {
  get: "fixtures",
  parameters: { league: "1", season: "2026" },
  results: 4,
  response: [
    {
      fixture: { id: 1001, date: "2026-06-11T20:00:00Z", status: { long: "Match Finished", short: "FT", elapsed: 90 } },
      league: { id: 1, name: "World Cup", round: "Group Stage - A" },
      teams: { home: { id: 16, name: "Mexico", code: "MEX" }, away: { id: 112, name: "South Africa", code: "RSA" } },
      goals: { home: 3, away: 1 },
      venue: { name: "Estadio Azteca", city: "Mexico City", capacity: 87523 },
    },
    {
      fixture: { id: 1002, date: "2026-06-12T18:00:00Z", status: { long: "Not Started", short: "NS", elapsed: null } },
      teams: { home: { id: 18, name: "United States", code: "USA" }, away: { id: 6, name: "Brazil", code: "BRA" } },
      goals: { home: null, away: null },
      venue: { name: "SoFi Stadium", city: "Los Angeles", capacity: 70240 },
    },
    {
      fixture: { id: 1003, date: "2026-06-13T21:00:00Z", status: { long: "Not Started", short: "NS", elapsed: null } },
      teams: { home: { id: 3, name: "France", code: "FRA" }, away: { id: 25, name: "Germany", code: "GER" } },
      goals: { home: null, away: null },
      venue: { name: "MetLife Stadium", city: "East Rutherford", capacity: 82500 },
    },
    {
      fixture: { id: 1004, date: "2026-06-14T19:00:00Z", status: { long: "Not Started", short: "NS", elapsed: null } },
      teams: { home: { id: 4, name: "Argentina", code: "ARG" }, away: { id: 10, name: "England", code: "ENG" } },
      goals: { home: null, away: null },
      venue: { name: "AT&T Stadium", city: "Arlington", capacity: 80000 },
    },
  ],
};

// ═══════════════════════════════════════════════════════════════
// 2. MOCK TOP SCORERS RESPONSE
// ═══════════════════════════════════════════════════════════════

const MOCK_SCORERS_RESPONSE = {
  get: "players/topscorers",
  parameters: { league: "1", season: "2026" },
  results: 5,
  response: [
    { player: { id: 278, name: "Kylian Mbappé", age: 27, nationality: "France" },
      statistics: [{ team: { name: "France" }, goals: { total: 8, assists: 3 } }] },
    { player: { id: 853, name: "Erling Haaland", age: 25, nationality: "Norway" },
      statistics: [{ team: { name: "Norway" }, goals: { total: 7, assists: 1 } }] },
    { player: { id: 1124, name: "Vinícius Jr.", age: 24, nationality: "Brazil" },
      statistics: [{ team: { name: "Brazil" }, goals: { total: 6, assists: 4 } }] },
    { player: { id: 3021, name: "Santiago Giménez", age: 25, nationality: "Mexico" },
      statistics: [{ team: { name: "Mexico" }, goals: { total: 5, assists: 2 } }] },
    { player: { id: 1892, name: "Jude Bellingham", age: 22, nationality: "England" },
      statistics: [{ team: { name: "England" }, goals: { total: 4, assists: 3 } }] },
  ],
};

// ═══════════════════════════════════════════════════════════════
// 3. FIELD MAPPERS — translate API fields to frontend types
// ═══════════════════════════════════════════════════════════════

/** Maps API fixture → Home.tsx MATCHES array item */
function mapApiFixtureToMatch(apiFixture) {
  const { fixture, teams, goals, venue } = apiFixture;

  // Validate required fields exist
  if (!fixture?.id) throw new Error(`Missing fixture.id`);
  if (!teams?.home?.code || !teams?.away?.code) throw new Error(`Missing team codes for fixture ${fixture.id}`);

  const isLive = fixture.status?.short === "1H" || fixture.status?.short === "2H" || fixture.status?.short === "HT";
  const isFinished = fixture.status?.short === "FT" || fixture.status?.short === "AET" || fixture.status?.short === "PEN";
  const isUpcoming = fixture.status?.short === "NS" || fixture.status?.short === "TBD";

  const date = new Date(fixture.date);
  const month = date.toLocaleString("en-US", { month: "short" }).toUpperCase();
  const day = date.getDate();
  const time = date.toLocaleString("en-US", { hour: "2-digit", minute: "2-digit", hour12: false });

  return {
    id: `${teams.home.code.toLowerCase()}-vs-${teams.away.code.toLowerCase()}`,
    home: teams.home.code,
    homeCode: teams.home.code.toLowerCase(),
    homeName: teams.home.name,
    away: teams.away.code,
    awayCode: teams.away.code.toLowerCase(),
    awayName: teams.away.name,
    date: `${month} ${day}`,
    time: time,
    venue: venue?.name || "TBD",
    status: isLive ? "LIVE" : isFinished ? "FT" : "UPCOMING",
    homeScore: goals?.home ?? null,
    awayScore: goals?.away ?? null,
    minute: fixture.status?.elapsed ?? null,
  };
}

/** Maps API scorer → frontend BOOT_PLAYERS array item */
function mapApiScorerToPlayer(apiScorer) {
  const { player, statistics } = apiScorer;
  const stats = statistics?.[0];

  if (!player?.id) throw new Error(`Missing player.id`);
  if (!player?.name) throw new Error(`Missing player.name`);

  const flagCodeMap = {
    "France": "fr", "Norway": "no", "Brazil": "br", "Mexico": "mx",
    "England": "gb", "Argentina": "ar", "Spain": "es", "Germany": "de",
    "Portugal": "pt", "Netherlands": "nl", "South Africa": "za",
  };

  return {
    id: player.name.toLowerCase().replace(/\s+/g, "-").normalize("NFD").replace(/[̀-ͯ]/g, ""),
    name: player.name,
    flagCode: flagCodeMap[player.nationality] || "un",
    country: player.nationality || "Unknown",
    club: stats?.team?.name || "Unknown",
    goals: stats?.goals?.total ?? 0,
    assists: stats?.goals?.assists ?? 0,
    age: player.age ?? 0,
    position: "FW",
    img: `https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=100&q=80`,
  };
}

// ═══════════════════════════════════════════════════════════════
// 4. TYPE VALIDATOR — ensures mapped data matches frontend expectations
// ═══════════════════════════════════════════════════════════════

function validateMatch(match, index) {
  const required = ["id", "home", "homeCode", "away", "awayCode", "date", "time", "venue", "status"];
  const errors = [];

  for (const field of required) {
    if (match[field] === undefined || match[field] === null) {
      errors.push(`match[${index}].${field} is ${match[field]}`);
    }
  }

  // Type checks
  if (typeof match.id !== "string") errors.push(`match[${index}].id should be string`);
  if (typeof match.home !== "string") errors.push(`match[${index}].home should be string`);
  if (typeof match.homeCode !== "string") errors.push(`match[${index}].homeCode should be string`);
  if (match.homeScore !== null && typeof match.homeScore !== "number") errors.push(`match[${index}].homeScore should be number or null`);

  return errors;
}

function validatePlayer(player, index) {
  const required = ["id", "name", "flagCode", "club", "goals"];
  const errors = [];

  for (const field of required) {
    if (player[field] === undefined || player[field] === null) {
      errors.push(`player[${index}].${field} is ${player[field]}`);
    }
  }

  if (typeof player.goals !== "number") errors.push(`player[${index}].goals should be number`);
  if (typeof player.flagCode !== "string" || player.flagCode.length !== 2) errors.push(`player[${index}].flagCode should be 2-char string`);

  return errors;
}

// ═══════════════════════════════════════════════════════════════
// 5. RUN TEST
// ═══════════════════════════════════════════════════════════════

console.log("╔══════════════════════════════════════════╗");
console.log("║   Football API → Frontend Mapper Test   ║");
console.log("╚══════════════════════════════════════════╝\n");

// ── Test Match Mapping ───────────────────────────────────────
console.log("📅 MATCHES — Mapping API fixtures → Home.tsx MATCHES array\n");

const mappedMatches = [];
const matchErrors = [];

for (let i = 0; i < MOCK_API_RESPONSE.response.length; i++) {
  const fixture = MOCK_API_RESPONSE.response[i];
  try {
    const mapped = mapApiFixtureToMatch(fixture);
    mappedMatches.push(mapped);
    const errs = validateMatch(mapped, i);
    if (errs.length > 0) {
      matchErrors.push(...errs);
      console.log(`  ❌ Fixture ${fixture.fixture.id}: ${errs.length} validation errors`);
      errs.forEach(e => console.log(`     - ${e}`));
    } else {
      console.log(`  ✅ ${mapped.home} vs ${mapped.away} → id="${mapped.id}" date="${mapped.date}" time="${mapped.time}" status="${mapped.status}"`);
    }
  } catch (err) {
    matchErrors.push(err.message);
    console.log(`  💥 Fixture ${fixture.fixture?.id || "?"}: ${err.message}`);
  }
}

// ── Test Scorer Mapping ──────────────────────────────────────
console.log("\n⚽ TOP SCORERS — Mapping API scorers → frontend BOOT_PLAYERS\n");

const mappedPlayers = [];
const playerErrors = [];

for (let i = 0; i < MOCK_SCORERS_RESPONSE.response.length; i++) {
  const scorer = MOCK_SCORERS_RESPONSE.response[i];
  try {
    const mapped = mapApiScorerToPlayer(scorer);
    mappedPlayers.push(mapped);
    const errs = validatePlayer(mapped, i);
    if (errs.length > 0) {
      playerErrors.push(...errs);
      console.log(`  ❌ ${scorer.player.name}: ${errs.length} validation errors`);
      errs.forEach(e => console.log(`     - ${e}`));
    } else {
      console.log(`  ✅ ${mapped.name} (${mapped.country}) → ${mapped.goals} goals · flagCode="${mapped.flagCode}" · id="${mapped.id}"`);
    }
  } catch (err) {
    playerErrors.push(err.message);
    console.log(`  💥 ${scorer.player?.name || "?"}: ${err.message}`);
  }
}

// ── Summary ───────────────────────────────────────────────────
const totalErrors = matchErrors.length + playerErrors.length;
console.log(`\n${"═".repeat(44)}`);
console.log(`\n📊 RESULTS: ${mappedMatches.length} matches + ${mappedPlayers.length} players mapped`);
console.log(`   Errors: ${totalErrors}`);

if (totalErrors === 0) {
  console.log(`   ✅ ALL DATA TYPES ALIGN — safe to integrate with frontend\n`);
  // Output sample JSON for copy-paste into frontend
  console.log("📋 Copy-paste ready JSON for frontend:\n");
  console.log(JSON.stringify({ matches: mappedMatches, players: mappedPlayers, updated: new Date().toISOString() }, null, 2));
} else {
  console.log(`   ❌ FIX REQUIRED — ${totalErrors} type mismatches detected\n`);
  process.exit(1);
}
