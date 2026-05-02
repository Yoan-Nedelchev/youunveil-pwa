import { GoogleGenAI } from "@google/genai/node";
import { NextRequest, NextResponse } from "next/server";

const MODEL = (process.env.GEMINI_MODEL || "gemini-3.1-flash-lite").trim();
const MAX_PROMPT_LENGTH = 8000;

function extractUpstreamErrorMessage(err: unknown): string | null {
  if (!(err instanceof Error)) return null;
  const raw = err.message.trim();
  const jsonStart = raw.indexOf("{");
  if (jsonStart < 0) return null;
  const candidate = raw.slice(jsonStart);
  try {
    const parsed = JSON.parse(candidate) as {
      error?: { message?: string };
    };
    return parsed.error?.message ?? null;
  } catch {
    return null;
  }
}

export async function POST(req: NextRequest) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.error("GEMINI_API_KEY is not set");
    return NextResponse.json({ error: "Service unavailable" }, { status: 503 });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const raw =
    typeof body === "object" &&
    body !== null &&
    "prompt" in body &&
    typeof (body as { prompt: unknown }).prompt === "string"
      ? (body as { prompt: string }).prompt
      : "";
  const prompt = raw.trim();

  if (!prompt) {
    return NextResponse.json({ error: "Missing prompt" }, { status: 400 });
  }

  if (prompt.length > MAX_PROMPT_LENGTH) {
    return NextResponse.json({ error: "Prompt too long" }, { status: 400 });
  }

  if (req.signal.aborted) {
    return NextResponse.json({ error: "Request aborted" }, { status: 499 });
  }

  try {
    const genAI = new GoogleGenAI({ apiKey });
    const res = await genAI.models.generateContent({
      model: MODEL,
      contents: prompt,
      config: {
        abortSignal: req.signal,
      },
    });

    const output = res.text ?? "";
    if (!output) {
      return NextResponse.json({ error: "Empty response" }, { status: 502 });
    }

    return NextResponse.json({ output });
  } catch (err) {
    if (req.signal.aborted) {
      return NextResponse.json({ error: "Request aborted" }, { status: 499 });
    }

    const maybeStatus =
      typeof err === "object" &&
      err !== null &&
      "status" in err &&
      typeof (err as { status: unknown }).status === "number"
        ? (err as { status: number }).status
        : null;

    const upstreamMessage =
      extractUpstreamErrorMessage(err) ?? "Failed to generate content";
    console.error("Gemini error:", err);
    return NextResponse.json(
      { error: upstreamMessage },
      { status: maybeStatus && maybeStatus >= 400 ? maybeStatus : 500 },
    );
  }
}
