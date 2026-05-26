import { useState } from "react";
import { useRoute, useLocation, Link } from "wouter";
import { OPENING_FIXTURES, PLAYER_ROSTERS } from "@/data/worldcup2026.js";

const flagUrl = (code: string) => `https://flagcdn.com/w80/${code.toLowerCase()}.png`;

// Generate match entries dynamically from fixtures + rosters
const ALL_MATCHES = OPENING_FIXTURES.map(f => {
  const homeKey = Object.keys(PLAYER_ROSTERS).find(k =>
    k === f.home.toLowerCase().replace(/\s+/g, "_") ||
    PLAYER_ROSTERS[k]?.[0]?.name === f.home
  );
  const awayKey = Object.keys(PLAYER_ROSTERS).find(k =>
    k === f.away.toLowerCase().replace(/\s+/g, "_")
  );

  const homePlayers = (homeKey ? PLAYER_ROSTERS[homeKey] : []) || [];
  const awayPlayers = (awayKey ? PLAYER_ROSTERS[awayKey] : []) || [];

  const countryCodeMap: Record<string, string> = {
    Mexico: "mx", Canada: "ca", USA: "us", Paraguay: "py", Brazil: "br", Argentina: "ar",
    Colombia: "co", "South Korea": "kr", France: "fr", Germany: "de", Japan: "jp",
    Czechia: "cz", Spain: "es", Netherlands: "nl", Senegal: "sn", Bosnia: "ba",
    England: "gb", Portugal: "pt", Morocco: "ma", Norway: "no", Italy: "it",
    Uruguay: "uy", Egypt: "eg", Chile: "cl", Belgium: "be", Croatia: "hr",
    "South Africa": "za", Iran: "ir", Nigeria: "ng", Australia: "au", Peru: "pe",
    "Saudi Arabia": "sa", Switzerland: "ch", Denmark: "dk", Ecuador: "ec",
    "New Zealand": "nz", Austria: "at", Serbia: "rs", Qatar: "qa", Jamaica: "jm",
    Sweden: "se", Poland: "pl", Ukraine: "ua", Mali: "ml", Hungary: "hu",
    Scotland: "gb", Algeria: "dz", Panama: "pa",
  };

  const broadcastMap: Record<string, string[]> = {
    mx: ["FOX Sports (US)", "Televisa (MX)", "BBC One (UK)", "TSN (CA)"],
    us: ["FOX Sports (US)", "BBC One (UK)", "TSN (CA)", "ESPN (LATAM)"],
    ca: ["TSN (CA)", "FOX Sports (US)", "BBC One (UK)"],
    br: ["Globo (BR)", "FOX Sports (US)", "BBC One (UK)", "ESPN (LATAM)"],
    ar: ["TyC Sports (AR)", "FOX Sports (US)", "BBC One (UK)", "ESPN (LATAM)"],
    fr: ["TF1 (FR)", "FOX Sports (US)", "BBC One (UK)", "beIN Sports (MENA)"],
    de: ["ZDF (DE)", "FOX Sports (US)", "BBC One (UK)"],
    gb: ["BBC One (UK)", "ITV (UK)", "FOX Sports (US)", "Optus Sport (AU)"],
    es: ["RTVE (ES)", "FOX Sports (US)", "BBC One (UK)"],
    it: ["RAI (IT)", "FOX Sports (US)", "BBC One (UK)"],
    pt: ["RTP (PT)", "FOX Sports (US)", "BBC One (UK)"],
    nl: ["NOS (NL)", "FOX Sports (US)", "BBC One (UK)"],
    za: ["SuperSport (ZA)", "FOX Sports (US)", "BBC One (UK)"],
  };
  const homeCode = countryCodeMap[f.home] || f.home.slice(0, 2).toLowerCase();
  const awayCode = countryCodeMap[f.away] || f.away.slice(0, 2).toLowerCase();

  return {
    id: f.id,
    home: { code: f.home.substring(0, 3).toUpperCase(), name: f.home, flagCode: homeCode, coach: "TBD", formation: "TBD",
      players: homePlayers.map((p: any) => ({
        slug: p.name.toLowerCase().replace(/\s+/g, "-").normalize("NFD").replace(/[̀-ͯ]/g, ""),
        name: p.name, number: p.number, position: p.position, club: p.club,
        age: 0, caps: 0, goals: 0,
        img: `https://images.unsplash.com/photo-1543326727-cf6c39e8f84c?w=120&q=80`,
      })),
    },
    away: { code: f.away.substring(0, 3).toUpperCase(), name: f.away, flagCode: awayCode, coach: "TBD", formation: "TBD",
      players: awayPlayers.map((p: any) => ({
        slug: p.name.toLowerCase().replace(/\s+/g, "-").normalize("NFD").replace(/[̀-ͯ]/g, ""),
        name: p.name, number: p.number, position: p.position, club: p.club,
        age: 0, caps: 0, goals: 0,
        img: `https://images.unsplash.com/photo-1543326727-cf6c39e8f84c?w=120&q=80`,
      })),
    },
    date: f.date, time: f.time, venue: f.venue,
    capacity: f.venue.includes("Azteca") ? 87523 : f.venue.includes("SoFi") ? 70240 : f.venue.includes("MetLife") ? 82500 : 60000,
    broadcast: (broadcastMap[homeCode] || ["FOX Sports (US)", "BBC One (UK)", "TSN (CA)"]).map((p: string) => ({ platform: p.split(" (")[0], region: p.split("(")[1]?.replace(")", "") || "Global" })),
  };
});

function PlayerPopup({ player, onClose }: { player: any; onClose: () => void }) {
  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 100, display: "flex", alignItems: "center", justifyContent: "center" }} onClick={onClose}>
      <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.4)" }} />
      <div style={{ position: "relative", background: "#fff", border: "1px solid var(--border)", borderRadius: 2, padding: 24, maxWidth: 380, width: "90%" }} onClick={e => e.stopPropagation()}>
        <button onClick={onClose} style={{ position: "absolute", top: 10, right: 14, background: "none", border: "none", fontSize: 18, cursor: "pointer", color: "var(--text-muted)" }}>✕</button>
        <div style={{ display: "flex", gap: 14, marginBottom: 18 }}>
          <img src={player.img} alt={player.name} style={{ width: 80, height: 80, borderRadius: "50%", objectFit: "cover" }} />
          <div>
            <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 20, marginBottom: 2 }}>{player.name}</h3>
            <div style={{ fontSize: 12, color: "var(--text-secondary)" }}>#{player.number} · {player.position}</div>
            <div style={{ fontSize: 12, color: "var(--text-secondary)" }}>{player.club}</div>
          </div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 8, textAlign: "center" }}>
          {[{ v: player.number, l: "Shirt #" }, { v: player.position, l: "Position" }].map(({ v, l }) => (
            <div key={l} style={{ background: "var(--bg-secondary)", border: "1px solid var(--border)", borderRadius: 2, padding: "8px 4px" }}>
              <div style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 20 }}>{v}</div>
              <div style={{ fontSize: 10, color: "var(--text-muted)", textTransform: "uppercase" }}>{l}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function MatchDetail() {
  const [, params] = useRoute("/match/:matchId");
  const [, setLocation] = useLocation();
  const matchId = params?.matchId || "";

  const match = ALL_MATCHES.find(m => m.id === matchId);

  if (!match) {
    return (
      <div style={{ padding: 80, textAlign: "center", background: "#fff" }}>
        <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 28, marginBottom: 8 }}>Match Not Found</h1>
        <p style={{ fontSize: 14, color: "var(--text-secondary)", marginBottom: 20 }}>
          No data for <strong>{matchId}</strong>. Available: {ALL_MATCHES.slice(0, 3).map(m => m.id).join(", ")}…
        </p>
        <span onClick={e => { e.preventDefault(); setLocation("/matches"); }} style={{ color: "var(--accent-blue)", cursor: "pointer", textDecoration: "underline", fontSize: 14 }}>Back to Schedule</span>
      </div>
    );
  }

  const { home, away } = match;
  const [selected, setSelected] = useState<any>(null);

  return (
    <div style={{ maxWidth: 1100, margin: "0 auto", padding: "24px 20px 40px", background: "#fff" }}>
      <span onClick={e => { e.preventDefault(); setLocation("/matches"); }} style={{ display: "inline-flex", alignItems: "center", gap: 4, fontSize: 12, color: "var(--accent-blue)", textDecoration: "none", marginBottom: 18, cursor: "pointer" }}>← Back to Schedule</span>

      <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 900, fontSize: "clamp(28px, 5vw, 38px)", textAlign: "center", marginBottom: 4 }}>{home.name} vs {away.name}</h1>
      <p style={{ textAlign: "center", fontSize: 13, color: "var(--text-secondary)", marginBottom: 8 }}>{match.date} · {match.time} · {match.venue}</p>

      {/* Broadcast bar */}
      <div style={{ background: "#FEF2F2", border: "1px solid #FECACA", borderRadius: 2, padding: "12px 16px", marginBottom: 24, display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
        <span style={{ fontFamily: "var(--font-body)", fontWeight: 700, fontSize: 11, color: "var(--accent-red)", letterSpacing: "0.06em", textTransform: "uppercase" }}>📺 Where to Watch</span>
        {match.broadcast.map((b: any) => (
          <span key={b.platform} style={{ fontSize: 12, fontWeight: 500 }}>
            <strong>{b.platform}</strong> <span style={{ color: "var(--text-muted)", fontSize: 10 }}>{b.region}</span>
          </span>
        ))}
      </div>

      {/* Teams face-off */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 20, marginBottom: 28 }}>
        <div style={{ textAlign: "center" }}>
          <img src={flagUrl(home.flagCode)} alt="" style={{ width: 80, height: 53, objectFit: "contain", marginBottom: 8 }} />
          <div style={{ fontFamily: "var(--font-display)", fontWeight: 900, fontSize: 26 }}>{home.code}</div>
          <div style={{ fontSize: 11, color: "var(--text-secondary)" }}>{home.name}</div>
        </div>
        <div style={{ fontFamily: "var(--font-display)", fontWeight: 900, fontSize: 40, color: "var(--text-muted)" }}>VS</div>
        <div style={{ textAlign: "center" }}>
          <img src={flagUrl(away.flagCode)} alt="" style={{ width: 80, height: 53, objectFit: "contain", marginBottom: 8 }} />
          <div style={{ fontFamily: "var(--font-display)", fontWeight: 900, fontSize: 26 }}>{away.code}</div>
          <div style={{ fontSize: 11, color: "var(--text-secondary)" }}>{away.name}</div>
        </div>
      </div>

      {/* Squads */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))", gap: 20, marginBottom: 28 }}>
        {[home, away].map(team => (
          <div key={team.code} style={{ border: "1px solid var(--border)" }}>
            <div style={{ background: "#111827", color: "#fff", padding: "10px 14px", display: "flex", justifyContent: "space-between" }}>
              <span style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 16 }}>{team.code} ROSTER</span>
            </div>
            {team.players.map((p: any) => (
              <div key={p.name} style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 14px", borderBottom: "1px solid var(--border)", cursor: "pointer" }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "#F9FAFB"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "transparent"; }}
                onClick={() => setSelected(p)}>
                <span style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--text-muted)", width: 24, textAlign: "right" }}>{p.number}</span>
                <div style={{ flex: 1 }}>
                  <Link href={`/players/${p.slug}`} style={{ fontSize: 13, fontWeight: 600, color: "var(--accent-blue)", textDecoration: "none" }} onClick={e => e.stopPropagation()}>{p.name}</Link>
                  <span style={{ fontSize: 11, color: "var(--text-muted)", marginLeft: 6 }}>{p.position} · {p.club}</span>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
      {selected && <PlayerPopup player={selected} onClose={() => setSelected(null)} />}
    </div>
  );
}
