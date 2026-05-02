import { GoogleGenAI } from "@google/genai/node";
import { NextRequest, NextResponse } from "next/server";

type TarotApiCard = {
  name: string;
  name_short: string;
  value: string;
  value_int: number;
  suit: string;
  type: string;
  meaning_up: string;
  meaning_rev: string;
  desc: string;
};

type TarotApiResponse = {
  nhits: number;
  card?: TarotApiCard;
  cards?: TarotApiCard[];
};

type TarotTranslationResponse = {
  name: string;
  value: string;
  suit: string;
  type: string;
  meaning_up: string;
  meaning_rev: string;
  desc: string;
};

const TRANSLATION_MODEL = "gemini-3.1-flash-lite";

function parseJsonObject(text: string): TarotTranslationResponse | null {
  const trimmed = text.trim();
  const normalized = trimmed.startsWith("```")
    ? trimmed
        .replace(/^```(?:json)?\s*/i, "")
        .replace(/```$/, "")
        .trim()
    : trimmed;
  try {
    const parsed = JSON.parse(normalized) as TarotTranslationResponse;
    if (
      typeof parsed.name === "string" &&
      typeof parsed.value === "string" &&
      typeof parsed.suit === "string" &&
      typeof parsed.type === "string" &&
      typeof parsed.meaning_up === "string" &&
      typeof parsed.meaning_rev === "string" &&
      typeof parsed.desc === "string"
    ) {
      return parsed;
    }
  } catch {
    return null;
  }
  return null;
}

async function translateCardToBulgarian(
  card: TarotApiCard,
): Promise<TarotApiCard | null> {
  const apiKey = process.env.GEMINI_API_KEY?.trim();
  if (!apiKey) return null;

  const genAI = new GoogleGenAI({ apiKey });
  const prompt = [
    "Translate the following tarot card data to Bulgarian.",
    "Return strict JSON only with keys:",
    "name, value, suit, type, meaning_up, meaning_rev, desc",
    "Do not translate name_short.",
    JSON.stringify({
      name: card.name,
      value: card.value,
      suit: card.suit,
      type: card.type,
      meaning_up: card.meaning_up,
      meaning_rev: card.meaning_rev,
      desc: card.desc,
    }),
  ].join("\n");

  const res = await genAI.models.generateContent({
    model: TRANSLATION_MODEL,
    contents: prompt,
  });

  const translated = parseJsonObject(res.text ?? "");
  if (!translated) return null;

  return {
    ...card,
    name: translated.name,
    value: translated.value,
    suit: translated.suit,
    type: translated.type,
    meaning_up: translated.meaning_up,
    meaning_rev: translated.meaning_rev,
    desc: translated.desc,
  };
}

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ nameShort: string }> },
) {
  const { nameShort } = await context.params;
  const short = nameShort.trim().toLowerCase();
  const locale = req.nextUrl.searchParams.get("locale")?.trim().toLowerCase();

  if (!/^[a-z]{2}(?:\d{2}|ac|pa|kn|qu|ki)$/.test(short)) {
    return NextResponse.json(
      { error: "Invalid card short name" },
      { status: 400 },
    );
  }

  try {
    const res = await fetch(`https://tarotapi.dev/api/v1/cards/${short}`, {
      method: "GET",
      cache: "no-store",
    });

    if (!res.ok) {
      return NextResponse.json(
        { error: "Tarot service failed" },
        { status: 502 },
      );
    }

    const data = (await res.json()) as TarotApiResponse;
    const card = data.card ?? data.cards?.[0];

    if (!card) {
      return NextResponse.json({ error: "Card not found" }, { status: 404 });
    }

    if (locale === "bg") {
      const translatedCard = await translateCardToBulgarian(card);
      if (!translatedCard) {
        return NextResponse.json(
          { error: "Failed to translate card" },
          { status: 502 },
        );
      }
      return NextResponse.json({ card: translatedCard });
    }

    return NextResponse.json({ card });
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch tarot card" },
      { status: 500 },
    );
  }
}
