import { useState, useRef } from "react";

// ═══════════════════════════════════════════════════════════════
// PRODUCT DATA
// ═══════════════════════════════════════════════════════════════
const PRODUCTS = [
  {
    id: 1, type: "tee" as const, name: "Official Tournament Tee", price: "$29.99",
    img: "/images/banner.png",
    fallback: "https://images.unsplash.com/photo-1556821840-3a63f15732ce?w=600&q=85",
    desc: "Premium heavyweight cotton. Classic athletic fit. Screen-print ready.",
    // Print zone: center chest (CSS % relative to mockup container)
    printZone: { top: "28%", left: "50%", width: "45%", height: "35%" },
  },
  {
    id: 2, type: "tote" as const, name: "Host City Canvas Tote", price: "$19.99",
    img: "https://images.unsplash.com/photo-1544816155-12df9643f363?w=600&q=85",
    fallback: "https://images.unsplash.com/photo-1544816155-12df9643f363?w=600&q=85",
    desc: "12oz natural canvas. Front panel print zone. Zero plastic.",
    printZone: { top: "30%", left: "50%", width: "50%", height: "40%" },
  },
  {
    id: 3, type: "cap" as const, name: "Match-Day Washed Cap", price: "$24.99",
    img: "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=600&q=85",
    fallback: "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=600&q=85",
    desc: "Enzyme-washed cotton twill. Front crown embroidery zone.",
    printZone: { top: "22%", left: "50%", width: "35%", height: "28%" },
  },
];

const COLORS = [
  { code: "white", label: "White", hex: "#FFFFFF", border: "#D1D5DB" },
  { code: "black", label: "Black", hex: "#111827", border: "#111827" },
  { code: "sand", label: "Sand", hex: "#D4C5A9", border: "#B8A88A" },
];
const SIZES = ["S", "M", "L", "XL", "XXL"];

// ═══════════════════════════════════════════════════════════════
// LIVE SCREEN-PRINT PREVIEW ENGINE
// ═══════════════════════════════════════════════════════════════
function ScreenPrintPreview({
  product, color, text, customImg,
}: {
  product: typeof PRODUCTS[0]; color: string; text: string; customImg: string | null;
}) {
  const bgColor = COLORS.find(c => c.code === color)?.hex || "#FFFFFF";
  const lines = text ? text.split("\n") : [];

  return (
    <div style={{
      position: "relative", width: "100%", aspectRatio: "1/1",
      background: "#f9fafb", overflow: "hidden",
      display: "flex", alignItems: "center", justifyContent: "center",
    }}>
      {/* ── Base garment image ──────────────────────────── */}
      <img
        src={product.img}
        alt={product.name}
        style={{
          width: "100%", height: "100%", objectFit: "cover",
          position: "absolute", inset: 0,
          // Preserve fabric texture — no opacity loss on base
        }}
        onError={e => { (e.target as HTMLImageElement).src = product.fallback; }}
      />

      {/* ── Color tint overlay ──────────────────────────── */}
      {color !== "white" && (
        <div style={{
          position: "absolute", inset: 0,
          background: bgColor, opacity: 0.08,
          mixBlendMode: "multiply", pointerEvents: "none",
        }} />
      )}

      {/* ═══ ABSOLUTE PRINT ZONE ═══════════════════════════ */}
      <div style={{
        position: "absolute",
        top: product.printZone.top,
        left: product.printZone.left,
        width: product.printZone.width,
        height: product.printZone.height,
        transform: "translate(-50%, -50%)",
        display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
        gap: 4,
        pointerEvents: "none",
        zIndex: 10,
      }}>
        {/* ── Uploaded graphic — screen-print blend ────── */}
        {customImg && (
          <img
            src={customImg}
            alt="Custom graphic"
            style={{
              maxWidth: "100%", maxHeight: "65%",
              objectFit: "contain",
              /* THE CRUCIAL SCREEN-PRINT BLEND */
              mixBlendMode: "multiply",
              opacity: 0.82,
              filter: "contrast(1.08) brightness(0.96)",
            }}
          />
        )}

        {/* ── Multiline text — matching screen-print feel ─ */}
        {lines.length > 0 && lines.map((line, i) => (
          <div key={i} style={{
            fontFamily: "var(--font-display)", fontWeight: 900,
            fontSize: i === 0
              ? "clamp(14px, 2.5vw, 28px)"
              : "clamp(22px, 4vw, 48px)",
            color: "#111827",
            textTransform: "uppercase",
            letterSpacing: "0.06em",
            lineHeight: 1,
            textAlign: "center",
            /* Screen-print text blend */
            mixBlendMode: "multiply",
            opacity: 0.88,
            filter: "contrast(1.04)",
            textShadow: "0 1px 2px rgba(255,255,255,0.5)",
          }}>
            {line}
          </div>
        ))}
      </div>

      {/* ── Color dot indicator ──────────────────────────── */}
      <div style={{ position: "absolute", bottom: 10, right: 10, display: "flex", gap: 4, zIndex: 20, pointerEvents: "none" }}>
        <div style={{
          width: 12, height: 12, borderRadius: "50%",
          background: bgColor,
          border: `1.5px solid ${COLORS.find(c => c.code === color)?.border || "#ccc"}`,
        }} />
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// PAGE
// ═══════════════════════════════════════════════════════════════
export default function SupporterKit() {
  const [color, setColor] = useState<Record<number, string>>({});
  const [size, setSize] = useState<Record<number, string>>({});
  const [text, setText] = useState<Record<number, string>>({});
  const [customImg, setCustomImg] = useState<Record<number, string | null>>({});
  const fileRefs = useRef<Record<number, HTMLInputElement | null>>({});

  const handleImageUpload = (productId: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => setCustomImg(prev => ({ ...prev, [productId]: ev.target?.result as string }));
      reader.readAsDataURL(file);
    }
  };

  const clearImage = (productId: number) => {
    setCustomImg(prev => ({ ...prev, [productId]: null }));
    if (fileRefs.current[productId]) fileRefs.current[productId]!.value = "";
  };

  const handleBuy = (p: typeof PRODUCTS[0]) => {
    const c = COLORS.find(x => x.code === (color[p.id] || "white"))?.label || "White";
    const s = size[p.id] || "M";
    const t = text[p.id] || "";
    alert(`${p.name} [${c}, ${s}]${t ? ` — "${t.replace(/\n/g, " ")}"` : ""} added to cart. Stripe Checkout is initializing securely…`);
  };

  return (
    <div style={{ maxWidth: 1100, margin: "0 auto", padding: "24px 20px 40px", background: "#fff" }}>
      <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 900, fontSize: "clamp(28px, 5vw, 38px)", textAlign: "center", marginBottom: 4 }}>
        THE SUPPORTER KIT
      </h1>
      <p style={{ fontSize: 14, color: "var(--text-secondary)", textAlign: "center", marginBottom: 32 }}>
        Only 3 items. Customize. Print. Wear.
      </p>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 24, marginBottom: 40 }}>
        {PRODUCTS.map(p => {
          const activeColor = color[p.id] || "white";
          const activeText = text[p.id] || "";
          const activeImg = customImg[p.id] || null;

          return (
            <div key={p.id} style={{ border: "1px solid var(--border)", background: "#fff" }}>
              {/* ═══ SCREEN-PRINT PREVIEW ════════════════════ */}
              <ScreenPrintPreview product={p} color={activeColor} text={activeText} customImg={activeImg} />

              <div style={{ padding: "16px" }}>
                <h3 style={{ fontFamily: "var(--font-body)", fontWeight: 700, fontSize: 15, marginBottom: 2 }}>
                  {p.name}
                </h3>
                <p style={{ fontSize: 11, color: "var(--text-secondary)", marginBottom: 12 }}>{p.desc}</p>

                {/* ── Color dots ──────────────────────────── */}
                <div style={{ fontSize: 9, fontWeight: 600, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 6 }}>Color</div>
                <div style={{ display: "flex", gap: 10, marginBottom: 10 }}>
                  {COLORS.map(c => {
                    const active = activeColor === c.code;
                    return (
                      <button key={c.code} onClick={() => setColor(prev => ({ ...prev, [p.id]: c.code }))} title={c.label}
                        style={{ width: 28, height: 28, borderRadius: "50%", background: c.hex, border: active ? "3px solid #111827" : `2px solid ${c.border}`, cursor: "pointer", outline: "none", boxShadow: active ? "0 0 0 2px rgba(0,0,0,0.1)" : "none" }} />
                    );
                  })}
                </div>

                {/* ── Image upload ────────────────────────── */}
                <div style={{ fontSize: 9, fontWeight: 600, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 4 }}>Custom Graphic</div>
                <div style={{ display: "flex", gap: 6, marginBottom: 10 }}>
                  <input
                    ref={el => { fileRefs.current[p.id] = el; }}
                    type="file" accept="image/*"
                    onChange={e => handleImageUpload(p.id, e)}
                    style={{ flex: 1, padding: "6px 8px", fontFamily: "var(--font-body)", fontSize: 10, color: "var(--text-secondary)", background: "#fff", border: "1px solid var(--border)", borderRadius: 2, outline: "none" }}
                  />
                  {activeImg && (
                    <button onClick={() => clearImage(p.id)}
                      style={{ fontFamily: "var(--font-body)", fontSize: 10, color: "var(--accent-red)", background: "#FEF2F2", border: "1px solid #FECACA", borderRadius: 2, padding: "4px 8px", cursor: "pointer", whiteSpace: "nowrap" }}>
                      ✕ Clear
                    </button>
                  )}
                </div>

                {/* ── Multiline text ──────────────────────── */}
                <div style={{ fontSize: 9, fontWeight: 600, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 4 }}>Custom Text / Number</div>
                <textarea
                  value={activeText}
                  onChange={e => setText(prev => ({ ...prev, [p.id]: e.target.value.slice(0, 40) }))}
                  placeholder={"Name on line 1\nNumber on line 2  (e.g., 26)"}
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

                {/* ── Size ────────────────────────────────── */}
                <div style={{ fontSize: 9, fontWeight: 600, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 4 }}>Size</div>
                <div style={{ display: "flex", gap: 3, marginBottom: 16, flexWrap: "wrap" }}>
                  {SIZES.map(sz => {
                    const active = (size[p.id] || "M") === sz;
                    return (
                      <button key={sz} onClick={() => setSize(prev => ({ ...prev, [p.id]: sz }))}
                        style={{ fontFamily: "var(--font-mono)", fontSize: 9, fontWeight: active ? 600 : 400, color: active ? "#fff" : "var(--text-secondary)", background: active ? "#111827" : "#fff", border: `1px solid ${active ? "#111827" : "var(--border)"}`, borderRadius: 2, padding: "4px 8px", cursor: "pointer" }}>{sz}</button>
                    );
                  })}
                </div>

                {/* ── Price + Buy ─────────────────────────── */}
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

      {/* Shipping footer */}
      <div style={{ border: "1px solid var(--border)", padding: "14px 20px", display: "flex", justifyContent: "center", gap: 32, flexWrap: "wrap", background: "var(--bg-secondary)" }}>
        {["🚚 Free shipping over $50", "🌱 Printed on demand · Zero waste", "🇺🇸 Made in the USA"].map(t => (
          <span key={t} style={{ fontSize: 12, color: "var(--text-secondary)", fontWeight: 500 }}>{t}</span>
        ))}
      </div>
    </div>
  );
}
