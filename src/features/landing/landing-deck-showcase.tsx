"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import { CheckCircle } from "lucide-react";

import { LANDING_IMAGES } from "@/features/landing/image-urls";

export function LandingDeckShowcase() {
  const t = useTranslations("landing.deck");

  return (
    <section
      id="deck"
      className="bg-surface-container-low relative overflow-hidden py-24"
      aria-labelledby="deck-heading"
    >
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-16 px-6 md:flex-row md:px-12">
        <div className="order-2 w-full md:order-1 md:w-1/2">
          <div className="grid grid-cols-2 gap-4">
            <div className="border-palette-secondary/30 group relative aspect-[2/3] -rotate-3 cursor-pointer overflow-hidden rounded-lg border shadow-2xl transition-transform duration-700 hover:rotate-0">
              <div className="bg-palette-secondary/10 group-hover:bg-transparent absolute inset-0 z-10 transition-colors" />
              <Image
                src={LANDING_IMAGES.deckCelestial}
                alt={t("card1Alt")}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 45vw, 320px"
              />
              <div className="absolute bottom-4 left-4 z-20">
                <span className="rounded bg-black/80 px-3 py-1 text-xs font-semibold tracking-widest text-palette-secondary uppercase">
                  {t("card1Label")}
                </span>
              </div>
            </div>
            <div className="border-teal-accent/30 group relative aspect-[2/3] translate-y-8 rotate-6 cursor-pointer overflow-hidden rounded-lg border shadow-2xl transition-transform duration-700 hover:rotate-0">
              <div className="bg-teal-accent/10 group-hover:bg-transparent absolute inset-0 z-10 transition-colors" />
              <Image
                src={LANDING_IMAGES.deckOracle}
                alt={t("card2Alt")}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 45vw, 320px"
              />
              <div className="absolute bottom-4 left-4 z-20">
                <span className="text-teal-accent rounded bg-black/80 px-3 py-1 text-xs font-semibold tracking-widest uppercase">
                  {t("card2Label")}
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="order-1 w-full md:order-2 md:w-1/2">
          <h2
            id="deck-heading"
            className="font-heading mb-6 text-3xl font-semibold text-neutral-9 italic"
          >
            {t("title")}
          </h2>
          <p className="text-muted-foreground mb-8 text-lg leading-relaxed">
            {t("body")}
          </p>
          <ul className="space-y-6">
            <li className="flex items-start gap-4">
              <CheckCircle
                className="text-palette-secondary mt-1 size-6 shrink-0"
                aria-hidden
              />
              <div>
                <h4 className="font-heading text-lg font-medium text-neutral-9">
                  {t("features.lunar.title")}
                </h4>
                <p className="text-muted-foreground text-base">
                  {t("features.lunar.body")}
                </p>
              </div>
            </li>
            <li className="flex items-start gap-4">
              <CheckCircle
                className="text-palette-secondary mt-1 size-6 shrink-0"
                aria-hidden
              />
              <div>
                <h4 className="font-heading text-lg font-medium text-neutral-9">
                  {t("features.symbolic.title")}
                </h4>
                <p className="text-muted-foreground text-base">
                  {t("features.symbolic.body")}
                </p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
