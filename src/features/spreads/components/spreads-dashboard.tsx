"use client";

import { useTranslations } from "next-intl";

import { CosmicBackdrop } from "@/components/cosmic-backdrop";

import { SpreadOptionCard } from "./spread-option-card";
import { type SpreadOption, SPREAD_OPTIONS } from "./spreads-dashboard.types";

export function SpreadsDashboard({
  inquiry,
  onInquiryChange,
  onSelectSpread,
}: {
  inquiry: string;
  onInquiryChange: (value: string) => void;
  onSelectSpread: (option: SpreadOption) => void;
}) {
  const t = useTranslations("spreads.dashboard");

  return (
    <div className="cosmic-gradient-bg text-foreground relative min-h-screen overflow-x-hidden">
      <CosmicBackdrop />
      <main className="mx-auto flex min-h-screen w-full max-w-6xl flex-col px-6 pt-16 pb-24 md:px-12">
        <section className="mb-10 w-full">
          <p className="text-label-sm text-palette-secondary uppercase tracking-widest">
            {t("currentInquiryLabel")}
          </p>
          <input
            type="text"
            value={inquiry}
            onChange={(event) => onInquiryChange(event.target.value)}
            placeholder={t("fallbackInquiry")}
            className="border-palette-secondary/35 bg-background/60 text-foreground mt-2 w-full rounded-lg border px-4 py-3 text-base leading-relaxed outline-none focus:ring-2 focus:ring-palette-secondary/40 md:text-lg"
          />
        </section>

        <section className="mb-12 text-center">
          <h1 className="font-heading text-palette-secondary text-3xl md:text-5xl">
            {t("title")}
          </h1>
          <p className="text-muted-foreground mx-auto mt-4 max-w-3xl text-base italic md:text-lg">
            {t("subtitle")}
          </p>
        </section>

        <section>
          <div className="mb-4 flex items-center justify-between px-1">
            <h2 className="text-label-sm text-muted-foreground uppercase tracking-widest">
              {t("availableRituals")}
            </h2>
            <span className="text-label-sm text-palette-tertiary">
              {t("vesselsCount", { count: SPREAD_OPTIONS.length })}
            </span>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
            {SPREAD_OPTIONS.map((option) => (
              <SpreadOptionCard
                key={option.id}
                option={option}
                onSelect={onSelectSpread}
              />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
