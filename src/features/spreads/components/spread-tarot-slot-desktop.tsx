"use client";

import { useDraggable, useDroppable } from "@dnd-kit/core";
import type { LucideIcon } from "lucide-react";
import { X } from "lucide-react";
import Image from "next/image";
import { useTranslations } from "next-intl";

import { TAROT_CARD_BACK_URL } from "@/features/spreads/image-urls";
import { getRwsCardFaceUrl } from "@/lib/tarot/rws-card-faces";
import { cn } from "@/lib/utils";
import {
  SPREAD_SLOT_DROPPABLE,
  type SpreadSlotKey,
  useSpreadTarotStore,
} from "@/stores/spread-tarot-store";

export function SpreadTarotSlotDesktop({
  slotKey,
  title,
  subtitle,
  dragLabel,
  icon: Icon,
}: {
  slotKey: SpreadSlotKey;
  title: string;
  subtitle: string;
  dragLabel: string;
  icon: LucideIcon;
}) {
  const card = useSpreadTarotStore((s) => s.slots[slotKey]);
  const revealed = useSpreadTarotStore((s) => s.revealed[slotKey]);
  const toggleReveal = useSpreadTarotStore((s) => s.toggleReveal);
  const returnToDeck = useSpreadTarotStore((s) => s.returnToDeck);
  const droppableId = SPREAD_SLOT_DROPPABLE[slotKey];
  const tDeck = useTranslations("spreads.desktop.deck");
  const tRoot = useTranslations("spreads.desktop");

  const { setNodeRef: setDropRef, isOver } = useDroppable({ id: droppableId });
  const {
    attributes,
    listeners,
    setNodeRef: setDragRef,
    isDragging,
  } = useDraggable({
    id: `slot-drag-${slotKey}`,
    data: { source: "slot" as const, slot: slotKey },
    disabled: !card,
    attributes: {
      role: "group",
      tabIndex: -1,
      roleDescription: "Draggable tarot card",
    },
  });

  const faceUrl = card ? getRwsCardFaceUrl(card.cardId) : "";

  return (
    <div className="flex flex-col items-center">
      <div
        ref={setDropRef}
        className={cn(
          "relative w-full max-w-[200px] md:max-w-[240px]",
          isOver &&
            "ring-teal-accent/60 rounded-xl ring-2 ring-offset-2 ring-offset-transparent",
        )}
      >
        {!card ? (
          <div
            className={cn(
              "card-slot-interactive glass-panel group relative flex aspect-[2/3] w-full cursor-default flex-col items-center justify-center gap-4 overflow-hidden rounded-xl border-2 border-dashed border-amber-900/30",
            )}
          >
            <Icon
              className="size-10 text-amber-900/40 transition-colors group-hover:text-amber-400/40"
              aria-hidden
            />
            <span className="text-label-sm text-amber-900/40 transition-colors group-hover:text-amber-400/40 uppercase">
              {dragLabel}
            </span>
            <div className="absolute inset-0 bg-palette-secondary/5 opacity-0 transition-opacity group-hover:opacity-100" />
          </div>
        ) : (
          <div
            ref={setDragRef}
            className={cn(
              "relative cursor-grab touch-none active:cursor-grabbing",
              isDragging && "pointer-events-none opacity-0",
            )}
            aria-label={tDeck("dragHandleAria")}
            {...listeners}
            {...attributes}
          >
            <button
              type="button"
              className="border-destructive/40 bg-palette-primary/95 text-destructive-foreground hover:bg-destructive/25 absolute -top-2 -right-2 z-30 flex size-9 cursor-pointer items-center justify-center rounded-full border shadow-md"
              aria-label={tDeck("clearSlotAria")}
              onPointerDown={(e) => e.stopPropagation()}
              onClick={() => returnToDeck(slotKey)}
            >
              <X className="size-4" strokeWidth={2.5} aria-hidden />
            </button>
            <div
              role="button"
              tabIndex={0}
              className="tarot-flip-scene aspect-[2/3] w-full cursor-grab rounded-xl focus-visible:ring-ring focus-visible:ring-2 focus-visible:outline-none active:cursor-grabbing"
              onClick={() => toggleReveal(slotKey)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  toggleReveal(slotKey);
                }
              }}
              aria-pressed={revealed}
              aria-label={`${title}. ${tRoot("slotFlipHint")}`}
            >
              <div
                className={cn(
                  "tarot-flip-inner relative h-full w-full rounded-xl shadow-xl",
                  revealed && "is-revealed",
                )}
              >
                <div className="tarot-flip-face bg-palette-primary absolute inset-0 overflow-hidden rounded-xl border border-palette-secondary/40">
                  <Image
                    src={TAROT_CARD_BACK_URL}
                    alt={tDeck("cardBackAlt")}
                    fill
                    className="object-cover"
                    sizes="240px"
                    draggable={false}
                  />
                </div>
                <div className="tarot-flip-face tarot-flip-face--front bg-palette-primary absolute inset-0 overflow-hidden rounded-xl border border-palette-secondary/30">
                  <Image
                    src={faceUrl}
                    alt={tDeck("faceAlt")}
                    fill
                    className={cn(
                      "object-cover",
                      card.orientation === "reversed" && "rotate-180",
                    )}
                    sizes="240px"
                    draggable={false}
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <h3 className="font-heading text-palette-secondary mt-6 text-xl font-medium">
        {title}
      </h3>
      <p className="text-label-sm text-muted-foreground mt-1 tracking-tighter uppercase opacity-60">
        {subtitle}
      </p>
    </div>
  );
}
