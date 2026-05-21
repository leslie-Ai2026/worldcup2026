import { z } from "zod";
import { publicProcedure, router } from "../_core/trpc";
import { invokeLLM } from "../_core/llm";

// ─── Champion Predictor ───────────────────────────────────────────────────────
const championPredictRouter = publicProcedure.query(async () => {
  const response = await invokeLLM({
    messages: [
      {
        role: "system",
        content: `You are a world-class football analyst specializing in FIFA World Cup predictions. 
Analyze the 2026 FIFA World Cup (hosted by USA, Canada, Mexico) and provide championship win probabilities.
Always respond with valid JSON only, no markdown, no extra text.`,
      },
      {
        role: "user",
        content: `Provide the top 5 most likely 2026 FIFA World Cup champions with win probabilities.
Consider: current squad quality, recent form, tournament history, key players, and tactical setup.

Return JSON in this exact format:
{
  "predictions": [
    {
      "team": "Brazil",
      "probability": 22,
      "reason": "Strong squad depth with Vinicius Jr. leading attack"
    }
  ]
}

Rules:
- Exactly 5 teams
- Probabilities must sum to 100 or less (remaining goes to "rest of world")
- Teams must be from: Brazil, France, England, Argentina, Spain, Germany, Portugal, Netherlands, Belgium, Italy
- Order by probability descending`,
      },
    ],
    response_format: {
      type: "json_schema",
      json_schema: {
        name: "champion_predictions",
        strict: true,
        schema: {
          type: "object",
          properties: {
            predictions: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  team: { type: "string" },
                  probability: { type: "number" },
                  reason: { type: "string" },
                },
                required: ["team", "probability", "reason"],
                additionalProperties: false,
              },
            },
          },
          required: ["predictions"],
          additionalProperties: false,
        },
      },
    },
  });

  const content = response.choices[0]?.message?.content;
  if (!content || typeof content !== "string") throw new Error("No response from AI");

  const parsed = JSON.parse(content);
  return parsed as {
    predictions: Array<{ team: string; probability: number; reason: string }>;
  };
});

// ─── Match Predictor ──────────────────────────────────────────────────────────
const matchPredictRouter = publicProcedure
  .input(
    z.object({
      homeTeam: z.string(),
      awayTeam: z.string(),
      matchId: z.string(),
    })
  )
  .query(async ({ input }) => {
    const response = await invokeLLM({
      messages: [
        {
          role: "system",
          content: `You are an expert football match analyst. Provide concise, insightful match previews and predictions in English.
Always respond with valid JSON only, no markdown, no extra text.`,
        },
        {
          role: "user",
          content: `Analyze the 2026 FIFA World Cup group stage match: ${input.homeTeam} vs ${input.awayTeam}.

Provide:
1. A 2-3 sentence analysis covering recent form, head-to-head record, and key tactical matchups
2. Win/draw/loss probabilities (must sum to 100)
3. Key players to watch (one sentence)

Return JSON in this exact format:
{
  "analysis": "Brief tactical analysis in English...",
  "homeWin": 45,
  "draw": 25,
  "awayWin": 30,
  "keyPlayers": "Key players: [player names and brief note]"
}`,
        },
      ],
      response_format: {
        type: "json_schema",
        json_schema: {
          name: "match_prediction",
          strict: true,
          schema: {
            type: "object",
            properties: {
              analysis: { type: "string" },
              homeWin: { type: "number" },
              draw: { type: "number" },
              awayWin: { type: "number" },
              keyPlayers: { type: "string" },
            },
            required: ["analysis", "homeWin", "draw", "awayWin", "keyPlayers"],
            additionalProperties: false,
          },
        },
      },
    });

  const content = response.choices[0]?.message?.content;
  if (!content || typeof content !== "string") throw new Error("No response from AI");

  const parsed = JSON.parse(content);
  // Normalize probabilities to sum to 100
    const total = parsed.homeWin + parsed.draw + parsed.awayWin;
    if (total !== 100) {
      const scale = 100 / total;
      parsed.homeWin = Math.round(parsed.homeWin * scale);
      parsed.draw = Math.round(parsed.draw * scale);
      parsed.awayWin = 100 - parsed.homeWin - parsed.draw;
    }
    return parsed as {
      analysis: string;
      homeWin: number;
      draw: number;
      awayWin: number;
      keyPlayers: string;
    };
  });

// ─── Golden Boot Predictor ────────────────────────────────────────────────────
const goldenBootPredictRouter = publicProcedure.query(async () => {
  const response = await invokeLLM({
    messages: [
      {
        role: "system",
        content: `You are a football statistics expert specializing in individual player performance analysis.
Analyze Golden Boot contenders for the 2026 FIFA World Cup. Always respond with valid JSON only.`,
      },
      {
        role: "user",
        content: `Predict the top 5 Golden Boot contenders for the 2026 FIFA World Cup.
Consider: player form, team's attacking style, number of matches expected, historical World Cup scoring records, and age/peak performance.

Key players to consider: Kylian Mbappé (France), Lionel Messi (Argentina), Jude Bellingham (England), Vinícius Jr. (Brazil), Erling Haaland (Norway), Mohamed Salah (Egypt), Pedri (Spain), Victor Osimhen (Nigeria).

Return JSON in this exact format:
{
  "summary": "Brief 2-sentence overview of the Golden Boot race",
  "predictions": [
    {
      "player": "Kylian Mbappé",
      "flag": "🇫🇷",
      "probability": 28,
      "reason": "France's primary striker with elite finishing and pace"
    }
  ]
}

Rules:
- Exactly 5 players
- Probabilities must sum to 100 or less
- Order by probability descending
- Keep reasons concise (under 80 chars)`,
      },
    ],
    response_format: {
      type: "json_schema",
      json_schema: {
        name: "golden_boot_predictions",
        strict: true,
        schema: {
          type: "object",
          properties: {
            summary: { type: "string" },
            predictions: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  player: { type: "string" },
                  flag: { type: "string" },
                  probability: { type: "number" },
                  reason: { type: "string" },
                },
                required: ["player", "flag", "probability", "reason"],
                additionalProperties: false,
              },
            },
          },
          required: ["summary", "predictions"],
          additionalProperties: false,
        },
      },
    },
  });

  const content = response.choices[0]?.message?.content;
  if (!content || typeof content !== "string") throw new Error("No response from AI");

  const parsed = JSON.parse(content);
  return parsed as {
    summary: string;
    predictions: Array<{ player: string; flag: string; probability: number; reason: string }>;
  };
});

// ─── Router ───────────────────────────────────────────────────────────────────
export const worldcupRouter = router({
  championPredict: championPredictRouter,
  matchPredict: matchPredictRouter,
  goldenBootPredict: goldenBootPredictRouter,
});
