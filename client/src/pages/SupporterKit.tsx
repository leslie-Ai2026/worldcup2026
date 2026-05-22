import { useState } from "react";

// ─── 3 Signature Items ──────────────────────────────────────────
const PRODUCTS = [
  {
    id: 1, name: "Mexico Official Jersey Tee", price: "$29.99",
    img: "/images/jersey.png", fallback: "https://images.unsplash.com/photo-1556821840-3a63f15732ce?w=600&q=85",
    desc: "Premium heavyweight cotton. Vintage athletic fit.",
  },
  {
    id: 2, name: "Host City Canvas Tote", price: "$19.99",
    img: "https://images.unsplash.com/photo-1544816155-12df9643f363?w=600&q=85",
    fallback: "https://images.unsplash.com/photo-1544816155-12df9643f363?w=600&q=85",
    desc: "12oz natural canvas. Screen-printed.",
  },
  {
    id: 3, name: "Match-Day Washed Cap", price: "$24.99",
    img: "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=600&q=85",
    fallback: "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=600&q=85",
    desc: "Enzyme-washed cotton twill. Brass buckle.",
  },
];

const COLORS = [
  { code: "white", label: "White", hex: "#FFFFFF", border: "#D1D5DB" },
  { code: "black", label: "Black", hex: "#111827", border: "#111827" },
  { code: "sand",  label: "Sand",  hex: "#D4C5A9", border: "#B8A88A" },
];

const SIZES = ["S", "M", "L", "XL", "XXL"];

// ─── Live Preview Component ─────────────────────────────────────
function LivePreview({ product, color, text, number }: {
  product: typeof PRODUCTS[0]; color: string; text: string; number: string;
}) {
  const bgColor = COLORS.find(c => c.code === color)?.hex || "#FFFFFF";
  const displayText = text || "YOUR TEXT";
  const displayNumber = number || "26";

  return (
    <div style={{
      position: "relative", width: "100%", aspectRatio: "1/1",
      background: "#f9fafb", border: "1px solid var(--border)", overflow: "hidden",
      display: "flex", alignItems: "center", justifyContent: "center",
    }}>
      {/* Base product image */}
      <img src={product.img} alt={product.name}
        style={{ width: "100%", height: "100%", objectFit: "cover", position: "absolute", inset: 0, opacity: 0.85 }}
        onError={e => { (e.target as HTMLImageElement).src = product.fallback; }} />

      {/* Color tint overlay */}
      {color !== "white" && (
        <div style={{
          position: "absolute", inset: 0,
          background: bgColor, opacity: 0.06, mixBlendMode: "multiply",
        }} />
      )}

      {/* Custom text overlay — centered on the chest/center */}
      <div style={{
        position: "absolute", top: "35%", left: "50%", transform: "translate(-50%, -50%)",
        textAlign: "center", zIndex: 10, pointerEvents: "none",
      }}>
        <div style={{
          fontFamily: "var(--font-display)", fontWeight: 900,
          fontSize: "clamp(16px, 3vw, 32px)", color: "#111827",
          textTransform: "uppercase", letterSpacing: "0.06em",
          lineHeight: 1.1, textShadow: "0 1px 3px rgba(255,255,255,0.6)",
        }}>{displayText}</div>
        <div style={{
          fontFamily: "var(--font-display)", fontWeight: 900,
          fontSize: "clamp(28px, 5vw, 56px)", color: "#111827",
          lineHeight: 1, textShadow: "0 1px 3px rgba(255,255,255,0.6)",
        }}>{displayNumber}</div>
      </div>

      {/* Color dot indicator */}
      <div style={{ position: "absolute", bottom: 10, right: 10, display: "flex", gap: 4, zIndex: 10 }}>
        <div style={{ width: 10, height: 10, borderRadius: "50%", background: bgColor, border: `1px solid ${COLORS.find(c => c.code === color)?.border || "#ccc"}` }} />
      </div>
    </div>
  );
}

// ─── Page ───────────────────────────────────────────────────────
export default function SupporterKit() {
  const [color, setColor] = useState<Record<number, string>>({});
  const [size, setSize] = useState<Record<number, string>>({});
  const [text, setText] = useState<Record<number, string>>({});
  const [number, setNumber] = useState<Record<number, string>>({});

  const handleBuy = (p: typeof PRODUCTS[0]) => {
    const c = COLORS.find(x => x.code === (color[p.id] || "white"))?.label || "White";
    const s = size[p.id] || "M";
    const t = text[p.id] || "";
    const n = number[p.id] || "";
    alert(`${p.name} [${c}, ${s}]${t ? ` — "${t}"` : ""}${n ? ` #${n}` : ""} added to cart. Stripe Checkout is initializing securely…`);
  };

  return (
    <div style={{ maxWidth: 1100, margin: "0 auto", padding: "24px 20px 40px", background: "#fff" }}>
      <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 900, fontSize: "clamp(28px, 5vw, 38px)", textAlign: "center", marginBottom: 4 }}>THE SUPPORTER KIT</h1>
      <p style={{ fontSize: 14, color: "var(--text-secondary)", textAlign: "center", marginBottom: 32 }}>Only 3 items. Customize yours live.</p>

      {/* 3 product cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 24, marginBottom: 40 }}>
        {PRODUCTS.map(p => {
          const activeColor = color[p.id] || "white";
          const activeText = text[p.id] || "";
          const activeNumber = number[p.id] || "";

          return (
            <div key={p.id} style={{ border: "1px solid var(--border)", background: "#fff" }}>
              {/* LIVE PREVIEW MOCKUP */}
              <LivePreview product={p} color={activeColor} text={activeText} number={activeNumber} />

              <div style={{ padding: "16px" }}>
                <h3 style={{ fontFamily: "var(--font-body)", fontWeight: 700, fontSize: 15, marginBottom: 2 }}>{p.name}</h3>
                <p style={{ fontSize: 11, color: "var(--text-secondary)", marginBottom: 14 }}>{p.desc}</p>

                {/* Color Selector Dots */}
                <div style={{ fontSize: 9, fontWeight: 600, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 6 }}>Color</div>
                <div style={{ display: "flex", gap: 10, marginBottom: 12 }}>
                  {COLORS.map(c => {
                    const active = activeColor === c.code;
                    return (
                      <button key={c.code} onClick={() => setColor(prev => ({ ...prev, [p.id]: c.code }))} title={c.label}
                        style={{
                          width: 28, height: 28, borderRadius: "50%",
                          background: c.hex,
                          border: active ? `3px solid #111827` : `2px solid ${c.border}`,
                          cursor: "pointer", transition: "all 0.1s", outline: "none",
                          boxShadow: active ? "0 0 0 2px rgba(0,0,0,0.1)" : "none",
                        }} />
                    );
                  })}
                </div>

                {/* Custom Text Input */}
                <div style={{ fontSize: 9, fontWeight: 600, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 4 }}>Custom Text</div>
                <input
                  value={activeText}
                  onChange={e => {
                    const val = e.target.value.slice(0, 15).toUpperCase();
                    setText(prev => ({ ...prev, [p.id]: val }));
                  }}
                  placeholder="ENTER YOUR CUSTOM TEXT (Max 15 characters)"
                  maxLength={15}
                  style={{
                    width: "100%", padding: "8px 10px", marginBottom: 10,
                    fontFamily: "var(--font-mono)", fontSize: 10, fontWeight: 700,
                    color: "#111827", background: "#fff",
                    border: "1px solid var(--border)", borderRadius: 2,
                    outline: "none", letterSpacing: "0.06em",
                  }}
                  onFocus={e => (e.target.style.borderColor = "#111827")}
                  onBlur={e => (e.target.style.borderColor = "var(--border)")}
                />

                {/* Custom Number Input */}
                <div style={{ fontSize: 9, fontWeight: 600, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 4 }}>Number</div>
                <input
                  value={activeNumber}
                  onChange={e => {
                    const val = e.target.value.replace(/\D/g, "").slice(0, 2);
                    setNumber(prev => ({ ...prev, [p.id]: val }));
                  }}
                  placeholder="NUMBER (e.g., 26)"
                  maxLength={2}
                  style={{
                    width: "100%", padding: "8px 10px", marginBottom: 10,
                    fontFamily: "var(--font-mono)", fontSize: 10, fontWeight: 700,
                    color: "#111827", background: "#fff",
                    border: "1px solid var(--border)", borderRadius: 2,
                    outline: "none", letterSpacing: "0.06em",
                  }}
                  onFocus={e => (e.target.style.borderColor = "#111827")}
                  onBlur={e => (e.target.style.borderColor = "var(--border)")}
                />

                {/* Size */}
                <div style={{ fontSize: 9, fontWeight: 600, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 4 }}>Size</div>
                <div style={{ display: "flex", gap: 3, marginBottom: 16, flexWrap: "wrap" }}>
                  {SIZES.map(sz => {
                    const active = (size[p.id] || "M") === sz;
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
                  <button onClick={() => handleBuy(p)} className="btn-black" style={{ fontSize: 12, padding: "9px 22px" }}>
                    BUY NOW
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Shipping bar */}
      <div style={{ border: "1px solid var(--border)", padding: "14px 20px", display: "flex", justifyContent: "center", gap: 32, flexWrap: "wrap", background: "var(--bg-secondary)" }}>
        {["🚚 Free shipping over $50", "🌱 Printed on demand · Zero waste", "🇺🇸 Made in the USA"].map(t => (
          <span key={t} style={{ fontSize: 12, color: "var(--text-secondary)", fontWeight: 500 }}>{t}</span>
        ))}
      </div>
    </div>
  );
}
