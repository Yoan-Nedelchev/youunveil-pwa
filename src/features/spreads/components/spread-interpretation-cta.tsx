"use client";

import { Loader2, Sparkles } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { useMemo } from "react";
import { toast } from "sonner";

import { cn } from "@/lib/utils";
import { useSpreadTarotStore } from "@/stores/spread-tarot-store";

import { useSpreadInterpretation } from "../hooks/use-spread-interpretation";

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
          <h3 className="text-label-sm text-palette-secondary mb-3 uppercase tracking-widest">
            {t("resultTitle")}
          </h3>
          <p className="text-foreground/90 whitespace-pre-wrap text-sm leading-relaxed md:text-base">
            {interpretation}
          </p>
        </div>
      ) : null}
    </section>
  );
}
