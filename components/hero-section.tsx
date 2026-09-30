"use client";

import Image from "next/image";
import { ArrowDown, ArrowUpRight, FileDown, Mail } from "lucide-react";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { Profile } from "@/types/profile";
import type { Project } from "@/types/project";
import profileData from "@/data/profile.json";
import projectsData from "@/data/projects.json";

gsap.registerPlugin(ScrollTrigger);

const profile: Profile = profileData;
const featuredProjects: Project[] = projectsData.slice(0, 2);

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const portraitRef = useRef<HTMLDivElement>(null);
  const eyebrowRef = useRef<HTMLParagraphElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const copyRef = useRef<HTMLDivElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);
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
      projectsRef.current,
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
      )
      .fromTo(
        projectsRef.current,
        { opacity: 0, x: 32 },
        { opacity: 1, x: 0, duration: 0.7 },
        0.64,
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
      className="mx-auto w-full max-w-[1280px] px-3 pb-12 pt-3 sm:px-5 sm:pb-16 sm:pt-5"
    >
      <div className="relative isolate min-h-[760px] overflow-hidden rounded-[1.25rem] border border-white/10 bg-[#070a0c] shadow-[0_30px_100px_-48px_rgba(0,0,0,0.95)] sm:min-h-[790px] md:min-h-[calc(100svh-7.5rem)] md:rounded-[1.75rem]">
        <div
          ref={portraitRef}
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 h-[62%] origin-center md:inset-0 md:h-auto"
        >
          <Image
            src="/images/me2.png"
            alt=""
            fill
            priority
            sizes="(max-width: 768px) 100vw, 1280px"
            className="object-cover object-[51%_center] grayscale-[0.2] md:object-center"
          />
        </div>

        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[linear-gradient(180deg,#070a0c_0%,rgba(7,10,12,0.98)_32%,rgba(7,10,12,0.35)_68%,rgba(7,10,12,0.82)_100%)] md:bg-[linear-gradient(90deg,#070a0c_0%,rgba(7,10,12,0.96)_26%,rgba(7,10,12,0.58)_38%,rgba(7,10,12,0.08)_55%,transparent_72%),linear-gradient(0deg,rgba(7,10,12,0.88)_0%,transparent_32%)]"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-[0.13] [background-image:linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px)] [background-size:72px_72px] [mask-image:linear-gradient(to_right,black,transparent_67%)]"
        />

        <span className="absolute left-5 top-5 z-20 text-[0.6rem] font-medium uppercase tracking-[0.28em] text-white/45 sm:left-8 sm:top-7">
          Portfolio / 2026
        </span>
        <span className="absolute right-5 top-5 z-20 text-[0.6rem] font-medium uppercase tracking-[0.28em] text-white/45 sm:right-8 sm:top-7">
          CR / Disponible
        </span>

        <div
          ref={contentRef}
          className="relative z-10 flex min-h-[760px] flex-col px-5 pb-5 pt-20 sm:min-h-[790px] sm:px-9 sm:pb-8 sm:pt-24 md:min-h-[calc(100svh-7.5rem)] md:px-14 md:pb-10 md:pt-24 lg:px-20 lg:pt-28"
        >
          <div className="max-w-[720px]">
            <p
              ref={eyebrowRef}
              className="mb-5 flex items-center gap-3 text-[0.65rem] font-medium uppercase tracking-[0.24em] text-white/65 sm:text-xs"
            >
              <span className="h-px w-8 bg-white/55" />
              {profile.role} / Frontend + Backend
            </p>

            <h1
              ref={headlineRef}
              id="hero-title"
              className="text-[clamp(2.35rem,10vw,4.4rem)] font-semibold uppercase leading-[0.88] tracking-[-0.065em] text-white md:text-[clamp(3.7rem,5.5vw,5.2rem)]"
            >
              <span className="block">Código que</span>
              <span className="block">convierte ideas</span>
              <span className="block">en productos.</span>
            </h1>

            <div ref={copyRef} className="mt-6 max-w-[430px] sm:mt-7">
              <p className="text-sm leading-relaxed text-white/62 sm:text-[0.95rem]">
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
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-black/20 text-white/75 backdrop-blur-md transition-colors hover:border-white/45 hover:bg-white/10 hover:text-white"
                aria-label="Ver currículum"
              >
                <FileDown className="h-4 w-4" />
              </a>
            </div>
          </div>

          <div
            ref={projectsRef}
            className="mt-auto grid grid-cols-2 gap-2 pt-10 md:absolute md:bottom-11 md:right-10 md:w-[48%] md:grid-cols-[1fr_1fr_auto] md:items-end md:gap-3 lg:right-14"
          >
            {featuredProjects.map((project, index) => (
              <a
                key={project.id}
                href={project.demo_url}
                target="_blank"
                rel="noopener noreferrer"
                className={`group relative overflow-hidden rounded-lg border border-white/15 bg-black/65 p-1.5 shadow-2xl backdrop-blur-md transition-transform duration-300 hover:-translate-y-2 ${
                  index === 0 ? "md:-rotate-2" : "md:translate-y-3 md:rotate-2"
                }`}
                aria-label={`Abrir proyecto ${project.name}`}
              >
                <div className="relative aspect-[16/9] overflow-hidden rounded-[0.3rem] bg-zinc-900">
                  <Image
                    src={project.image_url}
                    alt=""
                    fill
                    sizes="(max-width: 768px) 45vw, 220px"
                    className="object-cover grayscale transition-all duration-500 group-hover:scale-105 group-hover:grayscale-0"
                  />
                </div>
                <div className="flex items-center justify-between gap-2 px-1 pb-0.5 pt-2">
                  <span className="truncate text-[0.6rem] font-medium uppercase tracking-[0.08em] text-white/80 sm:text-[0.65rem]">
                    {project.name}
                  </span>
                  <ArrowUpRight className="h-3 w-3 shrink-0 text-white/65 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </div>
              </a>
            ))}

            <a
              href="#projects"
              className="col-span-2 mt-1 inline-flex items-center justify-center gap-2 rounded-full border border-white/15 bg-black/35 px-4 py-2.5 text-[0.62rem] font-medium uppercase tracking-[0.16em] text-white/70 backdrop-blur-md transition-colors hover:border-white/40 hover:text-white md:col-span-1 md:mt-0 md:h-11 md:w-11 md:px-0"
              aria-label="Ver todos los proyectos"
            >
              <span className="md:hidden">Ver todos</span>
              <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 z-20 hidden h-7 w-full items-center overflow-hidden border-t border-white/10 bg-black/55 text-[0.52rem] uppercase tracking-[0.22em] text-white/40 backdrop-blur-md md:flex">
          <div className="flex min-w-max items-center gap-8 px-5">
            <span>React / Next.js</span>
            <span>TypeScript</span>
            <span>Node.js / NestJS</span>
            <span>Arquitectura limpia</span>
            <span>Diseño responsive</span>
          </div>
        </div>
      </div>
    </section>
  );
}
