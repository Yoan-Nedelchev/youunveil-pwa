import { hasLocale } from "next-intl";
import { headers } from "next/headers";
import { getRequestConfig } from "next-intl/server";

import { routing } from "./routing";

type NamespaceKey = "common" | "landing" | "spreads" | "screens" | "auth";

function parsePathnameFromHeaderValue(value: string): string | null {
  if (!value) return null;

  if (value.startsWith("/")) {
    return value;
  }

  try {
    return new URL(value).pathname;
  } catch {
    return null;
  }
}

async function detectPathname(): Promise<string | null> {
  const h = await headers();
  const candidates = [
    "x-pathname",
    "next-url",
    "x-url",
    "x-invoke-path",
    "x-middleware-request-url",
  ] as const;

  for (const key of candidates) {
    const value = h.get(key);
    if (!value) continue;
    const pathname = parsePathnameFromHeaderValue(value);
    if (pathname) return pathname;
  }

  return null;
}

function stripLocalePrefix(pathname: string, locale: string): string {
  if (pathname === `/${locale}`) return "/";
  if (pathname.startsWith(`/${locale}/`)) {
    return pathname.slice(locale.length + 1);
  }
  return pathname;
}

function pickNamespaces(pathname: string): Set<NamespaceKey> {
  const needed = new Set<NamespaceKey>(["common", "auth"]);

  if (pathname === "/" || pathname === "") {
    needed.add("landing");
    return needed;
  }

  if (pathname.startsWith("/spreads")) {
    needed.add("spreads");
    return needed;
  }

  if (
    pathname.startsWith("/oracle") ||
    pathname.startsWith("/arcana") ||
    pathname.startsWith("/journal") ||
    pathname.startsWith("/profile")
  ) {
    needed.add("screens");
    return needed;
  }

  if (pathname.startsWith("/login") || pathname.startsWith("/register")) {
    return needed;
  }

  // Unknown route: keep behavior safe by loading all namespaces.
  return new Set<NamespaceKey>([
    "common",
    "landing",
    "spreads",
    "screens",
    "auth",
  ]);
}

async function loadNamespace(locale: string, namespace: NamespaceKey) {
  return import(`../../messages/${locale}/${namespace}.json`).then(
    (module) => module.default,
  );
}

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale = hasLocale(routing.locales, requested)
    ? requested
    : routing.defaultLocale;

  const detectedPath = await detectPathname();
  const normalizedPath = detectedPath
    ? stripLocalePrefix(detectedPath, locale)
    : null;
  const namespaces = normalizedPath
    ? pickNamespaces(normalizedPath)
    : new Set<NamespaceKey>([
        "common",
        "landing",
        "spreads",
        "screens",
        "auth",
      ]);

  const messages = Object.fromEntries(
    await Promise.all(
      [...namespaces].map(async (namespace) => [
        namespace,
        await loadNamespace(locale, namespace),
      ]),
    ),
  );

  return {
    locale,
    messages,
  };
});
