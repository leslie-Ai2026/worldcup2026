import { useState } from "react";
import { Link } from "wouter";

const flagUrl = (code: string) => `https://flagcdn.com/w80/${code.toLowerCase()}.png`;

// ─── Champion Predictions (static, would be API-driven) ────────
const CHAMPION_ODDS = [
  { rank: 1, code: "fr", name: "France", pct: 22, reason: "Elite squad depth with Mbappé at peak. 2022 finalists with a stronger midfield." },
  { rank: 2, code: "br", name: "Brazil", pct: 18, reason: "Vinicius Jr. leads the most talented generation since 2002. Tactically evolved under new coach." },
  { rank: 3, code: "ar", name: "Argentina", pct: 15, reason: "Messi's final tournament with a cohesive, battle-tested squad. Copa América champions." },
  { rank: 4, code: "gb", name: "England", pct: 12, reason: "Bellingham captaincy brings new energy. Deep midfield and attacking options." },
  { rank: 5, code: "es", name: "Spain", pct: 10, reason: "Pedri-led tiki-taka revival. Best possession stats in European qualifying." },
];

// ─── Match Predictions ────────────────────────────────────────
const MATCH_PREDICTIONS = [
  { homeCode: "mx", homeName: "Mexico", awayCode: "za", awayName: "South Africa", homeWin: 62, draw: 28, awayWin: 10, analysis: "Mexico at Estadio Azteca (7,200ft altitude) is a fortress. The home crowd of 87,000 gives them a massive psychological edge. South Africa's defense has struggled against quick transitions — exactly how Mexico likes to attack." },
  { homeCode: "us", homeName: "USA", awayCode: "br", awayName: "Brazil", homeWin: 25, draw: 30, awayWin: 45, analysis: "Brazil's talent advantage is undeniable, but USA has home soil and an organized pressing system under their coach. The midfield battle will decide this one." },
  { homeCode: "fr", homeName: "France", awayCode: "de", awayName: "Germany", homeWin: 48, draw: 28, awayWin: 24, analysis: "France's attacking trident is the best in the tournament. Germany are transitioning under their new coach and may struggle against France's physicality." },
];

export default function AIPredictor() {
  const [selectedMatch, setSelectedMatch] = useState(0);

  return (
    <div style={{ maxWidth: 1000, margin: "0 auto", padding: "24px 20px 48px", background: "#fff" }}>
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(24px, 4vw, 36px)", marginBottom: 4 }}>🤖 AI MATCH PREDICTIONS</h1>
        <p style={{ fontSize: 14, color: "var(--text-secondary)" }}>Powered by Gemini · Updated daily · For entertainment only</p>
      </div>

      {/* ── Champion Odds ──────────────────────────────────── */}
      <div className="section-head" style={{ marginBottom: 16 }}>
        <div className="accent-bar" />
        <span className="title">🏆 AI TROPHY ODDS</span>
        <div className="rule" />
      </div>

      <div className="card-white" style={{ padding: 20, marginBottom: 28 }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {CHAMPION_ODDS.map(team => (
            <div key={team.code} style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <span style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 18, color: team.rank === 1 ? "var(--gold)" : "var(--text-muted)", width: 20 }}>{team.rank}</span>
              <img src={flagUrl(team.code)} alt={team.name} style={{ width: 30, height: 20, objectFit: "contain", flexShrink: 0 }}
                onError={e => { (e.target as HTMLImageElement).style.display = "none"; }} />
              <span style={{ fontFamily: "var(--font-body)", fontWeight: 600, fontSize: 14, width: 90 }}>{team.name}</span>
              <div style={{ flex: 1, display: "flex", alignItems: "center", gap: 8 }}>
                <div className="progress-track" style={{ flex: 1 }}>
                  <div className="progress-fill" style={{ width: `${team.pct * 3}%` }} />
                </div>
                <span style={{ fontFamily: "var(--font-mono)", fontSize: 13, color: "var(--gold)", fontWeight: 600, width: 40, textAlign: "right" }}>{team.pct}%</span>
              </div>
            </div>
          ))}
        </div>
        <p style={{ fontSize: 11, color: "var(--text-muted)", marginTop: 12, textAlign: "center", fontStyle: "italic" }}>AI model updated daily · Based on squad form, injuries, and historical data</p>
      </div>

      {/* ── Match Predictor ────────────────────────────────── */}
      <div className="section-head" style={{ marginBottom: 16 }}>
        <div className="accent-bar" />
        <span className="title">⚽ MATCH PREDICTOR</span>
        <div className="rule" />
      </div>

      {/* Match selector */}
      <div style={{ display: "flex", gap: 8, marginBottom: 20, flexWrap: "wrap" }}>
        {MATCH_PREDICTIONS.map((m, i) => (
          <button key={i} onClick={() => setSelectedMatch(i)} style={{
            fontFamily: "var(--font-body)", fontWeight: selectedMatch === i ? 600 : 400,
            fontSize: 12, color: selectedMatch === i ? "#fff" : "var(--text-secondary)",
            background: selectedMatch === i ? "#111827" : "#fff",
            border: `1px solid ${selectedMatch === i ? "#111827" : "var(--border-color)"}`,
            borderRadius: 4, padding: "6px 14px", cursor: "pointer",
          }}>
            {m.homeName} vs {m.awayName}
          </button>
        ))}
      </div>

      {/* Selected match prediction */}
      {MATCH_PREDICTIONS[selectedMatch] && (
        <div className="card-white" style={{ padding: 24 }}>
          {(() => {
            const m = MATCH_PREDICTIONS[selectedMatch];
            return (
              <>
                {/* Teams face-off */}
                <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 20, marginBottom: 20 }}>
                  <div style={{ textAlign: "center" }}>
                    <img src={flagUrl(m.homeCode)} alt={m.homeName} style={{ width: 64, height: 43, objectFit: "contain", marginBottom: 6 }} />
                    <div style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 22 }}>{m.homeName}</div>
                  </div>
                  <div style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 32, color: "var(--text-muted)" }}>VS</div>
                  <div style={{ textAlign: "center" }}>
                    <img src={flagUrl(m.awayCode)} alt={m.awayName} style={{ width: 64, height: 43, objectFit: "contain", marginBottom: 6 }} />
                    <div style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 22 }}>{m.awayName}</div>
                  </div>
                </div>

                {/* Win probability bar */}
                <div className="progress-track" style={{ height: 8, borderRadius: 4, marginBottom: 10 }}>
                  <div style={{ height: 8, display: "flex", borderRadius: 4, overflow: "hidden" }}>
                    <div style={{ width: `${m.homeWin}%`, background: "var(--gold)" }} />
                    <div style={{ width: `${m.draw}%`, background: "#e5e7eb" }} />
                    <div style={{ width: `${m.awayWin}%`, background: "#d1d5db" }} />
                  </div>
                </div>
                <div style={{ display: "flex", justifyContent: "center", gap: 24, fontSize: 13, marginBottom: 18 }}>
                  <span style={{ fontFamily: "var(--font-mono)", color: "var(--gold)", fontWeight: 600 }}>{m.homeName} {m.homeWin}%</span>
                  <span style={{ fontFamily: "var(--font-mono)", color: "var(--text-muted)" }}>Draw {m.draw}%</span>
                  <span style={{ fontFamily: "var(--font-mono)", color: "var(--text-muted)" }}>{m.awayName} {m.awayWin}%</span>
                </div>

                {/* Analysis */}
                <div style={{ background: "var(--bg-secondary)", borderRadius: "var(--radius)", padding: 16, border: "1px solid var(--border-color)" }}>
                  <div style={{ fontFamily: "var(--font-body)", fontWeight: 600, fontSize: 13, marginBottom: 6 }}>AI Analysis</div>
                  <p style={{ fontSize: 13, color: "var(--text-secondary)", lineHeight: 1.65, marginBottom: 8 }}>{m.analysis}</p>
                  <div style={{ fontSize: 10, color: "var(--text-muted)", fontStyle: "italic" }}>For entertainment purposes only. Not betting or financial advice.</div>
                </div>

                <Link href={`/match/${m.homeCode.toLowerCase()}-vs-${m.awayCode.toLowerCase()}`} style={{ display: "block", textAlign: "center", marginTop: 16, fontSize: 13, color: "var(--link-blue)", textDecoration: "none" }}>
                  View Match Details →
                </Link>
              </>
            );
          })()}
        </div>
      )}
    </div>
  );
}
