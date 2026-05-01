"use client";

import type { User } from "@supabase/supabase-js";
import { useTranslations } from "next-intl";
import { Settings } from "lucide-react";
import { useEffect, useState } from "react";

import { Link, usePathname, useRouter } from "@/i18n/navigation";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { createBrowserSupabaseClient } from "@/lib/supabase/client";
import {
  type DesktopNavTab,
  useNavActiveStore,
} from "@/stores/nav-active-store";

import { LanguageSwitcher } from "./language-switcher";

const DESKTOP_NAV: { tab: DesktopNavTab; href: string; labelKey: string }[] = [
  { tab: "beginReading", href: "/", labelKey: "beginReading" },
  { tab: "spreads", href: "/spreads", labelKey: "spreads" },
  { tab: "myJournal", href: "/journal", labelKey: "myJournal" },
];

export function SiteHeader() {
  const t = useTranslations("common");
  const tAuth = useTranslations("auth.header");
  const router = useRouter();
  const pathname = usePathname();
  const active = useNavActiveStore((s) => s.desktopActiveTab);
  const setIsNavigating = useNavActiveStore((s) => s.setIsNavigating);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const supabase = createBrowserSupabaseClient();

    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  async function signOut() {
    const supabase = createBrowserSupabaseClient();
    await supabase.auth.signOut();
    router.refresh();
  }

  const navClass =
    "font-heading border-b-2 pb-1 text-sm uppercase tracking-wide transition-colors";

  return (
    <header className="border-border-header bg-header/60 sticky top-0 z-50 flex w-full items-center justify-between border-b px-6 py-4 shadow-header backdrop-blur-2xl md:px-12">
      <Link
        href="/"
        className="font-heading text-2xl font-light tracking-tighter text-amber-400 drop-shadow-[0_0_8px_rgba(251,191,36,0.4)]"
      >
        {t("brand")}
      </Link>
      <nav className="hidden items-center gap-8 md:flex" aria-label="Primary">
        {DESKTOP_NAV.map(({ tab, href, labelKey }) => (
          <Link
            key={tab}
            href={href}
            onClick={() => {
              if (pathname !== href) setIsNavigating(true);
            }}
            className={cn(
              navClass,
              active === tab
                ? "border-amber-400 text-amber-400"
                : "border-transparent text-slate-400 hover:text-amber-200",
            )}
            aria-current={active === tab ? "page" : undefined}
          >
            {t(`nav.${labelKey}`)}
          </Link>
        ))}
      </nav>
      <div className="flex items-center gap-3 md:gap-4">
        <LanguageSwitcher />
        <button
          type="button"
          disabled
          aria-disabled="true"
          className="cursor-not-allowed text-slate-500/50"
          aria-label={t("actions.settings")}
        >
          <Settings className="size-5" aria-hidden />
        </button>
        {user ? (
          <div className="flex items-center gap-2 md:gap-3">
            <span
              className="text-muted-foreground hidden max-w-[160px] truncate text-xs md:inline"
              title={user.email ?? undefined}
            >
              {user.email}
            </span>
            <button
              type="button"
              onClick={() => void signOut()}
              className={cn(
                buttonVariants({ variant: "outline", size: "sm" }),
                "border-neutral-6 text-neutral-8 hover:bg-neutral-3 rounded-sm uppercase tracking-widest",
              )}
            >
              {tAuth("signOut")}
            </button>
          </div>
        ) : (
          <Link
            href="/login"
            onClick={() => {
              if (pathname !== "/login") setIsNavigating(true);
            }}
            className={cn(
              buttonVariants({ variant: "secondary", size: "sm" }),
              "rounded-sm border-transparent bg-palette-secondary uppercase tracking-widest text-palette-primary shadow-none hover:bg-palette-secondary/90 hover:shadow-[0_0_15px_rgba(233,195,73,0.4)]",
            )}
          >
            {t("nav.signIn")}
          </Link>
        )}
      </div>
    </header>
  );
}
