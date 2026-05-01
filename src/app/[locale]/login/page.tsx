import { Loader2 } from "lucide-react";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Suspense } from "react";

import { LoginForm } from "@/features/auth/login-form";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "auth.login" });

  return {
    title: `${t("title")} | You Unveil`,
    description: t("subtitle"),
  };
}

function LoginFallback() {
  return (
    <div className="glass-panel border-palette-secondary/20 mx-auto flex min-h-[24rem] w-full max-w-md items-center justify-center rounded-xl border p-8">
      <Loader2
        className="text-palette-secondary size-10 animate-spin"
        aria-hidden
      />
    </div>
  );
}

export default async function LoginPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <div className="cosmic-gradient-bg min-h-screen px-6 pt-28 pb-24 md:pt-32">
      <Suspense fallback={<LoginFallback />}>
        <LoginForm />
      </Suspense>
    </div>
  );
}
