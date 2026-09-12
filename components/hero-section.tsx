"use client";

import { ArrowDown, Mail, FileDown } from "lucide-react";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { Profile } from "@/types/profile";
import profileData from "@/data/profile.json";

gsap.registerPlugin(ScrollTrigger);

const profile: Profile = profileData;

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
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

  // Parallax cinematográfico: al hacer scroll, el contenido se aleja y
  // el glow de fondo se desplaza para dar sensación de profundidad.
  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReduced || !sectionRef.current) return;

    const scrollTween = gsap.to(contentRef.current, {
      opacity: 0.15,
      y: -60,
      scale: 0.96,
      ease: "none",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    });

    const glowTween = gsap.to(glowRef.current, {
      y: 140,
      scale: 1.25,
      ease: "none",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    });

    return () => {
      scrollTween.scrollTrigger?.kill();
      scrollTween.kill();
      glowTween.scrollTrigger?.kill();
      glowTween.kill();
    };
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
      ref={sectionRef}
      id="hero"
      className="relative mx-auto flex max-w-[1100px] flex-col items-center overflow-hidden px-5 pb-16 pt-16 text-center sm:px-6 sm:pb-20 sm:pt-24 md:pb-28 md:pt-36"
    >
      <div
        ref={glowRef}
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-24 -z-10 h-[420px] w-[min(90vw,720px)] -translate-x-1/2 rounded-full bg-foreground/[0.05] blur-[120px]"
      />

      <div ref={contentRef} className="flex w-full flex-col items-center">
      <p
        ref={roleRef}
        className="mb-5 inline-flex max-w-full items-center gap-2 rounded-full border border-border/70 bg-background/40 px-3 py-1.5 text-[0.7rem] font-medium uppercase tracking-[0.08em] text-muted-foreground backdrop-blur-sm sm:px-3.5 sm:text-xs sm:tracking-[0.14em]"
      >
        <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-foreground/70 shadow-[0_0_8px_1px] shadow-foreground/25" />
        {profile.role} &middot; {profile.specialization}
      </p>

      <h1
        ref={headlineRef}
        className="mb-5 max-w-3xl bg-gradient-to-b from-foreground to-foreground/70 bg-clip-text text-3xl font-bold leading-[1.12] tracking-tight text-transparent text-balance sm:mb-6 sm:text-4xl sm:leading-[1.08] md:text-5xl lg:text-[3.5rem]"
      >
        {profile.headline}
      </h1>

      <p
        ref={subheadlineRef}
        className="mb-8 max-w-xl text-sm leading-relaxed text-muted-foreground sm:mb-11 sm:text-[1.0625rem]"
      >
        {profile.subheadline}
      </p>

      <div className="flex w-full flex-col items-stretch gap-3 sm:w-auto sm:flex-row sm:flex-wrap sm:items-center sm:justify-center">
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
      </div>
    </section>
  );
}
