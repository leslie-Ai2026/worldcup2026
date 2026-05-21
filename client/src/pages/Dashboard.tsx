import { useState, useEffect, useRef } from "react";
import { Link } from "wouter";
import { trpc } from "@/lib/trpc";
import { Loader2, ChevronRight, Send, RefreshCw } from "lucide-react";
import { cn } from "@/lib/utils";
import { useVoterId } from "@/hooks/useVoterId";
import { toast } from "sonner";

// ─── Countdown ────────────────────────────────────────────────────────────────
const WORLD_CUP_START = new Date("2026-06-11T20:00:00-05:00");

function useCountdown(target: Date) {
  const calc = () => {
    const diff = target.getTime() - Date.now();
    if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0, started: true };
    return {
      days: Math.floor(diff / 86400000),
      hours: Math.floor((diff % 86400000) / 3600000),
      minutes: Math.floor((diff % 3600000) / 60000),
      seconds: Math.floor((diff % 60000) / 1000),
      started: false,
    };
  };
  const [time, setTime] = useState(calc);
  useEffect(() => {
    const id = setInterval(() => setTime(calc()), 1000);
    return () => clearInterval(id);
  }, []);
  return time;
}

// ─── Hero Section ─────────────────────────────────────────────────────────────
function HeroSection() {
  const { days, hours, minutes, seconds, started } = useCountdown(WORLD_CUP_START);

  return (
    <section className="relative overflow-hidden min-h-[88vh] flex flex-col justify-end">
      {/* Stadium SVG silhouette background */}
      <div className="absolute inset-0 z-0">
        {/* Sky gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-[oklch(0.35_0.12_240)] via-[oklch(0.22_0.08_200)] to-[oklch(0.08_0.012_145)]" />
        {/* Crowd/stadium silhouette */}
        <svg className="absolute bottom-0 left-0 right-0 w-full" viewBox="0 0 1440 320" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
          {/* Back stands */}
          <path d="M0,200 L0,320 L1440,320 L1440,200 Q1200,160 960,180 Q720,200 480,175 Q240,150 0,200Z" fill="oklch(0.06 0.01 145)" />
          {/* Mid stands with crowd bumps */}
          <path d="M0,240 Q60,220 120,235 Q180,250 240,228 Q300,206 360,232 Q420,258 480,235 Q540,212 600,238 Q660,264 720,240 Q780,216 840,242 Q900,268 960,244 Q1020,220 1080,246 Q1140,272 1200,248 Q1260,224 1320,250 Q1380,276 1440,252 L1440,320 L0,320 Z" fill="oklch(0.09 0.012 145)" />
          {/* Pitch edge */}
          <rect x="0" y="305" width="1440" height="15" fill="oklch(0.32 0.14 145)" />
          {/* Pitch markings */}
          <rect x="0" y="308" width="1440" height="2" fill="oklch(0.42 0.16 145)" opacity="0.6" />
          <rect x="620" y="305" width="200" height="15" fill="oklch(0.38 0.15 145)" opacity="0.5" />
          <circle cx="720" cy="312" r="30" fill="none" stroke="oklch(0.42 0.16 145)" strokeWidth="1.5" opacity="0.4" />
        </svg>

        {/* Floodlights */}
        <div className="absolute top-8 left-12 w-1 h-32 bg-white/20 rounded-full" style={{ boxShadow: "0 0 40px 8px rgba(255,255,255,0.08)" }} />
        <div className="absolute top-8 right-12 w-1 h-32 bg-white/20 rounded-full" style={{ boxShadow: "0 0 40px 8px rgba(255,255,255,0.08)" }} />
        <div className="absolute top-6 left-1/4 w-0.5 h-24 bg-white/15 rounded-full" />
        <div className="absolute top-6 right-1/4 w-0.5 h-24 bg-white/15 rounded-full" />

        {/* Light beams from floodlights */}
        <div className="absolute top-8 left-12 w-48 h-64 opacity-5"
          style={{ background: "conic-gradient(from 120deg at 0% 0%, transparent 0deg, white 5deg, transparent 10deg)", transformOrigin: "top left" }} />
        <div className="absolute top-8 right-12 w-48 h-64 opacity-5"
          style={{ background: "conic-gradient(from 60deg at 100% 0%, transparent 0deg, white 5deg, transparent 10deg)", transformOrigin: "top right" }} />

        {/* Atmospheric glow */}
        <div className="absolute bottom-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[200px] rounded-full bg-[oklch(0.38_0.14_145/0.12)] blur-3xl" />
      </div>

      {/* Waving flags strip */}
      <div className="absolute top-0 left-0 right-0 z-10 py-2 overflow-hidden">
        <div className="flex gap-3 animate-[ticker_20s_linear_infinite]" style={{ width: "max-content" }}>
          {["🇧🇷","🇫🇷","🇦🇷","🇩🇪","🇪🇸","🇵🇹","🇬🇧","🇺🇸","🇲🇽","🇨🇦","🇯🇵","🇰🇷","🇳🇱","🇧🇪","🇮🇹","🇭🇷",
            "🇧🇷","🇫🇷","🇦🇷","🇩🇪","🇪🇸","🇵🇹","🇬🇧","🇺🇸","🇲🇽","🇨🇦","🇯🇵","🇰🇷","🇳🇱","🇧🇪","🇮🇹","🇭🇷"].map((flag, i) => (
            <span key={i} className="text-2xl opacity-60 hover:opacity-100 transition-opacity" style={{ animation: `flag-wave ${2 + (i % 3) * 0.5}s ease-in-out ${i * 0.15}s infinite` }}>
              {flag}
            </span>
          ))}
        </div>
      </div>

      {/* Main hero content */}
      <div className="relative z-10 container pb-12 pt-24">
        {/* Pre-headline badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[oklch(0.78_0.16_85/0.15)] border border-[oklch(0.78_0.16_85/0.35)] mb-6 animate-fade-in">
          <span className="w-2 h-2 rounded-full bg-[oklch(0.78_0.16_85)] animate-pulse" />
          <span className="text-xs font-bold tracking-[0.2em] uppercase text-[oklch(0.78_0.16_85)]">
            {started ? "⚽ Tournament Underway" : "USA · Canada · Mexico · June 11, 2026"}
          </span>
        </div>

        {/* Main headline — Bebas Neue impact */}
        <h1 className="font-display text-[clamp(3.5rem,10vw,9rem)] leading-none mb-4 animate-slide-up">
          <span className="text-white block">THE WORLD</span>
          <span className="gold-text block">STOPS.</span>
          <span className="text-white block">JUNE 11.</span>
        </h1>

        {/* Subline */}
        <p className="text-base sm:text-lg text-[oklch(0.70_0.01_90)] max-w-lg mb-8 leading-relaxed animate-slide-up" style={{ animationDelay: "80ms" }}>
          Your AI-powered home for <span className="text-white font-semibold">live scores</span>,{" "}
          <span className="text-white font-semibold">match predictions</span>, and{" "}
          <span className="text-white font-semibold">fan culture</span> — all in one place.
        </p>

        {/* CTA row */}
        <div className="flex flex-wrap gap-3 mb-10 animate-slide-up" style={{ animationDelay: "120ms" }}>
          <Link href="/matches">
            <span className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[oklch(0.78_0.16_85)] hover:bg-[oklch(0.88_0.14_90)] text-[oklch(0.10_0.02_85)] font-heading font-bold uppercase tracking-wide text-sm transition-all duration-200 active:scale-[0.97] shadow-xl shadow-[oklch(0.78_0.16_85/0.3)] cursor-pointer">
              ⚽ View Matches
            </span>
          </Link>
          <Link href="/golden-boot">
            <span className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white/10 hover:bg-white/15 border border-white/20 text-white font-heading font-bold uppercase tracking-wide text-sm transition-all duration-200 active:scale-[0.97] cursor-pointer">
              🥾 Golden Boot
            </span>
          </Link>
        </div>

        {/* Countdown */}
        {!started ? (
          <div className="animate-slide-up" style={{ animationDelay: "160ms" }}>
            <div className="text-xs font-bold tracking-[0.2em] uppercase text-[oklch(0.52_0.01_90)] mb-3">Kickoff in</div>
            <div className="flex items-end gap-3 sm:gap-5">
              {[
                { value: days, label: "Days" },
                { value: hours, label: "Hrs" },
                { value: minutes, label: "Min" },
                { value: seconds, label: "Sec" },
              ].map(({ value, label }, i) => (
                <div key={label} className="flex flex-col items-center">
                  <div className="w-14 h-14 sm:w-18 sm:h-18 md:w-20 md:h-20 rounded-xl bg-[oklch(0.11_0.014_145/0.9)] border border-[oklch(0.78_0.16_85/0.25)] flex items-center justify-center pulse-glow backdrop-blur-sm">
                    <span className="font-display text-2xl sm:text-3xl md:text-4xl text-white tabular-nums">
                      {String(value).padStart(2, "0")}
                    </span>
                  </div>
                  <span className="mt-1.5 text-[9px] font-bold tracking-[0.2em] uppercase text-[oklch(0.78_0.16_85/0.7)]">{label}</span>
                  {i < 3 && <span className="absolute font-display text-2xl text-[oklch(0.78_0.16_85/0.4)] -mr-6 mt-1 hidden sm:block">:</span>}
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="font-display text-3xl text-[oklch(0.78_0.16_85)]">⚽ The Tournament Has Begun!</div>
        )}
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[oklch(0.08_0.012_145)] to-transparent z-10 pointer-events-none" />
    </section>
  );
}

// ─── Match Center ─────────────────────────────────────────────────────────────
const FEATURED_MATCHES = [
  { id: 1, group: "Group A", homeTeam: "USA",       homeFlag: "🇺🇸", awayTeam: "Mexico",    awayFlag: "🇲🇽", time: "2026-06-11T20:00:00-05:00", venue: "MetLife Stadium",   status: "upcoming", homeScore: null, awayScore: null },
  { id: 2, group: "Group B", homeTeam: "Brazil",    homeFlag: "🇧🇷", awayTeam: "Argentina", awayFlag: "🇦🇷", time: "2026-06-12T14:00:00-05:00", venue: "Rose Bowl, LA",     status: "upcoming", homeScore: null, awayScore: null },
  { id: 3, group: "Group C", homeTeam: "France",    homeFlag: "🇫🇷", awayTeam: "England",   awayFlag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿", time: "2026-06-12T17:00:00-05:00", venue: "AT&T Stadium",      status: "upcoming", homeScore: null, awayScore: null },
  { id: 4, group: "Group D", homeTeam: "Germany",   homeFlag: "🇩🇪", awayTeam: "Spain",     awayFlag: "🇪🇸", time: "2026-06-13T12:00:00-05:00", venue: "SoFi Stadium, LA",  status: "upcoming", homeScore: null, awayScore: null },
  { id: 5, group: "Group E", homeTeam: "Portugal",  homeFlag: "🇵🇹", awayTeam: "Morocco",   awayFlag: "🇲🇦", time: "2026-06-13T15:00:00-05:00", venue: "Levi's Stadium",    status: "upcoming", homeScore: null, awayScore: null },
  { id: 6, group: "Group F", homeTeam: "Japan",     homeFlag: "🇯🇵", awayTeam: "South Korea", awayFlag: "🇰🇷", time: "2026-06-14T09:00:00-05:00", venue: "Arrowhead Stadium", status: "upcoming", homeScore: null, awayScore: null },
];

function MatchCard({ match }: { match: typeof FEATURED_MATCHES[0] }) {
  const localTime = new Date(match.time).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  const localDate = new Date(match.time).toLocaleDateString([], { month: "short", day: "numeric" });

  return (
    <div className="snap-start shrink-0 w-64 sm:w-72 rounded-2xl border border-[oklch(0.22_0.018_145)] bg-[oklch(0.11_0.014_145)] overflow-hidden card-glow hover:border-[oklch(0.78_0.16_85/0.3)] transition-all duration-300 cursor-pointer">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-[oklch(0.09_0.012_145)] border-b border-[oklch(0.22_0.018_145)]">
        <span className="text-[10px] font-bold tracking-widest uppercase text-[oklch(0.78_0.16_85)]">{match.group}</span>
        {match.status === "live" ? (
          <span className="flex items-center gap-1 text-[10px] font-bold text-red-400">
            <span className="w-1.5 h-1.5 rounded-full bg-red-500 live-pulse" />LIVE
          </span>
        ) : (
          <span className="text-[10px] text-[oklch(0.52_0.01_90)]">{localDate}</span>
        )}
      </div>

      {/* Teams */}
      <div className="px-4 py-4">
        <div className="flex items-center justify-between gap-2">
          {/* Home */}
          <div className="flex flex-col items-center gap-1.5 flex-1">
            <span className="text-3xl">{match.homeFlag}</span>
            <span className="text-xs font-heading font-semibold text-white text-center leading-tight">{match.homeTeam}</span>
          </div>

          {/* Score / Time */}
          <div className="flex flex-col items-center px-3 shrink-0">
            {match.status === "live" ? (
              <div className="font-display text-3xl text-white">
                {match.homeScore} <span className="text-[oklch(0.78_0.16_85)]">–</span> {match.awayScore}
              </div>
            ) : (
              <>
                <div className="font-display text-xl text-[oklch(0.78_0.16_85)]">{localTime}</div>
                <div className="text-[9px] font-bold tracking-widest uppercase text-[oklch(0.52_0.01_90)] mt-0.5">Kickoff</div>
              </>
            )}
          </div>

          {/* Away */}
          <div className="flex flex-col items-center gap-1.5 flex-1">
            <span className="text-3xl">{match.awayFlag}</span>
            <span className="text-xs font-heading font-semibold text-white text-center leading-tight">{match.awayTeam}</span>
          </div>
        </div>

        <div className="mt-3 text-center text-[10px] text-[oklch(0.45_0.01_90)] truncate">{match.venue}</div>
      </div>
    </div>
  );
}

function MatchCenterSection() {
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <section>
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="font-display text-2xl sm:text-3xl text-white tracking-wide">MATCH CENTER</h2>
          <p className="text-xs text-[oklch(0.52_0.01_90)] mt-0.5">Opening fixtures · Group Stage</p>
        </div>
        <Link href="/matches">
          <span className="flex items-center gap-1 text-xs font-heading font-semibold uppercase tracking-wide text-[oklch(0.78_0.16_85)] hover:text-[oklch(0.88_0.14_90)] transition-colors cursor-pointer">
            Full Schedule <ChevronRight className="w-3.5 h-3.5" />
          </span>
        </Link>
      </div>

      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto snap-x-mandatory pb-3 -mx-4 px-4 sm:-mx-0 sm:px-0"
        style={{ scrollbarWidth: "none" }}
      >
        {FEATURED_MATCHES.map((match) => (
          <MatchCard key={match.id} match={match} />
        ))}
      </div>
    </section>
  );
}

// ─── Star Players Spotlight ───────────────────────────────────────────────────
const STAR_PLAYERS = [
  { name: "Kylian Mbappé",   country: "France",      flag: "🇫🇷", club: "Real Madrid",  goals: 0, emoji: "⚡", color: "from-blue-900/60 to-blue-950/80", accentColor: "text-blue-400" },
  { name: "Lionel Messi",    country: "Argentina",   flag: "🇦🇷", club: "Inter Miami",  goals: 0, emoji: "🐐", color: "from-sky-900/60 to-sky-950/80",  accentColor: "text-sky-400" },
  { name: "Jude Bellingham", country: "England",     flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿", club: "Real Madrid",  goals: 0, emoji: "🎯", color: "from-red-900/60 to-red-950/80",  accentColor: "text-red-400" },
  { name: "Vinicius Jr.",    country: "Brazil",      flag: "🇧🇷", club: "Real Madrid",  goals: 0, emoji: "🔥", color: "from-yellow-900/60 to-yellow-950/80", accentColor: "text-yellow-400" },
  { name: "Cristiano Ronaldo", country: "Portugal", flag: "🇵🇹", club: "Al Nassr",     goals: 0, emoji: "💪", color: "from-green-900/60 to-green-950/80", accentColor: "text-green-400" },
];

function StarPlayersSection() {
  return (
    <section>
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="font-display text-2xl sm:text-3xl text-white tracking-wide">STAR PLAYERS</h2>
          <p className="text-xs text-[oklch(0.52_0.01_90)] mt-0.5">Ones to watch at 2026</p>
        </div>
        <Link href="/golden-boot">
          <span className="flex items-center gap-1 text-xs font-heading font-semibold uppercase tracking-wide text-[oklch(0.78_0.16_85)] hover:text-[oklch(0.88_0.14_90)] transition-colors cursor-pointer">
            Golden Boot <ChevronRight className="w-3.5 h-3.5" />
          </span>
        </Link>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        {STAR_PLAYERS.map((player, i) => (
          <div
            key={player.name}
            className={cn(
              "relative rounded-2xl overflow-hidden border border-[oklch(0.22_0.018_145)] bg-gradient-to-b p-4 card-glow group cursor-pointer animate-slide-up",
              player.color
            )}
            style={{ animationDelay: `${i * 60}ms` }}
          >
            {/* Big emoji avatar */}
            <div className="text-5xl mb-3 text-center group-hover:scale-110 transition-transform duration-300">
              {player.emoji}
            </div>
            <div className="text-center">
              <div className="font-heading font-bold text-white text-sm leading-tight mb-0.5">{player.name}</div>
              <div className="flex items-center justify-center gap-1 text-xs text-[oklch(0.52_0.01_90)]">
                <span>{player.flag}</span>
                <span>{player.country}</span>
              </div>
              <div className="text-[10px] text-[oklch(0.45_0.01_90)] mt-0.5">{player.club}</div>
            </div>
            {/* Goals badge */}
            <div className="absolute top-2 right-2 flex flex-col items-center">
              <span className={cn("font-display text-xl leading-none", player.accentColor)}>{player.goals}</span>
              <span className="text-[8px] font-bold tracking-widest uppercase text-[oklch(0.45_0.01_90)]">Goals</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

// ─── Latest News Stream ───────────────────────────────────────────────────────
const NEWS_ITEMS = [
  { id: 1, category: "Preview",    emoji: "🔥", headline: "Brazil vs Argentina: The Rivalry That Stops the World", time: "2h ago",  hot: true  },
  { id: 2, category: "AI Predict", emoji: "🤖", headline: "AI Gives France 28% Chance of Back-to-Back World Cup Titles", time: "4h ago",  hot: false },
  { id: 3, category: "Injury",     emoji: "🚑", headline: "Mbappé Fit and Ready for Opening Clash Against Poland", time: "6h ago",  hot: false },
  { id: 4, category: "Venue",      emoji: "🏟️", headline: "MetLife Stadium: Inside the 82,500-Seat Opening Day Fortress", time: "8h ago",  hot: false },
  { id: 5, category: "Transfer",   emoji: "📋", headline: "Messi's Final World Cup: The GOAT's Last Dance in North America", time: "10h ago", hot: true  },
  { id: 6, category: "Stats",      emoji: "📊", headline: "2026 Format Explained: Why 48 Teams Changes Everything", time: "1d ago",  hot: false },
];

const CATEGORY_COLORS: Record<string, string> = {
  Preview:    "bg-[oklch(0.78_0.16_85/0.15)] text-[oklch(0.78_0.16_85)] border-[oklch(0.78_0.16_85/0.3)]",
  "AI Predict": "bg-[oklch(0.62_0.14_240/0.15)] text-[oklch(0.72_0.14_240)] border-[oklch(0.62_0.14_240/0.3)]",
  Injury:     "bg-[oklch(0.58_0.24_25/0.15)] text-[oklch(0.68_0.22_25)] border-[oklch(0.58_0.24_25/0.3)]",
  Venue:      "bg-[oklch(0.38_0.14_145/0.15)] text-[oklch(0.55_0.14_145)] border-[oklch(0.38_0.14_145/0.3)]",
  Transfer:   "bg-[oklch(0.62_0.14_300/0.15)] text-[oklch(0.72_0.14_300)] border-[oklch(0.62_0.14_300/0.3)]",
  Stats:      "bg-[oklch(0.52_0.01_90/0.15)] text-[oklch(0.65_0.01_90)] border-[oklch(0.52_0.01_90/0.3)]",
};

function NewsStream() {
  return (
    <section>
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-display text-2xl sm:text-3xl text-white tracking-wide">LATEST NEWS</h2>
        <span className="text-[10px] font-bold tracking-widest uppercase text-[oklch(0.52_0.01_90)]">Updated hourly</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {NEWS_ITEMS.map((item, i) => (
          <div
            key={item.id}
            className="group rounded-2xl border border-[oklch(0.22_0.018_145)] bg-[oklch(0.11_0.014_145)] p-4 card-glow cursor-pointer hover:border-[oklch(0.78_0.16_85/0.25)] transition-all duration-300 animate-slide-up"
            style={{ animationDelay: `${i * 50}ms` }}
          >
            <div className="flex items-start justify-between gap-2 mb-2">
              <span className={cn("text-[10px] font-bold px-2 py-0.5 rounded-full border", CATEGORY_COLORS[item.category] ?? "bg-secondary text-muted-foreground border-border")}>
                {item.category}
              </span>
              {item.hot && (
                <span className="text-[10px] font-bold text-red-400 bg-red-400/10 border border-red-400/20 px-2 py-0.5 rounded-full">🔥 HOT</span>
              )}
            </div>
            <div className="flex items-start gap-2">
              <span className="text-xl shrink-0 mt-0.5">{item.emoji}</span>
              <h3 className="text-sm font-heading font-semibold text-white leading-snug group-hover:text-[oklch(0.88_0.14_90)] transition-colors">
                {item.headline}
              </h3>
            </div>
            <div className="mt-2 text-[10px] text-[oklch(0.45_0.01_90)]">{item.time}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

// ─── Trophy Predictor (Voting) ────────────────────────────────────────────────
const CHAMPION_TEAMS = [
  { id: "Brazil",    flag: "🇧🇷", label: "Brazil" },
  { id: "France",    flag: "🇫🇷", label: "France" },
  { id: "Argentina", flag: "🇦🇷", label: "Argentina" },
  { id: "England",   flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿", label: "England" },
  { id: "Spain",     flag: "🇪🇸", label: "Spain" },
  { id: "Germany",   flag: "🇩🇪", label: "Germany" },
  { id: "Portugal",  flag: "🇵🇹", label: "Portugal" },
  { id: "USA",       flag: "🇺🇸", label: "USA" },
];

function TrophyPredictor() {
  const voterId = useVoterId();
  const { data: resultsData, refetch: refetchResults } = trpc.voting.getResults.useQuery({ category: "champion" }, { staleTime: 30000 });
  const { data: myVoteData, refetch: refetchMyVote } = trpc.voting.getMyVote.useQuery({ category: "champion", voterId }, { staleTime: 30000, enabled: voterId.length > 0 });
  const data = resultsData ? { ...resultsData, userVote: myVoteData?.choice ?? null } : undefined;
  const refetch = () => { refetchResults(); refetchMyVote(); };
  const castVote = trpc.voting.castVote.useMutation({
    onSuccess: () => { refetch(); toast.success("Vote cast! 🏆"); },
    onError: (e) => toast.error(e.message),
  });

  const myVote = data?.userVote ?? null;
  const totalVotes = data?.total ?? 0;

  return (
    <div className="rounded-2xl border border-[oklch(0.22_0.018_145)] bg-[oklch(0.11_0.014_145)] overflow-hidden card-glow">
      <div className="px-5 py-4 border-b border-[oklch(0.22_0.018_145)] bg-[oklch(0.09_0.012_145)]">
        <div className="flex items-center gap-2.5">
          <span className="text-2xl">🏆</span>
          <div>
            <h3 className="font-heading font-bold text-white text-sm uppercase tracking-wide">Trophy Predictor</h3>
            <p className="text-[10px] text-[oklch(0.52_0.01_90)]">Who will win 2026? · {totalVotes} votes cast</p>
          </div>
        </div>
      </div>
      <div className="p-4 grid grid-cols-4 gap-2">
        {CHAMPION_TEAMS.map((team) => {
          const result = data?.results?.find((r: { choice: string; percentage: number }) => r.choice === team.id);
          const pct = result?.percentage ?? 0;
          const isMyVote = myVote === team.id;
          return (
            <button
              key={team.id}
              onClick={() => !myVote && castVote.mutate({ category: "champion", choice: team.id, voterId })}
              disabled={!!myVote || castVote.isPending}
              className={cn(
                "relative flex flex-col items-center gap-1 p-2.5 rounded-xl border transition-all duration-200 group",
                isMyVote
                  ? "border-[oklch(0.78_0.16_85)] bg-[oklch(0.78_0.16_85/0.15)]"
                  : myVote
                    ? "border-[oklch(0.22_0.018_145)] bg-[oklch(0.09_0.012_145)] opacity-60 cursor-not-allowed"
                    : "border-[oklch(0.22_0.018_145)] bg-[oklch(0.09_0.012_145)] hover:border-[oklch(0.78_0.16_85/0.5)] hover:bg-[oklch(0.78_0.16_85/0.08)] cursor-pointer active:scale-95"
              )}
            >
              <span className="text-2xl group-hover:scale-110 transition-transform">{team.flag}</span>
              <span className="text-[9px] font-bold text-white text-center leading-tight">{team.label}</span>
              {myVote && (
                <span className={cn("text-[10px] font-bold", isMyVote ? "text-[oklch(0.78_0.16_85)]" : "text-[oklch(0.45_0.01_90)]")}>
                  {pct}%
                </span>
              )}
              {isMyVote && <span className="absolute -top-1 -right-1 text-[10px]">✓</span>}
            </button>
          );
        })}
      </div>
      {!myVote && <p className="px-4 pb-3 text-[10px] text-[oklch(0.45_0.01_90)] text-center">Tap a team to cast your vote</p>}
    </div>
  );
}

// ─── Golden Boot Predictor (Voting) ──────────────────────────────────────────
const BOOT_PLAYERS = [
  { id: "mbappe",    flag: "🇫🇷", label: "Mbappé" },
  { id: "messi",     flag: "🇦🇷", label: "Messi" },
  { id: "bellingham",flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿", label: "Bellingham" },
  { id: "vinicius",  flag: "🇧🇷", label: "Vinicius Jr." },
  { id: "ronaldo",   flag: "🇵🇹", label: "Ronaldo" },
  { id: "haaland",   flag: "🇳🇴", label: "Haaland" },
  { id: "salah",     flag: "🇪🇬", label: "Salah" },
  { id: "kane",      flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿", label: "Kane" },
];

function GoldenBootPredictor() {
  const voterId = useVoterId();
  const { data: resultsData2, refetch: refetchResults2 } = trpc.voting.getResults.useQuery({ category: "best_player" }, { staleTime: 30000 });
  const { data: myVoteData2, refetch: refetchMyVote2 } = trpc.voting.getMyVote.useQuery({ category: "best_player", voterId }, { staleTime: 30000, enabled: voterId.length > 0 });
  const data = resultsData2 ? { ...resultsData2, userVote: myVoteData2?.choice ?? null } : undefined;
  const refetch = () => { refetchResults2(); refetchMyVote2(); };
  const castVote = trpc.voting.castVote.useMutation({
    onSuccess: () => { refetch(); toast.success("Vote cast! 🥾"); },
    onError: (e) => toast.error(e.message),
  });

  const myVote = data?.userVote ?? null;
  const totalVotes = data?.total ?? 0;

  return (
    <div className="rounded-2xl border border-[oklch(0.22_0.018_145)] bg-[oklch(0.11_0.014_145)] overflow-hidden card-glow">
      <div className="px-5 py-4 border-b border-[oklch(0.22_0.018_145)] bg-[oklch(0.09_0.012_145)]">
        <div className="flex items-center gap-2.5">
          <span className="text-2xl">🥾</span>
          <div>
            <h3 className="font-heading font-bold text-white text-sm uppercase tracking-wide">Golden Boot Predictor</h3>
            <p className="text-[10px] text-[oklch(0.52_0.01_90)]">Top scorer poll · {totalVotes} votes cast</p>
          </div>
        </div>
      </div>
      <div className="p-4 grid grid-cols-4 gap-2">
        {BOOT_PLAYERS.map((player) => {
          const result = data?.results?.find((r: { choice: string; percentage: number }) => r.choice === player.id);
          const pct = result?.percentage ?? 0;
          const isMyVote = myVote === player.id;
          return (
            <button
              key={player.id}
              onClick={() => !myVote && castVote.mutate({ category: "best_player", choice: player.id, voterId })}
              disabled={!!myVote || castVote.isPending}
              className={cn(
                "relative flex flex-col items-center gap-1 p-2.5 rounded-xl border transition-all duration-200 group",
                isMyVote
                  ? "border-[oklch(0.78_0.16_85)] bg-[oklch(0.78_0.16_85/0.15)]"
                  : myVote
                    ? "border-[oklch(0.22_0.018_145)] bg-[oklch(0.09_0.012_145)] opacity-60 cursor-not-allowed"
                    : "border-[oklch(0.22_0.018_145)] bg-[oklch(0.09_0.012_145)] hover:border-[oklch(0.78_0.16_85/0.5)] hover:bg-[oklch(0.78_0.16_85/0.08)] cursor-pointer active:scale-95"
              )}
            >
              <span className="text-2xl group-hover:scale-110 transition-transform">{player.flag}</span>
              <span className="text-[9px] font-bold text-white text-center leading-tight">{player.label}</span>
              {myVote && (
                <span className={cn("text-[10px] font-bold", isMyVote ? "text-[oklch(0.78_0.16_85)]" : "text-[oklch(0.45_0.01_90)]")}>
                  {pct}%
                </span>
              )}
              {isMyVote && <span className="absolute -top-1 -right-1 text-[10px]">✓</span>}
            </button>
          );
        })}
      </div>
      {!myVote && <p className="px-4 pb-3 text-[10px] text-[oklch(0.45_0.01_90)] text-center">Tap a player to cast your vote</p>}
    </div>
  );
}

// ─── Fan Comments Feed ────────────────────────────────────────────────────────
function FanCommentsFeed() {
  const voterId = useVoterId();
  const [text, setText] = useState("");
  const { data, refetch } = trpc.comments.getComments.useQuery(undefined, { staleTime: 15000 });
  const addComment = trpc.comments.addComment.useMutation({
    onSuccess: () => { refetch(); setText(""); toast.success("Comment posted! 🗣️"); },
    onError: (e) => toast.error(e.message),
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = text.trim();
    if (!trimmed || trimmed.length < 2) return;
    addComment.mutate({ content: trimmed, voterId });
  };

  return (
    <section>
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="font-display text-2xl sm:text-3xl text-white tracking-wide">FAN WALL</h2>
          <p className="text-xs text-[oklch(0.52_0.01_90)] mt-0.5">Anonymous match trash-talk · No login needed</p>
        </div>
        <button onClick={() => refetch()} className="p-2 rounded-lg text-[oklch(0.52_0.01_90)] hover:text-white hover:bg-white/5 transition-colors">
          <RefreshCw className="w-4 h-4" />
        </button>
      </div>

      <div className="rounded-2xl border border-[oklch(0.22_0.018_145)] bg-[oklch(0.11_0.014_145)] overflow-hidden card-glow">
        {/* Comment input */}
        <form onSubmit={handleSubmit} className="flex gap-2 p-4 border-b border-[oklch(0.22_0.018_145)]">
          <div className="w-8 h-8 rounded-full bg-[oklch(0.78_0.16_85/0.15)] border border-[oklch(0.78_0.16_85/0.3)] flex items-center justify-center shrink-0">
            <span className="text-sm">⚽</span>
          </div>
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Who's winning? Drop your prediction..."
            maxLength={200}
            className="flex-1 bg-[oklch(0.09_0.012_145)] border border-[oklch(0.22_0.018_145)] rounded-xl px-3 py-2 text-sm text-white placeholder:text-[oklch(0.40_0.01_90)] outline-none focus:border-[oklch(0.78_0.16_85/0.5)] transition-colors"
          />
          <button
            type="submit"
            disabled={!text.trim() || addComment.isPending}
            className="shrink-0 w-9 h-9 rounded-xl bg-[oklch(0.78_0.16_85)] hover:bg-[oklch(0.88_0.14_90)] text-[oklch(0.10_0.02_85)] flex items-center justify-center transition-all duration-200 active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {addComment.isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
          </button>
        </form>

        {/* Comments list */}
        <div className="divide-y divide-[oklch(0.22_0.018_145)] max-h-80 overflow-y-auto">
          {!data?.comments?.length ? (
            <div className="py-10 text-center text-[oklch(0.45_0.01_90)] text-sm">
              <div className="text-3xl mb-2">🗣️</div>
              Be the first to drop a prediction!
            </div>
          ) : (
            data.comments.map((comment, i) => (
              <div key={comment.id} className="flex gap-3 px-4 py-3 hover:bg-white/[0.02] transition-colors animate-slide-up" style={{ animationDelay: `${i * 30}ms` }}>
                <div className="w-7 h-7 rounded-full bg-[oklch(0.16_0.018_145)] border border-[oklch(0.22_0.018_145)] flex items-center justify-center shrink-0 mt-0.5">
                  <span className="text-xs">⚽</span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="text-[10px] font-bold text-[oklch(0.78_0.16_85)]">Fan #{comment.id}</span>
                    <span className="text-[9px] text-[oklch(0.40_0.01_90)]">
                      {new Date(comment.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                    </span>
                  </div>
                  <p className="text-sm text-[oklch(0.80_0.005_90)] leading-relaxed break-words">{comment.content}</p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}

// ─── AI Champion Predictor (compact) ─────────────────────────────────────────
const TEAM_FLAGS: Record<string, string> = {
  Brazil: "🇧🇷", France: "🇫🇷", England: "🏴󠁧󠁢󠁥󠁮󠁧󠁿", Argentina: "🇦🇷",
  Spain: "🇪🇸", Germany: "🇩🇪", Portugal: "🇵🇹",
};

function AIChampionPredictor() {
  const { data, isLoading, error, refetch } = trpc.worldcup.championPredict.useQuery(undefined, {
    staleTime: 1000 * 60 * 10, retry: 1,
  });

  return (
    <div className="rounded-2xl border border-[oklch(0.22_0.018_145)] bg-[oklch(0.11_0.014_145)] overflow-hidden card-glow">
      <div className="flex items-center justify-between px-5 py-4 border-b border-[oklch(0.22_0.018_145)] bg-[oklch(0.09_0.012_145)]">
        <div className="flex items-center gap-2.5">
          <span className="text-xl">🤖</span>
          <div>
            <h3 className="font-heading font-bold text-white text-sm uppercase tracking-wide">AI Champion Predictor</h3>
            <p className="text-[10px] text-[oklch(0.52_0.01_90)]">Powered by Gemini AI</p>
          </div>
        </div>
        <button onClick={() => refetch()} className="p-1.5 rounded-lg text-[oklch(0.52_0.01_90)] hover:text-[oklch(0.78_0.16_85)] hover:bg-[oklch(0.78_0.16_85/0.08)] transition-colors">
          <RefreshCw className="w-3.5 h-3.5" />
        </button>
      </div>
      <div className="p-4 space-y-3">
        {isLoading && (
          <div className="flex items-center justify-center py-6 gap-2">
            <Loader2 className="w-5 h-5 animate-spin text-[oklch(0.78_0.16_85)]" />
            <span className="text-sm text-[oklch(0.52_0.01_90)]">Analyzing...</span>
          </div>
        )}
        {error && (
          <div className="text-center py-4">
            <p className="text-xs text-red-400 mb-2">Failed to load</p>
            <button onClick={() => refetch()} className="text-xs text-[oklch(0.78_0.16_85)] hover:underline">Retry</button>
          </div>
        )}
        {data?.predictions?.map((team, i) => (
          <div key={team.team} className="animate-slide-up" style={{ animationDelay: `${i * 60}ms` }}>
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center gap-1.5">
                <span className="text-base">{TEAM_FLAGS[team.team] ?? "🏳"}</span>
                <span className="text-xs font-heading font-semibold text-white">{team.team}</span>
                {i === 0 && <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-[oklch(0.78_0.16_85/0.2)] text-[oklch(0.78_0.16_85)]">TOP</span>}
              </div>
              <span className="text-xs font-bold text-[oklch(0.78_0.16_85)]">{team.probability}%</span>
            </div>
            <div className="h-1.5 rounded-full bg-[oklch(0.16_0.018_145)] overflow-hidden">
              <div
                className={cn("h-full rounded-full transition-all duration-1000 ease-out",
                  i === 0 ? "bg-gradient-to-r from-[oklch(0.65_0.18_80)] to-[oklch(0.88_0.14_90)]"
                  : "bg-gradient-to-r from-[oklch(0.38_0.14_145)] to-[oklch(0.50_0.16_145)]")}
                style={{ width: `${team.probability}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function Dashboard() {
  return (
    <div>
      {/* Hero — full bleed, no container */}
      <HeroSection />

      <div className="container py-8 md:py-12 space-y-12">
        {/* Match Center */}
        <MatchCenterSection />

        {/* Star Players */}
        <StarPlayersSection />

        {/* News + AI Predictor side by side on large screens */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <NewsStream />
          </div>
          <div className="space-y-4">
            <AIChampionPredictor />
          </div>
        </div>

        {/* Fan Engagement */}
        <div>
          <div className="flex items-center gap-3 mb-6">
            <h2 className="font-display text-2xl sm:text-3xl text-white tracking-wide">FAN ZONE</h2>
            <div className="flex-1 h-px bg-[oklch(0.22_0.018_145)]" />
            <span className="text-[10px] font-bold tracking-widest uppercase text-[oklch(0.52_0.01_90)]">Vote · Predict · Trash-talk</span>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <TrophyPredictor />
            <GoldenBootPredictor />
          </div>
          <FanCommentsFeed />
        </div>
      </div>
    </div>
  );
}
