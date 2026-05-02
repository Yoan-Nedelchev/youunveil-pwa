"use client";

import { ArrowRight, Grid3X3, Heart, History, Sun } from "lucide-react";
import { useTranslations } from "next-intl";

import { cn } from "@/lib/utils";

import type { SpreadOption } from "./spreads-dashboard.types";

const ICONS = {
  "daily-guidance": Sun,
  "three-card": History,
  "ethereal-bond": Heart,
  "celtic-cross": Grid3X3,
} as const;

export function SpreadOptionCard({
  option,
  onSelect,
}: {
  option: SpreadOption;
  onSelect: (option: SpreadOption) => void;
}) {
  const t = useTranslations("spreads.dashboard.options");
  const Icon = ICONS[option.id];

  return (
    <button
      type="button"
      onClick={() => onSelect(option)}
      className={cn(
        "glass-panel group relative flex h-full w-full flex-col justify-between rounded-xl p-6 text-left transition-all duration-300",
        "hover:border-palette-secondary/50 hover:shadow-[0_0_20px_rgba(233,195,73,0.15)]",
      )}
    >
      <div className="mb-8">
        <div className="bg-palette-secondary/15 text-palette-secondary mb-5 flex size-11 items-center justify-center rounded-full">
          <Icon className="size-5" aria-hidden />
        </div>
        <h3 className="font-heading text-palette-secondary text-xl">
          {t(`${option.id}.title`)}
        </h3>
        <p className="text-muted-foreground mt-3 text-sm leading-relaxed">
          {t(`${option.id}.description`)}
        </p>
      </div>

      <div className="mt-auto flex items-center justify-between">
        <span className="text-label-sm text-palette-secondary rounded-full bg-palette-secondary/10 px-3 py-1 uppercase">
          {t("cardsCount", { count: option.cardsCount })}
        </span>
        <span className="text-palette-secondary inline-flex items-center gap-2 text-xs font-semibold tracking-wider uppercase">
          {t("selectCta")}
          <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
        </span>
      </div>
    </button>
  );
}
