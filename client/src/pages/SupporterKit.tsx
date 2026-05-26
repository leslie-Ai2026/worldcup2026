import { useState, useRef, useEffect } from "react";

const APP_FONTS: Record<string, { name: string; value: string; weight: string }> = {
  athletic: { name: "Athletic Block",   value: "sans-serif", weight: "900" },
  serif:    { name: "Vintage Serif",    value: "serif",      weight: "700" },
  cursive:  { name: "Elegant Cursive",  value: "cursive",    weight: "400" },
};

const PRODUCT_CATALOG = {
  tee:  { id: "tee",  title: "Official Tournament Tee",  price: "$29.99", defaultWidth: 150, defaultHeight: 90,  initialX: 75,  initialY: 135, desc: "Premium custom combed organic cotton." },
  tote: { id: "tote", title: "Host City Canvas Tote",    price: "$19.99", defaultWidth: 130, defaultHeight: 110, initialX: 85,  initialY: 145, desc: "Heavy duty eco-friendly canvas." },
  cap:  { id: "cap",  title: "Match-Day Retro Cap",      price: "$24.99", defaultWidth: 85,  defaultHeight: 38,  initialX: 108, initialY: 152, desc: "Vintage retro washed unstructured cap." },
};

export default function SupporterKit() {
  useEffect(() => {
    if (typeof window !== "undefined") {
      const link = document.createElement("link");
      link.href = "https://fonts.googleapis.com/css2?family=Montserrat:wght@900&family=Playfair+Display:wght@700&display=swap";
      link.rel = "stylesheet";
      document.head.appendChild(link);
    }
  }, []);

  const [activeItem, setActiveItem] = useState("tee");
  const [text, setText] = useState("WORLD CUP HACKS\nLOS ANGELES 2026");
  const [uploadedImg, setUploadedImg] = useState<string | null>(null);
  const [selectedFont, setSelectedFont] = useState("athletic");

  return (
    <div style={{ minHeight: "100vh", background: "#FAFAFA", padding: "48px 16px" }}>
      <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 48, borderBottom: "1px solid #e5e7eb", paddingBottom: 24 }}>
          <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 900, fontSize: 24, color: "#111827", textTransform: "uppercase" }}>The 2026 Supporter Kit</h1>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 24 }}>
          {Object.values(PRODUCT_CATALOG).map(product => {
            if (!product) return null;
            return (
              <SafeProductCard key={product.id} product={product}
                isActive={activeItem === product.id} onSelect={() => setActiveItem(product.id)}
                sharedState={{ text, setText, uploadedImg, setUploadedImg, selectedFont, setSelectedFont }} />
            );
          })}
        </div>
      </div>
    </div>
  );
}

function SafeProductCard({ product, isActive, onSelect, sharedState }: {
  product: typeof PRODUCT_CATALOG.tee; isActive: boolean; onSelect: () => void;
  sharedState: { text: string; setText: (v: string) => void; uploadedImg: string | null; setUploadedImg: (v: string | null) => void; selectedFont: string; setSelectedFont: (v: string) => void; };
}) {
  const [chosenColorId] = useState("white");
  const [position, setPosition] = useState({ x: product.initialX || 50, y: product.initialY || 50 });
  const [dims, setDims] = useState({ width: product.defaultWidth || 100, height: product.defaultHeight || 50 });
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const dragStart = useRef({ x: 0, y: 0 });
  const resizeStart = useRef({ w: 0, mx: 0 });

  useEffect(() => {
    const mm = (e: MouseEvent) => {
      if (isDragging) setPosition({ x: e.clientX - dragStart.current.x, y: e.clientY - dragStart.current.y });
      if (isResizing) setDims(prev => ({ ...prev, width: Math.max(60, resizeStart.current.w + (e.clientX - resizeStart.current.mx)) }));
    };
    const mu = () => { setIsDragging(false); setIsResizing(false); };
    if (isDragging || isResizing) { window.addEventListener("mousemove", mm); window.addEventListener("mouseup", mu); }
    return () => { window.removeEventListener("mousemove", mm); window.removeEventListener("mouseup", mu); };
  }, [isDragging, isResizing]);

  const fontConfig = APP_FONTS[sharedState.selectedFont] || APP_FONTS.athletic;

  return (
    <div onClick={onSelect} style={{
      background: "#fff", padding: 20, border: isActive ? "2px solid #111827" : "1px solid #e5e7eb",
      cursor: "pointer", userSelect: "none",
    }}>
      {/* Safe Canvas */}
      <div style={{ position: "relative", width: "100%", height: 280, background: "#f3f4f6", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, background: "rgba(229,231,235,0.4)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, color: "#9ca3af", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase" }}>
          [ Live Studio Canvas ]
        </div>

        <div style={{
          position: "absolute", left: position.x, top: position.y,
          width: dims.width, height: dims.height,
          border: isActive ? "1px dashed #4b5563" : "1px solid transparent",
          display: "flex", flexDirection: "column", justifyContent: "center", textAlign: "center", padding: 4,
        }}
          onMouseDown={e => {
            if (!isActive || (e.target as HTMLElement).classList.contains("rn")) return;
            setIsDragging(true);
            dragStart.current = { x: e.clientX - position.x, y: e.clientY - position.y };
          }}>
          <p style={{ fontFamily: fontConfig.value, fontWeight: fontConfig.weight as any, whiteSpace: "pre-line", lineHeight: 1.1, fontSize: 12, textTransform: "uppercase" }}>
            {sharedState.text}
          </p>
          {isActive && (
            <div className="rn" onMouseDown={e => {
              e.stopPropagation(); setIsResizing(true);
              resizeStart.current = { w: dims.width, mx: e.clientX };
            }}
              style={{ position: "absolute", bottom: -4, right: -4, width: 10, height: 10, background: "#111827", cursor: "se-resize" }} />
          )}
        </div>
      </div>

      <div style={{ marginTop: 16, borderBottom: "1px solid #e5e7eb", paddingBottom: 8, display: "flex", justifyContent: "space-between", fontWeight: 700, fontSize: 13, textTransform: "uppercase" }}>
        <span>{product.title}</span>
        <span>{product.price}</span>
      </div>

      <div style={{ marginTop: 12 }}>
        <textarea value={sharedState.text} onChange={e => sharedState.setText(e.target.value)} onClick={e => e.stopPropagation()} rows={2}
          style={{ width: "100%", padding: 8, fontFamily: "var(--font-mono)", fontSize: 11, fontWeight: 700, border: "1px solid #d1d5db", borderRadius: 0, outline: "none", textTransform: "uppercase", resize: "none" }} />
      </div>

      <button onClick={e => { e.stopPropagation(); alert("Added to cart!"); }} style={{
        width: "100%", marginTop: 16, padding: "10px 0", background: "#111827", color: "#fff",
        fontFamily: "var(--font-body)", fontWeight: 700, fontSize: 11, textTransform: "uppercase",
        border: "none", borderRadius: 0, cursor: "pointer",
      }}>
        Buy Now
      </button>
    </div>
  );
}
