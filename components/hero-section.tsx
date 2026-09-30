"use client";

import Image from "next/image";
import { ArrowDown, FileDown, Mail } from "lucide-react";
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
  const portraitRef = useRef<HTMLDivElement>(null);
  const eyebrowRef = useRef<HTMLParagraphElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const copyRef = useRef<HTMLDivElement>(null);
  const buttonRefs = useRef<Record<number, HTMLAnchorElement | null>>({});

  useEffect(() => {
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const entranceTargets = [
      eyebrowRef.current,
      headlineRef.current,
      copyRef.current,
      ...Object.values(buttonRefs.current).filter(Boolean),
    ];

    if (reducedMotion) {
      gsap.set(entranceTargets, { clearProps: "all" });
      return;
    }

    const timeline = gsap.timeline({ defaults: { ease: "power3.out" } });

    timeline
      .fromTo(
        portraitRef.current,
        { opacity: 0, scale: 1.06 },
        { opacity: 1, scale: 1, duration: 1.15 },
        0,
      )
      .fromTo(
        eyebrowRef.current,
        { opacity: 0, y: 12 },
        { opacity: 1, y: 0, duration: 0.5 },
        0.1,
      )
      .fromTo(
        headlineRef.current,
        { opacity: 0, y: 28 },
        { opacity: 1, y: 0, duration: 0.8 },
        0.2,
      )
      .fromTo(
        copyRef.current,
        { opacity: 0, y: 18 },
        { opacity: 1, y: 0, duration: 0.65 },
        0.38,
      )
      .fromTo(
        Object.values(buttonRefs.current).filter(Boolean),
        { opacity: 0, y: 12 },
        { opacity: 1, y: 0, duration: 0.5, stagger: 0.08 },
        0.5,
      );

    return () => {
      timeline.kill();
    };
  }, []);

  useEffect(() => {
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const isMobile = window.matchMedia("(max-width: 767px)").matches;

    if (reducedMotion || isMobile || !sectionRef.current) return;

    const contentTween = gsap.to(contentRef.current, {
      opacity: 0.55,
      y: -32,
      ease: "none",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top+=64",
        end: "bottom top",
        scrub: true,
      },
    });

    const portraitTween = gsap.to(portraitRef.current, {
      y: 42,
      scale: 1.035,
      ease: "none",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top+=64",
        end: "bottom top",
        scrub: true,
      },
    });

    return () => {
      contentTween.scrollTrigger?.kill();
      portraitTween.scrollTrigger?.kill();
      contentTween.kill();
      portraitTween.kill();
    };
  }, []);

  const handleButtonHover = (index: number, isHovering: boolean) => {
    const element = buttonRefs.current[index];
    if (!element) return;

    gsap.to(element, {
      y: isHovering ? -3 : 0,
      duration: 0.2,
      ease: "power2.out",
    });
  };

  return (
    <section
      ref={sectionRef}
      id="hero"
      aria-labelledby="hero-title"
      className="relative isolate mx-1 mt-1 flex w-[calc(100%_-_0.5rem)] flex-col overflow-hidden rounded-[1.25rem] border border-white/[0.06] bg-black md:block md:min-h-[calc(100svh_-_0.5rem)]"
    >
      <div
        ref={portraitRef}
        aria-hidden="true"
        className="relative h-[46vh] max-h-[380px] w-full md:absolute md:inset-y-0 md:right-[-8%] md:left-[18%] md:h-auto md:max-h-none md:w-auto"
      >
        <Image
          src="/images/me2.png"
          alt=""
          fill
          priority
          sizes="100vw"
          className="h-full w-full object-cover object-[center_22%] grayscale-[0.2] md:object-center"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black md:hidden"
        />
      </div>

      <div
        aria-hidden="true"
        className="hidden md:block md:absolute md:inset-0 md:bg-[linear-gradient(90deg,rgba(0,0,0,0.88)_0%,rgba(0,0,0,0.74)_25%,rgba(0,0,0,0.42)_42%,rgba(0,0,0,0.12)_60%,rgba(0,0,0,0.08)_100%),linear-gradient(180deg,rgba(0,0,0,0.52)_0%,rgba(0,0,0,0.3)_30%,rgba(0,0,0,0.24)_100%)]"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.13] [background-image:linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px)] [background-size:72px_72px] [mask-image:linear-gradient(to_right,black,transparent_67%)]"
      />

      <div
        ref={contentRef}
        className="relative z-10 mx-auto flex w-full max-w-[1440px] flex-1 flex-col justify-center px-5 py-8 sm:px-8 sm:py-10 md:min-h-[calc(100svh_-_0.5rem)] md:py-24 lg:px-16 xl:px-20"
      >
        <div className="max-w-[470px]">
          <p
            ref={eyebrowRef}
            className="mb-5 flex flex-wrap items-center gap-x-3 gap-y-1 text-[0.65rem] font-medium uppercase tracking-[0.24em] text-white/65 sm:text-xs"
          >
            <span className="flex items-center gap-3">
              <span className="h-px w-8 bg-white/55" />
              Bairon Fallas
            </span>
            <span className="flex items-center gap-3">
              <span className="text-white/25">|</span>
              {profile.role}
            </span>
          </p>

          <h1
            ref={headlineRef}
            id="hero-title"
            className="max-w-[10.5ch] text-[clamp(2.35rem,10vw,4.2rem)] font-semibold uppercase leading-[0.88] tracking-[-0.065em] text-white md:text-[clamp(2.75rem,3.4vw,4rem)]"
          >
            <span className="block">Código que</span>
            <span className="block">convierte</span>
            <span className="block">ideas en</span>
            <span className="block">productos</span>
          </h1>

          <div ref={copyRef} className="mt-6 max-w-[430px] sm:mt-7">
            <p className="text-base leading-relaxed text-white/62 sm:text-lg">
              {profile.subheadline}
            </p>
          </div>

          <div className="mt-7 flex flex-wrap items-center gap-3 sm:mt-8">
            <a
              ref={(element) => {
                if (element) buttonRefs.current[0] = element;
              }}
              href="#projects"
              onMouseEnter={() => handleButtonHover(0, true)}
              onMouseLeave={() => handleButtonHover(0, false)}
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-white px-5 py-3 text-xs font-semibold uppercase tracking-[0.1em] text-black transition-colors hover:bg-white/85"
            >
              Explorar proyectos
              <ArrowDown className="h-3.5 w-3.5 transition-transform group-hover:translate-y-0.5" />
            </a>
            <a
              ref={(element) => {
                if (element) buttonRefs.current[1] = element;
              }}
              href="#contact"
              onMouseEnter={() => handleButtonHover(1, true)}
              onMouseLeave={() => handleButtonHover(1, false)}
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 bg-black/20 px-5 py-3 text-xs font-medium uppercase tracking-[0.1em] text-white backdrop-blur-md transition-colors hover:border-white/45 hover:bg-white/10"
            >
              <Mail className="h-3.5 w-3.5" />
              Hablemos
            </a>
            <a
              ref={(element) => {
                if (element) buttonRefs.current[2] = element;
              }}
              href={profile.cv_url}
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={() => handleButtonHover(2, true)}
              onMouseLeave={() => handleButtonHover(2, false)}
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 bg-black/20 px-5 py-3 text-xs font-medium uppercase tracking-[0.1em] text-white/75 backdrop-blur-md transition-colors hover:border-white/45 hover:bg-white/10 hover:text-white"
              aria-label="Ver currículum"
            >
              <FileDown className="h-3.5 w-3.5" />
              CV
              <ArrowDown className="h-3.5 w-3.5" />
            </a>
          </div>


        </div>
      </div>
    </section>
  );
}
