import { getTranslations, setRequestLocale } from "next-intl/server";

import { SpreadsScreen } from "@/features/spreads";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "spreads.metadata" });

  return {
    title: t("title"),
    description: t("description"),
  };
}

export default async function SpreadsPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <SpreadsScreen />;
}
