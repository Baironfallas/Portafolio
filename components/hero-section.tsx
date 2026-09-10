"use client";

import { ArrowDown, Mail, FileDown } from "lucide-react";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import type { Profile } from "@/types/profile";
import profileData from "@/data/profile.json";

const profile: Profile = profileData;

export function HeroSection() {
  const roleRef = useRef<HTMLParagraphElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subheadlineRef = useRef<HTMLParagraphElement>(null);
  const buttonRefs = useRef<Record<number, HTMLAnchorElement | null>>({});

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const targets = [
      roleRef.current,
      headlineRef.current,
      subheadlineRef.current,
      ...Object.values(buttonRefs.current).filter(Boolean),
    ];

    if (prefersReduced) {
      gsap.set(targets, { opacity: 1, y: 0 });
      return;
    }

    const timeline = gsap.timeline();

    // Entrada progresiva (fade-up) del rol
    timeline.fromTo(
      roleRef.current,
      { opacity: 0, y: 12 },
      { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" },
      0
    );

    // Entrada progresiva del título
    timeline.fromTo(
      headlineRef.current,
      { opacity: 0, y: 12 },
      { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
      0.12
    );

    // Entrada progresiva del subtítulo
    timeline.fromTo(
      subheadlineRef.current,
      { opacity: 0, y: 12 },
      { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
      0.24
    );

    // Entrada de los botones
    timeline.fromTo(
      Object.values(buttonRefs.current).filter(Boolean),
      { opacity: 0, y: 12 },
      { opacity: 1, y: 0, duration: 0.5, stagger: 0.08, ease: "power2.out" },
      0.36
    );
  }, []);

  const handleButtonHover = (index: number, isHovering: boolean) => {
    const element = buttonRefs.current[index];
    if (element) {
      gsap.to(element, {
        scale: isHovering ? 1.03 : 1,
        y: isHovering ? -2 : 0,
        duration: 0.2,
        ease: "power2.out",
      });
    }
  };

  return (
    <section
      id="hero"
      className="relative mx-auto flex max-w-[1100px] flex-col items-center px-6 pb-20 pt-24 text-center md:pb-28 md:pt-36"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-24 -z-10 h-[420px] w-[min(90vw,720px)] -translate-x-1/2 rounded-full bg-foreground/[0.06] blur-[120px]"
      />

      <p
        ref={roleRef}
        className="mb-5 inline-flex items-center gap-2 rounded-full border border-border/70 bg-background/40 px-3.5 py-1.5 text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground backdrop-blur-sm"
      >
        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400/80 shadow-[0_0_8px_1px] shadow-emerald-400/40" />
        {profile.role} &middot; {profile.specialization}
      </p>

      <h1
        ref={headlineRef}
        className="mb-6 max-w-3xl bg-gradient-to-b from-foreground to-foreground/70 bg-clip-text text-4xl font-bold leading-[1.08] tracking-tight text-transparent text-balance sm:text-5xl lg:text-[3.5rem]"
      >
        {profile.headline}
      </h1>

      <p
        ref={subheadlineRef}
        className="mb-11 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-[1.0625rem]"
      >
        {profile.subheadline}
      </p>

      <div className="flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:flex-wrap sm:items-center">
        <a
          ref={(el) => {
            if (el) buttonRefs.current[0] = el;
          }}
          href="#contact"
          onMouseEnter={() => handleButtonHover(0, true)}
          onMouseLeave={() => handleButtonHover(0, false)}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-[0_1px_0_0_rgba(255,255,255,0.4)_inset,0_8px_24px_-8px_rgba(0,0,0,0.5)] transition-all duration-200 hover:opacity-90"
        >
          <Mail className="h-4 w-4" />
          Contactar
        </a>

        <a
          ref={(el) => {
            if (el) buttonRefs.current[1] = el;
          }}
          href="#projects"
          onMouseEnter={() => handleButtonHover(1, true)}
          onMouseLeave={() => handleButtonHover(1, false)}
          className="inline-flex items-center justify-center gap-2 rounded-xl border border-border/80 bg-background/40 px-5 py-3 text-sm font-medium text-foreground backdrop-blur-sm transition-all duration-200 hover:border-border hover:bg-hover"
        >
          <ArrowDown className="h-4 w-4" />
          Ver proyectos
        </a>

        <a
          ref={(el) => {
            if (el) buttonRefs.current[2] = el;
          }}
          href={profile.cv_url}
          target="_blank"
          rel="noopener noreferrer"
          onMouseEnter={() => handleButtonHover(2, true)}
          onMouseLeave={() => handleButtonHover(2, false)}
          className="inline-flex items-center justify-center gap-2 rounded-xl border border-border/80 bg-background/40 px-5 py-3 text-sm font-medium text-foreground backdrop-blur-sm transition-all duration-200 hover:border-border hover:bg-hover"
        >
          <FileDown className="h-4 w-4" />
          Ver CV
        </a>
      </div>
    </section>
  );
}
