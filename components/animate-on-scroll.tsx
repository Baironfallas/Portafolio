"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function AnimateOnScroll({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReduced || !ref.current) return;

    gsap.fromTo(
      ref.current,
      { opacity: 0, y: 10 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        delay,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ref.current,
          start: "top 92%",
          once: true,
        },
      }
    );
  }, [delay]);

  return (
    <div ref={ref} className={className} style={{ opacity: 0 }}>
      {children}
    </div>
  );
}
