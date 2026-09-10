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
  const titleRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (prefersReduced || !containerRef.current) return;

    const cards = containerRef.current.querySelectorAll(".edu-card");

    gsap.fromTo(
      cards,
      { opacity: 0 },
      {
        opacity: 1,
        duration: 0.6,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 85%",
          once: true,
        },
      }
    );
  }, []);

  const handleCardHover = (index: number, isHovering: boolean) => {
    if (cardsRef.current[index]) {
      gsap.to(cardsRef.current[index], {
        scale: isHovering ? 1.05 : 1,
        duration: 0.25,
        ease: "power2.out",
      });
    }
  };

  return (
    <section id="education" className="border-t border-border/70">
      <div className="mx-auto max-w-[1100px] px-6 py-14 md:py-16">
        <div className="mb-10 flex items-center gap-3">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-border/70 bg-background/40">
            <GraduationCap className="h-[18px] w-[18px] text-foreground" />
          </span>
          <h2 className="text-xl font-semibold tracking-tight text-foreground md:text-[1.375rem]">
            Formación académica
          </h2>
        </div>

        <div ref={containerRef} className="grid gap-4 sm:gap-5 md:grid-cols-3">
          {profile.education.map((edu, i) => (
            <div
              key={i}
              ref={(el) => (cardsRef.current[i] = el)}
              onMouseEnter={() => handleCardHover(i, true)}
              onMouseLeave={() => handleCardHover(i, false)}
              className="edu-card group relative flex flex-col overflow-hidden rounded-xl border border-border/70 bg-gradient-to-b from-white/[0.02] to-transparent p-5 transition-all duration-200 hover:border-border hover:bg-hover cursor-pointer"
              style={{ opacity: 0 }}
            >
              <span className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-foreground/25 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

              <div className="mb-3 flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-foreground/70 shadow-[0_0_8px_1px] shadow-foreground/25" />
                <span className="text-[0.6875rem] font-medium uppercase tracking-[0.12em] text-muted-foreground">
                  {edu.year}
                </span>
              </div>

              <p className="text-[0.9375rem] font-semibold leading-snug text-foreground">
                {edu.degree}
              </p>
              <p className="mt-1.5 flex items-center gap-1.5 text-sm text-muted-foreground">
                <GraduationCap className="h-3.5 w-3.5 shrink-0 opacity-60" />
                {edu.institution}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
