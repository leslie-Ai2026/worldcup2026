import { useState } from "react";

const DESIGNS = [
  { code: "mx", label: "Mexico Vintage Edition" },
  { code: "us", label: "USA Heritage Edition" },
  { code: "ca", label: "Canada Classic Edition" },
];
const SIZES = ["S", "M", "L", "XL", "XXL"];

const PRODUCTS = [
  {
    id: 1,
    name: "Vintage 3-Nation Hoodie",
    price: "$45.00",
    img: "/images/hoodie.png",
    imgFallback: "https://images.unsplash.com/photo-1556821840-3a63f15732ce?w=600&q=85&fit=crop",
    desc: "400gsm brushed fleece. Embroidered tri-flag crest. Premium lookbook edition.",
  },
  {
    id: 2,
    name: "Host City Canvas Tote",
    price: "$19.99",
    img: "https://images.unsplash.com/photo-1544816155-12df9643f363?w=600&q=85&fit=crop",
    desc: "12oz canvas. Screen-printed host city map. Zero plastic.",
  },
  {
    id: 3,
    name: "Match-Day Washed Cap",
    price: "$24.99",
    img: "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=600&q=85&fit=crop",
    desc: "Enzyme-washed cotton twill. Adjustable brass buckle.",
  },
];

export default function SupporterKit() {
  const [selDesign, setDesign] = useState<Record<number, string>>({});
  const [selSize, setSize] = useState<Record<number, string>>({});
  const [toast, setToast] = useState<string | null>(null);

  const handleBuy = (product: typeof PRODUCTS[0]) => {
    const design = DESIGNS.find(d => d.code === (selDesign[product.id] || "mx"))?.label || "Mexico Vintage Edition";
    const size = selSize[product.id] || "M";
    setToast(`${design} — ${product.name} [${size}] added to cart. Stripe Checkout is initializing securely…`);
    setTimeout(() => setToast(null), 4000);
  };

  return (
    <div style={{ maxWidth: 1200, margin: "0 auto", padding: "24px 20px 40px", background: "#fff" }}>
      <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 900, fontSize: "clamp(28px, 5vw, 38px)", textAlign: "center", marginBottom: 4 }}>THE SUPPORTER KIT</h1>
      <p style={{ fontSize: 14, color: "var(--text-secondary)", textAlign: "center", marginBottom: 32 }}>Only 3 items. No choice paralysis.</p>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 24, marginBottom: 40 }}>
        {PRODUCTS.map(p => (
          <div key={p.id} style={{ border: "1px solid var(--border)", background: "#fff" }}>
            {/* PRODUCT IMAGE */}
            <img
              src={p.img}
              alt={`${p.name} — premium World Cup 2026 supporter apparel lookbook edition`}
              style={{ width: "100%", height: 360, objectFit: "cover", display: "block", background: "#f9fafb" }}
              onError={e => { (e.target as HTMLImageElement).src = p.imgFallback || "https://images.unsplash.com/photo-1556821840-3a63f15732ce?w=600&q=85"; }}
            />

            <div style={{ padding: "16px" }}>
              <h3 style={{ fontFamily: "var(--font-body)", fontWeight: 700, fontSize: 15, marginBottom: 2 }}>{p.name}</h3>
              <p style={{ fontSize: 11, color: "var(--text-secondary)", marginBottom: 12 }}>{p.desc}</p>

              {/* Design Layer Dropdown */}
              <div style={{ fontSize: 9, fontWeight: 600, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 4 }}>Design Layer</div>
              <select
                value={selDesign[p.id] || "mx"}
                onChange={e => setDesign(prev => ({ ...prev, [p.id]: e.target.value }))}
                style={{
                  width: "100%", padding: "8px 10px", marginBottom: 12,
                  fontFamily: "var(--font-body)", fontSize: 12, color: "var(--text-primary)",
                  background: "#fff", border: "1px solid var(--border)", borderRadius: 2,
                  cursor: "pointer", outline: "none", appearance: "none",
                }}>
                {DESIGNS.map(d => <option key={d.code} value={d.code}>{d.label}</option>)}
              </select>

              {/* Size Dropdown */}
              <div style={{ fontSize: 9, fontWeight: 600, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 4 }}>Size</div>
              <select
                value={selSize[p.id] || "M"}
                onChange={e => setSize(prev => ({ ...prev, [p.id]: e.target.value }))}
                style={{
                  width: "100%", padding: "8px 10px", marginBottom: 16,
                  fontFamily: "var(--font-body)", fontSize: 12, color: "var(--text-primary)",
                  background: "#fff", border: "1px solid var(--border)", borderRadius: 2,
                  cursor: "pointer", outline: "none", appearance: "none",
                }}>
                {SIZES.map(sz => <option key={sz} value={sz}>{sz}</option>)}
              </select>

              {/* Price + Buy */}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontFamily: "var(--font-body)", fontWeight: 700, fontSize: 20 }}>{p.price}</span>
                <button onClick={() => handleBuy(p)} className="btn-black" style={{ fontSize: 12, padding: "9px 22px" }}>
                  BUY NOW
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Toast notification */}
      {toast && (
        <div style={{
          position: "fixed", bottom: 24, left: "50%", transform: "translateX(-50%)",
          background: "#111827", color: "#fff", padding: "14px 24px", borderRadius: 4,
          fontFamily: "var(--font-body)", fontSize: 13, fontWeight: 500,
          zIndex: 200, boxShadow: "0 4px 24px rgba(0,0,0,0.15)",
          maxWidth: "90vw", textAlign: "center",
        }}>{toast}</div>
      )}

      <div style={{ border: "1px solid var(--border)", padding: "16px 20px", display: "flex", justifyContent: "center", gap: 32, flexWrap: "wrap", background: "var(--bg-secondary)" }}>
        {["🚚 Free shipping over $50", "🌱 Printed on demand · Zero waste", "🇺🇸 Made in the USA"].map(t => (
          <span key={t} style={{ fontSize: 12, color: "var(--text-secondary)", fontWeight: 500 }}>{t}</span>
        ))}
      </div>
    </div>
  );
}
