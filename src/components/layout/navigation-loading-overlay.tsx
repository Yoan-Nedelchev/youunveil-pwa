"use client";

import { Loader2 } from "lucide-react";

import { useNavActiveStore } from "@/stores/nav-active-store";

export function NavigationLoadingOverlay() {
  const isNavigating = useNavActiveStore((s) => s.isNavigating);

  if (!isNavigating) return null;

  return (
    <div className="absolute inset-0 z-40 flex items-center justify-center bg-black/25 backdrop-blur-sm">
      <div
        className="glass-panel border-palette-secondary/25 flex items-center rounded-2xl border px-8 py-6"
        role="status"
        aria-live="polite"
        aria-label="Loading"
      >
        <Loader2
          className="text-palette-secondary size-14 animate-spin"
          aria-hidden
        />
      </div>
    </div>
  );
}
