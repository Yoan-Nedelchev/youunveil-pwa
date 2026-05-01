"use client";

import { Loader2, X } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { useEffect } from "react";
import { toast } from "sonner";
import { useState } from "react";

import { CosmicBackdrop } from "@/components/cosmic-backdrop";
import { getTarotApiNameShort } from "@/lib/tarot/tarotapi-map";
import { cn } from "@/lib/utils";
import {
  type TarotCardInfo,
  useSpreadTarotStore,
} from "@/stores/spread-tarot-store";

import { SpreadDragArenaDesktop } from "./spread-drag-arena-desktop";
import { SpreadsInitialQuestion } from "./spreads-initial-question";
import { SpreadTarotDndDesktop } from "./spread-tarot-dnd-desktop";
import { TarotDeckDropZoneDesktop } from "./tarot-deck-drop-zone-desktop";
import { TarotDeckFanDesktop } from "./tarot-deck-fan-desktop";

export function SpreadsDesktop() {
  const locale = useLocale();
  const t = useTranslations("spreads.desktop.cardInfo");
  const initSpread = useSpreadTarotStore((s) => s.initSpread);
  const cardInfoCache = useSpreadTarotStore((s) => s.cardInfoCache);
  const setCardInfoCache = useSpreadTarotStore((s) => s.setCardInfoCache);
  const [isLoadingInfo, setIsLoadingInfo] = useState(false);
  const [cardInfo, setCardInfo] = useState<{
    name: string;
    nameShort: string;
    suit: string;
    type: string;
    value: string;
    desc: string;
    meaning: string;
    orientation: "upright" | "reversed";
  } | null>(null);

  useEffect(() => {
    initSpread();
  }, [initSpread]);

  async function requestCardInfo(payload: {
    cardId: number;
    orientation: "upright" | "reversed";
  }) {
    const cacheKey = `${locale}:${payload.cardId}`;
    const cached = cardInfoCache[cacheKey];
    if (cached) {
      setCardInfo({
        name: cached.name,
        nameShort: cached.nameShort,
        suit: cached.suit,
        type: cached.type,
        value: cached.value,
        desc: cached.desc,
        meaning:
          payload.orientation === "upright"
            ? cached.meaningUp
            : cached.meaningRev,
        orientation: payload.orientation,
      });
      return;
    }

    setIsLoadingInfo(true);
    setCardInfo(null);
    try {
      const nameShort = getTarotApiNameShort(payload.cardId);
      const res = await fetch(
        `/api/tarot/cards/${nameShort}?locale=${locale}`,
        {
          method: "GET",
        },
      );
      if (!res.ok) {
        throw new Error("Request failed");
      }
      const data = (await res.json()) as {
        card: {
          name: string;
          name_short: string;
          value: string;
          suit: string;
          type: string;
          desc: string;
          meaning_up: string;
          meaning_rev: string;
        };
      };
      const card = data.card;
      const normalized: TarotCardInfo = {
        name: card.name,
        nameShort: card.name_short,
        suit: card.suit,
        type: card.type,
        value: card.value,
        desc: card.desc,
        meaningUp: card.meaning_up,
        meaningRev: card.meaning_rev,
      };
      setCardInfoCache(cacheKey, normalized);
      setCardInfo({
        name: normalized.name,
        nameShort: normalized.nameShort,
        suit: normalized.suit,
        type: normalized.type,
        value: normalized.value,
        desc: normalized.desc,
        meaning:
          payload.orientation === "upright"
            ? normalized.meaningUp
            : normalized.meaningRev,
        orientation: payload.orientation,
      });
    } catch {
      toast.error(t("errorToast"));
    } finally {
      setIsLoadingInfo(false);
    }
  }

  return (
    <div className="cosmic-gradient-bg text-foreground relative min-h-screen overflow-x-hidden">
      <CosmicBackdrop />
      <SpreadTarotDndDesktop>
        <div className="relative">
          <main
            className={cn(
              "mx-auto flex min-h-screen max-w-6xl flex-col px-6 pt-16 pb-24 transition-[filter] md:px-12",
              isLoadingInfo && "pointer-events-none blur-[2px]",
            )}
          >
            <SpreadsInitialQuestion className="max-w-none" />
            <SpreadDragArenaDesktop onRequestCardInfo={requestCardInfo} />
            <section className="-mt-8 flex w-full flex-col items-center md:-mt-12">
              <TarotDeckDropZoneDesktop>
                <TarotDeckFanDesktop />
              </TarotDeckDropZoneDesktop>
            </section>
          </main>

          {isLoadingInfo ? (
            <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/20 backdrop-blur-sm">
              <div className="glass-panel flex items-center gap-3 rounded-xl px-5 py-3">
                <Loader2 className="text-palette-secondary size-5 animate-spin" />
                <span className="text-sm">{t("loading")}</span>
              </div>
            </div>
          ) : null}

          {cardInfo ? (
            <div
              className="fixed inset-0 z-[80] flex items-center justify-center bg-black/40 p-4"
              onClick={() => setCardInfo(null)}
              role="dialog"
              aria-modal="true"
              aria-label={t("modalAria")}
            >
              <div
                className="glass-panel border-palette-secondary/25 w-full max-w-xl rounded-2xl border p-6 shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="mb-4 flex items-start justify-between gap-4">
                  <div>
                    <p className="text-palette-secondary text-label-sm uppercase tracking-widest">
                      {cardInfo.orientation === "upright"
                        ? t("orientationUpright")
                        : t("orientationReversed")}
                    </p>
                    <h2 className="font-heading mt-1 text-2xl">
                      {cardInfo.name}
                    </h2>
                    <p className="text-muted-foreground mt-1 text-sm">
                      {cardInfo.type} · {cardInfo.suit} · {cardInfo.value}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setCardInfo(null)}
                    className="border-border hover:bg-muted/40 rounded-md border p-1.5"
                    aria-label={t("closeAria")}
                  >
                    <X className="size-4" />
                  </button>
                </div>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-palette-secondary mb-1 text-sm font-semibold">
                      {t("meaningTitle")}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {cardInfo.meaning}
                    </p>
                  </div>
                  <div>
                    <h3 className="text-palette-secondary mb-1 text-sm font-semibold">
                      {t("descriptionTitle")}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {cardInfo.desc}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </SpreadTarotDndDesktop>
    </div>
  );
}
