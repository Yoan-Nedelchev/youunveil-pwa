"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";

import { SPREAD_MOBILE_PRESENT } from "@/features/spreads/image-urls";

export function SpreadSlotMobilePresent() {
  const t = useTranslations("spreads.mobile.slots.present");
  const tImg = useTranslations("spreads.images");
  const tags = t.raw("tags") as string[];

  return (
    <div className="group relative">
      <div className="mb-2 flex items-center justify-between px-2">
        <span className="text-label-sm text-palette-secondary tracking-widest uppercase">
          {t("label")}
        </span>
        <span className="text-label-sm text-amber-100/90 italic">
          {t("aside")}
        </span>
      </div>
      <div className="glass-card cosmic-glow relative flex aspect-[2/3] flex-col items-center justify-center overflow-hidden rounded-2xl border-2 border-palette-secondary/40">
        <div className="from-palette-secondary/20 absolute inset-0 bg-gradient-to-b to-transparent" />
        <Image
          src={SPREAD_MOBILE_PRESENT}
          alt={tImg("mobilePresent")}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 360px"
        />
        <div className="absolute right-0 bottom-0 left-0 bg-gradient-to-t from-black/80 to-transparent p-4">
          <h3 className="font-heading text-palette-secondary text-xl">
            {t("cardTitle")}
          </h3>
          <div className="mt-2 flex flex-wrap gap-2">
            {tags.map((tag) => (
              <span
                key={tag}
                className="border-palette-secondary/20 bg-surface-container-low text-amber-100/90 rounded-full border px-2 py-0.5 text-[10px]"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
