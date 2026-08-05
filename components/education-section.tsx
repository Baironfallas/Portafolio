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
    <section id="education" className="border-t border-border">
      <div className="mx-auto max-w-[1100px] px-6 py-16 md:py-20">
        <div className="mb-10 flex items-center gap-2.5">
          <GraduationCap className="h-5 w-5 text-primary" />
          <h2 className="section-title-accent">
            Formación académica
          </h2>
        </div>

        <div ref={containerRef} className="grid gap-6 md:grid-cols-3">
          {profile.education.map((edu, i) => (
            <div
              key={i}
              ref={(el) => (cardsRef.current[i] = el)}
              onMouseEnter={() => handleCardHover(i, true)}
              onMouseLeave={() => handleCardHover(i, false)}
              className="edu-card group flex cursor-pointer flex-col rounded-xl border border-border p-6 transition-all duration-200 hover:border-primary/50 hover:bg-primary/5"
              style={{ opacity: 0 }}
            >
              <p className="text-sm font-semibold text-foreground transition-colors duration-200 group-hover:text-primary">
                {edu.degree}
              </p>
              <p className="mt-1.5 text-sm text-muted-foreground">
                {edu.institution}
              </p>
              <p className="mt-auto pt-3 text-xs font-medium text-primary/80">
                {edu.year}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
