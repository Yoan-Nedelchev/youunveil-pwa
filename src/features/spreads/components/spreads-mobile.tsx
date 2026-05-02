"use client";

import { ArrowLeft, Info, Loader2, X } from "lucide-react";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

import { CosmicBackdrop } from "@/components/cosmic-backdrop";
import { TAROT_CARD_BACK_URL } from "@/features/spreads/image-urls";
import { getRwsCardFaceUrl } from "@/lib/tarot/rws-card-faces";
import { getTarotApiNameShort } from "@/lib/tarot/tarotapi-map";
import { cn } from "@/lib/utils";
import {
  type TarotCardInfo,
  useSpreadTarotStore,
} from "@/stores/spread-tarot-store";

import { SpreadsInitialQuestion } from "./spreads-initial-question";

export function SpreadsMobile({
  inquiry,
  onBackToDashboard,
}: {
  inquiry?: string;
  onBackToDashboard?: () => void;
}) {
  const locale = useLocale();
  const t = useTranslations("spreads.mobile");
  const tDesktop = useTranslations("spreads.desktop");
  const tSlots = useTranslations("spreads.mobile.slots");
  const tInfo = useTranslations("spreads.desktop.cardInfo");
  const tDeck = useTranslations("spreads.desktop.deck");
  const tDashboard = useTranslations("spreads.dashboard");
  const initSpread = useSpreadTarotStore((s) => s.initSpread);
  const placeFromDeck = useSpreadTarotStore((s) => s.placeFromDeck);
  const slots = useSpreadTarotStore((s) => s.slots);
  const revealed = useSpreadTarotStore((s) => s.revealed);
  const toggleReveal = useSpreadTarotStore((s) => s.toggleReveal);
  const cardInfoCache = useSpreadTarotStore((s) => s.cardInfoCache);
  const setCardInfoCache = useSpreadTarotStore((s) => s.setCardInfoCache);

  const [isMobileViewport, setIsMobileViewport] = useState(false);
  const [isLoadingInfo, setIsLoadingInfo] = useState(false);
  const [cardInfo, setCardInfo] = useState<{
    name: string;
    suit: string;
    type: string;
    value: string;
    desc: string;
    meaning: string;
    orientation: "upright" | "reversed";
  } | null>(null);
  const initializedRef = useRef(false);

  useEffect(() => {
    const media = window.matchMedia("(max-width: 767px)");
    const syncViewport = () => setIsMobileViewport(media.matches);
    syncViewport();
    media.addEventListener("change", syncViewport);
    return () => media.removeEventListener("change", syncViewport);
  }, []);

  useEffect(() => {
    if (!isMobileViewport || initializedRef.current) return;
    initSpread();
    const deck = useSpreadTarotStore.getState().deck;
    if (deck.length < 3) return;
    placeFromDeck("past", deck[0]!.instanceId);
    placeFromDeck("present", deck[1]!.instanceId);
    placeFromDeck("future", deck[2]!.instanceId);
    initializedRef.current = true;
  }, [initSpread, isMobileViewport, placeFromDeck]);

  useEffect(() => {
    if (!cardInfo) return;

    const previousBodyOverflow = document.body.style.overflow;
    const previousHtmlOverflow = document.documentElement.style.overflow;
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousBodyOverflow;
      document.documentElement.style.overflow = previousHtmlOverflow;
    };
  }, [cardInfo]);

  async function requestCardInfo(payload: {
    cardId: number;
    orientation: "upright" | "reversed";
  }) {
    const cacheKey = `${locale}:${payload.cardId}`;
    const cached = cardInfoCache[cacheKey];
    if (cached) {
      setCardInfo({
        name: cached.name,
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
      const response = await fetch(
        `/api/tarot/cards/${nameShort}?locale=${locale}`,
        { method: "GET" },
      );
      if (!response.ok) throw new Error("Card info request failed");
      const data = (await response.json()) as {
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

      const normalized: TarotCardInfo = {
        name: data.card.name,
        nameShort: data.card.name_short,
        value: data.card.value,
        suit: data.card.suit,
        type: data.card.type,
        desc: data.card.desc,
        meaningUp: data.card.meaning_up,
        meaningRev: data.card.meaning_rev,
      };

      setCardInfoCache(cacheKey, normalized);

      setCardInfo({
        name: normalized.name,
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
      toast.error(tInfo("errorToast"));
    } finally {
      setIsLoadingInfo(false);
    }
  }

  if (!isMobileViewport) return null;

  return (
    <div className="relative min-h-[100dvh] overflow-x-hidden">
      <CosmicBackdrop />
      <main
        className={cn(
          "text-foreground flex min-h-screen flex-col items-center px-4 pt-16 pb-24 transition-[filter]",
          (isLoadingInfo || cardInfo) && "pointer-events-none blur-[2px]",
        )}
      >
        {onBackToDashboard ? (
          <div className="mb-5 flex w-full max-w-md items-center justify-start">
            <button
              type="button"
              onClick={onBackToDashboard}
              className="border-palette-secondary/40 text-palette-secondary hover:bg-palette-secondary/10 inline-flex items-center gap-2 rounded-lg border px-4 py-2 text-sm"
            >
              <ArrowLeft className="size-4" aria-hidden />
              {tDashboard("backToDashboard")}
            </button>
          </div>
        ) : null}
        <SpreadsInitialQuestion question={inquiry} />
        <section
          className="mb-6 grid w-full max-w-md grid-cols-1 gap-8"
          aria-label={t("canvasAria")}
        >
          {(["past", "present", "future"] as const).map((slotKey) => {
            const card = slots[slotKey];
            if (!card) return null;

            return (
              <div key={slotKey} className="group relative">
                <div className="mb-3 flex items-center justify-center px-2">
                  <span className="font-heading text-palette-secondary text-base tracking-[0.18em] uppercase">
                    {tSlots(`${slotKey}.label`)}
                  </span>
                </div>
                <div className="glass-card cosmic-glow relative mx-auto flex aspect-[2/3] w-full max-w-[230px] flex-col items-center justify-center overflow-hidden rounded-2xl border-2 border-palette-secondary/40">
                  {revealed[slotKey] ? (
                    <button
                      type="button"
                      className="border-palette-secondary/40 bg-palette-primary/95 text-palette-secondary hover:bg-palette-secondary/15 absolute top-3 left-3 z-20 flex size-9 items-center justify-center rounded-full border shadow-md"
                      aria-label={tDeck("infoAria")}
                      onClick={() =>
                        void requestCardInfo({
                          cardId: card.cardId,
                          orientation: card.orientation,
                        })
                      }
                    >
                      <Info className="size-4" aria-hidden />
                    </button>
                  ) : null}

                  <div
                    role="button"
                    tabIndex={0}
                    className="tarot-flip-scene h-full w-full cursor-pointer rounded-2xl focus-visible:ring-ring focus-visible:ring-2 focus-visible:outline-none"
                    onClick={() => toggleReveal(slotKey)}
                    onKeyDown={(event) => {
                      if (event.key === "Enter" || event.key === " ") {
                        event.preventDefault();
                        toggleReveal(slotKey);
                      }
                    }}
                    aria-pressed={revealed[slotKey]}
                    aria-label={`${tSlots(`${slotKey}.label`)}. ${tDesktop("slotFlipHint")}`}
                  >
                    <div
                      className={cn(
                        "tarot-flip-inner relative h-full w-full rounded-2xl",
                        revealed[slotKey] && "is-revealed",
                      )}
                    >
                      <div className="tarot-flip-face bg-palette-primary absolute inset-0 overflow-hidden rounded-2xl">
                        <Image
                          src={TAROT_CARD_BACK_URL}
                          alt={tDeck("cardBackAlt")}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, 360px"
                          draggable={false}
                        />
                      </div>
                      <div className="tarot-flip-face tarot-flip-face--front bg-palette-primary absolute inset-0 overflow-hidden rounded-2xl">
                        <Image
                          src={getRwsCardFaceUrl(card.cardId)}
                          alt={tDeck("faceAlt")}
                          fill
                          className={cn(
                            "object-cover",
                            card.orientation === "reversed" && "rotate-180",
                          )}
                          sizes="(max-width: 768px) 100vw, 360px"
                          draggable={false}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </section>
      </main>

      {isLoadingInfo ? (
        <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/20 backdrop-blur-sm">
          <div className="glass-panel flex items-center gap-3 rounded-xl px-5 py-3">
            <Loader2 className="text-palette-secondary size-5 animate-spin" />
            <span className="text-sm">{tInfo("loading")}</span>
          </div>
        </div>
      ) : null}

      {cardInfo ? (
        <div
          className="fixed inset-0 z-[80] flex items-center justify-center overflow-hidden bg-black/40 p-4 backdrop-blur-sm"
          onClick={() => setCardInfo(null)}
          role="dialog"
          aria-modal="true"
          aria-label={tInfo("modalAria")}
        >
          <div
            className="glass-panel border-palette-secondary/25 flex max-h-[85dvh] w-full max-w-md flex-col rounded-2xl border p-6 shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="mb-4 flex items-start justify-between gap-4">
              <div>
                <p className="text-palette-secondary text-label-sm uppercase tracking-widest">
                  {cardInfo.orientation === "upright"
                    ? tInfo("orientationUpright")
                    : tInfo("orientationReversed")}
                </p>
                <h2 className="font-heading mt-1 text-xl">{cardInfo.name}</h2>
                <p className="text-muted-foreground mt-1 text-xs">
                  {cardInfo.type} · {cardInfo.suit} · {cardInfo.value}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setCardInfo(null)}
                className="border-border hover:bg-muted/40 rounded-md border p-1.5"
                aria-label={tInfo("closeAria")}
              >
                <X className="size-4" />
              </button>
            </div>

            <div className="space-y-4 overflow-y-auto overscroll-contain pr-1">
              <div>
                <h3 className="text-palette-secondary mb-1 text-sm font-semibold">
                  {tInfo("meaningTitle")}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {cardInfo.meaning}
                </p>
              </div>
              <div>
                <h3 className="text-palette-secondary mb-1 text-sm font-semibold">
                  {tInfo("descriptionTitle")}
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
  );
}
