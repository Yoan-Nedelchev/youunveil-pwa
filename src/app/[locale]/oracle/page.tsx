import { getTranslations, setRequestLocale } from "next-intl/server";

import { OracleScreen } from "@/features/oracle/oracle-screen";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "screens.oracle" });

  return {
    title: `${t("title")} | Astraeus Oracle`,
    description: t("description"),
  };
}

export default async function OraclePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <OracleScreen />;
}
