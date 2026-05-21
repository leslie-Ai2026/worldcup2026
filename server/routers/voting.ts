import { z } from "zod";
import { publicProcedure, router } from "../_core/trpc";
import { getDb, castVote, getVoteResults, getVoterChoice } from "../db";
import { getSeedResults, addSeedVote, getSeedVoterChoice } from "../seedData";

const categorySchema = z.enum(["champion", "best_player"]);

async function getDbAvailable() {
  try {
    const db = await getDb();
    return db !== null;
  } catch {
    return false;
  }
}

let _dbAvailable: boolean | null = null;
async function useRealDb() {
  if (_dbAvailable === null) {
    _dbAvailable = await getDbAvailable();
  }
  return _dbAvailable;
}

export const votingRouter = router({
  castVote: publicProcedure
    .input(
      z.object({
        category: categorySchema,
        choice: z.string().min(1).max(128),
        voterId: z.string().min(1).max(128),
      })
    )
    .mutation(async ({ input }) => {
      const hasDb = await useRealDb();
      if (hasDb) {
        return castVote({
          category: input.category,
          choice: input.choice,
          voterId: input.voterId,
        });
      }
      // Seed data: track per voter
      const accepted = addSeedVote(input.voterId, input.category, input.choice);
      return { success: accepted, alreadyVoted: !accepted };
    }),

  getResults: publicProcedure
    .input(z.object({ category: categorySchema }))
    .query(async ({ input }) => {
      const hasDb = await useRealDb();
      if (hasDb) {
        return getVoteResults(input.category);
      }
      return getSeedResults(input.category);
    }),

  getMyVote: publicProcedure
    .input(z.object({ category: categorySchema, voterId: z.string().min(1).max(128) }))
    .query(async ({ input }) => {
      const hasDb = await useRealDb();
      if (hasDb) {
        const choice = await getVoterChoice(input.voterId, input.category);
        return { choice };
      }
      const choice = getSeedVoterChoice(input.voterId, input.category);
      return { choice };
    }),
});
