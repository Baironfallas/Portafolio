"use client";

import { useEffect, useRef } from "react";
import { GraduationCap } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { Profile } from "@/types/profile";
import profileData from "@/data/profile.json";

gsap.registerPlugin(ScrollTrigger);

const profile: Profile = profileData;

export function EducationSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (prefersReduced || !containerRef.current) return;

    const items = containerRef.current.querySelectorAll(".edu-item");

    gsap.fromTo(
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
          start: "top 80%",
          once: true,
        },
      }
    );
  }, []);

  return (
    <section
      id="education"
      className="relative mx-1 mb-1 overflow-hidden rounded-[1.25rem] border border-white/[0.06] bg-black"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.13] [background-image:linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px)] [background-size:72px_72px] [mask-image:linear-gradient(to_right,black,transparent_67%)]"
      />

      <div className="relative z-10 mx-auto max-w-[1280px] px-5 py-16 sm:px-8 md:py-20 lg:px-16 xl:px-20">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:items-start">
          <div className="pt-4 lg:pt-8">
            <p className="mb-5 flex items-center gap-3 text-[0.65rem] font-medium uppercase tracking-[0.24em] text-white/65 sm:text-xs">
              <span className="h-px w-8 bg-white/55" />
              Formación
            </p>

            <h2 className="max-w-[7ch] text-[clamp(2.35rem,10vw,4.2rem)] font-semibold uppercase leading-[0.88] tracking-[-0.065em] text-white md:text-[clamp(2.75rem,3.4vw,4rem)]">
              <span className="block">Formación</span>
              <span className="block">académica</span>
            </h2>

            <p className="mt-6 max-w-[430px] text-sm leading-relaxed text-white/62 sm:mt-7 sm:text-[0.95rem]">
              Mi recorrido académico en tecnología y desarrollo, que ha fortalecido mi base de conocimientos y habilidades.
            </p>
          </div>

          <div ref={containerRef} className="relative pl-8 sm:pl-10 lg:pl-14">
            <div className="absolute left-0 top-2 h-[calc(100%-1rem)] w-px bg-white/15" />

            <div className="space-y-14">
              {profile.education.map((edu, index) => (
                <div key={index} className="edu-item relative pl-8 sm:pl-12">
                  <span className="absolute left-[-0.15rem] top-3 flex h-4 w-4 items-center justify-center rounded-full bg-white/85" />

                  <div className="mb-3 text-[0.7rem] font-medium uppercase tracking-[0.22em] text-white/60">
                    {edu.year}
                  </div>

                  <div className="max-w-[620px]">
                    <h3 className="text-2xl font-semibold leading-tight text-white sm:text-[2.2rem] sm:leading-[1.05]">
                      {edu.degree}
                    </h3>

                    <div className="mt-3 flex items-center gap-2 text-base text-white/80">
                      <GraduationCap className="h-4 w-4 shrink-0 text-white/80" />
                      <span>{edu.institution}</span>
                    </div>

                    {index === 0 && (
                      <p className="mt-3 max-w-[540px] text-base leading-relaxed text-white/70">
                        Formación integral con énfasis en tecnología, trabajo en equipo y resolución de problemas.
                      </p>
                    )}

                    {index === 1 && (
                      <p className="mt-3 max-w-[560px] text-base leading-relaxed text-white/70">
                        Profundización en desarrollo de software, estructuras de datos, bases de datos y arquitectura de aplicaciones.
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
