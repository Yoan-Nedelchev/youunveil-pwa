import { RWS_DECK_SIZE } from "@/lib/tarot/rws-card-faces";
import { create } from "zustand";

export type SpreadSlotKey = "past" | "present" | "future";

export type TarotOrientation = "upright" | "reversed";

export type TarotDrawCard = {
  cardId: number;
  instanceId: string;
  orientation: TarotOrientation;
};

export type TarotCardInfo = {
  name: string;
  nameShort: string;
  value: string;
  suit: string;
  type: string;
  desc: string;
  meaningUp: string;
  meaningRev: string;
};

function newInstanceId(): string {
  return typeof crypto !== "undefined" && "randomUUID" in crypto
    ? crypto.randomUUID()
    : `tarot-${Date.now()}-${Math.random().toString(36).slice(2, 11)}`;
}

function shuffleInPlace<T>(arr: T[]): void {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const t = arr[i]!;
    arr[i] = arr[j]!;
    arr[j] = t;
  }
}

const emptySlots: Record<SpreadSlotKey, TarotDrawCard | null> = {
  past: null,
  present: null,
  future: null,
};

const emptyRevealed: Record<SpreadSlotKey, boolean> = {
  past: false,
  present: false,
  future: false,
};

type SpreadTarotState = {
  deck: TarotDrawCard[];
  slots: Record<SpreadSlotKey, TarotDrawCard | null>;
  revealed: Record<SpreadSlotKey, boolean>;
  cardInfoCache: Record<string, TarotCardInfo>;
  shuffleGeneration: number;
  initSpread: () => void;
  placeFromDeck: (slot: SpreadSlotKey, instanceId: string) => void;
  returnToDeck: (slot: SpreadSlotKey) => void;
  moveSlotToSlot: (from: SpreadSlotKey, to: SpreadSlotKey) => void;
  toggleReveal: (slot: SpreadSlotKey) => void;
  setCardInfoCache: (cacheKey: string, info: TarotCardInfo) => void;
};

export const useSpreadTarotStore = create<SpreadTarotState>((set) => ({
  deck: [],
  slots: { ...emptySlots },
  revealed: { ...emptyRevealed },
  cardInfoCache: {},
  shuffleGeneration: 0,

  initSpread: () => {
    const order = Array.from({ length: RWS_DECK_SIZE }, (_, i) => i);
    shuffleInPlace(order);
    const deck: TarotDrawCard[] = order.map((cardId) => ({
      cardId,
      instanceId: newInstanceId(),
      orientation: Math.random() < 0.5 ? "upright" : "reversed",
    }));
    set({
      deck,
      slots: { ...emptySlots },
      revealed: { ...emptyRevealed },
      shuffleGeneration: 0,
    });
  },

  placeFromDeck: (slot, instanceId) =>
    set((s) => {
      const idx = s.deck.findIndex((c) => c.instanceId === instanceId);
      if (idx === -1) return s;
      const nextDeck = [...s.deck];
      const [card] = nextDeck.splice(idx, 1);
      const prev = s.slots[slot];
      if (prev) nextDeck.push(prev);
      if (prev) shuffleInPlace(nextDeck);
      return {
        deck: nextDeck,
        slots: { ...s.slots, [slot]: card },
        revealed: { ...s.revealed, [slot]: false },
        shuffleGeneration: prev ? s.shuffleGeneration + 1 : s.shuffleGeneration,
      };
    }),

  returnToDeck: (slot) =>
    set((s) => {
      const card = s.slots[slot];
      if (!card) return s;
      const nextDeck = [...s.deck, card];
      shuffleInPlace(nextDeck);
      return {
        deck: nextDeck,
        slots: { ...s.slots, [slot]: null },
        revealed: { ...s.revealed, [slot]: false },
        shuffleGeneration: s.shuffleGeneration + 1,
      };
    }),

  moveSlotToSlot: (from, to) =>
    set((s) => {
      if (from === to) return s;
      const card = s.slots[from];
      if (!card || s.slots[to]) return s;
      return {
        slots: { ...s.slots, [from]: null, [to]: card },
        revealed: {
          ...s.revealed,
          [from]: false,
          [to]: false,
        },
      };
    }),

  toggleReveal: (slot) =>
    set((s) => {
      if (!s.slots[slot]) return s;
      return {
        revealed: { ...s.revealed, [slot]: !s.revealed[slot] },
      };
    }),

  setCardInfoCache: (cacheKey, info) =>
    set((s) => ({
      cardInfoCache: { ...s.cardInfoCache, [cacheKey]: info },
    })),
}));

export const SPREAD_SLOT_DROPPABLE = {
  past: "slot-past",
  present: "slot-present",
  future: "slot-future",
} as const;

export const TAROT_DECK_DROPPABLE_ID = "tarot-deck";
