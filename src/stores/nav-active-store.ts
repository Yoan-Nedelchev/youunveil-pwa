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
  setDesktopActiveTab: (tab: DesktopNavTab) => void;
  setMobileActiveTab: (tab: MobileNavTab) => void;
};

export const useNavActiveStore = create<NavActiveState>((set) => ({
  desktopActiveTab: "beginReading",
  mobileActiveTab: "spreads",
  setDesktopActiveTab: (tab) => set({ desktopActiveTab: tab }),
  setMobileActiveTab: (tab) => set({ mobileActiveTab: tab }),
}));
