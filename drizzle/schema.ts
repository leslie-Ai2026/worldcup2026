import { int, mysqlEnum, mysqlTable, text, timestamp, varchar } from "drizzle-orm/mysql-core";

export const users = mysqlTable("users", {
  id: int("id").autoincrement().primaryKey(),
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

/**
 * Community votes table.
 * category: "champion" | "best_player"
 * choice: team name or player name
 * voterId: anonymous fingerprint stored in localStorage (no login required)
 */
export const votes = mysqlTable("votes", {
  id: int("id").autoincrement().primaryKey(),
  category: mysqlEnum("category", ["champion", "best_player"]).notNull(),
  choice: varchar("choice", { length: 128 }).notNull(),
  voterId: varchar("voterId", { length: 128 }).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type Vote = typeof votes.$inferSelect;
export type InsertVote = typeof votes.$inferInsert;

/**
 * Fan comments / trash-talk wall.
 * Anonymous — only voterId (localStorage fingerprint) is stored.
 */
export const comments = mysqlTable("comments", {
  id: int("id").autoincrement().primaryKey(),
  content: varchar("content", { length: 280 }).notNull(),
  voterId: varchar("voterId", { length: 128 }).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type Comment = typeof comments.$inferSelect;
export type InsertComment = typeof comments.$inferInsert;
