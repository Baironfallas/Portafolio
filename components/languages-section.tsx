"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { Profile } from "@/types/profile";
import profileData from "@/data/profile.json";
import { SectionHeading } from "@/components/section-heading";

gsap.registerPlugin(ScrollTrigger);

const profile: Profile = profileData;

const LANGUAGE_DETAILS = [
  {
    flag: "🇪🇸",
    filledBars: 5,
    description: "Comunicación efectiva en entornos académicos y profesionales.",
  },
  {
    flag: "🇬🇧",
    filledBars: 2,
    description: "Lectura y comunicación en contextos técnicos.",
  },
];

const TOTAL_BARS = 5;

export function LanguagesSection() {
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (!containerRef.current) return;

    const items = containerRef.current.querySelectorAll(".lang-item");

    if (prefersReduced) {
      gsap.set(items, { opacity: 1, y: 0 });
      return;
    }

    const tween = gsap.fromTo(
      items,
      { opacity: 0, y: 12 },
      {
        opacity: 1,
        y: 0,
        duration: 0.5,
        stagger: 0.08,
        ease: "power2.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 85%",
          once: true,
        },
      },
    );

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, []);

  const handleItemHover = (index: number, isHovering: boolean) => {
    if (itemsRef.current[index]) {
      gsap.to(itemsRef.current[index], {
        scale: isHovering ? 1.02 : 1,
        duration: 0.25,
        ease: "power2.out",
      });
    }
  };

  return (
    <section
      id="languages"
      className="relative mx-1 mb-1 flex items-center overflow-hidden rounded-[1.25rem] border border-white/[0.06] bg-black md:min-h-[680px]"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.13] [background-image:linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px)] [background-size:72px_72px] [mask-image:linear-gradient(to_right,black,transparent_88%)]"
      />


      <div className="relative z-10 mx-auto w-full max-w-[1280px] px-5 py-16 sm:px-8 md:py-20 lg:px-16 xl:px-20">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:items-center">
          <div className="pt-4 lg:pt-8">
            <SectionHeading
              eyebrow="Idiomas"
              title="Idiomas"
              description="Me comunico de forma efectiva en diferentes contextos, lo que me permite colaborar en equipos multiculturales y acceder a más oportunidades."
            />
          </div>

          <div
            ref={containerRef}
            className="relative lg:border-l lg:border-white/20 lg:py-8 lg:pl-14 xl:pl-16"
          >
            <div className="space-y-5 lg:space-y-7">
              {profile.languages.map((lang, index) => {
                const details = LANGUAGE_DETAILS[index];

                return (
                  <div
                    key={index}
                    ref={(el) => {
                      itemsRef.current[index] = el;
                    }}
                    onMouseEnter={() => handleItemHover(index, true)}
                    onMouseLeave={() => handleItemHover(index, false)}
                    className="lang-item relative grid gap-4 overflow-hidden rounded-2xl border border-white/10 bg-black/35 px-5 py-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.04),0_20px_60px_-40px_rgba(0,0,0,0.9)] backdrop-blur-sm transition-colors duration-300 hover:border-white/20 hover:bg-white/[0.035] sm:grid-cols-[auto_minmax(0,1fr)_auto] sm:items-center sm:gap-x-5 sm:px-6"
                    style={{ opacity: 0 }}
                  >
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-white/10 bg-white/[0.04] text-xl shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]">
                      {details.flag}
                    </div>

                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-x-8 gap-y-3">
                        <span className="text-xl font-semibold tracking-tight text-white sm:text-2xl">
                          {lang.name}
                        </span>
                        <div className="flex items-center gap-2" aria-label={`Nivel: ${lang.level}`}>
                          {Array.from({ length: TOTAL_BARS }).map((_, barIndex) => (
                            <span
                              key={barIndex}
                              className={`h-1.5 w-7 rounded-full sm:w-8 ${
                                barIndex < details.filledBars
                                  ? "bg-white shadow-[0_0_8px_rgba(255,255,255,0.18)]"
                                  : "bg-white/10"
                              }`}
                            />
                          ))}
                        </div>
                      </div>

                      <p className="mt-2 text-sm leading-relaxed text-white/55">
                        {details.description}
                      </p>
                    </div>

                    <div className="w-fit shrink-0 rounded-full border border-white/10 bg-slate-800/70 px-4 py-2 text-sm font-semibold text-white/80 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] sm:justify-self-end">
                      {lang.level}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
