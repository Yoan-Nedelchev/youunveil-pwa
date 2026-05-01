"use client";

import { useTranslations } from "next-intl";
import { BookOpen, Brain, LayoutGrid } from "lucide-react";

import { LandingFeatureCard } from "./landing-feature-card";

export function LandingWisdomSection() {
  const t = useTranslations("landing.wisdom");

  return (
    <section
      id="wisdom"
      className="relative z-10 mx-auto max-w-7xl px-6 py-24 md:px-12"
      aria-labelledby="wisdom-heading"
    >
      <div className="mb-16 flex flex-col items-end gap-12 md:flex-row">
        <div className="flex-1">
          <h2
            id="wisdom-heading"
            className="font-heading mb-4 text-3xl font-semibold tracking-wider text-palette-secondary uppercase"
          >
            {t("title")}
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            {t("intro")}
          </p>
        </div>
        <div className="from-palette-secondary/40 mb-4 h-px flex-1 bg-gradient-to-r to-transparent" />
      </div>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
        <LandingFeatureCard
          accent="teal"
          icon={Brain}
          title={t("cards.sync.title")}
          body={t("cards.sync.body")}
          cta={t("cards.sync.cta")}
          href="/#deck"
        />
        <LandingFeatureCard
          accent="amber"
          icon={LayoutGrid}
          title={t("cards.spreads.title")}
          body={t("cards.spreads.body")}
          cta={t("cards.spreads.cta")}
          href="/#wisdom"
        />
        <LandingFeatureCard
          accent="purple"
          icon={BookOpen}
          title={t("cards.journal.title")}
          body={t("cards.journal.body")}
          cta={t("cards.journal.cta")}
          href="/#testimonials"
        />
      </div>
    </section>
  );
}
