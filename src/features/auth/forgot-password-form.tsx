"use client";

import { Loader2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { useState } from "react";

import { Link } from "@/i18n/navigation";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import { useLocaleAuthCallback, useSupabaseBrowser } from "./auth-shared";

function mapResetError(
  message: string,
  fallback: string,
  rateLimitMessage: string,
) {
  if (/rate limit|security purposes|too many requests/i.test(message)) {
    return rateLimitMessage;
  }
  return fallback;
}

export function ForgotPasswordForm() {
  const t = useTranslations("auth.forgotPassword");
  const supabase = useSupabaseBrowser();
  const getCallbackUrl = useLocaleAuthCallback();

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [info, setInfo] = useState<string | null>(null);

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    setError(null);
    setInfo(null);
    setLoading(true);

    try {
      const { error: resetError } = await supabase.auth.resetPasswordForEmail(
        email.trim(),
        {
          redirectTo: getCallbackUrl("/reset-password"),
        },
      );

      if (resetError) {
        setError(
          mapResetError(
            resetError.message,
            t("errorUnexpected"),
            t("errorRateLimit"),
          ),
        );
        return;
      }

      setInfo(t("checkEmail"));
    } catch {
      setError(t("errorUnexpected"));
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="glass-panel border-palette-secondary/20 mx-auto w-full max-w-md rounded-xl border p-8 shadow-2xl">
      <h1 className="font-heading text-palette-secondary mb-2 text-2xl font-semibold md:text-3xl">
        {t("title")}
      </h1>
      <p className="text-muted-foreground mb-8 text-sm">{t("subtitle")}</p>

      {error ? (
        <p
          className="bg-destructive/10 text-destructive mb-6 rounded-lg px-4 py-3 text-sm"
          role="alert"
        >
          {error}
        </p>
      ) : null}
      {info ? (
        <p className="bg-palette-secondary/10 text-palette-secondary mb-6 rounded-lg px-4 py-3 text-sm">
          {info}
        </p>
      ) : null}

      <form onSubmit={(event) => void onSubmit(event)} className="space-y-4">
        <div>
          <label
            htmlFor="forgot-email"
            className="text-muted-foreground mb-1 block text-xs font-medium tracking-wide uppercase"
          >
            {t("email")}
          </label>
          <input
            id="forgot-email"
            type="email"
            autoComplete="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
            className="border-border bg-palette-primary/50 text-foreground focus-visible:ring-ring w-full rounded-lg border px-4 py-3 text-base outline-none focus-visible:ring-2"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className={cn(
            buttonVariants({ variant: "secondary" }),
            "w-full rounded-lg bg-palette-secondary py-3 font-heading font-medium text-palette-primary disabled:opacity-60",
          )}
        >
          {loading ? (
            <Loader2 className="mx-auto size-5 animate-spin" aria-hidden />
          ) : (
            t("submit")
          )}
        </button>
      </form>

      <p className="text-muted-foreground mt-8 text-center text-sm">
        <Link
          href="/login"
          className="text-palette-secondary font-medium hover:underline"
        >
          {t("backToLogin")}
        </Link>
      </p>
    </div>
  );
}
