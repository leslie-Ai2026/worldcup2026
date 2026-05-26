import { useRoute, useLocation, Link } from "wouter";
import matchesData from "@/data/seo-source/matches.json";
import playersData from "@/data/seo-source/players.json";

const flagUrl = (code: string) => `https://flagcdn.com/w80/${code.toLowerCase()}.png`;

interface Match {
  id: string; matchNumber: number; home: string; away: string;
  homeFlag: string; awayFlag: string; date: string; time: string;
  venue: string; group: string; stage: string;
  historicalWinRate: string; seo_title: string; seo_description: string;
}

interface Player {
  id: string; name: string; country: string; flagCode: string; club: string;
  position: string; number: number; age: number; caps: number; goals: number;
}

const MATCH_MAP: Record<string, Match> = Object.fromEntries(
  (matchesData as Match[]).map(m => [m.id, m])
);

const ALL_PLAYERS: Player[] = playersData as Player[];

function getPlayersForCountry(country: string): Player[] {
  return ALL_PLAYERS.filter(p => p.country === country);
}

function PlayerRow({ p }: { p: Player }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 14px", borderBottom: "1px solid var(--border)" }}>
      <span style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--text-muted)", width: 24, textAlign: "right" }}>{p.number}</span>
      <div style={{ flex: 1 }}>
        <Link href={`/players/${p.id}`} style={{ fontSize: 13, fontWeight: 600, color: "var(--accent-blue)", textDecoration: "none" }}>{p.name}</Link>
        <span style={{ fontSize: 11, color: "var(--text-muted)", marginLeft: 6 }}>{p.position} · {p.club}</span>
      </div>
    </div>
  );
}

export default function MatchDetail() {
  const [, params] = useRoute("/match/:matchId");
  const [, setLocation] = useLocation();
  const matchId = params?.matchId || "";
  const match = MATCH_MAP[matchId];

  // ── Null guard ───────────────────────────────────────────
  if (!match) {
    const allIds = Object.keys(MATCH_MAP);
    return (
      <div style={{ maxWidth: 800, margin: "80px auto", padding: "20px", textAlign: "center", background: "#fff" }}>
        <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 28, marginBottom: 8 }}>Match Not Found</h1>
        <p style={{ fontSize: 14, color: "var(--text-secondary)", marginBottom: 8 }}>
          <strong>{matchId || "unknown"}</strong> is not in our {allIds.length}-match database.
        </p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6, justifyContent: "center", marginBottom: 16 }}>
          {allIds.slice(0, 12).map(id => (
            <Link key={id} href={`/match/${id}`} style={{ fontSize: 11, color: "var(--accent-blue)", textDecoration: "none", padding: "4px 8px", border: "1px solid var(--border)", borderRadius: 2 }}>{id}</Link>
          ))}
        </div>
        <span onClick={e => { e.preventDefault(); setLocation("/matches"); }} style={{ color: "var(--accent-blue)", cursor: "pointer", textDecoration: "underline", fontSize: 14 }}>← Back to Schedule</span>
      </div>
    );
  }

  const homePlayers = getPlayersForCountry(match.home);
  const awayPlayers = getPlayersForCountry(match.away);

  return (
    <div style={{ maxWidth: 1100, margin: "0 auto", padding: "24px 20px 40px", background: "#fff" }}>
      <title>{match.seo_title}</title>
      <meta name="description" content={match.seo_description} />

      <span onClick={e => { e.preventDefault(); setLocation("/matches"); }} style={{ display: "inline-flex", alignItems: "center", gap: 4, fontSize: 12, color: "var(--accent-blue)", textDecoration: "none", marginBottom: 18, cursor: "pointer" }}>← Back to Schedule</span>

      <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 900, fontSize: "clamp(28px, 5vw, 38px)", textAlign: "center", marginBottom: 4 }}>{match.home} vs {match.away}</h1>
      <p style={{ textAlign: "center", fontSize: 13, color: "var(--text-secondary)", marginBottom: 4 }}>{match.date} · {match.time} · {match.venue}</p>
      <p style={{ textAlign: "center", fontSize: 12, color: "var(--text-muted)", marginBottom: 8 }}>{match.stage} · Group {match.group} · Match #{match.matchNumber}</p>

      {/* Historical win rate */}
      <div style={{ background: "#F9FAFB", border: "1px solid var(--border)", borderRadius: 4, padding: "10px 14px", marginBottom: 20, textAlign: "center", fontSize: 12, color: "var(--text-secondary)" }}>
        📊 Historical Win Rate: <strong>{match.historicalWinRate}</strong>
      </div>

      {/* Teams face-off */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 20, marginBottom: 28 }}>
        <div style={{ textAlign: "center" }}>
          <img src={flagUrl(match.homeFlag)} alt="" style={{ width: 80, height: 53, objectFit: "contain", marginBottom: 8 }} />
          <div style={{ fontFamily: "var(--font-display)", fontWeight: 900, fontSize: 26 }}>{match.home.substring(0, 3).toUpperCase()}</div>
          <div style={{ fontSize: 11, color: "var(--text-secondary)" }}>{match.home}</div>
        </div>
        <div style={{ fontFamily: "var(--font-display)", fontWeight: 900, fontSize: 40, color: "var(--text-muted)" }}>VS</div>
        <div style={{ textAlign: "center" }}>
          <img src={flagUrl(match.awayFlag)} alt="" style={{ width: 80, height: 53, objectFit: "contain", marginBottom: 8 }} />
          <div style={{ fontFamily: "var(--font-display)", fontWeight: 900, fontSize: 26 }}>{match.away.substring(0, 3).toUpperCase()}</div>
          <div style={{ fontSize: 11, color: "var(--text-secondary)" }}>{match.away}</div>
        </div>
      </div>

      {/* Squads */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))", gap: 20 }}>
        {/* Home squad */}
        <div style={{ border: "1px solid var(--border)" }}>
          <div style={{ background: "#111827", color: "#fff", padding: "10px 14px" }}>
            <span style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 16 }}>{match.home.toUpperCase()} ROSTER</span>
            <span style={{ fontSize: 11, color: "#9ca3af", marginLeft: 8 }}>{homePlayers.length} players</span>
          </div>
          {homePlayers.length > 0 ? homePlayers.map(p => <PlayerRow key={p.id} p={p} />) : (
            <div style={{ padding: "20px 14px", fontSize: 12, color: "var(--text-muted)", textAlign: "center" }}>Roster data pending — check back soon.</div>
          )}
        </div>
        {/* Away squad */}
        <div style={{ border: "1px solid var(--border)" }}>
          <div style={{ background: "#111827", color: "#fff", padding: "10px 14px" }}>
            <span style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 16 }}>{match.away.toUpperCase()} ROSTER</span>
            <span style={{ fontSize: 11, color: "#9ca3af", marginLeft: 8 }}>{awayPlayers.length} players</span>
          </div>
          {awayPlayers.length > 0 ? awayPlayers.map(p => <PlayerRow key={p.id} p={p} />) : (
            <div style={{ padding: "20px 14px", fontSize: 12, color: "var(--text-muted)", textAlign: "center" }}>Roster data pending — check back soon.</div>
          )}
        </div>
      </div>
    </div>
  );
}
