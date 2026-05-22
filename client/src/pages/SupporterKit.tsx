import { useState } from "react";

const PRODUCTS = [
  {
    id: 1, name: "Official Tournament Tee", price: "$29.99",
    img: "/images/banner.png",
    fallback: "https://images.unsplash.com/photo-1556821840-3a63f15732ce?w=600&q=85",
    desc: "Premium heavyweight cotton. Classic athletic fit.",
  },
  {
    id: 2, name: "Host City Canvas Tote", price: "$19.99",
    img: "https://images.unsplash.com/photo-1544816155-12df9643f363?w=600&q=85",
    fallback: "https://images.unsplash.com/photo-1544816155-12df9643f363?w=600&q=85",
    desc: "12oz natural canvas. Screen-printed host city map.",
  },
  {
    id: 3, name: "Match-Day Washed Cap", price: "$24.99",
    img: "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=600&q=85",
    fallback: "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=600&q=85",
    desc: "Enzyme-washed cotton twill. Adjustable brass buckle.",
  },
];

const COLORS = [
  { code: "white", label: "White", hex: "#FFFFFF", border: "#D1D5DB" },
  { code: "black", label: "Black", hex: "#111827", border: "#111827" },
  { code: "sand",  label: "Sand",  hex: "#D4C5A9", border: "#B8A88A" },
];

const SIZES = ["S", "M", "L", "XL", "XXL"];

// ─── Live Preview ──────────────────────────────────────────────
function LivePreview({ product, color, text }: {
  product: typeof PRODUCTS[0]; color: string; text: string;
}) {
  const bgColor = COLORS.find(c => c.code === color)?.hex || "#FFFFFF";
  const lines = text ? text.split("\n") : ["YOUR", "TEXT"];

  return (
    <div style={{
      position: "relative", width: "100%", aspectRatio: "1/1",
      background: "#f9fafb", border: "1px solid var(--border)", overflow: "hidden",
      display: "flex", alignItems: "center", justifyContent: "center",
    }}>
      {/* Base product image */}
      <img src={product.img} alt={product.name}
        style={{ width: "100%", height: "100%", objectFit: "cover", position: "absolute", inset: 0, opacity: 0.88 }}
        onError={e => { (e.target as HTMLImageElement).src = product.fallback; }} />

      {/* Color tint */}
      {color !== "white" && (
        <div style={{ position: "absolute", inset: 0, background: bgColor, opacity: 0.05, mixBlendMode: "multiply" }} />
      )}

      {/* Text overlay — Pinned to chest/center print zone */}
      <div style={{
        position: "absolute", top: "33%", left: "50%", transform: "translate(-50%, -50%)",
        textAlign: "center", zIndex: 10, pointerEvents: "none",
        width: "70%",
      }}>
        {lines.map((line, i) => (
          <div key={i} style={{
            fontFamily: "var(--font-display)", fontWeight: 900,
            fontSize: i === 0 ? "clamp(18px, 3vw, 34px)" : "clamp(28px, 5vw, 52px)",
            color: "#111827",
            textTransform: "uppercase", letterSpacing: "0.06em",
            lineHeight: i === 0 ? 1.2 : 1,
            textShadow: "0 1px 2px rgba(255,255,255,0.7)",
          }}>{line}</div>
        ))}
      </div>
    </div>
  );
}

// ─── Page ──────────────────────────────────────────────────────
export default function SupporterKit() {
  const [color, setColor] = useState<Record<number, string>>({});
  const [size, setSize] = useState<Record<number, string>>({});
  const [text, setText] = useState<Record<number, string>>({});
  const [previewImg, setPreviewImg] = useState<Record<number, string>>({});

  const handleImageUpload = (productId: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        setPreviewImg(prev => ({ ...prev, [productId]: ev.target?.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleBuy = (p: typeof PRODUCTS[0]) => {
    const c = COLORS.find(x => x.code === (color[p.id] || "white"))?.label || "White";
    const s = size[p.id] || "M";
    const t = text[p.id] || "";
    alert(`${p.name} [${c}, ${s}]${t ? ` — "${t.replace(/\n/g, " ")}"` : ""} added to cart. Stripe Checkout is initializing securely…`);
  };

  return (
    <div style={{ maxWidth: 1100, margin: "0 auto", padding: "24px 20px 40px", background: "#fff" }}>
      <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 900, fontSize: "clamp(28px, 5vw, 38px)", textAlign: "center", marginBottom: 4 }}>THE SUPPORTER KIT</h1>
      <p style={{ fontSize: 14, color: "var(--text-secondary)", textAlign: "center", marginBottom: 32 }}>Only 3 items. Customize yours live.</p>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 24, marginBottom: 40 }}>
        {PRODUCTS.map(p => {
          const activeColor = color[p.id] || "white";
          const activeText = text[p.id] || "";
          const activePreview = previewImg[p.id];

          return (
            <div key={p.id} style={{ border: "1px solid var(--border)", background: "#fff" }}>
              {/* Live preview */}
              {activePreview ? (
                <div style={{ position: "relative", width: "100%", aspectRatio: "1/1", background: "#f9fafb", borderBottom: "1px solid var(--border)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <img src={activePreview} alt="Custom upload" style={{ width: "100%", height: "100%", objectFit: "cover", position: "absolute", inset: 0, opacity: 0.85 }} />
                  {/* Text overlay on custom image too */}
                  {activeText && (
                    <div style={{ position: "absolute", top: "33%", left: "50%", transform: "translate(-50%, -50%)", textAlign: "center", zIndex: 10, pointerEvents: "none", width: "70%" }}>
                      {activeText.split("\n").map((line, i) => (
                        <div key={i} style={{ fontFamily: "var(--font-display)", fontWeight: 900, fontSize: i === 0 ? "clamp(18px, 3vw, 34px)" : "clamp(28px, 5vw, 52px)", color: "#111827", textTransform: "uppercase", letterSpacing: "0.06em", lineHeight: i === 0 ? 1.2 : 1, textShadow: "0 1px 2px rgba(255,255,255,0.7)" }}>{line}</div>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <LivePreview product={p} color={activeColor} text={activeText} />
              )}

              <div style={{ padding: "16px" }}>
                <h3 style={{ fontFamily: "var(--font-body)", fontWeight: 700, fontSize: 15, marginBottom: 2 }}>{p.name}</h3>
                <p style={{ fontSize: 11, color: "var(--text-secondary)", marginBottom: 14 }}>{p.desc}</p>

                {/* Color dots */}
                <div style={{ fontSize: 9, fontWeight: 600, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 6 }}>Color</div>
                <div style={{ display: "flex", gap: 10, marginBottom: 12 }}>
                  {COLORS.map(c => {
                    const active = activeColor === c.code;
                    return (
                      <button key={c.code} onClick={() => setColor(prev => ({ ...prev, [p.id]: c.code }))} title={c.label}
                        style={{ width: 28, height: 28, borderRadius: "50%", background: c.hex, border: active ? "3px solid #111827" : `2px solid ${c.border}`, cursor: "pointer", outline: "none", boxShadow: active ? "0 0 0 2px rgba(0,0,0,0.1)" : "none" }} />
                    );
                  })}
                </div>

                {/* Custom Image Upload */}
                <div style={{ fontSize: 9, fontWeight: 600, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 4 }}>Custom Image / Logo</div>
                <input type="file" accept="image/*" onChange={e => handleImageUpload(p.id, e)}
                  style={{ width: "100%", padding: "6px 8px", marginBottom: 10, fontFamily: "var(--font-body)", fontSize: 10, color: "var(--text-secondary)", background: "#fff", border: "1px solid var(--border)", borderRadius: 2, outline: "none" }} />

                {/* Custom Text — multiline textarea */}
                <div style={{ fontSize: 9, fontWeight: 600, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 4 }}>Custom Text / Number</div>
                <textarea
                  value={activeText}
                  onChange={e => setText(prev => ({ ...prev, [p.id]: e.target.value.slice(0, 40) }))}
                  placeholder={"Enter name on line 1\nEnter number on line 2 (e.g., 26)"}
                  rows={2}
                  maxLength={40}
                  style={{
                    width: "100%", padding: "8px 10px", marginBottom: 10,
                    fontFamily: "var(--font-mono)", fontSize: 11, fontWeight: 700,
                    color: "#111827", background: "#fff",
                    border: "1px solid var(--border)", borderRadius: 2,
                    outline: "none", letterSpacing: "0.06em", resize: "none",
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
                      <button key={sz} onClick={() => setSize(prev => ({ ...prev, [p.id]: sz }))} style={{ fontFamily: "var(--font-mono)", fontSize: 9, fontWeight: active ? 600 : 400, color: active ? "#fff" : "var(--text-secondary)", background: active ? "#111827" : "#fff", border: `1px solid ${active ? "#111827" : "var(--border)"}`, borderRadius: 2, padding: "4px 8px", cursor: "pointer" }}>{sz}</button>
                    );
                  })}
                </div>

                {/* Price + Buy */}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontFamily: "var(--font-body)", fontWeight: 700, fontSize: 20 }}>{p.price}</span>
                  <button onClick={() => handleBuy(p)} className="btn-black" style={{ fontSize: 12, padding: "9px 22px" }}>BUY NOW</button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div style={{ border: "1px solid var(--border)", padding: "14px 20px", display: "flex", justifyContent: "center", gap: 32, flexWrap: "wrap", background: "var(--bg-secondary)" }}>
        {["🚚 Free shipping over $50", "🌱 Printed on demand · Zero waste", "🇺🇸 Made in the USA"].map(t => (
          <span key={t} style={{ fontSize: 12, color: "var(--text-secondary)", fontWeight: 500 }}>{t}</span>
        ))}
      </div>
    </div>
  );
}
