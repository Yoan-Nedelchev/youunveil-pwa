import { getTranslations, setRequestLocale } from "next-intl/server";

import { ForgotPasswordForm } from "@/features/auth/forgot-password-form";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "auth.forgotPassword" });

  return {
    title: `${t("title")} | You Unveil`,
    description: t("subtitle"),
  };
}

export default async function ForgotPasswordPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <div className="cosmic-gradient-bg min-h-screen px-6 pt-28 pb-24 md:pt-32">
      <ForgotPasswordForm />
    </div>
  );
}
