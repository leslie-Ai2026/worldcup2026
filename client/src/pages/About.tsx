import { Trophy, MapPin, Users, Zap } from "lucide-react";

export default function About() {
  return (
    <div className="container py-10 md:py-16 max-w-3xl">
      <div className="mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/20 mb-4">
          <Users className="w-3.5 h-3.5 text-amber-400" />
          <span className="text-xs font-semibold tracking-widest uppercase text-amber-400">About Us</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-white mb-4">
          We're fans, <span className="gold-text">just like you.</span>
        </h1>
        <p className="text-muted-foreground leading-relaxed text-base">
          Host City Hacks 2026 is an independent fan-made guide built by football supporters who wanted a no-nonsense resource for attending the 2026 FIFA World Cup across the USA, Canada, and Mexico.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
        {[
          { icon: MapPin, label: "16 Host Cities", desc: "Covered across 3 countries" },
          { icon: Trophy, label: "AI Predictions", desc: "Powered by Gemini AI" },
          { icon: Zap, label: "Budget-First", desc: "Real hacks, real savings" },
        ].map(({ icon: Icon, label, desc }) => (
          <div key={label} className="rounded-xl border border-border bg-card p-4 text-center card-glow">
            <div className="w-8 h-8 rounded-lg bg-amber-400/10 flex items-center justify-center mx-auto mb-2">
              <Icon className="w-4 h-4 text-amber-400" />
            </div>
            <div className="text-sm font-bold text-white">{label}</div>
            <div className="text-xs text-muted-foreground mt-0.5">{desc}</div>
          </div>
        ))}
      </div>

      <div className="space-y-5 text-sm text-muted-foreground leading-relaxed">
        <p>
          Our mission is simple: help real fans attend the greatest sporting event on Earth without getting ripped off. We cut through the noise of overpriced travel packages and tourist traps to bring you practical, tested advice on where to stay, how to get around, and what to wear.
        </p>
        <p>
          The <strong className="text-white">Host City Guide</strong> section is packed with budget accommodation tips, transit hacks for navigating between the US, Canada, and Mexico, and affiliate links to the best deals we've personally vetted.
        </p>
        <p>
          The <strong className="text-white">Fan Pack</strong> is our print-on-demand merchandise line — designed in-house, printed on demand, and shipped directly to you. No warehouses, no waste, just quality gear for match day.
        </p>
        <p className="text-xs border-t border-border pt-4">
          <strong className="text-white/60">Disclaimer:</strong> This website is an independent fan-made guide and is not affiliated with, endorsed by, or sponsored by FIFA or any official World Cup organization.
        </p>
      </div>
    </div>
  );
}
