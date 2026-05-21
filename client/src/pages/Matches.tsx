import { useState } from "react";
import { Link } from "wouter";
const flagUrl = (code: string) => `https://flagcdn.com/w80/${code.toLowerCase()}.png`;

interface GroupMatch { id: string; homeCode: string; homeName: string; homeFlag: string; awayCode: string; awayName: string; awayFlag: string; date: string; time: string; venue: string; }
interface Group { name: string; teams: { code: string; name: string; flagCode: string }[]; matches: GroupMatch[]; }

const GROUPS: Group[] = [
  { name: "Group A", teams: [{ code: "MEX", name: "Mexico", flagCode: "mx" }, { code: "CAN", name: "Canada", flagCode: "ca" }, { code: "USA", name: "USA", flagCode: "us" }, { code: "TBD", name: "TBD", flagCode: "un" }],
    matches: [
      { id: "a1", homeCode: "MEX", homeName: "Mexico", homeFlag: "mx", awayCode: "RSA", awayName: "South Africa", awayFlag: "za", date: "Jun 11", time: "20:00", venue: "Estadio Azteca" },
      { id: "a2", homeCode: "CAN", homeName: "Canada", homeFlag: "ca", awayCode: "TBD", awayName: "TBD", awayFlag: "un", date: "Jun 12", time: "17:00", venue: "BMO Field, Toronto" },
      { id: "a3", homeCode: "USA", homeName: "USA", homeFlag: "us", awayCode: "CAN", awayName: "Canada", awayFlag: "ca", date: "Jun 16", time: "20:00", venue: "Levi's Stadium" },
      { id: "a4", homeCode: "MEX", homeName: "Mexico", homeFlag: "mx", awayCode: "TBD", awayName: "TBD", awayFlag: "un", date: "Jun 16", time: "17:00", venue: "Estadio Azteca" },
      { id: "a5", homeCode: "USA", homeName: "USA", homeFlag: "us", awayCode: "TBD", awayName: "TBD", awayFlag: "un", date: "Jun 20", time: "20:00", venue: "SoFi Stadium" },
      { id: "a6", homeCode: "CAN", homeName: "Canada", homeFlag: "ca", awayCode: "MEX", awayName: "Mexico", awayFlag: "mx", date: "Jun 20", time: "17:00", venue: "BC Place" },
    ] },
  { name: "Group B", teams: [{ code: "BRA", name: "Brazil", flagCode: "br" }, { code: "ARG", name: "Argentina", flagCode: "ar" }, { code: "COL", name: "Colombia", flagCode: "co" }, { code: "TBD", name: "TBD", flagCode: "un" }],
    matches: [
      { id: "b1", homeCode: "BRA", homeName: "Brazil", homeFlag: "br", awayCode: "COL", awayName: "Colombia", awayFlag: "co", date: "Jun 13", time: "20:00", venue: "Rose Bowl, LA" },
      { id: "b2", homeCode: "ARG", homeName: "Argentina", homeFlag: "ar", awayCode: "TBD", awayName: "TBD", awayFlag: "un", date: "Jun 13", time: "17:00", venue: "Hard Rock, Miami" },
      { id: "b3", homeCode: "BRA", homeName: "Brazil", homeFlag: "br", awayCode: "ARG", awayName: "Argentina", awayFlag: "ar", date: "Jun 17", time: "20:00", venue: "MetLife Stadium" },
      { id: "b4", homeCode: "COL", homeName: "Colombia", homeFlag: "co", awayCode: "TBD", awayName: "TBD", awayFlag: "un", date: "Jun 17", time: "17:00", venue: "AT&T Stadium" },
      { id: "b5", homeCode: "BRA", homeName: "Brazil", homeFlag: "br", awayCode: "TBD", awayName: "TBD", awayFlag: "un", date: "Jun 22", time: "20:00", venue: "Gillette Stadium" },
      { id: "b6", homeCode: "ARG", homeName: "Argentina", homeFlag: "ar", awayCode: "COL", awayName: "Colombia", awayFlag: "co", date: "Jun 22", time: "17:00", venue: "Arrowhead" },
    ] },
  { name: "Group C", teams: [{ code: "FRA", name: "France", flagCode: "fr" }, { code: "GER", name: "Germany", flagCode: "de" }, { code: "JPN", name: "Japan", flagCode: "jp" }, { code: "TBD", name: "TBD", flagCode: "un" }],
    matches: [
      { id: "c1", homeCode: "FRA", homeName: "France", homeFlag: "fr", awayCode: "GER", awayName: "Germany", awayFlag: "de", date: "Jun 13", time: "14:00", venue: "MetLife Stadium" },
      { id: "c2", homeCode: "JPN", homeName: "Japan", homeFlag: "jp", awayCode: "TBD", awayName: "TBD", awayFlag: "un", date: "Jun 14", time: "14:00", venue: "Lincoln Financial" },
      { id: "c3", homeCode: "FRA", homeName: "France", homeFlag: "fr", awayCode: "JPN", awayName: "Japan", awayFlag: "jp", date: "Jun 18", time: "20:00", venue: "SoFi Stadium" },
      { id: "c4", homeCode: "GER", homeName: "Germany", homeFlag: "de", awayCode: "TBD", awayName: "TBD", awayFlag: "un", date: "Jun 18", time: "17:00", venue: "Levi's Stadium" },
      { id: "c5", homeCode: "FRA", homeName: "France", homeFlag: "fr", awayCode: "TBD", awayName: "TBD", awayFlag: "un", date: "Jun 23", time: "20:00", venue: "NRG Stadium" },
      { id: "c6", homeCode: "GER", homeName: "Germany", homeFlag: "de", awayCode: "JPN", awayName: "Japan", awayFlag: "jp", date: "Jun 23", time: "17:00", venue: "Mercedes-Benz" },
    ] },
  { name: "Group D", teams: [{ code: "ESP", name: "Spain", flagCode: "es" }, { code: "NED", name: "Netherlands", flagCode: "nl" }, { code: "SEN", name: "Senegal", flagCode: "sn" }, { code: "TBD", name: "TBD", flagCode: "un" }],
    matches: [
      { id: "d1", homeCode: "ESP", homeName: "Spain", homeFlag: "es", awayCode: "NED", awayName: "Netherlands", awayFlag: "nl", date: "Jun 14", time: "20:00", venue: "Lumen Field" },
      { id: "d2", homeCode: "SEN", homeName: "Senegal", homeFlag: "sn", awayCode: "TBD", awayName: "TBD", awayFlag: "un", date: "Jun 15", time: "14:00", venue: "BC Place" },
      { id: "d3", homeCode: "ESP", homeName: "Spain", homeFlag: "es", awayCode: "SEN", awayName: "Senegal", awayFlag: "sn", date: "Jun 19", time: "20:00", venue: "AT&T Stadium" },
      { id: "d4", homeCode: "NED", homeName: "Netherlands", homeFlag: "nl", awayCode: "TBD", awayName: "TBD", awayFlag: "un", date: "Jun 19", time: "17:00", venue: "Arrowhead" },
      { id: "d5", homeCode: "ESP", homeName: "Spain", homeFlag: "es", awayCode: "TBD", awayName: "TBD", awayFlag: "un", date: "Jun 24", time: "20:00", venue: "Gillette Stadium" },
      { id: "d6", homeCode: "NED", homeName: "Netherlands", homeFlag: "nl", awayCode: "SEN", awayName: "Senegal", awayFlag: "sn", date: "Jun 24", time: "17:00", venue: "BMO Field" },
    ] },
];

export default function Matches() {
  const [sel, setSel] = useState("All");
  const filtered = sel === "All" ? GROUPS : GROUPS.filter(g => g.name === sel);

  return (
    <div style={{ maxWidth: 1200, margin: "0 auto", padding: "24px 20px 40px", background: "#fff" }}>
      <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 900, fontSize: "clamp(24px,4vw,34px)", marginBottom: 4 }}>MATCH SCHEDULE</h1>
      <p style={{ fontSize: 14, color: "var(--text-secondary)", marginBottom: 20 }}>2026 FIFA World Cup · 104 Matches · USA · Canada · Mexico</p>

      <div style={{ display: "flex", gap: 4, marginBottom: 24, flexWrap: "wrap" }}>
        {["All", ...GROUPS.map(g => g.name)].map(t => (
          <button key={t} onClick={() => setSel(t)} style={{
            fontFamily: "var(--font-body)", fontWeight: sel === t ? 600 : 400, fontSize: 12,
            color: sel === t ? "#fff" : "var(--text-secondary)",
            background: sel === t ? "#111827" : "#fff",
            border: `1px solid ${sel === t ? "#111827" : "var(--border)"}`,
            borderRadius: 2, padding: "5px 12px", cursor: "pointer",
          }}>{t}</button>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(360px, 1fr))", gap: 16 }}>
        {filtered.map(group => (
          <div key={group.name} style={{ border: "1px solid var(--border)", background: "#fff" }}>
            <div style={{ background: "#111827", color: "#fff", padding: "10px 14px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 17 }}>{group.name}</span>
              <span style={{ fontSize: 10, color: "#9CA3AF" }}>{group.matches.length} matches</span>
            </div>
            <div style={{ padding: "8px 14px", borderBottom: "1px solid var(--border)", display: "flex", gap: 12 }}>
              {group.teams.map(t => (
                <div key={t.code} style={{ display: "flex", alignItems: "center", gap: 4 }}>
                  <img src={flagUrl(t.flagCode)} alt="" style={{ width: 20, height: 14, objectFit: "contain" }} onError={e => { (e.target as HTMLImageElement).style.display = "none"; }} />
                  <span style={{ fontSize: 11, fontWeight: 500 }}>{t.code}</span>
                </div>
              ))}
            </div>
            {group.matches.map(m => (
              <Link key={m.id} href={`/match/${m.id}`} style={{ textDecoration: "none", color: "inherit" }}>
                <div style={{
                  display: "flex", alignItems: "center", padding: "10px 14px", gap: 8,
                  borderBottom: "1px solid var(--border)", cursor: "pointer",
                  transition: "background 0.08s",
                }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "#F9FAFB"; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "transparent"; }}
                >
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--text-muted)", width: 48, flexShrink: 0 }}>{m.date}</span>
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--text-muted)", width: 38, flexShrink: 0 }}>{m.time}</span>
                  <div style={{ display: "flex", alignItems: "center", gap: 5, flex: 1 }}>
                    <img src={flagUrl(m.homeFlag)} alt="" style={{ width: 20, height: 14, objectFit: "contain", flexShrink: 0 }} onError={e => { (e.target as HTMLImageElement).style.display = "none"; }} />
                    <span style={{ fontFamily: "var(--font-body)", fontWeight: 600, fontSize: 12 }}>{m.homeCode}</span>
                    <span style={{ fontSize: 9, color: "var(--text-muted)" }}>vs</span>
                    <span style={{ fontFamily: "var(--font-body)", fontWeight: 600, fontSize: 12 }}>{m.awayCode}</span>
                    <img src={flagUrl(m.awayFlag)} alt="" style={{ width: 20, height: 14, objectFit: "contain", flexShrink: 0 }} onError={e => { (e.target as HTMLImageElement).style.display = "none"; }} />
                  </div>
                  <span style={{ fontSize: 10, color: "var(--text-muted)", flexShrink: 0, textAlign: "right" }}>{m.venue}</span>
                </div>
              </Link>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
