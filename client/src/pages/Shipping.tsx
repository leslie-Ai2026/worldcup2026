import { Truck, RotateCcw, Clock, Globe } from "lucide-react";

const sections = [
  {
    icon: Truck,
    title: "Shipping",
    content: [
      "All Fan Pack products are printed on demand and fulfilled by our print partner.",
      "Standard shipping to the US, Canada, and Mexico typically takes 7–14 business days after production.",
      "Production time is 3–5 business days.",
      "Free shipping on orders over $60 USD.",
      "Tracking information will be emailed once your order ships.",
    ],
  },
  {
    icon: Globe,
    title: "Delivery Regions",
    content: [
      "We currently ship to the United States, Canada, and Mexico.",
      "International orders outside these regions are not supported at this time.",
    ],
  },
  {
    icon: RotateCcw,
    title: "Returns & Exchanges",
    content: [
      "Because all items are printed on demand specifically for you, we do not accept returns or exchanges for buyer's remorse.",
      "If your item arrives damaged, defective, or with a printing error, please contact us within 14 days of delivery with a photo of the issue.",
      "We will replace or refund defective items at no additional cost.",
    ],
  },
  {
    icon: Clock,
    title: "Order Issues",
    content: [
      "To report an issue with your order, email us at support@hostcityhacks.com with your order number and a description of the problem.",
      "We aim to respond within 2 business days.",
    ],
  },
];

export default function Shipping() {
  return (
    <div className="container py-10 md:py-16 max-w-3xl">
      <div className="mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 mb-4">
          <Truck className="w-3.5 h-3.5 text-blue-400" />
          <span className="text-xs font-semibold tracking-widest uppercase text-blue-400">Shipping & Returns</span>
        </div>
        <h1 className="text-3xl font-black text-white mb-2">Shipping & Returns</h1>
        <p className="text-muted-foreground text-sm">Last updated: May 2026</p>
      </div>

      <div className="space-y-6">
        {sections.map(({ icon: Icon, title, content }) => (
          <div key={title} className="rounded-2xl border border-border bg-card p-5 card-glow">
            <div className="flex items-center gap-2.5 mb-3">
              <div className="w-7 h-7 rounded-lg bg-amber-400/10 flex items-center justify-center">
                <Icon className="w-3.5 h-3.5 text-amber-400" />
              </div>
              <h2 className="text-sm font-bold text-white">{title}</h2>
            </div>
            <ul className="space-y-2">
              {content.map((line, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400/50 shrink-0" />
                  {line}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
