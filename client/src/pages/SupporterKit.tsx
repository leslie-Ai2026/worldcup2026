import { useState } from "react";

const TEAMS = [
  { code: "mx", name: "Mexico" }, { code: "us", name: "USA" }, { code: "fr", name: "France" },
  { code: "ar", name: "Argentina" }, { code: "br", name: "Brazil" }, { code: "gb", name: "England" },
  { code: "de", name: "Germany" }, { code: "za", name: "South Africa" },
];

const PRODUCTS = [
  { id: 1, name: "Vintage 3-Nation Hoodie", price: "$45.00", img: "https://images.unsplash.com/photo-1556821840-3a63f15732ce?w=600&q=85&fit=crop", sizes: ["XS","S","M","L","XL","2XL"], desc: "400gsm brushed fleece. Embroidered tri-flag crest." },
  { id: 2, name: "Host City Canvas Tote", price: "$19.99", img: "https://images.unsplash.com/photo-1544816155-12df9643f363?w=600&q=85&fit=crop", sizes: ["One Size"], desc: "12oz canvas. Screen-printed host city map. Zero plastic." },
  { id: 3, name: "Match-Day Washed Cap", price: "$24.99", img: "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=600&q=85&fit=crop", sizes: ["One Size"], desc: "Enzyme-washed cotton twill. Adjustable brass buckle." },
];

const PLACEHOLDER = "https://images.unsplash.com/photo-1556821840-3a63f15732ce?w=600&q=85&fit=crop";

export default function SupporterKit() {
  const [selTeam, setTeam] = useState<Record<number, string>>({});
  const [selSize, setSize] = useState<Record<number, string>>({});

  return (
    <div style={{ maxWidth: 1200, margin: "0 auto", padding: "24px 20px 40px", background: "#fff" }}>
      <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 900, fontSize: "clamp(28px, 5vw, 38px)", textAlign: "center", marginBottom: 4 }}>THE SUPPORTER KIT</h1>
      <p style={{ fontSize: 14, color: "var(--text-secondary)", textAlign: "center", marginBottom: 32 }}>Only 3 items. No choice paralysis.</p>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 24, marginBottom: 40 }}>
        {PRODUCTS.map(p => (
          <div key={p.id} style={{ border: "1px solid var(--border)", background: "#fff" }}>
            {/* PRODUCT IMAGE FIRST */}
            <img src={p.img} alt={p.name}
              style={{ width: "100%", height: 340, objectFit: "cover", display: "block", background: "#f9fafb" }}
              onError={e => { (e.target as HTMLImageElement).src = PLACEHOLDER; }} />

            <div style={{ padding: "16px" }}>
              <h3 style={{ fontFamily: "var(--font-body)", fontWeight: 700, fontSize: 15, marginBottom: 2 }}>{p.name}</h3>
              <p style={{ fontSize: 11, color: "var(--text-secondary)", marginBottom: 12 }}>{p.desc}</p>

              {/* Team Design dropdown */}
              <div style={{ fontSize: 9, fontWeight: 600, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 4 }}>Choose Team Design</div>
              <select
                value={selTeam[p.id] || ""}
                onChange={e => setTeam(prev => ({ ...prev, [p.id]: e.target.value }))}
                style={{
                  width: "100%", padding: "7px 10px", marginBottom: 12,
                  fontFamily: "var(--font-body)", fontSize: 12, color: "var(--text-primary)",
                  background: "#fff", border: "1px solid var(--border)", borderRadius: 2,
                  cursor: "pointer", outline: "none", appearance: "none",
                }}>
                <option value="">Select team...</option>
                {TEAMS.map(t => <option key={t.code} value={t.code}>{t.name}</option>)}
              </select>

              {/* Size selector */}
              <div style={{ fontSize: 9, fontWeight: 600, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 4 }}>Size</div>
              <div style={{ display: "flex", gap: 3, marginBottom: 16, flexWrap: "wrap" }}>
                {p.sizes.map(sz => {
                  const active = (selSize[p.id] || p.sizes[0]) === sz;
                  return (
                    <button key={sz} onClick={() => setSize(prev => ({ ...prev, [p.id]: sz }))} style={{
                      fontFamily: "var(--font-mono)", fontSize: 9, fontWeight: active ? 600 : 400,
                      color: active ? "#fff" : "var(--text-secondary)",
                      background: active ? "#111827" : "#fff",
                      border: `1px solid ${active ? "#111827" : "var(--border)"}`,
                      borderRadius: 2, padding: "4px 8px", cursor: "pointer",
                    }}>{sz}</button>
                  );
                })}
              </div>

              {/* Price + Buy */}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontFamily: "var(--font-body)", fontWeight: 700, fontSize: 20 }}>{p.price}</span>
                <button className="btn-black" style={{ fontSize: 12, padding: "9px 22px" }}>BUY IT NOW</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div style={{ border: "1px solid var(--border)", padding: "16px 20px", display: "flex", justifyContent: "center", gap: 32, flexWrap: "wrap", background: "var(--bg-secondary)" }}>
        {["🚚 Free shipping over $50", "🌱 Printed on demand · Zero waste", "🇺🇸 Made in the USA"].map(t => (
          <span key={t} style={{ fontSize: 12, color: "var(--text-secondary)", fontWeight: 500 }}>{t}</span>
        ))}
      </div>
    </div>
  );
}
