import { useRoute, Link } from "wouter";
import { useState } from "react";

const flagUrl = (code: string) => `https://flagcdn.com/w80/${code.toLowerCase()}.png`;

// ─── Player Database ───────────────────────────────────────────
interface PlayerData {
  slug: string; name: string; number: number; position: string; club: string;
  age: number; caps: number; goals: number; flagCode: string; country: string;
  height: string; preferredFoot: string; marketValue: string;
  img: string; actionImg: string;
  bio: string;
  upcomingMatch: { opponent: string; date: string; venue: string; broadcast: string[] };
  aiAnalysis: { strengths: string[]; weaknesses: string[]; predictedImpact: string; };
}

const PLAYER_DB: Record<string, PlayerData> = {
  "guillermo-ochoa": {
    slug: "guillermo-ochoa", name: "Guillermo Ochoa", number: 13, position: "Goalkeeper",
    club: "Salernitana", age: 40, caps: 148, goals: 0, flagCode: "mx", country: "Mexico",
    height: "1.85m", preferredFoot: "Right", marketValue: "€800K",
    img: "https://images.unsplash.com/photo-1508341591423-4347099e1f19?w=300&q=80",
    actionImg: "https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=800&q=80",
    bio: "Guillermo Ochoa is Mexico's legendary goalkeeper, famous for his World Cup heroics. Known as 'Memo', he's made more saves than any active CONCACAF goalkeeper in World Cup history and remains El Tri's undisputed #1 heading into 2026.",
    upcomingMatch: { opponent: "South Africa", date: "June 11, 2026 · 20:00", venue: "Estadio Azteca, Mexico City", broadcast: ["FOX Sports (US)", "Televisa (MX)", "BBC One (UK)", "TSN (CA)"] },
    aiAnalysis: { strengths: ["Elite shot-stopping reflexes", "World Cup big-match experience", "Command of the penalty area on crosses"], weaknesses: ["Declining foot speed at age 40", "Distribution accuracy under pressure"], predictedImpact: "Ochoa remains the emotional leader of El Tri. Expect 4-5 critical saves per match. His World Cup experience is irreplaceable, but quick counter-attacks may expose his reduced mobility. Projected clean sheets: 1-2 in the group stage." },
  },
  "edson-alvarez": {
    slug: "edson-alvarez", name: "Edson Álvarez", number: 4, position: "Midfielder",
    club: "West Ham United", age: 28, caps: 78, goals: 5, flagCode: "mx", country: "Mexico",
    height: "1.87m", preferredFoot: "Right", marketValue: "€35M",
    img: "https://images.unsplash.com/photo-1543326727-cf6c39e8f84c?w=300&q=80",
    actionImg: "https://images.unsplash.com/photo-1551958219-acbc595d816f?w=800&q=80",
    bio: "Edson Álvarez is the midfield anchor for both West Ham United and the Mexican national team. A product of Club América's academy, he has developed into one of the most reliable defensive midfielders in the Premier League. His ball-winning ability and progressive passing make him indispensable to Mexico's 4-3-3 system.",
    upcomingMatch: { opponent: "South Africa", date: "June 11, 2026 · 20:00", venue: "Estadio Azteca, Mexico City", broadcast: ["FOX Sports (US)", "Televisa (MX)", "BBC One (UK)", "TSN (CA)"] },
    aiAnalysis: { strengths: ["Premier League-proven ball recovery", "Progressive line-breaking passes", "Aerial dominance in midfield duels"], weaknesses: ["Pace against quick transitional counters", "Discipline risk on yellow card accumulation"], predictedImpact: "Álvarez will be the key to Mexico's midfield control. His ability to break up opposition attacks and quickly transition to offense sets the tempo. Projected to average 4.2 tackles and 88% pass completion per match." },
  },
  "santiago-gimenez": {
    slug: "santiago-gimenez", name: "Santiago Giménez", number: 9, position: "Forward",
    club: "Feyenoord", age: 25, caps: 32, goals: 18, flagCode: "mx", country: "Mexico",
    height: "1.82m", preferredFoot: "Left", marketValue: "€50M",
    img: "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=300&q=80",
    actionImg: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800&q=80",
    bio: "Santiago Giménez is Mexico's most prolific striker, dominating the Eredivisie with Feyenoord. The son of former Argentine footballer Christian Giménez, 'Bebote' combines lethal finishing with intelligent off-the-ball movement. He averaged 0.8 goals per 90 minutes in the 2025-26 season.",
    upcomingMatch: { opponent: "South Africa", date: "June 11, 2026 · 20:00", venue: "Estadio Azteca, Mexico City", broadcast: ["FOX Sports (US)", "Televisa (MX)", "BBC One (UK)", "TSN (CA)"] },
    aiAnalysis: { strengths: ["Clinical finishing inside the box", "Off-the-ball movement to create space", "Strong aerial presence for a striker"], weaknesses: ["Limited involvement in build-up play", "Can be isolated against deep defensive blocks"], predictedImpact: "Giménez is Mexico's primary goal threat. His goal conversion rate of 24% ranks in the 95th percentile among CONCACAF strikers. Expect him to be the target of 40% of Mexico's attacking sequences. Predicted: 4 goals in the group stage." },
  },
  "ronwen-williams": {
    slug: "ronwen-williams", name: "Ronwen Williams", number: 1, position: "Goalkeeper",
    club: "Mamelodi Sundowns", age: 32, caps: 42, goals: 0, flagCode: "za", country: "South Africa",
    height: "1.84m", preferredFoot: "Right", marketValue: "€2.5M",
    img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&q=80",
    actionImg: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=800&q=80",
    bio: "Ronwen Williams is South Africa's captain and first-choice goalkeeper. Playing for dominant South African club Mamelodi Sundowns, he brings composure, leadership, and excellent distribution skills. He was instrumental in Bafana Bafana's qualification campaign.",
    upcomingMatch: { opponent: "Mexico", date: "June 11, 2026 · 20:00", venue: "Estadio Azteca, Mexico City", broadcast: ["SuperSport (ZA)", "FOX Sports (US)", "BBC One (UK)", "Televisa (MX)"] },
    aiAnalysis: { strengths: ["Commanding presence in the box", "Quick reflex saves from close range", "Leadership and defensive organization"], weaknesses: ["Limited experience against elite international forwards", "Height disadvantage on long-range efforts"], predictedImpact: "Williams faces a baptism of fire against Mexico at the Azteca. His shot-stopping will be tested by Mexico's dynamic front three. Expected to face 15+ shots. If he performs, South Africa could steal a point." },
  },
  "percy-tau": {
    slug: "percy-tau", name: "Percy Tau", number: 10, position: "Forward",
    club: "Al Ahly", age: 31, caps: 45, goals: 16, flagCode: "za", country: "South Africa",
    height: "1.75m", preferredFoot: "Right", marketValue: "€3M",
    img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&q=80",
    actionImg: "https://images.unsplash.com/photo-1508098682722-e99c643e7f0b?w=800&q=80",
    bio: "Percy Tau is South Africa's creative talisman and all-time leading active goalscorer. The 'Lion of Judah' made history as the first South African to play in the English Premier League (Brighton). Now at Egyptian giants Al Ahly, he remains Bafana Bafana's most dangerous attacking weapon.",
    upcomingMatch: { opponent: "Mexico", date: "June 11, 2026 · 20:00", venue: "Estadio Azteca, Mexico City", broadcast: ["SuperSport (ZA)", "FOX Sports (US)", "BBC One (UK)", "Televisa (MX)"] },
    aiAnalysis: { strengths: ["Dribbling in tight spaces", "Creative through-ball delivery", "Set-piece threat from direct free kicks"], weaknesses: ["Physicality against larger defenders", "Inconsistent finishing from distance"], predictedImpact: "Tau is South Africa's primary creative outlet. He will likely operate in the half-space behind the striker, looking to exploit Mexico's high defensive line. His link-up play with Makgopa is South Africa's best route to goal." },
  },
};

// ─── Component ────────────────────────────────────────────────
export default function PlayerProfile() {
  const [, params] = useRoute("/players/:slug");
  const slug = params?.slug || "guillermo-ochoa";
  const player = PLAYER_DB[slug];

  if (!player) {
    return (
      <div style={{ maxWidth: 900, margin: "0 auto", padding: "60px 20px", textAlign: "center", background: "#fff" }}>
        <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 28, marginBottom: 8 }}>Player Not Found</h1>
        <p style={{ fontSize: 14, color: "var(--text-secondary)", marginBottom: 20 }}>This player profile is not yet in our database.</p>
        <Link href="/matches" style={{ fontSize: 13, color: "var(--accent-blue)", textDecoration: "none" }}>← Back to Match Schedule</Link>
      </div>
    );
  }

  const canonicalUrl = `https://worldcuphacks.com/players/${player.slug}`;
  const pageTitle = `${player.name} — 2026 World Cup Player Profile, Stats & AI Analysis | WorldCupHacks`;
  const pageDesc = `${player.name} (${player.club}, ${player.country}) — ${player.age} years old, ${player.caps} caps, ${player.goals} goals. AI tactical breakdown, match broadcast info, and Supporter Kit gear.`;

  return (
    <div style={{ maxWidth: 960, margin: "0 auto", padding: "24px 20px 40px", background: "#fff" }}>
      {/* pSEO meta (injected via JS for crawlers; use react-helmet in production) */}
      <div style={{ display: "none" }} data-seo="true">
        <title>{pageTitle}</title>
        <meta name="description" content={pageDesc} />
        <link rel="canonical" href={canonicalUrl} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDesc} />
        <meta property="og:image" content={player.img} />
        <meta property="og:url" content={canonicalUrl} />
        <meta name="twitter:card" content="summary_large_image" />
      </div>

      {/* Breadcrumb */}
      <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 20, fontSize: 11, color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}>
        <Link href="/" style={{ color: "var(--text-muted)", textDecoration: "none" }}>Home</Link>
        <span>/</span>
        <Link href="/matches" style={{ color: "var(--text-muted)", textDecoration: "none" }}>Matches</Link>
        <span>/</span>
        <span style={{ color: "var(--text-primary)" }}>{player.name}</span>
      </div>

      {/* ── HERO HEADER ───────────────────────────────────── */}
      <div style={{ display: "flex", gap: 24, marginBottom: 28, flexWrap: "wrap" }}>
        <img src={player.img} alt={player.name}
          style={{ width: 160, height: 160, borderRadius: "50%", objectFit: "cover", flexShrink: 0, border: "4px solid var(--border)" }}
          onError={e => { (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1543326727-cf6c39e8f84c?w=300&q=80"; }} />
        <div style={{ flex: 1, minWidth: 260 }}>
          <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 900, fontSize: "clamp(28px, 4vw, 40px)", marginBottom: 2 }}>{player.name}</h1>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10, flexWrap: "wrap" }}>
            <img src={flagUrl(player.flagCode)} alt={player.country} style={{ width: 24, height: 16, objectFit: "contain" }} />
            <span style={{ fontSize: 14, color: "var(--text-secondary)" }}>{player.country}</span>
            <span style={{ color: "var(--text-muted)" }}>·</span>
            <span style={{ fontSize: 14, fontWeight: 600, color: "var(--text-primary)" }}>#{player.number}</span>
            <span style={{ fontSize: 14, color: "var(--text-secondary)" }}>{player.position}</span>
            <span style={{ color: "var(--text-muted)" }}>·</span>
            <span style={{ fontSize: 14, color: "var(--text-secondary)" }}>{player.club}</span>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(100px, 1fr))", gap: 10, marginBottom: 14 }}>
            {[
              { v: player.age, l: "Age" }, { v: player.caps, l: "Caps" },
              { v: player.goals, l: "Int'l Goals" }, { v: player.marketValue, l: "Market Value" },
            ].map(({ v, l }) => (
              <div key={l} style={{ background: "var(--bg-secondary)", border: "1px solid var(--border)", borderRadius: 2, padding: "8px 10px", textAlign: "center" }}>
                <div style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 20, color: "var(--text-primary)", lineHeight: 1 }}>{typeof v === "string" ? v : v}</div>
                <div style={{ fontSize: 9, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.06em" }}>{l}</div>
              </div>
            ))}
          </div>
          <div style={{ fontSize: 12, color: "var(--text-secondary)", display: "flex", gap: 16 }}>
            <span>📏 {player.height}</span>
            <span>🦶 {player.preferredFoot}</span>
          </div>
        </div>
      </div>

      {/* ── BIO ───────────────────────────────────────────── */}
      <p style={{ fontSize: 14, color: "var(--text-secondary)", lineHeight: 1.7, marginBottom: 28, fontStyle: "italic" }}>{player.bio}</p>

      {/* ═══ THREE COLUMN GRID ═══════════════════════════════ */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 20, marginBottom: 32 }}>

        {/* ── BLOCK 1: LIVE MATCH BROADCAST ──────────────── */}
        <div style={{ border: "1px solid var(--border)", background: "#fff" }}>
          <div style={{ background: "#FEF2F2", borderBottom: "1px solid #FECACA", padding: "10px 14px", display: "flex", alignItems: "center", gap: 6 }}>
            <span className="live-dot" />
            <span style={{ fontFamily: "var(--font-body)", fontWeight: 700, fontSize: 10, color: "var(--accent-red)", letterSpacing: "0.08em", textTransform: "uppercase" }}>LIVE MATCH BROADCAST</span>
          </div>
          <div style={{ padding: 14 }}>
            <div style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 14, marginBottom: 2 }}>
              {player.country} vs {player.upcomingMatch.opponent}
            </div>
            <div style={{ fontSize: 11, color: "var(--text-muted)", marginBottom: 4 }}>{player.upcomingMatch.date}</div>
            <div style={{ fontSize: 11, color: "var(--text-muted)", marginBottom: 10 }}>{player.upcomingMatch.venue}</div>
            <div style={{ fontSize: 10, fontWeight: 700, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 6 }}>📺 Where to Watch</div>
            {player.upcomingMatch.broadcast.map(b => (
              <div key={b} style={{ fontSize: 12, color: "var(--text-secondary)", padding: "3px 0", borderBottom: "1px solid var(--border)" }}>{b}</div>
            ))}
          </div>
        </div>

        {/* ── BLOCK 2: SUPPORTER KIT ─────────────────────── */}
        <div style={{ border: "1px solid var(--border)", background: "#fff" }}>
          <div style={{ background: "#111827", padding: "10px 14px" }}>
            <span style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 14, color: "#fff", letterSpacing: "0.02em" }}>👕 SUPPORTER KIT</span>
          </div>
          <div style={{ padding: 14 }}>
            <p style={{ fontSize: 12, color: "var(--text-secondary)", lineHeight: 1.6, marginBottom: 14 }}>
              Rep {player.name} on match day. Our 3-Nation Heavyweight Hoodie features the embroidered tri-flag crest — perfect for showing your colors at the stadium.
            </p>
            <div style={{ display: "flex", gap: 12, marginBottom: 14 }}>
              <div style={{ textAlign: "center", flex: 1 }}>
                <img src="https://images.unsplash.com/photo-1556821840-3a63f15732ce?w=150&q=85" alt="Hoodie"
                  style={{ width: "100%", height: 100, objectFit: "cover", border: "1px solid var(--border)", borderRadius: 2 }} />
                <div style={{ fontSize: 10, fontWeight: 600, marginTop: 4 }}>Hoodie</div>
                <div style={{ fontSize: 10, color: "var(--text-muted)" }}>$45.00</div>
              </div>
              <div style={{ textAlign: "center", flex: 1 }}>
                <img src="https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=150&q=85" alt="Cap"
                  style={{ width: "100%", height: 100, objectFit: "cover", border: "1px solid var(--border)", borderRadius: 2 }} />
                <div style={{ fontSize: 10, fontWeight: 600, marginTop: 4 }}>Cap</div>
                <div style={{ fontSize: 10, color: "var(--text-muted)" }}>$24.99</div>
              </div>
            </div>
            <Link href="/supporter-kit" style={{ textDecoration: "none" }}>
              <button className="btn-black" style={{ width: "100%", justifyContent: "center", fontSize: 12, padding: "10px 0" }}>
                🛒 SHOP SUPPORTER KIT →
              </button>
            </Link>
          </div>
        </div>

        {/* ── BLOCK 3: AI TACTICAL ANALYSIS ───────────────── */}
        <div style={{ border: "1px solid var(--border)", background: "#fff" }}>
          <div style={{ background: "var(--gold-light)", borderBottom: "1px solid #fde68a", padding: "10px 14px", display: "flex", alignItems: "center", gap: 6 }}>
            <span style={{ fontSize: 16 }}>🤖</span>
            <span style={{ fontFamily: "var(--font-body)", fontWeight: 700, fontSize: 10, color: "var(--accent-gold)", letterSpacing: "0.08em", textTransform: "uppercase" }}>AI TACTICAL ANALYSIS</span>
          </div>
          <div style={{ padding: 14 }}>
            <div style={{ fontSize: 10, fontWeight: 700, color: "var(--green)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 8 }}>Strengths</div>
            <ul style={{ marginBottom: 14, paddingLeft: 16 }}>
              {player.aiAnalysis.strengths.map((s, i) => (
                <li key={i} style={{ fontSize: 12, color: "var(--text-secondary)", lineHeight: 1.6, marginBottom: 4 }}>{s}</li>
              ))}
            </ul>
            <div style={{ fontSize: 10, fontWeight: 700, color: "var(--accent-red)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 8 }}>Areas to Watch</div>
            <ul style={{ marginBottom: 14, paddingLeft: 16 }}>
              {player.aiAnalysis.weaknesses.map((w, i) => (
                <li key={i} style={{ fontSize: 12, color: "var(--text-secondary)", lineHeight: 1.6, marginBottom: 4 }}>{w}</li>
              ))}
            </ul>
            <div style={{ background: "var(--bg-secondary)", border: "1px solid var(--border)", borderRadius: 2, padding: 10, marginBottom: 4 }}>
              <div style={{ fontSize: 10, fontWeight: 700, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 4 }}>Predicted Impact</div>
              <p style={{ fontSize: 12, color: "var(--text-secondary)", lineHeight: 1.6, marginBottom: 0 }}>{player.aiAnalysis.predictedImpact}</p>
            </div>
            <div style={{ fontSize: 9, color: "var(--text-muted)", fontStyle: "italic", marginTop: 6 }}>For entertainment only. Not betting advice. AI model: Gemini · Updated daily.</div>
          </div>
        </div>
      </div>

      {/* ── Crosslink: other players ──────────────────────────── */}
      <div style={{ borderTop: "1px solid var(--border)", paddingTop: 20 }}>
        <div className="section-head" style={{ marginBottom: 12 }}>
          <div className="bar" /><span className="title">MORE PLAYERS</span><div className="rule" />
        </div>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          {Object.values(PLAYER_DB).filter(p => p.slug !== player.slug).slice(0, 6).map(p => (
            <Link key={p.slug} href={`/players/${p.slug}`} style={{ textDecoration: "none" }}>
              <span style={{
                fontFamily: "var(--font-body)", fontSize: 12, fontWeight: 500,
                color: "var(--accent-blue)", cursor: "pointer",
                padding: "4px 10px", border: "1px solid var(--border)", borderRadius: 2,
                display: "inline-block", transition: "background 0.1s",
              }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "var(--bg-secondary)"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "transparent"; }}
              >{p.name}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
