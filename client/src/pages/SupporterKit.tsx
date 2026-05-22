import { useState, useRef, useEffect } from "react";

// ═══════════════════════════════════════════════════════════════
// FONT CATALOG — 5 Premium Styles
// ═══════════════════════════════════════════════════════════════
const FONTS = [
  { value: "Impact, sans-serif",                     label: "Athletic Block (Bold Retro)" },
  { value: "'Playfair Display', serif",              label: "Vintage Serif (Luxury)" },
  { value: "'Great Vibes', cursive",                 label: "Elegant Cursive (Chic)" },
  { value: "'Inter', sans-serif",                    label: "Bold Sans (Modern)" },
  { value: "Courier New, monospace",                 label: "Classic Typewriter (Raw)" },
];

// ═══════════════════════════════════════════════════════════════
// INTERACTIVE CUSTOMIZER
// ═══════════════════════════════════════════════════════════════
function InteractiveCustomizer() {
  const [text, setText] = useState("WORLD CUP HACKS\nLOS ANGELES 2026");
  const [uploadedImg, setUploadedImg] = useState<string | null>(null);
  const [fontFamily, setFontFamily] = useState("Impact, sans-serif");
  const [position, setPosition] = useState({ x: 180, y: 220 });
  const [dimensions, setDimensions] = useState({ width: 340, height: 160 });
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const dragStart = useRef({ x: 0, y: 0 });
  const resizeStart = useRef({ width: 0, height: 0, mouseX: 0, mouseY: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  // ── Drag ─────────────────────────────────────────────────
  const handleMouseDown = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).classList.contains("resize-handle")) return;
    setIsDragging(true);
    dragStart.current = { x: e.clientX - position.x, y: e.clientY - position.y };
  };

  // ── Resize ───────────────────────────────────────────────
  const handleResizeMouseDown = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsResizing(true);
    resizeStart.current = {
      width: dimensions.width, height: dimensions.height,
      mouseX: e.clientX, mouseY: e.clientY,
    };
  };

  // ── Global move/up listeners ─────────────────────────────
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        setPosition({ x: e.clientX - dragStart.current.x, y: e.clientY - dragStart.current.y });
      }
      if (isResizing) {
        setDimensions({
          width: Math.max(100, resizeStart.current.width + (e.clientX - resizeStart.current.mouseX)),
          height: Math.max(60, resizeStart.current.height + (e.clientY - resizeStart.current.mouseY)),
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
  }, [isDragging, isResizing, dimensions, position]);

  const handleBuy = () => {
    alert("Custom supporter item added to cart. Stripe Checkout is initializing securely…");
  };

  return (
    <div style={{ display: "flex", gap: 32, flexWrap: "wrap", background: "#fff", maxWidth: "100%" }}>
      {/* ═══ LEFT: MOCKUP CANVAS ═══════════════════════════════ */}
      <div ref={containerRef} style={{
        flex: "1 1 600px", minWidth: 340,
        height: 550, background: "#f9fafb",
        border: "1px solid #e5e7eb", position: "relative",
        display: "flex", alignItems: "center", justifyContent: "center",
        overflow: "hidden",
      }}>
        {/* Base tee image */}
        <img
          src="/images/white-tee.png"
          alt="Premium White Classic T-Shirt"
          style={{
            position: "absolute", inset: 0, width: "100%", height: "100%",
            objectFit: "contain", pointerEvents: "none",
          }}
          onError={e => { (e.target as HTMLImageElement).src = "/images/banner.png"; }}
        />

        {/* ═══ DRAGGABLE + RESIZABLE PRINT LAYER ═════════════ */}
        <div
          style={{
            position: "absolute",
            left: position.x, top: position.y,
            width: dimensions.width, height: dimensions.height,
            border: "1px dashed #9ca3af", cursor: "move",
            display: "flex", flexDirection: "column",
            alignItems: "center", justifyContent: "center",
            textAlign: "center", padding: 4, userSelect: "none",
          }}
          onMouseDown={handleMouseDown}
        >
          {/* Uploaded graphic — ghost ink screen-print */}
          {uploadedImg && (
            <img src={uploadedImg} alt="Custom"
              style={{
                position: "absolute", inset: 0, width: "100%", height: "100%",
                objectFit: "contain", pointerEvents: "none",
                mixBlendMode: "multiply", opacity: 0.75,
              }} />
          )}

          {/* Multiline text — screen-printed */}
          <p style={{
            width: "100%", fontFamily, fontWeight: 900,
            fontSize: dimensions.height * 0.2,
            color: "#111827", whiteSpace: "pre-line",
            letterSpacing: "0.02em", lineHeight: 1.1,
            mixBlendMode: "multiply", opacity: 0.8,
            pointerEvents: "none", margin: 0, padding: 0,
          }}>
            {text}
          </p>

          {/* Anchor dots */}
          <div style={{ position: "absolute", top: -6, left: -6, width: 12, height: 12, background: "#374151", borderRadius: "50%", opacity: 0.7 }} />
          <div style={{ position: "absolute", top: -6, right: -6, width: 12, height: 12, background: "#374151", borderRadius: "50%", opacity: 0.7 }} />
          <div style={{ position: "absolute", bottom: -6, left: -6, width: 12, height: 12, background: "#374151", borderRadius: "50%", opacity: 0.7 }} />

          {/* Resize handle */}
          <div className="resize-handle"
            onMouseDown={handleResizeMouseDown}
            style={{
              position: "absolute", bottom: -6, right: -6,
              width: 14, height: 14, background: "#111827",
              border: "2px solid #fff", cursor: "se-resize", zIndex: 50,
            }} />
        </div>
      </div>

      {/* ═══ RIGHT: CONTROL PANEL ══════════════════════════════ */}
      <div style={{
        flex: "0 0 340px", display: "flex", flexDirection: "column", gap: 24,
        padding: 24, border: "1px solid #e5e7eb",
      }}>
        {/* Font selector */}
        <div>
          <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "#374151", marginBottom: 8 }}>Select Font Style</div>
          <select
            value={fontFamily}
            onChange={e => setFontFamily(e.target.value)}
            style={{ width: "100%", padding: "12px", fontFamily: "var(--font-body)", fontSize: 13, fontWeight: 500, color: "#111827", background: "#fff", border: "1px solid #d1d5db", borderRadius: 0, outline: "none", cursor: "pointer" }}
          >
            {FONTS.map(f => <option key={f.value} value={f.value}>{f.label}</option>)}
          </select>
        </div>

        {/* Text input */}
        <div>
          <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "#374151", marginBottom: 8 }}>Custom Text & Layout</div>
          <textarea
            rows={3}
            value={text}
            onChange={e => setText(e.target.value)}
            placeholder="Type custom lines here... (Press Enter for next line)"
            style={{ width: "100%", padding: "12px", fontFamily: "var(--font-body)", fontSize: 13, color: "#111827", background: "#fff", border: "1px solid #d1d5db", borderRadius: 0, outline: "none", resize: "none" }}
            onFocus={e => (e.target.style.borderColor = "#111827")}
            onBlur={e => (e.target.style.borderColor = "#d1d5db")}
          />
        </div>

        {/* Image upload */}
        <div>
          <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "#374151", marginBottom: 8 }}>Upload Branding Image</div>
          <label style={{
            display: "flex", alignItems: "center", gap: 16,
            fontFamily: "var(--font-body)", fontSize: 13, color: "var(--text-secondary)",
            background: "#fff", border: "1px solid #d1d5db", padding: 0, cursor: "pointer",
          }}>
            <span style={{
              background: "#111827", color: "#fff", padding: "10px 16px",
              fontSize: 11, fontWeight: 700, letterSpacing: "0.04em",
            }}>CHOOSE FILE</span>
            <span style={{ fontSize: 12 }}>{uploadedImg ? "Image loaded ✓" : "No file chosen"}</span>
            <input type="file" accept="image/*" hidden
              onChange={e => {
                const file = e.target.files?.[0];
                if (file) setUploadedImg(URL.createObjectURL(file));
              }} />
          </label>
        </div>

        {/* Buy button */}
        <button onClick={handleBuy} style={{
          width: "100%", padding: "16px 0", background: "#111827", color: "#fff",
          fontFamily: "var(--font-body)", fontWeight: 700, fontSize: 13,
          letterSpacing: "0.1em", textTransform: "uppercase",
          border: "none", borderRadius: 0, cursor: "pointer", marginTop: "auto",
          transition: "background 0.15s",
        }}
          onMouseEnter={e => (e.currentTarget.style.background = "#1f2937")}
          onMouseLeave={e => (e.currentTarget.style.background = "#111827")}
        >
          Buy Now Securely
        </button>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// PAGE
// ═══════════════════════════════════════════════════════════════
export default function SupporterKit() {
  return (
    <div style={{ maxWidth: 1100, margin: "0 auto", padding: "24px 20px 40px", background: "#fff" }}>
      <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 900, fontSize: "clamp(28px, 5vw, 38px)", textAlign: "center", marginBottom: 4 }}>THE SUPPORTER KIT</h1>
      <p style={{ fontSize: 14, color: "var(--text-secondary)", textAlign: "center", marginBottom: 32 }}>Customize. Print. Wear. One design. Infinite styles.</p>

      <InteractiveCustomizer />

      <div style={{ border: "1px solid var(--border)", padding: "14px 20px", display: "flex", justifyContent: "center", gap: 32, flexWrap: "wrap", background: "var(--bg-secondary)", marginTop: 32 }}>
        {["🚚 Free shipping over $50", "🌱 Printed on demand · Zero waste", "🇺🇸 Made in the USA"].map(t => (
          <span key={t} style={{ fontSize: 12, color: "var(--text-secondary)", fontWeight: 500 }}>{t}</span>
        ))}
      </div>
    </div>
  );
}
