"use client";

import { Eye, EyeOff, Loader2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";

import { Link, useRouter } from "@/i18n/navigation";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import { useSupabaseBrowser } from "./auth-shared";

export function ResetPasswordForm() {
  const t = useTranslations("auth.resetPassword");
  const router = useRouter();
  const supabase = useSupabaseBrowser();

  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [checking, setChecking] = useState(true);
  const [hasSession, setHasSession] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function checkSession() {
      const { data } = await supabase.auth.getSession();
      if (cancelled) return;
      setHasSession(Boolean(data.session));
      setChecking(false);
    }

    void checkSession();

    return () => {
      cancelled = true;
    };
  }, [supabase]);

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    setError(null);

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
      const { error: updateError } = await supabase.auth.updateUser({
        password,
      });

      if (updateError) {
        setError(t("errorUnexpected"));
        return;
      }

      await supabase.auth.signOut();
      router.replace("/login?reset=success");
      router.refresh();
    } catch {
      setError(t("errorUnexpected"));
    } finally {
      setLoading(false);
    }
  }

  if (checking) {
    return (
      <div className="glass-panel border-palette-secondary/20 mx-auto flex min-h-[20rem] w-full max-w-md items-center justify-center rounded-xl border p-8 shadow-2xl">
        <Loader2 className="text-palette-secondary size-10 animate-spin" />
      </div>
    );
  }

  if (!hasSession) {
    return (
      <div className="glass-panel border-palette-secondary/20 mx-auto w-full max-w-md rounded-xl border p-8 shadow-2xl">
        <h1 className="font-heading text-palette-secondary mb-2 text-2xl font-semibold md:text-3xl">
          {t("title")}
        </h1>
        <p className="text-muted-foreground mb-6 text-sm">
          {t("sessionMissing")}
        </p>
        <Link
          href="/forgot-password"
          className="text-palette-secondary font-medium hover:underline"
        >
          {t("requestAnotherLink")}
        </Link>
      </div>
    );
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

      <form onSubmit={(event) => void onSubmit(event)} className="space-y-4">
        <div>
          <label
            htmlFor="reset-password"
            className="text-muted-foreground mb-1 block text-xs font-medium tracking-wide uppercase"
          >
            {t("password")}
          </label>
          <div className="relative">
            <input
              id="reset-password"
              type={showPassword ? "text" : "password"}
              autoComplete="new-password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
              minLength={6}
              className="border-border bg-palette-primary/50 text-foreground focus-visible:ring-ring w-full rounded-lg border px-4 py-3 pr-11 text-base outline-none focus-visible:ring-2"
            />
            <button
              type="button"
              onClick={() => setShowPassword((previous) => !previous)}
              className="text-muted-foreground hover:text-palette-secondary absolute top-1/2 right-3 -translate-y-1/2"
              aria-label={showPassword ? t("hidePassword") : t("showPassword")}
            >
              {showPassword ? (
                <EyeOff className="size-5" aria-hidden />
              ) : (
                <Eye className="size-5" aria-hidden />
              )}
            </button>
          </div>
        </div>
        <div>
          <label
            htmlFor="reset-confirm"
            className="text-muted-foreground mb-1 block text-xs font-medium tracking-wide uppercase"
          >
            {t("confirmPassword")}
          </label>
          <div className="relative">
            <input
              id="reset-confirm"
              type={showConfirm ? "text" : "password"}
              autoComplete="new-password"
              value={confirm}
              onChange={(event) => setConfirm(event.target.value)}
              required
              className="border-border bg-palette-primary/50 text-foreground focus-visible:ring-ring w-full rounded-lg border px-4 py-3 pr-11 text-base outline-none focus-visible:ring-2"
            />
            <button
              type="button"
              onClick={() => setShowConfirm((previous) => !previous)}
              className="text-muted-foreground hover:text-palette-secondary absolute top-1/2 right-3 -translate-y-1/2"
              aria-label={showConfirm ? t("hidePassword") : t("showPassword")}
            >
              {showConfirm ? (
                <EyeOff className="size-5" aria-hidden />
              ) : (
                <Eye className="size-5" aria-hidden />
              )}
            </button>
          </div>
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
    </div>
  );
}
