"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { trackEvent } from "@/lib/analytics";

export function FunnelTracker() {
  const pathname = usePathname();
  const startTimeRef = useRef<number>(0);

  useEffect(() => {
    if (!pathname) return;

    startTimeRef.current = Date.now();
    trackEvent("funnel_visit", { path: pathname });

    const timer = window.setTimeout(() => {
      trackEvent("funnel_dwell_30s", { path: pathname, dwell_seconds: 30 });
    }, 30000);

    return () => {
      window.clearTimeout(timer);
      const seconds = Math.round((Date.now() - startTimeRef.current) / 1000);
      trackEvent("funnel_page_exit", { path: pathname, dwell_seconds: seconds });
    };
  }, [pathname]);

  return null;
}
