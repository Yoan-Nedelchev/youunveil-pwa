"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import { ArrowRight, Loader2, Sparkles, Zap } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

import { LANDING_IMAGES } from "@/features/landing/image-urls";
import { buttonVariants } from "@/components/ui/button";
import { useRouter } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

export function LandingHero() {
  const t = useTranslations("landing.hero");
  const router = useRouter();
  const searchParams = useSearchParams();
  const [prompt, setPrompt] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const inquiry = searchParams.get("inquiry");
    if (!inquiry) return;
    setPrompt(inquiry);
  }, [searchParams]);

  const submit = useCallback(() => {
    const trimmed = prompt.trim();
    if (!trimmed) {
      setError(t("errorEmpty"));
      return;
    }

    setLoading(true);
    setError(null);
    router.push(`/spreads?inquiry=${encodeURIComponent(trimmed)}`);
  }, [prompt, router, t]);

  return (
    <section
      id="hero"
      className="relative flex min-h-screen items-start justify-center overflow-hidden pt-8 md:items-center md:pt-0"
      aria-labelledby="hero-heading"
    >
      <div className="absolute inset-0 z-0">
        <div className="aurora-glow absolute top-1/4 left-1/4 h-[500px] w-[500px] rounded-full blur-[120px]" />
        <div className="aurora-glow absolute right-1/4 bottom-1/4 h-[600px] w-[600px] rounded-full opacity-50 blur-[150px]" />
        <div className="absolute inset-0 opacity-30">
          <Image
            src={LANDING_IMAGES.heroBackground}
            alt={t("backgroundAlt")}
            fill
            className="object-cover"
            sizes="100vw"
            priority
          />
        </div>
      </div>
      <div className="relative z-10 w-full max-w-4xl px-6 text-center">
        <h1
          id="hero-heading"
          className="font-heading mb-6 text-4xl leading-tight font-bold tracking-tight text-palette-secondary drop-shadow-lg md:text-5xl md:leading-[1.1]"
        >
          {t("titleLine1")}
          <br />
          <span className="text-neutral-9 font-light italic">
            {t("titleLine2")}
          </span>
        </h1>
        <p className="text-muted-foreground mx-auto mb-12 max-w-2xl text-lg leading-relaxed md:text-xl">
          {t("subtitle")}
        </p>
        <form
          className="glass-panel flex flex-col items-stretch gap-4 rounded-xl border-palette-secondary/20 p-2 shadow-2xl sm:flex-row sm:items-center"
          onSubmit={(e) => {
            e.preventDefault();
            void submit();
          }}
        >
          <label htmlFor="hero-inquiry" className="sr-only">
            {t("inputPlaceholder")}
          </label>
          <input
            id="hero-inquiry"
            type="text"
            name="inquiry"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder={t("inputPlaceholder")}
            disabled={loading}
            autoComplete="off"
            className="text-foreground placeholder:text-slate-600 w-full border-0 bg-transparent px-6 py-4 text-base focus:ring-0 disabled:opacity-60 md:text-lg"
          />
          <button
            type="submit"
            disabled={loading}
            className={cn(
              buttonVariants({ variant: "secondary" }),
              "group inline-flex shrink-0 items-center justify-center gap-2 rounded-lg border-transparent bg-palette-secondary px-8 py-4 font-heading text-xl font-medium text-palette-primary hover:bg-palette-secondary/90 disabled:pointer-events-none disabled:opacity-60",
            )}
          >
            {loading ? (
              <>
                <Loader2 className="size-5 shrink-0 animate-spin" aria-hidden />
                {t("loading")}
              </>
            ) : (
              <>
                {t("beginSpread")}
                <ArrowRight
                  className="size-5 shrink-0 transition-transform group-hover:translate-x-1"
                  aria-hidden
                />
              </>
            )}
          </button>
        </form>

        {error !== null && (
          <div
            className="glass-panel border-palette-secondary/15 mt-6 rounded-xl border px-6 py-5 text-left shadow-xl"
            role="region"
            aria-label={t("responseAria")}
            aria-live="polite"
          >
            <p className="text-destructive text-sm leading-relaxed">{error}</p>
          </div>
        )}

        <div className="mt-8 flex flex-wrap justify-center gap-8">
          <div className="text-label-sm flex items-center gap-2 font-semibold tracking-widest text-slate-500 uppercase">
            <Zap className="text-teal-accent size-4 shrink-0" aria-hidden />
            {t("quantumAlignment")}
          </div>
          <div className="text-label-sm flex items-center gap-2 font-semibold tracking-widest text-slate-500 uppercase">
            <Sparkles
              className="text-teal-accent size-4 shrink-0"
              aria-hidden
            />
            {t("aiSynchronicity")}
          </div>
        </div>
      </div>
    </section>
  );
}
