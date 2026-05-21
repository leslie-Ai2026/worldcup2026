import { describe, expect, it, vi, beforeEach } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

// Mock db helpers
vi.mock("./db", async (importOriginal) => {
  const original = await importOriginal<typeof import("./db")>();
  return {
    ...original,
    addComment: vi.fn().mockResolvedValue({ id: 42 }),
    getComments: vi.fn().mockResolvedValue([
      { id: 1, content: "Brazil all the way! 🇧🇷", createdAt: new Date("2026-06-01T10:00:00Z") },
      { id: 2, content: "Mbappé is unstoppable!", createdAt: new Date("2026-06-01T09:00:00Z") },
    ]),
  };
});

function createCtx(): TrpcContext {
  return {
    user: null,
    req: { protocol: "https", headers: {} } as TrpcContext["req"],
    res: { clearCookie: vi.fn() } as unknown as TrpcContext["res"],
  };
}

describe("comments router", () => {
  it("getComments returns list of comments", async () => {
    const caller = appRouter.createCaller(createCtx());
    const result = await caller.comments.getComments();
    expect(result.comments).toHaveLength(2);
    expect(result.comments[0]?.content).toBe("Brazil all the way! 🇧🇷");
  });

  it("addComment succeeds with valid input", async () => {
    const caller = appRouter.createCaller(createCtx());
    const result = await caller.comments.addComment({
      content: "France will win it all!",
      voterId: "test-voter-123",
    });
    expect(result.success).toBe(true);
    expect(result.id).toBe(42);
  });

  it("addComment rejects content that is too short", async () => {
    const caller = appRouter.createCaller(createCtx());
    await expect(
      caller.comments.addComment({ content: "X", voterId: "voter-1" })
    ).rejects.toThrow();
  });

  it("addComment rejects content that is too long", async () => {
    const caller = appRouter.createCaller(createCtx());
    await expect(
      caller.comments.addComment({ content: "A".repeat(281), voterId: "voter-1" })
    ).rejects.toThrow();
  });
});
