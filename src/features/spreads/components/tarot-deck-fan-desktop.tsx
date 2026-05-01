"use client";

import { useDraggable } from "@dnd-kit/core";
import Image from "next/image";
import { useTranslations } from "next-intl";

import { TAROT_CARD_BACK_URL } from "@/features/spreads/image-urls";
import { cn } from "@/lib/utils";
import {
  type TarotDrawCard,
  useSpreadTarotStore,
} from "@/stores/spread-tarot-store";

function DeckFanCard({
  card,
  index,
  total,
  isShuffling,
}: {
  card: TarotDrawCard;
  index: number;
  total: number;
  isShuffling: boolean;
}) {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: card.instanceId,
    data: { source: "deck" as const, instanceId: card.instanceId },
  });

  const t = useTranslations("spreads.desktop.deck");
  const arcSpan = 140;
  const startAngle = total <= 1 ? 0 : -arcSpan / 2;
  const angle = total <= 1 ? 0 : startAngle + (arcSpan / (total - 1)) * index;
  const normalizedX = total <= 1 ? 0 : (index / (total - 1)) * 2 - 1;
  const yOffset = total <= 1 ? 0 : normalizedX ** 2 * 56;

  const style = {
    transform: `rotate(${angle}deg) translateY(${yOffset}px)`,
    zIndex: index,
    transformOrigin: "bottom center" as const,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn(
        "fan-card pointer-events-auto absolute w-[132px] cursor-grab md:w-[160px] active:cursor-grabbing",
        isDragging && "pointer-events-none opacity-0",
        isShuffling && "duration-500 ease-out",
      )}
      {...listeners}
      {...attributes}
    >
      <div className="bg-palette-primary aspect-[2/3] w-full overflow-hidden rounded-lg border border-palette-secondary/40 shadow-2xl">
        <Image
          src={TAROT_CARD_BACK_URL}
          alt={t("cardBackAlt")}
          width={160}
          height={240}
          className="h-full w-full object-cover"
          draggable={false}
        />
      </div>
    </div>
  );
}

export function TarotDeckFanDesktop() {
  const deck = useSpreadTarotStore((s) => s.deck);
  const shuffleGeneration = useSpreadTarotStore((s) => s.shuffleGeneration);
  const total = deck.length;

  return (
    <div
      key={shuffleGeneration}
      className="deck-shuffle-burst deck-fan-container deck-fan-container--lg relative mx-auto w-full max-w-6xl overflow-visible"
      aria-hidden={total === 0}
    >
      <div className="absolute inset-x-0 bottom-0 flex h-full w-full items-end justify-center pb-1 md:pb-2">
        {deck.map((card, i) => (
          <DeckFanCard
            key={card.instanceId}
            card={card}
            index={i}
            total={total}
            isShuffling={shuffleGeneration > 0}
          />
        ))}
      </div>
    </div>
  );
}
