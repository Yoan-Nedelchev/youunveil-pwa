"use client";

import { useTranslations } from "next-intl";

import { CosmicBackdrop } from "@/components/cosmic-backdrop";

type ScreenKey = "oracle" | "journal" | "profile" | "arcana";

export function MarketingSubScreen({ screenKey }: { screenKey: ScreenKey }) {
  const t = useTranslations("screens");

  return (
    <div className="relative min-h-screen px-6 pt-28 pb-32 md:pb-40">
      <CosmicBackdrop />
      <div className="relative mx-auto max-w-lg text-center">
        <h1 className="font-heading text-palette-secondary text-3xl md:text-4xl">
          {t(`${screenKey}.title`)}
        </h1>
        <p className="text-muted-foreground mt-4 text-base leading-relaxed">
          {t(`${screenKey}.description`)}
        </p>
      </div>
    </div>
  );
}
