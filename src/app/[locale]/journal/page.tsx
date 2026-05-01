import { getTranslations, setRequestLocale } from "next-intl/server";
import { redirect } from "next/navigation";

import { JournalScreen } from "@/features/journal/journal-screen";
import { createServerSupabaseClient } from "@/lib/supabase/server";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "screens.journal" });

  return {
    title: `${t("title")} | You Unveil`,
    description: t("description"),
  };
}

export default async function JournalPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const supabase = await createServerSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    redirect(`/${locale}/login`);
  }

  return <JournalScreen />;
}
