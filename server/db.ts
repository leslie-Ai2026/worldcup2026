import { eq, desc, and, sql } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import { InsertUser, users, votes, InsertVote, comments, InsertComment } from "../drizzle/schema";
import { ENV } from './_core/env';

let _db: ReturnType<typeof drizzle> | null = null;

export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) throw new Error("User openId is required for upsert");
  const db = await getDb();
  if (!db) { console.warn("[Database] Cannot upsert user: database not available"); return; }

  try {
    const values: InsertUser = { openId: user.openId };
    const updateSet: Record<string, unknown> = {};
    const textFields = ["name", "email", "loginMethod"] as const;
    type TextField = (typeof textFields)[number];
    const assignNullable = (field: TextField) => {
      const value = user[field];
      if (value === undefined) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };
    textFields.forEach(assignNullable);
    if (user.lastSignedIn !== undefined) { values.lastSignedIn = user.lastSignedIn; updateSet.lastSignedIn = user.lastSignedIn; }
    if (user.role !== undefined) { values.role = user.role; updateSet.role = user.role; }
    else if (user.openId === ENV.ownerOpenId) { values.role = 'admin'; updateSet.role = 'admin'; }
    if (!values.lastSignedIn) values.lastSignedIn = new Date();
    if (Object.keys(updateSet).length === 0) updateSet.lastSignedIn = new Date();
    await db.insert(users).values(values).onDuplicateKeyUpdate({ set: updateSet });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) { console.warn("[Database] Cannot get user: database not available"); return undefined; }
  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

// ─── Vote Helpers ─────────────────────────────────────────────────────────────

export async function castVote(data: InsertVote): Promise<{ success: boolean; alreadyVoted: boolean }> {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  // Check for existing vote by this voter in this category
  const existing = await db
    .select({ id: votes.id })
    .from(votes)
    .where(and(eq(votes.voterId, data.voterId), eq(votes.category, data.category)))
    .limit(1);

  if (existing.length > 0) {
    return { success: false, alreadyVoted: true };
  }

  try {
    await db.insert(votes).values(data);
    return { success: true, alreadyVoted: false };
  } catch (err: any) {
    // MySQL duplicate key error code 1062
    if (err?.errno === 1062 || err?.code === 'ER_DUP_ENTRY') {
      return { success: false, alreadyVoted: true };
    }
    throw err;
  }
}

export async function getVoteResults(category: "champion" | "best_player") {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  const rows = await db
    .select({
      choice: votes.choice,
      count: sql<number>`COUNT(*)`.as("count"),
    })
    .from(votes)
    .where(eq(votes.category, category))
    .groupBy(votes.choice)
    .orderBy(sql`COUNT(*) DESC`);

  const total = rows.reduce((sum, r) => sum + Number(r.count), 0);

  return {
    total,
    results: rows.map((r) => ({
      choice: r.choice,
      count: Number(r.count),
      percentage: total > 0 ? Math.round((Number(r.count) / total) * 100) : 0,
    })),
  };
}

export async function getVoterChoice(voterId: string, category: "champion" | "best_player") {
  const db = await getDb();
  if (!db) return null;

  const result = await db
    .select({ choice: votes.choice })
    .from(votes)
    .where(and(eq(votes.voterId, voterId), eq(votes.category, category)))
    .limit(1);

  return result.length > 0 ? result[0].choice : null;
}

// ─── Comment Helpers ──────────────────────────────────────────────────────────

export async function addComment(data: InsertComment): Promise<{ id: number }> {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const result = await db.insert(comments).values(data);
  return { id: Number((result as any)[0]?.insertId ?? 0) };
}

export async function getComments(limit = 50) {
  const db = await getDb();
  if (!db) return [];
  return db
    .select({ id: comments.id, content: comments.content, createdAt: comments.createdAt })
    .from(comments)
    .orderBy(desc(comments.createdAt))
    .limit(limit);
}
