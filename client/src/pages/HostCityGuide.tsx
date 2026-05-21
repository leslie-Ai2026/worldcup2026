const SMART_STAY_ARTICLES = [
  {
    id: "la-sofi-hacks",
    city: "Los Angeles",
    stadium: "SoFi Stadium",
    title: "Metro K-Line Hacks: Avoid $400 Hollywood Hotels",
    image: "https://images.unsplash.com/photo-1541185933-ef5d8ed016c2?q=80&w=600&auto=format&fit=crop",
    badge: "Transportation + Lodging",
    summary: "Don't fall for the tourist trap of staying in Hollywood or Downtown LA. Lock in vetted B&Bs and local motels along the newly expanded Metro K-Line (Crenshaw/LAX). You'll bypass matchday Uber surge pricing (which easily hits $150+ near Inglewood) and slash your accommodation costs by up to 60%. SoFi Stadium is directly accessible via the free Matchday Express shuttle from the Hawthorne/Lennox station.",
    bulletPoints: [
      "Target accommodations near Hawthorne Blvd or Inglewood transit hubs.",
      "Average cost: $110 - $160/night (vs $400+ in corporate zones).",
      "Bonus: Regional rail provides seamless airport connections to LAX.",
    ],
    affiliateLink: "https://www.booking.com/searchresults.html?ss=Los+Angeles&aid=YOUR_AFFILIATE_ID",
    ctaText: "Find Verified Budget Deals on Booking.com →",
  },
  {
    id: "ny-metlife-hacks",
    city: "New York / New Jersey",
    stadium: "MetLife Stadium",
    title: "The Secaucus Transit Secret: Skip Manhattan Extortion",
    image: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?q=80&w=600&auto=format&fit=crop",
    badge: "Lodging Hack",
    summary: "Manhattan hotel rates will skyrocket beyond sanity during the knockout stages. The ultimate insider strategy is to anchor your stay around the Secaucus Junction hub in New Jersey. Hotels here are vastly cheaper, cleaner, and tailored for sports travelers. On match days, NJ Transit runs direct, 10-minute trains from Secaucus straight to the Meadowlands Sports Complex (MetLife Stadium front gate).",
    bulletPoints: [
      "Look for stays within walking distance of Secaucus Junction or Meadowlands rail lines.",
      "Average cost: $140 - $190/night (vs $500+ in midtown Manhattan).",
      "Zero NYC hotel occupancy tax added to your final bill.",
    ],
    affiliateLink: "https://www.booking.com/searchresults.html?ss=Secaucus&aid=YOUR_AFFILIATE_ID",
    ctaText: "Unlock NJ Transit-Friendly Stays →",
  },
  {
    id: "cross-border-hacks",
    city: "Cross-Border Transit",
    stadium: "US · Canada · Mexico",
    title: "The 3-Nation Flight Blueprint: Defeating Baggage Fees",
    image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=600&auto=format&fit=crop",
    badge: "Flight Blueprint",
    summary: "Traveling between the three host countries can drain your budget instantly if you rely on standard legacy carriers. To survive the long-haul distances, optimize your routing using ultra-low-cost carriers (ULCCs) like Volaris (Mexico), Spirit/Frontier (USA), and Flair (Canada). The trap? Outrageous hidden carry-on fees. Hack this by utilizing under-seat personal items only, or booking multi-city open-jaw flights 48 hours before matchdays.",
    bulletPoints: [
      "Utilize open-jaw ticket configurations to avoid expensive backtracking.",
      "Always pre-pay regional luggage fees online; gate prices are marked up 200%.",
      "Consider secondary airports like Burbank (LA) or Newark (NJ) for massive savings.",
    ],
    affiliateLink: "https://www.wayaway.io/?marker=YOUR_AFFILIATE_ID",
    ctaText: "Compare Ultimate Multi-City Flight Deals →",
  },
];

export default function HostCityGuide() {
  return (
    <div style={{ maxWidth: 1200, margin: "0 auto", padding: "24px 20px 40px", background: "#fff" }}>
      <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 900, fontSize: "clamp(28px, 5vw, 38px)", marginBottom: 4 }}>SMART STAY GUIDE</h1>
      <p style={{ fontSize: 14, color: "var(--text-secondary)", marginBottom: 28 }}>
        AI-curated budget hacks for every host city — verified transit routes, real price comparisons, zero fluff.
      </p>

      {/* 3-column affiliate article grid */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))",
        gap: 20,
      }}>
        {SMART_STAY_ARTICLES.map(article => (
          <div key={article.id} style={{
            background: "#fff",
            border: "1px solid #e5e7eb",
            textAlign: "left",
            display: "flex",
            flexDirection: "column",
          }}>
            {/* Image */}
            <img
              src={article.image}
              alt={article.city}
              style={{ width: "100%", height: 220, objectFit: "cover", display: "block" }}
              onError={e => { (e.target as HTMLImageElement).style.display = "none"; }}
            />

            <div style={{ padding: "20px", display: "flex", flexDirection: "column", flex: 1 }}>
              {/* Badge */}
              <span style={{
                display: "inline-block",
                fontFamily: "var(--font-body)", fontSize: 9, fontWeight: 700,
                letterSpacing: "0.08em", textTransform: "uppercase",
                color: "var(--accent-gold)", background: "var(--gold-light)",
                border: "1px solid #fde68a",
                padding: "3px 8px", borderRadius: 2, marginBottom: 10,
                alignSelf: "flex-start",
              }}>{article.badge}</span>

              {/* City + Stadium */}
              <div style={{ fontSize: 11, color: "var(--text-muted)", marginBottom: 6, fontFamily: "var(--font-mono)" }}>
                {article.city} · {article.stadium}
              </div>

              {/* Title */}
              <h3 style={{
                fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 20,
                lineHeight: 1.15, marginBottom: 10, color: "var(--text-primary)",
              }}>{article.title}</h3>

              {/* Summary */}
              <p style={{
                fontSize: 12, color: "var(--text-secondary)", lineHeight: 1.65, marginBottom: 14,
                flex: 1,
              }}>{article.summary}</p>

              {/* Bullet points */}
              <ul style={{ listStyle: "none", marginBottom: 18 }}>
                {article.bulletPoints.map((bp, i) => (
                  <li key={i} style={{
                    fontSize: 12, color: "var(--text-secondary)", lineHeight: 1.6,
                    padding: "6px 0", borderBottom: i < article.bulletPoints.length - 1 ? "1px solid #f3f4f6" : "none",
                    display: "flex", gap: 8,
                  }}>
                    <span style={{ color: "var(--accent-gold)", flexShrink: 0, fontWeight: 700 }}>→</span>
                    {bp}
                  </li>
                ))}
              </ul>

              {/* CTA Button */}
              <a
                href={article.affiliateLink}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "block", width: "100%", textAlign: "center",
                  padding: "12px 0", background: "#111827", color: "#fff",
                  fontFamily: "var(--font-body)", fontWeight: 700, fontSize: 13,
                  textDecoration: "none",
                  transition: "background 0.15s",
                  marginTop: "auto",
                }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "#1f2937"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "#111827"; }}
              >
                {article.ctaText}
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* Footer disclaimer */}
      <p style={{
        textAlign: "center", fontSize: 11, color: "var(--text-muted)",
        maxWidth: 600, margin: "28px auto 0", lineHeight: 1.6,
      }}>
        Prices shown are estimated averages based on historical data and may vary. Accommodation and flight links are affiliate partnerships. This guide is produced independently and is not affiliated with FIFA or any official World Cup organization.
      </p>
    </div>
  );
}
