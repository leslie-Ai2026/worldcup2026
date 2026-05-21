import { useRoute, Link } from "wouter";

const ARTICLES: Record<string, { id: string; tag: string; tagColor: string; title: string; summary: string; body: string; img: string; time: string; author: string }> = {
  "1": {
    id: "1", tag: "PREVIEW", tagColor: "#B8860B",
    title: "Mbappé's Real Madrid form signals World Cup dominance",
    summary: "After a record-breaking La Liga season, Kylian Mbappé arrives at the 2026 World Cup as the undisputed favourite to claim the Golden Boot.",
    body: "After a historic season with Real Madrid — 34 goals in 38 La Liga appearances — Kylian Mbappé enters the 2026 FIFA World Cup in the form of his life. The French captain, still only 27, has evolved from a devastating winger into a complete forward capable of dictating matches from anywhere in the final third.\n\nFrance head coach Didier Deschamps has built the entire attacking system around Mbappé's movement patterns. The 4-3-3 shape allows him to drift wide left, isolate fullbacks, and cut inside onto his stronger right foot — a move that has become nearly unstoppable at club level.\n\nThe numbers back it up: Mbappé averaged 0.82 goals per 90 minutes in the 2025-26 season, with a shot conversion rate of 28% — among the highest in Europe's top five leagues. His xG per 90 (0.74) suggests this isn't a purple patch but sustainable elite performance.\n\nPerhaps most importantly, Mbappé has matured as a leader. Taking the captain's armband has added responsibility without diminishing his flair. His relationship with midfield dynamo Eduardo Camavinga and winger Ousmane Dembélé forms one of the most feared attacking trios in international football.\n\nBookmakers have installed France as joint-favorites alongside Brazil, with Mbappé as the 28% probability pick for the Golden Boot. If France reaches the final at MetLife Stadium on July 19, it will almost certainly be because their captain delivered when it mattered most.",
    img: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=1200&q=85", time: "2h ago", author: "WorldCupHacks Editorial",
  },
  "2": {
    id: "2", tag: "ANALYSIS", tagColor: "#2563EB",
    title: "Brazil's tactical evolution under new manager ahead of 2026",
    summary: "Vinicius Jr. leads a reimagined Seleção blending flair with defensive discipline.",
    body: "Brazil enters the 2026 World Cup with something they haven't had in decades: tactical unpredictability. The new manager has moved away from the traditional 4-2-4 that defined the Seleção for generations, implementing a fluid 4-3-3 that morphs into a 3-2-5 in possession.\n\nVinicius Jr. is the centerpiece. The Real Madrid winger scored 22 goals and added 15 assists in the 2025-26 campaign, operating primarily from the left but frequently swapping with the #9 to create overloads in central areas.\n\nThe midfield trio of Bruno Guimarães, Lucas Paquetá, and André provides the perfect balance of creativity and defensive cover. Defensively, Marquinhos and Gabriel Magalhães form one of the most physically imposing center-back pairings in the tournament.\n\nBrazil's group (B) pairs them with Argentina, Colombia, and a qualifier. The June 17 clash with Argentina at MetLife Stadium is already being billed as the match of the group stage.",
    img: "https://images.unsplash.com/photo-1551958219-acbc595d816f?w=1200&q=85", time: "4h ago", author: "WorldCupHacks Editorial",
  },
  "3": {
    id: "3", tag: "EXCLUSIVE", tagColor: "#EF4444",
    title: "Messi's last dance: Argentina's blueprint for World Cup glory",
    summary: "The GOAT's final tournament — how Argentina plans to build around their legend.",
    body: "At 38 years old, Lionel Messi will play his sixth and final FIFA World Cup. The 2022 champion and tournament MVP has nothing left to prove — but Argentina believes there's one more chapter to write.\n\nCoach Lionel Scaloni has constructed a system designed to maximize Messi's remaining strengths while masking the physical limitations that come with age. The 4-4-2 diamond allows Messi to operate as a pure #10 with minimal defensive responsibilities. Enzo Fernández and Alexis Mac Allister do the running. Messi does the creating.\n\nUp front, Julián Álvarez provides the pressing intensity that Messi can't. His movement creates space for the captain to drift into pockets and deliver the through-balls that have defined his career.\n\nThe biggest question is defense. Cristian Romero and Lisandro Martínez are a world-class pairing, but both are aggressive defenders who can be caught out of position. If teams can bait Argentina's center-backs forward, the space behind them is exploitable.\n\nArgentina's group (B) features Brazil, Colombia, and a qualifier. The path to the knockout stage is treacherous — but if anyone can navigate it, it's the man who's done it before.",
    img: "https://images.unsplash.com/photo-1508098682722-e99c643e7f0b?w=1200&q=85", time: "6h ago", author: "WorldCupHacks Editorial",
  },
  "4": {
    id: "4", tag: "FORM GUIDE", tagColor: "#16A34A",
    title: "USA's home advantage — how far can the hosts really go?",
    summary: "With matches in LA, NY, and Dallas, the USMNT has never had a better path to the knockout stage.",
    body: "The United States Men's National Team enters the 2026 World Cup as co-hosts with a golden opportunity. Home soil advantage is real — host nations historically outperform their FIFA rankings by an average of 1.4 rounds. For a US team ranked 14th in the world, that suggests a Quarterfinal run is within reach.\n\nThe squad is the most talented in USMNT history. Christian Pulisic (AC Milan) captains from the left wing. Weston McKennie (Juventus) provides box-to-box energy. Gio Reyna (Borussia Dortmund) is the creative wildcard. And up front, Folarin Balogun (AS Monaco) has solved the #9 problem that plagued previous generations.\n\nThe group stage draw has been kind: Mexico, Canada, and a qualifier in Group A. The opening match is at SoFi Stadium in Los Angeles. If the US can navigate a tricky second-round matchup, the bracket opens up favorably.\n\nThe biggest concern is depth at center-back. Behind Tim Ream (38) and Chris Richards, the options are unproven at the international level. If either starter picks up a card suspension or injury, the drop-off is significant.\n\nStill — home soil, a favorable group, and the most talented squad ever assembled. This is the moment American soccer has been building toward for 30 years.",
    img: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=1200&q=85", time: "8h ago", author: "WorldCupHacks Editorial",
  },
};

export default function NewsArticle() {
  const [, params] = useRoute("/news/:id");
  const article = ARTICLES[params?.id || "1"];

  if (!article) {
    return (
      <div style={{ maxWidth: 800, margin: "60px auto", padding: "20px", textAlign: "center", background: "#fff" }}>
        <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 28, marginBottom: 8 }}>Article Not Found</h1>
        <Link href="/" style={{ fontSize: 13, color: "var(--accent-blue)", textDecoration: "none" }}>← Back to Home</Link>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 800, margin: "0 auto", padding: "24px 20px 40px", background: "#fff" }}>
      {/* Breadcrumb */}
      <div style={{ display: "flex", gap: 6, marginBottom: 20, fontSize: 11, color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}>
        <Link href="/" style={{ color: "var(--text-muted)", textDecoration: "none" }}>Home</Link><span>/</span>
        <span style={{ color: "var(--text-primary)" }}>{article.title.substring(0, 50)}...</span>
      </div>

      {/* Hero image */}
      <div style={{ border: "1px solid var(--border)", overflow: "hidden", marginBottom: 24 }}>
        <img src={article.img} alt={article.title} style={{ width: "100%", height: 320, objectFit: "cover", display: "block" }}
          onError={e => { (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=1200&q=85"; }} />
      </div>

      {/* Tag + Meta */}
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
        <span className="tag" style={{ color: article.tagColor, background: "none", fontWeight: 700, fontSize: 10 }}>{article.tag}</span>
        <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--text-muted)" }}>{article.time}</span>
        <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--text-muted)" }}>by {article.author}</span>
      </div>

      {/* Title */}
      <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 900, fontSize: "clamp(24px, 4vw, 34px)", lineHeight: 1.1, marginBottom: 8 }}>{article.title}</h1>
      <p style={{ fontSize: 15, color: "var(--text-secondary)", lineHeight: 1.65, marginBottom: 28, fontStyle: "italic" }}>{article.summary}</p>

      {/* Article body */}
      <div style={{ fontSize: 14, color: "var(--text-primary)", lineHeight: 1.85 }}>
        {article.body.split("\n\n").map((para, i) => (
          <p key={i} style={{ marginBottom: 18, color: i === 0 ? "var(--text-primary)" : "var(--text-secondary)" }}>
            {para}
          </p>
        ))}
      </div>

      {/* Footer crosslinks */}
      <div style={{ borderTop: "1px solid var(--border)", marginTop: 32, paddingTop: 20 }}>
        <div className="section-head" style={{ marginBottom: 12 }}>
          <div className="bar" /><span className="title">MORE NEWS</span><div className="rule" />
        </div>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          {Object.values(ARTICLES).filter(a => a.id !== article.id).map(a => (
            <Link key={a.id} href={`/news/${a.id}`} style={{ textDecoration: "none" }}>
              <span style={{ fontFamily: "var(--font-body)", fontSize: 12, fontWeight: 500, color: "var(--accent-blue)", cursor: "pointer", padding: "4px 10px", border: "1px solid var(--border)", borderRadius: 2, display: "inline-block" }}>{a.title.substring(0, 45)}...</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
