"use client";

import { useTranslations } from "next-intl";
import { BookOpen, LayoutGrid, Sparkles, UserCircle } from "lucide-react";

import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

const items = [
  { key: "oracle" as const, href: "/#hero", icon: Sparkles },
  { key: "spreads" as const, href: "/#wisdom", icon: LayoutGrid },
  { key: "journal" as const, href: "/#deck", icon: BookOpen },
  { key: "profile" as const, href: "/", icon: UserCircle },
];

export function MobileBottomNav() {
  const t = useTranslations("common");

  return (
    <nav
      className="border-teal-accent/40 bg-palette-primary/80 fixed bottom-0 left-0 z-50 flex h-20 w-full items-center justify-around rounded-t-xl border-t px-4 pb-safe pt-2 shadow-[0_-8px_32px_rgba(0,0,0,0.8)] backdrop-blur-lg md:hidden"
      aria-label="Mobile primary"
    >
      {items.map(({ key, href, icon: Icon }, i) => (
        <Link
          key={key}
          href={href}
          className={cn(
            "flex flex-col items-center justify-center gap-1",
            i === 0
              ? "text-teal-accent drop-shadow-[0_0_10px_rgba(45,212,191,0.6)]"
              : "text-slate-500 opacity-60 hover:text-teal-100",
          )}
          aria-current={i === 0 ? "page" : undefined}
        >
          <Icon className="size-6 shrink-0" aria-hidden />
          <span className="font-heading text-[10px] font-medium uppercase">
            {t(`nav.${key}`)}
          </span>
        </Link>
      ))}
    </nav>
  );
}
