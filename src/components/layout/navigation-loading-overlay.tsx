"use client";

import { Loader2 } from "lucide-react";

import { useNavActiveStore } from "@/stores/nav-active-store";

export function NavigationLoadingOverlay() {
  const isNavigating = useNavActiveStore((s) => s.isNavigating);

  if (!isNavigating) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/25 backdrop-blur-sm">
      <div
        className="glass-panel border-palette-secondary/25 flex items-center gap-4 rounded-2xl border px-8 py-5"
        role="status"
        aria-live="polite"
      >
        <Loader2
          className="text-palette-secondary size-10 animate-spin"
          aria-hidden
        />
        <span className="text-base font-medium">Loading...</span>
      </div>
    </div>
  );
}
