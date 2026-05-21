import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";

function useCountdown() {
  const target = new Date("2026-06-11T20:00:00Z").getTime();
  const calc = () => {
    const diff = Math.max(0, target - Date.now());
    return { days: Math.floor(diff / 86400000), hours: Math.floor((diff % 86400000) / 3600000), minutes: Math.floor((diff % 3600000) / 60000) };
  };
  const [time, setTime] = useState(calc);
  useEffect(() => { const id = setInterval(() => setTime(calc()), 30000); return () => clearInterval(id); }, []);
  return time;
}

const NAV = [
  { href: "/",              icon: "🏠", label: "Home" },
  { href: "/matches",       icon: "📅", label: "Match Schedule" },
  { href: "/ai-predictor",  icon: "🤖", label: "AI Predictions", badge: "NEW" },
  { href: "/golden-boot",   icon: "⭐", label: "Player Spotlight" },
  { href: "/host-city-guide",icon:"🗺️",label: "Smart Stay Guide", sub: "Save up to $700/night", subColor: "#16A34A" },
  { href: "/supporter-kit", icon: "👕", label: "Supporter Kit", sub: "Only 3 items · No choice paralysis", subColor: "#9CA3AF" },
];

const TICKER = [
  "JUN 11  MEX vs ZA  (20:00)  ·  JUN 12  USA vs BR  (18:00)  ·  JUN 13  ARG vs FR  (21:00)",
  "JUN 14  ESP vs DE  (20:00)  ·  JUN 15  ENG vs POR  (17:00)  ·  JUN 16  CAN vs MEX  (20:00)",
];

export default function FootballSidebarLayout({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const { days, hours, minutes } = useCountdown();
  useEffect(() => setMobileOpen(false), [location]);

  const isActive = (href: string) => href === "/" ? location === "/" : location.startsWith(href);

  return (
    <div style={{ background: "var(--bg-primary)", minHeight: "100vh", display: "flex", flexDirection: "column" }}>

      {/* ════ TOP BAR ════════════════════════════════════════════ */}
      <header style={{
        height: 52, background: "#fff", borderBottom: "1px solid var(--border)",
        display: "flex", alignItems: "center", position: "sticky", top: 0, zIndex: 50,
      }}>
        {/* BLACK LOGO BLOCK — hard square, white text, breathing room */}
        <Link href="/" style={{ textDecoration: "none", flexShrink: 0, height: "100%", display: "flex", marginRight: 24 }}>
          <div style={{
            width: 72, height: "100%", background: "#111827",
            display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
            gap: 0, cursor: "pointer",
          }}>
            <div style={{ fontFamily: "var(--font-display)", fontWeight: 900, fontSize: 14, color: "#fff", letterSpacing: "0.04em", lineHeight: 1.1 }}>WC</div>
            <div style={{ fontFamily: "var(--font-display)", fontWeight: 900, fontSize: 14, color: "#fff", letterSpacing: "0.04em", lineHeight: 1.1 }}>2026</div>
            <div style={{ fontFamily: "var(--font-body)", fontWeight: 700, fontSize: 7, color: "#9CA3AF", letterSpacing: "0.2em", textTransform: "uppercase", marginTop: 2 }}>HACKS</div>
          </div>
        </Link>

        {/* LIVE TICKER */}
        <div style={{ marginLeft: 0, display: "flex", alignItems: "center", flex: 1, height: "100%", overflow: "hidden", borderLeft: "1px solid var(--border)", paddingLeft: 14 }}>
          {/* LIVE dot + label */}
          <div style={{ display: "flex", alignItems: "center", gap: 6, flexShrink: 0, marginRight: 12 }}>
            <span className="live-dot" />
            <span style={{ fontFamily: "var(--font-body)", fontWeight: 700, fontSize: 11, color: "var(--accent-red)", letterSpacing: "0.06em", whiteSpace: "nowrap" }}>LIVE NOW:</span>
          </div>

          {/* Scrolling match schedule */}
          <div style={{ overflow: "hidden", flex: 1, height: "100%", display: "flex", alignItems: "center" }}>
            <div style={{ display: "inline-flex", animation: "tickerScroll 45s linear infinite", whiteSpace: "nowrap" }}>
              {[...TICKER, ...TICKER].map((item, i) => (
                <span key={i} style={{
                  fontFamily: "var(--font-mono)", fontWeight: 400, fontSize: 11, color: "var(--text-secondary)",
                  padding: "0 0", display: "inline-flex", alignItems: "center", height: 52,
                  letterSpacing: "0.02em",
                }}>{item}</span>
              ))}
            </div>
          </div>
        </div>
      </header>

      <div style={{ display: "flex", flex: 1, overflow: "hidden" }}>

        {/* ════ DESKTOP SIDEBAR ══════════════════════════════════ */}
        <aside className="hide-mobile" style={{
          width: 180, flexShrink: 0, background: "var(--bg-secondary)",
          borderRight: "1px solid var(--border)", display: "flex", flexDirection: "column",
          height: "calc(100vh - 52px)", position: "sticky", top: 52, overflowY: "auto",
        }}>
          <nav style={{ flex: 1, padding: "6px 0" }}>
            {NAV.map(item => <NavItem key={item.href} {...item} active={isActive(item.href)} />)}
          </nav>

          <div style={{ padding: "12px 14px", borderTop: "1px solid var(--border)" }}>
            <div style={{ fontFamily: "var(--font-body)", fontSize: 9, fontWeight: 700, color: "var(--text-muted)", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 4 }}>KICKOFF IN</div>
            <div style={{ display: "flex", alignItems: "baseline", gap: 2 }}>
              {[{ v: days, u: "d" }, { v: hours, u: "h" }, { v: minutes, u: "m" }].map(({ v, u }) => (
                <span key={u} style={{ display: "inline-flex", alignItems: "baseline", gap: 1, marginRight: 6 }}>
                  <span style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 20, color: "var(--text-primary)", lineHeight: 1 }}>{v}</span>
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: 9, color: "var(--text-muted)" }}>{u}</span>
                </span>
              ))}
            </div>
            <div style={{ fontFamily: "var(--font-body)", fontSize: 10, color: "var(--text-muted)", marginTop: 3 }}>Estadio Azteca</div>
          </div>
        </aside>

        {/* ════ MOBILE HEADER ════════════════════════════════════ */}
        <div className="hide-desktop" style={{
          position: "fixed", top: 52, left: 0, right: 0, zIndex: 40,
          background: "#fff", borderBottom: "1px solid var(--border)",
          display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 16px", height: 48,
        }}>
          <span style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 15 }}>WORLD CUP <span style={{ color: "var(--accent-gold)" }}>2026</span></span>
          <button onClick={() => setMobileOpen(!mobileOpen)} style={{ background: "none", border: "none", cursor: "pointer", color: "var(--text-secondary)", fontSize: 20, padding: 4, minHeight: 44, minWidth: 44 }}>
            {mobileOpen ? "✕" : "☰"}
          </button>
        </div>
        {mobileOpen && (
          <div className="hide-desktop" style={{ position: "fixed", top: 100, left: 0, right: 0, bottom: 0, background: "#fff", zIndex: 39, overflowY: "auto", borderTop: "1px solid var(--border)" }}>
            <nav style={{ padding: "6px 0" }}>{NAV.map(item => <NavItem key={item.href} {...item} active={isActive(item.href)} onClick={() => setMobileOpen(false)} />)}</nav>
          </div>
        )}

        {/* ════ MAIN CONTENT ════════════════════════════════════ */}
        <main style={{ flex: 1, minWidth: 0, overflowX: "hidden", overflowY: "auto", height: "calc(100vh - 52px)" }} className="pt-[48px] md:pt-0">
          {children}
        </main>
      </div>

      {/* ════ MOBILE TAB BAR ════════════════════════════════════ */}
      <nav className="hide-desktop" style={{
        position: "fixed", bottom: 0, left: 0, right: 0, background: "#fff",
        borderTop: "1px solid var(--border)", zIndex: 50, height: 56, display: "flex",
      }}>
        {[{ href: "/", icon: "🏠", label: "Home" }, { href: "/matches", icon: "📅", label: "Schedule" }, { href: "/ai-predictor", icon: "🤖", label: "AI" }, { href: "/host-city-guide", icon: "🗺️", label: "Guide" }, { href: "/supporter-kit", icon: "👕", label: "Shop" }].map(item => {
          const active = isActive(item.href);
          return (
            <Link key={item.href} href={item.href}>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 2, height: 56, minWidth: 44, flex: 1, borderTop: active ? "2px solid #111827" : "2px solid transparent" }}>
                <span style={{ fontSize: 16 }}>{item.icon}</span>
                <span style={{ fontSize: 8, fontWeight: 600, color: active ? "#111827" : "var(--text-muted)", textTransform: "uppercase" }}>{item.label}</span>
              </div>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}

/* ════ NAV ITEM ══════════════════════════════════════════════ */
function NavItem({ href, icon, label, badge, sub, subColor, active, onClick }: {
  href: string; icon: string; label: string; badge?: string; sub?: string; subColor?: string; active: boolean; onClick?: () => void;
}) {
  return (
    <Link href={href} onClick={onClick} style={{ textDecoration: "none" }}>
      <div style={{
        display: "flex", alignItems: sub ? "flex-start" : "center", gap: 10,
        padding: "9px 14px",
        borderLeft: active ? "3px solid #111827" : "3px solid transparent",
        background: active ? "#F3F4F6" : "transparent",
        cursor: "pointer", transition: "background 0.1s", minHeight: sub ? 46 : 40,
      }}
        onMouseEnter={e => { if (!active) (e.currentTarget as HTMLElement).style.background = "#F9FAFB"; }}
        onMouseLeave={e => { if (!active) (e.currentTarget as HTMLElement).style.background = "transparent"; }}
      >
        <span style={{ fontSize: 14, flexShrink: 0, opacity: active ? 1 : 0.5 }}>{icon}</span>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <span style={{ fontFamily: "var(--font-body)", fontWeight: active ? 600 : 400, fontSize: 13, color: active ? "var(--text-primary)" : "var(--text-secondary)" }}>{label}</span>
            {badge && <span className="tag tag-new" style={{ fontSize: 7, padding: "1px 4px" }}>{badge}</span>}
          </div>
          {sub && <div style={{ fontFamily: "var(--font-body)", fontSize: 10, color: subColor, marginTop: 1, fontWeight: 500 }}>{sub}</div>}
        </div>
      </div>
    </Link>
  );
}
