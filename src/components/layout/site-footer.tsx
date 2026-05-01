"use client";

import { useTranslations } from "next-intl";

import { Link } from "@/i18n/navigation";

export function SiteFooter() {
  const t = useTranslations("common");
  const year = new Date().getFullYear();

  return (
    <footer className="bg-palette-primary w-full border-t border-white/5 py-12">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-6 px-8 text-center">
        <div className="font-heading text-2xl font-light tracking-tighter text-amber-400/50">
          {t("brand")}
        </div>
        <nav
          className="flex flex-wrap justify-center gap-8"
          aria-label="Footer"
        >
          <Link
            href="/"
            className="font-heading text-xs font-light italic text-slate-500 transition-opacity hover:text-slate-300"
          >
            {t("footer.privacy")}
          </Link>
          <Link
            href="/"
            className="font-heading text-xs font-light italic text-slate-500 transition-opacity hover:text-slate-300"
          >
            {t("footer.terms")}
          </Link>
          <Link
            href="/"
            className="font-heading text-xs font-light italic text-slate-500 transition-opacity hover:text-slate-300"
          >
            {t("footer.ethicalAi")}
          </Link>
          <Link
            href="/"
            className="font-heading text-xs font-light italic text-slate-500 transition-opacity hover:text-slate-300"
          >
            {t("footer.support")}
          </Link>
        </nav>
        <p className="font-heading mt-4 text-xs font-light italic text-slate-500">
          {t("footer.copyright", { year })}
        </p>
      </div>
    </footer>
  );
}
