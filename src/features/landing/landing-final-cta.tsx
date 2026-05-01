"use client";

import { useTranslations } from "next-intl";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function LandingFinalCta() {
  const t = useTranslations("landing.cta");

  return (
    <section
      className="relative overflow-hidden py-24"
      aria-labelledby="cta-heading"
    >
      <div className="bg-palette-secondary/5 absolute inset-0 blur-[100px]" />
      <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
        <h2
          id="cta-heading"
          className="font-heading mb-8 text-3xl font-bold text-palette-secondary md:text-4xl"
        >
          {t("title")}
        </h2>
        <p className="text-muted-foreground mx-auto mb-12 max-w-2xl text-lg">
          {t("body")}
        </p>
        <div className="flex flex-col justify-center gap-6 sm:flex-row">
          <button
            type="button"
            className={cn(
              buttonVariants({ variant: "secondary" }),
              "rounded-sm border-transparent bg-palette-secondary px-10 py-5 font-heading text-xl text-palette-primary shadow-[0_0_30px_rgba(233,195,73,0.3)] transition-all hover:-translate-y-1 hover:bg-palette-secondary/90 hover:shadow-[0_0_50px_rgba(233,195,73,0.5)]",
            )}
          >
            {t("primary")}
          </button>
          <button
            type="button"
            className={cn(
              buttonVariants({ variant: "outline" }),
              "glass-panel border-palette-secondary/40 text-foreground rounded-sm px-10 py-5 font-heading text-xl hover:bg-white/5",
            )}
          >
            {t("secondary")}
          </button>
        </div>
      </div>
    </section>
  );
}
