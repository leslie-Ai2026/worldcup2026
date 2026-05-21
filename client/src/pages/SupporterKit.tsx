import { useState } from "react";

const PRODUCTS = [
  { id: 1, name: "Vintage 3-Nation Hoodie", price: "$45.00", img: "https://images.unsplash.com/photo-1556821840-3a63f15732ce?w=600&q=85&fit=crop", sizes: ["XS","S","M","L","XL","2XL"], colors: ["Pitch Black","Vintage Ash","Forest"], desc: "400gsm brushed fleece. Embroidered tri-flag crest." },
  { id: 2, name: "Host City Canvas Tote", price: "$19.99", img: "https://images.unsplash.com/photo-1544816155-12df9643f363?w=600&q=85&fit=crop", sizes: ["One Size"], colors: ["Natural Canvas","Slate"], desc: "12oz canvas. Screen-printed host city map. Zero plastic." },
  { id: 3, name: "Match-Day Washed Cap", price: "$24.99", img: "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=600&q=85&fit=crop", sizes: ["One Size"], colors: ["Washed Black","Washed Navy","Washed Olive"], desc: "Enzyme-washed cotton twill. Adjustable brass buckle." },
];

export default function SupporterKit() {
  const [selSize, setSize] = useState<Record<number, string>>({});
  const [selColor, setColor] = useState<Record<number, string>>({});

  return (
    <div style={{ maxWidth: 1200, margin: "0 auto", padding: "24px 20px 40px", background: "#fff" }}>
      <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 900, fontSize: "clamp(28px,5vw,38px)", textAlign: "center", marginBottom: 4 }}>THE SUPPORTER KIT</h1>
      <p style={{ fontSize: 14, color: "var(--text-secondary)", textAlign: "center", marginBottom: 32 }}>Only 3 items. No choice paralysis.</p>

      {/* 3 product columns — ABOVE THE FOLD */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 24, marginBottom: 40 }}>
        {PRODUCTS.map(p => (
          <div key={p.id} style={{ border: "1px solid var(--border)", background: "#fff" }}>
            {/* PRODUCT IMAGE FIRST */}
            <img src={p.img} alt={p.name} style={{ width: "100%", height: 360, objectFit: "cover", display: "block" }}
              onError={e => { (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1556821840-3a63f15732ce?w=600&q=85"; }} />

            <div style={{ padding: "16px" }}>
              <h3 style={{ fontFamily: "var(--font-body)", fontWeight: 700, fontSize: 15, marginBottom: 2 }}>{p.name}</h3>
              <p style={{ fontSize: 11, color: "var(--text-secondary)", marginBottom: 10 }}>{p.desc}</p>

              {/* Size */}
              <div style={{ fontSize: 9, fontWeight: 600, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 4 }}>Size</div>
              <div style={{ display: "flex", gap: 3, marginBottom: 10, flexWrap: "wrap" }}>
                {p.sizes.map(sz => {
                  const active = (selSize[p.id] || p.sizes[0]) === sz;
                  return <button key={sz} onClick={() => setSize(prev => ({ ...prev, [p.id]: sz }))} style={{ fontFamily: "var(--font-mono)", fontSize: 9, fontWeight: active ? 600 : 400, color: active ? "#fff" : "var(--text-secondary)", background: active ? "#111827" : "#fff", border: `1px solid ${active ? "#111827" : "var(--border)"}`, borderRadius: 2, padding: "3px 7px", cursor: "pointer" }}>{sz}</button>;
                })}
              </div>

              {/* Color */}
              <div style={{ fontSize: 9, fontWeight: 600, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 4 }}>Color</div>
              <div style={{ display: "flex", gap: 3, marginBottom: 16, flexWrap: "wrap" }}>
                {p.colors.map(clr => {
                  const active = (selColor[p.id] || p.colors[0]) === clr;
                  return <button key={clr} onClick={() => setColor(prev => ({ ...prev, [p.id]: clr }))} style={{ fontFamily: "var(--font-body)", fontSize: 9, fontWeight: active ? 600 : 400, color: active ? "#fff" : "var(--text-secondary)", background: active ? "#111827" : "#fff", border: `1px solid ${active ? "#111827" : "var(--border)"}`, borderRadius: 2, padding: "3px 7px", cursor: "pointer" }}>{clr}</button>;
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

      {/* Bottom shipping bar */}
      <div style={{ border: "1px solid var(--border)", padding: "16px 20px", display: "flex", justifyContent: "center", gap: 32, flexWrap: "wrap", background: "var(--bg-secondary)" }}>
        {["🚚 Free shipping over $50","🌱 Printed on demand · Zero waste","🇺🇸 Made in the USA"].map(t => (
          <span key={t} style={{ fontSize: 12, color: "var(--text-secondary)", fontWeight: 500 }}>{t}</span>
        ))}
      </div>
    </div>
  );
}
