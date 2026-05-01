export type TarotApiCardMap = {
  nameShort: string;
  name: string;
};

/**
 * Canonical tarot order used in spreads (cardId 0..77):
 * Major Arcana, Wands, Cups, Swords, Pentacles.
 */
export const TAROT_API_CARD_MAP: readonly TarotApiCardMap[] = [
  { nameShort: "ar00", name: "The Fool" },
  { nameShort: "ar01", name: "The Magician" },
  { nameShort: "ar02", name: "The High Priestess" },
  { nameShort: "ar03", name: "The Empress" },
  { nameShort: "ar04", name: "The Emperor" },
  { nameShort: "ar05", name: "The Hierophant" },
  { nameShort: "ar06", name: "The Lovers" },
  { nameShort: "ar07", name: "The Chariot" },
  { nameShort: "ar08", name: "Strength" },
  { nameShort: "ar09", name: "The Hermit" },
  { nameShort: "ar10", name: "Wheel of Fortune" },
  { nameShort: "ar11", name: "Justice" },
  { nameShort: "ar12", name: "The Hanged Man" },
  { nameShort: "ar13", name: "Death" },
  { nameShort: "ar14", name: "Temperance" },
  { nameShort: "ar15", name: "The Devil" },
  { nameShort: "ar16", name: "The Tower" },
  { nameShort: "ar17", name: "The Star" },
  { nameShort: "ar18", name: "The Moon" },
  { nameShort: "ar19", name: "The Sun" },
  { nameShort: "ar20", name: "Judgement" },
  { nameShort: "ar21", name: "The World" },
  { nameShort: "waac", name: "Ace of Wands" },
  { nameShort: "wa02", name: "Two of Wands" },
  { nameShort: "wa03", name: "Three of Wands" },
  { nameShort: "wa04", name: "Four of Wands" },
  { nameShort: "wa05", name: "Five of Wands" },
  { nameShort: "wa06", name: "Six of Wands" },
  { nameShort: "wa07", name: "Seven of Wands" },
  { nameShort: "wa08", name: "Eight of Wands" },
  { nameShort: "wa09", name: "Nine of Wands" },
  { nameShort: "wa10", name: "Ten of Wands" },
  { nameShort: "wapa", name: "Page of Wands" },
  { nameShort: "wakn", name: "Knight of Wands" },
  { nameShort: "waqu", name: "Queen of Wands" },
  { nameShort: "waki", name: "King of Wands" },
  { nameShort: "cuac", name: "Ace of Cups" },
  { nameShort: "cu02", name: "Two of Cups" },
  { nameShort: "cu03", name: "Three of Cups" },
  { nameShort: "cu04", name: "Four of Cups" },
  { nameShort: "cu05", name: "Five of Cups" },
  { nameShort: "cu06", name: "Six of Cups" },
  { nameShort: "cu07", name: "Seven of Cups" },
  { nameShort: "cu08", name: "Eight of Cups" },
  { nameShort: "cu09", name: "Nine of Cups" },
  { nameShort: "cu10", name: "Ten of Cups" },
  { nameShort: "cupa", name: "Page of Cups" },
  { nameShort: "cukn", name: "Knight of Cups" },
  { nameShort: "cuqu", name: "Queen of Cups" },
  { nameShort: "cuki", name: "King of Cups" },
  { nameShort: "swac", name: "Ace of Swords" },
  { nameShort: "sw02", name: "Two of Swords" },
  { nameShort: "sw03", name: "Three of Swords" },
  { nameShort: "sw04", name: "Four of Swords" },
  { nameShort: "sw05", name: "Five of Swords" },
  { nameShort: "sw06", name: "Six of Swords" },
  { nameShort: "sw07", name: "Seven of Swords" },
  { nameShort: "sw08", name: "Eight of Swords" },
  { nameShort: "sw09", name: "Nine of Swords" },
  { nameShort: "sw10", name: "Ten of Swords" },
  { nameShort: "swpa", name: "Page of Swords" },
  { nameShort: "swkn", name: "Knight of Swords" },
  { nameShort: "swqu", name: "Queen of Swords" },
  { nameShort: "swki", name: "King of Swords" },
  { nameShort: "peac", name: "Ace of Pentacles" },
  { nameShort: "pe02", name: "Two of Pentacles" },
  { nameShort: "pe03", name: "Three of Pentacles" },
  { nameShort: "pe04", name: "Four of Pentacles" },
  { nameShort: "pe05", name: "Five of Pentacles" },
  { nameShort: "pe06", name: "Six of Pentacles" },
  { nameShort: "pe07", name: "Seven of Pentacles" },
  { nameShort: "pe08", name: "Eight of Pentacles" },
  { nameShort: "pe09", name: "Nine of Pentacles" },
  { nameShort: "pe10", name: "Ten of Pentacles" },
  { nameShort: "pepa", name: "Page of Pentacles" },
  { nameShort: "pekn", name: "Knight of Pentacles" },
  { nameShort: "pequ", name: "Queen of Pentacles" },
  { nameShort: "peki", name: "King of Pentacles" },
] as const;

export function getTarotApiNameShort(cardId: number): string {
  const card = TAROT_API_CARD_MAP[cardId];
  if (!card) {
    throw new RangeError(`Invalid tarot card id ${cardId}`);
  }
  return card.nameShort;
}

export function getTarotApiCardName(cardId: number): string {
  const card = TAROT_API_CARD_MAP[cardId];
  if (!card) {
    throw new RangeError(`Invalid tarot card id ${cardId}`);
  }
  return card.name;
}
