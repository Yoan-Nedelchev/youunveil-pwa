import { getTranslations, setRequestLocale } from "next-intl/server";

import { ArcanaScreen } from "@/features/arcana/arcana-screen";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "screens.arcana" });

  return {
    title: `${t("title")} | You Unveil`,
    description: t("description"),
  };
}

export default async function ArcanaPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <ArcanaScreen />;
}
