import { MobileBottomNav } from "./mobile-bottom-nav";
import { NavActiveSync } from "./nav-active-sync";
import { SiteFooter } from "./site-footer";
import { SiteHeader } from "./site-header";

export function MarketingShell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <NavActiveSync />
      <SiteHeader />
      <main id="main-content" className="pb-24 md:pb-0">
        {children}
      </main>
      <SiteFooter />
      <MobileBottomNav />
    </>
  );
}
