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
    const timeline = gsap.timeline();

    // Entrada suave del rol
    timeline.fromTo(
      roleRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.6, ease: "power2.out" },
      0
    );

    // Entrada suave del título
    timeline.fromTo(
      headlineRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.8, ease: "power2.out" },
      0.2
    );

    // Entrada suave del subtítulo
    timeline.fromTo(
      subheadlineRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.8, ease: "power2.out" },
      0.4
    );

    // Entrada de los botones
    timeline.fromTo(
      Object.values(buttonRefs.current).filter(Boolean),
      { opacity: 0 },
      { opacity: 1, duration: 0.6, stagger: 0.1, ease: "power2.out" },
      0.6
    );
  }, []);

  const handleButtonHover = (index: number, isHovering: boolean) => {
    const element = buttonRefs.current[index];
    if (element) {
      gsap.to(element, {
        scale: isHovering ? 1.05 : 1,
        duration: 0.25,
        ease: "power2.out",
      });
    }
  };

  const headlineWords = profile.headline.split(" ");

  return (
    <section
      id="hero"
      className="relative isolate mx-auto flex min-h-[calc(100vh-3.5rem)] max-w-[1100px] flex-col items-center justify-center overflow-hidden px-6 pb-20 pt-20 text-center md:pt-24"
    >
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_center,rgba(229,231,235,0.06),transparent_34%)]" />
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(circle_at_center,black,transparent_72%)]" />

      <p
        ref={roleRef}
        className="mb-3 text-xs font-semibold uppercase tracking-[0.24em] text-primary"
      >
        {profile.role} &middot; {profile.specialization}
      </p>

      <h1
        ref={headlineRef}
        className="mb-5 max-w-2xl text-3xl font-bold leading-tight tracking-tight text-foreground text-balance md:text-4xl lg:text-[2.75rem]"
      >
        {headlineWords.map((word, index) => (
          <span
            key={`${word}-${index}`}
            className={index === 2 ? "text-primary" : undefined}
          >
            {word}
            {index < headlineWords.length - 1 ? " " : ""}
          </span>
        ))}
      </h1>

      <p
        ref={subheadlineRef}
        className="mb-10 max-w-lg text-base leading-relaxed text-[#a1a1aa]"
      >
        {profile.subheadline}
      </p>

      <div className="flex flex-wrap items-center justify-center gap-3">
        <a
          ref={(el) => {
            if (el) buttonRefs.current[0] = el;
          }}
          href="#projects"
          onMouseEnter={() => handleButtonHover(0, true)}
          onMouseLeave={() => handleButtonHover(0, false)}
          className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-all duration-200 ease-out hover:bg-[#d4d4d8] hover:shadow-lg hover:shadow-primary/10"
        >
          <ArrowDown className="h-4 w-4" />
          Ver proyectos
        </a>

        <a
          ref={(el) => {
            if (el) buttonRefs.current[1] = el;
          }}
          href="#contact"
          onMouseEnter={() => handleButtonHover(1, true)}
          onMouseLeave={() => handleButtonHover(1, false)}
          className="inline-flex items-center gap-2 rounded-lg border border-primary/60 bg-transparent px-5 py-2.5 text-sm font-medium text-foreground transition-all duration-200 ease-out hover:border-primary hover:bg-primary/10"
        >
          <Mail className="h-4 w-4" />
          Contactar
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
          className="inline-flex items-center gap-2 px-2 py-2.5 text-sm font-medium text-[#a1a1aa] underline-offset-4 transition-colors duration-200 ease-out hover:text-primary hover:underline"
        >
          <FileDown className="h-4 w-4" />
          Ver CV
        </a>
      </div>
    </section>
  );
}
