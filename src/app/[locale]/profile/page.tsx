import { getTranslations, setRequestLocale } from "next-intl/server";

import { ProfileScreen } from "@/features/profile/profile-screen";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "screens.profile" });

  return {
    title: `${t("title")} | Astraeus Oracle`,
    description: t("description"),
  };
}

export default async function ProfilePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <ProfileScreen />;
}
