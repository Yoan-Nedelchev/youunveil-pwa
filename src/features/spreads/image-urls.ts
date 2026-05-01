/** Local images avoid flaky upstream 400 responses during development. */
export const TAROT_CARD_BACK_URL = "/images/spreads/tarot-back.svg";

/** Desktop spread deck stack (back art), left→right fan order in mock. */
export const SPREAD_DESKTOP_STACK: readonly string[] = [
  TAROT_CARD_BACK_URL,
  TAROT_CARD_BACK_URL,
  TAROT_CARD_BACK_URL,
  TAROT_CARD_BACK_URL,
  TAROT_CARD_BACK_URL,
] as const;

export const SPREAD_MOBILE_PAST = TAROT_CARD_BACK_URL;

export const SPREAD_MOBILE_PRESENT =
  "https://upload.wikimedia.org/wikipedia/commons/d/de/RWS_Tarot_01_Magician.jpg";

/** Mobile deck fan, center card emphasized in mock. */
export const SPREAD_MOBILE_FAN: readonly string[] = [
  TAROT_CARD_BACK_URL,
  TAROT_CARD_BACK_URL,
  TAROT_CARD_BACK_URL,
  TAROT_CARD_BACK_URL,
  TAROT_CARD_BACK_URL,
] as const;
