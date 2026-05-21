import { useState, useEffect } from "react";
import { trpc } from "@/lib/trpc";
import { useVoterId } from "@/hooks/useVoterId";
import { Link, useLocation } from "wouter";

function useCountdown() {
  const target = new Date("2026-06-11T20:00:00Z").getTime();
  const calc = () => {
    const diff = Math.max(0, target - Date.now());
    return { days: Math.floor(diff / 86400000), hours: Math.floor((diff % 86400000) / 3600000), minutes: Math.floor((diff % 3600000) / 60000), seconds: Math.floor((diff % 60000) / 1000) };
  };
  const [time, setTime] = useState(calc);
  useEffect(() => { const id = setInterval(() => setTime(calc()), 1000); return () => clearInterval(id); }, []);
  return time;
}
const pad = (n: number) => String(n).padStart(2, "0");
const flagUrl = (code: string) => `https://flagcdn.com/w80/${code.toLowerCase()}.png`;

const NEWS = [
  { id: 1, tag: "PREVIEW", tagColor: "#B8860B", title: "Mbappé's Real Madrid form signals World Cup dominance", summary: "After a record-breaking La Liga season, Kylian Mbappé arrives at the 2026 World Cup as the undisputed favourite to claim the Golden Boot.", img: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=1200&q=85", time: "2h ago" },
  { id: 2, tag: "ANALYSIS", tagColor: "#2563EB", title: "Brazil's tactical evolution under new manager ahead of 2026", summary: "Vinicius Jr. leads a reimagined Seleção blending flair with defensive discipline.", img: "https://images.unsplash.com/photo-1551958219-acbc595d816f?w=300&q=80&fit=crop", time: "4h ago" },
  { id: 3, tag: "EXCLUSIVE", tagColor: "#EF4444", title: "Messi's last dance: Argentina's blueprint for World Cup glory", summary: "The GOAT's final tournament — how Argentina plans to build around their legend.", img: "https://images.unsplash.com/photo-1508098682722-e99c643e7f0b?w=300&q=80&fit=crop", time: "6h ago" },
  { id: 4, tag: "FORM GUIDE", tagColor: "#16A34A", title: "USA's home advantage — how far can the hosts really go?", summary: "With matches in LA, NY, and Dallas, the USMNT has never had a better path to the knockout stage.", img: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=300&q=80&fit=crop", time: "8h ago" },
];

const MATCHES = [
  { id: "mex-vs-rsa", home: "MEX", homeCode: "mx", away: "RSA", awayCode: "za", date: "JUN 11", time: "20:00", venue: "Estadio Azteca, Mexico City" },
  { id: "usa-vs-bra", home: "USA", homeCode: "us", away: "BRA", awayCode: "br", date: "JUN 12", time: "18:00", venue: "SoFi Stadium, Los Angeles" },
  { id: "fra-vs-ger", home: "FRA", homeCode: "fr", away: "GER", awayCode: "de", date: "JUN 13", time: "21:00", venue: "MetLife Stadium, New York" },
  { id: "arg-vs-eng", home: "ARG", homeCode: "ar", away: "ENG", awayCode: "gb", date: "JUN 14", time: "19:00", venue: "AT&T Stadium, Dallas" },
];

const TEAMS = [
  { code: "fr", name: "France" }, { code: "ar", name: "Argentina" }, { code: "br", name: "Brazil" }, { code: "gb", name: "England" },
  { code: "es", name: "Spain" }, { code: "de", name: "Germany" }, { code: "pt", name: "Portugal" }, { code: "nl", name: "Netherlands" },
];
const BOOT_PLAYERS = [
  { id: "mbappe", name: "Mbappé", flagCode: "fr", club: "Real Madrid", img: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=100&q=80" },
  { id: "messi", name: "Messi", flagCode: "ar", club: "Inter Miami", img: "https://images.unsplash.com/photo-1508098682722-e99c643e7f0b?w=100&q=80" },
  { id: "bellingham", name: "Bellingham", flagCode: "gb", club: "Real Madrid", img: "https://images.unsplash.com/photo-1543326727-cf6c39e8f84c?w=100&q=80" },
  { id: "vinicius", name: "Vinicius", flagCode: "br", club: "Real Madrid", img: "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=100&q=80" },
];

function getPct(data: any, choice: string): number {
  if (!data?.results) return 0;
  const total = data.results.reduce((s: number, r: any) => s + r.count, 0);
  if (!total) return 0;
  const item = data.results.find((r: any) => r.choice === choice);
  return item ? Math.round((item.count / total) * 100) : 0;
}

export default function Home() {
  const voterId = useVoterId();
  const utils = trpc.useUtils();
  const [, setLocation] = useLocation();
  const { days, hours, minutes, seconds } = useCountdown();

  const champR = trpc.voting.getResults.useQuery({ category: "champion" });
  const bootR = trpc.voting.getResults.useQuery({ category: "best_player" });
  const myChamp = trpc.voting.getMyVote.useQuery({ category: "champion", voterId }, { enabled: voterId.length > 0 });
  const myBoot = trpc.voting.getMyVote.useQuery({ category: "best_player", voterId }, { enabled: voterId.length > 0 });
  const castVote = trpc.voting.castVote.useMutation({ onSuccess: () => { utils.voting.getResults.invalidate(); utils.voting.getMyVote.invalidate(); } });

  const commentsQuery = trpc.comments.getComments.useQuery();
  const addComment = trpc.comments.addComment.useMutation({ onSuccess: () => utils.comments.getComments.invalidate() });
  const [commentText, setCommentText] = useState("");

  const handleChampVote = (choice: string) => { if (voterId) castVote.mutate({ category: "champion", choice, voterId }); };
  const handleBootVote = (choice: string) => { if (voterId) castVote.mutate({ category: "best_player", choice, voterId }); };

  return (
    <div style={{ maxWidth: 1440, margin: "0 auto", padding: "16px 16px 40px", background: "#fff" }}>

      <div style={{ display: "flex", gap: 0 }}>

        {/* ─── LEFT COLUMN ────────────────────────────────── */}
        <div style={{ flex: "1 1 0", minWidth: 0, paddingRight: 12 }}>

          {/* ── HERO POSTER — 400px cinematic, title overlay ── */}
          <div style={{ border: "1px solid var(--border)", overflow: "hidden", position: "relative", cursor: "pointer" }}>
            <img src={NEWS[0].img} alt={NEWS[0].title}
              style={{ width: "100%", height: 400, objectFit: "cover", display: "block" }}
              onError={e => { (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=1200&q=85"; }} />
            <div style={{
              position: "absolute", bottom: 0, left: 0, right: 0,
              background: "linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.35) 65%, transparent 100%)",
              padding: "32px 20px 18px",
            }}>
              <span style={{ display: "inline-block", fontFamily: "var(--font-body)", fontSize: 9, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "#f5c842", background: "rgba(255,255,255,0.12)", padding: "2px 7px", borderRadius: 2, marginBottom: 8 }}>{NEWS[0].tag}</span>
              <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 18, lineHeight: 1.15, color: "#fff", marginBottom: 4 }}>{NEWS[0].title}</h2>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "rgba(255,255,255,0.5)" }}>⏱ {NEWS[0].time}</span>
            </div>
          </div>

          {/* ── TRENDING NEWS — 3 small cards ──────────────── */}
          <div className="section-head" style={{ marginTop: 16 }}>
            <div className="bar" /><span className="title">TRENDING NEWS</span><div className="rule" />
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12, marginBottom: 24 }}>
            {NEWS.slice(1).map(story => (
              <div key={story.id} className="card" style={{ cursor: "pointer", overflow: "hidden" }}>
                <img src={story.img} alt={story.title}
                  style={{ width: "100%", height: 100, objectFit: "cover", display: "block" }}
                  onError={e => { (e.target as HTMLImageElement).style.display = "none"; }} />
                <div style={{ padding: "10px 12px" }}>
                  <span className="tag" style={{ color: story.tagColor, background: "none", marginBottom: 4, display: "inline-block" }}>{story.tag}</span>
                  <h3 style={{ fontFamily: "var(--font-body)", fontWeight: 600, fontSize: 13, color: "var(--text-primary)", lineHeight: 1.3, marginBottom: 4 }}>{story.title}</h3>
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--text-muted)" }}>{story.time}</span>
                </div>
              </div>
            ))}
          </div>

          {/* ── UPCOMING MATCHES ──────────────────────────── */}
          <div className="section-head">
            <div className="bar" /><span className="title">UPCOMING MATCHES</span><div className="rule" />
          </div>

          <div style={{ marginBottom: 24, borderTop: "1px solid var(--border)" }}>
            {MATCHES.map(m => (
              <div key={m.id} onClick={e => { e.preventDefault(); setLocation(`/match/${m.id}`); }} style={{ cursor: "pointer" }}>
                <div style={{
                  display: "flex", alignItems: "center", padding: "12px 16px", gap: 12,
                  borderBottom: "1px solid #E5E7EB", background: "#fff", cursor: "pointer", transition: "background 0.08s",
                }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "#F9FAFB"; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "#fff"; }}>
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--text-muted)", width: 55, flexShrink: 0 }}>{m.date}</span>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, flex: 1 }}>
                    <img src={flagUrl(m.homeCode)} alt="" style={{ width: 26, height: 18, objectFit: "contain", flexShrink: 0 }} onError={e => { (e.target as HTMLImageElement).style.display = "none"; }} />
                    <span style={{ fontFamily: "var(--font-body)", fontWeight: 600, fontSize: 13, color: "var(--text-primary)" }}>{m.home}</span>
                    <span style={{ fontSize: 10, color: "var(--text-muted)" }}>vs</span>
                    <span style={{ fontFamily: "var(--font-body)", fontWeight: 600, fontSize: 13, color: "var(--text-primary)" }}>{m.away}</span>
                    <img src={flagUrl(m.awayCode)} alt="" style={{ width: 26, height: 18, objectFit: "contain", flexShrink: 0 }} onError={e => { (e.target as HTMLImageElement).style.display = "none"; }} />
                  </div>
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--text-muted)", width: 45, flexShrink: 0 }}>{m.time}</span>
                  <span style={{ fontSize: 11, color: "var(--text-secondary)", flexShrink: 0, textAlign: "right", maxWidth: 140, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{m.venue}</span>
                  <span style={{ color: "var(--text-muted)", flexShrink: 0 }}>→</span>
                </div>
              </div>
            ))}
          </div>

          {/* ── FAN TALK ──────────────────────────────────── */}
          <div className="section-head">
            <div className="bar" /><span className="title">FAN TALK</span><div className="rule" />
          </div>
          <div className="card" style={{ padding: 16 }}>
            <div style={{ display: "flex", gap: 8, marginBottom: 14 }}>
              <input value={commentText} onChange={e => setCommentText(e.target.value)}
                onKeyDown={e => { if (e.key === "Enter" && commentText.trim()) { addComment.mutate({ content: commentText.trim(), voterId }); setCommentText(""); } }}
                placeholder="Drop your take... (press Enter)"
                style={{ flex: 1, background: "#fff", border: "1px solid var(--border)", borderRadius: 2, padding: "10px 14px", fontFamily: "var(--font-body)", fontSize: 13, color: "var(--text-primary)", outline: "none" }} />
              <button onClick={() => { if (commentText.trim()) { addComment.mutate({ content: commentText.trim(), voterId }); setCommentText(""); } }}
                className="btn-black" style={{ padding: "10px 18px", fontSize: 12 }}>Post</button>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              {commentsQuery.isLoading ? <div style={{ fontSize: 12, color: "var(--text-muted)" }}>Loading...</div> :
                (commentsQuery.data?.comments?.length ?? 0) === 0 ? <div style={{ fontSize: 12, color: "var(--text-muted)" }}>Be the first to comment.</div> :
                  commentsQuery.data?.comments?.slice(0, 8).map((c: any) => (
                    <div key={c.id} style={{ padding: "10px 14px", background: "var(--bg-secondary)", border: "1px solid var(--border)", borderRadius: 2 }}>
                      <div style={{ fontSize: 13, lineHeight: 1.5 }}>{c.content}</div>
                      <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--text-muted)", marginTop: 6 }}>{new Date(c.createdAt).toLocaleString()}</div>
                    </div>
                  ))}
            </div>
          </div>
        </div>

        {/* ─── RIGHT SIDEBAR ───────────────────────────────── */}
        <div style={{ width: 380, flexShrink: 0, background: "var(--bg-secondary)", padding: "16px 16px", display: "flex", flexDirection: "column", gap: 16 }}>

          <div className="card" style={{ padding: 18, background: "#fff" }}>
            <div style={{ fontFamily: "var(--font-body)", fontSize: 9, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--text-muted)", marginBottom: 8 }}>COUNTDOWN</div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, marginBottom: 8 }}>
              {[{ v: days, u: "D" }, { v: hours, u: "H" }, { v: minutes, u: "M" }, { v: seconds, u: "S" }].map(({ v, u }, i) => (
                <span key={u} style={{ display: "flex", alignItems: "baseline", gap: 2 }}>
                  <span style={{ fontFamily: "var(--font-display)", fontWeight: 900, fontSize: 36, color: "var(--text-primary)", lineHeight: 1 }}>{pad(v)}</span>
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--text-muted)" }}>{u}</span>
                  {i < 3 && <span style={{ fontFamily: "var(--font-display)", fontWeight: 900, fontSize: 28, color: "var(--text-muted)", margin: "0 2px" }}>:</span>}
                </span>
              ))}
            </div>
            <div style={{ fontFamily: "var(--font-body)", fontSize: 10, color: "var(--text-muted)", textAlign: "center", lineHeight: 1.4 }}>ESTADIO AZTECA<br />MEXICO CITY</div>
          </div>

          <div className="card" style={{ padding: 16, background: "#fff" }}>
            <div style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 17, marginBottom: 2 }}>🏆 WHO WINS 2026?</div>
            <div style={{ fontSize: 11, color: "var(--text-muted)", marginBottom: 12 }}>Tap a team to vote</div>
            {TEAMS.map(team => {
              const pct = getPct(champR.data, team.code);
              const voted = myChamp.data?.choice === team.code;
              const hasVoted = !!myChamp.data?.choice;
              return (
                <button key={team.code} onClick={() => !hasVoted && handleChampVote(team.code)} disabled={hasVoted}
                  style={{ display: "flex", alignItems: "center", gap: 10, padding: "6px 10px", marginBottom: 4, width: "100%", background: voted ? "#F9FAFB" : "#fff", border: voted ? "1px solid #111827" : "1px solid var(--border)", cursor: hasVoted ? "default" : "pointer", transition: "all 0.1s", textAlign: "left" }}>
                  <img src={flagUrl(team.code)} alt={team.name} style={{ width: 32, height: 22, objectFit: "contain", flexShrink: 0, borderRadius: 2 }} onError={e => { (e.target as HTMLImageElement).style.display = "none"; }} />
                  <span style={{ fontFamily: "var(--font-body)", fontWeight: 600, fontSize: 13, flex: 1, display: "flex", alignItems: "center" }}>{team.name}</span>
                  <div style={{ width: 64, display: "flex", flexDirection: "column", justifyContent: "center", gap: 2 }}>
                    <div className="progress-track"><div className="progress-fill" style={{ width: `${pct}%` }} /></div>
                    <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--text-muted)", textAlign: "right", display: "block", lineHeight: 1 }}>{pct}%</span>
                  </div>
                </button>
              );
            })}
            <Link href="/ai-predictor" style={{ textDecoration: "none", display: "block", marginTop: 12 }}>
              <button className="btn-black" style={{ width: "100%", justifyContent: "center", fontSize: 12, padding: "10px 0" }}>🤖 LET AI PREDICT THE CHAMPION</button>
            </Link>
          </div>

          <div className="card" style={{ padding: 16, background: "#fff" }}>
            <div style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 17, marginBottom: 2 }}>⭐ GOLDEN BOOT</div>
            <div style={{ fontSize: 11, color: "var(--text-muted)", marginBottom: 12 }}>Top scorer prediction</div>
            {BOOT_PLAYERS.map((p, idx) => {
              const pct = getPct(bootR.data, p.id);
              const voted = myBoot.data?.choice === p.id;
              const hasVoted = !!myBoot.data?.choice;
              return (
                <button key={p.id} onClick={() => !hasVoted && handleBootVote(p.id)} disabled={hasVoted}
                  style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 10px", marginBottom: 6, width: "100%", background: voted ? "#F9FAFB" : "#fff", border: voted ? "1px solid #111827" : "1px solid var(--border)", cursor: hasVoted ? "default" : "pointer", transition: "all 0.1s", textAlign: "left" }}>
                  <img src={p.img} alt={p.name} style={{ width: 34, height: 34, borderRadius: "50%", objectFit: "cover", flexShrink: 0 }} onError={e => { (e.target as HTMLImageElement).style.display = "none"; }} />
                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                      <span style={{ fontFamily: "var(--font-body)", fontWeight: 600, fontSize: 13 }}>{p.name}</span>
                      {idx === 0 && <span className="tag tag-new" style={{ fontSize: 7, padding: "1px 3px" }}>AI PICK</span>}
                    </div>
                    <div style={{ fontSize: 10, color: "var(--text-muted)" }}>{p.club}</div>
                  </div>
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: 12, fontWeight: 600, color: "var(--text-primary)" }}>{pct}%</span>
                </button>
              );
            })}
            <Link href="/ai-predictor" style={{ textDecoration: "none", display: "block", marginTop: 12 }}>
              <button className="btn-black" style={{ width: "100%", justifyContent: "center", fontSize: 12, padding: "10px 0" }}>🤖 AI GOLDEN BOOT PREDICTION</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
