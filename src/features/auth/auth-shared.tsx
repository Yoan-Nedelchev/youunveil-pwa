"use client";

import { useLocale } from "next-intl";

import { createBrowserSupabaseClient } from "@/lib/supabase/client";

export function getAuthCallbackUrl(locale: string) {
  if (typeof window === "undefined") return "";
  return `${window.location.origin}/${locale}/auth/callback`;
}

export function useSupabaseBrowser() {
  return createBrowserSupabaseClient();
}

export function useLocaleAuthCallback() {
  const locale = useLocale();
  return (nextPath?: string) => {
    const callbackBase = getAuthCallbackUrl(locale);
    if (!nextPath) return callbackBase;
    const localizedNext =
      nextPath.startsWith(`/${locale}/`) || nextPath === `/${locale}`
        ? nextPath
        : `/${locale}${nextPath.startsWith("/") ? nextPath : `/${nextPath}`}`;
    const url = new URL(callbackBase);
    url.searchParams.set("next", localizedNext);
    return url.toString();
  };
}
