import { MobileBottomNav } from "./mobile-bottom-nav";
import { NavActiveSync } from "./nav-active-sync";
import { NavigationLoadingOverlay } from "./navigation-loading-overlay";
import { SiteHeader } from "./site-header";

export function MarketingShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-dvh flex-col">
      <NavActiveSync />
      <NavigationLoadingOverlay />
      <SiteHeader />
      <main id="main-content" className="min-h-0 flex-1">
        {children}
      </main>
      <MobileBottomNav />
    </div>
  );
}
