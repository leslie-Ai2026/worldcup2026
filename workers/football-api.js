/**
 * Cloudflare Worker — Football Live Data Cron Job
 *
 * Deploy: npx wrangler deploy workers/football-api.js
 *
 * CRON TRIGGER: every 5 minutes during World Cup
 * KV Namespace binding: FOOTBALL_DATA
 */

export default {
  // ── HTTP endpoint: GET / → returns cached match data ──────────
  async fetch(request, env) {
    const url = new URL(request.url);

    // GET /matches → frontend fetches live match data
    if (url.pathname === "/matches") {
      const cached = await env.FOOTBALL_DATA.get("matches", "json");
      return new Response(JSON.stringify(cached || getMockMatches()), {
        headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
      });
    }

    // GET /top-scorers → golden boot data
    if (url.pathname === "/top-scorers") {
      const cached = await env.FOOTBALL_DATA.get("topScorers", "json");
      return new Response(JSON.stringify(cached || getMockScorers()), {
        headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
      });
    }

    // POST /refresh → manual refresh trigger
    if (url.pathname === "/refresh" && request.method === "POST") {
      await refreshAllData(env);
      return new Response(JSON.stringify({ success: true }), {
        headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
      });
    }

    return new Response(JSON.stringify({ endpoints: ["/matches", "/top-scorers", "/refresh"] }), {
      headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
    });
  },

  // ── Cron trigger: runs every 5 minutes ───────────────────────
  async scheduled(event, env) {
    await refreshAllData(env);
  },
};

// ─── Data Fetcher ──────────────────────────────────────────────

async function refreshAllData(env) {
  try {
    // In production: replace with real API call
    // const apiUrl = "https://v3.football.api-sports.io/fixtures?league=1&season=2026";
    // const response = await fetch(apiUrl, { headers: { "x-apisports-key": env.API_FOOTBALL_KEY } });

    const matches = getMockMatches();
    const scorers = getMockScorers();

    await env.FOOTBALL_DATA.put("matches", JSON.stringify(matches));
    await env.FOOTBALL_DATA.put("topScorers", JSON.stringify(scorers));
    await env.FOOTBALL_DATA.put("lastUpdated", new Date().toISOString());

    console.log(`✅ Football data refreshed at ${new Date().toISOString()}`);
  } catch (err) {
    console.error(`❌ Refresh failed: ${err.message}`);
  }
}

// ─── Mock Data (swap with real API) ────────────────────────────

function getMockMatches() {
  return {
    updated: new Date().toISOString(),
    live: [
      { id: "mex-vs-rsa", home: "MEX", homeName: "Mexico", away: "RSA", awayName: "South Africa", status: "LIVE", homeScore: 2, awayScore: 0, minute: 67, date: "2026-06-11", time: "20:00", venue: "Estadio Azteca" },
    ],
    upcoming: [
      { id: "usa-vs-bra", home: "USA", homeName: "USA", away: "BRA", awayName: "Brazil", status: "UPCOMING", date: "2026-06-12", time: "18:00", venue: "SoFi Stadium" },
      { id: "fra-vs-ger", home: "FRA", homeName: "France", away: "GER", awayName: "Germany", status: "UPCOMING", date: "2026-06-13", time: "21:00", venue: "MetLife Stadium" },
      { id: "arg-vs-eng", home: "ARG", homeName: "Argentina", away: "ENG", awayName: "England", status: "UPCOMING", date: "2026-06-14", time: "19:00", venue: "AT&T Stadium" },
    ],
    finished: [],
  };
}

function getMockScorers() {
  return {
    updated: new Date().toISOString(),
    leaders: [
      { player: "Kylian Mbappé", goals: 8, country: "France", flagCode: "fr" },
      { player: "Erling Haaland", goals: 7, country: "Norway", flagCode: "no" },
      { player: "Vinícius Jr.", goals: 6, country: "Brazil", flagCode: "br" },
      { player: "Santiago Giménez", goals: 5, country: "Mexico", flagCode: "mx" },
      { player: "Jude Bellingham", goals: 4, country: "England", flagCode: "gb" },
    ],
  };
}
