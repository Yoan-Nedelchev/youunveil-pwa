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

export async function GET(
  _req: NextRequest,
  context: { params: Promise<{ nameShort: string }> },
) {
  const { nameShort } = await context.params;
  const short = nameShort.trim().toLowerCase();

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

    return NextResponse.json({ card });
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch tarot card" },
      { status: 500 },
    );
  }
}
