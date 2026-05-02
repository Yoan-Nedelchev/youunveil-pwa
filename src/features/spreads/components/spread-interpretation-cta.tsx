"use client";

import { Loader2, Sparkles } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { useEffect, useMemo, useRef, useState } from "react";
import { toast } from "sonner";

import { cn } from "@/lib/utils";
import { useSpreadTarotStore } from "@/stores/spread-tarot-store";

import { useSpreadInterpretation } from "../hooks/use-spread-interpretation";

function pickPreferredVoice(locale: string): SpeechSynthesisVoice | null {
  if (typeof window === "undefined" || !("speechSynthesis" in window))
    return null;

  const voices = window.speechSynthesis.getVoices();
  if (!voices.length) return null;

  const targetLocale = locale === "bg" ? "bg" : "en";
  const localeVoices = voices.filter((voice) =>
    voice.lang.toLowerCase().startsWith(targetLocale),
  );
  const pool = localeVoices.length > 0 ? localeVoices : voices;

  // Prefer natural-sounding system voices where available.
  const preferredKeywords = [
    "google",
    "natural",
    "neural",
    "enhanced",
    "premium",
    "siri",
    "microsoft",
    "zira",
    "samantha",
    "victoria",
  ];

  for (const keyword of preferredKeywords) {
    const match = pool.find((voice) =>
      voice.name.toLowerCase().includes(keyword),
    );
    if (match) return match;
  }

  return pool[0] ?? null;
}

export function SpreadInterpretationCta({
  inquiry,
  className,
}: {
  inquiry: string;
  className?: string;
}) {
  const locale = useLocale();
  const t = useTranslations("spreads.interpretation");
  const slots = useSpreadTarotStore((state) => state.slots);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const speechSessionRef = useRef(0);
  const [speechState, setSpeechState] = useState<
    "idle" | "speaking" | "paused" | "done" | "error"
  >("idle");

  const spreadCards = useMemo(() => {
    const slotOrder = ["past", "present", "future"] as const;
    return slotOrder
      .map((slot) => {
        const card = slots[slot];
        if (!card) return null;
        return {
          slot,
          cardId: card.cardId,
          orientation: card.orientation,
        };
      })
      .filter((entry) => entry !== null);
  }, [slots]);

  const { canInterpret, isLoading, interpretation, error, runInterpretation } =
    useSpreadInterpretation({
      inquiry,
      locale,
      cards: spreadCards,
    });

  const disabled = !canInterpret || isLoading;
  const showIlluminateButton = interpretation === null;
  const canTogglePlayback = interpretation !== null;
  const canStop = speechState === "speaking" || speechState === "paused";

  useEffect(() => {
    return () => {
      if (typeof window !== "undefined" && "speechSynthesis" in window) {
        speechSessionRef.current += 1;
        window.speechSynthesis.cancel();
      }
      utteranceRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (!interpretation) {
      setSpeechState("idle");
      return;
    }

    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      speechSessionRef.current += 1;
      window.speechSynthesis.cancel();
    }
    utteranceRef.current = null;
    setSpeechState("done");
  }, [interpretation]);

  const handleTogglePlayback = () => {
    if (!interpretation) return;
    if (typeof window === "undefined" || !("speechSynthesis" in window)) {
      setSpeechState("error");
      return;
    }

    const synth = window.speechSynthesis;

    if (speechState === "speaking") {
      synth.pause();
      setSpeechState("paused");
      return;
    }

    if (speechState === "paused") {
      synth.resume();
      setSpeechState("speaking");
      return;
    }

    speechSessionRef.current += 1;
    const sessionId = speechSessionRef.current;
    synth.cancel();

    const utterance = new SpeechSynthesisUtterance(interpretation);
    const selectedVoice = pickPreferredVoice(locale);
    if (selectedVoice) {
      utterance.voice = selectedVoice;
    }
    utterance.lang = locale === "bg" ? "bg-BG" : "en-US";
    utterance.rate = 0.88;
    utterance.pitch = 0.74;
    utterance.volume = 1;
    utterance.onstart = () => {
      if (sessionId !== speechSessionRef.current) return;
      setSpeechState("speaking");
    };
    utterance.onpause = () => {
      if (sessionId !== speechSessionRef.current) return;
      setSpeechState("paused");
    };
    utterance.onresume = () => {
      if (sessionId !== speechSessionRef.current) return;
      setSpeechState("speaking");
    };
    utterance.onend = () => {
      if (sessionId !== speechSessionRef.current) return;
      setSpeechState("done");
    };
    utterance.onerror = () => {
      if (sessionId !== speechSessionRef.current) return;
      setSpeechState("error");
    };

    utteranceRef.current = utterance;
    setSpeechState("speaking");
    synth.speak(utterance);
  };

  const handleStop = () => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      speechSessionRef.current += 1;
      window.speechSynthesis.cancel();
    }
    utteranceRef.current = null;
    setSpeechState("done");
  };

  return (
    <section className={cn("w-full", className)}>
      {showIlluminateButton ? (
        <div className="flex items-center justify-center">
          <button
            type="button"
            onClick={() => {
              if (!canInterpret) {
                toast.info(t("fillAllSlotsHint"));
                return;
              }
              void runInterpretation();
            }}
            disabled={disabled}
            className={cn(
              "inline-flex items-center gap-2 rounded-full px-7 py-3 font-heading text-base tracking-[0.1em] uppercase transition-all",
              disabled
                ? "cursor-not-allowed bg-palette-secondary/40 text-palette-primary/70"
                : "cursor-pointer bg-palette-secondary text-palette-primary hover:bg-palette-secondary/90",
            )}
          >
            {isLoading ? (
              <Loader2 className="size-4 animate-spin" aria-hidden />
            ) : (
              <Sparkles className="size-4" aria-hidden />
            )}
            {isLoading ? t("loadingCta") : t("cta")}
          </button>
        </div>
      ) : null}

      {error ? (
        <p className="text-destructive mt-4 text-center text-sm">
          {t("error")}
        </p>
      ) : null}

      {interpretation ? (
        <div className="glass-panel border-palette-secondary/25 mx-auto mt-5 w-full max-w-3xl rounded-xl border p-5">
          <div className="mb-4 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={handleTogglePlayback}
              disabled={!canTogglePlayback}
              className="border-palette-secondary/35 text-palette-secondary hover:bg-palette-secondary/10 disabled:text-palette-secondary/40 rounded-full border px-3 py-1 text-xs uppercase"
            >
              {speechState === "speaking" ? t("pause") : t("play")}
            </button>
            <button
              type="button"
              onClick={handleStop}
              disabled={!canStop}
              className="border-palette-secondary/35 text-palette-secondary hover:bg-palette-secondary/10 disabled:text-palette-secondary/40 rounded-full border px-3 py-1 text-xs uppercase"
            >
              {t("stop")}
            </button>
          </div>
          <h3 className="text-label-sm text-palette-secondary mb-3 uppercase tracking-widest">
            {t("resultTitle")}
          </h3>
          <p className="text-foreground/90 whitespace-pre-wrap text-sm leading-relaxed md:text-base">
            {interpretation}
          </p>
          {speechState === "error" ? (
            <p className="text-destructive mt-3 text-sm">{t("ttsError")}</p>
          ) : null}
        </div>
      ) : null}
    </section>
  );
}
