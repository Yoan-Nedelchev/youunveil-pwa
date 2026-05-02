"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import { getTarotApiCardName } from "@/lib/tarot/tarotapi-map";
import type {
  SpreadSlotKey,
  TarotOrientation,
} from "@/stores/spread-tarot-store";

type SpreadCardInput = {
  slot: SpreadSlotKey;
  cardId: number;
  orientation: TarotOrientation;
};

export function useSpreadInterpretation({
  inquiry,
  locale,
  cards,
}: {
  inquiry: string;
  locale: string;
  cards: SpreadCardInput[];
}) {
  const abortControllerRef = useRef<AbortController | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [interpretation, setInterpretation] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const canInterpret = useMemo(() => cards.length === 3, [cards.length]);

  useEffect(() => {
    return () => {
      abortControllerRef.current?.abort();
    };
  }, []);

  const runInterpretation = useCallback(async () => {
    if (!canInterpret || isLoading) return;

    const slotLabels: Record<SpreadSlotKey, string> = {
      past: "Past",
      present: "Present",
      future: "Future",
    };

    const cardLines = cards.map(
      (card) =>
        `- ${slotLabels[card.slot]}: ${getTarotApiCardName(card.cardId)} (${card.orientation})`,
    );

    const languageInstruction =
      locale === "bg" ? "Respond in Bulgarian." : "Respond in English.";

    const prompt = [
      "You are You Unveil's tarot interpreter.",
      "Use the user question and this exact 3-card spread to produce a specific, practical interpretation.",
      "",
      `User question: ${inquiry}`,
      "",
      "Spread cards:",
      ...cardLines,
      "",
      "Required structure:",
      "1) Core theme (2-3 sentences)",
      "2) Card-by-card interpretation (Past / Present / Future)",
      "3) Practical guidance for the next 7 days (3 bullet points)",
      "4) One reflective question for journaling",
      "",
      languageInstruction,
    ].join("\n");

    const abortController = new AbortController();
    abortControllerRef.current = abortController;

    setIsLoading(true);
    setError(null);
    setInterpretation(null);

    try {
      const response = await fetch("/api/gemini", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
        signal: abortController.signal,
      });

      const data = (await response.json()) as {
        output?: string;
        error?: string;
      };
      if (
        !response.ok ||
        typeof data.output !== "string" ||
        data.output.length === 0
      ) {
        throw new Error(
          data.error ?? "Failed to generate spread interpretation",
        );
      }

      setInterpretation(data.output);
    } catch (caughtError) {
      if (
        caughtError instanceof DOMException &&
        caughtError.name === "AbortError"
      ) {
        return;
      }

      setError(
        caughtError instanceof Error
          ? caughtError.message
          : "Failed to generate spread interpretation",
      );
    } finally {
      if (abortControllerRef.current === abortController) {
        abortControllerRef.current = null;
      }
      setIsLoading(false);
    }
  }, [canInterpret, cards, inquiry, isLoading, locale]);

  return {
    canInterpret,
    isLoading,
    interpretation,
    error,
    runInterpretation,
  };
}
