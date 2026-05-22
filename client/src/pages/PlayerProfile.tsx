import { useRoute, Link } from "wouter";
import worldcupData from "@/data/worldcup2026.json";

const flagUrl = (code: string) => `https://flagcdn.com/w80/${code.toLowerCase()}.png`;

function getBroadcast(flagCode: string) {
  const entry = (worldcupData.broadcasters as Record<string, any>)[flagCode];
  return entry?.upcoming || null;
}

// ─── Country-Based Merch Catalog ─────────────────────────────────
const COUNTRY_MERCH: Record<string, { name: string; price: string; img: string }[]> = {
  mx: [
    { name: "Mexico Vintage Edition Hoodie", price: "$45.00", img: "/hoodie.png" },
    { name: "Mexico Official Jersey Tee", price: "$29.99", img: "/jersey.png" },
    { name: "Estadio Azteca Print Hoodie", price: "$45.00", img: "/hoodie.png" },
  ],
  fr: [
    { name: "Les Bleus #10 Jersey Tee", price: "$29.99", img: "https://images.unsplash.com/photo-1556821840-3a63f15732ce?w=300&q=85" },
    { name: "French Blue Supporter Cap", price: "$24.99", img: "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=300&q=85" },
    { name: "Paris Victory Hoodie", price: "$45.00", img: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=300&q=85" },
  ],
  za: [
    { name: "Bafana Bafana Supporter Tee", price: "$29.99", img: "https://images.unsplash.com/photo-1556821840-3a63f15732ce?w=300&q=85" },
    { name: "South Africa Fan Cap", price: "$24.99", img: "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=300&q=85" },
    { name: "Rainbow Nation Hoodie", price: "$45.00", img: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=300&q=85" },
  ],
  default: [
    { name: "World Cup 2026 Supporter Tee", price: "$29.99", img: "https://images.unsplash.com/photo-1556821840-3a63f15732ce?w=300&q=85" },
    { name: "Classic Fan Cap", price: "$24.99", img: "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=300&q=85" },
    { name: "Stadium Ready Hoodie", price: "$45.00", img: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=300&q=85" },
  ],
};

function getMerchForCountry(flagCode: string): { name: string; price: string; img: string }[] {
  return COUNTRY_MERCH[flagCode] || COUNTRY_MERCH.default;
}

// ─── Player Datasets ────────────────────────────────────────────
interface PlayerData {
  slug: string; name: string; number: number; position: string; club: string;
  age: number; caps: number; goals: number; flagCode: string; country: string;
  height: string; preferredFoot: string; marketValue: string;
  img: string; actionImg: string; bio: string;
  stats: { label: string; value: string }[];
  aiTactical: { strengths: string[]; weaknesses: string[]; longTailKeywords: string[]; predictedImpact: string; };
}

const PLAYER_DB: Record<string, PlayerData> = {
  "kylian-mbappe": {
    slug: "kylian-mbappe", name: "Kylian Mbappé", number: 10, position: "Forward",
    club: "Real Madrid", age: 27, caps: 92, goals: 56, flagCode: "fr", country: "France",
    height: "1.78m", preferredFoot: "Right", marketValue: "€180M",
    img: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=400&q=85",
    actionImg: "https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=1200&q=85",
    bio: "Kylian Mbappé is the most electrifying forward in world football. The France captain and Real Madrid superstar arrives at the 2026 World Cup at his physical peak. After a record-breaking La Liga season, he is the undisputed favourite to claim both the Golden Boot and lead France to back-to-back World Cup titles.",
    stats: [
      { label: "Goals/90", value: "0.82" }, { label: "xG/90", value: "0.74" },
      { label: "Shot Accuracy", value: "62%" }, { label: "Dribbles/90", value: "4.1" },
      { label: "Key Passes/90", value: "2.3" }, { label: "Match Rating", value: "8.4" },
    ],
    aiTactical: {
      strengths: ["World-class acceleration over first 5 meters", "Clinical finishing from both feet inside the box", "Intelligent off-ball movement that stretches defensive lines", "Penalty box composure — 91% career conversion rate"],
      weaknesses: ["Can drift wide and become isolated in low-block systems", "Defensive pressing intensity drops late in matches", "Occasional frustration against physical double-marking"],
      longTailKeywords: [
        "Mbappé 2026 World Cup goals prediction",
        "Kylian Mbappé Golden Boot odds 2026",
        "Mbappé France World Cup captain tactics",
        "Mbappé vs Haaland 2026 World Cup comparison",
        "Mbappé Real Madrid World Cup form 2026",
        "Kylian Mbappé World Cup knockout stage record",
      ],
      predictedImpact: "Mbappé is projected to generate 0.82 xG per 90 minutes, the highest of any forward at the 2026 World Cup. France's tactical system is built around his pace on the left channel and his ability to cut inside onto his right foot. Expect him to be the target of 45% of France's attacking sequences. AI models predict a 28% probability of winning the Golden Boot.",
    },
  },
  "guillermo-ochoa": {
    slug: "guillermo-ochoa", name: "Guillermo Ochoa", number: 13, position: "Goalkeeper",
    club: "Salernitana", age: 40, caps: 148, goals: 0, flagCode: "mx", country: "Mexico",
    height: "1.85m", preferredFoot: "Right", marketValue: "€800K",
    img: "https://images.unsplash.com/photo-1508341591423-4347099e1f19?w=400&q=85",
    actionImg: "https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=1200&q=85",
    bio: "Guillermo Ochoa is Mexico's legendary goalkeeper, famous for his World Cup heroics. Known as 'Memo', he's made more saves than any active CONCACAF goalkeeper in World Cup history and remains El Tri's undisputed #1 heading into 2026.",
    upcomingMatch: { opponent: "South Africa", date: "June 11, 2026 · 20:00", venue: "Estadio Azteca, Mexico City", broadcast: ["FOX Sports (US)", "Televisa (MX)", "BBC One (UK)", "TSN (CA)"] },
    stats: [{ label: "Save %", value: "76%" }, { label: "Clean Sheets", value: "58" }, { label: "Saves/90", value: "3.8" }, { label: "Pen Saved", value: "4" }, { label: "Match Rating", value: "7.2" }],
    aiTactical: { strengths: ["Elite shot-stopping reflexes", "World Cup big-match experience"], weaknesses: ["Declining foot speed at age 40"], longTailKeywords: ["Ochoa World Cup 2026 saves", "Mexico goalkeeper Ochoa World Cup"], predictedImpact: "Ochoa remains the emotional leader of El Tri. Projected clean sheets: 1-2 in group stage." },
    merch: [{ name: "Ochoa #13 Mexico Jersey", price: "$29.99", img: "https://images.unsplash.com/photo-1556821840-3a63f15732ce?w=300&q=85" }, { name: "El Tri Supporter Cap", price: "$24.99", img: "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=300&q=85" }],
  },
  "santiago-gimenez": {
    slug: "santiago-gimenez", name: "Santiago Giménez", number: 9, position: "Forward",
    club: "Feyenoord", age: 25, caps: 32, goals: 18, flagCode: "mx", country: "Mexico",
    height: "1.82m", preferredFoot: "Left", marketValue: "€50M",
    img: "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=400&q=85",
    actionImg: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=1200&q=85",
    bio: "Santiago Giménez is Mexico's most prolific striker, dominating the Eredivisie with Feyenoord. He averaged 0.8 goals per 90 minutes in the 2025-26 season.",
    upcomingMatch: { opponent: "South Africa", date: "June 11, 2026 · 20:00", venue: "Estadio Azteca, Mexico City", broadcast: ["FOX Sports (US)", "Televisa (MX)", "BBC One (UK)"] },
    stats: [{ label: "Goals/90", value: "0.71" }, { label: "xG/90", value: "0.58" }, { label: "Shot Acc", value: "54%" }, { label: "Conv Rate", value: "24%" }, { label: "Match Rating", value: "7.6" }],
    aiTactical: { strengths: ["Clinical finishing inside the box", "Off-the-ball movement"], weaknesses: ["Limited build-up involvement"], longTailKeywords: ["Gimenez Mexico striker 2026", "Santiago Gimenez World Cup goals"], predictedImpact: "Mexico's primary goal threat. Predicted: 4 goals in group stage." },
    merch: [{ name: "Giménez #9 Mexico Tee", price: "$29.99", img: "https://images.unsplash.com/photo-1556821840-3a63f15732ce?w=300&q=85" }, { name: "Mexico Fan Cap", price: "$24.99", img: "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=300&q=85" }],
  },
  "percy-tau": {
    slug: "percy-tau", name: "Percy Tau", number: 10, position: "Forward",
    club: "Al Ahly", age: 31, caps: 45, goals: 16, flagCode: "za", country: "South Africa",
    height: "1.75m", preferredFoot: "Right", marketValue: "€3M",
    img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=85",
    actionImg: "https://images.unsplash.com/photo-1508098682722-e99c643e7f0b?w=1200&q=85",
    bio: "Percy Tau is South Africa's creative talisman and all-time leading active goalscorer. The 'Lion of Judah' made history as the first South African in the Premier League (Brighton).",
    upcomingMatch: { opponent: "Mexico", date: "June 11, 2026 · 20:00", venue: "Estadio Azteca, Mexico City", broadcast: ["SuperSport (ZA)", "FOX Sports (US)", "BBC One (UK)"] },
    stats: [{ label: "Goals/90", value: "0.41" }, { label: "Assists/90", value: "0.28" }, { label: "Dribbles/90", value: "3.2" }, { label: "Key Pass/90", value: "2.1" }, { label: "Match Rating", value: "7.1" }],
    aiTactical: { strengths: ["Dribbling in tight spaces", "Creative through-ball delivery"], weaknesses: ["Physicality against larger defenders"], longTailKeywords: ["Percy Tau South Africa 2026", "Bafana Bafana Tau World Cup"], predictedImpact: "SA's primary creative outlet. His link-up with Makgopa is their best route to goal." },
    merch: [{ name: "Tau #10 SA Tee", price: "$29.99", img: "https://images.unsplash.com/photo-1556821840-3a63f15732ce?w=300&q=85" }, { name: "Bafana Fan Cap", price: "$24.99", img: "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=300&q=85" }],
  },
};

// ─── Page Component ────────────────────────────────────────────
export default function PlayerProfile() {
  const [, params] = useRoute("/players/:slug");
  const slug = params?.slug || "kylian-mbappe";
  const player = PLAYER_DB[slug];

  if (!player) {
    return (
      <div style={{ maxWidth: 960, margin: "60px auto", padding: "20px", textAlign: "center", background: "#fff" }}>
        <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 28, marginBottom: 8 }}>Player Not Found</h1>
        <p style={{ fontSize: 14, color: "var(--text-secondary)", marginBottom: 20 }}>This player profile hasn't been indexed yet. Check back soon.</p>
        <Link href="/matches" style={{ fontSize: 13, color: "var(--accent-blue)", textDecoration: "none" }}>← Back to Match Schedule</Link>
      </div>
    );
  }

  const canonicalUrl = `https://worldcuphacks.com/players/${player.slug}`;
  const pageTitle = `${player.name} — 2026 World Cup Player Profile, Stats & AI Analysis | WorldCupHacks`;

  return (
    <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 20px 40px", background: "#fff" }}>
      {/* pSEO */}
      <div style={{ display: "none" }}>
        <title>{pageTitle}</title>
        <meta name="description" content={`${player.name} (${player.club}, ${player.country}) — ${player.age} years old, ${player.caps} caps, ${player.goals} goals. AI tactical breakdown, live match broadcast, supporter kit.`} />
        <link rel="canonical" href={canonicalUrl} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:image" content={player.img} />
        <script type="application/ld+json">{`{"@context":"https://schema.org","@type":"Person","name":"${player.name}","jobTitle":"Professional Football Player","affiliation":{"@type":"SportsTeam","name":"${player.country} National Team"}}`}</script>
      </div>

      {/* Breadcrumb */}
      <div style={{ display: "flex", gap: 6, padding: "16px 0", fontSize: 11, color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}>
        <Link href="/" style={{ color: "var(--text-muted)", textDecoration: "none" }}>Home</Link><span>/</span>
        <Link href="/matches" style={{ color: "var(--text-muted)", textDecoration: "none" }}>Matches</Link><span>/</span>
        <span style={{ color: "var(--text-primary)" }}>{player.name}</span>
      </div>

      {/* ═══ HERO BANNER — full-width action photo ═══════════════ */}
      <div style={{ position: "relative", height: 340, overflow: "hidden", border: "1px solid var(--border)", marginBottom: 28 }}>
        <img src={player.actionImg} alt={player.name} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
          onError={e => { (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=1200&q=85"; }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.2) 60%, rgba(0,0,0,0.1) 100%)" }} />
        {/* Hero overlay content */}
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "28px 28px 24px", display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 20, flexWrap: "wrap" }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
              <img src={player.img} alt="" style={{ width: 64, height: 64, borderRadius: "50%", objectFit: "cover", border: "3px solid #fff", flexShrink: 0 }}
                onError={e => { (e.target as HTMLImageElement).style.display = "none"; }} />
              <div>
                <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 900, fontSize: "clamp(28px, 4vw, 42px)", color: "#fff", lineHeight: 1.05, marginBottom: 2 }}>{player.name}</h1>
                <div style={{ display: "flex", alignItems: "center", gap: 6, flexWrap: "wrap" }}>
                  <img src={flagUrl(player.flagCode)} alt="" style={{ width: 20, height: 14, objectFit: "contain" }} />
                  <span style={{ fontSize: 13, color: "rgba(255,255,255,0.8)" }}>{player.country} · #{player.number} · {player.position}</span>
                  <span style={{ fontSize: 13, color: "rgba(255,255,255,0.5)" }}>· {player.club}</span>
                </div>
              </div>
            </div>
          </div>
          <div style={{ background: "rgba(0,0,0,0.5)", borderRadius: 2, padding: "10px 14px", textAlign: "center", flexShrink: 0 }}>
            <div style={{ fontFamily: "var(--font-display)", fontWeight: 900, fontSize: 28, color: "var(--gold-primary)", lineHeight: 1 }}>{player.marketValue}</div>
            <div style={{ fontSize: 9, color: "rgba(255,255,255,0.5)", textTransform: "uppercase", letterSpacing: "0.1em" }}>Market Value</div>
          </div>
        </div>
      </div>

      {/* ═══ 2-COLUMN LAYOUT ══════════════════════════════════════ */}
      <div style={{ display: "flex", gap: 20, flexWrap: "wrap" }}>
        {/* ── LEFT (60%) ──────────────────────────────────────── */}
        <div style={{ flex: "1 1 600px", minWidth: 0 }}>

          {/* ── BIO ────────────────────────────────────────── */}
          <p style={{ fontSize: 14, color: "var(--text-secondary)", lineHeight: 1.7, fontStyle: "italic", marginBottom: 24 }}>{player.bio}</p>

          {/* ── LIVE BROADCAST ─────────────────────────────── */}
          {(() => {
            const broadcast = getBroadcast(player.flagCode);
            if (!broadcast) return null;
            return (
              <div style={{ border: "1px solid var(--border)", background: "#fff", marginBottom: 20 }}>
                <div style={{ background: "#FEF2F2", borderBottom: "1px solid #FECACA", padding: "10px 16px", display: "flex", alignItems: "center", gap: 6 }}>
                  <span className="live-dot" />
                  <span style={{ fontFamily: "var(--font-body)", fontWeight: 700, fontSize: 10, color: "var(--accent-red)", letterSpacing: "0.08em", textTransform: "uppercase" }}>LIVE BROADCAST — Where to Watch</span>
                </div>
                <div style={{ padding: "16px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
                    <img src={flagUrl(player.flagCode)} alt="" style={{ width: 28, height: 20, objectFit: "contain", flexShrink: 0 }} />
                    <span style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 16 }}>{broadcast.team}</span>
                    <span style={{ fontSize: 12, color: "var(--text-muted)" }}>vs</span>
                    <span style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 16 }}>{broadcast.opponent}</span>
                    <img src={flagUrl(broadcast.opponentFlag)} alt="" style={{ width: 28, height: 20, objectFit: "contain", flexShrink: 0 }} />
                  </div>
                  <div style={{ fontSize: 12, color: "var(--text-muted)", marginBottom: 2 }}>{broadcast.date} · {broadcast.time}</div>
                  <div style={{ fontSize: 12, color: "var(--text-muted)", marginBottom: 2 }}>📍 {broadcast.venue}</div>
                  <div style={{ fontSize: 11, color: "var(--text-muted)", marginBottom: 12, fontFamily: "var(--font-mono)" }}>{broadcast.stage}</div>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: 6 }}>
                    {broadcast.channels.map((ch: any) => (
                      <a key={ch.name} href={ch.url} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none" }}>
                        <div style={{ fontSize: 12, color: "var(--text-secondary)", padding: "6px 10px", border: "1px solid var(--border)", borderRadius: 2, background: "var(--bg-secondary)", transition: "background 0.1s", cursor: "pointer" }}
                          onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "#f3f4f6"; }}
                          onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "var(--bg-secondary)"; }}>
                          📺 <strong>{ch.name}</strong> <span style={{ fontSize: 10, color: "var(--text-muted)" }}>· {ch.region}</span>
                        </div>
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            );
          })()}

          {/* ── AI TACTICAL HACK ────────────────────────────── */}
          <div style={{ border: "1px solid var(--border)", background: "#fff", marginBottom: 20 }}>
            <div style={{ background: "var(--gold-light)", borderBottom: "1px solid #fde68a", padding: "10px 16px", display: "flex", alignItems: "center", gap: 6 }}>
              <span style={{ fontSize: 16 }}>🤖</span>
              <span style={{ fontFamily: "var(--font-body)", fontWeight: 700, fontSize: 10, color: "var(--accent-gold)", letterSpacing: "0.08em", textTransform: "uppercase" }}>AI TACTICAL ANALYSIS</span>
            </div>
            <div style={{ padding: "16px", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 16 }}>
              {/* Strengths + Weaknesses */}
              <div>
                <div style={{ fontSize: 10, fontWeight: 700, color: "var(--green)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 8 }}>✓ Strengths</div>
                <ul style={{ paddingLeft: 14, marginBottom: 14 }}>
                  {player.aiTactical.strengths.map((s, i) => <li key={i} style={{ fontSize: 12, color: "var(--text-secondary)", lineHeight: 1.6, marginBottom: 4 }}>{s}</li>)}
                </ul>
                <div style={{ fontSize: 10, fontWeight: 700, color: "var(--accent-red)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 8 }}>⚠ Areas to Watch</div>
                <ul style={{ paddingLeft: 14 }}>
                  {player.aiTactical.weaknesses.map((w, i) => <li key={i} style={{ fontSize: 12, color: "var(--text-secondary)", lineHeight: 1.6, marginBottom: 4 }}>{w}</li>)}
                </ul>
              </div>
              {/* Predicted Impact + Keywords */}
              <div>
                <div style={{ background: "var(--bg-secondary)", border: "1px solid var(--border)", borderRadius: 2, padding: 10, marginBottom: 12 }}>
                  <div style={{ fontSize: 10, fontWeight: 700, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 4 }}>Predicted Impact</div>
                  <p style={{ fontSize: 12, color: "var(--text-secondary)", lineHeight: 1.65, margin: 0 }}>{player.aiTactical.predictedImpact}</p>
                </div>
                <div style={{ fontSize: 10, fontWeight: 700, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 6 }}>Fan Search Trends</div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
                  {player.aiTactical.longTailKeywords.map((kw, i) => (
                    <span key={i} style={{ fontSize: 10, color: "var(--accent-blue)", background: "#eff6ff", border: "1px solid #bfdbfe", padding: "3px 7px", borderRadius: 2 }}>{kw}</span>
                  ))}
                </div>
              </div>
            </div>
            <div style={{ fontSize: 9, color: "var(--text-muted)", fontStyle: "italic", padding: "0 16px 12px" }}>For entertainment purposes only. AI model: Gemini · Updated daily.</div>
          </div>
        </div>

        {/* ── RIGHT (40%) — Stats + Merch ─────────────────────── */}
        <div style={{ flex: "0 0 340px", display: "flex", flexDirection: "column", gap: 20 }}>
          {/* ── KEY STATS GRID ─────────────────────────────── */}
          <div style={{ border: "1px solid var(--border)", background: "#fff" }}>
            <div style={{ background: "#111827", padding: "10px 16px" }}>
              <span style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 14, color: "#fff", letterSpacing: "0.03em" }}>📊 KEY PERFORMANCE STATS</span>
            </div>
            <div style={{ padding: "10px", display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 8 }}>
              {player.stats.map(s => (
                <div key={s.label} style={{ background: "var(--bg-secondary)", border: "1px solid var(--border)", borderRadius: 2, padding: "10px", textAlign: "center" }}>
                  <div style={{ fontFamily: "var(--font-display)", fontWeight: 900, fontSize: 22, color: "var(--text-primary)", lineHeight: 1 }}>{s.value}</div>
                  <div style={{ fontSize: 9, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.06em", marginTop: 2 }}>{s.label}</div>
                </div>
              ))}
            </div>
            {/* Quick facts */}
            <div style={{ padding: "8px 16px 14px", display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8 }}>
              {[{ l: "Age", v: player.age }, { l: "Caps", v: player.caps }, { l: "Goals", v: player.goals }].map(({ l, v }) => (
                <div key={l} style={{ textAlign: "center" }}>
                  <div style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 18 }}>{v}</div>
                  <div style={{ fontSize: 9, color: "var(--text-muted)", textTransform: "uppercase" }}>{l}</div>
                </div>
              ))}
            </div>
          </div>

          {/* ── SUPPORTER KIT MERCH ─────────────────────────── */}
          <div style={{ border: "1px solid var(--border)", background: "#fff" }}>
            <div style={{ background: "#111827", padding: "10px 16px" }}>
              <span style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 14, color: "#fff", letterSpacing: "0.03em" }}>👕 {player.name.split(" ").pop()} SUPPORTER KIT</span>
            </div>
            <div style={{ padding: "12px" }}>
              {/* Design Layer + Size selectors */}
              <div style={{ marginBottom: 12 }}>
                <div style={{ fontSize: 9, fontWeight: 600, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 4 }}>Design Layer</div>
                <select style={{ width: "100%", padding: "7px 10px", marginBottom: 8, fontFamily: "var(--font-body)", fontSize: 11, color: "var(--text-primary)", background: "#fff", border: "1px solid var(--border)", borderRadius: 2, cursor: "pointer", outline: "none", appearance: "none" }}>
                  <option>Mexico Vintage Edition</option>
                  <option>USA Heritage Edition</option>
                  <option>Canada Classic Edition</option>
                </select>
                <div style={{ fontSize: 9, fontWeight: 600, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 4 }}>Size</div>
                <select style={{ width: "100%", padding: "7px 10px", fontFamily: "var(--font-body)", fontSize: 11, color: "var(--text-primary)", background: "#fff", border: "1px solid var(--border)", borderRadius: 2, cursor: "pointer", outline: "none", appearance: "none" }}>
                  {["S","M","L","XL","XXL"].map(sz => <option key={sz} value={sz}>{sz}</option>)}
                </select>
              </div>
              {/* Merch items with lookbook image */}
              {getMerchForCountry(player.flagCode).map((item, idx) => (
                <div key={idx} style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 0", borderBottom: idx < getMerchForCountry(player.flagCode).length - 1 ? "1px solid var(--border)" : "none" }}>
                  <img src={item.img} alt={item.name} style={{ width: 56, height: 56, objectFit: "cover", borderRadius: 2, flexShrink: 0, border: "1px solid var(--border)", background: "#f9fafb" }}
                    onError={e => { (e.target as HTMLImageElement).style.display = "none"; }} />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 12, fontWeight: 600, color: "var(--text-primary)", lineHeight: 1.3 }}>{item.name}</div>
                    <div style={{ fontSize: 11, color: "var(--text-muted)" }}>{item.price}</div>
                  </div>
                  <button className="btn-black" style={{ fontSize: 10, padding: "6px 12px" }}
                    onClick={() => alert(`${player.name}'s Supporter Kit [Size M] added to cart. Stripe Checkout is initializing securely…`)}>BUY</button>
                </div>
              ))}
              <Link href="/supporter-kit" style={{ textDecoration: "none", display: "block", marginTop: 12 }}>
                <button className="btn-black" style={{ width: "100%", justifyContent: "center", fontSize: 12, padding: "10px 0" }}>🛒 VIEW ALL SUPPORTER KIT</button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* ── MORE PLAYERS ──────────────────────────────────────── */}
      <div style={{ borderTop: "1px solid var(--border)", marginTop: 32, paddingTop: 20 }}>
        <div className="section-head" style={{ marginBottom: 12 }}>
          <div className="bar" /><span className="title">MORE PLAYERS</span><div className="rule" />
        </div>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          {Object.values(PLAYER_DB).filter(p => p.slug !== player.slug).map(p => (
            <Link key={p.slug} href={`/players/${p.slug}`} style={{ textDecoration: "none" }}>
              <span style={{ fontFamily: "var(--font-body)", fontSize: 12, fontWeight: 500, color: "var(--accent-blue)", cursor: "pointer", padding: "4px 10px", border: "1px solid var(--border)", borderRadius: 2, display: "inline-block" }}>{p.name}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
