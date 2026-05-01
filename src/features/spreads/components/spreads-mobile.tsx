"use client";

import { useTranslations } from "next-intl";

import { CosmicBackdrop } from "@/components/cosmic-backdrop";

import { SpreadSlotMobileFuture } from "./spread-slot-mobile-future";
import { SpreadSlotMobilePast } from "./spread-slot-mobile-past";
import { SpreadSlotMobilePresent } from "./spread-slot-mobile-present";
import { SpreadsDeckMobile } from "./spreads-deck-mobile";
import { SpreadsInitialQuestion } from "./spreads-initial-question";

export function SpreadsMobile() {
  const t = useTranslations("spreads.mobile");

  return (
    <div className="relative min-h-[100dvh] overflow-x-hidden">
      <CosmicBackdrop />
      <main className="text-foreground flex min-h-screen flex-col items-center px-4 pt-24 pb-32">
        <SpreadsInitialQuestion />
        <section
          className="mb-12 grid w-full max-w-md grid-cols-1 gap-6"
          aria-label={t("canvasAria")}
        >
          <SpreadSlotMobilePast />
          <SpreadSlotMobilePresent />
          <SpreadSlotMobileFuture />
        </section>
        <SpreadsDeckMobile />
      </main>
    </div>
  );
}
