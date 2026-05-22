import { useState, useRef, useEffect } from "react";

// ═══════════════════════════════════════════════════════════════
// PREMIUM FONTS
// ═══════════════════════════════════════════════════════════════
const APP_FONTS: Record<string, { name: string; value: string; weight: string }> = {
  athletic: { name: "Athletic Block",   value: '"Montserrat", sans-serif',              weight: "900" },
  serif:    { name: "Vintage Serif",    value: '"Playfair Display", Georgia, serif',    weight: "700" },
  cursive:  { name: "Elegant Cursive",  value: '"Satisfy", cursive',                    weight: "400" },
  sans:     { name: "Bold Sans",        value: '"Inter", sans-serif',                   weight: "800" },
};

// ═══════════════════════════════════════════════════════════════
// PRINTFUL COLORWAY
// ═══════════════════════════════════════════════════════════════
const COLORS = [
  { id: "white", name: "White",      hex: "#FFFFFF", border: "#d1d5db" },
  { id: "black", name: "Black",      hex: "#111111", border: "#111111" },
  { id: "grey",  name: "Sport Grey", hex: "#DCDCDC", border: "#9ca3af" },
];

// ═══════════════════════════════════════════════════════════════
// PRODUCT CATALOG
// ═══════════════════════════════════════════════════════════════
const PRODUCTS = [
  { id: "tee",  title: "Official Tournament Tee",  price: "$29.99", mockup: "/images/white-tee.png", defaultWidth: 160, defaultHeight: 90,  initialX: 70, initialY: 130, desc: "Bella+Canvas 3001. Premium heavyweight ringspun cotton." },
  { id: "tote", title: "Host City Canvas Tote",    price: "$19.99", mockup: "/images/tote.png",      defaultWidth: 140, defaultHeight: 120, initialX: 80, initialY: 140, desc: "Eco-Friendly organic thick canvas. Reinforced stitching." },
  { id: "cap",  title: "Match-Day Retro Cap",      price: "$24.99", mockup: "/images/cap.png",       defaultWidth: 90,  defaultHeight: 40,  initialX: 105, initialY: 150, desc: "Yupoong 6245CM. Enzyme-washed vintage unstructured twill." },
];

// ═══════════════════════════════════════════════════════════════
// PRODUCT CARD
// ═══════════════════════════════════════════════════════════════
function ProductCard({
  product, isActive, onSelect, sharedState,
}: {
  product: typeof PRODUCTS[0]; isActive: boolean; onSelect: () => void;
  sharedState: { text: string; setText: (v: string) => void; uploadedImg: string | null; setUploadedImg: (v: string | null) => void; selectedFont: string; setSelectedFont: (v: string) => void; };
}) {
  const [chosenColor, setChosenColor] = useState("white");
  const [pos, setPos] = useState({ x: product.initialX, y: product.initialY });
  const [dims, setDims] = useState({ width: product.defaultWidth, height: product.defaultHeight });
  const [dragging, setDragging] = useState(false);
  const [resizing, setResizing] = useState(false);
  const dragStart = useRef({ x: 0, y: 0 });
  const resizeStart = useRef({ width: 0, height: 0, mx: 0, my: 0 });

  const colorHex = COLORS.find(c => c.id === chosenColor)?.hex || "#FFFFFF";

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!isActive || (e.target as HTMLElement).classList.contains("rsz")) return;
    setDragging(true);
    dragStart.current = { x: e.clientX - pos.x, y: e.clientY - pos.y };
  };

  const handleResizeDown = (e: React.MouseEvent) => {
    if (!isActive) return;
    e.stopPropagation();
    setResizing(true);
    resizeStart.current = { width: dims.width, height: dims.height, mx: e.clientX, my: e.clientY };
  };

  useEffect(() => {
    const mm = (e: MouseEvent) => {
      if (dragging) setPos({ x: e.clientX - dragStart.current.x, y: e.clientY - dragStart.current.y });
      if (resizing) setDims({ width: Math.max(60, resizeStart.current.width + (e.clientX - resizeStart.current.mx)), height: Math.max(30, resizeStart.current.height + (e.clientY - resizeStart.current.my)) });
    };
    const mu = () => { setDragging(false); setResizing(false); };
    if (dragging || resizing) { window.addEventListener("mousemove", mm); window.addEventListener("mouseup", mu); }
    return () => { window.removeEventListener("mousemove", mm); window.removeEventListener("mouseup", mu); };
  }, [dragging, resizing]);

  const font = APP_FONTS[sharedState.selectedFont];

  return (
    <div onClick={onSelect} style={{
      background: "#fff", padding: 24, border: isActive ? "2px solid #111827" : "1px solid #e5e7eb",
      display: "flex", flexDirection: "column", gap: 18, cursor: "pointer",
      transition: "all 0.25s", transform: isActive ? "scale(1.01)" : "scale(1)",
    }}>
      {/* ── Canvas ──────────────────────────────────────── */}
      <div style={{ position: "relative", width: "100%", height: 320, background: "#F4F4F4", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden", border: "1px solid #f3f4f6" }}>
        <img src={product.mockup} alt={product.title}
          style={{ width: "100%", height: "100%", objectFit: "contain", pointerEvents: "none" }}
          onError={e => { (e.target as HTMLImageElement).style.display = "none"; }} />

        {/* Color tint overlay */}
        {chosenColor !== "white" && (
          <div style={{ position: "absolute", inset: 0, background: colorHex, opacity: 0.06, mixBlendMode: "multiply", pointerEvents: "none" }} />
        )}

        {/* Print layer */}
        <div
          style={{
            position: "absolute", left: pos.x, top: pos.y, width: dims.width, height: dims.height,
            border: isActive ? "1px dashed #6b7280" : "1px solid transparent",
            cursor: isActive ? "move" : "default",
            display: "flex", flexDirection: "column", alignItems: "center",
            justifyContent: "center", textAlign: "center", padding: 4,
            pointerEvents: isActive ? "auto" : "none",
          }}
          onMouseDown={handleMouseDown}
          onMouseEnter={e => isActive && (e.currentTarget.style.borderColor = "#111827")}
          onMouseLeave={e => isActive && (e.currentTarget.style.borderColor = "#6b7280")}
        >
          {sharedState.uploadedImg && (
            <img src={sharedState.uploadedImg} alt="" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "contain", pointerEvents: "none", opacity: 0.8, mixBlendMode: "multiply" }} />
          )}
          <p style={{
            width: "100%", fontFamily: font.value, fontWeight: font.weight as any,
            fontSize: dims.height * 0.18, color: "#111827",
            whiteSpace: "pre-line", letterSpacing: "-0.01em", lineHeight: 1.05,
            mixBlendMode: "multiply", pointerEvents: "none", textTransform: "uppercase", margin: 0,
          }}>{sharedState.text}</p>

          {isActive && (
            <div className="rsz" onMouseDown={handleResizeDown} style={{
              position: "absolute", bottom: -5, right: -5, width: 11, height: 11,
              background: "#111827", border: "2px solid #fff", cursor: "se-resize", zIndex: 50,
            }} />
          )}
        </div>
      </div>

      {/* ── Title + Price ────────────────────────────────── */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", borderBottom: "1px solid #f3f4f6", paddingBottom: 12 }}>
        <h3 style={{ fontFamily: "var(--font-body)", fontWeight: 700, fontSize: 13, color: "#111827", textTransform: "uppercase", letterSpacing: "-0.01em" }}>{product.title}</h3>
        <span style={{ fontFamily: "var(--font-mono)", fontWeight: 700, fontSize: 13, color: "#111827" }}>{product.price}</span>
      </div>

      {/* ── Colorway ─────────────────────────────────────── */}
      <div>
        <span style={{ display: "block", fontSize: 9, fontWeight: 900, letterSpacing: "0.15em", textTransform: "uppercase", color: "#9ca3af", marginBottom: 6 }}>Printful Colorway Sync</span>
        <div style={{ display: "flex", gap: 8 }}>
          {COLORS.map(c => (
            <button key={c.id} onClick={e => { e.stopPropagation(); setChosenColor(c.id); }} title={c.name} style={{
              width: 22, height: 22, borderRadius: "50%", background: c.hex,
              border: chosenColor === c.id ? "2px solid #111827" : `1px solid ${c.border}`,
              cursor: "pointer", outline: "none",
              transform: chosenColor === c.id ? "scale(1.12)" : "scale(1)",
              transition: "transform 0.15s",
            }} />
          ))}
        </div>
      </div>

      {/* ── Font ─────────────────────────────────────────── */}
      <div>
        <span style={{ display: "block", fontSize: 9, fontWeight: 900, letterSpacing: "0.15em", textTransform: "uppercase", color: "#9ca3af", marginBottom: 6 }}>Typography Font</span>
        <select value={sharedState.selectedFont} onChange={e => sharedState.setSelectedFont(e.target.value)} onClick={e => e.stopPropagation()} style={{
          width: "100%", padding: "10px", fontFamily: "var(--font-body)", fontSize: 11, fontWeight: 700,
          color: "#111827", background: "#fff", border: "1px solid #e5e7eb", borderRadius: 0,
          outline: "none", cursor: "pointer", textTransform: "uppercase", letterSpacing: "0.04em", appearance: "none",
        }}>
          {Object.keys(APP_FONTS).map(k => <option key={k} value={k}>{APP_FONTS[k].name}</option>)}
        </select>
      </div>

      {/* ── Text ─────────────────────────────────────────── */}
      <div>
        <span style={{ display: "block", fontSize: 9, fontWeight: 900, letterSpacing: "0.15em", textTransform: "uppercase", color: "#9ca3af", marginBottom: 6 }}>Inscription Details</span>
        <textarea rows={2} value={sharedState.text} onChange={e => sharedState.setText(e.target.value)} onClick={e => e.stopPropagation()} style={{
          width: "100%", padding: "10px", fontFamily: "var(--font-mono)", fontSize: 11, fontWeight: 500,
          color: "#111827", background: "#f9fafb", border: "1px solid #e5e7eb", borderRadius: 0,
          outline: "none", resize: "none", textTransform: "uppercase",
          transition: "background 0.15s, border-color 0.15s",
        }}
          onFocus={e => { e.target.style.background = "#fff"; e.target.style.borderColor = "#111827"; }}
          onBlur={e => { e.target.style.background = "#f9fafb"; e.target.style.borderColor = "#e5e7eb"; }} />
      </div>

      {/* ── Upload ───────────────────────────────────────── */}
      <div>
        <span style={{ display: "block", fontSize: 9, fontWeight: 900, letterSpacing: "0.15em", textTransform: "uppercase", color: "#9ca3af", marginBottom: 6 }}>Upload Custom Crest</span>
        <input type="file" accept="image/*" onClick={e => e.stopPropagation()} onChange={e => {
          const f = e.target.files?.[0]; if (f) sharedState.setUploadedImg(URL.createObjectURL(f));
        }} style={{ width: "100%", fontSize: 11, color: "#9ca3af" }} />
      </div>

      {/* ── BUY ──────────────────────────────────────────── */}
      <button onClick={e => { e.stopPropagation(); alert(`Proceeding checkout for ${product.title} (${COLORS.find(c => c.id === chosenColor)?.name})`); }} style={{
        width: "100%", padding: "14px 0", background: "#111827", color: "#fff",
        fontFamily: "var(--font-body)", fontWeight: 900, fontSize: 11, letterSpacing: "0.12em",
        textTransform: "uppercase", border: "none", borderRadius: 0, cursor: "pointer",
        marginTop: "auto", transition: "background 0.15s",
      }}
        onMouseEnter={e => (e.currentTarget.style.background = "#1f2937")}
        onMouseLeave={e => (e.currentTarget.style.background = "#111827")}>
        Buy Now
      </button>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// PAGE
// ═══════════════════════════════════════════════════════════════
export default function SupporterKit() {
  useEffect(() => {
    const link = document.createElement("link");
    link.href = "https://fonts.googleapis.com/css2?family=Inter:wght@800&family=Montserrat:wght@900&family=Playfair+Display:wght@700&family=Satisfy&display=swap";
    link.rel = "stylesheet";
    document.head.appendChild(link);
    return () => { document.head.removeChild(link); };
  }, []);

  const [activeItem, setActiveItem] = useState("tee");
  const [text, setText] = useState("WORLD CUP HACKS\nLOS ANGELES 2026");
  const [uploadedImg, setUploadedImg] = useState<string | null>(null);
  const [selectedFont, setSelectedFont] = useState("athletic");

  const sharedState = { text, setText, uploadedImg, setUploadedImg, selectedFont, setSelectedFont };

  return (
    <div style={{ minHeight: "100vh", background: "#FBFBFB", padding: "64px 16px" }}>
      <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 64, borderBottom: "1px solid #f3f4f6", paddingBottom: 24 }}>
          <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 900, fontSize: "clamp(26px, 4vw, 34px)", color: "#111827", textTransform: "uppercase", marginBottom: 6 }}>The 2026 Supporter Kit</h1>
          <p style={{ fontSize: 11, color: "#9ca3af", letterSpacing: "0.15em", textTransform: "uppercase", fontWeight: 600 }}>Instant Customization · Fulfilled via Printful OEM</p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 32 }}>
          {PRODUCTS.map(p => (
            <ProductCard key={p.id} product={p} isActive={activeItem === p.id}
              onSelect={() => setActiveItem(p.id)} sharedState={sharedState} />
          ))}
        </div>
      </div>
    </div>
  );
}
