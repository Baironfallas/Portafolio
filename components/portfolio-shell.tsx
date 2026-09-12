"use client";

import { SmoothScroll } from "@/components/smooth-scroll";
import { ScrollProgress } from "@/components/scroll-progress";

export function PortfolioShell({ children }: { children: React.ReactNode }) {
  return (
    <SmoothScroll>
      <ScrollProgress />
      {children}
    </SmoothScroll>
  );
}
