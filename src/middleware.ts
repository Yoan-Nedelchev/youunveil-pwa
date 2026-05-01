import createIntlMiddleware from "next-intl/middleware";
import { type NextRequest } from "next/server";

import { routing } from "@/i18n/routing";
import { updateSession } from "@/lib/supabase/middleware";

const intlMiddleware = createIntlMiddleware(routing);

function isProtectedPath(pathname: string) {
  return routing.locales.some((locale) => {
    const base = `/${locale}`;
    return (
      pathname === `${base}/journal` ||
      pathname.startsWith(`${base}/journal/`) ||
      pathname === `${base}/profile` ||
      pathname.startsWith(`${base}/profile/`)
    );
  });
}

export async function middleware(request: NextRequest) {
  const intlResponse = intlMiddleware(request);
  if (!isProtectedPath(request.nextUrl.pathname)) {
    return intlResponse;
  }
  return updateSession(request, intlResponse);
}

export const config = {
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
