import { useState } from "react";
import { useRoute, useLocation } from "wouter";
const flagUrl = (code: string) => `https://flagcdn.com/w80/${code.toLowerCase()}.png`;

interface Player { name: string; number: number; position: string; club: string; age: number; caps: number; goals: number; img: string; }
interface TeamSquad { code: string; name: string; flagCode: string; coach: string; formation: string; players: Player[]; }

const DB: Record<string, { home: TeamSquad; away: TeamSquad; date: string; time: string; venue: string; capacity: number; broadcast: { platform: string; region: string }[] }> = {
  "mex-vs-rsa": {
    home: { code: "MEX", name: "Mexico", flagCode: "mx", coach: "Javier Aguirre", formation: "4-3-3",
      players: [
        { name: "Guillermo Ochoa", number: 13, position: "GK", club: "Salernitana", age: 40, caps: 148, goals: 0, img: "https://images.unsplash.com/photo-1508341591423-4347099e1f19?w=120&q=80" },
        { name: "Edson Álvarez", number: 4, position: "MF", club: "West Ham", age: 28, caps: 78, goals: 5, img: "https://images.unsplash.com/photo-1543326727-cf6c39e8f84c?w=120&q=80" },
        { name: "Santiago Giménez", number: 9, position: "FW", club: "Feyenoord", age: 25, caps: 32, goals: 18, img: "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=120&q=80" },
        { name: "Hirving Lozano", number: 22, position: "FW", club: "PSV", age: 30, caps: 70, goals: 17, img: "https://images.unsplash.com/photo-1522778119026-d647f0596c20?w=120&q=80" },
        { name: "César Montes", number: 3, position: "DF", club: "Almería", age: 28, caps: 46, goals: 1, img: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=120&q=80" },
        { name: "Luis Chávez", number: 18, position: "MF", club: "Dynamo Moscow", age: 28, caps: 34, goals: 4, img: "https://images.unsplash.com/photo-1463453091185-61582044d556?w=120&q=80" },
      ]},
    away: { code: "RSA", name: "South Africa", flagCode: "za", coach: "Hugo Broos", formation: "4-4-2",
      players: [
        { name: "Ronwen Williams", number: 1, position: "GK", club: "Mamelodi Sundowns", age: 32, caps: 42, goals: 0, img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=120&q=80" },
        { name: "Percy Tau", number: 10, position: "FW", club: "Al Ahly", age: 31, caps: 45, goals: 16, img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&q=80" },
        { name: "Teboho Mokoena", number: 8, position: "MF", club: "Mamelodi Sundowns", age: 27, caps: 30, goals: 4, img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=120&q=80" },
        { name: "Sipho Mbule", number: 14, position: "MF", club: "Mamelodi Sundowns", age: 26, caps: 20, goals: 2, img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&q=80" },
        { name: "Grant Kekana", number: 5, position: "DF", club: "Mamelodi Sundowns", age: 32, caps: 18, goals: 0, img: "https://images.unsplash.com/photo-1552058544-f2b08422138a?w=120&q=80" },
        { name: "Evidence Makgopa", number: 9, position: "FW", club: "Orlando Pirates", age: 24, caps: 12, goals: 5, img: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=120&q=80" },
      ]},
    date: "June 11, 2026", time: "20:00 UTC", venue: "Estadio Azteca, Mexico City", capacity: 87523,
    broadcast: [{ platform: "FOX Sports", region: "United States" }, { platform: "BBC One", region: "United Kingdom" }, { platform: "TSN", region: "Canada" }, { platform: "Televisa", region: "Mexico" }],
  },
};

function PlayerPopup({ player, onClose }: { player: Player; onClose: () => void }) {
  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 100, display: "flex", alignItems: "center", justifyContent: "center" }} onClick={onClose}>
      <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.4)" }} />
      <div style={{ position: "relative", background: "#fff", border: "1px solid var(--border)", borderRadius: 2, padding: 24, maxWidth: 380, width: "90%" }} onClick={e => e.stopPropagation()}>
        <button onClick={onClose} style={{ position: "absolute", top: 10, right: 14, background: "none", border: "none", fontSize: 18, cursor: "pointer", color: "var(--text-muted)" }}>✕</button>
        <div style={{ display: "flex", gap: 14, marginBottom: 18 }}>
          <img src={player.img} alt={player.name} style={{ width: 80, height: 80, borderRadius: "50%", objectFit: "cover" }} onError={e => { (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1543326727-cf6c39e8f84c?w=120&q=80"; }} />
          <div>
            <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 20, marginBottom: 2 }}>{player.name}</h3>
            <div style={{ fontSize: 12, color: "var(--text-secondary)" }}>#{player.number} · {player.position}</div>
            <div style={{ fontSize: 12, color: "var(--text-secondary)" }}>{player.club}</div>
          </div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 8, textAlign: "center" }}>
          {[{ v: player.age, l: "Age" }, { v: player.caps, l: "Caps" }, { v: player.goals, l: "Goals" }].map(({ v, l }) => (
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
  const matchId = params?.matchId || "mex-vs-rsa";
  const match = DB[matchId];
  if (!match) return <div style={{ padding: 40, textAlign: "center" }}>Match not found. <span onClick={e => { e.preventDefault(); setLocation("/matches"); }} style={{ color: "var(--accent-blue)", cursor: "pointer", textDecoration: "underline" }}>Back to Schedule</span></div>;

  const { home, away } = match;
  const [selected, setSelected] = useState<Player | null>(null);
  const [fanVote, setFanVote] = useState<string | null>(null);

  return (
    <div style={{ maxWidth: 1100, margin: "0 auto", padding: "24px 20px 40px", background: "#fff" }}>
      <span onClick={e => { e.preventDefault(); setLocation("/matches"); }} style={{ display: "inline-flex", alignItems: "center", gap: 4, fontSize: 12, color: "var(--accent-blue)", textDecoration: "none", marginBottom: 18, cursor: "pointer" }}>← Back to Schedule</span>

      <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 900, fontSize: "clamp(28px,5vw,38px)", textAlign: "center", marginBottom: 4 }}>{home.name} vs {away.name}</h1>
      <p style={{ textAlign: "center", fontSize: 13, color: "var(--text-secondary)", marginBottom: 8 }}>{match.date} · {match.time} · {match.venue} · Capacity: {match.capacity.toLocaleString()}</p>

      {/* Broadcast bar */}
      <div style={{ background: "#FEF2F2", border: "1px solid #FECACA", borderRadius: 2, padding: "12px 16px", marginBottom: 24, display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap" }}>
        <span style={{ fontFamily: "var(--font-body)", fontWeight: 700, fontSize: 11, color: "var(--accent-red)", letterSpacing: "0.06em", textTransform: "uppercase" }}>📺 Where to Watch</span>
        {match.broadcast.map(b => (
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

      {/* Squads — two columns */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))", gap: 20, marginBottom: 28 }}>
        {[home, away].map(team => (
          <div key={team.code} style={{ border: "1px solid var(--border)" }}>
            <div style={{ background: "#111827", color: "#fff", padding: "10px 14px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 16 }}>{team.code} ROSTER</span>
            </div>
            <div style={{ padding: "8px 14px", borderBottom: "1px solid var(--border)", display: "flex", gap: 16, fontSize: 12, color: "var(--text-secondary)" }}>
              <span>👔 <strong style={{ color: "var(--text-primary)" }}>{team.coach}</strong></span>
              <span>📋 {team.formation}</span>
            </div>
            {team.players.map(p => (
              <div key={p.name} style={{
                display: "flex", alignItems: "center", gap: 10, padding: "8px 14px",
                borderBottom: "1px solid var(--border)", cursor: "pointer",
                transition: "background 0.08s",
              }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "#F9FAFB"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "transparent"; }}
                onClick={() => setSelected(p)}
              >
                <span style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--text-muted)", width: 24, textAlign: "right" }}>{p.number}</span>
                <img src={p.img} alt="" style={{ width: 34, height: 34, borderRadius: "50%", objectFit: "cover" }} onError={e => { (e.target as HTMLImageElement).style.display = "none"; }} />
                <div style={{ flex: 1 }}>
                  <span style={{ fontSize: 13, fontWeight: 600, color: "var(--accent-blue)", cursor: "pointer" }}>{p.name}</span>
                  <span style={{ fontSize: 11, color: "var(--text-muted)", marginLeft: 6 }}>{p.position}</span>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* Bottom action buttons */}
      <div style={{ display: "flex", gap: 12, justifyContent: "center" }}>
        <button className="btn-outline" onClick={() => setFanVote(fanVote ? null : "home")} style={{ borderColor: fanVote === "home" ? "#111827" : "var(--border)" }}>
          🗳️ {fanVote ? "Vote Recorded: " + (fanVote === "home" ? home.name : fanVote === "away" ? away.name : "Draw") : "Fan Vote: Who Wins?"}
        </button>
        <button className="btn-black">
          🤖 ASK AI: TACTICAL PRE-MATCH ANALYSIS
        </button>
      </div>

      {selected && <PlayerPopup player={selected} onClose={() => setSelected(null)} />}
    </div>
  );
}
