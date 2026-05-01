"use client";

import { useDroppable } from "@dnd-kit/core";
import { useTranslations } from "next-intl";

import { TAROT_DECK_DROPPABLE_ID } from "@/stores/spread-tarot-store";

export function TarotDeckDropZoneDesktop({
  children,
}: {
  children: React.ReactNode;
}) {
  const { setNodeRef, isOver } = useDroppable({ id: TAROT_DECK_DROPPABLE_ID });
  const t = useTranslations("spreads.desktop.deck");

  return (
    <div
      ref={setNodeRef}
      aria-label={t("dropDeckAria")}
      className={
        isOver
          ? "ring-teal-accent/50 rounded-3xl ring-2 ring-offset-2 ring-offset-palette-primary"
          : ""
      }
    >
      {children}
    </div>
  );
}
