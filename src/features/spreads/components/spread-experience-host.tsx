"use client";

import { ArrowLeft, Sparkles } from "lucide-react";
import { useTranslations } from "next-intl";

import { SpreadsDesktop } from "./spreads-desktop";
import { SpreadsMobile } from "./spreads-mobile";
import type { SpreadOptionId } from "./spreads-dashboard.types";

export function SpreadExperienceHost({
  isDesktop,
  selectedSpread,
  inquiry,
  onBack,
}: {
  isDesktop: boolean;
  selectedSpread: SpreadOptionId;
  inquiry: string;
  onBack: () => void;
}) {
  const t = useTranslations("spreads.dashboard");
  const tOptions = useTranslations("spreads.dashboard.options");

  if (selectedSpread === "three-card") {
    return isDesktop ? (
      <SpreadsDesktop inquiry={inquiry} onBackToDashboard={onBack} />
    ) : (
      <SpreadsMobile inquiry={inquiry} onBackToDashboard={onBack} />
    );
  }

  return (
    <div className="cosmic-gradient-bg text-foreground relative min-h-screen overflow-x-hidden">
      <main className="mx-auto flex min-h-screen w-full max-w-3xl flex-col items-center justify-center px-6 text-center">
        <div className="glass-panel border-palette-secondary/25 w-full rounded-2xl border p-8">
          <div className="text-palette-secondary mb-5 inline-flex size-12 items-center justify-center rounded-full bg-palette-secondary/15">
            <Sparkles className="size-5" aria-hidden />
          </div>
          <h1 className="font-heading text-palette-secondary text-2xl md:text-3xl">
            {tOptions(`${selectedSpread}.title`)}
          </h1>
          <p className="text-muted-foreground mt-4 text-sm md:text-base">
            {t("comingSoon")}
          </p>

          <button
            type="button"
            onClick={onBack}
            className="border-palette-secondary/40 text-palette-secondary hover:bg-palette-secondary/10 mt-8 inline-flex items-center gap-2 rounded-lg border px-4 py-2 text-sm"
          >
            <ArrowLeft className="size-4" aria-hidden />
            {t("backToDashboard")}
          </button>
        </div>
      </main>
    </div>
  );
}
