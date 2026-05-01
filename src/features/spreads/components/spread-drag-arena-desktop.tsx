"use client";

import { History, Eye, Sparkles } from "lucide-react";
import { useTranslations } from "next-intl";

import type { TarotOrientation } from "@/stores/spread-tarot-store";

import { SpreadTarotSlotDesktop } from "./spread-tarot-slot-desktop";

export function SpreadDragArenaDesktop({
  onRequestCardInfo,
}: {
  onRequestCardInfo: (payload: {
    cardId: number;
    orientation: TarotOrientation;
  }) => void;
}) {
  const t = useTranslations("spreads.desktop.slots");
  const tRoot = useTranslations("spreads.desktop");

  return (
    <section
      className="relative mb-1.5 shrink-0 grid grid-cols-1 gap-8 md:mb-2 md:grid-cols-3"
      aria-label={tRoot("arenaAria")}
    >
      <SpreadTarotSlotDesktop
        slotKey="past"
        title={t("past.title")}
        subtitle={t("past.subtitle")}
        dragLabel={t("past.dragLabel")}
        icon={History}
        onRequestCardInfo={onRequestCardInfo}
      />
      <SpreadTarotSlotDesktop
        slotKey="present"
        title={t("present.title")}
        subtitle={t("present.subtitle")}
        dragLabel={t("present.dragLabel")}
        icon={Eye}
        onRequestCardInfo={onRequestCardInfo}
      />
      <SpreadTarotSlotDesktop
        slotKey="future"
        title={t("future.title")}
        subtitle={t("future.subtitle")}
        dragLabel={t("future.dragLabel")}
        icon={Sparkles}
        onRequestCardInfo={onRequestCardInfo}
      />
    </section>
  );
}
