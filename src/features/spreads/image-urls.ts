/** Original mystical card-back art from the Stitch mock. */
export const TAROT_CARD_BACK_URL =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuBFogWfrQkH_wvNxKkQuKSXd-HeWT6Qu0CJpN3_zvit93cbfQ4gcC66NDtqGrsbMyxKv24iBLZ7gz5uCo3AAWlHOi1IeXX73i5TlF4osKbLBIVH9Ny6LRfbDhcoRF4-jyzMesws0Ju6CHeo7dTJjuH3M6hN__m_vBvNhonSByo-jpGgcdWz9mSsM-_5PImpMb2SKfa6LYSNjXIF3Y0PA3MXIC55lXyS3JIMpMd4PD0FsF3L2XboSWZA2EJcgRARjpK6mqiDCKmqQ53O";

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
