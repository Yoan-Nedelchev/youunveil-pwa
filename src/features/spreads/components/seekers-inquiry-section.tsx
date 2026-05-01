"use client";

import { useTranslations } from "next-intl";

export function SeekersInquirySection() {
  const t = useTranslations("spreads.desktop");

  return (
    <section className="mx-auto mb-16 max-w-2xl text-center">
      <span className="text-label-sm text-palette-secondary mb-4 block tracking-[0.2em] uppercase">
        {t("seekersEyebrow")}
      </span>
      <h1 className="font-heading text-foreground mb-6 text-2xl leading-snug italic md:text-3xl">
        &ldquo;{t("seekersQuestion")}&rdquo;
      </h1>
      <div className="via-palette-secondary/40 mx-auto h-px w-32 bg-gradient-to-r from-transparent to-transparent" />
    </section>
  );
}
