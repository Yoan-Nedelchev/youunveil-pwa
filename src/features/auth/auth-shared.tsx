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
  return () => getAuthCallbackUrl(locale);
}
