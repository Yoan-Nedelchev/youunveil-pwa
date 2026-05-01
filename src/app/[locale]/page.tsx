import { getTranslations, setRequestLocale } from "next-intl/server";

import {
  LandingDeckShowcase,
  LandingFinalCta,
  LandingHero,
  LandingTestimonialsSection,
  LandingWisdomSection,
} from "@/features/landing";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "landing.metadata" });

  return {
    title: t("title"),
    description: t("description"),
  };
}

export default async function LocaleHomePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <LandingHero />
      <LandingWisdomSection />
      <LandingDeckShowcase />
      <LandingTestimonialsSection />
      <LandingFinalCta />
    </>
  );
}
