import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function HomePage() {
  return (
    <div className="flex min-h-dvh flex-col items-center justify-center gap-8 px-6 py-16">
      <div className="max-w-lg text-center">
        <h1 className="font-heading text-3xl font-semibold tracking-tight">
          YouUnveil
        </h1>
        <p className="text-muted-foreground mt-3 text-pretty text-sm font-normal leading-relaxed">
          Next.js 15, PWA, Supabase, Drizzle, TanStack Query, and shadcn/ui are
          wired up. Copy{" "}
          <code className="bg-muted rounded px-1.5 py-0.5 text-xs">
            .env.example
          </code>{" "}
          to{" "}
          <code className="bg-muted rounded px-1.5 py-0.5 text-xs">
            .env.local
          </code>{" "}
          and add your Supabase keys to continue.
        </p>
      </div>
      <div className="flex flex-wrap items-center justify-center gap-3">
        <Link
          className={cn(buttonVariants({ variant: "default" }))}
          href="https://supabase.com/dashboard"
          rel="noopener noreferrer"
        >
          Supabase dashboard
        </Link>
        <Link
          className={cn(buttonVariants({ variant: "outline" }))}
          href="https://nextjs.org/docs"
          rel="noopener noreferrer"
        >
          Next.js docs
        </Link>
      </div>
    </div>
  );
}
