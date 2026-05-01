"use client";

import type { LucideIcon } from "lucide-react";
import { ArrowRight } from "lucide-react";

import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

type Accent = "teal" | "amber" | "purple";

const accentRing: Record<Accent, string> = {
  teal: "border-teal-400/20 text-teal-accent hover:border-teal-400/30 hover:shadow-[0_0_15px_rgba(45,212,191,0.3)]",
  amber:
    "border-amber-400/20 text-amber-400 hover:border-amber-400/30 hover:shadow-[0_0_15px_rgba(251,191,36,0.3)]",
  purple:
    "border-purple-400/20 text-purple-400 hover:border-purple-400/30 hover:shadow-[0_0_15px_rgba(168,85,247,0.3)]",
};

const accentLink: Record<Accent, string> = {
  teal: "text-teal-accent",
  amber: "text-amber-400",
  purple: "text-purple-400",
};

const borderLeft: Record<Accent, string> = {
  teal: "hover:border-teal-400/30",
  amber: "hover:border-amber-400/30",
  purple: "hover:border-purple-400/30",
};

export function LandingFeatureCard({
  accent,
  icon: Icon,
  title,
  body,
  cta,
  href,
}: {
  accent: Accent;
  icon: LucideIcon;
  title: string;
  body: string;
  cta: string;
  href: string;
}) {
  return (
    <div
      className={cn(
        "glass-panel card-inner-glow group rounded-2xl p-8 transition-all duration-500",
        borderLeft[accent],
      )}
    >
      <div
        className={cn(
          "mb-6 flex h-12 w-12 items-center justify-center rounded-full border transition-all",
          accentRing[accent],
        )}
      >
        <Icon className="size-6" aria-hidden />
      </div>
      <h3 className="font-heading mb-4 text-2xl font-medium text-neutral-9">
        {title}
      </h3>
      <p className="text-muted-foreground mb-6 text-base leading-relaxed">
        {body}
      </p>
      <Link
        href={href}
        className={cn(
          "text-label-sm inline-flex items-center gap-2 font-semibold tracking-widest uppercase transition-all hover:gap-4",
          accentLink[accent],
        )}
      >
        {cta}
        <ArrowRight className="size-4" aria-hidden />
      </Link>
    </div>
  );
}
