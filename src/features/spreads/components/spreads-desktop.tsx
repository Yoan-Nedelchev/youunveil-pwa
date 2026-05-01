"use client";

import { useEffect } from "react";

import { CosmicBackdrop } from "@/components/cosmic-backdrop";
import { useSpreadTarotStore } from "@/stores/spread-tarot-store";

import { SeekersInquirySection } from "./seekers-inquiry-section";
import { SpreadDragArenaDesktop } from "./spread-drag-arena-desktop";
import { SpreadTarotDndDesktop } from "./spread-tarot-dnd-desktop";
import { TarotDeckDropZoneDesktop } from "./tarot-deck-drop-zone-desktop";
import { TarotDeckFanDesktop } from "./tarot-deck-fan-desktop";

export function SpreadsDesktop() {
  const initSpread = useSpreadTarotStore((s) => s.initSpread);

  useEffect(() => {
    initSpread();
  }, [initSpread]);

  return (
    <div className="cosmic-gradient-bg text-foreground relative min-h-screen overflow-x-hidden">
      <CosmicBackdrop />
      <SpreadTarotDndDesktop>
        <main className="mx-auto flex min-h-screen max-w-6xl flex-col px-6 pt-32 pb-32 md:px-12">
          <SeekersInquirySection />
          <SpreadDragArenaDesktop />
          <section className="-mt-8 flex w-full flex-col items-center md:-mt-12">
            <TarotDeckDropZoneDesktop>
              <TarotDeckFanDesktop />
            </TarotDeckDropZoneDesktop>
          </section>
        </main>
      </SpreadTarotDndDesktop>
    </div>
  );
}
