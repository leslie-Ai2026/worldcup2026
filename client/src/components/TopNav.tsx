import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const PRIMARY_LINKS = [
  { label: "Home",          href: "/" },
  { label: "Matches",       href: "/matches" },
  { label: "Golden Boot",   href: "/golden-boot" },
];

const SECONDARY_LINKS = [
  { label: "Host City Guide",   href: "/host-city-guide", accent: false },
  { label: "Fan Pack (Shop)",   href: "/fan-pack",        accent: true  },
];

export default function TopNav() {
  const [location] = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setMenuOpen(false); }, [location]);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-[oklch(0.08_0.012_145/0.97)] backdrop-blur-xl border-b border-[oklch(0.22_0.018_145)]"
          : "bg-[oklch(0.08_0.012_145/0.85)] backdrop-blur-md border-b border-transparent"
      )}
    >
      {/* Ticker tape — breaking news strip */}
      <div className="bg-[oklch(0.78_0.16_85)] text-[oklch(0.10_0.02_85)] text-[10px] font-bold tracking-widest overflow-hidden h-6 flex items-center">
        <div className="ticker-wrap flex-1">
          <div className="ticker-inner">
            {[
              "⚽ 2026 FIFA WORLD CUP — USA · CANADA · MEXICO",
              "🏆 48 TEAMS · 104 MATCHES · 16 HOST CITIES",
              "🔥 JUNE 11 – JULY 19, 2026",
              "⚡ AI PREDICTIONS POWERED BY GEMINI",
              "🌎 THE WORLD STOPS. JUNE 11.",
              "⚽ 2026 FIFA WORLD CUP — USA · CANADA · MEXICO",
              "🏆 48 TEAMS · 104 MATCHES · 16 HOST CITIES",
              "🔥 JUNE 11 – JULY 19, 2026",
              "⚡ AI PREDICTIONS POWERED BY GEMINI",
              "🌎 THE WORLD STOPS. JUNE 11.",
            ].map((t, i) => (
              <span key={i} className="px-8">{t}</span>
            ))}
          </div>
        </div>
      </div>

      {/* Main nav bar */}
      <div className="container">
        <div className="flex items-center justify-between h-14">
          {/* Logo */}
          <Link href="/">
            <div className="flex items-center gap-2.5 cursor-pointer group">
              <div className="relative w-9 h-9">
                <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-[oklch(0.88_0.14_90)] to-[oklch(0.65_0.18_80)] flex items-center justify-center shadow-lg">
                  <span className="text-lg leading-none">⚽</span>
                </div>
              </div>
              <div className="flex flex-col leading-none">
                <span className="font-display text-lg tracking-wider text-white leading-none">WORLD CUP</span>
                <span className="text-[9px] font-bold tracking-[0.2em] uppercase text-[oklch(0.78_0.16_85)] leading-none mt-0.5">2026 · AI HUB</span>
              </div>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-0.5">
            {PRIMARY_LINKS.map((link) => (
              <Link key={link.href} href={link.href}>
                <span className={cn(
                  "relative px-4 py-2 text-sm font-heading font-semibold uppercase tracking-wide rounded-lg transition-all duration-200 cursor-pointer",
                  location === link.href
                    ? "text-[oklch(0.78_0.16_85)] bg-[oklch(0.78_0.16_85/0.1)]"
                    : "text-[oklch(0.65_0.01_90)] hover:text-white hover:bg-white/5"
                )}>
                  {location === link.href && (
                    <span className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-4 h-0.5 rounded-full bg-[oklch(0.78_0.16_85)]" />
                  )}
                  {link.label}
                </span>
              </Link>
            ))}

            <div className="w-px h-5 bg-[oklch(0.22_0.018_145)] mx-2" />

            {SECONDARY_LINKS.map((link) => (
              <Link key={link.href} href={link.href}>
                <span className={cn(
                  "px-4 py-2 text-sm font-heading font-semibold uppercase tracking-wide rounded-lg transition-all duration-200 cursor-pointer",
                  link.accent
                    ? "bg-[oklch(0.78_0.16_85)] text-[oklch(0.10_0.02_85)] hover:bg-[oklch(0.88_0.14_90)] shadow-lg shadow-[oklch(0.78_0.16_85/0.25)]"
                    : location === link.href
                      ? "text-[oklch(0.78_0.16_85)] bg-[oklch(0.78_0.16_85/0.1)]"
                      : "text-[oklch(0.65_0.01_90)] hover:text-white hover:bg-white/5"
                )}>
                  {link.label}
                </span>
              </Link>
            ))}
          </nav>

          {/* Mobile hamburger */}
          <button
            className="lg:hidden p-2 rounded-lg text-[oklch(0.65_0.01_90)] hover:text-white hover:bg-white/5 transition-colors"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      {menuOpen && (
        <div className="lg:hidden border-t border-[oklch(0.22_0.018_145)] bg-[oklch(0.08_0.012_145/0.98)] backdrop-blur-xl animate-slide-up">
          <nav className="container py-3 flex flex-col gap-1">
            {[...PRIMARY_LINKS, ...SECONDARY_LINKS].map((link) => (
              <Link key={link.href} href={link.href}>
                <span className={cn(
                  "flex items-center px-4 py-3 text-sm font-heading font-semibold uppercase tracking-wide rounded-xl transition-colors cursor-pointer",
                  (link as { accent?: boolean }).accent
                    ? "bg-[oklch(0.78_0.16_85/0.15)] text-[oklch(0.78_0.16_85)] border border-[oklch(0.78_0.16_85/0.3)]"
                    : location === link.href
                      ? "text-[oklch(0.78_0.16_85)] bg-[oklch(0.78_0.16_85/0.1)]"
                      : "text-[oklch(0.65_0.01_90)] hover:text-white hover:bg-white/5"
                )}>
                  {link.label}
                </span>
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
