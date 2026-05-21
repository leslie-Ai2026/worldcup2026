import { z } from "zod";
import { publicProcedure, router } from "../_core/trpc";
import { getDb, addComment, getComments } from "../db";

// In-memory fallback comments
const fallbackComments: Array<{ id: number; content: string; createdAt: Date }> = [
  { id: 1, content: "France looking unstoppable! Mbappe will dominate", createdAt: new Date(Date.now() - 7200000) },
  { id: 2, content: "USA has home advantage, could be a dark horse", createdAt: new Date(Date.now() - 3600000) },
  { id: 3, content: "Messi's last World Cup... I'm not ready for this", createdAt: new Date(Date.now() - 1800000) },
  { id: 4, content: "Brazil's squad depth is insane this year", createdAt: new Date(Date.now() - 900000) },
  { id: 5, content: "Can't wait for the opening match at Azteca!", createdAt: new Date(Date.now() - 600000) },
];
let fallbackIdCounter = 6;

async function hasDb() {
  try {
    const db = await getDb();
    return db !== null;
  } catch { return false; }
}

let _dbAvailable: boolean | null = null;
async function useRealDb() {
  if (_dbAvailable === null) _dbAvailable = await hasDb();
  return _dbAvailable;
}

export const commentsRouter = router({
  getComments: publicProcedure.query(async () => {
    const realDb = await useRealDb();
    if (realDb) {
      const rows = await getComments(50);
      return { comments: rows };
    }
    return { comments: [...fallbackComments].reverse() };
  }),

  addComment: publicProcedure
    .input(
      z.object({
        content: z.string().min(2, "Comment too short").max(280, "Comment too long"),
        voterId: z.string().min(1),
      })
    )
    .mutation(async ({ input }) => {
      const realDb = await useRealDb();
      if (realDb) {
        const { id } = await addComment({
          content: input.content.trim(),
          voterId: input.voterId,
        });
        return { success: true, id };
      }
      const newComment = {
        id: fallbackIdCounter++,
        content: input.content.trim(),
        createdAt: new Date(),
      };
      fallbackComments.unshift(newComment);
      return { success: true, id: newComment.id };
    }),
});
