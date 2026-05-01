"use client";

import type { Active } from "@dnd-kit/core";
import Image from "next/image";
import { useTranslations } from "next-intl";

import { TAROT_CARD_BACK_URL } from "@/features/spreads/image-urls";
import { cn } from "@/lib/utils";
import type { SpreadSlotKey } from "@/stores/spread-tarot-store";

type DeckDrag = { source: "deck"; instanceId: string };
type SlotDrag = { source: "slot"; slot: SpreadSlotKey };

export function TarotDragPreview({ active }: { active: Active }) {
  const tDeck = useTranslations("spreads.desktop.deck");
  const data = active.data.current as DeckDrag | SlotDrag | undefined;
  if (!data) return null;

  const fromSlot = data.source === "slot";

  return (
    <div
      className={cn(
        "bg-palette-primary aspect-[2/3] cursor-grabbing overflow-hidden rounded-lg border border-palette-secondary/40 shadow-2xl touch-none",
        fromSlot ? "w-[200px] md:w-[240px]" : "w-[132px] md:w-[160px]",
      )}
    >
      <Image
        src={TAROT_CARD_BACK_URL}
        alt={tDeck("cardBackAlt")}
        width={240}
        height={360}
        className="pointer-events-none h-full w-full object-cover select-none"
        draggable={false}
      />
    </div>
  );
}
