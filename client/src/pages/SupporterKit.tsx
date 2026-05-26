import { useState, useRef, useEffect } from "react";

const APP_FONTS: Record<string, { name: string; value: string; weight: string }> = {
  athletic: { name: "Athletic Block",   value: '"Montserrat", sans-serif',              weight: "900" },
  serif:    { name: "Vintage Serif",    value: '"Playfair Display", Georgia, serif',    weight: "700" },
  sans:     { name: "Bold Sans",        value: '"Inter", sans-serif',                   weight: "800" },
};

const COLOR_OPTIONS = [
  { id: "white", name: "White",      hex: "#FFFFFF", overlayBg: "transparent",                     imgFilter: "none",                            textColor: "#111111" },
  { id: "black", name: "Black",      hex: "#111111", overlayBg: "rgba(20, 20, 20, 0.94)",          imgFilter: "brightness(0.18)",                 textColor: "#FFFFFF" },
  { id: "grey",  name: "Sport Grey", hex: "#DCDCDC", overlayBg: "rgba(130, 130, 130, 0.45)",       imgFilter: "brightness(0.82) contrast(0.95)", textColor: "#111111" },
];

const PRODUCT_CATALOG = {
  tee:  { id: "tee",  title: "Official Tournament Tee",  price: "$29.99", mockupImg: "/images/white-tee.png", defaultWidth: 150, defaultHeight: 85,  initialX: 75,  initialY: 135 },
  tote: { id: "tote", title: "Host City Canvas Tote",    price: "$19.99", mockupImg: "/images/tote.png",      defaultWidth: 130, defaultHeight: 110, initialX: 85,  initialY: 145 },
  cap:  { id: "cap",  title: "Match-Day Retro Cap",      price: "$24.99", mockupImg: "/images/cap.png",       defaultWidth: 85,  defaultHeight: 38,  initialX: 108, initialY: 152 },
};

export default function SupporterKit() {
  useEffect(() => {
    if (typeof window !== "undefined") {
      const link = document.createElement("link");
      link.href = "https://fonts.googleapis.com/css2?family=Inter:wght@800&family=Montserrat:wght@900&family=Playfair+Display:wght@700&display=swap";
      link.rel = "stylesheet";
      document.head.appendChild(link);
    }
  }, []);

  const [activeItem, setActiveItem] = useState("tee");
  const [text, setText] = useState("WORLD CUP HACKS\nLOS ANGELES 2026");
  const [uploadedImg, setUploadedImg] = useState<string | null>(null);
  const [selectedFont, setSelectedFont] = useState("athletic");

  return (
    <div style={{ minHeight: "100vh", background: "#FAFAFA", padding: "64px 16px", fontFamily: "var(--font-body)", userSelect: "none" }}>
      <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 64, borderBottom: "1px solid #f3f4f6", paddingBottom: 32 }}>
          <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 900, fontSize: "clamp(26px, 4vw, 32px)", color: "#111827", textTransform: "uppercase", letterSpacing: "-0.01em" }}>The 2026 Supporter Kit</h1>
          <p style={{ marginTop: 8, fontSize: 11, color: "#9ca3af", letterSpacing: "0.15em", textTransform: "uppercase", fontWeight: 700 }}>Live Customization • Direct Printful OEM Fulfillment</p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 32 }}>
          {Object.values(PRODUCT_CATALOG).map(product => (
            <ProductionCard key={product.id} product={product} isActive={activeItem === product.id}
              onSelect={() => setActiveItem(product.id)}
              sharedState={{ text, setText, uploadedImg, setUploadedImg, selectedFont, setSelectedFont }} />
          ))}
        </div>
      </div>
    </div>
  );
}

function ProductionCard({ product, isActive, onSelect, sharedState }: {
  product: typeof PRODUCT_CATALOG.tee; isActive: boolean; onSelect: () => void;
  sharedState: { text: string; setText: (v: string) => void; uploadedImg: string | null; setUploadedImg: (v: string | null) => void; selectedFont: string; setSelectedFont: (v: string) => void; };
}) {
  const [chosenColorId, setChosenColorId] = useState("white");
  const [pos, setPos] = useState({ x: product.initialX, y: product.initialY });
  const [dims, setDims] = useState({ width: product.defaultWidth, height: product.defaultHeight });
  const [dragging, setDragging] = useState(false);
  const [resizing, setResizing] = useState(false);
  const dragStart = useRef({ x: 0, y: 0 });
  const resizeStart = useRef({ w: 0, h: 0, mx: 0, my: 0 });

  const color = COLOR_OPTIONS.find(c => c.id === chosenColorId) || COLOR_OPTIONS[0];
  const font = APP_FONTS[sharedState.selectedFont] || APP_FONTS.athletic;

  useEffect(() => {
    const mm = (e: MouseEvent) => {
      if (dragging) setPos({ x: e.clientX - dragStart.current.x, y: e.clientY - dragStart.current.y });
      if (resizing) setDims({ width: Math.max(60, resizeStart.current.w + (e.clientX - resizeStart.current.mx)), height: Math.max(30, resizeStart.current.h + (e.clientY - resizeStart.current.my)) });
    };
    const mu = () => { setDragging(false); setResizing(false); };
    if (dragging || resizing) { window.addEventListener("mousemove", mm); window.addEventListener("mouseup", mu); }
    return () => { window.removeEventListener("mousemove", mm); window.removeEventListener("mouseup", mu); };
  }, [dragging, resizing]);

  return (
    <div onClick={onSelect} style={{
      background: "#fff", padding: 24, border: isActive ? "2px solid #111827" : "1px solid #e5e7eb",
      display: "flex", flexDirection: "column", gap: 18, cursor: "pointer",
      transition: "all 0.2s", transform: isActive ? "scale(1.01)" : "scale(1)",
    }}>
      {/* Canvas */}
      <div style={{ position: "relative", width: "100%", height: 320, background: "#F5F5F5", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
        <img src={product.mockupImg} alt={product.title}
          style={{ width: "100%", height: "100%", objectFit: "contain", pointerEvents: "none", filter: color.imgFilter, transition: "filter 0.3s" }}
          onError={e => { (e.target as HTMLImageElement).style.opacity = "0.15"; }} />
        <div style={{ position: "absolute", inset: 0, pointerEvents: "none", mixBlendMode: "multiply", backgroundColor: color.overlayBg }} />

        {/* Print layer */}
        <div
          style={{
            position: "absolute", left: pos.x, top: pos.y, width: dims.width, height: dims.height,
            border: isActive ? "1px dashed #6b7280" : "1px solid transparent",
            cursor: isActive ? "move" : "default", pointerEvents: isActive ? "auto" : "none",
            display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
            textAlign: "center", padding: 4,
          }}
          onMouseDown={e => {
            if (!isActive || (e.target as HTMLElement).classList.contains("rsz")) return;
            setDragging(true);
            dragStart.current = { x: e.clientX - pos.x, y: e.clientY - pos.y };
          }}>
          {sharedState.uploadedImg && (
            <img src={sharedState.uploadedImg} alt="" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "contain", opacity: 0.85, mixBlendMode: chosenColorId === "black" ? "screen" : "multiply", pointerEvents: "none" }} />
          )}
          <p style={{
            width: "100%", fontFamily: font.value, fontWeight: font.weight as any,
            fontSize: dims.height * 0.18, color: color.textColor,
            whiteSpace: "pre-line", letterSpacing: "-0.01em", lineHeight: 1.05,
            pointerEvents: "none", textTransform: "uppercase", margin: 0,
            transition: "color 0.3s",
          }}>{sharedState.text}</p>
          {isActive && (
            <div className="rsz" onMouseDown={e => {
              e.stopPropagation(); setResizing(true);
              resizeStart.current = { w: dims.width, h: dims.height, mx: e.clientX, my: e.clientY };
            }} style={{ position: "absolute", bottom: -5, right: -5, width: 11, height: 11, background: "#111827", border: "2px solid #fff", cursor: "se-resize", zIndex: 50 }} />
          )}
        </div>
      </div>

      {/* Info */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", borderBottom: "1px solid #f3f4f6", paddingBottom: 8, fontWeight: 700, fontSize: 13, textTransform: "uppercase" }}>
        <span>{product.title}</span>
        <span style={{ fontFamily: "var(--font-mono)" }}>{product.price}</span>
      </div>

      {/* Color */}
      <div>
        <span style={{ display: "block", fontSize: 9, fontWeight: 900, letterSpacing: "0.15em", textTransform: "uppercase", color: "#9ca3af", marginBottom: 6 }}>Printful Colorway</span>
        <div style={{ display: "flex", gap: 6 }}>
          {COLOR_OPTIONS.map(c => (
            <button key={c.id} onClick={e => { e.stopPropagation(); setChosenColorId(c.id); }} style={{
              width: 18, height: 18, borderRadius: "50%", background: c.hex,
              border: chosenColorId === c.id ? "2px solid #111827" : c.id === "white" ? "1px solid #d1d5db" : "1px solid transparent",
              cursor: "pointer", outline: "none",
              transform: chosenColorId === c.id ? "scale(1.15)" : "scale(1)",
            }} />
          ))}
        </div>
      </div>

      {/* Font */}
      <div>
        <span style={{ display: "block", fontSize: 9, fontWeight: 900, letterSpacing: "0.15em", textTransform: "uppercase", color: "#9ca3af", marginBottom: 6 }}>Typography Font</span>
        <select value={sharedState.selectedFont} onChange={e => sharedState.setSelectedFont(e.target.value)} onClick={e => e.stopPropagation()}
          style={{ width: "100%", padding: 8, fontFamily: "var(--font-body)", fontSize: 11, fontWeight: 700, border: "1px solid #d1d5db", borderRadius: 0, outline: "none", background: "#fff", cursor: "pointer", appearance: "none" }}>
          {Object.keys(APP_FONTS).map(k => <option key={k} value={k}>{APP_FONTS[k].name}</option>)}
        </select>
      </div>

      {/* Text */}
      <div>
        <span style={{ display: "block", fontSize: 9, fontWeight: 900, letterSpacing: "0.15em", textTransform: "uppercase", color: "#9ca3af", marginBottom: 6 }}>Inscription Details</span>
        <textarea rows={2} value={sharedState.text} onChange={e => sharedState.setText(e.target.value)} onClick={e => e.stopPropagation()}
          style={{ width: "100%", padding: 8, fontFamily: "var(--font-mono)", fontSize: 11, fontWeight: 700, textTransform: "uppercase", background: "#f9fafb", border: "1px solid #d1d5db", borderRadius: 0, outline: "none", resize: "none" }}
          onFocus={e => { e.target.style.background = "#fff"; e.target.style.borderColor = "#111827"; }}
          onBlur={e => { e.target.style.background = "#f9fafb"; e.target.style.borderColor = "#d1d5db"; }} />
      </div>

      {/* Upload */}
      <div>
        <span style={{ display: "block", fontSize: 9, fontWeight: 900, letterSpacing: "0.15em", textTransform: "uppercase", color: "#9ca3af", marginBottom: 6 }}>Upload Crest</span>
        <input type="file" accept="image/*" onChange={e => { const f = e.target.files?.[0]; if (f) sharedState.setUploadedImg(URL.createObjectURL(f)); }} onClick={e => e.stopPropagation()}
          style={{ width: "100%", fontSize: 11, color: "#9ca3af" }} />
      </div>

      {/* Buy */}
      <button onClick={e => { e.stopPropagation(); alert(`Checking out for ${product.title} (${chosenColorId})`); }} style={{
        width: "100%", padding: "12px 0", background: "#111827", color: "#fff",
        fontFamily: "var(--font-body)", fontWeight: 900, fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase",
        border: "none", borderRadius: 0, cursor: "pointer", marginTop: "auto", transition: "background 0.15s",
      }}
        onMouseEnter={e => (e.currentTarget.style.background = "#1f2937")}
        onMouseLeave={e => (e.currentTarget.style.background = "#111827")}>
        Buy Now
      </button>
    </div>
  );
}
