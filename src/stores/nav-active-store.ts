import { create } from "zustand";

export type DesktopNavTab =
  | "beginReading"
  | "spreads"
  | "myJournal"
  | "theArcana";

export type MobileNavTab = "oracle" | "spreads" | "journal" | "profile";

type NavActiveState = {
  desktopActiveTab: DesktopNavTab;
  mobileActiveTab: MobileNavTab;
  isNavigating: boolean;
  setDesktopActiveTab: (tab: DesktopNavTab) => void;
  setMobileActiveTab: (tab: MobileNavTab) => void;
  setIsNavigating: (value: boolean) => void;
};

export const useNavActiveStore = create<NavActiveState>((set) => ({
  desktopActiveTab: "beginReading",
  mobileActiveTab: "spreads",
  isNavigating: false,
  setDesktopActiveTab: (tab) => set({ desktopActiveTab: tab }),
  setMobileActiveTab: (tab) => set({ mobileActiveTab: tab }),
  setIsNavigating: (value) => set({ isNavigating: value }),
}));
