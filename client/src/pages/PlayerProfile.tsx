import { useRoute, Link } from "wouter";
import playersData from "@/data/seo-source/players.json";

const flagUrl = (code: string) => `https://flagcdn.com/w80/${code.toLowerCase()}.png`;

const FLAG_MAP: Record<string, string> = {
  Mexico: "mx", Brazil: "br", Switzerland: "ch", "United States": "us",
  Argentina: "ar", France: "fr", Germany: "de", England: "gb",
  Spain: "es", Portugal: "pt", Italy: "it", Netherlands: "nl",
};

function getFlagCode(country: string): string {
  return FLAG_MAP[country] || country.slice(0, 2).toLowerCase();
}

interface Player {
  id: string; name: string; country: string; club: string;
  position: string; jerseyNumber?: string; number?: number;
  age: number; marketValue: string; highlights?: string;
  aiPrediction?: string; aiPredictedGoals?: number;
  seoKeywords?: string; fullBio?: string; seo_title?: string; seo_description?: string;
  flagCode?: string; caps?: number; goals?: number; matchImpactScore?: string;
}

const PLAYER_MAP: Record<string, Player> = Object.fromEntries(
  (playersData as Player[]).map(p => [p.id, p])
);

const ALL_PLAYERS: Player[] = (playersData as Player[]).map(p => ({
  ...p,
  number: p.number ?? (p.jerseyNumber ? parseInt(p.jerseyNumber) : undefined),
}));

export default function PlayerProfile() {
  const [, params] = useRoute("/players/:slug");
  const slug = params?.slug || "";
  const player = PLAYER_MAP[slug];

  // ── Safe null guard ──────────────────────────────────────
  if (!player) {
    return (
      <div style={{ maxWidth: 800, margin: "80px auto", padding: "20px", textAlign: "center", background: "#fff" }}>
        <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 28, marginBottom: 8 }}>Player Not Found</h1>
        <p style={{ fontSize: 14, color: "var(--text-secondary)", marginBottom: 20 }}>
          No profile for <strong>{slug || "unknown"}</strong>. Browse {ALL_PLAYERS.length} indexed players below.
        </p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6, justifyContent: "center", marginBottom: 20 }}>
          {ALL_PLAYERS.slice(0, 20).map(p => (
            <Link key={p.id} href={`/players/${p.id}`} style={{ fontSize: 12, color: "var(--accent-blue)", textDecoration: "none", padding: "4px 8px", border: "1px solid var(--border)", borderRadius: 2 }}>{p.name}</Link>
          ))}
        </div>
        <Link href="/matches" style={{ fontSize: 13, color: "var(--accent-blue)", textDecoration: "none" }}>← Back to Match Schedule</Link>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 1100, margin: "0 auto", padding: "24px 20px 40px", background: "#fff" }}>
      {/* pSEO Meta */}
      <title>{player.seo_title || `${player.name} — 2026 World Cup Player Profile | WorldCupHacks`}</title>
      <meta name="description" content={player.seo_description || player.seoKeywords || `${player.name} (${player.club}, ${player.country}) — ${player.position}, ${player.age} years old. ${player.highlights || ''}`} />

      {/* Breadcrumb */}
      <div style={{ display: "flex", gap: 6, marginBottom: 20, fontSize: 11, color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}>
        <Link href="/" style={{ color: "var(--text-muted)", textDecoration: "none" }}>Home</Link><span>/</span>
        <Link href="/matches" style={{ color: "var(--text-muted)", textDecoration: "none" }}>Matches</Link><span>/</span>
        <span style={{ color: "var(--text-primary)" }}>{player.name}</span>
      </div>

      {/* Hero */}
      <div style={{ display: "flex", gap: 24, marginBottom: 28, flexWrap: "wrap" }}>
        <img
          src={`https://images.unsplash.com/photo-1543326727-cf6c39e8f84c?w=400&q=85`}
          alt={player.name}
          style={{ width: 150, height: 150, borderRadius: "50%", objectFit: "cover", flexShrink: 0, border: "4px solid #e5e7eb" }}
          onError={e => { (e.target as HTMLImageElement).style.display = "none"; }} />
        <div style={{ flex: 1, minWidth: 260 }}>
          <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 900, fontSize: "clamp(28px, 4vw, 40px)", marginBottom: 4 }}>{player.name}</h1>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10, flexWrap: "wrap" }}>
            <img src={flagUrl(getFlagCode(player.country))} alt={player.country} style={{ width: 24, height: 16, objectFit: "contain" }} />
            <span style={{ fontSize: 14, color: "var(--text-secondary)" }}>{player.country}</span>
            <span style={{ color: "var(--text-muted)" }}>·</span>
            <span style={{ fontSize: 14, fontWeight: 600, color: "var(--text-primary)" }}>#{player.jerseyNumber || player.number}</span>
            <span style={{ fontSize: 14, color: "var(--text-secondary)" }}>{player.position}</span>
            <span style={{ color: "var(--text-muted)" }}>·</span>
            <span style={{ fontSize: 14, color: "var(--text-secondary)" }}>{player.club}</span>
            <span style={{ color: "var(--text-muted)" }}>·</span>
            <span style={{ fontSize: 14, fontWeight: 600, color: "var(--accent-gold)" }}>{player.marketValue}</span>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(90px, 1fr))", gap: 10, marginBottom: 14 }}>
            {[
              { v: player.age, l: "Age" },
              player.caps != null ? { v: player.caps, l: "Caps" } : null,
              player.goals != null ? { v: player.goals, l: "Goals" } : null,
              player.matchImpactScore != null ? { v: player.matchImpactScore, l: "Impact" } : null,
            ].filter(Boolean).map(s => s && (
              <div key={s.l} style={{ background: "var(--bg-secondary)", border: "1px solid var(--border)", borderRadius: 2, padding: "8px 10px", textAlign: "center" }}>
                <div style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 20, color: "var(--text-primary)", lineHeight: 1 }}>{s.v}</div>
                <div style={{ fontSize: 9, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.06em" }}>{s.l}</div>
              </div>
            ))}
          </div>
          <p style={{ fontSize: 13, color: "var(--text-secondary)", lineHeight: 1.65, fontStyle: "italic" }}>{player.highlights || player.fullBio}</p>
        </div>
      </div>

      {/* AI Prediction + Customize CTA */}
      <div style={{ borderTop: "1px solid var(--border)", paddingTop: 20, display: "flex", gap: 16, flexWrap: "wrap", justifyContent: "center" }}>
        <div style={{ background: "var(--gold-light)", border: "1px solid #fde68a", borderRadius: 4, padding: "14px 20px", textAlign: "center", flex: "1 1 300px" }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: "var(--accent-gold)", marginBottom: 4 }}>🤖 AI PREDICTION</div>
          <div style={{ fontFamily: "var(--font-body)", fontWeight: 600, fontSize: 13, color: "var(--text-primary)", lineHeight: 1.5 }}>
            {player.aiPrediction || (player.aiPredictedGoals != null ? `${player.aiPredictedGoals} goals projected in 2026 World Cup` : "Prediction pending — data loading")}
          </div>
        </div>
        <Link href="/supporter-kit" style={{ textDecoration: "none", flex: "1 1 300px", display: "flex" }}>
          <button className="btn-black" style={{ width: "100%", justifyContent: "center", fontSize: 14, padding: "16px 0" }}>
            🛒 Customize Jersey
          </button>
        </Link>
      </div>

      {/* More players crosslinks */}
      <div style={{ borderTop: "1px solid var(--border)", marginTop: 28, paddingTop: 20 }}>
        <div className="section-head" style={{ marginBottom: 12 }}>
          <div className="bar" /><span className="title">MORE PLAYERS</span><div className="rule" />
        </div>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          {ALL_PLAYERS.filter(p => p.id !== player.id).slice(0, 12).map(p => (
            <Link key={p.id} href={`/players/${p.id}`} style={{ textDecoration: "none" }}>
              <span style={{ fontFamily: "var(--font-body)", fontSize: 12, fontWeight: 500, color: "var(--accent-blue)", padding: "4px 10px", border: "1px solid var(--border)", borderRadius: 2, display: "inline-block" }}>{p.name}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
