import { Link } from "wouter";
import { ChevronLeft, ShoppingBag, Star, Truck } from "lucide-react";
import { toast } from "sonner";

const PRODUCTS = [
  {
    id: 1,
    name: "2026 World Cup Fan Hoodie",
    emoji: "👕",
    price: "$45.00",
    originalPrice: "$59.00",
    badge: "BEST SELLER",
    badgeColor: "bg-[oklch(0.78_0.16_85/0.2)] text-[oklch(0.78_0.16_85)] border-[oklch(0.78_0.16_85/0.4)]",
    description: "Premium heavyweight hoodie. USA · Canada · Mexico 2026 design. Available in S–3XL.",
    colors: ["⚫ Black", "🟤 Forest Green", "⚪ White"],
    rating: 4.9,
    reviews: 128,
    shipping: "Ships in 3–5 days",
  },
  {
    id: 2,
    name: "Stadium Tote Bag",
    emoji: "👜",
    price: "$19.99",
    originalPrice: null,
    badge: "FAN ESSENTIAL",
    badgeColor: "bg-[oklch(0.38_0.14_145/0.2)] text-[oklch(0.55_0.14_145)] border-[oklch(0.38_0.14_145/0.4)]",
    description: "Heavy-duty canvas tote. Fits everything you need for a match day. Eco-friendly print.",
    colors: ["⚫ Black", "🟢 Pitch Green"],
    rating: 4.7,
    reviews: 64,
    shipping: "Ships in 3–5 days",
  },
  {
    id: 3,
    name: "World Cup Dad Hat",
    emoji: "🧢",
    price: "$24.99",
    originalPrice: "$32.00",
    badge: "LIMITED",
    badgeColor: "bg-[oklch(0.58_0.24_25/0.2)] text-[oklch(0.68_0.22_25)] border-[oklch(0.58_0.24_25/0.4)]",
    description: "Embroidered 2026 logo. Adjustable strap. One size fits all. Stadium-ready.",
    colors: ["⚫ Black/Gold", "🟤 Olive"],
    rating: 4.8,
    reviews: 89,
    shipping: "Ships in 3–5 days",
  },
];

const FEATURES = [
  { icon: "🖨️", title: "Print-on-Demand", desc: "Every item printed fresh. No excess inventory, no waste." },
  { icon: "🚚", title: "Free Shipping $50+", desc: "Free standard shipping on orders over $50 to USA & Canada." },
  { icon: "↩️", title: "30-Day Returns", desc: "Not happy? Return within 30 days for a full refund." },
  { icon: "🌍", title: "Ships Worldwide", desc: "We ship to all 16 host countries and beyond." },
];

export default function FanPack() {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="relative overflow-hidden bg-gradient-to-b from-[oklch(0.18_0.06_85)] to-[oklch(0.08_0.012_145)] pt-24 pb-12">
        <div className="container relative z-10">
          <Link href="/">
            <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide text-[oklch(0.52_0.01_90)] hover:text-white transition-colors cursor-pointer mb-6">
              <ChevronLeft className="w-3.5 h-3.5" /> Back to Hub
            </span>
          </Link>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[oklch(0.78_0.16_85/0.15)] border border-[oklch(0.78_0.16_85/0.35)] mb-4">
            <ShoppingBag className="w-3.5 h-3.5 text-[oklch(0.78_0.16_85)]" />
            <span className="text-xs font-bold tracking-widest uppercase text-[oklch(0.78_0.16_85)]">Exclusive Merch</span>
          </div>
          <h1 className="font-display text-4xl sm:text-6xl text-white mb-3">THE FAN PACK</h1>
          <p className="text-[oklch(0.65_0.01_90)] max-w-xl">
            Official-style 2026 World Cup fan gear. Print-on-demand, shipped worldwide.
          </p>
        </div>
      </div>

      <div className="container py-10 space-y-12">
        {/* Products */}
        <section>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {PRODUCTS.map((product) => (
              <div key={product.id} className="rounded-2xl border border-[oklch(0.22_0.018_145)] bg-[oklch(0.11_0.014_145)] overflow-hidden card-glow group">
                {/* Product image area */}
                <div className="relative bg-gradient-to-br from-[oklch(0.16_0.018_145)] to-[oklch(0.09_0.012_145)] h-48 flex items-center justify-center border-b border-[oklch(0.22_0.018_145)]">
                  <span className="text-7xl group-hover:scale-110 transition-transform duration-300">{product.emoji}</span>
                  <div className={`absolute top-3 left-3 text-[9px] font-bold px-2 py-1 rounded-full border ${product.badgeColor}`}>
                    {product.badge}
                  </div>
                  {product.originalPrice && (
                    <div className="absolute top-3 right-3 text-[9px] font-bold px-2 py-1 rounded-full bg-red-500/20 text-red-400 border border-red-500/30">
                      SALE
                    </div>
                  )}
                </div>

                {/* Product info */}
                <div className="p-5">
                  <h3 className="font-heading font-bold text-white text-base mb-1">{product.name}</h3>
                  <p className="text-xs text-[oklch(0.52_0.01_90)] mb-3 leading-relaxed">{product.description}</p>

                  {/* Colors */}
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {product.colors.map((color) => (
                      <span key={color} className="text-[9px] px-2 py-0.5 rounded-full bg-[oklch(0.16_0.018_145)] border border-[oklch(0.22_0.018_145)] text-[oklch(0.52_0.01_90)]">
                        {color}
                      </span>
                    ))}
                  </div>

                  {/* Rating */}
                  <div className="flex items-center gap-1.5 mb-4">
                    <div className="flex">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} className={`w-3 h-3 ${i < Math.floor(product.rating) ? "text-[oklch(0.78_0.16_85)] fill-[oklch(0.78_0.16_85)]" : "text-[oklch(0.30_0.01_90)]"}`} />
                      ))}
                    </div>
                    <span className="text-xs text-[oklch(0.52_0.01_90)]">{product.rating} ({product.reviews} reviews)</span>
                  </div>

                  {/* Price + CTA */}
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="font-display text-2xl text-[oklch(0.78_0.16_85)]">{product.price}</span>
                      {product.originalPrice && (
                        <span className="ml-2 text-xs text-[oklch(0.40_0.01_90)] line-through">{product.originalPrice}</span>
                      )}
                    </div>
                    <button
                      onClick={() => toast.success(`Added ${product.name} to cart! 🛒`)}
                      className="px-4 py-2 rounded-xl bg-[oklch(0.78_0.16_85)] hover:bg-[oklch(0.88_0.14_90)] text-[oklch(0.10_0.02_85)] font-heading font-bold uppercase tracking-wide text-xs transition-all duration-200 active:scale-95 shadow-lg shadow-[oklch(0.78_0.16_85/0.25)]"
                    >
                      Buy Now
                    </button>
                  </div>

                  {/* Shipping */}
                  <div className="flex items-center gap-1.5 mt-3 text-[10px] text-[oklch(0.45_0.01_90)]">
                    <Truck className="w-3 h-3" />
                    {product.shipping}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Features */}
        <section>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {FEATURES.map((f) => (
              <div key={f.title} className="rounded-2xl border border-[oklch(0.22_0.018_145)] bg-[oklch(0.11_0.014_145)] p-4 text-center card-glow">
                <div className="text-3xl mb-2">{f.icon}</div>
                <div className="font-heading font-bold text-white text-xs mb-1">{f.title}</div>
                <div className="text-[10px] text-[oklch(0.45_0.01_90)] leading-relaxed">{f.desc}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Shipping policy note */}
        <div className="text-center text-xs text-[oklch(0.40_0.01_90)]">
          Products are fulfilled by a print-on-demand partner.{" "}
          <Link href="/shipping">
            <span className="text-[oklch(0.78_0.16_85)] hover:underline cursor-pointer">View full Shipping & Returns policy →</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
