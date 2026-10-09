"use client";

import { useEffect } from "react";
import Clarity from "@microsoft/clarity";

export default function ClarityInit({ projectId }: { projectId?: string }) {
  useEffect(() => {
    if (!projectId || process.env.NODE_ENV !== "production") return;

    // Defer to idle time so Clarity doesn't compete with LCP/TBT
    const start = () => Clarity.init(projectId);
    if ("requestIdleCallback" in window) {
      const id = window.requestIdleCallback(start, { timeout: 4000 });
      return () => window.cancelIdleCallback(id);
    }
    const t = setTimeout(start, 2000);
    return () => clearTimeout(t);
  }, [projectId]);

  return null;
}
