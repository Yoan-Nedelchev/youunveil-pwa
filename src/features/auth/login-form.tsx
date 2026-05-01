"use client";

import { useTranslations } from "next-intl";
import { Loader2 } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

import { Link, useRouter } from "@/i18n/navigation";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import { useSupabaseBrowser } from "./auth-shared";

/*
 * Google OAuth (commented out): enable the provider in Supabase, then restore:
 * - import { useLocaleAuthCallback } from "./auth-shared";
 * - const getCallbackUrl = useLocaleAuthCallback();
 * - const [oauthLoading, setOauthLoading] = useState<string | null>(null);
 *
 * async function signInWithProvider(provider: "google", key: string) {
 *   setError(null);
 *   setOauthLoading(key);
 *   const redirectTo = getCallbackUrl();
 *   const { error: oauthError } = await supabase.auth.signInWithOAuth({
 *     provider,
 *     options: { redirectTo },
 *   });
 *   setOauthLoading(null);
 *   if (oauthError) setError(t("errorUnexpected"));
 * }
 *
 * After the </form>, add divider + button:
 *   <div className="my-6 flex items-center gap-4">...</div>
 *   <button type="button" ... onClick={() => void signInWithProvider("google", "google")}>
 *     {oauthLoading === "google" ? <Loader2 ... /> : t("google")}
 *   </button>
 */

export function LoginForm() {
  const t = useTranslations("auth.login");
  const router = useRouter();
  const searchParams = useSearchParams();
  const supabase = useSupabaseBrowser();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (searchParams.get("error") === "auth") {
      setError(t("errorAuth"));
    }
  }, [searchParams, t]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const { error: signError } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      });
      if (signError) {
        setError(
          signError.message.includes("Invalid login credentials")
            ? t("errorInvalid")
            : t("errorUnexpected"),
        );
        return;
      }
      router.push("/");
      router.refresh();
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

      {error !== null ? (
        <p
          className="bg-destructive/10 text-destructive mb-6 rounded-lg px-4 py-3 text-sm"
          role="alert"
        >
          {error}
        </p>
      ) : null}

      <form onSubmit={(e) => void onSubmit(e)} className="space-y-4">
        <div>
          <label
            htmlFor="login-email"
            className="text-muted-foreground mb-1 block text-xs font-medium tracking-wide uppercase"
          >
            {t("email")}
          </label>
          <input
            id="login-email"
            type="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="border-border bg-palette-primary/50 text-foreground focus-visible:ring-ring w-full rounded-lg border px-4 py-3 text-base outline-none focus-visible:ring-2"
          />
        </div>
        <div>
          <label
            htmlFor="login-password"
            className="text-muted-foreground mb-1 block text-xs font-medium tracking-wide uppercase"
          >
            {t("password")}
          </label>
          <input
            id="login-password"
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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
        {t("noAccount")}{" "}
        <Link
          href="/register"
          className="text-palette-secondary font-medium hover:underline"
        >
          {t("registerLink")}
        </Link>
      </p>
    </div>
  );
}
