"use client";

import { useTranslations } from "next-intl";

import { LANDING_IMAGES } from "@/features/landing/image-urls";

import { LandingTestimonialCard } from "./landing-testimonial-card";

export function LandingTestimonialsSection() {
  const t = useTranslations("landing.testimonials");

  return (
    <section
      id="testimonials"
      className="mx-auto max-w-7xl px-6 py-24 md:px-12"
      aria-labelledby="testimonials-heading"
    >
      <div className="mb-16 text-center">
        <p className="text-label-sm mb-4 font-semibold tracking-[0.3em] text-palette-secondary uppercase">
          {t("eyebrow")}
        </p>
        <h2
          id="testimonials-heading"
          className="font-heading text-3xl font-semibold text-neutral-9"
        >
          {t("title")}
        </h2>
      </div>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        <LandingTestimonialCard
          accent="gold"
          quote={t("items.elena.quote")}
          name={t("items.elena.name")}
          role={t("items.elena.role")}
          avatarSrc={LANDING_IMAGES.avatarElena}
          avatarAlt={t("items.elena.avatarAlt")}
        />
        <LandingTestimonialCard
          accent="teal"
          quote={t("items.marcus.quote")}
          name={t("items.marcus.name")}
          role={t("items.marcus.role")}
          avatarSrc={LANDING_IMAGES.avatarMarcus}
          avatarAlt={t("items.marcus.avatarAlt")}
        />
        <LandingTestimonialCard
          accent="amber"
          quote={t("items.sasha.quote")}
          name={t("items.sasha.name")}
          role={t("items.sasha.role")}
          avatarSrc={LANDING_IMAGES.avatarSasha}
          avatarAlt={t("items.sasha.avatarAlt")}
        />
      </div>
    </section>
  );
}
