"use client";

import { useTranslations } from "next-intl";
import { Loader2 } from "lucide-react";
import { useState } from "react";

import { Link, useRouter } from "@/i18n/navigation";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import { useLocaleAuthCallback, useSupabaseBrowser } from "./auth-shared";

/*
 * Google OAuth (commented out): enable the provider in Supabase, then restore:
 * - const [oauthLoading, setOauthLoading] = useState<string | null>(null);
 *
 * async function signInWithProvider(provider: "google", key: string) {
 *   setError(null);
 *   setInfo(null);
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
 * After </form>, add orDivider block + Google button (same pattern as login-form comment).
 */

export function RegisterForm() {
  const t = useTranslations("auth.register");
  const router = useRouter();
  const supabase = useSupabaseBrowser();
  const getCallbackUrl = useLocaleAuthCallback();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [info, setInfo] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setInfo(null);

    if (password.length < 6) {
      setError(t("errorWeak"));
      return;
    }
    if (password !== confirm) {
      setError(t("errorMismatch"));
      return;
    }

    setLoading(true);
    try {
      const { data, error: signError } = await supabase.auth.signUp({
        email: email.trim(),
        password,
        options: {
          emailRedirectTo: getCallbackUrl(),
        },
      });
      if (signError) {
        setError(t("errorUnexpected"));
        return;
      }
      if (data.session) {
        router.push("/");
        router.refresh();
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

      {error !== null ? (
        <p
          className="bg-destructive/10 text-destructive mb-6 rounded-lg px-4 py-3 text-sm"
          role="alert"
        >
          {error}
        </p>
      ) : null}
      {info !== null ? (
        <p className="bg-palette-secondary/10 text-palette-secondary mb-6 rounded-lg px-4 py-3 text-sm">
          {info}
        </p>
      ) : null}

      <form onSubmit={(e) => void onSubmit(e)} className="space-y-4">
        <div>
          <label
            htmlFor="register-email"
            className="text-muted-foreground mb-1 block text-xs font-medium tracking-wide uppercase"
          >
            {t("email")}
          </label>
          <input
            id="register-email"
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
            htmlFor="register-password"
            className="text-muted-foreground mb-1 block text-xs font-medium tracking-wide uppercase"
          >
            {t("password")}
          </label>
          <input
            id="register-password"
            type="password"
            autoComplete="new-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={6}
            className="border-border bg-palette-primary/50 text-foreground focus-visible:ring-ring w-full rounded-lg border px-4 py-3 text-base outline-none focus-visible:ring-2"
          />
        </div>
        <div>
          <label
            htmlFor="register-confirm"
            className="text-muted-foreground mb-1 block text-xs font-medium tracking-wide uppercase"
          >
            {t("confirmPassword")}
          </label>
          <input
            id="register-confirm"
            type="password"
            autoComplete="new-password"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
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
        {t("hasAccount")}{" "}
        <Link
          href="/login"
          className="text-palette-secondary font-medium hover:underline"
        >
          {t("loginLink")}
        </Link>
      </p>
    </div>
  );
}
