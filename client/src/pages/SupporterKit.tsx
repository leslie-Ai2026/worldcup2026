import { useState, useRef, useCallback } from "react";

// ═══════════════════════════════════════════════════════════════
// PRODUCT DATA
// ═══════════════════════════════════════════════════════════════
const PRODUCTS = [
  { id: 1, name: "Official Tournament Tee",     price: "$29.99", img: "/images/banner.png",     fallback: "https://images.unsplash.com/photo-1556821840-3a63f15732ce?w=600&q=85", desc: "Premium heavyweight cotton. Classic athletic fit." },
  { id: 2, name: "Host City Canvas Tote",        price: "$19.99", img: "https://images.unsplash.com/photo-1544816155-12df9643f363?w=600&q=85", fallback: "https://images.unsplash.com/photo-1544816155-12df9643f363?w=600&q=85", desc: "12oz natural canvas. Screen-print front panel." },
  { id: 3, name: "Match-Day Washed Cap",          price: "$24.99", img: "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=600&q=85", fallback: "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=600&q=85", desc: "Enzyme-washed cotton twill. Brass buckle." },
];

const COLORS = [
  { code: "white", label: "White", hex: "#FFFFFF", border: "#D1D5DB" },
  { code: "black", label: "Black", hex: "#111827", border: "#111827" },
  { code: "sand",  label: "Sand",  hex: "#D4C5A9", border: "#B8A88A" },
];
const SIZES = ["S", "M", "L", "XL", "XXL"];

// ═══════════════════════════════════════════════════════════════
// INTERACTIVE CANVAS — Draggable + Resizable Print Layer
// ═══════════════════════════════════════════════════════════════
function InteractiveCanvas({
  product, color, text, customImg,
}: {
  product: typeof PRODUCTS[0]; color: string; text: string; customImg: string | null;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hovering, setHovering] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [resizing, setResizing] = useState(false);
  const dragStart = useRef({ x: 0, y: 0, left: 0, top: 0 });
  const resizeStart = useRef({ x: 0, y: 0, w: 0, h: 0 });

  // Print layer position + size (percentage of container)
  const [pos, setPos] = useState({ left: 35, top: 25, width: 30, height: 25 });

  const bgColor = COLORS.find(c => c.code === color)?.hex || "#FFFFFF";
  const lines = text ? text.split("\n") : [];
  const hasContent = !!customImg || lines.length > 0;
  const showGuides = hovering || dragging || resizing;

  // ── Drag handlers ──────────────────────────────────────────
  const onMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragging(true);
    dragStart.current = {
      x: e.clientX, y: e.clientY,
      left: pos.left, top: pos.top,
    };
  }, [pos]);

  const onResizeDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setResizing(true);
    resizeStart.current = {
      x: e.clientX, y: e.clientY,
      w: pos.width, h: pos.height,
    };
  }, [pos]);

  const globalListenersRef = useRef<((e: MouseEvent) => void) | null>(null);

  // Attach global listeners when dragging/resizing
  if (dragging || resizing) {
    const handler = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      if (dragging) {
        const dx = ((e.clientX - dragStart.current.x) / rect.width) * 100;
        const dy = ((e.clientY - dragStart.current.y) / rect.height) * 100;
        setPos(prev => ({
          ...prev,
          left: Math.max(0, Math.min(100 - prev.width, dragStart.current.left + dx)),
          top: Math.max(0, Math.min(100 - prev.height, dragStart.current.top + dy)),
        }));
      }
      if (resizing) {
        const dw = ((e.clientX - resizeStart.current.x) / rect.width) * 100;
        const dh = ((e.clientY - resizeStart.current.y) / rect.height) * 100;
        setPos(prev => ({
          ...prev,
          width: Math.max(10, Math.min(90 - prev.left, resizeStart.current.w + dw)),
          height: Math.max(8, Math.min(80 - prev.top, resizeStart.current.h + dh)),
        }));
      }
    };
    const upHandler = () => { setDragging(false); setResizing(false); };
    document.addEventListener("mousemove", handler);
    document.addEventListener("mouseup", upHandler);
    // Cleanup after one render
    setTimeout(() => {
      document.removeEventListener("mousemove", handler);
      document.removeEventListener("mouseup", upHandler);
    }, 0);
  }

  return (
    <div
      ref={containerRef}
      style={{
        position: "relative", width: "100%", aspectRatio: "1/1",
        background: "#f9fafb", overflow: "hidden",
        cursor: dragging || resizing ? "grabbing" : "default",
      }}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => { setHovering(false); if (!dragging && !resizing) setDragging(false); setResizing(false); }}
    >
      {/* ── Base garment ──────────────────────────────── */}
      <img src={product.img} alt={product.name}
        style={{ width: "100%", height: "100%", objectFit: "cover", position: "absolute", inset: 0 }}
        onError={e => { (e.target as HTMLImageElement).src = product.fallback; }} />

      {/* ── Color tint ─────────────────────────────────── */}
      {color !== "white" && (
        <div style={{ position: "absolute", inset: 0, background: bgColor, opacity: 0.06, mixBlendMode: "multiply", pointerEvents: "none" }} />
      )}

      {/* ═══ DRAGGABLE + RESIZABLE PRINT LAYER ══════════ */}
      {hasContent && (
        <div
          onMouseDown={onMouseDown}
          style={{
            position: "absolute",
            left: `${pos.left}%`, top: `${pos.top}%`,
            width: `${pos.width}%`, height: `${pos.height}%`,
            border: showGuides ? "2px dashed rgba(17,24,39,0.30)" : "2px solid transparent",
            cursor: "grab",
            display: "flex", flexDirection: "column",
            alignItems: "center", justifyContent: "center",
            gap: 2, zIndex: 10, userSelect: "none",
          }}>
          {/* Custom graphic — ghost ink print effect */}
          {customImg && (
            <img src={customImg} alt="Custom"
              style={{
                maxWidth: "100%", maxHeight: "65%", objectFit: "contain",
                /* GHOST INK BLEND */
                opacity: 0.75,
                mixBlendMode: "multiply",
                filter: "contrast(1.1) brightness(0.95)",
                pointerEvents: "none",
              }} />
          )}

          {/* Multiline text — ghost ink */}
          {lines.length > 0 && lines.map((line, i) => (
            <div key={i} style={{
              fontFamily: "var(--font-display)", fontWeight: 900,
              fontSize: i === 0 ? "clamp(13px, 2.3vw, 26px)" : "clamp(20px, 3.8vw, 44px)",
              color: "#111827", textTransform: "uppercase",
              letterSpacing: "0.05em", lineHeight: 1, textAlign: "center",
              opacity: 0.80, mixBlendMode: "multiply",
              filter: "contrast(1.06) brightness(0.96)",
              pointerEvents: "none",
            }}>{line}</div>
          ))}

          {/* ── Resize handle (visible on hover) ──────── */}
          {showGuides && (
            <div
              onMouseDown={onResizeDown}
              style={{
                position: "absolute", bottom: -2, right: -2,
                width: 14, height: 14,
                background: "#111827", border: "1px solid #fff",
                cursor: "nwse-resize", zIndex: 20,
              }}
            />
          )}
        </div>
      )}

      {/* ── Placeholder hint ────────────────────────────── */}
      {!hasContent && (
        <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", pointerEvents: "none" }}>
          <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--text-muted)", opacity: 0.5, letterSpacing: "0.06em" }}>
            UPLOAD A GRAPHIC OR TYPE TEXT TO PREVIEW
          </span>
        </div>
      )}

      {/* ── Color dot ─────────────────────────────────── */}
      <div style={{ position: "absolute", bottom: 10, right: 10, pointerEvents: "none", zIndex: 20 }}>
        <div style={{ width: 12, height: 12, borderRadius: "50%", background: bgColor, border: `1.5px solid ${COLORS.find(c => c.code === color)?.border || "#ccc"}` }} />
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

  const handleUpload = (pid: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = ev => setCustomImg(prev => ({ ...prev, [pid]: ev.target?.result as string }));
      reader.readAsDataURL(file);
    }
  };

  const clearImg = (pid: number) => {
    setCustomImg(prev => ({ ...prev, [pid]: null }));
    if (fileRefs.current[pid]) fileRefs.current[pid]!.value = "";
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
      <p style={{ fontSize: 14, color: "var(--text-secondary)", textAlign: "center", marginBottom: 32 }}>Upload. Reposition. Resize. Print.</p>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 24, marginBottom: 40 }}>
        {PRODUCTS.map(p => {
          const activeColor = color[p.id] || "white";
          const activeText = text[p.id] || "";
          const activeImg = customImg[p.id] || null;

          return (
            <div key={p.id} style={{ border: "1px solid var(--border)", background: "#fff" }}>
              <InteractiveCanvas product={p} color={activeColor} text={activeText} customImg={activeImg} />

              <div style={{ padding: "16px" }}>
                <h3 style={{ fontFamily: "var(--font-body)", fontWeight: 700, fontSize: 15, marginBottom: 2 }}>{p.name}</h3>
                <p style={{ fontSize: 11, color: "var(--text-secondary)", marginBottom: 10 }}>{p.desc}</p>

                {/* Color */}
                <div style={{ fontSize: 9, fontWeight: 600, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 6 }}>Color</div>
                <div style={{ display: "flex", gap: 10, marginBottom: 10 }}>
                  {COLORS.map(c => (
                    <button key={c.code} onClick={() => setColor(prev => ({ ...prev, [p.id]: c.code }))} title={c.label}
                      style={{ width: 28, height: 28, borderRadius: "50%", background: c.hex, border: (activeColor === c.code ? "3px solid #111827" : `2px solid ${c.border}`), cursor: "pointer", outline: "none", boxShadow: activeColor === c.code ? "0 0 0 2px rgba(0,0,0,0.1)" : "none" }} />
                  ))}
                </div>

                {/* Graphic Upload */}
                <div style={{ fontSize: 9, fontWeight: 600, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 4 }}>Custom Graphic</div>
                <div style={{ display: "flex", gap: 6, marginBottom: 10 }}>
                  <input ref={el => { fileRefs.current[p.id] = el; }} type="file" accept="image/*" onChange={e => handleUpload(p.id, e)}
                    style={{ flex: 1, padding: "6px 8px", fontFamily: "var(--font-body)", fontSize: 10, color: "var(--text-secondary)", background: "#fff", border: "1px solid var(--border)", borderRadius: 2, outline: "none" }} />
                  {activeImg && <button onClick={() => clearImg(p.id)} style={{ fontFamily: "var(--font-body)", fontSize: 10, color: "var(--accent-red)", background: "#FEF2F2", border: "1px solid #FECACA", borderRadius: 2, padding: "4px 8px", cursor: "pointer", whiteSpace: "nowrap" }}>✕</button>}
                </div>

                {/* Text */}
                <div style={{ fontSize: 9, fontWeight: 600, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 4 }}>Custom Text / Number</div>
                <textarea value={activeText} onChange={e => setText(prev => ({ ...prev, [p.id]: e.target.value.slice(0, 40) }))}
                  placeholder={"Name on line 1\nNumber on line 2  (e.g., 26)"} rows={2} maxLength={40}
                  style={{ width: "100%", padding: "8px 10px", marginBottom: 10, fontFamily: "var(--font-mono)", fontSize: 11, fontWeight: 700, color: "#111827", background: "#fff", border: "1px solid var(--border)", borderRadius: 2, outline: "none", letterSpacing: "0.06em", resize: "none" }}
                  onFocus={e => (e.target.style.borderColor = "#111827")} onBlur={e => (e.target.style.borderColor = "var(--border)")} />

                {/* Size */}
                <div style={{ fontSize: 9, fontWeight: 600, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 4 }}>Size</div>
                <div style={{ display: "flex", gap: 3, marginBottom: 16, flexWrap: "wrap" }}>
                  {SIZES.map(sz => {
                    const active = (size[p.id] || "M") === sz;
                    return <button key={sz} onClick={() => setSize(prev => ({ ...prev, [p.id]: sz }))} style={{ fontFamily: "var(--font-mono)", fontSize: 9, fontWeight: active ? 600 : 400, color: active ? "#fff" : "var(--text-secondary)", background: active ? "#111827" : "#fff", border: `1px solid ${active ? "#111827" : "var(--border)"}`, borderRadius: 2, padding: "4px 8px", cursor: "pointer" }}>{sz}</button>;
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
