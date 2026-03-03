"use client";

import { SmoothScroll } from "@/components/smooth-scroll";
import { AnimateOnScroll } from "@/components/animate-on-scroll";

export function PortfolioShell({ children }: { children: React.ReactNode }) {
  const childArray = Array.isArray(children) ? children : [children];

  return (
    <SmoothScroll>
      {childArray.map((child, index) => (
        <AnimateOnScroll key={index} delay={index * 0.08}>
          {child}
        </AnimateOnScroll>
      ))}
    </SmoothScroll>
  );
}
