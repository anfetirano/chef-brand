"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { track as vercelTrack } from "@vercel/analytics/react";
import {
  setAnalyticsAdapter,
  trackEvent,
  trackPageView,
} from "@/services/observability/analytics-service";

const RETURN_VISIT_STORAGE_KEY = "chef-brand-return-visitor";
const scrollMilestones = [25, 50, 75, 100] as const;

export function AnalyticsProvider() {
  const pathname = usePathname();

  useEffect(() => {
    setAnalyticsAdapter({
      track(name, payload) {
        vercelTrack(name, payload);
      },
      page(path) {
        vercelTrack("page_view", { path });
      },
    });
  }, []);

  useEffect(() => {
    if (!pathname) {
      return;
    }

    trackPageView(pathname);

    const hasVisitedBefore = window.localStorage.getItem(RETURN_VISIT_STORAGE_KEY);

    if (hasVisitedBefore) {
      trackEvent("return_visit", { path: pathname });
    } else {
      window.localStorage.setItem(RETURN_VISIT_STORAGE_KEY, "true");
    }
  }, [pathname]);

  useEffect(() => {
    if (!pathname) {
      return;
    }

    const trackedMilestones = new Set<number>();

    function handleScroll() {
      const documentHeight = document.documentElement.scrollHeight - window.innerHeight;

      if (documentHeight <= 0) {
        return;
      }

      const scrollProgress = (window.scrollY / documentHeight) * 100;

      for (const milestone of scrollMilestones) {
        if (scrollProgress >= milestone && !trackedMilestones.has(milestone)) {
          trackedMilestones.add(milestone);
          trackEvent("scroll_depth", {
            depth: milestone,
            path: pathname,
          });
        }
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [pathname]);

  return null;
}
