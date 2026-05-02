export type SpreadOptionId =
  | "daily-guidance"
  | "three-card"
  | "ethereal-bond"
  | "celtic-cross";

export type SpreadOption = {
  id: SpreadOptionId;
  cardsCount: number;
};

export const SPREAD_OPTIONS: readonly SpreadOption[] = [
  { id: "daily-guidance", cardsCount: 1 },
  { id: "three-card", cardsCount: 3 },
  { id: "ethereal-bond", cardsCount: 5 },
  { id: "celtic-cross", cardsCount: 10 },
] as const;
