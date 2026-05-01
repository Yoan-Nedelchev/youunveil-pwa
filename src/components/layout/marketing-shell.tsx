import { MobileBottomNav } from "./mobile-bottom-nav";
import { SiteFooter } from "./site-footer";
import { SiteHeader } from "./site-header";

export function MarketingShell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SiteHeader />
      <main id="main-content" className="pb-24 md:pb-0">
        {children}
        <div id="profile" className="sr-only" tabIndex={-1} aria-hidden />
      </main>
      <SiteFooter />
      <MobileBottomNav />
    </>
  );
}
