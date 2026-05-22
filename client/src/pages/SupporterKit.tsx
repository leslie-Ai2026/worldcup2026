import { useState, useRef, useEffect } from "react";

// ═══════════════════════════════════════════════════════════════
// PRINT ZONES — 3 core items
// ═══════════════════════════════════════════════════════════════
const PRINT_ZONES = {
  tee:  { id: "tee",  defaultWidth: 260, defaultHeight: 120, initialX: 180, initialY: 200 },
  tote: { id: "tote", defaultWidth: 220, defaultHeight: 120, initialX: 190, initialY: 260 },
  cap:  { id: "cap",  defaultWidth: 140, defaultHeight: 60,  initialX: 240, initialY: 210 },
};

const PRODUCTS = [
  { id: "tee",  title: "Official Tournament Tee",  price: "$29.99", mockup: "/images/white-tee.png" },
  { id: "tote", title: "Host City Canvas Tote",     price: "$19.99", mockup: "/images/tote.png" },
  { id: "cap",  title: "Match-Day Washed Cap",       price: "$24.99", mockup: "/images/washed-cap.png" },
];

// ═══════════════════════════════════════════════════════════════
// PRODUCT CARD — scoped canvas + controls
// ═══════════════════════════════════════════════════════════════
function ProductCard({
  itemConfig, isActive, onSelect, mockupImg, title, price,
  text, setText, uploadedImg, setUploadedImg, fontFamily,
}: {
  itemConfig: typeof PRINT_ZONES.tee; isActive: boolean; onSelect: () => void;
  mockupImg: string; title: string; price: string;
  text: string; setText: (v: string) => void;
  uploadedImg: string | null; setUploadedImg: (v: string | null) => void;
  fontFamily: string;
}) {
  const [position, setPosition] = useState({ x: itemConfig.initialX, y: itemConfig.initialY });
  const [dimensions, setDimensions] = useState({ width: itemConfig.defaultWidth, height: itemConfig.defaultHeight });
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const dragStart = useRef({ x: 0, y: 0 });
  const resizeStart = useRef({ width: 0, height: 0, mouseX: 0, mouseY: 0 });

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!isActive || (e.target as HTMLElement).classList.contains("resize-trigger")) return;
    setIsDragging(true);
    dragStart.current = { x: e.clientX - position.x, y: e.clientY - position.y };
  };

  const handleResizeMouseDown = (e: React.MouseEvent) => {
    if (!isActive) return;
    e.stopPropagation();
    setIsResizing(true);
    resizeStart.current = { width: dimensions.width, height: dimensions.height, mouseX: e.clientX, mouseY: e.clientY };
  };

  useEffect(() => {
    const mm = (e: MouseEvent) => {
      if (isDragging) setPosition({ x: e.clientX - dragStart.current.x, y: e.clientY - dragStart.current.y });
      if (isResizing) setDimensions({
        width: Math.max(80, resizeStart.current.width + (e.clientX - resizeStart.current.mouseX)),
        height: Math.max(40, resizeStart.current.height + (e.clientY - resizeStart.current.mouseY)),
      });
    };
    const mu = () => { setIsDragging(false); setIsResizing(false); };
    if (isDragging || isResizing) { window.addEventListener("mousemove", mm); window.addEventListener("mouseup", mu); }
    return () => { window.removeEventListener("mousemove", mm); window.removeEventListener("mouseup", mu); };
  }, [isDragging, isResizing]);

  return (
    <div onClick={onSelect} style={{
      background: "#fff", padding: 24, border: isActive ? "2px solid #111827" : "1px solid #e5e7eb",
      display: "flex", flexDirection: "column", gap: 20, cursor: "pointer",
      transition: "all 0.25s", transform: isActive ? "scale(1.01)" : "scale(1)",
    }}>
      {/* ── Canvas ──────────────────────────────────────── */}
      <div style={{ position: "relative", width: "100%", height: 400, background: "#f9fafb", display: "flex", alignItems: "center", justifyContent: "center", border: "1px solid #f3f4f6", overflow: "hidden" }}>
        <img src={mockupImg} alt={title} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "contain", pointerEvents: "none" }}
          onError={e => { (e.target as HTMLImageElement).src = "/images/banner.png"; }} />

        {/* Print layer — only interactive when active */}
        <div
          style={{
            position: "absolute", left: position.x, top: position.y,
            width: dimensions.width, height: dimensions.height,
            border: isActive ? "2px dashed #9ca3af" : "1px solid transparent",
            cursor: isActive ? "move" : "default",
            display: "flex", flexDirection: "column", alignItems: "center",
            justifyContent: "center", textAlign: "center", padding: 4,
            pointerEvents: isActive ? "auto" : "none",
          }}
          onMouseDown={handleMouseDown}
          onMouseEnter={e => isActive && (e.currentTarget.style.borderColor = "#111827")}
          onMouseLeave={e => isActive && (e.currentTarget.style.borderColor = "#9ca3af")}
        >
          {uploadedImg && (
            <img src={uploadedImg} alt="Custom" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "contain", pointerEvents: "none", mixBlendMode: "multiply", opacity: 0.75 }} />
          )}
          <p style={{
            width: "100%", fontFamily, fontWeight: 500, fontSize: dimensions.height * 0.2,
            color: "#111827", whiteSpace: "pre-line", letterSpacing: "0.02em", lineHeight: 1.1,
            mixBlendMode: "multiply", opacity: 0.8, pointerEvents: "none",
          }}>{text}</p>

          {isActive && (
            <>
              <div style={{ position: "absolute", top: -4, left: -4, width: 10, height: 10, background: "#1f2937", borderRadius: "50%" }} />
              <div style={{ position: "absolute", top: -4, right: -4, width: 10, height: 10, background: "#1f2937", borderRadius: "50%" }} />
              <div style={{ position: "absolute", bottom: -4, left: -4, width: 10, height: 10, background: "#1f2937", borderRadius: "50%" }} />
              <div className="resize-trigger"
                onMouseDown={handleResizeMouseDown}
                style={{ position: "absolute", bottom: -7, right: -7, width: 14, height: 14, background: "#111827", border: "2px solid #fff", cursor: "se-resize", zIndex: 50 }} />
            </>
          )}
        </div>
      </div>

      {/* ── Info ─────────────────────────────────────────── */}
      <div style={{ borderBottom: "1px solid #f3f4f6", paddingBottom: 12 }}>
        <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 18, color: "#111827", textTransform: "uppercase", marginBottom: 2 }}>{title}</h2>
        <span style={{ fontFamily: "var(--font-mono)", fontWeight: 700, fontSize: 14, color: "#111827" }}>{price}</span>
      </div>

      {/* ── Text Input ───────────────────────────────────── */}
      <div>
        <span style={{ display: "block", fontSize: 10, fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "#9ca3af", marginBottom: 6 }}>Custom Inscription Details</span>
        <textarea rows={2} value={text} onChange={e => setText(e.target.value)}
          onClick={e => e.stopPropagation()}
          style={{ width: "100%", padding: "10px", fontFamily: "var(--font-mono)", fontSize: 11, fontWeight: 500, color: "#111827", background: "#fff", border: "1px solid #d1d5db", borderRadius: 0, outline: "none", resize: "none" }}
          onFocus={e => e.target.style.borderColor = "#111827"}
          onBlur={e => e.target.style.borderColor = "#d1d5db"} />
      </div>

      {/* ── Image Upload ─────────────────────────────────── */}
      <div>
        <span style={{ display: "block", fontSize: 10, fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "#9ca3af", marginBottom: 6 }}>Upload Branding Image</span>
        <input type="file" accept="image/*" onClick={e => e.stopPropagation()}
          style={{ width: "100%", fontSize: 12, color: "#6b7280" }}
          onChange={e => { const file = e.target.files?.[0]; if (file) setUploadedImg(URL.createObjectURL(file)); }} />
      </div>

      {/* ── BUY ──────────────────────────────────────────── */}
      <button onClick={e => { e.stopPropagation(); alert(`${title} added to cart. Stripe Checkout initializing…`); }}
        style={{ width: "100%", padding: "14px 0", background: "#111827", color: "#fff", fontFamily: "var(--font-body)", fontWeight: 700, fontSize: 12, letterSpacing: "0.12em", textTransform: "uppercase", border: "none", borderRadius: 0, cursor: "pointer", marginTop: "auto", transition: "background 0.15s" }}
        onMouseEnter={e => (e.currentTarget.style.background = "#1f2937")}
        onMouseLeave={e => (e.currentTarget.style.background = "#111827")}>
        BUY NOW
      </button>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// PAGE — Multi-Card Live Sync Catalog
// ═══════════════════════════════════════════════════════════════
export default function SupporterKit() {
  const [activeItem, setActiveItem] = useState("tee");
  const [text, setText] = useState("WORLD CUP HACKS\nLOS ANGELES 2026");
  const [uploadedImg, setUploadedImg] = useState<string | null>(null);
  const [fontFamily] = useState("Impact, sans-serif");

  return (
    <div style={{ minHeight: "100vh", background: "#f9fafb", padding: "48px 16px" }}>
      <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 48, borderBottom: "1px solid #f3f4f6", paddingBottom: 32 }}>
          <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 900, fontSize: "clamp(28px, 5vw, 38px)", color: "#111827", textTransform: "uppercase", marginBottom: 8 }}>The Supporter Kit</h1>
          <p style={{ fontSize: 13, color: "#6b7280", letterSpacing: "0.08em", textTransform: "uppercase" }}>Only 3 signature items. No choice paralysis.</p>
        </div>

        {/* ── 3-Column Multi-Card Grid ──────────────────── */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))", gap: 32 }}>
          {PRODUCTS.map(p => (
            <ProductCard
              key={p.id}
              itemConfig={PRINT_ZONES[p.id as keyof typeof PRINT_ZONES]}
              isActive={activeItem === p.id}
              onSelect={() => setActiveItem(p.id)}
              mockupImg={p.mockup}
              title={p.title}
              price={p.price}
              text={text} setText={setText}
              uploadedImg={uploadedImg} setUploadedImg={setUploadedImg}
              fontFamily={fontFamily}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
