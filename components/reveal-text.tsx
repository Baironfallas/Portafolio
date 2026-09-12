"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function RevealText({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const wrapperRef = useRef<HTMLSpanElement>(null);
  const innerRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReduced || !innerRef.current || !wrapperRef.current) return;

    gsap.fromTo(
      innerRef.current,
      { yPercent: 110 },
      {
        yPercent: 0,
        duration: 0.7,
        ease: "power3.out",
        scrollTrigger: {
          trigger: wrapperRef.current,
          start: "top 88%",
          once: true,
        },
      }
    );
  }, []);

  return (
    <span
      ref={wrapperRef}
      className={`inline-block overflow-hidden align-bottom ${className ?? ""}`}
    >
      <span ref={innerRef} className="inline-block">
        {children}
      </span>
    </span>
  );
}
