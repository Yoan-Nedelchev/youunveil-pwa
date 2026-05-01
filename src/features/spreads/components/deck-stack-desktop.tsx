"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";

import { SPREAD_DESKTOP_STACK } from "@/features/spreads/image-urls";

const LAYOUT = [
  { rotate: -12, x: -128, y: 16, z: 0, emphasis: false },
  { rotate: -6, x: -64, y: 8, z: 0, emphasis: false },
  { rotate: 0, x: 0, y: 0, z: 10, emphasis: true },
  { rotate: 6, x: 64, y: 8, z: 0, emphasis: false },
  { rotate: 12, x: 128, y: 16, z: 0, emphasis: false },
] as const;

export function DeckStackDesktop() {
  const alts = useTranslations("spreads.images").raw(
    "desktopStackAlts",
  ) as string[];

  return (
    <div className="group relative flex h-64 w-full justify-center overflow-visible">
      {SPREAD_DESKTOP_STACK.map((src, i) => {
        const { rotate, x, y, z, emphasis } = LAYOUT[i]!;

        return (
          <div
            key={src}
            className="absolute cursor-grab transition-all duration-500 hover:-translate-y-1 active:cursor-grabbing"
            style={{
              transform: `rotate(${rotate}deg) translateX(${x}px) translateY(${y}px)`,
              zIndex: z,
            }}
          >
            <div
              className={
                emphasis
                  ? "bg-palette-primary aspect-[2/3] w-40 overflow-hidden rounded-lg border border-palette-secondary shadow-2xl ring-4 ring-palette-secondary/10"
                  : "bg-palette-primary aspect-[2/3] w-40 overflow-hidden rounded-lg border border-palette-secondary/30 shadow-2xl"
              }
            >
              <Image
                src={src}
                alt={alts[i] ?? ""}
                width={160}
                height={240}
                className={
                  emphasis
                    ? "h-full w-full object-cover"
                    : "h-full w-full object-cover opacity-80 group-hover:opacity-100"
                }
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}
