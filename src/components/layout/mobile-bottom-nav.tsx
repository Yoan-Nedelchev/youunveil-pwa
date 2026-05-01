"use client";

import { useTranslations } from "next-intl";
import {
  BookOpen,
  House,
  LayoutGrid,
  type LucideIcon,
  UserCircle,
} from "lucide-react";

import { Link, usePathname } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import {
  type MobileNavTab,
  useNavActiveStore,
} from "@/stores/nav-active-store";

const items: {
  tab: MobileNavTab;
  href: string;
  icon: LucideIcon;
}[] = [
  { tab: "home", href: "/", icon: House },
  { tab: "spreads", href: "/spreads", icon: LayoutGrid },
  { tab: "journal", href: "/journal", icon: BookOpen },
  { tab: "profile", href: "/profile", icon: UserCircle },
];

export function MobileBottomNav() {
  const t = useTranslations("common");
  const pathname = usePathname();
  const active = useNavActiveStore((s) => s.mobileActiveTab);
  const setIsNavigating = useNavActiveStore((s) => s.setIsNavigating);

  return (
    <nav
      className="border-teal-accent/40 bg-palette-primary/80 sticky bottom-0 left-0 z-50 flex h-20 w-full shrink-0 items-center justify-around rounded-t-xl border-t px-4 pb-safe pt-2 shadow-[0_-8px_32px_rgba(0,0,0,0.8)] backdrop-blur-lg md:hidden"
      aria-label="Mobile primary"
    >
      {items.map(({ tab, href, icon: Icon }) => {
        const isActive = tab === active;
        return (
          <Link
            key={tab}
            href={href}
            onClick={() => {
              if (pathname !== href) setIsNavigating(true);
            }}
            className={cn(
              "relative flex flex-col items-center justify-center gap-1 pb-1.5",
              isActive
                ? "text-teal-accent after:absolute after:bottom-0 after:left-1/2 after:h-0.5 after:w-7 after:-translate-x-1/2 after:rounded-full after:bg-teal-accent after:shadow-[0_0_8px_rgba(45,212,191,0.7)] after:content-['']"
                : "text-slate-500 opacity-60 hover:text-teal-100",
            )}
            aria-current={isActive ? "page" : undefined}
          >
            <Icon className="size-6 shrink-0" aria-hidden />
            <span className="font-heading text-[10px] font-medium uppercase">
              {t(`nav.${tab}`)}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}
