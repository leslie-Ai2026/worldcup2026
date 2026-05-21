import { useState } from "react";

const flagUrl = (code: string) => `https://flagcdn.com/w80/${code.toLowerCase()}.png`;

const PLAYERS = [
  { id: "mbappe", name: "Kylian Mbappé", flagCode: "fr", country: "France", club: "Real Madrid", position: "FW", age: 27, aiPredictedGoals: 8, img: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=200&q=80&fit=crop" },
  { id: "messi", name: "Lionel Messi", flagCode: "ar", country: "Argentina", club: "Inter Miami", position: "FW", age: 38, aiPredictedGoals: 5, img: "https://images.unsplash.com/photo-1508098682722-e99c643e7f0b?w=200&q=80&fit=crop" },
  { id: "bellingham", name: "Jude Bellingham", flagCode: "gb", country: "England", club: "Real Madrid", position: "MF", age: 22, aiPredictedGoals: 4, img: "https://images.unsplash.com/photo-1543326727-cf6c39e8f84c?w=200&q=80&fit=crop" },
  { id: "vinicius", name: "Vinícius Jr.", flagCode: "br", country: "Brazil", club: "Real Madrid", position: "FW", age: 24, aiPredictedGoals: 6, img: "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=200&q=80&fit=crop" },
  { id: "haaland", name: "Erling Haaland", flagCode: "no", country: "Norway", club: "Man City", position: "FW", age: 25, aiPredictedGoals: 7, img: "https://images.unsplash.com/photo-1522778119026-d647f0596c20?w=200&q=80&fit=crop" },
  { id: "salah", name: "Mohamed Salah", flagCode: "eg", country: "Egypt", club: "Liverpool", position: "FW", age: 33, aiPredictedGoals: 5, img: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&q=80&fit=crop" },
  { id: "pedri", name: "Pedri", flagCode: "es", country: "Spain", club: "Barcelona", position: "MF", age: 23, aiPredictedGoals: 3, img: "https://images.unsplash.com/photo-1463453091185-61582044d556?w=200&q=80&fit=crop" },
  { id: "osimhen", name: "Victor Osimhen", flagCode: "ng", country: "Nigeria", club: "Galatasaray", position: "FW", age: 25, aiPredictedGoals: 4, img: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=200&q=80&fit=crop" },
];

export default function GoldenBoot() {
  const [filter, setFilter] = useState("All");
  const positions = ["All", "FW", "MF", "DF", "GK"];
  const filtered = filter === "All" ? PLAYERS : PLAYERS.filter(p => p.position === filter);

  return (
    <div style={{ maxWidth: 1100, margin: "0 auto", padding: "24px 20px 48px", background: "#fff" }}>
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(24px, 4vw, 36px)", marginBottom: 4 }}>⭐ PLAYER SPOTLIGHT</h1>
        <p style={{ fontSize: 14, color: "var(--text-secondary)" }}>Top Golden Boot contenders · AI-predicted goals · 2026 World Cup</p>
      </div>

      {/* Position filter */}
      <div style={{ display: "flex", gap: 4, marginBottom: 24, flexWrap: "wrap" }}>
        {positions.map(pos => (
          <button key={pos} onClick={() => setFilter(pos)} style={{
            fontFamily: "var(--font-body)", fontWeight: filter === pos ? 600 : 400,
            fontSize: 12, color: filter === pos ? "#fff" : "var(--text-secondary)",
            background: filter === pos ? "#111827" : "#fff",
            border: `1px solid ${filter === pos ? "#111827" : "var(--border-color)"}`,
            borderRadius: 4, padding: "5px 12px", cursor: "pointer",
          }}>{pos === "All" ? "All Players" : pos}</button>
        ))}
      </div>

      {/* Player cards grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: 16 }}>
        {filtered.map((player, idx) => (
          <div key={player.id} className="card-white" style={{ padding: 16, display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>
            {/* Rank */}
            {idx < 3 && (
              <div style={{
                fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 14,
                color: idx === 0 ? "var(--gold)" : idx === 1 ? "#9ca3af" : "#b8860b",
                background: idx === 0 ? "var(--gold-light)" : "#f9fafb",
                borderRadius: "50%", width: 32, height: 32, display: "flex", alignItems: "center", justifyContent: "center",
                marginBottom: 10,
              }}>#{idx + 1}</div>
            )}

            {/* Player image */}
            <img src={player.img} alt={player.name} style={{
              width: 80, height: 80, borderRadius: "50%", objectFit: "cover", marginBottom: 10,
            }}
              onError={e => { (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1543326727-cf6c39e8f84c?w=200&q=80"; }} />

            {/* Name */}
            <div style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 18, marginBottom: 2 }}>{player.name}</div>

            {/* Flag + Country */}
            <div style={{ display: "flex", alignItems: "center", gap: 4, marginBottom: 4 }}>
              <img src={flagUrl(player.flagCode)} alt={player.country} style={{ width: 20, height: 14, objectFit: "contain" }}
                onError={e => { (e.target as HTMLImageElement).style.display = "none"; }} />
              <span style={{ fontSize: 12, color: "var(--text-secondary)" }}>{player.country}</span>
            </div>

            {/* Club + Position */}
            <div style={{ fontSize: 12, color: "var(--text-secondary)", marginBottom: 10 }}>
              {player.club} · <span style={{ fontWeight: 600, color: "var(--text-primary" }}>{player.position}</span>
            </div>

            {/* AI Predicted Goals */}
            <div style={{
              background: "var(--gold-light)", border: "1px solid rgba(184,134,11,0.2)",
              borderRadius: 6, padding: "8px 16px", width: "100%",
            }}>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: 20, fontWeight: 600, color: "var(--gold)", lineHeight: 1 }}>
                {player.aiPredictedGoals} <span style={{ fontSize: 11, color: "var(--text-muted)", fontWeight: 400 }}>predicted goals</span>
              </div>
            </div>

            {idx === 0 && (
              <div className="tag tag-new" style={{ marginTop: 8, fontSize: 9 }}>⚡ AI GOLDEN BOOT PICK</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
