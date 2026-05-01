"use client";

import Image from "next/image";
import { History } from "lucide-react";
import { useTranslations } from "next-intl";

import { SPREAD_MOBILE_PAST } from "@/features/spreads/image-urls";

export function SpreadSlotMobilePast() {
  const t = useTranslations("spreads.mobile.slots.past");
  const alt = useTranslations("spreads.images")("mobilePast");

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
        <Image
          src={SPREAD_MOBILE_PAST}
          alt={alt}
          fill
          className="object-cover opacity-80 transition-opacity group-hover:opacity-100"
          sizes="(max-width: 768px) 100vw, 360px"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-t from-black/50 to-transparent p-6 text-center backdrop-blur-sm">
          <History
            className="text-palette-secondary/30 mb-2 size-10"
            aria-hidden
          />
          <p className="font-heading text-palette-secondary/40">
            {t("overlayTitle")}
          </p>
        </div>
      </div>
    </div>
  );
}
