"use client";

import { useEffect, useState } from "react";

import { SpreadsDesktop } from "./components/spreads-desktop";
import { SpreadsMobile } from "./components/spreads-mobile";

export function SpreadsScreen() {
  const [isDesktop, setIsDesktop] = useState<boolean | null>(null);

  useEffect(() => {
    const desktopMedia = window.matchMedia("(min-width: 768px)");
    const syncViewport = () => setIsDesktop(desktopMedia.matches);
    syncViewport();

    desktopMedia.addEventListener("change", syncViewport);
    return () => desktopMedia.removeEventListener("change", syncViewport);
  }, []);

  if (isDesktop === null) {
    return <div className="min-h-screen" aria-hidden />;
  }

  return isDesktop ? <SpreadsDesktop /> : <SpreadsMobile />;
}
