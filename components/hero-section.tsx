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
      className="mx-auto flex max-w-[1100px] flex-col items-center px-6 pb-16 pt-20 text-center md:pt-28"
    >
      <p
        ref={roleRef}
        className="mb-3 text-sm font-medium tracking-wide text-muted-foreground"
      >
        {profile.role} &middot; {profile.specialization}
      </p>

      <h1
        ref={headlineRef}
        className="mb-5 max-w-2xl text-3xl font-bold leading-tight tracking-tight text-foreground text-balance md:text-4xl lg:text-[2.75rem]"
      >
        {profile.headline}
      </h1>

      <p
        ref={subheadlineRef}
        className="mb-10 max-w-lg text-base leading-relaxed text-muted-foreground"
      >
        {profile.subheadline}
      </p>

      <div className="flex flex-wrap items-center justify-center gap-3">
        <a
          ref={(el) => {
            if (el) buttonRefs.current[0] = el;
          }}
          href="#contact"
          onMouseEnter={() => handleButtonHover(0, true)}
          onMouseLeave={() => handleButtonHover(0, false)}
          className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-all duration-200 hover:opacity-90"
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
          className="inline-flex items-center gap-2 rounded-lg border border-border bg-background px-5 py-2.5 text-sm font-medium text-foreground transition-all duration-200 hover:bg-hover"
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
          className="inline-flex items-center gap-2 rounded-lg border border-border bg-background px-5 py-2.5 text-sm font-medium text-foreground transition-all duration-200 hover:bg-hover"
        >
          <FileDown className="h-4 w-4" />
          Ver CV
        </a>
      </div>
    </section>
  );
}
