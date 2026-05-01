"use client";

import { SpreadsDesktop } from "./components/spreads-desktop";
import { SpreadsMobile } from "./components/spreads-mobile";

export function SpreadsScreen() {
  return (
    <>
      <div className="hidden md:block">
        <SpreadsDesktop />
      </div>
      <div className="md:hidden">
        <SpreadsMobile />
      </div>
    </>
  );
}
