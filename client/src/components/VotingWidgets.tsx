import { useState, useMemo } from "react";
import { trpc } from "@/lib/trpc";
import { useVoterId } from "@/hooks/useVoterId";
import { Loader2, CheckCircle2, Users, Trophy, Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

// ─── Champion Vote Data ───────────────────────────────────────────────────────
const CHAMPION_TEAMS = [
  { name: "Brazil",      flag: "🇧🇷", color: "from-green-600 to-green-400" },
  { name: "France",      flag: "🇫🇷", color: "from-blue-700 to-blue-500" },
  { name: "England",     flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿", color: "from-red-700 to-red-500" },
  { name: "Argentina",   flag: "🇦🇷", color: "from-sky-600 to-sky-400" },
  { name: "Spain",       flag: "🇪🇸", color: "from-red-600 to-yellow-500" },
  { name: "Germany",     flag: "🇩🇪", color: "from-gray-600 to-gray-400" },
  { name: "Portugal",    flag: "🇵🇹", color: "from-green-700 to-red-600" },
  { name: "Netherlands", flag: "🇳🇱", color: "from-orange-600 to-orange-400" },
  { name: "Belgium",     flag: "🇧🇪", color: "from-red-700 to-yellow-500" },
  { name: "Italy",       flag: "🇮🇹", color: "from-blue-600 to-blue-400" },
  { name: "USA",         flag: "🇺🇸", color: "from-blue-700 to-red-600" },
  { name: "Mexico",      flag: "🇲🇽", color: "from-green-700 to-red-600" },
];

// ─── Best Player Vote Data ────────────────────────────────────────────────────
const BEST_PLAYERS = [
  { name: "Kylian Mbappé",   flag: "🇫🇷", country: "France",      club: "Real Madrid" },
  { name: "Lionel Messi",    flag: "🇦🇷", country: "Argentina",   club: "Inter Miami" },
  { name: "Jude Bellingham", flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿", country: "England",    club: "Real Madrid" },
  { name: "Vinícius Jr.",    flag: "🇧🇷", country: "Brazil",      club: "Real Madrid" },
  { name: "Erling Haaland",  flag: "🇳🇴", country: "Norway",      club: "Man City" },
  { name: "Mohamed Salah",   flag: "🇪🇬", country: "Egypt",       club: "Liverpool" },
  { name: "Pedri",           flag: "🇪🇸", country: "Spain",       club: "Barcelona" },
  { name: "Victor Osimhen",  flag: "🇳🇬", country: "Nigeria",     club: "Galatasaray" },
];

// ─── Shared Result Bar ────────────────────────────────────────────────────────
function ResultBar({
  label,
  flag,
  count,
  percentage,
  isMyVote,
  total,
}: {
  label: string;
  flag: string;
  count: number;
  percentage: number;
  isMyVote: boolean;
  total: number;
}) {
  return (
    <div className={cn("group", isMyVote && "")}>
      <div className="flex items-center justify-between mb-1">
        <div className="flex items-center gap-2">
          <span className="text-base leading-none">{flag}</span>
          <span className={cn("text-xs font-semibold", isMyVote ? "text-amber-400" : "text-white/80")}>
            {label}
          </span>
          {isMyVote && (
            <span className="flex items-center gap-0.5 text-xs text-amber-400 font-bold">
              <CheckCircle2 className="w-3 h-3" /> Your vote
            </span>
          )}
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-muted-foreground">{count} votes</span>
          <span className={cn("text-xs font-bold tabular-nums", isMyVote ? "text-amber-400" : "text-white")}>
            {percentage}%
          </span>
        </div>
      </div>
      <div className="h-1.5 rounded-full bg-secondary overflow-hidden">
        <div
          className={cn(
            "h-full rounded-full transition-all duration-700 ease-out",
            isMyVote
              ? "bg-gradient-to-r from-amber-500 to-yellow-300"
              : "bg-gradient-to-r from-green-700 to-green-500"
          )}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}

// ─── Champion Vote Widget ─────────────────────────────────────────────────────
export function ChampionVoteWidget() {
  const voterId = useVoterId();
  const [optimisticVote, setOptimisticVote] = useState<string | null>(null);
  const utils = trpc.useUtils();

  const { data: myVoteData } = trpc.voting.getMyVote.useQuery(
    { category: "champion", voterId },
    { enabled: !!voterId, staleTime: Infinity }
  );

  const { data: results, isLoading: resultsLoading } = trpc.voting.getResults.useQuery(
    { category: "champion" },
    { staleTime: 1000 * 30, refetchInterval: 1000 * 30 }
  );

  const castVote = trpc.voting.castVote.useMutation({
    onSuccess: (data) => {
      if (data.alreadyVoted) {
        toast.error("You've already voted in this category!");
        setOptimisticVote(null);
        return;
      }
      toast.success("Vote cast! 🏆 Thanks for participating!");
      utils.voting.getResults.invalidate({ category: "champion" });
      utils.voting.getMyVote.invalidate({ category: "champion", voterId });
    },
    onError: () => {
      toast.error("Failed to cast vote. Please try again.");
      setOptimisticVote(null);
    },
  });

  const myVote = optimisticVote ?? myVoteData?.choice ?? null;
  const hasVoted = !!myVote;

  const handleVote = (teamName: string) => {
    if (!voterId || hasVoted) return;
    setOptimisticVote(teamName);
    castVote.mutate({ category: "champion", choice: teamName, voterId });
  };

  // Build result map for quick lookup
  const resultMap = useMemo(() => {
    const map: Record<string, { count: number; percentage: number }> = {};
    results?.results.forEach((r) => {
      map[r.choice] = { count: r.count, percentage: r.percentage };
    });
    return map;
  }, [results]);

  // Sort teams: voted first, then by vote count
  const sortedTeams = useMemo(() => {
    return [...CHAMPION_TEAMS].sort((a, b) => {
      const aCount = resultMap[a.name]?.count ?? 0;
      const bCount = resultMap[b.name]?.count ?? 0;
      if (a.name === myVote) return -1;
      if (b.name === myVote) return 1;
      return bCount - aCount;
    });
  }, [resultMap, myVote]);

  return (
    <section className="rounded-2xl border border-border bg-card card-glow overflow-hidden">
      {/* Header */}
      <div className="px-5 py-4 border-b border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-amber-400/10 flex items-center justify-center">
              <Trophy className="w-4 h-4 text-amber-400" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-white">Who Will Win the Cup?</h2>
              <p className="text-xs text-muted-foreground">Community champion vote</p>
            </div>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <Users className="w-3.5 h-3.5" />
            <span>{results?.total ?? 0} votes</span>
          </div>
        </div>
      </div>

      <div className="p-5">
        {/* Voting grid — shown when not yet voted */}
        {!hasVoted && (
          <div className="mb-5">
            <p className="text-xs text-muted-foreground mb-3 text-center">
              Pick your champion — one vote per device
            </p>
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
              {CHAMPION_TEAMS.map((team) => (
                <button
                  key={team.name}
                  onClick={() => handleVote(team.name)}
                  disabled={castVote.isPending}
                  className={cn(
                    "flex flex-col items-center gap-1.5 p-3 rounded-xl border transition-all duration-200 cursor-pointer",
                    "border-border bg-secondary/30 hover:border-amber-400/50 hover:bg-amber-400/5",
                    "active:scale-[0.96] disabled:opacity-50 disabled:cursor-not-allowed"
                  )}
                >
                  <span className="text-2xl">{team.flag}</span>
                  <span className="text-xs font-medium text-white/80 text-center leading-tight">{team.name}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Results — shown after voting or always visible */}
        {hasVoted && (
          <div className="mb-3 flex items-center gap-2 p-3 rounded-xl bg-amber-400/5 border border-amber-400/20">
            <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
            <p className="text-xs text-amber-400 font-medium">
              You voted for <span className="font-bold">{myVote}</span>. Here's how the community voted:
            </p>
          </div>
        )}

        {resultsLoading ? (
          <div className="flex items-center justify-center py-4 gap-2">
            <Loader2 className="w-4 h-4 animate-spin text-amber-400" />
            <span className="text-xs text-muted-foreground">Loading results...</span>
          </div>
        ) : (
          <div className="space-y-2.5">
            {(hasVoted ? sortedTeams : sortedTeams.slice(0, 5)).map((team) => {
              const r = resultMap[team.name];
              if (!hasVoted && !r) return null;
              return (
                <ResultBar
                  key={team.name}
                  label={team.name}
                  flag={team.flag}
                  count={r?.count ?? 0}
                  percentage={r?.percentage ?? 0}
                  isMyVote={myVote === team.name}
                  total={results?.total ?? 0}
                />
              );
            })}
            {!hasVoted && results && results.total === 0 && (
              <p className="text-xs text-muted-foreground text-center py-2">
                Be the first to vote! Cast your pick above.
              </p>
            )}
          </div>
        )}
      </div>
    </section>
  );
}

// ─── Best Player Vote Widget ──────────────────────────────────────────────────
export function BestPlayerVoteWidget() {
  const voterId = useVoterId();
  const [optimisticVote, setOptimisticVote] = useState<string | null>(null);
  const utils = trpc.useUtils();

  const { data: myVoteData } = trpc.voting.getMyVote.useQuery(
    { category: "best_player", voterId },
    { enabled: !!voterId, staleTime: Infinity }
  );

  const { data: results, isLoading: resultsLoading } = trpc.voting.getResults.useQuery(
    { category: "best_player" },
    { staleTime: 1000 * 30, refetchInterval: 1000 * 30 }
  );

  const castVote = trpc.voting.castVote.useMutation({
    onSuccess: (data) => {
      if (data.alreadyVoted) {
        toast.error("You've already voted for Best Player!");
        setOptimisticVote(null);
        return;
      }
      toast.success("Vote cast! ⭐ Thanks for participating!");
      utils.voting.getResults.invalidate({ category: "best_player" });
      utils.voting.getMyVote.invalidate({ category: "best_player", voterId });
    },
    onError: () => {
      toast.error("Failed to cast vote. Please try again.");
      setOptimisticVote(null);
    },
  });

  const myVote = optimisticVote ?? myVoteData?.choice ?? null;
  const hasVoted = !!myVote;

  const handleVote = (playerName: string) => {
    if (!voterId || hasVoted) return;
    setOptimisticVote(playerName);
    castVote.mutate({ category: "best_player", choice: playerName, voterId });
  };

  const resultMap = useMemo(() => {
    const map: Record<string, { count: number; percentage: number }> = {};
    results?.results.forEach((r) => {
      map[r.choice] = { count: r.count, percentage: r.percentage };
    });
    return map;
  }, [results]);

  const sortedPlayers = useMemo(() => {
    return [...BEST_PLAYERS].sort((a, b) => {
      const aCount = resultMap[a.name]?.count ?? 0;
      const bCount = resultMap[b.name]?.count ?? 0;
      if (a.name === myVote) return -1;
      if (b.name === myVote) return 1;
      return bCount - aCount;
    });
  }, [resultMap, myVote]);

  return (
    <section className="rounded-2xl border border-border bg-card card-glow overflow-hidden">
      {/* Header */}
      <div className="px-5 py-4 border-b border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-yellow-400/10 flex items-center justify-center">
              <Star className="w-4 h-4 text-yellow-400" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-white">Who's the Best Player?</h2>
              <p className="text-xs text-muted-foreground">Community player of the tournament</p>
            </div>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <Users className="w-3.5 h-3.5" />
            <span>{results?.total ?? 0} votes</span>
          </div>
        </div>
      </div>

      <div className="p-5">
        {/* Player cards — shown before voting */}
        {!hasVoted && (
          <div className="mb-5">
            <p className="text-xs text-muted-foreground mb-3 text-center">
              Vote for your Player of the Tournament
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {BEST_PLAYERS.map((player) => (
                <button
                  key={player.name}
                  onClick={() => handleVote(player.name)}
                  disabled={castVote.isPending}
                  className={cn(
                    "flex flex-col items-start gap-1 p-3 rounded-xl border transition-all duration-200 text-left",
                    "border-border bg-secondary/30 hover:border-yellow-400/50 hover:bg-yellow-400/5",
                    "active:scale-[0.96] disabled:opacity-50 disabled:cursor-not-allowed"
                  )}
                >
                  <div className="flex items-center gap-1.5">
                    <span className="text-xl">{player.flag}</span>
                  </div>
                  <span className="text-xs font-bold text-white leading-tight">{player.name}</span>
                  <span className="text-xs text-muted-foreground">{player.club}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Voted confirmation */}
        {hasVoted && (
          <div className="mb-3 flex items-center gap-2 p-3 rounded-xl bg-yellow-400/5 border border-yellow-400/20">
            <CheckCircle2 className="w-4 h-4 text-yellow-400 shrink-0" />
            <p className="text-xs text-yellow-400 font-medium">
              You voted for <span className="font-bold">{myVote}</span>. Community results:
            </p>
          </div>
        )}

        {/* Results */}
        {resultsLoading ? (
          <div className="flex items-center justify-center py-4 gap-2">
            <Loader2 className="w-4 h-4 animate-spin text-yellow-400" />
            <span className="text-xs text-muted-foreground">Loading results...</span>
          </div>
        ) : (
          <div className="space-y-2.5">
            {(hasVoted ? sortedPlayers : sortedPlayers.slice(0, 4)).map((player) => {
              const r = resultMap[player.name];
              if (!hasVoted && !r) return null;
              return (
                <ResultBar
                  key={player.name}
                  label={player.name}
                  flag={player.flag}
                  count={r?.count ?? 0}
                  percentage={r?.percentage ?? 0}
                  isMyVote={myVote === player.name}
                  total={results?.total ?? 0}
                />
              );
            })}
            {!hasVoted && results && results.total === 0 && (
              <p className="text-xs text-muted-foreground text-center py-2">
                No votes yet — be the first!
              </p>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
