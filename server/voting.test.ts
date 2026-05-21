import { describe, expect, it, vi, beforeEach } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

// Mock the db module
vi.mock("./db", async (importOriginal) => {
  const actual = await importOriginal<typeof import("./db")>();
  return {
    ...actual,
    castVote: vi.fn(),
    getVoteResults: vi.fn(),
    getVoterChoice: vi.fn(),
  };
});

import { castVote, getVoteResults, getVoterChoice } from "./db";

function createCtx(): TrpcContext {
  return {
    user: null,
    req: { protocol: "https", headers: {} } as TrpcContext["req"],
    res: { clearCookie: vi.fn() } as unknown as TrpcContext["res"],
  };
}

describe("voting.castVote", () => {
  beforeEach(() => vi.clearAllMocks());

  it("successfully casts a new vote", async () => {
    vi.mocked(castVote).mockResolvedValueOnce({ success: true, alreadyVoted: false });

    const caller = appRouter.createCaller(createCtx());
    const result = await caller.voting.castVote({
      category: "champion",
      choice: "Brazil",
      voterId: "test-voter-001",
    });

    expect(result.success).toBe(true);
    expect(result.alreadyVoted).toBe(false);
  });

  it("returns alreadyVoted when voter has voted in this category", async () => {
    vi.mocked(castVote).mockResolvedValueOnce({ success: false, alreadyVoted: true });

    const caller = appRouter.createCaller(createCtx());
    const result = await caller.voting.castVote({
      category: "champion",
      choice: "France",
      voterId: "test-voter-001",
    });

    expect(result.success).toBe(false);
    expect(result.alreadyVoted).toBe(true);
  });

  it("casts best_player vote successfully", async () => {
    vi.mocked(castVote).mockResolvedValueOnce({ success: true, alreadyVoted: false });

    const caller = appRouter.createCaller(createCtx());
    const result = await caller.voting.castVote({
      category: "best_player",
      choice: "Kylian Mbappé",
      voterId: "test-voter-002",
    });

    expect(result.success).toBe(true);
  });
});

describe("voting.getResults", () => {
  beforeEach(() => vi.clearAllMocks());

  it("returns champion vote results with percentages", async () => {
    vi.mocked(getVoteResults).mockResolvedValueOnce({
      total: 100,
      results: [
        { choice: "Brazil", count: 30, percentage: 30 },
        { choice: "France", count: 25, percentage: 25 },
        { choice: "England", count: 20, percentage: 20 },
      ],
    });

    const caller = appRouter.createCaller(createCtx());
    const result = await caller.voting.getResults({ category: "champion" });

    expect(result.total).toBe(100);
    expect(result.results).toHaveLength(3);
    expect(result.results[0].choice).toBe("Brazil");
    expect(result.results[0].percentage).toBe(30);
  });

  it("returns empty results when no votes cast", async () => {
    vi.mocked(getVoteResults).mockResolvedValueOnce({ total: 0, results: [] });

    const caller = appRouter.createCaller(createCtx());
    const result = await caller.voting.getResults({ category: "best_player" });

    expect(result.total).toBe(0);
    expect(result.results).toHaveLength(0);
  });
});

describe("voting.getMyVote", () => {
  beforeEach(() => vi.clearAllMocks());

  it("returns the voter's previous choice", async () => {
    vi.mocked(getVoterChoice).mockResolvedValueOnce("Argentina");

    const caller = appRouter.createCaller(createCtx());
    const result = await caller.voting.getMyVote({
      category: "champion",
      voterId: "test-voter-001",
    });

    expect(result.choice).toBe("Argentina");
  });

  it("returns null when voter has not voted", async () => {
    vi.mocked(getVoterChoice).mockResolvedValueOnce(null);

    const caller = appRouter.createCaller(createCtx());
    const result = await caller.voting.getMyVote({
      category: "champion",
      voterId: "new-voter-999",
    });

    expect(result.choice).toBeNull();
  });
});
