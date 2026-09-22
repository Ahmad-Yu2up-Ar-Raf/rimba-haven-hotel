import { useEffect } from "react";
import { Outlet, ScrollRestoration, useLocation } from "react-router";
import { Toaster } from "@/components/ui/sonner";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";

export function RouteLayout() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="flex min-h-svh flex-col bg-background text-foreground">
      <SiteHeader />
      <div className="flex-1">
        <Outlet />
      </div>
      <SiteFooter />
      <Toaster position="bottom-center" richColors={false} />
      <ScrollRestoration />
    </div>
  );
}
