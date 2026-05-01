"use client";

import Image from "next/image";
import { useState } from "react";
import { useTranslations } from "next-intl";

import { Button } from "@/components/ui/button";
import { SPREAD_MOBILE_FAN } from "@/features/spreads/image-urls";
import { cn } from "@/lib/utils";

const FAN_STYLES = [
  "-rotate-12 translate-y-4",
  "-rotate-6 translate-y-2",
  "z-10 -translate-y-4 scale-110",
  "rotate-6 translate-y-2",
  "rotate-12 translate-y-4",
] as const;

export function SpreadsDeckMobile() {
  const t = useTranslations("spreads.mobile.deck");
  const alts = useTranslations("spreads.images").raw("fanCardAlts") as string[];
  const [selected, setSelected] = useState<number | null>(2);

  return (
    <section className="bg-surface-container-low relative mt-auto w-full max-w-md rounded-t-[2.5rem] border-t border-white/5 p-8">
      <div
        className="absolute top-3 left-1/2 h-1.5 w-12 -translate-x-1/2 rounded-full bg-white/10"
        aria-hidden
      />
      <div className="flex flex-col items-center">
        <p className="text-label-sm text-palette-secondary/60 mb-6 uppercase">
          {t("eyebrow")}
        </p>
        <div
          className="no-scrollbar flex w-full justify-center overflow-x-auto pb-4"
          role="region"
          aria-label={t("eyebrow")}
        >
          <div className="flex -space-x-8">
            {SPREAD_MOBILE_FAN.map((src, i) => {
              const isSelected = selected === i;
              return (
                <button
                  key={src}
                  type="button"
                  onClick={() => setSelected(i)}
                  className={cn(
                    "glass-card w-24 shrink-0 cursor-pointer overflow-hidden rounded-xl border transition-all duration-300 aspect-[2/3] hover:-translate-y-2",
                    FAN_STYLES[i],
                    isSelected
                      ? "border-palette-secondary z-20 border-2 shadow-[0_0_20px_rgba(233,195,73,0.3)]"
                      : "border-palette-secondary/30 opacity-90",
                  )}
                >
                  <Image
                    src={src}
                    alt={alts[i] ?? ""}
                    width={96}
                    height={144}
                    className="h-full w-full rounded-xl object-cover"
                  />
                </button>
              );
            })}
          </div>
        </div>
        <Button
          type="button"
          className="font-heading mt-4 h-12 w-full rounded-xl border-0 bg-palette-secondary text-sm font-semibold uppercase tracking-widest text-palette-primary shadow-[0_0_15px_rgba(233,195,73,0.4)]"
        >
          {t("interpretCta")}
        </Button>
      </div>
    </section>
  );
}
