"use client";

import { usePathname } from "@/i18n/navigation";
import { useNavActiveStore } from "@/stores/nav-active-store";
import { useEffect } from "react";

/** Keeps Zustand nav highlight in sync with the current route. */
export function NavActiveSync() {
  const pathname = usePathname();
  const setDesktop = useNavActiveStore((s) => s.setDesktopActiveTab);
  const setMobile = useNavActiveStore((s) => s.setMobileActiveTab);
  const setIsNavigating = useNavActiveStore((s) => s.setIsNavigating);

  useEffect(() => {
    const p = pathname || "/";
    setIsNavigating(false);

    if (p === "/") {
      setDesktop("beginReading");
      setMobile("home");
      return;
    }
    if (p.startsWith("/spreads")) {
      setDesktop("spreads");
      setMobile("spreads");
      return;
    }
    if (p.startsWith("/journal")) {
      setDesktop("myJournal");
      setMobile("journal");
      return;
    }
    if (p.startsWith("/arcana")) {
      setDesktop("theArcana");
      setMobile("home");
      return;
    }
    if (p.startsWith("/oracle")) {
      setDesktop("beginReading");
      setMobile("home");
      return;
    }
    if (p.startsWith("/profile")) {
      setDesktop("beginReading");
      setMobile("profile");
    }
  }, [pathname, setDesktop, setIsNavigating, setMobile]);

  return null;
}
