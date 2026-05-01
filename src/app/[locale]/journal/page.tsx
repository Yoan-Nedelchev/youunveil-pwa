import { getTranslations, setRequestLocale } from "next-intl/server";

import { JournalScreen } from "@/features/journal/journal-screen";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "screens.journal" });

  return {
    title: `${t("title")} | Astraeus Oracle`,
    description: t("description"),
  };
}

export default async function JournalPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <JournalScreen />;
}
