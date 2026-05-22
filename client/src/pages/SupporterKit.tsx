import { useState, useRef, useEffect } from "react";

// ═══════════════════════════════════════════════════════════════
// PREMIUM FONT CATALOG
// ═══════════════════════════════════════════════════════════════
const FONT_STYLES: Record<string, { name: string; value: string; weight: string }> = {
  athletic: { name: "Athletic Block",   value: '"Montserrat", "Impact", sans-serif',      weight: "900" },
  serif:    { name: "Vintage Serif",    value: '"Playfair Display", Georgia, serif',       weight: "700" },
  cursive:  { name: "Elegant Cursive",  value: '"Satisfy", "Great Vibes", cursive',        weight: "400" },
  sans:     { name: "Bold Sans",        value: '"Inter", sans-serif',                      weight: "800" },
  mono:     { name: "Classic Typewriter", value: '"Courier New", monospace',                weight: "700" },
};

// ═══════════════════════════════════════════════════════════════
// PRODUCT CATALOG
// ═══════════════════════════════════════════════════════════════
const PRODUCT_CATALOG = {
  tee:  { id: "tee",  title: "Official Tournament Tee (Bella+Canvas 3001)",  price: "$29.99", mockupImg: "/images/white-tee.png", defaultWidth: 240, defaultHeight: 120, initialX: 180, initialY: 210, desc: "Premium heavyweight combed cotton. Vintage unisex tailored fit." },
  tote: { id: "tote", title: "Host City Canvas Tote (Eco-Friendly)",          price: "$19.99", mockupImg: "/images/tote.png",      defaultWidth: 200, defaultHeight: 180, initialX: 200, initialY: 200, desc: "100% certified organic cotton canvas. Sturdy handles for match-day gear." },
  cap:  { id: "cap",  title: "Match-Day Retro Cap (Yupoong 6245CM)",          price: "$24.99", mockupImg: "/images/cap.png",        defaultWidth: 120, defaultHeight: 100, initialX: 230, initialY: 240, desc: "Classic low-profile unstructured dad hat. Enzyme-washed premium twill." },
};

// ═══════════════════════════════════════════════════════════════
// PAGE
// ═══════════════════════════════════════════════════════════════
export default function SupporterKit() {
  // ── Inject Google Fonts ──────────────────────────────────
  useEffect(() => {
    const link = document.createElement("link");
    link.href = "https://fonts.googleapis.com/css2?family=Inter:wght@800&family=Montserrat:wght@900&family=Playfair+Display:ital,wght@0,700;1,700&family=Satisfy&display=swap";
    link.rel = "stylesheet";
    document.head.appendChild(link);
    return () => { document.head.removeChild(link); };
  }, []);

  const [activeItemId, setActiveItemId] = useState("tee");
  const currentProduct = PRODUCT_CATALOG[activeItemId as keyof typeof PRODUCT_CATALOG];

  const [text, setText] = useState("WORLD CUP HACKS\nLOS ANGELES 2026");
  const [uploadedImg, setUploadedImg] = useState<string | null>(null);
  const [selectedFontKey, setSelectedFontKey] = useState("athletic");
  const [activeColor, setActiveColor] = useState("white");

  const [position, setPosition] = useState({ x: 160, y: 180 });
  const [dimensions, setDimensions] = useState({ width: 280, height: 140 });
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);

  const dragStart = useRef({ x: 0, y: 0 });
  const resizeStart = useRef({ width: 0, height: 0, mouseX: 0, mouseY: 0 });

  useEffect(() => {
    setPosition({ x: currentProduct.initialX, y: currentProduct.initialY });
    setDimensions({ width: currentProduct.defaultWidth, height: currentProduct.defaultHeight });
  }, [activeItemId]);

  const handleMouseDown = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).classList.contains("resize-handle-dot")) return;
    setIsDragging(true);
    dragStart.current = { x: e.clientX - position.x, y: e.clientY - position.y };
  };

  const handleResizeMouseDown = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsResizing(true);
    resizeStart.current = { width: dimensions.width, height: dimensions.height, mouseX: e.clientX, mouseY: e.clientY };
  };

  useEffect(() => {
    const mm = (e: MouseEvent) => {
      if (isDragging) setPosition({ x: e.clientX - dragStart.current.x, y: e.clientY - dragStart.current.y });
      if (isResizing) setDimensions({
        width: Math.max(90, resizeStart.current.width + (e.clientX - resizeStart.current.mouseX)),
        height: Math.max(45, resizeStart.current.height + (e.clientY - resizeStart.current.mouseY)),
      });
    };
    const mu = () => { setIsDragging(false); setIsResizing(false); };
    if (isDragging || isResizing) { window.addEventListener("mousemove", mm); window.addEventListener("mouseup", mu); }
    return () => { window.removeEventListener("mousemove", mm); window.removeEventListener("mouseup", mu); };
  }, [isDragging, isResizing]);

  const activeFont = FONT_STYLES[selectedFontKey];

  return (
    <div style={{ minHeight: "100vh", background: "#F9F9F9", padding: "64px 16px" }}>
      <div style={{ maxWidth: "1152px", margin: "0 auto" }}>
        <div style={{ display: "flex", flexWrap: "wrap", background: "#fff", border: "1px solid #f3f4f6" }}>

          {/* ═══ LEFT: LOOKBOOK STUDIO CANVAS — 7 cols ═══════ */}
          <div style={{
            flex: "7 1 0", minWidth: 360, height: 620, background: "#F3F3F3",
            display: "flex", alignItems: "center", justifyContent: "center",
            padding: 24, borderRight: "1px solid #f3f4f6", userSelect: "none",
          }}>
            <div style={{ position: "relative", width: "100%", height: "100%", maxWidth: 448, maxHeight: 448, display: "flex", alignItems: "center", justifyContent: "center" }}>
              {/* Garment mockup */}
              <img src={currentProduct.mockupImg} alt={currentProduct.title}
                style={{ width: "100%", height: "100%", objectFit: "contain", pointerEvents: "none", transition: "all 0.3s" }}
                onError={e => { (e.target as HTMLImageElement).src = "/images/banner.png"; }} />

              {/* ═══ DRAGGABLE + RESIZABLE PRINT LAYER ═══════ */}
              <div style={{
                position: "absolute", left: position.x, top: position.y,
                width: dimensions.width, height: dimensions.height,
                border: "1px dashed #9ca3af", cursor: "move",
                display: "flex", flexDirection: "column",
                alignItems: "center", justifyContent: "center",
                textAlign: "center", padding: 4, transition: "border-color 0.15s",
              }}
                onMouseDown={handleMouseDown}
                onMouseEnter={e => (e.currentTarget.style.borderColor = "#111827")}
                onMouseLeave={e => (e.currentTarget.style.borderColor = "#9ca3af")}
              >
                {/* Ghost-ink uploaded graphic */}
                {uploadedImg && (
                  <img src={uploadedImg} alt="Custom"
                    style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "contain", pointerEvents: "none", mixBlendMode: "multiply", opacity: 0.72 }} />
                )}

                {/* Live typography render */}
                <p style={{
                  width: "100%", fontFamily: activeFont.value, fontWeight: activeFont.weight as any,
                  fontSize: dimensions.height * 0.16, color: "#111827",
                  whiteSpace: "pre-line", letterSpacing: "-0.01em", lineHeight: 1.05,
                  mixBlendMode: "multiply", opacity: 0.85, pointerEvents: "none",
                  textTransform: "uppercase", margin: 0,
                }}>{text}</p>

                {/* Anchor dots */}
                {[
                  { top: -4, left: -4 }, { top: -4, right: -4 }, { bottom: -4, left: -4 },
                ].map((pos, i) => (
                  <div key={i} style={{
                    position: "absolute", ...pos,
                    width: 8, height: 8, background: "#1f2937", borderRadius: "50%",
                    opacity: 0, transition: "opacity 0.15s",
                  }} className="anchor-dot" />
                ))}

                {/* Resize handle */}
                <div className="resize-handle-dot"
                  onMouseDown={handleResizeMouseDown}
                  style={{
                    position: "absolute", bottom: -5, right: -5,
                    width: 11, height: 11, background: "#111827",
                    border: "2px solid #fff", cursor: "se-resize",
                    zIndex: 50, transition: "transform 0.15s",
                  }}
                  onMouseEnter={e => (e.currentTarget.style.transform = "scale(1.25)")}
                  onMouseLeave={e => (e.currentTarget.style.transform = "scale(1)")}
                />
              </div>
            </div>
          </div>

          {/* ═══ RIGHT: PREMIUM CONTROL PANEL — 5 cols ═══════ */}
          <div style={{
            flex: "5 1 0", minWidth: 300, display: "flex", flexDirection: "column",
            padding: 40, background: "#fff", justifyContent: "space-between", minHeight: 620,
          }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>

              {/* ── Tab Selectors ─────────────────────────── */}
              <div>
                <span style={{ display: "block", fontSize: 10, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "#9ca3af", marginBottom: 10 }}>Select Base Garment</span>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 8 }}>
                  {Object.values(PRODUCT_CATALOG).map(item => {
                    const active = activeItemId === item.id;
                    return (
                      <button key={item.id} onClick={() => setActiveItemId(item.id)} style={{
                        padding: "12px 8px", border: active ? "1px solid #111827" : "1px solid #e5e7eb",
                        background: active ? "#111827" : "#fff",
                        color: active ? "#fff" : "#4b5563",
                        fontWeight: active ? 700 : 500, fontFamily: "var(--font-body)",
                        fontSize: 11, textTransform: "uppercase", letterSpacing: "0.04em",
                        cursor: "pointer", textAlign: "center", transition: "all 0.15s",
                      }}>
                        {item.id === "tee" ? "T-Shirt" : item.id === "tote" ? "Tote Bag" : "Cap"}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* ── Product Info ──────────────────────────── */}
              <div style={{ borderBottom: "1px solid #f3f4f6", paddingBottom: 16 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                  <h2 style={{ fontFamily: "var(--font-body)", fontWeight: 700, fontSize: 18, color: "#111827", textTransform: "uppercase", letterSpacing: "-0.01em", marginBottom: 4 }}>{currentProduct.title}</h2>
                  <span style={{ fontFamily: "var(--font-mono)", fontWeight: 700, fontSize: 15, color: "#111827" }}>{currentProduct.price}</span>
                </div>
                <p style={{ fontSize: 12, color: "#9ca3af", fontWeight: 500, lineHeight: 1.5, margin: 0 }}>{currentProduct.desc}</p>
              </div>

              {/* ── Colorway ──────────────────────────────── */}
              <div>
                <span style={{ display: "block", fontSize: 10, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "#9ca3af", marginBottom: 8 }}>Colorway</span>
                <div style={{ display: "flex", gap: 8 }}>
                  {["white", "black", "sand"].map(color => (
                    <button key={color} onClick={() => setActiveColor(color)} style={{
                      width: 22, height: 22, borderRadius: "50%",
                      border: activeColor === color ? "2px solid #111827" : "1px solid #d1d5db",
                      background: color === "white" ? "#fff" : color === "black" ? "#111827" : "#EAE1D4",
                      cursor: "pointer", outline: "none",
                      transform: activeColor === color ? "scale(1.15)" : "scale(1)",
                      transition: "transform 0.15s",
                    }} />
                  ))}
                </div>
              </div>

              {/* ── Font Selector ─────────────────────────── */}
              <div>
                <span style={{ display: "block", fontSize: 10, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "#9ca3af", marginBottom: 8 }}>Select Font Style</span>
                <div style={{ position: "relative" }}>
                  <select value={selectedFontKey} onChange={e => setSelectedFontKey(e.target.value)} style={{
                    width: "100%", padding: "12px", fontFamily: "var(--font-body)", fontSize: 12, fontWeight: 600,
                    color: "#111827", background: "#fff", border: "1px solid #e5e7eb", borderRadius: 0,
                    outline: "none", cursor: "pointer", textTransform: "uppercase", letterSpacing: "0.04em",
                    appearance: "none",
                  }}>
                    {Object.keys(FONT_STYLES).map(key => <option key={key} value={key}>{FONT_STYLES[key].name}</option>)}
                  </select>
                  <svg style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", pointerEvents: "none", width: 16, height: 16, fill: "#6b7280" }} viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                </div>
              </div>

              {/* ── Custom Text ───────────────────────────── */}
              <div>
                <span style={{ display: "block", fontSize: 10, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "#9ca3af", marginBottom: 8 }}>Custom Inscription Details</span>
                <textarea rows={2} value={text} onChange={e => setText(e.target.value)}
                  placeholder={"LINE 1: CUSTOM TEXT\nLINE 2: NUMBER OR YEAR"}
                  style={{
                    width: "100%", padding: "12px", fontFamily: "var(--font-mono)", fontSize: 11, fontWeight: 500,
                    letterSpacing: "0.04em", color: "#111827", background: "#f9fafb",
                    border: "1px solid #e5e7eb", borderRadius: 0, outline: "none", resize: "none",
                    textTransform: "uppercase", transition: "background 0.15s, border-color 0.15s",
                  }}
                  onFocus={e => { e.target.style.background = "#fff"; e.target.style.borderColor = "#111827"; }}
                  onBlur={e => { e.target.style.background = "#f9fafb"; e.target.style.borderColor = "#e5e7eb"; }}
                />
              </div>

              {/* ── Image Upload ──────────────────────────── */}
              <div>
                <span style={{ display: "block", fontSize: 10, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "#9ca3af", marginBottom: 8 }}>Upload Custom Vector Graphic</span>
                <label style={{ display: "flex", border: "1px solid #e5e7eb", cursor: "pointer", transition: "all 0.15s" }}>
                  <span style={{ background: "#fff", color: "#111827", padding: "10px 14px", fontSize: 10, fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", borderRight: "1px solid #e5e7eb" }}>CHOOSE FILE</span>
                  <span style={{ padding: "10px 12px", fontSize: 11, color: "#9ca3af", display: "flex", alignItems: "center" }}>{uploadedImg ? "Image loaded ✓" : "No file chosen"}</span>
                  <input type="file" accept="image/*" hidden onChange={e => {
                    const file = e.target.files?.[0];
                    if (file) setUploadedImg(URL.createObjectURL(file));
                  }} />
                </label>
              </div>
            </div>

            {/* ── Checkout ─────────────────────────────────── */}
            <div style={{ marginTop: 32 }}>
              <button style={{
                width: "100%", padding: "16px 0", background: "#111827", color: "#fff",
                fontFamily: "var(--font-body)", fontWeight: 700, fontSize: 12,
                letterSpacing: "0.12em", textTransform: "uppercase",
                border: "none", borderRadius: 0, cursor: "pointer", transition: "background 0.15s",
              }}
                onMouseEnter={e => (e.currentTarget.style.background = "#1f2937")}
                onMouseLeave={e => (e.currentTarget.style.background = "#111827")}>
                Proceed To Checkout Securely
              </button>
              <div style={{ display: "flex", justifyContent: "space-between", borderTop: "1px solid #f3f4f6", paddingTop: 16, marginTop: 12, fontSize: 9, color: "#9ca3af", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em" }}>
                <span>📦 Free shipping over $50</span>
                <span>🌱 Printed on demand</span>
                <span>🇺🇸 Made in USA</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
