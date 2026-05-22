import { useState, useRef, useEffect } from "react";

// ═══════════════════════════════════════════════════════════════
// PRODUCT CATALOG — 3 Core Items
// ═══════════════════════════════════════════════════════════════
const PRODUCT_CATALOG = {
  tee: {
    id: "tee", title: "Official Tournament Tee", price: "$29.99",
    mockupImg: "/images/white-tee.png",
    defaultWidth: 260, defaultHeight: 120, initialX: 180, initialY: 200,
    desc: "Premium heavyweight organic cotton. Vintage boxy fit.",
  },
  tote: {
    id: "tote", title: "Host City Canvas Tote", price: "$19.99",
    mockupImg: "/images/tote.png",
    defaultWidth: 220, defaultHeight: 120, initialX: 190, initialY: 260,
    desc: "12oz ultra-durable natural canvas. Perfect for match-day gear.",
  },
  cap: {
    id: "cap", title: "Match-Day Washed Cap", price: "$24.99",
    mockupImg: "/images/cap.png",
    defaultWidth: 140, defaultHeight: 60, initialX: 240, initialY: 210,
    desc: "Enzyme-washed cotton twill. Adjustable classic brass buckle.",
  },
};

// ═══════════════════════════════════════════════════════════════
// COMPLETE PREMIUM CUSTOMIZER
// ═══════════════════════════════════════════════════════════════
export default function SupporterKit() {
  // Active product state
  const [activeItemId, setActiveItemId] = useState("tee");
  const currentProduct = PRODUCT_CATALOG[activeItemId as keyof typeof PRODUCT_CATALOG];

  // Customization states
  const [text, setText] = useState("WORLD CUP HACKS\nLOS ANGELES 2026");
  const [uploadedImg, setUploadedImg] = useState<string | null>(null);
  const [fontFamily, setFontFamily] = useState("Impact, sans-serif");
  const [activeColor, setActiveColor] = useState("white");

  // Canvas transform states
  const [position, setPosition] = useState({ x: 180, y: 200 });
  const [dimensions, setDimensions] = useState({ width: 260, height: 120 });
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);

  const dragStart = useRef({ x: 0, y: 0 });
  const resizeStart = useRef({ width: 0, height: 0, mouseX: 0, mouseY: 0 });

  // Reset bounding box when switching products
  useEffect(() => {
    setPosition({ x: currentProduct.initialX, y: currentProduct.initialY });
    setDimensions({ width: currentProduct.defaultWidth, height: currentProduct.defaultHeight });
  }, [activeItemId]);

  // ── Drag ─────────────────────────────────────────────────
  const handleMouseDown = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).classList.contains("resize-trigger")) return;
    setIsDragging(true);
    dragStart.current = { x: e.clientX - position.x, y: e.clientY - position.y };
  };

  // ── Resize ───────────────────────────────────────────────
  const handleResizeMouseDown = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsResizing(true);
    resizeStart.current = { width: dimensions.width, height: dimensions.height, mouseX: e.clientX, mouseY: e.clientY };
  };

  // ── Global listeners ─────────────────────────────────────
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) { setPosition({ x: e.clientX - dragStart.current.x, y: e.clientY - dragStart.current.y }); }
      if (isResizing) {
        setDimensions({
          width: Math.max(80, resizeStart.current.width + (e.clientX - resizeStart.current.mouseX)),
          height: Math.max(40, resizeStart.current.height + (e.clientY - resizeStart.current.mouseY)),
        });
      }
    };
    const handleMouseUp = () => { setIsDragging(false); setIsResizing(false); };
    if (isDragging || isResizing) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
    }
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging, isResizing]);

  return (
    <div style={{ minHeight: "100vh", background: "#f9fafb", padding: "48px 16px", fontFamily: "var(--font-body)" }}>
      <div style={{ maxWidth: "1280px", margin: "0 auto" }}>

        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 900, fontSize: "clamp(28px, 5vw, 38px)", color: "#111827", textTransform: "uppercase", marginBottom: 8 }}>The Supporter Kit</h1>
          <p style={{ fontSize: 13, color: "#6b7280", letterSpacing: "0.08em", textTransform: "uppercase" }}>Customize. Print. Wear. One design, infinite styles.</p>
        </div>

        {/* ═══ LAYOUT: CANVAS (LEFT) + CONTROLS (RIGHT) ═══ */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))", gap: 32, alignItems: "start" }}>

          {/* ═══ LEFT: DYNAMIC STUDIO CANVAS ═══════════════════ */}
          <div style={{
            background: "#fff", border: "1px solid #e5e7eb", position: "relative",
            display: "flex", alignItems: "center", justifyContent: "center",
            height: 600, overflow: "hidden", minWidth: 340,
          }}>
            {/* Mockup image */}
            <img src={currentProduct.mockupImg} alt={currentProduct.title}
              style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "contain", pointerEvents: "none", padding: 24 }}
              onError={e => { (e.target as HTMLImageElement).src = "/images/banner.png"; }} />

            {/* ═══ DRAGGABLE + RESIZABLE PRINT ZONE ══════════ */}
            <div
              style={{
                position: "absolute",
                left: position.x, top: position.y,
                width: dimensions.width, height: dimensions.height,
                border: "2px dashed #9ca3af", cursor: "move",
                display: "flex", flexDirection: "column",
                alignItems: "center", justifyContent: "center",
                textAlign: "center", padding: 4, userSelect: "none",
              }}
              onMouseDown={handleMouseDown}
            >
              {/* Uploaded graphic — screen-print ghost ink */}
              {uploadedImg && (
                <img src={uploadedImg} alt="Custom"
                  style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "contain", pointerEvents: "none", mixBlendMode: "multiply", opacity: 0.75 }} />
              )}

              {/* Multiline text — screen-printed */}
              <p style={{
                width: "100%", fontFamily, fontWeight: 700,
                fontSize: dimensions.height * 0.18, color: "#111827",
                whiteSpace: "pre-line", letterSpacing: "0.02em", lineHeight: 1.1,
                mixBlendMode: "multiply", opacity: 0.82, pointerEvents: "none",
                textTransform: "uppercase",
              }}>{text}</p>

              {/* Anchor corners */}
              <div style={{ position: "absolute", top: -5, left: -5, width: 10, height: 10, background: "#1f2937", borderRadius: "50%", opacity: 0.8 }} />
              <div style={{ position: "absolute", top: -5, right: -5, width: 10, height: 10, background: "#1f2937", borderRadius: "50%", opacity: 0.8 }} />
              <div style={{ position: "absolute", bottom: -5, left: -5, width: 10, height: 10, background: "#1f2937", borderRadius: "50%", opacity: 0.8 }} />

              {/* Resize trigger */}
              <div className="resize-trigger"
                onMouseDown={handleResizeMouseDown}
                style={{ position: "absolute", bottom: -7, right: -7, width: 14, height: 14, background: "#111827", border: "2px solid #fff", cursor: "se-resize", zIndex: 50 }} />
            </div>
          </div>

          {/* ═══ RIGHT: CONTROL PANEL ══════════════════════════ */}
          <div style={{ display: "flex", flexDirection: "column", gap: 20, background: "#fff", padding: 24, border: "1px solid #e5e7eb", minWidth: 300 }}>
            {/* ── Product Selector Tabs ────────────────────── */}
            <div>
              <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "#9ca3af", marginBottom: 10 }}>Select Base Garment</div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 8 }}>
                {Object.values(PRODUCT_CATALOG).map(item => {
                  const active = activeItemId === item.id;
                  return (
                    <button key={item.id} onClick={() => setActiveItemId(item.id)}
                      style={{ padding: "12px 8px", border: active ? "1px solid #111827" : "1px solid #e5e7eb", background: active ? "#f9fafb" : "#fff", cursor: "pointer", textAlign: "left" }}>
                      <div style={{ fontFamily: "var(--font-body)", fontWeight: 700, fontSize: 11, textTransform: "uppercase", color: "#111827", marginBottom: 2 }}>
                        {item.id === "tee" ? "T-Shirt" : item.id === "tote" ? "Tote" : "Cap"}
                      </div>
                      <div style={{ fontSize: 11, color: "#6b7280", fontWeight: 500 }}>{item.price}</div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* ── Product Info ─────────────────────────────── */}
            <div style={{ borderBottom: "1px solid #f3f4f6", paddingBottom: 16 }}>
              <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 20, color: "#111827", textTransform: "uppercase", marginBottom: 4 }}>{currentProduct.title}</h2>
              <p style={{ fontSize: 13, color: "#6b7280" }}>{currentProduct.desc}</p>
            </div>

            {/* ── Colorway ──────────────────────────────────── */}
            <div>
              <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "#9ca3af", marginBottom: 8 }}>Colorway</div>
              <div style={{ display: "flex", gap: 8 }}>
                {["white", "black", "sand"].map(color => (
                  <button key={color} onClick={() => setActiveColor(color)}
                    style={{ width: 28, height: 28, borderRadius: "50%", border: activeColor === color ? "3px solid #111827" : "1px solid #d1d5db", background: color === "white" ? "#fff" : color === "black" ? "#111827" : "#D4C5A9", cursor: "pointer", outline: "none", transform: activeColor === color ? "scale(1.15)" : "scale(1)" }} />
                ))}
              </div>
            </div>

            {/* ── Font Selector ─────────────────────────────── */}
            <div>
              <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "#9ca3af", marginBottom: 8 }}>Select Font Style</div>
              <select value={fontFamily} onChange={e => setFontFamily(e.target.value)}
                style={{ width: "100%", padding: "12px", fontFamily: "var(--font-body)", fontSize: 13, fontWeight: 500, color: "#111827", background: "#fff", border: "1px solid #d1d5db", borderRadius: 0, outline: "none", cursor: "pointer", appearance: "none" }}>
                <option value="Impact, sans-serif">Athletic Block (Retro Squad)</option>
                <option value="'Playfair Display', serif">Vintage Serif (Luxury Editorial)</option>
                <option value="'Great Vibes', cursive">Elegant Cursive (Chic Custom)</option>
                <option value="'Inter', sans-serif">Bold Sans (Modern Tactical)</option>
                <option value="Courier New, monospace">Classic Typewriter (Industrial Raw)</option>
              </select>
            </div>

            {/* ── Custom Text ───────────────────────────────── */}
            <div>
              <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "#9ca3af", marginBottom: 8 }}>Custom Inscription Details</div>
              <textarea rows={3} value={text} onChange={e => setText(e.target.value)}
                placeholder={"LINE 1: NAME\nLINE 2: NUMBER / YEAR"}
                style={{ width: "100%", padding: "12px", fontFamily: "var(--font-mono)", fontSize: 12, fontWeight: 500, letterSpacing: "0.04em", color: "#111827", background: "#fff", border: "1px solid #d1d5db", borderRadius: 0, outline: "none", resize: "none" }}
                onFocus={e => (e.target.style.borderColor = "#111827")}
                onBlur={e => (e.target.style.borderColor = "#d1d5db")} />
            </div>

            {/* ── Image Upload ──────────────────────────────── */}
            <div>
              <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "#9ca3af", marginBottom: 8 }}>Upload Custom Vector Graphic</div>
              <label style={{ display: "flex", border: "1px solid #d1d5db", cursor: "pointer" }}>
                <span style={{ background: "#111827", color: "#fff", padding: "10px 16px", fontSize: 11, fontWeight: 700, letterSpacing: "0.04em" }}>CHOOSE FILE</span>
                <span style={{ padding: "10px 12px", fontSize: 12, color: "#6b7280", display: "flex", alignItems: "center" }}>{uploadedImg ? "Image loaded ✓" : "No file chosen"}</span>
                <input type="file" accept="image/*" hidden onChange={e => {
                  const file = e.target.files?.[0];
                  if (file) setUploadedImg(URL.createObjectURL(file));
                }} />
              </label>
            </div>

            {/* ── Checkout ──────────────────────────────────── */}
            <button style={{ width: "100%", padding: "16px 0", background: "#111827", color: "#fff", fontFamily: "var(--font-body)", fontWeight: 700, fontSize: 13, letterSpacing: "0.1em", textTransform: "uppercase", border: "none", borderRadius: 0, cursor: "pointer", marginTop: 8 }}
              onMouseEnter={e => (e.currentTarget.style.background = "#1f2937")}
              onMouseLeave={e => (e.currentTarget.style.background = "#111827")}
            >
              Proceed To Checkout Securely
            </button>

            {/* Badges */}
            <div style={{ display: "flex", justifyContent: "space-between", borderTop: "1px solid #f3f4f6", paddingTop: 16, fontSize: 10, color: "#9ca3af", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em" }}>
              <span>📦 Free shipping over $50</span>
              <span>🌱 Printed on demand</span>
              <span>🇺🇸 Made in USA</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
