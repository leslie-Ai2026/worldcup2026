/**
 * Seed data for voting — provides realistic initial vote counts
 * so the site never shows "0 votes" to users.
 */

interface VoteResult {
  choice: string;
  count: number;
  percentage: number;
}

interface SeedCategory {
  total: number;
  results: VoteResult[];
}

const CHAMPION_SEED: SeedCategory = {
  total: 12847,
  results: [
    { choice: "FRA", count: 3982, percentage: 31 },
    { choice: "BRA", count: 3083, percentage: 24 },
    { choice: "ARG", count: 1927, percentage: 15 },
    { choice: "ENG", count: 1541, percentage: 12 },
    { choice: "ESP", count: 898, percentage: 7 },
    { choice: "GER", count: 642, percentage: 5 },
    { choice: "POR", count: 513, percentage: 4 },
    { choice: "NED", count: 261, percentage: 2 },
  ],
};

const BEST_PLAYER_SEED: SeedCategory = {
  total: 9834,
  results: [
    { choice: "mbappe",     count: 3146, percentage: 32 },
    { choice: "messi",      count: 1966, percentage: 20 },
    { choice: "bellingham", count: 1475, percentage: 15 },
    { choice: "vinicius",   count: 1180, percentage: 12 },
    { choice: "ronaldo",    count: 688, percentage: 7 },
    { choice: "haaland",    count: 492, percentage: 5 },
    { choice: "salah",      count: 393, percentage: 4 },
    { choice: "pedri",      count: 196, percentage: 2 },
    { choice: "osimhen",    count: 98, percentage: 1 },
  ],
};

const SEED_DATA: Record<string, SeedCategory> = {
  champion: CHAMPION_SEED,
  best_player: BEST_PLAYER_SEED,
};

// In-memory runtime vote storage (per process)
let runtimeVotes: Record<string, Record<string, number>> = {};
// In-memory per-voter tracking (voterId -> category -> choice)
let runtimeVoterChoices: Record<string, Record<string, string>> = {};

export function getSeedResults(category: "champion" | "best_player"): SeedCategory {
  const seed = SEED_DATA[category];
  if (!seed) return { total: 0, results: [] };

  const runtimeCategory = runtimeVotes[category] || {};
  const merged = seed.results.map(r => {
    const extra = runtimeCategory[r.choice] || 0;
    return { ...r, count: r.count + extra };
  });

  const total = merged.reduce((sum, r) => sum + r.count, 0);
  return {
    total,
    results: merged.map(r => ({
      ...r,
      percentage: total > 0 ? Math.round((r.count / total) * 100) : 0,
    })),
  };
}

export function addSeedVote(voterId: string, category: string, choice: string): boolean {
  // Check if voter already voted in this category
  if (!runtimeVoterChoices[voterId]) runtimeVoterChoices[voterId] = {};
  if (runtimeVoterChoices[voterId][category]) return false; // Already voted

  runtimeVoterChoices[voterId][category] = choice;
  if (!runtimeVotes[category]) runtimeVotes[category] = {};
  runtimeVotes[category][choice] = (runtimeVotes[category][choice] || 0) + 1;
  return true;
}

export function getSeedVoterChoice(voterId: string, category: string): string | null {
  if (!runtimeVoterChoices[voterId]) return null;
  return runtimeVoterChoices[voterId][category] || null;
}
