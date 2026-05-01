"use client";

import { useTranslations } from "next-intl";
import { Sparkles, Settings } from "lucide-react";

import { Link } from "@/i18n/navigation";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  type DesktopNavTab,
  useNavActiveStore,
} from "@/stores/nav-active-store";

import { LanguageSwitcher } from "./language-switcher";

const DESKTOP_NAV: { tab: DesktopNavTab; href: string; labelKey: string }[] = [
  { tab: "beginReading", href: "/#hero", labelKey: "beginReading" },
  { tab: "spreads", href: "/#wisdom", labelKey: "spreads" },
  { tab: "myJournal", href: "/#deck", labelKey: "myJournal" },
  { tab: "theArcana", href: "/#testimonials", labelKey: "theArcana" },
];

export function SiteHeader() {
  const t = useTranslations("common");
  const active = useNavActiveStore((s) => s.desktopActiveTab);
  const setActive = useNavActiveStore((s) => s.setDesktopActiveTab);

  const navClass =
    "font-heading border-b-2 pb-1 text-sm uppercase tracking-wide transition-colors";

  return (
    <header className="border-border-header bg-header/60 fixed top-0 z-50 flex w-full items-center justify-between border-b px-6 py-4 shadow-header backdrop-blur-2xl md:px-12">
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
            onClick={() => setActive(tab)}
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
          className="text-slate-400 transition-colors hover:text-amber-200"
          aria-label={t("actions.sparkles")}
        >
          <Sparkles className="size-5" aria-hidden />
        </button>
        <button
          type="button"
          className="text-slate-400 transition-colors hover:text-amber-200"
          aria-label={t("actions.settings")}
        >
          <Settings className="size-5" aria-hidden />
        </button>
        <Link
          href="/"
          className={cn(
            buttonVariants({ variant: "secondary", size: "sm" }),
            "rounded-sm border-transparent bg-palette-secondary uppercase tracking-widest text-palette-primary shadow-none hover:bg-palette-secondary/90 hover:shadow-[0_0_15px_rgba(233,195,73,0.4)]",
          )}
        >
          {t("nav.signIn")}
        </Link>
      </div>
    </header>
  );
}
