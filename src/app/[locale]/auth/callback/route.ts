import { createServerClient } from "@supabase/ssr";
import { type EmailOtpType } from "@supabase/supabase-js";
import { type NextRequest, NextResponse } from "next/server";

import { getSupabasePublishableKey, getSupabaseUrl } from "@/lib/env";

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ locale: string }> },
) {
  const { locale } = await context.params;
  const code = request.nextUrl.searchParams.get("code");
  const tokenHash = request.nextUrl.searchParams.get("token_hash");
  const otpType = request.nextUrl.searchParams.get(
    "type",
  ) as EmailOtpType | null;
  const nextRaw = request.nextUrl.searchParams.get("next");
  const nextPath = nextRaw && nextRaw.startsWith("/") ? nextRaw : `/${locale}`;

  const loginError = NextResponse.redirect(
    new URL(`/${locale}/login?error=auth`, request.url),
  );

  if (!code && !(tokenHash && otpType)) {
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

  const { error } = code
    ? await supabase.auth.exchangeCodeForSession(code)
    : await supabase.auth.verifyOtp({
        type: otpType!,
        token_hash: tokenHash!,
      });

  if (error) {
    return loginError;
  }

  return redirectResponse;
}
