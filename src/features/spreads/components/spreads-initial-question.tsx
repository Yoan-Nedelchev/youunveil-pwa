"use client";

import { HelpCircle } from "lucide-react";
import { useTranslations } from "next-intl";

import { cn } from "@/lib/utils";

export function SpreadsInitialQuestion({ className }: { className?: string }) {
  const t = useTranslations("spreads.mobile");

  return (
    <section className={cn("mb-8 w-full max-w-md", className)}>
      <div className="glass-card border-palette-secondary/30 relative overflow-hidden rounded-xl border p-4">
        <div className="from-palette-secondary/5 pointer-events-none absolute inset-0 bg-gradient-to-r to-transparent" />
        <div className="relative flex items-center gap-4">
          <div className="bg-palette-secondary flex size-10 shrink-0 items-center justify-center rounded-full">
            <HelpCircle className="text-palette-primary size-5" aria-hidden />
          </div>
          <div>
            <p className="text-label-sm text-palette-secondary/70 uppercase">
              {t("initialEyebrow")}
            </p>
            <p className="font-heading text-foreground text-lg leading-snug">
              {t("initialQuestion")}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
