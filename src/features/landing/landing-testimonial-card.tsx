"use client";

import Image from "next/image";
import { Star } from "lucide-react";

import { cn } from "@/lib/utils";

type Accent = "gold" | "teal" | "amber";

const borderAccent: Record<Accent, string> = {
  gold: "border-l-palette-secondary",
  teal: "border-l-teal-400",
  amber: "border-l-amber-400",
};

const starColor: Record<Accent, string> = {
  gold: "text-palette-secondary",
  teal: "text-teal-300",
  amber: "text-amber-400",
};

export function LandingTestimonialCard({
  accent,
  quote,
  name,
  role,
  avatarSrc,
  avatarAlt,
}: {
  accent: Accent;
  quote: string;
  name: string;
  role: string;
  avatarSrc: string;
  avatarAlt: string;
}) {
  return (
    <article
      className={cn(
        "glass-panel rounded-2xl border-l-4 p-8",
        borderAccent[accent],
      )}
    >
      <div className={cn("mb-6 flex gap-1", starColor[accent])}>
        {Array.from({ length: 5 }).map((_, i) => (
          <Star key={i} className="size-4 fill-current" aria-hidden />
        ))}
      </div>
      <p className="text-foreground mb-8 text-base italic leading-relaxed">
        &ldquo;{quote}&rdquo;
      </p>
      <div className="flex items-center gap-4">
        <div className="bg-surface-variant relative h-10 w-10 overflow-hidden rounded-full">
          <Image
            src={avatarSrc}
            alt={avatarAlt}
            fill
            className="object-cover"
            sizes="40px"
          />
        </div>
        <div>
          <p className="font-heading text-sm text-neutral-9">{name}</p>
          <p className="text-[10px] font-semibold tracking-widest text-slate-500 uppercase">
            {role}
          </p>
        </div>
      </div>
    </article>
  );
}
