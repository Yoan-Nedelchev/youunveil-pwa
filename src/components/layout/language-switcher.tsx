"use client";

import { useLocale } from "next-intl";

import { usePathname, useRouter } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { cn } from "@/lib/utils";
import { useNavActiveStore } from "@/stores/nav-active-store";

export function LanguageSwitcher({ className }: { className?: string }) {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const setIsNavigating = useNavActiveStore((s) => s.setIsNavigating);

  return (
    <div
      className={cn("flex items-center gap-1", className)}
      role="group"
      aria-label="Language"
    >
      {routing.locales.map((loc) => (
        <button
          key={loc}
          type="button"
          className={cn(
            "rounded px-2 py-1 text-label-sm font-semibold uppercase tracking-widest transition-colors",
            loc === locale
              ? "bg-palette-secondary/20 text-palette-secondary"
              : "text-muted-foreground hover:text-foreground",
          )}
          aria-pressed={loc === locale}
          onClick={() => {
            if (loc !== locale) {
              setIsNavigating(true);
            }
            router.replace(pathname, { locale: loc });
          }}
        >
          {loc === "en" ? "EN" : "BG"}
        </button>
      ))}
    </div>
  );
}
