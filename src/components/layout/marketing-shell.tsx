import { SiteFooter } from "./site-footer";
import { SiteHeader } from "./site-header";
import { MobileBottomNav } from "./mobile-bottom-nav";

export function MarketingShell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SiteHeader />
      <main id="main-content" className="pb-24 md:pb-0">
        {children}
      </main>
      <SiteFooter />
      <MobileBottomNav />
    </>
  );
}
