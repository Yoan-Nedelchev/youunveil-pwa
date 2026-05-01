import { createServerClient } from "@supabase/ssr";
import { type NextRequest, NextResponse } from "next/server";

import { getSupabasePublishableKey, getSupabaseUrl } from "@/lib/env";

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ locale: string }> },
) {
  const { locale } = await context.params;
  const code = request.nextUrl.searchParams.get("code");
  const nextRaw = request.nextUrl.searchParams.get("next");
  const nextPath = nextRaw && nextRaw.startsWith("/") ? nextRaw : `/${locale}`;

  const loginError = NextResponse.redirect(
    new URL(`/${locale}/login?error=auth`, request.url),
  );

  if (!code) {
    return loginError;
  }

  const redirectResponse = NextResponse.redirect(
    new URL(nextPath, request.url),
  );

  const supabase = createServerClient(
    getSupabaseUrl(),
    getSupabasePublishableKey(),
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => {
            redirectResponse.cookies.set(name, value, options);
          });
        },
      },
    },
  );

  const { error } = await supabase.auth.exchangeCodeForSession(code);

  if (error) {
    return loginError;
  }

  return redirectResponse;
}
