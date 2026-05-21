import { describe, expect, it, vi, beforeEach } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

// Mock the LLM module
vi.mock("./_core/llm", () => ({
  invokeLLM: vi.fn(),
}));

import { invokeLLM } from "./_core/llm";

function createPublicContext(): TrpcContext {
  return {
    user: null,
    req: { protocol: "https", headers: {} } as TrpcContext["req"],
    res: { clearCookie: vi.fn() } as unknown as TrpcContext["res"],
  };
}

describe("worldcup.championPredict", () => {
  beforeEach(() => vi.clearAllMocks());

  it("returns top 5 team predictions with probabilities", async () => {
    const mockPredictions = {
      predictions: [
        { team: "Brazil", probability: 22, reason: "Strong squad depth" },
        { team: "France", probability: 20, reason: "World-class attack" },
        { team: "England", probability: 15, reason: "Balanced squad" },
        { team: "Argentina", probability: 14, reason: "Defending champions" },
        { team: "Spain", probability: 12, reason: "Possession masters" },
      ],
    };

    vi.mocked(invokeLLM).mockResolvedValueOnce({
      choices: [{ message: { content: JSON.stringify(mockPredictions) } }],
    } as any);

    const caller = appRouter.createCaller(createPublicContext());
    const result = await caller.worldcup.championPredict();

    expect(result.predictions).toHaveLength(5);
    expect(result.predictions[0].team).toBe("Brazil");
    expect(result.predictions[0].probability).toBe(22);
    expect(typeof result.predictions[0].reason).toBe("string");
  });

  it("throws when LLM returns no content", async () => {
    vi.mocked(invokeLLM).mockResolvedValueOnce({
      choices: [{ message: { content: null } }],
    } as any);

    const caller = appRouter.createCaller(createPublicContext());
    await expect(caller.worldcup.championPredict()).rejects.toThrow("No response from AI");
  });
});

describe("worldcup.matchPredict", () => {
  beforeEach(() => vi.clearAllMocks());

  it("returns match prediction with win/draw/loss percentages", async () => {
    const mockPrediction = {
      analysis: "France vs England is a clash of two European giants.",
      homeWin: 45,
      draw: 25,
      awayWin: 30,
      keyPlayers: "Key players: Mbappé (France), Bellingham (England)",
    };

    vi.mocked(invokeLLM).mockResolvedValueOnce({
      choices: [{ message: { content: JSON.stringify(mockPrediction) } }],
    } as any);

    const caller = appRouter.createCaller(createPublicContext());
    const result = await caller.worldcup.matchPredict({
      homeTeam: "France",
      awayTeam: "England",
      matchId: "C3",
    });

    expect(result.homeWin + result.draw + result.awayWin).toBe(100);
    expect(typeof result.analysis).toBe("string");
    expect(result.analysis.length).toBeGreaterThan(10);
  });

  it("normalizes probabilities to sum to 100", async () => {
    const mockPrediction = {
      analysis: "Test match analysis.",
      homeWin: 40,
      draw: 20,
      awayWin: 20, // Sum = 80, should be normalized
      keyPlayers: "Key players: Test",
    };

    vi.mocked(invokeLLM).mockResolvedValueOnce({
      choices: [{ message: { content: JSON.stringify(mockPrediction) } }],
    } as any);

    const caller = appRouter.createCaller(createPublicContext());
    const result = await caller.worldcup.matchPredict({
      homeTeam: "Brazil",
      awayTeam: "Argentina",
      matchId: "B3",
    });

    expect(result.homeWin + result.draw + result.awayWin).toBe(100);
  });
});

describe("worldcup.goldenBootPredict", () => {
  beforeEach(() => vi.clearAllMocks());

  it("returns golden boot predictions with player probabilities", async () => {
    const mockData = {
      summary: "Mbappé leads the race with France's attacking setup.",
      predictions: [
        { player: "Kylian Mbappé", flag: "🇫🇷", probability: 28, reason: "Elite striker in peak form" },
        { player: "Erling Haaland", flag: "🇳🇴", probability: 22, reason: "Clinical finisher" },
        { player: "Vinícius Jr.", flag: "🇧🇷", probability: 18, reason: "Brazil's main attacker" },
        { player: "Lionel Messi", flag: "🇦🇷", probability: 15, reason: "Tournament experience" },
        { player: "Jude Bellingham", flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿", probability: 12, reason: "Goals from midfield" },
      ],
    };

    vi.mocked(invokeLLM).mockResolvedValueOnce({
      choices: [{ message: { content: JSON.stringify(mockData) } }],
    } as any);

    const caller = appRouter.createCaller(createPublicContext());
    const result = await caller.worldcup.goldenBootPredict();

    expect(result.predictions).toHaveLength(5);
    expect(result.predictions[0].player).toBe("Kylian Mbappé");
    expect(typeof result.summary).toBe("string");
    expect(result.summary.length).toBeGreaterThan(10);
  });
});
