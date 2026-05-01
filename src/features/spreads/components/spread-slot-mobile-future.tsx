"use client";

import { Wand2 } from "lucide-react";
import { useTranslations } from "next-intl";

export function SpreadSlotMobileFuture() {
  const t = useTranslations("spreads.mobile.slots.future");

  return (
    <div className="group relative">
      <div className="mb-2 flex items-center justify-between px-2">
        <span className="text-label-sm text-slate-500 tracking-widest uppercase">
          {t("label")}
        </span>
        <span className="text-label-sm text-palette-tertiary italic">
          {t("aside")}
        </span>
      </div>
      <div className="glass-card border-slate-700 hover:border-palette-secondary/50 relative flex aspect-[2/3] flex-col items-center justify-center overflow-hidden rounded-2xl border-2 border-dashed transition-all duration-500">
        <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
          <Wand2 className="text-slate-700 mb-2 size-10" aria-hidden />
          <p className="font-heading text-slate-600 italic">{t("empty")}</p>
        </div>
      </div>
    </div>
  );
}
