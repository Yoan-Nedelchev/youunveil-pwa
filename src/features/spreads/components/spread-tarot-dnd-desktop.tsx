"use client";

import {
  DndContext,
  DragOverlay,
  PointerSensor,
  useSensor,
  useSensors,
  type Active,
  type DragEndEvent,
  type DragStartEvent,
} from "@dnd-kit/core";
import { useState } from "react";

import { TarotDragPreview } from "./tarot-drag-preview";

import {
  TAROT_DECK_DROPPABLE_ID,
  type SpreadSlotKey,
  useSpreadTarotStore,
} from "@/stores/spread-tarot-store";

type DeckDrag = { source: "deck"; instanceId: string };
type SlotDrag = { source: "slot"; slot: SpreadSlotKey };

function slotFromDroppableId(id: string): SpreadSlotKey | null {
  if (id === "slot-past") return "past";
  if (id === "slot-present") return "present";
  if (id === "slot-future") return "future";
  return null;
}

export function SpreadTarotDndDesktop({
  children,
}: {
  children: React.ReactNode;
}) {
  const placeFromDeck = useSpreadTarotStore((s) => s.placeFromDeck);
  const returnToDeck = useSpreadTarotStore((s) => s.returnToDeck);
  const moveSlotToSlot = useSpreadTarotStore((s) => s.moveSlotToSlot);
  const [active, setActive] = useState<Active | null>(null);
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
  );

  const onDragStart = (e: DragStartEvent) => {
    setActive(e.active);
  };

  const onDragEnd = (e: DragEndEvent) => {
    const { active: a, over } = e;
    setActive(null);
    if (!over) return;
    const payload = a.data.current as DeckDrag | SlotDrag | undefined;
    if (!payload) return;
    const slot = slotFromDroppableId(String(over.id));

    if (payload.source === "deck" && slot) {
      placeFromDeck(slot, payload.instanceId);
      return;
    }
    if (payload.source === "slot") {
      if (String(over.id) === TAROT_DECK_DROPPABLE_ID) {
        returnToDeck(payload.slot);
        return;
      }
      if (slot && slot !== payload.slot) {
        moveSlotToSlot(payload.slot, slot);
      }
    }
  };

  const onDragCancel = () => {
    setActive(null);
  };

  return (
    <DndContext
      sensors={sensors}
      autoScroll={false}
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      onDragCancel={onDragCancel}
    >
      {children}
      <DragOverlay dropAnimation={null}>
        {active ? <TarotDragPreview active={active} /> : null}
      </DragOverlay>
    </DndContext>
  );
}
